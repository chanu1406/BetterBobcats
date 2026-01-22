-- Migration: Skip creating invite for contact_email if they're the submitter
-- The submitter already gets automatic membership, so they don't need an invite

CREATE OR REPLACE FUNCTION approve_club_request(
  p_request_id uuid,
  p_slug_override text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
DECLARE
  v_request public.club_requests%rowtype;
  v_slug text;
  v_club_id uuid;
  v_club_name text;
  v_club_slug text;
  v_base_url text := 'https://betterbobcats.com';
  v_dashboard_url text;
  v_officer_email text;
  v_idempotency_key text;
  v_payload jsonb;
  v_officer_count integer := 0;
  v_email_count integer := 0;
  v_submitter_email text;
  v_should_create_contact_invite boolean;
BEGIN
  -- Check authorization
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Get request details (with FOR UPDATE lock)
  SELECT * INTO v_request
  FROM public.club_requests
  WHERE id = p_request_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Request not found: %', p_request_id;
  END IF;

  IF v_request.status <> 'pending' THEN
    RAISE EXCEPTION 'Request is not pending (status=%)', v_request.status;
  END IF;

  -- Generate slug (same logic as original function)
  v_slug := COALESCE(
    NULLIF(TRIM(p_slug_override), ''),
    NULLIF(TRIM(v_request.slug_candidate), '')
  );

  IF v_slug IS NULL THEN
    RAISE EXCEPTION 'Slug required (provide slug_override or slug_candidate)';
  END IF;

  IF EXISTS (SELECT 1 FROM public.clubs c WHERE c.slug = v_slug) THEN
    RAISE EXCEPTION 'Slug already exists: %', v_slug;
  END IF;

  -- Create club (matching original schema - website not website_url)
  INSERT INTO public.clubs (
    name,
    description,
    website,
    slug,
    logo_url,
    banner_url
  )
  VALUES (
    v_request.name,
    v_request.description,
    v_request.website,
    v_slug,
    v_request.logo_url,
    v_request.banner_url
  )
  RETURNING id INTO v_club_id;

  -- Create membership for submitter if they exist
  IF v_request.submitted_by IS NOT NULL THEN
    INSERT INTO public.club_memberships (club_id, user_id, role)
    VALUES (v_club_id, v_request.submitted_by, 'admin')
    ON CONFLICT (club_id, user_id) DO NOTHING;
  END IF;

  -- Copy tags (matching original - uses tag text, not tag_id)
  INSERT INTO public.club_tags (club_id, tag)
  SELECT v_club_id, lower(trim(t.tag))
  FROM public.club_request_tags t
  WHERE t.request_id = p_request_id 
    AND trim(t.tag) <> ''
  ON CONFLICT DO NOTHING;

  -- Copy majors
  INSERT INTO public.club_majors (club_id, major_id)
  SELECT v_club_id, m.major_id
  FROM public.club_request_majors m
  WHERE m.request_id = p_request_id
  ON CONFLICT DO NOTHING;

  -- Copy major notes
  INSERT INTO public.club_major_notes (club_id, major_id, note)
  SELECT v_club_id, n.major_id, n.note
  FROM public.club_request_major_notes n
  WHERE n.request_id = p_request_id
  ON CONFLICT (club_id, major_id)
  DO UPDATE SET note = excluded.note;

  -- Get club name and slug for emails
  SELECT name, slug INTO v_club_name, v_club_slug
  FROM public.clubs
  WHERE id = v_club_id;

  -- FIXED: dashboard_url should NOT include the slug
  -- Edge Function does: `${payload.dashboard_url}/${payload.club_slug}`
  v_dashboard_url := v_base_url || '/dashboard';

  -- -----------------------------
  -- Invites (NEW ROLE RULES)
  -- contact_email -> admin (club owner)
  -- officer_emails[] -> officer
  -- -----------------------------

  -- Check if contact_email is the same as submitter's email
  -- If so, skip creating the invite (they already have membership)
  v_submitter_email := NULL;
  IF v_request.submitted_by IS NOT NULL THEN
    SELECT email INTO v_submitter_email
    FROM auth.users
    WHERE id = v_request.submitted_by;
  END IF;

  v_should_create_contact_invite := true;
  IF v_submitter_email IS NOT NULL THEN
    IF lower(trim(v_submitter_email)) = lower(trim(v_request.contact_email)) THEN
      v_should_create_contact_invite := false;
      RAISE NOTICE 'Skipping invite for contact_email % - matches submitter email', v_request.contact_email;
    END IF;
  END IF;

  -- Only create contact invite if submitter email doesn't match
  IF v_should_create_contact_invite THEN
    -- Owner/admin invite
    INSERT INTO public.club_invites (club_id, email, role, request_id, created_by)
    VALUES (
      v_club_id,
      trim(v_request.contact_email)::citext,
      'admin',
      p_request_id,
      auth.uid()
    )
    ON CONFLICT (club_id, email) DO NOTHING;
  END IF;

  -- Officers invites - CREATE AND ENQUEUE EMAILS DIRECTLY
  -- Count officer emails first
  SELECT COUNT(*) INTO v_officer_count
  FROM unnest(v_request.officer_emails) as email
  WHERE email IS NOT NULL
    AND trim(email) <> ''
    AND lower(trim(email)) <> lower(trim(v_request.contact_email));

  -- Log how many officers we're processing
  RAISE NOTICE 'Processing % officer emails for club %', v_officer_count, v_club_id;

  FOR v_officer_email IN 
    SELECT trim(email)::citext
    FROM unnest(v_request.officer_emails) as email
    WHERE email IS NOT NULL
      AND trim(email) <> ''
      AND lower(trim(email)) <> lower(trim(v_request.contact_email))
  LOOP
    -- FIXED: Use DO UPDATE to ensure role is set correctly even if invite exists
    -- This prevents officer invites from staying as 'admin' if a conflict occurs
    INSERT INTO public.club_invites (club_id, email, role, request_id, created_by)
    VALUES (v_club_id, v_officer_email, 'officer', p_request_id, auth.uid())
    ON CONFLICT (club_id, email) 
    DO UPDATE SET 
      role = EXCLUDED.role,
      request_id = EXCLUDED.request_id,
      created_by = EXCLUDED.created_by,
      created_at = CASE 
        WHEN club_invites.accepted_at IS NULL THEN club_invites.created_at 
        ELSE EXCLUDED.created_at 
      END;

    -- DIRECTLY ENQUEUE EMAIL FOR OFFICER
    -- Use EXACT same payload as contact emails
    v_idempotency_key := 'invite-' || v_club_id::text || '-' || lower(v_officer_email);
    
    -- EXACT same payload structure as contact emails
    -- Edge Function builds URL as: `${payload.dashboard_url}/${payload.club_slug}`
    -- So dashboard_url should be just the base, not include slug
    v_payload := jsonb_build_object(
      'club_id', v_club_id::text,
      'club_name', COALESCE(v_club_name, 'Club'),
      'club_slug', COALESCE(v_club_slug, v_club_id::text),
      'dashboard_url', v_dashboard_url  -- Just base URL, Edge Function adds slug
      -- NO role field - identical to contact email payload
    );

    -- Insert email directly into outbox with error handling
    BEGIN
      INSERT INTO public.email_outbox (
        to_email,
        template,
        payload,
        idempotency_key,
        created_by
      )
      VALUES (
        v_officer_email,
        'club_approved_contact',  -- Same template as contact emails
        v_payload,                -- Same payload structure
        v_idempotency_key,
        auth.uid()
      )
      ON CONFLICT (idempotency_key) DO NOTHING;
      
      -- Count successful inserts
      IF FOUND THEN
        v_email_count := v_email_count + 1;
        RAISE NOTICE 'Enqueued email for officer: %', v_officer_email;
      ELSE
        RAISE NOTICE 'Email already exists (idempotency conflict) for: %', v_officer_email;
      END IF;
    EXCEPTION
      WHEN OTHERS THEN
        -- Log error but continue processing other officers
        RAISE WARNING 'Failed to enqueue email for officer %: %', v_officer_email, SQLERRM;
    END;
  END LOOP;

  -- Log summary
  RAISE NOTICE 'Processed % officers, enqueued % emails', v_officer_count, v_email_count;

  -- Update request status
  UPDATE public.club_requests
  SET status = 'approved',
      reviewed_at = now(),
      reviewed_by = auth.uid(),
      updated_at = now()
  WHERE id = p_request_id;

  RETURN v_club_id;
END;
$$;

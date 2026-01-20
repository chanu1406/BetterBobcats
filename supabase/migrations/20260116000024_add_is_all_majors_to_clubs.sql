-- Migration: Add is_all_majors field to clubs and club_requests tables
-- This allows clubs to be marked as open to all majors (e.g., social clubs)

-- Add is_all_majors to clubs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'clubs' AND column_name = 'is_all_majors'
  ) THEN
    ALTER TABLE public.clubs ADD COLUMN is_all_majors boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Add is_all_majors to club_requests table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'club_requests' AND column_name = 'is_all_majors'
  ) THEN
    ALTER TABLE public.club_requests ADD COLUMN is_all_majors boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Update approve_club_request function to copy is_all_majors field
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
  v_invite_url text;
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

  -- Create club (including is_all_majors)
  INSERT INTO public.clubs (
    name,
    description,
    website,
    slug,
    logo_url,
    banner_url,
    is_all_majors
  )
  VALUES (
    v_request.name,
    v_request.description,
    v_request.website,
    v_slug,
    v_request.logo_url,
    v_request.banner_url,
    COALESCE(v_request.is_all_majors, false)
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

  -- Copy majors (only if not is_all_majors)
  IF NOT COALESCE(v_request.is_all_majors, false) THEN
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
  END IF;

  -- Get club name and slug for emails
  SELECT name, slug INTO v_club_name, v_club_slug
  FROM public.clubs
  WHERE id = v_club_id;

  -- Build URLs
  v_dashboard_url := v_base_url || '/dashboard';
  v_invite_url := v_base_url || '/invites';

  -- -----------------------------
  -- Admin Email - ALWAYS SEND DIRECTLY (like officers)
  -- -----------------------------
  
  -- Check if contact_email matches submitter (for invite creation logic)
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
    END IF;
  END IF;

  -- ALWAYS send admin email directly (reliable, same as officers)
  v_idempotency_key := 'invite-' || v_club_id::text || '-' || LOWER(trim(v_request.contact_email));
  
  v_payload := jsonb_build_object(
    'club_id', v_club_id::text,
    'club_name', COALESCE(v_club_name, 'Club'),
    'club_slug', COALESCE(v_club_slug, v_club_id::text),
    'dashboard_url', v_dashboard_url
  );
  
  INSERT INTO public.email_outbox (
    to_email,
    template,
    payload,
    idempotency_key,
    created_by
  )
  VALUES (
    trim(v_request.contact_email),
    'club_approved_contact',
    v_payload,
    v_idempotency_key,
    auth.uid()
  )
  ON CONFLICT (idempotency_key) DO NOTHING;
  
  RAISE NOTICE 'Sent admin email directly to contact_email: %', v_request.contact_email;
  
  -- Create admin invite if contact_email doesn't match submitter
  -- (They need an invite to accept, but email is already sent above)
  IF v_should_create_contact_invite THEN
    INSERT INTO public.club_invites (club_id, email, role, request_id, created_by)
    VALUES (
      v_club_id,
      trim(v_request.contact_email)::citext,
      'admin',
      p_request_id,
      auth.uid()
    )
    ON CONFLICT (club_id, email) 
    DO UPDATE SET 
      role = EXCLUDED.role,
      request_id = EXCLUDED.request_id,
      created_by = EXCLUDED.created_by,
      created_at = CASE 
        WHEN club_invites.accepted_at IS NULL THEN club_invites.created_at 
        ELSE EXCLUDED.created_at 
      END;
    
    RAISE NOTICE 'Created/updated admin invite for contact_email: %', v_request.contact_email;
  ELSE
    RAISE NOTICE 'Skipped admin invite creation - contact_email matches submitter (already has membership)';
  END IF;

  -- Officers invites - CREATE INVITES (trigger will handle emails with /invites URL)
  SELECT COUNT(*) INTO v_officer_count
  FROM unnest(v_request.officer_emails) as email
  WHERE email IS NOT NULL
    AND trim(email) <> ''
    AND lower(trim(email)) <> lower(trim(v_request.contact_email));

  RAISE NOTICE 'Processing % officer emails for club %', v_officer_count, v_club_id;

  FOR v_officer_email IN 
    SELECT trim(email)::citext
    FROM unnest(v_request.officer_emails) as email
    WHERE email IS NOT NULL
      AND trim(email) <> ''
      AND lower(trim(email)) <> lower(trim(v_request.contact_email))
  LOOP
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
    
    v_email_count := v_email_count + 1;
    RAISE NOTICE 'Created invite for officer: %', v_officer_email;
  END LOOP;

  RAISE NOTICE 'Processed % officers, created % invites', v_officer_count, v_email_count;

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

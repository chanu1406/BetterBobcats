-- Migration: Fix email URLs for admin and officer invites
-- Admins should get dashboard link, officers should get /invites link

-- Update the enqueue_invite_email function to handle admin invites differently
CREATE OR REPLACE FUNCTION enqueue_invite_email()
RETURNS TRIGGER AS $$
DECLARE
  v_club_name text;
  v_club_slug text;
  v_base_url text := 'https://betterbobcats.com';
  v_invite_url text;
  v_dashboard_url text;
  v_idempotency_key text;
  v_template text;
  v_payload jsonb;
BEGIN
  -- Determine template and URLs based on role
  IF NEW.role = 'admin' THEN
    -- Admin gets club_approved_contact template with dashboard URL
    v_template := 'club_approved_contact';
    v_dashboard_url := v_base_url || '/dashboard';
    -- Dashboard URL will be built as: dashboard_url/club_slug in the email template
  ELSIF NEW.role = 'officer' THEN
    -- Officer gets club_officer_invite template with /invites URL
    v_template := 'club_officer_invite';
    v_invite_url := v_base_url || '/invites';
    v_dashboard_url := v_base_url || '/dashboard';
  ELSIF NEW.role = 'member' THEN
    -- Member gets club_member_invite template with /invites URL
    v_template := 'club_member_invite';
    v_invite_url := v_base_url || '/invites';
    v_dashboard_url := v_base_url || '/dashboard';
  ELSE
    -- Unknown role, skip
    RETURN NEW;
  END IF;

  -- Get club information
  SELECT 
    COALESCE(TRIM(name), 'Club') as name, 
    COALESCE(TRIM(slug), NEW.club_id::text) as slug 
  INTO v_club_name, v_club_slug
  FROM clubs
  WHERE id = NEW.club_id;

  IF v_club_name IS NULL OR v_club_slug IS NULL THEN
    RAISE WARNING 'Club not found for invite %: club_id=%', NEW.id, NEW.club_id;
    RETURN NEW;
  END IF;

  IF v_club_name = '' THEN
    v_club_name := 'Club';
  END IF;
  IF v_club_slug = '' THEN
    v_club_slug := NEW.club_id::text;
  END IF;

  -- Build idempotency key
  v_idempotency_key := 'invite-' || NEW.club_id::text || '-' || LOWER(NEW.email);

  -- Build payload based on template type
  IF v_template = 'club_approved_contact' THEN
    -- Admin invite - dashboard URL
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'dashboard_url', v_dashboard_url  -- Edge Function will build: dashboard_url/club_slug
    );
  ELSIF v_template = 'club_officer_invite' THEN
    -- Officer invite - /invites URL
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'invite_id', NEW.id::text,
      'invite_url', v_invite_url,  -- Link to /invites page
      'dashboard_url', v_dashboard_url || '/' || v_club_slug
    );
  ELSE
    -- Member invite - /invites URL
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'dashboard_url', v_dashboard_url || '/' || v_club_slug,
      'invite_id', NEW.id::text,
      'role', NEW.role,
      'invite_url', v_invite_url  -- Link to /invites page
    );
  END IF;

  -- Insert email into outbox
  -- Use DO UPDATE to ensure we can detect if email was already sent
  INSERT INTO email_outbox (
    to_email,
    template,
    payload,
    idempotency_key,
    created_by
  ) VALUES (
    NEW.email,
    v_template,
    v_payload,
    v_idempotency_key,
    NEW.created_by
  )
  ON CONFLICT (idempotency_key) DO UPDATE SET
    updated_at = now();
  
  -- Log success
  RAISE NOTICE 'Enqueued email for invite %: to=%, template=%, role=%', NEW.id, NEW.email, v_template, NEW.role;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the transaction
    RAISE WARNING 'Failed to enqueue email for invite %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update trigger to fire for all roles (admin, officer, member)
-- Fire on both INSERT and UPDATE to handle ON CONFLICT DO UPDATE cases
DROP TRIGGER IF EXISTS trg_enqueue_invite_email ON club_invites;
CREATE TRIGGER trg_enqueue_invite_email
  AFTER INSERT OR UPDATE ON club_invites
  FOR EACH ROW
  WHEN (NEW.role IN ('admin', 'officer', 'member'))
  EXECUTE FUNCTION enqueue_invite_email();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO authenticated;
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO service_role;

-- Update approve_club_request to send officer emails with correct template
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

  -- Build URLs
  v_dashboard_url := v_base_url || '/dashboard';
  v_invite_url := v_base_url || '/invites';

  -- -----------------------------
  -- Invites (NEW ROLE RULES)
  -- contact_email -> admin (club owner) - gets dashboard link via trigger
  -- officer_emails[] -> officer - gets /invites link via trigger
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

  -- ALWAYS send admin email directly to contact_email (like officers)
  -- This ensures the email is sent regardless of invite creation
  v_idempotency_key := 'invite-' || v_club_id::text || '-' || LOWER(trim(v_request.contact_email));
  
  v_payload := jsonb_build_object(
    'club_id', v_club_id::text,
    'club_name', COALESCE(v_club_name, 'Club'),
    'club_slug', COALESCE(v_club_slug, v_club_id::text),
    'dashboard_url', v_dashboard_url  -- Edge Function will build: dashboard_url/club_slug
  );
  
  -- Send admin email directly (same approach as officers - reliable)
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
  ON CONFLICT (idempotency_key) DO UPDATE SET
    updated_at = now();
  
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
    -- Create officer invite - trigger will send email with /invites URL
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
    
    -- Count successful inserts
    v_email_count := v_email_count + 1;
    RAISE NOTICE 'Created invite for officer: %', v_officer_email;
  END LOOP;

  -- Log summary
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

-- Migration: Add contact_email to club_approved_contact email payload
-- This allows the email template to show the contact email and create proper activation links

-- Update enqueue_invite_email function to pass contact_email for admin invites
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
    -- Dashboard URL will be built as: dashboard_url/club_slug/activate?email=... in the email template
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
    -- Admin invite - dashboard URL with contact email
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'dashboard_url', v_dashboard_url,  -- Edge Function will build: dashboard_url/club_slug/activate?email=...
      'contact_email', NEW.email::text  -- Pass email for activation link
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
  ON CONFLICT (idempotency_key) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO authenticated;
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO service_role;

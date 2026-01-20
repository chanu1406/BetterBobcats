-- Migration: Fix invite_url to use /invites route (no token parameter) to avoid Resend flagging
-- Officers can navigate to /invites to see their invites

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
  -- Determine template based on role
  IF NEW.role = 'admin' THEN
    v_template := 'club_approved_contact';
  ELSIF NEW.role = 'officer' THEN
    v_template := 'club_officer_invite';
  ELSE
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

  -- Build URLs - use simple /invites route (no token parameter to avoid Resend flagging)
  v_invite_url := v_base_url || '/invites';
  v_dashboard_url := v_base_url || '/dashboard';
  
  v_idempotency_key := NEW.role || '-invite-' || NEW.club_id::text || '-' || LOWER(NEW.email) || '-' || NEW.id::text;

  -- Build payload
  IF v_template = 'club_approved_contact' THEN
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'dashboard_url', v_dashboard_url || '/' || v_club_slug
    );
  ELSE
    -- Officer invite - use /invites route (clean URL, no token parameter)
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'invite_id', NEW.id::text,
      'invite_url', v_invite_url,  -- Simple /invites route
      'dashboard_url', v_dashboard_url
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

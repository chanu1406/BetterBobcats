-- Migration: Fix idempotency key to prevent duplicate emails
-- Use email + club_id (not role + invite_id) to ensure one email per address per club

CREATE OR REPLACE FUNCTION enqueue_invite_email()
RETURNS TRIGGER AS $$
DECLARE
  v_club_name text;
  v_club_slug text;
  v_base_url text := 'https://betterbobcats.com';
  v_dashboard_url text;
  v_idempotency_key text;
  v_template text;
  v_payload jsonb;
BEGIN
  -- Use the SAME template for both admin and officer (club_approved_contact works!)
  v_template := 'club_approved_contact';

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

  -- Build URLs - same format as contact emails
  v_dashboard_url := v_base_url || '/dashboard';
  
  -- FIXED: Idempotency key uses email + club_id (not role + invite_id)
  -- This ensures ONE email per email address per club, regardless of role
  -- If contact email is also in officer_emails, they'll only get one email
  v_idempotency_key := 'invite-' || NEW.club_id::text || '-' || LOWER(NEW.email);

  -- Use the SAME payload structure as contact emails (this works!)
  v_payload := jsonb_build_object(
    'club_id', NEW.club_id::text,
    'club_name', v_club_name,
    'club_slug', v_club_slug,
    'dashboard_url', v_dashboard_url || '/' || v_club_slug,
    'invite_id', NEW.id::text,  -- Include invite_id in case template needs it
    'role', NEW.role  -- Include role so template can customize if needed
  );

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

-- Migration: Fix null club_name in officer invite emails
-- Ensure club_name is always present to prevent template rendering issues

CREATE OR REPLACE FUNCTION enqueue_officer_invite_email()
RETURNS TRIGGER AS $$
DECLARE
  v_club_name text;
  v_club_slug text;
  v_base_url text := 'https://betterbobcats.com';
  v_invite_url text;
  v_dashboard_url text;
  v_idempotency_key text;
BEGIN
  -- Only process officer invites
  IF NEW.role != 'officer' THEN
    RETURN NEW;
  END IF;

  -- Get club information - use COALESCE to ensure we always have values
  -- This prevents null values that could break the email template
  SELECT 
    COALESCE(TRIM(name), 'Club') as name, 
    COALESCE(TRIM(slug), NEW.club_id::text) as slug 
  INTO v_club_name, v_club_slug
  FROM clubs
  WHERE id = NEW.club_id;

  -- Skip if club not found (shouldn't happen, but safety check)
  IF v_club_name IS NULL OR v_club_slug IS NULL THEN
    RAISE WARNING 'Club not found for invite %: club_id=%', NEW.id, NEW.club_id;
    RETURN NEW;
  END IF;

  -- Ensure values are not empty
  IF v_club_name = '' THEN
    v_club_name := 'Club';
  END IF;
  IF v_club_slug = '' THEN
    v_club_slug := NEW.club_id::text;
  END IF;

  -- Build URLs
  v_invite_url := v_base_url || '/invites?token=' || NEW.id::text;
  v_dashboard_url := v_base_url || '/dashboard';
  
  -- Generate idempotency key
  v_idempotency_key := 'officer-invite-' || NEW.club_id::text || '-' || NEW.email || '-' || NEW.id::text;

  -- Enqueue email with complete payload - ALL fields guaranteed to have values
  INSERT INTO email_outbox (
    to_email,
    template,
    payload,
    idempotency_key,
    created_by
  ) VALUES (
    NEW.email,
    'club_officer_invite',
    jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,  -- Guaranteed non-null
      'club_slug', v_club_slug,  -- Guaranteed non-null
      'invite_id', NEW.id::text,
      'invite_url', v_invite_url,
      'dashboard_url', v_dashboard_url
    ),
    v_idempotency_key,
    NEW.created_by
  )
  ON CONFLICT (idempotency_key) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

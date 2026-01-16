-- Migration: Unified trigger for ALL invite emails (admin and officer)
-- This ensures both contact and officer emails are handled the same way

-- Drop the officer-only function and create a unified one
DROP FUNCTION IF EXISTS enqueue_officer_invite_email() CASCADE;
DROP TRIGGER IF EXISTS trg_enqueue_officer_invite_email ON club_invites;

-- Create unified function that handles both admin and officer invites
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
    -- Unknown role, skip
    RETURN NEW;
  END IF;

  -- Get club information - use COALESCE to ensure we always have values
  SELECT 
    COALESCE(TRIM(name), 'Club') as name, 
    COALESCE(TRIM(slug), NEW.club_id::text) as slug 
  INTO v_club_name, v_club_slug
  FROM clubs
  WHERE id = NEW.club_id;

  -- Skip if club not found
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
  v_idempotency_key := NEW.role || '-invite-' || NEW.club_id::text || '-' || NEW.email || '-' || NEW.id::text;

  -- Build payload based on template
  IF v_template = 'club_approved_contact' THEN
    -- Admin/contact email payload
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'dashboard_url', v_dashboard_url || '/' || v_club_slug
    );
  ELSE
    -- Officer invite email payload
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'invite_id', NEW.id::text,
      'invite_url', v_invite_url,
      'dashboard_url', v_dashboard_url
    );
  END IF;

  -- Enqueue email with complete payload
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

-- Create unified trigger for ALL invites (both admin and officer)
CREATE TRIGGER trg_enqueue_invite_email
  AFTER INSERT ON club_invites
  FOR EACH ROW
  WHEN (NEW.role IN ('admin', 'officer'))
  EXECUTE FUNCTION enqueue_invite_email();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO authenticated;
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO service_role;

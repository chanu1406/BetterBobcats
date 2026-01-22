-- Migration: Update invite email trigger to use club_member_invite template
-- This template includes role information and links to /invites page

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
  -- Use club_member_invite template for all member invites (includes role)
  v_template := 'club_member_invite';

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

  -- Build URLs
  v_dashboard_url := v_base_url || '/dashboard';
  -- Invite URL goes to /invites page where user can accept
  v_invite_url := v_base_url || '/invites';
  
  -- Idempotency key uses email + club_id to prevent duplicates
  v_idempotency_key := 'invite-' || NEW.club_id::text || '-' || LOWER(NEW.email);

  -- Build payload for member invite template
  -- This template includes role and invite_url
  v_payload := jsonb_build_object(
    'club_id', NEW.club_id::text,
    'club_name', v_club_name,
    'club_slug', v_club_slug,
    'dashboard_url', v_dashboard_url || '/' || v_club_slug,
    'invite_id', NEW.id::text,
    'role', NEW.role,  -- Include role so email can display it
    'invite_url', v_invite_url  -- Link to /invites page
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

-- Update trigger to fire for all roles (admin, officer, member)
DROP TRIGGER IF EXISTS trg_enqueue_invite_email ON club_invites;

CREATE TRIGGER trg_enqueue_invite_email
  AFTER INSERT ON club_invites
  FOR EACH ROW
  WHEN (NEW.role IN ('admin', 'officer', 'member'))
  EXECUTE FUNCTION enqueue_invite_email();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO authenticated;
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO service_role;

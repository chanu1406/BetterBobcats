-- Migration: Fix officer invite email enqueueing with complete payload
-- This trigger ensures club_officer_invite emails are enqueued with all required fields

-- First, let's create a function to enqueue officer invite emails with complete payload
CREATE OR REPLACE FUNCTION enqueue_officer_invite_email()
RETURNS TRIGGER AS $$
DECLARE
  v_club_name text;
  v_club_slug text;
  v_base_url text := 'https://betterbobcats.com'; -- Update with your production URL
  v_invite_url text;
  v_dashboard_url text;
  v_idempotency_key text;
BEGIN
  -- Only process officer invites
  IF NEW.role != 'officer' THEN
    RETURN NEW;
  END IF;

  -- Get club information
  SELECT name, slug INTO v_club_name, v_club_slug
  FROM clubs
  WHERE id = NEW.club_id;

  -- Skip if club not found (shouldn't happen, but safety check)
  IF v_club_name IS NULL THEN
    RETURN NEW;
  END IF;

  -- Build URLs
  v_invite_url := v_base_url || '/invites?token=' || NEW.id::text;
  v_dashboard_url := v_base_url || '/dashboard';
  
  -- Generate idempotency key
  v_idempotency_key := 'officer-invite-' || NEW.club_id::text || '-' || NEW.email || '-' || NEW.id::text;

  -- Enqueue email with complete payload
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
      'club_name', v_club_name,
      'club_slug', v_club_slug,
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

-- Create trigger to automatically enqueue emails when officer invites are created
DROP TRIGGER IF EXISTS trg_enqueue_officer_invite_email ON club_invites;

CREATE TRIGGER trg_enqueue_officer_invite_email
  AFTER INSERT ON club_invites
  FOR EACH ROW
  WHEN (NEW.role = 'officer')
  EXECUTE FUNCTION enqueue_officer_invite_email();

-- Note: This will only affect NEW invites created after this migration
-- For existing failed emails, you'll need to:
-- 1. Delete failed officer invite emails: DELETE FROM email_outbox WHERE template = 'club_officer_invite' AND status = 'failed';
-- 2. Re-approve the clubs or manually trigger email enqueueing for existing invites

-- Migration: Cancel pending emails when invite is deleted
-- When a club invite is canceled/deleted, cancel any pending emails in email_outbox
-- This prevents emails from being sent after an invite is canceled

-- ============================================================================
-- FUNCTION: Cancel pending emails when invite is deleted
-- ============================================================================

CREATE OR REPLACE FUNCTION cancel_invite_email()
RETURNS TRIGGER AS $$
DECLARE
  v_idempotency_key text;
  v_email_count integer;
BEGIN
  -- Build the idempotency key that was used when the email was enqueued
  -- Format: 'invite-{club_id}-{email}' (matches the trigger that creates emails)
  v_idempotency_key := 'invite-' || OLD.club_id::text || '-' || LOWER(OLD.email);

  -- Cancel/delete pending emails for this invite
  -- Only cancel if status is 'pending' or 'sending' (not yet sent)
  UPDATE public.email_outbox
  SET status = 'failed',
      error = 'Invite canceled by admin'
  WHERE idempotency_key = v_idempotency_key
    AND status IN ('pending', 'sending');

  GET DIAGNOSTICS v_email_count = ROW_COUNT;

  IF v_email_count > 0 THEN
    RAISE NOTICE 'Canceled % pending email(s) for canceled invite: %', v_email_count, OLD.id;
  END IF;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to cancel emails when invite is deleted
DROP TRIGGER IF EXISTS trg_cancel_invite_email ON club_invites;

CREATE TRIGGER trg_cancel_invite_email
  AFTER DELETE ON club_invites
  FOR EACH ROW
  EXECUTE FUNCTION cancel_invite_email();

-- Grant execute permission
GRANT EXECUTE ON FUNCTION cancel_invite_email() TO authenticated;
GRANT EXECUTE ON FUNCTION cancel_invite_email() TO service_role;

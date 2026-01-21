-- Migration: Fix invite email idempotency to handle canceled invites
-- When a new invite is created, if there's a failed email with the same idempotency key
-- (from a canceled invite), reset it to pending instead of doing nothing

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
  ELSIF NEW.role = 'member' THEN
    v_template := 'club_member_invite';
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

  -- Build URLs
  v_invite_url := v_base_url || '/invites';
  v_dashboard_url := v_base_url || '/dashboard';
  
  -- Build idempotency key (same format as cancel trigger uses)
  v_idempotency_key := 'invite-' || NEW.club_id::text || '-' || LOWER(NEW.email);

  -- Build payload based on template type
  IF v_template = 'club_approved_contact' THEN
    -- Admin invite - dashboard URL
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'dashboard_url', v_dashboard_url
    );
  ELSIF v_template = 'club_officer_invite' THEN
    -- Officer invite - /invites URL
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'invite_id', NEW.id::text,
      'invite_url', v_invite_url,
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
      'invite_url', v_invite_url
    );
  END IF;

  -- Insert email into outbox
  -- If idempotency key exists (from canceled/failed invite), reset it to pending
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
    status = CASE 
      WHEN email_outbox.status = 'sent' THEN 'sent'  -- Don't resend already sent emails
      ELSE 'pending'  -- Reset failed/canceled emails to pending
    END,
    template = EXCLUDED.template,
    payload = EXCLUDED.payload,
    attempt_count = CASE 
      WHEN email_outbox.status = 'sent' THEN email_outbox.attempt_count  -- Keep attempt count for sent emails
      ELSE 0  -- Reset attempt count for failed/canceled emails
    END,
    error = NULL,
    last_attempt_at = NULL,
    sent_at = CASE 
      WHEN email_outbox.status = 'sent' THEN email_outbox.sent_at  -- Keep sent_at for sent emails
      ELSE NULL  -- Clear sent_at for failed/canceled emails
    END,
    created_by = EXCLUDED.created_by,
    created_at = now();
  
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

-- Ensure trigger exists and fires for all roles
DROP TRIGGER IF EXISTS trg_enqueue_invite_email ON club_invites;
CREATE TRIGGER trg_enqueue_invite_email
  AFTER INSERT OR UPDATE ON club_invites
  FOR EACH ROW
  WHEN (NEW.role IN ('admin', 'officer', 'member'))
  EXECUTE FUNCTION enqueue_invite_email();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO authenticated;
GRANT EXECUTE ON FUNCTION enqueue_invite_email() TO service_role;

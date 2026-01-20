-- Comprehensive diagnostic script for admin email issues
-- Run this in Supabase SQL Editor to identify the problem

-- Step 1: Check if admin invites exist
SELECT 
  'Admin Invites' as check_type,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE accepted_at IS NULL) as pending,
  COUNT(*) FILTER (WHERE accepted_at IS NOT NULL) as accepted
FROM club_invites
WHERE role = 'admin';

-- Step 2: Check if emails are queued for admin invites
SELECT 
  'Email Outbox (Admin)' as check_type,
  COUNT(*) as total_emails,
  COUNT(*) FILTER (WHERE status = 'pending') as pending,
  COUNT(*) FILTER (WHERE status = 'sending') as sending,
  COUNT(*) FILTER (WHERE status = 'sent') as sent,
  COUNT(*) FILTER (WHERE status = 'failed') as failed
FROM email_outbox
WHERE template = 'club_approved_contact';

-- Step 3: Check recent admin invites and their email status
SELECT 
  ci.id as invite_id,
  ci.email,
  ci.role,
  ci.created_at as invite_created,
  ci.accepted_at,
  c.name as club_name,
  c.slug as club_slug,
  eo.id as email_id,
  eo.status as email_status,
  eo.created_at as email_created,
  eo.sent_at,
  eo.error,
  eo.attempt_count,
  eo.idempotency_key
FROM club_invites ci
JOIN clubs c ON c.id = ci.club_id
LEFT JOIN email_outbox eo ON eo.idempotency_key = 'invite-' || ci.club_id::text || '-' || LOWER(ci.email)
WHERE ci.role = 'admin'
ORDER BY ci.created_at DESC
LIMIT 10;

-- Step 4: Check if trigger exists and is enabled
SELECT 
  'Trigger Status' as check_type,
  tgname as trigger_name,
  tgenabled as enabled,
  CASE tgenabled
    WHEN 'O' THEN 'Enabled'
    WHEN 'D' THEN 'Disabled'
    WHEN 'R' THEN 'Replica'
    WHEN 'A' THEN 'Always'
    ELSE 'Unknown'
  END as status
FROM pg_trigger
WHERE tgname = 'trg_enqueue_invite_email'
  AND tgrelid = 'club_invites'::regclass;

-- Step 5: Check recent club requests and their contact emails
SELECT 
  cr.id as request_id,
  cr.name as club_name,
  cr.contact_email,
  cr.submitted_by,
  au.email as submitter_email,
  (LOWER(TRIM(cr.contact_email)) = LOWER(TRIM(au.email))) as matches_submitter,
  cr.status,
  cr.reviewed_at,
  c.id as club_id,
  c.slug as club_slug
FROM club_requests cr
LEFT JOIN auth.users au ON au.id = cr.submitted_by
LEFT JOIN clubs c ON c.id = (
  SELECT club_id FROM club_invites 
  WHERE request_id = cr.id AND role = 'admin' 
  LIMIT 1
)
ORDER BY cr.created_at DESC
LIMIT 5;

-- Step 6: Manually test trigger for most recent admin invite
DO $$
DECLARE
  v_invite_id uuid;
  v_club_id uuid;
  v_email text;
  v_email_exists boolean;
BEGIN
  -- Get most recent admin invite
  SELECT id, club_id, email 
  INTO v_invite_id, v_club_id, v_email
  FROM club_invites
  WHERE role = 'admin'
    AND accepted_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF v_invite_id IS NULL THEN
    RAISE NOTICE 'No admin invites found';
    RETURN;
  END IF;
  
  RAISE NOTICE 'Testing trigger for invite: %, club: %, email: %', 
    v_invite_id, v_club_id, v_email;
  
  -- Check if email already exists
  SELECT EXISTS (
    SELECT 1 FROM email_outbox 
    WHERE idempotency_key = 'invite-' || v_club_id::text || '-' || LOWER(v_email)
  ) INTO v_email_exists;
  
  IF v_email_exists THEN
    RAISE NOTICE 'Email already exists in outbox. Checking status...';
    SELECT status INTO v_email_exists FROM email_outbox 
    WHERE idempotency_key = 'invite-' || v_club_id::text || '-' || LOWER(v_email)
    LIMIT 1;
    RAISE NOTICE 'Email status: %', v_email_exists;
  ELSE
    RAISE NOTICE 'No email in outbox. Triggering update...';
    
    -- Update invite to trigger email
    UPDATE club_invites
    SET updated_at = now()
    WHERE id = v_invite_id;
    
    -- Check again
    SELECT EXISTS (
      SELECT 1 FROM email_outbox 
      WHERE idempotency_key = 'invite-' || v_club_id::text || '-' || LOWER(v_email)
        AND template = 'club_approved_contact'
    ) INTO v_email_exists;
    
    IF v_email_exists THEN
      RAISE NOTICE 'SUCCESS: Email queued after trigger';
    ELSE
      RAISE WARNING 'FAILED: Email NOT queued. Check trigger logs.';
    END IF;
  END IF;
END $$;

-- Step 7: Check for any errors in recent email attempts
SELECT 
  'Recent Email Errors' as check_type,
  id,
  to_email,
  template,
  status,
  error,
  attempt_count,
  created_at,
  last_attempt_at
FROM email_outbox
WHERE status = 'failed'
  OR (error IS NOT NULL AND error != '')
ORDER BY last_attempt_at DESC NULLS LAST, created_at DESC
LIMIT 10;

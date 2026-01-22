-- Test script to manually trigger admin email for existing invites
-- This can be run in Supabase SQL Editor to test the email trigger

-- Option 1: Check existing admin invites that might not have emails sent
-- Also check if contact_email matches submitter email (which would skip invite creation)
SELECT 
  ci.id,
  ci.club_id,
  ci.email,
  ci.role,
  ci.created_at,
  ci.accepted_at,
  c.name as club_name,
  c.slug as club_slug,
  cr.submitted_by,
  au.email as submitter_email,
  (LOWER(TRIM(ci.email)) = LOWER(TRIM(au.email))) as matches_submitter,
  EXISTS (
    SELECT 1 FROM email_outbox eo 
    WHERE eo.idempotency_key = 'invite-' || ci.club_id::text || '-' || LOWER(ci.email)
  ) as email_sent
FROM club_invites ci
JOIN clubs c ON c.id = ci.club_id
LEFT JOIN club_requests cr ON cr.id = ci.request_id
LEFT JOIN auth.users au ON au.id = cr.submitted_by
WHERE ci.role = 'admin'
ORDER BY ci.created_at DESC
LIMIT 10;

-- Option 2: Manually trigger email for a specific admin invite
-- Replace the UUIDs below with actual values from the query above
DO $$
DECLARE
  v_test_invite_id uuid;
  v_test_club_id uuid;
  v_test_email text;
  v_email_queued boolean;
BEGIN
  -- Get the most recent admin invite that hasn't been accepted
  SELECT id, club_id, email INTO v_test_invite_id, v_test_club_id, v_test_email
  FROM club_invites
  WHERE role = 'admin'
    AND accepted_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF v_test_invite_id IS NULL THEN
    RAISE NOTICE 'No admin invites found to test';
    RETURN;
  END IF;
  
  RAISE NOTICE 'Testing email trigger for invite: %, club: %, email: %', 
    v_test_invite_id, v_test_club_id, v_test_email;
  
  -- Check if email already exists
  SELECT EXISTS (
    SELECT 1 FROM email_outbox 
    WHERE idempotency_key = 'invite-' || v_test_club_id::text || '-' || LOWER(v_test_email)
  ) INTO v_email_queued;
  
  IF v_email_queued THEN
    RAISE NOTICE 'Email already queued for this invite. Checking status...';
  END IF;
  
  -- Update the invite to trigger the email (trigger fires on UPDATE)
  UPDATE club_invites
  SET updated_at = now()
  WHERE id = v_test_invite_id;
  
  -- Check again after update
  SELECT EXISTS (
    SELECT 1 FROM email_outbox 
    WHERE idempotency_key = 'invite-' || v_test_club_id::text || '-' || LOWER(v_test_email)
      AND template = 'club_approved_contact'
  ) INTO v_email_queued;
  
  IF v_email_queued THEN
    RAISE NOTICE 'SUCCESS: Email queued in email_outbox with template club_approved_contact';
  ELSE
    RAISE WARNING 'Email NOT queued. Check trigger logs for errors.';
  END IF;
END $$;

-- Option 3: Check email_outbox for admin emails
SELECT 
  id,
  to_email,
  template,
  payload->>'club_name' as club_name,
  payload->>'club_slug' as club_slug,
  payload->>'dashboard_url' as dashboard_url,
  status,
  attempt_count,
  created_at,
  sent_at,
  last_attempt_at,
  error
FROM email_outbox
WHERE template = 'club_approved_contact'
ORDER BY created_at DESC
LIMIT 10;

-- Option 4: Create a test admin invite and trigger email
-- WARNING: Only use this if you have a test club and want to create a test invite
/*
DO $$
DECLARE
  v_test_club_id uuid;
  v_test_email text := 'test@example.com'; -- Change this to your test email
BEGIN
  -- Get a real club ID (replace with actual club ID if needed)
  SELECT id INTO v_test_club_id
  FROM clubs
  LIMIT 1;
  
  IF v_test_club_id IS NULL THEN
    RAISE EXCEPTION 'No clubs found. Create a club first.';
  END IF;
  
  -- Create test admin invite
  INSERT INTO club_invites (club_id, email, role, created_by)
  VALUES (v_test_club_id, v_test_email, 'admin', auth.uid())
  ON CONFLICT (club_id, email) DO UPDATE SET
    role = 'admin',
    updated_at = now();
  
  RAISE NOTICE 'Test invite created/updated. Check email_outbox for queued email.';
END $$;
*/

-- Check the full approve_club_request function source
-- Look for the admin invite creation section

-- Option 1: Get full function source (might be truncated in UI)
SELECT 
  proname as function_name,
  pg_get_functiondef(oid) as full_source
FROM pg_proc 
WHERE proname = 'approve_club_request';

-- Option 2: Check if function has the new admin email logic
-- Look for these keywords in the source:
SELECT 
  proname,
  CASE 
    WHEN prosrc LIKE '%v_should_create_contact_invite%' THEN 'Has new logic'
    WHEN prosrc LIKE '%Contact email matches submitter%' THEN 'Has new logic'
    WHEN prosrc LIKE '%club_approved_contact%' THEN 'Has email template'
    ELSE 'Old version'
  END as version_check,
  CASE 
    WHEN prosrc LIKE '%INSERT INTO public.email_outbox%' THEN 'YES - Direct email insert'
    ELSE 'NO - No direct email insert'
  END as has_direct_email
FROM pg_proc 
WHERE proname = 'approve_club_request';

-- Option 3: Check the enqueue_invite_email trigger function
SELECT 
  proname,
  CASE 
    WHEN prosrc LIKE '%AFTER INSERT OR UPDATE%' THEN 'YES - Fires on UPDATE'
    WHEN prosrc LIKE '%AFTER INSERT%' THEN 'NO - Only fires on INSERT'
    ELSE 'Unknown'
  END as trigger_fires_on_update,
  CASE 
    WHEN prosrc LIKE '%role = ''admin''%' THEN 'YES - Handles admin role'
    ELSE 'NO - Missing admin handling'
  END as handles_admin_role
FROM pg_proc 
WHERE proname = 'enqueue_invite_email';

-- Option 4: Check trigger definition
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  CASE tgtype & 2
    WHEN 2 THEN 'AFTER'
    ELSE 'BEFORE'
  END as timing,
  CASE tgtype & 4
    WHEN 4 THEN 'INSERT'
    ELSE 'OTHER'
  END as events,
  pg_get_triggerdef(oid) as trigger_definition
FROM pg_trigger
WHERE tgname = 'trg_enqueue_invite_email';

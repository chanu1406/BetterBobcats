-- Run in Supabase Dashboard → SQL Editor (or psql)
-- Clears emails from public.email_outbox

-- Option A: Clear only unsent emails (pending, sending, failed)
-- Use this if you want to keep a record of already-sent emails
DELETE FROM public.email_outbox
WHERE status IN ('pending', 'sending', 'failed');

-- Option B: Clear entire table (uncomment to use)
-- DELETE FROM public.email_outbox;

-- Preview before deleting (run first if you want to check counts):
-- SELECT status, COUNT(*) FROM public.email_outbox GROUP BY status;

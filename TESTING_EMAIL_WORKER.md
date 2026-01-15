# Testing Email Worker Integration

This guide covers testing the email worker trigger functionality after approve/reject actions.

## Prerequisites

1. **Environment Variable Setup**
   - Add `SEND_EMAILS_SECRET` to `frontend/.env.local`
   - Must match the secret set in Supabase Edge Function secrets

2. **Verify Edge Function is Deployed**
   ```bash
   npx supabase functions list
   ```

3. **Verify Secrets are Set**
   ```bash
   npx supabase secrets list | grep -E "RESEND|SEND_EMAILS|FROM_"
   ```

## Step 1: Set Up Environment Variable

Add to `frontend/.env.local`:

```env
SEND_EMAILS_SECRET=dd24515ddcf0cffc90b5cfc023edcd9e1ef9efdec08e54be54ea02957da6a5f5
NEXT_PUBLIC_SUPABASE_URL=https://bnltktzvxhbbasqpvhoj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Restart your Next.js dev server after adding environment variables.

## Step 2: Test API Route Directly

### Option A: Using curl

```bash
# First, get your session cookie or use a tool that handles auth
# The route requires platform admin authentication

# Test with authenticated session
curl -X POST http://localhost:3000/api/admin/trigger-email-worker \
  -H "Content-Type: application/json" \
  -b "your-session-cookie"
```

### Option B: Using Browser DevTools

1. Open your admin panel: http://localhost:3000/admin/club-requests
2. Open Browser DevTools (F12) → Console
3. Run:
   ```javascript
   fetch('/api/admin/trigger-email-worker', {
     method: 'POST',
     credentials: 'include'
   })
   .then(r => r.json())
   .then(console.log)
   .catch(console.error)
   ```

Expected response:
```json
{
  "success": true,
  "message": "Email worker triggered"
}
```

## Step 3: Test Through UI (End-to-End)

### Test Approve Flow

1. **Create a test club request** (or use existing pending request)
   - Go to `/admin/club-requests`
   - Find a pending request

2. **Approve the request**
   - Click on the request to view details
   - Click "Approve Request"
   - Watch the browser console (F12) for any errors

3. **Verify email was enqueued**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT * FROM email_outbox 
   WHERE template = 'club_approved_contact'
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

4. **Check if email worker was triggered**
   - Check Edge Function logs:
   ```bash
   npx supabase functions logs send-emails --limit 10
   ```

5. **Verify email was sent**
   ```sql
   -- Check email status
   SELECT 
     id,
     to_email,
     template,
     status,
     attempt_count,
     sent_at,
     error,
     created_at
   FROM email_outbox
   WHERE template IN ('club_approved_contact', 'club_officer_invite')
   ORDER BY created_at DESC
   LIMIT 10;
   ```

### Test Reject Flow

1. **Reject a test request**
   - Go to `/admin/club-requests`
   - Find a pending request
   - Click "Reject Request"
   - Enter a rejection message
   - Click "Reject Request"

2. **Verify email was enqueued**
   ```sql
   SELECT * FROM email_outbox 
   WHERE template = 'club_rejected_contact'
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

3. **Check email processing**
   - Same steps as approve flow above

## Step 4: Manual Edge Function Test

Test the Edge Function directly:

```bash
# Get your anon key from frontend/.env.local
ANON_KEY="your-anon-key"
SECRET="dd24515ddcf0cffc90b5cfc023edcd9e1ef9efdec08e54be54ea02957da6a5f5"

curl -X POST "https://bnltktzvxhbbasqpvhoj.supabase.co/functions/v1/send-emails" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "x-worker-secret: $SECRET" \
  -H "Content-Type: application/json"
```

Expected response:
```json
{
  "success": true,
  "processed": 0,
  "message": "No pending emails to process"
}
```

Or if there are pending emails:
```json
{
  "success": true,
  "processed": 2,
  "successful": 2,
  "failed": 0
}
```

## Step 5: Create Test Email Manually

Insert a test email into the outbox:

```sql
-- Insert test approval email
INSERT INTO email_outbox (
  to_email,
  template,
  payload,
  idempotency_key
) VALUES (
  'test@example.com',  -- Use your real email for testing
  'club_approved_contact',
  '{
    "club_name": "Test Club",
    "club_slug": "test-club",
    "club_id": "00000000-0000-0000-0000-000000000000",
    "dashboard_url": "https://betterbobcats.com/admin/clubs"
  }'::jsonb,
  'test-' || gen_random_uuid()::text
);

-- Insert test rejection email
INSERT INTO email_outbox (
  to_email,
  template,
  payload,
  idempotency_key
) VALUES (
  'test@example.com',
  'club_rejected_contact',
  '{
    "club_name": "Test Club",
    "rejection_reason": "This is a test rejection message.",
    "reapply_url": "https://betterbobcats.com/clubs/request"
  }'::jsonb,
  'test-reject-' || gen_random_uuid()::text
);
```

Then trigger the worker:
```bash
# Via API route (if authenticated)
curl -X POST http://localhost:3000/api/admin/trigger-email-worker \
  -H "Content-Type: application/json" \
  --cookie "your-session-cookie"

# Or directly via Edge Function
curl -X POST "https://bnltktzvxhbbasqpvhoj.supabase.co/functions/v1/send-emails" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "x-worker-secret: dd24515ddcf0cffc90b5cfc023edcd9e1ef9efdec08e54be54ea02957da6a5f5"
```

## Step 6: Verify Email Delivery

### Check Resend Dashboard

1. Go to https://resend.com/emails
2. Check recent emails sent
3. Verify email content and recipient

### Check Database Status

```sql
-- View all email statuses
SELECT 
  template,
  status,
  COUNT(*) as count,
  MAX(created_at) as latest
FROM email_outbox
GROUP BY template, status
ORDER BY latest DESC;

-- View failed emails
SELECT 
  id,
  to_email,
  template,
  status,
  attempt_count,
  error,
  created_at,
  last_attempt_at
FROM email_outbox
WHERE status = 'failed'
ORDER BY last_attempt_at DESC
LIMIT 10;
```

## Troubleshooting

### API Route Returns 401 Unauthorized

- Verify you're logged in as a platform admin
- Check that `requirePlatformAdmin()` is working
- Verify session cookies are being sent

### API Route Returns 500 Error

- Check `frontend/.env.local` has `SEND_EMAILS_SECRET` set
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart Next.js dev server after adding env vars
- Check server logs for detailed error

### Edge Function Returns 401

- Verify `x-worker-secret` header matches `SEND_EMAILS_SECRET`
- Check Edge Function secrets are set correctly:
  ```bash
  npx supabase secrets list
  ```

### Emails Not Sending

1. **Check Resend API Key**
   ```bash
   npx supabase secrets list | grep RESEND
   ```

2. **Check Edge Function Logs**
   ```bash
   npx supabase functions logs send-emails --limit 20
   ```

3. **Verify Email Status**
   ```sql
   SELECT * FROM email_outbox WHERE status = 'pending' LIMIT 5;
   ```

4. **Check Resend Dashboard**
   - Go to https://resend.com/emails
   - Look for failed sends or API errors

### Emails Stuck in "sending" Status

This can happen if the Edge Function crashes mid-processing. Reset them:

```sql
-- Reset stuck emails back to pending
UPDATE email_outbox
SET status = 'pending'
WHERE status = 'sending'
  AND last_attempt_at < NOW() - INTERVAL '5 minutes';
```

## Quick Test Checklist

- [ ] Environment variable `SEND_EMAILS_SECRET` set in `frontend/.env.local`
- [ ] Next.js dev server restarted after adding env vars
- [ ] Edge Function `send-emails` is deployed
- [ ] Edge Function secrets are configured
- [ ] Resend API key is valid
- [ ] Test approve/reject through UI
- [ ] Check `email_outbox` table for new entries
- [ ] Check Edge Function logs for processing
- [ ] Verify emails in Resend dashboard
- [ ] Check email status in database

## Expected Flow

1. Admin approves/rejects request → RPC executes
2. RPC enqueues email(s) to `email_outbox` (status: 'pending')
3. UI triggers `/api/admin/trigger-email-worker` (fire-and-forget)
4. API route calls Edge Function with secret header
5. Edge Function processes emails:
   - Updates status to 'sending'
   - Sends via Resend API
   - Updates status to 'sent' or 'failed'
6. Emails appear in Resend dashboard
7. Recipients receive emails

## Monitoring

Set up monitoring queries:

```sql
-- Pending emails count
SELECT COUNT(*) FROM email_outbox WHERE status = 'pending';

-- Recent processing stats
SELECT 
  DATE_TRUNC('hour', created_at) as hour,
  template,
  status,
  COUNT(*) as count
FROM email_outbox
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY hour, template, status
ORDER BY hour DESC, template, status;

-- Success rate
SELECT 
  template,
  COUNT(*) FILTER (WHERE status = 'sent') as sent,
  COUNT(*) FILTER (WHERE status = 'failed') as failed,
  COUNT(*) FILTER (WHERE status = 'pending') as pending,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE status = 'sent') / 
    NULLIF(COUNT(*) FILTER (WHERE status IN ('sent', 'failed')), 0),
    2
  ) as success_rate_pct
FROM email_outbox
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY template;
```

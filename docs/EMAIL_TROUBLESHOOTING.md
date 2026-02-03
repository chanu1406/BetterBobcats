# Email Sending Troubleshooting Guide

## Quick Checklist

### 1. Database Migration Applied?
```bash
# Apply the migration that creates the RPC function
npx supabase db push
```

This creates `select_pending_emails_for_sending()` which the Edge Function needs.

### 2. Edge Function Deployed?
```bash
# Deploy the send-emails function
npx supabase functions deploy send-emails
```

### 3. Environment Variables Set?
```bash
# Check if secrets are set
npx supabase secrets list

# Set them if missing:
npx supabase secrets set RESEND_API_KEY=your_key
npx supabase secrets set SUPABASE_URL=https://your-project.supabase.co
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
npx supabase secrets set SEND_EMAILS_SECRET=your_secret
```

### 4. Check Email Outbox Status
```sql
-- Check if emails are being queued
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
ORDER BY created_at DESC
LIMIT 10;
```

### 5. Test Edge Function Directly
```bash
# Test the function directly
npx supabase functions invoke send-emails \
  --headers "x-worker-secret=YOUR_SEND_EMAILS_SECRET"
```

### 6. Check Edge Function Logs
```bash
# View logs to see what's happening
npx supabase functions logs send-emails --tail
```

## Common Issues

### Issue: "Function not found" or 404
**Solution:** Deploy the Edge Function:
```bash
npx supabase functions deploy send-emails
```

### Issue: "Unauthorized" or 401
**Solution:** Check `SEND_EMAILS_SECRET` matches:
```bash
# Check what's set
npx supabase secrets list | grep SEND_EMAILS_SECRET

# Set it if missing
npx supabase secrets set SEND_EMAILS_SECRET=your-secret-here
```

### Issue: "RPC function not found"
**Solution:** Apply the migration:
```bash
npx supabase db push
```

### Issue: Emails stuck in "pending"
**Solution:** 
1. Check if Edge Function is deployed
2. Check environment variables
3. Manually trigger: `npx supabase functions invoke send-emails --headers "x-worker-secret=YOUR_SECRET"`

### Issue: Emails marked as "failed"
**Solution:** Check the `error` column in `email_outbox`:
```sql
SELECT error, to_email, template, attempt_count
FROM email_outbox
WHERE status = 'failed'
ORDER BY last_attempt_at DESC
LIMIT 10;
```

Common failures:
- **Resend API key invalid**: Check `RESEND_API_KEY`
- **From email not verified**: Verify email in Resend dashboard
- **Template not found**: Check template name matches Edge Function templates

### Issue: Resend API error: Forbidden (403)

**Cause:** Resend is rejecting the send because of permissions or domain setup.

**Fixes (try in order):**

1. **Verify the “from” domain in Resend**
   - The Edge Function sends from `FROM_EMAIL` (default `noreply@betterbobcats.com`).
   - In [Resend Dashboard](https://resend.com/domains) → **Domains**, add the domain (e.g. `betterbobcats.com`) and complete DNS verification (SPF, DKIM, etc.).
   - You can only send from domains that are verified in your Resend account.

2. **Use Resend’s test “from” address while developing**
   - Resend allows sending **to** your own verified email when using their sandbox.
   - In Resend Dashboard, check if you’re in sandbox mode and what the allowed “from” address is (e.g. `onboarding@resend.dev`).
   - Set the Edge Function secret: `FROM_EMAIL=onboarding@resend.dev` (or the exact address Resend shows) and redeploy. Send only to your own email for testing.

3. **Check API key type**
   - Use a **full** API key from Resend (Dashboard → API Keys), not a restricted key that can’t send emails.
   - In Supabase: Edge Functions → `send-emails` → Settings → set `RESEND_API_KEY` to that key.

4. **Confirm no account/plan block**
   - Log in to Resend and check for any account warnings, payment, or plan limits that could cause 403 Forbidden.

## Testing the Full Flow

1. **Create an invite** (this queues the email)
2. **Check email_outbox**:
   ```sql
   SELECT * FROM email_outbox WHERE status = 'pending' ORDER BY created_at DESC LIMIT 1;
   ```
3. **Trigger email worker**:
   ```bash
   npx supabase functions invoke send-emails --headers "x-worker-secret=YOUR_SECRET"
   ```
4. **Check status**:
   ```sql
   SELECT status, error FROM email_outbox WHERE id = 'your-email-id';
   ```

## Debugging Steps

1. **Check browser console** when creating invite - look for errors from `/api/send-emails`
2. **Check server logs** - Next.js server logs will show API route errors
3. **Check Edge Function logs** - `npx supabase functions logs send-emails`
4. **Check database** - Query `email_outbox` to see email status

## Event request fulfilled emails (creator + upvoters)

### Architecture

1. **Fulfill flow:** Club admin creates an event to fulfill a request → `CreateEventForm` calls `fulfillEventRequest(requestId, eventId)` → Supabase RPC `fulfill_event_request(p_request_id, p_event_id)` runs.
2. **Enqueue:** The RPC (in `supabase/migrations/20260117000002_create_event_request_rpcs.sql`) inserts rows into `public.email_outbox`:
   - One row for the **creator** (template `event_request_fulfilled_creator`) using `email_for_user(created_by)` from `auth.users`.
   - One row per **upvoter** (template `event_request_fulfilled_upvoter`) from `event_request_votes`, skipping the creator.
3. **Send:** The **send-emails** Edge Function processes `email_outbox` (pending → sending → sent/failed). It is invoked by:
   - **POST /api/send-emails** (Next.js API route), which calls the Edge Function.
   - Optionally a cron job (if configured).

### Why creator/upvoters were not notified

The RPC correctly enqueues emails into `email_outbox`, but the **email worker was never triggered** after fulfilling. Club approval flow calls `POST /api/send-emails` after approving; the fulfill flow did not. So emails stayed in `pending` until something else (e.g. cron or another action) ran the worker.

**Fix:** After a successful `fulfillEventRequest()` in `CreateEventForm`, the app now calls `POST /api/send-emails` (fire-and-forget) so creator and upvoter emails are processed immediately.

### If creator/upvoter still has no email

- **Creator:** `email_for_user(created_by)` reads from `auth.users`. If the creator signed up with a provider that didn’t store email, or the user was deleted, the RPC skips the creator (no row inserted).
- **Upvoters:** Same for each upvoter; only users with an email in `auth.users` get a row. Check `event_request_votes` and `auth.users` for that request.

---

## When is it safe to clear the email_outbox table?

- **Safe to clear:** Rows with `status = 'sent'`. The send-emails worker only processes `status = 'pending'`, so once an email is marked `sent` it is never picked up again. You can delete these after any retention period you choose (e.g. 7–30 days for audit, or immediately if you don’t need the log).
- **Do not clear:** Rows with `status IN ('pending', 'sending')` — those are either queued or in flight. Clearing them can cause emails to never be sent.
- **Failed rows:** Optional. You can clear `status = 'failed'` if you’ve fixed the cause and don’t need to retry; otherwise fix the issue and re-queue or leave them for inspection.
- **Anomaly:** If you see `status = 'sent'` but `last_attempt_at` is NULL, that’s a data quirk (e.g. an older code path didn’t set the timestamp). The system still treats it as completed, so it’s safe to include in a “clear all sent” delete.

**Quick check before clearing:**
```sql
SELECT status, COUNT(*) FROM public.email_outbox GROUP BY status;
```
Only clear when you’re comfortable with what each status count represents (e.g. no pending/sending you still need).

---

## Clear email outbox (Supabase SQL)

Run in **Supabase Dashboard → SQL Editor** (or `psql`).

**Option A – Clear only unsent emails (pending, sending, failed):**
```sql
-- Removes only emails that have not been successfully sent
DELETE FROM public.email_outbox
WHERE status IN ('pending', 'sending', 'failed');
```

**Option B – Clear entire email_outbox:**
```sql
-- Removes all rows from email_outbox (sent and unsent)
DELETE FROM public.email_outbox;
```

To see what will be removed first:
```sql
SELECT status, COUNT(*) FROM public.email_outbox GROUP BY status;
```

---

## Next Steps

If emails still don't send:
1. Share the error from browser console
2. Share the `email_outbox` status for the failed email
3. Share Edge Function logs
4. Verify Resend API key is valid and email domain is verified

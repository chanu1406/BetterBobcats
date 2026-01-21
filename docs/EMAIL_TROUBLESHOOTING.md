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

## Next Steps

If emails still don't send:
1. Share the error from browser console
2. Share the `email_outbox` status for the failed email
3. Share Edge Function logs
4. Verify Resend API key is valid and email domain is verified

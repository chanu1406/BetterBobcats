# Deployment Guide: send-emails Edge Function

## Prerequisites

1. **Resend Account**: Sign up at https://resend.com and get your API key
2. **Supabase Project**: Ensure you have admin access to your Supabase project
3. **Supabase CLI**: Install if not already installed: `npm install -g supabase`

## Step 1: Apply Database Migration

First, apply the migration that creates the helper RPC function:

```bash
cd /path/to/BetterBobcats
npx supabase db push
```

This will create the `select_pending_emails_for_sending()` function that safely locks and selects emails.

## Step 2: Deploy the Edge Function

```bash
npx supabase functions deploy send-emails
```

## Step 3: Set Environment Variables

Set all required secrets in your Supabase project:

```bash
# Required: Resend API Key
npx supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxx

# Required: Supabase credentials (get from project settings)
npx supabase secrets set SUPABASE_URL=https://your-project.supabase.co
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Required: Secret for protecting the function
npx supabase secrets set SEND_EMAILS_SECRET=your-random-secret-token-here

# Optional: Customize sender info
npx supabase secrets set FROM_EMAIL=noreply@betterbobcats.com
npx supabase secrets set FROM_NAME=BetterBobcats
```

### Getting Your Credentials

1. **SUPABASE_URL**: Found in Project Settings > API > Project URL
2. **SUPABASE_SERVICE_ROLE_KEY**: Found in Project Settings > API > service_role key (⚠️ Keep secret!)
3. **RESEND_API_KEY**: Get from https://resend.com/api-keys
4. **SEND_EMAILS_SECRET**: Generate a random secure token (e.g., `openssl rand -hex 32`)

## Step 4: Verify Deployment

Test the function:

```bash
# Replace YOUR_SEND_EMAILS_SECRET with your actual secret
npx supabase functions invoke send-emails \
  --headers "x-worker-secret=YOUR_SEND_EMAILS_SECRET"
```

Expected response:
```json
{
  "success": true,
  "processed": 0,
  "message": "No pending emails to process"
}
```

## Step 5: Set Up Scheduling

The function needs to be called periodically to process emails. Choose one option:

### Option A: GitHub Actions (Recommended for GitHub repos)

Create `.github/workflows/send-emails.yml`:

```yaml
name: Send Emails

on:
  schedule:
    - cron: '*/2 * * * *'  # Every 2 minutes
  workflow_dispatch:  # Allow manual trigger

jobs:
  send-emails:
    runs-on: ubuntu-latest
    steps:
      - name: Invoke send-emails function
        run: |
          curl -X POST ${{ secrets.SUPABASE_FUNCTION_URL }}/functions/v1/send-emails \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "x-worker-secret: ${{ secrets.SEND_EMAILS_SECRET }}"
```

Add secrets to GitHub repository:
- `SUPABASE_FUNCTION_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key
- `SEND_EMAILS_SECRET`: Your worker secret

### Option B: Vercel Cron (If using Vercel)

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/send-emails",
    "schedule": "*/2 * * * *"
  }]
}
```

Create `api/cron/send-emails/route.ts`:

```typescript
export async function GET() {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/functions/v1/send-emails`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'x-worker-secret': process.env.SEND_EMAILS_SECRET!,
      },
    }
  );
  return Response.json(await response.json());
}
```

### Option C: Supabase pg_cron (Database-level)

If you have pg_cron enabled, create a scheduled job:

```sql
SELECT cron.schedule(
  'send-emails',
  '*/2 * * * *',  -- Every 2 minutes
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/send-emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'),
      'x-worker-secret', current_setting('app.settings.send_emails_secret')
    )
  );
  $$
);
```

### Option D: External Cron Service

Use services like:
- **Cron-job.org**: Free web-based cron
- **EasyCron**: Simple cron service
- **AWS EventBridge**: If using AWS

## Monitoring

Check function logs:

```bash
npx supabase functions logs send-emails
```

Monitor email_outbox table:

```sql
-- Check pending emails
SELECT COUNT(*) FROM email_outbox WHERE status = 'pending';

-- Check recent failures
SELECT * FROM email_outbox 
WHERE status = 'failed' 
ORDER BY last_attempt_at DESC 
LIMIT 10;

-- Check processing stats
SELECT 
  status,
  COUNT(*) as count,
  AVG(attempt_count) as avg_attempts
FROM email_outbox
GROUP BY status;
```

## Troubleshooting

### Function returns 401 Unauthorized
- Verify `x-worker-secret` header matches `SEND_EMAILS_SECRET` environment variable
- Check that the secret was set correctly: `npx supabase secrets list`

### Emails not sending
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for API usage and errors
- Verify `FROM_EMAIL` is verified in Resend

### Database errors
- Ensure migration `20260116000001_add_email_processing_rpc.sql` is applied
- Verify service role key has proper permissions

### Concurrent execution issues
- The function uses `FOR UPDATE SKIP LOCKED` to prevent duplicate processing
- Multiple instances can run safely in parallel

## Security Notes

⚠️ **Important Security Considerations:**

1. **Service Role Key**: Never expose this key in client-side code
2. **Worker Secret**: Use a strong random token (32+ characters)
3. **Rate Limiting**: Consider adding rate limiting to prevent abuse
4. **Monitoring**: Monitor function invocations for suspicious activity

## Testing

Test with a sample email:

```sql
-- Insert a test email
INSERT INTO email_outbox (
  to_email,
  template,
  payload,
  idempotency_key
) VALUES (
  'test@example.com',
  'club_approved_contact',
  '{"club_name": "Test Club", "club_slug": "test-club", "club_id": "00000000-0000-0000-0000-000000000000", "dashboard_url": "https://betterbobcats.com/admin/clubs"}',
  'test-' || gen_random_uuid()::text
);

-- Invoke function
-- Then check if email was sent
SELECT * FROM email_outbox WHERE to_email = 'test@example.com';
```

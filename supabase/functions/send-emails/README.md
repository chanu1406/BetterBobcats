# send-emails Edge Function

Supabase Edge Function that processes the `email_outbox` table and sends emails via Resend API.

## Overview

This function:
1. Selects up to 25 pending emails from `email_outbox`
2. Marks them as "sending" and increments attempt count
3. Sends emails via Resend API
4. Updates status to "sent" or "failed" based on result

## Supported Email Templates

- `club_approved_contact` - Sent when a club request is approved
- `club_rejected_contact` - Sent when a club request is rejected
- `club_officer_invite` - Sent to officers when they're invited to a club

## Environment Variables

Set these in your Supabase project dashboard under Edge Functions > send-emails > Settings:

### Required

- `RESEND_API_KEY` - Your Resend API key (get from https://resend.com/api-keys)
- `SUPABASE_URL` - Your Supabase project URL (e.g., `https://xxx.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (bypasses RLS)
- `SEND_EMAILS_SECRET` - Secret token for authenticating requests to this function

### Optional

- `FROM_EMAIL` - Email address to send from (default: `noreply@betterbobcats.com`)
- `FROM_NAME` - Display name for sender (default: `BetterBobcats`)

## Security

The function requires a header `x-worker-secret` that matches the `SEND_EMAILS_SECRET` environment variable. This prevents unauthorized access to the email sending function.

## Deployment

```bash
# Deploy the function
npx supabase functions deploy send-emails

# Set environment variables (after deployment)
npx supabase secrets set RESEND_API_KEY=your_key
npx supabase secrets set SUPABASE_URL=your_url
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_key
npx supabase secrets set SEND_EMAILS_SECRET=your_secret
npx supabase secrets set FROM_EMAIL=noreply@betterbobcats.com
npx supabase secrets set FROM_NAME=BetterBobcats
```

## Invocation

The function should be invoked periodically (e.g., via cron job or scheduled task):

```bash
curl -X POST https://your-project.supabase.co/functions/v1/send-emails \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "x-worker-secret: YOUR_SEND_EMAILS_SECRET"
```

Or using Supabase CLI:

```bash
npx supabase functions invoke send-emails \
  --headers "x-worker-secret=YOUR_SEND_EMAILS_SECRET"
```

## Scheduling

Set up a cron job or scheduled task to invoke this function every 1-5 minutes:

- **Cron example** (every 2 minutes): `*/2 * * * *`
- **Supabase Cron**: Use Supabase's pg_cron extension or external scheduler
- **External scheduler**: Use services like GitHub Actions, Vercel Cron, or similar

## Database Migration

Before deploying, ensure the helper RPC function is created:

```bash
# Apply the migration that creates select_pending_emails_for_sending()
npx supabase db push
```

## Response Format

Success response:
```json
{
  "success": true,
  "processed": 5,
  "successful": 4,
  "failed": 1
}
```

Error response:
```json
{
  "error": "Error message here"
}
```

## Error Handling

- Failed emails are marked with `status = 'failed'` and error message stored
- Emails can be retried by resetting status back to `pending`
- Maximum retry attempts should be handled at the application level

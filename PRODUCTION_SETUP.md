# Production Setup Guide for BetterBobcats

This guide outlines the production configuration needed for `betterbobcats.com`.

## Supabase Dashboard Configuration

### 1. Authentication URL Configuration

Go to **Supabase Dashboard > Authentication > URL Configuration** and ensure these settings:

#### Site URL
```
https://betterbobcats.com
```

#### Redirect URLs (add all of these)
```
https://betterbobcats.com
https://www.betterbobcats.com
https://betterbobcats.com/auth/callback
https://betterbobcats.com/auth/reset-password
https://betterbobcats.com/invites
https://betterbobcats.com/dashboard/*
```

**Important:** These URLs must be added in the Supabase Dashboard for authentication redirects to work properly.

### 2. Email Templates

Email templates are configured in `supabase/config.toml` and should already be set up:
- **Confirmation Email**: `supabase/templates/confirm_signup.html`
- **Password Reset Email**: `supabase/templates/reset_password.html`

Both templates reference `betterbobcats.com` in their footers.

### 3. Edge Functions Environment Variables

Ensure these environment variables are set in **Supabase Dashboard > Edge Functions > send-emails > Settings**:

- `RESEND_API_KEY` - Your Resend API key
- `SUPABASE_URL` - Your Supabase project URL (e.g., `https://xxx.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `SEND_EMAILS_SECRET` - Secret token for authenticating requests
- `FROM_EMAIL` - Email address to send from (e.g., `noreply@betterbobcats.com`)
- `FROM_NAME` - Display name (e.g., `BetterBobcats`)

### 4. Database Migrations

All database migrations already use `https://betterbobcats.com` as the base URL for:
- Club invite emails
- Officer invite emails
- Member invite emails
- Dashboard URLs in emails

## Frontend Configuration

### Environment Variables

Ensure these are set in your production environment (Vercel, etc.):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://your-api-url.com  # If using separate API
```

### Dynamic URLs

The frontend uses `window.location.origin` for redirects, which automatically adapts to the production domain. No changes needed.

## Email Links

All email templates and database triggers use `https://betterbobcats.com` for:
- Club dashboard links
- Invite acceptance links (`/invites`)
- Password reset links (`/auth/reset-password`)
- Email confirmation links (handled by Supabase)

## Testing Checklist

After deploying to production, test:

- [ ] User signup and email confirmation
- [ ] Password reset flow (forgot password → email → reset)
- [ ] Club invite emails (admin, officer, member)
- [ ] OAuth login redirects
- [ ] All email links point to `betterbobcats.com`
- [ ] Dashboard URLs in emails are correct

## Important Notes

1. **Supabase Dashboard Settings**: The `supabase/config.toml` file is for local development. Production settings must be configured in the Supabase Dashboard.

2. **Redirect URLs**: All redirect URLs must be explicitly whitelisted in the Supabase Dashboard for security.

3. **Email Domain**: Ensure your email sending domain (`noreply@betterbobcats.com`) is verified in Resend.

4. **HTTPS**: All production URLs should use HTTPS.

## Local Development

For local development, the config includes localhost URLs:
- `http://127.0.0.1:3000`
- `http://localhost:3000`
- `https://localhost:3000`

These are automatically used when running locally.

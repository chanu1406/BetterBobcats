import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Auth callback handler
 * Handles OAuth callbacks, email confirmation, and password reset tokens
 * Checks if user is a platform admin for admin routes and redirects appropriately
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token = requestUrl.searchParams.get('token')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') || '/admin'
  const isAdminRoute = next.startsWith('/admin')

  const supabase = await createClient()

  // Check if we have a session (might be set by Supabase's verify endpoint)
  const { data: { session } } = await supabase.auth.getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Handle email confirmation token
  // Supabase's verify endpoint may have already processed the token and set a session
  if (type === 'email' || (token && type === 'email')) {
    // If we have a token, verify it
    if (token) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      })

      if (error) {
        // Token is invalid or expired
        return NextResponse.redirect(
          new URL(`/auth/confirm-email?error=invalid_token`, requestUrl.origin)
        )
      }
    }

    // Email confirmed successfully (either via token or Supabase's verify endpoint)
    // Check if this is a new user signup - if so, redirect to welcome page
    if (user) {
      // Check if user has already seen the welcome modal
      const welcomeModalShown = user.user_metadata?.welcome_modal_shown === true;
      
      // Only show welcome modal if user hasn't seen it before
      if (!welcomeModalShown) {
        const nextParam = requestUrl.searchParams.get('next')
        const welcomeUrl = new URL(`/auth/welcome`, requestUrl.origin)
        if (nextParam && !nextParam.startsWith('/admin')) {
          welcomeUrl.searchParams.set('next', nextParam)
        }
        return NextResponse.redirect(welcomeUrl)
      }
    }

    // Existing user or user with clubs - show confirmation success
    return NextResponse.redirect(
      new URL(`/auth/confirm-email?success=true`, requestUrl.origin)
    )
  }

  // If we have a session but no code/token, and type is email, this might be from Supabase's verify endpoint
  // Check if user is new and redirect to welcome page
  if (session && user && type === 'email' && !code && !token) {
    // Check if user has already seen the welcome modal
    const welcomeModalShown = user.user_metadata?.welcome_modal_shown === true;
    
    // Only show welcome modal if user hasn't seen it before
    if (!welcomeModalShown) {
      const welcomeUrl = new URL(`/auth/welcome`, requestUrl.origin)
      return NextResponse.redirect(welcomeUrl)
    }
  }

  // Fallback: If we have a session but no code/token/type, and user was just created
  // This handles cases where Supabase's verify endpoint redirects without preserving query params
  if (session && user && !code && !token && !type) {
    // Check if user was created recently (within last 5 minutes) - likely a new signup
    const userCreatedAt = new Date(user.created_at)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    
    // Check if user has already seen the welcome modal
    const welcomeModalShown = user.user_metadata?.welcome_modal_shown === true;
    
    if (userCreatedAt > fiveMinutesAgo && !welcomeModalShown) {
      // Only show welcome modal for newly created users who haven't seen it
      const welcomeUrl = new URL(`/auth/welcome`, requestUrl.origin)
      return NextResponse.redirect(welcomeUrl)
    }
  }

  // Handle password reset token
  // When Supabase redirects here, it includes hash tokens (#access_token=...)
  // The browser client will automatically process these, so we just redirect to reset page
  if (type === 'recovery') {
    // Redirect to reset password page
    // The page will check for session (which Supabase client sets from hash tokens)
    return NextResponse.redirect(
      new URL(`/auth/reset-password`, requestUrl.origin)
    )
  }

  // Handle OAuth callback (existing functionality)
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
    
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    // Only check for platform admin if accessing admin routes
    if (isAdminRoute) {
      if (user) {
        const { data } = await supabase
          .from('platform_admins')
          .select('user_id')
          .eq('user_id', user.id)
          .single()
        
        // If user is not a platform admin, sign them out and redirect to login with error
        if (!data) {
          await supabase.auth.signOut()
          return NextResponse.redirect(new URL(`/auth/login?error=not_authorized&next=${encodeURIComponent(next)}`, requestUrl.origin))
        }
      }
    }
    
    // Check if this is a new user (OAuth signup) - show welcome modal
    if (user) {
      // Check if user has already seen the welcome modal
      const welcomeModalShown = user.user_metadata?.welcome_modal_shown === true;
      
      // Only show welcome modal if user hasn't seen it before
      if (!welcomeModalShown) {
        const welcomeUrl = new URL(`/auth/welcome`, requestUrl.origin)
        if (next && !isAdminRoute) {
          welcomeUrl.searchParams.set('next', next)
        }
        return NextResponse.redirect(welcomeUrl)
      }
    }
  }

  // Redirect to the next URL
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}

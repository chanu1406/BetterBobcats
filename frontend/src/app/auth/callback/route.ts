import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * OAuth callback handler
 * Exchanges the authorization code for a session
 * Checks if user is a platform admin and redirects appropriately
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/admin'

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
    
    // Check if user is a platform admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    if (user) {
      const { data } = await supabase
        .from('platform_admins')
        .select('user_id')
        .eq('user_id', user.id)
        .single()
      
      // If user is not a platform admin, sign them out and redirect to login with error
      if (!data) {
        await supabase.auth.signOut()
        return NextResponse.redirect(new URL('/auth/login?error=not_authorized', requestUrl.origin))
      }
    }
  }

  // Redirect to the next URL or /admin
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Require user to be authenticated
 * Redirects to /auth/login if not logged in
 * Returns the user if authenticated
 * @param next - Optional redirect URL after login
 */
export async function requireUser(next?: string) {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    const redirectUrl = next 
      ? `/auth/login?next=${encodeURIComponent(next)}`
      : '/auth/login'
    redirect(redirectUrl)
  }

  return user
}

/**
 * Require user to be a platform admin
 * First checks if user is authenticated, then checks if they're in platform_admins table
 * Redirects to /admin/login if not authenticated
 * Redirects to /not-authorized if not a platform admin
 * Returns the user if they are a platform admin
 */
export async function requirePlatformAdmin() {
  const user = await requireUser()
  const supabase = await createClient()

  // Check if user is in platform_admins table
  const { data, error } = await supabase
    .from('platform_admins')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    redirect('/not-authorized')
  }

  return user
}

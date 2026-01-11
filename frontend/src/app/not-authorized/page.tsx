import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './LogoutButton'

export const metadata = {
  title: 'Not Authorized - BetterBobcats',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Not Authorized Page
 * Shown when a user is authenticated but not a platform admin
 */
export default async function NotAuthorizedPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is not logged in, redirect to login
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-xl border-2 border-primary/20 shadow-xl text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Not Authorized
          </h1>
          <p className="text-muted-foreground mb-6">
            You are logged in, but you don't have permission to access the admin panel.
            Please contact a platform administrator if you believe this is an error.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Homepage
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

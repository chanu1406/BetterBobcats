'use client'

import { createClient } from '@/lib/supabase/browser'
import { useRouter } from 'next/navigation'

/**
 * Client component for logout button
 * Signs out the user and redirects to login page
 */
export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
    >
      Try Different Account
    </button>
  )
}

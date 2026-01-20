import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginCard } from "./LoginCard";

export const metadata = {
  title: "Admin Login - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Login Page
 * Shows login form with Google OAuth login button
 * Redirects appropriately based on next parameter
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; message?: string; email?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const next = params?.next || "/admin";
  const isAdminRoute = next.startsWith("/admin");
  const error = params?.error === 'not_authorized';
  const message = params?.message;
  const email = params?.email;

  // If user is logged in, handle redirect based on route
  if (user) {
    if (isAdminRoute) {
      // Check if they're a platform admin
      const { data } = await supabase
        .from('platform_admins')
        .select('user_id')
        .eq('user_id', user.id)
        .single();

      // If they're a platform admin, redirect to admin dashboard
      if (data) {
        redirect(next);
      }
      // If they're logged in but not an admin, sign them out
      await supabase.auth.signOut();
    } else {
      // For non-admin routes, just redirect
      redirect(next);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <LoginCard next={next} error={error ? 'not_authorized' : undefined} isAdminRoute={isAdminRoute} message={message} prefilledEmail={email} />
    </div>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginButton from "./LoginButton";

export const metadata = {
  title: "Admin Login - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Admin Login Page
 * Shows Google OAuth login button
 * Redirects to /admin if already authenticated and is a platform admin
 */
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is logged in, check if they're a platform admin
  if (user) {
    const { data } = await supabase
      .from('platform_admins')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    // If they're a platform admin, redirect to admin dashboard
    if (data) {
      redirect("/admin");
    }
    // If they're logged in but not an admin, sign them out
    await supabase.auth.signOut();
  }

  const params = await searchParams;
  const error = params?.error === 'not_authorized';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-xl border-2 border-primary/20 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground">
              Sign in with Google to access the admin panel
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-destructive/10 border-2 border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
              The account you signed in with does not have admin access. Please try a different account or contact an administrator.
            </div>
          )}

          <LoginButton />
        </div>
      </div>
    </div>
  );
}

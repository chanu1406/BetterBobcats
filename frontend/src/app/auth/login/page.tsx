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
 * Login Page
 * Shows Google OAuth login button
 * Redirects appropriately based on next parameter
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const next = params?.next || "/admin";
  const isAdminRoute = next.startsWith("/admin");
  const error = params?.error === 'not_authorized';

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
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-xl border-2 border-primary/20 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {isAdminRoute ? "Admin Login" : "Login"}
            </h1>
            <p className="text-muted-foreground">
              {isAdminRoute 
                ? "Sign in with Google to access the admin panel"
                : "Sign in with Google to continue"}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-destructive/10 border-2 border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
              {isAdminRoute
                ? "The account you signed in with does not have admin access. Please try a different account or contact an administrator."
                : "There was an error signing in. Please try again."}
            </div>
          )}

          <LoginButton next={next} />
        </div>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { checkAuthAction } from "../actions";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Admin Login Page
 * Server-side check: redirect to /admin if already authenticated
 */
export default async function AdminLoginPage() {
  // Check if already authenticated
  const isAuthenticated = await checkAuthAction();
  
  if (isAuthenticated) {
    // Already authenticated, redirect to admin dashboard
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-xl border-2 border-primary/20 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground">
              Internal admin access only
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

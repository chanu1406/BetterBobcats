import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignUpCard } from "./SignUpCard";

export const metadata = {
  title: "Sign Up - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Sign Up Page
 * Allows users to create an account with email/password or Google OAuth
 */
export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; email?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const next = params?.next || "/";
  const error = params?.error;
  const email = params?.email;

  // If user is already logged in, redirect
  if (user) {
    redirect(next);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <SignUpCard next={next} error={error} prefilledEmail={email} />
    </div>
  );
}

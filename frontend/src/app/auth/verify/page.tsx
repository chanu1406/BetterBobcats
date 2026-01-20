"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    const handleVerification = async () => {
      const supabase = createClient();

      // Wait for Supabase to process hash tokens if present
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check for session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        router.push("/auth/confirm-email?error=invalid_token");
        return;
      }

      // Get user info
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/confirm-email?error=invalid_token");
        return;
      }

      // Check if this is a new user (email confirmation for signup)
      if (type === "signup" || type === "email") {
        // Check if user has already seen the welcome modal
        const welcomeModalShown = user.user_metadata?.welcome_modal_shown === true;
        
        // Only show welcome modal if user hasn't seen it before
        if (!welcomeModalShown) {
          router.push("/auth/welcome");
          return;
        }
      }

      // Existing user - redirect to dashboard
      router.push("/dashboard");
    };

    handleVerification();
  }, [router, type]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="text-center text-muted-foreground">Verifying your email...</div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}

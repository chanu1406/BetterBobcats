"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/browser";
import Link from "next/link";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const tokenParam = searchParams.get("token");
  const typeParam = searchParams.get("type");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Check if user has a valid session
    // Supabase's verify endpoint sets the session automatically when redirecting with hash tokens
    const checkSession = async () => {
      const supabase = createClient();
      
      // Check for error param first
      if (errorParam === "invalid_token") {
        setError("This reset link has expired or is invalid. Please request a new one.");
        setIsVerifying(false);
        return;
      }
      
      // Listen for auth state changes (Supabase processes hash tokens automatically)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state change:", event, session ? "has session" : "no session");
        
        if (event === 'PASSWORD_RECOVERY' && session) {
          // Password recovery token was processed successfully
          setHasSession(true);
          setIsVerifying(false);
        } else if (event === 'SIGNED_IN' && session) {
          // User signed in (session created)
          setHasSession(true);
          setIsVerifying(false);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Token was refreshed
          setHasSession(true);
          setIsVerifying(false);
        }
      });
      
      // Check for existing session immediately
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (session) {
        // We already have a session
        setHasSession(true);
        setIsVerifying(false);
        subscription.unsubscribe();
        return;
      }
      
      if (sessionError) {
        console.error("Session error:", sessionError);
      }
      
      // Wait a moment for Supabase to process hash tokens from URL
      setTimeout(async () => {
        const { data: { session: retrySession } } = await supabase.auth.getSession();
        if (retrySession) {
          setHasSession(true);
        } else {
          // No session after waiting - show error
          setError("Invalid or missing reset token. Please request a new password reset link.");
        }
        setIsVerifying(false);
        subscription.unsubscribe();
      }, 1500);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, [errorParam]);

  const validatePassword = (): boolean => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePassword()) {
      return;
    }

    if (!hasSession) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();

        // Update the password (session is already set from token verification in callback)
        const { error: updateError } = await supabase.auth.updateUser({
          password: password,
        });

        if (updateError) {
          if (updateError.message.includes("Too many requests")) {
            setError("Too many attempts. Please try again later.");
          } else {
            setError(updateError.message || "Failed to update password. Please try again.");
          }
          return;
        }

        setSuccess(true);
        // Sign out to force re-login with new password
        await supabase.auth.signOut();
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/auth/login?message=password_reset");
        }, 2000);
      } catch (err) {
        console.error("Reset password error:", err);
        setError("Connection error. Please try again.");
      }
    });
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">Verifying reset link...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasSession && error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#1a73e8]">
              Invalid Reset Link
            </CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md mb-4">
              {error}
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline w-full text-center"
            >
              Request a new reset link
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-[#1a73e8]">
              Reset Password
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your new password below.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}
          {success ? (
            <div className="p-4 text-sm bg-green-50 border border-green-200 rounded-md text-green-800">
              <p className="font-medium">Password updated successfully!</p>
              <p className="mt-1">Redirecting to login page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="h-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 6 characters long.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="h-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isPending}
                  required
                  minLength={6}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <Link
            href="/auth/login"
            className="text-sm text-primary hover:underline w-full text-center"
          >
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">Loading...</div>
          </CardContent>
        </Card>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}

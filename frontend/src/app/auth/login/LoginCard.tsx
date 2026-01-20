"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
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

interface LoginCardProps {
  next?: string;
  error?: string;
  isAdminRoute?: boolean;
  message?: string;
  prefilledEmail?: string;
}

export function LoginCard({ next, error, isAdminRoute, message, prefilledEmail }: LoginCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState(prefilledEmail || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);

  // Update email if prefilledEmail changes
  useEffect(() => {
    if (prefilledEmail) {
      setEmail(prefilledEmail);
    }
  }, [prefilledEmail]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setEmailNotConfirmed(false);

    startTransition(async () => {
      try {
        const supabase = createClient();
        const origin = window.location.origin;
        const nextUrl = next || "/admin";

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (signInError) {
          // Handle specific error cases
          if (signInError.message.includes("Email not confirmed") || signInError.message.includes("email_not_confirmed")) {
            setEmailNotConfirmed(true);
            setLoginError("Please confirm your email address before signing in.");
          } else if (signInError.message.includes("Invalid login credentials") || signInError.message.includes("invalid_credentials")) {
            setLoginError("Invalid email or password.");
          } else if (signInError.message.includes("Too many requests") || signInError.message.includes("too_many_requests")) {
            setLoginError("Too many attempts. Please try again later.");
          } else {
            setLoginError(signInError.message || "An error occurred. Please try again.");
          }
          return;
        }

        if (!data.user) {
          setLoginError("An error occurred. Please try again.");
          return;
        }

        // Check if this is an admin route and verify admin status
        if (isAdminRoute) {
          const { data: adminData, error: adminError } = await supabase
            .from('platform_admins')
            .select('user_id')
            .eq('user_id', data.user.id)
            .single();

          if (adminError || !adminData) {
            await supabase.auth.signOut();
            router.push(`/auth/login?error=not_authorized&next=${encodeURIComponent(nextUrl)}`);
            return;
          }
        }

        // Successful login - redirect
        router.push(nextUrl);
        router.refresh();
      } catch (err) {
        console.error('Login error:', err);
        setLoginError("Connection error. Please try again.");
      }
    });
  };

  const handleResendConfirmation = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
      });

      if (error) {
        setLoginError("Failed to resend confirmation email. Please try again.");
      } else {
        setLoginError(null);
        alert("Confirmation email sent! Please check your inbox.");
      }
    } catch (err) {
      setLoginError("Failed to resend confirmation email. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const nextUrl = next || "/admin";
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`,
          queryParams: {
            prompt: 'select_account', // Force account selection screen
          },
        },
      });
      
      if (error) {
        console.error('OAuth error:', error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#1a73e8]">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {message === "password_reset" && (
          <div className="p-3 text-sm bg-green-50 border border-green-200 rounded-md text-green-800">
            Password reset successful! You can now sign in with your new password.
          </div>
        )}
        {(error || loginError) && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error && isAdminRoute
              ? "The account you signed in with does not have admin access. Please try a different account or contact an administrator."
              : loginError || "There was an error signing in. Please try again."}
            {emailNotConfirmed && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  className="text-sm text-primary hover:underline"
                >
                  Resend confirmation email
                </button>
              </div>
            )}
          </div>
        )}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              className="h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              required 
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col space-y-3">
        <Button 
          type="submit" 
          className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold" 
          onClick={handleEmailLogin}
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-10 border-gray-300 hover:bg-gray-50" 
          onClick={handleGoogleLogin}
        >
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Login with Google
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

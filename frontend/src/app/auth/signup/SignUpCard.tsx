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

interface SignUpCardProps {
  next?: string;
  error?: string;
  prefilledEmail?: string;
}

export function SignUpCard({ next, error, prefilledEmail }: SignUpCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState(prefilledEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Update email if prefilledEmail changes
  useEffect(() => {
    if (prefilledEmail) {
      setEmail(prefilledEmail);
    }
  }, [prefilledEmail]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError(null);
    setSuccess(false);

    // Validate passwords match
    if (password !== confirmPassword) {
      setSignUpError("Passwords do not match.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setSignUpError("Password must be at least 6 characters long.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const origin = window.location.origin;

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            emailRedirectTo: `${origin}/auth/verify?type=signup`,
          },
        });

        if (signUpError) {
          // Handle specific error cases
          if (signUpError.message.includes("User already registered") || signUpError.message.includes("already_registered")) {
            setSignUpError("An account with this email already exists. Please sign in instead.");
          } else if (signUpError.message.includes("Password")) {
            setSignUpError("Password does not meet requirements. Please use a stronger password.");
          } else if (signUpError.message.includes("Too many requests") || signUpError.message.includes("too_many_requests")) {
            setSignUpError("Too many attempts. Please try again later.");
          } else {
            setSignUpError(signUpError.message || "An error occurred. Please try again.");
          }
          return;
        }

        if (!data.user) {
          setSignUpError("An error occurred. Please try again.");
          return;
        }

        // Success - show confirmation message
        setSuccess(true);
      } catch (err) {
        console.error('Sign up error:', err);
        setSignUpError("Connection error. Please try again.");
      }
    });
  };

  const handleGoogleSignUp = async () => {
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const nextUrl = next || "/";
      
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
        setSignUpError("Failed to sign up with Google. Please try again.");
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setSignUpError("Connection error. Please try again.");
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-[#1a73e8]">
              Check your email
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              We've sent a confirmation link to your email address.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-sm bg-green-50 border border-green-200 rounded-md text-green-800">
            <p className="font-medium mb-2">Account created successfully!</p>
            <p>
              Please check your email at <strong>{email}</strong> and click the confirmation link to verify your account. 
              Once confirmed, you'll be able to sign in.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <Link
            href="/auth/login"
            className="text-sm text-primary hover:underline w-full text-center"
          >
            Back to login
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#1a73e8]">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your information below to create your account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {(error || signUpError) && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error || signUpError}
          </div>
        )}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
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
            <Label htmlFor="password" className="text-sm font-medium">
              Password
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
        </form>
      </CardContent>
      <CardFooter className="flex-col space-y-3">
        <Button 
          type="submit" 
          className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold" 
          onClick={handleEmailSignUp}
          disabled={isPending}
        >
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full h-10 border-gray-300 hover:bg-gray-50" 
          onClick={handleGoogleSignUp}
          disabled={isPending}
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
          Sign up with Google
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

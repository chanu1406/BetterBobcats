"use client";

import { useState, useTransition, Suspense } from "react";
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

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendError(null);
    setResendSuccess(false);

    if (!email.trim()) {
      setResendError("Please enter your email address.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();

        const { error: resendError } = await supabase.auth.resend({
          type: "signup",
          email: email.trim(),
        });

        if (resendError) {
          if (resendError.message.includes("Too many requests")) {
            setResendError("Too many attempts. Please try again later.");
          } else if (resendError.message.includes("not found") || resendError.message.includes("does not exist")) {
            setResendError("No account found with this email address.");
          } else {
            setResendError(resendError.message || "Failed to resend confirmation email. Please try again.");
          }
          return;
        }

        setResendSuccess(true);
      } catch (err) {
        console.error("Resend confirmation error:", err);
        setResendError("Connection error. Please try again.");
      }
    });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-[#1a73e8]">
                Email Confirmed!
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Your email address has been successfully confirmed.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 text-sm bg-green-50 border border-green-200 rounded-md text-green-800">
              <p className="font-medium">You can now sign in to your account.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
            >
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (error === "invalid_token") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-[#1a73e8]">
                Invalid or Expired Link
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                This confirmation link is invalid or has expired.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              The confirmation link you used is no longer valid. Please request a new confirmation email.
            </div>
            <form onSubmit={handleResend} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
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
              {resendError && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {resendError}
                </div>
              )}
              {resendSuccess && (
                <div className="p-3 text-sm bg-green-50 border border-green-200 rounded-md text-green-800">
                  Confirmation email sent! Please check your inbox.
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Resend Confirmation Email"}
              </Button>
            </form>
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

  // Default view - allow resending confirmation email
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-[#1a73e8]">
              Confirm Your Email
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Please check your email and click the confirmation link. If you didn't receive it, you can request a new one below.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleResend} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
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
            {resendError && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {resendError}
              </div>
            )}
            {resendSuccess && (
              <div className="p-3 text-sm bg-green-50 border border-green-200 rounded-md text-green-800">
                Confirmation email sent! Please check your inbox.
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Resend Confirmation Email"}
            </Button>
          </form>
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

export default function ConfirmEmailPage() {
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
      <ConfirmEmailContent />
    </Suspense>
  );
}

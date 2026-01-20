"use client";

import { useState, useTransition } from "react";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        const supabase = createClient();
        const origin = window.location.origin;

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${origin}/auth/callback?type=recovery`,
          }
        );

        if (resetError) {
          if (resetError.message.includes("Too many requests")) {
            setError("Too many attempts. Please try again later.");
          } else {
            setError(resetError.message || "Failed to send reset email. Please try again.");
          }
          return;
        }

        setSuccess(true);
      } catch (err) {
        console.error("Reset password error:", err);
        setError("Connection error. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-[#1a73e8]">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password.
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
              <p className="font-medium mb-2">Check your email</p>
              <p>
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and click the link to reset your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button
                type="submit"
                className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Reset Link"}
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

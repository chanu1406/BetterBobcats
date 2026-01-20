"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogIn, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "request" | "upvote";
}

export function SignInDialog({ open, onOpenChange, action }: SignInDialogProps) {
  const router = useRouter();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/events";

  const handleSignIn = () => {
    // Redirect to login with next parameter to return here
    router.push(`/auth/login?next=${encodeURIComponent(currentPath)}`);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="space-y-4 pb-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto">
            <LogIn className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-2">
            <AlertDialogTitle className="text-center text-xl font-semibold">
              Sign In Required
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-muted-foreground leading-relaxed">
              {action === "request"
                ? "Please sign in to create an event request."
                : "Please sign in to upvote event requests."}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2 sm:gap-3 mt-6">
          <AlertDialogCancel className="flex-1 sm:flex-initial min-w-[100px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleSignIn} 
            className="flex-1 sm:flex-initial min-w-[120px] gap-2"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

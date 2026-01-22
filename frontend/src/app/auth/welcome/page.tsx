"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Mail, Calendar } from "lucide-react";

function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const [open, setOpen] = useState(true);

  const markWelcomeModalShown = async () => {
    const supabase = createClient();
    // Update user metadata to track that welcome modal has been shown
    await supabase.auth.updateUser({
      data: {
        welcome_modal_shown: true,
        welcome_modal_shown_at: new Date().toISOString(),
      },
    });
  };

  const handleContinue = async () => {
    setOpen(false);
    await markWelcomeModalShown();
    if (next) {
      router.push(next);
    } else {
      router.push("/dashboard");
    }
  };

  const handleButtonClick = async (href: string) => {
    setOpen(false);
    await markWelcomeModalShown();
    router.push(href);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleContinue();
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Thank You for Creating a New Account!</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Now that you have made a new account, you have access to these features on BetterBobcats:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <Button
              onClick={() => handleButtonClick("/clubs/request")}
              className="w-full h-auto py-4 px-4 justify-start gap-3"
              variant="outline"
            >
              <Users className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-semibold">Create a New Club</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Club request form
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleButtonClick("/invites")}
              className="w-full h-auto py-4 px-4 justify-start gap-3"
              variant="outline"
            >
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-semibold">Access to Your Club Invites</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Invites dashboard
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleButtonClick("/events")}
              className="w-full h-auto py-4 px-4 justify-start gap-3"
              variant="outline"
            >
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-semibold">Post Event Requests</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Events page
                </div>
              </div>
            </Button>
          </div>

          <DialogFooter>
            <Button onClick={handleContinue} variant="outline" className="w-full">
              {next ? "Continue" : "Continue to Dashboard"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  );
}

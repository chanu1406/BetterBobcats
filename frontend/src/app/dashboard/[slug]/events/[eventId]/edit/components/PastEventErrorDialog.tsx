"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

interface PastEventErrorDialogProps {
  clubSlug: string;
}

export function PastEventErrorDialog({ clubSlug }: PastEventErrorDialogProps) {
  const router = useRouter();

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <AlertDialogTitle className="text-left">
              Cannot Edit Past Events
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2 text-left">
            This event has already passed and cannot be edited. You can still view it in the events list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => router.push(`/dashboard/${clubSlug}/events`)}
            className="w-full sm:w-auto"
          >
            Back to Events
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

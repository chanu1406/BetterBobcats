"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { ArrowUp, Trash2, ExternalLink, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import type { EventRequest } from "@/types/event-request";
import { cn } from "@/lib/utils";
import {
  fetchEventRequestDetails,
  toggleEventRequestVote,
  deleteEventRequest,
} from "@/lib/event-requests";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInDialog } from "./SignInDialog";

interface EventRequestDrawerProps {
  request: EventRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestDeleted: () => void;
  onVoteToggled: () => void;
}

export function EventRequestDrawer({
  request,
  open,
  onOpenChange,
  onRequestDeleted,
  onVoteToggled,
}: EventRequestDrawerProps) {
  const { addToast } = useToast();
  const supabase = createClient();

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (open && request) {
      loadDetails();
      checkIsCreator();
      checkAuth();
    } else {
      setDetails(null);
    }
  }, [open, request]);

  const checkAuth = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const loadDetails = async () => {
    if (!request) return;

    try {
      setLoading(true);
      const data = await fetchEventRequestDetails(request.id);
      setDetails(data);
    } catch (err) {
      console.error("Error loading request details:", err);
      addToast({
        title: "Error",
        description: "Failed to load request details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkIsCreator = async () => {
    if (!request) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsCreator(user?.id === request.created_by);
    } catch (err) {
      console.error("Error checking creator:", err);
    }
  };

  const handleVote = async () => {
    if (!request) return;

    // Check authentication first
    if (isAuthenticated === false) {
      setSignInDialogOpen(true);
      return;
    }

    // If auth status is still loading, wait
    if (isAuthenticated === null) {
      return;
    }

    try {
      setVoting(true);
      await toggleEventRequestVote(request.id);
      await loadDetails();
      onVoteToggled();
    } catch (err) {
      console.error("Error voting:", err);
      // Check if error is due to authentication - show sign-in dialog instead of error toast
      if (err instanceof Error && (err.message.includes("Must be authenticated") || err.message.includes("authentication"))) {
        setIsAuthenticated(false);
        setSignInDialogOpen(true);
      } else {
        // Only show error toast for non-auth errors
        addToast({
          title: "Error",
          description:
            err instanceof Error
              ? err.message
              : "Failed to vote. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setVoting(false);
    }
  };

  const handleDelete = async () => {
    if (!request) return;

    try {
      setDeleting(true);
      await deleteEventRequest(request.id);
      addToast({
        title: "Request deleted",
        description: "Your request has been deleted.",
        variant: "default",
      });
      setDeleteDialogOpen(false);
      onRequestDeleted();
    } catch (err) {
      console.error("Error deleting request:", err);
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to delete request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (!request) return null;

  const isFulfilled = request.status === "fulfilled";

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Event Request</SheetTitle>
            <SheetDescription>
              {isFulfilled
                ? "This request has been fulfilled"
                : "View and interact with this event request"}
            </SheetDescription>
          </SheetHeader>

          {loading ? (
            <div className="space-y-4 mt-6">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : details ? (
            <div className="space-y-6 mt-6">
              {/* Status and Major */}
              <div className="flex flex-wrap gap-2">
                {isFulfilled && (
                  <Badge variant="secondary">Fulfilled</Badge>
                )}
                {details.is_all_majors ? (
                  <Badge variant="outline">All Majors</Badge>
                ) : details.major_name ? (
                  <Badge variant="outline">{details.major_name}</Badge>
                ) : null}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {details.description}
                </p>
              </div>

              {/* Tags */}
              {details.tags && details.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Vote Section - Reddit Style */}
              {!isFulfilled && (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-10 w-10 p-0 rounded-md transition-all duration-150",
                      "hover:bg-orange-100 hover:text-orange-600",
                      "active:scale-95",
                      "focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
                      details.user_has_voted && "bg-orange-100 text-orange-600"
                    )}
                    onClick={handleVote}
                    disabled={voting}
                    aria-label={details.user_has_voted ? "Remove upvote" : "Upvote this request"}
                  >
                    <ArrowUp
                      className={cn(
                        "h-5 w-5 transition-transform duration-150",
                        details.user_has_voted && "fill-current",
                        voting && "animate-pulse"
                      )}
                    />
                  </Button>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-base font-semibold",
                        details.user_has_voted ? "text-orange-600" : "text-foreground"
                      )}
                    >
                      {details.vote_count || 0}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vote{details.vote_count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              )}

              {/* Fulfilled Event */}
              {isFulfilled && details.fulfilled_event && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold mb-3">
                      Fulfilled Event
                    </h3>
                    <div className="border rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold">
                        {details.fulfilled_event.title}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(
                              new Date(details.fulfilled_event.starts_at),
                              "EEEE, MMMM d, yyyy 'at' h:mm a"
                            )}
                          </span>
                        </div>
                        {details.fulfilled_event.location_name && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{details.fulfilled_event.location_name}</span>
                          </div>
                        )}
                        <div className="text-muted-foreground">
                          Hosted by {details.fulfilled_event.club_name}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // Navigate to event - adjust URL as needed
                          window.location.href = `/events`;
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Event
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Delete Button (Creator only) */}
              {isCreator && !isFulfilled && (
                <>
                  <Separator />
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Request
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="mt-6 text-center text-muted-foreground">
              Failed to load request details.
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Sign In Dialog */}
      <SignInDialog
        open={signInDialogOpen}
        onOpenChange={setSignInDialogOpen}
        action="upvote"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Request?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this request? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pin,
  MoreHorizontal,
  Trash2,
  ArrowBigUp,
  Calendar,
  MapPin,
  Link as LinkIcon,
  ExternalLink,
  X,
} from "lucide-react";
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

interface RequestDetailsPanelProps {
  request: EventRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestDeleted: () => void;
  onVoteToggled: () => void;
}

export function RequestDetailsPanel({
  request,
  open,
  onOpenChange,
  onRequestDeleted,
  onVoteToggled,
}: RequestDetailsPanelProps) {
  const { addToast } = useToast();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [voting, setVoting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const moreActionsRef = useRef<HTMLDivElement>(null);

  // Get current user once (compute isCreator locally, no DB call)
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsAuthenticated(!!user);
        setCurrentUser(user?.id || null);
      } catch (err) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };
    checkAuth();
  }, []);

  // Compute isCreator locally (no DB call)
  const isCreator = request && currentUser ? request.created_by === currentUser : false;

  // Use TanStack Query for caching and prefetching
  const {
    data: details,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["event-request-details", request?.id],
    queryFn: () => {
      if (!request) return null;
      return fetchEventRequestDetails(request.id);
    },
    enabled: open && !!request,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (error) {
      addToast({
        title: "Error",
        description: "Failed to load request details.",
        variant: "destructive",
      });
    }
  }, [error, addToast]);

  useEffect(() => {
    if (!open) {
      setShowMoreActions(false);
    }
  }, [open]);

  // Close overflow menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreActionsRef.current &&
        !moreActionsRef.current.contains(event.target as Node)
      ) {
        setShowMoreActions(false);
      }
    };

    if (showMoreActions) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showMoreActions]);

  const handleVote = async () => {
    if (!request) return;

    if (isAuthenticated === false) {
      setSignInDialogOpen(true);
      return;
    }

    if (isAuthenticated === null) {
      return;
    }

    try {
      setVoting(true);
      await toggleEventRequestVote(request.id);
      // Invalidate and refetch the query
      await queryClient.invalidateQueries({
        queryKey: ["event-request-details", request.id],
      });
      onVoteToggled();
    } catch (err) {
      console.error("Error voting:", err);
      if (
        err instanceof Error &&
        (err.message.includes("Must be authenticated") ||
          err.message.includes("authentication"))
      ) {
        setIsAuthenticated(false);
        setSignInDialogOpen(true);
      } else {
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
      onOpenChange(false);
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

  const copyLink = () => {
    if (typeof window !== "undefined" && request) {
      const url = `${window.location.origin}/events?request=${request.id}`;
      navigator.clipboard.writeText(url);
      addToast({
        title: "Link copied",
        description: "Request link copied to clipboard.",
        variant: "default",
      });
      setShowMoreActions(false);
    }
  };

  if (!request) return null;

  const isFulfilled = request.status === "fulfilled";
  const isOpen = request.status === "open";
  const isClosed = request.status === "closed";

  const getStatusBadge = () => {
    if (isFulfilled) {
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
          Fulfilled
        </Badge>
      );
    }
    if (isClosed) {
      return <Badge variant="secondary">Closed</Badge>;
    }
    return (
      <Badge variant="outline" className="border-blue-500 text-blue-600">
        Open
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  const getMajorLabel = () => {
    if (details?.is_all_majors) return "All Majors";
    if (details?.major_name) return details.major_name;
    return "All Majors";
  };

  const content = (
    <div className="space-y-4">
      {/* Status Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Status</CardTitle>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {isFulfilled && details?.fulfilled_event ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This request has been fulfilled by a club event.
              </p>
              <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-3">
                  <h4 className="font-semibold text-base">
                    {details.fulfilled_event.title}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(
                          new Date(details.fulfilled_event.starts_at),
                          "EEEE, MMMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>
                    {details.fulfilled_event.location_name && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{details.fulfilled_event.location_name}</span>
                      </div>
                    )}
                    <div className="text-muted-foreground text-xs">
                      Hosted by {details.fulfilled_event.club_name}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      window.location.href = `/events`;
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : isOpen ? (
            <p className="text-sm text-muted-foreground">
              Clubs may fulfill this request by publishing an event.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              This request is no longer accepting fulfillments.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Description</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap max-w-none">
            {details?.description || request.description}
          </p>
        </CardContent>
      </Card>

      {/* Tags Card */}
      {details?.tags && details.tags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Tags</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {details.tags.slice(0, 4).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {details.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{details.tags.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Votes Section */}
      {!isFulfilled && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-10 w-10 p-0 rounded-md transition-all",
                        "hover:bg-orange-100 hover:text-orange-600",
                        "active:scale-95",
                        details?.user_has_voted &&
                          "bg-orange-100 text-orange-600"
                      )}
                      onClick={handleVote}
                      disabled={voting}
                      aria-label={
                        details?.user_has_voted
                          ? "Remove upvote"
                          : "Upvote this request"
                      }
                    >
                      <ArrowBigUp
                        className={cn(
                          "h-5 w-5 transition-transform",
                          details?.user_has_voted && "fill-current",
                          voting && "animate-pulse"
                        )}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Votes help clubs prioritize</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-lg font-semibold",
                    details?.user_has_voted
                      ? "text-orange-600"
                      : "text-foreground"
                  )}
                >
                  {details?.vote_count || 0}
                </span>
                <span className="text-xs text-muted-foreground">
                  vote{(details?.vote_count || 0) !== 1 ? "s" : ""}
                </span>
              </div>
              {details?.user_has_voted && (
                <span className="text-xs text-muted-foreground ml-auto">
                  You upvoted
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Danger Zone (Creator only) */}
      {isCreator && !isFulfilled && (
        <>
          <Separator />
          <Card className="border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-destructive">
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground mb-3">
                Once deleted, this request cannot be recovered. You can always
                create a new request.
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
                className="w-full sm:w-auto"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Request
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  const header = (
    <div className="space-y-3">
      {/* Top Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Pin className="h-5 w-5 text-muted-foreground shrink-0" />
          <h2 className="text-lg font-semibold truncate">Event Request</h2>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {/* More Actions Menu */}
          {isCreator && (
            <div className="relative" ref={moreActionsRef}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowMoreActions(!showMoreActions)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              {showMoreActions && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border rounded-md shadow-lg z-50">
                  <div className="p-1">
                    <button
                      className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent flex items-center gap-2"
                      onClick={copyLink}
                    >
                      <LinkIcon className="h-4 w-4" />
                      Copy Link
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent text-destructive flex items-center gap-2"
                      onClick={() => {
                        setShowMoreActions(false);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Subrow */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>
          {isCreator ? "Requested by you" : "Requested by a user"}
        </span>
        <span>•</span>
        <span>Posted {formatDate(request.created_at)}</span>
        <span>•</span>
        <span>Major: {getMajorLabel()}</span>
      </div>
    </div>
  );

  if (loading) {
    const loadingContent = (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );

    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
            <DialogHeader>
              <DialogTitle className="sr-only">Event Request</DialogTitle>
              {header}
            </DialogHeader>
            {loadingContent}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto [&>button]:hidden">
          <SheetHeader className="text-left">{header}</SheetHeader>
          {loadingContent}
        </SheetContent>
      </Sheet>
    );
  }

  if (!details) {
    return null;
  }

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
            <DialogHeader className="space-y-0 pb-4">
              <DialogTitle className="sr-only">Event Request</DialogTitle>
              {header}
            </DialogHeader>
            {content}
          </DialogContent>
        </Dialog>

        <SignInDialog
          open={signInDialogOpen}
          onOpenChange={setSignInDialogOpen}
          action="upvote"
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this request?</AlertDialogTitle>
              <AlertDialogDescription>
                This can't be undone. You can repost a new request anytime.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? "Deleting..." : "Delete Request"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto [&>button]:hidden">
          <SheetHeader className="text-left space-y-0 pb-4">{header}</SheetHeader>
          {content}
        </SheetContent>
      </Sheet>

      <SignInDialog
        open={signInDialogOpen}
        onOpenChange={setSignInDialogOpen}
        action="upvote"
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this request?</AlertDialogTitle>
            <AlertDialogDescription>
              This can't be undone. You can repost a new request anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete Request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  Calendar,
  CalendarClock,
  MapPin,
  Link as LinkIcon,
  ExternalLink,
  X,
  ArrowBigUp,
  MoreHorizontal,
  Trash2,
  CircleDot,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import type { EventRequestType, EventRequestStatus } from "@/types/event-request";
import { cn } from "@/lib/utils";
import {
  fetchEventRequestDetails,
  deleteEventRequest,
} from "@/lib/event-requests";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInDialog } from "./SignInDialog";
import { StatusBadge } from "./StatusBadge";
import { VoteButton } from "./VoteButton";
import { CommentThread } from "./CommentThread";

const REQUEST_TYPE_LABELS: Record<EventRequestType, string> = {
  workshop: "Workshop",
  speaker: "Speaker",
  social: "Social",
  study: "Study",
  career: "Career",
  other: "Other",
};

const STATUS_ORDER: EventRequestStatus[] = [
  "open",
  "planned",
  "scheduled",
  "fulfilled",
];
const STATUS_STEP: Record<
  EventRequestStatus,
  { label: string; icon: React.ReactNode; colorClass: string }
> = {
  open: {
    label: "Open",
    icon: <CircleDot className="h-4 w-4" />,
    colorClass: "text-status-open",
  },
  planned: {
    label: "Planned",
    icon: <CalendarClock className="h-4 w-4" />,
    colorClass: "text-status-planned",
  },
  scheduled: {
    label: "Scheduled",
    icon: <Calendar className="h-4 w-4" />,
    colorClass: "text-status-scheduled",
  },
  fulfilled: {
    label: "Fulfilled",
    icon: <CheckCircle2 className="h-4 w-4" />,
    colorClass: "text-status-fulfilled",
  },
  not_planned: {
    label: "Not planned",
    icon: <CircleDot className="h-4 w-4" />,
    colorClass: "text-status-neutral",
  },
  closed: {
    label: "Closed",
    icon: <CircleDot className="h-4 w-4" />,
    colorClass: "text-status-neutral",
  },
};

function StatusTimeline({
  status,
  eventLink,
}: {
  status: EventRequestStatus;
  eventLink?: { title: string; url: string };
}) {
  const effectiveIndex =
    status === "fulfilled"
      ? 3
      : status === "scheduled"
      ? 2
      : status === "planned"
      ? 1
      : 0;

  return (
    <div className="rounded-lg border border-border bg-muted/20 px-3 py-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        Status
      </p>
      <div className="flex items-center gap-0">
        {STATUS_ORDER.map((s, i) => {
          const step = STATUS_STEP[s];
          const isDone = i < effectiveIndex;
          const isCurrent = i === effectiveIndex;
          return (
            <div key={s} className="flex flex-1 items-center min-w-0">
              <div
                className={cn(
                  "flex items-center gap-1.5 shrink-0",
                  isDone && step.colorClass,
                  isCurrent && "font-medium " + step.colorClass,
                  !isDone && !isCurrent && "text-muted-foreground opacity-60"
                )}
              >
                {step.icon}
                <span className="text-xs truncate">{step.label}</span>
              </div>
              {i < STATUS_ORDER.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-1 min-w-[8px] shrink-0",
                    i < effectiveIndex ? "bg-status-fulfilled/50" : "bg-border"
                  )}
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>
      {eventLink && (status === "scheduled" || status === "fulfilled") && (
        <a
          href={eventLink.url}
          className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          {eventLink.title}
        </a>
      )}
    </div>
  );
}

interface RequestDetailPanelProps {
  requestId: string | null;
  onClose: () => void;
  onRequestDeleted?: () => void;
  onVoteToggled?: () => void;
  onCreateRequest: () => void;
  onSignInRequired: () => void;
  isAuthenticated: boolean;
}

export function RequestDetailPanel({
  requestId,
  onClose,
  onRequestDeleted,
  onVoteToggled,
  onCreateRequest,
  onSignInRequired,
  isAuthenticated,
}: RequestDetailPanelProps) {
  const { addToast } = useToast();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const moreActionsRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user?.id ?? null);
    };
    check();
  }, [supabase.auth]);

  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event-request-details", requestId],
    queryFn: () => fetchEventRequestDetails(requestId!),
    enabled: !!requestId,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
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

  const isCreator = details && currentUser ? details.created_by === currentUser : false;
  const isFulfilled = details?.status === "fulfilled" || details?.status === "scheduled";

  const handleDelete = async () => {
    if (!requestId) return;
    try {
      setDeleting(true);
      await deleteEventRequest(requestId);
      addToast({ title: "Request deleted", description: "Your request has been removed.", variant: "default" });
      setDeleteDialogOpen(false);
      onClose();
      onRequestDeleted?.();
      queryClient.invalidateQueries({ queryKey: ["event-requests"] });
    } catch (err) {
      addToast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const copyLink = () => {
    if (typeof window !== "undefined" && requestId) {
      const url = `${window.location.origin}/events?view=requests&request=${requestId}`;
      navigator.clipboard.writeText(url);
      addToast({ title: "Link copied", description: "Request link copied to clipboard.", variant: "default" });
      setShowMoreActions(false);
    }
  };

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-muted-foreground">
      <p className="text-sm">Select a request to view details</p>
      <Button variant="outline" size="sm" className="mt-4" onClick={onCreateRequest}>
        New request
      </Button>
    </div>
  );

  const content = details ? (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold leading-tight">{details.title}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <StatusBadge status={details.status} />
            <span className="text-xs text-muted-foreground">
              Posted {format(new Date(details.created_at), "MMM d, yyyy")}
            </span>
            <span className="text-xs text-muted-foreground">
              {isCreator ? "Requested by you" : "Requested by a student"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
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
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border rounded-md shadow-lg z-50 p-1">
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent flex items-center gap-2"
                  onClick={copyLink}
                >
                  <LinkIcon className="h-4 w-4" />
                  Copy link
                </button>
                {isCreator && !isFulfilled && (
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent text-destructive flex items-center gap-2"
                    onClick={() => {
                      setShowMoreActions(false);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete request
                  </button>
                )}
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!isFulfilled && (
          <VoteButton
            requestId={details.id}
            voteCount={details.vote_count ?? 0}
            userHasVoted={details.user_has_voted ?? false}
            onVoteToggled={onVoteToggled}
            disabled={!isAuthenticated}
            onSignInRequired={onSignInRequired}
            size="default"
          />
        )}
      </div>

      <StatusTimeline
        status={details.status}
        eventLink={
          details.fulfilled_event
            ? { title: details.fulfilled_event.title, url: "/events" }
            : undefined
        }
      />

      {details.subtitle && (
        <Card className="bg-muted/50">
          <CardContent className="py-3 text-sm">{details.subtitle}</CardContent>
        </Card>
      )}

      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          Description
        </h3>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {details.description || "No description."}
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Type:</span>{" "}
            {REQUEST_TYPE_LABELS[details.request_type ?? "other"]}
          </div>
          {details.tags && details.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-muted-foreground">Tags:</span>
              {details.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div>
            <span className="text-muted-foreground">Major:</span>{" "}
            {details.is_all_majors ? "All Majors" : details.major_name ?? "—"}
          </div>
          {details.time_pref_days?.length || details.time_pref_windows?.length ? (
            <div>
              <span className="text-muted-foreground">Time preference:</span>{" "}
              {[details.time_pref_days?.join(", "), details.time_pref_windows?.join(", ")]
                .filter(Boolean)
                .join(" · ")}
            </div>
          ) : null}
          <div>
            <span className="text-muted-foreground">Location:</span>{" "}
            {details.location_pref === "in_person"
              ? "In-person"
              : details.location_pref === "online"
              ? "Online"
              : "Either"}
          </div>
        </CardContent>
      </Card>

      {isFulfilled && details.fulfilled_event && (
        <Card className="bg-status-fulfilled-muted border-status-fulfilled/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              This request became an event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{details.fulfilled_event.title}</p>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Calendar className="h-3.5 w-3.5" />
              {format(
                new Date(details.fulfilled_event.starts_at),
                "EEEE, MMM d 'at' h:mm a"
              )}
            </div>
            {details.fulfilled_event.location_name && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <MapPin className="h-3.5 w-3.5" />
                {details.fulfilled_event.location_name}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={`/events`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View event
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      <Separator />

      <CommentThread
        requestId={details.id}
        isAuthenticated={isAuthenticated}
        onSignInRequired={onSignInRequired}
      />
    </div>
  ) : null;

  const loadingState = (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );

  const panelBody = !requestId
    ? emptyState
    : isLoading
    ? loadingState
    : content;

  if (isDesktop) {
    return (
      <>
        <div className="flex flex-col flex-1 min-h-0 w-full overflow-auto">
          <div className="p-4 flex-1">{panelBody}</div>
        </div>
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
                This can&apos;t be undone. You can repost a new request anytime.
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

  return (
    <>
      <Sheet open={!!requestId} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="bottom" className="h-[90vh] overflow-hidden flex flex-col">
          <SheetHeader className="sr-only">
            <SheetTitle>Request details</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-auto p-4">{panelBody}</div>
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
              This can&apos;t be undone. You can repost a new request anytime.
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

"use client";

import { Badge } from "@/components/ui/badge";
import { MessageCircle, MapPin, Video } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { EventRequest, EventRequestType } from "@/types/event-request";
import { cn } from "@/lib/utils";
import { VoteButton } from "./VoteButton";
import { StatusBadge } from "./StatusBadge";

const REQUEST_TYPE_LABELS: Record<EventRequestType, string> = {
  workshop: "Workshop",
  speaker: "Speaker",
  social: "Social",
  study: "Study",
  career: "Career",
  other: "Other",
};

function formatTimePrefSummary(
  days?: string[] | null,
  windows?: ("morning" | "afternoon" | "evening")[] | null
): string {
  if (!days?.length && !windows?.length) return "";
  const d = days?.length ? days.map((x) => x.slice(0, 2)).join(", ") : "";
  const w = windows?.length ? windows.join(", ") : "";
  if (d && w) return `${d} ${w}`;
  return d || w;
}

interface RequestRowProps {
  request: EventRequest;
  isSelected?: boolean;
  userHasVoted?: boolean;
  onSelect: () => void;
  onVoteToggled?: () => void;
  onSignInRequired?: () => void;
  isAuthenticated?: boolean;
}

export function RequestRow({
  request,
  isSelected,
  userHasVoted = false,
  onSelect,
  onVoteToggled,
  onSignInRequired,
  isAuthenticated = false,
}: RequestRowProps) {
  const timePrefSummary = formatTimePrefSummary(
    request.time_pref_days,
    request.time_pref_windows
  );
  const lastActivity = request.last_activity_at || request.created_at;
  const typeLabel = REQUEST_TYPE_LABELS[request.request_type ?? "other"];

  const preview =
    request.subtitle ||
    (request.description ? request.description.slice(0, 80).replace(/\n/g, " ") : "");

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "flex items-start gap-3 w-full px-4 py-3 border-b border-border text-left",
        "hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        isSelected && "bg-primary/5 border-l-2 border-l-primary"
      )}
      aria-label={`Request: ${request.title}`}
    >
      {/* Left: upvote + count */}
      <div className="flex shrink-0 pt-0.5">
        <VoteButton
          requestId={request.id}
          voteCount={request.vote_count ?? 0}
          userHasVoted={userHasVoted}
          onVoteToggled={onVoteToggled}
          disabled={!isAuthenticated}
          onSignInRequired={onSignInRequired}
          size="sm"
        />
      </div>

      {/* Middle: title + 1-line preview + tags */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-sm font-semibold leading-tight truncate">
          {request.title || request.description?.slice(0, 80)}
        </p>
        {preview && (
          <p className="text-xs text-muted-foreground truncate">
            {preview}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <Badge variant="outline" className="font-normal text-[11px] px-1.5 py-0 h-4">
            {typeLabel}
          </Badge>
          {request.tags?.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-normal text-[11px] px-1.5 py-0 h-4"
            >
              {tag}
            </Badge>
          ))}
          {request.tags && request.tags.length > 2 && (
            <span className="text-muted-foreground">+{request.tags.length - 2}</span>
          )}
          {timePrefSummary && (
            <span className="text-muted-foreground">{timePrefSummary}</span>
          )}
          {request.location_pref && request.location_pref !== "either" && (
            <span className="text-muted-foreground flex items-center gap-0.5">
              {request.location_pref === "online" ? (
                <Video className="h-3 w-3" />
              ) : (
                <MapPin className="h-3 w-3" />
              )}
              {request.location_pref === "online" ? "Online" : "In-person"}
            </span>
          )}
        </div>
      </div>

      {/* Right: status chip + last activity */}
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <div className="flex items-center gap-1.5">
          <StatusBadge status={request.status} size="sm" />
          {(request.comment_count ?? 0) > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" />
              {request.comment_count}
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground">
          {formatDistanceToNow(new Date(lastActivity), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

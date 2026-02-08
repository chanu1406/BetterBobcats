"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleEventRequestVote } from "@/lib/event-requests";
import { useQueryClient } from "@tanstack/react-query";

interface VoteButtonProps {
  requestId: string;
  voteCount: number;
  userHasVoted: boolean;
  onVoteToggled?: () => void;
  disabled?: boolean;
  onSignInRequired?: () => void;
  size?: "sm" | "default";
  className?: string;
}

export function VoteButton({
  requestId,
  voteCount,
  userHasVoted,
  onVoteToggled,
  disabled = false,
  onSignInRequired,
  size = "sm",
  className,
}: VoteButtonProps) {
  const queryClient = useQueryClient();
  const [isVoted, setIsVoted] = useState(userHasVoted);
  const [count, setCount] = useState(voteCount);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) {
      onSignInRequired?.();
      return;
    }
    const nextVoted = !isVoted;
    const nextCount = nextVoted ? count + 1 : count - 1;
    setIsVoted(nextVoted);
    setCount(nextCount);
    setLoading(true);
    try {
      await toggleEventRequestVote(requestId);
      queryClient.invalidateQueries({ queryKey: ["event-requests"] });
      queryClient.invalidateQueries({ queryKey: ["event-request-details", requestId] });
      queryClient.invalidateQueries({ queryKey: ["event-request-my-votes"] });
      onVoteToggled?.();
    } catch (err) {
      setIsVoted(!nextVoted);
      setCount(nextVoted ? count - 1 : count + 1);
      if (
        err instanceof Error &&
        (err.message.includes("Must be authenticated") || err.message.includes("authentication"))
      ) {
        onSignInRequired?.();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "icon" : "default"}
      className={cn(
        "shrink-0 gap-1 h-8 px-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10",
        isVoted && "text-primary bg-primary/10",
        size === "sm" && "h-7 w-8",
        className
      )}
      onClick={handleClick}
      disabled={loading}
      aria-label={isVoted ? "Remove upvote" : "Upvote this request"}
    >
      <ArrowUp
        className={cn("h-4 w-4", size === "sm" && "h-3.5 w-3.5", isVoted && "fill-current")}
      />
      <span className={cn("font-semibold min-w-[1.25rem] text-left", isVoted && "text-primary")}>
        {count}
      </span>
    </Button>
  );
}

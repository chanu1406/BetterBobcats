"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pin, ArrowUp, Plus } from "lucide-react";
import type { EventRequest } from "@/types/event-request";
import { cn } from "@/lib/utils";
import { useState, useMemo, useRef, useEffect } from "react";
import { toggleEventRequestVote } from "@/lib/event-requests";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { SignInDialog } from "./SignInDialog";

interface StickyNoteProps {
  request: EventRequest;
  onClick: () => void;
  isEmptyState?: boolean;
  isCreateNote?: boolean;
  onVoteToggled?: () => void;
}

export function StickyNote({ request, onClick, isEmptyState = false, isCreateNote = false, onVoteToggled }: StickyNoteProps) {
  const { addToast } = useToast();
  const supabase = createClient();
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // Generate consistent rotation based on request ID for stable positioning
  const rotation = useMemo(() => {
    if (isEmptyState) return 0;
    // Use request ID to generate consistent rotation
    const hash = request.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 5) - 2; // -2 to +2 degrees
  }, [request.id, isEmptyState]);

  // Small random offset for natural look
  const offsetX = useMemo(() => {
    if (isEmptyState) return 0;
    const hash = request.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((hash % 7) - 3) * 2; // -6px to +6px
  }, [request.id, isEmptyState]);

  const offsetY = useMemo(() => {
    if (isEmptyState) return 0;
    const hash = (request.id + "y").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((hash % 7) - 3) * 2; // -6px to +6px
  }, [request.id, isEmptyState]);

  const [isHovered, setIsHovered] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [voteCount, setVoteCount] = useState(request.vote_count || 0);
  const noteRef = useRef<HTMLDivElement>(null);

  // Check authentication and vote status on mount
  useEffect(() => {
    const checkAuthAndVoteStatus = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsAuthenticated(!!user);
        
        if (user && !isEmptyState) {
          const { data: voteData } = await supabase
            .from("event_request_votes")
            .select("user_id")
            .eq("request_id", request.id)
            .eq("user_id", user.id)
            .single();
          setIsVoted(!!voteData);
        }
      } catch (err) {
        // User not logged in or no vote - that's fine
        setIsAuthenticated(false);
      }
    };
    if (!isEmptyState) {
      checkAuthAndVoteStatus();
    }
    // Update vote count from request prop
    setVoteCount(request.vote_count || 0);

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session?.user);
      // Re-check vote status if user just signed in
      if (session?.user && !isEmptyState) {
        try {
          const { data: voteData } = await supabase
            .from("event_request_votes")
            .select("user_id")
            .eq("request_id", request.id)
            .eq("user_id", session.user.id)
            .single();
          setIsVoted(!!voteData);
        } catch (err) {
          // No vote - that's fine
          setIsVoted(false);
        }
      } else if (!session) {
        setIsVoted(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [request.id, request.vote_count, isEmptyState, supabase]);

  // Add pin wobble animation styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pinWobble {
        0%, 100% { transform: rotate(-2deg); }
        25% { transform: rotate(2deg); }
        50% { transform: rotate(-1deg); }
        75% { transform: rotate(1deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const isFulfilled = request.status === "fulfilled";
  // 3-line description preview (approximately 150 characters for compact cards)
  const descriptionPreview =
    request.description.length > 150
      ? request.description.substring(0, 150) + "..."
      : request.description;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    // If fulfilled, open the linked event instead of request details
    if (isFulfilled && request.fulfilled_event_id) {
      // Navigate to events page - the drawer will handle showing event details
      onClick();
    } else {
      onClick();
    }
  };

  return (
    <div
      ref={noteRef}
      className="relative cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`Event request: ${descriptionPreview}`}
      style={{
        transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
        transition: "transform 0.2s ease-out",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Sticky Note Paper */}
      <div
        className={cn(
          "relative p-4 rounded-md transition-all duration-200 w-full",
          "hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
          isFulfilled && "opacity-80",
          (isEmptyState || isCreateNote) && "border-2 border-dashed border-yellow-600/40"
        )}
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 249, 196, 0.98) 0%, 
              rgba(255, 245, 157, 0.98) 100%
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0,0,0,0.015) 1px,
              rgba(0,0,0,0.015) 2px
            )
          `,
          transform: isHovered && !isPressed
            ? `translateY(-2px) scale(1.02)`
            : isPressed
            ? `translateY(0px) scale(0.98)`
            : `translateY(0px) scale(1)`,
          boxShadow: isHovered && !isPressed
            ? `
              0 8px 16px rgba(0,0,0,0.15),
              0 2px 4px rgba(0,0,0,0.1),
              inset 0 1px 0 rgba(255,255,255,0.4)
            `
            : `
              0 4px 8px rgba(0,0,0,0.1),
              0 1px 2px rgba(0,0,0,0.08),
              inset 0 1px 0 rgba(255,255,255,0.4)
            `,
          backgroundSize: "100% 100%, 2px 2px",
          transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        }}
      >
        {/* Subtle paper highlight */}
        <div
          className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.6) 0%, transparent 60%)",
          }}
        />

        {/* Pin icon at top-right - smaller and subtle */}
        {!(isEmptyState || isCreateNote) ? (
          <div
            className="absolute -top-0.5 -right-0.5 z-20"
            style={{
              transform: `rotate(${isHovered ? "-2deg" : "8deg"})`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <div className="relative">
              {/* Pin shadow */}
              <div
                className="absolute inset-0 translate-x-0.5 translate-y-0.5"
                style={{
                  filter: "blur(2px)",
                  opacity: 0.3,
                }}
              >
                <Pin className="h-4 w-4 text-gray-900" fill="currentColor" />
              </div>
              {/* Pin */}
              <Pin className="h-4 w-4 text-amber-700 relative" fill="currentColor" strokeWidth={1.5} />
            </div>
          </div>
        ) : null}

        {/* Fulfilled stamp overlay */}
        {isFulfilled && (
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-md overflow-hidden"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  transparent 30%,
                  rgba(34, 197, 94, 0.15) 40%,
                  rgba(34, 197, 94, 0.15) 60%,
                  transparent 70%
                )
              `,
            }}
          >
            {/* FULFILLED stamp text */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                transform: "translate(-50%, -50%) rotate(-5deg)",
                fontFamily: "system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: "bold",
                color: "rgba(34, 197, 94, 0.7)",
                textShadow: "0 1px 2px rgba(255,255,255,0.8), 0 0 4px rgba(34, 197, 94, 0.3)",
                letterSpacing: "0.1em",
              }}
            >
              FULFILLED
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-2.5 pr-6 relative z-0 flex flex-col">
          {/* Top row: Major chip */}
          <div className="flex items-center gap-1.5 min-h-[18px]">
            {request.is_all_majors ? (
              <Badge variant="secondary" className="text-[9px] font-medium px-1.5 py-0 h-4">
                All Majors
              </Badge>
            ) : request.major_id ? (
              <Badge variant="secondary" className="text-[9px] font-medium px-1.5 py-0 h-4">
                Major
              </Badge>
            ) : null}
          </div>

          {/* Middle: Title/Description */}
          <div className="flex-1 space-y-1">
            <p
              className={cn(
                "text-gray-900 leading-tight font-semibold",
                isEmptyState || isCreateNote ? "text-base" : "text-sm"
              )}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                display: "-webkit-box",
                WebkitLineClamp: isEmptyState || isCreateNote ? 2 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: "1.35",
              }}
            >
              {isEmptyState || isCreateNote ? request.description : descriptionPreview}
            </p>
          </div>

          {/* Tags row: show up to 2 tags + "+N" */}
          {request.tags && request.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {request.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[9px] font-normal px-1.5 py-0 h-4"
                >
                  {tag}
                </Badge>
              ))}
              {request.tags.length > 2 && (
                <Badge
                  variant="secondary"
                  className="text-[9px] font-normal px-1.5 py-0 h-4"
                >
                  +{request.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Bottom row: Upvote button */}
          {!isEmptyState && !isCreateNote && (
            <div className="flex items-center gap-1 pt-1.5 border-t border-yellow-300/20">
              <button
                className={cn(
                  "flex items-center gap-1 px-1.5 py-0.5 rounded transition-all duration-150",
                  "hover:bg-orange-50 hover:text-orange-600",
                  "active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500",
                  isVoted && "bg-orange-100 text-orange-600"
                )}
                onClick={async (e) => {
                  e.stopPropagation();

                  if (isAuthenticated === false) {
                    setSignInDialogOpen(true);
                    return;
                  }

                  if (isAuthenticated === null) {
                    return;
                  }

                  const newVotedState = !isVoted;
                  const previousVotedState = isVoted;
                  const previousVoteCount = voteCount;
                  
                  setIsVoted(newVotedState);
                  setVoteCount((prev) => newVotedState ? prev + 1 : prev - 1);

                  try {
                    await toggleEventRequestVote(request.id);
                    
                    if (onVoteToggled) {
                      onVoteToggled();
                    }
                  } catch (err) {
                    console.error("Error toggling vote:", err);
                    
                    setIsVoted(previousVotedState);
                    setVoteCount(previousVoteCount);
                    
                    if (err instanceof Error && (err.message.includes("Must be authenticated") || err.message.includes("authentication"))) {
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
                  }
                }}
                disabled={isAuthenticated === null}
                aria-label={isVoted ? "Remove upvote" : "Upvote this request"}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <ArrowUp
                  className={cn(
                    "h-3.5 w-3.5 transition-all duration-150",
                    isVoted && "fill-current"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-semibold min-w-[1.25rem] text-left transition-colors",
                    isVoted ? "text-orange-600" : "text-gray-700"
                  )}
                >
                  {voteCount}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sign In Dialog for Upvotes */}
      <SignInDialog
        open={signInDialogOpen}
        onOpenChange={setSignInDialogOpen}
        action="upvote"
      />
    </div>
  );
}

"use client";

import { formatDistanceToNow } from "date-fns";
import type { EventRequestComment } from "@/types/event-request";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CommentItemProps {
  comment: EventRequestComment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const initial = comment.user_id?.slice(0, 2).toUpperCase() ?? "?";
  return (
    <div className="flex gap-3 py-3">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="text-xs">{initial}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>User</span>
          <span>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
        </div>
        <p className="text-sm mt-0.5 whitespace-pre-wrap break-words">{comment.body}</p>
      </div>
    </div>
  );
}

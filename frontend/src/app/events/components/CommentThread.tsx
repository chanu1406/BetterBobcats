"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchEventRequestComments, createEventRequestComment } from "@/lib/event-requests";
import { CommentItem } from "./CommentItem";
import { MessageCircle } from "lucide-react";

type CommentSort = "newest" | "oldest";

interface CommentThreadProps {
  requestId: string;
  isAuthenticated: boolean;
  onSignInRequired: () => void;
}

export function CommentThread({
  requestId,
  isAuthenticated,
  onSignInRequired,
}: CommentThreadProps) {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<CommentSort>("newest");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["event-request-comments", requestId],
    queryFn: () => fetchEventRequestComments(requestId),
    enabled: !!requestId,
    staleTime: 30 * 1000,
  });

  const sortedComments = [...comments].sort((a, b) => {
    const ta = new Date(a.created_at).getTime();
    const tb = new Date(b.created_at).getTime();
    return sort === "newest" ? tb - ta : ta - tb;
  });

  const handleSubmit = async () => {
    const trimmed = body.trim();
    if (!trimmed || !isAuthenticated) {
      if (!isAuthenticated) onSignInRequired();
      return;
    }
    setSubmitting(true);
    try {
      await createEventRequestComment(requestId, trimmed);
      setBody("");
      queryClient.invalidateQueries({ queryKey: ["event-request-comments", requestId] });
      queryClient.invalidateQueries({ queryKey: ["event-request-details", requestId] });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Comments
          {comments.length > 0 && (
            <span className="text-muted-foreground font-normal">({comments.length})</span>
          )}
        </h3>
        <Select value={sort} onValueChange={(v) => setSort(v as CommentSort)}>
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isAuthenticated ? (
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={2}
            className="min-h-[60px] resize-none"
          />
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!body.trim() || submitting}
            className="shrink-0 self-end"
          >
            {submitting ? "Posting..." : "Post"}
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Sign in to comment.
        </p>
      )}

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading comments...</div>
      ) : sortedComments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      ) : (
        <div className="divide-y border-t pt-2">
          {sortedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

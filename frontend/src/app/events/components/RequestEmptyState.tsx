"use client";

import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Inbox } from "lucide-react";

interface RequestEmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onCreateRequest: () => void;
}

export function RequestEmptyState({
  hasFilters,
  onClearFilters,
  onCreateRequest,
}: RequestEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {hasFilters ? (
        <>
          <Inbox className="h-12 w-12 text-muted-foreground/70 mb-4" aria-hidden />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            No matching requests
          </h3>
          <p className="text-muted-foreground text-sm mb-4 max-w-sm">
            Try clearing filters or suggest a new event.
          </p>
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        </>
      ) : (
        <>
          <MessageSquarePlus
            className="h-14 w-14 text-muted-foreground/70 mb-4"
            aria-hidden
          />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            No requests yet
          </h3>
          <p className="text-muted-foreground text-sm mb-4 max-w-sm">
            Be the first to suggest an event. Your idea could become the next campus workshop or meetup.
          </p>
          <Button onClick={onCreateRequest}>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            New request
          </Button>
        </>
      )}
    </div>
  );
}

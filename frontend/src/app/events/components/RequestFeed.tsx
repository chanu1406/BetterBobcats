"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEventRequests, fetchMyVoteRequestIds } from "@/lib/event-requests";
import type { EventRequest } from "@/types/event-request";
import type { RequestSort } from "../hooks/useRequestsUrlState";
import type { RequestFiltersState } from "../hooks/useRequestsUrlState";
import { RequestRow } from "./RequestRow";
import { RequestFilters } from "./RequestFilters";
import { RequestEmptyState } from "./RequestEmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

const GRAVITY = 1.5;
const TIME_BASE_HOURS = 2;
const STALE_DAYS = 90;

function computeTrendingScore(request: EventRequest): number {
  const votes = Math.max(0, (request.vote_count ?? 0) - 1);
  const ageHours =
    (Date.now() - new Date(request.created_at).getTime()) / (1000 * 60 * 60);
  const denominator = Math.pow(ageHours + TIME_BASE_HOURS, GRAVITY);
  let score = denominator <= 0 ? 0 : Math.pow(votes, 0.8) / denominator;
  if (request.status === "open" && ageHours > STALE_DAYS * 24) {
    score *= 0.5;
  }
  return score;
}

function sortRequests(requests: EventRequest[], sort: RequestSort): EventRequest[] {
  const sorted = [...requests];
  if (sort === "trending") {
    return sorted.sort((a, b) => {
      const scoreA = computeTrendingScore(a);
      const scoreB = computeTrendingScore(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }
  if (sort === "top") {
    return sorted.sort((a, b) => {
      const va = a.vote_count ?? 0;
      const vb = b.vote_count ?? 0;
      if (vb !== va) return vb - va;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }
  if (sort === "new") {
    return sorted.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
  if (sort === "recently_active") {
    return sorted.sort((a, b) => {
      const ta = a.last_activity_at || a.created_at;
      const tb = b.last_activity_at || b.created_at;
      return new Date(tb).getTime() - new Date(ta).getTime();
    });
  }
  return sorted;
}

interface RequestFeedProps {
  sort: RequestSort;
  filters: RequestFiltersState;
  onSortChange: (sort: RequestSort) => void;
  onFiltersChange: (filters: Partial<RequestFiltersState>) => void;
  onClearFilters: () => void;
  selectedRequestId: string | null;
  onSelectRequest: (id: string | null) => void;
  onCreateRequest: () => void;
  onSignInRequired: () => void;
  isAuthenticated: boolean;
}

export function RequestFeed({
  sort,
  filters,
  onSortChange,
  onFiltersChange,
  onClearFilters,
  selectedRequestId,
  onSelectRequest,
  onCreateRequest,
  onSignInRequired,
  isAuthenticated,
}: RequestFeedProps) {
  const filtersForFetch = useMemo(
    () => ({
      status: filters.status.length ? filters.status : undefined,
      type: filters.type.length ? filters.type : undefined,
      major_ids: filters.major.length ? filters.major : undefined,
      q: filters.q.trim() || undefined,
    }),
    [filters]
  );

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event-requests", filtersForFetch],
    queryFn: () => fetchEventRequests(filtersForFetch),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const requestIds = useMemo(() => requests.map((r) => r.id), [requests]);

  const { data: votedIds = new Set<string>() } = useQuery({
    queryKey: ["event-request-my-votes", requestIds],
    queryFn: () => fetchMyVoteRequestIds(requestIds),
    enabled: isAuthenticated && requestIds.length > 0,
    staleTime: 2 * 60 * 1000,
  });

  const sortedRequests = useMemo(
    () => sortRequests(requests, sort),
    [requests, sort]
  );

  const hasActiveFilters =
    filters.q.trim() !== "" ||
    filters.status.length > 0 ||
    filters.type.length > 0 ||
    filters.major.length > 0;

  if (error) {
    return (
      <div className="p-4 text-destructive text-sm">
        {error instanceof Error ? error.message : "Failed to load requests"}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <RequestFilters
        sort={sort}
        onSortChange={onSortChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onClearFilters={onClearFilters}
        onCreateRequest={onCreateRequest}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="divide-y border-border">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3">
                <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <Skeleton className="h-5 w-14 shrink-0" />
              </div>
            ))}
          </div>
        ) : sortedRequests.length === 0 ? (
          <RequestEmptyState
            hasFilters={hasActiveFilters}
            onClearFilters={onClearFilters}
            onCreateRequest={onCreateRequest}
          />
        ) : (
          <div className="divide-y-0">
            {sortedRequests.map((request) => (
              <RequestRow
                key={request.id}
                request={request}
                isSelected={selectedRequestId === request.id}
                userHasVoted={votedIds.has(request.id)}
                onSelect={() => onSelectRequest(request.id)}
                onVoteToggled={() => {}}
                onSignInRequired={onSignInRequired}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

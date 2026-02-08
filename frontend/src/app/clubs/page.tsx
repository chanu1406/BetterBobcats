"use client";

import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClubsHeader } from "./components/ClubsHeader";
import { ClubsControls } from "./components/ClubsControls";
import { ClubsGrid } from "./components/ClubsGrid";
import { ClubsSkeleton } from "./components/ClubsSkeleton";
import { ClubsEmptyState } from "./components/ClubsEmptyState";
import { ClubsErrorState } from "./components/ClubsErrorState";
import { ClubsFiltersSheet } from "./components/ClubsFiltersSheet";
import { useClubFilters } from "./hooks/useClubFilters";
import { useClubsQuery, usePrefetchClub } from "./hooks/useClubsQuery";
import { fetchMajorsList } from "@/lib/clubs";
import type { ClubsBrowseFilters } from "@/lib/clubs";

const SORT_LABELS: Record<NonNullable<ClubsBrowseFilters["sortBy"]>, string> = {
  relevant: "Most relevant",
  updated: "Recently updated",
  alphabetical: "Alphabetical",
  recruiting: "Recruiting first",
};

const RECRUITING_LABELS: Record<string, string> = {
  open: "Recruiting",
  closed: "Closed",
  by_invite: "Invite only",
};

const COMMITMENT_LABELS: Record<string, string> = {
  casual: "Casual",
  moderate: "Moderate",
  high: "High",
};

const OPEN_TO_LABELS: Record<string, string> = {
  undergrad: "UG",
  grad: "Grad",
  both: "Both",
};

function ActiveFilterChips({
  filters,
  setFilter,
  clearFilters,
  majors,
}: {
  filters: ClubsBrowseFilters;
  setFilter: (key: keyof ClubsBrowseFilters, value: string | boolean | null | undefined) => void;
  clearFilters: () => void;
  majors: { id: string; name: string }[];
}) {
  const chips: { key: keyof ClubsBrowseFilters; label: string }[] = [];

  if (filters.majorId) {
    const major = majors.find((m) => m.id === filters.majorId);
    chips.push({ key: "majorId", label: major?.name ?? "Major" });
  }
  if (filters.recruitingStatus) {
    chips.push({
      key: "recruitingStatus",
      label: RECRUITING_LABELS[filters.recruitingStatus] ?? filters.recruitingStatus,
    });
  }
  if (filters.commitmentLevel) {
    chips.push({
      key: "commitmentLevel",
      label: COMMITMENT_LABELS[filters.commitmentLevel] ?? filters.commitmentLevel,
    });
  }
  if (filters.openTo) {
    chips.push({
      key: "openTo",
      label: OPEN_TO_LABELS[filters.openTo] ?? filters.openTo,
    });
  }
  if (filters.openToAllMajors === true) {
    chips.push({ key: "openToAllMajors", label: "Open to all majors" });
  }
  if (filters.noDues === true) {
    chips.push({ key: "noDues", label: "No dues" });
  }
  if (filters.sortBy && filters.sortBy !== "relevant") {
    chips.push({ key: "sortBy", label: SORT_LABELS[filters.sortBy] ?? filters.sortBy });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map(({ key, label }) => (
        <Badge
          key={String(key)}
          variant="secondary"
          className="pl-2 pr-1 py-1 gap-1 font-normal"
        >
          {label}
          <button
            type="button"
            onClick={() => setFilter(key, null)}
            className="rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={`Remove ${label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2 text-muted-foreground">
        Clear all
      </Button>
    </div>
  );
}

function ClubsPageContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersSheetOpen, setFiltersSheetOpen] = useState(false);

  const { filters, setFilter, clearFilters, activeFilterCount } = useClubFilters();
  const { data: clubs, isLoading, error, refetch } = useClubsQuery(filters);
  const prefetchClub = usePrefetchClub();

  const { data: majors = [] } = useQuery({
    queryKey: ["majors-list"],
    queryFn: fetchMajorsList,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const errorMessage =
    error instanceof Error ? error.message : error ? "Failed to load clubs" : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ClubsHeader />

        <ClubsControls
          filters={filters}
          setFilter={setFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenFilters={() => setFiltersSheetOpen(true)}
          majors={majors}
          majorsLoading={false}
        />

        {activeFilterCount > 0 && (
          <ActiveFilterChips
            filters={filters}
            setFilter={setFilter}
            clearFilters={clearFilters}
            majors={majors}
          />
        )}

        {isLoading ? (
          <ClubsSkeleton />
        ) : errorMessage ? (
          <ClubsErrorState message={errorMessage} onRetry={() => refetch()} />
        ) : clubs.length === 0 ? (
          <ClubsEmptyState
            onClearFilters={clearFilters}
            hasActiveFilters={activeFilterCount > 0}
          />
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {clubs.length} {clubs.length === 1 ? "club" : "clubs"}
            </p>
            <ClubsGrid
              clubs={clubs}
              viewMode={viewMode}
              onCardHover={(slug) => slug && prefetchClub(slug)}
            />
          </>
        )}
      </div>

      <ClubsFiltersSheet
        open={filtersSheetOpen}
        onOpenChange={setFiltersSheetOpen}
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
      />
    </div>
  );
}

export default function ClubsPage() {
  return (
    <Suspense fallback={<ClubsSkeleton />}>
      <ClubsPageContent />
    </Suspense>
  );
}

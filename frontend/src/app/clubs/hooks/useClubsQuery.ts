"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  fetchClubsForBrowse,
  fetchClubWithProfile,
  type ClubsBrowseFilters,
} from "@/lib/clubs";

const QUERY_KEY = "clubs-browse";
const STALE_TIME = 5 * 60 * 1000;
const GC_TIME = 10 * 60 * 1000;

export function useClubsQuery(filters: ClubsBrowseFilters) {
  const queryKey = useMemo(
    () => [
      QUERY_KEY,
      filters.majorId ?? "",
      filters.search ?? "",
      filters.recruitingStatus ?? "",
      filters.commitmentLevel ?? "",
      filters.openTo ?? "",
      filters.openToAllMajors ?? "",
      filters.noDues ?? "",
      filters.sortBy ?? "relevant",
    ],
    [
      filters.majorId,
      filters.search,
      filters.recruitingStatus,
      filters.commitmentLevel,
      filters.openTo,
      filters.openToAllMajors,
      filters.noDues,
      filters.sortBy,
    ]
  );

  const query = useQuery({
    queryKey,
    queryFn: () => fetchClubsForBrowse(filters, 100, 0),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    queryKey,
  };
}

export function usePrefetchClub() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    if (!slug) return;
    queryClient.prefetchQuery({
      queryKey: ["club", slug],
      queryFn: () => fetchClubWithProfile(slug),
      staleTime: STALE_TIME,
    });
  };
}

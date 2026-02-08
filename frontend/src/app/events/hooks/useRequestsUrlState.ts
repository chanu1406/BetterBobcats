"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export type EventsView = "calendar" | "requests";

export type RequestSort = "trending" | "top" | "new" | "recently_active";

export interface RequestFiltersState {
  status: string[];
  type: string[];
  major: string[];
  q: string;
}

const DEFAULT_SORT: RequestSort = "trending";
const DEFAULT_FILTERS: RequestFiltersState = {
  status: [],
  type: [],
  major: [],
  q: "",
};

function getSearchParams(searchParams: ReturnType<typeof useSearchParams>) {
  const view = (searchParams.get("view") ?? "requests") as EventsView;
  const request = searchParams.get("request");
  const sort = (searchParams.get("sort") ?? DEFAULT_SORT) as RequestSort;
  const status = searchParams.getAll("status");
  const type = searchParams.getAll("type");
  const major = searchParams.getAll("major");
  const q = searchParams.get("q") ?? "";
  return {
    view,
    selectedRequestId: request,
    sort,
    filters: {
      status,
      type,
      major,
      q,
    },
  };
}

function buildRequestSearchParams(updates: {
  view?: EventsView;
  request?: string | null;
  sort?: RequestSort;
  filters?: Partial<RequestFiltersState>;
}): URLSearchParams {
  const current = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const next = new URLSearchParams(current);

  if (updates.view !== undefined) {
    if (updates.view === "requests") {
      next.delete("view");
      // leave request/sort/filters as-is when switching to requests
    } else {
      next.set("view", "calendar");
      next.delete("request");
      next.delete("sort");
      next.delete("q");
      next.delete("status");
      next.delete("type");
      next.delete("major");
    }
  }

  if (updates.request !== undefined) {
    if (updates.request) {
      next.set("request", updates.request);
    } else {
      next.delete("request");
    }
  }

  if (updates.sort !== undefined) {
    if (updates.sort === DEFAULT_SORT) {
      next.delete("sort");
    } else {
      next.set("sort", updates.sort);
    }
  }

  if (updates.filters !== undefined) {
    const f = updates.filters;
    if (f.status !== undefined) {
      next.delete("status");
      f.status.forEach((s) => next.append("status", s));
    }
    if (f.type !== undefined) {
      next.delete("type");
      f.type.forEach((t) => next.append("type", t));
    }
    if (f.major !== undefined) {
      next.delete("major");
      f.major.forEach((m) => next.append("major", m));
    }
    if (f.q !== undefined) {
      if (f.q) next.set("q", f.q);
      else next.delete("q");
    }
  }

  return next;
}

/**
 * Hook to read and write events page URL state (view, selected request, sort, filters).
 * - Use setView to switch Calendar / Requests (replace so filters don't pollute history).
 * - Use setSelectedRequestId with push so back/forward works for request selection.
 * - Use setSort / setFilters with replace so filter changes don't create history entries.
 */
export function useRequestsUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo(
    () => getSearchParams(searchParams),
    [searchParams]
  );

  const setView = useCallback(
    (view: EventsView) => {
      const next = buildRequestSearchParams({
        view,
        request: null,
        sort: view === "requests" ? state.sort : undefined,
        filters: view === "requests" ? state.filters : undefined,
      });
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, state.sort, state.filters]
  );

  const setSelectedRequestId = useCallback(
    (requestId: string | null) => {
      const next = buildRequestSearchParams({
        view: "requests",
        request: requestId,
        sort: state.sort,
        filters: state.filters,
      });
      if (requestId) {
        router.push(`${pathname}?${next.toString()}`, { scroll: false });
      } else {
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      }
    },
    [pathname, router, state.sort, state.filters]
  );

  const setSort = useCallback(
    (sort: RequestSort) => {
      const next = buildRequestSearchParams({
        view: "requests",
        request: state.selectedRequestId,
        sort,
        filters: state.filters,
      });
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, state.selectedRequestId, state.filters]
  );

  const setFilters = useCallback(
    (filters: Partial<RequestFiltersState>) => {
      const next = buildRequestSearchParams({
        view: "requests",
        request: state.selectedRequestId,
        sort: state.sort,
        filters: { ...state.filters, ...filters },
      });
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, state.selectedRequestId, state.sort, state.filters]
  );

  const clearFilters = useCallback(() => {
    const next = buildRequestSearchParams({
      view: "requests",
      request: state.selectedRequestId,
      sort: state.sort,
      filters: DEFAULT_FILTERS,
    });
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [pathname, router, state.selectedRequestId, state.sort]);

  return {
    view: state.view,
    selectedRequestId: state.selectedRequestId,
    sort: state.sort,
    filters: state.filters,
    setView,
    setSelectedRequestId,
    setSort,
    setFilters,
    clearFilters,
  };
}

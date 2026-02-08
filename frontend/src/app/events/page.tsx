"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarHeader } from "./components/CalendarHeader";
import { FilterPanel } from "./components/FilterPanel";
import { MonthGrid } from "./components/MonthGrid";
import { WeekView } from "./components/WeekView";
import { ListView } from "./components/ListView";
import { EventDetailsDrawer } from "./components/EventDetailsDrawer";
import { DayDrawer } from "./components/DayDrawer";
import { EventsViewTabBar } from "./components/EventsViewTabBar";
import { RequestFeed } from "./components/RequestFeed";
import { RequestDetailPanel } from "./components/RequestDetailPanel";
import { RequestComposer } from "./components/RequestComposer";
import { SignInDialog } from "./components/SignInDialog";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  getMonthRange,
  getUniqueTags,
} from "@/lib/events";
import { fetchEventsForRange } from "@/lib/events-calendar";
import type { CalendarEvent, CalendarView, EventFilters } from "@/types/event";
import { addMonths, subMonths } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequestsUrlState } from "./hooks/useRequestsUrlState";
import { createClient } from "@/lib/supabase/browser";

function EventsPage() {
  const queryClient = useQueryClient();
  const urlState = useRequestsUrlState();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<EventFilters>({
    majors: [],
    tags: [],
    clubs: [],
    locationTypes: [],
    timeOfDay: [],
    hideCancelled: false,
  });
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [eventDrawerOpen, setEventDrawerOpen] = useState(false);
  const [dayDrawerOpen, setDayDrawerOpen] = useState(false);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);
  const [createRequestOpen, setCreateRequestOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const dateRange = useMemo(() => {
    if (view === "month") {
      return getMonthRange(currentDate.getFullYear(), currentDate.getMonth());
    } else if (view === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      return { start: weekStart, end: weekEnd };
    } else {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setDate(end.getDate() + 30);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
  }, [currentDate, view]);

  const queryKey = useMemo(
    () => [
      "events-calendar",
      dateRange.start.toISOString(),
      dateRange.end.toISOString(),
      filters.majors.sort().join(","),
      filters.tags.sort().join(","),
      filters.clubs.sort().join(","),
      filters.locationTypes.sort().join(","),
      filters.hideCancelled,
      searchQuery,
    ],
    [dateRange, filters, searchQuery]
  );

  const {
    data: events = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () =>
      fetchEventsForRange(dateRange.start, dateRange.end, {
        ...filters,
        searchQuery,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: urlState.view === "calendar",
  });

  const prefetchAdjacentRange = useCallback(() => {
    if (view === "list") return;
    let prefetchRange: { start: Date; end: Date };
    if (view === "month") {
      const nextMonth = addMonths(currentDate, 1);
      prefetchRange = getMonthRange(nextMonth.getFullYear(), nextMonth.getMonth());
    } else {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      const weekStart = new Date(nextWeek);
      weekStart.setDate(nextWeek.getDate() - nextWeek.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      prefetchRange = { start: weekStart, end: weekEnd };
    }
    queryClient.prefetchQuery({
      queryKey: [
        "events-calendar",
        prefetchRange.start.toISOString(),
        prefetchRange.end.toISOString(),
        filters.majors.sort().join(","),
        filters.tags.sort().join(","),
        filters.clubs.sort().join(","),
        filters.locationTypes.sort().join(","),
        filters.hideCancelled,
        searchQuery,
      ],
      queryFn: () =>
        fetchEventsForRange(prefetchRange.start, prefetchRange.end, {
          ...filters,
          searchQuery,
        }),
      staleTime: 5 * 60 * 1000,
    });
  }, [view, currentDate, filters, searchQuery, queryClient]);

  useEffect(() => {
    prefetchAdjacentRange();
  }, [prefetchAdjacentRange]);

  const availableTags = useMemo(() => getUniqueTags(events), [events]);
  const filteredEvents = useMemo(() => {
    if (!filters.timeOfDay?.length) return events;
    return events.filter((event) => {
      const hour = new Date(event.starts_at).getHours();
      let timeCategory: "morning" | "afternoon" | "evening" | null = null;
      if (hour >= 5 && hour < 12) timeCategory = "morning";
      else if (hour >= 12 && hour < 17) timeCategory = "afternoon";
      else if (hour >= 17 || hour < 5) timeCategory = "evening";
      return timeCategory && filters.timeOfDay!.includes(timeCategory);
    });
  }, [events, filters.timeOfDay]);

  const handlePrevious = () => {
    if (view === "month") setCurrentDate(subMonths(currentDate, 1));
    else if (view === "week") {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() - 7);
      setCurrentDate(d);
    }
  };
  const handleNext = () => {
    if (view === "month") setCurrentDate(addMonths(currentDate, 1));
    else if (view === "week") {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() + 7);
      setCurrentDate(d);
    }
  };
  const handleToday = () => setCurrentDate(new Date());
  const handleEventClick = (e: CalendarEvent) => {
    setSelectedEvent(e);
    setEventDrawerOpen(true);
  };
  const handleDayClick = (date: Date) => {
    setSelectedDay(date);
    setDayDrawerOpen(true);
  };

  if (error && urlState.view === "calendar") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Events</h1>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EventsViewTabBar view={urlState.view} onViewChange={urlState.setView} />

      {urlState.view === "calendar" && (
        <>
          <CalendarHeader
            currentDate={currentDate}
            view={view}
            onViewChange={setView}
            onDateChange={setCurrentDate}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onToday={handleToday}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFiltersOpen={() => setFiltersDrawerOpen(true)}
          />

          <div className="flex-1 flex">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              availableTags={availableTags}
            />
            <Sheet open={filtersDrawerOpen} onOpenChange={setFiltersDrawerOpen}>
              <SheetContent side="left" className="w-80 p-0">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableTags={availableTags}
                  isMobile={true}
                />
              </SheetContent>
            </Sheet>

            <main className="flex-1 overflow-auto p-4 lg:p-6">
              {loading ? (
                <Skeleton className="h-96 w-full" />
              ) : (
                <>
                  {view === "month" && (
                    <MonthGrid
                      currentDate={currentDate}
                      events={filteredEvents}
                      onDayClick={handleDayClick}
                      onEventClick={handleEventClick}
                    />
                  )}
                  {view === "week" && (
                    <WeekView
                      currentDate={currentDate}
                      events={filteredEvents}
                      onDayClick={handleDayClick}
                      onEventClick={handleEventClick}
                    />
                  )}
                  {view === "list" && (
                    <ListView
                      events={filteredEvents}
                      onDayClick={handleDayClick}
                      onEventClick={handleEventClick}
                    />
                  )}
                </>
              )}
            </main>
          </div>

          <EventDetailsDrawer
            event={selectedEvent}
            open={eventDrawerOpen}
            onOpenChange={setEventDrawerOpen}
          />
          <DayDrawer
            date={selectedDay}
            events={filteredEvents}
            open={dayDrawerOpen}
            onOpenChange={setDayDrawerOpen}
            onEventClick={handleEventClick}
          />
        </>
      )}

      {urlState.view === "requests" && (
        <div className="flex-1 flex min-h-0 bg-muted/30 p-4 lg:p-6">
          {/* Mobile: stacked layout */}
          <div className="flex-1 flex min-h-0 flex-col lg:hidden w-full max-w-2xl mx-auto">
            <RequestFeed
              sort={urlState.sort}
              filters={urlState.filters}
              onSortChange={urlState.setSort}
              onFiltersChange={urlState.setFilters}
              onClearFilters={urlState.clearFilters}
              selectedRequestId={urlState.selectedRequestId}
              onSelectRequest={urlState.setSelectedRequestId}
              onCreateRequest={() => {
                if (isAuthenticated === false) setSignInDialogOpen(true);
                else setCreateRequestOpen(true);
              }}
              onSignInRequired={() => setSignInDialogOpen(true)}
              isAuthenticated={isAuthenticated === true}
            />
            <RequestDetailPanel
              requestId={urlState.selectedRequestId}
              onClose={() => urlState.setSelectedRequestId(null)}
              onRequestDeleted={() => queryClient.invalidateQueries({ queryKey: ["event-requests"] })}
              onVoteToggled={() => queryClient.invalidateQueries({ queryKey: ["event-requests"] })}
              onCreateRequest={() => setCreateRequestOpen(true)}
              onSignInRequired={() => setSignInDialogOpen(true)}
              isAuthenticated={isAuthenticated === true}
            />
          </div>
          {/* Desktop: contained shell + resizable split with layered surfaces */}
          <div className="hidden lg:flex flex-1 min-h-0 w-full max-w-7xl mx-auto rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <ResizablePanelGroup
              direction="horizontal"
              className="!flex-1"
            >
              <ResizablePanel
                id="requests-feed"
                defaultSize="35"
                minSize="25"
                maxSize="50"
                className="flex flex-col min-w-0 bg-card"
              >
                <RequestFeed
                  sort={urlState.sort}
                  filters={urlState.filters}
                  onSortChange={urlState.setSort}
                  onFiltersChange={urlState.setFilters}
                  onClearFilters={urlState.clearFilters}
                  selectedRequestId={urlState.selectedRequestId}
                  onSelectRequest={urlState.setSelectedRequestId}
                  onCreateRequest={() => {
                    if (isAuthenticated === false) setSignInDialogOpen(true);
                    else setCreateRequestOpen(true);
                  }}
                  onSignInRequired={() => setSignInDialogOpen(true)}
                  isAuthenticated={isAuthenticated === true}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel
                id="request-detail"
                defaultSize="65"
                minSize="50"
                className="flex flex-col min-w-0 bg-card border-l border-border"
              >
                <RequestDetailPanel
                  requestId={urlState.selectedRequestId}
                  onClose={() => urlState.setSelectedRequestId(null)}
                  onRequestDeleted={() => queryClient.invalidateQueries({ queryKey: ["event-requests"] })}
                  onVoteToggled={() => queryClient.invalidateQueries({ queryKey: ["event-requests"] })}
                  onCreateRequest={() => setCreateRequestOpen(true)}
                  onSignInRequired={() => setSignInDialogOpen(true)}
                  isAuthenticated={isAuthenticated === true}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      )}

      <RequestComposer
        open={createRequestOpen}
        onOpenChange={setCreateRequestOpen}
        onRequestCreated={(id) => {
          if (id) urlState.setSelectedRequestId(id);
        }}
      />
      <SignInDialog
        open={signInDialogOpen}
        onOpenChange={setSignInDialogOpen}
        action="request"
      />
    </div>
  );
}

export default function EventsPageWithSuspense() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <EventsPage />
    </Suspense>
  );
}

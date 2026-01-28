"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarHeader } from "./components/CalendarHeader";
import { FilterPanel } from "./components/FilterPanel";
import { MonthGrid } from "./components/MonthGrid";
import { WeekView } from "./components/WeekView";
import { ListView } from "./components/ListView";
import { EventDetailsDrawer } from "./components/EventDetailsDrawer";
import { DayDrawer } from "./components/DayDrawer";
import { RequestBoard } from "./components/RequestBoard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  getMonthRange,
  getUniqueTags,
} from "@/lib/events";
import { fetchEventsForRange } from "@/lib/events-calendar";
import type { CalendarEvent, CalendarView, EventFilters } from "@/types/event";
import { addMonths, subMonths, startOfMonth } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventsPage() {
  const queryClient = useQueryClient();
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

  // Get date range based on current view
  const dateRange = useMemo(() => {
    if (view === "month") {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      return getMonthRange(year, month);
    } else if (view === "week") {
      // Get week range
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      return { start: weekStart, end: weekEnd };
    } else {
      // List view - fetch next 30 days
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setDate(end.getDate() + 30);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
  }, [currentDate, view]);

  // Create cache key for query
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

  // Fetch events with TanStack Query
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Prefetch adjacent months/weeks
  const prefetchAdjacentRange = useCallback(() => {
    let prefetchRange: { start: Date; end: Date };
    if (view === "month") {
      const nextMonth = addMonths(currentDate, 1);
      prefetchRange = getMonthRange(
        nextMonth.getFullYear(),
        nextMonth.getMonth()
      );
    } else if (view === "week") {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      const weekStart = new Date(nextWeek);
      weekStart.setDate(nextWeek.getDate() - nextWeek.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      prefetchRange = { start: weekStart, end: weekEnd };
    } else {
      return; // No prefetch for list view
    }

    const prefetchKey = [
      "events-calendar",
      prefetchRange.start.toISOString(),
      prefetchRange.end.toISOString(),
      filters.majors.sort().join(","),
      filters.tags.sort().join(","),
      filters.clubs.sort().join(","),
      filters.locationTypes.sort().join(","),
      filters.hideCancelled,
      searchQuery,
    ];

    queryClient.prefetchQuery({
      queryKey: prefetchKey,
      queryFn: () =>
        fetchEventsForRange(prefetchRange.start, prefetchRange.end, {
          ...filters,
          searchQuery,
        }),
      staleTime: 5 * 60 * 1000,
    });
  }, [view, currentDate, filters, searchQuery, queryClient]);

  // Prefetch on mount and when filters change
  useMemo(() => {
    prefetchAdjacentRange();
  }, [prefetchAdjacentRange]);

  // Get available tags from events
  const availableTags = useMemo(() => getUniqueTags(events), [events]);

  // Events are already filtered server-side, just apply timeOfDay filter
  const filteredEvents = useMemo(() => {
    if (!filters.timeOfDay || filters.timeOfDay.length === 0) {
      return events;
    }
    return events.filter((event) => {
      const eventStart = new Date(event.starts_at);
      const hour = eventStart.getHours();
      let timeCategory: "morning" | "afternoon" | "evening" | null = null;

      if (hour >= 5 && hour < 12) {
        timeCategory = "morning";
      } else if (hour >= 12 && hour < 17) {
        timeCategory = "afternoon";
      } else if (hour >= 17 || hour < 5) {
        timeCategory = "evening";
      }

      return timeCategory && filters.timeOfDay.includes(timeCategory);
    });
  }, [events, filters.timeOfDay]);

  const handlePrevious = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEventDrawerOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDay(date);
    setDayDrawerOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Events</h1>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : String(error)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        {/* Desktop Filter Panel */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={availableTags}
        />

        {/* Mobile Filters Drawer */}
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

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-96 w-full" />
            </div>
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

      {/* Event Details Drawer */}
      <EventDetailsDrawer
        event={selectedEvent}
        open={eventDrawerOpen}
        onOpenChange={setEventDrawerOpen}
      />

      {/* Day Drawer */}
      <DayDrawer
        date={selectedDay}
        events={filteredEvents}
        open={dayDrawerOpen}
        onOpenChange={setDayDrawerOpen}
        onEventClick={handleEventClick}
      />

      {/* Request Board */}
      <RequestBoard />
    </div>
  );
}

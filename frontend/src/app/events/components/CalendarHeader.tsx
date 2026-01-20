"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { CalendarView } from "@/types/event";

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onDateChange: (date: Date) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFiltersOpen: () => void;
}

export function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
  searchQuery,
  onSearchChange,
  onFiltersOpen,
}: CalendarHeaderProps) {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="sticky top-[64px] z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Navigation and View Toggle */}
          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onPrevious}
                className="h-9 w-9"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onNext}
                className="h-9 w-9"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={onToday}
                className="h-9 px-3"
              >
                Today
              </Button>
            </div>

            {/* Month/Year Display */}
            <div className="text-xl font-semibold">{monthYear}</div>

            {/* View Toggle */}
            <Tabs value={view} onValueChange={(v) => onViewChange(v as CalendarView)}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Right: Search and Filters */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events, clubs, keywords..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters Button (Mobile) */}
            <Button
              variant="outline"
              onClick={onFiltersOpen}
              className="lg:hidden"
            >
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

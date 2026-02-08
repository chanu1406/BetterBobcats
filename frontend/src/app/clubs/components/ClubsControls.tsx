"use client";

import { useEffect, useState } from "react";
import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ClubsBrowseFilters } from "@/lib/clubs";

const SORT_OPTIONS = [
  { value: "relevant", label: "Most relevant" },
  { value: "updated", label: "Recently updated" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "recruiting", label: "Recruiting first" },
] as const;

const DEBOUNCE_MS = 300;

type ClubsControlsProps = {
  filters: ClubsBrowseFilters;
  setFilter: (key: keyof ClubsBrowseFilters, value: string | boolean | null | undefined) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onOpenFilters?: () => void;
  majors: { id: string; name: string }[];
  majorsLoading?: boolean;
};

export function ClubsControls({
  filters,
  setFilter,
  viewMode,
  onViewModeChange,
  onOpenFilters,
  majors,
  majorsLoading,
}: ClubsControlsProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? "");

  useEffect(() => {
    setSearchInput(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFilter("search", searchInput.trim() || null);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput, setFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clubs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
            aria-label="Search clubs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={filters.majorId ?? "all"}
            onValueChange={(v) => setFilter("majorId", v === "all" ? null : v)}
            disabled={majorsLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All majors</SelectItem>
              {majors.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sortBy ?? "relevant"}
            onValueChange={(v) => setFilter("sortBy", v as ClubsBrowseFilters["sortBy"])}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex rounded-md border border-input bg-background">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-r-none border-0",
                viewMode === "grid" && "bg-muted"
              )}
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-l-none border-0",
                viewMode === "list" && "bg-muted"
              )}
              onClick={() => onViewModeChange("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {onOpenFilters && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenFilters}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

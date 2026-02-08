"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search, X, Flame } from "lucide-react";
import type { RequestSort } from "../hooks/useRequestsUrlState";
import type { RequestFiltersState } from "../hooks/useRequestsUrlState";

interface RequestFiltersProps {
  sort: RequestSort;
  onSortChange: (sort: RequestSort) => void;
  filters: RequestFiltersState;
  onFiltersChange: (filters: Partial<RequestFiltersState>) => void;
  onClearFilters: () => void;
  onCreateRequest?: () => void;
  searchPlaceholder?: string;
  hasActiveFilters: boolean;
}

const SORT_OPTIONS: { value: RequestSort; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "top", label: "Top" },
  { value: "new", label: "New" },
  { value: "recently_active", label: "Recently active" },
];

export function RequestFilters({
  sort,
  onSortChange,
  filters,
  onFiltersChange,
  onClearFilters,
  onCreateRequest,
  searchPlaceholder = "Search requests...",
  hasActiveFilters,
}: RequestFiltersProps) {
  return (
    <div
      className="sticky top-0 z-30 flex flex-col gap-3 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 py-3 px-1"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.06) 1px, transparent 0)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm min-w-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={filters.q}
            onChange={(e) => onFiltersChange({ q: e.target.value })}
            className="pl-9"
          />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Select value={sort} onValueChange={(v) => onSortChange(v as RequestSort)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px]">
              {sort === "trending"
                ? "Votes + recent activity. Newer and highly voted requests rise."
                : sort === "top"
                ? "Most votes first."
                : sort === "new"
                ? "Newest requests first."
                : "Recently updated or commented."}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {sort === "trending" && (
          <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/40 px-2 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-200">
            <Flame className="h-3.5 w-3.5" />
            Trending
          </span>
        )}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
        {onCreateRequest && (
          <Button size="sm" onClick={onCreateRequest} className="shrink-0">
            New request
          </Button>
        )}
      </div>
    </div>
  );
}

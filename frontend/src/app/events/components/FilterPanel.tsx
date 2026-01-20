"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Plus, Check } from "lucide-react";
import type { EventFilters } from "@/types/event";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  availableTags: string[];
  isMobile?: boolean;
}

interface Major {
  id: string;
  name: string;
}

interface Club {
  id: string;
  name: string;
}

export function FilterPanel({ filters, onFiltersChange, availableTags, isMobile = false }: FilterPanelProps) {
  const [majors, setMajors] = useState<Major[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubSearch, setClubSearch] = useState("");
  const [loadingMajors, setLoadingMajors] = useState(true);
  const [loadingClubs, setLoadingClubs] = useState(true);

  useEffect(() => {
    // Fetch majors
    supabase
      .from("majors")
      .select("id, name")
      .order("name")
      .then(({ data, error }) => {
        if (!error && data) {
          setMajors(data);
        }
        setLoadingMajors(false);
      });

    // Fetch clubs
    supabase
      .from("clubs")
      .select("id, name")
      .eq("is_active", true)
      .order("name")
      .then(({ data, error }) => {
        if (!error && data) {
          setClubs(data);
        }
        setLoadingClubs(false);
      });
  }, []);

  const updateFilter = <K extends keyof EventFilters>(
    key: K,
    value: EventFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <T extends string>(
    key: keyof EventFilters,
    value: T
  ) => {
    const current = filters[key] as T[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated as EventFilters[typeof key]);
  };

  const resetFilters = () => {
    onFiltersChange({
      majors: [],
      tags: [],
      clubs: [],
      locationTypes: [],
      timeOfDay: [],
      hideCancelled: false,
    });
    setClubSearch("");
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(clubSearch.toLowerCase())
  );

  return (
    <div className={cn(
      "w-80 bg-background p-4 overflow-hidden",
      !isMobile && "border-r hidden lg:block"
    )}>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>

        <ScrollArea className={cn(
          "pr-4",
          isMobile ? "h-[calc(100vh-100px)]" : "h-[calc(100vh-200px)]"
        )}>
          <div className="space-y-6">
            {/* Majors Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Majors</h3>
                {filters.majors.length > 0 && (
                  <span className="text-xs text-primary">
                    <Check className="h-3 w-3 inline" />
                  </span>
                )}
              </div>
              {loadingMajors ? (
                <div className="text-sm text-muted-foreground">Loading...</div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {majors.map((major) => (
                    <div key={major.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`major-${major.id}`}
                        checked={filters.majors.includes(major.id)}
                        onCheckedChange={() =>
                          toggleArrayFilter("majors", major.id)
                        }
                      />
                      <label
                        htmlFor={`major-${major.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {major.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Tags Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Tags</h3>
                {filters.tags.length > 0 && (
                  <Plus className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={filters.tags.includes(tag)}
                      onCheckedChange={() => toggleArrayFilter("tags", tag)}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm cursor-pointer flex-1 capitalize"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Club Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Club</h3>
                {filters.clubs.length > 0 && (
                  <Plus className="h-4 w-4 text-primary" />
                )}
              </div>
              <Input
                placeholder="Search clubs..."
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                className="mb-2"
              />
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredClubs.map((club) => (
                  <div key={club.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`club-${club.id}`}
                      checked={filters.clubs.includes(club.id)}
                      onCheckedChange={() =>
                        toggleArrayFilter("clubs", club.id)
                      }
                    />
                    <label
                      htmlFor={`club-${club.id}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {club.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Location Type Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Location Type</h3>
                {filters.locationTypes.length > 0 && (
                  <Plus className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="space-y-2">
                {[
                  { value: "on_campus" as const, label: "On-Campus" },
                  { value: "online" as const, label: "Online" },
                  { value: "off_campus" as const, label: "Off-Campus" },
                  { value: "hybrid" as const, label: "Hybrid" },
                ].map((location) => (
                  <div key={location.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location.value}`}
                      checked={filters.locationTypes.includes(location.value)}
                      onCheckedChange={() =>
                        toggleArrayFilter("locationTypes", location.value)
                      }
                    />
                    <label
                      htmlFor={`location-${location.value}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {location.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Time of Day Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Time</h3>
                {filters.timeOfDay.length > 0 && (
                  <Plus className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="space-y-2">
                {[
                  { value: "morning" as const, label: "Morning" },
                  { value: "afternoon" as const, label: "Afternoon" },
                  { value: "evening" as const, label: "Evening" },
                ].map((time) => (
                  <div key={time.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`time-${time.value}`}
                      checked={filters.timeOfDay.includes(time.value)}
                      onCheckedChange={() =>
                        toggleArrayFilter("timeOfDay", time.value)
                      }
                    />
                    <label
                      htmlFor={`time-${time.value}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {time.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Hide Cancelled */}
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hide-cancelled"
                  checked={filters.hideCancelled}
                  onCheckedChange={(checked) =>
                    updateFilter("hideCancelled", checked as boolean)
                  }
                />
                <label
                  htmlFor="hide-cancelled"
                  className="text-sm cursor-pointer flex-1"
                >
                  Hide Cancelled
                </label>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

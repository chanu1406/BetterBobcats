"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchClubsWithFilters,
  fetchMajorsList,
  type BrowseClub,
} from "@/lib/clubs";

export default function ClubsPage() {
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const queryClient = useQueryClient();

  // Fetch majors list (cached globally, rarely changes)
  const {
    data: majors = [],
    isLoading: majorsLoading,
  } = useQuery({
    queryKey: ["majors-list"],
    queryFn: fetchMajorsList,
    staleTime: 10 * 60 * 1000, // 10 minutes - majors rarely change
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch clubs with filters (cached per filter combination)
  const {
    data: clubs = [],
    isLoading: clubsLoading,
    error: clubsError,
  } = useQuery({
    queryKey: ["clubs-browse", selectedMajor || "all"],
    queryFn: () => fetchClubsWithFilters(selectedMajor || null),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  const loading = majorsLoading || clubsLoading;
  const error = clubsError
    ? clubsError instanceof Error
      ? clubsError.message
      : "Failed to load clubs"
    : null;

  // Prefetch clubs for popular majors on hover
  const handleMajorHover = (majorId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["clubs-browse", majorId],
      queryFn: () => fetchClubsWithFilters(majorId),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Student Clubs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover student organizations at UC Merced and find clubs that match your major and interests
          </p>
        </div>

        {/* Major Filter */}
        <div className="mb-8 max-w-md mx-auto">
          <label
            htmlFor="major-select"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Filter by Major
          </label>
          <Select
            value={selectedMajor || "all"}
            onValueChange={(value) =>
              setSelectedMajor(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Majors" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Majors</SelectLabel>
                <SelectItem value="all">All Majors</SelectItem>
                {majors.map((major) => (
                  <SelectItem
                    key={major.id}
                    value={major.id}
                    onMouseEnter={() => handleMajorHover(major.id)}
                  >
                    {major.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-destructive/10 border-2 border-destructive/30 text-destructive px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading clubs...</p>
          </div>
        ) : (
          <>
            {/* Clubs List */}
            {clubs.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-xl border-2 border-primary/20 max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground">
                  No clubs found for this major.
                </p>
                <button
                  onClick={() => setSelectedMajor("")}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  View All Clubs
                </button>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto space-y-6">
                {clubs.map((club) => {
                  const Wrapper = club.slug ? Link : "div";
                  const wrapperProps = club.slug
                    ? { href: `/clubs/${club.slug}` }
                    : {};
                  return (
                    <Wrapper
                      key={club.id}
                      {...wrapperProps}
                      className={`block bg-card p-8 rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all group ${club.slug ? "cursor-pointer" : ""}`}
                    >
                      <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                        {club.name}
                      </h2>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {club.description || "No description available."}
                      </p>
                      {club.website && (
                        <a
                          href={club.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all hover:gap-3"
                        >
                          Visit Website
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </Wrapper>
                  );
                })}
              </div>
            )}

            {/* Results Count */}
            <p className="mt-8 text-sm text-muted-foreground text-center">
              Showing {clubs.length} {clubs.length === 1 ? "club" : "clubs"}
              {selectedMajor && " for selected major"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { ClubCard } from "./ClubCard";
import type { BrowseClubWithProfile } from "@/lib/clubs";
import { cn } from "@/lib/utils";

type ClubsGridProps = {
  clubs: BrowseClubWithProfile[];
  viewMode: "grid" | "list";
  onCardHover?: (slug: string | null) => void;
  className?: string;
};

export function ClubsGrid({
  clubs,
  viewMode,
  onCardHover,
  className,
}: ClubsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 max-w-3xl",
        className
      )}
    >
      {clubs.map((club) => (
        <ClubCard
          key={club.id}
          club={club}
          onHover={onCardHover}
          compact={viewMode === "list"}
        />
      ))}
    </div>
  );
}

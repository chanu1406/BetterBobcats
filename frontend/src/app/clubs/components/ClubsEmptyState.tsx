import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type ClubsEmptyStateProps = {
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
};

export function ClubsEmptyState({
  onClearFilters,
  hasActiveFilters = false,
}: ClubsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Users className="h-12 w-12 text-muted-foreground mb-4" aria-hidden />
      <h3 className="text-lg font-medium mb-2">No clubs found</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Try adjusting your filters or search query
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {hasActiveFilters && onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
        <Button asChild>
          <Link href="/clubs/request">Suggest a club</Link>
        </Button>
      </div>
    </div>
  );
}

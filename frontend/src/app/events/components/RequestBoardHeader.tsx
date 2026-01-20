"use client";

import { Pin, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface RequestBoardHeaderProps {
  openCount?: number;
  fulfilledCount?: number;
  sortLabel?: string;
  isLoading?: boolean;
  onCreateRequest: () => void;
  onFilterClick: () => void;
  isAuthenticated: boolean | null;
}

export function RequestBoardHeader({
  openCount,
  fulfilledCount,
  sortLabel = "Most upvoted",
  isLoading = false,
  onCreateRequest,
  onFilterClick,
  isAuthenticated,
}: RequestBoardHeaderProps) {
  return (
    <div className="border-b border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          {/* Title Row */}
          <div className="flex items-center gap-3">
            <Pin className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Request Board
            </h1>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-muted-foreground">
            Request events and workshops you'd like to see
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </>
            ) : (
              <>
                {openCount !== undefined && fulfilledCount !== undefined && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="font-medium text-foreground">
                        {openCount}
                      </span>
                      <span>open</span>
                    </div>
                    <Separator orientation="vertical" className="h-3" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">
                        {fulfilledCount}
                      </span>
                      <span>fulfilled</span>
                    </div>
                    <Separator orientation="vertical" className="h-3" />
                  </>
                )}
                <div>
                  Sorted by: <span className="font-medium">{sortLabel}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

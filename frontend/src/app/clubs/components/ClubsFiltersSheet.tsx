"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
  ClubsBrowseFilters,
  ClubProfileRecruitingStatus,
  ClubProfileCommitmentLevel,
  ClubProfileOpenTo,
} from "@/lib/clubs";

const RECRUITING_OPTIONS: { value: ClubProfileRecruitingStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "by_invite", label: "Invite only" },
  { value: "closed", label: "Closed" },
];

const COMMITMENT_OPTIONS: { value: ClubProfileCommitmentLevel; label: string }[] = [
  { value: "casual", label: "Casual" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
];

const OPEN_TO_OPTIONS: { value: ClubProfileOpenTo; label: string }[] = [
  { value: "undergrad", label: "Undergrad" },
  { value: "grad", label: "Grad" },
  { value: "both", label: "Both" },
];

type ClubsFiltersSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ClubsBrowseFilters;
  setFilter: (key: keyof ClubsBrowseFilters, value: string | boolean | null | undefined) => void;
  clearFilters: () => void;
};

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{title}</Label>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function ClubsFiltersSheet({
  open,
  onOpenChange,
  filters,
  setFilter,
  clearFilters,
}: ClubsFiltersSheetProps) {
  const handleClearAll = () => {
    clearFilters();
    onOpenChange(false);
  };

  const handleApply = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter clubs</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 py-6 pr-4">
          <div className="space-y-6">
            <FilterGroup title="Recruiting status">
              <Select
                value={filters.recruitingStatus ?? "all"}
                onValueChange={(v) =>
                  setFilter("recruitingStatus", v === "all" ? null : (v as ClubProfileRecruitingStatus))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {RECRUITING_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterGroup>

            <FilterGroup title="Commitment level">
              <Select
                value={filters.commitmentLevel ?? "all"}
                onValueChange={(v) =>
                  setFilter("commitmentLevel", v === "all" ? null : (v as ClubProfileCommitmentLevel))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {COMMITMENT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterGroup>

            <FilterGroup title="Open to">
              <Select
                value={filters.openTo ?? "all"}
                onValueChange={(v) =>
                  setFilter("openTo", v === "all" ? null : (v as ClubProfileOpenTo))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {OPEN_TO_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterGroup>

            <FilterGroup title="Other">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="openToAllMajors"
                  checked={filters.openToAllMajors === true}
                  onCheckedChange={(checked) =>
                    setFilter("openToAllMajors", checked === true ? true : null)
                  }
                />
                <Label htmlFor="openToAllMajors" className="text-sm font-normal cursor-pointer">
                  Open to all majors
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="noDues"
                  checked={filters.noDues === true}
                  onCheckedChange={(checked) =>
                    setFilter("noDues", checked === true ? true : null)
                  }
                />
                <Label htmlFor="noDues" className="text-sm font-normal cursor-pointer">
                  No dues
                </Label>
              </div>
            </FilterGroup>
          </div>
        </ScrollArea>

        <SheetFooter className="flex-row gap-2 sm:gap-0 border-t pt-4">
          <Button type="button" variant="outline" onClick={handleClearAll} className="flex-1 sm:flex-initial">
            Clear all
          </Button>
          <Button type="button" onClick={handleApply} className="flex-1 sm:flex-initial">
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

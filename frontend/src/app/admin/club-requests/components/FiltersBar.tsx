"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FiltersBarProps {
  status: string;
  search: string;
  sort: string;
}

/**
 * Client component for filtering and searching club requests
 * Uses URL search params for shareable links
 */
export default function FiltersBar({ status, search, sort }: FiltersBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "pending") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.push(`/admin/club-requests?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "updated") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/admin/club-requests?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    router.push(`/admin/club-requests?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Status Filter */}
      <div className="flex-shrink-0">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="flex-1">
        <div className="flex gap-2">
          <Input
            name="search"
            type="text"
            placeholder="Search by name, email, or slug..."
            defaultValue={search}
            className="flex-1"
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </div>
      </form>

      {/* Sort */}
      <div className="flex-shrink-0">
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Recently updated</SelectItem>
            <SelectItem value="created">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

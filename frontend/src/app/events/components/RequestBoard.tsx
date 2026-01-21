"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Pin, Filter, X, Search } from "lucide-react";
import { fetchEventRequests } from "@/lib/event-requests";
import type { EventRequest } from "@/types/event-request";
import { StickyNote } from "./StickyNote";
import { CreateRequestDialog } from "./CreateRequestDialog";
import { RequestDetailsPanel } from "./RequestDetailsPanel";
import { SignInDialog } from "./SignInDialog";
import { RequestBoardHeader } from "./RequestBoardHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/browser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Major {
  id: string;
  name: string;
}

type SortOption = "most-upvoted" | "newest" | "fulfilled";

export function RequestBoard() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<EventRequest | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajorIds, setSelectedMajorIds] = useState<string[]>([]);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("most-upvoted");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch event requests with TanStack Query
  const {
    data: allRequests = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["event-requests"],
    queryFn: fetchEventRequests,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    loadMajors();
    checkAuth();

    // Listen for auth state changes
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Invalidate cache helper
  const invalidateRequests = () => {
    queryClient.invalidateQueries({ queryKey: ["event-requests"] });
  };

  // Sort and filter requests
  const requests = useMemo(() => {
    let filtered = allRequests;

    // Filter by major
    if (selectedMajorIds.length > 0) {
      filtered = filtered.filter((request) => {
        if (request.is_all_majors) return true;
        if (request.major_id && selectedMajorIds.includes(request.major_id)) return true;
        return false;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((request) =>
        request.description.toLowerCase().includes(query) ||
        request.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "most-upvoted") {
        const votesA = a.vote_count || 0;
        const votesB = b.vote_count || 0;
        if (votesB !== votesA) {
          return votesB - votesA;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortOption === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortOption === "fulfilled") {
        // Fulfilled first, then by vote count
        if (a.status === "fulfilled" && b.status !== "fulfilled") return -1;
        if (a.status !== "fulfilled" && b.status === "fulfilled") return 1;
        const votesA = a.vote_count || 0;
        const votesB = b.vote_count || 0;
        return votesB - votesA;
      }
      return 0;
    });

    return sorted;
  }, [allRequests, selectedMajorIds, searchQuery, sortOption]);

  const loadMajors = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("majors")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setMajors(data || []);
    } catch (err) {
      console.error("Error loading majors:", err);
    }
  };

  const checkAuth = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };


  const toggleMajorFilter = (majorId: string) => {
    setSelectedMajorIds((prev) =>
      prev.includes(majorId)
        ? prev.filter((id) => id !== majorId)
        : [...prev, majorId]
    );
  };

  const clearFilters = () => {
    setSelectedMajorIds([]);
  };

  // Calculate counts for header
  const openCount = allRequests.filter(
    (r) => r.status === "open" && !r.deleted_at
  ).length;
  const fulfilledCount = allRequests.filter(
    (r) => r.status === "fulfilled"
  ).length;

  const handleRequestClick = (request: EventRequest) => {
    setSelectedRequest(request);
    setDrawerOpen(true);
  };

  const handleRequestCreated = () => {
    invalidateRequests();
    setCreateDialogOpen(false);
  };

  const handleRequestDeleted = () => {
    invalidateRequests();
    setDrawerOpen(false);
  };

  if (error) {
    return (
      <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="text-destructive text-sm">
          {error instanceof Error ? error.message : "Failed to load requests"}
        </p>
      </div>
    );
  }

  const handleCreateRequest = () => {
    if (isAuthenticated === false) {
      setSignInDialogOpen(true);
    } else if (isAuthenticated === true) {
      setCreateDialogOpen(true);
    }
  };

  return (
    <>
      <div className="mt-8 space-y-6">
        {/* Premium Header */}
        <RequestBoardHeader
          openCount={openCount}
          fulfilledCount={fulfilledCount}
          sortLabel={
            sortOption === "most-upvoted"
              ? "Most upvoted"
              : sortOption === "newest"
              ? "Newest"
              : "Fulfilled"
          }
          isLoading={loading}
          onCreateRequest={handleCreateRequest}
          onFilterClick={() => setFilterPopoverOpen(true)}
          isAuthenticated={isAuthenticated}
        />

        {/* Toolbar above board */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-3">
            {/* Sort dropdown */}
            <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-upvoted">Most upvoted</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter button */}
            <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="default">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  {selectedMajorIds.length > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                      {selectedMajorIds.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">Filter by Major</h3>
                    {selectedMajorIds.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-7 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2 pr-4">
                      <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                        <Checkbox
                          id="filter-all-majors"
                          checked={selectedMajorIds.length === 0}
                          onCheckedChange={() => {
                            if (selectedMajorIds.length === 0) {
                              // Already showing all, do nothing
                            } else {
                              clearFilters();
                            }
                          }}
                        />
                        <Label
                          htmlFor="filter-all-majors"
                          className="text-sm font-medium cursor-pointer flex-1"
                        >
                          All Majors
                        </Label>
                      </div>
                      {majors.map((major) => (
                        <div
                          key={major.id}
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                        >
                          <Checkbox
                            id={`filter-major-${major.id}`}
                            checked={selectedMajorIds.includes(major.id)}
                            onCheckedChange={() => toggleMajorFilter(major.id)}
                          />
                          <Label
                            htmlFor={`filter-major-${major.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {major.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </PopoverContent>
            </Popover>

            {/* Search input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Post a request button */}
          <Button onClick={handleCreateRequest} disabled={isAuthenticated === null}>
            <Plus className="mr-2 h-4 w-4" />
            Post a request
          </Button>
        </div>

        {/* Board Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Subtle frame shadow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-900/10 via-amber-800/15 to-amber-900/10 rounded-lg blur" />
            
            {/* Frame */}
            <div className="relative bg-gradient-to-br from-amber-800/40 via-amber-700/50 to-amber-800/40 rounded-lg p-2 shadow-lg">
              {/* Inner frame border */}
              <div className="absolute inset-0 rounded-lg border border-amber-600/30 pointer-events-none" />
              
              {/* Subtle vignette */}
              <div 
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.08), inset 0 0 30px rgba(0,0,0,0.05)",
                }}
              />
              
              {/* Cork Board Background with constrained height */}
              <div
                className="relative h-[600px] overflow-y-auto rounded-md p-6 md:p-8"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.05) 0%, transparent 60%),
                    radial-gradient(circle at 20% 30%, rgba(212, 165, 116, 0.6) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(157, 127, 90, 0.4) 0%, transparent 50%),
                    linear-gradient(135deg, #d4a574 0%, #b8956a 25%, #9d7f5a 50%, #b8956a 75%, #d4a574 100%),
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0,0,0,0.02) 2px,
                      rgba(0,0,0,0.02) 4px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      rgba(0,0,0,0.015) 2px,
                      rgba(0,0,0,0.015) 4px
                    )
                  `,
                  boxShadow: `
                    inset 0 4px 8px rgba(0,0,0,0.1),
                    inset 0 1px 2px rgba(0,0,0,0.08)
                  `,
                  backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 4px 4px, 4px 4px",
                }}
              >
                {/* Subtle board details */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Pin holes */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const hash = i * 37;
                    const x = (hash % 85) + 5;
                    const y = ((hash * 7) % 80) + 5;
                    return (
                      <div
                        key={`pin-hole-${i}`}
                        className="absolute rounded-full bg-black/5"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          width: '2px',
                          height: '2px',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Scrollable content wrapper */}
                <div className="relative min-h-full">
                  {loading ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="break-inside-avoid mb-6"
                          style={{
                            transform: `rotate(${(i % 5) - 2}deg)`,
                          }}
                        >
                          <Skeleton
                            className="h-48 w-full rounded-md"
                            style={{
                              background: "linear-gradient(135deg, rgba(255, 249, 196, 0.95) 0%, rgba(255, 245, 157, 0.98) 100%)",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                      {/* Create Request sticky note - first item */}
                      <div className="break-inside-avoid mb-6">
                        <StickyNote
                          request={{
                            id: "create-request",
                            description: "+ Post a request",
                            major_id: null,
                            is_all_majors: true,
                            status: "open",
                            fulfilled_event_id: null,
                            created_by: "",
                            created_at: new Date().toISOString(),
                            deleted_at: null,
                            deleted_by: null,
                            delete_reason: null,
                            vote_count: 0,
                            tags: [],
                          }}
                          onClick={handleCreateRequest}
                          isEmptyState={true}
                          isCreateNote={true}
                        />
                      </div>
                      
                      {/* Actual requests */}
                      {requests.map((request) => (
                        <div key={request.id} className="break-inside-avoid mb-6">
                          <StickyNote
                            request={request}
                            onClick={() => handleRequestClick(request)}
                            onVoteToggled={invalidateRequests}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Request Dialog */}
      <CreateRequestDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onRequestCreated={handleRequestCreated}
      />

      {/* Request Details Panel */}
      <RequestDetailsPanel
        request={selectedRequest}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onRequestDeleted={handleRequestDeleted}
        onVoteToggled={invalidateRequests}
      />

      {/* Sign In Dialog */}
      <SignInDialog
        open={signInDialogOpen}
        onOpenChange={setSignInDialogOpen}
        action="request"
      />
    </>
  );
}

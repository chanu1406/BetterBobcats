"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EventsList from "./components/EventsList";
import { fetchClubEvents, type EventFilters } from "@/lib/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClubEventsClientProps {
  clubId: string;
  clubSlug: string;
  initialUserRole: string;
  isDeactivated?: boolean;
}

const EVENTS_PER_PAGE = 20;

/**
 * Club Events Management Client Component
 * Uses TanStack Query for caching and performance
 */
export default function ClubEventsClient({
  clubId,
  clubSlug,
  initialUserRole,
  isDeactivated = false,
}: ClubEventsClientProps) {
  // Check if user has permission
  const isOfficerOrAdmin =
    initialUserRole === "admin" || initialUserRole === "officer";

  if (!initialUserRole) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not Authorized</CardTitle>
          <CardDescription>
            You are not a member of this club.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You need to be a member of this club to access its events page.
          </p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (!isOfficerOrAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            Only club admins and officers can manage events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You need to be a club admin or officer to access event management.
          </p>
          <Link href={`/dashboard/${clubSlug}`}>
            <Button variant="outline">Back to Club Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "published" | "cancelled"
  >("all");
  const [page, setPage] = useState(0);

  const filters: EventFilters = {
    ...(statusFilter !== "all" && { status: statusFilter }),
  };

  const {
    data: eventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club-events", clubId, filters, page],
    queryFn: () =>
      fetchClubEvents(clubId, filters, EVENTS_PER_PAGE, page * EVENTS_PER_PAGE),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const events = eventsData?.events || [];
  const total = eventsData?.total || 0;
  const totalPages = Math.ceil(total / EVENTS_PER_PAGE);

  // Prefetch next page
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      queryClient.prefetchQuery({
        queryKey: ["club-events", clubId, filters, page + 1],
        queryFn: () =>
          fetchClubEvents(
            clubId,
            filters,
            EVENTS_PER_PAGE,
            (page + 1) * EVENTS_PER_PAGE
          ),
        staleTime: 2 * 60 * 1000,
      });
    }
    setPage((p) => Math.min(p + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  // Invalidate cache when events change
  const handleEventChange = () => {
    queryClient.invalidateQueries({ queryKey: ["club-events", clubId] });
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "Failed to load events. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-semibold text-foreground mb-2">
              Events
            </h1>
            <p className="text-muted-foreground text-base">
              Create and manage your club's events
            </p>
          </div>
        </div>
      </div>

      {/* Deactivation Banner */}
      {isDeactivated && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Club Deactivated</AlertTitle>
          <AlertDescription className="mt-2">
            This club has been deactivated. Contact BetterBobcats platform
            admins to get reactivated.
          </AlertDescription>
        </Alert>
      )}

      {/* Events Management */}
      {!isDeactivated && (
        <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Club Events</CardTitle>
              <CardDescription>
                View, create, and manage your club's events
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value: any) => {
                setStatusFilter(value);
                setPage(0); // Reset to first page when filter changes
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Link href={`/dashboard/${clubSlug}/events/new`}>
                <Button>Create Event</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && events.length === 0 ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-6">
                  <Skeleton className="h-6 w-64 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <EventsList
                events={events}
                clubId={clubId}
                clubSlug={clubSlug}
                onEventChange={handleEventChange}
              />
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {page * EVENTS_PER_PAGE + 1}-
                    {Math.min((page + 1) * EVENTS_PER_PAGE, total)} of {total}{" "}
                    events
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handlePreviousPage}
                      disabled={page === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleNextPage}
                      disabled={page >= totalPages - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      )}
    </>
  );
}

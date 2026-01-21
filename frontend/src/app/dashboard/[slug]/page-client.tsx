"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { fetchClubDashboardData } from "@/lib/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

interface ClubDashboardClientProps {
  slug: string;
}

/**
 * Club Dashboard Client Component
 * Uses TanStack Query for caching and performance
 */
export default function ClubDashboardClient({ slug }: ClubDashboardClientProps) {
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club-dashboard", slug],
    queryFn: () => fetchClubDashboardData(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    retry: 1,
  });

  if (isLoading) {
    return (
      <>
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    );
  }

  if (error || !dashboardData) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "Failed to load club dashboard. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  const { club, membership, stats } = dashboardData;

  if (!membership) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You are not a member of this club.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You need to be a member of this club to access its dashboard.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isDeactivated = !club.is_active;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-foreground mb-2">
          Overview
        </h1>
        {club.description && (
          <p className="text-muted-foreground text-base">
            {club.description}
          </p>
        )}
      </div>

      {/* Deactivation Banner */}
      {isDeactivated && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Club Deactivated</AlertTitle>
          <AlertDescription className="mt-2">
            This club has been deactivated. Contact BetterBobcats platform
            admins to get reactivated.
          </AlertDescription>
          <div className="mt-4">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </Alert>
      )}

      {/* Overview Sections - Hidden if deactivated */}
      {!isDeactivated && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Section */}
          {(membership.role === "admin" || membership.role === "officer") && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Club profile and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your club's profile information, settings, and branding.
                </p>
                <Link href={`/dashboard/${slug}/profile`}>
                  <Button variant="outline" className="w-full">
                    Manage Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Events Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Manage club events</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create, edit, and manage club events and gatherings.
              </p>
              {(membership.role === "admin" || membership.role === "officer") ? (
                <Link href={`/dashboard/${slug}/events`}>
                  <Button className="w-full">Manage Events</Button>
                </Link>
              ) : (
                <Link href={`/dashboard/${slug}/events`}>
                  <Button variant="outline" className="w-full">
                    View Events
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Members Section */}
          {membership.role === "admin" && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>View and manage club members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage member roles, invitations, and club membership.
                </p>
                <Link href={`/dashboard/${slug}/members`}>
                  <Button className="w-full">Manage Members</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
}

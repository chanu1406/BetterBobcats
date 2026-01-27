"use client";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { fetchUserDashboardData } from "@/lib/dashboard";
import { useEffect } from "react";

/**
 * Dashboard Page
 * Shows user's club memberships with TanStack Query caching
 */
export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/auth/login?next=/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  // Fetch memberships with TanStack Query
  const {
    data: memberships = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: fetchUserDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    retry: 1,
  });

  // Prefetch club dashboard on hover
  const handleClubHover = (slug: string | null) => {
    if (slug) {
      queryClient.prefetchQuery({
        queryKey: ["club-dashboard", slug],
        queryFn: async () => {
          const { fetchClubDashboardData } = await import("@/lib/dashboard");
          return fetchClubDashboardData(slug);
        },
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["user-dashboard"] });
  };

  const getRoleBadge = (role: string) => {
    const roleLower = role.toLowerCase();
    let variant: "default" | "secondary" | "outline" = "secondary";

    if (roleLower === "admin") {
      variant = "default";
    } else if (roleLower === "officer") {
      variant = "secondary";
    } else if (roleLower === "member") {
      variant = "outline";
    }

    return (
      <Badge variant={variant} className="capitalize">
        {role}
      </Badge>
    );
  };

  const handleOpenClub = (slug: string | null, clubId: string) => {
    if (slug) {
      router.push(`/dashboard/${slug}`);
    } else {
      // Fallback: try /clubs/[slug] or redirect to dashboard with error
      // Since we don't have a slug, we can't navigate to club-specific pages
      console.warn(`Club ${clubId} has no slug, cannot navigate to club dashboard`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              My Clubs
            </h1>
            <p className="text-muted-foreground text-base">
              Manage your clubs.
            </p>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-2/3"></div>
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-semibold text-foreground mb-3">
            My Clubs
          </h1>
          <p className="text-muted-foreground text-base">
            Manage your clubs.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {error instanceof Error
                ? error.message
                : "Failed to load memberships. Please try again."}
              <Button
                variant="outline"
                size="sm"
                className="ml-4"
                onClick={handleRetry}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!error && memberships.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4 text-lg">
                No clubs yet
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                You're not a member of any clubs yet. Check your invites to get
                started.
              </p>
              <Link href="/invites">
                <Button>Check Invites</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Clubs List */}
        {!error && memberships.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberships.map((membership) => {
              const isDeactivated = membership.club.is_active === false;

              return (
                <Card
                  key={membership.id}
                  className="hover:shadow-lg transition-shadow"
                  onMouseEnter={() => handleClubHover(membership.club.slug)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      {/* Club Logo */}
                      <div className="flex-shrink-0 relative">
                        {membership.club.logo_url ? (
                          <>
                            <img
                              src={membership.club.logo_url}
                              alt={membership.club.name || "Club logo"}
                              className="w-12 h-12 rounded-lg object-cover border"
                              onError={(e) => {
                                // Hide image and show placeholder on error
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const placeholder =
                                  target.nextElementSibling as HTMLElement;
                                if (placeholder) {
                                  placeholder.style.display = "flex";
                                }
                              }}
                            />
                            <div
                              className="w-12 h-12 rounded-lg bg-muted border flex items-center justify-center text-xl font-semibold text-muted-foreground absolute inset-0"
                              style={{ display: "none" }}
                            >
                              {membership.club.name
                                ? membership.club.name.charAt(0).toUpperCase()
                                : "?"}
                            </div>
                          </>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-muted border flex items-center justify-center text-xl font-semibold text-muted-foreground">
                            {membership.club.name
                              ? membership.club.name.charAt(0).toUpperCase()
                              : "?"}
                          </div>
                        )}
                      </div>

                      {/* Club Info */}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl truncate">
                          {membership.club.name || "Unknown Club"}
                        </CardTitle>
                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                          {getRoleBadge(membership.role)}
                          {isDeactivated && (
                            <Badge
                              variant="secondary"
                              className="bg-muted text-muted-foreground"
                            >
                              Deactivated
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      onClick={() =>
                        handleOpenClub(membership.club.slug, membership.club.id)
                      }
                      disabled={!membership.club.slug}
                    >
                      Open
                    </Button>
                    {isDeactivated && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        This club is deactivated. Contact BetterBobcats platform
                        admins.
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

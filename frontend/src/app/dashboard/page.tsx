"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import type { MembershipWithClub } from "@/types/membership";
import Link from "next/link";

/**
 * Dashboard Page
 * Shows user's club memberships with fallback fetching strategy
 */
export default function DashboardPage() {
  const router = useRouter();
  const [memberships, setMemberships] = useState<MembershipWithClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const supabase = createClient();

        // Check if user is authenticated
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.push("/auth/login?next=/dashboard");
          return;
        }

        setLoading(true);
        setError(null);

        // Strategy A: Try to fetch with join
        let membershipsData: MembershipWithClub[] = [];
        let clubsData: Record<string, any> = {};

        try {
          const { data, error: joinError } = await supabase
            .from("club_memberships")
            .select(
              "id, club_id, role, created_at, clubs:club_id (id, name, slug, logo_url, is_active)"
            )
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (joinError) {
            throw joinError;
          }

          // Process joined data
          if (data) {
            membershipsData = data.map((membership: any) => {
              const club = membership.clubs
                ? Array.isArray(membership.clubs)
                  ? membership.clubs[0]
                  : membership.clubs
                : null;

              return {
                id: membership.id,
                club_id: membership.club_id,
                role: membership.role,
                created_at: membership.created_at,
                club: club
                  ? {
                      id: club.id,
                      name: club.name,
                      slug: club.slug,
                      logo_url: club.logo_url,
                      is_active: club.is_active,
                    }
                  : {
                      id: membership.club_id,
                      name: "Unknown Club",
                      slug: null,
                      logo_url: null,
                      is_active: null,
                    },
              };
            });
          }
        } catch (joinErr) {
          // Strategy B: Fallback - fetch separately
          console.warn(
            "Join query failed, falling back to separate queries:",
            joinErr
          );

          // First, fetch memberships
          const { data: membershipsResult, error: membershipsError } =
            await supabase
              .from("club_memberships")
              .select("id, club_id, role, created_at")
              .eq("user_id", user.id)
              .order("created_at", { ascending: false });

          if (membershipsError) {
            throw membershipsError;
          }

          if (!membershipsResult || membershipsResult.length === 0) {
            setMemberships([]);
            setLoading(false);
            return;
          }

          // Extract unique club IDs
          const clubIds = [
            ...new Set(membershipsResult.map((m) => m.club_id)),
          ];

          // Fetch clubs with is_active
          const { data: clubsResult, error: clubsError } = await supabase
            .from("clubs")
            .select("id, name, slug, logo_url, is_active")
            .in("id", clubIds);

          if (clubsError) {
            console.warn("Failed to fetch clubs:", clubsError);
            // Continue without club data
          } else if (clubsResult) {
            // Create a map for quick lookup
            clubsData = clubsResult.reduce(
              (acc, club) => {
                acc[club.id] = {
                  id: club.id,
                  name: club.name,
                  slug: club.slug,
                  logo_url: club.logo_url,
                  is_active: club.is_active,
                };
                return acc;
              },
              {} as Record<string, any>
            );
          }

          // Merge memberships with club data
          membershipsData = membershipsResult.map((membership) => ({
            id: membership.id,
            club_id: membership.club_id,
            role: membership.role,
            created_at: membership.created_at,
            club: clubsData[membership.club_id] || {
              id: membership.club_id,
              name: "Unknown Club",
              slug: null,
              logo_url: null,
              is_active: null,
            },
          }));
        }

        setMemberships(membershipsData);
      } catch (err) {
        console.error("Error fetching memberships:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load memberships. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, [router]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger re-fetch by reloading
    window.location.reload();
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
      setError(`Club does not have a slug. Cannot navigate to club dashboard.`);
      console.warn(`Club ${clubId} has no slug, cannot navigate`);
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
              {error}
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

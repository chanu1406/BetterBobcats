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
import type { InviteWithClub } from "@/types/invite";
import Link from "next/link";

export default function InvitesPage() {
  const router = useRouter();
  const [invites, setInvites] = useState<InviteWithClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication and fetch invites
    const fetchInvites = async () => {
      try {
        const supabase = createClient();
        
        // Check if user is authenticated
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.push("/auth/login?next=/invites");
          return;
        }

        setLoading(true);
        setError(null);

        // Strategy A: Try to fetch with join
        let invitesData: InviteWithClub[] = [];
        let clubsData: Record<string, any> = {};

        try {
          const { data, error: joinError } = await supabase
            .from("club_invites")
            .select(
              "id, club_id, role, created_at, accepted_at, clubs:club_id (id, name, slug, logo_url)"
            )
            .is("accepted_at", null)
            .order("created_at", { ascending: false });

          if (joinError) {
            throw joinError;
          }

          // Process joined data
          if (data) {
            invitesData = data.map((invite: any) => {
              const club = invite.clubs
                ? Array.isArray(invite.clubs)
                  ? invite.clubs[0]
                  : invite.clubs
                : null;

              return {
                id: invite.id,
                club_id: invite.club_id,
                role: invite.role,
                created_at: invite.created_at,
                accepted_at: invite.accepted_at,
                club: club
                  ? {
                      id: club.id,
                      name: club.name,
                      slug: club.slug,
                      logo_url: club.logo_url,
                    }
                  : undefined,
              };
            });
          }
        } catch (joinErr) {
          // Strategy B: Fallback - fetch separately
          console.warn("Join query failed, falling back to separate queries:", joinErr);

          // First, fetch invites
          const { data: invitesResult, error: invitesError } = await supabase
            .from("club_invites")
            .select("id, club_id, role, created_at, accepted_at")
            .is("accepted_at", null)
            .order("created_at", { ascending: false });

          if (invitesError) {
            throw invitesError;
          }

          if (!invitesResult || invitesResult.length === 0) {
            setInvites([]);
            setLoading(false);
            return;
          }

          // Extract unique club IDs
          const clubIds = [
            ...new Set(invitesResult.map((invite) => invite.club_id)),
          ];

          // Fetch clubs
          const { data: clubsResult, error: clubsError } = await supabase
            .from("clubs")
            .select("id, name, slug, logo_url")
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
                };
                return acc;
              },
              {} as Record<string, any>
            );
          }

          // Merge invites with club data
          invitesData = invitesResult.map((invite) => ({
            id: invite.id,
            club_id: invite.club_id,
            role: invite.role,
            created_at: invite.created_at,
            accepted_at: invite.accepted_at,
            club: clubsData[invite.club_id],
          }));
        }

        setInvites(invitesData);
      } catch (err) {
        console.error("Error fetching invites:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load invites. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, [router]);

  const handleAcceptInvite = async (inviteId: string) => {
    const supabase = createClient();
    setAcceptingId(inviteId);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "accept_club_invite",
        {
          p_invite_id: inviteId,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to accept invite");
      }

      // Get club slug if available for redirect
      const acceptedInvite = invites.find((inv) => inv.id === inviteId);
      const clubSlug = acceptedInvite?.club?.slug;

      // Optimistically remove from list
      setInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
      setSuccessMessage("Invite accepted successfully!");

      // Redirect after a short delay
      setTimeout(() => {
        if (clubSlug) {
          // If we have a slug-based dashboard route, use it
          router.push(`/dashboard/${clubSlug}`);
        } else {
          // Default to /dashboard
          router.push("/dashboard");
        }
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to accept invite. Please try again."
      );
      setAcceptingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Club Invites
            </h1>
            <p className="text-muted-foreground text-base">
              View and accept your pending club invitations
            </p>
          </div>

          {/* Loading skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-1/3"></div>
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                    </div>
                    <div className="h-10 bg-muted rounded w-24"></div>
                  </div>
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
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-semibold text-foreground mb-3">
            Club Invites
          </h1>
          <p className="text-muted-foreground text-base">
            View and accept your pending club invitations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {error}
              <Button
                variant="outline"
                size="sm"
                className="ml-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {successMessage && (
          <Alert className="mb-6 bg-green-500/10 border-green-500/30">
            <AlertDescription className="text-green-700 dark:text-green-400">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!error && invites.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4 text-lg">
                No pending invites
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                You don't have any pending club invitations at this time.
              </p>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Invites List */}
        {invites.length > 0 && (
          <div className="space-y-4">
            {invites.map((invite) => (
              <Card key={invite.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Club Logo */}
                    <div className="flex-shrink-0 relative">
                      {invite.club?.logo_url ? (
                        <>
                          <img
                            src={invite.club.logo_url}
                            alt={invite.club.name || "Club logo"}
                            className="w-16 h-16 rounded-lg object-cover border"
                            onError={(e) => {
                              // Hide image and show placeholder on error
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const placeholder = target.nextElementSibling as HTMLElement;
                              if (placeholder) {
                                placeholder.style.display = "flex";
                              }
                            }}
                          />
                          <div
                            className="w-16 h-16 rounded-lg bg-muted border flex items-center justify-center text-2xl font-semibold text-muted-foreground absolute inset-0"
                            style={{ display: "none" }}
                          >
                            {invite.club?.name
                              ? invite.club.name.charAt(0).toUpperCase()
                              : "?"}
                          </div>
                        </>
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-muted border flex items-center justify-center text-2xl font-semibold text-muted-foreground">
                          {invite.club?.name
                            ? invite.club.name.charAt(0).toUpperCase()
                            : "?"}
                        </div>
                      )}
                    </div>

                    {/* Club Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {invite.club?.name || "Unknown Club"}
                        </h3>
                        <Badge variant="secondary" className="shrink-0">
                          {invite.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Invited on {formatDate(invite.created_at)}
                      </p>
                    </div>

                    {/* Accept Button */}
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => handleAcceptInvite(invite.id)}
                        disabled={acceptingId === invite.id}
                      >
                        {acceptingId === invite.id ? "Accepting..." : "Accept"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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

/**
 * Fetch user invites with club details using resource embedding
 */
async function fetchUserInvites(): Promise<InviteWithClub[]> {
  const supabase = createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  // Try resource embedding first
  const { data, error } = await supabase
    .from("club_invites")
    .select(
      "id, club_id, role, created_at, accepted_at, clubs:club_id (id, name, slug, logo_url)"
    )
    .is("accepted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  // Process joined data
  return data.map((invite: any) => {
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

export default function InvitesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/auth/login?next=/invites");
      }
    };
    checkAuth();
  }, [router]);

  // Fetch invites with TanStack Query
  const {
    data: invites = [],
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["user-invites"],
    queryFn: fetchUserInvites,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to load invites"
    : null;

  // Accept invite mutation with optimistic updates
  const acceptInviteMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      const supabase = createClient();
      const { data, error: rpcError } = await supabase.rpc(
        "accept_club_invite",
        {
          p_invite_id: inviteId,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to accept invite");
      }

      return data;
    },
    onMutate: async (inviteId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["user-invites"] });

      // Snapshot previous value
      const previousInvites = queryClient.getQueryData<InviteWithClub[]>([
        "user-invites",
      ]);

      // Optimistically remove invite
      queryClient.setQueryData<InviteWithClub[]>(["user-invites"], (old) =>
        old ? old.filter((inv) => inv.id !== inviteId) : []
      );

      return { previousInvites };
    },
    onError: (err, inviteId, context) => {
      // Rollback on error
      if (context?.previousInvites) {
        queryClient.setQueryData(["user-invites"], context.previousInvites);
      }
    },
    onSuccess: (data, inviteId) => {
      // Get club slug for redirect
      const acceptedInvite = invites.find((inv) => inv.id === inviteId);
      const clubSlug = acceptedInvite?.club?.slug;

      setSuccessMessage("Invite accepted successfully!");

      // Invalidate and redirect
      queryClient.invalidateQueries({ queryKey: ["user-invites"] });

      setTimeout(() => {
        if (clubSlug) {
          router.push(`/dashboard/${clubSlug}`);
        } else {
          router.push("/dashboard");
        }
      }, 1500);
    },
  });

  const handleAcceptInvite = (inviteId: string) => {
    acceptInviteMutation.mutate(inviteId);
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
                        disabled={acceptInviteMutation.isPending}
                      >
                        {acceptInviteMutation.isPending ? "Accepting..." : "Accept"}
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

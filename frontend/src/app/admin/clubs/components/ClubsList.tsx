"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DeactivateModal,
  ReactivateModal,
  HardDeleteModal,
} from "./ClubActionModals";
import ClubDetailsDialog from "./ClubDetailsDialog";
import { ChevronDown } from "lucide-react";
import { fetchAdminClubsList, type AdminClub } from "@/lib/admin";

/**
 * Component to display a list of all clubs with admin actions
 * Optimized with TanStack Query and Supabase direct queries
 */
export default function ClubsList() {
  const queryClient = useQueryClient();

  // Modal states
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [reactivateModalOpen, setReactivateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<AdminClub | null>(null);

  // Loading states for actions
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteDropdownOpen, setDeleteDropdownOpen] = useState<string | null>(
    null
  );

  const { addToast } = useToast();
  const supabase = createClient();

  // Fetch clubs with TanStack Query
  const {
    data: clubs = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["admin-clubs-list"],
    queryFn: () => fetchAdminClubsList(100, 0),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to load clubs"
    : null;

  // Prefetch club details on hover
  const handleClubHover = (clubId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["admin-club-details", clubId],
      queryFn: async () => {
        const { fetchAdminClubFullDetails } = await import("@/lib/admin");
        return fetchAdminClubFullDetails(clubId, 50, 0);
      },
      staleTime: 30_000, // 30 seconds
    });
  };

  const handleDeactivate = async () => {
    if (!selectedClub) return;

    setActionLoading(`deactivate-${selectedClub.id}`);
    try {
      const { error: rpcError } = await supabase.rpc("deactivate_club", {
        p_club_id: selectedClub.id,
      });

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to deactivate club");
      }

      addToast({
        title: "Club deactivated",
        description: `${selectedClub.name} has been deactivated.`,
        variant: "success",
      });

      setDeactivateModalOpen(false);
      setSelectedClub(null);
      // Invalidate and refetch clubs list
      queryClient.invalidateQueries({ queryKey: ["admin-clubs-list"] });
    } catch (err) {
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to deactivate club. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReactivate = async () => {
    if (!selectedClub) return;

    setActionLoading(`reactivate-${selectedClub.id}`);
    try {
      const { error: rpcError } = await supabase.rpc("reactivate_club", {
        p_club_id: selectedClub.id,
      });

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to reactivate club");
      }

      addToast({
        title: "Club reactivated",
        description: `${selectedClub.name} has been reactivated.`,
        variant: "success",
      });

      setReactivateModalOpen(false);
      setSelectedClub(null);
      // Invalidate and refetch clubs list
      queryClient.invalidateQueries({ queryKey: ["admin-clubs-list"] });
    } catch (err) {
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to reactivate club. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleHardDelete = async () => {
    if (!selectedClub) return;

    setActionLoading(`delete-${selectedClub.id}`);
    try {
      const { error: rpcError } = await supabase.rpc("hard_delete_club", {
        p_club_id: selectedClub.id,
      });

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to delete club");
      }

      addToast({
        title: "Club deleted",
        description: `${selectedClub.name} has been permanently deleted.`,
        variant: "success",
      });

      setDeleteModalOpen(false);
      setSelectedClub(null);
      setDeleteDropdownOpen(null);

      // Invalidate and refetch clubs list
      queryClient.invalidateQueries({ queryKey: ["admin-clubs-list"] });
    } catch (err) {
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to delete club. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const openDeactivateModal = (club: AdminClub) => {
    setSelectedClub(club);
    setDeactivateModalOpen(true);
  };

  const openReactivateModal = (club: AdminClub) => {
    setSelectedClub(club);
    setReactivateModalOpen(true);
  };

  const openDeleteModal = (club: AdminClub) => {
    setSelectedClub(club);
    setDeleteModalOpen(true);
    setDeleteDropdownOpen(null);
  };

  const openDetailsDialog = (club: AdminClub) => {
    setSelectedClub(club);
    setDetailsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border/50 p-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Existing Clubs
        </h2>
        <p className="text-sm text-muted-foreground">Loading clubs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border/50 p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Existing Clubs
        </h2>
        <div className="p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm mb-4">
          {error}
        </div>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["admin-clubs-list"] })
          }
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-xl shadow-sm">
        <div className="p-6 border-b border-border/30">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">
              Existing Clubs ({clubs.length})
            </h2>
            <button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["admin-clubs-list"] })
              }
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {clubs.length === 0 ? (
          <div className="p-8">
            <p className="text-sm text-muted-foreground">
              No clubs found. Create your first club above!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {clubs.map((club) => {
              const isDeactivating =
                actionLoading === `deactivate-${club.id}`;
              const isReactivating = actionLoading === `reactivate-${club.id}`;
              const isDeleting = actionLoading === `delete-${club.id}`;
              const isLoading = isDeactivating || isReactivating || isDeleting;
              const isDropdownOpen = deleteDropdownOpen === club.id;

              return (
                <div
                  key={club.id}
                  className="p-6 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => openDetailsDialog(club)}
                  onMouseEnter={() => handleClubHover(club.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      {club.logo_url ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted/20">
                          <Image
                            src={club.logo_url}
                            alt={`${club.name} logo`}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Name and Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {club.name}
                        </h3>
                        <Badge
                          variant={club.is_active ? "default" : "secondary"}
                          className={
                            club.is_active
                              ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                              : ""
                          }
                        >
                          {club.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {club.slug && (
                        <p className="text-xs text-muted-foreground">
                          /{club.slug}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div
                      className="flex-shrink-0 flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetailsDialog(club)}
                        disabled={isLoading}
                      >
                        View
                      </Button>
                      {club.is_active ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeactivateModal(club)}
                          disabled={isLoading}
                          className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          {isDeactivating ? "Deactivating..." : "Deactivate"}
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => openReactivateModal(club)}
                          disabled={isLoading}
                        >
                          {isReactivating ? "Reactivating..." : "Reactivate"}
                        </Button>
                      )}

                      {/* Danger Zone Dropdown */}
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setDeleteDropdownOpen(
                              isDropdownOpen ? null : club.id
                            )
                          }
                          disabled={isLoading}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </Button>

                        {isDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setDeleteDropdownOpen(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 z-20 w-48 bg-background border border-border rounded-lg shadow-lg p-1">
                              <button
                                onClick={() => openDeleteModal(club)}
                                disabled={isLoading}
                                className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isDeleting
                                  ? "Deleting..."
                                  : "Hard Delete"}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <DeactivateModal
        club={selectedClub}
        open={deactivateModalOpen}
        onOpenChange={setDeactivateModalOpen}
        onConfirm={handleDeactivate}
        isLoading={
          !!(selectedClub && actionLoading === `deactivate-${selectedClub.id}`)
        }
      />

      <ReactivateModal
        club={selectedClub}
        open={reactivateModalOpen}
        onOpenChange={setReactivateModalOpen}
        onConfirm={handleReactivate}
        isLoading={
          !!(selectedClub && actionLoading === `reactivate-${selectedClub.id}`)
        }
      />

      <HardDeleteModal
        club={selectedClub}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleHardDelete}
        isLoading={
          !!(selectedClub && actionLoading === `delete-${selectedClub.id}`)
        }
      />

      <ClubDetailsDialog
        club={selectedClub}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </>
  );
}

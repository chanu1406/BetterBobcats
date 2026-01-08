"use client";

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Club } from "@/types/club";

export interface ClubsListRef {
  refresh: () => void;
}

/**
 * Component to display a list of all clubs
 */
const ClubsList = forwardRef<ClubsListRef>((props, ref) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setIsLoading(true);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/clubs/`);

      if (!response.ok) {
        throw new Error("Failed to fetch clubs");
      }

      const data = await response.json();
      setClubs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load clubs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (clubId: string, clubName: string) => {
    if (!confirm(`Are you sure you want to delete "${clubName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(clubId);
      setError(null);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Club not found");
        }
        throw new Error("Failed to delete club");
      }

      // Refresh the list after successful deletion
      await fetchClubs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete club");
    } finally {
      setDeletingId(null);
    }
  };

  // Expose refresh function to parent components
  useImperativeHandle(ref, () => ({
    refresh: fetchClubs,
  }));

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
          onClick={fetchClubs}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-sm">
      <div className="p-6 border-b border-border/30">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground">
            Existing Clubs ({clubs.length})
          </h2>
          <button
            onClick={fetchClubs}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {clubs.length === 0 ? (
        <div className="p-8">
          <p className="text-sm text-muted-foreground">No clubs found. Create your first club above!</p>
        </div>
      ) : (
        <div className="divide-y divide-border/30">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="p-6 hover:bg-muted/20 transition-colors flex items-center gap-4"
            >
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
                    <span className="text-xs text-muted-foreground">—</span>
                  </div>
                )}
              </div>

              {/* Name and Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-medium text-foreground truncate">{club.name}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      club.is_active
                        ? "bg-green-500/10 text-green-700 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {club.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                {club.slug && (
                  <p className="text-xs text-muted-foreground">/{club.slug}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <Link
                  href={`/admin/clubs/edit/${club.id}`}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  title={`Edit ${club.name}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(club.id, club.name)}
                  disabled={deletingId === club.id}
                  className="px-3 py-1.5 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title={`Delete ${club.name}`}
                >
                  {deletingId === club.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ClubsList.displayName = "ClubsList";

export default ClubsList;


"use client";

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import Link from "next/link";
import type { Major } from "@/types/major";

export interface MajorsListRef {
  refresh: () => void;
}

/**
 * Component to display a list of all majors
 */
const MajorsList = forwardRef<MajorsListRef>((props, ref) => {
  const [majors, setMajors] = useState<Major[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMajors();
  }, []);

  const fetchMajors = async () => {
    try {
      setIsLoading(true);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/majors/`);

      if (!response.ok) {
        throw new Error("Failed to fetch majors");
      }

      const data = await response.json();
      setMajors(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load majors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (majorId: string, majorName: string) => {
    if (!confirm(`Are you sure you want to delete "${majorName}"? This action cannot be undone. If this major is associated with any clubs, the deletion will fail.`)) {
      return;
    }

    try {
      setDeletingId(majorId);
      setError(null);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/majors/${majorId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Major not found");
        }
        if (response.status === 400) {
          const errorData = await response.json().catch(() => ({ detail: "Cannot delete major" }));
          throw new Error(errorData.detail || "Cannot delete major: It is associated with clubs");
        }
        throw new Error("Failed to delete major");
      }

      // Refresh the list after successful deletion
      await fetchMajors();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete major");
    } finally {
      setDeletingId(null);
    }
  };

  // Expose refresh function to parent components
  useImperativeHandle(ref, () => ({
    refresh: fetchMajors,
  }));

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border/50 p-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Existing Majors
        </h2>
        <p className="text-sm text-muted-foreground">Loading majors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border/50 p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Existing Majors
        </h2>
        <div className="p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm mb-4">
          {error}
        </div>
        <button
          onClick={fetchMajors}
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
            Existing Majors ({majors.length})
          </h2>
          <button
            onClick={fetchMajors}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {majors.length === 0 ? (
        <div className="p-8">
          <p className="text-sm text-muted-foreground">No majors found. Create your first major above!</p>
        </div>
      ) : (
        <div className="divide-y divide-border/30">
          {majors.map((major) => (
            <div
              key={major.id}
              className="p-6 hover:bg-muted/20 transition-colors flex items-center justify-between gap-4"
            >
              {/* Name */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{major.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Created {new Date(major.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <Link
                  href={`/admin/majors/edit/${major.id}`}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  title={`Edit ${major.name}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(major.id, major.name)}
                  disabled={deletingId === major.id}
                  className="px-3 py-1.5 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title={`Delete ${major.name}`}
                >
                  {deletingId === major.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

MajorsList.displayName = "MajorsList";

export default MajorsList;



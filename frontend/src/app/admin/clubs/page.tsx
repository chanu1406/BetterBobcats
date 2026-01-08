"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddClubForm from "./components/AddClubForm";
import ClubsList, { ClubsListRef } from "./components/ClubsList";
import { checkAuthAction } from "../actions";

/**
 * Clubs Management Dashboard
 * Protected route - requires authentication
 * Redirects to login if not authenticated
 */
export default function ClubsManagementPage() {
  const router = useRouter();
  const clubsListRef = useRef<ClubsListRef>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await checkAuthAction();
      setIsAuthenticated(auth);
      if (!auth) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleClubCreated = () => {
    // Refresh the clubs list immediately after club is created
    clubsListRef.current?.refresh();
  };

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect (handled by useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Manage Clubs
            </h1>
            <p className="text-muted-foreground text-base">
              Create and manage student organizations
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Add Club Form */}
        <div className="mb-12">
          <AddClubForm onClubCreated={handleClubCreated} />
        </div>

        {/* Existing Clubs List */}
        <div>
          <ClubsList ref={clubsListRef} />
        </div>
      </div>
    </div>
  );
}


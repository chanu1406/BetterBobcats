"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddMajorForm from "./components/AddMajorForm";
import MajorsList, { MajorsListRef } from "./components/MajorsList";
import { checkAuthAction } from "../actions";

/**
 * Majors Management Dashboard
 * Protected route - requires authentication
 * Redirects to login if not authenticated
 */
export default function MajorsManagementPage() {
  const router = useRouter();
  const majorsListRef = useRef<MajorsListRef>(null);
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

  const handleMajorCreated = () => {
    // Refresh the majors list immediately after major is created
    majorsListRef.current?.refresh();
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
              Manage Majors
            </h1>
            <p className="text-muted-foreground text-base">
              Create and manage academic majors and degree programs
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Add Major Form */}
        <div className="mb-12">
          <AddMajorForm onMajorCreated={handleMajorCreated} />
        </div>

        {/* Existing Majors List */}
        <div>
          <MajorsList ref={majorsListRef} />
        </div>
      </div>
    </div>
  );
}



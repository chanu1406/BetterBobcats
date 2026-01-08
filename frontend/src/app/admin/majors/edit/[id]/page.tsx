"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import EditMajorForm from "../../components/EditMajorForm";
import { checkAuthAction } from "../../../actions";

/**
 * Edit Major Page
 * Protected route - requires authentication
 * Redirects to login if not authenticated
 */
export default function EditMajorPage() {
  const router = useRouter();
  const params = useParams();
  const majorId = params.id as string;
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

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect (handled by useEffect)
  if (!isAuthenticated || !majorId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Edit Major
            </h1>
            <p className="text-muted-foreground text-base">
              Update major information
            </p>
          </div>
          <Link
            href="/admin/majors"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Majors
          </Link>
        </div>

        {/* Edit Major Form */}
        <div>
          <EditMajorForm majorId={majorId} />
        </div>
      </div>
    </div>
  );
}



"use client";

import { useRef } from "react";
import Link from "next/link";
import AddMajorForm from "./components/AddMajorForm";
import MajorsList, { MajorsListRef } from "./components/MajorsList";

/**
 * Majors Management Dashboard
 * Protected by admin layout (requirePlatformAdmin)
 */
export default function MajorsManagementPage() {
  const majorsListRef = useRef<MajorsListRef>(null);

  const handleMajorCreated = () => {
    // Refresh the majors list immediately after major is created
    majorsListRef.current?.refresh();
  };

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



"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import EditMajorForm from "../../components/EditMajorForm";

/**
 * Edit Major Page
 * Protected by admin layout (requirePlatformAdmin)
 */
export default function EditMajorPage() {
  const params = useParams();
  const majorId = params.id as string;

  if (!majorId) {
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



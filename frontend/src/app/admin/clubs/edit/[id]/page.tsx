"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import EditClubForm from "../../components/EditClubForm";

/**
 * Edit Club Page
 * Protected by admin layout (requirePlatformAdmin)
 */
export default function EditClubPage() {
  const params = useParams();
  const clubId = params.id as string;

  if (!clubId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Edit Club
            </h1>
            <p className="text-muted-foreground text-base">
              Update club information and settings
            </p>
          </div>
          <Link
            href="/admin/clubs"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Clubs
          </Link>
        </div>

        {/* Edit Club Form */}
        <div>
          <EditClubForm clubId={clubId} />
        </div>
      </div>
    </div>
  );
}



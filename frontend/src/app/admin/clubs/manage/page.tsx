import Link from "next/link";
import ClubsList from "../components/ClubsList";

export const metadata = {
  title: "Manage Clubs - Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Clubs Management Dashboard
 * Protected by admin layout (requirePlatformAdmin)
 */
export default async function ClubsManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Manage Clubs
            </h1>
            <p className="text-muted-foreground text-base">
              View and manage all student organizations
            </p>
          </div>
          <Link
            href="/admin/clubs"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Clubs Hub
          </Link>
        </div>

        {/* Existing Clubs List */}
        <div>
          <ClubsList />
        </div>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import Link from "next/link";
import { checkAuthAction } from "../actions";
import AddClubForm from "./components/AddClubForm";
import ClubsList from "./components/ClubsList";

export const metadata = {
  title: "Manage Clubs - Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Clubs Management Dashboard
 * Protected route - requires authentication
 * Redirects to login if not authenticated
 */
export default async function ClubsManagementPage() {
  // Check authentication using server action
  const isAuthenticated = await checkAuthAction();
  
  if (!isAuthenticated) {
    redirect("/admin/login");
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
          <AddClubForm />
        </div>

        {/* Existing Clubs List */}
        <div>
          <ClubsList />
        </div>
      </div>
    </div>
  );
}


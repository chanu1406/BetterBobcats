import Link from "next/link";
import { requirePlatformAdmin } from "@/lib/auth/guards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CleanupRejectedRequests from "./components/CleanupRejectedRequests";

export const metadata = {
  title: "Maintenance - Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Maintenance Page
 * Protected by admin layout (requirePlatformAdmin)
 * Provides maintenance tools for platform administrators
 */
export default async function MaintenancePage() {
  // Enforce platform admin access
  await requirePlatformAdmin();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Maintenance
            </h1>
            <p className="text-muted-foreground text-base">
              Platform maintenance and cleanup tools
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Cleanup Rejected Requests Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cleanup Rejected Requests</CardTitle>
            <CardDescription>
              Review and permanently delete old rejected club requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CleanupRejectedRequests />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

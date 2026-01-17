import Link from "next/link";
import { requirePlatformAdmin } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Clubs - Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Clubs Hub Page
 * Protected by admin layout (requirePlatformAdmin)
 * Landing page for club management with links to requests and manage pages
 */
export default async function ClubsHubPage() {
  // Enforce platform admin access
  await requirePlatformAdmin();

  // Create Supabase client
  const supabase = await createClient();

  // Fetch pending requests count
  const { count: pendingCount, error: pendingError } = await supabase
    .from("club_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  // Fetch active clubs count
  const { count: clubsCount, error: clubsError } = await supabase
    .from("clubs")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  // Handle errors gracefully
  const pendingCountDisplay = pendingError ? 0 : pendingCount ?? 0;
  const clubsCountDisplay = clubsError ? 0 : clubsCount ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Clubs
            </h1>
            <p className="text-muted-foreground text-base">
              Manage club requests and published clubs
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Review Requests Card */}
          <Card className="border-2 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Review Requests</CardTitle>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {pendingCountDisplay} pending
                </Badge>
              </div>
              <CardDescription className="text-base mt-2">
                Approve or reject clubs submitted to BetterBobcats.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/club-requests">
                <Button className="w-full" size="lg">
                  View Requests
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Manage Clubs Card */}
          <Card className="border-2 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Manage Clubs</CardTitle>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {clubsCountDisplay} active
                </Badge>
              </div>
              <CardDescription className="text-base mt-2">
                Edit published club profiles and content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/clubs/manage">
                <Button className="w-full" size="lg">
                  Manage Clubs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

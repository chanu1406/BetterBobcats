import { requireUser } from "@/lib/auth/guards";
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
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Club Dashboard Page
 * Dynamic route: /dashboard/[slug]
 * Shows club-specific dashboard for authenticated members
 */
export default async function ClubDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Enforce authentication
  const user = await requireUser(`/dashboard/${slug}`);

  const supabase = await createClient();

  // Fetch club by slug
  const { data: clubData, error: clubError } = await supabase
    .from("clubs")
    .select("id, name, slug, logo_url, description, is_active")
    .eq("slug", slug)
    .single();

  if (clubError || !clubData) {
    notFound();
  }

  // Fetch user's membership for this club
  const { data: membershipData, error: membershipError } = await supabase
    .from("club_memberships")
    .select("role")
    .eq("club_id", clubData.id)
    .eq("user_id", user.id)
    .single();

  if (membershipError || !membershipData) {
    // User is not a member of this club
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You are not a member of this club.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You need to be a member of this club to access its dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Check if club is deactivated
  const isDeactivated = !clubData.is_active;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {clubData.logo_url ? (
              <img
                src={clubData.logo_url}
                alt={clubData.name || "Club logo"}
                className="w-16 h-16 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-muted border flex items-center justify-center text-2xl font-semibold text-muted-foreground">
                {clubData.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div>
              <h1 className="text-5xl font-semibold text-foreground mb-2">
                {clubData.name}
              </h1>
              <Badge variant="secondary" className="capitalize">
                {membershipData.role}
              </Badge>
            </div>
          </div>
          {clubData.description && (
            <p className="text-muted-foreground text-base">
              {clubData.description}
            </p>
          )}
        </div>

        {/* Deactivation Banner */}
        {isDeactivated && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Club Deactivated</AlertTitle>
            <AlertDescription className="mt-2">
              This club has been deactivated. Contact BetterBobcats platform
              admins to get reactivated.
            </AlertDescription>
            <div className="mt-4">
              <Link href="/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </Alert>
        )}

        {/* Placeholder Sections - Hidden if deactivated */}
        {!isDeactivated && (
          <div className="space-y-6">
            {/* Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Club profile and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Profile management coming soon.
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Events Section */}
            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
                <CardDescription>Manage club events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Event management coming soon.
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Members Section */}
            <Card>
              <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>View and manage club members</CardDescription>
              </CardHeader>
              <CardContent>
                {membershipData.role === "admin" ? (
                  <Link href={`/dashboard/${slug}/members`}>
                    <Button>Manage Members</Button>
                  </Link>
                ) : (
                  <p className="text-muted-foreground">
                    Only club admins can manage members.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

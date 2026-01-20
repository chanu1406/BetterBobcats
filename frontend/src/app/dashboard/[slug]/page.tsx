import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-foreground mb-2">
          Overview
        </h1>
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

      {/* Overview Sections - Hidden if deactivated */}
      {!isDeactivated && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Section */}
          {(membershipData.role === "admin" || membershipData.role === "officer") && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Club profile and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your club's profile information, settings, and branding.
                </p>
                <Link href={`/dashboard/${slug}/profile`}>
                  <Button variant="outline" className="w-full">
                    Manage Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Events Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Manage club events</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create, edit, and manage club events and gatherings.
              </p>
              {(membershipData.role === "admin" || membershipData.role === "officer") ? (
                <Link href={`/dashboard/${slug}/events`}>
                  <Button className="w-full">Manage Events</Button>
                </Link>
              ) : (
                <Link href={`/dashboard/${slug}/events`}>
                  <Button variant="outline" className="w-full">
                    View Events
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Members Section */}
          {membershipData.role === "admin" && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>View and manage club members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage member roles, invitations, and club membership.
                </p>
                <Link href={`/dashboard/${slug}/members`}>
                  <Button className="w-full">Manage Members</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
}

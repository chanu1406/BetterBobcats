import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Profile - Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Club Profile Management Page
 * Dynamic route: /dashboard/[slug]/profile
 * Only accessible to club admins and officers
 */
export default async function ClubProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Enforce authentication
  const user = await requireUser(`/dashboard/${slug}/profile`);

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
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not Authorized</CardTitle>
          <CardDescription>
            You are not a member of this club.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You need to be a member of this club to access its profile page.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Check if user is club admin or officer
  const isOfficerOrAdmin = membershipData.role === "admin" || membershipData.role === "officer";

  if (!isOfficerOrAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            Only club admins and officers can manage the club profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You need to be a club admin or officer to access profile management.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isDeactivated = !clubData.is_active;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-foreground mb-2">
          Profile
        </h1>
        <p className="text-muted-foreground text-base">
          Manage your club's profile and settings
        </p>
      </div>

      {/* Deactivation Banner */}
      {isDeactivated && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Club Deactivated</AlertTitle>
          <AlertDescription className="mt-2">
            This club has been deactivated. Contact BetterBobcats platform
            admins to get reactivated.
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Management */}
      {!isDeactivated && (
        <Card>
          <CardHeader>
            <CardTitle>Club Profile</CardTitle>
            <CardDescription>
              Manage your club's profile information, logo, and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Profile management features coming soon. You'll be able to update
              your club's name, description, logo, and other settings here.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

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
import Link from "next/link";
import MembersTable from "./components/MembersTable";

export const metadata = {
  title: "Members - Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Club Members Management Page
 * Dynamic route: /dashboard/[slug]/members
 * Only accessible to club admins
 */
export default async function ClubMembersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Enforce authentication
  const user = await requireUser(`/dashboard/${slug}/members`);

  const supabase = await createClient();

  // Fetch club by slug
  const { data: clubData, error: clubError } = await supabase
    .from("clubs")
    .select("id, name, slug, is_active")
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
              <CardTitle>Not Authorized</CardTitle>
              <CardDescription>
                You are not a member of this club.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You need to be a member of this club to access its members page.
              </p>
              <Link href="/dashboard">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Back to Dashboard
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Check if user is club admin
  if (membershipData.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                Only club admins can manage members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You need to be a club admin to access member management.
              </p>
              <Link href={`/dashboard/${slug}`}>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Back to Club Dashboard
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isDeactivated = !clubData.is_active;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-semibold text-foreground mb-2">
                Members
              </h1>
              <p className="text-muted-foreground text-base">
                Manage members for {clubData.name}
              </p>
            </div>
            <Link href={`/dashboard/${slug}`}>
              <button className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors">
                ← Back to Dashboard
              </button>
            </Link>
          </div>
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

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Club Members</CardTitle>
            <CardDescription>
              View and manage club members. You can change roles or remove
              members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MembersTable
              clubId={clubData.id}
              clubSlug={clubData.slug}
              isDeactivated={isDeactivated}
              currentUserId={user.id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

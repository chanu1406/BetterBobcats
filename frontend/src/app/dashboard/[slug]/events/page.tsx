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
import { Button } from "@/components/ui/button";
import EventsList from "./components/EventsList";

export const metadata = {
  title: "Events - Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Club Events Management Page
 * Dynamic route: /dashboard/[slug]/events
 * Only accessible to club admins and officers
 */
export default async function ClubEventsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Enforce authentication
  const user = await requireUser(`/dashboard/${slug}/events`);

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

  // Parallelize membership and events queries for better performance
  const [membershipResult, eventsResult] = await Promise.all([
    // Fetch user's membership for this club
    supabase
      .from("club_memberships")
      .select("role")
      .eq("club_id", clubData.id)
      .eq("user_id", user.id)
      .single(),
    // Fetch events for this club (admins/officers can see all statuses)
    // Limit to most recent 50 events for performance
    supabase
      .from("events")
      .select(
        `
        id,
        title,
        description,
        starts_at,
        ends_at,
        location_name,
        location_type,
        online_url,
        visibility,
        status,
        banner_url,
        thumbnail_url,
        created_at,
        updated_at
      `
      )
      .eq("club_id", clubData.id)
      .order("starts_at", { ascending: true })
      .limit(50),
  ]);

  const { data: membershipData, error: membershipError } = membershipResult;

  if (membershipError || !membershipData) {
    // User is not a member of this club
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not Authorized</CardTitle>
          <CardDescription>
            You are not a member of this club.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You need to be a member of this club to access its events page.
          </p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
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
            Only club admins and officers can manage events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You need to be a club admin or officer to access event management.
          </p>
          <Link href={`/dashboard/${slug}`}>
            <Button variant="outline">Back to Club Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const isDeactivated = !clubData.is_active;
  const { data: eventsData, error: eventsError } = eventsResult;
  const events = eventsData || [];

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-semibold text-foreground mb-2">
              Events
            </h1>
            <p className="text-muted-foreground text-base">
              Create and manage your club's events
            </p>
          </div>
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

      {/* Events Management */}
      {!isDeactivated && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Club Events</CardTitle>
                <CardDescription>
                  View, create, and manage your club's events
                </CardDescription>
              </div>
              <Link href={`/dashboard/${slug}/events/new`}>
                <Button>Create Event</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <EventsList
              events={events}
              clubId={clubData.id}
              clubSlug={clubData.slug}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}

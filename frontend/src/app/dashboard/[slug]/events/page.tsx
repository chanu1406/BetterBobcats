import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ClubEventsClient from "./page-client";

export const metadata = {
  title: "Events - Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Club Events Management Page (Server Component)
 * Dynamic route: /dashboard/[slug]/events
 * Handles authentication and authorization, passes data to client component
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

  // Fetch user's membership for this club
  const { data: membershipData, error: membershipError } = await supabase
    .from("club_memberships")
    .select("role")
    .eq("club_id", clubData.id)
    .eq("user_id", user.id)
    .single();

  const isDeactivated = !clubData.is_active;

  if (membershipError || !membershipData) {
    // User is not a member - client component will handle this
    return (
      <ClubEventsClient
        clubId={clubData.id}
        clubSlug={clubData.slug}
        initialUserRole=""
        isDeactivated={isDeactivated}
      />
    );
  }

  // Check if user is club admin or officer
  const isOfficerOrAdmin =
    membershipData.role === "admin" || membershipData.role === "officer";

  if (!isOfficerOrAdmin) {
    // Client component will handle access denied UI
    return (
      <ClubEventsClient
        clubId={clubData.id}
        clubSlug={clubData.slug}
        initialUserRole={membershipData.role}
        isDeactivated={isDeactivated}
      />
    );
  }

  return (
    <ClubEventsClient
      clubId={clubData.id}
      clubSlug={clubData.slug}
      initialUserRole={membershipData.role}
      isDeactivated={isDeactivated}
    />
  );
}

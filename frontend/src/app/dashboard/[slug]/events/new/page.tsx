import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CreateEventForm from "./components/CreateEventForm";
import type { Major } from "@/types/major";
import { fetchEventRequest } from "@/lib/event-requests";

export const metadata = {
  title: "Create Event - Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Create Event Page
 * Dynamic route: /dashboard/[slug]/events/new
 * Only accessible to club admins and officers
 */
export default async function CreateEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ fulfill?: string }>;
}) {
  const { slug } = await params;
  const { fulfill } = await searchParams;

  // Enforce authentication
  const user = await requireUser(`/dashboard/${slug}/events/new`);

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
    notFound();
  }

  // Check if user is club admin or officer
  const isOfficerOrAdmin = membershipData.role === "admin" || membershipData.role === "officer";

  if (!isOfficerOrAdmin) {
    notFound();
  }

  // Fetch majors for the form
  const { data: majorsData, error: majorsError } = await supabase
    .from("majors")
    .select("id, name, created_at")
    .order("name", { ascending: true });

  const majors: Major[] = majorsData || [];

  // Fetch request if fulfilling
  let requestData = null;
  if (fulfill) {
    requestData = await fetchEventRequest(fulfill);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <CreateEventForm
          clubId={clubData.id}
          clubSlug={clubData.slug}
          majors={majors}
          fulfillRequestId={fulfill || undefined}
          requestData={requestData || undefined}
        />
      </div>
    </div>
  );
}

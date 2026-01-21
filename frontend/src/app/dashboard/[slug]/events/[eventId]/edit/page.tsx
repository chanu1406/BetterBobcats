import { requireUser } from "@/lib/auth/guards";
import { createClient, createPublicClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import EditEventForm from "./components/EditEventForm";
import { PastEventErrorDialog } from "./components/PastEventErrorDialog";
import type { Major } from "@/types/major";

/**
 * Fetch majors list with caching (majors rarely change)
 * Uses public client without cookies to avoid Next.js cache restrictions
 */
const getCachedMajors = unstable_cache(
  async (): Promise<Major[]> => {
    const supabase = createPublicClient();
    const { data: majorsData, error: majorsError } = await supabase
      .from("majors")
      .select("id, name, created_at")
      .order("name", { ascending: true });

    if (majorsError) {
      console.error("Error fetching majors:", majorsError);
      return [];
    }

    return majorsData || [];
  },
  ["majors-list"], // cache key
  { revalidate: 3600 } // 1 hour - majors rarely change
);

export const metadata = {
  title: "Edit Event - Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Edit Event Page
 * Dynamic route: /dashboard/[slug]/events/[eventId]/edit
 * Only accessible to club admins and officers
 * Cannot edit events that have passed
 */
export default async function EditEventPage({
  params,
}: {
  params: Promise<{ slug: string; eventId: string }>;
}) {
  const { slug, eventId } = await params;

  // Enforce authentication
  const user = await requireUser(`/dashboard/${slug}/events/${eventId}/edit`);

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

  // Fetch user's membership and event in parallel
  const [membershipResult, eventResult] = await Promise.all([
    supabase
      .from("club_memberships")
      .select("role")
      .eq("club_id", clubData.id)
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("events")
      .select(
        `
        id,
        club_id,
        title,
        description,
        starts_at,
        ends_at,
        timezone,
        location_type,
        location_name,
        location_address,
        online_url,
        visibility,
        status,
        banner_url,
        thumbnail_url,
        is_all_majors,
        capacity,
        requires_rsvp,
        rsvp_url,
        is_featured,
        contact_email
      `
      )
      .eq("id", eventId)
      .eq("club_id", clubData.id)
      .single(),
  ]);

  const { data: membershipData, error: membershipError } = membershipResult;
  const { data: eventData, error: eventError } = eventResult;

  if (membershipError || !membershipData) {
    notFound();
  }

  // Check if user is club admin or officer
  const isOfficerOrAdmin = membershipData.role === "admin" || membershipData.role === "officer";

  if (!isOfficerOrAdmin) {
    notFound();
  }

  if (eventError || !eventData) {
    notFound();
  }

  // Check if event has passed (cannot edit past events)
  const eventEndTime = eventData.ends_at
    ? new Date(eventData.ends_at)
    : new Date(eventData.starts_at);
  const now = new Date();
  const hasPassed = eventEndTime < now;

  if (hasPassed) {
    return (
      <div className="min-h-screen bg-background">
        <PastEventErrorDialog clubSlug={slug} />
      </div>
    );
  }

  // Fetch event majors, event tags, and majors list in parallel
  const [majorsResult, tagsResult, majors] = await Promise.all([
    supabase
      .from("event_majors")
      .select("major_id")
      .eq("event_id", eventId),
    supabase
      .from("event_tags")
      .select("tag")
      .eq("event_id", eventId),
    getCachedMajors(), // Use cached majors
  ]);

  const eventMajorIds = majorsResult.data?.map((m) => m.major_id) || [];
  const eventTags = tagsResult.data?.map((t) => t.tag) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <EditEventForm
          eventId={eventId}
          clubId={clubData.id}
          clubSlug={clubData.slug}
          initialData={{
            title: eventData.title,
            description: eventData.description || "",
            starts_at: eventData.starts_at,
            ends_at: eventData.ends_at,
            timezone: eventData.timezone,
            location_type: eventData.location_type,
            location_name: eventData.location_name || "",
            location_address: eventData.location_address || "",
            online_url: eventData.online_url || "",
            visibility: eventData.visibility,
            status: eventData.status,
            banner_url: eventData.banner_url,
            thumbnail_url: eventData.thumbnail_url,
            is_all_majors: eventData.is_all_majors,
            major_ids: eventMajorIds,
            tags: eventTags,
            capacity: eventData.capacity?.toString() || "",
            requires_rsvp: eventData.requires_rsvp,
            rsvp_url: eventData.rsvp_url || "",
            is_featured: eventData.is_featured,
            contact_email: eventData.contact_email || "",
          }}
          majors={majors}
        />
      </div>
    </div>
  );
}

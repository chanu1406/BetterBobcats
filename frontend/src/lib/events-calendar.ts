import { createClient } from "@/lib/supabase/browser";
import type { CalendarEvent, EventFilters } from "@/types/event";

const supabase = createClient();

/**
 * Fetch events for calendar using RPC function with server-side filtering
 */
export async function fetchEventsForRange(
  startDate: Date,
  endDate: Date,
  filters?: EventFilters & { searchQuery?: string }
): Promise<CalendarEvent[]> {
  const { data, error } = await supabase.rpc("get_events_for_range", {
    p_start_date: startDate.toISOString(),
    p_end_date: endDate.toISOString(),
    p_major_ids: filters?.majors && filters.majors.length > 0 ? filters.majors : null,
    p_tags: filters?.tags && filters.tags.length > 0 ? filters.tags : null,
    p_club_ids: filters?.clubs && filters.clubs.length > 0 ? filters.clubs : null,
    p_location_types:
      filters?.locationTypes && filters.locationTypes.length > 0
        ? filters.locationTypes
        : null,
    p_search_query: filters?.searchQuery || null,
  });

  if (error) {
    console.error("Error fetching events:", error);
    throw error;
  }

  if (!data || !Array.isArray(data)) {
    return [];
  }

  // Filter out cancelled events if hideCancelled is true
  let events = data as CalendarEvent[];

  if (filters?.hideCancelled) {
    events = events.filter((e) => e.status !== "cancelled");
  }

  // Apply time of day filter (client-side as it's time-based)
  if (filters?.timeOfDay && filters.timeOfDay.length > 0) {
    events = events.filter((event) => {
      const eventStart = new Date(event.starts_at);
      const hour = eventStart.getHours();
      let timeCategory: "morning" | "afternoon" | "evening" | null = null;

      if (hour >= 5 && hour < 12) {
        timeCategory = "morning";
      } else if (hour >= 12 && hour < 17) {
        timeCategory = "afternoon";
      } else if (hour >= 17 || hour < 5) {
        timeCategory = "evening";
      }

      return timeCategory && filters.timeOfDay.includes(timeCategory);
    });
  }

  return events;
}

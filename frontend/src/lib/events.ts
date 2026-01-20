/**
 * Client-side helpers for fetching events
 */

import { supabase } from "@/lib/supabase";
import type { CalendarEvent } from "@/types/event";

/**
 * Fetch public events for a date range (for global calendar)
 * Uses RLS to only return published public events
 */
export async function fetchPublicEvents(
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> {
  try {
    // Query events directly - RLS will filter to only published public events
    const { data: eventsData, error: eventsError } = await supabase
      .from("events")
      .select(`
        id,
        club_id,
        clubs!inner(name),
        title,
        description,
        starts_at,
        ends_at,
        location_name,
        location_address,
        location_type,
        online_url,
        visibility,
        status,
        banner_url,
        thumbnail_url,
        timezone,
        is_all_majors,
        capacity,
        requires_rsvp,
        rsvp_url,
        is_featured,
        created_at,
        updated_at,
        created_by,
        updated_by
      `)
      .eq("status", "published")
      .eq("visibility", "public")
      .gte("starts_at", startDate.toISOString())
      .lte("starts_at", endDate.toISOString())
      .order("starts_at", { ascending: true });

    if (eventsError) {
      console.error("Error fetching public events:", eventsError);
      throw eventsError;
    }

    if (!eventsData || eventsData.length === 0) {
      return [];
    }

    const eventIds = eventsData.map((e) => e.id);

    const [tagsResult, majorsResult] = await Promise.all([
      supabase
        .from("event_tags")
        .select("event_id, tag")
        .in("event_id", eventIds),
      supabase
        .from("event_majors")
        .select("event_id, major_id")
        .in("event_id", eventIds),
    ]);

    const tagsByEvent = new Map<string, string[]>();
    const majorsByEvent = new Map<string, string[]>();

    tagsResult.data?.forEach((row) => {
      if (!tagsByEvent.has(row.event_id)) {
        tagsByEvent.set(row.event_id, []);
      }
      tagsByEvent.get(row.event_id)!.push(row.tag);
    });

    majorsResult.data?.forEach((row) => {
      if (!majorsByEvent.has(row.event_id)) {
        majorsByEvent.set(row.event_id, []);
      }
      majorsByEvent.get(row.event_id)!.push(row.major_id);
    });

    // Combine event data with tags and majors
    const events: CalendarEvent[] = eventsData.map((event: any) => ({
      ...event,
      club_name: event.clubs?.name,
      tags: tagsByEvent.get(event.id) || [],
      major_ids: majorsByEvent.get(event.id) || [],
    }));

    return events;
  } catch (error) {
    console.error("Error in fetchPublicEvents:", error);
    return [];
  }
}

/**
 * Fetch events with full details (for authenticated users)
 * This respects RLS policies based on user's club memberships
 */
export async function fetchEvents(
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> {
  try {
    const { data: eventsData, error: eventsError } = await supabase
      .from("events")
      .select(`
        id,
        club_id,
        clubs!inner(name),
        title,
        description,
        starts_at,
        ends_at,
        location_name,
        location_address,
        location_type,
        online_url,
        visibility,
        status,
        banner_url,
        thumbnail_url,
        timezone,
        is_all_majors,
        capacity,
        requires_rsvp,
        rsvp_url,
        is_featured,
        created_at,
        updated_at,
        created_by,
        updated_by
      `)
      .eq("status", "published")
      .gte("starts_at", startDate.toISOString())
      .lte("starts_at", endDate.toISOString())
      .order("starts_at", { ascending: true });

    if (eventsError) {
      console.error("Error fetching events:", eventsError);
      throw eventsError;
    }

    if (!eventsData || eventsData.length === 0) {
      return [];
    }

    const eventIds = eventsData.map((e) => e.id);

    const [tagsResult, majorsResult] = await Promise.all([
      supabase
        .from("event_tags")
        .select("event_id, tag")
        .in("event_id", eventIds),
      supabase
        .from("event_majors")
        .select("event_id, major_id")
        .in("event_id", eventIds),
    ]);

    const tagsByEvent = new Map<string, string[]>();
    const majorsByEvent = new Map<string, string[]>();

    tagsResult.data?.forEach((row) => {
      if (!tagsByEvent.has(row.event_id)) {
        tagsByEvent.set(row.event_id, []);
      }
      tagsByEvent.get(row.event_id)!.push(row.tag);
    });

    majorsResult.data?.forEach((row) => {
      if (!majorsByEvent.has(row.event_id)) {
        majorsByEvent.set(row.event_id, []);
      }
      majorsByEvent.get(row.event_id)!.push(row.major_id);
    });

    const events: CalendarEvent[] = eventsData.map((event: any) => ({
      ...event,
      club_name: event.clubs?.name,
      tags: tagsByEvent.get(event.id) || [],
      major_ids: majorsByEvent.get(event.id) || [],
    }));

    return events;
  } catch (error) {
    console.error("Error in fetchEvents:", error);
    return [];
  }
}

/**
 * Get the start and end dates for a month (including padding days)
 */
export function getMonthRange(year: number, month: number): { start: Date; end: Date } {
  // Start of month (first day)
  const start = new Date(year, month, 1);
  
  // End of month (last day)
  const end = new Date(year, month + 1, 0);
  
  // Adjust to include full weeks
  // Get first day of week (0 = Sunday, 1 = Monday, etc.)
  const startDayOfWeek = start.getDay();
  const endDayOfWeek = end.getDay();
  
  // Adjust start to beginning of week (Sunday)
  const paddedStart = new Date(start);
  paddedStart.setDate(start.getDate() - startDayOfWeek);
  
  // Adjust end to end of week (Saturday)
  const paddedEnd = new Date(end);
  paddedEnd.setDate(end.getDate() + (6 - endDayOfWeek));
  
  return {
    start: paddedStart,
    end: paddedEnd,
  };
}

/**
 * Get all unique tags from events
 */
export function getUniqueTags(events: CalendarEvent[]): string[] {
  const tagsSet = new Set<string>();
  events.forEach((event) => {
    event.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Filter events based on filter criteria
 */
export function filterEvents(
  events: CalendarEvent[],
  filters: {
    majors?: string[];
    tags?: string[];
    clubs?: string[];
    locationTypes?: Array<"on_campus" | "off_campus" | "online" | "hybrid">;
    timeOfDay?: Array<"morning" | "afternoon" | "evening">;
    hideCancelled?: boolean;
    searchQuery?: string;
  }
): CalendarEvent[] {
  return events.filter((event) => {
    // Hide cancelled if requested
    if (filters.hideCancelled && event.status === "cancelled") {
      return false;
    }

    // Filter by majors
    if (filters.majors && filters.majors.length > 0) {
      if (!event.is_all_majors) {
        const hasMatchingMajor = filters.majors.some((majorId) =>
          event.major_ids.includes(majorId)
        );
        if (!hasMatchingMajor) return false;
      }
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) => event.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // Filter by clubs
    if (filters.clubs && filters.clubs.length > 0) {
      if (!filters.clubs.includes(event.club_id)) return false;
    }

    // Filter by location type
    if (filters.locationTypes && filters.locationTypes.length > 0) {
      if (!filters.locationTypes.includes(event.location_type)) return false;
    }

    // Filter by time of day
    if (filters.timeOfDay && filters.timeOfDay.length > 0) {
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

      if (!timeCategory || !filters.timeOfDay.includes(timeCategory)) {
        return false;
      }
    }

    // Filter by search query
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = event.title.toLowerCase().includes(query);
      const matchesDescription = event.description?.toLowerCase().includes(query) || false;
      const matchesClub = event.club_name?.toLowerCase().includes(query) || false;
      const matchesTags = event.tags.some((tag) => tag.toLowerCase().includes(query));
      
      if (!matchesTitle && !matchesDescription && !matchesClub && !matchesTags) {
        return false;
      }
    }

    return true;
  });
}

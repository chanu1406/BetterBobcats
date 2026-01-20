/**
 * Event TypeScript types matching database schema
 */

export interface Event {
  id: string;
  club_id: string;
  club_name?: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string | null;
  location_name: string | null;
  location_address: string | null;
  location_type: "on_campus" | "off_campus" | "online" | "hybrid";
  online_url: string | null;
  visibility: "public" | "members_only" | "unlisted";
  status: "draft" | "published" | "cancelled";
  banner_url: string | null;
  thumbnail_url: string | null;
  timezone: string | null;
  is_all_majors: boolean;
  capacity: number | null;
  requires_rsvp: boolean;
  rsvp_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface EventTag {
  event_id: string;
  tag: string;
}

export interface EventMajor {
  event_id: string;
  major_id: string;
}

/**
 * Flattened event type for calendar display (includes related data)
 */
export interface CalendarEvent extends Event {
  tags: string[];
  major_ids: string[];
  major_names?: string[];
}

/**
 * Event filter state
 */
export interface EventFilters {
  majors: string[];
  tags: string[];
  clubs: string[];
  locationTypes: Array<"on_campus" | "off_campus" | "online" | "hybrid">;
  timeOfDay: Array<"morning" | "afternoon" | "evening">;
  hideCancelled: boolean;
}

/**
 * Calendar view types
 */
export type CalendarView = "month" | "week" | "list";

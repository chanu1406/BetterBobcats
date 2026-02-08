/**
 * Event Request TypeScript types matching database schema (v2 + comments)
 */

export type EventRequestStatus =
  | "open"
  | "planned"
  | "scheduled"
  | "fulfilled"
  | "not_planned"
  | "closed";

export type EventRequestType =
  | "workshop"
  | "speaker"
  | "social"
  | "study"
  | "career"
  | "other";

export type LocationPref = "in_person" | "online" | "either";

export interface EventRequest {
  id: string;
  /** Present after v2 migration; fallback to description in UI if missing */
  title?: string;
  description: string;
  major_id: string | null;
  is_all_majors: boolean;
  status: EventRequestStatus;
  fulfilled_event_id: string | null;
  created_by: string;
  created_at: string;
  deleted_at: string | null;
  deleted_by: string | null;
  delete_reason: string | null;
  /** "Why this matters" one-liner */
  subtitle?: string | null;
  request_type?: EventRequestType;
  time_pref_days?: string[] | null;
  time_pref_windows?: ("morning" | "afternoon" | "evening")[] | null;
  location_pref?: LocationPref;
  suggested_club_id?: string | null;
  merged_into_id?: string | null;
  last_activity_at?: string | null;
  // Computed from view
  vote_count?: number;
  comment_count?: number;
  tags?: string[];
}

export interface EventRequestWithDetails extends EventRequest {
  major_name?: string | null;
  fulfilled_event?: {
    id: string;
    title: string;
    starts_at: string;
    location_name: string | null;
    location_type: string;
    club_name: string;
    club_slug: string;
  } | null;
  user_has_voted?: boolean;
}

export interface EventRequestTag {
  request_id: string;
  tag: string;
}

export interface EventRequestVote {
  request_id: string;
  user_id: string;
  created_at: string;
}

export interface EventRequestComment {
  id: string;
  request_id: string;
  user_id: string;
  body: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/** Legacy create params (description-only); prefer CreateEventRequestV2Params */
export interface CreateEventRequestParams {
  description: string;
  major_id: string | null;
  is_all_majors: boolean;
  tags: string[];
}

export interface CreateEventRequestV2Params {
  title: string;
  description?: string;
  subtitle?: string | null;
  request_type?: EventRequestType;
  major_id: string | null;
  is_all_majors: boolean;
  tags?: string[];
  time_pref_days?: string[] | null;
  time_pref_windows?: ("morning" | "afternoon" | "evening")[] | null;
  location_pref?: LocationPref;
  suggested_club_id?: string | null;
}

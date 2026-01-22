/**
 * Event Request TypeScript types matching database schema
 */

export interface EventRequest {
  id: string;
  description: string;
  major_id: string | null;
  is_all_majors: boolean;
  status: "open" | "fulfilled" | "closed";
  fulfilled_event_id: string | null;
  created_by: string;
  created_at: string;
  deleted_at: string | null;
  deleted_by: string | null;
  delete_reason: string | null;
  // Computed fields from view
  vote_count?: number;
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

export interface CreateEventRequestParams {
  description: string;
  major_id: string | null;
  is_all_majors: boolean;
  tags: string[];
}

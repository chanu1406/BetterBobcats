import { createClient } from "@/lib/supabase/browser";
import type { Club } from "@/types/club";

/**
 * Admin club data structure
 */
export interface AdminClub {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  banner_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  member_count: number;
  event_count: number;
  pending_invite_count: number;
}

/**
 * Fetch admin clubs list using RPC function
 */
export async function fetchAdminClubsList(
  limit: number = 50,
  offset: number = 0
): Promise<AdminClub[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("admin_get_clubs_list", {
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    console.error("Error fetching admin clubs list:", error);
    throw error;
  }

  return (data || []) as AdminClub[];
}

/**
 * Admin club full details structure
 */
export interface AdminClubFullDetails {
  summary: {
    club_id: string;
    name: string;
    slug: string | null;
    is_active: boolean;
    website: string | null;
    description: string | null;
    created_at: string;
    member_count: number;
    event_count: number;
    pending_invite_count: number;
  };
  members: Array<{
    email: string;
    role: string;
    created_at: string;
  }>;
  invites: Array<{
    email: string;
    role: string;
    invited_at: string;
    accepted_at: string | null;
  }>;
  tags: Array<{
    tag: string;
  }>;
  majors: Array<{
    major: string;
  }>;
}

/**
 * Fetch admin club full details using RPC function
 */
export async function fetchAdminClubFullDetails(
  clubId: string,
  membersLimit: number = 50,
  membersOffset: number = 0
): Promise<AdminClubFullDetails | null> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("admin_get_club_full_details", {
    p_club_id: clubId,
    p_members_limit: membersLimit,
    p_members_offset: membersOffset,
  });

  if (error) {
    console.error("Error fetching admin club full details:", error);
    throw error;
  }

  return data as AdminClubFullDetails | null;
}

/**
 * Admin club request details structure
 */
export interface AdminClubRequestDetails {
  id: string;
  name: string;
  description: string | null;
  contact_email: string;
  officer_emails: string[];
  slug_candidate: string | null;
  status: "pending" | "approved" | "rejected";
  admin_message: string | null;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  submitted_by: string | null;
  website: string | null;
  logo_url: string | null;
  banner_url: string | null;
  tags: string[];
  majors: Array<{
    id: string;
    name: string;
  }>;
}

/**
 * Fetch admin club request details using RPC function
 */
export async function fetchAdminClubRequestDetails(
  requestId: string
): Promise<AdminClubRequestDetails | null> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("admin_get_club_request_details", {
    p_request_id: requestId,
  });

  if (error) {
    console.error("Error fetching admin club request details:", error);
    throw error;
  }

  return data as AdminClubRequestDetails | null;
}

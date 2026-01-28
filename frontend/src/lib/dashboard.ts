import { createClient } from "@/lib/supabase/browser";
import type { MembershipWithClub } from "@/types/membership";

const supabase = createClient();

/**
 * Fetch user dashboard data (memberships with club details)
 * Uses resource embedding for optimal performance
 */
export async function fetchUserDashboardData(): Promise<MembershipWithClub[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("club_memberships")
    .select(
      "id, club_id, role, created_at, clubs:club_id (id, name, slug, logo_url, is_active)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  // Process joined data
  return data.map((membership: any) => {
    const club = membership.clubs
      ? Array.isArray(membership.clubs)
        ? membership.clubs[0]
        : membership.clubs
      : null;

    return {
      id: membership.id,
      club_id: membership.club_id,
      role: membership.role,
      created_at: membership.created_at,
      club: club
        ? {
            id: club.id,
            name: club.name,
            slug: club.slug,
            logo_url: club.logo_url,
            is_active: club.is_active,
          }
        : {
            id: membership.club_id,
            name: "Unknown Club",
            slug: null,
            logo_url: null,
            is_active: null,
          },
    };
  });
}

/**
 * Club dashboard data structure
 */
export interface ClubDashboardData {
  club: {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    description: string | null;
    is_active: boolean;
  };
  membership: {
    role: string;
    created_at: string;
  } | null;
  recent_events: Array<{
    id: string;
    title: string;
    starts_at: string;
    ends_at: string | null;
    status: string;
    visibility: string;
  }>;
  stats: {
    member_count: number;
    event_count: number;
  };
}

/**
 * Fetch club dashboard data using RPC function
 */
export async function fetchClubDashboardData(
  clubSlug: string
): Promise<ClubDashboardData | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase.rpc("get_club_dashboard_data", {
    p_club_slug: clubSlug,
    p_user_id: user.id,
  });

  if (error) {
    console.error("Error fetching club dashboard data:", error);
    throw error;
  }

  if (!data) {
    return null;
  }

  return data as ClubDashboardData;
}

/**
 * Event filter options
 */
export interface EventFilters {
  status?: "draft" | "published" | "cancelled";
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Fetch club events with optional filtering
 */
export async function fetchClubEvents(
  clubId: string,
  filters?: EventFilters,
  limit: number = 50,
  offset: number = 0
): Promise<{
  events: Array<{
    id: string;
    title: string;
    description: string | null;
    starts_at: string;
    ends_at: string | null;
    location_name: string | null;
    location_type: "on_campus" | "off_campus" | "online" | "hybrid";
    online_url: string | null;
    visibility: "public" | "members_only" | "unlisted";
    status: "draft" | "published" | "cancelled";
    banner_url: string | null;
    thumbnail_url: string | null;
    created_at: string;
    updated_at: string;
  }>;
  total: number;
}> {
  let query = supabase
    .from("events")
    .select(
      "id, title, description, starts_at, ends_at, location_name, location_type, online_url, visibility, status, banner_url, thumbnail_url, created_at, updated_at",
      { count: "exact" }
    )
    .eq("club_id", clubId)
    .order("starts_at", { ascending: true })
    .range(offset, offset + limit - 1);

  // Apply filters
  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.dateFrom) {
    query = query.gte("starts_at", filters.dateFrom);
  }
  if (filters?.dateTo) {
    query = query.lte("starts_at", filters.dateTo);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  // Type assertion: Supabase returns these as strings, but we know they match the union types
  return {
    events: (data || []) as Array<{
      id: string;
      title: string;
      description: string | null;
      starts_at: string;
      ends_at: string | null;
      location_name: string | null;
      location_type: "on_campus" | "off_campus" | "online" | "hybrid";
      online_url: string | null;
      visibility: "public" | "members_only" | "unlisted";
      status: "draft" | "published" | "cancelled";
      banner_url: string | null;
      thumbnail_url: string | null;
      created_at: string;
      updated_at: string;
    }>,
    total: count || 0,
  };
}

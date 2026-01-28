import { createClient } from "@/lib/supabase/browser";

/**
 * Club data structure for browse page
 */
export interface BrowseClub {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  slug: string | null;
  logo_url: string | null;
  is_active: boolean;
}

/**
 * Fetch clubs with filters using RPC function
 */
export async function fetchClubsWithFilters(
  majorId?: string | null,
  searchQuery?: string | null,
  limit: number = 100,
  offset: number = 0
): Promise<BrowseClub[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_clubs_with_filters", {
    p_major_id: majorId || null,
    p_search_query: searchQuery || null,
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    console.error("Error fetching clubs with filters:", error);
    throw error;
  }

  return (data || []) as BrowseClub[];
}

/**
 * Fetch a single active club by slug (for public club profile page).
 * Returns null if not found or inactive.
 */
export async function fetchClubBySlug(
  slug: string
): Promise<BrowseClub | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clubs")
    .select("id, name, description, website, slug, logo_url, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching club by slug:", error);
    throw error;
  }
  return data as BrowseClub | null;
}

/**
 * Fetch majors list (cached globally)
 */
export async function fetchMajorsList(): Promise<
  Array<{ id: string; name: string }>
> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("majors")
    .select("id, name")
    .order("name");

  if (error) {
    console.error("Error fetching majors:", error);
    throw error;
  }

  return (data || []) as Array<{ id: string; name: string }>;
}

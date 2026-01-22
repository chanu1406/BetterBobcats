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

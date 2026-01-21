import { createClient } from "@/lib/supabase/browser";

const supabase = createClient();

export interface ClubMember {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

interface ListResponse {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
  total_count: number;
}

export interface MembersListResult {
  members: ClubMember[];
  total: number;
}

/**
 * Fetch club members with pagination
 */
export async function fetchClubMembers(
  clubId: string,
  limit: number = 25,
  offset: number = 0
): Promise<MembersListResult> {
  const { data, error } = await supabase.rpc("list_club_members", {
    p_club_id: clubId,
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    console.error('[fetchClubMembers] RPC error:', error);
    throw new Error(error.message || "Failed to load members");
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[fetchClubMembers] RPC response:', { data, clubId, limit, offset });
  }

  const total = data?.[0]?.total_count ?? 0;

  const members: ClubMember[] =
    data && data.length > 0
      ? data.map((row: ListResponse) => ({
          user_id: row.user_id,
          email: row.email,
          role: row.role,
          created_at: row.created_at,
        }))
      : [];

  if (process.env.NODE_ENV === 'development') {
    console.log('[fetchClubMembers] Parsed result:', { members, total });
  }

  return { members, total };
}

export interface ClubInvite {
  id: string;
  email: string;
  role: string;
  created_at: string;
  created_by: string | null;
}

/**
 * Fetch pending invites for a club
 */
export async function fetchClubPendingInvites(
  clubId: string
): Promise<ClubInvite[]> {
  const { data, error } = await supabase
    .from("club_invites")
    .select("id, email, role, created_at, created_by")
    .eq("club_id", clubId)
    .is("accepted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load invites");
  }

  return (data || []) as ClubInvite[];
}

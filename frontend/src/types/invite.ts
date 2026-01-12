/**
 * Club Invite Type
 * Represents an invite for a user to join a club
 */
export interface ClubInvite {
  id: string;
  club_id: string;
  role: string;
  created_at: string;
  accepted_at: string | null;
}

/**
 * Club Info Type (for display)
 */
export interface ClubInfo {
  id: string;
  name: string;
  slug: string | null;
  logo_url: string | null;
}

/**
 * Invite with Club Info (merged data)
 */
export interface InviteWithClub extends ClubInvite {
  club?: ClubInfo;
}

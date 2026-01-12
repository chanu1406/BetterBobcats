/**
 * Membership TypeScript types matching database schema
 */

export interface ClubMembership {
  id: string;
  club_id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export interface ClubInfo {
  id: string;
  name: string;
  slug: string | null;
  logo_url: string | null;
  is_active?: boolean | null;
}

export interface MembershipWithClub {
  id: string;
  club_id: string;
  role: string;
  created_at: string;
  club: ClubInfo;
}

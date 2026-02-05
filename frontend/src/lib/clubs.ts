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
  banner_url?: string | null;
  is_active: boolean;
}

/** Profile enrichment types (match DB enums) */
export type ClubProfileDuesFrequency =
  | "one_time"
  | "semesterly"
  | "yearly"
  | "none";
export type ClubProfileCommitmentLevel = "casual" | "moderate" | "high";
export type ClubProfileOpenTo = "undergrad" | "grad" | "both";
export type ClubProfileRecruitingStatus = "open" | "closed" | "by_invite";
export type ClubProfileSizeRange = "small" | "medium" | "large";
export type ClubProfileLinkType =
  | "website"
  | "instagram"
  | "discord"
  | "linkedin"
  | "github"
  | "linktree"
  | "other";
export type ClubProfileMeetingFrequency =
  | "weekly"
  | "biweekly"
  | "monthly"
  | "varies";
export type ClubProfileMeetingLocation =
  | "online"
  | "on_campus"
  | "hybrid";

export interface ClubProfile {
  club_id: string;
  published: boolean;
  tagline: string | null;
  mission: string | null;
  who_for: string | null;
  what_do: string | null;
  thumbnail_url: string | null;
  intro_video_url: string | null;
  how_to_join: string | null;
  dues_amount_cents: number | null;
  dues_frequency: ClubProfileDuesFrequency | null;
  application_required: boolean | null;
  application_url: string | null;
  commitment_level: ClubProfileCommitmentLevel | null;
  open_to: ClubProfileOpenTo | null;
  open_to_all_majors: boolean | null;
  contact_email_general: string | null;
  contact_emails_role_based: Record<string, string> | null;
  awards: string | null;
  partners_sponsors: string | null;
  supported_careers: string[] | null;
  skills_developed: string[] | null;
  pairs_well_with_courses: string | null;
  accessibility_notes: string | null;
  inclusivity_statement: string | null;
  code_of_conduct_url: string | null;
  years_active: number | null;
  recruiting_status: ClubProfileRecruitingStatus | null;
  club_size_range: ClubProfileSizeRange | null;
  meeting_frequency: ClubProfileMeetingFrequency | null;
  meeting_location: ClubProfileMeetingLocation | null;
  meeting_days: string | null;
  outcomes: string | null;
  upcoming_highlights: string | null;
  recognized_by_university: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClubProfileLink {
  id: string;
  club_id: string;
  link_type: ClubProfileLinkType;
  url: string;
  sort_order: number;
}

export interface ClubProfileMedia {
  id: string;
  club_id: string;
  url: string;
  caption: string | null;
  sort_order: number;
}

export interface ClubOfficerPublicProfile {
  id: string;
  club_id: string;
  display_name: string;
  role: string;
  major: string | null;
  year: string | null;
  bio: string | null;
  headshot_url: string | null;
  sort_order: number;
}

/** Club with full profile enrichment (for public page) */
export interface ClubWithProfile extends BrowseClub {
  profile: ClubProfile | null;
  links: ClubProfileLink[];
  media: ClubProfileMedia[];
  officers: ClubOfficerPublicProfile[];
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
    .select("id, name, description, website, slug, logo_url, banner_url, is_active")
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
 * Fetch a club with full profile enrichment (for public club profile page).
 * RLS ensures anon sees only published profiles; members/officers see drafts.
 * Returns null if club not found or inactive.
 */
export async function fetchClubWithProfile(
  slug: string
): Promise<ClubWithProfile | null> {
  const supabase = createClient();

  const { data: clubData, error: clubError } = await supabase
    .from("clubs")
    .select("id, name, description, website, slug, logo_url, banner_url, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (clubError) {
    console.error("Error fetching club by slug:", clubError);
    throw clubError;
  }
  if (!clubData) return null;

  const clubId = clubData.id;

  const [profileRes, linksRes, mediaRes, officersRes] = await Promise.all([
    supabase
      .from("club_profiles")
      .select("*")
      .eq("club_id", clubId)
      .maybeSingle(),
    supabase
      .from("club_profile_links")
      .select("*")
      .eq("club_id", clubId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("club_profile_media")
      .select("*")
      .eq("club_id", clubId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("club_officer_public_profiles")
      .select("*")
      .eq("club_id", clubId)
      .order("sort_order", { ascending: true }),
  ]);

  return {
    ...clubData,
    profile: profileRes.data as ClubProfile | null,
    links: (linksRes.data || []) as ClubProfileLink[],
    media: (mediaRes.data || []) as ClubProfileMedia[],
    officers: (officersRes.data || []) as ClubOfficerPublicProfile[],
  };
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

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

/** Filter params for browse (sync with URL) */
export interface ClubsBrowseFilters {
  majorId?: string | null;
  search?: string | null;
  recruitingStatus?: ClubProfileRecruitingStatus | null;
  commitmentLevel?: ClubProfileCommitmentLevel | null;
  openTo?: ClubProfileOpenTo | null;
  openToAllMajors?: boolean | null;
  noDues?: boolean | null;
  sortBy?: "relevant" | "updated" | "alphabetical" | "recruiting";
}

/** Club + profile fields needed for browse cards (list-optimized) */
export interface BrowseClubWithProfile {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  logo_url: string | null;
  is_active: boolean;
  tagline: string | null;
  thumbnail_url: string | null;
  recruiting_status: ClubProfileRecruitingStatus | null;
  commitment_level: ClubProfileCommitmentLevel | null;
  club_size_range: ClubProfileSizeRange | null;
  open_to: ClubProfileOpenTo | null;
  dues_amount_cents: number | null;
  open_to_all_majors: boolean | null;
  profile_updated_at: string | null;
  links: { type: string; url: string }[];
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
 * Fetch clubs for browse page with profile data (cards).
 * Uses RPC for base list, then joins club_profiles (published) and club_profile_links.
 * Applies profile-based filters and sort client-side.
 */
export async function fetchClubsForBrowse(
  filters: ClubsBrowseFilters,
  limit: number = 100,
  offset: number = 0
): Promise<BrowseClubWithProfile[]> {
  const baseClubs = await fetchClubsWithFilters(
    filters.majorId ?? null,
    filters.search ?? null,
    200,
    0
  );
  if (baseClubs.length === 0) return [];

  const clubIds = baseClubs.map((c) => c.id);
  const supabase = createClient();

  const [profilesRes, linksRes] = await Promise.all([
    supabase
      .from("club_profiles")
      .select(
        "club_id, tagline, thumbnail_url, recruiting_status, commitment_level, club_size_range, open_to, dues_amount_cents, open_to_all_majors, updated_at"
      )
      .in("club_id", clubIds)
      .eq("published", true),
    supabase
      .from("club_profile_links")
      .select("club_id, link_type, url")
      .in("club_id", clubIds)
      .order("sort_order", { ascending: true }),
  ]);

  const profilesByClub = new Map<
    string,
    {
      tagline: string | null;
      thumbnail_url: string | null;
      recruiting_status: ClubProfileRecruitingStatus | null;
      commitment_level: ClubProfileCommitmentLevel | null;
      club_size_range: ClubProfileSizeRange | null;
      open_to: ClubProfileOpenTo | null;
      dues_amount_cents: number | null;
      open_to_all_majors: boolean | null;
      updated_at: string;
    }
  >();
  (profilesRes.data || []).forEach((row: Record<string, unknown>) => {
    const clubId = row.club_id as string;
    profilesByClub.set(clubId, {
      tagline: (row.tagline as string) ?? null,
      thumbnail_url: (row.thumbnail_url as string) ?? null,
      recruiting_status: (row.recruiting_status as ClubProfileRecruitingStatus) ?? null,
      commitment_level: (row.commitment_level as ClubProfileCommitmentLevel) ?? null,
      club_size_range: (row.club_size_range as ClubProfileSizeRange) ?? null,
      open_to: (row.open_to as ClubProfileOpenTo) ?? null,
      dues_amount_cents: (row.dues_amount_cents as number) ?? null,
      open_to_all_majors: (row.open_to_all_majors as boolean) ?? null,
      updated_at: (row.updated_at as string) ?? "",
    });
  });

  const linksByClub = new Map<string, { type: string; url: string }[]>();
  (linksRes.data || []).forEach((row: Record<string, unknown>) => {
    const clubId = row.club_id as string;
    const list = linksByClub.get(clubId) ?? [];
    list.push({ type: row.link_type as string, url: row.url as string });
    linksByClub.set(clubId, list);
  });

  const emptyProfile = {
    tagline: null as string | null,
    thumbnail_url: null as string | null,
    recruiting_status: null as ClubProfileRecruitingStatus | null,
    commitment_level: null as ClubProfileCommitmentLevel | null,
    club_size_range: null as ClubProfileSizeRange | null,
    open_to: null as ClubProfileOpenTo | null,
    dues_amount_cents: null as number | null,
    open_to_all_majors: null as boolean | null,
    updated_at: "",
  };

  let merged: BrowseClubWithProfile[] = [];
  for (const club of baseClubs) {
    const profile = profilesByClub.get(club.id) ?? emptyProfile;
    merged.push({
      id: club.id,
      name: club.name,
      slug: club.slug,
      description: club.description,
      logo_url: club.logo_url,
      is_active: club.is_active,
      tagline: profile.tagline,
      thumbnail_url: profile.thumbnail_url,
      recruiting_status: profile.recruiting_status,
      commitment_level: profile.commitment_level,
      club_size_range: profile.club_size_range,
      open_to: profile.open_to,
      dues_amount_cents: profile.dues_amount_cents,
      open_to_all_majors: profile.open_to_all_majors,
      profile_updated_at: profile.updated_at || null,
      links: linksByClub.get(club.id) ?? [],
    });
  }

  if (filters.recruitingStatus) {
    merged = merged.filter((c) => c.recruiting_status === filters.recruitingStatus);
  }
  if (filters.commitmentLevel) {
    merged = merged.filter((c) => c.commitment_level === filters.commitmentLevel);
  }
  if (filters.openTo) {
    merged = merged.filter((c) => c.open_to === filters.openTo);
  }
  if (filters.openToAllMajors === true) {
    merged = merged.filter((c) => c.open_to_all_majors === true);
  }
  if (filters.noDues === true) {
    merged = merged.filter(
      (c) => c.dues_amount_cents == null || c.dues_amount_cents === 0
    );
  }

  const sortBy = filters.sortBy ?? "relevant";
  if (sortBy === "alphabetical") {
    merged.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "updated") {
    merged.sort((a, b) => {
      const ta = a.profile_updated_at ?? "";
      const tb = b.profile_updated_at ?? "";
      return tb.localeCompare(ta);
    });
  } else if (sortBy === "recruiting") {
    merged.sort((a, b) => {
      const order = { open: 0, by_invite: 1, closed: 2 };
      const ai = order[a.recruiting_status ?? "closed"] ?? 2;
      const bi = order[b.recruiting_status ?? "closed"] ?? 2;
      return ai - bi;
    });
  }
  // "relevant" = keep current order (already from RPC)

  return merged.slice(offset, offset + limit);
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
 * Fetch next 3-5 upcoming published events for a club (public).
 * Used on club profile page for "Upcoming events" section.
 */
export interface ClubUpcomingEvent {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  location_name: string | null;
  location_type: "on_campus" | "off_campus" | "online" | "hybrid";
  online_url: string | null;
}

export async function fetchUpcomingClubEvents(
  clubId: string,
  limit: number = 5
): Promise<ClubUpcomingEvent[]> {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("events")
    .select("id, title, starts_at, ends_at, location_name, location_type, online_url")
    .eq("club_id", clubId)
    .eq("status", "published")
    .eq("visibility", "public")
    .gte("starts_at", now)
    .order("starts_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching upcoming club events:", error);
    return [];
  }
  return (data || []) as ClubUpcomingEvent[];
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

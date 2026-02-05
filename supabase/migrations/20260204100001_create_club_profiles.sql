-- Migration: Create club profiles system
-- Adds club_profiles (1:1 with clubs) and supporting tables for rich club profiles.
-- Officers/admins edit profile enrichment; platform admins retain core identity control.
-- RLS enforces published/draft visibility.

-- ============================================================================
-- 1. ENUMS
-- ============================================================================

DO $$ BEGIN
  CREATE TYPE public.club_profile_dues_frequency AS ENUM ('one_time', 'semesterly', 'yearly', 'none');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.club_profile_commitment_level AS ENUM ('casual', 'moderate', 'high');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.club_profile_open_to AS ENUM ('undergrad', 'grad', 'both');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.club_profile_recruiting_status AS ENUM ('open', 'closed', 'by_invite');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.club_profile_size_range AS ENUM ('small', 'medium', 'large');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.club_profile_link_type AS ENUM ('website', 'instagram', 'discord', 'linkedin', 'github', 'linktree', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. CLUB_PROFILES TABLE (1:1 with clubs)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.club_profiles (
  club_id uuid NOT NULL PRIMARY KEY REFERENCES public.clubs(id) ON DELETE CASCADE,
  published boolean NOT NULL DEFAULT false,
  -- Identity & story
  tagline text,
  mission text,
  who_for text,
  what_do text,
  -- Visual
  thumbnail_url text,
  intro_video_url text,
  -- Membership
  how_to_join text,
  dues_amount_cents integer,
  dues_frequency public.club_profile_dues_frequency,
  application_required boolean,
  application_url text,
  commitment_level public.club_profile_commitment_level,
  open_to public.club_profile_open_to,
  open_to_all_majors boolean,
  -- Contacts
  contact_email_general text,
  contact_emails_role_based jsonb DEFAULT '{}'::jsonb,
  -- Social proof
  awards text,
  partners_sponsors text,
  -- Academic/career
  supported_careers text[] DEFAULT '{}',
  skills_developed text[] DEFAULT '{}',
  pairs_well_with_courses text,
  -- Conduct
  accessibility_notes text,
  inclusivity_statement text,
  code_of_conduct_url text,
  -- Activity
  years_active integer,
  recruiting_status public.club_profile_recruiting_status,
  club_size_range public.club_profile_size_range,
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.club_profiles OWNER TO postgres;

-- ============================================================================
-- 3. CLUB_PROFILE_LINKS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.club_profile_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id uuid NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  link_type public.club_profile_link_type NOT NULL,
  url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.club_profile_links OWNER TO postgres;
CREATE INDEX IF NOT EXISTS idx_club_profile_links_club_id ON public.club_profile_links(club_id);

-- ============================================================================
-- 4. CLUB_PROFILE_MEDIA TABLE (gallery)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.club_profile_media (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id uuid NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.club_profile_media OWNER TO postgres;
CREATE INDEX IF NOT EXISTS idx_club_profile_media_club_id ON public.club_profile_media(club_id);

-- ============================================================================
-- 5. CLUB_OFFICER_PUBLIC_PROFILES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.club_officer_public_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id uuid NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  role text NOT NULL,
  major text,
  year text,
  bio text,
  headshot_url text,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.club_officer_public_profiles OWNER TO postgres;
CREATE INDEX IF NOT EXISTS idx_club_officer_public_profiles_club_id ON public.club_officer_public_profiles(club_id);

-- ============================================================================
-- 6. UPDATED_AT TRIGGER FOR club_profiles
-- ============================================================================

CREATE TRIGGER trg_club_profiles_set_updated_at
  BEFORE UPDATE ON public.club_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 7. BACKFILL: Insert empty club_profiles for all existing clubs
-- ============================================================================

INSERT INTO public.club_profiles (club_id, published)
SELECT id, false
FROM public.clubs
ON CONFLICT (club_id) DO NOTHING;

-- ============================================================================
-- 8. RLS POLICIES
-- ============================================================================

ALTER TABLE public.club_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_profile_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_profile_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_officer_public_profiles ENABLE ROW LEVEL SECURITY;

-- club_profiles: SELECT
CREATE POLICY "club_profiles_select_public_published"
  ON public.club_profiles FOR SELECT
  USING (
    published = true
    OR public.is_club_officer(club_id)
    OR public.is_club_member(club_id)
    OR public.is_platform_admin()
  );

-- club_profiles: INSERT
CREATE POLICY "club_profiles_insert_officer_or_admin"
  ON public.club_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

-- club_profiles: UPDATE
CREATE POLICY "club_profiles_update_officer_or_admin"
  ON public.club_profiles FOR UPDATE
  TO authenticated
  USING (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  )
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

-- club_profiles: DELETE (platform admin only)
CREATE POLICY "club_profiles_delete_platform_admin"
  ON public.club_profiles FOR DELETE
  TO authenticated
  USING (public.is_platform_admin());

-- club_profile_links: SELECT
CREATE POLICY "club_profile_links_select_visible"
  ON public.club_profile_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.club_profiles cp
      WHERE cp.club_id = club_profile_links.club_id
        AND (cp.published = true
             OR public.is_club_officer(cp.club_id)
             OR public.is_club_member(cp.club_id)
             OR public.is_platform_admin())
    )
  );

-- club_profile_links: INSERT/UPDATE/DELETE
CREATE POLICY "club_profile_links_insert_officer_or_admin"
  ON public.club_profile_links FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

CREATE POLICY "club_profile_links_update_officer_or_admin"
  ON public.club_profile_links FOR UPDATE
  TO authenticated
  USING (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  )
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

CREATE POLICY "club_profile_links_delete_officer_or_admin"
  ON public.club_profile_links FOR DELETE
  TO authenticated
  USING (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

-- club_profile_media: SELECT
CREATE POLICY "club_profile_media_select_visible"
  ON public.club_profile_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.club_profiles cp
      WHERE cp.club_id = club_profile_media.club_id
        AND (cp.published = true
             OR public.is_club_officer(cp.club_id)
             OR public.is_club_member(cp.club_id)
             OR public.is_platform_admin())
    )
  );

-- club_profile_media: INSERT/UPDATE/DELETE
CREATE POLICY "club_profile_media_insert_officer_or_admin"
  ON public.club_profile_media FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

CREATE POLICY "club_profile_media_update_officer_or_admin"
  ON public.club_profile_media FOR UPDATE
  TO authenticated
  USING (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  )
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

CREATE POLICY "club_profile_media_delete_officer_or_admin"
  ON public.club_profile_media FOR DELETE
  TO authenticated
  USING (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

-- club_officer_public_profiles: SELECT
CREATE POLICY "club_officer_public_profiles_select_visible"
  ON public.club_officer_public_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.club_profiles cp
      WHERE cp.club_id = club_officer_public_profiles.club_id
        AND (cp.published = true
             OR public.is_club_officer(cp.club_id)
             OR public.is_club_member(cp.club_id)
             OR public.is_platform_admin())
    )
  );

-- club_officer_public_profiles: INSERT/UPDATE/DELETE
CREATE POLICY "club_officer_public_profiles_insert_officer_or_admin"
  ON public.club_officer_public_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

CREATE POLICY "club_officer_public_profiles_update_officer_or_admin"
  ON public.club_officer_public_profiles FOR UPDATE
  TO authenticated
  USING (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  )
  WITH CHECK (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

CREATE POLICY "club_officer_public_profiles_delete_officer_or_admin"
  ON public.club_officer_public_profiles FOR DELETE
  TO authenticated
  USING (
    public.is_club_officer(club_id)
    OR public.is_platform_admin()
  );

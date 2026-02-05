-- Fix 500 error on club_profiles: grant enum type usage and add a helper for RLS
-- PostgREST/Supabase may require explicit type grants; RLS helpers need correct permissions.

-- Grant USAGE on enum types (required for some PostgREST operations)
GRANT USAGE ON TYPE public.club_profile_dues_frequency TO anon, authenticated;
GRANT USAGE ON TYPE public.club_profile_commitment_level TO anon, authenticated;
GRANT USAGE ON TYPE public.club_profile_open_to TO anon, authenticated;
GRANT USAGE ON TYPE public.club_profile_recruiting_status TO anon, authenticated;
GRANT USAGE ON TYPE public.club_profile_size_range TO anon, authenticated;
GRANT USAGE ON TYPE public.club_profile_link_type TO anon, authenticated;

-- SECURITY DEFINER helper: can the current user view a club profile row?
-- Takes club_id and published from the row; does NOT query club_profiles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.can_view_club_profile(p_club_id uuid, p_published boolean)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p_published = true
    OR public.is_club_officer(p_club_id)
    OR public.is_club_member(p_club_id)
    OR public.is_platform_admin();
$$;

GRANT EXECUTE ON FUNCTION public.can_view_club_profile(uuid, boolean) TO anon, authenticated;

-- Replace SELECT policy with one that uses the helper (avoids potential RLS evaluation issues)
DROP POLICY IF EXISTS "club_profiles_select_public_published" ON public.club_profiles;
CREATE POLICY "club_profiles_select_public_published"
  ON public.club_profiles FOR SELECT
  USING (public.can_view_club_profile(club_id, published));

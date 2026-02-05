-- Grant permissions on club profile tables to anon and authenticated
-- Fixes 500 errors when querying club_profiles via Supabase REST API

GRANT SELECT, INSERT, UPDATE ON public.club_profiles TO authenticated;
GRANT SELECT ON public.club_profiles TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.club_profile_links TO authenticated;
GRANT SELECT ON public.club_profile_links TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.club_profile_media TO authenticated;
GRANT SELECT ON public.club_profile_media TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.club_officer_public_profiles TO authenticated;
GRANT SELECT ON public.club_officer_public_profiles TO anon;

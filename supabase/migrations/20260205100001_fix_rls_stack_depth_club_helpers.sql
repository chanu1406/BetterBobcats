-- Fix "stack depth limit exceeded": RLS recursion when club_profiles / club_profile_links
-- policies call is_club_officer/is_club_member, which read club_memberships, whose RLS
-- calls is_club_admin, which reads club_memberships again -> infinite recursion.
-- Make these helpers SECURITY DEFINER so they run as postgres and bypass RLS on club_memberships.

CREATE OR REPLACE FUNCTION public.is_club_admin(p_club_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.club_memberships m
    WHERE m.club_id = p_club_id
      AND m.user_id = auth.uid()
      AND m.role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_club_member(p_club_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.club_memberships m
    WHERE m.club_id = p_club_id
      AND m.user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.is_club_officer(p_club_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.club_memberships m
    WHERE m.club_id = p_club_id
      AND m.user_id = auth.uid()
      AND m.role IN ('admin', 'officer')
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_club_admin(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_club_member(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_club_officer(uuid) TO anon, authenticated;

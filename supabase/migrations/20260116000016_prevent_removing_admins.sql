-- Migration: Prevent removing admins from clubs
-- Only officers and members can be removed
-- Admins must have their role changed first before they can be removed

CREATE OR REPLACE FUNCTION remove_club_member(
  p_club_id uuid,
  p_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
DECLARE
  v_target_role text;
  v_admin_count int;
BEGIN
  -- Only club admins or platform admins can remove members
  IF NOT (public.is_platform_admin() OR public.is_club_admin(p_club_id)) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Prevent removing yourself
  IF p_user_id = auth.uid() THEN
    RAISE EXCEPTION 'You cannot remove yourself';
  END IF;

  -- Get the target member's role
  SELECT role INTO v_target_role
  FROM public.club_memberships
  WHERE club_id = p_club_id AND user_id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Membership not found';
  END IF;

  -- Prevent removing admins - they must have their role changed first
  IF v_target_role = 'admin' THEN
    RAISE EXCEPTION 'Cannot remove admins. Change their role to officer or member first.';
  END IF;

  -- Delete the membership (officers and members can be removed)
  DELETE FROM public.club_memberships
  WHERE club_id = p_club_id
    AND user_id = p_user_id;
END;
$$;

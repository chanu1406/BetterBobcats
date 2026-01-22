-- Migration: Optimize Admin Clubs Operations
-- Creates RPC functions for admin club management
-- Part of Performance Optimization Roadmap items 3.1, 3.2

-- ============================================================================
-- 1. RPC FUNCTION: ADMIN_GET_CLUBS_LIST
-- Returns list of clubs with summary stats for admin dashboard
-- ============================================================================

CREATE OR REPLACE FUNCTION public.admin_get_clubs_list(
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
DECLARE
  v_clubs jsonb;
BEGIN
  -- Check authorization
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Build clubs list with summary stats
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', c.id,
      'name', c.name,
      'slug', c.slug,
      'description', c.description,
      'website', c.website,
      'logo_url', c.logo_url,
      'banner_url', c.banner_url,
      'is_active', c.is_active,
      'display_order', c.display_order,
      'created_at', c.created_at,
      'member_count', (
        SELECT COUNT(*)::integer
        FROM public.club_memberships m
        WHERE m.club_id = c.id
      ),
      'event_count', (
        SELECT COUNT(*)::integer
        FROM public.events e
        WHERE e.club_id = c.id
      ),
      'pending_invite_count', (
        SELECT COUNT(*)::integer
        FROM public.club_invites i
        WHERE i.club_id = c.id
          AND i.accepted_at IS NULL
      )
    ) ORDER BY c.created_at DESC
  ) INTO v_clubs
  FROM public.clubs c
  ORDER BY c.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;

  RETURN COALESCE(v_clubs, '[]'::jsonb);
END;
$$;

-- Grant execute permission to authenticated users (admin check inside function)
GRANT EXECUTE ON FUNCTION public.admin_get_clubs_list(integer, integer) TO authenticated;

-- ============================================================================
-- 2. RPC FUNCTION: ADMIN_GET_CLUB_FULL_DETAILS
-- Returns complete club details with members (paginated), invites, tags, majors
-- ============================================================================

CREATE OR REPLACE FUNCTION public.admin_get_club_full_details(
  p_club_id uuid,
  p_members_limit integer DEFAULT 50,
  p_members_offset integer DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
DECLARE
  v_result jsonb;
BEGIN
  -- Check authorization
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Build complete club details
  SELECT jsonb_build_object(
    'summary', (
      SELECT jsonb_build_object(
        'club_id', c.id,
        'name', c.name,
        'slug', c.slug,
        'is_active', c.is_active,
        'website', c.website,
        'description', c.description,
        'created_at', c.created_at,
        'member_count', (
          SELECT COUNT(*)::bigint
          FROM public.club_memberships m
          WHERE m.club_id = c.id
        ),
        'event_count', (
          SELECT COUNT(*)::bigint
          FROM public.events e
          WHERE e.club_id = c.id
        ),
        'pending_invite_count', (
          SELECT COUNT(*)::bigint
          FROM public.club_invites i
          WHERE i.club_id = c.id
            AND i.accepted_at IS NULL
        )
      )
      FROM public.clubs c
      WHERE c.id = p_club_id
    ),
    'members', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'email', u.email,
          'role', cm.role,
          'created_at', cm.created_at
        ) ORDER BY cm.created_at DESC
      )
      FROM public.club_memberships cm
      INNER JOIN auth.users u ON cm.user_id = u.id
      WHERE cm.club_id = p_club_id
      ORDER BY cm.created_at DESC
      LIMIT p_members_limit
      OFFSET p_members_offset
    ),
    'invites', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'email', ci.email,
          'role', ci.role,
          'invited_at', ci.created_at,
          'accepted_at', ci.accepted_at
        ) ORDER BY ci.created_at DESC
      )
      FROM public.club_invites ci
      WHERE ci.club_id = p_club_id
      ORDER BY ci.created_at DESC
    ),
    'tags', (
      SELECT jsonb_agg(
        jsonb_build_object('tag', ct.tag)
      )
      FROM public.club_tags ct
      WHERE ct.club_id = p_club_id
    ),
    'majors', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'major', m.name
        )
      )
      FROM public.club_majors cm
      INNER JOIN public.majors m ON cm.major_id = m.id
      WHERE cm.club_id = p_club_id
    )
  ) INTO v_result;

  RETURN COALESCE(v_result, '{}'::jsonb);
END;
$$;

-- Grant execute permission to authenticated users (admin check inside function)
GRANT EXECUTE ON FUNCTION public.admin_get_club_full_details(uuid, integer, integer) TO authenticated;

-- ============================================================================
-- 3. INDEXES FOR ADMIN QUERIES
-- ============================================================================

-- Index for club memberships (for admin queries)
CREATE INDEX IF NOT EXISTS idx_club_memberships_club_created 
ON public.club_memberships(club_id, created_at DESC);

-- Index for club invites (for admin queries)
CREATE INDEX IF NOT EXISTS idx_club_invites_club_created 
ON public.club_invites(club_id, created_at DESC);

-- Migration: Optimize Dashboard Queries
-- Adds indexes for dashboard performance optimizations
-- Part of Performance Optimization Roadmap items 1.1, 1.2, 1.3

-- ============================================================================
-- 1. INDEXES FOR CLUB MEMBERSHIPS
-- ============================================================================

-- Index for user dashboard: get all memberships for a user ordered by created_at
CREATE INDEX IF NOT EXISTS idx_club_memberships_user_created 
ON public.club_memberships(user_id, created_at DESC);

-- Index for club members list: get all members for a club ordered by created_at
CREATE INDEX IF NOT EXISTS idx_club_memberships_club_created 
ON public.club_memberships(club_id, created_at DESC);

-- ============================================================================
-- 2. INDEXES FOR EVENTS
-- ============================================================================

-- Index for club dashboard: get recent events for a club ordered by starts_at
-- Note: idx_events_club_id_starts_at already exists, but we need DESC order
-- Check if we need a separate DESC index or if the existing one is sufficient
-- The existing index is: idx_events_club_id_starts_at ON events(club_id, starts_at)
-- PostgreSQL can use indexes in reverse order, but let's add a DESC one for clarity

-- Index for filtering events by club and status (for published events)
CREATE INDEX IF NOT EXISTS idx_events_club_status_starts 
ON public.events(club_id, status, starts_at DESC);

-- ============================================================================
-- 3. RPC FUNCTION: GET_CLUB_DASHBOARD_DATA
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_club_dashboard_data(
  p_club_slug text,
  p_user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
DECLARE
  v_club jsonb;
  v_membership jsonb;
  v_recent_events jsonb;
  v_stats jsonb;
  v_result jsonb;
BEGIN
  -- Fetch club info
  SELECT jsonb_build_object(
    'id', c.id,
    'name', c.name,
    'slug', c.slug,
    'logo_url', c.logo_url,
    'description', c.description,
    'is_active', c.is_active
  ) INTO v_club
  FROM public.clubs c
  WHERE c.slug = p_club_slug;

  IF v_club IS NULL THEN
    RETURN NULL;
  END IF;

  -- Fetch user's membership
  SELECT jsonb_build_object(
    'role', cm.role,
    'created_at', cm.created_at
  ) INTO v_membership
  FROM public.club_memberships cm
  WHERE cm.club_id = (v_club->>'id')::uuid
    AND cm.user_id = p_user_id;

  -- Fetch recent events (last 5)
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', e.id,
      'title', e.title,
      'starts_at', e.starts_at,
      'ends_at', e.ends_at,
      'status', e.status,
      'visibility', e.visibility
    ) ORDER BY e.starts_at DESC
  ), '[]'::jsonb) INTO v_recent_events
  FROM (
    SELECT id, title, starts_at, ends_at, status, visibility
    FROM public.events
    WHERE club_id = (v_club->>'id')::uuid
    ORDER BY starts_at DESC
    LIMIT 5
  ) e;

  -- Fetch stats
  SELECT jsonb_build_object(
    'member_count', (
      SELECT COUNT(*)::int
      FROM public.club_memberships
      WHERE club_id = (v_club->>'id')::uuid
    ),
    'event_count', (
      SELECT COUNT(*)::int
      FROM public.events
      WHERE club_id = (v_club->>'id')::uuid
    )
  ) INTO v_stats;

  -- Build result
  v_result := jsonb_build_object(
    'club', v_club,
    'membership', v_membership,
    'recent_events', v_recent_events,
    'stats', v_stats
  );

  RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_club_dashboard_data(text, uuid) TO authenticated;

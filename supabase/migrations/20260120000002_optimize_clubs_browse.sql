-- Migration: Optimize Clubs Browse Page
-- Creates RPC function for filtering clubs by major and search
-- Part of Performance Optimization Roadmap item 4.1

-- ============================================================================
-- 1. RPC FUNCTION: GET_CLUBS_WITH_FILTERS
-- Returns clubs filtered by major and search query
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_clubs_with_filters(
  p_major_id uuid DEFAULT NULL,
  p_search_query text DEFAULT NULL,
  p_limit integer DEFAULT 100,
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
  -- Build clubs list with filtering
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', c.id,
      'name', c.name,
      'description', c.description,
      'website', c.website,
      'slug', c.slug,
      'logo_url', c.logo_url,
      'is_active', c.is_active
    ) ORDER BY c.name ASC
  ) INTO v_clubs
  FROM public.clubs c
  WHERE c.is_active = true
    -- Filter by major if provided
    AND (
      p_major_id IS NULL
      OR c.is_all_majors = true
      OR EXISTS (
        SELECT 1 FROM public.club_majors cm
        WHERE cm.club_id = c.id
          AND cm.major_id = p_major_id
      )
    )
    -- Filter by search query if provided
    AND (
      p_search_query IS NULL
      OR p_search_query = ''
      OR c.name ILIKE '%' || p_search_query || '%'
      OR c.description ILIKE '%' || p_search_query || '%'
    )
  ORDER BY c.name ASC
  LIMIT p_limit
  OFFSET p_offset;

  RETURN COALESCE(v_clubs, '[]'::jsonb);
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.get_clubs_with_filters(uuid, text, integer, integer) TO authenticated, anon;

-- ============================================================================
-- 2. INDEXES FOR CLUBS BROWSE
-- ============================================================================

-- Index for club name (for search)
CREATE INDEX IF NOT EXISTS idx_clubs_name 
ON public.clubs(name);

-- Index for club majors (for filtering)
CREATE INDEX IF NOT EXISTS idx_club_majors_major_club 
ON public.club_majors(major_id, club_id);

-- Index for active clubs (for filtering)
CREATE INDEX IF NOT EXISTS idx_clubs_is_active_name 
ON public.clubs(is_active, name) 
WHERE is_active = true;

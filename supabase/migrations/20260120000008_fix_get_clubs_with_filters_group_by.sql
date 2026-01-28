-- Fix get_clubs_with_filters: ORDER BY / LIMIT / OFFSET were applied to aggregate
-- (single row), causing "c.name must appear in GROUP BY". Use subquery to filter,
-- order, and page first, then jsonb_agg the result.

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
  SELECT COALESCE(jsonb_agg(club ORDER BY (club->>'name')), '[]'::jsonb) INTO v_clubs
  FROM (
    SELECT jsonb_build_object(
      'id', c.id,
      'name', c.name,
      'description', c.description,
      'website', c.website,
      'slug', c.slug,
      'logo_url', c.logo_url,
      'is_active', c.is_active
    ) AS club
    FROM public.clubs c
    WHERE c.is_active = true
      AND (
        p_major_id IS NULL
        OR c.is_all_majors = true
        OR EXISTS (
          SELECT 1 FROM public.club_majors cm
          WHERE cm.club_id = c.id
            AND cm.major_id = p_major_id
        )
      )
      AND (
        p_search_query IS NULL
        OR p_search_query = ''
        OR c.name ILIKE '%' || p_search_query || '%'
        OR c.description ILIKE '%' || p_search_query || '%'
      )
    ORDER BY c.name ASC
    LIMIT p_limit
    OFFSET p_offset
  ) sub;

  RETURN v_clubs;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_clubs_with_filters(uuid, text, integer, integer) TO authenticated, anon;

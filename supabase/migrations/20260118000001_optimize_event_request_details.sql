-- Migration: Optimize Event Request Details Fetching
-- Creates a single RPC function that returns all details in one call
-- Also adds performance indexes

-- ============================================================================
-- 1. RPC: GET_EVENT_REQUEST_DETAILS (Optimized single-call fetch)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_event_request_details(p_request_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
DECLARE
  v_request public.event_requests_with_counts%ROWTYPE;
  v_major_name text;
  v_fulfilled_event jsonb;
  v_user_has_voted boolean;
  v_result jsonb;
BEGIN
  -- Fetch request with vote count from view
  SELECT * INTO v_request
  FROM public.event_requests_with_counts
  WHERE id = p_request_id
    AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Fetch major name if applicable (single query)
  IF v_request.major_id IS NOT NULL THEN
    SELECT name INTO v_major_name
    FROM public.majors
    WHERE id = v_request.major_id;
  END IF;

  -- Fetch fulfilled event with club info if applicable (single query with join)
  IF v_request.fulfilled_event_id IS NOT NULL THEN
    SELECT jsonb_build_object(
      'id', e.id,
      'title', e.title,
      'starts_at', e.starts_at,
      'location_name', e.location_name,
      'location_type', e.location_type,
      'club_name', c.name,
      'club_slug', c.slug
    ) INTO v_fulfilled_event
    FROM public.events e
    INNER JOIN public.clubs c ON e.club_id = c.id
    WHERE e.id = v_request.fulfilled_event_id;
  END IF;

  -- Check if current user has voted (single EXISTS query)
  SELECT EXISTS(
    SELECT 1
    FROM public.event_request_votes
    WHERE request_id = p_request_id
      AND user_id = auth.uid()
  ) INTO v_user_has_voted;

  -- Build result JSON
  v_result := jsonb_build_object(
    'id', v_request.id,
    'description', v_request.description,
    'major_id', v_request.major_id,
    'is_all_majors', v_request.is_all_majors,
    'status', v_request.status,
    'fulfilled_event_id', v_request.fulfilled_event_id,
    'created_by', v_request.created_by,
    'created_at', v_request.created_at,
    'deleted_at', v_request.deleted_at,
    'deleted_by', v_request.deleted_by,
    'delete_reason', v_request.delete_reason,
    'vote_count', COALESCE(v_request.vote_count, 0),
    'major_name', v_major_name,
    'fulfilled_event', v_fulfilled_event,
    'user_has_voted', COALESCE(v_user_has_voted, false),
    'tags', (
      SELECT COALESCE(jsonb_agg(tag ORDER BY tag), '[]'::jsonb)
      FROM public.event_request_tags
      WHERE request_id = p_request_id
    )
  );

  RETURN v_result;
END;
$$;

-- Grant execute
GRANT EXECUTE ON FUNCTION public.get_event_request_details(uuid) TO authenticated, anon;

-- ============================================================================
-- 2. PERFORMANCE INDEXES
-- ============================================================================

-- Composite index for vote lookups (makes "did I vote?" O(log n))
CREATE INDEX IF NOT EXISTS idx_event_request_votes_request_user 
ON public.event_request_votes(request_id, user_id);

-- Index for fulfilled_event_id lookups
CREATE INDEX IF NOT EXISTS idx_event_requests_fulfilled_event_id 
ON public.event_requests(fulfilled_event_id) 
WHERE fulfilled_event_id IS NOT NULL;

-- Index for sorting by vote_count + created_at (used by board)
CREATE INDEX IF NOT EXISTS idx_event_requests_status_created_votes 
ON public.event_requests(status, created_at DESC) 
WHERE deleted_at IS NULL;

-- Index for major_id lookups
CREATE INDEX IF NOT EXISTS idx_event_requests_major_id 
ON public.event_requests(major_id) 
WHERE major_id IS NOT NULL;

-- Index for tags lookup
CREATE INDEX IF NOT EXISTS idx_event_request_tags_request_id 
ON public.event_request_tags(request_id);

COMMENT ON FUNCTION public.get_event_request_details(uuid) IS 'Optimized single-call fetch for event request details including major name, fulfilled event, vote status, and tags';

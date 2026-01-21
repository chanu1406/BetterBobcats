-- Migration: Optimize Admin Club Requests
-- Creates RPC function for club request details
-- Part of Performance Optimization Roadmap item 3.3

-- ============================================================================
-- 1. RPC FUNCTION: ADMIN_GET_CLUB_REQUEST_DETAILS
-- Returns complete club request details for admin review
-- ============================================================================

CREATE OR REPLACE FUNCTION public.admin_get_club_request_details(
  p_request_id uuid
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

  -- Build complete request details
  SELECT jsonb_build_object(
    'id', cr.id,
    'name', cr.name,
    'description', cr.description,
    'contact_email', cr.contact_email,
    'officer_emails', cr.officer_emails,
    'slug_candidate', cr.slug_candidate,
    'status', cr.status,
    'admin_message', cr.admin_message,
    'created_at', cr.created_at,
    'updated_at', cr.updated_at,
    'reviewed_at', cr.reviewed_at,
    'reviewed_by', cr.reviewed_by,
    'submitted_by', cr.submitted_by,
    'website', cr.website,
    'logo_url', cr.logo_url,
    'banner_url', cr.banner_url,
    'tags', (
      SELECT jsonb_agg(ct.tag)
      FROM public.club_request_tags ct
      WHERE ct.request_id = cr.id
    ),
    'majors', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', m.id,
          'name', m.name
        )
      )
      FROM public.club_request_majors crm
      INNER JOIN public.majors m ON crm.major_id = m.id
      WHERE crm.request_id = cr.id
    )
  ) INTO v_result
  FROM public.club_requests cr
  WHERE cr.id = p_request_id;

  RETURN COALESCE(v_result, '{}'::jsonb);
END;
$$;

-- Grant execute permission to authenticated users (admin check inside function)
GRANT EXECUTE ON FUNCTION public.admin_get_club_request_details(uuid) TO authenticated;

-- ============================================================================
-- 2. INDEXES FOR CLUB REQUESTS
-- ============================================================================

-- Index for club requests status and updated_at (for sorting)
CREATE INDEX IF NOT EXISTS idx_club_requests_status_updated 
ON public.club_requests(status, updated_at DESC);

-- Index for club requests search (name, contact_email, slug_candidate)
CREATE INDEX IF NOT EXISTS idx_club_requests_search 
ON public.club_requests USING gin(
  to_tsvector('english', 
    COALESCE(name, '') || ' ' || 
    COALESCE(contact_email, '') || ' ' || 
    COALESCE(slug_candidate, '')
  )
);

-- Migration: Event Requests V2 + Comments
-- Adds title, subtitle, request_type, time/location prefs, merged_into_id, comment_count;
-- Creates event_request_comments table;
-- New RPCs: create_event_request_v2, update_request_status, merge_requests, comment CRUD;
-- Expands status lifecycle and updates RLS.

-- ============================================================================
-- 1. DROP OLD STATUS CONSTRAINT AND ADD NEW COLUMNS TO event_requests
-- ============================================================================

ALTER TABLE public.event_requests
  DROP CONSTRAINT IF EXISTS event_requests_status_check;

ALTER TABLE public.event_requests
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS subtitle text,
  ADD COLUMN IF NOT EXISTS request_type text DEFAULT 'other'
    CHECK (request_type IN ('workshop','speaker','social','study','career','other')),
  ADD COLUMN IF NOT EXISTS time_pref_days text[],
  ADD COLUMN IF NOT EXISTS time_pref_windows text[]
    CHECK (time_pref_windows IS NULL OR time_pref_windows <@ ARRAY['morning','afternoon','evening']::text[]),
  ADD COLUMN IF NOT EXISTS location_pref text DEFAULT 'either'
    CHECK (location_pref IN ('in_person','online','either')),
  ADD COLUMN IF NOT EXISTS suggested_club_id uuid REFERENCES public.clubs(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS merged_into_id uuid REFERENCES public.event_requests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS last_activity_at timestamptz NULL;

-- Add new status constraint (expanded lifecycle)
ALTER TABLE public.event_requests
  ADD CONSTRAINT event_requests_status_check
  CHECK (status IN ('open','planned','scheduled','fulfilled','not_planned','closed'));

-- Backfill title from description for existing rows
UPDATE public.event_requests
SET title = left(description, 120)
WHERE title IS NULL AND description IS NOT NULL;

-- Backfill last_activity_at to created_at for existing rows
UPDATE public.event_requests
SET last_activity_at = created_at
WHERE last_activity_at IS NULL;

-- Make title NOT NULL for future (existing rows now have title)
ALTER TABLE public.event_requests
  ALTER COLUMN title SET DEFAULT '';
ALTER TABLE public.event_requests
  ALTER COLUMN title SET NOT NULL;

-- Ensure no empty titles
UPDATE public.event_requests SET title = left(description, 120) WHERE title = '';

-- Trigger: backfill title from description when title is empty (e.g. from legacy create_event_request)
CREATE OR REPLACE FUNCTION public.event_requests_backfill_title()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF (NEW.title IS NULL OR trim(NEW.title) = '') AND trim(NEW.description) <> '' THEN
    NEW.title := left(trim(NEW.description), 120);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_event_requests_backfill_title ON public.event_requests;
CREATE TRIGGER trg_event_requests_backfill_title
  BEFORE INSERT OR UPDATE ON public.event_requests
  FOR EACH ROW EXECUTE FUNCTION public.event_requests_backfill_title();

-- ============================================================================
-- 2. EVENT_REQUEST_COMMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.event_request_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.event_requests(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (length(trim(body)) >= 1),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL
);

CREATE INDEX IF NOT EXISTS idx_event_request_comments_request_id
  ON public.event_request_comments(request_id, created_at);
CREATE INDEX IF NOT EXISTS idx_event_request_comments_user_id
  ON public.event_request_comments(user_id);

-- Trigger: update request last_activity_at when a comment is added
CREATE OR REPLACE FUNCTION public.set_request_last_activity_on_comment()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.event_requests
  SET last_activity_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_request_last_activity_comment ON public.event_request_comments;
CREATE TRIGGER trg_request_last_activity_comment
  AFTER INSERT ON public.event_request_comments
  FOR EACH ROW WHEN (NEW.deleted_at IS NULL)
  EXECUTE FUNCTION public.set_request_last_activity_on_comment();

-- Trigger: update request last_activity_at when a vote is added
CREATE OR REPLACE FUNCTION public.set_request_last_activity_on_vote()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.event_requests
  SET last_activity_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_request_last_activity_vote ON public.event_request_votes;
CREATE TRIGGER trg_request_last_activity_vote
  AFTER INSERT ON public.event_request_votes
  FOR EACH ROW
  EXECUTE FUNCTION public.set_request_last_activity_on_vote();

-- Trigger to keep updated_at in sync
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_event_request_comments_updated_at ON public.event_request_comments;
CREATE TRIGGER trg_event_request_comments_updated_at
  BEFORE UPDATE ON public.event_request_comments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 3. DROP AND RECREATE event_requests_with_counts VIEW (with new columns + comment_count)
-- ============================================================================

DROP VIEW IF EXISTS public.event_requests_with_counts;

CREATE VIEW public.event_requests_with_counts AS
SELECT
  er.id,
  er.title,
  er.subtitle,
  er.description,
  er.major_id,
  er.is_all_majors,
  er.status,
  er.fulfilled_event_id,
  er.created_by,
  er.created_at,
  er.deleted_at,
  er.deleted_by,
  er.delete_reason,
  er.request_type,
  er.time_pref_days,
  er.time_pref_windows,
  er.location_pref,
  er.suggested_club_id,
  er.merged_into_id,
  COALESCE(er.last_activity_at, er.created_at) AS last_activity_at,
  COALESCE(vote_counts.vote_count, 0)::int AS vote_count,
  COALESCE(comment_counts.comment_count, 0)::int AS comment_count,
  COALESCE(ARRAY_AGG(DISTINCT ert.tag) FILTER (WHERE ert.tag IS NOT NULL), ARRAY[]::text[]) AS tags
FROM public.event_requests er
LEFT JOIN (
  SELECT request_id, COUNT(*)::int AS vote_count
  FROM public.event_request_votes
  GROUP BY request_id
) vote_counts ON vote_counts.request_id = er.id
LEFT JOIN (
  SELECT request_id, COUNT(*)::int AS comment_count
  FROM public.event_request_comments
  WHERE deleted_at IS NULL
  GROUP BY request_id
) comment_counts ON comment_counts.request_id = er.id
LEFT JOIN public.event_request_tags ert ON ert.request_id = er.id
GROUP BY
  er.id,
  er.title,
  er.subtitle,
  er.description,
  er.major_id,
  er.is_all_majors,
  er.status,
  er.fulfilled_event_id,
  er.created_by,
  er.created_at,
  er.deleted_at,
  er.deleted_by,
  er.delete_reason,
  er.request_type,
  er.time_pref_days,
  er.time_pref_windows,
  er.location_pref,
  er.suggested_club_id,
  er.merged_into_id,
  er.last_activity_at,
  vote_counts.vote_count,
  comment_counts.comment_count;

GRANT SELECT ON public.event_requests_with_counts TO authenticated, anon;

-- ============================================================================
-- 4. RPC: create_event_request_v2
-- ============================================================================

CREATE OR REPLACE FUNCTION public.create_event_request_v2(
  p_title text,
  p_description text DEFAULT '',
  p_subtitle text DEFAULT NULL,
  p_request_type text DEFAULT 'other',
  p_major_id uuid DEFAULT NULL,
  p_is_all_majors boolean DEFAULT false,
  p_tags text[] DEFAULT ARRAY[]::text[],
  p_time_pref_days text[] DEFAULT NULL,
  p_time_pref_windows text[] DEFAULT NULL,
  p_location_pref text DEFAULT 'either',
  p_suggested_club_id uuid DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth
AS $$
DECLARE
  v_request_id uuid;
  v_tag text;
  v_created_today int;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated to create event requests';
  END IF;

  IF trim(p_title) = '' OR length(trim(p_title)) < 1 THEN
    RAISE EXCEPTION 'Title is required';
  END IF;

  IF p_major_id IS NULL AND NOT p_is_all_majors THEN
    RAISE EXCEPTION 'Either major_id must be provided or is_all_majors must be true';
  END IF;

  IF p_major_id IS NOT NULL AND p_is_all_majors THEN
    RAISE EXCEPTION 'Cannot specify both major_id and is_all_majors=true';
  END IF;

  -- Rate limit: max 3 per user per 24h
  SELECT COUNT(*)::int INTO v_created_today
  FROM public.event_requests
  WHERE created_by = auth.uid()
    AND created_at > now() - interval '24 hours';
  IF v_created_today >= 3 THEN
    RAISE EXCEPTION 'You can create at most 3 requests per day';
  END IF;

  INSERT INTO public.event_requests (
    title,
    description,
    subtitle,
    request_type,
    major_id,
    is_all_majors,
    location_pref,
    time_pref_days,
    time_pref_windows,
    suggested_club_id,
    created_by
  ) VALUES (
    left(trim(p_title), 120),
    coalesce(trim(p_description), ''),
    nullif(trim(p_subtitle), ''),
    coalesce(nullif(trim(p_request_type), ''), 'other'),
    p_major_id,
    p_is_all_majors,
    coalesce(p_location_pref, 'either'),
    p_time_pref_days,
    p_time_pref_windows,
    p_suggested_club_id,
    auth.uid()
  )
  RETURNING id INTO v_request_id;

  IF p_tags IS NOT NULL AND array_length(p_tags, 1) > 0 THEN
    FOREACH v_tag IN ARRAY p_tags
    LOOP
      IF trim(v_tag) <> '' THEN
        INSERT INTO public.event_request_tags (request_id, tag)
        VALUES (v_request_id, trim(v_tag))
        ON CONFLICT (request_id, tag) DO NOTHING;
      END IF;
    END LOOP;
  END IF;

  RETURN v_request_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_event_request_v2(text, text, text, text, uuid, boolean, text[], text[], text[], text, uuid) TO authenticated;

-- ============================================================================
-- 5. RPC: update_request_status (admin / club officer)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_request_status(
  p_request_id uuid,
  p_status text,
  p_fulfilled_event_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth
AS $$
DECLARE
  v_request public.event_requests%ROWTYPE;
  v_club_id uuid;
BEGIN
  IF p_status IS NULL OR p_status NOT IN ('open','planned','scheduled','fulfilled','not_planned','closed') THEN
    RAISE EXCEPTION 'Invalid status';
  END IF;

  SELECT * INTO v_request
  FROM public.event_requests
  WHERE id = p_request_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event request not found';
  END IF;

  -- Platform admin can do anything
  IF public.is_platform_admin() THEN
    -- proceed
    NULL;
  ELSIF p_status IN ('fulfilled', 'scheduled') AND p_fulfilled_event_id IS NOT NULL THEN
    SELECT club_id INTO v_club_id FROM public.events WHERE id = p_fulfilled_event_id;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Event not found';
    END IF;
    IF NOT (public.is_club_officer(v_club_id) OR public.is_club_admin(v_club_id)) THEN
      RAISE EXCEPTION 'Not authorized to update this request';
    END IF;
  ELSE
    -- Other status changes: platform admin or officer of suggested club / any club with visibility
    IF v_request.suggested_club_id IS NOT NULL THEN
      IF NOT (public.is_club_officer(v_request.suggested_club_id) OR public.is_club_admin(v_request.suggested_club_id)) AND NOT public.is_platform_admin() THEN
        RAISE EXCEPTION 'Not authorized to update this request';
      END IF;
    ELSE
      IF NOT public.is_platform_admin() THEN
        RAISE EXCEPTION 'Not authorized to update this request';
      END IF;
    END IF;
  END IF;

  UPDATE public.event_requests
  SET
    status = p_status,
    fulfilled_event_id = CASE
      WHEN p_status IN ('fulfilled', 'scheduled') AND p_fulfilled_event_id IS NOT NULL THEN p_fulfilled_event_id
      ELSE fulfilled_event_id
    END
  WHERE id = p_request_id;

  IF p_status IN ('fulfilled', 'scheduled') AND p_fulfilled_event_id IS NOT NULL THEN
    UPDATE public.events
    SET request_id = p_request_id
    WHERE id = p_fulfilled_event_id AND request_id IS NULL;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_request_status(uuid, text, uuid) TO authenticated;

-- ============================================================================
-- 6. RPC: merge_requests (platform admin only)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.merge_requests(
  p_source_request_id uuid,
  p_canonical_request_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth
AS $$
DECLARE
  v_vote record;
BEGIN
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Only platform admins can merge requests';
  END IF;

  IF p_source_request_id = p_canonical_request_id THEN
    RAISE EXCEPTION 'Source and canonical request must be different';
  END IF;

  -- Transfer votes from source to canonical (ignore conflicts = already voted on canonical)
  FOR v_vote IN
    SELECT user_id FROM public.event_request_votes WHERE request_id = p_source_request_id
  LOOP
    INSERT INTO public.event_request_votes (request_id, user_id)
    VALUES (p_canonical_request_id, v_vote.user_id)
    ON CONFLICT (request_id, user_id) DO NOTHING;
  END LOOP;

  -- Delete votes from source
  DELETE FROM public.event_request_votes WHERE request_id = p_source_request_id;

  -- Mark source as closed and set merged_into_id
  UPDATE public.event_requests
  SET status = 'closed', merged_into_id = p_canonical_request_id
  WHERE id = p_source_request_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.merge_requests(uuid, uuid) TO authenticated;

-- ============================================================================
-- 7. RPC: Comment CRUD
-- ============================================================================

CREATE OR REPLACE FUNCTION public.create_event_request_comment(
  p_request_id uuid,
  p_body text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth
AS $$
DECLARE
  v_comment_id uuid;
  v_status text;
  v_count int;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated to comment';
  END IF;

  IF trim(p_body) = '' OR length(trim(p_body)) < 1 THEN
    RAISE EXCEPTION 'Comment body cannot be empty';
  END IF;

  SELECT status INTO v_status
  FROM public.event_requests
  WHERE id = p_request_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Request not found';
  END IF;

  IF v_status NOT IN ('open', 'planned', 'scheduled') THEN
    RAISE EXCEPTION 'Comments are closed for this request';
  END IF;

  -- Rate limit: 10 comments per user per hour
  SELECT COUNT(*)::int INTO v_count
  FROM public.event_request_comments
  WHERE user_id = auth.uid() AND created_at > now() - interval '1 hour';
  IF v_count >= 10 THEN
    RAISE EXCEPTION 'Comment rate limit exceeded. Try again later.';
  END IF;

  INSERT INTO public.event_request_comments (request_id, user_id, body)
  VALUES (p_request_id, auth.uid(), trim(p_body))
  RETURNING id INTO v_comment_id;

  RETURN v_comment_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_event_request_comment(uuid, text) TO authenticated;

-- Soft-delete comment (creator or platform admin)
CREATE OR REPLACE FUNCTION public.delete_event_request_comment(
  p_comment_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth
AS $$
DECLARE
  v_comment public.event_request_comments%ROWTYPE;
BEGIN
  SELECT * INTO v_comment FROM public.event_request_comments WHERE id = p_comment_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Comment not found';
  END IF;
  IF v_comment.user_id != auth.uid() AND NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Not authorized to delete this comment';
  END IF;
  UPDATE public.event_request_comments
  SET deleted_at = now()
  WHERE id = p_comment_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.delete_event_request_comment(uuid) TO authenticated;

-- ============================================================================
-- 8. UPDATE get_event_request_details TO RETURN NEW FIELDS + COMMENT COUNT
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_event_request_details(p_request_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, auth
STABLE
AS $$
DECLARE
  v_request public.event_requests_with_counts%ROWTYPE;
  v_major_name text;
  v_fulfilled_event jsonb;
  v_user_has_voted boolean;
  v_result jsonb;
BEGIN
  SELECT * INTO v_request
  FROM public.event_requests_with_counts
  WHERE id = p_request_id
    AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  IF v_request.major_id IS NOT NULL THEN
    SELECT name INTO v_major_name FROM public.majors WHERE id = v_request.major_id;
  END IF;

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

  SELECT EXISTS(
    SELECT 1 FROM public.event_request_votes
    WHERE request_id = p_request_id AND user_id = auth.uid()
  ) INTO v_user_has_voted;

  v_result := jsonb_build_object(
    'id', v_request.id,
    'title', v_request.title,
    'subtitle', v_request.subtitle,
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
    'request_type', v_request.request_type,
    'time_pref_days', v_request.time_pref_days,
    'time_pref_windows', v_request.time_pref_windows,
    'location_pref', v_request.location_pref,
    'suggested_club_id', v_request.suggested_club_id,
    'merged_into_id', v_request.merged_into_id,
    'last_activity_at', v_request.last_activity_at,
    'vote_count', COALESCE(v_request.vote_count, 0),
    'comment_count', COALESCE(v_request.comment_count, 0),
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

-- ============================================================================
-- 9. RLS FOR event_request_comments
-- ============================================================================

ALTER TABLE public.event_request_comments ENABLE ROW LEVEL SECURITY;

-- SELECT: Public can read non-deleted comments on visible requests
CREATE POLICY "event_request_comments_select_public"
  ON public.event_request_comments FOR SELECT
  TO authenticated, anon
  USING (
    deleted_at IS NULL
    AND EXISTS (
      SELECT 1 FROM public.event_requests r
      WHERE r.id = event_request_comments.request_id
        AND r.deleted_at IS NULL
        AND r.status IN ('open','planned','scheduled','fulfilled','not_planned','closed')
    )
  );

-- INSERT: via RPC only (no direct insert policy; use create_event_request_comment)
-- DELETE: via RPC only
-- UPDATE: not used (soft delete via RPC)

GRANT SELECT ON public.event_request_comments TO authenticated, anon;

-- ============================================================================
-- 10. UPDATE event_requests RLS FOR EXPANDED STATUS VISIBILITY
-- ============================================================================

DROP POLICY IF EXISTS "event_requests_select_public" ON public.event_requests;

CREATE POLICY "event_requests_select_public"
  ON public.event_requests FOR SELECT
  TO authenticated, anon
  USING (
    deleted_at IS NULL
    AND status IN ('open','planned','scheduled','fulfilled','not_planned','closed')
  );

-- Votes: keep voting only on open (and planned) requests
DROP POLICY IF EXISTS "event_request_votes_insert_authenticated" ON public.event_request_votes;

CREATE POLICY "event_request_votes_insert_authenticated"
  ON public.event_request_votes FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.event_requests
      WHERE event_requests.id = event_request_votes.request_id
        AND deleted_at IS NULL
        AND status IN ('open', 'planned')
    )
  );

-- ============================================================================
-- 11. ALLOW UPDATE ON event_requests FOR status (RPC does it with SECURITY DEFINER; optional direct policy for admin)
-- ============================================================================
-- Updates go through update_request_status RPC; no direct UPDATE policy needed.

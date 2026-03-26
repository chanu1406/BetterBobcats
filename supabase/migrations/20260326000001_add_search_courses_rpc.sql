-- Migration: 20260326000001_add_search_courses_rpc.sql
-- Adds a server-side search_courses RPC that handles deduplication and correct
-- pagination counts, replacing client-side dedup in lib/courses.ts.

CREATE OR REPLACE FUNCTION public.search_courses(
    p_subject     text    DEFAULT NULL,
    p_search      text    DEFAULT NULL,
    p_term        text    DEFAULT NULL,
    p_page        integer DEFAULT 1,
    p_page_size   integer DEFAULT 50
)
RETURNS jsonb
LANGUAGE plpgsql STABLE
SET search_path TO 'public'
AS $$
DECLARE
    v_offset integer;
    v_courses jsonb;
    v_total   bigint;
BEGIN
    v_offset := ((COALESCE(p_page, 1) - 1) * COALESCE(p_page_size, 50));

    -- Total count of DISTINCT courses (before pagination)
    SELECT COUNT(DISTINCT c.id)
    INTO v_total
    FROM public.courses c
    LEFT JOIN public.course_sections cs ON cs.course_id = c.id
    WHERE
        (p_subject IS NULL OR c.subject_code = upper(p_subject))
        AND (p_term   IS NULL OR cs.term = p_term OR cs.id IS NULL)
        AND (p_search IS NULL OR (
            c.course_code ILIKE '%' || p_search || '%'
            OR c.title     ILIKE '%' || p_search || '%'
        ));

    -- Deduplicated course list with representative section + professor
    SELECT jsonb_agg(row_to_json(t))
    INTO v_courses
    FROM (
        SELECT DISTINCT ON (c.id)
            c.id,
            c.course_code,
            c.course_number,
            c.title,
            c.subject_code,
            c.credits,
            c.description,
            cs.id          AS section_id,
            cs.crn,
            cs.term,
            cs.section_number,
            cs.meeting_days,
            cs.start_time,
            cs.end_time,
            cs.building,
            cs.room,
            p.id           AS professor_id,
            p.first_name   AS professor_first_name,
            p.last_name    AS professor_last_name,
            p.avg_rating   AS professor_rating,
            p.avg_difficulty AS professor_difficulty,
            p.num_ratings  AS professor_num_ratings
        FROM public.courses c
        LEFT JOIN public.course_sections cs ON cs.course_id = c.id
        LEFT JOIN public.professor_sections ps ON ps.section_id = cs.id AND ps.is_primary = true
        LEFT JOIN public.professors p ON p.id = ps.professor_id
        WHERE
            (p_subject IS NULL OR c.subject_code = upper(p_subject))
            AND (p_term   IS NULL OR cs.term = p_term OR cs.id IS NULL)
            AND (p_search IS NULL OR (
                c.course_code ILIKE '%' || p_search || '%'
                OR c.title     ILIKE '%' || p_search || '%'
            ))
        ORDER BY c.id, cs.term DESC NULLS LAST
        LIMIT p_page_size OFFSET v_offset
    ) t;

    RETURN jsonb_build_object(
        'courses',     COALESCE(v_courses, '[]'::jsonb),
        'total_count', COALESCE(v_total, 0),
        'page',        COALESCE(p_page, 1),
        'page_size',   COALESCE(p_page_size, 50)
    );
END;
$$;

COMMENT ON FUNCTION public.search_courses(text, text, text, integer, integer) IS
'Server-side course search with deduplication and accurate total_count.
Replaces the courses_with_professors view query + client-side dedup pattern.
Parameters:
  p_subject   - filter by subject code (e.g. "CSE"), case-insensitive
  p_search    - search course_code or title with ILIKE
  p_term      - filter by term code (e.g. "202510")
  p_page      - 1-indexed page number (default 1)
  p_page_size - results per page (default 50)
Returns: { courses: [...], total_count: N, page: N, page_size: N }';


-- Allow public read (anon key can call this)
GRANT EXECUTE ON FUNCTION public.search_courses(text, text, text, integer, integer) TO anon, authenticated;

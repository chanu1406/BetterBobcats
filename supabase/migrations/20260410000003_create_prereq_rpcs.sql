-- Migration: 20260410000003_create_prereq_rpcs.sql
-- Three prerequisite-graph query RPCs using recursive CTEs over course_prerequisites.
--
-- Disjunction semantics: edges with the same (course_id, group_id) are ANDed;
-- a course is satisfied when at least ONE group is fully covered by completed courses.
--
-- All functions are STABLE (read-only) and accessible to anon + authenticated roles.

-- ---------------------------------------------------------------------------
-- 1. get_forward_prereqs(target_code)
--    Returns every transitive prerequisite of target_code — the full ancestor
--    tree — with edge metadata (parent, group_id, depth).
--    Depth limit of 10 guards against cycles in malformed data.
--    Powers: "What do I need for CSE 120?" / "Why can't I take this yet?"
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_forward_prereqs(target_code TEXT)
RETURNS TABLE(
    course_code  TEXT,
    course_title TEXT,
    parent_code  TEXT,
    group_id     SMALLINT,
    depth        INT
)
LANGUAGE sql STABLE
SET search_path TO 'public'
AS $$
    WITH RECURSIVE prereq_tree AS (
        -- Base: direct prerequisites of the target course
        SELECT
            cp.prereq_course_id  AS prereq_id,
            cp.course_id         AS parent_id,
            cp.group_id,
            1::int               AS depth
        FROM course_prerequisites cp
        JOIN courses c ON c.id = cp.course_id
        WHERE upper(c.course_code) = upper(target_code)

        UNION

        -- Recursive: prerequisites of prerequisites
        SELECT
            cp.prereq_course_id,
            cp.course_id,
            cp.group_id,
            pt.depth + 1
        FROM course_prerequisites cp
        JOIN prereq_tree pt ON cp.course_id = pt.prereq_id
        WHERE pt.depth < 10  -- cycle guard
    )
    SELECT
        c_prereq.course_code  AS course_code,
        c_prereq.title        AS course_title,
        c_parent.course_code  AS parent_code,
        pt.group_id,
        pt.depth
    FROM prereq_tree pt
    JOIN courses c_prereq ON c_prereq.id = pt.prereq_id
    JOIN courses c_parent ON c_parent.id = pt.parent_id
    ORDER BY pt.depth, c_prereq.course_code;
$$;

COMMENT ON FUNCTION public.get_forward_prereqs(TEXT) IS
'Returns all transitive prerequisites of a course.
Each row is a directed edge (prereq → parent) with depth from target.
group_id discriminates AND/OR groups: same group_id on the same parent = AND,
different group_id = alternative OR branch.
Example: get_forward_prereqs(''CSE 120'') returns CSE 031, CSE 100, CSE 030, CSE 015, CSE 024, CSE 022.';


-- ---------------------------------------------------------------------------
-- 2. get_downstream(source_code)
--    Returns ONE-HOP children: courses that directly list source_code as a prereq.
--    Powers: "What does CSE 030 unlock?"
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_downstream(source_code TEXT)
RETURNS TABLE(
    course_code  TEXT,
    course_title TEXT,
    group_id     SMALLINT
)
LANGUAGE sql STABLE
SET search_path TO 'public'
AS $$
    SELECT
        c_course.course_code,
        c_course.title AS course_title,
        cp.group_id
    FROM course_prerequisites cp
    JOIN courses c_prereq ON c_prereq.id = cp.prereq_course_id
    JOIN courses c_course  ON c_course.id  = cp.course_id
    WHERE upper(c_prereq.course_code) = upper(source_code)
    ORDER BY c_course.course_code;
$$;

COMMENT ON FUNCTION public.get_downstream(TEXT) IS
'Returns all courses that directly require source_code as a prerequisite (one hop).
Powers "What does CSE 030 unlock?". For deeper reachability use get_forward_prereqs
on each returned course.';


-- ---------------------------------------------------------------------------
-- 3. get_unlocked_by(completed_codes)
--    Returns courses NOT in completed_codes whose prerequisite requirements are
--    fully satisfied: at least one group_id has every edge covered by completed_codes.
--    Powers: "What's next for me?" / "What can I take after CSE 120?"
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_unlocked_by(completed_codes TEXT[])
RETURNS TABLE(
    course_code  TEXT,
    course_title TEXT
)
LANGUAGE sql STABLE
SET search_path TO 'public'
AS $$
    WITH completed AS (
        -- Normalise to upper-case once
        SELECT upper(c) AS code FROM unnest(completed_codes) c
    ),
    group_satisfaction AS (
        -- For every (course, group) pair count total edges vs satisfied edges
        SELECT
            cp.course_id,
            cp.group_id,
            COUNT(*)                                          AS total_in_group,
            COUNT(*) FILTER (
                WHERE upper(c_prereq.course_code) IN (SELECT code FROM completed)
            )                                                 AS satisfied_in_group
        FROM course_prerequisites cp
        JOIN courses c_prereq ON c_prereq.id = cp.prereq_course_id
        GROUP BY cp.course_id, cp.group_id
    ),
    unlocked_ids AS (
        -- A course is unlocked when any one group is 100% satisfied
        SELECT DISTINCT course_id
        FROM group_satisfaction
        WHERE satisfied_in_group = total_in_group
    )
    SELECT c.course_code, c.title AS course_title
    FROM unlocked_ids u
    JOIN courses c ON c.id = u.course_id
    WHERE upper(c.course_code) NOT IN (SELECT code FROM completed)
    ORDER BY c.course_code;
$$;

COMMENT ON FUNCTION public.get_unlocked_by(TEXT[]) IS
'Returns courses that are newly unlocked by the supplied set of completed course codes.
A course is unlocked when at least one prerequisite group_id has all its edges satisfied.
Already-completed courses are excluded from the result.
Powers "What''s next for me?" — pass completed course codes from client localStorage until
user_profiles lands.';


-- ---------------------------------------------------------------------------
-- Grant public access to all three RPCs
-- ---------------------------------------------------------------------------
GRANT EXECUTE ON FUNCTION public.get_forward_prereqs(TEXT)  TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_downstream(TEXT)        TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_unlocked_by(TEXT[])     TO anon, authenticated;


-- ---------------------------------------------------------------------------
-- Extend data_imports.source CHECK to include 'prereq-seed'
-- (The original constraint only allowed 'courses', 'professors', 'jobs')
-- ---------------------------------------------------------------------------
ALTER TABLE public.data_imports
    DROP CONSTRAINT data_imports_source_check;

ALTER TABLE public.data_imports
    ADD CONSTRAINT data_imports_source_check
    CHECK (source IN ('courses', 'professors', 'jobs', 'prereq-seed'));

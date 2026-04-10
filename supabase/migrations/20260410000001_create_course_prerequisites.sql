-- Migration: 20260410000001_create_course_prerequisites.sql
-- Edge table: one row per (course → prerequisite) directed edge.
-- group_id discriminates AND vs OR: edges sharing the same group_id on the same
-- course_id are ANDed; at least ONE group must be fully satisfied to unlock the course.
-- Example: "C requires (A AND B) OR D" → {C,A,group=1}, {C,B,group=1}, {C,D,group=2}

CREATE TABLE public.course_prerequisites (
    id               UUID     PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id        UUID     NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    prereq_course_id UUID     NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    group_id         SMALLINT NOT NULL DEFAULT 1,
    is_corequisite   BOOLEAN  NOT NULL DEFAULT false,
    source           TEXT     NOT NULL DEFAULT 'static-degree-file',
    notes            TEXT,
    created_at       TIMESTAMPTZ DEFAULT now(),
    UNIQUE(course_id, prereq_course_id, group_id)
);

CREATE INDEX idx_cp_course_id       ON public.course_prerequisites(course_id);
CREATE INDEX idx_cp_prereq_course_id ON public.course_prerequisites(prereq_course_id);

ALTER TABLE public.course_prerequisites ENABLE ROW LEVEL SECURITY;

CREATE POLICY cp_public_read ON public.course_prerequisites
    FOR SELECT USING (true);

CREATE POLICY cp_service_role_all ON public.course_prerequisites
    FOR ALL TO service_role USING (true) WITH CHECK (true);

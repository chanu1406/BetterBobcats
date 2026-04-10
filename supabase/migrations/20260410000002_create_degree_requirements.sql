-- Migration: 20260410000002_create_degree_requirements.sql
-- Holds category nodes that appear in degree graphs but don't correspond to
-- real DB courses (GenEd slots, elective placeholders, WRI upper-div, etc.).
-- Kept separate from courses so the /courses listing stays clean.

CREATE TABLE public.degree_requirements (
    id              UUID     PRIMARY KEY DEFAULT gen_random_uuid(),
    degree_slug     TEXT     NOT NULL,  -- e.g. "cs-cse"
    requirement_key TEXT     NOT NULL,  -- static ID from courses.ts, e.g. "gened-a-life"
    display_code    TEXT     NOT NULL,  -- e.g. "GenED A-Life"
    display_name    TEXT     NOT NULL,
    year            SMALLINT,
    semester        TEXT,               -- "fall" | "spring"
    created_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(degree_slug, requirement_key)
);

ALTER TABLE public.degree_requirements ENABLE ROW LEVEL SECURITY;

CREATE POLICY dr_public_read ON public.degree_requirements
    FOR SELECT USING (true);

CREATE POLICY dr_service_role_all ON public.degree_requirements
    FOR ALL TO service_role USING (true) WITH CHECK (true);

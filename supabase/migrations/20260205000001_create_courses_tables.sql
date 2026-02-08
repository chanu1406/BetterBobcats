-- Create courses tables for BetterBobcats
-- Migration: 20260205000001_create_courses_tables.sql

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code TEXT NOT NULL,           -- e.g., "CSE 120", "MATH 32"
    course_number TEXT NOT NULL,         -- e.g., "120", "32"
    title TEXT NOT NULL,                 -- e.g., "Software Engineering"
    subject_code TEXT NOT NULL,          -- e.g., "CSE", "MATH"
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    credits INTEGER,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(course_code)
);

-- Course sections table (specific offerings per term)
CREATE TABLE IF NOT EXISTS public.course_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    crn TEXT NOT NULL,                   -- Course Reference Number
    term TEXT NOT NULL,                  -- e.g., "202510" (Spring 2025)
    section_number TEXT,                 -- e.g., "01", "02"
    -- Schedule info
    meeting_days TEXT,                   -- e.g., "MWF", "TR"
    start_time TEXT,                     -- e.g., "09:00"
    end_time TEXT,                       -- e.g., "09:50"
    building TEXT,
    room TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(crn, term)
);

-- Professor-Course sections junction table
CREATE TABLE IF NOT EXISTS public.professor_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professor_id UUID NOT NULL REFERENCES public.professors(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES public.course_sections(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(professor_id, section_id)
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_courses_subject_code ON public.courses(subject_code);
CREATE INDEX IF NOT EXISTS idx_courses_department_id ON public.courses(department_id);
CREATE INDEX IF NOT EXISTS idx_course_sections_course_id ON public.course_sections(course_id);
CREATE INDEX IF NOT EXISTS idx_course_sections_term ON public.course_sections(term);
CREATE INDEX IF NOT EXISTS idx_professor_sections_professor_id ON public.professor_sections(professor_id);
CREATE INDEX IF NOT EXISTS idx_professor_sections_section_id ON public.professor_sections(section_id);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professor_sections ENABLE ROW LEVEL SECURITY;

-- Public read access policies (drop first so migration is idempotent)
DROP POLICY IF EXISTS "Allow public read access on courses" ON public.courses;
CREATE POLICY "Allow public read access on courses"
    ON public.courses FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow public read access on course_sections" ON public.course_sections;
CREATE POLICY "Allow public read access on course_sections"
    ON public.course_sections FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow public read access on professor_sections" ON public.professor_sections;
CREATE POLICY "Allow public read access on professor_sections"
    ON public.professor_sections FOR SELECT
    USING (true);

-- Allow service role full access for data import
DROP POLICY IF EXISTS "Allow service role full access on courses" ON public.courses;
CREATE POLICY "Allow service role full access on courses"
    ON public.courses FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access on course_sections" ON public.course_sections;
CREATE POLICY "Allow service role full access on course_sections"
    ON public.course_sections FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access on professor_sections" ON public.professor_sections;
CREATE POLICY "Allow service role full access on professor_sections"
    ON public.professor_sections FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- View for easy querying of courses with professor info
CREATE OR REPLACE VIEW public.courses_with_professors AS
SELECT 
    c.id as course_id,
    c.course_code,
    c.title,
    c.subject_code,
    c.credits,
    c.description,
    cs.id as section_id,
    cs.crn,
    cs.term,
    cs.section_number,
    cs.meeting_days,
    cs.start_time,
    cs.end_time,
    cs.building,
    cs.room,
    p.id as professor_id,
    p.first_name as professor_first_name,
    p.last_name as professor_last_name,
    p.avg_rating as professor_rating,
    p.avg_difficulty as professor_difficulty,
    p.num_ratings as professor_num_ratings,
    ps.is_primary
FROM public.courses c
LEFT JOIN public.course_sections cs ON cs.course_id = c.id
LEFT JOIN public.professor_sections ps ON ps.section_id = cs.id
LEFT JOIN public.professors p ON p.id = ps.professor_id;

-- Function to get course count per subject
CREATE OR REPLACE FUNCTION public.get_subject_course_counts()
RETURNS TABLE(subject_code TEXT, course_count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT c.subject_code, COUNT(DISTINCT c.id)
    FROM public.courses c
    GROUP BY c.subject_code
    ORDER BY c.subject_code;
END;
$$ LANGUAGE plpgsql STABLE;

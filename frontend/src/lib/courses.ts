import { createClient } from "@/lib/supabase/browser";

// UC Merced subject code to full name mapping
export const SUBJECT_NAMES: Record<string, string> = {
    "AE": "Aerospace Engineering",
    "ANTH": "Anthropology",
    "BCME": "Biochemical & Biomolecular Eng",
    "BIOE": "Bioengineering",
    "BIO": "Biological Sciences",
    "CHEM": "Chemistry",
    "CCST": "Chicano/Chicana Studies",
    "CEE": "Civil and Environmental Engr",
    "COGS": "Cognitive Science",
    "COMM": "Communication and Media",
    "CRS": "Community Research and Service",
    "CSE": "Computer Science & Engineering",
    "CRES": "Critical Race & Ethnic Studies",
    "DSA": "Data Science & Analytics",
    "DSC": "Data Science & Computing",
    "ECON": "Economics",
    "EDUC": "Education",
    "EECS": "Elect. Engr. & Comp. Sci.",
    "EE": "Electrical Engineering",
    "ENGR": "Engineering",
    "ENG": "English",
    "EH": "Environmental Humanities",
    "ES": "Environmental Systems (GR)",
    "ESS": "Environmental Systems Science",
    "FRE": "French",
    "GASP": "Global Arts Studies Program",
    "HS": "Heritage Studies",
    "HIST": "History",
    "IH": "Interdisciplinary Humanities",
    "JPN": "Japanese",
    "MGMT": "Management",
    "MBSE": "Materials & BioMat Sci & Engr",
    "MSE": "Materials Science & Engr",
    "MATH": "Mathematics",
    "ME": "Mechanical Engineering",
    "MIST": "Mgmt of Innov, Sust, and Tech",
    "NSED": "Natural Sciences Education",
    "PHIL": "Philosophy",
    "PHYS": "Physics",
    "POLI": "Political Science",
    "PSY": "Psychology",
    "PH": "Public Health",
    "QSB": "Quantitative & Systems Biology",
    "ROTC": "Reserve Officers' Training Corps",
    "SOC": "Sociology",
    "SPAN": "Spanish",
    "SPRK": "Spark",
    "USTU": "Undergraduate Studies",
    "WRI": "Writing",
};

export interface CourseSubject {
    subject_code: string;
    subject_name: string;
    course_count: number;
}

export interface CourseWithProfessor {
    id: string;
    course_code: string;
    course_number: string;
    title: string;
    subject_code: string;
    credits: number | null;
    professor_id: string | null;
    professor_first_name: string | null;
    professor_last_name: string | null;
    professor_rating: number | null;
    professor_photo_url: string | null;
    section_id: string | null;
    meeting_days: string | null;
    start_time: string | null;
    end_time: string | null;
}

export interface CourseSection {
    id: string;
    crn: string;
    term: string;
    section_number: string | null;
    meeting_days: string | null;
    start_time: string | null;
    end_time: string | null;
    building: string | null;
    room: string | null;
}

export interface CourseProfessor {
    id: string;
    first_name: string;
    last_name: string;
    avg_rating: number | null;
    avg_difficulty: number | null;
    num_ratings: number;
    is_primary: boolean;
}

export interface CourseDetail {
    id: string;
    course_code: string;
    course_number: string;
    title: string;
    subject_code: string;
    credits: number | null;
    description: string | null;
    sections: CourseSection[];
    professors: CourseProfessor[];
}

export interface CoursesResponse {
    courses: CourseWithProfessor[];
    totalCount: number;
}

/**
 * Fetch all subjects with course counts
 */
export async function fetchSubjects(): Promise<CourseSubject[]> {
    const supabase = createClient();

    // Get all courses and count by subject
    const { data, error } = await supabase
        .from("courses")
        .select("subject_code")
        .limit(10000);

    if (error) {
        console.error("Error fetching subjects:", error);
        throw new Error(`Failed to fetch subjects: ${error.message}`);
    }

    // Count courses per subject
    const subjectCounts: Record<string, number> = {};
    for (const row of data || []) {
        const code = row.subject_code;
        subjectCounts[code] = (subjectCounts[code] || 0) + 1;
    }

    // Convert to array and sort
    return Object.entries(subjectCounts)
        .map(([subject_code, course_count]) => ({
            subject_code,
            subject_name: SUBJECT_NAMES[subject_code] || subject_code,
            course_count,
        }))
        .sort((a, b) => a.subject_code.localeCompare(b.subject_code));
}

/**
 * Fetch courses with optional filtering
 */
export async function fetchCourses(options?: {
    subject?: string | null;
    search?: string | null;
    term?: string | null;
    page?: number;
    pageSize?: number;
}): Promise<CoursesResponse> {
    const supabase = createClient();

    const {
        subject,
        search,
        term,
        page = 1,
        pageSize = 100,
    } = options || {};

    // Use the view for easier querying
    let query = supabase
        .from("courses_with_professors")
        .select("*", { count: "exact" });

    // Filter by subject
    if (subject) {
        query = query.eq("subject_code", subject.toUpperCase());
    }

    // Filter by term
    if (term) {
        query = query.eq("term", term);
    }

    // Search by course code or title
    if (search) {
        query = query.or(`course_code.ilike.%${search}%,title.ilike.%${search}%`);
    }

    // Order by course code
    query = query.order("course_code");

    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching courses:", error);
        throw new Error(`Failed to fetch courses: ${error.message}`);
    }

    // Deduplicate courses (may have multiple sections)
    const seenCourses = new Set<string>();
    const courses: CourseWithProfessor[] = [];

    for (const row of data || []) {
        const courseId = row.course_id;
        if (seenCourses.has(courseId)) continue;
        seenCourses.add(courseId);

        courses.push({
            id: courseId,
            course_code: row.course_code,
            course_number: row.course_code?.split(" ")[1] || "",
            title: row.title,
            subject_code: row.subject_code,
            credits: row.credits,
            professor_id: row.professor_id,
            professor_first_name: row.professor_first_name,
            professor_last_name: row.professor_last_name,
            professor_rating: row.professor_rating,
            professor_photo_url: row.professor_photo_url || null,
            section_id: row.section_id,
            meeting_days: row.meeting_days,
            start_time: row.start_time,
            end_time: row.end_time,
        });
    }

    return {
        courses,
        totalCount: count || courses.length,
    };
}

/**
 * Fetch a single course by ID
 */
export async function fetchCourse(id: string): Promise<CourseDetail | null> {
    const supabase = createClient();

    // Get base course info
    const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

    if (courseError || !courseData) {
        console.error("Error fetching course:", courseError);
        return null;
    }

    // Get all sections
    const { data: sectionsData } = await supabase
        .from("course_sections")
        .select("*")
        .eq("course_id", id)
        .order("term", { ascending: false });

    const sections: CourseSection[] = (sectionsData || []).map((s) => ({
        id: s.id,
        crn: s.crn,
        term: s.term,
        section_number: s.section_number,
        meeting_days: s.meeting_days,
        start_time: s.start_time,
        end_time: s.end_time,
        building: s.building,
        room: s.room,
    }));

    // Get professors via professor_sections
    const sectionIds = sections.map((s) => s.id);
    const professors: CourseProfessor[] = [];

    if (sectionIds.length > 0) {
        const { data: profData } = await supabase
            .from("professor_sections")
            .select("*, professors(*)")
            .in("section_id", sectionIds);

        const seenProfs = new Set<string>();
        for (const row of profData || []) {
            const prof = row.professors;
            if (prof && !seenProfs.has(prof.id)) {
                seenProfs.add(prof.id);
                professors.push({
                    id: prof.id,
                    first_name: prof.first_name || "",
                    last_name: prof.last_name || "",
                    avg_rating: prof.avg_rating,
                    avg_difficulty: prof.avg_difficulty,
                    num_ratings: prof.num_ratings || 0,
                    is_primary: row.is_primary ?? true,
                });
            }
        }
    }

    return {
        id: courseData.id,
        course_code: courseData.course_code,
        course_number: courseData.course_number,
        title: courseData.title,
        subject_code: courseData.subject_code,
        credits: courseData.credits,
        description: courseData.description,
        sections,
        professors,
    };
}

/**
 * Format time from "1300" to "1:00 PM"
 */
export function formatTime(time: string | null): string {
    if (!time || time.length < 4) return "";
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = time.substring(2, 4);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Format meeting days for display
 */
export function formatDays(days: string | null): string {
    if (!days) return "";
    return days
        .replace("M", "Mon ")
        .replace("T", "Tue ")
        .replace("W", "Wed ")
        .replace("R", "Thu ")
        .replace("F", "Fri ")
        .trim();
}

/**
 * Fetch courses taught by a specific professor
 */
export async function fetchCoursesByProfessor(professorId: string): Promise<CourseSummary[]> {
    const supabase = createClient();

    // Get sections taught by this professor
    const { data: sectionData, error: sectionError } = await supabase
        .from("professor_sections")
        .select("section_id")
        .eq("professor_id", professorId);

    if (sectionError || !sectionData?.length) {
        return [];
    }

    const sectionIds = sectionData.map((s) => s.section_id);

    // Get course IDs from sections
    const { data: courseData, error: courseError } = await supabase
        .from("course_sections")
        .select("course_id")
        .in("id", sectionIds);

    if (courseError || !courseData?.length) {
        return [];
    }

    const courseIds = [...new Set(courseData.map((c) => c.course_id))];

    // Get course details
    const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .in("id", courseIds)
        .order("course_code");

    if (coursesError || !courses) {
        return [];
    }

    return courses.map((c) => ({
        id: c.id,
        course_code: c.course_code,
        course_number: c.course_number,
        title: c.title,
        subject_code: c.subject_code,
        credits: c.credits,
    }));
}

export interface CourseSummary {
    id: string;
    course_code: string;
    course_number: string;
    title: string;
    subject_code: string;
    credits: number | null;
}

// Professor info for department carousel
export interface DepartmentProfessor {
    id: string;
    first_name: string;
    last_name: string;
    avg_rating: number | null;
    num_ratings: number;
    photo_url: string | null;
}

/**
 * Fetch professors teaching courses in a department
 */
export async function fetchDepartmentProfessors(
    subjectCode: string
): Promise<DepartmentProfessor[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("courses_with_professors")
        .select(
            "professor_id, professor_first_name, professor_last_name, professor_rating, professor_num_ratings, professor_photo_url"
        )
        .eq("subject_code", subjectCode.toUpperCase())
        .not("professor_id", "is", null);

    if (error || !data) {
        console.error("Error fetching department professors:", error);
        return [];
    }

    // Deduplicate professors and collect unique
    const profMap = new Map<string, DepartmentProfessor>();
    for (const row of data) {
        if (!row.professor_id || profMap.has(row.professor_id)) continue;
        profMap.set(row.professor_id, {
            id: row.professor_id,
            first_name: row.professor_first_name || "",
            last_name: row.professor_last_name || "",
            avg_rating: row.professor_rating,
            num_ratings: row.professor_num_ratings || 0,
            photo_url: row.professor_photo_url || null,
        });
    }

    // Sort by rating (highest first)
    return Array.from(profMap.values()).sort(
        (a, b) => (b.avg_rating || 0) - (a.avg_rating || 0)
    );
}

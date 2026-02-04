import { createClient } from "@/lib/supabase/browser";

export interface Professor {
    id: string;
    first_name: string;
    last_name: string;
    department_name: string | null;
    avg_rating: number | null;
    avg_difficulty: number | null;
    num_ratings: number;
    would_take_again_percent: number | null;
}

export interface Department {
    id: string;
    name: string;
    slug: string;
    professor_count: number;
}

export interface ProfessorsResponse {
    professors: Professor[];
    totalCount: number;
}

/**
 * Fetch all departments with professor counts
 */
export async function fetchDepartments(): Promise<Department[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("departments")
        .select("*")
        .order("name");

    if (error) {
        console.error("Error fetching departments:", error);
        throw new Error(`Failed to fetch departments: ${error.message}`);
    }

    return data || [];
}

/**
 * Fetch professors with optional filtering
 */
export async function fetchProfessors(options?: {
    departmentSlug?: string | null;
    search?: string | null;
    sortBy?: "rating" | "difficulty" | "name" | "num_ratings";
    sortOrder?: "asc" | "desc";
    page?: number;
    pageSize?: number;
}): Promise<ProfessorsResponse> {
    const supabase = createClient();

    const {
        departmentSlug,
        search,
        sortBy = "rating",
        sortOrder = "desc",
        page = 1,
        pageSize = 20,
    } = options || {};

    let query = supabase.from("professors").select("*", { count: "exact" });

    // Filter by department
    if (departmentSlug) {
        // Get department ID from slug
        const { data: dept } = await supabase
            .from("departments")
            .select("id")
            .eq("slug", departmentSlug)
            .single();

        if (dept) {
            query = query.eq("department_id", dept.id);
        }
    }

    // Search by name
    if (search) {
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
    }

    // Sorting
    const sortColumn = {
        rating: "avg_rating",
        difficulty: "avg_difficulty",
        name: "last_name",
        num_ratings: "num_ratings",
    }[sortBy];

    query = query.order(sortColumn, { ascending: sortOrder === "asc", nullsFirst: false });

    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching professors:", error);
        throw new Error(`Failed to fetch professors: ${error.message}`);
    }

    return {
        professors: data || [],
        totalCount: count || 0,
    };
}

/**
 * Fetch a single professor by ID
 */
export async function fetchProfessor(id: string): Promise<Professor | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("professors")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching professor:", error);
        return null;
    }

    return data;
}

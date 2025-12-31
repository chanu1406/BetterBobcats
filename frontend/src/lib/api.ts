/**
 * API Client
 * Handles all backend API communication
 */

import { Course } from "@/types/course";
import { TierCourse } from "@/types/careerPath";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Fetch all courses from the backend
 */
export async function fetchCourses(): Promise<Course[]> {
  const response = await fetch(`${API_BASE_URL}/api/courses/`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Transform snake_case from backend to camelCase for frontend
  return data.map((course: any) => ({
    id: course.id,
    code: course.code,
    name: course.name,
    fullName: course.full_name,
    year: course.year,
    semester: course.semester,
    prerequisites: course.prerequisites || [],
    isCategory: course.is_category,
    category: course.category,
  }));
}

/**
 * Fetch a specific course by ID
 */
export async function fetchCourseById(courseId: string): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Course '${courseId}' not found`);
    }
    throw new Error(`Failed to fetch course: ${response.statusText}`);
  }
  
  const course = await response.json();
  
  return {
    id: course.id,
    code: course.code,
    name: course.name,
    fullName: course.full_name,
    year: course.year,
    semester: course.semester,
    prerequisites: course.prerequisites || [],
    isCategory: course.is_category,
    category: course.category,
  };
}

/**
 * Fetch career path configuration with tier courses
 */
export async function fetchCareerPath(careerPath: string) {
  const response = await fetch(`${API_BASE_URL}/api/careers/${careerPath}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Career path '${careerPath}' not found`);
    }
    throw new Error(`Failed to fetch career path: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Transform snake_case from backend to camelCase for frontend
  return {
    rootLabel: data.root_label || data.rootLabel,
    categories: data.categories || [],
    courses: (data.courses || []).map((course: any) => ({
      id: course.id,
      code: course.code,
      name: course.name,
      fullName: course.full_name || course.fullName,
      description: course.description,
      resources: course.resources,
      tier: course.tier,
      prerequisites: course.prerequisites,
      expandedInfo: course.expanded_info || course.expandedInfo ? {
        credits: course.expanded_info?.credits || course.expandedInfo?.credits,
        prerequisites: course.expanded_info?.prerequisites || course.expandedInfo?.prerequisites,
        learningOutcomes: course.expanded_info?.learning_outcomes || course.expandedInfo?.learningOutcomes,
        topics: course.expanded_info?.topics || course.expandedInfo?.topics,
        careerRelevance: course.expanded_info?.career_relevance || course.expandedInfo?.careerRelevance,
        additionalNotes: course.expanded_info?.additional_notes || course.expandedInfo?.additionalNotes,
      } : undefined,
    })),
    categoryIntros: data.category_intros || data.categoryIntros,
  };
}

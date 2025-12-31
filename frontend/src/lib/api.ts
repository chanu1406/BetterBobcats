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
 * Fetch career path tier courses
 * TODO: Implement when backend endpoint is ready
 */
export async function fetchCareerPathTiers(careerPath: string): Promise<TierCourse[]> {
  // Placeholder for future implementation
  throw new Error("Career path API not yet implemented");
}

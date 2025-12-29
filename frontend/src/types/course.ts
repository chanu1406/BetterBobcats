/**
 * Course Type Definition
 * Defines the structure for courses and prerequisite graph data
 */

export type Semester = "fall" | "spring";
export type AcademicYear = 1 | 2 | 3 | 4;

export interface Course {
  id: string;
  code: string;
  name: string;
  fullName: string;
  year: AcademicYear;
  semester: Semester;
  prerequisites: string[]; // Array of course IDs
  isCategory?: boolean; // True for GenEd/Elective category nodes
  category?: string; // Category name: "Math", "Writing", "Physics", "Spark", "Engineering", "CSE"
}

export interface CourseGraph {
  courses: Course[];
}


/**
 * Career Path Type Definitions
 * Shared types for career path visualizations across all degrees
 */

export interface TierCourse {
  id: string;
  code: string;
  name: string;
  fullName: string;
  description: string; // Why it's critical for this career path
  resources?: string[]; // Optional: bullet points for resources
  tier: number; // Tier number (1, 2, 3, etc.)
  prerequisites?: string[]; // Optional: array of course IDs that this course requires
  
  /**
   * Expanded card information (shown when course node is clicked)
   * This information appears in a modal overlay when users click on a course node in the graph.
   * All fields are optional - include only what's relevant for each course.
   */
  expandedInfo?: {
    credits?: number; // Number of credits for the course
    prerequisites?: string; // Human-readable prerequisites (e.g., "CSE 30 or equivalent programming experience")
    learningOutcomes?: string[]; // Array of learning outcomes (what students will learn)
    topics?: string[]; // Array of topics covered in the course
    careerRelevance?: string; // How this course relates to the career path
    realWorldApplications?: string[]; // Examples of how this course is used in industry/real-world scenarios
    resources?: {
      videos?: string[]; // YouTube links, video tutorials, online courses
      websites?: string[]; // Documentation, articles, official sites, helpful resources
      tools?: string[]; // Software, tools, platforms used in the course
    };
    additionalNotes?: string; // Any additional information about the course
  };
}

export interface CareerPathCategory {
  id: string; // Unique identifier (e.g., "tier-1", "tier-2")
  label: string; // Display label (e.g., "TIER 1: MUST-TAKE for SWE")
  emoji?: string; // Optional emoji prefix (e.g., "🟢")
}

export interface CareerPathConfig {
  rootLabel: string; // Label for root node (e.g., "SWE", "Cybersecurity")
  categories: CareerPathCategory[]; // Array of category/tier definitions
  courses: TierCourse[]; // All courses for this career path
  categoryIntros?: Record<string, string>; // Optional: intro text for categories
}


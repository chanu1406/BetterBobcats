/**
 * Mechanical Design Engineer Career Path Configuration
 * Configures the career path graph visualization for Mechanical Design
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const mechanicalDesignCareerPathConfig: CareerPathConfig = {
  rootLabel: "Mechanical Design Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONGLY PREFERRED", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL / BONUS", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "Core design, CAE, FEA, materials, and structural analysis courses essential for mechanical design careers.",
    "tier-2": "Manufacturing, tribology, CAD modeling, and quality control courses that strengthen design engineering skills.",
    "tier-3": "Specialized topics in nano-fabrication, microscopy, and technical writing for advanced design roles.",
  },
};

/**
 * Embedded Systems & Robotics Career Path Configuration
 * Configures the career path graph visualization
 * 
 * NOTE: This is a placeholder. Configuration will be added later.
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const embeddedSystemsEECareerPathConfig: CareerPathConfig = {
  rootLabel: "Embedded Systems & Robotics",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: PREFERABLE", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "Essential courses for Embedded Systems & Robotics roles.",
    "tier-2": "Recommended courses that strengthen your profile.",
    "tier-3": "Additional courses that may be beneficial.",
  },
};

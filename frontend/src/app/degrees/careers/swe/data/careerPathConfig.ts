/**
 * SWE Career Path Configuration
 * Configures the career path graph visualization for Software Engineering
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const sweCareerPathConfig: CareerPathConfig = {
  rootLabel: "SWE",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE for SWE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG SWE BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SWE-ADJACENT (Optional / Interest-Based)", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "These are the **highest ROI courses** for SWE jobs and internships. If a student can only take **4-6 electives**, these should dominate.",
  },
};


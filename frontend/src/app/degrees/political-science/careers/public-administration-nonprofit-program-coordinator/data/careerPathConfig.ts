/**
 * Public Administration / Nonprofit Program Coordinator Career Path Configuration
 * Configures the career path graph visualization for Public Administration / Nonprofit Program Coordinator
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const publicAdministrationNonprofitProgramCoordinatorCareerPathConfig: CareerPathConfig = {
  rootLabel: "Public Administration / Nonprofit Program Coordinator",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: PREFERABLE", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
};

/**
 * Manufacturing / Industrial Engineer Career Path Configuration
 * Configures the career path graph visualization for Manufacturing / Industrial Engineering
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const manufacturingIndustrialCareerPathConfig: CareerPathConfig = {
  rootLabel: "Manufacturing / Industrial Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONGLY RECOMMENDED", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL / DEPTH", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "Core manufacturing processes, quality control, statistical analysis, economic analysis, and capstone design - foundational courses for manufacturing and industrial engineering careers.",
    "tier-2": "Instrumentation, electrical systems, information systems, and sustainable manufacturing - strongly recommended for comprehensive manufacturing engineering expertise.",
    "tier-3": "Electrical machines, power systems, and organizational behavior - optional depth courses for specialized industrial applications and leadership.",
  },
};

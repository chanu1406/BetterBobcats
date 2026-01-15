/**
 * Power Systems Career Path Configuration
 * Configures the career path graph visualization for Power Systems & Energy
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const powerSystemsCareerPathConfig: CareerPathConfig = {
  rootLabel: "Power Systems & Energy",
  categories: [
    { id: "tier-1", label: "TIER 1: ESSENTIAL POWER FOUNDATIONS", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: ADVANCED POWER TOPICS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: ENRICHMENT (Optional)", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "These are the **highest priority courses** for power systems and energy careers. Core knowledge that utilities, grid operators, and energy companies expect.",
    "tier-2": "These courses deepen power engineering expertise and make you stand out in specialized roles like renewable energy, smart grids, and advanced control.",
    "tier-3": "Good for well-rounded engineers but not essential for power systems careers. Consider if aligned with personal interests.",
  },
};

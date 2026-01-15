/**
 * Energy Systems / Power / Sustainability Engineer Career Path Configuration
 * Configures the career path graph visualization for Energy Systems / Power / Sustainability
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const energySustainabilityCareerPathConfig: CareerPathConfig = {
  rootLabel: "Energy Systems / Power / Sustainability Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: PREFERRED", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "Core thermodynamics, heat transfer, and energy physics courses essential for understanding energy conversion and sustainability.",
    "tier-2": "Advanced courses in energy storage, fuel cells, electrical machines, and power electronics that strengthen sustainable energy expertise.",
    "tier-3": "Specialized courses in power systems and electric vehicle design for utility-scale and transportation electrification applications.",
  },
};

/**
 * Aerospace / Defense Engineer Career Path Configuration
 * Configures the career path graph visualization for Aerospace / Defense
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const aerospaceDefenseCareerPathConfig: CareerPathConfig = {
  rootLabel: "Aerospace / Defense Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: PREFERRED", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "Core aerospace courses covering structures, flight dynamics, propulsion, aerodynamics, and computational tools essential for defense and aerospace careers.",
    "tier-2": "Advanced courses in aeroelasticity, dynamics, vibration, and control systems that strengthen aerospace engineering expertise.",
    "tier-3": "Specialized courses in electromagnetics and instrumentation for defense systems and experimental aerospace applications.",
  },
};

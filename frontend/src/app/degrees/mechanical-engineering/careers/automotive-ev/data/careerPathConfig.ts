/**
 * Automotive / EV / Autonomous Engineer Career Path Configuration
 * Configures the career path graph visualization for Automotive / EV / Autonomous Engineering
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const automotiveEVCareerPathConfig: CareerPathConfig = {
  rootLabel: "Automotive / EV / Autonomous Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONGLY RECOMMENDED", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL / ADVANCED", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "Core vehicle dynamics, electric propulsion, power electronics, and electrical machines - essential foundation for automotive and EV engineering careers.",
    "tier-2": "Aerodynamics, autonomous systems, control theory, and mechatronics - strongly recommended for comprehensive automotive engineering expertise.",
    "tier-3": "Advanced topics in flight dynamics, CFD, and digital twins - optional depth courses for specialized automotive applications.",
  },
};

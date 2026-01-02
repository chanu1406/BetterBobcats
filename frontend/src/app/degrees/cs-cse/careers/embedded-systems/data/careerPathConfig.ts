/**
 * Embedded Systems Engineering Career Path Configuration
 * Configures the career path graph visualization for Embedded Systems Engineering
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier1_5Courses, tier2Courses, tier2_5Courses, tier3Courses } from "./tierCourses";

export const embeddedSystemsCareerPathConfig: CareerPathConfig = {
  rootLabel: "Embedded Systems Engineering",
  categories: [
    { id: "tier-1", label: "TIER 1: NON-NEGOTIABLE CORE (EMBEDDED SYSTEMS)", emoji: "🟢" },
    { id: "tier-1-5", label: "TIER 1.5: ELECTRICAL ENGINEERING CORE (HARDWARE SIDE)", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: EMBEDDED-FOCUSED EECS & SYSTEMS", emoji: "🟡" },
    { id: "tier-2-5", label: "TIER 2.5: MECHANICAL ENGINEERING (CONTROL & MECHATRONICS)", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SPECIALIZATION / NICHE (OPTIONAL)", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier1_5Courses, ...tier2Courses, ...tier2_5Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "These are the **non-negotiable core courses** for embedded systems. If a student skips these, they are not embedded-ready. This ensures students can write correct, efficient, low-level code.",
    "tier-1-5": "This is where embedded engineers separate themselves from pure CS students. These courses build hardware intuition, which is non-optional for embedded work.",
    "tier-2": "These courses turn students into job-ready embedded engineers. These map directly to IoT, robotics, and smart systems roles.",
    "tier-2-5": "Optional, but extremely powerful for robotics and cyber-physical systems. These are ideal for robotics, drones, autonomous systems.",
    "tier-3": "Specialization and niche courses that are optional but valuable for specific embedded systems applications.",
  },
};


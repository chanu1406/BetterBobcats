/**
 * Systems / Infrastructure Engineering Career Path Configuration
 * Configures the career path graph visualization for Systems / Infrastructure Engineering
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses, tier4Courses, tier5Courses } from "./tierCourses";

export const systemsInfraCareerPathConfig: CareerPathConfig = {
  rootLabel: "Systems / Infrastructure Engineering",
  categories: [
    { id: "tier-1", label: "TIER 1: NON-NEGOTIABLE CORE (SYSTEMS ENGINEERING)", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: SYSTEMS HARDWARE CORE (ELECTRICAL ENGINEERING)", emoji: "🟢" },
    { id: "tier-3", label: "TIER 3: ADVANCED SYSTEMS & INFRASTRUCTURE", emoji: "🟡" },
    { id: "tier-4", label: "TIER 4: SYSTEMS THINKING & CONTROL (MECHANICAL ENGINEERING)", emoji: "🟡" },
    { id: "tier-5", label: "TIER 5: SECURITY & RELIABILITY (OPTIONAL BUT POWERFUL)", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses, ...tier4Courses, ...tier5Courses],
  categoryIntros: {
    "tier-1": "These are the **non-negotiable core courses** for systems engineering. If a student does not take most of these, they are not systems-ready.",
    "tier-2": "These electrical engineering courses are what make UCM systems engineers stand out. Foundational hardware knowledge that sets you apart.",
    "tier-3": "These advanced systems courses separate junior systems engineers from elite ones. High-impact systems knowledge for FAANG-level infrastructure roles.",
    "tier-4": "Mechanical engineering courses focused on systems thinking and control. Not for everyone — high payoff if chosen carefully. Helpful for robotics systems, embedded infra, and cyber-physical systems.",
    "tier-5": "Security and reliability courses that are optional but powerful. These help build secure infrastructure and ensure system correctness.",
  },
};


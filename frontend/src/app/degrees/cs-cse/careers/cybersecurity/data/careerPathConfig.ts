/**
 * Cybersecurity Career Path Configuration
 * Configures the career path graph visualization for Cybersecurity
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const cybersecurityCareerPathConfig: CareerPathConfig = {
  rootLabel: "Cybersecurity",
  categories: [
    { id: "tier-1", label: "TIER 1: ESSENTIAL SECURITY FOUNDATIONS", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: ADVANCED SECURITY TOPICS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SECURITY-ADJACENT (Optional)", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "These are the **highest priority courses** for cybersecurity careers. Core security knowledge that employers expect.",
    "tier-2": "These courses deepen security expertise and make you stand out in specialized security roles.",
    "tier-3": "Good if aligned with interests, not required for cybersecurity but helpful for well-rounded security engineers.",
  },
};

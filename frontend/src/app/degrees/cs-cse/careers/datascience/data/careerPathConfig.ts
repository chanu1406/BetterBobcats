/**
 * Data Science Career Path Configuration
 * Configures the career path graph visualization for Data Science
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses, tier4Courses } from "./tierCourses";

export const dataScienceCareerPathConfig: CareerPathConfig = {
  rootLabel: "Data Science / Data Analytics",
  categories: [
    {
      id: "tier-1",
      label: "TIER 1: NON-NEGOTIABLE CORE (DATA SCIENCE)",
      emoji: "🟢",
    },
    {
      id: "tier-2",
      label: "TIER 2: HIGH-VALUE DATA SCIENCE BOOSTERS",
      emoji: "🟡",
    },
    {
      id: "tier-3",
      label: "TIER 3: ML-ADJACENT (OPTIONAL)",
      emoji: "🟠",
    },
    {
      id: "tier-4",
      label: "ETHICS & PROFESSIONAL PRACTICE",
      emoji: "🟣",
    },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses, ...tier4Courses],
  categoryIntros: {
    "tier-1":
      "**Core Data Science + Mathematics Foundation.** If a student skips these, they are not data-science ready. Essential for all Data Scientist, Data Analyst, and Business Intelligence Engineer roles.",
    "tier-2":
      "**CS Courses + Advanced Math.** These courses significantly enhance data science capabilities and make the difference between junior and mid-level data roles. Build dashboards, data products, and production systems.",
    "tier-3":
      "**ML-Adjacent Optional Courses.** Only recommended if the student wants Data Scientist (not just Analyst) roles. Opens doors to ML engineering and advanced analytics positions.",
    "tier-4":
      "**Ethics & Professional Practice.** Data science uniquely impacts people and policy. This course addresses bias, fairness, and accountability - a strong resume talking point.",
  },
};

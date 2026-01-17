import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const publicHealthCareerPathConfig: CareerPathConfig = {
  rootLabel: "Public Health Informatics & Biostatistics",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SPECIALIZED", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Biology, statistics, and data science fundamentals for health analytics and epidemiology.",
    "tier-2": "🟡 Anatomy, epidemiology, biostatistics, and programming for clinical and public health work.",
    "tier-3": "🟠 Microbiology, advanced biostatistics, genomics, and policy for specialized health research roles.",
  },
};

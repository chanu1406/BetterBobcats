import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const quantitativeEconCareerPathConfig: CareerPathConfig = {
  rootLabel: "Quantitative Economics & Financial Analytics",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SPECIALIZED", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Core econ, statistics, and data foundations for finance and econometrics work.",
    "tier-2": "🟡 Corporate finance, investments, and advanced econometrics to deepen modeling capability.",
    "tier-3": "🟠 Specialized strategy, tax, and graduate theory/econometrics for niche roles or research.",
  },
};

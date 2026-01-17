import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const governmentIntelligenceCareerPathConfig: CareerPathConfig = {
  rootLabel: "Government Intelligence & Policy Analytics",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SPECIALIZED", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Politics, NLP, statistics, and economics fundamentals for policy and text analytics.",
    "tier-2": "🟡 Comparative politics, econometrics, and programming for deep policy analysis.",
    "tier-3": "🟠 Political theory, advanced econometrics, campaign data, and data communication for strategic roles.",
  },
};

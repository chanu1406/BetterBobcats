import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const businessIntelligenceCareerPathConfig: CareerPathConfig = {
  rootLabel: "Business Intelligence & Tech Entrepreneurship",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SPECIALIZED", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Business fundamentals, data science, statistics, and BI tools for analytics roles.",
    "tier-2": "🟡 Managerial economics, marketing, econometrics, and UX for product and customer analytics.",
    "tier-3": "🟠 Industrial organization, entrepreneurship, advanced forecasting, recommender systems, and strategy.",
  },
};

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const sustainableSystemsCareerPathConfig: CareerPathConfig = {
  rootLabel: "Management of Sustainable Systems (Green Tech)",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SPECIALIZED", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Environmental science, data science, statistics, and economics for sustainability work.",
    "tier-2": "🟡 Climate science, environmental policy, green energy, and programming for impact analytics.",
    "tier-3": "🟠 Advanced environmental modeling, circular economy, clean tech innovation, and spatial analysis.",
  },
};

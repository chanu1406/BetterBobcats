import { CareerPathConfig } from "@/types/careerPath";
import { marketResearchTierCourses } from "./tierCourses";

export const marketResearchConfig: CareerPathConfig = {
  rootLabel: "Market Research Analyst",
  categories: [
    {
      id: "tier-1",
      label: "TIER 1: MUST-TAKE for Market Research",
      emoji: "🟢",
    },
    {
      id: "tier-2",
      label: "TIER 2: STRONG MARKET RESEARCH BOOSTERS",
      emoji: "🟡",
    },
    {
      id: "tier-3",
      label: "TIER 3: MARKET-ADJACENT (Specialization)",
      emoji: "🟠",
    },
  ],
  courses: marketResearchTierCourses,
  categoryIntros: {
    "tier-1":
      "Core professional requirements that integrate economic theory with psychological principles. These courses are essential for understanding consumer behavior and validating market findings.",
    "tier-2":
      "These courses transform data collectors into strategic consultants who understand the 'why' behind competitive market shifts.",
    "tier-3":
      "Highly technical electives that make you a Subject Matter Expert (SME) in specific high-growth sectors.",
  },
};

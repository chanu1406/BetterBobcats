import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const behavioralDataScienceCareerPathConfig: CareerPathConfig = {
  rootLabel: "Behavioral Data Science & Neuro-Computation",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SPECIALIZED", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Cognitive foundations, machine learning, and statistics for behavioral pattern analysis.",
    "tier-2": "🟡 Psychology, neuroscience, NLP, and programming to deepen behavioral insights.",
    "tier-3": "🟠 Advanced psychology, game theory, and graduate neuroscience for specialized research roles.",
  },
};

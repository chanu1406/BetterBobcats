/**
 * ML-AI Career Path Configuration
 * Configures the career path graph visualization for Machine Learning / AI
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const mlAiCareerPathConfig: CareerPathConfig = {
  rootLabel: "ML-AI",
  categories: [
    { 
      id: "tier-1", 
      label: "TIER 1: NON-NEGOTIABLE CORE (ML / AI)", 
      emoji: "🟢" 
    },
    { 
      id: "tier-2", 
      label: "TIER 2: HIGH-VALUE ML BOOSTERS", 
      emoji: "🟡" 
    },
    { 
      id: "tier-3", 
      label: "TIER 3: RESEARCH / GRAD-LEVEL DEPTH", 
      emoji: "🟠" 
    },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "If a student does not complete most of these, they are not ML-ready. These are the **highest priority courses** for ML/AI careers, including core CS courses and essential mathematics.",
    "tier-2": "These courses separate \"knows ML\" from \"understands ML deeply.\" They provide specialized ML knowledge and advanced mathematics that make you stand out in ML/AI roles.",
    "tier-3": "Only recommended for: Grad school, Research, Theory-heavy ML paths, Advanced Mathematics. These are research-level courses for students pursuing deep theoretical ML work.",
  },
};

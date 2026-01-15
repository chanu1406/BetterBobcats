/**
 * Signals, Communications & RF Career Path Configuration
 * Configuration for tier-based career path visualization
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const signalsRFCareerPathConfig: CareerPathConfig = {
  rootLabel: "Signals, Communications & RF",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE COURSES", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL / INTEREST", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Core wireless systems: signal processing, communications theory, electromagnetics, and RF circuit design. These are THE foundation courses for 5G, satellite, radar, and wireless IoT careers at Qualcomm, Broadcom, Nokia, Ericsson.",
    "tier-2": "🟡 Advanced RF/microwave topics: mmWave design for 5G, mixed-signal electronics, and embedded programming for wireless systems. These significantly enhance your communications and RF engineering expertise.",
    "tier-3": "🟠 High-level programming for simulation, system modeling, and test automation. Useful for link-level simulations and wireless system design, but not essential for RF hardware work.",
  },
};

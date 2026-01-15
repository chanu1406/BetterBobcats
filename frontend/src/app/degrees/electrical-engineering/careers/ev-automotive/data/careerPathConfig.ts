/**
 * Electric Vehicle & Automotive Systems Career Path Configuration
 * Configuration for tier-based career path visualization
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const evAutomotiveCareerPathConfig: CareerPathConfig = {
  rootLabel: "EV & Automotive Systems",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE COURSES", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL / INTEREST", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Core EV engineering: vehicle dynamics, power electronics, electrical machines, control systems, and battery management. These are THE foundation courses for Tesla, Rivian, GM, Ford EV careers.",
    "tier-2": "🟡 Advanced EV skills: signal processing for sensors, analog electronics for BMS, embedded programming for controllers, and vehicle communication networks. These significantly enhance your EV engineering expertise.",
    "tier-3": "🟠 High-level programming for simulation, data analysis, and testing tools. Useful for developing analysis tools and prototyping algorithms, but not essential for core EV powertrain work.",
  },
};

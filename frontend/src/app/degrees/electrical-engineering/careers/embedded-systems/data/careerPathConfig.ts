/**
 * Embedded Systems & Robotics Career Path Configuration
 * Configuration for tier-based career path visualization
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const embeddedSystemsCareerPathConfig: CareerPathConfig = {
  rootLabel: "Embedded Systems & Robotics",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE COURSES", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: STRONG BOOSTERS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL / INTEREST", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "🟢 Core embedded systems courses: digital logic, microcontrollers, signal processing, control systems, and programming. These are THE foundation courses for robotics and embedded systems careers.",
    "tier-2": "🟡 Advanced hardware skills: analog circuits for sensor conditioning, power electronics for motor drives, and electrical machines for robotics actuators. These significantly enhance your embedded engineering expertise.",
    "tier-3": "🟠 Specialized topics: wireless communication for multi-robot systems, autonomous vehicles for advanced robotics, and high-level programming for tool development. Take based on your specific interests.",
  },
};

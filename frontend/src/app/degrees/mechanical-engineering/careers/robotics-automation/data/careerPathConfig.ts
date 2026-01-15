/**
 * Robotics / Automation / Mechatronics Engineer Career Path Configuration
 * Configures the career path graph visualization for Robotics / Automation / Mechatronics
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const roboticsAutomationCareerPathConfig: CareerPathConfig = {
  rootLabel: "Robotics / Automation / Mechatronics Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: MUST-TAKE", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: PREFERRED", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: OPTIONAL", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "Core mechatronics, control systems, sensors/actuators, and embedded programming courses essential for robotics and automation careers.",
    "tier-2": "Programming, digital circuits, instrumentation, and multi-body dynamics courses that strengthen robotics engineering expertise.",
    "tier-3": "Specialized courses in autonomous vehicles and electronic circuit design for advanced robotics applications.",
  },
};

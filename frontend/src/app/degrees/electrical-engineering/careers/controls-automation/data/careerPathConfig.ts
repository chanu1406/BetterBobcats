/**
 * Career Path Configuration for Controls & Automation Engineer
 * 
 * This configuration defines the structure for the Controls & Automation career path graph.
 * It organizes courses into logical categories for the interactive tier-based visualization.
 */

import { CareerPathConfig } from "@/types/careerPath";
import { controlsAutomationTierCourses } from "./tierCourses";

export const controlsAutomationCareerPathConfig: CareerPathConfig = {
  rootLabel: "Controls & Automation Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: CORE AUTOMATION FOUNDATIONS", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: SUPPORTING SKILLS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: PROGRAMMING FOUNDATION", emoji: "🟠" },
  ],
  courses: controlsAutomationTierCourses,
  categoryIntros: {
    "tier-1": "These are the **essential courses** for controls and automation careers. Core knowledge in control theory, signal processing, microcontrollers, and PLC programming that industrial automation companies expect.",
    "tier-2": "These courses enhance automation expertise with motor drives, power electronics, circuit design, and systems integration - making you versatile in designing complete automation solutions.",
    "tier-3": "Programming foundation enables control algorithm development, SCADA scripting, and automation utilities beyond basic ladder logic.",
  },
};

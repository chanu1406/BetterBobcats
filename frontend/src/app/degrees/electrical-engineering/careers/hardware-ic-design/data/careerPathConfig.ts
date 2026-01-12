/**
 * Career Path Configuration for Hardware / Computer Engineering & IC Design
 * 
 * This configuration defines the structure for the Hardware/IC Design career path graph.
 * It organizes courses into logical tiers for the interactive tier-based visualization.
 */

import { CareerPathConfig } from "@/types/careerPath";
import { hardwareICDesignTierCourses } from "./tierCourses";

export const hardwareICDesignCareerPathConfig: CareerPathConfig = {
  rootLabel: "Hardware / IC Design Engineer",
  categories: [
    { id: "tier-1", label: "TIER 1: CORE HARDWARE FOUNDATIONS", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: SUPPORTING SKILLS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: PROGRAMMING FOUNDATION", emoji: "🟠" },
  ],
  courses: hardwareICDesignTierCourses,
  categoryIntros: {
    "tier-1": "These are the **essential courses** for hardware and IC design careers. Core knowledge in digital logic, computer architecture, analog/RF circuit design, and CMOS electronics that semiconductor companies expect.",
    "tier-2": "These courses enhance hardware engineering expertise with signal processing, communications, and power management - critical for mixed-signal SoCs and wireless transceivers.",
    "tier-3": "Programming foundation enables HDL design, verification scripting, and EDA tool automation essential for modern chip design workflows.",
  },
};

import { CareerPathConfig } from "@/types/careerPath";
import { humanResourcesTierCourses } from "./tierCourses";

export const humanResourcesConfig: CareerPathConfig = {
  rootLabel: "Human Resources Specialist",
  categories: [
    {
      id: "tier-1",
      label: "TIER 1: MUST-TAKE for HR",
      emoji: "🟢",
    },
    {
      id: "tier-2",
      label: "TIER 2: STRONG HR BOOSTERS",
      emoji: "🟡",
    },
    {
      id: "tier-3",
      label: "TIER 3: HR-ADJACENT (Specialization)",
      emoji: "🟠",
    },
  ],
  courses: humanResourcesTierCourses,
  categoryIntros: {
    "tier-1":
      "Core foundational courses that combine psychology, sociology, and economics. These are essential for understanding workplace behavior, organizational culture, and data-driven HR decisions.",
    "tier-2":
      "These courses transform a basic recruiter into a Strategic Talent Leader who can manage complex social and legal issues.",
    "tier-3":
      "Good for students aiming for niche roles like HR Technology, Labor Law, or Global Workforce Management.",
  },
};

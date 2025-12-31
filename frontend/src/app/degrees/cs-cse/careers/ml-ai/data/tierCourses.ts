/**
 * ML-AI Tier Courses Data
 * Course recommendations organized by tier for Machine Learning / AI career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: NON-NEGOTIABLE CORE (ML / AI)
 * If a student does not complete most of these, they are not ML-ready.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "cse-176",
    code: "CSE 176",
    name: "Introduction to Machine Learning",
    fullName: "CSE 176: Introduction to Machine Learning",
    description: "Central ML algorithms, model training",
    tier: 1,
  },
  {
    id: "cse-175",
    code: "CSE 175",
    name: "Introduction to Artificial Intelligence",
    fullName: "CSE 175: Introduction to Artificial Intelligence",
    description: "Search, reasoning, AI foundations",
    tier: 1,
  },
  {
    id: "cse-030",
    code: "CSE 030",
    name: "Data Structures",
    fullName: "CSE 030: Data Structures",
    description: "Efficient ML pipelines",
    tier: 1,
  },
  {
    id: "cse-100",
    code: "CSE 100",
    name: "Algorithm Design & Analysis",
    fullName: "CSE 100: Algorithm Design & Analysis",
    description: "Complexity, optimization thinking",
    tier: 1,
  },
  {
    id: "cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "Data handling, preprocessing",
    tier: 1,
  },
  {
    id: "cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Turning models into real systems",
    tier: 1,
  },
  {
    id: "math-024",
    code: "MATH 024",
    name: "Linear Algebra & Differential Equations",
    fullName: "MATH 024: Linear Algebra & Differential Equations",
    description: "ML models = linear algebra",
    tier: 1,
  },
  {
    id: "math-032",
    code: "MATH 032",
    name: "Probability & Statistics",
    fullName: "MATH 032: Probability & Statistics",
    description: "Uncertainty, inference, evaluation",
    tier: 1,
  },
  {
    id: "math-023",
    code: "MATH 023",
    name: "Vector Calculus",
    fullName: "MATH 023: Vector Calculus",
    description: "Gradients, optimization",
    tier: 1,
  },
  {
    id: "math-021-022",
    code: "MATH 021 / 022",
    name: "Calculus I & II (Engineering)",
    fullName: "MATH 021 / 022: Calculus I & II (Engineering)",
    description: "Required foundation",
    tier: 1,
  },
];

/**
 * 🟡 TIER 2: HIGH-VALUE ML BOOSTERS
 * These courses separate "knows ML" from "understands ML deeply."
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "cse-185",
    code: "CSE 185",
    name: "Computer Vision",
    fullName: "CSE 185: Computer Vision",
    description: "Visual ML systems",
    tier: 2,
  },
  {
    id: "cse-188",
    code: "CSE 188",
    name: "Natural Language Processing",
    fullName: "CSE 188: Natural Language Processing",
    description: "Text & LLM foundations",
    tier: 2,
  },
  {
    id: "cse-179",
    code: "CSE 179",
    name: "Parallel Computing",
    fullName: "CSE 179: Parallel Computing",
    description: "Performance & training speed",
    tier: 2,
  },
  {
    id: "cse-168",
    code: "CSE 168",
    name: "Distributed Software Systems",
    fullName: "CSE 168: Distributed Software Systems",
    description: "ML at scale",
    tier: 2,
  },
  {
    id: "cse-107",
    code: "CSE 107",
    name: "Digital Image Processing",
    fullName: "CSE 107: Digital Image Processing",
    description: "Signal → ML pipeline",
    tier: 2,
  },
  {
    id: "math-041",
    code: "MATH 041",
    name: "Matrix Analysis for Data Science",
    fullName: "MATH 041: Matrix Analysis for Data Science",
    description: "ML-focused linear algebra",
    tier: 2,
  },
  {
    id: "math-130-131",
    code: "MATH 130 / 131",
    name: "Numerical Analysis / Methods",
    fullName: "MATH 130 / 131: Numerical Analysis / Methods",
    description: "Stability & optimization",
    tier: 2,
  },
  {
    id: "math-140",
    code: "MATH 140",
    name: "Optimization Methods",
    fullName: "MATH 140: Optimization Methods",
    description: "Core of model training",
    tier: 2,
  },
  {
    id: "math-146",
    code: "MATH 146",
    name: "Numerical Linear Algebra",
    fullName: "MATH 146: Numerical Linear Algebra",
    description: "Large-scale ML",
    tier: 2,
  },
  {
    id: "math-180",
    code: "MATH 180",
    name: "Applied Statistics & ML",
    fullName: "MATH 180: Applied Statistics & ML",
    description: "Industry-aligned",
    tier: 2,
  },
  {
    id: "math-280-282",
    code: "MATH 280 / 282",
    name: "Data Science & ML",
    fullName: "MATH 280 / 282: Data Science & ML",
    description: "Modern ML foundations",
    tier: 2,
  },
];

/**
 * 🟠 TIER 3: RESEARCH / GRAD-LEVEL DEPTH
 * Only recommended for: Grad school, Research, Theory-heavy ML paths, Advanced Mathematics
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "math-101-101h",
    code: "MATH 101 / 101H",
    name: "Real Analysis",
    fullName: "MATH 101 / 101H: Real Analysis",
    description: "Theoretical ML",
    tier: 3,
  },
  {
    id: "math-181",
    code: "MATH 181",
    name: "Stochastic Processes",
    fullName: "MATH 181: Stochastic Processes",
    description: "Probabilistic ML",
    tier: 3,
  },
  {
    id: "math-150",
    code: "MATH 150",
    name: "Mathematical Modeling",
    fullName: "MATH 150: Mathematical Modeling",
    description: "Scientific ML",
    tier: 3,
  },
  {
    id: "math-160",
    code: "MATH 160",
    name: "Mathematical Logic",
    fullName: "MATH 160: Mathematical Logic",
    description: "Theory",
    tier: 3,
  },
  {
    id: "math-221-224",
    code: "MATH 221–224",
    name: "Advanced PDEs",
    fullName: "MATH 221–224: Advanced PDEs",
    description: "Physics-based ML",
    tier: 3,
  },
];

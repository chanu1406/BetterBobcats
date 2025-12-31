/**
 * Data Science Career Path - Course Tiers
 * 
 * Tier 1: Non-negotiable core courses - if a student skips these, they are not data-science ready
 * Tier 2: High-value boosters - CS and advanced math courses that significantly enhance capabilities
 * Tier 3: ML-adjacent optional courses - recommended for Data Scientist roles (not just Analyst)
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1 — NON-NEGOTIABLE CORE (DATA SCIENCE)
 * 
 * Core Data Science + Mathematics Foundation
 * If a student skips these, they are not data-science ready.
 */
export const tier1Courses: TierCourse[] = [
  // Core Data Science Courses (DSA / DSC)
  {
    id: 'datascience-dsc-008',
    code: 'DSC 008',
    name: 'Introduction to Data Science',
    fullName: 'DSC 008: Introduction to Data Science',
    description: 'Entry point: data, cleaning, analysis mindset',
    tier: 1,
  },
  {
    id: 'datascience-dsc-011',
    code: 'DSC 011',
    name: 'Intro Computing & Statistical Programming',
    fullName: 'DSC 011: Intro Computing & Statistical Programming',
    description: 'Python/R + stats thinking',
    tier: 1,
  },
  {
    id: 'datascience-dsa-001',
    code: 'DSA 001',
    name: 'Foundations of Data Science & Analytics',
    fullName: 'DSA 001: Foundations of Data Science & Analytics',
    description: 'Core data workflows & analytics',
    tier: 1,
  },
  {
    id: 'datascience-dsa-002',
    code: 'DSA 002',
    name: 'Thinking Like a Programmer',
    fullName: 'DSA 002: Thinking Like a Programmer',
    description: 'Coding fluency (huge weak point for analysts)',
    tier: 1,
  },
  {
    id: 'datascience-dsc-100',
    code: 'DSC 100',
    name: 'Advanced Data Science',
    fullName: 'DSC 100: Advanced Data Science',
    description: 'End-to-end data projects',
    tier: 1,
  },
  // Core Mathematics (Required)
  {
    id: 'datascience-math-032',
    code: 'MATH 032',
    name: 'Probability & Statistics',
    fullName: 'MATH 032: Probability & Statistics',
    description: 'Inference, confidence, hypothesis testing',
    tier: 1,
  },
  {
    id: 'datascience-math-024',
    code: 'MATH 024',
    name: 'Linear Algebra & Differential Equations',
    fullName: 'MATH 024: Linear Algebra & Differential Equations',
    description: 'Models, regressions, transformations',
    tier: 1,
  },
  {
    id: 'datascience-math-021',
    code: 'MATH 021',
    name: 'Calculus I (Engineering)',
    fullName: 'MATH 021: Calculus I (Engineering)',
    description: 'Required quantitative foundation',
    tier: 1,
  },
  {
    id: 'datascience-math-022',
    code: 'MATH 022',
    name: 'Calculus II (Engineering)',
    fullName: 'MATH 022: Calculus II (Engineering)',
    description: 'Required quantitative foundation',
    tier: 1,
  },
];

/**
 * 🟡 TIER 2 — HIGH-VALUE DATA SCIENCE BOOSTERS
 * 
 * CS Courses + Advanced Math that significantly enhance data science capabilities
 * These courses make the difference between junior and mid-level data roles
 */
export const tier2Courses: TierCourse[] = [
  // CS Courses That Matter for Data Science
  {
    id: 'datascience-cse-111',
    code: 'CSE 111',
    name: 'Database Systems',
    fullName: 'CSE 111: Database Systems',
    description: 'SQL, data modeling, real datasets',
    tier: 2,
  },
  {
    id: 'datascience-cse-030',
    code: 'CSE 030',
    name: 'Data Structures',
    fullName: 'CSE 030: Data Structures',
    description: 'Efficient data handling',
    tier: 2,
  },
  {
    id: 'datascience-cse-120',
    code: 'CSE 120',
    name: 'Software Engineering',
    fullName: 'CSE 120: Software Engineering',
    description: 'Turning analysis into tools',
    tier: 2,
  },
  {
    id: 'datascience-cse-108',
    code: 'CSE 108',
    name: 'Full Stack Web Development',
    fullName: 'CSE 108: Full Stack Web Development',
    description: 'Dashboards, data products',
    tier: 2,
  },
  // Advanced / Applied Math for Data Science
  {
    id: 'datascience-math-041',
    code: 'MATH 041',
    name: 'Linear Algebra for Data Science',
    fullName: 'MATH 041: Linear Algebra for Data Science',
    description: 'DS-focused linear algebra',
    tier: 2,
  },
  {
    id: 'datascience-math-180',
    code: 'MATH 180',
    name: 'Applied Statistics & Machine Learning',
    fullName: 'MATH 180: Applied Statistics & Machine Learning',
    description: 'Industry-aligned analytics',
    tier: 2,
  },
  {
    id: 'datascience-math-280',
    code: 'MATH 280',
    name: 'Math & Stats Foundations of Data Science',
    fullName: 'MATH 280: Math & Stats Foundations of Data Science',
    description: 'Core DS theory',
    tier: 2,
  },
  {
    id: 'datascience-math-282',
    code: 'MATH 282',
    name: 'Statistical & Machine Learning',
    fullName: 'MATH 282: Statistical & Machine Learning',
    description: 'Applied modeling',
    tier: 2,
  },
  {
    id: 'datascience-math-150',
    code: 'MATH 150',
    name: 'Mathematical Modeling',
    fullName: 'MATH 150: Mathematical Modeling',
    description: 'Real-world problem framing',
    tier: 2,
  },
];

/**
 * 🟠 TIER 3 — ML-ADJACENT (OPTIONAL)
 * 
 * Only recommended if the student wants Data Scientist (not Analyst) roles
 * These courses open doors to ML engineering and advanced analytics positions
 */
export const tier3Courses: TierCourse[] = [
  {
    id: 'datascience-dsa-101',
    code: 'DSA 101',
    name: 'Machine Learning & NLP',
    fullName: 'DSA 101: Machine Learning & NLP',
    description: 'Text-heavy data, applied ML',
    tier: 3,
  },
  {
    id: 'datascience-cse-176',
    code: 'CSE 176',
    name: 'Machine Learning',
    fullName: 'CSE 176: Machine Learning',
    description: 'Transition to ML roles',
    tier: 3,
  },
  {
    id: 'datascience-cse-175',
    code: 'CSE 175',
    name: 'Artificial Intelligence',
    fullName: 'CSE 175: Artificial Intelligence',
    description: 'Broader AI understanding',
    tier: 3,
  },
];

/**
 * 🟣 ETHICS & PROFESSIONAL PRACTICE (IMPORTANT)
 * 
 * Data science uniquely impacts people and policy
 * This course addresses bias, fairness, and accountability
 */
export const tier4Courses: TierCourse[] = [
  {
    id: 'datascience-dsc-104',
    code: 'DSC 104',
    name: 'Ethics in Data Science',
    fullName: 'DSC 104: Ethics in Data Science',
    description: 'Bias, fairness, and accountability in data science. Data science uniquely impacts people and policy.',
    tier: 4,
  },
];

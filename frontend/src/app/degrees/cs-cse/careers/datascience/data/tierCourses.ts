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
 * These courses form the absolute foundation of data science competency
 */
export const tier1Courses: TierCourse[] = [
  {
    id: 'datascience-dsc-008',
    code: 'DSC 008',
    name: 'Introduction to Data Science',
    fullName: 'DSC 008: Introduction to Data Science',
    description: 'Entry point to data science: data handling, cleaning, and analytical mindset.',
    tier: 1,
  },
  {
    id: 'datascience-dsc-011',
    code: 'DSC 011',
    name: 'Intro Computing & Statistical Programming',
    fullName: 'DSC 011: Intro Computing & Statistical Programming',
    description: 'Python/R programming combined with statistical thinking fundamentals.',
    tier: 1,
  },
  {
    id: 'datascience-dsa-001',
    code: 'DSA 001',
    name: 'Foundations of Data Science & Analytics',
    fullName: 'DSA 001: Foundations of Data Science & Analytics',
    description: 'Core data workflows and analytics methodologies.',
    tier: 1,
  },
  {
    id: 'datascience-dsa-002',
    code: 'DSA 002',
    name: 'Thinking Like a Programmer',
    fullName: 'DSA 002: Thinking Like a Programmer',
    description: 'Coding fluency development - addresses a huge weak point for analysts.',
    tier: 1,
  },
  {
    id: 'datascience-math-032',
    code: 'MATH 032',
    name: 'Probability & Statistics',
    fullName: 'MATH 032: Probability & Statistics',
    description: 'Statistical inference, confidence intervals, and hypothesis testing.',
    tier: 1,
  },
  {
    id: 'datascience-math-024',
    code: 'MATH 024',
    name: 'Linear Algebra & Differential Equations',
    fullName: 'MATH 024: Linear Algebra & Differential Equations',
    description: 'Mathematical models, regressions, and transformations.',
    tier: 1,
  },
  {
    id: 'datascience-math-021',
    code: 'MATH 021',
    name: 'Calculus I (Engineering)',
    fullName: 'MATH 021: Calculus I (Engineering)',
    description: 'Required quantitative foundation for advanced data science.',
    tier: 1,
  },
  {
    id: 'datascience-math-022',
    code: 'MATH 022',
    name: 'Calculus II (Engineering)',
    fullName: 'MATH 022: Calculus II (Engineering)',
    description: 'Continuation of quantitative foundation.',
    tier: 1,
  },
  {
    id: 'datascience-dsc-100',
    code: 'DSC 100',
    name: 'Advanced Data Science',
    fullName: 'DSC 100: Advanced Data Science',
    description: 'End-to-end data science projects with real-world applications.',
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
  {
    id: 'datascience-cse-111',
    code: 'CSE 111',
    name: 'Database Systems',
    fullName: 'CSE 111: Database Systems',
    description: 'SQL, data modeling, and working with real datasets at scale.',
    tier: 2,
  },
  {
    id: 'datascience-cse-030',
    code: 'CSE 030',
    name: 'Data Structures',
    fullName: 'CSE 030: Data Structures',
    description: 'Efficient data handling and algorithm fundamentals.',
    tier: 2,
  },
  {
    id: 'datascience-cse-120',
    code: 'CSE 120',
    name: 'Software Engineering',
    fullName: 'CSE 120: Software Engineering',
    description: 'Turning analysis into production-ready tools and data products.',
    tier: 2,
  },
  {
    id: 'datascience-cse-108',
    code: 'CSE 108',
    name: 'Full Stack Web Development',
    fullName: 'CSE 108: Full Stack Web Development',
    description: 'Build dashboards and interactive data products.',
    tier: 2,
  },
  {
    id: 'datascience-math-041',
    code: 'MATH 041',
    name: 'Linear Algebra for Data Science',
    fullName: 'MATH 041: Linear Algebra for Data Science',
    description: 'Data science-focused linear algebra applications.',
    tier: 2,
  },
  {
    id: 'datascience-math-180',
    code: 'MATH 180',
    name: 'Applied Statistics & Machine Learning',
    fullName: 'MATH 180: Applied Statistics & Machine Learning',
    description: 'Industry-aligned analytics and statistical modeling.',
    tier: 2,
  },
  {
    id: 'datascience-math-280',
    code: 'MATH 280',
    name: 'Math & Stats Foundations of Data Science',
    fullName: 'MATH 280: Math & Stats Foundations of Data Science',
    description: 'Core data science theory and mathematical foundations.',
    tier: 2,
  },
  {
    id: 'datascience-math-282',
    code: 'MATH 282',
    name: 'Statistical & Machine Learning',
    fullName: 'MATH 282: Statistical & Machine Learning',
    description: 'Applied modeling and predictive analytics.',
    tier: 2,
  },
  {
    id: 'datascience-math-150',
    code: 'MATH 150',
    name: 'Mathematical Modeling',
    fullName: 'MATH 150: Mathematical Modeling',
    description: 'Real-world problem framing and solution design.',
    tier: 2,
  },
];

/**
 * 🟠 TIER 3 — ML-ADJACENT (OPTIONAL)
 * 
 * Only recommended if the student wants Data Scientist (not just Analyst) roles
 * These courses open doors to ML engineering and advanced analytics positions
 */
export const tier3Courses: TierCourse[] = [
  {
    id: 'datascience-dsa-101',
    code: 'DSA 101',
    name: 'Machine Learning & NLP',
    fullName: 'DSA 101: Machine Learning & NLP',
    description: 'Text-heavy data analysis and applied machine learning.',
    tier: 3,
  },
  {
    id: 'datascience-cse-176',
    code: 'CSE 176',
    name: 'Machine Learning',
    fullName: 'CSE 176: Machine Learning',
    description: 'Comprehensive ML algorithms - critical for transitioning to ML roles.',
    tier: 3,
  },
  {
    id: 'datascience-cse-175',
    code: 'CSE 175',
    name: 'Artificial Intelligence',
    fullName: 'CSE 175: Artificial Intelligence',
    description: 'Broader AI understanding and intelligent systems.',
    tier: 3,
  },
  {
    id: 'datascience-dsc-104',
    code: 'DSC 104',
    name: 'Ethics in Data Science',
    fullName: 'DSC 104: Ethics in Data Science',
    description: 'Bias, fairness, and accountability in data science. Strong resume talking point.',
    tier: 3,
  },
];

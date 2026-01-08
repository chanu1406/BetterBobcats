/**
 * Data Analyst (Generalist) - Tier Course Data
 * Career Path: Data Analyst, Business Intelligence Analyst, Data Scientist
 */

import { TierCourse } from '@/types/careerPath';

/**
 * TIER 1 — MUST-TAKE for Data Analytics (High-ROI)
 * These courses are foundational for any Data Analytics career.
 * Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites early on before graduation.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: 'data-analyst-psy-010',
    code: 'PSY 010',
    name: 'Analysis of Psych Data',
    fullName: 'PSY 010: Analysis of Psychological Data',
    description: 'The quantitative backbone for the major; covers statistical inference, hypothesis testing, and data modeling',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Essential foundation for statistical thinking. Learn how to design experiments, test hypotheses, and interpret data correctly.',
      topics: ['Statistical inference', 'Hypothesis testing', 'Data modeling', 'Experimental design', 'Statistical significance'],
    },
  },
  {
    id: 'data-analyst-mist-060',
    code: 'MIST 060',
    name: 'Intro Data Analytics',
    fullName: 'MIST 060: Introduction to Data Analytics',
    description: 'High-level training in data visualization and best practices for data cleaning and decision-making',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Learn the complete data analytics workflow: from dirty data to actionable insights. Critical for all data roles.',
      topics: ['Data visualization', 'Data cleaning', 'ETL processes', 'Decision-making', 'Analytics best practices'],
    },
  },
  {
    id: 'data-analyst-cse-111',
    code: 'CSE 111',
    name: 'Database Systems',
    fullName: 'CSE 111: Database Systems',
    description: 'The industry standard for data extraction: teaches SQL, relational models, and backend data handling',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'SQL is THE most in-demand skill for data analysts. Master querying, joining, and database design.',
      topics: ['SQL queries', 'Relational databases', 'Data modeling', 'Database design', 'Data extraction'],
    },
  },
  {
    id: 'data-analyst-cogs-105',
    code: 'COGS 105',
    name: 'Research Methods',
    fullName: 'COGS 105: Research Methods in Cognitive Science',
    description: 'Critical for experimental design—teaches you how to collect and interpret the "why" behind data patterns',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Go beyond descriptive stats. Learn to design studies that answer business questions and avoid bias.',
      topics: ['Experimental design', 'Research methodology', 'Causal inference', 'Bias identification', 'Study planning'],
    },
  },
  {
    id: 'data-analyst-bioe-021',
    code: 'BIOE 021',
    name: 'Intro to Python',
    fullName: 'BIOE 021: Introduction to Computing with Python',
    description: 'Essential for automating analysis and processing large datasets that exceed spreadsheet capabilities',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Automate repetitive tasks, process big data, and build reproducible analysis pipelines. Modern analytics requires code.',
      topics: ['Python programming', 'Data manipulation', 'Automation', 'pandas library', 'Data pipelines'],
    },
  },
  {
    id: 'data-analyst-econ-010',
    code: 'ECON 010',
    name: 'Statistical Inference',
    fullName: 'ECON 010: Statistical Inference',
    description: 'Business-aligned alternative to PSY 010; focuses on modeling within economic and management contexts',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Apply statistics to business problems. Perfect for those targeting finance, consulting, or business analytics roles.',
      topics: ['Statistical inference', 'Economic modeling', 'Business statistics', 'Regression analysis', 'Forecasting'],
    },
  },
];

/**
 * TIER 2 — STRONG ANALYTICS BOOSTERS
 * These courses turn a junior analyst into a senior candidate by adding predictive modeling and complex system visualization.
 */
export const tier2Courses: TierCourse[] = [
  {
    id: 'data-analyst-cogs-104',
    code: 'COGS 104',
    name: 'Complex Systems',
    fullName: 'COGS 104: Complex Adaptive Systems',
    description: 'Modeling non-linear social behaviors and network dynamics—useful for platform growth analysis',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Understand how systems evolve over time. Critical for analyzing social networks, viral growth, and user ecosystems.',
      topics: ['Network analysis', 'System dynamics', 'Non-linear modeling', 'Platform growth', 'Emergent behavior'],
    },
  },
  {
    id: 'data-analyst-mist-130',
    code: 'MIST 130',
    name: 'Data Analysis in R',
    fullName: 'MIST 130: Data Analysis in R',
    description: 'Proficiency in R is a major hiring signal for scientific, research-heavy, and academic data roles',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'R is the gold standard for statistical analysis and research. Essential for biotech, pharma, and academic data roles.',
      topics: ['R programming', 'Statistical packages', 'ggplot2', 'Data wrangling', 'Advanced statistics'],
    },
  },
  {
    id: 'data-analyst-dsa-102',
    code: 'DSA 102',
    name: 'Interactive Data Viz',
    fullName: 'DSA 102: Interactive Data Visualization',
    description: 'Essential for building dashboards that turn complex data into persuasive visual stories for stakeholders',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Create dashboards that executives actually use. Learn to design visualizations that drive business decisions.',
      topics: ['Dashboard design', 'Interactive visualizations', 'Tableau/Power BI', 'Data storytelling', 'Visual analytics'],
    },
  },
  {
    id: 'data-analyst-econ-110',
    code: 'ECON 110',
    name: 'Econometrics',
    fullName: 'ECON 110: Econometrics',
    description: 'Advanced regression analysis—highly valued in finance, business intelligence, and policy roles',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Master predictive modeling and causal inference. Essential for finance, consulting, and data science roles.',
      topics: ['Regression analysis', 'Time series', 'Causal inference', 'Panel data', 'Forecasting models'],
    },
  },
  {
    id: 'data-analyst-cogs-128',
    code: 'COGS 128',
    name: 'Cognitive Engineering',
    fullName: 'COGS 128: Cognitive Engineering',
    description: 'Using human decision-making data to optimize system performance and user interactions',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Combine data analytics with human behavior insights. Optimize products based on how users actually think and act.',
      topics: ['Human factors', 'Decision analytics', 'User behavior modeling', 'A/B testing', 'Behavioral data'],
    },
  },
];

/**
 * Export all courses as a flat array for the career path configuration
 */
export const allDataAnalystCourses: TierCourse[] = [
  ...tier1Courses,
  ...tier2Courses,
];

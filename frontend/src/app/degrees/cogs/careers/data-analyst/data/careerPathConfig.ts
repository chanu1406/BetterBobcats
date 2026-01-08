/**
 * Career Path Configuration - Data Analyst (Generalist)
 * Defines the structure and metadata for the Data Analyst career path graph
 */

import { CareerPathConfig } from '@/types/careerPath';
import { allDataAnalystCourses } from './tierCourses';

export const dataAnalystCareerPathConfig: CareerPathConfig = {
  rootLabel: 'Data Analyst',
  
  categories: [
    {
      id: 'tier-1',
      label: 'TIER 1: MUST-TAKE (High-ROI)',
      emoji: '🟢',
    },
    {
      id: 'tier-2',
      label: 'TIER 2: STRONG BOOSTERS',
      emoji: '🟡',
    },
  ],
  
  courses: allDataAnalystCourses,
  
  categoryIntros: {
    'tier-1': '**MUST-TAKE for Data Analytics (High-ROI).** These courses are foundational for any Data Analytics career. Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites early on before graduation.',
    'tier-2': '**STRONG ANALYTICS BOOSTERS.** These courses turn a junior analyst into a senior candidate by adding predictive modeling and complex system visualization.',
  },
};

/**
 * Career Path Configuration - UX/UI Design & Research
 * Defines the structure and metadata for the UX/UI career path graph
 */

import { CareerPathConfig } from '@/types/careerPath';
import { allUXUICourses } from './tierCourses';

export const uxuiCareerPathConfig: CareerPathConfig = {
  rootLabel: 'UX/UI Design & Research',
  
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
    {
      id: 'tier-3',
      label: 'TIER 3: SPECIALIZED/ADJACENT',
      emoji: '🟠',
    },
  ],
  
  courses: allUXUICourses,
  
  categoryIntros: {
    'tier-1': '**MUST-TAKE for UI/UX (High-ROI).** These courses are foundational for any UI/UX career. Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites early on before graduation.',
    'tier-2': '**STRONG UI/UX BOOSTERS.** These courses turn a generalist into a specialist, making you a "UX-aware engineer" or a "Technical Product Designer".',
    'tier-3': '**UI/UX-ADJACENT (Applied/Interest-Based).** Specialized depth for niche roles like UX Writer, Voice Interface Designer, or Product Engineer.',
  },
};

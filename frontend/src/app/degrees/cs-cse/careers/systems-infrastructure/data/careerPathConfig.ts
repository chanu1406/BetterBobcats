/**
 * Career Path Configuration - Systems / Infrastructure Engineering
 * Defines the structure and metadata for the Systems/Infrastructure career path graph
 */

import { CareerPathConfig } from '@/types/careerPath';
import { allSystemsCourses } from './tierCourses';

export const systemsInfrastructureCareerPathConfig: CareerPathConfig = {
  rootLabel: 'Systems / Infrastructure',
  
  categories: [
    {
      id: 'tier-1',
      label: 'TIER 1: NON-NEGOTIABLE CORE',
      emoji: '🟢',
    },
    {
      id: 'tier-1-5',
      label: 'TIER 1.5: EE HARDWARE CORE',
      emoji: '🟢',
    },
    {
      id: 'tier-2',
      label: 'TIER 2: ADVANCED SYSTEMS',
      emoji: '🟡',
    },
    {
      id: 'tier-2-5',
      label: 'TIER 2.5: ME CONTROL SYSTEMS',
      emoji: '🟡',
    },
    {
      id: 'tier-3',
      label: 'TIER 3: SECURITY & RELIABILITY',
      emoji: '🟠',
    },
  ],
  
  courses: allSystemsCourses,
  
  categoryIntros: {
    'tier-1': '**Core Systems Engineering Foundation.** If a student does not take most of these, they are not systems-ready. Essential for all Systems Engineer, Infrastructure Engineer, and SRE roles.',
    'tier-1-5': '**Electrical Engineering Systems Hardware Core.** This is what makes UCM systems engineers stand out. Deep hardware understanding that separates good systems engineers from great ones.',
    'tier-2': '**Advanced Systems & Infrastructure.** These separate junior systems engineers from elite ones. Maps directly to FAANG-level infrastructure roles.',
    'tier-2-5': '**Mechanical Engineering Systems Thinking & Control.** Not for everyone — high payoff if chosen carefully. Helps with robotics systems, embedded infrastructure, and cyber-physical systems.',
    'tier-3': '**Security & Reliability (Optional but Powerful).** Enhances systems engineering with security awareness and formal verification methods.',
  },
};

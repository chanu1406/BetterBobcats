/**
 * UX/UI Design & Research - Tier Course Data
 * Career Path: UX Designer, UI Designer, UX Researcher, Product Designer
 */

import { TierCourse } from '@/types/careerPath';

/**
 * TIER 1 — MUST-TAKE for UI/UX (High-ROI)
 * These courses are foundational for any UI/UX career.
 * Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites early on before graduation.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: 'uxui-cogs-128',
    code: 'COGS 128',
    name: 'Cognitive Engineering',
    fullName: 'COGS 128: Cognitive Engineering',
    description: 'Applying human factors and cognitive psychology to complex system design',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Core course for understanding how users interact with complex systems. Essential for designing intuitive interfaces.',
      topics: ['Human factors', 'Cognitive psychology', 'System design', 'User mental models'],
    },
  },
  {
    id: 'uxui-cse-155',
    code: 'CSE 155',
    name: 'Human-Computer Interaction',
    fullName: 'CSE 155: Human-Computer Interaction',
    description: 'The technical core: prototyping, user testing, and interface implementation',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'THE flagship HCI course. Covers the full design process from ideation to implementation.',
      topics: ['Prototyping', 'User testing', 'Interface design', 'Usability evaluation', 'Design patterns'],
    },
  },
  {
    id: 'uxui-cogs-105',
    code: 'COGS 105',
    name: 'Research Methods',
    fullName: 'COGS 105: Research Methods in Cognitive Science',
    description: 'Foundational for UX Research: planning studies, qualitative/quantitative data, and bias identification',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Essential for UX Researchers. Learn to design and conduct user studies properly.',
      topics: ['Study design', 'Qualitative methods', 'Quantitative analysis', 'Research bias', 'Data interpretation'],
    },
  },
  {
    id: 'uxui-psy-160',
    code: 'PSY 160',
    name: 'Cognitive Psychology',
    fullName: 'PSY 160: Cognitive Psychology',
    description: 'Mental processes: how users perceive color, store memory (Working Memory), and pay attention',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Understand the psychology behind user behavior. Critical for designing effective interfaces.',
      topics: ['Perception', 'Working memory', 'Attention', 'Color theory', 'Cognitive load'],
    },
  },
  {
    id: 'uxui-bioe-021',
    code: 'BIOE 021',
    name: 'Intro to Computing with Python',
    fullName: 'BIOE 021: Introduction to Computing with Python',
    description: 'Essential for Data-Driven UX: automating user data analysis and creating custom testing scripts',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Modern UX requires data analysis. Learn to automate data processing and create custom tools.',
      topics: ['Python programming', 'Data analysis', 'Automation', 'Scripting', 'Data visualization basics'],
    },
  },
  {
    id: 'uxui-mist-060',
    code: 'MIST 060',
    name: 'Intro Data Analytics',
    fullName: 'MIST 060: Introduction to Data Analytics',
    description: 'High-level data visualization—critical for presenting research findings to stakeholders',
    tier: 1,
    expandedInfo: {
      careerRelevance: 'Learn to present data insights to stakeholders. Essential for communicating UX research findings.',
      topics: ['Data visualization', 'Dashboard design', 'Metrics', 'KPIs', 'Stakeholder communication'],
    },
  },
];

/**
 * TIER 2 — STRONG UI/UX BOOSTERS
 * These courses turn a generalist into a specialist, making you a "UX-aware engineer" or a "Technical Product Designer".
 */
export const tier2Courses: TierCourse[] = [
  {
    id: 'uxui-cogs-140',
    code: 'COGS 140',
    name: 'Perception and Action',
    fullName: 'COGS 140: Perception and Action',
    description: 'Crucial for AR/VR design and physical interaction (Fitts\' Law application)',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Essential for spatial computing and AR/VR interfaces. Understand physical interaction design.',
      topics: ['Perception', 'Motor control', 'Fitts\' Law', 'AR/VR design', 'Spatial interfaces'],
    },
  },
  {
    id: 'uxui-cogs-104',
    code: 'COGS 104',
    name: 'Complex Adaptive Systems',
    fullName: 'COGS 104: Complex Adaptive Systems',
    description: 'Teaches how groups of users behave in networks—vital for Social Computing or platform design',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Design for communities and platforms. Understand network effects and social dynamics.',
      topics: ['Network theory', 'Social computing', 'Platform design', 'User communities', 'Emergent behavior'],
    },
  },
  {
    id: 'uxui-psy-120',
    code: 'PSY 120',
    name: 'Health Psychology',
    fullName: 'PSY 120: Health Psychology',
    description: 'Behavioral triggers: how to design for habit formation or mental health apps',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Design behavior-change apps. Critical for health tech and wellness products.',
      topics: ['Behavior change', 'Habit formation', 'Health interventions', 'Mental health design', 'Motivation'],
    },
  },
  {
    id: 'uxui-cse-022',
    code: 'CSE 022',
    name: 'Intro to Programming',
    fullName: 'CSE 022: Introduction to Programming',
    description: 'Front-end foundation: understanding the code makes you a better collaborator with developers',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Bridge the gap between design and development. Speak the language of engineers.',
      topics: ['Programming basics', 'Logic', 'Problem-solving', 'Developer collaboration', 'Technical literacy'],
    },
  },
  {
    id: 'uxui-phil-110',
    code: 'PHIL 110',
    name: 'Philosophy of CogSci',
    fullName: 'PHIL 110: Philosophy of Cognitive Science',
    description: 'Logic and Ethics: identifying the "dark patterns" and ethical implications of addictive design',
    tier: 2,
    expandedInfo: {
      careerRelevance: 'Design ethically. Understand the philosophical implications of UX decisions.',
      topics: ['Ethics', 'Dark patterns', 'Persuasive design', 'User manipulation', 'Design responsibility'],
    },
  },
];

/**
 * TIER 3 — UI/UX-ADJACENT (Applied/Interest-Based)
 * Specialized depth for niche roles like UX Writer or Voice Interface Designer.
 */
export const tier3Courses: TierCourse[] = [
  {
    id: 'uxui-cogs-005',
    code: 'COGS 005',
    name: 'Intro to Lang & Linguistics',
    fullName: 'COGS 005: Introduction to Language & Linguistics',
    description: 'Foundational for Conversation Design (Chatbots/AI Assistants)',
    tier: 3,
    expandedInfo: {
      careerRelevance: 'Design conversational interfaces. Essential for chatbots and voice assistants.',
      topics: ['Linguistics', 'Natural language', 'Conversation design', 'Voice UI', 'Chatbot design'],
    },
  },
  {
    id: 'uxui-econ-108',
    code: 'ECON 108',
    name: 'Marketing & Consumer Behavior',
    fullName: 'ECON 108: Marketing & Consumer Behavior',
    description: 'Bridging the gap between user needs and business revenue goals',
    tier: 3,
    expandedInfo: {
      careerRelevance: 'Align UX with business goals. Understand how to balance user needs with revenue.',
      topics: ['Consumer behavior', 'Marketing psychology', 'Business strategy', 'User monetization', 'Growth design'],
    },
  },
  {
    id: 'uxui-cse-108',
    code: 'CSE 108',
    name: 'Full Stack Web Development',
    fullName: 'CSE 108: Full Stack Web Development',
    description: 'If you want to be a Product Engineer (building what you design)',
    tier: 3,
    expandedInfo: {
      careerRelevance: 'Build your own designs. Ideal for becoming a Product Designer or Design Engineer.',
      topics: ['Web development', 'Frontend frameworks', 'Backend basics', 'Design implementation', 'Product engineering'],
    },
  },
  {
    id: 'uxui-cogs-103',
    code: 'COGS 103',
    name: 'Intro to Neural Networks',
    fullName: 'COGS 103: Introduction to Neural Networks',
    description: 'Designing interfaces for AI—understanding how "black box" models output data',
    tier: 3,
    expandedInfo: {
      careerRelevance: 'Design AI-powered products. Understand machine learning to create better AI interfaces.',
      topics: ['Neural networks', 'AI/ML basics', 'AI interface design', 'Model interpretation', 'AI transparency'],
    },
  },
];

/**
 * Export all courses as a flat array for the career path configuration
 */
export const allUXUICourses: TierCourse[] = [
  ...tier1Courses,
  ...tier2Courses,
  ...tier3Courses,
];

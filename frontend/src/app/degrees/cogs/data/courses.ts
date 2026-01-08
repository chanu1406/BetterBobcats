/**
 * Cognitive Science (COGS) Course Data
 * Complete list of courses for the Cognitive Science degree program
 */

import { Course } from '@/types/course';

/**
 * All Cognitive Science courses organized by year and semester
 * This represents a typical 4-year progression through the COGS major
 */
export const cogsCourses: Course[] = [
  // Year 1 - Fall
  {
    id: 'cogs-001',
    code: 'COGS 001',
    name: 'Introduction to Cognitive Science',
    fullName: 'COGS 001: Introduction to Cognitive Science',
    year: 1,
    semester: 'fall',
    prerequisites: [],
    category: 'COGS Core',
  },
  {
    id: 'math-021',
    code: 'MATH 021',
    name: 'Calculus I',
    fullName: 'MATH 021: Calculus I for Physical Sciences and Engineering',
    year: 1,
    semester: 'fall',
    prerequisites: [],
    category: 'Math',
  },
  {
    id: 'wri-010',
    code: 'WRI 010',
    name: 'College Reading and Composition',
    fullName: 'WRI 010: College Reading and Composition',
    year: 1,
    semester: 'fall',
    prerequisites: [],
    category: 'Writing',
  },
  
  // Year 1 - Spring
  {
    id: 'math-022',
    code: 'MATH 022',
    name: 'Calculus II',
    fullName: 'MATH 022: Calculus II for Physical Sciences and Engineering',
    year: 1,
    semester: 'spring',
    prerequisites: ['math-021'],
    category: 'Math',
  },
  {
    id: 'psych-001',
    code: 'PSYCH 001',
    name: 'Introduction to Psychology',
    fullName: 'PSYCH 001: Introduction to Psychology',
    year: 1,
    semester: 'spring',
    prerequisites: [],
    category: 'Psychology',
  },
  {
    id: 'cse-022',
    code: 'CSE 022',
    name: 'Introduction to Programming',
    fullName: 'CSE 022: Introduction to Programming',
    year: 1,
    semester: 'spring',
    prerequisites: [],
    category: 'Computer Science',
  },
  
  // Year 2 - Fall
  {
    id: 'cogs-101',
    code: 'COGS 101',
    name: 'Cognitive Psychology',
    fullName: 'COGS 101: Cognitive Psychology',
    year: 2,
    semester: 'fall',
    prerequisites: ['cogs-001'],
    category: 'COGS Core',
  },
  {
    id: 'cogs-110',
    code: 'COGS 110',
    name: 'Research Methods in Cognitive Science',
    fullName: 'COGS 110: Research Methods in Cognitive Science',
    year: 2,
    semester: 'fall',
    prerequisites: ['cogs-001'],
    category: 'COGS Core',
  },
  
  // Year 2 - Spring
  {
    id: 'cogs-102',
    code: 'COGS 102',
    name: 'Neuroscience and Behavior',
    fullName: 'COGS 102: Neuroscience and Behavior',
    year: 2,
    semester: 'spring',
    prerequisites: ['cogs-101', 'cogs-110'],
    category: 'COGS Core',
  },
  
  // Year 3 - Spring
  {
    id: 'cogs-105',
    code: 'COGS 105',
    name: 'Research Methods for Cognitive Scientists',
    fullName: 'COGS 105: Research Methods for Cognitive Scientists',
    year: 3,
    semester: 'spring',
    prerequisites: ['cogs-102'],
    category: 'COGS Core',
  },
  
  // Year 4 - Fall
  {
    id: 'cogs-190',
    code: 'COGS 190',
    name: 'Senior Capstone',
    fullName: 'COGS 190: Senior Capstone Project',
    year: 4,
    semester: 'fall',
    prerequisites: ['cogs-105'],
    category: 'COGS Core',
  },
];

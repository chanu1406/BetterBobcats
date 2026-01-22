/**
 * Systems / Infrastructure Engineering - Tier Course Data
 * Career Path: Systems Engineering, Infrastructure Engineering, Site Reliability Engineering (SRE)
 */

import { TierCourse } from '@/types/careerPath';

/**
 * TIER 1 — NON-NEGOTIABLE CORE (SYSTEMS ENGINEERING)
 * If a student does not take most of these, they are not systems-ready.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: 'systems-cse-150',
    code: 'CSE 150',
    name: 'Operating Systems',
    fullName: 'CSE 150: Operating Systems',
    description: 'Core systems knowledge: Processes, memory management, and concurrency fundamentals',
    tier: 1,
  },
  {
    id: 'systems-cse-160',
    code: 'CSE 160',
    name: 'Computer Networks',
    fullName: 'CSE 160: Computer Networks',
    description: 'Real infrastructure foundation: TCP/IP, routing, and network protocols',
    tier: 1,
  },
  {
    id: 'systems-cse-168',
    code: 'CSE 168',
    name: 'Distributed Software Systems',
    fullName: 'CSE 168: Distributed Software Systems',
    description: 'Modern systems architecture: Scalability, fault tolerance, and distributed design',
    tier: 1,
  },
  {
    id: 'systems-cse-140',
    code: 'CSE 140',
    name: 'Computer Architecture',
    fullName: 'CSE 140: Computer Architecture',
    description: 'Hardware–software interface: Understanding the full stack from CPU to OS',
    tier: 1,
  },
  {
    id: 'systems-cse-179',
    code: 'CSE 179',
    name: 'Parallel Computing',
    fullName: 'CSE 179: Parallel Computing',
    description: 'Performance engineering: Multithreading, parallel algorithms, and high-performance systems',
    tier: 1,
  },
  {
    id: 'systems-cse-031',
    code: 'CSE 031',
    name: 'Computer Organization & Assembly',
    fullName: 'CSE 031: Computer Organization & Assembly',
    description: 'Low-level execution: Assembly language and how programs run on hardware',
    tier: 1,
  },
];

/**
 * TIER 1.5 — ELECTRICAL ENGINEERING (SYSTEMS HARDWARE CORE)
 * This is what makes UCM systems engineers stand out.
 * These EE courses provide deep hardware understanding that separates good systems engineers from great ones.
 */
export const tier1_5Courses: TierCourse[] = [
  {
    id: 'systems-eecs-240',
    code: 'EECS 240',
    name: 'Computer Architecture & Design',
    fullName: 'EECS 240: Computer Architecture & Design',
    description: 'Deep CPU and system design: Understanding processor architecture at the silicon level',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-242',
    code: 'EECS 242',
    name: 'Advanced Computer Architecture',
    fullName: 'EECS 242: Advanced Computer Architecture',
    description: 'Performance engineering: Cache hierarchies, pipelining, and superscalar processors',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-245',
    code: 'EECS 245',
    name: 'Parallel Computing',
    fullName: 'EECS 245: Parallel Computing',
    description: 'High-scale systems: Parallel architectures and multi-core programming',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-250',
    code: 'EECS 250',
    name: 'Advanced Computer Systems',
    fullName: 'EECS 250: Advanced Computer Systems',
    description: 'OS + infrastructure: Deep dive into system software and hardware integration',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-251',
    code: 'EECS 251',
    name: 'Advanced Operating Systems',
    fullName: 'EECS 251: Advanced Operating Systems',
    description: 'Kernel-level thinking: Virtual memory, scheduling, and low-level OS internals',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-263',
    code: 'EECS 263',
    name: 'Cloud Computing',
    fullName: 'EECS 263: Cloud Computing',
    description: 'Modern infrastructure stacks: Virtualization, containers, and cloud architectures',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-266',
    code: 'EECS 266',
    name: 'Advanced Distributed Systems',
    fullName: 'EECS 266: Advanced Distributed Systems',
    description: 'Fault-tolerant systems: Consensus algorithms, replication, and distributed coordination',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-268',
    code: 'EECS 268',
    name: 'Datacenter-Scale Computing',
    fullName: 'EECS 268: Datacenter-Scale Computing',
    description: 'Google/AWS-style systems: Massive-scale infrastructure and distributed computing',
    tier: 1.5,
  },
  {
    id: 'systems-eecs-280',
    code: 'EECS 280',
    name: 'Advanced Networks & Distributed Systems',
    fullName: 'EECS 280: Advanced Networks & Distributed Systems',
    description: 'Networked infrastructure: Advanced networking protocols and distributed system design',
    tier: 1.5,
  },
];

/**
 * TIER 2 — ADVANCED SYSTEMS & INFRASTRUCTURE
 * These separate junior systems engineers from elite ones.
 * Maps directly to FAANG-level infrastructure roles.
 */
export const tier2Courses: TierCourse[] = [
  {
    id: 'systems-cse-111',
    code: 'CSE 111',
    name: 'Database Systems',
    fullName: 'CSE 111: Database Systems',
    description: 'Data infrastructure: Database internals, query optimization, and storage systems',
    tier: 2,
  },
  {
    id: 'systems-cse-120',
    code: 'CSE 120',
    name: 'Software Engineering',
    fullName: 'CSE 120: Software Engineering',
    description: 'Production systems: Building reliable, maintainable infrastructure code',
    tier: 2,
  },
  {
    id: 'systems-cse-177',
    code: 'CSE 177',
    name: 'Database Systems Implementation',
    fullName: 'CSE 177: Database Systems Implementation',
    description: 'Storage engine design: Building databases from scratch and understanding internals',
    tier: 2,
  },
];

/**
 * TIER 2.5 — MECHANICAL ENGINEERING (SYSTEMS THINKING & CONTROL)
 * Not for everyone — high payoff if chosen carefully.
 * Helps with robotics systems, embedded infrastructure, and cyber-physical systems.
 */
export const tier2_5Courses: TierCourse[] = [
  {
    id: 'systems-me-140',
    code: 'ME 140',
    name: 'Vibrations',
    fullName: 'ME 140: Vibrations',
    description: 'System stability: Understanding dynamic systems and control theory',
    tier: 2.5,
  },
  {
    id: 'systems-me-141',
    code: 'ME 141',
    name: 'Control Systems',
    fullName: 'ME 141: Control Systems',
    description: 'Feedback control: System stability and control engineering fundamentals',
    tier: 2.5,
  },
  {
    id: 'systems-me-142',
    code: 'ME 142',
    name: 'Mechatronics',
    fullName: 'ME 142: Mechatronics',
    description: 'Hardware–software integration: Bridging mechanical systems with software control',
    tier: 2.5,
  },
  {
    id: 'systems-me-145',
    code: 'ME 145',
    name: 'Lagrange Dynamics',
    fullName: 'ME 145: Lagrange Dynamics',
    description: 'Complex system modeling: Mathematical modeling of physical systems',
    tier: 2.5,
  },
  {
    id: 'systems-me-135',
    code: 'ME 135',
    name: 'Finite Element Analysis',
    fullName: 'ME 135: Finite Element Analysis',
    description: 'Performance modeling: Simulating and analyzing system behavior under load',
    tier: 2.5,
  },
  {
    id: 'systems-me-152',
    code: 'ME 152',
    name: 'Digital Twins',
    fullName: 'ME 152: Digital Twins',
    description: 'Real-world system simulation: Creating virtual models of physical systems',
    tier: 2.5,
  },
  {
    id: 'systems-me-210',
    code: 'ME 210',
    name: 'Linear Multivariable Control',
    fullName: 'ME 210: Linear Multivariable Control',
    description: 'Advanced control systems: Multi-input multi-output system control',
    tier: 2.5,
  },
];

/**
 * TIER 3 — SECURITY & RELIABILITY (OPTIONAL BUT POWERFUL)
 * Enhances systems engineering with security and formal methods.
 */
export const tier3Courses: TierCourse[] = [
  {
    id: 'systems-cse-178',
    code: 'CSE 178',
    name: 'Computer & Network Security',
    fullName: 'CSE 178: Computer & Network Security',
    description: 'Secure infrastructure: Building systems that resist attacks and maintain integrity',
    tier: 3,
  },
  {
    id: 'systems-eecs-261',
    code: 'EECS 261',
    name: 'Wireless Networks',
    fullName: 'EECS 261: Wireless Networks',
    description: 'Distributed sensing: Wireless protocols and mobile network infrastructure',
    tier: 3,
  },
  {
    id: 'systems-eecs-262',
    code: 'EECS 262',
    name: 'Embedded Sensor Networks',
    fullName: 'EECS 262: Embedded Sensor Networks',
    description: 'IoT systems: Sensor networks and edge computing infrastructure',
    tier: 3,
  },
  {
    id: 'systems-eecs-272',
    code: 'EECS 272',
    name: 'Program Verification',
    fullName: 'EECS 272: Program Verification',
    description: 'Correctness & safety: Formal methods for proving system reliability',
    tier: 3,
  },
  {
    id: 'systems-math-140',
    code: 'MATH 140',
    name: 'Optimization',
    fullName: 'MATH 140: Optimization',
    description: 'Resource allocation: Mathematical optimization for system efficiency',
    tier: 3,
  },
];

/**
 * Export all courses as a flat array for the career path configuration
 */
export const allSystemsCourses: TierCourse[] = [
  ...tier1Courses,
  ...tier1_5Courses,
  ...tier2Courses,
  ...tier2_5Courses,
  ...tier3Courses,
];

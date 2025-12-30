/**
 * SWE Tier Courses Data
 * Course recommendations organized by tier for Software Engineering career path
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
    id: "cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Team-based dev, SDLC, Git, real projects — *non-negotiable*",
    tier: 1,
  },
  {
    id: "cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "Backend dev, SQL, schemas, real-world apps",
    tier: 1,
  },
  {
    id: "cse-150",
    code: "CSE 150",
    name: "Operating Systems",
    fullName: "CSE 150: Operating Systems",
    description: "Threads, memory, concurrency → system design signal",
    tier: 1,
  },
  {
    id: "cse-160",
    code: "CSE 160",
    name: "Computer Networks",
    fullName: "CSE 160: Computer Networks",
    description: "How the internet actually works (HTTP, TCP, APIs)",
    tier: 1,
  },
  {
    id: "cse-168",
    code: "CSE 168",
    name: "Distributed Software Systems",
    fullName: "CSE 168: Distributed Software Systems",
    description: "Microservices, scalability, cloud fundamentals",
    tier: 1,
  },
  {
    id: "cse-108",
    code: "CSE 108",
    name: "Full Stack Web Development",
    fullName: "CSE 108: Full Stack Web Development",
    description: "Practical SWE skills: frontend + backend",
    tier: 1,
  },
];

export const tier2Courses: TierCourse[] = [
  // Add Tier 2 courses here
];

export const tier3Courses: TierCourse[] = [
  // Add Tier 3 courses here
];



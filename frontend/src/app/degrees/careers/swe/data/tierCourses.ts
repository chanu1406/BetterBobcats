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
  {
    id: "cse-126",
    code: "CSE 126",
    name: "Information Systems & Service Design",
    fullName: "CSE 126: Information Systems & Service Design",
    description: "Product thinking, backend services",
    tier: 2,
  },
  {
    id: "cse-155",
    code: "CSE 155",
    name: "Human-Computer Interaction",
    fullName: "CSE 155: Human-Computer Interaction",
    description: "UX-aware engineers = huge hiring bonus",
    tier: 2,
  },
  {
    id: "cse-162",
    code: "CSE 162",
    name: "Mobile Computing",
    fullName: "CSE 162: Mobile Computing",
    description: "Android/iOS dev, real apps",
    tier: 2,
  },
  {
    id: "cse-177",
    code: "CSE 177 / 177H",
    name: "Database Systems Implementation",
    fullName: "CSE 177 / 177H: Database Systems Implementation",
    description: "Deep backend + systems credibility",
    tier: 2,
  },
  {
    id: "cse-179",
    code: "CSE 179",
    name: "Parallel Computing",
    fullName: "CSE 179: Parallel Computing",
    description: "Performance, concurrency (advanced SWE)",
    tier: 2,
  },
  {
    id: "cse-140",
    code: "CSE 140",
    name: "Computer Architecture",
    fullName: "CSE 140: Computer Architecture",
    description: "Low-level understanding (optional depth)",
    tier: 2,
  },
];

export const tier3Courses: TierCourse[] = [
  // Add Tier 3 courses here
];



/**
 * SWE Tier Courses Data
 * Course recommendations organized by tier for Software Engineering career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: CORE SWE (Non-Negotiable)
 * Essential courses for all Software Engineering roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Team-based dev, SDLC, Git, real projects — non-negotiable",
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

/**
 * 🟡 TIER 2: SWE ENHANCERS
 * Strongly recommended depending on interests and career direction
 */
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

/**
 * 🟠 TIER 3: SWE-ADJACENT (Optional / Interest-Based)
 * Good if aligned with interests, not required for SWE
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "cse-175",
    code: "CSE 175",
    name: "Introduction to Artificial Intelligence",
    fullName: "CSE 175: Introduction to Artificial Intelligence",
    description: "SWE + AI curiosity; broad exposure to AI concepts",
    tier: 3,
  },
  {
    id: "cse-176",
    code: "CSE 176",
    name: "Machine Learning",
    fullName: "CSE 176: Machine Learning",
    description: "For SWE aiming at ML-adjacent or data-heavy roles",
    tier: 3,
  },
  {
    id: "cse-130",
    code: "CSE 130",
    name: "Cryptography",
    fullName: "CSE 130: Cryptography",
    description: "Security-minded SWE; encryption, hashing, protocols",
    tier: 3,
  },
  {
    id: "cse-178",
    code: "CSE 178",
    name: "Computers & Network Security",
    fullName: "CSE 178: Computers & Network Security",
    description: "SWE + cybersecurity interest; systems and network defense",
    tier: 3,
  },
  {
    id: "cse-165",
    code: "CSE 165",
    name: "Introduction to Object-Oriented Programming",
    fullName: "CSE 165: Introduction to Object-Oriented Programming",
    description: "Only recommended if core OOP fundamentals are weak",
    tier: 3,
  },
  {
    id: "cse-107",
    code: "CSE 107",
    name: "Image Processing",
    fullName: "CSE 107: Image Processing",
    description: "Specialized SWE applications; graphics and vision basics",
    tier: 3,
  },
];

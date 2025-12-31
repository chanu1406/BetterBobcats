/**
 * Cybersecurity Tier Courses Data
 * Course recommendations organized by tier for Cybersecurity career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE for Cybersecurity
 * These courses form the non-negotiable core of cybersecurity.
 * If a student wants SOC, Security Engineer, Blue Team, or Red Team, these matter most.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "cybersec-cse-178",
    code: "CSE 178",
    name: "Computers and Networks Security",
    fullName: "CSE 178: Computers and Networks Security",
    description: "Direct security concepts: threats, attacks, defenses",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 160 (Computer Networks) recommended",
      learningOutcomes: [
        "Identify common security threats and attack vectors",
        "Implement security defenses and countermeasures",
        "Understand network security protocols and practices",
        "Analyze security vulnerabilities in systems",
        "Apply security best practices to protect systems"
      ],
      topics: [
        "Security threats and attack models",
        "Cryptography and authentication",
        "Network security protocols",
        "Firewalls and intrusion detection",
        "Security policies and access control",
        "Incident response and security management"
      ],
      careerRelevance: "This is the core security course for cybersecurity careers. Essential for SOC analysts, security engineers, and anyone working in defensive or offensive security roles.",
      additionalNotes: "Considered the foundational course for all cybersecurity career paths. Strongly recommended to take early in your cybersecurity journey."
    },
  },
  {
    id: "cybersec-cse-160",
    code: "CSE 160",
    name: "Computer Networks",
    fullName: "CSE 160: Computer Networks",
    description: "You cannot secure what you don't understand",
    tier: 1,
  },
  {
    id: "cybersec-cse-150",
    code: "CSE 150",
    name: "Operating Systems",
    fullName: "CSE 150: Operating Systems",
    description: "Privileges, processes, memory, exploits",
    tier: 1,
  },
  {
    id: "cybersec-cse-031",
    code: "CSE 031",
    name: "Computer Organization & Assembly",
    fullName: "CSE 031: Computer Organization & Assembly",
    description: "Low-level attacks, reverse engineering basics",
    tier: 1,
  },
  {
    id: "cybersec-cse-130",
    code: "CSE 130",
    name: "Introduction to Cryptography",
    fullName: "CSE 130: Introduction to Cryptography",
    description: "Encryption, hashing, authentication",
    tier: 1,
  },
  {
    id: "cybersec-cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Secure coding, real systems, teamwork",
    tier: 1,
  },
];

/**
 * 🟡 TIER 2: STRONG CYBERSECURITY BOOSTERS
 * These courses create depth and differentiate students.
 * Ideal for Security Engineer or Cloud Security paths.
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "cybersec-cse-168",
    code: "CSE 168",
    name: "Distributed Software Systems",
    fullName: "CSE 168: Distributed Software Systems",
    description: "Cloud security, microservices, attack surfaces",
    tier: 2,
  },
  {
    id: "cybersec-cse-179",
    code: "CSE 179",
    name: "Parallel Computing",
    fullName: "CSE 179: Parallel Computing",
    description: "Performance, concurrency vulnerabilities",
    tier: 2,
  },
  {
    id: "cybersec-cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "SQL injection, access control, data security",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 30 or equivalent programming experience",
      learningOutcomes: [
        "Understand relational database design and normalization",
        "Write complex SQL queries and understand query optimization",
        "Implement database security measures and access controls",
        "Identify and prevent SQL injection vulnerabilities",
        "Design secure database schemas for applications"
      ],
      topics: [
        "Relational database design",
        "SQL and query optimization",
        "Database security and access control",
        "Transaction management",
        "Database indexing and performance",
        "SQL injection prevention"
      ],
      careerRelevance: "Critical for understanding how to secure data storage and prevent common web application vulnerabilities like SQL injection. Essential for security engineers working with application security.",
      additionalNotes: "This course provides foundational knowledge for securing database-driven applications. Understanding database security is crucial for both offensive and defensive security roles."
    },
  },
  {
    id: "cybersec-cse-177",
    code: "CSE 177",
    name: "Database Systems Implementation",
    fullName: "CSE 177: Database Systems Implementation",
    description: "Low-level data security understanding",
    tier: 2,
  },
  {
    id: "cybersec-cse-140",
    code: "CSE 140",
    name: "Computer Architecture",
    fullName: "CSE 140: Computer Architecture",
    description: "Hardware-level threats",
    tier: 2,
  },
  {
    id: "cybersec-cse-108",
    code: "CSE 108",
    name: "Full Stack Web Development",
    fullName: "CSE 108: Full Stack Web Development",
    description: "Web security, real attack surfaces",
    tier: 2,
  },
];

/**
 * 🟠 TIER 3: SECURITY-ADJACENT (OPTIONAL)
 * Good if aligned with interests, not core.
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "cybersec-cse-175",
    code: "CSE 175",
    name: "Intro to AI",
    fullName: "CSE 175: Intro to AI",
    description: "Security analytics",
    tier: 3,
  },
  {
    id: "cybersec-cse-176",
    code: "CSE 176",
    name: "Machine Learning",
    fullName: "CSE 176: Machine Learning",
    description: "Malware detection, anomaly detection",
    tier: 3,
  },
  {
    id: "cybersec-cse-162",
    code: "CSE 162",
    name: "Mobile Computing",
    fullName: "CSE 162: Mobile Computing",
    description: "Mobile app security",
    tier: 3,
  },
  {
    id: "cybersec-cse-185",
    code: "CSE 185",
    name: "Computer Vision",
    fullName: "CSE 185: Computer Vision",
    description: "Surveillance / CV security",
    tier: 3,
  },
  {
    id: "cybersec-cse-107",
    code: "CSE 107",
    name: "Digital Image Processing",
    fullName: "CSE 107: Digital Image Processing",
    description: "Niche forensic case",
    tier: 3,
  },
];

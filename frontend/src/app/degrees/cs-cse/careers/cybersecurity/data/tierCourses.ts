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
    description: "The \"Hacker Mindset\": Hands-on practice with threat modeling, buffer overflows, and defensive hardening",
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
      description: "The \"Hacker Mindset\": This is hands-on security training where you'll practice threat modeling, exploit buffer overflows, and build defensive hardening strategies. You'll learn how attackers think and how to defend against real threats. This is the foundation for all cybersecurity careers - SOC analyst, security engineer, or penetration testing roles.",
      additionalNotes: "Considered the foundational course for all cybersecurity career paths. Strongly recommended to take early in your cybersecurity journey."
    },
  },
  {
    id: "cybersec-cse-160",
    code: "CSE 160",
    name: "Computer Networks",
    fullName: "CSE 160: Computer Networks",
    description: "Network Defense foundation: Packet analysis (Wireshark), TCP/IP protocols, and routing security",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 30 (Data Structures)",
      learningOutcomes: [
        "Understand network protocols and layered architecture",
        "Analyze network traffic and packet structures",
        "Implement network security protocols",
        "Design secure network architectures",
        "Identify network vulnerabilities and attack vectors"
      ],
      topics: [
        "TCP/IP protocol suite",
        "Network routing and switching",
        "Network security fundamentals",
        "Wireless network security",
        "Network performance and reliability",
        "Application layer protocols"
      ],
      description: "The foundation of Network Defense: Learn packet analysis with Wireshark, master TCP/IP protocols, and understand routing security. Networks are everywhere in security - from SOC monitoring to penetration testing. You can't secure what you don't understand, and this course teaches you how networks actually work at a deep level.",
      additionalNotes: "This is a prerequisite mindset course for cybersecurity. Master networks before diving into network security concepts."
    },
  },
  {
    id: "cybersec-cse-150",
    code: "CSE 150",
    name: "Operating Systems",
    fullName: "CSE 150: Operating Systems",
    description: "Kernel-level security: Understanding privilege escalation, process isolation, and memory management exploits",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 031, CSE 030",
      learningOutcomes: [
        "Understand process management and scheduling",
        "Master memory management and virtual memory",
        "Analyze privilege escalation and access control",
        "Identify OS-level vulnerabilities",
        "Implement secure system programming"
      ],
      topics: [
        "Process and thread management",
        "Memory management and protection",
        "File systems and storage security",
        "Privilege levels and access control",
        "System calls and kernel security",
        "Common OS exploits (buffer overflow, race conditions)"
      ],
      description: "Kernel-level security: Dive deep into privilege escalation, process isolation, and memory management exploits. Operating systems control everything - processes, memory, permissions. Understanding how they work and fail at the kernel level is crucial for security engineers, malware analysts, and pen testers who need to exploit or defend OS-level vulnerabilities.",
      additionalNotes: "Understanding OS internals is crucial for exploit development and system hardening. This course provides the foundation for advanced security work."
    },
  },
  {
    id: "cybersec-cse-031",
    code: "CSE 031",
    name: "Computer Organization & Assembly",
    fullName: "CSE 031: Computer Organization & Assembly",
    description: "The key to Reverse Engineering: Reading binary, understanding stack frames, and analyzing malware at the CPU level",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 021 or CSE 015",
      learningOutcomes: [
        "Read and write assembly language code",
        "Understand CPU architecture and instruction sets",
        "Analyze binary executables and memory layout",
        "Identify low-level vulnerabilities (buffer overflows)",
        "Reverse engineer compiled programs"
      ],
      topics: [
        "Assembly language programming",
        "CPU architecture and registers",
        "Memory addressing and stack operations",
        "Function calls and calling conventions",
        "Buffer overflows and shellcode",
        "Basic reverse engineering techniques"
      ],
      description: "The key to Reverse Engineering: Learn to read binary code, understand stack frames, and analyze malware at the CPU level. This is where you master assembly language and low-level programming. If you want to do malware analysis, reverse engineering, or exploit development (buffer overflows, shellcode), this course is absolutely essential.",
      additionalNotes: "This is the foundation for binary exploitation and reverse engineering. Required knowledge for advanced security research and red team operations."
    },
  },
  {
    id: "cybersec-cse-130",
    code: "CSE 130",
    name: "Introduction to Cryptography",
    fullName: "CSE 130: Introduction to Cryptography",
    description: "Applied Cryptography: Correctly implementing (and breaking) encryption standards (PKI, AES, RSA)",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, MATH 032 or equivalent",
      learningOutcomes: [
        "Understand symmetric and asymmetric encryption",
        "Implement cryptographic protocols correctly",
        "Analyze cryptographic vulnerabilities",
        "Design secure authentication systems",
        "Evaluate hash functions and digital signatures"
      ],
      topics: [
        "Symmetric encryption (AES, DES)",
        "Public-key cryptography (RSA, ECC)",
        "Cryptographic hash functions",
        "Digital signatures and certificates",
        "Key exchange protocols",
        "Common cryptographic attacks"
      ],
      description: "Applied Cryptography: Learn to correctly implement (and break) encryption standards like PKI, AES, and RSA in software. This course teaches you how encryption, hashing, and digital signatures actually work - and more importantly, how weak implementations break. Every security professional needs to understand crypto for building secure systems or identifying cryptographic vulnerabilities.",
      additionalNotes: "Cryptography is the mathematical foundation of security. This course is critical for understanding how secure systems are built and how to break weak cryptography."
    },
  },
  {
    id: "cybersec-cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Secure SDLC: Writing code that withstands audits and integrating security into CI/CD pipelines",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, CSE 031",
      learningOutcomes: [
        "Apply secure coding practices",
        "Identify common software vulnerabilities (OWASP Top 10)",
        "Implement input validation and sanitization",
        "Design secure software architectures",
        "Collaborate on real-world security projects"
      ],
      topics: [
        "Secure software development lifecycle (SDLC)",
        "Input validation and output encoding",
        "Authentication and authorization",
        "Common vulnerabilities (XSS, CSRF, injection)",
        "Code review and security testing",
        "Team collaboration and version control"
      ],
      description: "Secure Software Development Lifecycle (SDLC): Learn to write code that withstands security audits and integrate security into CI/CD pipelines. This course teaches secure coding practices, how to identify vulnerabilities like XSS and SQL injection at the source, and how to work on real security projects with teams. Perfect preparation for application security roles.",
      additionalNotes: "This course bridges theory and practice. Understanding secure coding is critical for preventing vulnerabilities at the source and working effectively in security teams."
    },
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
    description: "Cloud Security fundamentals: Securing microservices, API endpoints, and distributed attack surfaces",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 120, CSE 160",
      learningOutcomes: [
        "Design secure distributed systems",
        "Understand cloud security architecture",
        "Identify microservices attack surfaces",
        "Implement secure APIs and service communication",
        "Analyze distributed system vulnerabilities"
      ],
      topics: [
        "Distributed system architectures",
        "Microservices security patterns",
        "Cloud security fundamentals",
        "API security and authentication",
        "Service mesh and zero-trust architecture",
        "Distributed system attack vectors"
      ],
      description: "Cloud Security fundamentals: Learn to secure microservices, API endpoints, and distributed attack surfaces. Most enterprises now use distributed systems and cloud infrastructure. This course teaches you how to design secure distributed systems, implement zero-trust architecture, and defend against modern cloud-based attacks. Essential for cloud security engineering roles.",
      additionalNotes: "Highly valuable for Security Engineer or Cloud Security paths. The modern attack surface is distributed across many services and cloud providers."
    },
  },
  {
    id: "cybersec-cse-179",
    code: "CSE 179",
    name: "Parallel Computing",
    fullName: "CSE 179: Parallel Computing",
    description: "Concurrency exploits: Identifying and preventing Race Conditions and Deadlocks",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 150",
      learningOutcomes: [
        "Understand parallel programming models",
        "Identify race conditions and concurrency bugs",
        "Analyze timing-based vulnerabilities",
        "Design secure concurrent systems",
        "Implement thread-safe code"
      ],
      topics: [
        "Multi-threading and synchronization",
        "Race conditions and deadlocks",
        "Time-of-check time-of-use (TOCTOU) vulnerabilities",
        "Parallel programming paradigms",
        "Performance vs security tradeoffs",
        "Secure concurrent data structures"
      ],
      description: "Concurrency exploits: Master identifying and preventing Race Conditions and Deadlocks in high-performance systems. These timing-based vulnerabilities (like TOCTOU - time-of-check time-of-use) are among the hardest bugs to find and exploit, but they're everywhere in modern parallel systems. Great for vulnerability researchers and system security engineers.",
      additionalNotes: "Concurrency bugs are notoriously difficult to find and exploit. This course provides the knowledge to identify and prevent them."
    },
  },
  {
    id: "cybersec-cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "Defense against the #1 web threat: Mastering SQL Injection prevention and Role-Based Access Control (RBAC)",
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
      description: "Defense against the #1 web threat: Master SQL Injection prevention and Role-Based Access Control (RBAC). SQL injection is still one of the most common and dangerous web vulnerabilities. This course teaches you how databases work, how to design secure schemas, and how to implement proper access controls. Essential for application security engineers.",
      additionalNotes: "This course provides foundational knowledge for securing database-driven applications. Understanding database security is crucial for both offensive and defensive security roles."
    },
  },
  {
    id: "cybersec-cse-177",
    code: "CSE 177",
    name: "Database Systems Implementation",
    fullName: "CSE 177: Database Systems Implementation",
    description: "Data Internals & Forensics: Understanding how data is physically stored, recovered, and logged",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 111",
      learningOutcomes: [
        "Understand database internals and storage engines",
        "Implement low-level database security mechanisms",
        "Analyze database performance and security tradeoffs",
        "Design secure data storage systems",
        "Identify database implementation vulnerabilities"
      ],
      topics: [
        "Database storage engines",
        "B-tree and index structures",
        "Transaction processing internals",
        "Query optimization and execution",
        "Buffer management and caching",
        "Low-level security mechanisms"
      ],
      description: "Data Internals & Forensics: Understand how data is physically stored, recovered, and logged on disk. This deep dive into database internals covers storage engines, indexing structures, and transaction processing. Perfect for security researchers who want to find vulnerabilities below the SQL layer and forensics experts who need to recover deleted or hidden data.",
      additionalNotes: "Deep dive into database implementation. Useful for security researchers and engineers working on database security products or analyzing database vulnerabilities."
    },
  },
  {
    id: "cybersec-cse-140",
    code: "CSE 140",
    name: "Computer Architecture",
    fullName: "CSE 140: Computer Architecture",
    description: "Hardware Security: Understanding Side-Channel attacks (like Spectre/Meltdown) and physical memory addressing",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 031",
      learningOutcomes: [
        "Understand CPU pipeline and microarchitecture",
        "Analyze hardware-level vulnerabilities",
        "Identify side-channel attacks (Spectre, Meltdown)",
        "Design secure hardware systems",
        "Evaluate hardware security mechanisms"
      ],
      topics: [
        "CPU microarchitecture and pipelining",
        "Cache organization and memory hierarchy",
        "Side-channel attacks and mitigations",
        "Hardware security features (DEP, ASLR)",
        "Speculative execution vulnerabilities",
        "Hardware-based security mechanisms"
      ],
      description: "Hardware Security: Understand Side-Channel attacks (like Spectre and Meltdown) and physical memory addressing. Learn about CPU microarchitecture, cache systems, and hardware-level vulnerabilities that bypass all software security. These attacks exploit timing, power consumption, and electromagnetic emissions. Essential for security researchers working at the cutting edge of hardware security.",
      additionalNotes: "Hardware vulnerabilities can bypass all software security measures. This course provides insight into the lowest level of system security."
    },
  },
  {
    id: "cybersec-cse-108",
    code: "CSE 108",
    name: "Full Stack Web Development",
    fullName: "CSE 108: Full Stack Web Development",
    description: "Web App Pentesting: Hands-on experience securing against the OWASP Top 10 (XSS, CSRF)",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 120",
      learningOutcomes: [
        "Build full-stack web applications",
        "Identify common web vulnerabilities (OWASP Top 10)",
        "Implement secure authentication and authorization",
        "Understand real-world web attack surfaces",
        "Design secure web architectures"
      ],
      topics: [
        "Frontend and backend web development",
        "RESTful API security",
        "Authentication and session management",
        "XSS, CSRF, and injection attacks",
        "Secure coding practices for web apps",
        "Modern web security tools and frameworks"
      ],
      description: "Web Application Pentesting: Get hands-on experience securing against the OWASP Top 10 (XSS, CSRF, Injection attacks). Web applications are the #1 attack target. This course teaches you to build full-stack web apps from scratch, which means you'll understand exactly where vulnerabilities hide and how to exploit or defend them. Perfect preparation for application security roles.",
      additionalNotes: "Combines development skills with security awareness. Ideal for students who want to work in application security or web security roles."
    },
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
    description: "Adversarial AI: Understanding how attackers manipulate automated decision systems",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, MATH 032",
      learningOutcomes: [
        "Understand AI fundamentals and algorithms",
        "Apply AI techniques to security problems",
        "Analyze AI-based threat detection systems",
        "Implement intelligent security analytics",
        "Evaluate AI security tools and products"
      ],
      topics: [
        "Search algorithms and problem solving",
        "Knowledge representation",
        "Machine learning basics",
        "AI for security analytics",
        "Intelligent threat detection",
        "AI-powered security tools"
      ],
      description: "Adversarial AI: Understand how attackers manipulate automated decision-making and search systems. AI is everywhere in modern security tools, but AI systems can be fooled. This course covers adversarial attacks on machine learning models, poisoning training data, and exploiting automated decision systems. Great for security analysts working with AI-powered tools.",
      additionalNotes: "Optional but increasingly relevant as security tools incorporate AI. Good for students interested in security analytics and threat intelligence roles."
    },
  },
  {
    id: "cybersec-cse-176",
    code: "CSE 176",
    name: "Machine Learning",
    fullName: "CSE 176: Machine Learning",
    description: "Automated Threat Intelligence: Building models to detect anomalies and zero-day malware",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, MATH 032, MATH 024",
      learningOutcomes: [
        "Apply ML algorithms to security problems",
        "Build malware detection systems",
        "Implement anomaly detection for intrusions",
        "Analyze adversarial attacks on ML models",
        "Design ML-based security solutions"
      ],
      topics: [
        "Supervised and unsupervised learning",
        "Classification and regression for security",
        "Anomaly detection techniques",
        "Malware classification with ML",
        "Adversarial machine learning",
        "ML model security and robustness"
      ],
      description: "Automated Threat Intelligence: Build models to detect network anomalies and zero-day malware signatures. Machine learning is transforming cybersecurity - from malware detection systems to anomaly-based intrusion detection. This course teaches you how to apply ML to real security problems and defend against adversarial attacks. An increasingly valuable skill set in the security job market.",
      additionalNotes: "Optional but powerful. Combines security with ML skills - a valuable and growing intersection in the job market."
    },
  },
  {
    id: "cybersec-cse-162",
    code: "CSE 162",
    name: "Mobile Computing",
    fullName: "CSE 162: Mobile Computing",
    description: "Mobile Pentesting: Android/iOS sandboxing, permission models, and app-layer vulnerabilities",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 120",
      learningOutcomes: [
        "Understand mobile platform security models",
        "Analyze mobile app vulnerabilities",
        "Implement secure mobile applications",
        "Reverse engineer mobile apps",
        "Identify mobile-specific attack vectors"
      ],
      topics: [
        "Android and iOS security architecture",
        "Mobile app permissions and sandboxing",
        "Mobile malware and analysis",
        "Secure mobile app development",
        "Mobile network security",
        "Mobile app reverse engineering"
      ],
      description: "Mobile Pentesting: Master Android/iOS sandboxing, permission models, and app-layer vulnerabilities. Mobile devices are everywhere and full of security challenges. This course covers mobile platform security models, app reverse engineering, and mobile-specific attack vectors. If you're interested in mobile security or reverse engineering mobile apps, this is the course to take.",
      additionalNotes: "Optional but useful for specific roles. Good for students interested in mobile app security, mobile malware analysis, or mobile security research."
    },
  },
  {
    id: "cybersec-cse-185",
    code: "CSE 185",
    name: "Computer Vision",
    fullName: "CSE 185: Computer Vision",
    description: "Biometric Security: Vulnerabilities in facial recognition systems and deepfake detection",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, MATH 024",
      learningOutcomes: [
        "Understand computer vision fundamentals",
        "Analyze surveillance system security",
        "Implement CV-based security applications",
        "Identify adversarial attacks on vision systems",
        "Design secure vision-based systems"
      ],
      topics: [
        "Image processing and feature detection",
        "Object recognition and tracking",
        "Facial recognition systems",
        "Adversarial examples in CV",
        "Surveillance system security",
        "Privacy concerns in vision systems"
      ],
      description: "Biometric Security: Understand vulnerabilities in facial recognition systems and deepfake detection. Computer vision is becoming critical in physical security systems and surveillance. This course covers image processing, facial recognition security, and how to attack or defend vision-based security systems. Learn about spoofing attacks and adversarial examples in computer vision.",
      additionalNotes: "Optional and specialized. Good for students interested in physical security, surveillance, or adversarial ML research."
    },
  },
  {
    id: "cybersec-cse-107",
    code: "CSE 107",
    name: "Digital Image Processing",
    fullName: "CSE 107: Digital Image Processing",
    description: "Digital Forensics: Steganography detection and analyzing manipulated image artifacts",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, MATH 024",
      learningOutcomes: [
        "Understand digital image fundamentals",
        "Apply image analysis to forensics",
        "Detect image manipulation and forgery",
        "Extract hidden information from images",
        "Implement steganography and steganalysis"
      ],
      topics: [
        "Image representation and compression",
        "Image enhancement and restoration",
        "Digital forensics and image analysis",
        "Steganography detection",
        "Image forgery detection",
        "Metadata analysis"
      ],
      description: "Digital Forensics: Master steganography detection and analyzing manipulated image artifacts. This highly specialized course focuses on analyzing digital images for forensics - detecting manipulated photos, finding hidden data in images, and working with visual evidence. Only take this if you're specifically interested in digital forensics, incident response, or investigative work.",
      additionalNotes: "Optional and highly specialized. Take only if specifically interested in digital forensics or working with visual evidence."
    },
  },
];

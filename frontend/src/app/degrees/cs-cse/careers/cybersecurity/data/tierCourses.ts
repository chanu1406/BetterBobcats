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
    description: "Foundational cybersecurity course covering threats, defenses, protocols, and hands-on security analysis",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 160 (Computer Networks) recommended",
      careerRelevance:
        "Core course for cybersecurity career paths including SOC Analyst, Security Engineer, Penetration Tester, and Network Security Analyst. Provides essential skills for identifying threats, applying defenses, and understanding real attack techniques.",

      realWorldApplications: [
        "Analyzing and defending against real network attacks and common exploit techniques",
        "Configuring and evaluating firewalls, IDS/IPS, and other security controls",
        "Applying cryptographic principles to secure communications and authentication",
        "Using security tools for scanning, reconnaissance, and vulnerability analysis",
        "Participating in incident response workflows and threat mitigation planning",
        "Translating academic security concepts into actionable defense strategies"
      ],

      learningOutcomes: [
        "Identify common security threats, attack vectors, and exploit methods",
        "Implement and evaluate security defenses and countermeasures",
        "Understand network security protocols and defensive best practices",
        "Analyze vulnerabilities using hands-on tools and techniques",
        "Apply cryptography and authentication to protect data integrity and confidentiality"
      ],

      topics: [
        "Security threats and attack models (reconnaissance, exploits, privilege escalation)",
        "Network security protocols and defense mechanisms",
        "Cryptography, authentication, and secure channel principles",
        "Firewalls, intrusion detection systems (IDS/IPS), and perimeter defense",
        "Security policies, access control, and incident response management",
        "Vulnerability scanning and basic penetration testing methods"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=6L1v0w9dEqw", // network security intro
          "https://www.youtube.com/watch?v=9_b0N3rKcPM", // cryptography basics
          "https://www.youtube.com/watch?v=8hly31xKli0", // packet analysis & Wireshark
          "https://www.youtube.com/watch?v=6RMhxN3Jwfo" // firewalls & IDS overview
        ],
        websites: [
          "https://owasp.org", // security best practices & resources
          "https://cve.org", // vulnerability catalog
          "https://mitre.org", // ATT&CK framework & tools
          "https://securityweekly.com" // podcasts & practical security insights
        ],
        tools: [
          "Wireshark", // network analysis
          "Nmap", // scanning & discovery
          "Snort", // intrusion detection
          "Metasploit", // exploitation framework
          "OpenSSL" // cryptographic operations
        ]
      },

      additionalNotes:
        "This course serves as the foundational security class for cybersecurity majors. It blends defensive concepts with hands-on analysis of attacks and is strongly recommended as an early milestone in a cybersecurity curriculum."
    }
  },
  {
    id: "cybersec-cse-160",
    code: "CSE 160",
    name: "Computer Networks",
    fullName: "CSE 160: Computer Networks",
    description: "You cannot secure what you don't understand — foundational networking principles for cybersecurity",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "Intro to Systems & Programming (recommended)",
      careerRelevance:
        "Fundamental networking knowledge is essential for cybersecurity roles such as Network Security Analyst, SOC Engineer, Incident Responder, and Penetration Tester. Understanding how networks operate makes it possible to detect, analyze, and defend against network-based threats.",

      realWorldApplications: [
        "Analyzing network traffic to detect suspicious behavior and attacks",
        "Configuring secure network protocols and defenses in enterprise environments",
        "Diagnosing network issues and understanding how attacks exploit network weaknesses",
        "Applying network fundamentals to secure cloud and hybrid infrastructures",
        "Evaluating firewall, IDS/IPS, and routing configurations for vulnerabilities",
        "Using protocol knowledge to defend against attacks like spoofing, MITM, and DDoS"
      ],

      learningOutcomes: [
        "Understand fundamental networking concepts such as models, protocols, and devices",
        "Explain how data is transmitted across networks using layered architectures",
        "Analyze how network components interact and how vulnerabilities can emerge",
        "Apply network principles to real-world cybersecurity scenarios",
        "Interpret packet flows and use network tools for monitoring and analysis"
      ],

      topics: [
        "OSI and TCP/IP networking models and protocol layering",
        "Network addressing (IPv4/IPv6), subnetting, and routing basics",
        "LAN/WAN technologies, switches, routers, and wireless fundamentals",
        "Network protocols: TCP, UDP, HTTP, DNS and their security implications",
        "Network devices, topologies, and basic diagnostics (ping, traceroute, ARP)",
        "Introduction to secure networking practices and common weaknesses"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=1_FR3XTdnTs", // Networking fundamentals
          "https://www.youtube.com/watch?v=k9ZigsW9il0", // Computer networking basics
          "https://www.youtube.com/watch?v=Uu4FW3xIx6M"  // Networking overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Computer_network", // Networking basics and structures
          "https://www.cloudflare.com/learning/networking/", // Networking explained for learners
          "https://www.geeksforgeeks.org/computer-network-tutorials/" // Networking tutorials
        ],
        tools: [
          "Wireshark", // Packet analysis
          "Nmap", // Network discovery and scanning
          "Netcat", // Networking utility for reading/writing network connections
          "Ping/Traceroute" // Network diagnostics
        ]
      },

      additionalNotes:
        "Computer Networks builds the foundation necessary to understand all network-centric attacks and defenses. In cybersecurity, networking knowledge is critical — you truly cannot secure what you do not understand at the protocol and infrastructure level." 
    }
  },
  {
    id: "cybersec-cse-150",
    code: "CSE 150",
    name: "Operating Systems",
    fullName: "CSE 150: Operating Systems",
    description: "Core OS concepts including processes, memory, privileges, file systems, and security implications",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "Intro to Systems & Programming (recommended)",
      careerRelevance:
        "Operating Systems knowledge is a must for cybersecurity careers such as Incident Response, Threat Hunting, Security Engineering, and Malware Analysis. OS fundamentals underpin how attackers exploit systems and how defenders harden them.",

      realWorldApplications: [
        "Understanding how processes and threads are scheduled and isolated affects how malware persists and hides",
        "Interpreting memory management (virtual memory, paging) to analyze memory forensics and detect exploitation",
        "Configuring OS security settings, access controls, and privilege boundaries to harden systems",
        "Evaluating file system behaviors for integrity monitoring and audit logging",
        "Interacting with OS-level tools for incident response and threat detection",
        "Analyzing how system calls mediate between user apps and kernel — a common exploitation surface"
      ],

      learningOutcomes: [
        "Explain core operating systems concepts: processes, scheduling, memory, and I/O",
        "Describe how privileges and access control mechanisms protect system resources",
        "Understand how virtual memory and paging affect program execution and security",
        "Analyze how OS components (kernel, scheduler, file system) interact and how vulnerabilities can arise",
        "Apply OS concepts to security scenarios like sandboxing, privilege escalation, and secure configurations"
      ],

      topics: [
        "Operating system architecture and kernel fundamentals",
        "Process and thread management, scheduling, and concurrency",
        "Memory management: virtual memory, paging, and segmentation",
        "File systems and persistent storage behavior",
        "Privileges, access control, and security policy enforcement",
        "OS security considerations and common exploit techniques"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=26QPDBe-QnI", // OS introduction
          "https://www.youtube.com/watch?v=3F8M2SDTxk0", // Processes & scheduling
          "https://www.youtube.com/watch?v=VxrlXmJQKAg", // Memory management explained
          "https://www.youtube.com/watch?v=aHGP00Gf6y8"  // OS security overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Operating_system", // OS concepts overview
          "https://xv6-book.com", // xv6 teaching OS book for hands-on OS understanding
          "https://os.dev/handbook/", // Practical OS internals
          "https://securityweekly.com" // Security techniques & OS topics
        ],
        tools: [
          "strace", // System call tracing
          "Procmon", // OS level process monitoring
          "GDB", // Debugging at OS level
          "Sysinternals Suite" // Windows OS tools for security analysis
        ]
      },

      additionalNotes:
        "Operating Systems is a foundational Tier 1 class for cybersecurity — it teaches how software interacts with hardware, how privileges and processes are managed, and provides essential context for how attackers exploit system weaknesses and defenders build mitigations." 
    }
  },
  {
    id: "cybersec-cse-031",
    code: "CSE 031",
    name: "Computer Organization & Assembly",
    fullName: "CSE 031: Computer Organization & Assembly",
    description: "Fundamentals of machine architecture, assembly language, and low-level computation with introductions to reverse engineering concepts",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "Intro to Programming & Data Structures (recommended)",
      careerRelevance:
        "Understanding computer organization, instruction execution, and assembly language is crucial for cybersecurity roles such as Malware Analyst, Reverse Engineer, Exploit Developer, and Vulnerability Researcher. These fundamentals enable security professionals to see how high-level code translates to machine behavior and how low-level vulnerabilities arise.",

      realWorldApplications: [
        "Reverse engineering binaries to understand malware and unauthorized code behavior",
        "Analyzing how compiled programs interact with machine hardware at the instruction level",
        "Interpreting assembly code during vulnerability research and exploit development",
        "Understanding how microarchitecture features can lead to side-channel attacks",
        "Debugging and inspecting compiled code for security issues using low-level tools",
        "Building a foundation for low-level forensic analysis and OS internals exploration"
      ],

      learningOutcomes: [
        "Explain the organization of computer hardware and how it executes instructions",
        "Translate simple programs into assembly language and understand register operations",
        "Describe how high-level constructs (like loops and functions) map to machine instructions",
        "Interpret memory layout, data representation, and instruction sequencing",
        "Apply assembly knowledge to basic reverse engineering and binary analysis tasks"
      ],

      topics: [
        "Digital logic and binary data representation",
        "CPU architecture, instruction cycle, and execution model",
        "Assembly language syntax, registers, and addressing modes",
        "Compilation process from high-level code to machine instructions",
        "Memory organization, stacks, and control flow at the machine level",
        "Introductory reverse engineering concepts and assembly analysis"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Q0FvT3LJHkI", // Intro to computer organization
          "https://www.youtube.com/watch?v=HKA8ce4L5H8", // Assembly language basics
          "https://www.youtube.com/watch?v=NhqAeQB_CZU"  // Assembly for reverse engineering basics
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Computer_organization", // Course overview and topics :contentReference[oaicite:0]{index=0}
          "https://en.wikipedia.org/wiki/Assembly_language",     // Assembly language essentials :contentReference[oaicite:1]{index=1}
          "https://stackoverflow.com/questions/tagged/assembly",  // Community knowledge / examples
          "https://reverseengineering.stackexchange.com"          // Reverse engineering Q&A
        ],
        tools: [
          "Ghidra",        // Reverse engineering / disassembler
          "Radare2",       // Low-level binary analysis
          "IDA Free",      // Interactive disassembler
          "x86emu or QEMU" // Emulator for testing machine code
        ]
      },

      additionalNotes:
        "Computer Organization & Assembly introduces how software becomes hardware-executable instructions and how understanding this mapping is essential for low-level security work such as reverse engineering, exploit research, and forensic analysis." 
    }
  },
  {
    id: "cybersec-cse-130",
    code: "CSE 130",
    name: "Introduction to Cryptography",
    fullName: "CSE 130: Introduction to Cryptography",
    description: "Foundational cryptography principles including encryption, hashing, authentication, and secure protocols",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 031 (Computer Organization & Assembly) and CSE 100 (Algorithm Design & Analysis) recommended",
      careerRelevance:
        "Cryptography is a core security discipline used in practically all cybersecurity roles — from secure system design to threat analysis, secure communications, digital signatures, key management, and protecting data confidentiality and integrity in real systems.",
  
      realWorldApplications: [
        "Designing and evaluating secure communication protocols (TLS/SSL)",
        "Implementing and analyzing encryption for data at rest and in transit",
        "Using cryptographic hashing for integrity verification and secure storage",
        "Authentication systems using cryptographic methods (password hashing, challenge-response)",
        "Key management practices and secure cryptographic lifecycle management",
        "Understanding cryptographic vulnerabilities and choosing safe primitives"
      ],
  
      learningOutcomes: [
        "Explain the fundamental concepts of cryptography and why it’s needed in security",
        "Differentiate between symmetric and asymmetric cryptographic systems",
        "Understand how hashing functions ensure data integrity",
        "Apply cryptographic primitives such as encryption, decryption, and digital signatures",
        "Recognize common cryptographic protocols and how they secure communications"
      ],
  
      topics: [
        "Symmetric cryptography and block/stream ciphers",
        "Asymmetric (public-key) cryptography and key exchange",
        "Cryptographic hash functions and message digests",
        "Digital signatures and authentication primitives",
        "Key management and secure protocol basics",
        "Real-world cryptographic systems and common pitfalls"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=j_8PLI_wCVU", // Intro to cryptography course overview
          "https://www.youtube.com/watch?v=6z5iLDKrOwg", // Symmetric vs asymmetric intro
          "https://www.youtube.com/watch?v=W1T5QC7iXAI"  // Cryptographic hash functions explained
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Outline_of_cryptography", // Cryptography overview and frameworks :contentReference[oaicite:1]{index=1}
          "https://en.wikipedia.org/wiki/Public-key_cryptography", // Public-key cryptography fundamentals :contentReference[oaicite:2]{index=2}
          "https://en.wikipedia.org/wiki/Cryptographic_hash_function" // Hash function basics :contentReference[oaicite:3]{index=3}
        ],
        tools: [
          "OpenSSL",        // Cryptographic library for encryption and certificates
          "HashCalc",       // Hash generation and verification
          "GPG / PGP",      // Public-key encryption and signing
          "Wireshark (crypto analysis)"  // Inspect cryptographic protocols in network traffic
        ]
      },
  
      additionalNotes:
        "This course introduces the mathematical and practical foundations of cryptography — essential to building secure systems. Students learn both theoretical understanding and applied techniques used in protecting modern communications and data." 
    }
  },
  {
    id: "cybersec-cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Secure coding, real systems, collaborative development with security-focused practices",
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "Intro to Programming & Data Structures recommended",
      careerRelevance:
        "Software Engineering is essential for cybersecurity engineers, secure software developers, and security-aware SRE/DevOps roles. Understanding how large systems are built collaboratively and how to bake security into design and code helps prevent vulnerabilities before they reach production.",
  
      realWorldApplications: [
        "Designing and building complex software systems with secure architecture principles",
        "Integrating secure coding practices into development workflows to reduce exploitable bugs", // secure coding reality
        "Using version control and CI/CD pipelines to ensure code quality and security automation",
        "Collaborating across teams to implement secure features while managing deadlines",
        "Conducting peer code reviews with a focus on identifying security flaws",
        "Applying agile and DevSecOps practices to shift security left in the SDLC"
      ],
  
      learningOutcomes: [
        "Apply software development lifecycle (SDLC) principles to real projects",
        "Use version control tools (e.g., Git) in team settings to manage code collaboratively",
        "Understand how secure coding practices reduce vulnerabilities in real software",
        "Design modular, maintainable, and testable software architectures",
        "Participate in code reviews and apply defensive programming techniques"
      ],
  
      topics: [
        "Software development lifecycle (SDLC) and collaborative engineering workflows",
        "Version control with Git, branching strategies, and merge workflows",
        "Secure coding principles and common vulnerability avoidance (input validation, error handling, etc.)", // secure coding
        "Testing methodologies: unit, integration, and security testing",
        "Team collaboration practices, issue tracking, and agile methodologies",
        "Real-world project planning, debugging, and deployment"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=w4rG5GY9IlA", // SWE intro basics
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc&t=109s", // Coding & Git workflows
          "https://www.youtube.com/watch?v=0Or1v_5zv_o" // Secure coding intro video
        ],
        websites: [
          "https://git-scm.com", // Core Git resource
          "https://www.owasp.org", // Secure coding and vulnerability guidance
          "https://en.wikipedia.org/wiki/Secure_coding" // Overview of secure coding practices :contentReference[oaicite:0]{index=0}
        ],
        tools: [
          "Git & GitHub",      // Version control & collaboration
          "Visual Studio Code",// IDE with security extensions
          "Static analysis tools (e.g., ESLint/SonarQube)", // Find security defects early
          "CI/CD platforms (e.g., GitHub Actions)" // Automated security checks
        ]
      },
  
      additionalNotes:
        "This course introduces how software systems are engineered collaboratively with modern tools and workflows, and emphasizes secure coding practices to prevent vulnerabilities early in development. Secure coding principles and team engineering skills are increasingly required in cybersecurity and secure software roles." 
    }
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
    description: "Foundations of distributed systems and software, including cloud computing, microservices, scalability, and extended security considerations",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 160 (Computer Networks) and CSE 150 (Operating Systems) recommended",
      careerRelevance:
        "Distributed systems are foundational for cloud, microservices, and large-scale secure applications — critical for roles such as Cloud Security Engineer, Distributed Systems Engineer, DevSecOps, and Backend Security Specialist. Understanding distributed system principles helps cybersecurity professionals secure systems that span multiple machines and services.",
  
      realWorldApplications: [
        "Designing and securing cloud-native applications using microservices and distributed architectures",
        "Understanding how distributed data replication and consistency models impact secure data storage",
        "Analyzing fault tolerance and failure modes to build resilient and secure distributed systems",
        "Applying message passing, RPCs, and secure inter-service communication patterns",
        "Evaluating distributed storage security, access control, and authentication in multi-node environments",
        "Assessing distributed system attack surfaces such as event buses, load balancers, and API gateways"
      ],
  
      learningOutcomes: [
        "Explain the fundamental principles of distributed systems including scalability, availability, and consistency",
        "Identify security challenges unique to distributed architectures and cloud platforms",
        "Understand programming models for distributed computing and how secure communications are established",
        "Analyze the behavior of distributed storage systems including replication and partitioning",
        "Apply secure design principles when building or assessing distributed software systems"
      ],
  
      topics: [
        "Distributed system models and principles: communication, concurrency, fault tolerance",
        "Scalability, availability, and consistency (CAP and related theories)",
        "Distributed storage systems: indexing, replication, partitioning, and consistency",
        "Remote Procedure Calls (RPCs), message passing, and secure inter-service communication",
        "Cloud computing fundamentals and distributed application deployment",
        "Security considerations for distributed systems including authentication and secure communication"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ajjOEltiZm4", // Intro to distributed systems
          "https://www.youtube.com/watch?v=UEAMfLPZZhE", // Fundamental distributed systems concepts
          "https://www.youtube.com/watch?v=Zd5hjcvv2fg"  // Distributed systems overview & challenges
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Distributed_computing", // Distributed systems core definitions and patterns :contentReference[oaicite:1]{index=1}
          "https://en.wikipedia.org/wiki/Distributed_file_system_for_cloud", // Cloud distributed storage and security concepts :contentReference[oaicite:2]{index=2}
          "https://www.geeksforgeeks.org/distributed-systems-introduction/" // Distributed systems introduction and examples
        ],
        tools: [
          "Docker",         // Containerized microservices and distributed deployments
          "Kubernetes",     // Orchestration and distributed service management
          "Apache Kafka",   // Distributed messaging and event streaming
          "Consul / etcd"   // Distributed configuration and service discovery
        ]
      },
  
      additionalNotes:
        "This course teaches the principles of building and understanding distributed systems — an essential foundation for securing modern cloud-based and microservice architectures. Students learn how independent computing nodes interact, how data consistency and fault tolerance are managed, and how to evaluate the security implications of distributed design."
    }
  },
  {
    id: "cybersec-cse-179",
    code: "CSE 179",
    name: "Parallel Computing",
    fullName: "CSE 179: Parallel Computing",
    description: "Performance, concurrency models, and how parallelism affects security in concurrent execution",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 150 (Operating Systems) and CSE 031 (Computer Org & Assembly) recommended",
      careerRelevance:
        "Parallel Computing is important for cybersecurity professionals working on performance-critical systems, high-performance computing, cryptographic acceleration, and secure concurrent services. Understanding concurrency and parallel execution helps identify subtle vulnerabilities like race conditions and deadlocks that arise in multi-threaded environments.",
  
      realWorldApplications: [
        "Identifying and mitigating concurrency vulnerabilities such as race conditions, deadlocks, and inconsistent states in multi-threaded systems",
        "Understanding how parallel execution models impact secure design in high-performance and real-time applications",
        "Designing and analyzing secure concurrent programs that avoid common parallelism pitfalls",
        "Applying parallel programming techniques in cryptographic acceleration and secure data processing",
        "Evaluating performance trade-offs in secure systems with multiple cores or distributed execution",
        "Using parallel frameworks and libraries (e.g., MPI, OpenMP) while maintaining thread safety and avoiding exploitable bugs"
      ],
  
      learningOutcomes: [
        "Explain the principles of parallel computing including parallel architectures and concurrency models",
        "Distinguish between concurrency and parallelism and understand how both affect program behavior and security", // conc vs parallel
        "Identify common concurrency vulnerabilities in multi-threaded and parallel code",
        "Apply parallel programming techniques and frameworks safely in performance-critical applications",
        "Analyze and debug parallel programs for correctness and security issues"
      ],
  
      topics: [
        "Parallel architectures and performance models",
        "Concurrency vs. parallelism and shared-memory vs. message-passing models", // conc vs par concepts
        "Parallel programming with threads, MPI, and high-level patterns",
        "Common concurrency issues: race conditions, synchronization, deadlocks, livelocks",
        "Parallel algorithm design and performance optimization",
        "Security implications of parallel execution and safe design patterns"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ajjOEltiZm4", // Intro to parallel computing
          "https://www.youtube.com/watch?v=UEAMfLPZZhE", // Parallel systems overview
          "https://www.youtube.com/watch?v=Zd5hjcvv2fg"  // Concepts and challenges in parallel programming
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Parallel_computing", // Fundaments of parallel computing ([en.wikipedia.org](https://en.wikipedia.org/wiki/Parallel_computing?utm_source=chatgpt.com))  
          "https://en.wikipedia.org/wiki/Concurrency_(computer_science)", // Concurrency basics & relation ([en.wikipedia.org](https://en.wikipedia.org/wiki/Concurrency_(computer_science)?utm_source=chatgpt.com))  
          "https://medium.com/@MakeComputerScienceGreatAgain/concurrency-vs-parallelism-in-programming-b85fb3d9f77f" // Distinction and relevance to secure coding :contentReference[oaicite:0]{index=0}
        ],
        tools: [
          "OpenMP",   // Shared-memory parallel programming
          "MPI",      // Distributed memory parallel programming
          "ThreadSanitizer", // Concurrency error detection
          "Valgrind Helgrind" // Race condition detection
        ]
      },
  
      additionalNotes:
        "Parallel Computing develops students’ understanding of how to structure programs that run efficiently across multiple cores or processors. Because concurrency and parallel execution introduce unique bugs and vulnerabilities (e.g., race conditions and deadlocks), this course also builds awareness of the security implications of parallel code in performance-critical systems."
    }
  },
  {
    id: "cybersec-cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "Relational databases, SQL, access control, and defending against injection attacks",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030 or equivalent programming experience",
      careerRelevance:
        "Understanding databases is essential for application security, threat analysis, and secure backend development. This course equips students to secure data storage, enforce access controls, and prevent common vulnerabilities like SQL injection which are top threats in web applications. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Designing secure and normalized relational database schemas",
        "Writing efficient SQL queries and understanding performance implications",
        "Configuring database access controls and authentication policies",
        "Identifying and remediating SQL injection vectors in application code",
        "Implementing security features like encryption and auditing in databases",
        "Collaborating with backend developers and security teams to defend data assets"
      ],
  
      learningOutcomes: [
        "Understand relational database design and normalization",
        "Write complex SQL queries and comprehend how query optimization works",
        "Implement database security measures and access control",
        "Identify and prevent SQL injection and related vulnerabilities",
        "Design secure database schemas used in modern applications"
      ],
  
      topics: [
        "Relational database design and the relational model",
        "SQL, query optimization, views, and indexing",
        "Database security concepts: roles, permissions, and policies",
        "Transaction management and concurrency control",
        "Performance tuning and execution plans",
        "Injection attacks (SQL) and their prevention mechanisms"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fiq59DuhY68", // SQL injection overview and defence
          "https://www.youtube.com/watch?v=HXV3zeQKqGY", // SQL basics
          "https://www.youtube.com/watch?v=9Pzj7Aj25lw"  // Database design fundamentals
        ],
        websites: [
          "https://en.wikipedia.org/wiki/SQL_injection",       // SQL Injection overview :contentReference[oaicite:1]{index=1}
          "https://en.wikipedia.org/wiki/Relational_database", // Relational DB fundamentals
          "https://owasp.org/www-project-top-ten/2017/A1_2017-Injection/" // OWASP injection threat info
        ],
        tools: [
          "MySQL/PostgreSQL",  // Relational database engines
          "SQLMap",            // SQL injection testing tool
          "DB Browser for SQLite", // Lightweight query tool
          "Database activity monitoring tools" // Audit & monitor DB access :contentReference[oaicite:2]{index=2}
        ]
      },
  
      additionalNotes:
        "CSE 111 is a foundational database course that teaches how data is stored, queried, and managed using SQL. While its primary subject is database systems, integrating security best practices — such as guarding against SQL injection and enforcing access control — makes this course particularly relevant for cybersecurity and secure software development."
    }
  },
  {
    id: "cybersec-cse-177",
    code: "CSE 177",
    name: "Database Systems Implementation",
    fullName: "CSE 177: Database Systems Implementation",
    description: "Internals of database management systems with implications for performance, storage, and data security",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 031, CSE 100, CSE 111, and MATH 024 (by catalog listing) recommended", 
  
      careerRelevance:
        "Database Systems Implementation gives deep insight into how database engines work under the hood — including storage management, indexing, and query execution. This helps cybersecurity professionals better understand where security controls should be placed in storage systems, how attackers can leverage internals for exploits, and how to design defenses at the system level.",
  
      realWorldApplications: [
        "Understanding DBMS internals to evaluate security implications of storage and memory management",
        "Analyzing how indexing and query execution can be exploited or fortified against attacks",
        "Developing secure data processing features in database engines",
        "Using knowledge of storage layers to detect tampering and ensure data integrity",
        "Improving secure database deployment configurations for performance and resilience",
        "Collaborating with backend, platform, and security teams to harden database infrastructure"
      ],
  
      learningOutcomes: [
        "Explain how a database system manages storage, indexing, and execution of queries",
        "Translate high-level SQL requests into low-level operations performed by the database engine",
        "Identify internal database components that have security relevance (e.g., buffer management, access paths)",
        "Apply defensive design principles when modifying or extending database code",
        "Understand performance-security trade-offs inherent in database implementation choices"
      ],
  
      topics: [
        "Storage management: pages, buffers, and memory allocation",
        "Indexing structures (B+ trees, hash tables) and their security characteristics",
        "Query parsing, optimization, and execution pipelines",
        "Transaction processing, concurrency control, and recovery",
        "Security considerations in DBMS internals",
        "Performance vs. security trade-offs in database engine architecture"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2byzOKa36o8", // DBMS internals overview (storage, indexing, execution) :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/watch?v=HXV3zeQKqGY"  // SQL basics to connect to internal mechanics :contentReference[oaicite:1]{index=1}
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Database_index",      // DB indexing fundamentals :contentReference[oaicite:2]{index=2}
          "https://en.wikipedia.org/wiki/Query_optimization",  // Query planning/execution :contentReference[oaicite:3]{index=3}
          "https://en.wikipedia.org/wiki/Database_security"    // High-level security overview :contentReference[oaicite:4]{index=4}
        ],
        tools: [
          "PostgreSQL internals modules", // Explore DBMS structures
          "SQLite source tree",           // Lightweight DB internals study
          "Valgrind",                     // Memory/behavior analysis
          "GDB"                          // Debugging at system level
        ]
      },
  
      additionalNotes:
        "Database Systems Implementation focuses on how relational DBMSs are built and optimized, giving students practical insight into components like storage engines, indexing, and query execution. Understanding these internals is valuable for security professionals who must defend data systems against attacks that exploit low-level behaviors and performance trade-offs."
    }
  },
  {
    id: "cybersec-cse-140",
    code: "CSE 140",
    name: "Computer Architecture",
    fullName: "CSE 140: Computer Architecture",
    description: "Fundamentals of hardware design, instruction execution, memory systems, and emerging hardware-level threats",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 031 (Computer Organization & Assembly) recommended",
      careerRelevance:
        "Computer Architecture is critical for cybersecurity professionals focused on hardware-level threats, secure system design, and understanding how CPUs and memory systems impact security. Knowledge from this course aids roles like Secure Systems Engineer, Malware Analyst, Hardware Security Specialist, and Cloud Security Architect.",
  
      realWorldApplications: [
        "Understanding how CPUs execute instructions and map high-level code to hardware operations",  
        "Identifying hardware-level vulnerabilities such as speculative execution side-channels (e.g., Spectre/Meltdown)",  
        "Evaluating and mitigating microarchitectural threats that bypass software defenses",  
        "Designing secure systems by appreciating how memory hierarchies and caches influence performance and security",  
        "Assessing the impact of hardware design decisions on software security guarantees",  
        "Collaborating with hardware and firmware teams to build security into system architecture"
      ],
  
      learningOutcomes: [
        "Explain core computer architecture concepts including instruction sets, memory hierarchy, and CPU design",
        "Understand how hardware components work together to execute programs and manage data",
        "Recognize how architectural features affect system performance and security",
        "Identify hardware-level vulnerabilities and their implications for overall system security",
        "Apply architectural knowledge to evaluate and design secure systems"
      ],
  
      topics: [
        "Instruction set architecture, registers, and processor datapaths",
        "Memory systems including caches, main memory, and address translation",
        "CPU control logic, pipelining, and performance optimization",
        "Hardware support for protection domains (e.g., privilege rings) and secure execution",
        "Hardware-level threats such as transient execution and speculative side-channel attacks",
        "Secure design principles in hardware architecture"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=HxO5aet5Oks", // Intro to Computer Architecture fundamentals
          "https://www.youtube.com/watch?v=NZzYwEo7yDA", // Caches & memory system basics
          "https://www.youtube.com/watch?v=a6wd2kgU0sA"  // Hardware security lecture (side channels)
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67529", // Official course description 📚 :contentReference[oaicite:0]{index=0}
          "https://en.wikipedia.org/wiki/Computer_architecture", // Architecture overview  
          "https://en.wikipedia.org/wiki/Transient_execution_CPU_vulnerability" // Side-channel hardware threats (Spectre/Meltdown) :contentReference[oaicite:1]{index=1}
        ],
        tools: [
          "RISC-V or MIPS simulators",   // Explore instruction pipelines  
          "Gem5",                         // Architectural simulation framework  
          "Cachegrind/Valgrind",          // Cache & performance analysis  
          "ChipWhisperer"                 // Hardware side-channel testing
        ]
      },
  
      additionalNotes:
        "Computer Architecture covers how CPUs and memory systems are designed and how programs are executed at the hardware level. While primarily focused on performance and design trade-offs, this course also provides essential grounding for understanding hardware vulnerabilities — including microarchitectural side-channels and speculative execution attacks — which are increasingly important in cybersecurity."
    }
  },
  {
    id: "cybersec-cse-108",
    code: "CSE 108",
    name: "Full Stack Web Development",
    fullName: "CSE 108: Full Stack Web Development",
    description: "Frontend + backend web development with emphasis on real attack surfaces and basic web security practices",
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "Intro to Programming recommended",
      careerRelevance:
        "Full stack web development is essential for security engineers, application security specialists, and penetration testers. Knowing how web applications are built end-to-end — including client UI, server logic, databases, and APIs — equips cybersecurity professionals to identify, assess, and defend against real attack surfaces that web apps expose. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Building full stack web applications with secure practices from frontend to backend",
        "Identifying common web application vulnerabilities (e.g., injection, XSS, CSRF)",
        "Understanding authentication, session management, and access control in web apps",
        "Implementing secure API endpoints and secure communication between clients and servers",
        "Collaborating with security teams to harden web architectures and minimize attack surfaces",
        "Evaluating deployment environments and web server configurations for secure operation"
      ],
  
      learningOutcomes: [
        "Understand how full stack applications are structured (frontend + backend + database)",
        "Write and debug client-side and server-side code that follows secure coding practices",
        "Identify real attack vectors in web applications and apply mitigations",
        "Implement authentication, authorization, and secure data handling patterns",
        "Use frameworks, tools, and libraries to build scalable and secure web systems"
      ],
  
      topics: [
        "Web application architecture: client–server model, REST APIs, and routing",
        "Frontend development fundamentals (HTML, CSS, JavaScript) and secure interfaces",
        "Backend development fundamentals and secure server logic",
        "Database integration and data validation to prevent injection attacks",
        "Session management, authentication, and access control",
        "Basic web security principles and mitigation strategies"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=3JluqTojuME", // Web apps intro
          "https://www.youtube.com/watch?v=UB1O30fR-EE", // MERN stack overview
          "https://www.youtube.com/watch?v=K6F2h0xDRbI"  // Web app security fundamentals
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Web_application",      // Web application basics
          "https://owasp.org/www-project-top-ten/",             // OWASP Top 10 vulnerabilities
          "https://developer.mozilla.org/en-US/docs/Web/Security" // Web security principles
        ],
        tools: [
          "Node.js / Express",    // Backend frameworks
          "React / Angular",      // Frontend frameworks
          "Postman",              // API testing  
          "OWASP ZAP"             // Web app security testing
        ]
      },
  
      additionalNotes:
        "CSE 108 explores full stack development including frontend, backend, and database systems, with foundational coverage of web security concepts. Understanding how modern web applications are built and where attack surfaces appear prepares students for roles in secure application development and web penetration testing. :contentReference[oaicite:1]{index=1}"
    }
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
    description: "AI foundations with security analytics and threat pattern recognition",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 100 (Algorithm Design & Analysis) and CSE 031 (Organization & Assembly) recommended",
      careerRelevance:
        "Foundational AI concepts support cybersecurity roles like Threat Intelligence Analyst, Security Data Scientist, and SOC Automation Engineer. AI skills power behavior-based anomaly detection, intrusion detection analytics, and automated threat triage.",
  
      realWorldApplications: [
        "Developing security analytics models for detecting threats in logs and network traffic",
        "Applying search and optimization methods to automated vulnerability scanning",
        "Using AI for automated incident classification and prioritization",
        "Integrating machine inference into security monitoring dashboards",
        "Assisting malware classification with pattern recognition"
      ],
  
      learningOutcomes: [
        "Understand core AI paradigms: search, heuristics, knowledge representation, and basic learning",
        "Apply AI methods to pattern recognition in security datasets",
        "Explore ethical considerations of AI in cybersecurity",
        "Describe how AI underpins modern threat detection tools"
      ],
  
      topics: [
        "Search algorithms (uninformed & informed) and their use in defense automation",
        "Knowledge representation and logic for security reasoning",
        "Introductory AI learning methods",
        "AI applications in anomaly and threat detection"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2ePf9rue1Ao", // AI intro & applications
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc",  // Search & logic basics
          "https://www.youtube.com/watch?v=GwIo3gDZCVQ"   // AI for pattern recognition
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Artificial_intelligence",      // AI fundamentals
          "https://owasp.org/www-project-top-10/",                     // Security context for AI analytics
          "https://www.datascience.com/learn/what-is-ai"               // Practical AI overview
        ],
        tools: [
          "Python (scikit-learn)",       // Basic AI/ML prototyping
          "Jupyter Notebooks",          // Experimentation & data exploration
          "TensorFlow/PyTorch (intro)", // Neural models & pattern analytics
          "Security SIEM with AI plugins" // AI analytics in SOC tools
        ]
      },
  
      additionalNotes:
        "Intro to AI covers classical artificial intelligence concepts — with applicability to security analytics. Students learn how AI search and representation underpin detection systems that flag anomalies, trend outliers, and automate threat prioritization." 
    }
  },
  {
    id: "cybersec-cse-176",
    code: "CSE 176",
    name: "Machine Learning",
    fullName: "CSE 176: Machine Learning",
    description: "ML techniques applied to anomaly detection, malware classification, and cybersecurity signals",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 175 (Intro to AI) or equivalent statistics/background recommended",
      careerRelevance:
        "Machine Learning is increasingly integrated into security tooling like SIEMs, IDS/IPS, and endpoint analytics. Cybersecurity roles leveraging ML include ML Security Engineer, Threat Analyst, and Research Scientist focused on behavior detection and forensic inference. :contentReference[oaicite:1]{index=1}",
  
      realWorldApplications: [
        "Building models to detect anomalous network behavior",
        "Classifying malicious vs benign binaries",
        "Automating phishing and fraud detection",
        "Feature engineering for log signal enrichment",
        "Applying supervised and unsupervised learning to security datasets"
      ],
  
      learningOutcomes: [
        "Understand supervised vs unsupervised learning paradigms",
        "Train and evaluate classification models on security datasets",
        "Apply clustering and dimensionality reduction to unlabeled threat data",
        "Analyze model performance with security outcome metrics"
      ],
  
      topics: [
        "Regression, classification, and clustering",
        "Feature selection and extraction for security signals",
        "Model overfitting/underfitting, cross-validation",
        "Evaluating models with precision, recall, ROC/AUC",
        "Adversarial ML considerations in security"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=IpGxLWOIZy4", // ML basics
          "https://www.youtube.com/watch?v=ukzFI9rgwfU", // Supervised/Unsupervised learning
          "https://www.youtube.com/watch?v=SSu00IRRraY"  // Evaluation metrics & security relevance
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Machine_learning",  // ML fundamentals
          "https://scikit-learn.org/stable/tutorial/index.html", // Practical ML
          "https://owasp.org/www-project-top-10/"             // Security context
        ],
        tools: [
          "scikit-learn",  // ML prototyping
          "TensorFlow",   // Neural network models
          "Keras",        // High-level ML API
          "Jupyter",      // Experiment notebooks
          "Security data lab frameworks" // Example SOC data for ML
        ]
      },
  
      additionalNotes:
        "Machine Learning focuses on algorithms that learn patterns from data — which are increasingly used in cybersecurity analytics for anomaly/malware detection and automated prioritization of security events." 
    }
  },
  {
    id: "cybersec-cse-162",
    code: "CSE 162",
    name: "Mobile Computing",
    fullName: "CSE 162: Mobile Computing",
    description: "Mobile app development & security concerns unique to mobile platforms",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 108 (Web Development) or CSE 030 (Data Structures) recommended",
      careerRelevance:
        "Mobile platforms are ubiquitous and frequently attacked. Roles like Mobile Security Engineer, AppSec Specialist, and Forensics Analyst require understanding of mobile OS, sandboxing, permissions models, and secure coding practices for mobile applications. :contentReference[oaicite:2]{index=2}",
  
      realWorldApplications: [
        "Building mobile apps while preventing common vulnerabilities",
        "Understanding platform-specific security architectures (Android/iOS)",
        "Implementing secure data storage, encryption, and authorization",
        "Assessing APIs and third-party components for security risks",
        "Performing mobile penetration testing"
      ],
  
      learningOutcomes: [
        "Understand mobile OS security models and permission systems",
        "Develop secure mobile applications",
        "Evaluate common mobile attack vectors (e.g., insecure storage, insecure communication)",
        "Apply platform tools to test mobile security"
      ],
  
      topics: [
        "Mobile OS concepts (sandboxing, permissions, lifecycle)",
        "Secure data storage and encryption on mobile",
        "Secure network communication from mobile clients",
        "Platform-specific security features (Android keystore, iOS keychain)",
        "API security in mobile apps",
        "Mobile threat vectors and mitigation"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=3y6wdJ82pSw",  // Mobile app security intro
          "https://www.youtube.com/watch?v=XZQDwEf-ngg",  // Android security model
          "https://www.youtube.com/watch?v=YF3lR8sR6JY"   // iOS security basics
        ],
        websites: [
          "https://owasp.org/www-project-mobile-top-10/",    // OWASP Mobile Top Ten
          "https://developer.android.com/security",        // Android security docs
          "https://developer.apple.com/security/"          // iOS security
        ],
        tools: [
          "MobSF (Mobile Security Framework)", // Static/dynamic analysis
          "Frida",                             // Dynamic instrumentation
          "Burp Suite",                        // Proxy testing for mobile
          "Android Studio / Xcode"             // Secure dev tools
        ]
      },
  
      additionalNotes:
        "Mobile Computing covers the architecture and development of mobile apps — but with a cybersecurity lens, students learn what security issues arise in mobile ecosystems and how to defend against them." 
    }
  },
  {
    id: "cybersec-cse-185",
    code: "CSE 185",
    name: "Computer Vision",
    fullName: "CSE 185: Computer Vision",
    description: "Computer vision algorithms with security and surveillance applications",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 176 (Machine Learning) recommended",
      careerRelevance:
        "Computer Vision is vital for surveillance, biometric security, and automated monitoring systems. Security roles leveraging CV include AI Security Engineer, Vision for Security Application Developer, and Threat Detection Specialist in video analytics. :contentReference[oaicite:3]{index=3}",
  
      realWorldApplications: [
        "Building vision-based threat detection for cameras and automated surveillance",
        "Using image recognition for secure access control",
        "Analyzing video streams for anomaly detection",
        "Defending against vision-based spoofing (face recognition attacks)"
      ],
  
      learningOutcomes: [
        "Understand core vision techniques such as feature detection, segmentation, and object recognition",
        "Apply vision models to security-relevant data",
        "Evaluate vision algorithms in real-world environments"
      ],
  
      topics: [
        "Image formation and representation",
        "Feature extraction and matching",
        "Object detection & recognition",
        "Vision applications in surveillance",
        "Performance and robustness in adversarial environments"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=PmZ29Vta7Vc", // Computer Vision overview
          "https://www.youtube.com/watch?v=oXlwWbU8l2o", // Feature detection
          "https://www.youtube.com/watch?v=EyYwhShvtu0"   // Object recognition basics
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Computer_vision", // CV fundamentals
          "https://opencv.org/"                            // Vision library
        ],
        tools: [
          "OpenCV",      // Vision library
          "TensorFlow",  // Vision ML models
          "YOLO",        // Real-time detection
          "Security video analytics kits" // Real-world CV security stacks
        ]
      },
  
      additionalNotes:
        "Computer Vision equips students with tools for interpreting visual data. In security, this applies to surveillance systems, biometric authentication, and automated monitoring tools." 
    }
  },
  {
    id: "cybersec-cse-107",
    code: "CSE 107",
    name: "Digital Image Processing",
    fullName: "CSE 107: Digital Image Processing",
    description: "Image processing foundations with niche forensic/security applications",
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "Intro Programming recommended",
      careerRelevance:
        "Digital Image Processing supports cybersecurity fields involving forensic analysis, evidence validation, and multimedia integrity verification. Understanding how images are processed and manipulated aids analysts who investigate altered media or visual evidence.",
  
      realWorldApplications: [
        "Enhancing and restoring forensic visual evidence",
        "Detecting tampering and steganography in images",
        "Applying filters to extract forensically relevant features",
        "Automating visual clues for incident review"
      ],
  
      learningOutcomes: [
        "Understand digital transformation techniques (filters, Fourier transforms)",
        "Apply enhancement and restoration to forensic imagery",
        "Detect anomalies and tampering artifacts"
      ],
  
      topics: [
        "Image representation and sampling",
        "Filtering and enhancement",
        "Feature extraction",
        "Transforms (Fourier, wavelets)",
        "Compression and artifacts",
        "Forensic detection patterns"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=EyYwhShvtu0", // Image processing basics
          "https://www.youtube.com/watch?v=PmZ29Vta7Vc"  // Intro to image processing
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Digital_image_processing", // DIP fundamentals
          "https://opencv.org/"                                     // Practical library
        ],
        tools: [
          "OpenCV",      // Image processing library
          "MATLAB Image Processing Toolbox", // Classic tool
          "StegExpose",  // Detect steganography
          "Forensic suites" // Tools for evidence analysis
        ]
      },
  
      additionalNotes:
        "Digital Image Processing dives into pixel-level operations used in vision and multimedia. In cybersecurity, this equips students for specialized roles like image forensics and manipulation detection." 
    }
  },
  
];

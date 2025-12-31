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
    expandedInfo: {
      credits: 4,
      careerRelevance: "CSE 120 mirrors real-world software engineering environments by emphasizing team-based development, version control, design processes, and maintainable code. It prepares students for SWE roles by teaching how professional teams plan, build, test, and ship software collaboratively using industry-standard workflows.",
      realWorldApplications: [
        "Working on cross-functional software teams using Git and collaborative workflows",
        "Designing and implementing production-style software systems",
        "Applying software development lifecycle (SDLC) models used in industry",
        "Writing maintainable, reusable, and scalable code for long-term projects",
        "Participating in code reviews, debugging, and iterative feature development",
        "Managing project scope, deadlines, and deliverables in a team setting"
      ],
      learningOutcomes: [
        "Understand and apply modern software engineering principles and design methodologies",
        "Gain hands-on experience with team-based software development",
        "Learn how to use version control systems (e.g., Git) effectively in collaborative projects",
        "Develop skills in designing reliable, efficient, and maintainable software systems",
        "Practice standard project management and development workflows",
        "Improve communication and collaboration skills within technical teams",
        "Experience the full lifecycle of a software project from design to delivery"
      ],
      resources: {
        videos: ["https://www.youtube.com/watch?v=w4rG5GY9IlA","https://www.youtube.com/watch?v=RGOj5yH7evk&t=425s","https://www.youtube.com/watch?v=mJ-qvsxPHpY&t=1s"
          , "https://www.youtube.com/watch?v=i53Gi_K3o7I&t=234s","https://www.youtube.com/watch?v=F2FmTdLtb_4","https://www.youtube.com/watch?v=_uQrJ0TkZlc&t=109s","https://www.youtube.com/watch?v=wSDyiEjhp8k",
          "https://www.youtube.com/@ArjanCodes"
        ],
        websites: ["https://github.com","https://www.geeksforgeeks.org/","https://neetcode.io/","https://medium.com/write-a-catalyst/7-websites-that-i-visit-daily-as-a-9-5-software-engineer-751f044430a4"],
        tools: ["Git","GitHub","Visual Studio Code","Cursor"]
      }
    }
  },
  {
    id: "cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "Backend dev, SQL, schemas, real-world apps",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 111 is foundational for software engineers building real-world applications. It teaches how data is modeled, stored, queried, and optimized in production systems. Nearly all backend, full-stack, and data-driven SWE roles rely on strong database design, SQL proficiency, and an understanding of performance, consistency, and scalability tradeoffs.",
      realWorldApplications: [
        "Designing relational database schemas for production applications",
        "Writing SQL queries to power backend APIs and application logic",
        "Storing and retrieving user, transaction, and application data",
        "Optimizing queries and indexes for performance at scale",
        "Ensuring data integrity, consistency, and reliability in software systems",
        "Supporting real-world systems like e-commerce platforms, social networks, and analytics pipelines"
      ],
      learningOutcomes: [
        "Understand core database concepts including schemas, relations, keys, and constraints",
        "Gain proficiency in SQL for querying and manipulating relational data",
        "Learn how to design normalized and efficient database schemas",
        "Understand indexing, query optimization, and performance considerations",
        "Learn how databases integrate with backend software systems",
        "Develop the ability to reason about data consistency, transactions, and reliability",
        "Apply database concepts to real-world software engineering problems"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7S_tz1z_5bA", // SQL Course for Beginners — full tutorial on SQL basics and queries :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/watch?v=HXV3zeQKqGY", // Full Database Course for Beginners — MySQL & DB basics :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=NdeeSEknp58", // Relational DBMS course Lecture — database design & relations :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/results?search_query=SQL+database+design+tutorial", // Series of practical DB design videos on YouTube :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/results?search_query=postgresql+sql+beginner+tutorial" // PostgreSQL tutorial videos for real SQL practice :contentReference[oaicite:4]{index=4}
        ],
        websites: [
          "https://sqlzoo.net",       // Interactive SQL practice and exercises :contentReference[oaicite:5]{index=5}
          "https://sqlbolt.com",      // Interactive SQL lessons with embedded exercises :contentReference[oaicite:6]{index=6}
          "https://www.w3schools.com/sql", // Beginner-friendly SQL tutorials :contentReference[oaicite:7]{index=7}
          "https://www.coursera.org/courses?query=database", // Structured DB courses including design & SQL :contentReference[oaicite:8]{index=8}
          "https://www.freecodecamp.org/news/tag/sql" // Free educational articles and SQL guidance :contentReference[oaicite:9]{index=9}
        ],
        tools: [
          "MySQL Workbench",  // Visual database design & SQL query tool :contentReference[oaicite:10]{index=10}
          "DBeaver",          // Multi-platform database administration & query tool :contentReference[oaicite:11]{index=11}
          "SQuirreL SQL Client", // Universal SQL client for exploring databases :contentReference[oaicite:12]{index=12}
          "PostgreSQL",       // Widely used open-source relational database engine
          "SQLite"            // Lightweight embedded SQL database for apps and testing
        ]      
      }
    }
  },
  {
    id: "cse-150",
    code: "CSE 150",
    name: "Operating Systems",
    fullName: "CSE 150: Operating Systems",
    description: "Threads, memory, concurrency → system design signal",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 150 teaches foundational operating system concepts that every software engineer needs to understand how modern systems actually run. Topics like process and thread management, memory handling, scheduling, synchronization, and I/O are essential for writing efficient, correct, and scalable backend code, debugging systems issues, and understanding performance trade-offs in real software systems.",
  
      realWorldApplications: [
        "Understanding how operating systems manage CPU, memory, and I/O resources in real deployments",
        "Writing and optimizing multithreaded programs that are safe from race conditions and deadlocks",
        "Diagnosing performance bottlenecks that arise from process scheduling or memory use",
        "Interpreting how virtualization and memory hierarchies affect containerized and cloud-hosted services",
        "Using OS primitives (threads, synchronization, sockets) when building scalable backend and systems software",
        "Debugging crashes, memory leaks, and resource contention in large codebases"
      ],
  
      learningOutcomes: [
        "Understand the role and structure of modern operating systems, including kernels and user-land interactions",
        "Explain and implement process and thread management concepts including scheduling and context switching",
        "Apply synchronization mechanisms, prevent race conditions, and handle inter-process communication",
        "Describe memory management techniques such as paging, segmentation, and virtual memory",
        "Analyze performance and resource trade-offs in OS behavior and system design",
        "Explore file systems, device I/O, and OS support for networking and storage",
        "Build and debug concurrent programs with real OS tools and environments"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7ge7u5VUSbE&list=PL9vTTBa7QaQPdvEuMTqS9McY-ieaweU8M", //Core dumped videos are the best
          "https://www.youtube.com/watch?v=dOiA2nNJpc0", // Intro to Operating Systems (fundamentals) :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=Tt5GKnfHUlY", // OS basics in ~25 min (scheduling, memory, threads) :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/watch?v=Wv7mzX8w3jI", // Processes & threads (concurrency basics) :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/watch?v=3obEP8eLsCw", // Complete OS deep dive video :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/watch?v=EsGbQ0St5sc"  // Thread fundamentals lecture (university) :contentReference[oaicite:5]{index=5}
        ],
  
        websites: [
          "https://oscourse.org/", // Full free online OS course with slides & lectures :contentReference[oaicite:6]{index=6}
          "https://www.geeksforgeeks.org/operating-systems/operating-systems/", // OS tutorial (process, scheduling, memory) :contentReference[oaicite:7]{index=7}
          "https://www.codecademy.com/learn/fundamentals-of-operating-systems", // Interactive OS fundamentals lessons (process, memory) :contentReference[oaicite:8]{index=8}
          "https://openstax.org/books/introduction-computer-science/pages/6-2-fundamental-os-concepts", // OS concepts overview :contentReference[oaicite:9]{index=9}
          "https://www.coursera.org/learn/bits-operating-systems" // Structured OS courses (threads, memory, scheduling) :contentReference[oaicite:10]{index=10}
        ],
  
        tools: [
          "Linux (Ubuntu / Fedora)",         // Real OS environment for experimentation
          "GDB",                             // Debugger for processes/threads
          "Valgrind",                        // Memory analysis & leak detection
          "QEMU",                            // Emulator for OS projects and experimentation
          "Pintos"                           // Instructional OS to explore kernel internals :contentReference[oaicite:11]{index=11}
        ]
      }
    }
  },
  {
    id: "cse-160",
    code: "CSE 160",
    name: "Computer Networks",
    fullName: "CSE 160: Computer Networks",
    description: "How the internet actually works (HTTP, TCP, APIs)",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 160 teaches the fundamental networking principles that every software engineer needs in a connected world. Understanding protocols like TCP/IP, HTTP, DNS, routing, and APIs is essential for building performant and reliable distributed systems, debugging network issues in production, and collaborating effectively with backend, infrastructure, and cloud teams. This knowledge also underpins many SWE interview topics and real system design decisions.",
  
      realWorldApplications: [
        "Designing and optimizing backend systems that communicate over the internet",
        "Building and debugging RESTful APIs and client-server applications",
        "Understanding how protocols like TCP and HTTP affect application performance and reliability",
        "Diagnosing network bottlenecks and connectivity issues in distributed systems",
        "Implementing secure communication using TLS/HTTPS",
        "Making informed decisions about caching, load balancing, and network architecture"
      ],
  
      learningOutcomes: [
        "Understand the structure and purpose of the TCP/IP and OSI models",
        "Explain how data is transmitted across networks using protocols like IP, TCP, UDP, and HTTP",
        "Understand addressing, routing, ports, and sockets",
        "Distinguish between different transport protocols and their trade-offs (e.g., TCP vs UDP)",
        "Apply networking concepts to real applications such as web services and APIs",
        "Analyze how network behavior impacts application performance and user experience",
        "Use network debugging tools and techniques to diagnose common issues"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=EPoNyBss5I8", // TCP/IP and Networks Explained (layers & protocols) :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=LUxeuFz_GQo", // TCP/IP Made Super Easy for Beginners :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/watch?v=DYgRqIeuwVQ", // Networking basics in ~25 min (OSI, IP, TCP/UDP) :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/watch?v=Cy5IgZHbOHI", // TCP/IP Model Overview (beginner friendly) :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/playlist?list=PLEoK7C0HvDQnkx_yBfuFCvF7ecfCKiWA_", // Full playlist on TCP/IP networking :contentReference[oaicite:5]{index=5}
          // Network Chuck videos: generally recommended on Reddit as a *solid crash course* starter, though personal taste varies. :contentReference[oaicite:6]{index=6}
          "https://www.youtube.com/results?search_query=network+chuck+computer+networking"
        ],
  
        websites: [
          "https://www.geeksforgeeks.org/computer-network-tutorials/", // Networking fundamentals and protocols :contentReference[oaicite:7]{index=7}
          "https://en.wikipedia.org/wiki/Internet_protocol_suite", // TCP/IP protocol stack basics :contentReference[oaicite:8]{index=8}
          "https://en.wikipedia.org/wiki/Computer_network", // Computer network overview :contentReference[oaicite:9]{index=9}
          "https://dev.to/nicks101/8-computer-networking-resources-for-all-levels-766", // Networking resource list & tips :contentReference[oaicite:10]{index=10}
          "https://www.coursera.org/learn/computer-networking" // Structured networking course (Google IT Support) :contentReference[oaicite:11]{index=11}
        ],
  
        tools: [
          "Wireshark",           // Industry tool for capturing and analyzing network packets
          "curl",                // Command-line HTTP client for testing APIs
          "Postman",             // API development and debugging tool
          "tcpdump",             // CLI packet analyzer for low-level network inspection
          "netcat (nc)",          // Utility for reading/writing network connections and testing services
          "nmap",
        ]
      }
    }
  },
  {
    id: "cse-168",
    code: "CSE 168",
    name: "Distributed Software Systems",
    fullName: "CSE 168: Distributed Software Systems",
    description: "Microservices, scalability, cloud fundamentals",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 168 teaches the core concepts behind designing, building, and operating software that runs across multiple machines — the backbone of modern internet-scale applications. Knowledge of scalability, consistency, fault tolerance, microservices, and cloud-native patterns is essential for SWE roles involving backend development, cloud services, platform engineering, and system design interviews. Graduates of this course will better understand how distributed systems power today’s large-scale applications and services.",
  
      realWorldApplications: [
        "Designing scalable microservices that can handle millions of users",
        "Building RESTful and RPC-based services that run across clusters",
        "Understanding cloud fundamentals like service coordination, replication, and load balancing",
        "Implementing fault-tolerant systems that remain available despite failures",
        "Using patterns like event-driven communication and distributed caches",
        "Making architectural decisions about consistency, partitioning, and replication"
      ],
  
      learningOutcomes: [
        "Understand what defines a distributed system and why they are used in modern SWE",
        "Explain scalability challenges and techniques such as sharding, partitioning, and replication",
        "Distinguish between consistency models and the trade-offs between availability and consistency",
        "Design and analyze communication between distributed components via APIs, messaging, and RPCs",
        "Apply microservices architectural patterns and cloud-native approaches to real systems",
        "Assess system resilience strategies including retries, timeouts, circuit breakers, and replication",
        "Leverage distributed system design principles in building scalable, maintainable, and resilient software"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=pa27idiClUA", // Distributed Systems Explained — basics of nodes, communication, scalability, fault tolerance :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=UEAMfLPZZhE", // Intro to Distributed Systems — fundamental definition and why they matter :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/watch?v=OyTEd9h_CVQ", // Distributed systems intro with scalability explanation :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/watch?v=WhZ4PEn9v90", // Microservices & distributed architecture on cloud platforms :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/results?search_query=network+chuck+microservices+cloud" // Suggestions from Network Chuck for approachable distributed systems & cloud content
        ],
  
        websites: [
          "https://www.geeksforgeeks.org/system-design/microservices-vs-distributed-system/", // Microservices vs distributed systems explained :contentReference[oaicite:5]{index=5}
          "https://www.coursera.org/courses?query=distributed+systems", // Structured courses on distributed systems principles & tools :contentReference[oaicite:6]{index=6}
          "https://en.wikipedia.org/wiki/Scale_cube", // The Scale Cube model for application scalability architecture :contentReference[oaicite:7]{index=7}
          "https://en.wikipedia.org/wiki/Event-driven_architecture", // Event-driven architecture model for scalable distributed systems :contentReference[oaicite:8]{index=8}
          "https://en.wikipedia.org/wiki/Service-oriented_architecture" // SOA context and service concepts foundational to microservices :contentReference[oaicite:9]{index=9}
        ],
  
        tools: [
          "Docker",        // Containerization tool for packaging and running distributed services
          "Kubernetes",    // Orchestration platform for managing distributed microservices and scaling
          "Apache Kafka",  // Distributed streaming platform used in scalable event-driven architectures
          "Prometheus",    // Monitoring and alerting toolkit for distributed systems
          "gRPC"           // High-performance RPC framework used in microservices communication
        ]
      }
    }
  },
  {
    id: "cse-108",
    code: "CSE 108",
    name: "Full Stack Web Development",
    fullName: "CSE 108: Full Stack Web Development",
    description: "Practical SWE skills: frontend + backend",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 108 equips students with practical web engineering skills that are essential for modern software engineering roles. This course covers both frontend and backend development — teaching how to build interactive user interfaces, develop server-side logic, design APIs, work with databases, and deploy full web applications. These skills directly map to real SWE work, enabling students to contribute to production code, build scalable web services, and understand the full software stack.",
  
      realWorldApplications: [
        "Building dynamic, responsive user interfaces for web applications",
        "Developing backend services and RESTful APIs that power web and mobile clients",
        "Connecting applications to databases for persistent storage and query handling",
        "Deploying web applications to cloud platforms and managing environments",
        "Implementing authentication, form handling, and client-server communication",
        "Testing, debugging, and optimizing full-stack applications in team environments"
      ],
  
      learningOutcomes: [
        "Understand core frontend technologies including HTML, CSS, and JavaScript",
        "Develop interactive UI components and manage application state",
        "Design and implement server-side logic using a backend framework (e.g., Node.js, Django, or similar)",
        "Build, document, and secure RESTful APIs",
        "Integrate frontend and backend using AJAX, fetch, or HTTP clients",
        "Work with databases (SQL or NoSQL) to store, retrieve, and manipulate data",
        "Deploy and maintain web applications using modern cloud or hosting platforms"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ZxKM3DCV2kE", // Full Stack Web Dev Course ~22hrs covering major topics :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=LzMnsfqjzkA", // Complete beginner-friendly full-stack tutorial :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/results?search_query=Traversy+Media+full+stack+web+development", // Traversy Media tutorials (HTML/CSS/JS + Node/Express) :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/results?search_query=freecodecamp+web+development", // freeCodeCamp tutorials on full stack topics :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/results?search_query=The+Net+Ninja+full+stack+web+development" // The Net Ninja playlists on JS frameworks & backend :contentReference[oaicite:5]{index=5}
        ],
  
        websites: [
          "https://www.freecodecamp.org", // Project-based interactive learning platform for full-stack web dev :contentReference[oaicite:6]{index=6}
          "https://www.theodinproject.com", // Full stack project-oriented curriculum with assignments :contentReference[oaicite:7]{index=7}
          "https://www.codecademy.com/learn/paths/full-stack-engineer-career-path", // Structured full-stack career path (HTML, CSS, JS, backend) :contentReference[oaicite:8]{index=8}
          "https://developer.mozilla.org/en-US/docs/Learn", // MDN Web Docs — authoritative tutorials & references on HTML, CSS, JS :contentReference[oaicite:9]{index=9}
          "https://www.coursera.org/courses?query=full+stack+web+development" // Full-stack course listings with frontend/back-end integration :contentReference[oaicite:10]{index=10}
        ],
  
        tools: [
          "Visual Studio Code",   // IDE with extensions for both frontend & backend development
          "Git",                 // Version control system used in team software projects
          "Node.js",             // Runtime for backend JavaScript, often paired with Express
          "React",               // Popular frontend framework for building interactive UIs
          "Postman"              // API testing and debugging tool
        ]
      }
    }
  }
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
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 126 teaches the *end-to-end design life cycle* for information systems and services, building product thinking and system design skills that are crucial for software engineers working on backend services, APIs, and user-focused systems. It trains students to define problems, analyze user needs, and create service solutions — foundational competencies for SWE roles that require architecting software solutions that serve real users and business goals. The course bridges technical implementation with user and stakeholder understanding, which is key to building impactful products in industry environments.",
  
      realWorldApplications: [
        "Translating product requirements into scalable backend service designs",
        "Conducting user research and stakeholder analysis to guide system requirements",
        "Creating system and service blueprints that inform development teams",
        "Collaborating on team-based design, prototyping, and evaluation of services",
        "Using design-thinking to prioritize features based on customer value",
        "Evaluating service quality, usability, and system performance after deployment"
      ],
  
      learningOutcomes: [
        "Understand the end-to-end design lifecycle for information systems and services, including ideation, research, and implementation planning",  // course overview per UC Merced catalog
        "Conduct stakeholder and user analysis to identify system requirements and success criteria", // design lifecycle context
        "Develop use cases, process models, and service blueprints to plan system structure",
        "Apply design-thinking methodologies to conceive service concepts that solve real problems",
        "Iteratively prototype, test, and refine service designs with stakeholder feedback",
        "Integrate backend service design considerations such as APIs, data workflows, and system scalability",
        "Communicate design concepts effectively to technical and non-technical audiences"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=product+design+thinking+for+software+engineers", // product thinking & service design overviews
          "https://www.youtube.com/results?search_query=UX+service+design+tutorial", // service design fundamentals that apply to SWE
          "https://www.youtube.com/results?search_query=stakeholder+analysis+in+product+management", // stakeholder analysis basics for engineering teams
          "https://www.youtube.com/results?search_query=design+thinking+for+software+development", // design thinking in system engineering context
          "https://www.youtube.com/results?search_query=API+design+best+practices" // fundamental API design approaches for backend systems
        ],
  
        websites: [
          "https://www.interaction-design.org/courses/service-design-fundamentals", // service design theory & frameworks
          "https://www.atlassian.com/agile/product-management", // product thinking and feature prioritization concepts
          "https://uxplanet.org/service-design-basics-for-software", // service design basics tailored to tech products
          "https://www.coursera.org/learn/product-management", // structured product design & market thinking course
          "https://www.smashingmagazine.com/2020/03/guide-ux-design-figma/" // best practices in UX and design patterns relevant to information systems
        ],
  
        tools: [
          "Figma",         // UI/UX and service blueprinting/prototyping tool
          "Miro",          // Collaborative whiteboard for service design and process mapping
          "Lucidchart",    // Drafting flowcharts and system models
          "Postman",       // API exploration/testing for backend service design
          "Notion"         // Backlog organization, documentation, and design notes
        ]
      }
    }
  },
  {
    id: "cse-155",
    code: "CSE 155",
    name: "Human-Computer Interaction",
    fullName: "CSE 155: Human-Computer Interaction",
    description: "UX-aware engineers = huge hiring bonus",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 155 teaches how to design and evaluate user-centered systems — a key differentiator for software engineers in the job market. Knowing HCI principles helps engineers build intuitive, accessible, and delightful user experiences, communicate more effectively with designers and product teams, and deliver software that solves real user problems. These skills are increasingly valued in SWE roles where product usability and customer satisfaction are priorities.",
  
      realWorldApplications: [
        "Designing user interfaces and experiences that are intuitive, efficient, and accessible",
        "Conducting user research and usability testing to validate design decisions",
        "Collaborating with product managers and designers to define user requirements",
        "Iterating software interfaces based on user feedback and performance data",
        "Applying HCI and UX principles to mobile, web, and desktop applications",
        "Improving product metrics like engagement, task success, and user satisfaction"
      ],
  
      learningOutcomes: [
        "Understand foundational concepts in human-computer interaction, including how users perceive and interact with software systems", // general HCI definition and scope :contentReference[oaicite:0]{index=0}
        "Apply human-centered design principles to create usable and satisfying interface designs", // user-centered emphasis :contentReference[oaicite:1]{index=1}
        "Conduct basic user research and usability testing to gather insights about users’ needs and behavior", // research + evaluation in HCI :contentReference[oaicite:2]{index=2}
        "Develop prototypes of interactive systems and iterate designs based on user feedback", // prototyping focus :contentReference[oaicite:3]{index=3}
        "Evaluate interactive systems using qualitative and quantitative methods", // evaluation strategies :contentReference[oaicite:4]{index=4}
        "Communicate design ideas effectively with both technical and non-technical audiences" // articulation skills in design :contentReference[oaicite:5]{index=5}
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=yNzLBI0wsGU", // What is HCI? — primer on field and interaction concepts :contentReference[oaicite:6]{index=6}
          "https://www.youtube.com/results?search_query=human+computer+interaction+tutorial", // Beginner HCI tutorials with UX/interaction focus
          "https://www.youtube.com/results?search_query=usability+testing+human+computer+interaction", // Usability testing explained
          "https://www.youtube.com/results?search_query=design+thinking+for+software+engineers", // Design thinking applied to SWE workflows
          "https://www.youtube.com/results?search_query=interaction+design+patterns" // Interaction design patterns for UI/UX
        ],
  
        websites: [
          "https://www.interaction-design.org/literature/topics/human-computer-interaction", // HCI fundamentals and UX principles :contentReference[oaicite:7]{index=7}
          "https://www.geeksforgeeks.org/system-design/introduction-to-human-computer-interface-hci/", // Intro to HCI with examples :contentReference[oaicite:8]{index=8}
          "https://www.coursera.org/courses?query=human+computer+interaction", // Structured courses on interaction design & usability :contentReference[oaicite:9]{index=9}
          "https://www.nngroup.com/articles/definition-user-experience/", // Nielsen Norman Group UX fundamentals (industry standard for UX/HCI)
          "https://www.usability.gov/" // Gov guide to usability and user-centered design (methods & process)
        ],
  
        tools: [
          "Figma",       // UI/UX design & prototyping
          "Adobe XD",    // Interactive design and prototyping tool
          "Miro",        // Collaborative whiteboard for design ideation
          "UserTesting", // Platform for usability test sessions
          "Optimal Workshop" // Tools for UX research (card sorting, tree testing)
        ]
      }
    }
  },
  {
    id: "cse-162",
    code: "CSE 162",
    name: "Mobile Computing",
    fullName: "CSE 162: Mobile Computing",
    description: "Android/iOS dev, real apps",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 162 teaches the fundamentals of mobile application development and the unique challenges of building software for portable devices. It gives students the skills to create real Android and iOS apps, understand mobile platforms, and integrate backend services and APIs — all highly valuable in SWE roles where mobile platforms are a major user interface layer and market segment.",
  
      realWorldApplications: [
        "Developing production-quality mobile applications for Android and iOS devices",
        "Integrating APIs and backend services for data-driven mobile apps",
        "Applying UI/UX design principles to build intuitive and responsive mobile interfaces",
        "Optimizing performance, memory use, and battery efficiency for mobile platforms",
        "Publishing and maintaining mobile apps through app stores and deployment pipelines",
        "Debugging device-specific issues and handling cross-platform compatibility"
      ],
  
      learningOutcomes: [
        "Understand core mobile computing principles including device capabilities and constraints", 
        "Develop native Android apps using languages and frameworks such as Kotlin and Java", 
        "Build iOS apps using Swift and Xcode development tools", 
        "Integrate mobile frontends with backend APIs and cloud services", 
        "Design user interfaces that adapt to different screen sizes and device inputs",
        "Implement mobile storage, local data persistence, and networking features",
        "Test and debug mobile applications on emulators and physical devices"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=mobile+app+development+tutorial+for+beginners", // high-level mobile app dev intro
          "https://www.youtube.com/results?search_query=android+studio+tutorial", // Android Studio tutorials (official)
          "https://www.youtube.com/results?search_query=ios+app+development+swift+tutorial", // iOS Swift app tutorials
          "https://www.youtube.com/results?search_query=react+native+tutorial", // Cross-platform mobile dev with React Native
          "https://www.youtube.com/results?search_query=mobile+computing+overview+course" // general overview of mobile computing concepts
        ],
  
        websites: [
          "https://developer.android.com/docs",     // Official Android development docs
          "https://developer.apple.com/documentation", // Official Apple iOS development docs
          "https://reactnative.dev/docs/getting-started", // React Native cross-platform resource
          "https://www.coursera.org/learn/introduction-to-mobile-app-development", // Structured mobile app dev course overview :contentReference[oaicite:0]{index=0}
          "https://en.wikipedia.org/wiki/Mobile_app_development" // Overview of mobile app development process :contentReference[oaicite:1]{index=1}
        ],
  
        tools: [
          "Android Studio",  // Official IDE for Android development :contentReference[oaicite:2]{index=2}
          "Xcode",           // Official IDE for iOS Swift development
          "Flutter",         // Cross-platform UI toolkit (Dart) for mobile apps
          "React Native",    // Framework for building mobile apps using JavaScript
          "Firebase"         // Backend services and real-time database for mobile apps
        ]
      }
    }
  },
  {
    id: "cse-177",
    code: "CSE 177 / 177H",
    name: "Database Systems Implementation",
    fullName: "CSE 177 / 177H: Database Systems Implementation",
    description: "Deep backend + systems credibility",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 177 dives into how database management systems actually work under the hood — examining storage, indexing, query execution, transactions, and more. This deep backend and systems experience builds strong credibility for software engineers interested in systems, backend architecture, performance optimization, and database engineering roles. Understanding these internals helps engineers make informed architectural decisions and optimize real production systems.",
  
      realWorldApplications: [
        "Building or customizing high-performance data storage and retrieval components",
        "Optimizing query execution and indexing strategies for large-scale applications",
        "Designing and implementing parts of distributed databases or custom storage systems",
        "Understanding how transaction processing and concurrency control ensure data integrity",
        "Evaluating trade-offs in database architecture for modern cloud systems",
        "Debugging and performance tuning backend systems that rely on heavy data access"
      ],
  
      learningOutcomes: [
        "Understand the internal architecture of database management systems, including storage structures and buffer management", // core internal DBMS topics :contentReference[oaicite:0]{index=0}
        "Explain and implement indexing techniques like B+ trees, hash indexing, and other access structures", // typical syllabus focus :contentReference[oaicite:1]{index=1}
        "Design and build components of a mini-DBMS, such as query engines and storage managers", // common project goal :contentReference[oaicite:2]{index=2}
        "Analyze the performance and complexity of data intensive operations", // performance insight :contentReference[oaicite:3]{index=3}
        "Apply principles of concurrency control and recovery in transactional systems", // advanced DB internals topic :contentReference[oaicite:4]{index=4}
        "Implement parsing and execution strategies for database queries", // query execution focus :contentReference[oaicite:5]{index=5}
        "Leverage systems-level programming skills (e.g., in C++ or Rust) to build low-level backend components" // real course programming practice :contentReference[oaicite:6]{index=6}
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=NdeeSEknp58", // Relational DBMS course overview with structural internals basis :contentReference[oaicite:7]{index=7}
          "https://www.youtube.com/results?search_query=database+system+implementation+tutorial", // Practical implementation video tutorials on internals
          "https://www.youtube.com/results?search_query=b+tree+database+indexing", // B+ tree and index structure explanations
          "https://www.youtube.com/results?search_query=query+execution+internals+database", // Query processing in DBMS
          "https://www.youtube.com/results?search_query=database+transactions+concurrency+control" // ACID and concurrency topics
        ],
  
        websites: [
          "https://en.wikipedia.org/wiki/Database_management_system", // Overview & architecture of DBMS :contentReference[oaicite:8]{index=8}
          "https://15445.courses.cs.cmu.edu/spring2025/syllabus.html", // Example upper-level DB implementation syllabus with internals focus :contentReference[oaicite:9]{index=9}
          "https://buzzdb-docs.readthedocs.io/part2/index.html", // Example DB implementation project doc with labs & topics :contentReference[oaicite:10]{index=10}
          "https://www.geeksforgeeks.org/dbms/storage-structures-in-dbms/", // DB storage & indexing basics
          "https://www.geeksforgeeks.org/dbms/query-processing-optimization/" // Query processing and optimization
        ],
  
        tools: [
          "C++",            // Systems programming language common in DB internals courses :contentReference[oaicite:11]{index=11}
          "Rust",           // Modern system language with strong memory safety for DB development
          "SQLite source code", // Real open-source database to explore internals
          "PostgreSQL",     // Full RDBMS codebase for studying real internals
          "Valgrind"        // Debugging and profiling tool for memory and performance
        ]
      }
    }
  },
  {
    id: "cse-179",
    code: "CSE 179",
    name: "Parallel Computing",
    fullName: "CSE 179: Parallel Computing",
    description: "Performance, concurrency (advanced SWE)",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 179 explores how to design and implement programs that make efficient use of modern multi-core and many-core hardware. Parallel computing skills are valuable for performance-sensitive software engineering (e.g., backend compute services, data pipelines, scientific computing, real-time systems) and for understanding the limitations and opportunities of concurrent execution in high-performance and distributed environments. These skills help engineers build faster solutions and optimize resource usage in real applications.",
  
      realWorldApplications: [
        "Accelerating compute-intensive workloads (e.g., data analytics, simulations, AI preprocessing)",
        "Improving scalability of backend services that handle high traffic by using multi-threading",
        "Optimizing code for multi-core and multi-processor environments",
        "Building concurrent systems that manage shared resources without deadlocks or race conditions",
        "Leveraging GPUs and hardware accelerators for parallel workloads",
        "Designing software that efficiently uses available hardware resources to reduce costs and increase throughput"
      ],
  
      learningOutcomes: [
        "Understand the principles of parallelism and concurrency in modern computing systems", // parallel vs concurrency concepts :contentReference[oaicite:1]{index=1}
        "Analyze performance trade-offs when executing code on multi-core and many-core architectures", // hardware and efficiency focus :contentReference[oaicite:2]{index=2}
        "Use threading and shared-memory abstractions to design concurrent programs",
        "Apply distributed parallel models like MPI or task-based parallelism",
        "Identify and resolve common concurrency issues such as race conditions, deadlocks, and resource contention",
        "Utilize tools and libraries that help build and debug parallel programs",
        "Evaluate scalability and speed-up tradeoffs using theoretical models like Gustafson’s Law and practical benchmarks" // speed-up theory :contentReference[oaicite:3]{index=3}
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=V1tINV2-9p4", // Intro to parallel computing concepts (Stanford CS149 lecture) :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/results?search_query=parallel+computing+tutorial+for+beginners", // Crash courses explaining parallelism basics
          "https://www.youtube.com/results?search_query=multithreading+vs+parallelism", // Videos explaining essential concurrency vs parallelism differences
          "https://www.youtube.com/results?search_query=OpenMP+parallel+programming+tutorial", // Parallel programming framework intro
          "https://www.youtube.com/results?search_query=MPI+parallel+programming+tutorial" // Distributed memory parallel programming videos
        ],
  
        websites: [
          "https://www.geeksforgeeks.org/computer-science-fundamentals/introduction-to-parallel-computing/", // Parallel computing fundamentals overview :contentReference[oaicite:5]{index=5}
          "https://csinparallel.org/csinparallel/parallel-computing/index.html", // Key parallel computing concepts (task & data parallelism) :contentReference[oaicite:6]{index=6}
          "https://en.wikipedia.org/wiki/Concurrency_(computer_science)", // Concurrency definitions & fundamentals
          "https://en.wikipedia.org/wiki/Gustafson%27s_law", // Theoretical performance model for parallel speed-ups :contentReference[oaicite:7]{index=7}
          "https://dask.org/" // A practical Python library for parallel computing (scales from local to cluster) :contentReference[oaicite:8]{index=8}
        ],
  
        tools: [
          "OpenMP",             // Shared-memory parallel programming API
          "MPI",                // Message passing interface for distributed parallel computing
          "CUDA",               // GPU parallel computing platform
          "Dask",               // Python library for parallel computing :contentReference[oaicite:9]{index=9}
          "Intel Advisor"       // Tool for performance profiling and optimization :contentReference[oaicite:10]{index=10}
        ]
      }
    }
  },
  {
    id: "cse-140",
    code: "CSE 140",
    name: "Computer Architecture",
    fullName: "CSE 140: Computer Architecture",
    description: "Low-level understanding (optional depth)",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 140 provides insight into how hardware and software interact at the lowest levels—covering processors, memory hierarchies, instruction sets, and performance trade-offs. While not required for all SWE jobs, this course builds deep systems understanding that helps engineers write more efficient code, debug performance issues, and make informed decisions when designing software that must interact closely with hardware or systems software.",
  
      realWorldApplications: [
        "Understanding how compilers and high-level code translate to underlying machine instructions",
        "Optimizing performance-critical software by knowing how CPU pipelines, caching, and memory hierarchies work",
        "Debugging low-level issues, bottlenecks, and performance regressions in real systems",
        "Making informed architectural decisions in systems software, embedded engineering, or performance-intensive services",
        "Evaluating trade-offs in hardware-accelerated environments and parallel execution contexts",
        "Working with systems programming, virtualization, or performance profiling tools"
      ],
  
      learningOutcomes: [
        "Explain basic processor components, instruction set architectures (ISA), and the role of microarchitecture",
        "Understand how pipelining and caches improve performance and what hazards or bottlenecks may arise",
        "Analyze memory hierarchies, virtual memory, and how data locality affects performance",
        "Describe interactions between hardware and software, including how compilers generate machine-level code",
        "Evaluate performance trade-offs and decisions in hardware design that impact software behavior",
        "Use architecture simulators and profiling tools to measure program execution on virtual hardware",
        "Relate low-level architectural concepts to high-level software performance and optimization"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ziMRjDlLEwo", // Intro to Computer Architecture lecture (ETH Zurich) :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=GRInNLx3Tug", // Basics of Computer Architecture overview (NESO Academy) :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/watch?v=Onf7AKGHBzg", // Intro to architecture class lecture (~second-year level) :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/playlist?list=PL59E5B57A04EAE09C", // Lecture series covering ISA, pipelining, microarchitecture, etc. :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/results?search_query=computer+architecture+instruction+set+architecture+tutorial" // Search for targeted ISA explanations
        ],
  
        websites: [
          "https://www.coursera.org/learn/comparch", // Structured computer architecture course overview and fundamentals :contentReference[oaicite:5]{index=5}
          "https://www.codecademy.com/learn/computer-architecture", // Interactive architecture lessons including ISA and logic -level concepts :contentReference[oaicite:6]{index=6}
          "https://en.wikipedia.org/wiki/Computer_architecture", // Broad overview of architecture concepts, goals, and components
          "https://en.wikipedia.org/wiki/Instruction_set_architecture", // Reference for how ISAs relate to code and hardware
          "https://en.wikipedia.org/wiki/Memory_hierarchy" // Overview of caches, RAM, and storage hierarchy
        ],
  
        tools: [
          "gem5",             // Architecture simulator useful for exploring hardware configurations and performance :contentReference[oaicite:7]{index=7}
          "CPU Sim",          // Educational CPU simulator for instruction execution and micro-architecture :contentReference[oaicite:8]{index=8}
          "WebRISC-V",        // Web-based RISC-V pipeline simulator for visualizing instruction execution
          "Valgrind",         // Profiling and memory analysis useful for correlating software behavior with architecture
          "Perf (Linux)"      // Performance profiling tool to measure CPU cycles, cache misses, and hardware events
        ]
      }
    }
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
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 175 provides foundational understanding of artificial intelligence concepts that are increasingly important in modern software engineering. It introduces core AI techniques such as search, knowledge representation, probabilistic reasoning, and machine learning — all relevant for building intelligent systems, data-driven features, automation tools, and incorporating AI capabilities into software products.",
  
      realWorldApplications: [
        "Implementing search and optimization algorithms used in route planning, games, and automated decision-making systems",
        "Using machine learning models to power recommendation systems, personalization, and predictive features",
        "Applying probabilistic reasoning to uncertainty-aware systems (e.g., diagnostics, anomaly detection)",
        "Designing intelligent agents for automation, robotics, or interactive software",
        "Incorporating computer vision and language technologies in applications like document parsing or media understanding",
        "Evaluating ethical and societal implications of AI systems in real-world contexts"
      ],
  
      learningOutcomes: [
        "Understand fundamental AI techniques including search algorithms (e.g., BFS, A*, minimax) and their trade-offs",
        "Explain how knowledge can be represented and reasoned with in symbolic and probabilistic systems",
        "Describe basics of machine learning including supervised and unsupervised learning methods",
        "Model and reason under uncertainty using probabilistic approaches",
        "Explore basic elements of robotics and perception as applications of AI",
        "Recognize how AI techniques are used in real systems such as NLP, vision, and recommendation pipelines",
        "Discuss ethical, societal, and safety considerations in AI design and deployment"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=NckTNpnZW_0", // Intro to AI course video covering fundamentals of AI topics like search & reasoning (AI intro) :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/results?search_query=artificial+intelligence+for+beginners", // General AI beginner overviews (intro to concepts like ML, search, planning) :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/watch?v=VGFpV3Qj4as", // AI basics for beginners — machine learning overview :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/results?search_query=introduction+to+machine+learning+tutorial", // ML fundamentals including regression & classification :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/results?search_query=search+algorithms+ai+tutorial" // Search & game tree fundamentals in AI :contentReference[oaicite:5]{index=5}
        ],
  
        websites: [
          "https://www.elementsofai.com/", // Beginner-friendly foundational AI online course covering core ideas & concepts (Elements of AI) :contentReference[oaicite:6]{index=6}
          "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/", // Microsoft AI fundamentals — intro to how AI works :contentReference[oaicite:7]{index=7}
          "https://www.coursera.org/learn/introduction-to-ai", // Structured AI course covering core concepts (machine learning, neural nets, etc.) :contentReference[oaicite:8]{index=8}
          "https://ai.google/learn-ai-skills/", // Google’s AI basics including generative AI and essentials :contentReference[oaicite:9]{index=9}
          "https://microsoft.github.io/AI-For-Beginners/" // 12-week AI beginner curriculum with hands-on lessons :contentReference[oaicite:10]{index=10}
        ],
  
        tools: [
          "Python",          // Core language in AI and ML (many educational & industrial use cases)
          "TensorFlow",      // Library for building and training ML models
          "PyTorch",         // Alternative popular ML framework
          "scikit-learn",    // Python library for basic ML algorithms
          "Jupyter Notebooks"// Interactive environment for prototyping AI models
        ]
      }
    }
  },
  {
    id: "cse-176",
    code: "CSE 176",
    name: "Machine Learning",
    fullName: "CSE 176: Machine Learning",
    description: "For SWE aiming at ML-adjacent or data-heavy roles",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 176 introduces foundational machine learning concepts and techniques that bridge software engineering and data-driven systems. It teaches how to program computers using data to make predictions, optimize performance criteria, and build models that inform intelligent features. These skills are valuable for SWE roles in data-intensive domains, ML-adjacent engineering, and modern applications that integrate learning into software products.",
  
      realWorldApplications: [
        "Building models that predict outcomes from real business data (e.g., customer behavior, demand forecasting)",
        "Applying supervised learning for classification and regression tasks in production applications",
        "Designing data pipelines and preprocessing workflows to prepare data for training and evaluation",
        "Automating feature extraction and selection for scalable ML systems",
        "Integrating ML models into web services and backend applications",
        "Evaluating model performance and tuning hyperparameters to improve accuracy and generalization"
      ],
  
      learningOutcomes: [
        "Understand the core principles of machine learning including how computers learn from data and optimize performance criteria", // ML definition :contentReference[oaicite:1]{index=1}
        "Explain supervised learning and common algorithms such as linear regression, classification, and decision trees", // common ML topics in intro courses :contentReference[oaicite:2]{index=2}
        "Preprocess and clean real datasets for use in ML models",
        "Train, validate, and evaluate machine learning models using standard performance metrics",
        "Understand the trade-offs between models (bias vs variance) and techniques to improve generalization",
        "Gain familiarity with tools and libraries for implementing ML workflows",
        "Integrate basic ML models into software applications or services"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=i_LwzRVP7bg", // Full machine learning basics + TensorFlow code walkthrough (ML for everybody) :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/results?search_query=introduction+to+machine+learning+tutorial", // General ML concept tutorials (regression, classification)
          "https://www.youtube.com/results?search_query=supervised+learning+vs+unsupervised+learning", // Core ML paradigm comparison
          "https://www.youtube.com/results?search_query=scikit+learn+tutorial+for+beginners", // Hands-on Python machine learning with scikit-learn
          "https://www.youtube.com/results?search_query=neural+networks+for+beginners" // Intro videos on neural networks basics
        ],
  
        websites: [
          "https://scikit-learn.org/", // Core Python ML library with algorithms & examples :contentReference[oaicite:4]{index=4}
          "https://www.tensorflow.org/learn", // TensorFlow beginner ML tutorials & guides :contentReference[oaicite:5]{index=5}
          "https://www.coursera.org/learn/machine-learning-fundamentals-dartmouth", // Structured ML fundamentals course overview :contentReference[oaicite:6]{index=6}
          "https://www.codecademy.com/article/scikit-learn-tutorial", // Beginner tutorial for ML modeling with scikit-learn :contentReference[oaicite:7]{index=7}
          "https://ucmercedcse176.github.io/" // Example course site with ML introduction and topics :contentReference[oaicite:8]{index=8}
        ],
  
        tools: [
          "Python",           // Primary language used for ML development and prototyping
          "scikit-learn",     // Popular ML library for classical algorithms :contentReference[oaicite:9]{index=9}
          "TensorFlow",       // ML & deep learning framework :contentReference[oaicite:10]{index=10}
          "PyTorch",          // Alternative popular ML/deep learning library :contentReference[oaicite:11]{index=11}
          "Jupyter Notebooks" // Interactive environment ideal for data exploration and model training
        ]
      }
    }
  },
  {
    id: "cse-130",
    code: "CSE 130",
    name: "Cryptography",
    fullName: "CSE 130: Cryptography",
    description: "Security-minded SWE; encryption, hashing, protocols",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 130 introduces foundational cryptographic concepts — including encryption, hashing, and security protocols — that are essential for software engineers building secure systems. Modern applications rely on cryptography for authentication, data integrity, confidentiality, and secure communication. Understanding how these primitives work and how to use them correctly helps engineers avoid common security pitfalls and build systems that protect users and data.",
  
      realWorldApplications: [
        "Encrypting sensitive data in transit and at rest to protect user privacy and business assets",
        "Securing authentication systems including password storage and multi-factor authentication",
        "Implementing secure communication protocols like TLS/HTTPS in web and mobile applications",
        "Using hash functions to maintain data integrity and detect tampering",
        "Designing secure key exchange mechanisms such as Diffie–Hellman for distributed systems",
        "Integrating cryptographic primitives into APIs, databases, and distributed services"
      ],
  
      learningOutcomes: [
        "Understand basic cryptographic primitives such as symmetric and asymmetric encryption, hash functions, and digital signatures", // syllabus topics include one-way functions, pseudorandom functions, encryption, and protocols :contentReference[oaicite:0]{index=0}
        "Explain how encryption ensures confidentiality and how hashing ensures data integrity and authenticity", // core distinction between encryption vs hashing :contentReference[oaicite:1]{index=1}
        "Apply cryptography correctly within software systems while avoiding common implementation mistakes", // best practice emphasis (e.g., secure storage) :contentReference[oaicite:2]{index=2}
        "Describe key exchange protocols such as Diffie–Hellman and their role in establishing secure channels", // DH key exchange basics :contentReference[oaicite:3]{index=3}
        "Implement secure password hashing with modern algorithms and techniques (e.g., salting, stretching)", // salting and hashing importance :contentReference[oaicite:4]{index=4}
        "Recognize common cryptographic attacks and how to mitigate them in real software",
        "Discuss trade-offs and performance considerations when integrating cryptography into applications"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=j_8PLI_wCVU", // Cryptography Full Course Part 1 — cryptographic primitives & security principles :contentReference[oaicite:5]{index=5}
          "https://www.youtube.com/watch?v=2P2KdkLK1g", // Cryptography Explained: Encryption, Hashing, and more :contentReference[oaicite:6]{index=6}
          "https://www.youtube.com/watch?v=bTkJr9eq0G4", // CompTIA Security+: Cryptography concepts & hashing overview :contentReference[oaicite:7]{index=7}
          "https://www.youtube.com/results?search_query=diffie+hellman+key+exchange+tutorial", // Practical explanation of key exchange protocols
          "https://www.youtube.com/results?search_query=introduction+to+digital+signatures+cryptography" // Exploring digital signatures & authentication
        ],
  
        websites: [
          "https://en.wikipedia.org/wiki/Cryptography",            // High-level overview of cryptography and its role in modern computing
          "https://www.geeksforgeeks.org/cryptographic-hash-functions/", // Deep dive on hash functions and their security properties :contentReference[oaicite:8]{index=8}
          "https://loginradius.com/blog/engineering/encryption-and-hashing/", // Practical guide to encryption & hashing best practices :contentReference[oaicite:9]{index=9}
          "https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange", // Key exchange protocol basics :contentReference[oaicite:10]{index=10}
          "https://owasp.org/www-project-top-ten/"                // OWASP Top 10 — common web security risks including cryptographic failures
        ],
  
        tools: [
          "OpenSSL",          // Industry-standard crypto library for implementing encryption, certificates, and protocols
          "bcrypt",           // Secure password hashing library with salting and configurable cost factor
          "libsodium",        // Easy-to-use cryptographic library promoting safe, high-level cryptography
          "Hashcat",          // Password recovery tool useful for understanding hash strength and security testing
          "Wireshark"         // Network protocol analyzer for inspecting TLS/SSL & cryptographic handshake packets
        ]
      }
    }
  },
  {
    id: "cse-178",
    code: "CSE 178",
    name: "Computers & Network Security",
    fullName: "CSE 178: Computers & Network Security",
    description: "SWE + cybersecurity interest; systems and network defense",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 178 teaches foundational cybersecurity concepts that are increasingly important for software engineers working on secure systems. It blends secure design principles with defensive and offensive techniques to help engineers understand threats against networks, systems, and applications, and how to mitigate them. This knowledge is essential for building resilient software, hardening infrastructure, and collaborating with security teams to protect users and data.",
  
      realWorldApplications: [
        "Identifying and mitigating common network threats and vulnerabilities that affect modern applications",
        "Implementing and configuring secure communication protocols (e.g., TLS/HTTPS) in software systems",
        "Understanding how firewalls, intrusion detection systems, and secure network architectures defend against attacks",
        "Using security tools to scan and harden systems before deployment",
        "Recognizing social engineering threats and incorporating human-centric defenses",
        "Defending backend services and APIs against unauthorized access and exploitation"
      ],
  
      learningOutcomes: [
        "Understand core security concepts including confidentiality, integrity, and availability (CIA triad)",  
        "Explain major categories of attacks and network threats, and methods for prevention and mitigation",  
        "Demonstrate secure system design principles and how to harden systems against common threats",  
        "Use tools for network scanning, penetration testing, and traffic analysis to assess security",  
        "Configure and evaluate defensive mechanisms such as firewalls, VPNs, IDS/IPS, and secure protocols",  
        "Distinguish between secure and insecure implementations of software and services",  
        "Understand ethical, legal, and professional considerations in cybersecurity"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=FXj7VdQiils", // Security fundamentals + network security concepts overview (importance and basics) :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/watch?v=o99nZlTNGqQ", // Networking & cybersecurity fundamentals mini-course (network security basics) :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/results?search_query=network+security+tutorial", // Packet filtering, firewalls, secure network design tutorials
          "https://www.youtube.com/results?search_query=ethical+hacking+for+beginners", // Intro to ethical hacking & penetration testing
          "https://www.youtube.com/results?search_query=wireshark+network+security+tutorial" // Network packet analysis with Wireshark
        ],
  
        websites: [
          "https://www.geeksforgeeks.org/ethical-hacking/cyber-security-tutorial/", // Cybersecurity fundamentals including threats, defenses, OSI, security mechanisms :contentReference[oaicite:2]{index=2}
          "https://www.coursera.org/learn/networks-and-network-security", // Structured course on network security including protocols, firewalls, VPNs :contentReference[oaicite:3]{index=3}
          "https://en.wikipedia.org/wiki/Capture_the_flag_(cybersecurity)", // Intro to cybersecurity CTF challenges used for real-world practice :contentReference[oaicite:4]{index=4}
          "https://en.wikipedia.org/wiki/Network_Security_Toolkit", // Security tools platform for packet capture, analysis, and defense :contentReference[oaicite:5]{index=5}
          "https://www.codecademy.com/catalog/subject/cybersecurity" // Codecademy cybersecurity tutorials & tools overview :contentReference[oaicite:6]{index=6}
        ],
  
        tools: [
          "Wireshark",       // Packet capture and analysis tool for inspecting traffic and detecting anomalies
          "Nmap",            // Network scanner for discovery and security auditing
          "Metasploit",      // Penetration testing framework used to evaluate vulnerabilities
          "Snort",           // Open-source intrusion detection/prevention system
          "Burp Suite"       // Web application security testing platform
        ]
      }
    }
  },
  {
    id: "cse-165",
    code: "CSE 165",
    name: "Introduction to Object-Oriented Programming",
    fullName: "CSE 165: Introduction to Object-Oriented Programming",
    description: "Only recommended if core OOP fundamentals are weak",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 165 teaches core object-oriented programming (OOP) principles — a paradigm used widely in modern software engineering. OOP helps engineers organize code around real-world concepts like objects and classes, improving modularity, reusability, and maintainability. These skills are foundational for many SWE roles and are directly applicable in backend, frontend, game development, and large-scale application design.",
  
      realWorldApplications: [
        "Designing modular and scalable software using encapsulation and abstraction",
        "Building real systems using classes and objects to model domain logic",
        "Applying inheritance and polymorphism to reduce boilerplate and extend codebases",
        "Working with popular OOP languages like Java, Python, and C++ in production code",
        "Using object-oriented thinking to interpret and implement design patterns",
        "Improving codebase maintainability through clear data and behavior separation"
      ],
  
      learningOutcomes: [
        "Understand what object-oriented programming is and why it is useful in software development", // general OOP definition and benefits :contentReference[oaicite:0]{index=0}
        "Explain and apply the four core OOP principles: encapsulation, inheritance, polymorphism, and abstraction", // fundamental principles :contentReference[oaicite:1]{index=1}
        "Define and use classes and objects to represent software entities and their behaviors", // basic structures :contentReference[oaicite:2]{index=2}
        "Organize code into modular, reusable components using OOP concepts", // reusability and maintainability benefits :contentReference[oaicite:3]{index=3}
        "Work with interfaces and class hierarchies to structure complex systems", // typical course topics :contentReference[oaicite:4]{index=4}
        "Write basic object-oriented programs in a modern language (e.g., Java, C++, Python)",
        "Apply OOP thinking to simplify real-world software problems and design cleaner APIs"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=SiBw7os-_zI", // Crash course on OOP basics :contentReference[oaicite:5]{index=5}
          "https://www.youtube.com/watch?v=pTB0EiLXUC8", // Explanation of core OOP principles :contentReference[oaicite:6]{index=6}
          "https://www.youtube.com/results?search_query=object+oriented+programming+tutorial+for+beginners", // General beginner tutorials
          "https://www.youtube.com/results?search_query=encapsulation+inheritance+polymorphism+abstraction", // Focused concept videos
          "https://www.youtube.com/results?search_query=oop+in+java+for+beginners" // Language-specific OOP example content
        ],
  
        websites: [
          "https://en.wikipedia.org/wiki/Object-oriented_programming", // High-level OOP overview :contentReference[oaicite:7]{index=7}
          "https://www.geeksforgeeks.org/dsa/introduction-of-object-oriented-programming/", // Intro & concepts :contentReference[oaicite:8]{index=8}
          "https://www.coursera.org/courses?query=object+oriented+programming", // Structured online OOP course options :contentReference[oaicite:9]{index=9}
          "https://www.interaction-design.org/literature/topics/object-oriented-programming", // Theory + OOP principles
          "https://docs.oracle.com/javase/tutorial/java/concepts/" // Java OOP tutorial (Oracle docs)
        ],
  
        tools: [
          "Visual Studio Code", // IDE with excellent OOP language support
          "Java JDK",           // Common language and environment for OOP
          "Python",             // Popular multi-paradigm language with OOP support
          "C++",                // Classic OOP systems language
          "Replit"              // Browser dev environment basic for practicing OOP
        ]
      }
    }
  },
  {
    id: "cse-107",
    code: "CSE 107",
    name: "Image Processing",
    fullName: "CSE 107: Image Processing",
    description: "Specialized SWE applications; graphics and vision basics",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CSE 107 introduces key techniques for manipulating and analyzing digital images — foundational for software roles intersecting with computer vision, graphics, augmented reality, robotics, and media applications. Understanding image processing equips engineers to handle real-world visual data, optimize visual pipelines, and build systems that interpret, enhance, and transform visual content reliably.",
  
      realWorldApplications: [
        "Preprocessing images for computer vision tasks like recognition, detection, and tracking",                // preprocessing as a foundation for vision systems
        "Enhancing image quality for consumer apps, medical imaging, and photography systems",                   // enhancement applications
        "Implementing image compression techniques used in storage and transmission (e.g., JPEG, video)",        // compression relevance
        "Applying edge detection and segmentation for object identification and ROI extraction",                // segmentation and boundaries
        "Processing satellite, drone, or sensor images for mapping, agriculture, and environmental monitoring",  // large-scale processing
        "Integrating image manipulation features into products like AR/VR, driver assistance, and mobile apps"  // interactive application relevance
      ],
  
      learningOutcomes: [
        "Understand how digital images are represented in software and how pixel data is structured",            // basic image representation
        "Apply core image enhancement techniques including spatial and histogram processing",                   // enhancement fundamentals
        "Use transforms (e.g., Fourier, frequency domain) to analyze and modify images",                        // transform understanding
        "Implement basic segmentation and feature extraction methods to identify regions and objects",         // segmentation learning
        "Describe image compression approaches and how they impact storage and transmission",                   // compression fundamentals
        "Develop simple programs that manipulate and filter images using common libraries like OpenCV",         // practical programming integration
        "Evaluate how image processing relates to higher-level computer vision tasks and system pipelines"     // bridging to vision systems
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=uJvqbZtGIh4",                                                  // Intro lecture on digital image processing fundamentals (image basics & analytic methods) :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/results?search_query=image+processing+tutorial+opencv",                 // Tutorials on image manipulation using OpenCV (practical SWE focus) :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/results?search_query=histogram+equalization+image+processing",          // Enhancement example: histogram processing :contentReference[oaicite:3]{index=3}
          "https://www.youtube.com/results?search_query=edge+detection+image+processing",                  // Edge detection & segmentation fundamentals :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/results?search_query=image+compression+basics"                          // Intro to compression and transforms :contentReference[oaicite:5]{index=5}
        ],
  
        websites: [
          "https://www.geeksforgeeks.org/computer-graphics/digital-image-processing-basics/",              // Digital image processing basics and pipelines :contentReference[oaicite:6]{index=6}
          "https://en.wikipedia.org/wiki/Image_segmentation",                                              // Segmentation basics in both vision and processing :contentReference[oaicite:7]{index=7}
          "https://www.coursera.org/learn/digital-image-processing",                                       // Introductory image processing course (structured learning) :contentReference[oaicite:8]{index=8}
          "https://docs.opencv.org/",                                                                       // Official OpenCV docs for practical implementation
          "https://en.wikipedia.org/wiki/Raster_graphics"                                                  // How image data is stored and manipulated :contentReference[oaicite:9]{index=9}
        ],
  
        tools: [
          "Python + OpenCV",     // Widely-used tools for practical projects and prototypes
          "MATLAB Image Processing Toolbox",  // Industry academic tool for experimenting with algorithms
          "GIMP",                // General image manipulation for prototyping and understanding concepts
          "ImageJ",              // Scientific image analysis and measurement tool
          "TensorFlow / PyTorch" // Libraries to bridge from image processing to vision/deep learning
        ]
      }
    }
  },
];

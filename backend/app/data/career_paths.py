"""
Career Path Data
Static data for career path configurations
TODO: Move to database once Supabase is configured
"""

from app.models.career import CareerPathConfig, CareerPathCategory, TierCourse, ExpandedInfo

# ====================
# CYBERSECURITY
# ====================

CYBERSECURITY_CONFIG = CareerPathConfig(
    root_label="Cybersecurity",
    categories=[
        CareerPathCategory(id="tier-1", label="TIER 1: ESSENTIAL SECURITY FOUNDATIONS", emoji="🟢"),
        CareerPathCategory(id="tier-2", label="TIER 2: ADVANCED SECURITY TOPICS", emoji="🟡"),
        CareerPathCategory(id="tier-3", label="TIER 3: SECURITY-ADJACENT (Optional)", emoji="🟠"),
    ],
    courses=[
        # TIER 1: MUST-TAKE for Cybersecurity
        TierCourse(
            id="cybersec-cse-178",
            code="CSE 178",
            name="Computers and Networks Security",
            full_name="CSE 178: Computers and Networks Security",
            description="The \"Hacker Mindset\": Hands-on practice with threat modeling, buffer overflows, and defensive hardening",
            tier=1,
            expanded_info=ExpandedInfo(
                credits=4,
                prerequisites="CSE 160 (Computer Networks) recommended",
                learning_outcomes=[
                    "Identify common security threats and attack vectors",
                    "Implement security defenses and countermeasures",
                    "Understand network security protocols and practices",
                    "Analyze security vulnerabilities in systems",
                    "Apply security best practices to protect systems"
                ],
                topics=[
                    "Security threats and attack models",
                    "Cryptography and authentication",
                    "Network security protocols",
                    "Firewalls and intrusion detection",
                    "Security policies and access control",
                    "Incident response and security management"
                ],
                career_relevance="This is the core security course for cybersecurity careers. Essential for SOC analysts, security engineers, and anyone working in defensive or offensive security roles.",
                additional_notes="Considered the foundational course for all cybersecurity career paths. Strongly recommended to take early in your cybersecurity journey."
            ),
        ),
        TierCourse(
            id="cybersec-cse-160",
            code="CSE 160",
            name="Computer Networks",
            full_name="CSE 160: Computer Networks",
            description="Network Defense foundation: Packet analysis (Wireshark), TCP/IP protocols, and routing security",
            tier=1,
        ),
        TierCourse(
            id="cybersec-cse-150",
            code="CSE 150",
            name="Operating Systems",
            full_name="CSE 150: Operating Systems",
            description="Kernel-level security: Understanding privilege escalation, process isolation, and memory management exploits",
            tier=1,
        ),
        TierCourse(
            id="cybersec-cse-031",
            code="CSE 031",
            name="Computer Organization & Assembly",
            full_name="CSE 031: Computer Organization & Assembly",
            description="The key to Reverse Engineering: Reading binary, understanding stack frames, and analyzing malware at the CPU level",
            tier=1,
        ),
        TierCourse(
            id="cybersec-cse-130",
            code="CSE 130",
            name="Introduction to Cryptography",
            full_name="CSE 130: Introduction to Cryptography",
            description="Applied Cryptography: Correctly implementing (and breaking) encryption standards (PKI, AES, RSA)",
            tier=1,
        ),
        TierCourse(
            id="cybersec-cse-120",
            code="CSE 120",
            name="Software Engineering",
            full_name="CSE 120: Software Engineering",
            description="Secure SDLC: Writing code that withstands audits and integrating security into CI/CD pipelines",
            tier=1,
        ),
        # TIER 2: STRONG CYBERSECURITY BOOSTERS
        TierCourse(
            id="cybersec-cse-168",
            code="CSE 168",
            name="Distributed Software Systems",
            full_name="CSE 168: Distributed Software Systems",
            description="Cloud Security fundamentals: Securing microservices, API endpoints, and distributed attack surfaces",
            tier=2,
        ),
        TierCourse(
            id="cybersec-cse-179",
            code="CSE 179",
            name="Parallel Computing",
            full_name="CSE 179: Parallel Computing",
            description="Concurrency exploits: Identifying and preventing Race Conditions and Deadlocks",
            tier=2,
        ),
        TierCourse(
            id="cybersec-cse-111",
            code="CSE 111",
            name="Database Systems",
            full_name="CSE 111: Database Systems",
            description="Defense against the #1 web threat: Mastering SQL Injection prevention and Role-Based Access Control (RBAC)",
            tier=2,
            expanded_info=ExpandedInfo(
                credits=4,
                prerequisites="CSE 30 or equivalent programming experience",
                learning_outcomes=[
                    "Understand relational database design and normalization",
                    "Write complex SQL queries and understand query optimization",
                    "Implement database security measures and access controls",
                    "Identify and prevent SQL injection vulnerabilities",
                    "Design secure database schemas for applications"
                ],
                topics=[
                    "Relational database design",
                    "SQL and query optimization",
                    "Database security and access control",
                    "Transaction management",
                    "Database indexing and performance",
                    "SQL injection prevention"
                ],
                career_relevance="Critical for understanding how to secure data storage and prevent common web application vulnerabilities like SQL injection. Essential for security engineers working with application security.",
                additional_notes="This course provides foundational knowledge for securing database-driven applications. Understanding database security is crucial for both offensive and defensive security roles."
            ),
        ),
        TierCourse(
            id="cybersec-cse-177",
            code="CSE 177",
            name="Database Systems Implementation",
            full_name="CSE 177: Database Systems Implementation",
            description="Data Internals & Forensics: Understanding how data is physically stored, recovered, and logged",
            tier=2,
        ),
        TierCourse(
            id="cybersec-cse-140",
            code="CSE 140",
            name="Computer Architecture",
            full_name="CSE 140: Computer Architecture",
            description="Hardware Security: Understanding Side-Channel attacks (like Spectre/Meltdown) and physical memory addressing",
            tier=2,
        ),
        TierCourse(
            id="cybersec-cse-108",
            code="CSE 108",
            name="Full Stack Web Development",
            full_name="CSE 108: Full Stack Web Development",
            description="Web App Pentesting: Hands-on experience securing against the OWASP Top 10 (XSS, CSRF)",
            tier=2,
        ),
        # TIER 3: SECURITY-ADJACENT (OPTIONAL)
        TierCourse(
            id="cybersec-cse-175",
            code="CSE 175",
            name="Intro to AI",
            full_name="CSE 175: Intro to AI",
            description="Adversarial AI: Understanding how attackers manipulate automated decision systems",
            tier=3,
        ),
        TierCourse(
            id="cybersec-cse-176",
            code="CSE 176",
            name="Machine Learning",
            full_name="CSE 176: Machine Learning",
            description="Automated Threat Intelligence: Building models to detect anomalies and zero-day malware",
            tier=3,
        ),
        TierCourse(
            id="cybersec-cse-162",
            code="CSE 162",
            name="Mobile Computing",
            full_name="CSE 162: Mobile Computing",
            description="Mobile Pentesting: Android/iOS sandboxing, permission models, and app-layer vulnerabilities",
            tier=3,
        ),
        TierCourse(
            id="cybersec-cse-185",
            code="CSE 185",
            name="Computer Vision",
            full_name="CSE 185: Computer Vision",
            description="Biometric Security: Vulnerabilities in facial recognition systems and deepfake detection",
            tier=3,
        ),
        TierCourse(
            id="cybersec-cse-107",
            code="CSE 107",
            name="Digital Image Processing",
            full_name="CSE 107: Digital Image Processing",
            description="Digital Forensics: Steganography detection and analyzing manipulated image artifacts",
            tier=3,
        ),
    ],
    category_intros={
        "tier-1": "These are the **highest priority courses** for cybersecurity careers. Core security knowledge that employers expect.",
        "tier-2": "These courses deepen security expertise and make you stand out in specialized security roles.",
        "tier-3": "Good if aligned with interests, not required for cybersecurity but helpful for well-rounded security engineers.",
    },
)

# ====================
# SOFTWARE ENGINEERING (SWE)
# ====================

SWE_CONFIG = CareerPathConfig(
    root_label="SWE",
    categories=[
        CareerPathCategory(id="tier-1", label="TIER 1: MUST-TAKE for SWE", emoji="🟢"),
        CareerPathCategory(id="tier-2", label="TIER 2: STRONG SWE BOOSTERS", emoji="🟡"),
        CareerPathCategory(id="tier-3", label="TIER 3: SWE-ADJACENT ", emoji="🟠"),
    ],
    courses=[
        # TIER 1: CORE SWE (Non-Negotiable)
        TierCourse(
            id="cse-120",
            code="CSE 120",
            name="Software Engineering",
            full_name="CSE 120: Software Engineering",
            description="Team-based dev, SDLC, Git, real projects — non-negotiable",
            tier=1,
        ),
        TierCourse(
            id="cse-111",
            code="CSE 111",
            name="Database Systems",
            full_name="CSE 111: Database Systems",
            description="Backend dev, SQL, schemas, real-world apps",
            tier=1,
        ),
        TierCourse(
            id="cse-150",
            code="CSE 150",
            name="Operating Systems",
            full_name="CSE 150: Operating Systems",
            description="Threads, memory, concurrency → system design signal",
            tier=1,
        ),
        TierCourse(
            id="cse-160",
            code="CSE 160",
            name="Computer Networks",
            full_name="CSE 160: Computer Networks",
            description="How the internet actually works (HTTP, TCP, APIs)",
            tier=1,
        ),
        TierCourse(
            id="cse-168",
            code="CSE 168",
            name="Distributed Software Systems",
            full_name="CSE 168: Distributed Software Systems",
            description="Microservices, scalability, cloud fundamentals",
            tier=1,
        ),
        TierCourse(
            id="cse-108",
            code="CSE 108",
            name="Full Stack Web Development",
            full_name="CSE 108: Full Stack Web Development",
            description="Practical SWE skills: frontend + backend",
            tier=1,
        ),
        # TIER 2: SWE ENHANCERS
        TierCourse(
            id="cse-126",
            code="CSE 126",
            name="Information Systems & Service Design",
            full_name="CSE 126: Information Systems & Service Design",
            description="Product thinking, backend services",
            tier=2,
        ),
        TierCourse(
            id="cse-155",
            code="CSE 155",
            name="Human-Computer Interaction",
            full_name="CSE 155: Human-Computer Interaction",
            description="UX-aware engineers = huge hiring bonus",
            tier=2,
        ),
        TierCourse(
            id="cse-162",
            code="CSE 162",
            name="Mobile Computing",
            full_name="CSE 162: Mobile Computing",
            description="Android/iOS dev, real apps",
            tier=2,
        ),
        TierCourse(
            id="cse-177",
            code="CSE 177 / 177H",
            name="Database Systems Implementation",
            full_name="CSE 177 / 177H: Database Systems Implementation",
            description="Deep backend + systems credibility",
            tier=2,
        ),
        TierCourse(
            id="cse-179",
            code="CSE 179",
            name="Parallel Computing",
            full_name="CSE 179: Parallel Computing",
            description="Performance, concurrency (advanced SWE)",
            tier=2,
        ),
        TierCourse(
            id="cse-140",
            code="CSE 140",
            name="Computer Architecture",
            full_name="CSE 140: Computer Architecture",
            description="Low-level understanding (optional depth)",
            tier=2,
        ),
        # TIER 3: SWE-ADJACENT (Optional / Interest-Based)
        TierCourse(
            id="cse-175",
            code="CSE 175",
            name="Introduction to Artificial Intelligence",
            full_name="CSE 175: Introduction to Artificial Intelligence",
            description="SWE + AI curiosity; broad exposure to AI concepts",
            tier=3,
        ),
        TierCourse(
            id="cse-176",
            code="CSE 176",
            name="Machine Learning",
            full_name="CSE 176: Machine Learning",
            description="For SWE aiming at ML-adjacent or data-heavy roles",
            tier=3,
        ),
        TierCourse(
            id="cse-130",
            code="CSE 130",
            name="Cryptography",
            full_name="CSE 130: Cryptography",
            description="Security-minded SWE; encryption, hashing, protocols",
            tier=3,
        ),
        TierCourse(
            id="cse-178",
            code="CSE 178",
            name="Computers & Network Security",
            full_name="CSE 178: Computers & Network Security",
            description="SWE + cybersecurity interest; systems and network defense",
            tier=3,
        ),
        TierCourse(
            id="cse-165",
            code="CSE 165",
            name="Introduction to Object-Oriented Programming",
            full_name="CSE 165: Introduction to Object-Oriented Programming",
            description="Only recommended if core OOP fundamentals are weak",
            tier=3,
        ),
        TierCourse(
            id="cse-107",
            code="CSE 107",
            name="Image Processing",
            full_name="CSE 107: Image Processing",
            description="Specialized SWE applications; graphics and vision basics",
            tier=3,
        ),
    ],
    category_intros={
        "tier-1": "These are the **highest ROI courses** for SWE jobs and internships. If a student can only take **4-6 electives**, these should dominate.",
        "tier-2": "These make students stand out, but aren't mandatory.",
        "tier-3": "Good if aligned with interests, not required for SWE.",
    },
)

# ====================
# ML/AI
# ====================

ML_AI_CONFIG = CareerPathConfig(
    root_label="ML-AI",
    categories=[
        CareerPathCategory(id="tier-1", label="TIER 1: NON-NEGOTIABLE CORE (ML / AI)", emoji="🟢"),
        CareerPathCategory(id="tier-2", label="TIER 2: HIGH-VALUE ML BOOSTERS", emoji="🟡"),
        CareerPathCategory(id="tier-3", label="TIER 3: RESEARCH / GRAD-LEVEL DEPTH", emoji="🟠"),
    ],
    courses=[
        # TIER 1: NON-NEGOTIABLE CORE
        TierCourse(id="cse-176", code="CSE 176", name="Introduction to Machine Learning", full_name="CSE 176: Introduction to Machine Learning", description="Central ML algorithms, model training", tier=1),
        TierCourse(id="cse-175", code="CSE 175", name="Introduction to Artificial Intelligence", full_name="CSE 175: Introduction to Artificial Intelligence", description="Search, reasoning, AI foundations", tier=1),
        TierCourse(id="cse-030", code="CSE 030", name="Data Structures", full_name="CSE 030: Data Structures", description="Efficient ML pipelines", tier=1),
        TierCourse(id="cse-100", code="CSE 100", name="Algorithm Design & Analysis", full_name="CSE 100: Algorithm Design & Analysis", description="Complexity, optimization thinking", tier=1),
        TierCourse(id="cse-111", code="CSE 111", name="Database Systems", full_name="CSE 111: Database Systems", description="Data handling, preprocessing", tier=1),
        TierCourse(id="cse-120", code="CSE 120", name="Software Engineering", full_name="CSE 120: Software Engineering", description="Turning models into real systems", tier=1),
        TierCourse(id="math-024", code="MATH 024", name="Linear Algebra & Differential Equations", full_name="MATH 024: Linear Algebra & Differential Equations", description="ML models = linear algebra", tier=1),
        TierCourse(id="math-032", code="MATH 032", name="Probability & Statistics", full_name="MATH 032: Probability & Statistics", description="Uncertainty, inference, evaluation", tier=1),
        TierCourse(id="math-023", code="MATH 023", name="Vector Calculus", full_name="MATH 023: Vector Calculus", description="Gradients, optimization", tier=1),
        TierCourse(id="math-021-022", code="MATH 021 / 022", name="Calculus I & II (Engineering)", full_name="MATH 021 / 022: Calculus I & II (Engineering)", description="Required foundation", tier=1),
        # TIER 2: HIGH-VALUE ML BOOSTERS
        TierCourse(id="cse-185", code="CSE 185", name="Computer Vision", full_name="CSE 185: Computer Vision", description="Visual ML systems", tier=2),
        TierCourse(id="cse-188", code="CSE 188", name="Natural Language Processing", full_name="CSE 188: Natural Language Processing", description="Text & LLM foundations", tier=2),
        TierCourse(id="cse-179", code="CSE 179", name="Parallel Computing", full_name="CSE 179: Parallel Computing", description="Performance & training speed", tier=2),
        TierCourse(id="cse-168", code="CSE 168", name="Distributed Software Systems", full_name="CSE 168: Distributed Software Systems", description="ML at scale", tier=2),
        TierCourse(id="cse-107", code="CSE 107", name="Digital Image Processing", full_name="CSE 107: Digital Image Processing", description="Signal → ML pipeline", tier=2),
        TierCourse(id="math-041", code="MATH 041", name="Matrix Analysis for Data Science", full_name="MATH 041: Matrix Analysis for Data Science", description="ML-focused linear algebra", tier=2),
        TierCourse(id="math-130-131", code="MATH 130 / 131", name="Numerical Analysis / Methods", full_name="MATH 130 / 131: Numerical Analysis / Methods", description="Stability & optimization", tier=2),
        TierCourse(id="math-140", code="MATH 140", name="Optimization Methods", full_name="MATH 140: Optimization Methods", description="Core of model training", tier=2),
        TierCourse(id="math-146", code="MATH 146", name="Numerical Linear Algebra", full_name="MATH 146: Numerical Linear Algebra", description="Large-scale ML", tier=2),
        TierCourse(id="math-180", code="MATH 180", name="Applied Statistics & ML", full_name="MATH 180: Applied Statistics & ML", description="Industry-aligned", tier=2),
        TierCourse(id="math-280-282", code="MATH 280 / 282", name="Data Science & ML", full_name="MATH 280 / 282: Data Science & ML", description="Modern ML foundations", tier=2),
        # TIER 3: RESEARCH / GRAD-LEVEL DEPTH
        TierCourse(id="math-101-101h", code="MATH 101 / 101H", name="Real Analysis", full_name="MATH 101 / 101H: Real Analysis", description="Theoretical ML", tier=3),
        TierCourse(id="math-181", code="MATH 181", name="Stochastic Processes", full_name="MATH 181: Stochastic Processes", description="Probabilistic ML", tier=3),
        TierCourse(id="math-150", code="MATH 150", name="Mathematical Modeling", full_name="MATH 150: Mathematical Modeling", description="Scientific ML", tier=3),
        TierCourse(id="math-160", code="MATH 160", name="Mathematical Logic", full_name="MATH 160: Mathematical Logic", description="Theory", tier=3),
        TierCourse(id="math-221-224", code="MATH 221–224", name="Advanced PDEs", full_name="MATH 221–224: Advanced PDEs", description="Physics-based ML", tier=3),
    ],
    category_intros={
        "tier-1": "If a student does not complete most of these, they are not ML-ready. These are the **highest priority courses** for ML/AI careers, including core CS courses and essential mathematics.",
        "tier-2": "These courses separate \"knows ML\" from \"understands ML deeply.\" They provide specialized ML knowledge and advanced mathematics that make you stand out in ML/AI roles.",
        "tier-3": "Only recommended for: Grad school, Research, Theory-heavy ML paths, Advanced Mathematics. These are research-level courses for students pursuing deep theoretical ML work.",
    },
)

# ====================
# DATA SCIENCE
# ====================

DATA_SCIENCE_CONFIG = CareerPathConfig(
    root_label="Data Science / Data Analytics",
    categories=[
        CareerPathCategory(id="tier-1", label="TIER 1: NON-NEGOTIABLE CORE (DATA SCIENCE)", emoji="🟢"),
        CareerPathCategory(id="tier-2", label="TIER 2: HIGH-VALUE DATA SCIENCE BOOSTERS", emoji="🟡"),
        CareerPathCategory(id="tier-3", label="TIER 3: ML-ADJACENT (OPTIONAL)", emoji="🟠"),
        CareerPathCategory(id="tier-4", label="ETHICS & PROFESSIONAL PRACTICE", emoji="🟣"),
    ],
    courses=[
        # TIER 1: NON-NEGOTIABLE CORE
        TierCourse(id="datascience-dsc-008", code="DSC 008", name="Introduction to Data Science", full_name="DSC 008: Introduction to Data Science", description="Establishes the complete data pipeline: raw data ingestion, cleaning dirty datasets, and exploratory visualization", tier=1),
        TierCourse(id="datascience-dsc-011", code="DSC 011", name="Intro Computing & Statistical Programming", full_name="DSC 011: Intro Computing & Statistical Programming", description="Teaches vectorized programming and usage of statistical libraries (like NumPy/Pandas) essential for handling large datasets", tier=1),
        TierCourse(id="datascience-dsa-001", code="DSA 001", name="Foundations of Data Science & Analytics", full_name="DSA 001: Foundations of Data Science & Analytics", description="Covers the business lifecycle of data: defining metrics, asking the right questions, and translating results into strategy", tier=1),
        TierCourse(id="datascience-dsa-002", code="DSA 002", name="Thinking Like a Programmer", full_name="DSA 002: Thinking Like a Programmer", description="Moves beyond syntax to algorithmic problem solving, enabling the automation of complex data tasks", tier=1),
        TierCourse(id="datascience-dsc-100", code="DSC 100", name="Advanced Data Science", full_name="DSC 100: Advanced Data Science", description="Capstone-level execution: students build a deployment-ready data portfolio project from scratch", tier=1),
        TierCourse(id="datascience-math-032", code="MATH 032", name="Probability & Statistics", full_name="MATH 032: Probability & Statistics", description="The framework for A/B testing, understanding significance, and quantifying uncertainty in data", tier=1),
        TierCourse(id="datascience-math-024", code="MATH 024", name="Linear Algebra & Differential Equations", full_name="MATH 024: Linear Algebra & Differential Equations", description="Matrix operations and eigenvalues—the mathematical engine behind almost every Machine Learning algorithm", tier=1),
        TierCourse(id="datascience-math-021", code="MATH 021", name="Calculus I (Engineering)", full_name="MATH 021: Calculus I (Engineering)", description="Fundamentals of optimization and rates of change, crucial for understanding how models \"learn\" (Gradient Descent)", tier=1),
        TierCourse(id="datascience-math-022", code="MATH 022", name="Calculus II (Engineering)", full_name="MATH 022: Calculus II (Engineering)", description="Fundamentals of optimization and rates of change, crucial for understanding how models \"learn\" (Gradient Descent)", tier=1),
        # TIER 2: HIGH-VALUE BOOSTERS
        TierCourse(id="datascience-cse-111", code="CSE 111", name="Database Systems", full_name="CSE 111: Database Systems", description="Mastery of SQL and schema design for querying complex, relational data warehouses", tier=2),
        TierCourse(id="datascience-cse-030", code="CSE 030", name="Data Structures", full_name="CSE 030: Data Structures", description="Understanding memory and runtime efficiency (Big O notation) to write code that scales to millions of rows", tier=2),
        TierCourse(id="datascience-cse-120", code="CSE 120", name="Software Engineering", full_name="CSE 120: Software Engineering", description="Professional development practices: Version control (Git), collaboration, and deployment pipelines", tier=2),
        TierCourse(id="datascience-cse-108", code="CSE 108", name="Full Stack Web Development", full_name="CSE 108: Full Stack Web Development", description="Ability to deploy models as web apps and create interactive, front-end dashboards (beyond static charts)", tier=2),
        TierCourse(id="datascience-math-041", code="MATH 041", name="Linear Algebra for Data Science", full_name="MATH 041: Linear Algebra for Data Science", description="Linear algebra tailored specifically for dimensionality reduction and data compression techniques", tier=2),
        TierCourse(id="datascience-math-180", code="MATH 180", name="Applied Statistics & Machine Learning", full_name="MATH 180: Applied Statistics & Machine Learning", description="Practical application of statistical learning methods to solve industry-standard prediction problems", tier=2),
        TierCourse(id="datascience-math-280", code="MATH 280", name="Math & Stats Foundations of Data Science", full_name="MATH 280: Math & Stats Foundations of Data Science", description="Rigorous theoretical derivation of estimators, ensuring you understand why a model works, not just how to run it", tier=2),
        TierCourse(id="datascience-math-282", code="MATH 282", name="Statistical & Machine Learning", full_name="MATH 282: Statistical & Machine Learning", description="Advanced modeling techniques focusing on high-dimensional data and modern statistical prediction", tier=2),
        TierCourse(id="datascience-math-150", code="MATH 150", name="Mathematical Modeling", full_name="MATH 150: Mathematical Modeling", description="The art of translating vague, real-world constraints into solvable mathematical equations", tier=2),
        # TIER 3: ML-ADJACENT
        TierCourse(id="datascience-dsa-101", code="DSA 101", name="Machine Learning & NLP", full_name="DSA 101: Machine Learning & NLP", description="Cutting-edge text analytics: Sentiment analysis, topic modeling, and language model applications for processing customer reviews, social media, and documents", tier=3),
        TierCourse(id="datascience-cse-176", code="CSE 176", name="Machine Learning", full_name="CSE 176: Machine Learning", description="Model training fundamentals: Supervised/Unsupervised learning, Neural Networks, and model validation techniques for predictive analytics", tier=3),
        TierCourse(id="datascience-cse-175", code="CSE 175", name="Artificial Intelligence", full_name="CSE 175: Artificial Intelligence", description="Algorithmic decision-making: Search strategies, reasoning systems, and optimization for automated intelligence applications", tier=3),
        # TIER 4: ETHICS
        TierCourse(id="datascience-dsc-104", code="DSC 104", name="Ethics in Data Science", full_name="DSC 104: Ethics in Data Science", description="Bias, fairness, and accountability in data science. Data science uniquely impacts people and policy.", tier=4),
    ],
    category_intros={
        "tier-1": "**Core Data Science + Mathematics Foundation.** If a student skips these, they are not data-science ready. Essential for all Data Scientist, Data Analyst, and Business Intelligence Engineer roles.",
        "tier-2": "**CS Courses + Advanced Math.** These courses significantly enhance data science capabilities and make the difference between junior and mid-level data roles. Build dashboards, data products, and production systems.",
        "tier-3": "**ML-Adjacent Optional Courses.** Only recommended if the student wants Data Scientist (not just Analyst) roles. Opens doors to ML engineering and advanced analytics positions.",
        "tier-4": "**Ethics & Professional Practice.** Data science uniquely impacts people and policy. This course addresses bias, fairness, and accountability - a strong resume talking point.",
    },
)

# Dictionary mapping career path IDs to their configurations
CAREER_PATHS = {
    "cybersecurity": CYBERSECURITY_CONFIG,
    "swe": SWE_CONFIG,
    "ml-ai": ML_AI_CONFIG,
    "datascience": DATA_SCIENCE_CONFIG,
}

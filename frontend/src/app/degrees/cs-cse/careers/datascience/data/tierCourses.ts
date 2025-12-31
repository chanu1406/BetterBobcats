/**
 * Data Science Career Path - Course Tiers
 * 
 * Tier 1: Non-negotiable core courses - if a student skips these, they are not data-science ready
 * Tier 2: High-value boosters - CS and advanced math courses that significantly enhance capabilities
 * Tier 3: ML-adjacent optional courses - recommended for Data Scientist roles (not just Analyst)
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1 — NON-NEGOTIABLE CORE (DATA SCIENCE)
 * 
 * Core Data Science + Mathematics Foundation
 * If a student skips these, they are not data-science ready.
 */
export const tier1Courses: TierCourse[] = [
  // Core Data Science Courses (DSA / DSC)
  {
    id: 'datascience-dsc-008',
    code: 'DSC 008',
    name: 'Introduction to Data Science',
    fullName: 'DSC 008: Introduction to Data Science',
    description: 'Entry point: data, cleaning, analysis mindset',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "None - introductory course",
      learningOutcomes: [
        "Understand the data science workflow from raw data to insights",
        "Clean and prepare messy real-world datasets",
        "Perform exploratory data analysis",
        "Communicate findings through visualizations",
        "Develop the analytical mindset needed for data work"
      ],
      topics: [
        "Data cleaning and preprocessing",
        "Exploratory data analysis (EDA)",
        "Data visualization fundamentals",
        "Statistical thinking basics",
        "Real-world data challenges",
        "Communicating with data"
      ],
      description: "This is your entry point into data science - where you learn what data work actually looks like. You'll discover that most of data science is cleaning messy data, asking the right questions, and telling stories with numbers. If you're serious about any data career, this is where it starts.",
      additionalNotes: "The perfect starting point for anyone interested in data science, regardless of background. Sets the foundation for all advanced data science work."
    },
  },
  {
    id: 'datascience-dsc-011',
    code: 'DSC 011',
    name: 'Intro Computing & Statistical Programming',
    fullName: 'DSC 011: Intro Computing & Statistical Programming',
    description: 'Python/R + stats thinking',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "DSC 008 or concurrent enrollment",
      learningOutcomes: [
        "Write Python/R code for data analysis",
        "Apply statistical thinking to real problems",
        "Manipulate and transform datasets programmatically",
        "Implement statistical tests and models",
        "Automate data analysis workflows"
      ],
      topics: [
        "Python/R programming fundamentals",
        "Data manipulation with pandas/tidyverse",
        "Statistical programming concepts",
        "Probability and distributions",
        "Hypothesis testing in code",
        "Reproducible analysis workflows"
      ],
      description: "Here's where you actually learn to code for data science. You'll pick up Python or R and start writing programs that analyze data instead of just clicking buttons in Excel. This combination of programming and statistical thinking is what separates real data scientists from people who just make charts.",
      additionalNotes: "Essential programming foundation for data science. Without coding skills, you'll hit a ceiling fast in any data role."
    },
  },
  {
    id: 'datascience-dsa-001',
    code: 'DSA 001',
    name: 'Foundations of Data Science & Analytics',
    fullName: 'DSA 001: Foundations of Data Science & Analytics',
    description: 'Core data workflows & analytics',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "None or basic programming experience",
      learningOutcomes: [
        "Master the end-to-end data analytics workflow",
        "Work with real datasets from various domains",
        "Apply appropriate analytical techniques to problems",
        "Present data-driven insights to stakeholders",
        "Understand business context for analytics"
      ],
      topics: [
        "Data analytics methodology",
        "Business intelligence fundamentals",
        "Descriptive and diagnostic analytics",
        "Data-driven decision making",
        "Analytics tools and platforms",
        "Communicating analytical findings"
      ],
      description: "This course teaches you the complete data analytics workflow that companies actually use - from understanding business problems to delivering actionable insights. You'll learn how to take messy data, make sense of it, and communicate findings that people care about. Essential for any data role.",
      additionalNotes: "Bridges the gap between technical skills and business application. Critical for understanding what data work looks like in industry."
    },
  },
  {
    id: 'datascience-dsa-002',
    code: 'DSA 002',
    name: 'Thinking Like a Programmer',
    fullName: 'DSA 002: Thinking Like a Programmer',
    description: 'Coding fluency (huge weak point for analysts)',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "DSC 011 or basic programming experience",
      learningOutcomes: [
        "Develop computational thinking and problem-solving skills",
        "Write clean, efficient, and maintainable code",
        "Debug programs systematically",
        "Design algorithms for data problems",
        "Build coding confidence and fluency"
      ],
      topics: [
        "Algorithmic thinking",
        "Problem decomposition",
        "Code organization and structure",
        "Debugging strategies",
        "Software development best practices",
        "Programming for data workflows"
      ],
      description: "Many data analysts can write basic code, but they struggle with real programming. This course fixes that - teaching you how to think like a programmer, solve complex problems, and write code that doesn't break. It's the difference between being stuck with simple tasks and being able to build real data tools.",
      additionalNotes: "Addresses the #1 weakness of many data analysts - poor programming skills. Essential for advancing beyond entry-level data roles."
    },
  },
  {
    id: 'datascience-dsc-100',
    code: 'DSC 100',
    name: 'Advanced Data Science',
    fullName: 'DSC 100: Advanced Data Science',
    description: 'End-to-end data projects',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "DSC 011, DSA 001, DSA 002",
      learningOutcomes: [
        "Execute complete data science projects from start to finish",
        "Handle complex, real-world datasets",
        "Apply advanced analytics techniques appropriately",
        "Build production-quality data pipelines",
        "Work on team-based data projects"
      ],
      topics: [
        "End-to-end data science methodology",
        "Advanced data wrangling",
        "Feature engineering",
        "Model selection and validation",
        "Data pipeline development",
        "Project management for data science"
      ],
      description: "This is where everything comes together. You'll work on real, messy data science projects from beginning to end - just like in industry. No more toy datasets or simple tutorials. This course prepares you for what data science work actually looks like when you get hired.",
      additionalNotes: "Capstone-level course that integrates all foundational skills. Essential preparation for data science internships and jobs."
    },
  },
  // Core Mathematics (Required)
  {
    id: 'datascience-math-032',
    code: 'MATH 032',
    name: 'Probability & Statistics',
    fullName: 'MATH 032: Probability & Statistics',
    description: 'Inference, confidence, hypothesis testing',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "Calculus I or equivalent",
      learningOutcomes: [
        "Understand probability theory and distributions",
        "Perform statistical inference and hypothesis testing",
        "Calculate and interpret confidence intervals",
        "Apply statistical methods to real data",
        "Make data-driven decisions with uncertainty"
      ],
      topics: [
        "Probability fundamentals",
        "Random variables and distributions",
        "Statistical inference",
        "Hypothesis testing",
        "Confidence intervals",
        "Regression basics"
      ],
      description: "This is the math foundation of data science. You can't do real data work without understanding probability and statistics - it's how you know if your findings are real or just noise. Every data scientist needs to master inference, hypothesis testing, and confidence intervals.",
      additionalNotes: "Non-negotiable for data science. This is the mathematical backbone of making sense of uncertain data."
    },
  },
  {
    id: 'datascience-math-024',
    code: 'MATH 024',
    name: 'Linear Algebra & Differential Equations',
    fullName: 'MATH 024: Linear Algebra & Differential Equations',
    description: 'Models, regressions, transformations',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "MATH 022 (Calculus II)",
      learningOutcomes: [
        "Master matrix operations and linear transformations",
        "Understand vector spaces and linear systems",
        "Apply linear algebra to data science problems",
        "Solve differential equations for modeling",
        "Work with high-dimensional data mathematically"
      ],
      topics: [
        "Matrices and linear transformations",
        "Vector spaces and bases",
        "Eigenvalues and eigenvectors",
        "Linear regression mathematics",
        "Differential equations basics",
        "Applications to data science"
      ],
      description: "Linear algebra is everywhere in data science - machine learning, dimensionality reduction, neural networks. This course teaches you the math behind how algorithms actually work. Without it, you're just calling library functions without understanding what's happening underneath.",
      additionalNotes: "Critical for understanding machine learning and advanced analytics. The math that powers most data science algorithms."
    },
  },
  {
    id: 'datascience-math-021',
    code: 'MATH 021',
    name: 'Calculus I (Engineering)',
    fullName: 'MATH 021: Calculus I (Engineering)',
    description: 'Required quantitative foundation',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "Precalculus or placement",
      learningOutcomes: [
        "Understand limits, derivatives, and integrals",
        "Apply calculus to optimization problems",
        "Analyze rates of change in data",
        "Build quantitative reasoning skills",
        "Develop mathematical maturity"
      ],
      topics: [
        "Limits and continuity",
        "Derivatives and differentiation",
        "Integration fundamentals",
        "Optimization",
        "Applications to real problems"
      ],
      description: "Calculus is the foundation of all advanced math in data science. You need it for understanding optimization (how algorithms learn), rates of change (how data evolves), and pretty much any advanced analytics. It's not optional if you want to go beyond basic data analysis.",
      additionalNotes: "Required foundation for all advanced quantitative work. Opens the door to statistics, machine learning, and optimization."
    },
  },
  {
    id: 'datascience-math-022',
    code: 'MATH 022',
    name: 'Calculus II (Engineering)',
    fullName: 'MATH 022: Calculus II (Engineering)',
    description: 'Required quantitative foundation',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: "MATH 021 (Calculus I)",
      learningOutcomes: [
        "Master integration techniques and applications",
        "Work with sequences and series",
        "Understand multivariable calculus basics",
        "Apply calculus to complex problems",
        "Prepare for advanced mathematical modeling"
      ],
      topics: [
        "Advanced integration techniques",
        "Sequences and series",
        "Parametric equations",
        "Polar coordinates",
        "Introduction to multivariable concepts"
      ],
      description: "Calculus II continues building your quantitative foundation and introduces concepts you'll need for advanced data science. Sequences and series show up in algorithms, and the integration techniques are essential for probability and statistics. It's another required stepping stone.",
      additionalNotes: "Completes the calculus sequence needed for advanced data science work. Required for linear algebra and statistics courses."
    },
  },
];

/**
 * 🟡 TIER 2 — HIGH-VALUE DATA SCIENCE BOOSTERS
 * 
 * CS Courses + Advanced Math that significantly enhance data science capabilities
 * These courses make the difference between junior and mid-level data roles
 */
export const tier2Courses: TierCourse[] = [
  // CS Courses That Matter for Data Science
  {
    id: 'datascience-cse-111',
    code: 'CSE 111',
    name: 'Database Systems',
    fullName: 'CSE 111: Database Systems',
    description: 'SQL, data modeling, real datasets',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030 or programming experience",
      learningOutcomes: [
        "Master SQL for data extraction and manipulation",
        "Design efficient database schemas",
        "Query and join large datasets",
        "Optimize database performance",
        "Work with real-world data storage systems"
      ],
      topics: [
        "Relational database design",
        "SQL queries and joins",
        "Database normalization",
        "Indexing and optimization",
        "Transactions and concurrency",
        "Working with production databases"
      ],
      description: "SQL is the language of data. Every company stores data in databases, and you need to know how to get it out and work with it efficiently. This course teaches you database design, complex queries, and how to handle real datasets that are way too big for Excel.",
      additionalNotes: "One of the most practical and immediately useful skills for data roles. SQL shows up in almost every data science job description."
    },
  },
  {
    id: 'datascience-cse-030',
    code: 'CSE 030',
    name: 'Data Structures',
    fullName: 'CSE 030: Data Structures',
    description: 'Efficient data handling',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 021 or basic programming",
      learningOutcomes: [
        "Implement fundamental data structures",
        "Analyze algorithm efficiency and time complexity",
        "Choose appropriate data structures for problems",
        "Write efficient code for large datasets",
        "Understand how data is organized in memory"
      ],
      topics: [
        "Arrays, linked lists, and trees",
        "Hash tables and dictionaries",
        "Stacks, queues, and heaps",
        "Algorithm analysis and Big O",
        "Sorting and searching algorithms",
        "Graph data structures"
      ],
      description: "Data structures determine how fast your code runs and how much memory it uses. When you're working with millions of rows, choosing the wrong data structure can make your code unusable. This course teaches you how to handle data efficiently - crucial for real data science work.",
      additionalNotes: "Makes the difference between slow, clunky code and professional-quality data pipelines. Highly valued by employers."
    },
  },
  {
    id: 'datascience-cse-120',
    code: 'CSE 120',
    name: 'Software Engineering',
    fullName: 'CSE 120: Software Engineering',
    description: 'Turning analysis into tools',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, CSE 031",
      learningOutcomes: [
        "Build production-quality software systems",
        "Work on team-based development projects",
        "Apply software engineering best practices",
        "Version control and collaboration with Git",
        "Test, debug, and maintain code professionally"
      ],
      topics: [
        "Software development lifecycle",
        "Version control with Git",
        "Testing and debugging",
        "Code review and documentation",
        "Team collaboration",
        "Building maintainable systems"
      ],
      description: "Data science isn't just one-off analysis - it's building tools and systems that others use. This course teaches you how to write professional code, work with teams, and turn your analysis into actual products. It's the difference between analyst and engineer.",
      additionalNotes: "Essential for moving from individual contributor to building systems. Highly valuable for data engineer and ML engineer roles."
    },
  },
  {
    id: 'datascience-cse-108',
    code: 'CSE 108',
    name: 'Full Stack Web Development',
    fullName: 'CSE 108: Full Stack Web Development',
    description: 'Dashboards, data products',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 120",
      learningOutcomes: [
        "Build interactive web applications",
        "Create data dashboards and visualizations",
        "Develop full-stack data products",
        "Implement APIs for data services",
        "Deploy web-based analytics tools"
      ],
      topics: [
        "Frontend development (HTML, CSS, JavaScript)",
        "Backend development and APIs",
        "Web frameworks (React, Flask, Django)",
        "Interactive data visualization",
        "Building dashboards",
        "Deploying web applications"
      ],
      description: "The best data scientists can turn their analysis into interactive dashboards and web apps that others can use. This course teaches you full-stack development so you can build data products, not just PowerPoints. It's how you make your work accessible and impactful.",
      additionalNotes: "Increasingly important for data roles. Companies want data scientists who can ship products, not just reports."
    },
  },
  // Advanced / Applied Math for Data Science
  {
    id: 'datascience-math-041',
    code: 'MATH 041',
    name: 'Linear Algebra for Data Science',
    fullName: 'MATH 041: Linear Algebra for Data Science',
    description: 'DS-focused linear algebra',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "MATH 024 or Linear Algebra",
      learningOutcomes: [
        "Apply linear algebra directly to data science problems",
        "Understand dimensionality reduction techniques (PCA)",
        "Work with matrix decompositions",
        "Implement linear algebra in Python/R",
        "Master the math behind machine learning"
      ],
      topics: [
        "Matrix operations for data",
        "Principal Component Analysis (PCA)",
        "Singular Value Decomposition (SVD)",
        "Linear algebra in machine learning",
        "Implementing matrix operations in code",
        "Applications to real datasets"
      ],
      description: "This is linear algebra specifically tailored for data science - focusing on the techniques you'll actually use like PCA, SVD, and matrix operations for ML. Unlike general linear algebra, this course shows you exactly how the math connects to data work you'll do in your career.",
      additionalNotes: "Highly recommended over general linear algebra if available. Bridges the gap between abstract math and practical data science."
    },
  },
  {
    id: 'datascience-math-180',
    code: 'MATH 180',
    name: 'Applied Statistics & Machine Learning',
    fullName: 'MATH 180: Applied Statistics & Machine Learning',
    description: 'Industry-aligned analytics',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "MATH 032, programming experience",
      learningOutcomes: [
        "Apply statistical methods to real business problems",
        "Implement machine learning algorithms",
        "Evaluate model performance and validity",
        "Conduct A/B testing and experiments",
        "Use statistics in industry settings"
      ],
      topics: [
        "Applied regression and modeling",
        "Machine learning fundamentals",
        "A/B testing and experimentation",
        "Statistical modeling for business",
        "Model validation and selection",
        "Real-world analytics case studies"
      ],
      description: "This course connects statistics to what companies actually need - A/B testing, predictive modeling, and data-driven decisions. It's applied statistics and ML focused on industry problems, not just theory. Perfect for students who want to work as data scientists in tech or business.",
      additionalNotes: "Highly practical and industry-focused. Great preparation for data science interviews and real-world work."
    },
  },
  {
    id: 'datascience-math-280',
    code: 'MATH 280',
    name: 'Math & Stats Foundations of Data Science',
    fullName: 'MATH 280: Math & Stats Foundations of Data Science',
    description: 'Core DS theory',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "MATH 024, MATH 032",
      learningOutcomes: [
        "Master the mathematical foundations of data science",
        "Understand theoretical underpinnings of algorithms",
        "Prove properties of statistical methods",
        "Develop rigorous analytical thinking",
        "Connect theory to practice in data science"
      ],
      topics: [
        "Mathematical foundations of statistics",
        "Information theory basics",
        "Optimization theory",
        "Probability theory for data science",
        "Statistical learning theory",
        "Theoretical foundations of ML"
      ],
      description: "This course gives you the deep mathematical theory behind data science - why algorithms work, how to prove they're correct, and the fundamental principles. It's more theoretical than applied, but it builds the rigorous thinking that separates good data scientists from great ones.",
      additionalNotes: "More theoretical than other courses. Great for students interested in research, PhD programs, or really understanding the 'why' behind the methods."
    },
  },
  {
    id: 'datascience-math-282',
    code: 'MATH 282',
    name: 'Statistical & Machine Learning',
    fullName: 'MATH 282: Statistical & Machine Learning',
    description: 'Applied modeling',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "MATH 280 or MATH 180",
      learningOutcomes: [
        "Implement advanced ML algorithms from scratch",
        "Apply statistical learning methods",
        "Understand bias-variance tradeoff deeply",
        "Develop custom models for specific problems",
        "Evaluate and tune model performance"
      ],
      topics: [
        "Supervised learning algorithms",
        "Unsupervised learning methods",
        "Model selection and regularization",
        "Ensemble methods",
        "Deep learning fundamentals",
        "Statistical learning theory in practice"
      ],
      description: "This is where you go deep into machine learning - not just using sklearn, but understanding and implementing algorithms yourself. You'll learn the statistics behind ML models and how to build custom solutions. Essential if you want to move beyond basic data analysis into ML engineering.",
      additionalNotes: "Advanced course that bridges statistics and ML. Great for students aiming for ML engineer or data scientist roles that require deep technical skills."
    },
  },
  {
    id: 'datascience-math-150',
    code: 'MATH 150',
    name: 'Mathematical Modeling',
    fullName: 'MATH 150: Mathematical Modeling',
    description: 'Real-world problem framing',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: "MATH 024, MATH 032",
      learningOutcomes: [
        "Translate real problems into mathematical models",
        "Build models for complex systems",
        "Validate and refine models iteratively",
        "Communicate mathematical insights",
        "Apply modeling to diverse domains"
      ],
      topics: [
        "Building mathematical models",
        "Optimization modeling",
        "Simulation and Monte Carlo methods",
        "Model validation and testing",
        "Real-world modeling case studies",
        "Communicating model results"
      ],
      description: "Data science is about solving real problems, not just running algorithms. This course teaches you how to take messy, real-world situations and turn them into mathematical models you can solve. It's the skill that lets you tackle problems that don't have obvious solutions or clean datasets.",
      additionalNotes: "Develops critical thinking and problem-solving skills. Great for students who want to work on complex, novel problems rather than routine analytics."
    },
  },
];

/**
 * 🟠 TIER 3 — ML-ADJACENT (OPTIONAL)
 * 
 * Only recommended if the student wants Data Scientist (not Analyst) roles
 * These courses open doors to ML engineering and advanced analytics positions
 */
export const tier3Courses: TierCourse[] = [
  {
    id: 'datascience-dsa-101',
    code: 'DSA 101',
    name: 'Machine Learning & NLP',
    fullName: 'DSA 101: Machine Learning & NLP',
    description: 'Text-heavy data, applied ML',
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "DSC 100, programming experience",
      learningOutcomes: [
        "Apply ML to text and language data",
        "Build NLP models for real applications",
        "Process and analyze unstructured text",
        "Implement sentiment analysis and text classification",
        "Work with modern NLP tools and libraries"
      ],
      topics: [
        "Natural language processing fundamentals",
        "Text preprocessing and feature extraction",
        "Sentiment analysis",
        "Text classification and clustering",
        "Machine learning for NLP",
        "Modern NLP tools (spaCy, NLTK, transformers)"
      ],
      description: "Tons of valuable data is hidden in text - reviews, social media, documents. This course teaches you how to extract insights from text using NLP and machine learning. Great if you're interested in social media analytics, customer feedback analysis, or any work with language data.",
      additionalNotes: "Optional but increasingly relevant. NLP skills are valuable for specific industries like tech, marketing, and social analytics."
    },
  },
  {
    id: 'datascience-cse-176',
    code: 'CSE 176',
    name: 'Machine Learning',
    fullName: 'CSE 176: Machine Learning',
    description: 'Transition to ML roles',
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, MATH 024, MATH 032",
      learningOutcomes: [
        "Implement ML algorithms from first principles",
        "Understand theoretical foundations of ML",
        "Build and train neural networks",
        "Apply ML to complex real-world problems",
        "Develop custom machine learning solutions"
      ],
      topics: [
        "Supervised learning (regression, classification)",
        "Unsupervised learning (clustering, dimensionality reduction)",
        "Neural networks and deep learning",
        "Model evaluation and validation",
        "Overfitting and regularization",
        "Advanced ML techniques"
      ],
      description: "This is the full machine learning course - teaching you not just how to use ML libraries, but how to build algorithms from scratch and understand the theory. Take this if you want to transition from data analyst to machine learning engineer or data scientist roles that require deep ML knowledge.",
      additionalNotes: "Recommended for students who want ML engineer or research-oriented data scientist roles. Opens doors to more technical positions."
    },
  },
  {
    id: 'datascience-cse-175',
    code: 'CSE 175',
    name: 'Artificial Intelligence',
    fullName: 'CSE 175: Artificial Intelligence',
    description: 'Broader AI understanding',
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030, MATH 032",
      learningOutcomes: [
        "Understand AI fundamentals and history",
        "Implement search and optimization algorithms",
        "Work with knowledge representation",
        "Apply AI techniques to various problems",
        "Understand the broader AI landscape"
      ],
      topics: [
        "Search algorithms and heuristics",
        "Knowledge representation and reasoning",
        "Planning and decision-making",
        "Game theory and adversarial search",
        "Constraint satisfaction",
        "AI applications across domains"
      ],
      description: "AI is broader than just machine learning - it includes search, planning, reasoning, and decision-making. This course gives you the full picture of artificial intelligence. Good if you want to understand the complete AI landscape, not just neural networks and regression.",
      additionalNotes: "Optional and more exploratory. Best for students interested in AI research, PhD programs, or wanting a comprehensive AI background."
    },
  },
];

/**
 * 🟣 ETHICS & PROFESSIONAL PRACTICE (IMPORTANT)
 * 
 * Data science uniquely impacts people and policy
 * This course addresses bias, fairness, and accountability
 */
export const tier4Courses: TierCourse[] = [
  {
    id: 'datascience-dsc-104',
    code: 'DSC 104',
    name: 'Ethics in Data Science',
    fullName: 'DSC 104: Ethics in Data Science',
    description: 'Bias, fairness, and accountability in data science',
    tier: 4,
    expandedInfo: {
      credits: 4,
      prerequisites: "DSC 100 or significant data science coursework",
      learningOutcomes: [
        "Identify bias and fairness issues in data and models",
        "Understand ethical implications of data science work",
        "Apply ethical frameworks to real problems",
        "Consider privacy and data rights",
        "Make responsible decisions with data"
      ],
      topics: [
        "Bias in data and algorithms",
        "Fairness and discrimination in ML",
        "Privacy and data protection",
        "Accountability and transparency",
        "Ethics case studies in data science",
        "Responsible AI development"
      ],
      description: "Data science affects real people's lives - from loan decisions to criminal justice to hiring. This course teaches you to think critically about bias, fairness, and the ethical impact of your work. It's not optional if you want to be a responsible data scientist who doesn't accidentally harm people with your models.",
      additionalNotes: "Increasingly important for data science careers. Many companies now require understanding of AI ethics, and regulations like GDPR make this knowledge essential."
    },
  },
];

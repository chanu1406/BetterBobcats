/**
 * ML-AI Tier Courses Data
 * Course recommendations organized by tier for Machine Learning / AI career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: NON-NEGOTIABLE CORE (ML / AI)
 * If a student does not complete most of these, they are not ML-ready.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "cse-176",
    code: "CSE 176",
    name: "Introduction to Machine Learning",
    fullName: "CSE 176: Introduction to Machine Learning",
    description: "Central ML algorithms, model training, evaluation, and application",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Introduction to Machine Learning provides students with a solid foundation in the algorithms and practices used for predictive modeling and pattern discovery — skills essential for data science, AI engineering, and analytics roles where systems must learn from data and generalize to new observations. It’s foundational coursework for transitioning into advanced data science or AI careers and feeds directly into ML engineer and research-oriented paths." ,
  
      realWorldApplications: [
        "Building predictive models to forecast outcomes from historical data",
        "Segmenting and discovering structure in unlabeled data (clustering)",
        "Reducing dimensionality for visualization and performance improvements",
        "Applying classification models in domains such as health, finance, and computer vision",
        "Evaluating and tuning models for real-world deployment",
        "Using model training and validation techniques to avoid overfitting and improve generalization"
      ],
  
      learningOutcomes: [
        "Understand supervised learning concepts such as classification and regression",
        "Apply unsupervised learning methods like clustering and dimensionality reduction",
        "Train and evaluate models using statistical and data-driven techniques",
        "Understand core ML algorithms including decision trees, mixture models, and neural networks",
        "Interpret performance metrics and tuning strategies for practical ML tasks",
        "Translate machine learning theory into reproducible, working code"
      ],
  
      topics: [
        "Supervised learning (classification, regression) and associated algorithms",
        "Unsupervised learning (clustering, density estimation)",
        "Dimensionality reduction (e.g., PCA, LDA) and feature representation",
        "Model training, validation, and performance evaluation",
        "Nonparametric learning methods and kernel-based approaches",
        "Fundamental neural network concepts and ensembles such as boosting"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=aircAruvnKk", // ML basics: supervised & unsupervised learning
          "https://www.youtube.com/watch?v=Cr6VqTRO1v0", // Machine learning workflow overview
          "https://www.youtube.com/watch?v=CVEz0G4FtJg"  // Classification & Regression introduction
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Machine_learning",      // Machine learning overview and common approaches 
          "https://scikit-learn.org/stable/tutorial/basic/tutorial.html" // Practical ML prototyping
        ],
        tools: [
          "scikit-learn",        // Standard Python ML library
          "TensorFlow / Keras",  // Neural network frameworks
          "Python (Pandas/NumPy)", // Data handling & preprocessing
          "Jupyter Notebooks"    // Interactive modeling environment
        ]
      },
  
      additionalNotes:
        "CSE 176 is a comprehensive introductory machine learning course that surveys both theory and practice of ML algorithms used in real applications. Students learn to build, train, evaluate, and interpret models using statistical principles and practical tools — a central skill set for ML and data science careers."
    }
  },
  {
    id: "cse-175",
    code: "CSE 175",
    name: "Introduction to Artificial Intelligence",
    fullName: "CSE 175: Introduction to Artificial Intelligence",
    description: "Foundations of search, reasoning, planning, and core AI techniques",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Introduction to Artificial Intelligence covers the core algorithms and methods that underpin intelligent systems — including search, knowledge representation, reasoning, and planning. These foundations are critical for roles in AI engineering, intelligent systems design, robotics, autonomous systems, and advanced data science workflows where AI techniques are applied. AI is central to modern automation, decision-making tools, and smart applications across industries." ,
  
      realWorldApplications: [
        "Designing intelligent agents that solve problems with minimal supervision",
        "Applying heuristic search to optimize decision processes in games, logistics, and planning systems",
        "Using knowledge representation and reasoning to model real-world knowledge for inference",
        "Incorporating uncertainty handling in predictive tasks and decision support systems",
        "Developing AI components for robotics, autonomous navigation, or perception pipelines",
        "Integrating machine learning with classical AI strategies in hybrid intelligent systems"
      ],
  
      learningOutcomes: [
        "Understand the role of search and optimization in solving complex problems",
        "Apply knowledge representation techniques to model domain knowledge",
        "Use reasoning and planning algorithms to make intelligent decisions",
        "Analyze AI systems in terms of efficiency, scalability, and applicability",
        "Explore how AI techniques integrate with machine learning and perception modules",
        "Build foundational AI systems using standard methods and evaluate their performance"
      ],
  
      topics: [
        "Search and optimization techniques for problem solving",
        "Knowledge representation and logical inference",
        "Reasoning under uncertainty and probabilistic models",
        "Planning and decision making algorithms",
        "Introduction to perception, robotics, and language components",
        "Integration of machine learning techniques into AI systems"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=0oyDqO8PjIg", // AI foundations and overview
          "https://www.youtube.com/watch?v=jxjUCoieW4A", // Search algorithms basics (AI core topic)
          "https://www.youtube.com/watch?v=aircAruvnKk"  // ML overview (context for AI/ML integration)
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Artificial_intelligence",               // AI overview and subfields
          "https://en.wikipedia.org/wiki/Outline_of_artificial_intelligence",  // AI topic taxonomy including search, reasoning, planning
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67537&utm_source=chatgpt.com" // UC Merced AI course entry reference (through combined list)
        ],
        tools: [
          "Python (AI/ML libraries)",      // Implementation of AI algorithms
          "OpenAI Gym",                    // Intelligent agent environments
          "Logic/Planning libraries",      // Practical tools for reasoning & planning
          "Jupyter Notebooks"              // Reproducible AI experimentation
        ]
      },
  
      additionalNotes:
        "CSE 175 introduces the main concepts and methods underlying the construction and analysis of intelligent systems — including agent architectures, search, knowledge representation, reasoning, planning, and elements of perception and machine learning. It includes practical labs where students build and examine intelligent systems, preparing them for advanced AI coursework and real-world AI applications."
    }
  },
  {
    id: "cse-030",
    code: "CSE 030",
    name: "Data Structures",
    fullName: "CSE 030: Data Structures",
    description: "Fundamental data organization and algorithm foundations that power efficient ML pipelines",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Data Structures teaches core methods for organizing, storing, and accessing data efficiently — a foundation for building scalable machine learning and AI systems. Understanding how data is structured affects how efficiently you can preprocess input, manage memory, and optimize models and pipelines in real applications. These skills are valued in roles such as Machine Learning Engineer, Data Engineer, and AI Developer." ,
  
      realWorldApplications: [
        "Representing and manipulating large datasets efficiently to feed into ML training and inference processes",
        "Designing scalable data pipelines that handle high-volume, high-velocity data for real-time analytics",
        "Choosing appropriate data structures to optimize performance (e.g., arrays for linear algebra operations, trees for decision tree models) ",
        "Improving memory usage and runtime of ML and AI systems by optimizing data access patterns",
        "Implementing algorithms (search, sort, indexing) that power feature extraction and transformation stages",
        "Understanding how underlying structures like graphs support complex AI tasks (e.g., knowledge graphs, neural network connectivity)"
      ],
  
      learningOutcomes: [
        "Explain and implement core data structures such as arrays, linked lists, stacks, queues, hash tables, trees, and graphs",
        "Analyze time and space complexity using Big-O notation to evaluate performance of operations",
        "Select appropriate structures for efficient storage, retrieval, and manipulation of data in ML/AI systems",
        "Implement recursive and iterative algorithms to traverse and transform data effectively",
        "Recognize how data organization impacts algorithmic efficiency and system performance",
        "Integrate data structures knowledge when designing or debugging data processing components"
      ],
  
      topics: [
        "Arrays, linked lists, and dynamic memory",
        "Stacks, queues, and their use cases",
        "Trees (binary, balanced) and hierarchical data representation",
        "Hash tables and fast lookup structures",
        "Graphs and graph traversal algorithms (BFS, DFS)",
        "Algorithm complexity and performance trade-offs"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=bum_19loj9A", // Data Structures Easy to Advanced (core concepts)
          "https://www.youtube.com/watch?v=RBSGKlAvoiM", // Big-O and complexity fundamentals
          "https://www.youtube.com/watch?v=Hj_v2aOd8GM"  // Trees & graphs intro
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Data_structure",     // Data structure fundamentals 
          "https://www.geeksforgeeks.org/data-structures/",   // Tutorials covering common structures
          "https://en.wikipedia.org/wiki/Algorithmic_complexity" // Understanding performance impact
        ],
        tools: [
          "Python (collections, built-ins)",      // Practical usage of data types
          "C++ STL (vectors, maps, sets)",        // Standard library structures
          "VS Code / IDEs",                       // Development & testing environment
          "Whiteboard & pseudocode practice"      // Core problem solving technique
        ]
      },
  
      additionalNotes:
        "According to the UC Merced catalog, CSE 030 focuses on the design, analysis, and implementation of data structures and fundamental algorithms — an essential part of computing and a foundation for efficient machine learning and AI systems."
    }
  },
  {
    id: "cse-100",
    code: "CSE 100",
    name: "Algorithm Design & Analysis",
    fullName: "CSE 100: Algorithm Design & Analysis",
    description: "Complexity, optimization thinking, and efficient algorithm design",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Algorithm Design & Analysis teaches fundamental algorithmic principles such as complexity, optimization, and pattern paradigms like divide-and-conquer or dynamic programming. These methods underpin efficient ML model training, scalable AI pipelines, and computational reasoning — all essential for careers in AI engineering, ML research, and high-performance computing. CSE 100 is a core requirement in UC Merced’s Computer Science degree." ,
  
      realWorldApplications: [
        "Designing algorithms that efficiently process large datasets used in ML and data pipelines",
        "Optimizing code and models to run faster or with lower memory usage",
        "Applying divide-and-conquer and dynamic programming in training and inference strategies",
        "Using graph and search algorithms in AI problem domains such as path planning",
        "Evaluating computational complexity to choose scalable methods in production systems"
      ],
  
      learningOutcomes: [
        "Understand computational complexity (Big-O) and its impact on algorithm performance",
        "Apply classic algorithm design paradigms such as greedy, divide-and-conquer, and dynamic programming",
        "Analyze, implement, and compare common algorithms for sorting, search, and graph problems",
        "Identify when specific algorithms suit AI/ML tasks based on performance trade-offs",
        "Develop optimization thinking that improves both models and systems"
      ],
  
      topics: [
        "Algorithm complexity & Big-O analysis",
        "Divide-and-conquer strategies",
        "Dynamic programming & greedy algorithms",
        "Graph algorithms (shortest paths, connectivity)",
        "Sorting and searching techniques",
        "Optimization & performance trade-offs"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=rL8X2mlNHPM", // Introduction to algorithm complexity
          "https://www.youtube.com/watch?v=OvxECVjRdcE", // Dynamic programming overview
          "https://www.youtube.com/watch?v=g8nhzNVKmQs"  // Graph algorithms basics
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Algorithmic_complexity", // Complexity fundamentals
          "https://en.wikipedia.org/wiki/Divide_and_conquer_algorithm", // Divide & conquer overview
          "https://en.wikipedia.org/wiki/Dynamic_programming" // Dynamic programming basics
        ],
        tools: [
          "Python (algorithm prototyping)",
          "Jupyter Notebooks (algorithm exploration)",
          "Time profiling tools (cProfile)",
          "Competitive coding platforms (HackerRank, LeetCode)"
        ]
      },
  
      additionalNotes:
        "CSE 100 introduces both the theory and practice of designing efficient algorithms — a foundation that enables you to reason about performance and scalability in ML/AI systems where data size and computation cost matter."
    }
  },
  {
    id: "cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "Data handling, preprocessing, querying, and real datasets",
    tier: 1,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Database Systems equips students with skills to design, query, and manage structured data — fundamental for ML workflows that rely on data ingestion, cleansing, and feature extraction from real datasets. Proficiency with SQL and database design improves your ability to build scalable ML/AI pipelines and work with production data engines." ,
  
      realWorldApplications: [
        "Writing SQL queries to extract training and evaluation datasets",
        "Designing normalized database schemas for efficient storage and retrieval",
        "Using indexing and query optimization for large data retrieval tasks",
        "Connecting databases to ML pipelines and analytics dashboards",
        "Handling data with constraints and ensuring consistency"
      ],
  
      learningOutcomes: [
        "Understand relational models and principles of database design",
        "Write efficient SQL for querying, filtering, and aggregating real datasets",
        "Apply indexing and optimization strategies for performance",
        "Integrate databases into data pipelines for ML preprocessing",
        "Manage transactions and understand consistency properties"
      ],
  
      topics: [
        "Relational model & schema design",
        "SQL: SELECT, JOIN, subqueries, aggregates",
        "Query optimization & indexing",
        "Transactions & ACID properties",
        "Database integration with applications",
        "Basic triggers and view concepts"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=HXV3zeQKqGY", // SQL basics
          "https://www.youtube.com/watch?v=7S_tz1z_5bA", // Full database tutorial
          "https://www.youtube.com/watch?v=9Pzj7Aj25lw"  // Database design intro
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Relational_database", // Relational concepts
          "https://en.wikipedia.org/wiki/SQL", // SQL overview
          "https://dba.stackexchange.com", // Community Q&A on database problems
        ],
        tools: [
          "PostgreSQL / MySQL",
          "SQLite",
          "DBeaver / pgAdmin",
          "Python (pandas + SQLAlchemy)"
        ]
      },
  
      additionalNotes:
        "CSE 111 at UC Merced teaches relational database fundamentals and hands-on SQL skills used extensively in both industry and research to support data preprocessing and pipeline construction."
    }
  },
  {
    id: "cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Turning models into real systems — design, collaboration, and deployment",
    tier: 1,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Software Engineering teaches structured development processes, teamwork, and best practices (e.g., version control, testing) used to build reliable, maintainable software. These skills help ML/AI practitioners transform experimental models into production-ready systems, collaborate on large projects, and maintain code quality over time." ,
  
      realWorldApplications: [
        "Collaborating with teams using Git and agile workflows",
        "Implementing unit tests and continuous integration for model code",
        "Packaging ML models into reusable modules or services",
        "Documenting code and system interfaces for long-term maintenance",
        "Evaluating trade-offs in software design for performance and scalability"
      ],
  
      learningOutcomes: [
        "Understand software development lifecycle (SDLC) and design methods",
        "Use version control and collaborative workflows effectively",
        "Design, implement, test, and debug software systems",
        "Apply maintainability, scalability, and robustness principles",
        "Integrate software engineering tools into ML/AI development pipelines"
      ],
  
      topics: [
        "Requirements gathering & design patterns",
        "Version control (Git) and workflows",
        "Testing & debugging strategies",
        "Modular design & documentation",
        "Deployment and continuous integration",
        "Team collaboration practices"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=w4rG5GY9IlA", // SE introduction
          "https://www.youtube.com/watch?v=RGOj5yH7evk", // Git version control
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc"  // Coding and design fundamentals
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Software_engineering", // SE overview
          "https://en.wikipedia.org/wiki/Version_control", // Version control basics
          "https://atlassian.com/git/tutorials" // Git tutorials
        ],
        tools: [
          "Git & GitHub",
          "IDE (VS Code)",
          "CI/CD (GitHub Actions)",
          "Project boards (Jira/Trello)"
        ]
      },
  
      additionalNotes:
        "CSE 120 helps bridge the gap from algorithmic prototypes to robust software systems — a necessary step for deploying ML/AI solutions in real products."
    }
  },
  {
    id: "math-024",
    code: "MATH 024",
    name: "Linear Algebra & Differential Equations",
    fullName: "MATH 024: Linear Algebra & Differential Equations",
    description: "Matrix math, systems, and differential equations — foundational for ML models",
    tier: 1,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Linear Algebra and Differential Equations provides mathematical foundations for representing data as vectors and matrices, solving systems, and understanding transformations — core to ML models such as PCA, regression, neural networks, and optimization algorithms. Differential equations also appear in dynamic models and continuous processes." ,
  
      realWorldApplications: [
        "Representing data and features as vectors and processing via matrix operations",
        "Using linear transformations for dimensionality reduction",
        "Applying eigenvalues/eigenvectors in principal component analysis (PCA)",
        "Modeling dynamic systems and understanding change over time",
        "Analyzing learning dynamics via gradient descent and optimization"
      ],
  
      learningOutcomes: [
        "Solve systems of linear equations using matrix techniques",
        "Understand vector spaces, determinants, and matrix properties",
        "Apply eigenvalues/eigenvectors to data transformations",
        "Solve basic differential equations for dynamic modeling",
        "Connect linear systems to ML algorithms and optimization"
      ],
  
      topics: [
        "Matrices, vectors, and linear systems",
        "Determinants and vector spaces",
        "Eigenvalues, eigenvectors, and diagonalization",
        "Linear transformations",
        "Intro to ordinary differential equations"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNk_zzaMoSs", // 3Blue1Brown linear algebra series
          "https://www.youtube.com/watch?v=kjBOesZCoqc", // Linear transformations
          "https://www.youtube.com/watch?v=Z_dEBCp2FAs"  // Eigenvalues & PCA intuition
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Linear_algebra", // Linear algebra overview
          "https://en.wikipedia.org/wiki/Differential_equation" // Diff eq basics
        ],
        tools: [
          "Python (NumPy/SciPy)",
          "Jupyter Notebooks",
          "Matlab/Octave"
        ]
      },
  
      additionalNotes:
        "MATH 024 introduces students to matrix and vector math, key to understanding and implementing many ML algorithms and data transformations."
    }
  },
  {
    id: "math-032",
    code: "MATH 032",
    name: "Probability & Statistics",
    fullName: "MATH 032: Probability & Statistics",
    description: "Uncertainty, inference, evaluation — statistical backbone for ML/AI",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Probability & Statistics provides the mathematical foundation for modeling uncertainty, making inferences from data, and evaluating predictive systems — all central to machine learning and AI. Concepts like random variables, distributions, confidence intervals, inference, and error estimation are core to both understanding ML algorithms and assessing their performance." ,
  
      realWorldApplications: [
        "Interpreting model uncertainty and confidence in predictions",
        "Designing and evaluating experiments (e.g., A/B tests) to validate ML models",
        "Using probability to estimate likelihoods in classification and generative modeling",
        "Quantifying model performance and reliability with statistical tests",
        "Estimating parameters (e.g., maximum likelihood) for probabilistic models",
        "Assessing bias/variance trade-offs and overfitting via confidence measures"
      ],
  
      learningOutcomes: [
        "Understand probability principles such as conditional probability and independence",
        "Work with random variables and key distribution functions",
        "Compute descriptive statistics and interpret data summaries",
        "Conduct statistical inference including confidence intervals and hypothesis testing",
        "Apply sampling error and estimation concepts to evaluate model outputs",
        "Use statistical thinking to assess and compare ML models"
      ],
  
      topics: [
        "Probability axioms, random variables, and distributions",
        "Descriptive statistics and data summarization",
        "Sampling distributions, confidence intervals",
        "Hypothesis testing and p-values",
        "Maximum likelihood and parameter estimation",
        "Error analysis and model evaluation"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Gv9_4yMHFhI", // Regression & modeling intro
          "https://www.youtube.com/watch?v=HZGCoVF3YvM", // Bayes theorem & intuition
          "https://www.youtube.com/watch?v=tFWsuO9f74o"  // Confidence intervals explained
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Statistical_inference", // Inference fundamentals
          "https://en.wikipedia.org/wiki/Probability_theory",     // Probability basics
        ],
        tools: [
          "Python (scikit-learn, statsmodels)", // Tools for statistical modeling
          "Jupyter Notebooks",                  // Interactive analysis and testing
        ]
      },
  
      additionalNotes:
        "This course equips students with the statistical tools needed to **model uncertainty**, **validate models**, and make *data-driven decisions* — essential in ML/AI algorithm evaluation and development."
    }
  },
  {
    id: "math-023",
    code: "MATH 023",
    name: "Vector Calculus",
    fullName: "MATH 023: Vector Calculus",
    description: "Gradients, optimization, and multivariable calculus for ML/AI",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Vector Calculus teaches calculus of functions in multiple variables, including gradients and partial derivatives — which underpin optimization methods like gradient descent that are used to train machine learning models. Understanding how variables interact in vector spaces is key to model training, backpropagation in neural networks, and multivariate analysis tasks." ,
  
      realWorldApplications: [
        "Using gradients and partial derivatives in optimization and gradient descent",
        "Evaluating model sensitivity to changes in feature variables",
        "Understanding multivariate functions used in deep learning and neural networks",
        "Applying integrals over regions in continuous models and probability density functions",
        "Analyzing functions that define loss surfaces in training algorithms",
        "Connecting geometric interpretations of vector fields to learning dynamics"
      ],
  
      learningOutcomes: [
        "Manipulate vectors and understand geometric representations of multivariable functions",
        "Compute gradients and directional derivatives for optimization",
        "Evaluate multivariable integrals and understand their applications",
        "Apply vector calculus to analyze change in multiple dimensions",
        "Relate vector calculus concepts to optimization in machine learning",
        "Interpret operations like divergence and curl in geometric/physical contexts"
      ],
  
      topics: [
        "Vector algebra and geometry in multidimensional space",
        "Partial derivatives and gradient vectors",
        "Multiple integrals and coordinate systems",
        "Applications of vector calculus to optimization problems",
        "Theorems of Green, Gauss, and Stokes (conceptual exposure)",
        "Interpreting vector fields and multivariable functions"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=NjhHBFMYcJ4", // Gradient and multivariable calculus concepts
          "https://www.youtube.com/watch?v=Ia9tTHyE5F4", // Partial derivatives explained
          "https://www.youtube.com/watch?v=HWxH0xDBasY"  // Multiple integrals and geometry
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Vector_calculus", // Vector calculus overview
          "https://en.wikipedia.org/wiki/Multi-variable_calculus" // Multivariate calc concepts
        ],
        tools: [
          "Python (SymPy / NumPy)", // Work with gradients & multivariable functions
          "Jupyter Notebooks",      // Interactive exploration
        ]
      },
  
      additionalNotes:
        "According to UC Merced’s course description, Vector Calculus covers calculus on functions of several variables, including vector manipulation, partial derivatives, and multiple integrals — all useful when reasoning about gradients and optimization in ML/AI training."
    }
  },
  {
    id: "math-021-022",
    code: "MATH 021 / 022",
    name: "Calculus I & II (Engineering)",
    fullName: "MATH 021 / 022: Calculus I & II (Engineering)",
    description: "Foundational differential and integral calculus for engineering, optimization, and modeling",
    tier: 1,
    expandedInfo: {
      credits: 8,
  
      careerRelevance:
        "Calculus I and II provide the essential mathematical foundation needed for ML/AI, data science, and engineering careers. These courses teach how to model change, accumulation, and curves — tools that directly support optimization, dynamic systems, model training methods (like gradient descent), and analytical reasoning in complex computational systems. Understanding calculus gives deeper intuition into how machine learning algorithms learn and adapt." ,
  
      realWorldApplications: [
        "Modeling change and growth dynamics in data over time, crucial for time-series analysis and trends",
        "Formulating loss functions and optimization frameworks to train ML models using derivatives and gradients (e.g., gradient descent) ",
        "Solving real-world engineering and physics-based problems with integrals and differential equations",
        "Analyzing rates of change in economic, biological, or system-based processes",
        "Using analytic and numerical integration techniques for modeling accumulated effects",
        "Supporting downstream multivariable calculus and advanced optimization needed for deeper AI/ML understanding"
      ],
  
      learningOutcomes: [
        "Explain limits, continuity, and the derivative as models of instantaneous change",
        "Compute derivatives and integrals of common elementary functions",
        "Use integration techniques to solve area, volume, and accumulation problems",
        "Extend single-variable calculus to series, sequences, and basic differential equations",
        "Apply calculus to optimization problems relevant to algorithm training",
        "Interpret and apply calculus results to model real engineering and scientific systems"
      ],
  
      topics: [
        "Limits and continuity of functions (Calc I)",
        "Derivatives and differentiation rules",
        "Applications of derivatives and optimization",
        "Definite integrals, techniques of integration, and applications (Calc I & II)",
        "Sequences, infinite series, and convergence (Calc II)",
        "Introduction to ordinary differential equations (Calc II) "
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=MDL384gsAk0", // Calculus for Machine Learning & AI context
          "https://www.youtube.com/watch?v=WUvTyaaNkzM", // 3Blue1Brown essence of calculus intro
          "https://www.youtube.com/watch?v=tFWsuO9f74o"  // Confidence intervals & calculus links
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Calculus", // Overview of calculus foundations
          "https://www.coursera.org/learn/machine-learning-calculus", // ML-focused calculus applications
          "https://appliedmath.ucmerced.edu/undergraduate-education/lower-division/courses" // UC Merced math course descriptions
        ],
        tools: [
          "Python (SymPy / NumPy)", // Symbolic and numeric calculus
          "Jupyter Notebooks",      // Explorable math workflows
          "WolframAlpha / Desmos"   // Visualization & problem solving
        ]
      },
  
      additionalNotes:
        "MATH 021 and MATH 022 at UC Merced cover the core calculus sequence for engineering and physical sciences — differential and integral calculus of one variable, analytic and numerical integration techniques, infinite series, and basic differential equations. These are prerequisites for understanding optimization and change dynamics in machine learning and AI modeling."
    }
  },
];

/**
 * 🟡 TIER 2: HIGH-VALUE ML BOOSTERS
 * These courses separate "knows ML" from "understands ML deeply."
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "cse-185",
    code: "CSE 185",
    name: "Computer Vision",
    fullName: "CSE 185: Computer Vision",
    description: "Visual ML systems — image processing, pattern recognition, and scene understanding",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Computer Vision teaches students how machines interpret visual data — a core component of many AI systems, including autonomous vehicles, surveillance, robotics, and medical imaging. The course builds skills in image processing, feature extraction, segmentation, and recognition — essential for *computer vision engineers*, *AI researchers*, and *ML engineers* working with visual data. At UC Merced, CSE 185 covers classical image techniques and pattern recognition fundamentals." ,
  
      realWorldApplications: [
        "Building systems that *detect and recognize objects* in images or video",
        "Designing autonomous vehicle perception pipelines",
        "Implementing face or gesture recognition for human–computer interaction",
        "Analyzing visual data in healthcare imaging (e.g., tumor detection)",
        "Preprocessing visual input for downstream ML tasks (classification, segmentation)",
        "Integrating vision modules with robotics and sensor systems"
      ],
  
      learningOutcomes: [
        "Understand core image processing fundamentals including image formation and filtering",
        "Extract features (edges, corners, textures) for subsequent analysis",
        "Apply segmentation and pattern recognition methods to classify regions or objects",
        "Implement optical flow and 3D stereo techniques for motion and depth estimation",
        "Use model evaluation metrics to assess vision algorithm performance"
      ],
  
      topics: [
        "Image formation and representation",
        "Edge detection and filtering",
        "Image segmentation techniques",
        "Feature detection and description",
        "Optical flow and motion estimation",
        "3D reconstruction and stereo vision"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Z2zmP91DT3E", // Intro to computer vision overview (general CV)
          "https://www.youtube.com/watch?v=0Zzy0-4Pu-4", // Image processing basics
          "https://www.youtube.com/watch?v=ilkeOnTj8RQ"  // Feature detection & matching
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Computer_vision", // Computer vision overview
          "https://en.wikipedia.org/wiki/Image_processing" // Image processing fundamentals
        ],
        tools: [
          "OpenCV (Python/C++)", // Vision library for practical tasks
          "TensorFlow / PyTorch", // Deep learning for vision models
          "MATLAB / NumPy",       // Numerical image processing
          "Jupyter Notebooks"     // Interactive experimentation
        ]
      },
  
      additionalNotes:
        "CSE 185 introduces classic and foundational computer vision techniques such as image formation, edge detection, segmentation, and feature description that underpin modern visual machine learning systems."
    }
  },
  {
    id: "cse-188",
    code: "CSE 188",
    name: "Natural Language Processing",
    fullName: "CSE 188: Natural Language Processing",
    description: "Text & LLM foundations — how machines understand and generate human language",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Natural Language Processing (NLP) explores machine understanding and generation of human language — a key domain in AI powering chatbots, search engines, summarization tools, and language-aware systems. The UC Merced NLP course covers ML techniques for text tasks such as sentiment analysis, entity recognition, and machine translation — foundational for *ML engineers*, *NLP researchers*, and *AI product developers*." ,
  
      realWorldApplications: [
        "Building chatbots and conversational agents",
        "Implementing sentiment analysis for business intelligence",
        "Developing named entity recognition for text analytics",
        "Applying machine translation systems between languages",
        "Leveraging language models (LLMs) for generation and summarization",
        "Designing search and recommendation systems with semantic understanding"
      ],
  
      learningOutcomes: [
        "Understand core NLP problems and techniques such as tokenization and embedding",
        "Apply ML models to classify, tag, and analyze text data",
        "Use language models to generate or predict sequences of text",
        "Evaluate NLP systems with appropriate linguistic and performance metrics",
        "Bridge statistical/ML foundations with linguistic structure understanding"
      ],
  
      topics: [
        "Text preprocessing (tokenization, normalization)",
        "Word and sentence embeddings",
        "Sequence models (e.g., RNNs, transformers)",
        "Sentiment analysis and classification",
        "Named entity recognition and tagging",
        "Language modeling and generation"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=8rXD5-xhemo", // NLP & embedding intro
          "https://www.youtube.com/watch?v=OQQ-W_63UgQ", // Intro to transformers
          "https://www.youtube.com/watch?v=6tNS--WetLI"  // Text preprocessing fundamentals
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Natural_language_processing", // NLP overview
          "https://en.wikipedia.org/wiki/Language_model", // Language model basics
          "https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)" // Transformer architecture
        ],
        tools: [
          "spaCy / NLTK",     // Traditional NLP toolkits
          "Hugging Face Transformers", // Modern LLM frameworks
          "Python (Pandas/NumPy)", // Text data handling
          "Jupyter Notebooks" // Experimentation environment
        ]
      },
  
      additionalNotes:
        "According to UC Merced’s catalog, CSE 188 covers machine learning techniques applied to core NLP tasks such as sentiment analysis, named entity recognition, and machine translation — building essential skills for language-aware AI systems."
    }
  },
  {
    id: "cse-179",
    code: "CSE 179",
    name: "Parallel Computing",
    fullName: "CSE 179: Parallel Computing",
    description: "Performance & training speed — high-performance parallel algorithms and architectures",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Parallel Computing teaches principles of designing and implementing algorithms that run simultaneously on multiple processors, a key skill for accelerating machine learning training and large-scale AI workloads. Today’s ML pipelines often rely on parallelism (multi-core CPUs, GPUs, distributed processing) to reduce training time and improve scalability. This course covers both theoretical and practical aspects of parallel programming." ,
  
      realWorldApplications: [
        "Accelerating machine learning model training using parallel processing",
        "Optimizing data pipelines for multi-core and many-core architectures",
        "Applying parallel algorithms to large matrix computations and simulations",
        "Leveraging GPU and distributed frameworks to scale deep learning workloads",
        "Writing efficient parallel programs using threading and message passing",
        "Understanding trade-offs of parallel execution in performance and complexity"
      ],
  
      learningOutcomes: [
        "Explain the principles of parallel architectures and performance models",
        "Design and analyze parallel algorithms for key computational tasks",
        "Implement parallel algorithms using common paradigms (e.g., MPI, threads)",
        "Evaluate speedup, scalability, and efficiency of parallel programs",
        "Apply parallel computation strategies to machine learning tasks",
        "Understand synchronization, data partitioning, and communication overhead"
      ],
  
      topics: [
        "Parallel architectures and performance models",
        "Data partitioning and task decomposition",
        "Thread-based and message-passing parallelism",
        "Synchronization, race conditions, and mutual exclusion",
        "Parallel matrix operations and numerical methods",
        "Evaluation of speedup and scalability"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=hzvTkmj3KEM", // Intro to parallel computing concepts
          "https://www.youtube.com/watch?v=ev7z8fXktIA", // GPU vs CPU & parallelism fundamentals
          "https://www.youtube.com/watch?v=Zr3bHqLWg4Y"  // Parallel algorithms & performance
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Parallel_computing", // Overview of parallel computing
          "https://en.wikipedia.org/wiki/Message_Passing_Interface", // MPI basics
          "https://www.openmp.org" // OpenMP standard for shared memory parallelism
        ],
        tools: [
          "MPI (Message Passing Interface)",  // Distributed memory parallelism
          "OpenMP / Threads",                // Shared memory parallelism
          "CUDA / GPU frameworks",           // GPU acceleration for ML
          "Parallel profiling tools"          // Performance tuning and analysis
        ]
      },
  
      additionalNotes:
        "CSE 179 introduces parallel computing foundations including architectures, programming methods, and algorithm designs — all crucial for improving training performance and handling large computational problems in ML/AI."
    }
  },
  {
    id: "cse-168",
    code: "CSE 168",
    name: "Distributed Software Systems",
    fullName: "CSE 168: Distributed Software Systems",
    description: "ML at scale — principles and practice of distributed systems",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Distributed Software Systems covers the design, implementation, and evaluation of systems that operate across multiple machines — the foundation for *cloud-scale AI/ML infrastructure*, big data pipelines, and microservices. Distributed computing powers modern ML training clusters, data ingestion systems, and scalable model deployment. Skills from this course are directly applicable to roles like ML Infra Engineer, Backend Engineer, and Systems Architect." ,
  
      realWorldApplications: [
        "Designing distributed pipelines to preprocess and shard large ML datasets",
        "Building scalable model training frameworks (e.g., parameter servers, data parallelism)",
        "Understanding distributed storage systems used in big data environments",
        "Implementing resilient services using replication, consensus, and fault tolerance",
        "Applying RPC/batch/stream processing models to ML workflows",
        "Integrating machine learning systems into cloud platforms and microservices"
      ],
  
      learningOutcomes: [
        "Understand the core principles of distributed systems (consistency, availability, scalability)",
        "Design distributed software that handles communication, replication, and partitioning",
        "Evaluate trade-offs in performance, fault tolerance, and complexity",
        "Apply distributed storage and messaging patterns (e.g., queues, RPCs)",
        "Build resilient services capable of scaling for real-world workloads",
        "Connect distributed systems design with ML infrastructure requirements"
      ],
  
      topics: [
        "Distributed system principles (consistency, fault tolerance)",
        "Communication models (RPC, messaging, streaming)",
        "Replication and partitioning strategies",
        "Distributed storage and indexing",
        "Scalability and performance trade-offs",
        "Cloud computing & ML system integration"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=uk8D3Bri8n4", // Distributed systems fundamentals
          "https://www.youtube.com/watch?v=8hly31xKli0", // Scalability & distributed architecture
          "https://www.youtube.com/watch?v=V0Lh6bEj4GY"  // Distributed storage overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Distributed_computing", // Distributed systems basics
          "https://en.wikipedia.org/wiki/Cloud_computing",      // Cloud infrastructure concepts
          "https://en.wikipedia.org/wiki/Big_data"              // Big data context in distributed systems
        ],
        tools: [
          "Apache Kafka / Pub-Sub systems",   // Streaming and messaging
          "Hadoop / Spark",                   // Distributed data processing
          "Kubernetes / Docker",              // Container orchestration
          "Cloud platforms (AWS/GCP/Azure)"   // Scalable ML deployments
        ]
      },
  
      additionalNotes:
        "CSE 168 explores the foundations of distributed software systems and their practical designs — including consistency, scalability, programming models, and distributed storage — which intersect with modern ML/AI infrastructures that require scale, reliability, and high throughput."
    }
  },
  {
    id: "cse-107",
    code: "CSE 107",
    name: "Digital Image Processing",
    fullName: "CSE 107: Digital Image Processing",
    description: "Signal → ML pipeline — how images are processed and prepared for visual ML systems",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Digital Image Processing teaches foundational methods for analyzing, transforming, and enhancing image data — a key part of any computer vision or visual machine learning workflow. Understanding how raw image signals become features suitable for ML models is critical for roles in computer vision engineering, autonomous systems, medical imaging, and visual analytics. CSE 107 covers image formation, filtering, enhancement, and spatial transformations." ,
  
      realWorldApplications: [
        "Preprocessing images for ML models (denoising, normalization, scaling)",
        "Implementing edge detection and feature extraction for image recognition tasks",
        "Enhancing image quality for medical or satellite imaging systems",
        "Converting raw visual data into usable feature sets for CNNs and vision pipelines",
        "Applying spatial transforms and color space conversions for robust vision systems"
      ],
  
      learningOutcomes: [
        "Explain how digital images are represented as numerical arrays and processed",
        "Apply filtering and enhancement techniques to improve image quality",
        "Implement edge detection, segmentation, and morphological methods",
        "Transform images using spatial and color transforms for feature extraction",
        "Understand how image preprocessing affects downstream ML model performance"
      ],
  
      topics: [
        "Image formation and visual perception basics",
        "Spatial transformations and geometric correction",
        "Filtering and noise reduction techniques",
        "Edge detection and morphological image processing",
        "Color image representations and enhancement"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=u5u_bQ2M8Vs", // Intro to image processing concepts
          "https://www.youtube.com/watch?v=Z2zmP91DT3E", // Basic image operations & filtering
          "https://www.youtube.com/watch?v=MpPcoodJ1tU"  // Edge detection overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Digital_image_processing", // Core DIP overview
          "https://en.wikipedia.org/wiki/Image_filtering",           // Filtering and convolution
          "https://en.wikipedia.org/wiki/Histogram_equalization"     // Histogram techniques
        ],
        tools: [
          "OpenCV (Python/C++)",   // Library for image processing and vision
          "Python (NumPy / SciPy)", // Numerical and array operations
          "MATLAB / Octave",       // Image processing environments
          "Jupyter Notebooks"      // Prototyping and visualization
        ]
      },
  
      additionalNotes:
        "CSE 107 at UC Merced is an upper-division technical elective that covers image formation, enhancement, spatial transformations, and image representation — foundational both for classic image processing and as a preprocessing stage for ML/vision models."
    }
  },
  {
    id: "math-041",
    code: "MATH 041",
    name: "Matrix Analysis for Data Science",
    fullName: "MATH 041: Matrix Analysis for Data Science",
    description: "ML-focused linear algebra — matrices, decompositions, and data transformations",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Matrix Analysis for Data Science focuses on linear algebra concepts tailored to analytics and machine learning, such as matrix operations, factorization, and vector spaces. These ideas are central to feature extraction, dimensionality reduction, and algorithm implementations across ML/AI. Matrix methods underlie principal component analysis, least-squares regression, and many optimization problems." ,
  
      realWorldApplications: [
        "Representing and transforming high-dimensional datasets as matrices for ML algorithms",
        "Applying matrix factorizations (e.g., SVD) in dimensionality reduction and recommender systems",
        "Using linear systems solvers in regression and classification pipelines",
        "Understanding matrix conditioning and its impact on numerical stability",
        "Implementing efficient matrix operations for scalable ML models"
      ],
  
      learningOutcomes: [
        "Manipulate vectors and matrices for data transformation and feature representation",
        "Perform and interpret matrix decompositions such as SVD and eigenanalysis",
        "Apply matrix techniques to dimensionality reduction (e.g., PCA)",
        "Analyze matrix properties and their impact on learning algorithms",
        "Connect linear algebra tools with practical data science and ML workflows"
      ],
  
      topics: [
        "Matrix operations and vector manipulation",
        "Eigenvalues and eigenvectors for data analysis",
        "Singular value decomposition (SVD) and applications",
        "Least squares and linear systems",
        "Diagonalization and matrix factorizations"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNk_zzaMoSs", // 3Blue1Brown Linear Algebra series (vectors/matrices)
          "https://www.youtube.com/watch?v=kjBOesZCoqc", // Linear transformations
          "https://www.youtube.com/watch?v=Z_dEBCp2FAs"  // PCA & eigenvectors (intuition)
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Matrix_(mathematics)", // Matrix fundamentals
          "https://en.wikipedia.org/wiki/Singular_value_decomposition", // SVD overview
          "https://en.wikipedia.org/wiki/Principal_component_analysis" // PCA basics
        ],
        tools: [
          "Python (NumPy / SciPy)", // Matrix operations for ML
          "scikit-learn",          // PCA & decomposition tools
          "Jupyter Notebooks"      // Interactive analysis
        ]
      },
  
      additionalNotes:
        "MATH 041 at UC Merced teaches matrix analysis and linear algebra specifically for data science applications, reinforcing tools used in advanced machine learning methods."
    }
  },
  {
    id: "math-130-131",
    code: "MATH 130 / 131",
    name: "Numerical Analysis / Methods",
    fullName: "MATH 130 / 131: Numerical Analysis / Methods",
    description: "Stability & optimization — numerical techniques for approximate solutions",
    tier: 2,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Numerical Analysis (MATH 130 / 131) introduces computational techniques for solving problems that arise in ML and AI where analytical solutions are infeasible. This includes approximating roots, differential equations, interpolation, and numerical integration — all essential for implementing stable and performant algorithms in large-scale learning systems. Numerical methods are critical when building or tuning optimization routines or simulating systems where exact solutions are unavailable. At UC Merced, MATH 130 emphasizes analysis and implementation of numerical algorithms." ,
  
      realWorldApplications: [
        "Approximating solutions for nonlinear equations used in optimization tasks",
        "Implementing stable numerical differentiation and integration where analytic forms are unavailable",
        "Designing algorithms robust to finite precision and error propagation",
        "Applying interpolation and polynomial approximation in curve fitting and function estimation",
        "Simulating differential equation-based systems (e.g., dynamic models in AI)",
        "Ensuring numerical stability and accuracy in training loops and iterative solvers"
      ],
  
      learningOutcomes: [
        "Understand key numerical methods for solving equations and estimating derivatives",
        "Analyze the stability and error characteristics of numerical algorithms",
        "Implement numerical filtering and approximation techniques",
        "Evaluate the performance trade-offs of different numerical approaches",
        "Apply numerical integration and differentiation in practical tasks",
        "Translate mathematical problems into stable computational routines"
      ],
  
      topics: [
        "Computer arithmetic and floating-point behavior",
        "Root-finding methods (e.g., Newton’s method, bisection)",
        "Interpolation and polynomial approximation",
        "Numerical differentiation and integration",
        "Initial-value problems for ODEs",
        "Error analysis and stability considerations in algorithms"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=hsS9pjs4n5w", // Numerical methods & root finding
          "https://www.youtube.com/watch?v=MKQ2vOKefYc", // Interpolation basics
          "https://www.youtube.com/watch?v=mkfzK_3Au3E"  // Numerical integration overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Numerical_analysis",       // Field overview and key techniques 
          "https://en.wikipedia.org/wiki/Numerical_differentiation" // Method of approximating derivatives 
        ],
        tools: [
          "Python (NumPy / SciPy)",   // Libraries implementing numerical solvers
          "MATLAB / Octave",         // Numerical analysis environment
          "Jupyter Notebooks",       // Interactive algorithm testing
          "Profiling tools"          // Performance & stability evaluation
        ]
      },
  
      additionalNotes:
        "This combined course entry spans both Numerical Analysis and Numerical Methods topics such as precision limits, root-finding, interpolation, and ODE solvers — forming the mathematical and algorithmic basis for robust computation in ML and AI systems."
    }
  },
  {
    id: "math-140",
    code: "MATH 140",
    name: "Optimization Methods",
    fullName: "MATH 140: Optimization Methods",
    description: "Core of model training — mathematical optimization and algorithm design",
    tier: 2,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Optimization Methods provides the theoretical and practical tools for finding the best solutions under constraints — the core of machine learning training. In ML/AI, training a model generally means minimizing a loss function, something optimization courses focus on systematically. UC Merced’s MATH 140 covers topics like linear programming, convex analysis, and nonlinear programming — all relevant to model fitting, regularization, and performance tuning." ,
  
      realWorldApplications: [
        "Training machine learning models by minimizing loss functions (e.g., gradient descent, Newton’s method) ",
        "Solving linear and nonlinear optimization problems in support vector machines and regression",
        "Using convex optimization for algorithm guarantees and structured learning",
        "Applying integer and linear programming to resource allocation in AI systems",
        "Evaluating constraint-satisfaction and feasibility in AI decision systems",
        "Implementing optimization routines in ML libraries (e.g., optimizer backends)"
      ],
  
      learningOutcomes: [
        "Understand the foundations of optimization and problem formulation",
        "Apply linear programming and convex optimization methods",
        "Relate optimization principles to gradient-based and second-order methods",
        "Interpret duality, feasibility, and constraint implications in practical models",
        "Use optimization tools to derive efficient ML training algorithms",
        "Connect theoretical optimization with computational implementations"
      ],
  
      topics: [
        "Linear programming and the simplex method",
        "Convex sets and functions",
        "Nonlinear programming",
        "Duality and optimality conditions",
        "Integer and semidefinite programming",
        "Applications to machine learning training problems"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=bfmFqz5V7hI", // Convex optimization intro
          "https://www.youtube.com/watch?v=2k9u8F4pQ0Y", // Gradient descent & basics
          "https://www.youtube.com/watch?v=aircAruvnKk"  // ML & optimization overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Mathematical_optimization",     // Optimization theory overview
          "https://en.wikipedia.org/wiki/Convex_optimization",           // Convex optimization basics
        ],
        tools: [
          "Python (SciPy optimize / PyTorch optim)", // Optimization toolkits
          "Jupyter Notebooks",                       // Experimentation and comparison
          "CVX/CVXPy",                               // Convex optimization library
          "MATLAB optimization toolbox"              // Algorithm prototyping
        ]
      },
  
      additionalNotes:
        "MATH 140 focuses on optimization methods — the mathematical heart of ML training — including linear and convex programming, duality, and practical algorithm design. These techniques support the derivation and implementation of efficient model training routines."
    }
  },
  {
    id: "math-146",
    code: "MATH 146",
    name: "Numerical Linear Algebra",
    fullName: "MATH 146: Numerical Linear Algebra",
    description: "Large-scale ML — efficient, stable matrix algorithms for real data",
    tier: 2,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Numerical Linear Algebra focuses on matrix factorizations, iterative methods, conditioning, and stability — topics at the heart of efficient ML/AI computations. Large ML models and datasets require numerically stable and computationally efficient matrix routines (e.g., LU/QR/SVD), and understanding these underpins scalable algorithm implementation and performance. Numerical linear algebra bridges theory and practice for real-world matrix computations." ,
  
      realWorldApplications: [
        "Efficiently solving large systems of linear equations (e.g., in training linear models)",
        "Performing matrix factorizations (SVD, QR) used in dimensionality reduction",
        "Improving stability and precision in high-dimensional ML pipelines",
        "Optimizing large-scale computations in deep learning and scientific computing",
        "Applying iterative methods for eigenvalue/eigenvector problems in PCA",
        "Reducing numerical errors when training and evaluating ML models"
      ],
  
      learningOutcomes: [
        "Explain floating-point behavior and numerical stability in matrix algorithms",
        "Perform and interpret LU, QR, and singular value decompositions on real data",
        "Implement iterative solvers for large systems and assess performance",
        "Analyze conditioning and its impact on ML computations",
        "Integrate matrix factorization techniques in machine learning workflows"
      ],
  
      topics: [
        "Floating-point arithmetic & numerical errors",
        "LU / QR decompositions",
        "Singular Value Decomposition (SVD)",
        "Iterative methods for linear systems",
        "Eigenvalue problems and stability",
        "Conditioning and performance in large-scale settings"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNk_zzaMoSs", // Linear algebra foundations
          "https://www.youtube.com/watch?v=kjBOesZCoqc", // Transformations & SVD intuition
          "https://www.youtube.com/watch?v=Z_dEBCp2FAs"  // Eigenvalues & data structures
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Numerical_linear_algebra", // Field overview and applications 
          "https://en.wikipedia.org/wiki/Singular_value_decomposition" // SVD basics
        ],
        tools: [
          "Python (NumPy / SciPy)", // Matrix algorithms and numerical tools
          "Jupyter Notebooks",      // Interactive exploration
          "MATLAB/Octave"           // Numerical experimentation
        ]
      },
  
      additionalNotes:
        "Numerical Linear Algebra teaches algorithms and analyses that ensure matrix operations remain stable and efficient for large-scale problems — a must for ML/AI systems handling vast datasets and high-dimensional features."
    }
  },
  {
    id: "math-180",
    code: "MATH 180",
    name: "Applied Statistics & ML",
    fullName: "MATH 180: Applied Statistics & Machine Learning",
    description: "Industry-aligned analytics — statistical modeling, regression, and predictive systems",
    tier: 2,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Applied Statistics & Machine Learning covers modern statistical methods and ML techniques used to handle high-dimensional data, perform regression and classification, and validate predictive models — exactly the skills needed for industrial ML/AI practice. The course emphasizes computational methods and uncertainty quantification, preparing students for real­world analytics, model tuning, and performance evaluation." ,
  
      realWorldApplications: [
        "Fitting multivariate regression models for predictions",
        "Using cross-validation and bootstrapping to evaluate model quality",
        "Applying classification techniques for supervised learning tasks",
        "Quantifying uncertainty in data and predictions",
        "Reducing dimensionality (e.g., PCA) before ML training",
        "Feature selection and model regularization for robust performance"
      ],
  
      learningOutcomes: [
        "Build and assess multivariate statistical models",
        "Understand and apply resampling techniques such as cross-validation and bootstrapping",
        "Evaluate and compare model performance metrics",
        "Use statistical thinking to interpret ML outcomes",
        "Perform dimensionality reduction on high-dimensional datasets"
      ],
  
      topics: [
        "Multivariate regression & model selection",
        "Cross-validation and overfitting control",
        "Bootstrapping and uncertainty quantification",
        "Principal Component Analysis",
        "Classification methods"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Gv9_4yMHFhI", // Regression & model intros
          "https://www.youtube.com/watch?v=HZGCoVF3YvM", // Bayes & inference intuition
          "https://www.youtube.com/watch?v=Cr6VqTRO1v0"  // ML workflows overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Regression_analysis", // Regression fundamentals
          "https://en.wikipedia.org/wiki/Statistical_inference", // Inference overview
        ],
        tools: [
          "Python (scikit-learn, statsmodels)", // Stats & ML integration
          "Jupyter Notebooks",                // Analysis & visualizations
        ]
      },
  
      additionalNotes:
        "MATH 180 introduces computational statistics and ML tools to address real-world data problems, blending statistical rigor with machine learning practice — crucial for data science, predictive analytics, and ML engineering roles."
    }
  },
  {
    id: "math-280-282",
    code: "MATH 280 / 282",
    name: "Data Science & ML",
    fullName: "MATH 280 / 282: Data Science & Machine Learning",
    description: "Modern ML foundations — probability, inference, supervised and unsupervised learning",
    tier: 2,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "MATH 280 and MATH 282 together provide a comprehensive introduction to foundational statistical and machine learning concepts. These include inference, regression, classification, dimensionality reduction, optimization for ML, and neural methods. This combined foundation equips students with the theory and tools needed before tackling advanced ML/AI modeling tasks and research." ,
  
      realWorldApplications: [
        "Using classification and regression for predictive modeling",
        "Applying clustering and unsupervised methods to discover structure",
        "Incorporating dimensionality reduction for data preprocessing",
        "Evaluating ML systems with appropriate assessment measures",
        "Understanding optimization principles in learning algorithms",
        "Applying neural network basics in exploratory ML workflows"
      ],
  
      learningOutcomes: [
        "Understand foundational ML paradigms such as supervised and unsupervised learning",
        "Perform dimensionality reduction and analysis techniques",
        "Optimize models using core algorithmic methods",
        "Apply statistical inference in ML assessments",
        "Compare and evaluate different ML approaches"
      ],
  
      topics: [
        "Probability & inference foundations (MATH 280)",
        "Supervised & unsupervised learning paradigms (MATH 282)",
        "Clustering & classification",
        "Dimensionality reduction methods",
        "Model evaluation & optimization"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=aircAruvnKk", // ML basics overview
          "https://www.youtube.com/watch?v=Cr6VqTRO1v0", // ML workflows explained
          "https://www.youtube.com/watch?v=Es1nR_k_Cvo"  // Decision trees & ensembles intro
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Machine_learning", // ML overview
          "https://en.wikipedia.org/wiki/Statistical_learning", // Statistical learning basics
        ],
        tools: [
          "scikit-learn",            // ML prototyping
          "Python (NumPy / Pandas)", // Data prep
          "Jupyter Notebooks"        // Reproducible ML workflows
        ]
      },
  
      additionalNotes:
        "MATH 280 (foundations) and MATH 282 (statistical and ML focus) together create a deep mathematical and practical base in machine learning and data science concepts — preparing students for advanced models and real-world applications."
    }
  },
];

/**
 * 🟠 TIER 3: RESEARCH / GRAD-LEVEL DEPTH
 * Only recommended for: Grad school, Research, Theory-heavy ML paths, Advanced Mathematics
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "math-101-101h",
    code: "MATH 101 / 101H",
    name: "Real Analysis",
    fullName: "MATH 101 / 101H: Real Analysis",
    description: "Theoretical ML — rigorous foundations of calculus and limits",
    tier: 3,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Real Analysis builds rigorous understanding of limits, continuity, convergence, and function properties — providing the mathematical maturity and proof skills foundational to theoretical machine learning, optimization theory, and the analysis of algorithms. Graduate-level research in ML/AI often leverages real analysis when proving consistency, convergence, or stability of learning algorithms. Real analysis strengthens your ability to *reason about why* algorithms work, not just how to use them.",
  
      realWorldApplications: [
        "Understanding convergence properties of optimization algorithms like gradient descent",
        "Analyzing function spaces that underpin kernel methods and advanced ML models",
        "Reading and developing proofs in theoretical machine learning research",
        "Ensuring correctness in algorithms sensitive to limits or continuity",
        "Connecting calculus foundations with advanced topics in measure theory and probability"
      ],
  
      learningOutcomes: [
        "Master rigorous definitions of limits, continuity, and differentiability",
        "Prove basic theorems about real functions and sequences",
        "Analyze convergence of series and sequences in metric spaces",
        "Develop mathematical maturity useful in theoretical ML reasoning"
      ],
  
      topics: [
        "Metric spaces and sequences",
        "Continuity and uniform continuity",
        "Differentiation and rigorous calculus proofs",
        "Sequence & series convergence",
        "Topology of the real line and completeness"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=zIFehsBHB8o", // Intro to Real Analysis
          "https://www.youtube.com/watch?v=mYvwG9IkKAo", // Convergence & limits
          "https://www.youtube.com/watch?v=w6pGxF3LA6s"  // Continuity & epsilon-delta intuition
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Real_analysis", // Branch of math dealing with real numbers and functions
          "https://en.wikipedia.org/wiki/Limit_of_a_function" // Limits and continuity
        ],
        tools: [
          "LaTeX / Overleaf",   // Proof writing and documentation
          "Jupyter Notebooks",  // Experimental exploration of real analysis concepts
          "Proof assistants (Lean/Coq)" // Optional tools to explore formal proofs
        ]
      },
  
      additionalNotes:
        "Real Analysis is a rigorous, proof-based course emphasizing the foundations of calculus and analysis. Though not directly applied in coding ML systems, it gives *deep theoretical insights* that inform research and advanced ML theory development, especially when grappling with algorithm convergence and stability."
    }
  },
  {
    id: "math-181",
    code: "MATH 181",
    name: "Stochastic Processes",
    fullName: "MATH 181: Stochastic Processes",
    description: "Probabilistic ML — modeling randomness in time and uncertainty",
    tier: 3,
    expandedInfo: {
      credits: 4,
  
      careerRelevance:
        "Stochastic Processes focuses on families of random variables evolving over time — a cornerstone in fields like reinforcement learning, time-series modeling, Markov decision processes, and Bayesian methods. Stochastic reasoning helps in modeling *sequential uncertainty* and probabilistic dynamics, which appear in advanced ML, signal processing, and decision systems. These ideas underpin many generative models and prediction frameworks.",
  
      realWorldApplications: [
        "Modeling sequences and temporal data (e.g., stock prices, sensor outputs)",
        "Markov decision processes and reinforcement learning",
        "Queueing and performance models in distributed computing",
        "Stochastic simulations and Monte Carlo methods",
        "Random fields in spatial ML and imaging"
      ],
  
      learningOutcomes: [
        "Understand the definition and classification of stochastic processes",
        "Apply concepts like Markov chains and Poisson processes",
        "Model random phenomena with continuous and discrete time dynamics",
        "Analyze long-term behavior and steady-state distributions"
      ],
  
      topics: [
        "Markov chains and transition matrices",
        "Random walks and Brownian motion",
        "Poisson processes and exponential distributions",
        "Stationary processes and ergodicity",
        "Applications to decision systems and time-series modeling"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=O1t17RkBqA8", // Intro to stochastic processes
          "https://www.youtube.com/watch?v=0Xc0_O6sFMs", // Markov chains explained
          "https://www.youtube.com/watch?v=eGKIa9nYf6s"  // Brownian motion fundamentals
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Stochastic_process", // Definition and examples
        ],
        tools: [
          "Python (NumPy / SciPy)",         // Simulating random processes
          "Jupyter Notebooks",              // Visualizing stochastic behavior
          "R (markovchain / timeSeries)"   // Stochastic modeling packages
        ]
      },
  
      additionalNotes:
        "Stochastic Processes applies probability theory to evolving random systems — a theoretical backdrop for advanced Bayesian approaches, reinforcement learning, and modeling of uncertainty in sequential data."
    }
  },
  {
    id: "math-150",
    code: "MATH 150",
    name: "Mathematical Modeling",
    fullName: "MATH 150: Mathematical Modeling",
    description: "Scientific ML — models for real systems and predictive frameworks",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Mathematical Modeling develops skills for translating real-world phenomena into mathematical formulations. In ML/AI, modeling complex systems and understanding assumptions behind models (e.g., epidemiological models, dynamical systems) enhances your ability to build predictive frameworks, simulate dynamics, and frame ML problems in scientifically sound ways. Modeling bridges domain knowledge with algorithmic solutions.",
  
      realWorldApplications: [
        "Framing biological, physical, or economic systems as predictive models",
        "Combining ML with domain equations (e.g., physics-informed ML)",
        "Interpreting model limitations and assumptions",
        "Using differential and difference equations in dynamic prediction"
      ],
  
      learningOutcomes: [
        "Convert real problems into mathematical systems",
        "Analyze system behavior using models",
        "Integrate mathematical reasoning with ML frameworks",
        "Evaluate fit and predictive capability of models"
      ],
  
      topics: [
        "Model assumptions and variable identification",
        "Deterministic vs stochastic modeling",
        "Dynamics and differential equation systems",
        "Model validation and refinement"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=22E2hkNWxbs", // Intro to mathematical modeling
          "https://www.youtube.com/watch?v=8v4P8W8Zx9g"  // System behavior visualization
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Mathematical_model", // Overview and examples
        ],
        tools: [
          "Python (SciPy / SimPy)",     // Modeling and simulation
          "Jupyter Notebooks",          // Documenting models
          "MATLAB/Octave"               // Differential equation modeling
        ]
      },
  
      additionalNotes:
        "Mathematical Modeling is ideal for understanding how to frame real systems mathematically, building a bridge from domain problems to ML/AI problem definitions — especially useful in scientific machine learning contexts."
    }
  },
  {
    id: "math-160",
    code: "MATH 160",
    name: "Mathematical Logic",
    fullName: "MATH 160: Mathematical Logic",
    description: "Theory — rigorous reasoning, proofs, and foundations of computation",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Mathematical Logic emphasizes formal reasoning, proof systems, and the structure of mathematical statements — foundational to theoretical computer science, algorithm correctness, formal verification, and reasoning about computation. Logic underlies many AI paradigms (knowledge representation, automated reasoning, constraint solving), and builds the kind of rigorous thinking useful for advanced ML research and AI systems design.",
  
      realWorldApplications: [
        "Formal specification and verification of algorithms",
        "Design of logic-based AI systems and reasoning engines",
        "Understanding foundational limits of computation",
        "Linking logic with symbolic AI and knowledge representation"
      ],
  
      learningOutcomes: [
        "Understand syntax and semantics of logical systems",
        "Construct rigorous proofs and reasoning chains",
        "Analyze models and structures in logic",
        "Apply logical frameworks to computational problems"
      ],
  
      topics: [
        "Propositional and predicate logic",
        "Proof theory and inference rules",
        "Models and satisfiability",
        "Decidability and computability basics"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=6t3t0JJ3_NV8", // Intro to formal logic
          "https://www.youtube.com/watch?v=J9qO8Kf1nOQ", // Proof systems &
          "https://www.youtube.com/watch?v=aK_a2eXgZ4g"  // Predicate logic explained
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Mathematical_logic", // Logic foundations
        ],
        tools: [
          "Proof assistants (Coq/Lean)", // Formal reasoning environments
          "LaTeX / Overleaf"            // Documentation of proofs
        ]
      },
  
      additionalNotes:
        "Mathematical Logic builds formal reasoning and understanding of logical systems — useful background for symbolic AI, automated reasoning, and foundational ML theory."
    }
  },
  {
    id: "math-221-224",
    code: "MATH 221–224",
    name: "Advanced PDEs",
    fullName: "MATH 221–224: Advanced PDEs",
    description: "Physics-based ML — partial differential equations and continuous systems",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advanced PDEs delves into partial differential equations that model physical systems and continuous phenomena. In scientific machine learning — where ML intersects with physical and engineering systems — PDEs are essential (e.g., fluid dynamics, physics-informed neural networks, control systems, and simulation-based learning). This class develops analytical tools that help in modeling and integrating domain knowledge into AI systems.",
  
      realWorldApplications: [
        "Physics-informed neural networks (PINNs) using PDE constraints",
        "Modeling continuous systems (heat/diffusion, wave propagation)",
        "Simulating physical environments for training agents",
        "Integrating domain PDEs into ML loss functions and regularization"
      ],
  
      learningOutcomes: [
        "Solve and analyze linear and nonlinear PDEs",
        "Understand boundary value problems and eigenfunction expansions",
        "Apply separation of variables and transform methods",
        "Link PDE models with ML frameworks for scientific learning"
      ],
  
      topics: [
        "Heat, wave, and Laplace equations",
        "Green’s functions and integral transforms",
        "Nonlinear PDE techniques",
        "Boundary conditions and eigenvalue problems"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=OjDNd_gQ0Qg", // Intro to PDEs
          "https://www.youtube.com/watch?v=Grj6O7E1cEE", // Heat equation basics
          "https://www.youtube.com/watch?v=evANS3D3GfQ"  // Wave equation methods
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Partial_differential_equation", // PDE overview
        ],
        tools: [
          "Python (NumPy/SciPy)",   // Numerical PDE solutions
          "MATLAB/Octave",         // PDE simulation environments
          "Jupyter Notebooks"      // Experimentation and visualization
        ]
      },
  
      additionalNotes:
        "Advanced PDEs builds deep understanding of continuous physical models — crucial for scientific ML, physics-informed learning, and simulation-based AI research where domain equations guide model structure."
    }
  },
];

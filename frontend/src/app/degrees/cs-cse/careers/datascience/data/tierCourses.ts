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
    description: 'Entry point into data science: data acquisition, cleaning, exploration, and analysis mindset',
    tier: 1,
    expandedInfo: {
      credits: 3,
      prerequisites: 'None (introductory course)',
      careerRelevance:
        "This course establishes the foundational skills and mindset needed to think like a data scientist. It covers the full data analytics pipeline — from acquiring data and cleaning messy datasets to exploring and drawing insights that inform decisions. These skills are directly applicable to roles like Data Analyst, Business Intelligence Analyst, and early-stage Data Scientist. :contentReference[oaicite:1]{index=1}",
  
      realWorldApplications: [
        "Gathering and cleaning real-world datasets from sources like APIs, CSVs, and databases",
        "Exploratory data analysis to uncover patterns, trends, and anomalies",
        "Visualizing data to communicate insights using charts and plots",
        "Translating analytical findings into actionable recommendations for business or research",
        "Using tools like Python, R, or Jupyter notebooks for hands-on data work",
        "Understanding ethical implications and responsible use of data"
      ],
  
      learningOutcomes: [
        "Define the data science process and how it’s used to solve real problems",
        "Acquire and clean raw datasets effectively using code and tools",
        "Apply exploratory data analysis (EDA) to reveal structure and insights",
        "Perform basic statistical summaries and visualizations to communicate results",
        "Understand data science workflows and best practices for reproducible analysis",
        "Recognize ethical, privacy, and bias concerns in data work"
      ],
  
      topics: [
        "What is data science and the data science workflow",
        "Data acquisition: CSV files, APIs, and databases",
        "Data cleaning and preprocessing for analysis",
        "Exploratory data analysis (EDA) and visualization",
        "Basic statistics for summarizing data",
        "Tools and environments like Python/R, Jupyter notebooks"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ua-CiDNNj30", // Intro to data science concepts and pipeline
          "https://www.youtube.com/watch?v=6QnyOh2p78A", // Data cleaning overview
          "https://www.youtube.com/watch?v=-ETQ97mXXF0"  // Exploratory data analysis with Python
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Data_science",                      // Definitions & context of the field :contentReference[oaicite:2]{index=2}
          "https://www.coursera.org/specializations/introduction-data-science", // Intro course example and curriculum structure :contentReference[oaicite:3]{index=3}
          "https://datasciencecourse.net/2022/syllabus/"                     // Typical topics & skills learned :contentReference[oaicite:4]{index=4}
        ],
        tools: [
          "Python / R",            // Main languages used in data science
          "Pandas / NumPy",        // Data manipulation libraries
          "Matplotlib / Seaborn",  // Data visualization libraries
          "Jupyter Notebooks"      // Environment for reproducible analysis
        ]
      },
  
      additionalNotes:
        "Introduction to Data Science is an essential first course that teaches how to think about data, how to handle messy real datasets, and how to extract meaningful insights that can guide decisions. It emphasizes both analytical techniques and practical tool usage, preparing students for more advanced work in applied analytics and data modeling. :contentReference[oaicite:5]{index=5}"
    }
  },
  {
    id: 'datascience-dsc-011',
    code: 'DSC 011',
    name: 'Intro Computing & Statistical Programming',
    fullName: 'DSC 011: Intro Computing & Statistical Programming',
    description: 'Foundational programming and statistical computing for data science using Python/R',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'None (intro course)',
      careerRelevance:
        "This course teaches the programming and statistical computing foundation crucial for data science roles. Students learn how to use languages like Python or R to wrangle data, perform statistical analysis, and implement reproducible analyses — skills directly applicable in data analyst and data scientist roles. The course is part of the core data science curriculum at UC Merced and is required for upper-division work.:contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Writing code to import, clean, and transform real datasets",
        "Implementing statistical summaries and visualizations to explore data",
        "Using Python or R to automate repetitive data tasks and generate reproducible outputs",
        "Applying statistical programming skills to real analysis workflows used in industry",
        "Collaborating on data projects with version control and shared notebooks",
        "Bridging computing and statistics to answer analytical questions from data"
      ],
  
      learningOutcomes: [
        "Understand the role of computing in the data science pipeline",
        "Write scripts in Python and/or R to process and analyze datasets",
        "Perform basic statistical analysis using code rather than manual calculation",
        "Create visualizations to summarize and communicate insights",
        "Build reproducible analysis workflows using tools like Jupyter notebooks or R Markdown"
      ],
  
      topics: [
        "Introduction to programming concepts (variables, loops, conditionals)",
        "Data structures in Python/R (vectors, lists/tibbles, data frames)",
        "Statistical functions and summary measures using code",
        "Visualization fundamentals in Python/R (e.g., matplotlib/ggplot2)",
        "Writing reproducible code and literate programming workflows",
        "Basic debugging, error handling, and code organization for data projects"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc", // Python basics for data science
          "https://www.youtube.com/watch?v=F2Xm5dbsrjk", // R programming intro
          "https://www.youtube.com/watch?v=EitU43WpLr4"  // Statistical computing with code
        ],
        websites: [
          "https://en.wikipedia.org/wiki/R_(programming_language)", // R as a statistical tool:contentReference[oaicite:1]{index=1}
          "https://jupyter.org/",                                  // Interactive Python notebooks
          "https://www.python.org/about/gettingstarted/"           // Getting started with Python
        ],
        tools: [
          "Python",           // General purpose language widely used in data science
          "R",                // Statistical computing and visualization
          "Jupyter Notebook", // Interactive workflow for reproducible analysis
          "RStudio",          // IDE for R and statistical projects
          "Pandas / tidyverse" // Data manipulation libraries
        ]
      },
  
      additionalNotes:
        "Intro Computing & Statistical Programming introduces students to the core programming and computational skills used throughout modern data science. Students learn how to use code to perform statistical analysis and build reproducible analytical workflows — bridging computing fundamentals with statistical thinking." 
    }
  },
  {
    id: 'datascience-dsa-001',
    code: 'DSA 001',
    name: 'Foundations of Data Science & Analytics',
    fullName: 'DSA 001: Foundations of Data Science & Analytics',
    description: 'Core data workflows, from collection and integration to visualization and insight communication',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'None (introductory course)',
      careerRelevance:
        "This course provides a structured introduction to the **data analytics pipeline** — teaching how to collect, integrate, and visualize data, explore datasets for insights, and communicate results effectively. It’s foundational for careers like Data Analyst, Business Analyst, and early-stage Data Scientist, as it builds the mindset and skills used in real data workflows. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Identifying, collecting, and integrating useful data from multiple sources",
        "Cleaning and preprocessing raw data for analysis",
        "Exploring data to find patterns, trends, and outliers",
        "Visualizing data for both technical audiences and business stakeholders",
        "Preparing data stories to inform decisions in business, research, or policy",
        "Collaborating on data projects with reproducible workflows"
      ],
  
      learningOutcomes: [
        "Understand the full data analytics pipeline from raw data to insights",
        "Collect and integrate data using basic tools and techniques",
        "Apply common data cleaning and preprocessing methods",
        "Use exploratory analysis and visualization to uncover patterns",
        "Communicate analytical results clearly to a variety of audiences",
        "Develop foundational workflows used in data science projects"
      ],
  
      topics: [
        "Introduction to the data science workflow and analytics lifecycle",
        "Data acquisition and integration from heterogeneous sources",
        "Data cleaning, transformation, and preparation for analysis",
        "Exploratory data analysis (EDA) and identifying key patterns",
        "Foundations of data visualization (charts, plots, dashboards)",
        "Communicating results and actionable data stories"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ua-CiDNNj30", // Intro to data science pipeline
          "https://www.youtube.com/watch?v=6QnyOh2p78A", // Data collection & cleaning concepts
          "https://www.youtube.com/watch?v=-ETQ97mXXF0"  // EDA & visualization fundamentals
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Data_science",       // Data science overview and workflow perspective :contentReference[oaicite:1]{index=1}
          "https://dsa.ucmerced.edu/",                      // UC Merced DSA program context :contentReference[oaicite:2]{index=2}
          "https://www.coursera.org/learn/foundations-of-data-science" // Example foundations syllabus :contentReference[oaicite:3]{index=3}
        ],
        tools: [
          "Python & Pandas",        // Standard data handling
          "R & tidyverse",          // Statistical data workflows
          "Jupyter Notebook / R Markdown", // Reproducible workflows
          "Tableau or Power BI"     // Visualization and dashboards
        ]
      },
  
      additionalNotes:
        "Foundations of Data Science & Analytics teaches the essential end-to-end process for working with data — from ingestion and cleaning to exploration, visualization, and communication of results. It establishes the workflows and analytical thinking used across all subsequent data science courses. :contentReference[oaicite:4]{index=4}"
    }
  },
  {
    id: 'datascience-dsa-002',
    code: 'DSA 002',
    name: 'Thinking Like a Programmer',
    fullName: 'DSA 002: Thinking Like a Programmer',
    description: 'Foundational programming logic and problem-solving skills used throughout data science',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'None (introductory programming/problem-solving course)',
      careerRelevance:
        "Thinking Like a Programmer builds the essential logic, algorithmic reasoning, and structured problem-solving skills needed in data science and analytics. It teaches students how to break down complex problems into manageable steps and express solutions using code — a core capability for data analysts and data scientists alike. It is a required course in the UC Merced Data Science and Analytics curriculum. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Breaking down data processing tasks into logical steps for automation",
        "Designing and implementing efficient code to handle large, real-world datasets",
        "Formulating algorithms to transform, filter, and analyze data",
        "Writing robust, readable code used in data workflows",
        "Debugging and refining analytical programs in Python/R or similar languages",
        "Preparing for technical interviews and real data engineering challenges"
      ],
  
      learningOutcomes: [
        "Develop the ability to think algorithmically about problems and data workflows",
        "Translate logical problem decomposition into executable code",
        "Understand common control structures (loops, conditionals, functions) in programming",
        "Apply structured problem-solving to data manipulation and transformation tasks",
        "Write clean and maintainable code for analytical tasks",
        "Gain confidence in iterative debugging and testing techniques"
      ],
  
      topics: [
        "Algorithmic thinking and problem decomposition",
        "Control flow and basic programming constructs",
        "Functions and modular code design",
        "Data structures relevant to analytics (lists, arrays, dictionaries)",
        "Debugging, testing, and code organization",
        "Performance considerations when writing analytical code"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=8hly31xKli0", // Algorithms & problem solving fundamentals
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc",  // Python fundamentals for problem solving
          "https://www.youtube.com/watch?v=1O0pi3c7d5g"   // Thinking like a programmer concepts
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Algorithmic_thinking", // Concepts behind computational problem solving
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69933", // Official course listing & description :contentReference[oaicite:1]{index=1}
          "https://www.geeksforgeeks.org/fundamentals-of-algorithms/" // Algorithm fundamentals for learners
        ],
        tools: [
          "Python",       // Primary language for analytical programming
          "Jupyter Notebook", // Reproducible coding environment for data tasks
          "VS Code",      // Editor for writing and testing code
          "Debuggers / linters" // Tools for refining code quality
        ]
      },
  
      additionalNotes:
        "Thinking Like a Programmer is less about syntax and more about the ‘mindset’ of decomposing real problems into algorithmic steps that code can solve. This capability is critical in data science because data workflows typically involve transforming messy inputs into actionable outputs using code. :contentReference[oaicite:2]{index=2}"
    }
  },
  {
    id: 'datascience-dsc-100',
    code: 'DSC 100',
    name: 'Advanced Data Science',
    fullName: 'DSC 100: Advanced Data Science',
    description: 'End-to-end data science projects, advanced analytics methods, and real applications',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'DSC 008, DSC 011, DSA 001, and DSA 002 (intro and foundations courses)',
      careerRelevance:
        "Advanced Data Science bridges foundational skills with real-world practice by engaging students in end-to-end data projects that mirror professional data work. This course prepares students for analyst and data scientist roles by sharpening analytical workflows, project design, and real application development. Data science integrates statistics, computing, and visualization to extract insights from complex data. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Designing and executing complete data science pipelines from raw datasets to actionable insights",
        "Applying advanced statistical and machine learning techniques to solve real problems",
        "Visualizing complex data for stakeholders and decision-making",
        "Deploying analytical models in reproducible notebooks and collaborative environments",
        "Evaluating model performance and communicating ethical implications of results",
        "Integrating domain knowledge (e.g., business, health, environment) into analytical solutions"
      ],
  
      learningOutcomes: [
        "Plan and implement an end-to-end data science project using real datasets",
        "Apply advanced exploratory data analysis and feature engineering techniques",
        "Use statistical modeling and machine learning tools to build predictive models",
        "Evaluate model performance and interpret results for non-technical audiences",
        "Demonstrate reproducible workflows with version control and collaborative environments",
        "Integrate ethical data practices, privacy considerations, and bias mitigation"
      ],
  
      topics: [
        "Advanced exploratory data analysis and transformation",
        "Feature engineering and selection strategies",
        "Supervised and unsupervised machine learning methods",
        "Model evaluation and validation techniques",
        "Data visualization for communication and storytelling",
        "Ethical and reproducible data science practices"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ua-CiDNNj30", // Data science pipeline overview
          "https://www.youtube.com/watch?v=F2FmTdLtb_4", // Exploratory data analysis deep dive
          "https://www.youtube.com/watch?v=4vryPwLtjIg"  // Machine learning concepts for analytics
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Data_science",                // Field overview & methods :contentReference[oaicite:1]{index=1}
          "https://www.coursera.org/courses?query=advanced%20data%20science", // Examples of advanced syllabus :contentReference[oaicite:2]{index=2}
          "https://ds100.org/" // Example advanced data course structure :contentReference[oaicite:3]{index=3}
        ],
        tools: [
          "Python (scikit-learn, TensorFlow/PyTorch)", // Advanced analytics & ML
          "Jupyter Notebooks/R Markdown",             // Reproducible workflows
          "Pandas/NumPy",                             // Data wrangling
          "Matplotlib/Seaborn/Tableau"                // Visualization
        ]
      },
  
      additionalNotes:
        "Advanced Data Science is the capstone-style course in the core data science curriculum where students synthesize all previous coursework into professional-style analytical projects. It emphasizes not only analytical skill but also communication, reproducibility, and responsible use of data." 
    }
  },
  // Core Mathematics (Required)
  {
    id: 'datascience-math-032',
    code: 'MATH 032',
    name: 'Probability & Statistics',
    fullName: 'MATH 032: Probability & Statistics',
    description: 'Foundational probability, inference, confidence intervals, and hypothesis testing',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Pre-calculus or equivalent quantitative background',
  
      careerRelevance:
        "Probability & Statistics provides the mathematical foundation for data science by teaching how to model uncertainty, draw inferences from data, and make data-driven decisions. Concepts like random variables, probability distributions, confidence intervals, and hypothesis testing are used in machine learning, A/B testing, survey analysis, and predictive modeling across data roles.",
  
      realWorldApplications: [
        "Using probability to model uncertainty in predictions and outcomes",
        "Building confidence intervals to estimate population parameters from samples",
        "Conducting hypothesis tests to evaluate business experiments (e.g., A/B tests)",
        "Understanding distributions to inform assumptions in ML models",
        "Applying Bayes’ theorem for probabilistic reasoning in data workflows",
        "Interpreting statistical results to guide decisions in analytics"
      ],
  
      learningOutcomes: [
        "Understand basic probability principles including random variables and distributions",
        "Compute and interpret measures of central tendency, variance, and spread",
        "Construct and interpret confidence intervals for population parameters",
        "Perform hypothesis tests and interpret p-values and significance",
        "Apply Bayes’ theorem for updating beliefs with data",
        "Model real-world uncertainty using probability distributions"
      ],
  
      topics: [
        "Probability axioms, conditional probability, independence",
        "Random variables and common distributions (binomial, normal)",
        "Expected value, variance, and standard deviation",
        "Statistical inference: confidence intervals and estimation",
        "Hypothesis testing and p-values",
        "Bayes’ theorem and Bayesian inference"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=HZGCoVF3YvM", // Bayes theorem explained visually — great intuition (3Blue1Brown) :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/playlist?list=PL4cNQ1YkG5WhQGmPnRe4vDUImh_nviriy", // 3Blue1Brown statistics playlist for probability basics :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=tFWsuO9f74o" // Confidence intervals explained (good conceptual video) :contentReference[oaicite:2]{index=2}
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Probability_theory", // Probability foundations
          "https://en.wikipedia.org/wiki/Statistical_inference", // Inference concepts including hypothesis testing and estimation :contentReference[oaicite:3]{index=3}
          "https://en.wikipedia.org/wiki/Bayes%27_theorem" // Bayes’ theorem and conditional probability :contentReference[oaicite:4]{index=4}
        ],
        tools: [
          "R / Python (SciPy, statsmodels)", // Tools for statistical computing
          "Jupyter Notebooks", // Environment for reproducible analysis
          "Excel / Google Sheets", // Simple stats workflows
          "Tableau / Power BI", // Visualizing distributions and summary statistics
        ]
      },
  
      additionalNotes:
        "MATH 032 is the cornerstone of statistical thinking for data science. It equips students with the quantitative tools to model uncertainty, draw conclusions from samples of data, and evaluate evidence using formal inference procedures. Topics like confidence intervals and hypothesis testing are core to analytics and experiment evaluation." 
    }
  },
  {
    id: 'datascience-math-024',
    code: 'MATH 024',
    name: 'Linear Algebra & Differential Equations',
    fullName: 'MATH 024: Linear Algebra & Differential Equations',
    description: 'Core mathematics for data representation, modeling, and transformation using systems of equations and dynamics',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'MATH 022 (Calculus II) or equivalent',
  
      careerRelevance:
        "Linear Algebra & Differential Equations provides mathematical tools that are essential for representing and transforming multidimensional data, solving systems of equations, and modeling dynamic processes — all of which underpin many data science algorithms used in machine learning and optimization. Understanding matrices, vectors, eigenvalues, and linear systems is crucial to techniques like dimensionality reduction and regression, while differential equations help model trends and changes over time in data. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Representing datasets as vectors and matrices to perform transformations and operations used in algorithms. :contentReference[oaicite:1]{index=1}",
        "Using matrix factorizations and eigenvalues for dimensionality reduction (e.g., PCA) in machine learning. :contentReference[oaicite:2]{index=2}",
        "Solving systems of linear equations that arise in regression, optimization, and model fitting. :contentReference[oaicite:3]{index=3}",
        "Modeling dynamic behavior in time-series or continuous phenomena with differential equation techniques. :contentReference[oaicite:4]{index=4}",
        "Understanding vector spaces and transformations to interpret complex analytical algorithms. :contentReference[oaicite:5]{index=5}",
        "Linking algebraic structure with algorithmic workflows in advanced analytics and AI systems. :contentReference[oaicite:6]{index=6}"
      ],
  
      learningOutcomes: [
        "Describe and manipulate vectors, matrices, and linear transformations",
        "Solve systems of linear equations using matrix methods and understand matrix decompositions",
        "Interpret eigenvalues and eigenvectors in the context of data transformations",
        "Apply linear algebra principles to dimensionality reduction and optimization problems",
        "Solve ordinary differential equations and understand their role in modeling dynamic systems",
        "Connect mathematical theory with data science algorithms that rely on linear systems and vector spaces"
      ],
  
      topics: [
        "Systems of linear equations and matrix methods",
        "Vector spaces, bases, and linear independence",
        "Matrix factorizations, eigenvalues, and eigenvectors",
        "Linear transformations and their applications",
        "Ordinary differential equations and solution techniques",
        "Applications of linear algebra and differential equations in data analysis"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNk_zzaMoSs", // Essence of linear algebra (3Blue1Brown playlist) — vectors and spaces
          "https://www.youtube.com/watch?v=kjBOesZCoqc", // 3Blue1Brown linear transformations series
          "https://www.youtube.com/watch?v=Z_dEBCp2FAs"  // Differential Equations beginner introduction
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Linear_algebra", // Linear algebra fundamentals
          "https://en.wikipedia.org/wiki/System_of_linear_equations", // Linear systems and matrices
          "https://en.wikipedia.org/wiki/Differential_equation" // Differential equations overview
        ],
        tools: [
          "Python (NumPy / SciPy)", // Matrix operations, eigenvalues, differential equation solvers
          "Jupyter Notebooks", // Interactive workflows with math and data
          "MATLAB / Octave", // Linear algebra & ODE environments
          "R (Matrix, deSolve packages)" // Analytical computing environment
        ]
      },
  
      additionalNotes:
        "MATH 024 introduces both linear algebra and differential equations — two pillars of the mathematical foundation for data science. Linear algebra gives the language and tools to manipulate and understand structured data as vectors and matrices, which is core to many algorithms in machine learning and statistics. Differential equations equip students to model change and dynamics, which are insightful for time-series analysis and predictive modeling. :contentReference[oaicite:7]{index=7}"
    }
  },
  {
    id: 'datascience-math-021',
    code: 'MATH 021',
    name: 'Calculus I (Engineering)',
    fullName: 'MATH 021: Calculus I (Engineering)',
    description: 'Fundamental differential and integral calculus of one variable — quantitative foundation for analytical thinking',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Pre-calculus or equivalent quantitative skills',
  
      careerRelevance:
        "Calculus I teaches the foundational tools of rate of change and accumulation — concepts used in optimization, growth/decay modeling, and understanding how functions behave. These ideas are directly relevant to *why* many data science algorithms work (e.g., optimization in machine learning) and help students interpret model behavior and trends. Understanding calculus strengthens analytical reasoning used in modeling, statistics, and machine learning. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Modeling rates of change and trends in data time series",
        "Understanding optimization principles like those used in gradient-based learning algorithms in ML (e.g., gradient descent) :contentReference[oaicite:1]{index=1}",
        "Analyzing continuous change and growth/decay processes in real systems",
        "Interpreting slopes and areas under curves in analytics and forecasting",
        "Applying derivative concepts to understand sensitivities and marginal effects",
        "Foundation for advanced numerical methods and mathematical modeling"
      ],
  
      learningOutcomes: [
        "Explain limits, continuity, derivatives, and integrals of functions of one variable",
        "Compute derivatives using rules and apply them to interpret rates of change",
        "Use basic integration to compute areas and accumulated quantities",
        "Apply calculus concepts to solve real-world modeling problems",
        "Connect calculus ideas to optimization and analytical techniques used in ML and analytics"
      ],
  
      topics: [
        "Limits and continuity of functions",
        "Derivatives and interpretation as rates of change",
        "Techniques and rules of differentiation",
        "Applications of derivatives to curve analysis and optimization",
        "Basic integral calculus and areas under curves",
        "Applications of integrals in accumulation and modeling"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=WUvTyaaNkzM", // Essence of Calculus (3Blue1Brown visual intuitive series)
          "https://www.youtube.com/watch?v=Ja4kyD8kh0o", // Derivatives explained conceptually (3Blue1Brown style)
          "https://www.youtube.com/watch?v=5Njl0kWRkO8"  // Integrals & area concepts (3Blue1Brown inspired)
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Calculus",        // Overview of calculus and applications :contentReference[oaicite:2]{index=2}
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68028", // UC Merced MATH021 official description :contentReference[oaicite:3]{index=3}
          "https://medium.com/@rajat01221/calculus-and-algebra-for-data-science-beginner-to-advanced-062018c7f8ad" // Calculus in data science context :contentReference[oaicite:4]{index=4}
        ],
        tools: [
          "Python (SymPy / NumPy)",   // Code for calculus problem exploration
          "Jupyter Notebooks",        // Notebook environment for math + data
          "WolframAlpha / Desmos",    // Visualizing functions and integration
          "Calculus practice platforms" // For drills and conceptual practice
        ]
      },
  
      additionalNotes:
        "MATH 021 at UC Merced is an introduction to differential and integral calculus of functions of one variable, covering topics like exponential and logarithmic functions, derivatives, and integrals with engineering applications. Calculus systems build the analytical intuition used in optimization and modeling across data science and machine learning. :contentReference[oaicite:5]{index=5}"
    }
  },
  {
    id: 'datascience-math-022',
    code: 'MATH 022',
    name: 'Calculus II (Engineering)',
    fullName: 'MATH 022: Calculus II (Engineering)',
    description: 'Advanced integral calculus, sequences & series, and introductory differential equations — quantitative foundation',
    tier: 1,
    expandedInfo: {
      credits: 4,
      prerequisites: 'MATH 021 (Calculus I) or equivalent',
  
      careerRelevance:
        "Calculus II teaches advanced integration techniques, infinite sequences and series, and basic differential equations. These topics deepen understanding of continuous change and approximation, which are foundational tools for analytical modeling, time-series analysis, and the mathematical underpinnings of algorithms used in data science and machine learning. Mastery of these ideas strengthens your ability to reason about change and limits — concepts that appear in optimization, probability approximations, and model behavior estimation. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Using advanced integration methods to solve area, volume, and accumulation problems that model real phenomena",
        "Approximating functions and integrals with series — important in numerical methods and algorithm design",
        "Modeling dynamic systems with differential equations for analytics and forecasting",
        "Understanding convergence of sequences and series, which connects to algorithmic stability and approximation techniques",
        "Applying calculus concepts to interpret trends and model continuous data behaviors",
        "Enhancing mathematical intuition for machine learning optimization and numerical analysis"
      ],
  
      learningOutcomes: [
        "Perform advanced integration techniques (e.g., integration by parts, partial fractions, improper integrals)",
        "Analyze infinite sequences and series for convergence and divergence",
        "Apply power series representations to approximate functions",
        "Solve first-order differential equations for basic dynamic modeling",
        "Connect integral calculus and series approximations to data science problems"
      ],
  
      topics: [
        "Analytical and numerical techniques of integration and their applications",
        "Infinite sequences and series, including tests for convergence",
        "Power series and function approximations",
        "First-order ordinary differential equations",
        "Applications of advanced integration in modeling physical systems",
        "Introduction to approximation methods relevant for numerical analysis and algorithm design"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=9cmXpTaOIDk", // Calculus II review – integration & series overview
          "https://www.youtube.com/watch?v=Qf3v6uR5gRQ", // Series and convergence concept
          "https://www.youtube.com/watch?v=9vKqVkMQHKk"  // Differential equations intro
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Integral_calculus", // Integral calculus fundamentals
          "https://en.wikipedia.org/wiki/Infinite_series",   // Sequences and series overview
          "https://en.wikipedia.org/wiki/Differential_equation" // Differential equations basics
        ],
        tools: [
          "Python (SymPy / SciPy)", // Symbolic integration, series approximations, ODE solving
          "Jupyter Notebooks",      // Interactive modeling and analysis
          "WolframAlpha / Desmos",  // Visualization of integrals, functions, and series
          "Numerical methods libraries" // For approximations and simulation
        ]
      },
  
      additionalNotes:
        "MATH 022 builds on Calculus I by advancing integration techniques, introducing infinite sequences and series, and covering basic ordinary differential equations. These mathematical tools help data science students handle continuous change, approximate difficult functions with series, and better understand the foundations of many analytical and algorithmic methods used in statistical inference and machine learning. :contentReference[oaicite:1]{index=1}"
    }
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
    description: 'SQL, relational models, data modeling, and real dataset workflows',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Intro programming & recommended discrete/math background',
  
      careerRelevance:
        "Database Systems is a cornerstone CS course that teaches how structured data is stored, queried, and managed — skills essential for any data role. Knowledge of SQL, data modeling, and database design is crucial for data engineers, analysts, and scientists because almost all data work starts with extracting and transforming structured data from databases. ([turn0search0], [turn0search5])",
  
      realWorldApplications: [
        "Designing and normalizing relational schemas for scalable systems",
        "Writing efficient SQL queries to retrieve and aggregate real datasets",
        "Understanding indexing, views, and optimization for performance",
        "Integrating database queries into analytical pipelines and dashboards",
        "Applying transaction control and consistency in data systems",
        "Using database engines for secure and reliable data storage"
      ],
  
      learningOutcomes: [
        "Understand relational data models and database design principles",
        "Write and optimize SQL for complex queries over real datasets",
        "Implement data integrity and constraints in schema design",
        "Use indexing and query plans to improve performance",
        "Incorporate database access and queries into analytics workflows",
        "Evaluate trade-offs between different database design choices"
      ],
  
      topics: [
        "Relational model and high-level data modeling",
        "SQL language: SELECTs, joins, aggregates, subqueries",
        "Normalization and schema design",
        "Indexes, views, and query optimization",
        "Transaction processing and ACID properties",
        "Database integration with applications and analytics"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7S_tz1z_5bA", // SQL Tutorial – Full Database Course
          "https://www.youtube.com/watch?v=9Pzj7Aj25lw", // Database design basics
          "https://www.youtube.com/watch?v=HXV3zeQKqGY"  // SQL basics and modeling
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Relational_database", // Relational database overview
          "https://en.wikipedia.org/wiki/SQL",                 // SQL language basics
          "https://www.w3schools.com/sql/"                     // Interactive SQL tutorial
        ],
        tools: [
          "PostgreSQL / MySQL",     // Real relational database engines
          "SQLite",                 // Lightweight local database
          "DBeaver / pgAdmin",      // GUI query tools
          "Python (SQLAlchemy / pandas)" // Code integration
        ]
      },
  
      additionalNotes:
        "CSE 111 covers core database theory and hands-on SQL skills integral to modern data workflows. These are used daily by data professionals to pull data from production systems for cleaning, transformation, and analysis — making this course a high-value booster for data science roles." 
    }
  },
  {
    id: 'datascience-cse-030',
    code: 'CSE 030',
    name: 'Data Structures',
    fullName: 'CSE 030: Data Structures',
    description: 'Efficient data organization, algorithm foundations, and essential computational thinking',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Intro programming (e.g., CSE 024 or equivalent)',
  
      careerRelevance:
        "Data Structures teaches how to organize and access data efficiently — a core skill in data engineering, analytics, and machine learning. Understanding structures like lists, trees, hash tables, and graphs improves your ability to handle large datasets, optimize queries, and write responsive analytical code. These concepts are widely used in backend services, data pipelines, and performance-critical systems. ([turn0search1], [turn0search8])",
  
      realWorldApplications: [
        "Choosing the right data structures for large dataset processing",
        "Implementing search, sort, and traversal algorithms used in analytical pipelines",
        "Optimizing memory usage and performance in data processing code",
        "Applying trees and graphs in complex relationship analyses (e.g., networks)",
        "Understanding hash tables for fast lookup in indexing and ML feature systems",
        "Preparing for technical interviews and system design discussions"
      ],
  
      learningOutcomes: [
        "Describe and use fundamental data structures and their trade-offs",
        "Implement core structures: arrays, lists, stacks, queues, trees, graphs",
        "Analyze time and space complexity of algorithms using Big-O notation",
        "Apply appropriate structures to real data processing and analysis tasks",
        "Understand recursion and its use in algorithm design",
        "Integrate efficient data structures in production and analytics code"
      ],
  
      topics: [
        "Arrays, linked lists, stacks, queues",
        "Trees (binary, balanced), heaps",
        "Hash tables and collision resolution",
        "Graphs and graph traversal algorithms",
        "Recursion and dynamic memory patterns",
        "Time/space complexity and algorithmic analysis"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=bum_19loj9A", // Data Structures Easy to Advanced
          "https://www.youtube.com/watch?v=RBSGKlAvoiM", // Big-O, time complexity explained
          "https://www.youtube.com/watch?v=Hj_v2aOd8GM"  // Trees and graphs intro
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Data_structure", // Overview of common structures
          "https://en.wikipedia.org/wiki/Algorithmic_complexity", // Complexity basics
          "https://www.geeksforgeeks.org/data-structures/" // Tutorials & examples
        ],
        tools: [
          "Python (collections, built-ins)",     // Practical structure usage
          "C++ STL (vectors, maps)",             // Performance tools
          "VS Code / IDEs",                     // Development environments
          "Whiteboard & pseudocode practice"     // Problem solving
        ]
      },
  
      additionalNotes:
        "CSE 030 covers essential data structures and algorithmic foundations that power efficient computing. For data science, these skills enable you to process and manage dataset operations effectively, write better code, and reason about performance in large-scale analytics." 
    }
  },
  {
    id: 'datascience-cse-120',
    code: 'CSE 120',
    name: 'Software Engineering',
    fullName: 'CSE 120: Software Engineering',
    description: 'Turning analysis into tools — collaborative software development with industry-aligned practices',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Fundamental programming courses (e.g., CSE 031 / intro to programming and data structures)',
  
      careerRelevance:
        "Software Engineering teaches structured development processes, team collaboration, and maintainable code practices that help data scientists build reliable, scalable analytical tools, dashboards, and data products. Graduates understand real-world workflows used in data engineering and software teams. ([turn0search0], [turn0search16])",
  
      realWorldApplications: [
        "Working on team software projects using version control (e.g., Git) and modern workflows",
        "Transforming analytical scripts into reusable, testable tools or services",
        "Collaborating with engineers and analysts to deploy data-driven applications",
        "Designing software with maintainability, modularity, and readability for analytics pipelines",
        "Applying industry standard software design methodologies in real products",
        "Managing project scope, timelines, and deliverables like in professional engineering teams"
      ],
  
      learningOutcomes: [
        "Understand software development lifecycle (SDLC) principles and methodologies",
        "Use version control tools and collaborative workflows effectively",
        "Design, implement, test, and debug modular software systems",
        "Practice team communication and collaboration on substantial software projects",
        "Apply software engineering best practices (testing, documentation, modular design)",
        "Build maintainable code and tools that support data workflows"
      ],
  
      topics: [
        "Software requirements, design, and architecture",
        "Version control (Git), branching, and merge workflows",
        "Modular design, testing, and debugging",
        "Collaborative development and team engineering workflows",
        "Documentation and maintainability best practices",
        "Deployment and integration of software with larger systems"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=w4rG5GY9IlA", // Software Engineering overview
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc",  // Coding fundamentals & collaboration
          "https://www.youtube.com/watch?v=RGOj5yH7evk"   // Git & version control basics
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Software_engineering",        // SE fundamentals
          "https://en.wikipedia.org/wiki/Version_control",            // Version control overview
          "https://www.atlassian.com/git/tutorials"                    // Git workflows & tutorials
        ],
        tools: [
          "Git & GitHub",        // Collaboration and versioning
          "VS Code",             // IDE for software development
          "Jira / Trello",        // Project management tools
          "CI/CD platforms (GitHub Actions, Jenkins)" // Automation & testing pipelines
        ]
      },
  
      additionalNotes:
        "UC Merced’s CSE 120 course involves team design projects where students learn modern software engineering techniques used by professionals — a valuable skill set for data scientists who build production-grade analytical tools and systems. ([turn0search0], [turn0search16])"
    }
  },
  {
    id: 'datascience-cse-108',
    code: 'CSE 108',
    name: 'Full Stack Web Development',
    fullName: 'CSE 108: Full Stack Web Development',
    description: 'Web development for dashboards, data products, and interactive interfaces',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Intro programming or equivalent experience',
  
      careerRelevance:
        "Full Stack Web Development teaches both frontend and backend principles — essential when data scientists need to build interactive dashboards, REST APIs, or data products that expose analytical results to users. This course also covers security, scalable system design, and integration with databases. ([turn0search1], [turn0search4])",
  
      realWorldApplications: [
        "Building full stack data dashboards that visualize insights for stakeholders",
        "Creating backend APIs to serve analytical models or prediction services",
        "Understanding web security and authentication for public data products",
        "Using modern web frameworks to bridge data logic with user interfaces",
        "Integrating web apps with databases for real-time data querying",
        "Deploying web services that support data workflows and analytics teams"
      ],
  
      learningOutcomes: [
        "Develop frontend applications using HTML, CSS, and JavaScript frameworks",
        "Design and implement backend services to process and expose data",
        "Apply secure and scalable architecture patterns in web applications",
        "Integrate databases and persistent storage into web systems",
        "Debug and test full stack applications for both functionality and security",
        "Deploy web applications to production environments"
      ],
  
      topics: [
        "Frontend fundamentals (HTML/CSS/JavaScript) and frameworks",
        "Backend programming (e.g., Node.js, Python Flask/Express)",
        "APIs, routing, and communication between client and server",
        "Web security principles and data protection",
        "Database integration and ORM usage",
        "Scalable and maintainable web system design"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=3JluqTojuME", // Full stack web dev overview
          "https://www.youtube.com/watch?v=UB1O30fR-EE", // Frontend basics
          "https://www.youtube.com/watch?v=K6F2h0xDRbI"  // Web security fundamentals
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Web_application",      // Web app basics
          "https://owasp.org/www-project-top-ten/",             // Common web security vulnerabilities
          "https://developer.mozilla.org/en-US/docs/Web/Guide"  // Web development guides
        ],
        tools: [
          "React / Vue / Svelte", // Frontend frameworks
          "Node.js / Express",     // Backend frameworks
          "PostgreSQL / MongoDB", // Databases for backend
          "Postman"                // API testing
        ]
      },
  
      additionalNotes:
        "CSE 108 at UC Merced explores both frontend and backend web technologies, including web security, scalable architectures, frameworks, and databases — skills that empower data scientists to build interactive dashboards and data products and to understand the full lifecycle of data-driven web applications. ([turn0search1], [turn0search4])"
    }
  },
  // Advanced / Applied Math for Data Science
  {
    id: 'datascience-math-041',
    code: 'MATH 041',
    name: 'Linear Algebra for Data Science',
    fullName: 'MATH 041: Linear Algebra for Data Science',
    description: 'Matrix and vector mathematics focused on data representation, transformations, and dimensionality reduction',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Introductory calculus and basic algebra',
  
      careerRelevance:
        "Linear Algebra for Data Science focuses on the matrix and vector mathematics that power core machine learning and analytics workflows. Representing data as vectors and matrices, calculating transformations, and understanding eigenvalues/eigenvectors are foundational for dimensionality reduction, principal component analysis (PCA), and many model training methods used in modern data science and ML roles. Learners gain skills that directly connect mathematical theory with practical data processing and modeling tasks. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Representing high-dimensional dataset features as vectors or matrices for analysis",
        "Applying linear transformations and projections such as PCA for dimensionality reduction",
        "Understanding geometric interpretations of data operations used in ML algorithms",
        "Using matrix operations in optimization problems and model fitting",
        "Applying linear algebra to algorithm internals in clustering and classification",
        "Interpreting eigenvalues and eigenvectors to understand data structure and variance"
      ],
  
      learningOutcomes: [
        "Represent data as vectors and matrices and manipulate them using linear algebra operations",
        "Understand matrix factorization, rank, and the implications of linear transformations",
        "Apply eigenvalues/eigenvectors in dimensionality reduction and feature extraction",
        "Use linear algebra concepts to optimize analytical workflows",
        "Connect linear algebra theory to practical coding examples in ML and data pipelines"
      ],
  
      topics: [
        "Vectors and matrix representations of data",
        "Linear transformations and composition of transformations",
        "Rank, null space, and linear independence",
        "Eigenvalues, eigenvectors, and their data science applications",
        "Dimensionality reduction techniques (e.g., PCA)",
        "Matrix factorizations and numerical considerations"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNk_zzaMoSs", // Essence of linear algebra (vectors & spaces)
          "https://www.youtube.com/watch?v=kjBOesZCoqc", // Linear transformations & visual intuition
          "https://www.youtube.com/watch?v=Z_dEBCp2FAs"  // Eigenvalues & projections
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Matrix_(mathematics)", // Matrix fundamentals in data science :contentReference[oaicite:1]{index=1}
          "https://en.wikipedia.org/wiki/Projection_matrix",     // Projections & regression matrices :contentReference[oaicite:2]{index=2}
          "https://en.wikipedia.org/wiki/Cholesky_decomposition" // Decomposition and numerical stability :contentReference[oaicite:3]{index=3}
        ],
        tools: [
          "Python (NumPy / SciPy)", // Matrix operations and algorithms
          "Jupyter Notebooks",      // Interactive math & visualization
          "Matlab or Octave",       // Numerical work on linear algebra
          "scikit-learn (PCA, decomposition modules)" // Practical ML dimensionality reduction
        ]
      },
  
      additionalNotes:
        "MATH 041 focuses on the parts of linear algebra most immediately useful in data science — representing and transforming multivariate data, understanding the structure of linear systems, and applying these ideas to dimensionality reduction and model foundation. These techniques form the mathematical backbone of principal component analysis and many ML preprocessing steps. :contentReference[oaicite:4]{index=4}"
    }
  },
  {
    id: 'datascience-math-180',
    code: 'MATH 180',
    name: 'Applied Statistics & Machine Learning',
    fullName: 'MATH 180: Applied Statistics & Machine Learning',
    description: 'Statistical inference, data modeling, and introductory machine learning methods',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'MATH 032 (Probability & Statistics) and basic programming',
  
      careerRelevance:
        "Applied Statistics & Machine Learning equips students with the statistical modeling and ML techniques widely used in industry analytics, forecasting, and predictive modeling. Understanding how models are fit, evaluated, and interpreted is essential for mid-level data scientists, ML engineers, and research analysts working on real business or scientific problems. :contentReference[oaicite:5]{index=5}",
  
      realWorldApplications: [
        "Summarizing real datasets with descriptive statistics and visual analytics",
        "Estimating population parameters from sample data using inference",
        "Applying regression models to predict outcomes from features",
        "Using classification algorithms to segment or predict labels",
        "Evaluating model performance using cross-validation and error metrics",
        "Exploring unsupervised learning techniques for clustering and pattern discovery"
      ],
  
      learningOutcomes: [
        "Draw statistical inferences and understand uncertainty quantification",
        "Fit regression and classification models to real data",
        "Evaluate model performance with appropriate metrics",
        "Understand the trade-offs between model complexity and generalization",
        "Implement core ML algorithms for structured and unstructured datasets"
      ],
  
      topics: [
        "Descriptive statistics and probability foundations",
        "Statistical inference, estimation, and hypothesis testing",
        "Regression analysis and predictive modeling",
        "Introductory classification and clustering techniques",
        "Model evaluation metrics and cross-validation",
        "Basic supervised and unsupervised machine learning"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Gv9_4yMHFhI", // Regression & modeling introduction
          "https://www.youtube.com/watch?v=aircAruvnKk", // Intro to machine learning basics
          "https://www.youtube.com/watch?v=Cr6VqTRO1v0"  // ML workflows explained
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Statistical_inference", // Statistical inference overview :contentReference[oaicite:6]{index=6}
          "https://en.wikipedia.org/wiki/Regression_analysis",   // Regression fundamentals
          "https://en.wikipedia.org/wiki/Machine_learning",     // Machine learning overview
        ],
        tools: [
          "Python (scikit-learn, statsmodels)", // Core ML & stats tools
          "Jupyter Notebooks",                   // Workflow for analysis
          "R (caret / mlr)",                     // Alternative stats & ML environment
          "Cross-validation frameworks"          // Evaluate models robustly
        ]
      },
  
      additionalNotes:
        "MATH 180 blends statistical inference with practical machine learning techniques, teaching students how to analyze and model data, derive meaningful predictions, and validate results on new data. This course bridges theory with tools used in applied analytics and predictive modeling. :contentReference[oaicite:7]{index=7}"
    }
  },
  {
    id: 'datascience-math-280',
    code: 'MATH 280',
    name: 'Math & Stats Foundations of Data Science',
    fullName: 'MATH 280: Math & Stats Foundations of Data Science',
    description: 'Core mathematical and statistical theory supporting data science methods and models',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Probability & Statistics and introductory linear algebra',
  
      careerRelevance:
        "Math & Stats Foundations of Data Science deepens the mathematical and statistical understanding underlying most advanced analytics and machine learning algorithms. It covers probability, inference, regression, classification, and dimensionality reduction — foundational theory that helps data scientists build, validate, and interpret models with rigor. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Formulating rigorous statistical models that underpin predictive analytics",
        "Understanding the theory behind classification and regression used in industry forecasting",
        "Applying dimensionality reduction methods (e.g., PCA) to high-dimensional data",
        "Evaluating model assumptions and the impact of statistical variability",
        "Interpreting the mathematical structure of advanced analytical tools",
        "Bridging theory with practice to improve model robustness and reliability"
      ],
  
      learningOutcomes: [
        "Understand mathematical and statistical foundations including core inference methods",
        "Connect statistical theory to classification and regression techniques",
        "Apply dimensionality reduction concepts to simplify complex data",
        "Translate theoretical insights into practical analytic workflows",
        "Evaluate assumptions and limitations of mathematical models used in data science"
      ],
  
      topics: [
        "Probability and statistical inference foundations",
        "Classification and regression theory",
        "Dimensionality reduction and principal component concepts",
        "Parameter estimation and model interpretation",
        "Connections between mathematical theory and algorithmic practice"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Gv9_4yMHFhI", // Regression & modeling introduction
          "https://www.youtube.com/watch?v=HZGCoVF3YvM", // Intuition for Bayes / inference
          "https://www.youtube.com/watch?v=coa1AvJrAdA"  // Machine learning vs statistics overview
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Statistical_inference", // Inference basics
          "https://en.wikipedia.org/wiki/Probability_theory",     // Probability foundations
          "https://en.wikipedia.org/wiki/Regression_analysis"    // Regression fundamentals
        ],
        tools: [
          "Python (statsmodels, scikit-learn)", // Theory to practice translation
          "R (base stats & tidyverse)",          // Statistical modeling
          "Jupyter Notebooks"                    // Reproducible analytic workflows
        ]
      },
  
      additionalNotes:
        "According to UC Merced’s catalog, MATH 280 introduces students to core probability and statistics concepts while connecting them with classification, regression, and dimensionality reduction — a strong theoretical base for data science analysis and machine learning. :contentReference[oaicite:1]{index=1}"
    }
  },
  {
    id: 'datascience-math-282',
    code: 'MATH 282',
    name: 'Statistical & Machine Learning',
    fullName: 'MATH 282: Statistical & Machine Learning',
    description: 'Advanced statistics and introductory machine learning concepts with focus on data modeling',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Math & Stats foundations and basic programming',
  
      careerRelevance:
        "Statistical & Machine Learning bridges advanced statistical methods with practical machine learning techniques. Data scientists use these tools daily to build predictive models and extract actionable insights from large datasets. Topics such as decision trees, random forests, support vector machines, and neural networks equip students with skills used in analytics roles across industries. :contentReference[oaicite:2]{index=2}",
  
      realWorldApplications: [
        "Building and tuning predictive models such as decision trees and ensemble methods",
        "Using classification and regression techniques in business forecasting",
        "Implementing support vector machines for boundary detection tasks",
        "Harnessing early neural network models for pattern recognition",
        "Evaluating and selecting models using performance metrics",
        "Incorporating data preprocessing and feature engineering into ML pipelines"
      ],
  
      learningOutcomes: [
        "Understand foundational concepts in statistical learning and machine learning",
        "Implement core ML algorithms including trees, forests, and SVMs",
        "Apply basic neural network principles to structured data tasks",
        "Evaluate predictive models with relevant performance metrics",
        "Connect statistical assumptions with machine learning outcomes"
      ],
  
      topics: [
        "Data preprocessing and feature engineering",
        "Decision trees and random forests",
        "Support vector machines (SVMs)",
        "Neural network basics",
        "Model assessment and validation",
        "Links between statistics and machine learning methods"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=aircAruvnKk", // ML basics & intuition
          "https://www.youtube.com/watch?v=Cr6VqTRO1v0", // ML workflow explanation
          "https://www.youtube.com/watch?v=Es1nR_k_Cvo"  // Decision trees & ensemble methods
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Statistical_learning",     // Statistical learning overview
          "https://en.wikipedia.org/wiki/Machine_learning",        // ML fundamentals
          "https://en.wikipedia.org/wiki/Support_vector_machine"   // SVM concept basics
        ],
        tools: [
          "scikit-learn", // Core ML library for Python
          "TensorFlow / Keras", // Neural network foundations
          "Jupyter Notebooks", // Reproducible modeling workflows
          "R (caret / mlr)", // Alternative ML environment
        ]
      },
  
      additionalNotes:
        "According to the UC Merced graduate catalog listing for MATH 282, this course covers statistical and machine learning concepts including data processing, decision trees, random forests, support vector machines, and neural networks — forming a bridge between advanced statistics and applied ML practice. :contentReference[oaicite:3]{index=3}"
    }
  },
  {
    id: 'datascience-math-150',
    code: 'MATH 150',
    name: 'Mathematical Modeling',
    fullName: 'MATH 150: Mathematical Modeling',
    description: 'Real-world problem framing through constructing and analyzing mathematical models',
    tier: 2,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Introductory calculus or quantitative foundation',
  
      careerRelevance:
        "Mathematical Modeling teaches how to construct, analyze, and apply mathematical representations of real systems — a critical skill when framing and solving complex problems in data science, analytics, simulation, and optimization. In data science, modeling helps translate real-world situations (e.g., customer behavior, biological systems, or market trends) into mathematical formulations that can be analyzed and solved. This course builds the theoretical foundation necessary to bridge mathematics and practical data-driven decision-making. ([turn0search1], [turn0search3])",
  
      realWorldApplications: [
        "Translating real world questions into mathematical models that describe systems and behaviors",
        "Using models to simulate and predict trends in business, economics, natural sciences, and engineering",
        "Evaluating assumptions, validity, and limitations of a model before applying it to data analytics",
        "Incorporating stochastic and deterministic components into predictive systems",
        "Using optimization and modeling to improve decision-making processes in data science workflows",
        "Connecting mathematical representations with data fitting and interpretation"
      ],
  
      learningOutcomes: [
        "Construct mathematical models based on real problems and identify relevant variables",
        "Analyze model behavior to draw insights about outcomes, sensitivities, and dependencies",
        "Translate complex systems into solvable equations that can inform data-driven decisions",
        "Evaluate the strengths and limitations of different modeling approaches",
        "Apply mathematical reasoning to interpret model predictions and communicate results"
      ],
  
      topics: [
        "Introduction to mathematical modelling methods and frameworks",
        "Defining variables, assumptions, and model structure for real systems",
        "Deterministic versus stochastic modeling",
        "Model analysis and interpretation of results",
        "Applications in economics, biology, engineering, and data-driven inference",
        "Validation and refinement of models with data"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=22E2hkNWxbs", // Intro to mathematical modelling concepts and process
          "https://www.youtube.com/watch?v=FeiANyW2hMw", // Essentials of math modeling process (SIAM)
          "https://www.youtube.com/watch?v=8v4P8W8Zx9g"  // Modeling example: simple systems and predictions
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Mathematical_model", // Mathematical modeling overview and key concepts :contentReference[oaicite:0]{index=0}
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68048", // Official UC Merced course description :contentReference[oaicite:1]{index=1}
          "https://en.wikipedia.org/wiki/Model_(mathematics)", // Conceptual view of models across disciplines :contentReference[oaicite:2]{index=2}
        ],
        tools: [
          "Python (NumPy / SciPy)", // Numerical modeling and analysis
          "Matlab / Octave",        // Mathematical modeling environment
          "Jupyter Notebooks",      // Documentation & reproducible model workflows
          "Simulation libraries (SimPy, PyMC3)" // Stochastic modeling tools
        ]
      },
  
      additionalNotes:
        "MATH 150 at UC Merced introduces students to mathematical modelling — the art and science of translating real-world situations into mathematical expressions and systems. This includes identifying variables, making assumptions, building model equations, and analyzing their implications. Model development and analysis are central to data science problem framing and interpretation. ([turn0search1], [turn0search3])"
    }
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
    description: 'Applied machine learning and natural language processing for text-heavy data',
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: 'MATH 032 (Probability & Statistics), basic programming, and introductory data science coursework',
      careerRelevance:
        "Machine Learning & NLP introduces students to both core machine learning methods and the specialized area of natural language processing — a key skill set for data scientists who work with unstructured text data, such as social media, customer reviews, or documents. NLP and ML skills are essential for roles in predictive analytics, data science research, and AI-assisted applications. ([catalog.ucmerced.edu](https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=79532&utm_source=chatgpt.com))",
  
      realWorldApplications: [
        "Using supervised learning models to classify text (e.g., sentiment analysis)",
        "Building NLP pipelines to extract insights from large corpora of documents",
        "Clustering and topic modeling for discovery tasks on text datasets",
        "Feature engineering for unstructured data using tokenization and embeddings",
        "Integrating ML/NLP models into production analytics workflows",
        "Evaluating model performance with metrics tailored to classification and language tasks"
      ],
  
      learningOutcomes: [
        "Understand core machine learning concepts including supervised and unsupervised learning",
        "Apply Natural Language Processing techniques to process and analyze text data",
        "Evaluate model accuracy and interpret results in context of data objectives",
        "Use feature extraction and representation methods for text (e.g., embeddings)",
        "Connect ML/NLP outputs to real-world decision support and data products"
      ],
  
      topics: [
        "Supervised learning methods (classification, regression)",
        "Unsupervised learning (clustering, dimensionality reduction)",
        "NLP fundamentals: tokenization, embeddings, language models",
        "Evaluation metrics for classification and text models",
        "Feature engineering for structured and unstructured data",
        "Model selection and cross-validation"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=aircAruvnKk", // Intro to ML basics (supervised/unsupervised) :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/watch?v=Cr6VqTRO1v0", // ML workflows explained :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=DyZ2BF54a8Q"  // NLP introduction (text processing fundamentals)
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Machine_learning", // ML overview :contentReference[oaicite:2]{index=2}
          "https://en.wikipedia.org/wiki/Natural_language_processing" // NLP basics
        ],
        tools: [
          "scikit-learn",    // Standard ML toolkit
          "TensorFlow / PyTorch", // Deep learning libraries
          "NLTK / spaCy",    // NLP frameworks
          "Jupyter Notebooks" // Reproducible experimentation
        ]
      },
  
      additionalNotes:
        "DSA 101 blends traditional machine learning with natural language processing — equipping students to handle unstructured text data and build predictive models common in advanced data science roles." 
    }
  },
  {
    id: 'datascience-cse-176',
    code: 'CSE 176',
    name: 'Machine Learning',
    fullName: 'CSE 176: Machine Learning',
    description: 'Core machine learning principles, models, and evaluation techniques',
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Probability & Statistics, Linear Algebra, and basic programming',
      careerRelevance:
        "CSE 176 introduces undergraduates to fundamental concepts and techniques in machine learning, including both supervised and unsupervised methods — preparing students for advanced analytics, predictive modeling, and ML engineering tasks. This course is widely used as a foundation for careers in data science, AI engineering, and analytics research. :contentReference[oaicite:3]{index=3}",
  
      realWorldApplications: [
        "Building classification and regression models for predictive analytics",
        "Applying clustering and dimensionality reduction to explore complex data",
        "Understanding model tuning and performance evaluation",
        "Integrating ML models into data pipelines and applications",
        "Exploring probabilistic approaches for inference tasks"
      ],
  
      learningOutcomes: [
        "Understand supervised vs. unsupervised learning paradigms",
        "Implement and evaluate classifiers and regressors",
        "Apply clustering and dimensionality reduction techniques",
        "Measure model performance with appropriate metrics",
        "Explain foundational ML algorithms and their strengths/trade-offs"
      ],
  
      topics: [
        "Classification (e.g., decision trees, logistic regression)",
        "Regression analysis and model fitting",
        "Unsupervised learning (clustering, density estimation)",
        "Dimensionality reduction (PCA, LDA)",
        "Model selection, cross-validation, and evaluation"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=C99Z5vJdAyE", // ML fundamentals overview :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/watch?v=aircAruvnKk", // Supervised/Unsupervised ML :contentReference[oaicite:5]{index=5}
          "https://www.youtube.com/watch?v=Cr6VqTRO1v0"  // ML workflow explanation :contentReference[oaicite:6]{index=6}
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Machine_learning", // Machine learning overview :contentReference[oaicite:7]{index=7}
          "https://scikit-learn.org/stable/tutorial/basic/tutorial.html" // Practical ML guide
        ],
        tools: [
          "scikit-learn", // Core library for ML prototyping
          "TensorFlow / Keras", // Neural network modeling
          "Jupyter Notebooks", // Experiment environments
          "Pandas / NumPy" // Data preprocessing
        ]
      },
  
      additionalNotes:
        "CSE 176 covers both classic algorithms and practical modeling techniques — serving as a key bridging course for students moving from analytics into ML-centered roles or advanced studies." 
    }
  },
  {
    id: 'datascience-cse-175',
    code: 'CSE 175',
    name: 'Artificial Intelligence',
    fullName: 'CSE 175: Artificial Intelligence',
    description: 'Foundations of AI: search, reasoning, learning, and intelligent systems',
    tier: 3,
    expandedInfo: {
      credits: 4,
      prerequisites: 'Intro to Algorithms/Programming and basic probability/statistics',
      careerRelevance:
        "Artificial Intelligence provides broad foundational understanding of AI principles, including search, reasoning, knowledge representation, and learning methods. These concepts are relevant for students aiming at ML-heavy roles, intelligent system design, and cutting-edge analytics that combine reasoning with learning. :contentReference[oaicite:8]{index=8}",
  
      realWorldApplications: [
        "Implementing intelligent agents and decision systems",
        "Using search and planning methods in optimization tasks",
        "Integrating reasoning with predictive models",
        "Exploring knowledge representation schemes for complex decision logic",
        "Bridging symbolic AI and statistical learning approaches"
      ],
  
      learningOutcomes: [
        "Understand core AI paradigms such as search and planning",
        "Apply knowledge representation to model complex domains",
        "Use heuristic methods for problem solving",
        "Explore integration points between reasoning and learning systems"
      ],
  
      topics: [
        "Search algorithms and heuristics",
        "Knowledge representation and logic",
        "Planning and decision making",
        "Introduction to reasoning under uncertainty",
        "Overview of learning methods in intelligent systems"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=0oyDqO8PjIg", // AI foundations intro :contentReference[oaicite:9]{index=9}
          "https://www.youtube.com/watch?v=jxjUCoieW4A", // Search algorithms basics
          "https://www.youtube.com/watch?v=AircAruvnKk"  // ML overview connections :contentReference[oaicite:10]{index=10}
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Artificial_intelligence", // AI overview
          "https://en.wikipedia.org/wiki/Search_algorithm"         // Core AI topic
        ],
        tools: [
          "Python (AI/ML libraries)", // Implementation environment
          "OpenAI Gym",               // RL & agent experiments
          "Prolog (logic AI examples)" // Knowledge representation exercises
        ]
      },
  
      additionalNotes:
        "CSE 175 introduces the intellectual foundations of AI — useful for students who want a broader view of intelligent systems beyond just predictive modeling." 
    }
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
    description: 'Bias, fairness, privacy, and accountability in data science — how data and data-driven algorithms impact people and policy',
    tier: 4,
    expandedInfo: {
      credits: 3,
      prerequisites: 'Introductory data science or analytics course recommended',
      
      careerRelevance:
        "Ethics in Data Science teaches foundational principles for responsible and ethical practices throughout the data lifecycle. Data scientists must understand the societal consequences of their work — including bias, fairness, privacy, transparency, and accountability — to build trustworthy models and systems that respect individual rights and social norms. This course prepares students for roles where ethical decision-making and ethical design are as important as technical skills. :contentReference[oaicite:0]{index=0}",
  
      realWorldApplications: [
        "Analyzing the ethical implications of data collection and usage policies",
        "Identifying and mitigating algorithmic bias to prevent unfair outcomes",
        "Designing data systems with privacy-preserving principles",
        "Communicating ethical considerations in analytics and model deployment",
        "Evaluating cases of ethical failure in tech (e.g., biased hiring models or privacy breaches)",
        "Ensuring compliance with legal frameworks and industry standards for data use"
      ],
  
      learningOutcomes: [
        "Understand core ethical principles in data science including fairness, justice, transparency, and accountability",
        "Recognize common ethical challenges such as bias in data and algorithmic decision-making",
        "Evaluate data science methods for potential harms and societal impact",
        "Apply ethical frameworks to guide responsible design and analysis decisions",
        "Communicate ethical reasoning and defend ethical choices in data projects",
        "Explore legal and regulatory contexts related to ethical data practices"
      ],
  
      topics: [
        "Ethical frameworks and principles in data science (fairness, justice, non-maleficence)",
        "Algorithmic bias, discrimination, and fairness metrics",
        "Privacy and data protection (informed consent, anonymization, GDPR/CCPA)",
        "Transparency and explainability in analytical models",
        "Accountability and governance of data systems",
        "Case studies in ethics failures and ethical decision-making processes"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=mA4gypAiRYU", // Crash course in Data Science ethics basics :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=Gv9_4yMHFhI", // Regression & modeling intro (context for bias) :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/watch?v=Ja4kyD8kh0o"  // Concepts of fairness in algorithmic decisions :contentReference[oaicite:3]{index=3}
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=79650", // Official course description :contentReference[oaicite:4]{index=4}
          "https://en.wikipedia.org/wiki/Algorithmic_accountability",               // Principles of accountability in algorithms :contentReference[oaicite:5]{index=5}
          "https://en.wikipedia.org/wiki/Trustworthy_AI"                             // Concepts of trustworthy AI: fairness, explainability, privacy :contentReference[oaicite:6]{index=6}
        ],
        tools: [
          "Jupyter Notebooks",        // Document ethical exploration and analysis
          "scikit-learn fairness tools", // Tools to measure and mitigate bias
          "Python (privacy libraries)", // Libraries for differential privacy simulations
          "Case study repositories"    // Access real ethical case studies
        ]
      },
  
      additionalNotes:
        "According to UC Merced’s catalog, this course educates students on how data and data-driven algorithms influence the world and empowers them to recognize and address bias, fairness issues, privacy risks, and accountability challenges. Ethical reasoning is integral to responsible data science practice. :contentReference[oaicite:7]{index=7}"
    }
  },
];

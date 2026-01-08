/**
 * Data Analyst (Generalist) - Tier Course Data
 * Career Path: Data Analyst, Business Intelligence Analyst, Data Scientist
 */

import { TierCourse } from '@/types/careerPath';

/**
 * TIER 1 — MUST-TAKE for Data Analytics (High-ROI)
 * These courses are foundational for any Data Analytics career.
 * Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites early on before graduation.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "data-analyst-psy-010",
    code: "PSY 010",
    name: "Analysis of Psych Data",
    fullName: "PSY 010: Analysis of Psychological Data",
    description: "The quantitative backbone for Cog Sci; covers experimental/correlational research design plus descriptive and inferential statistics used to interpret behavioral data.",
    tier: 1,
    expandedInfo: {
      credits: 5,
      careerRelevance:
        "This course builds the statistical reasoning you’ll use constantly as a data analyst: designing studies, testing hypotheses, and interpreting results responsibly. It trains you to connect data to claims without overreaching—crucial for business, product, and research analytics.",
      realWorldApplications: [
        "Evaluating A/B test results and determining whether changes are meaningful",
        "Analyzing survey/behavioral datasets and summarizing evidence for a conclusion",
        "Choosing appropriate statistical methods to compare groups or relationships",
        "Writing clear results summaries for non-technical stakeholders"
      ],
      learningOutcomes: [
        "Explain experimental vs correlational designs and what conclusions each supports",
        "Compute and interpret descriptive statistics and basic visual summaries",
        "Apply core inferential-statistics ideas (hypothesis testing, uncertainty) to answer questions",
        "Interpret statistical results and communicate conclusions clearly and ethically",
        "Identify common pitfalls (confounds, misleading significance claims) when interpreting data"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@statquest",
          "https://www.youtube.com/@KhanAcademy",
          "https://www.youtube.com/@crashcourse"
        ],
        websites: [
          "https://www.openintro.org/book/os/",
          "https://seeing-theory.brown.edu/",
          "https://r4ds.had.co.nz/"
        ],
        tools: [
          "Excel / Google Sheets",
          "R (RStudio)",
          "SPSS or jamovi"
        ]
      }
    }
  },
  {
    id: "data-analyst-mist-060",
    code: "MIST 060",
    name: "Intro Data Analytics",
    fullName: "MIST 060: Introductory Data Analytics",
    description: "Practical analytics workflow: data collection, integration, and visualization—reinforced through team exercises using real-world datasets and decision-making cases.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "This course maps directly to day-to-day analyst work: taking messy inputs, cleaning/integrating sources, visualizing patterns, and turning findings into decisions. It’s especially valuable for Cog Sci majors because it emphasizes communicating insights clearly, not just producing charts.",
      realWorldApplications: [
        "Cleaning and combining multiple spreadsheets/exports into a single analysis-ready dataset",
        "Building stakeholder-ready charts and dashboards for reporting",
        "Creating an EDA (exploratory analysis) narrative: what happened, why it matters, what to do next",
        "Collaborating on a team analytics deliverable (roles, iteration, and presentation)"
      ],
      learningOutcomes: [
        "Describe the end-to-end analytics lifecycle from raw data to decisions",
        "Perform data cleaning and basic quality checks to improve reliability",
        "Integrate datasets (joins/merges conceptually) and document assumptions",
        "Choose appropriate visual encodings and design clear charts",
        "Present actionable insights with evidence and limitations"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@AlexTheAnalyst",
          "https://www.youtube.com/@tableau",
          "https://www.youtube.com/@MicrosoftPowerBI"
        ],
        websites: [
          "https://www.data-to-viz.com/",
          "https://support.google.com/looker-studio/",
          "https://learn.microsoft.com/power-bi/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Tableau or Power BI",
          "Looker Studio"
        ]
      }
    }
  },
  {
    id: "data-analyst-cse-111",
    code: "CSE 111",
    name: "Database Systems",
    fullName: "CSE 111: Database Systems",
    description: "The industry standard for data extraction: teaches SQL, relational models, and how real systems store/query data (including performance basics like indexes/views).",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "SQL is one of the most requested hard skills for data analysts because most business data lives in relational databases. This course builds the ability to model data cleanly and write efficient queries (joins, filters, aggregations), while also introducing production concepts like constraints/triggers, indexes/views, and transactions.",
      realWorldApplications: [
        "Writing SQL to pull metrics for dashboards (DAU/WAU, funnel conversion, retention cohorts)",
        "Joining multiple tables (users, events, orders) to build analysis-ready datasets",
        "Designing tables/keys/constraints so data stays consistent and trustworthy",
        "Speeding up slow queries using indexes and understanding why queries are expensive",
        "Supporting analytics workflows tied to web apps and data warehousing"
      ],
      learningOutcomes: [
        "Write SQL queries for filtering, grouping, joining, and summarizing real datasets",
        "Explain relational concepts (tables, keys, constraints) and model data correctly",
        "Design normalized schemas and understand tradeoffs when denormalizing for analytics",
        "Use views/indexes conceptually to reason about query optimization and performance",
        "Understand transactions, consistency, and basic recovery concepts at a high level",
        "Connect databases to analytics pipelines and application-driven data collection"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@freecodecamp/search?query=sql",
          "https://www.youtube.com/@AlexTheAnalyst/search?query=sql",
          "https://www.youtube.com/@CMUDatabaseGroup"
        ],
        websites: [
          "https://sqlbolt.com/",
          "https://sqlzoo.net/",
          "https://mode.com/sql-tutorial/",
          "https://www.postgresql.org/docs/current/tutorial.html"
        ],
        tools: [
          "PostgreSQL",
          "DBeaver",
          "SQLite",
          "DB Browser for SQLite"
        ]
      }
    }
  },
  {
    id: "data-analyst-cogs-105",
    code: "COGS 105",
    name: "Research Methods",
    fullName: "COGS 105: Research Methods for Cognitive Scientists",
    description: "Teaches how to design studies, collect data, analyze results, and present evidence—so you can explain the “why” behind patterns (not just report them).",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Data analysts don’t just compute—they make defensible claims. This course trains you to frame good questions, choose appropriate methods, reduce bias, collect clean data, and communicate results with limitations, which is exactly what you need in product analytics, UX research analytics, and experimentation-heavy roles.",
      realWorldApplications: [
        "Designing an A/B test or observational study to answer a business/product question",
        "Building a survey or interview protocol and turning responses into analyzable data",
        "Identifying confounds and bias before interpreting trends as “causes”",
        "Writing a clear methods + results summary that stakeholders can trust",
        "Planning a study timeline (sampling, measurement, analysis, presentation)"
      ],
      learningOutcomes: [
        "Turn broad problems into testable research questions and measurable variables",
        "Choose between experimental and observational approaches and justify the choice",
        "Design a study plan: sampling, measurement, procedures, and ethics basics",
        "Collect data systematically and document assumptions/limitations",
        "Analyze and present results in a way that supports valid conclusions",
        "Recognize bias/confounds and avoid overclaiming causality"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@statquest",
          "https://www.youtube.com/@BenLambertPhD",
          "https://www.youtube.com/@KhanAcademy"
        ],
        websites: [
          "https://www.osf.io/",
          "https://www.openintro.org/book/os/",
          "https://theeffectbook.net/",
          "https://www.qualtrics.com/experience-management/research/"
        ],
        tools: [
          "Google Forms or Qualtrics",
          "Excel / Google Sheets",
          "R (RStudio) or Python (Jupyter)",
          "jamovi"
        ]
      }
    }
  },
  {
    id: 'data-analyst-bioe-021',
    code: 'BIOE 021',
    name: 'Intro to Python',
    fullName: 'BIOE 021: Introduction to Computing with Python',
    description: 'Essential for automating analysis and handling datasets that exceed spreadsheet limits; builds Python fundamentals through hands-on, lab-based coding.',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'This is your “code unlock” class for analytics: you learn Python well enough to automate repetitive work, clean/transform data reliably, and create reproducible analyses. Even if you later specialize in SQL/BI, Python is what lets you scale beyond manual spreadsheet workflows.',
      realWorldApplications: [
        'Cleaning messy CSV exports (nulls, duplicates, inconsistent categories) using scripts instead of manual edits',
        'Automating weekly reporting (pull → clean → summary → export) with a repeatable pipeline',
        'Running quick analyses on large datasets (filtering, grouping, aggregations) without crashing spreadsheets',
        'Building notebook-based analyses you can rerun and share (reproducible results)'
      ],
      learningOutcomes: [
        'Write Python programs using core control flow (conditions, loops) and functions',
        'Work with common data structures (lists, dictionaries) to transform data',
        'Read/write files (CSV/text) and validate inputs/outputs',
        'Debug code and develop small scripts for real tasks',
        'Translate a real-world question into a step-by-step computational solution'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/@freecodecamp/search?query=python',
          'https://www.youtube.com/@corey_schafer/search?query=python',
          'https://www.youtube.com/@CSDojo/search?query=python'
        ],
        websites: [
          'https://docs.python.org/3/tutorial/',
          'https://automatetheboringstuff.com/',
          'https://www.w3schools.com/python/',
          'https://realpython.com/'
        ],
        tools: [
          'Python',
          'Jupyter Notebook',
          'VS Code'
        ]
      }
    }
  },
  {
    id: 'data-analyst-econ-010',
    code: 'ECON 010',
    name: 'Statistical Inference',
    fullName: 'ECON 010: Statistical Inference',
    description: 'Business- and policy-aligned statistics: research design, sampling, inference, hypothesis testing, and regression with an emphasis on applications.',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'This course trains you to apply statistics the way analysts do in economics/management contexts: define a question, collect/sample data, summarize evidence, test hypotheses, and use regression to explain relationships. It’s a strong foundation for business analytics, finance/consulting-style analysis, and experimentation-heavy roles.',
      realWorldApplications: [
        'Interpreting KPI changes using sampling + inference (what changed vs noise)',
        'Testing claims with hypothesis tests (e.g., whether two groups truly differ)',
        'Building and interpreting regression models for drivers of outcomes (sales, churn, engagement)',
        'Communicating uncertainty and limitations when presenting results to stakeholders'
      ],
      learningOutcomes: [
        'Explain research design concepts including sampling and what makes evidence credible',
        'Compute and interpret descriptive and inferential statistics in applied settings',
        'Run and interpret hypothesis tests (including p-values and confidence intervals)',
        'Build and interpret a linear regression model for real questions',
        'Present statistical conclusions clearly, including assumptions and limitations'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/@statquest',
          'https://www.youtube.com/@KhanAcademy',
          'https://www.youtube.com/@BrandonFoltz/search?query=regression'
        ],
        websites: [
          'https://www.openintro.org/book/os/',
          'https://seeing-theory.brown.edu/',
          'https://r4ds.had.co.nz/'
        ],
        tools: [
          'Excel / Google Sheets',
          'R (RStudio)',
          'Stata (common in econ workflows)'
        ]
      }
    }
  },
];

/**
 * TIER 2 — STRONG ANALYTICS BOOSTERS
 * These courses turn a junior analyst into a senior candidate by adding predictive modeling and complex system visualization.
 */
export const tier2Courses: TierCourse[] = [
  {
    id: 'data-analyst-cogs-104',
    code: 'COGS 104',
    name: 'Complex Systems',
    fullName: 'COGS 104: Complex Adaptive Systems',
    description: 'Trains you to think in systems: how non-linear interactions, feedback loops, and networks create emergent user behavior—useful for growth + ecosystem analysis.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Many product and platform metrics are driven by network effects, feedback loops, and “emergent” behavior (e.g., viral growth, churn cascades, community dynamics). This course builds intuition using dynamical computer simulations and complex-systems concepts so you can reason about why patterns appear—not just that they exist.',
      realWorldApplications: [
        'Platform growth analysis (viral loops, network effects, tipping points)',
        'Social network analysis of communities (influence, diffusion, clustering)',
        'Modeling retention/churn as a dynamic system with feedback',
        'Detecting unintended consequences in policy/product changes (second-order effects)',
        'Scenario simulation for ecosystem changes (e.g., moderation rules, ranking changes)'
      ],
      learningOutcomes: [
        'Explain emergence, sensitivity to initial conditions, and feedback in complex systems',
        'Model and interpret non-linear behavior using simulations',
        'Reason about network structure (nodes/edges, connectivity, diffusion) and what it implies',
        'Translate a real-world system into variables, interactions, and measurable outputs',
        'Communicate system-level insights and limitations clearly (what the model can/can’t claim)'
      ],
      resources: {
        videos: [
          'https://www.complexityexplorer.org/',
          'https://www.youtube.com/@SantaFeInstitute',
          'https://www.youtube.com/results?search_query=network+science+lecture+barabasi'
        ],
        websites: [
          'https://en.wikipedia.org/wiki/Complex_adaptive_system',
          'https://networkx.org/documentation/stable/',
          'https://gephi.org/users/'
        ],
        tools: [
          'Python (NetworkX)',
          'Gephi',
          'NetLogo'
        ]
      }
    }
  },
  {
    id: 'data-analyst-mist-130',
    code: 'MIST 130',
    name: 'Data Analysis in R',
    fullName: 'MIST 130: Statistical Data Analysis and Optimization in R for Decision Support',
    description: 'Applied R for decision-support analytics: analyze + visualize data, model relationships (correlation/regression), run scenario/sensitivity analysis, and learn optimization thinking.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'MIST 130 is a strong Tier-2 signal because it moves you from “basic stats” to doing applied statistical analysis in a real analytics workflow using R. It’s especially useful for research-heavy roles (health/biotech/public policy) where R is common and you need modeling + decision-support framing, not just dashboards.',
      realWorldApplications: [
        'Building reproducible analysis reports in R/RStudio for stakeholders (methods + results + visuals)',
        'Modeling relationships with correlation/regression to explain drivers of an outcome (e.g., adoption, demand, risk)',
        'Running scenario + sensitivity analyses to test how conclusions change under different assumptions',
        'Simulating outcomes to quantify uncertainty and compare strategies',
        'Applying optimization ideas to pick best actions under constraints (budget, capacity, risk tolerance)'
      ],
      learningOutcomes: [
        'Use R to import, clean, transform, and validate datasets for analysis',
        'Create clear visualizations for EDA and storytelling (e.g., ggplot-style thinking)',
        'Fit and interpret basic statistical models (correlation/regression) for decision support',
        'Perform scenario development and sensitivity analysis to evaluate robustness of insights',
        'Understand and apply basic simulation and optimization concepts in an applied context',
        'Communicate results with assumptions, limitations, and recommended actions'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/@RConsortium',
          'https://www.youtube.com/@statquest',
          'https://www.youtube.com/@positpbc'
        ],
        websites: [
          'https://r4ds.hadley.nz/',
          'https://ggplot2.tidyverse.org/',
          'https://dplyr.tidyverse.org/',
          'https://posit.co/resources/cheatsheets/'
        ],
        tools: [
          'R',
          'RStudio (Posit)',
          'tidyverse (dplyr, tidyr, readr)',
          'ggplot2'
        ]
      }
    }
  },
  {
    id: 'data-analyst-dsa-102',
    code: 'DSA 102',
    name: 'Interactive Data Viz',
    fullName: 'DSA 102: Interactive Data Visualization',
    description: 'Turns analysis into impact: learn principled visual encoding + interaction design to build compelling dashboards/visual stories for decision-makers.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Data analysts get promoted by communicating insights clearly—not just computing them. This course builds a principled mental model of visualization design (encoding + perception) and the practical ability to ideate, implement, and evaluate interactive visualizations for analysis and presentation.',
      realWorldApplications: [
        'Designing stakeholder-ready dashboards that reveal trends, drivers, and anomalies',
        'Building interactive drill-down views for product metrics (funnels, cohorts, segmentation)',
        'Creating narrative “data stories” for exec updates (what changed, why it matters, what to do)',
        'Evaluating and improving chart designs to reduce misinterpretation and bias',
        'Communicating complex results (models, uncertainty, tradeoffs) with clear visual encodings'
      ],
      learningOutcomes: [
        'Use visual encoding theory to choose the right chart forms for a question',
        'Apply human perception principles to make visualizations readable and trustworthy',
        'Design interactive visualizations that support exploration and explanation',
        'Implement and iterate on a visualization project from idea → prototype → evaluation',
        'Critique dashboards/visuals and justify design choices in a principled way'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/@UWInteractiveDataLab',
          'https://www.youtube.com/@tableau',
          'https://www.youtube.com/@MicrosoftPowerBI'
        ],
        websites: [
          'https://www.data-to-viz.com/',
          'https://observablehq.com/',
          'https://d3js.org/',
          'https://vega.github.io/vega-lite/'
        ],
        tools: [
          'Tableau',
          'Power BI',
          'Observable',
          'D3.js',
          'Vega-Lite'
        ]
      }
    }
  },
  {
    id: 'data-analyst-econ-110',
    code: 'ECON 110',
    name: 'Econometrics',
    fullName: 'ECON 110: Econometrics',
    description: 'Advanced regression + inference for real-world data—teaches you to estimate relationships, test hypotheses, and critique empirical research like an analyst.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Econometrics is one of the highest-signal courses for analyst roles because it trains you to model relationships with regression and make defensible claims using statistical inference. You also learn to evaluate empirical studies critically—exactly what you need in finance, BI, consulting, and policy analytics.',
      realWorldApplications: [
        'Modeling drivers of an outcome (sales, churn, engagement, wages, prices) using multiple regression',
        'Running and interpreting hypothesis tests and confidence intervals for business/policy questions',
        'Diagnosing model issues (omitted variables, multicollinearity, outliers) before presenting results',
        'Reading empirical research and translating results into actionable takeaways',
        'Forecasting-style thinking (trend + model-based prediction) for planning and decision support'
      ],
      learningOutcomes: [
        'Fit and interpret linear regression models (simple and multiple regression) using real datasets',
        'Use statistical inference to test hypotheses and quantify uncertainty around estimates',
        'Evaluate model assumptions and recognize common threats to validity in observational data',
        'Communicate regression results clearly (effect sizes, interpretation, limitations)',
        'Critically assess empirical papers and explain whether conclusions are supported by the data'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/@statquest',
          'https://www.youtube.com/@BenLambertPhD',
          'https://www.youtube.com/results?search_query=Wooldridge+econometrics+lecture'
        ],
        websites: [
          'https://www.openintro.org/book/os/',
          'https://www.theeffectbook.net/',
          'https://www.coursera.org/learn/erasmus-econometrics',
          'https://www.statsmodels.org/stable/index.html'
        ],
        tools: [
          'R (RStudio)',
          'Stata',
          'Python (pandas + statsmodels)'
        ]
      }
    }
  },
  {
    id: 'data-analyst-cogs-128',
    code: 'COGS 128',
    name: 'Cognitive Engineering',
    fullName: 'COGS 128: Cognitive Engineering',
    description: 'Applies cognitive science to real systems (HCI/HRI) so you can analyze user decision-making data and improve products, workflows, and human-in-the-loop performance.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'COGS 128 is valuable for data analysts working near product/UX, human-in-the-loop systems, or automation because it teaches you how people actually perceive, decide, and act in engineered environments. It complements stats/SQL by improving how you define metrics, interpret behavioral signals, and turn findings into interface/workflow changes—especially in human-computer and human-robot interaction contexts.',
      realWorldApplications: [
        'Defining UX/product success metrics tied to human goals (task success, time-on-task, error rates, cognitive load proxies)',
        'Analyzing interaction data to find friction points (drop-offs, misclicks, repeated actions, confusion loops)',
        'Designing and evaluating interface changes using evidence (before/after comparisons, usability studies + analytics)',
        'Human-in-the-loop performance tuning (operator dashboards, alerts, decision support)',
        'Evaluating emerging interaction modalities (e.g., agents/robots/VR interfaces) with measurable outcomes'
      ],
      learningOutcomes: [
        'Explain core ideas in cognitive engineering and how they apply to system design',
        'Analyze human performance and failure modes in interactive systems',
        'Translate a user/workflow problem into measurable variables and evaluation criteria',
        'Propose design changes grounded in cognitive principles and justify them with data',
        'Communicate findings and recommendations clearly to technical and non-technical stakeholders'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=human+computer+interaction+course',
          'https://www.youtube.com/results?search_query=usability+testing+methods',
          'https://www.youtube.com/results?search_query=human+robot+interaction+lecture'
        ],
        websites: [
          'https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67485',
          'https://www.nngroup.com/articles/ten-usability-heuristics/',
          'https://www.usability.gov/how-to-and-tools/methods/usability-testing.html'
        ],
        tools: [
          'Figma',
          'Google Analytics (or similar product analytics)',
          'Hotjar (or similar session/heatmap tools)',
          'Qualtrics / Google Forms'
        ]
      }
    }
  },
];

/**
 * Export all courses as a flat array for the career path configuration
 */
export const allDataAnalystCourses: TierCourse[] = [
  ...tier1Courses,
  ...tier2Courses,
];

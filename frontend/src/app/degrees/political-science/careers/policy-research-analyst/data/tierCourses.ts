/**
 * Policy / Research Analyst Tier Courses Data
 * Course recommendations organized by tier for Policy / Research Analyst career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Policy / Research Analyst roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "poli-112",
    code: "POLI 112",
    name: "Public Policy: Analysis, Strategy, and Impact",
    fullName: "POLI 112: Public Policy: Analysis, Strategy, and Impact",
    description:
      "Foundational policy-analysis course focused on framing policy problems, evaluating evidence, comparing alternatives, and communicating recommendations with real-world impact.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy Research Analysts must turn messy public problems into structured questions, evaluate evidence, compare policy options, and present clear recommendations. This course builds the end-to-end workflow used in think tanks, government agencies, and consulting: problem definition → analysis → strategy → impact communication.",
      realWorldApplications: [
        "Write a policy memo comparing 2–3 interventions (e.g., housing, public health, education) using explicit evaluation criteria and trade-off analysis",
        "Assess a program’s likely impact using data + research evidence, then communicate findings to decision-makers in a brief or presentation",
        "Develop implementation strategy: stakeholders, constraints, political feasibility, and measurement plans (KPIs/metrics) for a chosen policy",
      ],
      learningOutcomes: [
        "Frame policy problems into researchable questions and define scope, assumptions, and constraints",
        "Gather, assess, and synthesize evidence from credible sources (government reports, peer-reviewed research, datasets)",
        "Construct and compare policy alternatives using clear criteria (equity, cost, feasibility, effectiveness)",
        "Project outcomes, identify trade-offs, and justify recommendations with transparent reasoning",
        "Communicate analysis in professional formats (policy memos/briefs, slide decks, executive summaries)",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=xblEd00hNsI",
          "https://www.youtube.com/watch?v=TU9e82eN_Ro",
          "https://www.youtube.com/watch?v=MmKIVOQbQJc",
          "https://www.youtube.com/watch?v=1JkHaSfEv1Q",
        ],
        websites: [
          "https://www.gao.gov/",
          "https://www.cbo.gov/",
          "https://www.congress.gov/",
          "https://data.worldbank.org/",
          "https://stats.oecd.org/",
        ],
        tools: [
          "Excel / Google Sheets (quick policy modeling)",
          "R (tidyverse) or Python (pandas) for policy data analysis",
          "Tableau or Power BI for policy dashboards",
          "Zotero (research + citation management)",
          "ArcGIS / QGIS (when policy questions are geographic)",
        ],
      },
    },
  },
  {
    id: "poli-174",
    code: "POLI 174",
    name: "Data Science and Government Affairs",
    fullName: "POLI 174: Data Science and Government Affairs",
    description: "Introduction to data science applications in government and policy",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research analysts increasingly work with messy administrative datasets, open-data portals, and performance dashboards. This course builds practical “government data literacy” so you can turn raw public data into findings, visuals, and evidence-based recommendations that agencies and nonprofits can actually use.",
      realWorldApplications: [
        "Build a simple policy dashboard (KPIs + trends) for a city program using open government data",
        "Analyze budget + service-delivery data to identify inequities (e.g., neighborhood-level outcomes) and propose targeted interventions",
        "Use APIs/open-data portals to pull datasets (census, labor, public health) and write a short policy memo with charts + takeaways"
      ],
      learningOutcomes: [
        "Locate, evaluate, and document government/public datasets (quality, bias, missingness, definitions)",
        "Clean and reshape real-world public-sector data for analysis (tidy tables, joins, basic ETL thinking)",
        "Produce policy-ready visuals (clear charts/maps) and communicate results for non-technical decision-makers",
        "Apply basic descriptive/inferential reasoning to policy questions (trends, comparisons, uncertainty)",
        "Recognize common ethics issues in public-sector data (privacy, fairness, transparency, algorithmic accountability)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=GPUaUgjbbsA",
          "https://www.youtube.com/watch?v=w2yYd2ZA8Ks",
          "https://www.youtube.com/watch?v=mKZ27i9vC5c",
          "https://www.youtube.com/watch?v=JqEUtJ6bc9w"
        ],
        websites: [
          "https://data.gov/",
          "https://www.census.gov/data/developers/guidance/api-user-guide.html",
          "https://data.worldbank.org/",
          "https://www.oecd.org/en/data.html",
          "https://dataverse.harvard.edu/"
        ],
        tools: [
          "Python (pandas) or R (tidyverse)",
          "SQL (Postgres basics: SELECT/JOIN/GROUP BY)",
          "Jupyter Notebook or RStudio",
          "Tableau / Power BI / Looker Studio",
          "QGIS (basic mapping) / GeoPandas (optional)",
          "GitHub (versioning + reproducibility)"
        ]
      }
    }
  },
  
  {
    id: "poli-175",
    code: "POLI 175",
    name: "Advanced Analysis of Political Data",
    fullName: "POLI 175: Advanced Analysis of Political Data",
    description: "Advanced techniques for analyzing political and policy data",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research analysts need to move beyond descriptive charts into defensible statistical claims (and know their limits). This course strengthens your ability to model political/policy relationships, test hypotheses, and translate regression output into clear, decision-relevant conclusions.",
      realWorldApplications: [
        "Run a regression-based analysis to test whether a policy change correlates with outcome improvements (with clear controls + limitations)",
        "Analyze turnout, polling, or public opinion survey data and produce an executive summary with interpretable effect sizes",
        "Build a reproducible workflow in statistical software (data cleaning → modeling → tables/figures → memo-ready results)"
      ],
      learningOutcomes: [
        "Explain the logic of social scientific inference (hypotheses, measurement, sampling, uncertainty)",
        "Use statistical software to manage data, generate descriptive statistics, and create publication-ready visuals",
        "Estimate and interpret regression models (including diagnosing assumptions and common pitfalls)",
        "Communicate model results clearly (substantive interpretation, uncertainty, and what you can/can’t claim)",
        "Work with real political datasets and produce a short research-style writeup/policy-facing summary"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=OCaKQ4wEwCU",
          "https://www.youtube.com/watch?v=XqGWYRBE-Og",
          "https://www.youtube.com/watch?v=EkAQAi3a4js"
        ],
        websites: [
          "https://www.icpsr.umich.edu/",
          "https://dataverse.harvard.edu/",
          "https://www.opensecrets.org/",
          "https://www.fec.gov/data/",
          "https://electionlab.mit.edu/data"
        ],
        tools: [
          "Stata (core workflow)",
          "R or Python (optional but powerful for reproducibility)",
          "GitHub (version control + replication)",
          "Excel/Sheets (quick checks, but not the main analysis tool)",
          "Zotero (citation + literature organization)"
        ]
      }
    }
  },
  
  {
    id: "poli-200",
    code: "POLI 200",
    name: "Research Design in Political Science",
    fullName: "POLI 200: Research Design in Political Science",
    description: "Fundamentals of research design and methodology in political science",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research analysts are judged on whether their evidence is credible—not just whether it’s quantitative. This course trains you to design strong tests, reason about causality, and choose appropriate designs (experimental, quasi-experimental, observational) so your evaluations and recommendations hold up under scrutiny.",
      realWorldApplications: [
        "Design a program evaluation plan (outcomes, identification strategy, data needs, threats to validity)",
        "Critique a policy report’s causal claims and propose a stronger design (e.g., diff-in-diff, RDD, natural experiment)",
        "Write a research proposal (question → theory → hypotheses → measurement → design → analysis plan)"
      ],
      learningOutcomes: [
        "Formulate researchable policy questions and falsifiable hypotheses",
        "Identify causal vs. correlational claims and articulate what evidence would support each",
        "Compare major designs (experiments, quasi-experiments, natural experiments, observational strategies) and their tradeoffs",
        "Anticipate threats to validity (selection, measurement error, confounding) and plan mitigation",
        "Translate a design into an analysis plan and policy-facing deliverables (tables/figures/memo structure)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=tUz2yl2QEbY",
          "https://www.youtube.com/watch?v=9QJUvVB4lcI",
          "https://www.youtube.com/watch?v=RVQdi2bMziE"
        ],
        websites: [
          "https://www.socialscienceregistry.org/",
          "https://www.cos.io/initiatives/osf",
          "https://egap.org/",
          "https://scholar.google.com/",
          "https://dataverse.harvard.edu/"
        ],
        tools: [
          "OSF (Open Science Framework) for preregistration + project organization",
          "Qualtrics (survey/experiment implementation)",
          "R or Python (analysis plan execution)",
          "Zotero (literature + citations)",
          "GitHub (reproducible research pipeline)"
        ]
      }
    }
  },
  {
  id: "poli-210",
  code: "POLI 210",
  name: "Quantitative Analysis of Political Data, I",
  fullName: "POLI 210: Quantitative Analysis of Political Data, I",
  description:
    "Core quantitative methods course that builds statistical thinking + hands-on Stata skills for analyzing real political/policy datasets and producing defensible findings.",
  tier: 1,
  expandedInfo: {
    credits: 4,
    careerRelevance:
      "Policy Research Analysts must be able to turn political/policy questions into measurable variables, run correct statistical tests, and explain results clearly to non-technical decision-makers. This course gives you the quantitative foundation (plus Stata workflow) needed for policy memos, program evaluations, and evidence-based recommendations.",
    realWorldApplications: [
      "Clean and analyze survey or administrative data to answer a policy question (e.g., inequality in outcomes across groups/regions)",
      "Run hypothesis tests and basic models to compare policy alternatives (before/after comparisons, group differences, correlations)",
      "Produce a policy-ready results table + chart pack (descriptives, key coefficients, uncertainty) with a short memo summary"
    ],
    learningOutcomes: [
      "Translate political/policy concepts into measurable variables and build a clear analysis plan",
      "Compute and interpret descriptive statistics and uncertainty (standard errors, confidence intervals)",
      "Choose and apply appropriate tests for common policy questions (differences in means/proportions, associations)",
      "Build a reproducible workflow in Stata (import → clean → analyze → export tables/figures)",
      "Communicate results ethically and accurately (limitations, assumptions, and what you can/can’t claim)"
    ],
    resources: {
      videos: [
        "https://www.youtube.com/watch?v=kKFbnEWwa2s",
        "https://www.youtube.com/watch?v=HafqFSB9x70",
        "https://www.youtube.com/watch?v=Wa1Nd9epHmY",
        "https://www.youtube.com/watch?v=-ParNI557HM"
      ],
      websites: [
        "https://www.stata.com/links/video-tutorials/",
        "https://data.gov/",
        "https://www.census.gov/data/developers.html",
        "https://dataverse.harvard.edu/",
        "https://www.icpsr.umich.edu/"
      ],
      tools: [
        "Stata (core analysis workflow)",
        "Excel / Google Sheets (quick checks + simple models)",
        "R or Python (optional reproducible analysis)",
        "Zotero (citations + literature management)",
        "GitHub (version control for analysis scripts)"
      ]
    }
  }
  },
  {
    id: "econ-010",
    code: "ECON 010",
    name: "Statistical Inference",
    fullName: "ECON 010: Statistical Inference",
    description:
      "Foundational statistics + inference course for building evidence-based arguments from data (sampling, hypothesis testing, and regression in applied social-science contexts).",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy Research Analysts rely on inference to separate signal from noise: interpreting samples, testing claims, estimating uncertainty, and explaining what the data actually supports. This course builds the statistical backbone you’ll use constantly when reading policy reports, validating claims, and writing credible recommendations.",
      realWorldApplications: [
        "Design a sampling approach and compute confidence intervals for public opinion or program outcomes",
        "Test whether an observed change is likely real (hypothesis testing) vs random variation",
        "Use a simple regression model to explain outcome differences while accounting for key factors"
      ],
      learningOutcomes: [
        "Understand how sampling and randomness affect conclusions in social-science data",
        "Compute and interpret confidence intervals and p-values (what they mean and common misuses)",
        "Perform hypothesis tests for policy-relevant questions (group comparisons, relationships)",
        "Use and interpret basic linear regression with an emphasis on real applications",
        "Present statistical results clearly and responsibly for a non-technical audience"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=uHUOwZmfUzY",
          "https://www.youtube.com/watch?v=a66tfLdr6oY",
          "https://www.youtube.com/watch?v=l1kLCrxL9Hk",
          "https://www.youtube.com/watch?v=8oNGkvuRP60"
        ],
        websites: [
          "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/",
          "https://dataverse.harvard.edu/",
          "https://data.worldbank.org/",
          "https://stats.oecd.org/",
          "https://fred.stlouisfed.org/"
        ],
        tools: [
          "R (basic stats + visualization)",
          "Python (pandas + scipy/statsmodels)",
          "Excel / Google Sheets (intro-level inference + charts)",
          "Jupyter Notebook or RStudio (reproducible workflow)",
          "Zotero (source tracking + citations)"
        ]
      }
    }
  },
  {
    id: "econ-110",
    code: "ECON 110",
    name: "Econometrics",
    fullName: "ECON 110: Econometrics",
    description:
      "Core econometrics course focused on building and testing empirical models (especially regression) to support credible conclusions in economics and policy analysis.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Econometrics is the main toolkit behind modern policy evaluation: estimating relationships, testing hypotheses, and making careful claims from observational data. For Policy Research Analysts, it’s the difference between ‘this looks correlated’ and ‘here’s the best evidence we have, with uncertainty, and what it implies for decisions.’",
      realWorldApplications: [
        "Estimate the impact of a policy variable on an outcome (e.g., education, labor, health) and interpret effect sizes with uncertainty",
        "Diagnose flawed models (omitted variables, bad comparisons) and improve a study design with better controls and robustness checks",
        "Produce a regression table + short policy brief that explains results in plain language (what changes, by how much, and under what assumptions)"
      ],
      learningOutcomes: [
        "Build and interpret regression models for policy/economic questions (coefficients, fit, uncertainty)",
        "Understand core issues in observation and estimation (measurement, bias, confounding) and how they affect conclusions",
        "Conduct and interpret hypothesis tests within regression models",
        "Evaluate model assumptions and perform basic diagnostics/robustness checks",
        "Communicate results for decision-making: effect sizes, confidence intervals, limitations, and policy implications"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL-uRhZ_p-BM5ovNRg-G6hDib27OCvcyW8",
          "https://www.youtube.com/playlist?list=PLwJRxp3blEvZyQBTTOMFRP_TDaSdly3gU",
          "https://www.youtube.com/watch?v=GMVh02WGhoc",
          "https://www.youtube.com/watch?v=vEP4RIOKuE4"
        ],
        websites: [
          "https://ocw.mit.edu/courses/14-32-econometrics-spring-2007/",
          "https://fred.stlouisfed.org/",
          "https://data.worldbank.org/",
          "https://www.oecd.org/en/data.html",
          "https://www.fec.gov/data/"
        ],
        tools: [
          "Stata (common in econ/policy workflows)",
          "R (e.g., fixest, estimatr) or Python (statsmodels) for reproducible analysis",
          "Excel/Sheets (quick exploration; not final modeling)",
          "GitHub (replication + version control)",
          "Zotero (literature + citations)"
        ]
      }
    }
  },
  
  {
    id: "soc-010",
    code: "SOC 010",
    name: "Statistics for Sociology",
    fullName: "SOC 010: Statistics for Sociology",
    description:
      "Policy-ready statistics foundation for understanding, evaluating, and producing evidence in social research (sampling, uncertainty, and data-driven claims).",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "As a Policy Research Analyst, you’ll constantly interpret data from surveys, government programs, and social indicators. This course builds the statistical literacy to evaluate the credibility of claims (what’s real vs. noise), analyze social outcomes, and communicate uncertainty clearly in briefs, memos, and presentations.",
      realWorldApplications: [
        "Evaluate a policy claim by checking sampling, bias, margins of error, and whether conclusions are supported by the data",
        "Analyze disparities in outcomes (e.g., housing, health, education) across groups/regions and summarize findings for decision-makers",
        "Create a clean, reproducible dataset and produce policy-ready charts/tables using a spreadsheet and/or statistical software"
      ],
      learningOutcomes: [
        "Understand the logic of statistical reasoning in sociological/policy research (data → evidence → conclusion)",
        "Summarize and visualize social data clearly (distributions, comparisons, trends) for non-technical audiences",
        "Apply core inference ideas used in policy work (sampling, estimation, confidence intervals, hypothesis testing) and interpret them correctly",
        "Recognize common pitfalls: selection bias, misleading averages, p-hacking vibes, and confusing correlation with causation",
        "Use practical tools (spreadsheets + a stats language/workflow) to clean data, run analyses, and report results"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=sxQaBpKfDRk",
          "https://www.youtube.com/watch?v=yDEvXB6ApWc",
          "https://www.youtube.com/watch?v=WWqE7YHR4Jc",
          "https://www.youtube.com/watch?v=GGnHo7mSZ0Y"
        ],
        websites: [
          "https://data.gov/",
          "https://www.census.gov/data.html",
          "https://dataverse.harvard.edu/",
          "https://www.icpsr.umich.edu/",
          "https://www.pewresearch.org/methods/"
        ],
        tools: [
          "Excel / Google Sheets (quick analysis + visuals)",
          "R (tidyverse) or Python (pandas) for analysis workflows",
          "Stata or SPSS (common in social science)",
          "Zotero (source tracking + citations)",
          "GitHub (version control for analysis scripts)"
        ]
      }
    }
  },
  {
    id: "soc-015",
    code: "SOC 015",
    name: "Sociological Research Methods",
    fullName: "SOC 015: Sociological Research Methods",
    description:
      "End-to-end research design training: turning social problems into measurable questions, choosing methods, collecting data, and turning results into policy-relevant evidence.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy Research Analysts need more than stats—they need strong study design. This course teaches how to build credible research plans (questions → concepts → measures → data collection → analysis), so you can design surveys/interviews, critique studies, and produce evidence that holds up in real policy settings.",
      realWorldApplications: [
        "Design a small policy study: define a research question, operationalize concepts, choose a method (survey/interviews/observation), and draft an analysis plan",
        "Build a survey instrument + sampling plan for a target population and identify threats to validity and bias",
        "Write a methods section / research memo that explains how data was collected, measured, and analyzed (and what the limitations are)"
      ],
      learningOutcomes: [
        "Formulate strong, answerable social/policy research questions and connect them to theory/logic",
        "Conceptualize and measure key ideas (operational definitions, variables, indicators, reliability/validity)",
        "Compare data collection approaches (surveys, interviews, focus groups, observation, secondary/admin data) and choose appropriately",
        "Plan basic analysis steps and interpret findings responsibly (including limitations and ethics)",
        "Communicate research designs and results in professional formats used in policy work"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ZIwyNIdgJBE",
          "https://www.youtube.com/watch?v=QwhK-iEyXYA",
          "https://www.youtube.com/watch?v=M-lEVzKyqhQ",
          "https://www.youtube.com/watch?v=_uapR0qiN6s"
        ],
        websites: [
          "https://www.pewresearch.org/methods/",
          "https://www.qualtrics.com/experience-management/research/survey-research/",
          "https://www.socialscienceregistry.org/",
          "https://www.cos.io/initiatives/osf",
          "https://dataverse.harvard.edu/"
        ],
        tools: [
          "Qualtrics / Google Forms (survey collection)",
          "Zotero (literature + citations)",
          "NVivo / Taguette (qualitative coding) or a spreadsheet coding workflow",
          "R / Stata / SPSS (analysis + reporting)",
          "GitHub (project organization + reproducibility)"
        ]
      }
    }
  },
  {
    id: "engr-080",
    code: "ENGR 080",
    name: "Statistical Modeling and Data Analysis",
    fullName: "ENGR 080: Statistical Modeling and Data Analysis",
    description:
      "High-ROI course for building real statistical modeling skills (probability, distributions, inference, and regression) so you can analyze messy real-world data and defend conclusions with uncertainty.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For a Policy Research Analyst, this course is a major upgrade in evidence quality: it trains you to quantify uncertainty, build interpretable models (especially regression), and avoid common inference mistakes. That directly translates to stronger policy memos, program evaluations, and data-driven recommendations that can survive stakeholder pushback.",
      realWorldApplications: [
        "Estimate and interpret the relationship between a policy lever and an outcome (regression), including uncertainty and practical effect sizes",
        "Build a simple outcome model for forecasting or scenario analysis (e.g., expected change under different assumptions) and communicate limitations",
        "Validate a claim in a public report by checking assumptions, comparing distributions, and re-running analysis with better controls/robustness checks"
      ],
      learningOutcomes: [
        "Use probability + common distributions to model real data and reason about uncertainty",
        "Apply inferential tools (confidence intervals, hypothesis tests) correctly and explain what they do/don’t imply",
        "Build and interpret regression models (simple + multiple) with clear variable definitions and assumptions",
        "Diagnose modeling issues (outliers, nonlinearity, heteroskedasticity, missing data) and choose practical fixes",
        "Create policy-ready outputs: clean tables/figures, concise written interpretations, and transparent assumptions"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7ArmBVF2dCs",
          "https://www.youtube.com/watch?v=zITIFTsivN8",
          "https://www.khanacademy.org/v/hypothesis-testing-and-p-values",
          "https://ocw.mit.edu/courses/15-071-the-analytics-edge-spring-2017/resources/video-2-one-variable-linear-regression-0/"
        ],
        websites: [
          "https://www.itl.nist.gov/div898/handbook/",
          "https://www.statsmodels.org/stable/regression.html",
          "https://data.gov/",
          "https://www.census.gov/data.html",
          "https://dataverse.harvard.edu/"
        ],
        tools: [
          "Excel / Google Sheets (quick modeling + charts)",
          "R (tidyverse + modeling) or Python (pandas + statsmodels)",
          "statsmodels (OLS/GLM-style inference)",
          "Tableau / Power BI / Looker Studio (policy dashboards)",
          "GitHub (version control + reproducible analysis)"
        ]
      }
    }
  }
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses that strengthen Policy / Research Analyst skills
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "poli-211",
    code: "POLI 211",
    name: "Quantitative Analysis of Political Data, II",
    fullName: "POLI 211: Quantitative Analysis of Political Data, II",
    description:
      "Deep dive into OLS regression for political/policy data—assumptions, interpretation, diagnostics, and how to write defensible, policy-relevant conclusions from models.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For a Policy Research Analyst, regression is the workhorse for explaining outcome differences and evaluating relationships in observational data. This course upgrades you from ‘can run a model’ to ‘can defend a model’: interpreting coefficients as real-world effects, checking assumptions, handling violations, and communicating limitations transparently.",
      realWorldApplications: [
        "Estimate how a policy-relevant factor (e.g., program access, funding levels, enforcement intensity) relates to an outcome, then translate coefficients into plain-language effect sizes",
        "Diagnose model issues (nonlinearity, heteroskedasticity, outliers, multicollinearity) and apply practical fixes (robust SEs, transformations, re-specification)",
        "Produce a policy memo appendix: regression table + one-page interpretation focusing on actionable implications and uncertainty"
      ],
      learningOutcomes: [
        "Build and interpret OLS models with policy-facing explanations (effect sizes, uncertainty, trade-offs)",
        "Assess and respond to key OLS assumptions (linearity, independence, constant variance, influential points)",
        "Use diagnostics and robustness checks to evaluate whether conclusions are stable",
        "Communicate limitations: what regression suggests vs what it can’t prove causally without stronger design",
        "Create reproducible analysis outputs (clean tables/figures suitable for briefs and slide decks)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Vfo5le26IhY",
          "https://www.youtube.com/watch?v=2AQKmw14mHM",
          "https://www.youtube.com/watch?v=xxpc-HPKN28",
          "https://www.youtube.com/watch?v=ZkjP5RJLQF4"
        ],
        websites: [
          "https://www.stata.com/links/video-tutorials/",
          "https://mixtape.scunning.com/",
          "https://www.itl.nist.gov/div898/handbook/",
          "https://dataverse.harvard.edu/",
          "https://www.icpsr.umich.edu/"
        ],
        tools: [
          "Stata (regression workflow + robust SEs)",
          "R (fixest, estimatr) or Python (statsmodels) for reproducible regression",
          "Excel/Sheets (quick checks, not final modeling)",
          "Zotero (literature + citations)",
          "GitHub (replication + version control)"
        ]
      }
    }
  },
  
  {
    id: "poli-212",
    code: "POLI 212",
    name: "Quantitative Analysis of Political Data, III",
    fullName: "POLI 212: Quantitative Analysis of Political Data, III",
    description:
      "Maximum likelihood + limited dependent variable models (logit/probit/count models) for realistic policy outcomes like yes/no decisions, counts, and bounded measures.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy outcomes are often not continuous—think eligibility (yes/no), arrests (counts), complaints filed (counts), or adoption decisions (binary). This course teaches models that match those outcomes and helps you interpret results in policy terms (predicted probabilities, marginal effects), which is crucial for credible evaluation and forecasting.",
      realWorldApplications: [
        "Model the probability a household/individual receives a benefit (binary outcome) and report predicted probabilities across groups",
        "Analyze count outcomes like incidents, filings, or service usage using appropriate count models instead of misusing OLS",
        "Translate model output into decision-ready visuals: predicted probability plots, marginal effects, and scenario comparisons"
      ],
      learningOutcomes: [
        "Understand the logic of maximum likelihood estimation and when it’s used",
        "Fit and interpret limited dependent variable models (logit/probit; count models like Poisson/negative binomial)",
        "Compute and communicate marginal effects/predicted probabilities in plain language",
        "Evaluate model fit and common pitfalls (separation, overdispersion, specification issues)",
        "Choose models that align with measurement realities in government/admin data"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Q81RR3yKn30",
          "https://www.youtube.com/watch?v=yIYKR4sgzI8",
          "https://www.youtube.com/watch?v=V8fWvQ0q7vA",
          "https://www.youtube.com/watch?v=lnjK9J9m5zE"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68704",
          "https://www.stata.com/manuals/rl.pdf",
          "https://www.statsmodels.org/stable/discrete.html",
          "https://mixtape.scunning.com/",
          "https://www.itl.nist.gov/div898/handbook/"
        ],
        tools: [
          "Stata (logit/probit, margins, count models)",
          "R (glm, MASS, marginaleffects) or Python (statsmodels discrete models)",
          "Jupyter / RStudio (reproducible reports)",
          "Tableau / Power BI (probability + scenario dashboards)",
          "GitHub (reproducibility)"
        ]
      }
    }
  },
  {
    id: "poli-213",
    code: "POLI 213",
    name: "Experimental Methods in Political Science",
    fullName: "POLI 213: Experimental Methods in Political Science",
    description:
      "Design and critique experiments (survey/lab/field) with a causal-inference focus—internal/external validity, subject recruitment, ethics, and interpretation for real policy decisions.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "A Policy Research Analyst often needs the cleanest possible evidence on ‘what works.’ Experiments (especially field and survey experiments) are a gold standard for causal claims, but only if designed and interpreted correctly. This course trains you to build and evaluate experiments that produce decision-grade evidence while accounting for ethics, feasibility, and generalizability.",
      realWorldApplications: [
        "Design a randomized evaluation for a program pilot (treatment/control, outcomes, compliance, spillovers, and measurement plan)",
        "Create a survey experiment to test messaging/policy framing and report causal effects with clear limitations",
        "Audit an RCT-style policy report for threats to validity (attrition, noncompliance, interference) and propose fixes"
      ],
      learningOutcomes: [
        "Design experiments that isolate causal effects (randomization, controls, and measurement choices)",
        "Distinguish and manage internal vs external validity (what’s true here vs what generalizes)",
        "Handle common experimental complications (attrition, noncompliance, spillovers, ethical constraints)",
        "Analyze and communicate experimental results in policy language (ATEs, uncertainty, practical impact)",
        "Apply ethical principles and transparency norms (preregistration, replication, disclosure)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=3vKJ0Qp3G1I",
          "https://www.youtube.com/watch?v=J5vKQ1ZKq9E",
          "https://www.youtube.com/watch?v=Yl6R6b5yY9Q",
          "https://www.youtube.com/watch?v=G8G8B9sQk9I"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68705",
          "https://www.povertyactionlab.org/",
          "https://egap.org/",
          "https://www.socialscienceregistry.org/",
          "https://www.cos.io/initiatives/osf"
        ],
        tools: [
          "Qualtrics (survey experiments) / REDCap (if available)",
          "R (randomization inference, estimation) or Stata",
          "OSF / AEA Social Science Registry (preregistration + transparency)",
          "Zotero (citations + evidence tracking)",
          "GitHub (analysis + replication materials)"
        ]
      }
    }
  },
  {
    id: "poli-214",
    code: "POLI 214",
    name: "Advanced Causal Inference",
    fullName: "POLI 214: Advanced Causal Inference",
    description:
      "Advanced causal tools for policy research—matching, panel methods, diff-in-diff, IV, and RDD—so you can make stronger causal claims from real-world (non-randomized) data.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Most policy questions can’t be randomized. This course gives you the modern toolkit to estimate causal effects from observational and quasi-experimental settings—exactly what analysts use in government, think tanks, and evaluation teams to assess program impact with credible designs and transparent assumptions.",
      realWorldApplications: [
        "Evaluate a policy rollout using difference-in-differences with a comparison group and event-study style plots",
        "Use instrumental variables when selection bias is unavoidable (and explain the assumptions in plain language)",
        "Apply regression discontinuity or matching to approximate experimental evidence when eligibility rules or rich covariates exist"
      ],
      learningOutcomes: [
        "Choose an identification strategy that matches the policy context (what variation identifies the effect?)",
        "Implement and interpret common causal designs: matching, panel fixed effects, diff-in-diff, IV, and RDD",
        "Diagnose validity threats (parallel trends, weak instruments, manipulation around cutoffs) and run robustness checks",
        "Translate causal estimates into policy implications (who benefits, how much, uncertainty, and limits)",
        "Write decision-ready causal evidence summaries that explicitly state assumptions and sensitivity"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=8pQnD7GQp1A",
          "https://www.youtube.com/watch?v=O9S4eW6kB6M",
          "https://www.youtube.com/watch?v=Yt9hGfJbM0Q",
          "https://www.youtube.com/watch?v=F5ZtYpQ2Q0k"
        ],
        websites: [
          "https://mixtape.scunning.com/",
          "https://www.povertyactionlab.org/",
          "https://egap.org/",
          "https://www.nber.org/",
          "https://www.stata.com/"
        ],
        tools: [
          "R (fixest, did, MatchIt, rdrobust) or Stata (teffects, ivregress, xtreg, rd)",
          "Python (statsmodels; linearmodels for panels/IV)",
          "GitHub (reproducible analysis + peer review)",
          "Zotero (source management)",
          "Tableau/Power BI (communicating causal results visually)"
        ]
      }
    }
  },
  {
    id: "poli-290",
    code: "POLI 290",
    name: "Political Science Research Practicum",
    fullName: "POLI 290: Political Science Research Practicum",
    description:
      "Faculty-mentored research apprenticeship where you produce real deliverables (data, analysis, and writing) that match policy-research analyst work.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy Research Analysts don’t just ‘learn methods’—they execute projects under real constraints (tight timelines, messy data, stakeholder feedback). This practicum simulates that environment: you work with a faculty PI to move a research question from idea → evidence → polished outputs, building the same habits used in government agencies, think tanks, and consulting evaluation teams.",
      realWorldApplications: [
        "Build a replication-style workflow: clean a dataset, document assumptions, and generate tables/figures that could go into a policy brief",
        "Translate academic findings into a decision memo: what’s the effect size, what’s uncertain, and what would you recommend next?",
        "Support a project end-to-end: literature scan, codebook, data collection plan, analysis plan, and final written deliverable"
      ],
      learningOutcomes: [
        "Operate like a research analyst on a real project: scope, timeline, deliverables, and quality checks",
        "Strengthen evidence skills: data cleaning, transparent analysis, and defensible interpretation",
        "Write in policy formats (briefs/memos) that emphasize clarity, impact, and limitations",
        "Practice reproducibility: organized files, documented code, and shareable outputs",
        "Improve collaboration skills: iterative feedback with a PI and professional communication"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=6e3eX8Ly6xc",
          "https://www.youtube.com/watch?v=X07mBq2tnMg",
          "https://www.youtube.com/watch?v=Cq_jg4iQ4lk",
          "https://www.youtube.com/watch?v=tqnhW1tanAQ"
        ],
        websites: [
          "https://www.povertyactionlab.org/",
          "https://www.icpsr.umich.edu/",
          "https://dataverse.harvard.edu/",
          "https://data.gov/",
          "https://www.census.gov/data.html"
        ],
        tools: [
          "R (tidyverse) or Python (pandas) for analysis",
          "Stata (common in policy/econ teams)",
          "Zotero (literature + citations)",
          "OSF (project organization + transparency)",
          "GitHub (version control + reproducibility)"
        ]
      }
    }
  },
  {
    id: "poli-293",
    code: "POLI 293",
    name: "Critical Assessment of Political Science Research",
    fullName: "POLI 293: Critical Assessment of Political Science Research",
    description:
      "Train your “reviewer brain”: systematically evaluate research quality (design, measurement, inference, and writing) the same way policy teams vet evidence before acting on it.",
    tier: 2,
    expandedInfo: {
      credits: 2,
      careerRelevance:
        "Policy Research Analysts are paid for judgment: deciding which studies are credible and what can safely be concluded. This course builds professional-grade critique skills—how to read like a reviewer, spot methodological weak points, and separate strong evidence from persuasive storytelling—so your recommendations are grounded and defensible.",
      realWorldApplications: [
        "Critique a policy study like a review memo: identify identification strategy, assumptions, threats to validity, and practical relevance",
        "Evaluate whether results are robust: check measurement choices, model specification, and whether conclusions overreach the design",
        "Write structured evidence assessments for stakeholders: ‘what we know,’ ‘what’s uncertain,’ and ‘what would change our confidence’"
      ],
      learningOutcomes: [
        "Read research efficiently and extract the design + core claims without getting lost in details",
        "Assess validity: causality vs correlation, selection bias, measurement error, and generalizability",
        "Recognize red flags (p-hacking vibes, weak identification, unsupported causal language, missing robustness)",
        "Write high-quality critiques that are specific, fair, and actionable",
        "Translate research limitations into smart next steps (better data, better design, better measurement)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=rOCQZ7QnoN0",
          "https://www.youtube.com/watch?v=DWzKI4WhSPQ",
          "https://www.youtube.com/watch?v=Cq_jg4iQ4lk",
          "https://www.youtube.com/watch?v=1fsqW-9MwNw"
        ],
        websites: [
          "https://pubpeer.com/",
          "https://retractionwatch.com/",
          "https://www.cochranelibrary.com/",
          "https://www.nber.org/",
          "https://www.cos.io/"
        ],
        tools: [
          "Zotero (annotation + citations)",
          "Google Scholar alerts (evidence monitoring)",
          "OSF (open materials + preregistration)",
          "R / Stata (reproduce key tables)",
          "GitHub (track critique + replication notes)"
        ]
      }
    }
  },
  {
    id: "econ-171",
    code: "ECON 171",
    name: "Advanced Econometrics",
    fullName: "ECON 171: Advanced Econometrics",
    description:
      "Beyond OLS: advanced empirical techniques + software workflows used in real evaluation and policy analytics work.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy analysis often lives in observational data: programs roll out unevenly, groups differ, and causality is hard. Advanced econometrics gives you tools to estimate effects more credibly (and to communicate uncertainty honestly), which is exactly what evaluation teams, research units, and evidence-based policy shops expect.",
      realWorldApplications: [
        "Evaluate a program using quasi-experimental designs (e.g., diff-in-diff / panel strategies) and produce policy-ready effect summaries",
        "Use robust inference and diagnostics to defend results under scrutiny (assumptions, sensitivity, robustness checks)",
        "Build an analysis workflow in statistical software that can be audited and reproduced by others"
      ],
      learningOutcomes: [
        "Apply econometric techniques beyond basic regression to real-world policy/economic questions",
        "Choose appropriate models, justify identification assumptions, and interpret results as effects (with limits)",
        "Implement robust inference and common fixes for messy data problems",
        "Perform sensitivity/robustness checks and communicate what changes (and what doesn’t)",
        "Produce professional outputs: clean tables, clear narratives, transparent assumptions"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLpkytg97bfd0LH4qzWDHYdovL5SesgV4m",
          "https://www.youtube.com/playlist?list=PLwJRxp3blEvaxmHgI2iOzNP6KGLSyd4dz",
          "https://www.youtube.com/watch?v=Q5QOCMIwjbg",
          "https://www.youtube.com/watch?v=w56HI8YxLMQ"
        ],
        websites: [
          "https://ocw.mit.edu/courses/14-32-econometrics-spring-2007/",
          "https://fred.stlouisfed.org/",
          "https://microdata.worldbank.org/",
          "https://www.nber.org/",
          "https://www.itl.nist.gov/div898/handbook/"
        ],
        tools: [
          "Stata (evaluation + margins + panel workflows)",
          "R (fixest / did / estimatr) or Python (statsmodels / linearmodels)",
          "Jupyter / RStudio (reproducible reports)",
          "GitHub (version control + replication)",
          "Tableau / Power BI (communicating results)"
        ]
      }
    }
  },
  {
    id: "econ-271",
    code: "ECON 271",
    name: "Economics and Data Science",
    fullName: "ECON 271: Economics and Data Science",
    description:
      "Bridge econometrics and machine learning: when to use each, how they complement each other, and how to apply modern data science responsibly to economic/policy problems.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research increasingly involves large administrative datasets and high-dimensional features where prediction matters—but policy decisions also require causal reasoning. This course helps you navigate both worlds: using ML for prediction/targeting while staying grounded in interpretability, bias/fairness, and the causal questions policymakers actually care about.",
      realWorldApplications: [
        "Build predictive models for program targeting or risk scoring, then evaluate trade-offs (accuracy vs fairness vs interpretability)",
        "Use cross-validation and out-of-sample testing to avoid overclaiming results from noisy data",
        "Connect ML outputs to policy decisions: threshold selection, error costs, and monitoring for drift over time"
      ],
      learningOutcomes: [
        "Explain differences and complementarities between econometrics and ML (prediction vs explanation/causality)",
        "Implement core ML workflow pieces: feature engineering, regularization, validation, and evaluation metrics",
        "Interpret models in policy terms (marginal effects / partial dependence / error trade-offs)",
        "Identify risks: leakage, bias, unfairness, overfitting, and misaligned objectives",
        "Communicate results to non-technical stakeholders with transparency about limits"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Z0ZcsxI-HTs",
          "https://www.youtube.com/watch?v=kM8B2X8pdNA",
          "https://www.youtube.com/playlist?list=PLxq_lXOUlvQAoWZEqhRqHNezS30lI49G-",
          "https://www.youtube.com/playlist?list=PLKQYHgEtgnECG-hWewzpV9geWj2nepJYV"
        ],
        websites: [
          "https://www.aeaweb.org/webcasts/2018/machine-learning-and-econometrics-part-1",
          "https://scikit-learn.org/stable/",
          "https://xgboost.readthedocs.io/",
          "https://www.census.gov/data.html",
          "https://data.gov/"
        ],
        tools: [
          "Python (pandas + scikit-learn) or R (tidymodels)",
          "Jupyter notebooks (reproducible analysis)",
          "SQL (admin data extraction/joins)",
          "GitHub (experiment tracking + version control)",
          "BI tool (Tableau/Power BI/Looker Studio) for stakeholder reporting"
        ]
      }
    }
  },
  
  {
    id: "geog-010",
    code: "GEOG 010",
    name: "Introduction to Spatial Analysis",
    fullName: "GEOG 010: Introduction to Spatial Analysis",
    description:
      "GIS + spatial reasoning for policy: map patterns, measure place-based disparities, and turn location data into actionable insights (service access, risk, and equity).",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Many policy questions are spatial: where outcomes concentrate, which communities lack access, and how resources should be allocated. Spatial analysis gives Policy Research Analysts a major edge—letting you quantify place-based disparities, communicate them visually, and support decisions like facility placement, outreach targeting, and environmental justice analysis.",
      realWorldApplications: [
        "Map and analyze access to services (food, clinics, transit) using buffers/travel distance and identify underserved areas",
        "Combine Census + program data to visualize disparities and produce policy-ready maps for reports and presentations",
        "Run hotspot/cluster-style analysis to detect geographic concentration of outcomes (complaints, incidents, need)"
      ],
      learningOutcomes: [
        "Understand core GIS concepts: spatial data types, projections/CRS, geocoding, and map design",
        "Perform common policy-relevant operations: joins by location, buffers, overlays, and basic spatial statistics",
        "Work with public datasets (Census + administrative data) and document assumptions clearly",
        "Create clear, ethical maps (avoiding misleading symbology and protecting sensitive information)",
        "Translate spatial findings into decisions and recommendations"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=KI4VjXyJxf0",
          "https://www.youtube.com/watch?v=PRHe4gWigQQ",
          "https://www.youtube.com/watch?v=EKKXXAahu3w",
          "https://www.youtube.com/watch?v=a-Fyyn5gaQA"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67781",
          "https://ocw.mit.edu/courses/11-205-introduction-to-spatial-analysis-fall-2019/pages/syllabus/",
          "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html",
          "https://www.qgis.org/en/site/",
          "https://data.gov/"
        ],
        tools: [
          "ArcGIS Pro (industry standard GIS)",
          "QGIS (free/open-source GIS)",
          "PostGIS (spatial SQL)",
          "Python (geopandas) or R (sf) for reproducible spatial analysis",
          "Tableau / Power BI (map dashboards)"
        ]
      }
    }
  },
  {
    id: "geog-002",
    code: "GEOG 002",
    name: "Introduction to Geographic Information Systems",
    fullName: "GEOG 002: Introduction to Geographic Information Systems",
    description: "Foundational GIS course for turning location-based data into policy-relevant maps, analyses, and clear public-facing visuals.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research analysts constantly work with place-based outcomes (housing, transit access, pollution burden, voting patterns, service deserts). This course gives you the core GIS workflow—cleaning spatial data, joining datasets (e.g., census + outcomes), running spatial analysis, and communicating findings through maps that decision-makers can actually use.",
      realWorldApplications: [
        "Map service access gaps (food deserts, clinics, transit stops) by census tract and connect them to outcomes",
        "Create policy-ready dashboards/maps for city council packets or stakeholder briefings",
        "Evaluate environmental justice impacts (pollution exposure vs demographic vulnerability)",
        "Redistricting / boundary analysis: compare outcomes across districts, precincts, and neighborhoods"
      ],
      learningOutcomes: [
        "Explain what GIS is and how spatial data differs from non-spatial data (vector vs raster, attributes vs geometry)",
        "Import, clean, and manage common geospatial datasets (shapefiles/GeoJSON, basemaps, tabular joins)",
        "Use core analysis tools (buffers, spatial joins, overlays) to answer policy questions",
        "Build clear, ethical, and persuasive cartographic products (legends, scale, projection choice, accessibility)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLGZUzt4E4O2IJFxX_Bhp98MJEw5ItRtvb", // Esri: ArcGIS Pro Quick-Start Tutorials
          "https://www.youtube.com/watch?v=0_kXMq1eZ4g", // Esri: Introducing ArcGIS Pro
          "https://www.youtube.com/playlist?list=PLgxX4AQ_KUQ9oavFq9I8wZsqXW0N6VRDV", // QGIS tutorial playlist (beginner-friendly)
          "https://courses.spatialthoughts.com/introduction-to-qgis.html" // Structured intro + video
        ],
        websites: [
          "https://pro.arcgis.com/en/pro-app/latest/get-started/pro-quickstart-tutorials.htm",
          "https://www.qgistutorials.com/",
          "https://library.ucmerced.edu/gis"
        ],
        tools: ["ArcGIS Pro", "ArcGIS Online", "QGIS", "PostGIS", "GeoPandas"]
      }
    }
  },
  {
    id: "ph-010",
    code: "PH 010",
    name: "Introduction to Biostatistics",
    fullName: "PH 010: Introduction to Biostatistics",
    description: "Core stats literacy for policy: turning data into defensible claims (uncertainty, significance, effect sizes, and interpretation).",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research lives or dies on whether your analysis is credible and interpretable. Biostatistics builds the muscle for reading studies, checking assumptions, quantifying uncertainty, and communicating results responsibly—skills that transfer directly to health policy, social policy, and program evaluation work.",
      realWorldApplications: [
        "Interpret and critique findings in policy reports (p-values, confidence intervals, effect sizes)",
        "Compare group outcomes (before/after a policy, treated vs control) with appropriate tests",
        "Model relationships (e.g., predictors of program uptake) and explain limitations clearly",
        "Build simple evidence summaries for stakeholders (what we know, how sure we are, what could bias results)"
      ],
      learningOutcomes: [
        "Summarize data with descriptive statistics and visualize distributions appropriately",
        "Understand sampling variability and inference (confidence intervals, hypothesis tests)",
        "Choose and interpret common tests (t-tests, chi-square, simple regression)",
        "Communicate statistical conclusions in plain language without overstating certainty"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=VjtKcVL3nCw", // NIH VideoCast: Introduction in Biostatistics
          "https://www.youtube.com/watch?v=vemZtEM63GY", // StatQuest: p-values
          "https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo", // Harvard Stat 110 (probability foundations)
          "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" // StatQuest: statistics fundamentals
        ],
        websites: [
          "https://statquest.org/video_index.html",
          "https://stat110.hsites.harvard.edu/youtube",
          "https://www.coursera.org/specializations/biostatistics-public-health"
        ],
        tools: ["R", "RStudio", "Excel/Google Sheets", "Stata", "Python (pandas/statsmodels)"]
      }
    }
  },
  {
    id: "ph-112",
    code: "PH 112",
    name: "Research Methods: Health Services Research and Public Health",
    fullName: "PH 112: Research Methods: Health Services Research and Public Health",
    description: "Research design + evaluation methods (qual + quant) for building defensible policy evidence and writing rigorous recommendations.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research analysts need to design studies, evaluate programs, and judge evidence quality—especially when decisions affect budgets and communities. This course strengthens your ability to turn a policy question into a research plan, pick the right method, avoid common biases, and communicate findings in a way that holds up under scrutiny.",
      realWorldApplications: [
        "Design a program evaluation plan (outcomes, indicators, comparison groups, data collection strategy)",
        "Conduct/critique mixed-method research (surveys + interviews + administrative data)",
        "Assess evidence quality in policy briefs (internal validity, external validity, confounding, selection bias)",
        "Translate research into actionable recommendations (what to do next, what data is still missing)"
      ],
      learningOutcomes: [
        "Formulate research questions and select appropriate qualitative, quantitative, or mixed methods",
        "Explain major study designs (cross-sectional, cohort, case-control, experiments/quasi-experiments) and their tradeoffs",
        "Develop measurement plans (variables, instruments, reliability/validity, ethics and consent basics)",
        "Evaluate research claims and identify threats to inference (bias, confounding, missing data)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=tOjieBh1ce0", // CDC Evaluation Framework (overview)
          "https://www.youtube.com/watch?v=ocE0najAT_8", // CDC: walking through the 6 evaluation steps
          "https://www.youtube.com/watch?v=6e3eX8Ly6xc", // J-PAL: What is Evaluation
          "https://www.youtube.com/playlist?list=PLxFw8aTtvq-d9txuTe0gvLcmQ1QXFCkVm" // Cochrane Handbook intro playlist
        ],
        websites: [
          "https://www.cdc.gov/national-asthma-control-program/php/program_eval/webinars.html",
          "https://www.povertyactionlab.org/page/online-courses",
          "https://ocreco.od.nih.gov/courses/ippcr.html"
        ],
        tools: ["Zotero", "Qualtrics", "REDCap", "NVivo (or Taguette)", "R / Stata"]
      }
    }
  },
  {
    id: "ph-115",
    code: "PH 115",
    name: "Research Methods for Public Health: GIS Mapping",
    fullName: "PH 115: Research Methods for Public Health: GIS Mapping",
    description: "Spatial methods for policy + public health: map disparities, detect hotspots, and communicate equity impacts with GIS.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "A huge share of policy questions are geographic (who is affected, where, and how unevenly). GIS mapping for public health trains you to analyze spatial inequities and present evidence that can drive resource allocation, prevention strategies, and equity-focused policy decisions.",
      realWorldApplications: [
        "Identify hotspots (e.g., high burden + low access areas) for targeted interventions",
        "Map social determinants of health and link them to outcomes (screening rates, chronic disease prevalence)",
        "Support grant proposals and policy memos with defensible spatial evidence",
        "Build interactive public-facing visuals that communicate disparities without misleading audiences"
      ],
      learningOutcomes: [
        "Acquire and prepare health-relevant spatial datasets (census geography, local service locations, area indicators)",
        "Perform core spatial epidemiology workflows (rates by area, hotspot screening, spatial joins/overlays)",
        "Design ethical and readable health-equity maps (classification choices, normalization, uncertainty)",
        "Communicate spatial findings for decisions (policy briefs, stakeholder presentations, dashboards)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=YeONEtqFdtA", // CDC: geospatial partnerships + public health investigations
          "https://www.youtube.com/watch?v=IoSESozM9LU", // Atlas of Heart Disease & Stroke: download GIS data
          "https://www.youtube.com/watch?v=fTqyv5iycuY", // Atlas of Heart Disease & Stroke: create a map
          "https://www.youtube.com/watch?v=Upp0vTJLuFg" // GIS Tutorial for Health (ArcGIS)
        ],
        websites: [
          "https://www.cdc.gov/pcd/issues/gis_toc.htm",
          "https://library.ucmerced.edu/gis",
          "https://pro.arcgis.com/en/pro-app/latest/get-started/pro-quickstart-tutorials.htm"
        ],
        tools: ["ArcGIS Pro", "ArcGIS Online", "QGIS", "GeoDa", "SaTScan", "R (sf/tmap)"]
      }
    }
  },
  {
    id: "cogs-210",
    code: "COGS 210",
    name: "Statistics for Cognitive Scientists",
    fullName: "COGS 210: Statistics for Cognitive Scientists",
    description:
      "Core statistics toolkit for analyzing behavioral and social-science data—so you can interpret evidence correctly and make defensible, uncertainty-aware policy conclusions.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy Research Analysts constantly rely on social/behavioral evidence (surveys, experiments, program outcomes). This course strengthens your ability to analyze data rigorously, interpret uncertainty, and communicate results without overclaiming—exactly what credible policy memos and evaluations require.",
      realWorldApplications: [
        "Analyze survey or program-outcome data and present results as effect sizes + uncertainty (not just ‘significant/not significant’)",
        "Evaluate claims in policy reports by checking statistical assumptions, measurement choices, and whether conclusions match the evidence",
        "Build a reproducible analysis workflow that produces clean tables/figures for briefs and stakeholder decks"
      ],
      learningOutcomes: [
        "Summarize, visualize, and interpret behavioral/social datasets in ways that support policy decision-making",
        "Apply core inference tools responsibly (confidence intervals, hypothesis tests) and explain what they mean in plain language",
        "Select appropriate statistical models for common research questions and interpret outputs as real-world effects",
        "Recognize common statistical pitfalls (selection bias, multiple comparisons, misinterpreting p-values) and report limitations clearly"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=VjtKcVL3nCw",
          "https://www.youtube.com/watch?v=0Pd3dc1GcHc",
          "https://www.youtube.com/watch?v=nk2CQITm_eo",
          "https://www.youtube.com/watch?v=BMHh2wW3SLE"
        ],
        websites: [
          "https://www.itl.nist.gov/div898/handbook/",
          "https://www.openintro.org/book/os/",
          "https://stats.idre.ucla.edu/"
        ],
        tools: [
          "R / RStudio",
          "Python (pandas, scipy, statsmodels)",
          "Jupyter Notebooks / Quarto",
          "Excel / Google Sheets (quick checks, summaries)",
          "Zotero (source + citation tracking)"
        ]
      }
    }
  },
  {
    id: "cogs-212",
    code: "COGS 212",
    name: "Methods of Data Science 1",
    fullName: "COGS 212: Methods of Data Science 1",
    description:
      "Modern data-science workflow course: version control, data management, reproducibility, and professional software practices for real analysis work.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy Research Analysts who can deliver clean, reproducible analysis pipelines (not just one-off spreadsheets) are far more effective. This course builds the software + workflow habits—version control, code review, data management, and reproducibility—that make your research auditable, shareable, and trusted.",
      realWorldApplications: [
        "Create a reproducible policy analysis repo (data cleaning scripts + documentation + outputs) that teammates can rerun",
        "Use version control + code review to collaborate on an analysis project without breaking work or losing changes",
        "Build a data ingestion/cleaning pipeline for public datasets (Census, labor, budgets) and generate a report automatically"
      ],
      learningOutcomes: [
        "Use version control and collaborative workflows (branching, pull requests, code review) for analysis projects",
        "Perform exploratory data analysis responsibly (quality checks, missingness, outliers, definitions)",
        "Practice strong data management (clean schemas, documentation, reproducible joins/merges, provenance tracking)",
        "Produce reproducible outputs (scripts/notebooks + reports) that can be audited and rerun"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=RGOj5yH7evk",
          "https://www.youtube.com/watch?v=8JJ101D3knE",
          "https://www.youtube.com/watch?v=vhp6aUNj8KU",
          "https://www.youtube.com/watch?v=Q7q7GdGmDzo"
        ],
        websites: [
          "https://docs.github.com/en/get-started",
          "https://carpentries.org/",
          "https://r4ds.hadley.nz/",
          "https://jupyter.org/"
        ],
        tools: [
          "Git + GitHub",
          "Python (pandas) or R (tidyverse)",
          "Jupyter / Quarto / RMarkdown",
          "SQL (basic querying + joins)",
          "VS Code",
          "Docker (optional for reproducible environments)"
        ]
      }
    }
  },
  {
    id: "cogs-214",
    code: "COGS 214",
    name: "Global Good Studio: Data Visualization",
    fullName: "COGS 214: Global Good Studio: Data Visualization",
    description:
      "Policy-grade data storytelling: design clear, ethical visualizations that translate evidence into action for stakeholders, communities, and decision-makers.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research only matters if people understand it. This course builds the visualization and communication skills to turn analysis into clear narratives—dashboards, charts, and briefs—so your recommendations land with non-technical audiences and drive real decisions.",
      realWorldApplications: [
        "Create an equity-focused visualization package (maps + charts) for a policy brief on access, outcomes, and disparities",
        "Build a stakeholder-ready dashboard that tracks KPIs and trends for a program (with clear definitions and caveats)",
        "Translate statistical findings into visuals that avoid common misreads (axes, baselines, normalization, uncertainty)"
      ],
      learningOutcomes: [
        "Choose the right chart/map for a question and audience (comparison, trend, distribution, relationship)",
        "Design clear, accessible, and ethical visualizations (labels, scales, color accessibility, avoiding misleading encodings)",
        "Communicate uncertainty and limitations visually (confidence bands, intervals, denominators, rates vs counts)",
        "Produce a narrative deliverable (brief/deck/dashboard) that connects evidence to policy decisions"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=8EMW7io4rSI",
          "https://www.youtube.com/watch?v=5Zg-C8AAIGg",
          "https://www.youtube.com/watch?v=2LhoCfjm8R4",
          "https://www.youtube.com/watch?v=V8fWvQ0q7vA"
        ],
        websites: [
          "https://www.data-to-viz.com/",
          "https://www.storytellingwithdata.com/",
          "https://observablehq.com/",
          "https://www.tableau.com/learn/training"
        ],
        tools: [
          "Tableau / Power BI / Looker Studio",
          "R (ggplot2) or Python (matplotlib / seaborn / plotly)",
          "Flourish (quick interactive visuals)",
          "Observable (interactive data stories)",
          "Figma (layout for briefs/decks)"
        ]
      }
    }
  },
];

/**
 * 🟠 TIER 3: OPTIONAL
 * Additional courses that may be relevant based on interests
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "pubp-110",
    code: "PUBP 110",
    name: "Poverty and Social Policy",
    fullName: "PUBP 110: Poverty and Social Policy",
    description:
      "Sector deep-dive that trains you to analyze poverty drivers and evaluate social safety-net policy options (cash, housing, labor, education) with an equity + evidence lens.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For a Policy Research Analyst, poverty policy is where you practice end-to-end analysis: defining the problem, selecting measures (rates vs depth, mobility, inequality), comparing interventions, and writing actionable recommendations. You’ll build the ability to interpret program evidence (who benefits, who is missed, what tradeoffs exist) and communicate impacts credibly to decision-makers.",
      realWorldApplications: [
        "Compare policy interventions (EITC expansions vs cash transfers vs housing vouchers) using outcomes + equity tradeoffs",
        "Build a policy memo that links data to recommendations (problem framing → evidence review → options → implementation risks)",
        "Evaluate poverty-reduction programs using administrative data and/or quasi-experimental evidence"
      ],
      learningOutcomes: [
        "Define and measure poverty and inequality using common metrics and explain what each does/doesn’t capture",
        "Analyze social policy tools (cash/in-kind benefits, housing, labor market policy) and predict intended vs unintended effects",
        "Critique research evidence (selection bias, confounding, external validity) and translate findings into policy-relevant conclusions",
        "Write clear policy recommendations with implementation constraints, stakeholder impacts, and evaluation plans"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=CdYl9jtSREA",
          "https://www.youtube.com/playlist?list=PL4C16FA516A08275C",
          "https://www.youtube.com/watch?v=6e3eX8Ly6xc"
        ],
        websites: [
          "https://www.worldbank.org/en/topic/poverty",
          "https://www.urban.org/policy-centers/income-and-benefits-policy-center",
          "https://www.brookings.edu/topic/poverty/"
        ],
        tools: ["R / RStudio", "Stata", "Python (pandas/statsmodels)", "Zotero", "Tableau / Power BI"]
      }
    }
  },
  {
    id: "pubp-120",
    code: "PUBP 120",
    name: "Health Care Policy",
    fullName: "PUBP 120: Health Care Policy",
    description:
      "Topical specialization in U.S. health care systems and policy design—coverage, costs, access, quality, and evaluation of reform options.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Health policy is a major employer lane for policy analysts (state agencies, think tanks, hospitals, insurers, NGOs). This course builds the systems thinking needed to analyze coverage programs, provider incentives, spending drivers, and equity impacts—and to evaluate reforms without getting lost in jargon or partisan framing.",
      realWorldApplications: [
        "Analyze a reform proposal (Medicaid expansion, public option, rate regulation) and forecast stakeholder winners/losers",
        "Evaluate policy impacts on access/quality/cost using claims, enrollment, or hospital utilization data",
        "Write a brief explaining how Medicare/Medicaid/ACA markets interact in a state or region"
      ],
      learningOutcomes: [
        "Explain core U.S. health financing structures (Medicare, Medicaid, employer coverage, ACA marketplaces) and how policy changes ripple through them",
        "Assess tradeoffs among access, affordability, quality, and fiscal sustainability using evidence (not vibes)",
        "Interpret common health-policy metrics (utilization, spending per capita, risk adjustment, coverage rates)",
        "Communicate policy options clearly to non-technical stakeholders with equity and implementation constraints front-and-center"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=f9NUCvrrRz4",
          "https://www.youtube.com/playlist?list=PLaV7m2-zFKpjt7jXQYFjiy6fZ9qstPlxJ",
          "https://www.youtube.com/playlist?list=PLBfqBziFkXId22PbxslFV9shgGUR0mCuu"
        ],
        websites: [
          "https://www.kff.org/other-health/health-policy-101-introduction/",
          "https://www.cms.gov/",
          "https://www.commonwealthfund.org/"
        ],
        tools: ["R / Python", "Stata", "Tableau / Power BI", "SQL", "Zotero"]
      }
    }
  },
  {
    id: "pubp-130",
    code: "PUBP 130",
    name: "Environmental Policy",
    fullName: "PUBP 130: Environmental Policy",
    description:
      "Policy design + implementation focus for environmental problems—regulation, incentives, compliance, and environmental justice impacts.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Environmental policy analysis is largely about designing rules and incentives that work in the real world (agencies, enforcement, courts, industry constraints) while balancing equity and cost. This course helps you evaluate policy instruments (standards, taxes/fees, cap-and-trade, subsidies) and build evidence-backed recommendations.",
      realWorldApplications: [
        "Compare regulatory vs market-based tools for emissions reduction and explain when each is likely to work best",
        "Assess environmental justice impacts (who bears burdens, who gains benefits) and propose mitigations",
        "Draft a policy memo connecting scientific evidence to implementable regulation and monitoring plans"
      ],
      learningOutcomes: [
        "Explain core environmental policy instruments and match tools to problem structure (externalities, common-pool resources)",
        "Analyze implementation capacity (enforcement, monitoring, compliance incentives, litigation risk)",
        "Use evidence to evaluate policy effectiveness and equity impacts (distributional analysis, EJ screening logic)",
        "Communicate uncertainty and tradeoffs clearly (cost, feasibility, political constraints, measurement limits)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=6xkaqTyB5D8",
          "https://www.youtube.com/watch?v=Tp4JhmJqNws",
          "https://www.youtube.com/watch?v=CYIK_JgTzBg"
        ],
        websites: [
          "https://www.epa.gov/",
          "https://www.eli.org/",
          "https://www.ipcc.ch/"
        ],
        tools: ["R / Python", "GIS (QGIS / ArcGIS)", "Tableau / Power BI", "Zotero"]
      }
    }
  },  
  {
    id: "pubp-140",
    code: "PUBP 140",
    name: "Immigration and Public Policy",
    fullName: "PUBP 140: Immigration and Public Policy",
    description:
      "Policy-focused analysis of immigration—drivers, legal pathways, enforcement, labor-market effects, and impacts on communities and public systems.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Immigration policy work is heavy on evidence synthesis and careful causal reasoning (especially around labor, integration, enforcement, and humanitarian systems). This course builds the policy vocabulary and analytical frameworks you need to evaluate proposals, interpret demographic and administrative data, and write balanced recommendations that anticipate implementation constraints.",
      realWorldApplications: [
        "Evaluate immigration policy proposals (legal pathways, enforcement changes, asylum processing) using data + historical evidence",
        "Analyze local impacts (schools, labor markets, public health access) and communicate results without misleading aggregation",
        "Produce a policy brief with stakeholder mapping (community orgs, agencies, employers, courts) and implementation risks"
      ],
      learningOutcomes: [
        "Explain key components of U.S. immigration policy and how policy choices shape flows, status, and integration outcomes",
        "Use demographic and administrative datasets to measure impacts (stocks vs flows, cohorts, geography, time lags)",
        "Critically evaluate competing claims using evidence (causal inference basics, confounding, measurement error)",
        "Write policy recommendations that are feasible, legally aware, and attentive to equity and civil liberties"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/user/MigrationPolicy/videos",
          "https://www.migrationpolicy.org/multimedia/us-immigration-courts-crisis-point",
          "https://www.youtube.com/watch?v=Q9BksP9eAZo"
        ],
        websites: [
          "https://www.migrationpolicy.org/",
          "https://www.pewresearch.org/topic/immigration-migration/",
          "https://www.dhs.gov/immigration-statistics"
        ],
        tools: ["R / Python", "Stata", "Tableau / Power BI", "SQL", "Zotero", "GIS (optional for place-based impacts)"]
      }
    }
  },
  {
    id: "econ-120",
    code: "ECON 120",
    name: "Economics of the Environment and Public Policy",
    fullName: "ECON 120: Economics of the Environment and Public Policy",
    description:
      "Builds the cost-benefit and market-design skills you need to evaluate environmental regulations, weigh policy tradeoffs, and justify recommendations with evidence.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research analysts are constantly asked: “Which policy tool works best, at what cost, and for whom?” This course gives you the economic logic to evaluate regulations (standards), taxes/subsidies, and market-based instruments (cap-and-trade) using welfare and efficiency criteria.",
      realWorldApplications: [
        "Compare carbon tax vs cap-and-trade for emissions reduction (distributional + efficiency tradeoffs)",
        "Cost-benefit analysis of air quality rules (health benefits vs compliance costs)",
        "Design incentive-compatible subsidies and identify unintended consequences"
      ],
      learningOutcomes: [
        "Use welfare economics to evaluate policy interventions (efficiency, externalities, deadweight loss)",
        "Explain and compare environmental policy instruments (standards, taxes, tradable permits)",
        "Apply basic cost-benefit analysis and interpret uncertainty/sensitivity assumptions",
        "Communicate policy recommendations with clear assumptions and defensible metrics"
      ],
      resources: {
        videos: [
          "https://mru.org/courses/principles-economics-microeconomics/what-are-negative-externalities",
          "https://mru.org/courses/principles-economics-microeconomics/clean-air-act-pollution-control",
          "https://www.youtube.com/watch?v=pA6FSy6EKrM"
        ],
        websites: [
          "https://www.epa.gov/environmental-economics",
          "https://www.omb.gov/omb/circulars_a004_a-4/",
          "https://mru.org/"
        ],
        tools: ["R", "Python (pandas)", "Excel / Google Sheets"]
      }
    }
  },
  {
    id: "econ-145",
    code: "ECON 145",
    name: "Health Economics",
    fullName: "ECON 145: Health Economics",
    description:
      "Teaches you how to analyze healthcare markets, incentives, and policy reforms—critical for anyone doing policy research in health, welfare, or budgeting.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Health policy is one of the largest government spending areas, and analysts must evaluate reforms under real-world constraints (insurance incentives, provider behavior, equity). This course helps you reason about costs, access, and outcomes with economic models and measurable policy criteria.",
      realWorldApplications: [
        "Evaluate Medicaid expansion effects on coverage, utilization, and outcomes",
        "Analyze incentives in private insurance markets (moral hazard, adverse selection)",
        "Assess provider payment reforms (fee-for-service vs capitation)"
      ],
      learningOutcomes: [
        "Explain how insurance changes incentives (moral hazard) and who enrolls (selection)",
        "Analyze supply/demand in healthcare markets and interpret price/quantity constraints",
        "Evaluate tradeoffs among cost containment, access, quality, and equity",
        "Translate empirical findings into policy recommendations (what works, for whom, why)"
      ],
      resources: {
        videos: [
          "https://mru.org/courses/principles-economics-microeconomics/moral-hazard-adverse-selection",
          "https://mru.org/courses/principles-economics-microeconomics/lemons-problem-asymmetric-information-health-insurance",
          "https://www.youtube.com/watch?v=LdOx3Abd13g"
        ],
        websites: [
          "https://www.kff.org/",
          "https://www.cms.gov/",
          "https://mru.org/"
        ],
        tools: ["Stata", "R", "Python (statsmodels)"]
      }
    }
  },
  
  {
    id: "econ-155",
    code: "ECON 155",
    name: "Political Economics",
    fullName: "ECON 155: Political Economics",
    description:
      "Connects institutions, incentives, and decision-making—helping you explain why policies happen (or fail) and how to design politically feasible reforms.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy research analysts don’t just ask “What’s optimal?”—they ask “What’s feasible under institutions and incentives?” Political economics helps you analyze electoral competition, agency problems, and institutional constraints that shape policy adoption and implementation.",
      realWorldApplications: [
        "Analyze how electoral incentives influence budget allocations or regulatory enforcement",
        "Explain lobbying, interest groups, and policy capture using incentive frameworks",
        "Model principal–agent problems in public administration (oversight vs performance)"
      ],
      learningOutcomes: [
        "Apply incentive and agency concepts to government and political institutions",
        "Analyze how rules and institutions shape policy outcomes (implementation and accountability)",
        "Evaluate tradeoffs between efficiency and political feasibility",
        "Write clearer causal stories about policy outcomes grounded in incentives and institutions"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=dOhFL6DrYrk",
          "https://www.youtube.com/watch?v=qecuBjHH_2c",
          "https://www.youtube.com/watch?v=FcLGUHXz78I"
        ],
        websites: [
          "https://mru.org/",
          "https://plato.stanford.edu/entries/public-choice/",
          "https://www.nobelprize.org/prizes/economic-sciences/"
        ],
        tools: ["R", "Python", "LaTeX (for memos/reports)"]
      }
    }
  },
  
  {
    id: "soc-116",
    code: "SOC 116",
    name: "Inequality & Public Policy",
    fullName: "SOC 116: Inequality & Public Policy",
    description:
      "Grounds your policy work in real inequality mechanisms (race, gender, class) so your analysis addresses distributional impacts—not just averages.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Policy analysts are expected to quantify who benefits and who bears costs. This course helps you interpret inequality data, connect structural causes to outcomes, and translate equity considerations into measurable policy design choices.",
      realWorldApplications: [
        "Distributional impact analysis of taxes, transfers, and social programs",
        "Policy evaluation using inequality metrics (Gini, poverty rates, mobility indicators)",
        "Equity-focused recommendations (targeting, eligibility rules, administrative burden)"
      ],
      learningOutcomes: [
        "Explain key drivers of inequality using sociological frameworks and evidence",
        "Interpret common inequality indicators and describe policy-relevant implications",
        "Assess how institutions and markets distribute opportunity and resources",
        "Communicate equity tradeoffs clearly in memos (who gains, who loses, why)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=0xMCWr0O3Hs",
          "https://www.youtube.com/watch?v=EP01kx5opEs",
          "https://www.youtube.com/watch?v=dQNKY8q0wz4"
        ],
        websites: [
          "https://inequality.stanford.edu/",
          "https://opportunityinsights.org/",
          "https://rajchetty.com/online-lectures/"
        ],
        tools: ["R (ggplot2)", "Tableau / Power BI", "Python (pandas)"]
      }
    }
  },
  {
    id: "poli-092",
    code: "POLI 092",
    name: "Internship in Political Science",
    fullName: "POLI 092: Internship in Political Science",
    description:
      "Turns your analysis skills into real deliverables (briefs, memos, stakeholder notes) and gives you credible experience for policy-research roles.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable; see note below
      careerRelevance:
        "This is where you prove you can do policy work under real deadlines: synthesize information, communicate with stakeholders, and produce usable outputs. It also builds a portfolio and references—huge for policy research analyst hiring.",
      realWorldApplications: [
        "Draft policy memos and briefing notes for a legislative, advocacy, or research office",
        "Build a small dataset or literature scan to support a policy decision",
        "Present findings to non-technical audiences with clear recommendations"
      ],
      learningOutcomes: [
        "Translate messy real-world questions into tractable research tasks",
        "Write professional memos with options, tradeoffs, and a recommended action",
        "Track progress, document assumptions, and communicate limitations",
        "Develop workplace habits: feedback loops, stakeholder alignment, and accountability"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Gz7X1bla5uc",
          "https://www.youtube.com/watch?v=LqX7ZAWw190",
          "https://www.youtube.com/watch?v=tZM3WUHGenw"
        ],
        websites: [
          "https://polisci.ucmerced.edu/undergraduate-students/internships",
          "https://cape.ucmerced.edu/",
          "https://cape.ucmerced.edu/internships-course-credit"
        ],
        tools: ["Google Docs", "Excel / Sheets", "Notion or Trello"]
      }
    }
  },
  {
    id: "pubp-092",
    code: "PUBP 092",
    name: "Internship in Public Policy",
    fullName: "PUBP 092: Internship in Public Policy",
    description:
      "A direct pipeline to policy-research work: real policy problems, real stakeholders, and a chance to produce publishable-quality analysis artifacts.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable; see note below
      careerRelevance:
        "Public policy internships are the most “resume-visible” proof that you can operate like a junior analyst—especially if you leave with writing samples (memo/brief) and a defined project you can talk about in interviews.",
      realWorldApplications: [
        "Support program evaluation: metrics definitions, outcome tracking, dashboarding",
        "Prepare meeting briefs and stakeholder analysis for policy initiatives",
        "Write recommendations tied to evidence, feasibility, and implementation constraints"
      ],
      learningOutcomes: [
        "Apply analytical frameworks (problem definition → options → evaluation → recommendation)",
        "Use evidence responsibly (data + research synthesis + limitations)",
        "Communicate with policy audiences: clarity, brevity, action-orientation",
        "Build a portfolio: policy memo + data appendix or visuals"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=pRSAl5JUKhw",
          "https://www.youtube.com/watch?v=4WhVgdINLrE",
          "https://www.youtube.com/watch?v=fiyU5RFTLZE"
        ],
        websites: [
          "https://cape.ucmerced.edu/",
          "https://cape.ucmerced.edu/legislative-fellows-program/cape-legislative-internship",
          "https://engage.ucr.edu/internship/uccs"
        ],
        tools: ["Tableau / Power BI", "R or Stata", "Google Slides"]
      }
    }
  },
  {
    id: "econ-092",
    code: "ECON 092",
    name: "Internship in Economics",
    fullName: "ECON 092: Internship in Economics",
    description:
      "Hands-on applied economics experience where you produce analyst-style deliverables (evidence review, cost/impact analysis, memo) and learn how economic reasoning shows up in real policy decisions.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4
      careerRelevance:
        "For a Policy Research Analyst, this internship is a credibility multiplier: it proves you can apply economic frameworks (incentives, tradeoffs, costs/benefits) to real programs and communicate findings to decision-makers. The biggest win is leaving with a concrete artifact—policy memo, research brief, or data-backed recommendation—you can show in interviews.",
      realWorldApplications: [
        "Build a short cost/impact summary for a program proposal (what it costs, who benefits, expected outcomes, risks)",
        "Create a mini-evaluation plan: define outcomes, identify data sources, and propose a method (pre/post, comparison group, diff-in-diff)",
        "Turn messy administrative or survey data into a clean analysis + 2–3 decision-ready charts for a brief"
      ],
      learningOutcomes: [
        "Translate a real stakeholder question into an analyzable economic question with assumptions and measurable outcomes",
        "Apply core tools (descriptive stats, basic inference, cost-effectiveness/cost-benefit logic) in a real setting",
        "Write decision-ready deliverables (1–2 page memo/brief) with clear options, criteria, and a recommendation",
        "Document methods for credibility and reproducibility (data notes, limitations, sensitivity checks)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=HEJlT8t5ezU", // World Bank (verified): What is Impact Evaluation?
          "https://www.youtube.com/watch?v=pmaUUc8r0Tc", // CBO: baseline + cost estimates process/principles
          "https://www.youtube.com/watch?v=SIV7cgMhtlE", // J-PAL: policy brief-style evidence for labor markets
          "https://www.youtube.com/watch?v=WHJ0HC8rSm8"  // CITRIS Policy Lab: writing a Day One policy memo
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67598",
          "https://www.cbo.gov/about/overview",
          "https://www.povertyactionlab.org/policy-insights",
          "https://www.worldbank.org/en/news/video/2016/06/08/what-is-impact-evaluation"
        ],
        tools: [
          "Excel / Google Sheets",
          "Stata or R",
          "Python (pandas, statsmodels)",
          "SQL (basic querying)",
          "Tableau / Power BI",
          "Zotero",
          "RMarkdown / Quarto (clean reporting)"
        ]
      }
    }
  },
  {
    id: "soc-092",
    code: "SOC 092",
    name: "Internship in Sociology",
    fullName: "SOC 092: Internship in Sociology",
    description:
      "Field-facing internship that builds your ability to study real communities, institutions, and programs—then produce a research paper or policy-relevant product grounded in sociological evidence.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4
      careerRelevance:
        "Policy research is often about people + systems, not just numbers. This internship strengthens your qualitative and mixed-method toolkit (interviews, observation, program evaluation logic, equity/administrative burden lenses) and trains you to convert lived realities into evidence that improves policy design and implementation.",
      realWorldApplications: [
        "Conduct stakeholder interviews (clients, staff, community orgs) and synthesize themes into policy-relevant findings",
        "Map how a program actually works (process + bottlenecks + admin burden) and propose implementation fixes",
        "Write a research-backed brief on inequality impacts (who is excluded, why, and what policy changes reduce gaps)"
      ],
      learningOutcomes: [
        "Design and conduct ethical qualitative data collection (interviews, field notes) with a clear research question",
        "Code and analyze qualitative data (thematic analysis) and connect themes to policy options",
        "Evaluate programs from an implementation lens (access barriers, discretion, incentives, unintended impacts)",
        "Produce a polished final artifact (research paper or relevant product) suitable for a portfolio"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7_wfVRXpLMY", // Qualitative interviewing (research methods-focused)
          "https://www.youtube.com/watch?v=5zFcC10vOVY", // Braun & Clarke: thematic analysis intro
          "https://www.youtube.com/watch?v=ocE0najAT_8", // CDC: walking through program evaluation steps
          "https://www.youtube.com/watch?v=tOjieBh1ce0"  // CDC: evaluation framework overview
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68394&print=",
          "https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses",
          "https://www.cdc.gov/evaluation/php/evaluation-framework/index.html"
        ],
        tools: [
          "NVivo / Atlas.ti / MAXQDA (qual coding)",
          "Otter.ai or similar (transcription)",
          "Google Docs (memos/briefs)",
          "Excel / Sheets (simple tracking + summaries)",
          "R or Python (optional mixed-method + visuals)",
          "Zotero (literature management)"
        ]
      }
    }
  },
];

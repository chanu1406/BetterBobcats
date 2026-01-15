/**
 * Public Administration / Nonprofit Program Coordinator Tier Courses Data
 * Course recommendations organized by tier for Public Administration / Nonprofit Program Coordinator career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Public Administration / Nonprofit Program Coordinator roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "mgmt-127",
    code: "MGMT 127",
    name: "Public Sector and Non-profit Management",
    fullName: "MGMT 127: Public Sector and Non-profit Management",
    description:
      "Management principles and practices for public and non-profit organizations.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Directly maps to what Public Administration / Nonprofit Program Coordinators do day-to-day: planning programs, managing stakeholders, budgeting, supervising staff/volunteers, and ensuring accountability to funders and the public. Builds practical management judgment for mission-driven organizations where constraints, politics, and compliance matter.",
      realWorldApplications: [
        "Designing and running a community program (timeline, staffing plan, vendor coordination, deliverables)",
        "Creating a basic nonprofit budget and reporting plan for a grant-funded initiative",
        "Building a board-facing dashboard (outcomes, costs, risks, compliance milestones)",
        "Developing a volunteer management workflow (recruiting, onboarding, scheduling, retention)"
      ],
      learningOutcomes: [
        "Explain key differences between public, nonprofit, and private-sector management constraints",
        "Apply basic budgeting, staffing, and operations planning to mission-driven programs",
        "Use governance concepts (board roles, accountability, transparency) to evaluate org decisions",
        "Identify common compliance/risk areas (conflicts of interest, reporting, procurement, data privacy)",
        "Communicate program results using outcomes and simple performance measures"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=8wlVpJLIkkk", // Intro to Nonprofit Management (MacEwan)
          "https://www.youtube.com/watch?v=gGFxNnBXFzc", // Nonprofit Governance: Board Roles & Responsibilities
          "https://www.youtube.com/watch?v=cj_G6i1bvys", // Nonprofit Mgmt & Leadership Series (social enterprise)
          "https://www.youtube.com/watch?v=_lbRXvQqdSA"  // Non-Profit Sector - Introduction
        ],
        websites: [
          "https://www.councilofnonprofits.org/",
          "https://www.nonprofitready.org/",
          "https://www.candid.org/", // GuideStar/learning + nonprofit research ecosystem
          "https://www.grants.gov/",
          "https://www.rework.withgoogle.com/"
        ],
        tools: [
          "Google Sheets / Microsoft Excel (budgets, staffing plans, reporting)",
          "Airtable (program tracking + lightweight CRM)",
          "Trello or Asana (project/program management)",
          "Miro or Lucidchart (logic models, workflows, stakeholder maps)",
          "Canva (program outreach materials)",
          "Salesforce (Nonprofit/CRM basics) or HubSpot CRM"
        ]
      }
    }
  },
  {
    id: "mgmt-122",
    code: "MGMT 122",
    name: "Teams and Organizations",
    fullName: "MGMT 122: Teams and Organizations",
    description:
      "Study of team dynamics and organizational structures in workplace settings.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Program coordinators live inside cross-functional work: partners, volunteers, staff, leadership, and community stakeholders. This course strengthens your ability to build effective teams, prevent coordination failures, and design roles/processes that keep programs running smoothly.",
      realWorldApplications: [
        "Running partner meetings with clear agendas, ownership, and follow-through",
        "Designing a volunteer team structure (roles, escalation paths, handoffs)",
        "Reducing conflict and miscommunication between departments (e.g., finance vs program staff)",
        "Improving team performance using psychological safety and clear goals"
      ],
      learningOutcomes: [
        "Diagnose common team failures (role ambiguity, weak norms, conflict avoidance, poor accountability)",
        "Use core group dynamics concepts to improve communication and decision-making",
        "Design team structures (roles, processes, metrics) aligned to program goals",
        "Apply evidence-based practices for trust, feedback, and conflict resolution",
        "Run effective meetings and coordinate work across stakeholders"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=DXgMV0Gmf08", // Amy Edmondson on Psychological Safety / Google Aristotle
          "https://www.youtube.com/watch?v=LhoLuui9gX8", // Psychological safety talk (Amy Edmondson)
          "https://www.youtube.com/watch?v=r1W0uAnxDFc", // Five Dysfunctions animated summary
          "https://www.youtube.com/watch?v=mrqQsbRHxxs"  // Teams & Group Dynamics lecture
        ],
        websites: [
          "https://rework.withgoogle.com/intl/en/guides/understanding-team-effectiveness/",
          "https://www.shrm.org/",
          "https://hbr.org/topic/leadership",
          "https://www.atlassian.com/team-playbook",
          "https://www.mindtools.com/"
        ],
        tools: [
          "Notion (team docs, SOPs, meeting notes, decision logs)",
          "Google Workspace or Microsoft 365 (collaboration + calendars)",
          "Slack or Microsoft Teams (communication norms + channels)",
          "Trello / Asana (task ownership + visibility)",
          "RACI matrix template (role clarity)",
          "Doodle / When2meet (stakeholder scheduling)"
        ]
      }
    }
  },
  {
    id: "mgmt-124",
    code: "MGMT 124",
    name: "Organizational Behavior and Leadership",
    fullName: "MGMT 124: Organizational Behavior and Leadership",
    description:
      "Examination of organizational behavior, leadership principles, and management practices.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Nonprofit and public programs rely on influence more than authority—especially when coordinating partners or volunteers. This course gives you practical leadership tools: motivation, culture, feedback, change management, and managing up/down/across.",
      realWorldApplications: [
        "Leading a program rollout with change management and stakeholder buy-in",
        "Motivating volunteers with non-monetary incentives and mission alignment",
        "Handling performance issues fairly (feedback, coaching, documentation)",
        "Shaping org culture through norms, incentives, and communication"
      ],
      learningOutcomes: [
        "Explain how individual behavior, group dynamics, and organizational systems interact",
        "Apply leadership approaches to different contexts (crisis, growth, constrained resources)",
        "Use motivation and incentives ethically in mission-driven organizations",
        "Deliver effective feedback and coaching conversations",
        "Plan and communicate organizational change to reduce resistance"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=-sLHfYnxh8s", // NPTEL/IITKgp OB intro lecture
          "https://www.youtube.com/playlist?list=PLbMVogVj5nJQYXoO3foSZ6CrU7aCCwTsb", // NPTEL IIT Kharagpur OB playlist
          "https://www.youtube.com/watch?v=XzilJetNbmQ", // OB Leadership lecture (Robbins & Judge ch.12)
          "https://www.youtube.com/watch?v=8HPklUnJvok"  // Leadership chapter lecture
        ],
        websites: [
          "https://nptel.ac.in/courses/110105034",
          "https://hbr.org/",
          "https://www.mindtools.com/",
          "https://rework.withgoogle.com/",
          "https://www.apa.org/topics/organizational-behavior"
        ],
        tools: [
          "OKRs (Objectives & Key Results) templates",
          "1:1 meeting template + feedback logs",
          "Stakeholder map template",
          "Simple pulse survey tools (Google Forms / Microsoft Forms)",
          "Miro (org charts, influence maps, change plans)"
        ]
      }
    }
  },
  {
    id: "mgmt-123",
    code: "MGMT 123",
    name: "Business Ethics",
    fullName: "MGMT 123: Business Ethics",
    description:
      "Ethical principles and decision-making in business and organizational contexts.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Public and nonprofit work is high-trust and high-accountability: conflicts of interest, procurement choices, equity impacts, data privacy, and transparency decisions come up constantly. This course builds a structured way to make defensible ethical decisions and communicate them to stakeholders.",
      realWorldApplications: [
        "Creating a conflict-of-interest policy for staff and board members",
        "Handling a donor/funder request that conflicts with mission or equity goals",
        "Designing fair hiring/volunteer selection practices",
        "Building a “speak-up” process for ethics concerns and compliance issues"
      ],
      learningOutcomes: [
        "Apply ethical frameworks (consequences, duties/rights, justice/fairness, virtue) to cases",
        "Identify common organizational ethics failures (incentives, power, culture, blind spots)",
        "Make and defend ethical decisions using a repeatable framework",
        "Recognize governance and accountability expectations in mission-driven orgs",
        "Practice values-based communication and escalation when facing pressure"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL30C13C91CFFEFEA6", // Harvard: Justice (Sandel)
          "https://www.youtube.com/watch?v=tcHUhOPaXEU", // Business Ethics intro lesson
          "https://www.youtube.com/watch?v=X0ETFcS9dVA", // Giving Voice to Values talk
          "https://www.youtube.com/watch?v=Libm5PSWCBg"  // Ethics Unwrapped: Giving Voice to Values trailer
        ],
        websites: [
          "https://www.scu.edu/ethics/ethics-resources/ethical-decision-making/",
          "https://www.scu.edu/ethics/ethics-resources/a-framework-for-ethical-decision-making/",
          "https://ethicsunwrapped.utexas.edu/",
          "https://hbr.org/topic/ethics",
          "https://oig.hhs.gov/" // example: public-sector oversight mindset
        ],
        tools: [
          "Ethical decision-making checklist (Markkula-style framework)",
          "Decision log template (context, options, stakeholders, rationale, mitigations)",
          "Conflict-of-interest disclosure form template",
          "Whistleblower / speak-up policy template",
          "Risk register (likelihood/impact/mitigation)"
        ]
      }
    }
  },
  {
    id: "pubp-110",
    code: "PUBP 110",
    name: "Poverty and Social Policy",
    fullName: "PUBP 110: Poverty and Social Policy",
    description:
      "Analysis of poverty drivers and evaluation of social safety-net policy options.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Program coordinators need to understand why needs exist (structural drivers, labor markets, housing, health) and how policies shape outcomes. This course helps you design programs that align with real policy constraints, connect clients to benefits, and evaluate whether interventions reduce harm.",
      realWorldApplications: [
        "Building a resource navigation workflow for SNAP/Medicaid/housing support referrals",
        "Using basic data to justify a program (who is impacted, what gaps exist, what outcomes matter)",
        "Evaluating a policy proposal’s likely effects on poverty and inequality",
        "Designing outreach strategies to reduce access barriers (language, stigma, eligibility confusion)"
      ],
      learningOutcomes: [
        "Explain major drivers of poverty and inequality (economic, social, historical, policy-based)",
        "Compare common anti-poverty policies and tradeoffs (cash, in-kind benefits, tax credits, services)",
        "Interpret poverty measures and basic program outcome metrics",
        "Assess policy arguments and evidence quality (what counts as good evaluation)",
        "Connect policy context to realistic program design and implementation"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=IjbJZ5jspzE", // Khan Academy: absolute vs relative poverty
          "https://www.youtube.com/watch?v=FFD8YHNy2XU", // America's Safety Net series intro
          "https://www.youtube.com/watch?v=styDL3Uaepc", // Reducing Poverty and Increasing Opportunity (panel)
          "https://www.youtube.com/playlist?list=PLrI3Iy0dqgpTGIDcDYoGhy279pmJmoLfN" // Brookings Explainers playlist
        ],
        websites: [
          "https://www.urban.org/",
          "https://www.cbpp.org/", // Center on Budget and Policy Priorities
          "https://www.brookings.edu/",
          "https://www.kff.org/", // health + safety net policy explainers
          "https://aspe.hhs.gov/" // policy evaluation + poverty/welfare research
        ],
        tools: [
          "Excel/Sheets (basic analysis: rates, trend lines, dashboards)",
          "Tableau Public or Power BI (simple program dashboards)",
          "Logic model / Theory of Change template",
          "Survey tools (Qualtrics / Google Forms) for program evaluation",
          "US Census data tools (e.g., data.census.gov) for local context"
        ]
      }
    }
  },
  {
    id: "poli-112",
    code: "POLI 112",
    name: "Public Policy: Analysis, Strategy, and Impact",
    fullName: "POLI 112: Public Policy: Analysis, Strategy, and Impact",
    description:
      "Examination of policy analysis, development, and implementation processes.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Core skill-course for Public Administration / Nonprofit Program Coordinators because it teaches how to define public problems, compare policy options, anticipate tradeoffs, and understand how implementation actually works. This directly supports writing program proposals, advising stakeholders, and evaluating whether a program is having the intended impact.",
      realWorldApplications: [
        "Writing a short policy memo comparing 2–3 program options with criteria (cost, equity, feasibility, political support)",
        "Building an implementation plan (stakeholders, timeline, risks, procurement/compliance checkpoints)",
        "Creating a simple impact framework (inputs → activities → outputs → outcomes) for a nonprofit program",
        "Preparing a briefing for leadership/community partners with evidence-based recommendations"
      ],
      learningOutcomes: [
        "Define a policy problem precisely and identify root causes vs symptoms",
        "Construct and compare policy/program alternatives using explicit evaluation criteria",
        "Assess feasibility (legal, administrative capacity, stakeholder politics, budget constraints)",
        "Explain implementation challenges and how to mitigate them (incentives, compliance, coordination)",
        "Translate analysis into clear deliverables (memos, briefings, recommendation decks)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=jR5AQ4_qWlo", // overview: policy analysis + policy process
          "https://www.youtube.com/watch?v=1XvfMgHYJ4g", // HKS-style framing: policy analysis as problem solving
          "https://www.youtube.com/watch?v=xblEd00hNsI", // Bardach eightfold path applied
          "https://www.youtube.com/playlist?list=PL8ZjiW3LUD0v5UxytVeFtMB_U1NPAeYPj", // Goldman School 8FP playlist
          "https://www.youtube.com/watch?v=Vz1XiZXYJhA" // data storytelling for policy influence
        ],
        websites: [
          "https://www.hks.harvard.edu/courses/policy-analysis-tool-evidence-based-decision-making",
          "https://www.cdc.gov/policy/polaris/index.html",
          "https://www.urban.org/",
          "https://www.cbpp.org/",
          "https://www.brookings.edu/"
        ],
        tools: [
          "Google Docs (policy memos, stakeholder briefs)",
          "Google Sheets / Excel (cost comparisons, scenario tables)",
          "Airtable or Notion (stakeholder + task tracking)",
          "Miro / Lucidchart (problem trees, logic models, implementation maps)",
          "Tableau Public or Power BI (impact dashboards)"
        ]
      }
    }
  },

  {
    id: "econ-050",
    code: "ECON 050",
    name: "Introduction to Business Analytics and Spreadsheets",
    fullName: "ECON 050: Introduction to Business Analytics and Spreadsheets",
    description:
      "Introduction to business analytics and spreadsheet applications for data analysis.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Program coordinators constantly live in spreadsheets—budgets, grant tracking, vendor quotes, attendance, outcomes, and reporting. This course builds the spreadsheet + analytics foundation to manage programs with data, create clean reports for funders, and make decisions using evidence instead of vibes.",
      realWorldApplications: [
        "Building a program budget workbook (monthly burn, staffing costs, variance vs plan)",
        "Creating a grant tracker (deliverables, due dates, documentation, reimbursement status)",
        "Cleaning and merging attendance/outcome datasets for quarterly reporting",
        "Producing a dashboard with pivot tables + charts (participants served, cost per outcome, trends)"
      ],
      learningOutcomes: [
        "Use core spreadsheet functions for analysis (logical, lookup, text, date, aggregation)",
        "Clean and structure data for analysis (consistent fields, validation, handling missing values)",
        "Summarize data with pivot tables and build basic dashboards",
        "Communicate insights with clear charts and narrative-friendly tables",
        "Create repeatable templates for program reporting and decision support"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=pCJ15nGFgVg", // Excel for Data Analytics (full course)
          "https://www.youtube.com/watch?v=UsdedFoTA68", // Pivot Tables explained (very high views)
          "https://www.youtube.com/watch?v=Yv7QBZXEDDc", // Pivot from multiple sheets (Power Query approach)
          "https://www.youtube.com/watch?v=0aeZX1l4JT4", // Power Query (cleaning/transform)
          "https://www.youtube.com/watch?v=EBURVdnGN9g" // business dashboards in Excel
        ],
        websites: [
          "https://support.microsoft.com/excel",
          "https://learn.microsoft.com/en-us/training/",
          "https://www.khanacademy.org/economics-finance-domain/core-finance",
          "https://www.coursera.org/specializations/business-analytics",
          "https://www.freecodecamp.org/news/learn-microsoft-excel/"
        ],
        tools: [
          "Microsoft Excel (pivot tables, charts, Power Query)",
          "Google Sheets (collaboration + lightweight dashboards)",
          "Power BI (optional next step for reporting dashboards)",
          "Tableau Public (optional next step for visualization)",
          "Notion / Airtable (lightweight program databases + views)"
        ]
      }
    }
  },
  {
    id: "soc-116",
    code: "SOC 116",
    name: "Inequality & Public Policy",
    fullName: "SOC 116: Inequality & Public Policy",
    description:
      "Analysis of inequality mechanisms and their relationship to public policy.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Public/nonprofit programs are usually built to reduce harm from inequality (income, wealth, race, gender, neighborhood, education, health access). This course helps you understand the mechanisms behind inequality so you can design programs that target the real bottlenecks, anticipate unintended consequences, and justify interventions with evidence.",
      realWorldApplications: [
        "Using inequality data to justify a program proposal (need statement + target population + barriers)",
        "Designing outreach that reduces access barriers (language, transportation, stigma, eligibility complexity)",
        "Evaluating whether a policy/program is likely to reduce inequality or simply shift who benefits",
        "Creating equity-focused metrics (who is reached, who is left out, differential outcomes)"
      ],
      learningOutcomes: [
        "Explain key drivers of inequality (institutions, labor markets, education, housing, discrimination, policy design)",
        "Interpret common inequality measures and data sources (trends over time, subgroup comparisons)",
        "Connect policy tools to likely distributional effects (who gains, who loses, why)",
        "Critically evaluate claims about inequality using evidence quality and causal reasoning",
        "Translate inequality analysis into actionable program design and equity metrics"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=0xMCWr0O3Hs", // Crash Course Econ: income & wealth inequality
          "https://www.youtube.com/watch?v=3ep8sbJzfG0", // Stanford poverty & inequality course module
          "https://www.youtube.com/watch?v=Okx9l1g99es", // Raj Chetty: equality of opportunity research
          "https://www.youtube.com/watch?v=5PWkDhnChik", // Stanford talk on poverty & inequality
          "https://www.youtube.com/watch?v=sPy00O0-Uqg" // perceptions vs reality of wealth distribution
        ],
        websites: [
          "https://pip.worldbank.org/",
          "https://wid.world/",
          "https://ourworldindata.org/economic-inequality",
          "https://www.wider.unu.edu/project/world-income-inequality-database-wiid",
          "https://www.urban.org/"
        ],
        tools: [
          "Excel / Google Sheets (inequality trend tables, subgroup comparisons)",
          "Data.census.gov (US demographic + socioeconomic tables)",
          "FRED (macro & inequality-related indicators for context)",
          "Tableau Public / Power BI (equity dashboards)",
          "Logic model + equity metric templates (reach, access, outcomes by subgroup)"
        ]
      }
    }
  },
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses that strengthen Public Administration / Nonprofit Program Coordinator skills
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "ph-209a",
    code: "PH 209A",
    name: "Grant Writing for Public Health I",
    fullName: "PH 209A: Grant Writing for Public Health I",
    description:
      "Introduction to grant writing principles and practices for public health programs.",
    tier: 2,
    expandedInfo: {
      credits: 2,
      careerRelevance:
        "For Public Administration / Nonprofit Program Coordinators, funding is oxygen. This course builds the practical skill of turning a community need into a fundable proposal (problem statement, goals, activities, budget, and evaluation), which directly supports winning grants and sustaining programs.",
      realWorldApplications: [
        "Writing a needs statement + problem framing for a community health/nonprofit program",
        "Drafting a proposal narrative with SMART objectives, timeline, and staffing plan",
        "Building a basic line-item budget + budget justification for a grant application",
        "Creating a simple evaluation plan using a logic model and measurable outcomes"
      ],
      learningOutcomes: [
        "Identify appropriate funders and interpret funding opportunity requirements",
        "Write core proposal sections (need, goals/objectives, approach, evaluation, sustainability)",
        "Develop a compliant, realistic budget aligned to program activities",
        "Use logic models to connect activities to outputs and outcomes",
        "Strengthen persuasiveness through clarity, evidence, and reviewer-oriented writing"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=EX4gO69AGo0", // NIH-focused grant writing tips webinar
          "https://www.youtube.com/watch?v=KtwAMvjzvcI", // NIH grants process walk-through for beginners
          "https://www.youtube.com/watch?v=tspsdBgFofg", // Submitting an NIH grant using ASSIST (step-by-step)
          "https://www.youtube.com/watch?v=XgdZkQbMLBY", // Program logic model intro (great for evaluation sections)
          "https://www.youtube.com/watch?v=kdZN8zq8KOY"  // Using logic models for outcomes + evaluation
        ],
        websites: [
          "https://grants.nih.gov/node/1", // NIH Grants & Funding hub
          "https://www.grants.gov/applicants/workspace-overview", // Grants.gov Workspace overview
          "https://grants.nih.gov/grants-process/plan-to-apply/plan-within-your-organization/submission-options/using-assist-to-prepare-your-application", // NIH ASSIST guide
          "https://www.cdc.gov/evaluation/php/evaluation-framework/index.html", // CDC Evaluation Framework
          "https://www.candid.org/" // nonprofit grant + org research ecosystem
        ],
        tools: [
          "NIH ASSIST (application preparation/submission)", // NIH
          "NIH eRA Commons (account + submission tracking)", // NIH
          "Grants.gov Workspace (federal grant collaboration/submission)",
          "Zotero (citations + evidence library)",
          "Google Docs (collaborative proposal drafting)",
          "Google Sheets / Excel (budgets, timelines, reporting templates)"
        ]
      }
    }
  },
{
    id: "ph-209b",
    code: "PH 209B",
    name: "Grant Writing for Public Health II",
    fullName: "PH 209B: Grant Writing for Public Health II",
    description:
      "Advanced grant writing techniques and strategies for public health funding.",
    tier: 2,
    expandedInfo: {
      credits: 2,
      careerRelevance:
        "Advances you from “can draft proposals” to “can win competitive funding.” For coordinators, this means mastering strategy: aligning with reviewer criteria, strengthening outcomes/evaluation, building partnerships/letters of support, and packaging a complete submission (often NIH-style).",
      realWorldApplications: [
        "Producing a full submission-ready application packet with attachments and compliance checks",
        "Writing a high-impact Specific Aims / executive summary that sells the program quickly",
        "Developing a stronger evaluation design (comparison groups, data collection plan, metrics)",
        "Creating a resubmission plan using reviewer feedback and a response-to-critique memo"
      ],
      learningOutcomes: [
        "Write reviewer-oriented narratives that map directly to scoring criteria",
        "Develop strong “Specific Aims” / objectives pages and compelling significance arguments",
        "Strengthen rigor of evaluation and measurement plans",
        "Coordinate complex submissions (biosketches, letters, attachments, compliance)",
        "Revise effectively using critique, clarity, and alignment to funder priorities"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=LSjhwAZ-FWU", // NIH F31s made (almost) simple
          "https://www.youtube.com/watch?v=JfXFmvNdnaI", // Writing a high-impact NIH Specific Aims page (bootcamp)
          "https://www.youtube.com/watch?v=ML5F4rPv9is", // NIH Biosketch tips (common attachment)
          "https://www.youtube.com/watch?v=EX4gO69AGo0", // Grant Writing for Success (NIH webinar)
          "https://www.youtube.com/watch?v=tspsdBgFofg"  // ASSIST submission steps
        ],
        websites: [
          "https://grants.nih.gov/grants-process/write-application/how-to-apply-application-guide",
          "https://public.era.nih.gov/assist/public/login.era", // ASSIST info
          "https://www.era.nih.gov/help-tutorials/era-commons/overview.htm", // eRA Commons overview
          "https://www.grants.gov/forms", // standard federal forms context
          "https://www.cdc.gov/evaluation/php/evaluation-framework-action-guide/step-2-describe-the-program.html" // logic model step
        ],
        tools: [
          "NIH ASSIST",
          "NIH eRA Commons",
          "Grants.gov Workspace",
          "Canva (clean one-pagers/figures for proposals when allowed)",
          "Miro / Lucidchart (logic models, workflows, implementation diagrams)",
          "Airtable (submission checklist + collaborator tracking)"
        ]
      }
    }
  },

  {
    id: "ph-112",
    code: "PH 112",
    name: "Research Methods: Health Services Research and Public Health",
    fullName: "PH 112: Research Methods: Health Services Research and Public Health",
    description:
      "Research design and evaluation methods for health services and public health programs.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Program coordinators are expected to prove impact. This course gives you the evaluation and research-method backbone to design surveys, interpret program data, and report results credibly to funders, leadership, and community stakeholders.",
      realWorldApplications: [
        "Designing a program evaluation plan (questions, indicators, data sources, timeline)",
        "Building a survey + data collection workflow for participants served",
        "Analyzing pre/post outcome data and summarizing it for a quarterly report",
        "Selecting an appropriate study design when randomization isn’t possible"
      ],
      learningOutcomes: [
        "Distinguish major study designs (experimental, quasi-experimental, observational) and when to use each",
        "Identify common threats to validity and practical ways to reduce bias",
        "Choose appropriate measures/indicators and build a feasible data collection plan",
        "Communicate results clearly (tables, simple visuals, limitations, implications)",
        "Understand how methods connect to public-sector accountability and program improvement"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=wxL0-REyleg", // Health services research: concepts + methods
          "https://www.youtube.com/watch?v=bwOqGpeKOSI", // Quasi-experimental analytic methods (HSR)
          "https://www.youtube.com/watch?v=WNGY7E6HkVI", // Evaluating a health/social care service
          "https://www.youtube.com/watch?v=VxFELTPm2WU", // Creating a logic model for evaluation
          "https://www.youtube.com/watch?v=opp5tH4uD-w"  // Qualitative data analysis fundamentals
        ],
        websites: [
          "https://www.cdc.gov/evaluation/php/evaluation-framework/index.html",
          "https://effectivehealthcare.ahrq.gov/research-methods",
          "https://academyhealth.org/sites/default/files/what_is_health_services_research_one-pager_0.pdf",
          "https://data.census.gov/",
          "https://www.kff.org/"
        ],
        tools: [
          "Excel / Google Sheets (cleaning + summaries)",
          "Qualtrics or Google Forms (surveys)",
          "R or Python (basic stats, charts, reproducible reporting)",
          "Tableau Public or Power BI (simple dashboards)",
          "REDCap (common public-health data capture platform, if available)"
        ]
      }
    }
  },

  {
    id: "ph-205",
    code: "PH 205",
    name: "Health Services Research and Policy",
    fullName: "PH 205: Health Services Research and Policy",
    description:
      "Research methods and policy analysis for health services and healthcare systems.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Useful if you coordinate programs tied to healthcare systems (clinics, public health agencies, social services partnerships). You’ll gain the ability to analyze access/quality/cost problems and translate evidence into policy or operational recommendations—exactly what funders and public-sector leaders want.",
      realWorldApplications: [
        "Evaluating access-to-care barriers and proposing policy/program fixes",
        "Assessing quality improvement initiatives using real-world administrative data",
        "Estimating cost implications of a program change (before/after comparisons)",
        "Writing a brief that connects evidence to feasible implementation steps"
      ],
      learningOutcomes: [
        "Explain how health systems are organized and how policy shapes delivery, access, and cost",
        "Apply health services research concepts (quality, access, cost, dissemination) to real problems",
        "Interpret evidence from routinely collected data and policy research",
        "Evaluate tradeoffs and feasibility for health-policy or program proposals",
        "Communicate findings to decision-makers with clear recommendations"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=wxL0-REyleg", // HSR overview
          "https://www.youtube.com/watch?v=xh7ChXW0hGY", // Routinely collected health data for research/reporting
          "https://www.youtube.com/watch?v=J3Sh-vs5bdg", // Propensity score matching tutorial (practical)
          "https://www.youtube.com/watch?v=bwOqGpeKOSI", // Quasi-experimental methods
          "https://www.youtube.com/watch?v=tOjieBh1ce0"  // CDC evaluation framework overview
        ],
        websites: [
          "https://academyhealth.org/evidence/methods/hsr-resources-methods",
          "https://effectivehealthcare.ahrq.gov/research-methods",
          "https://www.cdc.gov/mmwr/volumes/73/rr/rr7306a1.htm",
          "https://www.ncbi.nlm.nih.gov/books/NBK57002/",
          "https://www.cms.gov/" // real policy/coverage context
        ],
        tools: [
          "Excel / Sheets (policy tables, cost models, reporting)",
          "R or Python (causal inference basics, regression, matching)",
          "Tableau / Power BI (decision dashboards)",
          "Notion (policy memo templates + evidence library)",
          "Zotero (evidence + citations)"
        ]
      }
    }
  },
  {
    id: "soc-140",
    code: "SOC 140",
    name: "Organizational Behavior",
    fullName: "SOC 140: Organizational Behavior",
    description:
      "Sociological analysis of organizational behavior and workplace dynamics.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Program coordinators operate inside organizations with bureaucracy, power, incentives, and institutional constraints. This course helps you understand how org structures shape outcomes—so you can navigate politics, improve coordination, and design processes that actually work in public/nonprofit settings.",
      realWorldApplications: [
        "Mapping stakeholder power and decision flow to get approvals faster",
        "Redesigning a volunteer/staff workflow to reduce bottlenecks and handoff failures",
        "Diagnosing why an org initiative fails (misaligned incentives, weak norms, unclear roles)",
        "Managing change in a bureaucratic setting with resistance and limited authority"
      ],
      learningOutcomes: [
        "Explain how modern organizations evolved (bureaucracy, strategy, environments) and why that matters",
        "Analyze how structure and culture shape behavior and performance",
        "Identify incentives and informal power dynamics that affect implementation",
        "Apply organizational theory to case studies in public/nonprofit workplaces",
        "Design practical interventions: clearer roles, better processes, stronger accountability"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=6_3VHAAJddY", // Organization Theory lecture (series-style)
          "https://www.youtube.com/watch?v=GkB6dQT4Y-M", // Intro to organization theory (university lecture)
          "https://www.youtube.com/watch?v=zp554tcdWO8", // Max Weber bureaucracy (org life foundation)
          "https://www.youtube.com/playlist?list=PLbMVogVj5nJQYXoO3foSZ6CrU7aCCwTsb", // OB fundamentals (structured playlist)
          "https://www.youtube.com/watch?v=DXgMV0Gmf08" // Psychological safety / team effectiveness (useful for practice)
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68408&print=",
          "https://hbr.org/topic/organizational-culture",
          "https://www.mindtools.com/",
          "https://rework.withgoogle.com/intl/en/guides/understanding-team-effectiveness/",
          "https://www.shrm.org/"
        ],
        tools: [
          "RACI matrix template (role clarity)",
          "Decision log template (track decisions + owners)",
          "Notion or Google Docs (SOPs, meeting notes, org knowledge base)",
          "Trello/Asana (workflow visibility + accountability)",
          "Miro/Lucidchart (org charts, process maps, stakeholder maps)"
        ]
      }
    }
  },
  {
    id: "econ-005",
    code: "ECON 005",
    name: "Introduction to Business and Finance",
    fullName: "ECON 005: Introduction to Business and Finance",
    description: "Fundamental concepts of business operations and financial management.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Public Administration / Nonprofit Program Coordinators regularly manage budgets, contracts, and funding tradeoffs. This course builds the business + finance basics needed to read budgets, evaluate purchases/program expansions, and communicate clearly with finance teams and funders.",
      realWorldApplications: [
        "Building a program budget with staffing, vendor costs, and overhead allocation",
        "Comparing purchase/lease or vendor bids using time value of money thinking",
        "Interpreting basic financial statements for a nonprofit (revenue, expenses, cash flow)",
        "Explaining financial tradeoffs to stakeholders (what we can fund now vs later)"
      ],
      learningOutcomes: [
        "Understand core business functions (operations, marketing, finance) and how they connect",
        "Apply time value of money concepts to real decisions (savings, loans, project payoffs)",
        "Read and summarize basic financial statements and budget reports",
        "Evaluate a simple investment/project decision using cash-flow logic",
        "Communicate financial reasoning in plain language to non-finance stakeholders"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLSQl0a2vh4HAyJUEdhnxoEFKSoKaZpTNT",
          "https://www.youtube.com/watch?v=UnQTs_q7Juo",
          "https://ocw.mit.edu/courses/15-s21-nuts-and-bolts-of-business-plans-january-iap-2014/video_galleries/lecture-videos/"
        ],
        websites: [
          "https://www.khanacademy.org/economics-finance-domain/core-finance",
          "https://ocw.mit.edu/",
          "https://fred.stlouisfed.org/"
        ],
        tools: [
          "Google Sheets / Microsoft Excel (budgets, cash-flow tables)",
          "Canva (simple budget one-pagers for stakeholders)",
          "Notion or Airtable (program finance tracking + documentation)"
        ]
      }
    }
  },
  {
    id: "econ-102",
    code: "ECON 102",
    name: "Managerial Economics",
    fullName: "ECON 102: Managerial Economics",
    description: "Application of economic principles to managerial decision-making.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Managerial economics helps coordinators make sharper decisions under constraints: pricing/fees (when relevant), resource allocation, demand/participation forecasting, and tradeoffs. It’s especially useful when you’re deciding which programs to scale, which services to subsidize, or how to prioritize limited staff time.",
      realWorldApplications: [
        "Estimating how program participation changes when requirements, fees, or outreach change",
        "Allocating staff hours across initiatives using marginal benefit vs marginal cost thinking",
        "Choosing between vendors/program designs using cost, capacity, and demand assumptions",
        "Building a simple break-even / cost-effectiveness comparison for program options"
      ],
      learningOutcomes: [
        "Use marginal analysis for practical decisions (what to expand, cut, or redesign)",
        "Apply demand, elasticity, and pricing concepts to real-world scenarios",
        "Analyze costs (fixed vs variable) and scale decisions",
        "Understand competition/market structure basics and how they affect outcomes",
        "Turn qualitative constraints into simple quantitative decision frameworks"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLbMVogVj5nJRTAVF4-tueujAFiLKIV3Mo",
          "https://www.youtube.com/watch?v=vLPpF0hunwc",
          "https://nptel.ac.in/courses/110105075"
        ],
        websites: [
          "https://ocw.mit.edu/",
          "https://www.khanacademy.org/economics-finance-domain",
          "https://fred.stlouisfed.org/"
        ],
        tools: [
          "Excel / Google Sheets (cost curves, scenario tables)",
          "Solver (Excel Solver) for constrained optimization basics",
          "Tableau Public / Power BI (optional: reporting + dashboards)"
        ]
      }
    }
  },
  {
    id: "econ-151",
    code: "ECON 151",
    name: "The Economics of Government and Business",
    fullName: "ECON 151: The Economics of Government and Business",
    description: "Analysis of economic relationships between government and business sectors.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "This course matches the reality of public/nonprofit work: programs are shaped by government budgets, taxes, incentives, and partnerships with private organizations. It helps you understand how policy choices influence costs, behavior, and outcomes—so your programs align with how funding and implementation actually work.",
      realWorldApplications: [
        "Understanding how government revenue/expenditure choices affect program funding stability",
        "Designing partnerships with private vendors while accounting for incentives and accountability",
        "Evaluating a policy proposal’s likely economic impacts on service demand and equity",
        "Explaining why certain funding structures create unintended outcomes (or perverse incentives)"
      ],
      learningOutcomes: [
        "Explain core public finance ideas: spending, taxation, incentives, and tradeoffs",
        "Assess how government decisions influence business behavior and service delivery",
        "Analyze winners/losers and distributional impacts of policy choices",
        "Connect economic reasoning to implementation constraints and stakeholder politics",
        "Communicate policy-economic reasoning clearly to non-economists"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=leRCvilKEgs",
          "https://www.youtube.com/watch?v=NEcfy0HpewQ",
          "https://www.youtube.com/watch?v=pBSkHQv_SLg"
        ],
        websites: [
          "https://fred.stlouisfed.org/",
          "https://www.cbpp.org/",
          "https://www.brookings.edu/"
        ],
        tools: [
          "Excel / Sheets (policy cost tables, scenario comparisons)",
          "FRED (quick macro context for memos/dashboards)",
          "Notion (policy memo templates + evidence library)"
        ]
      }
    }
  },
  {
    id: "econ-158",
    code: "ECON 158",
    name: "Economics of Regulation",
    fullName: "ECON 158: Economics of Regulation",
    description: "Economic analysis of regulatory policies and their impacts.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Regulation shapes what public agencies and nonprofits can do (compliance, reporting, procurement, privacy, labor rules, funding restrictions). This course helps you reason about why regulations exist, when they work, when they fail, and how to anticipate the real-world impacts of rule changes on programs and communities.",
      realWorldApplications: [
        "Assessing how a proposed rule change could affect program eligibility, cost, or reporting workload",
        "Explaining tradeoffs between consumer protection, competition, and administrative burden",
        "Building a compliance-aware implementation plan (requirements, deadlines, documentation)",
        "Using basic welfare/incentive logic to evaluate a regulation’s likely side effects"
      ],
      learningOutcomes: [
        "Explain economic rationales for regulation (market power, externalities, information problems)",
        "Analyze how different regulatory designs change incentives and outcomes",
        "Evaluate tradeoffs: efficiency, equity, compliance burden, and unintended consequences",
        "Understand regulatory processes (proposals, comments, final rules) at a practical level",
        "Translate regulatory analysis into clear recommendations for decision-makers"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLaMyPT8Jkw7lvX-axDmVdbk1LuFxHNivX",
          "https://www.youtube.com/watch?v=yGUM8xFFBiw",
          "https://www.youtube.com/playlist?list=PLgSqPvnF6GM0LWu7vG6Jr3DFB0m2KzEH0"
        ],
        websites: [
          "https://www.regulations.gov/",
          "https://www.govinfo.gov/app/collection/fr",
          "https://www.reginfo.gov/public/",
          "https://www.coursera.org/learn/economics-of-reforms-and-regulations-1"
        ],
        tools: [
          "Regulations.gov (track dockets + comments)",
          "Reginfo.gov (OIRA review tracking)",
          "Excel / Sheets (impact tables, compliance checklists, scenario analysis)",
          "Zotero (evidence + citations for policy/regulatory memos)"
        ]
      }
    }
  },

  {
    id: "engr-175",
    code: "ENGR 175",
    name: "Information Systems for Management",
    fullName: "ENGR 175: Information Systems for Management",
    description: "Information systems and technology applications in management contexts.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Program coordinators rely on systems: CRMs, case management tools, grant trackers, dashboards, and secure data workflows. This course helps you choose, implement, and manage information systems that create accountability (and reduce chaos) across public/nonprofit operations.",
      realWorldApplications: [
        "Selecting and configuring a CRM/case-management tool for client or member tracking",
        "Designing a reporting workflow (intake → service delivery → outcomes → dashboards)",
        "Creating access controls and data-handling practices for sensitive client data",
        "Building a lightweight “single source of truth” for program operations (tasks, docs, metrics)"
      ],
      learningOutcomes: [
        "Explain how organizations create value with information systems (process, data, decisions)",
        "Understand databases/data flows at a practical level (what fields matter, why structure matters)",
        "Evaluate system options using requirements, cost, security, and adoption constraints",
        "Design simple dashboards and reporting workflows for program accountability",
        "Recognize common risks: poor data quality, weak governance, privacy/security failures"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL1vtGId5rAwVDTs-_FpwHNShhqI1i9Qm8",
          "https://www.youtube.com/watch?v=uhVQCjKL4OY",
          "https://www.youtube.com/watch?v=AChfIfQ4gjw"
        ],
        websites: [
          "https://ocw.mit.edu/",
          "https://rework.withgoogle.com/",
          "https://www.cisa.gov/" 
        ],
        tools: [
          "Airtable (program database + forms + views)",
          "Salesforce (Nonprofit CRM basics) / HubSpot CRM",
          "Power BI / Tableau (dashboards)",
          "Google Workspace / Microsoft 365 (governed collaboration)",
          "Trello/Asana (workflow + accountability)"
        ]
      }
    }
  },
  {
    id: "mgmt-155",
    code: "MGMT 155",
    name: "Decision Analysis in Management",
    fullName: "MGMT 155: Decision Analysis in Management",
    description: "Analytical methods and frameworks for management decision-making.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Public/nonprofit decisions are often high-stakes and uncertain: which program to fund, which vendor to choose, how to manage risk, and how to justify tradeoffs transparently. This course gives you decision-science tools (decision trees, expected value, sensitivity analysis) that make choices defensible to leadership, boards, and funders.",
      realWorldApplications: [
        "Choosing between program options using decision trees + expected value under uncertainty",
        "Running sensitivity analysis on a budget (what breaks if costs rise or participation falls?)",
        "Quantifying risk tradeoffs for procurement/vendor selection",
        "Building a simple portfolio plan (multiple initiatives with constrained resources)"
      ],
      learningOutcomes: [
        "Model decisions with uncertainty using decision trees and expected value concepts",
        "Perform sensitivity analysis to find the assumptions that matter most",
        "Compare alternatives using explicit criteria (cost, risk, impact, feasibility)",
        "Communicate decision rationale clearly (assumptions, scenarios, limitations)",
        "Use spreadsheets to implement decision models and present results"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLD3fYc0bAjC-FbzlruUEYIO-El4PjDVCv",
          "https://www.youtube.com/watch?v=tbv9E9D2BRQ",
          "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/resources/unit-8-decision-analysis-video-3/",
          "https://www.youtube.com/watch?v=N924D6tGOG8",
          "https://www.youtube.com/watch?v=oBs4GoubFcY"
        ],
        websites: [
          "https://ocw.mit.edu/",
          "https://fred.stlouisfed.org/",
          "https://www.reginfo.gov/public/do/eoPackageMain"
        ],
        tools: [
          "Excel / Google Sheets (decision trees, EMV/EVPI, sensitivity tables)",
          "Excel Solver (optimization under constraints)",
          "Power BI / Tableau (decision dashboards)",
          "Notion (decision logs + assumptions registry)"
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
    id: "mgmt-150",
    code: "MGMT 150",
    name: "Service Science",
    fullName: "MGMT 150: Service Science",
    description:
      "Understand and improve service systems by aligning people, processes, and technology—core to delivering effective public and nonprofit services.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Public Administration and nonprofit programs are service systems (intake, eligibility, case management, referrals). This course helps you map how services actually work, find bottlenecks, and redesign operations to improve outcomes and user experience.",
      realWorldApplications: [
        "Build a service blueprint for a city permit process (front-stage citizen steps + back-stage staff workflows) to reduce wait times.",
        "Redesign a nonprofit client intake workflow (forms, triage, referrals) to improve equity, access, and throughput."
      ],
      learningOutcomes: [
        "Model services as systems (stakeholders, touchpoints, handoffs, constraints).",
        "Diagnose service failures (queues, mismatched incentives, unclear ownership) and propose measurable improvements."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=McTh-xzxfRE", // IDEO U: Design thinking process step-by-step
          "https://www.youtube.com/watch?v=xSCXHU2bK2U", // Service Design Academy: Service blueprinting
          "https://www.youtube.com/watch?v=-glgJ9U_Fsk"  // What is a Service Blueprint?
        ],
        websites: [
          "https://www.gov.uk/service-manual",
          "https://www.servicedesigntoolkit.org/",
          "https://oecd-opsi.org/toolkits/service-design-toolkit/",
          "https://www.nesta.org.uk/toolkit/designing-for-public-services-a-practical-guide/"
        ],
        tools: ["Miro", "Figma", "Lucidchart", "Google Sheets"]
      }
    }
  },
  {
    id: "mgmt-158",
    code: "MGMT 158",
    name: "Service Innovation",
    fullName: "MGMT 158: Service Innovation",
    description:
      "Design and launch better services—useful for improving public programs, nonprofit offerings, and community delivery models.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Program coordinators constantly iterate services: new outreach models, better resource navigation, improved appointment flows, and smarter partnerships. This course supports the “innovation” side of public/nonprofit operations—turning needs into scalable services.",
      realWorldApplications: [
        "Design a new community resource navigation service (single intake + warm handoffs) with clear success metrics.",
        "Prototype a digital/phone “benefits screening” workflow to increase enrollment in eligible programs."
      ],
      learningOutcomes: [
        "Generate and evaluate service concepts using user needs, feasibility, and impact criteria.",
        "Prototype and test service ideas (journeys, scripts, pilot plans) before full rollout."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7l2Am-SUAjw", // Systematic Innovation by Design (webinar)
          "https://www.youtube.com/watch?v=Tvu34s8iMZw", // Design Thinking Process - An Introduction
          "https://www.youtube.com/watch?v=xzDJon5YPBU"  // Human-Centered Service Design | Course Trailer
        ],
        websites: [
          "https://www.ideou.com/pages/design-thinking",
          "https://www.servicedesigntools.org/",
          "https://designkit.org/methods.html",
          "https://oecd-opsi.org/guide/service-design/"
        ],
        tools: ["Miro", "Notion", "Airtable", "Canva"]
      }
    }
  },
  {
    id: "engr-158",
    code: "ENGR 158",
    name: "Service Innovation",
    fullName: "ENGR 158: Service Innovation",
    description:
      "Apply structured innovation methods to service systems—helpful for modern public administration work that touches technology, data, and process design.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Even in public/nonprofit roles, you’ll collaborate with IT/data teams, implement tools, and improve operations. This course helps you speak the language of service redesign and implement practical improvements (workflows, measurement, and pilots).",
      realWorldApplications: [
        "Create a pilot plan for a city 311 routing improvement using user feedback + operational metrics.",
        "Design a volunteer scheduling + communications workflow that reduces no-shows and improves coverage."
      ],
      learningOutcomes: [
        "Translate service problems into testable hypotheses and pilot designs.",
        "Use structured frameworks to balance user needs, operational constraints, and stakeholder buy-in."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=z-BfM-fsBEY", // 5 Steps to Service Blueprinting
          "https://www.youtube.com/watch?v=4Px5ythUyUk", // How to service blueprint (TheyDo)
          "https://www.youtube.com/watch?v=McTh-xzxfRE"  // IDEO U: Design thinking step-by-step
        ],
        websites: [
          "https://design-system.service.gov.uk/",
          "https://www.gov.uk/service-toolkit",
          "https://oecd-opsi.org/toolkits/service-design-toolkit/"
        ],
        tools: ["Trello", "Jira", "Miro", "Excel"]
      }
    }
  },
  {
    id: "cogs-182",
    code: "COGS 182",
    name: "Service Science",
    fullName: "COGS 182: Service Science",
    description:
      "Study services using case studies and evidence on how people behave in real service settings—useful for designing equitable, human-centered public programs.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Public programs succeed or fail based on real human behavior: confusion, stigma, trust, cognitive load, and staff constraints. This course strengthens your ability to design services that people can actually use—especially for vulnerable populations.",
      realWorldApplications: [
        "Redesign a benefits renewal notice to reduce drop-off and confusion (behavioral + UX lens).",
        "Improve a nonprofit hotline script to reduce call time while increasing successful referrals."
      ],
      learningOutcomes: [
        "Apply behavioral and cognitive insights to service design decisions (forms, processes, communications).",
        "Evaluate service experiences with evidence (observations, user journeys, failure points)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Tvu34s8iMZw", // Design thinking intro
          "https://www.youtube.com/watch?v=ojqN3tZqcew", // Service Design 101
          "https://www.youtube.com/watch?v=RrvNXH4U8wg"  // Design thinking vs service design
        ],
        websites: [
          "https://www.gov.uk/service-manual",
          "https://www.nesta.org.uk/toolkit/designing-for-public-services-a-practical-guide/",
          "https://www.servicedesigntoolkit.org/"
        ],
        tools: ["Miro", "Google Forms", "Qualtrics", "Dovetail"]
      }
    }
  },

  {
    id: "poli-092",
    code: "POLI 092",
    name: "Internship in Political Science",
    fullName: "POLI 092: Internship in Political Science",
    description:
      "Internship oversight for political science-related placements (community orgs, research projects, etc.).",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4 units depending on scope
      careerRelevance:
        "This is direct career capital for Public Administration/Nonprofit coordination: you’ll build proof of impact, learn stakeholder management, and understand how policy and organizations work in practice. Use it to target city/county agencies, advocacy orgs, or campus-to-community policy programs.",
      realWorldApplications: [
        "Support constituent services or community engagement (intake, case tracking, referrals, reporting).",
        "Assist a policy/research team with memos, meeting notes, data collection, and partner coordination."
      ],
      learningOutcomes: [
        "Translate classroom concepts into operational work (deliverables, timelines, accountability).",
        "Build professional artifacts (memos, dashboards, process docs) that strengthen your resume."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=4dEXgur0zdc", // 12 Steps to Land ANY Internship
          "https://www.youtube.com/watch?v=Jdw7oVaeiqc", // Internship cover letter
          "https://www.youtube.com/watch?v=jogIH5jvjvg"  // Understanding the Pathways Program
        ],
        websites: [
          "https://help.usajobs.gov/working-in-government/unique-hiring-paths/students",
          "https://www.idealist.org/en/internships",
          "https://my.americorps.gov/mp/listing/publicRequestSearch.do"
        ],
        tools: ["LinkedIn", "USAJOBS", "Google Docs", "Excel"]
      }
    }
  },
  {
    id: "pubp-092",
    code: "PUBP 092",
    name: "Internship in Public Policy",
    fullName: "PUBP 092: Internship in Public Policy",
    description:
      "Internship oversight for public policy placements (community orgs, professional research projects, etc.).",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4 units depending on scope
      careerRelevance:
        "If your goal is Public Administration / Program Coordinator, this is the cleanest way to get hands-on experience with program implementation: evaluation support, stakeholder coordination, reporting, and policy-to-practice translation.",
      realWorldApplications: [
        "Help run a program pilot (tracking enrollment, outcomes, and operational issues).",
        "Support grant reporting: collect metrics, write narrative sections, and coordinate partner updates."
      ],
      learningOutcomes: [
        "Understand implementation constraints (budgets, compliance, operations) beyond policy design.",
        "Produce concrete outputs: policy briefs, program dashboards, meeting facilitation notes."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=vAbuK9sg6Fg", // Pathways on USAJOBS
          "https://www.youtube.com/watch?v=u4mxzmA-Y5M", // Cover letter for internship
          "https://www.youtube.com/watch?v=5evpKBkS99k"  // Service/product levels (innovation lens)
        ],
        websites: [
          "https://help.usajobs.gov/working-in-government/unique-hiring-paths/students",
          "https://intern.usajobs.gov/",
          "https://www.idealist.org/en/internships"
        ],
        tools: ["Airtable", "PowerPoint", "Google Sheets", "Canva"]
      }
    }
  },
  {
    id: "mgmt-092",
    code: "MGMT 092",
    name: "Internship in Management",
    fullName: "MGMT 092: Internship in Management",
    description:
      "Internship oversight for management-related placements.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4 units depending on scope
      careerRelevance:
        "Program coordinators are managers in practice: scheduling, operations, vendor/community partnerships, volunteer coordination, and internal communications. This internship is ideal if you want operational experience inside a nonprofit, city office, or service organization.",
      realWorldApplications: [
        "Coordinate events and program logistics (vendors, timelines, staff assignments, communications).",
        "Improve internal operations (SOPs, intake tracking, volunteer scheduling, basic dashboards)."
      ],
      learningOutcomes: [
        "Run real projects with constraints (time, stakeholders, limited resources).",
        "Learn practical management skills: coordination, reporting, and process improvement."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=eOpM6Cmv8go", // Busy day in the life: nonprofit program role
          "https://www.youtube.com/watch?v=pld9F55qNoM", // Day in the life: nonprofit program manager
          "https://www.youtube.com/watch?v=uELED8k07Ww"  // Day in the life: programme coordinator
        ],
        websites: [
          "https://www.idealist.org/en/internships",
          "https://www.idealist.org/en/jobs",
          "https://www.americorps.gov/"
        ],
        tools: ["Asana", "Trello", "Slack", "Google Workspace"]
      }
    }
  },
  {
    id: "ph-196",
    code: "PH 196",
    name: "Internships in the Community",
    fullName: "PH 196: Internships in the Community",
    description:
      "Community-based internship experience applying classroom learning in community health organizations.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Many public administration/nonprofit roles touch health-adjacent work (housing + health, food access, community outreach, case management, public benefits). This internship builds real community-partner experience—exactly what program coordinators need.",
      realWorldApplications: [
        "Support a community health organization with outreach, scheduling, data tracking, and program reporting.",
        "Assist with needs assessments or community resource mapping to guide service improvements."
      ],
      learningOutcomes: [
        "Operate professionally in community organizations (ethics, confidentiality, partner collaboration).",
        "Track outcomes and communicate impact through basic evaluation and reporting."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=QRN2MeoFm-w", // Internships in Public Health Workshop
          "https://www.youtube.com/watch?v=KpoKfl_W_Ww", // Learning public health by doing (interning)
          "https://www.youtube.com/watch?v=dTkz4ad2B8k"  // Students: Find your public health path
        ],
        websites: [
          "https://oecd-opsi.org/toolkits/service-design-toolkit/",
          "https://www.nesta.org.uk/toolkit/designing-for-public-services-a-practical-guide/",
          "https://www.gov.uk/service-manual"
        ],
        tools: ["Excel", "REDCap", "Tableau", "Qualtrics"]
      }
    }
  },
];

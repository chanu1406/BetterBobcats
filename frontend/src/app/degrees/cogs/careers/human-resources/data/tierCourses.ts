import { TierCourse } from "@/types/careerPath";

/**
 * TIER 1 — MUST-TAKE for Human Resources (High-ROI)
 * These courses are foundational for any HR/People Analytics career.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "human-resources-psy-170",
    code: "PSY 170",
    name: "I/O Psychology",
    fullName: "PSY 170: Industrial and Organizational Psychology",
    description:
      "Core Human Resources + People Analytics foundation: learn evidence-based hiring, performance management, training, and motivation—then connect it to workplace data (turnover, engagement, productivity).",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "PSY 170 is a direct Cog Sci → HR/People Analytics bridge: it applies psychological theory and research methods to workplace problems like selection/testing, performance, motivation, and organizational effectiveness. It helps you design better people processes and interpret HR metrics without falling into biased or unvalidated conclusions.",
      realWorldApplications: [
        "Designing structured hiring (job analysis → competencies → interview rubrics)",
        "Evaluating selection tools (interviews/assessments) for fairness and predictive validity",
        "Building performance appraisal systems and interpreting performance data responsibly",
        "Diagnosing retention/turnover and engagement using survey + HRIS data",
        "Measuring training effectiveness (pre/post outcomes and ROI-style evaluation)",
        "Improving motivation and culture through evidence-based interventions"
      ],
      learningOutcomes: [
        "Apply psychological principles to workplace decisions (hiring, training, evaluation)",
        "Explain core concepts in personnel selection and workplace testing",
        "Conduct/interpret job analysis and connect it to selection and performance criteria",
        "Critique performance management systems for reliability, bias, and fairness",
        "Analyze drivers of motivation, satisfaction, and organizational outcomes",
        "Communicate HR recommendations with evidence, assumptions, and limitations"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=industrial+organizational+psychology+lecture",
          "https://www.youtube.com/results?search_query=personnel+selection+validity+reliability+I-O+psychology",
          "https://www.youtube.com/results?search_query=performance+appraisal+bias+I-O+psychology"
        ],
        websites: [
          "https://catalog.ucmerced.edu/",
          "https://www.shrm.org/",
          "https://www.onetonline.org/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Qualtrics (or Google Forms)",
          "R (RStudio) or Python (pandas)",
          "Tableau / Power BI"
        ]
      }
    }
  },
  {
    id: "human-resources-soc-001",
    code: "SOC 001",
    name: "Intro to Sociology",
    fullName: "SOC 001: Introduction to Sociology",
    description:
      "Foundation for HR and People Analytics: understand how groups, culture, status/roles, and social structures shape behavior inside organizations and teams.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Great HR and People Analytics work requires more than individual psychology—you need systems thinking about groups, norms, power, inequality, and culture. SOC 001 gives you the framework to interpret workplace dynamics (teams, leadership, conflict, inclusion) and make better people decisions grounded in how social systems operate.",
      realWorldApplications: [
        "Diagnosing culture and team-dynamics issues behind engagement or turnover metrics",
        "Interpreting DEI and pay-equity patterns using social structure and stratification lenses",
        "Designing better onboarding and retention strategies by understanding socialization processes",
        "Explaining organizational behavior (norms, roles, status) that drives performance and conflict"
      ],
      learningOutcomes: [
        "Explain how social structures and institutions shape individual behavior",
        "Analyze group dynamics, norms, roles, and status in real settings",
        "Recognize how culture forms and changes within organizations",
        "Apply sociological perspectives to workplace issues like inequality, conflict, and cohesion"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=introduction+to+sociology+course+lectures",
          "https://www.youtube.com/results?search_query=sociological+imagination+lecture",
          "https://www.youtube.com/results?search_query=organizational+culture+sociology+lecture"
        ],
        websites: [
          "https://catalog.ucmerced.edu/",
          "https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses",
          "https://www.onetonline.org/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Qualtrics (or Google Forms)",
          "Tableau / Power BI"
        ]
      }
    }
  },
  {
    id: "human-resources-econ-141",
    code: "ECON 141",
    name: "Human Resource Economics",
    fullName: "ECON 141: Human Resource Economics",
    description:
      "Applies economic reasoning to HR decisions—hiring, compensation, incentives, motivation, and teamwork—so you can analyze and design pay/retention strategies with data.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "This course is ideal for Cog Sci students targeting HR, People Analytics, or Compensation/Benefits because it explains the economic logic behind workforce decisions. You’ll learn how firms structure pay and incentives, how hiring/recruitment choices affect outcomes, and how to interpret productivity and retention through a quantitative lens.",
      realWorldApplications: [
        "Compensation benchmarking and salary-band design (market pay vs internal equity)",
        "Incentive/bonus design and evaluating whether incentives change behavior/productivity",
        "Retention analysis: interpreting turnover patterns and testing interventions (pay, promotion, job design)",
        "Pay equity analysis and understanding wage determination factors",
        "Human-capital investment decisions (training ROI, skill development, career ladders)"
      ],
      learningOutcomes: [
        "Apply economic theory to firm decisions involving hiring, recruitment, and compensation",
        "Explain how incentives influence effort, motivation, and teamwork in organizations",
        "Analyze wage determination and how pay structures affect retention and performance",
        "Evaluate tradeoffs in HR policy choices using evidence and clear assumptions",
        "Communicate HR recommendations in a decision-support style (what to change and why)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@mruniversity/search?query=labor%20markets",
          "https://www.youtube.com/@khanacademy/search?query=labor%20market",
          "https://www.youtube.com/results?search_query=compensation+incentives+principal+agent+lecture"
        ],
        websites: [
          "https://www.bls.gov/",
          "https://www.onetonline.org/",
          "https://www.shrm.org/",
          "https://www.nber.org/"
        ],
        tools: [
          "Excel / Google Sheets",
          "R (RStudio) or Python (pandas)",
          "Tableau / Power BI"
        ]
      }
    }
  },
  {
    id: "psy-001",
    code: "PSY 001",
    name: "Introduction to Psychology",
    fullName: "PSY 001: Introduction to Psychology",
    description:
      "The base requirement for understanding individual motivation, personality, and behavioral triggers in the workplace.",
    tier: 1,
    prerequisites: [],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand fundamental psychological principles",
        "Recognize individual differences in behavior",
        "Apply motivation theories to workplace contexts",
        "Analyze personality and its workplace impact",
      ],
      topics: [
        "Learning & Cognition",
        "Motivation Theory",
        "Personality Psychology",
        "Social Behavior",
        "Psychological Assessment",
        "Behavioral Change",
      ],
      careerRelevance:
        "Every HR professional must understand what drives individual behavior. This foundational knowledge informs recruitment, training, and employee development strategies.",
    },
  },
  {
    id: "human-resources-psy-001",
    code: "PSY 001",
    name: "Intro to Psychology",
    fullName: "PSY 001: Introduction to Psychology",
    description:
      "Foundational for HR/People Analytics as a Cog Sci student: builds core understanding of behavior, cognition, personality, and social factors that drive workplace performance and employee decision-making.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "PSY 001 gives you the behavioral foundation behind hiring, training, motivation, and employee development. You learn how psychologists study behavior (methods), plus key drivers like cognition, personality, and social influence—critical for interpreting workplace behavior and designing better people programs.",
      realWorldApplications: [
        "Improving onboarding/training by applying learning and memory principles",
        "Designing motivation and behavior-change strategies for performance and retention",
        "Understanding individual differences (personality) to support teams and leadership development",
        "Interpreting workplace behavior using social influence and group dynamics concepts"
      ],
      learningOutcomes: [
        "Explain psychology as a scientific study of behavior and mental processes",
        "Describe how research methods are used to measure and test behavioral claims",
        "Summarize major influences on behavior (biological, cognitive, personality, social)",
        "Apply core psychological concepts to real workplace situations (motivation, learning, social behavior)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@crashcourse/search?query=psychology",
          "https://www.youtube.com/@KhanAcademy/search?query=psychology",
          "https://www.youtube.com/results?search_query=introduction+to+psychology+lecture"
        ],
        websites: [
          "https://catalog.ucmerced.edu/",
          "https://www.apa.org/topics",
          "https://nobaproject.com/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Qualtrics (or Google Forms)",
          "R (RStudio) or Python (pandas)"
        ]
      }
    }
  },
  {
    id: "mist-060",
    code: "MIST 060",
    name: "Introduction to Data Analytics",
    fullName: "MIST 060: Introduction to Data Analytics",
    description:
      "High-ROI for People Analytics: learn the end-to-end workflow (collect → clean → integrate → visualize) so you can turn HR data (performance, engagement, retention) into decisions.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "People Analytics is essentially applied data analytics on workforce data. This course builds the practical foundation: working with messy datasets, integrating sources, visualizing patterns, and communicating recommendations—skills that directly transfer to HR dashboards, retention analysis, and workforce planning.",
      realWorldApplications: [
        "Cleaning HRIS exports (duplicates, missing values, inconsistent job titles/levels) into analysis-ready tables",
        "Building retention/turnover reporting with segmented views (team, role, tenure, location)",
        "Creating HR dashboards that track hiring pipeline, performance distributions, and engagement trends",
        "Combining datasets (e.g., performance + comp + tenure) to explain patterns and support decisions"
      ],
      learningOutcomes: [
        "Describe the end-to-end analytics workflow from raw data to decision support",
        "Perform data cleaning and basic quality checks to improve reliability",
        "Integrate data from multiple sources and document assumptions/definitions",
        "Create clear visualizations that answer stakeholder questions",
        "Present actionable insights with limitations and next-step recommendations"
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
          "Looker Studio",
          "Wolfram/Mathematica (course-linked notebook workflow)"
        ]
      }
    }
  },
];

/**
 * TIER 2 — STRONG HR BOOSTERS
 * These courses turn a junior HR professional into a senior candidate by adding organizational behavior, negotiation, and advanced people analytics skills.
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "human-resources-mgmt-124",
    code: "MGMT 124",
    name: "Org Behavior & Leadership",
    fullName: "MGMT 124: Organizational Behavior and Leadership",
    description:
      "Teaches how people behave in organizations—leadership, team dynamics, conflict, and change—so you can design better workplaces and make stronger people decisions.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "This is a high-signal course for HR Business Partner, Talent Development, and People Analytics tracks because it explains what actually drives performance in teams and organizations. It helps you translate culture, motivation, and leadership concepts into measurable behaviors and practical interventions (not just theory).",
      realWorldApplications: [
        "Diagnosing engagement/turnover problems using team dynamics, culture, and motivation frameworks",
        "Designing change-management plans for reorganizations, new policies, or tooling rollouts",
        "Improving manager effectiveness (coaching, feedback, decision-making, conflict handling)",
        "Building high-performing teams (roles, norms, accountability, psychological safety)"
      ],
      learningOutcomes: [
        "Explain major organizational behavior concepts at the individual, team, and org level",
        "Apply leadership frameworks to real workplace situations and tradeoffs",
        "Identify causes of conflict and choose appropriate resolution strategies",
        "Analyze organizational culture and recommend changes that improve outcomes",
        "Plan and communicate change initiatives with realistic adoption considerations"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=organizational+behavior+course+lecture",
          "https://www.youtube.com/results?search_query=leadership+theories+course+lecture",
          "https://www.youtube.com/results?search_query=change+management+basics+lecture"
        ],
        websites: [
          "https://www.shrm.org/",
          "https://hbr.org/topic/leadership",
          "https://www.mindtools.com/pages/main/newMN_HTE.htm"
        ],
        tools: [
          "Excel / Google Sheets",
          "Qualtrics (or Google Forms)",
          "Tableau / Power BI"
        ]
      }
    }
  },
  {
    id: "human-resources-soc-030",
    code: "SOC 030",
    name: "Social Inequality",
    fullName: "SOC 030: Social Inequality",
    description:
      "Critical for DEI and People Ops: builds a systems-level lens on race/class/gender inequality, power, and how policies and institutions shape outcomes in workplaces.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "DEI and People Analytics work requires understanding structural causes of unequal outcomes—not just individual attitudes. This course helps you analyze how power, institutions, and social processes create and maintain inequality, and how policy can reduce or worsen disparities (directly applicable to hiring, promotion, pay equity, and retention).",
      realWorldApplications: [
        "Designing fairer hiring and promotion processes by identifying structural bias points",
        "Interpreting pay-equity and representation metrics using a stratification lens (race/class/gender)",
        "Evaluating whether policies (leave, flexibility, performance ratings) mitigate or exacerbate disparities",
        "Building DEI dashboards and translating patterns into actionable interventions"
      ],
      learningOutcomes: [
        "Explain classical and modern theories about the causes of social, economic, and political inequality",
        "Analyze how power and institutions shape unequal outcomes for individuals and groups",
        "Apply intersectional thinking to workplace patterns (race/class/gender axes of inequality)",
        "Critique organizational policies for potential disparate impact and unintended consequences"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=social+inequality+race+class+gender+lecture",
          "https://www.youtube.com/results?search_query=intersectionality+explained+lecture",
          "https://www.youtube.com/results?search_query=organizational+inequality+sociology+lecture"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68389",
          "https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses",
          "https://www.eeoc.gov/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Tableau / Power BI",
          "R (RStudio) or Python (pandas)"
        ]
      }
    }
  },
  {
    id: "econ-176",
    code: "ECON 176",
    name: "Effective Negotiations",
    fullName: "ECON 176: Effective Negotiations",
    description:
      "Builds negotiation + conflict-resolution skill for HR work: offer negotiation, employee relations, union/management discussions, and stakeholder alignment.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Negotiation is a daily HR skill—used in compensation conversations, conflict resolution, accommodations, and aligning managers/employees on outcomes. This course helps you prepare systematically, communicate under pressure, and reach durable agreements without damaging trust.",
      realWorldApplications: [
        "Negotiating compensation packages, offers, counteroffers, and promotions",
        "Handling employee relations conflicts with structured, fair negotiation frameworks",
        "Managing vendor/benefits-provider discussions (pricing, SLAs, renewals)",
        "Supporting labor/union conversations and grievance resolution (where applicable)",
        "Aligning cross-functional stakeholders on headcount, policy changes, and timelines"
      ],
      learningOutcomes: [
        "Plan negotiations using interests, constraints, and alternatives (BATNA-style thinking)",
        "Use anchoring, framing, and concession strategies responsibly",
        "Apply active listening and questioning techniques to uncover root issues",
        "De-escalate conflict and navigate difficult conversations professionally",
        "Draft clear agreements and follow-up plans to reduce misunderstandings"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=Harvard+Program+on+Negotiation+BATNA+anchoring",
          "https://www.youtube.com/results?search_query=Getting+to+Yes+summary+negotiation",
          "https://www.youtube.com/results?search_query=Chris+Voss+Never+Split+the+Difference+masterclass+summary",
          "https://www.youtube.com/results?search_query=interest+based+negotiation+examples",
          "https://www.youtube.com/results?search_query=salary+negotiation+role+play+examples"
        ],
        websites: [
          "https://www.pon.harvard.edu",
          "https://www.pon.harvard.edu/daily/batna/",
          "https://www.pon.harvard.edu/tag/negotiation-skills/",
          "https://www.shrm.org",
          "https://hbr.org/topic/negotiating"
        ],
        tools: [
          "Google Sheets (concession planning + scenario table)",
          "Notion (negotiation prep template + notes)",
          "Miro (stakeholder map + interest mapping)",
          "DocuSign (formalizing agreements when needed)",
          "Calendly (structured negotiation scheduling)"
        ]
      },
      additionalNotes:
        "Credits/units can vary by catalog year or offering—double-check the current UC Merced catalog or registration listing for the official unit count."
    }
  },
  {
    id: "human-resources-psy-156",
    code: "PSY 156",
    name: "Social Psychology",
    fullName: "PSY 156: Social Psychology",
    description:
      "Explains how social influence, group processes, and social cognition shape workplace behavior—useful for HR, People Ops, and culture/engagement work.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Social psychology helps HR and People Analytics teams understand how norms, persuasion, identity, and group dynamics drive cooperation, conflict, and performance. It’s especially useful for interpreting engagement issues, designing behavior-change interventions, and improving communication and culture at scale.",
      realWorldApplications: [
        "Designing behavior-change initiatives (e.g., adoption of new processes/tools) using persuasion and norm strategies",
        "Improving teamwork by diagnosing group dynamics, conformity pressures, and social identity effects",
        "Reducing bias in hiring/performance decisions by understanding attribution errors and stereotyping",
        "Building healthier culture systems (feedback norms, psychological safety, conflict resolution)",
        "Interpreting engagement/retention patterns through social influence and belonging"
      ],
      learningOutcomes: [
        "Explain core concepts in social cognition, social interaction, and group processes",
        "Analyze how influence, norms, and conformity shape individual behavior in groups",
        "Apply attribution concepts to interpret workplace behavior without common judgment errors",
        "Recognize mechanisms behind prejudice/stereotyping and how they affect organizational outcomes",
        "Translate social-psych concepts into practical HR interventions and communication strategies"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=introduction+to+social+psychology+lecture",
          "https://www.youtube.com/@crashcourse/search?query=social%20psychology",
          "https://www.youtube.com/@khanacademy/search?query=social%20psychology"
        ],
        websites: [
          "https://catalog.ucmerced.edu/",
          "https://nobaproject.com/",
          "https://www.shrm.org/"
        ],
        tools: [
          "Qualtrics (or Google Forms)",
          "Excel / Google Sheets",
          "Tableau / Power BI"
        ]
      }
    }
  },
  {
    id: "mist-201",
    code: "MIST 201",
    name: "Leadership & Communications",
    fullName: "MIST 201: Leadership, Organizations, and Communications",
    description:
      "Leadership + org behavior + communication in real workplace settings—case-based and team-heavy, with explicit focus on cross-cultural differences and improving team performance.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For Cog Sci → HR/People Ops/People Analytics, this course strengthens the ‘influence layer’ behind the metrics: leadership effectiveness, communication breakdowns, and team dynamics. It helps you translate workplace behavior into actionable interventions (manager training, comms plans, org design choices) and communicate change across diverse teams.",
      realWorldApplications: [
        "Designing leadership development plans using assessment results and observed team outcomes",
        "Improving team performance through clearer role alignment, feedback norms, and communication routines",
        "Managing cross-cultural communication issues in global, hybrid, or distributed teams",
        "Supporting change rollouts (new policy/process/tool) with stakeholder-aware communication plans",
        "Diagnosing dysfunctional leadership patterns using structured frameworks and evidence"
      ],
      learningOutcomes: [
        "Identify functional vs dysfunctional leadership behaviors in workplace scenarios",
        "Apply organizational behavior theories to explain performance, conflict, and culture patterns",
        "Use leadership assessments and case evidence to recommend concrete improvements",
        "Communicate clearly in oral and written formats for professional stakeholders",
        "Work effectively in teams and improve collaboration with cross-cultural sensitivity"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=organizational+behavior+leadership+course+lecture",
          "https://www.youtube.com/results?search_query=cross+cultural+communication+in+the+workplace+lecture",
          "https://www.youtube.com/results?search_query=change+management+communication+examples"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69375",
          "https://hbr.org/topic/leadership",
          "https://www.shrm.org/"
        ],
        tools: [
          "Google Slides / PowerPoint",
          "Miro (stakeholder + comms mapping)",
          "Qualtrics (pulse surveys)",
          "Excel / Google Sheets"
        ]
      }
    }
  },
  {
    id: 'cogs-110',
    code: 'COGS 110',
    name: 'Philosophy of Cognitive Science',
    fullName: 'COGS 110: Philosophy of Cognitive Science',
    description:
      'Builds rigorous reasoning about minds, models, and evidence—useful for HR/People Ops when navigating high-stakes ethical decisions, bias, and “what counts as valid evidence” in policy and workplace investigations.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'COGS 110 strengthens the exact thinking style HR and People Analytics rely on: clear definitions, careful arguments, and separating evidence from assumptions. The course also engages foundational debates in cognitive science (e.g., the Turing Test, cognitive architecture, and competing models), which translates well to modern workplace dilemmas around automation/AI tools, fairness, and interpretation of behavioral data.',
      realWorldApplications: [
        'Evaluating HR tools that claim to measure “fit,” “potential,” or “personality” (what is actually being measured?)',
        'Writing defensible policies where definitions matter (harassment, performance, misconduct, confidentiality)',
        'Auditing decision processes for bias and hidden assumptions (hiring, promotion, performance review)',
        'Communicating nuanced tradeoffs to stakeholders (what we know, what we don’t, and why)'
      ],
      learningOutcomes: [
        'Construct and critique arguments using clear premises, definitions, and evidence',
        'Explain key foundational issues in cognitive science (e.g., what counts as “intelligence” or “cognition”)',
        'Compare competing frameworks/models and articulate their strengths, limits, and assumptions',
        'Apply ethical reasoning to ambiguous, real-world decision contexts involving people and data'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/@WiPhi',
          'https://www.youtube.com/results?search_query=turing+test+explained+philosophy',
          'https://www.youtube.com/results?search_query=connectionism+vs+symbolic+ai+explained',
          'https://www.youtube.com/results?search_query=cognitive+architecture+explained'
        ],
        websites: [
          'https://plato.stanford.edu/entries/artificial-intelligence/',
          'https://plato.stanford.edu/entries/functionalism/',
          'https://plato.stanford.edu/entries/computational-mind/'
        ],
        tools: [
          'Notion (decision log + policy drafts)',
          'Miro (argument maps / stakeholder maps)',
          'Google Docs (policy memos)',
          'Excel / Google Sheets (basic evidence tracking)'
        ]
      }
    }
  },
];

/**
 * TIER 3 — HR-ADJACENT (SPECIALIZATION)
 * These courses are for specialized HR tracks: Compensation/Benefits, DEI, Public Sector HR, and HR Tech.
 */
export const tier3Courses: TierCourse[] = [
  {
    id: 'econ-121',
    code: 'ECON 121',
    name: 'Money & Banking',
    fullName: 'ECON 121: The Economics of Money, Banking, and Financial Institutions',
    description:
      'Best for Comp/Benefits or Payroll-adjacent work: builds financial-systems literacy (banks, rates, policy) so you can reason about retirement plans, equity comp, and benefits in real economic conditions.',
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Compensation, benefits, and payroll decisions don’t happen in a vacuum—they’re tied to interest rates, financial institutions, and monetary policy. This course helps you understand how these systems influence wages, retirement plans, equity compensation value, and employee financial well-being.',
      realWorldApplications: [
        'Interpreting how interest-rate changes affect employee mortgages, 401(k) outcomes, and financial stress trends',
        'Understanding retirement/benefits framing (e.g., matching, vesting, and long-term value) in different market environments',
        'Reasoning about equity compensation value and macro/market risk at a high level',
        'Communicating benefits tradeoffs to stakeholders with clearer financial context'
      ],
      learningOutcomes: [
        'Explain the role of money, banks, and financial institutions in the economy',
        'Describe how central banks and the Federal Reserve operate and why it matters',
        'Connect monetary policy changes to inflation, interest rates, and labor-market conditions',
        'Use financial-systems concepts to analyze compensation/benefits decisions more realistically'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=money+and+banking+course+lecture',
          'https://www.youtube.com/results?search_query=federal+reserve+monetary+policy+explained',
          'https://www.youtube.com/results?search_query=inflation+interest+rates+explained'
        ],
        websites: [
          'https://catalog.ucmerced.edu/',
          'https://www.federalreserve.gov/monetarypolicy.htm',
          'https://www.bls.gov/'
        ],
        tools: [
          'Excel / Google Sheets',
          'FRED (Federal Reserve Economic Data)'
        ]
      }
    }
  },
  {
    id: 'soc-038',
    code: 'SOC 038',
    name: 'Race & Racism',
    fullName: 'SOC 038: Sociology of Race and Racism',
    description:
      'Deep-dive for DEI and organizational equity work: builds a structural understanding of race and racism that supports better policy design and fairer people systems.',
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'If you want to specialize in DEI, employee relations, or equity-focused People Analytics, you need frameworks that explain structural and systemic racism—not just individual bias. This course strengthens your ability to interpret disparities, diagnose mechanisms, and propose interventions with fewer blind spots.',
      realWorldApplications: [
        'Interpreting representation, promotion, and pay-equity disparities with a structural lens',
        'Designing policies that reduce disparate impact across recruiting, performance, and promotion',
        'Improving incident response and workplace culture initiatives with clearer understanding of racial dynamics',
        'Building DEI metrics narratives that connect patterns to mechanisms and actionable changes'
      ],
      learningOutcomes: [
        'Explain sociological approaches to race and racism and how they shape lived outcomes',
        'Analyze systemic and structural racism in institutions (including workplaces)',
        'Recognize how racial categorization, identity, and intersecting oppressions influence opportunity',
        'Translate theory into practical policy considerations for equity and organizational justice'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=sociology+race+and+racism+lecture',
          'https://www.youtube.com/results?search_query=systemic+racism+explained+sociology',
          'https://www.youtube.com/results?search_query=intersectionality+explained+lecture'
        ],
        websites: [
          'https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses',
          'https://www.eeoc.gov/',
          'https://catalog.ucmerced.edu/'
        ],
        tools: [
          'Excel / Google Sheets',
          'Tableau / Power BI',
          'R (RStudio) or Python (pandas)'
        ]
      }
    }
  },
  {
    id: 'econ-151',
    code: 'ECON 151',
    name: 'Government & Business',
    fullName: 'ECON 151: The Economics of Government and Business',
    description:
      'Key for public-sector HR or regulated industries: builds decision-making intuition about how government revenue/spending and regulation shape business constraints, compliance, and workforce policy.',
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Public-sector HR and government-adjacent employers operate under different constraints (budgets, regulation, reporting, procurement). This course helps you understand how government decisions and business incentives interact—useful for policy-heavy HR, compliance-minded roles, and regulated environments.',
      realWorldApplications: [
        'Understanding how public budgets and fiscal constraints shape staffing, compensation, and hiring cycles',
        'Communicating HR policy tradeoffs in regulated environments (compliance, reporting, documentation)',
        'Supporting government-adjacent organizations where contracting and regulation affect workforce strategy',
        'Interpreting how regulation changes can shift hiring demand, wages, and benefits decisions'
      ],
      learningOutcomes: [
        'Explain how government revenue/expenditure decisions influence economic performance',
        'Analyze incentives and constraints faced by firms when policy/regulation changes',
        'Apply economic reasoning to evaluate tradeoffs in government-business interactions',
        'Translate policy/constraint logic into practical implications for workforce planning'
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=government+regulation+and+business+economics+lecture',
          'https://www.youtube.com/results?search_query=public+policy+economics+basics',
          'https://www.youtube.com/results?search_query=fiscal+policy+explained'
        ],
        websites: [
          'https://catalog.ucmerced.edu/',
          'https://www.bls.gov/',
          'https://www.usa.gov/'
        ],
        tools: [
          'Excel / Google Sheets',
          'Tableau / Power BI'
        ]
      }
    }
  },
  {
    id: "cogs-128",
    code: "COGS 128",
    name: "Cognitive Engineering",
    fullName: "COGS 128: Cognitive Engineering",
    description:
      "High-value for HR Tech and Employee Experience: apply cognitive science + HCI to design internal tools employees actually adopt and can use accurately under real workload and time pressure.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "COGS 128 is ideal if you want HR Tech / People Ops roles that touch systems design (HRIS, onboarding, performance tools, internal portals). It focuses on cognitive engineering with topics like human-computer interaction, helping you reduce friction, errors, and cognitive load—so employees can do work faster, with fewer mistakes, and higher satisfaction.",
      realWorldApplications: [
        "Redesigning onboarding or benefits enrollment flows to reduce drop-off and confusion",
        "Improving internal HR portals (search, navigation, forms) to cut support tickets and rework",
        "Designing performance-review tools that reduce rating bias and improve feedback quality",
        "Evaluating new HR tech vendors by testing usability, workflow fit, and adoption risk"
      ],
      learningOutcomes: [
        "Apply cognitive principles to evaluate and improve interactive systems used by employees",
        "Identify usability breakdowns (errors, confusion loops, overload) and propose design fixes",
        "Translate employee workflows into measurable success metrics (task success, time-on-task, error rate)",
        "Communicate design recommendations clearly to stakeholders (HR, IT, vendors, leadership)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=human+computer+interaction+course+lecture",
          "https://www.youtube.com/results?search_query=cognitive+load+ux+explained",
          "https://www.youtube.com/results?search_query=usability+testing+methods+examples"
        ],
        websites: [
          "https://catalog.ucmerced.edu/",
          "https://www.nngroup.com/articles/ten-usability-heuristics/",
          "https://www.usability.gov/how-to-and-tools/methods/usability-testing.html"
        ],
        tools: [
          "Figma",
          "Qualtrics (or Google Forms)",
          "Jira (or similar issue tracker)",
          "Excel / Google Sheets"
        ]
      }
    }
  },
];

/**
 * Export all courses as a flat array for the career path configuration
 */
export const humanResourcesTierCourses: TierCourse[] = [
  ...tier1Courses,
  ...tier2Courses,
  ...tier3Courses,
];

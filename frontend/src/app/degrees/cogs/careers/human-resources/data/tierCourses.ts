import { TierCourse } from "@/types/careerPath";

export const humanResourcesTierCourses: TierCourse[] = [
  // ==================== TIER 1: MUST-TAKE ====================
  {
    id: "psy-170",
    code: "PSY 170",
    name: "Industrial & Organizational Psychology",
    fullName: "PSY 170: Industrial & Organizational Psychology",
    description:
      "The 'Gold Standard' for HR. Teaches workplace testing, personnel issues, and how to apply psychological theory to organizational problems.",
    tier: 1,
    prerequisites: ["psy-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Apply psychological principles to workplace issues",
        "Understand employee selection and assessment methods",
        "Analyze organizational behavior and culture",
        "Design effective performance management systems",
      ],
      topics: [
        "Personnel Selection & Testing",
        "Performance Appraisal",
        "Training & Development",
        "Job Analysis",
        "Workplace Motivation",
        "Organizational Culture",
      ],
      careerRelevance:
        "This is THE foundational course for any HR career. Every HR professional needs to understand how psychology applies to workplace behavior and organizational effectiveness.",
    },
  },
  {
    id: "soc-001",
    code: "SOC 001",
    name: "Introduction to Sociology",
    fullName: "SOC 001: Introduction to Sociology",
    description:
      "Foundational for understanding group dynamics, organizational culture, and social structures within a workforce.",
    tier: 1,
    prerequisites: [],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand social structures and institutions",
        "Analyze group dynamics and social interaction",
        "Recognize cultural patterns in organizations",
        "Apply sociological perspectives to workplace issues",
      ],
      topics: [
        "Social Structure & Organization",
        "Group Dynamics",
        "Cultural Systems",
        "Social Institutions",
        "Socialization Processes",
        "Collective Behavior",
      ],
      careerRelevance:
        "Understanding how groups function and how organizational culture develops is critical for HR professionals managing diverse teams and shaping company culture.",
    },
  },
  {
    id: "econ-141",
    code: "ECON 141",
    name: "Human Resource Economics",
    fullName: "ECON 141: Human Resource Economics",
    description:
      "Applies economic modeling to labor markets, employee compensation, and productivity incentives.",
    tier: 1,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Apply economic theory to labor market decisions",
        "Design effective compensation structures",
        "Analyze productivity and incentive systems",
        "Understand labor supply and demand dynamics",
      ],
      topics: [
        "Labor Market Economics",
        "Compensation Theory",
        "Incentive Design",
        "Human Capital Investment",
        "Wage Determination",
        "Productivity Analysis",
      ],
      careerRelevance:
        "Essential for compensation and benefits roles. This course teaches the economic logic behind pay structures, bonuses, and employee retention strategies.",
    },
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
    id: "econ-100",
    code: "ECON 100",
    name: "Intermediate Microeconomic Theory",
    fullName: "ECON 100: Intermediate Microeconomic Theory",
    description:
      "Essential for understanding firm-level decision making and the allocation of human capital.",
    tier: 1,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Analyze firm decision-making processes",
        "Understand resource allocation principles",
        "Apply cost-benefit analysis to HR decisions",
        "Evaluate market structures and competition",
      ],
      topics: [
        "Consumer & Producer Theory",
        "Market Structures",
        "Resource Allocation",
        "Cost Analysis",
        "Efficiency & Optimization",
        "Decision Theory",
      ],
      careerRelevance:
        "HR professionals need to understand the business context of their decisions. This course helps you think like an economist about workforce planning and resource allocation.",
    },
  },
  {
    id: "mist-060",
    code: "MIST 060",
    name: "Introduction to Data Analytics",
    fullName: "MIST 060: Introduction to Data Analytics",
    description:
      "High-ROI for 'People Analytics'—cleaning and visualizing employee performance and retention data.",
    tier: 1,
    prerequisites: [],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Clean and analyze employee data",
        "Create HR dashboards and visualizations",
        "Apply analytics to workforce planning",
        "Make data-driven HR decisions",
      ],
      topics: [
        "Data Cleaning & Preprocessing",
        "HR Metrics & KPIs",
        "Workforce Analytics",
        "Turnover Analysis",
        "Dashboard Design",
        "Predictive Analytics Basics",
      ],
      careerRelevance:
        "People Analytics is one of the fastest-growing areas in HR. Companies increasingly expect HR professionals to use data to inform decisions about hiring, retention, and performance.",
    },
  },

  // ==================== TIER 2: STRONG HR BOOSTERS ====================
  {
    id: "mgmt-124",
    code: "MGMT 124",
    name: "Organizational Behavior & Leadership",
    fullName: "MGMT 124: Organizational Behavior & Leadership",
    description:
      "Focuses on team dynamics, leadership theories, and managing change within a company.",
    tier: 2,
    prerequisites: ["mgmt-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Apply leadership theories to organizational contexts",
        "Manage organizational change effectively",
        "Understand team dynamics and development",
        "Develop leadership and management skills",
      ],
      topics: [
        "Leadership Theories",
        "Change Management",
        "Team Building",
        "Organizational Development",
        "Decision-Making Processes",
        "Conflict Management",
      ],
      careerRelevance:
        "Critical for HR Business Partners and Talent Development roles. This course teaches you how to develop leaders and manage organizational transformation.",
    },
  },
  {
    id: "soc-030",
    code: "SOC 030",
    name: "Social Inequality",
    fullName: "SOC 030: Social Inequality",
    description:
      "Critical for Diversity, Equity, and Inclusion (DEI) roles. Analyzes race, class, and gender in professional settings.",
    tier: 2,
    prerequisites: ["soc-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Analyze structural inequality in organizations",
        "Understand intersectionality and identity",
        "Develop equitable workplace policies",
        "Address systemic bias in HR practices",
      ],
      topics: [
        "Race & Ethnicity",
        "Gender & Sexuality",
        "Class & Economic Inequality",
        "Intersectionality",
        "Structural Discrimination",
        "Social Justice Frameworks",
      ],
      careerRelevance:
        "Essential for DEI specialists and HR leaders. Understanding structural inequality helps you design more equitable hiring, promotion, and compensation systems.",
    },
  },
  {
    id: "econ-176",
    code: "ECON 176",
    name: "Effective Negotiations",
    fullName: "ECON 176: Effective Negotiations",
    description:
      "Essential skill for salary negotiations, union relations, and conflict resolution.",
    tier: 2,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Master negotiation strategies and tactics",
        "Handle salary and benefits negotiations",
        "Resolve workplace conflicts effectively",
        "Build win-win solutions",
      ],
      topics: [
        "Negotiation Theory",
        "Bargaining Strategies",
        "Conflict Resolution",
        "Labor Relations",
        "Communication Tactics",
        "Interest-Based Negotiation",
      ],
      careerRelevance:
        "Every HR professional negotiates—whether it's with candidates, employees, managers, or unions. This skill directly impacts your effectiveness and career success.",
    },
  },
  {
    id: "psy-150",
    code: "PSY 150",
    name: "Social Psychology",
    fullName: "PSY 150: Social Psychology",
    description:
      "Teaches how social influence and group pressure impact workplace behavior and cooperation.",
    tier: 2,
    prerequisites: ["psy-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand social influence and persuasion",
        "Analyze group dynamics and conformity",
        "Apply attribution theory to workplace behavior",
        "Manage interpersonal conflict",
      ],
      topics: [
        "Social Influence",
        "Group Dynamics",
        "Conformity & Compliance",
        "Attribution Theory",
        "Prejudice & Stereotyping",
        "Interpersonal Attraction",
      ],
      careerRelevance:
        "Understanding how people influence each other is critical for managing teams, building company culture, and addressing workplace conflicts.",
    },
  },
  {
    id: "mist-201",
    code: "MIST 201",
    name: "Leadership & Communications",
    fullName: "MIST 201: Leadership & Communications",
    description:
      "Advanced strategies for managing cross-cultural differences and improving team performance.",
    tier: 2,
    prerequisites: ["mist-001"],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Lead diverse and global teams",
        "Communicate effectively across cultures",
        "Manage remote and hybrid workforces",
        "Build high-performing teams",
      ],
      topics: [
        "Cross-Cultural Communication",
        "Global Leadership",
        "Virtual Team Management",
        "Executive Communication",
        "Change Communication",
        "Stakeholder Management",
      ],
      careerRelevance:
        "Perfect for HR professionals in global companies or managing distributed teams. Communication skills are the #1 differentiator for senior HR roles.",
    },
  },
  {
    id: "cogs-110",
    code: "COGS 110",
    name: "Philosophy of Cognitive Science",
    fullName: "COGS 110: Philosophy of Cognitive Science",
    description:
      "Teaches logic and ethics—foundational for navigating complex legal and ethical workplace dilemmas.",
    tier: 2,
    prerequisites: ["cogs-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Apply ethical reasoning to workplace issues",
        "Navigate complex moral dilemmas",
        "Understand philosophical foundations of decision-making",
        "Develop critical thinking skills",
      ],
      topics: [
        "Ethics & Moral Philosophy",
        "Logic & Reasoning",
        "Philosophy of Mind",
        "Decision Theory",
        "Cognitive Biases",
        "Applied Ethics",
      ],
      careerRelevance:
        "HR professionals constantly face ethical dilemmas—from confidentiality to discrimination claims. This course develops the critical thinking skills needed to navigate complex situations.",
    },
  },

  // ==================== TIER 3: HR-ADJACENT (SPECIALIZATION) ====================
  {
    id: "econ-121",
    code: "ECON 121",
    name: "Money & Banking",
    fullName: "ECON 121: Money & Banking",
    description:
      "If you want to specialize in Compensation and Benefits or Payroll management.",
    tier: 3,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand financial systems and institutions",
        "Analyze compensation and benefits structures",
        "Manage payroll and benefits administration",
        "Evaluate financial risk in HR decisions",
      ],
      topics: [
        "Financial Institutions",
        "Monetary Policy",
        "Banking Systems",
        "Financial Markets",
        "Risk Management",
        "Payment Systems",
      ],
      careerRelevance:
        "Perfect for compensation and benefits specialists. Understanding financial systems helps you design better retirement plans, equity compensation, and benefits packages.",
    },
  },
  {
    id: "soc-038",
    code: "SOC 038",
    name: "Sociology of Race & Racism",
    fullName: "SOC 038: Sociology of Race & Racism",
    description:
      "Deep-dive for students specializing in organizational equity and social justice policy.",
    tier: 3,
    prerequisites: ["soc-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Analyze systemic racism in organizations",
        "Develop anti-racist workplace policies",
        "Understand racial identity and dynamics",
        "Create inclusive organizational cultures",
      ],
      topics: [
        "Critical Race Theory",
        "Systemic Racism",
        "Racial Identity",
        "Intersectionality",
        "Anti-Racism Strategies",
        "Organizational Justice",
      ],
      careerRelevance:
        "Essential for DEI specialists focused on racial equity. This specialized knowledge helps you design meaningful interventions that address root causes of inequality.",
    },
  },
  {
    id: "econ-151",
    code: "ECON 151",
    name: "Government and Business",
    fullName: "ECON 151: Government and Business",
    description:
      "Essential if you are aiming for HR roles in the public sector or government contracting.",
    tier: 3,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand public sector HR regulations",
        "Navigate government employment law",
        "Manage compliance and reporting requirements",
        "Work with government contracts and policies",
      ],
      topics: [
        "Public Sector Employment",
        "Government Regulation",
        "Labor Law & Compliance",
        "Public Policy",
        "Contract Management",
        "Civil Service Systems",
      ],
      careerRelevance:
        "Critical for HR professionals in government, defense contractors, or heavily regulated industries. Public sector HR has unique rules and challenges.",
    },
  },
  {
    id: "cogs-128",
    code: "COGS 128",
    name: "Cognitive Engineering",
    fullName: "COGS 128: Cognitive Engineering",
    description:
      "For HR Tech roles—designing the internal software systems employees use for daily work.",
    tier: 3,
    prerequisites: ["cogs-105"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design user-friendly HR systems",
        "Apply cognitive principles to technology",
        "Improve employee experience through design",
        "Evaluate and select HR technology",
      ],
      topics: [
        "Human-Computer Interaction",
        "User Experience Design",
        "System Design Principles",
        "Cognitive Load Management",
        "Technology Adoption",
        "Employee Experience",
      ],
      careerRelevance:
        "Perfect for HR Technology specialists or People Operations roles. As HR becomes more tech-driven, understanding how to design and implement employee systems is increasingly valuable.",
    },
  },
];

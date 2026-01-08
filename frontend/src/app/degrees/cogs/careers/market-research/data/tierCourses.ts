import { TierCourse } from "@/types/careerPath";

export const marketResearchTierCourses: TierCourse[] = [
  // ==================== TIER 1: MUST-TAKE ====================
  {
    id: "econ-108",
    code: "ECON 108",
    name: "Marketing & Consumer Behavior",
    fullName: "ECON 108: Marketing & Consumer Behavior",
    description:
      "The core professional requirement. Integrates economic theory with psychological principles to predict firm and buyer behavior.",
    tier: 1,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand consumer decision-making processes",
        "Apply economic models to marketing strategy",
        "Analyze psychological factors in purchasing behavior",
        "Predict market responses to product changes",
      ],
      topics: [
        "Consumer Psychology",
        "Behavioral Economics",
        "Market Segmentation",
        "Brand Positioning",
        "Pricing Strategy",
        "Purchase Decision Models",
      ],
      careerRelevance:
        "This is THE foundational course for market research. Every marketing analyst needs to understand why consumers make the choices they do.",
    },
  },
  {
    id: "econ-117",
    code: "ECON 117",
    name: "Marketing Strategy",
    fullName: "ECON 117: Marketing Strategy",
    description:
      "Direct application of analytical models to product positioning, pricing, and long-term brand strategy.",
    tier: 1,
    prerequisites: ["econ-108"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Develop comprehensive marketing strategies",
        "Apply analytical frameworks to positioning decisions",
        "Design pricing models for competitive markets",
        "Create long-term brand development plans",
      ],
      topics: [
        "Strategic Positioning",
        "Competitive Analysis",
        "Pricing Models",
        "Brand Management",
        "Market Entry Strategy",
        "Product Lifecycle Management",
      ],
      careerRelevance:
        "Transforms data collectors into strategic thinkers. This course teaches you to translate research findings into actionable business strategy.",
    },
  },
  {
    id: "econ-153",
    code: "ECON 153",
    name: "Judgment and Decision Making",
    fullName: "ECON 153: Judgment and Decision Making",
    description:
      "The 'CogSci-Econ Bridge.' Explores the biases and heuristics that drive real-world economic choices.",
    tier: 1,
    prerequisites: ["cogs-001", "econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Identify cognitive biases in decision-making",
        "Understand heuristics that influence purchasing",
        "Apply behavioral economics to market analysis",
        "Predict irrational consumer behaviors",
      ],
      topics: [
        "Cognitive Biases",
        "Heuristics & Shortcuts",
        "Prospect Theory",
        "Framing Effects",
        "Loss Aversion",
        "Choice Architecture",
      ],
      careerRelevance:
        "Understanding why people don't always act rationally is crucial for accurate market predictions. This gives you an edge over purely quantitative analysts.",
    },
  },
  {
    id: "econ-010",
    code: "ECON 010",
    name: "Statistical Inference for Economics",
    fullName: "ECON 010: Statistical Inference for Economics",
    description:
      "Essential quantitative foundation. Teaches the inference models required to validate all market findings.",
    tier: 1,
    prerequisites: [],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Master statistical inference techniques",
        "Conduct hypothesis testing on market data",
        "Understand confidence intervals and p-values",
        "Apply regression analysis to business problems",
      ],
      topics: [
        "Hypothesis Testing",
        "Regression Analysis",
        "Confidence Intervals",
        "Statistical Significance",
        "Sampling Methods",
        "Inference Models",
      ],
      careerRelevance:
        "You can't validate research findings without statistics. This course is non-negotiable for any analyst role that requires data-driven decision making.",
    },
  },
  {
    id: "mist-060",
    code: "MIST 060",
    name: "Introduction to Data Analytics",
    fullName: "MIST 060: Introduction to Data Analytics",
    description:
      "High-level training in cleaning messy consumer datasets and building decision-ready dashboards.",
    tier: 1,
    prerequisites: [],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Clean and preprocess consumer data",
        "Build professional dashboards",
        "Apply data visualization best practices",
        "Transform raw data into insights",
      ],
      topics: [
        "Data Cleaning & Preprocessing",
        "Dashboard Design",
        "Data Visualization",
        "Business Intelligence Tools",
        "Exploratory Data Analysis",
        "Reporting & Communication",
      ],
      careerRelevance:
        "Market research involves working with messy, real-world consumer data. This course teaches you the practical skills employers expect on day one.",
    },
  },
  {
    id: "econ-050",
    code: "ECON 050",
    name: "Business Analytics & Spreadsheets",
    fullName: "ECON 050: Business Analytics & Spreadsheets",
    description:
      "Practical industry skill: focuses on using Excel to build quantitative models of complex markets.",
    tier: 1,
    prerequisites: [],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Master advanced Excel for business modeling",
        "Build financial and market forecasting models",
        "Create dynamic spreadsheets for decision support",
        "Apply quantitative analysis to business problems",
      ],
      topics: [
        "Advanced Excel Functions",
        "Financial Modeling",
        "Market Forecasting",
        "Scenario Analysis",
        "Optimization Models",
        "Data Tables & Pivot Tables",
      ],
      careerRelevance:
        "Excel is still the #1 tool in business analytics. This course makes you immediately productive in any corporate research environment.",
    },
  },

  // ==================== TIER 2: STRONG MARKET RESEARCH BOOSTERS ====================
  {
    id: "econ-115",
    code: "ECON 115",
    name: "Industrial Organization",
    fullName: "ECON 115: Industrial Organization",
    description:
      "Analyzes firm behavior in various market structures and how competition changes consumer options.",
    tier: 2,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Analyze competitive market structures",
        "Understand oligopoly and monopoly behavior",
        "Evaluate market concentration and power",
        "Assess competitive dynamics across industries",
      ],
      topics: [
        "Market Structure Analysis",
        "Oligopoly Theory",
        "Monopolistic Competition",
        "Barriers to Entry",
        "Antitrust Economics",
        "Vertical Integration",
      ],
      careerRelevance:
        "Understanding how market structure affects firm behavior is critical for competitive intelligence. This course helps you analyze why competitors act the way they do.",
    },
  },
  {
    id: "econ-110",
    code: "ECON 110",
    name: "Econometrics",
    fullName: "ECON 110: Econometrics",
    description:
      "Advanced statistical modeling. The 'gold standard' for forecasting market demand and price elasticity.",
    tier: 2,
    prerequisites: ["econ-010"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Master advanced regression techniques",
        "Build demand forecasting models",
        "Calculate price elasticity",
        "Apply causal inference methods",
      ],
      topics: [
        "Multiple Regression",
        "Time Series Analysis",
        "Demand Forecasting",
        "Price Elasticity Models",
        "Instrumental Variables",
        "Panel Data Analysis",
      ],
      careerRelevance:
        "Econometrics is the gold standard for market research. Senior analysts and consultants rely on these methods to make high-stakes business predictions.",
    },
  },
  {
    id: "econ-170",
    code: "ECON 170",
    name: "Game Theory",
    fullName: "ECON 170: Game Theory",
    description:
      "Strategic logic: used to predict how competitors will respond to new entries or marketing campaigns.",
    tier: 2,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Apply game theory to business strategy",
        "Predict competitive responses",
        "Analyze strategic interactions",
        "Understand Nash equilibrium concepts",
      ],
      topics: [
        "Nash Equilibrium",
        "Strategic Form Games",
        "Sequential Games",
        "Pricing Games",
        "Entry Deterrence",
        "Repeated Interactions",
      ],
      careerRelevance:
        "Game theory helps you think several moves ahead. Essential for consultants who need to predict how competitors will react to market changes.",
    },
  },
  {
    id: "econ-126",
    code: "ECON 126",
    name: "Economics of Innovation",
    fullName: "ECON 126: Economics of Innovation",
    description:
      "Focuses on how new technologies are adopted by users and spread through markets.",
    tier: 2,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand technology adoption curves",
        "Analyze innovation diffusion processes",
        "Evaluate R&D investment decisions",
        "Study network effects and platforms",
      ],
      topics: [
        "Technology Adoption",
        "Diffusion of Innovation",
        "Network Effects",
        "Platform Economics",
        "R&D Economics",
        "Intellectual Property",
      ],
      careerRelevance:
        "Perfect for tech companies and startups. Understanding how innovations spread helps you forecast product adoption and market penetration.",
    },
  },
  {
    id: "econ-141",
    code: "ECON 141",
    name: "Human Resource Economics",
    fullName: "ECON 141: Human Resource Economics",
    description:
      "Teaches the 'people side' of business analytics—understanding labor markets and organizational incentives.",
    tier: 2,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Analyze labor market dynamics",
        "Understand organizational incentive structures",
        "Evaluate compensation and benefits strategies",
        "Apply economic principles to HR decisions",
      ],
      topics: [
        "Labor Supply & Demand",
        "Wage Determination",
        "Incentive Design",
        "Human Capital Theory",
        "Compensation Analysis",
        "Organizational Economics",
      ],
      careerRelevance:
        "Essential for market researchers in consulting or HR analytics. Understanding the 'people economics' behind organizations gives you unique insights.",
    },
  },
  {
    id: "mist-135",
    code: "MIST 135",
    name: "Technical Communication & Visualization",
    fullName: "MIST 135: Technical Communication & Visualization",
    description:
      "Critical for presenting data stories clearly to stakeholders and executives.",
    tier: 2,
    prerequisites: ["mist-060"],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Design compelling data visualizations",
        "Create executive-level presentations",
        "Tell stories with data",
        "Communicate complex findings clearly",
      ],
      topics: [
        "Data Storytelling",
        "Visualization Design Principles",
        "Executive Presentations",
        "Dashboard Communication",
        "Technical Writing",
        "Stakeholder Management",
      ],
      careerRelevance:
        "The best analysis means nothing if you can't communicate it. This skill separates analysts who get promoted from those who stay junior.",
    },
  },

  // ==================== TIER 3: MARKET-ADJACENT (SPECIALIZATION) ====================
  {
    id: "econ-145",
    code: "ECON 145",
    name: "Health Economics",
    fullName: "ECON 145: Health Economics",
    description:
      "High-ROI for healthcare research. Combines health outcomes with economic modeling.",
    tier: 3,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Analyze healthcare markets and policy",
        "Understand health insurance economics",
        "Evaluate cost-effectiveness of treatments",
        "Study pharmaceutical market dynamics",
      ],
      topics: [
        "Health Insurance Markets",
        "Pharmaceutical Economics",
        "Cost-Effectiveness Analysis",
        "Healthcare Policy",
        "Demand for Health Services",
        "Hospital Economics",
      ],
      careerRelevance:
        "Perfect for students targeting pharma, biotech, or healthcare consulting. Healthcare is a massive and growing sector with unique market dynamics.",
    },
  },
  {
    id: "econ-161",
    code: "ECON 161",
    name: "International Finance & Trade",
    fullName: "ECON 161: International Finance & Trade",
    description:
      "Essential for students aiming for global firms like Google, Amazon, or Nike.",
    tier: 3,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand international trade patterns",
        "Analyze exchange rate impacts on business",
        "Evaluate global market entry strategies",
        "Study cross-border competition",
      ],
      topics: [
        "International Trade Theory",
        "Exchange Rate Economics",
        "Trade Policy",
        "Global Supply Chains",
        "Foreign Direct Investment",
        "Multinational Firm Strategy",
      ],
      careerRelevance:
        "Critical for analysts at multinational corporations. Understanding global markets opens doors to international business strategy roles.",
    },
  },
  {
    id: "econ-151",
    code: "ECON 151",
    name: "Government and Business",
    fullName: "ECON 151: Government and Business",
    description:
      "For students researching how policy changes and regulations impact private industry.",
    tier: 3,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Analyze regulatory impacts on markets",
        "Understand government-business interactions",
        "Evaluate policy effects on competition",
        "Study lobbying and political economy",
      ],
      topics: [
        "Regulatory Economics",
        "Public Policy Analysis",
        "Antitrust Law",
        "Environmental Regulation",
        "Political Economy",
        "Government Procurement",
      ],
      careerRelevance:
        "Essential for policy consulting, government relations, or working with regulated industries like utilities, telecom, or financial services.",
    },
  },
  {
    id: "econ-149",
    code: "ECON 149",
    name: "Economics of Sports",
    fullName: "ECON 149: Economics of Sports",
    description:
      "A specialized track for data-driven research within the sports and entertainment industries.",
    tier: 3,
    prerequisites: ["econ-001"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Apply economics to sports business models",
        "Analyze player valuation and contracts",
        "Understand sports media markets",
        "Evaluate franchise economics",
      ],
      topics: [
        "Sports Labor Markets",
        "Player Valuation",
        "Media Rights Economics",
        "Franchise Economics",
        "Fan Engagement Analysis",
        "Stadium Economics",
      ],
      careerRelevance:
        "Perfect for students passionate about sports analytics. Teams, leagues, and sports media companies increasingly rely on data-driven market research.",
    },
  },
  {
    id: "mist-070",
    code: "MIST 070",
    name: "Innovation Management",
    fullName: "MIST 070: Innovation Management",
    description:
      "If you want to work on 'New Product Development' (NPD) teams for tech startups.",
    tier: 3,
    prerequisites: [],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Manage innovation processes",
        "Lead new product development",
        "Evaluate technology opportunities",
        "Build innovation strategies",
      ],
      topics: [
        "New Product Development",
        "Innovation Process Management",
        "Technology Forecasting",
        "Idea Generation & Selection",
        "Commercialization Strategy",
        "Startup Innovation Models",
      ],
      careerRelevance:
        "Ideal for students interested in product management or startup environments. NPD teams need market researchers who understand the innovation process.",
    },
  },
];

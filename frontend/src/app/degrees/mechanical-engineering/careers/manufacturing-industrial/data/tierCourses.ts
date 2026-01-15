/**
 * Manufacturing / Industrial Engineer Career Path - Tier Courses
 * Detailed course information for each tier
 */

import { TierCourse } from "@/types/careerPath";

// Tier 1: Must-Take Courses (🟢)
export const tier1Courses: TierCourse[] = [
  {
    id: "me-121",
    code: "ME 121",
    name: "Introduction to Manufacturing Processes",
    fullName: "ME 121: Introduction to Manufacturing Processes",
    description:
      "Comprehensive study of manufacturing methods and processes. Foundation for understanding how products are made at scale.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Understand various manufacturing processes",
        "Select appropriate manufacturing methods",
        "Design for manufacturability",
        "Optimize production processes",
      ],
      topics: [
        "Machining and forming",
        "Casting and molding",
        "Joining processes",
        "Additive manufacturing",
      ],
      careerRelevance:
        "Essential foundation for manufacturing engineers - understanding how products are made is critical for process optimization and quality improvement.",
    },
  },
  {
    id: "engr-143",
    code: "ENGR 143",
    name: "Statistical Quality Control",
    fullName: "ENGR 143: Statistical Quality Control",
    description:
      "Statistical methods for quality assurance and process control. Critical for maintaining product quality and process capability.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Apply statistical process control (SPC)",
        "Design control charts",
        "Conduct capability analysis",
        "Implement quality improvement methods",
      ],
      topics: [
        "Control charts",
        "Process capability",
        "Six Sigma methodology",
        "Statistical sampling",
      ],
      careerRelevance:
        "Core skill for industrial engineers - ensures products meet specifications and processes remain in control.",
    },
  },
  {
    id: "engr-155",
    code: "ENGR 155",
    name: "Engineering Economic Analysis",
    fullName: "ENGR 155: Engineering Economic Analysis",
    description:
      "Economic principles for engineering decisions. Essential for evaluating manufacturing investments and process improvements.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Perform cost-benefit analysis",
        "Evaluate capital investments",
        "Calculate return on investment (ROI)",
        "Make data-driven economic decisions",
      ],
      topics: [
        "Time value of money",
        "Investment analysis",
        "Cost estimation",
        "Decision analysis",
      ],
      careerRelevance:
        "Critical for justifying process improvements, equipment purchases, and automation investments in manufacturing.",
    },
  },
  {
    id: "engr-080",
    code: "ENGR 080",
    name: "Statistical Modeling and Data Analysis",
    fullName: "ENGR 080: Statistical Modeling and Data Analysis",
    description:
      "Advanced statistical techniques for analyzing manufacturing data and optimizing processes.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Build statistical models",
        "Analyze complex datasets",
        "Design experiments",
        "Optimize process parameters",
      ],
      topics: [
        "Regression analysis",
        "Design of experiments (DOE)",
        "ANOVA",
        "Predictive modeling",
      ],
      careerRelevance:
        "Valuable for data-driven decision making and process optimization in modern manufacturing environments.",
    },
  },
  {
    id: "engr-190",
    code: "ENGR 190 / 193 / 194",
    name: "Engineering Capstone Design",
    fullName: "ENGR 190 / ENGR 193 / ENGR 194: Engineering Capstone Design",
    description:
      "Senior design project integrating manufacturing, systems thinking, and project management skills.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Complete comprehensive engineering design project",
        "Work in multidisciplinary teams",
        "Apply manufacturing and systems engineering principles",
        "Present and document design work professionally",
      ],
      topics: [
        "System design and integration",
        "Project management",
        "Technical communication",
        "Design for manufacturability",
      ],
      careerRelevance:
        "Capstone experience demonstrates ability to complete complex engineering projects - essential for manufacturing and industrial engineering roles.",
    },
  },
];

// Tier 2: Strongly Recommended Courses (🟡)
export const tier2Courses: TierCourse[] = [
  {
    id: "ee-185",
    code: "EE 185",
    name: "Instrumentation",
    fullName: "EE 185: Instrumentation",
    description:
      "Measurement systems and sensors for manufacturing processes. Important for monitoring and controlling production.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Select appropriate sensors",
        "Design data acquisition systems",
        "Implement process monitoring",
        "Analyze measurement uncertainty",
      ],
      topics: [
        "Industrial sensors",
        "Data acquisition",
        "Signal conditioning",
        "Measurement systems",
      ],
      careerRelevance:
        "Essential for implementing Industry 4.0 and smart manufacturing systems with real-time monitoring.",
    },
  },
  {
    id: "ee-005",
    code: "EE 005",
    name: "Designing and Building Electrical Engineering Systems",
    fullName: "EE 005: Designing and Building Electrical Engineering Systems",
    description:
      "Hands-on experience designing and building electrical systems. Valuable for understanding automation equipment.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Design electrical control systems",
        "Build prototype systems",
        "Troubleshoot electrical circuits",
        "Integrate electrical components",
      ],
      topics: [
        "Circuit design",
        "System integration",
        "Prototyping",
        "Testing and validation",
      ],
      careerRelevance:
        "Important for working with automated manufacturing equipment and understanding factory electrical systems.",
    },
  },
  {
    id: "engr-175",
    code: "ENGR 175",
    name: "Information Systems for Management",
    fullName: "ENGR 175: Information Systems for Management",
    description:
      "Enterprise systems and information technology for manufacturing operations management.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Understand ERP and MES systems",
        "Manage manufacturing data systems",
        "Analyze operational data",
        "Implement digital transformation",
      ],
      topics: [
        "Enterprise Resource Planning (ERP)",
        "Manufacturing Execution Systems (MES)",
        "Supply chain information systems",
        "Data analytics for operations",
      ],
      careerRelevance:
        "Critical for managing modern manufacturing operations with integrated information systems and data analytics.",
    },
  },
  {
    id: "me-240",
    code: "ME 240",
    name: "Sustainable Design and Manufacturing",
    fullName: "ME 240: Sustainable Design and Manufacturing",
    description:
      "Environmental considerations and sustainable practices in manufacturing operations.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Apply sustainable manufacturing principles",
        "Assess environmental impact",
        "Design for sustainability",
        "Optimize resource efficiency",
      ],
      topics: [
        "Life cycle assessment",
        "Green manufacturing",
        "Waste reduction",
        "Energy efficiency",
      ],
      careerRelevance:
        "Increasingly important for modern manufacturing engineers to address sustainability goals and regulatory requirements.",
    },
  },
];

// Tier 3: Optional / Depth Courses (🟠)
export const tier3Courses: TierCourse[] = [
  {
    id: "ee-130",
    code: "EE 130",
    name: "Electrical Machines",
    fullName: "EE 130: Electrical Machines",
    description:
      "Study of motors, generators, and drives used in industrial automation and material handling.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Understand motor operation",
        "Select motors for applications",
        "Design motor drive systems",
        "Analyze machine performance",
      ],
      topics: [
        "AC/DC motors",
        "Motor drives",
        "Power electronics",
        "Motor control",
      ],
      careerRelevance:
        "Useful for designing automated production lines and material handling systems with motorized equipment.",
    },
  },
  {
    id: "ee-160",
    code: "EE 160",
    name: "Electric Power Systems",
    fullName: "EE 160: Electric Power Systems",
    description:
      "Power distribution and management in industrial facilities. Important for large-scale manufacturing operations.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Design industrial power systems",
        "Analyze power quality",
        "Optimize energy usage",
        "Ensure electrical safety",
      ],
      topics: [
        "Power distribution",
        "Load analysis",
        "Energy efficiency",
        "Power system protection",
      ],
      careerRelevance:
        "Valuable for managing factory power infrastructure and optimizing energy consumption in manufacturing facilities.",
    },
  },
  {
    id: "soc-140",
    code: "SOC 140",
    name: "Organizational Behavior",
    fullName: "SOC 140: Organizational Behavior",
    description:
      "Understanding human behavior in organizations - essential for managing teams and leading change in manufacturing environments.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Understand organizational dynamics",
        "Lead and motivate teams",
        "Manage organizational change",
        "Apply behavioral science to workplace",
      ],
      topics: [
        "Team dynamics",
        "Leadership styles",
        "Organizational culture",
        "Change management",
      ],
      careerRelevance:
        "Important soft skills for industrial engineers who manage teams, lead process improvements, and drive organizational change.",
    },
  },
];

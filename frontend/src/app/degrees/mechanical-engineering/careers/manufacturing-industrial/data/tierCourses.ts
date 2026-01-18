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
      credits: 4,
      careerRelevance:
        "Essential foundation for manufacturing engineers - understanding how products are made is critical for process optimization and quality improvement. You will use this daily when evaluating if a design can be produced cost-effectively.",
      realWorldApplications: [
        "Designing parts for CNC machining and EDM processes",
        "Selecting joining methods for aerospace assemblies",
        "Optimizing part geometry to reduce manufacturing time",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=9YxZ9xb_xcM", // Manufacturing Processes: Engineering Overview
          "https://www.youtube.com/watch?v=UevuAb7SZTI", // Manufacturing Process Crash Course
          "https://www.youtube.com/watch?v=IqM50dYI-xQ", // Injection Molding & Transfer Molding Animation
        ],
        websites: [],
        tools: ["Fusion 360 CAM", "Mastercam", "SolidWorks CAM"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Core skill for industrial engineers - ensures products meet specifications and processes remain in control. This course provides the certification-ready skills often required for Green/Black Belt roles.",
      realWorldApplications: [
        "Implementing control charts to monitor assembly line deviations",
        "Conducting Gage R&R studies to validate measurement systems",
        "Calculating Cpk to prove process capability to customers",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=OsBHveO6ncc", // Statistical Quality Control - Control & Range Charts
          "https://www.youtube.com/watch?v=gWYfNk9nqZc", // Quality Control Charts (Attributes vs Variables)
          "https://www.youtube.com/watch?v=sV5PRDV7hyM", // Introduction to Control Charts (QC101)
        ],
        websites: [],
        tools: ["Minitab", "Excel SPC tools", "JMP"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Critical for justifying process improvements, equipment purchases, and automation investments. You cannot be a lead engineer without understanding how to calculate ROI and payback periods for your proposed projects.",
      realWorldApplications: [
        "Calculating ROI for new robotic automation cells",
        "Comparing lease vs. buy options for heavy machinery",
        "Determining the break-even point for a new product line",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=uVbRDXA3oyk", // What Is Engineering Economics? (Time Value of Money)
          "https://www.youtube.com/watch?v=umBn6RCjMjI", // Introduction to Time Value Of Money
          "https://www.youtube.com/watch?v=uP6MB-x_UsE", // Time Value of Money in Engineering Economics
        ],
        websites: [],
        tools: ["Excel (Financial Functions)", "Cost estimation software"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Valuable for data-driven decision making. In modern 'Industry 4.0' factories, you must be able to design experiments (DOE) to solve complex yield issues that simple intuition cannot fix.",
      realWorldApplications: [
        "Running DOEs to find optimal injection molding parameters",
        "Using regression analysis to predict equipment failure",
        "Analyzing variance (ANOVA) to compare production lines",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=NoVlRAq0Uxs", // What Is Design of Experiments? (Part 1)
          "https://www.youtube.com/watch?v=aKTaisrn0Fs", // Design of Experiments (DOE) – The Basics
          "https://www.youtube.com/watch?v=ztxHObo5gnU", // Design of Experiments: Sampling & Interactions
        ],
        websites: [],
        tools: ["R", "Python (Pandas/SciPy)", "Minitab"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Capstone experience demonstrates ability to complete complex engineering projects. For industrial engineers, this is often the first time you will manage a full budget, schedule, and cross-functional team deliverables.",
      realWorldApplications: [
        "Setting up a pilot production line for a new product",
        "Managing a cross-functional team to deliver a prototype",
        "Writing technical documentation for hand-off to operations",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=KpWrHVo972g", // The Engineering Design Process Simplified
          "https://www.youtube.com/watch?v=MAhpfFt_mWM", // The Engineering Design Process (Project Context)
          "https://www.youtube.com/watch?v=MFGg1calQ6k", // Design Process at National Air and Space Museum
        ],
        websites: [],
        tools: ["Microsoft Project", "Jira", "CAD/PLM tools"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Essential for implementing Industry 4.0 and smart manufacturing. You need to know how to select the right thermocouples, pressure transducers, and accelerometers to feed data into your quality systems.",
      realWorldApplications: [
        "Installing vibration sensors for predictive maintenance",
        "Calibrating temperature sensors for heat treat ovens",
        "Designing DAQ loops for automated test equipment",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2TOZQ-AcI30", // Introduction to Instrumentation & DAQ
          "https://www.youtube.com/watch?v=bcqzdw29tC0", // Understanding Sensors and Actuators
          "https://www.youtube.com/watch?v=evup46yGNy0", // How Sensors & Actuators Make Automation Smart
        ],
        websites: [],
        tools: ["LabVIEW", "NI DAQ hardware", "Industrial IoT Gateways"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Important for working with automated manufacturing equipment. Industrial engineers often have to troubleshoot basic electrical panels or communicate with electricians about PLC wiring; this course bridges that gap.",
      realWorldApplications: [
        "Wiring emergency stop circuits for safety compliance",
        "Interfacing sensors with microcontroller logic",
        "Debugging basic power supply issues on the floor",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=JGuxV7dry-8", // The Magic of Mechatronics
          "https://www.youtube.com/watch?v=0iE3hqeEBYw", // Arduino vs Raspberry Pi: Which is Right for You?
          "https://www.youtube.com/watch?v=f5hRP7e86mM", // Hardware Selection for Projects
        ],
        websites: [],
        tools: ["Arduino", "Multimeters", "Schematic software"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Critical for managing modern operations. You will likely work inside an ERP (like SAP) or MES (Manufacturing Execution System) daily to track inventory, schedule production, and analyze cycle times.",
      realWorldApplications: [
        "Configuring Bill of Materials (BOMs) in SAP",
        "Tracking work-in-progress (WIP) through MES dashboards",
        "Analyzing supply chain lead times using SQL queries",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=irbXBbwC9ic", // MES Systems: The Secret To Manufacturing Success
          "https://www.youtube.com/watch?v=g9zi55hsuLE", // What is Manufacturing Execution Systems (MES)?
          "https://www.youtube.com/watch?v=n2pcg8k7wFY", // Industrial & Electrical Equipment Industry - Introduction
        ],
        websites: [],
        tools: ["SAP / Oracle ERP", "Tableau / PowerBI", "SQL"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Increasingly important as companies race to meet 'Net Zero' goals. Engineers with this skill set lead projects on energy reduction, waste minimization, and material recycling, which are now board-level priorities.",
      realWorldApplications: [
        "Conducting Life Cycle Assessments (LCA) on product lines",
        "Reducing scrap rates to minimize material waste",
        "Selecting eco-friendly packaging materials",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=4UxXRraPLx0", // How SAP Can Help You Prepare Lifecycle Assessments
          "https://www.youtube.com/watch?v=_JpXa_8_pZg", // How Life Cycle Assessments Drive Product Sustainability
          "https://www.youtube.com/watch?v=04K0bLwCDdM", // The Incredible Properties of Composite Materials (Material Selection Context)
        ],
        websites: [],
        tools: ["GaBi / SimaPro (LCA Software)", "Energy monitoring tools"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Useful for designing automated production lines. Conveyors, robots, and pumps all run on motors; understanding torque curves and VFDs (Variable Frequency Drives) helps you size equipment correctly.",
      realWorldApplications: [
        "Sizing motors for conveyor belt systems",
        "Troubleshooting VFD faults on production equipment",
        "Selecting servos for precision robotic actuators",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=AOC7uTnxmTI", // Induction Motor Basics
          "https://www.youtube.com/watch?v=hAim95A7psA", // Introduction to Electric Motors (Selection Guide)
          "https://www.youtube.com/watch?v=YN3WxFzBQaU", // Introduction to Machines | Overview
        ],
        websites: [],
        tools: ["Motor sizing software", "MATLAB Simulink"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Valuable for managing factory infrastructure. If you work in facilities engineering or plant management, understanding 3-phase power, transformers, and load balancing is mandatory for keeping the lights (and machines) on.",
      realWorldApplications: [
        "Balancing electrical loads across factory phases",
        "Planning power drops for new machine installations",
        "Analyzing power factor correction to save energy costs",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=n2pcg8k7wFY", // Industrial & Electrical Equipment Industry Overview
          "https://www.youtube.com/watch?v=CajlpIY7J1M", // How Electrical Power Systems Really Work in Industries
          "https://www.youtube.com/watch?v=2hfmZdwpOM0", // Understanding Voltage in Industrial Automation
        ],
        websites: [],
        tools: ["ETAP", "AutoCAD Electrical"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Industrial engineering is 50% technical and 50% people. You can design the perfect process, but if you can't influence the floor staff to adopt it, it will fail. This course covers the psychology of leadership and change management.",
      realWorldApplications: [
        "Leading Kaizen events with diverse teams",
        "Managing resistance to new automation technology",
        "Developing incentive structures for production staff",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=QJAv6674_Sw", // Organizational Behavior (Hypothesis & Research)
          "https://www.youtube.com/watch?v=MAhpfFt_mWM", // The Engineering Design Process (Project Context)
          "https://www.youtube.com/watch?v=KpWrHVo972g", // The Engineering Design Process Simplified (Teamwork Focus)
        ],
        websites: [],
        tools: ["Change Management Frameworks (ADKAR)", "Survey tools"],
      },
    },
    prerequisites: [],
  },
];
/**
 * Energy Systems / Power / Sustainability Engineer Career Path - Tier Courses
 * Detailed course information for each tier
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
    id: "me-120",
    code: "ME 120",
    name: "Component Design",
    fullName: "ME 120: Component Design",
    description:
      "Core mechanical design principles covering stress analysis, stiffness, static/dynamic loading, failure theories, fatigue, and sizing of discrete machine components. Essential for engineering mechanical systems ready for real-world deployment.",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Component design is fundamental for mechanical design engineers in aerospace/defense, as sizing and analyzing gears, shafts, bearings, and fasteners under complex loading is work done daily in high-stakes industries. Precision here ensures structural integrity and reliability in flight hardware and robotic systems.",
      realWorldApplications: [
        "Sizing aerospace drivetrain shafts to meet mission load cases",
        "Selecting bearings and fasteners for high-vibration defense applications",
        "Analyzing static and fatigue failure in UAV actuation systems",
      ],
      learningOutcomes: [
        "Perform 3D stress and deflection analysis of machine components",
        "Apply failure theories under static/dynamic loading",
        "Select appropriate design margins for aerospace components",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=kCqHjUOEJ4s", // Introduction to Mechanical Design Process
          "https://www.youtube.com/watch?v=xkbQnBAOFEg", // Understanding Failure Theories (Tresca, von Mises)
          "https://www.youtube.com/watch?v=qT5CmwMlyUc", // Gear and Shaft Design Example Problem
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68067", // UC Merced ME 120 catalog :contentReference[oaicite:turn0search0]{index=3}
        ],
        tools: ["SolidWorks (3D CAD)", "ANSYS / Abaqus (FEA)", "Matlab (design analysis)"],
      },
    },
    prerequisites: [],
  },
  {
    id: "me-137",
    code: "ME 137",
    name: "Computer Aided Engineering",
    fullName: "ME 137: Computer Aided Engineering",
    description:
      "Advanced computational tools for design simulation and validation, including CAD/CAE workflows to virtually test mechanical systems before prototyping.",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "CAE mastery is essential in aerospace and defense where prototype cost is high and design margins are tight; engineers use CAE to verify performance early. Fluency in software like SolidWorks Simulation and FEA tools accelerates design cycles in advanced engineering roles.",
      realWorldApplications: [
        "Simulating thermal/stress distribution in jet engine mounts",
        "Virtual testing of landing gear components under service loads",
        "Optimizing assembly designs before physical prototype builds",
      ],
      learningOutcomes: [
        "Build CAD models oriented for analysis workflows",
        "Run FEA simulations and interpret results",
        "Iterate design based on virtual test feedback",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=--19Q1Kvafw", // Introduction to CAD and CAE Workflows
          "https://www.youtube.com/watch?v=mD1dxwdMKMg", // Complex Impeller Design in SolidWorks (Step-by-Step)
          "https://www.youtube.com/watch?v=VudAV6YCnss", // Master SolidWorks Weldments & Structural Frames
        ],
        websites: [
          "https://www.autodesk.com/solutions/cad-software", // CAD vendor overview (for reference)
        ],
        tools: ["SolidWorks", "ANSYS", "CATIA", "NX CAD/CAE"],
      },
    },
    prerequisites: [],
  },
  {
    id: "me-135",
    code: "ME 135",
    name: "Finite Element Analysis",
    fullName: "ME 135: Finite Element Analysis",
    description:
      "Finite element methods for analyzing stresses, thermal loads, and vibration in engineered systems — cornerstone of computational design verification.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "FEA is used daily in aerospace/defense to ensure components meet stress, thermal, and dynamic requirements before manufacturing. Competency here is a must for design validation and optimization in high-performance engineering organizations.",
      realWorldApplications: [
        "Stress analysis of satellite structure under launch loads",
        "Thermal expansion evaluation in hypersonic skins",
        "Modal analysis of rotating machinery in defense systems",
      ],
      learningOutcomes: [
        "Develop FEA models for structural problems",
        "Interpret convergence and mesh quality",
        "Validate FEA results against theory and experiments",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=UOp6JEiJctA", // Introduction to Finite Element Analysis (FEA)
          "https://www.youtube.com/watch?v=yAnkX8gz8ls", // Introduction to Finite Element Methods (Lecture)
          "https://www.youtube.com/watch?v=-Kjb77fjoP8", // The Finite Element Method (Conceptual Overview)
        ],
        websites: [
          "https://ocw.mit.edu/courses/16-651-finite-element-methods-fall-2009/", // MIT OCW FEA
        ],
        tools: ["ANSYS / Abaqus", "HyperWorks", "COMSOL"],
      },
    },
    prerequisites: [],
  },
  {
    id: "engr-045",
    code: "ENGR 045",
    name: "Introduction to Materials",
    fullName: "ENGR 045: Introduction to Materials",
    description:
      "Overview of material behavior, microstructure, and selection criteria for engineering design under mechanical and environmental loads.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Material selection drives performance, durability, and manufacturability in aerospace and defense products. Engineers use these principles to choose alloys, composites, and treatments that ensure mission success under extreme conditions.",
      realWorldApplications: [
        "Selecting titanium alloys for weight-critical aerospace parts",
        "Evaluating composite layups for UAV airframes",
        "Assessing fatigue/life criteria for high-cycle environments",
      ],
      learningOutcomes: [
        "Understand material properties and behaviors",
        "Apply material selection frameworks to design problems",
        "Assess trade-offs between strength, weight, and cost",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=DzqqVIO-PKI", // Introduction to Materials Science & Engineering
          "https://www.youtube.com/watch?v=W5cviLowZ1U", // Stress and Strain (Mechanical Properties)
          "https://www.youtube.com/watch?v=04K0bLwCDdM", // The Incredible Properties of Composite Materials
        ],
        websites: [
          "https://www.materialsproject.org/", // Materials database
        ],
        tools: ["Granta Selector", "Matlab for property analysis"],
      },
    },
    prerequisites: [],
  },
  {
    id: "engr-151",
    code: "ENGR 151",
    name: "Strength of Materials",
    fullName: "ENGR 151: Strength of Materials",
    description:
      "Mechanics of materials covering stress, strain, beam theory, combined loading, and deflection — foundational to all mechanical design analysis.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Strength of materials is the foundational analytical backbone for component sizing and stress analysis in aerospace/defense engineering, enabling accurate prediction of load-carrying capacity. High-end roles rely on these skills for credible design decisions under certification standards.",
      realWorldApplications: [
        "Beam bending analysis for landing gear support structures",
        "Stress mapping of aircraft wing spars",
        "Fatigue life prediction under repeated loading",
      ],
      learningOutcomes: [
        "Apply stress-strain relationships to structural problems",
        "Solve beam theory and combined loading problems",
        "Estimate deflections and stress concentrations",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=W5cviLowZ1U", // Strength of Materials Part 1: Stress and Strain
          "https://www.youtube.com/watch?v=9YDomNEqdAQ", // Mohr's Circle Explained (Stress Transformation)
          "https://www.youtube.com/watch?v=qq4CdfbkqQM", // Mechanical Properties & Testing
        ],
        websites: [],
        tools: ["Matlab", "SolidWorks Simulation"],
      },
    },
    prerequisites: [],
  },
  {
    id: "engr-190",
    code: "ENGR 190/193/194",
    name: "Engineering Capstone Design",
    fullName: "ENGR 190/193/194: Engineering Capstone Design",
    description:
      "Senior design project where students lead a complete engineering design cycle from concept to prototype and testing.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Capstone design simulates real engineering practice — defining requirements, iterating designs, validating prototypes, and presenting results — directly mirroring aerospace/defense project flows. Employers look for students who have completed integrated design challenges.",
      realWorldApplications: [
        "Delivering flight-ready prototype mechanisms",
        "Documenting design decisions for professional portfolios",
        "Coordinating multidisciplinary team deliverables",
      ],
      learningOutcomes: [
        "Lead a full mechanical design project",
        "Integrate analysis, design, testing, and documentation",
        "Collaborate within multidisciplinary teams",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=KpWrHVo972g", // The Engineering Design Process Simplified
          "https://www.youtube.com/watch?v=MAhpfFt_mWM", // The Engineering Design Process (Project Context)
          "https://www.youtube.com/watch?v=MFGg1calQ6k", // Design Process at National Air and Space Museum
        ],
        websites: [],
        tools: ["Project management tools", "CAD/CAE software"],
      },
    },
    prerequisites: [],
  },
];

export const tier2Courses: TierCourse[] = [
  {
    id: "me-121",
    code: "ME 121",
    name: "Introduction to Manufacturing Processes",
    fullName: "ME 121: Introduction to Manufacturing Processes",
    description:
      "Fundamental manufacturing processes like machining, casting, forming, and joining, including design implications for producibility and cost optimization.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Designing for manufacturability is critical in aerospace/defense where producibility directly affects cost and schedule. Engineers must know how choices in design translate to feasible and economical manufacturing outcomes.",
      realWorldApplications: [
        "Designing parts for CNC machining and EDM processes",
        "Selecting joining methods for aerospace assemblies",
        "Optimizing part geometry to reduce manufacturing time",
      ],
      learningOutcomes: [
        "Identify manufacturing process capabilities and limits",
        "Analyze design features for manufacturability",
        "Recommend process choices based on design constraints",
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
    id: "me-129",
    code: "ME 129",
    name: "Tribology",
    fullName: "ME 129: Tribology",
    description:
      "Study of friction, wear, and lubrication phenomena in mechanical systems — key for selecting interfaces and extending service life.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Mechanisms in aerospace/defense endure extreme surface interactions; tribology knowledge ensures bearing life, reduces wear, and improves efficiency in gearboxes and actuators. Tribology affects reliability, maintenance intervals, and overall system performance.",
      realWorldApplications: [
        "Engine oil film design for turbine bearings",
        "Wear analysis in landing gear retract mechanisms",
        "Lubrication strategy development for flight control actuators",
      ],
      learningOutcomes: [
        "Understand friction and wear mechanisms",
        "Select lubricants for mechanical assemblies",
        "Analyze contact surfaces under load",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=0H_Oc6cN7Bk", // MIT Tribology: Friction, Wear, and Lubrication
          "https://www.youtube.com/watch?v=GvoqKKTl-2w", // Tribology: The Science of Friction
          "https://www.youtube.com/watch?v=hBhnzAeBUA0", // The Stribeck Curve and Lubrication Regimes
        ],
        websites: [
          "https://nptel.ac.in/courses/112/102/112102014/", // NPTEL tribology series :contentReference[oaicite:turn0search13]{index=0}
        ],
        tools: ["Matlab", "ANSYS contact analysis"],
      },
    },
    prerequisites: [],
  },
  {
    id: "engr-052",
    code: "ENGR 052",
    name: "Computer Modeling and Analysis",
    fullName: "ENGR 052: Computer Modeling and Analysis",
    description:
      "3D CAD modeling and parametric design practice, focusing on assemblies and engineering drawings necessary for mechanical design documentation.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Mechanical design engineers must deliver precise CAD models and drawings suitable for manufacturing and review by cross-functional teams. In aerospace, tolerancing and assembly relations are integral to hardware acceptance.",
      realWorldApplications: [
        "Parametric assembly creation for flight hardware",
        "Detailing engineering drawings per ASME Y14 standards",
        "Managing revisions and configurations in CAD",
      ],
      learningOutcomes: [
        "Build constrained parametric CAD models",
        "Generate engineering drawings with GD&T",
        "Manage CAD assemblies and configurations",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=--19Q1Kvafw", // Intro to CAD Workflows
          "https://www.youtube.com/watch?v=mD1dxwdMKMg", // Step-by-Step Impeller Modeling in SolidWorks
          "https://www.youtube.com/watch?v=VudAV6YCnss", // SolidWorks Weldments & Structural Frames
        ],
        websites: [],
        tools: ["SolidWorks", "Inventor", "Fusion 360"],
      },
    },
    prerequisites: [],
  },
  {
    id: "me-205",
    code: "ME 205",
    name: "Design of Scientific and Engineering Experiments",
    fullName: "ME 205: Design of Scientific and Engineering Experiments",
    description:
      "Statistical methods and experimental design techniques used to validate engineering hypotheses and performance outcomes.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Experimental design and statistical analysis are central to verifying mechanical designs against requirements and safety factors in aerospace/defense. Engineers with these skills design meaningful tests and derive decision-quality insights from data.",
      realWorldApplications: [
        "Designing test matrices for vibration testing",
        "Applying ANOVA to compare material performance",
        "Determining sample sizes for fatigue tests",
      ],
      learningOutcomes: [
        "Create statistically valid experiment frameworks",
        "Analyze design performance using statistical tools",
        "Interpret data with confidence intervals and error analysis",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ZoaUu6iRE64", // Design of Experiments (DoE) Explained
          "https://www.youtube.com/watch?v=m6WoQpggrAY", // DoE Crash Course for Experimenters
          "https://www.youtube.com/watch?v=IzEg-TCMmIQ", // Lean Six Sigma Green Belt (Data Analysis Context)
        ],
        websites: [],
        tools: ["Minitab", "R", "MATLAB Statistics Toolbox"],
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
      "Techniques and tools to ensure products meet rigorous specs and performance consistency using statistical methodologies.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Quality control is mission-critical in aerospace/defense where defects can cause catastrophic failures. Engineers use statistical techniques to monitor processes and enforce consistency to standards like AS9100.",
      realWorldApplications: [
        "Control charts for machining process variation",
        "Capability analysis for precision component tolerances",
        "Root-cause analysis on production test outcomes",
      ],
      learningOutcomes: [
        "Implement control charts and process capability indices",
        "Analyze variation sources in production",
        "Recommend quality improvement plans",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=sV5PRDV7hyM", // QC101 Control Charts
          "https://www.youtube.com/watch?v=OsBHveO6ncc", // Statistical Quality Control - Control & Range Charts
          "https://www.youtube.com/watch?v=oUNnYNQe3us", // Six Sigma Green Belt Training (Quality Focus)
        ],
        websites: [],
        tools: ["Minitab", "Excel SPC tools"],
      },
    },
    prerequisites: [],
  },
  {
    id: "ee-185",
    code: "EE 185",
    name: "Instrumentation",
    fullName: "EE 185: Instrumentation",
    description:
      "Measurement systems and sensors critical for testing and validating mechanical designs under operational conditions.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Testing and validation are core parts of mechanical design verification in aerospace/defense; instrumentation skills allow engineers to collect robust data used in certification. This covers sensors, signal conditioning, and data acquisition systems.",
      realWorldApplications: [
        "Selecting IMUs for vibration and dynamics measurement",
        "Designing DAQ systems for structural testing",
        "Analyzing noise and uncertainty in measurements",
      ],
      learningOutcomes: [
        "Select appropriate sensors and measurement devices",
        "Design data acquisition systems",
        "Analyze measurement uncertainty",
        "Implement instrumentation for testing",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2TOZQ-AcI30", // Introduction to Instrumentation & DAQ
          "https://www.youtube.com/watch?v=bcqzdw29tC0", // Understanding Sensors and Actuators
          "https://www.youtube.com/watch?v=evup46yGNy0", // How Sensors & Actuators Make Automation Smart
        ],
        websites: [],
        tools: ["LabVIEW", "NI DAQ hardware", "MATLAB"],
      },
    },
    prerequisites: [],
  },
];

export const tier3Courses: TierCourse[] = [
  {
    id: "me-239",
    code: "ME 239",
    name: "Nano-Fabrication",
    fullName: "ME 239: Nano-Fabrication for Interdisciplinary Materials Sciences",
    description:
      "Micro- and nanoscale fabrication techniques for sensors, MEMS, and advanced materials — extending design skills into cutting-edge manufacturing domains.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Nano-fabrication knowledge benefits mechanical designers working on precision sensors, MEMS actuators, and components used in aerospace instrumentation and defense tech. Understanding fabrication constraints at small scales influences design decisions in high-performance systems.",
      realWorldApplications: [
        "Designing MEMS inertial sensors for spacecraft",
        "Integrating microdevices into aerospace systems",
        "Evaluating fabrication limits in advanced materials",
      ],
      learningOutcomes: [
        "Understand micro/nano fabrication process flows",
        "Select materials compatible with small-scale manufacturing",
        "Translate microdesign intent to fabrication masks and parameters",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=TjpbrLTem3M", // Fabrication Processes of a Chip
          "https://www.youtube.com/watch?v=HPyckggOa4U", // Nanofabrication Techniques: Photolithography
          "https://www.youtube.com/watch?v=NUizxu1Yizs", // Steps of Photolithography Explained
        ],
        websites: [],
        tools: ["SEM/TEM data visualization", "Cleanroom CAD tools"],
      },
    },
    prerequisites: [],
  },
  {
    id: "engr-170",
    code: "ENGR 170",
    name: "Introduction to Electron Microscopy",
    fullName: "ENGR 170: Introduction to Electron Microscopy",
    description:
      "Advanced techniques for high-resolution material characterization key for failure analysis and quality assurance.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Material characterization at high resolution is vital for root-cause analysis and certification in aerospace/defense. Electron microscopy data informs design revisions to prevent repeat failures.",
      realWorldApplications: [
        "Investigating fracture surfaces in failed components",
        "Inspecting microstructure of high-temperature alloys",
        "Reporting results for quality control documentation",
      ],
      learningOutcomes: [
        "Operate and interpret electron microscopy results",
        "Correlate microstructure to material performance",
        "Report characterization outcomes effectively",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=znItNYz7qHs", // Scanning Electron Microscope (SEM) Working Principle
          "https://www.youtube.com/watch?v=KfQ4VNpWN4M", // SEM Imaging Animation (Secondary & Backscattered)
          "https://www.youtube.com/watch?v=B0g1_rr-ApI", // Introduction to Microfabrication (Material Context)
        ],
        websites: [],
        tools: ["SEM/TEM imaging tools", "ImageJ"],
      },
    },
    prerequisites: [],
  },
  {
    id: "wri-119",
    code: "WRI 119",
    name: "Writing for Engineering",
    fullName: "WRI 119: Writing for Engineering",
    description:
      "Technical communication skills essential for documenting designs, writing reports, and communicating decisions clearly and professionally.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Mechanical designers must document analysis, decisions, and design specs clearly for multidisciplinary review and certification. Technical communication is often the difference between accepted designs and costly redesigns.",
      realWorldApplications: [
        "Writing engineering reports for design reviews",
        "Authoring test plans and results documentation",
        "Presenting mechanical design rationale to stakeholders",
      ],
      learningOutcomes: [
        "Compose clear technical reports",
        "Document design requirements and analysis steps",
        "Present technical data effectively to varied audiences",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=QJ3bZeF1AKg", // Technical Reports: Basics and Structure
          "https://www.youtube.com/watch?v=haEjVWFnVgg", // Technical Report Writing II (Advanced)
          "https://www.youtube.com/watch?v=lbCh94nJqIo", // How to Write a Clear & Concise Abstract
        ],
        websites: [],
        tools: ["Google Docs", "Notion", "LaTeX"],
      },
    },
    prerequisites: [],
  },
  {
    id: "ae-171",
    code: "AE 171",
    name: "Aerospace Structures and Materials",
    fullName: "AE 171: Aerospace Structures and Materials",
    description:
      "Study of structural mechanics and material behavior in aerospace contexts, focusing on lightweight and high-performance design for flight applications.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Mechanical designers in aerospace settings often need advanced structural insights when working on flight hardware, airframes, or high-pressure components. Understanding aerospace material behavior and structural principles elevates typical mechanical design paradigms.",
      realWorldApplications: [
        "Evaluating composite layups for aircraft skins",
        "Designing lightweight load paths for UAVs",
        "Applying fatigue and fracture mechanics to flight components",
      ],
      learningOutcomes: [
        "Analyze aerospace structural elements",
        "Select advanced materials for lightweight design",
        "Evaluate stress distribution in complex geometries",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Ub2E6-pr3r4", // Introduction to Aircraft Structural Analysis
          "https://www.youtube.com/watch?v=lGjtqxOgHf0", // Introduction to Aerospace Structures and Materials
          "https://www.youtube.com/watch?v=04K0bLwCDdM", // The Incredible Properties of Composite Materials
        ],
        websites: [],
        tools: ["SolidWorks Simulation", "ANSYS"],
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
      "Hands-on electrical system design and prototyping to support mechatronic and integrated systems within mechanical designs.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Mechanical design engineers often work alongside electrical systems — understanding hardware integration and troubleshooting boosts interdisciplinary effectiveness. In aerospace projects, mechanical and electrical integration is mission-critical.",
      realWorldApplications: [
        "Integrating sensors and actuators into mechanical assemblies",
        "Prototyping embedded systems for controls",
        "Troubleshooting electromechanical interfaces in prototypes",
      ],
      learningOutcomes: [
        "Design basic electrical circuits",
        "Integrate electrical components into mechanical systems",
        "Test and validate combined systems",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=JGuxV7dry-8", // The Magic of Mechatronics
          "https://www.youtube.com/watch?v=0iE3hqeEBYw", // Arduino vs Raspberry Pi: Which is Right for You?
          "https://www.youtube.com/watch?v=f5hRP7e86mM", // Hardware Selection for Projects (Arduino/Pi)
        ],
        websites: [],
        tools: ["Arduino / Raspberry Pi", "Oscilloscopes", "Multimeters"],
      },
    },
    prerequisites: [],
  },
];
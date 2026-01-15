/**
 * Mechanical Design Engineer Career Path - Tiered Course Recommendations
 * Mechanical Engineering - UC Merced
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
    id: "me-120",
    code: "ME 120",
    name: "Component Design",
    fullName: "ME 120: Component Design",
    description: "Core mechanical design principles. Learn to design machine components like gears, shafts, bearings, and fasteners with proper analysis and selection.",
    tier: 1,
    prerequisites: [],
  },
  {
    id: "me-137",
    code: "ME 137",
    name: "Computer Aided Engineering",
    fullName: "ME 137: Computer Aided Engineering",
    description: "Master CAE tools for simulation and analysis. Essential for modern product development and validation before physical prototyping.",
    tier: 1,
    prerequisites: [],
  },
  {
    id: "me-135",
    code: "ME 135",
    name: "Finite Element Analysis",
    fullName: "ME 135: Finite Element Analysis",
    description: "FEA fundamentals for stress, thermal, and vibration analysis. Industry-standard technique for validating designs computationally.",
    tier: 1,
    prerequisites: [],
  },
  {
    id: "engr-045",
    code: "ENGR 045",
    name: "Introduction to Materials",
    fullName: "ENGR 045: Introduction to Materials",
    description: "Material properties and selection. Understanding material behavior is crucial for designing durable, efficient products.",
    tier: 1,
    prerequisites: [],
  },
  {
    id: "engr-151",
    code: "ENGR 151",
    name: "Strength of Materials",
    fullName: "ENGR 151: Strength of Materials",
    description: "Mechanics of materials under load. Foundation for stress analysis, beam theory, and structural design.",
    tier: 1,
    prerequisites: [],
  },
  {
    id: "engr-190",
    code: "ENGR 190/193/194",
    name: "Engineering Capstone Design",
    fullName: "ENGR 190/193/194: Engineering Capstone Design",
    description: "Real-world design project experience. Apply all design skills to a complete engineering project from concept to prototype.",
    tier: 1,
    prerequisites: [],
  },
];

export const tier2Courses: TierCourse[] = [
  {
    id: "me-121",
    code: "ME 121",
    name: "Intro to Manufacturing Processes",
    fullName: "ME 121: Introduction to Manufacturing Processes",
    description: "How products are made. Learn machining, casting, forming, and joining processes to design for manufacturability.",
    tier: 2,
    prerequisites: [],
  },
  {
    id: "me-129",
    code: "ME 129",
    name: "Tribology",
    fullName: "ME 129: Tribology",
    description: "Friction, wear, and lubrication. Critical for designing mechanical systems with moving parts that must last.",
    tier: 2,
    prerequisites: [],
  },
  {
    id: "engr-052",
    code: "ENGR 052",
    name: "Computer Modeling and Analysis",
    fullName: "ENGR 052: Computer Modeling and Analysis",
    description: "3D CAD modeling and parametric design. Build complex assemblies and create engineering drawings.",
    tier: 2,
    prerequisites: [],
  },
  {
    id: "me-205",
    code: "ME 205",
    name: "Design of Scientific and Engineering Experiments",
    fullName: "ME 205: Design of Scientific and Engineering Experiments",
    description: "Statistical experimental design. Learn to design and analyze tests to validate design performance.",
    tier: 2,
    prerequisites: [],
  },
  {
    id: "engr-143",
    code: "ENGR 143",
    name: "Statistical Quality Control",
    fullName: "ENGR 143: Statistical Quality Control",
    description: "Quality assurance and process control. Ensure products meet specifications and maintain consistency.",
    tier: 2,
    prerequisites: [],
  },
  {
    id: "ee-185",
    code: "EE 185",
    name: "Instrumentation",
    fullName: "EE 185: Instrumentation",
    description: "Measurement systems and sensors for engineering applications. Important for testing, validation, and quality control.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Select appropriate sensors and measurement devices",
        "Design data acquisition systems",
        "Analyze measurement uncertainty",
        "Implement instrumentation for testing",
      ],
      topics: [
        "Sensors and transducers",
        "Data acquisition",
        "Signal conditioning",
        "Measurement uncertainty analysis",
      ],
      careerRelevance:
        "Essential for mechanical engineers involved in product testing, validation, and quality assurance.",
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
    description: "Micro and nano-scale fabrication techniques. For cutting-edge applications in MEMS, sensors, and advanced materials.",
    tier: 3,
    prerequisites: [],
  },
  {
    id: "engr-170",
    code: "ENGR 170",
    name: "Intro to Electron Microscopy",
    fullName: "ENGR 170: Introduction to Electron Microscopy",
    description: "Advanced material characterization. Analyze material microstructure for failure analysis and quality control.",
    tier: 3,
    prerequisites: [],
  },
  {
    id: "wri-119",
    code: "WRI 119",
    name: "Writing for Engineering",
    fullName: "WRI 119: Writing for Engineering",
    description: "Technical communication skills. Essential for documentation, reports, and professional communication.",
    tier: 3,
    prerequisites: [],
  },
  {
    id: "ae-171",
    code: "AE 171",
    name: "Aerospace Structures and Materials",
    fullName: "AE 171: Aerospace Structures and Materials",
    description: "Advanced structural analysis and aerospace materials. Learn lightweight design principles applicable to high-performance mechanical systems.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Analyze aerospace structural components",
        "Apply lightweight design principles",
        "Select advanced materials",
        "Understand stress analysis in complex structures",
      ],
      topics: [
        "Composite materials",
        "Thin-walled structures",
        "Structural optimization",
        "Advanced stress analysis",
      ],
      careerRelevance:
        "Valuable for mechanical engineers working on lightweight structures, high-performance products, or aerospace applications.",
    },
    prerequisites: [],
  },
  {
    id: "ee-005",
    code: "EE 005",
    name: "Designing and Building Electrical Engineering Systems",
    fullName: "EE 005: Designing and Building Electrical Engineering Systems",
    description: "Hands-on electrical system design and prototyping. Valuable for understanding mechatronic systems and electrical integration.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Design basic electrical circuits",
        "Build and test electrical prototypes",
        "Integrate electrical components into mechanical systems",
        "Troubleshoot electrical systems",
      ],
      topics: [
        "Circuit design fundamentals",
        "Prototyping techniques",
        "System integration",
        "Testing and validation",
      ],
      careerRelevance:
        "Useful for mechanical engineers working on products with electrical components or mechatronic systems.",
    },
    prerequisites: [],
  },
];

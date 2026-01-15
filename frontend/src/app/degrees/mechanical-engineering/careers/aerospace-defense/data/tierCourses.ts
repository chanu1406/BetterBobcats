/**
 * Aerospace / Defense Engineer Career Path - Tier Courses
 * Detailed course information for each tier
 */

import { TierCourse } from "@/types/careerPath";

// Tier 1: Must-Take Courses (🟢)
export const tier1Courses: TierCourse[] = [
  {
    id: "ae-171",
    code: "AE 171",
    name: "Aerospace Structures and Materials",
    fullName: "AE 171: Aerospace Structures and Materials",
    description:
      "Study of structural analysis, material selection, and design principles for aerospace vehicles. Essential for understanding aircraft and spacecraft structural integrity.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Analyze stress and strain in aerospace structures",
        "Select appropriate materials for aerospace applications",
        "Design structural components for aircraft and spacecraft",
        "Evaluate structural performance under various loading conditions",
      ],
      topics: [
        "Composite materials",
        "Stress analysis",
        "Fatigue and fracture mechanics",
        "Structural optimization",
      ],
      careerRelevance:
        "Critical for designing safe, lightweight, and durable aerospace structures in defense and commercial aviation.",
    },
  },
  {
    id: "ae-172",
    code: "AE 172",
    name: "Flight Dynamics and Control",
    fullName: "AE 172: Flight Dynamics and Control",
    description:
      "Principles of aircraft motion, stability, and control systems. Core knowledge for flight vehicle design and autonomous systems.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Model aircraft equations of motion",
        "Analyze stability and control characteristics",
        "Design flight control systems",
        "Understand autopilot and guidance systems",
      ],
      topics: [
        "Six degrees of freedom dynamics",
        "Stability derivatives",
        "Control surface design",
        "Autopilot systems",
      ],
      careerRelevance:
        "Essential for aerospace engineers working on aircraft design, UAVs, missiles, and autonomous flight systems.",
    },
  },
  {
    id: "ae-173",
    code: "AE 173",
    name: "Aerospace Propulsion",
    fullName: "AE 173: Aerospace Propulsion",
    description:
      "Study of propulsion systems including turbojets, turbofans, rockets, and advanced propulsion technologies for aerospace applications.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Analyze thermodynamic cycles of propulsion systems",
        "Design and optimize engine components",
        "Understand rocket propulsion fundamentals",
        "Evaluate propulsion system performance",
      ],
      topics: [
        "Gas turbine engines",
        "Rocket propulsion",
        "Propellant chemistry",
        "Nozzle design",
      ],
      careerRelevance:
        "Fundamental for careers in aerospace propulsion, defense systems, and space launch vehicle development.",
    },
  },
  {
    id: "me-136",
    code: "ME 136",
    name: "Aerodynamics",
    fullName: "ME 136: Aerodynamics",
    description:
      "Principles of fluid flow around bodies, lift and drag forces, and aerodynamic design. Foundation for all aerospace vehicle development.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Apply fundamental aerodynamic principles",
        "Calculate lift, drag, and moment coefficients",
        "Design aerodynamic surfaces",
        "Analyze subsonic and supersonic flow",
      ],
      topics: [
        "Airfoil theory",
        "Wing design",
        "Boundary layer theory",
        "Shock waves",
      ],
      careerRelevance:
        "Core knowledge for designing aircraft, missiles, and any vehicle that moves through air or space.",
    },
  },
  {
    id: "me-250",
    code: "ME 250",
    name: "Compressible Flows",
    fullName: "ME 250: Compressible Flows",
    description:
      "Advanced study of high-speed gas dynamics, shock waves, and supersonic/hypersonic flow phenomena critical for defense and space applications.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Analyze compressible flow phenomena",
        "Design for supersonic and hypersonic conditions",
        "Understand shock wave interactions",
        "Apply gas dynamics to propulsion systems",
      ],
      topics: [
        "Normal and oblique shocks",
        "Prandtl-Meyer expansion",
        "Nozzle flows",
        "Hypersonic flow",
      ],
      careerRelevance:
        "Essential for high-speed vehicle design, defense systems, and advanced aerospace applications.",
    },
  },
  {
    id: "me-254",
    code: "ME 254",
    name: "Computational Fluid Dynamics",
    fullName: "ME 254: Computational Fluid Dynamics",
    description:
      "Numerical methods for solving fluid flow problems using computers. Industry-standard tool for aerospace design and analysis.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Implement CFD algorithms",
        "Use commercial CFD software",
        "Validate computational results",
        "Optimize designs using CFD",
      ],
      topics: [
        "Finite volume methods",
        "Turbulence modeling",
        "Grid generation",
        "Solution convergence",
      ],
      careerRelevance:
        "Critical skill for modern aerospace engineers - CFD is used in every stage of aircraft and spacecraft design.",
    },
  },
];

// Tier 2: Preferred Courses (🟡)
export const tier2Courses: TierCourse[] = [
  {
    id: "ae-174",
    code: "AE 174",
    name: "Aeroelasticity",
    fullName: "AE 174: Aeroelasticity",
    description:
      "Study of interactions between aerodynamic forces and structural deformation. Important for preventing flutter and ensuring flight safety.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Analyze fluid-structure interactions",
        "Predict flutter and divergence",
        "Design for aeroelastic stability",
        "Understand dynamic response of flexible structures",
      ],
      topics: [
        "Flutter analysis",
        "Static aeroelasticity",
        "Dynamic aeroelasticity",
        "Control surface effectiveness",
      ],
      careerRelevance:
        "Valuable for aircraft structural design and certification, especially for large or high-speed vehicles.",
    },
  },
  {
    id: "me-145",
    code: "ME 145",
    name: "Lagrange Dynamics",
    fullName: "ME 145: Lagrange Dynamics",
    description:
      "Advanced dynamics using Lagrangian mechanics for complex multi-body systems. Essential for spacecraft and robotic systems.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Apply Lagrangian formulation to dynamic systems",
        "Analyze constrained motion",
        "Model multi-body spacecraft systems",
        "Solve complex dynamics problems",
      ],
      topics: [
        "Generalized coordinates",
        "Virtual work",
        "Hamilton's principle",
        "Multi-body dynamics",
      ],
      careerRelevance:
        "Important for spacecraft attitude control, robotic systems, and advanced vehicle dynamics analysis.",
    },
  },
  {
    id: "me-140",
    code: "ME 140",
    name: "Vibration and Control",
    fullName: "ME 140: Vibration and Control",
    description:
      "Study of mechanical vibrations and control strategies. Critical for aerospace systems subjected to dynamic loads.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Analyze vibration in mechanical systems",
        "Design vibration isolation systems",
        "Implement active vibration control",
        "Predict resonance and fatigue issues",
      ],
      topics: [
        "Free and forced vibration",
        "Modal analysis",
        "Damping systems",
        "Active control",
      ],
      careerRelevance:
        "Essential for ensuring structural integrity and passenger comfort in aerospace vehicles.",
    },
  },
  {
    id: "ee-122",
    code: "EE 122",
    name: "Introduction to Control Systems",
    fullName: "EE 122: Introduction to Control Systems",
    description:
      "Fundamentals of feedback control theory and system design. Applicable to flight control, guidance, and autonomous systems.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Design feedback control systems",
        "Analyze system stability",
        "Implement PID controllers",
        "Understand frequency response methods",
      ],
      topics: [
        "Transfer functions",
        "Root locus",
        "Frequency response",
        "State-space methods",
      ],
      careerRelevance:
        "Valuable for flight control systems, autopilots, and guidance systems in aerospace and defense.",
    },
  },
];

// Tier 3: Optional Courses (🟠)
export const tier3Courses: TierCourse[] = [
  {
    id: "ee-115",
    code: "EE 115",
    name: "Electromagnetics and Applications",
    fullName: "EE 115: Electromagnetics and Applications",
    description:
      "Electromagnetic theory and applications in aerospace systems including radar, communications, and electromagnetic compatibility.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Understand electromagnetic wave propagation",
        "Analyze antenna systems",
        "Design for electromagnetic compatibility",
        "Apply EM principles to aerospace systems",
      ],
      topics: [
        "Maxwell's equations",
        "Wave propagation",
        "Antenna design",
        "EMI/EMC",
      ],
      careerRelevance:
        "Useful for defense systems, avionics, radar design, and electronic warfare applications.",
    },
  },
  {
    id: "ee-185",
    code: "EE 185",
    name: "Instrumentation",
    fullName: "EE 185: Instrumentation",
    description:
      "Design and application of measurement systems and sensors. Important for flight testing and vehicle health monitoring.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Select appropriate sensors for aerospace applications",
        "Design data acquisition systems",
        "Analyze measurement uncertainty",
        "Implement instrumentation systems",
      ],
      topics: [
        "Sensor technologies",
        "Signal conditioning",
        "Data acquisition",
        "Measurement uncertainty",
      ],
      careerRelevance:
        "Valuable for flight test engineering, vehicle health monitoring, and experimental aerospace research.",
    },
  },
];

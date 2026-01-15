/**
 * Energy Systems / Power / Sustainability Engineer Career Path - Tier Courses
 * Detailed course information for each tier
 */

import { TierCourse } from "@/types/careerPath";

// Tier 1: Must-Take Courses (🟢)
export const tier1Courses: TierCourse[] = [
  {
    id: "engr-130",
    code: "ENGR 130",
    name: "Thermodynamics",
    fullName: "ENGR 130: Thermodynamics",
    description:
      "Fundamental principles of energy conversion, heat, work, and thermodynamic cycles. Essential foundation for all energy systems engineering.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Apply first and second laws of thermodynamics",
        "Analyze energy conversion systems and cycles",
        "Calculate thermodynamic properties of substances",
        "Evaluate efficiency of power generation systems",
      ],
      topics: [
        "Energy and entropy",
        "Power cycles",
        "Refrigeration",
        "Thermodynamic properties",
      ],
      careerRelevance:
        "Core knowledge for designing and optimizing any energy conversion system, from power plants to renewable energy systems.",
    },
  },
  {
    id: "engr-135",
    code: "ENGR 135",
    name: "Heat Transfer",
    fullName: "ENGR 135: Heat Transfer",
    description:
      "Study of conduction, convection, and radiation heat transfer. Critical for thermal system design in energy and power applications.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Analyze heat transfer mechanisms",
        "Design thermal systems and heat exchangers",
        "Calculate thermal resistances and heat transfer rates",
        "Model transient heat transfer problems",
      ],
      topics: [
        "Conduction analysis",
        "Convection heat transfer",
        "Radiation",
        "Heat exchanger design",
      ],
      careerRelevance:
        "Essential for designing thermal management systems in power generation, HVAC, and sustainable energy applications.",
    },
  },
  {
    id: "me-231",
    code: "ME 231",
    name: "Conduction Heat Transfer",
    fullName: "ME 231: Conduction Heat Transfer",
    description:
      "Advanced study of heat conduction in solids. Important for thermal analysis of energy systems and thermal management.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Solve advanced conduction problems",
        "Apply numerical methods to heat transfer",
        "Analyze multi-dimensional heat conduction",
        "Design thermal insulation systems",
      ],
      topics: [
        "Steady and transient conduction",
        "Numerical methods",
        "Thermal insulation",
        "Composite materials",
      ],
      careerRelevance:
        "Critical for thermal design in energy storage systems, building efficiency, and industrial thermal processes.",
    },
  },
  {
    id: "me-232",
    code: "ME 232",
    name: "Convective Heat and Mass Transfer",
    fullName: "ME 232: Convective Heat and Mass Transfer",
    description:
      "Advanced convection heat transfer and mass transfer principles. Key for fluid-thermal systems in energy applications.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Analyze forced and natural convection",
        "Design heat exchangers and cooling systems",
        "Model mass transfer in energy systems",
        "Optimize fluid-thermal systems",
      ],
      topics: [
        "Boundary layer theory",
        "Heat exchanger analysis",
        "Mass transfer fundamentals",
        "Two-phase flow",
      ],
      careerRelevance:
        "Essential for designing efficient cooling systems, heat exchangers, and thermal management in power systems.",
    },
  },
  {
    id: "phys-152",
    code: "PHYS 152",
    name: "The Physics of Energy",
    fullName: "PHYS 152: The Physics of Energy",
    description:
      "Physical principles underlying energy generation, conversion, and sustainability. Broad perspective on energy systems.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Understand fundamental energy conversion principles",
        "Analyze renewable and non-renewable energy sources",
        "Evaluate sustainability of energy systems",
        "Apply physics to energy policy decisions",
      ],
      topics: [
        "Energy fundamentals",
        "Renewable energy technologies",
        "Energy efficiency",
        "Climate and energy policy",
      ],
      careerRelevance:
        "Provides comprehensive understanding of energy landscape, essential for sustainable energy careers and policy.",
    },
  },
];

// Tier 2: Preferred Courses (🟡)
export const tier2Courses: TierCourse[] = [
  {
    id: "me-151",
    code: "ME 151",
    name: "Fuel Cells and Batteries",
    fullName: "ME 151: Fuel Cells and Batteries",
    description:
      "Electrochemical energy conversion and storage systems. Critical for clean energy transition and electric mobility.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Understand electrochemical energy conversion",
        "Design battery and fuel cell systems",
        "Analyze performance and efficiency",
        "Evaluate applications in transportation and grid storage",
      ],
      topics: [
        "Battery chemistry and design",
        "Fuel cell technology",
        "Energy storage systems",
        "Performance modeling",
      ],
      careerRelevance:
        "High-demand skills for electric vehicle, renewable energy storage, and clean energy industries.",
    },
  },
  {
    id: "me-261",
    code: "ME 261",
    name: "Energy Storage",
    fullName: "ME 261: Energy Storage",
    description:
      "Advanced energy storage technologies including mechanical, thermal, and electrochemical systems. Key for grid integration of renewables.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Compare energy storage technologies",
        "Design storage systems for specific applications",
        "Analyze economic viability of storage",
        "Integrate storage with renewable energy",
      ],
      topics: [
        "Battery technologies",
        "Thermal energy storage",
        "Mechanical storage (flywheels, CAES)",
        "Grid-scale storage",
      ],
      careerRelevance:
        "Essential for renewable energy integration, grid modernization, and microgrid development careers.",
    },
  },
  {
    id: "ee-130",
    code: "EE 130",
    name: "Electrical Machines",
    fullName: "EE 130: Electrical Machines",
    description:
      "Design and operation of motors, generators, and transformers. Fundamental for power systems and electric drive applications.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Analyze electric machine operation",
        "Design motors and generators",
        "Understand machine control systems",
        "Evaluate machine efficiency and performance",
      ],
      topics: [
        "AC and DC machines",
        "Transformers",
        "Motor drives",
        "Machine control",
      ],
      careerRelevance:
        "Critical for careers in electric vehicles, industrial automation, and renewable energy generation.",
    },
  },
  {
    id: "ee-131",
    code: "EE 131",
    name: "Power Electronics",
    fullName: "EE 131: Power Electronics",
    description:
      "Electronic circuits for power conversion and control. Essential for renewable energy systems and electric vehicles.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Design power electronic converters",
        "Analyze switching circuits and control",
        "Implement DC-DC and AC-DC converters",
        "Optimize power conversion efficiency",
      ],
      topics: [
        "Power semiconductor devices",
        "DC-DC converters",
        "Inverters and rectifiers",
        "PWM control",
      ],
      careerRelevance:
        "High-value skills for renewable energy, EV charging infrastructure, and grid-tied energy systems.",
    },
  },
];

// Tier 3: Optional Courses (🟠)
export const tier3Courses: TierCourse[] = [
  {
    id: "ee-160",
    code: "EE 160",
    name: "Electric Power Systems",
    fullName: "EE 160: Electric Power Systems",
    description:
      "Analysis and operation of electrical power generation, transmission, and distribution systems. Important for utility-scale energy careers.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Analyze power system operation and stability",
        "Understand grid infrastructure and control",
        "Design transmission and distribution systems",
        "Evaluate power system reliability",
      ],
      topics: [
        "Power flow analysis",
        "Grid stability",
        "Transmission systems",
        "Distribution networks",
      ],
      careerRelevance:
        "Valuable for careers in utilities, grid operators, and large-scale renewable energy integration.",
    },
  },
  {
    id: "ee-188",
    code: "EE 188",
    name: "Electric Vehicle Design",
    fullName: "EE 188: Electric Vehicle Design",
    description:
      "Design and integration of electric vehicle systems including powertrains, batteries, and charging. Cutting-edge transportation electrification.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Design electric vehicle powertrains",
        "Integrate battery systems and management",
        "Analyze vehicle dynamics and efficiency",
        "Understand charging infrastructure",
      ],
      topics: [
        "EV powertrains",
        "Battery management systems",
        "Vehicle dynamics",
        "Charging systems",
      ],
      careerRelevance:
        "Highly relevant for automotive industry careers in the rapidly growing electric vehicle sector.",
    },
  },
  {
    id: "ae-173",
    code: "AE 173",
    name: "Aerospace Propulsion",
    fullName: "AE 173: Aerospace Propulsion",
    description:
      "Jet engines, rockets, and propulsion systems. Advanced thermodynamics and fluid mechanics applied to high-performance propulsion.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Analyze jet engine and rocket performance",
        "Apply advanced thermodynamic cycles",
        "Understand combustion in propulsion systems",
        "Design propulsion components",
      ],
      topics: [
        "Gas turbine cycles",
        "Rocket propulsion",
        "Combustion fundamentals",
        "Propulsion system design",
      ],
      careerRelevance:
        "Optional advanced topic for students interested in aerospace propulsion or advanced energy conversion systems.",
    },
  },
];

/**
 * Automotive / EV / Autonomous Engineer Career Path - Tier Courses
 * Detailed course information for each tier
 */

import { TierCourse } from "@/types/careerPath";

// Tier 1: Must-Take Courses (🟢)
export const tier1Courses: TierCourse[] = [
  {
    id: "me-144",
    code: "ME 144",
    name: "Introduction to Multi-body Dynamics",
    fullName: "ME 144: Introduction to Multi-body Dynamics",
    description:
      "Analysis of complex mechanical systems with multiple interconnected bodies. Essential for vehicle chassis and suspension design.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Model multi-body mechanical systems",
        "Analyze kinematics and dynamics of interconnected bodies",
        "Apply constraint equations",
        "Simulate vehicle motion",
      ],
      topics: [
        "Kinematics of rigid bodies",
        "Constraint formulation",
        "Dynamic equations of motion",
        "Vehicle system modeling",
      ],
      careerRelevance:
        "Critical for automotive engineers designing suspension systems, chassis dynamics, and vehicle handling characteristics.",
    },
  },
  {
    id: "me-145",
    code: "ME 145",
    name: "Lagrange Dynamics",
    fullName: "ME 145: Lagrange Dynamics",
    description:
      "Advanced analytical mechanics using Lagrangian formulation. Powerful tool for complex vehicle dynamics analysis.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Apply Lagrangian mechanics",
        "Derive equations of motion systematically",
        "Analyze constrained systems",
        "Model complex mechanical systems",
      ],
      topics: [
        "Generalized coordinates",
        "Lagrange's equations",
        "Energy methods",
        "Constrained dynamics",
      ],
      careerRelevance:
        "Essential theoretical foundation for advanced vehicle dynamics, robotics, and autonomous vehicle motion planning.",
    },
  },
  {
    id: "me-140",
    code: "ME 140",
    name: "Vibration and Control",
    fullName: "ME 140: Vibration and Control",
    description:
      "Mechanical vibrations and control systems for vehicles. Critical for ride comfort, NVH (noise, vibration, harshness), and active suspension.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Analyze vibration in mechanical systems",
        "Design vibration isolation",
        "Apply feedback control",
        "Optimize ride quality",
      ],
      topics: [
        "Free and forced vibration",
        "Modal analysis",
        "Vibration isolation",
        "Active vibration control",
      ],
      careerRelevance:
        "Crucial for automotive NVH engineering, suspension tuning, and active chassis control systems.",
    },
  },
  {
    id: "ee-188",
    code: "EE 188",
    name: "Electric Vehicle Design",
    fullName: "EE 188: Electric Vehicle Design",
    description:
      "Complete EV powertrain design including motors, batteries, power electronics, and thermal management. Core course for EV engineering.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Design EV powertrains",
        "Select motors and batteries",
        "Calculate range and performance",
        "Integrate EV systems",
      ],
      topics: [
        "EV architecture",
        "Battery systems",
        "Motor drives",
        "Charging systems",
      ],
      careerRelevance:
        "Essential for working at EV companies like Tesla, Rivian, Lucid - covers complete vehicle electrification.",
    },
  },
  {
    id: "ee-131",
    code: "EE 131",
    name: "Power Electronics",
    fullName: "EE 131: Power Electronics",
    description:
      "High-power electronic circuits for motor drives, inverters, and DC-DC converters used in EVs and hybrid vehicles.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Design power electronic circuits",
        "Analyze inverters and converters",
        "Optimize power efficiency",
        "Design motor drive systems",
      ],
      topics: [
        "DC-DC converters",
        "Inverters",
        "Motor drives",
        "Thermal management",
      ],
      careerRelevance:
        "Critical for EV powertrain engineers - power electronics are the heart of every electric vehicle.",
    },
  },
  {
    id: "ee-130",
    code: "EE 130",
    name: "Electrical Machines",
    fullName: "EE 130: Electrical Machines",
    description:
      "Motors and generators used in electric and hybrid vehicles. Essential for understanding EV propulsion systems.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Understand motor operation principles",
        "Select motors for automotive applications",
        "Analyze motor performance",
        "Design motor control systems",
      ],
      topics: [
        "Permanent magnet motors",
        "Induction motors",
        "Motor characteristics",
        "Torque-speed curves",
      ],
      careerRelevance:
        "Fundamental for EV engineers - every electric vehicle uses electric motors for propulsion.",
    },
  },
];

// Tier 2: Strongly Recommended Courses (🟡)
export const tier2Courses: TierCourse[] = [
  {
    id: "me-136",
    code: "ME 136",
    name: "Aerodynamics",
    fullName: "ME 136: Aerodynamics",
    description:
      "Vehicle aerodynamics for drag reduction and performance optimization. Important for EV range and high-performance vehicles.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Analyze vehicle aerodynamics",
        "Reduce aerodynamic drag",
        "Optimize vehicle shape",
        "Understand downforce and lift",
      ],
      topics: [
        "Boundary layers",
        "Drag and lift forces",
        "Wind tunnel testing",
        "CFD for vehicle design",
      ],
      careerRelevance:
        "Important for automotive engineers working on vehicle efficiency, EV range optimization, and performance vehicles.",
    },
  },
  {
    id: "ee-180",
    code: "EE 180",
    name: "Autonomous Vehicles",
    fullName: "EE 180: Autonomous Vehicles",
    description:
      "Self-driving car technology including sensors, perception, planning, and control. Cutting-edge field in automotive engineering.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Understand autonomous vehicle systems",
        "Apply sensor fusion techniques",
        "Implement path planning algorithms",
        "Design autonomous control systems",
      ],
      topics: [
        "LIDAR and radar systems",
        "Computer vision",
        "Path planning",
        "Sensor fusion",
      ],
      careerRelevance:
        "Rapidly growing field - essential for companies like Waymo, Cruise, Tesla Autopilot, and traditional OEMs developing ADAS.",
    },
  },
  {
    id: "ee-122",
    code: "EE 122",
    name: "Introduction to Control Systems",
    fullName: "EE 122: Introduction to Control Systems",
    description:
      "Feedback control theory for automotive systems including cruise control, stability control, and autonomous driving.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Design feedback control systems",
        "Analyze system stability",
        "Apply PID control",
        "Implement digital controllers",
      ],
      topics: [
        "Transfer functions",
        "PID control",
        "State-space methods",
        "Digital control",
      ],
      careerRelevance:
        "Fundamental for automotive control engineers working on active safety systems, ADAS, and vehicle dynamics control.",
    },
  },
  {
    id: "me-142",
    code: "ME 142",
    name: "Mechatronics",
    fullName: "ME 142: Mechatronics",
    description:
      "Integration of mechanical, electrical, and software systems. Essential for modern vehicles with advanced electronics.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Integrate mechanical and electrical systems",
        "Design embedded control systems",
        "Implement sensors and actuators",
        "Develop mechatronic products",
      ],
      topics: [
        "Sensors and actuators",
        "Microcontrollers",
        "Real-time systems",
        "System integration",
      ],
      careerRelevance:
        "Critical for modern automotive engineers - vehicles are increasingly mechatronic systems with extensive electronics integration.",
    },
  },
];

// Tier 3: Optional / Advanced Courses (🟠)
export const tier3Courses: TierCourse[] = [
  {
    id: "ae-172",
    code: "AE 172",
    name: "Flight Dynamics and Control",
    fullName: "AE 172: Flight Dynamics and Control",
    description:
      "Advanced dynamics and control principles from aerospace engineering. Applicable to flying vehicles and advanced motion control.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Apply aerospace control principles",
        "Analyze 6-DOF dynamics",
        "Design advanced control systems",
        "Understand stability and control",
      ],
      topics: [
        "6-DOF equations of motion",
        "Stability derivatives",
        "Autopilot design",
        "Advanced control theory",
      ],
      careerRelevance:
        "Valuable for engineers working on flying cars, drones, or advanced vehicle dynamics with aerospace-level sophistication.",
    },
  },
  {
    id: "me-254",
    code: "ME 254",
    name: "Computational Fluid Dynamics",
    fullName: "ME 254: Computational Fluid Dynamics",
    description:
      "Advanced CFD simulation for vehicle aerodynamics, thermal management, and underhood airflow analysis.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Perform CFD simulations",
        "Optimize vehicle aerodynamics",
        "Analyze thermal management",
        "Validate simulation results",
      ],
      topics: [
        "Finite volume methods",
        "Turbulence modeling",
        "Grid generation",
        "CFD software tools",
      ],
      careerRelevance:
        "Advanced skill for aerodynamics engineers and thermal management specialists in automotive industry.",
    },
  },
  {
    id: "me-152",
    code: "ME 152",
    name: "Digital Twins",
    fullName: "ME 152: Digital Twins",
    description:
      "Virtual replicas of physical vehicles for simulation, optimization, and predictive maintenance. Cutting-edge automotive technology.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Create digital twin models",
        "Implement real-time data integration",
        "Apply predictive analytics",
        "Optimize vehicle performance digitally",
      ],
      topics: [
        "Model-based systems engineering",
        "IoT and sensor integration",
        "Predictive maintenance",
        "Virtual testing",
      ],
      careerRelevance:
        "Emerging field for automotive engineers - digital twins enable virtual development, testing, and fleet management.",
    },
  },
];

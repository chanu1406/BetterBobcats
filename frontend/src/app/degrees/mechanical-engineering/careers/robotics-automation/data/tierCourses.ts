/**
 * Robotics / Automation / Mechatronics Engineer Career Path - Tier Courses
 * Detailed course information for each tier
 */

import { TierCourse } from "@/types/careerPath";

// Tier 1: Must-Take Courses (🟢)
export const tier1Courses: TierCourse[] = [
  {
    id: "me-142",
    code: "ME 142",
    name: "Mechatronics",
    fullName: "ME 142: Mechatronics",
    description:
      "Integration of mechanical, electrical, and computer systems. Core foundation for designing intelligent machines and automated systems.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Integrate mechanical and electrical systems",
        "Design embedded control systems",
        "Implement sensors and actuators",
        "Develop automated systems",
      ],
      topics: [
        "System integration",
        "Embedded systems",
        "Control algorithms",
        "Real-time systems",
      ],
      careerRelevance:
        "Foundation for all robotics and automation careers - essential for designing integrated mechatronic systems.",
    },
  },
  {
    id: "me-141",
    code: "ME 141",
    name: "Introduction to Control Systems",
    fullName: "ME 141: Introduction to Control Systems",
    description:
      "Fundamentals of feedback control theory and system dynamics. Critical for designing stable and responsive robotic systems.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Analyze dynamic system behavior",
        "Design PID controllers",
        "Evaluate system stability",
        "Implement feedback control",
      ],
      topics: [
        "Transfer functions",
        "Stability analysis",
        "PID control",
        "Frequency response",
      ],
      careerRelevance:
        "Essential for controlling robots, automated machinery, and autonomous systems.",
    },
  },
  {
    id: "me-146",
    code: "ME 146",
    name: "Sensors and Actuators in Mechatronics",
    fullName: "ME 146: Sensors and Actuators in Mechatronics",
    description:
      "Study of sensors for measurement and actuators for motion control. Key components of any robotic or automated system.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Select appropriate sensors for applications",
        "Design actuator systems",
        "Integrate sensing and actuation",
        "Calibrate measurement systems",
      ],
      topics: [
        "Position sensors",
        "Force/torque sensors",
        "Motor control",
        "Signal processing",
      ],
      careerRelevance:
        "Critical for building robotic systems that sense their environment and execute precise motions.",
    },
  },
  {
    id: "ee-122",
    code: "EE 122",
    name: "Introduction to Control Systems",
    fullName: "EE 122: Introduction to Control Systems",
    description:
      "Electrical engineering perspective on control theory. Complements ME control courses with focus on electronic systems.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Design feedback control systems",
        "Analyze system stability",
        "Implement digital controllers",
        "Understand state-space methods",
      ],
      topics: [
        "Control system design",
        "Root locus",
        "State-space representation",
        "Digital control",
      ],
      careerRelevance:
        "Valuable for understanding control from electrical engineering perspective in automation systems.",
    },
  },
  {
    id: "ee-140",
    code: "EE 140",
    name: "Computer and Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description:
      "Fundamentals of microcontroller programming and embedded systems. Essential for implementing robot control algorithms.",
    tier: 1,
    expandedInfo: {
      learningOutcomes: [
        "Program microcontrollers",
        "Design embedded systems",
        "Understand computer architecture",
        "Implement real-time control",
      ],
      topics: [
        "Microcontroller programming",
        "Embedded systems",
        "Real-time operating systems",
        "Hardware interfaces",
      ],
      careerRelevance:
        "Critical skill for programming the brains of robots and automated systems.",
    },
  },
];

// Tier 2: Preferred Courses (🟡)
export const tier2Courses: TierCourse[] = [
  {
    id: "ee-021",
    code: "EE 021",
    name: "Introduction to Electrical Engineering Programming",
    fullName: "EE 021: Introduction to Electrical Engineering Programming",
    description:
      "Programming fundamentals for electrical systems and embedded applications. Important for implementing control algorithms.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Program in C/C++ for embedded systems",
        "Implement control algorithms",
        "Interface with hardware",
        "Debug embedded code",
      ],
      topics: [
        "C/C++ programming",
        "Embedded programming",
        "Hardware interfaces",
        "Algorithm implementation",
      ],
      careerRelevance:
        "Essential programming skills for developing robotic control software and automation systems.",
    },
  },
  {
    id: "ee-060",
    code: "EE 060",
    name: "Boolean Algebra and Digital Circuits",
    fullName: "EE 060: Boolean Algebra and Digital Circuits",
    description:
      "Digital logic design and circuit fundamentals. Important for understanding embedded system hardware.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Design digital circuits",
        "Understand logic gates",
        "Implement state machines",
        "Debug digital systems",
      ],
      topics: [
        "Boolean algebra",
        "Combinational logic",
        "Sequential circuits",
        "State machines",
      ],
      careerRelevance:
        "Valuable for designing custom hardware and understanding microcontroller internals.",
    },
  },
  {
    id: "ee-185",
    code: "EE 185",
    name: "Instrumentation",
    fullName: "EE 185: Instrumentation",
    description:
      "Design and application of measurement systems. Important for sensor integration and data acquisition in robotics.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Design data acquisition systems",
        "Select appropriate sensors",
        "Analyze measurement uncertainty",
        "Implement signal conditioning",
      ],
      topics: [
        "Data acquisition",
        "Signal conditioning",
        "Sensor calibration",
        "Measurement systems",
      ],
      careerRelevance:
        "Critical for integrating sensors and measuring robot performance in industrial applications.",
    },
  },
  {
    id: "me-144",
    code: "ME 144",
    name: "Introduction to Multi-body Dynamics",
    fullName: "ME 144: Introduction to Multi-body Dynamics",
    description:
      "Analysis of systems with multiple moving parts. Essential for understanding robot kinematics and dynamics.",
    tier: 2,
    expandedInfo: {
      learningOutcomes: [
        "Model robot kinematics",
        "Analyze multi-body systems",
        "Calculate joint forces and torques",
        "Simulate robotic motion",
      ],
      topics: [
        "Kinematics",
        "Dynamics of linkages",
        "Robot manipulators",
        "Motion planning",
      ],
      careerRelevance:
        "Important for designing robot arms, mobile robots, and complex automated machinery.",
    },
  },
];

// Tier 3: Optional Courses (🟠)
export const tier3Courses: TierCourse[] = [
  {
    id: "ee-180",
    code: "EE 180",
    name: "Autonomous Vehicles",
    fullName: "EE 180: Autonomous Vehicles",
    description:
      "Design and programming of autonomous robotic vehicles. Cutting-edge applications of robotics and automation.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Design autonomous navigation systems",
        "Implement computer vision algorithms",
        "Develop path planning algorithms",
        "Integrate sensor fusion",
      ],
      topics: [
        "SLAM",
        "Computer vision",
        "Path planning",
        "Sensor fusion",
      ],
      careerRelevance:
        "Direct application to autonomous vehicle industry and mobile robotics development.",
    },
  },
  {
    id: "ee-101",
    code: "EE 101",
    name: "Electronic Circuit Design I",
    fullName: "EE 101: Electronic Circuit Design I",
    description:
      "Design and analysis of analog and digital electronic circuits. Useful for custom hardware development.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Design analog circuits",
        "Analyze circuit behavior",
        "Build power supplies",
        "Design signal conditioning circuits",
      ],
      topics: [
        "Amplifier design",
        "Power electronics",
        "Filters",
        "Signal processing",
      ],
      careerRelevance:
        "Valuable for designing custom electronics for robots and developing specialized hardware interfaces.",
    },
  },
  {
    id: "ae-172",
    code: "AE 172",
    name: "Flight Dynamics and Control",
    fullName: "AE 172: Flight Dynamics and Control",
    description:
      "Advanced dynamics and control principles from aerospace engineering. Applicable to flying robots, drones, and advanced motion control.",
    tier: 3,
    expandedInfo: {
      learningOutcomes: [
        "Analyze 6-DOF dynamics",
        "Design flight control systems",
        "Understand stability and control",
        "Apply advanced control theory",
      ],
      topics: [
        "6-DOF equations of motion",
        "Stability analysis",
        "Autopilot design",
        "Advanced control systems",
      ],
      careerRelevance:
        "Highly relevant for aerial robotics, drone development, and advanced control system design.",
    },
  },
];

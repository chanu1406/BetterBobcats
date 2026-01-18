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
      credits: 4,
      careerRelevance:
        "Mechatronics is the definition of your job title. You will face problems daily that are not purely mechanical or electrical but the messy interface between them—like debugging why a motor is overheating (mechanical load? or PWM frequency?).",
      realWorldApplications: [
        "Designing the gripper mechanism (end-effector) for a pick-and-place robot",
        "Building a custom test rig with stepper motors to validate a new sensor",
        "Troubleshooting noise on a signal line causing servo jitter",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Ro_tFvDsw7w", // What is Mechatronics?
          "https://www.youtube.com/watch?v=09MKYzZmLbM", // H-Bridges & Motor Drivers (Essential Circuitry)
          "https://www.youtube.com/watch?v=1n_KKpKi9hE", // Introduction to PWM (Pulse Width Modulation)
        ],
        websites: [],
        tools: ["Arduino / STM32", "Multimeters", "Oscilloscopes"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "You cannot make a robot move smoothly without Control Theory. This course teaches you why your robot arm is oscillating instead of stopping, and how to mathematically prove it will remain stable under load.",
      realWorldApplications: [
        "Tuning PID gains for a drone's flight controller",
        "Modeling the mass-spring-damper system of a vehicle suspension",
        "Designing a cruise control system for an autonomous rover",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=UR0hOmjaHp0", // PID Control - A Brief Introduction (Brian Douglas)
          "https://www.youtube.com/watch?v=oBc_BHliZ1E", // Understanding The Root Locus
          "https://www.youtube.com/watch?v=X5rAG4j3hXQ", // Open Loop vs Closed Loop Control
        ],
        websites: [],
        tools: ["MATLAB / Simulink", "Python Control Systems Library"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "A robot is useless if it can't sense the world or move within it. This course moves beyond theory to the hardware reality: selecting the right encoder resolution, understanding torque curves of DC motors, and filtering noisy sensor data.",
      realWorldApplications: [
        "Choosing between a stepper and a servo motor for a CNC axis",
        " Interfacing an IMU (Inertial Measurement Unit) via I2C",
        "Calibrating a load cell for a robotic weighing station",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=v28e5x3P8-w", // Rotary Encoders Explained
          "https://www.youtube.com/watch?v=09MKYzZmLbM", // DC Motors, H-Bridges, and PWM
          "https://www.youtube.com/watch?v=bkWm0f2Q8GY", // Stepper Motors vs Servo Motors
        ],
        websites: [],
        tools: ["Datasheets (Reading)", "Signal Analyzers"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "While ME 141 focuses on moving masses, EE 122 focuses on the signals and circuits. This is crucial for designing the 'inner loop' of control systems, often implemented on the microcontroller or FPGA level.",
      realWorldApplications: [
        "Designing a digital filter to remove 60Hz noise from sensor lines",
        "Implementing a State-Space controller on a microcontroller",
        "Analyzing the frequency response (Bode Plot) of a servo drive",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=hpeKrMg-WPQ", // State Space, Part 1: Introduction to State-Space Equations
          "https://www.youtube.com/watch?v=gh4GkMjgWNs", // Bode Plots by Hand (Complex Frequency Response)
          "https://www.youtube.com/watch?v=u1pwaSgHUhU", // Discrete Control (Digital Control) Overview
        ],
        websites: [],
        tools: ["MATLAB SISO Tool", "Python Scipy.signal"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Robotics engineers spend 50% of their time writing firmware. You must understand how the processor handles Interrupts (ISRs), Timers, and memory management to write code that reacts fast enough to control a balancing robot.",
      realWorldApplications: [
        "Writing an Interrupt Service Routine (ISR) to read encoder pulses",
        "Configuring hardware timers to generate precise PWM signals",
        "Optimizing memory usage on a constrained ARM Cortex-M chip",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=HyznrdDSSGM", // How a CPU Works (Ben Eater)
          "https://www.youtube.com/watch?v=3V9eqykihyw", // Introduction to Embedded Systems Software and Development Environments
          "https://www.youtube.com/watch?v=Q8eajxcS6Kg", // Interrupts Explained
        ],
        websites: [],
        tools: ["C/C++", "Assembly", "Keil / STM32CubeIDE"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Python is great for AI, but C/C++ runs the robot's motors. This course teaches the low-level pointer manipulation and memory management required to write 'bare metal' code that doesn't crash.",
      realWorldApplications: [
        "Manipulating registers using bitwise operators",
        "Managing dynamic memory allocation in a long-running system",
        "Interfacing C code with Python via serial communication",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=zwszcHSmb9g", // Pointers in C/C++ Explained
          "https://www.youtube.com/watch?v=_60rmniBmPQ", // Bitwise Operators in C (Essential for Registers)
          "https://www.youtube.com/watch?v=3lQXJ-Wl8g8", // Memory Layout of C Programs
        ],
        websites: [],
        tools: ["Visual Studio Code", "GCC Compiler"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Deeply understanding logic gates helps you debug hardware glitches and design efficient state machines for safety systems (e.g., 'If E-Stop is pressed OR sensor fails, stop motor').",
      realWorldApplications: [
        "Designing a hardware safety interlock circuit",
        "Using Karnaugh maps to simplify logic for an FPGA",
        "Understanding how an ADC (Analog to Digital Converter) actually works",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=gI-qXk7XojA", // Logic Gates, Truth Tables, Boolean Algebra
          "https://www.youtube.com/watch?v=-aQ0xCvT9fw", // SR Latch & Flip Flops
          "https://www.youtube.com/watch?v=RO5alU6PpWA", // Karnaugh Maps (K-Maps)
        ],
        websites: [],
        tools: ["Logisim", "Verilog/VHDL (Intro)"],
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
      "Design and application of measurement systems. Important for sensor integration and data acquisition in robotics.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "In automation, data is king. You need to know how to amplify a tiny voltage from a strain gauge and read it into a computer without noise destroying the signal. This is the difference between a reliable robot and a jittery one.",
      realWorldApplications: [
        "Designing an Op-Amp circuit to buffer a sensor signal",
        "Setting up a Data Acquisition (DAQ) card for vibration analysis",
        "Calculating the uncertainty budget for a test measurement",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7FYHt5XviKc", // Op-Amp Basics (Operational Amplifiers)
          "https://www.youtube.com/watch?v=2TOZQ-AcI30", // Intro to Data Acquisition
          "https://www.youtube.com/watch?v=McAOvFUX2sA", // Wheatstone Bridges (Used in Strain Gauges)
        ],
        websites: [],
        tools: ["LabVIEW", "Oscilloscopes", "Signal Generators"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "This is the math behind the movement. To tell a robotic arm to 'move to coordinate (X,Y,Z)', you need Inverse Kinematics. This course teaches you the matrices and physics required to program robotic motion.",
      realWorldApplications: [
        "Calculating the Jacobian matrix for a 6-axis robot arm",
        "Simulating the dynamics of a walking robot",
        "Solving the Inverse Kinematics for a pick-and-place operation",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=VjsuCTsVbRI", // Forward and Inverse Kinematics Explained
          "https://www.youtube.com/watch?v=OsZa8j5O8tM", // Modern Robotics: Degrees of Freedom
          "https://www.youtube.com/watch?v=68hX06D9c9Q", // The Jacobian Matrix in Robotics
        ],
        websites: [],
        tools: ["MATLAB Robotics Toolbox", "ROS (Robot Operating System)"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "If you want to work on self-driving cars or AMR (Autonomous Mobile Robots) in warehouses, this is the course. It moves beyond basic control to 'Intelligence'—mapping, localization, and decision making.",
      realWorldApplications: [
        "Implementing SLAM (Simultaneous Localization and Mapping) on a rover",
        "Using A* algorithm for path planning around obstacles",
        "Fusing Lidar and Odometer data with a Kalman Filter",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=CaLfN6EU9tY", // SLAM Explained (Simultaneous Localization and Mapping)
          "https://www.youtube.com/watch?v=mC1NfQ112gI", // Kalman Filter Explained
          "https://www.youtube.com/watch?v=-L-WgKMFuhE", // A* Pathfinding Visualization
        ],
        websites: [],
        tools: ["ROS 2", "Gazebo Simulator", "OpenCV"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Sometimes off-the-shelf drivers aren't enough. Understanding transistor-level design allows you to build custom motor drivers, high-power switching circuits, and robust power supplies for your robots.",
      realWorldApplications: [
        "Designing a MOSFET bridge to drive a high-current motor",
        "Building a voltage regulator circuit for a battery-powered drone",
        "Analyzing signal integrity on high-speed communication lines",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7ukDKVHxpBc", // Transistors Explained (MOSFETs)
          "https://www.youtube.com/watch?v=CIGjActDeoM", // Power Supply Design (Buck Converters)
          "https://www.youtube.com/watch?v=w8Dq8blTmSA", // EEVblog: OpAmp Tutorial
        ],
        websites: [],
        tools: ["SPICE Simulation (LTSpice)", "Altium / KiCad"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Robotics isn't just on the ground. This course applies 6-DOF dynamics to drones and UAVs. Even if you don't fly, the advanced MIMO (Multi-Input Multi-Output) control concepts are applicable to complex manipulator arms.",
      realWorldApplications: [
        "Stabilizing a quadcopter using IMU feedback",
        "Modeling the aerodynamics of a VTOL (Vertical Take-Off) drone",
        "Designing an autopilot for waypoint navigation",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=N_H7aX1rZ88", // Flight Dynamics: Equations of Motion
          "https://www.youtube.com/watch?v=Yf-qCq-3RFA", // Drone Control Physics Explained
          "https://www.youtube.com/watch?v=qtK7C8qD-tU", // Understanding 6 Degrees of Freedom
        ],
        websites: [],
        tools: ["ArduPilot", "PX4", "MATLAB Aerospace Blockset"],
      },
    },
    prerequisites: [],
  },
];
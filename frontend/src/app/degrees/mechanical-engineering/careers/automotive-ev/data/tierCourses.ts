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
      credits: 4,
      careerRelevance:
        "Vehicle dynamics is the 'feel' of the car. Whether you are designing the suspension for a Baja racer or a luxury sedan, you need MBD to predict how the car reacts to bumps and turns before you ever build a prototype.",
      realWorldApplications: [
        "Simulating suspension travel to prevent wheel rub",
        "Analyzing roll center migration during cornering",
        "Designing steering geometry (Ackermann) for autonomous pods",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=FmcgunoUNHM", // Multibody Dynamics for Automotive Applications (Sim)
          "https://www.youtube.com/watch?v=BHVyBYLx7lw", // Vehicle Steering and Suspension Simulation
          "https://www.youtube.com/watch?v=S0yC0u8O2Cs", // Suspension System Explained (Engineering Explained)
        ],
        websites: [],
        tools: ["MSC Adams Car", "Altair MotionView", "Simulink Simscape"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Newtonian physics (F=ma) gets messy fast with complex linkages like double-wishbone suspension. Lagrangian mechanics gives you a systematic way to derive the equations of motion for complex, constrained systems found in modern EVs.",
      realWorldApplications: [
        "Deriving equations of motion for a multi-link rear suspension",
        "Modeling robotic arms used in vehicle assembly lines",
        "Creating dynamic models for active stability control algorithms",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=_Hp11d1Z-78", // Lagrangian vs Newtonian Mechanics
          "https://www.youtube.com/watch?v=dPxhTiiq-1A", // Lagrangian Mechanics - A Beautiful Way to Look at the World
          "https://www.youtube.com/watch?v=zhkN-SCJ9pQ", // Euler-Lagrange equation explained intuitively
        ],
        websites: [],
        tools: ["Mathematica", "Python (SymPy)", "MATLAB Symbolic Toolbox"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "NVH (Noise, Vibration, and Harshness) is a huge hiring area. In EVs, without the engine noise to mask it, every rattle and vibration becomes obvious. You need this course to design mounts and dampers that keep the cabin silent.",
      realWorldApplications: [
        "Tuning engine/motor mounts to avoid resonance",
        "Analyzing cabin acoustics for road noise reduction",
        "Designing active noise cancellation systems",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=dpzgy1OkJns", // Automotive Vibration Analyzers - PicoScope NVH (Practical)
          "https://www.youtube.com/watch?v=PjtForeV5Ik", // NVH for Automotive Application (Engineering Overview)
          "https://www.youtube.com/watch?v=2T9d0pE_3Wk", // Understanding Resonance Mode Shapes
        ],
        websites: [],
        tools: ["Siemens Simcenter Testlab", "ANSYS Mechanical", "PicoScope"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "This is the cornerstone course for Tesla/Rivian aspirants. It covers the 'Skateboard' architecture: how to pack batteries, connect the BMS (Battery Management System), and size the thermal loops to keep it all from overheating.",
      realWorldApplications: [
        "Sizing the battery pack (kWh) for a target range",
        "Designing the thermal cooling loop for the battery module",
        "Integrating the On-Board Charger (OBC) into the high-voltage bus",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=xrEtBm7WuHY", // Master Course in EV Powertrain Design
          "https://www.youtube.com/watch?v=bjLTpfz0Ybo", // Electric Powertrain Architecture Explained
          "https://www.youtube.com/watch?v=TwGbJPqHXk4", // How Electric Vehicles Work (Engineering Explained)
        ],
        websites: [],
        tools: ["MATLAB / Simulink", "GT-Suite", "COMSOL (Thermal)"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "The inverter is the brain of the EV powertrain. This course teaches you how to switch high voltages (400V/800V) efficiently to drive the motor, and how to design the DC-DC converters that power the 12V electronics.",
      realWorldApplications: [
        "Designing the 3-phase inverter stage for a traction motor",
        "Selecting IGBTs vs SiC MOSFETs for efficiency",
        "Analyzing switching losses in high-power converters",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=LOaZ--rBDDg", // How a Hybrid Car Works: Inverter & Converter Teardown
          "https://www.youtube.com/watch?v=eBKjq4v21sA", // Electric Vehicle Inverter: What is it?
          "https://www.youtube.com/watch?v=G6hJbJ6QG_A", // Boost Converters and Buck Converters: Power Electronics
        ],
        websites: [],
        tools: ["PLECS", "LTSpice", "Ansys Maxwell"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Understanding the difference between Induction Motors (Tesla Model S) and Permanent Magnet Motors (Model 3) is key. This course covers the torque-speed curves and efficiency maps that drive motor selection.",
      realWorldApplications: [
        "Generating efficiency maps for traction motors",
        "Analyzing torque ripple in PMSM motors",
        "Designing the stator winding layout for a new prototype",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=esUb7Zy5Ojg", // Tesla Model 3's Motor Explained
          "https://www.youtube.com/watch?v=mRjxC6esuz8", // Different Types of Electric Motors used in EVs
          "https://www.youtube.com/watch?v=aqqYdO-uLNc", // Three Phase Induction Motors (Tech basics)
        ],
        websites: [],
        tools: ["Ansys Maxwell", "Motor-CAD", "JMAG"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "In EVs, aerodynamic drag is the #1 range killer at highway speeds. You need to know how to optimize body shape, wheels, and underbody panels to lower the Drag Coefficient (Cd), directly increasing miles per charge.",
      realWorldApplications: [
        "Simulating airflow over side mirrors to reduce noise",
        "Optimizing the rear diffuser for downforce vs drag",
        "Conducting wind tunnel tests for vehicle homologation",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=V1KDCNvx7mg", // Aerodynamics - The Key to Boosting EV Range!
          "https://www.youtube.com/watch?v=ywDTPu_Y8JM", // F1 Aerodynamics Explained (Concepts apply to cars)
          "https://www.youtube.com/watch?v=EGHnC7_rFkc", // Fluid Mechanics: Drag and Lift
        ],
        websites: [],
        tools: ["Ansys Fluent", "Star-CCM+", "OpenFOAM"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "This is the future of the industry. You will learn how a car 'sees' using Lidar, Radar, and Cameras, and how it 'thinks' using path planning algorithms. Essential for ADAS (Advanced Driver Assistance Systems) roles.",
      realWorldApplications: [
        "Fusing Camera and Radar data to detect pedestrians",
        "Implementing A* search for parking path planning",
        "Calibrating Lidar sensors for a test vehicle",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ry0APTAgtRQ", // How Sensor Fusion Works in Autonomous Driving
          "https://www.youtube.com/watch?v=QESfWlgIofg", // Waymo: How it Works (360 view)
          "https://www.youtube.com/watch?v=W310fxpxfjw", // Why Real Time Sensor Fusion is Critical
        ],
        websites: [],
        tools: ["ROS 2", "Carla Simulator", "Python/C++"],
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
      "Feedback control theory for automotive systems including cruise control, stability control, and autonomous driving.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Cars are full of control loops: Adaptive Cruise Control, Lane Keep Assist, and ABS. This course uses the 'Cruise Control' example to teach you PID logic, which is the industry standard for making these systems smooth and safe.",
      realWorldApplications: [
        "Tuning the PID controller for a throttle body",
        "Designing the logic for Adaptive Cruise Control (ACC)",
        "Stability analysis of a Lane Centering system",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=vxTJMGqjGdg", // Control Bootcamp: Cruise Control Example with PID (Steve Brunton)
          "https://www.youtube.com/watch?v=UR0hOmjaHp0", // PID Control - A Brief Introduction
          "https://www.youtube.com/watch?v=X5rAG4j3hXQ", // Open Loop vs Closed Loop Control
        ],
        websites: [],
        tools: ["MATLAB / Simulink", "Python Control Library"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "A modern car has over 70 ECUs (computers). Mechatronics bridges the gap between the mechanical latch and the electrical signal that locks the door. It covers the CAN Bus communication protocol, which is the nervous system of every car.",
      realWorldApplications: [
        "Decoding CAN Bus messages from the OBD-II port",
        "Designing a 'Drive-by-Wire' throttle system",
        "Interfacing sensors for an autonomous test mule",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=wcFTehpyb8A", // CAN Bus Explained - A Simple Intro (Critical for Auto)
          "https://www.youtube.com/watch?v=Ro_tFvDsw7w", // What is Mechatronics?
          "https://www.youtube.com/watch?v=09MKYzZmLbM", // H-Bridges & Motor Drivers
        ],
        websites: [],
        tools: ["Vector CANoe", "Arduino", "Saleae Logic Analyzer"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "While focused on flight, the 6-DOF (Six Degrees of Freedom) math is used in advanced vehicle dynamics for rollover prevention and by companies like Joby Aviation or Archer working on eVTOLs (Electric Vertical Takeoff and Landing).",
      realWorldApplications: [
        "Developing control laws for an eVTOL air taxi",
        "Analyzing vehicle stability during airborne maneuvers (rally/stunt)",
        "Adapting flight control algorithms for underwater ROVs",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=N_H7aX1rZ88", // Flight Dynamics Equations of Motion
          "https://www.youtube.com/watch?v=Yf-qCq-3RFA", // Drone Control Physics Explained
          "https://www.youtube.com/watch?v=qtK7C8qD-tU", // Understanding 6 Degrees of Freedom
        ],
        websites: [],
        tools: ["MATLAB Aerospace Toolbox", "X-Plane (for sim integration)"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "You can't build a wind tunnel model for every design iteration. CFD allows you to virtually test the cooling airflow through a radiator or the drag on a side mirror. It is standard practice in every automotive aero department.",
      realWorldApplications: [
        "Optimizing radiator ducting for battery cooling",
        "Reducing wind noise around the A-pillar",
        "Simulating brake cooling performance under load",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=l_tQxM_9zH0", // Ansys Fluent Tutorial for Beginners
          "https://www.youtube.com/watch?v=3moWb8Z6yNI", // Fluid Mechanics: Computational Fluid Dynamics
          "https://www.youtube.com/watch?v=Lom0L2E5eQM", // Introduction to CFD
        ],
        websites: [],
        tools: ["Ansys Fluent", "OpenFOAM", "ParaView"],
      },
    },
    prerequisites: [],
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
      credits: 4,
      careerRelevance:
        "Automakers are moving to 'Software Defined Vehicles'. A Digital Twin allows you to simulate millions of miles of driving data in the cloud to validate software updates before they are pushed to customer cars.",
      realWorldApplications: [
        "Running virtual fleet tests for a new battery update",
        "Predicting suspension failure based on real-time sensor data",
        "Simulating manufacturing assembly lines to optimize throughput",
      ],
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
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=uZZ2q3J6bcc", // Industrial Digital Twins: From Theory to Automotive Factory
          "https://www.youtube.com/watch?v=z7wWfjecI6c", // Engineering Automotive Digital Twins
          "https://www.youtube.com/watch?v=2dMz_s2tXyw", // IBM: What is a Digital Twin?
        ],
        websites: [],
        tools: ["NVIDIA Omniverse", "Siemens Mindsphere", "Azure Digital Twins"],
      },
    },
    prerequisites: [],
  },
];
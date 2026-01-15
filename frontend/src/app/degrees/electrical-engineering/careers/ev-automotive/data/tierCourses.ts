/**
 * Electric Vehicle & Automotive Systems Career Path - Tier Courses Data
 * Course recommendations organized by tier for EV & Automotive Systems career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE for EV & Automotive Systems
 * Core EV engineering: power electronics, electrical machines, battery systems, embedded control
 * These courses are THE foundation for Tesla, Rivian, GM EV, automotive suppliers
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "ev-engr-065",
    code: "ENGR 065",
    name: "Circuit Theory",
    fullName: "ENGR 065: Circuit Theory",
    description: "Vehicle dynamics, motion analysis, forces — essential for understanding EV motion and acceleration",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Engineering Dynamics is fundamental for understanding how electric vehicles move, accelerate, and handle forces. Essential for EV engineers working on vehicle dynamics, powertrain design, traction control, and regenerative braking systems. Critical for optimizing EV performance and efficiency.",

      realWorldApplications: [
        "Analyzing EV acceleration, braking, and handling dynamics",
        "Designing regenerative braking systems for energy recovery",
        "Optimizing motor torque delivery for traction control",
        "Modeling vehicle motion for autonomous driving systems",
        "Calculating forces on EV suspension and chassis components",
        "Simulating crash dynamics and safety systems"
      ],

      learningOutcomes: [
        "Understand kinematics and dynamics of particles and rigid bodies",
        "Analyze forces, moments, and motion in mechanical systems",
        "Apply Newton's laws to vehicle dynamics problems",
        "Model vehicle acceleration, braking, and cornering",
        "Analyze energy and momentum in mechanical systems"
      ],

      topics: [
        "Kinematics: position, velocity, acceleration",
        "Newton's laws and equations of motion",
        "Work, energy, and power analysis",
        "Impulse and momentum principles",
        "Vehicle dynamics: acceleration, braking, turning",
        "Rigid body dynamics and rotational motion"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7y4b0RkdRGk", // Engineering dynamics intro
          "https://www.youtube.com/watch?v=EYq3H8VSHMk", // Vehicle dynamics explained
          "https://www.youtube.com/watch?v=XrFTXQo9wkE", // Kinematics and dynamics
          "https://www.youtube.com/watch?v=0l20Pac9YWM"  // Newton's laws in vehicles
        ],
        websites: [
          "https://www.engineeringtoolbox.com/dynamics-d_1366.html",
          "https://www.me.berkeley.edu/~lwlin/me104/dynamics.html",
          "https://ocw.mit.edu/courses/mechanical-engineering/",
          "https://www.khanacademy.org/science/physics/forces-newtons-laws"
        ],
        tools: [
          "MATLAB/Simulink", // Vehicle dynamics simulation
          "CarSim", // Vehicle dynamics software
          "ADAMS", // Multibody dynamics
          "Python (NumPy/SciPy)" // Dynamics calculations
        ]
      },

      additionalNotes:
        "Engineering Dynamics is essential for EV engineers. Understanding vehicle motion and forces is critical for powertrain design, regenerative braking, traction control, and overall vehicle performance optimization."
    }
  },
  {
    id: "ev-ee-131",
    code: "EE 131",
    name: "Power Electronics",
    fullName: "EE 131: Power Electronics",
    description: "Motor drives, inverters, DC-DC converters — THE core of EV powertrain electronics",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Power Electronics IS the heart of electric vehicles. Inverters convert battery DC to motor AC, DC-DC converters manage voltage levels, and motor drives control traction motors. This is THE most critical course for EV powertrain engineers at Tesla, Rivian, GM, Ford, and automotive suppliers.",

      realWorldApplications: [
        "Designing traction inverters for EV motor drives (200-400 kW systems)",
        "Implementing DC-DC converters for high-voltage to low-voltage systems",
        "Creating onboard chargers (Level 1/2 AC charging)",
        "Designing regenerative braking power electronics",
        "Developing bidirectional chargers for Vehicle-to-Grid (V2G)",
        "Implementing thermal management for high-power converters"
      ],

      learningOutcomes: [
        "Design DC-DC converters (buck, boost, buck-boost topologies)",
        "Implement three-phase inverters for motor drives",
        "Understand power semiconductor devices (IGBTs, MOSFETs, SiC, GaN)",
        "Analyze switching losses and thermal management",
        "Design PWM control strategies for motor drives"
      ],

      topics: [
        "Power semiconductor switches: IGBTs, MOSFETs, diodes",
        "DC-DC converter topologies for EV applications",
        "Three-phase inverters and motor drive control",
        "Pulse Width Modulation (PWM) techniques",
        "Regenerative braking and bidirectional power flow",
        "Thermal management and cooling strategies",
        "Wide-bandgap devices: SiC and GaN for EVs"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=WClbOQtvGxw", // Power electronics basics
          "https://www.youtube.com/watch?v=HLi69RBwBKk", // EV inverter explained
          "https://www.youtube.com/watch?v=9VxC4Kp1A4s", // DC-DC converters
          "https://www.youtube.com/watch?v=MMHQ3CY59_M"  // Motor drives
        ],
        websites: [
          "https://www.ti.com/applications/automotive/electric-vehicles/overview.html",
          "https://www.infineon.com/cms/en/applications/automotive/electric-drivetrain/",
          "https://www.wolfspeed.com/knowledge-center/article/power-electronics-for-evs",
          "https://www.onsemi.com/solutions/automotive/electric-vehicle-ev"
        ],
        tools: [
          "PLECS", // Power electronics simulation
          "LTspice", // Circuit simulation
          "MATLAB/Simulink", // Powertrain modeling
          "PSIM", // Power electronics specialized tool
          "Altium Designer" // PCB design for power electronics
        ]
      },

      additionalNotes:
        "Power Electronics is THE most important course for EV powertrain careers. Every major EV company (Tesla, Rivian, GM, Ford, Lucid) has large power electronics teams. This is where the highest-paying EV jobs are."
    }
  },
  {
    id: "ev-ee-130",
    code: "EE 130",
    name: "Electrical Machines",
    fullName: "EE 130: Electrical Machines",
    description: "Traction motors, motor control, torque characteristics — essential for EV propulsion",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Electrical Machines covers the motors that power EVs: permanent magnet synchronous motors (PMSMs), induction motors, and reluctance motors. Essential for understanding motor torque-speed curves, efficiency maps, and control strategies. Critical for EV powertrain engineers.",

      realWorldApplications: [
        "Selecting and designing traction motors for EVs (150-300 kW range)",
        "Analyzing motor torque-speed characteristics for acceleration performance",
        "Implementing field-oriented control (FOC) for PMSM motors",
        "Optimizing motor efficiency for maximum EV range",
        "Designing dual-motor AWD systems (front and rear motors)",
        "Implementing motor thermal management and cooling"
      ],

      learningOutcomes: [
        "Understand motor types: PMSM, induction, reluctance, SRM",
        "Analyze motor torque-speed curves and efficiency maps",
        "Design motor control strategies for traction applications",
        "Calculate motor losses and efficiency",
        "Select motors for specific EV performance requirements"
      ],

      topics: [
        "Permanent Magnet Synchronous Motors (PMSM) - most common in EVs",
        "Induction motors (Tesla Model S/X, Model 3 rear motor)",
        "Switched Reluctance Motors (SRM) for low-cost EVs",
        "Motor torque-speed curves and operating regions",
        "Field-oriented control (FOC) and vector control",
        "Motor efficiency maps and loss mechanisms",
        "Thermal management and cooling strategies"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=K9m73h-VCmw", // EV motors explained
          "https://www.youtube.com/watch?v=bCEiOnuODac", // PMSM motors
          "https://www.youtube.com/watch?v=NaV7V07tEMQ", // Induction motors in Tesla
          "https://www.youtube.com/watch?v=esUb7Zy5Oio"  // Motor control for EVs
        ],
        websites: [
          "https://www.ti.com/motor-drivers/brushless-dc-bldc-drivers/overview.html",
          "https://www.infineon.com/cms/en/applications/motor-control/",
          "https://www.onsemi.com/solutions/automotive/electric-vehicle-ev/traction-inverter",
          "https://www.analog.com/en/applications/markets/automotive-cabin-applications/electric-vehicles.html"
        ],
        tools: [
          "MATLAB/Simulink Motor Control Toolbox",
          "Motor-CAD", // Motor design and analysis
          "ANSYS Maxwell", // Electromagnetic motor simulation
          "JMAG", // Motor design software
          "MotorSolve" // Motor optimization tool
        ]
      },

      additionalNotes:
        "Understanding traction motors is fundamental for EV powertrain engineers. Tesla uses PMSMs and induction motors, Rivian uses quad motors (all PMSMs), and most EVs use PMSM due to high efficiency and power density."
    }
  },
  {
    id: "ev-ee-122",
    code: "EE 122",
    name: "Introduction to Control Systems",
    fullName: "EE 122: Introduction to Control Systems",
    description: "Motor control, traction control, stability systems — critical for EV dynamic performance",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Control Systems is essential for EV motor control, traction control, vehicle stability, and regenerative braking. PID control, field-oriented control (FOC), and Model Predictive Control (MPC) are used throughout EV systems. Critical for powertrain and vehicle dynamics engineers.",

      realWorldApplications: [
        "Implementing field-oriented control (FOC) for PMSM traction motors",
        "Designing torque vectoring control for dual-motor AWD systems",
        "Creating traction control systems (TCS) to prevent wheel slip",
        "Implementing regenerative braking control algorithms",
        "Designing vehicle stability control (ESC) for EVs",
        "Creating cruise control and adaptive cruise control (ACC) systems"
      ],

      learningOutcomes: [
        "Understand feedback control principles and PID control",
        "Design motor control systems for traction applications",
        "Analyze system stability and controller performance",
        "Implement state-space control for multi-variable systems",
        "Apply control theory to EV powertrain and vehicle dynamics"
      ],

      topics: [
        "PID control design and tuning",
        "Field-oriented control (FOC) for AC motors",
        "State-space modeling and control",
        "Stability analysis: Bode plots, root locus, Nyquist",
        "Torque control and speed control modes",
        "Cascaded control loops (current, speed, position)",
        "Model Predictive Control (MPC) for advanced applications"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=oBc_BHxw78s", // Control systems intro
          "https://www.youtube.com/watch?v=wkfEZmsQqiA", // PID control
          "https://www.youtube.com/watch?v=Pi7l8mMjYVE", // FOC explained
          "https://www.youtube.com/watch?v=fz1Esem34xQ"  // Traction control
        ],
        websites: [
          "https://www.mathworks.com/solutions/automotive/electric-vehicle-design.html",
          "https://www.ti.com/applications/automotive/electric-vehicles/motor-control.html",
          "https://ctms.engin.umich.edu/CTMS/index.php",
          "https://www.electrical4u.com/control-system/"
        ],
        tools: [
          "MATLAB/Simulink Control System Toolbox",
          "LabVIEW", // Real-time control
          "PLECS", // Power electronics control simulation
          "dSPACE", // HIL testing for motor control
          "Python Control Systems Library"
        ]
      },

      additionalNotes:
        "Control Systems is critical for EV performance and safety. Modern EVs use advanced control strategies like field-oriented control (FOC) for motors, torque vectoring for handling, and traction control for safety."
    }
  },
  {
    id: "ev-ee-188",
    code: "EE 188",
    name: "Battery Management Systems",
    fullName: "EE 188: Battery Management Systems",
    description: "Battery monitoring, thermal management, state estimation — THE critical EV subsystem",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Battery Management Systems (BMS) are THE most critical safety and performance system in EVs. BMS monitors cell voltages, temperatures, and state of charge (SOC), ensures safe operation, and maximizes battery life. Essential for battery engineers at Tesla, Rivian, GM Ultium, and battery suppliers like LG, Samsung, CATL.",

      realWorldApplications: [
        "Designing BMS hardware for large EV battery packs (400-800V, 60-100 kWh)",
        "Implementing State of Charge (SOC) estimation algorithms (Coulomb counting, Kalman filters)",
        "Creating cell balancing circuits (passive and active balancing)",
        "Designing thermal management systems to keep batteries in optimal temperature range",
        "Implementing safety functions: overvoltage, undervoltage, overcurrent protection",
        "Developing battery degradation models and State of Health (SOH) estimation"
      ],

      learningOutcomes: [
        "Understand lithium-ion battery chemistry and cell characteristics",
        "Design BMS architectures: centralized, distributed, modular",
        "Implement SOC and SOH estimation algorithms",
        "Design cell balancing and thermal management systems",
        "Apply functional safety standards (ISO 26262) to BMS design"
      ],

      topics: [
        "Lithium-ion battery fundamentals and electrochemistry",
        "Battery cell voltage, capacity, and discharge curves",
        "State of Charge (SOC) estimation: Coulomb counting, Kalman filtering",
        "State of Health (SOH) estimation and degradation modeling",
        "Cell balancing: passive (resistive) and active (capacitive/inductive)",
        "Thermal management: liquid cooling, air cooling, heat pipes",
        "BMS safety functions and fault detection",
        "Battery pack design and module architecture"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=VxMM4g2Sk8U", // BMS explained
          "https://www.youtube.com/watch?v=w8-kPX8u7MQ", // EV battery packs
          "https://www.youtube.com/watch?v=h8k72U9y3e4", // SOC estimation
          "https://www.youtube.com/watch?v=oZsCLRarzBQ"  // Battery thermal management
        ],
        websites: [
          "https://www.ti.com/applications/automotive/electric-vehicles/battery-management-systems.html",
          "https://www.analog.com/en/applications/markets/automotive-cabin-applications/electric-vehicles/battery-management-systems.html",
          "https://www.nxp.com/applications/automotive/electrification/battery-management-system:BATTERY-MANAGEMENT-SYSTEM",
          "https://www.infineon.com/cms/en/applications/automotive/electric-drivetrain/battery-management-system/"
        ],
        tools: [
          "MATLAB/Simulink Battery Pack Modeling",
          "GT-Suite", // Battery thermal simulation
          "ANSYS Fluent", // CFD for battery cooling
          "AVL CRUISE", // Battery pack simulation
          "Python (PyBaMM)" // Battery modeling library
        ]
      },

      additionalNotes:
        "BMS is THE most critical EV subsystem. A well-designed BMS ensures safety, maximizes range, extends battery life, and enables fast charging. Every EV company has large BMS teams, and this is a high-demand, high-paying career path."
    }
  }
];

/**
 * 🟡 TIER 2: STRONG BOOSTERS for EV & Automotive Systems
 * These courses significantly enhance EV engineering expertise and open advanced roles
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "ev-ee-102",
    code: "EE 102",
    name: "Signal Processing and Linear Systems",
    fullName: "EE 102: Signal Processing and Linear Systems",
    description: "Sensor signal processing, filtering, and noise reduction for EV sensor systems",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Signal Processing is important for EV engineers working with sensor data: current sensors, voltage sensors, temperature sensors, and position sensors. Essential for filtering noise, extracting meaningful signals, and implementing observer-based control in motor drives.",

      realWorldApplications: [
        "Filtering current and voltage sensor signals in motor drives",
        "Processing resolver/encoder signals for motor position feedback",
        "Implementing Kalman filters for SOC estimation in BMS",
        "Analyzing vibration signals for predictive maintenance",
        "Processing CAN bus signals for vehicle communication",
        "Designing digital filters for real-time embedded control systems"
      ],

      learningOutcomes: [
        "Design digital filters (FIR, IIR) for sensor signal conditioning",
        "Implement Kalman filters for state estimation",
        "Analyze signals in time and frequency domains",
        "Apply FFT for frequency analysis of motor currents and vibrations",
        "Implement real-time signal processing on microcontrollers"
      ],

      topics: [
        "Digital filter design: FIR and IIR filters",
        "Kalman filtering for state estimation",
        "Fourier transform and frequency domain analysis",
        "Sampling theory and anti-aliasing",
        "Observer-based control for motor drives",
        "Real-time digital signal processing"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=spUNpyF58BY", // Signal processing intro
          "https://www.youtube.com/watch?v=BsZdPlK0T-I", // Digital filters
          "https://www.youtube.com/watch?v=mzbKJxhxQyc", // Kalman filter
          "https://www.youtube.com/watch?v=fWCfJRdaw1k"  // Fourier transform
        ],
        websites: [
          "https://www.dspguide.com/",
          "https://jackschaedler.github.io/circles-sines-signals/",
          "https://www.ti.com/data-converters/precision-adcs/overview.html",
          "https://www.analog.com/en/education/education-library/tutorials.html"
        ],
        tools: [
          "MATLAB/Simulink Signal Processing Toolbox",
          "Python (NumPy/SciPy)",
          "GNU Octave",
          "LabVIEW"
        ]
      },

      additionalNotes:
        "Signal Processing is valuable for EV engineers working on motor control, battery management, and sensor fusion. Kalman filtering is widely used for SOC estimation in BMS systems."
    }
  },
  {
    id: "ev-ee-105",
    code: "EE 105",
    name: "Analog and Digital Electronics",
    fullName: "EE 105: Analog and Digital Electronics",
    description: "Circuit design for BMS, sensor interfaces, and power supply systems",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Analog and Digital Electronics is important for EV engineers designing BMS circuits, sensor conditioning, gate drivers for power electronics, and auxiliary power supplies. Essential for hardware engineers working on EV electronic systems.",

      realWorldApplications: [
        "Designing voltage and current sensing circuits for BMS",
        "Creating gate driver circuits for IGBT/MOSFET switching",
        "Implementing sensor signal conditioning (amplifiers, filters)",
        "Designing isolated power supplies for high-voltage systems",
        "Creating analog protection circuits (overcurrent, overvoltage)",
        "Implementing analog-to-digital conversion for sensor data"
      ],

      learningOutcomes: [
        "Design operational amplifier circuits for sensor conditioning",
        "Implement comparator circuits for protection functions",
        "Design voltage reference and bias circuits",
        "Understand isolation techniques for high-voltage systems",
        "Apply analog circuit design to EV hardware"
      ],

      topics: [
        "Operational amplifier circuits and applications",
        "Comparators and voltage references",
        "Analog-to-digital converters (ADC) for sensor interfaces",
        "Gate driver circuits for power switches",
        "Isolated power supplies and DC-DC converters",
        "Protection circuits: overvoltage, overcurrent, thermal"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7FYHt5XviKc", // Op-amps
          "https://www.youtube.com/watch?v=TUWnWsNl8Dw", // Sensor conditioning
          "https://www.youtube.com/watch?v=b7588K11aVs", // Gate drivers
          "https://www.youtube.com/watch?v=xCkY1-6q_GE"  // Isolated power supplies
        ],
        websites: [
          "https://www.ti.com/amplifier-circuit/overview.html",
          "https://www.analog.com/en/education.html",
          "https://www.infineon.com/cms/en/product/power/gate-driver-ics/",
          "https://www.onsemi.com/solutions/automotive"
        ],
        tools: [
          "LTspice", // Analog circuit simulation
          "Multisim", // Circuit design
          "Altium Designer", // PCB design
          "KiCad" // Open-source PCB tool
        ]
      },

      additionalNotes:
        "Analog and digital circuit design is essential for EV hardware engineers working on BMS, power electronics, and sensor systems. Understanding circuit design enables you to design robust, reliable automotive electronics."
    }
  },
  {
    id: "ev-ee-140",
    code: "EE 140",
    name: "Computer and Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description: "Embedded programming for BMS, motor controllers, and vehicle control units",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Microcontroller Architecture is essential for EV embedded software engineers. BMS, motor controllers (inverters), and vehicle control units (VCU) all run on microcontrollers. Understanding MCU architecture enables efficient firmware development for real-time automotive control.",

      realWorldApplications: [
        "Programming automotive microcontrollers (e.g., TI C2000, STM32, NXP S32K)",
        "Implementing real-time motor control algorithms on MCUs",
        "Developing BMS firmware for battery monitoring and control",
        "Creating vehicle control unit (VCU) software for powertrain management",
        "Implementing CAN/LIN communication for vehicle networks",
        "Optimizing firmware for real-time performance and safety"
      ],

      learningOutcomes: [
        "Program automotive-grade microcontrollers in C and assembly",
        "Implement interrupt-driven real-time control systems",
        "Understand MCU peripherals: PWM, ADC, CAN, timers",
        "Optimize code for real-time automotive applications",
        "Apply functional safety principles (ISO 26262) to firmware"
      ],

      topics: [
        "Automotive microcontroller architectures (ARM Cortex, C2000)",
        "Real-time operating systems (RTOS) for automotive applications",
        "PWM generation for motor control",
        "ADC sampling for sensor interfaces",
        "CAN and LIN communication protocols",
        "Interrupt handling and real-time scheduling",
        "Functional safety and software quality (ISO 26262, MISRA C)"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7LqPJGnBPMM", // Microcontrollers explained
          "https://www.youtube.com/watch?v=3K7dg6H5ByE", // ARM Cortex programming
          "https://www.youtube.com/watch?v=29eZORCJQFo", // Automotive embedded systems
          "https://www.youtube.com/watch?v=uyc_pDBskNE"  // Real-time programming
        ],
        websites: [
          "https://www.ti.com/microcontrollers-mcus-processors/c2000-real-time-control-mcus/overview.html",
          "https://www.st.com/en/automotive-microcontrollers.html",
          "https://www.nxp.com/products/processors-and-microcontrollers/arm-microcontrollers/s32k-automotive-mcus:S32K",
          "https://www.embedded.com/"
        ],
        tools: [
          "Code Composer Studio (TI)", // For C2000 MCUs
          "STM32CubeIDE", // For STM32 MCUs
          "MPLAB X IDE", // For Microchip MCUs
          "FreeRTOS", // Real-time OS
          "Vector CANoe" // CAN network development
        ]
      },

      additionalNotes:
        "Embedded programming is critical for EV firmware engineers. Automotive microcontrollers require real-time performance, functional safety (ISO 26262), and robust communication (CAN/LIN)."
    }
  },
  {
    id: "ev-ee-160",
    code: "EE 160",
    name: "Communication Systems",
    fullName: "EE 160: Communication Systems",
    description: "Vehicle communication networks: CAN, LIN, Ethernet for connected EVs",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Communication Systems is important for EV engineers working on vehicle networks. Modern EVs use CAN (Controller Area Network), LIN (Local Interconnect Network), and Automotive Ethernet for communication between ECUs (Electronic Control Units). Essential for vehicle integration and diagnostics engineers.",

      realWorldApplications: [
        "Implementing CAN communication for powertrain control (motor, BMS, VCU)",
        "Designing CAN message databases (DBC files) for vehicle networks",
        "Creating diagnostic protocols (UDS, ISO 14229) for vehicle servicing",
        "Implementing Over-The-Air (OTA) updates via Automotive Ethernet",
        "Designing cybersecurity measures for vehicle communication",
        "Creating vehicle telemetry and data logging systems"
      ],

      learningOutcomes: [
        "Understand automotive communication protocols: CAN, LIN, FlexRay, Ethernet",
        "Design CAN networks and message scheduling",
        "Implement diagnostic protocols (OBD-II, UDS)",
        "Apply cybersecurity principles to vehicle networks",
        "Analyze communication performance and reliability"
      ],

      topics: [
        "Controller Area Network (CAN) protocol and architecture",
        "Local Interconnect Network (LIN) for low-speed applications",
        "Automotive Ethernet for high-bandwidth applications",
        "Message scheduling and network design",
        "Diagnostic protocols: OBD-II, UDS (Unified Diagnostic Services)",
        "Vehicle cybersecurity and intrusion detection",
        "Over-The-Air (OTA) software updates"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=FqLDpHsxvf8", // CAN bus explained
          "https://www.youtube.com/watch?v=JZSCzRT9TTo", // Automotive networks
          "https://www.youtube.com/watch?v=z5WvxQ7cw0M", // CAN protocol deep dive
          "https://www.youtube.com/watch?v=ydD3VBbb5pQ"  // Automotive Ethernet
        ],
        websites: [
          "https://www.csselectronics.com/pages/can-bus-simple-intro-tutorial",
          "https://www.kvaser.com/about-can/",
          "https://www.vector.com/int/en/know-how/protocols/",
          "https://www.ti.com/applications/automotive/body-electronics-lighting/can-lin-overview.html"
        ],
        tools: [
          "Vector CANoe", // CAN network development and testing
          "CANalyzer", // CAN bus analysis
          "Kvaser tools", // CAN interfaces
          "Wireshark", // Network protocol analysis
          "Peak PCAN" // CAN hardware/software
        ]
      },

      additionalNotes:
        "Vehicle communication networks are critical for modern EVs. Understanding CAN, LIN, and Automotive Ethernet enables you to work on vehicle integration, diagnostics, and connected vehicle features."
    }
  }
];

/**
 * 🟠 TIER 3: OPTIONAL / INTEREST for EV & Automotive Systems
 * Helpful for specific interests but not essential for core EV engineering
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "ev-cse-020",
    code: "CSE 020",
    name: "Introduction to Computing 1",
    fullName: "CSE 020: Introduction to Computing 1",
    description: "High-level programming for data analysis, simulation, and testing tools",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "While EV firmware uses C/C++, higher-level languages like Python are increasingly used for simulation, data analysis, testing automation, and machine learning applications. Useful for EV engineers developing tools, analyzing vehicle data, and prototyping algorithms.",

      realWorldApplications: [
        "Writing Python scripts for battery data analysis and visualization",
        "Creating automated test scripts for HIL (Hardware-In-the-Loop) testing",
        "Developing simulation models for powertrain optimization",
        "Analyzing vehicle telemetry data and creating dashboards",
        "Implementing machine learning for battery SOC/SOH prediction",
        "Creating configuration tools for BMS and motor controllers"
      ],

      learningOutcomes: [
        "Understand fundamental programming concepts",
        "Write programs in Python or similar high-level languages",
        "Use data structures and algorithms for data analysis",
        "Apply software engineering principles to tool development",
        "Create simulation and analysis tools for EV engineering"
      ],

      topics: [
        "Programming fundamentals: variables, loops, functions",
        "Data structures: lists, dictionaries, arrays",
        "File I/O and data processing",
        "Object-oriented programming basics",
        "Libraries for scientific computing: NumPy, SciPy, Matplotlib",
        "Version control and software development practices"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=rfscVS0vtbw", // Python basics
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc", // Python for engineers
          "https://www.youtube.com/watch?v=HXV3zeQKqGY"  // Python data analysis
        ],
        websites: [
          "https://www.python.org/about/gettingstarted/",
          "https://realpython.com/",
          "https://www.learnpython.org/",
          "https://docs.python.org/3/tutorial/"
        ],
        tools: [
          "Python", // High-level programming
          "Jupyter Notebook", // Interactive development
          "VS Code", // Code editor
          "PyCharm" // Python IDE
        ]
      },

      additionalNotes:
        "High-level programming skills are valuable for EV engineers who need to develop tools, analyze data, or prototype algorithms. Python is widely used in the automotive industry for testing, simulation, and data analysis."
    }
  }
];

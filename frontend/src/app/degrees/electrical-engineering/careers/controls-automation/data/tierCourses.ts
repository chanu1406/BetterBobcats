/**
 * Tier Courses for Controls & Automation Engineer Career Path
 * 
 * Career Focus: Industrial automation, robotics control, manufacturing systems, PLC programming, SCADA systems
 * Target Companies: Siemens, Rockwell Automation, ABB, Schneider Electric, Honeywell, FANUC, manufacturing companies
 * 
 * Tier Breakdown:
 * - Tier 1 (Core Foundation): Control systems, signal processing, microcontrollers, PLC programming
 * - Tier 2 (Supporting Skills): Electrical machines, power electronics, circuit design, systems integration
 * - Tier 3 (Programming Foundation): Core programming for control algorithms and automation scripts
 */

import { TierCourse } from "@/types/careerPath";

export const controlsAutomationTierCourses: TierCourse[] = [
  // ==================== TIER 1: Core Foundation ====================
  {
    id: "ee-122-controls",
    code: "EE 122",
    name: "Introduction to Control Systems",
    fullName: "EE 122: Introduction to Control Systems",
    description:
      "Core control theory including feedback systems, PID controllers, stability analysis, and frequency response - essential foundation for all automation applications.",
    tier: 1,
    prerequisites: ["EE 102", "MATH 024"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design and implement PID controllers for feedback control systems",
        "Analyze system stability using Routh-Hurwitz and root locus methods",
        "Apply frequency response techniques for controller tuning",
        "Model dynamic systems using transfer functions and state-space",
        "Design compensators for improved transient and steady-state response",
      ],
      topics: [
        "Transfer function modeling",
        "Laplace transforms",
        "PID controller design",
        "Root locus analysis",
        "Bode plots and frequency response",
        "State-space representation",
        "Stability analysis",
        "Digital control systems",
      ],
      careerRelevance:
        "Control systems theory is the mathematical foundation for all automation engineering. Understanding feedback control, stability analysis, and controller design is essential for programming PLCs, designing SCADA systems, and implementing industrial automation solutions at Siemens, Rockwell Automation, and ABB.",
      realWorldApplications: [
        "PLC programming for manufacturing automation",
        "SCADA system design for process control",
        "Robotic arm motion control",
        "Temperature and pressure regulation in industrial processes",
        "Motor speed control in conveyor systems",
        "Building automation and HVAC control",
      ],
      resources: {
        websites: [
          "Rockwell Automation PLC programming guides",
          "Siemens TIA Portal documentation",
          "Automation.com tutorials",
        ],
        tools: [
          "Control Systems Engineering by Nise",
        ],
      },
    },
  },
  {
    id: "ee-102-controls",
    code: "EE 102",
    name: "Signal Processing and Linear Systems",
    fullName: "EE 102: Signal Processing and Linear Systems",
    description:
      "Digital signal processing for sensor data acquisition, filtering, and noise reduction in control systems - critical for processing feedback signals in automation.",
    tier: 1,
    prerequisites: ["MATH 024", "EE 060"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design digital filters for noise reduction in sensor data",
        "Implement FFT analysis for frequency domain control",
        "Apply Z-transforms for discrete-time system analysis",
        "Process real-time signals from industrial sensors",
        "Implement data acquisition systems for control applications",
      ],
      topics: [
        "Discrete-time signals and systems",
        "Z-transforms",
        "FIR and IIR filter design",
        "FFT and frequency analysis",
        "Digital filter implementation",
        "Sampling theory",
        "Sensor signal conditioning",
        "Real-time DSP",
      ],
      careerRelevance:
        "Signal processing is essential for conditioning and analyzing sensor data in automation systems. Understanding digital filtering, FFT analysis, and real-time processing enables accurate feedback control in SCADA systems, PLC applications, and robotic control at industrial automation companies.",
      realWorldApplications: [
        "Sensor data filtering in SCADA systems",
        "Vibration analysis for predictive maintenance",
        "Position feedback processing in servo systems",
        "Quality control using vision and sensor data",
        "Real-time monitoring of industrial processes",
      ],
      resources: {
        websites: [
          "NI LabVIEW DSP tutorials",
        ],
        tools: [
          "Understanding Digital Signal Processing by Lyons",
          "MATLAB Signal Processing Toolbox",
        ],
      },
    },
  },
  {
    id: "ee-140-controls",
    code: "EE 140",
    name: "Computer and Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description:
      "Microcontroller programming for embedded control applications, interfacing with sensors and actuators, and implementing real-time control algorithms.",
    tier: 1,
    prerequisites: ["CSE 020", "EE 060"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Program microcontrollers for real-time control applications",
        "Interface with industrial sensors and actuators",
        "Implement control algorithms on embedded hardware",
        "Design communication protocols for distributed control",
        "Develop interrupt-driven control systems",
      ],
      topics: [
        "Microcontroller architecture (ARM, PIC, AVR)",
        "Embedded C/C++ programming",
        "GPIO and peripheral interfacing",
        "Timers and interrupts",
        "PWM for motor control",
        "I2C, SPI, UART communication",
        "Real-time operating systems (RTOS)",
        "Sensor and actuator integration",
      ],
      careerRelevance:
        "Microcontrollers are the brain of modern automation systems. This course provides hands-on experience programming embedded controllers that interface with PLCs, SCADA systems, and industrial networks. Essential for roles at Rockwell, Siemens, and automation equipment manufacturers.",
      realWorldApplications: [
        "PLC firmware development",
        "Industrial IoT sensor nodes",
        "Motor drive controllers",
        "Distributed control systems",
        "Building automation controllers",
        "Custom automation equipment",
      ],
      resources: {
        websites: [
          "ARM Cortex-M Programming Guide",
          "Rockwell Automation embedded controller documentation",
        ],
        tools: [
          "Embedded Systems by Valvano",
        ],
      },
    },
  },
  {
    id: "ee-021-controls",
    code: "EE 021",
    name: "Electrical Engineering Programming",
    fullName: "EE 021: Electrical Engineering Programming",
    description:
      "Industry-focused PLC programming using ladder logic, function blocks, and structured text - direct preparation for industrial automation careers.",
    tier: 1,
    prerequisites: ["EE 060", "CSE 020"],
    expandedInfo: {
      credits: 3,
      learningOutcomes: [
        "Program PLCs using ladder logic, function blocks, and structured text",
        "Design automated manufacturing sequences",
        "Implement safety interlocks and emergency stops",
        "Interface PLCs with HMI and SCADA systems",
        "Troubleshoot and maintain industrial control systems",
      ],
      topics: [
        "Ladder logic programming",
        "Function block diagrams",
        "Structured text programming",
        "PLC hardware architecture",
        "Input/output modules",
        "Industrial communication protocols (Modbus, Profibus, EtherNet/IP)",
        "HMI integration",
        "Sequential control and state machines",
      ],
      careerRelevance:
        "PLC programming is THE core skill for automation engineers. This course provides hands-on experience with industry-standard platforms (Allen-Bradley, Siemens S7) used in manufacturing, process control, and building automation. Direct pathway to roles at Rockwell Automation, Siemens, ABB, and manufacturing facilities.",
      realWorldApplications: [
        "Manufacturing assembly line control",
        "Water treatment plant automation",
        "Packaging and material handling systems",
        "Food and beverage processing control",
        "Oil and gas pipeline automation",
        "Building HVAC and lighting control",
      ],
      resources: {
        websites: [
          "Rockwell Studio 5000 training materials",
          "Siemens TIA Portal tutorials",
        ],
        tools: [
          "PLC Programming Methods by Seames",
          "Industrial Automation Handbook by Srivastava",
        ],
      },
    },
  },

  // ==================== TIER 2: Supporting Skills ====================
  {
    id: "ee-130-controls",
    code: "EE 130",
    name: "Electrical Machines",
    fullName: "EE 130: Electrical Machines and Drives",
    description:
      "AC/DC motors, servo systems, and variable frequency drives - essential for controlling industrial machinery and automated equipment.",
    tier: 2,
    prerequisites: ["EE 100", "MATH 023"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand motor operation and characteristics",
        "Design motor drive systems for automation applications",
        "Implement variable frequency drive (VFD) control",
        "Select appropriate motors for industrial applications",
        "Troubleshoot motor and drive systems",
      ],
      topics: [
        "DC motor characteristics and control",
        "AC induction motors",
        "Servo motors and stepper motors",
        "Variable frequency drives (VFDs)",
        "Motor control techniques",
        "Torque-speed characteristics",
        "Motor selection for automation",
        "Drive troubleshooting",
      ],
      careerRelevance:
        "Motors are the primary actuators in automation systems. Understanding motor types, characteristics, and control methods is essential for programming motion control systems, selecting drives for manufacturing equipment, and troubleshooting automation machinery.",
      realWorldApplications: [
        "Conveyor belt speed control",
        "Robotic arm motion systems",
        "CNC machine tool drives",
        "Pump and fan control in HVAC",
        "Material handling and hoisting systems",
      ],
      resources: {
        websites: [
          "Rockwell PowerFlex VFD manuals",
          "ABB drive selection guides",
        ],
        tools: [
          "Electric Motors and Drives by Hughes",
        ],
      },
    },
  },
  {
    id: "ee-131-controls",
    code: "EE 131",
    name: "Power Electronics",
    fullName: "EE 131: Power Electronics and Motor Drives",
    description:
      "Power conversion circuits for motor drives, including inverters, converters, and PWM techniques for industrial automation.",
    tier: 2,
    prerequisites: ["EE 101", "EE 100"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design power electronic circuits for motor drives",
        "Implement PWM control for variable speed drives",
        "Analyze inverter and converter topologies",
        "Design DC-DC and AC-DC power supplies for control systems",
        "Troubleshoot power electronic systems",
      ],
      topics: [
        "DC-DC converters (buck, boost)",
        "AC-DC rectifiers",
        "DC-AC inverters for motor drives",
        "PWM techniques",
        "IGBT and MOSFET switching",
        "Power supply design",
        "Motor drive electronics",
        "Harmonic analysis",
      ],
      careerRelevance:
        "Power electronics is the backbone of modern motor drives and automation equipment. Understanding inverter design, PWM control, and power conversion is critical for working with VFDs, servo drives, and industrial power systems at automation companies.",
      realWorldApplications: [
        "VFD design and application",
        "Servo amplifier systems",
        "UPS and power backup systems",
        "Renewable energy integration in automation",
        "Industrial DC power supplies",
      ],
      resources: {
        websites: [
          "Siemens Sinamics drive documentation",
          "Rockwell Kinetix servo drive manuals",
        ],
        tools: [
          "Power Electronics by Rashid",
        ],
      },
    },
  },
  {
    id: "ee-101-controls",
    code: "EE 101",
    name: "Electromagnetic Field Theory",
    fullName: "EE 101: Electromagnetic Field Theory",
    description:
      "Analog circuit design for sensor signal conditioning, interface circuits, and industrial instrumentation in automation systems.",
    tier: 2,
    prerequisites: ["EE 060"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design sensor signal conditioning circuits",
        "Implement instrumentation amplifiers for industrial sensors",
        "Design interface circuits for PLC I/O modules",
        "Analyze and troubleshoot analog control circuits",
        "Design isolation and protection circuits",
      ],
      topics: [
        "Operational amplifier circuits",
        "Instrumentation amplifiers",
        "Active filters",
        "Signal conditioning",
        "Isolation techniques",
        "Current-to-voltage converters",
        "Voltage regulators",
        "Interface circuit design",
      ],
      careerRelevance:
        "Analog circuits are essential for conditioning sensor signals, interfacing with industrial equipment, and designing custom automation hardware. Understanding op-amp circuits, signal conditioning, and isolation is critical for integrating sensors and actuators with PLCs and control systems.",
      realWorldApplications: [
        "Temperature sensor signal conditioning",
        "Pressure transducer interfaces",
        "4-20mA loop circuits",
        "RTD and thermocouple amplifiers",
        "Isolated I/O modules",
        "Custom sensor interfaces",
      ],
      resources: {
        websites: [
          "Op Amps for Everyone by Texas Instruments",
          "Analog Devices application notes",
        ],
        tools: [
          "Art of Electronics by Horowitz and Hill",
        ],
      },
    },
  },
  {
    id: "ee-180-controls",
    code: "EE 180",
    name: "Systems Integration",
    fullName: "EE 180: Industrial Systems Integration",
    description:
      "Integrating PLCs, SCADA, HMI, and industrial networks into complete automation solutions - capstone-level practical experience.",
    tier: 2,
    prerequisites: ["EE 122", "EE 021"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design complete automation systems integrating multiple components",
        "Implement industrial communication networks (Modbus, Profibus, EtherNet/IP)",
        "Integrate SCADA systems with PLCs and field devices",
        "Design HMI interfaces for operator control",
        "Troubleshoot complex multi-device automation systems",
      ],
      topics: [
        "System architecture design",
        "Industrial Ethernet networks",
        "Modbus, Profibus, EtherNet/IP protocols",
        "SCADA system design",
        "HMI development",
        "Data acquisition systems",
        "Distributed control systems (DCS)",
        "OPC UA communication",
      ],
      careerRelevance:
        "Systems integration is where all automation components come together. This course provides hands-on experience designing complete automation solutions - exactly what automation engineers do at Siemens, Rockwell, ABB, and manufacturing facilities. Essential for roles involving plant automation, retrofits, and greenfield projects.",
      realWorldApplications: [
        "Manufacturing plant automation projects",
        "Water/wastewater treatment control systems",
        "Building management system (BMS) integration",
        "Oil and gas pipeline SCADA systems",
        "Food processing automation",
        "Pharmaceutical batch control systems",
      ],
      resources: {
        websites: [
          "Siemens WinCC SCADA tutorials",
          "Rockwell FactoryTalk documentation",
          "Automation.com system integration guides",
        ],
        tools: [
          "Industrial Network Basics by Phoenix Contact",
        ],
      },
    },
  },

  // ==================== TIER 3: Programming Foundation ====================
  {
    id: "cse-020-controls",
    code: "CSE 020",
    name: "Introduction to Computing 1",
    fullName: "CSE 020: Introduction to Computing 1",
    description:
      "Foundation in programming logic, algorithms, and scripting - essential for control algorithm implementation and automation scripting.",
    tier: 3,
    prerequisites: [],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Write programs using structured programming techniques",
        "Implement control algorithms in software",
        "Debug and test automation scripts",
        "Understand data structures for control applications",
        "Develop automation utilities and tools",
      ],
      topics: [
        "Programming fundamentals (variables, loops, functions)",
        "Control flow and logic",
        "Data structures (arrays, lists)",
        "Algorithm design",
        "File I/O for data logging",
        "Error handling",
        "Scripting for automation",
      ],
      careerRelevance:
        "Programming skills are foundational for modern automation engineering. Python and C are commonly used for control algorithm prototyping, data analysis, SCADA scripting, and custom automation tools. Essential for implementing advanced control strategies beyond basic ladder logic.",
      realWorldApplications: [
        "Python scripting for SCADA data analysis",
        "Control algorithm prototyping in MATLAB/Python",
        "Custom automation utilities",
        "Data logging and reporting scripts",
        "PLC simulation and testing tools",
      ],
      resources: {
        websites: [
          "Python for automation tutorials",
          "Scripting for SCADA systems guides",
        ],
        tools: [
          "MATLAB Control System Toolbox",
        ],
      },
    },
  },
];

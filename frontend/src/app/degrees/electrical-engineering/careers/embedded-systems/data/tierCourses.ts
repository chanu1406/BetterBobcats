/**
 * Embedded Systems & Robotics Career Path - Tier Courses Data
 * Course recommendations organized by tier for Embedded Systems & Robotics career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE for Embedded Systems & Robotics
 * Hardware + low-level software: microcontrollers, sensors, motors, real-time control
 * Core for robotics, drones, IoT, and automotive embedded systems
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "embedded-ee-060",
    code: "EE 060",
    name: "Boolean Algebra & Digital Circuits",
    fullName: "EE 060: Boolean Algebra & Digital Circuits",
    description: "Digital logic fundamentals, Boolean logic, state machines — core foundation for microcontroller work",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Boolean Algebra & Digital Circuits is fundamental for understanding how digital systems work at the hardware level. Essential for embedded systems engineers who need to interface with digital hardware, understand microcontroller internals, and design digital control systems for robotics.",

      realWorldApplications: [
        "Designing digital control circuits for robotic systems",
        "Understanding microcontroller internal architecture and digital logic",
        "Creating state machines for embedded system behavior control",
        "Implementing finite state machines in firmware for autonomous systems",
        "Debugging digital hardware issues in embedded devices",
        "Interfacing digital sensors and actuators with microcontrollers"
      ],

      learningOutcomes: [
        "Master Boolean algebra and combinational logic design",
        "Design and analyze sequential logic circuits and state machines",
        "Understand digital system timing and clocking principles",
        "Apply digital logic principles to embedded system design",
        "Implement hardware-level digital control systems"
      ],

      topics: [
        "Boolean algebra and logic gates",
        "Combinational logic circuits (multiplexers, decoders, adders)",
        "Sequential logic: flip-flops, registers, counters",
        "Finite state machines and state diagram design",
        "Digital system timing, setup, and hold times",
        "Hardware description languages (Verilog/VHDL basics)"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=M0mx8S05v60", // Digital logic basics
          "https://www.youtube.com/watch?v=VPw9vPN-3ac", // Boolean algebra
          "https://www.youtube.com/watch?v=C1hH6bEUvWI", // State machines
          "https://www.youtube.com/watch?v=KM0DdEaY5sY"  // Sequential logic
        ],
        websites: [
          "https://www.allaboutcircuits.com/textbook/digital/",
          "https://www.electronics-tutorials.ws/boolean/bool_1.html",
          "https://learn.sparkfun.com/tutorials/digital-logic",
          "https://www.nandland.com/articles/digital-logic-tutorial.html"
        ],
        tools: [
          "Logisim", // Digital circuit simulator
          "Quartus (Intel/Altera)", // FPGA design tool
          "Vivado (Xilinx)", // FPGA development
          "Digital Works" // Logic simulator
        ]
      },

      additionalNotes:
        "This course provides the digital logic foundation necessary for understanding how microcontrollers and embedded processors work at the hardware level. Critical for firmware engineers and robotics engineers."
    }
  },
  {
    id: "embedded-ee-140",
    code: "EE 140",
    name: "Computer and Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description: "How microcontrollers work: memory, buses, interrupts, real-time programming — THE core embedded systems course",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Computer and Microcontroller Architecture is THE definitive course for embedded systems careers. Understanding microcontroller internals, memory architectures, interrupts, and real-time programming is absolutely essential for embedded engineers, firmware developers, and robotics engineers. This is the most directly applicable course for embedded systems roles.",

      realWorldApplications: [
        "Programming microcontrollers for robotics and IoT devices",
        "Implementing interrupt-driven architectures for real-time embedded systems",
        "Optimizing memory usage in resource-constrained embedded devices",
        "Designing firmware for motor controllers and sensor systems",
        "Developing real-time operating systems (RTOS) applications",
        "Debugging embedded software at the hardware-software interface"
      ],

      learningOutcomes: [
        "Understand microcontroller architecture: CPU, memory, peripherals",
        "Program microcontrollers in C and assembly for embedded applications",
        "Implement interrupt service routines and real-time event handling",
        "Manage memory hierarchies and optimize embedded code",
        "Design embedded systems with peripheral interfaces (GPIO, timers, ADC, UART)",
        "Apply real-time programming principles to embedded applications"
      ],

      topics: [
        "Microcontroller architecture: ARM Cortex-M, AVR, PIC",
        "Memory systems: Flash, SRAM, memory-mapped I/O",
        "Interrupts and exception handling",
        "Peripheral interfaces: GPIO, timers, PWM, ADC, UART, SPI, I2C",
        "Real-time programming and task scheduling",
        "Low-level embedded C and assembly programming"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7LqPJGnBPMM", // Microcontrollers explained
          "https://www.youtube.com/watch?v=3K7dg6H5ByE", // ARM Cortex-M programming
          "https://www.youtube.com/watch?v=uyc_pDBskNE", // Interrupts in embedded systems
          "https://www.youtube.com/watch?v=F321087yYy4"  // Embedded C programming
        ],
        websites: [
          "https://www.embedded.com/",
          "https://www.arm.com/resources/education/education-kits",
          "https://learn.sparkfun.com/tutorials/what-is-an-arduino",
          "https://www.freertos.org/RTOS.html"
        ],
        tools: [
          "Arduino IDE", // Beginner-friendly embedded programming
          "STM32CubeIDE", // Professional ARM development
          "Keil MDK", // Industry-standard ARM toolchain
          "MPLAB X IDE", // Microchip development
          "FreeRTOS" // Real-time operating system
        ]
      },

      additionalNotes:
        "This is THE most important course for embedded systems and robotics careers. Hands-on experience with microcontroller programming is essential. Consider supplementing with personal projects using Arduino, STM32, or Raspberry Pi Pico."
    }
  },
  {
    id: "embedded-ee-102",
    code: "EE 102",
    name: "Signal Processing and Linear Systems",
    fullName: "EE 102: Signal Processing and Linear Systems",
    description: "Filtering sensor data, working with IMUs and encoders — essential for robotics sensor processing",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Signal Processing is critical for robotics and embedded systems that interact with sensors. IMUs (Inertial Measurement Units), encoders, accelerometers, and other sensors produce noisy signals that require filtering and processing. Essential for autonomous robots, drones, and IoT devices.",

      realWorldApplications: [
        "Filtering accelerometer and gyroscope data for robot navigation",
        "Processing encoder signals for precise motor control",
        "Implementing Kalman filters for sensor fusion in autonomous vehicles",
        "Designing digital filters for real-time embedded signal processing",
        "Analyzing vibration and acoustic signals for condition monitoring",
        "Processing sensor data streams in IoT and wearable devices"
      ],

      learningOutcomes: [
        "Understand signals and systems in time and frequency domains",
        "Design and implement digital filters (FIR, IIR, Kalman)",
        "Analyze system responses and stability",
        "Apply Fourier analysis to sensor data",
        "Implement real-time signal processing algorithms on embedded systems"
      ],

      topics: [
        "Continuous and discrete-time signals and systems",
        "Convolution, impulse response, and system characterization",
        "Fourier transforms and frequency domain analysis",
        "Digital filter design: FIR and IIR filters",
        "Sampling theory and aliasing",
        "Real-time digital signal processing on microcontrollers"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=spUNpyF58BY", // Signal processing intro
          "https://www.youtube.com/watch?v=BsZdPlK0T-I", // Digital filters
          "https://www.youtube.com/watch?v=fWCfJRdaw1k", // Fourier transform
          "https://www.youtube.com/watch?v=mzbKJxhxQyc"  // Kalman filter explained
        ],
        websites: [
          "https://www.dspguide.com/", // Digital Signal Processing Guide
          "https://www.analog.com/en/education/education-library/tutorials.html",
          "https://jackschaedler.github.io/circles-sines-signals/", // Interactive DSP
          "https://www.mathworks.com/help/signal/"
        ],
        tools: [
          "MATLAB/Simulink", // Signal processing simulation
          "Python (NumPy/SciPy)", // DSP libraries
          "GNU Octave", // Open-source MATLAB alternative
          "LabVIEW" // Real-time signal processing
        ]
      },

      additionalNotes:
        "Signal processing is what separates amateur robotics from professional autonomous systems. Understanding how to filter sensor noise and extract meaningful information is critical for reliable embedded systems."
    }
  },
  {
    id: "embedded-ee-122",
    code: "EE 122",
    name: "Introduction to Control Systems",
    fullName: "EE 122: Introduction to Control Systems",
    description: "Motion control, trajectory tracking, PID control for robots — essential for autonomous systems",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Control Systems is fundamental for robotics and autonomous systems. PID controllers, motion control, and trajectory tracking are used in every robot, drone, and autonomous vehicle. Essential for embedded engineers working on motor control, flight controllers, and autonomous navigation.",

      realWorldApplications: [
        "Implementing PID controllers for motor speed and position control",
        "Designing trajectory tracking systems for autonomous robots",
        "Developing flight controllers for drones and aerial robots",
        "Creating self-balancing systems and inverted pendulums",
        "Implementing feedback control for robotic arms and manipulators",
        "Designing temperature, pressure, and flow control systems in embedded devices"
      ],

      learningOutcomes: [
        "Understand feedback control principles and closed-loop systems",
        "Design PID controllers and tune control parameters",
        "Analyze system stability using root locus and Bode plots",
        "Model dynamic systems with transfer functions and state-space",
        "Implement digital controllers on microcontrollers and embedded systems"
      ],

      topics: [
        "Feedback control systems and closed-loop behavior",
        "Transfer functions and frequency response",
        "PID controller design, tuning, and implementation",
        "System stability analysis: Routh-Hurwitz, root locus, Bode",
        "State-space modeling and control",
        "Digital control implementation on embedded systems"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=oBc_BHxw78s", // Control systems basics
          "https://www.youtube.com/watch?v=wkfEZmsQqiA", // PID explained
          "https://www.youtube.com/watch?v=XfAt6hNV8XM", // PID tuning
          "https://www.youtube.com/watch?v=Pi7l8mMjYVE"  // Control in robotics
        ],
        websites: [
          "https://www.electrical4u.com/control-system/",
          "https://ctms.engin.umich.edu/CTMS/index.php", // Control tutorials
          "https://www.ni.com/en/shop/labview/pid-theory-explained.html",
          "https://www.allaboutcircuits.com/technical-articles/an-introduction-to-control-systems/"
        ],
        tools: [
          "MATLAB/Simulink", // Control system design and simulation
          "LabVIEW", // Real-time control
          "Python Control Systems Library",
          "Arduino PID Library" // Embedded PID implementation
        ]
      },

      additionalNotes:
        "Control Systems is the theoretical foundation that makes robots move precisely and autonomously. PID control is used in virtually every embedded system with feedback — from quadcopters to 3D printers to industrial robots."
    }
  },
  {
    id: "embedded-ee-021",
    code: "EE 021",
    name: "Electrical Engineering Programming",
    fullName: "EE 021: Electrical Engineering Programming",
    description: "Low-level EE-focused programming skills — foundation for embedded firmware development",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Programming is fundamental for embedded systems engineers. This course teaches low-level programming concepts specific to electrical engineering applications, including hardware interfacing, bit manipulation, and embedded C programming techniques essential for firmware development.",

      realWorldApplications: [
        "Writing firmware for microcontrollers and embedded processors",
        "Implementing device drivers for sensors and actuators",
        "Programming embedded systems for robotics and IoT applications",
        "Developing real-time control algorithms in embedded C",
        "Interfacing software with hardware peripherals (GPIO, SPI, I2C)",
        "Optimizing code for resource-constrained embedded systems"
      ],

      learningOutcomes: [
        "Master low-level C programming for embedded systems",
        "Understand bit manipulation and hardware register access",
        "Implement data structures and algorithms for embedded applications",
        "Interface with hardware peripherals through software",
        "Write efficient, memory-conscious embedded code"
      ],

      topics: [
        "Embedded C programming fundamentals",
        "Pointers, memory management, and data structures",
        "Bit manipulation and bitwise operations",
        "Hardware register manipulation and memory-mapped I/O",
        "Interrupt-driven programming patterns",
        "Debugging and testing embedded software"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=F321087yYy4", // Embedded C programming
          "https://www.youtube.com/watch?v=0FQ3KkKVlso", // Pointers in C
          "https://www.youtube.com/watch?v=uyc_pDBskNE", // Bit manipulation
          "https://www.youtube.com/watch?v=3V9eqvkMzHA"  // Memory-mapped I/O
        ],
        websites: [
          "https://www.embedded.com/",
          "https://barrgroup.com/embedded-systems/books/embedded-c-coding-standard",
          "https://www.learn-c.org/",
          "https://www.geeksforgeeks.org/embedded-systems-tutorial/"
        ],
        tools: [
          "GCC ARM Embedded", // Cross-compiler for ARM
          "Arduino IDE", // Beginner-friendly
          "VS Code with PlatformIO", // Modern embedded IDE
          "STM32CubeIDE" // Professional ARM development
        ]
      },

      additionalNotes:
        "Strong programming skills are non-negotiable for embedded systems careers. This course provides the foundation for writing efficient, hardware-aware firmware that runs on resource-constrained microcontrollers."
    }
  }
];

/**
 * 🟡 TIER 2: STRONG BOOSTERS for Embedded Systems & Robotics
 * These courses significantly enhance embedded engineering expertise and open advanced opportunities
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "embedded-ee-101",
    code: "EE 101",
    name: "Electromagnetic Field Theory",
    fullName: "EE 101: Electromagnetic Field Theory",
    description: "Analog circuits for sensor conditioning and signal interfacing — essential hardware skills",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Understanding analog circuits is critical for embedded systems engineers who need to interface digital microcontrollers with analog sensors. Essential for sensor signal conditioning, amplifier design, and creating robust embedded hardware systems.",

      realWorldApplications: [
        "Designing sensor conditioning circuits for robotics",
        "Creating amplifier circuits for low-level sensor signals",
        "Implementing analog filters for noise reduction in embedded systems",
        "Interfacing analog sensors (temperature, pressure, strain) with microcontrollers",
        "Designing power supply and voltage regulation circuits",
        "Building analog front-ends for data acquisition systems"
      ],

      learningOutcomes: [
        "Analyze and design amplifier circuits (op-amps, instrumentation amps)",
        "Implement active and passive filter circuits",
        "Design sensor signal conditioning circuits",
        "Understand analog-to-digital conversion principles",
        "Apply analog circuit design to embedded system interfaces"
      ],

      topics: [
        "Operational amplifier circuits and applications",
        "Active and passive filter design",
        "Sensor signal conditioning and amplification",
        "Analog-to-digital and digital-to-analog conversion",
        "Voltage regulators and power supply design",
        "Instrumentation amplifiers for sensor interfaces"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7FYHt5XviKc", // Op-amps explained
          "https://www.youtube.com/watch?v=8Gl_Fk5j69U", // Instrumentation amplifiers
          "https://www.youtube.com/watch?v=Sot8SJhZBfw", // Active filters
          "https://www.youtube.com/watch?v=TUWnWsNl8Dw"  // Sensor conditioning
        ],
        websites: [
          "https://www.analog.com/en/education.html",
          "https://www.allaboutcircuits.com/textbook/semiconductors/",
          "https://www.electronics-tutorials.ws/opamp/opamp_1.html",
          "https://www.ti.com/amplifier-circuit/precision-amplifiers/overview.html"
        ],
        tools: [
          "LTspice", // Analog circuit simulation
          "Multisim", // Circuit design and simulation
          "Tinkercad Circuits", // Beginner-friendly
          "KiCad" // PCB design with analog circuits
        ]
      },

      additionalNotes:
        "Most embedded systems interact with analog sensors. Understanding how to properly condition and amplify sensor signals is what separates hobbyist projects from professional embedded systems."
    }
  },
  {
    id: "embedded-ee-131",
    code: "EE 131",
    name: "Power Electronics",
    fullName: "EE 131: Power Electronics",
    description: "High-power motor control, actuators, robotics drive systems — for advanced robotics applications",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Power Electronics is essential for robotics engineers working with high-power motor drives, actuators, and power conversion systems. Critical for designing motor controllers for industrial robots, mobile robots, and autonomous vehicles.",

      realWorldApplications: [
        "Designing motor drive circuits for robotic actuators",
        "Implementing PWM-based speed and torque control for DC and BLDC motors",
        "Creating power converters for battery-powered robots and drones",
        "Developing regenerative braking systems for autonomous vehicles",
        "Designing DC-DC converters for onboard power distribution",
        "Implementing soft-start and protection circuits for high-power systems"
      ],

      learningOutcomes: [
        "Understand power semiconductor devices (MOSFETs, IGBTs)",
        "Design DC-DC converters (buck, boost, buck-boost)",
        "Implement PWM techniques for motor control",
        "Analyze power converter efficiency and thermal management",
        "Design motor drive circuits for robotics applications"
      ],

      topics: [
        "Power semiconductor switches: MOSFETs, IGBTs, diodes",
        "DC-DC converter topologies",
        "PWM techniques and motor control strategies",
        "H-bridge circuits for bidirectional motor control",
        "Three-phase inverters for BLDC motor drives",
        "Thermal management and protection circuits"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=WClbOQtvGxw", // Power electronics basics
          "https://www.youtube.com/watch?v=9VxC4Kp1A4s", // DC-DC converters
          "https://www.youtube.com/watch?v=MMHQ3CY59_M", // Motor drives explained
          "https://www.youtube.com/watch?v=X2-lN2zrBfA"  // H-bridge motor control
        ],
        websites: [
          "https://www.ti.com/motor-drivers/overview.html",
          "https://www.infineon.com/cms/en/applications/motor-control/",
          "https://www.analog.com/en/applications/markets/industrial-automation.html",
          "https://www.electrical4u.com/power-electronics/"
        ],
        tools: [
          "PLECS", // Power electronics simulation
          "LTspice", // Circuit-level power simulation
          "MATLAB/Simulink", // Motor drive modeling
          "PSIM" // Power electronics specialized tool
        ]
      },

      additionalNotes:
        "Power Electronics is increasingly important for robotics as systems become more powerful and energy-efficient. Essential for engineers working on mobile robots, industrial automation, and autonomous vehicles."
    }
  },
  {
    id: "embedded-ee-130",
    code: "EE 130",
    name: "Electrical Machines",
    fullName: "EE 130: Electrical Machines",
    description: "Motor control and drive systems — essential for robotics and autonomous platforms",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Electrical Machines covers motors, generators, and drive systems that power robotic actuators and autonomous vehicles. Essential for robotics engineers who need to select, control, and optimize motors for mobile robots, robotic arms, and autonomous platforms.",

      realWorldApplications: [
        "Selecting appropriate motors for robotic applications (DC, BLDC, stepper, servo)",
        "Implementing motor control algorithms for precise positioning",
        "Designing drive systems for mobile robots and autonomous vehicles",
        "Optimizing motor efficiency and torque for battery-powered systems",
        "Troubleshooting motor performance issues in robotic systems",
        "Implementing regenerative braking for energy recovery"
      ],

      learningOutcomes: [
        "Understand motor types: DC, brushless DC, stepper, servo",
        "Analyze motor torque, speed, and efficiency characteristics",
        "Design motor drive and control circuits",
        "Implement motor control strategies (open-loop, closed-loop)",
        "Select motors for specific robotic applications"
      ],

      topics: [
        "DC motors: brushed and brushless (BLDC)",
        "Stepper motors and micro-stepping control",
        "Servo motors and position control",
        "Motor torque-speed curves and performance analysis",
        "Motor drive circuits and H-bridges",
        "Encoder feedback and closed-loop motor control"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=CWulQ1ZSE3c", // DC motors explained
          "https://www.youtube.com/watch?v=bCEiOnuODac", // BLDC motors
          "https://www.youtube.com/watch?v=09Mpkjcr0bo", // Stepper motors
          "https://www.youtube.com/watch?v=LXURLvga8bQ"  // Servo motors
        ],
        websites: [
          "https://www.electrical4u.com/electrical-motor/",
          "https://www.motioncontroltips.com/",
          "https://www.orientalmotor.com/technology/technology.html",
          "https://www.machinedesign.com/motors-drives"
        ],
        tools: [
          "MATLAB/Simulink", // Motor modeling
          "Motor-CAD", // Motor design software
          "Arduino Motor Libraries", // Practical motor control
          "ROS (Robot Operating System)" // Robotics motor integration
        ]
      },

      additionalNotes:
        "Understanding motors is fundamental for robotics. Every mobile robot, robotic arm, and autonomous vehicle relies on precise motor control. This knowledge is directly applicable to real-world robotics projects."
    }
  }
];

/**
 * 🟠 TIER 3: OPTIONAL / INTEREST for Embedded Systems & Robotics
 * Helpful in specific contexts but not essential for core embedded systems careers
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "embedded-ee-150",
    code: "EE 150",
    name: "Digital Communication",
    fullName: "EE 150: Digital Communication",
    description: "Multi-robot communication and wireless control systems — useful for networked robotics",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Digital Communication is useful for embedded engineers working on wireless IoT devices, multi-robot systems, or remote control applications. Important for swarm robotics, distributed sensor networks, and wireless embedded systems.",

      realWorldApplications: [
        "Implementing wireless communication between robots (Zigbee, LoRa, WiFi)",
        "Designing communication protocols for IoT sensor networks",
        "Developing remote control systems for drones and autonomous vehicles",
        "Creating mesh networks for distributed robot swarms",
        "Implementing error correction and reliable data transmission",
        "Designing low-power wireless communication for battery-operated devices"
      ],

      learningOutcomes: [
        "Understand digital modulation techniques (AM, FM, PSK, QAM)",
        "Design communication protocols for embedded systems",
        "Analyze link budgets and communication reliability",
        "Implement error detection and correction codes",
        "Apply wireless communication standards to embedded applications"
      ],

      topics: [
        "Digital modulation and demodulation",
        "Communication protocols: UART, SPI, I2C, CAN, Ethernet",
        "Wireless standards: WiFi, Bluetooth, Zigbee, LoRa",
        "Error detection and correction codes",
        "Link budget analysis and range estimation",
        "Network topologies for embedded systems"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=xQDX_5b4BcI", // Digital communication basics
          "https://www.youtube.com/watch?v=qlK5HhrjvBs", // Wireless communication
          "https://www.youtube.com/watch?v=ZBTJz6p5Bnc", // IoT communication protocols
          "https://www.youtube.com/watch?v=cIhRYJW9cBw"  // LoRa and IoT
        ],
        websites: [
          "https://www.electronics-tutorials.ws/io/io_1.html",
          "https://www.allaboutcircuits.com/textbook/communication-systems/",
          "https://learn.sparkfun.com/tutorials/serial-communication",
          "https://www.lora-alliance.org/"
        ],
        tools: [
          "Wireshark", // Protocol analysis
          "GNU Radio", // Software-defined radio
          "ESP32/ESP8266", // WiFi-enabled microcontrollers
          "nRF24L01", // Low-cost wireless modules
          "ROS 2" // Robot communication middleware
        ]
      },

      additionalNotes:
        "Digital Communication is valuable for IoT and multi-robot systems, but not strictly required for basic embedded systems work. Consider if your interests lean toward networked or wireless embedded applications."
    }
  },
  {
    id: "embedded-ee-180",
    code: "EE 180",
    name: "Autonomous Vehicles",
    fullName: "EE 180: Autonomous Vehicles",
    description: "Integration of sensing, control, and navigation — advanced autonomous systems pathway",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Autonomous Vehicles integrates sensors, control systems, and navigation algorithms for self-driving systems. Highly relevant for students targeting autonomous robotics, self-driving cars, or aerial drones. Combines embedded systems with high-level autonomy.",

      realWorldApplications: [
        "Developing autonomous navigation systems for mobile robots",
        "Implementing sensor fusion for localization (GPS, IMU, LiDAR, cameras)",
        "Creating path planning and obstacle avoidance algorithms",
        "Designing control systems for autonomous drones and ground vehicles",
        "Integrating perception, planning, and control for autonomous platforms",
        "Implementing SLAM (Simultaneous Localization and Mapping) algorithms"
      ],

      learningOutcomes: [
        "Understand autonomous system architectures",
        "Implement sensor fusion and localization algorithms",
        "Design path planning and motion control systems",
        "Integrate perception, planning, and control subsystems",
        "Apply machine learning to autonomous vehicle applications"
      ],

      topics: [
        "Autonomous system architecture and software stacks",
        "Sensor fusion: Kalman filtering, particle filters",
        "Localization: GPS, IMU, odometry, SLAM",
        "Perception: object detection, lane detection, obstacle avoidance",
        "Path planning: A*, RRT, trajectory optimization",
        "Control: MPC, trajectory tracking, motion control"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=eRmlqIBdVTo", // Self-driving cars intro
          "https://www.youtube.com/watch?v=IgBQCoEfiMs", // SLAM explained
          "https://www.youtube.com/watch?v=0lKuwCzON9E", // Sensor fusion
          "https://www.youtube.com/watch?v=NSznYzlu76w"  // Path planning algorithms
        ],
        websites: [
          "https://www.udacity.com/course/self-driving-car-engineer-nanodegree--nd0013",
          "https://www.autoware.org/", // Open-source autonomous driving software
          "https://apollo.auto/", // Baidu Apollo autonomous driving platform
          "https://docs.ros.org/en/foxy/Tutorials.html" // ROS tutorials
        ],
        tools: [
          "ROS / ROS 2", // Robot Operating System
          "Gazebo", // Robot simulation
          "CARLA", // Autonomous driving simulator
          "MATLAB Automated Driving Toolbox",
          "OpenCV" // Computer vision library
        ]
      },

      additionalNotes:
        "Autonomous Vehicles is an advanced course that represents the cutting edge of embedded systems and robotics. Highly recommended for students passionate about self-driving technology and autonomous robots, but not required for general embedded systems work."
    }
  },
  {
    id: "embedded-cse-020",
    code: "CSE 020",
    name: "Introduction to Computing 1",
    fullName: "CSE 020: Introduction to Computing 1",
    description: "High-level programming fundamentals — useful for software-heavy embedded projects",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "While embedded systems primarily use C and low-level programming, higher-level languages like Python are increasingly used for prototyping, testing, and host-side tools. Useful for embedded engineers who need to develop test scripts, data analysis tools, or simulation software.",

      realWorldApplications: [
        "Writing Python scripts for embedded system testing and automation",
        "Creating data visualization tools for sensor data analysis",
        "Developing simulation and modeling tools for embedded systems",
        "Building host-side applications for communication with embedded devices",
        "Rapid prototyping of algorithms before embedded implementation",
        "Creating GUI tools for embedded system configuration and monitoring"
      ],

      learningOutcomes: [
        "Understand fundamental programming concepts",
        "Write programs in a high-level language (Python/C++/Java)",
        "Use data structures and algorithms",
        "Apply software engineering principles",
        "Develop tools and scripts for embedded system development"
      ],

      topics: [
        "Variables, data types, and control structures",
        "Functions and modular programming",
        "Object-oriented programming basics",
        "File I/O and data processing",
        "Algorithms and data structures",
        "Software development tools and version control"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=rfscVS0vtbw", // Python basics
          "https://www.youtube.com/watch?v=8DvywoWv6zI", // Programming fundamentals
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc"  // Python for engineers
        ],
        websites: [
          "https://www.python.org/about/gettingstarted/",
          "https://www.learnpython.org/",
          "https://realpython.com/",
          "https://www.w3schools.com/python/"
        ],
        tools: [
          "Python", // High-level programming
          "VS Code", // Code editor
          "PyCharm", // Python IDE
          "Jupyter Notebook" // Interactive development
        ]
      },

      additionalNotes:
        "While not strictly required for embedded systems, programming skills in Python or another high-level language are valuable for tool development, testing, and prototyping. Consider if you want to develop host-side software or testing infrastructure."
    }
  }
];

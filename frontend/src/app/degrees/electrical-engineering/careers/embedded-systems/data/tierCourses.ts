/**
 * Embedded Systems & Robotics Tier Courses Data
 * Course recommendations organized by tier for Embedded Systems & Robotics career path
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
  "id": "ee-101",
  "code": "EE 101",
  "name": "Electronic Circuit Design I",
  "fullName": "EE 101: Electronic Circuit Design I",
  "description": "Foundational course in analog circuit design, covering passive and active components, circuit analysis techniques, and practical hands-on circuit building—essential for understanding power delivery, signal conditioning, and sensor interfacing in embedded robotics systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electronic Circuit Design I is critical for Embedded Systems & Robotics Engineering as it provides the foundational understanding of how to design circuits that interface microcontrollers with real-world sensors, motors, and power systems. Robotics demands reliable power delivery, accurate signal conditioning, and robust protection mechanisms—all rooted in fundamental circuit design principles. This course bridges theory and practice, enabling engineers to transition from high-level firmware to low-level hardware requirements.",
    "realWorldApplications": [
      "Power supply design for robotic platforms: designing voltage regulators (7805, LDO) to provide stable 5V/3.3V to microcontroller and sensor circuits from battery sources",
      "Sensor signal conditioning: designing amplifier circuits and filtering networks to prepare analog sensor data (temperature, distance, current) for microcontroller ADC inputs",
      "Motor driver circuits: understanding transistor-based switching circuits to drive DC motors, servos, and stepper motors with appropriate current amplification and protection",
      "Power distribution and decoupling: implementing capacitor networks to stabilize power rails and reduce noise in mixed-signal robotics boards"
    ],
    "learningOutcomes": [
      "Understand fundamental circuit elements (resistors, capacitors, inductors) and their behavior in DC and transient conditions",
      "Apply Kirchhoff's Voltage Law (KVL) and Kirchhoff's Current Law (KCL) to analyze and solve complex multi-loop circuits",
      "Design and analyze passive circuits including voltage dividers, RC filtering networks, and impedance matching for signal integrity",
      "Understand active devices (diodes, transistors, operational amplifiers) and their use in switching, amplification, and signal conditioning",
      "Build and test circuits on breadboards with proper measurement techniques using multimeters and oscilloscopes",
      "Apply circuit design principles to real embedded systems applications (power regulation, sensor interfacing, protection)",
      "Use circuit simulation software to validate designs before physical implementation"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=IjtQVATW5Ks - Circuit Analysis Using Kirchhoff's Current & Voltage Laws (26:03)",
        "https://www.youtube.com/watch?v=O4JACbIQX_w - Paul McWhorter Arduino Lesson 3: Arduino For Loops and LED Circuit (50:16)",
        "https://www.youtube.com/watch?v=19TQsLpfPp8 - GreatScott! Electronic Basics #1: What is Electricity (13:49)",
        "https://www.youtube.com/watch?v=7et2iyNBrT4 - GreatScott! Building Electronic Circuits (Tutorial 1): Electronic Components (18:10)",
        "https://www.youtube.com/watch?v=6F_rmZ1nXFQ - The Organic Chemistry Tutor: Kirchhoff's Voltage Law (23:47)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/ - MIT OpenCourseWare: Circuits and Electronics",
        "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html - LTspice Circuit Simulator",
        "https://www.falstad.com/circuit/ - Falstad Circuit Simulator",
        "https://everycircuit.com - EveryCircuit Online Simulator",
        "https://eevblog.com/forum/beginners/ - EEVblog Beginners Forum"
      ],
      "tools": [
        "LTspice (SPICE simulator)",
        "QSPICE (next-gen mixed-signal simulator)",
        "Falstad Circuit Simulator (browser-based)",
        "KiCad (with ngspice integration)",
        "Breadboard + Jumper Wires + Multimeter",
        "Arduino/Microcontroller Kit"
      ]
    }
  }
}
,
  {
  "id": "ee--102",
  "code": "EE 102",
  "name": "Signal Processing and Linear Systems",
  "fullName": "EE 102: Signal Processing and Linear Systems",
  "description": "Foundational course covering continuous and discrete-time signal analysis and linear systems theory with emphasis on sensor data conditioning, digital filtering, and real-time control for robotics and embedded systems applications.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Signal processing and linear systems theory form the mathematical foundation for all embedded robotics applications. Students learn to condition raw sensor data (accelerometers, gyros, encoders) through filtering techniques, design discrete-time control systems using z-transforms and transfer functions, and understand frequency-domain analysis critical for stability analysis and system design. Mastery of LTI systems enables engineers to implement PID controllers, observer designs, and advanced control techniques (LQR, feedback linearization) essential for autonomous robot navigation and real-time embedded control loops.",
    "realWorldApplications": [
      "Designing low-pass IIR filters on STM32 microcontrollers to remove noise from accelerometer sensors in quadcopter attitude estimation",
      "Implementing FFT algorithms to analyze vibration signatures in industrial robotic arms for predictive maintenance diagnostics",
      "Using frequency-domain analysis to design stable PID controllers for motor speed regulation in autonomous mobile robots",
      "Applying Nyquist sampling theory and anti-aliasing filters when integrating analog environmental sensors (temperature, pressure, distance) into embedded systems",
      "Analyzing transfer functions and pole placement to stabilize feedback control loops in drone altitude hold and attitude stabilization systems",
      "Implementing real-time signal processing pipelines on ARM Cortex-M processors to fuse multiple sensor streams (sensor fusion) for robot localization"
    ],
    "learningOutcomes": [
      "Represent and manipulate continuous-time and discrete-time signals in both time and frequency domains",
      "Analyze linear time-invariant (LTI) systems using impulse response, step response, and transfer function methods",
      "Design and implement FIR and IIR digital filters for embedded systems using CMSIS-DSP and ARM libraries",
      "Apply Fourier series and transforms to decompose complex signals and understand their frequency content",
      "Use the z-transform to analyze and design discrete-time control systems and digital filters",
      "Apply Nyquist sampling theorem to determine appropriate ADC sampling rates and implement anti-aliasing filters",
      "Solve linear differential equations to model robotic system dynamics and control loop behavior",
      "Implement real-time DSP algorithms on microcontrollers with real-world constraints (memory, CPU speed, power)",
      "Design and analyze feedback control systems using frequency-response methods (Bode plots, gain margin)",
      "Apply signal processing to practical robotics problems: sensor conditioning, motor control, obstacle detection"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=4lqeP61IIQg",
        "https://www.youtube.com/playlist?list=PLO89phzZmnHjtQznaJh21KL0mtC0H-V5I",
        "https://www.youtube.com/watch?v=DEXuVeMfJl8",
        "https://www.youtube.com/watch?v=KJnAy6hzetw",
        "https://www.youtube.com/watch?v=kjw6W0SZe04",
        "https://www.youtube.com/watch?v=mGuDXlZEoSc",
        "https://www.youtube.com/watch?v=1e_ZB8p5n6s",
        "https://www.youtube.com/watch?v=n61M6PXEv8s"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/",
        "https://explorecourses.stanford.edu/search?view=catalog&filter-coursestatus-Active=on&q=EE+102A",
        "https://developer.arm.com/documentation/dui0491/latest/CMSIS-DSP/",
        "https://www.freecodecamp.org/news/connect-read-process-sensor-data-on-microcontrollers-for-beginners/",
        "https://promwad.com/news/dsp-pipelines-on-embedded-platforms"
      ],
      "tools": [
        "MATLAB/Simulink (transfer function design, frequency response analysis)",
        "Python with NumPy/SciPy (signal processing libraries)",
        "STM32CubeIDE (embedded DSP implementation)",
        "ARM CMSIS-DSP Library (optimized DSP for Cortex-M)",
        "GNU Octave (free MATLAB alternative)",
        "Jupyter Notebooks with scipy.signal module"
      ]
    }
  }
}
,
  {
  "id": "ee-111",
  "code": "EE 111",
  "name": "Electronic Circuit Design II",
  "fullName": "EE 111: Electronic Circuit Design II",
  "description": "Advanced analog circuit design course focusing on operational amplifiers (op-amps), active filters, transistor amplifiers, and feedback systems. Students design and implement practical circuits for signal conditioning, power amplification, and sensor interfacing—core competencies for autonomous robotics and embedded systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electronic Circuit Design II builds on EE 101 fundamentals to enable students to design real-world analog circuits critical to robotics. Op-amp circuits form the backbone of modern sensor signal conditioning, where millivolt-scale biomedical or environmental sensor signals must be amplified, filtered, and conditioned for reliable microcontroller input. Transistor amplifiers and motor drivers enable precise control of actuators and power delivery. Feedback systems and stability analysis prevent circuit oscillation and ensure reliable operation under varying loads—essential in robots that must respond reliably to environmental changes. This course transforms students from circuit analysts to circuit designers capable of architecting complete embedded systems.",
    "realWorldApplications": [
      "Sensor signal conditioning chains: designing cascaded op-amp stages (pre-amplifier → filter → ADC buffer) to convert 10mV sensor signals to rail-to-rail 0-5V ADC inputs with 100x gain, low-pass filtering at 1kHz cutoff to remove 60Hz noise, and output buffering to drive microcontroller inputs",
      "Motor driver design: implementing H-bridge circuits with complementary PWM, dead-time control, and shoot-through protection to drive DC motors, servos, and stepper motors with 90% efficiency and safe current limiting",
      "Active filter design: creating Butterworth or Bessel low-pass filters (1st- to 3rd-order) to attenuate high-frequency noise from accelerometers, gyroscopes, and distance sensors before ADC sampling",
      "Feedback amplifier stability: analyzing Bode plots, phase margin, and gain margin to design stable inverting and non-inverting amplifiers with predictable gain, minimal oscillation, and load-independent performance",
      "Power amplification for audio/haptic feedback: implementing Class AB audio amplifiers (TDA7294 ICs) to drive speakers for robot audio cues or haptic feedback at 20-100W output power"
    ],
    "learningOutcomes": [
      "Master operational amplifier theory including golden rules (virtual short, high input impedance), open-loop vs. closed-loop operation, and frequency limitations (gain-bandwidth product, slew rate)",
      "Design inverting and non-inverting amplifier circuits with precise gain calculation (G = 1 + Rf/Rg for non-inverting; G = -Rf/Rg for inverting) and load-independent performance",
      "Understand and design active filter topologies (Sallen-Key, Multiple Feedback) for low-pass, high-pass, and band-pass applications with Butterworth, Bessel, and Chebyshev response curves",
      "Design integrator and differentiator circuits for mathematical signal processing and frequency domain filtering",
      "Analyze transistor circuits including common-emitter amplifiers, biasing techniques (voltage divider), and AC/DC gain calculations with emitter bypass capacitors",
      "Understand MOSFET vs BJT trade-offs for power amplification and design H-bridge motor drivers with complementary PWM and deadtime control",
      "Apply feedback system stability analysis using Bode plots, phase margin, gain margin, and root locus to predict and prevent oscillation",
      "Design practical signal conditioning circuits for sensors (photodiodes, thermistors, strain gauges) including transimpedance amplifiers, instrumentation amplifiers, and ratiometric conversion",
      "Use SPICE simulation (LTspice, QSPICE) to validate frequency response, stability margins, and transient behavior before breadboarding"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=JLVGeyUeQrA - Basic Opamp Design: A Smattering of Opamps (19:50)",
        "https://www.youtube.com/watch?v=bIz65HUorNI - 5 Great Tips for Operational Amplifier Circuit Design (8:12)",
        "https://www.youtube.com/watch?v=HWD_aUWuKso - Op-amp Tutorial Series 4: The Integrator and The Differentiator (13:42)",
        "https://www.youtube.com/watch?v=d6670gSIbiM - Op-Amp Comparator Explained (14:18)",
        "https://www.youtube.com/watch?v=J93Yb2RFUqc - ECE Skills & Design - Lab 2: Operational Amplifiers (15:48)",
        "https://www.youtube.com/watch?v=gzb5Bw3Wusc - Essential & Practical Circuit Analysis: Part 2 - Op-Amps (41:47)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/ - MIT OpenCourseWare: Circuits and Electronics",
        "https://www.edx.org/learn/electronics/massachusetts-institute-of-technology-circuits-and-electronics-2-amplification-speed-and-delay - MITx: Circuits and Electronics 2",
        "https://www.ti.com/lit/pdf/sloa049 - Texas Instruments: Active Low-Pass Filter Design",
        "https://www.analog.com/media/en/technical-documentation/technical-articles/s54_en-circuits.pdf - Analog Devices: Transimpedance Amplifiers",
        "https://www.ti.com/lit/pdf/tidu535 - TI: 1 MHz Photodiode Amplifier Reference Design",
        "https://resources.pcb.cadence.com/blog/2021-interpreting-the-phase-in-a-bode-plot - Cadence PCB: Phase and Bode Plot",
        "https://www.allaboutcircuits.com/technical-articles/h-bridge-dc-motor-control-complementary-pulse-width-modulation-pwm-shoot-through - All About Circuits: H-bridge Motor Control",
        "https://www.electronics-tutorials.ws/opamp/ - Electronics Tutorials: Op-Amp Circuits",
        "https://www.instructables.com/Analog-Sensor-Signal-Conditioning-Circuit/ - Instructables: Sensor Signal Conditioning"
      ],
      "tools": [
        "LTspice (SPICE simulator with op-amp models)",
        "QSPICE (mixed-signal simulator)",
        "Falstad Circuit Simulator (browser-based)",
        "KiCad (with ngspice integration)",
        "MATLAB/Octave (Bode plot analysis)",
        "TI FilterPro (active filter design tool)",
        "Breadboard + op-amp ICs (LM741, LM358, TL072)",
        "Transistors (2N3904, 2N3906, IRF540, IRF9540)",
        "Oscilloscope (20MHz+)",
        "Multimeter + function generator + power supplies"
      ]
    }
  }
}
,
  {
  "id": "ee--115",
  "code": "EE 115",
  "name": "Electromagnetics and Applications",
  "fullName": "EE 115: Electromagnetics and Applications",
  "description": "Comprehensive study of electromagnetic fields and their applications in practical systems. Covers electrostatics, magnetostatics, electromagnetic induction, and Maxwell's equations with emphasis on designing and analyzing actuators, motors, sensors, and power conversion systems critical for robotic systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electromagnetics is the foundational physics enabling all motion and sensing in robotic systems. Embedded systems engineers must understand Ampere's Law to design BLDC motor coils, Faraday's Law to calculate transformer-based power supplies, Hall-effect physics to implement position feedback sensors, and Lorentz force principles to predict actuator torque. Mastery of magnetic circuits, permanent magnet interactions, and electromagnetic induction is essential for motor design optimization, actuator selection, wireless power transfer systems, and reliable sensor integration in autonomous robots and embedded platforms.",
    "realWorldApplications": [
      "Designing 3-phase BLDC motor stators with optimized winding patterns and understanding how rotor permanent magnets interact with induced stator magnetic fields to produce torque for drone propellers and robotic joint motors",
      "Analyzing Hall-effect sensor physics to implement sensorless BLDC motor commutation and absolute angle measurement for robotic arm joint feedback with 3D Hall sensors (e.g., TMAG5170 for 360° shaft position)",
      "Calculating magnetic circuit reluctance to design compact electromagnetic actuators (solenoids) for robotic grippers and pneumatic valve actuation in industrial pick-and-place systems",
      "Sizing transformer and inductor magnetic cores using Faraday's law and flux density analysis to create efficient power conversion systems that step down 48V batteries to 5V for robot microcontroller boards",
      "Predicting motor efficiency losses including eddy currents and hysteresis to select appropriate motor types (brushless vs. brushed) for battery-powered autonomous mobile robots",
      "Applying Lorentz force calculations to determine linear actuator force output based on coil current and magnetic field strength for robotic arm load handling specifications",
      "Designing wireless power transfer coils using mutual inductance between primary and secondary coils to charge embedded robot systems without physical contacts",
      "Using electromagnetic FEA software (JMAG) to optimize BLDC motor torque output and minimize cogging torque ripple for smooth robotic motion control"
    ],
    "learningOutcomes": [
      "Apply Gauss's Law to calculate electric fields and design capacitive proximity sensors for robot collision detection",
      "Use Ampere's Law to determine magnetic field distributions from current-carrying coils and design efficient motor windings",
      "Apply Faraday's Law of electromagnetic induction to transformers, inductors, and motors for power conversion analysis",
      "Calculate forces on current-carrying conductors in magnetic fields using the Lorentz force equation",
      "Understand and apply the Hall effect to design non-contact position and current sensing systems for motor feedback",
      "Analyze magnetic circuits using reluctance analogies analogous to electrical circuit analysis",
      "Design and optimize electromagnetic actuators (solenoids, linear motors) for specific force and displacement requirements",
      "Calculate induced EMF and currents due to changing magnetic flux in transformers and motor windings",
      "Understand permanent magnet properties, magnetization curves, and interactions with induced magnetic fields",
      "Apply Lenz's Law to predict directions of induced currents and understand eddy current effects in conductors",
      "Model hysteresis and core losses in magnetic materials for accurate power loss calculations",
      "Design efficient power supply transformers and filter inductors for embedded robot systems",
      "Analyze boundary conditions in electromagnetic field problems using Maxwell's equations",
      "Use electromagnetic simulation software to validate motor and actuator designs"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=xx8fH-r3Luk",
        "https://www.youtube.com/watch?v=lhtGJF7YFt8",
        "https://www.youtube.com/watch?v=goq1L1Pb424",
        "https://www.youtube.com/watch?v=yiD5nCfmbV0",
        "https://www.youtube.com/watch?v=OxJg8VJ-dBA",
        "https://www.youtube.com/watch?v=3HrLJfL70Bg",
        "https://www.youtube.com/watch?v=lhtGJF7YFt8"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/res-6-013-electromagnetics-and-applications-spring-2011/",
        "https://www.jmag-international.com/solutions/robotics/",
        "https://www.ti.com/lit/pdf/sbaa538",
        "https://www.qorvo.com/products/d/da010057",
        "https://www.boston-engineering.com/solutions/technical-innovation/robotics/robotics-electromechanical-capabilities/",
        "https://www.instructables.com/Complete-Motor-Guide-for-Robotics/",
        "https://developer.arm.com/documentation/dui0491/latest/"
      ],
      "tools": [
        "MATLAB/Simulink (electromagnetic field analysis, motor simulations)",
        "JMAG (Finite Element Analysis for motor and actuator design optimization)",
        "COMSOL (Multi-physics electromagnetic simulations)",
        "LTspice (Power converter and transformer circuit modeling)",
        "Python with NumPy/SciPy (Electromagnetic calculations and circuit analysis)",
        "Mathematica or Wolfram Language (Solving Laplace/Poisson equations)",
        "Hall-effect sensor datasheets and reference designs (TMAG5170, TMAG5273 from TI)"
      ]
    }
  }
}
,
  {
  "id": "ee-122",
  "code": "EE 122",
  "name": "Introduction to Control Systems",
  "fullName": "EE 122: Introduction to Control Systems",
  "description": "Foundational course in classical and modern control theory, covering feedback systems, transfer functions, Laplace transforms, PID controllers, and stability analysis. Students apply control principles to design autonomous robot navigation, motor speed/position control, and real-time sensor feedback systems essential for embedded systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Introduction to Control Systems is fundamental to Embedded Systems & Robotics Engineering because it bridges the gap between circuit design (EE 101, EE 111) and autonomous systems integration. Every robot requires closed-loop control: servos need position feedback, motors demand speed regulation, and autonomous platforms require trajectory tracking. This course teaches students to analyze system stability (prevent oscillation), design controllers that respond appropriately to disturbances (maintain setpoint despite friction or load changes), and predict transient behavior (overshoot, settling time) before hardware implementation. PID controllers alone power millions of devices—from robot arms in manufacturing to autonomous vehicles. Understanding transfer functions, Laplace transforms, and root locus design equips engineers to architect robust, predictable systems that perform reliably in dynamic environments.",
    "realWorldApplications": [
      "Robot arm joint position control: designing a PID servo controller to track desired angles from 0° to 180° with <5% overshoot, <2s settling time, and zero steady-state error despite friction and load variations",
      "Autonomous robot speed regulation: implementing feedback control to maintain constant velocity on mobile robots despite terrain changes, using wheel encoders as feedback sensors and PWM motor commands as control outputs",
      "Temperature stabilization in incubators/coolers: designing a proportional-integral (PI) controller to regulate heated platform temperature ±0.5°C despite external disturbances (ambient temperature swings, heater thermal lag)",
      "Quadcopter attitude stabilization: using nested PID loops (inner rate control, outer attitude control) to maintain desired roll/pitch angles with fast response times (~100Hz loop frequency) and minimal oscillation",
      "Robotic gripper force control: implementing force feedback control using strain gauges to grip objects with constant force (2-5N) regardless of object size/shape, preventing breakage of delicate components"
    ],
    "learningOutcomes": [
      "Understand the fundamentals of open-loop vs. closed-loop control systems, including advantages (robustness, disturbance rejection) and disadvantages (steady-state error, oscillation) of feedback",
      "Master Laplace transform theory and application to convert differential equations into transfer functions G(s) = Y(s)/U(s), enabling frequency domain analysis",
      "Analyze system response using transfer functions: compute steady-state error, transient response (rise time, overshoot, settling time), and stability from poles/zeros",
      "Design and tune proportional (P), proportional-integral (PI), and proportional-integral-derivative (PID) controllers, understanding the role of each term (error, integral of error, rate of change of error)",
      "Use root locus diagrams to visualize closed-loop pole movement as controller gain varies, enabling pole placement design for desired transient response",
      "Analyze stability using Bode plots, phase margin, gain margin, and Nyquist criterion to predict instability and oscillation before implementation",
      "Convert between transfer function and state-space representations (A,B,C,D matrices) for different system types and applications",
      "Design lead/lag compensators to shift closed-loop pole locations and improve system performance (faster rise time, reduced overshoot)",
      "Simulate control systems in MATLAB/Simulink and LTspice, validating controller performance before hardware implementation"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=fv6dLTEvl74 - PID Controller Explained (8:33)",
        "https://www.youtube.com/watch?v=osd7jbJpGLA - PID Control Explained: The Ultimate Guide (41:21)",
        "https://www.youtube.com/watch?v=_VzHpLjKeZ8 - Introduction to PID Control (49:17)",
        "https://www.youtube.com/watch?v=RZW1PsfgVEI - Arduino PID Controller - From Scratch! (13:58)",
        "https://www.youtube.com/watch?v=WkKZ5311YYI - Control System Design with MATLAB and Simulink (1:03:17)",
        "https://www.youtube.com/watch?v=ToEFkUxFURg - Introduction and Basic Concepts (MIT Electronic Feedback Systems) (32:50)"
      ],
      "websites": [
        "https://openlearninglibrary.mit.edu/courses/course-v1:MITx+16.00x+2T2019 - MIT Open Learning Library: Introduction to Control Theory",
        "https://pressbooks.library.torontomu.ca/controlsystems/ - Introduction to Control Systems (Open Textbook)",
        "https://opentext.ku.edu/controlsystems/ - Control Systems (Open Textbook)",
        "https://eng.libretexts.org/Courses/California_State_Polytechnic_University_Humboldt/Measurements_Instrumentation_and_Controls - Engineering LibreTexts: Measurements & Controls",
        "https://www.mathworks.com/products/simcontrol.html - MATLAB Simulink Control Design",
        "https://ctms.engin.umich.edu/CTMS/ - Control Tutorials for MATLAB and Simulink",
        "https://learn.sparkfun.com/tutorials/basic-servo-control-for-beginners/all - SparkFun: Basic Servo Control for Beginners",
        "https://docs.wpilib.org/en/stable/docs/software/advanced-controls/state-space/ - WPILib State-Space Control"
      ],
      "tools": [
        "MATLAB + Simulink Control Design Toolbox",
        "Simulink (block-diagram modeling)",
        "MATLAB Control System Toolbox",
        "Python with control library",
        "LTspice (circuit simulation with transfer function modeling)",
        "LabVIEW (industrial control systems)",
        "Arduino IDE + PID library",
        "ROS (Robot Operating System)",
        "Octave (free MATLAB alternative)",
        "Scilab (free open-source alternative)"
      ]
    }
  }
}
,
  {
  "id": "ee--140",
  "code": "EE 140",
  "name": "Computer and Microcontroller Architecture",
  "fullName": "EE 140: Computer and Microcontroller Architecture",
  "description": "Comprehensive study of microcontroller and embedded processor architecture focusing on ARM Cortex-M design, instruction sets, memory hierarchies, interrupt handling, and real-time performance. Covers system-on-chip (SoC) organization, RISC processor design principles, and practical embedded systems design for robotics and real-time control applications.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Microcontroller architecture is the computational foundation of all embedded robotics systems. Embedded systems engineers must understand ARM Cortex-M processor cores to write efficient, real-time firmware for motor control, sensor fusion, and autonomous decision-making. Knowledge of the Nested Vectored Interrupt Controller (NVIC) enables deterministic interrupt handling critical for safety-critical operations like emergency motor shutdown. Understanding memory hierarchy, task scheduling, and context switching allows engineers to optimize limited resource constrained environments (typical in battery-powered mobile robots). Mastery of processor modes, peripheral interfaces, and power management techniques enables the design of responsive, energy-efficient robots capable of extended autonomous operation.",
    "realWorldApplications": [
      "Implementing real-time BLDC motor commutation control on STM32H7 (Cortex-M7, 550 MHz) using NVIC-prioritized timer interrupts and PWM peripherals for quadcopter propeller speed regulation",
      "Designing multi-threaded autonomous robot control using FreeRTOS task scheduling on STM32F7, with priority-based preemption ensuring motor control tasks preempt lower-priority navigation planning",
      "Configuring Memory Protection Unit (MPU) to isolate safety-critical motor driver firmware from third-party vendor libraries in collaborative industrial robotic arms",
      "Implementing interrupt-driven sensor fusion algorithms that read accelerometer/gyro data via SPI interrupts on Cortex-M4 while executing 200 Hz PID control loop deterministically",
      "Optimizing power consumption in battery-powered mobile robots by leveraging Cortex-M sleep modes and event-driven interrupt architecture to achieve 40+ hour runtime on a single charge",
      "Designing hybrid robot architecture: STM32H7 (Cortex-M7) handles real-time motor control with microsecond precision while nRF52840 (Cortex-M4 + Bluetooth) manages wireless communication without timing interference",
      "Debugging hard-to-reproduce robot failures using SEGGER SystemView to visualize task scheduling, interrupt latency, and timing violations across multiple concurrent control loops",
      "Implementing sensorless BLDC motor control using Cortex-M DSP extensions (SIMD operations) to process back-EMF signals for commutation without Hall-effect sensors, reducing hardware cost"
    ],
    "learningOutcomes": [
      "Understand ARM Cortex-M processor architecture variants (M0/M0+/M3/M4/M7/M23/M33) and select appropriate microcontroller based on robotics application requirements",
      "Analyze RISC instruction set design principles and Thumb-2 instruction encoding for code density and performance optimization",
      "Design interrupt service routines leveraging NVIC nested prioritization for deterministic real-time response to sensor and timing events",
      "Implement memory hierarchy optimization (registers, SRAM, Flash) to maximize performance within embedded system constraints",
      "Apply context switching and processor mode concepts (thread vs. handler, privileged vs. unprivileged) for RTOS task isolation and security",
      "Configure memory protection and TrustZone security features to partition firmware and prevent unauthorized access in multi-vendor robot systems",
      "Calculate interrupt latency budgets and design systems meeting real-time constraints (millisecond and microsecond deadlines) for robotic control",
      "Interface and configure microcontroller peripherals (timers, ADC, DAC, PWM, UART, SPI, I2C) for sensor acquisition and actuator control",
      "Implement task scheduling algorithms (priority-based preemption, round-robin) and understand FreeRTOS deployment on ARM Cortex-M",
      "Analyze processor performance metrics (clock cycles per instruction, pipeline depth, branch prediction) to optimize critical robot control loops",
      "Design low-power embedded systems using sleep modes, clock gating, and interrupt-driven wake-up for extended battery life",
      "Debug embedded systems using hardware debuggers (J-Link, ST-Link) and SEGGER tools to identify timing violations and performance issues",
      "Understand bus architectures (AHB, APB, SPI) and memory-mapped I/O for efficient communication between processor and peripherals"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=rDvLaOe5_Ws",
        "https://www.youtube.com/watch?v=PEpFP3linS4",
        "https://www.youtube.com/watch?v=HJNWbRe0BQ4",
        "https://www.youtube.com/watch?v=f7ZsqRosELk",
        "https://www.youtube.com/watch?v=qZIzjzWaRrI",
        "https://www.youtube.com/watch?v=115F-2E1aJ8",
        "https://www.youtube.com/watch?v=rDvLaOe5_Ws"
      ],
      "websites": [
        "https://developer.arm.com/Architectures/M-Profile%20Architecture",
        "https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html",
        "https://www.stm32h7.com/",
        "https://copperhilltech.com/stm32-freertos-complete-guide/",
        "https://www.freertos.org/",
        "https://ptolemy.berkeley.edu/projects/chess/eecs149/lectures/",
        "https://users.ece.utexas.edu/~valvano/Volume1/E-Book/C12_Interrupts.htm"
      ],
      "tools": [
        "STM32CubeIDE (integrated development environment)",
        "STM32CubeMX (peripheral configuration tool)",
        "ARM Keil MDK (professional embedded development kit)",
        "SEGGER J-Link (hardware debugger)",
        "SEGGER Ozone (debugger and profiler)",
        "SEGGER SystemView (real-time system analyzer)",
        "GDB with ARM support (open-source debugger)",
        "FreeRTOS kernel with STM32 support",
        "GNU Arm Embedded Toolchain (compiler/linker)"
      ]
    }
  }
}
,
  {
  "id": "ee-180",
  "code": "EE 180",
  "name": "Autonomous Vehicles",
  "fullName": "EE 180: Autonomous Vehicles",
  "description": "Comprehensive course integrating embedded systems, control theory, computer vision, and sensor fusion to design complete autonomous navigation systems. Students develop self-driving algorithms from perception to planning and control, learning SLAM (Simultaneous Localization and Mapping), path planning, object detection, and multi-sensor fusion—essential for autonomous mobile robots and vehicles.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Autonomous Vehicles is the capstone integration course for Embedded Systems & Robotics Engineering, synthesizing knowledge from circuits (EE 101/111), controls (EE 122), microcontrollers (EE 150), and signal processing into complete autonomous systems. This course bridges theory and practice: students learn to perceive the environment (LiDAR, cameras, radar), estimate position (SLAM, odometry, GPS fusion), plan trajectories (Dijkstra, A*, RRT), and execute control commands (PID, MPC) in real-time on embedded platforms. Autonomous vehicles are among the most complex engineering challenges—Tesla, Waymo, Uber, and leading tech companies compete on these capabilities. This course provides the algorithmic foundation and practical experience needed to contribute to autonomous systems across applications: mobile manipulation, autonomous delivery, self-driving cars, aerial vehicles, and marine robotics. Understanding the full autonomy stack—from hardware sensors to high-level decision-making—is critical for engineers entering this rapidly growing field.",
    "realWorldApplications": [
      "Self-driving car perception and localization: implementing multi-sensor fusion (camera + LiDAR + radar) with SLAM algorithms (EKF-SLAM, GraphSLAM, LOAM) to build occupancy grids, detect lane boundaries, and localize with ±10cm accuracy on GPS-denied roads",
      "Mobile robot path planning for warehouse automation: implementing Dijkstra and A* algorithms to compute collision-free paths on occupancy grids, with dynamic re-planning when obstacles appear, enabling autonomous forklifts and shelf-scanning robots",
      "Autonomous delivery drone navigation: integrating IMU + barometer + LiDAR for altitude control (PID loops), computer vision for object avoidance, and GPS for global waypoint navigation, enabling autonomous delivery in urban environments",
      "Real-time object detection and tracking: deploying deep learning models (YOLO, Faster R-CNN) on edge hardware (NVIDIA Jetson) to detect pedestrians, vehicles, traffic signs with <100ms latency, enabling safety-critical decision-making",
      "Cooperative multi-robot systems: coordinating fleets of autonomous vehicles using ROS, message passing, and decentralized path planning to solve warehouse layout problems, convoy navigation, and collaborative manipulation"
    ],
    "learningOutcomes": [
      "Understand the autonomous vehicle architecture stack: perception → state estimation → planning → control → execution, and how each layer integrates with real-time constraints",
      "Implement and debug SLAM algorithms (EKF-SLAM, GraphSLAM) to simultaneously build occupancy maps and localize in GPS-denied environments using LiDAR point clouds and camera imagery",
      "Design and optimize path planning algorithms (Dijkstra, A*, RRT, D*) with collision checking on occupancy grids and dynamic environments with moving obstacles",
      "Develop perception pipelines: object detection (YOLO, Faster R-CNN) and semantic segmentation for pedestrian/vehicle/road detection; perform multi-sensor fusion (camera + LiDAR + radar) for robust detection under adverse weather",
      "Implement multi-sensor state estimation: extended Kalman filters (EKF) for GPS/IMU/odometry fusion; particle filters (Monte Carlo localization) for kidnapped robot problem",
      "Design trajectory tracking controllers: PID for simple tasks, model predictive control (MPC) for constrained optimization, and lateral/longitudinal control for vehicle dynamics",
      "Implement autonomous navigation stacks using ROS (Robot Operating System): sensor interfaces, SLAM nodes, move_base planning, control interfaces, debugging with rviz visualization",
      "Work with real autonomous vehicle datasets and simulators: CARLA (open-source driving simulator), KITTI (real-world autonomous driving dataset), and scaled platforms (RACECAR, Duckietown)",
      "Design safety-critical systems: fail-safe operation, sensor redundancy, testing methodologies, and regulatory compliance (SAE autonomy levels, automotive functional safety ISO 26262)"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=OgBpNg528T8 - From Zero to Self-Driving: Your First Step into Autonomous Vehicle (1:06:25)",
        "https://www.youtube.com/watch?v=jbimBoI42AM - Learn ROS for Self-Driving Cars - Full Course (58:06)",
        "https://www.youtube.com/watch?v=n9yU7u55zGg - Autonomous Rover From Scratch (ROS) Part 2 (17:18)",
        "https://www.youtube.com/watch?v=ZY9VDxMtleI - Stanford Seminar: Autonomous Driving (1:20:05)",
        "https://www.youtube.com/watch?v=VvoKJ6xvssQ - Stanford EE259 Principles of Sensing for Autonomy I (1+ hours)",
        "https://www.youtube.com/watch?v=N5ts_HdOLMU - Challenges in AI Safety: Autonomous Driving Perspective (1:00:06)"
      ],
      "websites": [
        "https://racecar.mit.edu - MIT RACECAR Neo (Beaver Works)",
        "https://www.mathworks.com/discovery/slam.html - MATLAB: What Is SLAM",
        "https://slab.sites.ucsc.edu/ros/ - Introduction to Autonomous Vehicles & ROS (UCSC)",
        "https://www.theconstruct.ai/start-self-driving-cars-using-ros/ - How to Start with Self-Driving Cars Using ROS",
        "https://www.theconstruct.ai/robotigniteacademy_learnros/ros-courses-library/path-planning-basics/ - Path Planning Basics",
        "https://fab.cba.mit.edu/classes/865.21/topics/path_planning/robotic.html - MIT Fab Lab: Robotic Path Planning",
        "https://bwsi.mit.edu/bwsi-programs-2/autonomous_racecar/ - MIT Beaver Works: Autonomous RACECAR",
        "https://learn.bwsix.edly.io/course/autonomous-air-vehicle-racing-2024/ - MIT Beaver Works: Autonomous Air Vehicle Racing",
        "https://www.udacity.com/course/self-driving-car-engineer-nanodegree - Udacity Self-Driving Car Engineer Nanodegree",
        "https://www.ri.cmu.edu/project/lidar-and-vision-sensor-fusion-for-autonomous-vehicle-navigation/ - CMU: LiDAR and Vision Sensor Fusion"
      ],
      "tools": [
        "ROS (Robot Operating System)",
        "CARLA Simulator",
        "MATLAB Simulink Driving Scenario Designer",
        "OpenCV",
        "YOLO (object detection)",
        "PCL (Point Cloud Library)",
        "Kalman Filters (scipy.signal, filterpy)",
        "MoveIt! and nav2 stack (ROS 2)",
        "SLAM Software (LOAM, ORB-SLAM2, Cartographer)",
        "Deep Learning (PyTorch, TensorFlow)"
      ]
    }
  }
}
,
  {
  "id": "engr--140",
  "code": "ENGR 140",
  "name": "Introduction to Object Oriented Programming",
  "fullName": "ENGR 140: Introduction to Object Oriented Programming",
  "description": "Comprehensive introduction to object-oriented programming principles and design patterns. Covers classes, objects, encapsulation, inheritance, polymorphism, and abstraction with emphasis on C++ implementation for embedded systems. Students learn to structure complex robotics systems using design patterns and create modular, reusable code for real-time robot control applications.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Object-oriented programming is the foundational software architecture paradigm for modern robotics and embedded systems. Embedded systems engineers must understand encapsulation to create clean abstractions between hardware drivers and control algorithms, inheritance to build generic motor/sensor interfaces applicable across different hardware platforms, and polymorphism to write hardware-agnostic firmware. Design patterns like Factory and Observer enable scalable autonomous systems. Mastery of OOP enables developers to transition from single-file embedded firmware to modular, maintainable robot control architectures. Robot Operating System 2 (ROS2), the industry-standard robotics middleware, is built entirely on OOP principles—nodes are classes, topics/services are polymorphic interfaces, and packages are inheritance hierarchies. OOP knowledge is essential for professional robotics software development in both academic and industrial contexts.",
    "realWorldApplications": [
      "Designing abstract Motor class hierarchy with BLDC, DC, and servo motor derived classes, allowing robotic arm firmware to switch motor types without changing high-level control code",
      "Creating sensor abstraction layers (abstract IMU, Camera, LIDAR classes) enabling plug-and-play sensor compatibility across different robot platforms and hardware revisions",
      "Implementing ROS2 node architecture for autonomous vehicle navigation, where each node (perception, planning, control) is an OOP class inheriting from rclcpp::Node base class",
      "Using Factory pattern to instantiate motor controllers (BlueRobotics, Maxon, Faulhaber motors) based on configuration files, avoiding deep if-else chains and improving maintainability",
      "Applying Observer pattern for event-driven sensor reading where obstacle detection sensors notify emergency stop observers, ensuring safety-critical interrupt handling",
      "Building multi-robot systems using composition where Robot class contains Motor, Sensor, and Actuator component objects, each with well-defined interfaces for distributed control",
      "Implementing FreeRTOS task classes that inherit from base Task class, allowing priority-based preemption and deterministic scheduling of motor control, sensor fusion, and navigation tasks",
      "Creating hardware abstraction layer (HAL) using abstract UART, SPI, I2C peripheral classes that encapsulate STM32 register operations, enabling code reuse across microcontroller variants"
    ],
    "learningOutcomes": [
      "Design and implement well-structured classes with appropriate data members and member functions for robot system components",
      "Apply encapsulation principles using public/private/protected access specifiers to protect internal state and enforce controlled access",
      "Create inheritance hierarchies representing 'is-a' relationships (e.g., ServoMotor 'is-a' Motor) to organize code and enable reuse",
      "Implement polymorphism through virtual functions to write code that works with multiple derived types through base class pointers/references",
      "Distinguish between compile-time (overloading) and runtime (overriding) polymorphism and apply each appropriately",
      "Use abstraction to hide complex implementation details behind simple interfaces suitable for embedded systems",
      "Implement common design patterns (Singleton, Factory, Observer) for robotics-specific problems",
      "Apply composition and aggregation to build complex systems from simpler, independently testable components",
      "Design abstract base classes that define interfaces for interchangeable components (motors, sensors, actuators)",
      "Create thread-safe Singleton objects for managing shared resources in multi-threaded real-time systems",
      "Implement Factory patterns to support runtime object creation based on configuration or type parameters",
      "Use Observer pattern to implement event-driven architectures for sensor reading and autonomous behavior triggering",
      "Refactor procedural firmware into object-oriented architectures improving code organization and maintainability",
      "Apply SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) to robotics software",
      "Understand zero-cost abstraction concepts to ensure OOP constructs don't compromise real-time performance",
      "Debug polymorphic C++ code using virtual tables and understand virtual function dispatch overhead"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=TKrjt4D0g-A",
        "https://www.youtube.com/watch?v=VFvlwlxIU1o",
        "https://www.youtube.com/watch?v=0NwsayeOsd4",
        "https://www.youtube.com/watch?v=xQ00B9tz0UY",
        "https://www.youtube.com/watch?v=-W-TYjL0aFE",
        "https://www.youtube.com/watch?v=7gz98K_hCEM",
        "https://www.youtube.com/watch?v=151IZqTcKlA"
      ],
      "websites": [
        "https://www.geeksforgeeks.org/java/object-oriented-programming-oops-concept-in-java/",
        "https://refactoring.guru/design-patterns",
        "https://learnopencv.com/robot-operating-system-introduction/",
        "https://docs.ros.org/en/rolling/Concepts.html",
        "https://www.embedded.com/mastering-motor-control-implementation-in-c/",
        "https://automaticaddison.com/how-to-implement-advanced-object-oriented-programming-in-c/",
        "https://www.roboticsacademy.org/"
      ],
      "tools": [
        "Visual Studio Code (lightweight editor for embedded C++)",
        "CLion (JetBrains C++ IDE with robotics plugins)",
        "Qt Creator (cross-platform OOP development)",
        "STM32CubeIDE (embedded OOP with microcontroller libraries)",
        "CMake (build system for OOP C++ projects)",
        "Valgrind (memory profiling for OOP code)",
        "GDB with debugging visualizers (inspect virtual function calls)",
        "UML diagramming tools (Lucidchart, PlantUML for class hierarchies)"
      ]
    }
  }
}
,
  {
  "id": "engr-145",
  "code": "ENGR 145",
  "name": "Machine Learning for Engineers",
  "fullName": "ENGR 145: Machine Learning for Engineers",
  "description": "Practical machine learning course emphasizing real-world engineering applications with focus on supervised learning, deep learning, computer vision, and deployment on embedded systems. Students apply scikit-learn, TensorFlow, and PyTorch to robotics perception, sensor data analysis, and edge AI—bridging traditional ML theory with production-ready implementations on constrained hardware.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Machine Learning for Engineers is critical for Embedded Systems & Robotics Engineering because most modern autonomous systems rely on ML for perception, decision-making, and adaptation. This course distinguishes itself from pure computer science ML programs by emphasizing practical engineering constraints: models must fit in kilobytes of RAM (not gigabytes), run inference in milliseconds (not seconds), and operate on real sensor data with noise and calibration errors. Engineers must understand both algorithmic foundations (linear regression, neural networks, training procedures) and practical deployment techniques (quantization, pruning, TensorFlow Lite, Edge Impulse) to translate research models into production-ready systems. Real robotics applications demand this expertise: object detection on NVIDIA Jetson for autonomous vehicles, gesture recognition on microcontrollers for smart devices, predictive maintenance on IoT sensors, and adaptive control policies trained through reinforcement learning. This course equips engineers with end-to-end ML capability—from problem formulation and data collection through model training, optimization, and embedded deployment.",
    "realWorldApplications": [
      "Autonomous vehicle perception pipeline: training YOLO object detector on KITTI dataset, quantizing to INT8 precision (4x memory reduction), deploying to NVIDIA Jetson Orin for <50ms real-time object detection (pedestrians, vehicles, signs) at 30 fps; achieving 92% mAP accuracy with <2W power consumption",
      "Predictive maintenance for industrial robotics: collecting accelerometer and temperature time-series data from actuators, training LSTM neural network to detect anomalies 24 hours before component failure, deploying on edge device for autonomous triggering of preventive maintenance alerts",
      "Gesture recognition for hand-controlled robots: capturing accelerometer/gyroscope data from wearable IMU, training 1D CNN classifier on ESP32 microcontroller (pruned to <500KB model), achieving 95% accuracy with <10ms inference latency enabling real-time gesture-based robot control",
      "Robotic grasping with CNN-based object recognition: training deep learning model to classify graspable objects, deploying pruned network on robot gripper embedded system, enabling autonomous bin picking in warehouses with 94% success rate on novel objects",
      "Adaptive drone navigation: training policy gradient (reinforcement learning) model in CARLA simulator, distilling to student network for Jetson Nano deployment, enabling autonomous obstacle avoidance and dynamic path replanning in GPS-denied environments"
    ],
    "learningOutcomes": [
      "Understand core ML concepts: supervised learning (regression, classification), unsupervised learning (clustering, dimensionality reduction), and the bias-variance tradeoff; recognize when and why to apply different algorithms",
      "Implement end-to-end ML pipelines: data acquisition and labeling, exploratory data analysis (EDA), feature engineering, train/validation/test splitting, model training, hyperparameter tuning, and evaluation metrics (accuracy, precision, recall, F1, confusion matrix, ROC-AUC)",
      "Build and train neural networks from scratch: understand backpropagation, gradient descent, activation functions (ReLU, sigmoid, softmax); implement feedforward networks, convolutional neural networks (CNNs) for image classification, and recurrent networks (LSTM) for time series",
      "Apply transfer learning and pre-trained models: fine-tune ResNet/MobileNet for custom image classification tasks with limited labeled data, dramatically reducing training time and data requirements",
      "Develop computer vision pipelines: image preprocessing (normalization, augmentation), object detection (YOLO, Faster R-CNN), semantic segmentation, and multi-object tracking for robotics perception",
      "Deploy ML models on embedded systems: understand model optimization techniques (pruning, quantization, knowledge distillation); convert TensorFlow models to TensorFlow Lite; deploy on microcontrollers (Arduino, STM32), single-board computers (Raspberry Pi), and edge accelerators (NVIDIA Jetson)",
      "Work with TinyML frameworks: use Edge Impulse for visual, motion, and audio classification on resource-constrained microcontrollers with <100KB RAM",
      "Implement reinforcement learning basics: understand Q-learning, policy gradients, and reward shaping for adaptive robot control",
      "Debug ML systems: identify overfitting vs. underfitting, analyze failure modes, collect appropriate datasets, and iterate on model architecture—all practical skills for production systems"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=jGwO_UgTS7I - Stanford CS229: Machine Learning Course, Lecture 1 by Andrew Ng (1:09:09)",
        "https://www.youtube.com/watch?v=Bl4Feh_Mjvo - Stanford CS229 Machine Learning: Introduction 2022, Lecture 1 (1:08:30)",
        "https://www.youtube.com/watch?v=8SF_h3xF3cE - Practical Deep Learning for Coders: Lesson 1 - Fast.ai (1:26:45)",
        "https://www.youtube.com/watch?v=QRs619bWAow - TensorFlow Models Accelerated for NVIDIA Jetson (56:23)",
        "https://www.youtube.com/watch?v=9vM4p9NN0Ts - Stanford CS229: Building Large Language Models (1:44:31)",
        "https://www.youtube.com/watch?v=Thg_EK9xxVk - Introduction to Embedded Machine Learning 1.2.1 (15:23)"
      ],
      "websites": [
        "https://see.stanford.edu/course/cs229 - Stanford CS229: Machine Learning (Online Lectures)",
        "https://www.coursera.org/specializations/machine-learning-introduction - Machine Learning Specialization by Andrew Ng",
        "https://www.coursera.org/specializations/deep-learning - Deep Learning Specialization by Andrew Ng",
        "https://course.fast.ai - Practical Deep Learning for Coders (Fast.ai)",
        "https://cs229.stanford.edu - CS229: Machine Learning (Current Course Page)",
        "https://docs.edgeimpulse.com/tutorials/end-to-end/overview - Edge Impulse: End-to-End Tutorials",
        "https://www.coursera.org/learn/introduction-to-embedded-machine-learning - Introduction to Embedded Machine Learning",
        "https://learn.arm.com/learning-paths/embedded-and-microcontrollers/edge/software-edge-impulse/ - ARM: Train and Deploy TinyML Audio Classifier",
        "https://developer.nvidia.com/embedded/learn/jetson-ai-education - NVIDIA Jetson for AI Education",
        "https://sebastianraschka.com/blog/2022/ml-pytorch-book.html - Machine Learning with PyTorch and Scikit-Learn"
      ],
      "tools": [
        "Scikit-learn",
        "TensorFlow 2.x + Keras",
        "PyTorch",
        "FastAI",
        "TensorFlow Lite (LiteRT)",
        "Edge Impulse",
        "OpenCV",
        "NVIDIA TensorRT",
        "YOLO (You Only Look Once)",
        "CARLA Simulator"
      ]
    }
  }
}
,
];

export const tier2Courses: TierCourse[] = [
  {
  "id": "ee--105",
  "code": "EE 105",
  "name": "Semiconductor Devices",
  "fullName": "EE 105: Semiconductor Devices",
  "description": "Comprehensive study of semiconductor physics and device operation covering PN junctions, diodes, BJTs, and MOSFETs. Focuses on device characteristics, operating principles, and practical applications in power electronics and motor drivers. Students learn to select and design with semiconductor devices for robotics and embedded systems applications.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Semiconductor device selection and thermal management directly determines motor control efficiency and reliability in robotics systems. Embedded systems engineers must understand MOSFET vs. BJT trade-offs to design optimal H-bridge motor drivers for different power levels—fast MOSFETs with simple gate drive for small drones, IGBTs with complex gate drivers for industrial robot arms. Deep knowledge of device physics (RDS(on), gate charge, thermal resistance) enables engineers to calculate power dissipation, specify adequate heatsinking, and prevent thermal runaway during sustained robot operation. Understanding PN junction physics, forward/reverse bias behavior, and diode protection circuits is essential for robust motor driver design that survives back-EMF transients and fault conditions. Mastery of semiconductor device datasheets and Safe Operating Area (SOA) specifications prevents catastrophic motor driver failures in deployed autonomous systems.",
    "realWorldApplications": [
      "Selecting SI2300 N-channel MOSFETs for unidirectional drone motor drivers supporting PWM frequencies up to 100 kHz for efficient speed control with minimal gate drive complexity",
      "Designing H-bridge bidirectional motor driver for robot wheels using IRFZ22N MOSFETs with IR2101 gate driver IC, calculating RDS(on) losses and thermal requirements for 20A continuous motor current",
      "Calculating MOSFET power dissipation (conduction + switching losses) and selecting appropriate heatsink for industrial robot arm joint driver sustaining 50A at 48V for extended autonomous operation without thermal shutdown",
      "Selecting IGBTs over MOSFETs for high-voltage (100V+) industrial collaborative robot power stage due to superior high-current capabilities and lower on-state voltage drop despite higher switching losses",
      "Designing protection diode clamp circuits (1N4148 fast switching diodes) across motor terminals to handle back-EMF transients during motor deceleration, preventing MOSFET gate-source overstress",
      "Implementing thermal management strategy with copper PCB area under MOSFETs and external heatsinks with thermal paste to maintain junction temperature below 150°C during continuous robot operation",
      "Analyzing BJT motor driver circuits in legacy robotics projects and calculating required base current drive from microcontroller GPIO pins to achieve saturation region operation",
      "Using LTSpice circuit simulation to model H-bridge MOSFET driver behavior including parasitic inductances, gate drive timing, and dead-time delays to prevent destructive shoot-through current"
    ],
    "learningOutcomes": [
      "Understand PN junction formation, doping mechanisms, and equilibrium built-in potential from first principles",
      "Analyze forward and reverse bias PN junction behavior and predict current-voltage characteristics",
      "Design and select diodes for motor driver protection circuits (freewheeling, clamping, rectification)",
      "Explain BJT operation including three regions (active, saturation, cutoff) and current amplification mechanism",
      "Calculate BJT base current requirements and design BJT motor driver circuits with appropriate base resistors",
      "Understand MOSFET operation including threshold voltage, channel formation, and drain current control",
      "Compare BJT versus MOSFET characteristics and select optimal device based on application requirements (speed, current, complexity)",
      "Calculate MOSFET conduction losses (I²×RDS(on)) and switching losses for thermal design",
      "Design proper gate drive circuits for MOSFETs including gate charge, rise/fall time, and bootstrap capacitor sizing",
      "Analyze H-bridge motor driver operation and predict output voltage/current behavior for different control signals",
      "Design thermal management including heatsink selection, thermal resistance calculations, and junction temperature verification",
      "Understand IGBT operation, hybrid BJT/MOSFET characteristics, and select IGBT for high-voltage/high-current applications",
      "Apply manufacturer datasheets to identify absolute maximum ratings, Safe Operating Area, and thermal specifications",
      "Use SPICE simulation tools (LTSpice) to model semiconductor device behavior in motor driver circuits"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=57uTCtSQV50",
        "https://www.youtube.com/watch?v=BHA4teZmwT0",
        "https://www.youtube.com/watch?v=J4oO7PT_nzQ",
        "https://www.youtube.com/watch?v=l0ggf_FcEK0",
        "https://www.youtube.com/watch?v=VlMdSCI29A0",
        "https://www.youtube.com/watch?v=RZIfzPwglOo",
        "https://www.youtube.com/watch?v=AcxDiesy-nI"
      ],
      "websites": [
        "https://people.eecs.berkeley.edu/~boser/courses/105/index.html",
        "https://hkn.eecs.berkeley.edu/courseguides/EE/105",
        "https://www.mouser.com/applications/industrial-motor-control-mosfets/",
        "https://www.allaboutcircuits.com/technical-articles/a-review-on-power-semiconductor-devices/",
        "https://www.electronics-tutorials.ws/io/h-bridge-circuit.html",
        "https://circuitdigest.com/electronic-circuits/simple-h-bridge-motor-driver-circuit-using-mosfet",
        "https://semiengineering.com/knowledge_centers/integrated-circuit/ic-types/power-semiconductors-power-ic/"
      ],
      "tools": [
        "LTSpice (circuit simulation, SPICE models from manufacturers)",
        "Texas Instruments WEBENCH (motor driver design tool)",
        "Manufacturer datasheets (TI, ON Semiconductor, STMicroelectronics, Infineon)",
        "Heatsink calculator software",
        "MATLAB/Python for thermal and power analysis",
        "PCB design tools (KiCad, Altium) for thermal layout design",
        "Thermal imaging camera for verification",
        "Oscilloscope for gate drive waveform verification"
      ]
    }
  }
}
,
  {
  "id": "ee-130",
  "code": "EE 130",
  "name": "Electrical Machines",
  "fullName": "EE 130: Electrical Machines",
  "description": "Advanced course in electromechanical energy conversion covering transformer theory, DC machines (generators and motors), induction machines (AC motors), synchronous machines, and specialized machine types (stepper motors, brushless DC motors). Students analyze motor efficiency, losses, thermal management, and design practical motor control systems for robotics applications including speed/torque regulation and multi-phase commutation.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electrical Machines is critical for Embedded Systems & Robotics Engineering because virtually every robot requires electric motors for locomotion and actuation. This Tier 2 course builds on circuits (EE 101/111) and control theory (EE 122) to teach students how to select, size, control, and troubleshoot electric machines in embedded systems. Unlike pure motor datasheet lookup, engineers need to understand the physics of torque production, efficiency tradeoffs, thermal limits, and commutation algorithms to design reliable robots. Motor selection directly impacts performance: a BLDC motor with Field-Oriented Control (FOC) can provide 40% higher efficiency than brushed DC alternatives; proper thermal management enables 2-3x higher power density; understanding slip and torque curves prevents catastrophic motor stalling during high-load operations. This course covers the full spectrum of machine types deployed in robotics: DC brushed (simple, low-cost, poor efficiency), stepper (precise positioning, high holding torque, poor dynamic response), induction (robust, efficient at high speeds, requires complex VFD), BLDC (high efficiency, compact, requires electronic commutation), and synchronous reluctance (emerging technology, minimum rare-earth content). Engineers who understand motor physics can optimize robot designs, reduce power consumption by 20-40%, improve responsiveness, and contribute to advanced motor control algorithms.",
    "realWorldApplications": [
      "Robot arm joint actuators: selecting and sizing BLDC motors (with planetary gearbox) to achieve 100+ Nm holding torque with <5% efficiency loss, implementing FOC commutation for smooth motion, calculating thermal dissipation during continuous 8-hour factory shifts with 40°C ambient temperature",
      "Mobile robot drivetrain design: selecting DC brushed or BLDC motors for 2-4 wheel platforms, implementing closed-loop speed control via encoder feedback and PWM, sizing battery capacity based on motor efficiency maps and continuous/peak torque requirements for autonomous navigation",
      "Stepper motor precision positioning: designing stepper drive circuits with microstepping (1/16 or finer) for CNC gantries and robotic pick-and-place systems, tuning acceleration profiles to prevent mid-step stall while maintaining positioning accuracy ±0.1mm",
      "Induction motor industrial robotics: deploying three-phase induction motors for heavy-load applications (press arms, material handlers), tuning Variable Frequency Drive (VFD) parameters for smooth acceleration, soft-start, and energy recovery during regenerative braking",
      "Thermal management for high-power robots: calculating motor I²R copper losses and core iron losses, designing cooling strategies (passive convection, forced-air fans, liquid cooling for >10kW motors), predicting steady-state temperature rise to prevent demagnetization of permanent magnets"
    ],
    "learningOutcomes": [
      "Master fundamental electromechanical concepts: Faraday's law of induction, Lorentz force, Ampère's law, and their application to rotating machines; understand magnetic circuits with air gaps, saturation effects, and core material properties",
      "Analyze transformer operation: understand ideal vs. real transformers, equivalent circuit model, voltage regulation, efficiency, and core/copper losses; recognize transformer impedance matching requirements for power transfer",
      "Design and analyze DC machines: understand commutation (brushes as mechanical switches), derive torque-speed characteristics, calculate efficiency as function of load, predict thermal behavior, and design regenerative braking circuits",
      "Understand three-phase AC induction motors: derive rotating magnetic field from three-phase windings, understand slip concept and its effect on torque/speed, analyze equivalent circuit and power flow, design soft-start and VFD-based speed control",
      "Master synchronous machines: understand permanent magnet torque and reluctance torque production, analyze torque-angle characteristics, design control systems with Park/Clarke transforms and FOC (Field-Oriented Control)",
      "Design specialized motors: understand stepper motor full-step vs. half-step operation, microstepping algorithms, BLDC commutation (sensored Hall effect and sensorless back-EMF detection), and brushless motor efficiency advantages",
      "Perform motor loss analysis: calculate copper losses (I²R), iron losses (hysteresis and eddy currents), mechanical losses (friction, windage); predict efficiency from loss maps; design thermal management for continuous duty",
      "Size and select motors: calculate RMS torque requirements over duty cycles, apply thermal limits, account for efficiency, predict motor temperature rise, select appropriate motor type (brushed DC, stepper, BLDC, induction, reluctance) for application",
      "Implement motor control: design PWM speed control for DC motors, multi-phase commutation for BLDC/stepper motors, soft-start and VFD control for induction motors, closed-loop speed/position feedback with PI controllers"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=1LPLUeqCoI8 - Electrical Machines: Transformers (Part 1/8) (1:10:31)",
        "https://www.youtube.com/watch?v=z5GQyziCKlI - Induction Motor #1 - Introduction and Basic Construction (14:44)",
        "https://www.youtube.com/watch?v=OSzVsywM2ak - Basic Electrical Engineering: Transformer and Induction Motor (25:15)",
        "https://www.youtube.com/watch?v=jqKChCR_wzY - Electric Machines Module 3: Power Flow in Induction Motor (18:23)",
        "https://www.youtube.com/watch?v=wZQq--dHAIo - 3142 Lecture 4/23/2023: Induction Machines (49:44)",
        "https://www.youtube.com/watch?v=ajGdrODIYIg - Visualization of Reluctance Torque (1:25)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/6-685-electric-machines-fall-2013/ - MIT 6.685: Electric Machines",
        "https://ocw.mit.edu/courses/6-061-introduction-to-electric-power-systems-spring-2011/ - MIT 6.061: Introduction to Electric Power Systems",
        "https://learn.sparkfun.com/tutorials/motors-and-selecting-the-right-one/all - SparkFun: Motors and Selecting the Right One",
        "https://itp.nyu.edu/physcomp/lessons/dc-motors-the-basics/ - NYU ITP: DC Motors: The Basics",
        "https://www.instructables.com/How-to-use-a-Stepper-Motor/ - Instructables: How to Use a Stepper Motor",
        "https://control.com/technical-articles/how-pulse-width-modulation-is-used-in-variable-frequency-drives/ - Control.com: PWM & VFDs",
        "https://docs.wpilib.org/en/stable/docs/software/hardware-apis/motors/pwm-controllers.html - WPILib: PWM Motor Controllers",
        "https://learn.arm.com/learning-paths/embedded-and-microcontrollers/edge/motor-control-pwm/ - ARM: Motor Control with PWM"
      ],
      "tools": [
        "MATLAB + Simulink (SimPowerSystems)",
        "LTspice (motor circuit simulation)",
        "COMSOL Multiphysics (FEA analysis)",
        "Python scikit-learn + matplotlib",
        "Motor datasheet analysis tools",
        "Arduino + motor driver shields",
        "STM32 microcontroller",
        "Hall effect sensors",
        "Oscilloscope (20+ MHz)",
        "Thermal imaging camera"
      ]
    }
  }
}
,
  {
  "id": "ee--131",
  "code": "EE 131",
  "name": "Power Electronics",
  "fullName": "EE 131: Power Electronics",
  "description": "Comprehensive study of switching power converters and energy conversion for embedded systems. Covers DC-DC converter topologies (buck, boost, buck-boost, SEPIC, flyback, forward), DC-AC inverters, PWM control techniques, feedback regulation, and practical design considerations. Emphasizes power efficiency, thermal management, and applications in battery-powered robotics systems.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Power electronics directly determines the practical runtime, efficiency, and operational cost of battery-powered robots. Embedded systems engineers must master DC-DC converter design to efficiently step down battery voltage (48V → 5V) while minimizing parasitic loss as heat—a 90% efficient converter wastes 4.8W per 48W consumed, directly reducing battery operational time. Understanding SEPIC topology enables design of converters tolerating wide input voltage ranges (48V discharging battery from 4.2V to 2.5V equivalents in boost ratio), maintaining constant supply to critical subsystems. Mastery of PWM control and feedback compensation ensures stable voltage regulation across dynamic motor load transients. Knowledge of GaN power switches enables next-generation 48-100V robot systems with 3-4× higher switching frequency, reducing inductor/capacitor size and thermal dissipation. For industrial collaborative robots operating at 400V AC, understanding three-phase inverter topologies and soft-switching techniques prevents electromagnetic interference with sensitive sensors. Power electronics skills distinguish senior engineers capable of designing compact, efficient power distribution for high-performance autonomous systems.",
    "realWorldApplications": [
      "Designing Vicor BCM6135 48V-to-12V converter modules for drone power distribution, achieving 97% efficiency and compact 2cm³ form factor through isolated topology and 500 kHz switching frequency",
      "Creating SEPIC converter for robot with 4.2V-2.5V LiPo battery discharging curve, maintaining constant 5V microcontroller supply with < 5% voltage ripple across entire discharge cycle",
      "Implementing dual buck converters for 6-axis robotic arm: 48V → 5V (logic/sensors with noise immunity) and 48V → 12V (servo controllers with isolated return path) for EMI rejection",
      "Designing GaN-based 48V motor drive with 100 kHz switching frequency instead of silicon MOSFET 50 kHz, reducing inductor size by 50% and enabling efficient cooling for collaborative robot continuous operation",
      "Building soft-start circuit with 1-second ramp preventing 500A inrush current when main power applied to 48V robot, protecting battery connectors and reversing polarity fuses",
      "Calculating thermal management for 48V→5V buck converter delivering 20A: conduction loss (I²R) + switching loss → junction temperature → heatsink area required to maintain <100°C operation",
      "Implementing bidirectional buck-boost converter for energy harvesting robot that captures kinetic energy from arm retraction (regenerative braking) and charges internal battery during idle periods",
      "Designing three-phase inverter with SVPWM (Space Vector PWM) for industrial robot AC motor 48V battery input, minimizing harmonic distortion and achieving ≥98% dynamic efficiency during coordinated multi-axis motion"
    ],
    "learningOutcomes": [
      "Analyze buck converter operation in continuous and discontinuous conduction modes and calculate duty cycle for desired voltage conversion",
      "Design boost and buck-boost converters for battery-powered robotics with ripple current and voltage specifications",
      "Calculate inductor and capacitor values based on ripple requirements, switching frequency, and load current",
      "Understand PWM control fundamentals including duty cycle, frequency selection, and control-to-output relationships",
      "Design and analyze feedback compensation networks (PI/PID control) for transient response and steady-state accuracy",
      "Perform converter efficiency analysis including switching losses, conduction losses, and core losses in magnetic components",
      "Apply SEPIC converter topology for wide-input-range applications with non-inverted output polarity",
      "Design bidirectional converters for energy harvesting and regenerative energy recovery in robot systems",
      "Implement soft-start circuits and protection mechanisms (overvoltage, overcurrent, thermal shutdown)",
      "Select and specify MOSFETs and IGBTs for switching stage based on voltage/current ratings and thermal constraints",
      "Design gate drive circuits with appropriate voltage levels and timing considerations for optimal switching transitions",
      "Apply PWM modulation techniques (voltage-mode, current-mode, hysteretic control) for different applications",
      "Design and analyze DC-AC inverters for BLDC motor drives using H-bridge and resonant converter topologies",
      "Use SPICE simulation and design tools (WEBENCH, Simulink) to verify converter performance before hardware implementation",
      "Understand GaN power device advantages and design high-frequency converters for space-constrained robot systems"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=6Bzq25m68BE",
        "https://www.youtube.com/watch?v=vUb5xu72hvQ",
        "https://www.youtube.com/watch?v=q65Yoc9Nqx0",
        "https://www.youtube.com/watch?v=LOD0JOKo_PQ",
        "https://www.youtube.com/watch?v=T7NprY5gHY4",
        "https://www.youtube.com/watch?v=8Hd4Ims5KEI",
        "https://www.youtube.com/watch?v=_2nWJYj5Aw0"
      ],
      "websites": [
        "https://catalog.csus.edu/courses-a-z/eee/",
        "https://bulletins.psu.edu/university-course-descriptions/undergraduate/ee/",
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69988",
        "https://www.monolithicpower.com/en/learning/mpscholar/power-electronics/",
        "https://resources.pcb.cadence.com/blog/km-understanding-power-supply-topologies-from-buck-to-llc-resonant",
        "https://www.edn.com/switching-regulator-topologies-part-1/",
        "https://eepower.com/technical-articles/an-intro-to-pulse-width-modulation-for-control-in-power-electronics/"
      ],
      "tools": [
        "LTSpice (SPICE circuit simulation, manufacturer device models)",
        "MATLAB/Simulink (control system design, converter modeling)",
        "Texas Instruments WEBENCH (online converter design)",
        "TI SimpLink (converter parameter optimization)",
        "Analog Devices LTpowerCAD (power supply design)",
        "Thermal CAD tools (heatsink and junction temperature analysis)",
        "PCB design tools with thermal layer optimization (Altium, KiCad)",
        "Function generator and oscilloscope (hardware verification)"
      ]
    }
  }
}
,
  {
  "id": "ee-150",
  "code": "EE 150",
  "name": "Digital Communication",
  "fullName": "EE 150: Digital Communication",
  "description": "Advanced course covering the theory and practice of digital communication systems, including modulation/demodulation techniques (ASK, FSK, PSK, QAM), signal detection, error correction coding, channel estimation, and practical implementation in wireless protocols. Students design reliable communication systems for embedded devices, analyzing tradeoffs between data rate, power consumption, and link reliability—essential for autonomous robots, IoT systems, and multi-agent coordination.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Digital Communication is critical for Embedded Systems & Robotics Engineering because modern robots operate in networked environments where reliable data transmission directly impacts autonomy, safety, and coordination. Unlike theoretical communication courses in computer science, this Tier 2 course emphasizes practical constraints: real robots face fading channels (obstacles reflecting signals), interference from other devices sharing the 2.4GHz ISM band, power-limited transceivers (microcontroller power budgets in milliwatts), and strict latency requirements for closed-loop control. Engineers need to understand both signal-level fundamentals (why QPSK outperforms BPSK in fading channels, how error-correcting codes overcome noise) and practical protocol tradeoffs (WiFi's higher bandwidth vs. LoRaWAN's range, Bluetooth's power efficiency vs. range limitations). Real-world examples demand this knowledge: a search-and-rescue drone must maintain GPS-denied localization via multi-agent communication; a mobile robot swarm needs collision-free coordination across lossy wireless links; an autonomous vehicle must reliably transmit sensor fusion data between edge devices with <100ms latency. This course teaches engineers to design communication architectures that prevent catastrophic failures—dropped packets during critical maneuvers, desynchronization causing multi-robot collisions, sensor data corruption causing incorrect autonomy decisions. Shannon's information theory provides the mathematical foundation proving which performance limits are achievable; modern coding schemes (turbo codes, LDPC) approach these limits; and practical receivers implement channel estimation, equalization, and synchronization to operate reliably in real-world fading environments.",
    "realWorldApplications": [
      "Multi-robot swarm coordination: implementing mesh WiFi or LoRaWAN network topology with automatic re-routing when robots move out of range; using QPSK modulation with Reed-Solomon (255,223) error correction to transmit motion commands with <5% packet loss and <50ms latency across 100m range in urban warehouse",
      "Autonomous vehicle V2X (vehicle-to-everything) communication: designing 5G NR communication stack with OFDMA modulation, channel estimation via pilot symbols, interleaving to spread burst errors from multipath fading, enabling real-time perception sharing between vehicles at highway speeds with 99.99% reliability requirement",
      "Long-range IoT sensor networks: deploying LoRaWAN end-devices with LoRa chirp spread spectrum modulation achieving 15km+ range with 5min sensor readings transmitted every hour, using AES-128 encryption and code hopping to minimize collisions among thousands of devices",
      "Drone tele-operation and autonomous flight: transmitting high-bandwidth video from drone camera (5-20Mbps) using WiFi 802.11ac with 256-QAM modulation over 500m line-of-sight range; fallback to lower-bandwidth LoRa link for autonomous return-to-base command with guaranteed delivery",
      "Synchronized multi-hop wireless sensor networks: implementing time-division multiple access (TDMA) protocol with tight synchronization (±10μs) across distributed nodes using PSK demodulation and phase-locked-loop carrier recovery, enabling coordinated sensing for SLAM and multi-agent localization"
    ],
    "learningOutcomes": [
      "Master digital modulation fundamentals: understand amplitude modulation, frequency modulation, and phase modulation; analyze constellation diagrams for ASK, FSK, BPSK, QPSK, M-ary PSK, and QAM; relate modulation choice to bandwidth efficiency and error probability",
      "Design and analyze demodulators: understand matched filter theory, signal-to-noise ratio (SNR) calculation, optimal detection using minimum distance criterion, demodulation of BPSK/QPSK using in-phase and quadrature (I/Q) components",
      "Apply Shannon's information theory: calculate channel capacity using Shannon's theorem, understand the Shannon limit as the boundary between achievable and unachievable data rates, recognize tradeoffs between rate, power, and bandwidth",
      "Implement error correction: understand coding theory, implement and analyze Hamming codes, Reed-Solomon codes, and modern LDPC codes; calculate code rate, minimum Hamming distance, and error correction capability",
      "Design wireless protocols: understand protocol stack layers (PHY, MAC, network), analyze protocol efficiency, implement CSMA/CA for collision avoidance, design power management for battery-limited devices",
      "Perform channel estimation and equalization: design receivers that estimate fading channel response from pilot symbols, implement zero-forcing and MMSE equalizers to combat multipath distortion, understand OFDM for frequency-selective channels",
      "Analyze communication system performance: calculate bit error rate (BER) vs. SNR curves, understand fading channel models (Rayleigh, Rician), analyze performance under AWGN and fading conditions",
      "Implement practical transceivers: understand RF front-end design, understand frequency synthesis and PLL lock-in, design modulator/demodulator circuits or use commercial transceiver ICs (nRF24L01, CC1101, SX1272)",
      "Integrate communication into robotics systems: design communication middleware for ROS, implement real-time packet scheduling, handle packet loss gracefully with retransmission and timeout mechanisms"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=ZC4arr7qTek - Digital Communications: Demodulation (56:12)",
        "https://www.youtube.com/watch?v=h_7d-m1ehoY - Basics of IQ Signals and IQ Modulation & Demodulation (18:20)",
        "https://www.youtube.com/watch?v=7kpuZgm-3GY - 15. Modulation/demodulation (MIT 6.02) (1:03:45)",
        "https://www.youtube.com/watch?v=HkmAT9eVYSo - 3. Errors, Channel Codes (MIT 6.02) (51:09)",
        "https://www.youtube.com/watch?v=bNJ0briSaHU - Lecture 03: Errors, Channel Codes (51:09)",
        "https://www.youtube.com/watch?v=2QxgN2ugcMY - 19. Network Routing (MIT 6.02) (42:56)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/ - MIT 6.02: Digital Communication Systems",
        "https://learn.mit.edu/c/topic/user-experience?resource=10676 - MIT 6.02 on MIT Learn",
        "https://koder.ai/blog/claude-shannon-information-theory-compression-error-correction-networking - Claude Shannon's Information Theory",
        "https://news.mit.edu/2010/explained-shannon-0115 - MIT News: The Shannon Limit",
        "https://www.allaboutcircuits.com/technical-articles/demystifying-lora-network-and-lorawan-network-wireless-network-protocols/ - LoRa and LoRaWAN Technical Deep-Dive",
        "https://cioffi-group.stanford.edu/doc/book/chap3.pdf - Stanford: Equalization Theory",
        "https://www.bvm.co.uk/faq/wireless-communication-protocols-for-embedded-systems/ - Wireless Protocols for Embedded Systems",
        "https://taurotech.com/blog/wireless-communication-in-embedded-systems/ - Wireless Communication in Robotics"
      ],
      "tools": [
        "MATLAB + Communications Toolbox",
        "Python: scipy.signal, numpy",
        "GNU Radio (open-source SDR)",
        "USRP (Universal Software Radio Peripheral)",
        "LTspice (analog circuit simulation)",
        "Simulink Communications Toolbox",
        "RF transceiver evaluation boards",
        "Commercial wireless protocol stacks",
        "Arduino + RF modules",
        "Channel simulation tools"
      ]
    }
  }
}
,
  {
  "id": "ee--185",
  "code": "EE 185",
  "name": "Instrumentation",
  "fullName": "EE 185: Instrumentation",
  "description": "Comprehensive study of sensors, transducers, and measurement systems for embedded applications. Covers signal conditioning, amplification, filtering, calibration, and data acquisition. Emphasizes practical design of measurement circuits for robotics including strain gauges, accelerometers, gyroscopes, and sensor fusion algorithms for multi-sensor integration.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Instrumentation determines the quality of robotic perception and feedback control. Embedded systems engineers must design accurate, noise-immune measurement systems to enable robots to sense their environment and perform controlled tasks. Understanding sensor specifications, signal conditioning requirements, and calibration procedures ensures reliable robot operation in real-world conditions with electromagnetic interference from motor drivers. Mastery of signal conditioning circuit design using instrumentation amplifiers enables robust force measurement in robotic grippers, bridge excitation for load cells in industrial arms, and differential measurement isolation from noisy motor power supplies. Advanced knowledge of sensor fusion algorithms (Kalman filtering) enables drones to estimate accurate orientation from noisy accelerometer/gyroscope/magnetometer data, and autonomous robots to localize using redundant sensor inputs. Engineers skilled in measurement system design distinguish themselves by building robots that reliably sense their environment—the foundation of autonomous and safe operation.",
    "realWorldApplications": [
      "Designing 3-op-amp instrumentation amplifier circuit with CMRR > 100 dB to measure force in robot gripper using Flexi-Force sensor, achieving 1% measurement accuracy despite 100A motor switching noise on adjacent PCB traces",
      "Implementing Bosch Sensortec 9-DOF IMU with complementary filter sensor fusion (accelerometer + gyroscope + magnetometer) at 500 Hz sample rate for autonomous drone attitude stabilization with < 1° orientation error",
      "Building strain gauge load cell signal conditioner using Acromag TT351 with 6-wire remote sensing and digital calibration via USB for multi-axis force measurement in collaborative robot wrist with ± 0.1% accuracy over temperature",
      "Conditioning low-level thermocouple signal (mV output) with cold-junction compensation amplifier and anti-aliasing filter for precise temperature monitoring in robot joint gearbox thermal throttling safety system",
      "Designing extended Kalman filter combining IMU data (gyro/accel/mag) with wheel odometry for GPS-denied autonomous rover localization, achieving drift-free navigation in GPS-shadowed warehouse environment",
      "Implementing digital low-pass anti-aliasing filter (400 Hz cutoff) before 1000 Hz ADC sampling of accelerometer to prevent aliasing while maintaining 1 kHz sensor fusion update rate for real-time robotic control",
      "Building noise-immune measurement circuit with shielded twisted-pair differential lines, star-point grounding, and local bypass capacitors to isolate analog sensor signals from 48V motor drive PWM switching (100 kHz) interference",
      "Designing two-point calibration procedure for load cells: zero adjustment (unloaded), gain calibration (known weight), temperature compensation across -10°C to +60°C operating range for outdoor robot deployments"
    ],
    "learningOutcomes": [
      "Select appropriate sensors and transducers based on specifications, accuracy requirements, and environmental constraints",
      "Understand measurement error sources and quantify accuracy, precision, resolution, and sensitivity for robotics applications",
      "Design and analyze signal conditioning circuits using operational amplifiers for amplification and filtering",
      "Implement instrumentation amplifier circuits (3-op-amp design) for differential measurement with high common-mode rejection",
      "Complete Wheatstone bridge circuits for strain gauge and load cell measurement with proper excitation",
      "Design passive and active filters (low-pass, high-pass, band-pass) to remove noise while preserving signal content",
      "Calculate filter characteristics (cutoff frequency, roll-off rate) and select appropriate filter order for application",
      "Apply anti-aliasing filter design to prevent aliasing in analog-to-digital conversion systems",
      "Implement sensor calibration procedures including offset adjustment, gain calibration, and temperature compensation",
      "Design isolated measurement circuits using isolation amplifiers to reject common-mode noise and ground loops",
      "Apply cold-junction compensation techniques for thermocouple temperature measurement",
      "Design bridge excitation circuits with voltage and current excitation options for different sensors",
      "Understand ADC specifications (resolution, sample rate, linearity, noise) and select appropriate converter for application",
      "Implement complementary filter and Kalman filter algorithms for multi-sensor fusion (IMU fusion, odometry + map)",
      "Apply proper PCB layout and grounding techniques to minimize measurement error and electromagnetic interference",
      "Calibrate measurement systems and verify accuracy over time, temperature, and operating conditions",
      "Troubleshoot measurement problems including noise, drift, nonlinearity, and sensor failures in deployed systems"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=OlhN7ADpKds",
        "https://www.youtube.com/watch?v=hL2ofn12x_M",
        "https://www.youtube.com/watch?v=VtxFtzWlTgg",
        "https://www.youtube.com/watch?v=Yq767et8BbY",
        "https://www.youtube.com/playlist?list=PLrwXF7N522y7Ut9bm8TXAOhIWqL__FGlj",
        "https://www.youtube.com/watch?v=1BxR3cVrzKY",
        "https://www.youtube.com/watch?v=VoY87MqCPgA"
      ],
      "websites": [
        "https://www.therobotreport.com/increased-sensing-accuracy-with-signal-conditioning/",
        "https://dewesoft.com/blog/what-is-data-acquisition",
        "https://www.studysmarter.co.uk/explanations/engineering/robotics-engineering/sensor-calibration/",
        "https://arshon.com/blog/understanding-signal-conditioning-techniques-optimizing-accuracy-and-performance-in-electronic-systems/",
        "https://www.monolithicpower.com/en/learning/mpscholar/sensors/basics-of-sensor-operation/basics-of-conditioning",
        "https://www.ti.com/lit/pdf/slyt625",
        "https://www.omi.me/blogs/firmware-features/how-to-implement-sensor-fusion-imu-accelerometer-gyro-in-your-firmware"
      ],
      "tools": [
        "Instrumentation amplifiers (INA128, OPA2333, AD8221)",
        "Signal conditioning ICs (TT351, QIA128, PGA400)",
        "DAQ hardware (NI-DAQ, ADLINK)",
        "MATLAB/Simulink (filter design, sensor fusion algorithms)",
        "Python (NumPy/SciPy for signal processing, filter design)",
        "LTSpice (circuit simulation, op-amp design verification)",
        "Oscilloscope and function generator (measurement verification)",
        "Thermal imaging camera (temperature measurement validation)",
        "PCB design tools (Altium, KiCad for layout and EMI mitigation)",
        "Kalman filter libraries (filterpy, PyKalman for Python)"
      ]
    }
  }
}
,
  {
  "id": "engr-120",
  "code": "ENGR 120",
  "name": "Fluid Mechanics",
  "fullName": "ENGR 120: Fluid Mechanics",
  "description": "Advanced course in fluid mechanics covering fundamental conservation laws (mass, momentum, energy), viscous flow analysis, boundary layer theory, and computational methods. Students apply fluid mechanics principles to design pneumatic/hydraulic systems, aerodynamic structures (drones, autonomous vehicles), hydrodynamic propulsion (underwater vehicles), and heat transfer in embedded systems—critical for robot mobility, propulsion efficiency, and thermal management.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Fluid Mechanics is critical for Embedded Systems & Robotics Engineering because most advanced robots operate through fluid interactions: aerial vehicles exploit aerodynamic lift and drag, underwater vehicles rely on buoyancy and hydrodynamic thrust, mobile manipulators use hydraulic/pneumatic actuators, and all high-power systems dissipate heat through fluid cooling. Unlike theoretical mechanics courses, this Tier 2 engineering course emphasizes practical design decisions: engineers must choose between electric motors and pneumatic actuators based on power density and responsiveness tradeoffs; calculate propeller efficiency (blade design affects 20-30% of power consumption in drones); optimize airframe geometry for 4-6% improvements in lift-to-drag ratio (translating to 50%+ energy savings over long flights); and design thermal management systems preventing 10°C+ temperature rise that degrades sensor accuracy. Real-world robotics applications demand quantitative fluid mechanics knowledge: a drone designer must understand how rotor speed affects lift, how multipath downwash reduces stability near ground, and how aerodynamic losses scale with vehicle size. An autonomous underwater vehicle engineer needs to calculate drag penalties for sensor housings and design hydrodynamic fins for stability. An industrial manipulation robot using hydraulic actuators must understand viscosity effects on response time and energy losses. This course teaches engineers to balance competing constraints—speed vs. efficiency, precision vs. robustness, size vs. power—by understanding the physics underlying fluid systems. Mastery of conservation laws (why Bernoulli's equation predicts pressure-velocity tradeoffs, why Reynolds number separates laminar from turbulent regimes) enables engineers to predict system behavior, optimize designs computationally before hardware testing, and troubleshoot unexpected failures.",
    "realWorldApplications": [
      "Quadcopter propeller design and optimization: calculating blade lift and thrust from momentum theory, predicting power consumption vs. payload weight, using CFD to increase lift-to-drag ratio by 4-6%, extending flight time from 25min to 35+min with same battery; understanding rotor interference effects when hovering near ground (ground effect reduces required power by 20%)",
      "Autonomous underwater vehicle hydrodynamics: designing streamlined AUV fuselage to minimize drag coefficient (Cd) from 0.12 to 0.08 via computational fluid dynamics, calculating required thrust for 2 knot cruise speed against hydrodynamic drag, optimizing fin geometry for passive stability under current disturbances",
      "Pneumatic robot actuation system: selecting air compressor capacity based on actuator volumetric flow rate requirements, analyzing pressure drop across tubing and valves, calculating response time (150ms typical for solenoid valve + cylinder) vs. hydraulic alternatives (50ms), trading power density vs. precision",
      "Heat dissipation in high-power embedded systems: calculating thermal resistance of heat sink designs for 50W power dissipation, designing forced-air cooling paths to achieve <80°C steady-state temperature in 40°C ambient, predicting thermal time constant (5-10min typical) for transient design",
      "Fin and wing design for autonomous aerial vehicles: analyzing boundary layer separation to prevent stall, calculating pressure distribution via potential flow theory, understanding how Reynolds number affects wing efficiency (lower Re requires different airfoil shapes than high-speed aircraft)"
    ],
    "learningOutcomes": [
      "Master conservation laws: apply conservation of mass (continuity equation), momentum (Navier-Stokes equations), and energy (first law of thermodynamics) to fluid systems; understand when each conservation law is the limiting constraint in design",
      "Analyze viscous flows: understand shear stress, viscosity, and its dependence on temperature; derive Hagen-Poiseuille flow for laminar pipe flow, predict friction factor from Moody diagram for turbulent flow, calculate pressure drop in piping systems",
      "Apply dimensional analysis: use Buckingham Pi theorem to predict flow behavior from dimensionless parameters; understand Reynolds number (Re), Froude number (Fr), and Mach number (Ma) as predictors of flow regime and forces",
      "Design using Bernoulli's equation: apply conservation of energy along streamlines for inviscid flow; predict pressure distribution on objects (why airplane wings generate lift), design venturi flowmeters, calculate jet forces",
      "Understand boundary layers: recognize viscous effects confined to thin region near walls; calculate boundary layer thickness and skin friction drag; understand transition from laminar to turbulent boundary layers at critical Reynolds number (~500,000 for flat plate)",
      "Perform CFD analysis: set up computational domains, mesh generation strategies, turbulence modeling choices (RANS, LES), interpret simulation results; validate against experiments; use CFD for design optimization (lift-to-drag maximization, drag reduction)",
      "Design fluid systems: select pump/compressor capacity for required volumetric flow rate and pressure, calculate actuator power requirements, size heat exchangers for thermal management, analyze transient response of fluid-filled systems",
      "Analyze aerodynamic forces: calculate lift and drag from pressure distribution or empirical coefficients; understand angle of attack effects, stall phenomenon, and vortex dynamics (rotor tip vortex, ground effect)",
      "Apply principles to robotics: design drone propellers for efficiency and noise, model underwater vehicle dynamics, select pneumatic vs. hydraulic actuators, solve coupled fluid-structure problems (flutter, aeroelasticity)"
    ],
    "resources": {
      "videos": [
        "https://ocw.mit.edu/courses/2-06-fluid-dynamics-spring-2013/ - MIT 2.06 Fluid Dynamics (Prof. Kripa Varanasi, Spring 2013) – Complete 12-session lecture course (1.5 hrs each): pressure/hydrostatics/buoyancy, mass/momentum conservation, viscous flows, boundary layers, dimensional analysis, lift/drag on objects; with 5 recitation sessions, problem sets with solutions, exam",
        "https://www.youtube.com/watch?v=GUvoVvXwoOQ - 1. History of Dynamics; Motion in Reference Frames (54:19) – MIT 2.003SC Engineering Dynamics: foundational kinematics and dynamics prerequisite concepts needed for fluid systems with moving reference frames"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/2-06-fluid-dynamics-spring-2013/ - MIT 2.06: Fluid Dynamics (Complete Open CourseWare)",
        "https://resources.system-analysis.cadence.com/blog/msa2022-bernoullis-equation-derivation-from-the-navier-stokes-equation - Bernoulli's Equation Derivation From Navier-Stokes",
        "https://www.ansys.com/simulation-topics/what-is-computational-fluid-dynamics - ANSYS: What is CFD?",
        "https://ketiv.com/blog/what-is-computational-fluid-dynamics-and-why-you-need-it/ - What is CFD and Why You Need It",
        "https://www.comsol.com/blogs/which-turbulence-model-should-choose-cfd-application - Which Turbulence Model Should I Choose?",
        "https://www.grc.nasa.gov/www/k-12/airplane/bern.html - NASA Glenn: Bernoulli's Equation",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC10886954/ - CFD Analysis in Biomimetic Underwater Vehicles"
      ],
      "tools": [
        "MATLAB + Fluid Dynamics Toolbox",
        "ANSYS Fluent",
        "OpenFOAM",
        "COMSOL Multiphysics",
        "SolidWorks Flow Simulation",
        "Python scipy.integrate",
        "LTspice + behavioral models",
        "Wind tunnel and water channel experiments",
        "Experimental fluid mechanics instruments",
        "Thermal imaging camera"
      ]
    }
  }
}
,
  {
  "id": "engr--130",
  "code": "ENGR 130",
  "name": "Thermodynamics",
  "fullName": "ENGR 130: Thermodynamics",
  "description": "Comprehensive study of thermodynamic principles, energy conservation, and entropy with applications to engineering systems. Covers the First and Second Laws of Thermodynamics, thermodynamic properties, heat transfer mechanisms (conduction, convection, radiation), thermal cycles, and practical design of energy systems. Emphasizes thermal management for battery systems, motor cooling, and energy efficiency in robotics and embedded systems.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Thermodynamic understanding directly enables engineers to design efficient, reliable robot power systems that maximize runtime and minimize thermal failures. The First Law teaches energy conservation principles underlying all robot power systems—understanding where energy goes (dissipated as heat) is essential for predicting thermal loads. The Second Law reveals that perfect efficiency is impossible; entropy generation in motors, converters, and batteries creates waste heat that must be managed. Embedded systems engineers must calculate motor and power converter losses from thermodynamic principles, size heatsinks to maintain component junction temperatures below device limits, and design thermal management systems (especially battery cooling) that keep lithium-ion cells in optimal operating windows (0-55°C). Advanced knowledge of heat transfer mechanisms enables selection of cooling strategies: passive PCM for intermittent-duty robots, active liquid cooling for high-power continuous-duty arms, thermoelectric cooling for precise temperature control. For autonomous robots operating for hours, thermal management directly determines achievable mission duration—an inefficient thermal design can reduce runtime by 50% compared to optimized thermal architecture. Engineering excellence in robotics requires mastery of thermodynamics to transform theoretical efficiency into practical performance.",
    "realWorldApplications": [
      "Designing passive Phase-Change Material (PCM) thermal management for LiPo battery pack: calculating stored latent heat (46.34% efficiency at 40°C) to support 2-hour continuous flight without active cooling or power-consuming fans",
      "Implementing active liquid cooling for industrial robot motor winding: modeling conduction through copper wire → jacket liquid, convection to coolant flow, calculating optimal pump flow rate for < 5°C temperature uniformity across 48-cell battery pack",
      "Calculating thermal transient response for firmware thermal throttling: predicting junction temperature rise with time T(t) = T_amb + (Q/G) × (1 - e^(-t/τ)), enabling safe power limits before reaching MOSFET max 120°C limit during high-current motor acceleration",
      "Sizing heatsink for 48V→5V buck converter: calculating total power dissipation (conduction + switching losses), determining required thermal resistance to maintain junction < 100°C, selecting fin geometry to maximize natural convection cooling",
      "Designing thermoelectric cooling (TEC/Peltier) system for drone battery: balancing COP (1-2 for TECs), calculating electrical power input for desired cooling rate, optimizing temperature differential between cold side (battery) and hot side (radiator)",
      "Analyzing regenerative braking energy recovery: applying thermodynamic cycle analysis to motor operating in generator mode, calculating mechanical energy → electrical energy efficiency, accounting for drive circuit losses (converter, wiring)",
      "Predicting motor continuous duty cycle: using heat transfer equations to model motor thermal time constant, calculating maximum continuous power before junction temperature reaches motor insulation class limit (150-180°C)",
      "Implementing hybrid battery thermal management: combining passive heat pipes (92% efficiency heat spreading) with active fan-forced convection for extreme ambient conditions (50°C+ desert operations), firmware switches modes dynamically"
    ],
    "learningOutcomes": [
      "Apply the First Law of Thermodynamics to energy balance equations in robot power systems and thermal models",
      "Understand and quantify entropy generation and the Second Law implications for system efficiency limits",
      "Calculate thermodynamic properties (enthalpy, entropy, internal energy) for different processes (isothermal, adiabatic, isobaric)",
      "Analyze steady-flow devices relevant to robot cooling systems (pumps, fans, throttle valves)",
      "Model heat transfer by conduction using thermal resistance networks analogous to electrical circuits",
      "Calculate convective heat transfer using forced and natural convection correlations for heatsink design",
      "Apply radiation heat transfer equations (Stefan-Boltzmann) for high-temperature robot joint analysis",
      "Design thermal management systems for lithium-ion batteries balancing cooling power, mass, and system complexity",
      "Analyze thermodynamic cycles (Carnot, Rankine) to understand theoretical maximum efficiency limits",
      "Calculate motor and power converter efficiency from thermodynamic principles and predict losses across operating points",
      "Perform thermal transient analysis to predict temperature rise with time for intermittent duty cycles",
      "Design battery thermal management systems with liquid cooling, passive cooling, or active thermoelectric cooling strategies",
      "Analyze regenerative braking and energy harvesting systems using thermodynamic cycle analysis",
      "Select appropriate thermal management strategies (passive PCM, active liquid, TEC) based on robot duty cycle and constraints",
      "Apply computational fluid dynamics concepts to optimize cooling system geometry and flow patterns",
      "Implement thermal throttling algorithms in firmware based on thermodynamic temperature predictions"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=f1OokOgtcqg",
        "https://www.youtube.com/watch?v=DWiCaDPM7Hk",
        "https://www.youtube.com/watch?v=c-v7WdvGA7U",
        "https://www.youtube.com/watch?v=bLTSizDLLTQ",
        "https://www.youtube.com/watch?v=HpCvWuvCUoA",
        "https://www.youtube.com/watch?v=lvyCe0UaqJY",
        "https://www.youtube.com/watch?v=lN66F9V7-_Q"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67678",
        "https://docs.nrel.gov/docs/fy07osti/40446.pdf",
        "https://www.tglobaltechnology.com/t-global-technology/industry-applications/robots/",
        "https://thermtest.com/battery-thermal-management-system",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC12794804/",
        "https://www.neuralconcept.com/post/what-is-battery-liquid-cooling-and-how-does-it-work",
        "https://promwad.com/news/advanced-thermal-management-high-performance-embedded-systems"
      ],
      "tools": [
        "MATLAB/Simulink (thermal system modeling, controller design)",
        "COMSOL Multiphysics (finite element thermal analysis)",
        "EES (Engineering Equation Solver) for thermodynamic property calculations",
        "LTSpice with thermal models (electrical-thermal co-simulation)",
        "Thermal CAD software (Simcenter Thermal, FloTHERM)",
        "CFD tools (ANSYS Fluent, OpenFOAM) for heat transfer optimization",
        "Spreadsheet tools (Excel with VBA) for quick thermal transient calculations",
        "Manufacturer datasheets (thermal resistance, power dissipation curves)"
      ]
    }
  }
}
,
  {
  "id": "engr-135",
  "code": "ENGR 135",
  "name": "Heat Transfer",
  "fullName": "ENGR 135: Heat Transfer",
  "description": "Advanced course in thermal science covering fundamental modes of heat transfer (conduction, convection, radiation), steady-state and transient analysis, heat exchanger design, and thermal management of electronics. Students apply heat transfer principles to design cooling systems for high-power embedded devices, manage thermal constraints in compact robotics, and optimize energy efficiency in actuators and sensors—essential for reliable operation of autonomous systems.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Heat Transfer is critical for Embedded Systems & Robotics Engineering because thermal limits directly constrain robot performance and reliability. Unlike abstract thermodynamics courses, this Tier 2 engineering course emphasizes practical constraints: every watt of power dissipated in electronics becomes heat that must be managed; junction temperature rising 10°C above specification reduces component lifetime by 50%; and worst-case ambient conditions (50°C warehouse, 80°C desert, -40°C arctic) demand robust thermal design. Modern robots pack enormous power density into compact volumes—a collaborative manipulator arm dissipates 200-500W continuously, a UAV with high-speed processors generates 30-50W, autonomous vehicle perception stacks consume 50-100W—all in space smaller than a shoebox. Without thermal engineering expertise, systems throttle performance (CPU speed-down when overheating), fail catastrophically (capacitor ESR increases exponentially with temperature, solder joint reliability drops below 125°C), or demand expensive active cooling (fans add weight, power drain, acoustic noise). This course teaches engineers to predict thermal behavior using conservation laws (why Fourier's law predicts temperature gradients, why Biot number determines whether temperature is uniform or spatially varying), design thermal systems using thermal resistance networks (treating heat flow like electrical current, temperature like voltage, thermal resistance like electrical resistance), and optimize hardware-software tradeoffs (choosing between powerful hot processors vs. efficient cool designs). Real robotics applications demand this knowledge: selecting heat sink size to keep transistors under 100°C with natural convection only, calculating thermal time constant to predict how system temperature responds to transient power spikes, designing PCB copper layouts to spread heat from hot components, and sizing fans/pumps for active cooling when passive methods insufficient. Understanding transient heat transfer (Biot number, Fourier number) enables engineers to predict thermal shock failures during rapid power transitions, validate designs against thermal cycling specifications, and troubleshoot field failures where temperature-dependent failures only manifest under specific operating patterns.",
    "realWorldApplications": [
      "High-power motor drive PCB thermal design: analyzing power dissipation in MOSFET H-bridges (I²R losses), designing thermal network with heat sinks (thermal resistance <3°C/W), placing thermal vias under power devices, predicting junction temperature rise <30°C above 50°C ambient during continuous 1-hour acceleration, preventing thermal throttling of gate drivers",
      "Compact robot arm electronics enclosure cooling: modeling convective heat transfer with natural circulation through strategic ventilation holes, predicting thermal stratification (hot air rises), calculating time to reach steady-state (thermal time constant 5-15min), designing forced-air cooling with small 5-10W fan when passive insufficient, ensuring <100°C motor controller temperature in 70°C factory environment",
      "Transient thermal analysis of autonomous vehicle during sensor fusion: predicting temperature spike when perception stack (GPU + CPU + LiDAR) suddenly activates, calculating time until thermal equilibrium (Fourier number analysis), implementing firmware throttling strategy to prevent overshooting 125°C limit, designing thermal mass (heat spreaders) to absorb transients without steady-state overheating",
      "Heat exchanger design for high-power liquid-cooled robotics: sizing pump/coolant flow rate for 100W dissipation with ΔT<10°C, calculating LMTD (log mean temperature difference) for microchannel cooler geometry, predicting pressure drop across miniature heat exchangers, optimizing coolant viscosity vs. convection coefficient tradeoff for compact systems",
      "Component thermal cycling reliability prediction: analyzing mechanical stress from repeated thermal expansion/contraction during power cycles, predicting solder joint lifetime using Coffin-Manson model, designing PWM duty cycles to limit ΔT swings, validating against military/automotive thermal cycling specifications (e.g., -40°C to +85°C in 10min cycles)"
    ],
    "learningOutcomes": [
      "Master the three modes of heat transfer: apply Fourier's law for conduction (through solids), Newton's law of cooling for convection (fluids in motion), Stefan-Boltzmann law for radiation (electromagnetic); recognize which mode dominates in specific applications",
      "Analyze steady-state conduction: calculate temperature profiles in rectangular/cylindrical geometries, design thermal spreading (ground planes, heat spreaders) to reduce hotspot temperatures, understand thermal resistance analogy (R_th analogous to electrical resistance), predict fin efficiency for heat sink design",
      "Design convective cooling: understand boundary layers, correlate Nusselt number to fluid properties and flow rates, predict convection coefficient from empirical relations (e.g., Dittus-Boelert for turbulent pipe flow), design natural vs. forced convection systems, optimize heat sink fin geometry",
      "Apply thermal resistance networks: model complex heat paths as series/parallel thermal resistances, predict temperature distribution across electronics assemblies (die-to-case-to-sink-to-ambient), solve using thermal analogy to electrical circuit equations, validate designs iteratively",
      "Solve transient heat transfer: understand lumped system analysis and its Biot number validity, calculate thermal time constant (τ) for first-order systems, predict temperature response to step power inputs, design systems accounting for thermal inertia and delay",
      "Design and rate heat exchangers: apply LMTD (log mean temperature difference) method for steady-state operation, understand effectiveness-NTU method when outlet temperatures unknown, select heat exchanger type (plate-fin, microchannel, shell-and-tube) for compact robotics, calculate required flow rate and pressure drop",
      "Manage thermal stress and failure: understand temperature-dependent component aging (capacitor lifespan, semiconductor leakage), design to Tj,max < 100°C for junction temperature, predict thermal cycling damage (solder cracks, PCB warping), implement firmware throttling and thermal management strategies",
      "Perform thermal simulation: set up finite element models for complex geometries, validate against analytical solutions for simple cases, optimize designs using parametric studies (fin spacing, flow rate, material selection)",
      "Integrate thermal design into system architecture: balance power efficiency vs. thermal limits, select active vs. passive cooling based on constraints, design thermal instrumentation (sensors, feedback control) for responsive cooling systems"
    ],
    "resources": {
      "videos": [
        "https://ocw.mit.edu/courses/2-051-introduction-to-heat-transfer-fall-2015/ - MIT 2.051: Introduction to Heat Transfer (Full Course)",
        "https://www.youtube.com/watch?v=HpCvWuvCUoA - Conduction, Convection, Radiation Heat Transfer (17:14)",
        "https://www.youtube.com/watch?v=7Bj3N1E7vZk - Introduction to Heat Transfer (34:20)",
        "https://www.youtube.com/watch?v=J-XgMPHH8ic - Transient Heat Transfer - Biot Number (15:23)",
        "https://www.youtube.com/watch?v=qK_sOYUyUtQ - Lecture 8: Radiative Heat Transfer (1:18:31)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/2-051-introduction-to-heat-transfer-fall-2015/ - MIT 2.051: Complete Heat Transfer Course",
        "https://sciencenotes.org/heat-transfer-conduction-convection-radiation/ - Science Notes: Heat Transfer Overview",
        "https://resources.system-analysis.cadence.com/blog/msa2022-bernoullis-equation-derivation-from-the-navier-stokes-equation - Bernoulli Equation Derivation",
        "https://www.omnicalculator.com/physics/lmtd - LMTD Calculator with Explanation",
        "https://en.wikipedia.org/wiki/Biot_number - Biot Number (Wikipedia)",
        "https://www.allpcb.com/blog/pcb-knowledge/thermal-management-strategies-for-robotics-control-pcbs-in-harsh-environments.html - Thermal Management for Robotics PCBs",
        "https://altasimtechnologies.com/thermal-resistance-networks-initial-set-up-electronics-cooling-solutions/ - Thermal Resistance Networks",
        "https://nmbtc.com/blog/thermal-management-humanoid-robots/ - Thermal Management for Humanoid Robots"
      ],
      "tools": [
        "MATLAB + Thermal Modeling Toolbox",
        "ANSYS Fluent + ANSYS Mechanical",
        "COMSOL Multiphysics",
        "SolidWorks Simulation",
        "Python scipy + numpy",
        "LTspice + thermal behavioral models",
        "Commercial thermal design software",
        "Thermal imaging camera (IR)",
        "Thermocouples + data logger",
        "Heat sink/fin design tools"
      ]
    }
  }
}
,
  {
  "id": "engr--151",
  "code": "ENGR 151",
  "name": "Strength of Materials",
  "fullName": "ENGR 151: Strength of Materials",
  "description": "Comprehensive study of material deformation and failure under loading. Covers stress and strain, axial loading, torsion, beam bending, deflection analysis, combined stresses, and failure criteria. Emphasizes practical design of robot structures using metals and composite materials, with applications to joint design, structural optimization, and precision analysis.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Strength of materials is the mechanical foundation enabling safe, efficient robot design that balances weight, stiffness, and strength. Embedded systems engineers must understand stress and strain to predict when structures will yield or fail under robot payloads and acceleration forces. Mastery of beam bending theory enables design of lightweight robot arms where deflection is minimized (precision requirement) while material is minimized (battery runtime requirement). Torsion analysis determines shaft diameters for motor-to-joint couplings without permanent twist. Understanding failure criteria (yield, fatigue, fracture) prevents catastrophic mechanical failures during autonomous operation. Knowledge of composite materials—carbon fiber/epoxy construction common in modern robotic arms—enables optimization of fiber orientation for multi-axis loading, reducing weight 40-50% compared to aluminum while improving stiffness. Advanced understanding of stress concentration effects prevents premature fatigue failures in high-cycle robot joints (millions of operating cycles). Engineers skilled in strength of materials can design robot structures that are simultaneously strong, stiff, and lightweight—transforming theoretical capabilities into reliable real-world autonomous systems.",
    "realWorldApplications": [
      "Analyzing 0.5m cantilever aluminum tube arm carrying 10 kg payload: calculating bending moment M=50 Nm, designing hollow tube diameter and thickness to maintain stress < 80 MPa (factor of safety 3) while minimizing weight for mobile robot runtime",
      "Comparing graphite/epoxy composite arm vs. aluminum arm for 6-DOF industrial robot: composite design 30% lighter with optimized [0/±45/90]_s fiber layup, achieving higher natural frequency to prevent resonance-induced vibration during 1m/s3 acceleration",
      "Analyzing torsional stress in motor shaft (10,000 Nm torque, 50mm radius, 1m length): calculating maximum shear stress τ = 50.9 MPa and twist angle θ = 0.124 radians using torsion formula τ = Tr/J, verifying FEA simulation results within 2% of analytical",
      "Designing robot wrist F/T sensor mount: performing bending moment diagram analysis under 500N dynamic payload, identifying critical section requiring reinforcement to prevent plastic deformation during 100g drop test",
      "Calculating fatigue safety for industrial arm joint: determining endurance limit from S-N curve (material-specific), applying 2.5× safety factor for 10^7 cycle design life (100 Hz actuation = 1 week continuous operation)",
      "Optimizing collaborative robot forearm: minimizing weight-critical links while maintaining stiffness using finite element analysis of combined bending and torsion stresses from acceleration, achieving 25% weight reduction vs. baseline aluminum design",
      "Analyzing impact stress from robot drop test: predicting localized plastic deformation and stress concentration at weld intersections (keyway effects) using Mohr's circle for combined stresses in 3D joint analysis",
      "Designing graphite/epoxy drone arm: calculating deflection δ = (P×L³)/(3×E×I) to ensure < 0.5mm tip deflection under 2 kg camera payload, selecting tube diameter and wall thickness for optimal strength-to-weight ratio"
    ],
    "learningOutcomes": [
      "Calculate normal stress and strain under axial loading and understand material stress-strain relationships",
      "Analyze statically determinate structures and predict reactions under various loading conditions",
      "Construct shear force and bending moment diagrams for complex beam loading and identify critical sections",
      "Apply the flexure formula (σ = Mc/I) to calculate maximum bending stress and predict failure locations",
      "Analyze shear stresses in beams and design connections to safely transmit transverse loads",
      "Calculate torsional stresses (τ = Tr/J) and angles of twist for circular and non-circular shafts",
      "Perform deflection analysis to ensure structural precision for robot positioning accuracy",
      "Apply combined stress analysis and use Mohr's circle for complex multi-axial stress states",
      "Understand material failure criteria (yield, fracture, fatigue) and apply to design with appropriate safety factors",
      "Analyze anisotropic composite materials and optimize fiber orientation for multiple load directions",
      "Design optimal cross-sections balancing weight, stiffness, and strength for robotics applications",
      "Use finite element analysis (FEA) to predict stress distributions in complex structures beyond hand calculations",
      "Analyze vibration and natural frequencies to prevent resonance-induced failures",
      "Apply fatigue design principles for high-cycle robot components experiencing millions of load cycles",
      "Design joints and connections considering stress concentration effects",
      "Select appropriate materials (steel, aluminum, composites) and geometric configurations for specific robot applications"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=Q2Wn02VFvOA",
        "https://www.youtube.com/watch?v=cMdVzMRWZTk",
        "https://www.youtube.com/watch?v=C-FEVzI8oe8",
        "https://www.youtube.com/watch?v=0PAMHJyFMDw",
        "https://www.youtube.com/watch?v=7U35RRZNFy8",
        "https://www.youtube.com/watch?v=5K27dJqGpf8",
        "https://www.youtube.com/watch?v=fN5np4KzIBE"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67682",
        "https://www.cs.rochester.edu/u/nelson/courses/csc_robocon/robot_manual/materials.html",
        "https://infoscience.epfl.ch/bitstreams/50a0f0a1-e96f-4442-9e54-795513271533/download",
        "https://www.fictiv.com/articles/design-methods-to-improve-torsional-rigidity",
        "https://acpcomposites.com/industrial-robotic",
        "https://www.thephxway.com/the-importance-of-understanding-mechanical-properties/",
        "https://csibangkok.com/knowledge/understanding-material-properties-for-structural-design/"
      ],
      "tools": [
        "ANSYS Mechanical (finite element analysis for stress prediction)",
        "SolidWorks Simulation (integrated FEA with CAD)",
        "CATIA (parametric composite design)",
        "MATLAB (beam analysis, optimization scripts)",
        "Beam calculators (quick design verification)",
        "Strain gauges (experimental stress measurement)",
        "MeshLab/Gmsh (mesh generation for FEA)",
        "Python with NumPy/SciPy (custom stress analysis)"
      ]
    }
  }
}
,
  {
  "id": "engr-152",
  "code": "ENGR 152",
  "name": "The Physics of Energy",
  "fullName": "ENGR 152: The Physics of Energy",
  "description": "Comprehensive course on energy physics covering thermodynamics fundamentals, energy conversion principles, storage mechanisms, power electronics, renewable energy systems, and efficiency analysis. Students apply physics principles to design and optimize energy systems for robotics, understanding battery chemistry and thermal management, power conversion (AC/DC), and the tradeoffs between energy density, power delivery, and system efficiency—essential for autonomous systems with constrained power budgets.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "The Physics of Energy is critical for Embedded Systems & Robotics Engineering because every robot is fundamentally an energy management system: a battery stores potential chemical energy; power electronics convert it to the right voltage/current for actuators and sensors; actuators (motors, solenoids, heaters) convert electrical energy to mechanical/thermal work; and sensing/computing dissipates heat. Unlike abstract physics courses, this Tier 2 engineering course emphasizes practical constraints: robots operate on finite battery capacity (energy measured in Wh = Watt-hours); every watt of power dissipation reduces operating time inversely (doubling power consumption halves mission duration); and thermal limits directly constrain performance (Li-ion batteries lose 20% lifetime capacity when operating 10°C above optimal temperature, 50% when 25°C above). Modern autonomous robots face a critical tradeoff: more powerful processors enable better perception/autonomy but consume more power, reducing flight/runtime; smaller, efficient designs sacrifice computational capability but extend mission time. Engineers need deep physics understanding to navigate these tradeoffs: understanding why DC power is 40% more efficient than AC for battery-powered systems (no inversion losses), calculating battery thermal management requirements to prevent catastrophic thermal runaway (exothermic runaway at 200°C+ in Li-ion cells), predicting system runtime from battery capacity and average power draw, and designing power budgets that meet mission requirements. Real robots demand this expertise: a search-and-rescue UAV has 20-min flight time but needs 2-hour continuous operation → engineers must optimize every component's efficiency, implement predictive power throttling, and possibly carry extra batteries; an autonomous warehouse robot needs to operate for 8-hour shifts on single charge → systematic energy optimization (efficient motors, BLDC instead of brushed, optimized gearing, lightweight construction) translates to avoiding mid-shift recharge downtime. This course teaches engineers the physics laws governing energy (conservation of energy, second law of thermodynamics limiting efficiency to less than Carnot limit), modern energy storage (why Li-ion batteries dominate through high energy density despite thermal challenges, why supercapacitors are superior for high-power transient applications despite lower total energy), and power conversion (why PWM switching achieves 95%+ efficiency while linear regulators waste 30-50% as heat). Mastery enables engineers to predict system behavior, optimize designs before expensive prototyping, and troubleshoot real-world failures where thermal/efficiency limits manifest.",
    "realWorldApplications": [
      "Autonomous mobile robot energy system design: calculating total energy budget (motor average power 50W, perception stack 10W, communication 2W, computing 5W = 67W average), determining battery capacity (2-hour runtime = 67W × 2h = 134Wh pack), selecting Li-ion cells (balancing 18650 cells: higher capacity = lower cycle count, smaller form factor), predicting thermal rise during charging (80A charge current in compact battery → thermal runaway risk), implementing BMS (battery management system) with active thermal control (fans, liquid cooling if needed)",
      "UAV propeller and motor efficiency optimization: understanding aerodynamic power requirement (thrust × velocity), calculating motor efficiency maps showing 80% peak efficiency at 6000 RPM, selecting prop design for minimal tip vortex losses, implementing PWM speed control to operate motors near peak efficiency vs. full throttle (20% efficiency improvement = 50% longer flight time with same battery)",
      "Power system for humanoid robot: sizing 48V DC bus to eliminate AC conversion losses, implementing DC/DC converters for different voltage rails (5V for logic, 12V for fans, 24V for heavy actuators), predicting total system efficiency from component cascade (battery 98% → BMS 99% → converter 95% → motor 85% = ~79% overall), designing UPS (uninterruptible power supply) with supercapacitors for graceful shutdown when main battery depleted",
      "Battery thermal management for continuous-duty robots: modeling battery as thermal capacitance (time constant 30min), predicting steady-state temperature rise from I²R losses during 8-hour shift, selecting cooling strategy (passive fins add 300g but reduce steady-state 15°C, active fans add 20W drain but enable compact lightweight battery), validating design prevents reaching 60°C upper safe limit",
      "Hybrid energy storage for peak power shaving: analyzing robot motion profile (peak acceleration = 500W for 2sec, then cruise = 50W for 58sec), recognizing Li-ion batteries inefficient at high discharge rates (50A pulse = high resistance loss), implementing supercapacitor hybrid (supercap stores regenerative braking energy and supplies acceleration peaks at 95% efficiency, Li-ion supplies steady-state cruise), achieving 25% energy consumption reduction"
    ],
    "learningOutcomes": [
      "Master thermodynamic fundamentals: understand first law (conservation of energy: dU = Q - W), second law (entropy always increases; Carnot limit proves no engine can exceed ηCarnot = 1 - Tc/Th), and apply to real systems; calculate maximum theoretical efficiency and identify why real systems always underperform",
      "Analyze energy conversion pathways: trace energy transformations from source (battery chemical potential) through conversion (power electronics), actuation (motor mechanical work), and dissipation (heat); calculate round-trip efficiency for each stage and overall system efficiency",
      "Understand battery electrochemistry and thermal management: recognize lithium-ion energy density advantage (250Wh/kg) and thermal limitations (optimal 25°C, linear lifetime loss with temperature), calculate state-of-charge (SOC) and depth-of-discharge (DOD), predict thermal runaway conditions and mitigation strategies (BMS, thermal vents, liquid cooling)",
      "Design power electronics systems: understand rectifiers (AC→DC conversion with diodes), inverters (DC→AC with PWM switching using IGBTs/MOSFETs), DC/DC converters (buck/boost topologies); calculate efficiency including switching losses and conduction losses; select topologies for 95%+ efficiency",
      "Optimize motor efficiency: understand motor efficiency maps (peak efficiency at mid-range torque/speed), calculate mechanical power output vs. electrical input, design speed/load profiles to maximize average efficiency, implement variable-speed control (PWM or frequency) to reduce energy consumption by 20-30% vs. fixed-speed operation",
      "Calculate energy budgets and runtime: sum power consumption across subsystems (motors, processors, sensors, communication); estimate average power during mission profile; predict battery runtime (Wh/W_avg); validate against mission requirements; identify power reduction opportunities",
      "Apply renewable energy principles: understand solar (photovoltaic effect, panel efficiency 15-20%, weather/angle dependence), wind (kinetic energy in air, Betz limit 59%, turbulence), and other sources; calculate available power in specific environments; integrate with battery systems for extended mission duration",
      "Perform system-level energy optimization: balance competing constraints (power vs. runtime, weight vs. thermal dissipation, cost vs. efficiency); understand efficiency curves and operating points; use simulation to predict thermal/electrical behavior under transient conditions; validate designs through prototyping and testing",
      "Design energy management strategies: implement firmware-level power throttling (reduce CPU clock when thermal limit approached), dynamic voltage and frequency scaling (DVFS) to minimize power while meeting performance targets, regenerative braking capture for mobile robots, priority-based power allocation (critical systems never power-throttled)"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=kd_6bwynBj8 - MIT 3.020: Lecture 1 Introduction to Thermodynamics (49:30)",
        "https://www.youtube.com/watch?v=T-sQdpebRH4 - AC and DC Conversion with Rectifiers and Inverters (7:08)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/3-020-thermodynamics-of-materials-spring-2021/ - MIT 3.020: Thermodynamics of Materials",
        "https://itspubs.ucdavis.edu/download_pdf.php?id=1366 - UC Davis: Fuel Cell Powered Vehicles Using Supercapacitors",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC12794804/ - Thermal Management of Lithium-Ion Batteries (2026)",
        "https://www.science.org/doi/10.1126/scirobotics.adj7246 - Science Robotics: Elastic Energy-Recycling Actuators",
        "https://www.gtake.com/industry-news/what-is-the-difference-between-a-rectifier-and-an-inverter/ - GTAKE: Rectifiers vs. Inverters",
        "https://pressbooks.bccampus.ca/universityphysicssandboxbook1/chapter/sources-of-energy/ - University Physics: Sources of Energy",
        "https://www.ijfmr.com/papers/2024/3/15371.pdf - Renewable Energy Physics (2024)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC11858843/ - CNN Applications in Energy Systems"
      ],
      "tools": [
        "MATLAB + SimPowerSystems",
        "LTspice",
        "COMSOL Multiphysics",
        "Python scipy + numpy",
        "Commercial battery simulation tools",
        "Energy monitoring hardware",
        "Motor characterization tools",
        "Power distribution design tools",
        "CFD for thermal analysis",
        "Renewable energy simulation"
      ]
    }
  }
}
,
];

export const tier3Courses: TierCourse[] = [
  {
  "id": "ee--160",
  "code": "EE 160",
  "name": "Electric Power Systems",
  "fullName": "EE 160: Electric Power Systems",
  "description": "Comprehensive study of electric power generation, transmission, and distribution systems. Covers three-phase AC power, phasor analysis, transformers, transmission lines, power flow analysis, and fault analysis. Emphasizes practical grid design with focus on microgrids, distributed energy resources, and DC power systems for autonomous robot networks and embedded applications.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric power systems knowledge enables embedded systems engineers to design networked robot ecosystems with distributed power management. Understanding three-phase AC power, phasor analysis, and grid dynamics is essential for designing charging infrastructure for robot fleets operating in facilities or remote locations. Knowledge of microgrids enables creation of autonomous robot teams operating independently from main utility grids—critical for disaster response, agriculture, and space applications. Engineers skilled in power systems can design resilient robot charging networks that continue operating if primary grid fails, implement smart charging algorithms that arbitrage energy prices, and integrate renewable generation (solar, wind) into robot operations. Understanding transformer design, transmission line calculations, and fault analysis enables proper specification of robot charging systems with appropriate safety margins and fault tolerance. Modern robotics increasingly migrates from legacy AC to DC distribution systems (48V, 100V)—knowledge of DC microgrid control, battery management, and power electronics enables this transition. Advanced expertise in power systems distinguishes engineers capable of designing entire autonomous ecosystems where robot teams operate with minimal human intervention for extended periods.",
    "realWorldApplications": [
      "Designing warehouse robot charging microgrid: 480V 3-phase AC from utility → 48V DC distribution bus, calculating voltage regulation across distributed charging pads serving 100+ collaborative robots, implementing EMS to optimize charging during low-demand (cheap) periods",
      "Analyzing three-phase fault conditions: line-to-ground fault at charging station → calculating fault current (kA level) and circuit breaker rating, ensuring safe equipment protection and robot isolation during faults",
      "Building autonomous robot fleet solar microgrid: 10 kW solar array (DC generation) → 48V DC bus → battery storage for night operation, designing voltage regulation to maintain 48±2V across dynamic robot charging loads",
      "Implementing energy management system for robot swarm: real-time power flow optimization—charging robots from cheapest source (solar > battery > grid), load balancing across available chargers, estimating mission endurance based on available energy",
      "Designing transmission line from solar farm to robot base station: calculating voltage drop (< 3%), power loss (< 5%), selecting appropriate wire gauge for 10 kW, 2 km distance, optimizing for cost/efficiency",
      "Modeling robot team phasor representation: treating each robot charging circuit as load impedance, analyzing collective reactive power demand, designing power factor correction if needed (capacitor banks)",
      "Performing short-circuit analysis at charging hub: coordinating protection devices (circuit breakers, fuses) to clear faults rapidly while isolating minimal system components, ensuring remaining robots continue charging",
      "Implementing grid-connected robot charging with V2G (Vehicle-to-Grid): enabling robot batteries to discharge back to facility grid during peak demand, earning energy arbitrage revenue while maintaining operational capability"
    ],
    "learningOutcomes": [
      "Understand three-phase AC generation and explain advantages over single-phase for power distribution",
      "Represent AC voltages and currents as phasors and perform AC circuit analysis using phasor techniques",
      "Calculate three-phase power (real, reactive, apparent) and power factor for balanced and unbalanced systems",
      "Analyze transformers and design voltage transformation for multi-level power distribution",
      "Model transmission lines and calculate voltage regulation, power loss, and efficiency",
      "Perform power flow analysis on distribution networks and identify congestion points",
      "Analyze three-phase and single-phase fault conditions and calculate fault currents",
      "Design protection schemes with circuit breakers and relays appropriate for fault levels",
      "Understand microgrid architecture and control for autonomous islanded operation",
      "Design and analyze DC power distribution systems for robot charging networks",
      "Implement energy management algorithms for optimal dispatch of generation and storage",
      "Apply renewable energy integration into power systems with battery storage",
      "Use power systems analysis software (MATLAB, ETAP, PowerWorld) for system design",
      "Understand grid interconnection requirements and synchronization procedures"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=EzDs6jPrpFw",
        "https://www.youtube.com/watch?v=c9gm_NL7KyE",
        "https://www.youtube.com/watch?v=qTki2L-ANss",
        "https://www.youtube.com/watch?v=SHEKKTpwIa8",
        "https://www.youtube.com/watch?v=4oRT7PoXSS0",
        "https://www.youtube.com/watch?v=iQxbMt0t_6U",
        "https://www.youtube.com/watch?v=9BZ_hSndQyw"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69991",
        "https://www.mouser.com/applications/rise-of-dc-microgrids/",
        "https://www.coursera.org/learn/electric-power-systems",
        "https://www.nrel.gov/grid/microgrid-controls",
        "https://engineering.purdue.edu/~kekatos/pdsa/Lecture1.pdf",
        "https://selinc.com/services/microgrids-power-management/microgrid-control-systems/",
        "https://martinenergygroup.com/why-microgrids-need-batteries/"
      ],
      "tools": [
        "MATLAB/Simulink (power systems simulation)",
        "ETAP (electrical transient analysis program for power systems)",
        "PowerWorld (power flow and transient stability analysis)",
        "DIgSILENT PowerFactory (comprehensive grid simulation)",
        "PSCAD (electromagnetic transient simulation)",
        "Python with PyPower (open-source power flow analysis)",
        "Circuit simulators (LTSpice for component-level power analysis)"
      ]
    }
  }
}
,
  {
  "id": "ee-188",
  "code": "EE 188",
  "name": "Electric Vehicle Design",
  "fullName": "EE 188: Electric Vehicle Design",
  "description": "Capstone integration course synthesizing electrical, mechanical, thermal, and software systems to design complete autonomous electric vehicles. Students design end-to-end EV powertrains including battery management systems (BMS), motor controllers with field-oriented control (FOC), power electronics inverters, thermal management, regenerative braking, and autonomous perception-planning-control stacks. This Tier 3 capstone integrates all prior coursework into real-world autonomous system design with safety-critical reliability requirements.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric Vehicle Design is the Tier 3 capstone integration course for Embedded Systems & Robotics Engineering, synthesizing knowledge from circuits (EE 101/111), control systems (EE 122), electrical machines (EE 130), digital communications (EE 150), fluid mechanics (ENGR 120), heat transfer (ENGR 135), energy physics (ENGR 152), autonomous vehicles (EE 180), and machine learning (ENGR 145) into a complete real-world system. Unlike specialized courses covering individual subsystems, this capstone requires students to design holistic EV architectures where every component interacts with others: battery pack sizing directly affects thermal management requirements, which determines cooling system design and power budget; motor efficiency curves drive powertrain efficiency targets; inverter switching frequency affects electromagnetic interference and efficiency; thermal limits constrain performance; and autonomous perception quality determines control safety margins. Modern electric vehicles represent humanity's most complex mass-produced engineering systems: a Tesla Model 3 contains ~150,000 lines of code (comparable to F-35 fighter jet), integrates 30+ computer processors, manages 8,000+ individual battery cells, coordinates 5+ motor controllers (main drive motor, 4 wheel motors in AWD variants), implements redundant safety systems for Level 3+ autonomy, and must operate reliably across -40°C to +80°C ambient ranges. This course teaches students that EV design is fundamentally a systems engineering challenge where local optimization (e.g., maximizing battery energy density) creates global problems (thermal runaway risk requiring active cooling) that ripple through mechanical, electrical, thermal, and software architectures. Real-world examples demonstrate this complexity: Tesla's battery thermal management failure in early Model S caused cache fires (2014-2016); Chevy Bolt's LG battery cells had manufacturing defects causing thermal runaway in 10% of vehicles (2021-2023, $2B recall); autonomous driving failures have caused fatalities where perception mistakes (misclassifying pedestrians as shadows, LiDAR reflections from wet roads) cascaded through planning and control layers. Mastery of this capstone prepares engineers to lead EV/autonomous system programs at companies like Tesla, Waymo, GM, Ford, Volkswagen, and emerging startups—roles typically requiring 5-10 years of automotive industry experience to reach.",
    "realWorldApplications": [
      "Complete Tesla Model 3-scale EV design: sizing 60-75kWh Li-ion battery pack (300-400 cells in series+parallel configuration), selecting PMSM motor (250-350kW peak at 12,000+ RPM), designing 3-phase inverter with SiC MOSFETs (>95% efficiency, 20kHz switching), implementing vector FOC motor control with DSP algorithms, designing thermal management (liquid-cooled battery, motor, power electronics), sizing cooling system (10-15kW capacity), predicting 350-400 mile EPA range, validating 0-60mph in 6-7 seconds within thermal limits",
      "Autonomous driving stack integration: implementing perception pipeline (camera + LiDAR fusion at 30Hz, <100ms latency), SLAM localization (±0.1m accuracy), path planning with collision avoidance, MPC trajectory tracking controller, all running on NVIDIA Jetson with <50W power budget, coordinating with motor controller for smooth acceleration/deceleration profiles that don't exceed 0.2g jerk limits for passenger comfort while maintaining <2° heading error",
      "Battery management system (BMS) design: monitoring 8,000+ cells individually (voltage ±10mV accuracy), estimating state-of-charge to ±5% accuracy using Kalman filtering, predicting thermal runaway 30min in advance, implementing cell balancing (passive resistive or active switched-capacitor), managing 800V+ pack voltage safely with integrated circuit (IC) architectures, communicating with main vehicle controller via CAN bus at 1Mbps, achieving <0.5W quiescent power drain in sleep mode",
      "Regenerative braking system: designing motor-as-generator transition (switching from 300A motor current draw to 150A generator supply in 100ms without user perceiving jerk), implementing back-EMF estimation for sensorless PMSM commutation (eliminating Hall sensor power drain), predicting braking energy recovery (20-30% of total energy on urban cycles), optimizing blend of regenerative + friction braking for safe stops (<-1.0g deceleration), validating battery charging power limits (max 1C rate = 60kWh/hour for peak currents)",
      "Autonomous vehicle reliability and safety: implementing SOTIF (safety of the intended functionality) to prevent level 3 autonomy failures, designing redundant sensor fusion (if camera fails, LiDAR compensates automatically), validating EMC compliance (radiated immunity -40dBm/m for autonomous vehicle microwave sensors doesn't disable AI/ML inference), designing fail-safe thermal throttling (graceful performance degradation at 125°C junction temperature vs. catastrophic shutdown), implementing OTA (over-the-air) firmware update with rollback capability for firmware bugs discovered post-deployment"
    ],
    "learningOutcomes": [
      "Design complete EV powertrain architecture: select battery chemistry (LFP vs. NCA/NCM tradeoffs for energy density vs. thermal stability), size pack capacity for desired range (kWh = range_miles × efficiency_Wh/mile), select motor type (PMSM vs. induction vs. reluctance) matching torque/speed requirements, design inverter topology (3-level neutral point clamped vs. cascaded multilevel) for 95%+ efficiency",
      "Implement battery management system (BMS): design cell monitoring and balancing architecture, estimate state-of-charge (SOC) and state-of-health (SOH) using extended Kalman filters, predict thermal runaway conditions using equivalent circuit battery models, implement cell voltage equalization (active or passive), manage 800V+ pack voltage with safety protocols",
      "Design motor control with field-oriented control (FOC): understand Clarke/Park transformations mapping 3-phase AC to 2-axis (d,q) representation, implement PI controllers for flux and torque loops independently, design PWM current controllers with hysteresis bands, implement sensorless back-EMF commutation (eliminating Hall sensor cost/power), achieve smooth acceleration profiles with <200ms torque response time",
      "Optimize regenerative braking: design motor-generator transition without jerk <0.1g, predict energy recovery potential (20-30% on urban cycles), optimize battery charging power limits during regenerative braking, implement blend algorithms combining regenerative + friction braking for safe deceleration",
      "Design thermal management systems: integrate battery thermal management (BTMS), motor thermal management, power electronics cooling, and HVAC for cabin comfort; apply model predictive control (MPC) for optimal cooling/heating; design redundant cooling (dual fans for failsafe), achieving ±5°C battery temperature variation across pack",
      "Implement autonomous vehicle perception-planning-control stack: integrate LiDAR + camera + radar sensor fusion (30Hz update rate, <100ms latency), design SLAM for localization (±0.1m accuracy in GPS-denied environments), implement sampling-based path planning (RRT*) with dynamic replanning when obstacles detected, design MPC trajectory tracking with constrained optimization (acceleration, jerk, curvature limits)",
      "Manage vehicle power distribution: design 12V auxiliary bus with power sequencing, implement nested loop-back protection (isolation of failed modules), coordinate motor controller, BMS, HVAC, lighting, and infotainment on shared CAN bus, handle mode transitions (Park → Drive → Reverse) safely with torque priority arbitration",
      "Design for safety and reliability: implement SOTIF (functional safety without safe failure modes), design redundant sensors for autonomous safety-critical functions, validate EMC compliance (electromagnetic compatibility with onboard wireless/autonomous sensors), design fail-safe thermal throttling vs. catastrophic shutdown, implement OTA updates with rollback",
      "Optimize total system efficiency: trace energy flows from battery → motor losses → drivetrain losses → wheel power, calculate end-to-end efficiency (typically 75-85% on highway cycles), identify optimization bottlenecks (e.g., motor efficiency 3-5% lower at low speed → implement multi-speed transmission for EVs), balance competing constraints (range vs. performance vs. cost vs. weight)"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=1L0TKZQcUtA - MIT 6.S094: Introduction to Deep Learning and Self-Driving Cars (1:18:37)",
        "https://www.youtube.com/watch?v=Lgka_EgCtnY - Stanford Seminar: Safe and Robust Perception-Based Control (1:12:15)",
        "https://www.youtube.com/watch?v=Qkjd3q5ZZOs - IPAM: Interaction-Aware Planning for Autonomous Driving (49:16)",
        "https://www.youtube.com/watch?v=VvoKJ6xvssQ - Stanford EE259: Principles of Sensing for Autonomy I (1+ hours)"
      ],
      "websites": [
        "https://neet.mit.edu/threads/am - MIT NEET: Autonomous Machines Thread",
        "https://ee259.stanford.edu - Stanford EE259: Principles of Sensing for Autonomy",
        "https://robots.stanford.edu/cs294/index.html - Stanford CS 294: Robotics Cars for Real People",
        "https://vnav.mit.edu/ - MIT 16.485: Visual Navigation for Autonomous Vehicles",
        "https://www.powerelectronicsnews.com/designing-safer-battery-management-systems-for-electric-vehicles-with-simulation/ - Power Electronics News: BMS Design for EVs",
        "https://www.newark.com/revolutionizing-electric-vehicles-innovations-in-motor-control-systems-trc-ar - Newark: EV Motor Control Systems",
        "https://stellarix.com/insights/articles/battery-management-system-for-electric-vehicles/ - Stellarix: BMS for EVs",
        "https://www.calatherm.com/why-thermal-management-systems-are-critical-for-battery-life-and-performance-in-electric-vehicles/ - CalaTHERM: Thermal Management for EV Batteries"
      ],
      "tools": [
        "MATLAB + Simulink",
        "CARLA Simulator",
        "ROS (Robot Operating System)",
        "AUTOSAR",
        "ANSYS",
        "dSPACE or National Instruments",
        "Open source tools (OpenFOAM, GNU Octave, Python)",
        "Vehicle telemetry platforms",
        "AI/ML frameworks (PyTorch, TensorFlow)",
        "Safety/verification tools (SOTIF, formal methods)"
      ]
    }
  }
}
,
  {
  "id": "engr--143",
  "code": "ENGR 143",
  "name": "Statistical Quality Control",
  "fullName": "ENGR 143: Statistical Quality Control",
  "description": "Comprehensive study of statistical methods for process control, quality assurance, and continuous improvement. Covers control charts, process capability analysis, Six Sigma DMAIC methodology, and quality design. Emphasizes practical manufacturing applications including automated inspection, defect prevention, and root cause analysis for reliable robot production at scale.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Statistical quality control transforms manufacturing from accepting defects as inevitable to systematically preventing them through data-driven decisions. Embedded systems engineers leading robot production must understand control charts to detect when manufacturing processes drift out of specification—catching problems before they cascade into thousands of defective units. Mastery of Six Sigma DMAIC methodology enables engineers to systematically identify root causes of quality problems, implement targeted solutions, and sustain improvements through control measures. Understanding process capability (Cp/Cpk indices) determines whether designs are feasible to manufacture with acceptable quality—designs with Cpk < 1.33 will inevitably produce defective units regardless of operator skill. Knowledge of Jidoka principles enables autonomous production systems that detect and stop defects immediately, preventing waste propagation. As robotics manufacturing scales from research prototypes to production of thousands of units annually, statistical quality control transforms from optional to essential—the difference between reputation-damaging product failures and reliable systems customers trust. Advanced expertise in quality control distinguishes manufacturing engineers capable of designing and operating production systems that deliver consistent, defect-free robots at competitive cost.",
    "realWorldApplications": [
      "Implementing X-bar/R control chart on motor bearing friction: sampling every 50th unit, establishing control limits from pilot production (30 units), detecting bearing vendor quality degradation when 3 consecutive points exceed +2σ limit, triggering root cause investigation before thousands of defective motors produced",
      "Applying Six Sigma DMAIC to reduce robot arm deflection variation: Define (customer complaint: consistency 50% worse than spec) → Measure (current σ = 5mm vs. spec ±1mm, Cpk=0.85) → Analyze (root cause: weld penetration inconsistent) → Improve (upgrade welder, new procedure) → Control (new Cpk=1.67, process sustained through SPC)",
      "Designing automated vision inspection for PCB assembly: 99.9% accuracy defect detection vs. 92% manual inspection, analyzing real-time defects per million (DPM), implementing Andon system to stop line when defect detected, preventing waste of expensive components downstream",
      "Establishing process capability baseline before production launch: pilot production run 100 robots, measure critical dimension (motor shaft runout, sensor accuracy), calculate Cpk for each parameter, verify Cpk > 1.33 before full production release",
      "Implementing Jidoka on robot arm assembly line: pressure sensor detects incomplete joint tightening, production stops automatically, operator investigates, root cause identified (torque wrench miscalibrated), corrective action implemented, prevents future defects",
      "Conducting incoming acceptance sampling for supplier motors: randomized sampling 50 units from 10,000 unit lot, measuring torque/speed curve compliance, rejecting lot if > 2% defective to prevent introduction of poor-quality components",
      "Analyzing sensor quality trend: temperature sensor accuracy degrading over 6-month production run detected by control chart, slope increasing toward out-of-control condition, proactive vendor contact prevents widespread field failures",
      "Implementing AI-powered defect detection: deep learning trained on labeled defect images (cracks, misalignment, contamination), deployed on production line inspecting 100% of robot units in real-time, flagging anomalies for human verification, achieving 99.8% detection rate"
    ],
    "learningOutcomes": [
      "Distinguish between common cause and special cause variation in manufacturing processes",
      "Construct and interpret X-bar/R, X-bar/S, and p-chart control charts",
      "Establish statistically valid control limits based on process data (not specifications)",
      "Identify out-of-control signals including points beyond limits, runs, trends, and patterns",
      "Calculate process capability indices (Cp, Cpk, Pp, Ppk) and assess process conformance",
      "Determine minimum sample size and sampling frequency for valid SPC",
      "Apply Six Sigma DMAIC methodology to systematically improve manufacturing processes",
      "Conduct root cause analysis using 5 Whys, Fishbone diagrams, and Pareto analysis",
      "Design measurement systems with adequate resolution, repeatability, and reproducibility (GR&R)",
      "Apply Jidoka principles to create autonomous quality detection and response systems",
      "Implement acceptance sampling plans (AQL, LTPD, OC curves) for supplier quality assurance",
      "Use statistical software (Minitab, SAS, Python) for SPC analysis and visualization",
      "Design automated inspection systems using machine vision and sensors for 100% product inspection",
      "Establish quality control plans with alarm thresholds and corrective action triggers",
      "Analyze quality cost trade-offs: prevention vs. detection vs. failure costs"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=Aj7lJLR-7b4",
        "https://www.youtube.com/watch?v=UT9leDiMpDQ",
        "https://www.youtube.com/watch?v=WBgR0rpSn6I",
        "https://www.youtube.com/watch?v=vYHXXw-Uupo",
        "https://www.youtube.com/watch?v=omsDVexPYUU",
        "https://www.youtube.com/watch?v=iLVG9XQGqII",
        "https://www.youtube.com/watch?v=Zz0fASpSqVA"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69945",
        "https://asq.org/quality-resources/statistical-process-control",
        "https://www.invensislearning.com/blog/spc-charts-guide/",
        "https://www.fictiv.com/articles/six-sigma-in-manufacturing",
        "https://www.sixsigmaonline.org/jidoka-lean-six-sigma/",
        "https://investigationsquality.com/2025/04/08/statistical-process-control-spc-methodology-tools-and-strategic-application/",
        "https://www.engineering.com/quality-automation-the-role-robotics-and-sensors-play-in-quality-control-and-production/"
      ],
      "tools": [
        "Minitab (industry-standard SPC software)",
        "JMP (SAS subsidiary, advanced statistics)",
        "SAS (enterprise quality management)",
        "Python with scipy, pandas, matplotlib (open-source SPC)",
        "R with qcc package (statistical quality control)",
        "Machine vision software (OpenCV, Basler, Cognex)",
        "Data acquisition and logging systems",
        "Statistical calculators for Cp/Cpk, OC curves"
      ]
    }
  }
}
,
  {
  "id": "engr--180",
  "code": "ENGR 180",
  "name": "Spatial Analysis and Modeling",
  "fullName": "ENGR 180: Spatial Analysis and Modeling",
  "description": "Comprehensive study of spatial representations, coordinate transformations, and three-dimensional geometric modeling for robotics and autonomous systems. Covers homogeneous transformation matrices, kinematic chains, simultaneous localization and mapping (SLAM), 3D scene representation, and spatial reasoning. Emphasizes practical applications in robot navigation, manipulation, and environment perception.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Spatial analysis and modeling is the mathematical-computational foundation enabling robots to understand their 3D world and their position within it. Embedded systems engineers must master homogeneous transformation matrices to solve forward and inverse kinematics—calculating end-effector positions from joint angles and vice versa, enabling precise manipulation. Understanding coordinate frames and transformations between them enables seamless integration of multiple sensor inputs (camera, LiDAR, IMU) each with their own reference frames. SLAM (simultaneous localization and mapping) knowledge enables autonomous robots to build environmental maps while localizing themselves—essential for GPS-denied indoor/underground/underwater operations. Advanced spatial representations (point clouds, voxels, neural radiance fields) enable sophisticated perception for obstacle avoidance, object manipulation, and semantic scene understanding. Engineers mastering spatial modeling can design robots that navigate complex environments, manipulate objects with precision, and collaboratively interact with humans and other robots in shared workspaces. This is the bridge between theoretical robotics and practical autonomous systems—where mathematics meets perception and action.",
    "realWorldApplications": [
      "Calculating forward kinematics for 6-DOF robot arm: homogeneous transformation matrices combine rotations/translations of each joint, predicting end-effector position (x, y, z, roll, pitch, yaw) from joint angles for precise object manipulation at 0.1mm accuracy",
      "Implementing ORB-SLAM visual navigation for autonomous mobile robot: tracking ORB features across camera frames, estimating camera pose (rotation + translation), incrementally building 3D point cloud map while localizing robot in GPS-denied warehouse",
      "Designing multi-sensor coordinate frame fusion: LiDAR frame → robot base frame → world frame transformations allow real-time obstacle detection 10 meters ahead while robot accelerates through warehouse",
      "Building dense 3D reconstruction for pick-and-place task: RGB camera captures bin contents, 3D CNN processes image to depth map, point cloud identifies object pose (position + orientation), transforms to robot gripper frame for accurate grasping",
      "Performing inverse kinematics solution for reaching target position: given desired end-effector (x, y, z) and orientation (roll, pitch, yaw), solving 6 nonlinear equations for joint angles using Jacobian pseudo-inverse with singularity avoidance",
      "Implementing loop closure in SLAM: detecting previously visited locations by matching visual features, adjusting all historical poses and map points to correct accumulated drift, maintaining < 1% position error over 1 km trajectory",
      "Generating occupancy grid from LiDAR point cloud: voxelizing 3D points, marking free/occupied cells, enabling path planning algorithms to find collision-free routes through 100,000 voxel environment",
      "Fusing IMU + visual odometry for inertial navigation: gyroscope provides high-frequency angular velocity, camera provides low-drift position estimates, Kalman filter combines both for accurate trajectory estimation without GPS"
    ],
    "learningOutcomes": [
      "Understand and construct homogeneous transformation matrices for translation and rotation transformations",
      "Perform forward kinematics calculations to determine end-effector position from joint angles",
      "Solve inverse kinematics using Jacobian and geometric methods for robotic manipulators",
      "Work with multiple coordinate frames and perform frame transformations between them",
      "Represent 3D rotations using rotation matrices, Euler angles, quaternions, and axis-angle representations",
      "Understand SLAM (simultaneous localization and mapping) algorithms and their applications",
      "Implement visual odometry for ego-motion estimation from image sequences",
      "Design and work with 3D spatial representations: point clouds, voxel grids, meshes",
      "Apply depth estimation and 3D reconstruction from camera images",
      "Understand loop closure detection and map optimization in SLAM systems",
      "Design map representations suitable for different robot tasks (navigation, manipulation, planning)",
      "Implement coordinate transformations between sensor frames and robot frames",
      "Apply graph-based optimization for multi-robot localization and mapping",
      "Understand trajectory planning and obstacle avoidance in 3D environments"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=_A4twZR608o",
        "https://www.youtube.com/watch?v=XtNDsYrQPuo",
        "https://www.youtube.com/watch?v=4Y1_y9DI_Hw",
        "https://www.youtube.com/watch?v=QFTLH1C-9Qg",
        "https://www.youtube.com/watch?v=ExFcb_d9Ilo",
        "https://www.youtube.com/watch?v=Ucz-L1yh9Yk",
        "https://www.youtube.com/watch?v=6tmDxTAjux0"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67688",
        "https://opentextbooks.clemson.edu/wangrobotics/chapter/forward-kinematics/",
        "https://www.flyability.com/blog/simultaneous-localization-and-mapping",
        "https://milvus.io/ai-quick-reference/how-do-robots-use-slam-simultaneous-localization-and-mapping-algorithms-for-navigation",
        "https://news.mit.edu/2025/teaching-robots-to-map-large-environments-1105",
        "https://developer.nvidia.com/blog/r2d2-building-ai-based-3d-robot-perception-and-mapping-with-nvidia-research/",
        "https://www.ri.cmu.edu/pub_files/pub3/muir_patrick_1986_1/muir_patrick_1986_1.pdf"
      ],
      "tools": [
        "Kinematics libraries (PyKDL, IKPy, Sympy for symbolic computation)",
        "SLAM frameworks (ORB-SLAM3, FAST-LIO2, Cartographer)",
        "3D visualization (Open3D, PyVista, ROS RViz)",
        "Point cloud processing (PCL, CloudCompare, Open3D)",
        "Robot simulation (Gazebo, MuJoCo, PyBullet)",
        "MATLAB Robotics Toolbox",
        "ROS (Robot Operating System) packages",
        "Computer vision libraries (OpenCV, scikit-image, TensorFlow)"
      ]
    }
  }
}
,
];

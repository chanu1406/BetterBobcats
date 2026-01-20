/**
 * Controls & Automation Tier Courses Data
 * Course recommendations organized by tier for Controls & Automation career path
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
  "id": "ee-101-circuit-design-1",
  "code": "EE 101",
  "name": "Electronic Circuit Design I",
  "fullName": "EE 101: Electronic Circuit Design I",
  "description": "Foundational course covering essential circuit components (resistors, capacitors, inductors, diodes, transistors) and circuit analysis. Critical for control systems engineers as it provides the fundamental building blocks needed to design signal conditioning circuits, sensor interfaces, and control hardware that manage real-world physical systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For Control Systems & Automation engineers, EE 101 is essential because control systems rely on precise circuit designs to interface with sensors, actuators, and microcontrollers. Understanding passive and active components enables engineers to design filter circuits for signal processing, protection circuits for sensitive equipment, and amplification stages for sensor signals—all critical for stable closed-loop control systems in industrial automation, robotics, and embedded systems. This course lays the groundwork for designing feedback control circuits and real-world hardware implementations.",
    "realWorldApplications": [
      "Designing signal conditioning circuits in PLC (Programmable Logic Controller) systems that interface industrial sensors to digital controllers",
      "Creating filter and amplifier circuits for servo motor feedback signals in robotic control systems",
      "Implementing reverse polarity and overvoltage protection circuits in automated manufacturing equipment",
      "Designing power distribution and voltage regulation circuits for control modules in autonomous vehicles",
      "Building analog-to-digital (ADC) interface circuits in control systems for real-time sensor data acquisition",
      "Developing stabilization circuits for long-distance control signal transmission in process automation"
    ],
    "learningOutcomes": [
      "Understand fundamental electrical principles: voltage, current, resistance, and their relationships (Ohm's Law)",
      "Analyze and design circuits using passive components (resistors, capacitors, inductors) and active components (diodes, transistors)",
      "Apply circuit analysis techniques (nodal analysis, mesh analysis, Thevenin's theorem) to solve complex networks",
      "Design and optimize circuits for specific performance requirements: voltage levels, frequency response, power efficiency",
      "Simulate circuits using industry-standard SPICE tools to validate behavior before physical prototyping",
      "Understand transistor operation as switches and amplifiers—critical for control signal processing",
      "Design protection circuits and implement robust circuit layouts for reliability in industrial environments"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=9-BnUHeyfAs - Circuit Components Overview: Resistor, Capacitor, Transistor & More (44:57)",
        "https://www.youtube.com/watch?v=7jiKULI0iB4 - How To Use LTspice, A Free Circuit Simulator (20:53)",
        "https://www.youtube.com/watch?v=I6arUTJ045w - Practical Electronics & Circuits 101 – Intro to Transistors (31:35)",
        "https://www.youtube.com/watch?v=37 - A Beginner's Guide to Resistors, Capacitors, Inductors, Diodes, and Transistors (25:28)",
        "https://www.youtube.com/watch?v=p7ERJV6JnZ4 - Multisim Circuit Design Tutorial Series for Beginners (5:43)"
      ],
      "websites": [
        "https://learn.sparkfun.com/tutorials/getting-started-with-ltspice/all - SparkFun LTspice Getting Started Guide",
        "https://youspice.com/getting-started-with-ltspice/ - YouSpice LTspice Tutorial with practical examples",
        "https://www.ni.com/en/shop/electronic-test-instrumentation/application-software-for-electronic-test-and-instrumentation-category - National Instruments SPICE Simulation Fundamentals Series",
        "https://www.protoexpress.com/blog/best-electronic-circuit-design-practices/ - Sierra Circuits: Best Electronic Circuit Design Practices",
        "https://discoveryengineering.net/blog/circuit-design/ - Comprehensive Guide to Circuit Design in Electrical Engineering"
      ],
      "tools": [
        "LTspice (free SPICE simulator by Analog Devices) - Industry-standard for circuit simulation with extensive component libraries",
        "Multisim (NI) - User-friendly graphical circuit design and simulation platform with real-time measurements",
        "KiCad (open-source) - Integrated SPICE simulation with ngspice for schematic design and PCB layout",
        "Falstad Circuit Simulator (online) - Web-based simulator with animated current flow for intuitive circuit understanding",
        "Proteus (professional) - Advanced mixed-signal simulation with PCB design integration",
        "EasyEDA (online) - Cloud-based circuit design with built-in SPICE simulation"
      ]
    }
  }
},

  {
  "id": "ee-102-signal-processing-linear-systems",
  "code": "EE 102",
  "name": "Signal Processing and Linear Systems",
  "fullName": "EE 102: Signal Processing and Linear Systems",
  "description": "Foundation course bridging continuous and discrete signal analysis with linear systems theory, essential for understanding system modeling, frequency-domain analysis, and control design methodologies used in automation engineering.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "This course is the mathematical cornerstone for control systems engineering. Control Systems & Automation professionals must understand how to represent physical systems as transfer functions, analyze system behavior in the frequency domain, and design controllers that meet performance specifications. The Laplace and Z-transforms taught in this course directly enable the design of feedback controllers for PLCs, SCADA systems, and industrial automation hardware. Without proficiency in these signal processing concepts, engineers cannot effectively model physical processes (motors, actuators, sensors) or predict system stability and response characteristics.",
    "realWorldApplications": [
      "Designing digital PID controllers for manufacturing assembly lines using discrete-time systems and Z-transform analysis to ensure precise motor speed and position control with real-time processing",
      "Analyzing SCADA system sensor signals using Fourier transforms to filter noise from temperature and pressure measurements in chemical reactors, enabling reliable feedback for process control",
      "Implementing discrete-time filters on microcontroller-based controllers to process encoder feedback from robotic manipulators, using Z-transform pole-zero placement for fast, stable response",
      "Modeling and simulating linear servo systems using transfer functions and Bode plots to predict closed-loop behavior before deployment in industrial automation equipment",
      "Tuning automation system response by analyzing frequency response characteristics to balance disturbance rejection against noise sensitivity in multi-axis motion control"
    ],
    "learningOutcomes": [
      "Model continuous-time dynamic systems (motors, hydraulic actuators, thermal processes) as differential equations and convert to Laplace-domain transfer functions for analysis",
      "Analyze linear time-invariant (LTI) systems using Fourier and Laplace transforms to decompose signals into frequency components and understand system filtering behavior",
      "Apply Z-transform methods to design and analyze discrete-time systems and digital controllers that run on real-time PLC and embedded control platforms",
      "Construct and interpret Bode plots and frequency response plots to predict system gain, phase shift, and stability margins for feedback control design",
      "Design sampling strategies and understand aliasing effects when converting continuous sensor signals to digital form for real-time control computation",
      "Solve linear constant-coefficient differential and difference equations using transform methods to predict system transient and steady-state behavior"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=vof6rlpeqTg (Controls Systems Lecture 1: The Laplace Transform - introduces the mathematical foundation for system analysis with practical control context)",
        "https://www.youtube.com/watch?v=ZGPtPkTft8g (Brian Douglas: The Laplace Transform - A Graphical Approach - provides intuitive visualization of poles, zeros, and impulse response reconstruction)",
        "https://www.youtube.com/watch?v=V7EPvBVam5E (LeMaster Tech: Intro to Controls and Automation Engineering Full Course - directly connects signal processing to real industrial automation systems)",
        "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/resources/lecture-14-fourier-representations/ (MIT OCW: Lecture 14 - Fourier Representations - rigorous treatment of Fourier decomposition and linear system frequency response)",
        "https://www.youtube.com/watch?v=hTu36q5yx20 (Steve Brunton: Control Bootcamp - Sensitivity and Complementary Sensitivity - connects signal processing concepts to practical robustness and performance specifications)"
      ],
      "websites": [
        "https://ctms.engin.umich.edu/CTMS/index.php?aux=Home (Control Tutorials for MATLAB & Simulink - comprehensive interactive tutorials with transfer function examples and step-by-step analysis)",
        "https://www.mathworks.com/discovery/frequency-response.html (MATLAB Frequency Response Documentation - explains Bode plots, Nyquist plots, and frequency response computation for control systems)",
        "https://en.wikipedia.org/wiki/Z-transform (Z-Transform Reference - technical reference for discrete-time system analysis and digital filter design)",
        "https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/ (MIT Signals and Systems Course - full course materials on continuous and discrete signal processing)"
      ],
      "tools": [
        "MATLAB & Simulink (Control System Toolbox for transfer function creation, Bode plot generation, root locus analysis, and control system simulation)",
        "Python Control Systems Library (scipy.signal for transfer function manipulation and frequency response calculation)",
        "Scilab (open-source alternative with control system functions)",
        "GNU Octave (free MATLAB-compatible environment for signal processing and control system design)"
      ]
    }
  }
},

  {
  "id": "ee-111-circuit-design-2",
  "code": "EE 111",
  "name": "Electronic Circuit Design II",
  "fullName": "EE 111: Electronic Circuit Design II",
  "description": "Advanced analog circuit design focusing on operational amplifiers (op-amps), active filters, and signal conditioning. Essential for control systems engineers as op-amps are the backbone of feedback control circuits, sensor interfaces, and analog signal processing in automation systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For Control Systems & Automation engineers, EE 111 is critical because operational amplifiers are the fundamental building blocks of real-world control systems. Op-amps enable precision signal conditioning from sensors, implement PID controllers in analog form, design filter circuits to remove noise from measurements, and build instrumentation amplifiers for low-level sensor amplification. Understanding active filter design (Sallen-Key topology, Butterworth filters) is essential for anti-aliasing filters in data acquisition systems and feedback signal processing in closed-loop automation. This course bridges discrete component design from EE 101 to integrated control system implementations used in robotics, process automation, and power systems.",
    "realWorldApplications": [
      "Designing PID controller circuits using op-amps for motor speed control in CNC machines and robotic arms",
      "Implementing precision instrumentation amplifiers for strain gauge measurement in structural health monitoring systems",
      "Creating active low-pass and band-pass filters to eliminate noise from thermocouple signals in industrial process control",
      "Designing precision current-to-voltage converters for photodiode sensors in automatic lighting control systems",
      "Building summing and differencing amplifiers for multi-sensor data fusion in autonomous vehicle control",
      "Implementing transimpedance amplifiers for high-speed feedback in servo control systems",
      "Designing Sallen-Key active filters as anti-aliasing filters for analog-to-digital converters in data acquisition",
      "Creating precision voltage comparison circuits (Schmitt triggers) for threshold detection in automation systems"
    ],
    "learningOutcomes": [
      "Master operational amplifier fundamentals: ideal vs. real op-amps, input/output impedance, open-loop gain, slew rate, and bandwidth limitations",
      "Design and analyze inverting amplifiers, non-inverting amplifiers, voltage followers, and unity-gain buffers with calculated gain and impedance specifications",
      "Understand and implement active filter topologies: Sallen-Key low-pass, high-pass, and band-pass filters with Butterworth response",
      "Calculate filter parameters (cutoff frequency, Q factor, attenuation) and design multi-stage cascaded filters for steep frequency response",
      "Design precision instrumentation amplifiers with high common-mode rejection ratio (CMRR) for sensor signal conditioning",
      "Implement mathematical operations: summing amplifiers, differencing amplifiers, integrators, and differentiators for analog signal processing",
      "Analyze frequency response and stability of op-amp circuits, including phase margin and compensation techniques",
      "Understand practical non-idealities: input offset voltage, input bias current, slew rate limiting, and output saturation effects",
      "Simulate and validate active filter designs using SPICE-based tools with realistic component tolerances"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=mB7uLxdx2Bw - Fundamentals of Electronics: Operational Amplifier Circuits Design & Operation (29:35)",
        "https://www.youtube.com/watch?v=Pc9G7aFWn-w - Active Filters: Basics, First Order Low Pass, High Pass, Band Pass (11:23)",
        "https://www.youtube.com/watch?v=o3Le0ek5W1s - Sallen-Key Active Filter: Second Order Filter Design (9:12)",
        "https://www.youtube.com/watch?v=I9pc29rCdEM - How to Design Active Filters Using Sallen Key Circuits (26:19)",
        "https://www.youtube.com/watch?v=FSyJc9khbDk - Understanding and Designing Instrumentation Amplifier (14:42)",
        "https://www.youtube.com/watch?v=jHSHIwIpBKc - Active Filters Using Operational Amplifier (12:08)",
        "https://www.youtube.com/watch?v=rbVlUOHrN04 - Operational Amplifiers (Op-Amps) Explained from Basics (28:44)",
        "https://www.youtube.com/watch?v=o3Ol0PAnUP4 - Active Low-Pass Filter Using an Op-Amp (12:31)"
      ],
      "websites": [
        "https://ocw.mit.edu/ans7870/RES/RES.6-010/MITRES_6-010S13_comchaptrs.pdf - MIT OpenCourseWare: Operational Amplifiers Theory and Practice",
        "https://www.agsdevices.com/operational-amplifier/ - Operational Amplifier Fundamentals: Types, Applications, and Key Parameters",
        "https://www.monolithicpower.com/en/learning/resources/operational-amplifiers - Operational Amplifier Basics, Types and Uses by Monolithic Power Systems",
        "https://en.wikipedia.org/wiki/Operational_amplifier_applications - Comprehensive Overview of Op-Amp Applications",
        "https://www2.seas.gwu.edu/~ece121/Spring-11/filterdesign.pdf - Active Filter Design Techniques (Comprehensive Reference)",
        "https://www.electronics-tutorials.ws/filter/filter_2.html - Passive & Active Filter Circuit Analysis by Electronics Tutorials",
        "https://www.allaboutcircuits.com/technical-articles/an-introduction-to-filters/ - Introduction to Filters: Active vs. Passive Design",
        "https://www.jakelectronics.com/blog/understanding-operational-amplifiers-a-comprehensive-guide - Understanding Operational Amplifiers: Comprehensive Guide"
      ],
      "tools": [
        "LTspice (Analog Devices) - Industry-standard SPICE simulator with extensive op-amp and filter design models",
        "Multisim (NI) - Graphical circuit simulation with op-amp libraries and real-time frequency response analysis",
        "KiCad with ngspice - Open-source schematic capture and SPICE simulation for filter design validation",
        "TINA-TI (Texas Instruments) - Free circuit simulator with comprehensive op-amp models from TI",
        "Falstad Circuit Simulator - Interactive online simulator ideal for understanding op-amp behavior and filter response",
        "FilterLab (Microchip) - Specialized tool for active filter design with automatic component calculation",
        "Python with SciPy/Matplotlib - For filter design calculations and frequency response plotting",
        "Analog Devices WaveFormsLive - Online circuit simulator with real-time frequency domain analysis"
      ]
    }
  }
},

  {
  "id": "ee-115-electromagnetics-applications",
  "code": "EE 115",
  "name": "Electromagnetics and Applications",
  "fullName": "EE 115: Electromagnetics and Applications",
  "description": "Foundational course in electromagnetic theory and practical device design, essential for understanding the physical principles behind motors, solenoids, sensors, and actuators used throughout industrial automation systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers must understand the electromagnetic principles that govern the actuators and sensors they control. This course provides the theoretical foundation (Maxwell's Equations, magnetic flux, inductance, reluctance) required to design and troubleshoot electromechanical systems. Whether sizing a solenoid valve for a pneumatic control loop, optimizing a servo motor's electromagnetic design, or understanding induction motor startup behavior in industrial drives, this electromagnetics knowledge is non-negotiable. Modern automation relies on electromagnetic transducers to bridge electrical control signals and mechanical action; without this course, engineers cannot effectively model actuator dynamics or predict system performance under real operating conditions.",
    "realWorldApplications": [
      "Designing solenoid valves for programmable logic controller (PLC) switching applications by calculating coil inductance, magnetic flux density, and force characteristics to achieve fast, reliable valve actuation in hydraulic/pneumatic automation systems",
      "Optimizing stepper and servo motor electromagnetic design for robotic arm positioning by analyzing pole-rotor reluctance relationships and current control strategies, enabling precise multi-axis motion control in manufacturing assembly",
      "Selecting and tuning variable frequency drives (VFDs) for AC induction motors in conveyor systems by understanding stator-rotor magnetic field interactions and slip relationships to maintain efficient motor operation across load variations",
      "Designing electromagnetic shielding and EMC compliance for PLC enclosures by applying Maxwell's equations to predict field coupling and interference pathways, preventing cross-talk between control signals and power circuits",
      "Modeling sensor behavior (linear variable differential transformer, magnetic proximity sensors) in feedback loops to understand signal conditioning requirements and speed of electromagnetic response for real-time control applications",
      "Troubleshooting motor failures in automation systems by analyzing magnetic saturation, coil heating, and force calculations to identify root causes and design preventive maintenance schedules"
    ],
    "learningOutcomes": [
      "Apply Maxwell's four equations (Gauss's Law, Faraday's Law, Ampère-Maxwell Law) to analyze electric and magnetic fields in practical devices and predict field behavior in actuators and sensors",
      "Calculate magnetic flux, reluctance, inductance, and force in electromagnetic devices using magnetic circuit analysis and field equations to size solenoids and electromagnetic actuators",
      "Model AC and DC motor operation using electromagnetic principles, including torque production from stator-rotor magnetic interactions, slip relationships, and equivalent circuit representations",
      "Analyze electromagnetic transducers (linear actuators, solenoid valves, relay coils, position sensors) to understand response time, force characteristics, and energy efficiency for automation applications",
      "Design and optimize current control strategies for switched reluctance motors and stepper motors by understanding position-dependent inductance and magnetic flux linkage relationships",
      "Evaluate electromagnetic compatibility (EMC) concerns in control systems by predicting induced currents, voltage spikes, and magnetic coupling effects to design protective measures"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=9Tm2c6NJH4Y (Electromagnetism - Maxwell's Laws with 3D Animations - comprehensive visual explanation of all four Maxwell equations with practical motor and induction examples)",
        "https://www.youtube.com/watch?v=K40lNL3KsJ4 (CrashCourse Physics #37: Maxwell's Equations - intuitive introduction connecting Faraday's Law to electromagnetic induction in motors and generators)",
        "https://www.youtube.com/watch?v=KXTeM7KGx0s (Intro to Maxwell's Equations, Electric & Magnetic Fields - detailed breakdown of electromagnetic theory foundation with modern application context)",
        "https://www.youtube.com/watch?v=mOEFTX9DAEw (Maxwell's Equations, Electromagnetic Waves, Displacement Current - rigorous mathematical treatment with practice problems on electromagnetic field calculations)",
        "https://www.youtube.com/watch?v=HL2vLaLsdTY (Maxwell's Equations And Electromagnetic Theory: A Beginners Guide - beginner-friendly approach to building intuition for electromagnetic principles)"
      ],
      "websites": [
        "https://suesa.net/en/the-role-of-solenoids-in-electrical-and-electronic-systems/ (Practical applications of solenoids in industrial automation - real-world context for solenoid valve operation in control systems)",
        "https://www.keysight.com/used/us/en/knowledge/guides/maxwells-equation (Keysight: Maxwell's Equations for EMC/EMI Testing - industrial applications and compliance testing context)",
        "https://en.wikipedia.org/wiki/Solenoid_(engineering) (Solenoid Engineering - technical reference for electromagnetic actuator design and classification)",
        "https://en.wikipedia.org/wiki/Reluctance_motor (Reluctance Motor Design - advanced motor control applications and switched reluctance motor theory)",
        "https://www.ansys.com/products/electronics/ansys-maxwell (ANSYS Maxwell - finite element analysis software for electromagnetic device simulation and optimization)"
      ],
      "tools": [
        "ANSYS Maxwell (3D/2D finite element analysis for electromagnetic field simulation, force/torque calculation, and device optimization)",
        "MATLAB Simulink (SimPowerSystems for motor and power electronics modeling; motor/solenoid electromagnetic parameter identification)",
        "Python Electromagnetics Libraries (scikit-fem, PyVista for custom field calculations and visualization)",
        "Finite Element Method (FEM) tools for reluctance and torque analysis in motor design",
        "LTspice/PSPICE (circuit-level electromagnetic transient simulation for solenoid coil firing and relay operation)"
      ]
    }
  }
}
,
  {
  "id": "ee-122-intro-control-systems",
  "code": "EE 122",
  "name": "Introduction to Control Systems",
  "fullName": "EE 122: Introduction to Control Systems",
  "description": "Foundational control theory course covering system modeling, transfer functions, block diagrams, feedback control principles, and stability analysis. Essential core course for Control Systems & Automation engineers, bridging circuit design from earlier courses to real-world automation systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 122 is the cornerstone course for Control Systems & Automation careers. It provides the theoretical framework for understanding how to design systems that regulate physical processes autonomously. Control engineers apply the principles taught in this course daily: using transfer functions to model motors and thermal systems, designing feedback controllers to maintain setpoints in industrial processes, analyzing stability to prevent dangerous oscillations in equipment, and optimizing transient response (rise time, settling time, overshoot) to meet performance requirements. Whether designing temperature controllers for manufacturing, speed regulators for motors, or path tracking for autonomous vehicles, control engineers rely on the transfer function and block diagram concepts from this course. Understanding Laplace transforms, Bode plots, Nyquist criteria, and root locus is non-negotiable for hardware/firmware integration in embedded automation systems.",
    "realWorldApplications": [
      "Designing PID controllers for motor speed regulation in conveyor systems using transfer function analysis and root locus techniques",
      "Modeling and controlling temperature setpoints in industrial ovens by creating transfer functions from thermodynamics equations",
      "Ensuring stability of power grids through frequency response analysis using Bode and Nyquist plots",
      "Designing cruise control systems for vehicles by tuning feedback loop gains for desired transient response (settling time, overshoot)",
      "Analyzing disturbance rejection in process control systems using block diagram reduction and sensitivity analysis",
      "Tuning robotic arm joint controllers using pole placement and controller design from frequency domain specifications",
      "Validating stability margins in aerospace autopilot systems to prevent pilot-induced oscillations",
      "Designing current feedback loops in power electronics using transfer function pole/zero placement"
    ],
    "learningOutcomes": [
      "Understand mathematical system modeling: differential equations, transfer functions, and Laplace transform fundamentals",
      "Convert differential equations to transfer functions and apply inverse Laplace transforms to predict system time response",
      "Analyze and manipulate block diagrams using reduction techniques to find closed-loop transfer functions",
      "Evaluate system response characteristics: steady-state error, transient response (rise time, settling time, overshoot), and damping",
      "Determine system stability using multiple methods: characteristic equation analysis, Routh-Hurwitz criterion, Bode plots, Nyquist plots, and root locus",
      "Design proportional (P), proportional-integral (PI), and proportional-integral-derivative (PID) controllers to meet performance specifications",
      "Analyze frequency response using Bode and Nyquist plots to assess robustness and stability margins (gain margin, phase margin)",
      "Apply root locus techniques to understand how controller gains affect closed-loop pole locations and system behavior",
      "Evaluate how disturbances and reference changes propagate through feedback systems using sensitivity analysis",
      "Simulate control systems using MATLAB/Simulink to validate theoretical designs before hardware implementation"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=HcLYoCmWOjI - Introduction to Control Systems: Control System Basics (9:43)",
        "https://www.youtube.com/watch?v=0mnTByVKqLM - Control Bootcamp: Laplace Transforms and the Transfer Function (19:15)",
        "https://www.youtube.com/watch?v=2Xl7--Df3g8 - What are Transfer Functions? Control Systems in Practice (20:38)",
        "https://www.youtube.com/watch?v=0MUdmAWwzMk - Simplifying Control Systems: Block Diagram Reduction in 15 Minutes (14:47)",
        "https://www.youtube.com/watch?v=C5dyU_7nBBM - Block Diagrams in Control Systems | CircuitBread Electronics Tutorials (15:42)",
        "https://www.youtube.com/watch?v=QAfk8TuOM68 - Nichols Chart, Nyquist Plot, and Bode Plot Explained (28:15)",
        "https://www.youtube.com/watch?v=f4pH-a5H-oo - Bode & Nyquist Plots Explained! @ScanderLoud (24:33)",
        "https://www.youtube.com/watch?v=1v-vWn1drZE - Where is Laplace? Explaining Transfer Functions (45:11)",
        "https://www.youtube.com/watch?v=sof3meN96MA - Nyquist Stability Criterion, Part 1 (38:21)",
        "https://www.youtube.com/watch?v=vof6rlpeqTg - The Laplace Transform - Control Systems Lecture 1 (18:34)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/6-01sc-introduction-to-electrical-engineering-and-computer-science-i-spring-2011/ - MIT OpenCourseWare: Designing Control Systems",
        "https://www.tutorialspoint.com/control_systems/control_systems_block_diagrams.htm - Control Systems Block Diagrams Tutorial",
        "https://stanford.edu/~boyd/ee102/ctrl-dyn.pdf - Stanford EE102: Dynamic Analysis of Feedback (PDF)",
        "https://www.cds.caltech.edu/~murray/courses/cds101/fa02/caltech/astrom-ch5.pdf - Caltech: Feedback Fundamentals (PDF)",
        "https://www.cds.caltech.edu/~murray/courses/cds101/fa04/caltech/am04_ch6-3nov04.pdf - Caltech: Transfer Functions (PDF)",
        "https://web.mit.edu/16.unified/www/archives%202007-2008/signals/Lect18witheqs.pdf - MIT: Stability of Feedback Control Systems (PDF)",
        "https://liquidinstruments.com/application-notes/assessing-stability-in-feedback-control-loops/ - Assessing Stability in Feedback Control Loops",
        "https://www.pdhonline.com/courses/e138/e138content.pdf - Block Diagrams and Transfer Functions (PDF Reference)",
        "https://web.engr.oregonstate.edu/~webbky/ESE430_files/Section%202%20Block%20Diagrams%20&%20Signal%20Flow%20Graphs.pdf - Block Diagrams & Signal Flow Graphs (PDF)",
        "https://www.ti.com/lit/pdf/slva381 - Texas Instruments: Simplifying Stability Checks (PDF)"
      ],
      "tools": [
        "MATLAB & Control System Toolbox - Industry-standard for transfer function analysis, Bode/Nyquist plotting, controller design, and system simulation",
        "Simulink - Visual block diagram modeling and real-time simulation of control systems with hardware-in-the-loop capabilities",
        "GNU Octave - Free MATLAB alternative with identical syntax for control system analysis",
        "Python with SciPy.signal - Open-source alternative for transfer function analysis, frequency response, and control design",
        "Scilab - Free open-source tool for scientific computing with control system libraries",
        "Xcos (Scilab) - Open-source Simulink alternative for block diagram simulation",
        "LabVIEW - National Instruments tool for real-time control system implementation and verification",
        "ANSYS Simplorer - Advanced co-simulation tool for control system integration with power electronics and mechanical systems"
      ]
    }
  }
}
,
  {
  "id": "ee-140-computer-microcontroller-architecture",
  "code": "EE 140",
  "name": "Computer and Microcontroller Architecture",
  "fullName": "EE 140: Computer and Microcontroller Architecture",
  "description": "Foundational course covering microprocessor/microcontroller design, instruction set architecture, memory hierarchies, and peripheral interfacing—essential for building real-time embedded control systems that execute automation firmware.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers must understand microcontroller architecture to design, program, and troubleshoot embedded control systems deployed across PLCs, motor drives, and sensor interfaces. This course provides the foundational knowledge of ARM Cortex-M architecture (industry standard for industrial automation), instruction execution cycles, memory organization, interrupt handling, and peripheral integration—all critical for real-time control firmware. Without this architectural knowledge, engineers cannot effectively debug timing issues, optimize control loop performance, manage concurrent tasks with real-time operating systems (RTOS like FreeRTOS), or configure microcontrollers for deterministic behavior. Whether writing bare-metal firmware for a motor controller or orchestrating multi-task automation sequences, understanding the underlying hardware architecture is non-negotiable for professional embedded control systems.",
    "realWorldApplications": [
      "Programming STM32 microcontrollers to implement PLC logic, sensor polling, and output control with precise timing by understanding ARM Cortex-M instruction execution, memory layout, and interrupt priorities for deterministic real-time operation",
      "Designing multi-task automation systems using FreeRTOS on STM32 platforms by leveraging knowledge of task scheduling, context switching, and register preservation to manage motor control, sensor fusion, and communication protocols simultaneously",
      "Configuring microcontroller peripherals (UART, SPI, I2C, CAN, PWM timers, ADC) for industrial automation applications by understanding memory-mapped I/O, peripheral clock trees, and interrupt-driven event handling for low-latency sensor acquisition",
      "Optimizing closed-loop control algorithms running on embedded controllers by understanding ARM instruction cycles, pipeline behavior, and cache mechanisms to meet strict timing constraints in servo feedback loops",
      "Implementing secure firmware for industrial controllers by understanding memory protection mechanisms, privilege levels, and interrupt vector configuration to prevent unauthorized code execution and data corruption",
      "Debugging real-time control systems by understanding how microcontroller interrupts, stack frames, and register contexts relate to observed system behavior, using JTAG/SWD debugging interfaces to inspect program execution",
      "Selecting appropriate microcontroller platforms (STM32H7 for high-performance motor control vs. STM32L for low-power sensor nodes) by understanding architecture capabilities, DMIPS ratings, peripheral richness, and power management features"
    ],
    "learningOutcomes": [
      "Understand ARM Cortex-M architecture (core components: ALU, registers, buses, instruction pipeline, memory interface) and how it executes firmware for industrial automation systems",
      "Analyze assembly language instruction execution and address modes to optimize control algorithms for deterministic real-time performance and predictable timing",
      "Design interrupt-driven systems using interrupt controllers (NVIC), exception handlers, and priority levels to implement responsive real-time control without continuous polling",
      "Configure microcontroller peripherals (GPIO, timers, PWM, ADC, communication interfaces) through register manipulation or hardware abstraction layer (HAL) APIs to interface with sensors, actuators, and external devices",
      "Implement real-time operating system (RTOS) concepts: task scheduling, context switching, semaphores, mutexes, and queues to manage concurrent control loops and communication tasks",
      "Understand memory architecture (flash, RAM, caches, memory-mapped I/O) and address spaces to optimize firmware footprint and data access patterns for embedded controllers",
      "Apply debugging methodologies using JTAG/SWD interfaces and development tools (STM32CubeIDE, SystemView) to trace execution, analyze task behavior, and troubleshoot real-time timing issues"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=oD1qRFDBN74 (Learn STM32 Microcontroller Programming - Full Course for EE/CS - 9+ hours comprehensive hands-on course covering STM32CubeIDE, bare-chip development, GPIO, I2C, USART, interrupts, and real-world projects)",
        "https://www.youtube.com/watch?v=ZkLxgFNgDm8 (STM32 ARM Cortex-M4 Hello World - practical introduction to STM32 ARM Cortex-M4 development with step-by-step firmware programming)",
        "https://www.youtube.com/watch?v=zwe3EHNnFdc (STM32 ARM Cortex-M4: CMSIS, HAL, CubeMX, CubeIDE - deep dive into development tools, hardware abstraction layers, and code generation)",
        "https://www.youtube.com/watch?v=GjzO1Iq64hw (5 ARM STM32 Microcontroller Tutorial - The 4 Basics to Control ALL - covers bit manipulation, register access, and fundamental control operations)",
        "https://www.youtube.com/watch?v=VYi6_voj9Qc (STM32 ARM Microcontroller Series Introduction - foundation concepts and platform overview)",
        "https://iies.in/blog/understanding-about-stm32-interrupts-and-timers/ (Technical guide to STM32 interrupts, timers, and PWM generation for real-time control applications)"
      ],
      "websites": [
        "https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/getting-started-with-arm-micro... (ARM Developer: Getting Started with ARM Microcontrollers - official architecture documentation and tutorials)",
        "https://copperhilltech.com/blog/expanding-embedded-communication-can-fd-shield-for-stm32g431-nucleog431rb-c12b24/ (Develop Real-Time Embedded Systems Using STM32, FreeRTOS - advanced RTOS development guide with STM32 platform focus)",
        "https://www.st.com/en/microcontrollers-microprocessors/stm32-high-performance-mcus.html (STMicroelectronics STM32 Product Family - official reference for STM32 microcontroller specifications, peripherals, and applications)",
        "https://www.freertos.org/Documentation/01-FreeRTOS-quick-start/01-Beginners-guide/01-RTOS-fundamentals (FreeRTOS Official Documentation - RTOS fundamentals, task scheduling, and embedded system design patterns)",
        "https://www.mikrocontroller.net/articles/ARM-ASM-Tutorial (ARM Assembly Language Tutorial - comprehensive guide to ARM assembly programming for embedded systems)",
        "https://ctms.engin.umich.edu/CTMS/index.php?aux=Home (Control Tutorials for MATLAB & Simulink - practical modeling and simulation of embedded control systems)"
      ],
      "tools": [
        "STM32CubeIDE (integrated development environment for STM32 firmware development with code generation, debugging, and system configuration)",
        "STM32CubeMX (hardware configuration tool for pin mapping, peripheral configuration, and clock tree management)",
        "SEGGER J-Link + SystemView (professional debugging and real-time OS visualization tool for analyzing task behavior and timing in RTOS applications)",
        "SEGGER Ozone (integrated debugger for advanced analysis, breakpoint management, and program flow visualization)",
        "GNU ARM Embedded Toolchain (open-source compiler, assembler, and linker for ARM Cortex-M development)",
        "GDB/OpenOCD (open-source debugging protocol and on-chip debugger support for JTAG/SWD interfaces)",
        "FreeRTOS (open-source real-time operating system with extensive STM32 support and documentation)"
      ]
    }
  }
}
,
  {
  "id": "engr-140-oop",
  "code": "ENGR 140",
  "name": "Introduction to Object Oriented Programming",
  "fullName": "ENGR 140: Introduction to Object Oriented Programming",
  "description": "Foundational software engineering course covering object-oriented programming principles (classes, inheritance, polymorphism, encapsulation, abstraction), design patterns, and practical implementation. Essential for Control Systems & Automation engineers who must design complex embedded systems, firmware for PLCs, and scalable automation frameworks.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For Control Systems & Automation engineers, ENGR 140 is increasingly critical as industrial automation moves from procedural code to modern object-oriented frameworks. PLC vendors (Siemens, Rockwell, ABB) now implement OOP in Structured Text (IEC 61131-3), allowing engineers to model complex control systems as objects (Motor, Sensor, Controller, Actuator). Real-world benefit: instead of writing 5,000 lines of procedural code for a multi-motor conveyor system, you define a Motor class once and reuse it across the entire factory floor. Encapsulation protects intellectual property by hiding internal firmware details. Inheritance enables code reuse—a Servo Motor class inherits common properties from a base Motor class, eliminating duplication. Polymorphism allows a single control interface to command different actuator types seamlessly. Embedded systems for robotics, industrial controllers, and autonomous vehicles increasingly require OOP for maintainability and scalability. Understanding design patterns (singleton for controller state, observer for sensor events, factory for device creation) directly translates to production firmware.",
    "realWorldApplications": [
      "Designing a reusable PLC motor control class in Structured Text (IEC 61131-3) that inherits common properties but allows overriding of tuning parameters for different motor types",
      "Implementing an observer pattern to notify multiple controllers when a pressure sensor exceeds threshold—eliminating hard-coded sensor-to-controller dependencies",
      "Creating a factory pattern to instantiate different actuator types (stepper, servo, solenoid) from configuration files without modifying core control code",
      "Designing an abstract Sensor base class with inherited implementations (temperature, pressure, proximity) to enforce consistent interfaces across industrial equipment",
      "Building a scalable SCADA system using OOP principles to manage 1000+ devices with a single codebase, leveraging inheritance and polymorphism",
      "Encapsulating PID controller state and tuning gains in a class to prevent accidental corruption and enable easy parameter reloading between system startups",
      "Using inheritance hierarchies to model robotic arm subsystems (Base, Shoulder, Elbow, Wrist) with polymorphic control methods",
      "Implementing a singleton pattern for hardware resource management—ensuring only one thread controls the motor driver chip at a time"
    ],
    "learningOutcomes": [
      "Understand fundamental OOP concepts: classes, objects, attributes, methods, and constructors as templates for creating software abstractions of real-world entities",
      "Master encapsulation: bundle data and methods into classes, enforce access control (public/private/protected) to prevent unintended state modification",
      "Design hierarchies using inheritance: create parent classes with common functionality, child classes that specialize for specific use cases, and reuse code effectively",
      "Apply polymorphism: write interfaces that work with multiple object types, enabling flexibility and extensibility without modifying existing code",
      "Implement abstraction: hide implementation complexity behind clean interfaces, allowing users to interact with objects at the appropriate abstraction level",
      "Recognize and apply design patterns: singleton, factory, observer, strategy, adapter—proven solutions to recurring software design problems",
      "Develop modular, testable code: write classes with single responsibility, enabling unit testing and reducing coupling between components",
      "Transition from procedural to object-oriented thinking: model problems as collections of interacting objects rather than procedural algorithms",
      "Implement practical OOP projects: design multi-class systems for automation scenarios (conveyor control, robot motion planning, sensor monitoring)",
      "Understand when OOP adds value vs. overhead: make informed decisions about applying OOP in resource-constrained embedded systems"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=B5_hBxQyaHQ - Inheritance & Polymorphism Explained: Master OOP Concepts (9:05) - Core principles with Java examples",
        "https://www.youtube.com/watch?v=Dz2jBQem-3Y - Abstraction, Polymorphism, and Encapsulation in Python (15:13) - Practical examples with abstract base classes",
        "https://www.youtube.com/watch?v=ZVTuWsrjvyU - Python Object Oriented Programming - OOP Principles: Encapsulation, Abstraction, Inheritance, Polymorphism (22:51)",
        "https://www.youtube.com/watch?v=128RfPcLKBc - Object Oriented Programming (OOP) in C++ Course (full course video) - Industry-relevant for embedded systems",
        "https://www.youtube.com/watch?v=RpBBzci_cBk - Python Classes, Objects, Inheritance & Polymorphism for Beginners (19:31) - Clear, beginner-friendly walkthrough",
        "https://www.youtube.com/watch?v=C2QfkDcQ5MU - Inheritance/Polymorphism in Object Oriented Programming (12:49) - Python-focused with practical examples",
        "https://www.youtube.com/watch?v=bOT0sprsVIM - Abstraction & Encapsulation | Python Tutorials (24:15) - Deep dive into access modifiers and data hiding",
        "https://www.youtube.com/watch?v=OzQnacVGV7c - Mastering OOP: Objects, Classes, Inheritance, Polymorphism (8:45) - Comprehensive overview with visual explanations",
        "https://www.youtube.com/watch?v=GwQnoaUoiOM - Modern C++ Design Patterns Full Course (3+ hours) - Advanced patterns for scalable embedded systems",
        "https://www.youtube.com/watch?v=2UUqX2eIdSM - Back to Basics: Design Patterns - Mike Shah - CppCon 2020 (47:22) - Industry standard design patterns in C++"
      ],
      "websites": [
        "https://spatial.umaine.edu/wp-content/uploads/sites/512/2020/04/SIE508Syllabus_ObjectOrientedPrgr.pdf - University of Maine: Object Oriented Programming Course Syllabus (PDF)",
        "https://www.automate.org/motion-control/industry-insights/building-the-case-for-object-oriented-programming-oop - Automate.org: Building the Case for OOP in Industrial Control",
        "https://www.cincom.com/blog/smalltalk/polymorphism-in-object-oriented-programming/ - Cincom: Polymorphism in Object-Oriented Programming",
        "https://www.edx.org/learn/object-oriented-programming - edX: Object-Oriented Programming Courses and Specializations",
        "https://techaffinity.com/blog/oops-concepts-in-java/ - Tech Affinity: OOPS Concepts in Java with Examples",
        "https://www.techelevator.com/the-3-pillars-of-object-oriented-programming-oop-brought-down-to-earth/ - TechElevator: The 3 Pillars of OOP",
        "https://www.geeksforgeeks.org/java/object-oriented-programming-oops-concept-in-java/ - GeeksforGeeks: Comprehensive OOP Concepts in Java",
        "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/ - MIT OpenCourseWare: Introduction to Computer Science and Programming in Python",
        "https://projectadvance.syracuse.edu/courses/cse283/ - Syracuse University: Introduction to Object-Oriented Design (CSE 283)",
        "https://www.coursera.org/courses?query=object+oriented+programming - Coursera: Object Oriented Programming Courses"
      ],
      "tools": [
        "Python with IDE (PyCharm, VS Code) - Beginner-friendly language with clear OOP syntax, widely used in academia and scripting",
        "Java (Eclipse, IntelliJ IDEA) - Strongly-typed OOP language, enforces best practices, industry standard for large-scale systems",
        "C++ (Visual Studio, CLion) - Performance-critical embedded systems, used in PLCs, robotics, and real-time control; supports multiple paradigms",
        "Structured Text (IEC 61131-3) - Direct industrial control programming language used by PLC vendors, increasingly OOP-capable",
        "Unified Modeling Language (UML) tools - Lucidchart, Draw.io, ArgoUML for designing class hierarchies and system architecture",
        "Git & GitHub - Version control and collaboration for software projects, essential for team-based development",
        "JUnit (Java), pytest (Python), Google Test (C++) - Unit testing frameworks to validate OOP designs",
        "MATLAB/Simulink - Can model OOP concepts alongside control system simulation for embedded systems integration"
      ]
    }
  }
}
,
  {
  "id": "engr-145-machine-learning-engineers",
  "code": "ENGR 145",
  "name": "Machine Learning for Engineers",
  "fullName": "ENGR 145: Machine Learning for Engineers",
  "description": "Foundational course in machine learning and neural networks applied to engineering problems, with emphasis on practical implementation of AI models on embedded systems and automation hardware for real-time decision-making.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers increasingly deploy machine learning directly on edge devices and microcontrollers to enable predictive maintenance, anomaly detection, and adaptive control without cloud dependency. This course bridges classical control theory with modern AI techniques, teaching engineers how to train neural networks, optimize models for resource-constrained embedded systems, and deploy inference pipelines on STM32 and ARM-based platforms. Industry leaders in automation (ABB, Siemens, Honeywell) now embed edge AI into PLCs and motion controllers for predictive maintenance (detecting equipment failures 30-60% earlier), anomaly detection in manufacturing processes, and autonomous system adaptation. Without ML literacy, controls engineers miss critical competitive advantages: autonomous diagnostics reduce downtime by 10-20%, predictive models extend equipment lifespan by 30%, and on-device AI eliminates cloud latency constraints for safety-critical systems. This course equips engineers with hands-on skills using TensorFlow Lite for Microcontrollers (TFLite Micro), Edge Impulse platform, and CMSIS-NN acceleration libraries—the industry-standard tools for deploying AI in industrial automation.",
    "realWorldApplications": [
      "Implementing predictive maintenance on industrial motors by training CNN/LSTM models on vibration sensor time-series data, detecting bearing failures 2-4 weeks before catastrophic breakdown, reducing mean time to repair by 60% and extending motor lifespan by 30%",
      "Deploying real-time anomaly detection on manufacturing assembly lines using Edge Impulse to train compact neural networks that run on PLC microcontrollers, identifying out-of-spec parts and process deviations without sending raw data to cloud servers",
      "Building adaptive control systems for robotic arms that learn task variations using reinforcement learning-inspired approaches, enabling collaborative robots to adjust gripping force, speed, and trajectory based on material properties detected during operation",
      "Creating on-device condition monitoring for pneumatic/hydraulic systems by training autoencoder models that identify pressure oscillations and leakage patterns, triggering maintenance alerts before system failure affects production",
      "Designing smart sensor fusion pipelines using neural networks to combine accelerometer, temperature, and current draw data from motors, accurately predicting remaining useful life (RUL) with 90%+ accuracy for proactive replacement scheduling",
      "Implementing keyword spotting on embedded voice-activated control systems using TinyML, enabling voice command interfaces for factory floor operators without network connectivity or latency delays",
      "Optimizing electrical motor drive efficiency by training small neural networks to predict optimal PWM duty cycles and current setpoints based on load conditions, reducing energy consumption by 5-15% while maintaining performance"
    ],
    "learningOutcomes": [
      "Understand foundational machine learning concepts (supervised, unsupervised, reinforcement learning), linear regression, classification, and when to apply each approach to engineering problems",
      "Design and train neural networks (MLPs, CNNs, LSTMs) for time-series sensor data, image-based anomaly detection, and pattern recognition in industrial automation systems",
      "Apply model optimization techniques (quantization, pruning, knowledge distillation) to reduce neural network size and computational requirements for deployment on resource-constrained microcontrollers",
      "Implement edge AI workflows using industry-standard tools: TensorFlow Lite for Microcontrollers for STM32/ARM deployment, Edge Impulse for data collection and model training, CMSIS-NN for acceleration",
      "Deploy trained models to STM32 microcontrollers using TFLite Micro, understanding memory constraints, inference latency, and real-time execution requirements for deterministic control systems",
      "Build end-to-end predictive maintenance pipelines: collect raw sensor data, extract features, train anomaly detection models, and integrate into PLC monitoring systems for autonomous fault detection",
      "Evaluate model performance metrics (accuracy, precision, recall, F1-score, confusion matrix) and understand trade-offs between detection sensitivity and false positive rates in industrial applications",
      "Debug and optimize deployed models for embedded systems, analyzing inference timing, memory usage, and energy consumption to meet real-time control loop requirements"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=BVqj1R71508 (Complete Training: TensorFlow and PyTorch 2025 - 7+ hour comprehensive course covering CNNs, RNNs, model deployment, TensorFlow Serving, and practical applications including real-world industrial use cases)",
        "https://www.youtube.com/watch?v=fABIbWNjLEk (How to Train AI Models for Microcontrollers with Edge Impulse - hands-on tutorial showing data collection, model training, optimization for NPUs, and deployment to microcontrollers for industrial anomaly detection)",
        "https://www.youtube.com/watch?v=V_xro1bcAuA (PyTorch for Deep Learning & Machine Learning – Full Course - 20+ hour comprehensive PyTorch training covering neural networks, CNNs, model training loops, and deployment optimization)",
        "https://www.coursera.org/learn/introduction-to-embedded-machine-learning (Introduction to Embedded Machine Learning - Coursera specialization covering TinyML concepts, Edge Impulse workflows, feature extraction from sensor data, and microcontroller deployment)",
        "https://www.youtube.com/watch?v=LyJtbe__2i0 (Introduction to Embedded Machine Learning - Edge Impulse tutorial demonstrating data collection, impulse creation, model training, and Arduino deployment for embedded systems)",
        "https://www.youtube.com/watch?v=SY9o3jvuVbg (Intro to Python Deep Learning libraries - TensorFlow, Keras, PyTorch - framework comparison with live Google Colab demos showing neural network training and performance visualization)"
      ],
      "websites": [
        "https://www.embedded.com/deploying-neural-networks-on-microcontrollers-with-tinyml/ (Deploying Neural Networks on Microcontrollers with TinyML - practical guide to quantization, ESP32/Arduino deployment, and edge AI applications)",
        "https://marutitech.com/predictive-maintenance-machine-learning-techniques/ (Predictive Maintenance with Machine Learning - real-world case studies showing 60% MTTR reduction and 30% equipment lifespan extension using ML-based condition monitoring)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC10574925/ (Anomaly Detection in Smart Industrial Machinery Plant Using IoT and Machine Learning - peer-reviewed research achieving 13% improvement in detection rates and 3% reduction in false positives)",
        "https://www.edgeimpulse.com/blog/getting-started-with-edge-impulse/ (Getting Started with Edge Impulse - official guide to TinyML platform, data collection workflows, model training, and deployment pipelines)",
        "https://docs.silabs.com/machine-learning/2.0.0/machine-learning-tensorflow-lite-for-microcontrollers/ (TensorFlow Lite for Microcontrollers - official documentation for deploying neural networks on ARM Cortex-M microcontrollers)",
        "https://learn.arm.com/learning-paths/embedded-and-microcontrollers/edge/software-edge-impulse/ (ARM Learning Path: Train and Deploy TinyML Audio Classifier - step-by-step guide to Edge Impulse workflows and model optimization)",
        "https://blog.tensorflow.org/2021/02/accelerated-inference-on-arm-microcontrollers-with-tensorflow-lite.html (Accelerated Inference on ARM Microcontrollers - TensorFlow + CMSIS-NN optimization techniques for Cortex-M performance)"
      ],
      "tools": [
        "TensorFlow Lite for Microcontrollers (TFLM) - open-source framework for running neural network inference on STM32 and ARM Cortex-M microcontrollers",
        "Edge Impulse Platform - end-to-end TinyML development platform with data collection, feature extraction, model training, and Arduino/STM32 deployment for embedded systems",
        "PyTorch - deep learning framework for rapid prototyping and training of neural networks before conversion to TFLite format",
        "TensorFlow/Keras - production-grade deep learning framework with comprehensive model zoo, quantization tools, and TFLite conversion pipeline",
        "CMSIS-NN - ARM open-source library providing optimized neural network kernels for Cortex-M processors, enabling 5-10x speedup on microcontroller inference",
        "Python scikit-learn - machine learning algorithms for feature engineering, model selection, and baseline algorithm evaluation",
        "SEGGER SystemView - real-time OS visualization and profiling tool for analyzing ML inference timing and resource consumption in embedded systems",
        "STM32CubeAI - ST Microelectronics' AI optimization tool for converting TensorFlow/ONNX models to optimized C code for STM32 microcontrollers"
      ]
    }
  }
}
,
];

export const tier2Courses: TierCourse[] = [
  {
  "id": "ee-105-semiconductor-devices",
  "code": "EE 105",
  "name": "Semiconductor Devices",
  "fullName": "EE 105: Semiconductor Devices",
  "description": "In-depth study of semiconductor physics, device operation, and performance characteristics. Covers pn-junction diodes, bipolar junction transistors (BJTs), field-effect transistors (FETs), MOSFETs, and power electronics devices (thyristors, IGBTs). Essential for understanding the physics behind circuit building blocks and selecting appropriate devices for control systems applications.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 105 is a Tier 2 course bridging circuit design (EE 101/111) and power electronics/control hardware implementation. For Control Systems & Automation engineers, understanding semiconductor physics directly impacts hardware selection and system reliability. Why? Power MOSFETs and IGBTs are the workhorses of motor drives—knowing their on-state resistance (R_ds(on)), gate charge, and switching speed determines whether a servo motor responds in 10ms or 100ms. Thyristor characteristics (latching current, holding current) determine whether industrial AC controllers are stable. Understanding reverse recovery time of power diodes prevents catastrophic failures in motor controller circuits. The depletion region concept explains why high-speed switching devices suffer from ringing and noise—knowledge essential for designing robust closed-loop control systems in electrical machines. With advanced semiconductors (SiC MOSFETs, GaN transistors), control engineers must understand material properties to select appropriate devices. This course is Tier 2 (not Tier 1) because not all control engineers need to design semiconductors from first principles, but those working on power electronics, hardware integration, or motor drives absolutely must understand device physics to avoid costly system failures.",
    "realWorldApplications": [
      "Selecting power MOSFETs for motor drive controllers by analyzing on-state resistance vs. frequency response trade-off to minimize conduction losses and switching heat",
      "Designing gate drive circuits for IGBTs in three-phase inverters for electric vehicles, accounting for gate charge and switching speed to achieve optimal efficiency",
      "Analyzing thyristor characteristics to design phase-controlled AC motor speed controllers for industrial conveyor systems while ensuring stability",
      "Implementing reverse polarity protection using Schottky diodes in battery-powered robotics, understanding forward voltage drop vs. leakage current trade-off",
      "Selecting fast-recovery diodes for PWM-controlled power supplies in PLC systems to minimize reverse recovery transients that cause noise in sensor circuits",
      "Understanding power MOSFET body diode characteristics to design freewheeling diode protection in inductive load switching (solenoids, relays)",
      "Calculating thermal limitations of power semiconductors in motor drives to ensure junction temperature stays within safe operating area under load",
      "Evaluating wide-bandgap (SiC/GaN) devices for high-frequency switching power supplies to improve efficiency in off-grid renewable automation systems"
    ],
    "learningOutcomes": [
      "Understand semiconductor materials and doping: energy band theory, charge carriers (electrons/holes), majority vs. minority carriers, and how doping concentration affects conductivity",
      "Analyze pn-junction physics: built-in potential, depletion region formation, and how forward/reverse bias modulates the depletion region width to control current flow",
      "Determine diode I-V characteristics: exponential forward conduction, reverse saturation current, breakdown region, and non-ideal effects (series resistance, junction capacitance)",
      "Master BJT operation: emitter-base-collector current relationships, amplification factor (beta), saturation vs. active vs. cutoff regions, and temperature effects on V_BE",
      "Analyze MOSFET operation: gate-source voltage control of channel conductance, threshold voltage (V_th), on-state resistance (R_ds(on)), and frequency response",
      "Understand power device considerations: current density limits, thermal management (junction-to-case resistance), switching losses, and safe operating area (SOA)",
      "Evaluate thyristor operation: four-layer PNPN structure, latching current, holding current, on-state voltage drop, and turn-on/turn-off characteristics for AC and DC applications",
      "Compare semiconductor technologies: silicon vs. wide-bandgap (SiC/GaN) devices, highlighting efficiency gains and thermal advantages for high-frequency applications",
      "Calculate device parameters from datasheets: understand maximum ratings, typical operating points, and thermal derating to select devices appropriately for automation systems",
      "Apply device physics to circuit design: select transistors for amplification, design bias networks, and implement protection circuits (clamps, snubbers) to prevent device failure"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=PcU5GjcufLc - PN Junction Diode Operation: Forward & Reverse Bias (8:47) - Clear visualization of depletion region dynamics",
        "https://www.youtube.com/watch?v=fIvZen2tq_w - Animated BJT: How a Bipolar Junction Transistor Works (4:31) - Excellent animation of electron/hole movement",
        "https://www.youtube.com/watch?v=qUeK7pHe0rI - EEVblog #748: How Do Transistors Work? BJT and MOSFET at Silicon Level (23:15) - Deep dive into semiconductor physics",
        "https://www.youtube.com/watch?v=HD1n-6lUic0 - How MOSFET & Thyristor SCR Work and Difference (21:46) - Comparison of power switching devices",
        "https://www.youtube.com/watch?v=USrY0JspDEg - PN Junction Diode Explained: Forward Bias and Reverse Bias (12:35) - Detailed charge carrier analysis",
        "https://www.youtube.com/watch?v=YTIv0Fva9xg - Thyristor and How It Works Tutorial (9:42) - PNPN structure and operating modes",
        "https://www.youtube.com/watch?v=GHKHPxMh4zI - Electronics Tutorial 17: Introduction to BJTs (11:06) - BJT fundamentals with MOSFET comparison",
        "https://www.youtube.com/watch?v=AwRJsze_9m4 - MOSFET Explained: How MOSFET Works (9:18) - Gate control and channel formation",
        "https://www.youtube.com/watch?v=OyC02DWq3mI - How a PN Junction Semiconductor Works: Forward/Reverse Bias (5:23) - Animation of depletion region narrowing/widening",
        "https://www.youtube.com/watch?v=iSFLOQqVb80 - Power Electronics: Thyristor Principles and Characteristics (20:15) - VI characteristics and switching behavior",
        "https://www.youtube.com/watch?v=mEO6rHMyNP0 - What are Power Semiconductor Devices: Power Diodes, Thyristors, MOSFETs, IGBTs (8:19) - Overview of power device types"
      ],
      "websites": [
        "https://eecs.berkeley.edu/book/online-specializations-programs/ic/courses/eew230a/ - UC Berkeley: EE W230A - Integrated-Circuit Devices Course Overview",
        "https://ece.engin.umich.edu/academics/course-information/course-descriptions/eecs-320/ - University of Michigan EECS 320: Introduction to Semiconductor Devices",
        "https://engineering.purdue.edu/jump/8c0258 - Purdue ECE 30500: Semiconductor Devices (comprehensive curriculum)",
        "https://www.nextpcb.com/blog/semiconductor-device-types - NextPCB: Semiconductor Device Types Engineering Guide",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC7767217/ - NIH: Overview of Power Electronic Switches (Research Paper)",
        "https://www.geeksforgeeks.org/electrical-engineering/power-semiconductor-devices/ - GeeksforGeeks: Power Semiconductor Devices Overview",
        "https://www.britannica.com/technology/semiconductor-device - Britannica: Semiconductor Device Encyclopedia Entry",
        "https://www.synopsys.com/glossary/what-are-power-electronics.html - Synopsys: What Are Power Electronics & How It Works",
        "https://ae-automation.com/products/power-devices/ - Advance Electrical: Power Devices for Industrial Automation",
        "https://www.renesas.com/en/support/engineer-school/electronic-circuits-02-diodes-transistors-fets - Renesas: Diodes, Transistors and FETs"
      ],
      "tools": [
        "MATLAB/Simulink with Simscape Electronics - Device-level modeling and power electronics system simulation",
        "LTspice - SPICE circuit simulator with extensive semiconductor models (BJTs, MOSFETs, diodes, thyristors) from major manufacturers",
        "Multisim (NI) - Graphical semiconductor device simulation with real-time VI curve visualization",
        "PLECS (Plexim) - Power electronics circuit simulation with thermal management modeling",
        "Synopsys Sentaurus - Professional device design and simulation tool (used in industry for optimizing semiconductor performance)",
        "Python with PySpice - Open-source SPICE interface for semiconductor parameter extraction and simulation automation",
        "COMSOL - Finite-element analysis for semiconductor heat dissipation and junction temperature calculation",
        "Texas Instruments TINA-TI - Free SPICE simulator with comprehensive TI device models for power electronics",
        "Component datasheets - Critical for understanding device electrical ratings, thermal performance, and safe operating area",
        "Oscilloscope simulation tools - For visualizing switching transients, ringing, and thermal runaway phenomena in semiconductor circuits"
      ]
    }
  }
}
,
  {
  "id": "ee-130-electrical-machines",
  "code": "EE 130",
  "name": "Electrical Machines",
  "fullName": "EE 130: Electrical Machines",
  "description": "Comprehensive study of DC, AC induction, synchronous, and brushless motor design, operation, and control strategies. Bridges motor electromagnetic principles with practical drive and controller design for industrial automation systems.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers must master electrical machine theory to design, select, and optimize motor-driven systems across manufacturing automation. This tier-2 course builds on electromagnetics fundamentals (EE 115) and signal processing theory (EE 102) to enable engineers to: model motor dynamics for control system design, optimize field-oriented control (FOC) algorithms for servo and induction motors, select appropriate motor types (BLDC, PMSM, induction) for specific automation applications, and predict motor performance under transient and steady-state conditions. Industry leaders (Siemens, ABB, Rockwell Automation) employ these techniques across variable frequency drives (VFDs), servo controllers, and smart motor systems. Modern automation demands: 30-50% energy efficiency improvements through optimal motor control, real-time torque and speed regulation with <5ms response times, predictive motor health monitoring with machine learning integration, and seamless integration with Industry 4.0 platforms. Without mastery of motor design and advanced control algorithms, engineers cannot meet these performance requirements or troubleshoot motor failures in production systems. This course enables hands-on design using MATLAB/Simulink, STM32 motor control platforms, and industrial motor drive simulation tools.",
    "realWorldApplications": [
      "Designing variable frequency drive (VFD) controllers for three-phase induction motors in conveyor systems by analyzing torque-slip characteristics, implementing vector control algorithms, and optimizing speed regulation across 10:1 load range to maintain energy efficiency within ±2% speed tolerance",
      "Implementing field-oriented control (FOC) on STM32 microcontrollers for PMSM servo motors in robotic arms by transforming Clarke-Park coordinate systems, tuning PI controllers for torque and speed loops, and achieving <2% steady-state error with deterministic 100µs control loop timing",
      "Developing brushless DC motor drive firmware for CNC multi-axis positioning by calculating back-EMF, implementing sinusoidal commutation, Hall sensor signal processing, and PWM modulation to achieve ±0.1° positioning repeatability across thermal ranges (-10 to +50°C)",
      "Optimizing motor selection for 50-ton injection molding machines by comparing motor torque curves, inertia matching, thermal duty cycles, and control complexity to select between AC induction (energy efficient, 24/7 duty) vs. servo motors (precise speed control, intermittent duty)",
      "Designing predictive motor health monitoring systems by modeling motor thermal dynamics, analyzing stator current signatures for bearing degradation detection, and implementing model-predictive control (MPC) to optimize motor cooling and extend equipment lifespan by 30%",
      "Implementing flux-weakening control strategies for electric vehicle motor drives operating at 2-3x base speed by decoupling d-q axis current control, managing voltage limits, and transitioning smoothly between constant torque and constant power regions",
      "Troubleshooting motor failures in production systems by analyzing synchronous speed, slip calculations, torque ripple sources, cogging effects, and electromagnetic saturation to identify root causes (bearing wear, winding shorts, control loop instability)"
    ],
    "learningOutcomes": [
      "Analyze DC motor operation (commutation, back-EMF, torque-speed characteristics) and design PWM speed controllers achieving target speed regulation with <50ms settling time and minimal ripple",
      "Model three-phase induction motor dynamics using equivalent circuits and torque-slip analysis to predict starting transient behavior, full-load torque, and efficiency at operating points",
      "Understand AC motor speed control techniques: voltage control for soft-starting, frequency variation using VFDs, slip-ring rotor resistance control, and variable flux methods to achieve 20:1 speed range on industrial drives",
      "Apply field-oriented control (FOC) principles to PMSM servo motors, including Clarke-Park transformations, d-q axis current decoupling, PI controller tuning, and synchronous speed operation for high-performance positioning",
      "Design motor selection criteria for automation applications considering: rated torque and speed, duty cycles, thermal constraints, inertia matching, control requirements, and cost trade-offs between different motor types",
      "Analyze motor thermal behavior, losses (copper, iron, mechanical), efficiency maps, and design cooling strategies to meet continuous and intermittent duty requirements in harsh industrial environments",
      "Implement real-time motor control algorithms on embedded microcontrollers: PWM generation, sensor signal conditioning (encoders, Hall sensors), current measurement and feedback, interrupt-driven control loops",
      "Apply model predictive control (MPC) and adaptive algorithms to motor systems for dynamic load compensation, disturbance rejection, and performance optimization across wide operating ranges"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=yiD5nCfmbV0 (Brushless Motor - How they work BLDC ESC PWM - sponsored by Brilliant.org; comprehensive explanation of brushless DC motor construction, three-phase commutation, back-EMF sensing, PWM control theory, and Arduino implementation)",
        "https://www.youtube.com/watch?v=gNpoTPzEkco (Brushless Motor Control with Simulink, Part 1 - MathWorks; BLDC fundamentals, controller complexity, three-phase voltage generation, commutation strategies, and Simulink modeling for motor control design)",
        "https://www.youtube.com/watch?v=lP4jbmthiyc (Motor Control Design with MATLAB and Simulink - MathWorks webinar; field-oriented control (FOC) implementation, PI controller autotuning, dynamic decoupling control, flux weakening, speed/torque control loops, space vector PWM)",
        "https://www.youtube.com/watch?v=VaWGJVHiJC8 (What is a BRUSHLESS MOTOR and how it works - Torque - Hall effect; BLDC construction, rotor magnet positioning, Hall effect sensor configuration, electronic commutation sequences, torque generation mechanisms)",
        "https://www.youtube.com/watch?v=TFNlrXnIngY (How to control DC & AC motors - GlobalSpec; comprehensive overview of DC brushed motors, AC induction motors, brushless motors, three-phase systems, transistor switching sequences)",
        "https://www.youtube.com/watch?v=qOzE5F5vFGs (How to control a BLDC with an Arduino - practical tutorial on wiring, Arduino sketch development, speed controller configuration, and real-time PWM signal generation for brushless motor speed regulation)"
      ],
      "websites": [
        "https://openwa.pressbooks.pub/nehakardam12/chapter/understanding-induction-motors-theory-types-speed-torque-curves-and-applicati... (Understanding Induction Motors - theory, speed-torque curves, starting transients, full-load operating points, and practical selection criteria)",
        "https://www.tvtamerica.net/blogs/charts/ac-vs-dc-revealing-the-secret-behind-electric-motors (AC vs DC Motors Comparison - TVT America; comprehensive comparison of motor types, commutation mechanisms, reliability, maintenance, control characteristics, and industrial application selection)",
        "https://cmvte.com/advanced-field-oriented-control-foc-technology-for-automotive-motors/ (Advanced Field-Oriented Control (FOC) Technology - deep dive into FOC for PMSM and AC induction motors, vector control theory, coordinate transformations, sensor-less techniques)",
        "https://www.pmdcorp.com/resources/type/articles/get/field-oriented-control-foc-a-deep-dive-article (Field Oriented Control (FOC) - A Deep Dive - motion control techniques, vector control principles, multi-phase motor control strategies)",
        "https://www.automate.org/motion-control/industry-insights/role-of-motors-industrial-automation (The Role Of Motors In Industrial Automation - motor selection, efficiency optimization, control system integration, Industry 4.0 connectivity for predictive maintenance)",
        "https://ctms.engin.umich.edu/CTMS/index.php?example=MotorSpeed&section=SimulinkModeling (DC Motor Speed: Simulink Modeling - University of Michigan Control Tutorials; DC motor equations, Simulink modeling using mathematical blocks and Simscape physical modeling)",
        "https://www.ti.com/lit/an/sprabz0/sprabz0.pdf (Sensored Field Oriented Control of 3-Phase Permanent Magnet Synchronous Motors - Texas Instruments application note; FOC theory, mathematical transformations, microcontroller implementation, space vector modulation)"
      ],
      "tools": [
        "MATLAB & Simulink (Motor Control Blockset for system-level motor modeling, control algorithm design, FOC implementation, and closed-loop simulation with auto-tuning of PI gains)",
        "MATLAB Motor Control Blockset (reference examples for PMSM/ACIM control, code generation for STM32/ARM microcontrollers, parameterization workflows)",
        "STM32CubeMX + STM32CubeIDE (hardware configuration for motor control peripherals: PWM timers, ADC for current measurement, encoder interfaces; motor control library integration)",
        "STM32CubeAI & Motor Control Library (ST Microelectronics' optimized FOC algorithms for STM32 microcontrollers; pre-tuned control parameters, real-time execution)",
        "MATLAB Simscape (physical motor modeling including electromagnetic and thermal dynamics; nonlinear effects like saturation, spatial harmonics, and temperature dependencies)",
        "ANSYS Maxwell + Simulink (finite element analysis for motor electromagnetic design, force/torque calculations, thermal analysis, parameter extraction for control model validation)",
        "TI Code Composer Studio (DSP/microcontroller development for high-performance motor control; profiling and optimization for real-time performance)",
        "MotorCAD (detailed motor electromagnetic and thermal design, loss calculations, cooling strategy optimization)",
        "Falstad Circuit Simulator (analog controller circuit simulation, PD/PI controller tuning before hardware implementation)"
      ]
    }
  }
}
,
  {
  "id": "ee-131-power-electronics",
  "code": "EE 131",
  "name": "Power Electronics",
  "fullName": "EE 131: Power Electronics",
  "description": "Comprehensive course on power conversion and switching control. Covers DC-DC converters (buck, boost, buck-boost), AC-DC rectifiers, DC-AC inverters, PWM control techniques, feedback control loop design, and applications in motor drives, power supplies, and renewable energy systems. Essential for Control Systems & Automation engineers working with power systems and industrial drives.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 131 is a Tier 2 course bridging control theory (EE 122) and real-world industrial automation systems. For Control Systems & Automation engineers, power electronics is the interface between the digital control world and the physical world of motors, solenoids, and power systems. Why? Every industrial motor, conveyor, pump, and autonomous vehicle relies on power electronics to convert and regulate electrical energy efficiently. Without mastery of DC-DC converters, your battery-powered robot dies after 15 minutes due to poor efficiency. Without inverter design, your electric vehicle motor can't achieve rated performance. Without feedback control of switching power supplies, grid-tied solar systems become unstable. This course teaches design of switched-mode power converters with closed-loop control—the feedback loop principles from EE 122 are now applied to regulate output voltage/current under dynamic loads. Understanding duty cycle modulation, inductor/capacitor energy storage, and stability of PWM feedback loops is essential for modern automation. Industrial motor drives (VFDs, servo drives) in factories use three-phase inverters controlled by feedback loops taught in this course. Robotics platforms use buck/boost converters with control loops to maximize battery runtime. Off-grid renewable energy systems use DC-DC and inverter topologies with sophisticated control algorithms. This is Tier 2 because not all control engineers need to design power electronics from scratch, but those working on hardware integration, motor drives, power systems, or battery-powered systems absolutely must understand converter topologies, control loop design, and stability.",
    "realWorldApplications": [
      "Designing and tuning closed-loop feedback control for a buck converter powering a microcontroller in battery-powered robotics, optimizing efficiency from 70% to 95%",
      "Analyzing stability of three-phase SPWM (Sinusoidal PWM) inverter control loops driving industrial induction motors, ensuring smooth torque delivery and preventing oscillations",
      "Implementing peak current-mode control in a boost converter for renewable energy systems to extract maximum power from solar panels under varying irradiance",
      "Designing gate drive circuits and PWM modulation for six-IGBT inverter bridges in electric vehicles, coordinating three phases for smooth motor torque control",
      "Tuning PI compensators in switching power supply feedback loops to ensure phase margin >45° and fast load transient response (<1ms settling time)",
      "Modeling and simulating AC-DC power factor correction (PFC) rectifier control loops to reduce harmonic distortion in industrial automation systems drawing high power",
      "Selecting and configuring buck-boost converter topologies for robotic manipulators, trading off input voltage range capability vs. switching frequency constraints",
      "Analyzing discontinuous conduction mode (DCM) operation in low-power converters for energy-harvesting automation systems, trading off efficiency vs. EMI emissions"
    ],
    "learningOutcomes": [
      "Understand fundamental power conversion principles: energy conservation, efficiency trade-offs, and the role of inductors/capacitors as energy storage elements",
      "Analyze and design DC-DC converter topologies: buck (step-down), boost (step-up), buck-boost (inverted), and their isolated variants (flyback, forward, push-pull)",
      "Calculate converter steady-state operation: input-output voltage relationships (duty cycle D), average inductor current, ripple calculations for component selection",
      "Analyze converter transient behavior: continuous conduction mode (CCM) vs. discontinuous conduction mode (DCM) operation and boundary conditions",
      "Design and implement PWM (Pulse Width Modulation) control: modulation strategies, gate driver requirements, and synchronous switching for efficiency",
      "Master feedback control of converters: design voltage-mode and current-mode control loops, analyze stability using Bode plots and phase margin",
      "Design output LC filters: calculate corner frequencies and damping ratios to meet ripple specifications while maintaining stability margins",
      "Analyze three-phase inverter topologies: SPWM (Sinusoidal PWM), SVM (Space Vector Modulation), and six-step commutation for motor drives",
      "Understand AC-DC conversion: uncontrolled and controlled rectifiers, power factor correction (PFC) circuits, and harmonic reduction techniques",
      "Apply power electronics to real systems: motor drive control loops, renewable energy converters, battery charging systems, and industrial power supplies",
      "Simulate and verify designs: use MATLAB/Simulink and PLECS for converter modeling, control loop analysis, and hardware-in-the-loop validation before deployment"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=f7oXhDatwtY - Lecture 1: Introduction to Power Electronics (28:45) - Foundational concepts and real-world applications",
        "https://www.youtube.com/watch?v=zK0e7DtWq8E - Buck/Boost DC-DC Converters & PMSM Control (1:02:53) - Buck, boost topologies with motor control integration",
        "https://www.youtube.com/watch?v=goyJgp33e8M - DC DC Converter Topology EN (38:12) - Comprehensive comparison of all DC-DC converter types (SEPIC, ZETA, CUCK, etc.)",
        "https://www.youtube.com/watch?v=PgTR7226sHU - How Buck, Boost & Buck-Boost DC-DC Converters Work (12:00) - Intuitive explanation of three fundamental topologies",
        "https://www.youtube.com/watch?v=yzOHMPu80uo - Buck-Boost Converter: Power Electronics (40:35) - Detailed design and analysis with waveforms",
        "https://www.youtube.com/watch?v=au8ufg1PTto - What is a Three-Phase Inverter? Working, Applications, Advantages (13:48) - Three-phase inverter principles for motor drives",
        "https://www.youtube.com/watch?v=OPaXVa6r62w - 3 Phase Inverter Basics: Working Principle (15:30) - IGBT switching sequences and phase generation",
        "https://www.youtube.com/watch?v=cy0IwzsDRY4 - Micro-Cap Tutorial: MOSFET Inverter Three Phase (Motor Control) (7:20) - Practical MOSFET gate signals for three-phase drive",
        "https://www.youtube.com/watch?v=DfCuNjHDRHE - Modeling and Control of PWM Converters: Tutorial Part I (1:03:35) - Mathematical modeling and control design",
        "https://www.youtube.com/watch?v=IyiCHMHE5Qg - How to Design Buck, Boost & Buck-Boost DC-DC Converters (19:42) - Step-by-step design methodology",
        "https://www.youtube.com/watch?v=zf-pvHysroM - How to Design Perfect Switching Power Supply (20:00) - Gate drivers and PWM practical considerations"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/6-334-power-electronics-spring-2007/ - MIT OpenCourseWare: Power Electronics (6.334) - Comprehensive lecture notes and problem sets",
        "https://www.coursera.org/specializations/modeling-and-control-of-power-electronics - Coursera: Modeling and Control of Power Electronics Specialization (5-course series with design projects)",
        "https://engineeringonline.ncsu.edu/online-courses/fall-2023/ece-534-power-electronics/ - NC State University: ECE 534 Power Electronics - Graduate-level course structure and objectives",
        "https://cdn.rohde-schwarz.com/ymkt/na/content/tips_tricks_control_loop_stability.pdf - Rohde & Schwarz: Tips on Verifying Control Loop Stability (SMPS Application Note)",
        "https://www.powerelectronicsnews.com/drives-for-motion-control/ - Power Electronics News: Drives for Motion Control - Industrial applications overview",
        "https://resources.altium.com/p/pwm-power-supply-design - Altium: PWM in Power Supply Design - Practical design considerations",
        "https://www.monolithicpower.com/en/learning/mpscholar/electric-motors/motor-control-and-drive-electronics/basics-of-motor-contro - Monolithic Power: Basics of Motor Control Circuits",
        "https://www.ti.com/lit/pdf/sboa187 - Texas Instruments: Current Mode Control in Switching Power Supplies (Application Note)",
        "https://www.ti.com/lit/pdf/slyy078 - Texas Instruments: Power Electronics in Motor Drives (Technical Reference)",
        "https://www.analog.com/en/resources/technical-articles/understanding-power-supply-loop-stability-and-compensation-part-2.html - Analog Devices: Understanding Power Supply Loop Stability and Compensation"
      ],
      "tools": [
        "MATLAB & Simulink with Simscape Power Systems - Industry-standard for converter modeling, control system design, and hardware-in-the-loop simulation",
        "PLECS (Plexim) - Specialized power electronics circuit simulator with real-time HIL capabilities for motor drive development",
        "LTspice - SPICE simulator with extensive power semiconductor models (MOSFETs, IGBTs, diodes) for converter circuit verification",
        "PSIM (Powersim) - Real-time simulator for switched-mode power converters and motor drive control",
        "Ansys Maxwell - Finite-element analysis for inductor and transformer design with electromagnetic coupling",
        "Python with PySpice and NumPy - Open-source tools for converter analysis, control loop design, and optimization",
        "Texas Instruments WEBENCH - Online design tool for power converter selection and optimization",
        "Microchip dsPIC and STM32 microcontroller platforms - For implementing PWM control algorithms and gate driver interfacing",
        "Analog Devices SIMPLIS - Advanced mixed-signal simulation for power electronics with control circuits",
        "Real-time oscilloscopes (Rohde & Schwarz, Tektronix) - For measuring loop gain and stability margins in built power supplies using injection methods"
      ]
    }
  }
}
,
  {
  "id": "ee-150-digital-communication",
  "code": "EE 150",
  "name": "Digital Communication",
  "fullName": "EE 150: Digital Communication",
  "description": "Comprehensive study of digital communication theory, modulation/encoding techniques, and industrial communication protocols. Focuses on connecting embedded control systems, sensors, and actuators in deterministic real-time networks across factory automation, wireless IoT, and distributed industrial systems.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers must master digital communication to build interconnected industrial systems where PLCs, motor drives, sensors, and actuators exchange real-time control information reliably. This tier-2 course builds on signal processing foundations (EE 102) and microcontroller architecture (EE 140) to enable engineers to: select and implement industrial communication protocols (CANbus, EtherCAT, Profibus, Modbus) for distributed automation networks, design real-time deterministic communication systems meeting motion control synchronization requirements (<1µs jitter), integrate wireless connectivity (5G, LoRaWAN, WiFi) for Industry 4.0 predictive maintenance, and troubleshoot communication failures in production systems. Modern manufacturing demands: multi-axis motion control with distributed clock synchronization (±1ns timing precision across 100+ nodes), sub-millisecond latency for safety-critical emergency stops, scalability from 2 to 1000+ networked devices, and seamless integration with cloud analytics platforms. Industry leaders (Siemens, ABB, Beckhoff, Rockwell Automation) employ these protocols across all major automation deployments. Without mastery of industrial communication standards, engineers cannot architect reliable networked control systems or migrate legacy serial protocols to modern Ethernet-based platforms. This course enables hands-on design using CANopen, EtherCAT, and real-time Linux platforms to simulate production networks.",
    "realWorldApplications": [
      "Architecting a 50-axis injection molding machine using EtherCAT real-time Ethernet by synchronizing position commands across servo drives with ±1ns timing precision, achieving coordinated multi-axis motion with <100µs cycle time, enabling complex part geometries impossible with traditional point-to-point control",
      "Implementing predictive maintenance across a manufacturing facility using LoRaWAN wireless sensors deployed on 200+ machines by transmitting bearing vibration data, motor current signatures, and thermal measurements to cloud-based anomaly detection, reducing unplanned downtime by 17% and extending equipment lifespan by 30%",
      "Converting legacy Profibus serial networks to modern Industrial Ethernet (PROFINET) by maintaining backward compatibility with existing sensor/actuator hardware, gaining 10x bandwidth increase (12 Mbps → 100 Mbps), and enabling deterministic cycle times <1ms for advanced process control",
      "Designing a CANopen motion control network for a robotic palletizer by configuring 12 servo motor drives with distributed PDO (Process Data Object) messages, coordinating synchronized movements across 3 linear axes and 2 rotational axes, achieving ±0.1° positioning repeatability with <50ms cycle time",
      "Integrating 5G connectivity into autonomous mobile robots (AMRs) for real-time fleet management by transmitting position telemetry, collision avoidance sensor data, and task assignments with <20ms latency, enabling centralized orchestration of 50+ robots across warehouse operations without cloud dependency",
      "Building IoT-enabled HVAC/lighting control systems using wireless protocols (WiFi + LoRaWAN) to optimize energy consumption in multi-story industrial facilities by collecting occupancy data, temperature/humidity readings, and ambient light levels from 500+ sensors, reducing energy costs by 21%",
      "Troubleshooting communication failures in a high-speed packaging line by analyzing EtherCAT timing jitter, identifying dropped frames caused by network congestion, re-prioritizing traffic using VLAN tagging and QoS policies, restoring production rates from 60% to 99.2% uptime"
    ],
    "learningOutcomes": [
      "Understand foundational digital communication theory: modulation schemes (FSK, PSK, QAM), encoding techniques (Manchester, NRZ, differential), noise immunity, and bit error rate analysis for industrial environments with electromagnetic interference",
      "Analyze and compare industrial communication protocols: CANbus (ISO 11898) for automotive/mobile robotics, CANopen for distributed motion control, Profibus/PROFINET for process automation, EtherCAT for high-performance real-time systems, Modbus for legacy integration",
      "Design deterministic real-time communication systems achieving bounded latency (<1µs jitter) and synchronization (±1ns) using distributed clocks, priority-based messaging, and time-sensitive networking (TSN) techniques for multi-axis motion control",
      "Implement wireless communication protocols (WiFi, 5G, LoRaWAN) for industrial IoT applications, balancing range, power consumption, bandwidth, and latency for remote monitoring, predictive maintenance, and autonomous vehicle control",
      "Configure industrial communication networks: topology design (ring, line, star, tree), addressing schemes, node synchronization, fault detection/recovery, and redundancy for high-availability systems",
      "Apply digital communication concepts to embedded systems: UART/SPI/I2C peripheral programming on STM32 microcontrollers, CAN transceiver interfacing, protocol stack implementation, and real-time task prioritization",
      "Troubleshoot communication failures by analyzing packet traces (Wireshark), measuring timing jitter, identifying collision/congestion sources, and implementing network optimization strategies (traffic shaping, QoS, VLAN tagging)",
      "Evaluate trade-offs between communication protocols considering: performance (bandwidth, latency, jitter), cost, complexity, scalability, power consumption, and compatibility with legacy industrial equipment"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=oYps7vT708E (CAN Bus Explained - A Simple Intro - comprehensive overview of CAN bus architecture, frame structure, message fields, OBD2/J1939/CANopen higher-layer protocols, and practical data logging applications)",
        "https://www.youtube.com/watch?v=DlbkWryzJqg (CANopen Explained - A Simple Intro - detailed introduction to CANopen protocol including communication models, Object Dictionary, Electronic Data Sheets, device profiles, and integration of off-the-shelf nodes)",
        "https://www.youtube.com/watch?v=iz8S4u0VIfI (Ethernet or EtherCAT for Motion Control Webinar - technical comparison of EtherCAT vs standard Ethernet, distributed clock synchronization, deterministic cycle times, and motion control application selection criteria)",
        "https://www.youtube.com/watch?v=KVvDIgnBz8o (CANopen Networking: How it Works - CANopen architecture, messaging protocols (PDO/SDO services), SYNC message synchronization, encoder coordination, and Horner OCS controller integration)",
        "https://www.youtube.com/watch?v=N8frg3mTZbs (CANopen: CANbus Based Protocols - ICP DAS overview of CANopen as standardized embedded network protocol used in industrial machines, building automation, medical devices, and maritime applications)",
        "https://www.youtube.com/watch?v=Fx5qxWKeOnA (CNC Motion Control over Ethernet Cable! EtherCAT - practical demonstration of LinuxCNC with Leadshine drivers over EtherCAT, showing real-time multi-axis synchronization and deterministic communication for CNC machine control)"
      ],
      "websites": [
        "https://www.ti.com/lit/pdf/spry254 (Texas Instruments: An Inside Look at Industrial Ethernet Communication Protocols - comprehensive analysis of CANbus, Profibus, PROFINET, EtherCAT, ControlNet, and selection criteria for industrial applications)",
        "https://dewesoft.com/blog/what-is-ethercat-protocol (What Is EtherCAT Protocol and How Does It Work - detailed EtherCAT technology explanation, topology advantages, distributed clock synchronization, deterministic timing (~1ns), open standard benefits, and comparison with CANopen)",
        "https://www.opal-rt.com/blog/5-types-of-communication-protocols-in-plc-systems/ (5 Types of Communication Protocols in PLC Systems - comprehensive guide covering DNP3, DF1, Interbus, PROFINET, TCP/UDP, ControlNet with real-time simulation applications)",
        "https://rt-labs.com/technologies/ethercat/ (RT-Labs: EtherCAT Industrial Communication - technical deep dive into EtherCAT's 'processing on the fly' architecture, >90% effective data rate efficiency, deterministic communication, and servo/drive synchronization)",
        "https://www.milesight.com/iot/blog/what-is-lorawan-technology (What Is LoRaWAN: The $3.7B IoT Protocol - industrial IoT applications, real-world case studies (21% energy cost reduction, 17% downtime reduction), wireless connectivity for predictive maintenance and smart HVAC/lighting control)",
        "https://www.cdebyte.com/news/642 (CAN, ModBus, ProfiNet - How to choose the right industrial bus - selection criteria based on timeliness, topology requirements, reliability/fault-tolerance, with performance comparisons)",
        "https://www.encoder.com/hubfs/white-papers/WP-2019_Industrial-Ethernet-Protocols/wp2019-industrial-ethernet-communication-protoc... (Encoder: Industrial Ethernet Communication Protocols - comprehensive white paper comparing fieldbus technologies, Ethernet protocols, and selection guidelines)",
        "https://www.clarify.io/learn/industrial-protocols (Industrial Protocols Overview - background, history, and specifics of communication protocols spanning CAN, Profibus, EtherCAT, DeviceNet, ControlNet, and modern industrial Ethernet standards)"
      ],
      "tools": [
        "CANopen Stack (CANOPEN_Lib) - open-source CANopen protocol implementation for STM32 microcontrollers and embedded systems",
        "PEAK-System PCAN-View (CAN bus monitoring) - real-time CAN/CANopen traffic analysis, message filtering, and protocol debugging",
        "Wireshark - comprehensive network packet analyzer for industrial Ethernet (PROFINET, EtherCAT, OPC UA) traffic capture and analysis",
        "TIA Portal (Siemens) - engineering platform for Profibus/PROFINET programming and configuration with real-time diagnostics",
        "TwinCAT (Beckhoff) - engineering framework for EtherCAT master programming, real-time synchronization, and motion control algorithm development",
        "STM32CubeIDE + CAN driver stack - embedded development for CANopen node implementation on STM32 microcontrollers",
        "LabVIEW Industrial Communications - graphical programming for CANbus, PROFINET, OPC UA protocol implementations",
        "Real-time Linux (PREEMPT-RT kernel) - deterministic communication system design and testing for sub-millisecond latency requirements",
        "Network simulation tools (ns-3, OMNET++) - validation of communication protocols, latency jitter analysis, and fault tolerance testing",
        "Industrial protocol protocol stacks (CODESYS, IEC 61131-3 runtime) - standardized programming across multiple industrial communication platforms"
      ]
    }
  }
}
,
  {
  "id": "ee-185-instrumentation",
  "code": "EE 185",
  "name": "Instrumentation",
  "fullName": "EE 185: Instrumentation",
  "description": "Comprehensive course on measurement systems, sensors, transducers, and signal conditioning. Covers analog-to-digital conversion, data acquisition systems, error analysis, calibration techniques, and practical implementation of measurement chains. Essential for Control Systems & Automation engineers who must acquire accurate sensor data for closed-loop system control.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 185 is a Tier 2 course because it bridges EE 101/111 (circuit design) and EE 122 (control theory) to enable real-world system implementation. For Control Systems & Automation engineers, instrumentation is the critical link between the physical world and the digital control loop. Why? Every feedback control system depends on accurate sensor measurements: a 1% error in temperature measurement cascades to 10% error in heating control; a noisy pressure sensor causes instability in compressor control. This course teaches you to design measurement chains from physics principles through signal conditioning to digital processing. Understanding sensor selection (thermocouples vs. RTDs vs. thermistors for temperature), noise sources (ground loops, common-mode interference), and signal conditioning (amplification, filtering, isolation) is essential for industrial automation. Modern industrial systems use 4-20mA analog signals, I2C/SPI digital interfaces, and CAN networks—this course teaches interfacing protocols and data acquisition systems that control everything from HVAC systems to robotic manipulators. Calibration and uncertainty analysis ensure that your control system meets performance specifications despite component tolerances and environmental variation. In factory automation, a poorly selected or conditioned pressure sensor creates false alarms costing $100,000s in unplanned downtime. This course teaches how to prevent such failures through proper instrumentation design. For battery-powered and IoT automation systems, understanding power-efficient sensor interfaces and sampling strategies is essential. This is Tier 2 because not all control engineers need to design sensors from first principles, but those working on hardware integration, industrial systems, or robotics absolutely must understand measurement system design to ensure closed-loop stability and accuracy.",
    "realWorldApplications": [
      "Selecting and conditioning thermocouple signals for industrial furnace control, implementing cold-junction compensation and linearization to achieve ±2°C accuracy across 200-1200°C range",
      "Designing 4-20mA current-loop signal conditioning for pressure transmitters in oil & gas pipelines, using isolation amplifiers to break ground loops and eliminate ±5% measurement errors",
      "Implementing multi-sensor fusion in autonomous vehicles by analyzing sensor noise characteristics and using data acquisition systems to synchronously sample LIDAR, camera, and IMU data",
      "Designing anti-aliasing filters for motor current monitoring in industrial drives, selecting cutoff frequency to avoid aliasing while maintaining high-frequency fault detection capability",
      "Calibrating LVDT (Linear Variable Differential Transformer) displacement sensors for robotic arm position feedback, ensuring linearity ±0.5% and achieving reproducible control accuracy",
      "Implementing data acquisition on battery-powered IoT sensors for facility monitoring, optimizing sampling rate and sensor power consumption to extend battery life from weeks to months",
      "Designing precision load cell signal conditioning for weighing systems in automated packaging lines, using Wheatstone bridge excitation and instrumentation amplifiers for 0.1% accuracy",
      "Analyzing measurement uncertainty in test data for motor control verification, using statistical methods to ensure control loop performance meets specifications despite ±10% component tolerances"
    ],
    "learningOutcomes": [
      "Understand complete measurement systems: sensors detect physical phenomena, transducers convert to electrical signals, signal conditioning prepares signals for digital processing",
      "Master sensor characteristics: sensitivity, dynamic range, linearity, hysteresis, repeatability, and response time—critical for selecting appropriate sensors for control applications",
      "Apply error analysis and uncertainty quantification: systematic vs. random errors, statistical analysis of measurement data, propagation of uncertainty through measurement chains",
      "Design and analyze signal conditioning circuits: amplification, filtering (low-pass, high-pass, band-pass), isolation (for ground loop elimination), linearization, and bridge completion",
      "Understand analog-to-digital conversion: sampling theorem, Nyquist rate, quantization error, aliasing, and selection of ADC architectures (SAR, pipeline, sigma-delta) for specific applications",
      "Implement practical data acquisition systems: channel configuration, multiplexing trade-offs, sampling synchronization, and real-time processing requirements",
      "Design and select sensors for specific measurements: temperature (thermocouples, RTDs, thermistors), pressure (piezoelectric, piezoresistive), displacement (LVDT, capacitive), and flow (turbine, vortex, thermal)",
      "Perform calibration procedures: static calibration, dynamic calibration, cold-junction compensation for thermocouples, and verification against certified standards",
      "Analyze and eliminate noise sources: ground loops, common-mode interference, electromagnetic interference (EMI), shielding techniques, and proper PCB layout for instrumentation circuits",
      "Apply instrumentation to control systems: measurement requirements for feedback control, sensor latency effects on closed-loop stability, and integration with PLCs and microcontrollers"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=owc65TnJCog - Introduction To Measurements: Sensors & Transducers (9:32) - Foundational concepts and classification",
        "https://www.youtube.com/watch?v=ltpkxY7UmFk - Sensors vs Transducers | Instrumentation Technician Guide (7:11) - Clear distinction with industrial examples",
        "https://www.youtube.com/watch?v=y48aJLUvy0Q - How Analog-to-Digital (ADC) & Digital-to-Analog (DAC) Converters Work (19:58) - Sampling, quantization, encoding process",
        "https://www.youtube.com/watch?v=xTlZbAYxUf8 - Signal Conditioning in Instrumentation Explained (1:37) - Overview of amplification, filtering, isolation, linearization",
        "https://www.youtube.com/watch?v=SUUm8xf0toI - Need and Types of Signal Conditioning (9:34) - Detailed signal conditioning techniques and requirements",
        "https://www.youtube.com/watch?v=AksLaW9k8Eg - General Measurement System | Basic Concept (31:15) - Complete measurement chain architecture",
        "https://www.youtube.com/watch?v=b-z0N_7c_nc - Liquid Level Measurement Using Inductive Transducer (8:26) - Practical sensor implementation example",
        "https://www.youtube.com/watch?v=k0y_5v_Gb1k - Part 5 Analog to Digital Conversion (6:42) - ADC fundamentals and alias filtering",
        "https://www.youtube.com/watch?v=TiUzH0zFi2A - Analog To Digital Converters Explained: What They Do and How They Work (15:31) - Step-by-step ADC process",
        "https://www.youtube.com/watch?v=AddPVrzJ1MM - Lec 36: Signal Conditioning Circuits Units and Design (31:45) - Wheatstone bridge and instrumentation amplifier design",
        "https://www.youtube.com/watch?v=nSeW3R2hr1A - Introduction to Transducer (21:21) - Transducer components and sensing principles",
        "https://www.youtube.com/watch?v=5Wz5f3n5sjs - Analog to Digital Conversion Tutorial from Measurement Computing (12:17) - ADC types and accuracy analysis",
        "https://www.youtube.com/watch?v=0y8AD8maAHo - Analog-to-Digital Converters (ADC): Basics (15:11) - Transfer curves, offset errors, quantization errors"
      ],
      "websites": [
        "https://myiaae.org/product/course-1b-measurement-sensors-and-actuation/ - IAAE: Measurement, Sensors, and Actuation Course",
        "https://my.avnet.com/ebv/resources/article/analog-to-digital-conversion-in-test-and-measurement-applications/ - Avnet: Analog-to-Digital Conversion in Test and Measurement",
        "https://arshon.com/blog/understanding-signal-conditioning-techniques-optimizing-accuracy-and-performance-in-electronic-systems/ - ArshonTech: Signal Conditioning Techniques",
        "https://www.philadelphia.edu.jo/academics/kaubaidy/uploads/Sensor-Lect1.pdf - University of Philadelphia: Advanced Measurement Systems & Sensors (PDF)",
        "https://www.tek.com/en/products/keithley/data-acquisition-daq-systems - Tektronix Keithley: Data Acquisition Systems",
        "https://www.dubai-sensor.com/blog/the-hidden-hero-of-precision-measurements-the-signal-conditioner/ - Dubai Sensor: The Hidden Hero of Precision Measurements",
        "https://meche.mit.edu/featured-classes/measurement-and-instrumentation - MIT: 2.671 Measurement and Instrumentation (course information)",
        "https://control.com/textbook/digital-data-acquisition-and-networks/analog-digital-conversion/ - Control.com: Analog to Digital Conversion and ADCs (Textbook)",
        "http://maecourses.ucsd.edu/callafon/labcourse/lecturenotes/error_analysis_lecture.pdf - UC San Diego: Measurement Error Analysis and Statistics (PDF)",
        "https://dewesoft.com/blog/what-is-data-acquisition - Dewesoft: Data Acquisition (DAQ) The Ultimate Guide",
        "https://www.fluke.com/en-us/learn/blog/calibration/signal-conditioning-ensures-measurement-accuracy - Fluke: Guide to Signal Conditioning",
        "https://www.interfaceforce.com/signal-conditioners-101/ - Interface Force: Signal Conditioners 101",
        "https://www.iothrifty.com/blogs/news/what-is-a-signal-conditioner - IoThrifty: What Is a Signal Conditioner?"
      ],
      "tools": [
        "MATLAB & Signal Processing Toolbox - Design and verify anti-aliasing filters, analyze ADC performance, and process measurement data",
        "LabVIEW & DAQmx - Industry-standard data acquisition software for real-time sensor interfacing and measurement system development",
        "NI Data Acquisition Hardware (USB DAQ, CompactRIO) - Practical data acquisition devices with built-in analog inputs, signal conditioning, and synchronization",
        "Python with NumPy/SciPy - Open-source tools for sensor calibration curves, uncertainty analysis, and statistical processing of measurement data",
        "LTspice - Circuit simulation for signal conditioning designs: anti-aliasing filters, instrumentation amplifiers, and transducer interface circuits",
        "Measurement Computing Instacal & TracerDAQ - Easy-to-use data acquisition software for multi-channel sensor monitoring and logging",
        "Calibration Standards (certified multimeters, function generators, pressure standards) - Essential for verifying measurement system accuracy and performing traceability checks",
        "Oscilloscopes with Advanced Math Functions - For analyzing sensor signals, noise characterization, and verification of signal conditioning circuit performance",
        "Thermal Imaging Cameras (FLIR, Seek) - Non-contact temperature measurement for validation and validation of temperature sensor systems",
        "Sensor Simulation Tools (ANSYS, COMSOL) - Finite-element analysis for characterizing sensor response and optimizing transducer designs"
      ]
    }
  }
}
,
  {
  "id": "engr-120-fluid-mechanics",
  "code": "ENGR 120",
  "name": "Fluid Mechanics",
  "fullName": "ENGR 120: Fluid Mechanics",
  "description": "Comprehensive study of fluid statics, dynamics, and thermodynamics applied to pneumatic and hydraulic automation systems. Covers pump/motor selection, flow control, pressure regulation, and computational fluid dynamics simulation for industrial actuator design.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers must master fluid mechanics to design, select, and optimize the pneumatic and hydraulic systems that actuate industrial machinery. This tier-2 course builds on fundamental engineering principles to enable engineers to: model fluid power systems using Pascal's Law and Bernoulli's Equation, calculate pressure drop and total dynamic head (TDH) for pump selection, design feedback control loops for pressure and flow regulation, optimize actuator performance for force-speed trade-offs, and simulate complex hydraulic/pneumatic circuits. Modern automation increasingly demands: energy-efficient variable frequency drive (VFD) pump systems (25-40% energy savings vs. fixed-displacement), precise pressure control (±1 psi tolerance) for multi-actuator coordination, deterministic response times (<100ms) for synchronized motion, and seamless integration with PLC control algorithms. Industry leaders (Parker Hannifin, Bosch Rexroth, Eaton, SMC) employ these principles across 30+ million pneumatic/hydraulic actuators deployed in factories worldwide. Without mastery of fluid mechanics, engineers cannot effectively: select appropriate pump types (centrifugal vs. positive displacement) for different applications, calculate system efficiency and identify energy waste opportunities, troubleshoot pressure/flow issues in production systems, or design adaptive control strategies for varying load conditions. This course enables hands-on design using pump curves, CFD simulation tools (ANSYS Fluent, SimFlow), and real circuit analysis to build production-ready automation systems.",
    "realWorldApplications": [
      "Selecting and sizing hydraulic pumps for a 1000-ton injection molding machine by calculating total dynamic head (TDH) from system resistance, load pressure, and vertical lift requirements, ensuring pump operates near peak efficiency (88-92%) while minimizing cavitation risk and energy consumption",
      "Designing a multi-actuator pressure control system for a robotic palletizer by implementing independent proportional pressure relief valves with closed-loop feedback, achieving ±1 psi tolerance across 50-200 psi operating range and enabling coordinated force distribution across 12 pneumatic cylinders",
      "Optimizing pneumatic system efficiency by converting fixed-displacement pump with throttling valves to variable speed VFD drive, reducing energy consumption from 15 kW to 9 kW (40% savings) while maintaining production speed by controlling flow rate proportionally to demand",
      "Modeling and simulating a hydraulic servo system using ANSYS CFD to predict pressure ripple, flow noise, and heat generation at 3000 rpm pump speed, identifying cavitation zones and optimizing valve porting geometry to reduce noise by 8 dB and extend component lifespan from 8,000 to 15,000 hours",
      "Troubleshooting a failing industrial press by analyzing pump performance curves, measuring actual flow vs. rated capacity, identifying internal leakage (slip) in worn pump clearances, and calculating cost-benefit of pump replacement vs. hydraulic fluid viscosity adjustment for extending service life",
      "Designing a load-sensing proportional directional control valve for a mobile crane's hydraulic circuit, enabling independent multi-load control across boom, bucket, and swing actuators with automatic pump displacement adjustment to match required flow, reducing fuel consumption by 18%",
      "Implementing an energy recovery system on a packaging line by recovering pressure energy from pneumatic cylinder exhaust using a backpressure regulator, storing compressed air in accumulator, and feeding recovered energy to secondary actuation, reducing compressed air consumption by 22%"
    ],
    "learningOutcomes": [
      "Apply foundational fluid mechanics principles (Pascal's Law, Bernoulli's Equation, continuity equation) to analyze pneumatic and hydraulic systems, predicting pressure, flow rate, and energy conservation in complex circuit topologies",
      "Calculate pump performance parameters: volumetric flow rate, displacement, pressure-flow curves, slip/internal leakage, and efficiency maps to match pump selection to system duty cycles and operating conditions",
      "Analyze pump affinity laws (relationship between speed, flow, pressure, power) to predict pump behavior when driven by variable frequency drives (VFDs), enabling energy optimization while maintaining system performance",
      "Design pressure and flow control systems using proportional valves, pilot-operated relief valves, and load-sensing compensators to achieve precise actuator control with bounded response times (<100ms) and minimal pressure overshoot",
      "Calculate total dynamic head (TDH) and friction losses in hydraulic/pneumatic piping networks, using Darcy-Weisbach equations and friction factor correlation to optimize pipe sizing for minimum energy waste",
      "Compare pneumatic vs. hydraulic vs. electric actuator technologies for specific automation applications considering force output, speed, response time, precision, cost, maintenance, and energy efficiency trade-offs",
      "Perform computational fluid dynamics (CFD) simulations using ANSYS Fluent or SimFlow to predict internal flow patterns, pressure ripple, cavitation risk, and thermal behavior in pumps, motors, and valve bodies for design optimization",
      "Troubleshoot failing fluid power systems by analyzing pump curves, measuring actual performance, identifying cavitation, leakage, viscosity degradation, and predicting remaining useful life for maintenance planning"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=zHto_QiORz0 (Introduction to Pneumatics - Full Lecture by Jim Pytel; comprehensive 21-minute lecture covering pressure/flow fundamentals, compressible vs. incompressible fluid behavior, extend/retract dynamics, blocked port analysis, pneumatic shock absorbers, safety considerations, and system schematics)",
        "https://www.youtube.com/watch?v=quBgFIa50kw (Fluid Mechanics And Hydraulic Machines - A Basic Introduction; foundational overview of Pascal's Law, pressure/force relationships, different actuation mechanisms (pneumatic/hydraulic/electrical), and industrial automation applications)",
        "https://www.youtube.com/watch?v=xsGxOfwWm_E (Pneumatic and Hydraulic Systems - An Introduction; comprehensive series covering fundamental principles, pressure regulation, pumps, compressors, air treatment, actuators, control valves, sequencing applications, and maintenance troubleshooting)",
        "https://www.youtube.com/watch?v=uaSOTsfXk74 (Mechanical Hydraulic Basics Course, Lesson 03 - Fluid Power Analysis; introduction to hydraulic/pneumatic system components, operation principles, design, application, and troubleshooting methodologies with simulators)",
        "https://www.youtube.com/watch?v=aElVHJdasA0 (Computational Fluid Dynamics (CFD) in ANSYS Discovery; practical CFD tutorial showing geometry import, mesh generation, boundary conditions, simulation setup, convergence monitoring, and post-processing of flow results)",
        "https://www.youtube.com/watch?v=3YhIa9u1Kgk (ANSYS Discovery: Part 2 - Setting up an Internal CFD Analysis; advanced CFD techniques including pressure drop monitoring, high-fidelity simulation, mesh refinement strategies, and flow field visualization)"
      ],
      "websites": [
        "https://www.aberdeendynamics.com/pneumatic-vs-hydraulic-actuators-which-is-right-for-your-application (Pneumatic vs. Hydraulic Actuators - technical comparison including force output, speed, precision, cost, and application selection criteria for industrial automation)",
        "https://www.equilibar.com/application/control-the-flow-of-a-pump/ (Control the Flow of a Pump - Equilibar; methods for pump flow control including variable speed VFDs, throttling, pressure regulation, and advanced pilot-operated flow control valve technology)",
        "https://enterprise.trimech.com/computational-fluid-dynamics-cfd-simulation-uses-and-benefits/ (CFD Simulation Uses and Benefits - CFD advantages in design optimization, rapid prototyping, automated meshing, and multiphysics analysis for pump and valve design)",
        "https://www.progressiveautomations.com/blogs/products/pros-cons-of-hydraulic-pneumatic-and-electric-linear-actuators (Pros & Cons of Hydraulic, Pneumatic, & Electric Linear Actuators - comprehensive technology comparison with selection guidance based on force, speed, precision, cost, and maintenance requirements)",
        "https://www.csidesigns.com/blog/articles/how-to-read-a-pump-curve (How to Read a Pump Curve - practical guide to interpreting pump performance curves, head/pressure relationships, efficiency regions, NPSH requirements, and pump selection methodology)",
        "https://instrumentationtools.com/pumping-system-in-industrial-automation/ (Basic Pumping System Application - industrial control philosophy for multi-pump systems, VFD speed control, PID pressure regulation, cut-in/cut-off set points, and pump run management)",
        "https://www.ansys.com/simulation-topics/what-is-computational-fluid-dynamics (ANSYS: What is Computational Fluid Dynamics - fundamental CFD workflow including domain discretization, mesh generation, equation solving, and post-processing for complex flow analysis)",
        "https://www.emersonautomationexperts.com/2011/valves-actuators-regulators/flow-control-with-vfd-pumps-versus-control-valves/ (Flow Control with VFD Pumps vs. Control Valves - economic analysis showing 40%+ energy savings with VFD pump systems, power factor improvements, and process redesign considerations)"
      ],
      "tools": [
        "ANSYS Fluent (industrial-grade CFD solver for pump/motor/valve simulation with advanced turbulence modeling, multiphase flow, and thermal-mechanical coupling)",
        "ANSYS Discovery (user-friendly CFD platform with automated meshing, real-time simulation, and design optimization for fluid power component analysis)",
        "SimFlow (open-source CFD preprocessor compatible with OpenFOAM solver for accessible hydraulic circuit and actuator simulations)",
        "MATLAB/Simulink (Simscape Fluids library for pneumatic/hydraulic system modeling, circuit schematic design, and control algorithm integration)",
        "PumpCurve software (proprietary tool for pump selection, performance curve analysis, and system matching calculations)",
        "LMS IMAGINE.Lab (multi-body dynamics with fluid power component libraries for complete system simulation)",
        "CAD software (SolidWorks, AutoCAD) for pump/valve/actuator geometry creation and CFD meshing preparation",
        "Python libraries (CoolProp for fluid property calculations, SciPy for numerical solutions of Navier-Stokes equations)",
        "Pump manufacturers' design software (Parker Hannifin, Bosch Rexroth, Eaton) for component selection and circuit optimization"
      ]
    }
  }
}
,
  {
  "id": "engr-130-thermodynamics",
  "code": "ENGR 130",
  "name": "Thermodynamics",
  "fullName": "ENGR 130: Thermodynamics",
  "description": "Comprehensive study of thermodynamic principles, energy conservation, and heat transfer for engineering systems. Covers first and second laws of thermodynamics, energy balances, thermodynamic cycles, and applications to thermal systems. Essential for Control Systems & Automation engineers designing heating, cooling, power, and energy management systems.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "ENGR 130 is a Tier 2 course because it bridges general engineering principles with specific application domains in automation. For Control Systems & Automation engineers, thermodynamics is essential if your work involves thermal systems: HVAC (heating/ventilation/air conditioning), power plants, battery management, industrial cooling, and industrial process control. Why? A closed-loop HVAC controller requires a thermodynamic model to predict room temperature response to heating/cooling inputs—without understanding heat capacity, thermal resistance, and latent heat, your control loop will be unstable. Industrial cooling towers use feedback control loops to maintain setpoint temperatures; understanding energy balances and the interplay between sensible and latent heat transfer is critical. Battery management systems use thermodynamic models to predict cell temperature rise during charging/discharging cycles. Power electronic systems (inverters, motor drives) generate heat; controlling junction temperatures requires understanding thermal resistance networks and heat dissipation principles. Model Predictive Control (MPC) for buildings requires accurate thermodynamic system models—the quality of your model directly determines control performance. This course is Tier 2 (not Tier 1) because not all control engineers work with thermal systems. Control engineers in robotics, signal processing, or pure algorithmic domains may never need deep thermodynamic knowledge. However, any control engineer working on industrial systems, energy management, environmental systems, or power electronics absolutely must understand thermodynamic principles. In practice, for many industrial automation jobs, this becomes Tier 1.",
    "realWorldApplications": [
      "Modeling a building HVAC system: write energy balance equations for room temperature, accounting for solar gain, occupant load, heating/cooling input, and thermal mass, then design feedback controller to maintain setpoint ±1°C despite disturbances",
      "Designing a cooling tower feedback control loop for industrial process water, modeling sensible and latent heat transfer, fan speed control to maintain outlet temperature setpoint while minimizing energy consumption",
      "Implementing battery thermal management in electric vehicles: model battery temperature rise from resistive heating during fast charging, design cooler control loop to maintain safe operating temperature (<55°C)",
      "Optimizing power supply thermal control in data centers: analyze heat dissipation of power electronics, design multi-loop control system for coolant temperature and fan speed to prevent thermal runaway",
      "Designing refrigeration cycle control for industrial freezers: apply first law energy balance to compressor/condenser/evaporator system, model refrigerant enthalpy changes, tune compressor capacity control for setpoint accuracy",
      "Modeling waste heat recovery in manufacturing: characterize exhaust stream temperature/flow, design heat exchanger control to maximize energy recovery while maintaining process stability",
      "Implementing predictive control for district heating systems: build thermodynamic model of pipeline thermal lag, predict heating demand, optimize pump speed and supply temperature 24 hours ahead",
      "Analyzing thermal stability of industrial reactors: model exothermic reaction heat generation, coolant removal capacity, design control system with safety interlocks to prevent thermal runaway catastrophes"
    ],
    "learningOutcomes": [
      "Understand fundamental thermodynamic concepts: systems vs. surroundings, intensive vs. extensive properties, state functions, and equilibrium",
      "Apply the First Law of Thermodynamics: energy conservation principle, understand internal energy, enthalpy, and work for closed and open systems",
      "Perform energy balance calculations: on thermal systems with multiple inputs/outputs, properly accounting for heat transfer, work, and accumulation terms",
      "Understand the Second Law of Thermodynamics: entropy concept, irreversibility, and why heat cannot spontaneously flow from cold to hot without external work",
      "Analyze heat transfer mechanisms: conduction (Fourier's Law), convection (Newton's Cooling Law), radiation, and combined modes in thermal systems",
      "Design and analyze thermal resistance networks: series/parallel combinations for multi-layer insulation, fin efficiency, overall heat transfer coefficients",
      "Model thermodynamic cycles: refrigeration cycles, Rankine cycle for power generation, absorption cooling—understanding their efficiency limits",
      "Apply psychrometry: understand moist air properties (dry/wet bulb temperature, humidity ratio, enthalpy), critical for HVAC system design",
      "Develop linear thermodynamic models for control system design: create transfer functions from first-principles energy balances, suitable for feedback control",
      "Use thermodynamic tools: psychrometric charts, steam tables, refrigerant property data—essential for practical engineering design",
      "Integrate thermodynamic models with control theory: convert energy balance equations to state-space form, design controllers for setpoint tracking and disturbance rejection"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=ZXjsu9hitHI - First and Second Laws of Thermodynamics Explainer Video (7:19) - Accessible overview with energy conservation focus",
        "https://www.youtube.com/watch?v=1kzsLGq3-14 - First and Second Law of Thermodynamics (18:54) - Detailed molecular perspective with clear examples",
        "https://www.youtube.com/watch?v=8N1BxHgsoOw - The Laws of Thermodynamics, Entropy, and Gibbs Free Energy (13:44) - Conceptual understanding with practical applications",
        "https://www.youtube.com/watch?v=OL3a_x31usM - The Balance of Energy: Lesson 1, Part 3 (16:40) - First law energy balance in structural mechanics context",
        "https://www.youtube.com/watch?v=0ZUjf_WVtYg - Thermodynamics: Applying 1st and 2nd Law to an Open System (15:22) - Open system energy and entropy balances",
        "https://www.youtube.com/watch?v=jnz_4veiFSQ - How Cooling Towers Use Phase Change for Heat Transfer (22:18) - Evaporative cooling and latent heat principles",
        "https://www.youtube.com/watch?v=nkXmbjFyEm0 - Concept of Heat Transfer in Cooling Tower and Its Components (26:44) - Cooling tower thermodynamics and Merkel's heat transfer theory",
        "https://www.youtube.com/watch?v=sWJCWDpY9is - How Cooling Towers Work (Working Principle) (11:27) - Visual explanation of cooling tower operation",
        "https://www.youtube.com/watch?v=JK14QNK2AS8 - Problem 1 on Cooling Tower: Heat Transfer Process (9:03) - Worked example with psychrometric chart application",
        "https://www.youtube.com/watch?v=I6dV40iSbPY - Optimizing HVAC: Principles and Selection of Cooling Towers (15:44) - HVAC-focused thermodynamic design principles",
        "https://www.youtube.com/watch?v=G7yznepmn7M - Dynamic Systems and Controls (part of Grad Expo) (22:00) - Thermal energy systems in control context",
        "https://www.youtube.com/watch?v=qDG0nENYpDg - Control Systems Lecture 2: Dynamic Models (1:07:15) - Modeling mass-spring-damper and thermal analogs"
      ],
      "websites": [
        "https://schoolofpe.com/blogs/news/principles-of-thermodynamics-for-engineering-applications-html - School of PE: Principles of Thermodynamics for Engineering Applications",
        "https://www.physics.ox.ac.uk/system/files/file_attachments/basic_thermo.pdf - Oxford University: Basics of Thermodynamics (PDF - comprehensive)",
        "https://www.sfu.ca/~mbahrami/ENSC%20388/Notes/First%20Law%20of%20Thermodynamics_Closed%20Systems.pdf - Simon Fraser University: First Law of Thermodynamics Closed Systems (PDF)",
        "https://www.britannica.com/science/thermodynamics - Britannica: Thermodynamics (Laws, Definition, & Equations)",
        "https://www.power-eng.com/coal/cooling-tower-heat-transfer-101/ - Power Engineering: Cooling Tower Heat Transfer 101",
        "https://www.chadsprep.com/chads-general-chemistry-videos/3-laws-of-thermodynamics-definition/ - Chad's Prep: The Laws of Thermodynamics",
        "https://inmais.github.io/edX/space-heating-and-cooling.html - edX: Chapter 3 Space Heating and Cooling",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC7011052/ - NIH: Application and Analysis of Model Based Controller for Cooling Systems",
        "https://www.sciencedirect.com/science/article/abs/pii/S0360132313003363 - ScienceDirect: Theory and Applications of HVAC Control Systems (Review)",
        "https://www.sciencedirect.com/science/article/pii/S1364032123003532 - ScienceDirect: Energy Modelling and Control of Building Heating and Cooling"
      ],
      "tools": [
        "MATLAB & Simulink - Model thermal systems with differential equations, design feedback controllers for temperature regulation, perform transient analysis",
        "Psychrometric Chart Tools - Online calculators and ASHRAE psychrometric charts for moist air property determination in HVAC system design",
        "NIST REFPROP - Refrigerant and fluid property database for accurate thermodynamic calculations in cooling system modeling",
        "Python with NumPy/SciPy - Develop thermodynamic models, solve energy balance equations, analyze system response to control inputs",
        "COMSOL Multiphysics - Finite-element analysis for detailed heat transfer in complex geometries (heat exchangers, battery cells, power electronics)",
        "EES (Engineering Equation Solver) - Specialized tool for solving complex thermodynamic system equations with built-in property databases",
        "Thermal Simulation Software (ANSYS Fluent, OpenFOAM) - Computational fluid dynamics for detailed heat transfer analysis in cooling towers and ducts",
        "Energy Balance Calculators - Spreadsheet tools for steady-state energy balance calculations in HVAC, refrigeration, and industrial thermal systems",
        "Smart Meter Data Analysis Tools - Real-world building thermal data for model validation and controller tuning",
        "Industrial Control System Simulators - Combined thermodynamic + control simulation for HVAC, cooling tower, or battery management system optimization"
      ]
    }
  }
}
,
  {
  "id": "engr-135-heat-transfer",
  "code": "ENGR 135",
  "name": "Heat Transfer",
  "fullName": "ENGR 135: Heat Transfer",
  "description": "Comprehensive study of conduction, convection, and radiation heat transfer mechanisms applied to industrial automation systems. Covers thermal modeling of motors, power electronics cooling, temperature control feedback loops, and computational thermal analysis.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers must master heat transfer to design reliable, efficient industrial systems where thermal management directly impacts performance, lifespan, and safety. This tier-2 course builds on fundamental engineering principles to enable engineers to: model motor thermal dynamics for continuous torque rating calculations, design cooling systems for power electronics (motor drives, PLCs, servo controllers), optimize temperature control feedback loops using PID algorithms, predict component thermal failures and plan preventive maintenance, and integrate thermal constraints into control system design. Modern automation increasingly demands: electric motors operating at 150-200°C winding temperatures for high power density, real-time thermal deration of motor torque in variable frequency drives (VFDs) to prevent winding damage, coordinated cooling of multi-axis systems (robotic arms, CNC machines) to prevent thermal crosstalk between adjacent motors, and predictive thermal diagnostics using embedded temperature sensors for Industry 4.0 platforms. Industry leaders (Siemens, ABB, Honeywell, FLIR) employ advanced thermal management across industrial equipment to: extend equipment lifespan 30-50% through optimal temperature control, improve energy efficiency 5-15% by eliminating over-cooling, and enable predictive maintenance by detecting thermal anomalies 60+ days before failure. Without mastery of heat transfer, engineers cannot: accurately select motor cooling methods (air-cooled vs. liquid-cooled), design robust temperature control systems, predict thermal runaway conditions in power electronics, or troubleshoot thermal failures in production. This course enables hands-on design using ANSYS Motor-CAD for motor thermal networks, CFD simulation for complex cooling designs, PID tuning for temperature regulation, and real-world thermal system analysis.",
    "realWorldApplications": [
      "Optimizing a servo motor's continuous torque output for a 6-axis industrial robot by modeling thermal transient response using lumped-parameter networks, predicting winding hotspot temperature rise from resistive heating, and calculating duty-cycle-dependent torque ratings (continuous, intermittent, peak) to prevent motor damage during extended pick-and-place operations",
      "Designing a water-cooled liquid cooling system for a 500-kW motor drive powering a centrifugal compressor by applying Fourier's Law to predict thermal resistance path (motor winding → cooling jacket → circulating coolant), optimizing coolant flow rate and inlet temperature to maintain 140°C maximum winding temperature while minimizing pump energy consumption",
      "Implementing real-time thermal deration in a VFD by modeling motor heating dynamics, calculating instantaneous winding temperature from stator current and ambient conditions, and reducing output power by 3-5% when approaching thermal limits to prevent catastrophic failure during sustained high-torque loads",
      "Troubleshooting a failing stepper motor in a 3D printer by measuring winding resistance degradation, calculating copper losses from I²R heating, comparing predicted vs. measured temperature rise, and identifying root cause as inadequate convective cooling due to dust accumulation on motor housing",
      "Designing a multi-zone HVAC temperature control system for a manufacturing facility using closed-loop PID temperature controllers, tuning proportional/integral/derivative gains to minimize overshoot (<3°C) and settling time (<2 minutes) while reducing energy consumption 18-22% compared to open-loop setpoint scheduling",
      "Optimizing power electronics cooling for a 500-A soft starter in a pump control application by calculating junction temperature rise in IGBT switches from I²R power dissipation, designing heatsink geometry using convective heat transfer coefficients, and selecting cooling fan speed to maintain ≤85°C max junction temperature at 40°C ambient",
      "Implementing predictive maintenance for an industrial motor fleet by deploying embedded temperature sensors in bearing housings, training anomaly detection algorithms to identify 5-8°C temperature increases above baseline as early bearing degradation, and scheduling replacement 4-6 weeks before predicted failure to reduce unplanned downtime"
    ],
    "learningOutcomes": [
      "Apply Fourier's Law of heat conduction to calculate thermal resistance networks in motors, power electronics, and cooling systems, predicting steady-state and transient temperature distributions",
      "Analyze convective heat transfer using Newton's Law of Cooling and correlations for natural/forced convection to determine heat transfer coefficients (h values) for air and liquid cooling systems",
      "Calculate radiation heat transfer using Stefan-Boltzmann Law to account for thermal energy exchange between hot components and ambient environment, especially at high operating temperatures (>150°C)",
      "Model electric motor thermal behavior using lumped-parameter thermal network analogies, predicting winding hotspot temperature and continuous torque output as function of duty cycle and ambient conditions",
      "Design and optimize cooling systems (air-cooled, liquid-cooled, direct oil cooling) for motors, drives, and power electronics by balancing thermal performance with cost, size, and energy consumption",
      "Develop closed-loop PID temperature control systems for HVAC, process heating/cooling, and motor thermal management, tuning proportional/integral/derivative gains to achieve target accuracy and response time",
      "Perform computational thermal analysis using ANSYS Motor-CAD, ANSYS Fluent, or ANSYS Icepak to predict 3D temperature distributions, thermal stress, and cooling effectiveness in complex geometries",
      "Apply thermal management principles to motor selection, drive design, and system architecture optimization to extend equipment lifespan, improve energy efficiency, and enable predictive maintenance"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=XRSiz7f5XWw (Heat Transfer: Conduction, Convection, & Radiation by Tonya Coffey; comprehensive 25-minute lecture covering all three heat transfer mechanisms with fundamental equations, power calculations, and example problems for industrial applications)",
        "https://www.youtube.com/watch?v=HpCvWuvCUoA (Conduction-Convection-Radiation: Heat Transfer with demonstrations; visual demonstrations of heat transfer mechanisms with practical examples showing thermal behavior and energy transmission in real systems)",
        "https://www.youtube.com/watch?v=bRZwzy0xvhM (Heat Transfer - Conduction, Convection, and Radiation by The Organic Chemistry Tutor; foundational physics concepts explaining temperature gradients, thermal conductivity, boundary layers, convection coefficients, and radiative exchange)",
        "https://www.youtube.com/watch?v=BEPnp8zayI4 (How to Simulate Electric Motor Temperature Using ANSYS Motor-CAD and Icepak; advanced tutorial demonstrating electro-thermal coupling in motor design, LPTN thermal network setup, and CFD-based cooling system optimization)",
        "https://www.youtube.com/watch?v=D3vR6yxvRhM (Design Motor Cooling Systems with Motor-CAD and Simscape by MathWorks; workflow for motor thermal design, cooling strategy optimization, and integration of detailed thermal models into Simulink for system-level simulation)",
        "https://www.youtube.com/watch?v=YK7G6l_K6sA (Heat Transfer: Crash Course Engineering #14; intuitive engineering overview of heat transfer fundamentals, thermal resistance, boundary layers, and practical applications in mechanical systems)"
      ],
      "websites": [
        "https://open.clemson.edu/context/all_dissertations/article/2632/viewcontent/ptuyyk99sf3t0uu1sj0w729rukh6ha42.pdf (Design, Modeling and Control of Thermal Management System - PhD dissertation showing model-based PID controllers for motor/battery/engine cooling achieving 70-81% energy savings vs. classical control)",
        "https://myengineeringworld.net/2014/01/control-loops-hvac-apps.html (Control Loops Used In HVAC Applications - comparison of open-loop vs. closed-loop temperature control, PID tuning methodology, control reset strategies for energy optimization)",
        "https://www.gtisoft.com/thermal-management-solutions/ (Gamma Technologies GT-SUITE Thermal Management - industrial thermal simulation for transient response prediction, multi-phase coolant circuits, and controls integration for vehicle/powertrain systems)",
        "https://www.schaeffler.us/us/products-and-solutions/powertrain-chassis/products-at-a-glance/niu-thermal-management-systems/ (Schaeffler Integrated Thermal Management Systems - 30% space reduction, coordinated coolant/refrigerant circuit control, smart thermostat actuation for industrial power systems)",
        "https://sites.utexas.edu/hcrl/files/2016/01/actuators-2015-2.pdf (Thermal Modeling of Electric Motors - empirical analysis comparing air-cooled vs. liquid-cooled COTS motors, continuous torque improvement factors, thermal network modeling)",
        "https://www.ansys.com/applications/thermal-analysis-simulation-software (ANSYS Thermal Analysis Software - multiphysics simulation for motor thermal modeling, power electronics cooling, and coupled electromagnetic-thermal analysis)",
        "https://www.ansys.com/products/electronics/ansys-motor-cad (ANSYS Motor-CAD - dedicated motor design software with LPTN thermal networks, multiphysics analysis, end-effects modeling, and complete cooling system design)",
        "https://cdautomation.co.uk/the-benefits-of-using-a-pid-temperature-controller/ (PID Temperature Controller Benefits and Implementation - practical guide to proportional/integral/derivative tuning, steady-state accuracy, disturbance rejection, and industrial process control)",
        "https://www.dataforth.com/introduction-to-pid-control (Introduction to PID Control - feedback control fundamentals, error signal processing, controller output calculation, and application examples for temperature/pressure/level regulation)"
      ],
      "tools": [
        "ANSYS Motor-CAD (dedicated motor thermal design with LPTN networks, transient thermal analysis, cooling system optimization, and electromagnetic-thermal coupling)",
        "ANSYS Fluent (computational fluid dynamics for complex cooling system design, thermal flow analysis, heat exchanger optimization, and transient thermal transient response prediction)",
        "ANSYS Icepak (electronics thermal analysis for power electronics cooling, heat sink design, thermal interface material optimization, and multi-domain thermal assessment)",
        "MATLAB/Simulink Simscape (thermal system modeling with predefined component libraries for motors, cooling systems, and real-time thermal control algorithm development)",
        "MATLAB/Simulink Control System Toolbox (PID controller tuning and closed-loop temperature control system design with automatic gain scheduling)",
        "Motor-CAD (ST Microelectronics tool for motor thermal validation and cooling system design)",
        "COMSOL Multiphysics (general-purpose multiphysics platform for coupled electromagnetic-thermal analysis and custom thermal phenomena modeling)",
        "Python thermal modeling libraries (scipy.integrate for transient thermal ODEs, numpy for thermal resistance network calculations)",
        "Thermal imaging cameras and data acquisition systems for real-world thermal validation and temperature monitoring in production systems",
        "PID controller tuning software (Loop Tune, Omron, Honeywell tools) for experimental parameter identification and real-time controller commissioning"
      ]
    }
  }
}
,
  {
  "id": "engr-151-strength-of-materials",
  "code": "ENGR 151",
  "name": "Strength of Materials",
  "fullName": "ENGR 151: Strength of Materials",
  "description": "Comprehensive study of how solid materials respond to loads and stresses. Covers stress and strain fundamentals, Hooke's Law, bending, torsion, combined loading, failure theories, and design methodology. Essential for Control Systems & Automation engineers designing mechanical structures, robot frames, and analyzing component reliability under operational loads.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "ENGR 151 is a Tier 2 course because it provides essential structural and mechanical design knowledge for control engineers working with physical systems. For Control Systems & Automation engineers, strength of materials directly impacts real-world system reliability and performance. Why? Every physical control system—from robotic arms to industrial machinery to autonomous vehicles—is built from structures subject to loads and stresses. A poorly designed robot arm frame fails under load, causing safety hazards. A servo motor shaft designed without torsional stress analysis breaks at the first duty cycle. A sensor mounting bracket with inadequate stiffness deforms under load, introducing measurement errors that destabilize the control loop. This course teaches you to predict failure before it happens—essential for safety-critical systems. Understanding stress concentrations, fatigue under cyclic loading, and material properties enables you to design components that survive millions of operational cycles. Combined loading analysis (bending + torsion, for instance on a motor shaft) determines whether your mechanical design is safe or headed for catastrophic failure. Factor of safety and failure theories (von Mises, Tresca) let you make informed trade-offs between safety, weight, and cost. This is Tier 2 (not Tier 1) because not all control engineers design mechanical structures—software-focused or algorithmic control engineers may not need deep strength-of-materials knowledge. However, any control engineer working on robots, machinery, vehicles, or systems with moving parts absolutely must understand how structures fail under stress. In industrial automation, structural failure is often the limiting factor in system performance and reliability.",
    "realWorldApplications": [
      "Designing a robotic arm frame to support a 50kg payload with a 1.5m reach, calculating maximum bending stress at the shoulder joint, selecting material and cross-section dimensions to keep stress below yield with a 2.0 safety factor",
      "Analyzing a motor shaft subjected to combined bending (from gear tooth engagement) and torsion (from torque transmission), using Mohr's circle to find principal stresses and selecting material to avoid fatigue failure over 10 million shaft rotations",
      "Designing a pressure vessel for a pneumatic gripper system, calculating hoop stress from internal pressure, determining wall thickness to prevent burst failure with appropriate safety factor",
      "Analyzing deflection of a cantilever beam arm in a picking robot to ensure <5mm deflection at the end-effector, maintaining positioning accuracy for consistent gripping performance",
      "Selecting bolt sizes for a machine frame assembly subjected to vibration and dynamic loads, calculating required preload and shear stress to prevent bolt loosening and fatigue failure",
      "Designing a motor mounting bracket to minimize vibration transmission to sensitive sensors, ensuring structural stiffness (high modulus) while keeping weight minimal for energy efficiency",
      "Analyzing stress concentration at mounting holes in a sensor bracket, using stress concentration factors to prevent fatigue crack initiation at the highest-stress locations",
      "Performing finite element analysis (FEA) on a complex gear transmission housing to identify weak points, optimize material thickness, and validate design meets durability requirements"
    ],
    "learningOutcomes": [
      "Understand stress and strain fundamentals: stress as internal force per unit area, strain as relative deformation, and their relationships to applied loads and material properties",
      "Apply Hooke's Law and Young's Modulus: predict elastic deformation of structures and understand the linear elastic region before permanent damage occurs",
      "Analyze simple loading cases: axial tension/compression, shear, bending, and torsion—calculating stresses and deflections for standard structural members (bars, beams, shafts)",
      "Calculate bending stresses: apply Euler-Bernoulli beam theory, develop shear force and bending moment diagrams, and identify maximum stress locations in loaded beams",
      "Analyze torsional loading: calculate shear stresses in circular shafts, understand power transmission and torque limits, and predict angle of twist",
      "Handle combined loading: superposition of stresses from multiple load types (bending + torsion on shafts, axial + bending on columns), use Mohr's circle for stress transformation",
      "Apply failure theories: von Mises (yielding in ductile materials), Tresca, and Coulomb-Mohr criteria—predict whether a component will yield or fail under complex stress states",
      "Design with safety factors: calculate required dimensions and material properties to keep actual stresses below failure limits with appropriate margins for uncertainty",
      "Understand fatigue and cyclic loading: recognize that materials fail at lower stresses under cyclic loading than under static loading, essential for machinery operating for years",
      "Use computational tools: perform finite element analysis (FEA) in ANSYS, Siemens NX, or SOLIDWORKS to validate designs on complex geometries before manufacturing",
      "Apply design optimization: select materials and cross-sections balancing strength, weight, cost, and manufacturability for robust, efficient mechanical systems"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=W5cviLowZ1U - Strength of Materials (Part 1: Stress and Strain) (27:33) - Foundational concepts clearly explained",
        "https://www.youtube.com/watch?v=n4OaPG86fXY - Stress and Strain | Hooke's Law | Strength of Materials (11:59) - Comprehensive stress-strain diagram walkthrough",
        "https://www.youtube.com/watch?v=eqllM-PqcGM - Hooke's Law: Stress and Strain (Strength of Materials) (15:44) - Detailed explanation with stress-strain relationship",
        "https://www.youtube.com/watch?v=HALbtyDUjp0 - Intro to Young's Modulus, Stress & Strain (18:51) - Physics foundations with calculation examples",
        "https://www.youtube.com/watch?v=G7pDrGU0Q_Q - Hooke's Law (6:22) - Quick introduction to Hooke's law with practical context",
        "https://www.youtube.com/watch?v=BPjgPqDjBA0 - Combined Loading with a Gear Shaft in Bending and Torsion (43:54) - Real-world example with Mohr's circle application",
        "https://www.youtube.com/watch?v=syn7haMSpBM - Combined Loading in Torsion | Torque and Bending Moment (34:15) - Von Mises stress theory applied to combined loading",
        "https://www.youtube.com/watch?v=OkzNYNUGAbw - Lecture 3: Combined Stresses (Bending, Axial, Torsion) (22:41) - Stress differential element analysis",
        "https://www.youtube.com/watch?v=qQ1MGrc6fUE - Solids: Combined Loading (Torsional & Transverse Shear) (28:45) - Advanced combined loading scenarios",
        "https://www.youtube.com/watch?v=N-PlI900hSg - Everything About COMBINED LOADING in 10 Minutes (10:26) - Quick comprehensive review of combined loading",
        "https://www.youtube.com/watch?v=GHjopp47vvQ - Understanding the Finite Element Method (46:22) - FEA fundamentals and stiffness matrix derivation",
        "https://www.youtube.com/watch?v=CAkkVIsNxDE - Finite Element Analysis Explained (9:49) - What engineers need to know about FEA",
        "https://www.youtube.com/watch?v=2iUnfPRk6Ro - Intro to the Finite Element Method Lecture 1 (44:45) - Linear algebra and FEA foundations",
        "https://www.youtube.com/watch?v=Sbcjr3G1kho - Teach Solid Mechanics with Finite Element Analysis (20:12) - Educational perspective on FEA-based learning"
      ],
      "websites": [
        "https://pe.gatech.edu/courses/mechanics-materials-i-fundamentals-stress-and-strain-and-axial-loading - Georgia Tech: Mechanics of Materials I Professional Course",
        "https://catalog.illinois.edu/courses-of-instruction/me/ - University of Illinois: Mechanical Engineering Course Catalog with SOM courses",
        "https://mechanicaldesigneer.com/2024/02/27/case-study-design-improvement-based-on-stress-analysis-results-in-nx/ - Case Study: Stress Analysis and Design Improvement using NX",
        "https://www.bu.edu/moss/mechanics-of-materials-strain/ - Boston University: Mechanics of Materials Strain Tutorial",
        "https://mechanicalc.com/reference/strength-of-materials - MechaniCalc: Strength of Materials Reference (equations and formulas)",
        "https://www.johnstonpe.com/structural-analysis - Johnston Engineering: Structural Analysis and Stress Analysis Services",
        "https://www.alooba.com/skills/concepts/solid-mechanics-213/stress-analysis/ - Alooba: Everything About Stress Analysis Skills",
        "https://www.neuralconcept.com/post/what-is-structural-analysis-in-engineering-comprehensive-guide - Neural Concept: Structural Analysis in Engineering Comprehensive Guide",
        "https://catalog.ucsd.edu/courses/MAE.html - UC San Diego: Mechanical and Aerospace Engineering Catalog (MAE courses)",
        "https://www.coursera.org/learn/mechanics-1 - Coursera: Mechanics of Materials I (free online course)"
      ],
      "tools": [
        "ANSYS Mechanical - Industry-standard FEA software for stress analysis, modal analysis, fatigue analysis, and design optimization",
        "Siemens NX - Integrated CAD/CAM/CAE platform with comprehensive structural analysis and optimization capabilities",
        "SOLIDWORKS Simulation - Accessible FEA tool integrated with CAD for quick design validation and stress analysis",
        "ABAQUS - Advanced FEA software for complex nonlinear problems, large deformations, and material nonlinearity",
        "Python with NumPy/SciPy - Open-source tools for beam analysis, stress calculations, and custom structural design optimization",
        "MATLAB with Partial Differential Equation Toolbox - Symbolic and numerical solving of structural mechanics equations",
        "MechaniCalc Online Tools - Free web-based calculators for beam deflection, stress analysis, and standard structural problems",
        "Mathcad or Mathkernel - Engineering notebooks for documenting strength-of-materials calculations with symbolic math",
        "Timber (hand calculation tools) - Statics and mechanics problem solvers for quick verification of manual calculations",
        "OpenFOAM / Salome - Open-source finite element and computational fluid dynamics platform for structural analysis"
      ]
    }
  }
}
,
  {
  "id": "engr-152-physics-energy",
  "code": "ENGR 152",
  "name": "The Physics of Energy",
  "fullName": "ENGR 152: The Physics of Energy",
  "description": "Comprehensive study of energy fundamentals, thermodynamics, energy conversion, efficiency optimization, and renewable energy integration. Emphasizes practical applications in industrial automation, smart grid systems, energy storage, and sustainable control system design.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers must master energy physics to design efficient, sustainable industrial systems and optimize operational costs across manufacturing facilities. This tier-2 course builds on fundamental physics and mathematics to enable engineers to: model energy transformations and losses in motors, drives, and actuators, optimize system efficiency using thermodynamic principles and control algorithms, design energy-efficient architectures for industrial operations, integrate renewable energy and energy storage into grid and facility management systems, and predict energy consumption for operational cost planning and carbon footprint reduction. Modern manufacturing demands unprecedented energy optimization: variable frequency drives (VFDs) reduce motor energy consumption 40-60% through speed-based load matching, regenerative braking captures 15-30% of energy during deceleration cycles, predictive energy management using AI/ML reduces facility energy by 8-15%, and renewable energy integration (solar/wind + battery storage) creates distributed, resilient manufacturing ecosystems. Industry leaders (Siemens, ABB, Honeywell, Rockwell Automation) employ advanced energy management across smart factories to: reduce operational costs by 20-30% through demand response and load optimization, achieve carbon neutrality through renewable integration, enable predictive maintenance by energy anomaly detection, and ensure grid resilience during peak demand. The International Energy Agency estimates industrial automation energy optimization represents a $300B global market opportunity. Without mastery of energy physics, engineers cannot: select appropriate motor control strategies for specific applications, size energy storage systems for autonomous vehicles or backup power, design efficient cooling/heating systems, predict real-world operational costs, or contribute to corporate sustainability goals. This course enables hands-on design using energy simulation tools, VFD optimization, renewable energy system modeling, and battery/supercapacitor energy storage analysis.",
    "realWorldApplications": [
      "Optimizing a manufacturing facility's energy consumption by retrofitting 200 AC induction motors with VFDs, applying affinity laws to predict 40-60% energy savings (P ∝ ω³), calculating payback period as 14-18 months from reduced electricity costs, and implementing centralized supervisory control to coordinate motors across 50+ production lines for peak shaving and demand response",
      "Designing an autonomous mobile robot (AMR) power system by calculating energy requirements from motor torque/speed profiles, selecting hybrid battery-supercapacitor storage (Li-ion for endurance, ultracapacitors for peak power delivery), achieving 12-hour mission endurance with hourly opportunity charging vs. 4-hour full recharge for battery-only systems",
      "Implementing a predictive energy management system for a smart factory using real-time monitoring of 500+ connected devices, training machine learning models to forecast facility energy demand 24 hours ahead with ±8% accuracy, optimizing equipment scheduling to minimize peak demand charges and enable 15-22% energy cost reduction",
      "Designing a hybrid solar+wind renewable energy system for a distributed manufacturing site by modeling complementary generation profiles (solar during day, wind during night/storms), sizing lithium-ion battery storage to maintain 99.5% uptime during renewable generation gaps, achieving 85% renewable energy penetration while maintaining grid stability",
      "Optimizing compressed air system efficiency in a pneumatic automation facility by calculating energy losses (30-40% of compressed air energy wasted in leaks/regulation), identifying pressure drop pathways using Bernoulli's equation, redesigning piping to reduce pressure differential by 8 psi, saving $180k annually in compressor electricity",
      "Implementing energy recovery on a plastic injection molding machine by capturing thermal energy from cooling circuits using thermodynamic heat recovery, recovering cooling fan brake energy through regenerative variable speed drives, reducing facility energy consumption by 8-12% while maintaining precise temperature control",
      "Designing an energy storage system for a manufacturing facility experiencing ±15% daily energy demand variability by sizing lithium-ion battery array to peak-shave (reduce demand charges by 35-40%), implementing model predictive control (MPC) to optimize charge/discharge timing based on time-of-use electricity rates, achieving 3.2-year payback with demand charge reduction alone"
    ],
    "learningOutcomes": [
      "Apply thermodynamic first law (energy conservation: ΔU = Q - W) to analyze energy transformations in motors, compressors, pumps, and industrial processes, predicting efficiency and identifying loss mechanisms",
      "Understand thermodynamic second law (entropy) and its implications for maximum efficiency, Carnot cycle limits, and irreversible processes in real industrial systems to set realistic performance targets",
      "Analyze motor-driven system energy consumption using affinity laws (P ∝ ω³ for centrifugal loads) to quantify energy savings from speed reduction via VFDs, regenerative braking energy recovery, and load-based power optimization",
      "Design and optimize energy-efficient control systems by applying PID algorithms to match power consumption to actual load requirements, reducing wasteful over-capacity operation in motors, pumps, compressors, and HVAC systems",
      "Model and simulate renewable energy systems (solar PV with Maximum Power Point Tracking, wind turbines with pitch control) integrated with energy storage (batteries, supercapacitors, thermal storage) for grid stability and demand matching",
      "Apply control theory to smart grid integration, designing supervisory control systems that coordinate distributed generation (solar/wind), energy storage, and controllable loads to balance supply-demand in real-time while minimizing energy cost",
      "Select appropriate energy storage technologies (lithium-ion for long-duration storage, supercapacitors for peak power, hybrid systems for balanced performance) based on energy density, power density, cycle life, and cost trade-offs",
      "Calculate facility-wide energy consumption, predict operational costs, and identify efficiency optimization opportunities using energy audits, monitoring systems, and machine learning-based predictive analytics",
      "Design energy recovery systems (regenerative braking, waste heat recovery, demand response) to minimize net energy consumption and operational costs across industrial automation systems"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=j37S395bvGM (First Law of Thermodynamics: Energy Conservation Explained Simply - 5-minute comprehensive overview of ΔU = Q - W with real-world energy transformation examples in engines, refrigerators, power plants, and industrial systems)",
        "https://www.youtube.com/watch?v=PKk3N32XKmU (Energy Conservation Equation & FIRST LAW of Thermodynamics in Engineering - 15-minute deep dive covering macroscopic/microscopic energy types, work equations, sign conventions, rate calculations, and thermodynamic systems)",
        "https://www.youtube.com/watch?v=6d2hNE43_Xk (Understanding the Principles of Thermodynamics - comprehensive overview covering all four laws of thermodynamics, heat/energy/matter relationships, entropy, and practical implications for engineering systems)",
        "https://www.youtube.com/watch?v=WzSF3Tk7cPE (Thermodynamics - Chapter 4 Conservation of Energy Introduction - foundational coverage of energy conservation principles with worked examples and applications)",
        "https://www.youtube.com/watch?v=8K0DwSEg-uM (Smart Grid Technology, Renewable Energy Integration and IoT - practical overview of intelligent energy systems, decentralized generation, energy management, and smart grid infrastructure)",
        "https://www.youtube.com/watch?v=BBQ2o0LcmnQ (Lecture - Thermodynamics: The Fundamentals Of Energy - academic lecture on energy conversion with conventional and renewable energy sources)"
      ],
      "websites": [
        "https://ijsra.net/sites/default/files/IJSRA-2024-2512.pdf (Smart Electronics in Solar-Powered Grid Systems - peer-reviewed research on smart inverters, IoT sensors, MPPT, and advanced EMS achieving 15% energy loss reduction and improved grid stability)",
        "https://www.newark.com/how-to-save-energy-and-costs-with-a-variable-frequency-drive-trc-ar (How to Save Energy & Costs with VFDs - practical guide showing affinity law applications: 25% speed reduction = 60% energy savings; 50% reduction = 90% savings; payback analysis showing 14-18 month ROI)",
        "https://stg.patent-art.com/knowledge-center/battery-supercapacitor-hybrid-energy-storage-systems/ (Battery-Supercapacitor Hybrid Energy Storage Systems - technical comparison of lithium-ion (high energy density), supercapacitors (high power density), and hybrid approaches for EVs and industrial applications)",
        "https://www.plantengineering.com/how-motor-controls-impact-everything-from-energy-efficiency-to-costs (How Motor Controls Impact Energy Efficiency to Costs - practical analysis of VFD vs. traditional starters, servo drive regenerative braking (captures 15-30% energy), and precision improvements)",
        "https://www.futureelectronics.com/blog/article/smart-grid-and-smart-meter-business-trends-and-opportunities/ (Smart Grid and Smart Meter Business Trends - renewable energy integration, demand response, advanced analytics, and decarbonization strategies for modern power systems)",
        "https://cordis.europa.eu/article/id/455675-advanced-energy-harvesting-solutions-could-tackle-iot-battery-issues (Advanced Energy Harvesting Solutions for IoT - NANO-EH project demonstrating multi-source energy harvesting (solar, thermal, RF) with supercapacitor storage for battery-free IoT systems)",
        "https://www.silabs.com/blog/how-much-energy-can-you-harvest-with-a-battery-less-iot-system (How Much Energy Can You Harvest with Battery-Less IoT System - practical benchmarking of light-based energy harvesting achieving sustained ultra-low-power operation (<300 nA sleep current)",
        "https://www.nichicon.com/en-us/news-and-resources/white-papers/energy-storage-for-iot/ (Energy Storage for IoT - comprehensive comparison of battery types (Li-ion, Li-SOCl₂, LTO), supercapacitors, and hybrid solutions with cycle life and depth-of-discharge analysis)",
        "https://wiot-group.com/tomorrow/en/topics/energy-harvesting-for-iot-at-wiottomorrow25/ (Energy Harvesting for IoT: Powering Wireless Innovation - emerging energy harvesting technologies, hybrid storage solutions, and autonomous IoT system design)",
        "https://www.monolithicpower.com/en/learning/mpscholar/analog-vs-digital-control/advanced-topics-in-power-conversion-control/inte... (Integration with Renewable Energy Sources - control challenges in solar/wind systems, grid synchronization, MPPT algorithms, virtual synchronous machines for grid stability)",
        "https://online-engineering.case.edu/blog/role-of-control-systems-in-smart-grid-technology (The Role of Control Systems in Smart Grid Technology - supervisory control for renewable integration, real-time monitoring, predictive analysis, and automated response systems)"
      ],
      "tools": [
        "MATLAB/Simulink (SimPowerSystems and Simscape for energy system modeling, motor/drive simulations, renewable generation modeling, battery/supercapacitor state-of-charge prediction, and grid integration analysis)",
        "ANSYS (thermal-electromagnetic coupling for motor efficiency analysis, power loss distribution, and energy consumption prediction)",
        "HOMER Pro (microgrid and renewable energy system design with optimization, sizing solar/wind/battery systems for specific load profiles)",
        "PSCAD/EMTDC (electromagnetic transient simulation for smart grid control and power electronics)",
        "Power systems simulation software (PSS/E, MATPOWER, PSSE) for grid-scale renewable energy integration and smart grid control",
        "Energy monitoring platforms (Siemens S7, ABB PowerValue, Rockwell FactoryTalk EnergyChain) for real-time energy tracking and optimization",
        "Python libraries (PyPower, pandapower for power system simulation; matplotlib for energy visualization)",
        "CAD/thermal simulation tools (ANSYS CFX for waste heat recovery system design, MotorCAD for motor thermal/efficiency analysis)",
        "Battery modeling software (COMSOL, LionModel, Advisor) for energy storage state-of-health and state-of-charge prediction",
        "Time-of-use electricity rate optimization tools (PJM, CAISO data; custom Python scripts for demand response optimization)"
      ]
    }
  }
}
,
];

export const tier3Courses: TierCourse[] = [
  {
  "id": "ee-160-electric-power-systems",
  "code": "EE 160",
  "name": "Electric Power Systems",
  "fullName": "EE 160: Electric Power Systems",
  "description": "Comprehensive study of large-scale electrical power systems including generation, transmission, distribution, protection, and control. Covers power flow analysis, fault analysis, system stability, automatic generation control, and grid operation. Essential for Control Systems & Automation engineers specializing in power systems, grid integration, and renewable energy.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 160 is a Tier 3 course because it provides specialized knowledge for control engineers working specifically in power systems domains. This is not a foundational course for all control engineers—it's essential only for those pursuing careers in utility operations, smart grid technology, renewable energy integration, or power system automation. Why? The electrical grid is arguably the world's most complex feedback control system: millions of generators and loads must maintain a global frequency (50 or 60 Hz) within 0.1 Hz, while operating within voltage and thermal limits. This requires sophisticated automatic generation control (AGC) that coordinates thousands of generators across multiple control areas. For control engineers working on grid integration of solar/wind farms, understanding load flow analysis and voltage stability is essential—improper control can cause cascading blackouts affecting millions of people. Smart grid applications (demand response, microgrid control, distribution automation) require deep understanding of power system dynamics and protection coordination. This course teaches you to model the grid as a control system with transfer functions for generator dynamics, governor response, and load-frequency relationships. Modern power systems face new challenges: renewable energy introduces highly variable generation, requiring fast-acting power electronics controls coordinated with AGC. Understanding power system fault transients, transient stability, and steady-state stability is essential for designing robust grid-following and grid-forming inverters for solar/wind farms. This is Tier 3 because not all control engineers work with power systems. But for those pursuing careers in utilities, renewables, smart grids, or grid services, this becomes effectively Tier 1 or 2. The course bridges control theory (EE 122) to large-scale real-world systems where control algorithms must ensure global frequency stability and prevent blackouts.",
    "realWorldApplications": [
      "Modeling aggregate generator behavior in a control area for Automatic Generation Control (AGC), designing AGC controller parameters to restore frequency to 60 Hz within 30 seconds following a 500 MW generator outage",
      "Analyzing grid-forming inverter control for utility-scale solar farms, ensuring they provide voltage support during grid faults and coordinate with synchronous generators to maintain transient stability",
      "Performing load flow analysis to evaluate where new electric vehicle charging stations can be connected without overloading distribution transformers, identifying bottlenecks and required network upgrades",
      "Designing coordinated protection schemes for microgrids with high penetration of distributed solar/battery systems, ensuring protective relays operate correctly under both grid-connected and islanded operation modes",
      "Implementing demand response control algorithms that coordinate thousands of smart thermostats to reduce peak load during grid emergencies, reducing strain on aging transmission lines without causing customer discomfort",
      "Analyzing power system stabilizer (PSS) tuning for synchronous generators to damp electromechanical oscillations, preventing cascading failures during large disturbances",
      "Modeling frequency-dependent load characteristics in emergency control systems, predicting how underfrequency load shedding will prevent blackouts during generation loss events",
      "Designing restoration control logic for black-start capability after blackouts, sequencing generator startup and service restoration to rebuild the grid without causing voltage collapse"
    ],
    "learningOutcomes": [
      "Understand power system structure: generation (synchronous generators, renewable inverters), transmission (high-voltage lines), substations (transformers, protection), distribution, and loads—how they interconnect globally",
      "Perform load flow (power flow) analysis: set up network models using per-unit system, apply Newton-Raphson or Gauss-Seidel algorithms to solve non-linear equations, interpret voltage profiles and power flows",
      "Analyze system faults: use symmetrical component method for balanced and unbalanced faults (line-to-ground, line-to-line), calculate fault currents and bus voltages, determine protective relay requirements",
      "Model generator dynamics: understand synchronous generator swing equation, transient reactance, and how governors respond to frequency changes for primary frequency response",
      "Design Automatic Generation Control (AGC): model load-frequency relationship, design secondary control to maintain scheduled power exchanges between control areas, understand Area Control Error (ACE)",
      "Assess power system stability: distinguish between transient stability (first few seconds after fault), voltage stability (slow voltage collapse), and frequency stability (long-term balance)",
      "Analyze power flow limits: understand thermal line limits, voltage stability limits, transient stability limits, and how they constrain system operation during peak loads",
      "Design power system protection: coordinate protective relays, understand time-overcurrent, distance, and differential protection schemes that isolate faults without affecting healthy portions of grid",
      "Integrate renewable energy: design and control solar/wind inverters for grid integration, understand grid-forming vs. grid-following inverters, and their role in maintaining voltage/frequency",
      "Apply power system analysis tools: use industry software (ETAP, PowerFactory, PSS/E, PSSE) for load flow, fault, stability, and optimization studies",
      "Optimize power system operation: understand economic dispatch (lowest-cost generation mix), contingency analysis (N-1 secure operation), and coordinated control of traditional and renewable sources"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=Mp8Ok6R9GeE - Power Generation, Transmission, and Distribution! | LynxE Learning (4:42) - Grid infrastructure overview",
        "https://www.youtube.com/watch?v=1vIn6dPNDnk - Lecture 33: Load or Power Flow Analysis (46:31) - Fundamental power flow concepts and Newton-Raphson method",
        "https://www.youtube.com/watch?v=Gs7TW428xKE - Load Flow Analysis with DigSilent PowerFactory (1:01:39) - Professional software tutorial with practical examples",
        "https://www.youtube.com/watch?v=ca92cpRAbPE - Lecture 6: Load Flow Analysis (ETAP Full Course) (7:46) - ETAP software load flow demonstration",
        "https://www.youtube.com/watch?v=wt-xuaKvtAU - Load Flow Analysis Part 1: Per Unit System (5:44) - Foundation for power system calculations",
        "https://www.youtube.com/watch?v=Hfo5eu7Lbk8 - Automatic Generation Control (AGC) (2:58) - AGC fundamentals and frequency control",
        "https://www.youtube.com/watch?v=8UreN0bpHjA - Automatic Generation Control: AGC Modes of Operations (17:47) - Detailed AGC operation (TLBC, CFC, CNIC modes)",
        "https://www.youtube.com/watch?v=t38DUnUVWys - Automatic Generation Control Modes: TLBC, CFC, CNIC (13:51) - AGC control strategies",
        "https://www.youtube.com/watch?v=RwGQ2sCytq8 - Lec 16: Load Frequency Control; Automatic Generation Control (1:27:04) - Comprehensive AGC and LFC theory",
        "https://www.youtube.com/watch?v=VMOg1wFRLkc - Load, Inertia & AGC Explained (13:41) - Frequency control and system inertia role",
        "https://www.youtube.com/watch?v=erwq7XiWhOM - Power System Fault Analysis by Hand (18:33) - Symmetrical component method for fault analysis",
        "https://www.youtube.com/watch?v=Q37MJUA7FJU - How to Perform Three Phase Fault Analysis (PowerWorld) (22:15) - Software-based fault analysis",
        "https://www.youtube.com/watch?v=iB-63Jrhw5U - Fault Analysis in Power Systems Part 3a (18:19) - Three line-to-ground fault analysis",
        "https://www.youtube.com/watch?v=agbRrAzPCvw - Power System Stability Analysis: A Practical Guide (37:24) - Transient and steady-state stability concepts"
      ],
      "websites": [
        "https://electrical-engineering-portal.com/academy/product/course-power-generation-transmission-distribution-systems - EE Portal: Fundamentals of Power Generation, Transmission and Distribution",
        "https://interpro.wisc.edu/topic/electric-power/ - UW–Madison: Electric Power Systems Courses for Engineers",
        "https://www.coursera.org/learn/electric-power-systems - Coursera: Electric Power Systems (free online course)",
        "https://www.coursera.org/specializations/power-system-generation-transmission-and-protection - Coursera: Power System Specialization (4-course series)",
        "https://electrical-world.com/posts/load-flow-analysis-and-power-flow-calculation-guide - Electrical World: Load Flow Analysis Step-by-Step Guide",
        "https://en.wikipedia.org/wiki/Power-flow_study - Wikipedia: Power-Flow Study (foundational concepts)",
        "https://coventryacademy.com/the-role-of-power-electronics-in-renewable-energy-integration-into-the-grid - Coventry Academy: Power Electronics in Renewable Energy Integration",
        "https://ocw.tudelft.nl/course-lectures/1-2-1-power-electronics-for-integration-of-renewables/ - TU Delft: Power Electronics for Integration of Renewables",
        "https://www.nrel.gov/grid/news/program/2022/nrel-power-electronics-capabilities-primed-for-innovation - NREL: Power Electronics Capabilities for Grid Innovation",
        "https://www.pnnl.gov/grid-integration-renewable-energy - PNNL: Grid Integration of Renewable Energy Research",
        "https://erpc.gov.in/wp-content/uploads/2016/09/1.-Load-Flow-Analysis-User-Manual.pdf - ERPC: Load Flow Analysis User Manual (PDF)",
        "https://power-electronics.com/en/blog/2025/all-energy - Power Electronics: Grid Forming Solutions for Renewable Integration"
      ],
      "tools": [
        "DigSilent PowerFactory - Industry-leading comprehensive power system analysis software for load flow, fault, transient stability, protection coordination, and optimization studies",
        "ETAP (Energy Temporal Analysis Program) - User-friendly software for load flow, short-circuit, motor starting, transient stability, arc flash, and protection analysis",
        "PSS/E (Siemens Power Systems Simulator) - Industry standard for large-scale power system modeling, dynamics simulation, and real-time operations in utilities worldwide",
        "PowerWorld Simulator - Educational and professional-grade software for load flow, optimal power flow, and contingency analysis with real-time visualization",
        "MATLAB/Simulink - Open-source power system modeling with Simscape Power Systems toolbox for dynamic simulation and control system design",
        "PSCAD/EMTDC - Electromagnetic transient simulation for power electronics-heavy systems and high-frequency transient analysis",
        "Python with PyPower, Pandapower - Open-source tools for power flow calculations, optimization, and grid analysis",
        "National Instruments LabVIEW - Real-time control and hardware-in-the-loop simulation for power system control systems",
        "Renewable Integration Software (NREL's SAM, PVsyst) - Modeling and simulation of solar/wind integration and performance prediction",
        "Microcontroller/FPGA Development Tools - For implementing AGC, protection algorithms, and real-time grid control logic"
      ]
    }
  }
}
,
  {
  "id": "ee-180-autonomous-vehicles",
  "code": "EE 180",
  "name": "Autonomous Vehicles",
  "fullName": "EE 180: Autonomous Vehicles",
  "description": "Advanced course integrating perception, localization, control algorithms, and decision-making systems for autonomous vehicles. Covers autonomous mobile robots (AMRs), self-driving systems, UAV flight control, and multi-robot coordination for industrial automation and transportation applications.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers increasingly design and deploy autonomous systems across manufacturing (AMRs), transportation (autonomous vehicles), and aerial domains (UAVs). This tier-3 advanced course builds on foundational control theory (EE 102, EE 130), embedded systems (EE 140), and digital communication (EE 150) to enable engineers to: design end-to-end autonomous systems integrating perception, localization, path planning, and motion control, implement SLAM and odometry for robust indoor navigation without GPS, develop real-time obstacle avoidance and collision-free trajectory generation, architect multi-robot coordination systems with distributed decision-making, and deploy machine learning-based perception for autonomous decision-making. Modern autonomous systems demand unprecedented integration: warehouse AMRs navigate 50-300+ robots in dynamic environments achieving 99.5% uptime with <1% collision rates, self-driving cars must process 15+ terabytes/day from 10+ sensors with <100ms latency for safety-critical decisions, industrial UAVs perform fully autonomous inspect-in-a-box operations without human pilots, and swarm robotics coordinate 100+ agents with decentralized control for search/rescue or environmental monitoring. Industry leaders (Boston Dynamics, Waymo, Amazon Robotics, Aurora Flight Sciences, DJI) deploy these technologies across $50B+ autonomous systems market with accelerating adoption: collaborative autonomous delivery robots reduce logistics costs 20-30%, fully autonomous warehouse systems improve throughput by 30-50%, autonomous inspections reduce downtime 40% for industrial facilities, and multi-robot systems optimize complex tasks 3-5x faster than sequential single-robot approaches. Without mastery of autonomous vehicle design, engineers cannot effectively contribute to these cutting-edge systems or troubleshoot real-world deployment challenges. This course enables hands-on design using ROS/ROS2 middleware, SLAM toolkits, deep learning frameworks (PyTorch, TensorFlow), multi-robot simulation (Gazebo), and real-world robot platforms.",
    "realWorldApplications": [
      "Designing a 50-robot AMR fleet for e-commerce warehouse fulfillment by implementing centralized fleet management with decentralized collision avoidance, achieving 300+ order picks/hour vs. 80-100 with manual labor, with autonomous task allocation algorithms assigning jobs based on robot location/battery state, reducing labor costs 45% while enabling 24/7 operations",
      "Implementing SLAM-based autonomous navigation for a mobile manipulator performing autonomous bin picking in unstructured shelving by fusing LiDAR point clouds with IMU data using EKF/graph optimization techniques, achieving sub-50mm localization accuracy, enabling deterministic grasping of objects without predefined shelving layouts",
      "Designing a self-driving shuttle for autonomous warehouse material transport by integrating camera-based lane detection (CNN), radar-based obstacle tracking, LiDAR-based collision avoidance, and real-time path replanning, achieving <50km/h safe speeds with <100ms decision latency in dynamic human-populated environments",
      "Developing autonomous drone-in-a-box for infrastructure inspection on industrial sites by implementing visual SLAM for GPS-denied indoor mapping, RTK-GPS+visual fusion for outdoor localization, autonomous charge dock return with <10cm landing precision, achieving 100+ autonomous daily flights with zero pilot intervention",
      "Architecting multi-robot coordination system for cooperative box pushing in warehouse environments by implementing decentralized leader-follower formation control, distributed path planning using graph-based optimization, and swarm intelligence for task allocation, achieving 3x faster completion vs. single-robot sequential approach",
      "Implementing end-to-end deep learning perception for autonomous driving in urban environments by training multi-task CNN for simultaneous lane detection, traffic light recognition, pedestrian tracking, and vehicle detection, achieving 99.7% accuracy on highway driving with real-time inference on edge hardware",
      "Designing safety-critical decision-making system for autonomous mining haul trucks by integrating probabilistic motion prediction for nearby vehicles/pedestrians, implementing formal verification for collision avoidance logic, achieving fail-safe operation exceeding ISO 26262 ASIL-C requirements"
    ],
    "learningOutcomes": [
      "Understand autonomous system architecture: perception-localization-planning-control pipelines for ground robots, aerial vehicles, and multi-robot systems with clear interfaces and real-time requirements",
      "Implement SLAM algorithms using LiDAR and visual sensors, comparing EKF-SLAM, graph-SLAM, and filter-based approaches to achieve robust localization in GPS-denied environments with <50mm accuracy",
      "Design and tune motion planning algorithms (RRT*, A*, Dijkstra, TEB) for collision-free path generation in 2D/3D environments with dynamic obstacles and real-time replanning capabilities",
      "Develop reactive obstacle avoidance and local planning using potential field methods, dynamic window approach (DWA), or model predictive control (MPC) to prevent collisions with <100ms latency",
      "Integrate perception systems (camera, LiDAR, radar) with sensor fusion (Kalman filtering, particle filtering) for robust state estimation and object tracking in dynamic environments",
      "Implement deep learning-based perception (CNN for detection/segmentation, RNN for temporal prediction) for autonomous decision-making in complex unstructured environments",
      "Design decentralized multi-robot coordination using market-based algorithms, swarm intelligence, or distributed optimization for task allocation, formation control, and collaborative planning",
      "Develop autonomous vehicle control systems using ROS/ROS2 middleware, simulate with Gazebo, and deploy on real robot platforms (mobile robots, UAVs, autonomous vehicles)",
      "Apply safety-critical design principles and formal verification for collision avoidance and emergency stop logic to achieve ISO 26262 compliance for autonomous driving systems",
      "Evaluate autonomous system performance: safety metrics (collision rates, safety distances), efficiency metrics (task completion time, energy consumption), and robustness to sensor failures"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=zDUaazmSukM (ROS NAVIGATION IN 5 DAYS #4 - Path Planning by The Construct; comprehensive 30+ minute ROS navigation tutorial covering move_base, costmaps, global/local planning, dynamic reconfigure, and real robot deployment on Husky/TurtleBot)",
        "https://www.youtube.com/watch?v=1yoI_tThBmE (Robot Navigation and Path Planning in ROS2 - comprehensive overview of SLAM, localization, global vs local planning, path planning algorithms (A*, Dijkstra, TEB), and practical ROS2 launch configurations)",
        "https://www.youtube.com/watch?v=dDODrSy6cYU (Autonomous Navigation Mobile Robot Using ROS Without Using a Map - practical SLAM implementation tutorial showing real-time map building, localization without pre-saved maps, and autonomous navigation in unknown environments)",
        "https://www.youtube.com/watch?v=YzTMROP4qos (Autonomous Navigation for Mobile Robot Using ROS 2 Jazzy - step-by-step guide to ROS2 Nav2 stack setup, configuring planners/controllers, setting initial pose, waypoint navigation, and performance monitoring)",
        "https://www.youtube.com/watch?v=1L0TKZQcUtA (MIT 6.S094: Introduction to Deep Learning and Self-Driving Cars - foundational lecture on deep learning applications in autonomous vehicles, perception challenges, and end-to-end learning approaches)",
        "https://www.youtube.com/watch?v=tXWHEsNd1Yw (Multi-robot Coordination in Complex Environments - research talk on distributed algorithms, decentralized task allocation, formation control, and swarm robotics for multi-robot systems)"
      ],
      "websites": [
        "https://www.mathworks.com/discovery/slam.html (What Is SLAM - MathWorks comprehensive guide covering visual SLAM, 2D/3D LiDAR SLAM, feature-based vs filter-based approaches, EKF, particle filters, graph optimization, and Kalman filtering for localization)",
        "https://www.mecalux.com/warehouse-automation/autonomous-mobile-robots-amrs (Autonomous Mobile Robots (AMRs) - industry overview of AMR technology, component architecture, navigation software, fleet management, real-world warehouse applications showing 30-50% throughput improvements)",
        "https://mobile-industrial-robots.com/blog/how-autonomous-mobile-robots-transform-warehouse-logistics (How AMRs Transform Warehouse Logistics - practical guide to SLAM navigation, obstacle avoidance, fleet coordination, and integration with warehouse management systems)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC11126069/ (Visual SLAM for Unmanned Aerial Vehicles - peer-reviewed research on UAV localization using visual SLAM, feature detection (SIFT/SURF), loop closure, and real-time performance on embedded hardware)",
        "https://www.grepow.com/blog/what-is-a-drone-flight-controller.html (Drone Flight Controllers: A Comprehensive Guide - technical overview of UAV flight control systems, autonomous flight capabilities, sensor integration, and commercial drone architectures)",
        "https://www.jouav.com/blog/autonomous-drones.html (The Ultimate Guide to Autonomous Drones - industrial drone applications including inspection, delivery, autonomous waypoint navigation, obstacle avoidance, RTK positioning, and drone-in-a-box systems)",
        "https://www.flyability.com/blog/simultaneous-localization-and-mapping (Understanding SLAM in Robotics and Autonomous Vehicles - comprehensive SLAM overview covering 2D/3D implementations, loop closure detection, robustness in dynamic environments, and real-world deployment considerations)",
        "https://www.azorobotics.com/Article.aspx?ArticleID=727 (An Introduction to Multi-Robot Coordination Algorithms - survey of market-based algorithms, swarm intelligence (PSO, ACO), graph-based methods, reinforcement learning, formation control, and bio-inspired coordination strategies)",
        "https://www.unmannedsystemstechnology.com/expo/autonomous-control-systems/ (Autonomous Control Systems for Unmanned Vehicles - overview of autonomous decision-making, fault tolerance, deterministic real-time requirements, and safety-critical systems design)",
        "https://uni-tuebingen.de/fakultaeten/mathematisch-naturwissenschaftliche-fakultaet/fachbereiche/informatik/lehrstuehle/autonomou... (Lecture: Self-Driving Cars - Tübingen University course covering camera/lidar/radar perception, localization, path planning, vehicle modeling, imitation learning, reinforcement learning, and deep learning-based sensori-motor control)"
      ],
      "tools": [
        "ROS/ROS2 (Robot Operating System - middleware for autonomous robot development with built-in SLAM, navigation, sensor integration, and multi-robot communication)",
        "Gazebo simulator (physics-based 3D simulation environment for testing autonomous systems before hardware deployment)",
        "SLAM Toolbox (open-source ROS tool for 2D LiDAR SLAM with graph optimization and loop closure)",
        "Nav2 Stack (ROS2 navigation framework with global/local planning, behavior trees, and real-time obstacle avoidance)",
        "PyTorch & TensorFlow (deep learning frameworks for autonomous perception networks: CNNs for object detection, RNNs for temporal prediction, transformer-based models)",
        "OpenCV (computer vision library for camera-based perception: feature detection, optical flow, lane detection, object tracking)",
        "Open3D (3D point cloud processing library for LiDAR data analysis and SLAM feature extraction)",
        "PX4 Autopilot (open-source flight control software for UAVs with autonomous mission planning and obstacle avoidance)",
        "CARLA (open-source autonomous driving simulator with realistic traffic, weather, and sensor simulation)",
        "NVIDIA Deep Learning Institute (DLI) - training on perception optimization for autonomous vehicles)",
        "Distributed Optimization Frameworks (Convex.jl, CVXPY for multi-robot coordination algorithm design)",
        "Formal Verification Tools (TLA+, Uppaal for safety-critical autonomous system verification)"
      ]
    }
  }
}
,
  {
  "id": "engr-143-statistical-quality-control",
  "code": "ENGR 143",
  "name": "Statistical Quality Control",
  "fullName": "ENGR 143: Statistical Quality Control",
  "description": "Comprehensive study of statistical methods for monitoring and controlling manufacturing and process quality. Covers control charts (X-bar/R, p-charts, c-charts), process capability analysis (Cp, Cpk), hypothesis testing, measurement systems analysis, and quality improvement methodologies. Essential for Control Systems & Automation engineers specializing in process control, quality assurance, and manufacturing automation.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "ENGR 143 is a Tier 3 course because it provides specialized quality and process control knowledge for control engineers working in manufacturing, process automation, and continuous improvement domains. This is not a foundational course for all control engineers—it's essential only for those pursuing careers in manufacturing engineering, quality assurance, Six Sigma, process optimization, or production automation. Why? Modern manufacturing operates under extreme pressure: produce zero-defect products at minimum cost. Statistical Quality Control (SQC) is the data-driven approach that enables this. Control engineers in manufacturing must design feedback systems that monitor product quality in real-time, distinguish between normal process variation (common cause) and abnormal variation (special cause), and trigger corrective action before defects are produced. Understanding control charts is critical—they visually represent process behavior over time and identify when to intervene vs. when to leave the process alone. Misinterpreting a control chart can cause 'overcontrol' (constant unnecessary adjustments that worsen variation) or 'undercontrol' (ignoring signals until crisis occurs). Process capability indices (Cp, Cpk) quantify whether a process is inherently capable of meeting customer specifications. A process with Cpk < 1.0 produces defects by design—no amount of control engineering can fix it without reducing variation or changing specifications. This bridges control theory to hard business metrics: defects cost money, variation reduction saves money. Six Sigma methodology (Cpk = 1.33+) is industry standard; world-class manufacturers target Cpk = 2.0 (less than 3.4 defects per million). For control engineers implementing continuous improvement programs (Kaizen, Lean Six Sigma), understanding statistical methods is essential—decisions must be data-driven, not intuitive. This is Tier 3 because not all control engineers work in manufacturing quality. But for those pursuing careers in factories, automotive, pharmaceuticals, semiconductor fabs, food processing, or any process-driven industry, this becomes effectively Tier 1 or 2.",
    "realWorldApplications": [
      "Implementing real-time SPC monitoring on injection molding machines, setting up X-bar/R control charts to track part dimensions, using statistical rules to detect process drift before producing out-of-spec parts",
      "Designing a quality feedback control system for precision machining that measures part dimensions in-process, interprets control charts, and adjusts tool offsets when special cause variation is detected",
      "Performing process capability study on a pharmaceutical filling line: collecting 25+ subgroups of 5 samples each, calculating Cpk to verify the filling machine is capable of meeting ±1% tolerance without excess rejects",
      "Implementing Measurement Systems Analysis (MSA/Gage R&R) to validate that quality measurement devices (precision scales, calipers, optical gauges) are accurate and repeatable enough for statistical decision-making",
      "Designing a sampling plan for incoming material inspection: determining sample size and acceptance/rejection criteria using statistical methods to balance risk (producer's risk / consumer's risk) while minimizing inspection cost",
      "Implementing a Six Sigma improvement project: identify parts with high defect rates, collect baseline data with control charts, design experiment to reduce variation, verify improvement using Cpk calculations",
      "Setting up attribute control charts (p-charts) for defect rate monitoring in printed circuit board assembly, establishing statistical alarm points to trigger investigation when defect rates deviate beyond control limits",
      "Designing an Andon (visual management) system that integrates SPC analysis: control charts update every hour, stop light goes red when process shows special cause (out of control), triggering immediate corrective action"
    ],
    "learningOutcomes": [
      "Understand fundamental statistical concepts: normal distribution, standard deviation, confidence intervals, hypothesis testing, Type I and Type II errors—essential for interpreting control charts and capability indices",
      "Master X-bar & R control charts: construct charts from manufacturing data, calculate center lines and control limits, interpret patterns to distinguish common cause (normal process variation) vs. special cause (abnormal changes requiring action)",
      "Apply control chart interpretation rules: detect process shifts before they produce defects, identify trends and cycles, recognize when data points violate control rules (e.g., 8 consecutive points on one side of center line)",
      "Analyze process capability: calculate Cp (potential capability), Cpk (actual capability accounting for centering), and understand what Cpk values mean for defect rates and Six Sigma levels",
      "Perform Measurement Systems Analysis (Gage R&R): validate that measurement devices and procedures are accurate, repeatable, and discriminating enough for reliable quality decisions",
      "Implement attribute control charts: p-charts for defect rates, c-charts for defect counts, np-charts for number of defectives—appropriate for non-numerical quality characteristics",
      "Design sampling plans: determine optimal sample size and frequency for monitoring, balance cost vs. statistical power, understand producer's risk and consumer's risk",
      "Apply Six Sigma quality methodology: understand sigma levels (1σ to 6σ), defect rates (PPM - parts per million), and how process improvement reduces variation to achieve Six Sigma (≤3.4 PPM defects)",
      "Conduct hypothesis testing: use statistical tests to determine if observed differences are real or due to chance, essential for validating process improvements",
      "Implement continuous improvement cycles: use SPC data to identify improvement opportunities, design experiments, verify results using statistical evidence before full-scale deployment",
      "Develop quality dashboards and automated SPC systems: integrate real-time data collection with control chart analysis and automated alerts for process engineers"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=KoYea4Ef_fg - Master SPC and Control Charts in 22 Minutes! (22:22) - Comprehensive SPC overview with X-bar, R, p-charts, c-charts",
        "https://www.youtube.com/watch?v=zJS4o2lkGak - Process Capability Analysis: Cp, Cpk, Sigma Level (26:01) - Detailed explanation of capability indices and Six Sigma",
        "https://www.youtube.com/watch?v=7xRQUEsU-Sw - X-bar & R Chart Basics Explained Clearly (14:15) - Practical construction and interpretation of control charts",
        "https://www.youtube.com/watch?v=DmrI4WaLULE - Process Capability | Cp, Cpk Analysis | TQM (12:46) - Capability analysis with practical examples",
        "https://www.youtube.com/watch?v=m6FlaKPTLCk - Introduction to X Bar R Control Chart using Minitab 20 (26:37) - Software-based control chart implementation",
        "https://www.youtube.com/watch?v=T1OX0qbPAf0 - X Bar and R Bar Charts in Statistical Process Control (10:47) - Interpretation of chart patterns and out-of-control signals",
        "https://www.youtube.com/watch?v=Ugcb7Vlp0Ts - How do SPC Control Charts Work? (11:00) - Fundamental SPC concepts and decision rules",
        "https://www.youtube.com/watch?v=VKcntQG1C88 - Webinar: Process Capability Analysis Using Cp & Cpk Indices (53:30) - Comprehensive capability analysis webinar",
        "https://www.youtube.com/watch?v=6KFGm--KAbc - Sigma Level and Process Capability Indices (11:34) - Mathematical relationship between sigma level, Cp, and Cpk",
        "https://www.youtube.com/watch?v=-O9Q4Z-nmfI - Xbar-R and Xbar-s Chart: Detailed Practical Examples (25:58) - Minitab examples comparing R vs S charts",
        "https://www.youtube.com/watch?v=PDTp9MMwNKw - Statistical Process Control 1: Control Charts (3:18) - Software tutorial for creating and interpreting control charts",
        "https://www.youtube.com/watch?v=ouMnoLcK6uw - Process Capability and Process Capability Index (11:32) - Numerical examples of capability calculations",
        "https://www.youtube.com/watch?v=vYHXXw-Uupo - xBar-R Chart (Statistical Process Control) (14:22) - Table values and calculation methodology"
      ],
      "websites": [
        "https://ies.ncsu.edu/courses/spc/ - NC State: Statistical Process Control Workshop (industry-leading SPC training program)",
        "https://www.seeq.com/resources/use-cases/statistical-process-control-spc-sqc/ - Seeq: Real-time SPC Implementation in Process Industries",
        "https://www.symphonytech.com/articles/sixsigma.html - Symphony Technologies: The Six Sigma Approach (Cp, Cpk defect rate relationships)",
        "https://www.minitab.com/en-us/resources-services/services/training/training-tracks/process-control-and-capability/ - Minitab: Process Control and Capability Training",
        "https://www.autodesk.com/blogs/design-and-manufacturing/what-is-statistical-process-control/ - Autodesk: What is Statistical Process Control in Manufacturing?",
        "https://www.6sigma.us/process-improvement/process-capability-index-cpk/ - Six Sigma: Process Capability Index (Cpk) for Business Excellence",
        "https://axeon.net/course/2-day-statistical-process-control-spc/ - Axeon: SPC Training Course Curriculum (comprehensive 2-day program)",
        "https://www.sw.siemens.com/en-US/technology/statistical-process-control-spc/ - Siemens: Statistical Process Control Implementation",
        "https://iise.org/TrainingCenter/CourseDetail/?EventCode=SQC - IISE: Statistical Quality Control (professional certification)",
        "https://www.6sigma.us/six-sigma-in-focus/statistical-process-control-spc/ - Six Sigma: Ultimate Guide to Statistical Process Control",
        "https://accendoreliability.com/process-capability-analysis-iii/ - Accendo: Process Capability Analysis III (Cp vs Percent Defectives)",
        "https://globaljournals.org/GJMBR_Volume16/6-Process-Capability%E2%80%93A-Managers.pdf - Global Journals: Process Capability—A Manager's Tool (PDF research paper)",
        "https://asq.org/training/catalog/topics/statistical-process-control-spc - ASQ: Statistical Process Control Training & Courses"
      ],
      "tools": [
        "Minitab Statistical Software - Industry-leading software for control charts, capability analysis, DOE, and comprehensive statistical quality analysis",
        "JMP (SAS) - Advanced data visualization and statistical analysis for quality engineering with interactive control charts and dashboards",
        "Seeq - Cloud-based real-time SPC monitoring platform with live data connectivity and automated control chart updates",
        "Python with Matplotlib/Seaborn - Open-source tools for control chart creation and statistical process analysis",
        "R with qcc Package - Statistical computing language with specialized SPC library for control chart generation and interpretation",
        "OriginPro - Scientific graphing and data analysis software with integrated Statistical Process Control module",
        "Autodesk Vault - Data management platform integrating SPC for manufacturing traceability and quality documentation",
        "Siemens Opcenter Quality Control - Manufacturing execution system with real-time SPC monitoring and corrective action workflows",
        "Honeywell PHD / AVEVA PI - Industrial process data historians with built-in SPC analytics for continuous monitoring",
        "Excel/Google Sheets with Control Chart Templates - Accessible tools for basic SPC implementation in small-to-medium manufacturers",
        "Measurement Systems Analysis (MSA) Software - Dedicated tools for Gage R&R studies and measurement system validation",
        "Design of Experiments (DOE) Tools - Integrated with SPC for systematic process improvement and variation reduction"
      ]
    }
  }
}
,
  {
  "id": "engr-180-spatial-analysis-modeling",
  "code": "ENGR 180",
  "name": "Spatial Analysis and Modeling",
  "fullName": "ENGR 180: Spatial Analysis and Modeling",
  "description": "Advanced course integrating GIS spatial analysis, digital twin simulation, computer vision, and 3D modeling for industrial automation. Covers facility layout optimization, real-time asset tracking, predictive maintenance, and autonomous system perception.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control Systems & Automation engineers increasingly design and deploy intelligent systems requiring spatial understanding: warehouse AMR fleet management, facility layout optimization, digital twins for predictive maintenance, and computer vision-based automation. This tier-3 advanced course builds on foundational control theory (EE 102, EE 130), embedded systems (EE 140), digital communication (EE 150), and autonomous systems (EE 180) to enable engineers to: design spatial systems using GIS and 3D modeling tools, create digital twins that synchronize real-time sensor data with physics simulations for predictive maintenance, implement computer vision perception for robotic manipulation and navigation, optimize facility layouts for material flow and autonomous systems, and integrate spatial data across Industry 4.0 platforms for real-time decision-making. Modern manufacturing demands unprecedented spatial intelligence: warehouse operations optimize autonomous robot routes through 50-100k square foot facilities with 1000+ SKUs, digital twins predict equipment failures 60+ days in advance through multiphysics simulation, computer vision systems perform quality control at 99.7% accuracy on assembly lines with 10+ parts per second throughput, and facility optimization using GeoAI improves operational efficiency by 25-30% while reducing resource waste by 25-30%. Industry leaders (KUKA, ABB, Siemens, Esri, Ansys) deploy these integrated technologies across $40B+ smart factory market with accelerating adoption. Without mastery of spatial analysis and digital modeling, engineers cannot effectively architect modern intelligent factories or deploy cutting-edge autonomous systems. This course enables hands-on design using ANSYS digital twins, GIS platforms (ArcGIS, QGIS), computer vision frameworks (YOLO, OpenCV), and 3D simulation environments (Gazebo, CoppeliaSim).",
    "realWorldApplications": [
      "Optimizing a 200,000 sq ft warehouse layout for 50 autonomous mobile robots by analyzing spatial flow patterns, calculating optimal dock positioning, routing algorithms minimizing travel time and congestion, reducing order pick time from 12 minutes to 4.2 minutes (65% improvement) and increasing throughput from 200 to 600+ orders/hour",
      "Designing a digital twin for a semiconductor manufacturing facility that predicts tool wear and equipment failures 45-60 days in advance by fusing real-time sensor data (temperature, vibration, pressure) with physics-based models, automatically scheduling preventive maintenance during planned downtime, reducing unplanned downtime by 40% and extending equipment lifespan by 30%",
      "Implementing real-time computer vision quality control system on automotive assembly line by training YOLO v5 object detection networks on 50k+ part images, achieving 99.7% accuracy in identifying defects <0.5mm, enabling 100% inline inspection vs. 10% sampling, reducing warranty costs by $2-5M annually",
      "Creating GIS-based facility operations platform for multi-site manufacturing network by integrating RTLS (Real-Time Location Systems) tracking 500+ mobile assets across 12 facilities, spatial analysis identifying equipment underutilization (25-35% typical), recommending asset reallocation saving $500k+ annually in equipment procurement",
      "Developing autonomous bin picking system using 3D computer vision (point cloud + YOLO) to recognize and grasp plastic components from unstructured bins, achieving 95% pick success rate vs. 99.5% required by training spatially-aware CNN on synthetic data, improving logistics automation ROI from uncertain to bankable",
      "Optimizing manufacturing facility energy management using spatial heat mapping, identifying thermal hotspots causing excessive HVAC load, recommending equipment repositioning and ducting modifications reducing energy consumption 12-18%, payback period 2-3 years",
      "Implementing drone-based infrastructure inspection with autonomous flight planning using GIS spatial analysis to identify optimal survey paths, SLAM-based 3D reconstruction of facility exterior identifying corrosion/damage, computer vision defect detection automating 80% of inspection analysis reducing labor costs 65%"
    ],
    "learningOutcomes": [
      "Apply GIS spatial analysis techniques (buffer analysis, network analysis, heat mapping, suitability analysis) to optimize manufacturing facility layouts for autonomous systems, material flow, and energy efficiency",
      "Design and implement digital twins that integrate physics-based simulation (CFD, thermal, structural) with real-time sensor data streams to predict equipment failures, optimize maintenance scheduling, and improve operational efficiency",
      "Develop computer vision perception systems using deep learning (CNNs with YOLO, R-CNN) for object detection, semantic segmentation, and 3D pose estimation in robotic manipulation and quality control applications",
      "Create 3D spatial models and virtual environments for facility design, equipment placement, and autonomous system path planning using CAD tools and simulation software",
      "Implement real-time location tracking systems (RTLS) and asset management platforms integrating spatial data, IoT sensors, and analytics for facility operations optimization",
      "Apply reduced-order modeling (ROM) and machine learning to accelerate digital twin simulations from hours to seconds while maintaining accuracy for real-time predictive maintenance",
      "Design computer vision pipelines for autonomous perception: camera calibration, image preprocessing, feature extraction, object detection, depth estimation, and tracking",
      "Integrate spatial analysis, digital twins, and computer vision into unified Industry 4.0 platforms for autonomous decision-making and continuous facility optimization"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=cxoHx7kitzk (Creating a Digital Twin with ANSYS - 2-minute overview showing real-time virtual copy concept, sensor data relay, predictive maintenance capability, and product performance insights from continuous simulation)",
        "https://www.youtube.com/watch?v=SCTciIAps1A (ANSYS Twin Builder Build, Validate and Deploy Complete Systems - 30+ minute webinar covering full digital twin lifecycle, reduced-order models (ROM), multiphysics simulation, data integration, and industrial IoT deployment)",
        "https://www.youtube.com/watch?v=4FU1dmJEFAQ (ANSYS 2025 R2 Twin Builder & Twin AI Updates - technical walkthrough of enhanced plotting, Twin AI web app, LPV ROM with multiple parameters, LS-OPT integration, and CISPR compliance features)",
        "https://www.youtube.com/watch?v=KI4VjXyJxf0 (ArcGIS Pro: Analysis Overview - 58-minute comprehensive guide to 2D/3D/4D spatial analysis capabilities, geoprocessing workflows, raster/vector analysis, network analysis, location-allocation problems, and spatial modeling with ArcGIS Pro)",
        "https://www.youtube.com/watch?v=w-zHT0Wvdt8 (Install and Run YOLO on GPU/CPU with PyTorch - practical tutorial showing YOLOv11 installation, object detection inference in 46ms, segmentation, pose estimation, and real-time performance benchmarking)",
        "https://www.youtube.com/watch?v=rHd-AnDtOsQ (Spatial Analysis in ArcGIS Online - 49-minute guide to cloud-based GIS spatial analysis tools, ready-to-use workflows, facility optimization, and Map Viewer applications)",
        "https://www.youtube.com/watch?v=g8iSoz-aVxQ (What's New in ANSYS Digital Twins 2025 R1 - latest advances in AI-driven digital twins, TwinAI platform, and Twin Builder enhancements for manufacturing optimization)"
      ],
      "websites": [
        "https://ignesa.com/insights/modern-gis-use-cases-in-manufacturing/ (Modern GIS Use Cases in Manufacturing - real-world examples showing 25-30% operational efficiency improvements, 25-30% resource waste reduction, smart facility layouts, equipment monitoring, autonomous transportation optimization)",
        "https://www.ansys.com/blog/optimize-manufacturing-with-digital-twins (Optimize Manufacturing With Digital Twins - hybrid digital twins blending data and physics, predictive maintenance reducing downtime, ROM technology accelerating simulations, and Industry 4.0 integration for continuous optimization)",
        "https://blog.roboflow.com/computer-vision-robotics/ (Computer Vision Use Cases in Robotics - practical overview of machine vision in automation, object detection, image segmentation, depth estimation, 3D reconstruction, and SLAM for robot navigation)",
        "https://www.simio.com/a-comprehensive-guide-to-digital-twin-simulation-for-beginners/ (Comprehensive Guide to Digital Twin Simulation - fundamental concepts, real-time data integration, AI/ML integration for predictive analytics, simulation optimization techniques, and manufacturing applications with McKinsey research)",
        "https://vention.io/blogs/automation-programming-and-simulation/digital-twins-for-manufacturing-997 (Digital Twins in Manufacturing: From Simulation to Virtual Commissioning - accelerated commissioning, reduced downtime, OEE improvement, quality control, AI-powered predictions, continuous feedback loops, fleet management)",
        "https://www.ibm.com/think/topics/digital-twin (What Is a Digital Twin - IBM overview of continuous monitoring, simulation, analysis over product lifecycle, virtual prototyping, production optimization, quality management, supply chain optimization)",
        "https://www.n-ix.com/computer-vision-in-robotics/ (Computer Vision in Robotics: The Future of Intelligent Automation - detailed analysis of vision convergence with intelligent operation, CNN-based object detection, image segmentation, depth estimation, 3D reconstruction, motion tracking)",
        "https://www.aveva.com/en/solutions/digital-transformation/digital-twin/ (Industrial Digital Twin Solutions - AVEVA platform connecting real-time, maintenance, engineering, operations data with analytics for asset performance, OEE optimization, quality improvement, process analysis)",
        "https://www.esri.com/en-us/industries/manufacturing/overview (GIS for Manufacturing Business Intelligence - Esri platform for strategic planning, real-time insights, visualization of global operations, facility optimization, asset management, spatial intelligence)",
        "https://www.nature.com/articles/s44335-025-00047-z (AI-Native Robotic Vision Systems Enabled by In-Sensor Computing - cutting-edge research on hierarchical vision systems, synaptic encoding, in-sensor computing for low-latency perception on robots)"
      ],
      "tools": [
        "ANSYS Twin Builder (multiphysics digital twin platform with reduced-order modeling, real-time simulation, predictive maintenance, industrial IoT connectivity)",
        "ANSYS Twin AI (AI-powered digital twin software for predictive analytics, anomaly detection, and autonomous system optimization)",
        "ArcGIS Pro (comprehensive GIS platform with 2D/3D/4D spatial analysis, geoprocessing, network analysis, suitability modeling, asset tracking)",
        "ArcGIS Online (cloud-based GIS with ready-to-use spatial analysis tools, real-time data integration, IoT sensor connectivity)",
        "QGIS (open-source GIS alternative with spatial analysis, raster/vector processing, scripting capabilities)",
        "YOLO (real-time object detection framework with PyTorch: v5, v8, v11 versions for object detection, segmentation, pose estimation)",
        "OpenCV (computer vision library for image processing, feature detection, optical flow, object tracking, camera calibration)",
        "Open3D (3D data processing: point cloud analysis, SLAM feature extraction, 3D reconstruction)",
        "Gazebo (physics-based 3D robotics simulator for autonomous system testing and computer vision development)",
        "CoppeliaSim (multiphysics simulation platform for robotics, machine vision, and autonomous system testing)",
        "Simio (discrete-event simulation for facility layout optimization and process analysis)",
        "Python libraries (numpy, scipy, scikit-image for spatial analysis; geopandas for geospatial data; pandas for asset tracking)",
        "MATLAB/Simulink with Aerospace Blockset (3D visualization and spatial modeling)",
        "Unity/Unreal Engine (game engines for immersive digital twin visualization and virtual commissioning)",
        "CAD tools (SolidWorks, Autodesk Inventor, CATIA for 3D facility modeling and digital twin design)"
      ]
    }
  }
}
,
];

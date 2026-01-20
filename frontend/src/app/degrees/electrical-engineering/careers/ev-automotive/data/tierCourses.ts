/**
 * Electric Vehicle & Automotive Systems Tier Courses Data
 * Course recommendations organized by tier for Electric Vehicle & Automotive Systems career path
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
  "id": "ee-101-circuit-design-i",
  "code": "EE 101",
  "name": "Electronic Circuit Design I",
  "fullName": "EE 101: Electronic Circuit Design I",
  "description": "Foundational circuit design course covering diodes, bipolar transistors, and FETs—essential components in vehicle power electronics, battery management systems, and traction inverters used in electric vehicles.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "In electric vehicle systems, power electronics circuits are the backbone of energy conversion and control. EE 101 teaches you how diodes rectify AC to DC (critical for charging systems), how transistors switch and amplify signals (essential for motor drives and inverters), and how to design stable operating points in circuits—all directly applicable to BMS (Battery Management Systems), onboard chargers, DC/DC converters, and traction control electronics found in modern EVs and hybrid vehicles.",
    "realWorldApplications": [
      "Battery Management System (BMS) circuits that monitor and balance cell voltages in EV battery packs",
      "Traction inverter power stages that convert DC battery power to 3-phase AC for EV motors",
      "Onboard charger front-end rectifier circuits (diode bridges) converting AC grid power to DC",
      "DC/DC converter designs reducing 400V+ battery voltage to 12V auxiliary systems in electric vehicles",
      "Regenerative braking power electronics controlling motor current during deceleration",
      "Gate drive circuits using BJTs and MOSFETs to control high-power semiconductor switches in power modules"
    ],
    "learningOutcomes": [
      "Design and analyze circuits using diodes in forward and reverse bias configurations",
      "Understand PN junction physics and apply diode models to rectifier circuits (half-wave and full-wave)",
      "Analyze bipolar junction transistor (BJT) circuits in active, saturation, and cutoff regions",
      "Design BJT amplifiers and establish stable Q-point (operating point) designs",
      "Understand Field-Effect Transistor (FET) and MOSFET operation for switching and analog applications",
      "Perform AC frequency response analysis using Bode plots and gain-phase relationships",
      "Use computer-aided design (CAD) tools (LTSpice, Tinkercad) to simulate and validate circuit behavior before prototyping",
      "Apply circuit design principles to real automotive electrical systems and power conversion topologies"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=haaRTKm8ePQ - Beginner Electronics - Circuit Design, Build, and Measuring",
        "https://www.youtube.com/watch?v=7jiKULI0iB4 - How To Use LTspice, A Free Circuit Simulator (20 min comprehensive tutorial)",
        "https://www.youtube.com/watch?v=xFYF7PLeWgA - Getting started with circuit simulation in LTspice",
        "https://www.youtube.com/watch?v=Fwj_d3uO5g8 - The basics: how diodes work working principle pn junction",
        "https://www.youtube.com/watch?v=270xELWpJN0 - Diode Tutorial for beginners - Electronics Crash Course #11",
        "https://www.youtube.com/watch?v=fIvZen2tq_w - Animated BJT – How a Bipolar Junction Transistor works",
        "https://www.youtube.com/watch?v=YQlbPGNB-ys - Back to Basics: Bipolar Transistor bias circuits and Beta dependence",
        "https://www.youtube.com/watch?v=-VwPSDQmdjM - Introduction to Bipolar Junction Transistor (BJT)",
        "https://www.youtube.com/watch?v=zTHzaNdByVA - Simple MOSFET Circuits You Can Build",
        "https://www.youtube.com/watch?v=AWRJ sze_9m4 - MOSFET Explained - How MOSFET Works",
        "https://www.youtube.com/watch?v=316jdEQhdnA - MOSFET Circuit Design N-Channel E-MOSFET Calculations",
        "https://www.youtube.com/watch?v=LrOM2GABK1g - Introduction to Tinkercad Circuits & Breadboarding - Part 1",
        "https://www.youtube.com/watch?v=31pOPp6iAjI - Tinkercad Tutorial #8 - Circuits overview and how to get started"
      ],
      "websites": [
        "https://www.allaboutcircuits.com/technical-articles/basic-circuit-simulation-with-ltspice/ - All About Circuits: Basic Circuit Simulation with LTspice",
        "https://learn.sparkfun.com/tutorials/diodes/all - SparkFun Learn: Diodes",
        "https://learn.sparkfun.com/tutorials/getting-started-with-ltspice/all - SparkFun Learn: Getting Started with LTspice",
        "https://www.tinkercad.com/learn/circuits - Tinkercad: Learn Circuits (official learning platform)",
        "https://jlcpcb.com/blog/how-to-simulate-electronic-circuits-in-ltspice - JLCPCB: How to Simulate Electronic Circuits in LTSpice",
        "https://catalog.ucmerced.edu - UC Merced Course Catalog (official course information)"
      ],
      "tools": [
        "LTSpice (free, open-source circuit simulator) - https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html",
        "Tinkercad Circuits (free, web-based circuit simulator) - https://www.tinkercad.com/",
        "Breadboard and electronic component kits (resistors, diodes, LEDs, transistors, capacitors)",
        "Multimeter (for measuring voltage, current, resistance)",
        "Oscilloscope (optional but recommended for observing circuit behavior over time)"
      ]
    }
  }
}
,
  {
  "id": "ee-102-signal-processing-and-linear-systems",
  "code": "EE 102",
  "name": "Signal Processing and Linear Systems",
  "fullName": "EE 102: Signal Processing and Linear Systems",
  "description": "Essential foundation for all modern EV and automotive control systems. Signal processing theory underpins motor control (FOC), battery management, and autonomous driving systems. Master the mathematical and algorithmic foundations required to design real-time embedded control systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Signal processing is the mathematical backbone of electric vehicle and automotive systems. Every EV relies on real-time signal processing for motor control via Field-Oriented Control (FOC), battery management, charging systems, and autonomous driving sensors. Engineers working in EV powertrains must understand Laplace transforms, transfer functions, filtering techniques, and discrete-time signal representation to develop efficient, safe, and reliable vehicle systems. This course provides the rigorous foundation required for all advanced EV control and embedded systems work.",
    "realWorldApplications": [
      "Motor torque control and speed regulation using Field-Oriented Control (FOC) algorithms in 3-phase BLDC and PMSM motors",
      "Battery Management System (BMS) signal filtering and noise reduction for accurate voltage/current/temperature monitoring across battery packs",
      "Sensor signal filtering and processing for autonomous driving perception (LiDAR, radar, camera sensor fusion)",
      "Real-time digital signal processing for vehicle stability control systems (ABS, traction control, ESC)",
      "On-board charger EMI/RFI filtering and power quality management for safe EV charging",
      "Regenerative braking energy recovery through signal-based control algorithms",
      "Thermal management system design using temperature signal monitoring and feedback control"
    ],
    "learningOutcomes": [
      "Represent signals in time-domain and frequency-domain; understand Fourier and Laplace transforms",
      "Model linear time-invariant (LTI) systems using transfer functions and state-space representations",
      "Design and analyze digital filters (low-pass, high-pass, notch) for noise reduction in automotive sensors",
      "Apply sampling theory and understand discrete-time signal processing for embedded systems",
      "Analyze system stability and frequency response characteristics for control system design",
      "Implement signal processing algorithms on real-time embedded platforms (microcontrollers, DSPs)",
      "Apply signal processing theory to solve practical EV motor control and battery management challenges"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=-FHm2pQmiSM - MIT 6.003: Signals and Systems - Lecture 1 (Dennis Freeman's foundational lecture on signal representations, systems, and abstractions from MIT's premier signals course)",
        "https://www.youtube.com/watch?v=bf1264iFr-w - Stanford EE263: Linear Dynamical Systems - Lecture 1 (Prof. Stephen Boyd's introduction to applied linear algebra and dynamical systems with circuit, signal, control applications)",
        "https://www.youtube.com/watch?v=0mnTByVKqLM - Control Bootcamp: Laplace Transforms and Transfer Functions (Steve Brunton's 19-minute tutorial on Laplace transforms and transfer function computation with code examples)",
        "https://www.youtube.com/watch?v=WFnqSabXhOI - Transfer Functions: Stage 1: Laplace Transformation (ACE-Lab detailed walkthrough converting ODEs to transfer functions via Laplace transform)",
        "https://www.youtube.com/watch?v=KqokoYr_h1A - Intro to the Laplace Transform & Three Examples (clear tutorial defining Laplace transform as improper integral with three worked examples)",
        "https://www.youtube.com/watch?v=Fer7pC4T1Ss - Laplace Transforms: Determining a Transfer Function (comprehensive guide showing step-by-step transfer function determination from differential equations)",
        "https://www.youtube.com/watch?v=PsMk3vCZg5E - Integrated Motor Drivers With dsPIC DSCs (real-world application showing signal processing and motor control implementation on digital signal controllers)",
        "https://www.youtube.com/watch?v=hqRNv029W3w - dsPIC DSC Integrated Motor Drivers: Real-Time Control (deep dive into real-time 3-phase motor control using DSP+power driver hardware)",
        "https://www.mathworks.com/videos/motor-control-with-embedded-coder-for-microchip-mcus-1488570451176.html - Motor Control with Embedded Coder (tutorial on deploying FOC algorithms from Simulink to real microcontrollers)"
      ],
      "websites": [
        "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/ - MIT OpenCourseWare - 6.003 Signals and Systems (complete course materials including lecture notes, exams, problem sets)",
        "https://see.stanford.edu/Course/EE263 - Stanford Engineering Everywhere - EE263 (Prof. Boyd's complete linear dynamical systems course with videos, handouts, problem sets)",
        "https://ennovi.com/signal-processing-on-on-board-electronics-in-electric-vehicles/ - Signal Processing for EV Battery Management (overview of signal processing applications in EV on-board electronics)",
        "https://www.analog.com/media/en/technical-documentation/technical-articles/signal-processing-technology-for-automotive-systems-f - Signal Processing Technology for Automotive Systems (Analog Devices technical white paper on signal processing for motor control, safety systems, BMS)",
        "https://mechtex.com/blog/field-oriented-control-foc-for-bldc-motors-a-beginners-guide - Field-Oriented Control (FOC) for BLDC Motors Guide (beginner-friendly explanation of FOC algorithm with Clarke/Park transforms)",
        "https://www.embedded.com/smoothing-ev-powertrain-performance-with-a-field-oriented-control-algorithm/ - Smoothing EV Powertrain Performance with FOC (deep dive into FOC implementation and efficient torque control)",
        "https://catalog.ucmerced.edu/content.php?catoid=24&navoid=2694 - UC Merced Electrical Engineering Program (EE program overview including EV emphasis area courses)",
        "https://dewesoft.com/blog/guide-to-fft-analysis - Guide to FFT Analysis (Fast Fourier Transform) (comprehensive guide on FFT implementation and applications in signal analysis)",
        "https://www.youtube.com/watch?v=3Gl082gAZGc - Lecture 16 | Introduction to Linear Dynamical Systems (Stanford EE263 lecture on advanced system analysis)",
        "https://online-engineering.case.edu/blog/signal-processing-control-systems-techniques-trends - Signal Processing in Control Systems (overview of signal processing techniques and trends for automotive control)",
        "https://www.ti.com/sc/docs/general/dsp/fest99/digital_control/6dsp_ti99v1.pdf - DSPs for Real-time Sensing and Control of Automotive Systems (Texas Instruments technical paper on digital signal processor implementation)",
        "https://thesis.unipd.it/retrieve/a78ec492-09b0-4823-a321-e67c8a2582eb/Ahmadian_Arash.pdf - Digital Signal Processing for Electric Vehicles (research thesis on DSP applications in EV systems)",
        "https://www.eetimes.com/inside-dsp-on-automotive-signal-processing-signal-processing-hits-the-road/ - Inside DSP on Automotive Signal Processing (EE Times article on signal processing applications in modern vehicles)",
        "https://www.youtube.com/watch?v=IxoPYhXY30k - Automotive Radar – Signal Processing Perspective (tutorial on advanced signal processing for autonomous driving radar systems)",
        "https://www.autopi.io/glossary/signal-processing/ - What is Signal Processing? (beginner-friendly explanation of signal processing fundamentals)"
      ],
      "tools": [
        "MATLAB/Simulink - Industry-standard tool for signal processing, control system design, and motor control algorithm development - https://www.mathworks.com/products/matlab.html",
        "Python (SciPy, NumPy, Matplotlib) - Free, open-source tools for signal processing algorithm development, Fourier analysis, and visualization - https://www.scipy.org/",
        "National Instruments LabVIEW - Graphical programming environment for signal acquisition, real-time control, and embedded systems - https://www.ni.com/en-us/shop/labview.html",
        "LTspice - Free circuit simulation tool for analyzing RC filters, transfer functions, and signal conditioning circuits - https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html",
        "dsPIC Development Kits (Microchip) - Hardware development platform with integrated motor control peripherals and signal processing DSP core - https://www.microchip.com/",
        "Open-Source DSP Libraries (CMSIS-DSP) - ARM Cortex M-optimized DSP library with FFT, filtering, and matrix operations - https://github.com/ARM-software/CMSIS_5",
        "Octave (Free MATLAB Alternative) - Open-source numerical computing and signal processing tool - https://www.gnu.org/software/octave/",
        "Scilab (Free) - Open-source alternative to MATLAB with signal processing capabilities - https://www.scilab.org/"
      ]
    }
  }
}

,
  {
  "id": "ee-111-electronic-circuit-design-ii",
  "code": "EE 111",
  "name": "Electronic Circuit Design II",
  "fullName": "EE 111: Electronic Circuit Design II",
  "description": "Critical practical course for EV systems engineers. Master the design of power electronics circuits—gate drivers, DC-DC converters, and motor control circuits—that convert and regulate power in electric vehicles. Combines semiconductor device physics, circuit topology selection, PCB layout design, and thermal management principles essential for real-world EV hardware development.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electronic circuit design skills directly translate to designing and optimizing critical EV power systems. Every electric vehicle requires sophisticated power electronics: the traction inverter that controls the motor, DC-DC converters that power auxiliary systems, on-board chargers, and battery management circuits. EE 111 teaches both theoretical understanding and practical design methodology—from semiconductor selection through PCB layout—required to develop reliable, efficient, and safe EV power electronics. This course bridges the gap between signal processing theory and real embedded hardware that must handle hundreds of amps at kilovolt levels.",
    "realWorldApplications": [
      "Design of 3-phase traction inverter gate drive circuits for BLDC/PMSM motor control with IR2110 or isolated drivers",
      "DC-DC converter design: stepping 400V/800V battery voltage down to 48V auxiliary power bus with >95% efficiency",
      "On-board charger circuit design: AC-to-DC conversion with galvanic isolation and power factor correction",
      "Battery Management System (BMS) analog front-end design: precision current sensing, cell voltage monitoring, balancing circuits",
      "Regenerative braking converter: bi-directional buck-boost topology for energy recovery during deceleration",
      "PCB layout optimization for high-power density: thermal management, high-current routing, thermal via arrays",
      "Gate driver circuit protection: bootstrap capacitor design, dead-time insertion, overcurrent/overvoltage protection"
    ],
    "learningOutcomes": [
      "Select appropriate power semiconductor devices (MOSFETs, IGBTs) based on voltage/current/switching frequency requirements",
      "Design gate driver circuits including bootstrap capacitors, level shifters, and protection mechanisms",
      "Analyze and design DC-DC converter topologies (buck, boost, buck-boost) from first principles including component selection",
      "Design active analog filters using operational amplifiers for sensor signal conditioning and feedback control",
      "Perform PCB layout design for power electronics considering thermal management, current paths, and EMI",
      "Calculate inductor, capacitor, and resistor values for converters and filters using design equations",
      "Evaluate trade-offs between efficiency, thermal performance, cost, and EMI in circuit design decisions",
      "Simulate power circuits using SPICE/LTspice to verify performance before hardware implementation"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=i5jtj3erFRA - IR2110 MOSFET-gate-driver (practical demonstration of IR2110 gate driver circuit with bootstrap capacitor, power supply configuration, gate resistor selection)",
        "https://www.youtube.com/watch?v=bHc19Eyhdh4 - How to Drive MOSFETs and IGBTs (45-minute comprehensive tutorial on gate capacitance, driver IC selection, bootstrap design, dead-time insertion, high-side/low-side driving)",
        "https://www.youtube.com/watch?v=IyiCHMHE5Qg - How to Design Buck, Boost & Buck-Boost DC-DC Converters (44-minute complete design tutorial covering topology selection, component sizing, PCB layout, efficiency analysis)",
        "https://www.youtube.com/watch?v=Q4WoHkaod_Q - BUCK CONVERTER CIRCUIT DESIGN FOR BEGINNERS (67-minute comprehensive tutorial from circuit design through component selection to PCB layout for synchronous buck converter)",
        "https://www.analog.com/en/resources/media-center/videos/6313213746112.html - DC-DC Converter Design Made Easy (Analog Devices professional tutorial on power supply design for wide input-voltage converters using EE-Sim tool)",
        "https://www.youtube.com/watch?v=NCyHLj5FWkg - Filter Design and Analysis with Operational Amplifier (10-minute tutorial on designing active filters using op-amps with Sallen-Key topologies)",
        "https://www.youtube.com/watch?v=KfvGCnxXFV0 - Designing of Filters using Operational Amplifier (detailed walkthrough of op-amp filter design including cutoff frequency and transfer function calculation)",
        "https://www.youtube.com/watch?v=AXSkRUqM9Kc - IGBT Gate Drive Transformer Design, Construction and Test (advanced gate drive design for high-voltage IGBT circuits using isolated gate drive transformers)",
        "https://www.youtube.com/watch?v=fXvllju0Duw - Mastering MOSFET & IGBT Gate Driver Circuit Design (comprehensive modern tutorial on MOSFET/IGBT gate drivers covering isolated drivers and high-side switching)",
        "https://www.youtube.com/watch?v=45zMW6TYpnA - Power Electronics (Converter Control) Full Course (complete power electronics course covering topologies, control, modeling, and design procedures)",
        "https://www.youtube.com/watch?v=72zg95m_z4L8 - MOSFET GATE-DRIVE CIRCUIT Design - Altium Tutorial (practical PCB design tutorial showing layout best practices, trace routing, thermal via placement, EMI reduction)",
        "https://www.mathworks.com/videos/motor-control-with-embedded-coder-for-microchip-mcus-1488570451176.html - Motor Control with Embedded Coder (tutorial on deploying FOC algorithms to real microcontrollers for EV motor control)"
      ],
      "websites": [
        "https://www.analog.com/en/resources/app-notes/an-2579.html - The Design of the Inverting Buck/Boost Converter (comprehensive design procedure with equations, schematics, simulations for buck/boost converters)",
        "https://www.analog.com/en/resources/technical-articles/dc-to-dc-buck-converter-tutorial.html - DC to DC Buck Converter Tutorial & Diagram (foundational tutorial on buck converter design with practical circuit examples)",
        "https://www.monolithicpower.com/en/learning/mpscholar/power-electronics/dc-dc-converters/buck-boost-converters - Buck-Boost Converters (technical explanation of buck-boost operation in both modes with control methodology)",
        "https://www.monolithicpower.com/en/learning/mpscholar/electric-motors/motor-control-and-drive-electronics/basics-of-motor-contro - Basics of Motor Control Circuits (overview of 3-phase inverter topology, PWM generation, Hall sensor interfacing)",
        "http://www.monolithicpower.com/learning/resources/how-to-design-a-battery-management-system-bms - How to Design a Battery Management System (complete BMS architecture covering analog front-end, fuel gauge, SOC/SOH estimation)",
        "https://mechtex.com/blog/bldc-motor-driver-circuit-design - BLDC Motor Driver Circuit Design (detailed explanation of BLDC driver components: power supply, switching devices, gate drivers, control unit)",
        "https://arshon.com/blog/complete-guide-to-bldc-motor-controller-circuit-diagrams-and-design/ - Complete Guide to BLDC Motor Controller Circuits (comprehensive guide with circuit diagrams, three-phase topology, practical PCB tips)",
        "https://www.exro.com/industry-insights/ev-power-electronics-explained - EV Power Electronics: Purpose of Key Components (industry overview of traction inverter, DC-DC, OBC, BMS, power distribution)",
        "https://www.vicorpower.com/resource-library/articles/high-performance-computing/pcb-layout-and-thermal-design-for-high-density-m - PCB Layout and Thermal Design for High-Density Power (professional technical article on thermal zones, power delivery networks, high-current routing)",
        "https://www.protoexpress.com/blog/pcb-layout-design-tips-for-power-electronics/ - 7 PCB Layout Design Tips for Power Electronics (practical guidelines for component placement, thermal vias, copper planes, trace routing, EMI mitigation)",
        "https://www.pcbway.com/blog/PCB_Design_Layout/Thermal_Management_Design_Considerations_in_PCB_Layout_4a39efd9.html - PCB Layout Thermal Management Design (comprehensive guide on thermal management in PCB design for high-power circuits)",
        "https://www.allaboutcircuits.com/video-tutorials/op-amps-low-pass-and-high-pass-active-filters/ - Op-Amps as Low-Pass and High-Pass Active Filters (video tutorial on designing high-performance active filters using op-amps)",
        "https://www.instructables.com/Op-amp-Basics/ - Op-amp Basics (hands-on tutorial covering op-amp fundamentals, buffers, amplifiers, passive and active filter design)",
        "https://oxeltech.de/analog-filters-design-guide/ - Your Ultimate Guide to Designing Analog Filters (comprehensive filter design guide covering passive and active filters)",
        "https://www.wonderfulpcb.com/blog/main-module-pcb-in-electric-vehicles-battery-motor-safety/ - PCB in Electric Vehicles (overview of PCB applications in EVs with emphasis on high-current design and thermal management)",
        "https://www.pcbonline.com/blog/automotive-bms.html - Automotive Battery Management System PCBs (technical overview of BMS PCB design requirements including isolation, precision sensing, and IATF compliance)"
      ],
      "tools": [
        "LTspice (Free) - Industry-standard SPICE simulator for circuit analysis, transient simulation, frequency response, and thermal analysis - https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html",
        "MATLAB/Simulink with Simscape Power Systems - Advanced modeling environment for power electronics design including converter topologies - https://www.mathworks.com/products/simulink.html",
        "Altium Designer - Professional PCB design tool with high-speed and power electronics libraries, industry standard for automotive design - https://www.altium.com/",
        "KiCAD (Free) - Open-source PCB design suite suitable for educational and professional projects - https://www.kicad.org/",
        "Analog Devices WEBENCH Design Tool (Free) - Online design tool for power converters and analog circuits - https://webench.analog.com/",
        "Texas Instruments WEBENCH (Free) - Online design environment for TI components with extensive automotive-qualified library - https://webench.ti.com/",
        "Thermal Analysis Software (FLIR, FloTHERM) - Tools for detailed thermal simulation and PCB temperature prediction - https://www.ansys.com/",
        "dsPIC Development Kits (Microchip) - Real-time embedded control platforms with integrated gate driver and PWM peripherals - https://www.microchip.com/"
      ]
    }
  }
}

,
  {
  "id": "ee-115-electromagnetics-applications",
  "code": "EE 115",
  "name": "Electromagnetics and Applications",
  "fullName": "EE 115: Electromagnetics and Applications",
  "description": "Comprehensive study of classical electromagnetism via Maxwell's equations, Faraday's law, and vector calculus. Covers electric and magnetic fields, electromagnetic induction, and practical applications critical to electric motor design, wireless charging systems, and power conversion in EVs.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric vehicles are fundamentally electromagnetic machines. EE 115 teaches you Maxwell's equations—the mathematical foundation describing how electric currents create magnetic fields and how changing magnetic fields induce electric fields. Faraday's law, in particular, is the physics behind EV motor operation: rotating magnets in the stator create a changing magnetic flux that induces current in the rotor windings, producing torque. You'll also learn electromagnetic field simulation techniques (JMAG, ANSYS Maxwell) used by Tesla, BMW, and Hyundai to optimize motor efficiency, minimize torque ripple, and predict thermal behavior. Future EV charging may use inductive wireless power transfer—also governed by these same electromagnetic principles. In short, mastering this course means understanding the physics that transforms battery voltage into wheel torque.",
    "realWorldApplications": [
      "Permanent Magnet Synchronous Motor (PMSM) design used in 80%+ of modern EVs—Faraday's law explains back-EMF and torque generation",
      "AC induction motor operation in select EVs; asynchronous design reduces back-EMF drag during coasting via frequency control",
      "Reluctance motor hybrids combining permanent magnet + electromagnetic reluctance torque for extended high-speed operation",
      "Torque ripple and cogging torque minimization via electromagnetic analysis—stator skew and magnet geometry optimization ensures smooth acceleration",
      "Motor efficiency optimization using finite element (FE) simulation to predict magnetic field distribution, iron losses, and thermal hot spots",
      "Wireless inductive charging systems (future 800V platforms) leveraging Faraday's law and inductive coupling between transmit/receive coils",
      "Electromagnetic interference (EMI) mitigation in high-voltage EV power electronics through field shielding design",
      "Multiphysics motor design coupling electromagnetic analysis with thermal and structural FEA for integrated performance optimization"
    ],
    "learningOutcomes": [
      "Master vector calculus operators (gradient, divergence, curl) and apply them to electromagnetic field problems",
      "Understand and apply Maxwell's four equations in integral and differential forms to solve real electromagnetic problems",
      "Analyze electric fields using Coulomb's law, Gauss's law, and electric potential; calculate capacitance in complex geometries",
      "Analyze magnetic fields using Ampere's law and Faraday's law; predict induced EMF and magnetic flux distribution",
      "Apply Faraday's law of electromagnetic induction to motor and generator operation; understand back-EMF and torque generation",
      "Design and optimize AC/DC electromagnets for actuation and control applications",
      "Use electromagnetic field simulation software (JMAG, ANSYS Maxwell, Simcenter) to model motor magnetic fields and predict performance",
      "Analyze torque ripple, cogging torque, and harmonic effects in electric motors using advanced field computation techniques",
      "Understand wireless inductive power transfer systems and design coupled-coil systems for energy transfer",
      "Apply electromagnetic principles to motor design optimization for efficiency, torque quality, and thermal performance in EV powertrains"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=5yvpsftAZP4 - Maxwell's Equations Part 1: Gauss's Law for the Electric Field (Professor Dave Explains)",
        "https://www.youtube.com/watch?v=HL2vLaLsdTY - Maxwell's Equations And Electromagnetic Theory: A Beginners Guide",
        "https://www.youtube.com/watch?v=F3QHUvr8d8I - Maxwell's Equations - The Ultimate Beginner's Guide (Up and Atom)",
        "https://www.youtube.com/watch?v=HmBvWgK7fsQ - Faraday's Law – Understanding Electromagnetic Induction PART 1 (detailed derivation, ~13 min)",
        "https://www.youtube.com/watch?v=LDOa7UdfcMQ - Faraday's Law of Electromagnetic Induction, Magnetic (11 min intro with examples)",
        "https://www.youtube.com/watch?v=jz92oOkJFNA - Faraday's & Lenz's Law of Electromagnetic Induction, Induced EMF (102 min comprehensive)",
        "https://www.youtube.com/watch?v=0o7K-4LipbM - What Is Faraday's Law of Induction? | Physics (clear 5 min summary)",
        "https://www.youtube.com/watch?v=104 - Advancing Electric Motor Design and Simulation (Adrian Perregaux, Siemens Simcenter, 36 min on EV motor optimization)",
        "https://www.youtube.com/watch?v=107 - Electric Motor Design (Engineering TV - fundamentals explainer)",
        "https://www.youtube.com/watch?v=110 - How does an Electric Motor work? (DC Motor) (clear physics explanation)",
        "https://www.youtube.com/watch?v=113 - Design of Electric Motors, Generators, and Drive Systems (MIT - Steven Leeb, 7 min demo)",
        "https://www.youtube.com/watch?v=108 - JMAG Force/Loss Computation (POWERSYS, 13 min on motor performance prediction for EVs)",
        "https://www.youtube.com/watch?v=105 - Challenges and Advances in Simulation of Axial Flux Machines (POWERSYS, 31 min on high-speed EV traction motors)",
        "https://www.youtube.com/watch?v=118 - Vector Calculus for Electromagnetism 13: The Curl of a Vector Field (mathematical foundations)",
        "https://www.youtube.com/watch?v=124 - Vector Calculus for Electromagnetism 27: Divergence of the Curl"
      ],
      "websites": [
        "https://www.keysight.com/used/us/en/knowledge/guides/maxwells-equation - The Essential Guide to Maxwell's Equations for EMC/EMI Testing",
        "https://uk.mathworks.com/videos/developing-detailed-motor-model-for-electromagnetic-and-thermal-analysis-1694788202120.html - MathWorks: Developing Detailed Motor Model for Electromagnetic and Thermal Analysis",
        "https://www.linkedin.com/posts/jmag-international_jmag-motor-spm-activity-7337988121189412864-N_cw - JMAG: How to Analyze Demagnetization in Motors",
        "https://engineering.esteco.com/blog/how-design-optimization-enhances-ev-performance/ - How Design Optimization Enhances EV Performance (JMAG + modeFRONTIER)",
        "https://www.electricmotorengineering.com/how-to-design-electric-motors/ - How to Design Electric Motors (multiphysics approach for EVs)",
        "https://hypercraftusa.com/understanding-how-ev-motors-work/ - Understanding How EV Motors Work (Hypercraft - architecture overview)",
        "https://electricityforum.com/news/ev-motors - Electric Cars 101: How EV Motors Work (motor types: PMSM, induction, reluctance)",
        "https://www.eigenengineering.com/electric-car-engine-the-future-of-automotive-power/ - Inside the Electric Car Engine: The Future of Automotive Power",
        "https://www.laird.com/knowledge-center/inductive-wireless-charging - Inductive/Wireless Charging (Laird Technologies)",
        "https://kewlabstech.com/wireless-charging-technology/how-does-invisible-wireless-charging-work-an-in-depth-tech-guide/ - How Does Invisible Wireless Charging Work?",
        "https://www.nemko.com/blog/wireless-power-transfer - Wireless Power Transfer: What It Is, How It Works, and Why It Matters",
        "https://airfuel.org/how-wireless-charging-works/ - How Wireless Charging Works (AirFuel Alliance)",
        "https://enteknograte.com/ansys-maxwell-low-frequency-electromagnetic-simulation-electric-machines/ - ANSYS Maxwell: Low-Frequency EM Simulation for Electric Machines",
        "https://calcworkshop.com/vector-calculus/curl-and-divergence/ - Curl And Divergence: Step-by-Step Examples",
        "https://tutorial.math.lamar.edu/classes/calciii/curldivergence.aspx - Calculus III: Curl and Divergence (Paul's Online Math Notes)",
        "https://catalog.ucmerced.edu - UC Merced Course Catalog (official course information)"
      ],
      "tools": [
        "JMAG-Designer (free trial available) - Industry-standard electromagnetic field solver for electric motor design - https://www.jmag-international.com",
        "ANSYS Maxwell - Professional EM field solver integrated with thermal/mechanical analysis - https://www.ansys.com",
        "Siemens Simcenter (Simcenter MotorSolve, Simcenter e-machine design) - Specialized motor design suite - https://www.plm.automation.siemens.com",
        "MATLAB/Simulink - Multiphysics modeling and motor control design - https://www.mathworks.com",
        "LTSpice - Circuit/device simulation (supplementary tool) - https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator",
        "Finite Element Analysis (FEA) software - Open-source alternatives: FEniCS, OpenFOAM (for advanced students)",
        "Mathematica/Wolfram Language - Symbolic mathematics and vector calculus",
        "Python libraries: NumPy, SciPy, Matplotlib - Numerical electromagnetics simulations and visualization"
      ]
    }
  }
}
,
  {
  "id": "ee-122-introduction-to-control-systems",
  "code": "EE 122",
  "name": "Introduction to Control Systems",
  "fullName": "EE 122: Introduction to Control Systems",
  "description": "Foundational course for all EV engineers. Control systems are the intelligent feedback mechanisms that manage every critical EV function: motor speed regulation, battery thermal management, charging optimization, and regenerative braking. Master transfer functions, PID controller design, state-space methods, and modern techniques like Model Predictive Control and feedback linearization. Learn to design stable, efficient, and safe closed-loop systems that power real electric vehicles.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Control systems engineering is central to every aspect of electric vehicle operation. While EE 102 taught signal processing theory and EE 111 taught circuit implementation, EE 122 teaches the control algorithms and feedback mechanisms that coordinate these systems into a unified, intelligent vehicle. EV engineers use control theory daily: designing the PI controllers for motor speed tracking, the MPC algorithms for battery thermal management, the adaptive controllers that handle changing driving conditions. Modern EVs contain dozens of independent feedback control loops, each requiring careful stability analysis and performance optimization. This course provides both classical techniques (transfer functions, PID tuning, root locus) and modern approaches (state-space design, feedback linearization, Model Predictive Control) essential for designing next-generation EV control systems.",
    "realWorldApplications": [
      "Motor speed and torque control: PID/PI cascaded loops for smooth traction motor operation across driving conditions",
      "Battery thermal management: Model Predictive Control to maintain optimal temperature range and extend battery life",
      "Regenerative braking energy recovery: Feedback control to optimize power flowing back to battery during deceleration",
      "DC-DC converter output voltage regulation: Maintaining stable auxiliary power buses (48V, 12V) with feedback control loops",
      "Charging control optimization: Adaptive PID controllers to manage charging rates while protecting battery health",
      "Vehicle stability systems: Feedback control for ABS, traction control, and electronic stability control (ESC)",
      "Hybrid powertrain management: Model reference adaptive control for optimal power split between engine and motor",
      "Active suspension systems: PID control for ride comfort improvement (demonstrated 30%+ acceleration reduction)",
      "Autonomous driving: Trajectory tracking and path-following control for vehicle lateral and longitudinal dynamics",
      "Thermal comfort systems: HVAC system control with energy efficiency optimization"
    ],
    "learningOutcomes": [
      "Represent control systems using transfer functions and analyze stability using pole-zero plots, Routh-Hurwitz criterion",
      "Design PID controllers using both classical methods (Ziegler-Nichols) and modern automated tuning techniques",
      "Perform frequency-domain analysis using Bode plots and Nyquist diagrams to verify system stability margins",
      "Apply state-space methods and pole placement techniques for controller design on multi-state systems",
      "Understand feedback linearization: converting nonlinear systems to linear form for controller design (critical for motor control)",
      "Design Model Predictive Control systems for constrained multi-variable optimization problems (battery thermal management)",
      "Analyze system performance: rise time, settling time, overshoot, steady-state error, and robustness to disturbances",
      "Implement discrete-time digital controllers on embedded platforms with sampling, quantization, and computational constraints",
      "Apply adaptive control techniques for systems with parameter variations (motor temperature changes, battery aging)"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=wKMUrhlkExw - MIT Electronic Feedback Systems - 4. Stability (1985 classic by James K. Roberge on closed-loop stability, root locus, forward/feedback path analysis)",
        "https://www.youtube.com/watch?v=IB1Ir4oCP5k - How to Tune a PID Controller (20-min practical PID parameter tuning, incremental methodology, oscillation suppression)",
        "https://www.youtube.com/watch?v=9vZSw_xzC9E - Ziegler & Nichols Tuning Rules - Design Examples (complete both Ziegler-Nichols methods with worked examples, industry-standard for rapid PID design)",
        "https://www.youtube.com/watch?v=1awN6eEzBNg - Transfer Functions in Control Systems (comprehensive intro to transfer function representation, Laplace transform, pole-zero analysis, frequency response)",
        "https://www.youtube.com/watch?v=L_-Aup3_ibM - Stability from Transfer Function Analysis (2019 lecture on determining stability from transfer function poles, marginal stability, Routh-Hurwitz testing)",
        "https://www.youtube.com/watch?v=IcH67mRxzLY - Ziegler & Nichols Tuning (Open-Loop Method) (70-min comprehensive tutorial covering process reaction curve method with analog and digital PID design)",
        "https://www.youtube.com/watch?v=Cxc8avJNMG8 - Feedback Linearization - Motivation and Basic Concept (19-min intro to feedback linearization for nonlinear systems, algebraic conversion to linear form)",
        "https://www.youtube.com/watch?v=ECqr0oUfZz4 - Input-State Linearization | Nonlinear Control Systems (complete feedback linearization techniques, state variable transformation, control law derivation)",
        "https://www.youtube.com/watch?v=UwuPH4lpOwI - Easy Introduction to Feedback Linearization (accessible explanation of feedback linearization with MATLAB/Simulink implementation examples)",
        "https://www.youtube.com/watch?v=uqjKG32AkC4 - Introduction to System Stability and Control (comprehensive foundation course on control theory fundamentals, system modeling, stability, basic design)",
        "https://www.youtube.com/watch?v=qj8vTO1eIHo - Manual and Automatic PID Tuning Methods (advanced tutorial comparing loop shaping, pole placement, and automatic MATLAB PID Tuning App)",
        "https://www.youtube.com/watch?v=9jO9q4jZrSI - Linearization of State Space Models (technical lecture on linearizing nonlinear state-space models around operating points)"
      ],
      "websites": [
        "https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlPID - Introduction: PID Controller Design (interactive tutorial with MATLAB examples for PID design guidelines)",
        "https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlStateSpace - Introduction: State-Space Methods (comprehensive guide to state-space representation and controller design via pole placement)",
        "https://news.pcim.mesago.com/how-pid-control-developments-are-improving-ev-power-performance-a-7aa35e29602cb9de5956488840bfc51d/ - How PID Control Developments are Improving EV Power Performance (industry perspective on fuzzy logic, fractional-order PID, AI integration)",
        "https://onlinelibrary.wiley.com/doi/10.1155/2018/6259049 - PID Control for Electric Vehicles Subject to Constraints (academic paper on constrained PID for EV DC motors with physical limits)",
        "https://onlinelibrary.wiley.com/doi/abs/10.1002/ente.202301205 - Model Predictive Control of Battery Thermal Management (research comparing MPC vs. PID with 35% faster response, 28% lower energy consumption)",
        "https://www.diva-portal.org/smash/get/diva2:1569330/FULLTEXT01.pdf - Modeling and Model Predictive Climate Control for EV (thesis on MPC for battery, power electronics, cabin thermal systems)",
        "https://arxiv.org/html/2510.18420v1 - Sliding-Mode Control Strategies for PMSM Speed Control (advanced nonlinear control technique for robust motor speed regulation)",
        "https://www.frontiersin.org/journals/mechanical-engineering/articles/10.3389/fmech.2025.1715466/full - Motor Automation Speed Regulation with Sliding Mode Control (practical implementation with 5.77% max speed error vs. 8% standard)",
        "https://www.nature.com/articles/s41598-025-29445-w - Dual-Loop Sliding Mode/MPC Control for BLDC Motor (state-of-the-art hybrid control achieving 28.57% torque ripple reduction and 96.47% efficiency)",
        "https://www.jscimedcentral.com/jounal-article-info/JSM-Computer-Science-and-Engineering/Adaptive-Control-Mechanisms-for-Electric- - Adaptive Control Mechanisms for Electric Vehicles (overview of adaptive controllers maintaining performance despite changing conditions)",
        "https://www.extrica.com/article/24545 - Evaluation of PID Active Suspension Control for EV (research on 31% vertical acceleration reduction with PID tuning)",
        "https://pulseenergy.io/blog/ev-control-system - EV Control System - Comprehensive Guide (industry overview of complete EV control architecture with coordinated feedback loops)",
        "https://www.gtake.com/industry-news/understanding-electric-vehicle-motor-controllers/ - Understanding Electric Vehicle Motor Controllers (practical explanation of motor controller operation and regenerative braking)",
        "https://chrismi.sdsu.edu/publications/133.pdf - Model Reference Adaptive Control for Hybrid Electric Vehicles (advanced MRAC for managing power between engine and motor)",
        "https://journals.sagepub.com/doi/abs/10.1177/09596518231188496 - Robust Adaptive Control for HEVs using Sliding Mode Control (research on robust adaptive control for transient coupling in hybrid powertrains)"
      ],
      "tools": [
        "MATLAB Control System Toolbox - Industry-standard for transfer function analysis, PID design, pole placement, Bode/Nyquist plots, and stability verification - https://www.mathworks.com/products/control.html",
        "MATLAB Model Predictive Control Toolbox - Specialized tool for designing and tuning MPC controllers for constrained multi-variable systems - https://www.mathworks.com/products/mpc.html",
        "MATLAB/Simulink - Complete modeling and simulation environment with automatic code generation for embedded systems - https://www.mathworks.com/products/simulink.html",
        "Python Control Library - Open-source Python package for classical and modern control system analysis (free alternative for learning) - https://python-control.readthedocs.io/",
        "dSPACE Real-Time Simulation & HIL Systems - Professional hardware-in-loop platform for testing control algorithms on real-time hardware - https://www.dspace.com/",
        "Speedgoat Real-Time Target Machines - Alternative HIL platform for rapid prototyping integrated with MATLAB/Simulink - https://www.speedgoat.com/",
        "Scilab - Open-source alternative to MATLAB with control system capabilities (free option for academic projects) - https://www.scilab.org/",
        "JMAAB Code Generation Standards - Standards for generating embedded control code from Simulink models for automotive ISO 26262 compliance - https://www.jmaab.org/"
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
  "description": "Comprehensive study of motors and generators—DC, AC induction, permanent magnet synchronous, and brushless designs. Covers motor construction, performance characteristics, thermal management, and advanced control techniques critical to EV traction motor design and operation.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric vehicles are built on electric motors, and EE 130 is where you learn their physics and control. You'll study permanent magnet synchronous motors (PMSM)—used in 80%+ of modern EVs because they deliver high torque from standstill and operate at 94-97% efficiency. You'll learn field-oriented control (FOC), the algorithm that enables instant torque response during acceleration, precise traction control, and seamless regenerative braking. You'll also understand motor performance curves (speed vs. torque vs. efficiency), thermal management strategies for keeping motors cool under extreme conditions, and design optimization techniques. Tesla, BMW, and Hyundai all employ these exact principles to push EV performance. Mastering this course means understanding the electric motor that replaces the internal combustion engine.",
    "realWorldApplications": [
      "Permanent magnet synchronous motor (PMSM) design and optimization—80%+ of modern EVs including Tesla Model 3/S/X, BMW iX/i7, Hyundai Ioniq 6/EV9",
      "Three-phase AC induction motor operation used in select EVs for high-speed efficiency and lower cogging torque during coasting",
      "Brushless DC (BLDC) motor control via six-step commutation and trapezoidal waveforms for less complex inverter designs",
      "Field-oriented control (FOC) algorithm implementation enabling independent torque and flux control—critical for instant 0-60 acceleration",
      "Motor efficiency mapping and optimization—keeping motors operating in peak efficiency zones to maximize EV range",
      "Thermal management system design—liquid cooling, thermal interface materials (TIMs), and heat sink optimization for high-power traction motors",
      "Regenerative braking control—reversing motor operation to recover kinetic energy during deceleration back into battery",
      "Advanced torque management for traction control, vehicle stability, and cornering—precise inverter adjustment at millisecond timescales",
      "Field weakening techniques for extended speed range, enabling highway cruising above base motor frequency",
      "Motor performance characterization via speed-torque curves, current-torque relationships, and efficiency maps for system design"
    ],
    "learningOutcomes": [
      "Understand DC motor operation, construction, and control; explain principles of commutation and torque generation",
      "Analyze three-phase AC induction motor operation using rotating magnetic field concept and slip calculations",
      "Compare motor types (DC, AC induction, PMSM, BLDC) and select appropriate motor for EV traction applications",
      "Understand permanent magnet synchronous motor (PMSM) construction and synchronous operation—why PMSMs dominate EV market",
      "Understand brushless DC motor commutation, Hall sensor sequencing, and electronic switch timing",
      "Design and interpret motor speed-torque curves; identify operating points for optimal efficiency",
      "Understand field-oriented control (FOC) theory: Clarke/Park transforms, d-q axis decoupling, and torque production",
      "Implement PWM and commutation control strategies to drive motor inverters via gate signals",
      "Analyze motor losses (copper, iron, windage) and design thermal management systems for continuous high-power operation",
      "Apply space vector modulation and field-weakening techniques to extend motor speed range in EVs",
      "Integrate motor control with regenerative braking to recover energy during deceleration",
      "Optimize motor performance via duty cycle analysis, multi-speed transmission concepts, and advanced control algorithms"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=59HBoIXzX_c - How Electric Motors Work - 3 phase AC induction motors (7 min fundamental overview)",
        "https://www.youtube.com/watch?v=Vqi0pZ3WZLo - PMSM WORKING PRINCIPLE (3D animation, 5 min intuitive explanation)",
        "https://www.youtube.com/watch?v=7nXUDc9pv1E - How Electric Car Motors Work | PMSM vs Induction Motor Explained (8 min direct EV comparison)",
        "https://www.youtube.com/watch?v=j-r6mYBgCro - Permanent Magnet Synchronous Motor (PMSM) (33 min comprehensive tutorial by Vimal Ojha)",
        "https://www.youtube.com/watch?v=hXz93OYCAMc - Permanent Magnet Synchronous Motors (PMSMs) Explained (7 min advantages for EVs)",
        "https://www.youtube.com/watch?v=tnSGsq8GaC4 - Permanent Magnet Synchronous Motor (PMSM)-Overview, Wiring, Performance (3 min practical intro)",
        "https://www.youtube.com/watch?v=YPD1_rcXBIE - Understanding Field-Oriented Control | Motor Control, Part 4 (10 min - MathWorks official)",
        "https://www.youtube.com/watch?v=tnSGsq8GaC4 - Permanent Magnet Synchronous Motor (PMSM) modelling and control (12 min EngiMix FOC + SVM tutorial)",
        "https://www.youtube.com/watch?v=WYJWdMV3YMs - Understanding Six-step Commutation for BLDC motors (9 min MathWorks trapezoidal control)",
        "https://www.youtube.com/watch?v=43JMIuwVrY4 - Brushless DC motor animation (42 sec visual, Hall sensors, commutation sequence)",
        "https://www.youtube.com/watch?v=hVD8J4ldDyI - Groschopp Tech Tips | How Brushless DC Motors Commutate (3 min quickstart)",
        "https://www.youtube.com/watch?v=nVu4FXsKVrs - Manual Commutation of a Motor with a Brushless Servo Drive (5 min practical Hall sensor testing)"
      ],
      "websites": [
        "https://www.apdevice.com/wp-content/uploads/2024/10/Fundamentals-and-Driving-of-Motors.pdf - Fundamentals and Driving of Motors (PMSM vs BLDC vs Induction comparison)",
        "https://www.nema.org/docs/default-source/motor-and-generator-guides-and-resources-library/1-fundamentals-of-electric-motors-v2.pdf - NEMA: Fundamentals of Electric Motors",
        "https://www.hpacademy.com/blog/advanced-torque-management-in-evs/ - Advanced Torque Management in EVs (real-time torque control explanation)",
        "https://chargedevs.com/features/how-to-improve-ev-traction-motor-efficiency/ - How to Improve EV Traction Motor Efficiency (multi-speed transmission benefits, 94-97% PMSM efficiency)",
        "https://inetictraction.com/comparison-induction-vs-pm-motors-for-evs/ - Comparison: Induction vs PM Motors for EVs (efficiency, torque density, coasting losses)",
        "https://www.emobility-engineering.com/electric-motor-control-ev-efficiency/ - Electric Motor Control: Boosting EV Efficiency (PWM, FOC, SiC/GaN switching, vector drives)",
        "https://imperix.com/doc/implementation/field-oriented-control-of-pmsm - Field Oriented Control of PMSM (technical reference with experimental results)",
        "https://www.tdk.com/en/featured_stories/entry_065-motor-controller.html - The Vital Role of Thermal Management (EV motor cooling strategies, heat pump integration)",
        "https://www.emobility-engineering.com/thermal-management-in-electric-vehicles-e-motor-cooling-technology/ - Thermal Management in EVs (liquid cooling, oil circulation, thermal interface materials)",
        "https://www.sciencedirect.com/science/article/abs/pii/S1364032123007323 - Thermal Management Strategies and Power Ratings of EV Motors (75% of failures in stator windings)",
        "https://electrical-engineering-portal.com/construction-of-3-phase-ac-induction-motors - Basic Construction of 3-Phase AC Induction Motors",
        "https://www.geeksforgeeks.org/electrical-engineering/three-phase-induction-motor/ - 3 Phase Induction Motor (GeeksforGeeks, rotating magnetic field principle)",
        "https://www.mathworks.com/help/mcb/gs/implement-motor-speed-control-by-using-field-oriented-control-foc.html - Field-Oriented Control (FOC) - MATLAB & Simulink",
        "https://motioncontroltips.com - Motion Control Tips (brushless motor control, commutation techniques)",
        "https://catalog.ucmerced.edu - UC Merced Course Catalog (official course information)"
      ],
      "tools": [
        "MATLAB/Simulink Motor Control Toolbox - Industry-standard for FOC algorithm design and simulation - https://www.mathworks.com/products/motor.html",
        "NXP/TI Motor Control Development Kits - Real-time motor control prototyping and gate signal generation - https://www.nxp.com or https://www.ti.com",
        "Simulink Motor Control Blockset - Pre-built FOC, Clarke/Park transforms, PWM modulators - https://www.mathworks.com",
        "JMAG-Designer - EM field simulation for motor design optimization and efficiency prediction - https://www.jmag-international.com",
        "ANSYS Motor-CAD - Thermal + electromagnetic motor simulation - https://www.ansys.com",
        "LTSpice - Circuit/inverter control simulation - https://www.analog.com",
        "Python libraries: NumPy, SciPy, Matplotlib - Motor curve analysis and control algorithm development",
        "Motor test benches (with dynamometer) - Experimental motor characterization, efficiency mapping, thermal testing",
        "Oscilloscope + current clamps - Measuring motor phase currents, back-EMF, and switching signals"
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
  "description": "The engineering discipline that powers electric vehicles. Power electronics teaches the design and implementation of converters, inverters, and rectifiers that transform electrical energy in EVs: battery voltage (400V/800V) to motor drive currents, AC charging power to battery-compatible DC, and managing megawatts of power with minimal loss and heat. Master topologies, semiconductor devices (MOSFETs, IGBTs, SiC, GaN), modulation techniques, thermal management, and control integration essential for every EV subsystem from traction drives to on-board chargers.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Power electronics is the hardware implementation layer that brings EV control systems to life. While EE 102, 111, and 122 developed the theoretical and circuit foundations, EE 131 teaches how to actually convert and regulate power at the scales required for electric vehicles: 50-200 kW traction inverters, high-efficiency on-board chargers, DC-DC converters managing multiple voltage domains. Modern EVs require deep power electronics expertise: designing traction inverters with 3X higher power density than previous generations, leveraging emerging SiC/GaN semiconductors to reduce size and weight, implementing thermal management strategies to maintain reliability under continuous duty. EV engineers spend their careers optimizing these power conversion stages—small efficiency gains translate directly to extended vehicle range, reduced cooling costs, and faster charging. This course provides both classical techniques (PWM, SVM, thermal design) and modern approaches (multi-level topologies, wide-bandgap semiconductors, integrated systems) essential for competitive EV development.",
    "realWorldApplications": [
      "Traction inverter design: 3-phase PWM converter transforming 400V/800V battery DC to AC motor drive (50-200+ kW)",
      "On-board charger (OBC) architecture: Power factor correction stage + isolated DC-DC converter for safe battery charging (3.6-22 kW)",
      "SiC MOSFET implementation: 50% lower conduction losses and 3X improved power density enabling next-generation EV designs",
      "Active power factor correction (PFC): Boost converter topology achieving >0.99 PF for regulatory compliance in EV charging",
      "Regenerative braking energy recovery: Bi-directional buck-boost converter controlling power flow back to battery during deceleration",
      "Multi-level inverter topologies: 3-level and 5-level converters reducing voltage stress on motor insulation and EMI in 800V systems",
      "Thermal management and loss optimization: Calculating conduction/switching losses, designing cooling systems, predicting junction temperatures",
      "Space Vector Modulation (SVM): Advanced PWM technique delivering 15% efficiency gain over sinusoidal modulation",
      "DC-DC converter design: Isolated converters for auxiliary power supplies (48V, 12V busses) from high-voltage battery",
      "Integrated motor-inverter systems: Liquid-cooled designs achieving 15+ kW/L power density in compact drivetrain packages"
    ],
    "learningOutcomes": [
      "Understand AC power fundamentals: RMS values, peak voltages, real/reactive/apparent power, power factor, three-phase systems",
      "Design and analyze DC-DC converter topologies: buck, boost, buck-boost converters from first principles with component sizing",
      "Analyze single-phase rectifiers: uncontrolled (diode bridge) and controlled (thyristor) circuits with voltage/current ripple calculations",
      "Design three-phase inverter topologies: 6-step square-wave, PWM, Space Vector Modulation with harmonic analysis",
      "Select appropriate power semiconductor devices (MOSFET, IGBT, SiC, GaN) based on voltage/current/frequency requirements",
      "Design gate driver circuits with bootstrap capacitors, dead-time insertion, and protection mechanisms",
      "Perform thermal analysis: Calculate conduction and switching losses, predict junction temperatures, design cooling systems",
      "Design power factor correction circuits using active boost PFC topology for grid compliance",
      "Implement PWM modulation and control strategies for inverters: sinusoidal PWM, SVM, field-oriented integration",
      "Evaluate trade-offs in power electronics: efficiency vs. complexity, cost vs. performance, thermal vs. acoustic considerations"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=_friLNqKX4M - Three Phase Inverter with LC Filter (comprehensive 3-phase inverter topology design with LC output filter, transition from single-leg to 6-transistor bridge, PWM modulation)",
        "https://www.youtube.com/watch?v=lRoQB6ZfMwY - Merging SiC MOSFETs & IGBTs for EV Traction Inverters (industry perspective on hybrid 30% SiC + 70% Si approach achieving full-SiC efficiency at lower cost)",
        "https://www.youtube.com/watch?v=kCRctsLmJDo - 100 kW SiC Inverter for EV Traction Drive (Dr. Iqbal Husain NCSU research on planarized 100 kW design, thermal management, gate driver integration, state-of-the-art)",
        "https://www.youtube.com/watch?v=HbT_huAvL28 - 3 Phase Grid Link Inverter with dq Control (PSIM tutorial on 3-phase inverter with bi-directional power flow control, dq transformation, regenerative braking)",
        "https://www.youtube.com/watch?v=oiYqV6QcEgM - Three Phase Inverter MATLAB Modeling (step-by-step MATLAB/Simulink tutorial for complete 3-phase inverter modeling and design)",
        "https://www.youtube.com/watch?v=b3sf0CIpQZQ - Power Electronics Module 3 - Six Step Three Phase Inverter (detailed lecture on 6-step 120° conduction mode operation and harmonic content)",
        "https://www.youtube.com/watch?v=DccgEWSHH-U - Three-Phase Inverter with RL Load Step by Step (practical example of 3-phase inverter driving RL load with MATLAB verification)",
        "https://www.youtube.com/watch?v=NEWFIkoRBBo - Boost PFC - Complete Design and AC Analysis (40-min comprehensive tutorial on active PFC boost converter design and control loops)",
        "https://www.allaboutcircuits.com/technical-articles/how-the-boost-pfc-converter-circuit-improves-power-quality/ - How the Boost PFC Converter Circuit Improves Power Quality (technical explanation of boost PFC operation and PWM control)",
        "https://www.youtube.com/watch?v=z6nWiKGNh7A - LTSPICE Power PFC Boost Controller (practical circuit simulation of active PFC using LT1249 controller IC with waveform verification)",
        "https://www.youtube.com/watch?v=Xb8U4QvVq4Q - Driving SiC MOSFETs in Auxiliary Power Supplies (technical explanation of SiC gate drive challenges and solutions for high-frequency switching)",
        "https://www.powerelectronicsnews.com/gan-advances-ev-power-design/ - GaN Advances EV Power Design (industry overview of GaN technology for 400V and 800V inverters with improved efficiency and power density)"
      ],
      "websites": [
        "https://www.poweramericainstitute.org/wp-content/uploads/2017/04/ECCE16-SiC-EV-traction-drive_Final.pdf - Design Methodology for High Power Density EV Traction Inverter (technical paper on planarized 55 kW inverter achieving 12.1 kW/L power density, 3X improvement)",
        "https://www.danfoss.com/en-us/markets/automotive/dsp/electric-traction-inverter-hevev/ - Electric Traction Inverter (HEV/EV) (industry overview of separate vs. integrated inverter design, power density, thermal management)",
        "https://www.exro.com/industry-insights/what-is-a-traction-inverter - What Is a Traction Inverter? (practical explanation of traction inverter operation and importance in EV performance)",
        "https://www.ti.com/lit/slua963 - HEV/EV Traction Inverter Design Guide Using Isolated IGBT and SiC (comprehensive design guide for 3-phase 2-level inverter topology, component selection, protection)",
        "https://www.ti.com/lit/pdf/sszt070 - Reducing Power Loss and Thermal Dissipation in SiC Traction Inverters (technical paper on optimizing SiC gate drive design to minimize switching losses)",
        "https://aichiplink.com/blog/MOSFET-vs-IGBT-Choosing-the-Right-Power-Switch_517 - MOSFET vs IGBT: Choosing the Right Power Switch (comprehensive comparison showing why IGBTs dominate high-power applications, SiC MOSFETs gaining for EVs)",
        "https://www.dintek-semi.com/thermal-management-in-an-electric-vehicle-inverter-the-critical-role-of-mosfets/ - Thermal Management in EV Inverter: Critical Role of MOSFETs (deep dive into MOSFET thermal challenges and innovative cooling solutions)",
        "https://www.renesas.com/en/document/apn/igbt-loss-calculation - IGBT Loss Calculation (application note on calculating conduction and switching losses for thermal design)",
        "https://www.batterydesign.net/on-board-chargers-ac-to-dc/ - Electric Vehicle On Board Charger (overview of OBC architecture and PFC stage)",
        "https://recom-power.com/en/acdc-bok-chapter7-powerfactorcorrection.html - Chapter 7: Power Factor Correction (comprehensive tutorial on passive and active PFC techniques)",
        "https://chargedevs.com/features/a-closer-look-at-power-factor-correction/ - A Closer Look at Power Factor Correction (in-depth article on PFC challenges for EV chargers at various power levels)",
        "http://www.taiwansemi.com/en/blog-obc/ - Power Components for On-Board Chargers (overview of OBC component architecture for 3.6-22 kW chargers)",
        "https://navitassemi.com/psd-gan-drives-development-of-next-generation-evs/ - GaN Drives Development of Next-Generation EVs (industry perspective on GaN enabling four-wheel independent traction and in-wheel motors)",
        "https://www.powerelectronictips.com/how-sic-mosfets-and-si-igbts-boost-sustainability-in-green-energy-systems/ - How SiC MOSFETs and Si IGBTs Boost Sustainability (technical analysis of SiC advantages and three-level gate drive optimization)",
        "https://www.allaboutcircuits.com/news/infineon-expands-gate-drive-ics-for-ev-traction-inverters/ - Infineon Expands Gate Drive ICs for EV Traction Inverters (industry news on latest isolated gate drivers and component selection)"
      ],
      "tools": [
        "PSIM (Power Simulation) - Specialized power electronics simulation tool with extensive semiconductor models for rapid converter/inverter prototyping - https://powersimtech.com/",
        "MATLAB/Simulink with SimPowerSystems - General-purpose simulation environment with power electronics libraries and automatic code generation - https://www.mathworks.com/products/simulink.html",
        "LTspice (Free SPICE Simulator) - Free circuit simulator with extensive power electronics models for device-level analysis and verification - https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html",
        "PLECS (Piecewise Linear Electrical Circuit Simulation) - Fast power electronics simulator optimized for real-time applications and HIL testing - https://www.plexim.com/",
        "Cadence OrCAD/ADS for Power Electronics - Professional simulation tools with extensive device libraries for production-grade converter design - https://www.cadence.com/",
        "Thermal Design Tools (FloTHERM, COMSOL) - CFD and thermal analysis software for temperature distribution prediction in power electronics - https://www.ansys.com/",
        "dSPACE Real-Time Simulation - Hardware-in-Loop platform for real-time testing of inverter and converter control algorithms - https://www.dspace.com/",
        "TI WEBENCH Power Designer (Free) - Online design tool for DC-DC converters and power supply circuits with component selection - https://webench.ti.com/"
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
  "description": "Comprehensive study of microcontroller architecture, embedded systems design, assembly language, memory management, and real-time operating systems. Covers ARM processor families, CAN bus communication, and AUTOSAR automotive software standards essential for EV control systems and ECU development.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Every electric vehicle is controlled by embedded computers called Electronic Control Units (ECUs)—100+ of them in a modern EV. EE 140 teaches you how these systems work from the ground up. You'll learn ARM processor architecture, the dominant CPU platform powering 94% of global automakers including Tesla, BMW, and Hyundai. You'll write assembly language to directly control hardware, understand real-time operating systems (RTOS) that guarantee motor control executes within millisecond deadlines, and master CAN bus communication that lets ECUs talk to each other. You'll also study AUTOSAR, the automotive software standard that ALL major EV makers use for their Vehicle Control Units (VCUs) and battery management systems. This course is essentially learning the embedded brain of an electric vehicle.",
    "realWorldApplications": [
      "Vehicle Control Unit (VCU) architecture—central microcontroller managing 20+ critical EV functions including traction, battery management, thermal control, and regenerative braking",
      "ARM Cortex-M microcontrollers powering distributed ECUs: BMS (battery), inverter control, thermal management, charging systems, and auxiliary functions",
      "ARM Cortex-A high-performance processors enabling software-defined vehicles with AI, autonomous driving, advanced diagnostics, and over-the-air updates",
      "CAN bus network design and diagnostics—communication backbone connecting motor controller, battery management system, VCU, and infotainment at 500 kbit/s speeds",
      "Real-time operating system (RTOS) task scheduling ensuring motor control algorithms execute with guaranteed millisecond deadlines (hard real-time) while diagnostics run with relaxed timing",
      "AUTOSAR software architecture layering—standardized stack enabling hardware abstraction, allowing EV software to scale across different microcontroller suppliers (STMicroelectronics, NXP, etc.)",
      "Memory management in resource-constrained ECUs—efficient use of ROM, RAM, and flash storage for motor control algorithms, BMS state estimation, and diagnostic buffers",
      "Assembly language optimization for performance-critical motor control code paths—e.g., PWM timing, current sensing, and commutation algorithms",
      "Functional safety compliance (ISO 26262 ASIL ratings) using ARM Automotive Enhanced cores—ensuring safety-critical functions in EV power electronics never fail",
      "Multicore ECU design combining Cortex-A (application processing) + Cortex-R (real-time safety functions) on single chip—enables advanced autonomous driving + guaranteed safety"
    ],
    "learningOutcomes": [
      "Understand computer architecture fundamentals: instruction sets, registers, memory hierarchy (cache, RAM, flash), and CPU buses",
      "Compare ARM processor families: Cortex-A (high-performance), Cortex-R (real-time), Cortex-M (microcontroller) and understand automotive-specific variants (AE cores)",
      "Explain ARM Cortex-M microcontroller architecture including Nested Vector Interrupt Controller (NVIC), memory protection, and peripheral integration",
      "Write assembly language code for embedded systems using ARM instruction set (Thumb, UAL syntax); understand load/store operations and register manipulation",
      "Design and debug embedded systems at assembly level; use debuggers and understand CPU registers, program counter, and stack pointers",
      "Understand virtual memory concepts: paging, segmentation, and memory management units (MMUs) for protected memory access",
      "Design real-time operating systems (RTOS) task scheduling with preemptive scheduling, priority inheritance, and task state management",
      "Analyze RTOS scheduling algorithms: Rate Monotonic Scheduling (RMS), Earliest Deadline First (EDF), and Round Robin with Priority",
      "Understand and design CAN bus networks for automotive communication; parse CAN message frames, error handling, and multi-ECU architectures",
      "Apply AUTOSAR layered software architecture: distinguish application layer, Runtime Environment (RTE), and Basic Software (BSW) layers",
      "Implement communication stacks: CAN driver, LIN, FlexRay, and Ethernet in context of AUTOSAR compliance",
      "Design safety-critical embedded systems meeting ISO 26262 functional safety requirements using ARM safety-enhanced cores"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=f3mq7wlfw-M - ARM Architecture Explained: Everything You Need to Know | STM32 (20 min comprehensive STM32F4 tutorial with Cortex-M4 deep dive)",
        "https://www.youtube.com/watch?v=HJNWbRe0BQ4 - ARM Cortex M3 Architecture (17 min NVIC, memory protection, sleep modes, registers, operating modes)",
        "https://www.youtube.com/watch?v=f7ZsqRosELk - Tutorial 2: World of ARM & Cortex M Architecture (Cortex-A, Cortex-R, Cortex-M profiles for different applications)",
        "https://www.analog.com/en/resources/media-center/videos/6313216431112.html - Get to Know Arm Cortex-M4 Microcontroller Tutorial: Part 3 (power, memory, security features)",
        "https://www.youtube.com/watch?v=gfmRrPjnEw4 - Assembly Language Programming with ARM – Full Tutorial for Beginners (freeCodeCamp, 4+ hour comprehensive course)",
        "https://www.youtube.com/watch?v=EDd2262qnuA - Real-Time Operating Systems (RTOS) Explained for Beginners! (task states, scheduling algorithms, hard/soft/firm real-time)",
        "https://www.youtube.com/watch?v=mmAocku7u48 - CAN Bus in Vehicles: A Complete Guide to the Fundamentals (47 min deep dive on CAN protocol, automotive networks)",
        "https://www.youtube.com/watch?v=YbF3idCk4EQ - CAN Bus Communication Explained (Part 1) (diagnostics, serial gateway, multi-ECU troubleshooting)",
        "https://www.youtube.com/watch?v=WikQ5n1QXQs - CAN Protocol Explained | Controller Area Network (15 min theory overview)",
        "https://www.youtube.com/watch?v=PY1mOxnsOxc - A deep dive into the most important bus system (47 min inside EV Training with live oscilloscope CAN message analysis)",
        "https://kvaser.com/can-protocol-tutorial/ - Controller Area Network (CAN BUS) Protocol (free video course + technical tutorial)"
      ],
      "websites": [
        "https://www.allaboutcircuits.com/news/arm-unveils-largest-portfolio-automotive-processors/ - Arm Unveils Its Largest Portfolio of Automotive Processors (Automotive Enhanced AE lineup overview)",
        "https://aesin.org.uk/wp-content/uploads/2018/06/ARM-Processors-Drive-the-Pace-of-Automotive-Innovation.pdf - ARM Processors Driving the Pace of Automotive Innovation (Cortex-M, R cores across vehicle functions)",
        "https://www.exro.com/industry-insights/the-role-of-a-vehicle-control-unit - What is a Vehicle Control Unit? (VCU architecture, microcontroller role, CAN communication, ADC/DAC)",
        "https://www.amoriabond.com/insights/articles/what-role-do-embedded-systems-play-in-automotive-development-/ - What Role Do Embedded Systems Play in Automotive Development? (ECU, RTOS, sensor networks)",
        "https://www.sonatus.com/blog/building-on-arm-based-silicon-solutions-for-mixed-criticality-automotive-systems/ - Building on Arm Silicon Solutions for Mixed Criticality Automotive Systems (Cortex-A, Cortex-R coexistence)",
        "https://www.arm.com/markets/automotive - Automotive on Arm (94% of global automakers, software-defined vehicles)",
        "https://www.arm.com/markets/automotive/automotive-enhanced - Arm Automotive Enhanced Compute (high-performance, scalable platform with ISO 26262 safety)",
        "https://www.mikrocontroller.net/articles/ARM-ASM-Tutorial - ARM-ASM-Tutorial (practical assembly programming with development environment setup)",
        "https://newdigitalstreet.com/autosar-stack/ - What Is the AUTOSAR Stack? (modular architecture, standardized interfaces, scalability)",
        "https://www.autosar.org/standards/classic-platform - AUTOSAR Classic Platform (three software layers: application, RTE, basic software)",
        "https://www.nxp.com/design/design-center/software/automotive-software-and-tools/autosar:AUTOSAR-HOME - AUTOSAR® Software Architecture - NXP (AUTOSAR 4.3 with crypto stack, safety, security)",
        "https://www.lhpes.com/blog/understanding-autosars-basic-software-layer - Understanding AUTOSAR's Basic Software Layer (BSW: services, ECU abstraction, microcontroller abstraction)",
        "https://predictabledesigns.com/introduction-to-real-time-operating-systems-rtos-for-use-in-embedded-systems/ - Introduction to RTOS for Embedded Systems (preemptive scheduling, task prioritization, real-time guarantees)",
        "https://embedded-academy.com/de/courses/real-time-operating-system-en/ - Real-Time Operating System RTOS: Overview (soft vs hard real-time, timing analysis)",
        "https://en.wikipedia.org/wiki/Electronic_control_unit - Electronic Control Unit (Wikipedia overview of ECU types: ECM, PCM, TCM, BCM, etc.)",
        "https://www.st.com/en/automotive-microcontrollers.html - Automotive Microcontrollers (MCU) - STMicroelectronics (SPC5 family Power Architecture, automotive portfolio)",
        "https://resources.sw.siemens.com/en-US/white-paper-electric-vehicle-embedded-software-development/ - EV Embedded Software Development Solution (ASIL, AUTOSAR, multicore challenges)",
        "https://catalog.ucmerced.edu - UC Merced Course Catalog (official course information)"
      ],
      "tools": [
        "ARM Development Tools: GNU Arm Embedded Toolchain (open-source, includes assembler, compiler, debugger) - https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain",
        "STM32CubeIDE - Integrated development environment for STM32 microcontrollers - https://www.st.com/en/development-tools/stm32cubeide.html",
        "JLINK Debugger - Hardware debugger for ARM processors, real-time debugging - https://www.segger.com",
        "MATLAB/Simulink Embedded Coder - Code generation for microcontroller deployment",
        "CANoe by Vector - CAN bus network simulation and diagnostics - https://www.vector.com",
        "AUTOSAR tools: EBRO, ETAS ASCET, Simulink AUTOSAR Blockset",
        "JMAG-Designer - Electromagnetic simulation for motor control ECU design",
        "Real-time kernel/RTOS: FreeRTOS (open-source), SEGGER embOS, Keil RTX",
        "Memory analysis tools: Valgrind, Dr. Memory (for desktop simulation and debugging)",
        "Oscilloscope + CAN protocol analyzer - For real-world CAN bus testing and measurement"
      ]
    }
  }
}
,
  {
  "id": "ee-160-electric-power-systems",
  "code": "EE 160",
  "name": "Electric Power Systems",
  "fullName": "EE 160: Electric Power Systems",
  "description": "Bridge between EV circuits and grid-scale infrastructure. Understand how high-voltage battery packs distribute power, how microgrids coordinate EVs as distributed energy resources, and how Vehicle-to-Grid (V2G) technology enables EVs to supply power back to the grid during peak demand. Master three-phase AC fundamentals, battery architecture, power distribution, thermal management systems, and smart charging infrastructure essential for modern EV deployment.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric Power Systems completes the foundation of EV engineering by connecting individual vehicle power systems to grid-scale operations. While earlier courses focused on motors, controls, and power electronics, EE 160 teaches how EVs integrate with the electricity grid as loads and as distributed energy resources. Modern EV engineers must understand battery pack architecture (400V/800V systems with 96-300+ cells), Vehicle-to-Grid technology that transforms EVs into mobile batteries capable of supplying 10-50 kW back to the grid, and smart charging infrastructure that optimizes when and how vehicles charge. Microgrids using coordinated EV fleets (16+ MW aggregated) are already stabilizing campuses and commercial sites. As grid integration becomes critical for transportation electrification—managing billions of EVs charging from renewable energy sources—this course provides essential knowledge for designing reliable, resilient EV charging systems that support both vehicle and grid needs.",
    "realWorldApplications": [
      "High-voltage battery pack architecture: 400V/800V systems with series-parallel cell configurations for Tesla Model 3/S/X, BMW iX, Lucid Air",
      "Battery Management System (BMS) design: Centralized master BMS with distributed slave modules monitoring 96-300+ cells in real-time",
      "Vehicle-to-Grid (V2G) technology: EVs acting as 0.15-0.30 MWh mobile batteries, supplying 10-50 kW each during peak grid demand",
      "Microgrid integration: Coordinated fleets of 100-1000 vehicles providing 1-16 MW of distributed energy storage for campus/industrial microgrids",
      "Smart charging infrastructure: Dynamic load management based on grid demand, renewable energy availability, and electricity pricing",
      "High-voltage power distribution: Contactors, fuses, circuit breakers, power distribution units (PDUs) handling 300-500A continuous (1000-1750A peak)",
      "Three-phase AC power systems: Utility grid stepping down 240V/480V to vehicle charging stations and microgrids",
      "Thermal management integration: Temperature monitoring, active cooling loops, passive heat dissipation for battery packs and power electronics",
      "Demand response and grid services: EVs supporting frequency regulation, peak shaving, valley filling, and renewable energy time-shifting",
      "Real-time grid monitoring: CAN bus communications enabling millisecond-level coordination between vehicles, chargers, and grid operators"
    ],
    "learningOutcomes": [
      "Understand three-phase AC generation, transmission, and distribution fundamentals for utility-scale power systems",
      "Analyze three-phase systems using phasor diagrams, calculate line/phase voltages, and solve Y-Delta configurations",
      "Design and model high-voltage battery pack architecture with series-parallel cell configurations",
      "Understand Battery Management System (BMS) functions: cell monitoring, balancing, thermal management, state estimation",
      "Calculate State of Charge (SOC) and State of Health (SOH) using electrochemical models and electrical measurements",
      "Design high-voltage power distribution systems with protection, isolation, and safety mechanisms",
      "Understand Vehicle-to-Grid (V2G) technology and bidirectional power flow between vehicles and grid",
      "Analyze microgrid operations: load forecasting, distributed energy resource coordination, frequency/voltage regulation",
      "Design smart charging control algorithms for load management and grid support",
      "Integrate power system knowledge with motor, control, and power electronics courses for complete EV system design"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=RToXdTYQteo - Introduction to 3 Phase AC Systems (Full Lecture) (46-minute comprehensive lecture on 3-phase generation, Y/Delta configurations, power calculations)",
        "https://www.youtube.com/watch?v=310jd_DxH2s - 01 - What is 3-Phase Power? Three Phase Electricity Tutorial (22-minute tutorial on 3-phase concepts, phase arrangement, phasor diagrams)",
        "https://www.youtube.com/watch?v=4RhcPvFubC4 - Three-Phase Power Circuit Problems (worked examples on Y/Delta configurations, balanced/unbalanced systems, power calculations)",
        "https://www.youtube.com/watch?v=4oRT7PoXSS0 - How Three Phase Electricity works - The basics explained (7-minute visual overview starting from single-phase to three-phase)",
        "https://www.youtube.com/watch?v=186zg7tDyZss - 3-Phase System Strategies for PE Power Exam Success (Delta-Y transforms, phase sequences, symmetrical components for exam prep)",
        "https://www.youtube.com/watch?v=Rtz0KXLKTOE - High voltage battery architecture - module, BMS, balancing, wiring (complete walkthrough of EV battery pack structure and cell connection)",
        "https://www.youtube.com/watch?v=JZHJ7CtJ1UA - Li-Ion Battery Pack Design Consideration: Tutorial (centralized vs. decentralized BMS, high-voltage architecture for large packs)",
        "https://www.youtube.com/watch?v=T4MKHxNyXJs - Battery Electric Vehicle (BEV) high level overview (complete BEV architecture from battery through inverter to motor)",
        "https://www.youtube.com/watch?v=hBbhevHZZ5E - Electric Vehicle Battery Breakdown: Cells to Modules to Packs (hierarchical battery structure from cell level to complete pack)",
        "https://www.youtube.com/watch?v=XXXDNMQQfQA - Lucid Air Battery Pack: A Truly Unique Architecture (800V system design with cell isolation and module optimization)",
        "https://justenergy.com/blog/vehicle-to-grid/ - Vehicle-to-Grid (V2G) Technology Comprehensive Guide (complete V2G explanation with bidirectional charging and grid benefits)"
      ],
      "websites": [
        "https://www.nrel.gov/transportation/project-ev-grid-integration - Electric Vehicle Grid Integration (NREL research on EV-grid integration, charging infrastructure, V2G development)",
        "https://tijer.org/tijer/papers/TIJER2504067.pdf - Grid Using DC Fast Charging Architecture (research paper on V2G in DC fast charging microgrids with bidirectional energy flow)",
        "https://www.nga.org/wp-content/uploads/2020/12/EV-Grid-Interaction.pdf - EV Grid Interaction (National Governors Association policy document on charging infrastructure, VGI, V2G strategies)",
        "https://ijsra.net/sites/default/files/IJSRA-2024-2037.pdf - Smart Micro-grid Integration with Bidirectional DC Fast Charging (V2G technology enabling bidirectional power flow in microgrids)",
        "https://dsiac.dtic.mil/technical-inquiries/notable/high-voltage-direct-current-battery-management-systems-bms/ - High-Voltage Direct-Current Battery Management Systems (comprehensive BMS design with Orion and modular architectures)",
        "https://www.autosinnovate.org/posts/papers-reports/VGI%20White%20Paper_2024.pdf - VEHICLE GRID INTEGRATION (Auto Innovators white paper on managed charging, V2G, grid services)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC10422278/ - A Vehicle-to-Grid System for Controlling Microgrid Parameters (research on V2G technology for frequency regulation in 24-hour cycle)",
        "https://hypercraftusa.com/managing-high-voltage-distribution/ - Managing High-Voltage Distribution in EVs (overview of high-voltage junction boxes, contactors, protection circuits)",
        "https://www.virta.global/vehicle-to-grid-v2g - Vehicle-to-Grid (V2G): Everything you need to know (Virta platform explanation of V2G technology and private charging applications)",
        "https://chargedevs.com/whitepapers/safer-ev-systems-through-advanced-power-distribution-and-protection/ - Safer EV Systems Through Advanced Power Distribution (PDU/BDU design for safe power management)",
        "https://highlandfleets.com/vehicle-to-grid-v2g/ - What is Vehicle to Grid (V2G) Technology? (practical V2G implementation for electric bus fleets with grid services)",
        "https://justenergy.com/blog/vehicle-to-grid/ - Vehicle-to-Grid (V2G) Technology | Comprehensive Guide (bidirectional charging fundamentals and grid support mechanisms)",
        "https://www.evconnect.com/blog/what-is-vehicle-to-grid-v2g-technology-and-how-does-it-work/ - What Is Vehicle-to-Grid (V2G) Technology (explanation of bidirectional charging, smart control, grid benefits)",
        "https://www.tonex.com/training-courses/vehicle-to-grid-v2g-and-smart-charging-infrastructure-development-essentials/ - V2G and Smart Charging Infrastructure Essentials (comprehensive training on V2G, smart charging, regulatory frameworks)",
        "https://www.ti.com/applications/automotive/hev-ev-powertrain/hev-ev-battery-management-system-bms/overview.html - HEV/EV Battery Management System Design Resources (Texas Instruments BMS design guidance, cell monitoring, balancing)"
      ],
      "tools": [
        "MATLAB/Simulink Power Systems Toolbox - Industry-standard for power system analysis, load flow studies, and three-phase circuit simulation - https://www.mathworks.com/products/power-systems.html",
        "PSIM - Specialized power electronics and electrical machine simulation with microgrid capabilities - https://powersimtech.com/",
        "OpenDSS - Open-source distribution system simulator for EV charging load analysis - https://www.epri.com/pages/sa/opendss",
        "DIgSILENT PowerFactory - Professional power system analysis including EV integration and V2G modeling - https://www.digsilent.de/",
        "HOMER Pro - Microgrid design and optimization tool for renewable energy and EV integration - https://www.homerenergy.com/",
        "ETAP - Electrical transient and power flow analysis for grid integration studies - https://www.etap.com/",
        "Python libraries (Pandapower, PyPSA) - Open-source tools for power system optimization and analysis - https://pandapower.org/",
        "Battery modeling tools (COMSOL, Thermal Desktop) - Thermal and electrochemical battery simulation - https://www.comsol.com/"
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
  "description": "Comprehensive study of instrumentation principles, sensor technologies, signal conditioning, data acquisition systems, and measurement techniques. Covers practical applications in research labs, industrial environments, and automotive systems including battery management and EV testing.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric vehicles generate massive amounts of data—battery voltages up to 400V, charging currents in the thousands of amperes, motor temperatures, motor control signals switching at 10+ kHz. EE 185 teaches you how to accurately measure, condition, and acquire this data. You'll learn sensor technologies (Hall effect current sensors, thermistors, RTDs), signal conditioning circuits that amplify tiny signals from sensors and filter out electrical noise, and data acquisition (DAQ) systems that convert analog measurements into digital data for real-time analysis. You'll master oscilloscope operation for debugging high-speed motor control signals, learn LabVIEW software to automate battery monitoring, and understand the measurement accuracy requirements (functional safety standards like ASIL-C) that keep EVs safe. Essentially, you're learning the measurement foundation that lets engineers validate that an EV motor is performing correctly, the battery is healthy, and the power electronics are efficient—making this course fundamental to any EV development role.",
    "realWorldApplications": [
      "Battery Management System (BMS) current sensing—precision Hall effect or shunt-based sensors measure charge/discharge current (±2000A range) to calculate State of Charge (SOC) and prevent over-current faults",
      "Multi-point battery thermal monitoring using RTD/thermistor arrays; DAQ systems track temperature at cell, module, and pack levels to maintain optimal 15-35°C operating range and trigger thermal management responses",
      "High-voltage battery pack voltage monitoring via isolated voltage dividers and ADC inputs; multi-channel DAQ enables cell balancing algorithm validation",
      "Motor control signal acquisition—oscilloscope captures phase currents, PWM signals, and back-EMF waveforms to validate commutation timing and diagnose motor faults",
      "Inverter power loss characterization—high-speed DAQ (>10 kHz sampling) measures switching currents and voltages to calculate IGBT/MOSFET losses and validate thermal models",
      "CAN bus diagnostic monitoring—DAQ systems with CAN interface verify real-time message exchange between VCU, BMS, motor controller, and other ECUs; confirms functional safety requirements",
      "Electromagnetic compatibility (EMC) testing—oscilloscope + current clamps measure conducted/radiated emissions to ensure CISPR25 compliance for EV electronics",
      "Regenerative braking validation—current/voltage sensors during reverse motor operation verify energy recovery efficiency and battery charging current limits",
      "LabVIEW-based real-time BMS monitoring—custom user interfaces display voltage, current, temperature, SOC with millisecond update rates for rapid troubleshooting",
      "Hardware-in-Loop (HIL) testing—DAQ systems interface with virtual battery models to validate BMS algorithms before prototyping; catches design flaws early"
    ],
    "learningOutcomes": [
      "Understand sensor types and selection criteria: temperature sensors (RTD, thermistor, thermocouple), pressure/force sensors, current sensors (Hall effect, shunt, fluxgate), voltage dividers",
      "Analyze sensor characteristics: sensitivity, linearity, temperature coefficient, response time, operating range, and accuracy requirements for automotive applications",
      "Design signal conditioning circuits: amplification (op-amp gain stages), filtering (low-pass for ADC anti-aliasing, high-pass for DC removal), isolation, and linearization",
      "Understand data acquisition system architecture: sensors → signal conditioning → multiplexing → A/D conversion → digital processing → storage",
      "Operate oscilloscopes: configure vertical/horizontal scaling, triggering modes, probe compensation, measure voltage/frequency/phase, use cursors and waveform math",
      "Use multimeters correctly: DC/AC voltage, current measurement, resistance, continuity testing, and understand measurement resolution and accuracy",
      "Apply digital filtering techniques to reduce noise: low-pass IIR filters, moving average filters, Nyquist sampling theory",
      "Design and implement DAQ systems: select appropriate ADC resolution/sampling rate, configure multiplexing for multi-channel acquisition, handle real-time data streaming",
      "Analyze measurement uncertainty and error sources: quantization error, thermal noise, electromagnetic interference (EMI), and grounding issues",
      "Use LabVIEW for automated data acquisition: build graphical user interfaces (GUIs) for real-time monitoring, implement data logging and signal processing workflows",
      "Apply instrumentation to EV applications: battery SOC estimation via coulomb counting, thermal management validation, motor control diagnostics, CAN bus monitoring",
      "Ensure functional safety compliance: understand ASIL requirements for safety-critical sensors, interpret sensor datasheets, and select components meeting automotive standards"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=KUA2ql51D74 - Sensor Basics: A Crash Course in Sensor Types and Terminology (20 min, PNP/NPN, inductive/capacitive/photoelectric/magnetic/ultrasonic sensors)",
        "https://www.youtube.com/watch?v=Bgo4nk4b0bg - Sensor Measurements 101 (30 min selection criteria, measurement setup, IV characterization)",
        "https://www.youtube.com/watch?v=5xMnNdtJo60 - Lecture 1 Introduction to Instrumentation (Part A) (comprehensive sensor types: temperature, flow, gyroscope, moisture, pressure)",
        "https://www.youtube.com/watch?v=M2f0v0R9rfo - Mechanical FE Exam Prep Fundamentals - Temperature Sensor (RTD, thermistor, thermocouple physics and applications)",
        "https://www.youtube.com/watch?v=w0JZ8VKhCHQ - Data Acquisition System (DAQ) with Built-in Signal Conditioner (3 min, EtherCAT DAQ, 128 channels, programmable gain, real-time FFT)",
        "https://www.youtube.com/watch?v=i0XFfzMfMzs - Data Acquisition Concepts | Advantech IoT Academy (5 min, architecture: sensor → signal conditioning → ADC → computer)",
        "https://www.youtube.com/watch?v=-0LzMfhoSts - What is a data acquisition system? (DAQ System) (2 min intuitive overview of measurement chain)",
        "https://www.youtube.com/watch?v=240 - Oscilloscopes Learning Hub - Keysight (full learning platform, advanced measurement capabilities)",
        "https://www.youtube.com/watch?v=239 - How to ACTUALLY Use an Oscilloscope (Beginner-Friendly Guide!) (13 min with PWM/motor control examples)",
        "https://www.youtube.com/watch?v=g4eb4iBR7hw - Battery Data Acquisition and Analysis Using MATLAB (10 min, voltage/current measurement, noise filtering, MATLAB data analysis for BMS)"
      ],
      "websites": [
        "https://blog.isabellenhuetteusa.com/current-measurement-system-makes-electric-vehicles-safer/ - Current Measurement System Makes EVs Safer (ASIL-C sensors, IVT 3 Base, CAN interface, temperature integration)",
        "https://www.keysight.com/blogs/en/tech/bench/2021/12/02/monitor-battery-temperature-by-using-a-data-acquisition-system-or-specialized-battery-test-system - Monitor Battery Temperature (Keysight, DAQ systems for EV battery testing, thermal limits 15-35°C)",
        "https://www.lem.com/en/battery-current-sensor - Battery Current Sensors: Key to EV Energy Management (LEM SMU/HSU series, Hall effect + Shunt, ±2000A range, SoC estimation)",
        "https://www.pcb.com/sensors-for-test-measurement/electronics/battery-powered-icp-signal-conditioners - Battery-Powered ICP® Signal Conditioners (PCB Piezotronics, portable conditioning for sensor integration)",
        "https://chargedevs.com/whitepapers/what-engineers-need-to-know-about-current-sensors-for-ev-applications/ - What Engineers Need to Know About Current Sensors for EVs (closed-loop vs open-loop, ASIL-C Honeywell CSSV 1500)",
        "https://ams-osram.com/products/sensor-solutions/battery-management/ams-as8510-analog-front-end - ams AS8510 Analog Front-End Battery management (16-bit dual ADC, <1 LSB offset, AEC-Q100 compliant)",
        "https://www.interfaceforce.com/test-and-measurement-for-electric-vehicles/ - Test and Measurement for Electric Vehicles (Interface, torque measurement, EV motor testing)",
        "https://dewesoft.com/blog/what-is-data-acquisition - Data Acquisition (DAQ) - The Ultimate Guide (Dewesoft, DAQ system components, signal conditioning, filtering)",
        "https://assets.testequity.com/te1/Documents/pdf/keysight/edu-training-lab-guide.pdf - DSOXEDK Educator's Oscilloscope Training Kit Lab Guide (Keysight, 15 labs covering probe compensation, triggering, waveform math)",
        "https://www.ni.com/en/shop/services/education-services/customer-education-courses/taking-measurements-with-oscilloscopes-course - Taking Measurements with Oscilloscopes Course Overview (NI, 3-hour training, probe selection, calibration)",
        "https://www.fluke.com/en-us/learn/blog/oscilloscopes/abcs-of-portable-oscilloscopes-part-1-multimeters-and-oscilloscopes - ABCs of Portable Oscilloscopes and Multimeters (Fluke, oscilloscope vs multimeter comparison, signal processing)",
        "https://www.keysight.com/us/en/products/modular/data-acquisition-daq.html - Data Acquisition Systems (DAQ) - Keysight (integrated signal conditioning, multiplexing, A/D conversion)",
        "https://www.ijera.com/papers/vol13no12/13128893.pdf - Battery Monitoring System Using Labview (PDF, LabVIEW BMS with real-time SOC estimation, temperature monitoring)",
        "https://www.digitalengineering247.com/article/nis-labview-enables-battery-testing-platform - NI's LabVIEW Enables Battery Testing Platform (Bloomy Controls case study, modular BMS test system)",
        "https://www.ni.com/en/solutions/transportation/case-studies/developing-an-hil-simulator-for-testing-battery-management-system-logic - Developing an HIL Simulator for Testing BMS (NI hardware-in-loop testing overview)",
        "https://www.embedded.com/signal-processing-in-embedded-systems/ - Signal Processing in Embedded Systems (DSP applications: filtering, noise cancellation, modulation/demodulation)",
        "https://www.dmcinfo.com/blog/40102/simplifying-dsp-filters-for-embedded-systems - Simplifying DSP Filters for Embedded Systems (low-pass IIR filters, practical noise reduction)",
        "https://runtimerec.com/digital-signal-processing/ - Digital Signal Processing (DSP) in Embedded Systems (filtering, sampling, quantization for sensor data)",
        "https://www.cardinalpeak.com/blog/improving-signal-to-noise-ratios-how-dsp-services-boost-signal-quality - Improving Signal-to-Noise Ratios (noise reduction techniques, adaptive cancellation, spectral subtraction)",
        "https://catalog.ucmerced.edu - UC Merced Course Catalog (official course information)"
      ],
      "tools": [
        "National Instruments (NI) DAQ Hardware: cDAQ, cRIO chassis, sensor cards (voltage, current, temperature, pressure modules) - https://www.ni.com",
        "LabVIEW - Graphical programming for real-time data acquisition, monitoring, and control - https://www.ni.com/en-us/shop/labview.html",
        "Keysight Data Acquisition Systems - Modular DAQ with integrated signal conditioning, multiplexing, thermocouple linearization - https://www.keysight.com",
        "Oscilloscope (e.g., Keysight InfiniiVision, Rigol) - Essential for high-speed signal measurement and debugging - Budget: $300-5000+",
        "Multimeter - Fluke 87V or equivalent for general voltage, current, resistance measurements - Budget: $100-300",
        "Current Clamps / Current Probes - Non-invasive AC/DC current measurement (1-2000A range) - Budget: $200-2000",
        "Thermocouple / RTD / Thermistor sensors - Temperature measurement for battery and motor thermal monitoring",
        "Hall effect current sensors - LEM SMU, Honeywell CSSV series for precision battery/motor current measurement",
        "Signal Conditioning Modules - Amplifiers, filters, isolators, linearization for sensor interfacing",
        "CAN Bus analyzer - PEAK Systems, Technobrains, or equivalent for automotive network diagnostics",
        "MATLAB/Simulink - Signal processing, data visualization, filtering algorithm design",
        "Python + NumPy/SciPy - Open-source alternative for DAQ software development and signal analysis"
      ]
    }
  }
}
,
  {
  "id": "ee-188-electric-vehicle-design",
  "code": "EE 188",
  "name": "Electric Vehicle Design",
  "fullName": "EE 188: Electric Vehicle Design",
  "description": "Capstone course integrating all prior EE coursework into complete electric vehicle design and system-level integration. Master vehicle architecture, powertrain packaging, thermal management system integration, vehicle dynamics control, and E/E architecture. Learn how motor, battery, power electronics, and control systems work together as a unified system in production EVs from Tesla, BMW, Lucid, and leading OEMs.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 188 is where EV engineering becomes real. While prior courses built deep technical foundations in isolation (motors, controls, power electronics), EE 188 teaches system-level integration—how to design a complete electric vehicle where every subsystem constrains every other. A motor engineer discovers their 200 kW traction inverter generates 30 kW of waste heat that must be managed alongside battery cooling and cabin climate. A battery engineer learns their 300-cell pack must balance cell voltages while thermally stratified and controlling charge rates during supercharging. A control engineer implements FOC algorithms that coordinate with regenerative braking and vehicle stability systems. This course teaches real-world constraints: thermal derating that reduces performance in hot weather, packaging challenges that force motor placement compromises, cost targets that drive component selection. You'll use industry tools (MATLAB/Simulink, GT-SUITE, ANSYS) and methodologies (MBSE, drive cycle simulation) employed by Tesla, BMW, Hyundai, and Rivian. EE 188 develops systems thinking—the ability to optimize across competing objectives and make trade-off decisions that distinguish excellent EV engineers from component specialists.",
    "realWorldApplications": [
      "Complete EV powertrain architecture design: 400V/800V battery, traction inverter, motor controller, BMS, thermal system integration",
      "Thermal management system integration: Coordinating battery cooling (25-35°C), motor cooling (55-75°C), inverter cooling (40-60°C) on single or multi-loop systems",
      "Vehicle dynamics and control system design: Electronic stability control, traction control, active torque vectoring, and lateral/longitudinal vehicle control",
      "Powertrain packaging optimization: Motor placement, battery positioning, cooling system routing for space-efficient vehicle design",
      "System-level performance optimization: Balancing acceleration (motor torque), range (battery capacity), thermal constraints, and cost targets",
      "E/E architecture design: Transitioning from traditional domain-oriented (100+ ECUs) to modern zone-oriented centralized architectures",
      "Real-world validation methodology: Drive cycle simulation, chassis dynamometer testing, thermal chamber validation, road testing correlation",
      "Vehicle-to-Grid (V2G) system integration: Enabling bidirectional power flow for grid services and emergency power supply",
      "Autonomous driving integration: Sensor fusion, path planning, trajectory control for level 2+ autonomous vehicles",
      "Production readiness: Manufacturing feasibility analysis, cost modeling, supply chain optimization, regulatory compliance (FMVSS, ISO 26262)"
    ],
    "learningOutcomes": [
      "Understand complete EV system architecture: battery, motor, inverter, BMS, thermal management, controls integration",
      "Design and optimize powertrain systems for performance, efficiency, thermal management, and cost objectives",
      "Analyze multi-loop thermal management systems with conflicting temperature requirements and optimization strategies",
      "Design vehicle dynamics control systems: ESC, traction control, active torque vectoring, and active suspension",
      "Implement lateral and longitudinal vehicle control: pure pursuit, Stanley controller, model predictive control for path tracking",
      "Model and simulate complete EV powertrain using industry tools: MATLAB/Simulink, GT-SUITE, ANSYS",
      "Perform drive cycle simulation and real-world validation: comparing simulation to dyno/road test measurements",
      "Integrate motor control (FOC), regenerative braking, battery management, and thermal control into unified system",
      "Design modern E/E architecture: zone-oriented, centralized computing, high-speed Ethernet communication",
      "Apply systems thinking to EV design: optimizing across competing objectives, making informed trade-off decisions"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=xrEtBm7WuHY - Inside the Master Course in EV Powertrain Design & Validation (Decibels Lab comprehensive course overview covering fundamentals to advanced validation, MATLAB/Simulink modeling, bench testing, real-world correlation)",
        "https://www.youtube.com/watch?v=KytCYJq8ATA - Electric Vehicle Full Course 2025 | Intellipaat (complete EV design from market analysis through prototyping, battery powertrain integration, MATLAB for EV design, traditional vs. EV comparison)",
        "https://www.youtube.com/watch?v=Rl91CxjUchU - Electric Vehicle Design Process (market analysis, aesthetic design, powertrain packaging, thermal analysis, structural analysis, full design iteration for Tesla Model S/3 example)",
        "https://www.youtube.com/watch?v=YINlmilxH1Y - Motion Planning and Control of Autonomous Vehicle (hierarchical motion planning, behavior planning with state machines, trajectory generation, PID and Stanley controllers for path tracking)",
        "https://www.youtube.com/watch?v=QziS_gRV2pI - Longitudinal (PID) and Lateral (PID) Motion Control of Autonomous Vehicle (PID controllers for longitudinal and lateral motion, CARLA simulator demonstration)",
        "https://www.youtube.com/watch?v=SzEg_C-XJ14 - Vehicle Path Tracking Using Model Predictive Control (MPC implementation for path tracking, creating waypoints, 3DOF vehicle dynamics simulation in Simulink)",
        "https://www.youtube.com/watch?v=6rB6KpoYMV0 - Electric Vehicle Simulations in Ansys: Full-Bridge DC-DC Converters (ANSYS simulation of power electronics, transformer design, practical hardware implementation considerations)",
        "https://www.youtube.com/watch?v=5ZTQE-ptxYM - Modelling an Electric Vehicle using MATLAB & Simulink (Part 1) (vehicle body modeling, step-by-step integration of motor, battery, controller, individual module testing)",
        "https://www.mathworks.com/videos/autonomous-navigation-for-highway-driving-design-and-simulate-lane-change-maneuver-system-16245.html - Design and Simulate Lane Change Maneuver System (automated lane change system, vehicle dynamics, path planning, control design with Simulink)",
        "https://www.youtube.com/watch?v=hBbhevHZZ5E - Electric Vehicle Battery Breakdown: Cells to Modules to Packs (hierarchical battery structure, cell connection, module architecture, complete pack integration)",
        "https://www.youtube.com/watch?v=JZHJ7CtJ1UA - Li-Ion Battery Pack Design Consideration: Tutorial (centralized vs. decentralized BMS, high-voltage architecture, battery management approaches)"
      ],
      "websites": [
        "https://pulseenergy.io/blog/ev-architecture - Decoding EV Architecture: What Powers Your Electric Ride (complete EV ecosystem overview from battery through control systems and vehicle dynamics)",
        "https://www.ttieurope.com/content/dam/ttiinc/resources/literature/TTIW018-DC%20power%20train%20architecture%20for%20EVs-EN-FINAL - An Engineer's Guide to the DC Power Train Architecture of EVs (comprehensive EV and PHEV architectural design guide covering key subsystems)",
        "https://www.emobility-engineering.com/thermal-management-in-electric-vehicles-e-motor-cooling-technology/ - Thermal Management in Electric Vehicles (integrated approach to motor cooling, battery thermal management, waste heat recovery)",
        "https://www.sportsubaru.com/subaru-vdc-explained.htm - Subaru Vehicle Dynamics Control (VDC) Explained (VDC system, lateral slip prevention, multi-mode control, active torque vectoring)",
        "https://chargedevs.com/whitepapers/how-to-use-generative-engineering-in-ev-architecture-exploration/ - How to Use Generative Engineering in EV Architecture (MBSE approach, architecture analysis, cooling system optimization with multi-objective design)",
        "https://brogenevsolution.com/ev-thermal-management-system-for-battery-electric-mining-trucks/ - EV Thermal Management System for Commercial Vehicles (integrated thermal management, battery cooling 25-35°C, motor cooling, cabin HVAC)",
        "https://en.wikipedia.org/wiki/Electronic_stability_control - Electronic Stability Control (ESC) (comprehensive explanation of ESC, ABS integration, yaw rate control, wheel slip detection)",
        "https://www.bosch-mobility.com/en/mobility-topics/ee-architecture/ - The E/E Architecture of the Future (transition from domain-oriented to zone-oriented architecture, vehicle-centralized computing, reduced ECU complexity)",
        "https://stellarix.com/insights/articles/e-powertrain-driving-tomorrows-mobility/ - e-Powertrain: Driving Tomorrow's Mobility (motor, inverter, battery thermal management fundamentals)",
        "https://www.batterypowertips.com/optimizing-ev-motor-design/ - Optimizing EV Motor Design (integrated thermal management, sensor networks, powertrain coordination for high power density)",
        "https://www.sciencedirect.com/science/article/abs/pii/S0888327016305350 - Dynamics Control of Autonomous Vehicle (novel dynamics controller for autonomous vehicles at driving limits, path following)",
        "https://www.tandfonline.com/doi/full/10.1080/09544828.2025.2541150 - What Determines EV Architecture? (comprehensive analysis of BEV architectural decisions and vehicle performance impact)",
        "https://www.gtisoft.com/electric-powertrain-simulation-solutions/ - Electric Powertrain Simulation Solutions (thermal analysis, motor demagnetization risks, battery health, inverter derating)",
        "https://caradas.com/traction-control-and-adas/ - Traction Control and ADAS (traction control fundamentals, advanced driver assistance systems integration)",
        "https://www.calatherm.com/why-thermal-management-systems-are-critical-for-battery-life-and-performance-in-electric-vehicles/ - Why Thermal Management is Critical for EV Battery Life (holistic system integration, predictive thermal algorithms, shared cooling loops)"
      ],
      "tools": [
        "MATLAB/Simulink - Industry-standard for complete EV powertrain modeling, FOC control design, thermal simulation, motion control - https://www.mathworks.com/products/simulink.html",
        "GT-SUITE (Gamma Technologies) - Specialized tool for powertrain simulation including engine, transmission, thermal, and auxiliary systems - https://www.gtisoft.com/",
        "ANSYS Multi-Physics Suite - Comprehensive simulation for structural FEA, thermal analysis, CFD aerodynamics, power electronics - https://www.ansys.com/",
        "NX / CATIA - Professional CAD tools for vehicle body design, powertrain packaging, parametric modeling - https://www.plm.automation.siemens.com/",
        "Vehicle Dynamics Blockset - MATLAB/Simulink library for vehicle dynamics, tire models, control system design - https://www.mathworks.com/products/vdynblks.html",
        "Automated Driving Toolbox - MATLAB tools for autonomous vehicle design, path planning, sensor fusion - https://www.mathworks.com/products/automated-driving.html",
        "CARLA Simulator - Open-source autonomous driving simulator for testing perception and control algorithms - https://carla.org/",
        "Dyno & Thermal Test Facilities - Physical testing infrastructure (chassis dynamometer, motor test bench, thermal chamber) for validation - https://www.gtisoft.com/"
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
  "description": "Comprehensive introduction to fluid mechanics principles, including fluid statics, fluid dynamics, flow analysis, and computational fluid dynamics (CFD). Covers fundamental applications to engineering design with emphasis on thermal management systems in electric vehicles.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric vehicles generate intense heat from batteries, motors, and power electronics—and that heat must be managed precisely or the vehicle fails. ENGR 120 teaches you the physics of heat transfer via fluid flow: how liquid coolant circulates through battery packs, motor jackets, and inverter plates to keep everything within safe operating temperatures. You'll learn the fundamental equations (Bernoulli, Navier-Stokes, continuity) that govern flow behavior in pipes and channels. You'll also learn Computational Fluid Dynamics (CFD), a critical tool used by every EV OEM to optimize cooling channel geometry, minimize pump power, and ensure uniform temperature distribution. For context: optimizing an EV cooling system via CFD can improve range by 2-3% just by reducing hydraulic losses; it's that important. Tesla, BMW, and Hyundai all employ teams of thermal engineers using Ansys Fluent (the industry CFD standard) to validate their battery cooling architectures. This course is foundational to understanding how modern EVs keep their 400V+ battery packs from overheating during 3C fast charging.",
    "realWorldApplications": [
      "Battery thermal management system (BTMS) cold plate design—optimizing liquid flow paths through parallel microchannels to achieve uniform temperature distribution within ±5°C across 100+ cells",
      "Pump sizing for EV cooling loops—calculating flow rate, head pressure, and power consumption for variable-speed pumps; variable pumps save 15-25% parasitic power vs fixed-flow designs",
      "Motor/inverter liquid cooling jacket design—predicting coolant temperature rise and thermal performance under continuous 200+ kW power dissipation",
      "Pressure drop optimization in cooling circuits—CFD identifies hydraulic bottlenecks; topology-optimized channel geometry achieves 20-30% reduction in pump power requirements",
      "Two-phase immersion cooling with dielectric fluids (emerging)—3M Novec7000 fluid at 5C discharge rate maintains battery at ~35°C via evaporative cooling; requires understanding of phase-change heat transfer",
      "Dual-loop thermal architecture with 4-way valve—serial mode in cold weather (motor waste heat preheats battery), parallel mode in hot weather (independent cooling circuits); fluid mechanics governs transition dynamics",
      "Heat pump integration for EV cabin + battery thermal management—HPACS recovers motor waste heat to preheat cabin and battery; complex fluid routing requires flow balancing",
      "Thermal stratification prevention—CFD ensures outlet temperature uniformity; prevents hot spots that could trigger battery cell degradation or safety shutdowns",
      "Transient thermal response modeling—CFD predicts temperature spike during fast charging; validates thermal management margins before physical prototype testing",
      "Multiphysics coupling of thermal + electromagnetic models—ANSYS or MATLAB integrates resistive heat generation (inverter losses) with CFD thermal model for vehicle-level prediction"
    ],
    "learningOutcomes": [
      "Define fluid mechanics and distinguish between fluids (liquids, gases) and solids; understand continuum approximation and physical basis of pressure/viscosity",
      "Analyze fluid properties: density, viscosity (Newtonian vs non-Newtonian), surface tension, and their impact on flow behavior in automotive cooling systems",
      "Apply fluid statics principles: calculate hydrostatic pressure, forces on submerged surfaces, and buoyancy—relevant for pump inlet pressure calculations",
      "Apply Bernoulli equation to pipe flow: predict velocity and pressure changes in cooling loops, understand energy conservation in fluid flow",
      "Distinguish laminar vs turbulent flow; calculate Reynolds number; select appropriate friction factor correlations for pipe friction losses",
      "Design piping systems: size pipes for minimum pressure drop, calculate pump head requirements, and optimize flow velocity (typically 1-3 m/s in EV cooling)",
      "Understand heat transfer by convection: Newton's Law of Cooling, convection coefficient h, natural vs forced convection; apply to battery cold plates",
      "Design heat exchangers: understand effectiveness-NTU method, predict outlet temperatures in radiator and condenser sections of EV cooling loops",
      "Apply Navier-Stokes equations conceptually; understand how CFD solves these for complex 3D geometries that analytical solutions cannot handle",
      "Use CFD software (Ansys Fluent or equivalent): geometry import, mesh generation, boundary condition setup, turbulence model selection, convergence monitoring",
      "Post-process CFD results: velocity streamlines, pressure contours, temperature distribution; identify stagnant regions and flow maldistribution",
      "Optimize thermal management designs via CFD: validate pressure drop, thermal uniformity, and outlet temperature under multiple operating scenarios (3C fast charge, highway cruise, idle cooling)"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=lJM4GuUd3Hk - Introduction to Fluid Mechanics: Part 1 (25 min, technical definition of fluid, continuum approximation, dimensional analysis, units)",
        "https://www.youtube.com/watch?v=clVwKynHpB0 - Fluid Mechanics: Fundamental Concepts, Fluid Properties (1 of 34) (50 min comprehensive, density, viscosity, Newtonian fluids, surface tension, pressure)",
        "https://www.youtube.com/watch?v=SrpX7m89_-I - Fluid Mechanics Lesson 01A: Introduction (John Cimbala Penn State, 9 min, defines fluid mechanics, stresses, free body diagrams)",
        "https://www.ansys.com/academic/educators/education-resources/basics-of-cfd-simulation-with-ansys-fluent - Basics of CFD Simulation in Ansys Fluent (official Ansys tutorial, CAD import, meshing, BC setup, solver configuration)",
        "https://innovationspace.ansys.com/courses/learning-track/getting-started-with-ansys-fluent-basics/ - Ansys Fluent – Basics Learning Track (multi-course track: geometry, meshing, physics setup, post-processing, best practices)",
        "https://www.youtube.com/watch?v=IIlNTtSwDOE - Crash Course in Computational Fluid Dynamics (CFD) with ANSYS Fluent (30 min, CFD workflow, Navier-Stokes equations, turbulence modeling, RANS, meshing strategy)",
        "https://www.youtube.com/watch?v=Nq3BllMPnWQ - Learn Convection Heat Transfer the Easy Way! (8 min, Newton's Law of Cooling, convection coefficient h, forced vs natural convection for cooling)",
        "https://www.youtube.com/watch?v=hztORJj20-Y - Convective Heat Transfer (15 min, convection definition, h values for water/air, heat transfer rate calculation)",
        "https://www.youtube.com/watch?v=RK79cD1JI3c - Convection: Cooling of Electronics - Thermal Analysis Workshop (SimScale, 62 min, natural+forced cooling on Raspberry Pi, CFD streamlines/temperature contours, design optimization)",
        "https://www.youtube.com/watch?v=79 - CFD Simulation Workflow Demo using Ansys Fluent — Lesson 5 (Ansys, live demo on mixing tee, boundary conditions, initialization, convergence monitoring)",
        "https://www.youtube.com/playlist?list=PLpe3qgeJLpB1VWD2cF7HQ0aC0jwIuDzTT - Online Video-Tutorials For Fluid Mechanics (Magic Marks, complete playlist: fluid properties, statics, dynamics, applications)",
        "https://www.youtube.com/playlist?list=PLQMtm0_chcLyEB1EJLUoouugMYZNQUslG - Ansys Computational Fluid Dynamics (CFD) Tutorials (comprehensive Ansys CFD video library across applications)"
      ],
      "websites": [
        "https://www.emobility-engineering.com/ev-battery-thermal-management-cooling-innovations/ - Innovative Fluid Cooling for Fast-Charging EV Batteries (immersion cooling, cold plates, dual-loop architecture, AI-driven control, 5% validation margins)",
        "https://www.bonnenbatteries.com/ev-battery-thermal-management-system-liquid-cooling-system-for-lithium-ion-battery/ - EV Battery Thermal Management System – Liquid Cooling (direct vs indirect cooling, cold plates, microchannel design, 5C discharge case study)",
        "https://www.mathworks.com/help/hydro/ug/sscfluids_ev_thermal_management.html - Electric Vehicle Thermal Management - MATLAB & Simulink (dual-loop serial/parallel switching, 4-way valve, refrigerant loop, thermal loads modeling)",
        "https://www.linkedin.com/pulse/liquid-cooling-systems-cornerstone-battery-thermal-management-mjtvc - Liquid Cooling Systems: A Cornerstone of Battery Thermal Management (coolant circulation, heat exchanger design, optimal operating temps)",
        "https://www.idtechex.com/en/research-article/thermal-management-for-evs-cooling-systems-down/32324 - Thermal Management for EVs: Cooling Systems Down - IDTechEx (water-glycol vs dielectric oils vs refrigerants, system architecture comparison)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC12794804/ - Thermal management of lithium-ion batteries: from single cooling to hybrid cooling - Nature Reviews (comprehensive review, single-phase vs two-phase cooling, PCM integration, hybrid methods)",
        "https://thermtest.com/battery-thermal-management-system - Battery Thermal Management - All You Need to Know - Thermtest (liquid cooling advantages, heat transfer coefficients, design trade-offs)",
        "https://volta.foundation/battery-bits/cooling-the-powerhouse-unleashing-performance-and-safety-in-electric-vehicles-with-computational-fluid-dynamics - Cooling the Powerhouse (CFD optimization of battery thermal management, computational validation methods)",
        "https://www.sciencedirect.com/science/article/pii/S2352152X2502002X - Integrating heat transfer and control optimization: Comprehensive review on BTMS (battery electrochemistry, geometry, cooling methods, control algorithms, recent innovations)",
        "https://www.sciencedirect.com/science/article/pii/S2214157X25007531 - Thermal management optimization in electric vehicle batteries using... (cooling channel design, angular velocity effects, porosity optimization)",
        "https://catalog.ucmerced.edu - UC Merced Course Catalog (official course information)"
      ],
      "tools": [
        "Ansys Fluent - Industry-standard CFD software for motor, battery, and thermal management system design - https://www.ansys.com/products/fluids/ansys-fluent",
        "MATLAB/Simulink with Simscape Fluids - Integrated thermal + fluid modeling for EV system-level simulations - https://www.mathworks.com/products/simscape.html",
        "SimScale - Cloud-based CFD platform for rapid cooling system prototyping and optimization - https://www.simscale.com",
        "COMSOL Multiphysics - Multiphysics coupling of thermal, fluid, and electromagnetic phenomena",
        "OpenFOAM - Open-source CFD solver (free alternative to commercial tools, steep learning curve)",
        "Pipe friction factor tools: Moody diagrams, Darcy-Weisbach calculators",
        "Heat exchanger design software: HEX software packages for effectiveness-NTU calculations",
        "Pump selection software: manufacturers' tools (Grundfos, Bosch Rexroth, Eaton) for flow/pressure duty point selection",
        "Python with NumPy/SciPy/Matplotlib - Scripting for CFD post-processing, curve fitting, optimization",
        "Oscilloscope + flow meter (for experimental validation of CFD predictions on prototype cooling systems)"
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
  "description": "Master the physical laws governing energy conversion, heat transfer, and thermal systems in electric vehicles. Understand the First and Second Laws of Thermodynamics that explain why battery thermal management limits EV performance, how heat pumps enable efficient cabin heating/cooling while recovering motor waste heat, and how to optimize integrated thermal systems across competing requirements (cool battery while warming cabin). Apply thermodynamic principles to real EV systems: battery cooling loops, motor thermal limits, HVAC heat pumps, and regenerative energy capture.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Thermodynamics is the physics foundation underlying every thermal system in modern EVs. While many focus only on the motor and battery, thermal management often determines real-world performance and vehicle reliability. At -7°C, an EV loses 40% of its range—not from battery capacity loss, but from thermodynamic inefficiency of cold systems. During fast charging, battery cells must be held at precisely 40°C for optimal charging speed; too hot and degradation accelerates, too cold and resistance limits charging current. The Second Law of Thermodynamics explains why all heat pumps have efficiency limits (Carnot efficiency), why throttling valves generate irreversible entropy losses, and how much waste heat can realistically be recovered from the motor and power electronics. EV engineers integrate multiple cooling loops (battery, motor, inverter, cabin) competing for limited waste heat—a complex thermodynamic optimization problem. This course teaches the physics and engineering fundamentals required to design thermal systems that maximize range, enable fast charging, prevent thermal runaway, and maintain comfort. Mastery of thermodynamics separates thermal engineers who design systems that actually work in production from those who struggle with unanticipated failures.",
    "realWorldApplications": [
      "Battery Thermal Management System (BTMS): Maintaining 25-45°C optimal range to preserve performance, prevent thermal runaway, extend cycle life (at -7°C ambient, range drops 40% without BTMS)",
      "Heat pump HVAC systems: Using refrigeration cycle to move heat from cold to hot with 3-4 COP (coefficient of performance), heating cabin while cooling battery in winter",
      "Integrated thermal system design: Optimizing waste heat routing from motor, battery, inverter to cabin preheating and defrost, reducing overall energy consumption",
      "Regenerative braking thermal management: Dissipating braking energy as controlled heat rather than wasting it, while protecting battery from overheat",
      "Fast charging thermal conditioning: Preheating battery to 40°C before charging for 30-50% faster charging speed and lower internal resistance",
      "Thermal throttling algorithms: Real-time performance derating when components exceed safe temperatures, maintaining reliability under extreme conditions",
      "Waste heat recovery: Capturing 20-40 kW from motor, inverter, and battery cooling loops to reduce HVAC energy draw by 30-50%",
      "Multi-zone thermal optimization: Managing conflicting temperature requirements (cool battery, warm motor for efficiency, comfortable cabin) with limited cooling capacity",
      "Passive thermal buffering: Using phase-change materials (PCM) to absorb transient heat spikes during aggressive acceleration or fast charging",
      "Thermal modeling and simulation: CFD analysis predicting coolant distribution, cell-to-cell temperature gradients, pressure drops, and system optimization"
    ],
    "learningOutcomes": [
      "Apply First Law of Thermodynamics: Energy conservation in open and closed thermal systems, steady-flow energy equation for heat exchangers",
      "Apply Second Law of Thermodynamics: Entropy generation, irreversible processes, and theoretical efficiency limits (Carnot cycle)",
      "Understand heat transfer: Conduction through battery cells and materials, convection via coolant flow, radiation (minimal at automotive temps)",
      "Design refrigeration cycles: Vapor-compression cycle components (compressor, condenser, throttling valve, evaporator), process analysis on P-h and T-s diagrams",
      "Calculate thermodynamic properties: Using refrigerant tables for enthalpy, entropy, saturation conditions; R134a, R1234yf thermodynamic data",
      "Analyze heat pump operation: COP calculation for both heating and cooling modes, reversible cycle operation for heating or cooling",
      "Model thermal systems: Energy balance equations, efficiency calculations, losses from finite temperature differences",
      "Optimize integrated thermal management: Trade-offs between battery cooling, motor thermal limits, inverter derating, cabin comfort, system weight",
      "Predict thermal performance: At extreme temperatures (-7°C cold start, +50°C hot soak), fast charging conditions, continuous high-power operation",
      "Apply practical constraints: Finite effectiveness of heat exchangers, irreversibility of throttling, pump/compressor power requirements"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=eKb_xbADAgA - Refrigeration Basics with Elliot and Bert Part 1 (Second Law of Thermodynamics, heat transfer in HVAC systems, pressure/temperature relationships)",
        "https://www.youtube.com/watch?v=LOaS1HnEK-o - Refrigerators & Heat Pumps Explained: How Cooling Systems Work (5-minute overview of four-component refrigeration cycle, COP explanation)",
        "https://www.youtube.com/watch?v=QykwWs3L1W8 - How Heat Pumps Work HVAC (detailed explanation of reversing valve, heating/cooling modes for winter/summer operation)",
        "https://www.youtube.com/watch?v=hD8qDAekW18 - 2nd Law, Heat Engine & Refrigeration Cycles (16 of 25) (Kelvin-Planck/Clausius statements, heat engine vs. refrigeration cycle analysis)",
        "https://www.youtube.com/watch?v=uF4UGM6xMp8 - REFRIGERATION and Heat Pump Cycles in 10 Minutes! (complete cycle with all four processes, COP calculations, efficiency vs. performance)",
        "https://www.youtube.com/watch?v=M_qz9i2Rr6s - Carnot Refrigeration Cycle and Enthalpy in 4 Minutes! (ideal cycle with R134a example, saturation dome, work/heat calculations)",
        "https://www.youtube.com/watch?v=QBd2zraOe2k - Carnot Heat Engines, Efficiency, Refrigerators, Pumps, Entropy (70-minute comprehensive analysis of all thermodynamic cycles)",
        "https://www.youtube.com/watch?v=OXMwOZCMQWY - First Law of Thermodynamics | Refrigeration and Air Conditioning (energy balance in HVAC cycles, closed system first law)",
        "https://www.youtube.com/watch?v=o98mfpJSNuM - Heat Pump Cycles - Thermodynamics I (T-s and P-h diagrams, superheated state analysis, isentropic vs. actual processes)",
        "https://www.youtube.com/watch?v=6sSDXurPX-s - How does an air conditioner actually work? - Anna Rothschild (heat pump physics for both heating and cooling, benefits and drawbacks)",
        "https://www.youtube.com/watch?v=-vU9x3dFMrU - How a Heat Pump Works | This Old House (visual mockup showing compressor operation, valve switching, fan speed control for efficient temperature maintenance)"
      ],
      "websites": [
        "https://docs.nrel.gov/docs/fy18osti/71288.pdf - Total Thermal Management of Battery Electric Vehicles (NREL comprehensive guide on integrated HVAC, battery cooling, powertrain thermal loops)",
        "https://www.sae.org/publications/technical-papers/content/2023-01-1610/ - Development and Validation of Battery Thermal Management System (BEV cold weather operation, electrochemical cell modeling, test validation)",
        "https://www.schaeffler.com/en/media/dates-events/kolloquium/digital-conference-book-2022/thermal-management-system-electric-vehi - Thermal Management for Electric Vehicles (Schaeffler Group overview of battery, motor, inverter thermal requirements, -7°C range loss analysis)",
        "https://knaufautomotive.com/air-conditioning-in-an-ev/ - Air Conditioning in an EV: How Heating Works (refrigeration cycle in EVs, electric compressor vs. engine-driven, heat pump efficiency)",
        "https://thermalscience.rs/pdfs/papers-2024/TSCI2402287D.pdf - Design and Performance Analysis of Motor Phase Change Heat Storage (heat pump HVAC system design, compressor efficiency models, COP optimization)",
        "https://www.neuralconcept.com/post/how-does-air-conditioning-work-in-electric-cars - How Does Air Conditioning Work in Electric Cars? (thermodynamic principles, AC compressor, condenser, expansion valve, evaporator operation)",
        "https://www.sciencedirect.com/science/article/pii/S2215098620342361 - Experimental Study of Entropy Generation and Energy Performance (nanofluid thermal conductivity enhancement, automotive radiator optimization)",
        "https://resources.system-analysis.cadence.com/blog/msa2022-the-importance-of-thermal-management-in-electric-vehicles - The Importance of Thermal Management in EVs (battery health, power electronics reliability, motor efficiency preservation)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC12565862/ - Advances and Challenges in Battery Thermal Management (passive/active/hybrid BTMS, thermal throttling, fast charging thermal control)",
        "https://www.cedengineering.com/userfiles/M06-045%20-%20HVAC%20System%20for%20Cars%20and%20Automotive%20Vehicles%20-%20US.pdf - HVAC System for Cars and Automotive Vehicles (comprehensive HVAC design guide, heater core, evaporator, latent heat importance)",
        "https://chargedevs.com/wp-content/uploads/2022/01/C-Therm-EV-WP.pdf - Thermal Management in Electric Vehicles (Charged EVs white paper on thermal conductivity, cell-to-cell heat transfer, module design)",
        "https://www.nissan-global.com/EN/INNOVATION/TECHNOLOGY/ARCHIVE/EV_THERMAL_CONDITIONING/ - Electric Vehicle Thermal Conditioning Functionality (Nissan integrated thermal system, waste heat recovery, intelligent navigation optimization)",
        "https://pubs.aip.org/aip/jrse/article/18/1/015501/3376920/Thermodynamic-analysis-of-a-high-temperature-heat - Thermodynamic Analysis of High-Temperature Heat Pump (COP analysis, working fluid selection, performance optimization)",
        "https://teksguide.org/resource/124-applications-thermodynamics-heat-engines-heat-pumps-and-refrigerators - Heat Engines, Heat Pumps, and Refrigerators (thermodynamic cycle principles and applications)",
        "https://pdhonline.com/courses/m244/m244content.pdf - Fundamentals of Mechanical Refrigeration Systems (comprehensive refrigeration theory, vapor-compression cycle modifications, practical design)"
      ],
      "tools": [
        "MATLAB/Simulink Simscape Fluids - Thermal system modeling with coolant flow dynamics, heat exchangers, pumps - https://www.mathworks.com/products/simscape.html",
        "COOLPROP Refrigerant Property Library (Free) - Open-source thermodynamic properties for R134a, R1234yf, other refrigerants - https://www.coolprop.org/",
        "ANSYS CFX / ANSYS Fluent - Computational fluid dynamics for coolant flow, heat exchanger design, temperature distribution - https://www.ansys.com/",
        "EES (Engineering Equation Solver) - Thermodynamic cycle analysis, property calculations, system optimization - https://www.nist.gov/services-resources/software/equations-state",
        "Psychrometric Chart Tools (Free) - Online calculators for HVAC air conditioning design (humidity, enthalpy, cooling load) - https://www.psychrometricchart.com/",
        "Motor Thermal Simulation (JMAG, Ansys Maxwell) - Electromagnetic heating, thermal runaway analysis - https://www.jmag-international.com/",
        "Battery Thermal Modeling Software (COMSOL, FloEFD) - Electrochemical heat generation, cell-level temperature distribution - https://www.comsol.com/",
        "Thermoelectric Generator (TEG) Design Tools - Modeling waste heat recovery systems for cabin preheating - https://www.thermoelectric.com/"
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
  "description": "Comprehensive study of conduction, convection, and radiation heat transfer mechanisms. Covers thermal resistance networks, heat exchangers, steady-state and transient thermal analysis, and Finite Element Analysis (FEA) for thermal problems with applications to thermal management systems in electric vehicles.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Electric vehicle batteries are extremely sensitive to temperature. A 3°C temperature gradient inside a battery cell can accelerate degradation by 300%—that's not an exaggeration, that's published research. ENGR 135 teaches you the physics of how heat flows (conduction through solid materials, convection by liquid coolant, radiation to the environment) and how to predict and control that heat precisely. You'll learn thermal resistance networks—an elegant method to model complex multi-component systems like an EV's battery pack, motor, and inverter as a simple electrical-looking circuit. You'll master Finite Element Analysis (FEA) using ANSYS Mechanical to predict temperature distributions in 3D geometries that analytical equations cannot solve. You'll understand why every modern EV has a sophisticated Battery Thermal Management System (BTMS) that keeps cells within a narrow 15-35°C window for optimal performance and lifespan. Without this course, you won't understand the thermal-electrical interdependencies that make the difference between a 300-mile EV and a 400-mile EV, or between a 10-year and 5-year battery warranty. Tesla, BMW, and Lucid all employ thermal engineers who live and breathe this material.",
    "realWorldApplications": [
      "Battery thermal gradient minimization—thermal models predict that 3°C internal gradient accelerates degradation 300%; design optimization reduces gradients <5°C for homogeneous cell aging",
      "Pack-level degradation analysis—experimental validation shows 30°C thermal gradient (range 20-50°C) across parallel cells doubles degradation rate; thermal FEA validates cooling uniformity",
      "State of Charge (SOC) estimation accuracy—temperature errors >5°C introduce ~5% SOC calculation error; precise thermal models maintain <±2°C for accurate range prediction",
      "Cold-start battery warming—PTC heaters warm battery to optimal 15-35°C before fast charging; thermal resistance networks calculate warmup time (typically 5-15 min) and heating energy cost",
      "Motor winding hot-spot prediction—thermal models calculate winding temperature (often 20-30°C above case temperature) accounting for insulation thermal resistance and convection from cooling jacket",
      "Inverter IGBT junction temperature—high-power electronics dissipate 500+ W; thermal models use junction-to-case resistance (Θ_jc) from datasheets to predict whether device will exceed 150°C rating",
      "Dual-loop thermal architecture optimization—motor and battery on separate coolant loops; thermal resistance networks calculate optimal temperature setpoints to maximize combined system efficiency",
      "Heat exchanger UA sizing—effectiveness-NTU method determines required heat exchanger size to dissipate peak 50+ kW thermal load during 3C fast charge and continuous highway operation",
      "Immersion cooling performance prediction—dielectric fluid thermal properties (conductivity, specific heat, viscosity) feed into transient FEA to predict cell temperature uniformity vs air cooling",
      "Transient thermal response during fast charging—FEA predicts peak cell temperature spike during 5-min fast charge; validates thermal management margins keep cells <60°C max temperature"
    ],
    "learningOutcomes": [
      "Understand the three modes of heat transfer: conduction (through solids), convection (by fluid flow), and radiation (electromagnetic); identify dominant mode in each EV application",
      "Apply Fourier's law of conduction: Q = -k·A·(dT/dx); calculate thermal conductivity effects on temperature drop across battery separators, motor insulation, and heat sink materials",
      "Calculate conduction thermal resistance R = L/(k·A) and apply thermal resistance networks with series/parallel combinations analogous to electrical circuits",
      "Understand Newton's law of cooling: Q = h·A·ΔT; estimate convection coefficients for air cooling (h ~25 W/m²·K) vs liquid cooling (h ~1000-3000 W/m²·K)",
      "Apply the thermal resistance network method to complex multi-component systems; calculate temperature drops across interfaces and intermediate node temperatures",
      "Design and analyze heat exchangers: understand effectiveness-NTU method; select appropriate counterflow/parallel-flow configuration for BTMS heat exchangers",
      "Understand radiation heat transfer fundamentals: Stefan-Boltzmann law, emissivity, view factors; recognize when radiation dominates (high-temperature components, vacuum spaces)",
      "Formulate steady-state heat conduction problems; solve 1D/2D/3D conduction equations analytically (simple geometries) and numerically (complex geometries)",
      "Perform transient thermal analysis: understand thermal time constants τ = ρ·c·V/(h·A); predict temperature response to time-varying boundary conditions (e.g., fast charging)",
      "Set up and solve thermal FEA problems in ANSYS Mechanical: geometry import, material properties, boundary conditions (temperature, heat flux, convection, radiation), meshing, solver setup, post-processing",
      "Validate thermal models: compare FEA predictions against analytical solutions, experimental data, and datasheet specifications; estimate and justify model uncertainties",
      "Apply thermal design principles to EV systems: predict battery hot-spot temperatures, motor/inverter thermal behavior, verify thermal management system adequacy under all operating scenarios"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=kNZi12OV9Xc - Conduction, Convection, and Radiation (5 min intuitive overview with Earth examples, Amoeba Sisters)",
        "https://www.youtube.com/watch?v=bRZwzy0xvhM - Heat Transfer - Conduction, Convection, and Radiation (11 min comprehensive, The Organic Chemistry Tutor, direct contact vs fluid flow vs radiation)",
        "https://www.youtube.com/watch?v=HpCvWuvCUoA - Conduction -Convection- Radiation-Heat Transfer (5 min Earth Science demonstrations)",
        "https://www.youtube.com/watch?v=2z1Z8iZ0Mxg - Convection, Conduction, and Radiation Video (3 min visual explanation of heat mechanisms)",
        "https://www.youtube.com/watch?v=Me60Ti0E_rY - Heat Transfer – Conduction, Convection and Radiation (4 min Next Generation Science visual learning)",
        "https://www.youtube.com/watch?v=oyrpqX3Nkrc - Thermal Resistance Modeling (SimScale, 44 min comprehensive, thermal networks, junction temperature, CFD coupling for EV thermal design)",
        "https://www.youtube.com/watch?v=xwSMA7ui36w - Thermal Circuit Diagram with Conduction, Convection... (Brian Bernard, 17 min, series/parallel circuits, all three thermal resistance types)",
        "https://www.youtube.com/watch?v=YMaIIIZtgoY - Heat Transfer L6 p3 - Example - Thermal Resistance (15 min university lecture, series circuit, Ohm's law analogy, intermediate temperature calculation)",
        "https://www.youtube.com/watch?v=icDaI2cK-cI - Thermal Circuits 2: Nodal Networks (Precision Stuff, 19 min, complex multi-node systems, transient behavior with thermal capacitance)",
        "https://www.youtube.com/watch?v=eIU3vreytcs - FEA of Heat Transfer through a Fin using Ansys Workbench (30 min complete FEA workflow, geometry→mesh→BC→solve→validate, fin heat transfer application)",
        "https://www.ansys.com/applications/thermal-analysis-simulation-software - Thermal Analysis and Simulation Software | Ansys (overview of FEA thermal capabilities)",
        "https://www.youtube.com/watch?v=308 - Understanding Datasheet Thermal Parameters and IC Junction Temperature (thermal resistance, PSI parameter, thermal networks, PCB layout recommendations)"
      ],
      "websites": [
        "https://faculty.ucmerced.edu/gdiaz/courses/HeatTransf_html.html - UC Merced ENGR 135 Heat Transfer Course (official course page, Incropera & DeWitt textbook reference)",
        "https://ev-lectron.com/blogs/blog/ev-battery-cooling-how-does-it-work - EV Battery Cooling - How Does It Work? (BTMS integration, liquid vs air cooling, waste heat recovery)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC10955900/ - Degradation in parallel-connected lithium-ion battery packs under thermal gradients (NIH/PMC, experimental study on thermal gradient effects, 30°C gradient doubles degradation)",
        "https://polymerscience.com/what-methods-are-used-for-thermal-management-of-ev-batteries/ - What Methods Are Used for Thermal Management of EV Batteries? (active vs passive cooling, power density, weight reduction)",
        "https://www.nature.com/articles/s44172-023-00124-w - Effect of thermal gradients on inhomogeneous degradation in lithium-ion cells (Nature Communications, 3°C gradient accelerates degradation 300%)",
        "https://www.sciencedirect.com/science/article/pii/S2352152X25018274 - Lithium-ion battery thermal modelling and characterization (comprehensive review of thermal models, equivalent circuit models)",
        "https://www.emobility-engineering.com/thermal-management-in-electric-vehicles-e-motor-cooling-technology/ - Thermal Management in Electric Vehicles | E-Motor Cooling (motor cooling jackets, TIM materials, Tesla/Lucid/BMW strategies)",
        "https://www.batterydesign.net/cell-temperature-gradient/ - Cell Temperature Gradient (importance of minimizing temperature gradients, thermal design principles)",
        "https://www.sciencedirect.com/science/article/pii/S0378775324003665/pdf - Energy-efficient operation of thermal management system (battery thermal modeling, convective heat transfer)",
        "https://docs.nrel.gov/docs/fy24osti/89032.pdf - Li-Ion Battery Thermal Characterization for Thermal Management (NREL technical report, heat generation, thermal properties, BTMS requirements)",
        "https://simutechgroup.com/ansys-software/structures/ - Ansys Finite Element Analysis (FEA) Software (thermal analysis capabilities, steady-state and transient)",
        "https://www.ansys.com/simulation-topics/what-is-finite-element-analysis - What is Finite Element Analysis (FEA)? - Ansys (introduction to FEA, thermal solver overview)",
        "https://www.ansys.com/products/structures/ansys-mechanical - Ansys Mechanical | Structural FEA Analysis Software (professional thermal FEA platform)",
        "https://catalog.ucmerced.edu - UC Merced Course Catalog (official course information)"
      ],
      "tools": [
        "ANSYS Mechanical - Industry-standard FEA software for thermal analysis (steady-state, transient, conduction/convection/radiation) - https://www.ansys.com/products/structures/ansys-mechanical",
        "MATLAB/Simulink with Simscape Thermal - Thermal modeling and network analysis - https://www.mathworks.com/products/simscape.html",
        "SimScale - Cloud-based FEA platform for rapid thermal prototyping and optimization - https://www.simscale.com",
        "COMSOL Multiphysics - Multiphysics coupling of thermal + electromagnetic + structural phenomena",
        "Incropera & DeWitt - Textbook: 'Fundamentals of Heat and Mass Transfer' (standard ENGR 135 reference with charts, equations, property tables)",
        "Thermal property databases: MatWeb, Matweb, manufacturer datasheets (thermal conductivity, specific heat, density of materials)",
        "Thermal resistance calculator spreadsheet - Calculate series/parallel thermal networks for battery/motor/inverter systems",
        "Python with NumPy/SciPy/Matplotlib - Thermal modeling scripts, curve fitting, FEA post-processing visualization",
        "Oscilloscope + thermocouples - Experimental thermal validation on prototype cooling systems (compare measured vs predicted temperatures)",
        "Thermal imaging camera (FLIR) - Visual temperature mapping to validate thermal model predictions against real hardware"
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
  "description": "Master the physics and mathematics of mechanical behavior of materials and structural components under load. Learn to analyze stress and strain, design components that won't fail, select optimal materials for EV systems, and use Finite Element Analysis (FEA) to predict structural performance. Apply strength-of-materials principles to critical EV designs: battery pack casings that survive 30G crashes, motor mounts that handle thermal expansion, lightweight composite chassis that reduce weight while maintaining rigidity.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Strength of Materials is the engineering foundation that prevents catastrophic failures in electric vehicles. Every structural component—battery casing, motor mounting bracket, chassis frame, thermal interface—must withstand mechanical loads (acceleration, braking, impacts), thermal stresses (extreme temperatures, thermal cycling), and fatigue from vibration across millions of operating hours. A motor bracket that doesn't account for thermal expansion can misalign under operating temperature, causing premature bearing failure. A battery case designed without stress concentration analysis can rupture during a crash, exposing cells and creating fire hazard. A composite chassis optimized only for weight without fatigue analysis can fail under normal road vibrations. This course teaches the rigorous analysis methods to ensure EV components are safe, reliable, and optimized for weight. You'll learn to use stress-strain diagrams to select materials, perform FEA simulations to identify failure modes, calculate thermal stresses from material incompatibilities, and apply safety factors that reflect real-world uncertainties. Modern EV design relies heavily on lightweight composite materials (carbon fiber) that require advanced analysis—anisotropic properties, laminate theory, delamination failure modes. Mastery of strength of materials separates engineers who design components that survive years of real-world operation from those who encounter field failures. Every major OEM (Tesla, BMW, Lucid, Rivian) employs teams of stress analysts optimizing every component for minimum weight without sacrificing reliability or safety.",
    "realWorldApplications": [
      "Battery pack structural design: 250+ MPa yield strength aluminum/composite casing withstanding 30G crash impact and protecting 300+ cylindrical cells",
      "Thermal stress analysis: Motor mounts experiencing thermal expansion misalignment from -40°C cold start to +80°C continuous operation",
      "Lightweight chassis design: Carbon fiber composites reducing weight 40% vs. steel while maintaining bending stiffness and fatigue life",
      "Stress concentration analysis: Identifying failure initiation at bolt holes, welds, and geometric discontinuities using stress concentration factors",
      "Composite material design: Laminate stacking sequences optimized for torsional stiffness (traction control requirements) while minimizing weight",
      "Thermal cycling fatigue: Predicting crack initiation in welded battery case corners after 500+ fast charging cycles",
      "Motor mounting bracket: FEA-optimized design minimizing stress while reducing weight from 2.5 kg to 1.8 kg",
      "Finite Element Analysis (FEA): Predicting structural performance before physical prototyping, reducing development time and cost",
      "Material selection optimization: Trade-offs between strength, weight, cost, and manufacturability for different EV components",
      "Regenerative braking mechanical loads: Sudden high-torque events causing transient stress spikes in drivetrain components"
    ],
    "learningOutcomes": [
      "Define and calculate stress (normal, shear) and strain; apply Hooke's Law for elastic deformation",
      "Read and interpret stress-strain curves; identify yield point, ultimate strength, fracture strength for material selection",
      "Analyze statically indeterminate structures; solve for internal forces and reactions using equilibrium equations",
      "Draw shear force and bending moment diagrams; calculate maximum stresses in beams under various loading",
      "Perform stress concentration analysis using Kt factors; identify critical failure locations at design features",
      "Calculate thermal stresses from coefficient of thermal expansion (CTE) mismatches between materials",
      "Predict fatigue failure from repeated cyclic loading (S-N curves, Goodman diagrams)",
      "Design columns and analyze buckling failure; apply Euler formula and eccentric loading effects",
      "Analyze composite laminates using classical laminate theory; understand fiber orientation, anisotropic properties",
      "Set up and interpret FEA results; use stress analysis to guide design optimization and material selection"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=ZTAWCE9EUug - Stress-Strain Analysis Explained | Mechanics of Solids Live Session (31-min interactive session on stress, strain, Hooke's law, yield point, ultimate strength fundamentals)",
        "https://www.youtube.com/watch?v=Q2Wn02VFvOA - Lecture 1 Introduction to Stress and Strain (Mechanics of Materials) (comprehensive intro covering equilibrium, shear/bending, torsion, failure criteria, strain gage measurement)",
        "https://www.youtube.com/watch?v=NLt-uaNIfkA - Structural Steel Connection Design with Finite Element Analysis (25-min practical FEA tutorial showing bolted connection design, modeling basics, strengthening optimization)",
        "https://www.youtube.com/watch?v=7DreeNX95yU - Fundamentals of ANSYS Structural Finite Element Analysis Part 1 (54-min comprehensive ANSYS overview comparing 3D, shell, beam+shell modeling approaches)",
        "https://www.youtube.com/watch?v=ltdtmC3Q9Yc - FreeCAD Daily #12: Structural FEM Analysis for Your BIM Model (15-min open-source FEA tutorial for structural analysis and load/stress evaluation)",
        "https://www.youtube.com/watch?v=8wgwSZNxNUo - Stress strain diagram explained (materials testing procedure, elastic/plastic regions, yield stress, unloading behavior, ductility)",
        "https://www.youtube.com/watch?v=CAkkVIsNxDE - Finite Element Analysis Explained | Things Must Know About FEA (explains FEA methodology, element types, cracking analysis, local material reinforcement)",
        "https://www.youtube.com/watch?v=P38xMOqvytU - Lesson 9 - Stress Strain Diagram, Guaranteed for Exam 1! (exam-focused mechanics of materials on stress, strain, deformation fundamentals)",
        "https://www.youtube.com/watch?v=JYO3hHLiH8s - FEA Modeling Tutorial from Start to Finish (complete composite FEA demonstration in Femap showing element setup, boundary conditions, layups, enforcement)",
        "https://www.youtube.com/watch?v=lXGbTYYtzdQ - Materials Science and Engineering - Stress (basic stress-strain behavior, material deformation under loading, elastic/plastic response)",
        "https://www.youtube.com/watch?v=270 - Failure Mode Analysis of Carbon Fiber Composite Laminates (acoustic emission testing revealing matrix cracks, delamination, fiber fracture in composite laminates)"
      ],
      "websites": [
        "https://publications.lib.chalmers.se/records/fulltext/256368/256368.pdf - Structural Battery Composites in Electric Vehicle Design (carbon fiber composite battery casings, bi-continuous polymer matrices, multi-functional materials)",
        "https://gesrepair.com/thermal-expansion-causes-hidden-alignment-shifts-in-motor-installations - Thermal Expansion Causes Hidden Alignment Shifts in Motor Installations (thermal growth offsets for proper alignment, common failure mechanisms from thermal mismatch)",
        "https://ijrpr.com/uploads/V6ISSUE1/IJRPR37659.pdf - Design and Optimization of Lightweight Electric Bike Chassis Using Composite Materials (FEA stress analysis, composite material optimization, weight reduction via topology optimization)",
        "https://msecore.northwestern.edu/390/2023/group4__Battery_Casing.pdf - Electric Vehicle Battery Casing (material selection for hardness/toughness-to-weight ratios, Tesla benchmark analysis, A390 aluminum optimization)",
        "https://www.irjet.net/archives/V8/i8/IRJET-V8I8333.pdf - Design And Analysis Of Chassis For Electric Vehicle (static/modal analysis, aluminum vs. composite material comparison, cross-member optimization)",
        "https://vitrek.com/applications/thermal-expansion-on-automobile-engine/ - Thermal Expansion on Automobile Engines (relative motion between engine block and oil pan, capacitance monitoring for thermal stress measurement)",
        "https://www.sciencedirect.com/science/article/pii/S2214785321068176 - Numerical Analysis of Heat Transfer in Electric Motor Casing (thermal stress in motor casings, CTE mismatch effects, installation temperature considerations)",
        "https://dspace.mit.edu/bitstream/handle/1721.1/147426/MacNeely-oliverm-sb-meche-2022-thesis.pdf - Design and Analysis of Monocoque Chassis for Electric Vehicle (composite chassis design, material selection optimization, FSAE competition framework)",
        "https://ieeexplore.ieee.org/document/7873558/ - 1P15S Lithium Battery Pack: Aluminum 5052-0 Strength of Material Analysis (battery pack structural analysis with aluminum construction)",
        "https://eprints.lancs.ac.uk/id/eprint/155987/3/FEA_Engine_Braket_Rev_006.pdf - Strength Based Design Analysis of Engine Mounting Bracket (FEA stress analysis, Von-Mises stress distribution, deformation under engine torsion)",
        "https://www.sciencedirect.com/science/article/abs/pii/S1110016824015886 - Lightweight Composite Materials in Automotive Engineering (comprehensive review of CFRP, fiber-reinforced materials, EV applications)",
        "https://www.sciencedirect.com/science/article/abs/pii/S2215098620342361 - Investigation of Failure Mechanism for Carbon Fiber Composites (multiscale failure analysis, Hashin criterion, optimization for torsional performance, rib reinforcement design)",
        "https://www.nipponsteel.com/en/tech/report/pdf/126-15.pdf - Thermal Strain Measurement Technology of Stainless Steel Exhaust (thermal cycling fatigue, thermal stress analysis, CAE prediction vs. experimental validation)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746123/ - Integrated Computational Materials Engineering Framework for CFRP Failure Analysis (multi-scale composite modeling, lightweight vehicle applications)",
        "https://onlinelibrary.wiley.com/doi/10.1155/2021/6611868 - Failure Mode Analysis of Carbon Fiber Composite Laminates (acoustic emission testing, laminate layup effects on fiber fracture and delamination)",
        "https://www.addcomposites.com/post/defects-and-damage-in-composite-materials-and-structures - Defects and Damage in Composite Materials (matrix cracks, delaminations, fiber cuts affecting composite performance)"
      ],
      "tools": [
        "ANSYS Mechanical - Professional FEA software for structural analysis, thermal-stress coupling, composite failure prediction - https://www.ansys.com/",
        "MATLAB Symbolic Math Toolbox - Stress-strain calculations, material property databases, design optimization algorithms - https://www.mathworks.com/products/symbolic.html",
        "SolidWorks Simulation - Integrated FEA within CAD, quick stress analysis for design iterations - https://www.solidworks.com/",
        "ABAQUS - Advanced nonlinear FEA for composite materials, plasticity, damage analysis - https://www.3ds.com/products-services/simulia/products/abaqus/",
        "FreeCAD FEM Workbench (Free) - Open-source FEA tool with mesh generation and solver integration - https://www.freecadweb.org/",
        "COMSOL Multiphysics - Multi-physics coupling (structural + thermal stress analysis) - https://www.comsol.com/",
        "MatWeb Material Database (Free) - Online resource for material properties (yield strength, CTE, density) - http://www.matweb.com/",
        "Calculator/Spreadsheet Tools - For manual stress analysis, thermal expansion calculations, safety factor determination - https://www.libreoffice.org/"
      ]
    }
  }
}
,
  {
  "id": "engr-152-physics-of-energy",
  "code": "ENGR 152",
  "name": "The Physics of Energy",
  "fullName": "ENGR 152: The Physics of Energy",
  "description": "Comprehensive survey of physical science underlying energy conversion, transportation, storage, and use. Covers energy forms (mechanical, electrical, thermal, chemical), thermodynamic laws, conversion processes, efficiency analysis, and applications to modern energy technologies including renewables and electric vehicles.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Understanding ENGR 152 is like holding the master key to EV engineering. This course teaches you the absolute fundamental limits on what's possible in any energy system—and why. The first law of thermodynamics simply states energy cannot be created or destroyed—it can only convert from one form to another (battery chemical energy → motor mechanical energy, with inevitable thermal losses along the way). The second law is subtly more profound: it tells you that energy always degrades in usefulness over time. This explains why an EV motor at peak efficiency is only 94-97% efficient, never 100%; why regenerative braking only recovers 5-15% of kinetic energy, not all of it; and why thermal management systems require constant energy input to cool batteries. You'll learn to calculate well-to-wheel efficiency—how many kWh from a power plant actually reach the wheels—which varies from 50-60% GHG benefit in California (clean grid) to 36% in coal regions, but still 2-3× better than internal combustion engines. Tesla, BMW, and every EV manufacturer uses these principles to optimize motor efficiency curves, battery thermal strategies, and power management algorithms. This course teaches the physics that unlies all energy engineering decisions.",
    "realWorldApplications": [
      "EV tank-to-wheel efficiency calculation—electric motors convert 85-90% of battery energy to mechanical motion, 3-4× more efficient than ICE engines (~30% efficiency)",
      "Well-to-wheel (WTW) analysis for regional vehicle emissions—grid carbon intensity dramatically affects total EV benefit; California grid (60%+ clean) → 50-60% GHG reduction vs ICE; coal-heavy grid → 36% WTW efficiency (still better than ICE at ~20%)",
      "Regenerative braking energy recovery—during deceleration, motor acts as generator recovering 5-15% of kinetic energy; first law explains energy conservation; second law explains why 100% recovery is impossible",
      "Motor efficiency mapping optimization—electric motors peak at 94-97% efficiency only in narrow speed/load window; second law explains why operating points matter; designers keep motor in peak zone to maximize range",
      "Battery charge/discharge cycle efficiency—accounting for internal resistance losses, charge efficiency ~90-95% round-trip; first law energy balance; second law governs minimum voltage drop",
      "Thermal management parasitic load calculation—HVAC and cooling pumps add 5-10% to energy consumption; first law tracks energy split between propulsion and thermal; second law determines minimum cooling power needed",
      "Dual-loop thermal architecture with waste heat recovery—motor/inverter waste heat preheats battery in cold weather; first law enables energy balance across subsystems; second law governs heat flow direction and minimum work required",
      "Power electronics efficiency analysis—IGBTs/MOSFETs convert 95-99% of switching power; SiC devices achieve >98%; second law explains switching losses as fundamental entropy increase",
      "Grid-to-vehicle (G2V) and vehicle-to-grid (V2G) round-trip efficiency—battery storage for grid support achieves 85-90% round-trip efficiency; first law tracks energy flows; second law governs charging/discharging losses",
      "Lifecycle energy analysis and manufacturing impact—EV battery production requires 46,581 MJ vs 33,924 MJ for ICE vehicle; justified because 3-4× lifetime WTW efficiency advantage recovers manufacturing energy debt within 2-3 years of typical driving"
    ],
    "learningOutcomes": [
      "Understand energy forms: mechanical (kinetic, potential), electrical (voltage, current, power), thermal (heat, temperature), chemical (battery electrochemistry); understand conversions between forms",
      "Apply the first law of thermodynamics: energy conservation; calculate energy balance in complex systems (battery + motor + thermal management); identify where energy is lost or stored",
      "Apply the second law of thermodynamics: entropy increases in real processes; understand why processes occur in one direction (heat flows from hot to cold, not vice versa) and why efficiency is always <100%",
      "Calculate Carnot efficiency limits: maximum theoretical efficiency for heat engines; understand why real systems are more limited than Carnot bound",
      "Analyze motor efficiency maps: understand why motors have peak efficiency at specific speed/load points; predict efficiency at off-peak operating conditions; optimize gear ratios to keep motor in high-efficiency zone",
      "Perform well-to-wheel efficiency analysis: break down total EV energy flow from power plant through grid, charger, battery, motor to wheels; identify major loss stages; understand regional grid mix impact on emissions",
      "Calculate regenerative braking energy recovery: understand fundamental limits on how much kinetic energy can be recovered; estimate range improvement from regen in various driving cycles",
      "Design thermal management energy budgets: estimate heating/cooling parasitic loads; optimize for minimum thermal energy consumption while maintaining safe operating temperatures",
      "Perform lifecycle energy analysis: calculate manufacturing energy debt and payback period for EV battery; understand why higher production energy is justified by superior use-phase efficiency",
      "Apply energy cascading principles: design systems where waste heat from one component (motor) preheats another (battery); use first law to ensure energy balance; use second law to enforce one-directional heat flow",
      "Understand grid integration: compare G2V (charging) vs V2G (discharging) efficiency; predict battery lifetime impact of repeated charge cycles; optimize charging strategies for minimal losses",
      "Evaluate trade-offs in energy system design: balance efficiency vs cost vs weight vs reliability; use thermodynamic principles to justify design decisions (e.g., why higher voltage systems improve efficiency)"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=DWiCaDPM7Hk - Second Law of Thermodynamics - Heat Energy, Entropy (The Organic Chemistry Tutor, 11 min, entropy increase, why heat flows from hot to cold)",
        "https://www.youtube.com/watch?v=f1OokOgtcqg - First and second laws of thermodynamics | Khan Academy (13 min, system/surroundings, energy conservation, entropy increase, refrigerator example)",
        "https://www.youtube.com/watch?v=iGBkEGnStnA - First and Second Law of Thermodynamics (Dr Kidd Engineering, 15 min, energy flow direction, Carnot cycle, isentropic processes, practical engineering)",
        "https://www.youtube.com/watch?v=Ih1NJ0aQI6s - Thermodynamics 2 : First Law of Thermodynamics (15 min university lecture, internal energy, first law equation ΔU = Q - W, examples)",
        "https://www.youtube.com/watch?v=SOpSbCxmaAc - 2nd Law Intro and POWER CYCLES in 10 Minutes! (10 min overview, heat engines, steam power plant, Rankine cycle, efficiency limits)"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=79573 - ENGR 152: The Physics of Energy - UC Merced Catalog (official course description)",
        "https://www.renaultgroup.com/en/magazine/energy-and-motorization/the-energy-efficiency-of-an-electric-car-motor/ - The energy efficiency of an electric car motor (Renault Group, 90% efficiency explanation, synchronous motor operation, regenerative braking boost to near 100%)",
        "https://evreporter.com/understanding-the-complete-efficiency-picture-of-electric-vehicles/ - Understanding the complete efficiency picture of electric vehicles (EV Reporter, 85-90% battery-to-wheel, well-to-wheel analysis by region, manufacturing energy debt payback)",
        "https://www.evengineeringonline.com/what-is-well-to-wheel-efficiency-in-an-ev/ - What is well-to-wheel efficiency in an EV? (detailed explanation of WTW vs tank-to-wheel, regional electricity mix impact, assumptions in analysis)",
        "https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/The_Four_Laws_of_Thermodynamics - The Four Laws of Thermodynamics (Chemistry LibreTexts, comprehensive reference on all four laws)",
        "https://en.wikipedia.org/wiki/Laws_of_thermodynamics - Laws of thermodynamics (Wikipedia, overview of all four laws, applications, history)",
        "https://www.britannica.com/science/thermodynamics - Thermodynamics | Laws, Definition, & Equations (Britannica, authoritative definitions, mathematical expressions)",
        "https://journalwjarr.com/sites/default/files/fulltext_pdf/WJARR-2025-4226.pdf - Solar and Wind Energy Systems Optimization Through Battery Storage (PDF, renewable efficiency, battery storage integration, grid stability)",
        "https://journaljerr.com/index.php/JERR/article/view/1482 - A Global Analysis of Well-to-Wheel Efficiency in Electric Vehicles (journal study on WTW efficiency variation by region, electricity generation mix)",
        "https://www.sciencedirect.com/science/article/abs/pii/S0301421521004225 - Well-to-wheel analysis of greenhouse gas emissions and energy (comparative study Australia/New Zealand, GHG reduction 50-60% for clean grids vs coal regions)",
        "https://www1.eere.energy.gov/bioenergy/pdfs/well_to_wheels_analysis.pdf - Well-to-Wheels Analysis of Advanced Fuel/Vehicle Systems (DOE/EERE official methodology for WTW calculations, efficiency maps)",
        "https://www.energy.gov/eere/articles/renewable-electricity-generation-fact-sheet-office-energy-efficiency-and-renewable - Renewable Electricity Generation (DOE Fact Sheet, solar PV efficiency 20-43%, wind turbine efficiency 35-45%, geothermal)",
        "https://www.weforum.org/stories/2022/03/solar-wind-power-renewable-energy-climate-change/ - Solar vs wind power: Which energy is best? (World Economic Forum, solar ~20%, wind ~50% of incident energy capture)",
        "https://en.wikipedia.org/wiki/Energy_conversion_efficiency - Energy conversion efficiency (Wikipedia, efficiency ranges for various technologies including EV motors)",
        "https://www.chadsprep.com/chads-general-chemistry-videos/3-laws-of-thermodynamics-definition/ - The Laws of Thermodynamics (Chad's Prep, educational video notes on all three laws with examples)"
      ],
      "tools": [
        "Well-to-wheel calculation spreadsheet - Compare EV efficiency across different regional electricity grids (carbon intensity variation)",
        "Motor efficiency map plotter - Visualize efficiency across speed/load combinations; identify peak efficiency zone; optimize gear ratios",
        "Thermal energy balance calculator - Account for all heating/cooling loads (propulsion losses, HVAC, auxiliary); estimate parasitic load percentage",
        "Battery lifecycle analysis tool - Calculate manufacturing energy debt and payback period based on driving patterns",
        "MATLAB/Simulink Energy System Toolbox - Build detailed energy system models with first law conservation and second law irreversibilities",
        "Python with NumPy/SciPy - Write scripts for WTW efficiency calculations, sensitivity analysis to grid mix, comparison tools",
        "Carnot efficiency calculator - Understand theoretical limits for any heat engine or heat pump based on temperature extremes",
        "Regenerative braking energy recovery estimator - Predict kWh recovered in different driving cycles (EPA, WLTP, city/highway blends)",
        "Power electronics loss calculator - Estimate IGBT/MOSFET switching and conduction losses at different operating points",
        "EV efficiency database (Tesla Model 3/Y, BMW i7, Lucid Air, etc.) - Compare real-world efficiency metrics and efficiency maps across vehicles"
      ]
    }
  }
}
,
];

export const tier2Courses: TierCourse[] = [
  {
  "id": "ee-180-autonomous-vehicles",
  "code": "EE 180",
  "name": "Autonomous Vehicles",
  "fullName": "EE 180: Autonomous Vehicles",
  "description": "Comprehensive study of autonomous vehicle systems: history, SAE classification standards, system architecture (perception, localization, planning, control), sensor fusion, computer vision, deep learning, path planning algorithms, and real-world implementations of self-driving technology.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Autonomous vehicles (AVs) represent the ultimate convergence of electrical engineering, software, and mechanical systems—and they're rapidly becoming reality. EE 180 teaches you the complete AV software stack: how 20+ sensors (cameras, LiDAR, radar) feed into sensor fusion algorithms that create a real-time 3D model of the world around the vehicle; how deep learning networks (YOLO, PointPillars) detect pedestrians and obstacles at 30+ FPS; how path planning algorithms like RRT-Connect generate safe, optimized trajectories through dense urban traffic; and how low-latency control loops execute steering/acceleration with millisecond precision. You'll understand why multi-sensor fusion is non-negotiable: radar sees through rain where cameras fail, LiDAR provides precise 3D geometry where radar is blind, cameras excel at classification. You'll learn the SAE Levels of Automation (Level 0-5) that frame the industry, and you'll work with real datasets (KITTI, nuScenes, Waymo) that automotive companies use for validation. Whether you're building AVs for Tesla, Waymo, Cruise, or Lucid—or developing ADAS (Advanced Driver Assistance Systems) for traditional automakers—this course is your technical foundation.",
    "realWorldApplications": [
      "Waymo/Alphabet autonomous taxi service: multi-sensor fusion (5+ cameras, 5x LiDAR, radar) processing 200+ GB/hour; runs Level 4 autonomy in San Francisco and Phoenix at scale",
      "Tesla Autopilot/FSD (Full Self-Driving): Vision-only approach with 8+ cameras, no LiDAR; deep learning end-to-end network predicts steering angle from images; Autopilot processes video in real-time on Tesla's custom SoC",
      "Lucid Air autonomous driving: Sensor fusion combining Lidar, cameras, radar; generates occupancy grid for obstacle avoidance; plans trajectories for highway driving and parking autonomy",
      "Advanced Driver Assistance Systems (ADAS) in mainstream vehicles: Lane keeping assist, collision avoidance, adaptive cruise control using camera + radar fusion; aftermarket and OEM implementations",
      "Real-time 3D object detection on LiDAR: PointPillars network processes Velodyne HDL64 point clouds at 10 FPS (100ms latency); detects vehicles within 0-100m range with <10cm position accuracy",
      "Computer vision for road scene understanding: YOLO networks detect lane markings, traffic signs, pedestrians, cyclists at 30+ FPS; runs on edge hardware (Nvidia Jetson) in vehicle",
      "Sensor fusion for adverse weather: RADAR penetrates rain/fog/snow; LiDAR generates accurate 3D geometry; camera provides semantic classification; hybrid fusion maintains detection in conditions where single sensors fail",
      "Path planning in urban traffic: Hybrid A* and RRT-Connect algorithms generate smooth, kinematically feasible trajectories; behavioral prediction forecasts pedestrian/vehicle movements 2-5 seconds ahead for safe collision avoidance",
      "Multi-modal deep learning: Networks trained on 100k+ labeled images + LiDAR point clouds (BDD100K, nuScenes, KITTI datasets); generalize to new cities/weather conditions via transfer learning",
      "Low-latency edge computing for real-time decisions: Sensor fusion + perception + planning + control loop executes in <100ms on embedded Nvidia/NI hardware; safety-critical timing for autonomous emergency braking"
    ],
    "learningOutcomes": [
      "Understand autonomous vehicle system architecture: the four pillars (Perception → Localization → Planning → Control) and how each subsystem integrates",
      "Classify autonomous vehicles using SAE Levels 0-5: understand implications of each level from driver assistance (Level 1) to full autonomy (Level 5)",
      "Explain sensor technologies and their role in AV perception: camera (visual classification), LiDAR (3D depth, range), radar (velocity, adverse weather robustness)",
      "Implement sensor fusion strategies: early fusion (raw data combination), mid-level fusion (feature combination), late fusion (decision fusion); understand trade-offs",
      "Apply computer vision algorithms for AV: YOLO for real-time object detection; understand CNN architecture, anchor boxes, non-maximum suppression",
      "Process LiDAR point clouds: understand 3D coordinate transformation, point cloud preprocessing, 3D bounding box regression using PointPillars networks",
      "Design fusion pipelines: combine camera + LiDAR + radar data; implement data association and temporal tracking across sensor streams",
      "Implement path planning algorithms: understand RRT, A*, and Hybrid A*; generate collision-free, kinematically feasible trajectories in dynamic environments",
      "Apply trajectory optimization: generate smooth paths with curvature constraints that vehicle dynamics can execute; optimize for safety and efficiency",
      "Understand behavioral prediction: predict pedestrian/vehicle movement 2-5 seconds into future; use predictions to improve trajectory planning safety margins",
      "Design real-time control loops: low-latency feedback from perception to actuation (steering, acceleration); meet millisecond timing constraints for safety",
      "Validate AV systems: use hardware-in-loop testing, sensor simulation, and real-world dataset benchmarking; evaluate perception accuracy and planning optimality"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=g-fD_2qSFVo - Deep Learning for 3D Object Detection, Part 1 (MATLAB, 16 min, LiDAR fundamentals, point cloud visualization, data preprocessing, Lidar Viewer app)",
        "https://www.youtube.com/watch?v=pwoUySMYUlM - Deep Learning for 3D Object Detection, Part 3 (MATLAB, 12 min, PointPillars network training, data augmentation, 3D bounding box regression)",
        "https://www.youtube.com/watch?v=7wnzsHFCCOw - Object Detection on Lidar Point Clouds Using Deep Learning (MATLAB, 5 min, PointPillars architecture, handling sparse data and noise)",
        "https://www.youtube.com/watch?v=Qcu_EXabLrg - YOLO11: How to Train for Object Detection | Self Driving Car (10 min, YOLO11 training workflow for vehicle/pedestrian/cyclist detection)",
        "https://www.youtube.com/watch?v=F3IEobi7Li4 - 3D Object Detection using YOLO4 | LiDAR Dataset (tutorial on YOLO4 3D detection, Velodyne integration, KITTI dataset workflow)",
        "https://ml4ad.github.io/files/papers/Hybrid%20Sensor%20Fusion%20Framework%20for%20Perception%20in%20Autonomous%20Vehicles.pdf - Hybrid Sensor Fusion Framework (NeurIPS 2019, FCN + EKF hybrid approach, Vision+Lidar and Vision+Radar fusion architectures)",
        "https://www.nature.com/articles/s41598-024-82356-0 - Multi-sensor fusion and segmentation for autonomous vehicle (Nature 2024, Multi-Scale Fusion algorithm, EAID framework, cross-fusion deep learning)"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69995 - EE 180: Autonomous Vehicles - UC Merced Catalog (official course listing, prerequisites, SAE standards)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC11125132/ - Vehicle Detection Algorithms for Autonomous Driving: A Review (comprehensive review, camera/radar/LiDAR methods, deep learning approaches)",
        "https://www.thinkautonomous.ai/blog/lidar-and-camera-sensor-fusion-in-self-driving-cars/ - LiDAR and Camera Sensor Fusion in Self-Driving Cars (detailed guide on fusion strategies, point cloud projection, ROI matching)",
        "https://www.srmtech.com/knowledge-base/blogs/the-role-of-sensor-fusion-in-autonomous-driving/ - The Role of Sensor Fusion in Autonomous Driving (fusion abstraction levels: low/mid/high, decentralized vs distributed, coordinated fusion)",
        "https://lumenalta.com/insights/9-applications-of-computer-vision-in-autonomous-vehicles - 9 applications of computer vision in autonomous vehicles (sensor fusion, image enhancement, lane detection, traffic sign recognition, obstacle avoidance)",
        "https://segments.ai/blog/late-vs-early-sensor-fusion-a-comparison/ - Late vs early sensor fusion for autonomous driving (comparison of fusion timing strategies, trade-offs between computation and latency)",
        "https://academic.oup.com/tse/article/5/3/tdac061/6955827 - Path-planning algorithms for self-driving vehicles (improved RRT-Connect achieves 29.3% path reduction vs baseline, curvature-continuous trajectory generation)",
        "https://cerv.aut.ac.nz/wp-content/uploads/2021/12/A-Survey-of-Path-Planning-Algorithms-for-Autonomous-Vehicles.pdf - A Survey of Path Planning Algorithms for Autonomous Vehicles (comprehensive overview of APF, RRT, A*, Hybrid A* algorithms)",
        "https://www.ri.cmu.edu/pub_files/2012/5/ICRA12_xuwd_Final.pdf - A Real-Time Motion Planner with Trajectory Optimization (CMU, trajectory generation with kinematic/dynamic constraints, speed profile optimization)",
        "https://www.sapien.io/blog/path-planning-for-self-driving-cars - Path Planning for Self-Driving Cars: Key Insights and Technologies (global/local/behavioral planning, ML-aided behavioral prediction)",
        "https://www.ni.com/en/solutions/transportation/adas-and-autonomous-driving-testing/adas-and-autonomous-driving-validation/testing-perception-and-sensor-fusion-systems - Testing Perception and Sensor Fusion Systems (NI, perception validation, hardware-in-loop testing, sensor simulation)",
        "https://www.labellerr.com/blog/how-object-detection-works-in-self-driving-cars-using-deep-learning/ - Car Object Detection: How Deep Learning Powers Self-Driving Cars (YOLO algorithm explanation, CNN architecture, real-time detection)",
        "https://www.v7labs.com/blog/yolo-object-detection - YOLO Algorithm for Object Detection Explained (YOLO network architecture, grid-based prediction, bounding box regression)",
        "https://www.dpvtransportation.com/the-yolo-algorithm-autonomous-vehicles/ - The YOLO Algorithm in Autonomous Vehicles (YOLO + LiDAR + RADAR sensor fusion, early/mid/late fusion strategies for AVs)",
        "https://www.mathworks.com/discovery/path-planning.html - Path Planning - MATLAB & Simulink (RRT, RRT*, Hybrid A*, occupancy grid maps, lane change planning with MathWorks tools)"
      ],
      "tools": [
        "MATLAB/Simulink Autonomous Driving Toolbox - Industry-standard for AV perception, planning, and control algorithm development - https://www.mathworks.com/products/autonomous-driving.html",
        "MATLAB Lidar Toolbox - Point cloud processing, 3D object detection (PointPillars), visualization - https://www.mathworks.com/products/lidar.html",
        "MATLAB Deep Learning Toolbox - Train YOLO, R-CNN, PointPillars networks on custom datasets",
        "Nvidia CUDA/cuDNN - GPU acceleration for deep learning inference on edge devices (Jetson Xavier NX, Orin)",
        "ROS (Robot Operating System) - Open-source middleware for sensor fusion, perception, planning pipeline integration",
        "Apollo Open Platform (Baidu) - Open-source autonomous driving platform with full stack (perception, planning, control)",
        "Carla Simulator - Open-source driving simulator for testing perception and planning algorithms in virtual environments",
        "PyTorch / TensorFlow - Deep learning frameworks for YOLO, PointPillars, transformer-based object detection training",
        "Point Cloud Library (PCL) - C++ library for point cloud processing and 3D object manipulation",
        "RRT-Connect, Hybrid A* implementations - Planning algorithm libraries (open-source and commercial)",
        "KITTI / nuScenes / Waymo / BDD100K Datasets - Benchmark datasets for perception algorithm training and validation",
        "LiDAR simulators - Simulate Velodyne/Ouster LiDAR output for algorithm testing before hardware integration"
      ]
    }
  }
}
,
];

export const tier3Courses: TierCourse[] = [
  {
  "id": "ee-150-digital-communication",
  "code": "EE 150",
  "name": "Digital Communication",
  "fullName": "EE 150: Digital Communication",
  "description": "Advanced course on communication systems in modern electric vehicles and connected transportation. Master automotive network protocols (CAN, LIN, Ethernet), Vehicle-to-Everything (V2X) communication via 5G/C-V2X, and real-time message scheduling for safety-critical systems. Learn to design communication architectures that coordinate 70+ vehicle ECUs, enable autonomous driving through sensor fusion networks, and support Vehicle-to-Grid energy management.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Digital communication is the nervous system of modern EVs, enabling coordination between 70+ electronic control units (ECUs) distributed across the vehicle. While earlier courses focused on individual components (motors, battery, power electronics), EE 150 teaches how these systems talk to each other in real-time. A motor controller must receive torque commands from the driver, battery state-of-charge from BMS, thermal limits from the cooling system, and traction control requests from the stability controller—all coordinated across CAN bus networks. Modern EVs are transitioning from traditional CAN backbone + LIN sub-networks to Ethernet + Time-Sensitive Networking (TSN) that guarantees millisecond-scale latency for safety-critical functions (brake-by-wire, steering-by-wire, regenerative braking coordination). Vehicle-to-Grid (V2G) technology adds another communication layer: vehicles must securely exchange charging schedules, grid price signals, and energy availability with utilities. Autonomous driving adds complexity: LiDAR, radar, and camera sensors generate terabytes of data per day requiring real-time sensor fusion and decision-making. 5G/C-V2X communication extends this further: vehicles communicate with infrastructure (traffic lights), other vehicles (collision avoidance), and cloud services (HD maps, OTA updates). As vehicles become more autonomous and connected, communication systems become increasingly critical to safety, efficiency, and customer experience. EV engineers who understand digital communication design can architect systems that are robust, real-time, secure, and scalable.",
    "realWorldApplications": [
      "CAN bus network design: 70+ ECUs coordinating powertrain (motor, inverter, BMS), chassis (stability, braking), and body (infotainment, HVAC) across 250 kbps-1 Mbps networks",
      "Battery Management System (BMS) real-time communication: Battery pack reporting SOC, SOH, cell balances, and thermal status to motor controller and charging system every 100-200 ms",
      "Vehicle-to-Grid (V2G) charging coordination: Secure bidirectional communication negotiating charging schedules, grid price signals, and emergency backup power (10-50 kW per vehicle)",
      "Automotive Ethernet backbone: Gigabit Ethernet (1000BASE-T1) replacing multiple CAN networks for infotainment, ADAS, and diagnostics with 100 Mbps-1 Gbps bandwidth",
      "Time-Sensitive Networking (TSN): Deterministic scheduling guaranteeing <1 ms latency for safety-critical control (brake-by-wire response to pedal input) while infotainment video simultaneously uses same network",
      "Sensor fusion for autonomous driving: Aggregating 40+ camera, radar, LiDAR feeds via Ethernet with <100 ms latency for real-time decision-making",
      "Cellular V2X (C-V2X) communication: Vehicles broadcasting position, velocity, heading to nearby vehicles and infrastructure, receiving hazard alerts with <100 ms latency via 5G",
      "Over-the-air (OTA) software updates: Secure communication architecture downloading 4+ GB firmware updates to motor controller, BMS, infotainment without dealer visit",
      "CAN-to-Ethernet gateways: Translating between legacy CAN networks and modern Ethernet architecture, managing protocol conversion and message scheduling",
      "Network diagnostics and troubleshooting: Identifying ECU faults, bus-off events, and communication timeouts through CAN monitoring and message analysis"
    ],
    "learningOutcomes": [
      "Understand CAN bus protocol fundamentals: Arbitration, message formats, error handling, and multi-master communication for automotive networks",
      "Design hierarchical networks: Combining high-speed CAN backbone with low-speed LIN sub-networks, implementing gateways for protocol translation",
      "Analyze automotive Ethernet architecture: Point-to-point links, switched topology, and Time-Sensitive Networking (TSN) for deterministic real-time communication",
      "Design Time-Sensitive Networking (TSN): Time-aware shapers, priority scheduling, clock synchronization (gPTP) for guaranteeing latency budgets",
      "Understand V2X communication: C-V2X protocols (PC5 direct, Uu cellular), use cases (V2V, V2I, V2P, V2N), and advantages over DSRC",
      "Implement digital communication protocols: Modulation/demodulation, coding, error detection/correction, frame synchronization for automotive applications",
      "Design secure communication: Authentication, encryption, message integrity for V2X and OTA updates in safety-critical systems",
      "Perform network simulation and analysis: CAN bus load analysis, Ethernet traffic shaping, latency calculation for multi-ECU systems",
      "Troubleshoot automotive networks: Interpreting CAN messages, identifying bus faults, using diagnostic tools for real-time monitoring",
      "Design future E/E architectures: Transitioning from domain-oriented (CAN/LIN) to centralized (Ethernet-based) with Software-Defined Networking (SDN)"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=mmAocku7u48 - CAN Bus in Vehicles: A Complete Guide to the Fundamentals (47-min deep dive covering CAN protocol basics, message frames, error handling, real-world automotive applications in powertrain/chassis/safety)",
        "https://www.youtube.com/watch?v=WikQ5n1QXQs - CAN Protocol Explained | Controller Area Network (explains embedded protocol coordinating 70+ ECUs across vehicle for window, motor, battery control)",
        "https://www.youtube.com/watch?v=YbF3idCk4EQ - CAN Bus Communication Explained (Part 1) (diagnostic approach to CAN troubleshooting, identifying communication paths, serial data line analysis)",
        "https://www.youtube.com/watch?v=PY1mOxnsOxc - A Deep Dive Into The Most Important Bus System (47-min comprehensive CAN tutorial covering architecture, message priority, practical diagnostics)",
        "https://www.youtube.com/watch?v=2JoVuIqpPjY - Vehicle-to-Everything (V2X): Unlocking the Future of Mobility (9-min overview of V2V/V2I/V2P communication, real-life examples, autonomous driving integration, global adoption status)",
        "https://www.youtube.com/watch?v=rPkwaGBB-f4 - Securing Vehicle To Everything (V2X) and Accelerating Its Adoption (details on V2X security architecture, edge intelligence, traffic signal coordination, emergency vehicle integration)",
        "https://www.youtube.com/watch?v=flKg2SvVMwk - V2X - A Vehicle to Everything Technology Demo (practical demonstration of V2X technology showing blind-spot detection, brake light visibility through obstructing vehicles, virtual road signs)",
        "https://www.youtube.com/watch?v=OQtZeDHhTJ8 - Validating TSN in Automotive Ethernet Networks (36-min technical presentation on time-sensitive networking, traffic types (infotainment, ADAS, emergency braking), deterministic scheduling requirements)",
        "https://www.youtube.com/watch?v=304 - Automotive Ethernet Fundamentals: The Switch & OSI Layer 2 (2-layer technical explanation of Ethernet switches, bandwidth aggregation, why Ethernet dominates modern vehicle networks)",
        "https://www.youtube.com/watch?v=bmhL7g8N22M - Collaborate to Treat 5G, V2X, Autonomous Driving (discusses 5G community ecosystem, telematics systems, onboard diagnostics, predictive maintenance, over-the-air updates)",
        "https://www.youtube.com/watch?v=303 - Introducing Vehicle-to-Everything (V2X) Technology (explains V2X enabling vehicles to communicate with drivers and surroundings via sensors and wireless connectivity)"
      ],
      "websites": [
        "https://copperhilltech.com/blog/unlocking-vehicle-intelligence-a-practical-guide-to-can-and-lin-bus-networks/ - A Practical Guide to CAN and LIN Bus Networks (comprehensive overview of CAN/LIN architectures, roles, comparison, CAN-LIN gateways for hierarchical integration)",
        "https://www.infinipowertech.com/automotive-ethernet-testing-for-ev/ - Automotive Ethernet Testing in the Electric Vehicle Industry (advantages of Ethernet: higher bandwidth, scalability, supporting V2X and ADAS, replacing traditional CAN limitations)",
        "https://www.logic-fruit.com/blog/can/can-lin-and-flexray-explained/ - CAN, LIN, and FlexRay: Decoding Vehicle Communication (comparison of three automotive protocols, CAN cost/performance, LIN for sub-networks, FlexRay for determinism)",
        "https://ecotron.ai/blog/introduction-autonomous-driving-and-vehicle-to-everything-v2x/ - Introduction to Autonomous Driving and Vehicle to Everything V2X (V2X overview, C-V2X interfaces (PC5, Uu), applications for autonomous driving augmentation)",
        "https://www.keysight.com/blogs/en/inds/auto/2024/10/03/v2x-post - V2X Vehicle-to-Everything Communication – The Future (C-V2X vs. DSRC comparison, advantages in range/scalability/5G compatibility, real-time use cases)",
        "https://iwave-global.com/articles/automotive-ethernet-in-vehicle-communication/ - Automotive Ethernet in Vehicle Communication (Master-Slave model, gPTP synchronization, telematics integration, TSN for real-time control)",
        "https://resources.altium.com/p/serial-communications-protocols-can-and-lin - Serial Communications Protocols - CAN and LIN (LIN protocol emergence due to CAN cost concerns, hierarchical network architecture)",
        "https://semiengineering.com/knowledge_centers/automotive/automotive-networking/automotive-ethernet-time-sensitive-networking-tsn - Automotive Ethernet, Time Sensitive Networking (TSN components: time-aware shaper, grand master clock, engineered networks with deterministic latency)",
        "https://www.csselectronics.com/pages/can-bus-simple-intro-tutorial - CAN Bus Explained - A Simple Intro (CAN fundamentals for beginners, communication system enabling ECU coordination)",
        "https://www.snapon.com/EN/US/Diagnostics/News-Center/CAN-Bus - Automotive Communication Networks, Part II CAN Bus (CAN data transfer network allowing modules to communicate via standard structure/format)",
        "https://www.sciencedirect.com/science/article/pii/S2590198223002270 - Vehicle-to-Everything (V2X) in the Autonomous Vehicles Domain (advanced communication systems, real-time information sharing, safety for all road users including pedestrians)",
        "https://blogs.sw.siemens.com/ee-systems/2022/10/27/a-quick-look-into-automotive-ethernet-and-in-vehicle-networks/ - A Quick Look Into Automotive Ethernet and In-Vehicle Networks (Ethernet advantages: high bandwidth, cloud integration flexibility, scalability over specialized networks)",
        "https://www.5gamericas.org/cellular-v2x-communications-towards-5g/ - Cellular V2X Communications Towards 5G (critical information exchange, cloud connectivity, real-time traffic data for autonomous vehicles)",
        "https://www.iotforall.com/autonomous-vehicles-and-the-role-of-5g-cellular-technology - Autonomous Vehicles & the Role of C-V2X Cellular Technology (C-V2X emerging technology, enhancing LTE/5G features for V2X communication)",
        "https://www.keysight.com/blogs/en/tech/educ/2024/automotive-ethernet - Automotive Ethernet: The In-Vehicle Networking of the Future (symmetric point-to-point topology, high aggregate bandwidth (Gbps), diagnostics transmission, TSN standards)"
      ],
      "tools": [
        "Vector CANoe - Industry-standard tool for CAN/LIN/Ethernet network simulation, test automation, and ECU communication - https://www.vector.com/us/en/products/software/canoe/",
        "National Instruments LabVIEW + CAN/Ethernet interfaces - Real-time monitoring and control of automotive networks - https://www.ni.com/en-us/shop/labview.html",
        "PEAK-System PCAN-View - Free CAN bus monitoring tool for real-time message observation and traffic analysis - https://www.peak-system.com/",
        "Wireshark with automotive plugins - Packet analysis for Ethernet-based automotive networks - https://www.wireshark.org/",
        "Kvaser Hybrid Pro 2xCAN/LIN - Hardware interface for dual CAN + LIN communication testing - https://www.kvaser.com/",
        "Python-CAN library (Free) - Open-source Python module for CAN bus interaction and message generation - https://python-can.readthedocs.io/",
        "MATLAB Automotive Communication Toolbox - Simulation and analysis of CAN, LIN, and Ethernet networks - https://www.mathworks.com/products/automotive.html",
        "ETAS AUTOSAR toolchain - Professional development environment for automotive software including communication stacks - https://www.etas.com/"
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
  "description": "Comprehensive exploration of state-of-the-art machine learning technologies across engineering disciplines. Covers supervised learning (classification, regression), unsupervised learning, neural networks, deep learning architectures, and practical applications to real-world engineering problems including battery management, autonomous vehicles, and predictive maintenance.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Machine learning is rapidly becoming a core engineering competency—especially in EVs. ENGR 145 teaches you how to extract actionable insights from data: predicting battery failure 96.3% accurately, classifying battery health from voltage signatures, optimizing motor efficiency curves, or detecting sensor faults in autonomous vehicles. You'll learn supervised learning (regression for continuous targets like efficiency, classification for discrete targets like fault/no-fault), unsupervised learning (clustering similar battery behaviors, reducing dimensions for visualization), and neural networks (powerful for nonlinear patterns that simpler models miss). You'll master Python libraries like scikit-learn for classical ML and TensorFlow/Keras for deep learning. Most critically, you'll understand the complete workflow: data collection → preprocessing → feature engineering → model training → evaluation → deployment. Companies like AVL use federated learning to train neural networks on distributed vehicle fleet data, predicting battery lifetime 32% more accurately than single-fleet models while preserving OEM data privacy. Whether you're designing BMS algorithms at Tesla, Lucid, or a traditional automaker's engineering team, ENGR 145 is your foundation for AI-driven vehicle optimization.",
    "realWorldApplications": [
      "Battery remaining useful life (RUL) prediction—ML models trained on 50k+ battery cycles predict failure with 96.3% accuracy; enables preventive maintenance alerts and extends battery warranty confidence",
      "Federated learning for battery lifetime—AVL + TUM neural networks trained on distributed fleet data achieve 32% lower prediction error vs single-fleet model; preserves OEM proprietary data privacy while improving global model accuracy",
      "State of Health (SoH) classification—ML classifier categorizes battery condition (healthy/degraded/critical) from charge voltage curves; triggers adaptive thermal/charging strategies to maximize lifespan",
      "Battery degradation pattern recognition—Unsupervised clustering identifies distinct failure modes (cycle-induced vs calendar aging vs thermal effects); enables targeted intervention strategies for each mode",
      "Real-time sensor fault detection—Anomaly detection model monitors CAN bus signals (voltage, current, temperature); flags sensor drifts before they cause incorrect SoC estimation or missed safety events",
      "Motor efficiency mapping with neural networks—Train regression network on dyno data predicting efficiency at any speed/load; optimize gear ratios and operating points to keep motor in peak efficiency zone, improving range by 3-5%",
      "Autonomous vehicle perception—Deep CNN extracts features from camera images; detection network identifies pedestrians, cyclists, vehicles in real-time; trains faster and requires less compute than manual feature engineering",
      "Behavioral prediction for collision avoidance—RNN predicts pedestrian trajectory 2-5 seconds into future; planner generates safer avoidance paths based on predicted position rather than current position alone",
      "Thermal runaway early warning—Classification model detects pre-runaway battery signatures from voltage/current/temperature patterns; triggers emergency shutdown milliseconds before thermal event propagates",
      "Multi-modal autonomous driving perception—Deep fusion network combines camera (semantic classification), LiDAR (precise geometry), radar (velocity, adverse weather); outperforms single-sensor approaches in rain/fog/snow"
    ],
    "learningOutcomes": [
      "Understand machine learning problem types: supervised (labeled data for prediction), unsupervised (unlabeled data for discovery), reinforcement (rewards/punishments for learning)",
      "Apply supervised learning to engineering problems: classify components (fault/no-fault), predict continuous targets (efficiency, temperature, remaining life)",
      "Implement classification algorithms: logistic regression, decision trees, random forests, support vector machines; understand trade-offs between accuracy and interpretability",
      "Implement regression algorithms: linear, polynomial, ridge (L2), LASSO (L1); understand regularization for preventing overfitting on high-dimensional data",
      "Design feature engineering pipelines: select relevant features, normalize/scale data, handle missing values, encode categorical variables; recognize that feature quality often exceeds algorithm importance",
      "Build neural networks from first principles: understand neurons, layers, weights, biases, activation functions (sigmoid, ReLU), backpropagation learning algorithm",
      "Understand deep learning architectures: convolutional neural networks (CNNs) for images, recurrent neural networks (RNNs) for sequences, fully-connected networks for structured data",
      "Optimize models using gradient descent variants: standard SGD, momentum, Adam, RMSprop; understand learning rate scheduling and convergence behavior",
      "Evaluate models rigorously: train/test split, cross-validation, hyperparameter tuning, metrics selection (accuracy vs precision vs recall for classification, RMSE vs MAE for regression)",
      "Implement ML workflows in Python: data loading with pandas, preprocessing with scikit-learn, modeling with scikit-learn and TensorFlow, visualization with matplotlib",
      "Apply unsupervised learning: clustering (K-means, hierarchical) for grouping similar samples, dimensionality reduction (PCA) for visualization and noise reduction",
      "Deploy ML models to production: cloud-based inference, edge deployment on vehicle ECUs, continuous monitoring and retraining as new data arrives"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=SrZ6vifbmdc - Classification and Regression | Machine Learning Tutorial (TutorialsPoint, 5 min, supervised learning overview, classification vs regression fundamentals)",
        "https://www.youtube.com/watch?v=eVt0uxO1VtI - Machine Learning Tutorial - Supervised Learning (ProgrammingKnowledge, 4 min, labeled data, training/testing, 80/20 split)",
        "https://www.youtube.com/watch?v=Mu3POlNoLdc - Supervised Machine Learning Explained For Beginners (AssemblyAI, 6 min, features, labels, training data concept, classification vs regression)",
        "https://www.youtube.com/watch?v=aircAruvnKk - But what is a neural network? | Deep learning chapter 1 (3Blue1Brown, 17 min masterclass, neurons, weights, biases, layers—visual intuition without code)",
        "https://www.youtube.com/watch?v=VyWAvY2CF9c - Deep Learning Crash Course for Beginners (freeCodeCamp, 1.5 hours, neural networks, activation functions, loss functions, optimizers, CNN/RNN architectures, practical 5-step workflow)",
        "https://www.youtube.com/watch?v=kyQ0CRkYhy4 - 1: Introduction to Neural Networks and Deep Learning (UC Berkeley, detailed neural networks intro, automatic representation learning, unstructured data handling)",
        "https://www.youtube.com/watch?v=jmmW0F0biz0 - Neural Networks Explained in 5 minutes (5 min visual summary of neural networks and learning)",
        "https://www.youtube.com/watch?v=Ig1nfPjrETc - Machine Learning Tutorial: Supervised Learning (comprehensive scikit-learn introduction, real-world datasets, practical implementations)",
        "https://www.youtube.com/watch?v=Lqtlys1Q2y8 - Supervised Learning Projects Tutorial (Great Learning, 3 hours practical: Covid-19 outbreak prediction, fraud detection, credit card default prediction—end-to-end projects)",
        "https://www.youtube.com/watch?v=hDKCxebp88A - Machine Learning with Python and Scikit-Learn – Full Course (hands-on course, linear/logistic regression, decision trees, random forests, gradient boosting, model deployment with Flask)"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69946 - ENGR 145: Machine Learning for Engineers - UC Merced Catalog (official course description)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC9010759/ - Data-driven prediction of battery failure for electric vehicles (PMC, 96.3% accuracy battery failure prediction, cloud-based ML framework, real-world EV application)",
        "https://www.avl.com/en/press/press-release/avl-rd-prediction-vehicle-battery-lifetime-thanks-ai-federated-learning - AVL Federated Learning for Battery Lifetime (32% error reduction via distributed fleet training, privacy-preserving ML)",
        "https://www.nrel.gov/transportation/machine-learning-for-advanced-batteries - Machine Learning for Advanced Batteries (NREL, battery lifetime prediction, parsimonious model selection, automated equation generation from data)",
        "https://www.sciencedirect.com/science/article/pii/S0378775324020007 - Machine learning tool to investigate lithium-ion battery (ML classification of battery cycling/storage conditions, capacity degradation patterns)",
        "https://www.monolithicpower.com/en/learning/mpscholar/battery-management-systems/advanced-topics-in-bms/ai-and-machine-learning-in-battery-management-systems - AI and Machine Learning in BMS (predictive maintenance, failure detection, degradation forecasting, real-time monitoring)",
        "https://www.digitalocean.com/community/tutorials/python-scikit-learn-tutorial - Scikit-learn: A Beginner's Guide to Machine Learning in Python (practical tutorial, Iris dataset, classification, regression, clustering, evaluation metrics)",
        "https://www.geeksforgeeks.org/machine-learning/learning-model-building-scikit-learn-python-machine-learning-library/ - Learning Model Building in Scikit-learn (data loading, train/test split, feature encoding, model training, prediction)",
        "https://www.geeksforgeeks.org/artificial-intelligence/artificial-neural-networks-and-its-applications/ - Artificial Neural Networks and Applications (activation functions: sigmoid, ReLU, optimization: gradient descent, Adam, RMSprop)",
        "https://www.github.com/ageron/handson-ml3 - Hands-On Machine Learning (GitHub repo for Aurélien Géron's book—code examples for scikit-learn, TensorFlow, Keras)",
        "https://www.tensorflow.org/resources/learn-ml - Machine Learning Education (TensorFlow official resource, practical examples with scikit-learn and TensorFlow frameworks)",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC7983091/ - Machine Learning: Algorithms, Real-World Applications (comprehensive review of classification, regression, clustering, deep learning across application domains)"
      ],
      "tools": [
        "Python with scikit-learn - Open-source library for classical ML algorithms (linear regression, logistic regression, decision trees, random forests, SVM) - https://scikit-learn.org",
        "TensorFlow / Keras - Open-source deep learning frameworks for neural networks, CNNs, RNNs - https://www.tensorflow.org",
        "PyTorch - Alternative deep learning framework, flexible for research and production - https://pytorch.org",
        "Jupyter Notebook - Interactive Python environment for exploratory data analysis and model development",
        "Pandas - Data manipulation and preprocessing library for working with tabular data",
        "NumPy / SciPy - Numerical computing and scientific algorithms",
        "Matplotlib / Seaborn - Data visualization for exploratory analysis and results presentation",
        "Google Colab - Free cloud-based Jupyter environment with GPU access for training deep learning models",
        "AWS SageMaker / Azure ML - Cloud platforms for training, evaluation, and deployment of ML models at scale",
        "MLflow - Open-source platform for tracking experiments, versioning models, and managing ML lifecycle"
      ]
    }
  }
}
,
];

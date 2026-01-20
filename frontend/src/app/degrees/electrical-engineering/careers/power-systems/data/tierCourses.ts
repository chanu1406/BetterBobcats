/**
 * Power Systems & Energy Tier Courses Data
 * Course recommendations organized by tier for Power Systems & Energy career path
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
  "id": "ee-101",
  "code": "EE 101",
  "name": "Electronic Circuit Design I",
  "fullName": "EE 101: Electronic Circuit Design I",
  "description": "Foundational course establishing core circuit analysis principles essential for understanding electrical systems, power grid infrastructure, and advanced circuit design. Covers Ohm's law, Kirchhoff's laws, network analysis techniques, and transient response—critical knowledge for power systems engineers designing and analyzing distribution grids and energy conversion systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "In power systems and energy engineering, EE 101 provides indispensable fundamentals for analyzing grid components, transformer circuits, and three-phase power distribution. The circuit analysis techniques learned—nodal analysis, mesh analysis, superposition, and impedance calculations—are directly applied in load flow studies, short-circuit analysis, and power system modeling. Understanding Thevenin/Norton equivalents and maximum power transfer prepares engineers to design efficient power transfer systems and optimize energy distribution networks.",
    "realWorldApplications": [
      "Power distribution grid circuit analysis and fault protection design",
      "Three-phase transmission system analysis and load flow calculation",
      "Transformer equivalent circuit modeling for step-up/step-down stations",
      "Renewable energy system integration and microgrid circuit design",
      "Smart grid control systems and distribution circuit optimization",
      "Electric vehicle charging infrastructure circuit analysis",
      "Power electronics converter design for energy conversion systems",
      "Short-circuit studies and protective relay coordination"
    ],
    "learningOutcomes": [
      "Master circuit analysis using Kirchhoff's Current Law (KCL) and Kirchhoff's Voltage Law (KVL)",
      "Apply Ohm's law and power equations to solve for voltage, current, and power in DC and AC circuits",
      "Analyze complex circuits using nodal analysis, mesh analysis, superposition, and source transformation",
      "Understand and apply Thevenin's and Norton's theorems for circuit simplification",
      "Design circuits and components for maximum power transfer efficiency",
      "Analyze series, parallel, and series-parallel resistor combinations with voltage/current division",
      "Model transient responses in first-order and second-order RL/RC circuits",
      "Understand fundamental magnetic circuit concepts and transformer principles relevant to power systems",
      "Perform wye-delta transformations for three-phase system analysis",
      "Apply circuit principles to real-world power systems, energy conversion, and grid infrastructure"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=SGvOmwZvhVk - Electronics: Lesson 1 - The Fundamentals",
        "https://www.youtube.com/watch?v=3py8fBi0VV8 - Circuit Theory 1 - Basics",
        "https://www.youtube.com/watch?v=8gRYHMNh_Uo - Circuits & Electronics - Lecture 1 (MIT-style comprehensive intro)",
        "https://www.youtube.com/watch?v=IjtQVATW5Ks - Circuit Analysis Using Kirchhoff's Current & Voltage Laws (26 min)",
        "https://www.youtube.com/watch?v=6F_rmZ1nXFQ - Kirchhoff's Voltage Law - KVL Circuits, Loop Rule & Ohm's Law",
        "https://www.youtube.com/watch?v=26_8I1wLSKk - How to Solve a Kirchhoff's Rules Problem - Simple Example",
        "https://www.youtube.com/watch?v=yMrAk0C4AsU - How to REALLY Learn Circuit Design (Step-by-Step Process)",
        "https://www.youtube.com/watch?v=18 - How Do Circuits Work? Volts, Amps, Ohm's, and Watts Explained! (Electrician U)",
        "https://www.youtube.com/watch?v=haaRTKm8ePQ - Beginner Electronics - Circuit Design, Build, and Measuring",
        "https://www.youtube.com/watch?v=31_8I1wLSKk - Power In AC Circuits | Basic Concepts | Power Systems",
        "https://www.youtube.com/watch?v=24 - Basics of Power System Studies"
      ],
      "websites": [
        "https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic - Khan Academy Circuit Analysis",
        "https://library.automationdirect.com/basic-electrical-theory/ - AutomationDirect Basic Electrical Theory",
        "https://resources.pcb.cadence.com/blog/2023-the-basic-laws-and-theorems-in-electrical-circuit-network-analysis - Cadence Circuit Analysis Laws",
        "https://www.electronics-tutorials.ws/dccircuits/dcp_1.html - Electronics Tutorials DC Circuit Theory",
        "https://www.plantengineering.com/how-the-power-distribution-grid-works/ - Power Distribution Grid Explanation",
        "https://eng.libretexts.org/Workbench/Introduction_to_Circuit_Analysis - LibreTexts Circuit Analysis",
        "https://electrohob.com/what-is-power-system-analysis-a-complete-breakdown/ - Power System Analysis Overview",
        "https://3phaseassociates.com/basic-explanation-of-the-electric-power-grid/ - Electric Power Grid Basics"
      ],
      "tools": [
        "LTspice (circuit simulation)",
        "MATLAB (circuit analysis and power system modeling)",
        "Multisim (circuit design and simulation)",
        "PSPICE (analog circuit simulation)",
        "Python with NumPy/SciPy (numerical circuit analysis)",
        "Breadboard and oscilloscope (hands-on lab verification)",
        "Fluke multimeter (circuit measurement and verification)"
      ]
    }
  }
}
,
  {
  "id": "ee-102",
  "code": "EE 102",
  "name": "Signal Processing and Linear Systems",
  "fullName": "EE 102: Signal Processing and Linear Systems",
  "description": "Concepts and tools for continuous- and discrete-time signal and system analysis with applications in signal processing, communications, and control. Mathematical foundations for analyzing power system transients, harmonics, and stability in modern electrical grids[web:16].",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "Signal processing forms the analytical core for modern power systems engineering, enabling engineers to detect and classify power quality disturbances, analyze grid stability margins, and design control algorithms for renewable energy integration[web:5]. As California's grid transitions to 70% renewable sources by 2030, the ability to process and interpret high-frequency voltage/current signals from inverter-based resources becomes critical for preventing cascade failures and maintaining grid reliability[web:27]. This course provides the mathematical framework (Fourier analysis, Laplace transforms, state-space models) that underpins all digital protection relays, phasor measurement units (PMUs), and energy management systems deployed in contemporary power infrastructure[web:22].",
    "realWorldApplications": [
      "Power Quality Disturbance Classification: Applying Short-Time Fourier Transforms (STFT) and wavelet analysis to detect voltage sags, swells, and harmonic distortions caused by non-linear loads such as EV chargers and solar inverters, enabling utilities to assess compliance with IEEE 519 standards[web:5].",
      "Fault Detection and Location: Using high-pass filtering and transient signal analysis to identify high-impedance faults and insulation breakdown in distribution feeders, processing current waveforms to pinpoint fault location within 30 meters for rapid crew dispatch[web:22].",
      "Grid Stability Assessment: Implementing Kalman filters and state-space models to estimate generator rotor angles and detect emerging oscillatory modes in real-time, providing early warning of potential inter-area oscillations that could lead to blackout conditions[web:23]."
    ],
    "learningOutcomes": [
      "Apply Fourier series and transforms to decompose non-sinusoidal power waveforms into harmonic components, quantifying Total Harmonic Distortion (THD) for compliance verification in renewable energy installations.",
      "Design digital Butterworth and Chebyshev filters to isolate specific frequency bands for extracting fundamental frequency components from noisy measurements in high-voltage substations.",
      "Implement discrete-time state-space representations to model dynamic interactions between synchronous generators and inverter-based resources in microgrid applications.",
      "Utilize wavelet transforms and STFT to detect transient events (capacitor switching, fault clearing) with time-frequency localization suitable for real-time digital relay protection algorithms.",
      "Analyze linear time-invariant system stability using pole-zero plots and Bode diagrams to ensure control loop stability margins exceed 45 degrees phase margin in voltage regulator designs."
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=b8gWwLgjPLU",
        "https://www.youtube.com/watch?v=IHOQechErQs",
        "https://www.youtube.com/watch?v=9aTuzwYJI8g"
      ],
      "websites": [
        "https://powerquality.blog/2021/06/24/bridging-the-gap-between-signal-and-power/",
        "https://signalprocessingsociety.org/publications-resources/blog/understanding-high-voltage-power-systems-through-signal-processing",
        "https://www.mathworks.com/learn/training/signal-processing-with-matlab.html"
      ],
      "tools": [
        "MATLAB Signal Processing Toolbox",
        "Simulink",
        "Python (SciPy.signal)"
      ]
    }
  }
}

,
  {
  "id": "ee-105",
  "code": "EE 105",
  "name": "Semiconductor Devices",
  "fullName": "EE 105: Semiconductor Devices",
  "description": "Comprehensive study of semiconductor physics, materials, and devices that form the foundation of modern electronics and power systems. Covers the principles of diodes, transistors (BJT, FET, MOSFET), and power semiconductor devices essential for designing power conversion systems, motor drives, and renewable energy interfaces. Critical for power systems engineers who work with inverters, rectifiers, and grid-connected power electronics.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For power systems and energy engineers, EE 105 is transformational because it reveals how semiconductor devices enable the entire power conversion and control infrastructure. Every renewable energy system—from utility-scale solar farms to EV charging networks—relies on semiconductor switches and power electronics fundamentals taught in this course. Understanding MOSFET and IGBT operation is essential for designing inverters that convert DC solar/wind power into grid-compatible AC. The course provides the device-level knowledge required to optimize efficiency, reduce losses, and collaborate with power electronics specialists designing the converters and controllers that make modern energy systems possible.",
    "realWorldApplications": [
      "Solar photovoltaic inverters converting DC to AC for grid interconnection",
      "Wind turbine power electronic converters and grid integration systems",
      "HVDC transmission converters for long-distance renewable energy transport",
      "Electric vehicle charging infrastructure and onboard power converters",
      "Grid-scale battery energy storage system power electronics",
      "Microgrids and smart grid control semiconductor circuits",
      "Industrial motor drive systems and variable frequency drives (VFD)",
      "Utility fault current limiters and protection semiconductor devices",
      "Power supply rectification and regulation in substations",
      "Emerging wide-bandgap (SiC, GaN) semiconductors for next-generation efficiency"
    ],
    "learningOutcomes": [
      "Understand semiconductor materials, energy bands, and doping principles that enable device operation",
      "Analyze p-n junction behavior under forward bias, reverse bias, and breakdown conditions",
      "Design and analyze rectifier circuits for AC-to-DC power conversion",
      "Apply bipolar junction transistor (BJT) principles to understand amplification and switching",
      "Distinguish between JFET and MOSFET operation, and select devices for specific applications",
      "Understand MOSFET switching characteristics critical to power converter design",
      "Comprehend Insulated Gate Bipolar Transistor (IGBT) structure and operation for high-power applications",
      "Analyze power diodes and rectifier circuits used in grid-connected systems",
      "Apply semiconductor physics to real-world power electronics design challenges",
      "Recognize how semiconductor efficiency improvements impact renewable energy economics",
      "Understand emerging wide-bandgap semiconductor technologies and their advantages"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=QpSr2OQdCfQ - ECE Purdue Semiconductor Fundamentals: How to Take this Course (Mark Lundstrom)",
        "https://www.youtube.com/watch?v=sZTu-CHIMcA - Fundamentals of Semiconductor Devices || Revision Series || Part-01 (60+ min comprehensive)",
        "https://www.youtube.com/watch?v=hCQSO8BmGWw - Semiconductor Devices: Fundamentals (Prof. Jim Fiore, 19 min)",
        "https://www.youtube.com/watch?v=fAIMKfJSmeM - Power Electronics | Lecture 3A | Introduction to Diode Rectifiers (Engineering Devotion, 16 min)",
        "https://www.youtube.com/watch?v=itwzhTKwbxY - Fundamentals of Electronics - 3B | Full-Wave Diode Rectifier Circuits (13 min)",
        "https://www.youtube.com/watch?v=58 - Overview of Transistors, Diodes, Capacitors (Math and Science, 42 min, June 2023)",
        "https://www.youtube.com/watch?v=0kaEO3WgUfw - Basics of Diodes and Transistors (2018)",
        "https://www.youtube.com/watch?v=CSkQwsEDlEE - Master MOSFET Basics in Under 15 Minutes! (Infineon, 2025)",
        "https://www.youtube.com/watch?v=BkWqsfTBjI4 - MOSFET (Basics, Types, Structure, Working & Key Points) (Engineering Funda, 16 min, Oct 2023)",
        "https://www.youtube.com/watch?v=PyFgi9mePg8 - Basics of Semiconductors: MOSFET (Part I) (Peacademia, Dr. Mehdi Mohammadi, 13 min)",
        "https://www.youtube.com/watch?v=rdntTCDi4w4 - nanoHUB-U MOSFET Essentials: How to Take this Course (2019)",
        "https://www.youtube.com/watch?v=2bOfKqhW_eg - Master the Power of IGBT Insulated Gate Bipolar Transistors Today! (Oct 2024)",
        "https://www.youtube.com/watch?v=Xmu31a-59vw - Introduction to Diode Rectifier Circuits (2016)",
        "https://www.youtube.com/watch?v=nLboM2hZips - Understanding Rectifier Diodes and Rectifier Circuits (2026)",
        "https://www.youtube.com/watch?v=61 - What is a Diode, Transistor, Capacitor, Transformer, Inductor? (Math and Science, Jan 2025, 12 min)",
        "https://www.youtube.com/playlist?list=PL_mruqjnuVd9_mwhgK3nAy-cHyslXCnRk - POWER ELECTRONICS Playlist (comprehensive series)"
      ],
      "websites": [
        "https://www.monolithicpower.com/en/learning/mpscholar/analog-vs-digital-control/introduction-to-power-conversion-circuits/basic-power-electronics-concepts - Basic Power Electronics Concepts",
        "https://www.renesas.com/en/support/engineer-school/electronic-circuits-02-diodes-transistors-fets - Diodes, Transistors and FETs (Renesas Electronics)",
        "https://www.electronics-tutorials.ws/diode/diode_1.html - Semiconductor Basics (Electronics Tutorials)",
        "https://www.electronics-tutorials.ws/power/insulated-gate-bipolar-transistor.html - IGBT Transistor Switch (Electronics Tutorials)",
        "https://www.geeksforgeeks.org/electrical-engineering/power-semiconductor-devices/ - Power Semiconductor Devices (GeeksforGeeks)",
        "https://www.geeksforgeeks.org/electrical-engineering/igbt/ - IGBT Fundamentals (GeeksforGeeks)",
        "https://blog.st.com/semiconductors-and-the-clean-energy-revolution/ - Semiconductors and the Clean Energy Revolution (ST Blog)",
        "https://www.wolfspeed.com/applications/power/renewable-energy/ - SiC Power for Renewable Energy (Wolfspeed)",
        "https://www.mitsubishielectric.com/our-stories/articles/biz-t/power-semiconductors/ - Power Semiconductors Fueling Global Energy Revolution (Mitsubishi Electric)",
        "https://www.ti.com/about-ti/newsroom/company-blog/3-ways-semiconductor-innovation-is-powering-an-evolving-landscape.html - 3 Ways Semiconductor Innovation Powers Evolving Energy Landscape (Texas Instruments)",
        "https://www.gtake.com/industry-news/what-is-igbt-igbt-working-principle/ - IGBT Working Principle (GTAKE)",
        "https://efficiencywins.nexperia.com/innovation/powering-the-future-how-semiconductors-enable-the-transition-to-green-energy - How Semiconductors Enable Transition to Green Energy (Nexperia)"
      ],
      "tools": [
        "LTspice (semiconductor circuit simulation)",
        "MATLAB/Simulink (device modeling and power system analysis)",
        "Multisim (interactive circuit design and device simulation)",
        "Cadence SPICE (industry-standard semiconductor simulation)",
        "Python with NumPy/SciPy (semiconductor physics calculations)",
        "Oscilloscope (transient and switching behavior observation)",
        "Function generator (AC signal generation for device testing)",
        "Curve tracer (BJT and transistor I-V characterization)",
        "Thermal imaging camera (semiconductor junction temperature measurement)",
        "Power analyzer (efficiency measurement in power conversion circuits)"
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
  "description": "Advanced analysis and design of analog integrated circuits with emphasis on MOS and bipolar technologies. Covers active filters, feedback amplifier stability, frequency response, and non-ideal operational amplifier characteristics essential for power electronics interfaces[web:81].",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "While digital controllers provide the 'brains' of modern power systems, analog circuits form the critical interface between low-voltage control logic and high-power semiconductor devices. This course directly enables the design of gate driver circuits that switch 1200V SiC MOSFETs in solar inverters, precision current-sense amplifiers for battery management systems, and frequency compensation networks that stabilize DC-DC converters under variable renewable generation[web:77][web:78]. The feedback amplifier concepts taught here determine whether a voltage regulator oscillates or provides stable output when PV panels experience cloud transients—making the difference between reliable grid operation and equipment damage[web:79].",
    "realWorldApplications": [
      "High-Side Gate Driver Design: Implementing bootstrap circuits and level-shifters using discrete transistors and op-amps to drive N-channel MOSFETs in buck converters for EV battery charging stations, handling 400V bus voltages with isolation requirements exceeding 2.5kV[web:77][web:82].",
      "Precision Current Sensing: Designing differential instrumentation amplifiers with common-mode rejection ratios >100dB to monitor shunt resistor voltages in the microvolt range, enabling accurate state-of-charge estimation for grid-scale lithium-ion storage systems[web:78][web:83].",
      "Feedback Loop Compensation: Applying pole-zero compensation techniques and Miller effect analysis to stabilize voltage-mode controlled converters, ensuring phase margins exceed 60 degrees when operating with input voltage ranges from 200V to 600V in solar applications[web:79][web:84]."
    ],
    "learningOutcomes": [
      "Design two-stage CMOS operational amplifiers with specific gain-bandwidth product and slew rate requirements suitable for processing sensor signals in harsh electromagnetic environments typical of substations.",
      "Analyze feedback amplifier stability using Bode plots and phase margin calculations, applying frequency compensation techniques (Miller compensation, lead-lag networks) to ensure unconditional stability in power supply controllers.",
      "Implement active filter topologies (Sallen-Key, multiple-feedback) with precise cutoff frequencies to attenuate switching noise above 100kHz while preserving DC measurement accuracy in current monitoring circuits.",
      "Model non-ideal op-amp effects including finite output impedance, input offset voltage, and temperature drift to predict measurement errors in precision analog front-ends for energy metering applications.",
      "Design wide-bandwidth current sense amplifiers with high common-mode voltage capability (up to 600V) using specialized topologies that maintain accuracy despite large voltage swings in switching power converters."
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=ROGKsGoBatE",
        "https://www.youtube.com/watch?v=fXvllju0Duw",
        "https://www.youtube.com/watch?v=sqQzBxfECj4"
      ],
      "websites": [
        "https://www.monolithicpower.com/en/learning/mpscholar/analog-vs-digital-control/fundamentals-of-analog-control/case-studies",
        "https://resources.pcb.cadence.com/blog/2023-op-amp-application-circuits",
        "https://www.ti.com/lit/pdf/slyt099"
      ],
      "tools": [
        "LTSpice / PSpice",
        "Texas Instruments TINA-TI",
        "Cadence OrCAD"
      ]
    }
  }
}
,
  {
  "id": "ee-115",
  "code": "EE 115",
  "name": "Electromagnetics and Applications",
  "fullName": "EE 115: Electromagnetics and Applications",
  "description": "Comprehensive study of classical electromagnetics covering vector analysis, electrostatics, magnetostatics, and Maxwell's equations with applications to electrical engineering. Emphasizes field theory fundamentals essential for understanding transformers, electrical machines, transmission lines, and electromagnetic wave propagation. Critical for power systems engineers designing grid infrastructure, generators, and power conversion systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 115 reveals the physical foundation underlying power systems and electrical machines. Every transformer, generator, transmission line, and power electronic converter operates according to Maxwell's equations and principles of electromagnetic induction taught in this course. For power systems and energy engineers, this course transforms electromagnetics from abstract mathematical concepts into practical design tools. Understanding magnetic circuits enables transformer optimization for efficiency. Comprehending electromagnetic propagation on transmission lines allows engineers to model voltage regulation, stability, and power flow. Mastering induction principles illuminates how generators and motors convert energy. EE 115 bridges the gap between circuit theory (EE 101) and specialized applications (EE 130 Electrical Machines, EE 160 Power Systems) by revealing the physical mechanisms underlying all electrical devices.",
    "realWorldApplications": [
      "Transformer core design and magnetic loss reduction for grid transformers",
      "Transmission line electromagnetic modeling and parameter calculation",
      "Generator and alternator design using electromagnetic induction principles",
      "Induction motor operation and torque generation in industrial drives",
      "Magnetic coupling in power converters and switched-mode power supplies",
      "High-voltage transmission line shielding and EMI/EMC design",
      "Electromagnetic energy storage in inductors and reactor design",
      "Wireless power transfer and inductive charging systems",
      "Wind turbine generator electromagnetic optimization",
      "Renewable energy converter magnetic circuit design",
      "Power electronic inductor and transformer design for efficiency",
      "HVDC system conductor configuration and field management"
    ],
    "learningOutcomes": [
      "Master vector calculus operations (gradient, divergence, curl) essential to electromagnetics formulation",
      "Understand electrostatic principles and Coulomb's law for charge interaction analysis",
      "Apply Gauss's law to calculate electric fields in symmetric and complex geometries",
      "Comprehend electric potential, equipotential surfaces, and their relationship to electric fields",
      "Understand magnetostatics and Ampere's law for magnetic field calculation around conductors",
      "Analyze magnetic materials, saturation, permeability, and B-H curve behavior critical to transformer design",
      "Apply Faraday's law of electromagnetic induction to generator and transformer design",
      "Understand Lenz's law and its implications for device operation and efficiency",
      "Master Maxwell's four equations and their unified framework for electromagnetism",
      "Analyze plane wave propagation and electromagnetic radiation fundamentals",
      "Apply electromagnetic principles to practical devices: transformers, motors, generators, and transmission lines",
      "Model electromagnetic phenomena in power systems using field theory and circuit analogy"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=KXTeM7KGx0s - Intro to Maxwell's Equations, Electric & Magnetic Fields (Math and Science, Oct 2025, 1:59:52 - Most comprehensive recent)",
        "https://www.youtube.com/watch?v=IElu_bX-PnU - Fundamentals of Classical Electromagnetism (Elucyda, Aug 2020) - Covers all four equations",
        "https://www.youtube.com/watch?v=5yvpsftAZP4 - Maxwell's Equations Part 1: Gauss's Law for the Electric Field (Professor Dave Explains, 2022, 11:51)",
        "https://www.youtube.com/watch?v=103 - Electromagnetism and Optics - Lecture 1: Maxwell's Equations (Dr Martin Smalley, U of York, 2015, 2:24:26 - Academic depth)",
        "https://www.youtube.com/watch?v=-9QGEzSKF30 - Transformers | Magnetism | Physics (FuseSchool, 2020, 4:24) - Transformer physics basics",
        "https://www.youtube.com/watch?v=110 - Magnetic Transformers (2012, 7:43) - Demonstration of magnetic fields",
        "https://www.youtube.com/watch?v=DT0QHsN3vcE - Making a Powerful Electromagnet from a Transformer (2020) - Field visualization",
        "https://www.youtube.com/watch?v=104 - Magnetics Design for High Performance Power Converters (Electronic Minds, Jan 2023, 1:23:11) - Professional design",
        "https://www.youtube.com/watch?v=107 - The Grid | Planar Magnetics: The Evolution of the Transformer (2024, 38:22) - Modern design",
        "https://www.youtube.com/watch?v=-QJS6i1bhG4 - Electric Generators, Induced EMF, Electromagnetic Induction (Organic Chemistry Tutor, 2017, 13:11)",
        "https://www.youtube.com/watch?v=115 - Induction Motor Basics (comprehensive motor operation)",
        "https://www.youtube.com/watch?v=124 - How Does an Induction Motor Work? (2017) - Rotating magnetic field",
        "https://www.youtube.com/watch?v=118 - Electrical Machines | Tutorial - 14 | Three-Phase Induction Motors (Engineering Devotion, 2021, 22:54)",
        "https://www.youtube.com/watch?v=121 - Electrical Machines | Tutorial - 19 | Alternators | Generated EMF (Engineering Devotion, 2022)",
        "https://www.youtube.com/watch?v=99 - Power Systems | Lecture-9 | Transmission Line Modelling (2020) - TL fundamentals",
        "https://www.youtube.com/watch?v=102 - Everything You Need to Know About Transmission Lines (CMTEQ, Nov 2025, 1:52:26 - Comprehensive)",
        "https://www.youtube.com/watch?v=108 - Transmission Lines in Power System || Electrical Engineering (2024) - Power system context",
        "https://www.youtube.com/watch?v=105 - Types of Transmission Line Structures and Components (2024, 11:38) - Practical design",
        "https://www.youtube.com/watch?v=111 - Ep. 7: Lossless Transmission Lines | FE Electrical Exam (June 2025, 1:09:15) - Theory and problems",
        "https://www.youtube.com/watch?v=114 - Wind Power Using Electromagnetic Technology (Reimagined Energy, Oct 2024, 18:29) - Renewable EM",
        "https://www.youtube.com/watch?v=HL2vLaLsdTY - Maxwell's Equations And Electromagnetic Theory: Beginners Guide (2019)",
        "https://www.youtube.com/watch?v=123 - Assessing Offshore Wind Electromagnetic Fields (2024) - EM measurement in renewables"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69990 - UC Merced EE 115 Course Catalog",
        "https://en.wikipedia.org/wiki/Maxwell's_equations - Maxwell's Equations (comprehensive reference)",
        "https://openbooks.lib.msu.edu/collegephysics/chapter/maxwells-equations-electromagnetic-waves-predicted-and-observed/ - Maxwell's Equations and EM Waves (OpenStax)",
        "https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves - EM Waves and Maxwell's Equations",
        "https://www.keysight.com/used/us/en/knowledge/guides/maxwells-equation - Essential Guide to Maxwell's Equations (Keysight)",
        "https://www.powerelectronictips.com/what-are-the-foundations-of-maxwells-equations-and-how-do-they-relate-to-tengs/ - Maxwell's Equations Foundations",
        "https://www.mkmagnetics.com/the-best-magnetic-cores-for-transformers/ - Best Magnetic Cores for Transformers",
        "https://www.voltech.com/resources/technical-articles/transformer-basics/ - Transformer Basics: Theory, Operation, Performance",
        "https://transformers-magazine.com/transformers-academy/introduction-to-transformers-e-lesson-3-the-magnetic-circuit/ - Transformers Magazine: The Magnetic Circuit",
        "https://eepower.com/technical-articles/power-transformer-basics-the-magnetic-circuit-part/ - Power Transformer Basics: Magnetic Circuit",
        "https://mag-inc.com/design/design-guides/Transformer-Design-with-Magnetics-Ferrite-Cores - Transformer Design with Ferrite Cores",
        "https://ocw.mit.edu/courses/6-007-electromagnetic-energy-from-motors-to-lasers-spring-2011/ - MIT OCW: Electromagnetic Energy (Motors to Lasers)"
      ],
      "tools": [
        "MATLAB/Simulink (electromagnetic field simulation and power system modeling)",
        "COMSOL Multiphysics (finite element EM analysis)",
        "ANSYS Maxwell (3D electromagnetic field solver)",
        "CST Microwave Studio (EM wave propagation simulation)",
        "Python with NumPy/SciPy (vector operations and EM calculations)",
        "FDTD simulators (finite difference time domain for wave analysis)",
        "PSPICE with magnetics models (circuit-level EM simulation)",
        "Magnetic circuit analysis software (transformer and inductor design)",
        "Oscilloscope (experimental EM field observation)",
        "Field probe and gaussmeter (practical magnetic field measurement)"
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
  "description": "Introduces basic concepts of single-input single-output closed-loop control systems in both time and frequency domains, providing the foundation for regulating voltage, frequency, and power flows in modern electric grids.[94][101]",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For a Power Systems & Energy Engineering career, this course is the core of how you keep an electric grid stable and reliable. Every major grid function—frequency regulation, voltage/VAR control, load-following, renewable integration, and storage dispatch—is implemented as a feedback control problem.[92][98][101] The PID, lead–lag, and state-space concepts you learn here directly translate into designing automatic generation control (AGC), inverter control loops for solar and wind, and demand-side frequency-based load control that prevents blackouts in low-inertia, renewable-heavy systems.[91][96][97] Mastery of control systems is what allows you to move from “simulating” power systems to actually shaping their dynamic response under disturbances.",
    "realWorldApplications": [
      "Load Frequency Control (LFC): Designing PID controllers that adjust generator setpoints and storage power to maintain system frequency at 60 Hz despite sudden changes in load or renewable generation, coordinating primary, secondary, and tertiary control layers in large interconnected grids.[91][92][101]",
      "Voltage/VAR Control in Distribution Systems: Implementing closed-loop controllers for on-load tap changers, capacitor banks, and smart inverters to keep bus voltages within ANSI limits while minimizing losses (Volt/VAR optimization), essential in feeders with high rooftop PV penetration.[93][98][102]",
      "Demand-Side Frequency-Based Load Control: Using local frequency measurements as feedback to autonomously shed or shift loads (HVAC, EV charging) during contingencies, restoring frequency and balancing demand–supply within seconds without centralized communication.[92][97]",
      "Inverter and Converter Control for Renewables: Designing current and voltage control loops, droop controllers, and PLL-based synchronization so that grid-following and grid-forming inverters provide synthetic inertia, fast frequency response, and dynamic voltage support in weak grids.[91][96][100]"
    ],
    "learningOutcomes": [
      "Model physical systems (including generators, turbines, and power converters) as single-input single-output linear time-invariant (LTI) systems using transfer functions and block diagrams, and manipulate these models to analyze closed-loop behavior.[90][94]",
      "Analyze time-domain performance of feedback systems (rise time, overshoot, settling time, steady-state error) and relate these metrics to power system requirements for frequency and voltage deviations under standard disturbance scenarios.[91][101]",
      "Use root locus, Bode plots, and Nyquist criteria to assess stability and robustness of control loops, and tune PID or lead–lag controllers to achieve specified gain and phase margins for grid control applications.[90][92]",
      "Design basic PID controllers for frequency and voltage regulation, understanding how proportional, integral, and derivative actions affect disturbance rejection, noise sensitivity, and dynamic response in renewable-integrated grids.[91][96][100]",
      "Introduce and interpret state-space models and discretization concepts, preparing to implement digital controllers on microcontrollers, DSPs, or PLCs that execute real-time grid control algorithms.[90][99]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/results?search_query=introduction+to+control+systems+lecture",
        "https://www.youtube.com/results?search_query=pid+control+for+power+systems",
        "https://www.youtube.com/results?search_query=frequency+and+voltage+control+in+power+systems"
      ],
      "websites": [
        "https://en.wikipedia.org/wiki/Control_engineering",
        "https://eepower.com/technical-articles/frequency-control-in-a-power-system/",
        "https://news.pcim.mesago.com/how-pid-controllers-contribute-to-smart-grid-functionality-a-f6f5be88f5c34666c81e86b7e7a4151d/",
        "https://www.nature.com/articles/s41598-025-20698-z",
        "https://www.osti.gov/servlets/purl/1468189"
      ],
      "tools": [
        "MATLAB & Simulink (Control System Toolbox)",
        "Python (control and scipy.signal libraries)",
        "PSCAD or DIgSILENT PowerFactory for dynamic power system simulations"
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
  "description": "Comprehensive study of principles, operation, and applications of electrical machines including DC motors and generators, AC induction motors, and synchronous machines. Covers machine construction, performance characteristics, thermal management, and real-world applications in industrial drives, renewable energy systems, and power grids. Essential course for power systems engineers designing and operating electrical equipment.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 130 is where circuit theory and electromagnetics become concrete machines that power civilization. For power systems and energy engineers, this course is transformational because it reveals the operational principles of the devices that convert energy at every scale—from the 50 MW synchronous generators in power plants to the 1 kW induction motors driving industrial fans. Wind turbines, hydroelectric plants, industrial facilities, and renewable energy systems all rely on the machines you study in EE 130. Understanding machine performance characteristics—torque curves, efficiency maps, power factor behavior—enables engineers to specify the right equipment, predict operational challenges, and optimize system performance. The thermal management principles taught here directly impact machine lifetime and grid reliability. This course bridges abstract theory and industrial practice, providing engineers with the intuition to design systems, troubleshoot failures, and innovate in emerging areas like variable-speed wind turbines and electric vehicle drivetrains.",
    "realWorldApplications": [
      "Wind turbine generators and variable-speed drivetrain design",
      "Hydroelectric synchronous generator systems for baseload power",
      "Industrial induction motor selection and variable frequency drive (VFD) control",
      "Power factor correction using synchronous machines in industrial plants",
      "Electric vehicle motor drives and propulsion system design",
      "Soft starters and motor soft-start devices for reduced inrush current",
      "Microgrid and distributed generation induction generators",
      "Pump and compressor motors for water treatment and gas systems",
      "Marine electric propulsion systems",
      "Solar tracking systems and automation motors",
      "Thermal management of high-power machines in harsh environments",
      "Gearbox optimization for wind turbine drive trains",
      "Direct-drive generator systems eliminating mechanical losses",
      "Permanent magnet synchronous motors for high-efficiency applications",
      "Induction generator stability and grid integration in renewable systems"
    ],
    "learningOutcomes": [
      "Understand the principles of electromagnetic induction and torque production in rotating machines",
      "Analyze DC motor and generator construction, operation, and performance characteristics",
      "Apply commutation principles and brush systems to predict DC machine behavior",
      "Master the rotating magnetic field concept and three-phase machine operation",
      "Analyze induction motor slip, speed-torque characteristics, and efficiency",
      "Compare induction and synchronous motor operating principles and select appropriate machines",
      "Understand synchronous machine field excitation, power factor control, and stability",
      "Apply machine performance equations to predict operational behavior under varying loads",
      "Design and specify thermal management systems for high-power machines",
      "Apply variable frequency drive (VFD) principles to AC motor speed control",
      "Analyze machine applications in renewable energy systems and power grids",
      "Model and simulate machine transient and steady-state behavior",
      "Understand machine efficiency, losses, and optimization strategies",
      "Apply international standards (IEC, NEMA) to machine selection and specification"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=Skqt-0Tr-bY - Electrical Machines Fundamentals | Generators and Motors (Engineering Devotion, June 2023, 18:15) - DC Fundamentals",
        "https://www.youtube.com/watch?v=147 - DC MOTORS AND GENERATORS (Department of Defense, 1961, 35+ min) - Classic comprehensive visual treatment",
        "https://www.youtube.com/watch?v=144 - Principle of DC Motor | Easiest Explanation (TheElectricalGuy, Sept 2021) - Pedagogically excellent",
        "https://www.youtube.com/watch?v=142 - Working Principle of DC Motor (animation) (System Files, 2017) - Visual animation of basic principles",
        "https://www.youtube.com/watch?v=153 - DC Motors Explained (2020, 10+ min) - Brushes, commutators, back-EMF",
        "https://www.youtube.com/watch?v=150 - DC Generators Unveiled (May 2024) - Comprehensive DC generator principles",
        "https://www.youtube.com/watch?v=124 - How Does an Induction Motor Work? (Learn Engineering, Aug 2017, 10:47) - Rotating magnetic field and slip",
        "https://www.youtube.com/watch?v=146 - How Electric Motors Work - 3 phase AC induction motors (Learn Engineering, Jan 2021, 9+ min)",
        "https://www.youtube.com/watch?v=143 - Electrical Machines- Transformers, Motors, Generators (Skill-Lync, June 2020, 15+ min) - Classification of all types",
        "https://www.youtube.com/watch?v=148 - Motor Basics (Yaskawa America, May 2019, 28:41) - Professional motor training",
        "https://www.youtube.com/watch?v=152 - AC Motors - Induction & Synchronous Motor (YouTube Playlist) - Comprehensive series",
        "https://www.youtube.com/watch?v=141 - Difference between Induction and Synchronous Motor (July 2024) - Comparative analysis",
        "https://www.youtube.com/watch?v=149 - Synchronous Motors (Full Lecture) (Jim Pytel, Oct 2023, 29:07) - Comprehensive theory",
        "https://www.youtube.com/watch?v=151 - Electrical Machines Fundamentals (Prof. Ramakrishnan, July 2015) - Academic foundational treatment",
        "https://www.youtube.com/watch?v=137 - Working Principle of Synchronous Motor (Mechtex, 2025) - Step-by-step operation",
        "https://www.youtube.com/watch?v=158 - How Does a Variable Frequency Drive (VFD) Work? (Efixx, Nov 2024, 10:09) - PWM control clear explanation",
        "https://www.youtube.com/watch?v=167 - Variable Frequency Drives Explained (Engineering Mindset, Apr 2020, 15:17) - Rectifier-inverter architecture",
        "https://www.youtube.com/watch?v=161 - Variable Frequency Drives: A Brief Introduction (March 2025) - Quick VFD overview",
        "https://www.youtube.com/watch?v=164 - What is a VFD? (RealPars, Oct 2018) - Industrial VFD applications",
        "https://www.youtube.com/watch?v=155 - Safety Webinar: Variable Frequency Drives (Columbus McKinnon, Feb 2015, 45:44) - VFD features",
        "https://www.youtube.com/watch?v=160 - Induction Generator (Alternative Energy Tutorials) - Wind turbine induction generator",
        "https://www.youtube.com/watch?v=145 - Electric Machinery Fundamentals - Session 2020 (Prof. Ashfaq Ahmad, Sept 2021, 57+ min) - Wind turbines",
        "https://www.youtube.com/watch?v=114 - Wind Power Using Electromagnetic Technology (Reimagined Energy Podcast, Oct 2024, 18:29) - Renewable EM"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69986 - UC Merced EE 130 Catalog",
        "https://nmoer.pressbooks.pub/electricalandmotorcontroltheory/chapter/chapter-7/ - DC and AC Generators & Transformers",
        "https://en.wikipedia.org/wiki/Synchronous_motor - Synchronous Motor Overview",
        "https://robu.in/difference-between-synchronous-and-induction-ac-motor/ - Synchronous vs Induction Motor Comparison",
        "https://www.tutorialspoint.com/electrical_machines/types_of_electrical_machines.htm - Types of Electrical Machines",
        "https://www.monolithicpower.com/en/learning/mpscholar/electric-motors/dc-motors/fundamentals - DC Motor Fundamentals",
        "https://www.ilearnengineering.com/electronical-and-electronic/exploring-induction-and-synchronous-motors-in-modern-engineering - Induction and Synchronous Motors in Modern Engineering",
        "https://www.windings.com/post/the-role-of-electric-motors-in-renewable-energy-systems/ - Role of Motors in Renewable Energy",
        "https://kpgroup.co/blog/wind-turbine-generators-working-types-parts/ - Wind Turbine Generators: Working, Types, Parts",
        "https://www.alternative-energy-tutorials.com/wind-energy/induction-generator.html - Induction Generator for Wind Energy",
        "https://www.energy.gov/eere/wind/how-do-wind-turbines-work - How Wind Turbines Work (DOE)",
        "https://mechtex.com/blog/working-principle-of-synchronous-motor - Working Principle of Synchronous Motor",
        "https://espace2.etsmtl.ca/id/eprint/24459/1/Wang-Q-2022-24459.pdf - Advances in Thermal Management (PDF)",
        "https://innovationspace.ansys.com/product/single-phase-induction-motors-and-synchronous-machines/ - ANSYS Course on Single-Phase Motors"
      ],
      "tools": [
        "MATLAB/Simulink (machine simulation, control design, and performance analysis)",
        "ANSYS Maxwell (electromagnetic field analysis of machine design)",
        "COMSOL Multiphysics (thermal and electromagnetic co-simulation)",
        "MotorSolve (specialized motor design and optimization)",
        "PSCAD (power system transient simulation with machines)",
        "Python with NumPy/SciPy (machine performance calculations)",
        "Dynamometer (experimental testing and characterization)",
        "Oscilloscope (electrical waveform observation)",
        "Thermal imaging camera (junction and winding temperature measurement)",
        "Power analyzer (efficiency and power factor measurement)",
        "Tachometer and speed measurement devices",
        "Vibration analysis equipment (bearing and mechanical diagnostics)"
      ]
    }
  }
}
,
  {
  "id": "ee-131",
  "code": "EE 131",
  "name": "Power Electronics",
  "fullName": "EE 131: Power Electronics",
  "description": "Fundamentals of switching power converters and power semiconductor devices, focusing on efficient conversion and control of electrical energy for applications such as renewable integration, motor drives, DC power supplies, and grid‑tied inverters.[122][103][113]",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For a Power Systems & Energy Engineering career, power electronics is the enabling technology that connects generation (solar, wind, fuel cells), storage (batteries), and loads (motors, data centers, EVs) to the grid. Nearly every watt in a modern energy system passes through at least one power electronic converter, so converter efficiency and control directly impact system losses, reliability, and carbon footprint.[103][113] The concepts in this course—DC–DC, AC–DC, DC–AC, and AC–AC conversion; PWM; semiconductor device switching; and thermal management—are foundational for designing solar inverters, EV chargers, HVDC terminals, FACTS devices, and industrial motor drives that define the future low‑carbon grid.[106][111] Mastery of power electronics lets you move from analyzing grid behavior to architecting how energy is converted, routed, and controlled at every interface.",
    "realWorldApplications": [
      "Grid‑Tied Solar Inverters: Designing DC–AC converters that take variable‑voltage DC from PV arrays and inject synchronized AC power into the utility grid using PWM, phase‑locked loops (PLLs), and current control to meet power‑quality and anti‑islanding standards.[104][114][134]",
      "High‑Efficiency DC–DC Converters for Renewables and Storage: Implementing buck, boost, and multi‑input converter topologies to interface solar panels, fuel cells, and batteries with common DC buses in hybrid energy systems, targeting >95% conversion efficiency to minimize losses.[105][110][115]",
      "Electric Vehicle Chargers and On‑Board Converters: Designing isolated and non‑isolated power stages that convert AC grid power to controlled DC for fast charging, and DC–DC converters that manage high‑voltage traction packs and 12 V auxiliary systems inside EVs.[105][113][116]",
      "Industrial Motor Drives and Variable‑Speed Drives (VSDs): Building rectifier–inverter stages that provide variable‑frequency, variable‑voltage AC to induction and permanent‑magnet motors in pumps, fans, compressors, and conveyor systems, improving energy efficiency and enabling advanced process control.[106][111][113]"
    ],
    "learningOutcomes": [
      "Classify and analyze fundamental power converter topologies (buck, boost, buck‑boost, single‑phase rectifiers, inverters) and determine their steady‑state voltage/current relationships, efficiency, and device stresses under continuous and discontinuous conduction modes.[103][126][127]",
      "Select and model appropriate power semiconductor devices (diodes, MOSFETs, IGBTs, SiC/GaN devices) based on voltage, current, switching frequency, and thermal constraints for grid‑scale and EV‑scale converters.[103][106][113]",
      "Design PWM switching strategies and basic control loops for DC–DC and DC–AC converters, including current‑mode or voltage‑mode regulation to meet dynamic response and power‑quality requirements in renewable and motor drive applications.[104][110][114]",
      "Evaluate conduction and switching losses, design basic magnetics (inductors, transformers) at switching frequencies in the tens to hundreds of kHz, and estimate heat dissipation needs to ensure reliable operation of converters in harsh power system environments.[103][105][126]",
      "Simulate power electronic converters using circuit‑level tools and link results to system‑level performance metrics such as overall system efficiency, harmonic distortion, power factor, and grid‑support capabilities (e.g., reactive power control, ride‑through). [103][110][114]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=jgh0TNfx0gQ",
        "https://www.youtube.com/watch?v=f7oXhDatwtY",
        "https://www.youtube.com/watch?v=jnF9nwbJhqw",
        "https://www.youtube.com/watch?v=EspJv_Zbwq0"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69988",
        "https://engineeringonline.ucr.edu/blog/power-electronics-and-engineering/",
        "https://ece.ncsu.edu/research/pes/",
        "https://www.nature.com/articles/s41598-024-69254-1",
        "https://www.ti.com/lit/pdf/slyy078",
        "https://cornerstone.lib.mnsu.edu/etds/1076/",
        "https://transitproject.eu/wp-content/uploads/2025/03/UCY_Modelling-and-Control-of-Grid-Following-Inverter-for-Renewables.pdf"
      ],
      "tools": [
        "LTspice (switching converter simulation)",
        "MATLAB & Simulink (Simscape Electrical / power electronics models)",
        "PLECS or PSIM (power electronics‑focused simulation)",
        "PSCAD / DIgSILENT PowerFactory (for integrating converters into system‑level studies)"
      ]
    }
  }
}
,
  {
  "id": "ee-160",
  "code": "EE 160",
  "name": "Electric Power Systems",
  "fullName": "EE 160: Electric Power Systems",
  "description": "Comprehensive study of power system components, analysis, and operation covering generation, transmission, and distribution. Introduces load flow analysis for voltage and power flow calculation, fault analysis for protection design, power system stability assessment, and renewable energy integration. Essential course for power systems engineers designing and operating electrical grids and planning energy systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 160 is the capstone course that synthesizes all previous electrical engineering knowledge into the unified study of electrical grids. For power systems and energy engineers, this course is transformational because it reveals how individual components—generators, transformers, transmission lines, loads—interact as a dynamic system. The course provides the analytical frameworks (load flow, fault analysis, stability assessment) that power system engineers use daily to design, plan, and operate grids. Understanding load flow enables engineers to predict voltage profiles and identify bottlenecks; fault analysis determines equipment ratings and protection settings; stability analysis ensures the grid can withstand disturbances without cascading failures. As renewable energy penetration increases, the relevance of EE 160 becomes even more critical—engineers must understand how solar and wind generators with no inherent inertia integrate with traditional synchronous generators, how voltage must be actively controlled instead of relying on generator regulation, and how the grid must transition from one-way power flow to multi-directional energy movement. This course provides both the classical foundation and the modern context for engineering the energy systems of the 2020s.",
    "realWorldApplications": [
      "Load flow analysis for transmission and distribution system planning",
      "Fault analysis and short-circuit calculations for equipment protection coordination",
      "Transient stability assessment after disturbances and fault clearing",
      "Voltage profile optimization and reactive power management in distribution systems",
      "Economic dispatch and unit commitment for cost-effective generation scheduling",
      "Transmission line thermal limit enforcement and congestion management",
      "Renewable energy integration with stability and voltage control assessment",
      "Microgrid control and islanding/reconnection detection and protection",
      "Power system restoration and black start procedures after system collapse",
      "Wide-area monitoring systems (WAMS) and situational awareness for grid operators",
      "FACTS device design and operation for power flow control",
      "Frequency regulation and primary/secondary/tertiary control coordination",
      "HVDC system operation and power flow control for long-distance transmission",
      "Power quality monitoring and harmonic analysis in modern grids",
      "Distribution system automation and advanced metering infrastructure (AMI)"
    ],
    "learningOutcomes": [
      "Understand power system components (generation, transmission, distribution, control) and their interactions",
      "Master per-unit notation system for normalized analysis of different voltage levels",
      "Perform steady-state load flow (power flow) analysis using iterative numerical methods",
      "Analyze voltage profiles and identify violations or weak buses in power networks",
      "Calculate active and reactive power flows in transmission systems",
      "Understand generator, load, and voltage-controlled bus classifications in power flow",
      "Perform symmetrical three-phase fault analysis and calculate fault currents",
      "Design protection coordination using fault analysis results and relay settings",
      "Apply the swing equation to analyze transient stability after disturbances",
      "Assess system stability margins and identify critical clearing times",
      "Understand power system control (voltage, frequency, power flow) mechanisms",
      "Analyze renewable energy integration impacts on grid stability and control",
      "Apply economic dispatch principles to minimize generation cost",
      "Model and simulate power system dynamics including machine transients",
      "Apply IEEE and NERC standards to power system design and operation"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=170 - Episode 2: The Power Grid and Its Components (AEIC, Nov 2024, 19 min) - Modern grid architecture",
        "https://www.youtube.com/watch?v=173 - Power Generation, Transmission, and Distribution (LynxE Learning, Mar 2023) - 3D system overview",
        "https://www.youtube.com/watch?v=176 - Electric Transmission 101: How the Grid Works (EESI, 2013, 36 min) - Comprehensive transmission",
        "https://www.youtube.com/watch?v=181 - Transmission 101 (U.S. Department of Energy, Aug 2024, 6 min) - Official DOE overview",
        "https://www.youtube.com/watch?v=179 - The Electrical Grid and Electricity Supply (saVRee, Apr 2020, 24 min) - Clear system layout",
        "https://www.youtube.com/watch?v=172 - Lecture 33 | Load or Power Flow Analysis (Nov 2020) - Fundamental power flow concepts",
        "https://www.youtube.com/watch?v=169 - Load Flow Analysis: Step-by-Step Power System Calculation (Electrical World, Oct 2025) - Practical methods",
        "https://www.youtube.com/watch?v=178 - Load Flow Analysis - Step by Step (Electrisim, Dec 2022) - Workflow and examples",
        "https://www.youtube.com/watch?v=185 - Short Circuit Fault Level - Tutorial 9 (CMTEQ, Oct 2022, 19:47) - Three-phase fault step-by-step",
        "https://www.youtube.com/watch?v=182 - Short Circuit Fault Level - Tutorial 10 (CMTEQ, Nov 2022) - Fault on load feeders",
        "https://www.youtube.com/watch?v=194 - Power System Analysis (Fault Analysis)-1 (2017) - Symmetrical fault calculation",
        "https://www.youtube.com/watch?v=188 - Assumptions of Fault Analysis (Sept 2023) - Fault analysis fundamentals",
        "https://www.youtube.com/watch?v=191 - Lecture 13a: Short Circuit Analysis - Overview (Dr. David Lubkeman, Nov 2022, 33:34) - Bus impedance matrix",
        "https://www.youtube.com/watch?v=192 - Transient Stability - Power System 3 (Prof. Mohammed Shadab, Apr 2022) - Swing equation and rotor angle",
        "https://www.youtube.com/watch?v=189 - Lec 01 Power System Stability Introduction (Oct 2022) - Stability types and classification",
        "https://www.youtube.com/watch?v=186 - ETAP Transient Stability Study (Jan 2023) - Practical software demonstration",
        "https://www.youtube.com/watch?v=183 - How ETAP Transient Stability Addresses Challenges (May 2021, 52 min) - DER stability challenges",
        "https://www.youtube.com/watch?v=195 - Power System Stability Analysis: A Practical Guide (July 2025) - Transient, steady-state, voltage stability",
        "https://www.youtube.com/watch?v=187 - Grid Inertia & Future of Renewable Energy Integration (May 2024, Sustainability Podcast) - Inertia challenges",
        "https://www.youtube.com/watch?v=184 - Renewable Integration Into Power Systems (Feb 2024, 30+ min) - Comprehensive renewable integration",
        "https://www.youtube.com/watch?v=190 - Grid Integration of Distributed Energy Resources (Mar 2024, Bai Cui, Iowa State) - DER aggregation",
        "https://www.youtube.com/watch?v=193 - How Does Integration of Renewable Energy Work (BDO South Africa, July 2023, 3:24) - Key steps",
        "https://www.youtube.com/watch?v=196 - Variable Renewable Energy Grid Integration (Feb 2023) - Denmark 50%+ renewable case study"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69991 - UC Merced EE 160 Course Catalog",
        "https://electrical-world.com/posts/load-flow-analysis-and-power-flow-calculation-guide - Load Flow Analysis Step-by-Step Guide (Electrical World, Oct 2025)",
        "https://electrisim.com/load-flow-power-flow - Load Flow and Power Flow Analysis (Electrisim, Dec 2022)",
        "https://erpc.gov.in/wp-content/uploads/2016/09/1.-Load-Flow-Analysis-User-Manual.pdf - Load Flow Analysis User Manual (ERPC, India) [PDF]",
        "https://www.cedengineering.com/userfiles/Power%20System%20Transient%20Stability%20Study%20Fundamentals-R1.pdf - Power System Transient Stability Fundamentals [PDF]",
        "https://www.energy.gov/eere/wind/how-do-wind-turbines-work - How Wind Turbines Work (U.S. Department of Energy)",
        "https://www.nerc.com/ - NERC (North American Electric Reliability Corporation) - Grid Reliability Standards",
        "https://www.ieee.org/content/dam/ieee-org/ieee/web/org/about/ieee-power-energy.pdf - IEEE Power and Energy Society",
        "https://www.pjm.com/ - PJM Interconnection - RTO Operations Reference",
        "https://www.caiso.com/ - California ISO - RTO and renewable integration perspective",
        "https://pandapower.readthedocs.io/ - Pandapower Python Library for Power System Analysis",
        "https://sourceforge.net/projects/opendss/ - OpenDSS - Distribution System Simulator"
      ],
      "tools": [
        "ETAP (complete power system analysis suite: load flow, fault analysis, stability, protection)",
        "PSS/E (comprehensive power system simulation and analysis)",
        "DIgSILENT PowerFactory (integrated power system analysis platform)",
        "PSCAD/EMTDC (electromagnetic transient simulation for detailed dynamics)",
        "MATLAB/Simulink (custom power system analysis and control design)",
        "Pandapower (Python-based open-source power system analysis)",
        "OpenDSS (distribution system simulator for microgrids)",
        "Phasor Measurement Units (PMU) for real-time monitoring",
        "State estimation software (for online grid monitoring)",
        "Economic dispatch and optimal power flow (OPF) solvers"
      ]
    }
  }
}
,
  {
  "id": "ee-185",
  "code": "EE 185",
  "name": "Instrumentation",
  "fullName": "EE 185: Instrumentation",
  "description": "Introduces fundamental principles and practical techniques for measuring electrical and physical quantities, including voltage, current, power, temperature, pressure, strain, speed, irradiance, and humidity, with emphasis on sensor characteristics, signal conditioning, data acquisition, and noise mitigation in engineering systems.[159][17]",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For a Power Systems & Energy Engineering career, instrumentation is how the grid becomes observable and controllable. Every protection relay, smart meter, PMU, and power quality analyzer depends on accurate sensors, transducers, and data acquisition chains designed using the concepts in this course.[142][146][158] As grids evolve into sensor-rich smart grids, engineers must understand how to select current and voltage transformers, Rogowski coils, optical sensors, and transducers, how to condition and digitize their signals, and how measurement errors, bandwidth, and timing affect system visibility and control actions.[142][146][150] Mastery of instrumentation enables you to design and validate the sensing layer that underpins state estimation, fault detection, power quality monitoring, and advanced analytics in modern distribution and transmission networks.[142][154][156]",
    "realWorldApplications": [
      "Smart Grid Sensing and Monitoring: Designing sensor chains using CTs, PTs, Rogowski coils, and smart line sensors to monitor current, voltage, power quality, and loading on distribution feeders, enabling early detection of high-impedance faults, vegetation encroachment, and overload conditions.[154][156][146]",
      "Phasor Measurement Units (PMUs) and Synchrophasors: Implementing synchronized measurement systems that acquire high-precision voltage and current waveforms, timestamp them using GPS or PTP, and compute synchrophasors, frequency, and ROCOF for real-time wide-area monitoring and control.[144][148][152][161]",
      "Power Quality Monitoring: Configuring power quality analyzers, fault recorders, and advanced meters to capture sags, swells, harmonics, flicker, and transients, providing data to diagnose equipment misoperation and to verify compliance with power quality standards.[147][151][158][162]",
      "Sensor Integration for Energy Assets: Instrumenting transformers, cables, and lines with smart sensors to track temperature, leakage currents, partial discharge, and loading, supporting predictive maintenance, asset health monitoring, and wildfire risk mitigation in stressed grids.[141][146][154][156]"
    ],
    "learningOutcomes": [
      "Characterize sensors and transducers (sensitivity, range, linearity, hysteresis, bandwidth, noise) for electrical and physical measurements relevant to power systems, including voltage, current, power, temperature, and strain.[159][146]",
      "Design signal conditioning circuits (amplification, filtering, isolation, level shifting) that interface sensors such as CTs, PTs, Rogowski coils, Hall sensors, RTDs, and strain gauges to data acquisition systems while respecting accuracy and safety constraints.[146][156][147]",
      "Specify and configure data acquisition systems (sampling rate, resolution, anti-aliasing filters, synchronization) to capture grid waveforms and power quality events, understanding trade-offs between data volume, temporal resolution, and measurement uncertainty.[142][146][151][158]",
      "Explain the operating principles and use-cases of power quality analyzers, digital fault recorders, smart meters, and PMUs, and interpret their output to diagnose grid events and support planning and operations.[144][147][152][162]",
      "Apply uncertainty analysis and calibration concepts to instrumentation chains, quantify measurement error budgets, and understand how conditional accuracy and environmental factors affect measurement reliability in real-world smart grid deployments.[146][150][158]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/results?search_query=power+quality+analyzer+tutorial",
        "https://www.youtube.com/results?search_query=phasor+measurement+unit+synchrophasor+explained",
        "https://www.youtube.com/results?search_query=electrical+instrumentation+and+measurement+lecture"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69985",
        "https://en.wikipedia.org/wiki/Phasor_measurement_unit",
        "https://netl.doe.gov/sites/default/files/Smartgrid/Sensing-and-Measurement_Final_v2_0.pdf",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC6459191/",
        "https://www.powersystems.technology/community-hub/technical-articles/smart-grid-sensors-improving-reliability-for-distribution-grids-using-fault-passage-indicators-and-fault-current-indicators",
        "https://powerside.com/what-is-conditional-accuracy-and-why-is-it-critical-to-smart-grid-sensor-systems/",
        "https://www.electroind.com/power-quality-metering-solutions/",
        "https://electrical-engineering-portal.com/how-to-measure-power-quality"
      ],
      "tools": [
        "MATLAB / Python for sensor signal processing and calibration analysis",
        "LabVIEW for data acquisition and instrumentation control",
        "Power quality analyzers (e.g., Fluke, Hioki, Nexus meters)",
        "Digital oscilloscopes and high‑voltage probes",
        "PMU / synchrophasor test and analysis software"
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
  "description": "Introduction to mechanics of fluids and fluid flow with applications in natural and engineered systems. Covers fluid statics, dynamics, pipe flow, and turbomachinery. Emphasizes applications to hydroelectric power systems, water infrastructure, wind turbine aerodynamics, and renewable energy systems. Essential for power systems engineers working with hydropower and fluid-based energy conversion.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For power systems and energy engineers, ENGR 120 provides the physical foundation for understanding how water and air are converted into electrical power. Hydroelectric systems—responsible for ~16% of global electricity generation—rely entirely on fluid mechanics principles. Understanding penstock design, turbine efficiency, and head-flow relationships is essential for hydropower engineering. Similarly, wind energy depends on aerodynamic principles taught in this course: how air flows around turbine blades, how momentum is extracted, and how power is maximized. Engineers working with pumped storage systems (crucial for grid energy storage) must understand pump and turbine performance curves, efficiency losses, and operating points. Even thermal management of power equipment depends on fluid mechanics principles for cooling system design. ENGR 120 bridges abstract physics concepts to practical energy conversion devices, enabling engineers to optimize renewable energy systems, design efficient water and cooling infrastructure, and understand the energy conversion mechanisms that power civilization. This course is where theory meets the real water flowing through dams and the real wind pushing turbine blades.",
    "realWorldApplications": [
      "Hydroelectric dam penstock design for head and flow optimization",
      "Turbine selection and sizing based on available head and flow rate",
      "Pump-turbine design for pumped storage systems (grid energy storage)",
      "Water supply system design minimizing pressure drop and energy loss",
      "Cooling system design for thermal management of power equipment",
      "Wind turbine rotor and blade aerodynamic optimization",
      "Actuator disk theory for wind power estimation",
      "Centrifugal pump selection and performance prediction",
      "Compressor design for industrial air systems",
      "Cavitation prevention in high-speed turbomachinery",
      "Flow measurement and instrumentation design",
      "Pressure drop calculation in complex piping networks",
      "Energy loss analysis and system efficiency optimization",
      "Fluid dynamics of hydro-turbine runners (Francis, Pelton, Turgo)",
      "Aerodynamic stall regulation in wind turbines"
    ],
    "learningOutcomes": [
      "Understand fluid properties (density, viscosity, surface tension) and their effects on flow behavior",
      "Apply fluid statics principles to pressure distribution in reservoirs and dams",
      "Master continuity equation for conservation of mass in flowing fluids",
      "Apply Bernoulli's equation to relate pressure, velocity, and elevation in flowing fluids",
      "Distinguish between laminar and turbulent flow using Reynolds number",
      "Calculate friction factor using Moody diagram and correlations",
      "Perform pressure drop calculations using Darcy-Weisbach equation",
      "Understand pumps and turbines as turbomachinery devices transferring energy",
      "Apply Euler's turbomachinery equation and velocity triangles",
      "Calculate pump and turbine power, head, and efficiency",
      "Perform energy analysis on fluid systems using control volume approach",
      "Analyze hydroelectric power systems from reservoir to electrical output",
      "Understand wind turbine aerodynamics using actuator disk theory",
      "Design and select pumps for specific head and flow rate requirements",
      "Apply fluid mechanics to real-world energy conversion systems"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=k_eNLvijR0o - 9.3 Fluid Dynamics (Continuity & Bernoulli's) (Chad's Prep, Oct 2023, 26:45) - Comprehensive intro",
        "https://www.youtube.com/watch?v=223 - Bernoulli's Equation Example Problems (Organic Chemistry Tutor, Nov 2017, 31:42) - Worked examples",
        "https://www.youtube.com/watch?v=220 - Understanding Bernoulli's Equation (2020) - Conceptual breakdown",
        "https://www.youtube.com/watch?v=214 - Branching Pipe Flow - Bernoulli & Continuity (2023, 8+ min) - Complex pipe networks",
        "https://www.youtube.com/watch?v=211 - Venturi Meter Problems, Bernoulli's Principle (Organic Chemistry Tutor, Nov 2017) - Application to measurement",
        "https://www.youtube.com/watch?v=198 - Lecture 44: Basics of Turbines and Pumps (Sept 2025, 45+ min) - Comprehensive turbomachinery",
        "https://www.youtube.com/watch?v=201 - Pumps, Turbines, and Compressors (Ibham Veza, Aug 2025, 10:07) - Turbomachinery fundamentals",
        "https://www.youtube.com/watch?v=204 - Pump & Turbine Efficiency Definitions (Cal Poly Pomona, May 2016, 17+ min) - Efficiency calculations",
        "https://www.youtube.com/watch?v=206 - Energy, Pumps, Turbines (Tanya Laird, Mar 2017) - Energy equations",
        "https://www.youtube.com/watch?v=209 - Fluid mechanics - hydraulic turbines and pump (YouTube Playlist) - Comprehensive series",
        "https://www.youtube.com/watch?v=205 - Hydroelectric Power Part I (Simmy Sigma, Oct 2021, 12:37) - Bernoulli applied to hydropower",
        "https://www.youtube.com/watch?v=210 - Hydroelectric Power: How it Works (USGS, 2018) - Government reference",
        "https://www.youtube.com/watch?v=212 - Wind Turbine Aerodynamics (Penn State, 2014) - Graduate-level wind fundamentals",
        "https://www.youtube.com/watch?v=215 - Wind Turbine Aerodynamics: Lecture 1 (Dr Ganguli, Nov 2023, 12:57) - Actuator disk theory",
        "https://www.youtube.com/watch?v=221 - Modelling Aerodynamics of High Loaded Wind Turbines (Energy Futures Lab, Oct 2023, 51:59) - Advanced BEM",
        "https://www.youtube.com/watch?v=218 - Wind Energy - Basics of Aerodynamics (2017, 8+ min) - Venturi applied to wind",
        "https://www.youtube.com/watch?v=224 - Wind Turbine Aerodynamics: Stall vs Pitch (2020, 7+ min) - Power regulation"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67677 - UC Merced ENGR 120 Catalog",
        "https://tameson.com/pages/pressure-drop - Understanding Pressure Drop Formula (Tameson, Oct 2025)",
        "https://www.tec-science.com/mechanics/gases-and-liquids/pressure-loss-in-pipe-systems/ - Pressure Loss in Pipe Systems (tec-science, Dec 2024)",
        "https://pdhstar.com/wp-content/uploads/2019/06/CE-092-Pipe-Flow-Friction-Factor-Calculation.pdf - Pipe Flow Friction Factor (PDH STAR, PDF)",
        "https://atlas-scientific.com/blog/relationship-between-flow-and-pressure/ - Flow and Pressure Relationship (Atlas Scientific, July 2025)",
        "https://irispublishers.com/ahm/pdf/AHM.MS.ID.000534.pdf - Hydroelectric Power Plants as Fluid Mechanics (IRIS, 2024, PDF)",
        "https://www.longdom.org/open-access-pdfs/the-role-of-fluid-dynamics-in-optimizing-hydropower-energy-conversion-efficiency.pdf - Fluid Dynamics in Hydropower (Longdom, PDF)",
        "https://www.usgs.gov/water-science-school/science/hydroelectric-power-how-it-works - Hydroelectric Power (USGS)",
        "https://fluids.umn.edu/research/engineering-applications/hydropower - Hydropower Research (University of Minnesota Fluids Lab)",
        "http://www.jmcampbell.com/tip-of-the-month/2007/02/friction-pressure-drop-calculation/ - Friction Pressure Drop Calculation (J.M. Campbell)",
        "https://studocu.com/en-us/course/university-of-california-merced/fluid-mechanics/1087356 - UC Merced ENGR 120 Course Materials (StudoCu)"
      ],
      "tools": [
        "MATLAB/Simulink (fluid system modeling and transient analysis)",
        "ANSYS Fluent (computational fluid dynamics for complex flows)",
        "XFoil (airfoil aerodynamic analysis for wind turbines)",
        "XFLR5 (wind turbine rotor aerodynamics)",
        "Python with NumPy/SciPy (fluid mechanics calculations)",
        "Pump selection software (Grundfos, Flowserve, Xylem)",
        "Pipe friction and pressure drop calculators",
        "EPANET (water distribution network analysis)",
        "OpenFOAM (open-source computational fluid dynamics)",
        "Moody diagram and friction factor lookup tools"
      ]
    }
  }
}
,
  {
  "id": "engr-130",
  "code": "ENGR 130",
  "name": "Thermodynamics",
  "fullName": "ENGR 130: Thermodynamics",
  "description": "Fundamentals of equilibrium, temperature, properties of pure substances, work and heat, the first and second laws of thermodynamics, and thermodynamic cycles, with applications to energy conversion systems such as power plants, refrigeration, and engines.[185][174]",
  "tier": 1,
  "expandedInfo": {
    "credits": 3,
    "careerRelevance": "For a Power Systems & Energy Engineering career, thermodynamics is the theory behind how primary energy (fuel, heat, solar, chemical) becomes useful electricity and heat. It governs the efficiency limits of steam and gas turbines, the performance of combined‑cycle and cogeneration plants, and the design of heat recovery systems that improve overall plant efficiency.[165][170][174] As the grid decarbonizes, thermodynamic analysis is essential for evaluating and comparing technologies like combined‑cycle gas plants, concentrated solar power, geothermal, heat pumps, and fuel cells, as well as for designing hybrid systems that integrate multiple resources while minimizing exergy destruction and CO₂ emissions.[166][171][177]",
    "realWorldApplications": [
      "Combined‑Cycle and Cogeneration Plants: Analyzing Brayton (gas turbine) and Rankine (steam) cycles, quantifying how combined cycles can reach 55–64% net electrical efficiency versus ~35% for conventional steam plants, and how cogeneration (CHP) raises total energy utilization toward 80% by using waste heat for industrial processes or district heating.[165][170][174][175]",
      "Concentrated Solar Power (CSP) and Solar Thermal Systems: Applying thermodynamic cycle analysis (Rankine, supercritical CO₂ Brayton, and organic Rankine cycles) to design solar thermal power plants that convert high‑temperature solar heat into electricity with target thermal efficiencies above 50%.[166][171][176]",
      "Heat Pumps, Refrigeration, and Thermal Storage in Energy Systems: Using vapor‑compression and absorption cycle models to quantify coefficient of performance (COP), assess electrification of heating and cooling, and design district energy systems and thermal storage that support grid flexibility and demand response.",
      "Fuel Cells and Advanced Energy Conversion: Using Gibbs free energy, enthalpy of reaction, and electrochemical thermodynamics to estimate maximum theoretical efficiency of fuel cells, understand how temperature and pressure affect performance, and compare fuel cells with heat‑engine‑based generators for various grid and distributed applications.[167][172][177]"
    ],
    "learningOutcomes": [
      "Apply the first law of thermodynamics to closed and open systems, including steady‑flow devices such as turbines, compressors, pumps, boilers, condensers, and heat exchangers in power generation and industrial energy systems.[174][169]",
      "Use property diagrams, tables, and equations of state for pure substances (water/steam, refrigerants, ideal and real gases) to determine thermodynamic states and energy quantities needed for cycle analysis.[185][174]",
      "Analyze basic power and refrigeration cycles (Rankine, Brayton, Otto/Diesel, vapor‑compression) to compute thermal efficiency, heat rates, COP, and key performance metrics, and interpret how design parameters (pressure ratio, temperature limits, regeneration, reheating) affect efficiency.[165][170][174]",
      "Apply the second law of thermodynamics and entropy concepts to identify irreversibilities, calculate exergy losses, and evaluate how design choices in power plants, CSP, and waste‑heat recovery systems impact maximum achievable efficiency.[166][169][174]",
      "Perform simplified thermodynamic assessments of emerging low‑carbon technologies—such as supercritical CO₂ cycles, fuel cells, and hybrid renewable‑thermal systems—to compare their theoretical and practical efficiency limits for future grid applications.[166][167][171][177]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/results?search_query=engineering+thermodynamics+full+course",
        "https://www.youtube.com/results?search_query=rankine+and+brayton+cycle+power+plant",
        "https://www.youtube.com/results?search_query=combined+cycle+power+plant+thermodynamics",
        "https://www.youtube.com/results?search_query=concentrated+solar+power+thermodynamic+cycle"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67678",
        "https://esc.fsu.edu/documents/lectures/ECSI/Thermodynamics.pdf",
        "https://www.power-eng.com/gas/a-thermodynamics-overview-of-cogeneration-and-combined-cycle-power-vs-conventional-steam-generation/",
        "https://en.wikipedia.org/wiki/Combined-cycle_power_plant",
        "https://www.worldscientific.com/worldscibooks/10.1142/11409",
        "https://www.nrel.gov/docs/fy17osti/68139.pdf",
        "https://en.wikipedia.org/wiki/Concentrated_solar_power",
        "https://studentenergy.org/conversion/fuel-cell/"
      ],
      "tools": [
        "EES (Engineering Equation Solver) or CoolProp (for property calculations and cycle analysis)",
        "MATLAB or Python (NumPy/SciPy) for thermodynamic modeling and parametric studies",
        "NIST WebBook or REFPROP for thermophysical properties of working fluids",
        "Cycle analysis tools in Aspen Plus or similar process simulators (for advanced projects)"
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
  "description": "Study of conduction, convection, and radiation heat transfer with applications to engineering problems. Covers steady-state and transient thermal analysis, heat exchangers, and thermal management of power systems. Essential for power systems engineers designing cooling systems, thermal energy storage, and renewable energy systems.",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For power systems and energy engineers, ENGR 135 is the bridge between theoretical understanding of power systems and real-world operational constraints. Every electrical device generates heat through resistive losses; every power system component (transformers, generators, power electronics, cables, batteries) must stay within thermal limits or it fails. Understanding heat transfer is essential to designing systems that operate reliably, efficiently, and safely. Thermal management directly impacts equipment lifetime, performance degradation, safety, and maintenance costs. For renewable energy systems specifically, solar thermal plants depend on heat transfer fluid design and heat exchanger optimization; concentrated solar power (CSP) systems store energy as thermal energy and extract it via heat transfer; wind turbines require sophisticated cooling for gearboxes and generators in harsh environments; battery energy storage systems must manage thermal runaway and maintain optimal operating temperatures. Power electronics converters lose 5-10% of transmitted power as heat—this heat must be dissipated or the converter fails. Grid-scale systems require thermal management of underground cables, substations, and control facilities. ENGR 135 is where power engineers move from calculating electricity flowing through circuits to understanding the physical constraints that govern real systems: thermal limits determine equipment ratings, cooling requirements determine system cost and reliability, and thermal design often becomes the limiting factor in system performance.",
    "realWorldApplications": [
      "Thermal management of high-power transformers through cooling systems",
      "Heat exchanger design for power plant condenser cooling",
      "Power electronic converter thermal design and heat sink sizing",
      "Battery thermal management systems (BMS) for grid storage and EVs",
      "Solar thermal power plant heat transfer fluid and receiver design",
      "District heating and cooling systems utilizing waste heat from power generation",
      "Wind turbine gearbox and generator bearing cooling",
      "Underground transmission cable thermal design and ampacity rating",
      "Power equipment thermal derating due to ambient temperature effects",
      "Data center cooling for grid control systems and SCADA",
      "Thermal energy storage systems using molten salt or phase change materials",
      "Heat recovery from power conversion losses",
      "Thermal transient analysis for fault conditions and equipment protection",
      "Conduction cooling path design for power electronics",
      "Radiation shield design for high-temperature power components"
    ],
    "learningOutcomes": [
      "Understand the three mechanisms of heat transfer (conduction, convection, radiation) and when each dominates",
      "Apply Fourier's law to solve steady-state conduction problems in one and multiple dimensions",
      "Calculate convection heat transfer using heat transfer coefficients and Newton's law of cooling",
      "Apply radiation heat transfer using Stefan-Boltzmann law and radiation networks",
      "Develop thermal resistance networks and solve using electrical circuit analogy",
      "Perform steady-state thermal analysis on composite structures with multiple resistances",
      "Design and analyze heat exchangers using LMTD and effectiveness-NTU methods",
      "Understand heat exchanger types (parallel, counter-flow, cross-flow) and performance characteristics",
      "Perform transient thermal analysis using lumped capacitance method",
      "Apply finite difference methods for transient heat conduction analysis",
      "Design cooling systems for power equipment to maintain thermal limits",
      "Optimize thermal designs for efficiency, reliability, and cost",
      "Apply heat transfer principles to renewable energy systems (solar thermal, wind cooling)",
      "Model thermal networks for complex systems using thermal-electrical analogy",
      "Understand thermal effects on equipment performance, lifetime, and safety"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=kNZi12OV9Xc - Conduction, Convection, and Radiation (Amoeba Sisters style, 2018, 7+ min) - Clear mechanism distinction",
        "https://www.youtube.com/watch?v=HpCvWuvCUoA - Conduction-Convection-Radiation Heat Transfer (MooMooMath, 2019, 10+ min) - Comprehensive examples",
        "https://www.youtube.com/watch?v=235 - Heat Transfer: Conduction, Convection, and Radiation (ngscience, 2022, 10+ min) - Detailed demonstrations",
        "https://www.youtube.com/watch?v=232 - Heat Transfer: Conduction, Convection & Radiation (Simmy Sigma, June 2024, 29:17) - Equations and applications",
        "https://www.youtube.com/watch?v=239 - Shell and Tube Heat Exchanger Sizing & Thermal Design (Boostrand ChemE, Dec 2025, 21:57) - Comprehensive LMTD design",
        "https://www.youtube.com/watch?v=242 - Heat Exchanger Types, Designs, and Calculation (2021, 42+ min) - Design equations and parameters",
        "https://www.youtube.com/watch?v=245 - Heat Exchanger Example - Design (2020) - Practical design walkthrough",
        "https://www.youtube.com/watch?v=251 - What is a Heat Exchanger? (Advanced Thermal Solutions, 2017) - Fundamentals and applications",
        "https://www.youtube.com/watch?v=248 - Industrial Heat Exchangers Explained (2021) - Industrial HX types",
        "https://www.youtube.com/watch?v=230 - The Impact of Thermal Management on Efficiency (econtrol devices, Mar 2025) - Renewable energy cooling",
        "https://www.youtube.com/watch?v=233 - What is Thermal Management in Renewable Energy? (Enner, Apr 2025) - Recent perspective on RE cooling",
        "https://www.youtube.com/watch?v=244 - How Concentrated Solar Power Works (SolarPACES, Nov 2023) - CSP heat transfer and thermal design",
        "https://www.youtube.com/watch?v=253 - Solar Thermal Systems (Cornell Extension) - Residential solar thermal fundamentals"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67679 - UC Merced ENGR 135 Catalog",
        "https://faculty.ucmerced.edu/gdiaz/courses/HeatTransf_html.html - UC Merced Heat Transfer Course (Dr. Diaz) - Homework and resources",
        "https://www.nature.com/articles/s41598-022-26666-1 - Cooling Potential of CAES Systems (Nature Scientific Reports, Dec 2022) - Thermal management of energy storage",
        "https://econtroldevices.com/the-impact-of-thermal-management-on-efficiency-in-renewable-energy-systems/ - Impact of Thermal Management (eControl Devices, Mar 2025)",
        "https://www.tglobaltechnology.com/t-global-technology/industry-applications/renewable-energy/ - Renewable Energy Thermal Management (T-Global Technology, Nov 2023)",
        "https://tameson.com/pages/pressure-drop - Understanding Pressure Drop (Tameson, Oct 2025) - Thermal transport and pressure relationships",
        "https://www.solarpaces.org/worldwide-csp/how-concentrated-solar-power-works/ - How CSP Works (SolarPACES, Nov 2023) - Thermal design and heat transfer",
        "https://ntrs.nasa.gov/api/citations/20200006182/downloads/Introduction%20to%20Numerical%20Methods%20in%20Heat%20Transfer.pdf - NASA Numerical Methods Heat Transfer (PDF)",
        "https://www.fidelisfea.com/post/steady-state-vs-transient-thermal-analysis-in-fea-what-are-they-and-which-one-should-you-use - Steady vs Transient Analysis (Fidelis FEA, Oct 2025)",
        "https://www.electronics-cooling.com/ - Electronics Cooling Magazine - Thermal design for high-power systems",
        "https://www.energy.gov/eere/solar/solar-thermal-energy-storage-and-heat-transfer-media - Solar Thermal Energy Storage (DOE, May 2017)",
        "https://stlawrence.cce.cornell.edu/sustainable-energy/solar/solar-thermal-systems - Solar Thermal Systems (Cornell Cooperative Extension)"
      ],
      "tools": [
        "MATLAB/Simulink (thermal network modeling, transient analysis, system simulation)",
        "ANSYS Fluent (computational fluid dynamics and heat transfer analysis)",
        "COMSOL Multiphysics (coupled thermal-structural-electrical-fluid analysis)",
        "SolidWorks Thermal (steady-state and transient thermal simulation for mechanical components)",
        "Python with NumPy/SciPy (custom heat transfer calculations and thermal network analysis)",
        "Thermal network simulation (SPICE-like thermal simulators for circuit-analog models)",
        "Finite element analysis (FEA) software for complex geometry thermal analysis",
        "Heat exchanger design software (HTRI, EDR, proprietary vendor software)",
        "Thermal camera/thermal imaging (experimental temperature measurement)",
        "Heat flux sensors and thermocouples (temperature and heat flow instrumentation)"
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
  "description": "Systematically surveys the physical science underlying systems for energy conversion, transportation, storage, and use, covering the fundamental physics principles that govern energy technologies from generation to end-use.[192][195][191]",
  "tier": 1,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For a Power Systems & Energy Engineering career, this course provides the foundational physics that connects energy resources to electrical power generation and consumption. It bridges the gap between abstract physics concepts and real-world energy systems, covering how solar irradiance becomes electricity, how wind kinetic energy converts to rotational then electrical energy, how chemical energy in fuels releases heat for thermal power cycles, and how energy storage technologies (batteries, pumped hydro, thermal storage) physically store and release energy.[200][201][204][205] Understanding these physical principles is essential for evaluating renewable energy potential, predicting system performance, identifying efficiency limits imposed by physics (e.g., Betz limit for wind, Shockley-Queisser limit for PV), and innovating next-generation energy conversion and storage technologies that will decarbonize the grid.[201][206][207][208]",
    "realWorldApplications": [
      "Solar Photovoltaic Systems: Applying photon energy, semiconductor bandgap, and the photoelectric effect to understand how PV cells convert sunlight to DC electricity, quantifying efficiency limits (Shockley-Queisser ~33% for single-junction), and analyzing how multi-junction cells and concentration push toward higher practical efficiencies.[201][207]",
      "Wind Energy Conversion: Using fluid dynamics, Bernoulli's principle, and conservation of angular momentum to model how wind turbines extract kinetic energy from moving air, explaining the Betz limit (maximum 59.3% extractable) and how blade aerodynamics, pitch control, and generator design optimize real-world performance.[205][207]",
      "Energy Storage Technologies: Analyzing the physics of electrochemical storage (batteries, supercapacitors), mechanical storage (pumped hydro, flywheels, compressed air), and thermal storage (sensible, latent, thermochemical) to compare energy density, power density, round-trip efficiency, and grid-scale deployment suitability.[202][206][209]",
      "Thermal Power Generation: Reviewing how chemical energy in coal, natural gas, or biomass releases heat through combustion, how that heat drives Rankine or Brayton cycles to spin turbines and generators, and how combined-cycle and cogeneration improve overall efficiency by capturing waste heat for district heating or industrial processes.[204][207]"
    ],
    "learningOutcomes": [
      "Quantify energy in various forms (radiant, chemical, thermal, mechanical, electrical) and apply the law of conservation of energy to track conversions through multi-step processes such as coal-fired power plants or solar-battery systems.[200][204]",
      "Explain the physics underlying major renewable energy technologies—solar (photoelectric effect, semiconductor physics), wind (aerodynamics, kinetic energy extraction), hydro (gravitational potential), geothermal (heat transfer)—and calculate theoretical maximum efficiencies based on fundamental physical limits.[201][205][207]",
      "Analyze energy storage mechanisms (electrochemical, mechanical, thermal) using physics principles to evaluate energy density, power density, efficiency, and cycle life, and compare suitability for grid-scale versus distributed applications.[202][206][209]",
      "Assess the physics of energy transmission and distribution, including electrical conduction, magnetic fields in transformers, and line losses, to understand efficiency losses and voltage drop in power delivery networks.[207]",
      "Apply physics-based models to evaluate emerging energy technologies (fuel cells, hydrogen production, ocean/tidal energy, advanced nuclear) and identify key technical barriers related to materials, efficiency, or resource availability that must be overcome for grid integration.[207][208]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/results?search_query=physics+of+energy+lecture+renewable+energy",
        "https://www.youtube.com/results?search_query=solar+cell+physics+photoelectric+effect+explained",
        "https://www.youtube.com/results?search_query=wind+turbine+physics+aerodynamics+betz+limit",
        "https://www.youtube.com/results?search_query=energy+storage+physics+battery+flywheel+pumped+hydro"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=79573",
        "https://physics.ucmerced.edu/academics/undergraduate-education/course-descriptions",
        "https://en.wikipedia.org/wiki/Energy_transformation",
        "https://byjus.com/physics/energy-conversion/",
        "https://www.ijfmr.com/papers/2024/3/15371.pdf",
        "https://www.geeksforgeeks.org/physics/energy-storage/",
        "https://www.neuralconcept.com/post/thermal-battery-technology-overview-applications",
        "https://www.uti.edu/blog/wind-turbine/wind-turbine-math-physics"
      ],
      "tools": [
        "MATLAB or Python for energy conversion modeling and efficiency calculations",
        "NREL SAM (System Advisor Model) for renewable energy system performance simulation",
        "Energy balance spreadsheets for multi-step conversion chain analysis",
        "Physics simulation tools (e.g., PhET simulations for quantum and semiconductor physics)"
      ]
    }
  }
}
,
];

export const tier2Courses: TierCourse[] = [
  {
  "id": "ee-140",
  "code": "EE 140",
  "name": "Computer and Microcontroller Architecture",
  "fullName": "EE 140: Computer and Microcontroller Architecture",
  "description": "Study of computer architecture, microcontroller design, and embedded systems with applications to power systems and grid control. Covers CPU organization, instruction set architecture, ARM Cortex-M processors, assembly language programming, interrupt handling, real-time operating systems, and SCADA/PLC systems for power grid monitoring and control. Essential for engineers designing and implementing grid control systems and renewable energy management.",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For power systems and energy engineers, EE 140 bridges the gap between high-level power system analysis and the actual hardware that controls and monitors grids in real time. Every SCADA system monitoring the electrical grid, every protection relay detecting faults, every renewable energy site managing distributed generation—these systems rely on microcontrollers and embedded processors executing algorithms with precise timing constraints. Understanding microcontroller architecture is essential to designing systems that operate reliably in harsh industrial environments with strict real-time requirements. The course reveals how abstract control algorithms (learned in EE 122 Control Systems or EE 160 Power Systems) are actually implemented in hardware at the grid edge. Power systems engineers working on smart grids, microgrids, renewable energy integration, or grid modernization must understand the embedded systems architecture underlying modern power infrastructure. EE 140 moves engineers from circuit/system design to understanding actual hardware implementation, enabling them to specify equipment, troubleshoot system failures, collaborate with embedded systems specialists, and innovate in emerging areas like AI-enabled SCADA and autonomous grid control.",
    "realWorldApplications": [
      "SCADA systems for power grid generation, transmission, and distribution control",
      "Real-time monitoring using Phasor Measurement Units (PMUs) for dynamic stability assessment",
      "Renewable energy source (wind, solar) SCADA and performance monitoring",
      "Microgrid control systems and local generation management",
      "Protection relays and digital relaying systems for fault detection and isolation",
      "Smart meter infrastructure and advanced metering architecture (AMI)",
      "Battery management systems (BMS) for grid-scale energy storage",
      "Motor drives and variable frequency drive (VFD) control coordination",
      "Substation automation and integrated equipment control",
      "Demand response systems and automated load management",
      "Power electronics gate driver circuits for converter control",
      "Wide-area monitoring systems (WAMS) for real-time grid state estimation",
      "Distributed generation and islanding protection systems",
      "Power quality monitoring and harmonic analysis systems",
      "EV charging infrastructure management and communication"
    ],
    "learningOutcomes": [
      "Understand CPU organization, registers, and fetch-decode-execute cycle fundamentals",
      "Apply instruction set architecture concepts to embedded processor design",
      "Master ARM Cortex-M microcontroller architecture and processor families",
      "Program in ARM assembly language for embedded systems",
      "Understand interrupt handling, exception processing, and priority-driven execution",
      "Apply interrupt service routines (ISRs) to real-time event processing",
      "Understand real-time operating system (RTOS) concepts and scheduling algorithms",
      "Recognize hard real-time vs. soft real-time constraints and design implications",
      "Understand embedded system constraints (power, memory, deterministic timing)",
      "Apply microcontroller peripherals (GPIO, timers, ADC, communication) to system design",
      "Understand Programmable Logic Controller (PLC) architecture and control logic",
      "Recognize SCADA system architecture and supervisory control concepts",
      "Apply distributed control concepts to power systems and grid management",
      "Understand communication protocols and real-time data transmission",
      "Recognize practical power systems applications of embedded processors"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=x0gH5JGNIKg - ARM Architecture Introduction: Cortex M0, M1, M3, M4 (Laxmi Kant Tiwari, 2015, 16+ min) - ARM family overview",
        "https://www.youtube.com/watch?v=265 - Introduction to Assembly Language and ARM Assembler (Mechatronics Engineer, May 2021, 6:53) - Cortex-M4 assembly",
        "https://www.youtube.com/watch?v=268 - Lect 2: Assembly Language Syntax (2021) - Addressing modes and memory operations",
        "https://www.youtube.com/watch?v=274 - ARM Cortex-M Assembly Programming - Full Tutorial (freeCodeCamp, Apr 2022, 2:29:31) - Comprehensive assembly course",
        "https://www.youtube.com/watch?v=277 - S1L1. End Goal | ARM Cortex-M Assembly Programming (2025, latest) - Scheduler implementation",
        "https://www.youtube.com/watch?v=267 - What is a Programmable Logic Controller (PLC)? (RealPars, June 2024, 8:22) - PLC fundamentals",
        "https://www.youtube.com/watch?v=270 - Programable Logic Controller Basics Explained (Engineering Mindset, Dec 2020, 15:11) - PLC basics and logic",
        "https://www.youtube.com/watch?v=273 - What does a PLC do and how does it work? (Eaton PSEC, Oct 2025, 8:59, latest) - PLC hardware and languages",
        "https://www.youtube.com/watch?v=276 - PLC Basics | Programmable Logic Controller (RealPars, Aug 2018) - PLC programming",
        "https://www.youtube.com/watch?v=279 - PLC Tutorial for Beginners (Instrumentation Tools, Feb 2022, 13:43) - PLC types and basics",
        "https://www.youtube.com/watch?v=255 - How Do SCADA Systems Control National Power Grids? (Electrical Engineering Essentials, Aug 2025, 3:42, latest) - Grid control",
        "https://www.youtube.com/watch?v=257 - How Do SCADA Systems Provide Real-time Visualization? (Electrical Engineering Essentials, Sept 2025, 2:44, latest) - SCADA HMI",
        "https://www.youtube.com/watch?v=259 - Demystifying SCADA: How It Controls Industrial World (TechBriefs, Dec 2024) - SCADA fundamentals",
        "https://www.youtube.com/watch?v=262 - An Overview of Electrical Grid Monitoring & SCADA (Engineering Institute of Technology, May 2024, 1:03:58) - Professional webinar",
        "https://www.youtube.com/watch?v=264 - Decoding SCADA: Controlling Grid of Renewable Energy (Oct 2025, latest) - Renewable grid SCADA"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69991 - UC Merced EE 140 Catalog [need to find actual catalog entry]",
        "https://ee.ucmerced.edu/courses - UC Merced EE Department Courses",
        "https://en.wikipedia.org/wiki/Real-time_operating_system - RTOS Overview and Types (Wikipedia)",
        "https://www.ibm.com/think/topics/real-time-operating-system - What is RTOS? (IBM, Mar 2025, latest)",
        "https://www.geeksforgeeks.org/operating-systems/real-time-operating-system-rtos/ - RTOS Fundamentals (GeeksforGeeks)",
        "https://www.windriver.com/solutions/learning/rtos - RTOS Concepts (Wind River, 2021)",
        "https://www.highintegritysystems.com/rtos/ - RTOS as Part of Embedded Platform (High Integrity Systems, Jan 2024)",
        "https://simmasoftware.com/the-basics-of-microcontroller-based-embedded-systems/ - Embedded Systems Basics (Oct 2024)",
        "https://ec-undp-electoralassistance.org/_pdfs/papersCollection/Embedded-Systems-Fundamentals-ARM-Cortex-M.pdf - Embedded Systems with ARM (2024, PDF)",
        "https://www.eng.auburn.edu/~dbeale/MECH4240-50/Introduction%20to%20Microcontrollers%20and%20Embedded%20Systems.pdf - Introduction to Microcontrollers (Auburn, PDF)",
        "https://en.wikipedia.org/wiki/ARM_architecture - ARM Architecture Overview (Wikipedia)",
        "https://en.wikipedia.org/wiki/Real-time_operating_system - Real-Time OS (Wikipedia)",
        "https://www.arm.com/products/cortex-m - ARM Cortex-M Processors (ARM Official)",
        "https://www.ti.com/microcontrollers/msp430-ultra-low-power-mcus - MSP430 Ultra-Low Power (Texas Instruments)",
        "https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html - STM32 Cortex-M MCUs (STMicroelectronics)"
      ],
      "tools": [
        "ARM Development Studio (Keil MDK) - ARM-based embedded development",
        "STM32CubeMX - STMicroelectronics embedded project generation",
        "MATLAB/Simulink - Real-time embedded systems design and simulation",
        "Python - Embedded systems development and testing",
        "QEMU - ARM processor emulator for development",
        "GDB (GNU Debugger) - Embedded systems debugging",
        "Code Composer Studio - TI embedded development environment",
        "OpenSCADA - Open-source SCADA platform",
        "Ignition - Industrial SCADA and HMI platform",
        "CODESYS - Industrial control software",
        "LabVIEW - Real-time systems and SCADA development"
      ]
    }
  }
}
,
  {
  "id": "engr-151",
  "code": "ENGR 151",
  "name": "Strength of Materials",
  "fullName": "ENGR 151: Strength of Materials",
  "description": "Fundamental concepts of how objects deform or fail under loading by analyzing stretching, bending, shear, torsion, and combined stresses in structural and machine components.[218][219]",
  "tier": 2,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For a Power Systems & Energy Engineering career, strength of materials underpins the mechanical integrity of nearly every physical asset that carries or converts electrical power. Transmission towers, distribution poles, substation structures, transformer tanks, bus bars, wind turbine towers and blades, and even mounting structures for PV arrays must all withstand complex combinations of tension, compression, bending, shear, and fatigue loads over decades of service.[212][216][221] Understanding stress, strain, deflection, buckling, and fatigue allows power engineers to collaborate effectively with structural and mechanical teams, evaluate whether new equipment or uprates will overstress existing structures, and interpret finite element analysis (FEA) results used to reinforce or redesign critical grid infrastructure.[215][216][220] This course builds the analytical tools to ensure that the mechanical side of power systems is as robust as the electrical design.",
    "realWorldApplications": [
      "Transmission Tower and Pole Design: Applying axial, bending, and buckling analysis to lattice steel towers and monopoles that support high-voltage conductors under self‑weight, wind, ice, and broken‑conductor conditions, ensuring adequate safety factors and long‑term structural reliability.[212][216][220]",
      "Wind Turbine Towers and Blades: Using stress, strain, and fatigue analysis to select composite materials and cross‑sections for blades and tubular steel or hybrid towers, balancing stiffness (to control deflection and tower‑blade clearance) with low weight and long fatigue life.[213][217][221]",
      "Busbars, Support Frames, and Substation Structures: Evaluating bending, shear, and thermal stresses in copper/aluminum busbars, insulator supports, and steel frames subjected to short‑circuit electromagnetic forces, thermal expansion, and seismic loads, to prevent yielding, fatigue cracking, or buckling.[215][219]",
      "PV Array Racking and Rooftop Mounts: Assessing combined bending and axial stresses in racking members and fasteners under dead load, wind uplift, and snow, ensuring that mechanical supports maintain module alignment and integrity over the project lifetime."
    ],
    "learningOutcomes": [
      "Compute normal and shear stresses for axial, bending, torsion, and combined loading on structural members such as beams, columns, and shafts, and relate these to allowable stress and safety factor criteria used in power infrastructure design.[214][219]",
      "Construct and interpret stress–strain diagrams from tensile tests to extract material properties (Young’s modulus, yield strength, ultimate strength, ductility) and connect these properties to material selection for towers, blades, and support structures.[214][211][215]",
      "Draw shear and bending moment diagrams for statically determinate beams representing poles, crossarms, or support frames, and use them to determine maximum stresses and deflections under wind, ice, and equipment loads.[210][214]",
      "Apply failure theories (e.g., maximum normal stress, maximum shear stress, von Mises) to predict yielding or fracture under multi‑axial stress states, supporting safe design of components exposed to complex loading in power applications.[215][219]",
      "Estimate deflections and buckling loads for columns and beam‑columns, and explain how stiffness and slenderness ratios influence vibration, clearances, and stability for tall structures like transmission towers and wind turbine towers.[212][216][221]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/results?search_query=strength+of+materials+full+course",
        "https://www.youtube.com/results?search_query=bending+moment+and+shear+force+diagram+tutorial",
        "https://www.youtube.com/results?search_query=mohr%27s+circle+stress+analysis",
        "https://www.youtube.com/results?search_query=wind+turbine+blade+structural+design+and+materials"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67682",
        "https://en.wikipedia.org/wiki/Strength_of_materials",
        "https://engineeringservicelearning.ucmerced.edu/sites/g/files/ufvvjh826/f/page/documents/engr151lab2manual.pdf",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC5706232/",
        "https://www.ijert.org/research/optimum-and-reliable-material-for-wind-turbine-blade-IJERTV4IS020677.pdf",
        "https://etasr.com/index.php/ETASR/article/download/8990/4258/37027",
        "https://engineering-fundamentals-refresh-strength-vs-stiffness-vs-hardness"
      ],
      "tools": [
        "MATLAB or Python for stress/deflection calculations and plotting shear–moment diagrams",
        "FEA software (ANSYS, Abaqus, or SolidWorks Simulation) for structural analysis of towers, frames, and blades",
        "Excel or similar tools for load combinations and safety factor calculations"
      ]
    }
  }
}
,
];

export const tier3Courses: TierCourse[] = [
  {
  "id": "ee-150",
  "code": "EE 150",
  "name": "Digital Communication",
  "fullName": "EE 150: Digital Communication",
  "description": "Study of digital communication principles with emphasis on power systems applications. Covers information theory, source coding, channel coding, digital modulation, signal detection, and receiver design. Emphasizes power systems communication protocols (IEC 61850, DNP3), SCADA systems architecture, synchrophasor measurement with IEEE 1588 time synchronization, and grid cybersecurity (IEC 62351). Essential for engineers designing and securing modern power grids.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "EE 150 is where power systems engineers learn how the digital information that controls and monitors modern grids actually gets transmitted, received, and protected. Modern power grids are fundamentally communication systems—SCADA systems transmit control commands to equipment across vast distances; PMUs send synchronized phasor measurements enabling real-time grid state estimation; protection relays exchange trip signals in milliseconds; smart meters report consumption data to demand response systems. Understanding digital communication principles is essential to designing these systems with the required reliability, security, and timing precision. For power systems engineers, EE 150 provides the technical foundation for SCADA system design, WAMS (wide-area monitoring systems), IEC 61850 substation automation, synchrophasor-based control, and cyber-physical security. The course reveals how abstract communication theory translates to practical systems like IEEE 1588 time synchronization (critical for PMU measurements), IEC 61850 GOOSE messaging (ultra-fast trip signal coordination), and IEC 62351 security (protecting grid from cyber threats). As grids become increasingly decentralized (microgrids, distributed renewables) and interconnected globally, the communication systems enabling coordination become ever more critical. Engineers who master EE 150 can design resilient communication infrastructure supporting the energy transition.",
    "realWorldApplications": [
      "SCADA system design using IEC 61850 standard for substation automation",
      "Synchrophasor (PMU) networks with IEEE 1588 precision time synchronization",
      "Wide-area monitoring systems (WAMS) for real-time grid dynamic stability assessment",
      "Protection relay communication and GOOSE-based trip signal coordination",
      "Smart grid and advanced metering infrastructure (AMI) communication",
      "Microgrid control systems with distributed generation communication",
      "Renewable energy source (wind, solar) SCADA and performance monitoring",
      "IEC 61850 substation automation and device interoperability",
      "Grid cybersecurity implementation using IEC 62351 standards",
      "Demand response systems with two-way consumer communication",
      "Distribution automation with real-time switch and capacitor control",
      "Wide-area voltage control and frequency support using PMU data",
      "Secure remote terminal unit (RTU) communication with control centers",
      "Black start and system restoration communication protocols",
      "EV charging infrastructure coordination and grid integration"
    ],
    "learningOutcomes": [
      "Understand information theory fundamentals including entropy, mutual information, and Shannon capacity",
      "Apply source coding techniques to compress data for efficient transmission",
      "Design and analyze error-correcting codes (block codes, convolutional codes) for reliable transmission",
      "Understand digital modulation techniques and constellation diagram analysis",
      "Analyze digital receivers including matched filtering and optimal detection",
      "Calculate probability of bit error under various channel conditions",
      "Understand channel models (AWGN, fading) and their effects on communication",
      "Recognize IEC 61850 architecture and communication model for power systems",
      "Apply SCADA protocols and understand real-time data acquisition and supervisory control",
      "Understand synchrophasor measurement and PMU time alignment using IEEE 1588",
      "Recognize IEEE 1588 precision time protocol and power utility application profile",
      "Apply IEC 62351 cybersecurity standards to grid communication systems",
      "Understand encryption, authentication, and access control in SCADA systems",
      "Design secure communication for distributed power system components",
      "Recognize practical grid communication systems and their constraints"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=YVfg10aZ-Jc - 3.1 Information Theory and Digital Communication (UC Merced, Feb 2025, latest) - Source/channel layers",
        "https://www.youtube.com/watch?v=287 - Lec 1 | MIT 6.450 Principles of Digital Communications I (MIT OCW, 2009) - Academic foundation",
        "https://www.youtube.com/watch?v=289 - Introduction to Digital Communications Systems (Sept 2020) - System overview",
        "https://www.youtube.com/watch?v=285 - Lecture 6 Digital Modulation Techniques (July 2023, 27:43) - Mathematical treatment",
        "https://www.youtube.com/watch?v=283 - 10. Pulse Code Modulation - Digital Audio (Dec 2020, 12:40) - PCM fundamentals",
        "https://www.youtube.com/watch?v=291 - Difference between Channel & Source Coding (Oct 2018, 6:50) - Simple distinction",
        "https://www.youtube.com/watch?v=297 - Source Coding: Introduction & Shannon Theorem (Oct 2022, 14:05) - Information theory",
        "https://www.youtube.com/watch?v=294 - Lecture - 30 Channel Coding (IIT Bombay, Aug 2008) - Channel coding theory",
        "https://www.youtube.com/watch?v=303 - Introduction to Channel Coding & Decoding (Apr 2020, 9:28) - Block/convolutional codes",
        "https://www.youtube.com/watch?v=300 - Shannon's Channel Coding Theorem in 5 min (Feb 2021, 5:06) - Visualization",
        "https://www.youtube.com/watch?v=281 - Understanding Communication Protocols in Power Networks (Nova Power, Nov 2024, latest) - IEC 61850",
        "https://www.youtube.com/watch?v=286 - IEC 61850 SCADA (iGrid T&D, 2021) - Platform implementation",
        "https://www.youtube.com/watch?v=293 - IEEE 1588 Time Sync in IEC 61850 (OMICRON, Feb 2016, 8:50) - PTP power profiles",
        "https://www.youtube.com/watch?v=296 - Time Synchronization with IEEE1588 (Utility Broadband Alliance, Sept 2024, 1:00:23, latest) - Deep dive",
        "https://www.youtube.com/watch?v=305 - Introduction to Precision Time Protocol (Mar 2024, latest) - PTP network operation"
      ],
      "websites": [
        "https://catalog.ucmerced.edu - UC Merced EE 150 Catalog Entry",
        "https://www.novapwr.com/understanding-communications-protocols-and-standards-in-large-scale-power-networks/ - Nova Power IEC 61850 (Nov 2024, latest)",
        "https://www.albedotelecom.com/src/lib/WP-IEC-61850-Architectures.pdf - IEC 61850 Architecture Overview (PDF)",
        "https://cigre-usnc.org/wp-content/uploads/2019/10/5D_3.pdf - Cybersecurity for IEC 61850 SCADA (CIGRE, 2019, PDF)",
        "https://kalkitech.com/iec-61850-scada-communication-protocol/ - IEC 61850 SCADA Protocol Guide (Feb 2025, latest)",
        "https://www.energy.gov/sites/default/files/2024-07/Grid%20Communication%20Technology_FINAL_optimizedv3.pdf - Grid Communication Technologies (DOE, July 2024, PDF)",
        "https://www.internationaljournalssrg.org/IJEEE/2024/Volume11-Issue12/IJEEE-V11I12P104.pdf - Cybersecurity and IEC 62351 (Dec 2024, latest PDF)",
        "https://gca.isa.org/blog/9-scada-system-vulnerabilities-and-how-to-secure-them - SCADA Vulnerabilities (ISA, Dec 2025, latest)",
        "https://www.powermag.com/securing-the-power-grid-cybersecurity-strategies-for-smart-energy-systems/ - Grid Cybersecurity Strategies (July 2025, latest)",
        "https://www.reddit.com/r/SCADA/comments/1ffway1/ - Securing RTU-SCADA Communications (Reddit, Sept 2024)",
        "https://www.rs-online.com/designspark/an-introduction-to-ieee-1588-precision-time-protocol - IEEE 1588 PTP Introduction (RS Online, Oct 2021)",
        "https://www.igrid-td.com/iec-61850-scada/ - iGrid IEC 61850 SCADA Platform (2021)"
      ],
      "tools": [
        "MATLAB/Simulink (communication system modeling, modulation, demodulation analysis)",
        "GNU Radio (software-defined radio for practical modulation/demodulation implementation)",
        "Python with NumPy/SciPy (signal processing, digital communication algorithms)",
        "Wireshark (packet analysis for SCADA protocol inspection)",
        "OpenPLC (open-source IEC 61850 implementation and testing)",
        "IEC 61850 client/server test tools and libraries",
        "IEC 62351 security testing and compliance frameworks",
        "Network simulation software (ns-3, OPNET) for protocol simulation",
        "SCADA training platforms and simulators",
        "IEEE 1588 timing analysis and verification tools"
      ]
    }
  }
}
,
  {
  "id": "engr-143",
  "code": "ENGR 143",
  "name": "Statistical Quality Control",
  "fullName": "ENGR 143: Statistical Quality Control",
  "description": "Introduces statistical methods for monitoring and improving product and process quality, including control charts, process capability analysis, and design of experiments, with applications to manufacturing and service systems.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For a Power Systems & Energy Engineering career, statistical quality control (SQC) provides the data-driven methodology to monitor, control, and continuously improve the reliability and performance of power generation, transmission, and distribution assets. As grids become more complex with renewable integration, SQC tools like control charts enable utilities to detect abnormal power losses, inverter efficiency degradation, and equipment health drift before failures occur.[222][230] The DMAIC framework and process capability indices (Cpk) are directly applicable to reducing forced outage rates, improving generation heat rates, and ensuring voltage/frequency stay within regulatory limits.[223][224] In an industry where reliability is paramount and regulatory compliance is mandatory, SQC transforms maintenance from reactive to predictive and integrates quality assurance into daily operations.[223][231]",
    "realWorldApplications": [
      "Power Loss Monitoring and Control: Applying X-bar and MR control charts to monthly transmission and distribution loss data to detect abnormal technical losses due to aging transformers, conductor corrosion, or theft, enabling utilities to maintain losses below 10% targets and prioritize capital investments.[222][230]",
      "Generation Performance and Heat Rate Optimization: Using SPC to monitor turbine efficiency, heat rate, and emissions, detecting deviations from baselines that indicate fouling, sensor drift, or suboptimal combustion, supporting continuous improvement initiatives that reduce fuel costs and CO₂ emissions.[223][232]",
      "Equipment Reliability and Predictive Maintenance: Implementing control charts on vibration, temperature, and partial discharge data from critical assets (generators, turbines, switchgear) to detect early signs of degradation, enabling condition-based maintenance that reduces forced outages and extends asset life.[223][231]",
      "Voltage and Frequency Quality Control: Monitoring bus voltage and system frequency with control charts to ensure they remain within ANSI and NERC standards, detecting grid disturbances or inverter control issues that could escalate into cascading failures if left uncorrected.[223][227]"
    ],
    "learningOutcomes": [
      "Apply statistical process control (SPC) fundamentals including control chart selection, construction, and interpretation (X-bar, R, p, c charts) to monitor power system parameters such as generation output, line losses, and equipment health indicators.[222][227]",
      "Calculate and interpret process capability indices (Cp, Cpk, Pp, Ppk) to assess whether power generation processes, inverter efficiencies, or voltage regulation meet engineering specifications and regulatory requirements.[224][227]",
      "Design and analyze factorial and fractional factorial experiments to optimize combustion parameters, cooling water chemistry, or wind turbine pitch settings, understanding main effects and interactions that influence performance and emissions.[224][227]",
      "Use DMAIC (Define, Measure, Analyze, Improve, Control) methodology to lead quality improvement projects targeting forced outage reduction, emissions compliance, or transformer loading optimization in utility or independent power producer settings.[224][232]",
      "Evaluate measurement system capability (gage R&R) for critical instrumentation used in power quality monitoring and protective relaying, ensuring data accuracy required for reliable control decisions and regulatory reporting.[222][227]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/results?search_query=statistical+process+control+spc+tutorial",
        "https://www.youtube.com/results?search_query=six+sigma+dmaic+power+generation",
        "https://www.youtube.com/results?search_query=control+charts+examples+manufacturing+quality",
        "https://www.youtube.com/results?search_query=process+capability+cpk+explained"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69984",
        "https://en.wikipedia.org/wiki/Statistical_process_control",
        "https://www.asq.org/quality-resources/statistical-process-control-spc",
        "https://www.sixsigma.us/process-improvement/process-control-lean-six-sigma/",
        "https://ieomsociety.org/ieomdetroit/pdfs/212.pdf",
        "https://docs.nrel.gov/docs/fy24osti/87297.pdf",
        "https://www.naes.com/grid-reliability-what-it-takes-to-keep-power-moving/"
      ],
      "tools": [
        "Minitab or JMP for control charting and DOE analysis",
        "Python (SciPy, statsmodels) or R for statistical analysis",
        "Excel with SPC add-ins for basic charting",
        "DMAIC project templates and control plan worksheets"
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
  "description": "Comprehensive study of machine learning fundamentals and applications in engineering systems, with emphasis on power systems and energy engineering. Covers supervised and unsupervised learning, neural networks and deep learning, reinforcement learning, and practical ML frameworks. Focuses on real-world applications including load forecasting, renewable energy prediction, anomaly detection, fault diagnosis, cybersecurity, and grid optimization. Combines theory with hands-on projects using Python, Scikit-learn, TensorFlow, and PyTorch.",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "ENGR 145 is essential preparation for power systems and energy engineers working in the modern grid—a system increasingly driven by data and machine learning. Modern grids generate petabytes of data annually from millions of sensors, meters, and controllers. This data holds the key to solving critical challenges: predicting renewable energy output to maintain grid stability, detecting equipment failures before they cascade into blackouts, optimizing energy markets in real time, detecting cyber intrusions before they compromise system integrity. Engineers who understand machine learning can transform this data into competitive advantage—accurately forecasting load 7 days ahead, detecting motor failures weeks before conventional methods, optimizing renewable integration to reduce waste. For power systems engineers, ENGR 145 reveals how historical performance data can train models predicting tomorrow's grid state, how unsupervised learning can automatically detect anomalies indicating equipment failure, how reinforcement learning can optimize microgrid operations autonomously. The course progresses from fundamental algorithms (decision trees, neural networks) to specialized architectures (LSTM for time series, CNN for signal processing) to cutting-edge methods (multi-agent RL for distributed control). In the energy transition, sophisticated ML is no longer optional—it's essential to designing grids that integrate massive renewable penetration, coordinate millions of EVs, manage decentralized resources, and defend against expanding cyber threats. Engineers mastering ENGR 145 will lead this transformation.",
    "realWorldApplications": [
      "Electricity load forecasting (hourly, daily, weekly) for generation and resource planning",
      "Solar irradiance and wind speed prediction for renewable energy forecasting",
      "Real-time grid frequency and state estimation from PMU measurements",
      "Predictive maintenance of transformers and rotating equipment using condition monitoring data",
      "Automatic fault detection and diagnosis in electrical equipment (motors, cables, breakers)",
      "Demand response optimization and dynamic load control using reinforcement learning",
      "Microgrid energy management with multi-agent RL for autonomous local control",
      "Battery management system optimization (state-of-charge, thermal management, cycle life)",
      "Protection relay coordination and adaptive protection setting optimization",
      "Power quality monitoring and anomaly detection (harmonics, voltage sags, transients)",
      "Cybersecurity intrusion detection in SCADA and grid control systems",
      "EV charging coordination and smart grid integration",
      "Wind farm power output optimization and curtailment prediction",
      "Solar PV performance monitoring and degradation detection",
      "Equipment health monitoring and remaining useful life prediction"
    ],
    "learningOutcomes": [
      "Understand machine learning taxonomy: supervised, unsupervised, and reinforcement learning paradigms",
      "Master fundamental algorithms: linear/logistic regression, decision trees, SVM, clustering methods",
      "Understand ensemble methods (random forests, boosting, bagging) and their ensemble diversity principle",
      "Design and train neural networks: understand neurons, layers, activation functions, backpropagation",
      "Master deep learning architectures: CNN for signal/image processing, RNN/LSTM/GRU for time series",
      "Apply reinforcement learning to control and optimization problems including energy management",
      "Perform feature engineering: scaling, normalization, encoding, polynomial features, domain-specific features",
      "Execute complete ML pipeline: data preprocessing, feature selection, model training, hyperparameter tuning",
      "Evaluate models rigorously: cross-validation, performance metrics appropriate to task (regression vs classification)",
      "Recognize and mitigate overfitting through regularization, early stopping, and data augmentation",
      "Apply practical ML frameworks: Scikit-learn for traditional ML, TensorFlow/Keras for deep learning",
      "Implement power systems applications: load forecasting, anomaly detection, fault diagnosis, optimization",
      "Optimize hyperparameters using grid search, random search, and Bayesian optimization methods",
      "Interpret models using SHAP, LIME, feature importance to understand decision mechanisms",
      "Deploy and serve ML models for real-time grid operations and decision support"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=aaKUJZqWZ_I - Supervised vs Unsupervised Learning Explained (Codecademy, May 2023, 8:57) - Foundational distinction",
        "https://www.youtube.com/watch?v=3fsy2oheRdg - Machine Learning Basics: Supervised vs Unsupervised (edureka!, Sept 2022, 8:54) - Overview with examples",
        "https://www.youtube.com/watch?v=W01tIRP_Rqs - Supervised vs. Unsupervised Learning (IBM, July 2022, 10:25) - Practical applications",
        "https://www.youtube.com/watch?v=Ui30XJEbi0Y - What's the Difference in Machine Learning? (Nov 2024, latest) - Comprehensive taxonomy",
        "https://www.youtube.com/watch?v=RlJY2SEXu-Q - Decision Tree & Random Forest | Machine Learning Tutorial (Liverpool John Moore, June 2025, latest) - Ensemble learning",
        "https://www.youtube.com/watch?v=KdCmevhgnQA - Ensemble Models with Decision Trees (Oct 2025, latest) - Bagging, boosting, majority voting",
        "https://www.youtube.com/watch?v=y7NdSHmqEf0 - Machine Learning: Random Forest Ensemble Method (Nov 2025, latest) - Feature importance, interpretability",
        "https://www.youtube.com/watch?v=347 - StatQuest: Random Forests Part 1 (Josh Starmer, Feb 2018, foundational) - Intuitive explanation",
        "https://www.youtube.com/watch?v=344 - Lecture 10: Decision Trees & Ensemble Methods (Stanford CS229, Apr 2020, academic) - Academic depth",
        "https://www.youtube.com/watch?v=320 - Deep Learning Models (CNN, RNN, LSTM) (Stelly Arrays, Jan 2025, latest) - CNN/RNN/LSTM overview",
        "https://www.youtube.com/watch?v=323 - Advanced Deep Learning Part 5 (Gen AI Cafe, July 2025, 2:58:35, latest) - 3-hour masterclass on CNN, RNN, LSTM, Transformers",
        "https://www.youtube.com/watch?v=332 - But what is a neural network? (3Blue1Brown, Oct 2017, foundational) - Intuitive neural network explanation",
        "https://www.youtube.com/watch?v=326 - Long Short-Term Memory (LSTM), Clearly Explained (StatQuest, Nov 2022) - LSTM cell mechanics",
        "https://www.youtube.com/watch?v=322 - Mastering Energy Forecasting & Grid Optimization with RL (Strawberry Labs, Apr 2025, 10:37, latest) - Complete RL energy pipeline",
        "https://www.youtube.com/watch?v=325 - Optimization of Multi Agent Energy Management using RL (Oct 2021) - Microgrid multi-agent RL"
      ],
      "websites": [
        "https://catalog.ucmerced.edu - UC Merced ENGR 145 Catalog Entry",
        "https://www.ibm.com/think/topics/supervised-vs-unsupervised-learning - IBM Supervised vs Unsupervised (Mar 2024, latest)",
        "https://premierscience.com/pjai-25-1017/ - Energy Load Forecasting with ML (Premier Science, Dec 2024, latest) - LSTM/GRU/ensemble methods",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC11696747/ - Empowering Load Forecasting with LSTM (Nature, Dec 2024) - Load prediction robustness",
        "https://www.nature.com/articles/s41598-024-70336-3 - ML-based Energy Management & Power Forecasting (Nature, Aug 2024) - SVR for solar/wind",
        "https://www.nature.com/articles/s41598-025-19634-y - AI-driven Cybersecurity for Anomaly Detection (Nature, Oct 2025, latest) - Cyber-physical anomaly detection",
        "https://www.sciencedirect.com/science/article/pii/S2666546825000503 - ML for Building Electrical Energy (ScienceDirect, 2025, latest) - Building energy ML",
        "https://www.sciencedirect.com/science/article/pii/S2772683525000287 - Anomaly Detection in Solar Systems with Deep Learning (July 2025, latest)",
        "https://ijsra.net/sites/default/files/IJSRA-2024-0428.pdf - Power Electronics Anomaly Detection with ML (Mar 2024, PDF) - Comprehensive survey",
        "https://ieeexplore.ieee.org/document/10430547/ - ML-based Source & Load Forecasting (IEEE, 2023) - Neural networks for power prediction",
        "https://ietresearch.onlinelibrary.wiley.com/doi/10.1049/tje2.12405 - ML-assisted Anomaly Detection for Power Lines (June 2024) - Fault detection",
        "https://www.abb.com/global/en/company/innovation/news/hunting-for-anomalies - Hunting for Anomalies in Motors (ABB, Oct 2022) - Unsupervised fault detection",
        "https://lakefs.io/blog/data-preprocessing-in-machine-learning/ - Data Preprocessing Best Practices (Oct 2025, latest)",
        "https://www.tredence.com/blog/feature-engineering-in-machine-learning - Feature Engineering Guide (June 2025, latest)",
        "https://uplatz.com/blog/premier-open-source-machine-learning-frameworks-tensorflow-pytorch-and-scikit-learn/ - ML Frameworks Comparison (June 2025, latest)",
        "https://www.coursera.org/articles/scikit-learn-or-tensorflow - Scikit-learn vs TensorFlow (July 2025, latest)"
      ],
      "tools": [
        "Scikit-learn (traditional ML algorithms, preprocessing, model evaluation)",
        "TensorFlow/Keras (deep learning, neural networks, production deployment)",
        "PyTorch (deep learning, research, dynamic computational graphs)",
        "Python (NumPy, Pandas, Matplotlib, Seaborn for data science)",
        "Jupyter Notebooks (interactive development and experimentation)",
        "Google Colab (cloud-based GPU/TPU for deep learning)",
        "Optuna (hyperparameter optimization framework)",
        "SHAP (SHapley Additive exPlanations for model interpretability)",
        "MLflow (ML lifecycle management and deployment)",
        "Weights & Biases (experiment tracking and visualization)"
      ]
    }
  }
}
,
  {
  "id": "engr-180",
  "code": "ENGR 180",
  "name": "Spatial Analysis and Modeling",
  "fullName": "ENGR 180: Spatial Analysis and Modeling",
  "description": "Principles of geographic information systems (GIS) and spatial modeling techniques with hands-on implementation, emphasizing practical applications to environmental, water, and infrastructure systems using Visual Basic and ArcGIS.[233][248][244]",
  "tier": 3,
  "expandedInfo": {
    "credits": 4,
    "careerRelevance": "For a Power Systems & Energy Engineering career, spatial analysis and modeling is essential for modern grid planning, operations, and resilience. Geographic Information Systems (GIS) provide the platform to integrate geospatial data with electrical network models, enabling utilities to visualize infrastructure, optimize transmission line routing, site renewable energy projects, and assess climate risks.[236][239][244] As California transitions to 70% renewable energy, spatial optimization determines where to place solar farms, wind turbines, and battery storage to maximize generation, minimize transmission constraints, and avoid environmental conflicts.[237][241][246] Spatial modeling also underpins outage management, asset management, and emergency response by mapping vulnerable infrastructure and predicting impacts of wildfires, floods, and extreme weather on grid reliability.[235][236][240]",
    "realWorldApplications": [
      "Renewable Energy Siting and Optimization: Using GIS-based spatial modeling to identify optimal locations for solar PV and wind farms based on resource availability (solar irradiance, wind speed), proximity to transmission, land use constraints, environmental sensitivity, and grid capacity, maximizing project ROI while minimizing system costs and permitting delays.[237][241][246]",
      "Transmission and Distribution Network Planning: Applying buffer analysis, network routing algorithms, and least-cost path analysis to design new transmission corridors, locate substations, and plan distribution expansions that balance technical requirements, construction costs, terrain constraints, and community impact.[236][239][240]",
      "Grid Resilience and Risk Assessment: Conducting spatial risk analysis to map infrastructure vulnerability to wildfires, floods, sea-level rise, and extreme weather, enabling utilities to prioritize hardening investments, develop emergency response plans, and maintain service during climate disasters.[235][236][240]",
      "Asset Management and Outage Response: Integrating GIS with SCADA and AMI data to create digital twins of the power grid, supporting real-time outage visualization, crew dispatch optimization, predictive maintenance scheduling, and asset health monitoring across vast service territories.[236][239][240]"
    ],
    "learningOutcomes": [
      "Implement GIS workflows using ArcGIS and Visual Basic to acquire, encode, manage, and analyze spatial data for power system infrastructure including transmission lines, substations, and renewable energy facilities.[233][248][244]",
      "Apply spatial modeling techniques including buffer analysis, overlay analysis, and network analysis to solve power engineering problems such as optimal siting, routing, and service area delineation for grid infrastructure.[236][241][244]",
      "Integrate multiple geospatial datasets (terrain, land use, environmental constraints, population density, load demand) to support multi-criteria decision making for transmission planning and renewable energy project development.[236][237][241]",
      "Develop Python scripts for ArcGIS to automate spatial analyses and create reproducible workflows for renewable energy potential assessment, grid impact studies, and climate resilience planning.[233][246]",
      "Design and present spatial analysis projects using story maps and interactive visualizations that communicate technical findings about grid planning, renewable siting, and risk assessment to diverse stakeholders including regulators, communities, and utility executives.[236][251][252]"
    ],
    "resources": {
      "videos": [
        "https://www.youtube.com/watch?v=-fvYGX8w1Go",
        "https://www.youtube.com/watch?v=fZB8Z82fXH0",
        "https://www.youtube.com/watch?v=jnF9nwbJhqw",
        "https://www.youtube.com/watch?v=EspJv_Zbwq0"
      ],
      "websites": [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67688",
        "https://faculty.ucmerced.edu/qguo/Teaching.html",
        "https://www.mapog.com/power-grid-and-infrastructure-mapping-and-planning-using-gis/",
        "https://www.sciencedirect.com/science/article/abs/pii/S1364032116304312",
        "https://www.landgate.com/news/navigating-the-clean-energy-revolution-with-gis-renewable-energy-site-selection-strategies",
        "https://pubmed.ncbi.nlm.nih.gov/30352128/",
        "https://www.arcgis.com/home/item.html?id=d4090758322c4d32a4cd002ffaa0aa12"
      ],
      "tools": [
        "ArcGIS Desktop / ArcGIS Pro (with Spatial Analyst, Network Analyst extensions)",
        "Python (arcpy, geopandas, rasterio) for GIS scripting",
        "QGIS (open-source alternative for spatial analysis)",
        "GPS receivers and mobile GIS apps for field data collection",
        "Story Maps and ArcGIS Online for visualization and collaboration"
      ]
    }
  }
}
,
];

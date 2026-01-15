/**
 * Power Systems Career Path - Tier Courses Data
 * Course recommendations organized by tier for Power Systems & Energy career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE for Power Systems & Energy
 * These courses form the essential foundation for power generation, distribution, and renewable energy careers.
 * Critical for roles like Power Systems Engineer, Grid Engineer, Renewable Energy Specialist, and Energy Analyst.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "power-ee-120",
    code: "EE 120",
    name: "Electric Circuits II",
    fullName: "EE 120: Electric Circuits II",
    description: "Advanced circuit analysis including AC circuits, phasors, power analysis, and three-phase systems essential for power systems work",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Electric Circuits II is foundational for all power systems careers. Understanding AC power, phasors, and three-phase systems is crucial for power distribution, grid analysis, and electrical infrastructure design. This course provides the mathematical and conceptual tools needed to analyze complex power networks.",

      realWorldApplications: [
        "Analyzing and designing power distribution networks with AC circuits",
        "Calculating real, reactive, and apparent power in industrial and commercial systems",
        "Understanding three-phase power systems used in grid distribution and large machinery",
        "Performing power factor correction to improve energy efficiency",
        "Using phasor analysis to solve complex AC network problems in power systems",
        "Evaluating power quality and harmonic distortion in electrical grids"
      ],

      learningOutcomes: [
        "Master AC circuit analysis using phasor representation and complex impedance",
        "Understand and calculate real, reactive, and apparent power in AC systems",
        "Analyze three-phase balanced and unbalanced power systems",
        "Apply power factor correction techniques to optimize system efficiency",
        "Use mesh and nodal analysis for complex AC circuits in power networks"
      ],

      topics: [
        "AC steady-state analysis and phasor representation",
        "Complex power, power factor, and power triangle concepts",
        "Three-phase power systems: wye and delta configurations",
        "Frequency response and resonance in power systems",
        "Power factor correction and reactive power compensation",
        "Magnetically coupled circuits and transformers fundamentals"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=mcm8Elm1Z08", // AC circuit analysis
          "https://www.youtube.com/watch?v=4dQRhB4sgXo", // Three-phase power systems
          "https://www.youtube.com/watch?v=SIZEigtIYPo", // Power factor and reactive power
          "https://www.youtube.com/watch?v=QuABw9xYIJg"  // Phasor analysis
        ],
        websites: [
          "https://www.allaboutcircuits.com/textbook/alternating-current/",
          "https://www.electrical4u.com/electric-power/",
          "https://www.electronics-tutorials.ws/accircuits/",
          "https://www.khanacademy.org/science/electrical-engineering"
        ],
        tools: [
          "LTspice", // Circuit simulation
          "MATLAB/Simulink", // Power system analysis
          "PSCAD", // Power system modeling
          "Multisim" // Circuit analysis and simulation
        ]
      },

      additionalNotes:
        "Electric Circuits II is the gateway course for power systems specialization. Mastery of AC analysis, complex power, and three-phase systems is non-negotiable for anyone pursuing a career in electrical power and energy systems."
    }
  },
  {
    id: "power-ee-130",
    code: "EE 130",
    name: "Electromagnetics I",
    fullName: "EE 130: Electromagnetics I",
    description: "Electromagnetic field theory, Maxwell's equations, and wave propagation fundamental to power systems and energy transmission",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Electromagnetics is crucial for understanding power transmission, electromagnetic interference, electric machine design, and wireless power transfer. Essential for Power Systems Engineers working with high-voltage transmission lines, transformers, and electromagnetic compatibility.",

      realWorldApplications: [
        "Analyzing electromagnetic fields in power transmission lines and cables",
        "Designing transformers and electric machines using magnetic field principles",
        "Evaluating electromagnetic interference (EMI) in power systems and mitigation techniques",
        "Understanding wave propagation in transmission lines for power distribution",
        "Applying Maxwell's equations to model power system components",
        "Analyzing eddy currents and magnetic losses in electrical machinery"
      ],

      learningOutcomes: [
        "Apply Maxwell's equations to analyze electromagnetic fields in power systems",
        "Understand static and time-varying electric and magnetic fields",
        "Analyze wave propagation and transmission line theory",
        "Calculate electromagnetic forces and energy in electrical machines",
        "Evaluate boundary conditions and material properties in electromagnetic systems"
      ],

      topics: [
        "Maxwell's equations and electromagnetic field theory",
        "Static electric and magnetic fields",
        "Electromagnetic waves and propagation",
        "Transmission line theory and power transmission",
        "Magnetic materials and transformers",
        "Energy and forces in electromagnetic systems"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ZrMltpK6iAw", // Maxwell's equations
          "https://www.youtube.com/watch?v=8YkfEft4p-w", // Electromagnetics basics
          "https://www.youtube.com/watch?v=FWCN_uI5ygY", // Transmission lines
          "https://www.youtube.com/watch?v=nqJOvMqxRvU"  // Magnetic fields in power systems
        ],
        websites: [
          "https://www.electrical4u.com/electromagnetic-field-theory/",
          "https://hyperphysics.phy-astr.gsu.edu/hbase/electric/maxeq.html",
          "https://www.electronics-tutorials.ws/electromagnetism/",
          "https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-spring-2009/"
        ],
        tools: [
          "COMSOL Multiphysics", // Electromagnetic simulation
          "ANSYS Maxwell", // Electromagnetic field simulation for machines
          "CST Studio Suite", // EM simulation
          "FEMM" // Finite element method magnetics (free)
        ]
      },

      additionalNotes:
        "Electromagnetics provides the theoretical foundation for understanding power transmission, transformer design, and electric machine operation. Essential for advanced work in power systems engineering."
    }
  },
  {
    id: "power-ee-140",
    code: "EE 140",
    name: "Computer and Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description: "Semiconductor devices, diodes, transistors, and amplifier circuits used in power electronics and control systems",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Electronics fundamentals are essential for power electronics applications including converters, inverters, motor drives, and renewable energy systems. Understanding semiconductor devices is critical for modern power systems that rely heavily on power electronic converters.",

      realWorldApplications: [
        "Designing power electronic converters for renewable energy integration",
        "Understanding diode and transistor operation in rectifiers and inverters",
        "Analyzing switching circuits used in DC-DC converters and motor drives",
        "Implementing control circuits for power management systems",
        "Selecting and applying semiconductor devices in power conditioning equipment",
        "Designing protection circuits for power electronic systems"
      ],

      learningOutcomes: [
        "Understand semiconductor physics and device operation",
        "Analyze diode circuits and rectifier applications",
        "Design and analyze transistor amplifier and switching circuits",
        "Apply electronic devices to power conversion applications",
        "Evaluate device characteristics for power electronic design"
      ],

      topics: [
        "Semiconductor fundamentals and diode characteristics",
        "Rectifier circuits and power supplies",
        "Bipolar junction transistors (BJTs) and field-effect transistors (FETs)",
        "Transistor biasing and amplifier configurations",
        "Switching circuits and applications",
        "Introduction to power semiconductor devices (MOSFETs, IGBTs)"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7ukDKVHnac4", // Semiconductor devices
          "https://www.youtube.com/watch?v=8DMZSxS-xVc", // Transistor fundamentals
          "https://www.youtube.com/watch?v=rK6f9W7kjkA", // Power electronics basics
          "https://www.youtube.com/watch?v=GYylPLYABbg"  // MOSFETs and switching
        ],
        websites: [
          "https://www.electronics-tutorials.ws/power/power-electronics.html",
          "https://www.electrical4u.com/power-electronics/",
          "https://www.allaboutcircuits.com/textbook/semiconductors/",
          "https://learn.sparkfun.com/tutorials/transistors"
        ],
        tools: [
          "LTspice", // Power electronics simulation
          "PLECS", // Power electronics simulation specialized tool
          "PSIM", // Power simulation software
          "Multisim" // Electronics circuit simulation
        ]
      },

      additionalNotes:
        "Electronics I introduces the semiconductor devices that are fundamental to modern power systems. Power electronics is increasingly important with renewable energy integration and electric vehicle technology."
    }
  },
  {
    id: "power-ee-150",
    code: "EE 150",
    name: "Digital Communication",
    fullName: "EE 150: Digital Communication",
    description: "Electromechanical energy conversion, transformers, DC machines, AC machines, and electric drives",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Energy Conversion is THE core course for power systems specialization. It covers transformers, motors, generators, and electric drives — the primary components in power generation, transmission, and industrial applications. Essential for any power systems engineering role.",

      realWorldApplications: [
        "Designing and analyzing transformers for power distribution networks",
        "Understanding motor and generator operation in power plants and industrial facilities",
        "Selecting appropriate electric machines for industrial and renewable energy applications",
        "Analyzing machine performance, efficiency, and losses in power systems",
        "Implementing motor drives and control strategies for industrial automation",
        "Evaluating electric machine performance in grid-connected and standalone systems"
      ],

      learningOutcomes: [
        "Understand principles of electromechanical energy conversion",
        "Analyze transformer operation, equivalent circuits, and performance",
        "Explain DC machine construction, operation, and control",
        "Analyze induction motors and synchronous machines used in power systems",
        "Evaluate electric machine efficiency, losses, and thermal considerations",
        "Apply energy conversion principles to real-world power system applications"
      ],

      topics: [
        "Magnetic circuits and transformers",
        "DC machines: motors and generators",
        "Induction machines (asynchronous motors)",
        "Synchronous machines (generators and motors)",
        "Machine dynamics and transient behavior",
        "Electric drives and motor control basics"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=FE_D7KXeGqg", // Transformers explained
          "https://www.youtube.com/watch?v=CWulQ1ZSE3c", // DC motors and generators
          "https://www.youtube.com/watch?v=AQqyGNOP_3o", // Induction motors
          "https://www.youtube.com/watch?v=6-CXZhTLSqE"  // Synchronous machines
        ],
        websites: [
          "https://www.electrical4u.com/electrical-machines/",
          "https://www.electronics-tutorials.ws/transformer/transformer-basics.html",
          "https://electricalbaba.com/electric-machines/",
          "https://www.allaboutcircuits.com/textbook/alternating-current/chpt-9/electric-motors/"
        ],
        tools: [
          "MATLAB/Simulink", // Machine modeling and simulation
          "ANSYS Maxwell", // Electric machine design and analysis
          "Motor-CAD", // Electric machine thermal and electromagnetic design
          "FEMM" // Finite element magnetics for machine analysis
        ]
      },

      additionalNotes:
        "Energy Conversion (also called Electric Machines or Electromechanical Energy Conversion) is THE definitive power systems course. It directly covers the machines that generate, transmit, and use electrical power in the real world."
    }
  },
  {
    id: "power-ee-170",
    code: "EE 170",
    name: "Power Systems Analysis",
    fullName: "EE 170: Power Systems Analysis",
    description: "Power system modeling, load flow analysis, fault analysis, and stability — core competencies for grid engineers",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Power Systems Analysis is the capstone course for power engineering specialization. It teaches grid modeling, load flow, fault analysis, and system stability — the exact skills needed for roles in utility companies, grid operators (ISOs), and energy infrastructure firms.",

      realWorldApplications: [
        "Modeling and analyzing electrical grids for utility companies and ISOs",
        "Performing load flow studies to optimize power distribution and minimize losses",
        "Conducting fault analysis to design protective relaying and ensure grid safety",
        "Evaluating power system stability and transient behavior during disturbances",
        "Planning grid expansion and renewable energy integration",
        "Using industry-standard power system analysis software (PSS/E, PowerWorld, ETAP)"
      ],

      learningOutcomes: [
        "Model power systems using per-unit representation and equivalent circuits",
        "Perform load flow analysis to determine voltage profiles and power flows",
        "Conduct symmetrical and unsymmetrical fault analysis",
        "Evaluate power system stability: transient, steady-state, and dynamic",
        "Understand protective relaying and grid control strategies",
        "Apply computational tools for power system simulation and analysis"
      ],

      topics: [
        "Power system components and modeling (generators, lines, transformers, loads)",
        "Per-unit system and network representation",
        "Load flow analysis (Gauss-Seidel, Newton-Raphson methods)",
        "Symmetrical and unsymmetrical fault analysis",
        "Power system stability: transient, dynamic, and voltage stability",
        "Economic dispatch and optimal power flow"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Lgg5LcDVKAk", // Power systems intro
          "https://www.youtube.com/watch?v=EP76f82fKfE", // Load flow analysis
          "https://www.youtube.com/watch?v=s-tHiXrT3pk", // Fault analysis
          "https://www.youtube.com/watch?v=rBVm2_f9H8M"  // Power system stability
        ],
        websites: [
          "https://www.electrical4u.com/power-system-analysis/",
          "https://electricalbaba.com/power-systems/",
          "https://www.powerworld.com/products/simulator/overview", // PowerWorld simulator resources
          "https://ocw.mit.edu/courses/6-061-introduction-to-electric-power-systems-spring-2011/"
        ],
        tools: [
          "PowerWorld Simulator", // Power system analysis and visualization
          "PSS/E (Siemens)", // Industry-standard power system simulation
          "ETAP", // Electrical power system analysis
          "MATLAB/Simulink" // Power system modeling
        ]
      },

      additionalNotes:
        "Power Systems Analysis is the most directly applicable course for power grid careers. It combines circuit theory, energy conversion, and computational methods to solve real-world power engineering problems. Highly valued by employers in utilities and energy sectors."
    }
  },
  {
    id: "power-ee-141",
    code: "EE 141",
    name: "Power Electronics",
    fullName: "EE 141: Power Electronics",
    description: "DC-DC converters, inverters, rectifiers, and power semiconductor devices for renewable energy and motor drives",
    tier: 1,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Power Electronics is critical for modern power systems, especially with renewable energy (solar inverters, wind converters), electric vehicles (battery management, motor drives), and energy storage integration. Essential for roles in renewable energy companies, EV manufacturers, and smart grid development.",

      realWorldApplications: [
        "Designing solar inverters and wind turbine converters for renewable energy systems",
        "Developing battery management systems and DC-DC converters for electric vehicles",
        "Implementing motor drives for industrial automation and HVAC systems",
        "Creating power supplies and converters for consumer electronics and data centers",
        "Integrating energy storage systems with the electrical grid",
        "Optimizing power conversion efficiency and thermal management"
      ],

      learningOutcomes: [
        "Understand operation and control of power semiconductor switches (MOSFETs, IGBTs)",
        "Design and analyze DC-DC converters (buck, boost, buck-boost)",
        "Analyze AC-DC rectifiers and DC-AC inverters for power conversion",
        "Apply pulse-width modulation (PWM) for power converter control",
        "Evaluate efficiency, losses, and thermal considerations in power converters",
        "Implement real-world power electronic systems for renewable energy and drives"
      ],

      topics: [
        "Power semiconductor devices: diodes, MOSFETs, IGBTs, thyristors",
        "DC-DC converters: buck, boost, buck-boost, and isolated topologies",
        "AC-DC rectifiers and power factor correction",
        "DC-AC inverters and PWM techniques",
        "Three-phase converters and motor drives",
        "Renewable energy applications: solar inverters, wind converters"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=WClbOQtvGxw", // Power electronics overview
          "https://www.youtube.com/watch?v=9VxC4Kp1A4s", // DC-DC converters
          "https://www.youtube.com/watch?v=0IKvXB62b5g", // Inverters and PWM
          "https://www.youtube.com/watch?v=A6IFCXuorNo"  // Solar inverters
        ],
        websites: [
          "https://www.electrical4u.com/power-electronics/",
          "https://www.electronics-tutorials.ws/power/power-electronics.html",
          "https://www.ti.com/power-management/overview.html", // Texas Instruments power resources
          "https://www.infineon.com/cms/en/applications/power-electronics/" // Infineon power electronics
        ],
        tools: [
          "PLECS", // Specialized power electronics simulation
          "LTspice", // Circuit-level power electronics simulation
          "PSIM", // Power electronics and motor drive simulation
          "MATLAB/Simulink" // System-level power converter modeling
        ]
      },

      additionalNotes:
        "Power Electronics is increasingly important with the growth of renewable energy, electric vehicles, and smart grids. Modern power systems rely heavily on power electronic converters for efficiency and controllability. High-demand skill in industry."
    }
  }
];

/**
 * 🟡 TIER 2: ADVANCED POWER & ENERGY TOPICS
 * These courses deepen power systems expertise and make candidates stand out in specialized roles.
 * Highly recommended for students serious about power engineering careers.
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "power-ee-171",
    code: "EE 171",
    name: "Renewable Energy Systems",
    fullName: "EE 171: Renewable Energy Systems",
    description: "Solar, wind, and renewable energy technologies, grid integration, and energy storage systems",
    tier: 2,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Renewable Energy Systems is increasingly critical as the power industry transitions to clean energy. Essential for careers in solar/wind companies, grid integration, energy storage, and sustainable energy consulting.",

      realWorldApplications: [
        "Designing photovoltaic (solar) systems and wind turbine installations",
        "Integrating renewable energy sources with the electrical grid",
        "Analyzing energy storage systems (batteries, pumped hydro) for grid stability",
        "Evaluating renewable energy project feasibility and economics",
        "Implementing smart grid technologies for distributed generation",
        "Optimizing hybrid renewable energy systems for reliability and cost"
      ],

      learningOutcomes: [
        "Understand solar, wind, hydro, and other renewable energy technologies",
        "Analyze renewable energy resource assessment and site evaluation",
        "Design grid-connected and standalone renewable energy systems",
        "Evaluate energy storage technologies and integration strategies",
        "Apply power electronics for renewable energy conversion and control",
        "Assess economic and environmental impacts of renewable energy projects"
      ],

      topics: [
        "Photovoltaic systems: cells, modules, arrays, and inverters",
        "Wind energy: turbine technology and power extraction",
        "Energy storage: batteries, flywheels, pumped hydro, and emerging technologies",
        "Grid integration and distributed generation",
        "Microgrids and off-grid systems",
        "Renewable energy economics and policy"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=5sKah3pJnHI", // Solar energy systems
          "https://www.youtube.com/watch?v=xIbVEJnPXOc", // Wind power explained
          "https://www.youtube.com/watch?v=dctVXHWHgCU", // Energy storage systems
          "https://www.youtube.com/watch?v=T0Un-zorRYk"  // Grid integration of renewables
        ],
        websites: [
          "https://www.nrel.gov/", // National Renewable Energy Laboratory
          "https://www.energy.gov/eere/renewable-energy", // DOE Renewable Energy
          "https://www.irena.org/", // International Renewable Energy Agency
          "https://www.solarpowerworld.com/" // Solar industry news and resources
        ],
        tools: [
          "HOMER", // Hybrid renewable energy system design
          "PVsyst", // Photovoltaic system design and simulation
          "SAM (System Advisor Model)", // Renewable energy techno-economic analysis
          "MATLAB/Simulink" // Renewable energy modeling
        ]
      },

      additionalNotes:
        "With the global shift toward clean energy, Renewable Energy Systems is one of the fastest-growing areas in electrical engineering. Highly marketable for students interested in sustainability and energy transition."
    }
  },
  {
    id: "power-ee-160",
    code: "EE 160",
    name: "Electric Power Systems",
    fullName: "EE 160: Electric Power Systems",
    description: "Feedback control, system stability, and control design for power systems and energy applications",
    tier: 2,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Control Systems is essential for power system stability, voltage regulation, frequency control, and automated grid management. Critical for advanced power systems roles and smart grid development.",

      realWorldApplications: [
        "Designing automatic voltage regulators (AVRs) for generators",
        "Implementing frequency control and load-frequency management in power grids",
        "Developing control strategies for renewable energy integration and grid stability",
        "Optimizing motor drives and power electronic converter control",
        "Creating feedback control for energy storage systems and microgrids",
        "Analyzing power system stability using control theory"
      ],

      learningOutcomes: [
        "Understand feedback control principles and system stability",
        "Model dynamic systems using transfer functions and state-space representations",
        "Design PID controllers and analyze their performance",
        "Evaluate system stability using root locus, Bode plots, and Nyquist criteria",
        "Apply control theory to power systems and energy applications",
        "Implement digital control systems for real-time applications"
      ],

      topics: [
        "Feedback control systems and closed-loop behavior",
        "Transfer functions and frequency response",
        "Stability analysis: Routh-Hurwitz, root locus, Bode, Nyquist",
        "PID controller design and tuning",
        "State-space modeling and control",
        "Applications to power systems: AVR, governor control, FACTS devices"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=oBc_BHxw78s", // Control systems intro
          "https://www.youtube.com/watch?v=wkfEZmsQqiA", // PID control explained
          "https://www.youtube.com/watch?v=JFTJ2SS4xyA", // Stability analysis
          "https://www.youtube.com/watch?v=Pi7l8mMjYVE"  // Control systems in power grids
        ],
        websites: [
          "https://www.electrical4u.com/control-system/",
          "https://ctms.engin.umich.edu/CTMS/index.php", // Control tutorials
          "https://www.mathworks.com/solutions/control-systems.html", // MATLAB control resources
          "https://www.electronics-tutorials.ws/systems/control-systems.html"
        ],
        tools: [
          "MATLAB/Simulink", // Control system design and simulation
          "LabVIEW", // Real-time control implementation
          "Scilab/Xcos", // Open-source control system software
          "Python (Control Systems Library)" // Python-based control design
        ]
      },

      additionalNotes:
        "Control Systems is a foundational course for understanding power system stability and automation. Increasingly important with smart grids, renewable energy integration, and advanced power electronics."
    }
  },
  {
    id: "power-math-024",
    code: "MATH 024",
    name: "Linear Algebra and Differential Equations",
    fullName: "MATH 024: Linear Algebra and Differential Equations",
    description: "Mathematical foundations for power system modeling, network analysis, and dynamic system behavior",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Linear Algebra and Differential Equations provide the mathematical foundation for power flow analysis, transient stability studies, and control system design. Essential for advanced power systems analysis and research.",

      realWorldApplications: [
        "Formulating and solving load flow equations using matrix methods",
        "Modeling transient behavior of power systems with differential equations",
        "Analyzing power system stability using eigenvalue analysis",
        "Implementing numerical methods for large-scale grid simulation",
        "Designing optimal control strategies using state-space representations",
        "Understanding network topology and connectivity in power grids"
      ],

      learningOutcomes: [
        "Solve systems of linear equations relevant to power flow analysis",
        "Understand eigenvalues, eigenvectors, and matrix transformations",
        "Apply differential equations to model dynamic power system behavior",
        "Use Laplace transforms for analyzing transient responses",
        "Implement numerical methods for solving large-scale engineering problems",
        "Apply mathematical tools to power system stability and control"
      ],

      topics: [
        "Systems of linear equations and matrix operations",
        "Eigenvalues and eigenvectors for stability analysis",
        "First and second-order differential equations",
        "Laplace transforms and transfer functions",
        "Matrix methods for network analysis",
        "Numerical methods for solving differential equations"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNk_zzaMoSs", // Linear algebra for engineering
          "https://www.youtube.com/watch?v=ZK3O402wf1c", // Differential equations
          "https://www.youtube.com/watch?v=Ip3X9LOh2dk", // Matrix methods
          "https://www.youtube.com/watch?v=PFDu9oVAE-g"  // Laplace transforms
        ],
        websites: [
          "https://www.khanacademy.org/math/linear-algebra",
          "https://tutorial.math.lamar.edu/Classes/DE/DE.aspx",
          "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
          "https://www.mathsisfun.com/algebra/matrix-introduction.html"
        ],
        tools: [
          "MATLAB", // Matrix computations and differential equation solving
          "Python (NumPy/SciPy)", // Numerical linear algebra and ODE solvers
          "Mathematica", // Symbolic and numerical mathematics
          "Octave" // Open-source MATLAB alternative
        ]
      },

      additionalNotes:
        "Linear Algebra and Differential Equations are mathematical prerequisites for advanced power systems courses. Essential for understanding load flow, stability analysis, and control system design."
    }
  },
  {
    id: "power-engr-120",
    code: "ENGR 120",
    name: "Engineering Economics",
    fullName: "ENGR 120: Engineering Economics",
    description: "Economic analysis, project evaluation, and financial decision-making for energy projects",
    tier: 2,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Engineering Economics is critical for evaluating power projects, renewable energy investments, and grid infrastructure upgrades. Essential for roles in energy consulting, project management, and utility planning.",

      realWorldApplications: [
        "Evaluating the financial viability of renewable energy projects",
        "Performing cost-benefit analysis for grid modernization and upgrades",
        "Calculating return on investment (ROI) for energy efficiency projects",
        "Comparing lifecycle costs of different power generation technologies",
        "Assessing risk and uncertainty in energy infrastructure investments",
        "Supporting decision-making for utility rate structures and tariff design"
      ],

      learningOutcomes: [
        "Apply time value of money concepts to engineering projects",
        "Perform economic analysis using NPV, IRR, and payback period methods",
        "Evaluate alternatives and make informed engineering decisions",
        "Understand depreciation, taxes, and their impact on project economics",
        "Conduct breakeven and sensitivity analysis for energy projects",
        "Assess risk and uncertainty in economic evaluations"
      ],

      topics: [
        "Time value of money and interest calculations",
        "Net present value (NPV) and internal rate of return (IRR)",
        "Depreciation methods and tax considerations",
        "Economic comparison of alternatives",
        "Breakeven analysis and sensitivity studies",
        "Risk analysis and decision-making under uncertainty"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=73K6SRcNpMI", // Engineering economics basics
          "https://www.youtube.com/watch?v=fU5NqFqC1bo", // NPV and IRR explained
          "https://www.youtube.com/watch?v=NkfISX2hfLM", // Cost-benefit analysis
          "https://www.youtube.com/watch?v=oTARHNAh6Bw"  // Project evaluation
        ],
        websites: [
          "https://www.engineering.com/story/engineering-economics-fundamentals",
          "https://www.investopedia.com/terms/n/npv.asp", // Financial analysis concepts
          "https://www.nrel.gov/analysis/tech-lcoe.html", // NREL cost analysis resources
          "https://www.energycentral.com/" // Energy industry economic insights
        ],
        tools: [
          "Excel", // Financial modeling and analysis
          "SAM (System Advisor Model)", // Renewable energy economic analysis
          "HOMER", // Energy system economic optimization
          "Python (Financial Libraries)" // Custom economic analysis tools
        ]
      },

      additionalNotes:
        "Engineering Economics helps power engineers understand the business side of energy projects. Critical for making informed decisions about technology selection, project feasibility, and investment strategies."
    }
  }
];

/**
 * 🟠 TIER 3: POWER-ADJACENT & ENRICHMENT (Optional)
 * Good for well-rounded engineers and helpful in specific contexts, but not essential for power systems careers.
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "power-cse-020",
    code: "CSE 020",
    name: "Introduction to Computing 1",
    fullName: "CSE 020: Introduction to Computing 1",
    description: "Programming fundamentals useful for power system simulation and automation",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Programming skills are increasingly valuable in power systems for automation, data analysis, and custom simulation tools. While not required, coding ability enhances career flexibility and problem-solving capabilities.",

      realWorldApplications: [
        "Writing scripts to automate power system analysis tasks",
        "Analyzing large datasets from smart meters and grid sensors",
        "Customizing power system simulation tools and models",
        "Developing control algorithms for power electronic converters",
        "Creating visualization tools for power flow and stability studies",
        "Integrating power system software with external databases and APIs"
      ],

      learningOutcomes: [
        "Understand fundamental programming concepts and logic",
        "Write programs to solve engineering problems",
        "Use data structures and control flow for automation",
        "Debug and test code effectively",
        "Apply programming to power system analysis tasks"
      ],

      topics: [
        "Variables, data types, and operators",
        "Control structures: loops and conditionals",
        "Functions and modular programming",
        "Arrays and basic data structures",
        "File I/O for data processing",
        "Introduction to algorithms"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc", // Python programming
          "https://www.youtube.com/watch?v=rfscVS0vtbw", // Programming basics
          "https://www.youtube.com/watch?v=8DvywoWv6zI"  // Intro to coding
        ],
        websites: [
          "https://www.codecademy.com/",
          "https://www.w3schools.com/python/",
          "https://realpython.com/",
          "https://www.learnpython.org/"
        ],
        tools: [
          "Python", // General-purpose programming for engineering
          "MATLAB", // Technical computing and power system analysis
          "Jupyter Notebook", // Interactive coding for data analysis
          "VS Code" // Code editor
        ]
      },

      additionalNotes:
        "While not essential for traditional power systems roles, programming is becoming increasingly valuable with smart grids, data analytics, and automation. Python and MATLAB are especially useful."
    }
  },
  {
    id: "power-ee-010",
    code: "EE 010",
    name: "Introduction to Electrical Engineering",
    fullName: "EE 010: Introduction to Electrical Engineering",
    description: "Broad overview of electrical engineering fields and career paths",
    tier: 3,
    expandedInfo: {
      credits: 2,
      careerRelevance:
        "Provides a survey of electrical engineering disciplines and helps students understand career options. Useful for early exploration but not directly applicable to power systems work.",

      realWorldApplications: [
        "Understanding the breadth of electrical engineering specializations",
        "Exploring career paths in power, electronics, communications, and controls",
        "Learning about professional practice and engineering ethics",
        "Connecting with industry professionals through guest lectures",
        "Developing teamwork and project skills"
      ],

      learningOutcomes: [
        "Identify major areas within electrical engineering",
        "Understand career opportunities and professional pathways",
        "Apply basic engineering problem-solving skills",
        "Communicate technical ideas effectively",
        "Work in teams on engineering projects"
      ],

      topics: [
        "Overview of electrical engineering disciplines",
        "Career exploration and professional development",
        "Engineering ethics and societal impact",
        "Teamwork and communication skills",
        "Introduction to engineering design"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=rk6klZmYa3g", // What is electrical engineering?
          "https://www.youtube.com/watch?v=COpjI86LhZY", // EE career paths
          "https://www.youtube.com/watch?v=EUtDc7fmKp8"  // Engineering careers
        ],
        websites: [
          "https://www.ieee.org/", // IEEE professional resources
          "https://www.bls.gov/ooh/architecture-and-engineering/electrical-and-electronics-engineers.htm",
          "https://www.egr.uh.edu/electrical/career-paths",
          "https://www.asme.org/topics-resources/content/engineering-careers"
        ],
        tools: [
          "N/A - Survey course"
        ]
      },

      additionalNotes:
        "Introduction to Electrical Engineering is a foundational course for freshmen. Useful for orientation and career exploration, but does not directly contribute to power systems technical skills."
    }
  },
  {
    id: "power-phys-009",
    code: "PHYS 009",
    name: "Modern Physics",
    fullName: "PHYS 009: Modern Physics",
    description: "Quantum mechanics and relativity — interesting but not directly applicable to power systems",
    tier: 3,
    expandedInfo: {
      credits: 3,
      careerRelevance:
        "Modern Physics provides a deeper understanding of semiconductor physics (useful for power electronics) but is not essential for most power systems careers. More relevant for research or advanced device physics.",

      realWorldApplications: [
        "Understanding quantum mechanics foundations of semiconductor devices",
        "Analyzing atomic and molecular behavior relevant to materials science",
        "Providing theoretical background for advanced electronics research",
        "Exploring photovoltaic cell physics at a deeper level"
      ],

      learningOutcomes: [
        "Understand quantum mechanics basics and wave-particle duality",
        "Explain atomic structure and energy levels",
        "Describe semiconductor physics from a quantum perspective",
        "Analyze photoelectric effect and photon interactions"
      ],

      topics: [
        "Quantum mechanics and wave-particle duality",
        "Atomic structure and spectroscopy",
        "Semiconductor physics and band theory",
        "Nuclear physics basics",
        "Special relativity"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Usu9xZfabPM", // Quantum mechanics intro
          "https://www.youtube.com/watch?v=7kb1VOpYYg4", // Modern physics overview
          "https://www.youtube.com/watch?v=Wa7wjr6bYU4"  // Semiconductor physics
        ],
        websites: [
          "https://www.khanacademy.org/science/physics/quantum-physics",
          "https://hyperphysics.phy-astr.gsu.edu/hbase/quantum/qm.html",
          "https://www.britannica.com/science/quantum-mechanics-physics",
          "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/"
        ],
        tools: [
          "N/A - Theoretical course"
        ]
      },

      additionalNotes:
        "Modern Physics is intellectually enriching and provides deep understanding of semiconductor behavior, but it is not a practical requirement for power systems engineering. Consider if interested in research or device physics."
    }
  }
];

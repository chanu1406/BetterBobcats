/**
 * Aerospace / Defense Engineer Career Path - Tier Courses
 * Detailed course information for each tier
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
    id: "ae-171",
    code: "AE 171",
    name: "Aerospace Structures and Materials",
    fullName: "AE 171: Aerospace Structures and Materials",
    description:
      "Study of structural analysis, material selection, and design principles for aerospace vehicles with emphasis on airframe and spacecraft integrity under operational loads.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Design and analysis of aerospace structures are core tasks in high-end aerospace/defense engineering — you’ll size load-bearing members and analyze damage tolerance in fighter jets, satellites, and launch systems. This course directly prepares engineers for structural design evaluations used by organizations such as NASA and major defense contractors.",
      realWorldApplications: [
        "Selecting composite laminates for fuselage panels subjected to tensile and compressive flight cycles",
        "Sizing wing spars to meet certification load cases defined in FAA/ military specs",
        "Evaluating fracture mechanics and fatigue life for spacecraft docking hardware",
      ],
      learningOutcomes: [
        "Analyze stress, strain, and deflection in aerospace structural components",
        "Select and justify appropriate aerospace materials based on performance criteria",
        "Apply failure theories (e.g., Tsai-Wu, von Mises) for structural design decisions",
        "Perform lightweight structural optimization consistent with aerospace safety margins",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=lGjtqxOgHf0", // Intro to Aerospace Structures and Materials (DelftX) :contentReference[oaicite:turn0search7]{index=0}
          "https://www.youtube.com/playlist?list=PLv4AhJns8bvCP7FGrBsNtE-YDYlD1koUM", // Aerospace Structures Lecture Playlist :contentReference[oaicite:turn0search5]{index=1}
          "https://www.youtube.com/watch?v=3kFqaoSVjwU", // Structural elements of aerospace materials :contentReference[oaicite:turn0search19]{index=2}
        ],
        websites: [
          "https://ocw.mit.edu/courses/16-752-structural-mechanics-fall-2003/", // MIT OCW structural mechanics
          "https://www.nasa.gov/ames/structures-materials", // NASA materials overview
          "https://www.aiaa.org/", // AIAA professional resources
        ],
        tools: ["ANSYS (FEA Structural Analysis)", "MATLAB (data & optimization)", "SolidWorks Simulation"],
      },
    },
  },
  {
    id: "ae-172",
    code: "AE 172",
    name: "Flight Dynamics and Control",
    fullName: "AE 172: Flight Dynamics and Control",
    description:
      "Principles of aircraft and spacecraft motion, stability, and control design with emphasis on flight performance and autopilot systems.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Understanding flight dynamics and control is essential to designing stable and responsive aerospace systems — from UAV autopilots to guided defense missiles. Engineers in high-end aerospace roles routinely model 6-DoF dynamics and implement control laws on embedded systems.",
      realWorldApplications: [
        "Modeling attitude control for small satellite reaction wheels and thrusters",
        "Designing PID and state-space controllers for UAV flight stabilization",
        "Simulating missile guidance responses under aerodynamic disturbances",
      ],
      learningOutcomes: [
        "Derive equations of motion for rigid bodies in aerospace applications",
        "Evaluate static and dynamic stability modes",
        "Design and analyze feedback control systems (e.g., PID, state feedback)",
        "Simulate flight responses using MATLAB/Simulink",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=mb6O8fdHtKs", // Flight dynamics fundamentals (verified)
          "https://www.youtube.com/watch?v=dSgQONE4X4k", // Aircraft stability explained (verified)
          "https://www.youtube.com/watch?v=fDmvNxcXA5w", // Aerospace vs Mechanical and control context (verified) :contentReference[oaicite:turn0search4]{index=2}
        ],
        websites: [
          "https://ocw.mit.edu/courses/aeronautics-and-astronautics/16-30-flight-dynamics-fall-2006/", // MIT OCW flight dynamics
          "https://www.aiaa.org/", // AIAA standards & papers
          "https://www.nasa.gov/aeronautics", // NASA aeronautics research
        ],
        tools: ["MATLAB/Simulink (control design)", "X-Plane/FlightGear (flight simulation)", "Python control libraries"],
      },
    },
  },
  {
    id: "ae-173",
    code: "AE 173",
    name: "Aerospace Propulsion",
    fullName: "AE 173: Aerospace Propulsion",
    description:
      "Study of air-breathing (turbojet, turbofan) and rocket propulsion systems, thermodynamic cycles, and performance analysis for aerospace vehicles.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Propulsion engineers in aerospace/defense design engines for fighter jets, spacecraft launch vehicles, and hypersonic systems. This course equips students with analytical skills to evaluate thrust, efficiency, and cycle performance that industry and government labs require.",
      realWorldApplications: [
        "Analyzing rocket engine nozzle expansion ratios for optimal vacuum performance",
        "Comparing thrust and specific impulse of turbofan versus rocket engines for mission design",
        "Applying Brayton cycle analysis to turbomachinery in defense UAVs",
      ],
      learningOutcomes: [
        "Explain thermodynamic cycles of aerospace propulsion systems",
        "Compute thrust, specific impulse, and efficiency metrics",
        "Analyze performance of turbojet/turbofan and rocket engines",
        "Apply propulsion principles to mission trade studies",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=vFv6UX2-etw", // Fundamentals of Aerospace Propulsion (verified) :contentReference[oaicite:turn0search17]{index=0}
          "https://www.youtube.com/watch?v=2fwBcQOqjwE", // Jet engine explained (verified)
          "https://www.youtube.com/watch?v=ZQZ9oZpI5Ok", // Rocket propulsion primer (verified)
        ],
        websites: [
          "https://ocw.mit.edu/courses/aeronautics-and-astronautics/16-512-propulsion-systems-spring-2004/", // MIT OCW propulsion
          "https://www.nasa.gov/centers/marshall/about/rocket_propulsion", // NASA rocket propulsion
          "https://www.aiaa.org/", // AIAA resources
        ],
        tools: ["NASA CEA (chemical equilibrium)", "MATLAB (cycle analysis)", "CFD tools for nozzle flow"],
      },
    },
  },
  {
    id: "me-136",
    code: "ME 136",
    name: "Aerodynamics",
    fullName: "ME 136: Aerodynamics",
    description:
      "Fundamentals of fluid flow around bodies, lift and drag prediction, and aerodynamic design principles applicable to aerospace vehicles.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Aerodynamic understanding is foundational for aerospace roles designing wings, control surfaces, and high-speed vehicles. Engineers use these principles daily in CFD and wind tunnel testing to refine performance and reduce drag.",
      realWorldApplications: [
        "Predicting lift and drag for UAV wing sections under variable Reynolds numbers",
        "Designing supersonic shapes to manage shock wave formation",
        "Evaluating airfoil performance for rotorcraft blades",
      ],
      learningOutcomes: [
        "Apply Bernoulli and Navier–Stokes principles to aerodynamic problems",
        "Compute lift, drag, and moment coefficients",
        "Analyze boundary layers and flow separation",
        "Use basic CFD to model external flows",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Z_asNY5R50Y", // Aerodynamics fundamentals (verified)
          "https://www.youtube.com/watch?v=LtG4gSpB2m4", // Airfoil theory (verified)
          "https://www.youtube.com/watch?v=hpPz-J7UQJI", // Boundary layer and separation (verified)
        ],
        websites: [
          "https://ocw.mit.edu/courses/16-100-aerodynamics-fall-2005/", // MIT OCW aerodynamics
          "https://www.aiaa.org/", // Professional aerospace society
          "https://www.nasa.gov/aerodynamics", // NASA aerodynamics insights
        ],
        tools: ["ANSYS Fluent (CFD)", "XFOIL (airfoil analysis)", "MATLAB (flow computation)"],
      },
    },
  },
  {
    id: "me-250",
    code: "ME 250",
    name: "Compressible Flows",
    fullName: "ME 250: Compressible Flows",
    description:
      "Advanced study of high-speed gas dynamics including shock waves, expansions, and supersonic/hypersonic phenomena critical for aerospace propulsion and flight.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "High-speed flow analysis is required for supersonic/hypersonic vehicle and propulsion design in defense and space sectors. Engineers apply compressible flow concepts to nozzle design, inlet performance, and shock interaction prediction.",
      realWorldApplications: [
        "Designing supersonic inlets for high-Mach UAVs",
        "Analyzing shock wave interactions on hypersonic vehicle surfaces",
        "Sizing convergent–divergent nozzles for rocket engines",
      ],
      learningOutcomes: [
        "Analyze one-dimensional compressible flow phenomena",
        "Evaluate normal and oblique shock conditions",
        "Apply Prandtl–Meyer functions to expansion fans",
        "Design flow passages for supersonic/hypersonic regimes",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2r2UMBIhq4o", // Compressible flow basics (verified)
          "https://www.youtube.com/watch?v=2gAqQGOy0KM", // Shock waves explained (verified)
          "https://www.youtube.com/watch?v=UJs0Avjw430", // Supersonic nozzle flows (verified)
        ],
        websites: [
          "https://ocw.mit.edu/courses/16-300-jet-propulsion-spring-2007/", // MIT OCW compressible flow content
          "https://www.nasa.gov/aeronautics", // High-speed research
          "https://www.aiaa.org/", // Aerospace professional society
        ],
        tools: ["MATLAB (shock & expansion functions)", "CFD for high-speed flows"],
      },
    },
  },
  {
    id: "me-254",
    code: "ME 254",
    name: "Computational Fluid Dynamics",
    fullName: "ME 254: Computational Fluid Dynamics",
    description:
      "Numerical methods to model fluid flows, turbulence, and heat transfer with application to aerospace design and analysis.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "CFD is a standard industry tool for aerodynamic and propulsion design, enabling virtual testing of flight vehicles and components. Aerospace engineers use CFD to iterate designs and reduce reliance on costly physical experiments.",
      realWorldApplications: [
        "Simulating airflow around aircraft wings at cruise conditions",
        "Modeling turbine blade cooling flows in jet engines",
        "Predicting aero-thermal loads on hypersonic vehicle surfaces",
      ],
      learningOutcomes: [
        "Formulate finite volume/finite element discretizations for fluid equations",
        "Implement CFD simulations with commercial solvers",
        "Validate CFD results against experimental or analytical benchmarks",
        "Optimize designs based on CFD insights",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Q6M6Z1tAh6Q", // What is CFD? (verified)
          "https://www.youtube.com/watch?v=5N1P1rH5Q0I", // CFD workflow basics (verified)
          "https://www.youtube.com/watch?v=sJHt3kaJAL0", // Turbulence modeling intro (verified)
        ],
        websites: [
          "https://ocw.mit.edu/courses/16-310-computational-fluid-dynamics-fall-2005/", // MIT OCW CFD
          "https://www.aiaa.org/", // AIAA CFD resources
          "https://www.nasa.gov/aeronautics", // NASA simulation research
        ],
        tools: ["ANSYS Fluent", "OpenFOAM", "MATLAB (post-processing)"],
      },
    },
  },
];

export const tier2Courses: TierCourse[] = [
  {
    id: "ae-174",
    code: "AE 174",
    name: "Aeroelasticity",
    fullName: "AE 174: Aeroelasticity",
    description:
      "Examination of interactions between aerodynamic forces and elastic structures, including flutter, divergence, and dynamic fluid–structure coupling relevant to aircraft and spacecraft components.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Aeroelastic phenomena must be predicted and mitigated in high-performance and lightweight aerospace platforms to prevent catastrophic instability during flight. Engineers in advanced aerospace and defense roles analyze flutter margins and design stiffness distributions for wings, control surfaces, and space deployables.",
      realWorldApplications: [
        "Predicting and avoiding flutter in long-span UAV wings during high-speed cruise",
        "Designing flexible spacecraft solar arrays to withstand inertial and aerodynamic loads",
        "Balancing stiffness and mass in fighter jet control surfaces to meet maneuverability specs",
      ],
      learningOutcomes: [
        "Model fundamental aeroelastic interactions between aerodynamic forces and structural deformation",
        "Identify, predict, and mitigate flutter and divergence in flexible aerospace systems",
        "Link dynamic structural response to aerodynamic load changes under varying flight conditions",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=1ZGQTc-NTF4", // Aeroelasticity Lecture (Duke) :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/watch?v=UNWOgIuqhgA", // Intro to Flutter :contentReference[oaicite:1]{index=1}
          "https://www.youtube.com/watch?v=g4xz8-wCyP0", // Intro to Aeroelasticity (basics) :contentReference[oaicite:2]{index=2}
        ],
        websites: [
          "https://en.wikipedia.org/wiki/Aeroelasticity", // Overview and key concepts :contentReference[oaicite:3]{index=3}
          "https://www.aiaa.org/", // AIAA professional resources
          "https://www.nasa.gov/aeroelasticity", // NASA aeroelastic research
        ],
        tools: ["ANSYS (Fluid–Structure Interaction)", "NASTRAN (structural dynamics)", "MATLAB (dynamic simulation)"],
      },
    },
  },
  {
    id: "me-145",
    code: "ME 145",
    name: "Lagrange Dynamics",
    fullName: "ME 145: Lagrange Dynamics",
    description:
      "Advanced dynamics course emphasizing Lagrangian and energy-based methods for deriving equations of motion of complex mechanical systems, multi-body spacecraft, and constrained mechanisms.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "High-end aerospace/defense careers require modeling of multi-body system dynamics for spacecraft attitude control, robotic manipulators, and deployable systems. Lagrangian methods are industry standard for deriving equations of motion under constraints and for integration with control design.",
      realWorldApplications: [
        "Modeling satellite attitude control systems with reaction wheels and control moment gyros",
        "Simulating robotic arm dynamics for space servicing missions",
        "Analyzing constrained deployable mechanisms on launch vehicles",
      ],
      learningOutcomes: [
        "Apply Lagrangian mechanics to derive equations of motion for mechanical systems",
        "Model constrained multi-body dynamics and generalized coordinates",
        "Simulate dynamic responses using computational tools",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=9M1l3zx1vw0", // Classical mechanics intro with Lagrangian focus :contentReference[oaicite:4]{index=4}
          "https://www.youtube.com/watch?v=9r-r1joUSp0", // Lagrangian equations & effective potential :contentReference[oaicite:5]{index=5}
          "https://www.youtube.com/playlist?list=PLTMo3nrl2KWay7NUQJUc4pUw574oG2ktH", // Lagrangian dynamics playlist :contentReference[oaicite:6]{index=6}
        ],
        websites: [
          "https://ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/lecture-notes/", // MIT OCW dynamics resource
          "https://www.aiaa.org/", // AIAA engineering society
          "https://www.nasa.gov/ames/multibody-dynamics", // NASA multibody dynamics research
        ],
        tools: ["MATLAB (symbolic dynamics)", "Simscape Multibody", "MapleSim"],
      },
    },
  },
  {
    id: "me-140",
    code: "ME 140",
    name: "Vibration and Control",
    fullName: "ME 140: Vibration and Control",
    description:
      "Mechanical vibration analysis and control strategies, focusing on modal behavior, resonance, and damping relevant to aerospace structural integrity and rotating machinery.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Aerospace engineers must assess and mitigate vibration in structures, engines, and appendages to ensure reliability and comfort. Knowledge of vibration control enables careers in structural dynamics analysis, rotorcraft design, and aerospace test & evaluation.",
      realWorldApplications: [
        "Designing isolation systems for avionics bays in fighter aircraft",
        "Modeling rotor imbalance and vibration damping in jet engines",
        "Applying active vibration control to satellite appendages",
      ],
      learningOutcomes: [
        "Analyze natural frequencies and mode shapes of mechanical systems",
        "Design passive and active vibration control strategies",
        "Predict resonance and fatigue issues under dynamic loads",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2YzCs9IDsUU", // Mechanical Vibrations Lecture 1 :contentReference[oaicite:7]{index=7}
          "https://www.youtube.com/playlist?list=PLMXj6GKKnHI6Lftj7CXr9WusMkXi5s9yH", // Mechanical Vibrations playlist :contentReference[oaicite:8]{index=8}
          "https://www.youtube.com/playlist?list=PLP1OdTlavJNvcBTfOPLCfxMGr75xqkstW", // Intro to vibrations series :contentReference[oaicite:9]{index=9}
        ],
        websites: [
          "https://ocw.mit.edu/courses/2-003-structural-dynamics-and-control-spring-2014/", // MIT OCW structural dynamics
          "https://www.aiaa.org/", // Aerospace professional society
          "https://www.nasa.gov/", // NASA research context
        ],
        tools: ["ANSYS Modal Analysis", "MATLAB (dynamic simulation)", "LabVIEW (data acquisition)"],
      },
    },
  },
  {
    id: "ee-122",
    code: "EE 122",
    name: "Introduction to Control Systems",
    fullName: "EE 122: Introduction to Control Systems",
    description:
      "Fundamentals of feedback control theory, time- and frequency-domain design methods with applications to aerospace flight control, guidance, and stability augmentation.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Control systems are core to autopilot design, guidance algorithms, and stability management in aerospace/defense platforms. Flight control engineers apply these principles for high-performance system tuning and robust controller implementation.",
      realWorldApplications: [
        "Designing autopilot control loops for UAV flight stabilization",
        "Evaluating stability margins in aircraft pitch control systems",
        "Implementing state-space controllers for satellite attitude control",
      ],
      learningOutcomes: [
        "Design and analyze time- and frequency-domain feedback systems",
        "Evaluate stability using root locus and Bode plots",
        "Implement PID and state feedback controllers",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L", // Control Systems Lectures playlist :contentReference[oaicite:10]{index=10}
          "https://www.youtube.com/watch?v=H5xpbth5G2g", // PID controller explained
          "https://www.youtube.com/watch?v=G3i3xO3xOKs", // Intro to control systems
        ],
        websites: [
          "https://ocw.mit.edu/courses/6-302-feedback-systems-spring-2007/", // MIT OCW feedback systems
          "https://www.aiaa.org/", // AIAA engineering society
          "https://www.nasa.gov/ames/control-systems", // NASA control systems insights
        ],
        tools: ["MATLAB/Simulink (control design)", "LabVIEW", "Python control libraries"],
      },
    },
  },
];

export const tier3Courses: TierCourse[] = [
  {
    id: "ee-115",
    code: "EE 115",
    name: "Electromagnetics and Applications",
    fullName: "EE 115: Electromagnetics and Applications",
    description:
      "Electromagnetic theory and its application to aerospace systems such as radar, antenna design, and electromagnetic compatibility in avionics.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Electromagnetics underpin radar, communications, and RF systems in defense/aerospace engineering, particularly for avionics and sensor design. Professionals in high-end roles must ensure EMI/EMC compliance and optimize RF system performance.",
      realWorldApplications: [
        "Designing aircraft communication and navigation antennas",
        "Predicting radar cross section effects for defense systems",
        "Ensuring electromagnetic compatibility for avionics suites",
      ],
      learningOutcomes: [
        "Understand Maxwell’s equations and wave propagation fundamentals",
        "Analyze antenna radiation patterns",
        "Evaluate EMI/EMC in complex aerospace systems",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=tvZvD6Nm3Dg", // Electromagnetics basics
          "https://www.youtube.com/watch?v=zqnMOr2Rb3E", // Antenna theory intro
          "https://www.youtube.com/watch?v=H_O88_Yi6iU", // EM waves explained
        ],
        websites: [
          "https://ocw.mit.edu/courses/6-02-introduction-to-electrical-engineering-and-computer-science/", // EM fundamentals
          "https://www.aiaa.org/", // Aerospace society
          "https://www.nasa.gov/ames/emc", // NASA EM compatibility research
        ],
        tools: ["CST Microwave Studio", "HFSS", "MATLAB"],
      },
    },
  },
  {
    id: "ee-185",
    code: "EE 185",
    name: "Instrumentation",
    fullName: "EE 185: Instrumentation",
    description:
      "Design and application of measurement systems and sensors for aerospace testing, diagnostics, and flight data acquisition.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Instrumentation skills are vital for aerospace flight test engineering, system health monitoring, and certification testing. Engineers select sensors and develop acquisition systems for real-time data used in performance validation.",
      realWorldApplications: [
        "Selecting inertial measurement units for spacecraft navigation",
        "Configuring strain gauge setups for structural load tests",
        "Developing telemetry systems for rocket flights",
      ],
      learningOutcomes: [
        "Choose and characterize sensors for aerospace applications",
        "Design data acquisition and signal conditioning systems",
        "Analyze measurement uncertainty and noise",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Z9sQzWZ3cUw", // Instrumentation basics
          "https://www.youtube.com/watch?v=VTaRrhN_Y6s", // Sensor selection in engineering
          "https://www.youtube.com/watch?v=UYdZ_VMtU7g", // DAQ systems intro
        ],
        websites: [
          "https://ocw.mit.edu/courses/6-131-feedback-systems-principles-and-applications-spring-2005/", // MIT OCW systems context
          "https://www.aiaa.org/", // Aerospace
          "https://www.nasa.gov/ames/instrumentation", // NASA instrumentation research
        ],
        tools: ["LabVIEW (DAQ)", "NI hardware", "MATLAB"],
      },
    },
  },
];

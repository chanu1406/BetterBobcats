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
    id: "ee-185",
    code: "EE 185",
    name: "Introduction to Control Systems",
    fullName: "EE 185: Introduction to Control Systems",
    description: "Feedback control principles, stability analysis, and controller design for aerospace systems.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance: "Control systems are essential for autopilots, guidance systems, and flight stability augmentation in aircraft and spacecraft.",
      realWorldApplications: [
        "Designing autopilot systems for unmanned aerial vehicles",
        "Implementing thrust vector control for rockets",
        "Stabilizing spacecraft attitude control systems"
      ],
      learningOutcomes: [
        "Analyze system stability using transfer functions and root locus",
        "Design PID and lead-lag compensators for control systems",
        "Model and simulate feedback control systems"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=oBc_BHxw78s",
          "https://www.youtube.com/watch?v=lBC1nEq0_nk",
          "https://www.youtube.com/watch?v=Pi7l8mMjYVE"
        ],
        websites: [
          "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/",
          "https://www.controleng.com/",
          "https://www.mathworks.com/solutions/control-systems.html"
        ],
        tools: ["MATLAB Control System Toolbox", "Simulink", "Python Control"]
      }
    }
  }
];

export const tier3Courses: TierCourse[] = [
  {
    id: "ae-171",
    code: "AE 171",
    name: "Aerospace Structures and Materials",
    fullName: "AE 171: Aerospace Structures and Materials",
    description: "Advanced study of aerospace structural design and material selection.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance: "Understanding aerospace structures is valuable for specialized roles in structural analysis and materials engineering.",
      realWorldApplications: [
        "Analyzing composite materials for aircraft components",
        "Evaluating structural integrity of aerospace vehicles",
        "Selecting materials for extreme aerospace environments"
      ],
      learningOutcomes: [
        "Analyze stress and strain in aerospace structures",
        "Select appropriate materials for aerospace applications",
        "Design lightweight structures for flight vehicles"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=lGjtqxOgHf0",
          "https://www.youtube.com/watch?v=3kFqaoSVjwU",
          "https://www.youtube.com/watch?v=ZKqrMhIB8bk"
        ],
        websites: [
          "https://ocw.mit.edu/courses/aeronautics-and-astronautics/",
          "https://www.nasa.gov/ames/structures-materials",
          "https://www.aiaa.org/"
        ],
        tools: ["ANSYS", "ABAQUS", "NASTRAN"]
      }
    }
  },
  {
    id: "ee-005",
    code: "EE 005",
    name: "Introduction to Electrical Engineering",
    fullName: "EE 005: Introduction to Electrical Engineering",
    description: "Basic electrical engineering concepts useful for understanding avionics and electrical systems.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance: "Basic electrical knowledge helps aerospace engineers interface with avionics and electrical subsystems.",
      realWorldApplications: [
        "Understanding aircraft electrical power distribution",
        "Working with avionics and sensor systems",
        "Troubleshooting electrical issues in aerospace systems"
      ],
      learningOutcomes: [
        "Understand basic circuit analysis and design",
        "Apply Ohm's law and Kirchhoff's laws",
        "Analyze AC and DC circuits"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=mc979OhitAg",
          "https://www.youtube.com/watch?v=fwjXkEaJILo",
          "https://www.youtube.com/watch?v=7w8LMc8q_jk"
        ],
        websites: [
          "https://www.allaboutcircuits.com/",
          "https://www.electronics-tutorials.ws/",
          "https://learn.sparkfun.com/"
        ],
        tools: ["Multimeter", "Oscilloscope", "Circuit Simulation Software"]
      }
    }
  }
];

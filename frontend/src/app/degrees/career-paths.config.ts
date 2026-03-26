export type DegreeName =
  | "CS/CSE"
  | "COGS"
  | "Electrical Engineering"
  | "Political Science"
  | "Mechanical Engineering";

export type CareerPathSection = "resource" | "career";

export interface CareerPathConfigEntry {
  id: string;
  name: string;
  section: CareerPathSection;
  description?: string;
  aliases?: string[];
  sidebarId?: string;
  dynamicImport?: () => Promise<unknown>;
}

export const DEGREE_ORDER: DegreeName[] = [
  "CS/CSE",
  "COGS",
  "Electrical Engineering",
  "Political Science",
  "Mechanical Engineering",
];

export const CAREER_PATH_REGISTRY: Record<DegreeName, CareerPathConfigEntry[]> = {
  "CS/CSE": [
    { id: "resumes", name: "Resumes", section: "resource" },
    { id: "alumni", name: "Alumni", section: "resource" },
    {
      id: "swe",
      name: "SWE (Generalist)",
      section: "career",
      description:
        "Software Engineers (Generalists) build and maintain software systems across multiple areas of the stack. This role emphasizes strong fundamentals in programming, data structures, and system design, along with hands-on experience building real applications. It's a flexible path suited for students who want broad technical exposure and strong career mobility across industries.",
      dynamicImport: () => import("./cs-cse/careers/swe/components/CareerPathGraph"),
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      section: "career",
      description:
        "Cybersecurity professionals protect systems, networks, and data from threats and attacks. This career path focuses on understanding security principles, cryptography, network defense, system vulnerabilities, and secure coding practices. Roles include Security Engineer, SOC Analyst, Penetration Tester, and Security Architect.",
      dynamicImport: () => import("./cs-cse/careers/cybersecurity/components/CareerPathGraph"),
    },
    {
      id: "ml-ai",
      name: "Machine Learning / AI",
      section: "career",
      description:
        "Machine Learning and AI professionals design systems that learn from data to make predictions, automate decisions, and solve complex problems. This career path focuses on understanding algorithms, statistical modeling, data processing, neural networks, and optimization techniques. It also emphasizes ethical AI, model evaluation, and deploying intelligent systems at scale. Roles include Machine Learning Engineer, Data Scientist, AI Researcher, and Applied AI Engineer.",
      dynamicImport: () => import("./cs-cse/careers/ml-ai/components/CareerPathGraph"),
    },
    {
      id: "data-science",
      name: "Data Science / Data Analytics",
      section: "career",
      description:
        "Data Scientists and Data Analysts transform raw data into actionable insights that drive business decisions. This career path combines programming (Python/R), statistics, mathematics, and domain expertise to clean, analyze, visualize, and model data. Core skills include SQL, statistical inference, machine learning, and data storytelling. Roles include Data Scientist, Data Analyst, Business Intelligence Engineer, and Analytics Engineer.",
      dynamicImport: () => import("./cs-cse/careers/datascience/components/CareerPathGraph"),
    },
    {
      id: "systems",
      name: "Systems / Infrastructure Engineering Pathway",
      section: "career",
      description:
        "Systems and Infrastructure Engineering professionals design, build, and maintain the core software systems that power modern computing environments. This career path focuses on understanding how software operates at scale, including operating systems, computer networks, distributed systems, and cloud infrastructure. It emphasizes performance, reliability, scalability, and fault tolerance, as well as low-level system behavior and resource management. Students also gain exposure to security, concurrency, and system design principles used in real-world production environments. Roles include Systems Engineer, Infrastructure Engineer, Backend Engineer, Site Reliability Engineer (SRE), and Platform Engineer.",
      dynamicImport: () => import("./cs-cse/careers/systems-infra/components/CareerPathGraph"),
    },
    {
      id: "embedded",
      name: "Embedded Systems Engineering Pathway",
      section: "career",
      description:
        "Embedded Systems Engineering professionals design, build, and program computing systems that are integrated into larger mechanical or electronic systems. This career path focuses on understanding how software interacts with hardware, including microcontrollers, sensors, actuators, and real-time systems. It emphasizes low-level programming, hardware-software co-design, real-time constraints, and resource optimization. Students gain exposure to firmware development, IoT systems, robotics, and cyber-physical systems. Roles include Embedded Systems Engineer, Firmware Engineer, IoT Engineer, Robotics Engineer, and Hardware-Software Integration Engineer.",
      dynamicImport: () => import("./cs-cse/careers/embedded-systems/components/CareerPathGraph"),
    },
  ],
  COGS: [
    { id: "resumes", name: "Resumes", section: "resource" },
    { id: "alumni", name: "Alumni", section: "resource" },
    {
      id: "ux-ui",
      name: "UX/UI Design & Research (Generalist)",
      section: "career",
      description:
        "UX/UI Design & Research professionals create user-centered products and experiences that combine cognitive science, design thinking, and technical skills. This career path focuses on understanding human behavior, conducting user research, designing intuitive interfaces, and collaborating with engineering teams. Students learn user research methods, prototyping, interaction design, visual design, and usability testing. It emphasizes both the psychological principles behind good design and the practical skills needed to create and validate designs. Roles include UX Designer, UI Designer, UX Researcher, Product Designer, Interaction Designer, and Design Engineer.",
      dynamicImport: () => import("./cogs/careers/ux-ui/components/CareerPathGraph"),
    },
    {
      id: "data-analyst",
      name: "Data Analyst (Generalist)",
      section: "career",
      description:
        "Data Analysts transform raw data into actionable insights that drive business decisions. This career path combines statistics, programming (Python/R/SQL), and domain expertise to collect, clean, analyze, visualize, and model data. Students learn statistical inference, hypothesis testing, database systems, data visualization, and experimental design. The path emphasizes both technical analytical skills and business communication, translating complex findings into clear recommendations. Roles include Data Analyst, Business Intelligence Analyst, Analytics Engineer, Marketing Analyst, Product Analyst, and Junior Data Scientist.",
      dynamicImport: () => import("./cogs/careers/data-analyst/components/CareerPathGraph"),
    },
    {
      id: "market-research",
      name: "Market Research Analyst (Generalist)",
      section: "career",
      description:
        "Market Research Analysts bridge consumer psychology, economic theory, and data analytics to understand market dynamics and inform business strategy. This career path integrates behavioral economics, statistical modeling, and business analytics to predict consumer behavior, analyze competitive landscapes, and forecast market trends. Students learn consumer decision-making, marketing strategy, econometrics, and data visualization. The path emphasizes both quantitative analytical skills and strategic thinking, translating market data into actionable business recommendations. Roles include Market Research Analyst, Consumer Insights Analyst, Business Analyst, Strategic Consultant, Product Marketing Analyst, and Competitive Intelligence Analyst.",
      dynamicImport: () => import("./cogs/careers/market-research/components/CareerPathGraph"),
    },
    {
      id: "human-resources",
      name: "Human Resources Specialist (Generalist)",
      section: "career",
      description:
        "Human Resources Specialists manage the employee lifecycle and shape organizational culture by combining psychology, sociology, economics, and data analytics. This career path integrates industrial-organizational psychology, labor economics, and people analytics to optimize talent acquisition, development, retention, and organizational effectiveness. Students learn workplace behavior, compensation strategy, DEI principles, leadership development, and HR technology. The path emphasizes both interpersonal skills and data-driven decision-making, translating employee insights into strategic HR initiatives. Roles include HR Generalist, Talent Acquisition Specialist, Compensation Analyst, HR Business Partner, People Analytics Specialist, and Organizational Development Consultant.",
      dynamicImport: () => import("./cogs/careers/human-resources/components/CareerPathGraph"),
    },
  ],
  "Electrical Engineering": [
    { id: "resumes", name: "Resumes", section: "resource" },
    { id: "alumni", name: "Alumni", section: "resource" },
    {
      id: "power-systems",
      name: "Power Systems & Energy",
      section: "career",
      dynamicImport: () => import("./electrical-engineering/careers/power-systems/components/CareerPathGraph"),
    },
    {
      id: "embedded-systems",
      name: "Embedded Systems & Robotics",
      section: "career",
      dynamicImport: () => import("./electrical-engineering/careers/embedded-systems/components/CareerPathGraph"),
    },
    {
      id: "ev-automotive",
      name: "Electric Vehicle & Automotive Systems",
      section: "career",
      dynamicImport: () => import("./electrical-engineering/careers/ev-automotive/components/CareerPathGraph"),
    },
    {
      id: "signals-rf",
      name: "Signals, Communications & RF",
      section: "career",
      dynamicImport: () => import("./electrical-engineering/careers/signals-rf/components/CareerPathGraph"),
    },
    {
      id: "controls-automation",
      name: "Controls & Automation",
      section: "career",
      dynamicImport: () => import("./electrical-engineering/careers/controls-automation/components/CareerPathGraph"),
    },
    {
      id: "hardware-ic-design",
      name: "Hardware / IC Design",
      section: "career",
      dynamicImport: () => import("./electrical-engineering/careers/hardware-ic-design/components/CareerPathGraph"),
    },
  ],
  "Political Science": [
    { id: "resumes", name: "Resumes", section: "resource" },
    { id: "alumni", name: "Alumni", section: "resource" },
    {
      id: "policy-research-analyst",
      name: "Policy / Research Analyst",
      section: "career",
      description:
        "Policy / Research Analysts conduct research, analyze data, and provide evidence-based recommendations to inform public policy decisions. This career path combines political science, statistics, economics, and research methods to evaluate policy effectiveness, assess program outcomes, and support evidence-based policymaking. Students learn quantitative analysis, research design, statistical modeling, and policy evaluation techniques. The path emphasizes both analytical rigor and clear communication, translating complex research findings into actionable policy recommendations. Roles include Policy Analyst, Research Analyst, Program Evaluator, Policy Researcher, and Data Analyst in government, think tanks, and nonprofit organizations.",
      dynamicImport: () =>
        import("./political-science/careers/policy-research-analyst/components/CareerPathGraph"),
    },
    {
      id: "legislative-aide-government-staff",
      name: "Legislative Aide / Government Staff",
      section: "career",
      description:
        "Legislative Aides and Government Staff support elected officials and government agencies by managing constituent services, drafting legislation, conducting research, and coordinating policy implementation. This career path combines political science, public administration, and communication skills to navigate government processes, understand legislative procedures, and serve as a bridge between constituents and policymakers. Students learn about American political institutions, legislative processes, public policy analysis, and government operations. The path emphasizes both practical skills in government operations and strong communication abilities, translating complex policy issues into clear, actionable information. Roles include Legislative Aide, Congressional Staffer, Policy Assistant, Constituent Services Representative, and Government Program Coordinator.",
      dynamicImport: () =>
        import("./political-science/careers/legislative-aide-government-staff/components/CareerPathGraph"),
    },
    {
      id: "public-administration-nonprofit-program-coordinator",
      name: "Public Administration / Nonprofit Program Coordinator",
      section: "career",
      description:
        "Public Administration and Nonprofit Program Coordinators manage programs, coordinate services, and oversee operations in government agencies and nonprofit organizations. This career path combines management principles, public policy analysis, and organizational leadership to design, implement, and evaluate programs that serve communities. Students learn about organizational behavior, program management, grant writing, budgeting, and stakeholder engagement. The path emphasizes both strategic planning and operational execution, translating policy goals into effective programs that deliver measurable outcomes. Roles include Program Coordinator, Nonprofit Manager, Public Administrator, Grant Writer, Community Program Manager, and Service Coordinator.",
      aliases: ["public-administration-nonprofit"],
      sidebarId: "public-administration-nonprofit",
      dynamicImport: () =>
        import(
          "./political-science/careers/public-administration-nonprofit-program-coordinator/components/CareerPathGraph"
        ),
    },
    {
      id: "campaign-staff-field-organizer-campaign-management",
      name: "Campaign Staff / Field Organizer / Campaign Management",
      section: "career",
      description:
        "Campaign Staff and Field Organizers help plan and execute election and advocacy campaigns through outreach, communications, operations, and voter engagement. This path emphasizes political communication, campaign strategy, organizing, and practical execution in fast-moving environments.",
      aliases: ["campaign-staff-field-organizer"],
      sidebarId: "campaign-staff-field-organizer",
      dynamicImport: () =>
        import(
          "./political-science/careers/campaign-staff-field-organizer-campaign-management/components/CareerPathGraph"
        ),
    },
    {
      id: "advocacy-lobbying-government-relations",
      name: "Advocacy / Lobbying / Government Relations",
      section: "career",
      description:
        "Advocacy and government relations professionals build coalitions, shape policy agendas, and communicate with public institutions on behalf of organizations and communities. This path focuses on policy analysis, stakeholder communication, persuasion, and strategy.",
      dynamicImport: () =>
        import("./political-science/careers/advocacy-lobbying-government-relations/components/CareerPathGraph"),
    },
    {
      id: "law-pre-law",
      name: "Law / Pre-Law",
      section: "career",
      description:
        "Law / Pre-Law pathways prepare students for legal education and policy-adjacent careers by emphasizing analytical reasoning, writing, constitutional foundations, and public institutions.",
      dynamicImport: () => import("./political-science/careers/law-pre-law/components/CareerPathGraph"),
    },
  ],
  "Mechanical Engineering": [
    { id: "resumes", name: "Resumes", section: "resource" },
    { id: "alumni", name: "Alumni", section: "resource" },
    {
      id: "mechanical-design",
      name: "Mechanical Design Engineer",
      section: "career",
      description:
        "Mechanical Design Engineers create, analyze, and optimize mechanical systems and products. This career path focuses on CAD, FEA, materials selection, and design for manufacturability. Essential for roles in product design, automotive engineering, consumer products, and industrial equipment. Students learn structural analysis, thermal systems, manufacturing processes, and design optimization. The path emphasizes both creative problem-solving and technical rigor, translating design requirements into functional, manufacturable products.",
      dynamicImport: () =>
        import("./mechanical-engineering/careers/mechanical-design/components/CareerPathGraph"),
    },
    {
      id: "aerospace-defense",
      name: "Aerospace / Defense Engineer",
      section: "career",
      description:
        "Aerospace / Defense Engineers design and develop aircraft, spacecraft, missiles, and defense systems. This career path focuses on aerodynamics, propulsion, flight dynamics, structures, and control systems. Essential for roles in aerospace companies, defense contractors, and government agencies. Students learn advanced fluid mechanics, structural analysis, propulsion systems, and flight control. The path emphasizes both fundamental aerospace principles and advanced computational tools, translating complex physics into safe, high-performance flight vehicles and defense systems. Roles include Aerospace Engineer, Flight Systems Engineer, Propulsion Engineer, Structures Engineer, and Defense Systems Engineer.",
      dynamicImport: () =>
        import("./mechanical-engineering/careers/aerospace-defense/components/CareerPathGraph"),
    },
    {
      id: "energy-sustainability",
      name: "Energy Systems / Power / Sustainability Engineer",
      section: "career",
      description:
        "Energy Systems / Power / Sustainability Engineers design and optimize energy conversion, storage, and distribution systems for a sustainable future. This career path focuses on thermodynamics, heat transfer, renewable energy, power electronics, and energy storage. Essential for roles in renewable energy companies, utilities, electric vehicle manufacturers, and sustainable technology firms. Students learn energy conversion principles, thermal system design, electrical machines, battery technologies, and grid integration. The path emphasizes both fundamental energy principles and emerging clean technologies, translating physics and engineering into efficient, sustainable energy solutions. Roles include Energy Engineer, Power Systems Engineer, Sustainability Engineer, Battery Engineer, and Renewable Energy Specialist.",
      dynamicImport: () =>
        import("./mechanical-engineering/careers/energy-sustainability/components/CareerPathGraph"),
    },
    {
      id: "robotics-automation",
      name: "Robotics / Automation / Mechatronics Engineer",
      section: "career",
      description:
        "Robotics / Automation / Mechatronics Engineers design, build, and program intelligent machines and automated systems that integrate mechanical, electrical, and software engineering. This career path focuses on control systems, sensors and actuators, embedded systems, machine dynamics, and system integration. Essential for roles in robotics companies, industrial automation, autonomous vehicles, and advanced manufacturing. Students learn mechatronics design, control theory, microcontroller programming, robot kinematics, and sensor fusion. The path emphasizes both hardware-software integration and real-time systems, translating control algorithms into physical robotic systems and automation equipment. Roles include Robotics Engineer, Automation Engineer, Mechatronics Engineer, Controls Engineer, and Embedded Systems Engineer.",
      dynamicImport: () =>
        import("./mechanical-engineering/careers/robotics-automation/components/CareerPathGraph"),
    },
    {
      id: "manufacturing-industrial",
      name: "Manufacturing / Industrial Engineer",
      section: "career",
      description:
        "Manufacturing / Industrial Engineers optimize production processes, improve quality, and increase efficiency in manufacturing operations. This career path focuses on manufacturing processes, statistical quality control, economic analysis, process optimization, and production systems. Essential for roles in manufacturing companies, supply chain management, operations consulting, and industrial automation. Students learn manufacturing methods, quality assurance techniques, data analysis, cost optimization, and lean/Six Sigma methodologies. The path emphasizes both technical manufacturing knowledge and business acumen, translating engineering principles into efficient, cost-effective production systems. Roles include Manufacturing Engineer, Industrial Engineer, Process Engineer, Quality Engineer, Production Engineer, and Operations Analyst.",
      dynamicImport: () =>
        import("./mechanical-engineering/careers/manufacturing-industrial/components/CareerPathGraph"),
    },
    {
      id: "automotive-ev",
      name: "Automotive / EV / Autonomous Engineer",
      section: "career",
      description:
        "Automotive / EV / Autonomous Engineers design and develop next-generation vehicles including electric vehicles, autonomous systems, and advanced automotive technologies. This career path focuses on vehicle dynamics, electric powertrains, power electronics, control systems, and autonomous driving technologies. Essential for roles at automotive OEMs, EV startups, autonomous vehicle companies, and automotive suppliers. Students learn multi-body dynamics, electric motors and drives, battery systems, aerodynamics, mechatronics, and autonomous vehicle systems. The path emphasizes both mechanical and electrical engineering, translating cutting-edge technology into safe, efficient, and intelligent vehicles. Roles include Automotive Engineer, EV Powertrain Engineer, Autonomous Vehicle Engineer, Battery Systems Engineer, Vehicle Dynamics Engineer, and ADAS Engineer.",
      dynamicImport: () =>
        import("./mechanical-engineering/careers/automotive-ev/components/CareerPathGraph"),
    },
  ],
};

export function getCareerPathsForDegree(degree: string | null): CareerPathConfigEntry[] {
  if (!degree) {
    return [];
  }
  return CAREER_PATH_REGISTRY[degree as DegreeName] || [];
}

export function careerPathMatches(
  entry: CareerPathConfigEntry,
  selectedCareerPath: string | null
): boolean {
  if (!selectedCareerPath) {
    return false;
  }

  if (entry.id === selectedCareerPath) {
    return true;
  }
  if (entry.sidebarId && entry.sidebarId === selectedCareerPath) {
    return true;
  }
  return Boolean(entry.aliases?.includes(selectedCareerPath));
}

export function getCareerPathConfig(
  degree: string | null,
  selectedCareerPath: string | null
): CareerPathConfigEntry | null {
  if (!degree || !selectedCareerPath) {
    return null;
  }

  const entries = CAREER_PATH_REGISTRY[degree as DegreeName] || [];
  return entries.find((entry) => careerPathMatches(entry, selectedCareerPath)) || null;
}

/**
 * Advocacy / Lobbying / Government Relations Tier Courses Data
 * Course recommendations organized by tier for Advocacy / Lobbying / Government Relations career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Advocacy / Lobbying / Government Relations roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "poli-105",
    code: "POLI 105",
    name: "Interest Groups and Political Parties",
    fullName: "POLI 105: Interest Groups and Political Parties",
    description:
      "Explains how interest groups and political parties organize, fundraise, message, and compete to shape elections and policy outcomes—plus the ethical and regulatory debates around lobbying and influence.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Directly maps to advocacy/lobbying work: you’ll learn how policy influence actually happens through coalitions, PACs, party networks, and lobbying strategies. This makes you better at stakeholder targeting, messaging, and choosing the right pressure points (committees, agencies, elections, rulemaking).",
      realWorldApplications: [
        "Build a stakeholder map and lobbying plan for a bill: identify allies/opponents, committee choke points, and message frames that move persuadable legislators.",
        "Evaluate campaign finance + lobbying disclosures to anticipate which groups will activate on an issue and how they’ll try to shape the narrative.",
      ],
      learningOutcomes: [
        "Explain collective action problems and why some interests organize more effectively than others",
        "Differentiate party influence vs. interest-group influence across elections, legislation, and regulation",
        "Assess lobbying tactics (direct, grassroots, coalition, media) and when each is effective",
        "Critically analyze ethics, transparency, and regulatory constraints on political influence",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=bOvBA7oIIgc",
          "https://www.khanacademy.org/humanities/ap-us-government-and-politics/political-participation/groups-influencing-policymaking/v/interest-groups-and-lobbying",
          "https://www.youtube.com/playlist?list=PLoYY4WlfsgpL9SsoprzB7ro24gmUlUQVI",
        ],
        websites: [
          "https://www.opensecrets.org/",
          "https://www.fec.gov/",
          "https://www.congress.gov/",
        ],
        tools: ["Quorum", "FiscalNote", "LegiScan", "VoterVoice"],
      },
    },
  },
  {
    id: "poli-112",
    code: "POLI 112",
    name: "Public Policy: Analysis, Strategy, and Impact",
    fullName: "POLI 112: Public Policy: Analysis, Strategy, and Impact",
    description:
      "Policy analysis bootcamp: how to define problems, compare solutions, forecast impacts, and build implementation strategies—then communicate the results in persuasive policy memos and briefings.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy and government relations lives and dies on policy analysis: you need to turn values into feasible proposals, estimate tradeoffs, and defend recommendations under scrutiny. This course builds the exact memo/briefing skillset used with legislators, agencies, and coalition partners.",
      realWorldApplications: [
        "Write a one-page policy memo comparing 3 policy options with costs, beneficiaries, political feasibility, and implementation risks.",
        "Design an advocacy strategy: problem framing, target decision-makers, coalition plan, and an implementation narrative that survives rulemaking.",
      ],
      learningOutcomes: [
        "Define policy problems with clear metrics, baselines, and affected populations",
        "Compare policy tools (taxes, subsidies, mandates, nudges, procurement, regulation)",
        "Conduct basic cost-benefit / distributional thinking and identify unintended consequences",
        "Communicate recommendations in decision-ready memos, briefs, and talking points",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=1XvfMgHYJ4g",
          "https://www.youtube.com/watch?v=jR5AQ4_qWlo",
          "https://www.youtube.com/watch?v=LtaUyawnx9E",
        ],
        websites: [
          "https://www.cbo.gov/",
          "https://www.gao.gov/",
          "https://www.regulations.gov/",
        ],
        tools: ["Excel/Google Sheets", "R", "Tableau", "Zotero"],
      },
    },
  },
  {
    id: "poli-158",
    code: "POLI 158",
    name: "Politics of Human Rights",
    fullName: "POLI 158: Politics of Human Rights",
    description:
      "Covers how human rights norms, institutions, and enforcement mechanisms shape state behavior—plus how advocates use legal frameworks, evidence, and coalition pressure to drive accountability.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Human-rights framing is a major tool in modern advocacy, corporate/government accountability campaigns, and international coalition work. You’ll learn how rights claims are constructed, contested, and operationalized—useful for strategy, messaging, and policy design.",
      realWorldApplications: [
        "Draft an advocacy brief using a rights framework (e.g., freedom of expression, due process, non-discrimination) tied to a proposed policy change.",
        "Evaluate an international institution’s leverage (treaties, reporting, sanctions, naming-and-shaming) for a real-world campaign strategy.",
      ],
      learningOutcomes: [
        "Explain major human rights institutions, treaties, and enforcement constraints",
        "Analyze why states comply (or don’t) and how domestic politics shapes compliance",
        "Use evidence and framing to build credible advocacy narratives",
        "Identify ethical tradeoffs and strategic risks in rights-based campaigns",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=sAlp7NQV_E4",
          "https://www.youtube.com/watch?v=lCJ1spHQcKY",
          "https://www.youtube.com/watch?v=qvNc2uvkPuQ",
        ],
        websites: [
          "https://www.ohchr.org/",
          "https://www.un.org/en/global-issues/human-rights",
          "https://www.hrw.org/",
        ],
        tools: ["Zotero", "NVivo (or Taguette)", "Google Scholar", "Datawrapper"],
      },
    },
  },
  {
    id: "pubp-110",
    code: "PUBP 110",
    name: "Poverty and Social Policy",
    fullName: "PUBP 110: Poverty and Social Policy",
    description:
      "Examines poverty and inequality through policy design: safety-net programs, labor-market dynamics, and the political tradeoffs behind welfare, housing, and anti-poverty reforms.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "If you’ll lobby or advocate on education, housing, labor, or welfare, you need to understand how poverty is measured, what programs actually do, and which narratives reliably move policy. This course builds policy literacy for coalition work and evidence-based messaging.",
      realWorldApplications: [
        "Analyze an anti-poverty proposal (EITC expansion, cash transfers, housing vouchers) for winners/losers, implementation risk, and political feasibility.",
        "Create a data-backed story for a campaign: define the problem, cite credible metrics, and propose a scalable intervention.",
      ],
      learningOutcomes: [
        "Interpret poverty/inequality metrics and understand measurement controversies",
        "Compare social policy tools (cash, in-kind benefits, tax credits, services)",
        "Assess administrative burden, targeting, take-up, and unintended consequences",
        "Translate evidence into persuasive, decision-ready advocacy materials",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Wy08DzbRDkg",
          "https://www.youtube.com/watch?v=yFPgSr2QHgI",
          "https://retroreport.org/video/welfare-and-the-politics-of-poverty/",
        ],
        websites: [
          "https://www.census.gov/topics/income-poverty/poverty.html",
          "https://aspe.hhs.gov/",
          "https://www.cbpp.org/",
        ],
        tools: ["IPUMS", "PolicyMap", "R/Python (pandas)", "Tableau"],
      },
    },
  },  
  {
    id: "pubp-120",
    code: "PUBP 120",
    name: "Health Care Policy",
    fullName: "PUBP 120: Health Care Policy",
    description:
      "How health systems and insurance work, what drives costs and quality, and how reforms are designed and implemented (coverage, access, pricing, delivery, and equity).",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Health care is one of the biggest policy arenas with constant legislation, regulation, and stakeholder pressure. This course helps you argue policy tradeoffs clearly (cost vs. access vs. quality), anticipate industry responses, and navigate implementation realities.",
      realWorldApplications: [
        "Prepare a lobbying brief on a health reform (drug pricing, Medicaid expansion, marketplace rules) with stakeholder positions and likely amendments.",
        "Assess how a proposed policy change affects providers, insurers, patients, and state budgets—then craft tailored talking points for each audience.",
      ],
      learningOutcomes: [
        "Explain U.S. health system structure (public/private coverage, delivery models)",
        "Identify cost drivers and common reform levers (pricing, coverage rules, payment models)",
        "Evaluate policy impacts on access, quality, equity, and budgets",
        "Understand the regulatory process and implementation pitfalls in health policy",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=VoLP28-OSRU",
          "https://www.youtube.com/playlist?list=PLBfqBziFkXIfmUHxQ0teDRppDa-VctX7c",
          "https://www.youtube.com/watch?v=dj0CQvdvFNE",
        ],
        websites: [
          "https://www.kff.org/",
          "https://www.cms.gov/",
          "https://www.healthcare.gov/",
        ],
        tools: ["KFF Data Tools", "CDC WONDER", "R/Python", "Tableau"],
      },
    },
  },  
  {
    id: "pubp-130",
    code: "PUBP 130",
    name: "Environmental Policy",
    fullName: "PUBP 130: Environmental Policy",
    description:
      "Policy design and implementation for environmental problems (air, water, climate, land use), including regulatory tools, enforcement, and environmental justice tradeoffs.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Environmental policy is heavily shaped by rulemaking, litigation risk, and coalition pressure (industry, NGOs, communities). This course teaches you how to argue policy mechanisms and implementation details—crucial for government relations and advocacy campaigns.",
      realWorldApplications: [
        "Build a comment letter strategy for a proposed regulation: evidence, legal hooks, and anticipated counterarguments.",
        "Design an environmental justice campaign plan that connects local harms to actionable policy levers (permitting, enforcement, funding).",
      ],
      learningOutcomes: [
        "Compare environmental policy instruments (standards, taxes, cap-and-trade, subsidies)",
        "Understand rulemaking, compliance, and enforcement constraints",
        "Analyze environmental justice and distributional impacts of policy choices",
        "Translate science uncertainty into defensible policy recommendations",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fU3aaIuvgOM",
          "https://www.youtube.com/watch?v=ZDRX2dnDAE0",
          "https://www.youtube.com/watch?v=sdk2AGO2XBc",
          "https://www.youtube.com/watch?v=_RgUyropUOA",
        ],
        websites: [
          "https://www.epa.gov/",
          "https://www.ipcc.ch/",
          "https://www.brookings.edu/articles/climate-policy-environmental-justice-and-local-air-pollution/",
        ],
        tools: ["EJScreen", "ArcGIS", "R/Python", "Datawrapper"],
      },
    },
  },
  {
    id: "pubp-140",
    code: "PUBP 140",
    name: "Immigration and Public Policy",
    fullName: "PUBP 140: Immigration and Public Policy",
    description:
      "Origins and impacts of immigration plus the policy tools that govern admission, enforcement, labor markets, integration, and humanitarian protection—along with the politics that drive reform cycles.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Immigration policy is stakeholder-dense (business, labor, civil rights groups, local governments) and often moves through executive action and regulation. This course helps you craft credible arguments, anticipate coalition splits, and understand implementation constraints across agencies.",
      realWorldApplications: [
        "Create a government-relations brief on an immigration proposal with economic impacts, legal constraints, and political coalition pathways.",
        "Analyze a policy change (asylum rules, work authorization, visa quotas) for downstream effects on employers, communities, and state/local services.",
      ],
      learningOutcomes: [
        "Explain major U.S. immigration policy categories and governance institutions",
        "Analyze economic, social, and political impacts of immigration policy choices",
        "Evaluate enforcement vs. integration tradeoffs and administrative capacity",
        "Develop policy messaging that survives fact-checking and polarized debates",
      ],
      resources: {
        videos: [
          "https://www.cfr.org/event/silberstein-lecture-immigration-policy-and-us-economy",
          "https://www.youtube.com/watch?v=Mjcei3Hj7qM",
          "https://www.youtube.com/watch?v=DvJ6XC_Q_Ws",
        ],
        websites: [
          "https://www.migrationpolicy.org/",
          "https://www.uscis.gov/",
          "https://www.pewresearch.org/topic/immigration-migration/",
        ],
        tools: ["Quorum", "FiscalNote", "LegiScan", "Datawrapper"],
      },
    },
  },
  {
    id: "pubp-150",
    code: "PUBP 150",
    name: "Race, Ethnicity and Public Policy",
    fullName: "PUBP 150: Race, Ethnicity and Public Policy",
    description:
      "Examines how public policies are shaped by—and respond to—race, ethnicity, and culture, with a focus on inequality and policy outcomes across groups.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "In advocacy/lobbying/government relations, credibility often comes from being able to show *who* a policy helps or harms and *why*—and to propose fixes that survive political and legal scrutiny. This course trains you to evaluate disparate impact, build equity-centered policy arguments, and communicate them persuasively to legislators, agencies, and coalition partners.",
      realWorldApplications: [
        "Write an advocacy memo evaluating a proposed policy (housing, education, policing, health) for disparate impact and implementation risk, then propose amendments that reduce inequities.",
        "Build a coalition strategy using stakeholder incentives: community groups, agencies, industry, and electeds—plus a messaging frame grounded in equity + feasibility.",
      ],
      learningOutcomes: [
        "Explain how race/ethnicity and policy design interact to produce unequal outcomes",
        "Identify mechanisms of inequality (eligibility rules, enforcement, administrative burden, funding formulas)",
        "Evaluate policy tools for equity impact, feasibility, and unintended consequences",
        "Translate evidence into action: talking points, testimony, comment letters, and campaign strategy",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Jo3y1LmDl6U",
          "https://www.youtube.com/watch?v=1P-EWIvcJ7w",
          "https://www.youtube.com/watch?v=-JEPEMVgogI",
          "https://www.raceforward.org/practice/tools/race-and-public-policy-dialogue-video",
        ],
        websites: [
          "https://www.urban.org/",
          "https://www.brookings.edu/",
          "https://www.census.gov/",
          "https://www.pewresearch.org/",
        ],
        tools: ["Datawrapper", "Tableau", "R / Python (pandas)", "Zotero", "Quorum / FiscalNote"],
      },
    },
  },
  {
    id: "cres-120",
    code: "CRES 120",
    name: "Race, Law and Civil Rights",
    fullName: "CRES 120: Race, Law and Civil Rights",
    description:
      "Explores how race, gender, class, and sexuality interact with law and civil rights across historical and contemporary contexts, including how legal institutions can both reinforce and challenge inequality.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy and government relations constantly touches civil rights law—whether you’re shaping legislation, responding to enforcement, drafting policy language, or advising coalitions on legal risk. This course helps you spot civil-rights implications early, argue them clearly, and design policy that is both principled and legally durable.",
      realWorldApplications: [
        "Draft testimony or a one-pager arguing how a proposed policy could create discrimination risk (intent or disparate impact) and propose legally safer alternatives.",
        "Create a litigation/regulatory-aware advocacy plan: identify relevant statutes/constitutional doctrines, agencies, likely challengers, and message strategy.",
      ],
      learningOutcomes: [
        "Explain core civil rights frameworks and how they developed historically",
        "Analyze how courts, agencies, and legislation interact in civil rights enforcement",
        "Identify discrimination mechanisms in policy design and implementation",
        "Build legally-informed advocacy materials (briefs, talking points, amendments)",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=kbwsF-A2sTg",
          "https://www.youtube.com/watch?v=S64zRnnn4Po",
          "https://www.youtube.com/playlist?list=PL47Z0ywCYIyx77_G1pDDQcaoe2SBJ-S0l",
          "https://www.youtube.com/watch?v=nmpmsKinQ-I",
        ],
        websites: [
          "https://www.oyez.org/",
          "https://www.law.cornell.edu/",
          "https://www.justice.gov/crt",
          "https://www.eeoc.gov/",
        ],
        tools: ["Oyez (case briefs)", "Westlaw/Lexis (if available)", "Zotero", "Quorum / FiscalNote"],
      },
    },
  },
  {
    id: "phil-128",
    code: "PHIL 128",
    name: "Human Rights",
    fullName: "PHIL 128: Human Rights",
    description:
      "Explores foundational philosophical questions about human rights—what they are, what grounds them, and how they function morally and legally—often connecting theory to applied issues like immigration, subsistence, and human rights law.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Rights language is one of the most powerful tools in advocacy—especially when you can defend it rigorously against criticism (“rights inflation,” cultural relativism, enforcement limits). This course helps you build airtight arguments, choose the right moral/legal framing, and communicate persuasively to policymakers, agencies, and public audiences.",
      realWorldApplications: [
        "Write a policy brief that justifies a proposal using competing foundations of rights (dignity, interests, autonomy) and anticipates the strongest counterarguments.",
        "Design a campaign frame that connects a concrete policy demand (e.g., due process, asylum, housing access) to a defensible human-rights rationale and legal pathway.",
      ],
      learningOutcomes: [
        "Distinguish moral vs. legal human rights and explain what each can realistically accomplish",
        "Compare major theories grounding rights (dignity, interests, autonomy, capabilities, etc.)",
        "Evaluate classic critiques (cultural relativism, feasibility, enforcement, prioritization)",
        "Apply rights reasoning to real policy controversies with clear argumentative structure",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=tH2G0NGqqCk",
          "https://www.gresham.ac.uk/watch-now/human-rights-philosophy-and-history",
          "https://www.youtube.com/playlist?list=PL_a1TI5CC9RH2lhGRagdYPVwQUBFpBO7v",
          "https://www.youtube.com/watch?v=XbOow2EVIF4",
        ],
        websites: [
          "https://plato.stanford.edu/",
          "https://www.ohchr.org/",
          "https://treaties.un.org/",
          "https://www.amnesty.org/",
        ],
        tools: ["Zotero", "Google Scholar", "NVivo (or Taguette)", "Datawrapper"],
      },
    },
  },
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses for Advocacy / Lobbying / Government Relations roles
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "poli-160",
    code: "POLI 160",
    name: "US Foreign Policy",
    fullName: "POLI 160: US Foreign Policy",
    description:
      "How U.S. foreign policy is made and contested—across the presidency, Congress, bureaucracy, and public opinion—plus the core tools used to analyze current foreign policy debates.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "If you work in advocacy/lobbying/government relations, foreign policy issues show up constantly (sanctions, trade, security aid, human rights, immigration spillovers). This course helps you understand who actually has leverage (committees, agencies, NSC, State/DoD) and how to build strategies that work in both legislation and executive-branch policy (rulemaking, licensing, enforcement).",
      realWorldApplications: [
        "Build a stakeholder + process map for a foreign policy issue (e.g., sanctions change): which committees matter, which agencies implement, and where the real choke points are (authorizations, appropriations, licenses, enforcement discretion).",
        "Write a gov-relations brief that pairs a policy ask with feasible vehicles (bill language + committee path + executive actions + messaging plan for coalition partners).",
      ],
      learningOutcomes: [
        "Explain the U.S. foreign policy making process (Congress, President, agencies, courts, public opinion)",
        "Use analytical lenses (strategy, interests, institutions, domestic politics) to evaluate policy options",
        "Assess tradeoffs and second-order effects (alliances, deterrence, economics, legality, escalation risk)",
        "Communicate foreign-policy positions in clear, decision-ready memos and talking points",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@CFRorg",
          "https://www.youtube.com/@csis",
          "https://www.youtube.com/@TheOpenUniversity",
          "https://www.youtube.com/watch?v=F8ZqBLcIvw0",
        ],
        websites: [
          "https://crsreports.congress.gov/",
          "https://www.foreignassistance.gov/",
          "https://www.federalregister.gov/",
          "https://ofac.treasury.gov/",
        ],
        tools: [
          "Federal Register (rule tracking)",
          "OFAC Sanctions List Search",
          "Congress.gov",
          "Quorum / FiscalNote (stakeholder + bill tracking)",
        ],
      },
    },
  },
  {
    id: "poli-165",
    code: "POLI 165",
    name: "International Organizations & Regimes",
    fullName: "POLI 165: International Organizations & Regimes",
    description:
      "How international organizations and regimes emerge, what problems they solve (or fail to), and how rules/norms shape state and corporate behavior across issues like trade, security, environment, and human rights.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy and government relations often relies on global rule systems (UN processes, WTO rules, climate regimes, human-rights frameworks). This course helps you choose the right venue for influence—treaty bodies, multilateral institutions, transnational networks—and craft strategies that combine domestic policy pressure with international norms and reporting mechanisms.",
      realWorldApplications: [
        "Create a multi-venue strategy for a campaign (domestic legislation + agency action + international reporting/standards + coalition partners) and justify why each venue matters.",
        "Analyze how a regime changes incentives (e.g., trade rules, climate commitments, sanctions coordination) and produce a stakeholder-facing memo on compliance, enforcement, and reputational risk.",
      ],
      learningOutcomes: [
        "Explain why states create/join international organizations and regimes (coordination, enforcement, legitimacy)",
        "Evaluate institutional design (rules, monitoring, dispute resolution) and how it affects outcomes",
        "Assess power politics vs. cooperation in multilateral settings",
        "Translate global governance constraints into practical advocacy strategy and messaging",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=F8ZqBLcIvw0",
          "https://www.youtube.com/@CFRorg",
          "https://www.youtube.com/@BrookingsInstitution",
          "https://www.youtube.com/@khanacademy",
        ],
        websites: [
          "https://www.un.org/en/",
          "https://www.wto.org/",
          "https://treaties.un.org/",
          "https://www.oecd.org/",
        ],
        tools: [
          "UN Treaty Collection",
          "WTO Dispute Settlement database",
          "UN Data / World Bank Data",
          "Zotero (source management)",
        ],
      },
    },
  },
  {
    id: "ph-106",
    code: "PH 106",
    name: "Health Policy",
    fullName: "PH 106: Health Policy",
    description:
      "Overview of U.S. health policy and policymaking: how coverage, payment, regulation, and delivery systems work—and how reforms are designed, negotiated, and implemented.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Health is a massive lobbying arena (insurers, hospitals, pharma, public health coalitions). This course gives you the vocabulary and structure to argue policy tradeoffs clearly (cost, access, quality, equity), anticipate stakeholder positions, and propose changes that are administratively workable—not just ideologically appealing.",
      realWorldApplications: [
        "Write a lobbying one-pager on a reform (drug pricing, Medicaid rules, insurer regulation): define the problem, stakeholder impacts, and realistic implementation pathway.",
        "Prepare testimony that uses credible evidence (budget impacts, utilization, equity outcomes) and preempts common counterarguments.",
      ],
      learningOutcomes: [
        "Explain how U.S. health policy is made (federal/state roles, agencies, legislation vs. regulation)",
        "Identify cost drivers and common policy levers (payment models, pricing, benefits design, regulation)",
        "Evaluate reforms for distributional impacts, feasibility, and implementation risk",
        "Communicate policy recommendations clearly to technical and non-technical audiences",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@KFF",
          "https://www.youtube.com/@healthcaretriage",
          "https://www.youtube.com/@JohnsHopkinsSPH",
          "https://www.youtube.com/@khanacademy",
        ],
        websites: [
          "https://www.kff.org/",
          "https://www.cms.gov/",
          "https://www.healthcare.gov/",
          "https://www.gao.gov/",
        ],
        tools: [
          "KFF data tools",
          "CDC WONDER",
          "Regulations.gov",
          "Tableau / Datawrapper",
        ],
      },
    },
  },
  {
    id: "ph-107h",
    code: "PH 107H",
    name: "Food Policy & Politics",
    fullName: "PH 107H: Food Policy & Politics",
    description:
      "A systems view of the food system—power, institutions, and policy choices that shape production, distribution, labeling, trade, nutrition, and public health outcomes.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Food policy is deeply political (farm bills, subsidies, labeling rules, school nutrition, SNAP/WIC, corporate influence). For advocacy/government relations, this course helps you connect policy levers to real outcomes and craft campaigns that anticipate industry responses, regulatory constraints, and coalition dynamics (public health, agriculture, labor, environmental groups).",
      realWorldApplications: [
        "Draft a comment letter strategy for a labeling or safety regulation: evidence base, legal hooks, and how to answer predictable opposition arguments.",
        "Build a coalition plan around a food policy proposal (e.g., school meals, SNAP improvements, soda tax, marketing restrictions) with tailored messaging for each stakeholder group.",
      ],
      learningOutcomes: [
        "Map the food system and identify where policy and power shape outcomes",
        "Compare policy tools (subsidies, standards, labeling, procurement, taxes, trade rules) and their tradeoffs",
        "Analyze the politics of nutrition and public health (equity, industry influence, implementation)",
        "Translate systems thinking into practical advocacy tactics and policy proposals",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@JohnsHopkinsSPH",
          "https://www.youtube.com/watch?v=JrHhAN7C4eQ",
          "https://www.youtube.com/@voxdotcom",
          "https://www.youtube.com/@FAOoftheUnitedNations",
        ],
        websites: [
          "https://www.usda.gov/",
          "https://www.fns.usda.gov/",
          "https://www.fda.gov/food",
          "https://www.who.int/health-topics/nutrition",
        ],
        tools: [
          "USDA ERS data",
          "PolicyMap",
          "Datawrapper / Tableau",
          "Zotero",
        ],
      },
    },
  },
  {
    id: "soc-116",
    code: "SOC 116",
    name: "Inequality & Public Policy",
    fullName: "SOC 116: Inequality & Public Policy",
    description:
      "Political and economic sociology approaches to U.S. inequality—especially how institutions, power, and finance shape long-running inequalities across race, gender, and class, and what policy responses can (and can’t) do.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy and government relations often hinges on proving impact: who benefits, who pays, and why outcomes persist even after reforms. This course helps you build sharper, evidence-based arguments about inequality (including the role of finance and institutions), which improves policy design, coalition-building, and messaging that holds up under scrutiny.",
      realWorldApplications: [
        "Produce a policy memo diagnosing an inequality problem (housing, wages, credit, student debt) and propose 2–3 policy options with feasibility + implementation analysis.",
        "Create a data-backed advocacy narrative that connects structural mechanisms (finance, institutions, administrative burden) to lived outcomes—and proposes measurable solutions.",
      ],
      learningOutcomes: [
        "Explain key mechanisms that reproduce inequality across race, gender, and class",
        "Analyze how policy design and institutions shape distributional outcomes",
        "Evaluate policy proposals for intended/unintended effects and administrative feasibility",
        "Use evidence and framing to communicate inequality arguments persuasively",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@crashcourse",
          "https://www.youtube.com/watch?v=3xq-q6a9tCM",
          "https://www.youtube.com/@Stanford",
          "https://www.youtube.com/@PBSSpaceTime",
        ],
        websites: [
          "https://www.urban.org/",
          "https://www.brookings.edu/",
          "https://www.census.gov/topics/income-poverty.html",
          "https://inequality.org/",
        ],
        tools: ["IPUMS", "FRED", "R / Python (pandas)", "Tableau / Datawrapper", "Zotero"],
      },
    },
  },
  {
    id: "soc-110",
    code: "SOC 110",
    name: "Social Movements, Protest and Collective Action",
    fullName: "SOC 110: Social Movements, Protest and Collective Action",
    description:
      "Study how social movements emerge, organize, and influence institutions—covering contentious politics, protest tactics, mobilization, and movement outcomes.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy and government-relations work is basically ‘organized collective action’ aimed at policy change. This course trains you to understand mobilization, coalition-building, narrative/framing, and when insider vs. outsider tactics are most effective—so you can run smarter campaigns, anticipate opposition, and translate public pressure into legislative/regulatory wins.",
      realWorldApplications: [
        "Designing an advocacy campaign strategy: target selection, coalition mapping, escalation ladders, and measuring pressure points",
        "Framing and messaging: crafting issue narratives that move policymakers, media, and stakeholders",
        "Stakeholder & opposition analysis: predicting countermobilization by interest groups and designing response plans",
        "Post-action evaluation: assessing what actually shifted (agenda-setting, votes, rule text, funding, enforcement)"
      ],
      learningOutcomes: [
        "Explain major theories of social movements (resources, political opportunities, framing, networks) and apply them to real cases",
        "Diagnose why movements succeed/fail and what tactics fit different political contexts",
        "Build a practical campaign plan that connects public mobilization to policy targets and institutional leverage points",
        "Evaluate tradeoffs among tactics (lobbying, litigation, protest, media, electoral pressure) using evidence"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=pKMPtLceB5w", // Social Movement Theory: Mapping the Major Theories (Lecture)
          "https://www.youtube.com/watch?v=fvQvclK1uRQ", // Doug McAdam lecture (social movements)
          "https://www.youtube.com/watch?v=a2ZXjPzR8hM", // Sidney Tarrow lecture (contentious politics / movements)
          "https://www.youtube.com/watch?v=fX7TgL-3nJM"  // Manuel Castells: Social Movements in the Internet Age
        ],
        websites: [
          "https://plato.stanford.edu/entries/social-movements/",
          "https://oyc.yale.edu/political-science/plsc-114",
          "https://www.congress.gov/",
          "https://www.regulations.gov/"
        ],
        tools: [
          "Quorum (legislative tracking + stakeholder lists)",
          "FiscalNote (policy tracking + analytics)",
          "LegiScan (state bill tracking)",
          "NationBuilder (advocacy CRM + mobilization)"
        ]
      }
    }
  },
  {
    id: "econ-120",
    code: "ECON 120",
    name: "Economics of the Environment and Public Policy",
    fullName: "ECON 120: Economics of the Environment and Public Policy",
    description:
      "Apply welfare economics to environmental problems and policy—analyzing externalities, policy instruments (taxes, permits, standards), and the economics/law of environmental regulation.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "In advocacy and government relations, the most persuasive policy arguments often come down to tradeoffs: costs, benefits, distributional impacts, and incentives. This course equips you to critique regulations, argue for smarter policy design (carbon pricing, standards, enforcement), and communicate economic evidence credibly to agencies and legislators.",
      realWorldApplications: [
        "Comparing carbon tax vs. cap-and-trade vs. performance standards for emissions reduction",
        "Benefit–cost analysis of proposed rules (who pays, who benefits, what changes behavior)",
        "Designing policy comments: using economic reasoning to propose more cost-effective compliance pathways",
        "Analyzing environmental justice and distributional impacts of environmental policy choices"
      ],
      learningOutcomes: [
        "Use welfare economics to evaluate environmental market failures (externalities, public goods)",
        "Compare policy instruments (taxes, tradable permits, command-and-control, subsidies) for efficiency and equity",
        "Interpret core regulatory analysis concepts (marginal abatement cost, social cost of carbon, leakage, rebound)",
        "Write an evidence-based policy memo/comment that recommends a defensible instrument/design"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=BlAfFgKQ5r8", // Crash Course Economics #22 Environmental Econ
          "https://www.youtube.com/watch?v=UpSskXWJyS0", // RFF Explainer: Carbon Pricing 101
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP62JKM25M14gy0qaHWx3QyjP" // MIT OCW 15.031J (markets + policy)
        ],
        websites: [
          "https://www.rff.org/publications/explainers/carbon-pricing-101/",
          "https://www.epa.gov/environmental-economics",
          "https://www.ipcc.ch/reports/",
          "https://www.worldbank.org/en/programs/pricing-carbon"
        ],
        tools: [
          "EPA EJScreen (environmental justice screening/mapping)",
          "FRED (macro + policy-relevant data)",
          "R / Python (benefit-cost & distribution analysis)",
          "QGIS (policy + EJ mapping)"
        ]
      }
    }
  },
  {
    id: "econ-155",
    code: "ECON 155",
    name: "Political Economics",
    fullName: "ECON 155: Political Economics",
    description:
      "Use economic tools to analyze politics—how preferences and institutions shape outcomes through electoral competition, agency problems, and partisan dynamics.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Lobbying and government relations is about incentives inside political institutions. This course helps you predict how legislators, parties, bureaucracies, and voters respond to information and pressure—so you can choose realistic strategies, craft coalition offers, and anticipate ‘principal–agent’ gaps between public messaging and internal decision-making.",
      realWorldApplications: [
        "Modeling how electoral incentives influence legislative behavior and policy platforms",
        "Understanding agency problems: legislators vs. staff, agencies vs. electeds, regulators vs. regulated",
        "Explaining partisan polarization and bargaining breakdowns in policymaking",
        "Designing persuasion strategies: who to target, what they care about, and what moves them"
      ],
      learningOutcomes: [
        "Analyze political outcomes using preferences, institutions, and incentives",
        "Explain electoral competition and why policies may cater to small organized interests",
        "Apply principal–agent reasoning to bureaucracy, oversight, and regulation",
        "Translate political-econ insights into concrete advocacy strategy and risk assessment"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLEJy2f_EWBqX1yIF-VP1MJsgnYy8OLK7t", // Duke: Intro to Political Economy (full lecture series)
          "https://www.youtube.com/watch?v=4XsR82AUBIc", // Virginia School of Political Economy: Intro to Public Choice (highly viewed)
          "https://www.youtube.com/watch?v=FcLGUHXz78I"  // Public Choice overview (Antony Davies)
        ],
        websites: [
          "https://www.ourworldindata.org/political-regimes",
          "https://www.congress.gov/",
          "https://www.fec.gov/",
          "https://www.brookings.edu/"
        ],
        tools: [
          "Voteview (roll-call + ideology data)",
          "GovTrack (bill tracking)",
          "OpenSecrets (campaign finance + influence data)",
          "Quorum / FiscalNote (GR workflow + monitoring)"
        ]
      }
    }
  },

  {
    id: "econ-158",
    code: "ECON 158",
    name: "Economics of Regulation",
    fullName: "ECON 158: Economics of Regulation",
    description:
      "Economic analysis of how governments regulate markets—why regulation happens, how it changes incentives, and how to evaluate impacts (competition, consumer welfare, compliance, and unintended effects).",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "A huge share of advocacy and government relations happens in the regulatory arena (rulemaking, enforcement, compliance). This course teaches you how to argue effectively about market structure, consumer harm, compliance costs, and regulatory design—skills that directly translate into drafting comments, meeting agencies, and negotiating rule language.",
      realWorldApplications: [
        "Writing a public comment on a proposed rule: identifying market failure, proposing alternatives, estimating impacts",
        "Analyzing natural monopolies and utility regulation (rate-setting, price caps, service quality)",
        "Competition/antitrust-adjacent arguments: entry barriers, market power, and consumer welfare",
        "Evaluating regulation of digital platforms (privacy, interoperability, content moderation externalities)"
      ],
      learningOutcomes: [
        "Explain economic rationales for regulation (market failure, information asymmetry, monopoly power) and critiques (capture, rent-seeking)",
        "Use microeconomic reasoning to predict how firms respond to rules and enforcement",
        "Assess tradeoffs among regulatory designs (standards, disclosure, taxes, permits, performance-based rules)",
        "Communicate regulatory impacts clearly in memos, testimony, and stakeholder meetings"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP62xkEY0YzLJSoquVBjPOl9S", // MIT 14.271 Industrial Organization (deep competition/regulation)
          "https://www.rmpbs.org/shows/crash-course-government-and-politics/episodes/crash-course-government-and-politics-47", // Crash Course: Government Regulation
          "https://www.youtube.com/watch?v=AU2ynUKk5g8" // Mercatus: benefits/costs basics in regulatory analysis
        ],
        websites: [
          "https://www.regulations.gov/",
          "https://www.federalregister.gov/",
          "https://www.oecd.org/regreform/",
          "https://www.ftc.gov/"
        ],
        tools: [
          "Regulations.gov docket tracking",
          "Federal Register alerts/RSS",
          "Policy analytics: FiscalNote / Quorum",
          "Spreadsheet modeling (Excel/Sheets) for impact estimates"
        ]
      }
    }
  },
  {
    id: "ess-141",
    code: "ESS 141",
    name: "Environmental Science and Policy",
    fullName: "ESS 141: Environmental Science and Policy",
    description:
      "Case-study-driven environmental science for policy: how scientific evidence is produced, interpreted, and used in real policy decisions (e.g., water, biodiversity, conservation).",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy and policy work falls apart if the science is shaky or misused. This course helps you read environmental evidence responsibly, translate science into policy options, and communicate uncertainty—especially in high-conflict areas like water allocation, habitat protection, and climate adaptation.",
      realWorldApplications: [
        "Building evidence-based policy briefs on Western water resources and drought planning",
        "Using scientific findings to support/critique biodiversity and conservation policy proposals",
        "Communicating uncertainty and risk in public testimony and stakeholder meetings",
        "Designing policy options that match real ecological constraints (not just political narratives)"
      ],
      learningOutcomes: [
        "Interpret environmental science evidence and distinguish strong vs. weak claims",
        "Connect scientific mechanisms (ecosystems, hydrology, climate) to policy tools and tradeoffs",
        "Evaluate environmental case studies with attention to stakeholders, feasibility, and equity",
        "Produce a policy memo that accurately reflects scientific constraints and uncertainty"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP63Dkl0BJwHaytUoOCnJx30D", // MIT 11.601 Environmental Policy & Planning (scenario-based)
          "https://www.youtube.com/watch?v=XP6rhcQUmOs", // What is the IPCC?
          "https://www.youtube.com/watch?v=Ly86u2KiQqk"  // Kate Marvel (NASA/Cornell) climate seminar
        ],
        websites: [
          "https://www.ipcc.ch/reports/",
          "https://www.usgs.gov/",
          "https://www.epa.gov/",
          "https://www.noaa.gov/climate"
        ],
        tools: [
          "Google Earth Engine (environmental data + visualization)",
          "R / Python (analysis of climate/hydrology/ecology datasets)",
          "QGIS (mapping impacts and vulnerable communities)",
          "EPA EJScreen (EJ screening + reporting)"
        ]
      }
    }
  },
  {
    id: "geog-141",
    code: "GEOG 141",
    name: "Environmental Science and Policy",
    fullName: "GEOG 141: Environmental Science and Policy",
    description:
      "Environmental policy grounded in scientific case studies, with an applied geography lens: linking environmental processes to policy design, place-based impacts, and stakeholder conflict.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Government relations often requires ‘place-based’ arguments: which districts/communities are affected, how impacts differ across regions, and what data supports that story. This course builds the science-policy bridge and strengthens your ability to use maps, indicators, and case evidence in advocacy coalitions and public comments.",
      realWorldApplications: [
        "Place-based environmental impact storytelling for policymakers (district-level framing)",
        "Using environmental justice screening and spatial data to prioritize interventions",
        "Comparing regional policy solutions (water management, land use, habitat protection)",
        "Supporting regulatory comments with geographic evidence (maps, exposure, vulnerability indicators)"
      ],
      learningOutcomes: [
        "Use case studies to connect environmental science to concrete policy tools",
        "Explain how geography and spatial variation shape policy feasibility and equity",
        "Critically evaluate evidence used in environmental disputes and public decision-making",
        "Create a policy-facing map/data appendix that supports an advocacy recommendation"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP63Dkl0BJwHaytUoOCnJx30D", // MIT 11.601 Environmental Policy & Planning
          "https://www.youtube.com/watch?v=5Ugb3jbXgsw", // How to use EJScreen
          "https://www.youtube.com/watch?v=XP6rhcQUmOs"  // What is the IPCC?
        ],
        websites: [
          "https://www.epa.gov/ejscreen",
          "https://www.calepa.ca.gov/",
          "https://www.usgs.gov/the-national-map-data-delivery",
          "https://earthengine.google.com/"
        ],
        tools: [
          "QGIS (free GIS mapping)",
          "ArcGIS Online (web mapping + dashboards)",
          "EPA EJScreen (EJ mapping/screening)",
          "Tableau / Datawrapper (policy-friendly visuals)"
        ]
      }
    }
  },
  {
    id: "engr-141",
    code: "ENGR 141",
    name: "Environmental Science and Policy",
    fullName: "ENGR 141: Environmental Science and Policy",
    description:
      "Connects major environmental issues (e.g., water resources, biodiversity conservation, global warming) to real policy design and decision-making, with emphasis on critical analysis and strong written/oral communication.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For advocacy/lobbying/government relations, environmental wins often come from translating technical evidence into implementable rules: what the standard is, who enforces it, how compliance works, and what equity impacts look like. This course helps you argue credibly in hearings and rulemakings, propose practical policy language, and avoid ‘science errors’ that opponents can exploit.",
      realWorldApplications: [
        "Draft a public comment on an environmental rule (standards, monitoring, enforcement), proposing a more feasible or more protective alternative with clear implementation steps.",
        "Build a stakeholder + leverage map for an environmental campaign: agency docket, legislative vehicles, funding/appropriations angle, coalition partners, and opposition playbook.",
        "Create an environmental justice impact appendix using screening/mapping tools to show which communities bear disproportionate exposure or enforcement gaps.",
        "Write a 1–2 page policy memo comparing instruments (performance standards vs permits vs market mechanisms) for effectiveness, cost, political feasibility, and equity."
      ],
      learningOutcomes: [
        "Translate environmental science evidence into policy options with clear tradeoffs and uncertainty handling",
        "Compare major environmental policy tools (standards, permits, disclosure, incentives, market mechanisms) and when each works best",
        "Analyze implementation reality: monitoring, enforcement capacity, compliance behavior, and administrative burden",
        "Communicate technical issues persuasively to non-technical audiences (testimony, memos, comments, coalition briefs)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP63Dkl0BJwHaytUoOCnJx30D",
          "https://www.youtube.com/watch?v=XP6rhcQUmOs",
          "https://www.youtube.com/watch?v=5Ugb3jbXgsw",
          "https://www.youtube.com/watch?v=UpSskXWJyS0"
        ],
        websites: [
          "https://www.epa.gov/",
          "https://www.ipcc.ch/reports/",
          "https://www.regulations.gov/",
          "https://www.federalregister.gov/",
          "https://www.noaa.gov/climate"
        ],
        tools: [
          "EPA EJScreen",
          "Regulations.gov docket tracking",
          "Federal Register alerts/RSS",
          "QGIS or ArcGIS Online (mapping for policy/EJ)",
          "Datawrapper (policy-ready charts)"
        ]
      }
    }
  },
  {
    id: "eng-130",
    code: "ENG 130",
    name: "Writing to Save the Planet",
    fullName: "ENG 130: Writing to Save the Planet",
    description:
      "Engages students in reading and creating persuasive texts that urge environmental action—training you to write for real audiences (public, policymakers, institutions) with strategy, voice, and evidence.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "In advocacy/government relations, writing is the job: policy one-pagers, testimony, op-eds, coalition letters, grant narratives, and campaigns that move decision-makers. This course strengthens your ability to frame a problem, choose the right audience and genre, use evidence without losing clarity, and craft messages that survive opposition messaging and misinformation.",
      realWorldApplications: [
        "Write a legislative one-pager that combines a compelling narrative frame with a concrete policy ask, implementation details, and rebuttals to the top counterarguments.",
        "Draft hearing testimony (2–3 minutes) with a strong opening, one key data point, one story, and a clear call-to-action tied to a vote or rulemaking deadline.",
        "Create an op-ed that uses a timely news hook, local stakes, and solutions framing to persuade a mainstream audience.",
        "Build a campaign message kit: headline, 3 talking points, 2 stats, 1 story, and tailored versions for different stakeholders (agency staff, legislators, community partners)."
      ],
      learningOutcomes: [
        "Match message to audience and medium (op-ed, memo, testimony, campaign email, social copy) without losing accuracy",
        "Use narrative + evidence together: framing, tone, credibility, and clarity under constraints",
        "Anticipate counter-framing and misinformation and write resilient messaging",
        "Produce polished advocacy deliverables that are usable in real policy/public settings"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=gyh4aiMzTiE",
          "https://www.youtube.com/watch?v=WcjwGn3nGTw",
          "https://www.youtube.com/watch?v=O_BjYDfD8KI",
          "https://www.youtube.com/c/CoveringClimateNow",
          "https://www.youtube.com/watch?v=GOH6HI6fj_c"
        ],
        websites: [
          "https://climatecommunication.yale.edu/news-events/category/videos-events/",
          "https://coveringclimatenow.org/projects/the-covering-climate-now-academy/",
          "https://www.solutionsjournalism.org/program/climate",
          "https://www.theopedproject.org/resources"
        ],
        tools: [
          "Hemingway Editor",
          "Grammarly",
          "Zotero",
          "Google Docs (comment workflows for coalition drafts)",
          "Canva (one-pagers + social toolkits)",
          "Datawrapper (fast, credible visuals)"
        ]
      }
    }
  },
];

/**
 * 🟠 TIER 3: OPTIONAL
 * Additional courses that may be beneficial for Advocacy / Lobbying / Government Relations roles
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "poli-174",
    code: "POLI 174",
    name: "Data Science and Government Affairs",
    fullName: "POLI 174: Data Science and Government Affairs",
    description:
      "Applies data science to real government-relations work: tracking policy, measuring stakeholder impact, and turning messy political data into actionable strategy.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Modern advocacy and government relations is increasingly data-driven: monitoring legislation/regulation, mapping stakeholders, targeting outreach, and proving impact. This course helps you build the analytics toolkit to brief decision-makers and strengthen lobbying/advocacy strategy with evidence.",
      realWorldApplications: [
        "Building a bill-tracking dashboard that flags priority committee hearings, amendments, and deadlines.",
        "Analyzing campaign finance/lobbying disclosure data to understand influence networks and coalition dynamics.",
        "Using public datasets (census, agency enforcement data, public comments) to quantify policy impacts and craft data-backed talking points."
      ],
      learningOutcomes: [
        "Collect, clean, and join political/government datasets (votes, bills, agencies, spending, demographics).",
        "Choose appropriate metrics and visualizations for policy monitoring and stakeholder reporting.",
        "Communicate findings clearly in memos/briefs for non-technical audiences (legislators, chiefs of staff, partners).",
        "Identify limitations, bias, and ethical risks in political data and advocacy analytics."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@Data8Berkeley",
          "https://www.youtube.com/watch?v=I9NbIld0k0s",
          "https://www.youtube.com/watch?v=CmKiJFm9Eqs",
          "https://www.youtube.com/watch?v=jaz_1u8LNW0"
        ],
        websites: [
          "https://www.congress.gov/",
          "https://www.regulations.gov/",
          "https://www.opensecrets.org/",
          "https://www.fec.gov/data/"
        ],
        tools: [
          "Python (pandas) or R (tidyverse)",
          "Jupyter Notebook",
          "Tableau or Power BI",
          "Quorum or FiscalNote (bill tracking)"
        ]
      }
    }
  },
  {
    id: "poli-200",
    code: "POLI 200",
    name: "Research Design in Political Science",
    fullName: "POLI 200: Research Design in Political Science",
    description:
      "Teaches how to design credible political/policy research—moving from a question to a defensible design that can support real advocacy and policy decisions.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "In advocacy and government relations, weak evidence gets ignored. Research design skills let you evaluate studies used in hearings and white papers, design your own program/policy evaluations, and make claims that survive scrutiny from agencies, journalists, and opponents.",
      realWorldApplications: [
        "Designing an evaluation plan for an advocacy campaign (what outcomes to measure, when, and how).",
        "Assessing whether a policy report’s claims are causal or just correlation—and explaining the difference to a client/team.",
        "Planning survey/field experiments or quasi-experimental studies to test messaging or program effects."
      ],
      learningOutcomes: [
        "Formulate research questions and translate them into testable hypotheses.",
        "Distinguish causal inference from correlation and identify threats to validity (confounding, selection, measurement error).",
        "Select appropriate designs (experiments, natural experiments, DiD, RDD, matching, surveys) for political questions.",
        "Write a clear research proposal with data plan, ethics considerations, and limitations."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=tUz2yl2QEbY",
          "https://www.youtube.com/playlist?list=PLyvUJLHD8IsJCB7ALqwjRG1BjL5JxE__H",
          "https://www.youtube.com/playlist?list=PLoazKTcS0RzZ1SUgeOgc6SWt51gfT80N0",
          "https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo"
        ],
        websites: [
          "https://osf.io/",
          "https://www.icpsr.umich.edu/sites/icpsr/sumprog",
          "https://catalogofbias.org/",
          "https://www.rand.org/topics/research-methods.html"
        ],
        tools: [
          "Zotero (literature management)",
          "OSF (reproducible project workflow)",
          "Qualtrics (survey design)",
          "R or Stata (analysis)"
        ]
      }
    }
  },
  {
    id: "poli-210",
    code: "POLI 210",
    name: "Quantitative Analysis of Political Data, I",
    fullName: "POLI 210: Quantitative Analysis of Political Data, I",
    description:
      "Core stats + modeling for political data so you can interpret polls, evaluate policy claims, and produce credible quantitative briefs for advocacy and government relations.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Government-relations teams constantly deal with numbers—polls, program metrics, budget impacts, compliance/enforcement trends. This course trains you to analyze political datasets correctly and avoid common interpretation traps that can derail advocacy messaging.",
      realWorldApplications: [
        "Analyzing polling data to identify persuadable segments and message resonance.",
        "Modeling how a policy change affects different districts/communities using demographic and program data.",
        "Building simple regression models to quantify relationships (e.g., enforcement intensity vs. outcomes) and communicate uncertainty."
      ],
      learningOutcomes: [
        "Use probability and inference ideas (sampling, confidence intervals, hypothesis tests) in political contexts.",
        "Run and interpret regression models and diagnostics for real political datasets.",
        "Create clean, well-documented analysis workflows suitable for stakeholder reporting.",
        "Translate quantitative outputs into plain-language conclusions with appropriate caveats."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo",
          "https://www.youtube.com/@Data8Berkeley",
          "https://www.youtube.com/user/statacorp",
          "https://www.youtube.com/channel/UCgQWgr9Np3SKx54T_0hbo-Q"
        ],
        websites: [
          "https://www.stata.com/links/video-tutorials/",
          "https://data8.org/",
          "https://www.fec.gov/data/",
          "https://www.congress.gov/"
        ],
        tools: [
          "Stata",
          "R (tidyverse) or Python (pandas/statsmodels)",
          "Jupyter Notebook",
          "GitHub (version control for reproducibility)"
        ]
      }
    }
  },
  {
    id: "geog-002",
    code: "GEOG 002",
    name: "Introduction to Geographic Information Systems",
    fullName: "GEOG 002: Introduction to Geographic Information Systems",
    description:
      "Introduces GIS for mapping policy problems (housing, environment, health access, voting, services)—a powerful advocacy tool for targeting, storytelling, and equity analysis.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy often hinges on place: which communities are impacted, where services fail, and which districts decide outcomes. GIS lets you produce credible maps and spatial evidence that strengthens testimony, grant proposals, coalition briefs, and media narratives.",
      realWorldApplications: [
        "Mapping environmental burdens vs. demographics to support environmental justice advocacy.",
        "Creating district-level impact maps for proposed legislation (who benefits, who pays).",
        "Building service-access maps (clinics, transit, food deserts) to support policy change and funding requests."
      ],
      learningOutcomes: [
        "Understand GIS concepts (layers, projections, spatial data types) and common workflows.",
        "Create maps, join datasets spatially, and perform basic spatial queries/analysis.",
        "Critically assess map choices (classification, projection, uncertainty) to avoid misleading visuals.",
        "Export policy-ready visuals (clean legends, annotations, source notes)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLGZUzt4E4O2IJFxX_Bhp98MJEw5ItRtvb",
          "https://www.youtube.com/playlist?list=PLe8j8BhVZR43drZeMns_-k9EZhrX9oPdx",
          "https://www.youtube.com/%40esri_arcgis",
          "https://www.youtube.com/playlist?list=PLAU1Q_RhusBsnmdbUVxNjR2wgw-E5AG8t"
        ],
        websites: [
          "https://www.esri.com/en-us/arcgis/products/arcgis-pro/resources",
          "https://www.census.gov/geographies/mapping-files.html",
          "https://www.openstreetmap.org/",
          "https://data.ca.gov/"
        ],
        tools: [
          "ArcGIS Pro",
          "QGIS (free, open-source)",
          "ArcGIS Online (web mapping)",
          "Google My Maps (quick stakeholder maps)"
        ]
      }
    }
  },
  {
    id: "geog-010",
    code: "GEOG 010",
    name: "Introduction to Spatial Analysis",
    fullName: "GEOG 010: Introduction to Spatial Analysis",
    description:
      "Builds the ‘spatial thinking’ toolkit behind strong policy arguments: patterns, clusters, proximity, and place-based causality—useful for campaign targeting and impact analysis.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Many government-relations decisions are geographic: where to mobilize, which communities to prioritize, and how policy impacts vary across districts. Spatial analysis helps you make stronger, more defensible claims about place-based inequality, exposure, and access.",
      realWorldApplications: [
        "Finding hotspots (clusters) of complaints, violations, or harms to prioritize advocacy targets.",
        "Analyzing proximity (e.g., distance to clinics, transit) to argue for resource allocation or zoning changes.",
        "Comparing districts/regions fairly by accounting for spatial context and patterns."
      ],
      learningOutcomes: [
        "Read and critique maps and spatial claims with a technical lens.",
        "Use core spatial concepts (scale, spatial autocorrelation, proximity, clustering).",
        "Apply basic spatial analytic methods and interpret results for policy audiences.",
        "Connect spatial results to equity and implementation strategy."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=hNOR8MwS4os",
          "https://www.youtube.com/watch?v=q40yCk6yUKM",
          "https://www.youtube.com/watch?v=pEFqVebemq8",
          "https://www.youtube.com/watch?v=pGm7w-LywO0"
        ],
        websites: [
          "https://pro.arcgis.com/en/pro-app/latest/help/analysis/spatial-analysis/what-is-spatial-analysis-.htm",
          "https://www.qgis.org/en/site/forusers/trainingmaterial/index.html",
          "https://www.openstreetmap.org/",
          "https://data.ca.gov/"
        ],
        tools: [
          "ArcGIS Pro (analysis tools)",
          "QGIS (spatial processing)",
          "GeoPandas (Python spatial analysis)",
          "PostGIS (spatial databases)"
        ]
      }
    }
  },
  {
    id: "poli-092",
    code: "POLI 092",
    name: "Internship in Political Science",
    fullName: "POLI 092: Internship in Political Science",
    description:
      "Structured credit for hands-on political experience—turns real policy work into career capital (portfolio, references, issue expertise) for advocacy and government relations.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy-lobbying careers are hiring-network driven and experience-heavy. This internship course is where you build proof of work: legislative tracking, stakeholder outreach, research memos, coalition coordination, and on-the-ground policy execution.",
      realWorldApplications: [
        "Producing committee-hearing briefs and stakeholder one-pagers for an advocacy org or government office.",
        "Managing constituent/stakeholder communications and helping run events or coalition meetings.",
        "Building a portfolio artifact (policy memo, dataset, map, dashboard, campaign evaluation)."
      ],
      learningOutcomes: [
        "Operate professionally in policy environments (deadlines, confidentiality, stakeholder dynamics).",
        "Translate academic frameworks into deliverables (memos, briefs, analyses, talking points).",
        "Reflect on impact and ethics (representation, data integrity, conflicts of interest).",
        "Produce a tangible work product and articulate it in interviews."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=SJ0enL8KoeI",
          "https://www.youtube.com/watch?v=NxwEw5tMZj8",
          "https://www.youtube.com/watch?v=_v3-efn50Po",
          "https://www.youtube.com/watch?v=MJHrtzRCBG4"
        ],
        websites: [
          "https://polisci.ucmerced.edu/undergraduate-students/internships",
          "https://help.usajobs.gov/",
          "https://www.opensecrets.org/",
          "https://www.congress.gov/"
        ],
        tools: [
          "Handshake (campus recruiting platform)",
          "LinkedIn (targeted outreach + tracking)",
          "Notion (portfolio + internship log)",
          "Google Sheets (pipeline tracking)"
        ]
      }
    }
  },
  {
    id: "pubp-092",
    code: "PUBP 092",
    name: "Internship in Public Policy",
    fullName: "PUBP 092: Internship in Public Policy",
    description:
      "Applied public-policy internship with academic structure—ideal for building issue-area credibility (health, environment, immigration, poverty) in advocacy/government relations.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Government relations is fundamentally policy work—understanding implementation, regulation, budgets, and stakeholders. A public policy internship helps you learn how policy actually gets made and executed (and where advocacy can move the needle).",
      realWorldApplications: [
        "Drafting policy memos that compare options, costs, equity impacts, and feasibility.",
        "Supporting rulemaking/public comment processes and summarizing stakeholder positions.",
        "Analyzing program data to recommend operational or legislative changes."
      ],
      learningOutcomes: [
        "Apply policy frameworks (problem definition, options, tradeoffs, political feasibility).",
        "Write and present concise, decision-oriented policy memos.",
        "Work with administrative processes (regulations, agencies, budgets, evaluation).",
        "Connect field experience to policy theory through structured reflection/work products."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=CmKiJFm9Eqs",
          "https://www.youtube.com/watch?v=jaz_1u8LNW0",
          "https://www.youtube.com/watch?v=0vVE62plAxw",
          "https://www.youtube.com/watch?v=_v3-efn50Po"
        ],
        websites: [
          "https://www.regulations.gov/",
          "https://www.cbo.gov/",
          "https://www.gao.gov/",
          "https://data.gov/"
        ],
        tools: [
          "Policy memo template + rubric (Google Docs)",
          "Excel/Sheets (budget + program metrics)",
          "Tableau/Public (policy dashboards)",
          "Zotero (sources + citations)"
        ]
      }
    }
  },
  {
    id: "soc-092",
    code: "SOC 092",
    name: "Internship in Sociology",
    fullName: "SOC 092: Internship in Sociology",
    description:
      "Field experience tied to sociological analysis—great for advocacy roles focused on inequality, community impact, and stakeholder-centered policy change.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Advocacy wins when you can clearly describe lived impacts, power dynamics, and community needs. A sociology internship strengthens your ability to work with communities, interpret social impacts, and produce credible qualitative/quantitative evidence for policy campaigns.",
      realWorldApplications: [
        "Conducting interviews/focus groups and translating findings into campaign messaging and policy demands.",
        "Writing a community impact brief (who is affected, how, and what change is needed).",
        "Partnering with nonprofits/government programs to evaluate service delivery and equity outcomes."
      ],
      learningOutcomes: [
        "Apply sociological theory and concepts to real organizations and community problems.",
        "Practice ethical fieldwork (consent, confidentiality, positionality, harm reduction).",
        "Synthesize evidence into usable advocacy products (briefs, memos, reports).",
        "Communicate impacts clearly to mixed audiences (community + policymakers + funders)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=MJHrtzRCBG4",
          "https://www.youtube.com/watch?v=_v3-efn50Po",
          "https://www.youtube.com/watch?v=SJ0enL8KoeI",
          "https://www.youtube.com/watch?v=NxwEw5tMZj8"
        ],
        websites: [
          "https://www.pewresearch.org/",
          "https://www.opportunityatlas.org/",
          "https://data.cdc.gov/",
          "https://osf.io/"
        ],
        tools: [
          "NVivo or Taguette (qualitative coding)",
          "Google Forms (field data collection)",
          "Excel/Sheets (basic analysis)",
          "Notion (field notes + portfolio)"
        ]
      }
    }
  },
];

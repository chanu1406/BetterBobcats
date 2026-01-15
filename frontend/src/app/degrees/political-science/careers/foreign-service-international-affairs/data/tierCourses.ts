/**
 * Foreign Service / International Affairs Tier Courses Data
 * Course recommendations organized by tier for Foreign Service / International Affairs career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Foreign Service / International Affairs roles
 */
export const tier1Courses: TierCourse[] = [
  {
    "id": "poli-005",
    "code": "POLI 005",
    "name": "Introduction to International Relations",
    "fullName": "POLI 005: Introduction to International Relations",
    "description": "Introduction to the politics of conflict and war, diplomacy, international cooperation, and international institutions.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Core foundation for advocacy/lobbying roles that touch foreign policy, sanctions, security assistance, trade, humanitarian aid, and international institution engagement—helps you translate global events into legislative/regulatory strategy and persuasive stakeholder messaging.",
      "realWorldApplications": [
        "Build a foreign-policy committee strategy memo: map which committees/subcommittees have jurisdiction (e.g., foreign affairs, armed services), identify the next procedural choke points, and draft 2–3 “asks” tailored to likely coalition partners/opponents.",
        "Create a stakeholder & institution map for an advocacy campaign tied to an international issue (e.g., sanctions/humanitarian corridors): identify key agencies, IGOs/NGOs, relevant treaty bodies, and the leverage points for influence (hearings, appropriations report language, executive action)."
      ],
      "learningOutcomes": [
        "Explain how major IR theories and institutions shape state behavior and bargaining—and use that to anticipate where policy change is most plausible (legislative vs. executive vs. multilateral).",
        "Convert international events into actionable advocacy artifacts (1-page brief, talking points, coalition alignment) grounded in credible sources and institutional constraints."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLh9mgdi4rNeyViG2ar68jkgEi4y6doNZy",
          "https://www.youtube.com/playlist?list=PLxhID8zJ1ZlA0_Fbq9_rqm_hYy0yvnThE",
          "https://www.youtube.com/playlist?list=PL4THPMjF2nCJ4mjhu0xgiJFLMcGU3072e"
        ],
        "websites": [
          "https://www.state.gov/",
          "https://www.un.org/en/",
          "https://www.congress.gov/crs-products"
        ],
        "tools": [
          "https://www.quorum.us/",
          "https://fiscalnote.com/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "poli-006",
    "code": "POLI 006",
    "name": "Global Issues",
    "fullName": "POLI 006: Global Issues",
    "description": "Focused study of major contemporary problems in international relations and foreign policy (e.g., terrorism, nuclear proliferation, regional conflicts).",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly supports government relations work on fast-moving global portfolios (national security, counterterrorism, nonproliferation, crisis response, Middle East policy, refugee/humanitarian policy) where you must track narratives, align coalitions, and respond quickly with evidence-backed positions.",
      "realWorldApplications": [
        "Draft a rapid-response advocacy package for a breaking global event: a 1-page issue brief + 90-second talking points + source-backed FAQs for meetings with legislative staff or agency stakeholders.",
        "Design a coalition operating plan for a global issue campaign: shared principles, division of labor, unified messaging, and a calendar tied to hearings, appropriations markups, and major multilateral moments (e.g., UNGA)."
      ],
      "learningOutcomes": [
        "Evaluate competing policy options for a global issue using credible evidence, tradeoffs, and political feasibility—and articulate the strongest counterarguments you’ll face in stakeholder meetings.",
        "Synthesize complex global developments into clear advocacy narratives that are accurate, non-alarmist, and tailored to different audiences (members, staff, agencies, public)."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=SP0LRl4G7Lg",
          "https://www.youtube.com/playlist?list=PL4THPMjF2nCJ4mjhu0xgiJFLMcGU3072e",
          "https://www.youtube.com/playlist?list=PL358C0E2C2BADEECA"
        ],
        "websites": [
          "https://www.un.org/en/",
          "https://www.worldbank.org/en/home",
          "https://www.federalregister.gov/"
        ],
        "tools": [
          "https://fiscalnote.com/",
          "https://www.bgov.com/",
          "https://legiscan.com/"
        ]
      }
    }
  },
  {
    "id": "poli-150",
    "code": "POLI 150",
    "name": "Causes of International Conflict",
    "fullName": "POLI 150: Causes of International Conflict",
    "description": "Investigation of the causes, conduct, and termination of war, and the prospects for prevention.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Helps you advocate credibly on conflict-adjacent policy (defense authorization/appropriations, arms transfers, sanctions, peacebuilding funding, refugee policy) by understanding escalation pathways, deterrence logic, and what prevention policies can realistically achieve.",
      "realWorldApplications": [
        "Write a committee briefing memo recommending conflict-prevention investments (early warning, diplomacy, targeted aid): include a theory-of-change, measurable indicators, and where Congress/administration can realistically intervene.",
        "Prepare testimony-style remarks for a hearing or public comment on a conflict-related policy (e.g., arms sales, sanctions design): anticipate rebuttals and ground claims in conflict data and historical analogs."
      ],
      "learningOutcomes": [
        "Diagnose drivers of escalation (commitment problems, information failures, domestic politics) and translate that diagnosis into concrete policy levers and risks.",
        "Use conflict datasets and structured frameworks to distinguish correlation vs. causation—so advocacy claims remain defensible under cross-examination."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLQuFFWGIjJmMRMsqcUMyFqfDOdP43taua",
          "https://www.youtube.com/watch?v=6YRj6Jgxqzs",
          "https://www.youtube.com/playlist?list=PL4THPMjF2nCJ4mjhu0xgiJFLMcGU3072e"
        ],
        "websites": [
          "https://www.sipri.org/",
          "https://ucdp.uu.se/",
          "https://acleddata.com/"
        ],
        "tools": [
          "https://www.quorum.us/",
          "https://fiscalnote.com/",
          "https://www.tableau.com/"
        ]
      }
    }
  },

  {
    "id": "poli-155",
    "code": "POLI 155",
    "name": "International Political Economy",
    "fullName": "POLI 155: International Political Economy",
    "description": "Study of the connections between politics, policy, and international economics.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "High-impact for advocacy/lobbying on trade, industrial policy, sanctions, supply chains, climate finance, development assistance, and multinational regulation—lets you quantify policy impacts and craft arguments that resonate with both economic and political stakeholders.",
      "realWorldApplications": [
        "Draft a trade/industrial-policy position letter that cites credible tariff/trade/FDI indicators and explains distributional impacts (jobs, prices, regions), plus a clear legislative ask and amendment language.",
        "Build a supply-chain risk map for a policy campaign (critical minerals, semiconductors): identify chokepoints, relevant agencies, and where targeted incentives/regulation would change firm behavior."
      ],
      "learningOutcomes": [
        "Explain how domestic politics and global institutions (trade rules, finance, sanctions) interact—and where advocacy can change outcomes (rules, enforcement, appropriations, exemptions).",
        "Turn economic data into persuasive, audit-ready narratives (what the metric is, why it matters, limits/biases, and what policy lever it supports)."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=tS354agEj54",
          "https://www.youtube.com/watch?v=RU6SprFWH54",
          "https://www.youtube.com/watch?v=fOxjMWblt-A"
        ],
        "websites": [
          "https://data.worldbank.org/",
          "https://data.imf.org/",
          "https://www.wto.org/"
        ],
        "tools": [
          "https://www.rstudio.com/",
          "https://www.tableau.com/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "poli-156",
    "code": "POLI 156",
    "name": "International Security",
    "fullName": "POLI 156: International Security",
    "description": "Introduces the study of security in international relations, emphasizing how and why conflict occurs and how states pursue security.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Direct relevance to government relations work on defense policy, cybersecurity, alliances, deterrence, arms control, counterterrorism, and security assistance—skills you’ll use to brief stakeholders, shape authorization/appropriations language, and evaluate security claims critically.",
      "realWorldApplications": [
        "Prepare an NDAA/appropriations advocacy plan: identify the specific provision/report language you want, the key members/staff, and the best timing (subcommittee markup, full committee, conference).",
        "Draft a security policy comment/brief that separates threat claims from evidence: define the threat model, propose a mitigation, estimate costs/tradeoffs, and identify oversight metrics."
      ],
      "learningOutcomes": [
        "Analyze core security concepts (deterrence, coercion, alliances, escalation) and apply them to real policy debates without overstating what policy can control.",
        "Interrogate security arguments for weak evidence, hidden assumptions, and incentive problems—so your advocacy positions stay credible to technical and legislative audiences."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLQuFFWGIjJmMRMsqcUMyFqfDOdP43taua",
          "https://www.youtube.com/watch?v=6YRj6Jgxqzs",
          "https://www.youtube.com/watch?v=tzdbceXVwF4"
        ],
        "websites": [
          "https://www.congress.gov/",
          "https://www.federalregister.gov/",
          "https://www.defense.gov/"
        ],
        "tools": [
          "https://www.bgov.com/",
          "https://www.quorum.us/",
          "https://www.govinfo.gov/"
        ]
      }
    }
  },
  {
    "id": "poli-158",
    "code": "POLI 158",
    "name": "Politics of Human Rights",
    "fullName": "POLI 158: Politics of Human Rights",
    "description": "Political analysis of how human rights norms are defined, contested, monitored, and enforced across domestic and international institutions.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Essential for advocacy/government relations in civil liberties, humanitarian policy, corporate accountability, migration/asylum, and sanctions (e.g., Magnitsky)—supports coalition work, rulemaking comments, and testimony grounded in human-rights standards and enforcement realities.",
      "realWorldApplications": [
        "Draft a public comment (or legislative one-pager) using rights-based framing: define the right at issue, identify the duty-bearer, propose enforceable language, and include measurable compliance/oversight mechanisms.",
        "Design a coalition campaign around a human-rights objective (labor rights, forced labor import bans, refugee protections): stakeholder mapping, shared messaging, and an escalation plan (letters → meetings → hearings → media)."
      ],
      "learningOutcomes": [
        "Explain how human-rights norms move from principles to enforcement (treaties, domestic courts, sanctions, procurement rules) and where the political bottlenecks actually are.",
        "Build advocacy arguments that are both ethically grounded and strategically effective—anticipating tradeoffs, jurisdiction limits, and the strongest opposing frames."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/channel/UC3L8u5qG07djPUwWo6VQVLA",
          "https://www.youtube.com/watch?v=jqhLnuglIYE",
          "https://www.youtube.com/watch?v=nDgIVseTkuE"
        ],
        "websites": [
          "https://www.ohchr.org/",
          "https://www.congress.gov/",
          "https://www.regulations.gov/"
        ],
        "tools": [
          "https://www.zotero.org/",
          "https://www.quorum.us/",
          "https://legiscan.com/"
        ]
      }
    }
  },
  {
    "id": "poli-160",
    "code": "POLI 160",
    "name": "US Foreign Policy",
    "fullName": "POLI 160: US Foreign Policy",
    "description": "Introduction to U.S. foreign policy, including the political environment and institutional foundations that shape decision-making, plus major foreign policy issues and debates.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly supports advocacy/lobbying work on sanctions, foreign aid, defense authorization/appropriations, export controls, refugee policy, and human rights by teaching how U.S. foreign policy decisions are made, who influences them, and where leverage points exist (committees, agencies, executive authority, and implementation).",
      "realWorldApplications": [
        "Build a lobbying plan for a foreign policy bill: identify relevant committees (e.g., SFRC/HFAC), map stakeholders (diaspora groups, defense/industry, NGOs), and draft targeted talking points for member meetings.",
        "Draft a rapid-response policy memo on a live international crisis: outline policy options (aid, sanctions, security assistance), identify implementing agencies (State/Treasury/DoD), and recommend an advocacy strategy (letters, coalition statements, hearings)."
      ],
      "learningOutcomes": [
        "Trace how U.S. foreign policy moves from agenda-setting to implementation (Congressional authorization/appropriations, executive authorities, interagency process), and use that pathway to choose advocacy tactics with the highest leverage.",
        "Evaluate tradeoffs and constraints (domestic politics, alliances, legal authorities, bureaucratic interests) to craft realistic policy asks that can survive negotiation and oversight."
      ],
      "resources": {
        "videos": [
          "https://iop.harvard.edu/events/united-states-foreign-policy",
          "https://iop.harvard.edu/events/foreign-policy-america",
          "https://www.youtube.com/@CFR/playlists"
        ],
        "websites": [
          "https://www.congress.gov/",
          "https://crsreports.congress.gov/",
          "https://www.state.gov/"
        ],
        "tools": [
          "Quorum (https://www.quorum.us/)",
          "FiscalNote PolicyNote (https://fiscalnote.com/products/policynote)",
          "OFAC Sanctions List Search (https://sanctionssearch.ofac.treas.gov/)"
        ]
      }
    }
  },
  {
    "id": "poli-165",
    "code": "POLI 165",
    "name": "International Organizations & Regimes",
    "fullName": "POLI 165: International Organizations & Regimes",
    "description": "Examines the emergence and impact of international organizations and global governance regimes across issue areas such as peace and security, human rights/humanitarian affairs, and trade/development.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Highly relevant for government relations and advocacy that intersects with UN processes, treaty obligations, trade regimes, humanitarian coordination, and human rights monitoring—useful for NGOs, corporate public affairs, and diaspora advocacy operating across domestic and international venues.",
      "realWorldApplications": [
        "Plan an advocacy push tied to an international forum: convert a UN resolution/treaty provision into concrete domestic policy asks (agency guidance, funding lines, reporting requirements) and a coalition action calendar.",
        "Prepare a “shadow” accountability package: use treaty body reporting cycles and IO documentation to develop briefing materials, meeting requests, and testimony aligned to compliance gaps."
      ],
      "learningOutcomes": [
        "Explain how international organizations and regimes shape state behavior (rules, incentives, monitoring, legitimacy) and translate that into practical advocacy opportunities and constraints.",
        "Assess institutional design and compliance dynamics to choose effective levers (member-state pressure, reporting/metrics, naming-and-shaming, procurement/conditionality, or domestic implementation)."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/17-41-international-relations-theory-fall-2018/pages/lecture-videos/lecture-4-international-organizations/",
          "https://www.youtube.com/@CFR/playlists",
          "https://m.youtube.com/%40theLondonSchoolofEconomics/playlists?shelf_id=8&sort=dd&view=1"
        ],
        "websites": [
          "https://treaties.un.org/",
          "https://documents.un.org/",
          "https://www.wto.org/"
        ],
        "tools": [
          "UN Treaty Collection (https://treaties.un.org/)",
          "UN Treaty Body Database (https://tbinternet.ohchr.org/)",
          "UN Digital Library (https://digitallibrary.un.org/)"
        ]
      }
    }
  },
  {
    "id": "hist-010",
    "code": "HIST 010",
    "name": "Introduction to World History to 1500",
    "fullName": "HIST 010: Introduction to World History to 1500",
    "description": "Introduces major civilizations and global processes in Africa, Asia, Europe, and the Americas from prehistory to 1500 CE.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Builds the historical literacy and cross-cultural context advocacy professionals need to communicate credibly about international development, religion/identity conflicts, heritage policy, migration narratives, and long-run institutional legacies that shape stakeholder positions.",
      "realWorldApplications": [
        "Create historically grounded messaging for testimony or op-eds on modern policy debates (migration, religious conflict, cultural heritage protection), avoiding inaccurate analogies and strengthening credibility with policymakers.",
        "Use comparative historical cases (empire, trade networks, state formation) to anticipate stakeholder sensitivities and craft coalition framing that resonates across diverse communities."
      ],
      "learningOutcomes": [
        "Connect early institutions (trade systems, empires, belief systems, governance structures) to long-run patterns that still influence modern political claims and advocacy narratives.",
        "Use primary sources and material culture evidence to support policy briefs with credible historical context rather than oversimplified talking points."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PL4B8BB5CA89A47DF7",
          "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNjasccl-WajpONGX3zoY4M",
          "https://www.youtube.com/playlist?list=PL3A8E6CE294860A24"
        ],
        "websites": [
          "https://www.loc.gov/collections/world-digital-library/about-this-collection/",
          "https://whc.unesco.org/en/",
          "https://www.britishmuseum.org/collection"
        ],
        "tools": [
          "Zotero (https://www.zotero.org/)",
          "TimelineJS (https://timeline.knightlab.com/)",
          "ArcGIS StoryMaps (https://storymaps.arcgis.com/)"
        ]
      }
    }
  },

  {
    "id": "hist-011",
    "code": "HIST 011",
    "name": "Introduction to World History Since 1500",
    "fullName": "HIST 011: Introduction to World History Since 1500",
    "description": "Introduces global processes and interactions across Africa, Asia, Europe, and the Americas from 1500 CE to the present.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Strengthens the policy storylines used in government relations—colonialism and state-building, industrialization, war and international order, globalization, and human rights—helpful for crafting persuasive briefs, anticipating political narratives, and communicating impact with data and context.",
      "realWorldApplications": [
        "Draft a policy brief that links a contemporary issue (trade, climate migration, conflict, global health) to historical drivers and measurable trends, improving credibility with legislative staff and coalition partners.",
        "Prepare a stakeholder narrative map: identify how historical experiences (colonial legacies, past interventions, diaspora histories) shape present-day positions and coalition dynamics."
      ],
      "learningOutcomes": [
        "Analyze how modern global institutions and norms emerged (state system, capitalism, industrialization, war/peace orders) and apply that understanding to current advocacy strategy and messaging.",
        "Integrate qualitative historical context with quantitative indicators to produce clearer, more defensible policy arguments and visuals."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PL3E4094BDE4A5DBA8",
          "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNjasccl-WajpONGX3zoY4M",
          "https://oyc.yale.edu/history/hist-202"
        ],
        "websites": [
          "https://ourworldindata.org/",
          "https://databank.worldbank.org/source/world-development-indicators",
          "https://www.loc.gov/programs/teachers/getting-started-with-primary-sources/finding/"
        ],
        "tools": [
          "Zotero (https://www.zotero.org/)",
          "Tableau Public (https://public.tableau.com/)",
          "Datawrapper (https://www.datawrapper.de/)"
        ]
      }
    }
  },
  {
    "id": "anth-111",
    "code": "ANTH 111",
    "name": "The Anthropology of Globalization",
    "fullName": "ANTH 111: The Anthropology of Globalization",
    "description": "Anthropological approaches to globalization, emphasizing how transnational flows of people, capital, media, and ideas reshape culture, identity, power, and inequality across local and global contexts.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Core skill-builder for advocacy and government relations in globalized policy spaces (labor standards, supply chains, climate, tech governance, migration): helps you understand how real stakeholders experience policy and markets, improving coalition strategy, messaging, and community-informed policy asks.",
      "realWorldApplications": [
        "Design a stakeholder strategy for a global issue campaign (e.g., supply chain labor, climate adaptation): map influence networks across firms, agencies, NGOs, and affected communities, then tailor messaging by cultural context.",
        "Translate community impact research into policy action: synthesize interviews/field notes into legislative-friendly narratives and measurable recommendations for hearings, meetings, and comment letters."
      ],
      "learningOutcomes": [
        "Use anthropological concepts (culture, power, identity, inequality) to anticipate how policy proposals land on different communities—and adjust advocacy framing to reduce backlash and increase buy-in.",
        "Evaluate globalization claims critically (who benefits, who bears costs, how governance works in practice) to craft sharper, evidence-driven policy positions."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PL1z_PGhPjwcoB-SNqs0n413sS2X1LZ8Gb",
          "https://www.youtube.com/watch?v=ukFe9IpTCYk",
          "https://www.youtube.com/watch?v=8SZMUWP9wpE"
        ],
        "websites": [
          "https://databank.worldbank.org/source/world-development-indicators",
          "https://ourworldindata.org/",
          "https://www.wto.org/"
        ],
        "tools": [
          "Kumu (https://kumu.io/)",
          "Dedoose (https://www.dedoose.com/)",
          "Zotero (https://www.zotero.org/)"
        ]
      }
    }
  },
  {
    "id": "anth-110",
    "code": "ANTH 110",
    "name": "Migration, Diaspora and Transnational Belonging",
    "fullName": "ANTH 110: Migration, Diaspora and Transnational Belonging",
    "description": "Examines migration, diaspora, and transnational belonging, including borders, detention/deportation, refugee and asylum politics, and how identity, community, and power operate across national boundaries.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly applicable to immigration, refugee, human rights, and community advocacy work: builds practical insight into how migration systems operate, how policy impacts communities, and how diaspora networks mobilize—key for stakeholder mapping, coalition-building, and compelling testimony.",
      "realWorldApplications": [
        "Develop testimony and comment letters on immigration or refugee policy: combine lived-experience evidence with credible datasets (displacement, asylum trends, detention impacts) and convert into actionable policy recommendations.",
        "Build a diaspora coalition strategy: map transnational organizations, identify power brokers and narrative divides, and plan outreach + message discipline for meetings with legislators and agencies."
      ],
      "learningOutcomes": [
        "Analyze how border governance tools (detention, deportation, asylum procedures) shape rights, vulnerability, and political mobilization—and use that analysis to craft more realistic advocacy asks.",
        "Apply transnational/diaspora frameworks to design stakeholder maps and outreach plans that reflect real community networks rather than oversimplified demographic categories."
      ],
      "resources": {
        "videos": [
          "https://www.worldbank.org/en/news/video/2023/06/29/world-development-report-2023-migrants-refugees-and-societies",
          "https://www.youtube.com/playlist?list=PLF5jGwHS1ixft9HZ73qR0ibAP4dvuNTT8",
          "https://www.youtube.com/playlist?list=PLJ8vLth3U0SJqzwcomkYtPCJJ1KdNCRdA"
        ],
        "websites": [
          "https://www.unhcr.org/refugee-statistics",
          "https://dtm.iom.int/",
          "https://www.worldbank.org/en/publication/wdr2023"
        ],
        "tools": [
          "Kumu (https://kumu.io/)",
          "IOM Displacement Tracking Matrix (https://dtm.iom.int/)",
          "Tableau Public (https://public.tableau.com/)"
        ]
      }
    }
  },
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses for Foreign Service / International Affairs roles
 */
export const tier2Courses: TierCourse[] = [
  {
    "id": "poli-142",
    "code": "POLI 142",
    "name": "Contemporary Chinese Politics",
    "fullName": "POLI 142: Contemporary Chinese Politics",
    "description": "Introduces major issues in contemporary Chinese politics, focusing on core governance challenges and how institutions, leadership, and society shape policy outcomes.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly relevant for Foreign Service / International Affairs work on China: political reporting, bilateral issue-briefs, public diplomacy messaging, and risk analysis on domestic drivers of Chinese foreign and economic policy.",
      "realWorldApplications": [
        "Draft an embassy-style political section cable assessing a leadership priority (e.g., economic security, tech policy) and forecasting likely policy moves, including implications for U.S. interests and recommended engagement lines.",
        "Build a “China policy signals” monitoring brief that tracks party-state institutions, key speeches/communiqués, and policy campaigns, translating them into actionable talking points for meetings and public diplomacy."
      ],
      "learningOutcomes": [
        "Explain how China’s party-state institutions and political incentives shape policy implementation (and why announced policy can diverge from outcomes).",
        "Produce credible country-analysis products—cables, memos, and briefing notes—that separate evidence from speculation and anticipate second-order effects."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=Vy0sTBRsVAM",
          "https://www.youtube.com/watch?v=VXa7xNlCkSw",
          "https://www.youtube.com/watch?v=CH4O33ipPus"
        ],
        "websites": [
          "https://www.state.gov/countries-areas/china/",
          "https://www.cia.gov/the-world-factbook/countries/china/",
          "https://data.worldbank.org/country/china"
        ],
        "tools": [
          "GDELT",
          "UN Comtrade",
          "LexisNexis"
        ]
      }
    }
  },
  {
    "id": "poli-131",
    "code": "POLI 131",
    "name": "Everyday Politics in Latin America",
    "fullName": "POLI 131: Everyday Politics in Latin America",
    "description": "Explores questions about everyday politics with a focus on Latin American countries.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Highly useful for Foreign Service political/public affairs work in the region: interpreting protests and public opinion, understanding informal power networks, and improving stakeholder engagement and messaging with civil society.",
      "realWorldApplications": [
        "Create a political reporting brief that explains how everyday governance and informal institutions affect a current event (e.g., protests, anti-corruption drives), including likely trajectories and engagement recommendations.",
        "Design a stakeholder map for an embassy outreach plan (civil society, labor, business, faith groups, media) with tailored engagement goals and risk considerations."
      ],
      "learningOutcomes": [
        "Analyze how participation, clientelism, identity, and informal institutions shape political outcomes beyond formal constitutions and elections.",
        "Translate local political dynamics into practical diplomatic products: situation reports, key-messsage memos, and public diplomacy engagement plans."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=13-_yFKzUyg",
          "https://www.youtube.com/watch?v=6IsdgevXZsc",
          "https://www.youtube.com/watch?v=HqIpa2tX1v4"
        ],
        "websites": [
          "https://www.oas.org/",
          "https://www.cepal.org/en",
          "https://www.vanderbilt.edu/lapop/"
        ],
        "tools": [
          "LAPOP (AmericasBarometer) datasets",
          "ArcGIS StoryMaps",
          "Datawrapper"
        ]
      }
    }
  },
  {
    "id": "poli-140",
    "code": "POLI 140",
    "name": "Transitions to Democracy",
    "fullName": "POLI 140: Transitions to Democracy",
    "description": "Examines the formation of democratic institutions and norms, with attention to transitions and consolidation challenges in developing contexts.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Core for Foreign Service democracy/human-rights portfolios: election context memos, governance programming support, political risk analysis, and understanding democratic backsliding dynamics for accurate reporting and policy recommendations.",
      "realWorldApplications": [
        "Write an election-season country memo assessing democratic consolidation risks, likely flashpoints, and recommended diplomatic engagement with electoral bodies, parties, and civil society.",
        "Draft a governance reform brief translating a transition theory insight (institutions, accountability, civilian control) into feasible policy/program options and monitoring indicators."
      ],
      "learningOutcomes": [
        "Evaluate when institutional reforms are likely to stick (and when they become window-dressing) by analyzing incentives, enforcement capacity, and elite bargains.",
        "Use democracy measurement tools responsibly to support diplomatic reporting without overclaiming causality or ignoring local context."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=IY5aGJj8pWk",
          "https://www.youtube.com/watch?v=EwU8oRcsjZQ",
          "https://www.youtube.com/watch?v=3B8WvK3PZXY"
        ],
        "websites": [
          "https://www.v-dem.net/",
          "https://www.idea.int/",
          "https://freedomhouse.org/"
        ],
        "tools": [
          "V-Dem datasets",
          "ElectionGuide",
          "Zotero"
        ]
      }
    }
  },
  {
    "id": "poli-145",
    "code": "POLI 145",
    "name": "Political Violence",
    "fullName": "POLI 145: Political Violence",
    "description": "Investigates the determinants, processes, and effects of political violence, focusing largely on intra-national violence.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly applicable to political reporting, early warning, and crisis support in Foreign Service roles—helps you assess escalation risks, interpret actor incentives, and write credible situation reports during unrest, terrorism, or repression.",
      "realWorldApplications": [
        "Produce a weekly early-warning dashboard that tracks protest/violence patterns, actor behavior, and plausible triggers, with a clear analytic note for country-team decision-making.",
        "Draft a crisis situation report that distinguishes types of political violence (targeted, communal, state repression), identifies likely next moves, and recommends engagement and messaging options."
      ],
      "learningOutcomes": [
        "Differentiate major forms of political violence and connect them to empirically grounded indicators and plausible escalation pathways.",
        "Use conflict data and open-source information to build defensible analytic judgments under uncertainty."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=eqk1XnbNMI0",
          "https://www.youtube.com/watch?v=dGrWE0A_XLI",
          "https://www.youtube.com/watch?v=NOcOvaKP_Is"
        ],
        "websites": [
          "https://acleddata.com/",
          "https://ucdp.uu.se/",
          "https://www.start.umd.edu/gtd/"
        ],
        "tools": [
          "ACLED Explorer",
          "Global Terrorism Database (GTD)",
          "UCDP Conflict Encyclopedia"
        ]
      }
    }
  },
  {
    "id": "poli-157",
    "code": "POLI 157",
    "name": "Civil War, Insurgency, and Other Forms of Sub-State Conflict and Social Unrest",
    "fullName": "POLI 157: Civil War, Insurgency, and Other Forms of Sub-State Conflict and Social Unrest",
    "description": "Introduces the study of civil war, insurgency, and other forms of sub-state conflict and social unrest.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Essential for conflict-post political/economic work: understanding armed group incentives, civilian protection risks, mediation dynamics, and how to brief on conflict trajectories for policy, humanitarian coordination, and security planning.",
      "realWorldApplications": [
        "Write a conflict brief that maps armed actors, grievances, external backers, and plausible settlement pathways, then propose engagement priorities for diplomatic channels and partners.",
        "Build an “incident-to-implication” pipeline: turn weekly conflict event data into a short memo on displacement risk, infrastructure impacts, and near-term security scenarios."
      ],
      "learningOutcomes": [
        "Analyze civil wars and insurgencies using evidence-based frameworks (bargaining problems, organizational dynamics, external intervention) to avoid simplistic narratives.",
        "Convert conflict analysis into practical outputs: actor maps, scenario forecasts, and policy options with clear assumptions."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=w5nKaNypxcI",
          "https://www.youtube.com/watch?v=JQOZSbDZzHY",
          "https://www.youtube.com/watch?v=YGUpenAoN1M"
        ],
        "websites": [
          "https://ucdp.uu.se/",
          "https://acleddata.com/",
          "https://reliefweb.int/"
        ],
        "tools": [
          "UCDP Conflict Encyclopedia",
          "ACLED Explorer",
          "Humanitarian Data Exchange (HDX)"
        ]
      }
    }
  },

  {
    "id": "hist-116",
    "code": "HIST 116",
    "name": "History of Decolonization in the Twentieth Century",
    "fullName": "HIST 116: History of Decolonization in the Twentieth Century",
    "description": "Explores how decolonization shaped twentieth-century political, social, and economic developments and the international order that followed.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Strong foundation for Foreign Service regional expertise: improves historical literacy for diplomacy, helps avoid messaging missteps, and sharpens analysis of sovereignty, borders, state legitimacy, and post-colonial political economy.",
      "realWorldApplications": [
        "Draft a country background memo that links decolonization-era institutions and borders to present-day governance challenges and conflict risks, with implications for diplomatic engagement.",
        "Build a public diplomacy context guide that identifies sensitive historical narratives and recommends language choices and outreach partners for credible engagement."
      ],
      "learningOutcomes": [
        "Explain how decolonization reshaped global institutions, state formation, and political legitimacy—and why those legacies still shape policy constraints.",
        "Use primary-source archives to support diplomatic-historical claims with evidence, timelines, and careful attribution."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=Y7bRx5fEJbU",
          "https://www.youtube.com/watch?v=R0F2v7bWm9A",
          "https://www.youtube.com/watch?v=JS8lMN_Vhfk"
        ],
        "websites": [
          "https://digitalarchive.wilsoncenter.org/",
          "https://www.un.org/en/library",
          "https://history.state.gov/"
        ],
        "tools": [
          "Zotero",
          "Perma.cc",
          "TimelineJS"
        ]
      }
    }
  },
  {
    "id": "hist-130",
    "code": "HIST 130",
    "name": "The Cold War, 1941-1991",
    "fullName": "HIST 130: The Cold War, 1941-1991",
    "description": "Examines the origins, key turning points, and global consequences of U.S.–Soviet rivalry from World War II through the dissolution of the Soviet Union, including ideology, diplomacy, proxy conflicts, nuclear strategy, and decolonization-era alignments.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Foreign Service and international affairs work constantly references Cold War legacies (alliances, deterrence, regional flashpoints, nonproliferation). This course strengthens your ability to write historically grounded cables/briefing memos, anticipate how partners interpret U.S. actions, and explain risk tradeoffs in security and diplomacy.",
      "realWorldApplications": [
        "Draft an embassy-style briefing memo explaining how a current alliance dispute is shaped by Cold War-era commitments, basing claims on declassified documents and reputable archives.",
        "Build a country risk timeline that links domestic political shifts to superpower competition (aid, coups, proxy war dynamics) to support a policy recommendation for a regional desk."
      ],
      "learningOutcomes": [
        "Explain how ideology, nuclear deterrence, alliance politics, and proxy conflicts interacted to shape diplomatic constraints and opportunities across regions.",
        "Use primary sources (declassified archives, official histories) to support concise, evidence-based foreign policy analysis rather than opinion or hindsight narratives."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=DzD3PUtgGAA",
          "https://www.youtube.com/watch?v=ot-0aiY_83A",
          "https://www.youtube.com/watch?v=f5nbT4xQqwI"
        ],
        "websites": [
          "https://history.state.gov/milestones",
          "https://digitalarchive.wilsoncenter.org/",
          "https://nsarchive.gwu.edu/"
        ],
        "tools": [
          "https://www.cia.gov/readingroom/collection/crest-25-year-program-archive",
          "https://www.zotero.org/",
          "https://www.wilsoncenter.org/program/cold-war-international-history-project"
        ]
      }
    }
  },
  {
    "id": "hist-132",
    "code": "HIST 132",
    "name": "Intelligence and National Security, 1945-2000",
    "fullName": "HIST 132: Intelligence and National Security, 1945-2000",
    "description": "Surveys the post-1945 U.S. national security state and intelligence community, including collection and analysis, covert action, major crises, oversight and accountability, and the ethical and political debates surrounding secrecy and security through the end of the 20th century.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Foreign Service officers routinely interface with intelligence-informed policy, country threat reporting, and interagency coordination. This course builds the judgment and vocabulary to translate intelligence into policy options, understand oversight constraints, and communicate clearly about risk, sources, and uncertainty.",
      "realWorldApplications": [
        "Write a one-page interagency-style options memo that distinguishes intelligence judgments from policy recommendations and explicitly states confidence levels and key assumptions.",
        "Prepare a crisis update brief that integrates open-source indicators with historical intelligence lessons (warning failures, bias, deception) to support decision-making under uncertainty."
      ],
      "learningOutcomes": [
        "Describe how intelligence collection, analysis, covert action, and oversight evolved after 1945 and how these functions shape policy choices.",
        "Produce analytically disciplined assessments that separate evidence from inference and communicate uncertainty clearly to decision-makers."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=f_euEvqMtaY",
          "https://www.youtube.com/watch?v=LFj07rmL_8w",
          "https://www.youtube.com/playlist?list=PLG5tE1pXJZC_mRZlGmQ6oQG7XoQ9zvJtH"
        ],
        "websites": [
          "https://www.dni.gov/",
          "https://www.cia.gov/readingroom/",
          "https://nsarchive.gwu.edu/"
        ],
        "tools": [
          "https://www.gdeltproject.org/",
          "https://www.google.com/earth/versions/#earth-pro",
          "https://www.maltego.com/"
        ]
      }
    }
  },
  {
    "id": "cres-121",
    "code": "CRES 121",
    "name": "Critical Refugee Studies",
    "fullName": "CRES 121: Critical Refugee Studies",
    "description": "Charts an interdisciplinary field of critical refugee studies to reconceptualize refugees and displacement by examining power, law, borders, humanitarian governance, representation, and lived experience across historical and contemporary cases.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Refugee protection and forced displacement are core Foreign Service portfolios (PRM, USAID coordination, regional bureaus, UN engagement). This course equips you to analyze asylum and protection debates, design rights-aware humanitarian strategies, and communicate with affected communities and multilateral partners without flattening complex realities.",
      "realWorldApplications": [
        "Draft a UN/embassy-style talking points sheet for a protection-focused meeting (UNHCR/IOM/host government) that anticipates political sensitivities and centers durable solutions and rights obligations.",
        "Create a displacement “situation brief” using credible humanitarian datasets (refugee/IDP flows, needs, access constraints) and propose a coordination plan for donors and implementers."
      ],
      "learningOutcomes": [
        "Evaluate refugee and displacement policy through both legal/humanitarian frameworks and critical analyses of power, race, and representation.",
        "Translate complex displacement dynamics into operationally useful products (briefs, stakeholder maps, and solution pathways) without losing nuance."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=pEtwa3KY0eQ",
          "https://www.youtube.com/watch?v=r6oAdSopurc",
          "https://www.youtube.com/playlist?list=PL9y38Xx4b2d3F3hLxJQ8DMTyTIYp24qnL"
        ],
        "websites": [
          "https://www.unhcr.org/",
          "https://dtm.iom.int/",
          "https://data.humdata.org/"
        ],
        "tools": [
          "https://www.unhcr.org/refugee-statistics/",
          "https://reliefweb.int/",
          "https://dtm.iom.int/"
        ]
      }
    }
  },
  {
    "id": "cres-122",
    "code": "CRES 122",
    "name": "Comparative Immigrations",
    "fullName": "CRES 122: Comparative Immigrations",
    "description": "Examines the history of immigration and citizenship legislation alongside contemporary debates about borders, belonging, labor, security, and rights, using comparative cases and interdisciplinary approaches.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Migration diplomacy is a major international affairs lane (labor mobility, border cooperation, refugee/asylum systems, diaspora engagement, remittances, integration policy). This course strengthens your ability to brief on migration policy tradeoffs, analyze citizenship/legal frameworks, and support negotiations with partner governments and international organizations.",
      "realWorldApplications": [
        "Prepare a bilateral negotiation brief comparing two countries’ immigration/citizenship frameworks and identifying leverage points, red lines, and feasible cooperative initiatives.",
        "Design a diaspora-engagement and public diplomacy plan that aligns with host-country politics, local civil society, and development goals while minimizing reputational risk."
      ],
      "learningOutcomes": [
        "Compare how different states construct citizenship, border governance, and immigrant incorporation—and how those choices shape diplomacy and domestic politics.",
        "Use authoritative migration datasets to test claims, detect policy-relevant trends, and communicate findings clearly to nontechnical stakeholders."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=npGQ28KIV7U",
          "https://www.youtube.com/watch?v=HyEgEenaxbo",
          "https://www.youtube.com/watch?v=npGQ28KIV7U"
        ],
        "websites": [
          "https://www.dhs.gov/immigration-statistics",
          "https://www.un.org/development/desa/pd/content/international-migrant-stock",
          "https://www.migrationpolicy.org/"
        ],
        "tools": [
          "https://trac.syr.edu/immigration/",
          "https://www.arcgis.com/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "ph-005",
    "code": "PH 005",
    "name": "Global and International Public Health",
    "fullName": "PH 005: Global and International Public Health",
    "description": "Overviews the dynamic factors that produce global health challenges, including demographic change, conflict, human rights, migration and travel, food systems, environmental risks, and global governance responses.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Global health is a core Foreign Service portfolio (health security, humanitarian response, multilateral negotiations, development programming). This course prepares you to brief on outbreak risk and health systems constraints, engage with WHO/UN and host ministries, and connect health outcomes to security, migration, and economic stability.",
      "realWorldApplications": [
        "Draft a health-diplomacy briefing for an ambassador or visiting delegation covering national health priorities, donor landscape, and WHO-related negotiation asks (e.g., IHR, AMR, pandemic preparedness).",
        "Build an early-warning dashboard for a region using reliable indicators (outbreak reports, vaccination coverage, excess mortality proxies) and translate it into actionable guidance for travel/security advisories."
      ],
      "learningOutcomes": [
        "Explain how governance, conflict, migration, and economics shape population health outcomes and what interventions are feasible in low-resource settings.",
        "Use credible global health data to support policy recommendations and communicate uncertainty, measurement limits, and ethical considerations."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLtgdsdWLoHgQ49At9lkn54eXfpPFd-sh_",
          "https://www.youtube.com/playlist?list=PLqfMsHln2lTnGnI15Be4IuJvHDzTyZdFM",
          "https://www.youtube.com/watch?v=qREGAmwonAc"
        ],
        "websites": [
          "https://www.who.int/data/gho",
          "https://data.worldbank.org/topic/health",
          "https://www.cdc.gov/globalhealth/"
        ],
        "tools": [
          "https://www.who.int/tools/godata",
          "https://www.cdc.gov/epiinfo/index.html",
          "https://ghdx.healthdata.org/gbd-results-tool"
        ]
      }
    }
  },
];

/**
 * 🟠 TIER 3: OPTIONAL
 * Additional courses that may be beneficial for Foreign Service / International Affairs roles
 */
export const tier3Courses: TierCourse[] = [
  {
    "id": "poli-200",
    "code": "POLI 200",
    "name": "Research Design in Political Science",
    "fullName": "POLI 200: Research Design in Political Science",
    "description": "Introduction to designing political science research with an emphasis on the scientific method and causal inference, focusing on how to design rigorous research projects.",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Core preparation for Foreign Service / international affairs analysis: framing policy questions as testable claims, evaluating evidence quality in country reporting and policy briefs, and designing defensible assessments (e.g., program impact, governance reforms, stabilization efforts).",
      "realWorldApplications": [
        "Design an evaluation plan for a public diplomacy or development program (define theory of change, select comparison strategy, anticipate selection bias, and specify measurable outcomes).",
        "Build a country-brief research plan for an embassy political/economic section (identify key hypotheses, choose appropriate evidence sources, and plan triangulation across documents, interviews, and datasets)."
      ],
      "learningOutcomes": [
        "Translate international affairs questions into researchable designs (concepts → measures → identification strategy) and recognize common threats to causal inference.",
        "Select and justify a design (case study, comparative, quasi-experimental, mixed methods) and communicate limitations transparently for decision-makers."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/14-310x-data-analysis-for-social-scientists-spring-2023/resources/14310x-lecture-14_mp4/",
          "https://www.youtube.com/watch?v=kymYKTizqtA",
          "https://ocw.mit.edu/courses/14-310x-data-analysis-for-social-scientists-spring-2023/resources/14310x-lecture-20_mp4/"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68235",
          "https://www.icpsr.umich.edu/web/pages/sumprog/",
          "https://osf.io/"
        ],
        "tools": [
          "https://www.zotero.org/",
          "https://www.qualtrics.com/",
          "https://dataverse.org/"
        ]
      }
    }
  },
  {
    "id": "poli-210",
    "code": "POLI 210",
    "name": "Quantitative Analysis of Political Data, I",
    "fullName": "POLI 210: Quantitative Analysis of Political Data, I",
    "description": "Introduction to the theory and practice of quantitative data analysis, preparing students for methodology work and basic statistical analysis workflows (including introductory use of statistical software).",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly supports data-driven international affairs work: analyzing country indicators (governance, development, trade), interpreting polling/survey results, building evidence-backed briefings, and spotting weak statistical claims in reporting.",
      "realWorldApplications": [
        "Create a country risk/fragility dashboard using open indicators (e.g., development + conflict) and brief leadership on trends, uncertainty, and plausible drivers.",
        "Analyze survey or administrative data to assess policy outcomes (e.g., program reach, service access, perceptions of legitimacy) and produce a memo with interpretable effect sizes."
      ],
      "learningOutcomes": [
        "Clean, transform, and document political/international datasets; produce reproducible outputs (tables/figures) suitable for briefs and annexes.",
        "Fit and interpret core statistical models (descriptives, correlation, linear regression) and communicate uncertainty and limitations clearly."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/14-310x-data-analysis-for-social-scientists-spring-2023/resources/14310x-lecture-17_mp4/",
          "https://www.youtube.com/watch?v=OCaKQ4wEwCU",
          "https://www.youtube.com/watch?v=HafqFSB9x70"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68236&print=",
          "https://data.worldbank.org/",
          "https://v-dem.net/data/the-v-dem-dataset/"
        ],
        "tools": [
          "https://www.stata.com/",
          "https://posit.co/downloads/",
          "https://acleddata.com/conflict-data"
        ]
      }
    }
  },
  {
    "id": "geog-002",
    "code": "GEOG 002",
    "name": "Introduction to Geographic Information Systems",
    "fullName": "GEOG 002: Introduction to Geographic Information Systems",
    "description": "Introduces GIS concepts and evaluates GIS functions for decision-making needs (including managing and analyzing spatial data for real-world applications).",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Highly applicable to international affairs: mapping conflict/humanitarian needs, visualizing infrastructure and service access, supporting field security planning, and communicating spatial patterns in briefs and sitreps.",
      "realWorldApplications": [
        "Produce an embassy-style map pack: administrative boundaries, key infrastructure, incident hotspots, and access routes with clear symbology and metadata.",
        "Build a humanitarian needs layer stack (population, clinics, roads, incident data) to support prioritization and explain tradeoffs during coordination meetings."
      ],
      "learningOutcomes": [
        "Assemble, clean, and document spatial datasets (projections, joins, geocoding) and produce publication-quality maps for decision contexts.",
        "Choose appropriate GIS workflows (buffering, overlay, suitability, network basics) and articulate assumptions/limitations in operational terms."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=33A2EJZLDT0",
          "https://www.youtube.com/playlist?list=PLpGHT1n4-mAs06w_ZYbA1XgOXFXw0yXqg",
          "https://ocw.mit.edu/courses/11-205-introduction-to-spatial-analysis-fall-2019/video_galleries/instructional-videos/"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69709",
          "https://www.esri.com/en-us/what-is-gis/overview",
          "https://data.humdata.org/"
        ],
        "tools": [
          "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview",
          "https://qgis.org/",
          "https://earth.google.com/web/"
        ]
      }
    }
  },
  {
    "id": "geog-010",
    "code": "GEOG 010",
    "name": "Introduction to Spatial Analysis",
    "fullName": "GEOG 010: Introduction to Spatial Analysis",
    "description": "Introduces spatial thinking and the use of geographic data to organize and discover information, emphasizing spatial patterns, maps, and foundational spatial analysis concepts.",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Supports international affairs analysis where location matters: identifying clusters/hotspots, understanding diffusion and border effects, measuring access/inequality, and avoiding misleading map-based claims in policy debates.",
      "realWorldApplications": [
        "Detect and explain spatial clustering of conflict/protest incidents and produce a short analytic note on how patterns shift over time and across administrative levels.",
        "Model service access (travel time / distance to facilities) for a region and brief implications for humanitarian logistics or stabilization programming."
      ],
      "learningOutcomes": [
        "Apply core spatial concepts (scale, MAUP, spatial autocorrelation) to interpret maps responsibly and avoid common analytic pitfalls.",
        "Run basic spatial analytical workflows (hotspot/cluster exploration, distance/access measures) and communicate findings for non-technical audiences."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/11-205-introduction-to-spatial-analysis-fall-2019/",
          "https://ocw.mit.edu/courses/11-205-introduction-to-spatial-analysis-fall-2019/video_galleries/instructional-videos/",
          "https://www.youtube.com/watch?v=2qwb5C06bVE"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67781",
          "https://www.gdeltproject.org/data.html",
          "https://acleddata.com/conflict-data"
        ],
        "tools": [
          "https://geodacenter.github.io/",
          "https://qgis.org/",
          "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview"
        ]
      }
    }
  },
  {
    "id": "poli-092",
    "code": "POLI 092",
    "name": "Internship in Political Science",
    "fullName": "POLI 092: Internship in Political Science",
    "description": "Provides oversight and structure for a student's internship in a field related to political science (variable units).",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "A direct bridge into international affairs work (government, NGOs, think tanks, international orgs): building professional writing habits, briefing skills, and stakeholder coordination experience relevant to Foreign Service pathways.",
      "realWorldApplications": [
        "Draft real deliverables: short country/issue briefs, meeting readouts, stakeholder maps, and talking points based on supervisor guidance and validated sources.",
        "Support an international affairs workflow (event prep, coalition/partner coordination, background research) and convert experience into an analytic reflection tied to IR concepts."
      ],
      "learningOutcomes": [
        "Produce professional-grade written outputs (briefs, summaries, annotated source packs) under real deadlines and feedback loops.",
        "Connect internship tasks to political science frameworks and demonstrate ethical handling of sensitive information and sources."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=Ti7D5KSu88M",
          "https://www.youtube.com/watch?v=_BwkiMVu3I8",
          "https://www.youtube.com/watch?v=5Ygr8hgzgIc"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68201",
          "https://careers.state.gov/",
          "https://www.usajobs.gov/"
        ],
        "tools": [
          "https://www.usajobs.gov/",
          "https://www.linkedin.com/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "poli-192",
    "code": "POLI 192",
    "name": "Internship in Political Science",
    "fullName": "POLI 192: Internship in Political Science",
    "description": "Provides oversight and structure for a student's internship in a field related to political science (variable units).",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advanced internship channel for international affairs career-building: deeper responsibility (portfolio ownership, independent research products) and stronger alignment with Foreign Service competencies (analysis, communication, initiative).",
      "realWorldApplications": [
        "Own a discrete research product (e.g., comparative memo on policy options, partner landscape scan, or country issue brief with scenarios and risks) suitable for supervisor use.",
        "Build a professional portfolio package: deliverable + annotated sources + reflection on decision tradeoffs and information gaps (what you could/couldn’t conclude)."
      ],
      "learningOutcomes": [
        "Demonstrate independent analytic judgment: prioritize sources, validate claims, and produce actionable recommendations with uncertainty noted.",
        "Strengthen professional communication: concise executive summaries, clear visuals/tables, and audience-tailored framing."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=ZCYcwA_J61k",
          "https://www.youtube.com/watch?v=ZCYcwA_J61k",
          "https://www.youtube.com/watch?v=n_QLwKbmX8o"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68230",
          "https://www.icpsr.umich.edu/web/pages/sumprog/",
          "https://data.humdata.org/"
        ],
        "tools": [
          "https://www.notion.so/",
          "https://www.zotero.org/",
          "https://dataverse.org/"
        ]
      }
    }
  },
  {
    "id": "hist-092",
    "code": "HIST 092",
    "name": "Internship in History",
    "fullName": "HIST 092: Internship in History",
    "description": "Provides oversight and structure for a student's internship in a field related to history (variable units).",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Builds the historical reasoning and archival/source discipline used in international affairs: understanding precedent, institutional memory, and how narratives shape diplomacy and policy choices.",
      "realWorldApplications": [
        "Create a historically grounded country/issue timeline brief (key turning points, actors, and policy legacies) for use in international affairs research or communications.",
        "Conduct archival or document-based research and produce an annotated source dossier that distinguishes primary vs. secondary claims and flags bias/propaganda risks."
      ],
      "learningOutcomes": [
        "Evaluate sources critically (authorship, context, incentives, missing voices) and apply that discipline to modern international reporting.",
        "Synthesize complex historical material into clear, decision-relevant narratives (what happened, why it matters now, what uncertainties remain)."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=Ti7D5KSu88M",
          "https://www.youtube.com/watch?v=5Ygr8hgzgIc",
          "https://www.youtube.com/watch?v=E51GKkSfJwE"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67836&print=",
          "https://history.state.gov/",
          "https://www.loc.gov/"
        ],
        "tools": [
          "https://www.zotero.org/",
          "https://www.perusall.com/",
          "https://www.mendeley.com/"
        ]
      }
    }
  },
  {
    "id": "anth-092",
    "code": "ANTH 092",
    "name": "Internship in Anthropology",
    "fullName": "ANTH 092: Internship in Anthropology",
    "description": "Provides oversight and structure for a student's internship in a field related to anthropology (variable units).",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly strengthens Foreign Service field effectiveness: cultural analysis, stakeholder listening, qualitative evidence discipline, and community-engaged approaches useful for public diplomacy, political reporting, and development coordination.",
      "realWorldApplications": [
        "Conduct structured stakeholder interviews (with ethical protocols) and summarize themes relevant to program design (trust, barriers to access, local power dynamics).",
        "Support a community/NGO project and produce a culturally informed memo on how messaging, incentives, and partnership choices affect uptake and legitimacy."
      ],
      "learningOutcomes": [
        "Apply ethical qualitative methods (informed consent, minimizing harm, confidentiality) and produce usable insights without overgeneralizing.",
        "Translate cultural observations into operational recommendations (how to communicate, who to partner with, what to avoid) for international work."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=Ti7D5KSu88M",
          "https://www.youtube.com/watch?v=_BwkiMVu3I8",
          "https://www.youtube.com/watch?v=5Ygr8hgzgIc"
        ],
        "websites": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67211",
          "https://centre.humdata.org/",
          "https://microdata.unhcr.org/"
        ],
        "tools": [
          "https://www.zotero.org/",
          "https://www.dedoose.com/",
          "https://www.qgis.org/"
        ]
      }
    }
  }
];

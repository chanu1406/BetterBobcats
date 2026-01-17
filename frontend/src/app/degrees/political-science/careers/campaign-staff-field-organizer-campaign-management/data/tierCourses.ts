/**
 * Campaign Staff / Field Organizer / Campaign Management Tier Courses Data
 * Course recommendations organized by tier for Campaign Staff / Field Organizer / Campaign Management career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Campaign Staff / Field Organizer / Campaign Management roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "poli-009",
    code: "POLI 009",
    name: "Community Mobilization and Politics",
    fullName: "POLI 009: Community Mobilization and Politics",
    description: "Builds the practical + strategic foundation for turning community energy into organized political power—exactly what field teams rely on to recruit volunteers, build coalitions, and execute voter-contact programs.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Field organizing lives or dies on mobilization mechanics: recruiting volunteers, building local leadership, and sustaining momentum. This course maps how communities organize power, which directly translates into better canvass plans, stronger volunteer pipelines, and smarter coalition-building on campaigns.",
      realWorldApplications: [
        "Designing a precinct-level canvass plan (turfs, staging locations, shift structure, and volunteer roles).",
        "Building a volunteer ladder (new volunteer → reliable volunteer → team lead → captain) to scale door-knocking.",
        "Running relational organizing programs (volunteers contact friends/family) to boost turnout efficiently.",
        "Coalition outreach: mapping community stakeholders, scheduling endorsements, and coordinating partner canvasses."
      ],
      learningOutcomes: [
        "Distinguish mobilizing vs. organizing (turning attention into durable capacity and leadership).",
        "Create a field growth system: recruitment channels, onboarding, training, and retention loops.",
        "Plan voter-contact operations with measurable goals (contacts/hour, conversion rates, turnout lift).",
        "Identify community power structures and build coalitions without burning trust or wasting effort."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=YyW4hBK1wDg", // Marshall Ganz: Public Narrative
          "https://www.youtube.com/watch?v=GZVQ8p3hm4M", // Jane McAlevey (organizing)
          "https://www.youtube.com/watch?v=0BWoE7vfiPk", // Field Organizing in 10 Minutes
          "https://www.youtube.com/watch?v=JyyKtxS55Y4", // Relational Organizing Explained (NDTC)
          "https://www.youtube.com/watch?v=NB2PjLYl1Cg", // Voter Contact Script Training
          "https://www.youtube.com/watch?v=MmA0FKTLiqw"  // The Political Brain (broader persuasion/psych)
        ],
        websites: [
          "https://www.ndi.org/publications/guide-political-campaigning", // Campaign training guide (NDI)
          "https://electionlab.mit.edu/research/voter-turnout",          // Turnout research (MIT Election Lab)
          "https://ballotpedia.org/Elections"                             // Election context + candidate research
        ],
        tools: [
          "NGP VAN / VoteBuilder (VAN)",
          "MiniVAN (mobile canvassing)",
          "Mobilize (volunteer recruitment + events)",
          "Action Network (forms, email, event signups)",
          "Spoke or ThruText (peer-to-peer texting)"
        ]
      }
    }
  },

  {
    id: "poli-120",
    code: "POLI 120",
    name: "Voting Behavior, Campaigns, and Elections",
    fullName: "POLI 120: Voting Behavior, Campaigns, and Elections",
    description: "Directly teaches the logic behind what campaigns do: how voters decide, why turnout changes, how persuasion works, and what strategies reliably move votes and participation.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign management is applied voter behavior: targeting the right people, choosing tactics that match the electorate, and allocating time/money to maximize votes. This course gives you the evidence-based playbook behind GOTV, persuasion, and message strategy—core skills for field and campaign ops roles.",
      realWorldApplications: [
        "Choosing between persuasion vs. GOTV based on the race environment and voter file indicators.",
        "Building a targeting universe (base turnout, persuasion targets, low-propensity supporters).",
        "Designing a GOTV calendar: early vote chase, weekend-of-action, Election Day deployment.",
        "Evaluating campaign tactics with simple measurement (contact rate, lift, and cost per vote)."
      ],
      learningOutcomes: [
        "Explain major drivers of vote choice (party ID, issues, candidate traits) and turnout (resources, mobilization, context).",
        "Translate theory into targeting: who to contact, with what message, and through which channel.",
        "Assess campaign strategy tradeoffs (field vs. digital, persuasion vs. mobilization, breadth vs. depth).",
        "Use basic evidence standards to avoid ‘vibes’ decision-making in campaign plans."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2A5QlpAyKSQ", // Political Campaigns (CrashCourse)
          "https://www.youtube.com/watch?v=eermkiaFoWc", // How Voters Decide (CrashCourse)
          "https://www.youtube.com/watch?v=0BWoE7vfiPk", // Field Organizing in 10 Minutes
          "https://www.youtube.com/watch?v=NB2PjLYl1Cg", // Voter Contact Script Training
          "https://www.youtube.com/watch?v=JyyKtxS55Y4", // Relational Organizing Explained
          "https://www.youtube.com/watch?v=WJLDgb8m3K0"  // Public Opinion (CrashCourse) — pairs well
        ],
        websites: [
          "https://electionlab.mit.edu/data",                 // Elections data + tools
          "https://ballotpedia.org/Sample_Ballot_Lookup",     // Local ballot intel
          "https://www.fec.gov/data/"                         // Campaign finance data (FEC)
        ],
        tools: [
          "Voter File + Targeting (VAN/VoteBuilder)",
          "Predictive targeting / analytics (e.g., Civis Analytics-style workflows)",
          "CallHub or Scale to Win (dialing)",
          "Spoke/ThruText (P2P texting)",
          "Meta Ads Library (ad intelligence)"
        ]
      }
    }
  },

  {
    id: "poli-125",
    code: "POLI 125",
    name: "Public Opinion",
    fullName: "POLI 125: Public Opinion",
    description: "Campaigns win by understanding what people believe, how strongly they believe it, and what shifts opinions. This course makes you dangerous with polling, message testing, and narrative strategy.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign management constantly interprets polls, tracking, and message tests—often under uncertainty. This course helps you judge whether numbers are trustworthy, how question wording changes results, and how to turn opinion insights into field scripts and ad messaging that actually lands.",
      realWorldApplications: [
        "Reading a poll memo: sample, mode, margin of error, likely voter screen, and weighting red flags.",
        "Turning issue salience into messaging: what to lead with in doors/texts vs. what to avoid.",
        "Running low-budget message tests (A/B scripts, small surveys, rapid feedback from canvassers).",
        "Building a narrative plan that matches what persuadables already care about (not what staffers wish mattered)."
      ],
      learningOutcomes: [
        "Explain how public opinion is measured and why results vary across pollsters and methods.",
        "Spot common polling errors (bad sampling, leading wording, nonresponse, mode effects).",
        "Translate polling into action: message hierarchy, persuasion scripts, and field talk tracks.",
        "Understand how media, elites, identity, and groups shape opinion formation over time."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=WJLDgb8m3K0", // Public Opinion (CrashCourse)
          "https://www.youtube.com/watch?v=NflULVECAFQ", // Shaping Public Opinion (CrashCourse)
          "https://www.youtube.com/playlist?list=PLZ9z-Af5ISavJpPlvdMU4T-etIDOUmldk", // Pew Methods 101 playlist
          "https://www.youtube.com/watch?v=2A5QlpAyKSQ", // Political Campaigns (CrashCourse)
          "https://www.youtube.com/watch?v=eermkiaFoWc", // How Voters Decide (CrashCourse)
          "https://www.youtube.com/watch?v=NB2PjLYl1Cg"  // Script Training (apply opinion insights to doors)
        ],
        websites: [
          "https://aapor.org/standards-and-ethics/best-practices/",         // Best practices for surveys
          "https://news.gallup.com/poll/101872/how-does-gallup-polling-work.aspx", // How polling works
          "https://news.mit.edu/2012/explained-margin-of-error-polls-1031"  // Margin of error explainer
        ],
        tools: [
          "Qualtrics (survey building)",
          "Google Forms + Sheets (quick field feedback loops)",
          "R or Python (basic polling analysis + weighting checks)",
          "Tableau / Looker Studio (dashboards for tracking)",
          "Meta Ads Manager (A/B creative/message testing)"
        ]
      }
    }
  },

  {
    id: "poli-105",
    code: "POLI 105",
    name: "Interest Groups and Political Parties",
    fullName: "POLI 105: Interest Groups and Political Parties",
    description: "Campaigns operate inside a party + interest-group ecosystem. This course teaches how endorsements, funding networks, and coalition incentives really work—critical for field strategy and campaign management.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign managers must navigate parties, unions, advocacy orgs, donors, and local power brokers. Understanding how groups influence elections helps you secure endorsements, build coalition field programs, anticipate opposition, and avoid strategic mistakes with stakeholders.",
      realWorldApplications: [
        "Building an endorsement plan and outreach tracker (who, why they matter, what they want, timeline).",
        "Mapping stakeholder networks: unions, community orgs, donors, and party committees.",
        "Designing coalition canvass days (shared turfs, shared scripts, data-sharing rules).",
        "Researching lobbying/campaign finance context to prep rapid response and debate lines."
      ],
      learningOutcomes: [
        "Explain why interest groups form, how they mobilize, and how they influence parties and policy.",
        "Understand party coalitions, faction incentives, and why party support varies across races.",
        "Identify how money, endorsements, and organizational capacity shape election outcomes.",
        "Build practical stakeholder strategies that align incentives (not just ‘asking for support’)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=bOvBA7oIIgc", // Interest Groups (CrashCourse)
          "https://www.youtube.com/watch?v=VEmOUHxessE", // Political Parties (CrashCourse)
          "https://www.youtube.com/watch?v=2A5QlpAyKSQ", // Political Campaigns (CrashCourse)
          "https://www.youtube.com/watch?v=2VC0BZEE8Fw", // Interest Groups (AP Gov-style overview)
          "https://www.youtube.com/watch?v=eermkiaFoWc", // How Voters Decide
          "https://www.youtube.com/watch?v=WJLDgb8m3K0"  // Public Opinion (tie-in)
        ],
        websites: [
          "https://www.loc.gov/item/lcwaN0000345/", // OpenSecrets background (Library of Congress item)
          "https://www.fec.gov/data/",              // Federal campaign finance data
          "https://ballotpedia.org/Main_Page"       // Party + election reference
        ],
        tools: [
          "OpenFEC API (campaign finance data)",
          "VAN/VoteBuilder (coalition tracking + universes)",
          "NationBuilder (basic CRM for supporters/coalitions)",
          "Cision/Muck Rack (press + stakeholder tracking, if available)",
          "Spreadsheet stakeholder maps (Sheets/Excel) + tagging systems"
        ]
      }
    }
  },
  {
    id: "poli-123",
    code: "POLI 123",
    name: "Political Psychology",
    fullName: "POLI 123: Political Psychology",
    description: "Campaigns are persuasion under cognitive bias. This course teaches how identity, emotion, motivated reasoning, and polarization shape what voters accept—and how to communicate without triggering backlash.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Field organizers and campaign managers need messaging that works on real humans, not ‘rational voters.’ Political psychology explains why facts bounce off, why identity dominates, and how to write scripts and ads that reduce resistance and increase trust—especially with persuadables.",
      realWorldApplications: [
        "Writing persuasion scripts that avoid reactance and identity threat (tone, framing, and questions).",
        "Training canvassers to handle misinformation or ‘hard no’ voters without escalation.",
        "Designing messaging for polarized environments (when to emphasize shared identity vs. policy detail).",
        "Building empathy-based persuasion for coalition work across communities with different moral priorities."
      ],
      learningOutcomes: [
        "Explain motivated reasoning and how it changes what voters accept as ‘true.’",
        "Use identity + moral framing to craft messages that resonate without alienating key groups.",
        "Recognize polarization dynamics and adjust tactics (persuasion vs. turnout vs. base activation).",
        "Improve field communications: listening, question-led persuasion, and de-escalation skills."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=iqoTIjarK5o", // Dan Kahan: Motivated System 2 Reasoning
          "https://www.youtube.com/watch?v=nsxIHLHgCxk", // Drew Westen: The Political Brain (talk)
          "https://www.youtube.com/watch?v=cGzzs72W1LQ", // Affective Polarization (Lelkes)
          "https://www.youtube.com/watch?v=2APK3tlPL_0", // Haidt at Google (Righteous Mind)
          "https://www.youtube.com/watch?v=8SOQduoLgRw", // Haidt TED: Moral roots
          "https://www.youtube.com/watch?v=nz2yn_kiH_A"  // Westen TEDx: dysfunctional democracy
        ],
        websites: [
          "https://www.psychologicalscience.org/observer/this-is-your-brain-on-politics", // Political behavior + emotion
          "https://www.vox.com/science-and-health/2017/2/1/14392290/partisan-bias-dan-kahan-curiosity", // motivated reasoning explainer
          "https://www.cambridge.org/core/journals/judgment-and-decision-making/article/ideology-motivated-reasoning-and-cognitive-reflection/F8A6A74C9022363D672B0FD14DD8B89F" // core research paper
        ],
        tools: [
          "Message testing (Qualtrics / surveys + simple A/B)",
          "Call scripts + objection handling libraries (shared doc systems)",
          "Training rubrics for canvass quality (scorecards, QA checks)",
          "CRM tags for persuasion segments (e.g., ‘soft support’, ‘issue persuadable’)",
          "Ad creative testing (Meta Ads Manager experiments)"
        ]
      }
    }
  },
  {
    id: "poli-127",
    code: "POLI 127",
    name: "Race, Gender, and Politics",
    fullName: "POLI 127: Race, Gender, and Politics",
    description:
      "Examines how race and gender shape political participation, representation, policy outcomes, and campaign strategy—critical for building ethical, effective coalition turnout operations.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For campaign staff/field organizers, this course directly improves how you recruit volunteers, write outreach scripts, and build coalitions without alienating key constituencies. It helps you understand turnout gaps, persuasion limits, and representation dynamics so your field plan (targets, messages, messengers) matches real voter behavior rather than assumptions.",
      realWorldApplications: [
        "Design culturally competent canvassing and phone scripts for multilingual/first-time voters while avoiding stereotype-driven messaging.",
        "Build a coalition plan (community org partnerships, faith leaders, student groups) that aligns with subgroup priorities and trust networks.",
        "Audit a district’s demographic + participation patterns to choose precinct targets, volunteer deployment, and event locations.",
        "Create a rapid-response comms playbook for identity-based attacks/misinformation that protects the candidate and the coalition.",
        "Plan surrogate strategy (who speaks to whom) using credibility, representation, and community tie strength—not just popularity."
      ],
      learningOutcomes: [
        "Explain how race and gender interact (intersectionality) to shape political participation and lived experience in politics.",
        "Identify common mechanisms behind turnout/engagement gaps (mobilization barriers, threat, trust, information environments).",
        "Evaluate campaign tradeoffs in identity-linked messaging: persuasion vs. backlash risk, authenticity vs. pandering signals.",
        "Translate theory into practice: segment audiences, select messengers, and choose field tactics that fit community context."
      ],
      resources: {
        videos: [
          "https://www.ted.com/talks/kimberle_crenshaw_the_urgency_of_intersectionality",
          "https://www.youtube.com/watch?v=hg3umXU_qWc",
          "https://www.youtube.com/watch?v=D9Ihs241zeg",
          "https://www.youtube.com/watch?v=rniEmvPN6ys",
          "https://www.youtube.com/watch?v=DEvQcdLP6m8",
          "https://www.youtube.com/watch?v=DwjOVEUD0-E"
        ],
        websites: [
          "https://ge.ucmerced.edu/intellectual-experience-badges/diversity-and-identity",
          "https://cawp.rutgers.edu/",
          "https://www.pewresearch.org/topic/politics-policy/",
          "https://www.census.gov/topics/public-sector/voting.html",
          "https://www.congress.gov/crs-product/R47520"
        ],
        tools: [
          "VAN / NGP (voter file & canvassing)",
          "BallotReady (voter info + candidate lookup)",
          "Google Trends (issue interest by region)",
          "Meta Ad Library (ad transparency + creative review)",
          "GDELT (media/events monitoring for narratives)",
          "Action Network (email + organizing workflows)"
        ]
      }
    }
  },

  {
    id: "poli-227",
    code: "POLI 227",
    name: "Media and Politics",
    fullName: "POLI 227: Media and Politics",
    description:
      "Analyzes how news and social media shape campaigns, public opinion, and governance—essential for message discipline, rapid response, and fighting misinformation during elections.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign staff live inside the information ecosystem: earned media, paid media, and algorithmic distribution. This course helps you plan comms + field together (message, channel, timing), anticipate bias/agenda-setting effects, and build systems for misinformation monitoring and response.",
      realWorldApplications: [
        "Build a rapid-response workflow: monitor narratives, verify claims, draft responses, and coordinate spokespeople + field talking points.",
        "Plan an integrated persuasion program (digital + TV/radio + canvass scripts) with consistent framing and audience targeting.",
        "Run a misinformation tabletop exercise: deepfake/rumor scenario, escalation rules, and coalition partner coordination.",
        "Audit media coverage for tone, framing, and topic emphasis to identify what’s moving and what’s being ignored.",
        "Design a volunteer “media literacy” micro-training so canvassers can de-escalate false claims at the door."
      ],
      learningOutcomes: [
        "Explain how agenda setting, framing, priming, and selective exposure affect voter beliefs and behavior.",
        "Evaluate how media incentives (attention, novelty, conflict) distort campaign information and amplify extremes.",
        "Design practical comms systems: monitoring, verification, message discipline, and cross-channel consistency.",
        "Assess tradeoffs in platform strategy: reach vs. trust, microtargeting vs. backlash/ethical risk."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Ah9H4-QSBLo",
          "https://www.youtube.com/watch?v=cSKGa_7XJkg",
          "https://www.youtube.com/watch?v=-7ORAKULel4",
          "https://www.youtube.com/watch?v=IqRkZKDD4Xk",
          "https://www.youtube.com/watch?v=RLx79LhW1bQ",
          "https://www.youtube.com/watch?v=0Lo7I_aR1Zw"
        ],
        websites: [
          "https://polisci.ucmerced.edu/grads/graduate-courses",
          "https://www.pewresearch.org/journalism/fact-sheet/social-media-and-news-fact-sheet/",
          "https://adstransparency.google.com/",
          "https://www.facebook.com/ads/library/",
          "https://datascience.stanford.edu/events/seminar/it-fake-understanding-misinformation-politics"
        ],
        tools: [
          "Meta Ad Library (paid ad tracking)",
          "Google Ads Transparency Center (political ad tracking)",
          "CrowdTangle / platform analytics alternatives (trend tracking)",
          "GDELT (global news + narrative monitoring)",
          "InVID / WeVerify (video verification)",
          "Canva (rapid creative production)"
        ]
      }
    }
  },
  {
    id: "soc-110",
    code: "SOC 110",
    name: "Social Movements, Protest and Collective Action",
    fullName: "SOC 110: Social Movements, Protest and Collective Action",
    description:
      "Studies how movements form, recruit, and sustain collective action—directly transferable to field organizing, volunteer growth, and coalition maintenance.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Field organizing is movement-building under constraints: limited time, uneven motivation, and real community networks. This course teaches the mechanics of mobilization (recruitment, tactics, risk, repression, narrative) so you can scale volunteers, run relational organizing, and keep coalitions cohesive through conflict.",
      realWorldApplications: [
        "Design a volunteer ladder (supporter → volunteer → captain) with retention tactics that match real participation incentives.",
        "Plan a coalition turnout event that balances visibility, safety, permissions, and message clarity.",
        "Diagnose organizer problems (burnout, faction fights, low trust) using movement concepts like collective identity and resource mobilization.",
        "Build a distributed organizing model (neighborhood captains) to increase reach without losing message discipline.",
        "Create a de-escalation + safety protocol for canvassing in polarized environments."
      ],
      learningOutcomes: [
        "Compare core theories (resource mobilization, political opportunity, framing, networks) and when each predicts success/failure.",
        "Identify tactics that grow participation vs. tactics that only produce “performative” engagement.",
        "Explain how narratives and collective identity convert sympathy into action (and how they can fracture coalitions).",
        "Translate movement strategy into campaign field strategy: recruitment, training, distributed leadership, and retention."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=YJSehRlU34w",
          "https://www.youtube.com/watch?v=0K7w6nB7QbE",
          "https://www.youtube.com/watch?v=BDqvzFY72mg",
          "https://www.youtube.com/watch?v=TCs_hyI15R8",
          "https://www.youtube.com/watch?v=1j8bB9uYxMc",
          "https://www.youtube.com/watch?v=Vqgq8cC8y7o"
        ],
        websites: [
          "https://acleddata.com/",
          "https://crowdcounting.org/",
          "https://www.nonviolent-conflict.org/",
          "https://ge.ucmerced.edu/",
          "https://www.pewresearch.org/topic/politics-policy/"
        ],
        tools: [
          "Mobilize (volunteer event signups)",
          "CallHub (calling/texting at scale)",
          "Action Network (lists + emails + forms)",
          "Slack/Discord (distributed volunteer ops)",
          "Airtable (field ops tracking)",
          "Google My Maps (turf + event location planning)"
        ]
      }
    }
  },
  {
    id: "soc-115",
    code: "SOC 115",
    name: "Political Sociology",
    fullName: "SOC 115: Political Sociology",
    description:
      "Connects politics to social structure (class, institutions, power, inequality)—useful for targeting, persuasion limits, and building campaigns that fit local realities.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaigns fail when they treat voters as identical individuals instead of people embedded in institutions, jobs, neighborhoods, and identities. Political sociology strengthens your ability to pick credible messages, identify gatekeepers, and understand how inequality and institutions shape turnout, trust, and issue priorities.",
      realWorldApplications: [
        "Map local power: unions, business associations, churches, NGOs, campus orgs—then build an endorsement + outreach plan.",
        "Create a persuasion strategy that matches lived constraints (work schedules, transportation, childcare, language access).",
        "Diagnose why a community distrusts institutions and adjust field tactics (messengers, venues, accountability loops).",
        "Build a coalition agreement that anticipates conflicts (credit-claiming, policy priorities, resource allocation).",
        "Use inequality context to prioritize policies that mobilize your base without triggering credibility problems."
      ],
      learningOutcomes: [
        "Explain how power operates through institutions, networks, and resources—not just elections and laws.",
        "Analyze how inequality shapes participation (who votes, who volunteers, who gets heard).",
        "Identify the role of organizations (parties, unions, civic groups) as mobilization machines and information filters.",
        "Apply sociological thinking to campaign ops: gatekeepers, credibility, and durable coalition building."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=TCs_hyI15R8",
          "https://www.youtube.com/watch?v=JVc5f2Cskbk",
          "https://www.youtube.com/watch?v=BDqvzFY72mg",
          "https://www.youtube.com/watch?v=69VF7mT4nRU",
          "https://www.youtube.com/watch?v=6g9dFR1UnLQ",
          "https://www.youtube.com/watch?v=6g9dFR1UnLQ"
        ],
        websites: [
          "https://ourworldindata.org/democracy",
          "https://www.v-dem.net/",
          "https://www.pewresearch.org/topic/politics-policy/",
          "https://acleddata.com/",
          "https://oyc.yale.edu/sociology"
        ],
        tools: [
          "Census data (community profiling)",
          "QGIS (mapping precinct/context layers)",
          "Airtable (stakeholder + coalition tracking)",
          "Google Sheets (field analytics and planning)",
          "NationBuilder (CRM for supporters)",
          "Slack (organizing + coordination)"
        ]
      }
    }
  },
  {
    id: "cres-101",
    code: "CRES 101",
    name: "Race and the Media",
    fullName: "CRES 101: Race and the Media",
    description:
      "Builds the ability to analyze representation, stereotypes, and narrative power in media—directly useful for campaign communications, opposition response, and community trust.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign messaging is representation politics in practice: who gets depicted as ‘normal,’ ‘deserving,’ or ‘dangerous’ shapes persuasion and turnout. This course helps you spot harmful frames early, craft respectful storytelling, and build comms that increase trust with communities that have been repeatedly misrepresented.",
      realWorldApplications: [
        "Review campaign ads/content for implicit stereotypes and rework creative to avoid backlash while keeping clarity.",
        "Write a community storytelling plan (who speaks, what stories, what visuals) to build trust and turnout.",
        "Design a misinformation-response guide that addresses racialized rumors without amplifying them.",
        "Build a press strategy that reduces ‘gotcha’ framing by providing context, data, and credible community validators.",
        "Train volunteers on ‘frame correction’ at the doors: acknowledge, reframe, and redirect without argument spirals."
      ],
      learningOutcomes: [
        "Identify common representation patterns (stereotypes, tokenism, omission) and their political consequences.",
        "Explain how narratives shape public opinion and policy support through emotion, threat, and ‘common sense.’",
        "Develop ethical media practices: accurate sourcing, verification, and respectful depiction of communities.",
        "Apply media critique to campaign work: ad review, message testing, and coalition-sensitive storytelling."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=84depWskwu0",
          "https://www.youtube.com/watch?v=zQUuHFKP-9s",
          "https://www.youtube.com/watch?v=D9Ihs241zeg",
          "https://www.youtube.com/watch?v=YvY3Ok6YpbU",
          "https://www.youtube.com/watch?v=FWP_N_FoW-I",
          "https://www.youtube.com/watch?v=9oMmZIJijgY"
        ],
        websites: [
          "https://ge.ucmerced.edu/intellectual-experience-badges/societies-and-cultures",
          "https://cres.ucmerced.edu/about/major-and-minor-requirements",
          "https://www.racepowerofanillusion.org/",
          "https://glaad.org/reference/",
          "https://www.pewresearch.org/journalism/"
        ],
        tools: [
          "InVID / WeVerify (video verification)",
          "GDELT (media narrative monitoring)",
          "Media Cloud (media attention analysis)",
          "Meta Ad Library (ad creative auditing)",
          "Canva (ethical rapid creative)",
          "Otter/Descript (captioning + accessible media)"
        ]
      }
    }
  },
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses for Campaign Staff / Field Organizer / Campaign Management roles
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "poli-253",
    code: "POLI 253",
    name: "Voting, Campaigns, and Elections",
    fullName: "POLI 253: Voting, Campaigns, and Elections",
    description:
      "Graduate-level deep dive into vote choice + turnout drivers and the strategies campaigns use to win—ideal for campaign management roles that need evidence-based targeting, persuasion, and GOTV planning.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign managers and senior field staff make decisions under uncertainty—where to spend money, which voters to contact, and which tactics reliably move turnout. This course strengthens your ability to connect voter behavior theory to practical campaign strategy (targeting, message, calendar, and evaluation) so your plan is driven by evidence instead of instinct.",
      realWorldApplications: [
        "Building a persuasion vs. GOTV allocation plan (who gets which contact, when, and why) based on voter behavior drivers.",
        "Designing a turnout “chase” operation: early vote/absentee tracking, re-contact rules, and Election Day deployment.",
        "Creating a field experiment mindset (A/B scripts, randomized turf pilots) to test what actually increases support/turnout.",
        "Turning structural election factors (rules, turnout patterns, partisanship, context) into realistic win-number and turnout goals."
      ],
      learningOutcomes: [
        "Explain major determinants of vote choice and turnout and how campaigns can (and cannot) change them.",
        "Translate theory into targeting: define universes (base, persuasion, low-propensity supporters) with clear logic.",
        "Evaluate campaign tactics using basic causal reasoning (what counts as real evidence vs. noise).",
        "Build a campaign plan that aligns message, field, and timing to the electorate’s actual decision process."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=2A5QlpAyKSQ",
          "https://www.youtube.com/watch?v=eermkiaFoWc",
          "https://www.youtube.com/watch?v=48EZKXweGDo",
          "https://www.youtube.com/watch?v=OCaKQ4wEwCU",
          "https://www.youtube.com/watch?v=tv9-HHb1VQA",
          "https://www.youtube.com/watch?v=C4mAUovRFgs",
          "https://www.youtube.com/watch?v=h-Gd15QrMCg"
        ],
        websites: [
          "https://electionlab.mit.edu/research/voter-turnout",
          "https://electionlab.mit.edu/research/projects/mapping-election-science/videos",
          "https://www.fec.gov/data/",
          "https://ballotpedia.org/Elections",
          "https://www.ngpvan.com/blog/canvassing-with-minivan/"
        ],
        tools: [
          "VAN / VoteBuilder (voter file + universes)",
          "MiniVAN (mobile canvassing + data entry)",
          "Spoke or ThruText (peer-to-peer texting)",
          "CallHub / dialer tools (calling at scale)",
          "Looker Studio / Tableau (daily metrics dashboards)"
        ]
      }
    }
  },
  {
    id: "poli-174",
    code: "POLI 174",
    name: "Data Science and Government Affairs",
    fullName: "POLI 174: Data Science and Government Affairs",
    description:
      "Builds practical data literacy for politics and governance—how to use data to diagnose problems, target resources, communicate results, and make defensible decisions in public-facing environments.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Modern campaigns run on data: voter files, turnout history, contact results, fundraising, digital metrics, and polling. This course helps you become the staffer who can turn messy political data into decisions (who to target, where to deploy field, what to prioritize) and into clear stories (dashboards, memos, briefings) leadership can act on.",
      realWorldApplications: [
        "Building a district/precinct priority list using turnout history, persuasion scores, and contactability signals.",
        "Creating a daily campaign dashboard: contacts made, contact rate, support IDs, volunteer shifts filled, early vote chase.",
        "Segmenting voters for tailored outreach (e.g., issue persuadables vs. low-propensity supporters) while avoiding misleading interpretations.",
        "Turning polling + field data into a short leadership memo: what changed, what it means, what to do next."
      ],
      learningOutcomes: [
        "Develop ‘campaign data common sense’: what political datasets can/can’t prove and where bias creeps in.",
        "Clean, summarize, and visualize political data in ways that support operational decisions.",
        "Communicate findings to nontechnical stakeholders (clear charts, uncertainty, and actionable recommendations).",
        "Use data ethically: avoid overclaiming, respect privacy norms, and reduce harm from misinterpretation."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=OCaKQ4wEwCU",
          "https://www.youtube.com/%40poliscidata/videos",
          "https://www.youtube.com/watch?v=4ZuNTTCpbs8",
          "https://www.youtube.com/watch?v=tv9-HHb1VQA",
          "https://www.youtube.com/watch?v=C4mAUovRFgs",
          "https://www.youtube.com/playlist?list=PLZ9z-Af5ISavJpPlvdMU4T-etIDOUmldk"
        ],
        websites: [
          "https://r4ds.hadley.nz/",
          "https://electionlab.mit.edu/data",
          "https://www.fec.gov/data/",
          "https://adstransparency.google.com/",
          "https://www.facebook.com/ads/library/"
        ],
        tools: [
          "R (tidyverse) or Python (pandas) for analysis",
          "Google Sheets (fast ops analytics)",
          "Looker Studio / Tableau (dashboards)",
          "VAN / VoteBuilder exports + tags (field segmentation)",
          "Qualtrics / Google Forms (quick feedback + micro-surveys)"
        ]
      }
    }
  },
  {
    id: "poli-175",
    code: "POLI 175",
    name: "Advanced Analysis of Political Data",
    fullName: "POLI 175: Advanced Analysis of Political Data",
    description:
      "Advanced quantitative methods for political data—ideal for campaigns that want staff who can analyze polling, field results, targeting models, and program impact with real statistical rigor.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign management increasingly rewards people who can evaluate what’s working: which script improves persuasion, which volunteer program increases turnout, and which districts are shifting. This course arms you with the analysis skills to measure impact, reduce ‘vibes’ decision-making, and build smarter targeting and resource-allocation strategies.",
      realWorldApplications: [
        "Analyzing canvass results to estimate persuasion lift by script version, messenger, or voter segment.",
        "Evaluating GOTV experiments (mail/text/canvass) to choose tactics with the best cost-per-vote impact.",
        "Building simple predictive models for support/turnout using voter file + contact history variables.",
        "Detecting data quality problems (bad IDs, biased contact rates, missingness) that can sabotage targeting."
      ],
      learningOutcomes: [
        "Run and interpret regression-based models responsibly (assumptions, uncertainty, and model fit).",
        "Use causal reasoning basics to evaluate campaign interventions (what counts as evidence).",
        "Create reproducible analysis workflows that campaigns can re-run weekly as new data comes in.",
        "Turn analysis into decisions: clear recommendations tied to operational levers (field time, money, message)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=OCaKQ4wEwCU",
          "https://www.youtube.com/%40poliscidata/videos",
          "https://www.youtube.com/watch?v=_8t_xaM7nQQ",
          "https://www.youtube.com/watch?v=s56IUuSNPYM",
          "https://www.youtube.com/watch?v=T5AoqxQFkzY",
          "https://www.youtube.com/watch?v=38GXnMGp_-I"
        ],
        websites: [
          "https://www.poliscidata.com/pages/rDemosResources.php?chapter=12",
          "https://r4ds.hadley.nz/",
          "https://electionlab.mit.edu/research/voter-turnout",
          "https://www.fec.gov/data/",
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68703"
        ],
        tools: [
          "R (tidyverse, broom, ggplot2) or Python (pandas, statsmodels)",
          "Stata (common in poli methods workflows)",
          "Jupyter / RMarkdown (reproducible reporting)",
          "Tableau / Looker Studio (stakeholder dashboards)",
          "Version control (Git) for analysis + memos"
        ]
      }
    }
  },
  {
    id: "soc-035",
    code: "SOC 035",
    name: "Introduction to Political Sociology",
    fullName: "SOC 035: Introduction to Political Sociology",
    description:
      "Explains politics as a social system shaped by institutions, inequality, organizations, and community networks—highly useful for field strategy, coalition building, and turnout work.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Field organizing succeeds when you understand the community’s actual social structure: which institutions people trust, which organizations mobilize them, and what barriers keep them from showing up. This course helps you build smarter coalition and outreach plans by seeing how power and participation work through real-world networks (workplaces, churches, campuses, civic groups).",
      realWorldApplications: [
        "Mapping local institutions and gatekeepers to plan endorsements, coalition canvasses, and community events.",
        "Designing turnout programs that account for structural barriers (work hours, transportation, language access, distrust).",
        "Building volunteer recruitment pipelines through social networks rather than relying only on paid ads.",
        "Creating a stakeholder plan that anticipates conflict and aligns incentives across coalition partners."
      ],
      learningOutcomes: [
        "Explain how institutions and inequality shape who participates and whose interests get represented.",
        "Identify how organizations (parties, unions, civic groups) act as mobilization machines.",
        "Analyze political behavior through networks and social context, not just individual preferences.",
        "Apply sociological insight to campaign ops: coalition design, trust-building, and sustainable organizing."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=YyW4hBK1wDg",
          "https://www.youtube.com/watch?v=GZVQ8p3hm4M",
          "https://www.youtube.com/watch?v=VEmOUHxessE",
          "https://www.youtube.com/watch?v=bOvBA7oIIgc",
          "https://www.youtube.com/watch?v=2A5QlpAyKSQ",
          "https://www.youtube.com/watch?v=tv9-HHb1VQA"
        ],
        websites: [
          "https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses",
          "https://electionlab.mit.edu/research/voter-turnout",
          "https://www.census.gov/topics/public-sector/voting.html",
          "https://ballotpedia.org/Main_Page",
          "https://www.ngpvan.com/blog/canvassing-with-minivan/"
        ],
        tools: [
          "Stakeholder mapping in Sheets/Excel + tagging",
          "Mobilize (events + volunteer recruitment)",
          "Action Network (lists, forms, email)",
          "MiniVAN / canvass apps (field execution)",
          "Google My Maps (turf + community institution mapping)"
        ]
      }
    }
  },
  {
    id: "soc-038",
    code: "SOC 038",
    name: "Sociology of Race and Racism",
    fullName: "SOC 038: Sociology of Race and Racism",
    description:
      "Builds a structural understanding of race and racism (systems, institutions, and intersecting oppressions) so campaigns can organize ethically, avoid harmful frames, and build trust across diverse communities.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaigns operate in communities with real histories of exclusion and distrust. This course helps campaign staff avoid credibility-killing mistakes (bad messaging, poor outreach, tokenism), design equitable turnout operations, and respond to racialized misinformation or attacks without escalating harm—key skills for field organizers managing coalition politics.",
      realWorldApplications: [
        "Designing outreach that reduces distrust: choosing community-trusted messengers, locations, and language access strategies.",
        "Training canvassers on de-escalation and respectful persuasion when race-related issues or stereotypes surface at the door.",
        "Building a coalition strategy that prevents ‘extractive’ relationships (only showing up near Election Day).",
        "Auditing campaign content and earned-media framing for racialized stereotypes or dog-whistle dynamics."
      ],
      learningOutcomes: [
        "Explain racism as structural and institutional (not just individual prejudice) and how it shapes political life.",
        "Identify how racial categorization, nativism, and intersecting oppressions affect participation and trust.",
        "Develop practical, ethical campaign practices: outreach, representation, and harm-reduction in messaging.",
        "Translate theory into field decisions: targeting, messengers, and coalition maintenance across communities."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=T9ChSyjxjUI",
          "https://www.youtube.com/watch?v=ca242jyoRX4",
          "https://www.youtube.com/watch?v=eS5Rvr501Rg",
          "https://www.youtube.com/watch?v=akOe5-UsQ2o",
          "https://www.youtube.com/watch?v=8352T1x-pdo"
        ],
        websites: [
          "https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses",
          "https://www.pewresearch.org/topic/race-ethnicity/",
          "https://www.census.gov/topics/public-sector/voting.html",
          "https://electionlab.mit.edu/research/voter-turnout"
        ],
        tools: [
          "Language access workflow (translated scripts + QA)",
          "Field script libraries + objection handling guides",
          "Community partner CRM tags (coalition tracking)",
          "Media monitoring (GDELT) for narrative shifts",
          "Ad transparency tools (Meta Ad Library / Google Ads Transparency Center)"
        ]
      }
    }
  },
  {
    id: "cres-183",
    code: "CRES 183",
    name: "Intersectionality",
    fullName: "CRES 183: Intersectionality",
    description:
      "Teaches intersectionality as a concept, method, and practice—directly applicable to coalition strategy, voter segmentation, and building campaign programs that don’t collapse diverse communities into one-size-fits-all messaging.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign field programs often fail when they treat communities as monoliths. Intersectionality helps you identify who is being missed by your outreach (e.g., young women of color, immigrant workers, LGBTQ+ communities of faith) and redesign messaging, messengers, and tactics so coalition turnout is real and sustainable—not symbolic.",
      realWorldApplications: [
        "Building a coalition plan that accounts for overlapping identities and different barriers to participation (time, safety, language, stigma).",
        "Creating outreach scripts that respect lived experience and avoid ‘one issue = one group’ stereotypes.",
        "Designing volunteer leadership ladders that don’t unintentionally exclude people (meeting times, childcare, accessibility).",
        "Planning community events with credible partners and shared ownership instead of parachuting in for optics."
      ],
      learningOutcomes: [
        "Use intersectionality as an analytical tool for diagnosing gaps in turnout, representation, and campaign trust.",
        "Design outreach and coalition strategies that match real community structure and constraints.",
        "Evaluate messaging for harm and credibility risk (pandering signals, erasure, tokenization).",
        "Translate theory into practice: segmentation, partner strategy, and program design that increases participation."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=akOe5-UsQ2o",
          "https://www.youtube.com/watch?v=-DW4HLgYPlA",
          "https://www.youtube.com/watch?v=-BnAW4NyOak",
          "https://www.ted.com/talks/kimberle_crenshaw_the_urgency_of_intersectionality"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69510",
          "https://cres.ucmerced.edu/about/courses",
          "https://cres.ucmerced.edu/about/major-and-minor-requirements",
          "https://www.pewresearch.org/topic/race-ethnicity/"
        ],
        tools: [
          "Program design checklists (accessibility + inclusion audits)",
          "Segment tags in VAN/CRM (multi-identity outreach tracking)",
          "Qualitative feedback loops (listening sessions + structured notes)",
          "Volunteer ops tooling (Mobilize + Action Network)",
          "Message testing (small surveys + A/B script pilots)"
        ]
      }
    }
  },
  {
  id: "cogs-170",
  code: "COGS 170",
  name: "Judgment and Decision Making",
  fullName: "COGS 170: Judgment and Decision Making",
  description:
    "Introduces how humans judge risk and make choices under uncertainty (financial, health, group decisions, rational choice models, and ways to improve decisions)—highly transferable to campaign strategy, targeting, and message testing.",
  tier: 2,
  expandedInfo: {
    credits: 4,
    careerRelevance:
      "Campaign management is decision-making under uncertainty: limited time, imperfect data, noisy signals, and high-stakes tradeoffs. This course makes you better at designing choices (donate, volunteer, vote), avoiding predictable planning errors, and running evidence-driven experiments so your field + comms decisions aren’t guided by cognitive traps.",
    realWorldApplications: [
      "Choice architecture for turnout: redesign volunteer scripts/texts so the ‘default’ action is committing to a plan (time/place), not just expressing support.",
      "Preventing campaign “groupthink”: structure staff meetings with pre-mortems, independent estimates, and red-team critiques before locking the field plan.",
      "Reducing overconfidence in ‘vibes’ strategy: use calibrated forecasting (ranges + base rates) for win numbers, turnout goals, and persuasion targets.",
      "Ethical nudges: improve conversion for voter registration/ballot cure using reminders, friction reduction, and clear deadlines—without manipulation.",
      "A/B testing persuasion: compare two canvass framings (values vs. policy detail) and interpret results correctly (noise vs. real lift)."
    ],
    learningOutcomes: [
      "Recognize common judgment errors (anchoring, availability, confirmation bias) and build routines that reduce them in campaign decisions.",
      "Explain decisions under risk/uncertainty using core models (expected utility, heuristics) and know when those models mispredict real behavior.",
      "Design better decisions operationally: create checklists, pre-mortems, and measurement plans that improve strategy quality over a full cycle.",
      "Evaluate evidence from tests/polls/field data with clearer thinking about causality, uncertainty, and practical significance."
    ],
    resources: {
      videos: [
        "https://www.youtube.com/watch?v=CjVQJdIrDJ0", // Daniel Kahneman | Talks at Google
        "https://www.ted.com/talks/daniel_kahneman_the_riddle_of_experience_vs_memory",
        "https://www.youtube.com/watch?v=9X68dm92HVI", // Dan Ariely TED
        "https://www.youtube.com/watch?v=p9lPBqvN_u4", // Richard Thaler: Nudge
        "https://www.youtube.com/watch?v=jgdj5505y00", // Cass Sunstein: Nudging society
        "https://www.youtube.com/watch?v=qwNTv1tjKbA", // MIT OCW: Uncertainty
        "https://www.youtube.com/watch?v=WRKfl4owWKc", // Stanford: Decision Making (Baba Shiv)
        "https://www.youtube.com/watch?v=tgN-rFI34_w"  // UC Merced lecture: Intro to Nudge/JDM (Padilla)
      ],
      websites: [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69317",
        "https://thedecisionlab.com/",
        "https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/",
        "https://www.khanacademy.org/partner-content/wi-phi/wiphi-critical-thinking/wiphi-cognitive-biases",
        "https://ocw.mit.edu/"
      ],
      tools: [
        "Pre-mortem templates (decision hygiene for campaign plans)",
        "A/B testing tools (e.g., Action Network email experiments)",
        "Survey tools (Qualtrics / Google Forms) for message testing",
        "Spreadsheets + dashboards (Google Sheets + Looker Studio)",
        "Voter-contact CRMs (VAN/NGP) for tracking outcomes by script/segment"
      ]
    }
  }
},
{
  id: "eng-001",
  code: "ENG 001",
  name: "Introduction to Environmental Communications",
  fullName: "ENG 001: Introduction to Environmental Communications",
  description:
    "Introduces ecology/climate basics, environmental justice, and the principles of effective environmental communication with attention to audience—useful for campaigns running environmental policy, ballot measures, or climate-focused field programs.",
  tier: 2,
  expandedInfo: {
    credits: 4,
    careerRelevance:
      "Campaign staff often have to translate complex environmental issues into clear, motivating, audience-specific messages—especially for local races, ballot initiatives, or advocacy coalitions. This course builds the ability to communicate science responsibly, frame issues without backlash, and earn trust with communities most affected by environmental harm (a core requirement for effective coalition organizing).",
    realWorldApplications: [
      "Write a climate/air-quality canvass script that is accurate, local, and values-based (health, cost, jobs) rather than jargon-heavy.",
      "Design an EJ-centered field plan: partner outreach, trusted messengers, multilingual materials, and listening sessions before persuasion asks.",
      "Build a misinformation response for environmental claims (wildfire, water, clean energy) that corrects without amplifying the false frame.",
      "Create a ballot-measure communication package: one-pager, FAQs, short-form video script, and earned-media pitch with clear evidence.",
      "Turn scientific findings into a “so what / now what” story: what’s happening locally, who it affects, and what action is being asked."
    ],
    learningOutcomes: [
      "Explain core environmental concepts accurately enough to communicate them without distortion or overclaiming.",
      "Segment audiences and tailor frames/messages to different values and identities (without stereotyping or pandering).",
      "Apply environmental justice principles to campaign practice: trust-building, representation, and harm-reduction in messaging.",
      "Produce practical comms outputs (scripts, briefs, visuals) that are clear, credible, and action-oriented."
    ],
    resources: {
      videos: [
        "https://www.ted.com/talks/katharine_hayhoe_the_most_important_thing_you_can_do_to_fight_climate_change_talk_about_it",
        "https://www.youtube.com/watch?v=2I5u9rfUSLA", // Global Warming’s Six Americas (audience segmentation)
        "https://www.youtube.com/watch?v=oPtE0Cqw2V8", // Hayhoe + George Marshall convo
        "https://www.youtube.com/watch?v=7eQ9a_Hb2o4", // George Marshall workshop (Climate Outreach)
        "https://www.youtube.com/watch?v=2G9OjuVmvZo", // Nisbet: Climate communication & engagement
        "https://www.youtube.com/watch?v=HAnw168huqA", // Stanford: Think Fast, Talk Smart (highly reusable comms skill)
        "https://www.youtube.com/watch?v=dREtXUij6_c", // Environmental justice explained
        "https://www.youtube.com/watch?v=O_BjYDfD8KI"  // Climate storytelling
      ],
      websites: [
        "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69715",
        "https://climatecommunication.yale.edu/about/projects/global-warmings-six-americas/",
        "https://climateoutreach.org/",
        "https://www.nature.org/en-us/what-we-do/our-priorities/tackle-climate-change/climate-change-stories/can-we-talk-climate/",
        "https://www.noaa.gov/education/resource-collections/climate"
      ],
      tools: [
        "Canva (fast campaign graphics + explainers)",
        "Datawrapper or Flourish (simple public-facing charts)",
        "ArcGIS StoryMaps (place-based environmental storytelling)",
        "Meta Ad Library + Google Ads Transparency (competitive creative research)",
        "Descript or CapCut (quick captioned video for social)",
        "Hootsuite/Buffer (content scheduling for campaigns/orgs)"
      ]
    }
  }
},
];

/**
 * 🟠 TIER 3: OPTIONAL
 * Additional courses that may be beneficial for Campaign Staff / Field Organizer / Campaign Management roles
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "poli-092",
    code: "POLI 092",
    name: "Internship in Political Science",
    fullName: "POLI 092: Internship in Political Science",
    description:
      "Faculty-supervised political science internship (variable units) that turns real campaign/government/community work into structured learning, reflection, and deliverables—perfect for building practical field and campaign-ops competence early.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4 units depending on internship hours/plan
      careerRelevance:
        "For Campaign Staff / Field Organizers, this is where theory becomes muscle memory: canvassing, volunteer onboarding, data entry discipline, event ops, coalition outreach, and message consistency. You should treat the internship like a mini-campaign: define a measurable goal (contacts, shifts filled, event turnout), track it weekly, and produce a final deliverable your next campaign can reuse (training doc, turf plan, phonebank playbook, etc.).",
      realWorldApplications: [
        "Run weekly volunteer operations: recruit, confirm, train, and retain volunteers; build a simple “shift fill” dashboard.",
        "Execute voter contact programs (doors/phones/text): script practice, data hygiene, and escalation rules for issues/hostility.",
        "Build/maintain turf and universes in VAN/CRM: cut lists, assign turfs, track outcomes, and report daily metrics.",
        "Support field events: staging, materials, route plans, accessibility, partner coordination, and post-event follow-up.",
        "Produce a final deliverable: a GOTV checklist + shift lead guide + script library tailored to the district/community."
      ],
      learningOutcomes: [
        "Translate campaign goals into weekly operational KPIs (contacts, commit-to-vote, shifts, show rate).",
        "Develop field professionalism: reliability, confidentiality, accurate data entry, and clean handoffs between teams.",
        "Improve persuasion + de-escalation at the door through structured practice and feedback loops.",
        "Create a portfolio-ready product that demonstrates campaign competence (training, dashboard, or field plan)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=tv9-HHb1VQA",
          "https://www.youtube.com/watch?v=C4mAUovRFgs",
          "https://www.youtube.com/watch?v=Yz-HVNnTqis",
          "https://www.youtube.com/NationalDemocraticTrainingCommittee",
          "https://www.youtube.com/watch?v=WPYxhASPjbU",
          "https://www.youtube.com/watch?v=Z2QOe2RM9Pc",
          "https://www.youtube.com/playlist?list=PLxq_lXOUlvQDgCVFj9L79kqJybW0k6OaB"
        ],
        websites: [
          "https://polisci.ucmerced.edu/undergraduate-students/internships",
          "https://cape.ucmerced.edu/internships-course-credit",
          "https://www.ngpvan.com/blog/canvassing-with-minivan/",
          "https://join.mobilize.us/blog/volunteer-recruitment/",
          "https://join.mobilize.us/blog/volunteer-training/",
          "https://www.fec.gov/data/"
        ],
        tools: [
          "VAN / VoteBuilder + MiniVAN (voter contact + data capture)",
          "Mobilize (events + volunteer recruitment)",
          "Action Network (forms, email, basic experiments)",
          "ThruText / Spoke / CallHub (texting + calling at scale)",
          "Airtable or Google Sheets (field ops tracking + KPIs)",
          "Slack/Discord (distributed volunteer coordination)"
        ]
      }
    }
  },

  {
    id: "poli-192",
    code: "POLI 192",
    name: "Internship in Political Science",
    fullName: "POLI 192: Internship in Political Science",
    description:
      "Upper-division, faculty-supervised political science internship (variable units) that emphasizes higher responsibility and higher-quality outputs—ideal for stepping into shift-lead, data lead, or field coordinator work.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4 units depending on internship hours/plan
      careerRelevance:
        "This is the internship you use to prove you can run pieces of a campaign independently: lead a phonebank program, manage a turf packet pipeline, supervise volunteers, or own an early-vote chase workflow. The best POLI 192 outcomes look like a ‘field coordinator in miniature’—clear scope, documented systems, and measurable results.",
      realWorldApplications: [
        "Own a program end-to-end: volunteer recruitment → training → shift scheduling → quality control → weekly reporting.",
        "Build a field metrics report for leadership: contacts, contact rate, support IDs, persuasion attempts, shift fill, show rate.",
        "Design and test scripts: run A/B variants and summarize what changed + what you recommend next.",
        "Lead coalition outreach: coordinate with 2–3 community partners for turnout events or volunteer pipelines.",
        "Create a final capstone-style deliverable: a complete GOTV plan or “Field Ops Handbook” for the org."
      ],
      learningOutcomes: [
        "Operate like campaign management: plan, execute, measure, and improve a program over multiple weeks.",
        "Communicate up and down: clear instructions to volunteers and concise memos for leadership.",
        "Demonstrate ethical handling of voter/community data and respectful engagement practices.",
        "Produce reusable assets (dashboards, training guides, workflows) that reduce future campaign chaos."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=tv9-HHb1VQA",
          "https://www.youtube.com/watch?v=oUpPzJE4Mvc",
          "https://www.youtube.com/watch?v=Yz-HVNnTqis",
          "https://www.youtube.com/watch?v=PAUKPFeDM0Y",
          "https://www.youtube.com/watch?v=WPYxhASPjbU",
          "https://www.youtube.com/playlist?list=PL6caGRBUYZCnvo_N-P0gnjWndvoarQeDq",
          "https://www.youtube.com/NationalDemocraticTrainingCommittee"
        ],
        websites: [
          "https://cape.ucmerced.edu/internships-course-credit",
          "https://polisci.ucmerced.edu/undergraduate-students/internships",
          "https://adstransparency.google.com/",
          "https://www.facebook.com/ads/library/",
          "https://www.ngpvan.com/blog/canvassing-with-minivan/"
        ],
        tools: [
          "Looker Studio / Tableau (weekly reporting dashboards)",
          "VAN exports + tags (program measurement)",
          "Mobilize (shift fill + volunteer funnel tracking)",
          "Action Network (email + signup forms + experiments)",
          "Meta Ad Library / Google Ads Transparency (competitive comms research)"
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
      "Faculty-supervised sociology internship (variable units) with a required research paper or product—excellent for campaigns because it trains you to learn a community fast and turn insights into action.",
    tier: 3,
    expandedInfo: {
      credits: 1, // variable 1–4 units depending on internship hours/plan
      careerRelevance:
        "Campaigns win when they understand local social reality: trusted institutions, barriers to participation, and what actually motivates action. SOC 092 is especially valuable because it pushes you to produce a research-backed deliverable—e.g., a community landscape memo, stakeholder map, or turnout barrier analysis that directly improves field strategy.",
      realWorldApplications: [
        "Write a “community landscape memo” identifying trusted messengers, institutions, and turnout barriers by neighborhood.",
        "Build a stakeholder map for coalition outreach (orgs, leaders, congregations, student groups) + engagement plan.",
        "Run listening sessions and summarize patterns into field recommendations (message, messengers, event formats).",
        "Create a turnout-barrier intervention plan (transportation, childcare, language access, fear/distrust) with tactics.",
        "Deliver a final research product that the campaign/org can act on next week—not just a generic reflection."
      ],
      learningOutcomes: [
        "Collect and synthesize qualitative/field information into actionable organizing strategy.",
        "Identify how social networks and institutions shape participation (who mobilizes whom, and why).",
        "Write a clear product (memo/report/toolkit) that turns observations into decisions.",
        "Practice ethical community engagement: consent, respect, and avoiding extractive relationships."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=QwhK-iEyXYA",
          "https://www.youtube.com/watch?v=FpMm0SEqLzU",
          "https://www.youtube.com/watch?v=cbE1hQIixjQ",
          "https://www.youtube.com/watch?v=A1_xbXIr_gw",
          "https://www.youtube.com/watch?v=Hnt3XOCYFic",
          "https://www.youtube.com/playlist?list=PLxq_lXOUlvQDgCVFj9L79kqJybW0k6OaB"
        ],
        websites: [
          "https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses",
          "https://www.census.gov/topics/public-sector/voting.html",
          "https://acleddata.com/",
          "https://r4ds.hadley.nz/",
          "https://institute-academic-development.ed.ac.uk/study-hub/learning-resources/literature-review"
        ],
        tools: [
          "Zotero (citations + source organization)",
          "NVivo (qualitative coding) or a spreadsheet-based coding workflow",
          "Google My Maps / QGIS (community asset + precinct mapping)",
          "Airtable (stakeholder tracking + outreach status)",
          "Otter/Descript (clean transcripts + accessible notes)"
        ]
      }
    }
  },

  {
    id: "cres-190",
    code: "CRES 190",
    name: "Senior Capstone",
    fullName: "CRES 190: Senior Capstone",
    description:
      "Culminating CRES research capstone focused on proposal design, methods, and execution—extremely useful for campaigns that must build trust, avoid harmful framing, and design coalition programs that actually work across diverse communities.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Campaign Management is coalition management. CRES 190 helps you design and defend an equity-centered strategy: how you talk about issues, who you ask to lead, how you prevent tokenism, and how you build durable partnerships. The best campaign-relevant capstones produce a real toolkit—e.g., an inclusive outreach program design, a language access + accessibility plan, or a narrative analysis of how communities are being framed in local media.",
      realWorldApplications: [
        "Create an equity-centered field program design: partner selection, shared ownership, multilingual materials, feedback loops.",
        "Build a “harm audit” for messaging: identify risky frames/dog whistles and rewrite into truthful, respectful alternatives.",
        "Design a community trust plan (before persuasion): listening sessions, accountability commitments, and follow-through structures.",
        "Analyze local media/social narratives about a community and propose a corrective storytelling strategy for the campaign.",
        "Produce a capstone deliverable that a real campaign/org could implement (toolkit + scripts + training outline)."
      ],
      learningOutcomes: [
        "Formulate a research question and proposal that connects power, representation, and policy to lived outcomes.",
        "Apply interdisciplinary methods to analyze communities and narratives with rigor (not vibes).",
        "Develop ethical public-facing outputs: accurate claims, respectful depiction, and practical harm-reduction.",
        "Translate critical analysis into operational campaign recommendations (coalition, field, comms)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=JG7Uq_JFDzE",
          "https://www.youtube.com/watch?v=M2wsGCqavPI",
          "https://www.youtube.com/watch?v=FpMm0SEqLzU",
          "https://www.youtube.com/playlist?list=PL6caGRBUYZCnvo_N-P0gnjWndvoarQeDq",
          "https://www.youtube.com/watch?v=WPYxhASPjbU",
          "https://www.youtube.com/watch?v=Z2QOe2RM9Pc"
        ],
        websites: [
          "https://cres.ucmerced.edu/about/major-and-minor-requirements",
          "https://institute-academic-development.ed.ac.uk/study-hub/learning-resources/literature-review",
          "https://www.pewresearch.org/topic/politics-policy/",
          "https://www.census.gov/topics/public-sector/voting.html",
          "https://adstransparency.google.com/"
        ],
        tools: [
          "Zotero (research organization + citations)",
          "NVivo (coding interviews/media) or spreadsheet coding templates",
          "Datawrapper/Flourish (clear public-facing charts)",
          "ArcGIS StoryMaps (place-based storytelling for communities/issues)",
          "Meta Ad Library (representation + creative audits)"
        ]
      }
    }
  },

  {
    id: "soc-191",
    code: "SOC 191",
    name: "Sociology Senior Capstone",
    fullName: "SOC 191: Sociology Senior Capstone",
    description:
      "Culminating sociology capstone emphasizing applied sociological analysis—excellent for building campaign-ready skills like community research, turnout barrier diagnosis, and producing high-quality strategy memos.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "A strong field organizer is a fast community researcher: you identify what’s blocking participation, who people trust, and how to move them from support → action. SOC 191 lets you build that as a repeatable skill by producing a rigorous final project (analysis + recommendations) that looks like the kind of memo a campaign manager actually uses.",
      realWorldApplications: [
        "Turn an organizing problem into a researchable question (e.g., why turnout is low in X precinct group) and test it.",
        "Create a precinct/community barrier analysis and propose interventions (messengers, formats, scheduling, access).",
        "Analyze volunteer pipeline drop-off and redesign onboarding/training to increase retention and leadership development.",
        "Write a final deliverable in campaign format: 2-page strategy memo + appendix (data, scripts, stakeholder map).",
        "Present findings as a briefing: what’s happening, what it means, what we should do next week."
      ],
      learningOutcomes: [
        "Apply sociological concepts and methods to a real problem with clear evidence and reasoning.",
        "Synthesize sources into a coherent argument (literature → method → findings → recommendations).",
        "Communicate analysis to non-academic audiences with clarity and operational relevance.",
        "Produce a portfolio-grade capstone that demonstrates you can research, plan, and execute strategically."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=cbE1hQIixjQ",
          "https://www.youtube.com/watch?v=A1_xbXIr_gw",
          "https://www.youtube.com/watch?v=QwhK-iEyXYA",
          "https://www.youtube.com/watch?v=FpMm0SEqLzU",
          "https://www.youtube.com/watch?v=JG7Uq_JFDzE",
          "https://www.youtube.com/playlist?list=PLxq_lXOUlvQDgCVFj9L79kqJybW0k6OaB"
        ],
        websites: [
          "https://sociology.ucmerced.edu/students/undergraduate-students/undergraduate-courses",
          "https://sociology.ucmerced.edu/students/undergraduate-students/major-requirements",
          "https://institute-academic-development.ed.ac.uk/study-hub/learning-resources/literature-review",
          "https://www.ngpvan.com/blog/canvassing-with-minivan/",
          "https://join.mobilize.us/blog/volunteer-training/"
        ],
        tools: [
          "Zotero (citations + notes)",
          "NVivo (qualitative coding) or spreadsheet-based coding",
          "Looker Studio (clean KPI dashboards for field/volunteer metrics)",
          "QGIS / Google My Maps (mapping community assets + turfs)",
          "Google Docs templates (briefings, memos, and repeatable reporting)"
        ]
      }
    }
  },
];

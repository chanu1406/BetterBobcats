/**
 * Legislative Aide / Government Staff Tier Courses Data
 * Course recommendations organized by tier for Legislative Aide / Government Staff career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Legislative Aide / Government Staff roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "poli-001",
    code: "POLI 001",
    name: "Introduction to American Politics",
    fullName: "POLI 001: Introduction to American Politics",
    description:
      "Foundational course covering the structure and function of American government and political institutions.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative aides and government staff need a strong working model of institutions (Congress, presidency, courts, parties, elections, federalism) to write accurate briefs, respond to constituents, and track policy realistically.",
      realWorldApplications: [
        "Writing a 1-page constituent explainer on how an issue becomes policy",
        "Explaining which branch/level of government has authority over a problem",
      ],
      learningOutcomes: [
        "Explain how U.S. political institutions are designed and how they actually function",
        "Analyze how parties, elections, interest groups, and media shape outcomes",
      ],
      resources: {
        videos: [
          // Extremely popular, structured, and widely trusted for intro-level mastery
          "https://www.youtube.com/playlist?list=PL8dPuuaLjXtOfse2ncvffeelTrqvhrz8H", // Crash Course: U.S. Government & Politics :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/playlist?list=PLSQl0a2vh4HByQTEIdo8RTNyJ61NUnsL5", // Khan Academy: US Government & Civics :contentReference[oaicite:1]{index=1}
        ],
        websites: [
          "https://www.congress.gov/", // official legislative info + records :contentReference[oaicite:2]{index=2}
          "https://www.govinfo.gov/", // official publications from all 3 branches :contentReference[oaicite:3]{index=3}
        ],
        tools: [
          "Google Docs (brief writing)",
          "Google Sheets / Excel (bill & stakeholder tracking)",
          "Notion (issue tracker + meeting notes)",
        ],
      },
    },
  },
  {
    id: "poli-100",
    code: "POLI 100",
    name: "Congressional Politics",
    fullName: "POLI 100: Congressional Politics",
    description:
      "Examines the structure, processes, and dynamics of the U.S. Congress.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "This course is directly aligned with legislative-aide work: committee systems, agenda-setting, leadership, rules, bargaining, oversight, and the practical realities of ‘how Congress actually moves.’",
      realWorldApplications: [
        "Maintaining a bill tracker and producing a weekly legislative update memo",
        "Preparing hearing/markup prep: background, stakeholders, and recommended questions",
      ],
      learningOutcomes: [
        "Understand committees, party leadership, rules, and bargaining dynamics",
        "Track legislation accurately from introduction through committee/floor stages",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLIyZkIckwn6uq4z1L6E7Vkx5H98ZQ8AK2", // Library of Congress: The Legislative Process (high-quality official short videos) :contentReference[oaicite:4]{index=4}
          "https://www.c-span.org/video/?55006-1%2Flegislative-process=", // C-SPAN explainer on legislative process (strong civics/government education resource) :contentReference[oaicite:5]{index=5}
          "https://www.youtube.com/watch?v=NJ-lDm8ciZY", // “The Imprint of Congress” lecture series (deep/longform) :contentReference[oaicite:6]{index=6}
        ],
        websites: [
          "https://www.congress.gov/legislative-process", // official overview + transcript :contentReference[oaicite:7]{index=7}
          "https://www.congress.gov/get-alerts", // get member/legislation alerts (real staff workflow) :contentReference[oaicite:8]{index=8}
          "https://www.congress.gov/help/alerts", // alert mechanics/saved search tips :contentReference[oaicite:9]{index=9}
        ],
        tools: [
          "Congress.gov email alerts (bill/member tracking)",
          "C-SPAN Classroom clips (hearings + floor debates for context)",
          "Issue brief template + 1-page bill summary template",
        ],
      },
    },
  },
  {
    id: "poli-101",
    code: "POLI 101",
    name: "The Presidency",
    fullName: "POLI 101: The Presidency",
    description:
      "Study of the American presidency, its powers, and role in the political system.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Government staff constantly evaluate executive power: executive orders, agency direction, veto threats, signing statements, and negotiation with Congress. This course helps you write accurate, non-handwavy briefs about what the president can do.",
      realWorldApplications: [
        "Drafting a memo on executive options vs legislative options for an issue",
        "Explaining an executive order’s scope, limits, and implementation pathway",
      ],
      learningOutcomes: [
        "Explain formal/informal presidential powers and how they’ve evolved",
        "Understand executive action tools (EOs, veto, appointments, bargaining)",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNho9WwHDP2ERyEVLg3P8Qe", // Crash Course: Presidents & the Presidency (high-quality, widely used) :contentReference[oaicite:10]{index=10}
          "https://www.youtube.com/watch?v=gCNvBqTJTUA", // Khan Academy: Executive orders (clear + directly relevant) :contentReference[oaicite:11]{index=11}
        ],
        websites: [
          "https://www.govinfo.gov/app/browse/category", // presidential materials + official docs collections :contentReference[oaicite:12]{index=12}
          "https://www.govinfo.gov/about", // what govinfo is (authentic gov publications) :contentReference[oaicite:13]{index=13}
        ],
        tools: [
          "Executive action tracker (EOs/memos/agency actions) in Sheets",
          "Policy option matrix (Congress vs Executive vs Courts)",
          "Calendar + deadlines system (votes, hearings, statements)",
        ],
      },
    },
  },
  {
    id: "poli-102",
    code: "POLI 102",
    name: "Judicial Politics",
    fullName: "POLI 102: Judicial Politics",
    description:
      "Analysis of the judicial branch, court systems, and judicial decision-making.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Staffers need to anticipate litigation risk, understand how major cases reshape policy, and summarize decisions quickly for leadership/constituents. Judicial politics also trains you to think in constraints (what courts can/can’t do).",
      realWorldApplications: [
        "Writing a ‘case impact brief’ after a major Supreme Court ruling",
        "Flagging constitutional/judicial risk in proposed bill language",
      ],
      learningOutcomes: [
        "Explain how cases reach the Supreme Court and how decisions are made",
        "Analyze how doctrine, institutions, and political context interact",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLSQl0a2vh4HDJCPo7pq8GxHBvUCU10_0V", // Khan Academy: Constitution/Bill of Rights + landmark SCOTUS cases :contentReference[oaicite:14]{index=14}
          "https://www.youtube.com/playlist?list=PLLd1AFkP31XMRP7BSVq9rlpl4Fp2xwEMH", // Constitution 101 (NCC + Khan Academy) :contentReference[oaicite:15]{index=15}
        ],
        websites: [
          "https://www.oyez.org/", // Supreme Court archive: audio, summaries, issues :contentReference[oaicite:16]{index=16}
          "https://www.scotusblog.com/", // leading SCOTUS news/analysis + case tracking :contentReference[oaicite:17]{index=17}
          "https://www.supremecourt.gov/opinions/opinions.aspx", // official opinions :contentReference[oaicite:18]{index=18}
        ],
        tools: [
          "Case brief template (Issue/Rule/Application/Holding/Impact)",
          "Oyez + SCOTUSblog watchlist for tracking pending cases",
          "Stakeholder impact table (who wins/loses + implementation changes)",
        ],
      },
    },
  },
  {
    id: "poli-107",
    code: "POLI 107",
    name: "California Politics",
    fullName: "POLI 107: California Politics",
    description:
      "Examination of California's political system, institutions, and policy processes.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "If you’re staffing in California (or covering CA policy from DC), this is the most directly transferable course: how Sacramento power flows, how bills move, how committees/hearings work, and how money + stakeholders shape outcomes.",
      realWorldApplications: [
        "Tracking a CA bill from committee to floor and summarizing the next procedural step",
        "Using hearing transcripts + votes + donor context to brief a member or chief of staff",
      ],
      learningOutcomes: [
        "Understand California’s institutions (Legislature, Governor, agencies, ballot measures) and how they interact",
        "Build practical bill-tracking and hearing-tracking skills using CA public tools",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/user/PPICvideos", // PPIC: high-quality CA public policy explainers/events
          "https://www.youtube.com/watch?v=lSPH4DDw_ko", // How a Bill Becomes a Law in CA (explainer)
          "https://www.youtube.com/watch?v=C4CDduh02go", // CA legislative process explainer
        ],
        websites: [
          "https://calmatters.digitaldemocracy.org/", // CA-specific bill/hearing/vote/money tracking
          "https://leginfo.legislature.ca.gov/", // official CA legislative info (current)
          "https://www.assembly.ca.gov/events/past", // CA Assembly committee/floor video archive
          "https://www.sos.ca.gov/elections", // CA elections admin + official election info
          "https://www.fppc.ca.gov/", // CA campaign finance / ethics regulator
          "https://cal-access.sos.ca.gov/Campaign/", // CA campaign finance filings (Cal-Access)
        ],
        tools: [
          "Digital Democracy (hearings, votes, bill + money context)",
          "LegInfo (bill text, analyses, votes)",
          "Sheets/Excel (bill tracker + committee agenda tracker)",
        ],
      },
    },
  },
  {
    id: "poli-109",
    code: "POLI 109",
    name: "Legislative Simulation",
    fullName: "POLI 109: Legislative Simulation",
    description:
      "Hands-on experience simulating legislative processes and procedures.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "This is ‘job rehearsal.’ You practice the real staff loop: draft → committee strategy → coalition/whip count → amendments → messaging → floor. It’s a huge advantage in interviews because you can talk in workflows, not just theory.",
      realWorldApplications: [
        "Writing a 1-page bill summary + pros/cons + recommended vote",
        "Running a mock hearing with witness questions and amendment strategy",
      ],
      learningOutcomes: [
        "Operate core legislative procedure (committees, markups, amendments, floor steps)",
        "Develop negotiation, coalition-building, and concise briefing skills",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLIyZkIckwn6uq4z1L6E7Vkx5H98ZQ8AK2", // Library of Congress: legislative stages (clean + procedural)
          "https://www.youtube.com/watch?v=erGCulFdPHQ", // iCivics LawCraft trailer (what the sim is training)
          "https://www.youtube.com/watch?v=nVbHRjw6y1o", // Mock Congress Session (simulation example)
        ],
        websites: [
          "https://ed.icivics.org/games/lawcraft", // simulation tool (useful even at college level for reps + intuition)
          "https://www.ncsl.org/legislative-staff/civics-education/learning-the-game", // NCSL “how the legislative game works”
          "https://www.ncsl.org/about-state-legislatures/inside-the-legislative-process", // state-legislative process reference
        ],
        tools: [
          "Bill template + section-by-section summary template",
          "Whip count sheet (support/lean/oppose + reasons)",
          "Stakeholder map (supporters/opponents/swing groups + asks)",
        ],
      },
    },
  },
  {
    id: "poli-110",
    code: "POLI 110",
    name: "Governmental Power and the Constitution",
    fullName: "POLI 110: Governmental Power and the Constitution",
    description:
      "Analysis of constitutional principles and the distribution of governmental powers.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Staff work requires spotting constitutional constraints early (separation of powers, federalism, speech, due process). This helps you flag risk, write cleaner bill language, and explain legal limits to non-lawyers.",
      realWorldApplications: [
        "Writing a ‘constitutional risk’ paragraph in a policy memo",
        "Summarizing how a Supreme Court opinion changes what legislation can do",
      ],
      learningOutcomes: [
        "Explain separation of powers, checks/balances, and federalism with real examples",
        "Apply constitutional reasoning to current policy proposals and disputes",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLLd1AFkP31XNrOuH2bpdmRAzWlw3GiAsv", // Constitution 101 Curriculum (NCC)
          "https://www.youtube.com/playlist?list=PLLd1AFkP31XMRP7BSVq9rlpl4Fp2xwEMH", // Constitution 101 with Khan Academy
          "https://www.youtube.com/playlist?list=PLLd1AFkP31XO-w2cj9fc-B_I_lrsw-s0O", // NCC constitutional conversations (applied)
        ],
        websites: [
          "https://constitutioncenter.org/education/videos", // NCC video library
          "https://www.supremecourt.gov/opinions/opinions.aspx", // official Supreme Court opinions
          "https://www.govinfo.gov/", // official government documents across branches
        ],
        tools: [
          "Case brief template (Issue/Rule/Application/Holding/Impact)",
          "1-page constitutional issue-spotter checklist",
          "Zotero (keep sources + cases organized)",
        ],
      },
    },
  },

  {
    id: "poli-112",
    code: "POLI 112",
    name: "Public Policy: Analysis, Strategy, and Impact",
    fullName: "POLI 112: Public Policy: Analysis, Strategy, and Impact",
    description:
      "Examination of policy analysis, development, and implementation processes.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative aides win by producing decision-ready options: define the problem, compare alternatives, anticipate implementation, and propose strategy (coalitions, timing, committee path).",
      realWorldApplications: [
        "Writing an options memo with 3 alternatives + tradeoffs + recommendation",
        "Designing an implementation risk plan (agency capacity, timelines, unintended consequences)",
      ],
      learningOutcomes: [
        "Use structured frameworks to analyze policy problems and evaluate solutions",
        "Translate evidence into strategy: feasibility, stakeholders, and implementation",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=1XvfMgHYJ4g", // Policy analysis framework (problem-solving)
          "https://ocw.mit.edu/courses/11-003j-methods-of-policy-analysis-spring-2016/", // MIT OCW: Methods of Policy Analysis
          "https://ocw.mit.edu/courses/11-002j-making-public-policy-fall-2014/", // MIT OCW: Making Public Policy
        ],
        websites: [
          "https://www.gao.gov/", // nonpartisan audits/evaluations (great for “impact” thinking)
          "https://ocw.mit.edu/", // MIT OCW hub (credible + rigorous)
        ],
        tools: [
          "Cost/benefit + distributional impact table (who pays/who benefits)",
          "Logic model (inputs → activities → outputs → outcomes)",
          "Policy memo template (exec summary + options + rec)",
        ],
      },
    },
  },
  {
    id: "poli-105",
    code: "POLI 105",
    name: "Interest Groups and Political Parties",
    fullName: "POLI 105: Interest Groups and Political Parties",
    description:
      "Study of interest groups, political parties, and their influence on government.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Staffers constantly manage stakeholder pressure and coalition politics. This course makes you faster at predicting who will support/oppose a bill, how parties coordinate, and how money + lobbying shape incentives.",
      realWorldApplications: [
        "Building a stakeholder map with predicted positions + leverage points",
        "Writing a ‘coalition strategy’ section for a policy memo (who to move first and why)",
      ],
      learningOutcomes: [
        "Explain why interest groups form and how they influence policymaking",
        "Understand party organization, party discipline, and electoral incentives",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=bOvBA7oIIgc", // Crash Course: Interest Groups
          "https://www.youtube.com/watch?v=VEmOUHxessE", // Crash Course: Political Parties
          "https://www.youtube.com/watch?v=BGo9Asfwric", // Crash Course: Interest Group Formation
        ],
        websites: [
          "https://www.fec.gov/data/", // federal campaign finance data (primary source)
          "https://www.fppc.ca.gov/", // CA ethics + political finance oversight
          "https://cal-access.sos.ca.gov/Campaign/", // CA campaign filings
          "https://www.followthemoney.org/", // 50-state money-in-politics data
        ],
        tools: [
          "Stakeholder map (support/oppose/swing + rationale)",
          "Coalition tracker (who committed, who needs outreach, who’s blocking)",
          "Message box (core narrative + 3 supporting points + expected attacks)",
        ],
      },
    },
  },
  {
    id: "poli-120",
    code: "POLI 120",
    name: "Voting Behavior, Campaigns, and Elections",
    fullName: "POLI 120: Voting Behavior, Campaigns, and Elections",
    description:
      "Analysis of electoral behavior, campaign strategies, and election systems.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative offices live in the district. Understanding voter behavior, turnout, persuasion, and campaign finance helps you support comms strategy, evaluate political risk, and interpret polling without getting fooled by bad data.",
      realWorldApplications: [
        "Turning polling + district data into a ‘top voter concerns’ brief",
        "Explaining what a campaign finance surge or ad spend shift likely signals",
      ],
      learningOutcomes: [
        "Understand major models of voting behavior and turnout dynamics",
        "Analyze campaigns: messaging, targeting, fundraising, and electoral systems",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=eermkiaFoWc", // Crash Course: How Voters Decide
          "https://www.youtube.com/watch?v=2A5QlpAyKSQ", // Crash Course: Political Campaigns
          "https://www.youtube.com/playlist?list=PLSQl0a2vh4HD89VYGYdHoMpAvCI0sbUMc", // Khan Academy AP Gov (participation, voting behavior, campaign finance)
        ],
        websites: [
          "https://www.pewresearch.org/topic/politics-policy/us-elections-voters/voters-voting/", // high-quality election/voter research
          "https://www.fec.gov/data/", // primary campaign finance data
          "https://www.sos.ca.gov/elections", // CA election info (if you’re CA-facing)
        ],
        tools: [
          "Polling tracker (sample, mode, dates, likely voter screen, toplines)",
          "Turnout + persuasion funnel (targets, message, channel, measurement)",
          "Basic data workflow (Sheets/Excel; optional: R/Python for deeper analysis)",
        ],
      },
    },
  },
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses that strengthen Legislative Aide / Government Staff skills
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "poli-111",
    code: "POLI 111",
    name: "Liberty, Equality and the Constitution",
    fullName: "POLI 111: Liberty, Equality and the Constitution",
    description: "Examination of constitutional principles of liberty and equality.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative aides constantly run into constitutional constraints (speech, due process, equal protection, federalism). This course builds your ability to flag legal risk early, write cleaner bill language, and brief a member with accurate ‘what’s allowed’ boundaries.",
      realWorldApplications: [
        "Writing a short ‘constitutional risk’ section in a policy memo (liberty vs equality tradeoffs)",
        "Summarizing a Supreme Court decision into: holding, rationale, and legislative implications",
      ],
      learningOutcomes: [
        "Explain major constitutional doctrines tied to liberty and equality (due process, equal protection, fundamental rights)",
        "Analyze how constitutional reasoning shapes real policy outcomes and legislative design",
      ],
      resources: {
        videos: [
          // High-quality, judge/scholar-led, structured curriculum
          "https://www.youtube.com/playlist?list=PLLd1AFkP31XNrOuH2bpdmRAzWlw3GiAsv", // Constitution 101 Curriculum (National Constitution Center) :contentReference[oaicite:0]{index=0}
          "https://www.youtube.com/playlist?list=PLLd1AFkP31XMRP7BSVq9rlpl4Fp2xwEMH", // Constitution 101 with Khan Academy :contentReference[oaicite:1]{index=1}
          // Targeted doctrine refreshers (useful for memo-writing + issue-spotting)
          "https://www.youtube.com/watch?v=-GI2uQQZsMk", // Due Process (3 meanings) :contentReference[oaicite:2]{index=2}
          "https://www.youtube.com/watch?v=UGXAxBNRA1A" // Equal Protection basics :contentReference[oaicite:3]{index=3}
        ],
        websites: [
          "https://constitutioncenter.org/education/videos", // NCC video library (civil liberties + rights) :contentReference[oaicite:4]{index=4}
          "https://www.supremecourt.gov/opinions/opinions.aspx", // official opinions :contentReference[oaicite:5]{index=5}
          "https://www.oyez.org/" // case summaries + audio, great for quick briefs :contentReference[oaicite:6]{index=6}
        ],
        tools: [
          "Case brief template (Issue / Rule / Application / Holding / Impact)",
          "Zotero (cases + sources library)",
          "1-page constitutional issue-spotting checklist",
        ],
      },
    },
  },
  {
    id: "poli-125",
    code: "POLI 125",
    name: "Public Opinion",
    fullName: "POLI 125: Public Opinion",
    description: "Study of public opinion formation, measurement, and influence on politics.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Government staff rely on polling, constituent signals, and opinion research—but bad polls and sloppy interpretation can mislead offices. This course trains you to read surveys correctly, understand measurement error, and write trustworthy ‘what voters think’ briefs.",
      realWorldApplications: [
        "Building a polling tracker that logs sample, mode, dates, likely-voter screen, and toplines",
        "Writing a 1-page ‘district mood’ brief with what’s solid vs what’s uncertain",
      ],
      learningOutcomes: [
        "Explain how public opinion forms (identity, partisanship, media, elites, events)",
        "Evaluate polls: sampling, question wording, nonresponse, margins/uncertainty, and trend vs noise",
      ],
      resources: {
        videos: [
          // Best-in-class polling methods explainers (short, clear, methodologist-led)
          "https://www.pewresearch.org/course/public-opinion-polling-basics/", // Pew “Methods 101” playlist hub :contentReference[oaicite:7]{index=7}
          "https://www.youtube.com/watch?v=pdtSYkWAWHo", // Polling 101 w/ Pew’s Ashley Amaya :contentReference[oaicite:8]{index=8}
          // Widely-used civics/polisci explainers (very popular)
          "https://www.youtube.com/watch?v=WJLDgb8m3K0", // Crash Course: Public Opinion :contentReference[oaicite:9]{index=9}
          "https://www.youtube.com/watch?v=NflULVECAFQ" // Crash Course: Shaping Public Opinion :contentReference[oaicite:10]{index=10}
          ,
          // University lecture (deeper + “real course” feel)
          "https://www.youtube.com/watch?v=n6Zeoj4aXn8" // Harvard/Kennedy School: “Public Opinion” (Thomas E. Patterson) :contentReference[oaicite:11]{index=11}
        ],
        websites: [
          "https://www.pewresearch.org/", // top-tier public opinion research org :contentReference[oaicite:12]{index=12}
          "https://electionstudies.org/", // ANES (gold-standard academic election/opinion survey) :contentReference[oaicite:13]{index=13}
          "https://www.icpsr.umich.edu/web/DAIRL/series/3" // ICPSR overview of ANES series :contentReference[oaicite:14]{index=14}
        ],
        tools: [
          "Polling tracker (Sheets/Excel)",
          "Codebook reading habit (variables + question wording)",
          "Basic stats workflow (optional R/Python)",
        ],
      },
    },
  },
  {
    id: "poli-127",
    code: "POLI 127",
    name: "Race, Gender, and Politics",
    fullName: "POLI 127: Race, Gender, and Politics",
    description: "Analysis of how race and gender shape political participation and representation.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative offices serve diverse constituencies and navigate representation, coalition-building, and equity impacts. This course helps you understand how race and gender shape participation, turnout, policy preferences, and legitimacy—crucial for constituent services and policy messaging.",
      realWorldApplications: [
        "Writing an equity-impact section for a policy memo (who is affected and how)",
        "Preparing culturally competent constituent outreach and listening-session plans",
      ],
      learningOutcomes: [
        "Analyze how race and gender shape political participation, representation, and policy outcomes",
        "Interpret election/polling evidence about group-based political behavior responsibly",
      ],
      resources: {
        videos: [
          // Strong academic lecture series explicitly framed around race/class/faith/gender + elections
          "https://www.youtube.com/watch?v=N025yHTddsI", // Stanford: Presidential Politics (Race/Class/Faith/Gender) Lecture 1 :contentReference[oaicite:15]{index=15}
          "https://www.youtube.com/watch?v=Yym8CrhGwU0", // Stanford: Lecture 4 :contentReference[oaicite:16]{index=16}
          "https://www.youtube.com/watch?v=KVAus_2hk4A", // Stanford: Lecture 5 :contentReference[oaicite:17]{index=17}
          // Modern race/class/gender election lens (playlist)
          "https://www.youtube.com/playlist?list=PLpGHT1n4-mAtFZQbA5yc15Dz7AhGsAbfm" // “Race, Class, and Gender in the 2016 Election” playlist :contentReference[oaicite:18]{index=18}
        ],
        websites: [
          "https://electionstudies.org/", // ANES for group-based attitudes/participation analysis :contentReference[oaicite:19]{index=19}
          "https://www.pewresearch.org/", // high-quality demographic public opinion reporting :contentReference[oaicite:20]{index=20}
        ],
        tools: [
          "Equity impact template (who benefits, who bears costs, who is excluded)",
          "Constituent outreach tracker (stakeholders, contacts, commitments)",
          "Message testing checklist (avoid overclaiming from thin data)",
        ],
      },
    },
  },
  {
    id: "poli-130",
    code: "POLI 130",
    name: "Institutions of Democracy",
    fullName: "POLI 130: Institutions of Democracy",
    description: "Examination of democratic institutions and their role in governance.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Staff work sits inside institutions (rules, norms, oversight, accountability). This course builds the ‘systems view’ needed to understand why reforms succeed/fail, how institutional incentives shape behavior, and how democratic resilience is measured.",
      realWorldApplications: [
        "Writing a reform memo (oversight, ethics rules, transparency, election administration) with institutional constraints",
        "Explaining to constituents how institutional design affects accountability and policy delivery",
      ],
      learningOutcomes: [
        "Compare core democratic institutions (elections, parties, legislatures, courts, bureaucracy, media) and how they produce accountability",
        "Evaluate democratic quality using credible measurement frameworks and evidence",
      ],
      resources: {
        videos: [
          // Yale Open Courses: deep, high-quality lectures specifically on democracy + institutions
          "https://www.youtube.com/watch?v=IjkSYwYfgFo", // Yale PLSC 118: Democracy & Majority Rule (I) :contentReference[oaicite:21]{index=21}
          "https://oyc.yale.edu/political-science/plsc-118/lecture-22", // same lecture page (notes/transcript) :contentReference[oaicite:22]{index=22}
          "https://oyc.yale.edu/political-science/plsc-118/lecture-23" // Democracy & Majority Rule (II) :contentReference[oaicite:23]{index=23}
        ],
        websites: [
          "https://www.v-dem.net/", // V-Dem: multi-dimensional democracy measurement :contentReference[oaicite:24]{index=24}
          "https://www.idea.int/publications/catalogue/assessing-quality-democracy-practical-guide", // International IDEA democracy assessment framework :contentReference[oaicite:25]{index=25}
          "https://freedomhouse.org/reports/freedom-world/freedom-world-research-methodology" // Freedom House methodology (how democracy/freedom is scored) :contentReference[oaicite:26]{index=26}
        ],
        tools: [
          "Institution map (who has power, formal rules, informal veto points)",
          "Oversight checklist (information requests, hearings, audits, reporting)",
          "Comparative indicator dashboard (V-Dem / Freedom House) for context",
        ],
      },
    },
  },

  {
    id: "poli-174",
    code: "POLI 174",
    name: "Data Science and Government Affairs",
    fullName: "POLI 174: Data Science and Government Affairs",
    description: "Introduction to data science applications in government and policy.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Modern legislative/government staff increasingly use data for oversight, constituent insights, campaign finance context, and policy evaluation. This course makes you dangerous in a good way: pulling credible datasets fast, checking claims, and producing simple visuals that inform decisions.",
      realWorldApplications: [
        "Building a dashboard-style memo: program outcomes over time + map of impact by district",
        "Automating bill/campaign-finance monitoring using APIs (Census, FEC, Congress.gov)",
      ],
      learningOutcomes: [
        "Pull, clean, and analyze public datasets relevant to policy and governance",
        "Use APIs and reproducible workflows to monitor legislation, demographics, and political finance",
      ],
      resources: {
        videos: [
          // Official Census Bureau training (best practical “government data” onboarding)
          "https://www.youtube.com/playlist?list=PLewV-zKXDZkioatTWrnOucXxzeTUOTkGk", // Census API Tutorials playlist :contentReference[oaicite:27]{index=27}
          // Practical “how data transforms government” talk (good orientation)
          "https://www.youtube.com/watch?v=CmKiJFm9Eqs" // Transforming Government Through Data :contentReference[oaicite:28]{index=28}
        ],
        websites: [
          "https://data.gov/", // U.S. open data portal :contentReference[oaicite:29]{index=29}
          "https://api.data.gov/", // API gateway for federal agencies :contentReference[oaicite:30]{index=30}
          "https://api.open.fec.gov/", // OpenFEC API :contentReference[oaicite:31]{index=31}
          "https://www.congress.gov/help/using-data-offsite", // Congress.gov API docs hub :contentReference[oaicite:32]{index=32}
          "https://www.census.gov/data/developers/guidance/api-user-guide.html", // Census API user guide :contentReference[oaicite:33]{index=33}
          "https://www.hks.harvard.edu/courses/data-science-politics" // HKS: “Data Science for Politics” (relevant framing) :contentReference[oaicite:34]{index=34}
        ],
        tools: [
          "Excel/Sheets (quick analysis + charts)",
          "Python (pandas) or R (tidyverse) for repeatable pipelines",
          "Tableau / Power BI (optional for dashboards)",
        ],
      },
    },
  },

  {
    id: "soc-107",
    code: "SOC 107",
    name: "Law and Society",
    fullName: "SOC 107: Law and Society",
    description:
      "How law actually functions in real life—courts, policing, legal culture, inequality, and how legal rules shape (and are shaped by) society. Crucial for legislative aides who need to anticipate how a bill will land on real communities and institutions.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative aides constantly translate between law-on-the-books and law-in-practice (constituent impact, enforcement realities, agency capacity, court challenges). This course builds the instinct to ask: “Who implements this, how, and what unintended effects show up?”—exactly what staff need for memos, briefings, and stakeholder meetings.",
      realWorldApplications: [
        "Write a committee memo assessing how a proposed policy could be enforced (courts, agencies, local governments) and where implementation bottlenecks will occur.",
        "Draft constituent-response language that explains legal changes in plain English and anticipates common edge-cases (who benefits, who loses, who’s excluded).",
      ],
      learningOutcomes: [
        "Analyze how legal institutions (courts, police, bureaucracy) shape outcomes beyond the text of a law.",
        "Evaluate policy tradeoffs using socio-legal concepts like legitimacy, compliance, discretion, and inequality.",
        "Read cases and legal controversies with a “policy consequences” lens, not just doctrine.",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL30C13C91CFFEFEA6",
          "https://www.youtube.com/watch?v=kBdfcR-8hEY",
          "https://www.youtube.com/watch?v=p692anLW9rc",
        ],
        websites: [
          "https://ocw.mit.edu/courses/21a-219-law-and-society-spring-2003/",
          "https://ocw.mit.edu/courses/21a-219-law-and-society-spring-2003/pages/lecture-notes/",
          "https://www.oyez.org/",
        ],
        tools: ["Oyez (case research)", "Zotero (policy/source management)", "Congress.gov (bill tracking)"],
      },
    },
  },

  {
    id: "phil-004",
    code: "PHIL 004",
    name: "Critical Reasoning",
    fullName: "PHIL 004: Critical Reasoning",
    description:
      "Argument analysis, evidence evaluation, fallacies, and clear writing—core skills for staff who must produce tight, persuasive memos and survive fast-paced hearings and stakeholder arguments.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative staff live in arguments: policy briefs, testimony prep, talking points, and rapid-response fact checks. Critical reasoning builds the skill of breaking claims into premises, testing evidence quality, spotting misleading framing, and writing clean conclusions under time pressure.",
      realWorldApplications: [
        "Turn messy stakeholder input into a structured pro/con memo with explicit assumptions and evidence strength.",
        "Pressure-test a draft bill summary for hidden leaps (causation vs correlation, cherry-picked data, weak analogies).",
      ],
      learningOutcomes: [
        "Identify arguments, map them into premises/conclusions, and evaluate validity and strength.",
        "Detect common fallacies (ad hominem, slippery slope, post hoc) in political messaging and testimony.",
        "Write concise, evidence-based recommendations with clear uncertainty and alternatives.",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLtKNX4SfKpzU2ChXr_FNgQKvVZbf3CwhX",
          "https://www.youtube.com/playlist?list=PLtKNX4SfKpzWShEUtNiV1QhKG2cP9vbXg",
          "https://www.youtube.com/playlist?list=PLVm9mB5NuCqFmvo6zQMx8GasTG7PmCtMO",
        ],
        websites: [
          "https://podcasts.ox.ac.uk/series/critical-reasoning-beginners",
          "https://www.khanacademy.org/partner-content/wi-phi/wiphi-critical-thinking",
          "https://www.wi-phi.com/",
        ],
        tools: ["Kialo (argument mapping)", "MindMup (quick argument maps)", "Zotero (sources + citations)"],
      },
    },
  },

  {
    id: "phil-005",
    code: "PHIL 005",
    name: "Introduction to Logic",
    fullName: "PHIL 005: Introduction to Logic",
    description:
      "Formal logic foundations (validity, inference, symbolic representations). Useful for airtight reasoning in legal/policy arguments and for spotting invalid leaps in briefs and testimony.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Staff work depends on clean reasoning: if X, then Y; unless Z; therefore recommend A or B. Intro logic makes you faster at evaluating whether claims actually follow from evidence—helpful for drafting analyses that won’t get shredded in committee or by counsel.",
      realWorldApplications: [
        "Rewrite bill language or a policy memo to clarify conditions/exceptions (necessary vs sufficient conditions).",
        "Debug a policy argument by identifying the exact inference step that fails (invalid generalization, equivocation).",
      ],
      learningOutcomes: [
        "Distinguish valid vs invalid argument forms; understand soundness vs validity.",
        "Translate everyday policy statements into precise logical structure (and spot ambiguity).",
        "Use basic proof/derivation skills to justify conclusions clearly.",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLizsKkYTqU_WRDYgy7KJNd1SmGAhskoxP",
          "https://www.youtube.com/playlist?list=PLS8vfA_ckeuZ9UjAHhA1q-ROZGuE_h21V",
          "https://www.youtube.com/playlist?list=PLbMVogVj5nJS1F-yeDwn16nsuYrpSYzaO",
        ],
        websites: [
          "https://intrologic.stanford.edu/",
          "https://online.stanford.edu/courses/soe-yintrologic-introduction-logic",
          "https://www.coursera.org/learn/logic-introduction",
        ],
        tools: ["Carnap.io (logic exercises)", "Anki (logic drill deck)", "Truth table generator (practice)"],
      },
    },
  },

  {
    id: "cres-120",
    code: "CRES 120",
    name: "Race, Law and Civil Rights",
    fullName: "CRES 120: Race, Law and Civil Rights",
    description:
      "Civil rights frameworks, equal protection, discrimination law, and how race interacts with legal institutions and policy. Essential for legislative staff working on education, housing, policing, voting, labor, and health policy.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative aides must anticipate civil-rights implications and legal risks: disparate impact, equal protection, enforcement design, and who bears compliance burdens. This course strengthens your ability to analyze how policy choices affect protected classes and how litigation/agency enforcement may respond.",
      realWorldApplications: [
        "Draft a civil-rights impact section for a policy brief (who is protected, what standard might apply, what enforcement mechanism fits).",
        "Prepare a hearing question set that probes disparate impact, compliance costs, and implementation equity for a proposed bill.",
      ],
      learningOutcomes: [
        "Explain core civil-rights concepts (equal protection, due process, discrimination frameworks) and apply them to policy.",
        "Analyze landmark civil-rights controversies using both doctrinal and policy-implementation lenses.",
        "Evaluate policy design choices (funding, oversight, data reporting) that affect civil-rights outcomes.",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL47Z0ywCYIyx77_G1pDDQcaoe2SBJ-S0l",
          "https://www.youtube.com/watch?v=kbwsF-A2sTg",
          "https://www.youtube.com/playlist?list=PLSQl0a2vh4HA9VOjswVJ7K9VmJSMXlEv1",
        ],
        websites: [
          "https://www.oyez.org/issues",
          "https://www.congress.gov/legislative-process",
          "https://www.khanacademy.org/partner-content/wi-phi/wiphi-critical-thinking",
        ],
        tools: ["Oyez (case audio + summaries)", "Congress.gov (legislation + legislative process)", "LegiScan (alerts)"],
      },
    },
  },
  {
    id: "mgmt-127",
    code: "MGMT 127",
    name: "Public Sector and Non-profit Management",
    fullName: "MGMT 127: Public Sector and Non-profit Management",
    description:
      "Management in government/nonprofits: governance, budgeting, performance measurement, personnel, stakeholder management, and accountability—daily realities for legislative offices and public-facing organizations.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative offices coordinate with agencies and nonprofits constantly (program rollouts, grants, oversight, constituent services). This course builds practical knowledge of budgeting, governance, performance metrics, and organizational constraints—so your policy ideas are implementable, not just theoretical.",
      realWorldApplications: [
        "Create a one-page implementation plan for a new program: responsible agency, staffing needs, metrics, reporting timeline, and oversight hooks.",
        "Evaluate a nonprofit partner’s capacity and governance risks when considering contracts, grants, or pilot programs.",
      ],
      learningOutcomes: [
        "Understand how public/nonprofit organizations make decisions under constraints (political accountability, funding volatility, compliance).",
        "Design basic performance measures and evaluation approaches for programs (what to measure, how to report, how to avoid perverse incentives).",
        "Interpret budgets and governance structures to assess execution risk.",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=ifgvWkNGUQM",
          "https://www.youtube.com/watch?v=Usj0HArRayg",
          "https://www.youtube.com/playlist?list=PLXa3JWoXGD0UIKq2vedPObAkvi_w7oiOJ",
        ],
        websites: [
          "https://www.councilofnonprofits.org/running-nonprofit",
          "https://boardsource.org/resources/recommended-board-practices/",
          "https://www.gao.gov/products/gao-21-404sp",
        ],
        tools: [
          "Excel/Google Sheets (budgets + trackers)",
          "Trello/Asana (workflows)",
          "GAO evaluation glossaries (metric definitions)",
        ],
      },
    },
  },

];

/**
 * 🟠 TIER 3: OPTIONAL
 * Additional courses that may be relevant based on interests
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "poli-092",
    code: "POLI 092",
    name: "Internship in Political Science",
    fullName: "POLI 092: Internship in Political Science",
    description: "Practical experience in political science through internship placement.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For a legislative-aide path, this is where you turn classroom knowledge into office-ready skills: constituent communication, bill tracking, stakeholder notes, and memo writing. It also helps you build references and a portfolio of real deliverables that matter for staff hiring.",
      realWorldApplications: [
        "Draft constituent response templates (casework + policy questions) using plain-language principles",
        "Write a 1–2 page policy memo (problem, options, recommendation) on a live issue the office is handling",
        "Track a bill through committees and produce a weekly ‘status + next steps’ brief for your supervisor",
      ],
      learningOutcomes: [
        "Operate in a professional government workflow (deadlines, approvals, confidentiality, stakeholder communication)",
        "Produce office-standard writing: policy memos, call notes, constituent responses, and short briefings",
        "Build a portfolio and reflection log that translates internship work into interview-ready stories",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLz_S7xcU9ZCTrlaReSWCMQRu7grNsU-tm",
          "https://www.youtube.com/watch?v=BJR7lAEHR8o",
          "https://www.youtube.com/watch?v=1YZIm8FDIvA"
        ],
        websites: [
          "https://www.congress.gov/crs-product/R44491",
          "https://employment.senate.gov/student-opportunities/",
          "https://cha.house.gov/_cache/files/0/c/0cad5127-dde4-4304-aee9-6567ec792e70/B31F4F320E311508D4A2F5BA9DB89BA7.current-model-intern-handbook.pdf",
          "https://cdn.videos.rollcall.com/files/HN-Best-Intern-Ever-FINAL.pdf",
          "https://policymemos.hks.harvard.edu/",
          "https://www.hks.harvard.edu/sites/default/files/Academic%20Dean%27s%20Office/communications_program/digital_resources/lb_revised_1_31_18_lb_how_to_pol_mem.pdf"
        ],
        tools: [
          "Congress.gov bill tracker + alerts",
          "Policy memo template (1–2 pages)",
          "Stakeholder call-notes template (who/what/ask/next step)",
          "Zotero (sources + citations)"
        ]
      }
    }
  },

  {
    id: "poli-192",
    code: "POLI 192",
    name: "Internship in Political Science",
    fullName: "POLI 192: Internship in Political Science",
    description: "Advanced practical experience in political science through internship placement.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "This is the ‘act like junior staff’ version: you should aim to own a project end-to-end (tracking an issue, building a briefing packet, summarizing stakeholder positions). It’s especially valuable for legislative-aide roles because it mirrors LC/LA workflows.",
      realWorldApplications: [
        "Own one policy area for a month: produce a briefing packet (issue background, pros/cons, stakeholders, recommendation)",
        "Prepare hearing support: questions for witnesses, a 1-page member brief, and post-hearing summary",
        "Create a simple ‘district impact’ dashboard (who benefits, where, program take-up, complaints themes)"
      ],
      learningOutcomes: [
        "Independently manage a policy workstream with check-ins and deliverables",
        "Translate complex sources (CRS, CBO, agency docs) into clear, actionable briefings",
        "Demonstrate reliability under ambiguity—core trait offices screen for in staff hires"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLz_S7xcU9ZCTrlaReSWCMQRu7grNsU-tm",
          "https://www.youtube.com/watch?v=1YZIm8FDIvA"
        ],
        websites: [
          "https://www.congress.gov/crs-product/R44491",
          "https://www.cbo.gov/publication/59084",
          "https://www.cbo.gov/cost-estimates/faqs",
          "https://policymemos.hks.harvard.edu/resources"
        ],
        tools: [
          "CBO cost-estimate reading checklist (baseline, scoring assumptions, major budget components)",
          "Issue tracker (stakeholders, bill numbers, deadlines, member position, risks)",
          "One-page briefing template (what it is / why it matters / what we recommend)"
        ]
      }
    }
  },
  {
    id: "pubp-092",
    code: "PUBP 092",
    name: "Internship in Public Policy",
    fullName: "PUBP 092: Internship in Public Policy",
    description: "Practical experience in public policy through internship placement.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Public-policy internships sharpen the implementation side that legislative aides must understand: agencies, budgets, program design, evaluation, and performance metrics. This is where you learn to ask: “How will this actually work, and how do we know it worked?”",
      realWorldApplications: [
        "Draft an implementation plan: timeline, responsible agency, staffing, reporting requirements, risks",
        "Build a simple evaluation plan using standard evidence concepts (outcomes, indicators, comparison, data limits)",
        "Write a policy memo that includes cost/benefit framing and measurement strategy"
      ],
      learningOutcomes: [
        "Understand program implementation constraints (capacity, compliance, data availability, incentives)",
        "Use credible evaluation concepts to assess whether a policy is effective",
        "Communicate policy tradeoffs clearly to non-technical decision-makers"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=BJR7lAEHR8o",
          "https://www.youtube.com/watch?v=1YZIm8FDIvA"
        ],
        websites: [
          "https://www.gao.gov/products/gao-21-404sp",
          "https://www.gao.gov/assets/gao-21-404sp.pdf",
          "https://www.cbo.gov/publication/59084",
          "https://www.epa.gov/evaluate/program-evaluation-resources",
          "https://policymemos.hks.harvard.edu/"
        ],
        tools: [
          "Logic model (inputs → activities → outputs → outcomes)",
          "GAO evaluation glossary (shared definitions)",
          "Simple KPI dashboard (Sheets/Excel)"
        ]
      }
    }
  },
  {
    id: "poli-200",
    code: "POLI 200",
    name: "Research Design in Political Science",
    fullName: "POLI 200: Research Design in Political Science",
    description: "Fundamentals of research design and methodology in political science.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative staff constantly evaluate claims (‘does this policy reduce X?’ ‘will this backfire?’). Research design trains you to judge evidence quality, spot weak causal claims, and build credible analyses—so your memos don’t rely on vibes or cherry-picked stats.",
      realWorldApplications: [
        "Turn a policy question into a testable research question + measurable outcomes",
        "Critique a study used in advocacy: identification strategy, confounders, generalizability, limits",
        "Write a short methods section for an office research memo (data, approach, threats to validity)"
      ],
      learningOutcomes: [
        "Distinguish causal inference vs correlation and identify common threats to validity",
        "Choose appropriate designs (case study, comparative, experiments/quasi-experiments, observational)",
        "Write clear research plans (question, theory, measures, data, method, limitations)"
      ],
      resources: {
        videos: [
          "https://ocw.mit.edu/courses/17-801-political-science-scope-and-methods-fall-2017/",
          "https://ocw.mit.edu/courses/17-tht-thesis-research-design-seminar-fall-2004/"
        ],
        websites: [
          "https://ocw.mit.edu/courses/17-801-political-science-scope-and-methods-fall-2017/pages/lecture-slides/",
          "https://ocw.mit.edu/courses/17-tht-thesis-research-design-seminar-fall-2004/pages/syllabus/"
        ],
        tools: [
          "Research design checklist (question → theory → measures → identification → robustness → limitations)",
          "Zotero (literature review workflow)",
          "Replication folder template (data / code / outputs)"
        ]
      }
    }
  },
  {
    id: "poli-210",
    code: "POLI 210",
    name: "Quantitative Analysis of Political Data, I",
    fullName: "POLI 210: Quantitative Analysis of Political Data, I",
    description: "Introduction to quantitative methods for analyzing political data.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Quant skills make you unusually valuable in legislative offices: you can quickly sanity-check claims, summarize district-level impacts, interpret polling, and create evidence-backed visuals. It’s a direct edge for policy staff roles, especially where data is used in oversight or messaging.",
      realWorldApplications: [
        "Analyze district data (demographics, unemployment, program uptake) and turn it into 2–3 charts for a member brief",
        "Evaluate a policy’s predicted impact using simple models + sensitivity checks",
        "Build a polling trend tracker and explain uncertainty (sampling error, mode effects, weighting)"
      ],
      learningOutcomes: [
        "Understand regression basics, uncertainty, and interpretation for real political datasets",
        "Clean and analyze datasets responsibly (missing data, measurement error, robustness)",
        "Communicate results clearly (tables/plots, limitations, what you can/can’t conclude)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL0n492lUg2sgSevEQ3bLilGbFph4l92gH",
          "https://www.youtube.com/channel/UCtrwX29xpuWc9y0-0PKrHSQ/playlists",
          "https://ocw.mit.edu/courses/17-871-political-science-laboratory-spring-2012/"
        ],
        websites: [
          "https://gov2001.hsites.harvard.edu/",
          "https://gking.harvard.edu/class/quantitative-social-science-methods-i-government-2001-and-e-200",
          "https://ocw.mit.edu/courses/17-871-political-science-laboratory-spring-2012/"
        ],
        tools: [
          "R (tidyverse) or Python (pandas) for analysis",
          "Jupyter / RStudio for reproducible notebooks",
          "Excel/Sheets for quick office-ready charts"
        ]
      }
    }
  },
  {
    id: "econ-104",
    code: "ECON 104",
    name: "Writing in Economics and Business",
    fullName: "ECON 104: Writing in Economics and Business",
    description: "Development of writing skills for economics and business contexts.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legislative staff writing is basically professional ‘econ/business writing’ applied to government: concise, decision-focused, and readable. This course upgrades your memos, one-pagers, stakeholder emails, and budget/impact write-ups—exactly what makes aides effective.",
      realWorldApplications: [
        "Write a 1-page decision memo with a clear recommendation and alternatives",
        "Rewrite a technical analysis into plain language for constituents or press staff",
        "Produce a short ‘cost/impact’ section using credible budget language and careful claims"
      ],
      learningOutcomes: [
        "Write concise, structured professional documents (memos, briefs, emails) with clear purpose and audience",
        "Edit for clarity: stronger topic sentences, active voice, and tighter organization",
        "Apply style guidance that matches real government and professional standards"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=aHuxhCD8zoM",
          "https://www.youtube.com/watch?v=kohd3O9mE1I"
        ],
        websites: [
          "https://www.hks.harvard.edu/sites/default/files/Academic%20Dean%27s%20Office/communications_program/digital_resources/lb_revised_1_31_18_lb_how_to_pol_mem.pdf",
          "https://policymemos.hks.harvard.edu/",
          "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/memos/index.html",
          "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/memos/format.html",
          "https://digital.gov/guides/plain-language",
          "https://www.govinfo.gov/content/pkg/GPO-STYLEMANUAL-2016/pdf/GPO-STYLEMANUAL-2016.pdf",
          "https://www.archives.gov/open/plain-writing/10-principles.html"
        ],
        tools: [
          "Policy memo template (problem → options → recommendation)",
          "Plain-language checklist (reader-first, active voice, short sentences)",
          "GPO Style Manual for official formatting consistency"
        ]
      }
    }
  },
  {
    id: "engr-156",
    code: "ENGR 156",
    name: "Technical and Professional Writing for Scientists and Engineers",
    fullName: "ENGR 156: Technical and Professional Writing for Scientists and Engineers",
    description:
      "Technical and professional writing skills for scientific and engineering contexts.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Even in government/legislative work, your advantage comes from writing like an engineer: clear structure, verifiable claims, good visuals/tables, and decision-ready recommendations. This course upgrades memos, one-pagers, reports, and stakeholder updates so they’re readable, credible, and fast to review.",
      realWorldApplications: [
        "Turn a complex technical/agency report into a 1-page executive brief with key takeaways and risks",
        "Write implementation-ready documentation: assumptions, requirements, constraints, and measurement plan",
        "Create a professional appendix: methods, definitions, limitations, and reproducibility notes",
      ],
      learningOutcomes: [
        "Write clearer technical documents (audience, purpose, structure, flow, headings, abstracts)",
        "Synthesize sources correctly (paraphrase, quote, cite; avoid plagiarism; build literature-style summaries)",
        "Improve style and clarity (active voice, concise sentences, strong topic sentences, consistent terminology)",
        "Produce professional deliverables: reports, proposals, documentation, and polished visuals/tables",
      ],
      resources: {
        videos: [
          "https://developers.google.com/tech-writing", // Google's free Technical Writing courses (TWI + TWII)
          "https://www.youtube.com/watch?v=e0-RDifJHu4", // Google Technical Writing course intro video
          "https://www.youtube.com/playlist?list=PLjfhqpVdH5edOZiUX72TbXhQpu9TiN9Vj", // Google tech writing course playlist
          "https://ocw.mit.edu/courses/21w-794-graduate-technical-writing-workshop-january-iap-2019/", // MIT OCW: Graduate Technical Writing Workshop
          "https://online.stanford.edu/courses/som-y0010-writing-sciences", // Stanford Online: Writing in the Sciences (free access options vary)
          "https://www.coursera.org/learn/sciwrite", // Coursera: Writing in the Sciences (Stanford)
        ],
        websites: [
          "https://ocw.mit.edu/courses/21w-794-graduate-technical-writing-workshop-january-iap-2019/",
          "https://developers.google.com/tech-writing",
          "https://ocw.mit.edu/courses/2-000-how-and-why-machines-work-spring-2002/6fab0225dee490af7eca58e677ec84cd_technicalwriting_fixed.pdf",
          "https://eps.ieee.org/images/files/mc-ieee_author_guide_interactive.pdf",
          "https://ias.ieee.org/wp-content/uploads/2023/06/2020-01-16_IET_Technical_Report_Writing_Guidelines.pdf",
        ],
        tools: [
          "Google Docs / Microsoft Word (Track Changes + commenting workflows)",
          "Zotero (source manager for technical reports)",
          "Grammarly or LanguageTool (editing support)",
          "Hemingway Editor (clarity + sentence tightening)",
          "Overleaf (LaTeX) for technical reports (optional)",
          "Vale (style linter) for consistent documentation tone (optional)",
        ],
      },
    },
  },
];

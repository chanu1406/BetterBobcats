/**
 * Journalism / Political Communications Tier Courses Data
 * Course recommendations organized by tier for Journalism / Political Communications career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Journalism / Political Communications roles
 */
export const tier1Courses: TierCourse[] = [
  {
    "id": "poli-227",
    "code": "POLI 227",
    "name": "Media and Politics",
    "fullName": "POLI 227: Media and Politics",
    "description": "Examines the role of mass media in politics, including political communication, media effects, and how media shapes campaigns, elections, and governance.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "GovRel and advocacy depend on shaping policy narratives and managing stakeholder attention. This course strengthens your ability to diagnose information ecosystems (earned media, paid media, social platforms), anticipate framing battles, and design message + media strategies that support legislative/regulatory wins while reducing reputational risk.",
      "realWorldApplications": [
        "Build an earned-media and digital strategy for a bill: target key committee districts, align messaging to likely frames (cost, safety, equity), and produce spokesperson guidance + FAQs for hostile interviews.",
        "Run a rapid-response workflow: monitor coverage, detect misinformation/agenda shifts, and ship same-day corrective memos + coalition talking points.",
        "Create a stakeholder-facing narrative package (one-pager, op-ed draft, hearing prep) that ties evidence to a specific policy ask and a clear decision timeline."
      ],
      "learningOutcomes": [
        "Apply agenda-setting, framing, and priming to predict how media dynamics can accelerate or stall policy momentum.",
        "Evaluate incentives and constraints across legacy news, partisan media, and social platforms—and choose advocacy tactics that fit each.",
        "Design message architectures (problem definition, evidence, values frame, policy ask) and test them against counter-framing.",
        "Identify and mitigate comms risks (mis/disinformation, backlash, polarization) with concrete response plans."
      ],
      "resources": {
        "videos": [
          "https://www.hks.harvard.edu/courses/political-communication-breakdown-causes-consequences-and-solutions",
          "https://www.youtube.com/watch?v=7ctDcrEkHQo",
          "https://www.youtube.com/playlist?list=PLLYSLEw1Axd9RSo6gX5mgR3MULRtVINxu"
        ],
        "websites": [
          "https://www.congress.gov/",
          "https://www.fec.gov/",
          "https://www.federalregister.gov/"
        ],
        "tools": [
          "https://www.gdeltproject.org/",
          "https://www.quorum.us/",
          "https://www.fiscalnote.com/"
        ]
      }
    }
  },
  {
    "id": "poli-125",
    "code": "POLI 125",
    "name": "Public Opinion",
    "fullName": "POLI 125: Public Opinion",
    "description": "Examines the nature and origins of public opinion and its political consequences.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advocacy/GovRel teams must prove what constituents and stakeholders actually think, separate signal from noisy polls, and craft persuasion strategies for “moveable” audiences. This course supports message testing, coalition targeting, and policymaker memos grounded in credible opinion evidence.",
      "realWorldApplications": [
        "Commission and interpret polling for a policy push: evaluate sampling, wording effects, and uncertainty before briefing policymakers or donors.",
        "Segment persuadable audiences and map them to districts/committees to prioritize meetings, grasstops, and constituent activation.",
        "Write an opinion-driven strategy memo: top frames, expected opposition narratives, and which audiences to mobilize vs. persuade."
      ],
      "learningOutcomes": [
        "Explain how opinions form (identity, information, elites, group cues) and how that affects persuasion and mobilization tactics.",
        "Critique polling quality (question wording, sampling, mode effects, nonresponse) to avoid strategic mistakes in campaigns.",
        "Translate survey findings into actionable advocacy decisions (targets, messaging, coalition composition, timing).",
        "Connect opinion shifts to policy windows and agenda-setting opportunities."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/17-20-introduction-to-the-american-political-process-fall-2020/",
          "https://ocw.mit.edu/courses/17-20-introduction-to-the-american-political-process-fall-2020/pages/lecture-slides/",
          "https://www.youtube.com/watch?v=Nt5i4qUmy84"
        ],
        "websites": [
          "https://electionstudies.org/",
          "https://www.pewresearch.org/",
          "https://gss.norc.org/"
        ],
        "tools": [
          "https://www.qualtrics.com/",
          "https://www.r-project.org/",
          "https://www.datawrapper.de/"
        ]
      }
    }
  },
  {
    "id": "poli-120",
    "code": "POLI 120",
    "name": "Voting Behavior, Campaigns, and Elections",
    "fullName": "POLI 120: Voting Behavior, Campaigns, and Elections",
    "description": "Covers voting behavior, voter turnout, campaign strategies, and election outcomes.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "GovRel and advocacy campaigns often run parallel to elections: coalition positioning, endorsement strategy, district targeting, turnout/mobilization partnerships, and anticipating post-election committee control. This course helps you plan around political incentives and electoral realities without guessing.",
      "realWorldApplications": [
        "Build a district/committee targeting plan: identify persuadable legislators and electoral vulnerabilities that affect negotiating leverage.",
        "Design a coalition mobilization strategy tied to election calendars (primaries, filing deadlines, legislative recesses) and candidate incentives.",
        "Create an opposition research + narrative map focused on issue positions, donor networks, and constituency pressures relevant to your policy ask."
      ],
      "learningOutcomes": [
        "Analyze drivers of turnout and vote choice and connect them to realistic mobilization and persuasion tactics.",
        "Evaluate campaign strategy tradeoffs (resource allocation, targeting, messaging, field vs. media) relevant to advocacy partnerships.",
        "Use election and campaign-finance data to support stakeholder strategy and credibility in policymaker-facing materials.",
        "Anticipate how election outcomes alter committee control, agenda priorities, and policy windows."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/17-20-introduction-to-the-american-political-process-fall-2020/",
          "https://ocw.mit.edu/courses/17-251-congress-and-the-american-political-system-i-fall-2016/",
          "https://ocw.mit.edu/courses/17-251-congress-and-the-american-political-system-i-fall-2016/pages/lecture-notes/"
        ],
        "websites": [
          "https://api.open.fec.gov/",
          "https://electionlab.mit.edu/data",
          "https://www.congress.gov/"
        ],
        "tools": [
          "https://api.open.fec.gov/",
          "https://legiscan.com/",
          "https://openstates.org/"
        ]
      }
    }
  },
  {
    "id": "cres-101",
    "code": "CRES 101",
    "name": "Race and the Media",
    "fullName": "CRES 101: Race and the Media",
    "description": "Studies representations of race and its intersections with gender and sexuality in film and other popular media.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Modern GovRel and advocacy operate in identity-salient environments where representation, equity frames, and community trust shape coalition stability and political feasibility. This course helps you anticipate how messages land across communities and how media narratives influence policymaker risk calculations.",
      "realWorldApplications": [
        "Audit a campaign’s messaging for unintended harms: identify stereotypes, exclusionary framing, or language that undermines coalition partners and propose safer alternatives.",
        "Prepare testimony and public comments that incorporate equity impacts and community narratives without tokenizing communities.",
        "Develop a stakeholder map that includes community media, trusted messengers, and narrative risks (backlash, misinterpretation, selective amplification)."
      ],
      "learningOutcomes": [
        "Analyze how media representations shape public understanding of race and intersecting identities—and how that influences policy debates.",
        "Detect common narrative patterns (criminalization, erasure, moral panic, respectability politics) and explain their political effects.",
        "Design communications that are culturally competent, coalition-safe, and resilient to misframing.",
        "Evaluate media artifacts using evidence-based critique rather than intuition."
      ],
      "resources": {
        "videos": [
          "https://criticalmediaproject.org/",
          "https://annenberg.usc.edu/research/critical-media-project",
          "https://www.youtube.com/harvardiop"
        ],
        "websites": [
          "https://criticalmediaproject.org/",
          "https://www.mediacloud.org/",
          "https://colorofchange.org/resources/"
        ],
        "tools": [
          "https://www.mediacloud.org/",
          "https://www.gdeltproject.org/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "eng-001",
    "code": "ENG 001",
    "name": "Introduction to Environmental Communications",
    "fullName": "ENG 001: Introduction to Environmental Communications",
    "description": "Introduces basics of ecology and climate change, scientific methods, environmental justice, and principles of effective environmental communications.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Environmental and climate policy fights are heavily communications-driven (rulemaking comments, coalition messaging, local stakeholder engagement, risk communication). This course builds the ability to translate technical claims into credible narratives and policy asks across agencies, legislators, and community stakeholders.",
      "realWorldApplications": [
        "Draft a persuasive rulemaking comment that translates technical evidence into clear harms/benefits, implementation details, and a specific requested change.",
        "Design a community-facing message plan for a controversial project (air quality, water, zoning): choose trusted messengers, avoid panic framing, and set feedback loops.",
        "Build an advocacy dashboard that tracks environmental indicators and maps impacts to districts and vulnerable communities to support meetings and testimony."
      ],
      "learningOutcomes": [
        "Translate environmental science into accessible policy communications without distorting uncertainty or evidence.",
        "Use environmental justice and stakeholder analysis to design messaging that is locally credible and coalition-compatible.",
        "Select appropriate formats (briefs, testimony, comments, fact sheets) matched to decision points in legislative and regulatory processes.",
        "Evaluate claims and sources to prevent reputational risk from weak or misleading evidence."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=6pWcukKssrg",
          "https://www.youtube.com/watch?v=jP6wCgc-228",
          "https://www.youtube.com/watch?v=AwRnC3hP1_g"
        ],
        "websites": [
          "https://www.ipcc.ch/reports/",
          "https://www.climate.gov/",
          "https://www.regulations.gov/"
        ],
        "tools": [
          "https://www.datawrapper.de/",
          "https://storymaps.arcgis.com/",
          "https://www.regulations.gov/commenting-guidance"
        ]
      }
    }
  },
  {
    "id": "eng-050",
    "code": "ENG 050",
    "name": "Readings in Close Reading",
    "fullName": "ENG 050: Readings in Close Reading",
    "description": "Develops close-reading skills through intensive analysis of texts, emphasizing argument, evidence, and interpretation.",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advocacy/GovRel is document-heavy: bills, committee analyses, fiscal notes, regs, court decisions, and stakeholder letters. Close reading is a career skill for spotting the real decision hooks, hidden constraints, definitional traps, and the exact language you must amend or defend.",
      "realWorldApplications": [
        "Mark up a bill or regulation to identify operative clauses, defined terms, delegation/authority boundaries, and amendment opportunities.",
        "Extract the strongest evidence from long reports and convert it into a hearing prep packet (claims → citations → anticipated questions).",
        "Write a coalition memo that reconciles conflicting stakeholder language into a single, precise policy position."
      ],
      "learningOutcomes": [
        "Identify how structure, definitions, and rhetorical choices shape what a text actually commits a decision-maker to do.",
        "Distinguish claims, assumptions, evidence, and implications—then translate that into actionable policy edits or strategy.",
        "Summarize complex texts into decision-ready briefs without losing key conditions or exceptions.",
        "Develop annotation and citation workflows that support credibility under scrutiny."
      ],
      "resources": {
        "videos": [
          "https://oyc.yale.edu/english/engl-300/lecture-1",
          "https://www.youtube.com/playlist?list=PLD00D35CBC75941BD",
          "https://oyc.yale.edu/english/engl-300"
        ],
        "websites": [
          "https://owl.purdue.edu/",
          "https://oyc.yale.edu/",
          "https://www.zotero.org/"
        ],
        "tools": [
          "https://hypothes.is/",
          "https://www.perusall.com/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "eng-130",
    "code": "ENG 130",
    "name": "Writing to Save the Planet",
    "fullName": "ENG 130: Writing to Save the Planet",
    "description": "Engages students in reading and creating texts that urge action to address environmental crises, drawing on genres such as environmental writing, climate justice, and narratives of ecological disaster/renewal. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69571",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly builds advocacy-grade writing and messaging for environmental policy campaigns—public comments on rules, coalition messaging, op-eds, and stakeholder-facing narratives that move decision-makers (agencies, legislators, and the public).",
      "realWorldApplications": [
        "Draft and submit a rulemaking comment (with evidence + narrative framing) on a proposed environmental regulation; align claims to agency authority and the public record.",
        "Create a multi-audience advocacy package (1-page leave-behind + op-ed + social copy) tailored to a committee hearing moment and coalition partners."
      ],
      "learningOutcomes": [
        "Translate complex climate/environment evidence into persuasive, audience-specific advocacy writing that anticipates counterframes and policy constraints.",
        "Design narrative strategies (values, messengers, tone, structure) that support coalition goals and measurable policy outcomes (e.g., amendments, implementation changes)."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/@YaleClimateCommunication",
          "https://www.youtube.com/playlist?list=PLVC5RXohm34V9PG0hJIn_nM-vHRvcCWLA",
          "https://www.youtube.com/watch?v=xaOIGl3Ir1g"
        ],
        "websites": [
          "https://www.ipcc.ch/reports/",
          "https://www.noaa.gov/education/resource-collections/climate",
          "https://science.nasa.gov/earth/multimedia/earth-minute/"
        ],
        "tools": [
          "https://www.regulations.gov/",
          "https://www.federalregister.gov/",
          "https://storymaps.arcgis.com/"
        ]
      }
    }
  },
  {
    "id": "ph-103",
    "code": "PH 103",
    "name": "Health Communication",
    "fullName": "PH 103: Health Communication",
    "description": "Introduces the science and practice of health communication, including essentials of effective health communication and social marketing, reaching target audiences, developing/testing messages, and evaluating campaign impact. Sources: https://catalog.ucmerced.edu/content.php?catoid=24&catoid=24&filter%5B3%5D=1&filter%5Bcpage%5D=20&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&navoid=2732 ; https://teach.ucmerced.edu/sites/g/files/ufvvjh1831/f/page/documents/ph103_f21_syllabus_08042021.pdf",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Core skill set for health-policy advocacy and government relations: audience research, message testing, coalition-ready talking points, and campaign evaluation—useful for shaping legislative narratives, agency guidance rollouts, and public support.",
      "realWorldApplications": [
        "Build a stakeholder messaging plan for a health policy bill (committee-targeted framing, constituent-facing narrative, earned media angles, and partner toolkits).",
        "Design and run message testing (survey/rapid A-B) to choose the strongest framing for a public health rule or funding request, then define evaluation metrics."
      ],
      "learningOutcomes": [
        "Apply health communication and social marketing frameworks to develop strategy from formative research through implementation and evaluation.",
        "Critically assess health messages for effectiveness, ethics, and equity impacts (including how structural factors shape reach and trust)."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLilBZYJvG-PzrTDc46EJat92nJS9J_0Ex",
          "https://www.youtube.com/watch?v=Rmz6BFvgEWU",
          "https://www.youtube.com/watch?v=ym4GGyqSTq4"
        ],
        "websites": [
          "https://www.cdc.gov/healthliteracy/",
          "https://www.who.int/teams/risk-communication",
          "https://www.thecommunityguide.org/"
        ],
        "tools": [
          "https://stacks.cdc.gov/view/cdc/5764",
          "https://www.qualtrics.com/",
          "https://www.hootsuite.com/"
        ]
      }
    }
  },
  {
    "id": "ph-104",
    "code": "PH 104",
    "name": "Health and the Media",
    "fullName": "PH 104: Health and the Media",
    "description": "Examines media influence on health and health disparities, including how health topics are covered across news, entertainment, and social media and how this shapes knowledge, attitudes, and behavior. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68792&print=",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly supports GovRel work where media narratives shape policy windows: monitoring issue attention, responding to misinformation, preparing spokespeople, and aligning comms strategy with legislative/regulatory timelines and coalition objectives.",
      "realWorldApplications": [
        "Run a media-framing audit on a health policy issue (e.g., vaccine mandates, opioids, Medicaid) to identify dominant frames, gaps, and the best counter-messaging for policymakers.",
        "Build a rapid-response playbook for a misinformation surge affecting a live policy effort (message map, trusted messengers, channel plan, and evaluation KPIs)."
      ],
      "learningOutcomes": [
        "Analyze how media ecosystems shape health beliefs, trust, and disparities, and how those dynamics influence policy feasibility.",
        "Design evidence-based communication interventions to counter misinformation and improve public understanding while managing political and ethical tradeoffs."
      ],
      "resources": {
        "videos": [
          "https://videocast.nih.gov/watch=49265",
          "https://www.youtube.com/watch?v=JEHOz3VwVjA",
          "https://www.youtube.com/watch?v=n4ga1YzwWNY"
        ],
        "websites": [
          "https://www.kff.org/health-information-trust/volume-01/",
          "https://hsph.harvard.edu/research/health-communication/",
          "https://digitalmedic.stanford.edu/health-education-library"
        ],
        "tools": [
          "https://www.gdeltproject.org/",
          "https://mediacloud.org/",
          "https://trends.google.com/"
        ]
      }
    }
  },
  {
    "id": "hist-052",
    "code": "HIST 052",
    "name": "Power in Film",
    "fullName": "HIST 052: Power in Film",
    "description": "Explores the power of cinema—especially popular film—asking how movies construct stories about the past and present and how films engage with issues of power. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69524",
    "tier": 1,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advocacy and GovRel increasingly rely on visual storytelling (ads, documentary clips, social video) to set agendas and mobilize constituents; this course builds the ability to analyze persuasion, ideology, and representation in film—critical for campaign strategy and coalition communications.",
      "realWorldApplications": [
        "Deconstruct a political/issue ad or documentary segment to identify persuasion techniques (framing, editing, music, character construction) and turn that into a messaging brief for a campaign team.",
        "Storyboard and script a 60–90 second advocacy video for a legislative push (committee moment), with a distribution plan and ethical guardrails."
      ],
      "learningOutcomes": [
        "Identify how cinematic form (editing, mise-en-scène, sound, narrative structure) produces political meaning and shapes audience beliefs about power.",
        "Critique representation and agenda-setting in visual media and apply that analysis to ethical advocacy storytelling and campaign communications."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP63wurgwdJKo6UEYBWDLnmCj",
          "https://www.youtube.com/watch?v=iwpLrP5bk7w",
          "https://www.youtube.com/bfi/videos"
        ],
        "websites": [
          "https://www.pbs.org/pov/resources/",
          "https://www.loc.gov/collections/national-screening-room/about-this-collection/",
          "https://www.archives.gov/research/motion-pictures"
        ],
        "tools": [
          "https://www.blackmagicdesign.com/products/davinciresolve",
          "https://www.studiobinder.com/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses for Journalism / Political Communications roles
 */
export const tier2Courses: TierCourse[] = [
  {
    "id": "poli-171",
    "code": "POLI 171",
    "name": "Politics and Film",
    "fullName": "POLI 171: Politics and Film",
    "description": "Considers whether politics as portrayed on film differs from political reality as understood through political science.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Directly useful for advocacy and government relations because modern influence work is narrative work: understanding framing, persuasion, symbolism, and public legitimacy through film helps you craft messaging, anticipate backlash, and shape stakeholder perception.",
      "realWorldApplications": [
        "Design narrative strategy for a campaign (framing, protagonists/antagonists, moral stakes) and translate it into earned media, ad concepts, and coalition storytelling that aligns with legislative or regulatory goals.",
        "Run a “message opposition research” workflow: analyze how an issue is depicted in popular media/documentaries, predict which frames will dominate hearings/press, and pre-bunk with fact sheets and spokesperson prep."
      ],
      "learningOutcomes": [
        "Break down political narratives in visual media into frames, causal stories, villains/victims, and policy solutions—and predict how audiences will generalize these to real-world institutions.",
        "Develop a repeatable media-analysis memo style (claim → evidence → frame → target audience → counter-frame) that’s usable in GovRel briefing books."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/21l-011-the-film-experience-fall-2013/",
          "https://www.youtube.com/watch?v=xPjP96MnkME",
          "https://www.youtube.com/watch?v=1JwVzRTU20Y",
          "https://www.youtube.com/watch?v=bUsaYi5MyXc",
          "https://www.youtube.com/watch?v=X86s94ylybQ"
        ],
        "websites": [
          "https://www.pewresearch.org/",
          "https://www.gdeltproject.org/",
          "https://mediacloud.org/"
        ],
        "tools": [
          "https://www.quorum.us/",
          "https://fiscalnote.com/",
          "https://www.datawrapper.de/"
        ]
      }
    }
  },
  {
    "id": "poli-123",
    "code": "POLI 123",
    "name": "Political Psychology",
    "fullName": "POLI 123: Political Psychology",
    "description": "Introduces political cognition, examining political attitudes and behavior using research from psychology.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Political psychology is core to persuasion, coalition-building, and legislative/regulatory strategy: it explains attitude formation, motivated reasoning, identity threats, and what actually moves decision-makers and the public.",
      "realWorldApplications": [
        "Build a persuasion plan for a bill/regulation: segment audiences (base, persuadables, elites), identify identity-based threats, and craft messages that reduce reactance while increasing trust.",
        "Design and interpret quick A/B tests for advocacy messaging (email subject lines, landing pages, talking points) to choose frames that increase support among key constituencies."
      ],
      "learningOutcomes": [
        "Explain political behavior using core mechanisms (identity, emotion, heuristics, motivated reasoning) and translate those into messaging and stakeholder strategy.",
        "Evaluate polling/experiments critically (measurement, sampling, treatment effects) so you don’t over-trust noisy “public opinion” signals in GovRel decisions."
      ],
      "resources": {
        "videos": [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68702",
          "https://www.youtube.com/watch?v=Nt5i4qUmy84",
          "https://www.youtube.com/watch?v=YnAvoN4J8Gg",
          "https://www.youtube.com/watch?v=fQ2LZ9w7J0g"
        ],
        "websites": [
          "https://electionstudies.org/",
          "https://www.gallup.com/",
          "https://www.pewresearch.org/politics/"
        ],
        "tools": [
          "https://www.qualtrics.com/",
          "https://www.r-project.org/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "poli-127",
    "code": "POLI 127",
    "name": "Race, Gender, and Politics",
    "fullName": "POLI 127: Race, Gender, and Politics",
    "description": "Contemporary and historical identity politics in the U.S., focusing on the importance of race and gender in political life.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advocacy and GovRel often succeed or fail on legitimacy and coalition politics. This course strengthens your ability to navigate identity-based interests, equity impacts, mobilization dynamics, and communication risk in policymaking.",
      "realWorldApplications": [
        "Prepare equity-centered legislative strategy: map impacted constituencies, anticipate distributional harms, and craft coalition agreements and testimony that withstand political scrutiny.",
        "Run a “stakeholder risk” assessment for a policy proposal: identify identity-linked opposition frames, likely messengers, and mitigation steps (language choices, amendments, targeted outreach)."
      ],
      "learningOutcomes": [
        "Analyze how race and gender shape political participation, representation, policy outcomes, and agenda-setting—and apply those insights to coalition strategy.",
        "Communicate policy positions with higher precision and lower reputational risk by understanding identity-based frames and backlash dynamics."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=0Gb0E5WvGTo",
          "https://www.youtube.com/watch?v=8B1kzS6kKQ0",
          "https://www.youtube.com/watch?v=V0dA3k2w0bY",
          "https://www.youtube.com/watch?v=2b6l3oZgC3Y"
        ],
        "websites": [
          "https://www.census.gov/",
          "https://www.justice.gov/crt/voting-section",
          "https://www.eeoc.gov/"
        ],
        "tools": [
          "https://www.openstates.org/",
          "https://www.legiscan.com/",
          "https://www.arcgis.com/"
        ]
      }
    }
  },
  {
    "id": "cres-052",
    "code": "CRES 052",
    "name": "Power in Film",
    "fullName": "CRES 052: Power in Film",
    "description": "Explores the power of cinema for popular audiences and how movies tell stories of the past and present.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "HelIghtly aligned with advocacy/GovRel because public legitimacy is shaped by culture: film influences issue salience, stereotypes, blame, and who is seen as a credible policy stakeholder.",
      "realWorldApplications": [
        "Build a cultural-framing memo for an advocacy campaign: identify dominant portrayals of an issue/community in popular media and design counter-framing using trusted messengers.",
        "Audit campaign media for representational harm (imagery, language, implied causality) before launch to reduce coalition friction and reputational damage."
      ],
      "learningOutcomes": [
        "Identify how cinematic techniques and narrative conventions create political meaning (who gets agency, who gets blamed, what solutions feel ‘natural’).",
        "Translate cultural analysis into practical comms guidance for advocacy (message dos/don’ts, spokesperson strategy, coalition alignment)."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/21l-011-the-film-experience-fall-2013/",
          "https://www.youtube.com/watch?v=bUsaYi5MyXc",
          "https://www.youtube.com/watch?v=X86s94ylybQ",
          "https://www.youtube.com/watch?v=PNhsqdp5EdM"
        ],
        "websites": [
          "https://www.loc.gov/collections/national-screening-room/about-this-collection/",
          "https://www.archives.gov/research/motion-pictures",
          "https://mediacloud.org/"
        ],
        "tools": [
          "https://www.nvivobyqsr.com/",
          "https://www.otter.ai/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
  {
    "id": "eng-131",
    "code": "ENG 131",
    "name": "Form and Formality",
    "fullName": "ENG 131: Form and Formality",
    "description": "Explores literary form and rhetorical choices that shape meaning, style, and audience interpretation.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advocacy and GovRel are writing-heavy: comment letters, testimony, memos, coalition statements, and op-eds. This course improves your ability to control tone, structure, and persuasion under real constraints (audience, risk, and record).",
      "realWorldApplications": [
        "Write a rulemaking comment letter with a deliberate structure (legal hook → evidence → impacts → specific asks) and a tone calibrated to agency norms and the administrative record.",
        "Draft two versions of the same policy message—one for internal GovRel decision-makers and one for a public coalition—optimizing formality, readability, and persuasive sequencing."
      ],
      "learningOutcomes": [
        "Choose and justify rhetorical forms (memo, testimony, op-ed, comment letter) based on audience incentives, institutional context, and reputational risk.",
        "Edit for clarity and power: remove ambiguity, strengthen claims with evidence scaffolding, and keep tone consistent with high-stakes policy environments."
      ],
      "resources": {
        "videos": [
          "https://oyc.yale.edu/english/engl-300",
          "https://www.youtube.com/watch?v=RZ8V8zYQ9qE",
          "https://www.youtube.com/watch?v=6Wl6fK8d2rY",
          "https://www.youtube.com/watch?v=K8b8qGk1zH0"
        ],
        "websites": [
          "https://www.plainlanguage.gov/",
          "https://www.federalregister.gov/",
          "https://www.regulations.gov/"
        ],
        "tools": [
          "https://www.zotero.org/",
          "https://www.grammarly.com/",
          "https://hemingwayapp.com/"
        ]
      }
    }
  },
  {
    "id": "eng-170",
    "code": "ENG 170",
    "name": "English Linguistics",
    "fullName": "ENG 170: English Linguistics",
    "description": "Examines how present-day English works—from sounds to words to sentences to discourse—and how English varies across contexts.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "GovRel success depends on language choices: framing, ambiguity control, inclusive language, and audience adaptation. Linguistics helps you craft messaging that’s clearer, less polarizing, and more effective across communities and institutions.",
      "realWorldApplications": [
        "Rewrite policy messaging for multiple audiences (agency staff, legislative aides, grassroots supporters) using discourse and pragmatics to reduce misinterpretation and conflict.",
        "Analyze opponents’ talking points to identify presuppositions, implicatures, and framing terms—then produce counters that shift meaning without sounding evasive."
      ],
      "learningOutcomes": [
        "Explain how wording changes meaning (connotation, register, presupposition, discourse structure) and use that to improve advocacy documents.",
        "Apply variation and audience design to create messages that travel across coalitions while preserving the policy ‘ask’ accurately."
      ],
      "resources": {
        "videos": [
          "https://ocw.mit.edu/courses/24-900-introduction-to-linguistics-fall-2020/",
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP61MdtwGTqZA0MreSaDybji8",
          "https://www.youtube.com/watch?v=7pS5VYq9mKQ",
          "https://www.youtube.com/playlist?list=PLbMVogVj5nJQqX4rjJvGf5k9p3e1vWlKJ"
        ],
        "websites": [
          "https://www.plainlanguage.gov/",
          "https://www.merriam-webster.com/",
          "https://www.oed.com/"
        ],
        "tools": [
          "https://www.fon.hum.uva.nl/praat/",
          "https://www.laurenceanthony.net/software/antconc/",
          "https://www.zotero.org/"
        ]
      }
    }
  },

  {
    "id": "soc-120",
    "code": "SOC 120",
    "name": "Sociology of Culture",
    "fullName": "SOC 120: Sociology of Culture",
    "description": "Explores central themes in the sociology of culture, including relationships between cultural forms and social life.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Culture is the terrain of policy conflict: what people think is ‘normal,’ ‘fair,’ and ‘deserved’ shapes coalitions, media coverage, and legislator incentives. This course helps you map cultural narratives and leverage them responsibly in advocacy.",
      "realWorldApplications": [
        "Develop a stakeholder narrative map: identify competing cultural stories around an issue (deservingness, responsibility, freedom, safety) and choose frames that grow coalitions.",
        "Plan cultural strategy for a campaign (symbols, values language, community validators) to increase salience before a committee vote or rulemaking deadline."
      ],
      "learningOutcomes": [
        "Analyze how meanings, norms, and symbols shape institutions and political behavior—and convert that into actionable messaging and coalition decisions.",
        "Use cultural evidence (surveys, qualitative analysis, media narratives) without overgeneralizing—improving strategic judgment in GovRel."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=RJ-rYIu0Jp8",
          "https://www.youtube.com/watch?v=kA8Gd3V8y7w",
          "https://www.youtube.com/watch?v=5q8w7f5zq9A",
          "https://www.youtube.com/watch?v=YnAvoN4J8Gg"
        ],
        "websites": [
          "https://gss.norc.org/",
          "https://www.worldvaluessurvey.org/",
          "https://www.pewresearch.org/"
        ],
        "tools": [
          "https://kumu.io/",
          "https://gephi.org/",
          "https://www.datawrapper.de/"
        ]
      }
    }
  },

  {
    "id": "soc-110",
    "code": "SOC 110",
    "name": "Social Movements, Protest and Collective Action",
    "fullName": "SOC 110: Social Movements, Protest and Collective Action",
    "description": "Introduces the social scientific study of social protest, including non-routine collective action and its consequences.",
    "tier": 2,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advocacy is organized collective action. This course builds practical intuition for how movements form, sustain resources, choose tactics, influence institutions, and create policy windows—exactly what GovRel teams need for coalition ops and pressure strategy.",
      "realWorldApplications": [
        "Build a coalition operations plan: stakeholder mapping, recruitment pathways, escalation ladder (inside/outside tactics), and coordination rules for joint messaging and actions.",
        "Create a “policy window” playbook: identify triggers (events, hearings, deadlines), deploy rapid-response comms, and convert mobilization into specific legislative/regulatory asks."
      ],
      "learningOutcomes": [
        "Explain when and why collective action emerges (resources, political opportunities, framing) and use that to choose advocacy tactics that match context and risk.",
        "Design campaign strategy that integrates inside lobbying (meetings, amendments, testimony) with outside pressure (grassroots, media, coalition action) coherently."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/watch?v=w9P4p2m6u1Y",
          "https://www.youtube.com/watch?v=EPMtKkJp7kE",
          "https://www.youtube.com/watch?v=J0v4bQ6d9lQ",
          "https://www.youtube.com/watch?v=AI-3ixj6o_c"
        ],
        "websites": [
          "https://www.congress.gov/",
          "https://www.regulations.gov/",
          "https://www.opensecrets.org/"
        ],
        "tools": [
          "https://www.quorum.us/",
          "https://www.legiscan.com/",
          "https://openstates.org/"
        ]
      }
    }
  },
];

/**
 * 🟠 TIER 3: OPTIONAL
 * Additional courses that may be beneficial for Journalism / Political Communications roles
 */
export const tier3Courses: TierCourse[] = [
  {
    "id": "poli-174",
    "code": "POLI 174",
    "name": "Data Science and Government Affairs",
    "fullName": "POLI 174: Data Science and Government Affairs",
    "description": "Trains students to think critically about data, the patterns they reveal, and how to use data responsibly in government affairs contexts. Units: 4. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69911&print=",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "GovRel and advocacy teams increasingly win with evidence: issue briefs, district/state dashboards, coalition talking points backed by data, and rapid analysis for hearings, amendments, or rulemakings. This course builds the data literacy and analytic workflow needed to support persuasive, defensible policy strategy.",
      "realWorldApplications": [
        "Build an issue dashboard for a lobbying campaign (bill status, committee assignments, vote history, district demographics, stakeholder orgs) and turn it into a weekly GovRel briefing.",
        "Create a public-comment evidence packet: pull relevant datasets, visualize impacts, and write data-backed recommendations aligned to what agencies can legally consider in the administrative record."
      ],
      "learningOutcomes": [
        "Assess the quality and limits of political/government datasets (coverage, bias, missingness, definitions) and decide what claims you can and cannot make from them.",
        "Produce a reproducible analysis-to-brief workflow (clean → analyze → visualize → write) that supports policy memos, testimony prep, and coalition messaging."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP61ATaGTFcSp7bhogloD2wHP",
          "https://www.youtube.com/playlist?list=PLqHN6trxnsN58scVrxrzOILC0fIZkbChA",
          "https://www.youtube.com/playlist?list=PLxq_lXOUlvQAoWZEqhRqHNezS30lI49G-",
          "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/resources/lecture-13-video/"
        ],
        "websites": [
          "https://www.congress.gov/",
          "https://www.opensecrets.org/",
          "https://www.fec.gov/data/"
        ],
        "tools": [
          "https://openstates.org/",
          "https://www.rstudio.com/products/rstudio/",
          "https://www.datawrapper.de/"
        ]
      }
    }
  },
  {
    "id": "poli-175",
    "code": "POLI 175",
    "name": "Advanced Analysis of Political Data",
    "fullName": "POLI 175: Advanced Analysis of Political Data",
    "description": "Advanced application of social scientific methods to politics, emphasizing quantitative hypothesis testing with a particular focus on regression analysis. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68703",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Advocacy and government relations benefit from analysts who can quantify effects (policy impacts, persuasion lift, turnout shifts), separate signal from noise, and defend findings under scrutiny. This course supports data-backed targeting, credible messaging claims, and strategy decisions for campaigns, coalitions, and regulatory work.",
      "realWorldApplications": [
        "Run a regression-based persuasion analysis: estimate which messages or messengers move support among persuadable segments and translate results into a targeting plan for outreach and policymaker meetings.",
        "Evaluate policy impact claims (e.g., jobs, health outcomes, costs) by modeling outcomes with controls and producing a methods appendix that can survive stakeholder challenge."
      ],
      "learningOutcomes": [
        "Specify, estimate, and interpret regression models for political questions—connecting coefficients to real-world strategic decisions in GovRel/advocacy.",
        "Diagnose common pitfalls (confounding, multicollinearity, model dependence, overfitting) and communicate uncertainty honestly in policy briefs and testimony prep."
      ],
      "resources": {
        "videos": [
          "https://www.youtube.com/playlist?list=PLUl4u3cNGP61ATaGTFcSp7bhogloD2wHP",
          "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/resources/lecture-13-video/",
          "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/resources/lecture-6-regression-analysis/",
          "https://www.youtube.com/playlist?list=PLxq_lXOUlvQAoWZEqhRqHNezS30lI49G-",
          "https://www.icpsr.umich.edu/sites/icpsr/about/news-events/webinars-videos"
        ],
        "websites": [
          "https://electionstudies.org/",
          "https://gss.norc.org/",
          "https://www.census.gov/data.html"
        ],
        "tools": [
          "https://www.r-project.org/",
          "https://www.python.org/",
          "https://www.stata.com/"
        ]
      }
    }
  },
  {
    "id": "poli-092",
    "code": "POLI 092",
    "name": "Internship in Political Science",
    "fullName": "POLI 092: Internship in Political Science",
    "description": "Provides oversight and structure for a student internship related to political science; requires an original research paper or relevant product demonstrating how the internship advanced political science knowledge. Units: 1–4. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68201",
    "tier": 3,
    "expandedInfo": {
      "credits": 1,
      "careerRelevance": "This is the most direct pipeline into advocacy/lobbying/GovRel: you learn the day-to-day craft—tracking legislation, preparing meeting materials, writing memos, supporting coalitions, and producing real deliverables that matter to decision-makers.",
      "realWorldApplications": [
        "Legislative strategy support: track bills, committees, deadlines; draft a weekly tracker + next-steps memo for a GovRel team (who to meet, what to ask for, what amendments matter).",
        "Regulatory advocacy: draft or coordinate a comment letter (evidence, stakeholder sign-ons, specific requests), then create a post-submission plan (meetings, follow-up, coalition amplification)."
      ],
      "learningOutcomes": [
        "Operate a professional GovRel workflow: stakeholder mapping, meeting prep packets, follow-up logs, and internal decision memos that connect policy text to organizational goals.",
        "Produce a portfolio-grade product (policy brief, research memo, comment letter, coalition toolkit, or testimony packet) with defensible sourcing and clear recommendations."
      ],
      "resources": {
        "videos": [
          "https://www.congress.gov/legislative-process",
          "https://www.congress.gov/index.php/video",
          "https://www.youtube.com/playlist?list=PLugwVCjzrJsW3DI4aH4ChTeUgPHgM1szS",
          "https://www.youtube.com/watch?v=LPvweSFDrmI"
        ],
        "websites": [
          "https://www.congress.gov/",
          "https://www.regulations.gov/",
          "https://www.federalregister.gov/"
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
    "id": "eng-192",
    "code": "ENG 192",
    "name": "Internship in English",
    "fullName": "ENG 192: Internship in English",
    "description": "Applies classroom knowledge in a real-world setting through a supervised internship; units are awarded based on internship hours. Units: 1–4. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68628",
    "tier": 3,
    "expandedInfo": {
      "credits": 1,
      "careerRelevance": "High-impact advocacy/GovRel depends on writing: compelling one-pagers for legislative staff, comment letters, coalition statements, op-eds, talking points, and crisis communications. This internship can be tailored to produce real policy-writing deliverables under professional constraints.",
      "realWorldApplications": [
        "Write a full advocacy communications package for a policy push (one-pager, FAQ, op-ed draft, press release, spokesperson Q&A) and iterate it based on stakeholder and media feedback.",
        "Translate technical policy into plain-language materials for constituents (district handouts, coalition partner toolkits, testimony speaking notes) without losing legal/policy accuracy."
      ],
      "learningOutcomes": [
        "Adapt tone and structure to different policy audiences (legislative aides, agency staff, community groups, press) while keeping the policy ask precise and defensible.",
        "Build a repeatable editing system for advocacy writing: evidence scaffolding, claim discipline, risk-aware language, and message consistency across coalition partners."
      ],
      "resources": {
        "videos": [
          "https://www.congress.gov/legislative-process",
          "https://www.congress.gov/index.php/video",
          "https://www.youtube.com/playlist?list=PLugwVCjzrJsW3DI4aH4ChTeUgPHgM1szS",
          "https://www.youtube.com/watch?v=LPvweSFDrmI"
        ],
        "websites": [
          "https://www.plainlanguage.gov/",
          "https://www.regulations.gov/",
          "https://www.federalregister.gov/reader-aids/understanding-the-federal-register/related-resources"
        ],
        "tools": [
          "https://www.zotero.org/",
          "https://www.grammarly.com/",
          "https://hemingwayapp.com/"
        ]
      }
    }
  },

  {
    "id": "ph-196",
    "code": "PH 196",
    "name": "Internships in the Community",
    "fullName": "PH 196: Internships in the Community",
    "description": "Helps students apply classroom lessons as interns at community health organizations. Units: 4. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69746&print=",
    "tier": 3,
    "expandedInfo": {
      "credits": 4,
      "careerRelevance": "Many GovRel/advocacy tracks run through health and community policy (public health departments, hospital associations, nonprofits, environmental health). This internship builds on-the-ground stakeholder understanding and equips you to advocate credibly with community-informed evidence and coalition relationships.",
      "realWorldApplications": [
        "Community stakeholder mapping for a health policy issue: identify affected groups, local institutions, and messengers; produce an engagement plan that informs legislative/regulatory strategy.",
        "Prepare a policy-impact narrative: combine community data + qualitative insights into a brief used for meetings, testimony, or grant/policy proposals (problem → evidence → solution → measurable outcomes)."
      ],
      "learningOutcomes": [
        "Convert community-level observations into policy-relevant evidence and recommendations without overgeneralizing or losing ethical grounding.",
        "Coordinate cross-sector collaboration (community orgs, public agencies, healthcare systems) and translate needs into actionable policy asks and implementation considerations."
      ],
      "resources": {
        "videos": [
          "https://www.congress.gov/legislative-process",
          "https://www.youtube.com/watch?v=LPvweSFDrmI",
          "https://www.youtube.com/playlist?list=PLugwVCjzrJsW3DI4aH4ChTeUgPHgM1szS",
          "https://www.youtube.com/c/OGEInstitute/videos"
        ],
        "websites": [
          "https://www.cdc.gov/data/index.html",
          "https://data.cdc.gov/",
          "https://www.healthdata.gov/"
        ],
        "tools": [
          "https://www.arcgis.com/",
          "https://www.qgis.org/",
          "https://kumu.io/"
        ]
      }
    }
  },
  {
    "id": "soc-092",
    "code": "SOC 092",
    "name": "Internship in Sociology",
    "fullName": "SOC 092: Internship in Sociology",
    "description": "Provides oversight and structure for a sociology-related internship; requires an original research paper or relevant product showing how the internship advanced sociology knowledge. Units: 1–4. Source: https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68394&print=",
    "tier": 3,
    "expandedInfo": {
      "credits": 1,
      "careerRelevance": "Advocacy and GovRel are stakeholder ecosystems. A sociology internship sharpens how you read institutions, communities, and power—supporting coalition operations, public narrative strategy, and policy design that anticipates real implementation constraints.",
      "realWorldApplications": [
        "Coalition ops: build and maintain a stakeholder tracker (interests, influence, relationships, preferred asks), coordinate partner sign-ons, and produce a unified message guide for a policy campaign.",
        "Policy feedback loop: conduct structured interviews or rapid field research with impacted groups, synthesize findings into a decision memo, and propose amendments/implementation fixes before a hearing or rulemaking deadline."
      ],
      "learningOutcomes": [
        "Translate community and organizational research into GovRel-ready deliverables (stakeholder map, coalition plan, policy memo, testimony support) with clear evidence trails.",
        "Anticipate how institutions and social dynamics shape whether a policy will be supported, opposed, or quietly fail during implementation—and plan mitigation strategies."
      ],
      "resources": {
        "videos": [
          "https://www.congress.gov/legislative-process",
          "https://www.congress.gov/index.php/video",
          "https://www.youtube.com/watch?v=LPvweSFDrmI",
          "https://www.youtube.com/playlist?list=PLugwVCjzrJsW3DI4aH4ChTeUgPHgM1szS"
        ],
        "websites": [
          "https://www.opensecrets.org/",
          "https://openstates.org/",
          "https://www.census.gov/data.html"
        ],
        "tools": [
          "https://kumu.io/",
          "https://gephi.org/",
          "https://www.zotero.org/"
        ]
      }
    }
  },
];

/**
 * Law / Pre-Law Tier Courses Data
 * Course recommendations organized by tier for Law / Pre-Law career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE
 * Essential courses for Law / Pre-Law roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "poli-102",
    code: "POLI 102",
    name: "Judicial Politics",
    fullName: "POLI 102: Judicial Politics",
    description: "Explores how courts (especially the U.S. Supreme Court) function as political institutions—how judges decide, how cases reach courts, and how judicial rulings shape policy and society—building core intuition for pre-law case analysis and legal institutions.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law students benefit because modern legal practice constantly interacts with judicial behavior, institutional incentives, and litigation strategy. This course helps you read cases with an eye for doctrine *and* the political/institutional forces that influence outcomes, which strengthens law-school style reasoning and writing.",
      realWorldApplications: [
        "Understanding how certiorari, briefing, oral arguments, and opinions work—useful for internships in courts, policy orgs, or legal clinics.",
        "Analyzing how interest groups and litigators build test cases and shape legal change through strategic litigation."
      ],
      learningOutcomes: [
        "Explain how courts operate as institutions (agenda-setting, opinion formation, precedent, hierarchy).",
        "Evaluate competing models of judicial decision-making (legal, attitudinal, strategic).",
        "Apply judicial politics concepts to predict or interpret court outcomes and their policy effects."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLrnQ8eNnldr_yupEjT3Uz5HooDuV0P6-3",
          "https://www.youtube.com/watch?v=mWYFwl93uCM",
          "https://www.youtube.com/watch?v=hxmTAVFonmI"
        ],
        websites: [
          "https://open.oregonstate.education/open-judicial-politics/",
          "https://www.oyez.org/",
          "https://www.supremecourt.gov/oral_arguments/argument_audio.aspx"
        ],
        tools: ["Oyez", "SCOTUS Argument Audio (official)", "Cornell LII (cases/Constitution)"]
      }
    }
  },
  {
    id: "poli-110",
    code: "POLI 110",
    name: "Governmental Power and the Constitution",
    fullName: "POLI 110: Governmental Power and the Constitution",
    description: "Builds a foundation in constitutional structure—separation of powers, federalism, and the scope/limits of governmental authority—central for pre-law students aiming to understand how legal power is created, checked, and contested.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law work often turns on which institution has authority (Congress, President, agencies, courts) and what constitutional limits apply. This course makes you fluent in the basic architecture of U.S. governance so you can reason clearly about jurisdiction, powers, and constitutional arguments.",
      realWorldApplications: [
        "Assessing separation-of-powers disputes (executive orders, agency power, congressional oversight).",
        "Tracing how constitutional structure affects litigation, administrative law, and policy implementation."
      ],
      learningOutcomes: [
        "Identify the constitutional sources of legislative, executive, and judicial powers.",
        "Analyze federalism conflicts (state vs federal authority) and how courts resolve them.",
        "Connect constitutional structure to contemporary legal controversies and policy outcomes."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLSQl0a2vh4HBV_Yg4scoWR6Oj2Yxcn-me",
          "https://www.youtube.com/playlist?list=PLccU8xvoXu4R9jBtxLg0OzWRY2jEcGDxH",
          "https://www.youtube.com/watch?v=j3XKx8e1ZU0"
        ],
        websites: [
          "https://www.law.cornell.edu/constitution",
          "https://www.law.cornell.edu/wex/constitutional_law",
          "https://www.khanacademy.org/humanities/us-government-and-civics/us-gov-civil-liberties-and-civil-rights"
        ],
        tools: ["Cornell LII (U.S. Constitution + Wex)", "Khan Academy (practice modules)", "Congress.gov (statutes/legislation lookup)"]
      }
    }
  },
  {
    id: "poli-111",
    code: "POLI 111",
    name: "Liberty, Equality and the Constitution",
    fullName: "POLI 111: Liberty, Equality and the Constitution",
    description: "Focuses on how constitutional law defines and protects liberty and equality (civil liberties, civil rights, due process, equal protection)—exactly the substance that dominates many landmark cases and law school 1L constitutional law discussions.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law students need a strong grasp of constitutional rights frameworks—how courts reason about liberty, discrimination, and government constraints. This course strengthens your ability to brief cases, distinguish standards of review, and connect doctrine to real disputes.",
      realWorldApplications: [
        "Analyzing rights-based litigation (speech, religion, privacy, equal protection) and how arguments are structured.",
        "Understanding how the 14th Amendment reshaped rights against states (incorporation, due process, equality)."
      ],
      learningOutcomes: [
        "Explain key constitutional rights doctrines (due process, equal protection, incorporation).",
        "Compare frameworks courts use to evaluate rights claims and discrimination challenges.",
        "Apply constitutional principles to new fact patterns and predict legal arguments on both sides."
      ],
      resources: {
        videos: [
          "https://constitutioncenter.org/education/videos/constitution-101-14th-amendment",
          "https://www.youtube.com/watch?v=pQWWS3EOv24",
          "https://www.youtube.com/watch?v=Tsg6kSPK3aQ"
        ],
        websites: [
          "https://www.khanacademy.org/humanities/ap-us-government-and-politics/civil-liberties-and-civil-rights",
          "https://www.law.cornell.edu/wex/constitutional_law",
          "https://www.oyez.org/"
        ],
        tools: ["Oyez (case summaries + audio)", "Cornell LII (rights clauses + explanations)", "Constitution Center (rights explainers)"]
      }
    }
  },
  {
    id: "soc-107",
    code: "SOC 107",
    name: "Law and Society",
    fullName: "SOC 107: Law and Society",
    description: "Examines law as a social institution—how legal rules are created, enforced, and experienced in everyday life—giving pre-law students a sharper, real-world lens for understanding how legal systems actually operate beyond doctrine.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Great pre-law preparation because legal practice is about people, institutions, incentives, and unequal power—not just rules. This course strengthens your ability to think like a lawyer *and* like a social analyst, which helps in legal writing, client-centered reasoning, and policy-aware advocacy.",
      realWorldApplications: [
        "Understanding how policing, prosecution, courts, and sentencing shape social outcomes (and vice versa).",
        "Analyzing how norms, inequality, and culture influence legal compliance and dispute resolution."
      ],
      learningOutcomes: [
        "Explain major socio-legal concepts (legal consciousness, legitimacy, dispute processing).",
        "Analyze how law interacts with inequality (race, class, gender) and institutional power.",
        "Evaluate empirical claims about legal institutions using sociological reasoning."
      ],
      resources: {
        videos: [
          "https://ocw.mit.edu/courses/21a-219-law-and-society-spring-2003/",
          "https://www.youtube.com/watch?v=BGq9zW9w3Fw",
          "https://www.youtube.com/watch?v=a4bKynQYTBY"
        ],
        websites: [
          "https://ocw.mit.edu/courses/21a-219-law-and-society-spring-2003/",
          "https://ocw.mit.edu/courses/21a-219-law-and-society-spring-2003/pages/lecture-notes/",
          "https://www.law.cornell.edu/"
        ],
        tools: ["Zotero (research)", "Google Scholar (cases + socio-legal scholarship)", "MIT OCW (structured readings/notes)"]
      }
    }
  },
  {
    id: "phil-004",
    code: "PHIL 004",
    name: "Critical Reasoning",
    fullName: "PHIL 004: Critical Reasoning",
    description: "Trains you to analyze arguments with precision—identifying claims, assumptions, evidence, and fallacies—which directly maps to LSAT-style thinking and law-school briefing, memo writing, and oral argument skills.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Law is structured argument under constraints. Critical reasoning builds the habits that pre-law students need: separating conclusions from support, spotting hidden premises, and evaluating whether reasoning actually follows—core for the LSAT and for legal writing.",
      realWorldApplications: [
        "Writing stronger legal memos by structuring arguments clearly and anticipating counterarguments.",
        "Detecting fallacies and weak inference in briefs, negotiations, policy claims, and testimony."
      ],
      learningOutcomes: [
        "Identify argument structure (premises, conclusions, implicit assumptions).",
        "Distinguish deductive vs inductive strength and evaluate evidentiary support.",
        "Recognize common informal fallacies and fix weak reasoning in your own writing."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLtKNX4SfKpzU2ChXr_FNgQKvVZbf3CwhX",
          "https://www.youtube.com/playlist?list=PLtKNX4SfKpzWShEUtNiV1QhKG2cP9vbXg",
          "https://www.youtube.com/watch?v=vk4xLZv1V2w"
        ],
        websites: [
          "https://plato.stanford.edu/entries/argument/",
          "https://open.umn.edu/opentextbooks/textbooks/introduction-to-logic-and-critical-thinking",
          "https://www.youtube.com/user/WirelessPhilosophy/playlists"
        ],
        tools: ["Zotero (organize sources)", "Argument mapping (e.g., diagrams)", "Open textbooks (UMN OTL)"]
      }
    }
  },
  {
    id: "phil-005",
    code: "PHIL 005",
    name: "Introduction to Logic",
    fullName: "PHIL 005: Introduction to Logic",
    description: "Introduces formal tools for evaluating reasoning (validity, soundness, propositional and predicate logic), strengthening the exact precision that pre-law students need for airtight arguments, spotting inference gaps, and excelling on logic-heavy reasoning tasks.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Formal logic sharpens your ability to translate messy language into clear structure—hugely useful for legal argumentation, statutory interpretation, and identifying what follows (or doesn’t) from a set of facts. It also builds disciplined reasoning habits that carry into LSAT prep and law-school exams.",
      realWorldApplications: [
        "Testing whether a legal argument actually follows from its stated premises (and finding the missing premise).",
        "Clarifying ambiguous language by symbolizing structure—helpful for contract clauses and statutory reasoning."
      ],
      learningOutcomes: [
        "Use truth-functional logic to test validity (truth tables / equivalences).",
        "Symbolize arguments and prove validity using structured methods (e.g., natural deduction).",
        "Work with basic first-order logic concepts (quantifiers, identity) to reason precisely."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLH72EKtvoHuZzmCaZuEXrJi0zSU0U2oVk",
          "https://www.youtube.com/watch?v=5IIZ9hK1FM4",
          "https://www.youtube.com/watch?v=xL0kNw5TudI"
        ],
        websites: [
          "https://forallx.openlogicproject.org/",
          "https://plato.stanford.edu/entries/logic-classical/",
          "https://online.stanford.edu/courses?keywords=free"
        ],
        tools: ["forall x (free textbook)", "Open Logic Project (extensions)", "Stanford Encyclopedia of Philosophy (definitions/clarity)"]
      }
    }
  },
  {
    id: "phil-002",
    code: "PHIL 002",
    name: "Introduction to Ethics",
    fullName: "PHIL 002: Introduction to Ethics",
    description:
      "Introduces the major ethical frameworks (utilitarianism, deontology, virtue ethics, rights/duties) and trains you to evaluate hard cases with clear argumentation—directly strengthening pre-law skills in reasoning, issue-spotting, and persuasive writing.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Law is applied ethics under institutional rules: attorneys constantly argue about harm, responsibility, rights, fairness, and what society should permit or punish. This course helps you build structured moral arguments, anticipate objections, and write more logically—skills that transfer to the LSAT, 1L exams, and real legal advocacy.",
      realWorldApplications: [
        "Analyzing criminal punishment and responsibility (intent, negligence, moral luck) to frame arguments about culpability and sentencing.",
        "Evaluating rights vs. welfare tradeoffs in constitutional and policy disputes (speech limits, privacy, public health, discrimination).",
        "Building persuasive arguments in legal memos by making assumptions explicit and testing them against rival ethical frameworks."
      ],
      learningOutcomes: [
        "Compare and apply core moral theories (utilitarian, deontological, virtue-based) to real dilemmas.",
        "Identify hidden premises and strengthen arguments with clear standards and counterarguments.",
        "Write concise, well-supported ethical analyses that mirror law-school style reasoning."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL30C13C91CFFEFEA6",
          "https://www.youtube.com/playlist?list=PLtKNX4SfKpzWO2Yjvkp-hMS0gTI948pIS",
          "https://www.youtube.com/playlist?list=PLCnXRrjLWbWvgPRyTM_fenHudPDdiibC1",
          "https://ocw.mit.edu/courses/24-02-moral-problems-and-the-good-life-fall-2008/",
          "https://www.youtube.com/playlist?list=PL2FD48CE33DFBEA7E"
        ],
        websites: [
          "https://openlearninglibrary.mit.edu/courses/course-v1%3AMITx%2B24.02x%2B2T2020/about",
          "https://plato.stanford.edu/entries/moral-theory/",
          "https://www.wi-phi.com/"
        ],
        tools: [
          "Zotero (organize readings/cases)",
          "Argument mapping (diagram premises → conclusion)",
          "Stanford Encyclopedia of Philosophy (deep references)"
        ]
      }
    }
  },
  {
    id: "cres-120",
    code: "CRES 120",
    name: "Race, Law and Civil Rights",
    fullName: "CRES 120: Race, Law and Civil Rights",
    description:
      "Examines how race and racial hierarchy have been produced, challenged, and reshaped through law—constitutional doctrine, civil rights statutes, courts, and legal institutions—giving pre-law students the historical and analytical tools to understand civil rights litigation and structural inequality.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Civil rights law sits at the center of many legal careers (public interest, constitutional litigation, employment, education, criminal justice, and policy). This course builds the ability to connect doctrine (e.g., Equal Protection, due process, Title VII) to historical context and real institutional outcomes—exactly what strong legal analysis requires.",
      realWorldApplications: [
        "Reading equal protection/civil rights disputes with a clearer sense of doctrine *and* the social realities courts are responding to (or ignoring).",
        "Understanding how landmark cases and statutes become tools for strategic litigation and institutional reform.",
        "Using primary sources (briefs, opinions, archival material) to support legal arguments and research papers."
      ],
      learningOutcomes: [
        "Explain core civil rights constitutional concepts (14th Amendment, equal protection, incorporation) and their legal tests.",
        "Connect civil rights statutes (e.g., Civil Rights Act of 1964) to enforcement institutions and litigation pathways.",
        "Critically analyze how courts and legal institutions shape racial outcomes over time."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=BTbK3SUSp_k",
          "https://www.youtube.com/watch?v=pQWWS3EOv24",
          "https://www.youtube.com/watch?v=Tsg6kSPK3aQ",
          "https://www.youtube.com/watch?v=conBLMDpiM0",
          "https://www.youtube.com/playlist?list=PLIUbB46fTGWwZQsXkWYecrQxio3Mmz_SX"
        ],
        websites: [
          "https://constitutioncenter.org/education/constitution-101-curriculum/constitution-101-with-khan-academy/unit-8-the-14th-amendment-citizenship-freedom-and-equality",
          "https://www.law.cornell.edu/wex/civil_rights_act_of_1964",
          "https://www.naacpldf.org/about-us/history/",
          "https://ldfrecollection.org/",
          "https://www.justice.gov/crt"
        ],
        tools: [
          "Oyez (case summaries + oral argument audio)",
          "Cornell LII (statutes + Wex explainers)",
          "LDF Recollection (civil-rights litigation archive)",
          "DOJ Civil Rights Division (enforcement areas overview)"
        ]
      }
    }
  },
  {
    id: "eng-050",
    code: "ENG 050",
    name: "Readings in Close Reading",
    fullName: "ENG 050: Readings in Close Reading",
    description:
      "Trains you to read texts with precision—tracking language, structure, tone, and evidence—so you can make defensible interpretations. For pre-law, it’s a direct skill-builder for reading cases, statutes, and fact patterns carefully and writing tighter, evidence-based arguments.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Law school and legal work reward careful reading under time pressure: spotting what a text *actually says*, what it implies, and what it doesn’t. Close reading builds the same muscles you need for case briefing, statutory interpretation, and legal writing where every word can matter.",
      realWorldApplications: [
        "Briefing appellate opinions: extracting holding, reasoning, dicta, and the key facts the court relies on.",
        "Parsing statutory language: identifying definitions, conditions, exceptions, and ambiguity that drives litigation.",
        "Writing stronger arguments by grounding every claim in specific textual evidence (quotes/line-level analysis)."
      ],
      learningOutcomes: [
        "Annotate texts strategically to capture structure, patterns, and interpretive “pressure points.”",
        "Support interpretations with precise evidence rather than summary.",
        "Translate close reading into clearer thesis-driven writing (claims → evidence → reasoning)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLD00D35CBC75941BD",
          "https://www.youtube.com/watch?v=YtK18ImMkp8",
          "https://oyc.yale.edu/english/engl-300",
          "https://classicswrites.hsites.harvard.edu/close-reading-0",
          "https://www.youtube.com/watch?v=5xTh44G6RYs"
        ],
        websites: [
          "https://owl.purdue.edu/owl/subject_specific_writing/writing_in_literature/writing_about_fiction/index.html",
          "https://www.vanderbilt.edu/writing/resources/handouts/close-read-fiction/",
          "https://writingcenter.fas.harvard.edu/pages/resources"
        ],
        tools: [
          "Zotero (organize quotes + notes)",
          "Hypothes.is (web annotation)",
          "Cornell LII (practice close reading on legal texts)"
        ]
      }
    }
  },
];

/**
 * 🟡 TIER 2: PREFERABLE
 * Recommended courses for Law / Pre-Law roles
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "phil-108",
    code: "PHIL 108",
    name: "Political Philosophy",
    fullName: "PHIL 108: Political Philosophy",
    description:
      "Core political-philosophy frameworks (authority, rights, justice, legitimacy) that underpin constitutional argument, civil liberties disputes, and legal reasoning in “hard cases.”",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law students constantly face arguments about legitimacy, rights, equality, and state power. This course trains you to spot hidden assumptions, compare normative frameworks, and write tighter legal-style arguments about what government may (or may not) do.",
      realWorldApplications: [
        "Arguing constitutional controversies using competing theories of rights (e.g., liberty vs. equality tradeoffs).",
        "Evaluating legitimacy of state coercion in policing, surveillance, and emergency powers.",
        "Analyzing civil disobedience and protest law using theories of political obligation and resistance.",
        "Framing policy briefs with clear normative premises (utilitarian, Rawlsian, libertarian, republican).",
      ],
      learningOutcomes: [
        "Distinguish major traditions: liberalism, libertarianism, utilitarianism, republicanism, and egalitarian theories.",
        "Analyze political authority: consent, fairness, public reason, and legitimacy arguments.",
        "Write structured normative arguments with explicit premises and rebuttals (law-school style issue framing).",
        "Apply theories of justice to real legal conflicts (speech, equality, punishment, property, welfare).",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PL8D95DEA9B7DFE825", // Yale Open Courses (Steven Smith) – Political Philosophy (PLSC 114)
          "https://www.youtube.com/watch?v=kBdfcR-8hEY", // Harvard Justice (Sandel) Ep 1
          "https://www.youtube.com/watch?v=kc8WYoH7p3Y", // Yale Open Courses (Ian Shapiro) – Moral Foundations of Politics (PLSC 118) (course/playlist page varies by region)
          "https://www.youtube.com/watch?v=2doZROwdte4", // Harvard Justice lecture (another widely-used episode)
        ],
        websites: [
          "https://plato.stanford.edu/entries/political-philosophy/",
          "https://plato.stanford.edu/entries/political-obligation/",
          "https://plato.stanford.edu/entries/justice/",
        ],
        tools: [
          "Zotero (case/reading annotation + citation management)",
          "Perusall (collaborative reading + argument annotation)",
          "Obsidian or Notion (outline briefs: claim → warrants → objections)",
        ],
      },
    },
  },
  {
    id: "phil-109",
    code: "PHIL 109",
    name: "Philosophy of Law",
    fullName: "PHIL 109: Philosophy of Law",
    description:
      "Jurisprudence: what law *is*, how it relates to morality, how judges should interpret texts, and how legal systems justify coercion—key foundations for pre-law analytic writing.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Law school is packed with arguments about interpretation, discretion, precedent, and legitimacy. Jurisprudence gives you the conceptual toolkit behind debates like textualism vs purposivism, the role of moral reasoning, and when judges ‘make’ law.",
      realWorldApplications: [
        "Interpreting statutes/constitutions: rules vs principles, ambiguity, and institutional roles.",
        "Understanding debates over judicial discretion in hard cases (e.g., rights, equality, due process).",
        "Evaluating ‘unjust laws’ arguments in civil rights litigation and civil disobedience contexts.",
        "Building clearer legal memos by separating ‘what the law is’ from ‘what the law should be.’",
      ],
      learningOutcomes: [
        "Compare major theories: legal positivism, natural law, and interpretivism.",
        "Explain core debates: Hart–Dworkin, rule of recognition, and principles vs rules.",
        "Assess theories of interpretation (textualism, purposivism, common-law reasoning).",
        "Write jurisprudential analyses that anticipate counterarguments (law-review style clarity).",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=MfSRaXY4xh8", // Jeffrey Kaplan – Dworkin’s attack on Hart (widely assigned intro)
          "https://www.youtube.com/watch?v=gX2vpV6J_IY", // H.L.A. Hart Interview (re: Dworkin / nature of law)
          "https://www.youtube.com/watch?v=TaiRap2Laag", // Partially Examined Life – Dworkin v. Hart (long-form discussion)
          "https://www.youtube.com/playlist?list=PL7YPshZMeLIYDwqvtqIHm9SOQpSeKVKU0", // Philosophy of Law lecture playlist (Kaplan)
        ],
        websites: [
          "https://ocw.mit.edu/courses/24-235j-philosophy-of-law-spring-2012/", // MIT OCW course hub (readings/assignments)
          "https://plato.stanford.edu/entries/lawphil-nature/",
          "https://plato.stanford.edu/entries/legal-positivism/",
          "https://plato.stanford.edu/entries/natural-law-theories/",
        ],
        tools: [
          "Zotero (track jurisprudence readings + briefs)",
          "Quimbee (term refreshers: interpretation, precedent, constitutional structure)",
          "Oyez (case summaries + oral argument audio for linking theory to doctrine)",
        ],
      },
    },
  },
  {
    id: "phil-104",
    code: "PHIL 104",
    name: "Ethical Theory",
    fullName: "PHIL 104: Ethical Theory",
    description:
      "Advanced normative ethics (utilitarianism, deontology, virtue ethics, contractualism) and how to argue across frameworks—critical for pre-law moral reasoning in rights, punishment, and policy.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law work often blends doctrine with moral argument—especially in constitutional rights, criminal justice, torts, bioethics, and public policy. Ethical theory helps you build arguments that are internally consistent and resilient to pushback.",
      realWorldApplications: [
        "Evaluating punishment and sentencing arguments (retribution vs deterrence vs rehabilitation).",
        "Analyzing civil rights conflicts (free speech harms, equality claims, religious liberty).",
        "Assessing professional responsibility dilemmas (zealous advocacy vs justice/fairness).",
        "Policy analysis: cost–benefit vs rights-based vs virtue/care ethics approaches.",
      ],
      learningOutcomes: [
        "Formally compare utilitarian, Kantian, virtue-ethical, and contractualist arguments.",
        "Identify which moral premises a legal argument relies on (and how to challenge them).",
        "Apply ethical theory to concrete cases without hand-waving (fact-sensitive reasoning).",
        "Write tighter argumentative essays with explicit principles, objections, and revisions.",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=-a739VjqdSI", // Wi-Phi – Utilitarianism
          "https://www.youtube.com/watch?v=8bIys6JoEDw", // Wi-Phi – Deontology
          "https://www.youtube.com/playlist?list=PL30C13C91CFFEFEA6", // Wi-Phi – Ethics playlist
          "https://www.youtube.com/watch?v=kBdfcR-8hEY", // Harvard Justice (Sandel) Ep 1 (applied ethics + argument practice)
        ],
        websites: [
          "https://plato.stanford.edu/entries/ethics-virtue/",
          "https://plato.stanford.edu/entries/ethics-deontological/",
          "https://plato.stanford.edu/entries/consequentialism/",
        ],
        tools: [
          "Zotero (annotate arguments + keep theory ‘cheat sheets’)",
          "Argument mapping tool (Kialo or similar) for premise/objection structure",
          "Oyez (connect ethical disputes to real constitutional/criminal cases)",
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
      "How Congress actually works (committees, parties, procedure, bargaining, oversight) and why it matters for statutory interpretation, regulation, and litigation strategy in pre-law pathways.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Law and policy outcomes are shaped long before court—by agenda-setting, committees, party leadership, and legislative bargaining. Pre-law students benefit from understanding how statutes are made, how intent is documented, and how oversight and polarization shape real-world legal disputes.",
      realWorldApplications: [
        "Legislative history research: committees, hearings, reports, and bill evolution.",
        "Understanding statutory ambiguity: how process and compromise create interpretive disputes.",
        "Analyzing oversight power and separation-of-powers conflicts affecting agencies and courts.",
        "Tracking real bills and assessing likelihood of passage (stakeholders, coalitions, veto points).",
      ],
      learningOutcomes: [
        "Explain committee systems, leadership, parties, and procedural rules that shape outcomes.",
        "Analyze incentives: constituency pressures, party brand, interest group influence, fundraising.",
        "Read and interpret legislative artifacts (reports, hearing testimony, markups).",
        "Connect congressional design to constitutional litigation and administrative law conflicts.",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=n9defOwVWS8", // CrashCourse – Bicameral Congress
          "https://www.youtube.com/watch?v=ZT9ipQdYL-s", // CrashCourse – Congressional Decisions
          "https://www.youtube.com/watch?v=66f4-NKEYz4", // CrashCourse – How a Bill Becomes a Law
          "https://www.youtube.com/watch?v=E1CIWwu6KdQ", // Congress.gov – Overview of the Legislative Process
          "https://www.c-span.org/classroom/document/?9266=", // C-SPAN Classroom clip on legislative process
        ],
        websites: [
          "https://www.congress.gov/legislative-process",
          "https://crsreports.congress.gov/",
          "https://www.govtrack.us/",
          "https://guides.ll.georgetown.edu/c.php?g=278869&p=5894542", // Georgetown guide: Congress & legislative process (research)
        ],
        tools: [
          "Congress.gov (official bill text, summaries, actions, committees)",
          "CRS Reports (high-quality nonpartisan primers for legal/policy context)",
          "GovTrack (tracking + visualizations of bill progress and legislators)",
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
      "How organized interests and parties shape elections, lawmaking, litigation, and regulation—crucial context for campaign finance, lobbying rules, and constitutional disputes (speech/association).",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law careers regularly intersect with lobbying disclosure, campaign finance, election law, and administrative influence. This course helps you understand how policy gets made in practice, and how that reality appears in legal arguments about speech, corruption, access, and equality.",
      realWorldApplications: [
        "Campaign finance + political spending: understanding the legal/political mechanics behind major cases.",
        "Lobbying strategy and regulatory influence: how interest groups target committees, agencies, and courts.",
        "Party polarization and agenda control: why some reforms succeed/fail.",
        "Litigation support networks: amicus briefs, legal advocacy orgs, and coordinated policy pipelines.",
      ],
      learningOutcomes: [
        "Explain why interest groups form and how they overcome collective action problems.",
        "Differentiate parties vs interest groups: incentives, organization, and influence channels.",
        "Assess empirical claims about influence (money, mobilization, media, polarization).",
        "Connect participation institutions to constitutional law (speech, association, equal protection).",
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=bOvBA7oIIgc", // CrashCourse – Interest Groups
          "https://www.youtube.com/watch?v=BGo9Asfwric", // CrashCourse – Interest Group Formation
          "https://www.youtube.com/watch?v=VEmOUHxessE", // CrashCourse – Political Parties
          "https://www.youtube.com/watch?v=vA3o-lTreKM", // Khan Academy – Linkage institutions & political parties
          "https://www.khanacademy.org/humanities/ap-us-government-and-politics/political-participation/groups-influencing-policy-outcomes/v/groups-influencing-policy-outcomes",
        ],
        websites: [
          "https://www.khanacademy.org/humanities/us-government-and-civics/us-gov-political-participation/us-gov-groups-influencing-policymaking-and-policy-outcomes/a/interest-groups-influencing-policymaking-lesson-overview",
          "https://www.opensecrets.org/", // money in politics tracking (practical context)
          "https://www.fec.gov/", // campaign finance rules/data
        ],
        tools: [
          "OpenSecrets (follow political spending + influence patterns)",
          "FEC (campaign finance filings and enforcement context)",
          "Congress.gov (watch which groups show up around specific bills)",
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
      "Teaches you how to evaluate policy options rigorously (evidence, tradeoffs, feasibility), design strategies that survive real political/legal constraints, and assess downstream impacts—high leverage for pre-law students interested in policy, legislation, regulation, and public-interest work.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law careers often sit at the intersection of law + policy: drafting rules, interpreting statutes, advising decision-makers, or litigating over regulatory outcomes. This course strengthens your ability to build evidence-based arguments, anticipate implementation barriers, and write policy memos that resemble practical legal advocacy.",
      realWorldApplications: [
        "Writing policy memos that recommend a legally feasible option with clear rationale, risks, and implementation steps.",
        "Evaluating policies using frameworks like cost-benefit / distributional impact, while accounting for constitutional/statutory limits.",
        "Mapping stakeholders (agencies, courts, interest groups) and designing strategy for adoption and implementation.",
        "Assessing policy impact using real data and evaluation logic (outputs → outcomes → unintended consequences)."
      ],
      learningOutcomes: [
        "Define a policy problem precisely (scope, stakeholders, constraints, metrics of success).",
        "Compare policy alternatives using structured criteria: effectiveness, equity, legality, feasibility, and political support.",
        "Communicate recommendations in a decision-maker format (1–2 page memo style).",
        "Evaluate impact using evidence and basic program evaluation logic."
      ],
      resources: {
        videos: [
          "https://ocw.mit.edu/courses/11-003j-methods-of-policy-analysis-spring-2016/",
          "https://www.youtube.com/watch?v=1XvfMgHYJ4g",
          "https://www.youtube.com/watch?v=Vz1XiZXYJhA",
          "https://www.youtube.com/watch?v=7dnfOdB5idA",
          "https://www.c-span.org/classroom/document/?16960="
        ],
        websites: [
          "https://www.congress.gov/legislative-process",
          "https://crsreports.congress.gov/",
          "https://www.hks.harvard.edu/courses/policy-memo-writing-decision-makers",
          "https://libguides.usc.edu/writingguide/assignments/policymemo"
        ],
        tools: [
          "Excel or Google Sheets (basic CBA + scenarios)",
          "R or Python (impact evaluation basics)",
          "Tableau / Flourish (policy data storytelling)",
          "Congress.gov + CRS (legislative + issue primers)"
        ]
      }
    }
  },
  {
    id: "eng-131",
    code: "ENG 131",
    name: "Form and Formality",
    fullName: "ENG 131: Form and Formality",
    description:
      "Builds control over form, structure, and style—how genre conventions and rhetorical choices create meaning and credibility. For pre-law, this directly strengthens close reading, argument clarity, tone management, and persuasive writing.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Law rewards disciplined form: how you organize, frame, and phrase an argument can be as important as the argument itself. This course sharpens your ability to read for structure and write with strategic formality—skills that translate to case briefs, memos, and professional legal communication.",
      realWorldApplications: [
        "Writing tighter arguments by controlling structure (issue → rule → analysis → conclusion style reasoning).",
        "Learning when formal vs plain style wins credibility (judges, professors, clients, public-facing writing).",
        "Close-reading texts for tone, emphasis, ambiguity, and implied assumptions—useful for statutes and opinions.",
        "Revising prose for clarity, coherence, and force without losing nuance."
      ],
      learningOutcomes: [
        "Analyze how form/genre conventions shape interpretation and persuasion.",
        "Develop a deliberate writing style: clarity, concision, and controlled formality.",
        "Revise effectively—strengthen claims, tighten paragraphs, and improve flow.",
        "Support interpretations with precise textual evidence (line-level reasoning)."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=3ZKTmsgqi0U",
          "https://www.youtube.com/watch?v=IE-TTz13P7w",
          "https://www.youtube.com/watch?v=cYhjo5O-nfg",
          "https://oyc.yale.edu/english/engl-300/lecture-1",
          "https://www.youtube.com/playlist?list=PL2SOU6wwxB0tY33JccQVyybWTL0RwjYoJ"
        ],
        websites: [
          "https://oyc.yale.edu/english/engl-300",
          "https://summer.harvard.edu/academic-opportunities-support/services/the-writing-center/",
          "https://english.fas.harvard.edu/english-clar-getting-words-right-art-revision",
          "https://digital.gov/guides/plain-language"
        ],
        tools: [
          "Hemingway Editor (sentence clarity)",
          "Zotero (track sources + quotes)",
          "Hypothes.is (annotation for close reading)",
          "Style checklist (voice, transitions, paragraph purpose)"
        ]
      }
    }
  },
  {
    id: "eng-133",
    code: "ENG 133",
    name: "Race, Law, and American Literature",
    fullName: "ENG 133: Race, Law, and American Literature",
    description:
      "Explores how American literature represents (and critiques) legal power, rights, citizenship, and racial hierarchy—linking narrative, history, and legal regimes in ways that strengthen pre-law analytical reading and argumentation.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law students gain a stronger sense of how legal categories (race, personhood, citizenship, innocence/guilt) are constructed and contested in public life. The course improves your ability to analyze texts as arguments about institutions—useful for legal writing, civil rights reasoning, and persuasive storytelling grounded in evidence.",
      realWorldApplications: [
        "Interpreting narratives of policing, punishment, and rights as critiques of legal institutions and social power.",
        "Connecting literary texts to legal history (civil rights litigation, constitutional change, and statutory enforcement).",
        "Writing evidence-driven analysis that mirrors how lawyers build claims from records: quote → inference → argument.",
        "Understanding how storytelling influences juries, judges, and public legitimacy—core to advocacy."
      ],
      learningOutcomes: [
        "Perform close readings that identify how texts encode legal concepts (rights, harm, responsibility, legitimacy).",
        "Contextualize literature within legal and historical frameworks (civil rights era to present).",
        "Write thesis-driven arguments supported by textual evidence and counter-interpretations.",
        "Analyze how race shapes legal narratives and how legal systems shape racial outcomes."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLE33BCD966FF96F23",
          "https://oyc.yale.edu/english/engl-291",
          "https://www.youtube.com/watch?v=K3M_WCk553w",
          "https://www.youtube.com/watch?v=HZA0qXXoFeY",
          "https://www.youtube.com/watch?v=WHFFzZlKuDI",
          "https://www.youtube.com/watch?v=zcadqaZ5qAo"
        ],
        websites: [
          "https://oyc.yale.edu/english/engl-291",
          "https://www.oyez.org/",
          "https://www.law.cornell.edu/wex/civil_rights_act_of_1964",
          "https://www.naacpldf.org/about-us/history/"
        ],
        tools: [
          "Oyez (case audio + summaries to connect themes to doctrine)",
          "Zotero (quote bank + citations)",
          "Hypothes.is / Perusall (annotation + discussion)",
          "Cornell LII (statutes + constitutional clauses for context)"
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
      "Builds practical, professional writing skills (clarity, structure, audience, ethics) for technical contexts—useful for pre-law students aiming at tech law, IP, privacy/cyber, regulation, or any role requiring precise, high-stakes writing.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legal work is professional writing under constraints—precision, audience awareness, and defensible structure. Technical/pro writing strengthens the exact habits needed for legal memos, compliance docs, privacy/security policies, expert reports, and any legal-adjacent communication in STEM-heavy fields.",
      realWorldApplications: [
        "Writing clear, non-ambiguous procedures and requirements (parallel to contracts/specs and compliance policies).",
        "Producing professional reports and executive summaries that decision-makers can act on quickly.",
        "Practicing plain-language communication for public-facing guidance (a major legal/regulatory skill).",
        "Avoiding plagiarism and handling sources correctly—critical for legal research and professional credibility."
      ],
      learningOutcomes: [
        "Write for defined audiences with clear purpose, structure, and measurable takeaways.",
        "Improve sentence-level clarity (active voice, information flow, precise terminology).",
        "Create professional documents: reports, emails, memos, proposals, and documentation sets.",
        "Use sources ethically: synthesize, cite, and avoid patchwriting/plagiarism."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLjfhqpVdH5edOZiUX72TbXhQpu9TiN9Vj",
          "https://developers.google.com/tech-writing/one",
          "https://www.youtube.com/playlist?list=PLnpD-PZJZjqOLL343MzRtl6hY06Tyfch8",
          "https://ocw.mit.edu/courses/21w-794-graduate-technical-writing-workshop-january-iap-2019/",
          "https://www.youtube.com/playlist?list=PLd9b-GuOJ3nHMlmPFMw8cJxN_DW-odj0J"
        ],
        websites: [
          "https://developers.google.com/tech-writing/one",
          "https://ocw.mit.edu/courses/21w-794-graduate-technical-writing-workshop-january-iap-2019/",
          "https://online.stanford.edu/courses/som-y0010-writing-sciences",
          "https://digital.gov/guides/plain-language"
        ],
        tools: [
          "Zotero (source management)",
          "Overleaf / LaTeX (technical formatting when needed)",
          "Grammarly or LanguageTool (final-pass polish)",
          "Hemingway Editor (clarity check)"
        ]
      }
    }
  },
];

/**
 * 🟠 TIER 3: OPTIONAL
 * Additional courses that may be beneficial for Law / Pre-Law roles
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "poli-092",
    code: "POLI 092",
    name: "Internship in Political Science",
    fullName: "POLI 092: Internship in Political Science",
    description:
      "Entry-level applied experience in government, campaigns, courts, policy orgs, or nonprofits—built to translate classroom knowledge into professional skills (writing, research, stakeholder work). For pre-law, it’s a strong way to test legal/public-service pathways and build credible application material.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "For pre-law, internships create proof of maturity and real exposure to institutions that generate disputes (agencies, legislatures, courts, advocacy orgs). You’ll develop law-adjacent skills—professional writing, research discipline, confidentiality norms, and relationship-building—while clarifying what type of legal work you actually want.",
      realWorldApplications: [
        "Drafting policy briefs, memos, constituent responses, or internal summaries for decision-makers.",
        "Supporting legal-adjacent work: compiling case/issue background, summarizing hearings, tracking bills/regulations.",
        "Learning professional norms: confidentiality, documentation quality, deadlines, and stakeholder communication."
      ],
      learningOutcomes: [
        "Produce professional writing (memos/emails/briefs) with clear purpose, audience, and evidence.",
        "Build a credible network through informational interviews, mentorship, and supervisor feedback.",
        "Develop a portfolio artifact (writing sample, project summary, or research memo) suitable for pre-law applications."
      ],
      resources: {
        videos: [
          "https://ocs.yale.edu/videos/overview-of-resumes-cover-letters/",
          "https://ocs.yale.edu/videos/cover-letters/",
          "https://careerservices.fas.harvard.edu/channels/prepare-for-an-interview/",
          "https://www.americanbar.org/groups/law_students/resources/student-lawyer/career-paths/10-tips-for-a-strong-legal-internship-interview/",
          "https://www.americanbar.org/groups/judicial/resources/on-demand/getting-most-your-judicial-internship-externship/"
        ],
        websites: [
          "https://www.lsac.org/discover-law/how-prepare-law-school",
          "https://guides.ll.georgetown.edu/strategy_tutorial",
          "https://guides.ll.georgetown.edu/home/tutorials"
        ],
        tools: [
          "Zotero (research + citations)",
          "Oyez (case context + oral arguments)",
          "Congress.gov + CRS Reports (policy/legal background)",
          "LinkedIn (informational interviews + networking)"
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
      "Advanced/upper-division internship emphasizing higher responsibility—independent projects, deeper policy/legal research, and stronger professional deliverables. For pre-law, it’s ideal for building a serious writing sample and a strong letter of recommendation.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law applicants benefit most when the internship produces concrete, high-quality outputs and supervisor evaluation. POLI 192 should push you toward ownership—leading a project, producing a polished memo, or supporting litigation/policy strategy—so your experience reads as substantive, not observational.",
      realWorldApplications: [
        "Owning a policy or legislative tracking project (issue brief + recommendations + stakeholder map).",
        "Producing research memos that synthesize legal/policy sources (statutes, regulations, hearing records).",
        "Creating a professional writing sample (sanitized for confidentiality) and documenting contributions for resumes."
      ],
      learningOutcomes: [
        "Deliver an independent project with measurable outcomes and professional-quality writing.",
        "Practice advanced professionalism: feedback cycles, version control of documents, and clean sourcing.",
        "Translate experience into a compelling narrative for personal statements and interviews (impact + reflection)."
      ],
      resources: {
        videos: [
          "https://www.americanbar.org/groups/law_students/resources/student-lawyer/career-paths/7-tips-your-first-law-firm-internship-at-a-law-firm/",
          "https://www.americanbar.org/groups/judicial/resources/on-demand/getting-most-your-judicial-internship-externship/",
          "https://ocs.yale.edu/videos/overview-of-resumes-cover-letters/",
          "https://ocs.yale.edu/videos/cover-letters/",
          "https://guides.ll.georgetown.edu/tutorial_statutes"
        ],
        websites: [
          "https://crsreports.congress.gov/",
          "https://www.congress.gov/legislative-process",
          "https://guides.ll.georgetown.edu/case_law_tutorial"
        ],
        tools: [
          "Congress.gov (bill text/actions/committees)",
          "CRS Reports (nonpartisan issue primers)",
          "Georgetown Law Library tutorials (research workflow)",
          "Zotero (source capture + notes)"
        ]
      }
    }
  },
  {
    id: "phil-092",
    code: "PHIL 092",
    name: "Internship in Philosophy",
    fullName: "PHIL 092: Internship in Philosophy",
    description:
      "Applied philosophy experience (ethics centers, advocacy orgs, policy think tanks, compliance, education) focused on argument clarity, values-based analysis, and professional writing—highly complementary to pre-law reasoning and persuasive communication.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Pre-law students who can write rigorous arguments and frame disputes in ethical/rights language stand out. A philosophy internship builds disciplined reasoning, careful definitions, and high-quality writing—skills that transfer directly to legal memos, briefs, and law-school exams.",
      realWorldApplications: [
        "Drafting ethics analyses (policy impact, fairness, rights conflicts) for an organization’s decisions.",
        "Writing public-facing explainers or internal guidance that turns complex ideas into clear standards.",
        "Building a ‘writing sample’ based on structured argumentation (claim → reasons → objections → replies)."
      ],
      learningOutcomes: [
        "Produce clear, defensible arguments with explicit assumptions and counterargument handling.",
        "Improve professional writing quality: organization, precision, tone, and reader-value focus.",
        "Develop a portfolio artifact (op-ed, memo, brief-style essay) suitable for pre-law applications."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNss302UfaQ",
          "https://ocs.yale.edu/videos/cover-letters/",
          "https://ocs.yale.edu/videos/overview-of-resumes-cover-letters/",
          "https://careerservices.fas.harvard.edu/channels/prepare-for-an-interview/",
          "https://www.youtube.com/playlist?list=PL4asXgsr6ek5H5mM9GlA1d-YCb9KvP3Ja"
        ],
        websites: [
          "https://plato.stanford.edu/entries/lawphil-nature/",
          "https://writingcenter.fas.harvard.edu/thesis",
          "https://www.zotero.org/support/screencast_tutorials"
        ],
        tools: [
          "Stanford Encyclopedia of Philosophy (concept precision)",
          "Zotero (sources + notes + citations)",
          "Argument mapping (premises → conclusion)",
          "Obsidian/Notion (outline + writing system)"
        ]
      }
    }
  },
  {
    id: "eng-192",
    code: "ENG 192",
    name: "Internship in English",
    fullName: "ENG 192: Internship in English",
    description:
      "Professional writing internship (editing, communications, research writing, publishing, content strategy). For pre-law, it’s valuable because it improves close reading, revision discipline, and persuasive clarity—exactly what legal writing demands.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Law is writing-intensive: briefs, memos, emails, and arguments must be clear, structured, and evidence-driven. An English internship strengthens revision craft, audience awareness, and rhetorical control—skills that directly raise your ceiling in law school and legal internships.",
      realWorldApplications: [
        "Editing and polishing high-stakes writing (tone, structure, clarity) similar to legal document revision.",
        "Producing concise summaries and explainers from dense source material (like cases/records).",
        "Building a writing portfolio and learning feedback workflows (drafts, redlines, style guides)."
      ],
      learningOutcomes: [
        "Write and revise for clarity, credibility, and persuasion under deadlines.",
        "Synthesize sources into coherent, well-supported writing (quote → reasoning → claim).",
        "Develop a professional portfolio artifact and stronger communication habits."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=fNss302UfaQ",
          "https://ocs.yale.edu/videos/overview-of-resumes-cover-letters/",
          "https://ocs.yale.edu/videos/cover-letters/",
          "https://oyc.yale.edu/english/engl-300",
          "https://www.youtube.com/playlist?list=PL4asXgsr6ek5H5mM9GlA1d-YCb9KvP3Ja"
        ],
        websites: [
          "https://writingproject.fas.harvard.edu/pages/writing-guides",
          "https://writingproject.fas.harvard.edu/pages/senior-thesis-writing-guides",
          "https://www.zotero.org/support/screencast_tutorials"
        ],
        tools: [
          "Zotero (quote bank + citations)",
          "Hypothes.is (annotation)",
          "Style checklist / house style guides",
          "Hemingway Editor (clarity pass)"
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
      "A practical foundation for asking political questions well and answering them with defensible methods—causal reasoning, case selection, measurement, and research ethics. For pre-law, it builds evidence discipline for policy analysis, litigation support, and law-adjacent research roles.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Legal arguments often depend on factual claims and empirical evidence (discrimination, harm, intent, impact). Research design teaches you to evaluate evidence quality, recognize weak causal claims, and produce research memos that hold up under scrutiny—useful in public interest, regulation, and litigation-adjacent work.",
      realWorldApplications: [
        "Evaluating studies cited in legal briefs/policy debates: what the method can (and cannot) prove.",
        "Designing a mini-study or memo: research question → theory → method → limitations → implications.",
        "Understanding research ethics and human-subjects issues that arise in socio-legal work."
      ],
      learningOutcomes: [
        "Formulate researchable questions and translate them into testable designs.",
        "Distinguish correlation vs causation and identify threats to inference (selection, measurement, confounding).",
        "Choose appropriate qualitative vs quantitative approaches and justify case selection.",
        "Write a research design/prospectus with clear method and limitations."
      ],
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=QwhK-iEyXYA", 
          "https://www.youtube.com/watch?v=hFV71QPvX2I",
          "https://www.youtube.com/watch?v=Ml5r3eq7qtw",
          "https://ocw.mit.edu/courses/17-801-political-science-scope-and-methods-fall-2017/",
          "https://ocw.mit.edu/courses/17-tht-thesis-research-design-seminar-fall-2004/"
        ],
        websites: [
          "https://ocw.mit.edu/courses/17-801-political-science-scope-and-methods-fall-2017/",
          "https://ocw.mit.edu/courses/17-tht-thesis-research-design-seminar-fall-2004/",
          "https://ocw.mit.edu/courses/17-801-political-science-scope-and-methods-fall-2017/pages/lecture-slides/"
        ],
        tools: [
          "Zotero (source capture + annotation)",
          "Google Scholar (literature discovery)",
          "Excel/R/Python (basic data checks, if applicable)",
          "OSF (project organization, if doing research)"
        ]
      }
    }
  },
  {
    id: "poli-194h",
    code: "POLI 194H",
    name: "Honors Thesis Seminar",
    fullName: "POLI 194H: Honors Thesis Seminar",
    description:
      "Capstone thesis pipeline: develop a research question, build a literature review, choose methods, write and revise a substantial argument. For pre-law, it’s a standout signal of research rigor and produces an excellent writing sample.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "A strong thesis demonstrates exactly what law schools value: sustained reading, disciplined argumentation, careful use of evidence, and serious writing revision. It also gives you a concrete writing sample and a recommender who can speak to your intellectual maturity.",
      realWorldApplications: [
        "Producing a polished long-form argument (similar stamina to law-school exam writing + memo work).",
        "Learning how to synthesize sources (lit review) and defend methodology choices under critique.",
        "Creating a writing sample you can adapt for law school apps, scholarships, and legal internships."
      ],
      learningOutcomes: [
        "Build a defensible research question and a coherent thesis claim early.",
        "Write a synthesis-style literature review (sources in conversation, not summary stacks).",
        "Draft and revise iteratively with reader-value focus (clarity, structure, evidence, counterarguments).",
        "Maintain clean research workflow: citations, notes, and version control."
      ],
      resources: {
        videos: [
          "https://ocw.mit.edu/courses/17-tht-thesis-research-design-seminar-fall-2004/",
          "https://writingcenter.fas.harvard.edu/thesis",
          "https://writingproject.fas.harvard.edu/pages/senior-thesis-writing-guides",
          "https://www.youtube.com/watch?v=fNss302UfaQ",
          "https://www.youtube.com/playlist?list=PL4asXgsr6ek5H5mM9GlA1d-YCb9KvP3Ja"
        ],
        websites: [
          "https://writingproject.fas.harvard.edu/pages/writing-guides",
          "https://owl.purdue.edu/owl/research_and_citation/conducting_research/writing_a_literature_review.html",
          "https://www.zotero.org/support/screencast_tutorials"
        ],
        tools: [
          "Zotero (citations + annotated bibliography)",
          "Hypothes.is (annotation for sources)",
          "Overleaf (optional, for polished formatting)",
          "Obsidian/Notion (outline + note system)"
        ]
      }
    }
  },
];

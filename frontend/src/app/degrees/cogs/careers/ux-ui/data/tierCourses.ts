/**
 * UX/UI Design & Research - Tier Course Data
 * Career Path: UX Designer, UI Designer, UX Researcher, Product Designer
 */

import { TierCourse } from '@/types/careerPath';

/**
 * TIER 1 — MUST-TAKE for UI/UX (High-ROI)
 * These courses are foundational for any UI/UX career.
 * Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites early on before graduation.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: 'uxui-cogs-128',
    code: 'COGS 128',
    name: 'Cognitive Engineering',
    fullName: 'COGS 128: Cognitive Engineering',
    description:
      'Human factors + cognition applied to system design—excellent for complex workflows (enterprise tools, safety-critical UI, dashboards).',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'This course is a cheat code for enterprise UX and “complex product” design. You learn how humans interact with real systems under constraints (time pressure, interruptions, safety), which mirrors the reality of professional UX work.',
      realWorldApplications: [
        'Designing workflows for complex tools (admin panels, analytics, internal systems)',
        'Applying human factors to prevent errors and improve reliability',
        'Designing for interruptions, multitasking, and edge cases',
        'Evaluating systems with cognitive walkthroughs and task analysis',
        'Improving decision-support interfaces (dashboards, alerts, summaries)',
      ],
      learningOutcomes: [
        'Use task analysis to break down workflows and identify friction points',
        'Apply human factors principles to reduce errors and improve performance',
        'Design interfaces that support real-world cognition (attention, memory, workload)',
        'Evaluate complex systems using structured methods (walkthroughs, simulations)',
        'Communicate design tradeoffs and constraints clearly',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=cognitive+walkthrough+tutorial',
          'https://www.youtube.com/results?search_query=task+analysis+UX+tutorial',
          'https://www.youtube.com/results?search_query=human+factors+engineering+UI+design',
          'https://www.youtube.com/@NNgroup',
          'https://www.youtube.com/results?search_query=designing+enterprise+UX+dashboards',
        ],
        websites: [
          'https://www.nngroup.com/articles/cognitive-walkthrough/',
          'https://www.nngroup.com/articles/task-analysis/',
          'https://www.nngroup.com/articles/enterprise-ux/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://developer.apple.com/design/human-interface-guidelines',
        ],
        tools: ['Figma', 'FigJam', 'Miro', 'Notion'],
      },
      additionalNotes:
        'This is especially valuable if you want UX for healthcare, finance, security, logistics, or any “high-stakes / complex workflow” domain.',
    },
  },
  {
    id: 'uxui-cse-155',
    code: 'CSE 155',
    name: 'Human-Computer Interaction',
    fullName: 'CSE 155: Introduction to Human-Computer Interaction',
    description:
      'The flagship HCI course: end-to-end UX process (problem framing → prototyping → usability testing → iteration → implementation constraints).',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'This is the core “how to actually do UX” course. You learn to turn ambiguous user needs into testable designs, run studies, and iterate with evidence—exactly what UX designers and researchers do in industry.',
      realWorldApplications: [
        'Running moderated/unmoderated usability tests and translating findings into design changes',
        'Building lo/hi-fi prototypes (Figma) and validating flows with task-based testing',
        'Conducting heuristic evaluations and accessibility checks before development',
        'Writing clear UX documentation: user journeys, scenarios, requirements, and design rationale',
        'Collaborating with engineers using constraints (latency, responsiveness, platform guidelines)',
      ],
      learningOutcomes: [
        'Apply the full user-centered design cycle (discover → define → design → test → iterate)',
        'Select the right evaluation method (heuristics vs usability tests vs interviews) for a question',
        'Design and prototype interfaces using established interaction patterns',
        'Measure usability (effectiveness, efficiency, satisfaction) and interpret results',
        'Communicate design decisions to stakeholders with evidence and clarity',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/@NNgroup',
          'https://www.youtube.com/results?search_query=human+computer+interaction+course+usability+testing',
          'https://www.youtube.com/results?search_query=heuristic+evaluation+nielsen+norman+group',
          'https://www.youtube.com/results?search_query=figma+prototyping+beginner+to+advanced',
          'https://www.youtube.com/results?search_query=accessibility+for+designers+WCAG+basics',
        ],
        websites: [
          'https://www.nngroup.com/articles/ten-usability-heuristics/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://m3.material.io/',
          'https://developer.apple.com/design/human-interface-guidelines',
          'https://www.figma.com/community',
        ],
        tools: [
          'Figma',
          'FigJam',
          'Miro',
          'Notion',
          'Google Forms (quick surveys)',
          'Maze (prototype testing)',
          'Optimal Workshop (IA/card sorting/tree testing)',
        ],
      },
      additionalNotes:
        'If you can only take one “pure UX” class, make it this. Treat every assignment like portfolio material: show your problem statement, research plan, iterations, and what changed based on data.',
    },
  },
  {
    id: 'uxui-cogs-105',
    code: 'COGS 105',
    name: 'Research Methods',
    fullName: 'COGS 105: Research Methods for Cognitive Scientists',
    description:
      'The UX research backbone: study design, measurement, bias, and interpreting qualitative + quantitative evidence responsibly.',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'UX research is about getting reliable signal from messy human data. This course builds your ability to design valid studies, avoid bias, and defend conclusions—skills that directly map to UX researcher and product research roles.',
      realWorldApplications: [
        'Writing a research plan (objectives, hypotheses, recruiting, instruments, ethics)',
        'Choosing between interviews, surveys, experiments, and observational methods',
        'Reducing bias (leading questions, sampling bias, confirmation bias, demand characteristics)',
        'Turning raw notes into insights (coding themes, triangulating evidence)',
        'Designing measurement that supports product decisions (metrics + narrative)',
      ],
      learningOutcomes: [
        'Design studies with clear variables, controls, and measurable outcomes',
        'Understand internal vs external validity and common threats to each',
        'Collect and interpret qualitative data using structured analysis methods',
        'Use basic quantitative reasoning to summarize and compare outcomes',
        'Communicate research limitations honestly and propose next steps',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=UX+research+methods+interviews+surveys+experiments',
          'https://www.youtube.com/results?search_query=thematic+analysis+qualitative+research+tutorial',
          'https://www.youtube.com/results?search_query=how+to+write+a+research+plan+UX',
          'https://www.youtube.com/results?search_query=avoiding+survey+bias+question+design',
          'https://www.youtube.com/@NNgroup',
        ],
        websites: [
          'https://www.nngroup.com/articles/which-ux-research-methods/',
          'https://www.nngroup.com/articles/task-scenarios-usability-testing/',
          'https://www.nngroup.com/articles/field-studies/',
          'https://www.nngroup.com/articles/quant-vs-qual/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
        ],
        tools: [
          'Dovetail (research repository)',
          'Notion (research hub)',
          'Google Forms / Qualtrics',
          'Zoom (recorded interviews)',
          'Otter / automated transcription tools',
        ],
      },
      additionalNotes:
        'Pair this with CSE 155. Together they give you “research + design + testing” credibility, which is what hiring managers look for in early UX roles.',
    },
  },
  {
    id: 'uxui-psy-160',
    code: 'PSY 160',
    name: 'Cognitive Psychology',
    fullName: 'PSY 160: Cognitive Psychology',
    description:
      'Human information processing: attention, memory, perception, and decision-making—directly explains why interfaces feel “easy” or “confusing.”',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Great UX aligns with how humans actually think: limited working memory, selective attention, and biased decision-making. This course helps you design flows that reduce cognitive load, improve learnability, and prevent errors.',
      realWorldApplications: [
        'Reducing cognitive load through chunking, progressive disclosure, and clear hierarchy',
        'Designing error prevention + recovery (recognition over recall, undo/redo)',
        'Improving onboarding and learnability using mental models and memory principles',
        'Designing attention-aware layouts (contrast, grouping, visual search)',
        'Building interfaces that reduce slips/mistakes under stress or time pressure',
      ],
      learningOutcomes: [
        'Explain how attention and perception affect what users notice and miss',
        'Apply working memory limits to information architecture and screen density',
        'Use memory principles (recognition vs recall) to design navigation and UI copy',
        'Understand decision-making and judgment errors that affect user choices',
        'Translate cognitive concepts into actionable UI design rules',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=working+memory+UX+design+cognitive+load',
          'https://www.youtube.com/results?search_query=attention+perception+in+UI+design',
          'https://www.youtube.com/results?search_query=cognitive+biases+in+product+design',
          'https://www.youtube.com/@NNgroup',
          'https://www.youtube.com/results?search_query=visual+hierarchy+UI+design+principles',
        ],
        websites: [
          'https://www.nngroup.com/articles/recognition-and-recall/',
          'https://www.nngroup.com/articles/short-term-memory-and-web-design/',
          'https://www.nngroup.com/articles/cognitive-load-definition/',
          'https://www.nngroup.com/articles/visual-hierarchy-ux-definition/',
          'https://www.nngroup.com/articles/mental-models/',
        ],
        tools: ['Figma', 'FigJam', 'Notion'],
      },
      additionalNotes:
        'When writing portfolio case studies, explicitly name the cognitive principle you used (e.g., “recognition over recall”, “reduce cognitive load”) and show how it changed the design.',
    },
  },
  {
    id: 'uxui-bioe-021',
    code: 'BIOE 021',
    name: 'Intro to Computing with Python',
    fullName: 'BIOE 021: Introduction to Computing with Python',
    description:
      'Data-driven UX superpower: automate analysis (surveys, experiments), prototype quick scripts, and work comfortably with product metrics.',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Many modern UX roles (especially UX Research Ops, Product Analytics–leaning UX, and growth/product design) benefit from being able to manipulate data directly. Python lets you clean exports, analyze experiments, and build repeatable workflows.',
      realWorldApplications: [
        'Cleaning survey exports and generating summary tables/charts',
        'Analyzing usability metrics (task completion, time on task, errors)',
        'A/B test analysis (basic comparisons and visualization)',
        'Automating repetitive research ops tasks (renaming files, parsing logs, formatting results)',
        'Creating quick prototypes: scripts that simulate user flows or transform data for dashboards',
      ],
      learningOutcomes: [
        'Write Python programs with core control flow and data structures',
        'Load, clean, and transform data for analysis',
        'Create basic visualizations to communicate findings',
        'Build reproducible workflows (scripts/notebooks) instead of one-off manual steps',
        'Develop enough technical literacy to collaborate with analysts/engineers',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=python+for+data+analysis+pandas+beginner',
          'https://www.youtube.com/results?search_query=python+matplotlib+basics+data+visualization',
          'https://www.youtube.com/results?search_query=analyzing+AB+tests+python+tutorial',
          'https://www.youtube.com/results?search_query=python+csv+cleaning+tutorial',
          'https://www.youtube.com/results?search_query=jupyter+notebook+data+analysis+workflow',
        ],
        websites: [
          'https://pandas.pydata.org/docs/',
          'https://matplotlib.org/stable/index.html',
          'https://www.kaggle.com/learn/pandas',
          'https://realpython.com/',
          'https://www.statsmodels.org/stable/index.html',
        ],
        tools: [
          'Python',
          'Jupyter Notebook / JupyterLab',
          'VS Code',
          'pandas',
          'matplotlib',
          'statsmodels',
        ],
      },
      additionalNotes:
        'For UX, focus on: reading CSVs, cleaning columns, grouping/aggregating, and producing charts + a short written interpretation.',
    },
  },
  {
    id: 'uxui-mist-060',
    code: 'MIST 060',
    name: 'Introductory Data Analytics',
    fullName: 'MIST 060: Introductory Data Analytics',
    description:
      'Practical analytics workflow for dashboards and stakeholder-ready reporting—useful for UX metrics, product KPIs, and research readouts.',
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'UX work is stronger when it connects to outcomes: adoption, retention, task success, and conversion. This course builds confidence in turning messy data into decisions and communicating results to non-technical stakeholders.',
      realWorldApplications: [
        'Defining UX/product metrics (activation, funnel drop-offs, retention cohorts)',
        'Creating dashboards and recurring reporting for stakeholders',
        'Exploratory data analysis to spot UX friction points',
        'Combining qualitative insights with behavioral data for stronger narratives',
        'Supporting experiments (A/B tests) with data summaries and visuals',
      ],
      learningOutcomes: [
        'Understand an end-to-end analytics workflow (data → cleaning → analysis → visualization → decision)',
        'Build visualizations that answer specific stakeholder questions',
        'Explain what a KPI is and how to choose metrics that match goals',
        'Communicate limitations and avoid misleading charts/claims',
        'Create clear “so what / now what” recommendations from evidence',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=product+analytics+metrics+funnels+retention+cohorts',
          'https://www.youtube.com/results?search_query=dashboard+design+best+practices',
          'https://www.youtube.com/results?search_query=data+storytelling+for+stakeholders',
          'https://www.youtube.com/results?search_query=AB+testing+basics+product+analytics',
          'https://www.youtube.com/results?search_query=ux+metrics+task+success+rate+time+on+task',
        ],
        websites: [
          'https://www.nngroup.com/articles/ux-metrics/',
          'https://www.nngroup.com/articles/funnel-analysis/',
          'https://www.tableau.com/learn',
          'https://learn.microsoft.com/power-bi/',
          'https://cloud.google.com/looker/docs',
        ],
        tools: [
          'Tableau',
          'Power BI',
          'Looker / Looker Studio',
          'Google Sheets / Excel',
          'SQL (optional but huge ROI)',
        ],
      },
      additionalNotes:
        'Even if the course uses a specific tool suite, the transferable skill is “asking the right question, defining the right metric, and building a visualization that answers it.”',
    },
  },
];

/**
 * TIER 2 — STRONG UI/UX BOOSTERS
 * These courses turn a generalist into a specialist, making you a "UX-aware engineer" or a "Technical Product Designer".
 */
export const tier2Courses: TierCourse[] = [
  {
    id: 'uxui-cogs-140',
    code: 'COGS 140',
    name: 'Perception and Action',
    fullName: 'COGS 140: Perception and Action',
    description:
      'High-impact for AR/VR + interaction design: perception, motion, motor control, and how humans physically interact with interfaces.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'If you want spatial computing, AR/VR, or interaction-heavy products, you need to understand human perception/action constraints. This course helps you design interactions that “feel right” and reduce misclicks, fatigue, and errors.',
      realWorldApplications: [
        'Designing AR/VR interactions that match human perceptual limits',
        'Improving touch targets, gesture controls, and pointing interactions',
        'Reducing motion sickness risk through better motion/feedback design',
        'Designing for accessibility and motor limitations',
        'Building better microinteractions (timing, feedback, transitions)',
      ],
      learningOutcomes: [
        'Explain how humans perceive color, motion, space, and shape',
        'Connect motor control principles to interaction design',
        'Use perception/action insights to justify UI layout and interaction choices',
        'Understand experimental approaches used to study perception and behavior',
        'Translate research findings into practical design constraints',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=fitts+law+ux+design+explained',
          'https://www.youtube.com/results?search_query=ar+vr+interaction+design+principles',
          'https://www.youtube.com/results?search_query=motion+design+microinteractions+best+practices',
          'https://www.youtube.com/results?search_query=human+perception+color+motion+psychophysics',
          'https://www.youtube.com/@NNgroup',
        ],
        websites: [
          'https://www.nngroup.com/articles/fitts-law/',
          'https://developer.apple.com/design/human-interface-guidelines',
          'https://m3.material.io/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://learn.microsoft.com/windows/apps/design/',
        ],
        tools: ['Figma', 'ProtoPie', 'Framer', 'After Effects (motion)', 'Unity (AR/VR prototyping)'],
      },
      additionalNotes:
        'Even if you never do AR/VR, the “perception + action” mindset improves everyday UI: spacing, targets, feedback, and interaction timing.',
    },
  },
  {
    id: 'uxui-cogs-104',
    code: 'COGS 104',
    name: 'Complex Adaptive Systems',
    fullName: 'COGS 104: Complex Adaptive Systems',
    description:
      'Perfect for platform/social UX: network effects, emergent behavior, and how system-level outcomes appear from many user interactions.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Platform UX isn’t just screens—it’s ecosystems. This course helps you reason about community behavior, virality, moderation dynamics, and unintended consequences of design changes.',
      realWorldApplications: [
        'Designing social features while anticipating emergent behaviors',
        'Understanding network effects in growth and retention',
        'Analyzing how incentives (likes, follows, streaks) change behavior',
        'Evaluating policy + UX changes (moderation, recommendation) at system scale',
        'Communicating “second-order effects” to product teams',
      ],
      learningOutcomes: [
        'Explain emergence, feedback loops, and adaptation in user ecosystems',
        'Interpret network dynamics relevant to platforms and communities',
        'Model how small UX changes can create large system-level impacts',
        'Think in terms of incentives, interactions, and unintended consequences',
        'Build a more rigorous mental model for social/product strategy',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=network+effects+platform+design+explained',
          'https://www.youtube.com/results?search_query=complex+systems+feedback+loops+explained',
          'https://www.youtube.com/results?search_query=recommender+systems+user+behavior+feedback+loop',
          'https://www.youtube.com/results?search_query=social+computing+ux+design+principles',
          'https://www.youtube.com/results?search_query=behavioral+economics+in+product+design',
        ],
        websites: [
          'https://www.nngroup.com/articles/social-media-ux/',
          'https://www.nngroup.com/articles/dark-patterns/',
          'https://m3.material.io/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://developer.apple.com/design/human-interface-guidelines',
        ],
        tools: ['FigJam', 'Miro', 'Notion', 'Excel/Sheets', 'Python (optional for modeling)'],
      },
      additionalNotes:
        'Great pairing with “consumer behavior” or “decision making” courses if you want growth/product design.',
    },
  },

  {
    id: 'uxui-psy-120',
    code: 'PSY 120',
    name: 'Health Psychology',
    fullName: 'PSY 120: Health Psychology',
    description:
      'Behavior change and adherence: ideal for health-tech UX, wellness products, and designing interventions that actually stick.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Health and wellness UX requires evidence-based behavior change design (not “motivational vibes”). This course strengthens your ability to design habits, reduce friction, and avoid harmful patterns—key for healthcare and mental health products.',
      realWorldApplications: [
        'Designing habit-forming flows that are ethical and supportive (not addictive)',
        'Improving adherence: reminders, check-ins, streaks, and accountability patterns',
        'Designing for vulnerable users and sensitive contexts',
        'Creating better onboarding that supports long-term retention in wellness apps',
        'Communicating behavioral rationale to clinicians and product teams',
      ],
      learningOutcomes: [
        'Understand major theories of health behavior and behavior change',
        'Identify barriers to adherence and design interventions around them',
        'Evaluate interventions using measurable outcomes and study design concepts',
        'Translate behavioral science into UX patterns responsibly',
        'Reason about ethics and potential harm in behavior design',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=behavior+change+design+health+apps+ux',
          'https://www.youtube.com/results?search_query=habit+formation+psychology+basics',
          'https://www.youtube.com/results?search_query=ethical+persuasive+design+dark+patterns',
          'https://www.youtube.com/@NNgroup',
          'https://www.youtube.com/results?search_query=healthcare+ux+case+study',
        ],
        websites: [
          'https://www.nngroup.com/articles/healthcare-ux/',
          'https://www.nngroup.com/articles/ethics-ux/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://developer.apple.com/design/human-interface-guidelines',
          'https://m3.material.io/',
        ],
        tools: ['Figma', 'Maze', 'Dovetail', 'Notion'],
      },
      additionalNotes:
        'If you’re aiming for health UX, build at least one portfolio project with a clear behavior-change hypothesis + a test plan.',
    },
  },
  {
    id: 'uxui-cse-022',
    code: 'CSE 022',
    name: 'Intro to Programming',
    fullName: 'CSE 022: Introduction to Programming',
    description:
      'Technical literacy for designers: collaborate with engineers, understand feasibility, and prototype interactive behavior with confidence.',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'You don’t need to become a full SWE, but you do need to collaborate with them. Programming fundamentals help you propose realistic interactions, debug UI behaviors, and communicate in a way engineers respect.',
      realWorldApplications: [
        'Writing clearer design specs because you understand edge cases and state',
        'Prototyping interactions (conditional flows, validation, error states)',
        'Collaborating better in design handoff (constraints, components, responsiveness)',
        'Understanding front-end logic (forms, data fetching, loading states)',
        'Reducing implementation churn by anticipating engineering constraints',
      ],
      learningOutcomes: [
        'Write basic programs using variables, control flow, functions, and data structures',
        'Develop computational thinking for breaking down product problems',
        'Understand debugging as a design skill (trace, test, iterate)',
        'Explain interface logic clearly (state, events, inputs/outputs)',
        'Build technical confidence for design-engineering collaboration',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=intro+to+programming+concepts+variables+loops+functions',
          'https://www.youtube.com/results?search_query=frontend+basics+html+css+javascript+for+designers',
          'https://www.youtube.com/results?search_query=state+and+events+in+UI+programming+explained',
          'https://www.youtube.com/results?search_query=debugging+basics+for+beginners',
          'https://www.youtube.com/results?search_query=design+handoff+to+developers+best+practices',
        ],
        websites: [
          'https://developer.mozilla.org/',
          'https://www.freecodecamp.org/',
          'https://javascript.info/',
          'https://web.dev/learn/',
          'https://www.nngroup.com/articles/developer-handoff/',
        ],
        tools: ['VS Code', 'GitHub', 'Chrome DevTools', 'CodeSandbox'],
      },
      additionalNotes:
        'If you want to be a “Product Designer who codes” or “Design Engineer,” this is a must.',
    },
  },
  {
    id: 'uxui-phil-110',
    code: 'PHIL 110',
    name: 'Philosophy of CogSci',
    fullName: 'PHIL 110: Philosophy of Cognitive Science',
    description:
      'Ethics + reasoning: helps you avoid dark patterns, reason about manipulation, and design responsibly (especially for growth/AI products).',
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'UX decisions are ethical decisions. This course strengthens your reasoning about responsibility, fairness, and human cognition—useful for AI UX, persuasive design, and any product with high impact.',
      realWorldApplications: [
        'Identifying and avoiding manipulative UX patterns (“dark patterns”)',
        'Making ethical tradeoffs in onboarding, notifications, and monetization',
        'Evaluating AI interfaces for transparency, trust, and user autonomy',
        'Writing ethical design rationale and defending decisions with clear reasoning',
        'Building a strong product sense grounded in human cognition + values',
      ],
      learningOutcomes: [
        'Reason clearly about arguments, evidence, and assumptions',
        'Identify ethical risks in product decisions and propose mitigations',
        'Understand key philosophical issues relevant to cognition and AI',
        'Communicate nuanced tradeoffs without hand-waving',
        'Apply critical thinking to ambiguous, high-stakes design problems',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=dark+patterns+ux+ethics+explained',
          'https://www.youtube.com/results?search_query=ethics+in+product+design+tutorial',
          'https://www.youtube.com/results?search_query=human+centered+ai+interface+design',
          'https://www.youtube.com/@NNgroup',
          'https://www.youtube.com/results?search_query=critical+thinking+logic+basics',
        ],
        websites: [
          'https://www.nngroup.com/articles/dark-patterns/',
          'https://www.nngroup.com/articles/ethics-ux/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://developer.apple.com/design/human-interface-guidelines',
          'https://m3.material.io/',
        ],
        tools: ['Notion', 'FigJam', 'Figma'],
      },
      additionalNotes:
        'For hiring: being able to articulate ethical considerations is a differentiator, especially for growth, fintech, health, and AI products.',
    },
  },
];

/**
 * TIER 3 — UI/UX-ADJACENT (Applied/Interest-Based)
 * Specialized depth for niche roles like UX Writer or Voice Interface Designer.
 */
export const tier3Courses: TierCourse[] = [
  {
    id: 'uxui-cogs-005',
    code: 'COGS 005',
    name: 'Language & Linguistics',
    fullName: 'COGS 005: Introduction to Language and Linguistics',
    description:
      'Conversation design foundation: language structure and meaning for chatbots, voice UI, UX writing, and content design.',
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'If you’re interested in UX writing, conversation design, or voice assistants, you need language fundamentals. This course helps you design clearer microcopy, better prompts, and more natural conversational flows.',
      realWorldApplications: [
        'Designing chatbot and voice assistant interactions (turn-taking, intent clarity, repair)',
        'Writing clearer UI microcopy and error messages',
        'Improving information scent and labeling (navigation, menus, settings)',
        'Building better prompts and response patterns for AI assistants',
        'Designing content that reduces ambiguity and user confusion',
      ],
      learningOutcomes: [
        'Understand core linguistic components (sound, structure, meaning, pragmatics)',
        'Analyze how meaning changes with context and interaction goals',
        'Apply language insights to UX writing and conversation flows',
        'Recognize ambiguity sources and design around them',
        'Communicate language constraints to product teams',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=conversation+design+chatbots+best+practices',
          'https://www.youtube.com/results?search_query=ux+writing+microcopy+principles',
          'https://www.youtube.com/results?search_query=voice+ui+design+principles',
          'https://www.youtube.com/results?search_query=prompt+design+for+conversational+ui',
          'https://www.youtube.com/results?search_query=information+scent+ux+labeling',
        ],
        websites: [
          'https://www.nngroup.com/articles/microcopy/',
          'https://www.nngroup.com/articles/voice-interfaces/',
          'https://www.nngroup.com/articles/writing-for-the-web/',
          'https://developer.apple.com/design/human-interface-guidelines',
          'https://m3.material.io/',
        ],
        tools: ['Figma', 'Notion', 'ChatGPT (for draft → then human edit)', 'Voiceflow (conversation prototyping)'],
      },
      additionalNotes:
        'Conversation design portfolios shine when you show: intents, sample dialogs, error recovery, and metrics for success.',
    },
  },

  {
    id: 'uxui-econ-108',
    code: 'ECON 108',
    name: 'Consumer Behavior',
    fullName: 'ECON 108: Marketing & Consumer Behavior',
    description:
      'Product/growth UX booster: connects user needs to market positioning, motivation, and business outcomes.',
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'Product designers must balance user value and business value. Consumer behavior helps you understand motivation, persuasion, and segmentation—useful for growth/product design and market-facing UX work.',
      realWorldApplications: [
        'Designing onboarding and value propositions that match user motivations',
        'Segmenting users and tailoring experiences to different needs',
        'Evaluating pricing/packaging UX (plans, paywalls, trials) ethically and effectively',
        'Designing funnels and reducing drop-off using behavioral insights',
        'Linking UX improvements to business metrics (conversion, retention, LTV)',
      ],
      learningOutcomes: [
        'Understand psychological drivers of consumer decisions',
        'Apply segmentation and positioning concepts to product experiences',
        'Reason about tradeoffs between persuasion and ethics',
        'Connect UX work to measurable business outcomes',
        'Develop stronger product sense and strategy thinking',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=growth+design+onboarding+case+study',
          'https://www.youtube.com/results?search_query=consumer+psychology+in+product+design',
          'https://www.youtube.com/results?search_query=pricing+UX+best+practices',
          'https://www.youtube.com/results?search_query=conversion+rate+optimization+for+designers',
          'https://www.youtube.com/@NNgroup',
        ],
        websites: [
          'https://www.nngroup.com/articles/persuasive-technology/',
          'https://www.nngroup.com/articles/dark-patterns/',
          'https://www.nngroup.com/articles/landing-page-ux/',
          'https://m3.material.io/',
          'https://developer.apple.com/design/human-interface-guidelines',
        ],
        tools: ['Figma', 'Google Analytics', 'Amplitude', 'Mixpanel', 'Hotjar'],
      },
      additionalNotes:
        'If you’re going into growth/product design, pair this with analytics + A/B testing practice.',
    },
  },
  {
    id: 'uxui-cse-108',
    code: 'CSE 108',
    name: 'Full Stack Web Dev',
    fullName: 'CSE 108: Full Stack Web Development',
    description:
      'Design Engineer track: build the interfaces you design (front end + backend awareness + web constraints).',
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'If you want “Product Designer who ships,” “Design Engineer,” or “UX-aware engineer,” this course increases your ability to implement polished UI, understand performance/security constraints, and collaborate across the stack.',
      realWorldApplications: [
        'Implementing responsive UI that matches design specs precisely',
        'Building design systems/components and reusing patterns consistently',
        'Understanding backend constraints that affect UX (latency, loading states, errors)',
        'Shipping real projects with authentication, data, forms, validation, and edge cases',
        'Making accessibility improvements during implementation (semantic HTML, ARIA)',
      ],
      learningOutcomes: [
        'Build full-stack web apps with modern frameworks and patterns',
        'Understand end-to-end data flow (client ↔ server ↔ database)',
        'Implement UI state correctly (loading, empty, error, success, optimistic updates)',
        'Apply security/performance considerations that impact UX',
        'Work with components/design systems and consistent UI patterns',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=responsive+web+design+css+flexbox+grid',
          'https://www.youtube.com/results?search_query=react+beginner+full+course',
          'https://www.youtube.com/results?search_query=nextjs+full+stack+tutorial',
          'https://www.youtube.com/results?search_query=web+accessibility+semantic+html+aria',
          'https://www.youtube.com/results?search_query=frontend+performance+web+vitals+explained',
        ],
        websites: [
          'https://developer.mozilla.org/',
          'https://web.dev/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://m3.material.io/',
          'https://developer.apple.com/design/human-interface-guidelines',
        ],
        tools: ['VS Code', 'GitHub', 'Chrome DevTools', 'React', 'Next.js', 'PostgreSQL', 'Figma (handoff)'],
      },
      additionalNotes:
        'If your goal is product/design engineering, prioritize accessibility + component discipline. Those two traits make you stand out fast.',
    },
  },
  {
    id: 'uxui-cogs-103',
    code: 'COGS 103',
    name: 'Neural Networks',
    fullName: 'COGS 103: Introduction to Neural Networks in Cognitive Science',
    description:
      'AI UX advantage: understand model behavior and limits so you can design interfaces that improve trust, transparency, and user control.',
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        'AI-powered products are everywhere, and “AI UX” requires understanding model uncertainty, failure modes, and what outputs really mean. This course gives you enough mental model to design better AI interactions (guardrails, feedback, transparency).',
      realWorldApplications: [
        'Designing AI features with clear user control and helpful defaults',
        'Communicating uncertainty and limitations without confusing users',
        'Building “human-in-the-loop” workflows (review, edit, approve)',
        'Designing safe fallback experiences when AI fails',
        'Improving trust through transparency, explanations, and provenance UI',
      ],
      learningOutcomes: [
        'Understand what neural networks do at a conceptual level',
        'Recognize common limitations and failure modes relevant to product UX',
        'Think clearly about prediction vs explanation and what users need',
        'Design interfaces that support oversight and correction',
        'Communicate AI behavior in user-centered language',
      ],
      resources: {
        videos: [
          'https://www.youtube.com/results?search_query=neural+networks+explained+for+beginners',
          'https://www.youtube.com/results?search_query=human+centered+ai+ux+design+principles',
          'https://www.youtube.com/results?search_query=designing+AI+product+interfaces+best+practices',
          'https://www.youtube.com/results?search_query=calibration+uncertainty+probability+for+products',
          'https://www.youtube.com/results?search_query=AI+hallucinations+UX+mitigations',
        ],
        websites: [
          'https://www.nngroup.com/articles/ai-user-experience/',
          'https://www.nngroup.com/articles/explainable-ai/',
          'https://www.w3.org/WAI/standards-guidelines/wcag/',
          'https://developer.apple.com/design/human-interface-guidelines',
          'https://m3.material.io/',
        ],
        tools: ['Figma', 'Notion', 'Python (optional)', 'Jupyter Notebook (optional)'],
      },
      additionalNotes:
        'For AI UX portfolios, show how you handle errors + uncertainty + user control. That’s the professional difference-maker.',
    },
  },
];

/**
 * Export all courses as a flat array for the career path configuration
 */
export const allUXUICourses: TierCourse[] = [
  ...tier1Courses,
  ...tier2Courses,
  ...tier3Courses,
];

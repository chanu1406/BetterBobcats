import { TierCourse } from "@/types/careerPath";

export const marketResearchTierCourses: TierCourse[] = [
  // ==================== TIER 1: MUST-TAKE ====================
  {
    id: "econ-108",
    code: "ECON 108",
    name: "Marketing & Consumer Behavior",
    fullName: "ECON 108: Marketing and Consumer Behavior",
    description:
      "Core market-research foundation: connects marketing fundamentals with consumer behavior so you can predict how buyers respond to messaging, pricing, and product changes.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market researchers don’t just measure demand—they explain it. This course gives you the behavioral + marketing framework to interpret why consumers choose what they choose, then translate that into segmentation, positioning, and research questions that companies actually care about.",
      realWorldApplications: [
        "Designing consumer surveys/interviews that map to buying decisions (needs, tradeoffs, willingness-to-pay)",
        "Building segmentation and personas from behavioral + preference data",
        "Evaluating pricing/packaging changes by predicting consumer response",
        "Turning research findings into positioning and messaging recommendations"
      ],
      learningOutcomes: [
        "Explain key drivers of consumer decision-making and how marketers influence them",
        "Translate consumer behavior insights into segmentation and positioning choices",
        "Analyze how pricing, promotion, and product attributes affect demand",
        "Communicate consumer insights as actionable recommendations"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=consumer+behavior+course+lecture",
          "https://www.youtube.com/results?search_query=marketing+segmentation+positioning+targeting+lecture",
          "https://www.youtube.com/results?search_query=pricing+strategy+basics+lecture"
        ],
        websites: [
          "https://www.qualtrics.com/experience-management/research/",
          "https://www.nngroup.com/articles/",
          "https://support.google.com/analytics/"
        ],
        tools: [
          "Qualtrics (or SurveyMonkey)",
          "Excel / Google Sheets",
          "Tableau / Power BI",
          "Google Analytics"
        ]
      }
    }
  },
  {
    id: "econ-117",
    code: "ECON 117",
    name: "Marketing Strategy",
    fullName: "ECON 117: Marketing Strategy",
    description:
      "Takes you from insights → decisions: apply analytical frameworks to positioning, competitive strategy, pricing, and product lifecycle planning.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research becomes valuable when it changes decisions. This course helps you convert research outputs (segments, demand signals, competitive intel) into strategy: where to play, how to win, what to charge, and how to defend positioning over time.",
      realWorldApplications: [
        "Designing go-to-market plans using research-backed positioning and target segments",
        "Running competitive analyses to identify differentiation and threats",
        "Linking pricing decisions to value perception and market structure",
        "Using lifecycle thinking to adjust strategy as products mature or face disruption"
      ],
      learningOutcomes: [
        "Apply strategic frameworks to marketing decisions (positioning, competition, entry)",
        "Use market evidence to justify pricing and product strategy choices",
        "Synthesize research into clear strategic recommendations",
        "Evaluate tradeoffs and risks in marketing decisions over time"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=marketing+strategy+course+lecture",
          "https://www.youtube.com/results?search_query=competitive+analysis+porter+five+forces+marketing",
          "https://www.youtube.com/results?search_query=product+lifecycle+management+marketing"
        ],
        websites: [
          "https://hbr.org/topic/marketing",
          "https://www.thinkwithgoogle.com/",
          "https://www.ama.org/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Tableau / Power BI",
          "Similarweb (competitive traffic research)",
          "Google Trends"
        ]
      }
    }
  },
  {
    id: "econ-153",
    code: "ECON 153",
    name: "Judgment & Decision Making",
    fullName: "ECON 153: Judgment and Decision Making",
    description:
      "The CogSci-Econ edge for market research: understand biases, heuristics, and decision-making under uncertainty to predict real consumer behavior (not idealized rational behavior).",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research constantly runs into ‘irrational’ behavior: framing effects, defaults, loss aversion, and choice overload. This course gives you the tools to anticipate and measure those effects—useful for experiment design, survey wording, and interpreting consumer response more accurately.",
      realWorldApplications: [
        "Designing surveys/choice tasks that avoid misleading framing and measurement bias",
        "Improving conversion by testing choice architecture (defaults, ordering, bundling)",
        "Predicting consumer response to discounts, scarcity, and reference prices",
        "Explaining why two segments react differently to the same offer (risk, loss aversion, attention)"
      ],
      learningOutcomes: [
        "Identify common heuristics and biases that shape real decisions",
        "Explain decision-making under risk/uncertainty and why people deviate from rational models",
        "Apply behavioral concepts to consumer choice and marketing experiments",
        "Critique research designs for confounds caused by framing and context"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=judgment+and+decision+making+course+lecture",
          "https://www.youtube.com/results?search_query=prospect+theory+loss+aversion+explained",
          "https://www.youtube.com/results?search_query=choice+architecture+nudges+explained"
        ],
        websites: [
          "https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/",
          "https://thedecisionlab.com/",
          "https://www.nngroup.com/articles/"
        ],
        tools: [
          "Qualtrics (conjoint / choice experiments)",
          "R or Python (analysis)",
          "Excel / Google Sheets"
        ]
      }
    }
  },
  {
    id: "econ-010",
    code: "ECON 010",
    name: "Statistical Inference",
    fullName: "ECON 010: Statistical Inference",
    description:
      "Non-negotiable quant foundation for market research: sampling, hypothesis testing, confidence intervals, and regression to validate findings and quantify uncertainty.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research lives or dies on inference: is a lift real, or noise? ECON 010 gives you the ability to design studies, sample correctly, run tests, and interpret regression results—so you can defend conclusions when stakeholders ask, “are we sure?”",
      realWorldApplications: [
        "A/B test interpretation (confidence intervals, significance, power intuition)",
        "Estimating market metrics from samples (margin of error, bias, representativeness)",
        "Regression for drivers of purchase intent, awareness, conversion, or satisfaction",
        "Validating whether segment differences are meaningful vs random variation"
      ],
      learningOutcomes: [
        "Apply research design and random sampling ideas to real questions",
        "Compute and interpret confidence intervals and hypothesis tests",
        "Use regression to estimate relationships and interpret coefficients responsibly",
        "Communicate uncertainty, assumptions, and limitations clearly"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@statquest",
          "https://www.youtube.com/@KhanAcademy",
          "https://www.youtube.com/results?search_query=linear+regression+interpretation+course"
        ],
        websites: [
          "https://www.openintro.org/book/os/",
          "https://seeing-theory.brown.edu/",
          "https://www.statsmodels.org/stable/index.html"
        ],
        tools: [
          "Excel / Google Sheets",
          "R (RStudio)",
          "Python (pandas + statsmodels)"
        ]
      }
    }
  },
  {
    id: "mist-060",
    code: "MIST 060",
    name: "Introduction to Data Analytics",
    fullName: "MIST 060: Introductory Data Analytics",
    description:
      "High-level workflow training for market research: clean messy consumer datasets, integrate sources, and build decision-ready visuals/dashboards from real-world data.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research analysts spend a lot of time turning raw exports (survey data, web metrics, CRM pulls) into trustworthy insights. MIST 060 builds the practical workflow—data collection, integration, and visualization—so you can go from messy consumer data to stakeholder-ready reporting.",
      realWorldApplications: [
        "Cleaning survey and panel data (missing values, inconsistent categories, duplicates)",
        "Combining multiple sources (survey + web analytics + sales exports) into one analysis-ready dataset",
        "Building dashboards/visual reporting for awareness, consideration, and purchase-intent tracking",
        "Creating EDA summaries to explain what changed and what it implies for strategy"
      ],
      learningOutcomes: [
        "Perform data cleaning and preprocessing to improve data quality",
        "Integrate datasets from multiple sources and document definitions/assumptions",
        "Create clear visualizations and dashboard-style outputs for decision-making",
        "Communicate insights and limitations in a professional reporting format"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@AlexTheAnalyst",
          "https://www.youtube.com/@tableau",
          "https://www.youtube.com/@MicrosoftPowerBI"
        ],
        websites: [
          "https://www.data-to-viz.com/",
          "https://support.google.com/looker-studio/",
          "https://learn.microsoft.com/power-bi/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Tableau or Power BI",
          "Looker Studio"
        ]
      }
    }
  },
  {
    id: "econ-050",
    code: "ECON 050",
    name: "Business Analytics & Spreadsheets",
    fullName: "ECON 050: Introduction to Business Analytics and Spreadsheets",
    description:
      "Market-research-ready Excel skills: build quantitative models, run scenarios, and summarize consumer/market data fast using spreadsheets.",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Spreadsheets are still the default tool for many market research workflows—quick modeling, forecasting, segmentation tables, and stakeholder deliverables. ECON 050 makes you immediately productive with spreadsheet-based analytics and decision support.",
      realWorldApplications: [
        "Building market sizing and demand scenarios with assumption tables",
        "Creating pivot-table segment cuts (by region, age group, channel, product line)",
        "Running sensitivity analysis for pricing, promotion, and budget tradeoffs",
        "Producing clean weekly/monthly reporting workbooks stakeholders can reuse"
      ],
      learningOutcomes: [
        "Use spreadsheets to manage and analyze business/market datasets",
        "Build decision-support models using functions, tables, and structured assumptions",
        "Create clear summaries (pivots/charts) for segmentation and reporting",
        "Perform scenario and what-if analysis to compare strategies"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=excel+pivot+tables+for+data+analysis",
          "https://www.youtube.com/results?search_query=excel+power+query+cleaning+data",
          "https://www.youtube.com/results?search_query=excel+scenario+analysis+solver+optimization"
        ],
        websites: [
          "https://support.microsoft.com/excel",
          "https://learn.microsoft.com/training/browse/?products=excel",
          "https://www.contextures.com/"
        ],
        tools: [
          "Microsoft Excel",
          "Google Sheets",
          "Excel Power Query"
        ]
      }
    }
  },


  // ==================== TIER 2: STRONG MARKET RESEARCH BOOSTERS ====================
  {
    id: "econ-115",
    code: "ECON 115",
    name: "Industrial Organization",
    fullName: "ECON 115: Economics of Industrial Organization",
    description:
      "Competitive-intelligence core: explains how market structure (monopoly/oligopoly/entry barriers) shapes pricing, product strategy, and what competitors will do next.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research isn’t just surveys—it’s understanding markets. Industrial Organization teaches you how competition works in real industries so you can interpret pricing moves, positioning shifts, and entry threats with a structured framework.",
      realWorldApplications: [
        "Explaining competitor pricing moves using market power and entry-barrier logic",
        "Evaluating whether a market is attractive (concentration, differentiation, switching costs)",
        "Forecasting how competitors react to product launches, bundling, or promotions",
        "Supporting antitrust/market-power analyses for strategy decks and reports"
      ],
      learningOutcomes: [
        "Analyze firm behavior across different market structures (competitive vs concentrated markets)",
        "Explain how barriers to entry and differentiation affect competition",
        "Evaluate market power and competitive dynamics using economic reasoning",
        "Apply IO concepts to real industry cases and strategy decisions"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=industrial+organization+economics+lecture",
          "https://www.youtube.com/results?search_query=oligopoly+cournot+bertrand+stackelberg+explained",
          "https://www.youtube.com/results?search_query=antitrust+economics+basics+lecture"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67605",
          "https://www.justice.gov/atr",
          "https://www.ftc.gov/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Tableau / Power BI",
          "Similarweb (competitive traffic research)"
        ]
      }
    }
  },
  {
    id: "econ-110",
    code: "ECON 110",
    name: "Econometrics",
    fullName: "ECON 110: Econometrics",
    description:
      "Market-research power tool: regression + inference to forecast demand, estimate price elasticity, and test whether marketing changes actually worked.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Econometrics is the strongest signal for advanced market research because it teaches you to model relationships with data and quantify uncertainty. It upgrades you from describing patterns to estimating drivers, predicting outcomes, and defending conclusions with statistical rigor.",
      realWorldApplications: [
        "Estimating price elasticity and promo lift from historical sales data",
        "Building demand forecasting models using regression-based approaches",
        "Measuring campaign impact while controlling for seasonality and confounds",
        "Turning noisy market data into defensible recommendations (with confidence intervals)"
      ],
      learningOutcomes: [
        "Fit and interpret multiple regression models using real economic/market data",
        "Use hypothesis tests and confidence intervals to validate findings",
        "Diagnose common modeling problems (omitted variables, multicollinearity, outliers)",
        "Communicate results clearly: effect sizes, interpretation, assumptions, and limits"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/@statquest",
          "https://www.youtube.com/results?search_query=regression+interpretation+econometrics+lecture",
          "https://www.youtube.com/results?search_query=price+elasticity+estimation+regression"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69004",
          "https://www.openintro.org/book/os/",
          "https://www.statsmodels.org/stable/index.html"
        ],
        tools: [
          "R (RStudio)",
          "Stata",
          "Python (pandas + statsmodels)"
        ]
      }
    }
  },
  {
    id: "econ-170",
    code: "ECON 170",
    name: "Game Theory",
    fullName: "ECON 170: Game Theory",
    description:
      "Strategic logic for market research and competitive intelligence—predict how competitors respond to pricing, entry, and marketing moves using formal models.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Game theory trains you to think in incentives and strategic responses, which is exactly how competitors behave in real markets. You’ll model interactions in strategic and extensive form and apply the logic to social-science settings—useful for anticipating second-order effects of campaigns, pricing, and product launches.",
      realWorldApplications: [
        "Predicting competitor reactions to price cuts, feature launches, or market entry",
        "Analyzing pricing wars and promotion cycles as strategic interactions",
        "Designing strategies that are robust to retaliation (not just best-case outcomes)",
        "Understanding repeated interactions (loyalty programs, subscriptions, long-run competition) at a high level"
      ],
      learningOutcomes: [
        "Model business situations as games by defining players, strategies, payoffs, and information",
        "Identify and interpret Nash equilibrium outcomes in strategic settings",
        "Analyze sequential decisions using extensive-form reasoning (backward-induction thinking)",
        "Translate game-theory insights into actionable competitive strategy recommendations"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=game+theory+nash+equilibrium+explained",
          "https://www.youtube.com/results?search_query=sequential+games+backward+induction+explained",
          "https://www.youtube.com/results?search_query=repeated+games+prisoners+dilemma+explained"
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67625",
          "https://plato.stanford.edu/entries/game-theory/",
          "https://www.investopedia.com/articles/financial-theory/09/game-theory-beyond-basics.asp"
        ],
        tools: [
          "Excel / Google Sheets (payoff tables + scenarios)",
          "Miro (game trees / strategy maps)",
          "Python (optional: simple simulations)"
        ]
      }
    }
  },
  {
    id: "econ-126",
    code: "ECON 126",
    name: "Economics of Innovation",
    fullName: "ECON 126: Economics of Innovation and Entrepreneurship",
    description:
      "Market-research edge for tech and startups—learn how innovation ecosystems work and how new technologies diffuse through markets (adoption, platforms, IP, and incentives).",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research in tech often boils down to: will users adopt this, how fast, and why? ECON 126 builds the economic intuition behind adoption curves, diffusion, network effects, and incentives—so your forecasts and narratives about product growth and market penetration are more defensible.",
      realWorldApplications: [
        "Forecasting adoption for new products using diffusion/adoption logic (early adopters → mainstream)",
        "Analyzing platform/network effects (why growth accelerates—or stalls)",
        "Evaluating R&D and product investment tradeoffs using incentives and market structure",
        "Interpreting how intellectual property and competition shape innovation strategy and market entry"
      ],
      learningOutcomes: [
        "Explain how innovation emerges and spreads in markets and ecosystems",
        "Use economic reasoning to evaluate adoption, diffusion, and growth constraints",
        "Analyze how network effects and platform dynamics change competitive outcomes",
        "Connect IP/incentives to firm strategy and innovation investment decisions"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=diffusion+of+innovation+explained+adoption+curve",
          "https://www.youtube.com/results?search_query=network+effects+platform+economics+explained",
          "https://www.youtube.com/results?search_query=technology+adoption+S+curve+explained",
          "https://www.youtube.com/results?search_query=intellectual+property+economics+explained"
        ],
        websites: [
          "https://catalog.ucmerced.edu/content.php?catoid=24&expand=1&filter%5B3%5D=1&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&navoid=2732&print=",
          "https://www.nber.org/",
          "https://www.oecd.org/innovation/"
        ],
        tools: [
          "Excel / Google Sheets (adoption models, scenarios)",
          "Tableau / Power BI (adoption dashboards)",
          "R or Python (forecasting + cohort analysis)"
        ]
      }
    }
  },
  {
    id: "econ-141",
    code: "ECON 141",
    name: "Human Resource Economics",
    fullName: "ECON 141: Industrial Relations and Human Resource Economics",
    description:
      "Specialization track for people/market research in labor + workplaces—applies economics to hiring, recruiting, compensation incentives, motivation, and teamwork inside firms.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "If you’re doing market research adjacent to labor markets (workforce trends, employer strategy) or moving toward People/Org analytics, this course gives you the economic framework behind how firms design hiring, pay, incentives, and team structures. It helps you interpret organizational behavior through incentives and constraints—not just opinions.",
      realWorldApplications: [
        "Analyzing why firms change compensation, bonus structures, or benefits (incentives + retention)",
        "Evaluating recruiting/hiring strategies with an economic lens (screening, selection, turnover costs)",
        "Interpreting productivity and teamwork outcomes as responses to incentives and workplace design",
        "Supporting consulting-style research on labor strategy, workforce planning, and talent investment"
      ],
      learningOutcomes: [
        "Explain how firms make key human resource decisions (hiring, recruiting, incentives)",
        "Analyze compensation and motivation systems using economic reasoning",
        "Connect teamwork/productivity outcomes to incentives and organizational design",
        "Apply theory to real-world firm and labor-market examples"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=personnel+economics+compensation+incentives+lecture",
          "https://www.youtube.com/results?search_query=efficiency+wage+theory+explained",
          "https://www.youtube.com/results?search_query=principal+agent+problem+incentives+explained"
        ],
        websites: [
          "https://ssha-advising.ucmerced.edu/students/ssha-majors/economics",
          "https://www.bls.gov/",
          "https://www.o*netonline.org/"
        ],
        tools: [
          "Excel / Google Sheets",
          "R or Python (regression + analysis)",
          "Tableau / Power BI"
        ]
      },
      additionalNotes:
        "ECON 141 appears in UC Merced materials as “Industrial Relations and Human Resource Economics” (4 units) and may vary by catalog year and/or be cross-listed (e.g., MGMT 141). Confirm current offering via the Schedule of Classes."
    }
  },
  {
    id: "mist-135",
    code: "MIST 135",
    name: "Tech Communication & Viz",
    fullName: "MIST 135: Technical Communication and Visualization Skills",
    description:
      "Builds the communication layer of market research: turn analysis into clear visuals + executive-ready narratives through best-practice seminars and project presentations.",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research only creates value if stakeholders understand and trust it. This course strengthens how you present evidence—tight story structure, clear visuals, and professional delivery—so your findings drive decisions (positioning, pricing, messaging, product changes).",
      realWorldApplications: [
        "Creating executive-level slide decks that explain the “so what” behind consumer data",
        "Designing clear charts that avoid misleading framing and improve decision clarity",
        "Building narrative data stories (problem → method → insight → recommendation → risk/limits)",
        "Communicating research limitations and uncertainty without losing stakeholder confidence"
      ],
      learningOutcomes: [
        "Design and critique data visualizations using clear communication principles",
        "Write concise, stakeholder-ready summaries of methods and findings",
        "Deliver professional presentations (individual/team) and defend recommendations",
        "Translate complex analyses into decision-ready narratives and visuals"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=data+storytelling+for+business+presentations",
          "https://www.youtube.com/results?search_query=effective+data+visualization+principles+lecture",
          "https://www.youtube.com/results?search_query=executive+presentation+skills+for+analysts"
        ],
        websites: [
          "https://www.data-to-viz.com/",
          "https://www.nngroup.com/articles/data-visualization/",
          "https://www.storytellingwithdata.com/"
        ],
        tools: [
          "PowerPoint / Google Slides",
          "Tableau or Power BI",
          "Excel / Google Sheets",
          "Figma (optional for visuals)"
        ]
      }
    }
  },

  // ==================== TIER 3: MARKET-ADJACENT (SPECIALIZATION) ====================
  {
    id: "econ-145",
    code: "ECON 145",
    name: "Health Economics",
    fullName: "ECON 145: Health Economics",
    description:
      "High-ROI specialization for healthcare market research: analyze health-care markets, insurance incentives, and how policy/regulation shifts demand, pricing, and outcomes.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Healthcare is a uniquely regulated, incentive-heavy market. ECON 145 helps you understand how insurance design, provider incentives, and policy changes affect consumer/patient behavior and demand—making your healthcare research and forecasting far more realistic than generic market frameworks.",
      realWorldApplications: [
        "Sizing demand for new services (telehealth, clinics, diagnostics) under different insurance/policy scenarios",
        "Evaluating how benefit design changes utilization (copays, deductibles, coverage rules)",
        "Analyzing pharma/health product markets with a policy-and-incentives lens",
        "Explaining market outcomes to stakeholders (why demand changes even when “need” stays constant)"
      ],
      learningOutcomes: [
        "Explain supply and demand for health services and why healthcare markets behave differently",
        "Describe how insurance markets shape incentives and consumer/provider decisions",
        "Evaluate policy/regulatory changes using economic reasoning",
        "Translate health-market dynamics into clearer research assumptions and forecasts"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=health+economics+course+lecture",
          "https://www.youtube.com/results?search_query=health+insurance+economics+explained",
          "https://www.youtube.com/results?search_query=cost+effectiveness+analysis+explained"
        ],
        websites: [
          "https://www.cdc.gov/",
          "https://www.cms.gov/",
          "https://www.kff.org/"
        ],
        tools: [
          "Excel / Google Sheets",
          "R or Python (analysis)",
          "Tableau / Power BI"
        ]
      }
    }
  },
  {
    id: "econ-161",
    code: "ECON 161",
    name: "International Finance & Trade",
    fullName: "ECON 161: International Finance and Trade",
    description:
      "For global market research: understand trade, exchange rates, and cross-border competition so you can interpret international demand shifts and market-entry risk.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Global consumer demand can swing due to exchange rates, trade policy, and cross-border supply constraints. ECON 161 gives you the macro + trade context needed to do credible international market research, especially for multinationals where pricing, sourcing, and demand are tied to currency and policy changes.",
      realWorldApplications: [
        "Interpreting international demand changes when currency moves affect affordability",
        "Supporting global pricing strategy and market-entry research with exchange-rate and trade context",
        "Analyzing cross-border competition and supply-chain constraints that change consumer options",
        "Building country-by-country market narratives that connect policy + currency to consumer outcomes"
      ],
      learningOutcomes: [
        "Explain how exchange rates are determined and why they matter for firms and consumers",
        "Analyze how trade policy influences market access and competitive dynamics",
        "Connect global financial conditions to pricing and demand in different countries",
        "Use international context to strengthen assumptions in market sizing and forecasting"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=international+finance+exchange+rates+explained",
          "https://www.youtube.com/results?search_query=international+trade+theory+comparative+advantage+lecture",
          "https://www.youtube.com/results?search_query=exchange+rate+risk+hedging+explained"
        ],
        websites: [
          "https://data.worldbank.org/",
          "https://www.imf.org/en/Data",
          "https://www.oecd.org/"
        ],
        tools: [
          "Excel / Google Sheets",
          "FRED (macro data)",
          "Tableau / Power BI"
        ]
      }
    }
  },
  {
    id: "econ-151",
    code: "ECON 151",
    name: "Government and Business",
    fullName: "ECON 151: The Economics of Government and Business",
    description:
      "Policy-aware market research: learn how government revenue/spending decisions, public goods, and externalities shape business constraints, regulation, and market outcomes.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "In regulated or policy-sensitive markets, ‘why the market moved’ is often political and institutional—not just consumer preference. ECON 151 builds the economic logic to analyze regulation, externalities, and government-business interactions so your market research can anticipate policy risk and explain industry changes credibly.",
      realWorldApplications: [
        "Assessing how new regulations shift costs, competition, and consumer options in an industry",
        "Evaluating markets with large externalities (energy, transportation, health, environment) where policy drives demand",
        "Supporting consulting-style research on policy impacts, compliance costs, and market structure",
        "Writing stronger market narratives that connect public policy changes to firm strategy and consumer outcomes"
      ],
      learningOutcomes: [
        "Explain how government revenue and expenditure decisions affect economic performance",
        "Analyze public goods and externalities and their impact on markets",
        "Evaluate policy tradeoffs using economic reasoning and clear assumptions",
        "Translate policy/regulation effects into market-research implications (pricing, entry, demand)"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=public+economics+externalities+public+goods+explained",
          "https://www.youtube.com/results?search_query=regulatory+economics+basics+lecture",
          "https://www.youtube.com/results?search_query=policy+impact+analysis+economics+explained"
        ],
        websites: [
          "https://www.bls.gov/",
          "https://www.usa.gov/",
          "https://www.ftc.gov/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Tableau / Power BI",
          "R or Python (analysis)"
        ]
      }
    }
  },
  {
    id: "econ-149",
    code: "ECON 149",
    name: "Economics of Sports",
    fullName: "ECON 149: Economics of Sports",
    description:
      "Specialization for sports/entertainment market research: apply economics to league structures, fan demand, media rights, labor markets, and stadium/public-policy decisions.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Great fit if you want market research in sports, streaming/media, or live events. You learn the economic logic behind leagues and teams (pricing, incentives, labor relations, and market power), which helps you explain fan behavior, revenue models, and competitive dynamics with more rigor than “just marketing intuition.”",
      realWorldApplications: [
        "Analyzing ticket pricing strategies (dynamic pricing, price discrimination, demand shifts)",
        "Studying fan demand and engagement drivers across teams/leagues/seasons",
        "Evaluating media rights and platform deals (how distribution changes revenue and reach)",
        "Understanding player labor markets/contracts and how they shape team strategy and brand value",
        "Assessing stadium/public-funding debates using costs, benefits, and externalities"
      ],
      learningOutcomes: [
        "Apply economic theory to real sports-industry topics (league structure, team decisions, labor relations)",
        "Explain how incentives and market power shape outcomes in sports markets",
        "Analyze policy and financing questions (e.g., stadiums) using economic reasoning",
        "Translate industry dynamics into clearer market-research assumptions and narratives"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=sports+economics+lecture",
          "https://www.youtube.com/results?search_query=dynamic+pricing+ticketing+explained",
          "https://www.youtube.com/results?search_query=media+rights+economics+explained"
        ],
        websites: [
          "https://catalog.ucmerced.edu/",
          "https://www.sportsbusinessjournal.com/",
          "https://www.statista.com/topics/1143/sports/"
        ],
        tools: [
          "Excel / Google Sheets",
          "Tableau / Power BI",
          "R or Python (analysis)"
        ]
      }
    }
  },
  {
    id: "mist-070",
    code: "MIST 070",
    name: "Innovation Management",
    fullName: "MIST 070: Innovation Management",
    description:
      "NPD + startup-facing market research: learn how organizations lead innovation, evaluate opportunities, and move ideas from discovery to commercialization with real adoption constraints.",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Market research for new products is different from research for mature products: you’re validating problems, sizing opportunities, testing positioning, and de-risking adoption. This course strengthens how you think about innovation pipelines, organizational culture, and practical tools/processes that make (or break) successful launches—especially in tech/startup settings.",
      realWorldApplications: [
        "Supporting product discovery (problem framing, customer needs, value proposition testing)",
        "Designing early-market validation plans (MVP feedback loops, pilot studies, adoption barriers)",
        "Evaluating innovation opportunities (market attractiveness, feasibility, commercialization path)",
        "Building innovation roadmaps and stakeholder alignment for cross-functional launch teams",
        "Assessing how org culture/process affects speed-to-market and execution risk"
      ],
      learningOutcomes: [
        "Explain how innovation is organized and led inside firms and teams",
        "Apply common innovation tools and processes to evaluate and develop opportunities",
        "Assess commercialization challenges (adoption, diffusion, competition, execution constraints)",
        "Communicate innovation recommendations clearly to stakeholders"
      ],
      resources: {
        videos: [
          "https://www.youtube.com/results?search_query=innovation+management+course+lecture",
          "https://www.youtube.com/results?search_query=lean+startup+customer+discovery+explained",
          "https://www.youtube.com/results?search_query=new+product+development+process+explained"
        ],
        websites: [
          "https://catalog.ucmerced.edu/",
          "https://www.strategyzer.com/",
          "https://hbr.org/topic/innovation"
        ],
        tools: [
          "Figma (prototypes)",
          "Miro (ideation + customer journey maps)",
          "Excel / Google Sheets (scoring + sizing models)",
          "Notion (research repository)"
        ]
      }
    }
  },
];

/**
 * Signals, Communications & RF Career Path - Tier Courses Data
 * Course recommendations organized by tier for Signals, Communications & RF career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: MUST-TAKE for Signals, Communications & RF
 * Core wireless systems: signal processing, communications theory, RF design, electromagnetics
 * Essential for wireless communications, 5G, satellite, radar, IoT careers
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "signals-ee-102",
    code: "EE 102",
    name: "Signal Processing and Linear Systems",
    fullName: "EE 102: Signal Processing and Linear Systems",
    description: "Digital signal processing, filtering, modulation — THE foundation for all communications systems",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Signal Processing IS the mathematical foundation of all modern communications systems. Essential for understanding modulation, demodulation, filtering, and signal analysis. This is THE most important course for wireless communications, 5G, satellite, and RF engineering careers. Used daily by engineers at Qualcomm, Broadcom, Nokia, Ericsson, and satellite companies.",

      realWorldApplications: [
        "Designing digital filters for wireless receivers (FIR, IIR, adaptive filters)",
        "Implementing FFT algorithms for spectrum analysis and OFDM (5G, WiFi)",
        "Creating modulation and demodulation algorithms (QAM, PSK, FSK)",
        "Designing equalizers to compensate for channel distortion",
        "Implementing error correction coding (convolutional, turbo, LDPC)",
        "Analyzing and processing radar signals and satellite telemetry"
      ],

      learningOutcomes: [
        "Master Fourier analysis and frequency domain signal processing",
        "Design digital filters (FIR, IIR) for communications applications",
        "Understand sampling theory, aliasing, and Nyquist criteria",
        "Analyze signal-to-noise ratio (SNR) and bit error rate (BER)",
        "Implement real-time DSP algorithms on embedded processors"
      ],

      topics: [
        "Continuous and discrete-time signals and systems",
        "Fourier transform, FFT, and frequency domain analysis",
        "Digital filter design: FIR and IIR filters",
        "Sampling, quantization, and analog-to-digital conversion",
        "Convolution, correlation, and matched filtering",
        "Z-transform and system stability analysis",
        "Real-time DSP implementation"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=spUNpyF58BY", // Signal processing intro
          "https://www.youtube.com/watch?v=fWCfJRdaw1k", // Fourier transform
          "https://www.youtube.com/watch?v=BsZdPlK0T-I", // Digital filters
          "https://www.youtube.com/watch?v=QmgJmh2I3Fw"  // DSP for communications
        ],
        websites: [
          "https://www.dspguide.com/", // Comprehensive DSP guide
          "https://jackschaedler.github.io/circles-sines-signals/", // Interactive DSP
          "https://www.analog.com/en/education/education-library/tutorials.html",
          "https://www.dsprelated.com/"
        ],
        tools: [
          "MATLAB/Simulink", // Industry standard for DSP
          "Python (NumPy/SciPy)", // Open-source DSP
          "GNU Radio", // Software-defined radio
          "LabVIEW Communications", // Real-time DSP
          "Xilinx Vivado" // FPGA-based DSP
        ]
      },

      additionalNotes:
        "Signal Processing is THE most critical course for communications and RF careers. Every wireless system (5G, WiFi, Bluetooth, satellite, radar) relies heavily on DSP. This is where theory meets practice in communications engineering."
    }
  },
  {
    id: "signals-ee-115",
    code: "EE 115",
    name: "Electromagnetics and Applications",
    fullName: "EE 115: Electromagnetics and Applications",
    description: "Modulation, wireless channels, communication theory — core for 5G, WiFi, satellite systems",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Communication Systems covers the theory and practice of wireless communications: modulation (AM, FM, QAM, OFDM), channel models, and system design. Essential for wireless engineers at Qualcomm, Broadcom, Nokia, Ericsson, SpaceX (Starlink), and satellite companies. This course directly applies to 5G, WiFi 6/7, Bluetooth, and satellite communications.",

      realWorldApplications: [
        "Designing 5G NR (New Radio) physical layer systems",
        "Implementing WiFi 6/7 (802.11ax/be) OFDM transceivers",
        "Creating satellite communication modems (DVB-S2, DVB-S2X)",
        "Designing Bluetooth LE and IoT wireless systems",
        "Implementing adaptive modulation and coding (AMC) schemes",
        "Analyzing link budgets for wireless system design"
      ],

      learningOutcomes: [
        "Understand analog and digital modulation schemes (AM, FM, PSK, QAM)",
        "Analyze wireless channel models (fading, multipath, Doppler)",
        "Design communication systems with error correction coding",
        "Calculate link budgets and system capacity (Shannon theorem)",
        "Implement OFDM and spread spectrum techniques"
      ],

      topics: [
        "Amplitude and frequency modulation (AM, FM)",
        "Digital modulation: PSK, FSK, QAM, OFDM",
        "Channel models: AWGN, Rayleigh fading, Rician fading",
        "Information theory and Shannon capacity",
        "Error detection and correction (CRC, FEC, LDPC)",
        "Multiple access techniques: TDMA, FDMA, CDMA, OFDMA",
        "Link budget analysis and system design"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=xQDX_5b4BcI", // Communication systems intro
          "https://www.youtube.com/watch?v=EKv28p2BqhE", // Digital modulation
          "https://www.youtube.com/watch?v=BjkqhHl5qKI", // OFDM explained
          "https://www.youtube.com/watch?v=tLKWZGva32k"  // 5G physical layer
        ],
        websites: [
          "https://www.wirelessinnovation.org/introduction-to-wireless-communications",
          "https://www.allaboutcircuits.com/textbook/communication-systems/",
          "https://www.sharetechnote.com/", // Excellent 5G/LTE resource
          "https://www.3gpp.org/" // 5G standards
        ],
        tools: [
          "MATLAB Communications Toolbox",
          "GNU Radio", // Software-defined radio
          "USRP (Universal Software Radio Peripheral)", // SDR hardware
          "5G Toolbox (MATLAB)",
          "Python (Scikit-RF, CommPy)"
        ]
      },

      additionalNotes:
        "Communication Systems is the core theory course for wireless careers. Understanding modulation, channel coding, and system design is essential for 5G, WiFi, satellite, and IoT engineers. This course directly applies to real-world wireless products."
    }
  },
  {
    id: "signals-ee-150",
    code: "EE 150",
    name: "Digital Communication",
    fullName: "EE 150: Digital Communication",
    description: "Antenna theory, wave propagation, RF fundamentals — essential for wireless hardware design",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Electromagnetic Fields and Waves is fundamental for understanding antennas, wave propagation, and RF systems. Essential for RF hardware engineers designing antennas for 5G base stations, smartphones, satellites, and IoT devices. Critical for understanding how wireless signals propagate and interact with the environment.",

      realWorldApplications: [
        "Designing antennas for smartphones, IoT devices, and 5G base stations",
        "Analyzing antenna radiation patterns and gain",
        "Designing microstrip patch antennas and phased arrays",
        "Understanding RF wave propagation in urban and rural environments",
        "Designing waveguides and transmission lines for mmWave systems",
        "Analyzing antenna coupling and interference in MIMO systems"
      ],

      learningOutcomes: [
        "Understand Maxwell's equations and electromagnetic wave propagation",
        "Analyze transmission lines, waveguides, and impedance matching",
        "Design antennas: dipoles, patches, arrays, and phased arrays",
        "Calculate antenna parameters: gain, directivity, radiation pattern",
        "Apply EM theory to RF and microwave system design"
      ],

      topics: [
        "Maxwell's equations and electromagnetic wave propagation",
        "Transmission lines: characteristic impedance, reflection, VSWR",
        "Smith chart and impedance matching techniques",
        "Antenna fundamentals: radiation pattern, gain, directivity",
        "Dipole antennas, monopole antennas, patch antennas",
        "Phased array antennas and beamforming",
        "Waveguides and microwave components"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=FWCN_uI5ygY", // EM waves explained
          "https://www.youtube.com/watch?v=ZaXm6wau-jc", // Antenna basics
          "https://www.youtube.com/watch?v=hHTn6QdHZ5E", // Smith chart tutorial
          "https://www.youtube.com/watch?v=92MlqW4tVYc"  // Phased arrays
        ],
        websites: [
          "https://www.antenna-theory.com/", // Comprehensive antenna resource
          "https://www.microwaves101.com/",
          "https://www.everythingrf.com/community/what-is-an-antenna",
          "https://www.qsl.net/n9zia/wireless/pdf/antennas.pdf"
        ],
        tools: [
          "HFSS (Ansys)", // Industry standard EM simulation
          "CST Studio Suite", // EM simulation
          "FEKO", // Antenna simulation
          "ADS (Keysight)", // RF circuit and EM co-simulation
          "NEC2" // Open-source antenna modeling
        ]
      },

      additionalNotes:
        "Electromagnetics is essential for RF hardware engineers. Understanding antennas, wave propagation, and transmission lines is critical for designing wireless systems, especially for mmWave 5G and satellite communications."
    }
  },
  {
    id: "signals-ee-101",
    code: "EE 101",
    name: "Electromagnetic Field Theory",
    fullName: "EE 101: Electromagnetic Field Theory",
    description: "RF circuit design, amplifiers, filters — hardware foundation for RF front-ends",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Electronic Circuit Design is essential for RF hardware engineers designing RF front-ends: low-noise amplifiers (LNAs), power amplifiers (PAs), mixers, and filters. Critical for understanding how to build the analog hardware that processes wireless signals. Used daily by RF engineers at Qualcomm, Broadcom, Skyworks, and Qorvo.",

      realWorldApplications: [
        "Designing low-noise amplifiers (LNAs) for receiver front-ends",
        "Creating power amplifiers (PAs) for transmitters (WiFi, 5G, cellular)",
        "Implementing RF filters: SAW, BAW, LC filters",
        "Designing mixers and frequency converters",
        "Creating impedance matching networks for maximum power transfer",
        "Designing RF transceivers for IoT and wireless systems"
      ],

      learningOutcomes: [
        "Design RF amplifiers: LNA, PA, gain stages",
        "Understand transistor models for RF applications (BJT, FET, HEMT)",
        "Design passive RF components: filters, matching networks",
        "Analyze noise figure and linearity (IIP3, P1dB)",
        "Apply RF circuit design to wireless front-ends"
      ],

      topics: [
        "RF amplifier design: low-noise amplifiers (LNA)",
        "Power amplifier (PA) design and efficiency",
        "Transistor models for RF: BJT, MOSFET, GaN HEMT",
        "RF filter design: LC filters, SAW, BAW",
        "Impedance matching and Smith chart applications",
        "Noise figure, linearity, and distortion (IIP3, P1dB)",
        "RF mixer and frequency converter design"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=kS4w1S7ffM4", // RF circuits basics
          "https://www.youtube.com/watch?v=E_2qR8e6dWI", // LNA design
          "https://www.youtube.com/watch?v=TIRCOlK2i5k", // Power amplifiers
          "https://www.youtube.com/watch?v=KKkp0GKYB6M"  // RF design fundamentals
        ],
        websites: [
          "https://www.microwaves101.com/",
          "https://www.maximintegrated.com/en/design/technical-documents.html",
          "https://www.analog.com/en/education.html",
          "https://www.rfcafe.com/"
        ],
        tools: [
          "ADS (Keysight Advanced Design System)", // Industry standard RF design
          "Cadence Virtuoso", // IC design with RF extensions
          "LTspice", // Circuit simulation
          "AWR Microwave Office", // RF/microwave design
          "Qucs" // Open-source circuit simulator
        ]
      },

      additionalNotes:
        "RF circuit design is critical for wireless hardware engineers. Understanding LNAs, PAs, filters, and matching networks is essential for designing high-performance RF front-ends for 5G, WiFi, and satellite systems."
    }
  }
];

/**
 * 🟡 TIER 2: STRONG BOOSTERS for Signals, Communications & RF
 * Advanced topics that significantly enhance wireless engineering expertise
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "signals-ee-111",
    code: "EE 111",
    name: "Electronic Circuit Design II",
    fullName: "EE 111: Electronic Circuit Design II",
    description: "mmWave design for 5G and satellite — advanced RF/microwave circuits",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Microwave Engineering covers high-frequency RF design (above 1 GHz), essential for mmWave 5G (24-100 GHz), satellite communications (Ku, Ka bands), and radar systems. Critical for engineers working on 5G mmWave, satellite modems, and automotive radar. High-demand specialty area.",

      realWorldApplications: [
        "Designing mmWave 5G front-ends (24-39 GHz, 37-43.5 GHz bands)",
        "Creating satellite communication RF systems (Ku: 12-18 GHz, Ka: 26-40 GHz)",
        "Designing automotive radar systems (77 GHz)",
        "Implementing microwave components: couplers, dividers, circulators",
        "Designing phased array antennas for beamforming",
        "Creating high-frequency PCB layouts with controlled impedance"
      ],

      learningOutcomes: [
        "Design microwave circuits and components (couplers, filters, dividers)",
        "Understand microwave transmission lines and waveguides",
        "Implement S-parameter analysis for RF characterization",
        "Design mmWave systems for 5G and satellite applications",
        "Apply high-frequency PCB design techniques"
      ],

      topics: [
        "Microwave transmission lines and waveguides",
        "S-parameters and network analysis",
        "Microwave components: couplers, dividers, circulators, isolators",
        "mmWave circuit design for 5G applications",
        "Phased array antennas and beamforming networks",
        "High-frequency PCB design and layout",
        "Microwave measurement techniques"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=0dJL1uZ_v9w", // Microwave engineering intro
          "https://www.youtube.com/watch?v=tLKWZGva32k", // mmWave 5G
          "https://www.youtube.com/watch?v=gUMvwUfpqp8", // S-parameters
          "https://www.youtube.com/watch?v=92MlqW4tVYc"  // Phased arrays
        ],
        websites: [
          "https://www.microwaves101.com/",
          "https://www.everythingrf.com/community",
          "https://www.rfcafe.com/references/electrical/s-parameters.htm",
          "https://www.allaboutcircuits.com/technical-articles/introduction-to-microwave-engineering/"
        ],
        tools: [
          "ADS (Keysight)", // Microwave circuit design
          "HFSS (Ansys)", // EM simulation
          "CST Microwave Studio",
          "AWR Microwave Office",
          "Vector Network Analyzer (VNA)" // Measurement equipment
        ]
      },

      additionalNotes:
        "Microwave Engineering is increasingly important with the rise of 5G mmWave and satellite internet (Starlink, OneWeb). High-demand specialty area with excellent career opportunities."
    }
  },
  {
    id: "signals-ee-105",
    code: "EE 105",
    name: "Analog and Digital Electronics",
    fullName: "EE 105: Analog and Digital Electronics",
    description: "Mixed-signal design for wireless transceivers and baseband processing",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Analog and Digital Electronics is important for wireless engineers working on mixed-signal systems: ADCs, DACs, PLLs, and baseband processors. Essential for understanding the interface between analog RF and digital signal processing in wireless transceivers.",

      realWorldApplications: [
        "Designing ADCs and DACs for wireless transceivers",
        "Creating phase-locked loops (PLLs) for frequency synthesis",
        "Implementing automatic gain control (AGC) circuits",
        "Designing baseband filters and signal conditioning",
        "Creating power management circuits for wireless systems",
        "Implementing mixed-signal ASIC designs for communications"
      ],

      learningOutcomes: [
        "Design ADC and DAC systems for communications applications",
        "Understand PLL design and frequency synthesis",
        "Implement operational amplifier circuits for signal conditioning",
        "Design mixed-signal systems integrating analog and digital",
        "Apply analog circuit design to wireless transceivers"
      ],

      topics: [
        "Analog-to-digital converters (ADC): SAR, pipeline, sigma-delta",
        "Digital-to-analog converters (DAC) for transmitters",
        "Phase-locked loops (PLL) and frequency synthesis",
        "Operational amplifiers and signal conditioning",
        "Voltage references and bias circuits",
        "Power management for wireless systems",
        "Mixed-signal IC design techniques"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=Y2KK4YUfKd8", // ADC/DAC explained
          "https://www.youtube.com/watch?v=EEtkJdhnPjI", // PLL tutorial
          "https://www.youtube.com/watch?v=7FYHt5XviKc", // Op-amps
          "https://www.youtube.com/watch?v=YzQq9rfmUF8"  // Mixed-signal design
        ],
        websites: [
          "https://www.analog.com/en/education.html",
          "https://www.ti.com/data-converters/overview.html",
          "https://www.maximintegrated.com/en/design/technical-documents.html",
          "https://www.allaboutcircuits.com/textbook/semiconductors/"
        ],
        tools: [
          "Cadence Virtuoso", // Mixed-signal IC design
          "ADS (Keysight)", // RF and mixed-signal
          "LTspice", // Circuit simulation
          "MATLAB/Simulink", // System-level modeling
          "Spectre" // Mixed-signal simulation
        ]
      },

      additionalNotes:
        "Mixed-signal design is critical for modern wireless transceivers. Understanding ADCs, DACs, and PLLs is essential for integrating RF front-ends with digital baseband processing."
    }
  },
  {
    id: "signals-ee-140",
    code: "EE 140",
    name: "Computer and Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description: "Embedded programming for wireless modems, SDR, and baseband processors",
    tier: 2,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "Microcontroller Architecture is important for wireless engineers implementing baseband firmware, modem software, and software-defined radio (SDR) applications. Essential for translating DSP algorithms into real-time embedded code for wireless systems.",

      realWorldApplications: [
        "Implementing baseband modem firmware for 5G/LTE systems",
        "Programming software-defined radio (SDR) applications",
        "Creating real-time DSP algorithms on ARM/DSP processors",
        "Developing WiFi and Bluetooth firmware",
        "Implementing PHY layer software for wireless protocols",
        "Optimizing DSP code for ARM Cortex-A/R processors"
      ],

      learningOutcomes: [
        "Program embedded processors for wireless applications",
        "Implement real-time DSP algorithms on ARM/DSP cores",
        "Optimize code for performance and power efficiency",
        "Understand processor architectures: ARM, DSP, FPGA",
        "Apply embedded programming to wireless modem development"
      ],

      topics: [
        "ARM Cortex processor architecture (Cortex-A, Cortex-R)",
        "DSP processors (TI C6000, Analog Devices SHARC)",
        "Real-time operating systems (RTOS) for wireless systems",
        "DSP algorithm implementation and optimization",
        "Hardware accelerators for wireless (FFT, FEC, crypto)",
        "FPGA-based DSP for software-defined radio",
        "Performance profiling and optimization"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=7LqPJGnBPMM", // Microcontrollers
          "https://www.youtube.com/watch?v=3K7dg6H5ByE", // ARM Cortex
          "https://www.youtube.com/watch?v=uyc_pDBskNE", // Real-time programming
          "https://www.youtube.com/watch?v=2pZmKW9-I_k"  // SDR programming
        ],
        websites: [
          "https://www.arm.com/resources/education",
          "https://www.ti.com/processors-and-microcontrollers/overview.html",
          "https://wiki.gnuradio.org/", // GNU Radio SDR
          "https://www.embedded.com/"
        ],
        tools: [
          "ARM Keil MDK", // ARM development
          "Code Composer Studio (TI)", // DSP development
          "GNU Radio", // Software-defined radio
          "Vivado HLS (Xilinx)", // FPGA-based DSP
          "FreeRTOS" // Real-time OS
        ]
      },

      additionalNotes:
        "Embedded programming is essential for wireless engineers implementing baseband firmware and SDR applications. Understanding how to translate DSP theory into efficient real-time code is a valuable skill."
    }
  }
];

/**
 * 🟠 TIER 3: OPTIONAL / INTEREST for Signals, Communications & RF
 * Helpful for specific contexts but not essential for core RF/communications work
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "signals-cse-020",
    code: "CSE 020",
    name: "Introduction to Computing 1",
    fullName: "CSE 020: Introduction to Computing 1",
    description: "High-level programming for simulation, testing, and wireless system modeling",
    tier: 3,
    expandedInfo: {
      credits: 4,
      careerRelevance:
        "While wireless firmware uses C/C++, higher-level languages like Python and MATLAB are widely used for simulation, link-level modeling, system design, and testing automation. Useful for wireless engineers developing system-level models, analyzing data, and creating test scripts.",

      realWorldApplications: [
        "Creating link-level simulations for 5G/WiFi systems in Python/MATLAB",
        "Writing test automation scripts for wireless system validation",
        "Developing channel models and propagation simulators",
        "Creating GUI tools for RF test equipment control",
        "Analyzing spectrum analyzer and network analyzer data",
        "Implementing machine learning for wireless optimization"
      ],

      learningOutcomes: [
        "Write programs in Python or MATLAB for wireless simulation",
        "Create data analysis and visualization tools",
        "Implement link-level wireless system simulations",
        "Apply programming to test automation and analysis",
        "Understand software engineering for wireless development"
      ],

      topics: [
        "Programming fundamentals: variables, loops, functions",
        "Data structures for signal processing",
        "Scientific computing libraries: NumPy, SciPy, Matplotlib",
        "Object-oriented programming for simulation frameworks",
        "File I/O and data processing",
        "Version control and collaborative development"
      ],

      resources: {
        videos: [
          "https://www.youtube.com/watch?v=rfscVS0vtbw", // Python basics
          "https://www.youtube.com/watch?v=_uQrJ0TkZlc", // Python for engineers
          "https://www.youtube.com/watch?v=HXV3zeQKqGY"  // Data analysis
        ],
        websites: [
          "https://www.python.org/about/gettingstarted/",
          "https://realpython.com/",
          "https://numpy.org/doc/stable/user/absolute_beginners.html",
          "https://scipy-lectures.org/"
        ],
        tools: [
          "Python", // High-level programming
          "MATLAB", // Wireless system simulation
          "Jupyter Notebook", // Interactive development
          "GNU Radio", // SDR with Python
          "PyCharm" // Python IDE
        ]
      },

      additionalNotes:
        "High-level programming is valuable for wireless system engineers who need to create simulations, analyze data, and automate testing. Python and MATLAB are industry standards for wireless system design and validation."
    }
  }
];

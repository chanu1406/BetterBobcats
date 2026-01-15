/**
 * Tier Courses for Hardware / Computer Engineering & IC Design Career Path
 * 
 * Career Focus: Digital hardware design, computer architecture, VLSI, ASIC/FPGA design, semiconductor industry
 * Target Companies: Intel, AMD, NVIDIA, Qualcomm, Broadcom, Apple Silicon, Samsung, TSMC, Synopsys, Cadence
 * 
 * Tier Breakdown:
 * - Tier 1 (Core Foundation): Digital logic, microcontrollers, circuit design, RF design, analog/digital electronics
 * - Tier 2 (Supporting Skills): Signal processing, communications, power electronics
 * - Tier 3 (Programming Foundation): Core programming for hardware description and verification
 */

import { TierCourse } from "@/types/careerPath";

export const hardwareICDesignTierCourses: TierCourse[] = [
  // ==================== TIER 1: Core Foundation ====================
  {
    id: "ee-060-hardware",
    code: "EE 060",
    name: "Boolean Algebra & Digital Circuits",
    fullName: "EE 060: Boolean Algebra & Digital Circuits",
    description:
      "Foundation in digital logic, Boolean algebra, combinational and sequential circuits, FSMs - the building blocks of all digital hardware and processors.",
    tier: 1,
    prerequisites: [],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design combinational logic circuits using gates and multiplexers",
        "Implement sequential circuits with flip-flops and state machines",
        "Analyze timing and propagation delays in digital circuits",
        "Design arithmetic circuits (adders, ALUs)",
        "Understand memory elements and register files",
      ],
      topics: [
        "Boolean algebra and logic gates",
        "Combinational circuit design",
        "Sequential circuit design",
        "Finite state machines (FSMs)",
        "Timing analysis",
        "Arithmetic circuits",
        "Memory elements",
        "Introduction to Verilog/VHDL",
      ],
      careerRelevance:
        "Digital logic design is the absolute foundation for hardware engineering and IC design. Understanding gates, flip-flops, FSMs, and timing is essential for designing processors, ASICs, FPGAs, and any digital hardware at Intel, NVIDIA, AMD, and semiconductor companies.",
      realWorldApplications: [
        "Processor datapath design",
        "FPGA development for communications and DSP",
        "ASIC design for custom hardware accelerators",
        "Memory controller design",
        "Digital signal processing hardware",
        "Custom instruction set architecture (ISA) design",
      ],
      resources: {
        websites: [
          "HDLBits - Verilog Practice",
          "FPGA4Student tutorials",
        ],
        tools: [
          "Digital Design and Computer Architecture by Harris & Harris",
          "Xilinx Vivado",
          "Intel Quartus",
        ],
      },
    },
  },
  {
    id: "ee-140-hardware",
    code: "EE 140",
    name: "Computer and Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description:
      "Computer architecture, microcontroller design, instruction sets, memory hierarchy, I/O - understanding how processors work from the hardware perspective.",
    tier: 1,
    prerequisites: ["EE 060", "CSE 020"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand processor architecture and instruction execution",
        "Design and analyze memory hierarchies (cache, RAM)",
        "Implement I/O interfacing and peripheral controllers",
        "Program microcontrollers at the hardware level",
        "Understand pipelining and hazards",
      ],
      topics: [
        "Processor architecture (datapath, control unit)",
        "Instruction set architecture (ISA)",
        "Memory hierarchy and cache design",
        "Pipelining and hazards",
        "I/O and peripheral interfaces",
        "Assembly language programming",
        "Interrupt handling",
        "Bus protocols",
      ],
      careerRelevance:
        "Understanding computer architecture is critical for hardware engineers designing processors, SoCs, and custom hardware. Knowledge of ISA design, pipelining, cache, and memory systems is essential for roles at Intel, AMD, Apple Silicon, and ARM working on CPU/GPU design.",
      realWorldApplications: [
        "Processor core design (CPU, GPU, DSP)",
        "System-on-Chip (SoC) architecture",
        "Cache and memory controller design",
        "Custom accelerator design (ML, crypto)",
        "Embedded system hardware design",
      ],
      resources: {
        websites: [
          "ARM Architecture Reference Manual",
          "RISC-V ISA specifications",
        ],
        tools: [
          "Computer Organization and Design by Patterson & Hennessy",
          "ModelSim for RTL simulation",
        ],
      },
    },
  },
  {
    id: "ee-101-hardware",
    code: "EE 101",
    name: "Electromagnetic Field Theory",
    fullName: "EE 101: Electromagnetic Field Theory",
    description:
      "Analog circuit design fundamentals including op-amps, amplifiers, filters, and oscillators - essential for mixed-signal IC design and analog front-ends.",
    tier: 1,
    prerequisites: ["EE 060"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design operational amplifier circuits",
        "Analyze transistor amplifier configurations",
        "Design active filters and oscillators",
        "Understand frequency response and bandwidth",
        "Design mixed-signal interface circuits",
      ],
      topics: [
        "Operational amplifier circuits",
        "Transistor amplifiers (BJT, MOSFET)",
        "Active filter design",
        "Oscillator circuits",
        "Frequency response analysis",
        "Differential amplifiers",
        "Feedback and stability",
        "Mixed-signal interfaces (ADC, DAC)",
      ],
      careerRelevance:
        "Analog circuit design is critical for mixed-signal ICs, ADCs/DACs, sensors, power management, and RF front-ends. Understanding op-amps, amplifiers, and filters is essential for working on mixed-signal SoCs, power ICs, and analog blocks in digital chips at companies like Analog Devices, Texas Instruments, and mixed-signal divisions at Intel, Qualcomm.",
      realWorldApplications: [
        "Mixed-signal IC design (ADC, DAC, PLLs)",
        "Sensor interface circuits",
        "Power management ICs (PMICs)",
        "Analog front-ends for communications",
        "Audio amplifiers and codecs",
        "High-speed I/O circuits",
      ],
      resources: {
        websites: [
          "Analog Devices Engineer Zone",
          "Texas Instruments Precision Labs",
        ],
        tools: [
          "Microelectronic Circuits by Sedra & Smith",
          "LTspice for circuit simulation",
        ],
      },
    },
  },
  {
    id: "ee-111-hardware",
    code: "EE 111",
    name: "Electronic Circuit Design II",
    fullName: "EE 111: Electronic Circuit Design II",
    description:
      "High-frequency circuit design, transmission lines, RF amplifiers, mixers, oscillators - essential for RF IC design and wireless hardware.",
    tier: 1,
    prerequisites: ["EE 101", "EE 100"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design RF amplifiers and matching networks",
        "Analyze transmission lines and S-parameters",
        "Design RF mixers and oscillators",
        "Understand noise and linearity in RF circuits",
        "Use Smith charts for impedance matching",
      ],
      topics: [
        "Transmission line theory",
        "S-parameters and network analysis",
        "Smith chart and impedance matching",
        "RF amplifier design (LNA, PA)",
        "Mixers and frequency conversion",
        "Oscillators and phase-locked loops (PLLs)",
        "RF noise and linearity",
        "RF layout and parasitic effects",
      ],
      careerRelevance:
        "RF circuit design is essential for wireless ICs, transceivers, and RF front-ends in smartphones, IoT, 5G, and satellite systems. Critical for roles at Qualcomm, Broadcom, Skyworks, Qorvo designing RF chips for wireless communications, radar, and satellite applications.",
      realWorldApplications: [
        "RF transceiver IC design (5G, Wi-Fi, Bluetooth)",
        "Low-noise amplifiers (LNAs) for receivers",
        "Power amplifiers (PAs) for transmitters",
        "RF synthesizers and PLLs",
        "mmWave IC design for 5G and automotive radar",
      ],
      resources: {
        websites: [
          "RF Cafe tutorials",
          "Qorvo RF University",
        ],
        tools: [
          "RF Microelectronics by Razavi",
          "ADS (Advanced Design System)",
        ],
      },
    },
  },
  {
    id: "ee-105-hardware",
    code: "EE 105",
    name: "Analog and Digital Electronics",
    fullName: "EE 105: Analog and Digital Electronics",
    description:
      "Advanced transistor-level design, CMOS logic, analog building blocks - understanding silicon-level implementation of digital and analog circuits.",
    tier: 1,
    prerequisites: ["EE 101"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design CMOS logic gates at the transistor level",
        "Analyze MOS transistor operation and characteristics",
        "Design current mirrors and differential pairs",
        "Understand CMOS scaling and power-delay tradeoffs",
        "Design basic analog building blocks (OTAs, comparators)",
      ],
      topics: [
        "MOSFET device physics and operation",
        "CMOS logic gate design",
        "Static and dynamic logic families",
        "Current mirrors and biasing circuits",
        "Differential pairs and amplifiers",
        "Analog building blocks (OTA, comparator)",
        "Power consumption in CMOS",
        "Layout and parasitic effects",
      ],
      careerRelevance:
        "Transistor-level design is fundamental for VLSI and custom IC design. Understanding CMOS logic, analog blocks, and layout is essential for designing digital logic libraries, standard cells, and analog IP blocks at Intel, NVIDIA, Synopsys, Cadence, and semiconductor fabs.",
      realWorldApplications: [
        "Standard cell library design",
        "Custom digital logic for high-performance processors",
        "Analog IP blocks (bandgap references, LDOs)",
        "Memory cell design (SRAM, DRAM)",
        "I/O pad and ESD protection circuits",
      ],
      resources: {
        websites: [
          "CMOS Circuit Design textbook resources",
          "Cadence Virtuoso tutorials",
        ],
        tools: [
          "CMOS VLSI Design by Weste & Harris",
          "Cadence Virtuoso",
        ],
      },
    },
  },

  // ==================== TIER 2: Supporting Skills ====================
  {
    id: "ee-102-hardware",
    code: "EE 102",
    name: "Signal Processing and Linear Systems",
    fullName: "EE 102: Signal Processing and Linear Systems",
    description:
      "Digital signal processing for communications, filtering, FFT - used in hardware accelerators, DSPs, and signal processing IPs.",
    tier: 2,
    prerequisites: ["MATH 024", "EE 060"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Implement digital filters in hardware",
        "Design FFT hardware accelerators",
        "Understand fixed-point and floating-point arithmetic",
        "Optimize DSP algorithms for hardware",
        "Design signal processing pipelines",
      ],
      topics: [
        "Discrete-time signals and systems",
        "Z-transforms",
        "FIR and IIR filter design",
        "FFT algorithms and hardware implementation",
        "Fixed-point arithmetic",
        "DSP hardware architectures",
        "Pipelining and parallelism in DSP",
      ],
      careerRelevance:
        "DSP is critical for designing hardware accelerators for signal processing, communications, audio/video, and AI. Understanding filter hardware, FFT accelerators, and DSP architectures is valuable for roles at companies designing custom DSPs, baseband processors, and hardware accelerators.",
      realWorldApplications: [
        "Baseband processor design for 5G modems",
        "Audio/video codec hardware",
        "FFT accelerators for OFDM communications",
        "Custom DSP engines in SoCs",
        "Hardware for radar and sonar signal processing",
      ],
      resources: {
        websites: [
          "Xilinx DSP IP cores documentation",
        ],
        tools: [
          "Understanding Digital Signal Processing by Lyons",
          "MATLAB HDL Coder",
        ],
      },
    },
  },
  {
    id: "ee-115-hardware",
    code: "EE 115",
    name: "Electromagnetics and Applications",
    fullName: "EE 115: Electromagnetics and Applications",
    description:
      "Digital modulation, error correction coding, communication theory - understanding protocols implemented in wireless transceivers and baseband processors.",
    tier: 2,
    prerequisites: ["EE 102"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Understand digital modulation schemes (QAM, OFDM)",
        "Design error correction coding hardware (Viterbi, LDPC)",
        "Analyze link budgets and performance",
        "Understand wireless communication protocols",
        "Design baseband processing hardware",
      ],
      topics: [
        "Digital modulation (QPSK, QAM, OFDM)",
        "Channel coding (convolutional, turbo, LDPC)",
        "Synchronization and equalization",
        "Multiple access schemes (TDMA, FDMA, CDMA)",
        "Wireless channel models",
        "Link budget analysis",
        "Communication protocol layers",
      ],
      careerRelevance:
        "Communication systems knowledge is critical for designing wireless transceivers, baseband processors, and modem ICs. Essential for roles at Qualcomm, Broadcom, Intel designing 5G modems, Wi-Fi chips, and satellite transceivers.",
      realWorldApplications: [
        "5G modem baseband processor design",
        "Wi-Fi 6/7 transceiver ICs",
        "Satellite communication hardware",
        "Bluetooth and IoT radio ICs",
        "Error correction hardware accelerators",
      ],
      resources: {
        websites: [
          "3GPP 5G specifications",
          "IEEE 802.11 (Wi-Fi) standards",
        ],
        tools: [
          "Digital Communications by Proakis & Salehi",
        ],
      },
    },
  },
  {
    id: "ee-131-hardware",
    code: "EE 131",
    name: "Power Electronics",
    fullName: "EE 131: Power Electronics and Converters",
    description:
      "DC-DC converters, power management circuits, voltage regulators - essential for power management IC (PMIC) design in SoCs and mobile devices.",
    tier: 2,
    prerequisites: ["EE 101", "EE 100"],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Design DC-DC converter circuits (buck, boost)",
        "Analyze switching power supplies",
        "Design voltage regulators (LDO, switching)",
        "Understand power MOSFET operation and gate drive",
        "Design power management systems for SoCs",
      ],
      topics: [
        "DC-DC converter topologies (buck, boost, buck-boost)",
        "Switching power supply design",
        "Linear regulators (LDO)",
        "Gate drive circuits",
        "Power MOSFET characteristics",
        "Magnetic components (inductors, transformers)",
        "Control loops for switching converters",
        "Power integrity and distribution",
      ],
      careerRelevance:
        "Power management is critical in all ICs, especially for mobile SoCs, processors, and IoT devices. Understanding DC-DC converters, LDOs, and power distribution is essential for designing PMICs at companies like Texas Instruments, Analog Devices, Qualcomm, and in SoC power management teams at Apple, Intel, NVIDIA.",
      realWorldApplications: [
        "Power management ICs (PMICs) for smartphones",
        "Voltage regulators for processors (VRMs)",
        "Battery charging ICs",
        "Power distribution networks in SoCs",
        "DC-DC converters for IoT devices",
      ],
      resources: {
        websites: [
          "Texas Instruments Power Management Design Resources",
          "Analog Devices Power by Linear",
        ],
        tools: [
          "Power Electronics by Erickson & Maksimovic",
        ],
      },
    },
  },

  // ==================== TIER 3: Programming Foundation ====================
  {
    id: "cse-020-hardware",
    code: "CSE 020",
    name: "Introduction to Computing 1",
    fullName: "CSE 020: Introduction to Computing 1",
    description:
      "Programming foundation for hardware description languages (Verilog/VHDL), verification scripts, and EDA tool automation.",
    tier: 3,
    prerequisites: [],
    expandedInfo: {
      credits: 4,
      learningOutcomes: [
        "Write programs for hardware verification and testing",
        "Understand programming concepts for HDL",
        "Automate EDA tool workflows with scripting",
        "Develop testbenches and verification frameworks",
        "Use programming for hardware design automation",
      ],
      topics: [
        "Programming fundamentals (variables, loops, functions)",
        "Object-oriented programming basics",
        "File I/O and data processing",
        "Scripting for automation (Python, Perl, TCL)",
        "Data structures for hardware verification",
        "Regular expressions for log parsing",
      ],
      careerRelevance:
        "Programming is essential for hardware engineers to write verification testbenches, automate EDA tools, parse simulation logs, and develop design automation scripts. Python, Perl, and TCL scripting are ubiquitous in semiconductor companies for automating design flows, regression testing, and design verification.",
      realWorldApplications: [
        "SystemVerilog testbench development",
        "Python scripts for design automation",
        "TCL scripts for EDA tool control",
        "Regression test automation",
        "Waveform parsing and analysis",
        "Build system automation for ASIC/FPGA flows",
      ],
      resources: {
        websites: [
          "Python for verification engineers tutorials",
          "Cocotb - Python-based verification framework",
        ],
        tools: [
          "Python scripting for EDA",
        ],
      },
    },
  },
];

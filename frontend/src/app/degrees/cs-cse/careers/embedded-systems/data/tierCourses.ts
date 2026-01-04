/**
 * Embedded Systems Engineering Tier Courses Data
 * Course recommendations organized by tier for Embedded Systems Engineering career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: NON-NEGOTIABLE CORE (EMBEDDED SYSTEMS)
 * If a student skips these, they are not embedded-ready.
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "embedded-cse-031",
    code: "CSE 031",
    name: "Computer Organization & Assembly",
    fullName: "CSE 031: Computer Organization & Assembly",
    description: "How code runs on hardware",
    tier: 1,
    expandedInfo: {},
  },
  {
    id: "embedded-cse-140",
    code: "CSE 140",
    name: "Computer Architecture",
    fullName: "CSE 140: Computer Architecture",
    description: "CPU, memory, I/O",
    tier: 1,
    expandedInfo: {},
  },
  {
    id: "embedded-cse-150",
    code: "CSE 150",
    name: "Operating Systems",
    fullName: "CSE 150: Operating Systems",
    description: "Processes, interrupts, concurrency",
    tier: 1,
    expandedInfo: {
        credits: 4,
      
        prerequisites:
          "Assumes prior programming experience in C (pointers, structs, memory). Focus is on how software maps to ISA + hardware execution.",
      
        learningOutcomes: [
          "Explain how C constructs (functions, loops, pointers, structs) translate into assembly and machine behavior",
          "Write and debug basic assembly programs (e.g., MIPS/RISC-style) and reason about registers, stack frames, and calling conventions",
          "Understand binary data representation (ints, floats) and how it affects correctness and performance",
          "Reason about memory layout (stack/heap), addressing modes, and how pointer arithmetic works at the hardware level",
          "Connect compilation + linking to runtime execution (object files, symbols, calling into libraries)",
          "Develop hardware-aware intuition for performance (locality, caches, instruction costs) that matters in embedded/low-level systems"
        ],
      
        topics: [
          "Data representation: binary/hex, signed arithmetic, two’s complement, floating point basics",
          "ISA fundamentals: registers, instructions, addressing modes, control flow, procedure calls",
          "Assembly programming: stack, calling convention, function prologue/epilogue, debugging",
          "C ↔ assembly mapping: pointers, arrays, structs, memory management, undefined behavior intuition",
          "Toolchain pipeline: compile → assemble → link → execute (object files, symbols, ABI basics)",
          "Intro computer organization: datapath/control intuition (what the CPU actually does per instruction)",
          "Hardware-aware performance basics: locality, caches (conceptual), and cost of memory vs compute"
        ],
      
        careerRelevance:
          "For embedded + systems/infra engineering, this course is the ‘x-ray vision’ layer: it explains why code is fast/slow, why bugs like segfaults happen, and how OS/VM/container layers ultimately rely on machine behavior. It’s especially valuable for firmware/embedded roles (where you touch registers, memory maps, and toolchains directly) and for infra/perf roles (where CPU + memory behavior dominates real production bottlenecks).",
      
        realWorldApplications: [
          "Writing and debugging firmware/low-level modules where you must reason about registers, stack, and memory layout",
          "Diagnosing performance issues caused by cache misses, poor locality, excessive allocations, or pointer-heavy code",
          "Using tools like gdb/objdump to inspect binaries and understand compiler output",
          "Understanding how interrupts/system calls/ABIs depend on CPU state and calling conventions",
          "Building intuition for how OS primitives (processes, threads) ultimately ride on CPU + memory behavior"
        ],
      
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PLhMnuBfGeCDM8pXLpqib90mDFJI-e1lpk",
            "https://www.youtube.com/playlist?list=PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2",
            "https://www.youtube.com/playlist?list=PLu6SHDdOToSdD4-c9nZX2Qu3ZXnNFocOH",
            "https://www.youtube.com/playlist?list=PLowKtXNTBypGqImE405J2565dvjafglHU",
            "https://www.youtube.com/playlist?list=PLp_QNRIYljFqBuOYDFluT66Y7biUH1Dnc"
          ],
      
          websites: [
            "https://www.coursicle.com/ucmerced/courses/CSE/031/",
            "https://pages.cs.wisc.edu/~remzi/OSTEP/",
            "https://man7.org/linux/man-pages/"
          ],
      
          tools: [
            "MARS (MIPS) or an ISA simulator (for stepping through assembly)",
            "gcc/clang + make (compile/link workflow)",
            "gdb (debugging at machine level)",
            "objdump/readelf (inspect binaries and symbols)",
            "hex editor + hexdump (inspect raw memory/file layouts)"
          ]
        },
      
        additionalNotes:
          "Embedded-systems angle: treat this as the prerequisite to RTOS/firmware work. If you can explain stack frames, calling conventions, and memory layout confidently, you’ll level up fast in debugging, performance, and hardware/software integration."
      }
  },
  {
    id: "embedded-cse-030",
    code: "CSE 030",
    name: "Data Structures",
    fullName: "CSE 030: Data Structures",
    description: "Efficient embedded code",
    tier: 1,
    expandedInfo: {
        credits: 4,
      
        prerequisites:
          "Prerequisite: CSE 024 (Advanced Programming).",
      
        learningOutcomes: [
          "Choose the right data structure for a constraint (time, memory, latency, simplicity) — especially under embedded-style limits",
          "Analyze runtime + space complexity (Big-O) and understand real trade-offs like constant factors and memory locality",
          "Implement core data structures in low-level style (arrays, linked lists, stacks, queues) and reason about pointer safety",
          "Build and use trees/heaps/hash tables/graphs for indexing, scheduling, and fast lookup problems",
          "Apply recursion and iterative equivalents safely (stack depth awareness, embedded-safe patterns)",
          "Implement and evaluate searching/sorting techniques and understand when each is appropriate",
          "Write tests and debug memory issues (leaks, corruption) using standard debugging tooling"
        ],
      
        topics: [
          "Complexity analysis (time/space), trade-offs, and why locality matters",
          "Abstract Data Types (ADTs) and implementation details in C/C++-style code",
          "Arrays/dynamic arrays, linked lists, stacks, queues, and ring buffers",
          "Trees (BSTs), heaps/priority queues, and practical use cases",
          "Hash tables (collisions, resizing trade-offs) and fast lookup design",
          "Graphs (representations, traversals like BFS/DFS) and real routing-style problems",
          "Searching and sorting (including when to prefer stable/unstable or in-place approaches)",
          "Memory management implications (allocation patterns, fragmentation, safer alternatives)"
        ],
      
        careerRelevance:
          "For embedded + systems engineering, Data Structures is where you learn to write code that’s not just correct, but efficient and predictable. "
          + "The same fundamentals power firmware buffers, schedulers, real-time queues, protocol tables, caching layers, and performance-critical services — "
          + "and they directly improve your ability to reason about latency spikes, memory pressure, and scalability.",
      
        realWorldApplications: [
          "Implementing ring buffers/queues for sensor streams, logging, UART/SPI/I2C pipelines",
          "Building fast lookup tables (hashing) for protocol parsing, routing/dispatch, and configuration maps",
          "Using heaps/priority queues for scheduling and timing wheels",
          "Designing memory-aware collections to avoid fragmentation and reduce allocations",
          "Optimizing hot paths by improving locality and reducing pointer-chasing",
          "Supporting indexing/searching in storage, telemetry, and monitoring pipelines"
        ],
      
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY", // MIT 6.006 (data structures + algorithms fundamentals)
            "https://www.youtube.com/playlist?list=PLu0nzW8Es1x3TmpwQRLMQwCtulEd43ZY8", // UC Berkeley CS61B (data structures, strong intuition)
            "https://www.youtube.com/playlist?list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P", // mycodeschool (DS implemented in C/C++)
            "https://www.youtube.com/watch?v=RBSGKlAvoiM",                              // William Fiset (full DS course, very clear)
            "https://www.youtube.com/playlist?list=PLBSUU5RHxyAlOAQwQ2LIHkBFcur-P4sFL"  // Embedded-C-oriented DS practice playlist
          ],
          websites: [
            "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67519",
            "https://www.coursicle.com/ucmerced/courses/CSE/030/",
            "https://cp-algorithms.com/",
            "https://en.cppreference.com/w/"
          ],
          tools: [
            "C/C++ toolchain (gcc/clang) + make/cmake",
            "gdb/lldb (debugging) + core dumps",
            "valgrind (leaks/memory errors) + sanitizers (ASan/UBSan)",
            "perf (basic profiling) + flamegraphs (optional)",
            "unit testing (CTest/Catch2/GoogleTest) for verifying DS correctness"
          ]
        },
      
        additionalNotes:
          "Embedded angle: prioritize predictable performance + memory behavior. When possible, practice implementing DS with "
          + "fixed-capacity buffers, pooling, and careful error handling to mimic real firmware constraints."
      },
  },
  {
    id: "embedded-cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Real firmware projects",
    tier: 1,
    expandedInfo: {
        credits: 4,
      
        prerequisites:
          "Recommended: solid programming fundamentals + data structures experience and comfort working in teams. (This is typically a project-heavy, collaborative course.)",
      
        learningOutcomes: [
          "Plan and execute a team-based software project end-to-end (requirements → design → implementation → testing → release)",
          "Write clear requirements and translate them into milestones, interfaces, and test plans",
          "Apply modern engineering practices: version control workflows, code reviews, issue tracking, and documentation",
          "Design maintainable architectures (modularity, layering, API contracts) and justify trade-offs",
          "Build reliable systems via testing strategy: unit/integration/system tests, automation, and regression discipline",
          "Use CI pipelines to continuously build/test software (and understand how this extends to embedded/firmware + HIL)",
          "Communicate engineering decisions professionally through design docs, demos, and postmortem-style reflection"
        ],
      
        topics: [
          "Software development lifecycles: agile/iterative development, planning, estimation, risk management",
          "Requirements engineering: user stories, acceptance criteria, non-functional requirements (latency, reliability, safety)",
          "Architecture & design: modularity, layering, interfaces, design patterns, dependency management",
          "Team workflows: Git branching, code reviews, issue tracking, documentation standards",
          "Testing: unit/integration/system testing, testability-driven design, mocking, regression strategy",
          "CI/CD fundamentals: automated builds, test gates, release hygiene (plus embedded variants like cross-builds/HIL)",
          "Quality & reliability: observability/logging, defensive programming, secure-by-default basics"
        ],
      
        careerRelevance:
          "For embedded/systems paths, this course is how you prove you can ship: turning messy requirements into a working, maintainable system with real engineering discipline. "
          + "It maps directly to Firmware/Embedded Software Engineer, Systems/Platform Engineer, Infra Engineer, and SRE roles—where teamwork, reliability, testing, and release hygiene matter as much as raw coding.",
      
        realWorldApplications: [
          "Building firmware-adjacent services (device agents, provisioning tools, telemetry collectors) with clean interfaces and test coverage",
          "Creating CI for embedded-style projects (cross-compilation, automated tests, optional HIL test stages)",
          "Designing safe update/release flows (versioning, rollback thinking, feature flags/config gates)",
          "Implementing observability practices: structured logs, metrics, traces, and debugging playbooks",
          "Running team rituals that scale: sprint planning, reviews, design docs, and incident-style retrospectives"
        ],
      
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PL24AE36691A6EF62F",                // UC Berkeley CS169: Software Engineering (teams, process, quality)
            "https://www.youtube.com/watch?v=r64iT7jhp2s",                             // Software Engineering at Google (mindset + practices)
            "https://www.youtube.com/watch?v=XcT4yYu_TTs",                             // Clean, testable code talk (design for maintainability)
            "https://www.youtube.com/playlist?list=PL4cGeWgaBTe1uwiqIAc6fwPzPpvgPZI2J",// Embedded CI/CD with HIL testing (firmware-friendly pipeline thinking)
            "https://www.youtube.com/playlist?list=PLJ5C_6qdAvBEJbSp87j0d1dKpLcfjfuzr" // Embedded Software Testing playlist (unit→integration mindset)
          ],
          websites: [
            "https://www.coursicle.com/ucmerced/courses/CSE/120/",     // Course description + units
            "https://abseil.io/resources/swe-book",                    // Software Engineering at Google (free book)
            "https://sre.google/books/",                               // SRE practices (reliability + operations mindset)
            "https://i2g.ucmerced.edu/FAQs"                            // UC Merced software-capstone style expectations (requirements + scope)
          ],
          tools: [
            "Git + GitHub/GitLab (branches, PRs, reviews)",
            "Issue tracking (GitHub Projects/Jira) + lightweight sprint planning",
            "CI (GitHub Actions / GitLab CI / Jenkins) + test gates",
            "Build systems: CMake/Make (esp. useful for embedded/cross-builds)",
            "Testing: GoogleTest/Catch2, pytest; embedded-friendly Unity/Ceedling",
            "Static analysis/formatting: clang-tidy, cppcheck, sanitizers, clang-format",
            "Docs: Markdown + Doxygen; design docs + ADRs (architecture decision records)"
          ]
        },
      
        additionalNotes:
          "If you want this to read as ‘real firmware projects’: emphasize requirements, interface contracts, deterministic behavior, and a CI pipeline that includes tests + (optional) hardware-in-the-loop. That’s exactly what hiring managers look for in embedded/system teams."
      },
  },
];

/**
 * 🟢 TIER 1.5: ELECTRICAL ENGINEERING CORE (HARDWARE SIDE)
 * This is where embedded engineers separate themselves from pure CS students.
 */
export const tier1_5Courses: TierCourse[] = [
  {
    id: "embedded-ee-060",
    code: "EE 060",
    name: "Boolean Algebra & Digital Circuits",
    fullName: "EE 060: Boolean Algebra & Digital Circuits",
    description: "Digital logic foundations",
    tier: 1.5,
    expandedInfo: {
        credits: 4,
      
        prerequisites:
          "No formal prerequisite listed. Recommended: comfort with basic algebra and a programming mindset (you’ll be translating logic into implementable circuit structures).",
      
        learningOutcomes: [
          "Use Boolean algebra to model real digital systems and simplify logic correctly",
          "Convert between number systems and reason about binary arithmetic (adders/subtractors, overflow, representation)",
          "Design and verify combinational circuits (encoders/decoders, mux/demux, comparators, ALUs)",
          "Minimize logic using Karnaugh maps and understand real trade-offs (gate count, delay, fan-in)",
          "Design sequential circuits (latches/flip-flops, counters, registers) and reason about state + timing",
          "Build and analyze finite state machines (FSMs) used in controllers, protocols, and embedded control logic",
          "Develop hardware-debug intuition: what a waveform means, why glitches happen, and how timing affects correctness"
        ],
      
        topics: [
          "Boolean logic and algebra; logic identities and equivalence",
          "Binary number representation; arithmetic circuits (adders/subtractors)",
          "Combinational circuit analysis/design: mux/demux, encoders/decoders, comparators",
          "Logic minimization: Karnaugh maps; practical optimization",
          "Programmable logic concepts (PLDs) and implementation mindset",
          "Sequential logic: latches, flip-flops, registers, counters",
          "Finite state machines (FSMs): state encoding, transition design, controller design"
        ],
      
        careerRelevance:
          "For embedded systems, this is the foundation that makes you effective below the C/RTOS layer. You learn how real hardware control works (FSMs), how digital interfaces are built (encoders/muxing), and why timing/waveforms matter. It also strengthens ‘hardware-aware debugging’—a key differentiator for firmware and embedded/IoT engineers.",
      
        realWorldApplications: [
          "Designing simple controllers as FSMs (device boot/bring-up sequences, protocol handshakes, peripherals)",
          "Understanding GPIO timing, debouncing, and digital interfacing from a circuit-first perspective",
          "Building/reading logic used in peripherals (UART-style framing logic, counters, registers)",
          "Optimizing digital logic for speed/area/power constraints (especially in small embedded devices)",
          "Debugging hardware/firmware integration issues with waveform-level reasoning (logic analyzer mindset)"
        ],
      
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2", // MIT 6.004 Computation Structures (digital abstraction, Boolean logic, sequential circuits)
            "https://www.youtube.com/playlist?list=PLu6SHDdOToSdD4-c9nZX2Qu3ZXnNFocOH", // Nand2Tetris (build logic gates → ALU → CPU concepts)
            "https://www.youtube.com/playlist?list=PLrpK1inhO61VyVGaJei3ZsdfPE-B6FuGV", // NPTEL Digital Circuits (formal digital design coverage)
            "https://www.youtube.com/playlist?list=PLowKtXNTBypETld5oX1ZMI-LYoA2LWi8D", // Ben Eater digital electronics tutorial series (hands-on intuition)
            "https://www.youtube.com/playlist?list=PLqIVJ8-t5GtBXGmeFjT2BkgGKeUG3xBq7"  // Ben Eater digital logic / control logic (FSM-ish intuition)
          ],
          websites: [
            "https://www.coursicle.com/ucmerced/courses/EE/060/",
            "https://programmap.ucmerced.edu/programs/0640860a-2c7b-d11e-9a1d-1212f6227746/pathways/72c3dcb2-1a9a-4dc4-aeb2-74f0546771cb/formats/print",
            "https://ee.ucmerced.edu/courses"
          ],
          tools: [
            "Logisim / Digital (logic simulation + FSM testing)",
            "Verilog basics + an FPGA flow (Vivado/Quartus) (optional but powerful for real implementations)",
            "Breadboard + basic ICs (7400-series), LEDs, switches (for hands-on labs)",
            "Logic analyzer (Saleae-style) / oscilloscope (waveform-level debugging mindset)"
          ]
        },
      
        additionalNotes:
          "Embedded framing: treat combinational logic as ‘fast pure functions’ and sequential logic as ‘state machines with timing.’ If you can draw and reason about an FSM + timing, you’ll be miles ahead in firmware/hardware integration."
      },
  },
  {
    id: "embedded-ee-140",
    code: "EE 140",
    name: "Computer & Microcontroller Architecture",
    fullName: "EE 140: Computer and Microcontroller Architecture",
    description: "Microcontrollers, firmware",
    tier: 1.5,
    expandedInfo: {
      credits: 4,
      prerequisites: "EE 060 and EE 101 and (EE 021 or ME 021 or BIOE 021)",
  
      learningOutcomes: [
        "Understand how microcontrollers are organized (CPU core, memory map, buses, peripherals) and how firmware controls them",
        "Write and reason about low-level code (C + targeted assembly) that interfaces with registers and memory-mapped I/O",
        "Design interrupt-driven firmware using timers, GPIO, UART/SPI/I2C, and DMA-style data movement concepts",
        "Analyze performance and resource trade-offs (latency, throughput, energy, memory footprint) in embedded designs",
        "Use embedded debugging workflows (JTAG/SWD, GDB, trace/logging) to diagnose timing and correctness issues",
        "Build reliable embedded software components (drivers, HAL vs bare-metal decisions, modular firmware architecture)"
      ],
  
      topics: [
        "Microcontroller architecture: CPU core, instruction set basics, pipeline overview, privilege/exceptions",
        "Memory organization: flash vs SRAM, stacks/heaps, memory maps, linker scripts (conceptual), boot process",
        "Interrupts and real-time behavior: NVIC-style priorities, timers, scheduling patterns",
        "I/O subsystems and peripherals: GPIO, UART, SPI, I2C, ADC/DAC, PWM, watchdogs",
        "Firmware structure: device drivers, HAL vs register-level programming, concurrency patterns",
        "Performance evaluation: cycle cost intuition, interrupt latency, buffering, throughput/latency trade-offs"
      ],
  
      careerRelevance:
        "EE 140 is a core embedded/firmware class for roles like Embedded Software Engineer, Firmware Engineer IoT/Edge Systems Engineer, and Robotics/Controls SWE. It builds the hardware-aware intuition you need to ship reliable firmware (interrupts, peripherals, memory constraints) and to debug real devices when timing, performance, or correctness breaks in production.",
  
      realWorldApplications: [
        "Writing peripheral drivers (GPIO/UART/SPI/I2C) and bringing up new boards",
        "Building interrupt-driven sensor pipelines (sampling, buffering, filtering) for IoT devices",
        "Designing robust firmware for actuators (motors/servos) using timers + PWM + safety watchdogs",
        "Optimizing embedded performance under tight memory/CPU/power constraints",
        "Implementing reliable update and logging strategies for deployed edge devices"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLPdZb20cG9f5ZAzWX9Wxv_mkg6hPSXPP5", // UTAustinX: Embedded Systems - Shape the World (hands-on firmware + MCU concepts)
          "https://www.youtube.com/playlist?list=PLPW8O6W-1chwyTzI3BHwBLbGQoPFxPAPM", // Modern Embedded Systems Programming (machine-level view, interrupts, debugging)
          "https://www.youtube.com/playlist?list=PL0E131A78ABFBFDD0",                 // Microprocessors & Microcontrollers (architecture fundamentals)
          "https://www.youtube.com/watch?v=u_RJhThJN9M",                             // Arm Education Media: efficient embedded systems course overview  // UT intro playlist (quick ramp into MCU + embedded workflow)
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=70000",
          "https://ee.ucmerced.edu/courses",
          "https://users.ece.utexas.edu/~valvano/Volume1/E-Book/"
        ],
        tools: [
          "ARM GCC toolchain (arm-none-eabi-gcc) + Make/CMake",
          "GDB + OpenOCD (JTAG/SWD debugging)",
          "Logic analyzer / oscilloscope (timing + protocol debugging)",
          "FreeRTOS (intro RTOS patterns) or bare-metal scheduler patterns",
          "CMSIS + vendor SDKs (STM32Cube, TI TivaWare, etc.)",
          "PlatformIO (fast board bring-up and builds)"
        ]
      },
  
      additionalNotes:
        "If you treat this like an infra course for devices: focus on **observability** (serial logs, metrics, tracing-like timestamps), **reliability** (watchdogs, brownout/reset handling), and **performance discipline** (interrupt latency, buffering, fixed memory budgets). Those map directly to shipping real edge systems."
    }
  },
  {
    id: "embedded-ee-021",
    code: "EE 021",
    name: "EE Programming",
    fullName: "EE 021: EE Programming",
    description: "Hardware-aware coding",
    tier: 1.5,
    expandedInfo: {
        credits: 4,
      
        prerequisites:
          "No formal prerequisite listed in the catalog description. Designed as an intro programming course for EE-style problem solving and control.",
      
        learningOutcomes: [
          "Develop programming fundamentals (variables, types, control flow, functions) with an engineering/problem-solving mindset",
          "Use logical thinking to process inputs and drive outputs (control a process from measured signals)",
          "Work with core data structures used in embedded-style code (arrays, simple structs/records, state-based logic)",
          "Write modular programs that are readable, testable, and safe around edge cases (bounds, overflow, input validation)",
          "Debug programs using print-based tracing and basic debugging tools; build confidence reading error behavior",
          "Connect software to hardware concepts: interpreting sensor-like inputs, timing/loops, and simple control logic"
        ],
      
        topics: [
          "Programming basics: data types, variables, operators, expressions",
          "Control flow: conditionals, loops, and basic program structure",
          "Functions/procedures, modularity, and readable engineering code",
          "Arrays and basic data handling for streams of measurements",
          "Input/output patterns: reading values, logging results, simple visualization/interpretation",
          "Intro hardware-control mindset: “read input → compute → actuate output” loops (foundational embedded pattern)"
        ],
      
        careerRelevance:
          "EE 021 is your on-ramp to firmware and embedded systems: the point is becoming comfortable writing code that interacts with real-world signals and constraints. "
          + "That skill transfers directly into microcontroller programming, driver development, and later courses like digital systems, microcontroller architecture, and embedded labs where you control hardware through software.",
      
        realWorldApplications: [
          "Writing small control programs that react to sensor-like inputs and produce actuator-like outputs",
          "Building foundational skills for microcontroller firmware (timers/loops, state-based logic, modular code)",
          "Logging and interpreting data from experiments (measurement → processing → reporting)",
          "Debugging early hardware/software integration issues by reasoning about inputs/outputs and edge cases",
          "Preparing for higher-level embedded topics (interrupts, peripherals, RTOS concepts) by mastering the basics"
        ],
      
        resources: {
          videos: [
            "https://www.youtube.com/watch?v=EcEOGGmX8c8", // UTAustinX Embedded Systems - Shape the World (Intro)
            "https://www.youtube.com/playlist?list=PLPW8O6W-1chwyTzI3BHwBLbGQoPFxPAPM", // Modern Embedded Systems Programming (Quantum Leaps)
            "https://www.youtube.com/playlist?list=PLGs0VKk2DiYw-L-RibttcvK-WBZm8WLEP", // Arduino Tutorial Series (hands-on hardware-aware coding)
            "https://www.youtube.com/playlist?list=PLUl4u3cNGP63WbdFxL8giv4yhgdMGaZNA"  // MIT 6.0001 (programming fundamentals, great baseline)
          ],
          websites: [
            "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69859",
            "https://ee.ucmerced.edu/courses",
            "https://users.ece.utexas.edu/~valvano/Volume1/E-Book/",
            "https://github.com/QuantumLeaps/modern-embedded-programming-course"
          ],
          tools: [
            "C (common for EE/embedded) or Python/MATLAB depending on offering",
            "An IDE + compiler toolchain (gcc/clang) and basic build workflow",
            "Serial logging (UART/USB-serial style) + simple plotting/log review",
            "Arduino IDE / PlatformIO (great for early hardware-control projects)",
            "Basic debugging: print tracing; optional gdb when introduced"
          ]
        },
      
        additionalNotes:
          "Treat this as ‘embedded thinking 101’: practice small programs that read inputs, apply logic, and drive outputs. "
          + "If you can write clean loops, modular functions, and handle edge cases, you’ll be set up to move fast in microcontrollers and firmware."
      },
  },
  {
    id: "embedded-ee-185",
    code: "EE 185",
    name: "Instrumentation",
    fullName: "EE 185: Instrumentation",
    description: "Sensors, real-world signals",
    tier: 1.5,
    expandedInfo: {
        credits: 4,
      
        prerequisites: "ENGR 065 (Circuit Theory).",
      
        learningOutcomes: [
          "Understand how real-world physical phenomena become electrical signals (sensor + transducer fundamentals)",
          "Design signal-conditioning chains: amplification, filtering, level shifting, and protection for noisy environments",
          "Work with data acquisition concepts (sampling, quantization, aliasing, resolution, accuracy) and choose appropriate ADC/front-end trade-offs",
          "Calibrate measurement systems and quantify uncertainty, error sources, and drift over time",
          "Use instrumentation tools (oscilloscope, DMM, function generator, DAQ) to debug and validate systems",
          "Build end-to-end measurement pipelines: sensor → analog front end → digitization → software processing/logging",
          "Develop reliability intuition for embedded/infra: grounding, shielding, noise, failure modes, and safe measurement practices"
        ],
      
        topics: [
          "Measurement system fundamentals: accuracy vs precision, sensitivity, resolution, linearity, hysteresis",
          "Sensors and transducers (temperature, pressure, strain, light, motion) and interface circuits",
          "Analog signal conditioning: op-amps, instrumentation amplifiers, filters, isolation, protection",
          "Data acquisition: sampling, aliasing, ADC/DAC basics, noise, quantization, calibration",
          "Bridges and sensor excitation (e.g., Wheatstone bridges) and low-noise measurement techniques",
          "Noise + interference: grounding, shielding, common-mode effects, CMRR, EMI considerations",
          "Practical lab workflows: measurement setup, debugging, validation, and reporting"
        ],
      
        careerRelevance:
          "Instrumentation is core to embedded/edge systems because it’s how devices sense the world reliably. "
          + "For systems/infra engineers working with hardware-heavy stacks (IoT, robotics, medical devices, energy systems, labs), "
          + "this course builds the ability to design trustworthy measurement pipelines, diagnose noisy/unstable signals, and make systems resilient "
          + "to real-world interference, drift, and hardware imperfections.",
      
        realWorldApplications: [
          "Building sensor pipelines for IoT/edge devices (sampling, filtering, buffering, telemetry)",
          "Designing robust analog front-ends for low-level signals (strain gauges, thermocouples, current sense)",
          "Calibrating instruments and validating test setups for manufacturing, labs, and field deployments",
          "Debugging noise issues (ground loops, EMI, common-mode problems) with proper measurement practice",
          "Creating data acquisition + logging systems for performance monitoring and experiments"
        ],
      
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PLbRMhDVUMngcoKrA4sH-zvbNVSE6IpEio", // NPTEL: Electrical Measurement & Electronic Instruments (full course)
            "https://www.youtube.com/playlist?list=PLISmVLHAZbTRduudHGiO95W0mCF35ige2", // TI Precision Labs: Instrumentation Amplifiers (signal conditioning)
            "https://www.youtube.com/playlist?list=PL727B195319D722ED",                 // NI myDAQ Training (DAQ workflows + labs)
            "https://www.youtube.com/playlist?list=PLmJzSa3IrL45BcQLRBpodKmT3cueaWpRE", // Sensors & Instrumentation (calibration + sensor concepts)
            "https://www.youtube.com/playlist?list=PLISmVLHAZbTQHeU4p4VxSIfC9f0IZPXGr"  // TI Precision Labs: Op Amps (foundational for instrumentation)
          ],
          websites: [
            "https://ee.ucmerced.edu/courses",                 // EE course list (context)
            "https://catalog.ucmerced.edu/preview_program.php?catoid=24&poid=3335", // EE program page listing EE 185
            "https://www.ni.com/en/shop/data-acquisition.html" // DAQ fundamentals + terminology and system overview
          ],
          tools: [
            "Oscilloscope + probes (signal integrity and timing)",
            "Digital multimeter (DMM) (basic measurement)",
            "Function generator (stimulus + validation)",
            "DAQ hardware + software (NI-style workflows; Python/LabVIEW)",
            "SPICE simulator (LTspice/Ngspice) for analog front-end design",
            "Microcontroller dev board (for sampling + embedded logging)",
            "Logic analyzer (for digital interfaces like SPI/I2C/UART)"
          ]
        },
      
        additionalNotes:
          "If you want this to read strongly for embedded/infra: emphasize (1) end-to-end pipelines, (2) calibration + uncertainty, and (3) noise/grounding/EMI debugging. "
          + "Those three are the difference between a sensor demo and a production-ready system."
      },
  },
  {
    id: "embedded-ee-102",
    code: "EE 102",
    name: "Signal Processing & Linear Systems",
    fullName: "EE 102: Signal Processing & Linear Systems",
    description: "Sensor data, filtering",
    tier: 1.5,
    expandedInfo: {
        credits: 4,
      
        prerequisites:
          "ENGR 065 and (EE 021 or ME 021 or BIOE 021 or CSE 022).",
      
        learningOutcomes: [
          "Model continuous-time and discrete-time signals and systems using standard representations (time-domain + transform-domain)",
          "Analyze LTI systems via impulse response, convolution, and frequency response (what filtering really means)",
          "Apply Fourier-series/Fourier-transform tools to understand spectra, bandwidth, and noise behavior in real signals",
          "Use Laplace and Z-transforms to connect poles/zeros to stability, transient response, and system behavior",
          "Design and reason about basic filters (low/high/band-pass) and their trade-offs (latency, attenuation, ripple, compute cost)",
          "Understand sampling, aliasing, and reconstruction constraints for sensor + DAQ pipelines",
          "Translate theory into practice: estimate performance/accuracy impacts of filtering and sampling choices in embedded data flows"
        ],
      
        topics: [
          "Signals: energy vs power, periodic vs aperiodic, continuous vs discrete representations",
          "LTI systems: impulse response, convolution, causality, stability, frequency response",
          "Fourier series and Fourier transform: spectrum interpretation, filtering in frequency domain",
          "Laplace transform: transfer functions, poles/zeros, stability and transient behavior",
          "Z-transform: discrete-time system analysis, DT frequency response, stability regions",
          "Sampling theory: aliasing, anti-alias filtering, reconstruction, practical sensor sampling constraints",
          "Intro filter design + implementation intuition: FIR/IIR basics, windowing/FFT basics for measurement and debugging"
        ],
      
        careerRelevance:
          "EE 102 is a core embedded-systems skill-builder because it teaches you how to treat sensor streams as signals and your firmware/filters as systems. "
          + "That’s exactly what you need for reliable sensing, denoising, feature extraction, control input conditioning, and performance-aware telemetry in IoT/edge devices.",
      
        realWorldApplications: [
          "Filtering noisy sensor data (IMU, vibration, temperature, current/voltage sense) without adding too much latency",
          "Choosing sampling rates and anti-alias strategies for real devices with CPU/power limits",
          "Building frequency-domain diagnostics (FFT-based) to detect vibration modes, interference, or hardware faults",
          "Designing digital filters for smoothing, peak detection, and event detection in embedded pipelines",
          "Understanding stability/response when implementing discrete-time controllers or estimators (pre-control-systems foundation)"
        ],
      
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PLUl4u3cNGP61kdPAOC7CzFjJZ8f1eMUxs", // MIT 6.003 Signals and Systems (full course)
            "https://www.youtube.com/playlist?list=PLC6210462711083C4",                 // IIT-style Signals & Systems lecture series (Fourier/LTI focus)
            "https://www.youtube.com/playlist?list=PLyqSpQzTE6M8KJ-XQ1m2vl3nd2ZUqKEN8", // NPTEL Signals and Systems playlist
            "https://www.youtube.com/playlist?list=PLMrJAkhIeNNT_Xh3Oy0Y4LTj0Oxo8GqsC", // Steve Brunton Fourier Analysis (practical + computational)
            "https://www.youtube.com/playlist?list=PL41692B571DD0AF9B"                  // MIT RES.6.007 Signals and Systems (classic, solid for transforms + LTI)
          ],
          websites: [
            "https://ee.ucmerced.edu/courses",                  // EE course context
            "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/",         // Notes/assignments for MIT 6.003
            "https://dspguide.com/",                            // The Scientist & Engineer's Guide to DSP (free)
            "https://en.wikipedia.org/wiki/Linear_time-invariant_system"               // LTI system reference
          ],
          tools: [
            "Python (NumPy/SciPy) or MATLAB/Octave for signals, FFTs, and filter design",
            "Jupyter notebooks for experimentation + plotting",
            "CMSIS-DSP (if targeting ARM microcontrollers)",
            "Logic analyzer / oscilloscope for validating sampling, noise, and frequency content",
            "FFTs + windowing utilities for spectral debugging"
          ]
        },
      
        additionalNotes:
          "Embedded framing: focus on (1) sampling/aliasing, (2) filter latency vs noise suppression, and (3) frequency-domain debugging. "
          + "Those three show up constantly when you turn messy physical signals into dependable firmware behavior."
      },
  },
];

/**
 * 🟡 TIER 2: EMBEDDED-FOCUSED EECS & SYSTEMS
 * These turn students into job-ready embedded engineers.
 */
export const tier2Courses: TierCourse[] = [
    {
        id: "embedded-eecs-252",
        code: "EECS 252",
        name: "Embedded Computer Systems",
        fullName: "EECS 252: Embedded Computer Systems",
        description: "Dedicated embedded systems course",
        tier: 2,
        expandedInfo: {
          credits: 4,
      
          prerequisites:
            "Recommended: Computer Organization (CSE 031), C programming comfort, and at least one systems course (Operating Systems or Networks) before taking this.",
      
          learningOutcomes: [
            "Design embedded systems as an end-to-end stack: hardware platform + firmware architecture + real-world constraints",
            "Model and specify system behavior using practical methods (state machines, timing constraints, interface specs)",
            "Implement reliable embedded software organization (drivers/HAL layers, modules, task/thread structure, event loops)",
            "Build real-time or near-real-time behavior using RTOS concepts (tasks, scheduling, synchronization, queues)",
            "Measure and tune system performance under constraints (latency, jitter, memory footprint, power)",
            "Debug embedded systems with modern workflows (JTAG/SWD, logging/telemetry, tracing, fault analysis)",
            "Ship “production-style” embedded features: robust comms, watchdogs, safe updates, and failure recovery patterns"
          ],
      
          topics: [
            "Embedded platforms: microcontrollers vs embedded Linux-class systems, memory maps, peripherals, buses",
            "System modeling/specification: finite state machines, timing diagrams, interface contracts",
            "Software organization: drivers, HAL vs bare-metal, layered firmware architecture, build systems",
            "Real-time fundamentals: scheduling, interrupt + task design, synchronization, queues, event-driven patterns",
            "I/O and communication: UART/SPI/I2C, sensor pipelines, buffering, protocol framing and reliability",
            "Power and performance: low-power modes, profiling, latency/throughput trade-offs, resource budgeting",
            "Testing and deployment: unit tests where possible, hardware-in-the-loop mindset, logs/metrics, OTA update concepts"
          ],
      
          careerRelevance:
            "EECS 252 maps directly to embedded/firmware roles (Embedded Software Engineer, Firmware Engineer, IoT/Edge Engineer) and also helps systems/infra engineers who work on device fleets. "
            + "It builds the skills to design systems that stay reliable in the real world: timing constraints, partial failures, noisy inputs, and tight resource budgets—plus modern debugging and RTOS-based structure.",
      
          realWorldApplications: [
            "Building sensor/actuator devices with predictable timing (robotics, controls, instrumentation)",
            "Designing RTOS-based firmware that stays stable under load (task design, queues, synchronization)",
            "Writing drivers for peripherals and bringing up new boards (GPIO, timers, UART/SPI/I2C, ADC/PWM)",
            "Implementing robust device communications + telemetry for edge fleets (logging, metrics, protocol resilience)",
            "Creating safe failure recovery patterns (watchdogs, brownout handling, backoff/retry, persistent state)",
            "Developing embedded Linux/RTOS prototypes and deploying to real hardware with modern toolchains"
          ],
      
          resources: {
            videos: [
              "https://www.youtube.com/watch?v=25xrHzeaw5w", // Zephyr 4.2 Overview & Walkthrough (very modern RTOS ecosystem)
              "https://www.youtube.com/playlist?list=PLAymxPbYHgl-FZSggEx_lRJoPU2h4tT36", // Zephyr RTOS Tutorials (hands-on + modern workflow)
              "https://www.youtube.com/playlist?list=PLEBQazB0HUyTpoJoZecRK6PpDG31Y7RPB", // Digi-Key: Introduction to Embedded Linux (Buildroot/Yocto concepts)
              "https://www.youtube.com/playlist?list=PLnMKNibPkDnFeFV4eBfDQ9e5IrGL_dx1Q", // STMicroelectronics: FreeRTOS on STM32 (official MOOC playlist)
              "https://www.youtube.com/playlist?list=PLWddn_W2WNlNGbuKlVWuS944JHJ3ECEcs"  // ESP32 Development with ESP-IDF (modern embedded stack)
            ],
            websites: [
              "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67643", // UC Merced EECS 252 catalog entry
              "https://eecs.ucmerced.edu/current-students/courses",                         // EECS course list
              "https://docs.zephyrproject.org/latest/index.html",                          // Zephyr official docs
              "https://docs.espressif.com/projects/esp-idf/en/stable/esp32/index.html",     // ESP-IDF official docs
              "https://www.freertos.org/Documentation/00-Overview"                         // FreeRTOS official docs
            ],
            tools: [
              "Zephyr RTOS (west + CMake/Ninja) for modern RTOS-based firmware projects",
              "FreeRTOS for task-based real-time firmware structure",
              "ESP-IDF for real-world embedded networking/IoT stacks",
              "OpenOCD + GDB (or J-Link tools) for on-target debugging via JTAG/SWD",
              "Logic analyzer + oscilloscope for timing/protocol validation (SPI/I2C/UART)",
              "QEMU (when available) for early bring-up/testing without hardware",
              "CI for firmware (build + static checks + unit tests where possible)"
            ]
          },
      
          additionalNotes:
            "Best way to make this ‘infra-grade’: treat devices like tiny servers—prioritize observability (logs/metrics), safe rollout/update thinking, and failure recovery. "
            + "Pair your final project with a clean repo + reproducible build + debugging notes to make it portfolio-ready."
        }
    },
    {
        id: "embedded-eecs-257",
        code: "EECS 257",
        name: "Signal Processing for IoT",
        fullName: "EECS 257: Signal Processing for IoT",
        description: "Embedded sensing pipelines",
        tier: 2,
        expandedInfo: {
          credits: 4,
      
          prerequisites:
            "Recommended: Signals & Systems / DSP fundamentals (or equivalent), plus familiarity with linear algebra, calculus, and basic probability. Comfort writing Python or C/C++ for implementing filters/features and running on-device pipelines is helpful.",
      
          learningOutcomes: [
            "Build end-to-end sensing pipelines: digitization → preprocessing → feature extraction → inference/decision → telemetry",
            "Choose and implement practical DSP methods (filtering, spectral analysis, windowing) under tight memory/compute/power constraints",
            "Design robust time-series preprocessing for noisy real-world sensors (drift, outliers, missing data, sampling jitter)",
            "Translate offline DSP prototypes into on-device implementations (fixed-point/quantized workflows when needed)",
            "Evaluate pipelines empirically using latency, energy, memory footprint, and accuracy metrics",
            "Understand where classical DSP ends and embedded ML begins (and how to combine them effectively)",
            "Debug and iterate on real sensor streams using modern tooling and repeatable experiments"
          ],
      
          topics: [
            "IoT sensing pipeline architecture: sampling, anti-aliasing, ADC/DAC basics, buffering and timing",
            "Time-series preprocessing: detrending, normalization, filtering, resampling, denoising",
            "Frequency-domain analysis: FFT, spectrogram-style features, bandpower, windowing trade-offs",
            "Feature extraction for IoT signals: statistical features, peak/zero-crossing, MFCC-style audio features, vibration features",
            "Event detection/anomaly detection and thresholding; lightweight classifiers and embedded inference considerations",
            "Resource constraints: fixed-point vs floating-point, quantization, memory layout, compute budgeting, power-aware design",
            "Deployment patterns: edge vs cloud split, telemetry, compression, and “what to compute where” decisions"
          ],
      
          careerRelevance:
            "This course lines up directly with Embedded/IoT roles (Firmware + Sensing, Edge AI Engineer, Robotics/Controls adjacent roles) and also helps systems/infra engineers who manage device fleets. You learn how to make sensor data usable on real hardware—low latency, low power, and stable under noise—so devices can make decisions locally and ship the right telemetry upstream.",
      
          realWorldApplications: [
            "Predictive maintenance (vibration) pipelines: filtering + FFT features + on-device anomaly detection",
            "Audio keyword spotting and acoustic event detection on microcontrollers",
            "Wearables: motion/activity recognition using IMU preprocessing + features + lightweight inference",
            "Environmental sensing: denoise/compensate sensors, detect events, compress/stream meaningful summaries",
            "Smart home/industrial IoT: edge filtering + feature extraction to reduce bandwidth and cloud cost",
            "Designing telemetry that’s actually useful: deciding what to compute on-device vs what to send"
          ],
      
          resources: {
            videos: [
              "https://www.youtube.com/playlist?list=PL7VEa1KauMQp9bQdo2jLlJCdzprWkc7zC", // Edge Impulse Tutorials (DSP blocks, anomaly detection, end-to-end pipelines)
              "https://www.youtube.com/watch?v=nkENds3GPNs", // Create a Keyword Spotting System with Edge Impulse
              "https://www.youtube.com/watch?v=8sCd3nuHY5A", // Introduction to the CMSIS-DSP library
              "https://www.youtube.com/watch?v=d1KvgOwWvkM", // STM32 Fast Fourier Transform (CMSIS-DSP FFT example)
              "https://www.youtube.com/playlist?list=PL80kAHvQbh-pT4lCkDT53zT8DKmhE0idB"  // MIT 6.5940 EfficientML (relevant for tiny/edge inference constraints)
            ],
            websites: [
              "https://github.com/ARM-software/CMSIS-DSP",                         // CMSIS-DSP (optimized embedded DSP kernels)
              "https://arm-software.github.io/CMSIS-DSP/main/",                    // CMSIS-DSP docs/overview
              "https://docs.edgeimpulse.com/tutorials/end-to-end/keyword-spotting", // Edge Impulse keyword spotting tutorial
              "https://ai.google.dev/edge/litert/microcontrollers/overview",       // LiteRT for Microcontrollers (tiny on-device inference runtime)
              "https://github.com/tensorflow/tflite-micro"                         // TensorFlow Lite for Microcontrollers (reference implementation)
            ],
            tools: [
              "Python (NumPy/SciPy) for prototyping DSP + feature extraction on recorded sensor streams",
              "CMSIS-DSP for fast on-device filters/FFTs on Cortex-M",
              "Edge Impulse (DSP blocks + deployment) for end-to-end embedded sensing pipelines",
              "LiteRT / TFLite Micro for small on-device inference when ML is part of the pipeline",
              "Logic analyzer / oscilloscope for validating sampling, timing, and sensor buses",
              "Profiling basics: cycle counting, memory-map awareness, latency/jitter measurement"
            ]
          },
      
          additionalNotes:
            "The most portfolio-valuable projects here look like: (1) collect real sensor data, (2) build a DSP/feature pipeline, (3) prove it works with clear metrics, and (4) deploy a minimal on-device version with measured latency + memory + power trade-offs."
        }
      },
      {
        id: "embedded-eecs-262",
        code: "EECS 262",
        name: "Networking of Embedded Sensor Systems",
        fullName: "EECS 262: Networking of Embedded Sensor Systems",
        description: "IoT & distributed embedded",
        tier: 2,
        expandedInfo: {
          credits: 4,
      
          prerequisites:
            "Recommended background: Computer Networks fundamentals + an embedded systems course (microcontrollers/RTOS basics). The public catalog snippet confirms the unit count and focus area but does not reliably expose prerequisites in the excerpted view.",
      
          learningOutcomes: [
            "Understand low-power wireless networking constraints: bandwidth, duty-cycling, interference, and energy budgets",
            "Design multi-hop / mesh topologies and reason about routing trade-offs (reliability vs latency vs energy)",
            "Work with the IoT protocol stack (IPv6/6LoWPAN-style stacks, CoAP/MQTT-class application protocols) for constrained devices",
            "Implement and debug embedded networking using real systems tooling (packet capture, protocol analyzers, link metrics)",
            "Evaluate protocols and systems using realistic metrics: lifetime/energy, delivery ratio, latency, throughput, and scalability",
            "Understand security and provisioning challenges in device fleets (keying, onboarding, updates, and trust boundaries)",
            "Read and critique sensor-network / IoT networking research with an engineer’s lens (what would ship, what breaks)"
          ],
      
          topics: [
            "Low-power wireless fundamentals: links, MAC trade-offs, interference, duty cycling, time sync",
            "Mesh and multihop networking: flooding vs routing, reliability mechanisms, link estimation",
            "IoT stack design: constrained IP approaches, gatewaying/border routers, edge-to-cloud patterns",
            "Application-layer protocols for constrained devices (CoAP-style REST, MQTT pub/sub) and when to use which",
            "Device discovery, commissioning, and fleet operations: provisioning, telemetry, and update channels",
            "Security for embedded networks: authentication, key management, replay protection, threat modeling for constrained nodes",
            "Measurement and experimentation: testbeds, simulation/emulation, trace-driven evaluation"
          ],
      
          careerRelevance:
            "This is a direct match for Embedded/IoT Engineering, Connectivity Firmware, and Edge Platform roles—where the hard part isn’t ‘sending data,’ it’s doing it reliably under power, RF, and scale constraints. It’s also valuable for infra/platform engineers who support device fleets, because it builds intuition for what goes wrong in the field (lossy links, gateway failures, provisioning drift, and noisy telemetry).",
      
          realWorldApplications: [
            "Building Thread/mesh-style device networks for smart-home or building automation",
            "Designing LoRaWAN-style long-range sensing deployments and choosing what runs at the edge vs the cloud",
            "Implementing gateway/border-router behavior and translating constrained protocols to IP backends",
            "Debugging packet loss, latency spikes, or battery drain using over-the-air traces and link metrics",
            "Secure device onboarding + key rotation strategies for large fleets",
            "Choosing between MQTT vs CoAP (and tuning QoS/retransmissions) based on bandwidth, reliability, and device constraints"
          ],
      
          resources: {
            videos: [
              "https://www.youtube.com/playlist?list=PLoKOKJqgqHs9AK8cMkH3Nqyybzfv0q23D", // Thread + CoAP (hands-on examples)
              "https://www.youtube.com/playlist?list=PLM8eOeiKY7JWeGAJfpsJmVXqlanzJfJ_X", // LoRaWAN / TTN fundamentals + deployment patterns
              "https://www.youtube.com/playlist?list=PLRkdoPznE1EMXLW6XoYLGd4uUaB6wB0wd", // MQTT Essentials (practical pub/sub mechanics)
              "https://www.youtube.com/playlist?list=PLOzvoM7_KnrdHvpvq_EQaxHMdSwRBCvtx", // Matter + ecosystem connectivity context (Thread-adjacent)
              "https://www.youtube.com/watch?v=UV3VjUFOPW4" // OpenThread CLI on ESP32 (practical bring-up/debug mindset)
            ],
            websites: [
              "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67645", // official course catalog blurb
              "https://openthread.io/", // OpenThread overview + guides (Thread networking)
              "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html", // MQTT v5 spec (authoritative)
              "https://www.riot-os.org/", // RIOT OS (common for constrained networking experiments)
              "https://github.com/contiki-ng/contiki-ng" // Contiki-NG (classic sensor-network OS lineage)
            ],
            tools: [
              "Wireshark (+ embedded sniffers) for packet-level debugging",
              "OpenThread + OT tooling (CLI / simulator-style workflows) for Thread networks",
              "Mosquitto (or another broker) + MQTT clients for pub/sub testing",
              "libcoap / aiocoap (or equivalent) for CoAP experiments",
              "RIOT OS or Contiki-NG for constrained networking labs and protocol prototypes",
              "LoRaWAN stack tooling (TTN console-style workflow) for long-range sensing deployments"
            ]
          },
      
          additionalNotes:
            "A strong portfolio artifact from this course is a ‘full loop’ demo: battery-powered node(s) → mesh or long-range link → gateway → backend, with measured reliability/latency/energy and a debugging write-up (packet traces + root-cause analysis)."
        }
    },
    {
      id: "embedded-eecs-261",
      code: "EECS 261",
      name: "Wireless Networks",
      fullName: "EECS 261: Wireless Networks",
      description: "Communication protocols",
      tier: 2,
      expandedInfo: {
        credits: 4,
    
        prerequisites:
          "Recommended: Computer Networks (or equivalent), basic probability, and comfort with C/C++ or Python for labs/simulations",
    
        learningOutcomes: [
          "Explain how wireless links differ from wired links (fading, interference, mobility) and how that shapes protocol design",
          "Model and reason about wireless signal propagation, SNR, and link adaptation at a systems level",
          "Understand MAC-layer design trade-offs (contention vs scheduling) and how Wi-Fi-style networks coordinate access",
          "Analyze cellular network fundamentals: mobility management, handoff, core vs RAN roles, and performance bottlenecks",
          "Evaluate reliability/throughput/latency trade-offs under realistic wireless conditions and interference",
          "Apply coding/forward-error-correction and (high-level) network coding ideas to improve robustness and efficiency",
          "Use measurement and simulation workflows to debug and tune wireless systems"
        ],
    
        topics: [
          "Wireless channel basics: propagation, fading, path loss, interference, link budget intuition",
          "PHY/MAC design principles: modulation/coding intuition, rate adaptation, retransmissions (ARQ/HARQ concepts)",
          "Wi-Fi networking: 802.11-style MAC, airtime fairness, congestion and roaming behaviors",
          "Cellular networks: architecture overview (RAN + core), mobility, handoff, capacity planning intuition",
          "Spectrum and coexistence: unlicensed vs licensed bands, interference management",
          "Wireless performance engineering: latency/throughput trade-offs, measurement, troubleshooting",
          "Modern evolutions: Wi-Fi 6/6E/7 capacity features, 5G SBA concepts, Open RAN concepts (systems view)"
        ],
    
        careerRelevance:
          "For embedded engineers, wireless is where “the real world” hits your firmware: interference, roaming, power constraints, and unreliable links. This course maps directly to roles like Embedded Connectivity Engineer, IoT Systems Engineer, Wireless Systems/Platform Engineer, and Firmware/SRE-for-devices work—where you debug packet loss, optimize battery + throughput, and ship reliable Wi-Fi/cellular products in messy RF environments.",
    
        realWorldApplications: [
          "Debugging Wi-Fi/cellular connectivity issues in products (roaming failures, latency spikes, packet loss)",
          "Designing reliable IoT connectivity paths (Wi-Fi vs cellular trade-offs, retries, buffering, backoff)",
          "Optimizing power and performance for wireless devices (duty cycling, airtime efficiency, link adaptation)",
          "Building and validating embedded networking stacks and drivers (throughput tests, RF regressions, field telemetry)",
          "Using wireless measurements to guide system design (coverage, interference, capacity planning)",
          "Evaluating modern wireless architectures (5G core concepts, Open RAN components) from a systems perspective"
        ],
    
        resources: {
          videos: [
            "https://www.youtube.com/watch?v=NVp84UlV0Ww", // Wi-Fi 7 / 802.11be overview (modern Wi-Fi evolution)
            "https://www.youtube.com/playlist?list=PLVIgJ2mdtfw_POeWRktkKvHCiiGhN9mlm", // Wi-Fi 6/6E webinar series (capacity + deployment mindset)
            "https://www.youtube.com/playlist?list=PLlwwGTVw032aQ3_bw_FyYftUlVfPmgV_M", // 5G overview & architecture playlist
            "https://www.youtube.com/playlist?list=PLClhqzBCtzSyZkXTBKSZvSASc8wptaAis", // Open RAN beginner playlist (modern RAN architecture)
            "https://www.youtube.com/watch?v=2sJOEJxCbi0" // How 4G/5G cellular networks work (systems-level intuition)
          ],
    
          websites: [
            "https://www.3gpp.org/technologies/5g-system-overview", // 3GPP 5G system overview (SBA concepts)
            "https://docs.o-ran-sc.org/en/latest/architecture/architecture.html", // O-RAN architecture overview
            "https://next.ink/wp-content/uploads/2024/01/Wi-Fi_CERTIFIED_7_Technology_Overview.pdf", // Wi-Fi CERTIFIED 7 overview (Wi-Fi Alliance doc)
            "https://www.ietf.org/proceedings/82/6lowpan.html" // IETF 6LoWPAN WG page (wireless + constrained networking context)
          ],
    
          tools: [
            "Wireshark + tcpdump", // packet capture & protocol debugging
            "iperf3", // throughput/latency testing
            "Linux wireless tooling (iw, nmcli, hostapd, wpa_supplicant)", // practical Wi-Fi configuration/debug
            "ns-3", // wireless network simulation and evaluation
            "SDR + open stacks (GNU Radio, srsRAN or OpenAirInterface)" // hands-on cellular/RAN experimentation
          ]
        },
    
        additionalNotes:
          "If you want this to feel ‘embedded-relevant’, pair lectures with mini-labs: (1) measure Wi-Fi airtime + retries in a crowded environment, (2) build a roaming test and log analysis workflow, (3) run ns-3 experiments comparing contention vs scheduling under interference."
      }
    },
    {
      id: "embedded-eecs-245",
      code: "EECS 245",
      name: "Parallel Computing",
      fullName: "EECS 245: Parallel Computing",
      description: "Concurrency in embedded systems",
      tier: 2,
      expandedInfo: {
        credits: 4,
    
        prerequisites:
          "Recommended: Operating Systems + Computer Architecture/Organization + solid C/C++ (or Rust) proficiency. Helpful: basic performance analysis and debugging on Linux/embedded targets.",
    
        learningOutcomes: [
          "Design correct concurrent programs: avoid races, deadlocks, priority inversion, and starvation",
          "Apply parallel programming models to real systems constraints (latency, jitter, power, memory)",
          "Use RTOS-style concurrency: tasks/threads, interrupts, scheduling, synchronization, queues, and event-driven patterns",
          "Reason about multicore embedded systems (SMP/AMP basics) and how contention shows up in real time behavior",
          "Measure and tune performance: throughput vs latency, contention hot spots, CPU utilization, and memory bandwidth effects",
          "Use practical debugging workflows for concurrency bugs (trace/logging, fault analysis, timing instrumentation)",
          "Translate “parallel computing” concepts into embedded/IoT pipelines (sensor ingestion, DSP, networking, edge inference)"
        ],
    
        topics: [
          "Concurrency fundamentals: race conditions, atomicity, memory ordering intuition, deadlocks",
          "Synchronization: mutexes, semaphores, condition variables, lock-free/queue patterns (when appropriate)",
          "RTOS concepts: task scheduling, priorities, ISR-to-task handoff, queues/event groups, timing/jitter",
          "Parallel decomposition: pipeline vs data parallelism for embedded workloads",
          "Multicore embedded: SMP/AMP concepts, per-core data, contention, scheduling interactions",
          "Performance engineering: profiling, benchmarking, latency budgets, backpressure and buffering",
          "Reliability/debugging: HardFault-style failures, stack/heap sizing, watchdogs, tracing/observability"
        ],
    
        careerRelevance:
          "For embedded/firmware roles, concurrency is the difference between a demo and a product. EECS 245 helps you build systems that stay responsive under load, meet real-time deadlines, and scale across cores—skills used in Connectivity Firmware, IoT/Edge Platforms, Robotics/Controls firmware, and performance-oriented embedded engineering.",
    
        realWorldApplications: [
          "Building RTOS-based firmware that handles sensors + comms + control loops concurrently",
          "Designing safe ISR-to-task pipelines (capture → buffer → process → transmit) without data loss",
          "Preventing priority inversion and timing jitter in real-time systems (scheduling + synchronization choices)",
          "Scaling embedded workloads on multicore MCUs/SoCs (SMP/AMP architecture choices)",
          "Debugging concurrency failures using traces, logs, and fault dumps in deployed devices",
          "Optimizing throughput/latency in edge pipelines (DSP/FFT stages, networking stacks, inference loops)"
        ],
    
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PLEBQazB0HUyQ4hAPU1cJED6t3DU0h34bz", // Digi-Key: Introduction to RTOS (FreeRTOS concepts + practical threading)
            "https://www.youtube.com/watch?v=OOZzCOmPtTw", // Multi-core application development with Zephyr RTOS (SMP/AMP concepts)
            "https://www.youtube.com/watch?v=wni5h5vIPhU", // From Zero to Async in Embedded Rust (modern concurrency model on embedded)
            "https://www.youtube.com/watch?v=3_ar-3OjXnA", // Debugging HardFaults on Cortex-M (real-world concurrency/fault debugging)
            "https://www.youtube.com/playlist?list=PLgrKXQgo8LPtkTG7J9CEOQIgAXv9wUbRg"  // ESP-IDF FreeRTOS Tasks playlist (practical embedded concurrency patterns)
          ],
          websites: [
            "https://eecs.ucmerced.edu/current-students/courses",                // EECS course list (context)
            "https://www.freertos.org/Documentation/00-Overview",              // FreeRTOS docs (tasks/queues/semaphores)
            "https://freertos.org/Embedded-RTOS-Queues.html",                  // FreeRTOS queues (core concurrency primitive)
            "https://docs.zephyrproject.org/latest/kernel/services/smp/smp.html", // Zephyr SMP (multicore embedded)
            "https://arm-software.github.io/CMSIS_5/RTOS2/html/index.html"      // CMSIS-RTOS2 (standardized RTOS API layer)
          ],
          tools: [
            "FreeRTOS / Zephyr (RTOS scheduling + synchronization primitives)",
            "CMSIS-RTOS2 (portable RTOS abstraction for Cortex targets)",
            "ESP-IDF (real-world FreeRTOS-based firmware environment)",
            "GDB + OpenOCD/J-Link (on-target debugging; thread-aware debugging when available)",
            "RTOS tracing (SEGGER SystemView / Percepio Tracealyzer) for timing + contention analysis",
            "Static + runtime checks (clang-tidy, sanitizers where feasible on host-side components)"
          ]
        },
    
        additionalNotes:
          "If you want this to read ‘embedded-first’: highlight RTOS scheduling, ISR↔task communication, multicore contention, and trace-driven debugging (not just OpenMP/MPI). A strong final project is a multi-stage pipeline with measured latency/jitter and a short write-up of how you eliminated bottlenecks and race conditions."
      }
    },
    {
      id: "embedded-eecs-263",
      code: "EECS 263",
      name: "Cloud Computing",
      fullName: "EECS 263: Cloud Computing",
      description: "Embedded → cloud pipelines",
      tier: 2,
      expandedInfo: {
        credits: 4,
    
        prerequisites:
          "Recommended: Computer Networks + Distributed Systems fundamentals (or equivalent), and solid programming. Helpful: OS basics and familiarity with Linux/containers.",
    
        learningOutcomes: [
          "Understand cloud service models and how they map to real systems (IaaS/PaaS/FaaS; managed services vs self-managed)",
          "Explain virtualization and isolation in the cloud (VMs, containers, serverless sandboxes) and the trade-offs they introduce",
          "Design embedded → cloud ingestion pipelines that are reliable under loss, retries, and bursty sensor traffic",
          "Choose messaging/streaming patterns (pub/sub, queues, event-driven) for telemetry, commands, and device-state updates",
          "Apply cloud scheduling and elasticity concepts to meet cost, latency, and availability goals",
          "Build secure device-to-cloud paths (identity, keying, TLS, least privilege, fleet provisioning and rotation)",
          "Operate systems with modern observability: logs/metrics/traces and SLO-style thinking"
        ],
    
        topics: [
          "Cloud definitions and classifications; service models and deployment models",
          "Resource virtualization: VMs, containers, and multi-tenant isolation",
          "Cloud economics: pay-as-you-go, capacity planning, cost/performance trade-offs",
          "Scheduling and elasticity: autoscaling, load balancing, job placement intuition",
          "Event-driven architectures: queues, pub/sub, streaming ingestion for IoT telemetry",
          "Device → cloud pipelines: provisioning, gateways, buffering, backpressure, and failure recovery",
          "Cloud security + operations: IAM, secrets, secure networking, observability and incident response basics"
        ],
    
        careerRelevance:
          "EECS 263 is highly relevant for embedded/IoT engineers building real products because most devices are only half the system—the other half is the cloud pipeline that ingests telemetry, triggers workflows, stores history, and supports fleet ops. It also maps directly to Cloud/Platform Engineering and SRE work where you design scalable event-driven backends, manage cost/reliability trade-offs, and operate production services.",
    
        realWorldApplications: [
          "Telemetry ingestion: device → broker/pubsub → stream processing → storage → dashboards/alerts",
          "Command & control: sending secure downlinks, device shadow/state sync, and reliable retries",
          "Edge + cloud split: deciding what to compute on-device vs in the cloud to save latency/cost/power",
          "Serverless workflows for IoT: event triggers, fanout, scheduled jobs, and durable pipelines",
          "Infrastructure-as-Code for repeatable deployments (dev/stage/prod) and fleet-ready rollouts",
          "Observability for fleets: tracing event flows, detecting drops/latency spikes, and building SLOs"
        ],
    
        resources: {
          videos: [
            "https://www.youtube.com/playlist?list=PL2yQDdvlhXf_Ezjnq7A7LfHBgCYSqzrZS", // AWS re:Invent 2024 — Serverless Compute playlist
            "https://www.youtube.com/playlist?list=PLIivdWyY5sqKwVLe4BLJ-vlh9r9zCdOse", // Google Cloud — Pub/Sub Made Easy playlist
            "https://www.youtube.com/watch?v=-7SNI-Zoa-g",                               // Azure IoT Hub explained (device→cloud bridge)
            "https://www.youtube.com/watch?v=jtf4SnGBp0E",                               // Kubernetes Full Course for Beginners (modern container orchestration)
            "https://www.youtube.com/playlist?list=PLBfufR7vyJJ6OmMNbvfkBx1HcL-XI8ymg"   // Terraform Associate (003) course playlist
          ],
          websites: [
            "https://docs.aws.amazon.com/iot/latest/developerguide/iot-gs.html",                 // AWS IoT Core getting started
            "https://docs.cloud.google.com/pubsub/docs",                                        // Google Cloud Pub/Sub docs
            "https://kubernetes.io/docs/tutorials/kubernetes-basics/",                          // Kubernetes basics (2025-updated tutorial)
            "https://opentelemetry.io/docs/what-is-opentelemetry/",                             // OpenTelemetry overview (modern observability)
            "https://www.hashicorp.com/en/certification"                                        // Terraform certification / IaC context
          ],
          tools: [
            "Docker + Kubernetes (containers + orchestration for scalable backends)",
            "Terraform (Infrastructure as Code for repeatable cloud deployments)",
            "Managed pub/sub or queues (e.g., Pub/Sub/SQS/Event Hubs) for telemetry ingestion",
            "MQTT broker + device SDKs (device connectivity patterns and testing)",
            "Serverless compute (AWS Lambda / Cloud Run / Azure Functions) for event-driven pipelines",
            "Observability stack (OpenTelemetry + a backend like Grafana/Tempo/Jaeger) for tracing event flows"
          ]
        },
    
        additionalNotes:
          "To make this ‘embedded→cloud’ portfolio-ready: build one complete pipeline (device simulator is fine) that publishes telemetry, triggers a serverless handler, stores results, and exposes a dashboard—then include measured throughput/latency, retry behavior, and cost notes."
      }
    },
];

/**
 * 🟡 TIER 2.5: MECHANICAL ENGINEERING (CONTROL & MECHATRONICS)
 * Optional, but extremely powerful for robotics and cyber-physical systems.
 */
export const tier2_5Courses: TierCourse[] = [
  {
    id: "embedded-me-142",
    code: "ME 142",
    name: "Mechatronics",
    fullName: "ME 142: Mechatronics",
    description: "Hardware + firmware integration",
    tier: 2.5,
    expandedInfo: {
      credits: 4,
  
      prerequisites:
        "MATH 024 and (ME 140 or EE 102).",
  
      learningOutcomes: [
        "Build end-to-end mechatronic systems that combine sensors, actuators, and microcontroller firmware",
        "Design reliable real-world I/O: sampling, filtering, debouncing, timing, and calibration",
        "Model and control physical systems using feedback (PI/PID basics) and validate behavior experimentally",
        "Interface common hardware components (motors, encoders, IMUs, range sensors) and select parts based on specs and constraints",
        "Reason about embedded constraints: latency, jitter, power, noise, and real-time-ish scheduling",
        "Debug hardware+software together using systematic instrumentation and measurement"
      ],
  
      topics: [
        "Microcontrollers for mechatronics: GPIO, PWM, interrupts, timers, ADC/DAC, serial buses (UART/I2C/SPI)",
        "Sensors and signal conditioning: noise, filtering, sampling, calibration, sensor fusion basics",
        "Actuators: DC motors, servos, steppers; drivers/H-bridges; encoders and closed-loop control",
        "Feedback control in practice: PI/PID intuition, tuning, saturation/anti-windup concepts",
        "System integration: hardware bring-up, firmware architecture, and rapid prototyping workflows",
        "Testing & measurement: oscilloscopes/logic analyzers, logging, and experiment-driven iteration"
      ],
  
      careerRelevance:
        "ME 142 is a direct bridge from ‘theory’ to shipping real embedded products. It builds the exact integration skillset used in robotics, IoT, automotive, drones, medical devices, and industrial automation—where debugging a system means understanding sensors, electronics, firmware timing, and control behavior together (not in isolation).",
  
      realWorldApplications: [
        "Building a sensor → control loop → actuator pipeline (e.g., motor position control with encoder feedback)",
        "Designing embedded prototypes for robots, drones, smart devices, and instrumentation rigs",
        "Implementing reliable motor control and basic autonomy primitives (line following, stabilization, closed-loop speed/position)",
        "Creating test harnesses and using measurements (scope/logic analyzer) to diagnose timing and signal issues",
        "Deploying microcontroller-based subsystems that integrate into larger robotics stacks (ROS 2 / micro-ROS)"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLK0b4e05LnzZFFnkMvb3O8zilh0J8VckB", // Building Your First ROS2 Robot (modern hardware+software integration)
          "https://www.youtube.com/playlist?list=PLbFaOt0VQ7S8AYNzat7yB2j9_bCVvI3l1", // micro-ROS & pico-ROS Complete Course (microcontrollers + ROS 2)
          "https://www.youtube.com/playlist?list=PLn8PRpmsu08pQBgjxYFXSsODEF3Jqmm-y", // Understanding PID Control (practical control intuition)
          "https://www.youtube.com/playlist?list=PLAe65jtGH-e8Db2BXBuxOO46RT8_Zi9L_", // Arduino Actuators & Sensors series (hands-on interfacing)
          "https://www.youtube.com/watch?v=B9SbYjQSBY8" // ros2_control crash course (control architecture + hardware interface)
        ],
  
        websites: [
          "https://catalog.ucmerced.edu/content.php?catoid=24&expand=1&filter%5B3%5D=1&filter%5Bcpage%5D=16&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&navoid=2732&print=", // UC Merced catalog entry (units/description/prereqs)
          "https://mechatronics.ucmerced.edu/teaching", // UC Merced mechatronics lab teaching notes (course/lab context)
          "https://micro.ros.org/", // micro-ROS official site
          "https://sensorkit.arduino.cc/", // Arduino Sensor Kit (quick hands-on sensor/actuator practice)
          "https://www.mathworks.com/videos/series/understanding-pid-control.html" // PID control video series landing page (MathWorks)
        ],
  
        tools: [
          "Arduino / STM32 (or similar MCU platform)",
          "PlatformIO or vendor IDEs (STM32CubeIDE / Arduino IDE)",
          "Oscilloscope + logic analyzer (timing and signal debug)",
          "Multimeter + bench power supply (safe bring-up and power debugging)",
          "MATLAB/Simulink (modeling + control prototyping)",
          "KiCad (basic schematics/PCB for custom boards)",
          "ROS 2 + micro-ROS (optional: embedded → robotics stack integration)"
        ]
      },
  
      additionalNotes:
        "If you want this course to ‘look embedded-industry legit’ on your resume: ship one polished demo (motor + encoder + PID, or sensor fusion + actuation) and include a short write-up with oscilloscope screenshots, latency/jitter notes, and what you changed after testing."
    }
  },
  {
    id: "embedded-me-146",
    code: "ME 146",
    name: "Sensors & Actuators",
    fullName: "ME 146: Sensors & Actuators",
    description: "Physical interfaces",
    tier: 2.5,
    expandedInfo: {
      credits: 3,
  
      prerequisites: "ENGR 065 and (ENGR 057 or ENGR 057H).",
  
      learningOutcomes: [
        "Select appropriate sensors for real-world measurements and explain key specs (range, sensitivity, noise, drift, bandwidth)",
        "Design sensor interfaces: signal conditioning, biasing, filtering, and ADC selection trade-offs",
        "Calibrate sensors and quantify error sources (offset/gain, nonlinearity, hysteresis, temperature effects)",
        "Choose actuators (DC/BLDC/stepper/servo/solenoids) based on torque/speed, power, duty cycle, and control needs",
        "Implement actuator drive and control basics (PWM, H-bridges, current limiting, protection/EMI considerations)",
        "Integrate sensing + actuation into closed-loop systems with practical stability/tuning intuition"
      ],
  
      topics: [
        "Sensor fundamentals: transfer functions, static/dynamic response, noise and uncertainty",
        "Common sensor types: resistive/RTD/thermistor, strain/force, pressure, optical/encoders, IMUs, environmental sensors",
        "Signal conditioning: instrumentation amps, filtering/anti-aliasing, level shifting, shielding/grounding",
        "Data acquisition: ADC architectures (SAR/Delta-Sigma), sampling, quantization, ratiometric measurements",
        "Actuators: DC motors, steppers, servos, solenoids; drivers and power electronics basics",
        "Motor control building blocks: PWM, H-bridge, current sensing, stall detection, protection and thermal limits",
        "System integration: timing, latency/jitter, sensor-to-actuator pipelines, debugging with measurement tools"
      ],
  
      careerRelevance:
        "This course is directly aligned with embedded/robotics/IoT work because it teaches the ‘interfaces to the real world’: how you measure physical signals reliably and how you drive motion/force safely. That skillset shows up everywhere—robotics, drones, industrial automation, medical devices, automotive, and smart hardware—where firmware quality depends on clean sensor data and robust actuation control.",
  
      realWorldApplications: [
        "Building reliable sensor acquisition chains (filtering, calibration, sampling strategy) for robotics/IoT",
        "Driving motors and solenoids with safe power stages (H-bridges, protection, current limiting)",
        "Closed-loop control for position/speed/temperature using encoders, IMUs, or RTDs",
        "Reducing noise/EMI issues using grounding, shielding, and layout-aware design choices",
        "Creating validation tests: characterizing sensor noise and actuator response with scopes/logic analyzers"
      ],
  
      resources: {
        videos: [
          "https://www.ti.com/video/6031569456001", // TI Precision Labs — Temperature sensor technologies
          "https://www.youtube.com/playlist?list=PLISmVLHAZbTSjO8tag_Yp34-3RQ8ys6tm", // TI Precision Labs — Measuring RTDs with precision ADCs
          "https://www.youtube.com/watch?v=HbTFu__LW_A", // Digi-Key Tech Basics — Motors & Motor Control
          "https://www.youtube.com/watch?v=kst8n1HoO-w", // Digi-Key Tech Basics — Motion Sensors
          "https://www.youtube.com/watch?v=1bUJctEyx3E" // Digi-Key Tech Basics — Servo Motors
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69532", // UC Merced catalog listing (course overview, prereqs)
          "https://www.ti.com/video/series/precision-labs/ti-precision-labs-temperature-sensors.html", // TI Precision Labs — Temperature Sensors curriculum
          "https://www.digikey.com/en/maker/resources/stem-diy/learn-from-videos", // Digi-Key learning hub (Tech Basics + practical hardware videos)
          "https://www.bosch-sensortec.com/products/smart-sensor-systems/bhi385/", // Example modern IMU + real datasheet-grade specs
          "https://www.analog.com/en/resources/media-center/videos/video-series/precision-dacs-video-series.html" // Precision DAC training (actuation/output signal generation)
        ],
        tools: [
          "Oscilloscope + logic analyzer (timing, noise, PWM validation)",
          "Microcontroller dev boards (STM32 / ESP32 / Arduino-class) for rapid prototyping",
          "DAQ + ADC evaluation boards (characterizing sensors and sampling chains)",
          "Motor drivers (H-bridge modules, BLDC drivers) + current sense (shunt/INA)",
          "MATLAB/Python for calibration, filtering, and data analysis",
          "Firmware tools: PlatformIO, serial logging, basic test harnesses"
        ]
      },
  
      additionalNotes:
        "If you want this to stand out for embedded roles: document one full ‘sense → compute → actuate’ build (e.g., encoder + motor control, or temperature sensor + heater control) and include calibration plots + noise measurements + driver protection choices."
    }
  },
  {
    id: "embedded-me-140",
    code: "ME 140",
    name: "Vibrations & Control Systems",
    fullName: "ME 140: Vibration and Control",
    description: "Stability & control",
    tier: 2.5,
    expandedInfo: {
      credits: 4,
  
      prerequisites: "MATH 024 and (ENGR 057 or ENGR 057H).",
  
      learningOutcomes: [
        "Model vibration of mechanical systems (single-DOF and multi-DOF) and predict natural frequencies, damping, and resonance behavior",
        "Analyze forced response using frequency-response intuition (amplification near resonance, transmissibility, isolation)",
        "Extend vibration analysis to continuous structures (beams/plates) using mode shapes and modal superposition intuition",
        "Connect dynamics models to control models (transfer functions/state-space) and reason about stability and performance",
        "Design and tune basic controllers (e.g., PID/lead-lag) using time-domain and frequency-domain methods (Bode, margins)",
        "Diagnose real system issues like oscillation, overshoot, and vibration-induced instability using measurement + modeling",
        "Understand the core trade-offs in control: stability margins vs responsiveness vs noise sensitivity"
      ],
  
      topics: [
        "Dynamics foundations: particles and rigid bodies; modeling with differential equations",
        "Free vibration: undamped/damped SDOF, logarithmic decrement, damping ratio, natural frequency",
        "Forced vibration: harmonic excitation, frequency response, resonance, transmissibility, vibration isolation",
        "MDOF systems: eigenvalues/eigenvectors, mode shapes, modal coordinates, modal superposition",
        "Continuous systems: beams/plates vibration basics and mode-shape thinking",
        "Control fundamentals: feedback concept, transfer functions, time response metrics, stability intuition",
        "Frequency-domain control: Bode plots, stability margins, simple compensators (lead/lag), practical PID tuning mindset"
      ],
  
      careerRelevance:
        "ME 140 is extremely valuable for embedded/robotics/mechatronics paths because it explains why real hardware oscillates and how to stabilize it. "
        + "It directly supports roles like **Robotics/Mechatronics Engineer**, **Controls/Autonomy Engineer**, **Embedded Systems Engineer (motion/control)**, and **Test/Validation Engineer**—especially when you’re dealing with motors, structures, sensors, and feedback loops where vibration and stability limits dominate performance.",
  
      realWorldApplications: [
        "Tuning motor control loops (speed/position) without exciting mechanical resonance",
        "Designing vibration isolation and damping solutions for sensors, drones, and precision instruments",
        "Using frequency-response testing to identify resonant modes and validate control stability margins",
        "Preventing oscillations in systems with flexible structures (robot arms, mounts, vehicles)",
        "Building stable closed-loop systems under noise and delays (filters + control trade-offs)"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLTORuRSEqZqb6sZ4BoVBqauUA-hQcv_Ny", // Steve Brunton — Control Bootcamp (modern, math-to-intuition bridge)
          "https://www.youtube.com/playlist?list=PLUMWjy5jgHK1NC52DXXrriwihVrYZKqjk", // Brian Douglas — Classical Control Theory (practical Bode/root-locus intuition)
          "https://www.youtube.com/playlist?list=PLMXj6GKKnHI6Lftj7CXr9WusMkXi5s9yH", // University of Twente — Mechanical Vibrations (clear vibrations sequence)
          "https://www.youtube.com/playlist?list=PLa4KQhDlGd7Sxe0RBW2phHnNpp7ZY9sZl"  // Vibration Control playlist (isolation, mitigation, control context)
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68071", // UC Merced ME 140 catalog entry
          "https://ocw.mit.edu/courses/6-302-feedback-systems-spring-2007/",            // MIT Feedback Systems (excellent reference for classical design methods)
          "https://en.wikipedia.org/wiki/Mechanical_vibration",                        // Quick reference for vibration terminology
          "https://en.wikipedia.org/wiki/Control_theory"                               // Quick reference for core control concepts
        ],
        tools: [
          "MATLAB/Simulink (control + vibrations modeling, frequency response, controller design)",
          "Python (NumPy/SciPy + python-control) for simulation, Bode plots, and quick analysis",
          "Frequency-response measurement tools (FFT/swept-sine workflows) for identifying resonances",
          "Oscilloscope/logic analyzer (timing + sensor noise validation in real prototypes)",
          "System identification basics (fit models from data: step response, FRF measurements)"
        ]
      },
  
      additionalNotes:
        "To make this course portfolio-relevant for embedded/mechatronics: document one experiment where you identify a resonance (data + FFT/FRF), then show how your controller or damping change improved stability margins and reduced vibration."
    }
  },
  {
    id: "embedded-me-145",
    code: "ME 145",
    name: "Lagrange Dynamics",
    fullName: "ME 145: Lagrange Dynamics",
    description: "System modeling",
    tier: 2.5,
    expandedInfo: {
      credits: 3,
  
      prerequisites: "ME 210 (per catalog listing).",
  
      learningOutcomes: [
        "Model mechanical and mechatronic systems using generalized coordinates and energy-based methods",
        "Derive equations of motion with the Euler–Lagrange formulation for multi-DOF systems",
        "Handle constraints (holonomic and non-holonomic) and understand how they change system dynamics",
        "Compute generalized forces/virtual work for real actuators (motors, springs/dampers, contact forces)",
        "Build intuition for stability/behavior from the derived model (equilibria, linearization mindset, conservation/energy checks)",
        "Translate models into simulation-ready forms for control, estimation, and embedded implementation"
      ],
  
      topics: [
        "Review of Newtonian dynamics and why we use Lagrangian methods",
        "Generalized coordinates, degrees of freedom, and coordinate choice trade-offs",
        "Holonomic vs non-holonomic constraints; constraint handling approaches",
        "Virtual displacements and virtual work; generalized forces",
        "Euler–Lagrange equations; multi-body / multi-DOF modeling patterns",
        "Model validation checks: energy, units, limiting cases, and sanity tests",
        "Simulation and control connections: state-space forms, linearization intuition, and practical modeling pitfalls"
      ],
  
      careerRelevance:
        "For embedded/mechatronics/robotics engineers, Lagrangian dynamics is the language behind motion control, state estimation, simulation, and real-time performance tuning. It’s what lets you go from a physical mechanism (linkages, motors, compliant elements) to a model you can simulate, stabilize, and deploy in firmware—especially when constraints and coupled dynamics make Newton-by-components painful.",
  
      realWorldApplications: [
        "Deriving equations of motion for a robot arm, gimbal, drone payload, or mobile robot and turning them into simulation code",
        "Building feedforward + feedback controllers (model-based terms like gravity/torque compensation)",
        "Improving estimator performance by using a physically-correct dynamics model (e.g., EKF on a mechanism)",
        "Diagnosing oscillation/instability by understanding where energy enters/leaves the system (damping, actuation limits)",
        "Modeling constrained systems: rolling wheels, linkages, and contact-like constraints in a simplified form"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=VeEqtTgDXFc", // MIT Underactuated (Spring 2019) Lecture 1 (dynamics/model-based framing)
          "https://www.youtube.com/watch?v=PRaSlUA78gQ", // MIT Underactuated (Spring 2022) Lecture 1: robot dynamics & model-based control
          "https://www.youtube.com/watch?v=Z2pU4LIrtR8", // Euler–Lagrange double pendulum derivation (Fall 2023)
          "https://www.youtube.com/playlist?list=PLggLP4f-rq00TQamz2pXjzPWpuxhVN_Vy" // Modern Robotics Chapter 8: Lagrangian dynamics of open chains
        ],
        websites: [
          "https://catalog.ucmerced.edu/content.php?catoid=24&expand=1&filter%5B3%5D=1&filter%5Bcpage%5D=16&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&navoid=2732", // UC Merced catalog listing (ME 145 summary + prereq)
          "https://underactuated.csail.mit.edu/index.html", // Underactuated Robotics notes (great dynamics/control reference)
          "https://ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/pages/lagrange-equations/", // MIT OCW: Lagrange equations (lecture + problem-solving videos)
          "https://modernrobotics.northwestern.edu/nu-gm-book-resource/introduction-autoplay/", // Modern Robotics free resources (dynamics chapter)
          "https://drake.mit.edu/" // Drake (model-based robotics dynamics + simulation tooling)
        ],
        tools: [
          "Python (NumPy/SciPy) + SymPy (symbolic derivations and sanity checks)",
          "MATLAB/Simulink (state-space modeling + control prototyping)",
          "Drake or MuJoCo (simulation and model-based control experimentation)",
          "Jupyter notebooks (derivation → simulation → plots workflow)",
          "Versioned modeling pipelines (unit tests for dynamics: energy/unit/limit-case checks)"
        ]
      },
  
      additionalNotes:
        "A strong portfolio artifact here is a clean ‘model-to-code’ write-up: derive a multi-DOF system with constraints, validate it (energy + limit cases), simulate it, then show a simple controller or estimator built on top."
    }
  },
  {
    id: "embedded-me-152",
    code: "ME 152",
    name: "Digital Twins",
    fullName: "ME 152: Digital Twins",
    description: "Simulating embedded systems",
    tier: 2.5,
    expandedInfo: {
      credits: 4,
  
      prerequisites:
        "Recommended: Signals/Linear Systems + Controls/Mechatronics basics (or equivalent). Helpful: Python, basic embedded/IoT familiarity (sensors + networking), and comfort with modeling/simulation.",
  
      learningOutcomes: [
        "Explain what makes a system a true digital twin (vs. a static simulation): live data, synchronization, and predictive capability",
        "Design an embedded → edge → cloud data loop that keeps a twin updated under real constraints (loss, latency, retries, bursty telemetry)",
        "Build simulation + data fusion workflows (physics model + measured data) to improve accuracy over time",
        "Use co-simulation patterns (model-in-the-loop / software-in-the-loop / hardware-in-the-loop) to validate embedded behavior before deployment",
        "Implement state estimation / parameter identification basics to match the model to the physical system",
        "Evaluate a twin using measurable criteria: fidelity, latency, stability, compute cost, and operational value",
        "Instrument and operate a twin pipeline using modern observability (logs/metrics/traces) and reliability thinking"
      ],
  
      topics: [
        "Digital twin fundamentals: definitions, architectures, synchronization and lifecycle",
        "Data pipelines for twins: telemetry ingestion, buffering, backpressure, and time-series management",
        "Hybrid modeling: physics-based models + data-driven models (ML/ROMs) and when each is appropriate",
        "Behavior matching: calibration, parameter estimation, uncertainty and drift handling",
        "Co-simulation & testing: MIL/SIL/HIL, real-time constraints, and validation strategies",
        "Operational use cases: predictive maintenance, anomaly detection, optimization, what-if planning",
        "Security & fleet context: device identity, secure transport, least privilege, and update strategies"
      ],
  
      careerRelevance:
        "Digital Twins sits at the intersection of embedded systems, controls, and cloud platforms—exactly where modern robotics/IoT products live. Knowing how to create a live model that stays aligned with real devices helps you ship safer firmware, debug faster, predict failures earlier, and scale operations across fleets—skills valued in embedded/IoT, autonomy, reliability engineering, and industrial/robotics platform teams.",
  
      realWorldApplications: [
        "Creating a digital twin for a sensor+actuator device to test firmware changes safely before field rollout",
        "Running HIL simulations to validate timing, saturation, and stability edge cases that are hard to reproduce physically",
        "Predictive maintenance pipelines that detect drift/failure modes from telemetry + model residuals",
        "Operational dashboards that combine time-series signals with a semantic model (device state + relationships)",
        "Edge/offline modes where the twin continues predicting locally when cloud connectivity drops"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=gUVuPEkZL0s", // What is AWS IoT TwinMaker? (practical operational twin concept)
          "https://www.youtube.com/playlist?list=PLi3dkyfu4cY0VTXiUrLzAzq7rNewXZ-ro", // AWS IoT TwinMaker playlist (hands-on workflows)
          "https://www.youtube.com/playlist?list=PL1ljc761XCiYfsAlacKK4gpaMoTIH2nSU", // Azure Digital Twins playlist (modeling + workflows)
          "https://www.youtube.com/watch?v=XMsztclKSrg", // NVIDIA GTC 2025: digital twins / physical AI context (modern industry direction)
          "https://www.youtube.com/watch?v=wMSeEumT6ic"  // Unite 2024: operational digital twins (IoT + visualization + APIs)
        ],
        websites: [
          "https://catalog.ucmerced.edu/content.php?catoid=24&catoid=24&expand=1&filter%5B3%5D=1&filter%5Bcpage%5D=16&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&navoid=2732&print=", // UC Merced catalog listing (ME 152 appears here)
          "https://mechatronics.ucmerced.edu/digital-twin", // UC Merced MESA Lab Digital Twin page (course + lab ecosystem)
          "https://aws.amazon.com/blogs/iot/unlocking-business-value-through-digital-twins-the-aws-and-bosch-partnership/", // AWS IoT digital twins industry use cases
          "https://www.ansys.com/en-gb/events/digital-twin-webinar-series", // Ansys digital twin webinar series (hybrid/ROM tooling perspective)
          "https://azure.microsoft.com/en-us/blog/product/digital-twins/" // Azure Digital Twins blog hub (concept + applications)
        ],
        tools: [
          "AWS IoT TwinMaker / Azure Digital Twins (twin graph + live telemetry integration)",
          "MQTT + device SDKs (reliable telemetry + command channels)",
          "Time-series storage + dashboards (e.g., Timestream/InfluxDB + Grafana)",
          "Simulation stacks (MATLAB/Simulink, Ansys Twin Builder, or similar) for plant modeling",
          "Co-simulation & HIL tooling (hardware rigs + deterministic logging/trace capture)",
          "Python (model calibration, residual analysis, and automation pipelines)"
        ]
      },
  
      additionalNotes:
        "For an embedded-focused portfolio: build a small device/simulator that publishes telemetry, keeps a twin updated, and demonstrates one high-value behavior (fault detection, drift detection, or what-if prediction). Include measured latency, failure-mode behavior (disconnects/retries), and a short validation section showing how well the twin matches reality."
    }
  },
];

/**
 * 🟠 TIER 3: SPECIALIZATION / NICHE (OPTIONAL)
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "embedded-cse-157",
    code: "CSE 157",
    name: "Signal Processing for IoT",
    fullName: "CSE 157: Signal Processing for Internet of Things",
    description: "Sensor-heavy embedded",
    tier: 3,
    expandedInfo: {
      credits: 4,
  
      prerequisites:
        "Recommended: Signals/Linear Systems (or equivalent), basic probability/statistics, and comfort with Python. Helpful: embedded fundamentals (microcontrollers + sampling/ADC basics) and basic ML concepts (training vs inference).",
  
      learningOutcomes: [
        "Convert real sensor signals into reliable digital representations (sampling, anti-aliasing intuition, quantization effects)",
        "Design and apply practical filters for embedded sensing (FIR/IIR trade-offs, stability, latency, compute cost)",
        "Extract features from time-series signals for downstream inference (FFT/STFT, bandpower, MFCCs, envelope/peaks, statistics)",
        "Build end-to-end sensor pipelines: windowing, normalization, feature computation, and on-device inference-friendly formatting",
        "Reason about resource constraints: memory, CPU cycles, fixed-point vs float, energy usage, and real-time deadlines",
        "Validate pipelines using measurement + benchmarking (latency/throughput, accuracy vs compute, robustness to noise/drift)",
        "Deploy “signal processing between digitization and inference” as used in real IoT devices (edge preprocessing feeding classifiers/anomaly detectors)"
      ],
  
      topics: [
        "Sampling and digitization for IoT: aliasing, noise, quantization, ADC considerations",
        "Time-domain preprocessing: smoothing, detrending, normalization, segmentation/windowing",
        "Filtering: FIR/IIR basics, filter design goals, stability/latency/compute trade-offs",
        "Frequency-domain tools: FFT, spectral features, STFT, band features for vibration/audio",
        "Feature extraction for inference: MFCCs (audio), statistical/temporal features (IMU), event detection",
        "Embedded implementation: fixed-point thinking, lookup tables, SIMD/optimized kernels (where available)",
        "Edge inference interface: preparing features for TinyML / on-device models and measuring end-to-end performance"
      ],
  
      careerRelevance:
        "This is a high-ROI embedded course because most real devices don’t send raw sensor streams—they do on-device preprocessing to reduce bandwidth, improve robustness, and enable low-latency decisions. "
        + "If you’re targeting embedded/IoT roles (wearables, robotics, industrial monitoring), this maps directly to building reliable sensing stacks, deploying TinyML/anomaly detection, and tuning pipelines under strict compute/power constraints.",
  
      realWorldApplications: [
        "Vibration-based anomaly detection for motors/industrial equipment using spectral features (FFT bandpower, peaks)",
        "Audio keyword spotting or acoustic event detection using MFCC/STFT-style features on-device",
        "IMU-based activity recognition using windowed statistics + frequency features (steps, gestures, impacts)",
        "Reducing cloud load by doing feature extraction and filtering on the edge before uplink",
        "Designing robust pipelines that handle sensor drift, noise bursts, and missing data while meeting real-time deadlines"
      ],
  
      resources: {
        videos: [
          "https://m.youtube.com/playlist?list=PLo_tFZGoEZumWwzsPWSIMrrU24sZw2pxF", // TinyML Summit Taipei 2024 (modern edge/TinyML talks & demos)
          "https://www.youtube.com/watch?v=hopWOVznDew", // tinyML workshop at AI for Good Summit 2024 (modern edge ML context)
          "https://www.youtube.com/watch?v=32n-7OTmceI", // Low-energy Edge DSP + AI talk (hardware + DSP constraints)
          "https://www.youtube.com/watch?v=lDskXTR6psY", // STM32 real-time FIR filtering with CMSIS-DSP (hands-on embedded filtering)
          "https://www.youtube.com/watch?v=biRgearB1kE"  // 2024/2025 DSP lecture (FIR filters) to reinforce fundamentals
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=70001", // UC Merced catalog entry (course description)
          "https://catalog.ucmerced.edu/preview_program.php?catoid=24&poid=4221",      // UC Merced program page showing units (CSE 157 = 4)
          "https://arm-software.github.io/CMSIS-DSP/main/",                             // CMSIS-DSP docs (embedded-optimized DSP kernels)
          "https://docs.scipy.org/doc/scipy/reference/signal.html",                     // scipy.signal reference (design/analysis prototyping)
          "https://librosa.org/doc/main/generated/librosa.feature.mfcc.html",           // MFCC feature extraction reference
          "https://ai.google.dev/edge/litert/microcontrollers/overview"                 // LiteRT/TFLite Microcontrollers runtime overview
        ],
        tools: [
          "ARM CMSIS-DSP (fast FIR/IIR/FFT and math kernels on Cortex-M class MCUs)",
          "Python (NumPy + SciPy) for rapid filter/feature prototyping and validation",
          "librosa (audio feature extraction: MFCC/STFT) for building + testing pipelines",
          "LiteRT / TensorFlow Lite for Microcontrollers (running small inference on-device)",
          "Oscilloscope / logic analyzer + timestamped logging (validate sampling, latency, real-time behavior)",
          "Time-series tooling (CSV/Parquet + simple plotting) for reproducible dataset + pipeline iteration"
        ]
      },
  
      additionalNotes:
        "If you want this to scream ‘embedded’: pick one sensor (IMU/audio/vibration), implement the full pipeline twice—(1) Python prototype, (2) on-device CMSIS-DSP version—then report compute cost (ms/window), memory, and accuracy impact. That’s exactly what infra-minded embedded teams look for."
    }
  },
  {
    id: "embedded-ee-180",
    code: "EE 180",
    name: "Autonomous Vehicles",
    fullName: "EE 180: Autonomous Vehicles",
    description: "Embedded autonomy",
    tier: 3,
    expandedInfo: {
      credits: 4, // UC Merced catalog/program listings show EE 180 as 4 units. :contentReference[oaicite:0]{index=0}
  
      prerequisites:
        "Not consistently visible in the publicly accessible listing; recommended background: signals/linear systems, probability, basic controls, and embedded programming. Familiarity with sensors (IMU/camera/LiDAR) and networking helps.",
  
      learningOutcomes: [
        "Understand end-to-end autonomous vehicle architecture: sensing → perception → localization → prediction → planning → control",
        "Interpret SAE levels of driving automation and how ODD/safety responsibilities change across levels",
        "Compare sensor modalities (camera/LiDAR/radar/IMU/GNSS) and design trade-offs for embedded autonomy stacks",
        "Implement or prototype core autonomy modules using modern robotics middleware and APIs (pub/sub, real-time-ish constraints)",
        "Apply planning + control concepts used in AVs (trajectory generation, MPC-style thinking, constraint handling)",
        "Evaluate system performance using real metrics: latency, throughput, safety envelopes, failure modes, and robustness",
        "Use simulation and test pipelines to validate autonomy behavior before deployment (scenario testing, regression, logging)"
      ],
  
      topics: [
        "History of unmanned/autonomous vehicles and modern ADAS → AV evolution",
        "Autonomy taxonomy and standards: SAE levels, ODD, fallback/MRC concepts",
        "AV system design: compute platform, software architecture, and real-time constraints",
        "Sensing and calibration: time sync, extrinsics, and sensor health monitoring",
        "Perception & sensor fusion: detection/tracking, occupancy representations, and uncertainty",
        "Localization & mapping: GNSS/IMU fusion, map-based localization, drift and recovery",
        "Prediction, planning, and control: behavior planning, trajectory optimization, MPC-style control",
        "Safety & validation: simulation, scenario coverage, logging/replay, and operational monitoring"
      ],
  
      careerRelevance:
        "EE 180 maps directly to embedded autonomy roles (Autonomy/Robotics Engineer, Embedded Perception/Planning Engineer, ADAS Engineer, Validation/Simulation Engineer). It builds the “systems glue” skill: integrating sensors, compute, and real-time software into a reliable pipeline—and understanding how standards (SAE levels) and safety constraints shape what you can actually ship. :contentReference[oaicite:1]{index=1}",
  
      realWorldApplications: [
        "Designing an embedded perception pipeline that meets latency budgets and degrades safely under sensor dropouts",
        "Building a planning + control loop that respects vehicle dynamics and produces smooth, trackable trajectories",
        "Scenario-based validation using simulation and log replay for regression testing",
        "Deploying modular autonomy stacks (Autoware/Apollo-style) and understanding how modules interact in production",
        "Operational safety: monitoring, fallback behaviors, and constraints tied to the vehicle’s ODD"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLb2zgvIwtM-5JxKqS9_3CpZX2_7Uj8jG6", // Waabi CVPR 2024 Tutorial (perception → planning → control)
          "https://www.youtube.com/watch?v=avbwgAsjAn8", // CMU 16-745 Optimal Control (2025) — MPC for autonomous driving
          "https://www.youtube.com/watch?v=D0QE0fs_igE", // Autoware Open AD Kit Blueprint (containerized autonomy stack deployment)
          "https://www.youtube.com/watch?v=TRz4HEyDSCY", // Waabi CVPR 2024 Session: Perception (deep dive)
          "https://www.youtube.com/watch?v=TOgVngDl0BE"  // Tier IV talk: SOAFEE-based SDV + Autoware Open AD Kit (modern SDV stack)
        ],
        websites: [
          "https://ee.ucmerced.edu/courses", // UC Merced EE course list (includes EE 180) :contentReference[oaicite:2]{index=2}
          "https://www.sae.org/news/blog/sae-levels-driving-automation-clarity-refinements", // SAE levels overview/refinements :contentReference[oaicite:3]{index=3}
          "https://www.nhtsa.gov/vehicle-manufacturers/automated-driving-systems", // NHTSA ADS guidance context :contentReference[oaicite:4]{index=4}
          "https://autoware.org/autoware-overview/", // Autoware modular autonomy stack overview :contentReference[oaicite:5]{index=5}
          "https://github.com/ApolloAuto/apollo" // Apollo open AV stack (modules + repo) :contentReference[oaicite:6]{index=6}
        ],
        tools: [
          "ROS 2 (DDS pub/sub) + bagging/log replay",
          "Simulation: CARLA or similar scenario simulators + scripted regression tests",
          "Autonomy stacks: Autoware (modular AV) and/or Apollo (full-stack reference)",
          "Perception toolchain: OpenCV + point cloud tooling (PCL-style) + GPU acceleration where available",
          "Planning/control prototyping: Python/NumPy + optimization tools; C++ for real-time modules",
          "On-vehicle interfaces: CAN basics + time sync (PTP/NTP concepts) for sensor alignment",
          "Containers & deployment (Docker/OCI) for reproducible autonomy pipelines (Open AD Kit-style)"
        ]
      },
  
      additionalNotes:
        "A strong ‘embedded autonomy’ portfolio artifact is a mini-stack demo: sensor playback (recorded bag/log) → perception outputs → simple planner → controller in simulation, with measured latency, failure cases, and a regression test suite."
    }
  },
  {
    id: "embedded-eecs-270",
    code: "EECS 270",
    name: "Robot Algorithms",
    fullName: "EECS 270: Robot Algorithms",
    description: "Robotics systems",
    tier: 3,
    expandedInfo: {
      credits: 4,
  
      prerequisites:
        "Permission of instructor required (recommended background: data structures/algorithms, probability, linear algebra, and systems-level programming in C++/Python).",
  
      learningOutcomes: [
        "Apply probabilistic reasoning to core robotics problems under uncertainty (sensing, motion, and estimation)",
        "Design and implement sensor fusion pipelines (e.g., Kalman/particle filtering patterns) suitable for real robot stacks",
        "Build localization and mapping workflows that work with noisy sensors and imperfect models",
        "Understand and implement fundamental planning approaches (graph search and sampling-based motion planning)",
        "Model robot decision-making at the task/mission level and reason about trade-offs (safety, robustness, compute)",
        "Evaluate robotics algorithms empirically: accuracy, latency, failure modes, and resource constraints",
        "Ship a semester-long project that integrates multiple modules into a working robotics system"
      ],
  
      topics: [
        "Probabilistic robotics foundations: beliefs, Bayes filters, uncertainty modeling",
        "Sensor fusion: Kalman filter family (EKF/UKF intuition) and particle filters",
        "Localization: dead reckoning vs probabilistic localization; global vs local methods",
        "Mapping & SLAM: building maps while localizing; pose-graph intuition and optimization mindset",
        "Motion planning: graph search (A*/D*/variants) and sampling-based planning (PRM/RRT-style)",
        "Mission/task planning: sequencing actions under constraints; robustness to partial observability",
        "Systems integration: real robot data, timing/latency considerations, and evaluation methodologies"
      ],
  
      careerRelevance:
        "EECS 270 is directly relevant to embedded robotics and autonomy roles because it teaches the algorithms that sit between hardware and behavior: turning noisy sensors into state, and state into safe actions. This maps to jobs like Robotics Software Engineer, Embedded Autonomy Engineer, Perception/Localization Engineer, and Simulation/Validation Engineer—where the day-to-day work is fusing sensors, handling uncertainty, and making planning decisions under real-time constraints.",
  
      realWorldApplications: [
        "Implementing localization on a mobile robot using IMU + wheel odometry + GPS/camera/LiDAR fusion",
        "Building a SLAM pipeline for indoor mapping and navigation (warehouses, labs, hospitals)",
        "Designing a navigation stack: global planning + local planning + obstacle avoidance under latency constraints",
        "Mission planning for fleets (waypoint routing, coverage, delivery tasks) with fallbacks and safety constraints",
        "Benchmarking autonomy: log replay, regression tests, and metrics-driven tuning (accuracy vs compute vs power)"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/playlist?list=PLbFJ6h6jR-3cXvP6b0o4gQ4FQm3G0qk9q", // MIT 6.4210 Robotics: Science and Systems (2023) lectures (planning/estimation/robotics algorithms)
          "https://www.youtube.com/playlist?list=PLZ_sI4f41TGtsqgT6cMLCUCYOT7mCjBMM", // SLAM for Robotics (2023 class) playlist (mapping/localization pipeline)
          "https://www.youtube.com/playlist?list=PLsT3MNDma2r4-qX3VUKcHwzrNVuvZufCR", // Motion Planning Lectures (2024) playlist
          "https://www.youtube.com/playlist?list=PLxfeWrsxWTZnodV7xGc8Ia9s1GpC92fBM"  // Robot Motion Planning and Control (2024) playlist
        ],
        websites: [
          "https://robohub.org/wp-content/uploads/2023/08/SVR_Guide_to_Robotics_Research_and_Education.pdf", // UC Merced robotics education guide mentioning EECS 270 scope
          "https://openslam.org/", // SLAM algorithms + references hub
          "https://navigation.ros.org/", // ROS 2 Navigation (Nav2) stack docs (planning + localization integration)
          "https://google-cartographer.readthedocs.io/", // Cartographer (SLAM) docs
          "https://moveit.ros.org/", // MoveIt (planning/manipulation) ecosystem
          "https://ceres-solver.org/" // Ceres Solver (optimization used in SLAM/pose-graph problems)
        ],
        tools: [
          "ROS 2 + Nav2 (robot navigation integration: localization + planning + control)",
          "Gazebo / Ignition + RViz (simulation + visualization for debugging robotics algorithms)",
          "SLAM tooling (Cartographer / slam_toolbox) for mapping experiments",
          "Optimization libraries (Ceres / g2o-style pose graph optimization patterns)",
          "Core numerics (Eigen) + geometry helpers + log replay workflows (rosbag)",
          "Profiling/measurement (latency tracing, CPU profiling) to make algorithms real-time-capable"
        ]
      },
  
      additionalNotes:
        "This course is most valuable if your semester project is systems-shaped: pick a robot/sim, then integrate (1) state estimation, (2) mapping/localization, and (3) planning. Treat it like production: logs, metrics, failure cases, and a short report on what broke and how you fixed it."
    }
  },
  {
    id: "embedded-eecs-283",
    code: "EECS 283",
    name: "IoT & Sensing Systems",
    fullName: "EECS 283: Advanced Topics in Internet of Things and Sensing Systems",
    description: "Large IoT deployments",
    tier: 3,
    expandedInfo: {
      credits: 4,
  
      prerequisites:
        "Varies by offering (advanced topics). Recommended background: embedded systems + networking fundamentals, basic signal processing / ML for sensor data, and comfort reading research papers. Often requires instructor approval.",
  
      learningOutcomes: [
        "Design end-to-end IoT sensing systems: device → gateway/edge → cloud → analytics → actions",
        "Make architecture decisions for large deployments (connectivity, protocol choice, buffering, time sync, failure handling)",
        "Engineer reliable fleet operations: secure onboarding, identity, configuration management, and OTA updates",
        "Build sensing pipelines that remain accurate in real deployments (noise, drift, missing data, distribution shift)",
        "Apply cross-modal sensing and sensor fusion thinking to improve robustness and reduce labeling/maintenance cost",
        "Measure system performance using real metrics: latency, availability, energy, bandwidth, and data quality",
        "Critically evaluate current IoT research and translate ideas into deployable designs"
      ],
  
      topics: [
        "IoT architectures at scale: device fleets, gateways/edge compute, cloud ingestion and stream processing",
        "Connectivity + protocols: MQTT/CoAP/HTTP; constrained networking; buffering/backpressure; time synchronization",
        "Sensing systems: sampling/quantization, calibration, sensor placement, and data-quality metrics",
        "Robust inference in the wild: drift, confounders, and distribution shifts in sensing data",
        "Security + ops: device identity/provisioning, certificate rotation, secure telemetry, least privilege",
        "Fleet management: configuration, rollout strategies, OTA updates, staged deployments, and rollback",
        "Evaluation & validation: observability, logging/replay, A/B testing for models, and failure-mode analysis"
      ],
  
      careerRelevance:
        "EECS 283 is a direct fit for embedded/IoT infrastructure roles where the hard part is not ‘a device that works once,’ but a fleet that operates for years. "
        + "It maps to **IoT Platform Engineer**, **Embedded Systems Engineer (connected devices)**, **Edge/Robotics Systems Engineer**, **Reliability/SRE for device fleets**, and **Applied ML for sensing**—because it forces you to think about protocols, deployment constraints, sensor-data quality, and real-world drift all at once.",
  
      realWorldApplications: [
        "Designing a secure device onboarding pipeline (provisioning, certs/keys, identity, policy)",
        "Operating OTA updates safely across thousands of devices (rings/canaries, rollout metrics, rollback)",
        "Building an edge gateway that can survive disconnects while preserving data integrity",
        "Deploying sensing at scale (buildings, factories, campuses) and keeping accuracy stable as conditions change",
        "Creating data-quality and drift monitors that trigger re-calibration or model retraining workflows",
        "Integrating heterogeneous sensors (infrastructure + mobile) to reduce blind spots and improve robustness"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=qAoKQfrkMgc",  // AWS IoT Core device provisioning options (fleet onboarding)
          "https://www.youtube.com/watch?v=gxODyzvWSYs",  // Azure Device Update for IoT Hub (OTA updates at scale)
          "https://www.youtube.com/watch?v=tLpk7SIxcGc",  // EdgeX Foundry: building an edge/IoT solution (open edge stack)
          "https://www.youtube.com/watch?v=1Q2VrxZV-LQ",  // Updating Azure IoT Edge modules without disruption (ops workflow)
          "https://www.youtube.com/watch?v=WPiV0YArKQ4"   // LoRaWAN security deep dive (large-area sensing deployments)
        ],
        websites: [
          "https://conferences.computer.org/iotDI/2023/",                 // IoTDI conference (IoT design + implementation research)
          "https://dl.acm.org/doi/proceedings/10.1145/3576842",          // IoTDI proceedings example (paper discovery)
          "https://www.edgexfoundry.org/",                               // EdgeX Foundry (vendor-neutral edge framework)
          "https://learn.microsoft.com/en-us/azure/iot-hub-device-update/", // Azure Device Update docs (OTA + fleet ops)
          "https://arm-software.github.io/CMSIS-DSP/main/"               // Embedded DSP primitives for sensing pipelines
        ],
        tools: [
          "MQTT + device SDKs (telemetry + command channels) and CoAP for constrained devices",
          "Device provisioning systems (certificate-based identity, enrollment/DPS patterns)",
          "OTA + rollout tooling (rings/canaries, staged deployments, rollback)",
          "Edge frameworks (EdgeX Foundry) + containerized gateways",
          "Time-series + observability (metrics/logs/traces) for fleet health and data quality",
          "Embedded sensing stack: CMSIS-DSP / fixed-point pipelines + on-device feature extraction",
          "Security tooling: PKI basics, cert rotation, secure boot/attestation concepts (platform-dependent)"
        ]
      },
  
      additionalNotes:
        "If you want this to read as ‘large IoT deployments’, your best project framing is: **fleet onboarding + telemetry ingestion + drift monitoring + OTA updates**. "
        + "Ship a demo where devices keep working through disconnects, updates roll out safely, and you can prove data quality with metrics (not vibes)."
    }
  },
  {
    id: "embedded-cse-178",
    code: "CSE 178",
    name: "Security",
    fullName: "CSE 178: Computers and Networks Security",
    description: "Secure embedded devices",
    tier: 3,
    expandedInfo: {
      credits: 4,
  
      prerequisites: "CSE 031, CSE 100, CSE 150, and MATH 024.",
  
      learningOutcomes: [
        "Understand core security goals (confidentiality, integrity, availability) and how they apply to embedded/IoT devices",
        "Apply cryptography correctly in systems: symmetric/asymmetric crypto, key exchange, signatures, hashing, and common failure modes",
        "Design authentication and authorization for devices and services (device identity, provisioning, least privilege)",
        "Secure data-in-transit and device interfaces (TLS basics, secure protocols, API hardening, exposed services reduction)",
        "Recognize and mitigate common attacks: memory corruption, malware/worms, credential abuse, insecure defaults, and network attacks",
        "Implement secure update and trust foundations (signed firmware, rollback protection, secure boot concepts)",
        "Use practical security testing techniques (threat modeling + basic pentest workflows) to find and fix vulnerabilities"
      ],
  
      topics: [
        "Threats and attack surfaces in computers and networks",
        "Secret-key and public-key cryptography; hashing, MACs, key exchange",
        "Digital signatures, authentication, and Public-Key Infrastructure (PKI)",
        "Secure communication and common protocols (e.g., TLS/secure channels) and their pitfalls",
        "Malware: viruses and worms; propagation and defenses",
        "Embedded/IoT extensions: secure boot chain, signed firmware updates, device identity & provisioning",
        "Hands-on security analysis: traffic inspection, vulnerability discovery, and basic exploit/mitigation mindset"
      ],
  
      careerRelevance:
        "CSE 178 is directly relevant for embedded and IoT engineers because security is a product requirement: devices ship into hostile networks, run unattended for years, and must be updateable without becoming bricked or compromised. It maps well to roles like Embedded Security Engineer, IoT/Device Security Engineer, Product Security Engineer, and firmware-focused Red Team/Blue Team work—especially where crypto, device identity, firmware updates, and network exposure are central.",
  
      realWorldApplications: [
        "Designing device onboarding/provisioning (certs/keys), secure comms, and least-privilege permissions",
        "Building signed firmware update pipelines with rollback protection and operational safety checks",
        "Hardening devices by reducing exposed services and securing management/debug interfaces",
        "Finding vulnerabilities in firmware and device ecosystems (web/mobile APIs, cloud backends, local services)",
        "Creating security baselines/checklists for device capabilities and compliance expectations"
      ],
  
      resources: {
        videos: [
          "https://www.youtube.com/watch?v=TkFC4Q2BwCM", // Arm: Develop Secure Cortex-M Applications with TrustZone (TEE basics)
          "https://www.youtube.com/watch?v=Hwb3caA4ftI", // wolfSSL (2024): Secure & Reliable Firmware Updates (signed updates / rollback concepts)
          "https://www.youtube.com/watch?v=4Rl2fNjVcr4", // OWASP: IoT Security Testing Guide (ISTG) overview
          "https://www.youtube.com/watch?v=WbJuE5JzsmU"  // Embedded Linux Security intro (practical device-hardening mindset)
        ],
        websites: [
          "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68588", // UC Merced CSE 178 official catalog entry
          "https://csrc.nist.gov/pubs/ir/8259/a/final", // NISTIR 8259A IoT device cybersecurity capability baseline (device-side expectations)
          "https://www.etsi.org/deliver/etsi_en/303600_303699/303645/03.01.03_60/en_303645v030103p.pdf", // ETSI EN 303 645 (2024) IoT security baseline
          "https://owasp.org/www-project-internet-of-things/", // OWASP IoT project (testing + governance resources)
          "https://www.psacertified.org/development-resources/psa-certified-foundational-training-course/" // PSA Certified foundational training (embedded security mindset)
        ],
        tools: [
          "Wireshark (network traffic inspection for device comms)",
          "Nmap (service discovery / exposed-surface auditing)",
          "Burp Suite (testing device ecosystem interfaces: APIs / web UIs)",
          "Ghidra + Binwalk (firmware reverse engineering and filesystem extraction)",
          "OpenOCD/JTAG/SWD tools (debug-interface awareness and secure configuration testing)",
          "SBOM + dependency scanning (e.g., Syft/Grype) for ‘outdated component’ risk reduction",
          "Secure update tooling patterns (code signing, key management, rollback protection concepts)"
        ]
      },
  
      additionalNotes:
        "If you want this to be maximally ‘secure embedded devices’: build a mini device-lab (real board or emulator) where you (1) sniff traffic, (2) identify exposed services, (3) verify update/signing behavior, and (4) write a short threat model + hardening checklist aligned with NIST/ETSI baselines."
    }
  },
];


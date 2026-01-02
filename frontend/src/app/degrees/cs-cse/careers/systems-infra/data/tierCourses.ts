/**
 * Systems / Infrastructure Engineering Tier Courses Data
 * Course recommendations organized by tier for Systems / Infrastructure Engineering career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: NON-NEGOTIABLE CORE (SYSTEMS ENGINEERING)
 * If a student does not take most of these, they are not systems-ready.
 */
export const tier1Courses: TierCourse[] = [
 {
 id: "systems-cse-150",
 code: "CSE 150",
 name: "Operating Systems",
 fullName: "CSE 150: Operating Systems",
description:
 "Core systems course covering processes, memory management, and concurrency essential for infrastructure engineering",
tier: 1,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand how modern operating systems manage hardware resources",
    "Implement and reason about process creation, scheduling, and interprocess communication",
    "Analyze memory management strategies including virtual memory, paging, and allocation",
    "Design solutions that handle concurrency and synchronization correctly",
    "Identify trade-offs in file systems, I/O subsystems, and protection mechanisms",
 ],
 topics: [
    "Process lifecycle: creation, scheduling, context switching",
    "Concurrency primitives and synchronization (mutexes, semaphores, RCU and other patterns)",
    "Memory management: virtual memory, paging, allocation",
    "File systems and I/O abstraction",
    "Kernel architecture, system calls, and performance considerations",
    "Resource allocation, deadlocks, and protection mechanisms",
 ],
 careerRelevance:
  "Operating systems courses lay the foundation for any systems or infrastructure engineering role — from cloud engineers to site reliability engineers. Knowledge of OS design and mechanics helps you diagnose and optimize performance, understand virtualization containers, manage multi-tenant environments, and build reliable low-level software that interacts with both hardware and distributed services.",

 realWorldApplications: [
    "Tuning server performance through understanding of scheduling and memory subsystems",
    "Debugging and optimizing infrastructure services that run across multiple processes",
    "Designing systems that safely manage concurrency and shared state",
    "Implementing custom OS features in kernels or microservices infrastructure",
    "Understanding virtualization/container layers (Docker, Kubernetes runtime) through OS principles",
 ],
 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PLfciLKR3SgqNJKKIKUliWoNBBH1VHL3AP", // MIT 6.828 Operating System Engineering
        "https://www.youtube.com/playlist?list=PLF2K2xZjNEf97A_uBCwEl61sdxWVP7VWC", // UC Berkeley CS 162 Operating Systems
        "https://video.ucdavis.edu/channel/ECS%2B150%2B-%2BOperating%2BSystems%2Band%2BSystems%2BProgramming/324050132", // UC Davis ECS 150 (full recorded lectures)
        "https://www.youtube.com/playlist?list=PLUl4u3cNGP62K2DjQLRxDNRi0z2IRWnNh" // MIT 6.858 (security-adjacent systems thinking; great complement)
      ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67530", // UC Merced OS course
 ],
    tools: [
      "Linux (Ubuntu/CentOS)", // Practical OS exploration
      "GDB / strace / perf", // Debugging & performance analysis
      "VirtualBox / QEMU", // OS experimentation
      "C / C++", // Systems programming languages
 ],
 },
 additionalNotes:
  "Operating systems courses often also cover kernel interfaces, system calls, and practical labs where you build or modify components of an OS kernel — directly supporting roles in systems, cloud, and infrastructure engineering.",
 },
 },
 {
 id: "systems-cse-160",
 code: "CSE 160",
 name: "Computer Networks",
 fullName: "CSE 160: Computer Networks",
 description:
 "Essential networking fundamentals covering TCP/IP, routing, and real-world infrastructure protocols",
 tier: 1,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand the layered architecture of network protocols (TCP/IP, OSI models)",
    "Analyze routing and addressing mechanisms within and between networks",
    "Explain transport protocols (TCP/UDP) and their trade-offs",
    "Design networked systems that reliably communicate across diverse environments",
    "Implement basic networking clients and servers using sockets APIs",
 ],
 topics: [
    "OSI and TCP/IP model layering and abstraction",
    "Link, network, and transport layers — Ethernet, IP addressing, TCP/UDP behaviors (flow & congestion control)",
    "Routing fundamentals and algorithms (e.g., OSPF principles)",
    "Network performance: throughput, latency, congestion, reliability",
    "Protocol behavior in real infrastructure (DNS, HTTP, TLS)",
    "Sockets programming and basic network security",
 ],
 careerRelevance:
  "Computer networks courses provide the foundational knowledge required for infrastructure engineering roles such as network engineer, cloud engineer, SRE, and backend systems architect. Understanding how data is routed, how protocols behave under load, and how networks scale is essential for designing robust, high-performance distributed systems.",

 realWorldApplications: [
    "Designing and troubleshooting corporate or cloud network architectures",
    "Optimizing distributed services for latency and reliability",
    "Implementing load balancing, firewalls, and secure transport protocols",
    "Configuring routers, switches, and virtual networks in cloud providers",
    "Building custom services that communicate efficiently over IPv4/IPv6",
 ],
 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PLvFG2xYBrYAQCyz4Wx3NPoYJOFjvU7g2Z", // Stanford CS144: Intro to Computer Networking
        "https://www.youtube.com/playlist?list=PLEAYkSg4uSQ2NMmzNNsEK5RVbhxqx0BZF", // NPTEL (IIT Kharagpur): Computer Networks and Internet Protocols
        "https://www.youtube.com/playlist?list=PLAwxTw4SYaPn21MqCiFq2r0FSjk9l6cW2", // Georgia Tech: Computer Networking (Part 1 of 3)
        "https://www.youtube.com/playlist?list=PLpherdrLyny-zJw95jcE-uJkcsIAG1MEn"  // Prof. Nick Feamster: Computer Networking supplemental videos
      ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67531", // UC Merced Networks course
      "https://en.wikipedia.org/wiki/Computer_network", // Networking basics
 ],
    tools: [
      "Wireshark", // Packet analysis
      "Cisco Packet Tracer", // Networking simulation
      "Linux networking stack", // Real environment testing
      "Bash / sockets API", // Programming networking applications
 ],
 },
 additionalNotes:
  "Computer networking courses often include hands-on labs and simulations where students configure real or virtual networks, troubleshoot issues, and understand protocols’ behavior under different conditions — directly applicable to real infrastructure work.",
 },
 },
 {
 id: "systems-cse-168",
 code: "CSE 168",
 name: "Distributed Software Systems",
 fullName: "CSE 168: Distributed Software Systems",
 description:
 "Critical course on scalability, fault tolerance, and building distributed systems at scale",
 tier: 1,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand core principles behind distributed system architecture, design, and implementation",
    "Analyze trade-offs between consistency, availability, and partition tolerance",
    "Design systems that scale horizontally and tolerate partial failures",
    "Implement and evaluate distributed services with replication, partitioning, and fault-tolerance strategies",
    "Apply distributed communication paradigms such as RPCs, messaging, and consensus protocols",
    "Integrate cloud and big-data concepts with distributed software design",
 ],

 topics: [
    "Distributed system fundamentals: definition, challenges, and design goals",
    "Scalability and horizontal scaling principles",
    "Consistency models, replication, and partitioning strategies",
    "Fault tolerance, high availability, and recovery mechanisms",
    "Communication models (RPC, messaging, streaming)",
    "Distributed storage systems, indexing, and data partitioning",
 ],

 careerRelevance:
  "Distributed Software Systems is one of the most important courses for systems/infrastructure careers — from distributed systems engineers, cloud architects, and site reliability engineers to developers of large-scale backend services. It equips students with the ability to build and reason about services that run across many machines, handle failures gracefully, and scale with load. Companies building distributed services — from cloud platforms to real-time data pipelines — rely on the concepts taught in this class.",

 realWorldApplications: [
    "Designing scalable microservice architectures that can handle millions of requests per second",
    "Building fault-tolerant systems using replication and consensus to ensure uptime",
    "Implementing distributed storage and caching systems with partitioning and replication",
    "Using remote procedure calls (RPC) and messaging frameworks in large-scale services",
    "Leveraging cloud platforms (e.g., Kubernetes, AWS/Azure) for distributed deployments",
    "Optimizing distributed data flows for big data and real-time processing",
 ],

 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB", // MIT 6.824 Distributed Systems (full lecture series)
        "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", // Martin Kleppmann (Cambridge) Distributed Systems lecture series
        "https://www.youtube.com/playlist?list=PLNPUF5QyWU8PydLG2cIJrCvnn5I_exhYx", // UC Santa Cruz CSE138 Distributed Systems (Lindsey Kuper)
        "https://www.youtube.com/playlist?list=PLH5XTBxCO2hzgww9p5sew30lx3ngJsxcB", // UNC COMP 533 Distributed Systems (Prasun Dewan)
        "https://www.youtube.com/c/DistributedSystemsCourse/playlists"              // DistributedSystemsCourse (extra practice-oriented DS playlists)
    ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69743", // Official distributed systems course page
      "https://en.wikipedia.org/wiki/Distributed_computing", // Distributed computing fundamentals
      "https://en.wikipedia.org/wiki/Consistency_model", // Consistency models overview
    ],
    tools: [
      "Apache Kafka", // Messaging & streaming for distributed workloads
      "gRPC / REST APIs", // RPC frameworks for cross-service communication
      "Docker & Kubernetes", // Container orchestration for distributed deployments
      "ZooKeeper / etcd", // Coordination and config management services
      "Distributed storage (Cassandra, HDFS)", // Scalable data stores
 ],
 },

 additionalNotes:
  "According to the UC Merced catalog, CSE 168 covers the foundations of distributed software systems — including consistency, availability, scalability, and core programming models — all of which are central to modern cloud and backend infrastructure engineering.",
 },
 },
 {
 id: "systems-cse-140",
 code: "CSE 140",
 name: "Computer Architecture",
 fullName: "CSE 140: Computer Architecture",
 description:
 "Understanding the hardware-software interface critical for systems optimization",
 tier: 1,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand how modern CPUs are structured, including registers, ALUs, caches, and pipelines",
    "Analyze how instruction sets, memory hierarchy, and interconnects affect system performance",
    "Relate software behavior to hardware performance characteristics (e.g., cache hits/misses, branch prediction)",
    "Evaluate trade-offs in architectural design decisions such as pipelining and memory hierarchy",
    "Optimize code and systems by leveraging knowledge of hardware bottlenecks",
    "Apply architecture concepts to real-world performance tuning and system design",
 ],

 topics: [
    "Processor fundamentals: instruction set architecture and datapaths",
    "Memory systems including caches, main memory, and virtual memory",
    "Registers, control logic, and arithmetic logic units (ALUs)",
    "Performance metrics and bottlenecks",
    "Pipelining, hazards, and branch prediction",
    "Hardware-software co-design and optimization",
 ],

 careerRelevance:
  "Computer Architecture is essential for infrastructure and systems roles because it gives you the *hardware context* for software performance. Systems engineers, performance engineers, and cloud infrastructure developers frequently need to reason about how applications interact with hardware — from CPU pipeline effects to caching behavior — in order to tune throughput, latency, and resource use in servers, embedded systems, and distributed environments. Understanding architecture helps you optimize everything from compilers to runtime systems.",

 realWorldApplications: [
    "Profiling and tuning high-performance servers by reducing cache misses and pipeline stalls",
    "Optimizing system and database engines by exploiting memory hierarchies",
    "Designing efficient virtualization and container runtimes that map to hardware features",
    "Improving runtime behavior of distributed applications through hardware-conscious scheduling",
    "Collaborating with hardware teams to understand firmware and microarchitecture constraints",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=O5nskjZ_GoI", // Computer architecture overview
      "https://www.youtube.com/watch?v=UbxVbJ6Q0qg", // Memory and caching explained
      "https://www.youtube.com/watch?v=0QEWsrYIjH8", // Pipeline and performance basics
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67529", // Official UC Merced course description
      "https://en.wikipedia.org/wiki/Computer_architecture", // Architecture fundamentals
      "https://en.wikipedia.org/wiki/Memory_hierarchy", // Memory system overview
 ],
    tools: [
      "Gem5 / SimpleScalar", // Architecture simulation & performance modeling
      "Perf / VTune", // Linux profiling & hardware counters
      "Simulators (RISC-V, QEMU)", // Simulate real instruction sets
      "Assembly language (MIPS/RISC-V)", // Hands-on instruction execution
 ],
 },

 additionalNotes:
  "According to the UC Merced catalog, CSE 140 covers fundamental concepts of digital computer design, including instruction sets, memory systems, and register logic — knowledge that is directly applicable when optimizing systems and infrastructure software at scale.",
 },
 },
 {
 id: "systems-cse-179",
 code: "CSE 179",
 name: "Parallel Computing",
 fullName: "CSE 179: Parallel Computing",
 description:
 "Essential for performance optimization and multithreading in modern systems",
 tier: 1,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand the principles and models of parallel computation — from shared memory to distributed memory approaches",
    "Analyze parallel architectures and performance bottlenecks",
    "Design and implement parallel programs using standard paradigms",
    "Evaluate parallel speedup, efficiency, and scalability",
    "Apply synchronization, task decomposition, and communication strategies effectively",
    "Relate parallel techniques to real systems like multicore CPUs, GPUs, and data-center clusters",
 ],

 topics: [
    "Parallel architectures, multithreading, and distributed memory models",
    "Task and data parallelism, workloads decomposition",
    "Synchronization primitives and concurrency control",
    "Performance measures: speedup, efficiency, and scalability",
    "Communication overhead, load balancing, and work stealing",
    "Parallel programming techniques (threads, OpenMP, MPI) and GPU acceleration",
 ],

 careerRelevance:
  "Parallel Computing equips systems engineers and infrastructure developers with the skills to optimize performance in multi-core and distributed environments — a necessity in cloud computing, high-performance backends, and modern OS runtimes. Understanding how to exploit parallelism and avoid contention is central to building responsive, scalable, and efficient systems.",

 realWorldApplications: [
    "Accelerating server workloads and backend services using multithreading",
    "Tuning performance of parallel pipelines in distributed systems and big data stacks",
    "Leveraging GPU and multicore architectures for computation-intensive tasks",
    "Designing concurrent data structures for scalable infrastructures",
    "Evaluating performance trade-offs in cloud and edge computing environments",
 ],

 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PLoROMvodv4rMp7MTFr4hQsDEcX7Bx6Odp", // Stanford CS149: Parallel Computing (multicore + GPU + performance)
        "https://www.youtube.com/playlist?list=PLMDSb3PWPnvivPLXHM9SlZLljrO9unIAW", // CMU 15-418/618: Parallel Computer Architecture & Programming
        "https://www.youtube.com/playlist?list=PLjzjdo8qdH01OxjkI2BdtZ8TUfUMMrxvS", // NPTEL: Parallel Programming in OpenMP (shared-memory parallelism)
        "https://www.youtube.com/playlist?list=PLUl4u3cNGP63VIBQVWguXxZZi0566y7Wf", // MIT 6.172: Performance Engineering (parallelism + low-level optimization mindset)
        "https://www.youtube.com/playlist?list=PLzn6LN6WhlN06hIOA_ge6SrgdeSiuf9Tb"  // Heterogeneous Parallel Programming (CUDA/GPU parallelism course videos)
      ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68889", // Official UC Merced course info
      "https://en.wikipedia.org/wiki/Data_parallelism", // Data parallelism & workload distribution
 ],
    tools: [
      "OpenMP", // Shared memory parallel programming
      "MPI", // Distributed memory programming
      "CUDA / GPU frameworks", // GPU-based parallelism
      "Thread libraries (pthreads)", // Multithreading
 ],
 },

 additionalNotes:
  "According to UC Merced’s catalog, CSE 179 introduces the foundations of parallel computing — including architectures, programming methods, and how to analyze parallel algorithms. Mastery of these concepts is critical for performance-oriented system and infrastructure engineers.",
 },
 },
 {
 id: "systems-cse-031",
 code: "CSE 031",
 name: "Computer Organization & Assembly",
 fullName: "CSE 031: Computer Organization & Assembly",
 description:
 "Low-level execution understanding essential for systems engineering",
 tier: 1,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand how high-level programs are translated into machine instructions",
    "Describe how data is represented and manipulated at the hardware level",
    "Write and debug simple assembly programs to explore low-level behavior",
    "Reason about how memory architecture (caches, registers) impacts performance",
    "Investigate processor state transitions and control logic",
    "Connect software semantics to hardware execution patterns",
 ],

 topics: [
    "Data representation and binary arithmetic",
    "Instruction set architecture (ISA) fundamentals",
    "Assembly language programming and control flow",
    "Memory layout, addressing modes, and pointer behavior",
    "Interaction between compiler, assembler, and hardware",
    "CPU cycles, interrupts, and basic microarchitecture insights",
 ],

 careerRelevance:
  "Computer Organization & Assembly is foundational for systems and infrastructure engineering because it explains *how software really executes* on hardware. Whether optimizing compilers, building runtime systems, or tuning performance-critical services, engineers benefit from understanding the low-level details of instruction execution and memory behavior.",

 realWorldApplications: [
    "Optimizing system-level software that interfaces directly with hardware",
    "Diagnosing performance issues at instruction and memory access levels",
    "Writing efficient firmware or embedded systems code",
    "Understanding the impact of hardware behavior on virtualization, OS schedulers, and JIT compilers",
    "Debugging low-level faults (e.g., race conditions, segmentation faults) with assembly insight",
 ],

 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PLhMnuBfGeCDM8pXLpqib90mDFJI-e1lpk", // UC Berkeley CS61C: Great Ideas in Computer Architecture (machine structures + low-level)
        "https://www.youtube.com/playlist?list=PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2", // MIT 6.004: Computation Structures (architecture + assembly/RISC-V + memory)
        "https://www.youtube.com/playlist?list=PLNMIACtpT9BfztU0P92qlw8Gd4vxvvfT1", // Nand2Tetris Part 1 (build a computer stack from gates → machine language)
        "https://www.youtube.com/playlist?list=PLowKtXNTBypGqImE405J2565dvjafglHU", // Ben Eater: Build an 8-bit computer (how instructions/data move in hardware)
        "https://www.youtube.com/playlist?list=PLp_QNRIYljFqBuOYDFluT66Y7biUH1Dnc"  // Learn RISC-V Assembly (hands-on assembly fundamentals)
      ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67520", // UC Merced Computer Org course overview
      "https://en.wikipedia.org/wiki/Assembly_language", // Assembly language fundamentals
 ],
    tools: [
      "MIPS / RISC-V simulators", // Learn ISA & assembly
      "GDB", // Debugging machine-level code
      "Hex editors / objdump", // Inspect binary executables
 ],
 },

 additionalNotes:
  "CSE 031 introduces students to the fundamentals of computer organization and assembly programming — including how binary data is manipulated and how ISA translates logic into hardware actions. This knowledge is critical for efficient systems programming and performance engineering.",
 },
 },
];

/**
 * 🟢 TIER 2: SYSTEMS HARDWARE CORE (ELECTRICAL ENGINEERING)
 * This is what makes UCM systems engineers stand out.
 */
export const tier2Courses: TierCourse[] = [
 {
 id: "systems-eecs-240",
 code: "EECS 240",
 name: "Computer Architecture & Design",
 fullName: "EECS 240: Computer Architecture & Design",
 description:
 "Deep CPU and system design knowledge for advanced systems engineering,",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand advanced microarchitecture concepts such as pipelining, superscalar execution, and out-of-order execution",
    "Analyze instruction-level parallelism and its impact on performance",
    "Explore multicore and multiprocessor design principles",
    "Evaluate memory hierarchy design including caches, coherence protocols, and interconnects",
    "Connect architectural design choices to real-world system performance and energy trade-offs",
    "Apply hardware-software co-design thinking to optimize system performance",
 ],

 topics: [
    "Microarchitecture fundamentals: datapaths, control, and pipeline stages",
    "Instruction-level parallelism and advanced execution techniques",
    "Multicore and many-core systems",
    "Memory hierarchy design (caches, TLBs, and coherence)",
    "Interconnects, buses, and network-on-chip (NoC)",
    "Accelerators (GPUs/TPUs) and hardware specialization",
 ],

 careerRelevance:
  "EECS 240 provides deep insight into how modern processors are designed and optimized — knowledge that gives systems engineers, performance architects, firmware developers, and infrastructure specialists a significant edge. In large-scale systems, cloud engines, compiler toolchains, and operating systems, understanding microarchitecture helps optimize performance, power, and efficiency. Careers in hardware-aware systems design, performance engineering, and cloud platform optimization benefit greatly from this course. According to the UC Merced catalog, this course covers advanced aspects of microarchitecture, parallelism, and system design that go beyond basic architecture.",

 realWorldApplications: [
    "Designing performance-critical runtime systems tuned to specific microarchitecture features",
    "Collaborating with hardware teams when specifying performance requirements for new processors",
    "Optimizing compilers and low-level system libraries for cache and pipeline behavior",
    "Evaluating and benchmarking server and cloud hardware for workload placement",
    "Understanding accelerator (GPU/TPU) architectures to better utilize them in infrastructure",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=7I-JOd51ctA", // Advanced computer architecture overview
      "https://www.youtube.com/watch?v=o97-uBc2KjI", // Pipelining & ILP basics
      "https://www.youtube.com/watch?v=ev7z8fXktIA", // CPU vs GPU & parallelism (relevant design context)
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69812", // Official UC Merced course page (description)
      "https://en.wikipedia.org/wiki/Microarchitecture", // Microarchitecture fundamentals
      "https://en.wikipedia.org/wiki/Instruction-level_parallelism", // Instruction-level parallelism basics
 ],
    tools: [
      "Gem5", // Architecture simulator for design exploration
      "SimpleScalar", // Legacy microarchitecture simulation
      "Perf / VTune", // Hardware performance counters and profiling
      "RISC-V / Verilog", // Hardware design and instruction set experimentation
 ],
 },

 additionalNotes:
  "University course listings indicate that EECS 240 goes deeper than introductory architecture by covering advanced microarchitecture, parallelism, and multicore design, preparing students for high-performance computing and systems optimization roles that require understanding how hardware design impacts software performance.",
 },
 },

 {
 id: "systems-eecs-242",
 code: "EECS 242",
 name: "Advanced Computer Architecture",
 fullName: "EECS 242: Advanced Computer Architecture",
 description:
 "Performance engineering at the architectural level — advanced microarchitecture, optimizations, and system-level designs",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Analyze advanced microarchitecture features such as superscalar execution and out-of-order pipelines",
    "Evaluate memory hierarchy optimizations including cache coherence, multi-level caches, and interconnect design",
    "Understand multicore and many-core systems and how they support high-performance workloads",
    "Assess architectural trade-offs involving performance, power consumption, and cost",
    "Explore accelerators (e.g., GPUs, TPUs) and their role in modern systems performance",
    "Develop hardware-software co-design thinking to optimize systems across the stack",
 ],

 topics: [
    "Advanced microarchitecture: pipelining, hazard mitigation, and instruction-level parallelism",
    "Multicore and parallel processor design",
    "Memory consistency, caches, and coherence protocols",
    "Interconnects and network-on-chip designs for throughput and scalability",
    "Architectural support for virtualization and security",
    "Hardware accelerators and heterogeneous computing",
 ],

 careerRelevance:
  "EECS 242 delves deeper into how hardware design influences system performance and scalability — knowledge that’s invaluable for performance engineers, infrastructure architects, and systems programmers. In real-world systems work, understanding advanced architectural behaviors helps you optimize servers, cloud platforms, and high-performance computing stacks by anticipating how hardware will interact with software components. According to UC Merced’s catalog, this course explores performance, energy efficiency, and reliability in advanced architectural designs, preparing you for roles that require hardware-aware optimization.",

 realWorldApplications: [
    "Profiling and optimizing backend systems for cache utilization and throughput",
    "Designing system software that exploits multicore and accelerator hardware",
    "Evaluating performance vs. power trade-offs in cloud and edge computing infrastructure",
    "Collaborating with hardware teams to build features that support virtualization and security",
    "Improving compiler backends and runtime systems with hardware characteristics in mind",
 ],

 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PL5PHm2jkkXmi5CxxI7b3JCL1TWybTDtKq", // CMU 18-447 (Onur Mutlu) — microarchitecture, OoO, memory, coherence (full course)
        "https://www.youtube.com/playlist?list=PL5Q2soXY2Zi-LfDdGgWyLcTSqzm6a26wD", // ETH Zürich Computer Architecture (Onur Mutlu) — modern arch + memory-centric computing (full playlist)
        "https://www.youtube.com/playlist?list=PLS6iudSQ-kj5YIhnM1nXxXyfjPBmqRy8l", // Imperial College — Advanced Computer Architecture (Paul Kelly)
        "https://www.youtube.com/watch?v=VCScWh966u4",                              // David Patterson — “New Golden Age for Computer Architecture” (big-picture + modern trends)
        "https://www.youtube.com/playlist?list=PLwdnzlV3ogoWJhBxBYu-K4l-q-nNHd24D"  // Advanced Computer Architecture playlist (extra lectures: caches, OoO, coherence, perf eval)
      ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69757", // Official UC Merced course description
      "https://en.wikipedia.org/wiki/Microarchitecture", // Microarchitecture principles
      "https://en.wikipedia.org/wiki/Instruction-level_parallelism", // Instruction-level parallelism basics
 ],
    tools: [
      "Gem5", // Architecture simulation and performance experiments
      "SimpleScalar", // Microarchitecture simulation tools
      "Perf / VTune", // Hardware performance counters
      "RISC-V / Verilog", // Hardware design and simulation environments
      "Cachegrind / Valgrind", // Cache and memory behavior analysis
 ],
 },

 additionalNotes:
  "EECS 242 expands on foundational architecture concepts to explore performance, energy efficiency, and reliability in depth. This prepares students for advanced systems roles where architectural understanding directly influences software and infrastructure design.",
 },
 },
 {
 id: "systems-eecs-245",
 code: "EECS 245",
 name: "Parallel Computing",
 fullName: "EECS 245: Parallel Computing",
 description:
 "High-scale systems and parallel processing — advanced principles and techniques for scalable system design",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand advanced parallel computing principles including data and task parallelism across hardware and distributed environments",
    "Analyze performance characteristics and scalability trade-offs in parallel and multicore systems",
    "Design and implement parallel algorithms and systems that leverage shared memory and message-passing paradigms",
    "Evaluate communication patterns and synchronization mechanisms in high-performance environments",
    "Apply parallel computing models to optimize workloads on multicore CPUs, clusters, and accelerator-based architectures",
    "Integrate performance profiling and benchmarking into the design and tuning of large-scale parallel systems",
 ],

 topics: [
    "Parallel architectures, multicore and many-core systems",
    "Parallel programming models (shared memory, message passing, hybrid models)",
    "Synchronization, barriers, and communication cost analysis",
    "Parallel algorithm design and complexity analysis",
    "Work decomposition, load balancing, and scalability strategies",
    "Performance metrics, profiling, and tuning for high performance",
 ],

 careerRelevance:
  "EECS 245 focuses on advanced parallel computing concepts used in high-performance computing, cloud infrastructure, and large-scale data platforms. Modern systems — from data centers to AI training clusters — depend on parallelism both within processors and across distributed nodes. Mastery of parallel computing prepares you for roles such as High-Performance Systems Engineer, Cloud Infrastructure Developer, Performance Engineer, or Backend Architect, where you’ll optimize and scale computational workloads across hardware resources. According to parallel computing descriptions, this field studies both parallel architectures and programming techniques for performance and scalability.",

 realWorldApplications: [
    "Designing backend services that utilize parallelism to improve throughput and reduce latency",
    "Scaling data processing frameworks (e.g., Spark, MPI-based systems) over clusters",
    "Optimizing parallel workloads on multicore CPUs and GPUs for computationally intensive applications",
    "Benchmarking and tuning performance on distributed systems and HPC clusters",
    "Developing parallel algorithms for large-scale simulation, scientific computing, and analytics workloads",
 ],

 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PLoROMvodv4rMp7MTFr4hQsDEcX7Bx6Odp", // Stanford CS149: Parallel Computing (multicore + GPU + performance)
        "https://www.youtube.com/playlist?list=PLMDSb3PWPnvivPLXHM9SlZLljrO9unIAW", // CMU 15-418/618: Parallel Computer Architecture & Programming
        "https://www.youtube.com/playlist?list=PLUl4u3cNGP63VIBQVWguXxZZi0566y7Wf", // MIT 6.172: Performance Engineering (parallelism + low-level optimization mindset)
        "https://www.youtube.com/playlist?list=PL5XwKDZZlwaY7t0M5OLprpkJUIrF8Lc9j"  // GPU Programming (CUDA fundamentals + practical kernels)
      ],
    websites: [
      "https://en.wikipedia.org/wiki/Parallel_computing", // Field overview and core concepts
      "https://en.wikipedia.org/wiki/Message_Passing_Interface", // MPI as core communication for parallel systems
 ],
    tools: [
      "MPI (Message Passing Interface)", // Distributed memory parallel programming
      "OpenMP", // Shared memory parallelism
      "CUDA / GPU frameworks", // GPU-accelerated parallel computing
      "Perf / profiling suites", // Performance analysis tools
 ],
 },

 additionalNotes:
  "EECS 245 appears as a graduate-level Parallel Computing course in the UC Merced EECS catalog, supplementing foundational courses like CSE 179 (Intro to Parallel Computing) and focusing on performance, scalability, and advanced parallel design techniques.",
 },
 },
 {
 id: "systems-eecs-250",
 code: "EECS 250",
 name: "Advanced Computer Systems",
 fullName: "EECS 250: Advanced Computer Systems",
 description:
 "Deep dive into OS and infrastructure systems, exploring advanced system design, performance, and research themes.",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Analyze advanced system design beyond introductory OS and architecture layers.",
    "Understand interactions between OS, networking, storage, and distributed services.",
    "Evaluate cross-layer bottlenecks and optimize performance holistically.",
    "Explore current systems research problems and solutions.",
    "Integrate knowledge across OS, distributed systems, and infrastructure components.",
    "Critically read and discuss systems research literature.",
 ],

 topics: [
    "Advanced Operating System components and design patterns",
    "Scalable storage and I/O systems",
    "Infrastructure middleware and services",
    "Cross-layer performance analysis",
    "Fault tolerance and resiliency in systems",
    "Trends in cloud platforms and large-scale infrastructure",
 ],

 careerRelevance:
  "EECS 250 covers *advanced infrastructure and system design*, preparing students for roles like Backend Architect, Performance Engineer, Cloud Infrastructure Engineer, and Systems Researcher. Students engage with real-world problems in scalable systems and distributed infrastructure using both practical and research-driven perspectives.",

 realWorldApplications: [
    "Diagnosing performance across OS, network, and storage subsystems.",
    "Building scalable internal services and middleware for cloud platforms.",
    "Optimizing cross-layer infrastructure for resilience and throughput.",
    "Evaluating new system designs from academic and industry research.",
    "Designing infrastructure for large distributed applications.",
 ],

 resources: {
    videos: [
 // High-quality lectures on systems design and distributed computing
      "https://www.youtube.com/watch?v=oV9rvDllKEg", // Distributed systems overview (scalability & reliability)
      "https://www.youtube.com/watch?v=E5ktZ0IQQ4o", // Fault tolerance & distributed computing basics
      "https://www.youtube.com/watch?v=UbxVbJ6Q0qg", // Memory hierarchy & system performance fundamentals
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67642", // UC Merced course description (EECS 250)
      "https://en.wikipedia.org/wiki/Computer_systems", // Overview of systems design principles
      "https://en.wikipedia.org/wiki/Distributed_computing", // Distributed computing as foundational context
 ],
    tools: [
      "Linux kernel tools (perf, ftrace)", // For cross-layer performance analysis
      "Distributed tracing (Jaeger, Zipkin)", // End-to-end observability
      "Docker / Kubernetes", // Container & orchestration platforms
      "eBPF / SystemTap", // Runtime instrumentation for deep system introspection
 ],
 },

 additionalNotes:
  "According to the UC Merced catalog, EECS 250 engages students in advanced topics in computer systems and prepares them to tackle complex infrastructure challenges and current research themes across OS, networking, and distributed systems.",
 },
 },
 {
 id: "systems-eecs-251",
 code: "EECS 251",
 name: "Advanced Operating Systems",
 fullName: "EECS 251: Advanced Operating Systems",
 description:
 "Kernel-level thinking and advanced OS internals, including modern OS design, distributed OS concepts, and cutting-edge research.",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Deeply understand advanced OS components such as scheduling, memory management, and synchronization.",
    "Explore distributed OS design and support for modern infrastructures.",
    "Analyze OS performance across different workloads and services.",
    "Investigate OS security features relevant to cloud and distributed environments.",
    "Work with real systems through projects, debugging, and kernel extensions.",
    "Engage with research literature from top OS conferences (e.g., SOSP, OSDI).",
 ],

 topics: [
    "Advanced kernel design and modularization",
    "Memory and I/O system refinement",
    "OS support for virtualization and distributed workloads",
    "Security mechanisms and isolation strategies",
    "Performance optimization in OS internals",
    "State-of-the-art OS research case studies",
 ],

 careerRelevance:
  "EECS 251 combines *deep OS internals* with applied projects and research exposure, ideal for careers as Systems Engineer, Site Reliability Engineer (SRE), OS Kernel Developer, or Infrastructure Security Specialist. Students gain practical skills in kernel-level engineering and large-scale OS design.",

 realWorldApplications: [
    "Developing kernel modules and low-level OS features.",
    "Optimizing OS paths for performance-critical systems.",
    "Implementing secure OS mechanisms in cloud and container contexts.",
    "Integrating OS support for distributed and fault-tolerant services.",
    "Using research insights from SOSP/OSDI for real system design.",
 ],

 resources: {
    videos: [
 // High-quality videos on OS internals and advanced OS topics
      "https://www.youtube.com/watch?v=DW36DLSjMY0", // Advanced OS concepts & internals
      "https://www.youtube.com/watch?v=6lo3c9Fw2ak", // Operating systems overview (kernels, scheduling, memory)
      "https://www.youtube.com/watch?v=ek4PQLj9Gww", // OS virtualization & distributed OS design
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69552", // UC Merced EECS 251 description
      "https://en.wikipedia.org/wiki/Operating_system", // OS architecture and concepts
      "https://en.wikipedia.org/wiki/Distributed_operating_system", // Context on distributed OS designs
 ],
    tools: [
      "Linux kernel source & build environment", // Kernel experimentation
      "GDB / kgdb", // Advanced debugging
      "SystemTap / eBPF", // Runtime tracing & instrumentation
      "VirtualBox / QEMU", // Virtual environments for OS testing
 ],
 },

 additionalNotes:
  "EECS 251 goes beyond basic OS concepts and includes distributed OS topics, security, real-time control, IoT support, and OS research engagement as part of student projects.",
 },
 },
 {
 id: "systems-eecs-263",
 code: "EECS 263",
 name: "Cloud Computing",
 fullName: "EECS 263: Cloud Computing",
 description:
 "Modern infrastructure stacks and cloud platforms — design, deployment, and scalable systems engineering",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand core cloud computing concepts including virtualization, scalability, and resource pooling",
    "Analyze cloud architecture and deployment models (IaaS, PaaS, SaaS) and how they support modern applications",
    "Design and deploy scalable cloud infrastructure using industry-standard platforms (e.g., AWS, Azure, GCP)",
    "Evaluate trade-offs in cloud performance, cost, and security",
    "Implement distributed storage, load balancing, and service orchestration for resilient cloud services",
    "Apply best practices for cloud networking, multi-tenant isolation, and automation",
 ],

 topics: [
    "Cloud fundamentals: definitions, characteristics, and service models (IaaS, PaaS, SaaS)",
    "Virtualization and container technologies (VMs, containers)",
    "Cloud architecture patterns and design principles",
    "Cloud networking, load balancing, and distributed services",
    "Cloud storage systems and data persistence",
    "Security, governance, and cost management in cloud environments",
 ],

 careerRelevance:
  "Cloud computing skills are central for systems and infrastructure careers — particularly for Cloud Engineers, DevOps/Platform Engineers, Site Reliability Engineers (SRE), and Backend Architects. Knowledge of cloud architecture, virtualization, automation, and distributed systems allows engineers to build and operate highly scalable infrastructure that supports modern applications. According to UC Merced’s course listings, EECS 263 exists as a core course in the EECS curriculum focused on cloud computing technologies.",

 realWorldApplications: [
    "Deploying and managing scalable services on cloud platforms like AWS, Azure, or Google Cloud",
    "Designing fault-tolerant computing architectures that automatically scale with demand",
    "Configuring CI/CD pipelines and infrastructure automation using cloud orchestration tools",
    "Implementing distributed storage and caching for high-performance cloud workloads",
    "Monitoring and optimizing costs and performance for production cloud deployments",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=sajR8kE-TwE", // Cloud computing explained conceptually
      "https://www.youtube.com/watch?v=q3m1AB9ECXo", // Full cloud computing fundamentals course
      "https://www.youtube.com/watch?v=3hF4IwusVw0", // How cloud services work and design principles
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68589", // Official UC Merced course page (EECS 263)
      "https://en.wikipedia.org/wiki/Cloud_computing", // Cloud computing overview fundamentals
      "https://www.coursera.org/learn/cloud-computing", // Cloud computing online course concepts
 ],
    tools: [
      "AWS / Azure / GCP", // Major cloud platforms
      "Docker & Kubernetes", // Containerization & orchestration
      "Terraform / CloudFormation", // Infrastructure as Code
      "Prometheus / Grafana", // Monitoring & alerting
      "Linux CLI & Networking tools", // Command-line cloud system interaction
 ],
 },

 additionalNotes:
  "EECS 263 focuses on cloud computing principles, virtualization, deployment models, and distributed services that underpin modern infrastructure engineering. Students gain both conceptual understanding and practical skills in building and operating cloud systems.",
 },
 },

 {
 id: "systems-eecs-266",
 code: "EECS 266",
 name: "Advanced Distributed Systems",
 fullName: "EECS 266: Advanced Distributed Systems",
 description:
 "Fault-tolerant distributed systems design — building scalable, reliable, and efficient distributed services",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand core design principles for distributed systems including scalability, consistency, availability, and fault tolerance",
    "Analyze trade-offs among design goals such as CAP, latency, throughput, and consistency",
    "Implement distributed algorithms for replication, consensus, and coordination",
    "Evaluate system reliability, failure modes, and recovery mechanisms",
    "Design distributed services that meet performance and availability targets",
    "Apply distributed design at scale using real tools and frameworks",
 ],

 topics: [
    "Distributed system properties: consistency, availability, partition tolerance (CAP)",
    "Consensus algorithms (e.g., Paxos, Raft) and agreement protocols",
    "Fault tolerance strategies and replica coordination",
    "Replication, sharding, and distributed state management",
    "Distributed transactions and consistency models",
    "Advanced communication paradigms (RPC, messaging, pub/sub)",
 ],

 careerRelevance:
  "EECS 266 focuses on *advanced distributed system design*, preparing students for careers as Distributed Systems Engineer, Site Reliability Engineer (SRE), Backend Infrastructure Architect, and Cloud Systems Developer. Distributed systems are foundational to modern infrastructure — whether building globally scalable services, reliable data platforms, or edge-to-cloud environments. University catalogs indicate this course teaches development and evaluation of distributed systems with reliability and scalability as core objectives.",

 realWorldApplications: [
    "Designing fault-tolerant microservices in large-scale backend platforms",
    "Implementing consensus (e.g., Raft) and replication for distributed databases",
    "Evaluating and tuning distributed storage systems for consistency and performance",
    "Handling node failures and network partitions in distributed services",
    "Building scalable coordination layers for container orchestration systems",
    "Integrating distributed messaging systems (Kafka, RabbitMQ) in resilient stacks",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=43TDfUNsM3E", // Fault tolerance fundamentals in distributed systems
      "https://www.youtube.com/watch?v=JzhlfbVmXAE", // Introduction to Distributed Systems (scalability & reliability)
      "https://www.youtube.com/watch?v=YbZcMQs_yig", // Distributed systems lecture — consensus and replication
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69862", // UC Merced EECS 266 course description
      "https://en.wikipedia.org/wiki/Distributed_computing", // Distributed computing overview
      "https://en.wikipedia.org/wiki/Consistency_model", // Consistency models in distributed systems
 ],
    tools: [
      "Apache Kafka", // Distributed messaging and streaming
      "Etcd / Raft", // Consensus and coordination
      "ZooKeeper", // Service coordination in distributed apps
      "SimGrid", // Distributed system simulation and analysis
      "Docker & Kubernetes", // Container orchestration for distributed workloads
 ],
 },

 additionalNotes:
  "EECS 266 provides an advanced foundation in building distributed systems that handle real-world challenges such as partial failures, network partitions, and consistency trade-offs. Students practice designing, implementing, and evaluating systems that balance availability, reliability, and performance — core competencies for distributed infrastructure engineering.",
 },
 },
 {
 id: "systems-eecs-268",
 code: "EECS 268",
 name: "Datacenter-Scale Computing",
 fullName: "EECS 268: Datacenter-Scale Computing",
 description:
 "Google/AWS-style large-scale infrastructure systems — hardware, software, and performance at warehouse scale",
 tier: 2,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand modern datacenter architectures including compute, memory, networking, and storage at scale",
    "Analyze trade-offs in performance, energy efficiency, reliability, and cost in large-scale infrastructure",
    "Explore virtualization, containerization, and hardware-accelerated resource partitioning",
    "Design and evaluate cloud-style services, serverless workflows, and application frameworks",
    "Apply techniques for scheduling, load balancing, and fault tolerance across clusters",
    "Read and discuss advanced systems research with emphasis on real datacenter challenges",
 ],

 topics: [
    "Datacenter architecture and trends: warehouse-scale computing systems",
    "Hypervisor- and container-based virtualization and resource isolation",
    "Networking and storage systems at scale (distributed filesystems, RDMA, interconnects)",
    "Application frameworks, serverless computing, and orchestration",
    "Cross-cutting issues: scheduling, scalability, availability, reliability, power-efficiency",
    "Performance analysis and benchmarking of cluster workloads",
 /* Course overview based on UC Merced catalog and course listings including performance, virtualization, frameworks, and advanced research topics. */
 ],

 careerRelevance:
  "EECS 268 prepares students for systems and infrastructure careers where *large-scale computing matters*, such as Cloud Infrastructure Engineer, Datacenter Architect, Site Reliability Engineer (SRE), and Backend Systems Designer. Knowledge of hyperscale design, virtualization, distributed storage, and performance analysis is critical when building and operating services at the scale of Google, AWS, or Microsoft Azure. It also aligns with real industry concerns around power efficiency and reliability in warehouse-scale systems.",

 realWorldApplications: [
    "Designing and optimizing datacenter clusters for cloud providers (e.g., AWS, GCP, Azure)",
    "Building serverless platforms and distributed storage backends",
    "Configuring virtualization and container orchestration at hyperscale",
    "Analyzing performance and reliability trade-offs for multi-tenant infrastructure",
    "Implementing high-performance networking and storage systems for big data workloads",
    "Evaluating approaches for power-aware scheduling and cluster efficiency",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=3QhU9jd03a0", // Hyperscale datacenter overview
      "https://www.youtube.com/watch?v=eXHz5s6K9jM", // Modern cloud infrastructure explained
      "https://www.youtube.com/watch?v=4y3LzVwWH64", // Warehouse-scale computing systems primer
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69769", // Official UC Merced EECS 268 course description
      "https://en.wikipedia.org/wiki/Hyperscale_computing", // Hyperscale computing context
      "https://en.wikipedia.org/wiki/Server_farm", // Server farms & datacenter basics
 ],
    tools: [
      "Docker & Kubernetes", // Container orchestration at datacenter scale
      "Terraform / CloudFormation", // Infrastructure as Code
      "Prometheus & Grafana", // Monitoring large clusters
      "Distributed storage (Ceph/HDFS)", // Datacenter-scale storage
      "Benchmarking & tracing (Perf, Jaeger)", // Performance diagnostics in large systems
 ],
 },

 additionalNotes:
  "EECS 268 focuses on *hardware plus systems software research* for warehouse-scale computing and advanced infrastructure design, including virtualization, networking, storage, and performance analysis. Students often read and present research as part of the course.",
 },
 },
 {
 id: "systems-eecs-280",
 code: "EECS 280",
 name: "Advanced Networks & Distributed Systems",
 fullName: "EECS 280: Advanced Networks & Distributed Systems",
 description:
 "In-depth exploration of modern computer networking and distributed systems, emphasizing networked infrastructure, protocol design, and system-level implementation and evaluation across large-scale environments.",
 tier: 2,
 expandedInfo: {
 credits: 3,
 learningOutcomes: [
    "Understand advanced network protocols, architectures, and design principles underpinning modern internetworks and data center fabrics",
    "Analyze trade-offs in transport and routing protocols including performance, scalability, and reliability",
    "Explore distributed systems concepts including communication primitives, consensus, replication, and fault tolerance",
    "Implement and evaluate networked and distributed software using systems-level APIs (sockets, RPC, async I/O)",
    "Apply empirical techniques for measuring performance, diagnosing bottlenecks, and tuning network-heavy applications",
    "Critically read and discuss research literature on advanced networking and distributed systems topics",
    "Develop intuition for designing robust systems that perform under realistic network conditions",
 ],

 topics: [
    "Advanced network protocols: transport layer behavior, congestion control, routing principles",
    "Network architectures: overlay networks, datacenter networking and software-defined networking",
    "Distributed communication and coordination: RPC, message streams, consistency models",
    "Fault tolerance: replication, leader election, failure detectors",
    "Performance analysis: benchmarking, latency/throughput trade-offs, monitoring",
    "Emerging topics: cloud-scale infrastructures, distributed storage, scalable messaging stacks",
 ],

 careerRelevance:
  "EECS 280 prepares students for systems and infrastructure roles where deep understanding of networking and distributed platforms is essential, including Site Reliability Engineering (SRE), Cloud/Network Infrastructure Engineering, Distributed Systems Development, and Platform Architecture. Mastery of these concepts helps engineers build and maintain scalable, reliable services deployed across large networks and compute clusters.",

 realWorldApplications: [
    "Designing and optimizing transport and routing protocols for performance-critical services",
    "Implementing distributed algorithms for consistency, leader election, and fault detection",
    "Building scalable backend services that communicate reliably over high-latency and failure-prone links",
    "Tuning systems for throughput and responsiveness in cloud and datacenter environments",
    "Analyzing network traffic and system behavior using performance measurement tools",
    "Evaluating emerging distributed systems research in real deployment contexts",
 ],

 resources: {
    videos: [
        "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB", // MIT 6.824 Distributed Systems (fault tolerance, replication, consensus)
        "https://www.youtube.com/playlist?list=PLvFG2xYBrYAQCyz4Wx3NPoYJOFjvU7g2Z", // Stanford CS144 Intro to Computer Networking (deep TCP/IP + protocol behavior)
        "https://www.youtube.com/playlist?list=PL0_XloRC3MWtkqFdQtC-YdLhqN7juYi8D", // UC Berkeley CS168 Spring 2026 lectures playlist (internet architecture + routing + congestion control)
        "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB", // Martin Kleppmann Distributed Systems lecture series (design + correctness)
        "https://www.youtube.com/playlist?list=PLAwxTw4SYaPn21MqCiFq2r0FSjk9l6cW2"  // Georgia Tech Computer Networking (protocols + implementation-oriented lectures)
      ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=67652",
      "https://en.wikipedia.org/wiki/Symposium_on_Networked_Systems_Design_and_Implementation",
 ],
    tools: [
      "Wireshark & tcpdump",
      "Socket APIs (POSIX / WinSock)",
      "Async I/O libraries (libuv / Boost.Asio)",
      "Distributed tracing/monitoring (Jaeger/Prometheus)",
      "Mininet / virtual network emulators",
 ],
 },

 additionalNotes:
  "EECS 280 is typically offered as a graduate-level or advanced undergraduate elective focused on both conceptual foundations and practical implementation across networking and distributed systems. Students often engage with current research literature and hands-on coding assignments to examine real protocol behaviors and system performance in depth.",
 },
 },
];

/**
 * 🟡 TIER 3: ADVANCED SYSTEMS & INFRASTRUCTURE
 * These separate junior systems engineers from elite ones.
 */
export const tier3Courses: TierCourse[] = [
 // Note: The user's data shows EECS courses here that are duplicates of Tier 2
 // I'll create unique advanced courses based on the pattern
 {
 id: "systems-eecs-270",
 code: "EECS 270",
 name: "Systems Performance Engineering",
 fullName: "EECS 270: Systems Performance Engineering",
 description:
 "Deep dive into measuring, diagnosing, and optimizing real systems: profiling, tracing, benchmarking, capacity planning, and performance trade-offs across OS, networks, and distributed services.,",
 tier: 3,
 expandedInfo: {
 credits: 3,
 learningOutcomes: [
    "Apply practical performance methodologies to isolate bottlenecks in CPU, memory, I/O, and networks",
    "Design trustworthy benchmarks and load tests; avoid common measurement traps (warmup, cache effects, noisy neighbors)",
    "Use profiling and tracing to attribute latency to code paths and system resources",
    "Interpret system telemetry to guide tuning decisions (throughput vs latency, tail latency, saturation)",
    "Perform capacity planning and set performance budgets/SLOs for production services",
    "Communicate performance findings clearly using repeatable experiments and evidence-driven writeups",
 ],

 topics: [
    "Performance fundamentals: latency vs throughput, utilization/saturation, tail latency, Little’s Law (applied)",
    "Benchmarking and load testing: experiment design, variance, regression detection",
    "Profiling: CPU profilers, flame graphs, heap profiling, contention analysis",
    "Tracing and observability: distributed tracing, logs/metrics correlation, RED/USE methods",
    "Linux performance tooling: perf, eBPF/bpftrace, strace, tcpdump, iostat/vmstat",
    "Performance in distributed systems: queueing, retries/timeouts, backpressure, load balancing impact",
    "Optimization playbook: caching, batching, concurrency tuning, I/O strategies, kernel/network tuning",
 ],

 careerRelevance:
  "This course maps directly to SRE, Infrastructure/Platform Engineering, Performance Engineering, and Systems/Backend roles. You learn the exact skill set used in production to diagnose latency spikes, prevent regressions, tune throughput, and build observability that makes large systems debuggable and reliable.",

 realWorldApplications: [
    "Root-causing latency spikes in production (CPU contention, GC pauses, I/O stalls, network issues)",
    "Building performance test pipelines to catch regressions before release",
    "Capacity planning and load testing for launch events and growth scenarios",
    "Tuning Linux and application runtime settings for lower tail latency",
    "Designing dashboards/alerts that reflect user impact (SLO-driven monitoring)",
    "Evaluating trade-offs between optimization, cost, and reliability in multi-tenant environments",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=FJW8nGV4jxY",
      "https://www.youtube.com/watch?v=zxCWXNigDpA",
      "https://www.youtube.com/watch?v=LLZmTuTSEB8",
      "https://www.youtube.com/watch?v=-hnREz9fu88",
 ],
    websites: [
      "https://www.brendangregg.com/linuxperf.html",
      "https://sre.google/sre-book/monitoring-distributed-systems/",
      "https://opentelemetry.io/docs/concepts/signals/",
 ],
    tools: [
      "perf + FlameGraph tooling",
      "eBPF / bpftrace (and BCC tools)",
      "Wireshark / tcpdump",
      "Prometheus + Grafana",
      "OpenTelemetry + Jaeger",
      "Load testing: k6 / wrk / JMeter",
      "Tracing/logging in production runtimes (Go pprof, JVM profilers, etc.)",
 ],
 },

 additionalNotes:
  "Best taught with labs: you should expect hands-on profiling/tracing assignments and a final project where you measure, optimize, and justify improvements with clean experimental methodology.",

 },
 },
 {
 id: "systems-eecs-271",
 code: "EECS 271",
 name: "Large-Scale System Design",
 fullName: "EECS 271: Large-Scale System Design",
 description:
 "Architecting scalable, reliable systems: APIs, data models, caching, messaging, replication, multi-region deployments, and the trade-offs behind systems that serve millions of users.,",
 tier: 3,
 expandedInfo: {
 credits: 3,
 learningOutcomes: [
    "Design end-to-end architectures that scale (compute, storage, networking, and data flow)",
    "Choose appropriate data models and storage systems based on workload patterns and consistency needs",
    "Design for reliability: redundancy, failover, graceful degradation, and blast-radius control",
    "Reason about distributed trade-offs (CAP-style thinking, consistency models, replication strategies)",
    "Build systems with observability and operations in mind (SLOs, monitoring, incident readiness)",
    "Communicate designs clearly via diagrams, APIs, and trade-off analysis",
 ],

 topics: [
    "Scalability building blocks: load balancing, caching, CDNs, sharding/partitioning",
    "Service architecture: monolith vs microservices, gateways, service discovery, rate limiting",
    "Data at scale: replication, consistency, indexing, hot partitions, multi-tenant schemas",
    "Async systems: queues/streams, event-driven design, backpressure, idempotency",
    "Reliability: redundancy, failover, circuit breakers, retries/timeouts, chaos/fault injection concepts",
    "Multi-region design: latency, data locality, active-active vs active-passive, disaster recovery",
    "Security and abuse considerations: authn/authz, throttling, basic threat modeling for infra",
 ],

 careerRelevance:
  "EECS 271 aligns with Infrastructure/Platform Engineering, Backend Engineering, SRE, and Distributed Systems roles where you must design services that stay fast and reliable under growth, failures, and changing requirements. It’s also directly relevant to real system design interviews because it trains you to defend decisions with trade-offs, not buzzwords.",

 realWorldApplications: [
    "Designing a social feed, chat system, or video service that scales to millions of users",
    "Building high-availability APIs with caching, rate limits, and safe rollout strategies",
    "Designing data storage for large read/write workloads (sharding + replication)",
    "Implementing event-driven workflows (orders, notifications, analytics pipelines)",
    "Planning multi-region reliability and disaster recovery for critical services",
    "Creating architecture docs that engineers can implement and operate",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=-W9F__D3oY4",
      "https://www.youtube.com/watch?v=PE4gwstWhmc",
      "https://www.youtube.com/watch?v=aUzkgvJw_vw",
      "https://www.youtube.com/watch?v=tjubQ97lxA4",
 ],
    websites: [
      "https://github.com/donnemartin/system-design-primer",
      "https://aws.amazon.com/architecture/",
      "https://pdos.csail.mit.edu/6.824/",
 ],
    tools: [
      "Diagramming: Excalidraw / draw.io / Lucidchart",
      "API tooling: OpenAPI/Swagger + Postman",
      "Caching/queues: Redis, Kafka/RabbitMQ (conceptual + labs)",
      "Containers/orchestration: Docker + Kubernetes",
      "Load balancing/reverse proxies: NGINX/Envoy",
      "Observability: OpenTelemetry, Prometheus, Grafana",
      "Infra-as-code concepts: Terraform",
 ],
 },

 additionalNotes:
  "A strong version of this course is case-study driven: students design a few real systems (feed, storage service, rate limiter, analytics pipeline), then iterate as constraints change (cost, latency, growth, regional outages).",

 },
 },
];

/**
 * 🟡 TIER 4: SYSTEMS THINKING & CONTROL (MECHANICAL ENGINEERING)
 * Not for everyone — high payoff if chosen carefully.
 */
export const tier4Courses: TierCourse[] = [
 {
 id: "systems-me-140",
 code: "ME 140",
 name: "Vibrations & Control Systems",
 fullName: "ME 140: Vibration and Control",
 description:
 "Dynamic stability, vibrations, and feedback control — the foundation for keeping real infrastructure (robots, vehicles, HVAC, manufacturing lines) stable, safe, and performant,",
 tier: 4,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Model real systems (mass-spring-damper, beams/structures) and derive equations of motion",
    "Compute natural frequencies, damping ratios, resonance/anti-resonance, and transient/steady-state responses",
    "Use modal analysis to simplify multi-degree-of-freedom vibration problems",
    "Design and reason about basic feedback controllers (P/PI/PD/PID) for vibration suppression",
    "Evaluate stability and performance trade-offs to avoid oscillation, overshoot, and instability",
    "Translate physical stability intuition into engineering decisions (sensor placement, actuator choice, filtering, safety margins)",
 ],

 topics: [
    "Dynamics review: particles and rigid bodies; linearization for small motions",
    "Free/forced vibration, damping models, resonance and frequency response",
    "Multi-DOF vibration, modal coupling, modal analysis and superposition",
    "Vibration of continuous systems (e.g., beams/plates) at an intro level",
    "Feedback control of vibrations (P/PI/PD/PID) and stability concepts",
    "Root-locus and frequency-domain intuition for stability/performance trade-offs",
 ],

 careerRelevance:
  "This course is a stability-and-feedback bootcamp for systems engineering. If you ever build or operate infrastructure where oscillation is a failure mode (robotics, drones, autonomous systems, manufacturing automation, even power/thermal systems), ME 140 trains you to model dynamics, predict resonance, and add control to keep systems stable. The same mental model maps cleanly to software/infra too: feedback loops, oscillations, and ‘tuning’ are everywhere (autoscaling, congestion control, control-plane stability).",

 realWorldApplications: [
    "Suppressing vibration in drones/robots and improving motion stability",
    "Designing vibration isolation (mounts, dampers) for sensitive equipment",
    "Preventing resonance failures in rotating machinery and structures",
    "Tuning controllers to reduce overshoot/oscillation in mechatronic systems",
    "Condition monitoring using vibration signatures (FFT-based diagnostics)",
    "Improving reliability and safety margins in physical infrastructure systems",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PLp6ek2hDcoNBihD_JCzIvc-t_gApqMGKd", // NPTEL: Elements of Mechanical Vibration
      "https://www.youtube.com/playlist?list=PLAC668A0566953FB5", // NPTEL: Mechanical Vibrations
      "https://www.youtube.com/playlist?list=PLbMVogVj5nJQXSOgNkmP2kLM9m7BUQIUK", // NPTEL: Vibration Control
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68071",
      "https://ocw.mit.edu/courses/6-302-feedback-systems-spring-2007/",
      "https://en.wikipedia.org/wiki/Mechanical_vibration",
 ],
    tools: [
      "MATLAB / Simulink (modeling + control + frequency response)",
      "Python (NumPy/SciPy) for simulation + FFT-based analysis",
      "NI DAQ / oscilloscope basics for measuring vibration signals",
      "Accelerometers + signal conditioning (filters, sampling, aliasing)",
      "Control design + plotting (root locus, Bode) tooling",
 ],
 },

 additionalNotes:
  "If you want to look like a strong systems/infra engineer, treat ME 140 as your ‘anti-oscillation’ course: learn to spot unstable feedback, quantify stability margins, and justify tuning choices with plots and models.",
 },
 },
 {
 id: "systems-me-141",
 code: "ME 141",
 name: "Control Systems",
 fullName: "ME 141: Introduction to Control Systems",
 description:
 "Classical control for engineered infrastructure — designing stable closed-loop systems in time + frequency domains",
 tier: 4,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Build mathematical models of systems and represent them as transfer functions or state models (intro level)",
    "Analyze stability and transient response (rise time, settling time, overshoot)",
    "Use frequency-response concepts (Bode/Nyquist intuition) to reason about robustness",
    "Design classical controllers (P/PI/PD/PID, lead/lag) to meet specs",
    "Interpret real-world constraints: noise, saturation, delays, and model mismatch",
    "Connect control ideas to ‘infra’ thinking: feedback, observability, robustness, failure modes",
 ],

 topics: [
    "Closed-loop control fundamentals (block diagrams, sensitivity, disturbance rejection)",
    "Time-domain performance measures and stability intuition",
    "Frequency-domain analysis (Bode plots, gain/phase margin, robustness)",
    "Classical design: root locus, lead/lag compensation, PID tuning",
    "Practical issues: sensor noise, actuator saturation, filtering, delays",
    "Intro mapping to modern systems: state-space + multivariable direction (conceptual)",
 ],

 careerRelevance:
  "ME 141 is directly aligned with Controls Engineer, Robotics Systems Engineer, Autonomy Engineer, and many ‘infra-adjacent’ roles (HVAC controls, energy systems, industrial automation). For software infrastructure-minded people, it also builds the exact intuition you need for stable feedback loops (avoid thrash/oscillation, tune controllers, quantify robustness).",

 realWorldApplications: [
    "Designing stable motor speed/position control loops (robots, conveyors, drones)",
    "Tuning PID loops in industrial automation and process control",
    "Stabilizing thermal systems (cooling loops, temperature regulation)",
    "Building robust control against noise/disturbances (real sensor data)",
    "Reducing oscillation in closed-loop systems through margin-based design",
    "Controller validation via simulation + step/frequency-response testing",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L", // Control Systems Lectures (Brian Douglas playlist)
      "https://www.youtube.com/playlist?list=PLUl4u3cNGP62in17jH_DiJMkCGNM6Xni-", // MIT Electronic Feedback Systems (OCW playlist)
      "https://www.mathworks.com/videos/series/understanding-pid-control.html", // MathWorks: Understanding PID Control series
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68662",
      "https://ocw.mit.edu/courses/6-302-feedback-systems-spring-2007/",
      "https://en.wikipedia.org/wiki/Control_theory",
 ],
    tools: [
      "MATLAB Control System Toolbox / Simulink",
      "Python: control + scipy.signal for analysis/design prototyping",
      "LabVIEW / embedded tooling (for hardware-in-the-loop style thinking)",
      "Bode/Root-locus analysis workflows",
      "Unit testing mindset for controllers (step responses, margins, regression tests)",
 ],
 },

 additionalNotes:
  "If you want to present this as ‘systems/infra’: emphasize robustness, stability margins, and preventing oscillation under load/latency/noise — that’s literally the reliability story.",
 },
 },
 {
 id: "systems-me-142",
 code: "ME 142",
 name: "Mechatronics",
 fullName: "ME 142: Mechatronics",
 description:
 "Hardware–software integration for real systems — sensors, actuators, microcontrollers, and closed-loop control for ‘physical infrastructure’",
 tier: 4,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Interface sensors/actuators with a microcontroller and build reliable I/O pipelines",
    "Design mechatronic subsystems (power, signals, timing) that behave predictably",
    "Implement closed-loop control on embedded targets (sampling, filtering, stability)",
    "Prototype and test systems end-to-end (hardware + firmware + control + validation)",
    "Debug hardware/software integration issues systematically (noise, grounding, timing)",
    "Translate requirements into robust builds (safety, fault handling, repeatability)",
 ],

 topics: [
    "Microcontroller fundamentals: timing, interrupts, ADC/DAC, PWM",
    "Sensors and signal conditioning (noise, filtering, calibration)",
    "Actuators: DC/BLDC motors, servos, steppers; drivers and power electronics basics",
    "Embedded control implementation (discrete-time PID and practical tuning)",
    "System integration: comms + instrumentation + testing",
    "Rapid prototyping workflows and design-for-reliability practices",
 ],

 careerRelevance:
  "Mechatronics is one of the most ‘systems engineer’ courses you can take: it forces you to integrate compute + sensing + actuation + control + testing. That’s the same integration profile you see in infra roles for robotics, IoT fleets, industrial automation, and cyber-physical systems (where reliability and observability matter as much as features).",

 realWorldApplications: [
    "Building embedded prototypes that behave reliably in the real world",
    "Motor control and automation for robotics/industrial systems",
    "Sensor fusion + filtering pipelines for stable measurements",
    "Hardware-in-the-loop style testing for safety and regression prevention",
    "Designing resilient power/signal layouts that reduce noise and failure rates",
    "Deploying and monitoring fleets of embedded devices (IoT infrastructure mindset)",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PL-euleXgwWUNQ80DGq6qopHBmHcQyEyNQ", // UC Merced: Spring 2020 Mechatronics (ME142) playlist
      "https://www.youtube.com/playlist?list=PLOzRYVm0a65dAI5mqWdoXKExqzWn0pK-j", // NPTEL IIT Bombay: Design of Mechatronic Systems
      "https://www.youtube.com/playlist?list=PLC-SsBhVny0UA3xO-B0jZboxCbSrs-Sd0", // ROS 2 Basics (useful for systems-style robotics integration)
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68072&print=",
      "https://mechatronics.ucmerced.edu/teaching",
      "https://en.wikipedia.org/wiki/Mechatronics",
 ],
    tools: [
      "Arduino / STM32 / ESP32 (embedded platforms)",
      "Oscilloscope + multimeter + logic analyzer (debugging infrastructure)",
      "MATLAB/Simulink or Python for modeling + controller prototyping",
      "ROS 2 (systems integration for robots)",
      "KiCad (basic PCB workflows), plus motor drivers (H-bridge, ESCs)",
 ],
 },

 additionalNotes:
  "To frame this as infra engineering: highlight observability (instrumentation), fault handling, and repeatable deployment/testing — not just ‘making it work once’.",
 },
 },
 {
 id: "systems-me-145",
 code: "ME 145",
 name: "Lagrange Dynamics",
 fullName: "ME 145: Lagrange Dynamics",
 description:
 "Energy-based modeling for complex systems — generalized coordinates, constraints, and equations of motion used heavily in robotics and advanced control",
 tier: 4,
 expandedInfo: {
 credits: 3,
 learningOutcomes: [
    "Model mechanical systems using generalized coordinates and energy methods",
    "Handle constraints (holonomic/non-holonomic) and interpret their engineering meaning",
    "Derive equations of motion efficiently for multi-body systems",
    "Connect dynamics models to control design and simulation workflows",
    "Build intuition for stability/energy shaping and why certain systems oscillate",
    "Prepare for advanced robotics/control/estimation work that depends on correct dynamics",
 ],

 topics: [
    "Review of Newtonian dynamics (as needed for setup and comparison)",
    "Generalized coordinates and virtual work / virtual displacements",
    "Holonomic vs non-holonomic constraints and constrained motion",
    "Deriving Lagrange’s equations; modeling multi-body systems",
    "Energy methods and interpreting dynamics as an engineering ‘system model’",
    "Bridging dynamics → simulation → control (robotics-style pipeline)",
 ],

 careerRelevance:
  "If you want to work near robotics infrastructure, autonomy, or advanced control, Lagrange dynamics is a power tool: it’s how you build correct models for complex machines (arms, drones, legged robots) that then feed simulators, controllers, and estimators. In systems/infra terms: it’s the ‘source of truth’ modeling layer — garbage dynamics in, garbage stability/performance out.",

 realWorldApplications: [
    "Deriving robot equations of motion for simulation and control",
    "Model-based control (energy shaping, stabilization, trajectory tracking)",
    "Building physics simulators or improving simulation fidelity",
    "Understanding why coupled systems oscillate and how energy moves through them",
    "Designing safer systems by predicting dynamic failure modes",
    "Supporting advanced topics: optimal control, nonlinear control, estimation",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PL58F1D0056F04CF8C", // MIT OCW: Underactuated Robotics (Spring 2009)
      "https://www.youtube.com/playlist?list=PLkx8KyIQkMfU5szP43GlE_S1QGSPQfL9s", // Underactuated Robotics (newer lecture series)
      "https://ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/resources/lecture-15-introduction-to-lagrange-with-examples/", // MIT OCW: Intro to Lagrange
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=69545",
      "https://underactuated.csail.mit.edu/index.html",
      "https://en.wikipedia.org/wiki/Lagrangian_mechanics",
 ],
    tools: [
      "Symbolic math (SymPy / MATLAB Symbolic) for derivations and checking",
      "Simulation engines (MuJoCo / PyBullet) for model validation",
      "Drake (model-based robotics workflows)",
      "Numerical integration tools (SciPy ODE solvers)",
      "Versioned modeling: keeping dynamics + parameters reproducible (infra mindset)",
 ],
 },

 additionalNotes:
  "From a systems/infra lens, this course improves your ability to create ‘correct models’ of reality — which is exactly what you need before you can tune, optimize, or guarantee stability.",
 },
 },
 {
 id: "systems-me-135",
 code: "ME 135",
 name: "Finite Element Analysis",
 fullName: "ME 135: Finite Element Analysis",
 description:
 "Modeling + simulation for system performance — discretization, numerical methods, and FEA workflows used in design and reliability engineering",
 tier: 4,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand the FEM pipeline: modeling assumptions → discretization → assembly → solving → validation",
    "Derive/interpret element equations for 1D problems and extend intuition to 2D/3D",
    "Assess numerical error, mesh quality, convergence, and stability of solutions",
    "Apply FEM to core engineering domains (heat transfer, solid mechanics, fluids at an intro level)",
    "Use commercial/open tools to run simulations and defend results with sanity checks",
    "Communicate simulation results like a reliability/performance engineer (assumptions + limits)",
 ],

 topics: [
    "Weak form / variational intuition (conceptual), element formulation basics",
    "1D FEM (bars/rods/heat conduction) → assembly and boundary conditions",
    "2D/3D elements, meshing concepts, shape functions (intro level)",
    "Solution strategies, conditioning, and convergence/mesh refinement",
    "Applications: heat transfer, solid mechanics, (intro) fluid-related formulations",
    "Engineering workflow: modeling, implementation, verification/validation",
 ],

 careerRelevance:
  "FEA is extremely valuable for systems performance and reliability work: you learn how to approximate reality, quantify error, and avoid false confidence — skills that transfer directly to infra engineering (capacity planning, performance modeling, validating assumptions). In physical infrastructure, it’s core for structural/thermal reliability; in cyber-physical systems, it supports safe envelopes and robust design decisions.",

 realWorldApplications: [
    "Thermal modeling (cooling plates, enclosures, hotspots) and reliability analysis",
    "Stress/strain simulations for structural safety margins",
    "Mesh refinement/convergence studies to prove results are trustworthy",
    "Design iteration: comparing candidate designs before prototyping",
    "Failure analysis: identifying stress concentrations or thermal bottlenecks",
    "Connecting simulation outputs to requirements and risk decisions",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PLD4017FC423EC3EB5", // MIT OCW: Finite Element Procedures (Linear Analysis)
      "https://www.youtube.com/playlist?list=PL75C727EA9F6A0E8B", // MIT OCW: Finite Element Procedures (Nonlinear Analysis)
      "https://www.youtube.com/watch?v=C6X9Ry02mPU", // Intro to FEM for Beginners (high-level intuition)
 ],
    websites: [
      "https://catalog.ucmerced.edu/preview_course_nopop.php?catoid=24&coid=68068",
      "https://ocw.mit.edu/courses/res-2-002-finite-element-procedures-for-solids-and-structures-spring-2010/",
      "https://en.wikipedia.org/wiki/Finite_element_method",
 ],
    tools: [
      "ANSYS / Abaqus / COMSOL (industry-standard FEA suites)",
      "Gmsh (meshing) + CalculiX (open-source solver) for lightweight workflows",
      "FEniCS / deal.II (PDE/FEM research-grade toolchains)",
      "MATLAB/Python for small FEM implementations and verification tests",
      "Post-processing + reporting (Paraview) for interpreting results",
 ],
 },

 additionalNotes:
  "To position this as systems/infra: emphasize validation, convergence testing, and ‘trustworthy modeling’ — the same discipline used in performance engineering and capacity planning.",
 },
 },

 {
 id: "systems-me-152",
 code: "ME 152",
 name: "Digital Twins",
 fullName: "ME 152: Digital Twins",
 description:
 "Digital replicas of real systems for monitoring, prediction, and optimization — the “model + data + deployment” loop used in modern infrastructure",
 tier: 4,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Explain what a “true” digital twin is (vs. a static simulation) and how synchronization + fidelity affect usefulness",
    "Build dynamic models of real systems and calibrate them using real sensor/telemetry data (system identification)",
    "Use optimization + ML to do behavior matching, anomaly detection, and forecasting from time-series signals",
    "Design an end-to-end digital twin pipeline: sensing → ingestion → model → inference → visualization → actions",
    "Deploy digital twin workloads across edge/cloud constraints (latency, bandwidth, reliability, cost)",
    "Evaluate digital twin architectures for observability, security, and operational maintainability",
 ],

 topics: [
    "Digital twin concepts, components, and industrial examples",
    "Math foundations used in twins: linear algebra, optimization, PCA/SVD, basic ML",
    "Dynamic systems modeling, simulation, and system identification",
    "Behavior matching + uncertainty/health monitoring (faults, degradation, prognosis)",
    "Edge-to-cloud deployment frameworks (data pipelines, storage, streaming, dashboards)",
    "Lab-intensive digital twin construction and validation projects",
 ],

 careerRelevance:
  "ME 152 maps cleanly to systems/infra engineering because digital twins are basically *production-grade models that stay connected to reality*. The same mindset shows up in SRE and infrastructure work: instrumentation, feedback loops, capacity/performance modeling, anomaly detection, and safe rollouts. This course is especially relevant to roles like Infrastructure/Platform Engineer, SRE (systems modeling & reliability), IoT/Edge Infrastructure Engineer, and Applied ML for Operations (MLOps/Observability).",

 realWorldApplications: [
    "Predictive maintenance for fleets (motors, pumps, HVAC, vehicles) using streaming telemetry + models",
    "Operational dashboards that combine live metrics with simulated “what-if” scenarios",
    "Capacity planning + bottleneck prediction for cyber-physical infrastructure (factories, buildings, energy systems)",
    "Digital commissioning: testing control/automation logic in a twin before touching production hardware",
    "Incident analysis: replaying real events through a twin to identify root causes and mitigations",
    "Security + resilience analysis of sensor-driven systems (trust, data integrity, failure modes)",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=gUVuPEkZL0s", // What is AWS IoT TwinMaker? (AWS)
      "https://www.youtube.com/watch?v=P7cEi6oZTeM", // AWS IoT TwinMaker tutorial + demo
      "https://www.youtube.com/watch?v=bOkp7uRoNr0", // Azure Digital Twins overview
      "https://www.youtube.com/watch?v=oWeAYJ8CN70", // Digital Twin: Realizing Transformation (intro)
 ],
    websites: [
      "https://mechatronics.ucmerced.edu/sites/mechatronics.ucmerced.edu/files/page/documents/me152-digital-twins-flyer-march-2024.pdf",
      "https://mechatronics.ucmerced.edu/digital-twin",
      "https://www.digitaltwinconsortium.org/initiatives/the-definition-of-a-digital-twin/",
      "https://docs.aws.amazon.com/iot-twinmaker/",
      "https://learn.microsoft.com/en-us/azure/digital-twins/",
      "https://eclipse.dev/ditto/intro-overview.html",
 ],
    tools: [
      "MATLAB/Simulink (modeling + control + identification)",
      "Python (NumPy/SciPy/Pandas) for time-series + modeling",
      "IoT protocols: MQTT / OPC UA (data ingestion patterns)",
      "Time-series storage: InfluxDB / TimescaleDB",
      "Observability dashboards: Grafana",
      "Cloud digital twin platforms: AWS IoT TwinMaker / Azure Digital Twins",
      "Open-source twin patterns: Eclipse Ditto",
      "Docker + Kubernetes (deploying twin services & pipelines)",
 ],
 },

 additionalNotes:
  "Lab-heavy format (weekly lecture + dedicated lab). In some offerings it appears as a special-topics version (ME190) while the formal ME152 listing is being finalized.",

 },
 },
 {
 id: "systems-me-210",
 code: "ME 210",
 name: "Linear Multivariable Control",
 fullName: "ME 210: Linear Multivariable Control",
 description:
 "MIMO control systems using state-space + transfer-matrix methods — the math behind stable, high-performance multi-metric control loops,",
 tier: 4,
 expandedInfo: {
 credits: 3,
 learningOutcomes: [
    "Model multi-input multi-output (MIMO) systems in state-space and transfer-matrix form",
    "Analyze internal stability and system structure (realizations, minimality)",
    "Test and interpret controllability, stabilizability, observability, and detectability",
    "Design state-feedback controllers and observer-based output-feedback controllers",
    "Work across continuous/discrete time and time-invariant/time-varying formulations",
    "Implement MIMO designs and simulations in MATLAB/Simulink (and translate concepts to infra control loops)",
 ],

 topics: [
    "State models and solutions (continuous + discrete)",
    "Internal stability",
    "Controllability & observability (and stabilizability/detectability)",
    "System realization and canonical forms",
    "State feedback design and pole placement concepts",
    "Observer design and output feedback",
    "Time-varying systems + discretization considerations",
    "Hands-on MIMO control design workflows in simulation",
 ],

 careerRelevance:
  "For systems/infra engineering, ME 210 is the “control theory backbone” behind many real production mechanisms: autoscaling, congestion control, multi-signal scheduling, and any scenario where you must control *several outputs at once* (latency, throughput, error rate, cost) using *several inputs* (replicas, CPU limits, queue priorities, routing weights). It’s also directly relevant to robotics, energy systems, and advanced automation roles where stability + robustness matter.",

 realWorldApplications: [
    "Autoscaling controllers that jointly manage latency + cost + utilization (multi-metric control)",
    "Network congestion control and routing policies framed as stable feedback systems",
    "Power/thermal control in datacenters (fans, cooling loops, workload shifting)",
    "Flight/robot/process-control systems that require true MIMO modeling",
    "Observer-based monitoring: estimating unmeasured internal state from noisy metrics",
    "Digital twin control: validating MIMO controllers inside a twin before deployment",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/watch?v=dUVgBBw3eeY", // Multivariable (MIMO) Control Fundamentals (MATLAB example)
      "https://www.youtube.com/watch?v=c1IEWCckLgM", // State-space analysis for MIMO systems (lecture)
      "https://www.youtube.com/watch?v=bfLf0RkdgzY", // Example: MIMO transfer functions (lecture)
      "https://www.youtube.com/playlist?list=PLw820dYe8L8JsVI6Pq1L8K-e3FIxdXbps", // Multivariable control systems playlist
 ],
    websites: [
      "https://mechatronics.ucmerced.edu/sites/mechatronics.ucmerced.edu/files/page/documents/me210-eecs210-sp25-linear-multivariable-control-flyer.pdf",
      "https://ocw.mit.edu/courses/6-245-multivariable-control-systems-spring-2004/",
      "https://www.mathworks.com/help/control/ug/build-a-model-of-a-multi-input-multi-output-mimo-control-system.html",
      "https://en.wikipedia.org/wiki/Control_theory",
      "https://en.wikipedia.org/wiki/State-space_representation",
 ],
    tools: [
      "MATLAB/Simulink + Control System Toolbox",
      "Python Control Systems Library (python-control) + SciPy",
      "GNU Octave (MATLAB-like workflow)",
      "Julia ControlSystems.jl",
      "CVX / convex optimization tooling (for modern controller design patterns)",
      "Jupyter notebooks for simulation + reports",
 ],
 },

 additionalNotes:
  "Emphasizes stability, controllability/observability, and both state-space + transfer-matrix approaches; many offerings use Wilson Rugh’s *Linear Systems Theory* as the core text.",

 },
 },
];

/**
 * 🟠 TIER 5: SECURITY & RELIABILITY (OPTIONAL BUT POWERFUL)
 */
export const tier5Courses: TierCourse[] = [
 {
 id: "systems-cse-178",
 code: "CSE 178",
 name: "Computer & Network Security",
 fullName: "CSE 178: Computer & Network Security",
 description:
 "Secure infrastructure design and implementation — threats, defenses, and secure-by-default systems thinking,",
 tier: 5,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Build a practical threat-model for real infrastructure (APIs, networks, endpoints, cloud) and prioritize mitigations",
    "Understand core security goals (confidentiality, integrity, availability) and how infra decisions affect each",
    "Apply modern authentication, authorization, and cryptographic primitives correctly in systems contexts",
    "Identify and mitigate common network + web attack classes (recon, injection, credential attacks, MITM, DoS patterns)",
    "Design defense-in-depth architectures: segmentation, least privilege, secure defaults, and safe failure modes",
    "Use monitoring + logging to detect incidents and support incident response in production environments",
 ],

 topics: [
    "Threat modeling for infrastructure: assets, trust boundaries, attacker capabilities, and risk",
    "Secure networking fundamentals: transport security (TLS), VPNs, segmentation, zero trust concepts",
    "Identity & access management: authn/authz, MFA, secrets management, key rotation",
    "Common vulnerability classes: injection, RCE patterns, insecure deserialization, SSRF, misconfigurations",
    "Network security operations: intrusion detection, alerting, packet analysis, baseline vs anomaly",
    "Practical hardening: OS, containers, cloud IAM, patching strategy, secure configuration management",
 ],

 careerRelevance:
  "This maps directly to systems/infra roles like SRE, Cloud/Infra Engineer, Security Engineer, and Platform Engineer. The biggest infra failures in production are often security failures (misconfig + weak identity + poor isolation). CSE 178 helps you design and operate systems with secure defaults, strong observability, and realistic attacker models.",

 realWorldApplications: [
    "Hardening cloud workloads (IAM policies, network segmentation, secrets management, patch pipelines)",
    "Implementing secure service-to-service communication (mTLS, cert rotation, policy enforcement)",
    "Building detection and response workflows (logs, SIEM pipelines, alert tuning, incident triage)",
    "Assessing and fixing application and API security risks before production release",
    "Securing internal networks (least privilege, VLAN/VPC design, controlled egress, VPN access)",
    "Pen-testing and validation of controls using safe, authorized tooling",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PLUl4u3cNGP62K2DjQLRxDNRi0z2IRWnNh", // MIT 6.858 Computer Systems Security (full course)
      "https://www.youtube.com/user/OpenSecurityTraining/playlists", // OpenSecurityTraining (free, deep security topics)
      "https://www.youtube.com/watch?v=cu1SX3M6rrI", // MIT 6.858 lecture (network security)
 ],
    websites: [
      "https://eecs.ucmerced.edu/current-students/courses", // UCM EECS/CSE course listings
      "https://owasp.org/www-project-top-ten/", // OWASP Top 10
      "https://www.nist.gov/cyberframework", // NIST Cybersecurity Framework
 ],
    tools: [
      "Wireshark / tcpdump", // packet capture + network debugging
      "Nmap", // recon + service discovery (authorized use)
      "Burp Suite (Community/Pro)", // web security testing
      "OpenSSL + key tooling", // TLS, certs, crypto ops
      "Vault / cloud secrets managers", // secrets storage + rotation
      "Suricata or Snort", // IDS/IPS
      "Linux hardening tooling (ufw, auditd)",
 ],
 },

 additionalNotes:
  "Treat this as an infra course: every concept should connect back to secure defaults, least privilege, segmentation, and detection/response. If you can explain *how an attacker moves laterally* and *how you stop it*, you’re thinking like a production security-minded infra engineer.",

 },
 },
 {
 id: "systems-eecs-261",
 code: "EECS 261",
 name: "Wireless Networks",
 fullName: "EECS 261: Wireless Networks",
 description:
 "Wireless networking for infrastructure — Wi-Fi/cellular fundamentals, protocols, performance, and reliability at scale,",
 tier: 5,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Understand wireless channel behavior (path loss, fading, interference) and how it impacts throughput/latency",
    "Analyze MAC and link-layer tradeoffs (contention, scheduling, rate adaptation) for real deployments",
    "Reason about capacity, coverage, and reliability for Wi-Fi/cellular-style networks",
    "Design and evaluate wireless network architectures with performance + resilience constraints",
    "Measure and troubleshoot wireless performance using practical instrumentation and traces",
    "Connect protocol decisions to infra outcomes: user experience, cost, and operational complexity",
 ],

 topics: [
    "Wireless PHY/channel basics: propagation, fading, interference, SINR intuition",
    "MAC protocols and scheduling: contention, fairness, QoS, rate control",
    "Mobility and handoff concepts; coverage vs capacity planning",
    "Wireless performance engineering: congestion, airtime fairness, measurement methodology",
    "Security basics in wireless infra: authentication, encryption, key management (high level)",
    "Edge + backhaul considerations: mesh/relay designs, reliability and failover patterns",
 ],

 careerRelevance:
  "Wireless is infrastructure. This course is great for Network Infrastructure, SRE/Infra at edge-heavy companies, IoT/Edge Platform, and Telecom/5G-adjacent roles—where you need to understand why “the network is slow” often means interference, contention, bad roaming, or poor capacity planning rather than a simple bandwidth problem.",

 realWorldApplications: [
    "Designing and validating Wi-Fi deployments (AP placement, channel planning, roaming behavior)",
    "Building and operating edge networks for warehouses, campuses, hospitals, and industrial sites",
    "Debugging wireless reliability issues using traces (latency spikes, packet loss, retransmissions)",
    "Optimizing mesh/relay networks for coverage and resilience",
    "Evaluating tradeoffs for private LTE/5G vs Wi-Fi for enterprise infrastructure",
    "Planning observability for wireless: metrics, logs, RF surveys, and incident workflows",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PL1A4AFAC7AC1909C9", // NPTEL Wireless Communication (full series)
      "https://www.youtube.com/playlist?list=PLbbCsk7MUIGfynU-ONMbe-yZXWTgTX1YP", // David Tse fundamentals (short course playlist)
      "https://www.youtube.com/playlist?list=PLi2gZdKUQKQnutD_4xzrtOxaBnL0bQMF_", // NYU Wireless Communications graduate lectures
 ],
    websites: [
      "https://online.stanford.edu/courses/ee359-wireless-communications", // Stanford Online wireless comm overview
      "https://www.wi-fi.org/", // Wi-Fi Alliance (standards ecosystem)
      "https://www.3gpp.org/", // 3GPP (cellular standards body)
 ],
    tools: [
      "Wireshark + 802.11 capture adapters", // capture + analyze Wi-Fi traffic
      "iperf3", // throughput testing
      "ns-3", // wireless network simulation
      "GNU Radio (optional)", // SDR experimentation
      "Linux networking tools (tc, ss, ip)", // measurement + shaping
      "RF survey tooling (Ekahau-style workflows)", // site surveys (conceptual/tooling awareness)
      "Prometheus/Grafana metrics for APs/controllers",
 ],
 },

 additionalNotes:
  "From an infra lens, the win is being able to connect RF + protocol behavior to SLOs (latency, loss, availability) and to build measurement habits that turn ‘wireless is flaky’ into concrete, fixable causes.",

 },
 },
 {
 id: "systems-eecs-262",
 code: "EECS 262",
 name: "Embedded Sensor Networks",
 fullName: "EECS 262: Embedded Sensor Networks",
 description:
 "IoT + sensor infrastructure — embedded networking, distributed sensing, reliability, and edge constraints,",
 tier: 5,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Design sensor network architectures under real constraints (power, compute, bandwidth, intermittency)",
    "Choose protocols appropriate to the environment (BLE/Zigbee/Thread/LoRaWAN/Wi-Fi) and justify tradeoffs",
    "Build reliable data pipelines from edge devices to backends (buffering, retries, idempotency, time sync)",
    "Implement basic distributed coordination patterns (routing, aggregation, duty cycling, fault tolerance)",
    "Reason about security for IoT: identity, secure boot, firmware update safety, and network exposure",
    "Operate sensor infrastructure: observability, fleet health, rollout strategies, and incident handling",
 ],

 topics: [
    "Sensor node constraints: power budgets, duty cycling, embedded compute limits",
    "Wireless sensor network fundamentals: topology, routing, data aggregation, time synchronization",
    "Embedded networking protocols: lightweight messaging (MQTT/CoAP concepts), link options (BLE/802.15.4/LoRa)",
    "Reliability engineering for edge: buffering, backpressure, offline-first behavior, fleet updates",
    "Security for sensor fleets: provisioning, keying, OTA update integrity, attack surface reduction",
    "Real deployments: monitoring, calibration, drift, lifecycle management, and failure modes",
 ],

 careerRelevance:
  "This is ideal for infra paths that touch the physical world: IoT Platform Engineer, Edge Infrastructure Engineer, Reliability Engineer for device fleets, and Wireless/Sensor Systems Engineer. The same SRE principles apply—SLOs, observability, rollouts, and incident response—but under power and connectivity constraints.",

 realWorldApplications: [
    "Building sensor networks for facilities monitoring, smart buildings, and industrial telemetry",
    "Deploying edge gateways that ingest, buffer, and securely forward device data to cloud backends",
    "Designing OTA firmware update pipelines with rollback + integrity guarantees",
    "Creating fleet health dashboards (battery, connectivity, packet loss, device uptime)",
    "Implementing robust device provisioning and key management at scale",
    "Planning resilient architectures for intermittent connectivity environments",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PLbxBGRRnuvJffhUV5eo7LJq4-k8EPZle_", // Wireless Sensor Networks (playlist)
      "https://www.youtube.com/watch?v=QadXmuwIFb8", // Raj Jain lecture: Wireless Sensor Networks
      "https://www.youtube.com/watch?v=oNVDO_gZYrU", // Basics of Wireless Sensor Networks (series entry)
 ],
    websites: [
      "https://www.rfc-editor.org/rfc/rfc7252", // CoAP (common constrained protocol)
      "https://mqtt.org/", // MQTT overview + ecosystem
      "https://www.contiki-ng.org/", // Contiki-NG (embedded IoT OS)
 ],
    tools: [
      "Contiki-NG / Zephyr RTOS", // embedded OS for networking
      "MQTT brokers (Mosquitto) + clients", // IoT messaging
      "Packet capture + embedded sniffers", // debugging radio/network behavior
      "LoRaWAN stacks + gateways (concept/tooling)", // long-range sensor deployments
      "OTA update frameworks (concept/tooling)", // safe firmware rollouts
      "Time sync + telemetry libraries", // clock + metrics on constrained devices
      "Edge gateway stacks (Docker on gateways, lightweight agents)",
 ],
 },

 additionalNotes:
  "A strong infra take on this course is: treat devices like a ‘distributed datacenter with tiny unreliable nodes.’ Your job is to make the fleet observable, updateable, secure, and resilient—even when connectivity and power are adversarial.",

 },
 },

 {
 id: "systems-eecs-272",
 code: "EECS 272",
 name: "Program Verification",
 fullName: "EECS 272: Program Verification and Model Checking",
 description:
 "Correctness and safety for infrastructure systems — formal specs, model checking, and automated reasoning to prevent concurrency/distributed bugs.,",
 tier: 5,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Write precise specifications and invariants for real systems (safety + liveness), beyond unit tests",
    "Model-check concurrent/distributed behaviors to find deadlocks, races, and protocol edge cases",
    "Use temporal-logic style thinking (e.g., LTL/CTL intuition) to express system properties",
    "Understand SMT/SAT-driven verification workflows and how counterexamples are generated",
    "Apply verification approaches to state machines, protocols, and critical infrastructure components",
    "Compare verification vs testing/fuzzing/static analysis and choose the right tool for the risk level",
 ],

 topics: [
    "Specifications: invariants, pre/post-conditions, safety vs liveness",
    "Model checking: state exploration, abstraction, counterexample traces",
    "Temporal logic intuition and specification patterns for distributed systems",
    "SAT/SMT solving basics for automated verification",
    "Bounded model checking and symbolic execution (bug finding at scale)",
    "Verification of concurrency/distributed protocols (retries/timeouts, leader election, failover)",
    "Tooling: TLA+/TLC, SPIN/Promela, CBMC, Z3, Dafny/Coq-style approaches",
 ],

 careerRelevance:
  "EECS 272 is high-leverage for systems/infra because many production failures are 'logic bugs under concurrency + failure.' Verification skills help you define invariants (what must never happen) and prove/validate them early. This maps to roles like Infrastructure/Platform Engineer, SRE, Distributed Systems Engineer, and Security Engineering.",

 realWorldApplications: [
    "Spec-checking distributed algorithms (replication, consensus, leader election, failover)",
    "Finding concurrency bugs (deadlocks, races) before production via model checking",
    "Verifying orchestration state machines (deployments, rollouts, recovery workflows)",
    "Proving security invariants in critical flows (authorization/token-state properties)",
    "Validating policies/configs as constraints (least privilege, allowed network paths)",
    "Adding formal checks in CI alongside tests and fuzzing for high-risk components",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PLWAv2Etpa7AOAwkreYImYt0gIpOdWQevD",
      "https://www.youtube.com/playlist?list=PLre5AT9JnKShFK9l9HYzkZugkJSsXioFs",
      "https://www.youtube.com/watch?v=qx-d8zZbeTI",
      "https://www.youtube.com/watch?v=Fj19QyIp1ME",
 ],
    websites: [
      "https://eecs.ucmerced.edu/current-students/courses",
      "https://lamport.azurewebsites.net/video/videos.html",
      "https://spinroot.com/spin/whatispin.html",
      "https://github.com/Z3Prover/z3",
 ],
    tools: [
      "TLA+ / TLC",
      "SPIN (Promela)",
      "CBMC (bounded model checking for C/C++)",
      "Z3 (SMT solver)",
      "Dafny",
      "Coq",
 ],
 },

 additionalNotes:
  "Infra framing: focus on invariants and failure-mode reasoning (timeouts, retries, partitions, partial failures). Even lightweight modeling/specs can prevent expensive production incidents.",
 },
 },
 {
 id: "systems-math-140",
 code: "MATH 140",
 name: "Optimization",
 fullName: "MATH 140: Mathematical Methods for Optimization",
description:
 "Resource allocation and optimization for systems — scheduling, routing, capacity planning, and cost/performance trade-offs at scale.",

 tier: 5,
 expandedInfo: {
 credits: 4,
 learningOutcomes: [
    "Formulate real problems as optimization models (objective + constraints) clearly",
    "Solve linear programs and interpret dual variables (shadow prices) as system trade-offs",
    "Understand sensitivity analysis and robustness (what changes break the plan?)",
    "Recognize convex vs non-convex structure and select appropriate methods",
    "Model discrete decisions via integer programming (placement/scheduling/bin packing)",
    "Implement optimization algorithms in code and validate results with sanity checks",
 ],

 topics: [
    "Linear programming: formulations, duality, sensitivity analysis",
    "Matrix games (optimization viewpoint)",
    "Integer programming: relaxations and branch-and-bound intuition",
    "Semidefinite programming and convex relaxations",
    "Nonlinear programming basics and optimality conditions",
    "Convex analysis/geometry; polyhedral geometry",
    "Calculus of variations and control connections",
    "Algorithm implementation (Matlab/Python-style workflows)",
 ],

 careerRelevance:
  "Optimization is everywhere in infrastructure: schedulers, traffic engineering, autoscaling, admission control, capacity planning, and cloud cost optimization. Engineers who can model objectives/constraints can justify decisions with math and ship better systems in Infra/Platform, SRE, Performance Engineering, and ML/Systems roles.",

 realWorldApplications: [
    "Cluster scheduling and bin-packing (placement, quotas, fairness constraints)",
    "Datacenter capacity planning (min cost subject to latency/availability constraints)",
    "Network routing/traffic engineering (flow formulations and relaxations)",
    "Load balancing and admission control (maximize throughput under SLO constraints)",
    "Cloud cost optimization (reserved/spot usage under risk constraints)",
    "Reliability-aware planning (redundancy vs cost via constraint-driven design)",
 ],

 resources: {
    videos: [
      "https://www.youtube.com/playlist?list=PLoROMvodv4rMJqxxviPa4AmDClvcbHi6h",
      "https://www.youtube.com/playlist?list=PLmsIjFudc1l0fBdbg4-GTE5lV5IqDh39u",
      "https://www.youtube.com/playlist?list=PLUl4u3cNGP62EWXnXJz6v4dKJg2Aq0S4M",
      "https://www.youtube.com/watch?v=zZAobExOMB0",
 ],
    websites: [
      "https://appliedmath.ucmerced.edu/undergraduate-education/math-courses",
      "https://web.stanford.edu/~boyd/cvxbook/",
      "https://developers.google.com/optimization",
 ],
    tools: [
      "Python: NumPy/SciPy + CVXPY",
      "OR-Tools (routing/assignment/CP-SAT/LP/MIP)",
      "Pyomo / PuLP (LP/MIP modeling)",
      "Gurobi/CPLEX (industry solvers)",
      "MATLAB optimization toolboxes",
 ],
 },

 additionalNotes:
  "Infra rule of thumb: define objective + constraints first (SLOs, budgets, fairness, reliability). Once the model is clear, you can swap solvers/approaches as needed.",
 },
 },
];

/**
 * Mechanical Engineering Course Data
 * Contains all courses and their prerequisites for the Mechanical Engineering degree program
 * Based on the UC Merced ME 4-year plan
 */
import { Course } from "@/types/course";

export const mechanicalEngineeringCourses: Course[] = [
  // ==================== FIRST YEAR - FALL ====================
  
  {
    id: "math-021",
    code: "MATH 021",
    name: "Calculus I",
    fullName: "MATH 021: Calculus I for Physical Sciences and Engineering",
    year: 1,
    semester: "fall",
    prerequisites: [],
    category: "Math",
  },
  
  {
    id: "phys-008",
    code: "PHYS 008",
    name: "Introductory Physics I",
    fullName: "PHYS 008: Introductory Physics I for Physical Sciences",
    year: 1,
    semester: "fall",
    prerequisites: [],
    category: "Physics",
  },
  {
    id: "phys-008l",
    code: "PHYS 008L",
    name: "Physics I Lab",
    fullName: "PHYS 008L: Introductory Physics I for Physical Sciences Lab",
    year: 1,
    semester: "fall",
    prerequisites: [],
    category: "Physics",
  },
  
  {
    id: "chem-002",
    code: "CHEM 002",
    name: "General Chemistry I",
    fullName: "CHEM 002: General Chemistry I",
    year: 1,
    semester: "fall",
    prerequisites: [],
    category: "Chemistry",
  },
  {
    id: "chem-002l",
    code: "CHEM 002L",
    name: "Chemistry I Lab",
    fullName: "CHEM 002L: General Chemistry I Lab",
    year: 1,
    semester: "fall",
    prerequisites: [],
    category: "Chemistry",
  },
  
  {
    id: "me-001",
    code: "ME 001",
    name: "Intro to Mechanical Engineering",
    fullName: "ME 001: Introduction to Mechanical Engineering",
    year: 1,
    semester: "fall",
    prerequisites: [],
    category: "ME Core",
  },
  
  {
    id: "sprk-010",
    code: "SPRK 010",
    name: "Spark Seminar",
    fullName: "SPRK 010: Spark Seminar or SPRK 001",
    year: 1,
    semester: "fall",
    prerequisites: [],
    category: "General Ed",
  },
  
  // ==================== FIRST YEAR - SPRING ====================
  
  {
    id: "math-022",
    code: "MATH 022",
    name: "Calculus II",
    fullName: "MATH 022: Calculus II for Physical Sciences and Engineering",
    year: 1,
    semester: "spring",
    prerequisites: ["math-021"],
    category: "Math",
  },
  
  {
    id: "phys-009",
    code: "PHYS 009",
    name: "Introductory Physics II",
    fullName: "PHYS 009: Introductory Physics II for Physical Sciences",
    year: 1,
    semester: "spring",
    prerequisites: ["phys-008", "math-021"],
    category: "Physics",
  },
  {
    id: "phys-009l",
    code: "PHYS 009L",
    name: "Physics II Lab",
    fullName: "PHYS 009L: Introductory Physics II for Physical Sciences Lab",
    year: 1,
    semester: "spring",
    prerequisites: ["phys-008l"],
    category: "Physics",
  },
  
  {
    id: "me-021",
    code: "ME 021",
    name: "Engineering Computing",
    fullName: "ME 021: Engineering Computing",
    year: 1,
    semester: "spring",
    prerequisites: [],
    category: "ME Core",
  },
  
  {
    id: "wri-010",
    code: "WRI 010",
    name: "College Reading & Composition",
    fullName: "WRI 010: College Reading and Composition",
    year: 1,
    semester: "spring",
    prerequisites: [],
    category: "General Ed",
  },
  
  {
    id: "engr-091",
    code: "ENGR 091",
    name: "Professional Development",
    fullName: "ENGR 091: Professional Development: People in an Engineered World",
    year: 1,
    semester: "spring",
    prerequisites: [],
    category: "Engineering",
  },
  
  // ==================== SECOND YEAR - FALL ====================
  
  {
    id: "math-024",
    code: "MATH 024",
    name: "Linear Algebra & Diff Eq",
    fullName: "MATH 024: Linear Algebra and Differential Equations",
    year: 2,
    semester: "fall",
    prerequisites: ["math-022"],
    category: "Math",
  },
  
  {
    id: "engr-045",
    code: "ENGR 045",
    name: "Introduction to Materials",
    fullName: "ENGR 045: Introduction to Materials",
    year: 2,
    semester: "fall",
    prerequisites: ["chem-002"],
    category: "Engineering",
  },
  {
    id: "engr-057",
    code: "ENGR 057",
    name: "Statics and Dynamics",
    fullName: "ENGR 057: Statics and Dynamics",
    year: 2,
    semester: "fall",
    prerequisites: ["phys-008", "math-022"],
    category: "Engineering",
  },
  
  {
    id: "gen-ed-area-b-fall-2",
    code: "GEN ED",
    name: "Area B",
    fullName: "General Education: Area B - Social Science, Literary Analysis, etc.",
    year: 2,
    semester: "fall",
    prerequisites: [],
    isCategory: true,
    category: "General Ed",
  },
  
  // ==================== SECOND YEAR - SPRING ====================
  
  {
    id: "math-023",
    code: "MATH 023",
    name: "Vector Calculus",
    fullName: "MATH 023: Vector Calculus",
    year: 2,
    semester: "spring",
    prerequisites: ["math-022"],
    category: "Math",
  },
  
  {
    id: "engr-120",
    code: "ENGR 120",
    name: "Fluid Mechanics",
    fullName: "ENGR 120: Fluid Mechanics",
    year: 2,
    semester: "spring",
    prerequisites: ["math-024", "engr-057"],
    category: "Engineering",
  },
  {
    id: "engr-151",
    code: "ENGR 151",
    name: "Strength of Materials",
    fullName: "ENGR 151: Strength of Materials",
    year: 2,
    semester: "spring",
    prerequisites: ["engr-057"],
    category: "Engineering",
  },
  
  {
    id: "gen-ed-area-a",
    code: "GEN ED",
    name: "Area A",
    fullName: "General Education: Area A - Life Science",
    year: 2,
    semester: "spring",
    prerequisites: [],
    isCategory: true,
    category: "General Ed",
  },
  
  // ==================== THIRD YEAR - FALL ====================
  
  {
    id: "math-032",
    code: "MATH 032",
    name: "Probability and Statistics",
    fullName: "MATH 032: Probability and Statistics",
    year: 3,
    semester: "fall",
    prerequisites: ["math-022"],
    category: "Math",
  },
  {
    id: "math-131",
    code: "MATH 131",
    name: "Numerical Methods",
    fullName: "MATH 131: Numerical Methods for Scientists and Engineers",
    year: 3,
    semester: "fall",
    prerequisites: ["math-024", "me-021"],
    category: "Math",
  },
  
  {
    id: "engr-130",
    code: "ENGR 130",
    name: "Thermodynamics",
    fullName: "ENGR 130: Thermodynamics",
    year: 3,
    semester: "fall",
    prerequisites: ["math-024", "phys-009"],
    category: "Engineering",
  },
  
  {
    id: "me-137",
    code: "ME 137",
    name: "Computer Aided Engineering",
    fullName: "ME 137: Computer Aided Engineering",
    year: 3,
    semester: "fall",
    prerequisites: ["me-021", "math-024"],
    category: "ME Core",
  },
  
  {
    id: "gen-ed-area-b-fall-3",
    code: "GEN ED",
    name: "Area B",
    fullName: "General Education: Area B - Social Science, Literary Analysis, etc.",
    year: 3,
    semester: "fall",
    prerequisites: [],
    isCategory: true,
    category: "General Ed",
  },
  
  // ==================== THIRD YEAR - SPRING ====================
  
  {
    id: "engr-065",
    code: "ENGR 065",
    name: "Circuit Theory",
    fullName: "ENGR 065: Circuit Theory",
    year: 3,
    semester: "spring",
    prerequisites: ["phys-009", "math-024"],
    category: "Engineering",
  },
  
  {
    id: "me-120",
    code: "ME 120",
    name: "Component Design",
    fullName: "ME 120: Component Design",
    year: 3,
    semester: "spring",
    prerequisites: ["engr-151", "math-024"],
    category: "ME Core",
  },
  
  {
    id: "engr-155",
    code: "ENGR 155",
    name: "Engineering Economic Analysis",
    fullName: "ENGR 155: Engineering Economic Analysis",
    year: 3,
    semester: "spring",
    prerequisites: [],
    category: "Engineering",
  },
  
  {
    id: "gen-ed-area-b-spring-3",
    code: "GEN ED",
    name: "Area B",
    fullName: "General Education: Area B - Social Science, Literary Analysis, etc.",
    year: 3,
    semester: "spring",
    prerequisites: [],
    isCategory: true,
    category: "General Ed",
  },
  
  // ==================== FOURTH YEAR - FALL ====================
  
  {
    id: "engr-135",
    code: "ENGR 135",
    name: "Heat Transfer",
    fullName: "ENGR 135: Heat Transfer",
    year: 4,
    semester: "fall",
    prerequisites: ["engr-120", "engr-130"],
    category: "Engineering",
  },
  
  {
    id: "engr-193",
    code: "ENGR 193",
    name: "Capstone Design I",
    fullName: "ENGR 193: Engineering Capstone Design I",
    year: 4,
    semester: "fall",
    prerequisites: ["me-120", "engr-130"],
    category: "Engineering",
  },
  
  {
    id: "tech-elective-1",
    code: "TECH ELEC",
    name: "Technical Elective",
    fullName: "Technical Elective - ME/AE/MSE/CEE Upper Division",
    year: 4,
    semester: "fall",
    prerequisites: [],
    isCategory: true,
    category: "Technical Electives",
  },
  
  {
    id: "gen-ed-area-b-fall-4",
    code: "GEN ED",
    name: "Area B",
    fullName: "General Education: Area B - Social Science, Literary Analysis, etc.",
    year: 4,
    semester: "fall",
    prerequisites: [],
    isCategory: true,
    category: "General Ed",
  },
  
  // ==================== FOURTH YEAR - SPRING ====================
  
  {
    id: "engr-194",
    code: "ENGR 194",
    name: "Capstone Design II",
    fullName: "ENGR 194: Engineering Capstone Design II",
    year: 4,
    semester: "spring",
    prerequisites: ["engr-193"],
    category: "Engineering",
  },
  
  {
    id: "me-140",
    code: "ME 140",
    name: "Vibration and Control",
    fullName: "ME 140: Vibration and Control",
    year: 4,
    semester: "spring",
    prerequisites: ["math-024", "me-137"],
    category: "ME Core",
  },
  
  {
    id: "tech-elective-2",
    code: "TECH ELEC",
    name: "Technical Elective",
    fullName: "Technical Elective - ME/AE/MSE/CEE Upper Division",
    year: 4,
    semester: "spring",
    prerequisites: [],
    isCategory: true,
    category: "Technical Electives",
  },
  
  {
    id: "tech-elective-3",
    code: "TECH ELEC",
    name: "Technical Elective",
    fullName: "Technical Elective - ME/AE/MSE/CEE Upper Division",
    year: 4,
    semester: "spring",
    prerequisites: [],
    isCategory: true,
    category: "Technical Electives",
  },
];

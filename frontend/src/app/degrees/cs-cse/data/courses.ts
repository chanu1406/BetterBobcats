/**
 * CS/CSE Course Data
 * Contains all courses and their prerequisites for the CS/CSE degree program
 */
import { Course } from "@/types/course";

export const cseCourses: Course[] = [
  // First Year - Fall
  {
    id: "math-021",
    code: "MATH 021",
    name: "Calculus I for Physical Sciences and Engineering",
    fullName: "MATH 021: Calculus I for Physical Sciences and Engineering",
    year: 1,
    semester: "fall",
    prerequisites: [],
  },
  {
    id: "wri-010",
    code: "WRI 010",
    name: "College Reading and Composition",
    fullName: "WRI 010: College Reading and Composition",
    year: 1,
    semester: "fall",
    prerequisites: [],
  },
  {
    id: "cse-022",
    code: "CSE 022",
    name: "Introduction to Programming",
    fullName: "CSE 022: Introduction to Programming",
    year: 1,
    semester: "fall",
    prerequisites: [],
  },
  {
    id: "spark",
    code: "SPRK",
    name: "SPRK 010 or SPRK 001",
    fullName: "SPRK 010 or SPRK 001: Spark Seminar",
    year: 1,
    semester: "fall",
    prerequisites: [],
  },

  // First Year - Spring
  {
    id: "math-022",
    code: "MATH 022",
    name: "Calculus II for Physical Sciences and Engineering",
    fullName: "MATH 022: Calculus II for Physical Sciences and Engineering",
    year: 1,
    semester: "spring",
    prerequisites: ["math-021"],
  },
  {
    id: "cse-015",
    code: "CSE 015",
    name: "Discrete Mathematics",
    fullName: "CSE 015: Discrete Mathematics",
    year: 1,
    semester: "spring",
    prerequisites: ["cse-022"],
  },
  {
    id: "cse-024",
    code: "CSE 024",
    name: "Advanced Programming",
    fullName: "CSE 024: Advanced Programming",
    year: 1,
    semester: "spring",
    prerequisites: ["cse-022"],
  },
  {
    id: "engr-091",
    code: "ENGR 091",
    name: "Professional Development: People in an Engineered World",
    fullName: "ENGR 091: Professional Development: People in an Engineered World",
    year: 1,
    semester: "spring",
    prerequisites: [],
  },

  // Second Year - Fall
  {
    id: "math-023",
    code: "MATH 023",
    name: "Vector Calculus",
    fullName: "MATH 023: Vector Calculus",
    year: 2,
    semester: "fall",
    prerequisites: ["math-022"],
  },
  {
    id: "math-032-or-engr-080",
    code: "MATH 032/ENGR 080",
    name: "MATH 032 or ENGR 080",
    fullName: "MATH 032: Probability and Statistics or ENGR 080: Statistical Modeling and Data Analysis",
    year: 2,
    semester: "fall",
    prerequisites: ["math-022"],
  },
  {
    id: "cse-030",
    code: "CSE 030",
    name: "Data Structures",
    fullName: "CSE 030: Data Structures",
    year: 2,
    semester: "fall",
    prerequisites: ["cse-015", "cse-024"],
  },
  {
    id: "gened-a-life",
    code: "GenED A-Life",
    name: "General Education Area A-Life Science",
    fullName: "General Education Area A-Life Science",
    year: 2,
    semester: "fall",
    prerequisites: ["cse-030"],
    isCategory: true,
  },

  // Second Year - Spring
  {
    id: "math-024",
    code: "MATH 024",
    name: "Linear Algebra and Differential Equations",
    fullName: "MATH 024: Linear Algebra and Differential Equations",
    year: 2,
    semester: "spring",
    prerequisites: ["math-022"],
  },
  {
    id: "cse-031",
    code: "CSE 031",
    name: "Computer Organization and Assembly Language",
    fullName: "CSE 031: Computer Organization and Assembly Language",
    year: 2,
    semester: "spring",
    prerequisites: ["cse-030"],
  },
  {
    id: "cse-100",
    code: "CSE 100",
    name: "Algorithm Design and Analysis",
    fullName: "CSE 100: Algorithm Design and Analysis",
    year: 2,
    semester: "spring",
    prerequisites: ["cse-030"],
  },
  {
    id: "gened-b",
    code: "GenED B",
    name: "General Education Area B",
    fullName: "General Education Area B",
    year: 2,
    semester: "spring",
    prerequisites: ["cse-015", "cse-024", "engr-091"],
    isCategory: true,
  },

  // Third Year - Fall
  {
    id: "phys-008",
    code: "PHYS 008 + 008L",
    name: "Introductory Physics I for Physical Sciences",
    fullName: "PHYS 008 + PHYS 008L: Introductory Physics I for Physical Sciences",
    year: 3,
    semester: "fall",
    prerequisites: [],
  },

  // Third Year - Spring
  {
    id: "phys-009",
    code: "PHYS 009 + 009L",
    name: "Introductory Physics II for Physical Sciences",
    fullName: "PHYS 009 + PHYS 009L: Introductory Physics II for Physical Sciences",
    year: 3,
    semester: "spring",
    prerequisites: ["phys-008"],
  },
  {
    id: "wri-upper-div",
    code: "WRI Upper Div",
    name: "Writing in the Discipline",
    fullName: "General Education: Writing in the Discipline",
    year: 3,
    semester: "spring",
    prerequisites: ["wri-010"],
  },

  // Fourth Year - Fall
  {
    id: "engr-065",
    code: "ENGR 065",
    name: "Circuit Theory",
    fullName: "ENGR 065: Circuit Theory",
    year: 4,
    semester: "fall",
    prerequisites: ["phys-008"],
  },
  // Fourth Year - Spring
  {
    id: "cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    year: 4,
    semester: "spring",
    prerequisites: ["cse-031", "cse-100"],
  },
  {
    id: "major-technical-elective",
    code: "Major Technical Elective",
    name: "Major Technical Elective",
    fullName: "Major Technical Elective",
    year: 3,
    semester: "fall",
    prerequisites: [
      "cse-030",
      "cse-100",
      "cse-031",
      "math-023",
      "math-024",
      "phys-008",
      "engr-065",
      "wri-upper-div",
    ],
    isCategory: true,
  },
  {
    id: "free-elective",
    code: "Free Elective",
    name: "Free Elective",
    fullName: "Free Elective",
    year: 4,
    semester: "spring",
    prerequisites: ["engr-065", "cse-120"],
    isCategory: true,
  },
];





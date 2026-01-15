/**
 * Political Science Course Data
 * Contains all courses and their prerequisites for the Political Science degree program
 */
import { Course } from "@/types/course";

export const politicalScienceCourses: Course[] = [
  // First Year - Fall
  {
    id: "poli-001",
    code: "POLI 001",
    name: "Introduction to American Politics",
    fullName: "POLI 001: Introduction to American Politics",
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
    id: "spark",
    code: "SPRK",
    name: "SPRK 001 or SPRK 010",
    fullName: "SPRK 001 or SPRK 010: Spark Seminar",
    year: 1,
    semester: "fall",
    prerequisites: [],
  },

  // First Year - Spring
  {
    id: "poli-010",
    code: "POLI 010",
    name: "Understanding Political Controversies",
    fullName: "POLI 010: Understanding Political Controversies",
    year: 1,
    semester: "spring",
    prerequisites: [],
  },
  {
    id: "poli-lower-div",
    code: "POLI Lower Division",
    name: "Lower Division POLI Major Course",
    fullName: "Lower Division POLI: Major Course",
    year: 1,
    semester: "spring",
    prerequisites: [],
  },

  // Second Year - Fall
  {
    id: "poli-lower-div-fall",
    code: "POLI Lower Division",
    name: "Lower Division POLI Major Course",
    fullName: "Lower Division POLI: Major Course",
    year: 2,
    semester: "fall",
    prerequisites: ["poli-001", "poli-010", "poli-lower-div"], // Connects from freshman POLI courses
  },
  {
    id: "poli-upper-div-american",
    code: "POLI Upper Division",
    name: "Upper Division American Politics",
    fullName: "Upper Division American Politics",
    year: 2,
    semester: "fall",
    prerequisites: ["poli-001", "poli-010"], // Connects from freshman POLI courses
  },

  // Second Year - Spring
  {
    id: "poli-upper-div-american-spring",
    code: "POLI Upper Division",
    name: "Upper Division American Politics",
    fullName: "Upper Division American Politics",
    year: 2,
    semester: "spring",
    prerequisites: ["poli-upper-div-american"], // Connects from fall upper division
  },
  {
    id: "poli-upper-div",
    code: "POLI Upper Division",
    name: "Upper Division POLI",
    fullName: "Upper Division POLI: Major Course",
    year: 2,
    semester: "spring",
    prerequisites: ["poli-lower-div-fall"], // Connects from lower division
  },

  // Third Year - Fall
  {
    id: "poli-upper-div-american-fall-y3",
    code: "POLI Upper Division",
    name: "Upper Division American Politics",
    fullName: "Upper Division American Politics",
    year: 3,
    semester: "fall",
    prerequisites: ["poli-upper-div-american-spring"], // Connects from Year 2 spring
  },
  {
    id: "poli-upper-div-breadth-fall",
    code: "POLI Upper Division",
    name: "Upper Division POLI Breadth",
    fullName: "Upper Division POLI Breadth",
    year: 3,
    semester: "fall",
    prerequisites: ["poli-upper-div"], // Connects from Year 2 spring
  },

  // Third Year - Spring
  {
    id: "poli-upper-div-american-spring-y3",
    code: "POLI Upper Division",
    name: "Upper Division American Politics",
    fullName: "Upper Division American Politics",
    year: 3,
    semester: "spring",
    prerequisites: ["poli-upper-div-american-fall-y3"], // Connects from Year 3 fall
  },
  {
    id: "poli-upper-div-breadth-spring",
    code: "POLI Upper Division",
    name: "Upper Division POLI Breadth",
    fullName: "Upper Division POLI Breadth",
    year: 3,
    semester: "spring",
    prerequisites: ["poli-upper-div-breadth-fall"], // Connects from Year 3 fall
  },

  // Fourth Year - Fall
  {
    id: "poli-upper-div-fall-y4",
    code: "POLI Upper Division",
    name: "Upper Division POLI",
    fullName: "Upper Division POLI: Major Course",
    year: 4,
    semester: "fall",
    prerequisites: ["poli-upper-div-american-spring-y3", "poli-upper-div-breadth-spring"], // Connects from Year 3 spring courses
  },
  {
    id: "wri-upper-div",
    code: "WRI Upper Division",
    name: "Upper Division Writing in the Discipline",
    fullName: "Upper Division Writing in the Discipline",
    year: 4,
    semester: "fall",
    prerequisites: ["wri-010"], // Connects from freshman writing course
  },

  // Fourth Year - Spring
  {
    id: "poli-upper-div-spring-y4",
    code: "POLI Upper Division",
    name: "Upper Division POLI",
    fullName: "Upper Division POLI: Major Course",
    year: 4,
    semester: "spring",
    prerequisites: ["poli-upper-div-fall-y4"], // Connects from Year 4 fall
  },
];

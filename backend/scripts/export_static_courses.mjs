#!/usr/bin/env node
/**
 * export_static_courses.mjs
 *
 * Reads the 5 per-degree courses.ts files, evaluates them as the source of
 * truth for seed data, and writes backend/data/static_courses.json.
 *
 * Usage:
 *   node backend/scripts/export_static_courses.mjs
 *
 * Run from the repo root. No extra dependencies — requires Node ≥ 18.
 *
 * Why vm.runInNewContext instead of dynamic import?
 * The .ts files use the "@/types/course" path alias which can't be resolved
 * outside the Next.js build context. We strip the two TypeScript-only lines
 * (the type import and the `: Course[]` annotation) and evaluate the
 * remainder as plain JavaScript — the data itself is pure JS object literals.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '../..');

/** Degree slug → { relative file path, name of the exported array } */
const DEGREES = [
  {
    slug: 'cs-cse',
    file: 'frontend/src/app/degrees/cs-cse/data/courses.ts',
    exportName: 'cseCourses',
  },
  {
    slug: 'electrical-engineering',
    file: 'frontend/src/app/degrees/electrical-engineering/data/courses.ts',
    exportName: 'electricalEngineeringCourses',
  },
  {
    slug: 'mechanical-engineering',
    file: 'frontend/src/app/degrees/mechanical-engineering/data/courses.ts',
    exportName: 'mechanicalEngineeringCourses',
  },
  {
    slug: 'cogs',
    file: 'frontend/src/app/degrees/cogs/data/courses.ts',
    exportName: 'cogsCourses',
  },
  {
    slug: 'political-science',
    file: 'frontend/src/app/degrees/political-science/data/courses.ts',
    exportName: 'politicalScienceCourses',
  },
];

/**
 * Loads a courses.ts file by:
 * 1. Stripping the type-only import (the only non-JS line at the top)
 * 2. Stripping the `: Course[]` type annotation on the export
 * 3. Removing the `export` keyword so the IIFE can capture the variable
 * 4. Evaluating in a fresh vm context and returning the array
 */
function loadCourseTs(filePath, exportName) {
  let src = readFileSync(filePath, 'utf8');

  // Strip: import { Course } from "@/types/course";
  src = src.replace(/^import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?\s*\n/gm, '');

  // Strip: : Course[]  (type annotation on the const declaration)
  src = src.replace(/:\s*Course\[\]/g, '');

  // Strip: `export` keyword so the variable becomes a regular `const`
  // inside the IIFE below and is accessible for the return statement.
  src = src.replace(/^export\s+/gm, '');

  // Wrap in an IIFE so block-scoped `const` is accessible to the return.
  const wrapped = `(function () {\n${src}\nreturn ${exportName};\n})()`;

  try {
    return vm.runInNewContext(wrapped);
  } catch (err) {
    throw new Error(`Failed to evaluate ${filePath}: ${err.message}`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

const allCourses = [];
let totalPerDegree = {};

for (const degree of DEGREES) {
  const filePath = resolve(REPO_ROOT, degree.file);
  const courses = loadCourseTs(filePath, degree.exportName);

  if (!Array.isArray(courses)) {
    throw new Error(`Expected array from ${degree.file}, got ${typeof courses}`);
  }

  for (const course of courses) {
    allCourses.push({ ...course, degree_slug: degree.slug });
  }

  totalPerDegree[degree.slug] = courses.length;
  console.log(`  ${degree.slug}: ${courses.length} courses`);
}

const outputDir = resolve(__dirname, '../data');
mkdirSync(outputDir, { recursive: true });

const outputPath = resolve(outputDir, 'static_courses.json');
writeFileSync(outputPath, JSON.stringify(allCourses, null, 2));

console.log(`\nWrote ${allCourses.length} total entries → ${outputPath}`);
console.log('(Includes cross-degree duplicates; seed_prerequisites.py deduplicates by course_code)');

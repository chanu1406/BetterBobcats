"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchSubjects, type CourseSubject } from "@/lib/courses";

// Popular subjects to highlight at the top
const POPULAR_SUBJECTS = ["CSE", "MATH", "PHYS", "CHEM", "BIO", "ECON", "PSY", "ENGR"];

// Subject card matching UCSB Plat style - shows full name + code
function SubjectCard({ subject }: { subject: CourseSubject }) {
    return (
        <Link
            href={`/courses/${subject.subject_code.toLowerCase()}`}
            className="flex items-center justify-between bg-card hover:bg-accent border border-border hover:border-primary rounded-lg px-4 py-3 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            <div className="flex-1 min-w-0">
                <h3 className="text-primary font-medium group-hover:text-primary/80 transition-colors truncate">
                    {subject.subject_name} - <span className="font-semibold">{subject.subject_code}</span>
                </h3>
            </div>
            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                <span className="text-muted-foreground text-sm">
                    {subject.course_count} course{subject.course_count !== 1 ? "s" : ""}
                </span>
                <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}

// Large featured card for popular subjects - shows full name + code
function FeaturedSubjectCard({ subject }: { subject: CourseSubject }) {
    return (
        <Link
            href={`/courses/${subject.subject_code.toLowerCase()}`}
            className="block bg-card hover:bg-accent border border-border hover:border-primary rounded-lg p-5 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground text-xs mb-1 truncate">{subject.subject_name}</p>
                    <h3 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                        {subject.subject_code}
                    </h3>
                </div>
                <svg
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
                {subject.course_count} course{subject.course_count !== 1 ? "s" : ""}
            </p>
        </Link>
    );
}

export default function CoursesPage() {
    const { data: subjects = [], isLoading, error, isError } = useQuery({
        queryKey: ["courseSubjects"],
        queryFn: fetchSubjects,
        staleTime: 10 * 60 * 1000,
    });

    // Separate popular and other subjects
    const popularSubjects = subjects.filter((s) =>
        POPULAR_SUBJECTS.includes(s.subject_code)
    );
    const otherSubjects = subjects.filter(
        (s) => !POPULAR_SUBJECTS.includes(s.subject_code)
    );

    // Group other subjects by first letter
    const groupedSubjects: Record<string, CourseSubject[]> = {};
    for (const subject of otherSubjects) {
        const letter = subject.subject_code[0].toUpperCase();
        if (!groupedSubjects[letter]) {
            groupedSubjects[letter] = [];
        }
        groupedSubjects[letter].push(subject);
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-2">Courses</h1>
                <p className="text-muted-foreground mb-8">
                    Browse courses by subject to find professors and schedules
                </p>

                {/* Error State */}
                {isError && (
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-destructive"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-destructive font-medium">
                                    Error loading courses:{" "}
                                    {error instanceof Error ? error.message : "Unknown error"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-muted-foreground">Loading courses...</p>
                    </div>
                ) : (
                    <>
                        {/* Popular Subjects */}
                        {popularSubjects.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-xl font-semibold mb-4">
                                    Popular
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {popularSubjects.map((subject) => (
                                        <FeaturedSubjectCard
                                            key={subject.subject_code}
                                            subject={subject}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Subjects by Letter */}
                        {Object.keys(groupedSubjects)
                            .sort()
                            .map((letter) => (
                                <div key={letter} className="mb-8">
                                    <h2 className="text-lg font-semibold mb-3">
                                        {letter}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {groupedSubjects[letter].map((subject) => (
                                            <SubjectCard
                                                key={subject.subject_code}
                                                subject={subject}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}

                        {/* Empty state */}
                        {subjects.length === 0 && !isLoading && (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground">
                                    No courses available yet. Check back soon!
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

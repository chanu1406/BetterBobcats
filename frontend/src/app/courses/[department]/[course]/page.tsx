"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchCourse, formatTime, formatDays, type CourseDetail, type CourseProfessor } from "@/lib/courses";

// Professor card with rating
function ProfessorCard({ professor }: { professor: CourseProfessor }) {
    return (
        <Link
            href={`/professors/${professor.id}`}
            className="flex items-center space-x-3 bg-white dark:bg-slate-900 hover:bg-blue-50 border border-gray-200 dark:border-slate-800 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 group"
        >
            {/* Avatar placeholder */}
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">
                    {professor.first_name[0]}{professor.last_name[0]}
                </span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-slate-100 font-medium group-hover:text-blue-600 transition-colors">
                    {professor.first_name} {professor.last_name}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    {professor.avg_rating && (
                        <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${professor.avg_rating >= 4
                                    ? "bg-green-100 text-green-800"
                                    : professor.avg_rating >= 3
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                        >
                            {professor.avg_rating.toFixed(1)}
                        </span>
                    )}
                    <span>{professor.num_ratings} rating{professor.num_ratings !== 1 ? 's' : ''}</span>
                </div>
            </div>
        </Link>
    );
}

// Term badge
function TermBadge({ term }: { term: string }) {
    // Parse term code like "202610" -> "Spring 2026"
    const year = term.substring(0, 4);
    const semCode = term.substring(4);
    let semester = "Term";
    if (semCode === "10") semester = "Spring";
    else if (semCode === "20") semester = "Summer";
    else if (semCode === "30") semester = "Fall";

    return (
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {semester} {year}
        </span>
    );
}

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = typeof params.course === "string" ? params.course : "";
    const department = typeof params.department === "string" ? params.department.toUpperCase() : "";

    const { data: course, isLoading, error, isError } = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => fetchCourse(courseId),
        enabled: !!courseId,
        staleTime: 10 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading course...</p>
                </div>
            </div>
        );
    }

    if (isError || !course) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <p className="text-red-700">
                            {isError && error instanceof Error
                                ? error.message
                                : "Course not found"}
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="text-blue-600 hover:underline mt-4 inline-block"
                    >
                        ← Back to courses
                    </Link>
                </div>
            </div>
        );
    }

    // Get unique terms from sections
    const terms = [...new Set(course.sections.map((s) => s.term))].sort().reverse();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6">
                    <ol className="flex items-center space-x-2 text-gray-500">
                        <li>
                            <Link
                                href="/courses"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Courses
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link
                                href={`/courses/${department.toLowerCase()}`}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {department}
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 dark:text-slate-100 font-medium">{course.course_code}</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-slate-800 mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                                {course.course_code}
                            </h1>
                            <p className="text-lg text-gray-700 dark:text-slate-300 mt-1">{course.title}</p>
                        </div>
                        {course.credits && (
                            <span className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1 rounded-lg text-sm font-medium">
                                {course.credits} credits
                            </span>
                        )}
                    </div>
                    {course.description && (
                        <p className="text-gray-600 mt-4">{course.description}</p>
                    )}
                </div>

                {/* Professors */}
                {course.professors.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">
                            Instructors
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.professors.map((prof) => (
                                <ProfessorCard key={prof.id} professor={prof} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Sections by Term */}
                {terms.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">
                            Sections
                        </h2>
                        {terms.map((term) => {
                            const termSections = course.sections.filter((s) => s.term === term);
                            return (
                                <div key={term} className="mb-6">
                                    <div className="flex items-center mb-3">
                                        <TermBadge term={term} />
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50 dark:bg-slate-950">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Section
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                        CRN
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Days
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Time
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Location
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200">
                                                {termSections.map((section) => (
                                                    <tr key={section.id}>
                                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-slate-100">
                                                            {section.section_number || "-"}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {section.crn}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {formatDays(section.meeting_days) || "-"}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {section.start_time
                                                                ? `${formatTime(section.start_time)} - ${formatTime(section.end_time)}`
                                                                : "-"}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {section.building && section.room
                                                                ? `${section.building} ${section.room}`
                                                                : "-"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty sections state */}
                {course.sections.length === 0 && (
                    <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                        <p className="text-gray-600">
                            No sections available for this course yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

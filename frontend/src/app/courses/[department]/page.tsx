"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    fetchCourses,
    formatTime,
    formatDays,
    type CourseWithProfessor,
} from "@/lib/courses";

// Course card with professor rating
function CourseCard({ course }: { course: CourseWithProfessor }) {
    const professorName =
        course.professor_first_name && course.professor_last_name
            ? `${course.professor_first_name} ${course.professor_last_name}`
            : null;

    const scheduleStr =
        course.meeting_days && course.start_time
            ? `${formatDays(course.meeting_days)} ${formatTime(course.start_time)} - ${formatTime(course.end_time)}`
            : null;

    return (
        <Link
            href={`/courses/${course.subject_code.toLowerCase()}/${course.id}`}
            className="block bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <h3 className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                        {course.course_code}
                    </h3>
                    <p className="text-gray-800 text-sm mt-1 line-clamp-2">
                        {course.title}
                    </p>

                    {/* Schedule info */}
                    {scheduleStr && (
                        <p className="text-gray-500 text-xs mt-2">
                            {scheduleStr}
                        </p>
                    )}

                    {/* Professor info */}
                    {professorName && (
                        <div className="flex items-center mt-3 space-x-2">
                            <span className="text-gray-600 text-sm">
                                {professorName}
                            </span>
                            {course.professor_rating && (
                                <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${course.professor_rating >= 4
                                        ? "bg-green-100 text-green-800"
                                        : course.professor_rating >= 3
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {course.professor_rating.toFixed(1)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Credits badge */}
                {course.credits && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded ml-2 flex-shrink-0">
                        {course.credits} cr
                    </span>
                )}
            </div>
        </Link>
    );
}

export default function DepartmentCoursesPage() {
    const params = useParams();
    const department = typeof params.department === "string" ? params.department.toUpperCase() : "";

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["courses", department],
        queryFn: () => fetchCourses({ subject: department, pageSize: 1000 }),
        enabled: !!department,
        staleTime: 10 * 60 * 1000,
    });

    // Group courses by course number (e.g., 100-level, 200-level)
    const groupedCourses: Record<string, CourseWithProfessor[]> = {};
    for (const course of data?.courses || []) {
        const num = parseInt(course.course_number, 10);
        let level = "Other";
        if (!isNaN(num)) {
            const levelNum = Math.floor(num / 100) * 100;
            level = levelNum === 0 ? "Lower Division" : `${levelNum}-Level`;
        }
        if (!groupedCourses[level]) {
            groupedCourses[level] = [];
        }
        groupedCourses[level].push(course);
    }

    // Sort levels numerically
    const sortedLevels = Object.keys(groupedCourses).sort((a, b) => {
        const aNum = parseInt(a, 10) || 999;
        const bNum = parseInt(b, 10) || 999;
        return aNum - bNum;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
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
                        <li className="text-gray-900 font-medium">{department}</li>
                    </ol>
                </nav>

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {department} Courses
                </h1>
                <p className="text-gray-600 mb-8">
                    {data?.totalCount || 0} course{data?.totalCount !== 1 ? "s" : ""} available
                </p>

                {/* Error State */}
                {isError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                        <p className="text-sm text-red-700">
                            Error loading courses:{" "}
                            {error instanceof Error ? error.message : "Unknown error"}
                        </p>
                    </div>
                )}

                {/* Loading */}
                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading courses...</p>
                    </div>
                ) : (
                    <>
                        {/* Courses by Level */}
                        {sortedLevels.map((level) => (
                            <div key={level} className="mb-10">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                    {level}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {groupedCourses[level].map((course) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Empty state */}
                        {data?.courses.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-600">
                                    No courses found for {department}.
                                </p>
                                <Link
                                    href="/courses"
                                    className="text-blue-600 hover:underline mt-2 inline-block"
                                >
                                    Browse all subjects
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

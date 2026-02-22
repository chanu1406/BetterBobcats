"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    fetchCourses,
    fetchDepartmentProfessors,
    formatTime,
    SUBJECT_NAMES,
    type CourseWithProfessor,
    type DepartmentProfessor,
} from "@/lib/courses";

// Rating badge with color coding
function RatingBadge({ rating }: { rating: number | null }) {
    if (!rating) return null;

    const colorClass =
        rating >= 4
            ? "bg-green-500 text-white"
            : rating >= 3
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white";

    return (
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold ${colorClass}`}>
            {rating.toFixed(1)}
        </span>
    );
}

// Professor avatar with photo support
function ProfessorAvatar({ firstName, lastName, photoUrl, size = "md" }: {
    firstName: string;
    lastName: string;
    photoUrl?: string | null;
    size?: "sm" | "md" | "lg";
}) {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-16 h-16 text-lg",
        lg: "w-20 h-20 text-xl",
    };

    if (photoUrl) {
        return (
            <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className={`${sizeClasses[size].split(' ').slice(0, 2).join(' ')} rounded-full object-cover shadow-md`}
                onError={(e) => {
                    // Fall back to initials on image load error
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                }}
            />
        );
    }

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md`}>
            {initials}
        </div>
    );
}

// Professor carousel item
function ProfessorCarouselItem({ professor }: { professor: DepartmentProfessor }) {
    return (
        <Link
            href={`/professors/${professor.id}`}
            className="flex-shrink-0 w-24 flex flex-col items-center text-center group"
        >
            <div className="relative mb-2 transform group-hover:scale-105 transition-transform">
                <ProfessorAvatar
                    firstName={professor.first_name}
                    lastName={professor.last_name}
                    photoUrl={professor.photo_url}
                />
                {professor.avg_rating && (
                    <div className="absolute -bottom-1 -right-1">
                        <RatingBadge rating={professor.avg_rating} />
                    </div>
                )}
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors truncate w-full">
                {professor.last_name}
            </span>
        </Link>
    );
}

// Professor carousel section
function ProfessorCarousel({ professors, department }: { professors: DepartmentProfessor[]; department: string }) {
    if (professors.length === 0) return null;

    return (
        <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                    Professors in this Department
                </h2>
                <Link
                    href={`/professors`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                    See all
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                {professors.map((prof) => (
                    <ProfessorCarouselItem key={prof.id} professor={prof} />
                ))}
            </div>
        </div>
    );
}

// Day indicator circles (UCSB Plat style)
function DayIndicators({ days }: { days: string }) {
    const allDays = [
        { key: "M", label: "M" },
        { key: "T", label: "T" },
        { key: "W", label: "W" },
        { key: "R", label: "R" },
        { key: "F", label: "F" },
    ];

    return (
        <div className="flex items-center gap-1">
            {allDays.map(({ key, label }) => (
                <span
                    key={key}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${days.includes(key)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                        }`}
                >
                    {label}
                </span>
            ))}
        </div>
    );
}

// Enhanced course card matching UCSB Plat style
function CourseCard({ course }: { course: CourseWithProfessor }) {
    const professorName =
        course.professor_first_name && course.professor_last_name
            ? `${course.professor_first_name} ${course.professor_last_name}`
            : null;

    const timeStr =
        course.start_time
            ? `${formatTime(course.start_time)} - ${formatTime(course.end_time)}`
            : null;

    return (
        <Link
            href={`/courses/${course.subject_code.toLowerCase()}/${course.id}`}
            className="block bg-card hover:bg-accent border border-border hover:border-primary rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-lg group"
        >
            {/* Header row: Course code + credits */}
            <div className="flex items-start justify-between">
                <h3 className="text-primary font-bold text-lg group-hover:text-primary/80 transition-colors">
                    {course.course_code}
                </h3>
                {course.credits && (
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        {course.credits} units
                    </span>
                )}
            </div>

            {/* Course title */}
            <p className="text-foreground font-medium mt-1 line-clamp-2">
                {course.title}
            </p>

            {/* Professor info with avatar */}
            {professorName && (
                <div className="flex items-center mt-3 gap-2">
                    <ProfessorAvatar
                        firstName={course.professor_first_name!}
                        lastName={course.professor_last_name!}
                        photoUrl={course.professor_photo_url}
                        size="sm"
                    />
                    <span className="text-muted-foreground text-sm font-medium">
                        {professorName}
                    </span>
                    <RatingBadge rating={course.professor_rating} />
                </div>
            )}

            {/* No professor assigned */}
            {!professorName && (
                <p className="text-muted-foreground text-sm mt-3 italic">
                    Instructor TBA
                </p>
            )}

            {/* Schedule: Day indicators + time */}
            {course.meeting_days && (
                <div className="flex items-center gap-3 mt-3">
                    <DayIndicators days={course.meeting_days} />
                    {timeStr && (
                        <span className="text-muted-foreground text-sm">{timeStr}</span>
                    )}
                </div>
            )}
        </Link>
    );
}

export default function DepartmentCoursesPage() {
    const params = useParams();
    const department = typeof params.department === "string" ? params.department.toUpperCase() : "";
    const departmentName = SUBJECT_NAMES[department] || department;

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["courses", department],
        queryFn: () => fetchCourses({ subject: department, pageSize: 1000 }),
        enabled: !!department,
        staleTime: 10 * 60 * 1000,
    });

    const { data: professors = [] } = useQuery({
        queryKey: ["departmentProfessors", department],
        queryFn: () => fetchDepartmentProfessors(department),
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
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6">
                    <ol className="flex items-center space-x-2 text-muted-foreground">
                        <li>
                            <Link
                                href="/courses"
                                className="hover:text-primary transition-colors"
                            >
                                Courses
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-primary font-medium">{department}</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        {departmentName}
                        <span className="text-primary ml-2">- {department}</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {data?.totalCount || 0} course{data?.totalCount !== 1 ? "s" : ""} available
                        {professors.length > 0 && (
                            <span className="mx-2">•</span>
                        )}
                        {professors.length > 0 && (
                            <span>{professors.length} professor{professors.length !== 1 ? "s" : ""}</span>
                        )}
                    </p>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-8 rounded-r-lg">
                        <p className="text-sm text-destructive font-medium">
                            Error loading courses:{" "}
                            {error instanceof Error ? error.message : "Unknown error"}
                        </p>
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
                        {/* Professor Carousel */}
                        <ProfessorCarousel professors={professors} department={department} />

                        {/* Courses by Level */}
                        {sortedLevels.map((level) => (
                            <div key={level} className="mb-10">
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg">
                                        {level}
                                    </span>
                                    <span className="ml-3 text-sm font-normal text-muted-foreground">
                                        {groupedCourses[level].length} course{groupedCourses[level].length !== 1 ? "s" : ""}
                                    </span>
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
                            <div className="text-center py-20 bg-card text-card-foreground rounded-xl shadow-sm border border-border">
                                <p className="text-muted-foreground">
                                    No courses found for {department}.
                                </p>
                                <Link
                                    href="/courses"
                                    className="text-primary hover:underline mt-2 inline-block"
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

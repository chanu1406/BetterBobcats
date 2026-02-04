"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchProfessors, fetchDepartments, type Professor } from "@/lib/professors";

// Star rating component
function StarRating({ rating, size = "md" }: { rating: number | null; size?: "sm" | "md" | "lg" }) {
    if (rating === null) return <span className="text-gray-400 text-sm">N/A</span>;

    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const starClasses = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    }[size];
    const textClasses = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
    }[size];

    return (
        <div className="flex items-center gap-1">
            <span className={`${textClasses} font-bold text-yellow-500`}>{rating.toFixed(1)}</span>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`${starClasses} ${i < fullStars
                                ? "text-yellow-400"
                                : i === fullStars && hasHalf
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        </div>
    );
}

// Professor card
function ProfessorCard({ professor }: { professor: Professor }) {
    return (
        <Link
            href={`/professors/${professor.id}`}
            className="flex gap-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            {/* Avatar placeholder */}
            <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
            </div>

            <div className="flex-1 min-w-0">
                {/* Name */}
                <h3 className="text-blue-600 font-semibold text-lg group-hover:text-blue-700 transition-colors truncate">
                    {professor.first_name} {professor.last_name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={professor.avg_rating} size="sm" />
                    <span className="text-gray-500 text-sm">
                        ({professor.num_ratings} review{professor.num_ratings !== 1 ? "s" : ""})
                    </span>
                </div>

                {/* Department */}
                <p className="text-gray-600 text-sm mt-1">{professor.department_name}</p>
            </div>
        </Link>
    );
}

export default function DepartmentProfessorsPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Fetch department info
    const { data: departments = [] } = useQuery({
        queryKey: ["departments"],
        queryFn: fetchDepartments,
        staleTime: 10 * 60 * 1000,
    });

    const department = departments.find((d) => d.slug === slug);

    // Fetch professors for this department
    const { data: professorsData, isLoading } = useQuery({
        queryKey: ["professors", "department", slug],
        queryFn: () =>
            fetchProfessors({
                departmentSlug: slug,
                sortBy: "rating",
                sortOrder: "desc",
                pageSize: 500,
            }),
        staleTime: 5 * 60 * 1000,
    });

    const professors = professorsData?.professors || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link href="/professors" className="text-blue-600 hover:text-blue-700 text-sm">
                        ← All professors
                    </Link>
                </div>

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {department?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </h1>
                <p className="text-gray-600 mb-8">
                    {professors.length} professor{professors.length !== 1 ? "s" : ""} found
                </p>

                {/* Loading */}
                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading professors...</p>
                    </div>
                ) : professors.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600">No professors found in this department.</p>
                    </div>
                ) : (
                    /* Professors Grid - 2 columns */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {professors.map((prof) => (
                            <ProfessorCard key={prof.id} professor={prof} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchProfessor } from "@/lib/professors";

// Star rating component
function StarRating({ rating, size = "lg" }: { rating: number | null; size?: "sm" | "md" | "lg" }) {
    if (rating === null) return <span className="text-gray-400">No ratings</span>;

    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const starClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    }[size];
    const textClasses = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-4xl",
    }[size];

    return (
        <div className="flex items-center gap-2">
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
            <span className="text-gray-500 text-sm ml-1">{rating.toFixed(1)} / 5</span>
        </div>
    );
}

// Stat badge component
function StatBadge({ label, value, color = "gray" }: { label: string; value: string | number; color?: "yellow" | "green" | "red" | "blue" | "gray" }) {
    const colorClasses = {
        yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
        green: "bg-green-50 text-green-700 border-green-200",
        red: "bg-red-50 text-red-700 border-red-200",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        gray: "bg-gray-50 text-gray-700 border-gray-200",
    }[color];

    return (
        <div className={`px-4 py-3 rounded-lg border ${colorClasses}`}>
            <p className="text-xs uppercase tracking-wide opacity-70 mb-1">{label}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
}

export default function ProfessorDetailPage() {
    const params = useParams();
    const professorId = params.id as string;

    const { data: professor, isLoading, error } = useQuery({
        queryKey: ["professor", professorId],
        queryFn: () => fetchProfessor(professorId),
        enabled: !!professorId,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading professor...</p>
                </div>
            </div>
        );
    }

    if (error || !professor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Professor Not Found</h1>
                    <Link href="/professors" className="text-blue-600 hover:text-blue-700">
                        ← Back to Professors
                    </Link>
                </div>
            </div>
        );
    }

    const wouldTakeAgain = professor.would_take_again_percent;
    const deptSlug = professor.department_name?.toLowerCase().replace(/\s+/g, "-") || "";

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-8">
                    <Link href="/professors" className="text-blue-600 hover:text-blue-700">
                        Professors
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href={`/professors/department/${deptSlug}`} className="text-blue-600 hover:text-blue-700">
                        {professor.department_name}
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">{professor.first_name} {professor.last_name}</span>
                </nav>

                {/* Professor Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Photo */}
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                {professor.first_name} {professor.last_name}
                            </h1>
                            <p className="text-gray-600 mb-3">{professor.department_name}</p>

                            <div className="mb-2">
                                <StarRating rating={professor.avg_rating} />
                            </div>
                            <p className="text-gray-500 text-sm">
                                Based on {professor.num_ratings} review{professor.num_ratings !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <StatBadge
                        label="Overall Rating"
                        value={professor.avg_rating?.toFixed(1) || "N/A"}
                        color="yellow"
                    />
                    <StatBadge
                        label="Difficulty"
                        value={professor.avg_difficulty?.toFixed(1) || "N/A"}
                        color={professor.avg_difficulty && professor.avg_difficulty <= 3 ? "green" : "red"}
                    />
                    <StatBadge
                        label="Would Take Again"
                        value={wouldTakeAgain !== null ? `${wouldTakeAgain.toFixed(0)}%` : "N/A"}
                        color={wouldTakeAgain !== null && wouldTakeAgain >= 50 ? "green" : "red"}
                    />
                    <StatBadge
                        label="Total Reviews"
                        value={professor.num_ratings}
                        color="blue"
                    />
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-gray-700 mb-4">
                            Individual reviews are available on RateMyProfessors. Click below to view detailed student feedback, course-specific ratings, and more.
                        </p>
                        <a
                            href={`https://www.ratemyprofessors.com/search/professors?q=${encodeURIComponent(professor.first_name + " " + professor.last_name)}&sid=U2Nob29sLTQ3Njc=`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            View Reviews on RateMyProfessors
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

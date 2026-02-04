"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchDepartments, type Department } from "@/lib/professors";

// Department card matching BetterBobcats light theme
function DepartmentCard({ department }: { department: Department }) {
    return (
        <Link
            href={`/professors/department/${department.slug}`}
            className="block bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    {department.name}
                </h3>
                <span className="text-gray-500 text-sm">
                    {department.professor_count} professor{department.professor_count !== 1 ? "s" : ""}
                </span>
            </div>
        </Link>
    );
}

export default function ProfessorsPage() {
    const { data: departments = [], isLoading, error, isError } = useQuery({
        queryKey: ["departments"],
        queryFn: fetchDepartments,
        staleTime: 10 * 60 * 1000,
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Professors</h1>
                <p className="text-gray-600 mb-8">Browse professors by department</p>

                {/* Error State */}
                {isError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    Error loading departments: {error instanceof Error ? error.message : "Unknown error"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading departments...</p>
                    </div>
                ) : (
                    /* Departments Grid - 3 columns */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {departments.map((dept) => (
                            <DepartmentCard key={dept.id} department={dept} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

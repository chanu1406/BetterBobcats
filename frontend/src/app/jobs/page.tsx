"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@/lib/supabase/browser";

/**
 * Job Search Board Page
 * Reads from the `jobs` Supabase table (populated by the hourly scraper).
 * Located at: src/app/jobs/page.tsx
 * URL: http://localhost:3000/jobs
 */

interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  application_url: string;
  source: string;
  degree_category: string;
  tags: string[];
  created_at: string;
}

interface FilterState {
  isCalifornia: boolean;
  isRemote: boolean;
  degree: string;
}

const PAGE_SIZE = 50;

const SOURCE_LABELS: Record<string, string> = {
  scraped_tech: "Tech",
  scraped_research: "Research",
  user_submitted: "Community",
};

export default function JobSearchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    isCalifornia: false,
    isRemote: false,
    degree: "All",
  });

  const offsetRef = useRef(0);
  const supabase = useMemo(() => createClient(), []);

  function buildQuery(startOffset: number) {
    let query = supabase
      .from("jobs")
      .select(
        "id, company, role, location, application_url, source, degree_category, tags, created_at",
        { count: "exact" }
      )
      .eq("is_active", true)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .range(startOffset, startOffset + PAGE_SIZE - 1);

    if (filters.degree !== "All") {
      query = query.eq("degree_category", filters.degree);
    }
    if (filters.isCalifornia) {
      query = query.contains("tags", ["California"]);
    }
    if (filters.isRemote) {
      query = query.contains("tags", ["Remote"]);
    }

    return query;
  }

  async function fetchInitial() {
    setLoading(true);
    setError(null);
    offsetRef.current = 0;

    try {
      const { data, error: qError, count } = await buildQuery(0);
      if (qError) throw new Error(qError.message);

      setJobs(data ?? []);
      offsetRef.current = data?.length ?? 0;
      setTotalCount(count ?? 0);
      setHasMore((data?.length ?? 0) < (count ?? 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const { data, error: qError } = await buildQuery(offsetRef.current);
      if (qError) throw new Error(qError.message);

      setJobs((prev) => [...prev, ...(data ?? [])]);
      offsetRef.current += data?.length ?? 0;
      setHasMore(offsetRef.current < totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more jobs");
    } finally {
      setLoading(false);
    }
  }

  // Re-fetch from scratch whenever filters change (including initial mount)
  useEffect(() => {
    fetchInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Client-side search narrows the already-loaded results
  const filteredJobs = searchTerm
    ? jobs.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : jobs;

  function getTagColor(tag: string): string {
    const tagColors: Record<string, string> = {
      Tech: "bg-blue-50 text-blue-700 border border-blue-200 font-semibold",
      Research: "bg-green-50 text-green-700 border border-green-200 font-semibold",
      Community: "bg-orange-50 text-orange-700 border border-orange-200 font-semibold",
      Internship: "bg-blue-50 text-blue-600 border border-blue-100",
      Remote: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      California: "bg-purple-50 text-purple-600 border border-purple-100",
      "Out-of-State": "bg-amber-50 text-amber-600 border border-amber-100",
    };
    return tagColors[tag] ?? "bg-slate-50 text-slate-600 border border-slate-100";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-4xl font-bold text-slate-900">
              Summer 2026 Internships &amp; Jobs
            </h1>
            <button
              onClick={fetchInitial}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
          <p className="text-lg text-slate-600 mb-8">
            Browse tech internship and job opportunities for Summer 2026
          </p>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Data Source</h3>
                <p className="text-sm text-blue-800">
                  Jobs are scraped hourly from community-maintained GitHub repositories and
                  stored in our database. Listings are pre-filtered for quality. Non-tech majors
                  may find limited results — check back regularly as new opportunities are added
                  daily.
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <a
                href="/submit-job"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                <span>🧠</span>
                <span>Know of an opportunity? Submit a job →</span>
              </a>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter Jobs</h2>

            {/* Search Bar */}
            <div className="mb-4">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by company, role, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="california"
                    type="checkbox"
                    checked={filters.isCalifornia}
                    onChange={(e) =>
                      setFilters({ ...filters, isCalifornia: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="california" className="ml-2 text-sm text-slate-700">
                    California Only
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="remote"
                    type="checkbox"
                    checked={filters.isRemote}
                    onChange={(e) =>
                      setFilters({ ...filters, isRemote: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remote" className="ml-2 text-sm text-slate-700">
                    Remote Only
                  </label>
                </div>
              </div>

              {/* Degree Dropdown */}
              <div>
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Filter by Degree
                </label>
                <select
                  id="degree"
                  value={filters.degree}
                  onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="All">All Degrees</option>
                  <option value="CS">Computer Science / Software</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="Bio">Biology / Biomedical</option>
                  <option value="Nursing">Nursing / Health</option>
                  <option value="Business">Business / Finance</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ isCalifornia: false, isRemote: false, degree: "All" });
                  }}
                  className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && jobs.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading jobs...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No jobs found. Try adjusting your filters.</p>
            </div>
          )}

          {/* No results after search */}
          {!loading && !error && jobs.length > 0 && filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-slate-600">
                No jobs match your search. Try a different keyword.
              </p>
            </div>
          )}

          {/* Job grid */}
          {filteredJobs.length > 0 && (
            <>
              <div className="mb-4 text-sm text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">{filteredJobs.length}</span>{" "}
                {searchTerm ? "matching " : ""}
                of{" "}
                <span className="font-semibold text-slate-900">{totalCount}</span>{" "}
                opportunities
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                  const sourceLabel = SOURCE_LABELS[job.source] ?? job.source;
                  const companyInitial = job.company.charAt(0).toUpperCase();

                  return (
                    <div
                      key={job.id}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center text-xl font-bold text-blue-600 flex-shrink-0">
                            {companyInitial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-sm font-medium text-slate-500 truncate"
                              title={job.company}
                            >
                              {job.company}
                            </h3>
                          </div>
                        </div>

                        {job.application_url && (
                          <a
                            href={job.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 p-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0"
                            title="Apply now"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </div>

                      {/* Job Title */}
                      <h2
                        className="text-lg font-bold text-slate-900 mb-3 break-words overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          minHeight: "3.5rem",
                        }}
                        title={job.role}
                      >
                        {job.role}
                      </h2>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-slate-400 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate" title={job.location}>
                          {job.location}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${getTagColor(
                            sourceLabel
                          )}`}
                        >
                          {sourceLabel}
                        </span>
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${getTagColor(
                              tag
                            )}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* No link fallback */}
                      {!job.application_url && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <button
                            disabled
                            className="w-full py-2.5 px-4 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg cursor-not-allowed"
                          >
                            Application Unavailable
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              {hasMore && !searchTerm && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {loading ? "Loading..." : `Load More (${totalCount - jobs.length} remaining)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

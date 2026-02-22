"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browser";

/**
 * Job Search Board Page
 * Displays job opportunities and internships for UC Merced students
 * Located at: src/app/jobs/page.tsx
 * URL: http://localhost:3000/jobs
 */

interface Job {
  id: string | number;
  company: string;
  role: string;
  location: string;
  application_url: string;
  source: string;
  degree_category: string;
  tags: string[];
  scraped_at: string;
}

interface FilterState {
  isCalifornia: boolean;
  isRemote: boolean;
  degree: string;
}

export default function JobSearchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    isCalifornia: false,
    isRemote: false,
    degree: "All",
  });

  const supabase = createClient();

  // Fetch jobs function (extracted so we can call it from refresh button)
  async function fetchJobs() {
    try {
      setLoading(true);
      setError(null);

      // Fetch active and approved jobs from Supabase
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .eq('is_approved', true) // Added safety check in case manual approvals are used
        .order('scraped_at', { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const allJobs = (data as Job[]) || [];
      setJobs(allJobs);

      // Find the most recent scraped_at time for the 'Last updated' label
      if (allJobs.length > 0 && allJobs[0].scraped_at) {
        setLastUpdated(new Date(allJobs[0].scraped_at));
      } else {
        setLastUpdated(new Date());
      }

      setError(null);
      console.log(`✅ Fetched ${allJobs.length} jobs from Supabase`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred fetching jobs");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []); // Run once on mount

  // Filter jobs based on search term and filters
  function filterJobs(jobsList: Job[]): Job[] {
    return jobsList.filter((job) => {
      // Search term filter (company, role, location)
      const matchesSearch =
        searchTerm === "" ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      // California filter
      const matchesCalifornia =
        !filters.isCalifornia ||
        job.location.includes("CA") ||
        job.location.toLowerCase().includes("california") ||
        job.location.toLowerCase().includes("san francisco") ||
        job.location.toLowerCase().includes("los angeles") ||
        job.location.toLowerCase().includes("san diego") ||
        job.location.toLowerCase().includes("san jose");

      // Remote filter
      const matchesRemote =
        !filters.isRemote || job.location.toLowerCase().includes("remote");

      // Degree filter
      let matchesDegree = true;
      if (filters.degree !== "All") {
        // Use the pre-calculated degree_category from the database if available
        if (job.degree_category) {
          matchesDegree = job.degree_category === filters.degree;
        } else {
          // Fallback to legacy strict text matching if missing
          const roleLower = job.role.toLowerCase();
          if (filters.degree === "CS") {
            matchesDegree = (roleLower.includes("software") || roleLower.includes("developer")) && !roleLower.includes("hardware");
          } else if (filters.degree === "Bio") {
            matchesDegree = roleLower.includes("bio") && !roleLower.includes("software");
          } else if (filters.degree === "EE") {
            matchesDegree = roleLower.includes("electrical") || roleLower.includes("hardware");
          } else if (filters.degree === "ME") {
            matchesDegree = roleLower.includes("mechanical") || roleLower.includes("manufacturing");
          }
        }
      }

      return matchesSearch && matchesCalifornia && matchesRemote && matchesDegree;
    });
  }

  const filteredJobs = filterJobs(jobs);

  // Helper function to get tag color based on tag type (soft pastels)
  function getTagColor(tag: string): string {
    const tagColors: { [key: string]: string } = {
      // Source tags
      "scraped_tech": "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold",
      "scraped_research": "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 font-semibold",
      "Business": "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 font-semibold",

      // Job type tags
      "Internship": "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900",
      "Remote": "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900",
      "California": "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900",
      "Out-of-State": "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900",
      "Software": "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900",
      "Data": "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900",
      "AI/ML": "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900",
      "Frontend": "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900",
      "Backend": "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900",
      "Full Stack": "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900",
    };
    return tagColors[tag] || "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700";
  }

  // Format label for source display
  function formatSourceName(source: string): string {
    if (source === 'scraped_tech') return 'Tech';
    if (source === 'scraped_research') return 'Research';
    return source;
  }

  // Format last updated time
  function formatLastUpdated(date: Date | null): string {
    if (!date) return "Never";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-4xl font-bold mb-2">
              Summer 2026 Internships & Jobs
            </h1>
            <button
              onClick={fetchJobs}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {loading ? "Refreshing..." : "Refresh Jobs"}
            </button>
          </div>
          <div className="flex items-center gap-3 mb-8">
            <p className="text-lg text-muted-foreground">
              Browse internship and job opportunities for Summer 2026
            </p>
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">
                • Last updated: {formatLastUpdated(lastUpdated)}
              </span>
            )}
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Data Source</h3>
                <p className="text-sm text-blue-800">
                  Jobs are automatically updated hourly from curated repositories like the <a href="https://github.com/SimplifyJobs/Summer2025-Internships" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">SimplifyJobs GitHub repository</a>,
                  which primarily focuses on <strong>tech roles</strong> (Software Engineering, Data Science, Hardware Engineering).
                  Non-tech majors may find limited results, but we recommend using the search bar or checking back regularly.
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <a
                href="/submit-job"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                <span>🧠</span>
                <span>Brainiac Bobcats: Submit a job opportunity →</span>
              </a>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="bg-card text-card-foreground rounded-lg border border-border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Filter Jobs
            </h2>

            {/* Search Bar */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium mb-2">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by company, role, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                  <label htmlFor="california" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
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
                  <label htmlFor="remote" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                    Remote Only
                  </label>
                </div>
              </div>

              {/* Degree Dropdown */}
              <div>
                <label htmlFor="degree" className="block text-sm font-medium mb-2">
                  Filter by Degree
                </label>
                <select
                  id="degree"
                  value={filters.degree}
                  onChange={(e) =>
                    setFilters({ ...filters, degree: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                >
                  <option value="All">All Degrees</option>
                  <option value="CS">Computer Science / Software</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="Bio">Biology / Biomedical</option>
                </select>
                <p className="mt-1 text-xs text-muted-foreground">
                  Note: This data focuses primarily on tech roles
                </p>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      isCalifornia: false,
                      isRemote: false,
                      degree: "All",
                    });
                  }}
                  className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-600">Loading jobs...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs found in the database.</p>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-card text-card-foreground rounded-lg border border-border shadow-sm">
              <p className="text-muted-foreground">
                No jobs match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}

          {!loading && !error && filteredJobs.length > 0 && (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> of <span className="font-semibold text-foreground">{jobs.length}</span> internship opportunities
              </div>

              {/* Modern Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                  const jobTags = job.tags || [];
                  const companyInitial = job.company ? job.company.charAt(0).toUpperCase() : '?';

                  return (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
                    >
                      {/* Header with Logo and Apply Button */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Company Logo Placeholder */}
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
                            {companyInitial}
                          </div>

                          {/* Company Name */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-muted-foreground truncate" title={job.company}>
                              {job.company}
                            </h3>
                          </div>
                        </div>

                        {/* Apply Button - Top Right */}
                        {job.application_url && (
                          <a
                            href={job.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 p-2 border-2 border-primary text-primary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors flex-shrink-0"
                            title="Apply now"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>

                      {/* Job Title - Hero with proper text wrapping */}
                      <h2 className="text-lg font-bold text-foreground mb-3 break-words overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '3.5rem'
                        }}
                        title={job.role}>
                        {job.role}
                      </h2>

                      {/* Location with Icon */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-muted-foreground flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate" title={job.location}>{job.location}</span>
                      </div>

                      {/* Tags - Bottom of Card */}
                      {jobTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                          {jobTags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                          {/* Source Badge */}
                          {job.source && (
                            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {formatSourceName(job.source)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* If no tags but has source, show source alone */}
                      {jobTags.length === 0 && job.source && (
                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {formatSourceName(job.source)}
                          </span>
                        </div>
                      )}

                      {/* Full Width Apply Button (Alternative - if no link in corner) */}
                      {!job.application_url && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <button
                            disabled
                            className="w-full py-2.5 px-4 text-sm font-medium text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg cursor-not-allowed"
                          >
                            Application Unavailable
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

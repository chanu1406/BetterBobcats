"use client";

import { useState, useEffect } from "react";

/**
 * Job Search Board Page
 * Displays job opportunities and internships for UC Merced students
 * Located at: src/app/jobs/page.tsx
 * URL: http://localhost:3000/jobs
 */

interface Job {
  company: string;
  role: string;
  location: string;
  link: string;
  source?: string; // Track which repository this came from
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

  // Fetch jobs function (extracted so we can call it from refresh button)
  async function fetchJobs() {
    try {
      setLoading(true);
      setError(null);
      
      // Define data sources
      const sources = [
        {
          name: "Tech",
          url: "https://raw.githubusercontent.com/SimplifyJobs/Summer2026-Internships/dev/README.md",
          parser: parseSimplifyJobsTable,
        },
        {
          name: "Research",
          url: "https://raw.githubusercontent.com/stallionz-arch/Internships/main/README.md",
          parser: parseResearchList,
        },
      ];

      // Fetch all sources in parallel
      const fetchPromises = sources.map(async (source) => {
        try {
          const response = await fetch(source.url);
          if (!response.ok) {
            console.warn(`⚠️ Failed to fetch from ${source.name}`);
            return [];
          }
          const markdown = await response.text();
          const jobs = source.parser(markdown);
          // Add source/category tag to each job
          return jobs.map((job: Job) => ({ ...job, source: source.name }));
        } catch (err) {
          console.error(`❌ Error fetching ${source.name}:`, err);
          return [];
        }
      });

      const results = await Promise.all(fetchPromises);
      
      // Merge all jobs into a single array
      const allJobs = results.flat();
      
      setJobs(allJobs);
      setLastUpdated(new Date());
      setError(null);
      
      console.log(`✅ Fetched ${allJobs.length} jobs from ${sources.length} source(s)`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  // Parser for SimplifyJobs HTML table format
  function parseSimplifyJobsTable(markdown: string): Job[] {
    const jobs: Job[] = [];
    
    // The GitHub README uses HTML tables, so we need to parse <tr> rows
    // Match all table rows within <tbody>
    const tbodyMatch = markdown.match(/<tbody>([\s\S]*?)<\/tbody>/i);
    if (!tbodyMatch) {
      console.warn("⚠️ Could not find <tbody> in markdown");
      return jobs;
    }
    
    const tbody = tbodyMatch[1];
    const rowMatches = tbody.matchAll(/<tr>([\s\S]*?)<\/tr>/gi);
    
    for (const rowMatch of rowMatches) {
      const row = rowMatch[1];
      
      // Extract table cell contents
      const cells: string[] = [];
      const cellMatches = row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi);
      
      for (const cellMatch of cellMatches) {
        cells.push(cellMatch[1].trim());
      }
      
      if (cells.length >= 4) {
        // Cell 0: Company (contains nested <strong><a>)
        let company = cells[0];
        company = company.replace(/<strong>|<\/strong>/gi, "");
        const companyLinkMatch = company.match(/<a[^>]*>(.+?)<\/a>/i);
        if (companyLinkMatch) {
          company = companyLinkMatch[1];
        }
        company = company.trim();
        
        // Cell 1: Role (plain text)
        let role = cells[1].trim();
        // Remove any HTML tags just in case
        role = role.replace(/<[^>]*>/g, "");
        
        // Cell 2: Location (plain text)
        let location = cells[2].trim();
        location = location.replace(/<[^>]*>/g, "");
        
        // Cell 3: Application link - extract URL from various formats
        let link = "";
        const linkCell = cells[3];
        
        // Check if the job is marked as closed (🔒 emoji or "closed" text)
        const isClosed = linkCell.includes("🔒") || linkCell.toLowerCase().includes("closed");
        
        if (!isClosed) {
          // Strategy 1: Try to extract from HTML <a href="...">
          const htmlHrefMatch = linkCell.match(/<a\s+href=["']([^"']+)["']/i);
          if (htmlHrefMatch) {
            link = htmlHrefMatch[1];
          }
          
          // Strategy 2: Try Markdown link format [text](url)
          if (!link) {
            const mdLinkMatch = linkCell.match(/\[.+?\]\(([^)]+)\)/);
            if (mdLinkMatch) {
              link = mdLinkMatch[1];
            }
          }
          
          // Strategy 3: Try to find any https:// URL in the cell
          if (!link) {
            const urlMatch = linkCell.match(/https?:\/\/[^\s<>"']+/i);
            if (urlMatch) {
              link = urlMatch[0];
            }
          }
          
          // Clean up the extracted URL
          if (link) {
            // Decode HTML entities
            link = link.replace(/&amp;/g, "&");
            link = link.replace(/&lt;/g, "<");
            link = link.replace(/&gt;/g, ">");
            link = link.replace(/&quot;/g, '"');
            
            // Remove any trailing punctuation or HTML remnants
            link = link.replace(/[<>'"]+$/g, "");
            link = link.trim();
            
            // Validate that it's a proper URL
            if (!link.startsWith("http://") && !link.startsWith("https://")) {
              link = ""; // Invalid URL, clear it
            }
          }
        }
        
        // Debug: Log jobs without links
        if (company && role && location && !link) {
          console.log(`⚠️ No link found for: ${company} - ${role}`, {
            isClosed,
            linkCellPreview: linkCell.substring(0, 100)
          });
        }
        
        // Debug: Log first 5 jobs to see extraction working
        if (jobs.length < 5) {
          console.log(`🔍 Job #${jobs.length + 1}:`, {
            company,
            role,
            hasLink: !!link,
            linkPreview: link ? link.substring(0, 60) : "NO LINK"
          });
        }
        
        // Only add jobs with valid data (link is now optional but validated)
        if (company && role && location) {
          jobs.push({
            company,
            role,
            location,
            link: link || "", // Include empty string if no valid link found
          });
        }
      }
    }
    
    console.log(`✅ Successfully parsed ${jobs.length} jobs from GitHub`);
    if (jobs.length > 0) {
      console.log("Sample job:", jobs[0]);
      // Log some stats about links
      const jobsWithLinks = jobs.filter(j => j.link).length;
      const jobsWithoutLinks = jobs.length - jobsWithLinks;
      console.log(`📊 Links: ${jobsWithLinks} valid, ${jobsWithoutLinks} missing`);
    }
    return jobs;
  }

  // Parser for Research Internship list format (markdown lists, not tables)
  function parseResearchList(markdown: string): Job[] {
    const jobs: Job[] = [];
    
    // Research repo uses format: ### N. [Program Name](link), Organization
    // Extract numbered list items with links
    const listItemRegex = /###\s*\d+\.\s*\[([^\]]+)\]\(([^)]+)\)[,\s]*(.+)?/g;
    
    let match;
    while ((match = listItemRegex.exec(markdown)) !== null) {
      const programName = match[1].trim();
      const link = match[2].trim();
      const organization = match[3] ? match[3].trim() : "";
      
      // Extract location from the text (look for country names or "USA", "Canada", etc.)
      let location = "International";
      if (organization.toLowerCase().includes("usa") || organization.toLowerCase().includes("united states")) {
        location = "USA";
      } else if (organization.toLowerCase().includes("canada")) {
        location = "Canada";
      } else if (organization.toLowerCase().includes("germany")) {
        location = "Germany";
      } else if (organization.toLowerCase().includes("switzerland")) {
        location = "Switzerland";
      } else if (organization.toLowerCase().includes("uk") || organization.toLowerCase().includes("united kingdom")) {
        location = "UK";
      } else if (organization.toLowerCase().includes("japan")) {
        location = "Japan";
      } else if (organization.toLowerCase().includes("france")) {
        location = "France";
      }
      
      // Determine company/organization name
      let company = organization || programName.split(" ")[0];
      if (company.includes(",")) {
        company = company.split(",")[0].trim();
      }
      
      // Only add if we have valid data
      if (programName && link) {
        jobs.push({
          company: company,
          role: programName,
          location: location,
          link: link,
        });
      }
    }
    
    console.log(`🔬 Research: Parsed ${jobs.length} research opportunities`);
    return jobs;
  }

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

      // Degree filter - STRICT matching to avoid misleading results
      let matchesDegree = true;
      if (filters.degree !== "All") {
        const roleLower = job.role.toLowerCase();
        const companyLower = job.company.toLowerCase();
        
        if (filters.degree === "CS") {
          // SOFTWARE/CS roles - exclude hardware
          const isSoftware = 
            roleLower.includes("software") ||
            roleLower.includes("developer") ||
            roleLower.includes("programmer") ||
            roleLower.includes("web") ||
            roleLower.includes("backend") ||
            roleLower.includes("frontend") ||
            roleLower.includes("full stack") ||
            roleLower.includes("fullstack") ||
            roleLower.includes("data scien") ||
            roleLower.includes("machine learning") ||
            roleLower.includes("ml engineer") ||
            roleLower.includes("ai engineer") ||
            roleLower.includes("cloud") ||
            roleLower.includes("devops");
          
          // Exclude hardware/EE terms
          const isHardware = 
            roleLower.includes("hardware") ||
            roleLower.includes("electrical") ||
            roleLower.includes("circuit") ||
            roleLower.includes("embedded") ||
            roleLower.includes("fpga") ||
            roleLower.includes("vlsi") ||
            roleLower.includes("semiconductor");
          
          matchesDegree = isSoftware && !isHardware;
          
        } else if (filters.degree === "Bio") {
          // BIOLOGY/BIOMEDICAL - must have bio-specific keywords
          // Exclude generic "research" or "software" roles
          const isBio = 
            roleLower.includes("biolog") ||
            roleLower.includes("biomedical") ||
            roleLower.includes("biotech") ||
            roleLower.includes("bioinformatics") ||
            roleLower.includes("lab tech") ||
            roleLower.includes("lab assist") ||
            roleLower.includes("clinical") ||
            roleLower.includes("medical") ||
            roleLower.includes("health") ||
            roleLower.includes("pharma") ||
            roleLower.includes("life science") ||
            roleLower.includes("neuroscience") ||
            roleLower.includes("genetics") ||
            roleLower.includes("microbiology") ||
            companyLower.includes("bio") ||
            companyLower.includes("pharma") ||
            companyLower.includes("medical");
          
          // Exclude software/tech roles
          const isSoftware = 
            roleLower.includes("software") ||
            roleLower.includes("developer") ||
            roleLower.includes("programmer") ||
            roleLower.includes("web") ||
            roleLower.includes("full stack");
          
          matchesDegree = isBio && !isSoftware;
            
        } else if (filters.degree === "EE") {
          // HARDWARE/EE roles - exclude pure software
          const isHardware =
            roleLower.includes("hardware") ||
            roleLower.includes("electrical") ||
            roleLower.includes("circuit") ||
            roleLower.includes("embedded") ||
            roleLower.includes("electronics") ||
            roleLower.includes("fpga") ||
            roleLower.includes("signal") ||
            roleLower.includes("power") ||
            roleLower.includes("semiconductor") ||
            roleLower.includes("vlsi") ||
            roleLower.includes("asic") ||
            roleLower.includes("pcb");
          
          // Exclude pure software terms (but allow firmware/embedded which can be EE)
          const isPureSoftware = 
            (roleLower.includes("software") || roleLower.includes("developer")) &&
            !roleLower.includes("embedded") &&
            !roleLower.includes("firmware");
          
          matchesDegree = isHardware && !isPureSoftware;
          
        } else if (filters.degree === "ME") {
          // MECHANICAL ENGINEERING - must have ME-specific terms
          const isME = 
            roleLower.includes("mechanical") ||
            roleLower.includes("manufacturing") ||
            roleLower.includes("robotics") ||
            roleLower.includes("automotive") ||
            roleLower.includes("aerospace") ||
            roleLower.includes("thermal") ||
            roleLower.includes("design engineer") ||
            roleLower.includes("cad") ||
            roleLower.includes("solidworks") ||
            roleLower.includes("hvac") ||
            roleLower.includes("mechatronics") ||
            companyLower.includes("automotive") ||
            companyLower.includes("aerospace");
          
          // Exclude software/EE roles
          const isSoftwareOrEE = 
            roleLower.includes("software developer") ||
            roleLower.includes("web developer") ||
            roleLower.includes("full stack") ||
            roleLower.includes("electrical") ||
            roleLower.includes("circuit");
          
          matchesDegree = isME && !isSoftwareOrEE;
        }
      }

      return matchesSearch && matchesCalifornia && matchesRemote && matchesDegree;
    });
  }

  const filteredJobs = filterJobs(jobs);

  // Helper function to generate tags for jobs
  function getTags(job: Job): string[] {
    const tags: string[] = [];
    
    const jobTitle = job.role;
    const location = job.location;

    // Add source tag first
    if (job.source) {
      tags.push(job.source);
    }

    // Check if it's an internship
    if (jobTitle.toLowerCase().includes("intern")) {
      tags.push("Internship");
    }

    // Check if location is Remote
    const isRemote = location.toLowerCase().includes("remote");
    if (isRemote) {
      tags.push("Remote");
    }

    // Check if location is California
    const isCalifornia =
      location.includes("CA") ||
      location.toLowerCase().includes("california") ||
      location.toLowerCase().includes("san francisco") ||
      location.toLowerCase().includes("los angeles") ||
      location.toLowerCase().includes("san diego") ||
      location.toLowerCase().includes("san jose");

    if (isCalifornia) {
      tags.push("California");
    }

    // If neither Remote nor California, tag as Out-of-State
    if (!isRemote && !isCalifornia) {
      tags.push("Out-of-State");
    }

    // Check for specific job types
    const titleLower = jobTitle.toLowerCase();
    if (titleLower.includes("software") || titleLower.includes("swe")) {
      tags.push("Software");
    }
    if (titleLower.includes("data")) {
      tags.push("Data");
    }
    if (titleLower.includes("machine learning") || titleLower.includes("ml") || titleLower.includes("ai")) {
      tags.push("AI/ML");
    }
    if (titleLower.includes("frontend") || titleLower.includes("front-end")) {
      tags.push("Frontend");
    }
    if (titleLower.includes("backend") || titleLower.includes("back-end")) {
      tags.push("Backend");
    }
    if (titleLower.includes("full stack") || titleLower.includes("fullstack")) {
      tags.push("Full Stack");
    }

    return tags;
  }

  // Helper function to get tag color based on tag type (soft pastels)
  function getTagColor(tag: string): string {
    const tagColors: { [key: string]: string } = {
      // Source tags
      "Tech": "bg-blue-50 text-blue-700 border border-blue-200 font-semibold",
      "Research": "bg-green-50 text-green-700 border border-green-200 font-semibold",
      "Business": "bg-orange-50 text-orange-700 border border-orange-200 font-semibold",
      
      // Job type tags
      "Internship": "bg-blue-50 text-blue-600 border border-blue-100",
      "Remote": "bg-emerald-50 text-emerald-600 border border-emerald-100",
      "California": "bg-purple-50 text-purple-600 border border-purple-100",
      "Out-of-State": "bg-amber-50 text-amber-600 border border-amber-100",
      "Software": "bg-indigo-50 text-indigo-600 border border-indigo-100",
      "Data": "bg-cyan-50 text-cyan-600 border border-cyan-100",
      "AI/ML": "bg-rose-50 text-rose-600 border border-rose-100",
      "Frontend": "bg-teal-50 text-teal-600 border border-teal-100",
      "Backend": "bg-violet-50 text-violet-600 border border-violet-100",
      "Full Stack": "bg-green-50 text-green-600 border border-green-100",
    };
    return tagColors[tag] || "bg-slate-50 text-slate-600 border border-slate-100";
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-4xl font-bold text-slate-900">
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
            <p className="text-lg text-slate-600">
              Browse tech internship and job opportunities for Summer 2026
            </p>
            {lastUpdated && (
              <span className="text-sm text-slate-500">
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
                  Jobs are sourced from the <a href="https://github.com/SimplifyJobs/Summer2025-Internships" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">SimplifyJobs GitHub repository</a>, 
                  which primarily focuses on <strong>tech roles</strong> (Software Engineering, Data Science, AI/ML, Hardware Engineering). 
                  Non-tech majors may find limited results, but we recommend using the search bar or checking back regularly as new opportunities are added daily.
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Filter Jobs
            </h2>
            
            {/* Search Bar */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
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
                <label htmlFor="degree" className="block text-sm font-medium text-slate-700 mb-2">
                  Filter by Degree
                </label>
                <select
                  id="degree"
                  value={filters.degree}
                  onChange={(e) =>
                    setFilters({ ...filters, degree: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="All">All Degrees</option>
                  <option value="CS">Computer Science / Software</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="Bio">Biology / Biomedical</option>
                </select>
                <p className="mt-1 text-xs text-slate-500">
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
                  className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
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
              <p className="text-slate-600">No jobs found.</p>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-slate-600">
                No jobs match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}

          {!loading && !error && filteredJobs.length > 0 && (
            <>
              <div className="mb-4 text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filteredJobs.length}</span> of <span className="font-semibold text-slate-900">{jobs.length}</span> internship opportunities
              </div>
              
              {/* Modern Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => {
                  const tags = getTags(job);
                  // Get first letter of company name for logo placeholder
                  const companyInitial = job.company.charAt(0).toUpperCase();
                  
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
                    >
                      {/* Header with Logo and Apply Button */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Company Logo Placeholder */}
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center text-xl font-bold text-blue-600 flex-shrink-0">
                            {companyInitial}
                          </div>
                          
                          {/* Company Name */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-slate-500 truncate" title={job.company}>
                              {job.company}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Apply Button - Top Right */}
                        {job.link && (
                          <a
                            href={job.link}
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                      
                      {/* Job Title - Hero with proper text wrapping */}
                      <h2 className="text-lg font-bold text-slate-900 mb-3 break-words overflow-hidden" 
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
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 min-w-0">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 text-slate-400 flex-shrink-0" 
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
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                          {tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                          {/* Source Badge */}
                          {job.source && (
                            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-600">
                              {job.source}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* If no tags but has source, show source alone */}
                      {tags.length === 0 && job.source && (
                        <div className="mt-auto pt-4 border-t border-slate-100">
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-600">
                            {job.source}
                          </span>
                        </div>
                      )}
                      
                      {/* Full Width Apply Button (Alternative - if no link in corner) */}
                      {!job.link && (
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}

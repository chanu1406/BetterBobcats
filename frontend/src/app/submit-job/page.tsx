"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Job Submission Form Page
 * Allows student volunteers (Brainiac Bobcats) to manually add job opportunities
 * Located at: src/app/submit-job/page.tsx
 * URL: http://localhost:3000/submit-job
 */

interface JobSubmission {
  company: string;
  role: string;
  location: string;
  applicationLink: string;
  degreeCategory: string;
  tags: string[];
}

export default function SubmitJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<JobSubmission>({
    company: "",
    role: "",
    location: "",
    applicationLink: "",
    degreeCategory: "All",
    tags: [],
  });
  
  const [tagInput, setTagInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof JobSubmission, string>>>({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof JobSubmission]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof JobSubmission, string>> = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company/Organization is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role Title is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.applicationLink.trim()) {
      newErrors.applicationLink = "Application Link is required";
    } else if (!formData.applicationLink.match(/^https?:\/\/.+/)) {
      newErrors.applicationLink = "Please enter a valid URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Log the submission (will be replaced with database call later)
    console.log("📝 New Job Submission:", {
      ...formData,
      submittedAt: new Date().toISOString(),
      submittedBy: "Brainiac Bobcat", // Will be replaced with actual user data
    });

    // Show success message
    setShowSuccess(true);

    // Clear form
    setFormData({
      company: "",
      role: "",
      location: "",
      applicationLink: "",
      degreeCategory: "All",
      tags: [],
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Submit an Opportunity
            </h1>
            <p className="text-lg text-slate-600">
              Help your peers by sharing a research lab, internship, or local job
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm">
              <span className="font-semibold">🧠 Brainiac Bobcats:</span>
              <span>Thank you for contributing to our community!</span>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-green-900">Success!</h3>
                  <p className="text-sm text-green-800">
                    Your job submission has been received. Our team will review and publish it soon!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-8">
            {/* Company/Organization */}
            <div className="mb-6">
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Company/Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g., UC Merced Biology Lab, Tesla, UCSF"
                className={`w-full px-4 py-2.5 border ${
                  errors.company ? "border-red-300" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>

            {/* Role Title */}
            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Role Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., Lab Assistant, Research Intern, Software Engineer"
                className={`w-full px-4 py-2.5 border ${
                  errors.role ? "border-red-300" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Location */}
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Merced, CA, Remote, San Francisco, CA"
                className={`w-full px-4 py-2.5 border ${
                  errors.location ? "border-red-300" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Application Link */}
            <div className="mb-6">
              <label htmlFor="applicationLink" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Application Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="applicationLink"
                name="applicationLink"
                value={formData.applicationLink}
                onChange={handleInputChange}
                placeholder="https://example.com/apply"
                className={`w-full px-4 py-2.5 border ${
                  errors.applicationLink ? "border-red-300" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
              />
              {errors.applicationLink && (
                <p className="mt-1 text-sm text-red-600">{errors.applicationLink}</p>
              )}
            </div>

            {/* Degree Category */}
            <div className="mb-6">
              <label htmlFor="degreeCategory" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Relevant Degree/Major
              </label>
              <select
                id="degreeCategory"
                name="degreeCategory"
                value={formData.degreeCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="All">All Majors</option>
                <option value="CS">Computer Science / Software</option>
                <option value="EE">Electrical Engineering</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="Bio">Biology / Biomedical</option>
                <option value="Nursing">Nursing / Pre-Health</option>
                <option value="Business">Business / Management</option>
                <option value="Other">Other</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">
                Select the most relevant major for this opportunity
              </p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tags (Optional)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="e.g., Research, Clinical, Remote"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Add tags like "Research", "Clinical", "Remote", "Part-time", etc.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Submit Opportunity
            </button>

            {/* Helper Text */}
            <p className="mt-4 text-center text-sm text-slate-500">
              Your submission will be reviewed by our team before being published to the job board.
            </p>
          </form>

          {/* Back to Jobs Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/jobs")}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
            >
              ← Back to Job Board
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

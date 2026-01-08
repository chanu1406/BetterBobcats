This document will serve as a guide to building tierCourses for each major/career...

1. First step create a new fresh chat with any LLM(GPT, Claude, Gemini...) in your browser not cursor or copilot.

2. Enable web search mode. As well as if using gpt use 5.2 thinking mode.

3. Give Gpt this general tierCourse format:


{
  id: "course-id",                    // Unique identifier
  code: "COURSE CODE",                // Course code
  name: "Course Name",                // Short course name
  fullName: "COURSE CODE: Course Name", // Full course name
  description: "Brief description",   // Why it's critical
  tier: 1,                            // Tier number
  expandedInfo: {
    credits: 4,                       // Number of credits
    careerRelevance: "2-3 sentence explanation...",
    realWorldApplications: [
      "Specific example",
      "Another application"
    ],
    learningOutcomes: [
      "What students will learn",
      "Another outcome"
    ],
    resources: {
      videos: ["https://youtube.com/..."],
      websites: ["https://example.com"],
      tools: ["Tool Name"]
    }
  }
}


  4. Copy paste the specific course you want to fill. Do one at a time or most two at a time.

  5. Tell GPT the major this course is for and which career within that major you are filling out this courses info for.

  6. Ask it to fill all the information but the preqreqs with information relevant to that major and the career.

  7. Videos minimum three for each. 
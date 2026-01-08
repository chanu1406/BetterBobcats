This document will serve as a guide to building tierCourses for each major/career...

1. First step create a new fresh chat with any LLM(GPT, Claude, Gemini...) in your browser not cursor or copilot.

2. Enable web search mode. As well as if using gpt use 5.2 thinking mode.

3. Give Gpt this general tierCourse format:
{
    // Required fields
    id: 'unique-course-id',              // Unique identifier (kebab-case)
    code: 'COURSE 123',                  // Course code
    name: 'Course Name',                 // Short name
    fullName: 'COURSE 123: Course Name', // Full display name
    description: 'Why this course is critical for this career path',
    tier: 1,                             // Tier number (1, 2, 3, etc.)
    
    // Optional fields
    prerequisites?: ['prereq-id'],       // Array of course IDs
    resources?: ['Resource 1', 'Resource 2'],
    
    // Expanded info (shown when course node is clicked)
    expandedInfo?: {
      credits?: 4,
      prerequisites?: 'Human-readable prerequisites',
      learningOutcomes?: ['Outcome 1', 'Outcome 2'],
      topics?: ['Topic 1', 'Topic 2', 'Topic 3'],
      careerRelevance?: 'How this course relates to the career path',
      realWorldApplications?: ['Application 1', 'Application 2'],
      resources?: {
        videos?: ['YouTube link', 'Video tutorial'],
        websites?: ['Documentation link', 'Article link'],
        tools?: ['Tool name', 'Platform name'],
      },
      additionalNotes?: 'Any additional information',
    },
  },
  // ... 


  4. Copy paste the specific course you want to fill. Do one at a time or most two at a time.

  5. Tell GPT the major this course is for and which career within that major you are filling out this courses info for.

  6. Ask it to fill all the information but the preqreqs with information relevant to that major and the career.

  7. Videos minimum three for each. 
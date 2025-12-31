"""
CS/CSE Course Data
All courses and prerequisites for the CS/CSE degree program
"""
from app.models.course import Course

# All CS/CSE courses - migrated from frontend
CS_CSE_COURSES = [
    # First Year - Fall
    Course(
        id="math-021",
        code="MATH 021",
        name="Calculus I for Physical Sciences and Engineering",
        full_name="MATH 021: Calculus I for Physical Sciences and Engineering",
        year=1,
        semester="fall",
        prerequisites=[],
        category="Math"
    ),
    Course(
        id="wri-010",
        code="WRI 010",
        name="College Reading and Composition",
        full_name="WRI 010: College Reading and Composition",
        year=1,
        semester="fall",
        prerequisites=[],
        category="Writing"
    ),
    Course(
        id="cse-022",
        code="CSE 022",
        name="Introduction to Programming",
        full_name="CSE 022: Introduction to Programming",
        year=1,
        semester="fall",
        prerequisites=[],
        category="CSE"
    ),
    Course(
        id="spark",
        code="SPRK",
        name="SPRK 010 or SPRK 001",
        full_name="SPRK 010 or SPRK 001: Spark Seminar",
        year=1,
        semester="fall",
        prerequisites=[],
        category="Spark"
    ),
    
    # First Year - Spring
    Course(
        id="math-022",
        code="MATH 022",
        name="Calculus II for Physical Sciences and Engineering",
        full_name="MATH 022: Calculus II for Physical Sciences and Engineering",
        year=1,
        semester="spring",
        prerequisites=["math-021"],
        category="Math"
    ),
    Course(
        id="cse-015",
        code="CSE 015",
        name="Discrete Mathematics",
        full_name="CSE 015: Discrete Mathematics",
        year=1,
        semester="spring",
        prerequisites=["cse-022"],
        category="CSE"
    ),
    Course(
        id="cse-024",
        code="CSE 024",
        name="Advanced Programming",
        full_name="CSE 024: Advanced Programming",
        year=1,
        semester="spring",
        prerequisites=["cse-022"],
        category="CSE"
    ),
    Course(
        id="engr-091",
        code="ENGR 091",
        name="Professional Development: People in an Engineered World",
        full_name="ENGR 091: Professional Development: People in an Engineered World",
        year=1,
        semester="spring",
        prerequisites=[],
        category="Engineering"
    ),
    
    # Second Year - Fall
    Course(
        id="math-023",
        code="MATH 023",
        name="Vector Calculus",
        full_name="MATH 023: Vector Calculus",
        year=2,
        semester="fall",
        prerequisites=["math-022"],
        category="Math"
    ),
    Course(
        id="math-032-or-engr-080",
        code="MATH 032/ENGR 080",
        name="MATH 032 or ENGR 080",
        full_name="MATH 032: Probability and Statistics or ENGR 080: Statistical Modeling and Data Analysis",
        year=2,
        semester="fall",
        prerequisites=["math-022"],
        category="Math"
    ),
    Course(
        id="cse-030",
        code="CSE 030",
        name="Data Structures",
        full_name="CSE 030: Data Structures",
        year=2,
        semester="fall",
        prerequisites=["cse-015", "cse-024"],
        category="CSE"
    ),
    Course(
        id="gened-a-life",
        code="GenED A-Life",
        name="General Education Area A-Life Science",
        full_name="General Education Area A-Life Science",
        year=2,
        semester="fall",
        prerequisites=["cse-030"],
        is_category=True,
        category="GenEd"
    ),
    
    # Second Year - Spring
    Course(
        id="math-024",
        code="MATH 024",
        name="Linear Algebra and Differential Equations",
        full_name="MATH 024: Linear Algebra and Differential Equations",
        year=2,
        semester="spring",
        prerequisites=["math-022"],
        category="Math"
    ),
    Course(
        id="cse-031",
        code="CSE 031",
        name="Computer Organization and Assembly Language",
        full_name="CSE 031: Computer Organization and Assembly Language",
        year=2,
        semester="spring",
        prerequisites=["cse-030"],
        category="CSE"
    ),
    Course(
        id="cse-100",
        code="CSE 100",
        name="Algorithm Design and Analysis",
        full_name="CSE 100: Algorithm Design and Analysis",
        year=2,
        semester="spring",
        prerequisites=["cse-030"],
        category="CSE"
    ),
    Course(
        id="gened-b",
        code="GenED B",
        name="General Education Area B",
        full_name="General Education Area B",
        year=2,
        semester="spring",
        prerequisites=["cse-015", "cse-024", "engr-091"],
        is_category=True,
        category="GenEd"
    ),
    
    # Third Year - Fall
    Course(
        id="phys-008",
        code="PHYS 008 + 008L",
        name="Introductory Physics I for Physical Sciences",
        full_name="PHYS 008 + PHYS 008L: Introductory Physics I for Physical Sciences",
        year=3,
        semester="fall",
        prerequisites=[],
        category="Physics"
    ),
    
    # Third Year - Spring
    Course(
        id="phys-009",
        code="PHYS 009 + 009L",
        name="Introductory Physics II for Physical Sciences",
        full_name="PHYS 009 + PHYS 009L: Introductory Physics II for Physical Sciences",
        year=3,
        semester="spring",
        prerequisites=["phys-008"],
        category="Physics"
    ),
    Course(
        id="wri-upper-div",
        code="WRI Upper Div",
        name="Writing in the Discipline",
        full_name="General Education: Writing in the Discipline",
        year=3,
        semester="spring",
        prerequisites=["wri-010"],
        category="Writing"
    ),
    
    # Fourth Year - Fall
    Course(
        id="engr-065",
        code="ENGR 065",
        name="Circuit Theory",
        full_name="ENGR 065: Circuit Theory",
        year=4,
        semester="fall",
        prerequisites=["phys-008"],
        category="Engineering"
    ),
    
    # Fourth Year - Spring
    Course(
        id="cse-120",
        code="CSE 120",
        name="Software Engineering",
        full_name="CSE 120: Software Engineering",
        year=4,
        semester="spring",
        prerequisites=["cse-031", "cse-100"],
        category="CSE"
    ),
    Course(
        id="major-technical-elective",
        code="Major Technical Elective",
        name="Major Technical Elective",
        full_name="Major Technical Elective",
        year=3,
        semester="fall",
        prerequisites=[
            "cse-030",
            "cse-100",
            "cse-031",
            "math-023",
            "math-024",
            "phys-008",
            "engr-065",
            "wri-upper-div",
        ],
        is_category=True,
        category="Elective"
    ),
    Course(
        id="free-elective",
        code="Free Elective",
        name="Free Elective",
        full_name="Free Elective",
        year=4,
        semester="spring",
        prerequisites=["engr-065", "cse-120"],
        is_category=True,
        category="Elective"
    ),
]

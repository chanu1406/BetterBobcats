"use client";

/**
 * PrerequisiteGraph Component
 * Interactive prerequisite graph visualization using React Flow
 * Used on: Degrees page (CS/CSE degree overview)
 */

import { useMemo, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ReactFlowProvider,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { cseCourses } from "../data/courses";
import { Course } from "@/types/course";

// Custom circular node component for CS/CSE root
function RootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-base font-bold text-primary text-center">
        {data.label}
      </div>
    </div>
  );
}

// Custom category node component - circular shape
function CategoryNode({ data }: { data: { label: string; isExpanded?: boolean; onToggle?: () => void } }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onToggle) {
      data.onToggle();
    }
  };

  return (
    <div
      className={`w-20 h-20 rounded-full border-2 ${
        data.isExpanded
          ? "border-primary bg-primary/15 border-solid"
          : "border-primary/50 bg-primary/5 border-dashed"
      } flex items-center justify-center shadow-md relative cursor-pointer hover:bg-primary/10 transition-colors`}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="text-xs font-semibold text-primary text-center px-2">
        {data.label}
      </div>
    </div>
  );
}

// Custom course node component - rectangular with year-based colors
function CourseNode({ data }: { data: { course: Course } }) {
  const course = data.course;
  
  // Year-based color mapping
  const yearColors: Record<number, { bg: string; border: string }> = {
    1: { bg: "bg-blue-100", border: "border-blue-300" },
    2: { bg: "bg-green-100", border: "border-green-300" },
    3: { bg: "bg-amber-100", border: "border-amber-300" },
    4: { bg: "bg-purple-100", border: "border-purple-300" },
  };

  const colors = yearColors[course.year] || yearColors[1];

  return (
    <div
      className={`px-2 py-1.5 rounded-lg border-2 min-w-[140px] max-w-[180px] ${colors.bg} ${colors.border} shadow-sm relative`}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="text-xs font-semibold text-foreground break-words text-center leading-tight">
        {course.fullName}
      </div>
    </div>
  );
}

const nodeTypes = {
  root: RootNode,
  category: CategoryNode,
  course: CourseNode,
};

// Layout function - position root at top, categories below, courses in hierarchy
function getLayoutedElements(nodes: Node[], edges: Edge[], useFormattedLayout: boolean = false) {
  const rootNode = nodes.find((n) => n.id === "cs-cse-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "cs-cse-root");
  
  // Position root node at the top center
  if (rootNode) {
    rootNode.position = { x: 0, y: 40 };
    rootNode.targetPosition = "bottom" as any;
    rootNode.sourcePosition = "bottom" as any;
  }
  
  // Position category nodes at level 1 (below root)
  // Use wider spacing when formatted layout is enabled to prevent overlaps
  const categorySpacing = useFormattedLayout ? 350 : 180;
  const categoryStartX = -((categoryNodes.length - 1) * categorySpacing) / 2;
  categoryNodes.forEach((node, index) => {
    node.targetPosition = "top" as any;
    node.sourcePosition = "bottom" as any;
    node.position = {
      x: categoryStartX + index * categorySpacing,
      y: 160,
    };
  });

  // Position course nodes in hierarchical levels based on prerequisites
  // For Math branch: level 2 (MATH 021), level 3 (MATH 022), level 4 (MATH 023, 024, 032/080)
  const mathCategoryNode = categoryNodes.find((n) => n.id === "category-math");
  if (mathCategoryNode && courseNodes.length > 0) {
    // Find math courses and organize by level
    const math021 = courseNodes.find((n) => n.id === "math-021");
    const math022 = courseNodes.find((n) => n.id === "math-022");
    const math023 = courseNodes.find((n) => n.id === "math-023");
    const math024 = courseNodes.find((n) => n.id === "math-024");
    const math032 = courseNodes.find((n) => n.id === "math-032-or-engr-080");

    const verticalSpacing = 140;
    let currentY = 280; // Start below category nodes

    // Level 2: MATH 021 (directly below Math category)
    if (math021) {
      math021.targetPosition = "top" as any;
      math021.sourcePosition = "bottom" as any;
      math021.position = {
        x: mathCategoryNode.position.x,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 3: MATH 022 (below MATH 021)
    if (math022) {
      math022.targetPosition = "top" as any;
      math022.sourcePosition = "bottom" as any;
      math022.position = {
        x: mathCategoryNode.position.x,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 4: Three nodes branching from MATH 022
    const level4Courses = [math023, math024, math032].filter(Boolean);
    if (level4Courses.length > 0 && math022) {
      // Keep horizontal spacing the same since category spacing increases provide room
      const horizontalSpacing = useFormattedLayout ? 200 : 220;
      const level4StartX = math022.position.x - ((level4Courses.length - 1) * horizontalSpacing) / 2;
      level4Courses.forEach((node, index) => {
        if (node) {
          node.targetPosition = "top" as any;
          node.sourcePosition = "bottom" as any;
          node.position = {
            x: level4StartX + index * horizontalSpacing,
            y: currentY,
          };
        }
      });
    }
  }

    // Position writing courses in hierarchical levels (linear chain)
  const writingCategoryNode = categoryNodes.find((n) => n.id === "category-writing");
  if (writingCategoryNode && courseNodes.length > 0) {
    const wri010 = courseNodes.find((n) => n.id === "wri-010");
    const wriUpperDiv = courseNodes.find((n) => n.id === "wri-upper-div");

    const verticalSpacing = 140;
    let currentY = 280; // Start below category nodes

    // Level 2: WRI 010 (directly below Writing category)
    if (wri010) {
      wri010.targetPosition = "top" as any;
      wri010.sourcePosition = "bottom" as any;
      wri010.position = {
        x: writingCategoryNode.position.x,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 3: WRI Upper Div (below WRI 010)
    if (wriUpperDiv) {
      wriUpperDiv.targetPosition = "top" as any;
      wriUpperDiv.sourcePosition = "bottom" as any;
      wriUpperDiv.position = {
        x: writingCategoryNode.position.x,
        y: currentY,
      };
    }
  }

  // Position physics courses in hierarchical levels (linear chain)
  const physicsCategoryNode = categoryNodes.find((n) => n.id === "category-physics");
  if (physicsCategoryNode && courseNodes.length > 0) {
    const phys008 = courseNodes.find((n) => n.id === "phys-008");
    const phys009 = courseNodes.find((n) => n.id === "phys-009");

    const verticalSpacing = 140;
    let currentY = 280; // Start below category nodes

    // Level 2: PHYS 008 + 008L (directly below Physics category)
    if (phys008) {
      phys008.targetPosition = "top" as any;
      phys008.sourcePosition = "bottom" as any;
      phys008.position = {
        x: physicsCategoryNode.position.x,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 3: PHYS 009 + 009L (below PHYS 008)
    if (phys009) {
      phys009.targetPosition = "top" as any;
      phys009.sourcePosition = "bottom" as any;
      phys009.position = {
        x: physicsCategoryNode.position.x,
        y: currentY,
      };
    }
  }

  // Position spark courses in hierarchical levels (single course)
  const sparkCategoryNode = categoryNodes.find((n) => n.id === "category-spark");
  if (sparkCategoryNode && courseNodes.length > 0) {
    const spark = courseNodes.find((n) => n.id === "spark");

    const verticalSpacing = 140;
    const currentY = 280; // Start below category nodes

    // Level 2: SPRK 010 or SPRK 001 (directly below Spark category)
    if (spark) {
      spark.targetPosition = "top" as any;
      spark.sourcePosition = "bottom" as any;
      spark.position = {
        x: sparkCategoryNode.position.x,
        y: currentY,
      };
    }
  }

  // Position engineering courses in hierarchical levels
  const engineeringCategoryNode = categoryNodes.find((n) => n.id === "category-engineering");
  if (engineeringCategoryNode && courseNodes.length > 0) {
    const engr091 = courseNodes.find((n) => n.id === "engr-091");
    const engr065 = courseNodes.find((n) => n.id === "engr-065");

    const verticalSpacing = 140;
    let currentY = 280; // Start below category nodes

    // Level 2: ENGR 091 (directly below Engineering category)
    if (engr091) {
      engr091.targetPosition = "top" as any;
      engr091.sourcePosition = "bottom" as any;
      engr091.position = {
        x: engineeringCategoryNode.position.x,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 3: ENGR 065 (below ENGR 091)
    if (engr065) {
      engr065.targetPosition = "top" as any;
      engr065.sourcePosition = "bottom" as any;
      engr065.position = {
        x: engineeringCategoryNode.position.x,
        y: currentY,
      };
    }
  }

  // Position CSE courses in hierarchical levels with branching
  const cseCategoryNode = categoryNodes.find((n) => n.id === "category-cse");
  if (cseCategoryNode && courseNodes.length > 0) {
    const cse022 = courseNodes.find((n) => n.id === "cse-022");
    const cse015 = courseNodes.find((n) => n.id === "cse-015");
    const cse024 = courseNodes.find((n) => n.id === "cse-024");
    const cse030 = courseNodes.find((n) => n.id === "cse-030");
    const cse031 = courseNodes.find((n) => n.id === "cse-031");
    const cse100 = courseNodes.find((n) => n.id === "cse-100");
    const cse120 = courseNodes.find((n) => n.id === "cse-120");

    const verticalSpacing = 140;
    // Keep horizontal spacing the same since category spacing increases provide room
    const horizontalSpacing = useFormattedLayout ? 200 : 220;
    let currentY = 280; // Start below category nodes

    // Level 1: CSE 022 (directly below CSE category)
    if (cse022) {
      cse022.targetPosition = "top" as any;
      cse022.sourcePosition = "bottom" as any;
      cse022.position = {
        x: cseCategoryNode.position.x,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 2: CSE 015 (left) and CSE 024 (right) - both from CSE 022
    if (cse015 && cse024) {
      cse015.targetPosition = "top" as any;
      cse015.sourcePosition = "bottom" as any;
      cse015.position = {
        x: cseCategoryNode.position.x - horizontalSpacing / 2,
        y: currentY,
      };

      cse024.targetPosition = "top" as any;
      cse024.sourcePosition = "bottom" as any;
      cse024.position = {
        x: cseCategoryNode.position.x + horizontalSpacing / 2,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 3: CSE 030 (center, from both CSE 015 and CSE 024)
    if (cse030) {
      cse030.targetPosition = "top" as any;
      cse030.sourcePosition = "bottom" as any;
      cse030.position = {
        x: cseCategoryNode.position.x,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 4: CSE 031 (left) and CSE 100 (right) - both from CSE 030
    if (cse031 && cse100) {
      cse031.targetPosition = "top" as any;
      cse031.sourcePosition = "bottom" as any;
      cse031.position = {
        x: cseCategoryNode.position.x - horizontalSpacing / 2,
        y: currentY,
      };

      cse100.targetPosition = "top" as any;
      cse100.sourcePosition = "bottom" as any;
      cse100.position = {
        x: cseCategoryNode.position.x + horizontalSpacing / 2,
        y: currentY,
      };
      currentY += verticalSpacing;
    }

    // Level 5: CSE 120 (center, from both CSE 031 and CSE 100)
    if (cse120) {
      cse120.targetPosition = "top" as any;
      cse120.sourcePosition = "bottom" as any;
      cse120.position = {
        x: cseCategoryNode.position.x,
        y: currentY,
      };
    }
  }
  
  return { nodes, edges };
}

export default function PrerequisiteGraph() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [useFormattedLayout, setUseFormattedLayout] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const { nodes, edges } = useMemo(() => {
    // Create root node: CS/CSE
    const rootNode: Node = {
      id: "cs-cse-root",
      type: "root",
      data: { label: "CS/CSE" },
      position: { x: 0, y: 0 },
    };

    // Create category nodes: Math, Writing, Physics, Spark, Engineering, CSE
    const categories = ["Math", "Writing", "Physics", "Spark", "Engineering", "CSE"];
    const categoryNodes: Node[] = categories.map((category) => {
      const categoryId = `category-${category.toLowerCase()}`;
      return {
        id: categoryId,
        type: "category",
        data: { 
          label: category,
          isExpanded: expandedCategories.has(categoryId),
          onToggle: () => toggleCategory(categoryId),
        },
        position: { x: 0, y: 0 },
      };
    });

    // Create edges from root to each category
    const categoryEdges: Edge[] = categoryNodes.map((catNode) => ({
      id: `root-${catNode.id}`,
      source: "cs-cse-root",
      target: catNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Get math courses when Math category is expanded
    const mathCategoryId = "category-math";
    const isMathExpanded = expandedCategories.has(mathCategoryId);
    
    const mathCourseNodes: Node[] = [];
    const mathCourseEdges: Edge[] = [];

    if (isMathExpanded) {
      // Filter math courses (courses starting with "math-")
      const mathCourses = cseCourses.filter((course) => course.id.startsWith("math-"));
      
      // Create course nodes for math courses
      mathCourses.forEach((course) => {
        mathCourseNodes.push({
          id: course.id,
          type: "course",
          data: { course },
          position: { x: 0, y: 0 },
        });
      });

      // Create edges for math course prerequisites
      mathCourses.forEach((course) => {
        if (course.prerequisites.length === 0) {
          // Course with no prerequisites (MATH 021) connects from Math category
          mathCourseEdges.push({
            id: `${mathCategoryId}-${course.id}`,
            source: mathCategoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // Course with prerequisites connects from prerequisite courses
          course.prerequisites.forEach((prereqId) => {
            // Only create edge if prerequisite is also a math course
            if (prereqId.startsWith("math-")) {
              mathCourseEdges.push({
                id: `${prereqId}-${course.id}`,
                source: prereqId,
                target: course.id,
                type: "smoothstep",
                animated: false,
                style: { stroke: "#94a3b8", strokeWidth: 2 },
              });
            }
          });
        }
      });
    }

    // Get writing courses when Writing category is expanded
    const writingCategoryId = "category-writing";
    const isWritingExpanded = expandedCategories.has(writingCategoryId);
    
    const writingCourseNodes: Node[] = [];
    const writingCourseEdges: Edge[] = [];

    if (isWritingExpanded) {
      // Filter writing courses (courses starting with "wri-")
      const writingCourses = cseCourses.filter((course) => course.id.startsWith("wri-"));
      
      // Create course nodes for writing courses
      writingCourses.forEach((course) => {
        writingCourseNodes.push({
          id: course.id,
          type: "course",
          data: { course },
          position: { x: 0, y: 0 },
        });
      });

      // Create edges for writing course prerequisites
      writingCourses.forEach((course) => {
        if (course.prerequisites.length === 0) {
          // Course with no prerequisites (WRI 010) connects from Writing category
          writingCourseEdges.push({
            id: `${writingCategoryId}-${course.id}`,
            source: writingCategoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // Course with prerequisites connects from prerequisite courses
          course.prerequisites.forEach((prereqId) => {
            // Only create edge if prerequisite is also a writing course
            if (prereqId.startsWith("wri-")) {
              writingCourseEdges.push({
                id: `${prereqId}-${course.id}`,
                source: prereqId,
                target: course.id,
                type: "smoothstep",
                animated: false,
                style: { stroke: "#94a3b8", strokeWidth: 2 },
              });
            }
          });
        }
      });
    }

    // Get physics courses when Physics category is expanded
    const physicsCategoryId = "category-physics";
    const isPhysicsExpanded = expandedCategories.has(physicsCategoryId);
    
    const physicsCourseNodes: Node[] = [];
    const physicsCourseEdges: Edge[] = [];

    if (isPhysicsExpanded) {
      // Filter physics courses (courses starting with "phys-")
      const physicsCourses = cseCourses.filter((course) => course.id.startsWith("phys-"));
      
      // Create course nodes for physics courses
      physicsCourses.forEach((course) => {
        physicsCourseNodes.push({
          id: course.id,
          type: "course",
          data: { course },
          position: { x: 0, y: 0 },
        });
      });

      // Create edges for physics course prerequisites
      physicsCourses.forEach((course) => {
        if (course.prerequisites.length === 0) {
          // Course with no prerequisites (PHYS 008) connects from Physics category
          physicsCourseEdges.push({
            id: `${physicsCategoryId}-${course.id}`,
            source: physicsCategoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // Course with prerequisites connects from prerequisite courses
          course.prerequisites.forEach((prereqId) => {
            // Only create edge if prerequisite is also a physics course
            if (prereqId.startsWith("phys-")) {
              physicsCourseEdges.push({
                id: `${prereqId}-${course.id}`,
                source: prereqId,
                target: course.id,
                type: "smoothstep",
                animated: false,
                style: { stroke: "#94a3b8", strokeWidth: 2 },
              });
            }
          });
        }
      });
    }

    // Get spark courses when Spark category is expanded
    const sparkCategoryId = "category-spark";
    const isSparkExpanded = expandedCategories.has(sparkCategoryId);
    
    const sparkCourseNodes: Node[] = [];
    const sparkCourseEdges: Edge[] = [];

    if (isSparkExpanded) {
      // Filter spark courses (course with id "spark")
      const sparkCourses = cseCourses.filter((course) => course.id === "spark");
      
      // Create course nodes for spark courses
      sparkCourses.forEach((course) => {
        sparkCourseNodes.push({
          id: course.id,
          type: "course",
          data: { course },
          position: { x: 0, y: 0 },
        });
      });

      // Create edges for spark course prerequisites
      sparkCourses.forEach((course) => {
        if (course.prerequisites.length === 0) {
          // Course with no prerequisites connects from Spark category
          sparkCourseEdges.push({
            id: `${sparkCategoryId}-${course.id}`,
            source: sparkCategoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // Course with prerequisites connects from prerequisite courses
          course.prerequisites.forEach((prereqId) => {
            // Check if prerequisite is also a spark course (for future expansion)
            if (prereqId === "spark") {
              sparkCourseEdges.push({
                id: `${prereqId}-${course.id}`,
                source: prereqId,
                target: course.id,
                type: "smoothstep",
                animated: false,
                style: { stroke: "#94a3b8", strokeWidth: 2 },
              });
            }
          });
        }
      });
    }

    // Get engineering courses when Engineering category is expanded
    const engineeringCategoryId = "category-engineering";
    const isEngineeringExpanded = expandedCategories.has(engineeringCategoryId);
    
    const engineeringCourseNodes: Node[] = [];
    const engineeringCourseEdges: Edge[] = [];

    if (isEngineeringExpanded) {
      // Filter engineering courses (courses starting with "engr-")
      const engineeringCourses = cseCourses.filter((course) => course.id.startsWith("engr-"));
      
      // Create course nodes for engineering courses
      engineeringCourses.forEach((course) => {
        engineeringCourseNodes.push({
          id: course.id,
          type: "course",
          data: { course },
          position: { x: 0, y: 0 },
        });
      });

      // Create edges for engineering course prerequisites
      // Note: We'll create edges based on the diagram structure: ENGR 091 -> ENGR 065
      engineeringCourses.forEach((course) => {
        if (course.id === "engr-091") {
          // ENGR 091 has no prerequisites, connects from Engineering category
          engineeringCourseEdges.push({
            id: `${engineeringCategoryId}-${course.id}`,
            source: engineeringCategoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else if (course.id === "engr-065") {
          // ENGR 065 connects from ENGR 091 (as per diagram structure)
          engineeringCourseEdges.push({
            id: `engr-091-${course.id}`,
            source: "engr-091",
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // For other engineering courses, check prerequisites
          course.prerequisites.forEach((prereqId) => {
            // Only create edge if prerequisite is also an engineering course
            if (prereqId.startsWith("engr-")) {
              engineeringCourseEdges.push({
                id: `${prereqId}-${course.id}`,
                source: prereqId,
                target: course.id,
                type: "smoothstep",
                animated: false,
                style: { stroke: "#94a3b8", strokeWidth: 2 },
              });
            }
          });
        }
      });
    }

    // Get CSE courses when CSE category is expanded
    const cseCategoryId = "category-cse";
    const isCseExpanded = expandedCategories.has(cseCategoryId);
    
    const cseCourseNodes: Node[] = [];
    const cseCourseEdges: Edge[] = [];

    if (isCseExpanded) {
      // Filter CSE courses (courses starting with "cse-")
      const filteredCseCourses = cseCourses.filter((course) => course.id.startsWith("cse-"));
      
      // Create course nodes for CSE courses
      filteredCseCourses.forEach((course) => {
        cseCourseNodes.push({
          id: course.id,
          type: "course",
          data: { course },
          position: { x: 0, y: 0 },
        });
      });

      // Create edges for CSE course prerequisites
      filteredCseCourses.forEach((course) => {
        if (course.prerequisites.length === 0) {
          // Course with no prerequisites (CSE 022) connects from CSE category
          cseCourseEdges.push({
            id: `${cseCategoryId}-${course.id}`,
            source: cseCategoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // Course with prerequisites connects from prerequisite courses
          course.prerequisites.forEach((prereqId) => {
            // Only create edge if prerequisite is also a CSE course
            if (prereqId.startsWith("cse-")) {
              cseCourseEdges.push({
                id: `${prereqId}-${course.id}`,
                source: prereqId,
                target: course.id,
                type: "smoothstep",
                animated: false,
                style: { stroke: "#94a3b8", strokeWidth: 2 },
              });
            }
          });
        }
      });
    }

    // Combine all nodes
    const allNodes = [rootNode, ...categoryNodes, ...mathCourseNodes, ...writingCourseNodes, ...physicsCourseNodes, ...sparkCourseNodes, ...engineeringCourseNodes, ...cseCourseNodes];
    const allEdges = [...categoryEdges, ...mathCourseEdges, ...writingCourseEdges, ...physicsCourseEdges, ...sparkCourseEdges, ...engineeringCourseEdges, ...cseCourseEdges];

    // Apply layout
    return getLayoutedElements(allNodes, allEdges, useFormattedLayout);
  }, [expandedCategories, useFormattedLayout]);

  return (
    <div className="w-full h-[800px] border border-border rounded-lg overflow-hidden relative">
      <button
        onClick={() => setUseFormattedLayout(!useFormattedLayout)}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-md hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        {useFormattedLayout ? "Use Compact Layout" : "Format Layout (No Overlap)"}
      </button>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#e2e8f0" gap={16} />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}


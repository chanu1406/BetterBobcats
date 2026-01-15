"use client";

/**
 * PrerequisiteGraph Component
 * Interactive prerequisite graph visualization using React Flow
 * Used on: Degrees page (Political Science degree overview)
 */

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ReactFlowProvider,
  Handle,
  Position,
  NodeChange,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { Course } from "@/types/course";
import { politicalScienceCourses } from "../data/courses";

// Custom circular node component for Political Science root
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
      className={`px-3 py-2 rounded-lg border-2 min-w-[150px] max-w-[190px] ${colors.bg} ${colors.border} shadow-sm relative`}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="text-xs font-semibold text-foreground break-words text-center leading-tight">
        {course.fullName}
      </div>
    </div>
  );
}

// Define nodeTypes outside component to avoid React Flow warning
const nodeTypes = {
  root: RootNode,
  category: CategoryNode,
  course: CourseNode,
};

// Predefined optimal positions when formatted layout is active
// These positions were manually arranged to prevent overlap
const FORMATTED_LAYOUT_POSITIONS: Record<string, { x: number; y: number }> = {
  "political-science-root": { x: 0, y: 40 },
  "category-writing": { x: -180, y: 160 },
  "category-spark": { x: 7.981819388278495, y: 160 },
  "category-poli": { x: 180, y: 160 },
  "wri-010": { x: -461, y: 270 },
  "wri-upper-div": { x: -461, y: 365.9806335449219 },
  "spark": { x: -47.87273571794947, y: 262.96205906400047 },
  "poli-001": { x: 220.60505629833426, y: 259.395367411941 },
  "poli-010": { x: 434.6717313375043, y: 260.417879148883 },
  "poli-lower-div": { x: 658.8460386121618, y: 259.4360950973011 },
  "poli-lower-div-fall": { x: 383.42343540770867, y: 441.8695381970031 },
  "poli-upper-div-american": { x: 597.7871542004634, y: 443.1013869925644 },
  "poli-upper-div-american-spring": { x: 821.1054174676859, y: 441.32087163409983 },
  "poli-upper-div": { x: 167.21340325956692, y: 441.1252244177068 },
  "poli-upper-div-american-fall-y3": { x: 849.9696839271109, y: 547.6500879731847 },
  "poli-upper-div-breadth-fall": { x: 167.66442818327675, y: 553.3264622538851 },
  "poli-upper-div-american-spring-y3": { x: 623.9351427681949, y: 549.454980927966 },
  "poli-upper-div-breadth-spring": { x: 398.3872985579179, y: 551.2276358587452 },
  "poli-upper-div-fall-y4": { x: 511.519888674375, y: 653.1150522000253 },
  "poli-upper-div-spring-y4": { x: 511.41086979843453, y: 746.5976677366702 },
};

// Layout function - position root at top, categories below, courses in hierarchy
function getLayoutedElements(
  nodes: Node[], 
  edges: Edge[], 
  useFormattedLayout: boolean = false,
  savedPositions: Record<string, { x: number; y: number }> = {}
) {
  const rootNode = nodes.find((n) => n.id === "political-science-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "political-science-root");
  
  // Position root node at the top center
  if (rootNode) {
    rootNode.targetPosition = "bottom" as any;
    rootNode.sourcePosition = "bottom" as any;
    // Use formatted layout position if available, otherwise saved position, otherwise default
    if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[rootNode.id]) {
      rootNode.position = FORMATTED_LAYOUT_POSITIONS[rootNode.id];
    } else {
      rootNode.position = savedPositions[rootNode.id] || { x: 0, y: 40 };
    }
  }
  
  // Position category nodes at level 1 (below root)
  if (useFormattedLayout) {
    // Use predefined positions when formatted layout is active
    categoryNodes.forEach((node) => {
      node.targetPosition = "top" as any;
      node.sourcePosition = "bottom" as any;
      if (FORMATTED_LAYOUT_POSITIONS[node.id]) {
        node.position = FORMATTED_LAYOUT_POSITIONS[node.id];
      } else {
        // Fallback if position not defined
        node.position = savedPositions[node.id] || { x: 0, y: 160 };
      }
    });
  } else {
    // Use calculated positions for compact layout
    const categorySpacing = 180;
    const categoryStartX = categoryNodes.length > 0 ? -((categoryNodes.length - 1) * categorySpacing) / 2 : 0;
    categoryNodes.forEach((node, index) => {
      node.targetPosition = "top" as any;
      node.sourcePosition = "bottom" as any;
      const defaultPosition = {
        x: categoryStartX + index * categorySpacing,
        y: 160,
      };
      node.position = savedPositions[node.id] || defaultPosition;
    });
  }

  // Position course nodes under their respective categories
  const courseY = 280; // Start below category nodes
  // Increase horizontal spacing when formatted to prevent overlap
  const horizontalSpacing = useFormattedLayout ? 450 : 220; // Spacing between courses at same level

  // Position Writing courses in hierarchical levels (linear chain) - same approach as CS/CSE
  const writingCategoryNode = categoryNodes.find((n) => n.id === "category-writing");
  if (writingCategoryNode && courseNodes.length > 0) {
    const wri010 = courseNodes.find((n) => n.id === "wri-010");
    const wriUpperDiv = courseNodes.find((n) => n.id === "wri-upper-div");

    // Increase vertical spacing when formatted to prevent overlap
    const verticalSpacing = useFormattedLayout ? 280 : 140;
    let currentY = courseY; // Start below category nodes

    // Level 1: WRI 010 (directly below Writing category, centered)
    if (wri010) {
      wri010.targetPosition = "top" as any;
      wri010.sourcePosition = "bottom" as any;
      if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[wri010.id]) {
        wri010.position = FORMATTED_LAYOUT_POSITIONS[wri010.id];
      } else {
        wri010.position = {
          x: writingCategoryNode.position.x,
          y: currentY,
        };
      }
      currentY += verticalSpacing;
    }

    // Level 2: WRI Upper Div (below WRI 010, centered)
    if (wriUpperDiv) {
      wriUpperDiv.targetPosition = "top" as any;
      wriUpperDiv.sourcePosition = "bottom" as any;
      if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[wriUpperDiv.id]) {
        wriUpperDiv.position = FORMATTED_LAYOUT_POSITIONS[wriUpperDiv.id];
      } else {
        wriUpperDiv.position = {
          x: writingCategoryNode.position.x,
          y: currentY,
        };
      }
    }
  }

  // Position Spark courses horizontally
  const sparkCategoryNode = categoryNodes.find((n) => n.id === "category-spark");
  if (sparkCategoryNode) {
    const sparkCourses = courseNodes.filter((n) => n.id === "spark");
    if (sparkCourses.length > 0) {
      sparkCourses.forEach((node, index) => {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        // When formatted layout is active, always use predefined positions if available
        if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[node.id]) {
          node.position = FORMATTED_LAYOUT_POSITIONS[node.id];
        } else if (!useFormattedLayout && savedPositions[node.id]) {
          // Only use saved positions when NOT in formatted layout
          node.position = savedPositions[node.id];
        } else {
          // Calculate position based on category node position
          const sparkStartX = sparkCategoryNode.position.x - ((sparkCourses.length - 1) * horizontalSpacing) / 2;
          node.position = {
            x: sparkStartX + index * horizontalSpacing,
            y: courseY,
          };
        }
      });
    }
  }

  // Position POLI courses by academic year (Year 1, then Year 2)
  const poliCategoryNode = categoryNodes.find((n) => n.id === "category-poli");
  if (poliCategoryNode) {
    // Get all POLI courses (exclude writing courses that also have "upper-div" in their ID)
    const allPoliCourses = courseNodes.filter((n) => 
      n.id.startsWith("poli-") || (n.id.includes("upper-div") && !n.id.startsWith("wri-"))
    );
    
    // Separate by year
    const year1PoliCourses = allPoliCourses.filter((node) => {
      const course = (node.data as { course?: Course })?.course;
      return course && course.year === 1;
    });
    
    const year2PoliCourses = allPoliCourses.filter((node) => {
      const course = (node.data as { course?: Course })?.course;
      return course && course.year === 2;
    });

    const year3PoliCourses = allPoliCourses.filter((node) => {
      const course = (node.data as { course?: Course })?.course;
      return course && course.year === 3;
    });

    const year4PoliCourses = allPoliCourses.filter((node) => {
      const course = (node.data as { course?: Course })?.course;
      return course && course.year === 4;
    });

    // Position Year 1 courses horizontally (Level 1)
    if (year1PoliCourses.length > 0) {
      const year1StartX = poliCategoryNode.position.x - ((year1PoliCourses.length - 1) * horizontalSpacing) / 2;
      year1PoliCourses.forEach((node, index) => {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[node.id]) {
          node.position = FORMATTED_LAYOUT_POSITIONS[node.id];
        } else if (!useFormattedLayout && savedPositions[node.id]) {
          node.position = savedPositions[node.id];
        } else {
          node.position = {
            x: year1StartX + index * horizontalSpacing,
            y: courseY,
          };
        }
      });
    }

    // Position Year 2 courses horizontally (Level 2 - all at same Y level)
    // Increase vertical spacing when formatted to prevent overlap
    const year2VerticalSpacing = useFormattedLayout ? 280 : 140;
    const year2Y = courseY + year2VerticalSpacing; // Below Year 1 courses
    if (year2PoliCourses.length > 0) {
      const year2StartX = poliCategoryNode.position.x - ((year2PoliCourses.length - 1) * horizontalSpacing) / 2;
      year2PoliCourses.forEach((node, index) => {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[node.id]) {
          node.position = FORMATTED_LAYOUT_POSITIONS[node.id];
        } else if (!useFormattedLayout && savedPositions[node.id]) {
          node.position = savedPositions[node.id];
        } else {
          node.position = {
            x: year2StartX + index * horizontalSpacing,
            y: year2Y,
          };
        }
      });
    }

    // Position Year 3 courses horizontally (Level 3 - all at same Y level)
    // Increase vertical spacing when formatted to prevent overlap
    const year3VerticalSpacing = useFormattedLayout ? 280 : 140;
    const year3Y = year2Y + year3VerticalSpacing; // Below Year 2 courses
    if (year3PoliCourses.length > 0) {
      const year3StartX = poliCategoryNode.position.x - ((year3PoliCourses.length - 1) * horizontalSpacing) / 2;
      year3PoliCourses.forEach((node, index) => {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[node.id]) {
          node.position = FORMATTED_LAYOUT_POSITIONS[node.id];
        } else if (!useFormattedLayout && savedPositions[node.id]) {
          node.position = savedPositions[node.id];
        } else {
          node.position = {
            x: year3StartX + index * horizontalSpacing,
            y: year3Y,
          };
        }
      });
    }

    // Position Year 4 courses horizontally (Level 4 - all at same Y level)
    // Increase vertical spacing when formatted to prevent overlap
    const year4VerticalSpacing = useFormattedLayout ? 280 : 140;
    const year4Y = year3Y + year4VerticalSpacing; // Below Year 3 courses
    if (year4PoliCourses.length > 0) {
      const year4StartX = poliCategoryNode.position.x - ((year4PoliCourses.length - 1) * horizontalSpacing) / 2;
      year4PoliCourses.forEach((node, index) => {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[node.id]) {
          node.position = FORMATTED_LAYOUT_POSITIONS[node.id];
        } else if (!useFormattedLayout && savedPositions[node.id]) {
          node.position = savedPositions[node.id];
        } else {
          node.position = {
            x: year4StartX + index * horizontalSpacing,
            y: year4Y,
          };
        }
      });
    }
  }
  
  return { nodes, edges };
}

interface PrerequisiteGraphProps {
  onLayoutChange?: (useFormatted: boolean) => void;
  useFormattedLayoutExternal?: boolean;
  onResetReady?: (resetFn: () => void) => void;
  onFullResetReady?: (resetFn: () => void) => void;
  onExportPositionsReady?: (exportFn: () => void) => void;
}

export default function PrerequisiteGraph({ 
  onLayoutChange, 
  useFormattedLayoutExternal, 
  onResetReady, 
  onFullResetReady,
  onExportPositionsReady
}: PrerequisiteGraphProps) {
  const courses = politicalScienceCourses;
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [useFormattedLayoutInternal, setUseFormattedLayoutInternal] = useState(false);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  
  // Automatically enable formatted layout when any category is expanded
  // This prevents overlap when nodes are shown
  const hasExpandedCategories = expandedCategories.size > 0;
  
  // Use formatted layout if:
  // 1. External prop explicitly sets it to true, OR
  // 2. Any category is expanded (to prevent overlap), OR
  // 3. Internal state is true
  const useFormattedLayout = useFormattedLayoutExternal !== undefined 
    ? (useFormattedLayoutExternal || hasExpandedCategories)
    : (useFormattedLayoutInternal || hasExpandedCategories);
  
  const setUseFormattedLayout = (value: boolean) => {
    if (onLayoutChange) {
      onLayoutChange(value);
    } else {
      setUseFormattedLayoutInternal(value);
    }
  };
  
  // Automatically enable formatted layout when categories are expanded
  // Also clear saved positions when categories expand to force recalculation
  useEffect(() => {
    if (hasExpandedCategories) {
      // Enable formatted layout - update parent state if callback is provided
      if (onLayoutChange && !useFormattedLayoutExternal) {
        onLayoutChange(true);
      } else if (!onLayoutChange && !useFormattedLayoutInternal) {
        setUseFormattedLayoutInternal(true);
      }
      // Clear saved positions for course nodes when categories expand
      // This ensures they get repositioned with the new spacing
      setNodePositions((prev) => {
        const newPositions: Record<string, { x: number; y: number }> = {};
        // Keep only root and category node positions
        Object.keys(prev).forEach((key) => {
          if (key === "political-science-root" || key.startsWith("category-")) {
            newPositions[key] = prev[key];
          }
        });
        return newPositions;
      });
    }
  }, [hasExpandedCategories, useFormattedLayoutExternal, useFormattedLayoutInternal, onLayoutChange]);

  const onNodeDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onNodeDragStop = useCallback((_event: React.MouseEvent, node: Node) => {
    setIsDragging(false);
    setNodePositions((prev) => ({
      ...prev,
      [node.id]: node.position,
    }));
  }, []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodesState((nds) => applyNodeChanges(changes, nds));
    
    changes.forEach((change) => {
      if (change.type === "position" && !change.dragging && change.position && change.id) {
        setNodePositions((prev) => ({
          ...prev,
          [change.id]: { x: change.position!.x, y: change.position!.y },
        }));
      }
    });
  }, []);

  const handleResetPositions = useCallback(() => {
    setNodePositions({});
  }, []);

  const handleFullReset = useCallback(() => {
    setNodePositions({});
    setExpandedCategories(new Set());
    setIsDragging(false);
    setNodesState([]);
    setEdgesState([]);
    
    if (onLayoutChange) {
      onLayoutChange(false);
    } else {
      setUseFormattedLayoutInternal(false);
    }
  }, [onLayoutChange]);

  const resetFnRef = useRef(handleResetPositions);
  resetFnRef.current = handleResetPositions;

  const fullResetFnRef = useRef(handleFullReset);
  fullResetFnRef.current = handleFullReset;

  useEffect(() => {
    resetFnRef.current = handleResetPositions;
  }, [handleResetPositions]);
  
  useEffect(() => {
    fullResetFnRef.current = handleFullReset;
  }, [handleFullReset]);

  useEffect(() => {
    if (!onResetReady) return;
    const rafId = requestAnimationFrame(() => {
      onResetReady(() => resetFnRef.current());
    });
    return () => cancelAnimationFrame(rafId);
  }, [onResetReady]);

  useEffect(() => {
    if (!onFullResetReady) return;
    const rafId = requestAnimationFrame(() => {
      const handler = () => fullResetFnRef.current();
      onFullResetReady(handler);
    });
    return () => cancelAnimationFrame(rafId);
  }, [onFullResetReady, handleFullReset]);

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
    // Create root node: Political Science
    const rootNode: Node = {
      id: "political-science-root",
      type: "root",
      data: { label: "Political Science" },
      position: { x: 0, y: 0 },
    };

    // Create category nodes: Writing, Spark, POLI
    const categories = ["Writing", "Spark", "POLI"];
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
      source: "political-science-root",
      target: catNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Get Writing courses when Writing category is expanded
    const writingCategoryId = "category-writing";
    const isWritingExpanded = expandedCategories.has(writingCategoryId);
    
    const writingCourseNodes: Node[] = [];
    const writingCourseEdges: Edge[] = [];

    if (isWritingExpanded) {
      // Filter writing courses (courses starting with "wri-")
      const writingCourses = courses.filter((course) => course.id.startsWith("wri-"));
      
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
          // Course with no prerequisites connects from Writing category
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

    // Get Spark courses when Spark category is expanded
    const sparkCategoryId = "category-spark";
    const isSparkExpanded = expandedCategories.has(sparkCategoryId);
    
    const sparkCourseNodes: Node[] = [];
    const sparkCourseEdges: Edge[] = [];

    if (isSparkExpanded) {
      // Filter spark courses (course with id "spark")
      const sparkCourses = courses.filter((course) => course.id === "spark");
      
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
            // Check if prerequisite is also a spark course
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

    // Get all POLI courses (both lower and upper division) when POLI category is expanded
    const poliCategoryId = "category-poli";
    const isPoliExpanded = expandedCategories.has(poliCategoryId);
    
    const poliCourseNodes: Node[] = [];
    const poliCourseEdges: Edge[] = [];

    if (isPoliExpanded) {
      // Filter all POLI courses (both lower and upper division, exclude writing courses)
      const allPoliCourses = courses.filter((course) => 
        course.id.startsWith("poli-") || (course.id.includes("upper-div") && !course.id.startsWith("wri-"))
      );
      
      // Separate into lower and upper division
      const lowerDivisionPoliCourses = allPoliCourses.filter((course) => 
        !course.id.includes("upper-div")
      );
      const upperDivisionPoliCourses = allPoliCourses.filter((course) => 
        course.id.includes("upper-div")
      );
      
      // Create course nodes for all POLI courses
      allPoliCourses.forEach((course) => {
        poliCourseNodes.push({
          id: course.id,
          type: "course",
          data: { course },
          position: { x: 0, y: 0 },
        });
      });

      // Create edges for Lower Division POLI course prerequisites
      lowerDivisionPoliCourses.forEach((course) => {
        if (course.prerequisites.length === 0) {
          // Course with no prerequisites connects from POLI category
          poliCourseEdges.push({
            id: `${poliCategoryId}-${course.id}`,
            source: poliCategoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // Course with prerequisites connects from prerequisite courses
          course.prerequisites.forEach((prereqId) => {
            // Only create edge if prerequisite is also a POLI course (lower to lower)
            if (prereqId.startsWith("poli-")) {
              poliCourseEdges.push({
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

      // Create edges for Upper Division POLI course prerequisites
      upperDivisionPoliCourses.forEach((course) => {
        if (course.prerequisites.length === 0) {
          // Course with no prerequisites connects directly from root node
          poliCourseEdges.push({
            id: `political-science-root-${course.id}`,
            source: "political-science-root",
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        } else {
          // Course with prerequisites connects from prerequisite courses
          course.prerequisites.forEach((prereqId) => {
            // Create edge if prerequisite is a POLI course (can be lower or upper division)
            if (prereqId.startsWith("poli-") || prereqId.includes("upper-div")) {
              poliCourseEdges.push({
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
    const allNodes = [
      rootNode, 
      ...categoryNodes, 
      ...writingCourseNodes, 
      ...sparkCourseNodes, 
      ...poliCourseNodes
    ];
    const allEdges = [
      ...categoryEdges, 
      ...writingCourseEdges, 
      ...sparkCourseEdges, 
      ...poliCourseEdges
    ];

    // Apply layout
    return getLayoutedElements(allNodes, allEdges, useFormattedLayout, nodePositions);
  }, [courses, expandedCategories, useFormattedLayout, nodePositions]);

  useEffect(() => {
    if (!isDragging) {
      setNodesState((currentNodes) => {
        const positionMap = new Map(currentNodes.map(n => [n.id, n.position]));
        return nodes.map(node => ({
          ...node,
          position: positionMap.get(node.id) || node.position,
        }));
      });
      setEdgesState(edges);
    }
  }, [nodes, edges, isDragging]);

  useEffect(() => {
    if (nodesState.length === 0 && nodes.length > 0) {
      setNodesState(nodes);
      setEdgesState(edges);
    }
  }, [nodes, edges, nodesState.length]);

  const displayNodes = isDragging ? nodesState : nodes;
  const displayEdges = isDragging ? edgesState : edges;

  // Function to export current node positions
  const exportNodePositions = useCallback(() => {
    const currentNodes = nodesState.length > 0 ? nodesState : nodes;
    const positions: Record<string, { x: number; y: number }> = {};
    
    currentNodes.forEach((node) => {
      positions[node.id] = { x: node.position.x, y: node.position.y };
    });

    // Format as a JavaScript object that can be easily copied
    const formatted = JSON.stringify(positions, null, 2);
    
    console.log("=== NODE POSITIONS ===");
    console.log(formatted);
    console.log("=== COPY THE ABOVE JSON ===");
    
    // Also copy to clipboard if possible
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formatted).then(() => {
        console.log("✓ Positions copied to clipboard!");
      }).catch((err) => {
        console.warn("Could not copy to clipboard:", err);
      });
    }
    
    return positions;
  }, [nodesState, nodes]);

  // Expose export function to parent
  const exportPositionsRef = useRef<(() => void) | null>(null);
  exportPositionsRef.current = exportNodePositions;

  useEffect(() => {
    if (!onExportPositionsReady) return;
    const rafId = requestAnimationFrame(() => {
      onExportPositionsReady(() => exportPositionsRef.current?.());
    });
    return () => cancelAnimationFrame(rafId);
  }, [onExportPositionsReady]);

  // Also expose to window for console access
  useEffect(() => {
    (window as any).exportPoliticalScienceNodePositions = exportNodePositions;
    return () => {
      delete (window as any).exportPoliticalScienceNodePositions;
    };
  }, [exportNodePositions]);

  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
      <div className="w-full h-[800px] relative [&_.react-flow__background]:opacity-30">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodesState.length > 0 ? nodesState : nodes}
            edges={edgesState.length > 0 ? edgesState : edges}
            nodeTypes={memoizedNodeTypes}
            onNodesChange={onNodesChange}
            onNodeDragStart={onNodeDragStart}
            onNodeDragStop={onNodeDragStop}
            nodesDraggable={true}
            fitView={!isDragging}
            fitViewOptions={{ padding: 0.1, maxZoom: 1.5 }}
            attributionPosition="bottom-left"
          >
            <Background variant={"lines" as any} color="#e2e8f0" gap={16} />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div className="w-full px-4 py-2 bg-muted/20 border-t border-border/40">
        <p className="text-xs text-black text-center">
          Graph will be populated with course data.
        </p>
      </div>
    </div>
  );
}

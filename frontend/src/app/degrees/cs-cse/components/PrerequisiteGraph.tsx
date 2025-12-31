"use client";

/**
 * PrerequisiteGraph Component
 * Interactive prerequisite graph visualization using React Flow
 * Used on: Degrees page (CS/CSE degree overview)
 */

import { useMemo, useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
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
import { fetchCourses } from "@/lib/api";

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

// Helper function to check if two nodes overlap
function nodesOverlap(
  node1: Node, 
  node2: Node, 
  minSpacing: number = 180
): boolean {
  const dx = Math.abs(node1.position.x - node2.position.x);
  const dy = Math.abs(node1.position.y - node2.position.y);
  // Approximate node sizes: category nodes ~80px, course nodes ~180px wide, 60px tall
  const node1Width = node1.type === "category" ? 80 : 180;
  const node1Height = node1.type === "category" ? 80 : 60;
  const node2Width = node2.type === "category" ? 80 : 180;
  const node2Height = node2.type === "category" ? 80 : 60;
  
  const minDistanceX = (node1Width + node2Width) / 2 + minSpacing;
  const minDistanceY = (node1Height + node2Height) / 2 + minSpacing;
  
  return dx < minDistanceX && dy < minDistanceY;
}

// Helper function to adjust position to avoid overlaps
function adjustPositionToAvoidOverlap(
  node: Node,
  otherNodes: Node[],
  defaultPosition: { x: number; y: number },
  minSpacing: number = 180
): { x: number; y: number } {
  let position = { ...defaultPosition };
  let attempts = 0;
  const maxAttempts = 50;
  
  while (attempts < maxAttempts) {
    let hasOverlap = false;
    for (const otherNode of otherNodes) {
      if (otherNode.id !== node.id && nodesOverlap({ ...node, position }, otherNode, minSpacing)) {
        hasOverlap = true;
        // Try moving slightly away
        const dx = otherNode.position.x - position.x;
        const dy = otherNode.position.y - position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
          const moveDistance = minSpacing + 50;
          position.x = otherNode.position.x - (dx / distance) * moveDistance;
          position.y = otherNode.position.y - (dy / distance) * moveDistance;
        } else {
          // If nodes are at same position, move randomly
          position.x += (Math.random() - 0.5) * minSpacing * 2;
          position.y += (Math.random() - 0.5) * minSpacing * 2;
        }
        break;
      }
    }
    if (!hasOverlap) {
      break;
    }
    attempts++;
  }
  
  return position;
}

// Layout function - position root at top, categories below, courses in hierarchy
function getLayoutedElements(
  nodes: Node[], 
  edges: Edge[], 
  useFormattedLayout: boolean = false,
  savedPositions: Record<string, { x: number; y: number }> = {}
) {
  const rootNode = nodes.find((n) => n.id === "cs-cse-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "cs-cse-root");
  
  // Position root node at the top center
  if (rootNode) {
    rootNode.targetPosition = "bottom" as any;
    rootNode.sourcePosition = "bottom" as any;
    // Use saved position if available, otherwise use default
    rootNode.position = savedPositions[rootNode.id] || { x: 0, y: 40 };
  }
  
  // Position category nodes at level 1 (below root)
  // Use wider spacing when formatted layout is enabled to prevent overlaps
  const categorySpacing = useFormattedLayout ? 350 : 180;
  const categoryStartX = -((categoryNodes.length - 1) * categorySpacing) / 2;
  categoryNodes.forEach((node, index) => {
    node.targetPosition = "top" as any;
    node.sourcePosition = "bottom" as any;
    // Use saved position if available, otherwise use calculated position
    const defaultPosition = {
      x: categoryStartX + index * categorySpacing,
      y: 160,
    };
    if (!savedPositions[node.id]) {
      node.position = defaultPosition;
    } else {
      // Check for overlaps and adjust if needed
      const savedPos = savedPositions[node.id];
      const allOtherNodes = [...categoryNodes.filter(n => n.id !== node.id), rootNode].filter(Boolean) as Node[];
      node.position = adjustPositionToAvoidOverlap(node, allOtherNodes, savedPos, categorySpacing * 0.8);
    }
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
      const defaultPosition = {
        x: mathCategoryNode.position.x,
        y: currentY,
      };
      if (!savedPositions[math021.id]) {
        math021.position = defaultPosition;
      } else {
        const allOtherNodes = [...categoryNodes, rootNode, ...courseNodes.filter(n => n.id !== math021.id)].filter(Boolean) as Node[];
        math021.position = adjustPositionToAvoidOverlap(math021, allOtherNodes, savedPositions[math021.id], 180);
      }
      currentY += verticalSpacing;
    }

    // Level 3: MATH 022 (below MATH 021)
    if (math022) {
      math022.targetPosition = "top" as any;
      math022.sourcePosition = "bottom" as any;
      if (!savedPositions[math022.id]) {
        math022.position = {
          x: mathCategoryNode.position.x,
          y: currentY,
        };
      } else {
        math022.position = savedPositions[math022.id];
      }
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
          if (!savedPositions[node.id]) {
            node.position = {
              x: level4StartX + index * horizontalSpacing,
              y: currentY,
            };
          } else {
            node.position = savedPositions[node.id];
          }
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
      if (!savedPositions[wri010.id]) {
        wri010.position = {
          x: writingCategoryNode.position.x,
          y: currentY,
        };
      } else {
        wri010.position = savedPositions[wri010.id];
      }
      currentY += verticalSpacing;
    }

    // Level 3: WRI Upper Div (below WRI 010)
    if (wriUpperDiv) {
      wriUpperDiv.targetPosition = "top" as any;
      wriUpperDiv.sourcePosition = "bottom" as any;
      if (!savedPositions[wriUpperDiv.id]) {
        wriUpperDiv.position = {
          x: writingCategoryNode.position.x,
          y: currentY,
        };
      } else {
        wriUpperDiv.position = savedPositions[wriUpperDiv.id];
      }
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
      if (!savedPositions[phys008.id]) {
        phys008.position = {
          x: physicsCategoryNode.position.x,
          y: currentY,
        };
      } else {
        phys008.position = savedPositions[phys008.id];
      }
      currentY += verticalSpacing;
    }

    // Level 3: PHYS 009 + 009L (below PHYS 008)
    if (phys009) {
      phys009.targetPosition = "top" as any;
      phys009.sourcePosition = "bottom" as any;
      if (!savedPositions[phys009.id]) {
        phys009.position = {
          x: physicsCategoryNode.position.x,
          y: currentY,
        };
      } else {
        phys009.position = savedPositions[phys009.id];
      }
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
      if (!savedPositions[spark.id]) {
        spark.position = {
          x: sparkCategoryNode.position.x,
          y: currentY,
        };
      } else {
        spark.position = savedPositions[spark.id];
      }
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
      if (!savedPositions[engr091.id]) {
        engr091.position = {
          x: engineeringCategoryNode.position.x,
          y: currentY,
        };
      } else {
        engr091.position = savedPositions[engr091.id];
      }
      currentY += verticalSpacing;
    }

    // Level 3: ENGR 065 (below ENGR 091)
    if (engr065) {
      engr065.targetPosition = "top" as any;
      engr065.sourcePosition = "bottom" as any;
      if (!savedPositions[engr065.id]) {
        engr065.position = {
          x: engineeringCategoryNode.position.x,
          y: currentY,
        };
      } else {
        engr065.position = savedPositions[engr065.id];
      }
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
      if (!savedPositions[cse022.id]) {
        cse022.position = {
          x: cseCategoryNode.position.x,
          y: currentY,
        };
      } else {
        cse022.position = savedPositions[cse022.id];
      }
      currentY += verticalSpacing;
    }

    // Level 2: CSE 015 (left) and CSE 024 (right) - both from CSE 022
    if (cse015 && cse024) {
      cse015.targetPosition = "top" as any;
      cse015.sourcePosition = "bottom" as any;
      if (!savedPositions[cse015.id]) {
        cse015.position = {
          x: cseCategoryNode.position.x - horizontalSpacing / 2,
          y: currentY,
        };
      } else {
        cse015.position = savedPositions[cse015.id];
      }

      cse024.targetPosition = "top" as any;
      cse024.sourcePosition = "bottom" as any;
      if (!savedPositions[cse024.id]) {
        cse024.position = {
          x: cseCategoryNode.position.x + horizontalSpacing / 2,
          y: currentY,
        };
      } else {
        cse024.position = savedPositions[cse024.id];
      }
      currentY += verticalSpacing;
    }

    // Level 3: CSE 030 (center, from both CSE 015 and CSE 024)
    if (cse030) {
      cse030.targetPosition = "top" as any;
      cse030.sourcePosition = "bottom" as any;
      if (!savedPositions[cse030.id]) {
        cse030.position = {
          x: cseCategoryNode.position.x,
          y: currentY,
        };
      } else {
        cse030.position = savedPositions[cse030.id];
      }
      currentY += verticalSpacing;
    }

    // Level 4: CSE 031 (left) and CSE 100 (right) - both from CSE 030
    if (cse031 && cse100) {
      cse031.targetPosition = "top" as any;
      cse031.sourcePosition = "bottom" as any;
      if (!savedPositions[cse031.id]) {
        cse031.position = {
          x: cseCategoryNode.position.x - horizontalSpacing / 2,
          y: currentY,
        };
      } else {
        cse031.position = savedPositions[cse031.id];
      }

      cse100.targetPosition = "top" as any;
      cse100.sourcePosition = "bottom" as any;
      if (!savedPositions[cse100.id]) {
        cse100.position = {
          x: cseCategoryNode.position.x + horizontalSpacing / 2,
          y: currentY,
        };
      } else {
        cse100.position = savedPositions[cse100.id];
      }
      currentY += verticalSpacing;
    }

    // Level 5: CSE 120 (center, from both CSE 031 and CSE 100)
    if (cse120) {
      cse120.targetPosition = "top" as any;
      cse120.sourcePosition = "bottom" as any;
      if (!savedPositions[cse120.id]) {
        cse120.position = {
          x: cseCategoryNode.position.x,
          y: currentY,
        };
      } else {
        cse120.position = savedPositions[cse120.id];
      }
    }
  }
  
  // Final pass: ensure no overlaps for all nodes with saved positions
  nodes.forEach((node) => {
    if (savedPositions[node.id]) {
      const allOtherNodes = nodes.filter(n => n.id !== node.id);
      const currentPos = node.position;
      const adjustedPos = adjustPositionToAvoidOverlap(node, allOtherNodes, currentPos, 180);
      node.position = adjustedPos;
    }
  });
  
  return { nodes, edges };
}

interface PrerequisiteGraphProps {
  onLayoutChange?: (useFormatted: boolean) => void;
  useFormattedLayoutExternal?: boolean;
  onResetReady?: (resetFn: () => void) => void;
  onFullResetReady?: (resetFn: () => void) => void;
}

export default function PrerequisiteGraph({ onLayoutChange, useFormattedLayoutExternal, onResetReady, onFullResetReady }: PrerequisiteGraphProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [useFormattedLayoutInternal, setUseFormattedLayoutInternal] = useState(false);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  
  // Use external state if provided, otherwise use internal state
  const useFormattedLayout = useFormattedLayoutExternal !== undefined ? useFormattedLayoutExternal : useFormattedLayoutInternal;
  
  const setUseFormattedLayout = (value: boolean) => {
    if (onLayoutChange) {
      onLayoutChange(value);
    } else {
      setUseFormattedLayoutInternal(value);
    }
  };

  // Fetch courses from API on mount
  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses");
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  // Handle node drag start
  const onNodeDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  // Handle node drag stop - save final position
  const onNodeDragStop = useCallback((_event: React.MouseEvent, node: Node) => {
    setIsDragging(false);
    setNodePositions((prev) => ({
      ...prev,
      [node.id]: node.position,
    }));
  }, []);

  // Handle node changes - let React Flow handle drag updates internally
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    // Apply changes to nodes state so React Flow can handle dragging smoothly
    setNodesState((nds) => applyNodeChanges(changes, nds));
    
    // Save positions when drag ends (not during drag to avoid conflicts)
    changes.forEach((change) => {
      if (change.type === "position" && !change.dragging && change.position && change.id) {
        setNodePositions((prev) => ({
          ...prev,
          [change.id]: { x: change.position!.x, y: change.position!.y },
        }));
      }
    });
  }, []);

  // Reset node positions to default layout
  const handleResetPositions = useCallback(() => {
    setNodePositions({});
  }, []);

  // Full reset: positions, expanded categories, and layout
  // Full reset: positions, expanded categories, layout, and view
  const handleFullReset = useCallback(() => {
    // Reset all state to original values
    setNodePositions({});
    setExpandedCategories(new Set());
    setIsDragging(false);
    
    // Clear nodesState and edgesState so they get recalculated from fresh layout
    setNodesState([]);
    setEdgesState([]);
    
    // Reset layout format
    if (onLayoutChange) {
      onLayoutChange(false);
    } else {
      setUseFormattedLayoutInternal(false);
    }
    
    // Trigger fitView after a brief delay to ensure layout is recalculated
    setTimeout(() => {
      // The fitView prop will handle this automatically when isDragging is false
      // and nodesState is empty (which triggers recalculation from nodes)
    }, 100);
  }, [onLayoutChange]);

  // Use refs to store the latest reset functions
  const resetFnRef = useRef(handleResetPositions);
  resetFnRef.current = handleResetPositions;

  const fullResetFnRef = useRef(handleFullReset);
  fullResetFnRef.current = handleFullReset;

  // Update refs when functions change
  useEffect(() => {
    resetFnRef.current = handleResetPositions;
  }, [handleResetPositions]);
  
  useEffect(() => {
    fullResetFnRef.current = handleFullReset;
  }, [handleFullReset]);

  // Expose reset handler to parent component
  // Use useEffect to register handler after render completes
  useEffect(() => {
    if (!onResetReady) return;
    // Use requestAnimationFrame to ensure this runs after render phase
    const rafId = requestAnimationFrame(() => {
      onResetReady(() => resetFnRef.current());
    });
    return () => cancelAnimationFrame(rafId);
  }, [onResetReady]);

  // Expose full reset handler to parent component
  // Use useEffect to register handler after render completes
  useEffect(() => {
    if (!onFullResetReady) return;
    // Use requestAnimationFrame to ensure this runs after render phase
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
      const mathCourses = courses.filter((course) => course.id.startsWith("math-"));
      
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
      const physicsCourses = courses.filter((course) => course.id.startsWith("phys-"));
      
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
      const engineeringCourses = courses.filter((course) => course.id.startsWith("engr-"));
      
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
      const filteredCseCourses = courses.filter((course) => course.id.startsWith("cse-"));
      
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

    // Apply layout (preserving saved positions)
    // Don't recalculate layout during drag to prevent nodes from disappearing
    return getLayoutedElements(allNodes, allEdges, useFormattedLayout, nodePositions);
  }, [courses, expandedCategories, useFormattedLayout, nodePositions]);

  // Always use controlled nodes/edges - sync from layout when not dragging
  useEffect(() => {
    if (!isDragging) {
      // Update from layout when not dragging, preserving any dragged positions
      setNodesState((currentNodes) => {
        // Create a map of current node positions (including dragged ones)
        const positionMap = new Map(currentNodes.map(n => [n.id, n.position]));
        
        // Update nodes from layout, but preserve positions from current state
        return nodes.map(node => ({
          ...node,
          position: positionMap.get(node.id) || node.position,
        }));
      });
      setEdgesState(edges);
    }
  }, [nodes, edges, isDragging]);

  // Initialize nodesState on first render
  useEffect(() => {
    if (nodesState.length === 0 && nodes.length > 0) {
      setNodesState(nodes);
      setEdgesState(edges);
    }
  }, [nodes, edges, nodesState.length]);

  // Use nodesState during drag, nodes from layout otherwise
  const displayNodes = isDragging ? nodesState : nodes;
  const displayEdges = isDragging ? edgesState : edges;

  // Memoize nodeTypes to prevent React Flow warning - ensure stable reference
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
        <div className="w-full h-[800px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary mb-2">Loading courses...</div>
            <div className="text-sm text-muted-foreground">Fetching data from backend</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
        <div className="w-full h-[800px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-destructive mb-2">Error loading courses</div>
            <div className="text-sm text-muted-foreground">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          Graph reflects typical UC Merced CS/CSE progression.
        </p>
      </div>
    </div>
  );
}


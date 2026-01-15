"use client";

/**
 * PrerequisiteGraph Component - Mechanical Engineering
 * Interactive prerequisite graph visualization using React Flow
 * Used on: Degrees page (Mechanical Engineering degree overview)
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
import { mechanicalEngineeringCourses } from "../data/courses";

// Custom circular node component for ME root
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

// Layout function - position root at top, categories below, courses in hierarchy
function getLayoutedElements(
  nodes: Node[], 
  edges: Edge[], 
  useFormattedLayout: boolean = false,
  savedPositions: Record<string, { x: number; y: number }> = {}
) {
  const rootNode = nodes.find((n) => n.id === "mechanical-engineering-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "mechanical-engineering-root");
  
  // Position root node at the top center
  if (rootNode) {
    rootNode.targetPosition = "bottom" as any;
    rootNode.sourcePosition = "bottom" as any;
    rootNode.position = savedPositions[rootNode.id] || { x: 0, y: 40 };
  }
  
  // Position category nodes at level 1 (below root)
  const categorySpacing = useFormattedLayout ? 350 : 180;
  const categoryStartX = -((categoryNodes.length - 1) * categorySpacing) / 2;
  categoryNodes.forEach((node, index) => {
    node.targetPosition = "top" as any;
    node.sourcePosition = "bottom" as any;
    const defaultPosition = {
      x: categoryStartX + index * categorySpacing,
      y: 160,
    };
    node.position = savedPositions[node.id] || defaultPosition;
  });

  // Position course nodes for each category
  const verticalSpacing = 140;
  const horizontalSpacing = useFormattedLayout ? 200 : 220;

  // Math branch
  const mathCategoryNode = categoryNodes.find((n) => n.id === "category-math");
  if (mathCategoryNode) {
    const mathCourses = [
      { id: "math-021", level: 2, pos: 0 },
      { id: "math-022", level: 3, pos: 0 },
      { id: "math-024", level: 4, pos: -1 },
      { id: "math-023", level: 4, pos: 0 },
      { id: "math-032", level: 4, pos: 1 },
      { id: "math-131", level: 5, pos: 0 },
    ];

    mathCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: mathCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });
  }

  // Physics branch
  const physicsCategoryNode = categoryNodes.find((n) => n.id === "category-physics");
  if (physicsCategoryNode) {
    const physicsCourses = [
      { id: "phys-008", level: 2, pos: -0.3 },
      { id: "phys-008l", level: 2, pos: 0.3 },
      { id: "phys-009", level: 3, pos: -0.3 },
      { id: "phys-009l", level: 3, pos: 0.3 },
    ];

    physicsCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: physicsCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });
  }

  // Chemistry branch
  const chemistryCategoryNode = categoryNodes.find((n) => n.id === "category-chemistry");
  if (chemistryCategoryNode) {
    const chemistryCourses = [
      { id: "chem-002", level: 2, pos: -0.3 },
      { id: "chem-002l", level: 2, pos: 0.3 },
    ];

    chemistryCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: chemistryCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });
  }

  // Writing branch
  const writingCategoryNode = categoryNodes.find((n) => n.id === "category-writing");
  if (writingCategoryNode) {
    const writingCourses = [
      { id: "wri-010", level: 2, pos: 0 },
    ];

    writingCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: writingCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });
  }

  // Spark branch
  const sparkCategoryNode = categoryNodes.find((n) => n.id === "category-spark");
  if (sparkCategoryNode) {
    const sparkCourses = [
      { id: "sprk-010", level: 2, pos: 0 },
    ];

    sparkCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: sparkCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });
  }

  // Engineering branch (ENGR courses, GenEd, Technical Electives)
  const engineeringCategoryNode = categoryNodes.find((n) => n.id === "category-engineering");
  if (engineeringCategoryNode) {
    const engineeringCourses = [
      { id: "engr-091", level: 2, pos: -1.5 },
      { id: "engr-045", level: 2, pos: -0.5 },
      { id: "engr-057", level: 2, pos: 0.5 },
      { id: "engr-151", level: 3, pos: -1 },
      { id: "engr-120", level: 3, pos: 0 },
      { id: "engr-130", level: 3, pos: 1 },
      { id: "engr-065", level: 4, pos: -1 },
      { id: "engr-155", level: 4, pos: 0 },
      { id: "engr-135", level: 5, pos: -0.5 },
      { id: "engr-193", level: 5, pos: 0.5 },
      { id: "engr-194", level: 6, pos: 0 },
    ];

    engineeringCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: engineeringCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });

    // Gen Ed and Technical Electives
    const otherCourses = [
      { id: "gen-ed-area-b-fall", level: 3, pos: 2 },
      { id: "gen-ed-area-a", level: 3, pos: 2.5 },
      { id: "gen-ed-area-b-fall-3", level: 4, pos: 1.5 },
      { id: "gen-ed-area-b-spring-3", level: 4, pos: 2 },
      { id: "gen-ed-area-b-fall-4", level: 5, pos: 1.5 },
      { id: "tech-elective-1", level: 5, pos: 2 },
      { id: "tech-elective-2", level: 6, pos: 0.5 },
      { id: "tech-elective-3", level: 6, pos: 1 },
    ];

    otherCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: engineeringCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });
  }

  // Mechanical Engineering branch
  const meCategoryNode = categoryNodes.find((n) => n.id === "category-me");
  if (meCategoryNode) {
    const meCourses = [
      { id: "me-001", level: 2, pos: 0 },
      { id: "me-021", level: 3, pos: 0 },
      { id: "me-137", level: 4, pos: -0.5 },
      { id: "me-120", level: 4, pos: 0.5 },
      { id: "me-140", level: 5, pos: 0 },
    ];

    meCourses.forEach((courseInfo) => {
      const courseNode = courseNodes.find((n) => n.id === courseInfo.id);
      if (courseNode) {
        courseNode.targetPosition = "top" as any;
        courseNode.sourcePosition = "bottom" as any;
        const defaultPosition = {
          x: meCategoryNode.position.x + courseInfo.pos * horizontalSpacing,
          y: 280 + (courseInfo.level - 2) * verticalSpacing,
        };
        courseNode.position = savedPositions[courseNode.id] || defaultPosition;
      }
    });
  }
  
  return { nodes, edges };
}

interface PrerequisiteGraphProps {
  onLayoutChange?: (useFormatted: boolean) => void;
  useFormattedLayoutExternal?: boolean;
  onResetReady?: (resetFn: () => void) => void;
  onFullResetReady?: (resetFn: () => void) => void;
}

export default function PrerequisiteGraph({ 
  onLayoutChange, 
  useFormattedLayoutExternal, 
  onResetReady, 
  onFullResetReady 
}: PrerequisiteGraphProps) {
  const courses = mechanicalEngineeringCourses;
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

  // Handle node changes
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

  // Reset node positions to default layout
  const handleResetPositions = useCallback(() => {
    setNodePositions({});
  }, []);

  // Full reset: positions, expanded categories, and layout
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
    
    setTimeout(() => {}, 100);
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
  useEffect(() => {
    if (!onResetReady) return;
    const rafId = requestAnimationFrame(() => {
      onResetReady(() => resetFnRef.current());
    });
    return () => cancelAnimationFrame(rafId);
  }, [onResetReady]);

  // Expose full reset handler to parent component
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
    // Create root node: Mechanical Engineering
    const rootNode: Node = {
      id: "mechanical-engineering-root",
      type: "root",
      data: { label: "Mech E" },
      position: { x: 0, y: 0 },
    };

    // Create category nodes: Math, Physics, Chemistry, Writing, Spark, Engineering, ME
    const categories = ["Math", "Physics", "Chemistry", "Writing", "Spark", "Engineering", "ME"];
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
      source: "mechanical-engineering-root",
      target: catNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Function to create course nodes and edges for a category
    const createCategoryBranch = (
      categoryId: string,
      coursePrefix: string,
      additionalFilters?: (course: Course) => boolean
    ) => {
      const isExpanded = expandedCategories.has(categoryId);
      const courseNodes: Node[] = [];
      const courseEdges: Edge[] = [];

      if (isExpanded) {
        // Filter courses for this category
        const filteredCourses = courses.filter((course) => {
          const matchesPrefix = course.id.startsWith(coursePrefix);
          const matchesAdditional = additionalFilters ? additionalFilters(course) : true;
          return matchesPrefix && matchesAdditional;
        });
        
        // Create course nodes
        filteredCourses.forEach((course) => {
          courseNodes.push({
            id: course.id,
            type: "course",
            data: { course },
            position: { x: 0, y: 0 },
          });
        });

        // Create prerequisite edges (only same-category)
        filteredCourses.forEach((course) => {
          if (course.prerequisites.length === 0) {
            // No prerequisites - connect from category
            courseEdges.push({
              id: `${categoryId}-${course.id}`,
              source: categoryId,
              target: course.id,
              type: "smoothstep",
              animated: false,
              style: { stroke: "#94a3b8", strokeWidth: 2 },
            });
          } else {
            // Has prerequisites - create edges for same-category prerequisites only
            course.prerequisites.forEach((prereqId) => {
              if (prereqId.startsWith(coursePrefix)) {
                courseEdges.push({
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

      return { courseNodes, courseEdges };
    };

    // Create branches for each category
    const mathBranch = createCategoryBranch("category-math", "math-");
    const physicsBranch = createCategoryBranch("category-physics", "phys-");
    const chemistryBranch = createCategoryBranch("category-chemistry", "chem-");
    const writingBranch = createCategoryBranch("category-writing", "wri-");
    const sparkBranch = createCategoryBranch("category-spark", "sprk-");
    
    // Engineering branch includes ENGR courses, GenEd, and Technical Electives
    const engineeringBranch = createCategoryBranch(
      "category-engineering",
      "engr-",
      (course) => course.id.startsWith("engr-") || course.id.startsWith("gen-ed-") || course.id.startsWith("tech-elective-")
    );
    
    const meBranch = createCategoryBranch("category-me", "me-");

    // Combine all nodes and edges
    const allNodes = [
      rootNode, 
      ...categoryNodes, 
      ...mathBranch.courseNodes,
      ...physicsBranch.courseNodes,
      ...chemistryBranch.courseNodes,
      ...writingBranch.courseNodes,
      ...sparkBranch.courseNodes,
      ...engineeringBranch.courseNodes,
      ...meBranch.courseNodes,
    ];
    
    const allEdges = [
      ...categoryEdges, 
      ...mathBranch.courseEdges,
      ...physicsBranch.courseEdges,
      ...chemistryBranch.courseEdges,
      ...writingBranch.courseEdges,
      ...sparkBranch.courseEdges,
      ...engineeringBranch.courseEdges,
      ...meBranch.courseEdges,
    ];

    // Apply layout
    return getLayoutedElements(allNodes, allEdges, useFormattedLayout, nodePositions);
  }, [courses, expandedCategories, useFormattedLayout, nodePositions]);

  // Sync nodes/edges when not dragging
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

  // Initialize nodesState on first render
  useEffect(() => {
    if (nodesState.length === 0 && nodes.length > 0) {
      setNodesState(nodes);
      setEdgesState(edges);
    }
  }, [nodes, edges, nodesState.length]);

  // Memoize nodeTypes to prevent React Flow warning
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
          Graph reflects typical UC Merced Mechanical Engineering progression.
        </p>
      </div>
    </div>
  );
}

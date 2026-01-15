"use client";

/**
 * PrerequisiteGraph Component for Electrical Engineering
 * Interactive prerequisite graph visualization using React Flow
 * Used on: Degrees page (Electrical Engineering degree overview)
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
import { electricalEngineeringCourses } from "../data/courses";

// Custom circular node component for EE root
function RootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-sm font-bold text-primary text-center px-2">
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
  const rootNode = nodes.find((n) => n.id === "electrical-engineering-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "electrical-engineering-root");
  
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

  const verticalSpacing = 140;
  const horizontalSpacing = useFormattedLayout ? 200 : 220;

  // Position Math courses
  const mathCategoryNode = categoryNodes.find((n) => n.id === "category-math");
  if (mathCategoryNode) {
    const mathCourses = courseNodes.filter((n) => n.id.startsWith("math-"));
    let currentY = 280;

    mathCourses.forEach((node) => {
      node.targetPosition = "top" as any;
      node.sourcePosition = "bottom" as any;
      const defaultPosition = { x: mathCategoryNode.position.x, y: currentY };
      node.position = savedPositions[node.id] || defaultPosition;
      
      // Increment Y for next course
      if (node.id === "math-022") {
        currentY += verticalSpacing;
        // Next courses (023, 024, 080) will branch horizontally
        const branchCourses = ["math-023", "math-024", "engr-080"];
        const branchStartX = mathCategoryNode.position.x - horizontalSpacing;
        branchCourses.forEach((courseId, idx) => {
          const branchNode = courseNodes.find((n) => n.id === courseId);
          if (branchNode) {
            const defaultPos = { x: branchStartX + idx * horizontalSpacing, y: currentY };
            branchNode.position = savedPositions[branchNode.id] || defaultPos;
            branchNode.targetPosition = "top" as any;
            branchNode.sourcePosition = "bottom" as any;
          }
        });
      } else if (!["math-023", "math-024", "engr-080"].includes(node.id)) {
        currentY += verticalSpacing;
      }
    });
  }

  // Position Chemistry courses
  const chemCategoryNode = categoryNodes.find((n) => n.id === "category-chemistry");
  if (chemCategoryNode) {
    const chemCourses = courseNodes.filter((n) => n.id.startsWith("chem-"));
    let currentY = 280;
    
    chemCourses.forEach((node) => {
      node.targetPosition = "top" as any;
      node.sourcePosition = "bottom" as any;
      const defaultPosition = { x: chemCategoryNode.position.x, y: currentY };
      node.position = savedPositions[node.id] || defaultPosition;
      currentY += verticalSpacing;
    });
  }

  // Position Physics courses
  const physicsCategoryNode = categoryNodes.find((n) => n.id === "category-physics");
  if (physicsCategoryNode) {
    const physicsCourses = courseNodes.filter((n) => n.id.startsWith("phys-"));
    let currentY = 280;
    
    physicsCourses.forEach((node) => {
      node.targetPosition = "top" as any;
      node.sourcePosition = "bottom" as any;
      const defaultPosition = { x: physicsCategoryNode.position.x, y: currentY };
      node.position = savedPositions[node.id] || defaultPosition;
      
      // Group lab with lecture
      if (node.id.includes("-008") || node.id.includes("-009")) {
        if (!node.id.includes("l")) {
          currentY += verticalSpacing;
        }
      }
    });
  }

  // Position Writing courses
  const writingCategoryNode = categoryNodes.find((n) => n.id === "category-writing");
  if (writingCategoryNode) {
    const writingCourses = courseNodes.filter((n) => n.id.startsWith("wri-"));
    let currentY = 280;
    
    writingCourses.forEach((node) => {
      node.targetPosition = "top" as any;
      node.sourcePosition = "bottom" as any;
      const defaultPosition = { x: writingCategoryNode.position.x, y: currentY };
      node.position = savedPositions[node.id] || defaultPosition;
      currentY += verticalSpacing;
    });
  }

  // Position Engineering courses
  const engrCategoryNode = categoryNodes.find((n) => n.id === "category-engineering");
  if (engrCategoryNode) {
    const engrCourses = courseNodes.filter((n) => n.id.startsWith("engr-") && !n.id.includes("080"));
    let currentY = 280;
    
    engrCourses.forEach((node) => {
      node.targetPosition = "top" as any;
      node.sourcePosition = "bottom" as any;
      const defaultPosition = { x: engrCategoryNode.position.x, y: currentY };
      node.position = savedPositions[node.id] || defaultPosition;
      currentY += verticalSpacing;
    });
  }

  // Position EE courses - complex branching structure
  const eeCategoryNode = categoryNodes.find((n) => n.id === "category-ee");
  if (eeCategoryNode) {
    const eeCourses = courseNodes.filter((n) => n.id.startsWith("ee-"));
    let currentY = 280;
    
    // Level 1: EE-010
    const ee010 = eeCourses.find((n) => n.id === "ee-010");
    if (ee010) {
      ee010.targetPosition = "top" as any;
      ee010.sourcePosition = "bottom" as any;
      ee010.position = savedPositions[ee010.id] || { x: eeCategoryNode.position.x, y: currentY };
      currentY += verticalSpacing;
    }

    // Level 2: EE-020, EE-030
    const level2 = ["ee-020", "ee-030"];
    level2.forEach((id, idx) => {
      const node = eeCourses.find((n) => n.id === id);
      if (node) {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        const defaultPos = { x: eeCategoryNode.position.x - horizontalSpacing/2 + idx * horizontalSpacing, y: currentY };
        node.position = savedPositions[node.id] || defaultPos;
      }
    });
    currentY += verticalSpacing;

    // Level 3: EE-065, EE-120, EE-140
    const level3 = ["ee-065", "ee-120", "ee-140"];
    const level3StartX = eeCategoryNode.position.x - horizontalSpacing;
    level3.forEach((id, idx) => {
      const node = eeCourses.find((n) => n.id === id);
      if (node) {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        const defaultPos = { x: level3StartX + idx * horizontalSpacing, y: currentY };
        node.position = savedPositions[node.id] || defaultPos;
      }
    });
    currentY += verticalSpacing;

    // Level 4: EE-100, EE-110, EE-130
    const level4 = ["ee-100", "ee-110", "ee-130"];
    const level4StartX = eeCategoryNode.position.x - horizontalSpacing;
    level4.forEach((id, idx) => {
      const node = eeCourses.find((n) => n.id === id);
      if (node) {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        const defaultPos = { x: level4StartX + idx * horizontalSpacing, y: currentY };
        node.position = savedPositions[node.id] || defaultPos;
      }
    });
    currentY += verticalSpacing;

    // Level 5: EE-101, EE-150, EE-160
    const level5 = ["ee-101", "ee-150", "ee-160"];
    const level5StartX = eeCategoryNode.position.x - horizontalSpacing;
    level5.forEach((id, idx) => {
      const node = eeCourses.find((n) => n.id === id);
      if (node) {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        const defaultPos = { x: level5StartX + idx * horizontalSpacing, y: currentY };
        node.position = savedPositions[node.id] || defaultPos;
      }
    });
    currentY += verticalSpacing;

    // Level 6: EE-180, EE-181, Electives
    const level6 = ["ee-180", "ee-181", "ee-elective-1", "ee-elective-2"];
    const level6StartX = eeCategoryNode.position.x - horizontalSpacing * 1.5;
    level6.forEach((id, idx) => {
      const node = eeCourses.find((n) => n.id === id);
      if (node) {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        const defaultPos = { x: level6StartX + idx * horizontalSpacing, y: currentY };
        node.position = savedPositions[node.id] || defaultPos;
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
  const courses = electricalEngineeringCourses;
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [useFormattedLayoutInternal, setUseFormattedLayoutInternal] = useState(false);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  
  const useFormattedLayout = useFormattedLayoutExternal !== undefined ? useFormattedLayoutExternal : useFormattedLayoutInternal;
  
  const setUseFormattedLayout = (value: boolean) => {
    if (onLayoutChange) {
      onLayoutChange(value);
    } else {
      setUseFormattedLayoutInternal(value);
    }
  };

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
    // Create root node: Electrical Engineering
    const rootNode: Node = {
      id: "electrical-engineering-root",
      type: "root",
      data: { label: "Electrical Engineering" },
      position: { x: 0, y: 0 },
    };

    // Create category nodes: Math, Chemistry, Physics, Writing, Engineering, EE
    const categories = ["Math", "Chemistry", "Physics", "Writing", "Engineering", "EE"];
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
      source: "electrical-engineering-root",
      target: catNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Helper function to create course nodes and edges for a category
    const createCategoryBranch = (
      categoryId: string,
      prefix: string,
      filterFn?: (course: Course) => boolean
    ): { nodes: Node[]; edges: Edge[] } => {
      const isExpanded = expandedCategories.has(categoryId);
      const courseNodes: Node[] = [];
      const courseEdges: Edge[] = [];

      if (isExpanded) {
        const filteredCourses = courses.filter(filterFn || ((course) => course.id.startsWith(prefix)));
        
        filteredCourses.forEach((course) => {
          courseNodes.push({
            id: course.id,
            type: "course",
            data: { course },
            position: { x: 0, y: 0 },
          });
        });

        filteredCourses.forEach((course) => {
          if (course.prerequisites.length === 0) {
            courseEdges.push({
              id: `${categoryId}-${course.id}`,
              source: categoryId,
              target: course.id,
              type: "smoothstep",
              animated: false,
              style: { stroke: "#94a3b8", strokeWidth: 2 },
            });
          } else {
            course.prerequisites.forEach((prereqId) => {
              // Only create edge if prerequisite is in the same category
              if (filterFn ? filteredCourses.some((c) => c.id === prereqId) : prereqId.startsWith(prefix)) {
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

      return { nodes: courseNodes, edges: courseEdges };
    };

    // Create branches for each category
    const mathBranch = createCategoryBranch("category-math", "math-");
    const chemBranch = createCategoryBranch("category-chemistry", "chem-");
    const physicsBranch = createCategoryBranch("category-physics", "phys-");
    const writingBranch = createCategoryBranch("category-writing", "wri-");
    const engineeringBranch = createCategoryBranch("category-engineering", "engr-", 
      (course) => course.id.startsWith("engr-") && !course.id.includes("080"));
    const eeBranch = createCategoryBranch("category-ee", "ee-");

    // Combine all nodes and edges
    const allNodes = [
      rootNode, 
      ...categoryNodes, 
      ...mathBranch.nodes,
      ...chemBranch.nodes,
      ...physicsBranch.nodes,
      ...writingBranch.nodes,
      ...engineeringBranch.nodes,
      ...eeBranch.nodes,
    ];
    
    const allEdges = [
      ...categoryEdges,
      ...mathBranch.edges,
      ...chemBranch.edges,
      ...physicsBranch.edges,
      ...writingBranch.edges,
      ...engineeringBranch.edges,
      ...eeBranch.edges,
    ];

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
          Graph reflects typical UC Merced Electrical Engineering progression.
        </p>
      </div>
    </div>
  );
}

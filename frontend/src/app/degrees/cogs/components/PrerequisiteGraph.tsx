"use client";

/**
 * COGS Prerequisite Graph Component
 * Interactive prerequisite graph visualization using React Flow
 * Used on: Degrees page (COGS degree overview)
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
import { cogsCourses } from "../data/courses";

// Custom circular node component for COGS root
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
  const rootNode = nodes.find((n) => n.id === "cogs-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "cogs-root");
  
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
    if (!savedPositions[node.id]) {
      node.position = defaultPosition;
    } else {
      const savedPos = savedPositions[node.id];
      const allOtherNodes = [...categoryNodes.filter(n => n.id !== node.id), rootNode].filter(Boolean) as Node[];
      node.position = adjustPositionToAvoidOverlap(node, allOtherNodes, savedPos, categorySpacing * 0.8);
    }
  });

  // Position courses by category
  const verticalSpacing = 140;
  let currentY = 280;

  // COGS Core courses
  const cogsCoreCategoryNode = categoryNodes.find((n) => n.id === "category-cogs-core");
  if (cogsCoreCategoryNode) {
    const cogs001 = courseNodes.find((n) => n.id === "cogs-001");
    const cogs101 = courseNodes.find((n) => n.id === "cogs-101");
    const cogs110 = courseNodes.find((n) => n.id === "cogs-110");
    const cogs102 = courseNodes.find((n) => n.id === "cogs-102");
    const cogs105 = courseNodes.find((n) => n.id === "cogs-105");
    const cogs190 = courseNodes.find((n) => n.id === "cogs-190");

    let cogsY = currentY;
    
    // Level 2: COGS 001 (no prerequisites)
    if (cogs001) {
      cogs001.targetPosition = "top" as any;
      cogs001.sourcePosition = "bottom" as any;
      if (!savedPositions[cogs001.id]) {
        cogs001.position = {
          x: cogsCoreCategoryNode.position.x,
          y: cogsY,
        };
      } else {
        cogs001.position = savedPositions[cogs001.id];
      }
      cogsY += verticalSpacing;
    }

    // Level 3: COGS 101 and COGS 110 (both require COGS 001)
    if (cogs101) {
      cogs101.targetPosition = "top" as any;
      cogs101.sourcePosition = "bottom" as any;
      if (!savedPositions[cogs101.id]) {
        cogs101.position = {
          x: cogsCoreCategoryNode.position.x - 100,
          y: cogsY,
        };
      } else {
        cogs101.position = savedPositions[cogs101.id];
      }
    }

    if (cogs110) {
      cogs110.targetPosition = "top" as any;
      cogs110.sourcePosition = "bottom" as any;
      if (!savedPositions[cogs110.id]) {
        cogs110.position = {
          x: cogsCoreCategoryNode.position.x + 100,
          y: cogsY,
        };
      } else {
        cogs110.position = savedPositions[cogs110.id];
      }
    }
    cogsY += verticalSpacing;

    // Level 4: COGS 102 (requires COGS 101 and COGS 110)
    if (cogs102) {
      cogs102.targetPosition = "top" as any;
      cogs102.sourcePosition = "bottom" as any;
      if (!savedPositions[cogs102.id]) {
        cogs102.position = {
          x: cogsCoreCategoryNode.position.x,
          y: cogsY,
        };
      } else {
        cogs102.position = savedPositions[cogs102.id];
      }
      cogsY += verticalSpacing;
    }

    // Level 5: COGS 105 (requires COGS 102)
    if (cogs105) {
      cogs105.targetPosition = "top" as any;
      cogs105.sourcePosition = "bottom" as any;
      if (!savedPositions[cogs105.id]) {
        cogs105.position = {
          x: cogsCoreCategoryNode.position.x,
          y: cogsY,
        };
      } else {
        cogs105.position = savedPositions[cogs105.id];
      }
      cogsY += verticalSpacing;
    }

    // Level 6: COGS 190 (requires COGS 102)
    if (cogs190) {
      cogs190.targetPosition = "top" as any;
      cogs190.sourcePosition = "bottom" as any;
      if (!savedPositions[cogs190.id]) {
        cogs190.position = {
          x: cogsCoreCategoryNode.position.x,
          y: cogsY,
        };
      } else {
        cogs190.position = savedPositions[cogs190.id];
      }
    }
  }

  // Math courses
  const mathCategoryNode = categoryNodes.find((n) => n.id === "category-math");
  if (mathCategoryNode) {
    const math021 = courseNodes.find((n) => n.id === "math-021");
    if (math021) {
      math021.targetPosition = "top" as any;
      math021.sourcePosition = "bottom" as any;
      if (!savedPositions[math021.id]) {
        math021.position = {
          x: mathCategoryNode.position.x,
          y: currentY,
        };
      } else {
        math021.position = savedPositions[math021.id];
      }
    }
  }

  // Writing courses
  const writingCategoryNode = categoryNodes.find((n) => n.id === "category-writing");
  if (writingCategoryNode) {
    const wri010 = courseNodes.find((n) => n.id === "wri-010");
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
    }
  }

  // Computer Science courses
  const cseCategoryNode = categoryNodes.find((n) => n.id === "category-computer-science");
  if (cseCategoryNode) {
    const cse022 = courseNodes.find((n) => n.id === "cse-022");
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
  const courses = cogsCourses;
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
  const onNodeDragStart = useCallback((_event: React.MouseEvent, _node: Node) => {
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

  // Handle node click - prevent drag on click for category nodes
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    // If it's a category node, the click is handled by the CategoryNode's onClick
    // This prevents React Flow from starting a drag
    if (node.type === "category" || node.type === "root") {
      return;
    }
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
    setUseFormattedLayout(false);
  }, [setUseFormattedLayout]);

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

  // Toggle category function - defined outside useMemo to prevent recreation
  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  // Get unique categories from courses, excluding Psychology (no cross-category prerequisites)
  const categories = useMemo(() => {
    const uniqueCategories = new Set(courses.map(c => c.category));
    // Remove Psychology category - we only show intra-category connections
    uniqueCategories.delete('Psychology');
    return Array.from(uniqueCategories);
  }, [courses]);

  const { nodes, edges } = useMemo(() => {
    // Create root node: COGS
    const rootNode: Node = {
      id: "cogs-root",
      type: "root",
      data: { label: "COGS" },
      position: { x: 0, y: 0 },
    };

    // Create category nodes
    const categoryNodes: Node[] = categories.map((category) => {
      // Map category names to consistent IDs (Psychology excluded - no cross-category prerequisites)
      const categoryIdMap: Record<string, string> = {
        'COGS Core': 'category-cogs-core',
        'Math': 'category-math',
        'Writing': 'category-writing',
        'Computer Science': 'category-computer-science',
      };
      const categoryId = categoryIdMap[category] || `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
      const isExpanded = expandedCategories.has(categoryId);
      
      return {
        id: categoryId,
        type: "category",
        data: {
          label: category,
          isExpanded,
          onToggle: () => toggleCategory(categoryId),
        },
        position: { x: 0, y: 0 },
      };
    });

    // Create edges from root to categories
    const categoryEdges: Edge[] = categoryNodes.map((categoryNode) => ({
      id: `cogs-root-${categoryNode.id}`,
      source: "cogs-root",
      target: categoryNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Create course nodes and edges based on expanded categories
    const courseNodes: Node[] = [];
    const courseEdges: Edge[] = [];

    categories.forEach((category) => {
      // Map category names to consistent IDs (Psychology excluded - no cross-category prerequisites)
      const categoryIdMap: Record<string, string> = {
        'COGS Core': 'category-cogs-core',
        'Math': 'category-math',
        'Writing': 'category-writing',
        'Computer Science': 'category-computer-science',
      };
      const categoryId = categoryIdMap[category] || `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
      const isExpanded = expandedCategories.has(categoryId);
      
      if (isExpanded) {
        const categoryCourses = courses.filter((course) => course.category === category);
        
        categoryCourses.forEach((course) => {
          courseNodes.push({
            id: course.id,
            type: "course",
            data: { course },
            position: { x: 0, y: 0 },
          });

          // Create edges from category to courses with no prerequisites
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
            // Create edges from prerequisite courses - ONLY within the same category
            course.prerequisites.forEach((prereqId) => {
              const prereqCourse = courses.find(c => c.id === prereqId);
              if (prereqCourse && prereqCourse.category === category) {
                // Only create edge if prerequisite is in the same category
                const categoryIdMap: Record<string, string> = {
                  'COGS Core': 'category-cogs-core',
                  'Math': 'category-math',
                  'Writing': 'category-writing',
                  'Computer Science': 'category-computer-science',
                };
                const prereqCategoryId = categoryIdMap[prereqCourse.category] || `category-${prereqCourse.category.toLowerCase().replace(/\s+/g, "-")}`;
                if (expandedCategories.has(prereqCategoryId)) {
                  courseEdges.push({
                    id: `${prereqId}-${course.id}`,
                    source: prereqId,
                    target: course.id,
                    type: "smoothstep",
                    animated: false,
                    style: { stroke: "#94a3b8", strokeWidth: 2 },
                  });
                }
              }
            });
          }
        });
      }
    });

    // Combine all nodes
    const allNodes = [rootNode, ...categoryNodes, ...courseNodes];
    const allEdges = [...categoryEdges, ...courseEdges];

    // Apply layout
    const layouted = getLayoutedElements(allNodes, allEdges, useFormattedLayout, nodePositions);
    
    return { nodes: layouted.nodes, edges: layouted.edges };
  }, [courses, categories, expandedCategories, useFormattedLayout, nodePositions, toggleCategory]);

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

  // Memoize nodeTypes to prevent React Flow warning - ensure stable reference
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
            onNodeClick={onNodeClick}
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
          Graph reflects typical UC Merced COGS progression.
        </p>
      </div>
    </div>
  );
}

"use client";

/**
 * PrerequisiteGraph Component
 * Interactive prerequisite graph visualization using React Flow
 * Used on: Degrees page (Electrical Engineering degree overview)
 * 
 * NOTE: This is a placeholder implementation. Graph layout will be fully implemented later.
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

// Custom circular node component for Electrical Engineering root
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

  // Position course nodes under their respective categories
  const courseY = 280;
  const horizontalSpacing = 220;

  // Group courses by category
  const coursesByCategory: Record<string, Node[]> = {};
  courseNodes.forEach((node) => {
    const course = (node.data as { course?: Course })?.course;
    if (course && course.category) {
      const categoryId = `category-${course.category.toLowerCase()}`;
      if (!coursesByCategory[categoryId]) {
        coursesByCategory[categoryId] = [];
      }
      coursesByCategory[categoryId].push(node);
    }
  });

  // Position courses under their categories
  Object.entries(coursesByCategory).forEach(([categoryId, categoryCourses]) => {
    const categoryNode = categoryNodes.find((n) => n.id === categoryId);
    if (categoryNode) {
      const courseStartX = categoryNode.position.x - ((categoryCourses.length - 1) * horizontalSpacing) / 2;
      categoryCourses.forEach((node, index) => {
        node.targetPosition = "top" as any;
        node.sourcePosition = "bottom" as any;
        node.position = savedPositions[node.id] || {
          x: courseStartX + index * horizontalSpacing,
          y: courseY,
        };
      });
    }
  });
  
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
  const courses = electricalEngineeringCourses;
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [useFormattedLayoutInternal, setUseFormattedLayoutInternal] = useState(false);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  
  const hasExpandedCategories = expandedCategories.size > 0;
  
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
  
  useEffect(() => {
    if (hasExpandedCategories) {
      if (onLayoutChange && !useFormattedLayoutExternal) {
        onLayoutChange(true);
      } else if (!onLayoutChange && !useFormattedLayoutInternal) {
        setUseFormattedLayoutInternal(true);
      }
      setNodePositions((prev) => {
        const newPositions: Record<string, { x: number; y: number }> = {};
        Object.keys(prev).forEach((key) => {
          if (key === "electrical-engineering-root" || key.startsWith("category-")) {
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
    // Create root node: Electrical Engineering
    const rootNode: Node = {
      id: "electrical-engineering-root",
      type: "root",
      data: { label: "EE" },
      position: { x: 0, y: 0 },
    };

    // Get unique categories from courses
    const categories = Array.from(new Set(courses.map(c => c.category).filter(Boolean))) as string[];
    const categoryNodes: Node[] = categories.map((category) => {
      const categoryId = `category-${category!.toLowerCase()}`;
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

    // Create course nodes and edges for each category
    const allCourseNodes: Node[] = [];
    const allCourseEdges: Edge[] = [];

    categories.forEach((category) => {
      const categoryId = `category-${category!.toLowerCase()}`;
      const isCategoryExpanded = expandedCategories.has(categoryId);
      
      if (isCategoryExpanded) {
        const categoryCourses = courses.filter((course) => course.category === category);
        
        categoryCourses.forEach((course) => {
          allCourseNodes.push({
            id: course.id,
            type: "course",
            data: { course },
            position: { x: 0, y: 0 },
          });

          // Create edges for prerequisites
          if (course.prerequisites.length === 0) {
            // Course with no prerequisites connects from category
            allCourseEdges.push({
              id: `${categoryId}-${course.id}`,
              source: categoryId,
              target: course.id,
              type: "smoothstep",
              animated: false,
              style: { stroke: "#94a3b8", strokeWidth: 2 },
            });
          } else {
            // Course with prerequisites connects from prerequisite courses
            course.prerequisites.forEach((prereqId) => {
              const prereqCourse = courses.find(c => c.id === prereqId);
              if (prereqCourse && prereqCourse.category === category) {
                allCourseEdges.push({
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
    });

    // Combine all nodes
    const allNodes = [
      rootNode, 
      ...categoryNodes, 
      ...allCourseNodes
    ];
    const allEdges = [
      ...categoryEdges, 
      ...allCourseEdges
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

  const exportNodePositions = useCallback(() => {
    const currentNodes = nodesState.length > 0 ? nodesState : nodes;
    const positions: Record<string, { x: number; y: number }> = {};
    
    currentNodes.forEach((node) => {
      positions[node.id] = { x: node.position.x, y: node.position.y };
    });

    const formatted = JSON.stringify(positions, null, 2);
    
    console.log("=== NODE POSITIONS ===");
    console.log(formatted);
    console.log("=== COPY THE ABOVE JSON ===");
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formatted).then(() => {
        console.log("✓ Positions copied to clipboard!");
      }).catch((err) => {
        console.warn("Could not copy to clipboard:", err);
      });
    }
    
    return positions;
  }, [nodesState, nodes]);

  const exportPositionsRef = useRef<(() => void) | null>(null);
  exportPositionsRef.current = exportNodePositions;

  useEffect(() => {
    if (!onExportPositionsReady) return;
    const rafId = requestAnimationFrame(() => {
      onExportPositionsReady(() => exportPositionsRef.current?.());
    });
    return () => cancelAnimationFrame(rafId);
  }, [onExportPositionsReady]);

  useEffect(() => {
    (window as any).exportEENodePositions = exportNodePositions;
    return () => {
      delete (window as any).exportEENodePositions;
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
          Electrical Engineering prerequisite graph. Click category nodes to expand and view courses.
        </p>
      </div>
    </div>
  );
}

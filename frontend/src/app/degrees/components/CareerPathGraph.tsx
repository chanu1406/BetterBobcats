"use client";

/**
 * CareerPathGraph Component
 * Generic, reusable career path visualization using React Flow
 * Used on: All career path pages (SWE, Cybersecurity, ML/AI, etc.)
 * 
 * This component is config-driven - it accepts a CareerPathConfig object
 * that defines the structure, categories, and courses for any career path.
 */

import { useMemo, useState, useCallback, useEffect, useLayoutEffect, useRef, memo } from "react";
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
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { CareerPathConfig, TierCourse } from "@/types/careerPath";

// Custom root node component for career path
function RootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-base font-bold text-primary text-center px-2">
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
      className={`w-24 h-24 rounded-full border-2 ${
        data.isExpanded
          ? "border-primary bg-primary/15 border-solid"
          : "border-primary/50 bg-primary/5 border-dashed"
      } flex items-center justify-center shadow-md relative cursor-pointer hover:bg-primary/10 transition-colors`}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="text-xs font-semibold text-primary text-center px-2 leading-tight">
        {data.label}
      </div>
    </div>
  );
}

// Custom expandable course node component
function ExpandableCourseNode({ 
  data 
}: { 
  data: { 
    course: TierCourse; 
    isExpanded?: boolean; 
    onToggle?: () => void;
  } 
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onToggle) {
      data.onToggle();
    }
  };

  const isExpanded = data.isExpanded || false;

  return (
    <div
      className={`rounded-lg border-2 border-primary/50 bg-card shadow-md relative cursor-pointer transition-all ${
        isExpanded 
          ? "min-w-[300px] max-w-[400px] border-primary border-solid" 
          : "min-w-[150px] max-w-[190px] border-dashed"
      }`}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      
      <div className={`${isExpanded ? "p-4" : "p-3"}`}>
        {/* Course Code and Name */}
        <div className="text-sm font-semibold text-foreground text-center mb-2">
          {data.course.fullName}
        </div>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground mb-2">Why It's Critical:</p>
              <p>{data.course.description}</p>
              
              {/* Resources section (future) */}
              {data.course.resources && data.course.resources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="font-medium text-foreground mb-2">Resources:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {data.course.resources.map((resource, idx) => (
                      <li key={idx} className="text-xs">{resource}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Define nodeTypes outside component to avoid React Flow warning
const nodeTypes = {
  root: RootNode,
  category: CategoryNode,
  course: ExpandableCourseNode,
};

// Helper function to check if two nodes overlap
function nodesOverlap(
  node1: Node, 
  node2: Node, 
  minSpacing: number = 200
): boolean {
  const dx = Math.abs(node1.position.x - node2.position.x);
  const dy = Math.abs(node1.position.y - node2.position.y);
  // Approximate node sizes: root/category nodes ~96px, course nodes ~180-400px wide, 60-200px tall
  const node1Width = node1.type === "root" || node1.type === "category" ? 96 : (node1.data?.isExpanded ? 400 : 180);
  const node1Height = node1.type === "root" || node1.type === "category" ? 96 : (node1.data?.isExpanded ? 200 : 60);
  const node2Width = node2.type === "root" || node2.type === "category" ? 96 : (node2.data?.isExpanded ? 400 : 180);
  const node2Height = node2.type === "root" || node2.type === "category" ? 96 : (node2.data?.isExpanded ? 200 : 60);
  
  const minDistanceX = (node1Width + node2Width) / 2 + minSpacing;
  const minDistanceY = (node1Height + node2Height) / 2 + minSpacing;
  
  return dx < minDistanceX && dy < minDistanceY;
}

// Helper function to adjust position to avoid overlaps
function adjustPositionToAvoidOverlap(
  node: Node,
  otherNodes: Node[],
  defaultPosition: { x: number; y: number },
  minSpacing: number = 200
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
  const rootNode = nodes.find((n) => n.id === "career-path-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "career-path-root");
  
  if (rootNode) {
    rootNode.targetPosition = "top" as any;
    rootNode.sourcePosition = "bottom" as any;
    // Use saved position if available, otherwise use default
    rootNode.position = savedPositions[rootNode.id] || { x: 0, y: 40 };
  }

  // Position category nodes in a row below root
  const categorySpacing = useFormattedLayout ? 400 : 320;
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

  // Position course nodes below their category
  const verticalSpacing = 140;
  const horizontalSpacing = useFormattedLayout ? 200 : 220;
  let currentY = 320; // Increased from 280 to add more space below tier nodes

  // Group courses by category
  const coursesByCategory: Record<string, Node[]> = {};
  courseNodes.forEach((node) => {
    const categoryId = node.data?.categoryId || "unknown";
    if (!coursesByCategory[categoryId]) {
      coursesByCategory[categoryId] = [];
    }
    coursesByCategory[categoryId].push(node);
  });

  // Position courses for each category
  Object.entries(coursesByCategory).forEach(([categoryId, courses]) => {
    const categoryNode = categoryNodes.find((n) => n.id === categoryId);
    if (!categoryNode || courses.length === 0) return;

    const categoryX = categoryNode.position.x;
    const courseCount = courses.length;
    const startX = categoryX - ((courseCount - 1) * horizontalSpacing) / 2;

    courses.forEach((courseNode, index) => {
      const isExpanded = courseNode.data?.isExpanded || false;
      // Adjust spacing for expanded nodes
      const nodeSpacing = isExpanded ? horizontalSpacing * 1.5 : horizontalSpacing;
      
      courseNode.targetPosition = "top" as any;
      courseNode.sourcePosition = "bottom" as any;
      // Use saved position if available, otherwise use calculated position
      const defaultPosition = {
        x: startX + index * nodeSpacing,
        y: currentY,
      };
      if (!savedPositions[courseNode.id]) {
        courseNode.position = defaultPosition;
      } else {
        // Check for overlaps and adjust if needed
        const allOtherNodes = [...categoryNodes, rootNode, ...courseNodes.filter(n => n.id !== courseNode.id)].filter(Boolean) as Node[];
        courseNode.position = adjustPositionToAvoidOverlap(courseNode, allOtherNodes, savedPositions[courseNode.id], horizontalSpacing);
      }
    });

    currentY += verticalSpacing;
  });
  
  // Final pass: ensure no overlaps for all nodes with saved positions
  nodes.forEach((node) => {
    if (savedPositions[node.id]) {
      const allOtherNodes = nodes.filter(n => n.id !== node.id);
      const currentPos = node.position;
      const minSpacing = node.type === "category" ? categorySpacing * 0.8 : horizontalSpacing;
      const adjustedPos = adjustPositionToAvoidOverlap(node, allOtherNodes, currentPos, minSpacing);
      node.position = adjustedPos;
    }
  });
  
  return { nodes, edges };
}

interface CareerPathGraphProps {
  config: CareerPathConfig;
  onLayoutChange?: (useFormatted: boolean) => void;
  useFormattedLayoutExternal?: boolean;
  onResetReady?: (resetFn: () => void) => void;
  onFullResetReady?: (resetFn: () => void) => void;
}

export default function CareerPathGraph({ 
  config, 
  onLayoutChange, 
  useFormattedLayoutExternal,
  onResetReady,
  onFullResetReady
}: CareerPathGraphProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
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

  // Full reset: positions, expanded categories, expanded courses, layout, and view
  const handleFullReset = useCallback(() => {
    // Reset all state to original values
    setNodePositions({});
    setExpandedCategories(new Set());
    setExpandedCourses(new Set());
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

  // Expose reset handler to parent component (only on mount or when onResetReady changes)
  useEffect(() => {
    if (onResetReady) {
      // Use setTimeout to ensure this runs after render
      const timeoutId = setTimeout(() => {
        onResetReady(() => resetFnRef.current());
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [onResetReady]);

  // Expose full reset handler to parent component
  // Use requestAnimationFrame to ensure this runs after all renders complete
  useEffect(() => {
    if (!onFullResetReady) return;
    
    let cancelled = false;
    const rafId = requestAnimationFrame(() => {
      if (!cancelled) {
        const handler = () => fullResetFnRef.current();
        onFullResetReady(handler);
      }
    });
    
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [onFullResetReady]);
  
  // Re-expose handler when handleFullReset changes
  useEffect(() => {
    if (!onFullResetReady) return;
    
    let cancelled = false;
    const rafId = requestAnimationFrame(() => {
      if (!cancelled) {
        const handler = () => fullResetFnRef.current();
        onFullResetReady(handler);
      }
    });
    
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [handleFullReset, onFullResetReady]);

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

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const { nodes, edges } = useMemo(() => {
    // Create root node from config
    const rootNode: Node = {
      id: "career-path-root",
      type: "root",
      data: { label: config.rootLabel },
      position: { x: 0, y: 0 },
    };

    // Create category nodes from config
    const categoryNodes: Node[] = config.categories.map((category) => {
      const categoryId = `category-${category.id}`;
      const label = category.emoji ? `${category.emoji} ${category.label}` : category.label;
      return {
        id: categoryId,
        type: "category",
        data: { 
          label,
          isExpanded: expandedCategories.has(categoryId),
          onToggle: () => toggleCategory(categoryId),
        },
        position: { x: 0, y: 0 },
      };
    });

    // Create edges from root to each category
    const categoryEdges: Edge[] = categoryNodes.map((catNode) => ({
      id: `root-${catNode.id}`,
      source: "career-path-root",
      target: catNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Create course nodes when categories are expanded
    const courseNodes: Node[] = [];
    const courseEdges: Edge[] = [];

    config.categories.forEach((category) => {
      const categoryId = `category-${category.id}`;
      const isCategoryExpanded = expandedCategories.has(categoryId);
      
      if (isCategoryExpanded) {
        // Extract tier number from category id (e.g., "tier-1" -> 1)
        const tierMatch = category.id.match(/tier-(\d+)/);
        const tierNumber = tierMatch ? parseInt(tierMatch[1]) : null;
        
        // Filter courses for this tier
        const categoryCourses = tierNumber 
          ? config.courses.filter((course) => course.tier === tierNumber)
          : [];

        categoryCourses.forEach((course) => {
          courseNodes.push({
            id: course.id,
            type: "course",
            data: { 
              course,
              isExpanded: expandedCourses.has(course.id),
              onToggle: () => toggleCourse(course.id),
              categoryId,
            },
            position: { x: 0, y: 0 },
          });

          // Create edge from category to course
          courseEdges.push({
            id: `${categoryId}-${course.id}`,
            source: categoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        });
      }
    });

    // Combine all nodes
    const allNodes = [rootNode, ...categoryNodes, ...courseNodes];
    const allEdges = [...categoryEdges, ...courseEdges];

    // Apply layout (preserving saved positions)
    // Don't recalculate layout during drag to prevent nodes from disappearing
    return getLayoutedElements(allNodes, allEdges, useFormattedLayout, nodePositions);
  }, [config, expandedCategories, expandedCourses, useFormattedLayout, nodePositions]);

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

  // Memoize nodeTypes to prevent React Flow warning
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  // Inner component that can use useReactFlow hook
  const FlowContent = () => {
    const { fitView } = useReactFlow();
    
    // Trigger fitView when reset happens (when nodesState is cleared)
    useEffect(() => {
      if (nodesState.length === 0 && nodes.length > 0) {
        // Small delay to ensure layout is recalculated
        const timeoutId = setTimeout(() => {
          fitView({ padding: 0.1, maxZoom: 1.5 });
        }, 150);
        return () => clearTimeout(timeoutId);
      }
    }, [nodesState.length, nodes.length, fitView]);

    return (
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
        <Background color="#e2e8f0" gap={16} />
        <Controls />
      </ReactFlow>
    );
  };

  return (
    <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
      <div className="w-full h-[800px] relative [&_.react-flow__background]:opacity-30">
        <ReactFlowProvider>
          <FlowContent />
        </ReactFlowProvider>
      </div>
      <div className="w-full px-4 py-2 bg-muted/20 border-t border-border/40">
        <p className="text-xs text-black text-center">
          Career path visualization showing recommended courses and progression.
        </p>
      </div>
    </div>
  );
}


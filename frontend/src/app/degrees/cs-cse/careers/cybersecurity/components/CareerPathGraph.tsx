"use client";

/**
 * CareerPathGraph Component
 * Interactive React Flow graph visualization for career paths
 * Used on: Career path pages (SWE, Cybersecurity, etc.)
 * 
 * This is a minimal implementation with just the React Flow frame.
 * Nodes and edges will be added later.
 */

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ReactFlowProvider,
  ReactFlowInstance,
  NodeChange,
  applyNodeChanges,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { cybersecurityCareerPathConfig } from "../data/careerPathConfig";
import { TierCourse } from "@/types/careerPath";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

// Custom root node component for Cybersecurity career path
function CybersecurityRootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-32 h-32 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-lg font-bold text-primary text-center">
        {data.label}
      </div>
    </div>
  );
}

// Custom tier node component - circular shape with emoji, expandable
function TierNode({ data }: { data: { label: string; emoji?: string; isExpanded?: boolean; onToggle?: () => void } }) {
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
      <div className="text-[10px] font-semibold text-primary text-center px-2 flex flex-col items-center gap-0.5">
        {data.emoji && <span className="text-sm">{data.emoji}</span>}
        <span className="leading-tight break-words">{data.label}</span>
      </div>
    </div>
  );
}

// Custom course node component - rectangular shape with course code and name
function CourseNode({ data }: { data: { course: TierCourse } }) {
  const { course } = data;
  return (
    <div className="min-w-[180px] max-w-[200px] rounded-lg border-2 border-slate-300 bg-white shadow-sm hover:shadow-md transition-shadow px-3 py-2 relative">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col gap-1">
        <div className="font-bold text-sm text-slate-800">{course.code}</div>
        <div className="text-xs text-slate-600 line-clamp-2">{course.name}</div>
      </div>
    </div>
  );
}

// Define nodeTypes outside component to avoid React Flow warning
const nodeTypes = {
  root: CybersecurityRootNode,
  tier: TierNode,
  course: CourseNode,
};

export default function CareerPathGraph({ onResetReady, onFormatReady }: CareerPathGraphProps) {
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  const [isFormatted, setIsFormatted] = useState(false); // Track if formatting has been applied
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Toggle tier expansion
  const toggleTier = useCallback((tierId: string) => {
    setExpandedTiers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tierId)) {
        newSet.delete(tierId);
      } else {
        newSet.add(tierId);
      }
      return newSet;
    });
  }, []);

  // Create nodes and edges using useMemo (Option 2) - now dynamic based on expanded state
  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    // Create root node: Cybersecurity
    // Center root node horizontally, position near top
    const rootNode: Node = {
      id: "cybersecurity-root",
      type: "root",
      data: { label: cybersecurityCareerPathConfig.rootLabel },
      position: nodePositions["cybersecurity-root"] || { x: 0, y: 40 },
    };

    // Create tier nodes from config
    // Use formatted spacing if formatting has been applied
    const tierSpacing = isFormatted ? 600 : 400; // Use larger spacing if formatted
    const tierStartX = -((cybersecurityCareerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220; // Vertical position below root

    const tierNodes: Node[] = cybersecurityCareerPathConfig.categories.map((category, index) => {
      const defaultPosition = {
        x: tierStartX + index * tierSpacing,
        y: tierY,
      };
      
      return {
        id: category.id,
        type: "tier",
        data: {
          label: category.label,
          emoji: category.emoji,
          isExpanded: expandedTiers.has(category.id),
          onToggle: () => toggleTier(category.id),
        },
        position: nodePositions[category.id] || defaultPosition,
      };
    });

    // Create edges from root to each tier
    const tierEdges: Edge[] = tierNodes.map((tierNode) => ({
      id: `cybersecurity-root-${tierNode.id}`,
      source: "cybersecurity-root",
      target: tierNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Helper function to get tier number from tier ID
    const getTierNumber = (tierId: string): number => {
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    // Create course nodes for expanded tiers
    const courseNodes: Node[] = [];
    const courseEdges: Edge[] = [];
    
    tierNodes.forEach((tierNode) => {
      if (expandedTiers.has(tierNode.id)) {
        const tierNumber = getTierNumber(tierNode.id);
        const tierCourses = cybersecurityCareerPathConfig.courses.filter(
          (course) => course.tier === tierNumber
        );

        // Layout courses in a grid below the tier node
        // Use formatted spacing if formatting has been applied
        const coursesPerRow = isFormatted ? 2 : 3; // Fewer courses per row when formatted
        const courseSpacing = isFormatted ? 300 : 220; // Wider spacing when formatted
        const rowSpacing = isFormatted ? 120 : 100; // More vertical spacing when formatted
        const courseStartY = tierNode.position.y + 150; // Start courses below tier node (accounting for node height and spacing)
        
        tierCourses.forEach((course, courseIndex) => {
          const row = Math.floor(courseIndex / coursesPerRow);
          const col = courseIndex % coursesPerRow;
          
          // Calculate how many courses are in this row
          const coursesInRow = Math.min(coursesPerRow, tierCourses.length - row * coursesPerRow);
          
          // Center courses horizontally relative to tier node
          // For a row with N courses, position them from -(N-1)/2 * spacing to +(N-1)/2 * spacing
          const centerOffset = ((coursesInRow - 1) * courseSpacing) / 2;
          const courseOffsetX = (col * courseSpacing) - centerOffset;
          const courseX = tierNode.position.x + courseOffsetX;
          const courseY = courseStartY + row * rowSpacing;
          
          const courseNodeId = `course-${course.id}`;
          courseNodes.push({
            id: courseNodeId,
            type: "course",
            data: { course },
            position: nodePositions[courseNodeId] || {
              x: courseX,
              y: courseY,
            },
          });

          // Create edge from tier to course
          courseEdges.push({
            id: `${tierNode.id}-${courseNodeId}`,
            source: tierNode.id,
            target: courseNodeId,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#cbd5e1", strokeWidth: 1.5 },
          });
        });
      }
    });

    // Return nodes and edges
    return {
      nodes: [rootNode, ...tierNodes, ...courseNodes],
      edges: [...tierEdges, ...courseEdges],
    };
  }, [expandedTiers, nodePositions, toggleTier, isFormatted]);

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

  // Sync nodesState and edgesState from graphNodes/graphEdges when not dragging
  useEffect(() => {
    if (!isDragging) {
      setNodesState(graphNodes);
      setEdgesState(graphEdges);
    }
  }, [graphNodes, graphEdges, isDragging]);

  // Initialize nodesState on first render
  useEffect(() => {
    if (nodesState.length === 0 && graphNodes.length > 0) {
      setNodesState(graphNodes);
      setEdgesState(graphEdges);
    }
  }, [graphNodes, graphEdges, nodesState.length]);

  // Use nodesState during drag, graphNodes otherwise
  const displayNodes = isDragging ? nodesState : graphNodes;
  const displayEdges = isDragging ? edgesState : graphEdges;

  // Handle React Flow instance initialization
  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  // Reset function - resets graph to initial state (all tiers collapsed, positions reset)
  const handleReset = useCallback(() => {
    // Clear all expanded tiers
    setExpandedTiers(new Set());
    // Clear all saved node positions
    setNodePositions({});
    // Reset dragging state
    setIsDragging(false);
    // Reset formatting flag
    setIsFormatted(false);
    
    // Fit view after state resets
    setTimeout(() => {
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView({ padding: 0.1, maxZoom: 1.5 });
      }
    }, 100);
  }, []);

  // Format function - recalculates all node positions with increased spacing to prevent overlap
  const handleFormat = useCallback(() => {
    const newPositions: Record<string, { x: number; y: number }> = {};
    
    // Root node position
    newPositions["cybersecurity-root"] = { x: 0, y: 40 };
    
    // Tier nodes positioning - INCREASED spacing to prevent overlap
    const tierSpacing = 600; // Increased from 400 to spread tiers further apart
    const tierStartX = -((cybersecurityCareerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;
    
    // Helper function to get tier number from tier ID
    const getTierNumber = (tierId: string): number => {
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    cybersecurityCareerPathConfig.categories.forEach((category, index) => {
      const tierNodeId = category.id;
      const tierX = tierStartX + index * tierSpacing;
      newPositions[tierNodeId] = { x: tierX, y: tierY };
      
      // If tier is expanded, recalculate course positions with INCREASED spacing
      if (expandedTiers.has(tierNodeId)) {
        const tierNumber = getTierNumber(tierNodeId);
        const tierCourses = cybersecurityCareerPathConfig.courses.filter(
          (course) => course.tier === tierNumber
        );
        
        const coursesPerRow = 2; // Reduced from 3 to 2 per row to prevent overlap
        const courseSpacing = 300; // Increased from 220 to 300 for wider horizontal spacing
        const rowSpacing = 120; // Increased from 100 to 120 for more vertical spacing
        const courseStartY = tierY + 150;
        
        tierCourses.forEach((course, courseIndex) => {
          const row = Math.floor(courseIndex / coursesPerRow);
          const col = courseIndex % coursesPerRow;
          const coursesInRow = Math.min(coursesPerRow, tierCourses.length - row * coursesPerRow);
          const centerOffset = ((coursesInRow - 1) * courseSpacing) / 2;
          const courseOffsetX = (col * courseSpacing) - centerOffset;
          const courseX = tierX + courseOffsetX;
          const courseY = courseStartY + row * rowSpacing;
          
          const courseNodeId = `course-${course.id}`;
          newPositions[courseNodeId] = { x: courseX, y: courseY };
        });
      }
    });
    
    // Update all positions at once - this will trigger useMemo to recalculate graphNodes
    setNodePositions(newPositions);
    
    // Mark as formatted so newly expanded tiers use formatted spacing
    setIsFormatted(true);
    
    // Ensure we're not in dragging state so displayNodes uses graphNodes
    setIsDragging(false);
    
    // Wait for React to update state and recalculate nodes, then apply positions
    // Use multiple animation frames to ensure state has fully propagated
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Wait one more frame to ensure useMemo has recalculated with new positions
        requestAnimationFrame(() => {
          if (reactFlowInstance.current) {
            const instance = reactFlowInstance.current;
            
            // Calculate nodes the same way useMemo does, but with newPositions
            const rootNode: Node = {
              id: "cybersecurity-root",
              type: "root",
              data: { label: cybersecurityCareerPathConfig.rootLabel },
              position: newPositions["cybersecurity-root"],
            };
            
            const tierNodes: Node[] = cybersecurityCareerPathConfig.categories.map((category, index) => ({
              id: category.id,
              type: "tier",
              data: {
                label: category.label,
                emoji: category.emoji,
                isExpanded: expandedTiers.has(category.id),
                onToggle: () => toggleTier(category.id),
              },
              position: newPositions[category.id],
            }));
            
            const courseNodes: Node[] = [];
            tierNodes.forEach((tierNode) => {
              if (expandedTiers.has(tierNode.id)) {
                const tierNumber = getTierNumber(tierNode.id);
                const tierCourses = cybersecurityCareerPathConfig.courses.filter(
                  (course) => course.tier === tierNumber
                );
                
                tierCourses.forEach((course) => {
                  const courseNodeId = `course-${course.id}`;
                  if (newPositions[courseNodeId]) {
                    courseNodes.push({
                      id: courseNodeId,
                      type: "course",
                      data: { course },
                      position: newPositions[courseNodeId],
                    });
                  }
                });
              }
            });
            
            // Set all nodes with new positions
            const allNodes = [rootNode, ...tierNodes, ...courseNodes];
            instance.setNodes(allNodes);
            
            // Fit view after nodes are updated
            setTimeout(() => {
              instance.fitView({ padding: 0.2, maxZoom: 1.5 });
            }, 50);
          }
        });
      });
    });
  }, [expandedTiers, toggleTier]);

  // Expose reset handler to parent component
  useEffect(() => {
    if (!onResetReady) return;
    const rafId = requestAnimationFrame(() => {
      onResetReady(handleReset);
    });
    return () => cancelAnimationFrame(rafId);
  }, [onResetReady, handleReset]);

  // Expose format handler to parent component
  useEffect(() => {
    if (!onFormatReady) return;
    const rafId = requestAnimationFrame(() => {
      onFormatReady(handleFormat);
    });
    return () => cancelAnimationFrame(rafId);
  }, [onFormatReady, handleFormat]);

  return (
    <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
      <div className="w-full h-[800px] relative [&_.react-flow__background]:opacity-30">
        <ReactFlowProvider>
          <ReactFlow
            nodes={displayNodes}
            edges={displayEdges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeDragStart={onNodeDragStart}
            onNodeDragStop={onNodeDragStop}
            onInit={onInit}
            nodesDraggable={true}
            fitView={!isDragging}
            fitViewOptions={{ padding: 0.1, maxZoom: 1.5 }}
            attributionPosition="bottom-left"
          >
            <Background color="#e2e8f0" gap={16} />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div className="w-full px-4 py-2 bg-muted/20 border-t border-border/40">
        <p className="text-xs text-black text-center">
          Career path graph for Cybersecurity
        </p>
      </div>
    </div>
  );
}

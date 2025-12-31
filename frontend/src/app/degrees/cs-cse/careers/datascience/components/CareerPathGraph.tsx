"use client";

/**
 * CareerPathGraph Component - Data Science
 * Interactive React Flow graph visualization for Data Science career path
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
import { dataScienceCareerPathConfig } from "../data/careerPathConfig";
import { TierCourse } from "@/types/careerPath";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

// Custom root node component for Data Science career path
function DataScienceRootNode({ data }: { data: { label: string } }) {
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
  root: DataScienceRootNode,
  tier: TierNode,
  course: CourseNode,
};

export default function CareerPathGraph({ onResetReady, onFormatReady }: CareerPathGraphProps) {
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  const [isFormatted, setIsFormatted] = useState(false);
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

  // Create nodes and edges using useMemo
  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    // Create root node: Data Science
    const rootNode: Node = {
      id: "datascience-root",
      type: "root",
      data: { label: dataScienceCareerPathConfig.rootLabel },
      position: nodePositions["datascience-root"] || { x: 0, y: 40 },
    };

    // Create tier nodes from config
    const tierSpacing = isFormatted ? 600 : 400;
    const tierStartX = -((dataScienceCareerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;

    const tierNodes: Node[] = dataScienceCareerPathConfig.categories.map((category, index) => {
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
      id: `datascience-root-${tierNode.id}`,
      source: "datascience-root",
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
        const tierCourses = dataScienceCareerPathConfig.courses.filter(
          (course) => course.tier === tierNumber
        );

        // Layout courses in a grid below the tier node
        const coursesPerRow = isFormatted ? 2 : 3;
        const courseSpacing = isFormatted ? 300 : 220;
        const rowSpacing = isFormatted ? 120 : 100;
        const courseStartY = tierNode.position.y + 150;
        
        tierCourses.forEach((course, courseIndex) => {
          const row = Math.floor(courseIndex / coursesPerRow);
          const col = courseIndex % coursesPerRow;
          
          const coursesInRow = Math.min(coursesPerRow, tierCourses.length - row * coursesPerRow);
          
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

    return {
      nodes: [rootNode, ...tierNodes, ...courseNodes],
      edges: [...tierEdges, ...courseEdges],
    };
  }, [expandedTiers, nodePositions, toggleTier, isFormatted]);

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

  useEffect(() => {
    if (!isDragging) {
      setNodesState(graphNodes);
      setEdgesState(graphEdges);
    }
  }, [graphNodes, graphEdges, isDragging]);

  useEffect(() => {
    if (nodesState.length === 0 && graphNodes.length > 0) {
      setNodesState(graphNodes);
      setEdgesState(graphEdges);
    }
  }, [graphNodes, graphEdges, nodesState.length]);

  const displayNodes = isDragging ? nodesState : graphNodes;
  const displayEdges = isDragging ? edgesState : graphEdges;

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  const handleReset = useCallback(() => {
    setExpandedTiers(new Set());
    setNodePositions({});
    setIsDragging(false);
    setIsFormatted(false);
    
    setTimeout(() => {
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView({ padding: 0.1, maxZoom: 1.5 });
      }
    }, 100);
  }, []);

  const handleFormat = useCallback(() => {
    const newPositions: Record<string, { x: number; y: number }> = {};
    
    newPositions["datascience-root"] = { x: 0, y: 40 };
    
    const tierSpacing = 600;
    const tierStartX = -((dataScienceCareerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;
    
    const getTierNumber = (tierId: string): number => {
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    dataScienceCareerPathConfig.categories.forEach((category, index) => {
      const tierNodeId = category.id;
      const tierX = tierStartX + index * tierSpacing;
      newPositions[tierNodeId] = { x: tierX, y: tierY };
      
      if (expandedTiers.has(tierNodeId)) {
        const tierNumber = getTierNumber(tierNodeId);
        const tierCourses = dataScienceCareerPathConfig.courses.filter(
          (course) => course.tier === tierNumber
        );
        
        const coursesPerRow = 2;
        const courseSpacing = 300;
        const rowSpacing = 120;
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
    
    setNodePositions(newPositions);
    setIsFormatted(true);
    setIsDragging(false);
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (reactFlowInstance.current) {
            const instance = reactFlowInstance.current;
            
            const rootNode: Node = {
              id: "datascience-root",
              type: "root",
              data: { label: dataScienceCareerPathConfig.rootLabel },
              position: newPositions["datascience-root"],
            };
            
            const tierNodes: Node[] = dataScienceCareerPathConfig.categories.map((category, index) => ({
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
                const tierCourses = dataScienceCareerPathConfig.courses.filter(
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
            
            const allNodes = [rootNode, ...tierNodes, ...courseNodes];
            instance.setNodes(allNodes);
            
            setTimeout(() => {
              instance.fitView({ padding: 0.2, maxZoom: 1.5 });
            }, 50);
          }
        });
      });
    });
  }, [expandedTiers, toggleTier]);

  useEffect(() => {
    if (!onResetReady) return;
    const rafId = requestAnimationFrame(() => {
      onResetReady(handleReset);
    });
    return () => cancelAnimationFrame(rafId);
  }, [onResetReady, handleReset]);

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
          Career path graph for Data Science / Data Analytics
        </p>
      </div>
    </div>
  );
}

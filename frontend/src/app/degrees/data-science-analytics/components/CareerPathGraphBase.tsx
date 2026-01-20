"use client";

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
import { CareerPathConfig, TierCourse } from "@/types/careerPath";

interface BaseGraphProps {
  graphId: string;
  config: CareerPathConfig;
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

function RootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-32 h-32 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-lg font-bold text-primary text-center">{data.label}</div>
    </div>
  );
}

function TierNode({ data }: { data: { label: string; emoji?: string; isExpanded?: boolean; onToggle?: () => void } }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    data.onToggle?.();
  };

  return (
    <div
      className={`w-24 h-24 rounded-full border-2 ${
        data.isExpanded ? "border-primary bg-primary/15 border-solid" : "border-primary/50 bg-primary/5 border-dashed"
      } flex items-center justify-center shadow-md relative cursor-pointer hover:bg-primary/10 transition-colors`}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="text-[8.75px] font-semibold text-primary text-center px-2 flex flex-col items-center gap-0.5">
        {data.emoji && <span className="text-sm">{data.emoji}</span>}
        <span className="leading-tight break-words">{data.label}</span>
      </div>
    </div>
  );
}

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

const nodeTypes = {
  root: RootNode,
  tier: TierNode,
  course: CourseNode,
};

export default function CareerPathGraphBase({ graphId, config, onResetReady, onFormatReady }: BaseGraphProps) {
  const rootId = `${graphId}-root`;
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  const [isFormatted, setIsFormatted] = useState(false);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const toggleTier = useCallback((tierId: string) => {
    setExpandedTiers((prev) => {
      const next = new Set(prev);
      next.has(tierId) ? next.delete(tierId) : next.add(tierId);
      return next;
    });
  }, []);

  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    const rootNode: Node = {
      id: rootId,
      type: "root",
      data: { label: config.rootLabel },
      position: nodePositions[rootId] || { x: 0, y: 40 },
    };

    const tierSpacing = isFormatted ? 600 : 400;
    const tierStartX = -((config.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;

    const tierNodes: Node[] = config.categories.map((category, index) => {
      const defaultPos = { x: tierStartX + index * tierSpacing, y: tierY };
      return {
        id: category.id,
        type: "tier",
        data: {
          label: category.label,
          emoji: category.emoji,
          isExpanded: expandedTiers.has(category.id),
          onToggle: () => toggleTier(category.id),
        },
        position: nodePositions[category.id] || defaultPos,
      };
    });

    const tierEdges: Edge[] = tierNodes.map((tierNode) => ({
      id: `${rootId}-${tierNode.id}`,
      source: rootId,
      target: tierNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    const getTierNumber = (tierId: string) => {
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const courseNodes: Node[] = [];
    const courseEdges: Edge[] = [];

    tierNodes.forEach((tierNode) => {
      if (expandedTiers.has(tierNode.id)) {
        const tierNumber = getTierNumber(tierNode.id);
        const tierCourses = config.courses.filter((course) => course.tier === tierNumber);

        const coursesPerRow = isFormatted ? 2 : 3;
        const courseSpacing = isFormatted ? 300 : 220;
        const rowSpacing = isFormatted ? 120 : 100;
        const courseStartY = tierNode.position.y + 150;

        tierCourses.forEach((course, index) => {
          const row = Math.floor(index / coursesPerRow);
          const col = index % coursesPerRow;
          const coursesInRow = Math.min(coursesPerRow, tierCourses.length - row * coursesPerRow);
          const centerOffset = ((coursesInRow - 1) * courseSpacing) / 2;
          const courseOffsetX = col * courseSpacing - centerOffset;
          const courseX = tierNode.position.x + courseOffsetX;
          const courseY = courseStartY + row * rowSpacing;
          const courseNodeId = `course-${graphId}-${course.id}`;

          courseNodes.push({
            id: courseNodeId,
            type: "course",
            data: { course },
            position: nodePositions[courseNodeId] || { x: courseX, y: courseY },
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

    return { nodes: [rootNode, ...tierNodes, ...courseNodes], edges: [...tierEdges, ...courseEdges] };
  }, [config, expandedTiers, graphId, isFormatted, nodePositions, rootId, toggleTier]);

  const onNodeDragStart = useCallback(() => setIsDragging(true), []);
  const onNodeDragStop = useCallback((_event: React.MouseEvent, node: Node) => {
    setIsDragging(false);
    setNodePositions((prev) => ({ ...prev, [node.id]: node.position }));
  }, []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodesState((nds) => applyNodeChanges(changes, nds));
    changes.forEach((change) => {
      if (change.type === "position" && !change.dragging && change.position && change.id) {
        const pos = change.position;
        setNodePositions((prev) => ({ ...prev, [change.id]: { x: pos.x, y: pos.y } }));
      }
    });
  }, []);

  useEffect(() => {
    if (!isDragging) {
      setNodesState(graphNodes);
      setEdgesState(graphEdges);
    }
  }, [graphEdges, graphNodes, isDragging]);

  useEffect(() => {
    if (nodesState.length === 0 && graphNodes.length > 0) {
      setNodesState(graphNodes);
      setEdgesState(graphEdges);
    }
  }, [graphEdges, graphNodes, nodesState.length]);

  const displayNodes = isDragging ? nodesState : graphNodes;
  const displayEdges = isDragging ? edgesState : graphEdges;

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    onFormatReady?.(handleFormat);
    onResetReady?.(handleReset);
  }, [onFormatReady, onResetReady]);

  const handleReset = useCallback(() => {
    setExpandedTiers(new Set());
    setNodePositions({});
    setIsDragging(false);
    setIsFormatted(false);
    setTimeout(() => {
      reactFlowInstance.current?.fitView({ padding: 0.1, maxZoom: 1.5 });
    }, 100);
  }, []);

  const handleFormat = useCallback(() => {
    const newPositions: Record<string, { x: number; y: number }> = {};
    newPositions[rootId] = { x: 0, y: 40 };

    const tierSpacing = 600;
    const tierStartX = -((config.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;

    const getTierNumber = (tierId: string) => {
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    config.categories.forEach((category, index) => {
      const tierId = category.id;
      const tierX = tierStartX + index * tierSpacing;
      newPositions[tierId] = { x: tierX, y: tierY };

      if (expandedTiers.has(tierId)) {
        const tierNumber = getTierNumber(tierId);
        const tierCourses = config.courses.filter((course) => course.tier === tierNumber);
        const coursesPerRow = 2;
        const courseSpacing = 300;
        const rowSpacing = 120;
        const courseStartY = tierY + 150;

        tierCourses.forEach((course, index) => {
          const row = Math.floor(index / coursesPerRow);
          const col = index % coursesPerRow;
          const coursesInRow = Math.min(coursesPerRow, tierCourses.length - row * coursesPerRow);
          const centerOffset = ((coursesInRow - 1) * courseSpacing) / 2;
          const courseOffsetX = col * courseSpacing - centerOffset;
          const courseX = tierX + courseOffsetX;
          const courseY = courseStartY + row * rowSpacing;
          const courseNodeId = `course-${graphId}-${course.id}`;
          newPositions[courseNodeId] = { x: courseX, y: courseY };
        });
      }
    });

    setNodePositions(newPositions);
    setIsFormatted(true);
    setIsDragging(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reactFlowInstance.current?.fitView({ padding: 0.15, maxZoom: 1.5 });
      });
    });
  }, [config.categories, config.courses, expandedTiers, graphId, rootId]);

  // Register handlers when callbacks provided
  useEffect(() => {
    if (onResetReady) onResetReady(handleReset);
  }, [handleReset, onResetReady]);

  useEffect(() => {
    if (onFormatReady) onFormatReady(handleFormat);
  }, [handleFormat, onFormatReady]);

  return (
    <div className="h-[700px] w-full border border-border/50 rounded-xl bg-background shadow-sm">
      <ReactFlowProvider>
        <ReactFlow
          nodes={displayNodes}
          edges={displayEdges}
          onNodesChange={onNodesChange}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onInit={onInit}
          fitView
          nodeTypes={nodeTypes}
          panOnScroll
          zoomOnScroll
          selectionOnDrag
        >
          <Background gap={24} color="#e2e8f0" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

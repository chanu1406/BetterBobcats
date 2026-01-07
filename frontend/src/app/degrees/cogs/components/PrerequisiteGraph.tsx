/**
 * COGS Prerequisite Graph Component
 * Displays the prerequisite relationships for Cognitive Science courses
 */

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ConnectionMode,
} from "reactflow";
import "reactflow/dist/style.css";
import { cogsCourses } from "../data/courses";

interface PrerequisiteGraphProps {
  useFormattedLayoutExternal?: boolean;
  onLayoutChange?: (useFormatted: boolean) => void;
  onResetReady?: (resetHandler: () => void) => void;
  onFullResetReady?: (fullResetHandler: () => void) => void;
}

export default function PrerequisiteGraph({
  useFormattedLayoutExternal,
  onLayoutChange,
  onResetReady,
  onFullResetReady,
}: PrerequisiteGraphProps) {
  // Create nodes and edges from course data
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Simple layout - arrange by year and semester
    cogsCourses.forEach((course, index) => {
      const x = course.semester === 'fall' ? 100 : 400;
      const y = course.year * 150 + 50;

      nodes.push({
        id: course.id,
        type: 'default',
        position: { x, y },
        data: { 
          label: `${course.code}\n${course.name}` 
        },
        style: {
          background: '#ffffff',
          border: '2px solid #0070f3',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '12px',
          width: 200,
        },
      });

      // Create edges for prerequisites
      if (course.prerequisites && course.prerequisites.length > 0) {
        course.prerequisites.forEach((prereqId) => {
          edges.push({
            id: `${prereqId}-${course.id}`,
            source: prereqId,
            target: course.id,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#0070f3' },
          });
        });
      }
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const resetGraph = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  useEffect(() => {
    if (onResetReady) {
      onResetReady(resetGraph);
    }
    if (onFullResetReady) {
      onFullResetReady(resetGraph);
    }
  }, [resetGraph, onResetReady, onFullResetReady]);

  return (
    <div className="w-full h-[800px] border-2 border-border rounded-lg overflow-hidden bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

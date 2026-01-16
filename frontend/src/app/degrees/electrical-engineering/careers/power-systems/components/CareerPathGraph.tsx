"use client";

/**
 * CareerPathGraph Component for Power Systems & Energy
 * Interactive React Flow graph visualization for career paths
 * 
 * NOTE: This is a placeholder. Full graph implementation will be added later.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ReactFlowProvider,
  NodeChange,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { CareerPathConfig } from "@/types/careerPath";
import { powerSystemsCareerPathConfig } from "../data/careerPathConfig";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

export default function CareerPathGraph({ onResetReady, onFormatReady }: CareerPathGraphProps) {
  const careerPathConfig: CareerPathConfig = powerSystemsCareerPathConfig;
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);

  const handleReset = useCallback(() => {
    // Reset implementation will be added later
  }, []);

  const handleFormat = useCallback(() => {
    // Format implementation will be added later
  }, []);

  useEffect(() => {
    if (onResetReady) {
      onResetReady(handleReset);
    }
  }, [onResetReady, handleReset]);

  useEffect(() => {
    if (onFormatReady) {
      onFormatReady(handleFormat);
    }
  }, [onFormatReady, handleFormat]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodesState((nds) => applyNodeChanges(changes, nds));
  }, []);

  return (
    <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
      <div className="w-full h-[800px] relative [&_.react-flow__background]:opacity-30">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodesState}
            edges={edgesState}
            onNodesChange={onNodesChange}
            nodesDraggable={true}
            fitView
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
          Power Systems & Energy career path graph. Course data will be added later.
        </p>
      </div>
    </div>
  );
}

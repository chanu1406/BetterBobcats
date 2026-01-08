/**
 * Human Resources Specialist Career Path Graph Component
 * Interactive React Flow graph visualization for Human Resources Specialist (Generalist) career path
 */

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
import { TierCourse } from "@/types/careerPath";
import { humanResourcesConfig } from "../data/careerPathConfig";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

// Custom root node component
function HumanResourcesRootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-32 h-32 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-lg font-bold text-primary text-center">
        {data.label}
      </div>
    </div>
  );
}

// Custom tier node component
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

// Custom course node component
function CourseNode({ data }: { data: { course: TierCourse } }) {
  const { course } = data;
  return (
    <div className="min-w-[180px] max-w-[200px] rounded-lg border-2 border-slate-300 bg-white shadow-sm hover:shadow-md transition-shadow px-3 py-2 relative cursor-pointer">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col gap-1">
        <div className="font-bold text-sm text-slate-800">{course.code}</div>
        <div className="text-xs text-slate-600 line-clamp-2">{course.name}</div>
      </div>
    </div>
  );
}

const nodeTypes = {
  root: HumanResourcesRootNode,
  tier: TierNode,
  course: CourseNode,
};

export default function HumanResourcesCareerPathGraph({ onResetReady, onFormatReady }: CareerPathGraphProps) {
  const careerPathConfig = humanResourcesConfig;
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<TierCourse | null>(null);
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

  // Handle course click
  const handleCourseClick = useCallback((course: TierCourse) => {
    setSelectedCourse(course);
  }, []);

  // Handle closing expanded course card
  const handleCloseCourseCard = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  // Handle node click from React Flow
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.type === "course" && node.data?.course) {
      handleCourseClick(node.data.course);
    }
  }, [handleCourseClick]);

  // Create nodes and edges
  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    // Create root node
    const rootNode: Node = {
      id: "human-resources-root",
      type: "root",
      data: { label: careerPathConfig.rootLabel },
      position: nodePositions["human-resources-root"] || { x: 400, y: 40 },
    };

    // Create tier nodes (3 tiers for this career path)
    const tierNodes: Node[] = careerPathConfig.categories.map((category, index) => {
      const x = 150 + index * 250;
      const y = 200;
      return {
        id: category.id,
        type: "tier",
        data: {
          label: category.label,
          emoji: category.emoji,
          isExpanded: expandedTiers.has(category.id),
          onToggle: () => toggleTier(category.id),
        },
        position: nodePositions[category.id] || { x, y },
      };
    });

    // Create edges from root to tiers
    const rootToTierEdges: Edge[] = careerPathConfig.categories.map((category) => ({
      id: `root-${category.id}`,
      source: "human-resources-root",
      target: category.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#0070f3", strokeWidth: 2 },
    }));

    // Create course nodes for expanded tiers
    const courseNodes: Node[] = [];
    const tierToCoursesEdges: Edge[] = [];

    careerPathConfig.categories.forEach((category, tierIndex) => {
      if (expandedTiers.has(category.id)) {
        const coursesInTier = careerPathConfig.courses.filter(
          (course) => course.tier === tierIndex + 1
        );

        coursesInTier.forEach((course, courseIndex) => {
          const baseX = 100 + tierIndex * 250;
          const baseY = 350 + courseIndex * 100;
          
          courseNodes.push({
            id: course.id,
            type: "course",
            data: { course },
            position: nodePositions[course.id] || { x: baseX, y: baseY },
          });

          tierToCoursesEdges.push({
            id: `${category.id}-${course.id}`,
            source: category.id,
            target: course.id,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#94a3b8", strokeWidth: 1.5 },
          });
        });
      }
    });

    const allNodes = [rootNode, ...tierNodes, ...courseNodes];
    const allEdges = [...rootToTierEdges, ...tierToCoursesEdges];

    return { nodes: allNodes, edges: allEdges };
  }, [careerPathConfig, expandedTiers, nodePositions, toggleTier]);

  // Update nodes state when graphNodes changes
  useEffect(() => {
    setNodesState(graphNodes);
  }, [graphNodes]);

  // Update edges state when graphEdges changes
  useEffect(() => {
    setEdgesState(graphEdges);
  }, [graphEdges]);

  // Handle node changes (dragging, etc.)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodesState((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
        
        // Update nodePositions for dragged nodes
        changes.forEach((change) => {
          if (change.type === "position" && change.position && change.dragging === false) {
            setNodePositions((prev) => ({
              ...prev,
              [change.id]: change.position!,
            }));
          }
        });
        
        return updatedNodes;
      });
    },
    []
  );

  // Reset graph function
  const resetGraph = useCallback(() => {
    setExpandedTiers(new Set());
    setNodePositions({});
    setSelectedCourse(null);
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView({ padding: 0.2, duration: 500 });
    }
  }, []);

  // Format graph function (auto-layout)
  const formatGraph = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView({ padding: 0.2, duration: 500 });
    }
  }, []);

  // Register reset and format handlers with parent
  useEffect(() => {
    if (onResetReady) {
      onResetReady(resetGraph);
    }
    if (onFormatReady) {
      onFormatReady(formatGraph);
    }
  }, [onResetReady, onFormatReady, resetGraph, formatGraph]);

  return (
    <div className="relative">
      <div className="w-full h-[700px] border-2 border-border rounded-lg overflow-hidden bg-white">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodesState}
            edges={edgesState}
            onNodesChange={onNodesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onInit={(instance) => {
              reactFlowInstance.current = instance;
              instance.fitView({ padding: 0.2 });
            }}
            fitView
            minZoom={0.2}
            maxZoom={1.5}
            defaultEdgeOptions={{
              type: "smoothstep",
              animated: false,
            }}
          >
            <Background color="#e5e7eb" gap={16} />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Expanded Course Card */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCloseCourseCard}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedCourse.code}</h3>
                <p className="text-lg text-slate-600">{selectedCourse.name}</p>
              </div>
              <button
                onClick={handleCloseCourseCard}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Why This Course Matters</h4>
                <p className="text-slate-600">{selectedCourse.description}</p>
              </div>

              {selectedCourse.expandedInfo?.careerRelevance && (
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Career Relevance</h4>
                  <p className="text-slate-600">{selectedCourse.expandedInfo.careerRelevance}</p>
                </div>
              )}

              {selectedCourse.expandedInfo?.topics && selectedCourse.expandedInfo.topics.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Key Topics</h4>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    {selectedCourse.expandedInfo.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Tier {selectedCourse.tier}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  NodeMouseHandler,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { marketResearchConfig } from "../data";
import { TierCourse } from "@/types/careerPath";

// ==================== TYPE DEFINITIONS ====================
interface CourseNodeData {
  label: string;
  fullName?: string;
  description?: string;
  tier?: number;
  courseData?: TierCourse;
  isExpanded?: boolean;
  isTier?: boolean;
  isRoot?: boolean;
}

interface MarketResearchCareerPathGraphProps {
  onResetReady?: (handler: () => void) => void;
  onFormatReady?: (handler: () => void) => void;
}

// ==================== CUSTOM NODE COMPONENTS ====================
const RootNode = ({ data }: { data: CourseNodeData }) => (
  <div className="px-6 py-4 shadow-lg rounded-lg bg-gradient-to-br from-primary to-accent border-2 border-primary/30 min-w-[200px] text-center">
    <div className="font-bold text-lg text-white">{data.label}</div>
  </div>
);

const TierNode = ({ data }: { data: CourseNodeData }) => {
  const tierColors: Record<number, { bg: string; border: string; text: string }> = {
    1: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      border: "border-green-500",
      text: "text-green-800",
    },
    2: {
      bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-800",
    },
    3: {
      bg: "bg-gradient-to-br from-orange-50 to-orange-100",
      border: "border-orange-500",
      text: "text-orange-800",
    },
  };

  const colors = tierColors[data.tier || 1];

  return (
    <div
      className={`px-5 py-3 shadow-md rounded-lg ${colors.bg} border-2 ${colors.border} min-w-[280px] max-w-[320px] cursor-pointer hover:shadow-xl transition-all duration-200`}
    >
      <div className={`font-bold text-sm ${colors.text} text-center leading-tight`}>
        {data.label}
      </div>
    </div>
  );
};

const CourseNode = ({ data }: { data: CourseNodeData }) => (
  <div className="px-4 py-3 shadow-md rounded-md bg-white border-2 border-gray-300 hover:border-primary hover:shadow-lg transition-all duration-200 min-w-[180px] max-w-[200px] cursor-pointer">
    <div className="font-semibold text-xs text-primary mb-1">{data.courseData?.code}</div>
    <div className="text-xs text-gray-700 leading-tight line-clamp-2">{data.courseData?.name}</div>
  </div>
);

const nodeTypes = {
  root: RootNode,
  tier: TierNode,
  course: CourseNode,
};

// ==================== MAIN COMPONENT ====================
export default function MarketResearchCareerPathGraph({
  onResetReady,
  onFormatReady,
}: MarketResearchCareerPathGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCourse, setSelectedCourse] = useState<TierCourse | null>(null);
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());

  // Track initial positions to enable reset
  const initialNodesRef = useRef<Node[]>([]);
  const initialEdgesRef = useRef<Edge[]>([]);

  // ==================== GRAPH GENERATION ====================
  const generateGraph = useCallback(() => {
    const newNodes: Node<CourseNodeData>[] = [];
    const newEdges: Edge[] = [];

    // Root node
    const rootNode: Node<CourseNodeData> = {
      id: "root",
      type: "root",
      position: { x: 400, y: 50 },
      data: { label: marketResearchConfig.rootLabel, isRoot: true },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };
    newNodes.push(rootNode);

    // Group courses by tier
    const coursesByTier = marketResearchConfig.courses.reduce((acc, course) => {
      if (!acc[course.tier]) acc[course.tier] = [];
      acc[course.tier].push(course);
      return acc;
    }, {} as Record<number, TierCourse[]>);

    let currentY = 200;
    const tierSpacing = 150;
    const courseSpacing = 250;

    // Create tier nodes and course nodes
    marketResearchConfig.categories.forEach((category) => {
      const tierId = category.id;
      const tierNumber = parseInt(tierId.split("-")[1]);
      const tierCourses = coursesByTier[tierNumber] || [];

      // Tier node
      const tierNode: Node<CourseNodeData> = {
        id: tierId,
        type: "tier",
        position: { x: 350, y: currentY },
        data: {
          label: `${category.emoji || ""} ${category.label}`.trim(),
          tier: tierNumber,
          isTier: true,
          isExpanded: expandedTiers.has(tierId),
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      newNodes.push(tierNode);

      // Edge from root/previous tier to this tier
      if (tierId === "tier-1") {
        newEdges.push({
          id: `root-${tierId}`,
          source: "root",
          target: tierId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#3b82f6", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
        });
      } else {
        const prevTierId = `tier-${tierNumber - 1}`;
        newEdges.push({
          id: `${prevTierId}-${tierId}`,
          source: prevTierId,
          target: tierId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#3b82f6", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
        });
      }

      // Course nodes (only if tier is expanded)
      if (expandedTiers.has(tierId)) {
        const coursesY = currentY + 120;
        const totalWidth = tierCourses.length * courseSpacing;
        const startX = 400 - totalWidth / 2;

        tierCourses.forEach((course, idx) => {
          const courseNode: Node<CourseNodeData> = {
            id: course.id,
            type: "course",
            position: { x: startX + idx * courseSpacing, y: coursesY },
            data: {
              label: course.code,
              fullName: course.fullName,
              description: course.description,
              courseData: course,
              tier: tierNumber,
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          };
          newNodes.push(courseNode);

          // Edge from tier to course
          newEdges.push({
            id: `${tierId}-${course.id}`,
            source: tierId,
            target: course.id,
            type: "smoothstep",
            style: { stroke: "#94a3b8", strokeWidth: 1.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
          });
        });

        currentY = coursesY + 150;
      } else {
        currentY += tierSpacing;
      }
    });

    return { nodes: newNodes, edges: newEdges };
  }, [expandedTiers]);

  // ==================== INITIALIZE GRAPH ====================
  useEffect(() => {
    const { nodes: initialNodes, edges: initialEdges } = generateGraph();
    setNodes(initialNodes);
    setEdges(initialEdges);
    initialNodesRef.current = initialNodes;
    initialEdgesRef.current = initialEdges;
  }, [generateGraph, setNodes, setEdges]);

  // ==================== EVENT HANDLERS ====================
  const handleNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      const nodeData = node.data as CourseNodeData;

      // Handle tier node clicks (expand/collapse)
      if (nodeData.isTier) {
        setExpandedTiers((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(node.id)) {
            newSet.delete(node.id);
          } else {
            newSet.add(node.id);
          }
          return newSet;
        });
        return;
      }

      // Handle course node clicks (show details)
      if (nodeData.courseData) {
        setSelectedCourse(nodeData.courseData);
      }
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  // ==================== RESET & FORMAT FUNCTIONS ====================
  const resetGraph = useCallback(() => {
    setExpandedTiers(new Set());
    setSelectedCourse(null);
    setNodes(initialNodesRef.current);
    setEdges(initialEdgesRef.current);
  }, [setNodes, setEdges]);

  const formatGraph = useCallback(() => {
    const { nodes: formattedNodes, edges: formattedEdges } = generateGraph();
    setNodes(formattedNodes);
    setEdges(formattedEdges);
  }, [generateGraph, setNodes, setEdges]);

  // Register handlers with parent
  useEffect(() => {
    if (onResetReady) onResetReady(resetGraph);
    if (onFormatReady) onFormatReady(formatGraph);
  }, [onResetReady, onFormatReady, resetGraph, formatGraph]);

  // ==================== RENDER ====================
  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border-2 border-gray-200 shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: false,
          style: { strokeWidth: 2 },
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e2e8f0" />
        <Controls showInteractive={false} />
      </ReactFlow>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-primary to-accent text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedCourse.code}</h3>
                  <p className="text-sm opacity-90">{selectedCourse.name}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Why It's High-ROI for Market Research
                </h4>
                <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
              </div>

              {selectedCourse.expandedInfo?.learningOutcomes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Learning Outcomes</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedCourse.expandedInfo.learningOutcomes.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCourse.expandedInfo?.topics && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.expandedInfo.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCourse.expandedInfo?.careerRelevance && (
                <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Career Relevance</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedCourse.expandedInfo.careerRelevance}
                  </p>
                </div>
              )}

              {selectedCourse.expandedInfo?.credits && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">{selectedCourse.expandedInfo.credits} Credits</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

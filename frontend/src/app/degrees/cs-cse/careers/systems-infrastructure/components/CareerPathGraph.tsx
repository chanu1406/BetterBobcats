"use client";

/**
 * CareerPathGraph Component - Systems / Infrastructure Engineering
 * Interactive React Flow graph visualization for Systems/Infrastructure career path
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
import { TierCourse, CareerPathConfig } from "@/types/careerPath";
import { fetchCareerPath } from "@/lib/api";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

// Custom root node component for Systems/Infrastructure career path
function SystemsRootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-32 h-32 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-xs font-bold text-primary text-center px-2">
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
      <div className="text-[8.5px] font-semibold text-primary text-center px-2 flex flex-col items-center gap-0.5">
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
    <div className="min-w-[180px] max-w-[200px] rounded-lg border-2 border-slate-300 bg-white shadow-sm hover:shadow-md transition-shadow px-3 py-2 relative cursor-pointer">
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
  root: SystemsRootNode,
  tier: TierNode,
  course: CourseNode,
};

export default function CareerPathGraph({ onResetReady, onFormatReady }: CareerPathGraphProps) {
  const [careerPathConfig, setCareerPathConfig] = useState<CareerPathConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  const [isFormatted, setIsFormatted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TierCourse | null>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Fetch career path data from backend API
  useEffect(() => {
    const loadCareerPath = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCareerPath('systems-infrastructure');
        setCareerPathConfig(data);
        setError(null);
      } catch (err) {
        console.error('Error loading career path:', err);
        setError('Failed to load career path data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCareerPath();
  }, []);

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

  // Handle course click - expand course card
  const handleCourseClick = useCallback((course: TierCourse) => {
    setSelectedCourse(course);
  }, []);

  // Handle closing expanded course card
  const handleCloseCourseCard = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  // Handle node click from React Flow
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    // Only handle clicks on course nodes
    if (node.type === "course" && node.data?.course) {
      handleCourseClick(node.data.course);
    }
  }, [handleCourseClick]);

  // Create nodes and edges using useMemo
  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    // Return empty if no config loaded yet
    if (!careerPathConfig) {
      return { nodes: [], edges: [] };
    }

    // Create root node: Systems / Infrastructure
    const rootNode: Node = {
      id: "systems-root",
      type: "root",
      data: { label: careerPathConfig.rootLabel },
      position: nodePositions["systems-root"] || { x: 0, y: 40 },
    };

    // Create tier nodes from config
    const tierSpacing = isFormatted ? 600 : 350; // Tighter spacing for 5 tiers
    const tierStartX = -((careerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;

    const tierNodes: Node[] = careerPathConfig.categories.map((category, index) => {
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
      id: `systems-root-${tierNode.id}`,
      source: "systems-root",
      target: tierNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Helper function to get tier number from tier ID (supports decimals like 1.5, 2.5)
    const getTierNumber = (tierId: string): number => {
      if (tierId === 'tier-1-5') return 1.5;
      if (tierId === 'tier-2-5') return 2.5;
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    // Create course nodes for expanded tiers
    const courseNodes: Node[] = [];
    const courseEdges: Edge[] = [];
    
    tierNodes.forEach((tierNode) => {
      if (expandedTiers.has(tierNode.id)) {
        const tierNumber = getTierNumber(tierNode.id);
        const tierCourses = careerPathConfig.courses.filter(
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

    return {
      nodes: [rootNode, ...tierNodes, ...courseNodes],
      edges: [...tierEdges, ...courseEdges],
    };
  }, [careerPathConfig, expandedTiers, nodePositions, toggleTier, isFormatted]);

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
    setSelectedCourse(null);
    
    setTimeout(() => {
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView({ padding: 0.1, maxZoom: 1.5 });
      }
    }, 100);
  }, []);

  const handleFormat = useCallback(() => {
    if (!careerPathConfig) return;

    const newPositions: Record<string, { x: number; y: number }> = {};
    
    newPositions["systems-root"] = { x: 0, y: 40 };
    
    const tierSpacing = 600;
    const tierStartX = -((careerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;
    
    const getTierNumber = (tierId: string): number => {
      if (tierId === 'tier-1-5') return 1.5;
      if (tierId === 'tier-2-5') return 2.5;
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    careerPathConfig.categories.forEach((category, index) => {
      const tierNodeId = category.id;
      const tierX = tierStartX + index * tierSpacing;
      newPositions[tierNodeId] = { x: tierX, y: tierY };
      
      if (expandedTiers.has(tierNodeId)) {
        const tierNumber = getTierNumber(tierNodeId);
        const tierCourses = careerPathConfig.courses.filter(
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
          
          newPositions[`course-${course.id}`] = { x: courseX, y: courseY };
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
            reactFlowInstance.current.fitView({ padding: 0.15, maxZoom: 1.2 });
          }
        });
      });
    });
  }, [careerPathConfig, expandedTiers, toggleTier]);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedCourse) {
        handleCloseCourseCard();
      }
    };

    if (selectedCourse) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedCourse, handleCloseCourseCard]);

  if (isLoading) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center border border-border/40 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading career path...</p>
        </div>
      </div>
    );
  }

  if (error || !careerPathConfig) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center border border-border/40 rounded-lg">
        <div className="text-center">
          <p className="text-red-500 mb-2">⚠️ {error || 'Failed to load career path'}</p>
          <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
      <div className="w-full h-[800px] relative [&_.react-flow__background]:opacity-30">
        <ReactFlowProvider>
          <ReactFlow
            nodes={displayNodes}
            edges={displayEdges}
            onNodesChange={onNodesChange}
            onNodeDragStart={onNodeDragStart}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={onNodeClick}
            onInit={onInit}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.1, maxZoom: 1.5 }}
            minZoom={0.1}
            maxZoom={2}
            defaultEdgeOptions={{
              type: "smoothstep",
              animated: false,
            }}
          >
            <Background color="#e2e8f0" gap={16} />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      
      {/* Course Detail Card Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseCourseCard}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selectedCourse.code}
                  </h3>
                  <p className="text-lg text-slate-700 mt-1">
                    {selectedCourse.name}
                  </p>
                </div>
                <button
                  onClick={handleCloseCourseCard}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Description
                  </h4>
                  <p className="text-slate-700">{selectedCourse.description}</p>
                </div>
                {selectedCourse.expandedInfo?.credits && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Credits
                    </h4>
                    <p className="text-slate-700">{selectedCourse.expandedInfo.credits} units</p>
                  </div>
                )}

                {selectedCourse.expandedInfo?.prerequisites && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Prerequisites
                    </h4>
                    <p className="text-slate-700">
                      {selectedCourse.expandedInfo.prerequisites}
                    </p>
                  </div>
                )}

                {selectedCourse.expandedInfo?.careerRelevance && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Career Relevance
                    </h4>
                    <p className="text-slate-700">
                      {selectedCourse.expandedInfo.careerRelevance}
                    </p>
                  </div>
                )}

                {selectedCourse.expandedInfo?.realWorldApplications && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Real-World Applications
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {selectedCourse.expandedInfo.realWorldApplications.map(
                        (application, index) => (
                          <li key={index}>{application}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {selectedCourse.expandedInfo?.learningOutcomes && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Learning Outcomes
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {selectedCourse.expandedInfo.learningOutcomes.map(
                        (outcome, index) => (
                          <li key={index}>{outcome}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {selectedCourse.expandedInfo?.topics && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Key Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.expandedInfo.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCourse.expandedInfo?.resources && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Resources
                    </h4>
                    <div className="space-y-3">
                      {selectedCourse.expandedInfo.resources.videos && selectedCourse.expandedInfo.resources.videos.length > 0 && (
                        <div>
                          <h5 className="font-medium text-slate-800 mb-1">📹 Videos</h5>
                          <ul className="space-y-1">
                            {selectedCourse.expandedInfo.resources.videos.map((video, index) => (
                              <li key={index}>
                                <a
                                  href={video}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                                >
                                  {video}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedCourse.expandedInfo.resources.websites && selectedCourse.expandedInfo.resources.websites.length > 0 && (
                        <div>
                          <h5 className="font-medium text-slate-800 mb-1">🌐 Websites</h5>
                          <ul className="space-y-1">
                            {selectedCourse.expandedInfo.resources.websites.map((website, index) => (
                              <li key={index}>
                                <a
                                  href={website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                                >
                                  {website}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedCourse.expandedInfo.resources.tools && selectedCourse.expandedInfo.resources.tools.length > 0 && (
                        <div>
                          <h5 className="font-medium text-slate-800 mb-1">🛠️ Tools</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourse.expandedInfo.resources.tools.map((tool, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedCourse.expandedInfo?.additionalNotes && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Additional Information
                    </h4>
                    <p className="text-slate-700">
                      {selectedCourse.expandedInfo.additionalNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseCourseCard}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 py-2 bg-muted/20 border-t border-border/40">
        <p className="text-xs text-black text-center">
          Career path graph for Systems / Infrastructure Engineering
        </p>
      </div>
    </div>
  );
}

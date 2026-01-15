"use client";

/**
 * CareerPathGraph Component - Electric Vehicle & Automotive Systems
 * Interactive React Flow graph visualization for EV & Automotive Systems career path
 * 
 * Uses static career path configuration from local data files
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
import { evAutomotiveCareerPathConfig } from "../data/careerPathConfig";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

// Custom root node component for EV & Automotive Systems career path
function EVAutomotiveRootNode({ data }: { data: { label: string } }) {
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
      <div className="text-[8.75px] font-semibold text-primary text-center px-2 flex flex-col items-center gap-0.5">
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
    <div 
      className="min-w-[180px] max-w-[200px] rounded-lg border-2 border-slate-300 bg-white shadow-sm hover:shadow-md transition-shadow px-3 py-2 relative cursor-pointer"
    >
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
  root: EVAutomotiveRootNode,
  tier: TierNode,
  course: CourseNode,
};

export default function CareerPathGraph({ onResetReady, onFormatReady }: CareerPathGraphProps) {
  const careerPathConfig = evAutomotiveCareerPathConfig;
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  const [isFormatted, setIsFormatted] = useState(false);
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

  // Handle course click - expand course card
  const handleCourseClick = useCallback((course: TierCourse) => {
    setSelectedCourse(course);
  }, []);

  // Handle node click from React Flow
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.type === "course" && node.data?.course) {
      handleCourseClick(node.data.course);
    }
  }, [handleCourseClick]);

  // Handle closing expanded course card
  const handleCloseCourseCard = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  // Create nodes and edges dynamically based on expanded state
  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    // Create root node
    const rootNode: Node = {
      id: "ev-automotive-root",
      type: "root",
      data: { label: careerPathConfig.rootLabel },
      position: nodePositions["ev-automotive-root"] || { x: 0, y: 40 },
    };

    // Create tier nodes
    const tierSpacing = isFormatted ? 600 : 400;
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
      id: `ev-automotive-root-${tierNode.id}`,
      source: "ev-automotive-root",
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
        const tierCourses = careerPathConfig.courses.filter(
          (course) => course.tier === tierNumber
        );

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
  }, [careerPathConfig, expandedTiers, nodePositions, toggleTier, isFormatted]);

  // Handle node drag start
  const onNodeDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  // Handle node drag stop
  const onNodeDragStop = useCallback((_event: React.MouseEvent, node: Node) => {
    setIsDragging(false);
    setNodePositions((prev) => ({
      ...prev,
      [node.id]: node.position,
    }));
  }, []);

  // Handle node changes
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

  // Sync nodesState and edgesState
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

  // Handle React Flow instance initialization
  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  // Reset function
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

  // Format function
  const handleFormat = useCallback(() => {
    const newPositions: Record<string, { x: number; y: number }> = {};
    
    newPositions["ev-automotive-root"] = { x: 0, y: 40 };
    
    const tierSpacing = 600;
    const tierStartX = -((careerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;
    
    const getTierNumber = (tierId: string): number => {
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
              id: "ev-automotive-root",
              type: "root",
              data: { label: careerPathConfig.rootLabel },
              position: newPositions["ev-automotive-root"],
            };
            
            const tierNodes: Node[] = careerPathConfig.categories.map((category) => ({
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
                const tierCourses = careerPathConfig.courses.filter(
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
  }, [careerPathConfig, expandedTiers, toggleTier]);

  // Expose reset handler to parent
  useEffect(() => {
    if (!onResetReady) return;
    const rafId = requestAnimationFrame(() => {
      onResetReady(handleReset);
    });
    return () => cancelAnimationFrame(rafId);
  }, [onResetReady, handleReset]);

  // Expose format handler to parent
  useEffect(() => {
    if (!onFormatReady) return;
    const rafId = requestAnimationFrame(() => {
      onFormatReady(handleFormat);
    });
    return () => cancelAnimationFrame(rafId);
  }, [onFormatReady, handleFormat]);

  // Handle ESC key to close course card
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
            onNodeClick={onNodeClick}
            onInit={onInit}
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
      
      {/* Expanded Course Card Overlay */}
      {selectedCourse && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseCourseCard}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseCourseCard}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900"
              aria-label="Close course details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6">
              <div className="pr-10 mb-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedCourse.code}</h2>
                <h3 className="text-xl text-slate-700 mb-2">{selectedCourse.name}</h3>
                <p className="text-sm text-slate-600">{selectedCourse.fullName}</p>
              </div>

              {selectedCourse.description && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2 uppercase tracking-wide">Description</h4>
                  <p className="text-slate-700">{selectedCourse.description}</p>
                </div>
              )}

              {selectedCourse.expandedInfo && (
                <div className="space-y-6 border-t border-slate-200 pt-6">
                  {selectedCourse.expandedInfo.credits && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Credits</h4>
                      <p className="text-slate-700">{selectedCourse.expandedInfo.credits} credits</p>
                    </div>
                  )}

                  {selectedCourse.expandedInfo.prerequisites && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Prerequisites</h4>
                      <p className="text-slate-700">{selectedCourse.expandedInfo.prerequisites}</p>
                    </div>
                  )}

                  {selectedCourse.expandedInfo.learningOutcomes && selectedCourse.expandedInfo.learningOutcomes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Learning Outcomes</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {selectedCourse.expandedInfo.learningOutcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCourse.expandedInfo.topics && selectedCourse.expandedInfo.topics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Topics Covered</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {selectedCourse.expandedInfo.topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCourse.expandedInfo.careerRelevance && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Career Relevance</h4>
                      <p className="text-slate-700">{selectedCourse.expandedInfo.careerRelevance}</p>
                    </div>
                  )}

                  {selectedCourse.expandedInfo.realWorldApplications && selectedCourse.expandedInfo.realWorldApplications.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Real World Applications</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {selectedCourse.expandedInfo.realWorldApplications.map((application, index) => (
                          <li key={index}>{application}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCourse.expandedInfo.resources && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Resources</h4>
                      <div className="space-y-3">
                        {selectedCourse.expandedInfo.resources.videos && selectedCourse.expandedInfo.resources.videos.length > 0 && (
                          <div>
                            <h5 className="text-xs font-semibold text-slate-700 mb-1">Videos</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {selectedCourse.expandedInfo.resources.videos.map((video, index) => (
                                <li key={index}>
                                  <a href={video} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                                    {video}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {selectedCourse.expandedInfo.resources.websites && selectedCourse.expandedInfo.resources.websites.length > 0 && (
                          <div>
                            <h5 className="text-xs font-semibold text-slate-700 mb-1">Websites</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {selectedCourse.expandedInfo.resources.websites.map((website, index) => (
                                <li key={index}>
                                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                                    {website}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {selectedCourse.expandedInfo.resources.tools && selectedCourse.expandedInfo.resources.tools.length > 0 && (
                          <div>
                            <h5 className="text-xs font-semibold text-slate-700 mb-1">Tools</h5>
                            <ul className="list-disc list-inside space-y-1 text-slate-700">
                              {selectedCourse.expandedInfo.resources.tools.map((tool, index) => (
                                <li key={index}>{tool}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedCourse.expandedInfo.additionalNotes && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Additional Information</h4>
                      <p className="text-slate-700">{selectedCourse.expandedInfo.additionalNotes}</p>
                    </div>
                  )}
                </div>
              )}

              {!selectedCourse.expandedInfo && (
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-slate-500 italic">
                    Additional course information will be displayed here when available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 py-2 bg-muted/20 border-t border-border/40">
        <p className="text-xs text-black text-center">
          Career path graph for Electric Vehicle & Automotive Systems
        </p>
      </div>
    </div>
  );
}

"use client";

/**
 * Enhanced CareerPathGraph Component
 * Modern, interactive React Flow graph with glassmorphism, animations, and auto-layout
 * Features:
 * - Glassmorphism nodes with backdrop blur
 * - Animated flowing edges
 * - ELK auto-layout algorithm
 * - Interactive minimap
 * - Radix UI tooltips and dialogs
 * - Smooth Framer Motion animations
 */

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
  NodeChange,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";

import { TierCourse } from "@/types/careerPath";
import { sweCareerPathConfig } from "../data/careerPathConfig";
import { 
  GlassmorphismRootNode, 
  GlassmorphismTierNode, 
  GlassmorphismCourseNode 
} from "@/components/GlassmorphismNodes";
import { AnimatedFlowEdge } from "@/components/AnimatedEdge";
import { applyElkLayout } from "@/lib/elkLayout";

interface CareerPathGraphProps {
  onResetReady?: (resetFn: () => void) => void;
  onFormatReady?: (formatFn: () => void) => void;
}

// Define node and edge types for the enhanced graph
const nodeTypes = {
  root: GlassmorphismRootNode,
  tier: GlassmorphismTierNode,
  course: GlassmorphismCourseNode,
};

const edgeTypes = {
  animated: AnimatedFlowEdge,
};

export default function CareerPathGraph({ onResetReady, onFormatReady }: CareerPathGraphProps) {
  const careerPathConfig = sweCareerPathConfig;
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [nodesState, setNodesState] = useState<Node[]>([]);
  const [edgesState, setEdgesState] = useState<Edge[]>([]);
  const [isFormatted, setIsFormatted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TierCourse | null>(null);
  const [isAutoLayoutting, setIsAutoLayoutting] = useState(false);
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

  // Handle course click - open dialog
  const handleCourseClick = useCallback((course: TierCourse) => {
    setSelectedCourse(course);
  }, []);

  // Handle closing course dialog
  const handleCloseCourseCard = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  // Handle node click from React Flow
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.type === "course" && node.data?.course) {
      handleCourseClick(node.data.course);
    }
  }, [handleCourseClick]);

  // Apply ELK auto-layout
  const handleAutoLayout = useCallback(async () => {
    if (!reactFlowInstance.current) return;
    
    setIsAutoLayoutting(true);
    
    try {
      const currentNodes = reactFlowInstance.current.getNodes();
      const currentEdges = reactFlowInstance.current.getEdges();
      
      const { nodes: layoutedNodes } = await applyElkLayout(currentNodes, currentEdges, {
        direction: 'DOWN',
        nodeSpacing: 120,
        layerSpacing: 200,
      });
      
      // Update node positions
      const newPositions: Record<string, { x: number; y: number }> = {};
      layoutedNodes.forEach(node => {
        newPositions[node.id] = node.position;
      });
      
      setNodePositions(newPositions);
      reactFlowInstance.current.setNodes(layoutedNodes);
      
      // Fit view after layout
      setTimeout(() => {
        reactFlowInstance.current?.fitView({ padding: 0.2, duration: 800 });
      }, 100);
    } catch (error) {
      console.error('Auto-layout failed:', error);
    } finally {
      setIsAutoLayoutting(false);
    }
  }, []);

  // Create nodes and edges with glassmorphism styling
  const { nodes: graphNodes, edges: graphEdges } = useMemo(() => {
    // Create root node
    const rootNode: Node = {
      id: "swe-root",
      type: "root",
      data: { label: careerPathConfig.rootLabel },
      position: nodePositions["swe-root"] || { x: 0, y: 40 },
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

    // Create edges from root to tiers with animation
    const tierEdges: Edge[] = tierNodes.map((tierNode) => ({
      id: `swe-root-${tierNode.id}`,
      source: "swe-root",
      target: tierNode.id,
      type: "animated",
      animated: false,
      data: { type: 'root' },
    }));

    // Helper function to get tier number
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

        const coursesPerRow = 2; // Keep it at 2 to avoid overlaps
        const courseSpacing = isFormatted ? 350 : 300; // Increased spacing
        const rowSpacing = isFormatted ? 160 : 140; // Increased row spacing
        const courseStartY = tierNode.position.y + 180;
        
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
            data: { 
              course,
              onClick: handleCourseClick,
            },
            position: nodePositions[courseNodeId] || {
              x: courseX,
              y: courseY,
            },
          });

          // Create animated edge from tier to course
          courseEdges.push({
            id: `${tierNode.id}-${courseNodeId}`,
            source: tierNode.id,
            target: courseNodeId,
            type: "animated",
            animated: false,
            data: { type: 'tier' },
          });
        });
      }
    });

    return {
      nodes: [rootNode, ...tierNodes, ...courseNodes],
      edges: [...tierEdges, ...courseEdges],
    };
  }, [careerPathConfig, expandedTiers, nodePositions, toggleTier, isFormatted, handleCourseClick]);

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
    // Close any open course card
    setSelectedCourse(null);
    
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
    newPositions["swe-root"] = { x: 0, y: 40 };
    
    // Tier nodes positioning - INCREASED spacing to prevent overlap
    const tierSpacing = 600; // Increased from 400 to spread tiers further apart
    const tierStartX = -((careerPathConfig.categories.length - 1) * tierSpacing) / 2;
    const tierY = 220;
    
    // Helper function to get tier number from tier ID
    const getTierNumber = (tierId: string): number => {
      const match = tierId.match(/tier-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    careerPathConfig.categories.forEach((category, index) => {
      const tierNodeId = category.id;
      const tierX = tierStartX + index * tierSpacing;
      newPositions[tierNodeId] = { x: tierX, y: tierY };
      
      // If tier is expanded, recalculate course positions with INCREASED spacing
      if (expandedTiers.has(tierNodeId)) {
        const tierNumber = getTierNumber(tierNodeId);
        const tierCourses = careerPathConfig.courses.filter(
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
              id: "swe-root",
              type: "root",
              data: { label: careerPathConfig.rootLabel },
              position: newPositions["swe-root"],
            };
            
            const tierNodes: Node[] = careerPathConfig.categories.map((category, index) => ({
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
  }, [careerPathConfig, expandedTiers, toggleTier]);

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
    <Tooltip.Provider>
      <div className="w-full border border-border/40 rounded-2xl overflow-hidden relative shadow-xl bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Enhanced toolbar */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Tooltip.Root delayDuration={300}>
            <Tooltip.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAutoLayout}
                disabled={isAutoLayoutting}
                className="px-4 py-2 bg-white/80 backdrop-blur-md hover:bg-white border border-slate-200 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium text-slate-700 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {isAutoLayoutting ? 'Layouting...' : 'Auto Layout'}
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs shadow-xl border border-white/10 z-50"
                sideOffset={5}
              >
                Apply ELK automatic layout
                <Tooltip.Arrow className="fill-slate-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root delayDuration={300}>
            <Tooltip.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-4 py-2 bg-white/80 backdrop-blur-md hover:bg-white border border-slate-200 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs shadow-xl border border-white/10 z-50"
                sideOffset={5}
              >
                Reset graph to initial state
                <Tooltip.Arrow className="fill-slate-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>

        <div className="w-full h-[900px] relative">
          <ReactFlowProvider>
            <ReactFlow
              nodes={displayNodes}
              edges={displayEdges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={onNodesChange}
              onNodeDragStart={onNodeDragStart}
              onNodeDragStop={onNodeDragStop}
              onNodeClick={onNodeClick}
              onInit={onInit}
              nodesDraggable={true}
              fitView={!isDragging}
              fitViewOptions={{ padding: 0.15, maxZoom: 1.2 }}
              attributionPosition="bottom-left"
              minZoom={0.1}
              maxZoom={2}
            >
              <Background 
                variant={"dots" as any} 
                color="#cbd5e1" 
                gap={20}
                size={1}
                className="opacity-40"
              />
              <Controls 
                className="!bg-white/80 !backdrop-blur-md !border-slate-200 !shadow-lg !rounded-xl"
                showInteractive={false}
              />
              <MiniMap
                className="!bg-white/80 !backdrop-blur-md !border-2 !border-slate-200 !shadow-lg !rounded-xl"
                nodeColor={(node) => {
                  if (node.type === 'root') return '#818cf8';
                  if (node.type === 'tier') return '#34d399';
                  return '#60a5fa';
                }}
                maskColor="rgb(240, 240, 255, 0.6)"
                nodeStrokeWidth={3}
                pannable
                zoomable
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
        
        {/* Course Detail Modal with proper centering */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={handleCloseCourseCard}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {selectedCourse.code} - {selectedCourse.name}
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCloseCourseCard}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
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
                    </motion.button>
                  </div>

                        <div className="space-y-6">
                          {/* Description */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100"
                          >
                            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                              <span className="text-blue-600">📖</span>
                              Description
                            </h4>
                            <p className="text-slate-700 leading-relaxed">{selectedCourse.description}</p>
                          </motion.div>

                          {/* Credits */}
                          {selectedCourse.expandedInfo?.credits && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="text-emerald-600">💳</span>
                                Credits
                              </h4>
                              <p className="text-slate-700">{selectedCourse.expandedInfo.credits} units</p>
                            </motion.div>
                          )}

                          {/* Prerequisites */}
                          {selectedCourse.expandedInfo?.prerequisites && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="text-amber-600">🔗</span>
                                Prerequisites
                              </h4>
                              <p className="text-slate-700">{selectedCourse.expandedInfo.prerequisites}</p>
                            </motion.div>
                          )}

                          {/* Learning Outcomes */}
                          {selectedCourse.expandedInfo?.learningOutcomes && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.25 }}
                            >
                              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-purple-600">🎯</span>
                                Learning Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {selectedCourse.expandedInfo.learningOutcomes.map((outcome, index) => (
                                  <li key={index} className="flex items-start gap-2 text-slate-700">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}

                          {/* Key Topics */}
                          {selectedCourse.expandedInfo?.topics && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-indigo-600">🔑</span>
                                Key Topics
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedCourse.expandedInfo.topics.map((topic, index) => (
                                  <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200"
                                  >
                                    {topic}
                                  </motion.span>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* Career Relevance */}
                          {selectedCourse.expandedInfo?.careerRelevance && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.35 }}
                              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100"
                            >
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="text-emerald-600">💼</span>
                                Career Relevance
                              </h4>
                              <p className="text-slate-700 leading-relaxed">{selectedCourse.expandedInfo.careerRelevance}</p>
                            </motion.div>
                          )}

                          {/* Real-World Applications */}
                          {selectedCourse.expandedInfo?.realWorldApplications && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-blue-600">🌍</span>
                                Real-World Applications
                              </h4>
                              <ul className="space-y-2">
                                {selectedCourse.expandedInfo.realWorldApplications.map((application, index) => (
                                  <li key={index} className="flex items-start gap-2 text-slate-700">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>{application}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}

                          {/* Resources */}
                          {selectedCourse.expandedInfo?.resources && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.45 }}
                            >
                              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-orange-600">📚</span>
                                Resources
                              </h4>
                              <div className="space-y-4">
                                {selectedCourse.expandedInfo.resources.videos && selectedCourse.expandedInfo.resources.videos.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                      <span>📹</span> Videos
                                    </h5>
                                    <ul className="space-y-1">
                                      {selectedCourse.expandedInfo.resources.videos.map((video, index) => (
                                        <li key={index}>
                                          <a
                                            href={video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline text-sm break-all inline-flex items-center gap-1"
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
                                    <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                      <span>🌐</span> Websites
                                    </h5>
                                    <ul className="space-y-1">
                                      {selectedCourse.expandedInfo.resources.websites.map((website, index) => (
                                        <li key={index}>
                                          <a
                                            href={website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline text-sm break-all inline-flex items-center gap-1"
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
                                    <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                      <span>🛠️</span> Tools
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedCourse.expandedInfo.resources.tools.map((tool, index) => (
                                        <span
                                          key={index}
                                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                                        >
                                          {tool}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}

                          {/* Additional Notes */}
                          {selectedCourse.expandedInfo?.additionalNotes && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                              className="bg-amber-50 rounded-xl p-4 border border-amber-200"
                            >
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="text-amber-600">📝</span>
                                Additional Information
                              </h4>
                              <p className="text-slate-700 leading-relaxed">{selectedCourse.expandedInfo.additionalNotes}</p>
                            </motion.div>
                          )}
                        </div>

                  {/* Footer with action button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="mt-8 flex justify-end"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCloseCourseCard}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Got it, thanks!
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="w-full px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-t border-slate-200">
          <p className="text-xs text-slate-600 text-center font-medium">
            Interactive Career Path Graph • SWE (Software Engineering) • Drag nodes, click for details, use Auto Layout for optimization
          </p>
        </div>
      </div>
    </Tooltip.Provider>
  );
}


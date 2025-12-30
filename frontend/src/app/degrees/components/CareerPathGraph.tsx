"use client";

/**
 * CareerPathGraph Component
 * Generic, reusable career path visualization using React Flow
 * Used on: All career path pages (SWE, Cybersecurity, ML/AI, etc.)
 * 
 * This component is config-driven - it accepts a CareerPathConfig object
 * that defines the structure, categories, and courses for any career path.
 */

import { useMemo, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ReactFlowProvider,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { CareerPathConfig, TierCourse } from "@/types/careerPath";

// Custom root node component for career path
function RootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-base font-bold text-primary text-center px-2">
        {data.label}
      </div>
    </div>
  );
}

// Custom category node component - circular shape
function CategoryNode({ data }: { data: { label: string; isExpanded?: boolean; onToggle?: () => void } }) {
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
      <div className="text-xs font-semibold text-primary text-center px-2 leading-tight">
        {data.label}
      </div>
    </div>
  );
}

// Custom expandable course node component
function ExpandableCourseNode({ 
  data 
}: { 
  data: { 
    course: TierCourse; 
    isExpanded?: boolean; 
    onToggle?: () => void;
  } 
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onToggle) {
      data.onToggle();
    }
  };

  const isExpanded = data.isExpanded || false;

  return (
    <div
      className={`rounded-lg border-2 border-primary/50 bg-card shadow-md relative cursor-pointer transition-all ${
        isExpanded 
          ? "min-w-[300px] max-w-[400px] border-primary border-solid" 
          : "min-w-[150px] max-w-[190px] border-dashed"
      }`}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      
      <div className={`${isExpanded ? "p-4" : "p-3"}`}>
        {/* Course Code and Name */}
        <div className="text-sm font-semibold text-foreground text-center mb-2">
          {data.course.fullName}
        </div>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground mb-2">Why It's Critical:</p>
              <p>{data.course.description}</p>
              
              {/* Resources section (future) */}
              {data.course.resources && data.course.resources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="font-medium text-foreground mb-2">Resources:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {data.course.resources.map((resource, idx) => (
                      <li key={idx} className="text-xs">{resource}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const nodeTypes = {
  root: RootNode,
  category: CategoryNode,
  course: ExpandableCourseNode,
};

// Layout function - position root at top, categories below, courses in hierarchy
function getLayoutedElements(nodes: Node[], edges: Edge[], useFormattedLayout: boolean = false) {
  const rootNode = nodes.find((n) => n.id === "career-path-root");
  const categoryNodes = nodes.filter((n) => n.id.startsWith("category-"));
  const courseNodes = nodes.filter((n) => !n.id.startsWith("category-") && n.id !== "career-path-root");
  
  if (rootNode) {
    rootNode.targetPosition = "top" as any;
    rootNode.sourcePosition = "bottom" as any;
    rootNode.position = { x: 0, y: 40 };
  }

  // Position category nodes in a row below root
  const categorySpacing = useFormattedLayout ? 400 : 320;
  const categoryStartX = -((categoryNodes.length - 1) * categorySpacing) / 2;
  categoryNodes.forEach((node, index) => {
    node.targetPosition = "top" as any;
    node.sourcePosition = "bottom" as any;
    node.position = {
      x: categoryStartX + index * categorySpacing,
      y: 160,
    };
  });

  // Position course nodes below their category
  const verticalSpacing = 140;
  const horizontalSpacing = useFormattedLayout ? 200 : 220;
  let currentY = 320; // Increased from 280 to add more space below tier nodes

  // Group courses by category
  const coursesByCategory: Record<string, Node[]> = {};
  courseNodes.forEach((node) => {
    const categoryId = node.data?.categoryId || "unknown";
    if (!coursesByCategory[categoryId]) {
      coursesByCategory[categoryId] = [];
    }
    coursesByCategory[categoryId].push(node);
  });

  // Position courses for each category
  Object.entries(coursesByCategory).forEach(([categoryId, courses]) => {
    const categoryNode = categoryNodes.find((n) => n.id === categoryId);
    if (!categoryNode || courses.length === 0) return;

    const categoryX = categoryNode.position.x;
    const courseCount = courses.length;
    const startX = categoryX - ((courseCount - 1) * horizontalSpacing) / 2;

    courses.forEach((courseNode, index) => {
      const isExpanded = courseNode.data?.isExpanded || false;
      // Adjust spacing for expanded nodes
      const nodeSpacing = isExpanded ? horizontalSpacing * 1.5 : horizontalSpacing;
      
      courseNode.targetPosition = "top" as any;
      courseNode.sourcePosition = "bottom" as any;
      courseNode.position = {
        x: startX + index * nodeSpacing,
        y: currentY,
      };
    });

    currentY += verticalSpacing;
  });
  
  return { nodes, edges };
}

interface CareerPathGraphProps {
  config: CareerPathConfig;
  onLayoutChange?: (useFormatted: boolean) => void;
  useFormattedLayoutExternal?: boolean;
}

export default function CareerPathGraph({ 
  config, 
  onLayoutChange, 
  useFormattedLayoutExternal 
}: CareerPathGraphProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [useFormattedLayoutInternal, setUseFormattedLayoutInternal] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const useFormattedLayout = useFormattedLayoutExternal !== undefined ? useFormattedLayoutExternal : useFormattedLayoutInternal;
  
  const setUseFormattedLayout = (value: boolean) => {
    if (onLayoutChange) {
      onLayoutChange(value);
    } else {
      setUseFormattedLayoutInternal(value);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const { nodes, edges } = useMemo(() => {
    // Create root node from config
    const rootNode: Node = {
      id: "career-path-root",
      type: "root",
      data: { label: config.rootLabel },
      position: { x: 0, y: 0 },
    };

    // Create category nodes from config
    const categoryNodes: Node[] = config.categories.map((category) => {
      const categoryId = `category-${category.id}`;
      const label = category.emoji ? `${category.emoji} ${category.label}` : category.label;
      return {
        id: categoryId,
        type: "category",
        data: { 
          label,
          isExpanded: expandedCategories.has(categoryId),
          onToggle: () => toggleCategory(categoryId),
        },
        position: { x: 0, y: 0 },
      };
    });

    // Create edges from root to each category
    const categoryEdges: Edge[] = categoryNodes.map((catNode) => ({
      id: `root-${catNode.id}`,
      source: "career-path-root",
      target: catNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    // Create course nodes when categories are expanded
    const courseNodes: Node[] = [];
    const courseEdges: Edge[] = [];

    config.categories.forEach((category) => {
      const categoryId = `category-${category.id}`;
      const isCategoryExpanded = expandedCategories.has(categoryId);
      
      if (isCategoryExpanded) {
        // Extract tier number from category id (e.g., "tier-1" -> 1)
        const tierMatch = category.id.match(/tier-(\d+)/);
        const tierNumber = tierMatch ? parseInt(tierMatch[1]) : null;
        
        // Filter courses for this tier
        const categoryCourses = tierNumber 
          ? config.courses.filter((course) => course.tier === tierNumber)
          : [];

        categoryCourses.forEach((course) => {
          courseNodes.push({
            id: course.id,
            type: "course",
            data: { 
              course,
              isExpanded: expandedCourses.has(course.id),
              onToggle: () => toggleCourse(course.id),
              categoryId,
            },
            position: { x: 0, y: 0 },
          });

          // Create edge from category to course
          courseEdges.push({
            id: `${categoryId}-${course.id}`,
            source: categoryId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        });
      }
    });

    // Combine all nodes
    const allNodes = [rootNode, ...categoryNodes, ...courseNodes];
    const allEdges = [...categoryEdges, ...courseEdges];

    // Apply layout
    return getLayoutedElements(allNodes, allEdges, useFormattedLayout);
  }, [config, expandedCategories, expandedCourses, useFormattedLayout]);

  return (
    <div className="w-full border border-border/40 rounded-lg overflow-hidden relative pt-6">
      <div className="w-full h-[800px] relative [&_.react-flow__background]:opacity-30">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#e2e8f0" gap={16} />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div className="w-full px-4 py-2 bg-muted/20 border-t border-border/40">
        <p className="text-xs text-black text-center">
          Career path visualization showing recommended courses and progression.
        </p>
      </div>
    </div>
  );
}


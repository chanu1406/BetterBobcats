"use client";

import React, { useState, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

/**
 * PrerequisiteGraph Component for Data Science and Analytics
 * Interactive graph visualization of degree requirements
 * Shows category nodes: Math, Writing, Spark, Data Science & Analytics
 */

export default function PrerequisiteGraph() {
  const reactFlowWrapper = useRef<any>(null);
  
  // Start collapsed - only parent node visible, subjects expand on click
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Year-based color system (same palette as other degrees)
  const yearStyles: Record<1 | 2 | 3 | 4, React.CSSProperties> = {
    1: {
      border: "2px solid rgba(59,130,246,0.35)",
      background: "rgba(59,130,246,0.12)",
      color: "#0f172a",
      borderRadius: 10,
      fontSize: "11px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
    2: {
      border: "2px solid rgba(34,197,94,0.35)",
      background: "rgba(34,197,94,0.12)",
      color: "#0f172a",
      borderRadius: 10,
      fontSize: "11px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
    3: {
      border: "2px solid rgba(245,158,11,0.35)",
      background: "rgba(245,158,11,0.12)",
      color: "#0f172a",
      borderRadius: 10,
      fontSize: "11px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
    4: {
      border: "2px solid rgba(168,85,247,0.35)",
      background: "rgba(168,85,247,0.12)",
      color: "#0f172a",
      borderRadius: 10,
      fontSize: "11px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
  };

  const courseStyle = (year: 1 | 2 | 3 | 4, minWidth: number): React.CSSProperties => ({
    minWidth,
    ...yearStyles[year],
  });

  // Root node position
  const rootX = 450;
  const rootY = 150;
  
  // Category circular layout around root (positioned at angles from root)
  const categoryDistance = 200;
  const categoryY = rootY + categoryDistance;
  const courseOffsetY = 160;

  // Root node - Data Science and Analytics
  const rootNode: Node = {
    id: "root",
    type: "default",
    data: { label: "Data Science\n& Analytics" },
    position: { x: rootX, y: rootY },
    style: {
      width: 96,
      height: 96,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontSize: "12px",
      fontWeight: "700",
      border: "3px solid hsl(var(--primary))",
      background: "white",
      whiteSpace: "pre-line",
      color: "hsl(var(--primary))",
    },
  };

  // Category nodes arranged in a circle around root
  const categoryNodes: Node[] = [
    {
      id: "math",
      type: "default",
      data: { label: "Math" },
      position: { x: rootX - 280, y: categoryY },
      style: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "600",
        border: expandedCategories.has("math") ? "2px solid hsl(var(--primary))" : "2px dashed hsl(var(--primary))",
        background: "white",
        color: "hsl(var(--primary))",
        cursor: "pointer",
      },
    },
    {
      id: "writing",
      type: "default",
      data: { label: "Writing" },
      position: { x: rootX + 280, y: rootY - 250 },
      style: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "600",
        border: expandedCategories.has("writing") ? "2px solid hsl(var(--primary))" : "2px dashed hsl(var(--primary))",
        background: "white",
        color: "hsl(var(--primary))",
        cursor: "pointer",
      },
    },
    {
      id: "spark",
      type: "default",
      data: { label: "Spark" },
      position: { x: rootX - 100, y: rootY - 280 },
      style: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "600",
        border: expandedCategories.has("spark") ? "2px solid hsl(var(--primary))" : "2px dashed hsl(var(--primary))",
        background: "white",
        color: "hsl(var(--primary))",
        cursor: "pointer",
      },
    },
    {
      id: "data-science",
      type: "default",
      data: { label: "Data Science\n& Analytics" },
      position: { x: rootX + 100, y: rootY - 280 },
      style: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "11px",
        fontWeight: "600",
        border: expandedCategories.has("data-science") ? "2px solid hsl(var(--primary))" : "2px dashed hsl(var(--primary))",
        background: "white",
        color: "hsl(var(--primary))",
        cursor: "pointer",
        whiteSpace: "pre-line",
      },
    },
    {
      id: "ethics",
      type: "default",
      data: { label: "Ethics" },
      position: { x: rootX + 280, y: categoryY },
      style: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "600",
        border: expandedCategories.has("ethics") ? "2px solid hsl(var(--primary))" : "2px dashed hsl(var(--primary))",
        background: "white",
        color: "hsl(var(--primary))",
        cursor: "pointer",
      },
    },
  ];

  // Course nodes for all years - adjusted for circular layout
  const courseNodes: Node[] = [
    // ===== FRESHMAN YEAR (below categories) =====
    // Math courses (below Math category at rootX - 280)
    {
      id: "math-calculus-1",
      type: "default",
      data: { label: "MATH 011/021\nCalculus I" },
      position: { x: rootX - 300, y: categoryY + courseOffsetY },
      style: courseStyle(1, 160),
    },
    {
      id: "math-calculus-2",
      type: "default",
      data: { label: "MATH 012/022\nCalculus II" },
      position: { x: rootX - 220, y: categoryY + courseOffsetY + 120 },
      style: courseStyle(1, 160),
    },

    // Writing courses (below Writing category at rootX + 280, rootY - 250)
    {
      id: "writing-wri-010",
      type: "default",
      data: { label: "WRI 010\nCollege Reading & Composition" },
      position: { x: rootX + 240, y: rootY - 250 + courseOffsetY },
      style: courseStyle(1, 180),
    },

    // Spark courses (below Spark category at rootX - 100, rootY - 280)
    {
      id: "spark-sprk-001",
      type: "default",
      data: { label: "SPRK 001/010\nSpark Seminar" },
      position: { x: rootX - 140, y: rootY - 280 + courseOffsetY },
      style: courseStyle(1, 170),
    },

    // Data Science & Analytics courses (below DS&A category at rootX + 100, rootY - 280)
    {
      id: "dsa-001",
      type: "default",
      data: { label: "DSA 001\nFoundations of Data Science & Analytics" },
      position: { x: rootX + 20, y: rootY - 280 + courseOffsetY },
      style: courseStyle(1, 200),
    },
    {
      id: "dsa-002",
      type: "default",
      data: { label: "DSA 002\nThinking Like a Programmer" },
      position: { x: rootX + 140, y: rootY - 280 + courseOffsetY },
      style: courseStyle(1, 180),
    },

    // Ethics courses (below Ethics category at rootX + 280, categoryY)
    {
      id: "phil-002",
      type: "default",
      data: { label: "PHIL 002/003\nIntro to Ethics" },
      position: { x: rootX + 240, y: categoryY + courseOffsetY },
      style: courseStyle(1, 180),
    },

    // ===== SOPHOMORE YEAR (Y2) =====
    // Math
    {
      id: "econ-010",
      type: "default",
      data: { label: "ECON 010\nStatistical Inference" },
      position: { x: rootX - 300, y: categoryY + courseOffsetY + 500 },
      style: courseStyle(2, 170),
    },

    // Writing
    {
      id: "mist-050",
      type: "default",
      data: { label: "MIST 050/070\nEntrepreneurship / Innovation" },
      position: { x: rootX + 220, y: rootY - 250 + courseOffsetY + 500 },
      style: courseStyle(2, 200),
    },
    {
      id: "language-requirement",
      type: "default",
      data: { label: "Lower Division\nLanguage Requirement" },
      position: { x: rootX + 320, y: rootY - 250 + courseOffsetY + 500 },
      style: courseStyle(2, 190),
    },

    // Data Science & Analytics
    {
      id: "econ-110",
      type: "default",
      data: { label: "ECON 110\nEconometrics" },
      position: { x: rootX + 60, y: rootY - 280 + courseOffsetY + 500 },
      style: courseStyle(2, 170),
    },

    // Ethics
    {
      id: "phil-123",
      type: "default",
      data: { label: "PHIL 123\nTechnology Ethics" },
      position: { x: rootX + 240, y: categoryY + courseOffsetY + 500 },
      style: courseStyle(2, 170),
    },

    // ===== JUNIOR YEAR (Y3) =====
    // Data Science & Analytics
    {
      id: "dsa-101",
      type: "default",
      data: { label: "DSA 101\nMachine Learning & NLP" },
      position: { x: rootX + 20, y: rootY - 280 + courseOffsetY + 700 },
      style: courseStyle(3, 200),
    },
    {
      id: "advanced-methods",
      type: "default",
      data: { label: "Advanced Methods\n(Quantitative)" },
      position: { x: rootX + 140, y: rootY - 280 + courseOffsetY + 700 },
      style: courseStyle(3, 180),
    },
    {
      id: "dsa-102",
      type: "default",
      data: { label: "DSA 102\nInteractive Data Visualization" },
      position: { x: rootX + 20, y: rootY - 280 + courseOffsetY + 850 },
      style: courseStyle(3, 210),
    },
    {
      id: "upper-crossroads",
      type: "default",
      data: { label: "Upper Division\nCrossroads (GenEd)" },
      position: { x: rootX + 140, y: rootY - 280 + courseOffsetY + 850 },
      style: courseStyle(3, 180),
    },

    // ===== SENIOR YEAR (Y4) =====
    // Data Science & Analytics
    {
      id: "dsa-120",
      type: "default",
      data: { label: "DSA 120\nCapstone I" },
      position: { x: rootX - 40, y: rootY - 280 + courseOffsetY + 1050 },
      style: courseStyle(4, 160),
    },
    {
      id: "elective-1",
      type: "default",
      data: { label: "Technical Elective\nEmphasis 1" },
      position: { x: rootX + 60, y: rootY - 280 + courseOffsetY + 1050 },
      style: courseStyle(4, 180),
    },
    {
      id: "elective-2",
      type: "default",
      data: { label: "Technical Elective\nEmphasis 2" },
      position: { x: rootX + 160, y: rootY - 280 + courseOffsetY + 1050 },
      style: courseStyle(4, 180),
    },
    {
      id: "dsa-121",
      type: "default",
      data: { label: "DSA 121\nCapstone II" },
      position: { x: rootX - 40, y: rootY - 280 + courseOffsetY + 1180 },
      style: courseStyle(4, 160),
    },
    {
      id: "elective-3",
      type: "default",
      data: { label: "Technical Elective\nEmphasis 3" },
      position: { x: rootX + 60, y: rootY - 280 + courseOffsetY + 1180 },
      style: courseStyle(4, 180),
    },
    {
      id: "writing-discipline",
      type: "default",
      data: { label: "Writing in the\nDiscipline" },
      position: { x: rootX + 160, y: rootY - 280 + courseOffsetY + 1180 },
      style: courseStyle(4, 170),
    },
  ];

  // Visible courses only when their category is expanded
  const courseCategoryMap: Record<string, string> = {
    // Freshman
    "math-calculus-1": "math",
    "math-calculus-2": "math",
    "writing-wri-010": "writing",
    "spark-sprk-001": "spark",
    "dsa-001": "data-science",
    "dsa-002": "data-science",
    "phil-002": "ethics",
    // Sophomore
    "econ-010": "math",
    "mist-050": "writing",
    "language-requirement": "writing",
    "econ-110": "data-science",
    "phil-123": "ethics",
    // Junior
    "dsa-101": "data-science",
    "advanced-methods": "data-science",
    "dsa-102": "data-science",
    "upper-crossroads": "data-science",
    // Senior
    "dsa-120": "data-science",
    "elective-1": "data-science",
    "elective-2": "data-science",
    "dsa-121": "data-science",
    "elective-3": "data-science",
    "writing-discipline": "writing",
  };

  const visibleCourseNodes = courseNodes.filter((node) => expandedCategories.has(courseCategoryMap[node.id]));
  const initialNodes: Node[] = [rootNode, ...categoryNodes, ...visibleCourseNodes];

  // Edges from root to categories
  const allEdges: Edge[] = [
    {
      id: "root-math",
      source: "root",
      target: "math",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "root-writing",
      source: "root",
      target: "writing",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "root-spark",
      source: "root",
      target: "spark",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "root-data-science",
      source: "root",
      target: "data-science",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "root-ethics",
      source: "root",
      target: "ethics",
      type: "smoothstep",
      animated: false,
    },

    // Math chain
    {
      id: "math-to-calculus-1",
      source: "math",
      target: "math-calculus-1",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "calculus-1-to-2",
      source: "math-calculus-1",
      target: "math-calculus-2",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "calculus-2-to-econ010",
      source: "math-calculus-2",
      target: "econ-010",
      type: "smoothstep",
      animated: false,
    },

    // Writing
    {
      id: "writing-to-wri010",
      source: "writing",
      target: "writing-wri-010",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "writing-wri010-to-mist",
      source: "writing-wri-010",
      target: "mist-050",
      type: "smoothstep",
      animated: false,
    },

    // Spark
    {
      id: "spark-to-sprk",
      source: "spark",
      target: "spark-sprk-001",
      type: "smoothstep",
      animated: false,
    },

    // Ethics
    {
      id: "ethics-to-phil002",
      source: "ethics",
      target: "phil-002",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "ethics-to-phil123",
      source: "ethics",
      target: "phil-123",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "phil-002-to-phil123",
      source: "phil-002",
      target: "phil-123",
      type: "smoothstep",
      animated: false,
    },

    // Data Science & Analytics
    {
      id: "ds-to-dsa001",
      source: "data-science",
      target: "dsa-001",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "dsa001-to-dsa002",
      source: "dsa-001",
      target: "dsa-002",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "dsa-001-to-dsa101",
      source: "dsa-001",
      target: "dsa-101",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "dsa-002-to-dsa102",
      source: "dsa-002",
      target: "dsa-102",
      type: "smoothstep",
      animated: false,
    },

    // Direct connections from Data Science & Analytics to capstones
    {
      id: "ds-to-dsa120",
      source: "data-science",
      target: "dsa-120",
      type: "smoothstep",
      animated: false,
    },
    {
      id: "ds-to-dsa121",
      source: "data-science",
      target: "dsa-121",
      type: "smoothstep",
      animated: false,
    },

    // ===== SOPHOMORE TO JUNIOR PREREQUISITES =====

    // ===== JUNIOR PREREQUISITES =====
    // Advanced Methods (pre-requisite for visualization)
    {
      id: "advanced-methods-to-viz",
      source: "advanced-methods",
      target: "dsa-102",
      type: "smoothstep",
      animated: false,
    },

    // ===== SENIOR PREREQUISITES =====
    // ML & NLP → Capstone I
    {
      id: "dsa101-to-capstone1",
      source: "dsa-101",
      target: "dsa-120",
      type: "smoothstep",
      animated: false,
    },
    // Visualization → Capstone II
    {
      id: "dsa102-to-capstone2",
      source: "dsa-102",
      target: "dsa-121",
      type: "smoothstep",
      animated: false,
    },
    // Capstone I → Capstone II
    {
      id: "capstone1-to-capstone2",
      source: "dsa-120",
      target: "dsa-121",
      type: "smoothstep",
      animated: false,
    },
  ];

  // Only keep edges whose endpoints are visible
  const visibleNodeIds = new Set(initialNodes.map((n) => n.id));
  const initialEdges: Edge[] = allEdges.filter((edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target));

  // Handle category node clicks
  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    if (["math", "writing", "spark", "data-science", "ethics"].includes(node.id)) {
      const newExpanded = new Set(expandedCategories);
      if (newExpanded.has(node.id)) {
        newExpanded.delete(node.id);
      } else {
        newExpanded.add(node.id);
      }
      setExpandedCategories(newExpanded);
    }
  };

  // Format Graph - auto layout the graph
  const handleFormatGraph = () => {
    if (reactFlowWrapper.current) {
      // Fit view to all nodes
      const fitViewOptions = { padding: 0.2, duration: 800 };
      reactFlowWrapper.current?.fitView?.(fitViewOptions);
    }
  };

  // Reset Graph - reset to default viewport and collapse all categories
  const handleResetGraph = () => {
    if (reactFlowWrapper.current) {
      reactFlowWrapper.current?.fitView?.({ padding: 0.2, duration: 800 });
    }
    // Reset expanded categories to empty (all collapsed)
    setExpandedCategories(new Set());
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Buttons Container */}
      <div className="flex gap-3 justify-end pr-4 pt-2">
        <button
          onClick={handleFormatGraph}
          className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Format Graph
        </button>
        <button
          onClick={handleResetGraph}
          className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-colors"
        >
          Reset Graph
        </button>
      </div>

      {/* Graph Container */}
      <div className="w-full h-[1400px] border border-border rounded-lg bg-background relative">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        onNodeClick={onNodeClick}
        fitView
        minZoom={0.3}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background variant={BackgroundVariant.Lines} gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
      </div>
    </div>
  );
}

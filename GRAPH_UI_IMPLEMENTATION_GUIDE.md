# Career Path Graph UI Implementation Guide

This guide provides step-by-step instructions for implementing modern, interactive career path graphs using glassmorphism design, ELK auto-layout, and smooth animations.

---

## 📋 Prerequisites

### Required Dependencies
```bash
npm install elkjs framer-motion
```

### Existing Dependencies (should already be installed)
- `reactflow` - Graph visualization
- `@radix-ui/react-tooltip` - Tooltip components
- `lucide-react` - Icons
- `tailwindcss` - Styling

---

## 📁 File Structure

For each career path, create the following structure:
```
degrees/[major]/careers/[career-name]/
├── components/
│   └── CareerPathGraph.tsx          # Main graph component
└── data/
    ├── careerPathConfig.ts          # Graph configuration
    ├── tierCourses.ts               # Course data with details
    └── index.ts                     # Exports
```

### Shared Components (create once, reuse everywhere)
```
src/
├── components/
│   ├── GlassmorphismNodes.tsx      # Modern node components
│   └── AnimatedEdge.tsx             # Edge components
└── lib/
    └── elkLayout.ts                 # Auto-layout utility
```

---

## 🎨 Step 1: Create Glassmorphism Node Components

**File**: `src/components/GlassmorphismNodes.tsx`

### Root Node Specifications
```typescript
// Dimensions
width: 160px (w-40)
height: 160px (h-40)

// Styling
- Background: Semi-transparent gradient (indigo-500/20 via purple-500/20 to pink-500/20)
- Backdrop: blur-md
- Border: 2px white/30
- Shadow: shadow-2xl
- Glow: Gradient blur effect underneath

// Text
- Color: Solid indigo-900 (NOT gradient - gradients are invisible)
- Size: text-base
- Weight: font-bold
- Alignment: Center with px-4 padding

// Animation
- Initial: scale(0), opacity(0)
- Animate: scale(1), opacity(1)
- Hover: scale(1.05)
- Spring transition: duration 0.5s, stiffness 200
```

### Tier Node Specifications
```typescript
// Dimensions
width: 128px (w-32)
height: 128px (h-32)

// Styling - Collapsed State
- Background: white/40 with backdrop-blur-lg
- Border: 2px dashed slate-300/50
- Shadow: shadow-xl

// Styling - Expanded State
- Background: Gradient (emerald-500/30 via teal-500/30 to cyan-500/30)
- Border: 2px solid emerald-300/50
- Shadow: shadow-emerald-500/30
- Glow: Gradient blur effect

// Text
- Emoji: text-3xl at top
- Label: text-xs, font-bold
- Color: emerald-900 (expanded) or slate-700 (collapsed)

// Animation
- Initial: scale(0), opacity(0)
- Animate: scale(1), opacity(1)
- Hover: scale(1.1), rotate(5deg)
- Tap: scale(0.95)
- Emoji rotation: 360deg when expanded
```

### Course Node Specifications
```typescript
// Dimensions
min-width: 200px
max-width: 220px

// Styling
- Background: white/60 with backdrop-blur-lg
- Border: 2px white/40
- Shadow: shadow-lg (hover: shadow-2xl)
- Corners: rounded-xl
- Padding: px-4 py-3

// Hover Effects
- Scale: 1.05
- Y-offset: -5px
- Background: white/70
- Gradient overlay: Opacity 0 → 100%

// Text Layout
- Course Code: font-bold text-sm text-slate-900
- Course Name: text-xs text-slate-600 line-clamp-2
- Tier Badge: Small pill with tier-specific colors
  - Tier 1: emerald-500/20 background, emerald-700 text
  - Tier 2: amber-500/20 background, amber-700 text
  - Tier 3: orange-500/20 background, orange-700 text

// Animation
- Initial: scale(0), opacity(0), y(20)
- Animate: scale(1), opacity(1), y(0)
- Duration: 0.3s with spring
```

### Tooltip Integration
```typescript
// All nodes should have Radix UI tooltips
- Delay: 200-300ms
- Background: slate-900/95 with backdrop-blur-md
- Text: white, text-sm
- Border: white/10
- Arrow: slate-900 fill
- Max width: max-w-xs or max-w-sm
- Z-index: z-50

// Tooltip Content by Node Type
- Root: Career path description
- Tier: "Click to expand/collapse courses"
- Course: Truncated description (150 chars) + "Click for full details →"
```

---

## 🔗 Step 2: Create Edge Components

**File**: `src/components/AnimatedEdge.tsx`

### Edge Types & Styling
```typescript
// Root Edges (root → tiers)
- Color: rgb(148, 163, 184) // slate-400
- Width: 2px
- Type: smoothstep

// Tier Edges (tier → courses)
- Color: rgb(203, 213, 225) // slate-300
- Width: 1.5px
- Type: smoothstep

// Prerequisite Edges (course → course)
- Color: rgb(100, 116, 139) // slate-600
- Width: 2.5px
- Type: smoothstep or straight

// IMPORTANT: Do NOT add animated dots/circles
// They cause performance issues - use static edges only
```

### Edge Data Structure
```typescript
interface EdgeData {
  type?: 'root' | 'tier' | 'prerequisite';
  label?: string; // Optional label for edge
}
```

---

## 🧠 Step 3: Create ELK Layout Utility

**File**: `src/lib/elkLayout.ts`

### Configuration
```typescript
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '150',
  'elk.spacing.nodeNode': '100',
  'elk.direction': 'DOWN',
  'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
  'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
};

// Default Node Sizes (for ELK calculation)
- Root: 128px × 128px
- Tier: 96px × 96px
- Course: 200px × 100px
```

### Layout Parameters
```typescript
interface LayoutOptions {
  direction: 'DOWN' | 'RIGHT' | 'LEFT' | 'UP';  // Default: 'DOWN'
  nodeSpacing: number;                           // Default: 100-120
  layerSpacing: number;                          // Default: 150-200
}
```

---

## 📊 Step 4: Configure Graph Data

**File**: `data/careerPathConfig.ts`

```typescript
export const careerPathConfig: CareerPathConfig = {
  rootLabel: "Full Career Name", // e.g., "Software Engineering", "Cybersecurity"
  
  categories: [
    {
      id: "tier-1",
      label: "TIER 1: MUST-TAKE for [Career]",
      emoji: "🟢"
    },
    {
      id: "tier-2", 
      label: "TIER 2: STRONG [Career] BOOSTERS",
      emoji: "🟡"
    },
    {
      id: "tier-3",
      label: "TIER 3: [Career]-ADJACENT",
      emoji: "🟠"
    }
  ],
  
  tierDescriptions: {
    "tier-1": "Highest ROI courses...",
    "tier-2": "Strong additional skills...",
    "tier-3": "Broadening knowledge..."
  },
  
  courses: [
    // Import from tierCourses.ts
  ]
};
```

---

## 📝 Step 5: Define Course Data

**File**: `data/tierCourses.ts`

```typescript
export const tierCourses: TierCourse[] = [
  {
    id: "cse-120",              // Unique ID (kebab-case)
    code: "CSE 120",            // Display code
    name: "Software Engineering", // Short name
    fullName: "CSE 120: Software Engineering", // Full name
    tier: 1,                    // 1, 2, or 3
    description: "Core concepts...", // Main description
    
    // Expanded info (optional but recommended)
    expandedInfo: {
      credits: 4,
      prerequisites: "CSE 030 or equivalent",
      
      learningOutcomes: [
        "Outcome 1",
        "Outcome 2"
      ],
      
      topics: [
        "Topic 1",
        "Topic 2"
      ],
      
      careerRelevance: "Why this course matters...",
      
      realWorldApplications: [
        "Application 1",
        "Application 2"
      ],
      
      resources: {
        videos: ["https://..."],
        websites: ["https://..."],
        tools: ["Tool 1", "Tool 2"]
      },
      
      additionalNotes: "Extra information..."
    }
  }
];
```

---

## 🎯 Step 6: Implement Main Graph Component

**File**: `components/CareerPathGraph.tsx`

### Component Structure
```typescript
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import ReactFlow, {
  Node, Edge, Background, Controls, MiniMap,
  ReactFlowProvider, ReactFlowInstance, NodeChange, applyNodeChanges
} from "reactflow";
import "reactflow/dist/style.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";

import { GlassmorphismRootNode, GlassmorphismTierNode, GlassmorphismCourseNode } from "@/components/GlassmorphismNodes";
import { AnimatedFlowEdge } from "@/components/AnimatedEdge";
import { applyElkLayout } from "@/lib/elkLayout";
import { careerPathConfig } from "../data/careerPathConfig";
```

### State Management
```typescript
const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
const [isDragging, setIsDragging] = useState(false);
const [nodesState, setNodesState] = useState<Node[]>([]);
const [edgesState, setEdgesState] = useState<Edge[]>([]);
const [isFormatted, setIsFormatted] = useState(false);
const [selectedCourse, setSelectedCourse] = useState<TierCourse | null>(null);
const [isAutoLayoutting, setIsAutoLayoutting] = useState(false);
const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
```

### Node Types & Edge Types
```typescript
const nodeTypes = {
  root: GlassmorphismRootNode,
  tier: GlassmorphismTierNode,
  course: GlassmorphismCourseNode,
};

const edgeTypes = {
  animated: AnimatedFlowEdge,
};
```

### Node Creation Logic
```typescript
// Root Node
const rootNode: Node = {
  id: "career-root",
  type: "root",
  data: { label: careerPathConfig.rootLabel },
  position: nodePositions["career-root"] || { x: 0, y: 40 },
};

// Tier Nodes
const tierSpacing = isFormatted ? 600 : 400;
const tierStartX = -((careerPathConfig.categories.length - 1) * tierSpacing) / 2;
const tierY = 220;

const tierNodes: Node[] = careerPathConfig.categories.map((category, index) => ({
  id: category.id,
  type: "tier",
  data: {
    label: category.label,
    emoji: category.emoji,
    isExpanded: expandedTiers.has(category.id),
    onToggle: () => toggleTier(category.id),
  },
  position: nodePositions[category.id] || {
    x: tierStartX + index * tierSpacing,
    y: tierY,
  },
}));

// Course Nodes (when tier is expanded)
const coursesPerRow = 2; // Always 2 to prevent overlaps
const courseSpacing = isFormatted ? 350 : 300;
const rowSpacing = isFormatted ? 160 : 140;
const courseStartY = tierNode.position.y + 180;

// Calculate centered position for each course
const row = Math.floor(courseIndex / coursesPerRow);
const col = courseIndex % coursesPerRow;
const coursesInRow = Math.min(coursesPerRow, tierCourses.length - row * coursesPerRow);
const centerOffset = ((coursesInRow - 1) * courseSpacing) / 2;
const courseOffsetX = (col * courseSpacing) - centerOffset;
const courseX = tierNode.position.x + courseOffsetX;
const courseY = courseStartY + row * rowSpacing;
```

### Edge Creation Logic
```typescript
// Root to Tiers
const tierEdges: Edge[] = tierNodes.map((tierNode) => ({
  id: `career-root-${tierNode.id}`,
  source: "career-root",
  target: tierNode.id,
  type: "animated",
  animated: false,
  data: { type: 'root' },
}));

// Tiers to Courses
const courseEdges: Edge[] = courseNodes.map((courseNode) => ({
  id: `${tierNode.id}-${courseNode.id}`,
  source: tierNode.id,
  target: courseNode.id,
  type: "animated",
  animated: false,
  data: { type: 'tier' },
}));
```

---

## 🎨 Step 7: Implement Course Detail Modal

### Modal Positioning (CRITICAL)
```typescript
// Use simple flexbox centering - NOT Radix Dialog Portal
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
          {/* Content here */}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

**Key Points**:
- Use `fixed inset-0 flex items-center justify-center` for perfect centering
- Do NOT use Radix Dialog.Portal - it causes positioning issues
- Use `max-w-3xl w-full` for responsive width
- Use `max-h-[85vh] overflow-y-auto` for scrolling

### Modal Header
```typescript
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
  >
    {/* X icon */}
  </motion.button>
</div>
```

**IMPORTANT**: Use solid `text-slate-900` color, NOT gradient with `bg-clip-text text-transparent` (that makes text invisible!)

### Modal Content Sections
```typescript
// Each section should use Framer Motion with staggered delays

// Description (0.1s delay)
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
  <p className="text-slate-700 leading-relaxed">{course.description}</p>
</motion.div>

// Learning Outcomes (0.25s delay)
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
    {outcomes.map((outcome, index) => (
      <li key={index} className="flex items-start gap-2">
        <span className="text-purple-500 mt-1">•</span>
        <span>{outcome}</span>
      </li>
    ))}
  </ul>
</motion.div>

// Topic Tags (0.3s delay + staggered)
{topics.map((topic, index) => (
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
```

---

## 🎛️ Step 8: Add Controls & Features

### Toolbar Buttons
```typescript
<div className="absolute top-4 right-4 z-10 flex gap-2">
  {/* Auto Layout Button */}
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAutoLayout}
        disabled={isAutoLayoutting}
        className="px-4 py-2 bg-white/80 backdrop-blur-md hover:bg-white border border-slate-200 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium text-slate-700"
      >
        <Sparkles className="w-4 h-4" />
        {isAutoLayoutting ? 'Layouting...' : 'Auto Layout'}
      </motion.button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs shadow-xl border border-white/10 z-50">
        Apply ELK automatic layout
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
  
  {/* Reset Button - similar structure */}
</div>
```

### Auto Layout Handler
```typescript
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
    
    // Update positions
    const newPositions: Record<string, { x: number; y: number }> = {};
    layoutedNodes.forEach(node => {
      newPositions[node.id] = node.position;
    });
    
    setNodePositions(newPositions);
    reactFlowInstance.current.setNodes(layoutedNodes);
    
    // Fit view with animation
    setTimeout(() => {
      reactFlowInstance.current?.fitView({ padding: 0.2, duration: 800 });
    }, 100);
  } catch (error) {
    console.error('Auto-layout failed:', error);
  } finally {
    setIsAutoLayoutting(false);
  }
}, []);
```

### MiniMap Configuration
```typescript
<MiniMap
  className="!bg-white/80 !backdrop-blur-md !border-2 !border-slate-200 !shadow-lg !rounded-xl"
  nodeColor={(node) => {
    if (node.type === 'root') return '#818cf8'; // indigo
    if (node.type === 'tier') return '#34d399'; // emerald
    return '#60a5fa'; // blue
  }}
  maskColor="rgb(240, 240, 255, 0.6)"
  nodeStrokeWidth={3}
  pannable
  zoomable
/>
```

### Background & Controls
```typescript
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
```

---

## 🎨 Design Guidelines

### Color Palette

**Node Gradients**:
- Root: `from-indigo-500/20 via-purple-500/20 to-pink-500/20`
- Tier 1: `from-emerald-500/30 via-teal-500/30 to-cyan-500/30`
- Tier 2: `from-amber-500/30 via-yellow-500/30`
- Tier 3: `from-orange-500/30 via-red-500/30`

**Text Colors** (use SOLID colors, never gradients):
- Headers: `text-slate-900`
- Body: `text-slate-700`
- Muted: `text-slate-600`
- Interactive: `text-indigo-900` or `text-emerald-900`

**Background Effects**:
- Overlay: `bg-black/60 backdrop-blur-sm`
- Cards: `bg-white/95 backdrop-blur-xl`
- Tooltips: `bg-slate-900/95 backdrop-blur-md`

### Spacing Standards
- Node to tier: 180-220px vertical
- Tier spacing: 400px default, 600px formatted
- Course spacing: 300px horizontal (default), 350px (formatted)
- Row spacing: 140px default, 160px formatted
- Courses per row: **Always 2** (prevents overlaps)

### Animation Timing
- Fast interactions: 0.2s
- Medium transitions: 0.3-0.5s
- Staggered delays: 0.05s increments
- Spring animations: stiffness 150-200

---

## ✅ Testing Checklist

Before considering the graph complete, test:

1. **Visual**:
   - [ ] Root node text is visible (not gradient)
   - [ ] All tier emojis render
   - [ ] Course cards are readable
   - [ ] No overlapping nodes
   - [ ] Hover effects work smoothly
   - [ ] Tooltips appear on all nodes

2. **Interactions**:
   - [ ] Clicking tiers expands/collapses courses
   - [ ] Clicking courses opens centered modal
   - [ ] ESC closes modal
   - [ ] Clicking outside closes modal
   - [ ] Nodes are draggable
   - [ ] Auto Layout button works
   - [ ] Reset button works

3. **Performance**:
   - [ ] No animated dots (removed for performance)
   - [ ] Smooth 60fps animations
   - [ ] No lag when expanding tiers
   - [ ] Quick modal open/close

4. **Responsive**:
   - [ ] Graph scales on smaller screens
   - [ ] Modal is centered at all sizes
   - [ ] MiniMap is visible and functional
   - [ ] Controls are accessible

---

## 🚫 Common Pitfalls to Avoid

1. **Text Visibility**:
   - ❌ DON'T use `bg-clip-text text-transparent` for gradients
   - ✅ DO use solid colors like `text-slate-900`

2. **Modal Positioning**:
   - ❌ DON'T use Radix Dialog.Portal (causes centering issues)
   - ✅ DO use `fixed inset-0 flex items-center justify-center`

3. **Performance**:
   - ❌ DON'T add animated dots/circles on edges
   - ✅ DO use static styled edges

4. **Course Spacing**:
   - ❌ DON'T use 3 courses per row (causes overlaps)
   - ✅ DO use 2 courses per row maximum

5. **Node Sizing**:
   - ❌ DON'T make nodes too small (text becomes unreadable)
   - ✅ DO follow the dimension specs exactly

---

## 📝 Quick Reference

### Component Import Pattern
```typescript
import { GlassmorphismRootNode, GlassmorphismTierNode, GlassmorphismCourseNode } from "@/components/GlassmorphismNodes";
import { AnimatedFlowEdge } from "@/components/AnimatedEdge";
import { applyElkLayout } from "@/lib/elkLayout";
```

### Node Type Registration
```typescript
const nodeTypes = {
  root: GlassmorphismRootNode,
  tier: GlassmorphismTierNode,
  course: GlassmorphismCourseNode,
};

const edgeTypes = {
  animated: AnimatedFlowEdge,
};
```

### ReactFlow Props
```typescript
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
  minZoom={0.1}
  maxZoom={2}
>
```

---

## 🎉 Result

Following this guide will produce a modern, professional career path graph with:
- ✨ Glassmorphism design
- 🧠 ELK auto-layout
- 🎬 Smooth Framer Motion animations
- 💬 Rich Radix UI tooltips
- 🗺️ Interactive minimap
- 📱 Responsive design
- ⚡ High performance

---

## 📚 Reference Implementation

See the SWE (Software Engineering) career path for a complete working example:
- `frontend/src/app/degrees/cs-cse/careers/swe/components/CareerPathGraph.tsx`
- `frontend/src/app/degrees/cs-cse/careers/swe/data/`

---

*Last Updated: February 4, 2026*  
*Version: 1.0*  
*Status: Production-Ready*

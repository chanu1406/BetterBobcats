# CS/CSE Degree

This directory contains all CS/CSE-specific data and components.

## Structure

- `data/courses.ts` - All CS/CSE course data including prerequisites
- `components/` - CS/CSE-specific React components
  - `PrerequisiteGraph.tsx` - Interactive prerequisite graph visualization
  - `GraphLegend.tsx` - Color legend for academic years and graph controls

## Usage

The PrerequisiteGraph component is used in the main degrees page when CS/CSE is selected. It visualizes the course prerequisite structure with interactive category expansion.

## Features

### PrerequisiteGraph Component
- **Interactive Visualization**: Shows course prerequisite relationships in a hierarchical tree
- **Draggable Nodes**: All nodes (root, categories, courses) can be repositioned by dragging
- **Category Expansion**: Click category nodes to expand/collapse course branches
- **Year-Based Color Coding**: Courses are color-coded by academic year (blue, green, amber, purple)
- **Layout Controls**: Format layout button to prevent node overlaps
- **Reset Functionality**: 
  - **Reset Positions**: Restores nodes to default layout positions
  - **Reset Graph**: Fully resets graph (positions, expanded categories, layout format)

### GraphLegend Component
- **Color Legend**: Displays color reference for academic years
- **Graph Controls**: Provides buttons for:
  - Format Layout / Toggle Compact View
  - Reset Graph (full reset)
  - Reset Positions (position reset only)





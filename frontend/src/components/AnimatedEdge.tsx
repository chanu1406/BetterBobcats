/**
 * Animated Edge Component
 * Custom edge with flowing dots animation to show prerequisite flow direction
 * Creates a professional, dynamic visualization
 */

'use client';

import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

export function AnimatedFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Determine if this is a tier-to-course edge (lighter) or root-to-tier edge (stronger)
  const isTierEdge = data?.type === 'tier';
  const isPrerequisiteEdge = data?.type === 'prerequisite';

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: isTierEdge 
            ? 'rgb(203, 213, 225)' // slate-300 for tier edges
            : isPrerequisiteEdge
            ? 'rgb(100, 116, 139)' // slate-600 for prerequisite edges
            : 'rgb(148, 163, 184)', // slate-400 for root edges
          strokeWidth: isTierEdge ? 1.5 : isPrerequisiteEdge ? 2.5 : 2,
        }}
      />

      {/* Optional: Add a label if data.label exists */}
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 10,
              fontWeight: 500,
              pointerEvents: 'all',
            }}
            className="nodrag nopan bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-200 text-slate-700"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

/**
 * Simple straight edge with animation (for prerequisite chains)
 */
export function AnimatedStraightEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const edgePath = `M ${sourceX},${sourceY} L ${targetX},${targetY}`;
  
  const isPrerequisiteEdge = data?.type === 'prerequisite';

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: isPrerequisiteEdge
            ? 'rgb(100, 116, 139)' // slate-600 for strong prerequisites
            : 'rgb(148, 163, 184)', // slate-400 for normal edges
          strokeWidth: isPrerequisiteEdge ? 2.5 : 2,
        }}
      />
    </>
  );
}

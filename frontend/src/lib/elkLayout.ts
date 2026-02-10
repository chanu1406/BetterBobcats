/**
 * ELK Layout Utility
 * Automatic graph layout using Eclipse Layout Kernel (ELKjs)
 * Provides clean, hierarchical layouts with minimal edge crossings
 */

import ELK from 'elkjs/lib/elk.bundled.js';
import type { ElkNode } from 'elkjs';
import { Node, Edge } from 'reactflow';

const elk = new ELK();

// ELK layout options for curriculum map style
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '150',
  'elk.spacing.nodeNode': '100',
  'elk.direction': 'DOWN',
  'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
  'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
};

interface LayoutOptions {
  direction?: 'DOWN' | 'RIGHT' | 'LEFT' | 'UP';
  nodeSpacing?: number;
  layerSpacing?: number;
}

/**
 * Calculate automatic layout for React Flow nodes using ELK
 * @param nodes - Array of React Flow nodes
 * @param edges - Array of React Flow edges
 * @param options - Layout customization options
 * @returns Promise resolving to nodes with calculated positions
 */
export async function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions = {}
): Promise<Node[]> {
  const {
    direction = 'DOWN',
    nodeSpacing = 100,
    layerSpacing = 150,
  } = options;

  // Build ELK graph structure
  const graph: ElkNode = {
    id: 'root',
    layoutOptions: {
      ...elkOptions,
      'elk.direction': direction,
      'elk.spacing.nodeNode': String(nodeSpacing),
      'elk.layered.spacing.nodeNodeBetweenLayers': String(layerSpacing),
    },
    children: nodes.map((node) => ({
      id: node.id,
      width: node.width ?? (node.type === 'root' ? 128 : node.type === 'tier' ? 96 : 200),
      height: node.height ?? (node.type === 'root' ? 128 : node.type === 'tier' ? 96 : 100),
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  try {
    const layoutedGraph = await elk.layout(graph);

    // Map calculated positions back to nodes
    const layoutedNodes = nodes.map((node) => {
      const layoutedNode = layoutedGraph.children?.find((n) => n.id === node.id);
      
      if (layoutedNode) {
        return {
          ...node,
          position: {
            x: layoutedNode.x ?? node.position.x,
            y: layoutedNode.y ?? node.position.y,
          },
        };
      }
      
      return node;
    });

    return layoutedNodes;
  } catch (error) {
    console.error('ELK layout error:', error);
    return nodes; // Return original nodes if layout fails
  }
}

/**
 * Apply ELK layout to a React Flow instance
 * @param nodes - Current nodes
 * @param edges - Current edges
 * @param options - Layout options
 */
export async function applyElkLayout(
  nodes: Node[],
  edges: Edge[],
  options?: LayoutOptions
): Promise<{ nodes: Node[]; edges: Edge[] }> {
  const layoutedNodes = await getLayoutedElements(nodes, edges, options);
  
  return {
    nodes: layoutedNodes,
    edges, // Edges don't change, only node positions
  };
}

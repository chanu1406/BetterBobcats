/**
 * Enhanced Glassmorphism Node Components
 * Modern, iOS-style nodes with backdrop blur, shadows, and smooth animations
 * Built with Tailwind CSS and Framer Motion
 */

'use client';

import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { TierCourse } from '@/types/careerPath';
import * as Tooltip from '@radix-ui/react-tooltip';

/**
 * Glassmorphism Root Node
 * Large circular node with gradient and blur effect
 */
export function GlassmorphismRootNode({ data }: { data: { label: string } }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      className="relative w-40 h-40 rounded-full"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md border-2 border-white/30 shadow-2xl" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-xl" />
      
      {/* Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Handle 
          type="source" 
          position={Position.Bottom}
          className="!bg-indigo-500 !border-2 !border-white !w-3 !h-3"
        />
        <div className="text-base font-bold text-indigo-900 text-center px-4 leading-tight z-10">
          {data.label}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Glassmorphism Tier Node
 * Circular tier node with emoji and expandable state
 */
export function GlassmorphismTierNode({ 
  data 
}: { 
  data: { 
    label: string; 
    emoji?: string; 
    isExpanded?: boolean; 
    onToggle?: () => void 
  } 
}) {
  const { label, emoji, isExpanded, onToggle } = data;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={`relative w-32 h-32 rounded-full cursor-pointer group`}
          >
            {/* Glassmorphism background with conditional styling */}
            <div 
              className={`absolute inset-0 rounded-full backdrop-blur-lg border-2 shadow-xl transition-all duration-300 ${
                isExpanded
                  ? 'bg-gradient-to-br from-emerald-500/30 via-teal-500/30 to-cyan-500/30 border-emerald-300/50 shadow-emerald-500/30'
                  : 'bg-white/40 border-slate-300/50 border-dashed'
              } group-hover:shadow-2xl group-hover:border-opacity-70`}
            />
            
            {/* Subtle glow when expanded */}
            {isExpanded && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-lg" />
            )}
            
            {/* Content */}
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-1 px-3">
              <Handle 
                type="target" 
                position={Position.Top}
                className="!bg-indigo-500 !border-2 !border-white !w-3 !h-3"
              />
              <Handle 
                type="source" 
                position={Position.Bottom}
                className="!bg-indigo-500 !border-2 !border-white !w-3 !h-3"
              />
              
              {emoji && (
                <motion.span 
                  className="text-3xl"
                  animate={{ rotate: isExpanded ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {emoji}
                </motion.span>
              )}
              <span className={`text-xs font-bold text-center leading-tight ${
                isExpanded ? 'text-emerald-900' : 'text-slate-700'
              }`}>
                {label}
              </span>
            </div>
          </motion.div>
        </Tooltip.Trigger>
        
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-lg text-sm shadow-xl border border-white/10 max-w-xs z-50"
            sideOffset={5}
          >
            {isExpanded ? 'Click to collapse' : 'Click to expand courses'}
            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Glassmorphism Course Node
 * Rectangular course card with hover effects and quick info tooltip
 */
export function GlassmorphismCourseNode({ 
  data 
}: { 
  data: { 
    course: TierCourse;
    onClick?: (course: TierCourse) => void;
  } 
}) {
  const { course, onClick } = data;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(course);
  };

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root open={isHovered}>
        <Tooltip.Trigger asChild>
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 150 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative min-w-[200px] max-w-[220px] rounded-xl cursor-pointer group"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-lg border-2 border-white/40 shadow-lg group-hover:shadow-2xl group-hover:bg-white/70 transition-all duration-300" />
            
            {/* Gradient accent border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative px-4 py-3 flex flex-col gap-1.5">
              <Handle 
                type="target" 
                position={Position.Top}
                className="!bg-blue-500 !border-2 !border-white !w-2.5 !h-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                {course.code}
              </div>
              <div className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                {course.name}
              </div>
              
              {/* Tier badge */}
              <div className={`mt-1 self-start px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm ${
                course.tier === 1 
                  ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30'
                  : course.tier === 2
                  ? 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                  : 'bg-orange-500/20 text-orange-700 border border-orange-500/30'
              }`}>
                Tier {course.tier}
              </div>
            </div>
          </motion.div>
        </Tooltip.Trigger>
        
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl text-sm shadow-2xl border border-white/10 max-w-sm z-50"
            sideOffset={8}
          >
            <div className="space-y-2">
              <div className="font-bold text-base">{course.fullName}</div>
              <div className="text-slate-300 text-xs leading-relaxed">
                {course.description.slice(0, 150)}
                {course.description.length > 150 && '...'}
              </div>
              <div className="text-indigo-400 text-xs font-medium">
                Click for full details →
              </div>
            </div>
            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

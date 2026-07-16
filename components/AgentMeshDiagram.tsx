'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Cpu, TrendingUp, BrainCircuit, FileText, Palette, Calendar } from 'lucide-react';

export default function AgentMeshDiagram() {
  // Path definitions for connections starting from center (300, 180)
  const lines = [
    { id: 'trend', d: 'M 300 180 Q 210 135 120 90', color: 'var(--brand-start)' },
    { id: 'brand', d: 'M 300 180 Q 210 225 120 270', color: 'var(--brand-start)' },
    { id: 'content', d: 'M 300 180 Q 390 135 480 90', color: 'var(--brand-start)' },
    { id: 'visuals', d: 'M 300 180 L 520 180', color: 'var(--brand-start)' },
    { id: 'scheduler', d: 'M 300 180 Q 390 225 480 270', color: 'var(--brand-start)' }
  ];

  const satellites = [
    { 
      id: 'trend', 
      cx: 120, 
      cy: 90, 
      label: 'Trend Intel', 
      icon: <TrendingUp className="w-5 h-5 text-brand-start" />, 
      color: '#3B7CF6' 
    },
    { 
      id: 'brand', 
      cx: 120, 
      cy: 270, 
      label: 'Brand Brain', 
      icon: <BrainCircuit className="w-5 h-5 text-brand-start" />, 
      color: '#3B7CF6' 
    },
    { 
      id: 'content', 
      cx: 480, 
      cy: 90, 
      label: 'Writer Crew', 
      icon: <FileText className="w-5 h-5 text-brand-start" />, 
      color: '#3B7CF6' 
    },
    { 
      id: 'visuals', 
      cx: 520, 
      cy: 180, 
      label: 'Visual Agent', 
      icon: <Palette className="w-5 h-5 text-brand-start" />, 
      color: '#3B7CF6' 
    },
    { 
      id: 'scheduler', 
      cx: 480, 
      cy: 270, 
      label: 'Scheduler', 
      icon: <Calendar className="w-5 h-5 text-brand-start" />, 
      color: '#3B7CF6' 
    }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl border border-hairline bg-white shadow-xl overflow-hidden p-6 md:p-12 mb-16">
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(var(--hairline) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <svg viewBox="0 0 600 360" className="w-full h-auto relative z-10">
        <defs>
          <radialGradient id="meshCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-start)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--brand-start)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="diagram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand-start)" />
            <stop offset="100%" stopColor="var(--brand-end)" />
          </linearGradient>
        </defs>

        {/* Ambient background glow */}
        <circle cx="300" cy="180" r="100" fill="url(#meshCoreGlow)" pointerEvents="none" />

        {/* Connection Paths */}
        {lines.map((line) => (
          <motion.path
            key={line.id}
            d={line.d}
            fill="none"
            stroke="var(--hairline)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        ))}

        {/* Active flowing light pulses along lines */}
        {lines.map((line) => (
          <motion.path
            key={`pulse-${line.id}`}
            d={line.d}
            fill="none"
            stroke="url(#diagram-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
            initial={{ pathLength: 0.1, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'linear'
            }}
          />
        ))}

        {/* Satellite Nodes */}
        {satellites.map((node) => (
          <g key={node.id} className="cursor-pointer group">
            {/* Hover circle glow */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="24"
              fill="transparent"
              className="group-hover:fill-brand-start/5 transition-all duration-300"
            />
            {/* Main node circle */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="18"
              fill="var(--canvas)"
              stroke="var(--hairline)"
              strokeWidth="1.5"
              className="group-hover:stroke-brand-start transition-all duration-300"
            />
            {/* Visual indicator dot */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="14"
              fill="white"
              className="group-hover:scale-95 transition-transform duration-300"
            />
            
            {/* Node Icon wrapper - absolute positioning within SVG via foreignObject */}
            <foreignObject
              x={node.cx - 10}
              y={node.cy - 10}
              width="20"
              height="20"
              className="pointer-events-none"
            >
              <div className="w-full h-full flex items-center justify-center">
                {node.icon}
              </div>
            </foreignObject>

            {/* Labels */}
            <text
              x={node.cx}
              y={node.cy + 32}
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="10"
              fontWeight="600"
              fontFamily="var(--font-mono)"
              className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Orchestrator Center Core */}
        <g className="cursor-pointer group">
          <circle
            cx="300"
            cy="180"
            r="32"
            fill="url(#diagram-grad)"
            className="filter drop-shadow-[0_0_12px_rgba(59,124,246,0.3)] group-hover:scale-105 transition-transform duration-300"
          />
          <circle
            cx="300"
            cy="180"
            r="24"
            fill="var(--canvas)"
          />
          <foreignObject
            x="290"
            y="170"
            width="20"
            height="20"
            className="pointer-events-none"
          >
            <div className="w-full h-full flex items-center justify-center">
              <Cpu className="w-5 h-5 text-brand-start" />
            </div>
          </foreignObject>
          <text
            x="300"
            y="226"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
          >
            Orchestrator
          </text>
        </g>
      </svg>

      <div className="text-center mt-6">
        <span className="font-mono text-[10px] text-brand-start font-bold uppercase tracking-wider">
          Central Orchestrator Core
        </span>
        <h4 className="font-display font-semibold text-ink text-base mt-1">
          The Collaborative Multi-Agent Network
        </h4>
        <p className="font-sans text-xs text-body-text mt-2 max-w-md mx-auto leading-relaxed">
          Our hierarchical agent mesh runs on CrewAI and LangGraph, routing context through a Brand Knowledge Graph and connecting 10 specialized agents to operate your social media funnel on autopilot.
        </p>
      </div>
    </div>
  );
}

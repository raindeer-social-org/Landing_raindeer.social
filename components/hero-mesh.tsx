"use client"

import React, { useEffect } from "react"
import { useAnimate, stagger } from "motion/react"

interface HeroMeshProps {
  onComplete?: () => void;
}

const nodes = [
  { id: 'nose', cx: 200, cy: 248 },
  { id: 'jaw-l', cx: 180, cy: 232 },
  { id: 'jaw-r', cx: 220, cy: 232 },
  { id: 'ear-base-l', cx: 172, cy: 184 },
  { id: 'ear-base-r', cx: 228, cy: 184 },
  { id: 'ear-tip-l', cx: 100, cy: 152 },
  { id: 'ear-tip-r', cx: 300, cy: 152 },
  { id: 'forehead', cx: 200, cy: 172 },
  { id: 'antler-base-l', cx: 176, cy: 152 },
  { id: 'antler-base-r', cx: 224, cy: 152 },
  { id: 'antler-stem-l', cx: 144, cy: 112 },
  { id: 'antler-stem-r', cx: 256, cy: 112 },
  { id: 'antler-tip-top-l', cx: 108, cy: 32 },
  { id: 'antler-tip-top-r', cx: 292, cy: 32 },
  { id: 'antler-tip-outer-l', cx: 64, cy: 48 },
  { id: 'antler-tip-outer-r', cx: 336, cy: 48 },
  { id: 'antler-tip-inner-l', cx: 128, cy: 72 },
  { id: 'antler-tip-inner-r', cx: 272, cy: 72 },
  { id: 'antler-junction-outer-l', cx: 56, cy: 120 },
  { id: 'antler-junction-outer-r', cx: 344, cy: 120 },
  { id: 'antler-base-junction-l', cx: 156, cy: 112 },
  { id: 'antler-base-junction-r', cx: 244, cy: 112 },
  { id: 'chest-bottom', cx: 200, cy: 328 },
  { id: 'chest-l', cx: 136, cy: 272 },
  { id: 'chest-r', cx: 264, cy: 272 },
  { id: 'chest-lower-l', cx: 156, cy: 256 },
  { id: 'chest-lower-r', cx: 244, cy: 256 }
];

const paths = [
  // Face Outline
  { d: 'M 200 248 L 180 232' },
  { d: 'M 200 248 L 220 232' },
  { d: 'M 180 232 L 172 184' },
  { d: 'M 220 232 L 228 184' },
  { d: 'M 172 184 L 200 172' },
  { d: 'M 228 184 L 200 172' },
  { d: 'M 200 172 L 200 248' },
  
  // Ears
  { d: 'M 172 184 L 100 152' },
  { d: 'M 228 184 L 300 152' },
  { d: 'M 100 152 L 180 232' },
  { d: 'M 300 152 L 220 232' },

  // Antler Base
  { d: 'M 200 172 L 176 152' },
  { d: 'M 200 172 L 224 152' },
  { d: 'M 176 152 L 144 112' },
  { d: 'M 224 152 L 256 112' },

  // Antlers Left
  { d: 'M 176 152 L 156 112' },
  { d: 'M 144 112 L 156 112' },
  { d: 'M 156 112 L 128 72' },
  { d: 'M 144 112 L 56 120' },
  { d: 'M 56 120 L 108 32' },
  { d: 'M 56 120 L 64 48' },
  { d: 'M 64 48 L 144 112' },
  { d: 'M 128 72 L 108 32' },

  // Antlers Right
  { d: 'M 224 152 L 244 112' },
  { d: 'M 256 112 L 244 112' },
  { d: 'M 244 112 L 272 72' },
  { d: 'M 256 112 L 344 120' },
  { d: 'M 344 120 L 292 32' },
  { d: 'M 344 120 L 336 48' },
  { d: 'M 336 48 L 256 112' },
  { d: 'M 272 72 L 292 32' },

  // Chest
  { d: 'M 180 232 L 156 256' },
  { d: 'M 220 232 L 244 256' },
  { d: 'M 156 256 L 136 272' },
  { d: 'M 244 256 L 264 272' },
  { d: 'M 136 272 L 200 328' },
  { d: 'M 264 272 L 200 328' },
  { d: 'M 200 328 L 200 248' }
];

export default function HeroMesh({ onComplete }: HeroMeshProps) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      animate("[data-node]", { opacity: 1, scale: 1 }, { duration: 0.1 })
      animate("[data-line]", { pathLength: 1, opacity: 0.85 }, { duration: 0.1 })
      animate("[data-wordmark]", { opacity: 1, y: 0 }, { duration: 0.1 })
      if (onComplete) onComplete();
      return;
    }

    // Set initial values
    animate("[data-node]", { opacity: 0, scale: 0.4 }, { duration: 0 })
    animate("[data-line]", { pathLength: 0, opacity: 0.85 }, { duration: 0 })
    animate("[data-wordmark]", { opacity: 0, y: 12 }, { duration: 0 })

    // Orchestrate timeline sequence
    animate([
      // 1. Nodes appear scattered, out of center order
      ["[data-node]", { opacity: [0, 1], scale: [0.4, 1] },
        { duration: 0.45, delay: stagger(0.06, { from: "center" }) }],
      // 2. Lines draw between them starting slightly before nodes complete
      ["[data-line]", { pathLength: [0, 1] },
        { duration: 0.65, delay: stagger(0.04), at: "-0.2" }],
      // 3. Wordmark settles in last
      ["[data-wordmark]", { opacity: [0, 1], y: [12, 0] },
        { duration: 0.5, at: "-0.1" }]
    ]).then(() => {
      if (onComplete) onComplete();
    })
  }, [animate, onComplete])

  return (
    <svg ref={scope} viewBox="0 0 400 400" className="w-full h-auto text-brand-start">
      <defs>
        <linearGradient id="hero-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-start)" />
          <stop offset="100%" stopColor="var(--brand-end)" />
        </linearGradient>
      </defs>

      {/* Connection Lines */}
      {paths.map((line, i) => (
        <path
          key={`line-${i}`}
          d={line.d}
          data-line
          fill="none"
          stroke="url(#hero-logo-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.cx}
          cy={node.cy}
          r={node.id === 'nose' || node.id === 'forehead' ? '6' : '3.5'}
          data-node
          fill="url(#hero-logo-grad)"
          className={node.id === 'nose' || node.id === 'forehead' ? 'filter drop-shadow-[0_0_6px_rgba(59,124,246,0.6)]' : ''}
        />
      ))}

      {/* Integrated Wordmark */}
      <g data-wordmark transform="translate(200, 375)">
        <text
          textAnchor="middle"
          fill="var(--ink)"
          fontSize="18"
          fontWeight="800"
          fontFamily="var(--font-display)"
          letterSpacing="-0.02em"
        >
          raindeer<tspan fill="var(--brand-start)" fontWeight="500">.social</tspan>
        </text>
      </g>
    </svg>
  )
}

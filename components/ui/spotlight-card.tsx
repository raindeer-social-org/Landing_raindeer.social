'use client';

import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function SpotlightCard({ children, active = false, className = '' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
      className={`relative p-[1.5px] rounded-3xl overflow-hidden transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 shadow-md' 
          : 'bg-hairline hover:bg-hairline-bold shadow-sm hover:shadow-md'
      } ${className}`}
    >
      {/* Spotlight Radial Overlay Gradient */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 z-0"
          style={{
            background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, ${
              active ? 'rgba(245, 158, 11, 0.25)' : 'rgba(59, 124, 246, 0.08)'
            }, transparent 80%)`
          }}
        />
      )}

      {/* Internal Content card body */}
      <div className="relative z-10 w-full h-full bg-white rounded-[22px] p-8 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

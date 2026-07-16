'use client';

import React from 'react';

export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-canvas overflow-x-clip">
      {/* Grid Pattern Backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(var(--hairline) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Aurora Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top Right Cobalt Bloom */}
        <div 
          className="absolute -top-[18%] -right-[8%] w-[700px] h-[700px] rounded-full filter blur-[90px]"
          style={{
            background: 'radial-gradient(closest-side, rgba(59, 124, 246, 0.08), transparent 70%)'
          }}
        />
        {/* Bottom Left Teal Bloom */}
        <div 
          className="absolute -bottom-[20%] -left-[10%] w-[560px] h-[560px] rounded-full filter blur-[90px]"
          style={{
            background: 'radial-gradient(closest-side, rgba(21, 154, 140, 0.05), transparent 70%)'
          }}
        />
        {/* Middle Soft Brass Bloom */}
        <div 
          className="absolute top-[44%] left-[46%] w-[420px] h-[420px] rounded-full filter blur-[90px]"
          style={{
            background: 'radial-gradient(closest-side, rgba(168, 123, 46, 0.03), transparent 70%)'
          }}
        />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export function TracingBeam({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const pathLength = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0, 1]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto flex gap-10">
      {/* Scroll Tracing Beam Indicator Line */}
      <div className="absolute left-4 top-3 bottom-0 w-0.5 bg-hairline hidden md:block">
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top bg-brand-start rounded-full"
          style={{
            height: '100%',
            scaleY: pathLength
          }}
        />
      </div>

      {/* Main Steps Content Layout */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  logo: string;
}

export function AnimatedTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <div className="relative max-w-4xl mx-auto bg-white border border-hairline rounded-3xl p-6 md:p-12 shadow-sm overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
      
      {/* Metric Callout Card */}
      <div className="w-full md:w-1/3 flex flex-col items-center text-center p-6 bg-brand-start/5 border border-brand-start/10 rounded-2xl">
        <span className="font-display font-bold text-brand-start text-3xl md:text-4xl tracking-tight">
          {t.metric}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-body-text mt-2 max-w-[16ch]">
          {t.metricLabel}
        </span>
      </div>

      {/* Quote & Author Section */}
      <div className="flex-1 flex flex-col justify-between min-h-[160px] gap-6 relative">
        <Quote className="absolute -top-6 -left-6 w-12 h-12 text-brand-start/10 stroke-[1.5]" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 relative z-10"
          >
            <p className="font-sans text-base text-ink italic leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <h4 className="font-display font-bold text-ink text-sm">
                {t.name}
              </h4>
              <p className="font-sans text-xs text-body-text">
                {t.role} &middot; {t.company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="flex gap-2 self-end">
          <button
            onClick={prev}
            className="p-2 border border-hairline hover:border-hairline-bold hover:bg-canvas rounded-full transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-ink" />
          </button>
          <button
            onClick={next}
            className="p-2 border border-hairline hover:border-hairline-bold hover:bg-canvas rounded-full transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-ink" />
          </button>
        </div>
      </div>
    </div>
  );
}

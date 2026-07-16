'use client';

import React from 'react';

export function BentoGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto ${className}`}>
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  id?: string;
  className?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  title: string;
  description: string;
}

export function BentoGridItem({ id, className = '', icon, badge, title, description }: BentoGridItemProps) {
  return (
    <div
      id={id}
      className={`bg-white border border-hairline p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-start/20 transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-brand-start/5 border border-brand-start/10 rounded-2xl text-brand-start w-fit">
            {icon}
          </div>
          {badge && <div>{badge}</div>}
        </div>
        <div>
          <h4 className="font-display font-bold text-ink text-base tracking-tight mb-2">
            {title}
          </h4>
          <p className="font-sans text-sm text-body-text leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

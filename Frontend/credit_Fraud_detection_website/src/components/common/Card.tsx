import React from 'react';

export type CardGlowVariant = 'none' | 'indigo' | 'danger' | 'success' | 'warning';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: CardGlowVariant;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glow = 'none',
  interactive = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800/80 rounded-xl p-6 transition-all duration-300 shadow-sm dark:shadow-none';
  
  const glowClasses: Record<CardGlowVariant, string> = {
    none: '',
    indigo: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:border-indigo-500/30',
    danger: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:border-rose-500/30',
    success: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-500/30',
    warning: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-500/30',
  };

  const interactiveClasses = interactive 
    ? 'hover:-translate-y-1 cursor-pointer' 
    : '';

  return (
    <div
      className={`${baseClasses} ${glowClasses[glow]} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;

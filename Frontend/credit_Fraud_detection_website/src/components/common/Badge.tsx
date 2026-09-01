import React from 'react';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  glow = true,
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300';
  
  const variantClasses: Record<BadgeVariant, string> = {
    success: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' + (glow ? ' shadow-[0_0_12px_rgba(16,185,129,0.15)]' : ''),
    danger: 'bg-rose-950/40 text-rose-400 border-rose-500/30' + (glow ? ' shadow-[0_0_12px_rgba(244,63,94,0.15)]' : ''),
    warning: 'bg-amber-950/40 text-amber-400 border-amber-500/30' + (glow ? ' shadow-[0_0_12px_rgba(245,158,11,0.15)]' : ''),
    info: 'bg-indigo-950/40 text-indigo-400 border-indigo-500/30' + (glow ? ' shadow-[0_0_12px_rgba(99,102,241,0.15)]' : ''),
    neutral: 'bg-gray-800/40 text-gray-400 border-gray-700/50',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
export default Badge;

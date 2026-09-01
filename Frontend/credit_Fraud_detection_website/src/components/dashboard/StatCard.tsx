import React from 'react';
import type { LucideIcon } from 'lucide-react';
import Card from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean; // positive trend (e.g., fraud going down is positive, total volume going up is positive)
  };
  glowVariant?: 'indigo' | 'danger' | 'success' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  glowVariant = 'indigo',
}) => {
  return (
    <Card glow={glowVariant} className="relative overflow-hidden group">
      {/* Decorative background aura */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all duration-500" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-150 mt-2 select-all">
            {value}
          </h3>
        </div>
        
        {/* Glowing Icon Wrapper */}
        <div className={`p-3 rounded-xl border border-gray-800 bg-gray-950/60 transition-all duration-300`}>
          <Icon className="h-5 w-5 text-gray-400 group-hover:text-indigo-400" />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 mt-4">
          <span
            className={`text-xs font-bold ${
              trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {trend.value}
          </span>
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
            vs last period
          </span>
        </div>
      )}
    </Card>
  );
};
export default StatCard;

import React from 'react';
import { formatScore } from '../../utils/formatters';

interface RiskScoreProps {
  score: number;
  threshold?: number;
  size?: number;
}

export const RiskScore: React.FC<RiskScoreProps> = ({
  score,
  threshold = 21,
  size = 140,
}) => {
  const isHighRisk = score >= threshold;
  
  // SVG Ring Calculations
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine colors based on risk state
  const color = isHighRisk 
    ? 'stroke-rose-500 shadow-rose-500/50' 
    : score >= threshold / 2 
      ? 'stroke-amber-500 shadow-amber-500/50'
      : 'stroke-emerald-500 shadow-emerald-500/50';

  // const glowColor = isHighRisk 
  //   ? 'text-rose-500/10' 
  //   : score >= threshold / 2
  //     ? 'text-amber-500/10'
  //     : 'text-emerald-500/10';

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Background ring glow */}
      <div 
        className={`absolute inset-2 rounded-full blur-lg opacity-40 animate-pulse`} 
        style={{
          backgroundColor: isHighRisk ? '#f43f5e' : score >= threshold / 2 ? '#f59e0b' : '#10b981'
        }}
      />
      
      {/* Radial Ring SVG */}
      <svg width={size} height={size} className="transform -rotate-90 relative z-10">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-gray-800"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Indicator circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`transition-all duration-1000 ease-out ${color}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-15 pointer-events-none">
        <span className={`text-xl font-bold tracking-tight ${isHighRisk ? 'text-rose-400' : score >= threshold / 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
          {formatScore(score)}
        </span>
        <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-widest mt-0.5">
          Risk Score
        </span>
      </div>
    </div>
  );
};
export default RiskScore;

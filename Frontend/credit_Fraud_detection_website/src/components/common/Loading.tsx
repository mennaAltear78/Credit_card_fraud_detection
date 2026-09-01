import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  label = 'Processing...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 ${className}`}>
      <div className="relative">
        {/* Outer pulsing glow */}
        <div className={`absolute inset-0 rounded-full bg-indigo-500/20 blur-md animate-pulse`} />
        
        {/* Spinner */}
        <div
          className={`${sizeClasses[size]} rounded-full border-t-indigo-500 border-r-indigo-500/20 border-b-indigo-500/20 border-l-indigo-500/20 animate-spin`}
        />
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-400 tracking-wider animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};
export default Loading;

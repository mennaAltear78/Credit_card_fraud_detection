import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-gray-950 p-6 md:p-8 animate-in fade-in duration-500">
      {/* Header section if title is provided */}
      {title && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-100">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      
      {/* Main Content scrollable box */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
export default PageContainer;

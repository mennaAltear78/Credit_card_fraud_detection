import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Brain, History, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/predict',
      label: 'Analyze',
      icon: Brain,
    },
    {
      to: '/predictions',
      label: 'History',
      icon: History,
    },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-white dark:bg-gray-950
          border-r border-gray-200 dark:border-gray-800/80
          flex flex-col justify-between
          select-none transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:w-64 lg:h-[calc(100vh-4rem)] lg:top-16 lg:z-auto lg:sticky
          lg:bg-white/40 lg:dark:bg-gray-950/40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile: header with close button */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 lg:hidden border-b border-gray-200 dark:border-gray-800">
          <span className="text-sm font-bold tracking-wider text-gray-800 dark:text-gray-200">
            CardGuard <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 ml-1 uppercase">AI</span>
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-2 flex-1">
          <div className="px-3 mb-4">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Navigation
            </p>
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 relative group overflow-hidden border ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20 shadow-sm dark:shadow-[inset_0_0_12px_rgba(99,102,241,0.06)]'
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-250 hover:bg-gray-100 dark:hover:bg-gray-900/30'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Left glowing line indicator on active */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-600 dark:bg-indigo-500 rounded-r shadow-[0_0_8px_#6366f1]" />
                    )}
                    
                    <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-105 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-900/80 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Need help?</span>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-gray-600 mt-1">
            CardGuard v1.0.0
          </p>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;

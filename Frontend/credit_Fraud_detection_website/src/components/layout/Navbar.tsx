import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Menu } from 'lucide-react';
import { useFraudStore } from '../../store/fraudStore';
import Badge from '../common/Badge';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const transactions = useFraudStore(state => state.transactions);
  
  // Determine if the last prediction was simulated (indicating API fallback)
  const lastSimulated = transactions.length > 0 ? transactions[0].result.isSimulated : false;

  const [theme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return 'dark'; // default to dark
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className="h-16 border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300">
      {/* Left: Hamburger (mobile) + Brand Logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu button — only on mobile */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-sm animate-pulse" />
            <div className="relative bg-indigo-600 p-2 rounded-lg border border-indigo-500/30 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-indigo-100" />
            </div>
          </div>
          <div>
            <span className="font-bold tracking-wider text-base bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              CardGuard
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 ml-1.5 uppercase tracking-widest px-1 bg-indigo-50 dark:bg-indigo-950/50 rounded border border-indigo-200 dark:border-indigo-800/20">
              AI
            </span>
          </div>
        </div>
      </div>

      {/* Right: API Health */}
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-xs font-medium text-gray-500 dark:text-gray-400">System Gateway:</span>
          {lastSimulated ? (
            <Badge variant="warning" glow className="gap-1 flex items-center py-0.5 px-2">
              <Cpu className="h-3 w-3 animate-pulse" />
              <span className="hidden sm:inline">Offline Fallback</span>
              <span className="sm:hidden">Offline</span>
            </Badge>
          ) : (
            <Badge variant="success" glow className="gap-1 flex items-center py-0.5 px-2">
              <ShieldCheck className="h-3 w-3" />
              <span className="hidden sm:inline">Live API</span>
              <span className="sm:hidden">Live</span>
            </Badge>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

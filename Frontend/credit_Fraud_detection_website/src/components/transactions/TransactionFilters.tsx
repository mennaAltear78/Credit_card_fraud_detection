import React from 'react';
import { Search,  RefreshCw } from 'lucide-react';

interface FiltersState {
  search: string;
  status: 'all' | 'safe' | 'fraud';
  sortBy: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc' | 'risk_desc' | 'risk_asc';
}

interface TransactionFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onClear: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onChange,
  onClear,
}) => {
  return (
    <div className="bg-gray-900/40 border border-gray-800/80 rounded-xl p-4 gap-4 flex flex-col md:flex-row md:items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by ID or amount..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-xl text-gray-200 text-sm focus:outline-none transition-all duration-300"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Status:</span>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as FiltersState['status'] })}
            className="px-3 py-2 bg-gray-950 border border-gray-800 focus:border-indigo-500 text-gray-300 text-xs rounded-xl focus:outline-none transition-all duration-300"
          >
            <option value="all">All Predictions</option>
            <option value="safe">Safe Only</option>
            <option value="fraud">Fraud Only</option>
          </select>
        </div>

        {/* Sorting selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FiltersState['sortBy'] })}
            className="px-3 py-2 bg-gray-950 border border-gray-800 focus:border-indigo-500 text-gray-300 text-xs rounded-xl focus:outline-none transition-all duration-300"
          >
            <option value="date_desc">Latest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="risk_desc">Risk: High to Low</option>
            <option value="risk_asc">Risk: Low to High</option>
            <option value="amount_desc">Amount: High to Low</option>
            <option value="amount_asc">Amount: Low to High</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 border border-gray-800 hover:bg-gray-850 hover:border-gray-700 text-gray-400 hover:text-gray-250 text-xs font-semibold rounded-xl transition-all duration-300"
          title="Reset filters"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
export default TransactionFilters;

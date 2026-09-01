import React, { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import { useFraudStore } from '../store/fraudStore';
import PageContainer from '../components/layout/PageContainer';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionFilters from '../components/transactions/TransactionFilters';
import Button from '../components/common/Button';

interface FiltersState {
  search: string;
  status: 'all' | 'safe' | 'fraud';
  sortBy: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc' | 'risk_desc' | 'risk_asc';
}

const defaultFilters = (): FiltersState => ({
  search: '',
  status: 'all',
  sortBy: 'date_desc',
});

export const Predictions: React.FC = () => {
  const transactions = useFraudStore(state => state.transactions);
  const clearHistory = useFraudStore(state => state.clearHistory);
  const deleteTransaction = useFraudStore(state => state.deleteTransaction);

  const [filters, setFilters] = useState<FiltersState>(defaultFilters());

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all transaction logs? This cannot be undone.')) {
      clearHistory();
    }
  };

  // Perform search, filter, and sort in memoized values
  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by search (id or amount)
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(query) ||
          String(t.inputs.Amount).includes(query)
      );
    }

    // Filter by status (safe / fraud)
    if (filters.status !== 'all') {
      const filterIsFraud = filters.status === 'fraud';
      result = result.filter((t) => t.result.isFraud === filterIsFraud);
    }

    // Sort criteria
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date_asc':
          return new Date(a.result.timestamp).getTime() - new Date(b.result.timestamp).getTime();
        case 'amount_desc':
          return b.inputs.Amount - a.inputs.Amount;
        case 'amount_asc':
          return a.inputs.Amount - b.inputs.Amount;
        case 'risk_desc':
          return b.result.riskScore - a.result.riskScore;
        case 'risk_asc':
          return a.result.riskScore - b.result.riskScore;
        case 'date_desc':
        default:
          return new Date(b.result.timestamp).getTime() - new Date(a.result.timestamp).getTime();
      }
    });

    return result;
  }, [transactions, filters]);

  return (
    <PageContainer
      title="Audit History"
      subtitle="Analyze, filter, and sort past credit card transaction records"
      action={
        transactions.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearAll}
            className="flex items-center gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Logs</span>
          </Button>
        )
      }
    >
      <div className="space-y-6">
        {/* Search, Status, Sort Filters */}
        <TransactionFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(defaultFilters())}
        />

        {/* List Table */}
        <TransactionTable
          transactions={processedTransactions}
          onDelete={deleteTransaction}
        />
      </div>
    </PageContainer>
  );
};
export default Predictions;

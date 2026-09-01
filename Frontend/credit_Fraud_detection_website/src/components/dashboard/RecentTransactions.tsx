import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';
import type { TransactionHistoryItem } from '../../store/fraudStore';
import { formatAmount, formatScore } from '../../utils/formatters';
import Badge from '../common/Badge';
import Card from '../common/Card';

interface RecentTransactionsProps {
  transactions: TransactionHistoryItem[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const navigate = useNavigate();
  const recent = transactions.slice(0, 5);

  return (
    <Card className="flex flex-col h-[360px]" glow="none">
      <div className="flex items-center justify-between border-b border-gray-800/60 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Recent Activities
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Latest transaction evaluations
          </p>
        </div>
        <button
          onClick={() => navigate('/predictions')}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-350 transition-colors"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {recent.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-gray-500">
            No transaction history found
          </div>
        ) : (
          recent.map(t => {
            const isFraud = t.result.isFraud;
            return (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-950/40 border border-gray-900/60 hover:border-gray-800/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-xs font-bold text-gray-300 select-all block">
                      {t.id}
                    </span>
                    <span className="text-[10px] text-gray-500 font-semibold">
                      Time: {t.inputs.Time}s
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-250 block">
                      {formatAmount(t.inputs.Amount)}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Score: {formatScore(t.result.riskScore)}
                    </span>
                  </div>

                  <Badge variant={isFraud ? 'danger' : 'success'} className="w-16 justify-center">
                    {isFraud ? 'FRAUD' : 'SAFE'}
                  </Badge>

                  <button
                    onClick={() => navigate(`/predictions/${t.id}`)}
                    className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-gray-200 border border-gray-800 transition-all duration-300"
                    title="View Details"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
export default RecentTransactions;

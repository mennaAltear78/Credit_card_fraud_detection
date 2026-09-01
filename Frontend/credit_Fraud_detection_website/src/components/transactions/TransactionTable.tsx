import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import type { TransactionHistoryItem } from '../../store/fraudStore';
import { formatAmount, formatScore, formatDate } from '../../utils/formatters';
import Badge from '../common/Badge';

interface TransactionTableProps {
  transactions: TransactionHistoryItem[];
  onDelete: (id: string) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto border border-gray-800/80 rounded-xl bg-gray-900/40">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-950/80 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <th className="px-6 py-4">Transaction ID</th>
            <th className="px-6 py-4">Date/Time Evaluated</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Risk Factor</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/40">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                No matching transactions found in history.
              </td>
            </tr>
          ) : (
            transactions.map((t) => {
              const { id, result, inputs } = t;
              const isFraud = result.isFraud;

              return (
                <tr
                  key={id}
                  className="hover:bg-gray-900/30 transition-colors group"
                >
                  {/* Transaction ID */}
                  <td className="px-6 py-4 text-xs font-bold text-gray-300 select-all font-mono">
                    {id}
                  </td>

                  {/* Evaluation Timestamp */}
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {formatDate(result.timestamp)}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-xs font-bold text-gray-250">
                    {formatAmount(inputs.Amount)}
                  </td>

                  {/* Risk Score */}
                  <td className="px-6 py-4 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      {/* Mini visual indicator line */}
                      <div className="w-12 h-1.5 rounded-full bg-gray-850 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isFraud ? 'bg-rose-500' : result.riskScore >= 10 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${result.riskScore}%` }}
                        />
                      </div>
                      <span
                        className={
                          isFraud ? 'text-rose-400' : result.riskScore >= 10 ? 'text-amber-400' : 'text-emerald-400'
                        }
                      >
                        {formatScore(result.riskScore)}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 text-xs">
                    <Badge variant={isFraud ? 'danger' : 'success'} className="w-16 justify-center">
                      {isFraud ? 'FRAUD' : 'SAFE'}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right text-xs">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/predictions/${id}`)}
                        className="p-1.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-300"
                        title="View Full details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(id)}
                        className="p-1.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-500 hover:text-rose-400 hover:border-rose-500/20 transition-all duration-300"
                        title="Remove from history"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionTable;

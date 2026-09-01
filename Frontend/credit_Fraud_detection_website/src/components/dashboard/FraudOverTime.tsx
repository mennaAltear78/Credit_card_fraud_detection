import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import Card from '../common/Card';
import type { TransactionHistoryItem } from '../../store/fraudStore';

interface FraudOverTimeProps {
  transactions: TransactionHistoryItem[];
}

export const FraudOverTime: React.FC<FraudOverTimeProps> = ({ transactions }) => {
  // Map transactions to chronological sequence for plotting
  const data = [...transactions]
    .sort((a, b) => a.inputs.Time - b.inputs.Time)
    .map(t => ({
      time: `T+${t.inputs.Time}s`,
      amount: t.inputs.Amount,
      risk: t.result.riskScore,
      id: t.id,
    }));

  return (
    <Card className="h-[360px] flex flex-col justify-between" glow="none">
      <div>
        <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
          Chronological Risk Timeline
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          Risk rating trends across transaction timeline sequences
        </p>
      </div>

      <div className="flex-1 mt-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-gray-500">
            No transaction records available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data} margin={{ top: 10, right: 15, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={10} tickLine={false} />
              <YAxis stroke="#6b7280" fontSize={10} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6',
                  fontSize: '11px',
                }}
              formatter={(value) => [`${Number(value).toFixed(1)}%`, "Risk Score"]}
              />
              {/* Highlight threshold line */}
              <ReferenceLine y={21} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Threshold (21%)', fill: '#f43f5e', fontSize: 9, position: 'top' }} />
              
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ fill: '#4338ca', stroke: '#818cf8', strokeWidth: 1 }}
                activeDot={{ r: 6, fill: '#ef4444', stroke: '#fca5a5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
export default FraudOverTime;

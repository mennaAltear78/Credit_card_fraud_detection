import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import type{ TransactionHistoryItem } from '../../store/fraudStore';

interface RiskDistributionProps {
  transactions: TransactionHistoryItem[];
}

export const RiskDistribution: React.FC<RiskDistributionProps> = ({ transactions }) => {
  // Aggregate risk scores into buckets
  const buckets = [
    { range: '0-20%', name: 'Low', count: 0, fill: '#10b981' },
    { range: '21-40%', name: 'Guarded', count: 0, fill: '#3b82f6' },
    { range: '41-60%', name: 'Elevated', count: 0, fill: '#f59e0b' },
    { range: '61-80%', name: 'High', count: 0, fill: '#ef4444' },
    { range: '81-100%', name: 'Critical', count: 0, fill: '#b91c1c' },
  ];

  transactions.forEach(t => {
    const score = t.result.riskScore;
    if (score <= 20) buckets[0].count++;
    else if (score <= 40) buckets[1].count++;
    else if (score <= 60) buckets[2].count++;
    else if (score <= 80) buckets[3].count++;
    else buckets[4].count++;
  });

  return (
    <Card className="h-[320px] flex flex-col justify-between" glow="none">
      <div>
        <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
          Risk Score Distribution
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          Volume of transactions distributed across risk profiles
        </p>
      </div>

      <div className="flex-1 mt-4">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={buckets} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="range" stroke="#6b7280" fontSize={10} tickLine={false} />
            <YAxis stroke="#6b7280" fontSize={10} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#f3f4f6',
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRisk)"
              name="Transactions Count"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
export default RiskDistribution;

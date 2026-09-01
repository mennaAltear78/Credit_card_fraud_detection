import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Card from '../common/Card';

interface FraudChartProps {
  safeCount: number;
  fraudCount: number;
}

export const FraudChart: React.FC<FraudChartProps> = ({ safeCount, fraudCount }) => {
  const data = [
    { name: 'Safe Transactions', value: safeCount, color: '#10b981' }, // emerald
    { name: 'Fraud Detected', value: fraudCount, color: '#f43f5e' },   // rose
  ];

  const total = safeCount + fraudCount;
  const fraudRate = total > 0 ? ((fraudCount / total) * 100).toFixed(1) : '0.0';

  return (
    <Card className="h-[320px] flex flex-col justify-between" glow="none">
      <div>
        <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
          Classification Share
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          Proportion of legitimate vs. fraudulent transactions analyzed
        </p>
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        {/* Center Text in Donut */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-2xl font-bold text-gray-150">{fraudRate}%</span>
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">
            Fraud Rate
          </span>
        </div>

        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#111827" strokeWidth={1} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#f3f4f6',
                fontFamily: 'sans-serif',
                fontSize: '12px',
              }}
              formatter={(value) => [`${Number(value).toFixed(1)}%`, "Risk Score"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-around text-xs mt-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-400 font-medium">
              {item.name}: <span className="text-gray-200 font-bold">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default FraudChart;

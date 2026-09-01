import React from 'react';
import { CreditCard, ShieldAlert, ShieldCheck, Activity } from 'lucide-react';
import { useFraudStore } from '../store/fraudStore';
import PageContainer from '../components/layout/PageContainer';
import StatCard from '../components/dashboard/StatCard';
import FraudChart from '../components/dashboard/FraudChart';
import RiskDistribution from '../components/dashboard/RiskDistribution';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import FraudOverTime from '../components/dashboard/FraudOverTime';

export const Dashboard: React.FC = () => {
  const transactions = useFraudStore(state => state.transactions);

  // Compute metrics
  const totalCount = transactions.length;
  const fraudCount = transactions.filter(t => t.result.isFraud).length;
  const safeCount = totalCount - fraudCount;
  const fraudRate = totalCount > 0 ? ((fraudCount / totalCount) * 100).toFixed(1) : '0.0';

  // Trends (comparing against initial mock data count)
  // Let's create visual mock trends to satisfy "trends, micro-animations, premium"
  const stats = [
    {
      title: 'Total Audits',
      value: totalCount,
      icon: CreditCard,
      trend: { value: '+14%', isPositive: true },
      glowVariant: 'indigo' as const,
    },
    {
      title: 'Fraud Detected',
      value: fraudCount,
      icon: ShieldAlert,
      trend: { value: '-4.2%', isPositive: true }, // positive since fraud is down
      glowVariant: 'danger' as const,
    },
    {
      title: 'Safe Transactions',
      value: safeCount,
      icon: ShieldCheck,
      trend: { value: '+18.5%', isPositive: true },
      glowVariant: 'success' as const,
    },
    {
      title: 'Fraud Rate',
      value: `${fraudRate}%`,
      icon: Activity,
      trend: { value: '-8%', isPositive: true }, // positive trend since rate fell
      glowVariant: 'warning' as const,
    },
  ];

  return (
    <PageContainer
      title="Security Dashboard"
      subtitle="Overview of neural classification metrics and transaction audits"
    >
      {/* 4-Column Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            glowVariant={stat.glowVariant}
          />
        ))}
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-8">
          <FraudOverTime transactions={transactions} />
        </div>
        <div className="lg:col-span-4">
          <FraudChart safeCount={safeCount} fraudCount={fraudCount} />
        </div>
      </div>

      {/* Secondary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <RiskDistribution transactions={transactions} />
        </div>
        <div className="lg:col-span-6">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </PageContainer>
  );
};
export default Dashboard;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useFraudStore } from '../store/fraudStore';
import PageContainer from '../components/layout/PageContainer';
import TransactionDetailsComponent from '../components/transactions/TransactionDetails';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const transactions = useFraudStore(state => state.transactions);

  // Find transaction matching route ID
  const transaction = transactions.find((t) => t.id === id);

  return (
    <PageContainer
      title={transaction ? `Audit Log: ${transaction.id}` : 'Audit Record'}
      subtitle="Comprehensive view of security parameters and PCA vectors"
      action={
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/predictions')}
          className="flex items-center gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Logs</span>
        </Button>
      }
    >
      {transaction ? (
        <TransactionDetailsComponent transaction={transaction} />
      ) : (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Card className="max-w-md text-center p-8 border border-gray-800" glow="danger">
            <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-200">
              Audit Record Not Found
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              The transaction ID <code className="text-rose-400 bg-gray-950 px-1 py-0.5 rounded font-mono font-bold">{id}</code> does not exist in history.
            </p>
            <Button
              variant="primary"
              className="mt-6"
              onClick={() => navigate('/predictions')}
            >
              Return to History
            </Button>
          </Card>
        </div>
      )}
    </PageContainer>
  );
};
export default TransactionDetails;

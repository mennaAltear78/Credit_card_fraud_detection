import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import TransactionForm from '../components/prediction/TransactionForm';
import PredictionResult from '../components/prediction/PredictionResult';
import type { TransactionHistoryItem } from '../store/fraudStore';
import Button from '../components/common/Button';

export const Predict: React.FC = () => {
  const [activePrediction, setActivePrediction] = useState<TransactionHistoryItem | null>(null);

  const handleSuccess = (item: TransactionHistoryItem) => {
    setActivePrediction(item);
  };

  const handleReset = () => {
    setActivePrediction(null);
  };

  return (
    <PageContainer
      title="Fraud Analysis Engine"
      subtitle="Examine real-time transaction parameters using XGBoost classification"
    >
      <div className="flex items-center justify-center min-h-[60vh]">
        {!activePrediction ? (
          <TransactionForm onSuccess={handleSuccess} />
        ) : (
          <div className="space-y-6 w-full flex flex-col items-center">
            {/* Classification Result panel */}
            <PredictionResult
              result={activePrediction.result}
              transactionId={activePrediction.id}
              amount={activePrediction.inputs.Amount}
            />

            {/* Clear/Reset button */}
            <Button
              variant="secondary"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Audit Another Transaction</span>
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
export default Predict;

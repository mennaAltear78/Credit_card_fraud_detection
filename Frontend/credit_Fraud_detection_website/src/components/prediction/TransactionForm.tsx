import React from 'react';
import { useFraudPrediction } from '../../hooks/useFraudPrediction';
import BasicInputs from './BasicInputs';
import AdvancedInputs from './AdvancedInputs';
import RandomTransactionButton from './RandomTransactionButton';
import Button from '../common/Button';
import Card from '../common/Card';
import { Search } from 'lucide-react';
import type { TransactionHistoryItem } from '../../store/fraudStore';

interface TransactionFormProps {
  onSuccess: (item: TransactionHistoryItem) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess }) => {
  const {
    values,
    errors,
    loading,
    storeError,
    handleInputChange,
    fillRandomValues,
    submitForm,
  } = useFraudPrediction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultItem = await submitForm();
      onSuccess(resultItem);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <Card glow="indigo" className="space-y-6 max-w-4xl w-full mx-auto">
      <div>
        <h3 className="text-lg font-bold text-gray-200 tracking-wide">
          New Transaction Audit
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Enter transaction parameters to classify risk factor
        </p>
      </div>

      {/* Quick Templates generators */}
      <RandomTransactionButton onGenerate={fillRandomValues} />

      <hr className="border-gray-800" />

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Properties */}
        <BasicInputs
          values={values}
          errors={errors}
          onChange={handleInputChange}
        />

        {/* Latent vectors collapsible panel */}
        <AdvancedInputs
          values={values}
          onChange={handleInputChange}
        />

        {/* Global Error Banner */}
        {storeError && (
          <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-950/20 text-rose-400 text-xs text-center">
            {storeError}
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            loading={loading}
            glow
            className="w-full md:w-auto md:px-10 flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            <span>Analyze Transaction</span>
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default TransactionForm;

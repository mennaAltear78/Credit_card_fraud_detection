import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, ChevronRight } from 'lucide-react';
import type { PredictionResponse } from '../../services/api';
import RiskScore from './RiskScore';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

interface PredictionResultProps {
  result: PredictionResponse;
  transactionId: string;
  amount: number;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  transactionId,
  amount,
}) => {
  const navigate = useNavigate();
  const { isFraud, riskScore, threshold, isSimulated } = result;

  return (
    <Card 
      glow={isFraud ? 'danger' : 'success'} 
      className="max-w-md w-full mx-auto text-center border-2 border-dashed p-8 relative overflow-hidden animate-in zoom-in-95 duration-500"
      style={{
        borderColor: isFraud ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.3)'
      }}
    >
      {/* Simulation Watermark Badge */}
      {isSimulated && (
        <div className="absolute top-3 right-3">
          <Badge variant="warning" className="text-[9px] uppercase tracking-wider">
            Simulated
          </Badge>
        </div>
      )}

      {/* Classification Icon Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        {isFraud ? (
          <div className="bg-rose-950/40 p-4 rounded-full border border-rose-500/20 text-rose-500 mb-3 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-bounce">
            <ShieldAlert className="h-10 w-10" />
          </div>
        ) : (
          <div className="bg-emerald-950/40 p-4 rounded-full border border-emerald-500/20 text-emerald-500 mb-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="h-10 w-10" />
          </div>
        )}

        <h2 className={`text-xl font-bold uppercase tracking-wider ${isFraud ? 'text-rose-400' : 'text-emerald-400'}`}>
          {isFraud ? '⚠ Fraud Detected' : '✔ Transaction Safe'}
        </h2>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">
          Transaction {transactionId}
        </p>
      </div>

      {/* Risk Circle Visual */}
      <div className="flex justify-center mb-6">
        <RiskScore score={riskScore} threshold={threshold} size={130} />
      </div>

      {/* Threshold comparison stats */}
      <div className="grid grid-cols-2 gap-4 py-4 px-3 bg-gray-950/40 border border-gray-800 rounded-xl mb-6">
        <div className="text-center">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Threshold</span>
          <span className="text-sm font-bold text-gray-400 font-mono mt-1 block">{threshold}%</span>
        </div>
        <div className="text-center border-l border-gray-800">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Volume (USD)</span>
          <span className="text-sm font-bold text-gray-200 mt-1 block">
            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Model Statistics Panel */}
      {result.modelStatistics && (
        <div className="mt-2 mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/40 text-left text-xs space-y-2">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px] mb-2 border-b border-gray-200 dark:border-gray-800 pb-1">
            Model Validation Statistics
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{(result.modelStatistics.accuracy * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Precision:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{(result.modelStatistics.precision * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Recall:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{(result.modelStatistics.recall * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>F1-Score:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{(result.modelStatistics.f1_score * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>ROC AUC:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{result.modelStatistics.roc_auc.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>PR AUC:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{result.modelStatistics.pr_auc.toFixed(4)}</span>
            </div>
          </div>
        </div>
      )}

      {/* View Details Redirect button */}
      <Button
        variant={isFraud ? 'danger' : 'primary'}
        glow
        onClick={() => navigate(`/predictions/${transactionId}`)}
        className="w-full flex items-center justify-center gap-1 bg-gradient-to-r"
      >
        <span>View Audit details</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </Card>
  );
};
export default PredictionResult;

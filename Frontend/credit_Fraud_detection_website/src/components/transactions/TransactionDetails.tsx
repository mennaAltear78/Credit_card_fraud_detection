import React, { useState } from 'react';
import { CreditCard, Calendar, Clock, DollarSign, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { TransactionHistoryItem } from '../../store/fraudStore';
import { formatAmount, formatDate, formatScore, formatTime } from '../../utils/formatters';
import Badge from '../common/Badge';
import Card from '../common/Card';

interface TransactionDetailsProps {
  transaction: TransactionHistoryItem;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { id, inputs, result } = transaction;
  const isFraud = result.isFraud;

  // Features list V1 to V28
  const features = Array.from({ length: 28 }, (_, i) => `V${i + 1}`);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Upper Grid - 3D Card Display & Primary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive 3D Card Display (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 text-center">
            Click Card to Flip
          </p>
          
          {/* Card Wrapper with 3D perspective */}
          <div 
            className="w-full max-w-[340px] h-[200px] cursor-pointer select-none perspective group"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Inner rotatable pane */}
            <div 
              className={`relative w-full h-full duration-700 transform-style transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* CARD FRONT */}
              <div 
                className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between backface-hidden border ${
                  isFraud 
                    ? 'bg-gradient-to-br from-rose-950/80 to-red-900/60 border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.25)]' 
                    : 'bg-gradient-to-br from-emerald-950/80 to-teal-900/60 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                }`}
              >
                {/* Upper row: chip and status logo */}
                <div className="flex justify-between items-start">
                  {/* Microchip */}
                  <div className="w-10 h-8 rounded bg-gradient-to-r from-amber-400 to-amber-250 border border-amber-600/30 flex items-center justify-center opacity-85">
                    <div className="w-6 h-5 border border-amber-800/40 rounded-sm" />
                  </div>
                  
                  {/* Status Badge Icon */}
                  {isFraud ? (
                    <ShieldAlert className="h-7 w-7 text-rose-300 drop-shadow-[0_0_6px_#f43f5e]" />
                  ) : (
                    <ShieldCheck className="h-7 w-7 text-emerald-300 drop-shadow-[0_0_6px_#10b981]" />
                  )}
                </div>

                {/* Middle row: fake card number (ID) */}
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">
                    Audit Identity
                  </span>
                  <span className="font-mono text-lg font-bold tracking-wider text-gray-100 select-all block">
                    ••••  ••••  ••••  {id.replace('TX-', '')}
                  </span>
                </div>

                {/* Bottom row: amount and validity */}
                <div className="flex justify-between items-end border-t border-white/10 pt-2">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-gray-400 block">Amount</span>
                    <span className="text-base font-bold text-gray-150">{formatAmount(inputs.Amount)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-wider text-gray-400 block">Status</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${isFraud ? 'text-rose-300' : 'text-emerald-300'}`}>
                      {isFraud ? 'FRAUD' : 'SAFE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD BACK */}
              <div 
                className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between backface-hidden rotate-y-180 border ${
                  isFraud 
                    ? 'bg-gradient-to-br from-red-950/90 to-rose-950/95 border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.25)]' 
                    : 'bg-gradient-to-br from-teal-950/90 to-emerald-950/95 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                }`}
              >
                {/* Signature strip strip */}
                <div className="w-full h-8 bg-gray-900/60 rounded-md border border-gray-800 flex items-center justify-end px-3">
                  <span className="font-mono text-[9px] font-bold text-gray-500 select-none">CVV: 739</span>
                </div>

                {/* Metrics detail */}
                <div className="space-y-1 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    Risk Assessment Score
                  </span>
                  <span className={`text-3xl font-black ${isFraud ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {formatScore(result.riskScore)}
                  </span>
                  <span className="text-[9px] text-gray-500 block uppercase tracking-widest font-semibold">
                    Threshold: {result.threshold}%
                  </span>
                </div>

                {/* Simulation indicator */}
                <div className="text-center text-[9px] text-gray-400 bg-black/30 py-1 rounded border border-white/5 font-semibold">
                  {result.isSimulated ? '🔒 CLIENT-SIDE SIMULATED GATEWAY' : '🌐 VERIFY GATEWAY RESOLVED'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auditing Metadata (lg:col-span-7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="flex items-center gap-4 bg-gray-900/40 border-gray-800" glow="none">
            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-indigo-400 shrink-0">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Volume Transacted</span>
              <span className="text-lg font-bold text-gray-200 mt-0.5 block">{formatAmount(inputs.Amount)}</span>
            </div>
          </Card>

          <Card className="flex items-center gap-4 bg-gray-900/40 border-gray-800" glow="none">
            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-indigo-400 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Relative Dataset Time</span>
              <span className="text-lg font-bold text-gray-200 mt-0.5 block">{formatTime(inputs.Time)}</span>
            </div>
          </Card>

          <Card className="flex items-center gap-4 bg-gray-900/40 border-gray-800" glow="none">
            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-indigo-400 shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Date Audited</span>
              <span className="text-sm font-bold text-gray-200 mt-0.5 block">{formatDate(result.timestamp)}</span>
            </div>
          </Card>

          <Card className="flex items-center gap-4 bg-gray-900/40 border-gray-800" glow="none">
            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-indigo-400 shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Gateway Resolve Mode</span>
              <span className="text-sm font-bold text-gray-200 mt-0.5 block">
                {result.isSimulated ? (
                  <Badge variant="warning">Simulation Fallback</Badge>
                ) : (
                  <Badge variant="success">API Backend</Badge>
                )}
              </span>
            </div>
          </Card>
        </div>
      </div>

      <hr className="border-gray-800" />

      {/* PCA Latent Feature Signatures */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-gray-300 tracking-wide uppercase">
            PCA Feature Coordinates (V1 - V28)
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Individual coordinate metrics mapping the transaction in latent space relative to the normal cluster center.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {features.map((featureName) => {
            const val = inputs[featureName] || 0;
            // PCA V coordinates typically range from -10 to +10. Let's compute a percentage relative to a -8 to +8 range
            const normalizedWidth = Math.max(0, Math.min(100, ((val + 8) / 16) * 100));

            return (
              <div 
                key={featureName} 
                className="p-3 rounded-xl bg-gray-900/30 border border-gray-800/60 flex flex-col justify-between h-[85px] group/item hover:border-gray-850 hover:bg-gray-900/60 transition-all duration-300"
              >
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                  {featureName}
                </span>
                
                <span className="text-xs font-mono font-bold text-gray-250 select-all my-1 group-hover/item:text-indigo-400 transition-colors">
                  {val.toFixed(4)}
                </span>

                {/* Small indicator bar */}
                <div className="w-full h-1 bg-gray-950 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-indigo-500 group-hover/item:bg-indigo-400 transition-colors"
                    style={{ width: `${normalizedWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TransactionDetails;

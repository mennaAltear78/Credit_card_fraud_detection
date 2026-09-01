import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface RandomTransactionButtonProps {
  onGenerate: (type: 'safe' | 'fraud' | 'random') => void;
}

export const RandomTransactionButton: React.FC<RandomTransactionButtonProps> = ({
  onGenerate,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block text-center">
        Quick Templates / Testing Data
      </span>
      <div className="grid grid-cols-1 gap-3 justify-center items-center">
        {/* Safe Template */}
        {/* <button
          type="button"
          onClick={() => onGenerate('safe')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 rounded-xl transition-all duration-300 active:scale-95 group"
        >
          <ShieldCheck className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
          <span>Safe Profile</span>
        </button> */}

        {/* Fraud Template */}
        <button
          type="button"
          onClick={() => onGenerate('fraud')}
          className="flex items-center cursor-pointer justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/20 rounded-xl transition-all duration-300 active:scale-95 group"
        >
          <ShieldAlert className="h-3.5 w-3.5 group-hover:scale-110 transition-transform animate-pulse" />
            check for Fraud Profile
        </button>

        {/* Random Template */}
        {/* <button
          type="button"
          onClick={() => onGenerate('random')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-400 bg-indigo-950/20 hover:bg-indigo-950/40 border border-indigo-500/20 rounded-xl transition-all duration-300 active:scale-95 group"
        >
          <RefreshCw className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform" />
          <span>Mix Random</span>
        </button> */}
      </div>
    </div>
  );
};
export default RandomTransactionButton;

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import type { TransactionPayload } from '../../utils/randomTransaction';

interface AdvancedInputsProps {
  values: TransactionPayload;
  onChange: (key: keyof TransactionPayload, value: number) => void;
}

export const AdvancedInputs: React.FC<AdvancedInputsProps> = ({
  values,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generate array V1 to V28
  const features = Array.from({ length: 28 }, (_, i) => `V${i + 1}` as keyof TransactionPayload);

  return (
    <div className="border border-gray-800/80 rounded-xl overflow-hidden bg-gray-900/40">
      {/* Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-900/60 hover:bg-gray-900 transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-2.5">
          <Sliders className="h-4 w-4 text-indigo-400" />
          <div>
            <span className="text-sm font-bold text-gray-200 block">
              Advanced Latent Features
            </span>
            <span className="text-[10px] text-gray-500 font-medium">
              V1 - V28 PCA feature vectors (Numerical coordinates)
            </span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {/* Inputs Grid */}
      {isOpen && (
        <div className="p-5 border-t border-gray-800 bg-gray-950/20 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {features.map((feature) => (
              <div key={feature} className="space-y-1">
                <label
                 // htmlFor={feature}
                  className="block text-[11px] font-bold text-gray-400 tracking-wider"
                >
                  {feature}
                </label>
                <input
                  type="number"
                  step="0.0001"
                 // id={feature}
                 // name={feature}
                  value={values[feature] || 0}
                  onChange={(e) => onChange(feature, parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-gray-950 border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-gray-200 text-xs font-mono focus:outline-none transition-all duration-300"
                />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-600 mt-4 text-center">
            PCA features represent transformed indicators corresponding to confidential transaction details.
          </p>
        </div>
      )}
    </div>
  );
};
export default AdvancedInputs;

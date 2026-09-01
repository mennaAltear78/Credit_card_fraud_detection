import React from 'react';
import type { TransactionPayload } from '../../utils/randomTransaction';

interface BasicInputsProps {
  values: TransactionPayload;
  errors: Partial<Record<keyof TransactionPayload, string>>;
  onChange: (key: keyof TransactionPayload, value: number) => void;
}

export const BasicInputs: React.FC<BasicInputsProps> = ({
  values,
  errors,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Time Input */}
      <div className="space-y-2">
        <label htmlFor="Time" className="block text-sm font-semibold text-gray-300">
          Transaction Time (Seconds)
        </label>
        <input
          type="number"
          id="Time"
          name="Time"
          min="0"
          value={values.Time}
          onChange={(e) => onChange('Time', parseInt(e.target.value) || 0)}
          className={`w-full px-4 py-3 rounded-xl bg-gray-950 border text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 ${
            errors.Time ? 'border-rose-500/50' : 'border-gray-800 focus:border-indigo-500'
          }`}
          placeholder="e.g. 406"
        />
        {errors.Time ? (
          <p className="text-xs text-rose-400 mt-1">{errors.Time}</p>
        ) : (
          <p className="text-[11px] text-gray-500">
            Seconds elapsed since the first transaction in the dataset (0 to 172,800)
          </p>
        )}
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label htmlFor="Amount" className="block text-sm font-semibold text-gray-300">
          Amount (USD)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-gray-500 font-bold select-none">$</span>
          <input
            type="number"
            id="Amount"
            name="Amount"
            min="0"
            step="0.01"
            value={values.Amount || ''}
            onChange={(e) => onChange('Amount', parseFloat(e.target.value) || 0)}
            className={`w-full pl-8 pr-4 py-3 rounded-xl bg-gray-950 border text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 ${
              errors.Amount ? 'border-rose-500/50' : 'border-gray-800 focus:border-indigo-500'
            }`}
            placeholder="0.00"
          />
        </div>
        {errors.Amount ? (
          <p className="text-xs text-rose-400 mt-1">{errors.Amount}</p>
        ) : (
          <p className="text-[11px] text-gray-500">
            The currency volume transacted for this purchase
          </p>
        )}
      </div>
    </div>
  );
};
export default BasicInputs;

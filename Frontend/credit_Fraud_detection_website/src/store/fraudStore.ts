import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TransactionPayload } from '../utils/randomTransaction';
import { generateRandomTransaction } from '../utils/randomTransaction';
import { predictTransaction } from '../services/api';
import type { PredictionResponse } from '../services/api';

export interface TransactionHistoryItem {
  id: string;
  inputs: TransactionPayload;
  result: PredictionResponse;
}

interface FraudStore {
  transactions: TransactionHistoryItem[];
  currentPrediction: TransactionHistoryItem | null;
  loading: boolean;
  error: string | null;

  predictTransaction: (data: TransactionPayload) => Promise<TransactionHistoryItem>;
  generateAndPredictRandom: (type: 'safe' | 'fraud' | 'random') => Promise<TransactionHistoryItem>;
  clearHistory: () => void;
  deleteTransaction: (id: string) => void;
}

// Helper to create pre-populated historical transactions for the dashboard
const createMockHistory = (): TransactionHistoryItem[] => {
  const initialItems: { id: string; amount: number; time: number; score: number; isFraud: boolean }[] = [
    // { id: 'TX-1248', amount: 82.00, time: 406, score: 94.3, isFraud: true },
    // { id: 'TX-1247', amount: 12.50, time: 205, score: 3.2, isFraud: false },
    // { id: 'TX-1246', amount: 420.00, time: 112, score: 76.5, isFraud: true },
    // { id: 'TX-1245', amount: 950.00, time: 98, score: 88.1, isFraud: true },
    // { id: 'TX-1244', amount: 15.00, time: 60, score: 1.2, isFraud: false },
    // { id: 'TX-1243', amount: 25.40, time: 30, score: 0.8, isFraud: false },
    // { id: 'TX-1242', amount: 120.00, time: 12, score: 15.4, isFraud: false },
  ];

  return initialItems.map(item => {
    // Generate actual V1-V28 inputs matching the classification state
    const inputs = generateRandomTransaction(item.isFraud ? 'fraud' : 'safe');
    // Align values
    inputs.Amount = item.amount;
    inputs.Time = item.time;

    return {
      id: item.id,
      inputs,
      result: {
        isFraud: item.isFraud,
        riskScore: item.score,
        threshold: 21.0,
        isSimulated: true,
        timestamp: new Date(Date.now() - (406 - item.time) * 60000).toISOString(),
      }
    };
  });
};

export const useFraudStore = create<FraudStore>()(
  persist(
    (set, get) => ({
      transactions: createMockHistory(),
      currentPrediction: null,
      loading: false,
      error: null,

      predictTransaction: async (data: TransactionPayload) => {
        set({ loading: true, error: null });
        try {
          const result = await predictTransaction(data);
          const newId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
          
          const newTransaction: TransactionHistoryItem = {
            id: newId,
            inputs: data,
            result,
          };

          set(state => ({
            transactions: [newTransaction, ...state.transactions],
            currentPrediction: newTransaction,
            loading: false,
          }));

          return newTransaction;
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : 'Unknown error during prediction';
          set({ loading: false, error: errMsg });
          throw err;
        }
      },

      generateAndPredictRandom: async (type: 'safe' | 'fraud' | 'random') => {
        const payload = generateRandomTransaction(type);
        return get().predictTransaction(payload);
      },

      clearHistory: () => {
        set({ transactions: [], currentPrediction: null });
      },

      deleteTransaction: (id: string) => {
        set(state => ({
          transactions: state.transactions.filter(t => t.id !== id),
          currentPrediction: state.currentPrediction?.id === id ? null : state.currentPrediction,
        }));
      },
    }),
    {
      name: 'fraud-detection-store',
      partialize: (state) => ({ transactions: state.transactions }), // only persist history
    }
  )
);

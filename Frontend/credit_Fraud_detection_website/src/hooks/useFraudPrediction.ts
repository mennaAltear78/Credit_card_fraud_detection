import { useState, useCallback } from 'react';
import { useFraudStore } from '../store/fraudStore';
import type { TransactionPayload } from '../utils/randomTransaction';
import { generateRandomTransaction } from '../utils/randomTransaction';

const initialFormValues = (): TransactionPayload => {
  const defaults: TransactionPayload = {
    Time: 0,
    Amount: 0.0,
  };
  for (let i = 1; i <= 28; i++) {
    defaults[`V${i}`] = 0.0;
  }
  return defaults;
};

export const useFraudPrediction = () => {
  const [values, setValues] = useState<TransactionPayload>(initialFormValues);
  const [errors, setErrors] = useState<Partial<Record<keyof TransactionPayload, string>>>({});
  
  const predictTransaction = useFraudStore(state => state.predictTransaction);
  const loading = useFraudStore(state => state.loading);
  const storeError = useFraudStore(state => state.error);

  const handleInputChange = useCallback((key: keyof TransactionPayload, value: number) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
    // Clear validation error on change
    if (errors[key]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof TransactionPayload, string>> = {};
    
    if (values.Time < 0) {
      newErrors.Time = 'Time must be a non-negative number';
    }
    if (values.Amount < 0) {
      newErrors.Amount = 'Amount must be a non-negative number';
    }

    // Validate V1-V28 are valid numbers
    for (let i = 1; i <= 28; i++) {
      const key = `V${i}` as keyof TransactionPayload;
      if (isNaN(values[key])) {
        newErrors[key] = `${String(key)} must be a valid number`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const fillRandomValues = useCallback((type: 'safe' | 'fraud' | 'random' = 'random') => {
    const payload = generateRandomTransaction(type);
    setValues(payload);
    setErrors({});
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialFormValues());
    setErrors({});
  }, []);

  const submitForm = useCallback(async () => {
    if (!validate()) {
      throw new Error('Form validation failed');
    }
    return await predictTransaction(values);
  }, [values, validate, predictTransaction]);

  return {
    values,
    errors,
    loading,
    storeError,
    handleInputChange,
    fillRandomValues,
    resetForm,
    submitForm,
    setValues,
  };
};

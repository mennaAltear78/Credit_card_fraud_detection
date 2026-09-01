import type { TransactionPayload } from '../utils/randomTransaction';

export interface ModelStatistics {
  threshold: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  pr_auc: number;
  confusion_matrix: number[][];
}

export interface PredictionResponse {
  isFraud: boolean;
  riskScore: number; // 0 to 100
  threshold: number; // 0 to 100
  isSimulated: boolean;
  timestamp: string;
  error?: string;
  prediction?: string;
  propensity?: number;
  modelStatistics?: ModelStatistics;
}

/**
 * Client-side fallback prediction algorithm using logistic regression logic
 * on key PCA features to simulate actual model behavior when offline.
 */
export const simulatePrediction = (data: TransactionPayload): PredictionResponse => {
  // Key features and weights representing a typical fraud detection model
  // (Negative signs on negative-correlated features make their contribution positive when negative)
  const z = 
    -0.8 * data.V3 +
     0.7 * data.V4 +
    -0.9 * data.V9 +
    -1.2 * data.V10 +
     0.8 * data.V11 +
    -1.4 * data.V12 +
    -1.5 * data.V14 +
    -1.8 * data.V17 +
    -0.6 * data.V18 +
     0.002 * data.Amount - 1.5; // intercept

  // Sigmoid function
  const probability = 1 / (1 + Math.exp(-z));
  const threshold = 0.21; // 21% threshold as requested
  const riskScorePercentage = probability * 100;
  const isFraud = probability >= threshold;

  return {
    isFraud,
    riskScore: parseFloat(riskScorePercentage.toFixed(1)),
    threshold: threshold * 100,
    isSimulated: true,
    timestamp: new Date().toISOString(),
    prediction: isFraud ? 'froud' : 'no froud',
    propensity: probability,
    modelStatistics: {
      threshold: 0.21,
      accuracy: 0.9995,
      precision: 0.8673,
      recall: 0.8673,
      f1_score: 0.8673,
      roc_auc: 0.9622,
      pr_auc: 0.8582,
      confusion_matrix: [
        [56851, 13],
        [13, 85]
      ]
    }
  };
};

/**
 * Predicts whether a transaction is fraud by calling the backend API.
 * Falls back to client-side simulation if the backend is offline.
 */
export const predictTransaction = async (data: TransactionPayload): Promise<PredictionResponse> => {
  const url = 'https://credit-card-fraud-detection-menna78.vercel.app/predict';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API returned status code ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API Response data:', responseData);

    // Map properties from API response schema
    const isFraud = String(responseData.Prediction).toLowerCase().includes('froud') && 
                    !String(responseData.Prediction).toLowerCase().includes('no');
    
    const propensity = responseData.Propensity ?? 0;
    const riskScore = propensity * 100;
    
    const stats = responseData["Model Statistics"] ?? responseData.modelStatistics;
    const thresholdVal = stats?.threshold ?? 0.21;

    return {
      isFraud,
      riskScore: parseFloat(riskScore.toFixed(1)),
      threshold: thresholdVal * 100,
      isSimulated: false,
      timestamp: new Date().toISOString(),
      prediction: responseData.Prediction,
      propensity,
      modelStatistics: stats ? {
        threshold: stats.threshold,
        accuracy: stats.accuracy,
        precision: stats.precision,
        recall: stats.recall,
        f1_score: stats.f1_score,
        roc_auc: stats.roc_auc,
        pr_auc: stats.pr_auc,
        confusion_matrix: stats.confusion_matrix,
      } : undefined
    };
  } catch (error) {
    console.warn('API error encountered. Falling back to client simulation.', error);
    
    // Simulate prediction locally
    const simulated = simulatePrediction(data);
    simulated.error = error instanceof Error ? error.message : String(error);
    return simulated;
  }
};

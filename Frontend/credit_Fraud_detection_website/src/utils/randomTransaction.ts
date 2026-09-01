/**
 * Interface representing a credit card transaction payload.
 */
export interface TransactionPayload {
  Time: number;
  Amount: number;
  [key: string]: number; // V1 to V28
}

/**
 * Generates a realistic set of features for testing.
 * The PCA features V1-V28 are modeled based on distributions found in the Credit Card Fraud dataset.
 */
export const generateRandomTransaction = (type: 'safe' | 'fraud' | 'random' = 'random'): TransactionPayload => {
  const resolvedType = type === 'random' ? (Math.random() > 0.15 ? 'safe' : 'fraud') : type;
  const isFraud = resolvedType === 'fraud';

  const transaction: TransactionPayload = {
    Time: Math.floor(Math.random() * 172800), // Up to 48 hours in seconds
    Amount: isFraud 
      ? Math.random() > 0.5 
        ? Math.floor(Math.random() * 800) + 150  // Mid-to-high values
        : parseFloat((Math.random() * 10).toFixed(2)) // Tiny suspicious values
      : parseFloat((Math.random() * 120).toFixed(2)), // Standard amounts
  };

  // Generate V1 to V28
  for (let i = 1; i <= 28; i++) {
    const key = `V${i}`;
    let mean = 0;
    let stdDev = 1.0;

    // Distort specific variables for fraud transactions to trigger classifier response
    if (isFraud) {
      switch (i) {
        case 3: mean = -5.0; stdDev = 3.0; break;
        case 4: mean = 4.5; stdDev = 2.0; break; // V4 is strongly positive in fraud
        case 9: mean = -2.5; stdDev = 1.5; break;
        case 10: mean = -5.5; stdDev = 3.5; break; // V10 is strongly negative in fraud
        case 11: mean = 3.8; stdDev = 2.0; break; // V11 is positive in fraud
        case 12: mean = -6.0; stdDev = 4.0; break; // V12 is strongly negative in fraud
        case 14: mean = -7.0; stdDev = 4.0; break; // V14 is strongly negative in fraud
        case 16: mean = -4.0; stdDev = 2.5; break;
        case 17: mean = -8.0; stdDev = 5.0; break; // V17 is strongly negative in fraud
        case 18: mean = -3.0; stdDev = 2.0; break;
        default:
          mean = (Math.random() - 0.5) * 1.5;
          stdDev = 0.8 + Math.random();
      }
    } else {
      // Safe transactions: features clustered around 0
      mean = (Math.random() - 0.5) * 0.4;
      stdDev = 0.5 + Math.random() * 0.5;
    }

    // Box-Muller transform for normal distribution
    const u1 = Math.random() || 0.0001; // Avoid 0
    const u2 = Math.random();
    const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const value = mean + stdDev * randStdNormal;

    transaction[key] = parseFloat(value.toFixed(4));
  }

  return transaction;
};

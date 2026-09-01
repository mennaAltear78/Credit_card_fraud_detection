/**
 * Formats a numeric amount to a standard currency format (USD).
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Formats a risk score decimal (e.g. 0.943) or percentage (e.g. 94.3) to a readable percentage.
 */
export const formatScore = (score: number): string => {
  // If score is a fraction (e.g. 0.85), convert to percentage
  const percentage = score <= 1 && score > 0 ? score * 100 : score;
  return `${percentage.toFixed(1)}%`;
};

/**
 * Formats time in seconds elapsed into a human-readable duration format (e.g., 42h 12m 30s).
 */
export const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
};

/**
 * Formats a date string or timestamp into a readable date and time.
 */
export const formatDate = (dateInput: string | number | Date): string => {
  const date = new Date(dateInput);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Format a number as Vietnamese currency
 * @param {number} amount - Amount in VND
 * @returns {string} Formatted string, e.g. "49.600 ₫"
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '—';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Format a number as compact Vietnamese currency
 * @param {number} amount - Amount in VND
 * @returns {string} e.g. "85M" for 85000000
 */
export const formatCurrencyCompact = (amount) => {
  if (amount === null || amount === undefined) return '—';
  if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return formatCurrency(amount);
};

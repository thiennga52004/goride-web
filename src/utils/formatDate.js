/**
 * Format ISO date string to Vietnamese format
 * @param {string} isoString - ISO date string
 * @returns {string} e.g. "15/01/2024 10:30"
 */
export const formatDate = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format ISO date string to date only
 * @param {string} isoString - ISO date string
 * @returns {string} e.g. "15/01/2024"
 */
export const formatDateOnly = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format ISO date string to time only
 * @param {string} isoString - ISO date string
 * @returns {string} e.g. "10:30:00"
 */
export const formatTime = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

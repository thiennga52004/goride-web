/**
 * Format phone number for display
 * @param {string} phone - e.g. "0901234567"
 * @returns {string} e.g. "090 123 4567"
 */
export const formatPhone = (phone) => {
  if (!phone) return '—';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
};

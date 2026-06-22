/**
 * Validate Vietnamese phone number
 */
export const isValidPhone = (phone) => {
  return /^(0[3|5|7|8|9])[0-9]{8}$/.test(phone);
};

/**
 * Validate that a value is a positive number
 */
export const isPositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Validate surge multiplier (>= 1.0)
 */
export const isValidSurgeMultiplier = (value) => {
  const num = Number(value);
  return !isNaN(num) && num >= 1.0;
};

/**
 * Validate required field
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

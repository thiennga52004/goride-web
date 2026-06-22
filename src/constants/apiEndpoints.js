export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',

  // Admin - Users
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_STATUS: (userId) => `/admin/users/${userId}/status`,

  // Admin - Drivers
  ADMIN_DRIVER_APPROVAL: (driverId) => `/admin/drivers/${driverId}/approval`,

  // Admin - Trips
  ADMIN_TRIPS: '/admin/trips',

  // Admin - Stats
  ADMIN_STATS: '/admin/stats',

  // Admin - Pricing
  ADMIN_PRICING: '/admin/pricing',
  ADMIN_PRICING_UPDATE: (pricingConfigId) => `/admin/pricing/${pricingConfigId}`,

  // Public
  PRICING: '/pricing',
  BOOKING_DETAIL: (tripId) => `/bookings/${tripId}`,
};

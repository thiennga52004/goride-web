import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { mockTrips } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const tripService = {
  getTrips: async (params = {}) => {
    if (USE_MOCK) {
      let filtered = [...mockTrips];
      if (params.status) filtered = filtered.filter((t) => t.status === params.status);
      return {
        content: filtered.slice((params.page || 0) * (params.size || 10), ((params.page || 0) + 1) * (params.size || 10)),
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / (params.size || 10)),
        number: params.page || 0,
      };
    }
    return api.get(API_ENDPOINTS.ADMIN_TRIPS, { params });
  },

  getTripDetail: async (tripId) => {
    if (USE_MOCK) {
      return mockTrips.find((t) => t.id === tripId) || null;
    }
    return api.get(API_ENDPOINTS.BOOKING_DETAIL(tripId));
  },
};

import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { mockStats } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK_SERVICES === 'true';

export const statsService = {
  getStats: async (from, to) => {
    if (USE_MOCK) {
      return mockStats;
    }
    return api.get(API_ENDPOINTS.ADMIN_STATS, { params: { from, to } });
  },
};

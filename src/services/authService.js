import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { mockUsers } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const authService = {
  login: async (phone, password) => {
    if (USE_MOCK) {
      const admin = mockUsers.find((u) => u.role === 'ADMIN' && u.phone === phone);
      if (!admin) throw new Error('Sai thông tin đăng nhập');
      return {
        user: admin,
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      };
    }
    return api.post(API_ENDPOINTS.LOGIN, { phone, password });
  },

  refreshAccessToken: async (refreshToken) => {
    if (USE_MOCK) {
      return { accessToken: 'mock-access-token-refreshed-' + Date.now() };
    }
    return api.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
  },

  logout: async () => {
    if (USE_MOCK) return;
    return api.post(API_ENDPOINTS.LOGOUT);
  },
};

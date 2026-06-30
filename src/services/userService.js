import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { mockUsers } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK_SERVICES === 'true';

export const userService = {
  getUsers: async (params = {}) => {
    if (USE_MOCK) {
      let filtered = [...mockUsers];
      if (params.role) filtered = filtered.filter((u) => u.role === params.role);
      if (params.status) filtered = filtered.filter((u) => u.status === params.status);
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(
          (u) => u.name.toLowerCase().includes(s) || u.phone.includes(s)
        );
      }
      if (params.sortField) {
        const field = params.sortField;
        const dir = params.sortDirection === 'desc' ? -1 : 1;
        filtered.sort((a, b) => {
          const valA = a[field] ? String(a[field]).toLowerCase() : '';
          const valB = b[field] ? String(b[field]).toLowerCase() : '';
          if (valA < valB) return -1 * dir;
          if (valA > valB) return 1 * dir;
          return 0;
        });
      }
      return {
        content: filtered.slice((params.page || 0) * (params.size || 10), ((params.page || 0) + 1) * (params.size || 10)),
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / (params.size || 10)),
        number: params.page || 0,
      };
    }
    return api.get(API_ENDPOINTS.ADMIN_USERS, { params });
  },

  getUserById: async (userId) => {
    if (USE_MOCK) {
      return mockUsers.find((u) => u.id === userId) || null;
    }
    return api.get(`${API_ENDPOINTS.ADMIN_USERS}/${userId}`);
  },

  updateUserStatus: async (userId, status, reason = '') => {
    if (USE_MOCK) {
      const user = mockUsers.find((u) => u.id === Number(userId));
      if (user) {
        user.status = status;
      }
      return { success: true, message: `User ${userId} status updated to ${status}` };
    }
    return api.patch(API_ENDPOINTS.ADMIN_USER_STATUS(userId), { status, reason });
  },
};

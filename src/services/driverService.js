import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { mockPendingDrivers } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const driverService = {
  getPendingDrivers: async (params = {}) => {
    if (USE_MOCK) {
      return {
        content: mockPendingDrivers,
        totalElements: mockPendingDrivers.length,
        totalPages: 1,
        number: 0,
      };
    }
    return api.get(API_ENDPOINTS.ADMIN_USERS, {
      params: { ...params, role: 'DRIVER', approvalStatus: 'PENDING' },
    });
  },

  approveDriver: async (driverId, note = '') => {
    if (USE_MOCK) {
      const idx = mockPendingDrivers.findIndex((d) => d.id === Number(driverId));
      if (idx !== -1) {
        mockPendingDrivers.splice(idx, 1);
      }
      return { success: true, message: `Driver ${driverId} approved` };
    }
    return api.patch(API_ENDPOINTS.ADMIN_DRIVER_APPROVAL(driverId), {
      status: 'APPROVED',
      note,
    });
  },

  rejectDriver: async (driverId, note = '') => {
    if (USE_MOCK) {
      const idx = mockPendingDrivers.findIndex((d) => d.id === Number(driverId));
      if (idx !== -1) {
        mockPendingDrivers.splice(idx, 1);
      }
      return { success: true, message: `Driver ${driverId} rejected` };
    }
    return api.patch(API_ENDPOINTS.ADMIN_DRIVER_APPROVAL(driverId), {
      status: 'REJECTED',
      note,
    });
  },
};

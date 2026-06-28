import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { mockTrips } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const tripService = {
  getTrips: async (params = {}) => {
    if (USE_MOCK) {
      let filtered = [...mockTrips];
      if (params.status) filtered = filtered.filter((t) => t.status === params.status);
      if (params.passengerId) {
        filtered = filtered.filter((t) => t.passenger?.id === Number(params.passengerId));
      }
      if (params.driverId) {
        filtered = filtered.filter((t) => t.driver?.id === Number(params.driverId));
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.passenger?.name.toLowerCase().includes(s) ||
            (t.driver && t.driver.name.toLowerCase().includes(s))
        );
      }
      if (params.from) {
        filtered = filtered.filter((t) => t.requestedAt >= params.from);
      }
      if (params.to) {
        filtered = filtered.filter((t) => t.requestedAt <= params.to + 'T23:59:59.999Z');
      }
      if (params.sortField) {
        const field = params.sortField;
        const dir = params.sortDirection === 'desc' ? -1 : 1;
        filtered.sort((a, b) => {
          let valA = a[field];
          let valB = b[field];
          if (field === 'fare') {
            valA = a.actualFare || a.estimatedFare;
            valB = b.actualFare || b.estimatedFare;
          }
          const strA = valA ? String(valA).toLowerCase() : '';
          const strB = valB ? String(valB).toLowerCase() : '';
          if (strA < strB) return -1 * dir;
          if (strA > strB) return 1 * dir;
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
    return api.get(API_ENDPOINTS.ADMIN_TRIPS, { params });
  },

  getTripDetail: async (tripId) => {
    if (USE_MOCK) {
      return mockTrips.find((t) => t.id === tripId) || null;
    }
    return api.get(API_ENDPOINTS.BOOKING_DETAIL(tripId));
  },
};

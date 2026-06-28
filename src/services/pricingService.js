import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { mockPricingConfigs } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const pricingService = {
  getPricingConfigs: async () => {
    if (USE_MOCK) {
      return mockPricingConfigs;
    }
    return api.get(API_ENDPOINTS.PRICING);
  },

  updatePricingConfig: async (pricingConfigId, data) => {
    if (USE_MOCK) {
      const config = mockPricingConfigs.find((c) => c.id === Number(pricingConfigId));
      if (config) {
        Object.assign(config, data);
      }
      return { success: true, message: 'Pricing updated', data: config };
    }
    return api.put(API_ENDPOINTS.ADMIN_PRICING_UPDATE(pricingConfigId), data);
  },
};

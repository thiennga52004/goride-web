import { create } from 'zustand';

const useFilterStore = create((set) => ({
  dateRange: { from: null, to: null },
  search: '',
  status: '',
  role: '',

  setDateRange: (dateRange) => set({ dateRange }),
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setRole: (role) => set({ role }),
  resetFilters: () =>
    set({ dateRange: { from: null, to: null }, search: '', status: '', role: '' }),
}));

export default useFilterStore;

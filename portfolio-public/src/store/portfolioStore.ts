import { create } from 'zustand';
import { Portfolio } from '../types/index.js';

interface PortfolioStore {
  portfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;
  setPortfolio: (portfolio: Portfolio) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolio: null,
  isLoading: false,
  error: null,

  setPortfolio: (portfolio) => set({ portfolio, error: null }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  reset: () => set({ portfolio: null, isLoading: false, error: null }),
}));

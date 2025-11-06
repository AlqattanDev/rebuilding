import { create } from 'zustand';
import { DashboardState, PortfolioConfig, Notification } from '../types';

interface AppStore extends DashboardState {
  setCurrentPage: (page: DashboardState['currentPage']) => void;
  setCurrentPortfolio: (portfolio: PortfolioConfig | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentPortfolio: null,
  currentPage: 'dashboard',
  isLoading: false,
  error: null,
  notifications: [],

  setCurrentPage: (page) => set({ currentPage: page }),

  setCurrentPortfolio: (portfolio) => set({ currentPortfolio: portfolio }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        id: Date.now().toString(),
        ...notification,
      },
    ],
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),

  clearNotifications: () => set({ notifications: [] }),
}));

import { useEffect, useState } from 'react';
import { PortfolioService } from '../api/PortfolioService.js';
import { PortfolioConfig } from '../types/index.js';
import { useAppStore } from '../store/appStore.js';

export const usePortfolio = (portfolioId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentPortfolio, addNotification } = useAppStore();

  const fetchPortfolio = async () => {
    if (!portfolioId) return;

    try {
      setIsLoading(true);
      setError(null);
      const portfolio = await PortfolioService.getPortfolio(portfolioId);
      setCurrentPortfolio(portfolio);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load portfolio';
      setError(message);
      addNotification({
        type: 'error',
        message,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (portfolioId) {
      fetchPortfolio();
    }
  }, [portfolioId]);

  return { isLoading, error, refetch: fetchPortfolio };
};

export const usePortfolios = () => {
  const [portfolios, setPortfolios] = useState<PortfolioConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useAppStore();

  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await PortfolioService.getPortfolios();
      setPortfolios(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load portfolios';
      setError(message);
      addNotification({
        type: 'error',
        message,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return { portfolios, isLoading, error, refetch: fetchPortfolios };
};

export const useCreatePortfolio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useAppStore();

  const create = async (name: string, template: string): Promise<PortfolioConfig | null> => {
    try {
      setIsLoading(true);
      const portfolio = await PortfolioService.createPortfolio({ name, template });
      addNotification({
        type: 'success',
        message: 'Portfolio created successfully',
        duration: 3000,
      });
      return portfolio;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create portfolio';
      addNotification({
        type: 'error',
        message,
        duration: 5000,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading };
};

export const useUpdatePortfolio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification, setCurrentPortfolio } = useAppStore();

  const update = async (
    portfolioId: string,
    data: Partial<PortfolioConfig>
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updated = await PortfolioService.updatePortfolio(portfolioId, data);
      setCurrentPortfolio(updated);
      addNotification({
        type: 'success',
        message: 'Portfolio updated successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update portfolio';
      addNotification({
        type: 'error',
        message,
        duration: 5000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading };
};

export const useDeletePortfolio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useAppStore();

  const delete_ = async (portfolioId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await PortfolioService.deletePortfolio(portfolioId);
      addNotification({
        type: 'success',
        message: 'Portfolio deleted successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete portfolio';
      addNotification({
        type: 'error',
        message,
        duration: 5000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { delete: delete_, isLoading };
};

export const usePublishPortfolio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification, setCurrentPortfolio } = useAppStore();

  const publish = async (portfolioId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updated = await PortfolioService.publishPortfolio(portfolioId);
      setCurrentPortfolio(updated);
      addNotification({
        type: 'success',
        message: 'Portfolio published successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to publish portfolio';
      addNotification({
        type: 'error',
        message,
        duration: 5000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unpublish = async (portfolioId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updated = await PortfolioService.unpublishPortfolio(portfolioId);
      setCurrentPortfolio(updated);
      addNotification({
        type: 'success',
        message: 'Portfolio unpublished',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to unpublish portfolio';
      addNotification({
        type: 'error',
        message,
        duration: 5000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { publish, unpublish, isLoading };
};

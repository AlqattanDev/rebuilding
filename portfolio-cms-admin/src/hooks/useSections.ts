import { useState } from 'react';
import { PortfolioService } from '../api/PortfolioService.js';
import { SectionConfig } from '../types/index.js';
import { useAppStore } from '../store/appStore.js';

export const useSections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification, currentPortfolio, setCurrentPortfolio } = useAppStore();

  const updateSections = async (sections: SectionConfig[]) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      const updated = await PortfolioService.updateSections(currentPortfolio.id, sections);
      setCurrentPortfolio(updated);
      addNotification({
        type: 'success',
        message: 'Sections updated successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update sections';
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

  const toggleSection = async (sectionId: string, visible: boolean) => {
    if (!currentPortfolio) return false;

    const updated = currentPortfolio.sections.map((s) =>
      s.id === sectionId ? { ...s, visible } : s
    );

    return updateSections(updated);
  };

  const reorderSections = async (sections: SectionConfig[]) => {
    return updateSections(sections);
  };

  const updateSectionConfig = async (
    sectionId: string,
    config: Partial<SectionConfig>
  ) => {
    if (!currentPortfolio) return false;

    const updated = currentPortfolio.sections.map((s) =>
      s.id === sectionId ? { ...s, ...config } : s
    );

    return updateSections(updated);
  };

  return {
    updateSections,
    toggleSection,
    reorderSections,
    updateSectionConfig,
    isLoading,
  };
};

import { useState } from 'react';
import { PortfolioService } from '../api/PortfolioService.js';
import { Project, Skill, Experience } from '../types/index.js';
import { useAppStore } from '../store/appStore.js';

// Projects
export const useProjects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification, currentPortfolio, setCurrentPortfolio } = useAppStore();

  const addProject = async (data: Partial<Project>) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      const project = await PortfolioService.addProject(currentPortfolio.id, data);
      const updated = {
        ...currentPortfolio,
        projects: [...currentPortfolio.projects, project],
      };
      setCurrentPortfolio(updated);
      addNotification({
        type: 'success',
        message: 'Project added successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add project';
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

  const updateProject = async (projectId: string, data: Partial<Project>) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      const updated = await PortfolioService.updateProject(projectId, data);
      const newProjects = currentPortfolio.projects.map((p) =>
        p.id === projectId ? updated : p
      );
      setCurrentPortfolio({
        ...currentPortfolio,
        projects: newProjects,
      });
      addNotification({
        type: 'success',
        message: 'Project updated successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project';
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

  const deleteProject = async (projectId: string) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      await PortfolioService.deleteProject(projectId);
      const newProjects = currentPortfolio.projects.filter((p) => p.id !== projectId);
      setCurrentPortfolio({
        ...currentPortfolio,
        projects: newProjects,
      });
      addNotification({
        type: 'success',
        message: 'Project deleted successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project';
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

  return { addProject, updateProject, deleteProject, isLoading };
};

// Skills
export const useSkills = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification, currentPortfolio, setCurrentPortfolio } = useAppStore();

  const addSkill = async (data: Partial<Skill>) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      const skill = await PortfolioService.addSkill(currentPortfolio.id, data);
      const updated = {
        ...currentPortfolio,
        skills: [...currentPortfolio.skills, skill],
      };
      setCurrentPortfolio(updated);
      addNotification({
        type: 'success',
        message: 'Skill added successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add skill';
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

  const updateSkill = async (skillId: string, data: Partial<Skill>) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      const updated = await PortfolioService.updateSkill(skillId, data);
      const newSkills = currentPortfolio.skills.map((s) =>
        s.id === skillId ? updated : s
      );
      setCurrentPortfolio({
        ...currentPortfolio,
        skills: newSkills,
      });
      addNotification({
        type: 'success',
        message: 'Skill updated successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update skill';
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

  const deleteSkill = async (skillId: string) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      await PortfolioService.deleteSkill(skillId);
      const newSkills = currentPortfolio.skills.filter((s) => s.id !== skillId);
      setCurrentPortfolio({
        ...currentPortfolio,
        skills: newSkills,
      });
      addNotification({
        type: 'success',
        message: 'Skill deleted successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete skill';
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

  return { addSkill, updateSkill, deleteSkill, isLoading };
};

// Experience
export const useExperience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification, currentPortfolio, setCurrentPortfolio } = useAppStore();

  const addExperience = async (data: Partial<Experience>) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      const experience = await PortfolioService.addExperience(currentPortfolio.id, data);
      const updated = {
        ...currentPortfolio,
        experiences: [...currentPortfolio.experiences, experience],
      };
      setCurrentPortfolio(updated);
      addNotification({
        type: 'success',
        message: 'Experience added successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add experience';
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

  const updateExperience = async (experienceId: string, data: Partial<Experience>) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      const updated = await PortfolioService.updateExperience(experienceId, data);
      const newExperiences = currentPortfolio.experiences.map((e) =>
        e.id === experienceId ? updated : e
      );
      setCurrentPortfolio({
        ...currentPortfolio,
        experiences: newExperiences,
      });
      addNotification({
        type: 'success',
        message: 'Experience updated successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update experience';
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

  const deleteExperience = async (experienceId: string) => {
    if (!currentPortfolio) return false;

    try {
      setIsLoading(true);
      await PortfolioService.deleteExperience(experienceId);
      const newExperiences = currentPortfolio.experiences.filter(
        (e) => e.id !== experienceId
      );
      setCurrentPortfolio({
        ...currentPortfolio,
        experiences: newExperiences,
      });
      addNotification({
        type: 'success',
        message: 'Experience deleted successfully',
        duration: 3000,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete experience';
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

  return { addExperience, updateExperience, deleteExperience, isLoading };
};

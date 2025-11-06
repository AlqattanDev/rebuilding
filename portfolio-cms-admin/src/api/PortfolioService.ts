import client from './client.js';
import { ApiResponse, PortfolioConfig, Project, Skill, Experience, SectionConfig } from '../types/index.js';

export const PortfolioService = {
  // Portfolio CRUD
  async createPortfolio(data: {
    name: string;
    template: string;
  }): Promise<PortfolioConfig> {
    const response = await client.post<any, ApiResponse<PortfolioConfig>>(
      '/portfolios',
      data
    );
    return response.data!;
  },

  async getPortfolios(): Promise<PortfolioConfig[]> {
    const response = await client.get<any, ApiResponse<PortfolioConfig[]>>(
      '/portfolios'
    );
    return response.data || [];
  },

  async getPortfolio(id: string): Promise<PortfolioConfig> {
    const response = await client.get<any, ApiResponse<PortfolioConfig>>(
      `/portfolios/${id}`
    );
    return response.data!;
  },

  async updatePortfolio(
    id: string,
    data: Partial<PortfolioConfig>
  ): Promise<PortfolioConfig> {
    const response = await client.put<any, ApiResponse<PortfolioConfig>>(
      `/portfolios/${id}`,
      data
    );
    return response.data!;
  },

  async deletePortfolio(id: string): Promise<void> {
    await client.delete(`/portfolios/${id}`);
  },

  async publishPortfolio(id: string): Promise<PortfolioConfig> {
    const response = await client.post<any, ApiResponse<PortfolioConfig>>(
      `/portfolios/${id}/publish`
    );
    return response.data!;
  },

  async unpublishPortfolio(id: string): Promise<PortfolioConfig> {
    const response = await client.post<any, ApiResponse<PortfolioConfig>>(
      `/portfolios/${id}/unpublish`
    );
    return response.data!;
  },

  // Projects
  async addProject(
    portfolioId: string,
    data: Partial<Project>
  ): Promise<Project> {
    const response = await client.post<any, ApiResponse<Project>>(
      `/portfolios/${portfolioId}/projects`,
      data
    );
    return response.data!;
  },

  async updateProject(projectId: string, data: Partial<Project>): Promise<Project> {
    const response = await client.put<any, ApiResponse<Project>>(
      `/portfolios/projects/${projectId}`,
      data
    );
    return response.data!;
  },

  async deleteProject(projectId: string): Promise<void> {
    await client.delete(`/portfolios/projects/${projectId}`);
  },

  // Skills
  async addSkill(portfolioId: string, data: Partial<Skill>): Promise<Skill> {
    const response = await client.post<any, ApiResponse<Skill>>(
      `/portfolios/${portfolioId}/skills`,
      data
    );
    return response.data!;
  },

  async updateSkill(skillId: string, data: Partial<Skill>): Promise<Skill> {
    const response = await client.put<any, ApiResponse<Skill>>(
      `/portfolios/skills/${skillId}`,
      data
    );
    return response.data!;
  },

  async deleteSkill(skillId: string): Promise<void> {
    await client.delete(`/portfolios/skills/${skillId}`);
  },

  // Experience
  async addExperience(
    portfolioId: string,
    data: Partial<Experience>
  ): Promise<Experience> {
    const response = await client.post<any, ApiResponse<Experience>>(
      `/portfolios/${portfolioId}/experience`,
      data
    );
    return response.data!;
  },

  async updateExperience(
    experienceId: string,
    data: Partial<Experience>
  ): Promise<Experience> {
    const response = await client.put<any, ApiResponse<Experience>>(
      `/portfolios/experience/${experienceId}`,
      data
    );
    return response.data!;
  },

  async deleteExperience(experienceId: string): Promise<void> {
    await client.delete(`/portfolios/experience/${experienceId}`);
  },

  // Sections
  async updateSections(
    portfolioId: string,
    sections: SectionConfig[]
  ): Promise<PortfolioConfig> {
    const response = await client.put<any, ApiResponse<PortfolioConfig>>(
      `/portfolios/${portfolioId}/sections`,
      { sections }
    );
    return response.data!;
  },
};

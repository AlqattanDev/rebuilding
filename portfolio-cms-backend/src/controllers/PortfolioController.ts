import { Request, Response } from 'express';
import { PortfolioService } from '../services/PortfolioService.js';
import { AuthRequest } from '../middleware/auth.js';
import { ValidationError } from '../utils/errors.js';

export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  // Portfolio endpoints
  async createPortfolio(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const { name, template } = req.body;

    if (!name) {
      throw new ValidationError('Portfolio name required');
    }

    const portfolio = await this.portfolioService.createPortfolio(userId, {
      name,
      template: template || 'professional',
      title: '',
      bio: '',
      email: '',
    });

    res.status(201).json({
      success: true,
      data: portfolio,
    });
  }

  async getPortfolios(req: AuthRequest, res: Response) {
    const userId = req.userId!;

    const portfolios = await this.portfolioService.getPortfolios(userId);

    res.json({
      success: true,
      data: portfolios,
    });
  }

  async getPortfolio(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.userId!;

    const portfolio = await this.portfolioService.getPortfolioById(id, userId);

    res.json({
      success: true,
      data: portfolio,
    });
  }

  async getPublicPortfolio(req: Request, res: Response) {
    const { slug } = req.params;

    const portfolio = await this.portfolioService.getPortfolioBySlug(slug);

    res.json({
      success: true,
      data: portfolio,
    });
  }

  async updatePortfolio(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.userId!;

    const portfolio = await this.portfolioService.updatePortfolio(
      id,
      userId,
      req.body
    );

    res.json({
      success: true,
      data: portfolio,
    });
  }

  async deletePortfolio(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.userId!;

    await this.portfolioService.deletePortfolio(id, userId);

    res.json({
      success: true,
      message: 'Portfolio deleted',
    });
  }

  async publishPortfolio(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.userId!;

    const portfolio = await this.portfolioService.publishPortfolio(id, userId);

    res.json({
      success: true,
      data: portfolio,
    });
  }

  async unpublishPortfolio(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.userId!;

    const portfolio = await this.portfolioService.unpublishPortfolio(
      id,
      userId
    );

    res.json({
      success: true,
      data: portfolio,
    });
  }

  // Projects
  async addProject(req: AuthRequest, res: Response) {
    const { portfolioId } = req.params;
    const userId = req.userId!;
    const { title, description, image, tags, link } = req.body;

    if (!title) {
      throw new ValidationError('Project title required');
    }

    const project = await this.portfolioService.addProject(
      portfolioId,
      userId,
      {
        title,
        description,
        image,
        tags,
        link,
      }
    );

    res.status(201).json({
      success: true,
      data: project,
    });
  }

  async updateProject(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const userId = req.userId!;

    const project = await this.portfolioService.updateProject(
      projectId,
      userId,
      req.body
    );

    res.json({
      success: true,
      data: project,
    });
  }

  async deleteProject(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const userId = req.userId!;

    await this.portfolioService.deleteProject(projectId, userId);

    res.json({
      success: true,
      message: 'Project deleted',
    });
  }

  // Skills
  async addSkill(req: AuthRequest, res: Response) {
    const { portfolioId } = req.params;
    const userId = req.userId!;
    const { name, category, level, proficiency } = req.body;

    if (!name || !category) {
      throw new ValidationError('Skill name and category required');
    }

    const skill = await this.portfolioService.addSkill(portfolioId, userId, {
      name,
      category,
      level,
      proficiency,
    });

    res.status(201).json({
      success: true,
      data: skill,
    });
  }

  async updateSkill(req: AuthRequest, res: Response) {
    const { skillId } = req.params;
    const userId = req.userId!;

    const skill = await this.portfolioService.updateSkill(
      skillId,
      userId,
      req.body
    );

    res.json({
      success: true,
      data: skill,
    });
  }

  async deleteSkill(req: AuthRequest, res: Response) {
    const { skillId } = req.params;
    const userId = req.userId!;

    await this.portfolioService.deleteSkill(skillId, userId);

    res.json({
      success: true,
      message: 'Skill deleted',
    });
  }

  // Experience
  async addExperience(req: AuthRequest, res: Response) {
    const { portfolioId } = req.params;
    const userId = req.userId!;
    const { company, position, startDate, endDate, description, current } =
      req.body;

    if (!company || !position) {
      throw new ValidationError('Company and position required');
    }

    const experience = await this.portfolioService.addExperience(
      portfolioId,
      userId,
      {
        company,
        position,
        startDate,
        endDate,
        description,
        current,
      }
    );

    res.status(201).json({
      success: true,
      data: experience,
    });
  }

  async updateExperience(req: AuthRequest, res: Response) {
    const { experienceId } = req.params;
    const userId = req.userId!;

    const experience = await this.portfolioService.updateExperience(
      experienceId,
      userId,
      req.body
    );

    res.json({
      success: true,
      data: experience,
    });
  }

  async deleteExperience(req: AuthRequest, res: Response) {
    const { experienceId } = req.params;
    const userId = req.userId!;

    await this.portfolioService.deleteExperience(experienceId, userId);

    res.json({
      success: true,
      message: 'Experience deleted',
    });
  }

  // Sections
  async updateSections(req: AuthRequest, res: Response) {
    const { portfolioId } = req.params;
    const userId = req.userId!;
    const { sections } = req.body;

    if (!sections || !Array.isArray(sections)) {
      throw new ValidationError('Valid sections array required');
    }

    const portfolio = await this.portfolioService.updateSections(
      portfolioId,
      userId,
      sections
    );

    res.json({
      success: true,
      data: portfolio,
    });
  }
}

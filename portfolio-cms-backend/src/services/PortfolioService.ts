import { Repository } from 'typeorm';
import { Portfolio } from '../entities/Portfolio.js';
import { Project } from '../entities/Project.js';
import { Skill } from '../entities/Skill.js';
import { Experience } from '../entities/Experience.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';
import { v4 as uuidv4 } from 'uuid';

export class PortfolioService {
  constructor(
    private portfolioRepository: Repository<Portfolio>,
    private projectRepository: Repository<Project>,
    private skillRepository: Repository<Skill>,
    private experienceRepository: Repository<Experience>
  ) {}

  // Portfolio CRUD
  async createPortfolio(
    userId: string,
    data: Partial<Portfolio>
  ): Promise<Portfolio> {
    // Generate slug from name
    const slug =
      data.slug ||
      (data.name
        ?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '') || `portfolio-${uuidv4().substring(0, 8)}`);

    const portfolio = this.portfolioRepository.create({
      ...data,
      userId,
      slug,
      sections: this.getDefaultSections(),
    });

    return this.portfolioRepository.save(portfolio);
  }

  async getPortfolios(userId: string): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getPortfolioById(id: string, userId?: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
      relations: ['projects', 'skills', 'experiences', 'theme'],
    });

    if (!portfolio) {
      throw new NotFoundError('Portfolio');
    }

    if (userId && portfolio.userId !== userId) {
      throw new ForbiddenError('Access denied to this portfolio');
    }

    return portfolio;
  }

  async getPortfolioBySlug(slug: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { slug, published: true },
      relations: ['projects', 'skills', 'experiences', 'theme'],
    });

    if (!portfolio) {
      throw new NotFoundError('Portfolio');
    }

    // Increment views
    portfolio.views += 1;
    await this.portfolioRepository.save(portfolio);

    return portfolio;
  }

  async updatePortfolio(
    id: string,
    userId: string,
    data: Partial<Portfolio>
  ): Promise<Portfolio> {
    const portfolio = await this.getPortfolioById(id, userId);

    Object.assign(portfolio, data);
    return this.portfolioRepository.save(portfolio);
  }

  async deletePortfolio(id: string, userId: string): Promise<void> {
    const portfolio = await this.getPortfolioById(id, userId);
    await this.portfolioRepository.remove(portfolio);
  }

  async publishPortfolio(id: string, userId: string): Promise<Portfolio> {
    const portfolio = await this.getPortfolioById(id, userId);
    portfolio.published = true;
    return this.portfolioRepository.save(portfolio);
  }

  async unpublishPortfolio(id: string, userId: string): Promise<Portfolio> {
    const portfolio = await this.getPortfolioById(id, userId);
    portfolio.published = false;
    return this.portfolioRepository.save(portfolio);
  }

  // Projects
  async addProject(
    portfolioId: string,
    userId: string,
    data: Partial<Project>
  ): Promise<Project> {
    await this.getPortfolioById(portfolioId, userId);

    const project = this.projectRepository.create({
      ...data,
      portfolioId,
    });

    return this.projectRepository.save(project);
  }

  async updateProject(
    projectId: string,
    userId: string,
    data: Partial<Project>
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['portfolio'],
    });

    if (!project) {
      throw new NotFoundError('Project');
    }

    if (project.portfolio.userId !== userId) {
      throw new ForbiddenError('Access denied to this project');
    }

    Object.assign(project, data);
    return this.projectRepository.save(project);
  }

  async deleteProject(projectId: string, userId: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['portfolio'],
    });

    if (!project) {
      throw new NotFoundError('Project');
    }

    if (project.portfolio.userId !== userId) {
      throw new ForbiddenError('Access denied to this project');
    }

    await this.projectRepository.remove(project);
  }

  // Skills
  async addSkill(
    portfolioId: string,
    userId: string,
    data: Partial<Skill>
  ): Promise<Skill> {
    await this.getPortfolioById(portfolioId, userId);

    const skill = this.skillRepository.create({
      ...data,
      portfolioId,
    });

    return this.skillRepository.save(skill);
  }

  async updateSkill(
    skillId: string,
    userId: string,
    data: Partial<Skill>
  ): Promise<Skill> {
    const skill = await this.skillRepository.findOne({
      where: { id: skillId },
      relations: ['portfolio'],
    });

    if (!skill) {
      throw new NotFoundError('Skill');
    }

    if (skill.portfolio.userId !== userId) {
      throw new ForbiddenError('Access denied to this skill');
    }

    Object.assign(skill, data);
    return this.skillRepository.save(skill);
  }

  async deleteSkill(skillId: string, userId: string): Promise<void> {
    const skill = await this.skillRepository.findOne({
      where: { id: skillId },
      relations: ['portfolio'],
    });

    if (!skill) {
      throw new NotFoundError('Skill');
    }

    if (skill.portfolio.userId !== userId) {
      throw new ForbiddenError('Access denied to this skill');
    }

    await this.skillRepository.remove(skill);
  }

  // Experience
  async addExperience(
    portfolioId: string,
    userId: string,
    data: Partial<Experience>
  ): Promise<Experience> {
    await this.getPortfolioById(portfolioId, userId);

    const experience = this.experienceRepository.create({
      ...data,
      portfolioId,
    });

    return this.experienceRepository.save(experience);
  }

  async updateExperience(
    experienceId: string,
    userId: string,
    data: Partial<Experience>
  ): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { id: experienceId },
      relations: ['portfolio'],
    });

    if (!experience) {
      throw new NotFoundError('Experience');
    }

    if (experience.portfolio.userId !== userId) {
      throw new ForbiddenError('Access denied to this experience');
    }

    Object.assign(experience, data);
    return this.experienceRepository.save(experience);
  }

  async deleteExperience(experienceId: string, userId: string): Promise<void> {
    const experience = await this.experienceRepository.findOne({
      where: { id: experienceId },
      relations: ['portfolio'],
    });

    if (!experience) {
      throw new NotFoundError('Experience');
    }

    if (experience.portfolio.userId !== userId) {
      throw new ForbiddenError('Access denied to this experience');
    }

    await this.experienceRepository.remove(experience);
  }

  // Sections
  async updateSections(
    portfolioId: string,
    userId: string,
    sections: any[]
  ): Promise<Portfolio> {
    const portfolio = await this.getPortfolioById(portfolioId, userId);
    portfolio.sections = sections;
    return this.portfolioRepository.save(portfolio);
  }

  // Helper methods
  private getDefaultSections() {
    return [
      {
        id: uuidv4(),
        name: 'Hero',
        title: 'Hero Section',
        description: 'Main landing section',
        visible: true,
        order: 1,
        layout: 'grid' as const,
        paddingTop: 64,
        paddingBottom: 64,
        showAnimation: true,
        animation: 'fade-in' as const,
      },
      {
        id: uuidv4(),
        name: 'About',
        title: 'About Me',
        description: 'Introduction and background',
        visible: true,
        order: 2,
        layout: 'list' as const,
        paddingTop: 48,
        paddingBottom: 48,
        showAnimation: true,
        animation: 'slide-up' as const,
      },
      {
        id: uuidv4(),
        name: 'Projects',
        title: 'Portfolio Projects',
        description: 'Showcase your best work',
        visible: true,
        order: 3,
        layout: 'grid' as const,
        paddingTop: 48,
        paddingBottom: 48,
        showAnimation: true,
        animation: 'zoom-in' as const,
      },
      {
        id: uuidv4(),
        name: 'Skills',
        title: 'Technical Skills',
        description: 'Your expertise and proficiencies',
        visible: true,
        order: 4,
        layout: 'list' as const,
        paddingTop: 48,
        paddingBottom: 48,
        showAnimation: false,
      },
      {
        id: uuidv4(),
        name: 'Experience',
        title: 'Work Experience',
        description: 'Your career history',
        visible: true,
        order: 5,
        layout: 'timeline' as const,
        paddingTop: 48,
        paddingBottom: 48,
        showAnimation: true,
        animation: 'fade-in' as const,
      },
    ];
  }
}

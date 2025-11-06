import { Router, Request, Response } from 'express';
import { PortfolioController } from '../controllers/PortfolioController.js';
import { PortfolioService } from '../services/PortfolioService.js';
import { authenticate, optional } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import AppDataSource from '../config/database.js';
import { Portfolio } from '../entities/Portfolio.js';
import { Project } from '../entities/Project.js';
import { Skill } from '../entities/Skill.js';
import { Experience } from '../entities/Experience.js';

const router = Router();

const portfolioRepository = AppDataSource.getRepository(Portfolio);
const projectRepository = AppDataSource.getRepository(Project);
const skillRepository = AppDataSource.getRepository(Skill);
const experienceRepository = AppDataSource.getRepository(Experience);

const portfolioService = new PortfolioService(
  portfolioRepository,
  projectRepository,
  skillRepository,
  experienceRepository
);

const portfolioController = new PortfolioController(portfolioService);

// Protected routes - Portfolio management
router.post(
  '/',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.createPortfolio(req as any, res)
  )
);

router.get(
  '/',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.getPortfolios(req as any, res)
  )
);

router.get(
  '/:id',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.getPortfolio(req as any, res)
  )
);

router.put(
  '/:id',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.updatePortfolio(req as any, res)
  )
);

router.delete(
  '/:id',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.deletePortfolio(req as any, res)
  )
);

router.post(
  '/:id/publish',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.publishPortfolio(req as any, res)
  )
);

router.post(
  '/:id/unpublish',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.unpublishPortfolio(req as any, res)
  )
);

// Projects
router.post(
  '/:portfolioId/projects',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.addProject(req as any, res)
  )
);

router.put(
  '/projects/:projectId',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.updateProject(req as any, res)
  )
);

router.delete(
  '/projects/:projectId',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.deleteProject(req as any, res)
  )
);

// Skills
router.post(
  '/:portfolioId/skills',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.addSkill(req as any, res)
  )
);

router.put(
  '/skills/:skillId',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.updateSkill(req as any, res)
  )
);

router.delete(
  '/skills/:skillId',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.deleteSkill(req as any, res)
  )
);

// Experience
router.post(
  '/:portfolioId/experience',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.addExperience(req as any, res)
  )
);

router.put(
  '/experience/:experienceId',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.updateExperience(req as any, res)
  )
);

router.delete(
  '/experience/:experienceId',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.deleteExperience(req as any, res)
  )
);

// Sections
router.put(
  '/:portfolioId/sections',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.updateSections(req as any, res)
  )
);

// Public routes - View published portfolios
router.get(
  '/public/:slug',
  optional,
  asyncHandler((req: Request, res: Response) =>
    portfolioController.getPublicPortfolio(req, res)
  )
);

export default router;

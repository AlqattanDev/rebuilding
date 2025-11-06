import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { AuthService } from '../services/AuthService.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import AppDataSource from '../config/database.js';
import { User } from '../entities/User.js';

const router = Router();
const userRepository = AppDataSource.getRepository(User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Public routes
router.post(
  '/register',
  asyncHandler((req: Request, res: Response) =>
    authController.register(req, res)
  )
);

router.post(
  '/login',
  asyncHandler((req: Request, res: Response) =>
    authController.login(req, res)
  )
);

// Protected routes
router.get(
  '/profile',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    authController.getProfile(req as any, res)
  )
);

router.put(
  '/profile',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    authController.updateProfile(req as any, res)
  )
);

router.post(
  '/change-password',
  authenticate,
  asyncHandler((req: Request, res: Response) =>
    authController.changePassword(req as any, res)
  )
);

export default router;

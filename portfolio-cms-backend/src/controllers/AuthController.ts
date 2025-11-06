import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';
import { AuthRequest } from '../middleware/auth.js';
import { ValidationError } from '../utils/errors.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      throw new ValidationError('Missing required fields');
    }

    const { user, token } = await this.authService.register(
      email,
      password,
      firstName,
      lastName
    );

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
    });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Email and password required');
    }

    const { user, token } = await this.authService.login(email, password);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
    });
  }

  async getProfile(req: AuthRequest, res: Response) {
    const userId = req.userId!;

    const user = await this.authService.getUserById(userId);

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        plan: user.plan,
      },
    });
  }

  async updateProfile(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const { firstName, lastName, profileImage } = req.body;

    const user = await this.authService.updateProfile(userId, {
      firstName,
      lastName,
      profileImage,
    });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
      },
    });
  }

  async changePassword(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new ValidationError('Old and new password required');
    }

    await this.authService.changePassword(userId, oldPassword, newPassword);

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  }
}

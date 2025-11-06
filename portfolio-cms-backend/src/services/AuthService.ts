import { Repository } from 'typeorm';
import { User } from '../entities/User.js';
import {
  hashPassword,
  comparePassword,
  generateToken,
} from '../utils/auth.js';
import {
  ValidationError,
  ConflictError,
  UnauthorizedError,
} from '../utils/errors.js';

export class AuthService {
  constructor(private userRepository: Repository<User>) {}

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<{ user: User; token: string }> {
    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await this.userRepository.save(user);

    // Generate token
    const token = generateToken(user.id);

    return { user, token };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    // Find user
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is inactive');
    }

    // Generate token
    const token = generateToken(user.id);

    return { user, token };
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new ValidationError('User not found');
    }

    return user;
  }

  async updateProfile(
    userId: string,
    data: Partial<User>
  ): Promise<User> {
    const user = await this.getUserById(userId);

    // Prevent email update through profile
    delete data.email;
    delete data.password;

    Object.assign(user, data);
    await this.userRepository.save(user);

    return user;
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.getUserById(userId);

    // Verify old password
    const isPasswordValid = await comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid current password');
    }

    // Hash new password
    user.password = await hashPassword(newPassword);
    await this.userRepository.save(user);
  }
}

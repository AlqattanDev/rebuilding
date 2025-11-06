import client from './client.js';
import { ApiResponse } from '../types/index.js';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const AuthService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await client.post<any, ApiResponse<AuthResponse>>(
      '/auth/register',
      data
    );
    if (response.data) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      return response.data;
    }
    throw new Error('Registration failed');
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await client.post<any, ApiResponse<AuthResponse>>(
      '/auth/login',
      data
    );
    if (response.data) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      return response.data;
    }
    throw new Error('Login failed');
  },

  async getProfile(): Promise<User> {
    const response = await client.get<any, ApiResponse<User>>('/auth/profile');
    return response.data!;
  },

  async updateProfile(
    data: Partial<User>
  ): Promise<User> {
    const response = await client.put<any, ApiResponse<User>>(
      '/auth/profile',
      data
    );
    if (response.data) {
      localStorage.setItem('auth_user', JSON.stringify(response.data));
      return response.data;
    }
    throw new Error('Update failed');
  },

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await client.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },

  getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  getStoredUser(): User | null {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};

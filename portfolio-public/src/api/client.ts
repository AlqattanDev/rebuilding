import axios from 'axios';
import { ApiResponse, Portfolio } from '../types/index.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || 'An error occurred';
    throw new Error(message);
  }
);

export const portfolioApi = {
  // Get public portfolio by slug
  getPublicPortfolio: (slug: string): Promise<ApiResponse<Portfolio>> =>
    client.get(`/portfolios/public/${slug}`),

  // Get portfolio for authenticated user
  getPortfolio: (id: string): Promise<ApiResponse<Portfolio>> =>
    client.get(`/portfolios/${id}`),

  // Get all portfolios for user
  getPortfolios: (): Promise<ApiResponse<Portfolio[]>> =>
    client.get(`/portfolios`),
};

export default client;

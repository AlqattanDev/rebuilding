import 'reflect-metadata';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import 'dotenv/config';
import AppDataSource from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolios', portfolioRoutes);

// Documentation endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'Portfolio CMS API',
    version: '1.0.0',
    baseUrl: API_URL,
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
        updateProfile: 'PUT /api/auth/profile',
        changePassword: 'POST /api/auth/change-password',
      },
      portfolios: {
        list: 'GET /api/portfolios',
        create: 'POST /api/portfolios',
        get: 'GET /api/portfolios/:id',
        update: 'PUT /api/portfolios/:id',
        delete: 'DELETE /api/portfolios/:id',
        publish: 'POST /api/portfolios/:id/publish',
        unpublish: 'POST /api/portfolios/:id/unpublish',
        projects: {
          add: 'POST /api/portfolios/:portfolioId/projects',
          update: 'PUT /api/portfolios/projects/:projectId',
          delete: 'DELETE /api/portfolios/projects/:projectId',
        },
        skills: {
          add: 'POST /api/portfolios/:portfolioId/skills',
          update: 'PUT /api/portfolios/skills/:skillId',
          delete: 'DELETE /api/portfolios/skills/:skillId',
        },
        experience: {
          add: 'POST /api/portfolios/:portfolioId/experience',
          update: 'PUT /api/portfolios/experience/:experienceId',
          delete: 'DELETE /api/portfolios/experience/:experienceId',
        },
        sections: 'PUT /api/portfolios/:portfolioId/sections',
        publicPortfolio: 'GET /api/portfolios/public/:slug',
      },
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running at ${API_URL}`);
      console.log(`📚 API Documentation: ${API_URL}/api`);
      console.log(`❤️  Health check: ${API_URL}/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

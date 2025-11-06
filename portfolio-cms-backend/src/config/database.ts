import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import { Portfolio } from '../entities/Portfolio.js';
import { Project } from '../entities/Project.js';
import { Skill } from '../entities/Skill.js';
import { Experience } from '../entities/Experience.js';
import { Theme } from '../entities/Theme.js';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'portfolio_user',
  password: process.env.DB_PASSWORD || 'portfolio_password',
  database: process.env.DB_NAME || 'portfolio_cms',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Portfolio, Project, Skill, Experience, Theme],
  migrations: ['dist/migrations/*.js'],
  subscribers: [],
});

export default AppDataSource;

# 👨‍💻 Portfolio CMS - Developer Handbook
## Complete Guide for Developers Contributing to the Codebase

**Version:** 1.0.0
**Last Updated:** November 2025
**Target Audience:** Developers, Contributors, Maintainers
**Status:** Comprehensive Developer Documentation

---

## 📑 Table of Contents

1. [Project Structure](#project-structure)
2. [Development Setup](#development-setup)
3. [Architecture Overview](#architecture-overview)
4. [Backend Development](#backend-development)
5. [Frontend Development](#frontend-development)
6. [Database & ORM](#database--orm)
7. [API Integration](#api-integration)
8. [State Management](#state-management)
9. [Common Tasks](#common-tasks)
10. [Testing & Quality](#testing--quality)
11. [Deployment](#deployment)

---

## Project Structure

### Three-Service Architecture

```
rebuilding/
├── portfolio-cms-backend/          # Express.js + PostgreSQL API
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts         # TypeORM database config
│   │   ├── controllers/            # Business logic handlers
│   │   │   ├── AuthController.ts
│   │   │   └── PortfolioController.ts
│   │   ├── entities/               # Database models (6 total)
│   │   │   ├── User.ts
│   │   │   ├── Portfolio.ts
│   │   │   ├── Project.ts
│   │   │   ├── Skill.ts
│   │   │   ├── Experience.ts
│   │   │   └── Theme.ts
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.ts             # JWT authentication
│   │   │   └── errorHandler.ts     # Error handling
│   │   ├── routes/                 # API route definitions
│   │   │   ├── auth.ts
│   │   │   └── portfolio.ts
│   │   ├── services/               # Business logic
│   │   │   ├── AuthService.ts
│   │   │   └── PortfolioService.ts
│   │   ├── utils/                  # Utility functions
│   │   │   ├── auth.ts             # JWT & bcrypt
│   │   │   └── errors.ts           # Custom error classes
│   │   └── server.ts               # Express app setup
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── portfolio-cms-admin/            # React Admin Dashboard
│   ├── src/
│   │   ├── api/                    # HTTP client & services
│   │   │   ├── client.ts           # Axios instance
│   │   │   ├── AuthService.ts
│   │   │   └── PortfolioService.ts
│   │   ├── components/             # Reusable components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── NotificationCenter.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/                # React context
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/                  # Custom hooks
│   │   │   ├── useContent.ts
│   │   │   ├── usePortfolio.ts
│   │   │   └── useSections.ts
│   │   ├── pages/                  # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ContentManagement.tsx
│   │   │   ├── AppearanceCustomization.tsx
│   │   │   ├── SectionsManagement.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── LoginPage.tsx
│   │   ├── store/                  # Zustand state
│   │   │   └── appStore.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.ts
│
├── portfolio-public/               # React Public Portfolio Viewer
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── PortfolioService.ts
│   │   ├── components/             # Portfolio sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   └── PortfolioPage.tsx
│   │   ├── store/
│   │   │   └── portfolioStore.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.ts
│
└── documentation/
    ├── README.md
    ├── GETTING_STARTED_INTERACTIVE.md
    ├── FEATURES_GUIDE.md
    ├── DEVELOPER_HANDBOOK.md (this file)
    ├── CODEBASE_ANALYSIS.md
    ├── API_ENDPOINTS_REFERENCE.md
    ├── DEPLOYMENT_GUIDE.md
    └── ... (other docs)
```

**File Count:** 52 source files across 3 services

---

## Development Setup

### Prerequisites
```bash
node --version      # v18+ required
npm --version       # v8+ required
psql --version      # PostgreSQL 12+

# Verify PostgreSQL is running
psql -U postgres -c "SELECT version();"
```

### Initial Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd rebuilding

# 2. Backend setup
cd portfolio-cms-backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev

# 3. Frontend setup (new terminal)
cd portfolio-public
npm install
cp .env.example .env
npm run dev

# 4. Admin setup (new terminal)
cd portfolio-cms-admin
npm install
cp .env.example .env
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
PORT=9000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=portfolio_cms
NODE_ENV=development
JWT_SECRET=your-dev-secret-key
CORS_ORIGIN=http://localhost:9002,http://localhost:9001
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:9000/api
```

---

## Architecture Overview

### Three-Tier Architecture

```
┌─────────────────────┐
│   CLIENT LAYER      │
├─────────────────────┤
│  React Admin (9002) │  Admin Dashboard
│  React Public (9001)│  Portfolio Viewer
└──────────┬──────────┘
           │ HTTP/REST
┌──────────▼──────────┐
│   API LAYER         │
├─────────────────────┤
│  Express.js (9000)  │  REST API Server
│  31 Endpoints       │  Error Handling
│  Middleware         │  Validation
└──────────┬──────────┘
           │ SQL/TypeORM
┌──────────▼──────────┐
│   DATA LAYER        │
├─────────────────────┤
│  PostgreSQL DB      │  6 Database Entities
│  TypeORM ORM        │  Data Storage
└─────────────────────┘
```

### Request Flow

```
User Action in Admin
        ↓
React Component
        ↓
API Service (Axios)
        ↓
Express Route Handler
        ↓
AuthService / PortfolioService
        ↓
TypeORM Query
        ↓
PostgreSQL Database
        ↓
Response → (transform) → React State Update
```

---

## Backend Development

### Technology Stack
- **Runtime:** Node.js v18+
- **Framework:** Express.js v4.18
- **Language:** TypeScript
- **Database:** PostgreSQL 12+
- **ORM:** TypeORM v0.3
- **Auth:** JWT + bcryptjs
- **Validation:** Input validation middleware

### Database Entities

#### User Entity
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string; // bcrypt hashed

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', default: 'free' })
  plan: 'free' | 'pro' | 'enterprise';

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Portfolio, portfolio => portfolio.user)
  portfolios: Portfolio[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

#### Portfolio Entity
```typescript
@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar' })
  template: string;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @OneToMany(() => Project, project => project.portfolio)
  projects: Project[];

  @OneToMany(() => Skill, skill => skill.portfolio)
  skills: Skill[];

  @OneToMany(() => Experience, experience => experience.portfolio)
  experiences: Experience[];

  @ManyToOne(() => Theme)
  theme: Theme;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### API Route Structure

**File:** `src/routes/auth.ts`
```typescript
import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
const controller = new AuthController();

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.get('/profile', authMiddleware, (req, res) => controller.getProfile(req, res));
router.put('/profile', authMiddleware, (req, res) => controller.updateProfile(req, res));
router.post('/change-password', authMiddleware, (req, res) => controller.changePassword(req, res));

export default router;
```

**File:** `src/routes/portfolio.ts`
```typescript
import express from 'express';
import { PortfolioController } from '../controllers/PortfolioController';
import { authMiddleware, optionalAuth } from '../middleware/auth';

const router = express.Router();
const controller = new PortfolioController();

// Protected routes
router.get('/', authMiddleware, (req, res) => controller.getUserPortfolios(req, res));
router.post('/', authMiddleware, (req, res) => controller.createPortfolio(req, res));

// Public route
router.get('/public/:slug', optionalAuth, (req, res) => controller.getPublicPortfolio(req, res));

export default router;
```

### Creating New Endpoints

**Step 1:** Add controller method
```typescript
// In PortfolioController.ts
async exportAsJSON(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findOne({ where: { id } });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
}
```

**Step 2:** Add route
```typescript
// In routes/portfolio.ts
router.get('/:id/export', authMiddleware, (req, res) =>
  controller.exportAsJSON(req, res)
);
```

**Step 3:** Test endpoint
```bash
curl -X GET http://localhost:9000/api/portfolios/{id}/export \
  -H "Authorization: Bearer {token}"
```

### Authentication Flow

**JWT Token Generation:**
```typescript
// In AuthService.ts
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

**Token Verification:**
```typescript
// In middleware/auth.ts
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

## Frontend Development

### Technology Stack
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Animations:** Framer Motion

### Component Structure

**File:** `src/components/Sidebar.tsx`
```typescript
import React from 'react';
import { useAppStore } from '../store/appStore';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Portfolio CMS</h1>
        <p className="text-sm text-gray-400">{user?.firstName}</p>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-800"
        >
          Dashboard
        </button>
        {/* More menu items */}
      </nav>
    </aside>
  );
};
```

### API Service Pattern

**File:** `src/api/PortfolioService.ts`
```typescript
import { client } from './client';

export class PortfolioService {
  static async getPortfolios(token: string) {
    const response = await client.get('/portfolios', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  static async createPortfolio(token: string, data: any) {
    const response = await client.post('/portfolios', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  static async updatePortfolio(token: string, id: string, data: any) {
    const response = await client.put(`/portfolios/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
}
```

### Custom Hook Pattern

**File:** `src/hooks/usePortfolio.ts`
```typescript
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PortfolioService } from '../api/PortfolioService';

export const usePortfolio = (id: string) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const data = await PortfolioService.getPortfolio(token, id);
        setPortfolio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchPortfolio();
    }
  }, [id, token]);

  return { portfolio, loading, error };
};
```

### State Management with Zustand

**File:** `src/store/appStore.ts`
```typescript
import create from 'zustand';

interface AppStore {
  currentPage: string;
  currentPortfolioId: string | null;
  loading: boolean;
  error: string | null;
  setCurrentPage: (page: string) => void;
  setCurrentPortfolioId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentPage: 'dashboard',
  currentPortfolioId: null,
  loading: false,
  error: null,
  setCurrentPage: (page) => set({ currentPage: page }),
  setCurrentPortfolioId: (id) => set({ currentPortfolioId: id }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
```

### Creating New Pages

**Step 1:** Create page component
```typescript
// src/pages/ExportPage.tsx
import React from 'react';
import { useAppStore } from '../store/appStore';
import { PortfolioService } from '../api/PortfolioService';
import { useAuth } from '../context/AuthContext';

export const ExportPage: React.FC = () => {
  const { currentPortfolioId } = useAppStore();
  const { token } = useAuth();

  const handleExport = async () => {
    const data = await PortfolioService.exportPortfolio(token, currentPortfolioId);
    // Handle export
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Export Portfolio</h1>
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Export as JSON
      </button>
    </div>
  );
};
```

**Step 2:** Add route
```typescript
// In App.tsx
import { ExportPage } from './pages/ExportPage';

<Router>
  <Routes>
    <Route path="/export" element={<ExportPage />} />
    {/* Other routes */}
  </Routes>
</Router>
```

---

## Database & ORM

### TypeORM Setup

**File:** `src/config/database.ts`
```typescript
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Portfolio } from '../entities/Portfolio';
import { Project } from '../entities/Project';
import { Skill } from '../entities/Skill';
import { Experience } from '../entities/Experience';
import { Theme } from '../entities/Theme';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
  entities: [User, Portfolio, Project, Skill, Experience, Theme],
});
```

### Common Queries

**Find Single Record:**
```typescript
const user = await User.findOne({
  where: { id: userId }
});
```

**Find Multiple Records:**
```typescript
const portfolios = await Portfolio.find({
  where: { userId },
  relations: ['projects', 'skills', 'experiences']
});
```

**Create Record:**
```typescript
const portfolio = Portfolio.create({
  userId,
  name: 'My Portfolio',
  slug: 'my-portfolio',
  template: 'professional'
});
await portfolio.save();
```

**Update Record:**
```typescript
await Portfolio.update(
  { id: portfolioId },
  { published: true }
);
```

**Delete Record:**
```typescript
await Portfolio.delete({ id: portfolioId });
```

### Migrations

```bash
# Generate migration
npx typeorm migration:generate -n CreateUsersTable

# Run migrations
npm run typeorm migration:run

# Revert migration
npm run typeorm migration:revert
```

---

## API Integration

### Axios Instance Setup

**File:** `src/api/client.ts`
```typescript
import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Making API Calls

```typescript
// GET request
const data = await client.get('/portfolios');

// POST request with token
const response = await client.post('/portfolios', {
  name: 'New Portfolio'
}, {
  headers: { Authorization: `Bearer ${token}` }
});

// Error handling
try {
  const result = await client.get('/portfolios');
} catch (error) {
  console.error('Failed to fetch:', error.response?.data);
}
```

---

## State Management

### Context API for Auth

**File:** `src/context/AuthContext.tsx`
```typescript
import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const login = async (email: string, password: string) => {
    const response = await AuthService.login(email, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('authToken', response.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Zustand Store Usage

```typescript
import { useAppStore } from '../store/appStore';

export const MyComponent = () => {
  const { currentPage, setCurrentPage } = useAppStore();

  return (
    <button onClick={() => setCurrentPage('analytics')}>
      Go to {currentPage}
    </button>
  );
};
```

---

## Common Tasks

### Task 1: Add a New API Endpoint

1. Add controller method in `src/controllers/`
2. Add route in `src/routes/`
3. Add middleware if needed
4. Test with curl or Postman
5. Update API documentation

### Task 2: Create a New Database Entity

1. Create entity file in `src/entities/`
2. Add to DataSource in `config/database.ts`
3. Create migration: `npx typeorm migration:generate`
4. Run migration: `npm run typeorm migration:run`
5. Use in services

### Task 3: Add a New Admin Page

1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation in `Sidebar.tsx`
4. Connect to API service
5. Use Zustand for state

### Task 4: Fix a Bug

1. Identify the issue (frontend or backend)
2. Write minimal reproduction case
3. Add logging/debugging
4. Create fix
5. Test thoroughly
6. Update documentation if needed

---

## Testing & Quality

### Manual Testing Checklist

```
BACKEND TESTING:
☐ All API endpoints respond correctly
☐ Authentication tokens are generated
☐ Database queries return correct data
☐ Error handling works properly
☐ CORS headers are correct
☐ Input validation blocks invalid data

FRONTEND TESTING:
☐ Pages load without errors
☐ API calls succeed
☐ State updates correctly
☐ Navigation works
☐ Forms submit properly
☐ No console errors

INTEGRATION TESTING:
☐ Admin creates portfolio
☐ Portfolio data saved to DB
☐ Public view displays correctly
☐ Theme changes apply
☐ Publishing works
☐ Unpublishing works
```

### Future: Automated Testing

```typescript
// Example test structure (Jest)
describe('AuthService', () => {
  it('should register new user', async () => {
    const response = await AuthService.register({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    });

    expect(response.token).toBeDefined();
    expect(response.user.email).toBe('test@example.com');
  });
});
```

---

## Deployment

### Production Build

```bash
# Backend
cd portfolio-cms-backend
npm run build
npm start  # Runs compiled JavaScript

# Frontend
cd portfolio-cms-admin
npm run build  # Creates dist/ folder
npm run preview  # Preview production build
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=9000
DB_HOST=prod-db-host.example.com
DB_NAME=portfolio_cms_prod
JWT_SECRET=very-long-random-string
CORS_ORIGIN=https://yourdomain.com,https://admin.yourdomain.com
```

### Deployment Options

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Railway deployment
- Vercel deployment
- AWS deployment
- Docker deployment

---

## Code Style Guide

### TypeScript Best Practices

```typescript
// ✅ Good: Explicit types
const getUser = (id: string): Promise<User> => {
  // ...
};

// ❌ Avoid: Implicit any
const getUser = (id) => {
  // ...
};

// ✅ Good: Interface for shape
interface Portfolio {
  id: string;
  name: string;
  published: boolean;
}

// ❌ Avoid: Loose typing
const portfolio: any = { ... };
```

### React Best Practices

```typescript
// ✅ Good: Functional component with hooks
export const MyComponent: React.FC<Props> = ({ prop }) => {
  const [state, setState] = useState(null);
  return <div>{state}</div>;
};

// ❌ Avoid: Class components (unless needed)
class MyComponent extends React.Component { ... }
```

### Error Handling

```typescript
// ✅ Good: Specific error handling
try {
  await api.call();
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation
  } else if (error instanceof NotFoundError) {
    // Handle not found
  }
}

// ❌ Avoid: Generic catches
try {
  await api.call();
} catch (e) {
  console.log('Error occurred');
}
```

---

## Debugging Tips

### Backend Debugging

```bash
# Add logging
console.log('Debug info:', variable);

# Use debugger
node --inspect-brk dist/server.js
# Then open chrome://inspect

# Check database
psql -U postgres portfolio_cms
SELECT * FROM portfolios;
```

### Frontend Debugging

```typescript
// Add React DevTools browser extension
// Use console logs
console.log('State:', state);

// Check network tab in DevTools
// Check localStorage
localStorage.getItem('authToken');
```

---

## Resources

### Documentation Files
- [GETTING_STARTED_INTERACTIVE.md](./GETTING_STARTED_INTERACTIVE.md)
- [FEATURES_GUIDE.md](./FEATURES_GUIDE.md)
- [CODEBASE_ANALYSIS.md](./CODEBASE_ANALYSIS.md)
- [API_ENDPOINTS_REFERENCE.md](./API_ENDPOINTS_REFERENCE.md)

### External Resources
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [TypeORM Docs](https://typeorm.io/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

## Support & Contribution

### Getting Help
1. Check existing documentation
2. Review codebase comments
3. Check GitHub issues
4. Ask in discussions

### Contributing
1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Status:** Complete Developer Guide
**Validated:** Against codebase v1.0.0

# Portfolio CMS Backend API

Production-ready Node.js/Express backend for the Portfolio CMS platform with TypeORM database integration, JWT authentication, and comprehensive portfolio management.

## Features

✨ **Core Features**:
- User authentication with JWT tokens
- Portfolio creation and management
- Project portfolio showcase
- Skills and expertise tracking
- Work experience timeline
- Section configuration and customization
- Published/Draft portfolio states
- Role-based access control
- Comprehensive error handling

## Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing, Helmet for headers
- **Language**: TypeScript with strict mode
- **Additional**: CORS, compression, request logging with Morgan

## Project Structure

```
portfolio-cms-backend/
├── src/
│   ├── config/
│   │   └── database.ts         # TypeORM configuration
│   ├── controllers/
│   │   ├── AuthController.ts   # Authentication endpoints
│   │   └── PortfolioController.ts # Portfolio endpoints
│   ├── entities/
│   │   ├── User.ts             # User entity
│   │   ├── Portfolio.ts        # Portfolio entity
│   │   ├── Project.ts          # Project entity
│   │   ├── Skill.ts            # Skill entity
│   │   ├── Experience.ts       # Experience entity
│   │   └── Theme.ts            # Theme entity
│   ├── middleware/
│   │   ├── auth.ts             # JWT authentication
│   │   └── errorHandler.ts     # Error handling
│   ├── routes/
│   │   ├── auth.ts             # Auth routes
│   │   └── portfolio.ts        # Portfolio routes
│   ├── services/
│   │   ├── AuthService.ts      # Auth business logic
│   │   └── PortfolioService.ts # Portfolio business logic
│   ├── utils/
│   │   ├── auth.ts             # Auth utilities
│   │   └── errors.ts           # Custom error classes
│   └── server.ts               # Express app setup
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript config
├── .env.example               # Environment variables template
└── README.md                  # Documentation
```

## Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL 12+
- Basic understanding of REST APIs and JWT

## Installation

### 1. Clone and Install Dependencies

```bash
cd portfolio-cms-backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

**Key variables to set**:

```env
# Server
NODE_ENV=development
PORT=9000
API_URL=http://localhost:9000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=portfolio_user
DB_PASSWORD=portfolio_password
DB_NAME=portfolio_cms

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:9002,http://localhost:9001
```

### 3. Set Up Database

Make sure PostgreSQL is running:

```bash
# Create database (if not auto-created)
createdb portfolio_cms
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:9000`

### 5. Build for Production

```bash
npm run build
npm start
```

## API Documentation

### Base URL

```
http://localhost:9000/api
```

### Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

### Response Format

All responses follow this format:

```json
{
  "success": true/false,
  "data": { /* response data */ },
  "error": { /* error details if success is false */ }
}
```

---

## Authentication Endpoints

### Register

**POST** `/auth/register`

Creates a new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGc..."
  }
}
```

### Login

**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "eyJhbGc..."
  }
}
```

### Get Profile

**GET** `/auth/profile`

Returns the authenticated user's profile.

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "profileImage": "url",
    "plan": "pro"
  }
}
```

### Update Profile

**PUT** `/auth/profile`

Updates the authenticated user's profile.

**Headers**: `Authorization: Bearer <token>`

**Request**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "profileImage": "url"
}
```

### Change Password

**POST** `/auth/change-password`

Changes the authenticated user's password.

**Headers**: `Authorization: Bearer <token>`

**Request**:
```json
{
  "oldPassword": "currentPassword123",
  "newPassword": "newPassword123"
}
```

---

## Portfolio Endpoints

### Create Portfolio

**POST** `/portfolios`

Creates a new portfolio.

**Headers**: `Authorization: Bearer <token>`

**Request**:
```json
{
  "name": "My Portfolio",
  "template": "professional"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "My Portfolio",
    "slug": "my-portfolio",
    "template": "professional",
    "published": false,
    "views": 0,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get My Portfolios

**GET** `/portfolios`

Returns all portfolios owned by the authenticated user.

**Headers**: `Authorization: Bearer <token>`

### Get Portfolio

**GET** `/portfolios/:id`

Returns a specific portfolio.

**Headers**: `Authorization: Bearer <token>`

### Update Portfolio

**PUT** `/portfolios/:id`

Updates portfolio details.

**Headers**: `Authorization: Bearer <token>`

**Request**:
```json
{
  "title": "Full Stack Developer",
  "bio": "I build amazing web applications",
  "email": "john@example.com",
  "location": "San Francisco, CA"
}
```

### Delete Portfolio

**DELETE** `/portfolios/:id`

Deletes a portfolio and all associated content.

**Headers**: `Authorization: Bearer <token>`

### Publish Portfolio

**POST** `/portfolios/:id/publish`

Publishes a portfolio (makes it publicly visible).

**Headers**: `Authorization: Bearer <token>`

### Unpublish Portfolio

**POST** `/portfolios/:id/unpublish`

Unpublishes a portfolio (hides from public).

**Headers**: `Authorization: Bearer <token>`

---

## Projects

### Add Project

**POST** `/portfolios/:portfolioId/projects`

Adds a project to a portfolio.

**Request**:
```json
{
  "title": "E-commerce Platform",
  "description": "Full-stack e-commerce solution",
  "image": "image-url",
  "tags": ["React", "Node.js", "MongoDB"],
  "link": "https://example.com",
  "status": "published"
}
```

### Update Project

**PUT** `/portfolios/projects/:projectId`

Updates a project.

### Delete Project

**DELETE** `/portfolios/projects/:projectId`

Deletes a project.

---

## Skills

### Add Skill

**POST** `/portfolios/:portfolioId/skills`

Adds a skill to a portfolio.

**Request**:
```json
{
  "name": "React",
  "category": "Frontend",
  "level": "expert",
  "proficiency": 95
}
```

### Update Skill

**PUT** `/portfolios/skills/:skillId`

Updates a skill.

### Delete Skill

**DELETE** `/portfolios/skills/:skillId`

Deletes a skill.

---

## Experience

### Add Experience

**POST** `/portfolios/:portfolioId/experience`

Adds work experience to a portfolio.

**Request**:
```json
{
  "company": "Tech Corp",
  "position": "Senior Developer",
  "startDate": "2021-01-01",
  "endDate": null,
  "description": "Led development of multiple projects",
  "current": true
}
```

### Update Experience

**PUT** `/portfolios/experience/:experienceId`

Updates experience entry.

### Delete Experience

**DELETE** `/portfolios/experience/:experienceId`

Deletes experience entry.

---

## Sections

### Update Sections

**PUT** `/portfolios/:portfolioId/sections`

Updates the section configuration for a portfolio.

**Request**:
```json
{
  "sections": [
    {
      "id": "uuid",
      "name": "Hero",
      "title": "Hero Section",
      "visible": true,
      "order": 1,
      "layout": "grid",
      "paddingTop": 64,
      "paddingBottom": 64,
      "showAnimation": true,
      "animation": "fade-in"
    }
  ]
}
```

---

## Public Endpoints

### Get Public Portfolio

**GET** `/portfolios/public/:slug`

Retrieves a published portfolio by slug (no authentication required).

Automatically increments the view count.

---

## Error Handling

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| ValidationError | 400 | Invalid input data |
| UnauthorizedError | 401 | Missing or invalid authentication |
| ForbiddenError | 403 | Insufficient permissions |
| NotFoundError | 404 | Resource not found |
| ConflictError | 409 | Resource conflict (e.g., duplicate email) |
| InternalServerError | 500 | Server error |

### Error Response Example

```json
{
  "success": false,
  "error": {
    "message": "Email already registered",
    "code": "ConflictError"
  }
}
```

---

## Database Schema

### Users Table
- id (UUID, PK)
- email (VARCHAR, unique)
- password (VARCHAR, hashed)
- firstName (VARCHAR)
- lastName (VARCHAR)
- profileImage (VARCHAR, nullable)
- plan (VARCHAR: free|pro|enterprise)
- emailVerified (BOOLEAN)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Portfolios Table
- id (UUID, PK)
- userId (UUID, FK)
- name (VARCHAR)
- slug (VARCHAR, unique)
- template (VARCHAR: professional|creative|minimal|custom)
- title (TEXT)
- bio (TEXT)
- email (VARCHAR)
- location (VARCHAR, nullable)
- phone (VARCHAR, nullable)
- socials (JSONB)
- sections (JSONB array)
- published (BOOLEAN)
- views (INTEGER)
- themeId (UUID, FK nullable)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Projects Table
- id (UUID, PK)
- portfolioId (UUID, FK)
- title (VARCHAR)
- description (TEXT)
- image (VARCHAR, nullable)
- tags (TEXT array)
- link (VARCHAR, nullable)
- status (VARCHAR: published|draft)
- order (INTEGER)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Skills Table
- id (UUID, PK)
- portfolioId (UUID, FK)
- name (VARCHAR)
- category (VARCHAR)
- level (VARCHAR: beginner|intermediate|advanced|expert)
- proficiency (INTEGER: 0-100, nullable)
- order (INTEGER)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Experience Table
- id (UUID, PK)
- portfolioId (UUID, FK)
- company (VARCHAR)
- position (VARCHAR)
- startDate (DATE)
- endDate (DATE, nullable)
- description (TEXT)
- current (BOOLEAN)
- order (INTEGER)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Themes Table
- id (UUID, PK)
- name (VARCHAR)
- slug (VARCHAR, unique)
- description (TEXT)
- colors (JSONB)
- typography (JSONB)
- darkMode (BOOLEAN)
- spacing (INTEGER)
- borderRadius (INTEGER)
- customCSS (TEXT, nullable)
- isDefault (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

---

## Security Features

✅ **Implemented**:
- Password hashing with bcryptjs
- JWT token-based authentication
- CORS protection
- Helmet security headers
- SQL injection prevention (TypeORM)
- Input validation
- Error message sanitization
- Role-based access control

⚠️ **Recommended**:
- Use HTTPS in production
- Implement rate limiting
- Add request logging
- Use environment variables for secrets
- Regular security audits

---

## Deployment

### Using Railway

1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Set environment variables
4. Deploy

### Using Heroku

```bash
heroku login
heroku create app-name
git push heroku main
```

### Using Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

---

## Testing

Run tests:

```bash
npm test
```

With coverage:

```bash
npm test -- --coverage
```

---

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

---

## License

MIT License

---

## Support

For issues or questions, please open a GitHub issue or contact the team.

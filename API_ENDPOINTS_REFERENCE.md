# Portfolio CMS - API Endpoints Quick Reference

## BASE URL
```
http://localhost:3000/api
```

## AUTHENTICATION HEADER
```
Authorization: Bearer {token}
```

---

## AUTHENTICATION ENDPOINTS

### 1. User Registration
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}

Response 201:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response 200:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get User Profile
```http
GET /auth/profile
Authorization: Bearer {token}

Response 200:
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

### 4. Update User Profile
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "profileImage": "url"
}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "profileImage": "url"
  }
}
```

### 5. Change Password
```http
POST /auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "CurrentPassword123",
  "newPassword": "NewPassword456"
}

Response 200:
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## PORTFOLIO ENDPOINTS

### 1. Create Portfolio
```http
POST /portfolios
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "My Portfolio",
  "template": "professional"
}

Response 201:
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "My Portfolio",
    "slug": "my-portfolio",
    "template": "professional",
    "title": "",
    "bio": "",
    "email": "",
    "published": false,
    "views": 0,
    "projects": [],
    "skills": [],
    "experiences": []
  }
}
```

### 2. Get All User Portfolios
```http
GET /portfolios
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "My Portfolio",
      "slug": "my-portfolio",
      "template": "professional",
      "published": false,
      "views": 0
    }
  ]
}
```

### 3. Get Single Portfolio
```http
GET /portfolios/{portfolioId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "My Portfolio",
    "slug": "my-portfolio",
    "template": "professional",
    "title": "Full Stack Developer",
    "bio": "Experienced developer...",
    "email": "john@example.com",
    "location": "San Francisco",
    "phone": "+1 (555) 123-4567",
    "socials": {
      "github": "https://github.com/user",
      "linkedin": "https://linkedin.com/in/user",
      "twitter": "https://twitter.com/user"
    },
    "sections": [
      {
        "id": "1",
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
    ],
    "published": true,
    "views": 42,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-10T00:00:00Z"
  }
}
```

### 4. Update Portfolio
```http
PUT /portfolios/{portfolioId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Full Stack Developer",
  "bio": "Experienced in React, Node.js...",
  "email": "john@example.com",
  "location": "San Francisco",
  "phone": "+1 (555) 123-4567",
  "socials": {
    "github": "https://github.com/user",
    "linkedin": "https://linkedin.com/in/user"
  }
}

Response 200:
{
  "success": true,
  "data": { ... updated portfolio ... }
}
```

### 5. Delete Portfolio
```http
DELETE /portfolios/{portfolioId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Portfolio deleted"
}
```

### 6. Publish Portfolio
```http
POST /portfolios/{portfolioId}/publish
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": { ... portfolio with published: true ... }
}
```

### 7. Unpublish Portfolio
```http
POST /portfolios/{portfolioId}/unpublish
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": { ... portfolio with published: false ... }
}
```

### 8. Get Public Portfolio (By Slug)
```http
GET /portfolios/public/{slug}
Authorization: Bearer {token} (optional)

Response 200:
{
  "success": true,
  "data": { ... full portfolio data ... }
}
```

---

## PROJECT ENDPOINTS

### 1. Add Project to Portfolio
```http
POST /portfolios/{portfolioId}/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "A modern e-commerce solution built with React and Node.js",
  "image": "image-url",
  "tags": ["React", "Node.js", "MongoDB"],
  "link": "https://project-url.com"
}

Response 201:
{
  "success": true,
  "data": {
    "id": "uuid",
    "portfolioId": "uuid",
    "title": "E-commerce Platform",
    "description": "A modern e-commerce solution...",
    "image": "image-url",
    "tags": ["React", "Node.js", "MongoDB"],
    "link": "https://project-url.com",
    "githubLink": null,
    "status": "draft",
    "order": 0
  }
}
```

### 2. Update Project
```http
PUT /portfolios/projects/{projectId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "E-commerce Platform v2",
  "status": "published"
}

Response 200:
{
  "success": true,
  "data": { ... updated project ... }
}
```

### 3. Delete Project
```http
DELETE /portfolios/projects/{projectId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Project deleted"
}
```

---

## SKILL ENDPOINTS

### 1. Add Skill
```http
POST /portfolios/{portfolioId}/skills
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "React",
  "category": "Frontend",
  "level": "expert",
  "proficiency": 95
}

Response 201:
{
  "success": true,
  "data": {
    "id": "uuid",
    "portfolioId": "uuid",
    "name": "React",
    "category": "Frontend",
    "level": "expert",
    "proficiency": 95,
    "order": 0
  }
}
```

### 2. Update Skill
```http
PUT /portfolios/skills/{skillId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "proficiency": 98
}

Response 200:
{
  "success": true,
  "data": { ... updated skill ... }
}
```

### 3. Delete Skill
```http
DELETE /portfolios/skills/{skillId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Skill deleted"
}
```

---

## EXPERIENCE ENDPOINTS

### 1. Add Experience
```http
POST /portfolios/{portfolioId}/experience
Authorization: Bearer {token}
Content-Type: application/json

{
  "company": "Tech Corp",
  "position": "Senior Developer",
  "startDate": "2021-01-01",
  "endDate": null,
  "description": "Led development of multiple projects",
  "current": true
}

Response 201:
{
  "success": true,
  "data": {
    "id": "uuid",
    "portfolioId": "uuid",
    "company": "Tech Corp",
    "position": "Senior Developer",
    "startDate": "2021-01-01",
    "endDate": null,
    "description": "Led development of multiple projects",
    "current": true,
    "order": 0
  }
}
```

### 2. Update Experience
```http
PUT /portfolios/experience/{experienceId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "position": "Lead Engineer"
}

Response 200:
{
  "success": true,
  "data": { ... updated experience ... }
}
```

### 3. Delete Experience
```http
DELETE /portfolios/experience/{experienceId}
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Experience deleted"
}
```

---

## SECTION ENDPOINTS

### 1. Update Sections
```http
PUT /portfolios/{portfolioId}/sections
Authorization: Bearer {token}
Content-Type: application/json

{
  "sections": [
    {
      "id": "1",
      "name": "Hero",
      "title": "Hero Section",
      "visible": true,
      "order": 1,
      "layout": "grid",
      "paddingTop": 64,
      "paddingBottom": 64,
      "showAnimation": true,
      "animation": "fade-in"
    },
    {
      "id": "2",
      "name": "About",
      "title": "About Me",
      "visible": true,
      "order": 2,
      "layout": "list",
      "paddingTop": 48,
      "paddingBottom": 48,
      "showAnimation": true,
      "animation": "slide-up"
    }
  ]
}

Response 200:
{
  "success": true,
  "data": { ... updated portfolio with sections ... }
}
```

---

## UTILITY ENDPOINTS

### 1. Health Check
```http
GET /health

Response 200:
{
  "status": "ok",
  "timestamp": "2025-01-10T12:00:00.000Z",
  "uptime": 3600.123
}
```

### 2. API Documentation
```http
GET /api

Response 200:
{
  "name": "Portfolio CMS API",
  "version": "1.0.0",
  "baseUrl": "http://localhost:3000",
  "endpoints": { ... all endpoints ... }
}
```

---

## ERROR RESPONSES

### 400 - Bad Request
```json
{
  "success": false,
  "error": {
    "message": "Validation error description",
    "code": "VALIDATION_ERROR"
  }
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "error": {
    "message": "Authentication required",
    "code": "UNAUTHORIZED"
  }
}
```

### 409 - Conflict
```json
{
  "success": false,
  "error": {
    "message": "Email already registered",
    "code": "CONFLICT"
  }
}
```

### 500 - Server Error
```json
{
  "success": false,
  "error": {
    "message": "Internal server error",
    "code": "SERVER_ERROR"
  }
}
```

---

## PAGINATION (Future Implementation)

Currently, list endpoints return all items. In future:

```http
GET /portfolios?page=1&limit=10&sort=createdAt&order=desc
```

---

## FILTERING (Future Implementation)

```http
GET /portfolios?template=professional&published=true
GET /portfolios/{id}/projects?status=published
GET /portfolios/{id}/skills?category=Frontend
```

---

## RESPONSE TIMESTAMPS FORMAT

All timestamps are in ISO 8601 format (UTC):
```
2025-01-10T12:00:00.000Z
```

---

## TOKEN EXPIRATION

JWT tokens are issued without expiration in current implementation.
In production, implement:
- Token expiration time (e.g., 24 hours)
- Refresh token mechanism
- Token blacklist for logout

---

## RATE LIMITING (Not Implemented)

Recommended future implementation:
- 100 requests per 15 minutes per IP for public endpoints
- 1000 requests per 15 minutes per user for authenticated endpoints

---

## DATABASE CONSTRAINTS

- `email` (User): UNIQUE
- `slug` (Portfolio): UNIQUE
- `slug` (Theme): UNIQUE
- Foreign key relationships with ON DELETE CASCADE for portfolios


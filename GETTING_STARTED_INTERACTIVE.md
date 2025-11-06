# 🚀 Portfolio CMS - Getting Started Guide
## An Interactive Journey Through Setup, Configuration & Launch

**Version:** 1.0.0
**Last Updated:** November 2025
**Estimated Reading Time:** 15 minutes
**Difficulty:** Beginner-Friendly

---

## Table of Contents
1. [What You'll Build](#what-youll-build)
2. [Prerequisites Check](#prerequisites-check)
3. [Installation Journey](#installation-journey)
4. [Configuration Wizard](#configuration-wizard)
5. [Launching Your Services](#launching-your-services)
6. [Verification Checklist](#verification-checklist)
7. [Next Steps](#next-steps)

---

## What You'll Build

By the end of this guide, you'll have a **complete portfolio CMS** running locally with three services:

```
┌─────────────────────────────────────────────────────────┐
│         YOUR LOCAL PORTFOLIO CMS ECOSYSTEM               │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  🔧 Backend API Server           (http://localhost:9000) │
│     • REST API with 31 endpoints                         │
│     • PostgreSQL database                                │
│     • JWT authentication                                 │
│                                                           │
│  👨‍💼 Admin Dashboard              (http://localhost:9002) │
│     • Portfolio management                               │
│     • Content creation                                   │
│     • Theme customization                                │
│                                                           │
│  📱 Public Portfolio Viewer       (http://localhost:9001) │
│     • Beautiful portfolio display                        │
│     • Dynamic content rendering                          │
│     • Responsive design                                  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Prerequisites Check

Let's verify you have everything needed:

### Step 1: Check Node.js Installation
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v7 or higher
```

**Expected Output:**
```
v18.17.1  (or higher)
9.6.7     (or higher)
```

✅ **If you see version numbers:** Great! You're ready to proceed.
❌ **If command not found:** [Install Node.js](https://nodejs.org/)

---

### Step 2: Verify PostgreSQL Setup
```bash
psql --version  # Should show PostgreSQL version
```

**Expected Output:**
```
psql (PostgreSQL) 12.15
```

✅ **If you see a version:** PostgreSQL is installed.
❌ **If command not found:** [Install PostgreSQL](https://www.postgresql.org/download/)

---

### Step 3: Verify PostgreSQL is Running
```bash
# On macOS with Homebrew
brew services list | grep postgresql

# On Linux
systemctl status postgresql

# On Windows
pg_isready -h localhost
```

✅ **If service is active:** Perfect!
❌ **If not running:** Start PostgreSQL with `brew services start postgresql` (macOS)

---

### Step 4: Verify You Can Connect to PostgreSQL
```bash
psql -U postgres -c "SELECT version();"
```

**Expected Output:**
```
PostgreSQL 12.15 on x86_64-apple-darwin21.6.0
```

✅ **If you see the version:** PostgreSQL is accessible.
❌ **If authentication error:** Check your PostgreSQL password.

---

## Installation Journey

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/AlqattanDev/rebuilding.git
cd rebuilding

# Verify the structure
ls -la
```

**Expected files/directories:**
```
portfolio-cms-backend/
portfolio-cms-admin/
portfolio-public/
README.md
DEPLOYMENT_GUIDE.md
VERSION_SUMMARY.txt
... (and other documentation)
```

✅ **All directories present?** Proceed to Step 2.

---

### Step 2: Backend Setup (Express API + PostgreSQL)

```bash
cd portfolio-cms-backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

**Edit `.env` file** - Open it and verify these values:
```env
PORT=9000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres  # Change if your password is different
DB_NAME=portfolio_cms
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:9002,http://localhost:9001
```

**🔍 Key Things to Check:**
- ✅ `PORT=9000` (unique port for backend)
- ✅ `DB_HOST=localhost` (local database)
- ✅ `DB_USERNAME` and `DB_PASSWORD` match your PostgreSQL credentials
- ✅ `JWT_SECRET` is set (any string for development)

---

### Step 3: Public Frontend Setup (React Portfolio Viewer)

```bash
cd ../portfolio-public

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

**Edit `.env` file:**
```env
VITE_API_URL=http://localhost:9000/api
```

**🔍 Key Things to Check:**
- ✅ API URL points to backend on port 9000
- ✅ No trailing slash at the end

---

### Step 4: Admin Dashboard Setup (React Admin)

```bash
cd ../portfolio-cms-admin

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

**Edit `.env` file:**
```env
VITE_API_URL=http://localhost:9000/api
```

**🔍 Key Things to Check:**
- ✅ API URL points to backend on port 9000
- ✅ Same URL as public frontend

---

## Configuration Wizard

### Database Setup

Before launching services, ensure the PostgreSQL database exists:

```bash
# Connect to PostgreSQL
psql -U postgres

# Inside psql prompt, create database
CREATE DATABASE portfolio_cms;

# Verify creation
\l | grep portfolio_cms

# Exit
\q
```

**Expected output:**
```
postgres=# CREATE DATABASE
postgres=# portfolio_cms | ... (showing database exists)
```

✅ **Database created successfully?** Ready to launch services!

---

## Launching Your Services

### Setup: Terminal Windows

You'll need **3 terminal windows** (or use tmux/screen). Here's the recommended approach:

```bash
# Terminal 1: Backend
cd portfolio-cms-backend && npm run dev

# Terminal 2: Public Frontend
cd portfolio-public && npm run dev

# Terminal 3: Admin Dashboard
cd portfolio-cms-admin && npm run dev
```

---

### Option 1: Launch Services Sequentially

**Terminal 1 - Backend (Port 9000)**
```bash
cd portfolio-cms-backend
npm run dev
```

**Expected output:**
```
> portfolio-cms-backend@1.0.0 dev
> ts-node-dev --respawn src/server.ts

[INFO] Listening on port 9000
[INFO] Database connected successfully
API running at http://localhost:9000
```

✅ **See "listening on port 9000"?** Backend is ready!
❌ **Database connection error?** Check PostgreSQL is running and credentials are correct.

---

**Terminal 2 - Public Frontend (Port 9001)**
```bash
cd portfolio-public
npm run dev
```

**Expected output:**
```
VITE v4.3.9  ready in 234 ms

➜  Local:   http://localhost:9001/
➜  press h to show help
```

✅ **See "Local: http://localhost:9001"?** Frontend is ready!

---

**Terminal 3 - Admin Dashboard (Port 9002)**
```bash
cd portfolio-cms-admin
npm run dev
```

**Expected output:**
```
VITE v4.3.9  ready in 245 ms

➜  Local:   http://localhost:9002/
➜  press h to show help
```

✅ **See "Local: http://localhost:9002"?** Admin is ready!

---

### Option 2: Launch All at Once (Advanced)

If you're comfortable with npm scripts:

```bash
# From root directory
npm install -g concurrently

# Create a root package.json with:
{
  "scripts": {
    "dev": "concurrently \"cd portfolio-cms-backend && npm run dev\" \"cd portfolio-cms-admin && npm run dev\" \"cd portfolio-public && npm run dev\""
  }
}

# Then just run
npm run dev
```

---

## Verification Checklist

### ✅ Pre-Launch Verification

Before visiting the services, verify everything is working:

```bash
# Test Backend API Health
curl http://localhost:9000/health

# Expected response:
# {"status":"ok"}
```

```bash
# Test API is responding
curl http://localhost:9000/api

# Expected response:
# {"message":"Portfolio CMS API v1.0.0"}
```

---

### 📋 Service Verification

| Service | URL | Status | Endpoint |
|---------|-----|--------|----------|
| Backend | http://localhost:9000 | Running | `/health` ✅ |
| Admin | http://localhost:9002 | Running | `/` ✅ |
| Public | http://localhost:9001 | Running | `/` ✅ |

---

### 🔐 First-Time User Testing

**Step 1: Create an Account**
1. Go to **http://localhost:9002** (Admin Dashboard)
2. Look for "Sign Up" or "Register"
3. Enter:
   - Email: `test@example.com`
   - Password: `TestPassword123`
   - First Name: `John`
   - Last Name: `Doe`
4. Click "Register"

**Expected:** You're logged in and see the dashboard

---

**Step 2: Create Your First Portfolio**
1. Click "Create Portfolio" or "New Portfolio"
2. Enter:
   - Portfolio Name: `My Portfolio`
   - Template: `Professional`
3. Click "Create"

**Expected:** Portfolio is created and you're in the editor

---

**Step 3: View Your Portfolio**
1. Click "Publish" to publish the portfolio
2. Get the portfolio slug (usually something like `/my-portfolio`)
3. Go to **http://localhost:9001/my-portfolio** (Public Frontend)

**Expected:** You see your portfolio displayed beautifully

---

## Verification Checklist

Use this checklist to ensure everything is working:

```
INSTALLATION & SETUP
☐ Node.js version 16+ installed
☐ PostgreSQL running and accessible
☐ All three services cloned and dependencies installed
☐ .env files created in all three services
☐ Database "portfolio_cms" created
☐ All three services running on correct ports

API VERIFICATION
☐ Backend responding on :9000
☐ /health endpoint returns {"status":"ok"}
☐ /api endpoint responds with version info

UI VERIFICATION
☐ Admin Dashboard loads on :9002
☐ Public Frontend loads on :9001
☐ Can register new user
☐ Can create portfolio
☐ Can view published portfolio

CONNECTIVITY
☐ Admin can communicate with Backend API
☐ Public Frontend can fetch portfolio data
☐ No CORS errors in browser console
☐ No database connection errors in terminal
```

---

## Troubleshooting Common Issues

### 1. "Port Already in Use"
```
Error: listen EADDRINUSE: address already in use :::9000
```

**Solution:** Change the port in .env or kill the existing process:
```bash
# Find process using port 9000
lsof -i :9000

# Kill it
kill -9 <PID>

# Or change port in .env and restart
```

---

### 2. "Database Connection Error"
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:** Ensure PostgreSQL is running:
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
net start PostgreSQL
```

---

### 3. "Role Does Not Exist"
```
Error: role "postgres" does not exist
```

**Solution:** Update .env with correct username:
```bash
# Check your PostgreSQL username
psql -U postgres -c "SELECT current_user;"

# Update .env accordingly
```

---

### 4. "CORS Errors"
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:** Ensure CORS_ORIGIN in backend .env includes frontend URLs:
```env
CORS_ORIGIN=http://localhost:9002,http://localhost:9001
```

---

### 5. "Cannot Find Module"
```
Error: Cannot find module 'express'
```

**Solution:** Reinstall dependencies:
```bash
# In the service directory
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

### 🎯 Immediate Next Steps (30 minutes)
1. ✅ Complete this Getting Started guide
2. ✅ Verify all three services are running
3. ✅ Create your first test portfolio
4. ✅ View it on the public frontend

### 📚 Learning Path (2-3 hours)
- Read **[FEATURES_GUIDE.md](./FEATURES_GUIDE.md)** - Explore all features
- Read **[SETUP_AND_CONFIGURATION.md](./SETUP_AND_CONFIGURATION.md)** - Deep dive into setup
- Read **[DEVELOPER_HANDBOOK.md](./DEVELOPER_HANDBOOK.md)** - For developers

### 🚀 Development Milestones (1-2 weeks)
- Complete [NEXT_PHASE.md](./NEXT_PHASE.md) checklist for v1.1
- Add missing features (file uploads, email verification)
- Set up automated tests
- Prepare for production deployment

### 📦 Production Deployment (2-4 weeks)
- Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Choose hosting platform (Railway recommended)
- Set up monitoring and backups
- Configure custom domain

---

## Support & Help

**Still stuck?** Check these resources:

- 📖 [README.md](./README.md) - Project overview
- 🔧 [CODEBASE_ANALYSIS.md](./CODEBASE_ANALYSIS.md) - Technical deep dive
- 📡 [API_ENDPOINTS_REFERENCE.md](./API_ENDPOINTS_REFERENCE.md) - API documentation
- 🚀 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Production setup

---

## Quick Command Reference

```bash
# Clone and navigate
git clone https://github.com/AlqattanDev/rebuilding.git
cd rebuilding

# Backend
cd portfolio-cms-backend && npm install && npm run dev

# Public Frontend (new terminal)
cd portfolio-public && npm install && npm run dev

# Admin Dashboard (new terminal)
cd portfolio-cms-admin && npm install && npm run dev

# Access your services
# Backend API:      http://localhost:9000
# Admin Dashboard:  http://localhost:9002
# Public Frontend:  http://localhost:9001
```

---

**Happy Building! 🎉**

You now have a fully functional Portfolio CMS ready for development and customization.

*Questions? Check the [FAQ section](./README.md#-getting-help) in the main README.*

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Validated Against:** Codebase v1.0.0
**Status:** Production Ready

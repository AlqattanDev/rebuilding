# Portfolio CMS - Production Deployment Guide

**Version:** 1.0.0
**Status:** Ready for deployment

---

## Pre-Deployment Checklist

### Code & Security
- [x] TypeScript compilation successful
- [x] No console.logs or debug code
- [x] Environment variables configured
- [x] Error handling implemented
- [x] Input validation in place
- [ ] Security audit completed
- [ ] Penetration testing completed
- [ ] HTTPS certificate obtained

### Infrastructure
- [ ] Cloud hosting account (AWS, Railway, Heroku)
- [ ] PostgreSQL database provisioned
- [ ] Redis cache (optional, for scaling)
- [ ] CDN configured (optional)
- [ ] Domain registered and configured
- [ ] SSL certificate installed
- [ ] Backups configured
- [ ] Monitoring/logging setup (Sentry, DataDog, etc.)

### Operations
- [ ] Database backup strategy
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Support process defined
- [ ] Incident response plan
- [ ] Team documentation

---

## Deployment Options

### Option 1: Railway (Recommended for Beginners)

**Pros:** Easy, includes PostgreSQL, automatic SSL, good free tier
**Cost:** Free tier available, paid plans start at $5/month

```bash
# 1. Sign up at railway.app
# 2. Connect GitHub repository
# 3. Configure environment variables
# 4. Deploy with one click

# Backend (.env)
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production

# Frontend (.env)
VITE_API_URL=https://api.yourdomain.com
```

### Option 2: Vercel (Frontend), Railway (Backend)

**Frontend (Vercel):**
```bash
npm install -g vercel
cd portfolio-cms-admin
vercel
# Deploy admin dashboard

cd ../portfolio-public
vercel
# Deploy public frontend
```

**Backend (Railway):**
- Same as Option 1 above

### Option 3: AWS (Production Scale)

**Services:**
- EC2 for Node.js backend
- RDS for PostgreSQL
- CloudFront for CDN
- S3 for static assets
- ALB for load balancing
- Lambda for serverless functions

**Estimated Setup Time:** 4-6 hours

### Option 4: Docker + Kubernetes

**For scaling to 1000+ users**

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 9000
CMD ["npm", "start"]
```

Deploy on:
- Docker Hub + AWS ECS
- DigitalOcean Kubernetes
- Google Cloud Run
- AWS EKS

---

## Step-by-Step Deployment (Railway)

### 1. Prepare Repository

```bash
# Ensure all changes committed
git status
git add .
git commit -m "Ready for production deployment"
```

### 2. Create Railway Project

1. Visit https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect repository

### 3. Configure Environment Variables

**Backend Service (.env):**
```env
NODE_ENV=production
PORT=9000
API_URL=https://api.yourdomain.com
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}
JWT_SECRET=generate-secure-random-string
CORS_ORIGIN=https://yourdomain.com,https://admin.yourdomain.com
```

**Public Frontend (.env):**
```env
VITE_API_URL=https://api.yourdomain.com/api
```

**Admin Dashboard (.env):**
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### 4. Configure Build Commands

**Backend:**
```
Build Command: npm run build
Start Command: npm start
```

**Frontend (Admin & Public):**
```
Build Command: npm run build
Start Command: npm run preview
```

### 5. Add PostgreSQL Database

1. In Railway project, click "Add Service"
2. Select PostgreSQL
3. Database automatically connected to backend

### 6. Configure Custom Domains

```
Backend:  api.yourdomain.com
Public:   www.yourdomain.com or yourdomain.com
Admin:    admin.yourdomain.com or dashboard.yourdomain.com
```

### 7. Deploy

Click "Deploy" button. Railway handles:
- Building code
- Running tests
- Deploying services
- Setting up SSL/TLS

---

## Post-Deployment Setup

### 1. Run Database Migrations

```bash
# Connect to production database
npm run typeorm migration:run -- -d dist/config/database.js
```

### 2. Verify All Services

```bash
# Test backend API
curl https://api.yourdomain.com/health

# Check frontend loads
curl https://yourdomain.com

# Check admin loads
curl https://admin.yourdomain.com
```

### 3. Setup Monitoring

**Install Sentry (Error Tracking):**

```bash
npm install @sentry/node
```

Backend integration:
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

app.use(Sentry.Handlers.requestHandler());
// ... routes ...
app.use(Sentry.Handlers.errorHandler());
```

### 4. Setup Backup Strategy

**Daily Database Backups:**
- Railway: Automatic daily backups
- AWS RDS: Enable automated backups
- Manual backups: Daily pg_dump to S3

```bash
# Manual backup script
pg_dump $DATABASE_URL > backups/portfolio_$(date +%Y%m%d).sql
```

### 5. Configure Rate Limiting

Add to backend:

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 6. Setup SSL/TLS

Railway and Vercel handle this automatically with free Let's Encrypt certificates.

For custom servers:
```bash
# Using certbot for Let's Encrypt
certbot certonly --standalone -d api.yourdomain.com -d yourdomain.com
```

---

## Production Environment Variables

### Backend (.env.production)
```env
NODE_ENV=production
PORT=9000
API_URL=https://api.yourdomain.com
DB_HOST=prod-postgres-host
DB_PORT=5432
DB_USERNAME=prod_user
DB_PASSWORD=secure-generated-password
DB_NAME=portfolio_cms_prod
JWT_SECRET=long-random-secure-string
CORS_ORIGIN=https://yourdomain.com,https://admin.yourdomain.com
LOG_LEVEL=info
SENTRY_DSN=https://your-sentry-dsn
```

### Frontend (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### Admin (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## Scaling Considerations

### For 100-1,000 Users
- Single instance backend sufficient
- RDS multi-AZ for reliability
- CloudFront CDN for static assets

### For 1,000-10,000 Users
- Load balancer (ALB, API Gateway)
- Auto-scaling group for backend
- Redis cache for sessions
- Read replicas for database

### For 10,000+ Users
- Kubernetes cluster (EKS, GKE)
- Distributed database (Aurora, Spanner)
- CDN for all assets
- Microservices architecture
- Queue system (SQS, RabbitMQ)

---

## Monitoring & Alerts

### Key Metrics to Monitor
- API response time (target: <200ms)
- Database query time (target: <100ms)
- Error rate (target: <0.1%)
- Server CPU usage (target: <70%)
- Memory usage (target: <80%)
- Disk usage (target: <80%)
- Database connections (target: <80% of max)

### Alert Thresholds
- Error rate > 1%
- Response time > 500ms
- CPU > 80%
- Memory > 90%
- Disk > 90%

---

## Troubleshooting

### Database Connection Errors
```
Error: role "portfolio_user" does not exist
→ Use postgres superuser or create user
```

### CORS Errors
```
Access-Control-Allow-Origin error
→ Update CORS_ORIGIN env var with correct domains
→ Restart backend service
```

### Port Already in Use
```
Error: listen EADDRINUSE
→ Change PORT in .env
→ Or kill process: kill -9 $(lsof -t -i:9000)
```

### SSL Certificate Errors
```
Error: SSL certificate problem
→ Railway/Vercel auto-renew certificates
→ Manual: Run certbot renew
```

---

## Security Checklist for Production

- [x] HTTPS/TLS enabled
- [ ] Rate limiting configured
- [ ] CORS restricted to specific origins
- [ ] SQL injection protection (TypeORM)
- [ ] XSS protection headers (Helmet)
- [ ] CSRF protection
- [ ] Secrets in environment variables (not git)
- [ ] Database encrypted at rest
- [ ] Regular security audits
- [ ] Dependency updates automated
- [ ] Backup and recovery tested
- [ ] Incident response plan documented

---

## Disaster Recovery Plan

### RTO (Recovery Time Objective): 1 hour
### RPO (Recovery Point Objective): 1 day

**Backup Strategy:**
- Daily automated database backups (kept 30 days)
- Code in Git with tags for each release
- Environment variables in secure vault (Doppler, AWS Secrets Manager)

**Recovery Procedure:**
1. Restore database from latest backup
2. Deploy code from tagged release
3. Verify all services operational
4. Monitor for issues
5. Post-incident review

---

## Cost Estimate (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Hosting | Railway: $5-10 | AWS: $50-100+ |
| Database | Railway: Included | AWS RDS: $15-50 |
| CDN | - | Cloudflare: $20-100 |
| Monitoring | Free tier | Sentry: $30+ |
| Domain | - | GoDaddy: $12/year |
| **Total** | ~$10-15 | ~$150-250 |

---

## Next Steps

1. **Choose hosting provider** (Railway recommended for v1.0)
2. **Prepare production database** (PostgreSQL)
3. **Configure environment variables**
4. **Deploy all three services**
5. **Setup monitoring** (Sentry for errors)
6. **Configure backups** (daily automated)
7. **Setup domain & SSL** (Let's Encrypt)
8. **Test all workflows** (admin → public)
9. **Monitor for issues** (first 48 hours)
10. **Document runbooks** (operational guides)

---

## Support & Resources

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Express Deployment: https://expressjs.com/en/advanced/best-practice-deployment.html
- PostgreSQL Production: https://wiki.postgresql.org/wiki/Performance_Optimization

---

**Deployment Guide v1.0**
**Last Updated:** November 2025
**Status:** Ready for Production

# Production Deployment Guide
## Portfolio CMS Terminal Template

**Version:** 1.0.1 (Terminal Template Complete)
**Last Updated:** November 9, 2025
**Status:** ✅ Production Ready (E2E Tested)

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [System Requirements](#system-requirements)
3. [Environment Setup](#environment-setup)
4. [Database Configuration](#database-configuration)
5. [Service Deployment](#service-deployment)
6. [Security Hardening](#security-hardening)
7. [Testing & Verification](#testing--verification)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)
10. [Rollback Procedures](#rollback-procedures)

---

## Pre-Deployment Checklist

### ✅ Completed Items

- [x] **All E2E Tests Pass** - Verified via `e2e-test-simple.sh`
- [x] **Terminal Template Complete** - ASCII art with numbers, animations, mobile responsive
- [x] **Critical Bugs Fixed** - Experience property, theme null check, project filters
- [x] **Database Schema Ready** - All migrations applied
- [x] **Test Data Created** - Sample portfolio for validation
- [x] **Documentation Complete** - 120+ KB of comprehensive docs

### ⚠️ Pre-Production Tasks

- [ ] **Security Review** - Move JWT to HttpOnly cookies (currently localStorage)
- [ ] **Rate Limiting** - Add express-rate-limit middleware
- [ ] **Input Sanitization** - Implement DOMPurify
- [ ] **Error Monitoring** - Setup Sentry or similar
- [ ] **Logging System** - Implement winston or pino
- [ ] **Database Backups** - Automated pg_dump + cron
- [ ] **SSL/HTTPS** - Configure Let's Encrypt certificates
- [ ] **Environment Variables** - Secure storage (not in .env files)

---

## System Requirements

### Minimum Production Server

```
OS: Ubuntu 20.04 LTS or higher
CPU: 2 cores
RAM: 4 GB
Storage: 20 GB SSD
Network: 100 Mbps
```

### Recommended Production Server

```
OS: Ubuntu 22.04 LTS
CPU: 4 cores
RAM: 8 GB
Storage: 50 GB SSD
Network: 1 Gbps
```

### Required Software

```bash
# Node.js (v18 or higher)
node --version  # Should output v18.x.x or higher

# npm (v9 or higher)
npm --version   # Should output 9.x.x or higher

# PostgreSQL (v12 or higher)
psql --version  # Should output 12.x or higher

# PM2 (Process Manager)
pm2 --version

# Nginx (Reverse Proxy)
nginx -v
```

---

## Environment Setup

### 1. Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL 14
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 globally
sudo npm install -g pm2

# Install build tools
sudo apt install -y build-essential
```

### 2. Create Application User

```bash
# Create dedicated user for the application
sudo useradd -m -s /bin/bash portfolio
sudo usermod -aG sudo portfolio

# Switch to portfolio user
sudo su - portfolio
```

### 3. Clone Repository

```bash
# Clone to /home/portfolio/portfolio-cms
cd /home/portfolio
git clone https://github.com/yourusername/portfolio-cms.git
cd portfolio-cms
```

### 4. Environment Variables

**Backend (.env.production)**
```env
# Server Configuration
NODE_ENV=production
PORT=9000
HOST=0.0.0.0

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=portfolio_user
DB_PASSWORD=<STRONG_PASSWORD_HERE>
DB_DATABASE=portfolio_cms_prod

# JWT Configuration
JWT_SECRET=<GENERATE_STRONG_SECRET_64_CHARS>
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com,https://admin.yourdomain.com
CORS_CREDENTIALS=true

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/portfolio-cms/backend.log
```

**Admin Frontend (.env.production)**
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_ENV=production
```

**Public Frontend (.env.production)**
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_ENV=production
```

### 5. Generate Strong Secrets

```bash
# Generate JWT secret (64 characters)
openssl rand -base64 48

# Generate database password
openssl rand -base64 32
```

---

## Database Configuration

### 1. Create Production Database

```bash
# Switch to postgres user
sudo su - postgres

# Create database user
createuser -P portfolio_user
# Enter strong password when prompted

# Create database
createdb -O portfolio_user portfolio_cms_prod

# Exit postgres user
exit
```

### 2. Configure PostgreSQL for Production

**Edit `/etc/postgresql/14/main/postgresql.conf`:**

```ini
# Connection Settings
listen_addresses = 'localhost'
max_connections = 100

# Memory Settings (adjust based on RAM)
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
work_mem = 4MB

# WAL Settings (for backups)
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /var/lib/postgresql/14/archive/%f && cp %p /var/lib/postgresql/14/archive/%f'

# Logging
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_statement = 'all'
log_min_duration_statement = 1000  # Log queries > 1 second
```

**Edit `/etc/postgresql/14/main/pg_hba.conf`:**

```
# TYPE  DATABASE        USER            ADDRESS         METHOD
local   all             postgres                        peer
local   all             all                             peer
host    portfolio_cms_prod  portfolio_user  127.0.0.1/32    scram-sha-256
host    portfolio_cms_prod  portfolio_user  ::1/128         scram-sha-256
```

### 3. Restart PostgreSQL

```bash
sudo systemctl restart postgresql
sudo systemctl enable postgresql
```

### 4. Run Migrations

```bash
cd /home/portfolio/portfolio-cms/portfolio-cms-backend

# Install dependencies
npm ci --production

# Build TypeScript
npm run build

# Run migrations
npm run migrate

# Verify migration
psql -U portfolio_user -d portfolio_cms_prod -c "\dt"
```

### 5. Create Initial Terminal Theme

```bash
# Create terminal theme in database
psql -U portfolio_user -d portfolio_cms_prod <<EOF
INSERT INTO themes (id, name, colors, fonts, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Terminal Dark',
  '{"primary":"#00ff00","secondary":"#00cc00","accent":"#33ff33","background":"#0a0a0a","text":"#00ff00","muted":"#666666"}',
  '{"heading":"JetBrains Mono, monospace","body":"Courier New, monospace"}',
  NOW(),
  NOW()
);
EOF
```

---

## Service Deployment

### 1. Backend API Deployment

**Build Backend:**
```bash
cd /home/portfolio/portfolio-cms/portfolio-cms-backend

# Install production dependencies
npm ci --production

# Build TypeScript
npm run build

# Test build
NODE_ENV=production node dist/index.js
# Should see: "Server running on http://0.0.0.0:9000"
# Press Ctrl+C to stop
```

**Create PM2 Ecosystem File:**
```bash
cat > ecosystem.config.js <<'EOF'
module.exports = {
  apps: [
    {
      name: 'portfolio-backend',
      script: 'dist/index.js',
      cwd: '/home/portfolio/portfolio-cms/portfolio-cms-backend',
      instances: 2,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 9000
      },
      error_file: '/var/log/portfolio-cms/backend-error.log',
      out_file: '/var/log/portfolio-cms/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '500M',
      autorestart: true,
      watch: false
    }
  ]
};
EOF
```

**Start Backend with PM2:**
```bash
# Create log directory
sudo mkdir -p /var/log/portfolio-cms
sudo chown portfolio:portfolio /var/log/portfolio-cms

# Start backend
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command output to complete setup
```

### 2. Frontend Deployment (Admin + Public)

**Build Admin Dashboard:**
```bash
cd /home/portfolio/portfolio-cms/portfolio-cms-admin

# Install dependencies
npm ci --production

# Build for production
npm run build

# Output will be in dist/ directory
ls -lh dist/
```

**Build Public Frontend:**
```bash
cd /home/portfolio/portfolio-cms/portfolio-public

# Install dependencies
npm ci --production

# Build for production
npm run build

# Output will be in dist/ directory
ls -lh dist/
```

**Deploy to Nginx:**
```bash
# Create web directories
sudo mkdir -p /var/www/portfolio-cms/admin
sudo mkdir -p /var/www/portfolio-cms/public

# Copy built files
sudo cp -r /home/portfolio/portfolio-cms/portfolio-cms-admin/dist/* /var/www/portfolio-cms/admin/
sudo cp -r /home/portfolio/portfolio-cms/portfolio-public/dist/* /var/www/portfolio-cms/public/

# Set permissions
sudo chown -R www-data:www-data /var/www/portfolio-cms
sudo chmod -R 755 /var/www/portfolio-cms
```

### 3. Nginx Configuration

**Create Nginx Config:**
```bash
sudo nano /etc/nginx/sites-available/portfolio-cms
```

**Add Configuration:**
```nginx
# API Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    # Redirect to HTTPS (after SSL setup)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:9000/health;
        access_log off;
    }
}

# Admin Dashboard
server {
    listen 80;
    server_name admin.yourdomain.com;

    root /var/www/portfolio-cms/admin;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Public Portfolios
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/portfolio-cms/public;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Enable Site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/portfolio-cms /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
```

### 4. SSL/HTTPS Setup with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificates for all domains
sudo certbot --nginx -d api.yourdomain.com -d admin.yourdomain.com -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run

# Auto-renewal is setup automatically via cron
```

---

## Security Hardening

### 1. Firewall Configuration

```bash
# Enable UFW firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny all other incoming
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Check status
sudo ufw status verbose
```

### 2. Fail2Ban (SSH Protection)

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Configure
sudo nano /etc/fail2ban/jail.local
```

**Add:**
```ini
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
```

```bash
# Restart Fail2Ban
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban
```

### 3. Database Security

```bash
# Restrict PostgreSQL to localhost only
sudo nano /etc/postgresql/14/main/postgresql.conf
# Ensure: listen_addresses = 'localhost'

# Use strong password authentication
sudo nano /etc/postgresql/14/main/pg_hba.conf
# Ensure: scram-sha-256 for all connections

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### 4. Node.js Security

**Add Rate Limiting to Backend:**

```bash
cd /home/portfolio/portfolio-cms/portfolio-cms-backend
npm install express-rate-limit
```

**Update `src/index.ts`:**
```typescript
import rateLimit from 'express-rate-limit';

// Add before routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

### 5. Automated Backups

**Create Backup Script:**
```bash
sudo nano /usr/local/bin/backup-portfolio-db.sh
```

```bash
#!/bin/bash
# Portfolio CMS Database Backup Script

BACKUP_DIR="/var/backups/portfolio-cms"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="portfolio_cms_prod"
DB_USER="portfolio_user"

# Create backup directory
mkdir -p $BACKUP_DIR

# Perform backup
pg_dump -U $DB_USER -d $DB_NAME -F c -f "$BACKUP_DIR/portfolio_cms_$TIMESTAMP.dump"

# Compress backup
gzip "$BACKUP_DIR/portfolio_cms_$TIMESTAMP.dump"

# Delete backups older than 30 days
find $BACKUP_DIR -name "portfolio_cms_*.dump.gz" -mtime +30 -delete

# Log backup
echo "[$(date)] Backup completed: portfolio_cms_$TIMESTAMP.dump.gz" >> /var/log/portfolio-cms/backup.log
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-portfolio-db.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
```

**Add:**
```cron
0 2 * * * /usr/local/bin/backup-portfolio-db.sh
```

---

## Testing & Verification

### 1. Run E2E Test

```bash
cd /home/portfolio/portfolio-cms

# Make test executable
chmod +x e2e-test-simple.sh

# Run test
./e2e-test-simple.sh
```

**Expected Output:**
```
=========================================
DEPLOYMENT E2E TEST: PASSED ✅
=========================================

🚀 READY FOR PRODUCTION DEPLOYMENT
```

### 2. Manual Testing Checklist

**Backend API:**
- [ ] Health check: `curl https://api.yourdomain.com/health`
- [ ] User registration works
- [ ] User login works and returns JWT
- [ ] Protected endpoints require authentication
- [ ] Public portfolio endpoint works without auth

**Admin Dashboard:**
- [ ] Access https://admin.yourdomain.com
- [ ] Login page loads
- [ ] Can login with test account
- [ ] Dashboard displays correctly
- [ ] Can create new portfolio
- [ ] Can add projects, skills, experience
- [ ] Can publish portfolio
- [ ] All modals work correctly

**Public Frontend:**
- [ ] Access https://yourdomain.com/[slug]
- [ ] Portfolio loads correctly
- [ ] Terminal template renders with ASCII art
- [ ] Numbers display in ASCII art (test with title containing digits)
- [ ] Typing animation works
- [ ] Scanline overlay displays
- [ ] All sections render (hero, projects, skills, experience, contact)
- [ ] Mobile responsive (test on phone)
- [ ] Contact items are clickable
- [ ] Footer displays correctly

### 3. Performance Testing

```bash
# Install Apache Bench
sudo apt install -y apache2-utils

# Test backend endpoint (100 requests, 10 concurrent)
ab -n 100 -c 10 https://api.yourdomain.com/health

# Test public portfolio
ab -n 100 -c 10 https://yourdomain.com/terminal-portfolio-test
```

**Expected Results:**
- Backend: < 200ms average response time
- Public: < 500ms average response time
- Zero failed requests

### 4. Security Testing

```bash
# Test HTTPS redirect
curl -I http://yourdomain.com
# Should return 301 redirect to https://

# Test security headers
curl -I https://yourdomain.com
# Should include:
# X-Frame-Options: SAMEORIGIN
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block

# Test rate limiting
for i in {1..110}; do curl https://api.yourdomain.com/api/portfolios/public/test; done
# Should get rate limit error after 100 requests
```

---

## Monitoring & Maintenance

### 1. PM2 Monitoring

```bash
# View running processes
pm2 list

# View logs
pm2 logs portfolio-backend

# View metrics
pm2 monit

# Restart service
pm2 restart portfolio-backend

# View detailed info
pm2 info portfolio-backend
```

### 2. Log Monitoring

**Backend Logs:**
```bash
# View live logs
tail -f /var/log/portfolio-cms/backend-out.log

# View errors only
tail -f /var/log/portfolio-cms/backend-error.log

# Search for specific errors
grep "Error" /var/log/portfolio-cms/backend-error.log
```

**Nginx Logs:**
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

**PostgreSQL Logs:**
```bash
# View latest log
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### 3. Database Maintenance

```bash
# Check database size
psql -U portfolio_user -d portfolio_cms_prod -c "SELECT pg_size_pretty(pg_database_size('portfolio_cms_prod'));"

# Vacuum database (weekly recommended)
psql -U portfolio_user -d portfolio_cms_prod -c "VACUUM ANALYZE;"

# Check slow queries
psql -U portfolio_user -d portfolio_cms_prod -c "
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;"
```

### 4. System Health Checks

**Create Health Check Script:**
```bash
sudo nano /usr/local/bin/health-check-portfolio.sh
```

```bash
#!/bin/bash
# Portfolio CMS Health Check Script

echo "=== Portfolio CMS Health Check ==="
echo "Date: $(date)"
echo ""

# Check PM2 status
echo "PM2 Status:"
pm2 status | grep portfolio-backend

# Check Nginx status
echo -e "\nNginx Status:"
sudo systemctl status nginx | grep Active

# Check PostgreSQL status
echo -e "\nPostgreSQL Status:"
sudo systemctl status postgresql | grep Active

# Check disk space
echo -e "\nDisk Space:"
df -h | grep -E '^/dev/'

# Check memory usage
echo -e "\nMemory Usage:"
free -h

# Test backend health endpoint
echo -e "\nBackend Health:"
curl -s http://localhost:9000/health | python3 -m json.tool

# Check database connections
echo -e "\nActive Database Connections:"
psql -U portfolio_user -d portfolio_cms_prod -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/health-check-portfolio.sh

# Run health check
/usr/local/bin/health-check-portfolio.sh
```

### 5. Error Monitoring (Optional - Sentry)

**Install Sentry SDK:**
```bash
cd /home/portfolio/portfolio-cms/portfolio-cms-backend
npm install @sentry/node
```

**Add to `src/index.ts`:**
```typescript
import * as Sentry from '@sentry/node';

// Initialize Sentry (add before routes)
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: 'production',
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

// Add error handler before other error handlers
if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.errorHandler());
}
```

---

## Troubleshooting

### Issue 1: Backend Not Starting

**Symptoms:**
- PM2 shows backend as "errored" or "stopped"
- Logs show connection errors

**Solutions:**
```bash
# Check logs
pm2 logs portfolio-backend --lines 50

# Common fixes:
# 1. Database not running
sudo systemctl status postgresql
sudo systemctl start postgresql

# 2. Port already in use
lsof -i :9000
kill -9 <PID>

# 3. Environment variables not set
pm2 delete portfolio-backend
pm2 start ecosystem.config.js --env production

# 4. Missing dependencies
cd /home/portfolio/portfolio-cms/portfolio-cms-backend
npm ci --production
pm2 restart portfolio-backend
```

### Issue 2: Frontend Shows Blank Page

**Symptoms:**
- Accessing admin or public URL shows white screen
- Browser console shows errors

**Solutions:**
```bash
# Check Nginx is serving files
ls -lh /var/www/portfolio-cms/admin/
ls -lh /var/www/portfolio-cms/public/

# Rebuild and redeploy
cd /home/portfolio/portfolio-cms/portfolio-cms-admin
npm run build
sudo cp -r dist/* /var/www/portfolio-cms/admin/

# Check Nginx configuration
sudo nginx -t
sudo systemctl reload nginx

# Check browser console for API URL
# Should point to https://api.yourdomain.com/api
# NOT http://localhost:9000/api
```

### Issue 3: Database Connection Failed

**Symptoms:**
- Backend logs show "connection refused" or "authentication failed"

**Solutions:**
```bash
# Test database connection
psql -U portfolio_user -d portfolio_cms_prod -h localhost

# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection settings
grep DB_ /home/portfolio/portfolio-cms/portfolio-cms-backend/.env.production

# Check pg_hba.conf allows connections
sudo nano /etc/postgresql/14/main/pg_hba.conf
# Should have: host portfolio_cms_prod portfolio_user 127.0.0.1/32 scram-sha-256

# Reload PostgreSQL
sudo systemctl reload postgresql
```

### Issue 4: 502 Bad Gateway

**Symptoms:**
- Nginx returns 502 error
- "upstream prematurely closed connection"

**Solutions:**
```bash
# Backend not running
pm2 status
pm2 restart portfolio-backend

# Check backend is listening on correct port
lsof -i :9000

# Check Nginx proxy settings
sudo nano /etc/nginx/sites-available/portfolio-cms
# Ensure proxy_pass points to http://localhost:9000

# Check firewall
sudo ufw status
# Should allow port 80 and 443, NOT 9000 (internal only)

# Test backend directly
curl http://localhost:9000/health
```

### Issue 5: SSL Certificate Errors

**Symptoms:**
- Browser shows "Not Secure"
- Certificate expired warnings

**Solutions:**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Force renewal (if expiring)
sudo certbot renew --force-renewal

# Test auto-renewal
sudo certbot renew --dry-run

# Check Nginx SSL configuration
sudo nginx -t
```

### Issue 6: High Memory Usage

**Symptoms:**
- Server becomes slow
- PM2 shows high memory usage
- OOM (Out of Memory) errors

**Solutions:**
```bash
# Check memory usage
free -h
pm2 monit

# Restart backend to free memory
pm2 restart portfolio-backend

# Increase max memory limit in ecosystem.config.js
# max_memory_restart: '1G'  # Increase from 500M

# Add swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Issue 7: Slow Database Queries

**Symptoms:**
- API responses take > 2 seconds
- High database CPU usage

**Solutions:**
```bash
# Enable query logging (temporarily)
psql -U portfolio_user -d portfolio_cms_prod -c "ALTER SYSTEM SET log_min_duration_statement = 100;"
sudo systemctl reload postgresql

# Check slow queries
sudo tail -f /var/log/postgresql/postgresql-14-main.log | grep duration

# Run VACUUM ANALYZE
psql -U portfolio_user -d portfolio_cms_prod -c "VACUUM ANALYZE;"

# Check for missing indexes
psql -U portfolio_user -d portfolio_cms_prod -c "
SELECT schemaname, tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;"
```

---

## Rollback Procedures

### 1. Database Rollback

**Restore from Backup:**
```bash
# List available backups
ls -lh /var/backups/portfolio-cms/

# Restore specific backup
gunzip /var/backups/portfolio-cms/portfolio_cms_20251109_020000.dump.gz
pg_restore -U portfolio_user -d portfolio_cms_prod -c /var/backups/portfolio-cms/portfolio_cms_20251109_020000.dump
```

### 2. Backend Rollback

**Revert to Previous Version:**
```bash
cd /home/portfolio/portfolio-cms/portfolio-cms-backend

# View commit history
git log --oneline -10

# Checkout previous commit
git checkout <commit-hash>

# Rebuild
npm ci --production
npm run build

# Restart PM2
pm2 restart portfolio-backend
```

### 3. Frontend Rollback

**Restore Previous Build:**
```bash
# Keep backups of previous builds
sudo cp -r /var/www/portfolio-cms/admin /var/www/portfolio-cms/admin.backup.$(date +%Y%m%d)

# If rollback needed
sudo rm -rf /var/www/portfolio-cms/admin
sudo cp -r /var/www/portfolio-cms/admin.backup.20251108 /var/www/portfolio-cms/admin
sudo systemctl reload nginx
```

---

## Post-Deployment Checklist

- [ ] **All services running** - Backend, Nginx, PostgreSQL
- [ ] **E2E tests pass** - Run `./e2e-test-simple.sh`
- [ ] **HTTPS working** - All domains redirect to HTTPS
- [ ] **Security headers present** - Check with curl
- [ ] **Backups configured** - Daily automated backups
- [ ] **Monitoring setup** - PM2 monitoring, log rotation
- [ ] **DNS configured** - All subdomains point to server
- [ ] **Firewall enabled** - Only ports 22, 80, 443 open
- [ ] **Rate limiting active** - Test with Apache Bench
- [ ] **Error monitoring** - Sentry or similar (optional)
- [ ] **Documentation updated** - Update README with production URLs
- [ ] **Team notified** - Share production URLs and credentials

---

## Production URLs

After successful deployment, your services will be available at:

- **Public Portfolios:** https://yourdomain.com/[portfolio-slug]
- **Admin Dashboard:** https://admin.yourdomain.com
- **API Backend:** https://api.yourdomain.com/api
- **API Health Check:** https://api.yourdomain.com/health

---

## Support & Maintenance

**Regular Maintenance Tasks:**

- **Daily:** Monitor PM2 status, check error logs
- **Weekly:** Review access logs, run database VACUUM
- **Monthly:** Update system packages, review security logs, test backups
- **Quarterly:** Update Node.js, PostgreSQL, review and update dependencies

**Emergency Contacts:**

- Server Provider Support: [provider support link]
- Database Administrator: [contact info]
- DevOps Team: [contact info]

---

**Document Version:** 1.0
**Last Updated:** November 9, 2025
**Next Review:** December 9, 2025

---

## Additional Resources

- [CLAUDE.md](./CLAUDE.md) - Project overview and development guide
- [API_ENDPOINTS_REFERENCE.md](./API_ENDPOINTS_REFERENCE.md) - Complete API documentation
- [TERMINAL_TEMPLATE_TEST_REPORT.md](./TERMINAL_TEMPLATE_TEST_REPORT.md) - Terminal template testing
- [e2e-test-simple.sh](./e2e-test-simple.sh) - E2E test script

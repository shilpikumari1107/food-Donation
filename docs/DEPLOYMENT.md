# Deployment Guide

## Overview

This guide covers deploying FoodShare to production across different platforms.

---

## Prerequisites

- Domain name
- SSL certificate
- Cloud platform account (AWS, Heroku, DigitalOcean, etc.)
- Git repository access

---

## Backend Deployment

### Option 1: AWS EC2

#### Setup EC2 Instance
```bash
# Launch Ubuntu 20.04 LTS instance
# Security group: Allow ports 22, 80, 443, 5000
# Key pair: Create and save securely

# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### Deploy Backend
```bash
# Clone repository
git clone <your-repo-url>
cd food-Donation/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with production values

# Setup database
mysql -u root -p < ../database/schema.sql
mysql -u root -p food_donation < ../database/seedData.sql

# Start with PM2
pm2 start src/server.js --name "foodshare-api"
pm2 save  # Restart on reboot
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup -u ubuntu --hp /home/ubuntu
```

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/foodshare-api
server {
    listen 80;
    server_name api.foodshare.com www.api.foodshare.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/foodshare-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option 2: Heroku

```bash
# Install Heroku CLI
# Already logged in: heroku login

# Create app
heroku create foodshare-api

# Add MySQL addon
heroku addons:create cleardb:ignite -a foodshare-api

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key -a foodshare-api
heroku config:set NODE_ENV=production -a foodshare-api

# Deploy
git push heroku main

# Run migrations
heroku run "mysql -u user db_name < database/schema.sql" -a foodshare-api

# Monitor logs
heroku logs --tail -a foodshare-api
```

### Option 3: DigitalOcean App Platform

```bash
# Create app.yaml
name: foodshare-api
services:
- name: api
  github:
    repo: your-username/food-Donation
    branch: main
  build_command: cd backend && npm install
  run_command: cd backend && npm start
  http_port: 5000
  envs:
  - key: JWT_SECRET
    value: ${JWT_SECRET}
  - key: DB_HOST
    value: ${DB_HOST}
  databases:
  - name: mysql
    engine: MYSQL
    version: "8"

# Deploy via DigitalOcean dashboard or CLI
doctl apps create --spec app.yaml
```

---

## Frontend Deployment

### Option 1: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL = https://api.foodshare.com/api
```

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@database_api_url"
  },
  "routes": [
    { "src": "/[^.]+$", "destination": "/index.html" }
  ]
}
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist

# Or connect GitHub for auto-deploys
netlify connect
```

Create `netlify.toml`:
```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[env.production]
VITE_API_URL = "https://api.foodshare.com/api"
```

### Option 3: GitHub Pages

```bash
# Update vite.config.js
export default {
  base: '/food-Donation/',
  // ... other config
}

# Build
npm run build

# Deploy to gh-pages branch
npm run deploy
```

---

## Database Deployment

### AWS RDS MySQL

1. Create RDS instance
   - Engine: MySQL 8.0
   - Instance: db.t3.micro (free tier)
   - Storage: 20GB
   - Backup: 7 days

2. Security group rules
   - Allow port 3306 from EC2 security group
   - Allow port 3306 from office IP (if needed)

3. Create database
```bash
# From EC2 instance
mysql -h your-rds-endpoint.amazonaws.com -u admin -p

# Create database
CREATE DATABASE food_donation;
USE food_donation;
SOURCE /path/to/schema.sql;
SOURCE /path/to/seedData.sql;
```

### Google Cloud SQL

1. Create instance
   - Database version: MySQL 8.0
   - Region: Choose closest region
   - High availability: Enable

2. Create database
```bash
gcloud sql databases create food_donation --instance=<instance-name>
gcloud sql import sql <instance-name> gs://your-bucket/schema.sql
```

---

## SSL/HTTPS

### Using Let's Encrypt (Free)

#### On AWS EC2
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d api.foodshare.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

#### Update Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name api.foodshare.com;

    ssl_certificate /etc/letsencrypt/live/api.foodshare.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.foodshare.com/privkey.pem;

    # Your location blocks...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.foodshare.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=5000
DB_HOST=your-rds-endpoint
DB_USER=admin
DB_PASSWORD=strong_password
DB_NAME=food_donation
JWT_SECRET=your_very_strong_random_secret_key_here
```

### Frontend (.env)
```
VITE_API_URL=https://api.foodshare.com/api
```

---

## Monitoring & Logging

### Backend Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs food-share-api

# Set up email notifications
pm2 install pm2-email
```

### Database Monitoring
```bash
# Check query performance
SHOW PROCESSLIST;

# Check slow query log
SHOW VARIABLES LIKE 'slow_query_log%';

# Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
```

### Application Monitoring Tools
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **DataDog** - Infrastructure monitoring
- **CloudWatch** (AWS) - Logs and metrics

### Setup Sentry
```bash
# Install Sentry package
npm install @sentry/node @sentry/tracing

# Add to server.js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your-sentry-dsn" });

# Add middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

---

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS/JS
- Image optimization
- Code splitting
- Lazy loading

### Backend
- Database connection pooling
- Query optimization
- Caching with Redis
- Rate limiting
- CDN for static assets

```bash
# Add caching headers in Nginx
add_header Cache-Control "public, max-age=3600";

# Enable gzip
gzip on;
gzip_types text/plain text/css text/xml text/javascript;
```

---

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_KEY }}
          script: |
            cd /app/backend
            git pull
            npm install
            npm run migrate
            pm2 restart food-share-api

      - name: Deploy Frontend
        run: |
          npm run build
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Disaster Recovery

### Backup Strategy
```bash
# Daily backup
0 2 * * * mysqldump -u admin -p$DB_PASS food_donation | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz

# Upload to S3
0 3 * * * aws s3 cp /backups/db-$(date +\%Y\%m\%d).sql.gz s3://your-backup-bucket/
```

### Recovery Plan
1. **RTO** (Recovery Time Objective): 1 hour
2. **RPO** (Recovery Point Objective): 24 hours
3. Test restore weekly
4. Keep backups in multiple regions

---

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set strong JWT_SECRET
- [ ] Enable database authentication
- [ ] Setup firewall rules
- [ ] Regular security updates
- [ ] Monitor suspicious activity
- [ ] Implement rate limiting
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Regular penetration testing

---

## Troubleshooting

### Backend Issues
- Check logs: `pm2 logs`
- Database connection: `mysql -u user -p -h host`
- Port conflicts: `netstat -tunlp | grep 5000`

### Frontend Issues
- Build errors: Check console output
- API connection: Check VITE_API_URL
- CORS errors: Verify backend CORS config

### Database Issues
- Connection timeout: Check security groups
- Slow queries: Enable slow query log
- Disk space: Check storage quota

---

For more help, check platform-specific documentation.

# 🚀 Vercel Deployment Guide - FoodShare

## Overview

This guide covers deploying FoodShare to Vercel with recommended options for backend and database.

---

## Architecture Options for Vercel

### Option A: Recommended (Best Performance)
- **Frontend:** Vercel (React app)
- **Backend:** Railway.app or Render.com (Node.js)
- **Database:** Vercel Postgres OR External MySQL (AWS RDS, PlanetScale, etc.)

### Option B: All on Vercel
- **Frontend:** Vercel
- **Backend:** Vercel Serverless Functions
- **Database:** External MySQL (recommended)

**Recommendation:** Use **Option A** for better performance and easier management.

---

## Part 1: Frontend Deployment on Vercel

### Step 1: Prerequisites
```bash
# Ensure you're logged in to GitHub
# Have the repository pushed to GitHub

# Install Vercel CLI (already done)
npm install -g vercel

# Verify installation
vercel --version
```

### Step 2: Build Locally to Test
```bash
cd /workspaces/food-Donation/frontend
npm run build

# Should create 'dist' folder with production build
ls dist/
```

### Step 3: Deploy Frontend to Vercel
```bash
cd /workspaces/food-Donation/frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Which scope? (your username)
# - Link to existing project? (No)
# - What is your project's name? (food-donation-frontend)
# - In which directory is your code? (.)
# - Override build settings? (No)
# - Command name? (npm run build)
# - Output directory? (dist)
```

### Step 4: Get Frontend URL
After deployment, you'll get:
```
✓ Production: https://food-donation-frontend.vercel.app
```

Save this URL - you'll need it for backend configuration.

---

## Part 2: Backend Deployment Options

### Option A: Deploy Backend to Railway (Recommended)

**Why Railway?** 
- Simple MySQL database included
- Good free tier
- Easy MongoDB/Postgres integration
- Better than Vercel for Node.js servers

#### Railway Setup
```bash
# 1. Create account: https://railway.app
# 2. Click "New Project"
# 3. Select "Deploy from GitHub"
# 4. Connect your repository
# 5. Select 'backend' folder

# Environment variables (set in Railway dashboard):
NODE_ENV=production
PORT=5000
DB_HOST=<get from Railway MySQL>
DB_USER=<get from Railway MySQL>
DB_PASSWORD=<get from Railway MySQL>
DB_NAME=food_donation
JWT_SECRET=<your_very_secret_key>

# 7. Deploy!
# 8. Get your backend URL: https://food-donation-backend.railway.app
```

### Option B: Deploy Backend to Render.com

#### Render Setup
```bash
# 1. Create account: https://render.com
# 2. Click "New +" → "Web Service"
# 3. Connect GitHub repository
# 4. Configure:
#    - Name: food-donation-backend
#    - Environment: Node
#    - Build Command: npm install
#    - Start Command: npm start
#    - Environment: 
#      REGIONS: Use Node 16+
#      Add environment variables

# 5. Create MySQL database (separate)
# 6. Connect database credentials
# 7. Deploy!
```

---

## Part 3: Database Setup

### Option 1: MySQL on Railway (Recommended)
```bash
# 1. In Railway dashboard
# 2. Click "New Service" → "MySQL"
# 3. Connect to your project
# 4. Copy credentials:
#    - DB_HOST
#    - DB_USER (usually 'root')
#    - DB_PASSWORD
#    - DB_NAME (usually 'railway')

# 5. Connect to database and run SQL:
mysql -h <HOST> -u <USER> -p<PASSWORD>
# Paste schema.sql content
```

### Option 2: PlanetScale (Free MySQL)
```bash
# 1. Create account: https://planetscale.com
# 2. Create new database
# 3. Get connection string
# 4. Run migrations:
mysql -h <HOST> -u <USER> -p<PASSWORD> < database/schema.sql
```

### Option 3: Vercel Postgres
```bash
# Only if you want to use PostgreSQL
# Update backend code to use Postgres driver
# Support via Vercel dashboard
```

---

## Part 4: Update Environment Variables

### Frontend Environment Variable
After getting your backend URL, update Vercel project:

```bash
cd /workspaces/food-Donation/frontend

# Set environment variable
vercel env add VITE_API_URL
# Enter: https://food-donation-backend.railway.app/api

# Redeploy to pick up new variable
vercel --prod
```

### Backend Environment Variables
In Railway/Render dashboard, set:
```
NODE_ENV=production
PORT=5000
DB_HOST=<your-db-host>
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
DB_NAME=food_donation
JWT_SECRET=<generate-a-random-key>
```

---

## Step-by-Step Deployment Process

### Step 1: Prepare Code
```bash
cd /workspaces/food-Donation

# Make sure everything committed
git add .
git commit -m "Ready for Vercel deployment"
git push
```

### Step 2: Deploy Frontend
```bash
cd frontend
vercel --prod
# ✓ Frontend deployed: https://your-app.vercel.app
```

### Step 3: Deploy Database
```bash
# Create database on Railway/PlanetScale
# Get connection string
# Run schema:
mysql -h <HOST> -u <USER> -p < database/schema.sql
mysql -h <HOST> -u <USER> -p food_donation < database/seedData.sql
```

### Step 4: Deploy Backend
```bash
# Option A: Railway
# - Connect GitHub
# - Add environment variables
# - Deploy (Railway auto-deploys)

# Option B: Render
# - Connect GitHub
# - Add build/start commands
# - Add environment variables
# - Deploy
```

### Step 5: Connect Everything
```bash
# Test backend
curl https://your-backend-url/health
# Should return: {"status":"Server is running"}

# Test frontend
# Open https://your-frontend-url
# Login and test donation flow
```

---

## Complete Deployment Checklist

### Frontend
- [ ] Build locally: `npm run build`
- [ ] No build errors
- [ ] Login to Vercel: `vercel login`
- [ ] Deploy: `vercel --prod`
- [ ] Get production URL
- [ ] Frontend loads without errors

### Backend
- [ ] Choose hosting (Railway/Render)
- [ ] Create project on hosting
- [ ] Connect GitHub repository
- [ ] Add all environment variables
- [ ] Deploy/trigger build
- [ ] Get production URL
- [ ] Test health endpoint: `/health`

### Database
- [ ] Create database on Railway/PlanetScale
- [ ] Get connection credentials
- [ ] Run schema.sql
- [ ] Load seedData.sql
- [ ] Test connection from backend
- [ ] Verify sample data exists

### Integration
- [ ] Set VITE_API_URL in Vercel
- [ ] Redeploy frontend
- [ ] Test login functionality
- [ ] Test donation posting
- [ ] Test request creation
- [ ] Verify tracking works
- [ ] Check console for errors

---

## Common Issues & Fixes

### "Cannot find module" Error
```bash
# Make sure all dependencies installed
npm install

# Check node_modules exists
ls node_modules | wc -l

# Reinstall if needed
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```bash
# Check backend server.js has:
const cors = require('cors');
app.use(cors());

# Verify origin header is set correctly
```

### Database Connection Failed
```bash
# Test connection locally first:
mysql -h HOST -u USER -p -e "SELECT 1"

# Check credentials in environment variables
# Verify database exists:
mysql -h HOST -u USER -p -e "SHOW DATABASES;"
```

### Frontend Not Finding Backend
```bash
# Check environment variable is set correctly:
# In Vercel dashboard → Settings → Environment Variables
# VITE_API_URL should be: https://your-backend-url/api

# After setting, redeploy frontend
vercel --prod
```

---

## Post-Deployment

### Monitoring
```bash
# Check Vercel logs
vercel logs <deployment-url>

# Check Railway logs
# Dashboard → Deployments → View logs

# Monitor errors
# Check browser console (F12)
# Check production API responses
```

### Updates & Redeployment
```bash
# Make code changes
git commit -am "Fix feature"
git push

# Frontend auto-redeploys on Vercel (if connected)
# Backend auto-redeploys on Railway (if connected)

# Or manual redeploy:
vercel --prod
```

### Database Backups
```bash
# Regular backups
mysqldump -h HOST -u USER -p DATABASE > backup.sql

# Automated backups (set up in Railway/PlanetScale)
```

---

## Access Your Application

After deployment:

- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://your-backend-url/api
- **Health Check:** https://your-backend-url/api/health

---

## Security Checklist

Before going live:
- [ ] `JWT_SECRET` is strong and random
- [ ] Database password is strong
- [ ] No secrets in code (use environment variables)
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Database has regular backups
- [ ] Input validation enabled
- [ ] Rate limiting configured

---

## Next Steps

1. **Quick Deploy** (This path)
   - Deploy frontend now
   - Deploy backend to Railway
   - Setup database
   - Test everything

2. **Custom Domain** (Optional)
   - Add domain in Vercel settings
   - Update DNS records
   - SSL automatic

3. **Optimize** (Future)
   - Enable Vercel Analytics
   - Setup error tracking (Sentry)
   - Configure CDN caching
   - Monitor performance

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://railway.app/docs
- **Render Docs:** https://render.com/docs
- **Our Docs:** See `/docs` folder

---

## Quick Reference Commands

```bash
# Frontend
cd frontend
npm run build              # Build for production
vercel login              # Login to Vercel
vercel --prod             # Deploy to production
vercel env add VAR_NAME   # Add environment variable

# Backend
cd backend
npm run dev               # Local development
npm start                 # Production start

# Database
mysql -h HOST -u USER -p DATABASE < schema.sql
mysqldump -h HOST -u USER -p DATABASE > backup.sql
```

---

**Ready to deploy? Start with Part 1 above! 🚀**

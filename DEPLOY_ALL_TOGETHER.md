# 🚀 Complete Deployment Guide: "Do It All Together"

**Status:**
- ✅ Frontend: Live on Vercel at https://food-donation-dusky.vercel.app
- ⏳ Backend: Ready to deploy to Railway
- ⏳ Database: Ready to provision on Railway

---

## 📋 Quick Overview

We'll deploy everything on **Railway.app** because:
- ✅ MySQL database included
- ✅ Automatic deployment from GitHub
- ✅ One-click integration
- ✅ Free tier available
- ✅ No complex configuration

---

## 🎯 Step 1: Create Railway Account

### 1a. Go to Railway
```
https://railway.app
```

### 1b. Sign Up
- Click **"Start Project"**
- Choose **"Deploy from GitHub"**
- Authorize Railway to access your GitHub
- Select **shilpikumari1107/food-Donation** repository

---

## 🔧 Step 2: Create Backend Service

### 2a. Deploy Backend
In Railway Dashboard:

1. Click **"+ New Service"** → **"GitHub Repo"**
2. Select: `food-Donation`
3. Choose a name: `food-donation-backend`
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Port:** `5000`

5. Click **"Deploy"**

⏳ Wait 2-3 minutes for deployment to complete

### 2b. Get Backend URL
Once deployed:
1. Go to **"Settings"** tab
2. Find **"Domains"** section
3. Copy the **Production Domain** (e.g., `https://food-donation-backend-prod.railway.app`)
4. **Save this URL** - you'll need it for the frontend

---

## 🗄️ Step 3: Create MySQL Database Service

### 3a. Add MySQL
In Railway Dashboard:

1. Click **"+ New Service"** → **"Database"** → **"MySQL"**
2. Choose a name: `food-donation-db`
3. Accept default settings
4. Click **"Create"**

⏳ Wait 1-2 minutes for database to initialize

### 3b. Get Database Credentials
Once created:
1. Click on the **MySQL** service
2. Go to **"Connect"** tab
3. You should see:
   ```
   MYSQLHOST=xxxx.railway.internal
   MYSQLPORT=3306
   MYSQLUSER=root
   MYSQLPASSWORD=xxxx
   MYSQLDATABASE=railway
   ```

4. **Save these credentials**

---

## 🔗 Step 4: Connect Services & Set Environment Variables

### 4a. Link Backend to Database
In Railway Backend Service:

1. Click **"Variables"** tab
2. Add these variables by clicking **"+ New Variable"**:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DB_HOST` | (copy MYSQLHOST from MySQL service) |
| `DB_PORT` | `3306` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | (copy MYSQLPASSWORD from MySQL service) |
| `DB_NAME` | `railway` |
| `JWT_SECRET` | `your_super_secret_jwt_key_2026_production_change_this` |

3. Click **"Save"**
4. Backend will auto-redeploy with new variables

### 4b. Verify Connection
Once redeployed:
1. Go to **"Logs"** tab
2. Look for: `✓ Database connected successfully`
3. If you see this, database connection is working! ✅

---

## 📊 Step 5: Initialize Database Schema

### 5a. Access MySQL
You need to run the database schema. Two options:

**Option A: Via Railway UI (Easiest)**
1. In Railway Dashboard, click MySQL service
2. Click **"Connect"** tab
3. Click **"PostgreSQL Client"** (or use any MySQL client)
4. Copy the connection string
5. Paste into terminal: 
   ```bash
   mysql -h HOST -u USER -p < /workspaces/food-Donation/database/schema.sql
   ```

**Option B: Via Local Terminal**
```bash
# Use Railroad CLI to tunnel into Railway database
npm install -g @railway/cli@latest

# Login
railway login

# Tunnel to your database
railway connect

# In another terminal, run schema
mysql -h localhost -P 16001 -u root -p < /workspaces/food-Donation/database/schema.sql
```

### 5b: Load Seed Data (Optional)
```bash
# Add sample data for testing
mysql -h HOST -u USER -p < /workspaces/food-Donation/database/seedData.sql
```

### 5c: Verify Tables
Connect to MySQL and run:
```sql
SHOW TABLES;
```

You should see 5 tables:
- ✅ users
- ✅ donations
- ✅ requests
- ✅ history
- ✅ ratings

---

## 🎨 Step 6: Update Frontend with API URL

### 6a. Get Backend URL
From Railway Dashboard:
1. Click Backend service
2. Copy the **Production Domain**
   Example: `https://food-donation-backend-prod.railway.app`

### 6b. Update Vercel
1. Go to: https://vercel.com/dashboard
2. Select: **food-donation-dusky** project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_API_URL = https://food-donation-backend-prod.railway.app/api
   ```
5. Click **"Save"**
6. Click **"Redeploy"** button

⏳ Wait 1-2 minutes for frontend to redeploy

### 6c: Verify Connection
1. Go to: https://food-donation-dusky.vercel.app
2. Open **DevTools** (F12)
3. Go to **Console** tab
4. You should see no CORS errors
5. Try to register a new account
6. Check backend logs - should show API call! ✅

---

## ✅ Step 7: End-to-End Testing

### 7a: Test User Registration
```
1. Visit https://food-donation-dusky.vercel.app
2. Click "Register"
3. Fill form:
   - Email: test@example.com
   - Password: Test@123
   - Role: Donor
4. Click "Register"
5. Should redirect to login
```

### 7b: Test Login
```
1. Enter credentials from above
2. Click "Login"
3. Should redirect to Dashboard
4. Should see "Welcome" message
5. Check DevTools - API call should succeed ✅
```

### 7c: Test Donation Posting
```
1. From Dashboard, click "Post Donation"
2. Fill form:
   - Food Type: Rice
   - Quantity: 5 kg
   - Location: New York, NY
3. Click "Submit"
4. Should see success toast
5. Check backend logs - should show database insert ✅
```

### 7d: Test Donation Browsing
```
1. Click "Browse Donations"
2. Should see list of donations from database
3. Should see filters working
4. Try filtering by location
5. Results should update ✅
```

### 7e: Test Dashboard
```
1. Go to Dashboard
2. Should show:
   - Your statistics
   - Recent activities
   - Pending requests
   - Completed donations
3. All data from database ✅
```

---

## 🔍 Troubleshooting

### "Database connection failed"
**Solutions:**
1. Check environment variables are set correctly
2. Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
3. Restart backend service
4. Check MySQL service logs

### "CORS error in frontend"
**Solutions:**
1. Verify `VITE_API_URL` is set in Vercel
2. Make sure backend has CORS middleware enabled
3. Redeploy frontend
4. Check network tab - see full error

### "Can't connect to Railway database"
**Solutions:**
1. Use Railway's internal hostname (ends with `.railway.internal`)
2. Check MySQL service is running
3. Verify credentials match
4. Use Railway CLI to test connection

### "API calls return 404"
**Solutions:**
1. Check backend service is running
2. Verify all routes are defined in backend
3. Check route matches expected endpoint
4. Look at backend logs for error details

---

## 📱 Monitor Your Deployment

### Railway Dashboard
- **Backend Service**: Check logs, restart, redeploy
- **MySQL Service**: Check connectivity, view data
- **Environment**: See all variables
- **Domains**: Copy API URL

### Vercel Dashboard
- **Frontend Project**: Check build logs, redeploy
- **Environment**: See API URL variable
- **Analytics**: Monitor traffic and performance
- **Deployments**: Rollback if needed

---

## 🎯 Your Deployment URLs

After completing all steps, you'll have:

```
Frontend:  https://food-donation-dusky.vercel.app
Backend:   https://food-donation-backend-prod.railway.app/api
Database:  MySQL on Railway (internal)
```

---

## 🚀 It's Live!

**Congratulations!** Your full-stack platform is now:
- ✅ Deployed to production
- ✅ Connected to live database
- ✅ Handling real user data
- ✅ Scaling automatically
- ✅ Backed by modern infrastructure

---

## 📝 Quick Command Reference

### Connect to Railway database locally
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railroad login

# Tunnel to database
railroad connect

# In another terminal, run schema
mysql -h localhost -P 16001 -u root -p < schema.sql
```

### Redeploy backend (if needed)
```bash
git push origin main  # Auto-redeploys on GitHub push
```

### View backend logs
```bash
railroad logs --service food-donation-backend
```

### Check frontend build
```bash
vercel logs --state READY
```

---

## 📞 Need Help?

- **Railway Docs:** https://railway.app/docs
- **Vercel Docs:** https://vercel.com/docs
- **Express Docs:** https://expressjs.com/
- **MySQL Docs:** https://dev.mysql.com/doc/

---

## ✨ What's next?

After deployment, you can:
- Add email notifications
- Set up automated backups
- Monitor performance with analytics
- Add payment integration
- Scale to handle millions of users
- Add mobile app

**Your platform is production-ready!** 🎉

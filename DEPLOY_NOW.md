# ⚡ Deploy to Vercel - Quick Steps

## You're Ready! ✅

Your frontend builds perfectly. Here's how to deploy:

---

## Step 1: Login to Vercel

```bash
vercel login
```

- Opens browser to login
- Authenticate with GitHub/GitLab/Bitbucket
- Or use email signup

---

## Step 2: Deploy Frontend

```bash
cd /workspaces/food-Donation/frontend
vercel --prod
```

Vercel will ask:
- **Scope:** Your username or organization ✓
- **Link to existing project?** No ✓
- **Project name:** `food-donation-frontend` (or your choice) ✓
- **Directory:** `.` ✓
- **Build Command:** Uses default ✓
- **Output Directory:** Uses `dist` ✓

**Result:** Get your production URL
```
✓ Production: https://food-donation-frontend.vercel.app
```

---

## Step 3: Deploy Backend (Choose One)

### Option A: Railway (Recommended - Easiest)
```bash
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your GitHub account
4. Select this repo
5. Add environment variables:
   - NODE_ENV: production
   - PORT: 5000
   - DB_HOST: (from Railway MySQL)
   - DB_USER: (from Railway MySQL)
   - DB_PASSWORD: (from Railway MySQL)
   - DB_NAME: food_donation
   - JWT_SECRET: your_random_secret_key
6. Deploy!
7. Get URL: https://your-backend-url.railway.app
```

### Option B: Render.com
```bash
1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub
4. Configure:
   - Build: npm install
   - Start: npm start
5. Add environment variables (same as Railway)
6. Deploy!
```

---

## Step 4: Setup Database

### On Railway (Included):
```bash
1. In Railway dashboard
2. Add MySQL service to your project
3. Get credentials from Railway
4. Connect and run:
   mysql -h <HOST> -u <USER> -p < database/schema.sql
```

### On PlanetScale (Free MySQL):
```bash
1. Go to https://planetscale.com
2. Create new database
3. Get connection string
4. Run: mysql -h <HOST> -u <USER> -p food_donation < database/schema.sql
```

---

## Step 5: Connect Frontend to Backend

```bash
# Get your backend URL from Railway/Render
# Example: https://food-donation-backend.railway.app

# Set environment variable in Vercel:
vercel env add VITE_API_URL
# Enter: https://food-donation-backend.railway.app/api

# Redeploy frontend:
vercel --prod
```

---

## Step 6: Test Everything

```bash
# Test backend health:
curl https://your-backend-url.railway.app/health
# Should return: {"status":"Server is running"}

# Test frontend:
# 1. Open https://your-frontend-url.vercel.app
# 2. Try to login (use test account or register)
# 3. Post a donation
# 4. Search for donations
# 5. Check console (F12) for errors
```

---

## URLs After Deployment

```
Frontend:    https://your-app.vercel.app
Backend:     https://your-backend.railway.app
API:         https://your-backend.railway.app/api
Health:      https://your-backend.railway.app/health
Dashboard:   https://your-app.vercel.app/dashboard
Admin:       https://vercel.com/dashboard
```

---

## Environment Variables Needed

### Frontend (.env in Vercel)
```
VITE_API_URL=https://your-backend-url/api
```

### Backend (.env on Railway/Render)
```
NODE_ENV=production
PORT=5000
DB_HOST=your-mysql-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=food_donation
JWT_SECRET=generate_a_random_secret_key_here
```

---

## Common Issues

| Issue | Fix |
|-------|-----|
| **Build fails** | Run `npm install` locally first |
| **Can't find API** | Check VITE_API_URL is set correctly |
| **DB connection fails** | Verify credentials match your database |
| **CORS error** | Ensure backend has `cors()` middleware |
| **Port already in use** | Railway auto-assigns port, ignore PORT setting |

---

## Detailed Guides

- **Full Deployment Guide:** See `/docs/VERCEL_DEPLOYMENT.md`
- **API Documentation:** See `/docs/API.md`
- **Database Schema:** See `/docs/DATABASE.md`

---

## What You'll Have

After following these steps:
- ✅ Frontend live on Vercel
- ✅ Backend running on Railway
- ✅ Database connected and working
- ✅ Full donation platform live
- ✅ Custom domain ready (optional)
- ✅ Auto-deploys on code push

---

## Next Steps

1. **NOW:** Deploy frontend to Vercel
2. **THEN:** Deploy backend to Railway
3. **THEN:** Setup database and connect
4. **FINALLY:** Test everything works!

---

**Happy deploying! 🚀**

Questions? Check `/docs/VERCEL_DEPLOYMENT.md` for detailed guide.

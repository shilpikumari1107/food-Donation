# ⚡ DEPLOYMENT QUICK REFERENCE

## 🎯 What to Do Right Now

### 1️⃣ Create Railway Account
```
→ https://railway.app
→ Click "Deploy from GitHub"
→ Sign in with GitHub
→ Authorize Railway
```

### 2️⃣ Deploy Backend
```
New Service → GitHub Repo → food-Donation
- Root: backend
- Build: npm install
- Start: npm start
- Deploy ✓
```

### 3️⃣ Deploy Database
```
+ New Service → Database → MySQL
- Name: food-donation-db
- Create ✓
```

### 4️⃣ Set Environment Variables (Backend Service)
```
NODE_ENV = production
PORT = 5000
DB_HOST = (copy from MySQL Connect tab)
DB_PORT = 3306
DB_USER = root
DB_PASSWORD = (copy from MySQL Connect tab)
DB_NAME = railway
JWT_SECRET = your_secret_key_here
```

### 5️⃣ Copy Credentials (MySQL Service)
```
Click MySQL → Connect tab →
Copy: MYSQLHOST
Copy: MYSQLPASSWORD
Use in Step 4
```

### 6️⃣ Run Database Schema
```bash
# Option: Via Railway CLI
railroad connect
# Then in another terminal:
mysql -h localhost -P 16001 -u root -p < database/schema.sql
```

### 7️⃣ Get Backend URL
```
Backend Service → Settings → Domains →
Copy: Production Domain
Example: https://food-donation-backend-xxx.railway.app
```

### 8️⃣ Update Frontend
```
Vercel Dashboard → Settings → Environment Variables
Add: VITE_API_URL = (backend URL from step 7)
Redeploy ✓
```

### 9️⃣ Test
```
https://food-donation-dusky.vercel.app
→ Register
→ Login
→ Post Donation
→ Browse Donations
→ Check Dashboard
```

---

## 🛠️ Key Files Reference

| File | Purpose |
|------|---------|
| `backend/.env.example` | Variables needed |
| `database/schema.sql` | Tables to create |
| `database/seedData.sql` | Sample data |

---

## 🔗 Important URLs

```
Frontend:     https://food-donation-dusky.vercel.app
Backend URL:  (get from Railway Backend service)
Railway:      https://railway.app/dashboard
Vercel:       https://vercel.com/dashboard
```

---

## ✅ Checklist

- [ ] Railway account created
- [ ] Backend service deployed
- [ ] MySQL database created
- [ ] Env vars set on backend
- [ ] Schema uploaded to database
- [ ] Backend URL obtained
- [ ] Vercel env var updated
- [ ] Frontend redeployed
- [ ] Test registration works
- [ ] Test donation posting works

---

## ⚠️ Common Issues

**Database won't connect?**
→ Check env vars match Railway MySQL credentials

**Frontend shows errors?**
→ Check VITE_API_URL is set in Vercel

**API calls fail?**
→ Check DevTools Network tab for actual error

---

## 📞 Need Full Details?

See: **DEPLOY_ALL_TOGETHER.md** (comprehensive guide)

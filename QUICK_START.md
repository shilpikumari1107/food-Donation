# 🍽️ FoodShare - Complete Setup & Launch Guide

## 📊 Project Summary

**FoodShare** is a production-ready, full-stack food donation platform featuring:

✅ **Complete 3-tier architecture** (Frontend, Backend, Database)
✅ **Cinematic UI** with warm color palette and smooth animations
✅ **Role-based access control** (Donor, NGO, Admin)
✅ **Real-time donation matching** system
✅ **Complete food journey tracking**
✅ **Responsive design** for all devices
✅ **Secure authentication** with JWT tokens
✅ **SQL database** with proper relationships

---

## 🎯 What's Included

### Frontend (React + Tailwind + Framer Motion)
- ✨ Cinematic hero section
- ✨ Smooth animations and transitions
- ✨ Glass morphism UI elements
- ✨ Real-time donation browsing
- ✨ Interactive donation requests
- ✨ Role-based dashboards
- ✨ Complete responsive design
- ✨ Loading animations ("Serving Hope...")

### Backend (Node.js + Express)
- 🔐 JWT authentication
- 🔐 Role-based middleware
- 🔐 Input validation with Joi
- 🔐 Password hashing with bcrypt
- 🔐 Complete CRUD operations
- 🔐 Error handling & logging
- 🔐 CORS enabled
- 🔐 Connection pooling

### Database (MySQL)
- 📊 5 core tables (Users, Donations, Requests, History, Ratings)
- 📊 Proper foreign keys & constraints
- 📊 Strategic indexing for performance
- 📊 Sample data included
- 📊 Audit trail with timestamps
- 📊 On DELETE CASCADE for integrity

---

## 🚀 Installation Steps

### Step 1: Prerequisites
```bash
# Verify installations
node --version        # v16 or higher
npm --version         # v8 or higher
mysql --version       # v8.0 or higher
git --version         # Any recent version

# If not installed, download from:
# Node.js: https://nodejs.org
# MySQL: https://dev.mysql.com/downloads
# Git: https://git-scm.com
```

### Step 2: Clone Repository
```bash
git clone <your-repo-url>
cd food-Donation
```

### Step 3: Backend Setup
```bash
cd backend

# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Configure .env
# Edit .env and update:
# - DB_HOST: localhost (or your MySQL server)
# - DB_USER: root (your MySQL user)
# - DB_PASSWORD: your_password
# - DB_NAME: food_donation
# - JWT_SECRET: something_very_random_and_long

# 4. Start backend
npm run dev
# Should see: 🚀 Server running on port 5000
```

### Step 4: Database Setup (New Terminal)
```bash
# Create database & tables
mysql -u root -p < database/schema.sql

# Load sample data (optional but recommended)
mysql -u root -p food_donation < database/seedData.sql

# Verify tables created
mysql -u root -p food_donation
mysql> SHOW TABLES;
# Should see: users, donations, requests, history, ratings
mysql> EXIT;
```

### Step 5: Frontend Setup (New Terminal)
```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# Should see: ➜ Local: http://localhost:3000/

# 3. Open in browser
# Visit http://localhost:3000
```

### Step 6: Test Application
```bash
# Backend Test
curl http://localhost:5000/health
# Should return: {"status":"Server is running"}

# Try login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"raj@restaurant.com","password":"password"}'

# Frontend should load without errors
# Check browser console (F12)
```

---

## 🧪 Testing the Platform

### Account Credentials (from seed data)

**Test Donor Account:**
- Email: `raj@restaurant.com`
- Role: Donor (restaurant)
- Organization: Taste Of India Restaurant

**Test NGO Account:**
- Email: `help@foundation.org`
- Role: NGO
- Organization: Help Foundation

**Test Another Donor:**
- Email: `priya@foodcafe.com`
- Role: Donor (café)

### Testing Workflow

1. **Register New Account**
   - Go to /register
   - Choose role (Donor or NGO)
   - Create account

2. **Post Donation (Donor)**
   - Go to /donate
   - Fill in details:
     - Food Name: "Biryani"
     - Quantity: "20 portions"
     - Food Type: "prepared"
     - Location: "Delhi"
     - Expiry Time: Future time
   - Click "Post Donation"

3. **Browse Donations (NGO)**
   - Go to /request
   - See posted donations
   - Click "Request" button
   - Submit request

4. **Accept Request (Donor)**
   - Go to Dashboard
   - See pending requests
   - Click Accept
   - Status updates to "accepted"

5. **Track Donation**
   - Go to /tracking
   - See donation journey
   - Complete timeline visible

6. **View Statistics**
   - Dashboard shows:
     - Total donations
     - Delivered items
     - People served

---

## 📁 File Structure Quick Reference

```
backend/
├── src/
│   ├── server.js               ← Start here
│   ├── controllers/            ← Business logic
│   ├── routes/                 ← API endpoints
│   ├── middleware/             ← Auth/validation
│   ├── utils/                  ← Helpers
│   └── config/                 ← Database config
├── package.json
└── .env.example

frontend/
├── src/
│   ├── App.jsx                 ← Main component
│   ├── pages/                  ← Page components
│   ├── components/             ← Reusable UI
│   ├── services/               ← API calls
│   ├── hooks/                  ← State management
│   └── styles/                 ← Global styles
├── package.json
└── vite.config.js

database/
├── schema.sql                  ← Create tables
└── seedData.sql                ← Sample data

docs/
├── API.md                      ← Full API reference
├── DATABASE.md                 ← Schema details
├── DEPLOYMENT.md               ← Deploy guide
└── GETTING_STARTED.md          ← Detailed guide
```

---

## 🔌 Key API Endpoints

### Auth
```
POST   /api/auth/register      → Create account
POST   /api/auth/login         → Login user
GET    /api/auth/profile       → Get user info (protected)
```

### Donations
```
POST   /api/donations          → Create donation (protected)
GET    /api/donations          → List all donations
GET    /api/donations/:id      → Get donation details
PUT    /api/donations/:id      → Update status (protected)
DELETE /api/donations/:id      → Delete donation (protected)
```

### Requests
```
POST   /api/requests           → Request donation (NGO, protected)
GET    /api/requests           → List all requests
PUT    /api/requests/:id       → Update request status (protected)
```

### Tracking
```
GET    /api/tracking/history   → Get completed donations
GET    /api/tracking/stats     → Get platform statistics
GET    /api/tracking/track/:id → Track single donation
```

---

## 🎨 Design Features

### Color Palette
- Primary: Orange/Red (#ff6b35)
- Secondary: Gold/Yellow
- Background: Dark gray (#1a1a1a)
- Text: White/Light gray

### Animations
- Hero parallax scrolling
- Card hover effects (scale + glow)
- Smooth transitions (300ms)
- Loading animation: "Serving Hope..."
- Fade-in on scroll

### UI Components
- Glass morphism cards
- Gradient text
- Soft glow shadows
- Rounded borders (12px-20px)
- Responsive grid layout

---

## 🛠️ Development Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run migrate  # Run database migrations
```

### Database
```bash
# Create database
mysql -u root -p < database/schema.sql

# Backup
mysqldump -u root -p food_donation > backup.sql

# Restore
mysql -u root -p food_donation < backup.sql
```

---

## 🔒 Security Checklist

Before deploying:

- [ ] Change JWT_SECRET in .env
- [ ] Update MySQL password (don't use 'password')
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Validate all inputs
- [ ] Implement rate limiting
- [ ] Setup database backups
- [ ] Enable audit logging
- [ ] Review environment variables
- [ ] Test authentication thoroughly

---

## 📈 Performance Tips

### Frontend
- Build: `npm run build` (creates optimized dist/)
- Use Chrome DevTools Performance tab
- Enable browser caching
- Minimize images
- Lazy load components

### Backend
- Enable MySQL query cache
- Use connection pooling (already configured)
- Implement Redis caching for stats
- Add indexes on frequently searched fields
- Monitor slow queries

---

## 🚢 Deployment Checklist

### Before Deploying
- [ ] Test locally thoroughly
- [ ] Update all environment variables
- [ ] Run database migrations
- [ ] Build frontend: `npm run build`
- [ ] Test production build locally
- [ ] Setup CI/CD pipeline
- [ ] Configure DNS records
- [ ] Setup SSL certificate

### Quick Deployment Steps

**Backend (EC2):**
```bash
ssh -i key.pem ubuntu@server
cd /app/food-Donation/backend
git pull
npm install
pm2 start src/server.js --name "foodshare"
```

**Frontend (Vercel/Netlify):**
```bash
# Connect GitHub repo
# Set environment variables
# Auto-deploys on push
```

**Database (RDS/Cloud SQL):**
```bash
mysql -h endpoint -u admin -p food_donation < schema.sql
```

See `docs/DEPLOYMENT.md` for detailed instructions.

---

## 🐛 Troubleshooting

### "Connection Refused" on Backend
```bash
# Check if MySQL is running
mysql -u root -p

# Check port 5000 is available
netstat -tunlp | grep 5000

# Restart backend
npm run dev
```

### Frontend Can't Connect to Backend
```bash
# Check .env in frontend
# VITE_API_URL should be http://localhost:5000/api

# Check backend is running on 5000
curl http://localhost:5000/health

# Check CORS is enabled in backend
# See: backend/src/server.js
```

### Database Connection Error
```bash
# Check MySQL credentials in .env
# Check database exists: SHOW DATABASES;
# Check user has permissions: GRANT ALL...

# Restart MySQL if needed
sudo systemctl restart mysql
```

### Port Already in Use
```bash
# Find process using port
lsof -i :3000        # Frontend
lsof -i :5000        # Backend

# Kill process
kill -9 <PID>
```

---

## 📚 Additional Resources

- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Express.js:** https://expressjs.com/
- **MySQL:** https://dev.mysql.com/doc/
- **Vite:** https://vitejs.dev/

---

## 📞 Next Steps

1. **Complete Setup**
   - Follow installation steps above
   - Test all features
   - Verify database connections

2. **Customize**
   - Change company branding
   - Adjust colors in Tailwind config
   - Update contact information
   - Modify business logic as needed

3. **Test Thoroughly**
   - Create test accounts
   - Post donations
   - Make requests
   - Verify tracking
   - Check edge cases

4. **Deploy**
   - Follow deployment guide in `/docs/DEPLOYMENT.md`
   - Configure production environment
   - Setup CI/CD pipeline
   - Monitor in production

5. **Enhance**
   - Add more features
   - Implement real-time notifications
   - Add ratings system
   - Mobile app (React Native)
   - Admin dashboard

---

## 🎉 You're All Set!

Your FoodShare platform is ready to:
- ✅ Reduce food waste
- ✅ Fight hunger
- ✅ Build communities
- ✅ Track impact
- ✅ Make a difference

### Questions?
- Check documentation in `/docs`
- Review API examples in `docs/API.md`
- See database schema in `docs/DATABASE.md`
- Get deployment help in `docs/DEPLOYMENT.md`

### Ready to Launch?
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# Visit http://localhost:3000
```

---

**Made with ❤️ to reduce food waste and serve hope to communities.**

🚀 Happy coding!

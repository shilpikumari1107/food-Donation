# Project Structure & Getting Started

## 📁 Complete File Structure

```
food-Donation/
├── README.md (Main documentation)
├── .gitignore (Git ignore rules)
│
├── frontend/                          # React Frontend Application
│   ├── index.html                     # HTML entry point
│   ├── package.json                   # Dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   ├── postcss.config.js              # PostCSS config
│   ├── README.md                      # Frontend README
│   │
│   └── src/
│       ├── main.jsx                   # React entry point
│       ├── App.jsx                    # Main app component
│       │
│       ├── pages/                     # Page components
│       │   ├── Home.jsx               # Home page with hero
│       │   ├── Donate.jsx             # Post food donation
│       │   ├── Request.jsx            # Browse & request food
│       │   ├── Dashboard.jsx          # User dashboard
│       │   ├── About.jsx              # About page
│       │   ├── Contact.jsx            # Contact page
│       │   ├── Login.jsx              # Login page
│       │   └── Register.jsx           # Registration page
│       │
│       ├── components/                # Reusable components
│       │   ├── Header.jsx             # Navigation header
│       │   ├── Footer.jsx             # Footer component
│       │   ├── Hero.jsx               # Hero section
│       │   └── ImpactCards.jsx        # Impact display
│       │
│       ├── services/                  # API services
│       │   └── api.js                 # Axios instance & endpoints
│       │
│       ├── hooks/                     # Custom React hooks
│       │   ├── useAuth.js             # Auth context hook
│       │   └── useAuthStore.js        # Zustand auth store
│       │
│       └── styles/                    # Global styles
│           └── globals.css            # Tailwind + animations
│
├── backend/                           # Express Backend API
│   ├── package.json                   # Dependencies
│   ├── .env.example                   # Example environment
│   ├── README.md                      # Backend README
│   │
│   └── src/
│       ├── server.js                  # Express app entry
│       │
│       ├── config/                    # Configuration
│       │   └── database.js            # MySQL connection pool
│       │
│       ├── controllers/               # Business logic
│       │   ├── authController.js      # Auth operations
│       │   ├── donationController.js  # Donation operations
│       │   ├── requestController.js   # Request operations
│       │   └── historyController.js   # History operations
│       │
│       ├── routes/                    # API routes
│       │   ├── auth.js                # Authentication endpoints
│       │   ├── donations.js           # Donation endpoints
│       │   ├── requests.js            # Request endpoints
│       │   └── tracking.js            # Tracking endpoints
│       │
│       ├── middleware/                # Express middleware
│       │   └── auth.js                # JWT & role validation
│       │
│       └── utils/                     # Utility functions
│           ├── validators.js          # Input validation schemas
│           ├── jwt.js                 # JWT utilities
│           └── bcrypt.js              # Password hashing
│
├── database/                          # Database files
│   ├── schema.sql                     # Complete DB schema
│   └── seedData.sql                   # Sample data
│
├── docs/                              # Documentation
│   ├── API.md                         # API reference
│   ├── DATABASE.md                    # DB documentation
│   └── DEPLOYMENT.md                  # Deployment guide
│
└── .github/                           # GitHub configuration
    └── workflows/
        └── deploy.yml                 # CI/CD workflow (optional)
```

## 🚀 Quick Start Guide

### Prerequisites
```bash
# Check versions
node --version      # v16+
npm --version       # v8+
mysql --version     # v8.0+
```

### 1. Clone & Setup
```bash
# Clone repository
git clone <your-repo-url>
cd food-Donation

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MySQL credentials

# Setup frontend
cd ../frontend
npm install
```

### 2. Database Setup
```bash
# Create database and tables
mysql -u root -p < database/schema.sql

# Load sample data (optional)
mysql -u root -p food_donation < database/seedData.sql
```

### 3. Start Development
```bash
# Terminal 1: Backend (port 5000)
cd backend
npm run dev

# Terminal 2: Frontend (port 3000)
cd frontend
npm run dev
```

Visit `http://localhost:3000`

## 📚 Key Files Explained

### Frontend

**App.jsx**
- Main component with routing
- Wraps all pages
- Connects Header/Footer

**pages/Home.jsx**
- Landing page
- Hero + Impact cards
- CTA buttons

**pages/Donate.jsx**
- Food donation form
- Required: food name, quantity, location, expiry
- POST to `/api/donations`

**pages/Request.jsx**
- Browse donations
- Filter by location/type
- Submit requests

**services/api.js**
- Axios instance
- All API methods
- Token injection in requests

**styles/globals.css**
- Tailwind import
- Custom animations
- Gradients and effects

### Backend

**server.js**
- Express app initialization
- Middleware setup
- Route registration
- Server listen

**controllers/authController.js**
- Register: Hash password, create user
- Login: Verify credentials, return token
- getProfile: Fetch user data

**controllers/donationController.js**
- createDonation: Insert donation
- getDonations: Query with filters
- updateDonation: Change status
- getDonorDonations: User's posts

**controllers/requestController.js**
- createRequest: NGO requests food
- updateRequestStatus: Accept/deliver/reject
- getNGORequests: NGO's pending requests

**middleware/auth.js**
- authMiddleware: Verify JWT token
- roleMiddleware: Check user role

**utils/validators.js**
- Joi schemas for validation
- validate(): Express middleware
- Input sanitization

## 🔐 Authentication Flow

```
User Registration
   ↓
POST /api/auth/register
   ↓
Hash password → Create user → Generate JWT
   ↓
Send token to frontend
   ↓
Store in localStorage
   ↓
Include in Authorization header

Authorization Header:
Authorization: Bearer <JWT_TOKEN>
```

## 📊 Donation Lifecycle

```
1. Donor posts food
   POST /api/donations
   → Status: "available"

2. NGO browses & requests
   POST /api/requests
   → Request Status: "pending"

3. Donor reviews
   PUT /api/requests/:id
   → Accept request
   → Status: "accepted"
   → Donation Status: "accepted"

4. Food delivered
   PUT /api/requests/:id
   → Status: "delivered"
   → Donation Status: "delivered"
   → Entry in history table

5. Impact recorded
   GET /api/tracking/stats
   → Used for dashboard
```

## 🎨 UI Component Hierarchy

```
App
├── Header
│   ├── Nav Links
│   └── Auth Buttons
├── Router
│   ├── Home Page
│   │   ├── Hero
│   │   └── ImpactCards
│   ├── Donate Page
│   │   └── DonationForm
│   ├── Request Page
│   │   ├── Filters
│   │   └── DonationCards
│   ├── Dashboard
│   │   ├── StatsCards
│   │   └── ActivityFeed
│   ├── About Page
│   ├── Contact Page
│   ├── Login Page
│   └── Register Page
└── Footer
```

## 🔌 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}
```

### Error Response
```json
{
  "error": "Descriptive error message"
}
```

## 🗄️ Database Relationships

```
users (1) ──────────→ (n) donations
         ├──────────→ (n) requests (as NGO)
         └──────────→ (n) ratings

donations (1) ──────→ (n) requests
           ├─────────→ (n) history
           └─────────→ (n) ratings

requests (1) ────────→ (1) history
```

## 🧪 Testing Credentials

Use these to test:

**Donor Account**
- Email: `raj@restaurant.com`
- Password: (check seedData for hashed password)
- Role: donor

**NGO Account**
- Email: `help@foundation.org`
- Password: (check seedData for hashed password)
- Role: ngo

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Common Tasks

### Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Add link in `Header.jsx`
4. Import components as needed

### Add API Endpoint
1. Create controller method
2. Add route in `routes/` file
3. Test with Postman
4. Update frontend to call it

### Modify Database
1. Update `schema.sql`
2. Re-run migrations: `mysql < schema.sql`
3. Update backend models if needed
4. Test all queries

### Deploy
1. See `docs/DEPLOYMENT.md`
2. Set environment variables
3. Build frontend: `npm run build`
4. Start backend with PM2

## 🐛 Debugging Tips

### Frontend
- Browser DevTools (F12)
- React Developer Tools extension
- Console for errors
- Network tab for API calls

### Backend
- PM2 logs: `pm2 logs`
- Postman for API testing
- MySQL command line checks
- console.log() for debugging

### Database
```bash
# Check if data exists
mysql> SELECT * FROM donations LIMIT 5;

# Check constraints
mysql> SHOW CREATE TABLE donations;

# Check indexes
mysql> SHOW INDEX FROM donations;
```

## 📖 Additional Resources

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Express.js: https://expressjs.com
- MySQL Docs: https://dev.mysql.com/doc
- Vite: https://vitejs.dev

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📞 Support

- Check documentation in `/docs`
- Review API examples
- Check sample data for structure
- Ask questions in issues

---

Happy coding! 🚀

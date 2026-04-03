# FoodShare Backend API

Complete food donation platform backend built with:
- **Node.js & Express** - Fast HTTP server
- **MySQL** - Relational database
- **JWT** - Secure authentication
- **Joi** - Data validation
- **Bcrypt** - Password hashing

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL user
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile

### Donations
- `POST /api/donations` - Create donation (auth required)
- `GET /api/donations` - List all available donations
- `GET /api/donations/:id` - Get donation details
- `PUT /api/donations/:id` - Update donation (auth required)
- `DELETE /api/donations/:id` - Delete donation (auth required)
- `GET /api/donations/my-donations` - Get user's donations (auth required)

### Requests
- `POST /api/requests` - Create request (auth required, NGO role)
- `GET /api/requests` - List all requests
- `GET /api/requests/my-requests` - Get user's requests (auth required)
- `PUT /api/requests/:id` - Update request status (auth required)

### Tracking
- `GET /api/tracking/history` - Get donation history
- `GET /api/tracking/stats` - Get platform statistics
- `GET /api/tracking/track/:donationId` - Track specific donation

## Database Schema

See `database/schema.sql` for complete schema.

### Tables
- **users** - User accounts with roles
- **donations** - Food donation listings
- **requests** - NGO requests for donations
- **history** - Donation completion tracking
- **ratings** - User ratings (optional)

## Key Features

✨ Role-based access control (Donor, NGO, Admin)
✨ JWT authentication with token expiry
✨ Real-time donation matching
✨ Complete donation tracking
✨ Data validation with Joi
✨ Error handling and logging
✨ CORS enabled for cross-origin requests

## Running

Development: `npm run dev`
Production: `npm start`

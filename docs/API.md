# Complete API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "donor",
  "phone": "9876543210",
  "organization": "Your Org"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "donor",
  "phone": "9876543210",
  "organization": null,
  "created_at": "2024-01-01T12:00:00Z"
}
```

---

## Donation Endpoints

### Create Donation
```http
POST /donations
Authorization: Bearer <token>
Content-Type: application/json

{
  "foodName": "Biryani",
  "quantity": "20 portions",
  "foodType": "prepared",
  "location": "Downtown Delhi",
  "expiryTime": "2024-01-01T20:00:00Z",
  "description": "Fresh biryani from our restaurant"
}

Response: 201 Created
{
  "message": "Donation posted successfully",
  "donation": {
    "id": 1,
    "foodName": "Biryani",
    "quantity": "20 portions",
    "foodType": "prepared",
    "location": "Downtown Delhi",
    "expiryTime": "2024-01-01T20:00:00Z",
    "status": "available"
  }
}
```

### Get All Donations
```http
GET /donations?status=available&location=Delhi&foodType=prepared

Response: 200 OK
[
  {
    "id": 1,
    "food_name": "Biryani",
    "quantity": "20 portions",
    "food_type": "prepared",
    "location": "Downtown Delhi",
    "expiry_time": "2024-01-01T20:00:00Z",
    "status": "available",
    "donor_name": "John Doe",
    "donor_phone": "9876543210",
    "created_at": "2024-01-01T12:00:00Z"
  }
]
```

### Get Donation by ID
```http
GET /donations/1

Response: 200 OK
{
  "id": 1,
  "food_name": "Biryani",
  "quantity": "20 portions",
  "food_type": "prepared",
  "location": "Downtown Delhi",
  "expiry_time": "2024-01-01T20:00:00Z",
  "status": "available",
  "description": "Fresh biryani from our restaurant",
  "donor_name": "John Doe",
  "donor_phone": "9876543210",
  "created_at": "2024-01-01T12:00:00Z"
}
```

### Update Donation
```http
PUT /donations/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted"
}

Response: 200 OK
{
  "message": "Donation updated successfully"
}
```

### Delete Donation
```http
DELETE /donations/1
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Donation deleted successfully"
}
```

### Get My Donations
```http
GET /donations/my-donations
Authorization: Bearer <token>

Response: 200 OK
[
  { ...donation objects... }
]
```

---

## Request Endpoints

### Create Request (NGO Only)
```http
POST /requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "donationId": 1,
  "notes": "We can pickup within 2 hours"
}

Response: 201 Created
{
  "message": "Request created successfully",
  "request": {
    "id": 1,
    "donationId": 1,
    "status": "pending"
  }
}
```

### Get All Requests
```http
GET /requests?status=pending

Response: 200 OK
[
  {
    "id": 1,
    "donation_id": 1,
    "ngo_id": 2,
    "status": "pending",
    "food_name": "Biryani",
    "quantity": "20 portions",
    "location": "Downtown Delhi",
    "ngo_name": "Help Foundation",
    "donor_name": "John Doe",
    "created_at": "2024-01-01T12:00:00Z"
  }
]
```

### Get My Requests (NGO)
```http
GET /requests/my-requests
Authorization: Bearer <token>

Response: 200 OK
[
  { ...request objects... }
]
```

### Update Request Status (Donor or Admin)
```http
PUT /requests/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted"
}

Valid statuses: pending, accepted, rejected, delivered

Response: 200 OK
{
  "message": "Request status updated successfully"
}
```

---

## Tracking Endpoints

### Get Donation History
```http
GET /tracking/history

Response: 200 OK
[
  {
    "id": 1,
    "donation_id": 1,
    "request_id": 1,
    "food_name": "Biryani",
    "quantity": "20 portions",
    "donor_name": "John Doe",
    "ngo_name": "Help Foundation",
    "completed_at": "2024-01-01T18:00:00Z"
  }
]
```

### Get Platform Statistics
```http
GET /tracking/stats

Response: 200 OK
{
  "totalDonations": 150,
  "deliveredDonations": 120,
  "totalNGOs": 25,
  "totalDonors": 100
}
```

### Track Specific Donation
```http
GET /tracking/track/1

Response: 200 OK
{
  "donation": {
    "id": 1,
    "food_name": "Biryani",
    "quantity": "20 portions",
    "status": "delivered",
    "donor_name": "John Doe"
  },
  "requests": [
    {
      "id": 1,
      "status": "delivered",
      "ngo_name": "Help Foundation"
    }
  ],
  "history": [
    {
      "id": 1,
      "completed_at": "2024-01-01T18:00:00Z"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token or no token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Role-Based Access

### Donor
- ✅ Create donations
- ✅ View own donations
- ✅ Accept/reject requests
- ✅ Update donation status
- ✅ Delete own donations

### NGO
- ✅ Create requests for donations
- ✅ View own requests
- ✅ Browse all donations
- ✅ Update request status

### Admin (Future)
- ✅ Full access to all resources
- ✅ User management
- ✅ Platform statistics
- ✅ Content moderation

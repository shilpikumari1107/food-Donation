# Database Documentation

## Overview

FoodShare uses MySQL as the relational database. The schema is designed with proper normalization, foreign keys, and indexes for optimal performance.

## Schema Design

### Entities

#### 1. Users Table
Stores all user accounts with role-based access.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('donor', 'ngo', 'admin') NOT NULL DEFAULT 'donor',
  organization VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);
```

**Key Points:**
- Unique email constraint prevents duplicate accounts
- Role-based access control (RBAC)
- Timestamps for audit trail
- Indexes on frequently searched columns

#### 2. Donations Table
Stores food donation listings posted by donors.

```sql
CREATE TABLE donations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  food_name VARCHAR(150) NOT NULL,
  quantity VARCHAR(50) NOT NULL,
  food_type VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  expiry_time DATETIME NOT NULL,
  status ENUM('available', 'accepted', 'delivered', 'cancelled') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_location (location),
  INDEX idx_user_id (user_id),
  INDEX idx_expiry_time (expiry_time)
);
```

**Key Points:**
- Foreign key to users (donor)
- Status tracking (lifecycle: available → accepted → delivered)
- Indexed on status, location for fast queries
- Automatic cascading delete
- Expiry time for urgency

#### 3. Requests Table
Stores NGO requests for donations.

```sql
CREATE TABLE requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ngo_id INT NOT NULL,
  donation_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected', 'delivered') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ngo_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_ngo_id (ngo_id),
  INDEX idx_donation_id (donation_id),
  UNIQUE KEY unique_ngo_donation (ngo_id, donation_id)
);
```

**Key Points:**
- Foreign keys to users (NGO) and donations
- Unique constraint prevents duplicate requests
- Status tracking for request lifecycle
- Notes for communication

#### 4. History Table
Tracks completed donations for impact measurement.

```sql
CREATE TABLE history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  donation_id INT NOT NULL,
  request_id INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
  INDEX idx_donation_id (donation_id),
  INDEX idx_completed_at (completed_at)
);
```

**Key Points:**
- Records completed donation transactions
- Used for impact statistics
- Indexed for fast historical queries

#### 5. Ratings Table (Optional)
Future enhancement for user ratings and reviews.

```sql
CREATE TABLE ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  from_user_id INT NOT NULL,
  to_user_id INT NOT NULL,
  donation_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
  INDEX idx_to_user_id (to_user_id),
  INDEX idx_donation_id (donation_id)
);
```

## Relationships

### One-to-Many Relationships
- **Users → Donations** (1:N): One user can post multiple donations
- **Users → Requests** (1:N): One NGO can make multiple requests
- **Donations → Requests** (1:N): One donation can receive multiple requests
- **Donations → History** (1:N): One donation can have multiple history records

### Many-to-Many Relationships
- **Users ↔ Users** (via Ratings): Users can rate each other

## Indexing Strategy

**Indexes Created:**
- `idx_email` on users.email (fast user lookup)
- `idx_role` on users.role (RBAC filtering)
- `idx_status` on donations.status (filter available foods)
- `idx_location` on donations.location (geographical search)
- `idx_user_id` on donations.user_id (donor's donations)
- `idx_expiry_time` on donations.expiry_time (sort by urgency)
- `idx_status` on requests.status (filter request states)
- `idx_ngo_id` on requests.ngo_id (NGO's requests)
- `idx_donation_id` on requests.donation_id (donation's requests)
- `unique_ngo_donation` (prevent duplicate requests)
- `idx_completed_at` on history.completed_at (timeline queries)

## Common Queries

### 1. Get Available Donations by Location
```sql
SELECT d.*, u.name as donor_name, u.phone
FROM donations d
JOIN users u ON d.user_id = u.id
WHERE d.status = 'available' 
  AND d.location LIKE '%Delhi%'
  AND d.expiry_time > NOW()
ORDER BY d.expiry_time ASC
LIMIT 20;
```

### 2. Get NGO's Requests with Donation Details
```sql
SELECT r.*, d.food_name, d.quantity, d.location, 
       donor.name as donor_name, donor.phone as donor_phone
FROM requests r
JOIN donations d ON r.donation_id = d.id
JOIN users donor ON d.user_id = donor.id
WHERE r.ngo_id = 5 AND r.status = 'pending'
ORDER BY r.created_at DESC;
```

### 3. Get Donation Journey
```sql
SELECT d.*, 
       COUNT(DISTINCT r.id) as request_count,
       r.status as latest_request_status,
       ngo.name as latest_ngo_name,
       h.completed_at
FROM donations d
LEFT JOIN requests r ON d.id = r.donation_id
LEFT JOIN users ngo ON r.ngo_id = ngo.id
LEFT JOIN history h ON d.id = h.donation_id
WHERE d.id = 1
GROUP BY d.id;
```

### 4. Get Platform Statistics
```sql
SELECT 
  COUNT(DISTINCT CASE WHEN role = 'donor' THEN id END) as total_donors,
  COUNT(DISTINCT CASE WHEN role = 'ngo' THEN id END) as total_ngos,
  (SELECT COUNT(*) FROM donations WHERE status = 'available') as available_donations,
  (SELECT COUNT(*) FROM history) as completed_donations,
  (SELECT SUM(CAST(quantity AS UNSIGNED)) FROM donations WHERE status = 'delivered') as total_quantity_served
FROM users;
```

### 5. Get Donor's Contribution History
```sql
SELECT d.*, 
       COUNT(r.id) as total_requests,
       SUM(CASE WHEN r.status = 'delivered' THEN 1 ELSE 0 END) as delivered_count
FROM donations d
LEFT JOIN requests r ON d.id = r.donation_id
WHERE d.user_id = 1
GROUP BY d.id
ORDER BY d.created_at DESC;
```

## Data Integrity

### Foreign Key Constraints
- Ensures referential integrity
- Cascading deletes prevent orphaned records
- Maintains data consistency

### Unique Constraints
- Prevents duplicate user accounts (`email`)
- Prevents duplicate requests (`ngo_id`, `donation_id`)

### Check Constraints
- Rating validation (1-5 range)
- Ensures enum values for status fields

## Performance Optimization

### Query Optimization Tips
1. Use EXPLAIN to analyze queries
2. Ensure indexes cover WHERE clauses
3. Use LIMIT for pagination
4. Denormalize if necessary for complex reports
5. Archive old history records

### Connection Pooling
- Implement connection pooling in Node.js
- Pool size: 10-20 connections
- Connection timeout: 10 seconds

### Caching Strategy
- Cache donor profiles
- Cache donation counts
- Cache statistics (refresh hourly)

## Backup & Recovery

### Regular Backups
```bash
# Full backup
mysqldump -u root -p food_donation > backup.sql

# Incremental backup (requires binary logs enabled)
mysqlbinlog mysql-bin.* > incremental.sql
```

### Recovery
```bash
# Restore from backup
mysql -u root -p food_donation < backup.sql
```

## Maintenance

### Regular Tasks
1. Optimize tables monthly
2. Analyze table statistics
3. Rebuild fragmented indexes
4. Archive old history records
5. Monitor query performance

### Monitoring Queries
```sql
-- Check table sizes
SELECT table_name, ROUND((data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'food_donation';

-- Check slow queries
SELECT query_time, sql_text FROM mysql.slow_log;

-- Check connection count
SHOW PROCESSLIST;
```

## Scalability Considerations

### Future Enhancements
- Read replicas for horizontal scaling
- Sharding by location for large datasets
- NoSQL cache layer (Redis) for frequent queries
- Database archival for historical data
- Real-time analytics database

---

See `schema.sql` for complete schema creation script.

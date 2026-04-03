-- Sample Data for Food Donation Platform

USE food_donation;

-- Insert Sample Donors
INSERT INTO users (name, email, password, phone, role, organization) VALUES
('Raj Patel', 'raj@restaurant.com', '$2a$10$VGHB7P3VGLn2X5Y6Z8P9k.L7K8M9N0P1Q2R3S4T5U6V7W8X9Y0Z1', '9876543210', 'donor', 'Taste Of India Restaurant'),
('Priya Singh', 'priya@foodcafe.com', '$2a$10$VGHB7P3VGLn2X5Y6Z8P9k.L7K8M9N0P1Q2R3S4T5U6V7W8X9Y0Z1', '9876543211', 'donor', 'Cafe Prime'),
('Event Manager', 'events@corp.com', '$2a$10$VGHB7P3VGLn2X5Y6Z8P9k.L7K8M9N0P1Q2R3S4T5U6V7W8X9Y0Z1', '9876543212', 'donor', 'Corporate Events Ltd');

-- Insert Sample NGOs
INSERT INTO users (name, email, password, phone, role, organization) VALUES
('Help Foundation', 'help@foundation.org', '$2a$10$VGHB7P3VGLn2X5Y6Z8P9k.L7K8M9N0P1Q2R3S4T5U6V7W8X9Y0Z1', '9876543213', 'ngo', 'Help Foundation'),
('Hunger Relief', 'info@hungerrelief.org', '$2a$10$VGHB7P3VGLn2X5Y6Z8P9k.L7K8M9N0P1Q2R3S4T5U6V7W8X9Y0Z1', '9876543214', 'ngo', 'Hunger Relief Society'),
('Food For All', 'contact@foodforall.org', '$2a$10$VGHB7P3VGLn2X5Y6Z8P9k.L7K8M9N0P1Q2R3S4T5U6V7W8X9Y0Z1', '9876543215', 'ngo', 'Food For All NGO');

-- Insert Sample Donations
INSERT INTO donations (user_id, food_name, quantity, food_type, location, description, expiry_time, status) VALUES
(1, 'Biryani (Rice Dish)', '20 portions', 'prepared', 'Downtown Delhi', 'Fresh biryani prepared today, must be consumed by 8 PM', DATE_ADD(NOW(), INTERVAL 4 HOUR), 'available'),
(2, 'Samosas', '50 pieces', 'prepared', 'Café Square, Mumbai', 'Hot samosas freshly made, available for pickup immediately', DATE_ADD(NOW(), INTERVAL 3 HOUR), 'available'),
(3, 'Bread & Butter', '100 slices', 'bakery', 'Tech Park, Bangalore', 'Surplus bread from event, good quality', DATE_ADD(NOW(), INTERVAL 6 HOUR), 'available'),
(1, 'Paneer Curry', '30 portions', 'prepared', 'Downtown Delhi', 'Vegetarian curry with paneer cheese', DATE_ADD(NOW(), INTERVAL 5 HOUR), 'delivered'),
(2, 'Cookies Box', '200 pieces', 'bakery', 'Café Square, Mumbai', 'Assorted cookies, all packaging intact', DATE_ADD(NOW(), INTERVAL 2 HOUR), 'accepted');

-- Insert Sample Requests
INSERT INTO requests (ngo_id, donation_id, status, notes) VALUES
(4, 1, 'pending', 'We can pickup within 2 hours'),
(5, 2, 'accepted', 'Our team will collect at 6 PM'),
(6, 3, 'pending', 'Requesting for our community center'),
(4, 4, 'delivered', 'Successfully delivered to shelter'),
(5, 5, 'accepted', 'Will pickup tomorrow morning');

-- Insert Sample History
INSERT INTO history (donation_id, request_id, completed_at) VALUES
(4, 3, NOW()),
(5, 5, DATE_ADD(NOW(), INTERVAL 1 DAY));

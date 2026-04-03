import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Donation services
export const donationService = {
  createDonation: (data) => api.post('/donations', data),
  getDonations: (params) => api.get('/donations', { params }),
  getDonationById: (id) => api.get(`/donations/${id}`),
  updateDonation: (id, data) => api.put(`/donations/${id}`, data),
  deleteDonation: (id) => api.delete(`/donations/${id}`),
  getMyDonations: () => api.get('/donations/my-donations'),
};

// Request services
export const requestService = {
  createRequest: (data) => api.post('/requests', data),
  getRequests: (params) => api.get('/requests', { params }),
  getMyRequests: () => api.get('/requests/my-requests'),
  updateRequestStatus: (id, status) => api.put(`/requests/${id}`, { status }),
};

// Tracking services
export const trackingService = {
  getHistory: () => api.get('/tracking/history'),
  getStats: () => api.get('/tracking/stats'),
  getDonationTrack: (donationId) => api.get(`/tracking/track/${donationId}`),
};

export default api;

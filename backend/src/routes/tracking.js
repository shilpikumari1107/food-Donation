const express = require('express');
const {
  getDonationHistory,
  getDonationTrack,
  getStats,
} = require('../controllers/historyController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/history', getDonationHistory);
router.get('/stats', getStats);
router.get('/track/:donationId', getDonationTrack);

module.exports = router;

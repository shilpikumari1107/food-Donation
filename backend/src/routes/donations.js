const express = require('express');
const {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getDonorDonations,
} = require('../controllers/donationController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { validate, donationSchema } = require('../utils/validators');

const router = express.Router();

router.post('/', authMiddleware, validate(donationSchema), createDonation);
router.get('/', getDonations);
router.get('/my-donations', authMiddleware, getDonorDonations);
router.get('/:id', getDonationById);
router.put('/:id', authMiddleware, updateDonation);
router.delete('/:id', authMiddleware, deleteDonation);

module.exports = router;

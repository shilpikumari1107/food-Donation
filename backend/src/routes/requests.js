const express = require('express');
const {
  createRequest,
  getRequests,
  getNGORequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { validate, requestSchema } = require('../utils/validators');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['ngo']), validate(requestSchema), createRequest);
router.get('/', getRequests);
router.get('/my-requests', authMiddleware, roleMiddleware(['ngo']), getNGORequests);
router.put('/:id', authMiddleware, updateRequestStatus);

module.exports = router;

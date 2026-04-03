const pool = require('../config/database');

const createRequest = async (req, res) => {
  try {
    const { donationId, notes } = req.validated;
    const ngoId = req.user.id;

    const connection = await pool.getConnection();

    // Check if donation exists and is available
    const [donations] = await connection.query(
      'SELECT * FROM donations WHERE id = ? AND status = "available"',
      [donationId]
    );

    if (donations.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Donation not available' });
    }

    // Check if NGO already requested this donation
    const [existing] = await connection.query(
      'SELECT * FROM requests WHERE donation_id = ? AND ngo_id = ?',
      [donationId, ngoId]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'You already requested this donation' });
    }

    // Create request
    const [result] = await connection.query(
      `INSERT INTO requests (ngo_id, donation_id, status, notes)
       VALUES (?, ?, 'pending', ?)`,
      [ngoId, donationId, notes || null]
    );

    connection.release();

    res.status(201).json({
      message: 'Request created successfully',
      request: {
        id: result.insertId,
        donationId,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
};

const getRequests = async (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT r.*, d.food_name, d.quantity, d.location, d.expiry_time,
             u.name as ngo_name, u.phone, u.organization,
             donor.name as donor_name
      FROM requests r
      JOIN donations d ON r.donation_id = d.id
      JOIN users u ON r.ngo_id = u.id
      JOIN users donor ON d.user_id = donor.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }

    query += ' ORDER BY r.created_at DESC LIMIT 100';

    const connection = await pool.getConnection();
    const [requests] = await connection.query(query, params);
    connection.release();

    res.json(requests);
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

const getNGORequests = async (req, res) => {
  try {
    const ngoId = req.user.id;

    const connection = await pool.getConnection();
    const [requests] = await connection.query(
      `SELECT r.*, d.food_name, d.quantity, d.location, d.expiry_time,
              donor.name as donor_name, donor.phone as donor_phone
       FROM requests r
       JOIN donations d ON r.donation_id = d.id
       JOIN users donor ON d.user_id = donor.id
       WHERE r.ngo_id = ?
       ORDER BY r.created_at DESC`,
      [ngoId]
    );

    connection.release();

    res.json(requests);
  } catch (error) {
    console.error('Get NGO requests error:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const validStatuses = ['pending', 'accepted', 'rejected', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const connection = await pool.getConnection();

    // Get request and check authorization
    const [requests] = await connection.query(
      `SELECT r.*, d.user_id as donor_id FROM requests r
       JOIN donations d ON r.donation_id = d.id
       WHERE r.id = ?`,
      [id]
    );

    if (requests.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Request not found' });
    }

    const request = requests[0];

    // Allow donor to accept/reject, or NGO/Admin to mark delivered
    if (status !== 'delivered' && request.donor_id !== userId) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update request status
    await connection.query(
      `UPDATE requests SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [status, id]
    );

    // If accepted, update donation status
    if (status === 'accepted') {
      await connection.query(
        `UPDATE donations SET status = 'accepted' WHERE id = ?`,
        [request.donation_id]
      );
    }

    // If delivered, update donation status and create history entry
    if (status === 'delivered') {
      await connection.query(
        `UPDATE donations SET status = 'delivered' WHERE id = ?`,
        [request.donation_id]
      );

      await connection.query(
        `INSERT INTO history (donation_id, request_id, completed_at)
         VALUES (?, ?, CURRENT_TIMESTAMP)`,
        [request.donation_id, id]
      );
    }

    connection.release();

    res.json({ message: 'Request status updated successfully' });
  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({ error: 'Failed to update request' });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getNGORequests,
  updateRequestStatus,
};

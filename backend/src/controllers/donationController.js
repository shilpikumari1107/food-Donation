const pool = require('../config/database');

const createDonation = async (req, res) => {
  try {
    const { foodName, quantity, foodType, location, expiryTime, description } = req.validated;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO donations 
       (user_id, food_name, quantity, food_type, location, expiry_time, description, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'available')`,
      [userId, foodName, quantity, foodType, location, expiryTime, description || null]
    );

    connection.release();

    res.status(201).json({
      message: 'Donation posted successfully',
      donation: {
        id: result.insertId,
        foodName,
        quantity,
        foodType,
        location,
        expiryTime,
        status: 'available',
      },
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
};

const getDonations = async (req, res) => {
  try {
    const { status, location, foodType } = req.query;

    let query = `
      SELECT d.*, u.name as donor_name, u.phone as donor_phone, u.organization
      FROM donations d
      JOIN users u ON d.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND d.status = ?';
      params.push(status);
    }
    if (foodType) {
      query += ' AND d.food_type = ?';
      params.push(foodType);
    }
    if (location) {
      query += ' AND d.location LIKE ?';
      params.push(`%${location}%`);
    }

    query += ' ORDER BY d.created_at DESC LIMIT 50';

    const connection = await pool.getConnection();
    const [donations] = await connection.query(query, params);
    connection.release();

    res.json(donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();
    const [donations] = await connection.query(
      `SELECT d.*, u.name as donor_name, u.phone as donor_phone, u.organization
       FROM donations d
       JOIN users u ON d.user_id = u.id
       WHERE d.id = ?`,
      [id]
    );

    connection.release();

    if (donations.length === 0) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donations[0]);
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
};

const updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    // Check if user owns this donation
    const [donations] = await connection.query(
      'SELECT * FROM donations WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (donations.length === 0) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized' });
    }

    await connection.query(
      'UPDATE donations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );

    connection.release();

    res.json({ message: 'Donation updated successfully' });
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ error: 'Failed to update donation' });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    // Check if user owns this donation
    const [donations] = await connection.query(
      'SELECT * FROM donations WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (donations.length === 0) {
      connection.release();
      return res.status(403).json({ error: 'Not authorized' });
    }

    await connection.query('DELETE FROM donations WHERE id = ?', [id]);

    connection.release();

    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({ error: 'Failed to delete donation' });
  }
};

const getDonorDonations = async (req, res) => {
  try {
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [donations] = await connection.query(
      `SELECT * FROM donations WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    connection.release();

    res.json(donations);
  } catch (error) {
    console.error('Get donor donations error:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getDonorDonations,
};

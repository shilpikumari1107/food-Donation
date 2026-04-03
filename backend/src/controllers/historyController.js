const pool = require('../config/database');

const getDonationHistory = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [history] = await connection.query(
      `SELECT h.*, d.food_name, d.quantity, d.location,
              donor.name as donor_name, ngo.name as ngo_name,
              r.id as request_id
       FROM history h
       JOIN donations d ON h.donation_id = d.id
       JOIN requests r ON h.request_id = r.id
       JOIN users donor ON d.user_id = donor.id
       JOIN users ngo ON r.ngo_id = ngo.id
       ORDER BY h.completed_at DESC
       LIMIT 100`
    );

    connection.release();

    res.json(history);
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

const getDonationTrack = async (req, res) => {
  try {
    const { donationId } = req.params;

    const connection = await pool.getConnection();

    // Get donation
    const [donations] = await connection.query(
      `SELECT d.*, u.name as donor_name FROM donations d
       JOIN users u ON d.user_id = u.id
       WHERE d.id = ?`,
      [donationId]
    );

    if (donations.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Get related requests and history
    const [requests] = await connection.query(
      `SELECT r.*, ngo.name as ngo_name, ngo.organization
       FROM requests r
       JOIN users ngo ON r.ngo_id = ngo.id
       WHERE r.donation_id = ?
       ORDER BY r.created_at DESC`,
      [donationId]
    );

    const [historyData] = await connection.query(
      `SELECT * FROM history WHERE donation_id = ?`,
      [donationId]
    );

    connection.release();

    res.json({
      donation: donations[0],
      requests,
      history: historyData,
    });
  } catch (error) {
    console.error('Get track error:', error);
    res.status(500).json({ error: 'Failed to fetch tracking data' });
  }
};

const getStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Total donations
    const [totalDonations] = await connection.query(
      'SELECT COUNT(*) as count FROM donations'
    );

    // Delivered donations
    const [deliveredDonations] = await connection.query(
      'SELECT COUNT(*) as count FROM donations WHERE status = "delivered"'
    );

    // Active NGOs
    const [totalNGOs] = await connection.query(
      'SELECT COUNT(*) as count FROM users WHERE role = "ngo"'
    );

    // Active Donors
    const [totalDonors] = await connection.query(
      'SELECT COUNT(*) as count FROM users WHERE role = "donor"'
    );

    connection.release();

    res.json({
      totalDonations: totalDonations[0].count,
      deliveredDonations: deliveredDonations[0].count,
      totalNGOs: totalNGOs[0].count,
      totalDonors: totalDonors[0].count,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

module.exports = {
  getDonationHistory,
  getDonationTrack,
  getStats,
};

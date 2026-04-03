import { motion } from 'framer-motion';
import { useState } from 'react';
import { donationService } from '../services/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Donate = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    foodType: 'prepared',
    location: '',
    expiryTime: '',
    description: '',
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-lg text-center max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Please Login to Donate</h2>
          <p className="text-gray-400 mb-6">You need to be logged in to post a donation.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Login Now
          </button>
        </motion.div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await donationService.createDonation({
        ...formData,
        expiryTime: new Date(formData.expiryTime).toISOString(),
      });
      setSuccess('Donation posted successfully! 🎉');
      setFormData({
        foodName: '',
        quantity: '',
        foodType: 'prepared',
        location: '',
        expiryTime: '',
        description: '',
      });
      setTimeout(() => navigate('/request'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Share Your Food</span>
          </h1>
          <p className="text-gray-400 mb-8">Help someone in need. Fill in the details below.</p>

          <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-500/10 border border-green-500 text-green-400 p-4 rounded-lg"
              >
                {success}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Food Name *</label>
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  placeholder="e.g., Biryani, Samosas"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 20 portions, 50 pieces"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Food Type *</label>
                <select
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                >
                  <option value="prepared">Prepared Food</option>
                  <option value="raw">Raw Ingredients</option>
                  <option value="bakery">Bakery Items</option>
                  <option value="packaged">Packaged Food</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Downtown Delhi"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Expiry Time *</label>
                <input
                  type="datetime-local"
                  name="expiryTime"
                  value={formData.expiryTime}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add any additional details..."
                  rows="4"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500 resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post Donation'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Donate;

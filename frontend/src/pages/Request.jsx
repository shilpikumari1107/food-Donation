import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { donationService, requestService } from '../services/api';
import useAuth from '../hooks/useAuth';

const Request = () => {
  const { isAuthenticated, user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [filters, setFilters] = useState({
    foodType: '',
    location: '',
  });

  useEffect(() => {
    fetchDonations();
  }, [filters]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await donationService.getDonations({
        status: 'available',
        ...filters,
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (donationId) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      await requestService.createRequest({
        donationId,
        notes: 'Requesting this donation',
      });
      alert('Request submitted successfully!');
      setSelectedDonation(null);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to submit request');
    }
  };

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Browse Available Food</span>
          </h1>
          <p className="text-gray-400">Find food donations near you and request pickup.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Search by location..."
            value={filters.location}
            onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
          />
          <select
            value={filters.foodType}
            onChange={(e) => setFilters((prev) => ({ ...prev, foodType: e.target.value }))}
            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
          >
            <option value="">All Food Types</option>
            <option value="prepared">Prepared Food</option>
            <option value="raw">Raw Ingredients</option>
            <option value="bakery">Bakery Items</option>
            <option value="packaged">Packaged Food</option>
          </select>
        </motion.div>

        {/* Donations List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin">⏳</div>
            <p className="text-gray-400 mt-4">Loading donations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation, idx) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-lg card-hover cursor-pointer group"
                onClick={() => setSelectedDonation(donation)}
              >
                <div className="mb-4 inline-block text-3xl">{donation.food_type === 'prepared' ? '🍛' : donation.food_type === 'bakery' ? '🍞' : '📦'}</div>
                <h3 className="text-xl font-bold mb-2">{donation.food_name}</h3>
                <p className="text-gray-400 text-sm mb-3">{donation.quantity}</p>

                <div className="space-y-2 text-sm mb-4">
                  <p className="text-gray-300">📍 {donation.location}</p>
                  <p className="text-gray-300">👨‍✍️ {donation.donor_name}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    Available
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequest(donation.id);
                    }}
                    className="text-primary-400 hover:text-primary-300 font-semibold"
                  >
                    Request →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && donations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No donations available at the moment.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Request;

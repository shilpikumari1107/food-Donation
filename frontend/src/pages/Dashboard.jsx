import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'donor':
        return 'Donor Dashboard';
      case 'ngo':
        return 'NGO Dashboard';
      case 'admin':
        return 'Admin Dashboard';
      default:
        return 'Dashboard';
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
            <span className="gradient-text">{getDashboardTitle()}</span>
          </h1>
          <p className="text-gray-400">Welcome back, {user?.name}!</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Total Actions', value: '12', icon: '📊' },
            { title: 'This Month', value: '3', icon: '📈' },
            { title: 'Impact', value: '500+ people', icon: '❤️' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-lg"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Role-based Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className="border-l-4 border-primary-500 pl-4 py-2"
              >
                <p className="font-semibold">Activity Item {item}</p>
                <p className="text-gray-400 text-sm">Details about this activity</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

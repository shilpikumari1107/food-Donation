import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Donate', path: '/donate' },
    { label: 'Request', path: '/request' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-orange-500 flex items-center justify-center font-bold text-white">
            F
          </div>
          <span className="hidden sm:inline font-bold text-lg gradient-text">FoodShare</span>
        </Link>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="smooth-transition hover:text-primary-400">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;

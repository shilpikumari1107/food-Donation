import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-dark border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
        >
          <div>
            <h3 className="font-bold text-lg mb-4 gradient-text">FoodShare</h3>
            <p className="text-gray-400 text-sm">Reducing food waste, serving hope to those in need.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-primary-400 smooth-transition">Home</a></li>
              <li><a href="/donate" className="hover:text-primary-400 smooth-transition">Donate Food</a></li>
              <li><a href="/request" className="hover:text-primary-400 smooth-transition">Browse Donations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-primary-400 smooth-transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary-400 smooth-transition">Contact</a></li>
              <li><a href="#" className="hover:text-primary-400 smooth-transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary-400 smooth-transition">Facebook</a></li>
              <li><a href="#" className="hover:text-primary-400 smooth-transition">Twitter</a></li>
              <li><a href="#" className="hover:text-primary-400 smooth-transition">Instagram</a></li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm"
        >
          <p>&copy; {currentYear} FoodShare. Empowering Communities Through Food Donation. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

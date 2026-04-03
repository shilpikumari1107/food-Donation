import Hero from '../components/Hero';
import ImpactCards from '../components/ImpactCards';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ImpactCards />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <div className="glass p-12 rounded-2xl text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a <span className="gradient-text">Difference?</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Whether you have food to donate or need support, join our community today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate" className="btn-primary">
                Start Donating
              </Link>
              <Link to="/request" className="btn-secondary">
                Browse Food Available
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

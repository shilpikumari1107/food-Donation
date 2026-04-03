import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">About FoodShare</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            FoodShare is a mission-driven platform dedicated to reducing food waste and fighting hunger through efficient food redistribution. We connect food donors with NGOs and volunteers to create a more equitable and sustainable food system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To create a world where no food goes to waste and no one goes hungry. We empower communities through technology and cooperation to redistribute food efficiently and meaningfully.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              A sustainable society where food surplus is transformed into hope and opportunity. Where every donation makes an immediate impact on someone's life and the planet thrives.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass p-8 rounded-lg mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">Why FoodShare?</h2>
          <ul className="space-y-4">
            {[
              'Reduces global food waste - approximately 1.3 billion tons annually',
              'Combats hunger affecting 690 million people worldwide',
              'Provides an easy, transparent platform for food redistribution',
              'Builds communities through meaningful connections',
              'Tracks and showcases the real impact of donations',
              'Completely free and accessible to all',
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 text-gray-300"
              >
                <span className="text-primary-400 font-bold">✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of donors and NGOs making a real difference every single day.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

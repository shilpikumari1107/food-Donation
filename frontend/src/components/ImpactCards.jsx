import { motion } from 'framer-motion';

const ImpactCards = () => {
  const cards = [
    {
      title: 'Reduce Waste',
      description: 'Every donation prevents food from going to landfills, reducing environmental impact.',
      icon: '♻️',
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Serve Hope',
      description: 'Food reaches individuals and families who need it most, fighting hunger together.',
      icon: '❤️',
      color: 'from-red-500 to-pink-600',
    },
    {
      title: 'Build Community',
      description: 'Connect with NGOs, volunteers, and donors in your area to create lasting change.',
      icon: '🤝',
      color: 'from-primary-500 to-orange-600',
    },
    {
      title: 'Track Impact',
      description: 'Monitor your donations in real-time and see exactly how you\'re making a difference.',
      icon: '📊',
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Impact</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Making a difference, one donation at a time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-xl card-hover"
            >
              <div className={`inline-block text-4xl mb-4 p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCards;

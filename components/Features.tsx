
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-bold text-brand-500 uppercase tracking-widest mb-4"
          >
            Capabilities
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-6xl font-display font-bold"
          >
            The Science of Realism
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-10 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-all duration-500 relative overflow-hidden"
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center mb-8 shadow-sm group-hover:shadow-brand-500/20 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500"
              >
                <div className="text-brand-500 group-hover:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
              </motion.div>
              <h4 className="text-2xl font-bold mb-5 group-hover:text-brand-500 transition-colors duration-500">{feature.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

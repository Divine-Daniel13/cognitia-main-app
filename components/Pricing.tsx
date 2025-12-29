
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkle } from 'lucide-react';
import { PRICING_PLANS } from '../constants';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-bold text-brand-500 uppercase tracking-widest mb-4"
          >
            Investment
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-6xl font-display font-bold mb-10"
          >
            Scale Your Intelligence
          </motion.h3>
          
          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-6"
          >
            <span className={`text-sm font-bold transition-colors ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 relative p-1 transition-all hover:ring-4 hover:ring-brand-500/10"
            >
              <motion.div 
                animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                className="w-6 h-6 rounded-full bg-brand-600 shadow-md"
              />
            </button>
            <span className={`text-sm font-bold transition-colors ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              Yearly <span className="text-accent-teal font-extrabold ml-1 px-2 py-0.5 rounded bg-accent-teal/10 border border-accent-teal/20">-20%</span>
            </span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-10 rounded-[2.5rem] glass border transition-all duration-500 flex flex-col ${
                plan.isPopular 
                  ? 'border-brand-500/50 dark:border-brand-500/30 shadow-[0_20px_50px_-12px_rgba(14,165,233,0.15)] ring-1 ring-brand-500/20' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-brand-600 text-white text-xs font-bold uppercase tracking-widest shadow-xl flex items-center space-x-2">
                  <Sparkle size={14} className="animate-spin-slow" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="mb-10 text-center">
                <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
                <div className="flex items-baseline justify-center space-x-1 mb-6">
                  <span className="text-5xl font-display font-extrabold text-slate-900 dark:text-white">
                    ${billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-bold text-lg">/mo</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-4 text-sm font-medium">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-brand-500 font-bold" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-extrabold text-lg transition-all ${
                plan.isPopular 
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-600/30 hover:bg-brand-700' 
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90'
              }`}>
                {plan.price === 0 ? 'Start Free' : 'Get Started Now'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

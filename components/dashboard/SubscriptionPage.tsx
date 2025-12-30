
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkle, Zap, CreditCard, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../../constants';

const SubscriptionPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Subscription Plans</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Upgrade your intelligence bandwidth with premium features.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <CreditCard size={18} className="text-slate-400" />
           <span className="text-sm font-bold">Visa ending in 4242</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan, idx) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 rounded-[2.5rem] glass border transition-all duration-300 flex flex-col ${
              plan.isPopular 
                ? 'border-brand-500/50 shadow-2xl ring-1 ring-brand-500/20' 
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center space-x-2">
                <Sparkle size={12} />
                <span>Current Plan</span>
              </div>
            )}
            
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline space-x-1 mb-6">
              <span className="text-4xl font-display font-extrabold">${plan.price}</span>
              <span className="text-slate-500 font-bold">/mo</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm">
                  <div className="mt-1 w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-brand-600" />
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">{f}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
              plan.isPopular 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-brand-600 text-white hover:bg-brand-700 shadow-xl shadow-brand-500/20'
            }`}>
              {plan.isPopular ? 'Active' : 'Choose Plan'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[100px]" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          <div className="flex items-center space-x-8">
            <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center border border-white/10">
              <ShieldCheck size={40} className="text-brand-400" />
            </div>
            <div>
               <h4 className="text-2xl font-bold mb-2">Enterprise Solutions</h4>
               <p className="text-slate-400 max-w-sm">Dedicated training, SSO integration, and unlimited organizational scaling.</p>
            </div>
          </div>
          <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all">
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;


import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Globe, Shield, CreditCard, ChevronRight } from 'lucide-react';

const SettingsPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const sections = [
    { title: 'Account Profile', desc: 'Personal info, avatar, and public presence.', icon: User },
    { title: 'Security & Auth', desc: 'Magic links, 2FA, and session management.', icon: Lock },
    { title: 'Notifications', desc: 'Email, push, and in-app alert preferences.', icon: Bell },
    { title: 'Language & Region', desc: 'Select your default consultation languages.', icon: Globe },
    { title: 'Privacy Settings', desc: 'Control your data and transcript storage.', icon: Shield },
    { title: 'Billing & Payments', desc: 'Manage methods and transaction history.', icon: CreditCard },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      <div className="flex items-center space-x-6">
         <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-brand-500/10 shadow-2xl" />
         <div>
            <h1 className="text-3xl font-display font-bold">Michael Scott</h1>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-1">Dunder Mifflin Inc. • Scranton Branch</p>
         </div>
         <button className="ml-auto px-6 py-3 rounded-xl bg-brand-600 text-white text-sm font-bold shadow-lg shadow-brand-500/20">Edit Profile</button>
      </div>

      <div className="grid gap-4">
        {sections.map((sec, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group p-6 rounded-2xl glass border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-brand-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
          >
             <div className="flex items-center space-x-6">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-brand-500/10 transition-colors">
                   <sec.icon size={22} className="text-slate-500 group-hover:text-brand-500 transition-colors" />
                </div>
                <div>
                   <h4 className="font-bold">{sec.title}</h4>
                   <p className="text-sm text-slate-500 mt-0.5">{sec.desc}</p>
                </div>
             </div>
             <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
         <p className="text-sm text-slate-500">Need to delete your account? <button className="text-red-500 font-bold hover:underline">Click here</button></p>
      </div>
    </div>
  );
};

export default SettingsPage;

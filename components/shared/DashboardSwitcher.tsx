
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Shield, ShieldCheck, User, ChevronUp } from 'lucide-react';

interface DashboardSwitcherProps {
  currentView: string;
  onViewChange: (view: any) => void;
}

const DashboardSwitcher: React.FC<DashboardSwitcherProps> = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const portals = [
    { id: 'user-dashboard', label: 'User Dashboard', icon: User, color: 'bg-brand-500' },
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: Shield, color: 'bg-indigo-600' },
    { id: 'super-admin-dashboard', label: 'Super Admin', icon: ShieldCheck, color: 'bg-purple-600' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-4 flex flex-col space-y-2"
          >
            {portals.map((portal) => (
              <button
                key={portal.id}
                onClick={() => {
                  onViewChange(portal.id);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap ${
                  currentView === portal.id 
                    ? 'bg-slate-900 text-white border-2 border-white/20' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${portal.color} flex items-center justify-center text-white`}>
                  <portal.icon size={16} />
                </div>
                <span className="text-sm font-bold">{portal.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-white/10"
      >
        <Layout className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
    </div>
  );
};

export default DashboardSwitcher;

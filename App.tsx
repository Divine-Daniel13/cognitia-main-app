
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboardLayout from './components/admin/AdminDashboardLayout';
import SuperAdminDashboardLayout from './components/super/SuperAdminDashboardLayout';
import DashboardSwitcher from './components/shared/DashboardSwitcher';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [view, setView] = useState<'landing' | 'user-dashboard' | 'admin-dashboard' | 'super-admin-dashboard'>('landing');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-brand-500/30 font-sans transition-colors duration-300">
      {/* Global Portal Switcher (Visible in all dashboard views for testing) */}
      {view !== 'landing' && (
        <DashboardSwitcher currentView={view} onViewChange={setView} />
      )}

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage 
              theme={theme} 
              toggleTheme={toggleTheme} 
              onEnterDashboard={() => setView('user-dashboard')} 
              onEnterAdmin={() => setView('admin-dashboard')}
              onEnterSuperAdmin={() => setView('super-admin-dashboard')}
            />
          </motion.div>
        )}
        {view === 'user-dashboard' && (
          <motion.div
            key="user-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DashboardLayout theme={theme} toggleTheme={toggleTheme} onExitDashboard={() => setView('landing')} />
          </motion.div>
        )}
        {view === 'admin-dashboard' && (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdminDashboardLayout theme={theme} toggleTheme={toggleTheme} onExitDashboard={() => setView('landing')} />
          </motion.div>
        )}
        {view === 'super-admin-dashboard' && (
          <motion.div
            key="super-admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SuperAdminDashboardLayout theme={theme} toggleTheme={toggleTheme} onExitDashboard={() => setView('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

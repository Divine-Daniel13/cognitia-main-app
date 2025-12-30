
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboardLayout from './components/admin/AdminDashboardLayout';
import SuperAdminDashboardLayout from './components/super/SuperAdminDashboardLayout';
import DashboardSwitcher from './components/shared/DashboardSwitcher';
import AuthScreens from './components/auth/AuthScreens';
import { CONFIG } from './config/env';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // URL-based view initialization
  const [view, setView] = useState<'landing' | 'auth' | 'user-dashboard' | 'admin-dashboard' | 'super-admin-dashboard'>(() => {
    const path = window.location.pathname;
    if (path === '/admin/login' || path === '/admin/logn') return 'auth';
    if (path === '/superadmin/login') return 'auth';
    return 'landing';
  });

  const [initialRole, setInitialRole] = useState<'user' | 'admin' | 'super-admin'>(() => {
    const path = window.location.pathname;
    if (path === '/admin/login' || path === '/admin/logn') return 'admin';
    if (path === '/superadmin/login') return 'super-admin';
    return 'user';
  });

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

  // Handle URL changes manually for the specialized login paths
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin/login' || path === '/admin/logn') {
        setView('auth');
        setInitialRole('admin');
      } else if (path === '/superadmin/login') {
        setView('auth');
        setInitialRole('super-admin');
      } else if (path === '/') {
        setView('landing');
        setInitialRole('user');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = (role: 'user' | 'admin' | 'super-admin') => {
    if (role === 'user') setView('user-dashboard');
    else if (role === 'admin') setView('admin-dashboard');
    else if (role === 'super-admin') setView('super-admin-dashboard');
    
    // Clear the specialized path on successful login
    try {
      window.history.pushState({}, '', '/');
    } catch (e) {
      console.warn('History pushState restricted in this environment.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(CONFIG.AUTH_TOKEN_KEY);
    localStorage.removeItem(CONFIG.ROLE_KEY);
    setView('landing');
    try {
      window.history.pushState({}, '', '/');
    } catch (e) {
      console.warn('History pushState restricted in this environment.');
    }
    // Ensure scroll to top
    window.scrollTo(0, 0);
  };

  const navigateToAuth = (role: 'user' | 'admin' | 'super-admin' = 'user') => {
    setInitialRole(role);
    setView('auth');
    const path = role === 'super-admin' ? '/superadmin/login' : role === 'admin' ? '/admin/login' : '/auth';
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      console.warn('History pushState restricted in this environment.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-brand-500/30 font-sans transition-colors duration-300">
      {/* Global Portal Switcher (Visible in all dashboard views for testing) */}
      {view.includes('dashboard') && (
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
              onEnterAuth={() => navigateToAuth('user')}
            />
          </motion.div>
        )}
        
        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <AuthScreens 
              initialRole={initialRole}
              onBack={() => { 
                setView('landing'); 
                try {
                  window.history.pushState({}, '', '/'); 
                } catch(e) {}
              }} 
              onSuccess={handleLoginSuccess}
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
            <DashboardLayout theme={theme} toggleTheme={toggleTheme} onExitDashboard={handleLogout} />
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
            <AdminDashboardLayout theme={theme} toggleTheme={toggleTheme} onExitDashboard={handleLogout} />
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
            <SuperAdminDashboardLayout theme={theme} toggleTheme={toggleTheme} onExitDashboard={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

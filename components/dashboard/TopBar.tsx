
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, Menu, ChevronDown, Wallet, LogOut, Settings, User, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopBarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ theme, toggleTheme, setMobileMenuOpen, onNavigate, onLogout }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'Session Summary Ready', text: 'Your meeting with Dr. Elena Vance is available.', time: '2m ago' },
    { id: 2, title: 'Low Balance Alert', text: 'You have less than 100 credits remaining.', time: '1h ago' },
    { id: 3, title: 'New Avatar Unlocked', text: 'Check out Marcus Chen, our new Business Strategist.', time: '1d ago' },
  ];

  return (
    <header className="h-20 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-50 transition-all duration-300">
      <div className="flex items-center space-x-4 flex-1">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 lg:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden sm:flex items-center max-w-md w-full relative">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search avatars, history, transcripts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('wallet')}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400"
        >
          <Wallet size={16} />
          <span className="text-xs font-bold uppercase tracking-tight">1,234 Cr</span>
        </motion.button>

        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse"></span>
          </button>
          
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-[100]"
              >
                <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Notifications</h4>
                <div className="space-y-4">
                  {notifications.map(n => (
                    <div key={n.id} className="group cursor-pointer">
                      <p className="text-sm font-bold group-hover:text-brand-500 transition-colors">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.text}</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{n.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-xs font-bold text-brand-500 border-t border-slate-100 dark:border-slate-800 pt-4 hover:underline">
                  Mark all as read
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={profileRef}>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer group"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/10 group-hover:ring-brand-500/40 transition-all"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 shadow-sm"></div>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold truncate max-w-[100px]">Michael Scott</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">Pro Member</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 py-4 overflow-hidden z-[100]"
              >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 mb-2">
                   <p className="text-sm font-bold">Michael Scott</p>
                   <p className="text-xs text-slate-500">m.scott@dundermifflin.com</p>
                </div>
                <button onClick={() => { onNavigate('settings'); setIsProfileOpen(false); }} className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <User size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">My Profile</span>
                </button>
                <button onClick={() => { onNavigate('wallet'); setIsProfileOpen(false); }} className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Wallet size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">Wallet</span>
                </button>
                <button onClick={() => { onNavigate('settings'); setIsProfileOpen(false); }} className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Settings size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">Settings</span>
                </button>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                <button 
                  className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 transition-colors" 
                  onClick={() => { onLogout(); setIsProfileOpen(false); }}
                >
                  <LogOut size={18} />
                  <span className="text-sm font-bold">Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopBar;


import React from 'react';
import { Search, Bell, Sun, Moon, Menu, ChevronDown, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopBarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  onNavigate: (tab: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ theme, toggleTheme, setMobileMenuOpen, onNavigate }) => {
  return (
    <header className="h-20 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-50">
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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Credits Pill */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('wallet')}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400"
        >
          <Wallet size={16} />
          <span className="text-xs font-bold uppercase tracking-tight">1,234 Cr</span>
        </motion.button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer group">
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
          <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;

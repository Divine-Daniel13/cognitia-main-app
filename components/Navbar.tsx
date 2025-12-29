
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Shield, ShieldCheck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onEnterDashboard?: () => void;
  onEnterAdmin?: () => void;
  onEnterSuperAdmin?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  toggleTheme, 
  onEnterDashboard, 
  onEnterAdmin, 
  onEnterSuperAdmin 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInDropdownOpen, setIsSignInDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSignInDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'AI Avatars', href: '#avatars' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Enterprise', href: '#enterprise' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-accent-teal flex items-center justify-center shadow-lg shadow-brand-500/20">
              <div className="w-5 h-5 rounded-full border-2 border-white/80 animate-pulse"></div>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              Cognitia
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            {/* Sign In Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsSignInDropdownOpen(!isSignInDropdownOpen)}
                className="flex items-center space-x-1 text-sm font-medium px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-brand-500 transition-colors"
              >
                <span>Sign In</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSignInDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isSignInDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden py-2"
                  >
                    <button 
                      onClick={() => { onEnterDashboard?.(); setIsSignInDropdownOpen(false); }}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <User size={18} className="text-brand-500" />
                      <div>
                        <p className="text-sm font-bold">Client Login</p>
                        <p className="text-[10px] text-slate-500">Access your sessions</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => { onEnterAdmin?.(); setIsSignInDropdownOpen(false); }}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Shield size={18} className="text-indigo-500" />
                      <div>
                        <p className="text-sm font-bold">Admin Portal</p>
                        <p className="text-[10px] text-slate-500">Manage platform fleet</p>
                      </div>
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 mx-2 my-1" />
                    <button 
                      onClick={() => { onEnterSuperAdmin?.(); setIsSignInDropdownOpen(false); }}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <ShieldCheck size={18} className="text-purple-500" />
                      <div>
                        <p className="text-sm font-bold">Super Admin</p>
                        <p className="text-[10px] text-slate-500">Root Mission Control</p>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button 
              onClick={onEnterDashboard}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(14 165 233 / 0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-semibold px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 transition-all"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 dark:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onEnterDashboard?.(); }}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold"
                >
                  <span>User Login</span>
                  <User size={18} />
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onEnterAdmin?.(); }}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold"
                >
                  <span>Admin Portal</span>
                  <Shield size={18} />
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onEnterDashboard?.(); }}
                  className="w-full py-4 rounded-xl bg-brand-600 text-white font-bold"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

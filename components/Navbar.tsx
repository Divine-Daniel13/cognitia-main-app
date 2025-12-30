
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onEnterDashboard?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  toggleTheme, 
  onEnterDashboard
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'How It Works', href: '#how-it-works', color: 'bg-teal-500/20' },
    { name: 'AI Avatars', href: '#avatars', color: 'bg-brand-500/20' },
    { name: 'Pricing', href: '#pricing', color: 'bg-purple-500/20' },
    { name: 'Enterprise', href: '#enterprise', color: 'bg-indigo-500/20' },
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
            className="flex items-center space-x-2 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-brand-600 to-accent-teal flex items-center justify-center shadow-lg shadow-brand-500/20">
              <div className="w-5 h-5 rounded-full border-2 border-white/80 animate-pulse"></div>
            </div>
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              Cognitia
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span className="relative z-10">{link.name}</span>
                <AnimatePresence>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-glow"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`absolute inset-0 z-0 rounded-xl blur-sm ${link.color || 'bg-slate-500/10'}`}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={onEnterDashboard}
              className="text-sm font-bold px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-brand-500 transition-colors"
            >
              Sign In
            </button>

            <motion.button 
              onClick={onEnterDashboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-semibold px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 transition-all shadow-xl shadow-black/5 dark:shadow-white/5"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2 text-slate-500">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold py-3 px-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <ChevronDown size={18} className="-rotate-90 text-slate-300 group-hover:text-brand-500 transition-all" />
                </a>
              ))}
              <div className="pt-6 flex flex-col space-y-3">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onEnterDashboard?.(); }}
                  className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-bold"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onEnterDashboard?.(); }}
                  className="w-full py-4 rounded-2xl bg-brand-600 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-500/20"
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

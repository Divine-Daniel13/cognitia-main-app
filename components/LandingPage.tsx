
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import Trust from './Trust';
import HowItWorks from './HowItWorks';
import AvatarShowcase from './AvatarShowcase';
import Features from './Features';
import LiveDemo from './LiveDemo';
import Pricing from './Pricing';
import Enterprise from './Enterprise';
import Security from './Security';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from './Footer';

interface LandingPageProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onEnterDashboard: () => void;
  onEnterAdmin: () => void;
  onEnterSuperAdmin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  theme, 
  toggleTheme, 
  onEnterDashboard, 
  onEnterAdmin, 
  onEnterSuperAdmin 
}) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onEnterDashboard={onEnterDashboard} 
        onEnterAdmin={onEnterAdmin}
        onEnterSuperAdmin={onEnterSuperAdmin}
      />
      <main>
        <Hero onStart={onEnterDashboard} />
        
        {/* Entrance Portal Buttons with enhanced layering and interactivity */}
        <div className="relative z-20 flex flex-col sm:flex-row justify-center items-center gap-4 -mt-10 mb-20 px-4">
           <motion.button 
             whileHover={{ scale: 1.05, y: -2 }}
             whileTap={{ scale: 0.95 }}
             onClick={onEnterAdmin}
             className="px-8 py-3 rounded-full border border-indigo-500/30 dark:border-indigo-500/20 bg-white/10 dark:bg-slate-900/50 backdrop-blur-md text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest hover:bg-indigo-500/10 transition-all shadow-xl"
           >
             Admin Portal
           </motion.button>
           <motion.button 
             whileHover={{ scale: 1.05, y: -2 }}
             whileTap={{ scale: 0.95 }}
             onClick={onEnterSuperAdmin}
             className="px-8 py-3 rounded-full border border-purple-500/30 dark:border-purple-500/20 bg-white/10 dark:bg-slate-900/50 backdrop-blur-md text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-widest hover:bg-purple-500/10 transition-all shadow-xl"
           >
             Super Admin Mission Control
           </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Trust />
          <HowItWorks />
          <AvatarShowcase isLoading={isInitialLoading} />
          <Features />
          <LiveDemo />
          <Pricing />
          <Enterprise />
          <Security />
          <Testimonials isLoading={isInitialLoading} />
          <CTA onStart={onEnterDashboard} />
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;

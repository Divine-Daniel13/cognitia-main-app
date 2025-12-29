
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
}

const LandingPage: React.FC<LandingPageProps> = ({ theme, toggleTheme, onEnterDashboard, onEnterAdmin }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} onEnterDashboard={onEnterDashboard} />
      <main>
        <Hero onStart={onEnterDashboard} />
        <div className="flex justify-center -mt-10 mb-20">
           <button 
             onClick={onEnterAdmin}
             className="px-6 py-2 rounded-full border border-brand-500/30 text-brand-500 text-xs font-bold uppercase tracking-widest hover:bg-brand-500/10 transition-all"
           >
             Admin Access Preview
           </button>
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

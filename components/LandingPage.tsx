
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
}

const LandingPage: React.FC<LandingPageProps> = ({ theme, toggleTheme, onEnterDashboard }) => {
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

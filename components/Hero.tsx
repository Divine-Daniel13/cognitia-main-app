
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Zap } from 'lucide-react';

interface HeroProps {
  onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-teal/10 blur-[120px] rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-8 border border-brand-500/20 backdrop-blur-sm"
            >
              <Sparkles size={16} />
              <span>Next-Gen AI Consultation</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-8xl font-display font-extrabold tracking-tight mb-6 leading-[1.05]"
            >
              Talk to AI Experts.<br />
              <span className="gradient-text">In Real Time.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience ultra-realistic AI consultation. Human-like voice and video calls with specialized avatars designed to help you grow professionally and personally.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button 
                onClick={onStart}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-10 py-5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg shadow-xl shadow-brand-500/30 transition-all flex items-center justify-center space-x-3"
              >
                <Zap size={20} className="fill-current" />
                <span>Start a Free Session</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-10 py-5 rounded-full glass hover:bg-white/10 dark:hover:bg-white/5 font-semibold text-lg transition-all flex items-center justify-center space-x-3 border border-slate-200 dark:border-slate-800"
              >
                <Play size={18} className="fill-current" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 flex items-center justify-center lg:justify-start space-x-8 opacity-60"
            >
              <div className="text-sm font-medium">4.9/5 Rating</div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              <div className="text-sm font-medium">1M+ Minutes Consulted</div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative perspective-1000"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto group">
              {/* Pulsing Aura */}
              <div className="absolute inset-0 rounded-full bg-brand-500/10 blur-[80px] scale-110 animate-pulse"></div>
              
              {/* Main Avatar Container */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative w-full h-full rounded-3xl overflow-hidden glass p-1 shadow-2xl border border-white/20 dark:border-white/5"
              >
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="AI Avatar" 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Voice Waveform Overlay */}
                <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl flex items-center space-x-4">
                  <div className="flex-1 flex items-end justify-center space-x-1.5 h-12">
                    {[0.4, 0.7, 0.5, 0.9, 0.3, 0.8, 0.6, 0.4, 0.7, 0.5, 0.8, 0.4].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: "20%" }}
                        animate={{ height: [`${h * 100}%`, "30%", `${h * 100}%`] }}
                        transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: "easeInOut" }}
                        className="w-2 bg-brand-400 rounded-full" 
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Tags */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8 flex items-center space-x-2 px-4 py-2 glass rounded-full border border-white/20"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">HD Video Active</span>
                </motion.div>
              </motion.div>

              {/* Floaties */}
              <motion.div 
                animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 glass p-5 rounded-2xl shadow-2xl border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/40">
                    <Zap size={20} className="text-white fill-current" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Processing</p>
                    <p className="text-sm font-bold">Latency: 28ms</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

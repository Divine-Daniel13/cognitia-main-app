
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Zap, Activity, ShieldCheck, Globe } from 'lucide-react';

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
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor - Visual Motion Graphics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-brand-500/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-teal/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left relative z-10"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs md:text-sm font-black uppercase tracking-widest mb-6 border border-brand-500/20 backdrop-blur-sm"
            >
              <Sparkles size={14} />
              <span>Next-Gen AI Consultation</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-8xl font-display font-extrabold tracking-tight mb-6 leading-[1.1]"
            >
              Talk to AI Experts.<br />
              <span className="gradient-text">In Real Time.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience ultra-realistic AI consultation with human-like voice and video. One-on-one sessions with specialized avatars for business, health, and learning.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button 
                onClick={onStart}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-10 py-5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg shadow-2xl shadow-brand-500/30 transition-all flex items-center justify-center space-x-3"
              >
                <Zap size={20} className="fill-current" />
                <span>Start Free Session</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-10 py-5 rounded-full glass hover:bg-white/10 dark:hover:bg-white/5 font-bold text-lg transition-all flex items-center justify-center space-x-3 border border-slate-200 dark:border-slate-800"
              >
                <Play size={18} className="fill-current" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 md:mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-60"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest">4.9/5 Trust Score</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent-teal"></div>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest">1M+ Consultations</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Restored and Enhanced Video Motion Graphics */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative perspective-1000 hidden md:block"
          >
            <div className="relative aspect-square max-w-[540px] mx-auto group">
              {/* Dynamic Aura */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-[3rem] bg-brand-500/10 blur-[80px]"
              />
              
              {/* Main Visual Container */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative w-full h-full rounded-[3.5rem] overflow-hidden glass p-1 shadow-2xl border border-white/20 dark:border-white/5"
              >
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="AI Avatar" 
                  className="w-full h-full object-cover rounded-[3rem] transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Visual Audio Waveform Overlay */}
                <div className="absolute bottom-10 left-10 right-10 p-6 glass rounded-2xl flex items-center space-x-6 backdrop-blur-2xl border border-white/10 shadow-2xl">
                  <div className="flex-1 flex items-end justify-center space-x-1.5 h-10">
                    {[...Array(16)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: "20%" }}
                        animate={{ height: ["30%", "100%", "40%", "80%", "30%"] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.6 + Math.random(), 
                          delay: i * 0.05,
                          ease: "easeInOut" 
                        }}
                        className="w-2 bg-gradient-to-t from-brand-600 to-accent-teal rounded-full" 
                      />
                    ))}
                  </div>
                  <div className="text-right shrink-0 border-l border-white/10 pl-6">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Latency</p>
                    <p className="text-sm font-black text-brand-500">24.2ms</p>
                  </div>
                </div>

                <div className="absolute top-10 left-10 flex items-center space-x-3 px-4 py-2 glass rounded-full border border-white/20 shadow-xl">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                  <span className="text-[10px] font-black tracking-widest uppercase">HD Stream Active</span>
                </div>
              </motion.div>

              {/* Floaty 1: Telemetry Badge */}
              <motion.div 
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-6 glass p-5 rounded-3xl shadow-2xl border border-white/20 hidden xl:block backdrop-blur-2xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-brand-500/20">
                     <Activity size={24} className="text-white" />
                  </div>
                  <div className="text-left pr-4">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Inference</p>
                    <p className="text-sm font-black">Stable 60fps</p>
                  </div>
                </div>
              </motion.div>

              {/* Floaty 2: Encryption Badge */}
              <motion.div 
                animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-10 glass p-4 rounded-3xl shadow-2xl border border-white/20 hidden xl:flex items-center space-x-4 backdrop-blur-2xl"
              >
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <ShieldCheck size={20} />
                 </div>
                 <div className="text-left pr-2">
                    <p className="text-[9px] font-black uppercase text-slate-400">Security</p>
                    <p className="text-xs font-bold">AES-256 E2EE</p>
                 </div>
              </motion.div>

               {/* Floaty 3: Global Reach */}
               <motion.div 
                animate={{ rotate: [0, 5, 0], y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-16 glass p-4 rounded-3xl shadow-2xl border border-white/20 hidden xl:flex items-center space-x-4 backdrop-blur-2xl"
              >
                 <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Globe size={20} />
                 </div>
                 <div className="text-left pr-2">
                    <p className="text-[9px] font-black uppercase text-slate-400">Region</p>
                    <p className="text-xs font-bold">US-East-1</p>
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

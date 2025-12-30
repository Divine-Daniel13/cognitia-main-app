
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Zap, Activity, ShieldCheck, Globe, Cpu, Radio, Zap as Bolt } from 'lucide-react';

interface HeroProps {
  onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-52 lg:pb-40 overflow-hidden">
      {/* Background Decor - Visual Motion Graphics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-25%] left-[-15%] w-[90%] h-[90%] bg-brand-500/10 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [45, 0, 45],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] bg-accent-teal/10 blur-[150px] rounded-full"
        />
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left relative z-10"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-8 border border-brand-500/20 backdrop-blur-md"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Edge-Computing AI Experts</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter mb-8 leading-[0.95]"
            >
              Real AI.<br />
              <span className="gradient-text">Real Connection.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Bridging the gap with human-like latency and emotional intelligence. High-fidelity video consultations with specialized AI personalities.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-5 sm:space-y-0 sm:space-x-5"
            >
              <motion.button 
                onClick={onStart}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-12 py-6 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-black uppercase text-sm tracking-widest shadow-2xl shadow-brand-500/40 transition-all flex items-center justify-center space-x-3"
              >
                <Zap size={20} className="fill-current" />
                <span>Start Session</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-12 py-6 rounded-full glass hover:bg-white/10 dark:hover:bg-white/5 font-black uppercase text-sm tracking-widest transition-all flex items-center justify-center space-x-3 border border-slate-200 dark:border-slate-800"
              >
                <Play size={18} className="fill-current" />
                <span>Product Tour</span>
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-40 transition-all duration-700"
            >
              <div className="flex flex-col items-center lg:items-start">
                 <span className="text-2xl font-black">4.96/5</span>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Global Trust</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                 <span className="text-2xl font-black">24ms</span>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Avg Latency</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                 <span className="text-2xl font-black">250K+</span>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Shards</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Restored and Enhanced */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden md:block"
          >
            <div className="relative aspect-[4/5] max-w-[480px] mx-auto group">
              {/* Dynamic Aura Glow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute inset-[-10%] rounded-[4rem] bg-brand-500/20 blur-[100px]"
              />
              
              {/* Floating Processing Card */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 z-20 bg-[#0a0f1e]/80 backdrop-blur-2xl p-5 rounded-[2rem] border border-white/10 shadow-2xl flex items-center space-x-4 min-w-[220px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                   <Bolt size={24} className="text-white fill-current" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest opacity-60">PROCESSING</p>
                  <p className="text-sm font-black text-white">Latency: 28.4ms</p>
                </div>
              </motion.div>

              {/* Main Visual Container */}
              <motion.div 
                whileHover={{ y: -10, rotateY: -5 }}
                className="relative w-full h-full rounded-[4rem] overflow-hidden glass p-1.5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/5 transition-transform duration-1000"
              >
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="AI Avatar Expert" 
                  className="w-full h-full object-cover rounded-[3.8rem] brightness-90 contrast-110"
                />
                
                {/* Audio Telemetry Overlay */}
                <div className="absolute bottom-10 left-8 right-8 p-6 bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center">
                  <div className="flex items-center justify-between w-full mb-3 px-2">
                     <span className="text-[8px] font-black uppercase tracking-widest text-brand-400">Neural Stream V4</span>
                     <Radio size={12} className="text-red-500 animate-pulse" />
                  </div>
                  <div className="flex items-end justify-center space-x-1.5 h-10">
                    {[...Array(18)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: "10%" }}
                        animate={{ height: ["20%", "90%", "40%", "100%", "30%"] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.5 + Math.random(), 
                          delay: i * 0.03,
                          ease: "easeInOut" 
                        }}
                        className="w-2 bg-brand-400 rounded-full opacity-90" 
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute top-10 left-10 flex items-center space-x-3 px-5 py-2.5 glass rounded-full border border-white/20 shadow-2xl backdrop-blur-xl">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_#10b981]"></div>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white">Encrypted Sync</span>
                </div>
              </motion.div>

              {/* Security Badge */}
              <motion.div 
                animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-12 glass p-5 rounded-[2.5rem] shadow-2xl border border-white/10 hidden xl:flex items-center space-x-4 backdrop-blur-2xl"
              >
                 <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                    <ShieldCheck size={24} />
                 </div>
                 <div className="text-left pr-4">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Integrity</p>
                    <p className="text-xs font-black text-white uppercase">Identity Verified</p>
                 </div>
              </motion.div>

               {/* AI Core Badge */}
               <motion.div 
                animate={{ rotate: [0, -5, 0], y: [0, 15, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-20 glass p-5 rounded-[2.5rem] shadow-2xl border border-white/10 hidden xl:flex items-center space-x-4 backdrop-blur-2xl"
              >
                 <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20">
                    <Cpu size={24} />
                 </div>
                 <div className="text-left pr-4">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Model</p>
                    <p className="text-xs font-black text-white uppercase">Neural Core V9</p>
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


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Lock, Play, Star, SlidersHorizontal } from 'lucide-react';
import { AVATARS } from '../constants';
import { AvatarSkeleton } from './Skeleton';

interface AvatarShowcaseProps {
  isLoading?: boolean;
}

const AvatarShowcase: React.FC<AvatarShowcaseProps> = ({ isLoading = false }) => {
  const [filter, setFilter] = useState('All');
  
  const professions = ['All', 'Psychologist', 'Business Strategist', 'Language Tutor', 'Technical Architect'];

  const filteredAvatars = filter === 'All' 
    ? AVATARS 
    : AVATARS.filter(a => a.profession === filter);

  return (
    <section id="avatars" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 space-y-8 xl:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-base font-black text-brand-500 uppercase tracking-widest mb-4">Meet the Experts</h2>
            <h3 className="text-3xl lg:text-5xl font-display font-bold">Find Your AI Companion</h3>
          </motion.div>

          {/* Responsive Filter Container - Matched to Screenshot Design */}
          <div className="relative">
            <div className="flex items-center space-x-4 p-1.5 md:p-2 bg-white dark:bg-slate-950 border-2 border-brand-500/20 dark:border-brand-500/10 rounded-[2rem] shadow-xl overflow-x-auto no-scrollbar scroll-smooth w-full md:w-auto">
              <div className="flex space-x-1 shrink-0 px-2">
                {professions.map(p => (
                  <motion.button
                    key={p}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(p)}
                    className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                      filter === p 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {p}
                  </motion.button>
                ))}
              </div>
              <div className="hidden md:flex items-center pr-4 border-l border-slate-100 dark:border-slate-800 pl-4 space-x-2 text-slate-400">
                <SlidersHorizontal size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">More</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[500px]">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <AvatarSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredAvatars.map((avatar, idx) => (
                <motion.div 
                  key={avatar.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative rounded-3xl overflow-hidden glass border-slate-200 dark:border-slate-800 hover:border-brand-500/40 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/10"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img 
                      src={avatar.image} 
                      alt={avatar.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                    
                    {avatar.isPremium && (
                      <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 px-3 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center space-x-1 shadow-lg">
                        <Lock size={10} />
                        <span>Premium</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        className="w-full py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-xl"
                      >
                        <Play size={14} fill="currentColor" />
                        <span>Start Consultation</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-500">{avatar.profession}</span>
                      <div className="flex items-center space-x-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span>4.9</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{avatar.name}</h4>
                    <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400 space-x-3 mb-5">
                      <div className="flex items-center space-x-1.5">
                        <Globe size={14} className="text-brand-400" />
                        <span className="font-medium">{avatar.language.join(' • ')}</span>
                      </div>
                    </div>
                    
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-center">
                      <span>Tone: <span className="text-slate-900 dark:text-white">{avatar.tone}</span></span>
                      <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                        <Play size={12} className="text-brand-500" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            className="text-lg font-bold text-brand-500 hover:text-brand-400 transition-colors inline-flex items-center space-x-3 group"
          >
            <span>Explore all 150+ Specialized Avatars</span>
            <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AvatarShowcase;

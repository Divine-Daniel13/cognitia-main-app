
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Globe, Star, Phone, Video, Heart } from 'lucide-react';
import { AVATARS } from '../../constants';
import { AvatarSkeleton } from '../Skeleton';

interface AvatarsPageProps {
  isLoading: boolean;
  onCall: () => void;
}

const AvatarsPage: React.FC<AvatarsPageProps> = ({ isLoading, onCall }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Psychologist', 'Business', 'Language', 'Tech'];

  const filtered = AVATARS.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || a.profession.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Expert AI Avatars</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Specialized intelligence for every aspect of your growth.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, expertise, or language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
          />
        </div>
        <button className="px-6 py-4 rounded-[1.5rem] glass border-slate-200 dark:border-slate-800 flex items-center space-x-2 font-bold hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">
          <SlidersHorizontal size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === cat 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-brand-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading ? (
          Array(8).fill(0).map((_, i) => <AvatarSkeleton key={i} />)
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((avatar, idx) => (
              <motion.div 
                key={avatar.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col glass dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60" />
                  
                  <button className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/20 text-white hover:text-red-500 transition-all">
                    <Heart size={18} />
                  </button>

                  {avatar.isPremium && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black uppercase rounded-full shadow-lg">
                      Premium
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <button 
                      onClick={onCall}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:scale-105 transition-transform"
                    >
                      <Video size={16} />
                      <span>Video Call</span>
                    </button>
                    <button 
                      onClick={onCall}
                      className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/40 transition-all"
                    >
                      <Phone size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">{avatar.profession}</span>
                    <div className="flex items-center space-x-1 text-xs font-bold">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span>4.9 (2k+)</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{avatar.name}</h4>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
                    <Globe size={12} />
                    <span>{avatar.language.join(', ')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-400 italic">No experts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AvatarsPage;

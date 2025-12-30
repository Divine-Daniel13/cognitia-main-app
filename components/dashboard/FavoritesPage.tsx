
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Video, Phone, Globe } from 'lucide-react';
import { AVATARS } from '../../constants';

const FavoritesPage: React.FC<{ isLoading: boolean, onCall: () => void }> = ({ isLoading, onCall }) => {
  const favorites = AVATARS.slice(0, 2); // Mocking favorited items

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold">My Favorites</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Your go-to AI experts and consultants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {favorites.map((avatar, idx) => (
          <motion.div 
            key={avatar.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group glass border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
               <img src={avatar.image} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
               <button className="absolute top-4 left-4 p-2.5 rounded-xl bg-brand-500 text-white shadow-xl">
                 <Heart size={18} fill="currentColor" />
               </button>
               <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                 <button onClick={onCall} className="flex-1 py-3 bg-white text-slate-950 rounded-xl font-bold text-xs shadow-xl">Video Call</button>
                 <button onClick={onCall} className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-white"><Phone size={18} /></button>
               </div>
            </div>
            <div className="p-6">
              <span className="text-[10px] font-black uppercase text-brand-500 tracking-widest">{avatar.profession}</span>
              <h4 className="text-xl font-bold mt-1">{avatar.name}</h4>
            </div>
          </motion.div>
        ))}
        <button className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-10 hover:border-brand-500 hover:bg-brand-500/5 transition-all text-slate-400 hover:text-brand-500 group">
          <Heart size={48} className="mb-4 opacity-20 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Add New Favorite</span>
        </button>
      </div>
    </div>
  );
};

export default FavoritesPage;

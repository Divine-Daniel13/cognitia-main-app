
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Video, Globe, Play, Lock, Sparkles } from 'lucide-react';
import { AVATARS } from '../../constants';
// Added Skeleton to imports
import { AvatarSkeleton, Skeleton } from '../Skeleton';

const AvatarAdmin: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {Array(4).fill(0).map((_, i) => <AvatarSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Avatar Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure appearance, voice, and personality models.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center space-x-3 group">
           <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
           <span>Create New Expert</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {AVATARS.map((avatar, idx) => (
          <motion.div 
            key={avatar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
          >
             <div className="relative aspect-[4/5] overflow-hidden">
                <img src={avatar.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                   {avatar.isPremium && (
                     <div className="p-2 bg-amber-400 text-slate-950 rounded-xl shadow-lg">
                       <Lock size={14} />
                     </div>
                   )}
                   <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl text-[10px] font-black uppercase text-white tracking-widest border border-white/10">
                      ID: {avatar.id}394
                   </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <button className="flex-1 py-3 bg-white text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-xl hover:bg-slate-100">
                      <Edit2 size={14} />
                      <span>Edit Expert</span>
                   </button>
                   <button className="p-3 bg-rose-500 text-white rounded-xl shadow-xl hover:bg-rose-600 transition-colors">
                      <Trash2 size={16} />
                   </button>
                </div>
             </div>

             <div className="p-8">
                <div className="flex items-center space-x-2 mb-3">
                   <Sparkles size={14} className="text-indigo-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{avatar.profession}</span>
                </div>
                <h4 className="text-2xl font-bold mb-4">{avatar.name}</h4>
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Voice Profile</span>
                      <span className="text-indigo-500">Neural-v4 (US)</span>
                   </div>
                   <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Response Rate</span>
                      <span className="text-emerald-500">~240ms</span>
                   </div>
                   <div className="flex flex-wrap gap-1.5 pt-2">
                      {avatar.language.map(lang => (
                        <span key={lang} className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-[9px] font-bold text-slate-500 uppercase">{lang}</span>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        ))}

        {/* Empty State Card */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 min-h-[400px]"
        >
           <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <Plus size={42} />
           </div>
           <h4 className="text-xl font-bold mb-2">Add New Expert</h4>
           <p className="text-sm text-slate-500 text-center px-4 leading-relaxed">Expand the platform with a new specialized AI intelligence model.</p>
        </motion.button>
      </div>
    </div>
  );
};

export default AvatarAdmin;

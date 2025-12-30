
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Video, Globe, Play, Lock, Sparkles, X, Save } from 'lucide-react';
import { AVATARS } from '../../constants';
import { AvatarSkeleton, Skeleton } from '../Skeleton';

const AvatarAdmin: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);

  const handleEdit = (avatar: any) => {
    setSelectedAvatar(avatar);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Permanently deconstruct this AI expert core? This cannot be undone.')) {
      alert(`Expert ${id} marked for deletion.`);
    }
  };

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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center space-x-3 group"
        >
           <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
           <span>Create New Expert</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {AVATARS.map((avatar, idx) => (
          <motion.div 
            key={avatar.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
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
                   <button 
                    onClick={() => handleEdit(avatar)}
                    className="flex-1 py-3 bg-white text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-xl hover:bg-slate-100"
                   >
                      <Edit2 size={14} />
                      <span>Edit Expert</span>
                   </button>
                   <button 
                    onClick={() => handleDelete(avatar.id)}
                    className="p-3 bg-rose-500 text-white rounded-xl shadow-xl hover:bg-rose-600 transition-colors"
                   >
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
                </div>
             </div>
          </motion.div>
        ))}

        <motion.button 
          onClick={() => setIsAddModalOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="group flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 min-h-[400px]"
        >
           <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <Plus size={42} />
           </div>
           <h4 className="text-xl font-bold mb-2">Add New Expert</h4>
           <p className="text-sm text-slate-500 text-center px-4 leading-relaxed">Expand the platform with a new specialized AI intelligence model.</p>
        </motion.button>
      </div>

      <AnimatePresence>
        {(isEditModalOpen || isAddModalOpen) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsEditModalOpen(false); setIsAddModalOpen(false); }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-2xl font-bold">{isEditModalOpen ? `Editing ${selectedAvatar?.name}` : 'Create New Expert Core'}</h3>
                   <button onClick={() => { setIsEditModalOpen(false); setIsAddModalOpen(false); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><X/></button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400">Name</label><input defaultValue={selectedAvatar?.name} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950" /></div>
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400">Profession</label><input defaultValue={selectedAvatar?.profession} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950" /></div>
                   <div className="space-y-2 col-span-2"><label className="text-[10px] font-black uppercase text-slate-400">Voice Profile URI</label><input className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950" placeholder="https://api.neuralvoice.com/v4/expert-12" /></div>
                </div>
                <button onClick={() => { alert('Configuration pushed to cloud edges.'); setIsEditModalOpen(false); setIsAddModalOpen(false); }} className="w-full mt-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2"><Save size={18}/><span>{isEditModalOpen ? 'Update Shard' : 'Provision Expert'}</span></button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarAdmin;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, FolderOpen, Plus, MoreVertical, FileText, Share2, Trash2, Video, Code } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AdminContent: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [activeCat, setActiveCat] = useState('All Assets');
  
  const assets = [
    { name: 'Breathing_Guide_V1.pdf', type: 'Documents', size: '2.4 MB', updated: 'Today' },
    { name: 'Market_Trends_2024.slides', type: 'Presentations', size: '14.1 MB', updated: 'Yesterday' },
    { name: 'Hero_Banner_Main.png', type: 'Images', size: '1.2 MB', updated: '2d ago' },
    { name: 'Onboarding_Script.txt', type: 'Scripts', size: '12 KB', updated: '1w ago' },
  ];

  const filteredAssets = activeCat === 'All Assets' ? assets : assets.filter(a => a.type === activeCat);

  const handleAction = (type: string, name: string) => {
    alert(`${type} triggered for ${name}`);
  };

  if (isLoading) return <div className="p-8"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
         <div>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Visual Aid Reservoir</h1>
            <p className="text-slate-500">Manage assets used by AI experts during live sessions.</p>
         </div>
         <button 
            onClick={() => alert('Opening file provisioner...')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center space-x-3"
         >
            <Plus size={20} /><span>Upload Content</span>
         </button>
      </div>

      <div className="flex items-center space-x-4 overflow-x-auto pb-4 no-scrollbar">
         {['All Assets', 'Documents', 'Images', 'Presentations', 'Scripts'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCat(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCat === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-indigo-500'}`}
            >
              {cat}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {filteredAssets.map((asset, i) => (
           <motion.div key={i} layout whileHover={{y: -5}} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] group relative">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={18} className="text-slate-400 cursor-pointer"/></div>
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center mb-6">
                 {asset.type === 'Images' ? <ImageIcon size={32}/> : asset.type === 'Scripts' ? <Code size={32}/> : <FileText size={32}/>}
              </div>
              <h4 className="font-bold text-sm mb-1 truncate">{asset.name}</h4>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{asset.type} • {asset.size}</p>
              <div className="mt-8 flex space-x-2">
                 <button 
                  onClick={() => handleAction('Global Sync', asset.name)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs font-bold hover:bg-indigo-500/10 hover:text-indigo-600 transition-all flex items-center justify-center space-x-2"
                 >
                   <Share2 size={12}/><span>Sync</span>
                 </button>
                 <button 
                  onClick={() => handleAction('Delete', asset.name)}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-rose-500 transition-all"
                 >
                   <Trash2 size={12}/>
                 </button>
              </div>
           </motion.div>
         ))}
         <button 
          onClick={() => alert('Allocating new data shard on edge network...')}
          className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group min-h-[240px]"
         >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Plus size={24}/></div>
            <span className="text-xs font-black uppercase text-slate-400">Add Shard</span>
         </button>
      </div>
    </div>
  );
};

export default AdminContent;


import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, ShieldCheck, Globe, Star, Play, MoreVertical, Plus } from 'lucide-react';
import { AVATARS } from '../../constants';
import { Skeleton } from '../Skeleton';

const SuperAvatarControl: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) return <div className="p-8"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Inference Fleet Command</h1>
            <p className="text-slate-500 font-medium">Root level management of AI personality cores and neural speech engines.</p>
         </div>
         <button className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-500/30 flex items-center space-x-3"><Plus size={20}/><span>Deploy Core</span></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {AVATARS.map((av, idx) => (
           <motion.div key={av.id} initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay: idx*0.1}} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[2.5rem] shadow-sm group">
              <div className="flex items-center justify-between mb-8">
                 <div className="relative"><img src={av.image} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-500/10" /><div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" /></div>
                 <button className="p-2 text-slate-400 hover:text-purple-500 transition-colors"><MoreVertical size={20}/></button>
              </div>
              <h4 className="text-xl font-bold mb-1 truncate">{av.name}</h4>
              <p className="text-[10px] font-black uppercase text-purple-600 tracking-widest mb-6">{av.profession}</p>
              <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-900">
                 <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>Core Health</span><span className="text-emerald-500">OPTIMAL</span></div>
                 <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width: '98%'}} className="h-full bg-emerald-500" /></div>
                 <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 pt-2"><span>Sessions</span><span className="text-slate-900 dark:text-white">12.4K</span></div>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px]" />
         <div className="flex items-center space-x-8">
            <div className="w-20 h-20 bg-purple-600 rounded-[2rem] flex items-center justify-center shadow-2xl"><Cpu size={40}/></div>
            <div>
               <h4 className="text-2xl font-display font-black uppercase tracking-tighter">Platform Neural Sync</h4>
               <p className="text-slate-400 max-w-sm mt-1">Initiate a platform-wide personality shard update. Estimated downtime: <span className="text-purple-400">0.02ms</span></p>
            </div>
         </div>
         <button className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all shadow-xl">Push Global Update</button>
      </div>
    </div>
  );
};

export default SuperAvatarControl;

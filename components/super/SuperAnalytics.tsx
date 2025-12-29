
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Globe, Users, Clock, Target, Cpu, Share2, Zap } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const SuperAnalytics: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) return <div className="p-8"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Global Intelligence Insights</h1>
            <p className="text-slate-500 font-medium">Deep meta-analysis of platform behavioral and inference patterns.</p>
         </div>
         <button className="px-8 py-3 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-purple-500/20">Sync Neural Cache</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 p-12 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-12">
               <h4 className="text-2xl font-display font-black uppercase tracking-tighter">Usage Heatmap</h4>
               <div className="flex space-x-2">{[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400"><Globe size={18}/></div>)}</div>
            </div>
            <div className="h-80 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center">
               <div className="text-center"><p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Neural Node Density Simulation</p>
               <div className="grid grid-cols-10 gap-2 opacity-40">
                  {Array(60).fill(0).map((_, i) => (
                    <motion.div key={i} animate={{opacity: [0.2, 0.8, 0.2]}} transition={{repeat: Infinity, duration: 2 + Math.random(), delay: i*0.01}} className={`w-4 h-4 rounded-sm ${i % 7 === 0 ? 'bg-purple-600 shadow-[0_0_10px_purple]' : 'bg-slate-300 dark:bg-slate-800'}`} />
                  ))}
               </div>
               </div>
            </div>
         </div>

         <div className="p-12 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] shadow-sm flex flex-col justify-between">
            <h4 className="text-xl font-bold uppercase tracking-tight mb-8">Retention Cohorts</h4>
            <div className="space-y-6">
               {[
                 { label: 'User Retention (D30)', val: '84.2%', color: 'text-purple-600' },
                 { label: 'Admin Activity (W4)', val: '99.8%', color: 'text-emerald-500' },
                 { label: 'Avatar Interaction (H24)', val: '4,281h', color: 'text-indigo-500' },
                 { label: 'Inference Success Rate', val: '99.98%', color: 'text-amber-500' },
               ].map(stat => (
                 <div key={stat.label} className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SuperAnalytics;


import React from 'react';
import { motion } from 'framer-motion';
// Fixed missing ShieldCheck import
import { DollarSign, TrendingUp, ArrowUpRight, PieChart, Activity, Globe, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const SuperRevenue: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) return <div className="p-8"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Financial Authority Center</h1>
            <p className="text-slate-500 font-medium">Global platform revenue, tokenomics, and fiscal oversight.</p>
         </div>
         <div className="flex space-x-4">
            <div className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center space-x-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">LIVE FISCAL SYNC</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 p-12 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-12">
               <div><h4 className="text-2xl font-display font-black uppercase tracking-tighter">Gross Platform Volume</h4><p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Year to Date performance</p></div>
               <div className="flex items-center space-x-3 text-emerald-500 font-black"><TrendingUp size={20}/><span>+42.8%</span></div>
            </div>
            <div className="h-64 flex items-end justify-between px-4 gap-6">
               {[30, 45, 60, 40, 80, 70, 95, 85, 100, 90, 110, 105].map((h, i) => (
                 <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-t-2xl relative group">
                    <motion.div initial={{height: 0}} animate={{height: `${h}%`}} transition={{delay: i*0.05}} className="absolute bottom-0 left-0 right-0 bg-purple-600 rounded-t-xl shadow-[0_0_20px_rgba(147,51,234,0.3)]"/>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[100px]" />
            <div>
               <div className="flex justify-between items-start mb-10"><div className="p-4 bg-white/10 rounded-2xl"><DollarSign size={32} className="text-purple-400"/></div><ArrowUpRight size={24} className="text-slate-500 opacity-50"/></div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Estimated ARR</p>
               <h3 className="text-5xl font-display font-black tracking-tighter">$14.2M</h3>
            </div>
            <div className="space-y-4 pt-10 border-t border-white/5">
               <div className="flex justify-between text-xs"><span className="text-slate-400">Subscription Recurrence</span><span className="font-bold">84.2%</span></div>
               <div className="flex justify-between text-xs"><span className="text-slate-400">Churn Coefficient</span><span className="text-emerald-400">0.42%</span></div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { label: 'Token Liquidity', val: '4.2B', icon: Zap },
           { label: 'Merchant Nodes', val: '142', icon: Globe },
           { label: 'Settlement Latency', val: '12s', icon: Activity },
           { label: 'Fiscal Integrity', val: '99.9%', icon: ShieldCheck }
         ].map(stat => (
           <div key={stat.label} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[2.5rem] shadow-sm group">
              <div className="flex items-center space-x-4 mb-4"><div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl group-hover:scale-110 transition-transform"><stat.icon size={20}/></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span></div>
              <h4 className="text-3xl font-display font-black tracking-tighter">{stat.val}</h4>
           </div>
         ))}
      </div>
    </div>
  );
};

export default SuperRevenue;

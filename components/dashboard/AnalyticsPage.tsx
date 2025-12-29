
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, PieChart, Info, Lock, Download } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AnalyticsPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[400px] w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Skeleton className="h-[300px] rounded-3xl" />
           <Skeleton className="h-[300px] rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Session Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Deep insights into your growth patterns.</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20">
          <Download size={18} />
          <span>Report PDF</span>
        </button>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-8 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800">
             <div className="flex items-center justify-between mb-10">
               <div>
                 <h4 className="text-xl font-bold">Skill Progression</h4>
                 <p className="text-sm text-slate-500">Based on AI emotional feedback scores</p>
               </div>
               <TrendingUp className="text-brand-500" />
             </div>
             <div className="h-64 flex items-end justify-between px-2 gap-4">
               {[70, 85, 60, 95, 80, 75, 90, 85, 100, 95].map((h, i) => (
                 <div key={i} className="flex-1 bg-brand-500/10 dark:bg-brand-500/5 rounded-xl relative group">
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="absolute bottom-0 left-0 right-0 bg-brand-500 rounded-xl"
                   />
                 </div>
               ))}
             </div>
          </div>

          <div className="p-8 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800">
             <h4 className="text-xl font-bold mb-10">Category Mix</h4>
             <div className="flex flex-col items-center justify-center space-y-8">
                <div className="relative w-48 h-48 rounded-full border-[16px] border-brand-500/20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[16px] border-brand-500 border-t-transparent -rotate-45" />
                  <div className="text-center">
                    <p className="text-3xl font-bold">64%</p>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Psychology</p>
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-brand-500" /><span>Psychology</span></span>
                    <span className="font-bold">64%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-indigo-500" /><span>Business</span></span>
                    <span className="font-bold">22%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-slate-300" /><span>Others</span></span>
                    <span className="font-bold">14%</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Premium Gating Overlay Mock */}
        <div className="absolute inset-0 bg-slate-50/10 dark:bg-black/10 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border border-white/20">
           <div className="max-w-md p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl text-center border border-slate-200 dark:border-slate-800 animate-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Advanced Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                Unlock deep sentiment tracking, session highlights, and cross-avatar growth metrics with Cognitia Premium.
              </p>
              <button className="w-full py-4 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30">
                Upgrade to Premium
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;


import React from 'react';
import { motion } from 'framer-motion';
// Added ShieldAlert to imports
import { Users, Video, DollarSign, Heart, ArrowUpRight, TrendingUp, Activity, Globe, ShieldAlert } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AdminOverview: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const kpis = [
    { label: 'Total Platform Users', value: '428,291', change: '+12.5%', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Active Live Calls', value: '1,242', change: '+3.2%', icon: Video, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Platform Revenue', value: '$1.2M', change: '+24%', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Avatar Satisfaction', value: '98.4%', change: '+0.4%', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-[2rem]" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Skeleton className="lg:col-span-2 h-[500px] rounded-[3rem]" />
           <Skeleton className="h-[500px] rounded-[3rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Platform Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time performance and operational metrics.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20">Live</button>
           <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all">24h</button>
           <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all">7d</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
          >
             <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center transition-transform group-hover:rotate-6`}>
                   <kpi.icon size={28} />
                </div>
                <div className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-bold">
                   <TrendingUp size={14} />
                   <span>{kpi.change}</span>
                </div>
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
             <h3 className="text-3xl font-display font-black">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Global Traffic Chart */}
        <div className="lg:col-span-2 p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm">
           <div className="flex items-center justify-between mb-12">
              <div>
                <h4 className="text-2xl font-bold">Platform Traffic</h4>
                <p className="text-sm text-slate-400 font-medium">Session density across global regions</p>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-xs font-bold text-slate-400">Mobile</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-300"></div>
                    <span className="text-xs font-bold text-slate-400">Desktop</span>
                 </div>
              </div>
           </div>
           
           <div className="h-72 flex items-end justify-between px-4 gap-4">
              {[40, 60, 45, 90, 65, 80, 55, 70, 40, 85, 95, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1.5 items-center group">
                   <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 rounded-t-2xl relative overflow-hidden">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1.5, delay: i * 0.05, ease: "circOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-indigo-600/20"
                      />
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h * 0.7}%` }}
                        transition={{ duration: 1.5, delay: i * 0.05 + 0.5, ease: "circOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-xl group-hover:bg-indigo-400 transition-colors"
                      />
                   </div>
                   <span className="text-[10px] font-black text-slate-400">{i + 1}h</span>
                </div>
              ))}
           </div>
        </div>

        {/* System Logs / Notifications */}
        <div className="p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h4 className="text-2xl font-bold">Activity Feed</h4>
              <Activity size={20} className="text-indigo-500 animate-pulse" />
           </div>
           <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar pr-2">
              {[
                { type: 'user', msg: 'New Pro registration: Alice Wonder', time: '2m ago', icon: Users, color: 'text-indigo-500' },
                { type: 'billing', msg: 'Payout processed for Marcus Chen', time: '14m ago', icon: DollarSign, color: 'text-emerald-500' },
                { type: 'system', msg: 'Server node Asia-South-1 scaled', time: '42m ago', icon: Globe, color: 'text-amber-500' },
                { type: 'moderation', msg: 'Call #f29a flagged for high emotion', time: '1h ago', icon: ShieldAlert, color: 'text-rose-500' },
                { type: 'user', msg: 'Support ticket #1024 created', time: '2h ago', icon: Users, color: 'text-indigo-500' },
              ].map((log, i) => (
                <div key={i} className="flex space-x-4 items-start animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i * 0.1}s` }}>
                   <div className={`mt-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 ${log.color}`}>
                      <log.icon size={16} />
                   </div>
                   <div>
                      <p className="text-sm font-bold leading-tight">{log.msg}</p>
                      <p className="text-[10px] font-black uppercase text-slate-400 mt-1 tracking-widest">{log.time}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full py-4 mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
              View Audit Logs
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;


import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Video, DollarSign, Activity, Cpu, Server, Database, Globe, TrendingUp, ArrowUpRight, Zap } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const SuperOverview: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const kpis = [
    { label: 'Total Global Users', value: '428,291', change: '+24.5%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Network Admins', value: '842', change: '+2.1%', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Active HD Sessions', value: '1,242', change: '+18.4%', icon: Video, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Platform Revenue', value: '$4.2M', change: '+32.2%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const systems = [
    { label: 'AI Inference Engine', status: 'Operational', latency: '24ms', icon: Cpu, health: 99.98 },
    { label: 'Voice Processing Unit', status: 'Optimal', latency: '12ms', icon: Activity, health: 100 },
    { label: 'Media Stream Proxy', status: 'Degraded', latency: '142ms', icon: Server, health: 92.4 },
    { label: 'Global Data Sync', status: 'Operational', latency: '4ms', icon: Database, health: 99.99 },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-44 rounded-[2.5rem]" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Skeleton className="lg:col-span-2 h-[600px] rounded-[3rem]" />
           <Skeleton className="h-[600px] rounded-[3rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Portals and Identity */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase">Platform Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Real-time telemetry and global authority nexus.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-3xl shadow-xl border border-slate-200 dark:border-purple-500/20">
           <div className="px-5 py-2.5 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/30">Live Map</div>
           <button className="px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Telemetry</button>
           <button className="px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Incidents</button>
        </div>
      </div>

      {/* Root KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-[4rem]" />
             <div className="flex justify-between items-start mb-10">
                <div className={`w-16 h-16 rounded-[1.5rem] ${kpi.bg} ${kpi.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                   <kpi.icon size={32} />
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-xl text-xs font-black">
                   <TrendingUp size={16} />
                   <span>{kpi.change}</span>
                </div>
             </div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{kpi.label}</p>
             <h3 className="text-4xl font-display font-black tracking-tighter">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Global Traffic & Node Analytics */}
        <div className="lg:col-span-2 p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-16">
              <div>
                <h4 className="text-3xl font-display font-black uppercase tracking-tighter">Global Session Density</h4>
                <p className="text-sm text-slate-400 font-bold mt-1">Cross-regional inference distribution (ms)</p>
              </div>
              <div className="flex space-x-2">
                 {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />)}
              </div>
           </div>
           
           <div className="flex-1 flex items-end justify-between gap-6 px-4">
              {[80, 40, 100, 60, 45, 90, 70, 85, 30, 95, 60, 75, 40, 80, 55, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-2 group items-center">
                   <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl relative overflow-hidden">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1.5, delay: i * 0.05, ease: "circOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600/40 to-purple-400/20"
                      />
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h * 0.6}%` }}
                        transition={{ duration: 1.5, delay: i * 0.05 + 0.3, ease: "circOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-purple-600 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all group-hover:bg-purple-400"
                      />
                      {h > 80 && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" />
                      )}
                   </div>
                   <span className="text-[9px] font-black text-slate-400 uppercase">{i + 1}</span>
                </div>
              ))}
           </div>
           
           <div className="mt-12 flex flex-wrap gap-4">
              {['US-East-1', 'EU-Central-1', 'Asia-NE-1', 'SA-East-1'].map(region => (
                <div key={region} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-[10px] font-black uppercase text-slate-500 flex items-center space-x-2">
                   <Globe size={12} className="text-purple-500" />
                   <span>{region}</span>
                </div>
              ))}
           </div>
        </div>

        {/* System Health Nexus */}
        <div className="p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <h4 className="text-2xl font-display font-black uppercase tracking-tighter">System Health</h4>
              <Zap size={24} className="text-purple-500 animate-bounce" />
           </div>
           
           <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar">
              {systems.map((sys, i) => (
                <motion.div 
                  key={sys.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-purple-500/5 hover:border-purple-500/30 transition-all group"
                >
                   <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${sys.health > 95 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} transition-transform group-hover:scale-110`}>
                         <sys.icon size={20} />
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase text-slate-400">Response</p>
                         <p className="text-sm font-black">{sys.latency}</p>
                      </div>
                   </div>
                   <h5 className="text-sm font-black uppercase tracking-tight mb-2">{sys.label}</h5>
                   <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold uppercase ${sys.health > 95 ? 'text-emerald-500' : 'text-rose-500'}`}>{sys.status}</span>
                      <span className="text-[10px] font-black">{sys.health}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sys.health}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${sys.health > 95 ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full`}
                      />
                   </div>
                </motion.div>
              ))}
           </div>
           
           <button className="w-full py-5 mt-10 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all shadow-2xl">
              Initiate System Purge
           </button>
        </div>
      </div>
    </div>
  );
};

export default SuperOverview;

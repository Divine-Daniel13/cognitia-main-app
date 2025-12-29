
import React from 'react';
import { motion } from 'framer-motion';
// Fixed missing Zap import from lucide-react
import { ToggleRight, Cpu, Globe, Lock, Shield, Server, Bell, Key, RefreshCcw, Activity, Database, Cloud, Zap } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const SystemConfig: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const flags = [
    { label: 'Real-time Avatar Video', desc: 'Enables WebRTC high-fidelity face rendering', active: true, critical: true },
    { label: 'Emotional Tone Engine', desc: 'Neural prosody detection system', active: true, critical: false },
    { label: 'Platform Public Beta', desc: 'Allow non-invite registration', active: false, critical: false },
    { label: 'Visual Aids Generator', desc: 'On-the-fly slide & diagram creation', active: true, critical: false },
    { label: 'Super-Resolution Upscaling', desc: 'Enhanced 4K avatar video processing', active: false, critical: false },
  ];

  const envs = [
    { name: 'Production', version: 'v3.2.1-stable', nodes: 42, health: 100, type: 'public' },
    { name: 'Staging', version: 'v3.3.0-rc4', nodes: 8, health: 98.4, type: 'testing' },
    { name: 'Development', version: 'v3.4.0-alpha', nodes: 2, health: 100, type: 'dev' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Skeleton className="h-[500px] rounded-[3rem]" />
           <Skeleton className="h-[500px] rounded-[3rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Root System Core</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Control feature flags, environment deployment, and API orchestration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Feature Flags */}
         <div className="p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h4 className="text-2xl font-display font-black uppercase tracking-tighter">Feature Flags</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Runtime Logic Control</p>
               </div>
               <button className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 transition-all">
                  <RefreshCcw size={20} className="text-slate-500" />
               </button>
            </div>
            
            <div className="space-y-4">
               {flags.map((flag, i) => (
                 <motion.div 
                    key={flag.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between group hover:bg-slate-100 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-purple-500/20"
                 >
                    <div className="flex items-center space-x-5">
                       <div className={`p-4 rounded-2xl ${flag.active ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                          {flag.critical ? <Lock size={20} /> : <Zap size={20} />}
                       </div>
                       <div>
                          <h5 className="font-bold text-sm">{flag.label}</h5>
                          <p className="text-xs text-slate-400 font-medium">{flag.desc}</p>
                       </div>
                    </div>
                    <div className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors ${flag.active ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-800'}`}>
                       <motion.div 
                          animate={{ x: flag.active ? 28 : 0 }}
                          className="w-5 h-5 bg-white rounded-full shadow-lg"
                       />
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Environment Topology */}
         <div className="space-y-8">
            <div className="p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h4 className="text-2xl font-display font-black uppercase tracking-tighter">Cluster Topology</h4>
                  <Cloud size={24} className="text-purple-500" />
               </div>
               
               <div className="space-y-6">
                  {envs.map((env, i) => (
                    <div key={env.name} className="flex items-center justify-between p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                       <div className="flex items-center space-x-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${env.type === 'public' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                             <Server size={22} />
                          </div>
                          <div>
                             <h5 className="font-black text-sm uppercase tracking-tight">{env.name}</h5>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{env.version}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
                          <div className="flex items-center space-x-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-xs font-black uppercase">{env.health}%</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 blur-3xl" />
                  <Key size={24} className="text-purple-400 mb-6 group-hover:rotate-12 transition-transform" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">API Key Rotation</p>
                  <h5 className="text-xl font-display font-black tracking-tighter">3 Active Sockets</h5>
               </div>
               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[2.5rem] group">
                  <Bell size={24} className="text-indigo-500 mb-6 group-hover:animate-shake" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Global Alerts</p>
                  <h5 className="text-xl font-display font-black tracking-tighter">Push v4 Relay</h5>
               </div>
            </div>
         </div>
      </div>
      
      <div className="p-10 bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white">
               <Database size={28} />
            </div>
            <div>
               <h4 className="text-xl font-display font-black uppercase tracking-tighter">Mass Snapshot Trigger</h4>
               <p className="text-sm text-slate-400 font-medium">Capture complete platform state across all nodes for cold storage.</p>
            </div>
         </div>
         <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase text-xs tracking-widest rounded-3xl hover:opacity-90 transition-all">
            Initiate Snapshot
         </button>
      </div>
    </div>
  );
};

export default SystemConfig;

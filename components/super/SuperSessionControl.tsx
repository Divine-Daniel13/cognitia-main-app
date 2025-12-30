
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Video, User, Zap, Info, Play, Pause, XCircle } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const SuperSessionControl: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const activeSessions = [
    { id: 'sess_992', user: 'Michael R.', avatar: 'Dr. Elena Vance', duration: '12:42', stress: 82, status: 'Encrypted' },
    { id: 'sess_401', user: 'Lily C.', avatar: 'Marcus Chen', duration: '05:18', stress: 14, status: 'Active' },
    { id: 'sess_118', user: 'Sarah J.', avatar: 'Aiden Reed', duration: '28:01', stress: 45, status: 'Recording' },
  ];

  const handleSessionAction = (action: string, id: string) => {
    alert(`Platform Action: ${action} initiated for session ${id}.`);
  };

  if (isLoading) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-96 rounded-[3rem]" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Global Session Oversight</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Real-time monitoring and override control of active AI-Human neural sessions.</p>
        </div>
        <div className="flex items-center space-x-3 px-6 py-3 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20">
           <Activity size={20} className="animate-pulse" />
           <span className="text-xs font-black uppercase tracking-widest">Live sessions: 1,242</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {activeSessions.map((sess, idx) => (
           <motion.div
             key={sess.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             className="group p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
           >
              <div className="flex items-center justify-between mb-8">
                 <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">
                    UID: {sess.id}
                 </div>
                 <div className="flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                    <Shield size={12} />
                    <span>{sess.status}</span>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 mb-10">
                 <div className="relative">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-purple-500/20 animate-pulse">
                       <Video size={40} className="text-purple-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-lg">
                       <User size={18} className="text-indigo-500" />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-xl font-black tracking-tight mb-1">{sess.avatar}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Interacting with {sess.user}</p>
                 </div>
                 <div className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${sess.stress}%` }}
                      className={`h-full ${sess.stress > 80 ? 'bg-rose-500' : 'bg-purple-500'}`}
                    />
                 </div>
                 <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-400">
                    <Activity size={12} />
                    <span>Emotional Intensity: {sess.stress}%</span>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                 <button 
                  onClick={() => handleSessionAction('Neural-Monitoring', sess.id)}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all flex items-center justify-center"
                 >
                    <Play size={20} />
                 </button>
                 <button 
                  onClick={() => handleSessionAction('Neural-Pause', sess.id)}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-amber-500/10 hover:text-amber-500 transition-all flex items-center justify-center"
                 >
                    <Pause size={20} />
                 </button>
                 <button 
                  onClick={() => handleSessionAction('Neural-Eject', sess.id)}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-rose-500/10 hover:text-rose-500 transition-all flex items-center justify-center"
                 >
                    <XCircle size={20} />
                 </button>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3.5rem] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-2xl font-display font-black uppercase tracking-tighter">Cluster Metrics</h4>
               <Zap size={24} className="text-purple-500" />
            </div>
            <div className="space-y-6">
               {[
                 { label: 'Avg Latency', val: '24ms', target: '30ms', color: 'bg-emerald-500' },
                 { label: 'Packet Integrity', val: '99.98%', target: '99.99%', color: 'bg-indigo-500' },
                 { label: 'VRAM Usage', val: '84%', target: '100%', color: 'bg-amber-500' },
               ].map(stat => (
                 <div key={stat.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                       <span>{stat.label}</span>
                       <span className="text-slate-900 dark:text-white">{stat.val} / {stat.target}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                       <div className={`h-full ${stat.color} w-3/4`} />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-10 bg-indigo-600 rounded-[3.5rem] text-white flex flex-col justify-center">
            <div className="flex items-center space-x-6 mb-8">
               <div className="p-4 bg-white/20 rounded-[1.5rem] backdrop-blur-md">
                  <Shield size={32} />
               </div>
               <div>
                  <h4 className="text-2xl font-display font-black uppercase tracking-tighter leading-tight">Neural Passive Monitoring</h4>
                  <p className="text-indigo-100 text-sm opacity-80 mt-1">AI ethics engine is actively scanning all streams for potential misuse or cognitive hazards.</p>
               </div>
            </div>
            <button className="w-full py-5 rounded-3xl bg-white text-indigo-600 font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-slate-50 transition-all">
               View Ethics Scoreboard
            </button>
         </div>
      </div>
    </div>
  );
};

export default SuperSessionControl;

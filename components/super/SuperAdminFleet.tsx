
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserPlus, Lock, ShieldAlert, Activity, Globe, MoreVertical, Terminal } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const SuperAdminFleet: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const admins = [
    { id: 'adm_01', name: 'Sarah Fleetmaster', role: 'Fleet Command', clearance: 5, sessions: 428, status: 'Online', region: 'HQ-Primary' },
    { id: 'adm_02', name: 'Marcus Moderator', role: 'Content Safety', clearance: 3, sessions: 1242, status: 'Online', region: 'Global-Remote' },
    { id: 'adm_03', name: 'Elena Support', role: 'Identity Ops', clearance: 2, sessions: 84, status: 'Offline', region: 'EU-Satellite' },
    { id: 'adm_04', name: 'James Infrastructure', role: 'Cluster Lead', clearance: 4, sessions: 29, status: 'Away', region: 'Inference-Central' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-48 rounded-[3rem]" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Admin Fleet Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Delegate and oversee delegated authority levels within the platform ecosystem.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center space-x-3">
           <UserPlus size={20} />
           <span>Authorize Admin</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
         {admins.map((adm, idx) => (
           <motion.div
             key={adm.id}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: idx * 0.1 }}
             className="group relative p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
           >
              <div className="absolute top-6 right-6">
                 <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                    <MoreVertical size={20} />
                 </button>
              </div>

              <div className="flex items-center space-x-5 mb-8">
                 <div className="relative">
                    <img src={`https://i.pravatar.cc/150?u=${adm.id}`} className="w-16 h-16 rounded-[2rem] object-cover ring-4 ring-indigo-500/10 group-hover:ring-indigo-500/30 transition-all" />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 ${
                      adm.status === 'Online' ? 'bg-emerald-500' : adm.status === 'Away' ? 'bg-amber-500' : 'bg-slate-500'
                    }`} />
                 </div>
                 <div>
                    <h4 className="text-lg font-black tracking-tighter">{adm.name}</h4>
                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{adm.role}</p>
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Clearance</span>
                    <div className="flex space-x-1">
                       {[...Array(5)].map((_, i) => (
                         <div key={i} className={`w-3 h-1 rounded-full ${i < adm.clearance ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                       ))}
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sessions</span>
                    <span className="text-sm font-black">{adm.sessions}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Region</span>
                    <div className="flex items-center space-x-1">
                       <Globe size={10} className="text-slate-400" />
                       <span className="text-[10px] font-bold text-slate-500 uppercase">{adm.region}</span>
                    </div>
                 </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                 <button className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-[10px] font-black uppercase text-slate-600 hover:bg-indigo-500/10 hover:text-indigo-600 transition-all">
                    Audit Logs
                 </button>
                 <button className="py-3 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                    Revoke
                 </button>
              </div>
           </motion.div>
         ))}

         <motion.button 
           whileHover={{ scale: 1.02 }}
           className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-purple-500/20 rounded-[3rem] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
         >
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
               <ShieldAlert size={32} />
            </div>
            <h5 className="font-black uppercase text-sm tracking-tight mb-2">Emergency Lockdown</h5>
            <p className="text-[10px] font-bold text-slate-400 text-center px-6 leading-relaxed uppercase tracking-widest">Instantly suspend all delegated admin access keys.</p>
         </motion.button>
      </div>

      <div className="p-10 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
         <div className="flex items-center space-x-8">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40">
               <Terminal size={32} className="text-white" />
            </div>
            <div>
               <h4 className="text-2xl font-display font-black uppercase tracking-tighter">Root Action Audit</h4>
               <p className="text-sm text-slate-400 max-w-sm">Every administrative delta is cryptographically hashed and stored in the global audit reservoir for legal compliance.</p>
            </div>
         </div>
         <button className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all shadow-xl">
            Download Cryptographic Log
         </button>
      </div>
    </div>
  );
};

export default SuperAdminFleet;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, UserX, ExternalLink, Shield, Zap, Mail, X, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const SuperUserRegistry: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const users = [
    { id: 'usr_812', name: 'Michael Robinson', email: 'm.robin@gmail.com', plan: 'Enterprise', credits: '124,234', status: 'Active', region: 'NA-East' },
    { id: 'usr_239', name: 'Lily Carter', email: 'lily.c@dev.io', plan: 'Pro', credits: '4,500', status: 'Active', region: 'EU-West' },
    { id: 'usr_901', name: 'Jonathan Miller', email: 'j.miller@tech.com', plan: 'Free', credits: '30', status: 'Suspended', region: 'AS-South' },
    { id: 'usr_442', name: 'Robert Zhang', email: 'rob.z@venture.net', plan: 'Enterprise', credits: '82,890', status: 'Active', region: 'EU-North' },
    { id: 'usr_105', name: 'Sarah Jenkins', email: 's.jenkins@edu.org', plan: 'Pro', credits: '2,115', status: 'Active', region: 'NA-West' },
  ];

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsProvisionModalOpen(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-10">
        <div className="flex justify-between items-center">
           <Skeleton className="h-10 w-64" />
           <Skeleton className="h-12 w-48 rounded-2xl" />
        </div>
        <Skeleton className="h-16 w-full rounded-[2rem]" />
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-[2rem]" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Global User Registry</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Root-level oversight of all platform identities and credit reservoirs.</p>
        </div>
        <button 
          onClick={() => setIsProvisionModalOpen(true)}
          className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-500/30 hover:bg-purple-700 transition-all flex items-center space-x-3"
        >
           <Zap size={20} />
           <span>Provision Identity</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
         <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by UID, PII, or Region metadata..." 
              className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/10 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 transition-all font-medium"
            />
         </div>
         <button 
          onClick={() => setIsFilterModalOpen(true)}
          className="px-8 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/10 flex items-center space-x-3 font-bold hover:border-purple-500/50 transition-all"
         >
            <SlidersHorizontal size={20} />
            <span className="text-sm">Logic Filters</span>
         </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3rem] overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-50 dark:border-slate-800">
                     <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Identity Profile</th>
                     <th className="px-6 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Tier</th>
                     <th className="px-6 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Region</th>
                     <th className="px-6 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Reservoir</th>
                     <th className="px-6 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                     <th className="px-10 py-8 text-right text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Nexus</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                  {users.map((user, idx) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                    >
                       <td className="px-10 py-6">
                          <div className="flex items-center space-x-5">
                             <div className="relative">
                                <img src={`https://i.pravatar.cc/100?u=${user.id}`} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-500/10 group-hover:ring-purple-500/30 transition-all" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-lg bg-slate-900 dark:bg-purple-600 border-2 border-white dark:border-slate-950 flex items-center justify-center">
                                   <Zap size={8} className="text-white fill-current" />
                                </div>
                             </div>
                             <div>
                                <p className="text-sm font-black tracking-tight">{user.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 flex items-center space-x-1 uppercase tracking-widest mt-1">
                                   <Mail size={10} />
                                   <span>{user.email}</span>
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6">
                          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            user.plan === 'Enterprise' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 
                            user.plan === 'Pro' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {user.plan}
                          </span>
                       </td>
                       <td className="px-6 py-6 font-mono text-xs font-bold text-slate-500">{user.region}</td>
                       <td className="px-6 py-6">
                          <div className="flex items-center space-x-2">
                             <Zap size={12} className="text-purple-500" />
                             <span className="font-display font-black text-sm">{user.credits}</span>
                          </div>
                       </td>
                       <td className="px-6 py-6">
                          <div className="flex items-center space-x-2.5">
                             <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                             <span className="text-[10px] font-black uppercase tracking-widest">{user.status}</span>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                             <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 hover:text-purple-500 transition-all shadow-sm">
                                <ExternalLink size={18} />
                             </button>
                             <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 hover:text-purple-500 transition-all shadow-sm">
                                <Shield size={18} />
                             </button>
                             <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                                <UserX size={18} />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Accessing Node 1 of 842 Identity Subsets</p>
            <div className="flex items-center space-x-3">
               <button className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-400">Back</button>
               <div className="flex space-x-2">
                  {[1, 2, 3, 4].map(p => (
                    <button key={p} className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${p === 1 ? 'bg-purple-600 text-white shadow-xl shadow-purple-500/20' : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200'}`}>
                      {p}
                    </button>
                  ))}
               </div>
               <button className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest">Next Shift</button>
            </div>
         </div>
      </div>

      <AnimatePresence>
        {isProvisionModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProvisionModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-purple-500/20">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-2xl font-black uppercase tracking-tighter">Identity Provisioning</h3>
                   <button onClick={() => setIsProvisionModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={24}/></button>
                </div>
                {isSuccess ? (
                  <div className="text-center py-10 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={48} className="animate-bounce" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Shard Allocated</h4>
                    <p className="text-slate-500">Cognitia ID successfully instantiated in global registry.</p>
                  </div>
                ) : (
                  <form onSubmit={handleProvision} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Legal Entity Name</label>
                       <input required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-purple-500/20" placeholder="Identity name" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Identity Mailbox</label>
                       <input required type="email" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-purple-500/20" placeholder="user@domain.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Initial Reservoir</label>
                          <input required type="number" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-purple-500/20" defaultValue="1000" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Clearance Tier</label>
                          <select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-purple-500/20 appearance-none">
                             <option>Enterprise</option>
                             <option>Pro</option>
                             <option>Free</option>
                          </select>
                       </div>
                    </div>
                    <button type="submit" className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition-all">Establish Neural Identity</button>
                  </form>
                )}
             </motion.div>
          </div>
        )}

        {isFilterModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-slate-200 dark:border-purple-500/20">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xl font-black uppercase tracking-widest">Logic Filtering</h3>
                   <button onClick={() => setIsFilterModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={20}/></button>
                </div>
                <div className="space-y-6">
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Subscription Shard</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['Enterprise', 'Pro', 'Standard', 'Free'].map(t => (
                          <button key={t} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-purple-500/50 hover:bg-purple-500/5 transition-all">{t}</button>
                        ))}
                      </div>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Identity Status</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['Active', 'Flagged', 'Suspended', 'Deactivated'].map(s => (
                          <button key={s} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-purple-500/50 hover:bg-purple-500/5 transition-all">{s}</button>
                        ))}
                      </div>
                   </div>
                   <button onClick={() => setIsFilterModalOpen(false)} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">Apply Selection</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperUserRegistry;

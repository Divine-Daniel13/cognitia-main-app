
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIncoming, Activity, Clock, User, ArrowUpRight, CheckCircle, AlertCircle, Search, Filter, RefreshCw } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AdminCalls: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const calls = [
    { id: 'c_901', user: 'Alice Wonder', avatar: 'Dr. Elena Vance', start: '10:14 AM', duration: '24:15', status: 'Live', jitter: '2ms' },
    { id: 'c_902', user: 'Bob Builder', avatar: 'Marcus Chen', start: '10:05 AM', duration: '12:00', status: 'Live', jitter: '14ms' },
    { id: 'c_903', user: 'Charlie Day', avatar: 'Sarah Jenkins', start: '09:45 AM', duration: '45:30', status: 'Completed', jitter: '1ms' },
    { id: 'c_904', user: 'Diana Prince', avatar: 'Dr. Elena Vance', start: '09:30 AM', duration: '05:12', status: 'Flagged', jitter: '42ms' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-3xl" />)}
        </div>
        <div className="space-y-4">
           {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Session Oversight</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor live interactions and review platform session health.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button 
            onClick={() => alert('Accessing real-time edge node telemetry...')}
            className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
           >
              <Activity size={18} className="text-emerald-500" />
              <span>Network Status</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Live Sessions', val: '1,242', icon: PhoneIncoming, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
           { label: 'Avg Latency', val: '24ms', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: 'Issues Flagged', val: '12', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
         ].map(kpi => (
           <div key={kpi.label} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
              <div className={`w-12 h-12 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-4`}>
                 <kpi.icon size={24} />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <h3 className="text-3xl font-display font-black mt-1">{kpi.val}</h3>
           </div>
         ))}
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
         <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h4 className="text-xl font-bold">Active Sessions Feed</h4>
            <div className="flex items-center space-x-4">
               <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search sessions..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-none text-sm" />
               </div>
               <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2.5 rounded-xl border transition-all ${isFilterOpen ? 'bg-indigo-600 text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500'}`}
               >
                  <Filter size={18} />
               </button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
               <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                     <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Client & Avatar</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Started</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Duration</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Jitter</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                     <th className="px-8 py-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Oversight</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                  {calls.map((call, idx) => (
                    <motion.tr 
                      key={call.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                       <td className="px-8 py-5">
                          <div>
                             <p className="text-sm font-bold">{call.user}</p>
                             <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">with {call.avatar}</p>
                          </div>
                       </td>
                       <td className="px-6 py-5 text-sm font-medium">{call.start}</td>
                       <td className="px-6 py-5 text-sm font-medium">{call.duration}</td>
                       <td className="px-6 py-5">
                          <span className={`text-[10px] font-black ${parseInt(call.jitter) > 30 ? 'text-rose-500' : 'text-emerald-500'}`}>
                             {call.jitter}
                          </span>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-2">
                             <div className={`w-2 h-2 rounded-full ${
                               call.status === 'Live' ? 'bg-emerald-500 animate-pulse' : 
                               call.status === 'Flagged' ? 'bg-rose-500' : 'bg-slate-400'
                             }`} />
                             <span className="text-xs font-bold">{call.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <button 
                            onClick={() => alert(`Entering oversight portal for session ${call.id}...`)}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                          >
                             <ArrowUpRight size={18} />
                          </button>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminCalls;

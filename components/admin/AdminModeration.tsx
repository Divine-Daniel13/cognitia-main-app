
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle, XCircle, MoreVertical, Search, Filter, MessageSquare } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AdminModeration: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const reports = [
    { id: 'rpt_1', type: 'Emotional High', severity: 'Medium', user: 'James T.', avatar: 'Dr. Elena Vance', time: '12m ago', status: 'Pending' },
    { id: 'rpt_2', type: 'Prohibited Query', severity: 'High', user: 'Anon_92', avatar: 'Sarah Jenkins', time: '1h ago', status: 'Investigating' },
    { id: 'rpt_3', type: 'Latency Spike', severity: 'Low', user: 'Mark K.', avatar: 'Marcus Chen', time: '3h ago', status: 'Resolved' },
    { id: 'rpt_4', type: 'Inappropriate Tone', severity: 'Medium', user: 'Elena R.', avatar: 'Aiden Reed', time: '5h ago', status: 'Pending' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-3xl" />)}
        </div>
        <div className="space-y-4">
           {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-3xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Content Moderation</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review flagged interactions and enforce platform safety guidelines.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button className="px-6 py-3 rounded-xl bg-rose-600 text-white text-sm font-bold shadow-xl shadow-rose-500/20 hover:bg-rose-700 transition-all">
              View Critical Queue
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Reports', val: '42', icon: ShieldAlert, color: 'text-indigo-500' },
           { label: 'Unresolved', val: '12', icon: AlertTriangle, color: 'text-amber-500' },
           { label: 'Resolved Today', val: '28', icon: CheckCircle, color: 'text-emerald-500' },
           { label: 'Avg Resp Time', val: '14m', icon: MessageSquare, color: 'text-slate-500' },
         ].map(kpi => (
           <div key={kpi.label} className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <kpi.icon className={kpi.color} size={24} />
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">24h</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <h3 className="text-2xl font-display font-black mt-1">{kpi.val}</h3>
           </div>
         ))}
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
         <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h4 className="text-xl font-bold">Safety Incident Log</h4>
            <div className="flex items-center space-x-2">
               <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800"><Search size={18} /></button>
               <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800"><Filter size={18} /></button>
            </div>
         </div>
         <div className="p-8 space-y-4">
            {reports.map((rpt, idx) => (
              <motion.div 
                key={rpt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-indigo-500/20 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all group"
              >
                 <div className="flex items-center space-x-6">
                    <div className={`p-4 rounded-2xl ${
                      rpt.severity === 'High' ? 'bg-rose-500/10 text-rose-500' : 
                      rpt.severity === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-100 text-slate-500'
                    }`}>
                       <ShieldAlert size={24} />
                    </div>
                    <div>
                       <div className="flex items-center space-x-3">
                          <h5 className="font-bold text-lg">{rpt.type}</h5>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                            rpt.severity === 'High' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>{rpt.severity}</span>
                       </div>
                       <p className="text-sm text-slate-500 font-medium mt-1">
                          Session: {rpt.user} w/ {rpt.avatar} • {rpt.time}
                       </p>
                    </div>
                 </div>

                 <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="text-right mr-4 hidden sm:block">
                       <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{rpt.status}</p>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all">
                       Review Details
                    </button>
                    <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                       <MoreVertical size={20} />
                    </button>
                 </div>
              </motion.div>
            ))}
         </div>
         <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <button className="text-sm font-bold text-indigo-500 hover:underline">View Historical Incident Database</button>
         </div>
      </div>
    </div>
  );
};

export default AdminModeration;

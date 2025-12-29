
import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, MessageSquare, Clock, User, CheckCircle, Search, Filter, MoreVertical, Mail } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AdminTickets: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const tickets = [
    { id: 'tk_12', subject: 'Credit refill failed', user: 'Mark Robinson', priority: 'High', date: '2m ago', status: 'Open' },
    { id: 'tk_05', subject: 'Avatar pronunciation issue', user: 'Lily Carter', priority: 'Medium', date: '4h ago', status: 'In Progress' },
    { id: 'tk_99', subject: 'Refund request: Session c_42', user: 'Robert Zhang', priority: 'Low', date: '1d ago', status: 'Closed' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64" />
        <div className="space-y-4">
           {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-3xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Support Desk</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage user inquiries, technical issues, and billing escalations.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
              Launch Live Chat
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search by ticket ID or user..." className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-all text-sm" />
         </div>
         <div className="flex p-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
            {['Open', 'Closed', 'All'].map(t => (
              <button key={t} className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${t === 'Open' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>
                 {t}
              </button>
            ))}
         </div>
      </div>

      <div className="space-y-4">
         {tickets.map((tk, idx) => (
           <motion.div 
             key={tk.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: idx * 0.1 }}
             className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
           >
              <div className="flex items-center space-x-6">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                   tk.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-100 text-slate-500'
                 }`}>
                    <Ticket size={28} />
                 </div>
                 <div>
                    <div className="flex items-center space-x-3 mb-1">
                       <h5 className="font-bold text-lg leading-tight">{tk.subject}</h5>
                       <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                         tk.status === 'Open' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                       }`}>{tk.status}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                       <span className="flex items-center space-x-1"><User size={12}/><span>{tk.user}</span></span>
                       <span className="flex items-center space-x-1"><Clock size={12}/><span>{tk.date}</span></span>
                       <span className="flex items-center space-x-1"><Mail size={12}/><span>{tk.id}</span></span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center space-x-3">
                 <button className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-indigo-500/10 hover:text-indigo-600 transition-all flex items-center space-x-2">
                    <MessageSquare size={16} />
                    <span>Open Ticket</span>
                 </button>
                 <button className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <MoreVertical size={20} />
                 </button>
              </div>
           </motion.div>
         ))}
      </div>
      <div className="text-center pt-8">
         <p className="text-sm font-medium text-slate-500">Auto-refreshing every 30s • <span className="text-indigo-500 cursor-pointer hover:underline">Sync Manual</span></p>
      </div>
    </div>
  );
};

export default AdminTickets;

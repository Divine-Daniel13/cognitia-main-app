
import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Plus, Search, Filter, MoreVertical, RefreshCw, Send } from 'lucide-react';

const AdminAnnouncements: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Platform Broadcasts</h1>
          <p className="text-slate-500">Global alerts and system announcements.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-indigo-500/20">
          <Plus size={20} />
          <span>New Broadcast</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input placeholder="Search archives..." className="pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border-none text-sm"/></div>
            <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400"><Filter size={18}/></button>
          </div>
          <button className="p-2.5 text-slate-400 hover:rotate-180 transition-transform"><RefreshCw size={18}/></button>
        </div>
        <div className="p-8 space-y-4">
          {[
            { title: 'V2.4 Deployment', date: 'Just now', target: 'All Users', status: 'Scheduled' },
            { title: 'Maintenance Window', date: '2h ago', target: 'Enterprise', status: 'Live' },
            { title: 'New Avatar Launch', date: '1d ago', target: 'Pro Users', status: 'Completed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center"><Megaphone size={22}/></div>
                <div>
                  <h5 className="font-bold">{item.title}</h5>
                  <p className="text-xs text-slate-500">Sent to {item.target} • {item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${item.status === 'Live' ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>{item.status}</span>
                <MoreVertical size={18} className="text-slate-400 cursor-pointer"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncements;

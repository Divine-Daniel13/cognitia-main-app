
import React from 'react';
import { Bell, Check, Trash2, Clock, Info, AlertTriangle } from 'lucide-react';

const NotificationsPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const alerts = [
    { type: 'info', title: 'New Feature', msg: 'Emotional transcription is now 40% more accurate.', time: '2h ago' },
    { type: 'warning', title: 'Billing Alert', msg: 'Your auto-refill failed. Please check your credit card.', time: '1d ago' },
    { type: 'success', title: 'Session Ready', msg: 'Summary for "Market Strategy" is available for download.', time: '2d ago' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Notifications</h1>
        <div className="flex gap-2">
           <button className="px-4 py-2 text-xs font-bold text-brand-500 hover:bg-brand-500/10 rounded-xl transition-all">Mark all as read</button>
           <button className="p-2 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((a, i) => (
          <div key={i} className="p-6 rounded-[2rem] glass border-slate-200 dark:border-slate-800 flex items-start space-x-6 hover:bg-white dark:hover:bg-slate-900 transition-all">
             <div className={`mt-1 p-3 rounded-2xl ${
               a.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
               a.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
               'bg-brand-500/10 text-brand-500'
             }`}>
                {a.type === 'warning' ? <AlertTriangle size={20}/> : a.type === 'success' ? <Check size={20}/> : <Info size={20}/>}
             </div>
             <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <h4 className="font-bold">{a.title}</h4>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{a.time}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{a.msg}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;

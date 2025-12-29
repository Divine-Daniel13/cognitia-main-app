
import React from 'react';
import { motion } from 'framer-motion';
import { Video, Mic, Calendar, Clock, ArrowRight, Download, Play, MoreVertical } from 'lucide-react';
import { CALL_HISTORY } from '../../constants';
import { Skeleton } from '../Skeleton';

const HistoryPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-10 w-64 mb-10" />
        {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl w-full" />)}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Call History</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review your past sessions and insights.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold flex items-center space-x-2 hover:bg-white dark:hover:bg-slate-900 transition-all">
            <Calendar size={16} />
            <span>Filter by Date</span>
          </button>
          <button className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-sm font-bold hover:opacity-90 transition-all">
            Export All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {CALL_HISTORY.map((call, idx) => (
          <motion.div 
            key={call.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group p-6 rounded-2xl glass border-slate-200 dark:border-slate-800 hover:border-brand-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                call.type === 'video' ? 'bg-brand-500/10 text-brand-500' : 'bg-amber-500/10 text-amber-500'
              }`}>
                {call.type === 'video' ? <Video size={24} /> : <Mic size={24} />}
              </div>
              <div>
                <h4 className="font-bold text-lg">{call.avatarName}</h4>
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{call.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{call.duration}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block mr-4">
                <p className="text-sm font-bold">{call.credits} Credits</p>
                <p className={`text-[10px] uppercase font-black tracking-widest ${call.status === 'completed' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {call.status}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {call.status === 'completed' && (
                  <>
                    <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-all" title="Play Recording">
                      <Play size={18} fill="currentColor" />
                    </button>
                    <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-all" title="Download Summary">
                      <Download size={18} />
                    </button>
                  </>
                )}
                <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-10 text-center">
        <button className="text-sm font-bold text-slate-500 hover:text-brand-500 transition-all">
          Load more history
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;

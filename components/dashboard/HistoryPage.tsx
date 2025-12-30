
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, Calendar, Clock, ArrowRight, Download, Play, MoreVertical, Search, X } from 'lucide-react';
import { CALL_HISTORY } from '../../constants';
import { Skeleton } from '../Skeleton';

const HistoryPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredHistory = CALL_HISTORY.filter(c => 
    c.avatarName.toLowerCase().includes(filterQuery.toLowerCase())
  );

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
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Call History</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review your past sessions and insights.</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input 
              type="text" 
              placeholder="Search avatar..." 
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm" 
             />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2.5 rounded-xl border transition-all ${isFilterOpen ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500'}`}
          >
            <Calendar size={18} />
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-sm font-bold hover:opacity-90 transition-all">
            Export
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-3xl bg-brand-500/5 border border-brand-500/10 mb-8 flex gap-4">
              <div className="flex-1 space-y-2">
                 <p className="text-[10px] font-black uppercase text-brand-600 tracking-widest">Date Range</p>
                 <div className="flex gap-2">
                    <input type="date" className="flex-1 bg-white dark:bg-slate-950 rounded-xl border-none text-sm p-2" />
                    <input type="date" className="flex-1 bg-white dark:bg-slate-950 rounded-xl border-none text-sm p-2" />
                 </div>
              </div>
              <button onClick={() => setIsFilterOpen(false)} className="self-end p-2 rounded-xl bg-brand-600 text-white">Apply</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {filteredHistory.map((call, idx) => (
          <motion.div 
            key={call.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group p-6 rounded-2xl glass border-slate-200 dark:border-slate-800 hover:border-brand-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-6">
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 cursor-pointer hover:scale-110 transition-transform ${
                  call.type === 'video' ? 'bg-brand-500/10 text-brand-500' : 'bg-amber-500/10 text-amber-500'
                }`}
                onClick={() => alert(`Reviewing ${call.type} session with ${call.avatarName}`)}
              >
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
                    <button 
                      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-all" 
                      title="Play Recording"
                      onClick={() => alert('Starting session playback...')}
                    >
                      <Play size={18} fill="currentColor" />
                    </button>
                    <button 
                      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-all" 
                      title="Download Summary"
                      onClick={() => alert('Preparing document for download...')}
                    >
                      <Download size={18} />
                    </button>
                  </>
                )}
                <div className="relative group/more">
                  <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                    <MoreVertical size={18} />
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 w-40 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all z-10">
                     <button className="w-full text-left p-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Report Issue</button>
                     <button className="w-full text-left p-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">Delete Record</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 italic">No history matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;

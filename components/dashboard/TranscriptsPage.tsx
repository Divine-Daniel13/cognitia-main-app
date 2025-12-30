
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Calendar, ChevronRight } from 'lucide-react';

const TranscriptsPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const transcripts = [
    { id: 't1', title: 'Emotional Regulation Session', date: 'May 12, 2024', avatar: 'Dr. Elena Vance', length: '1.2k words' },
    { id: 't2', title: 'Q2 Strategy Brainstorm', date: 'May 08, 2024', avatar: 'Marcus Chen', length: '4.8k words' },
    { id: 't3', title: 'French Conjugation Practice', date: 'May 05, 2024', avatar: 'Sarah Jenkins', length: '850 words' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Transcripts</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Your entire conversation history, text-indexed.</p>
        </div>
        <div className="relative w-full sm:w-64">
           <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input type="text" placeholder="Search keywords..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm" />
        </div>
      </div>

      <div className="grid gap-4">
        {transcripts.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl glass border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center space-x-6">
               <div className="p-3 bg-brand-500/10 text-brand-500 rounded-xl">
                  <FileText size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-lg">{t.title}</h4>
                  <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                     <span className="flex items-center gap-1.5"><Calendar size={12}/>{t.date}</span>
                     <span>•</span>
                     <span>{t.avatar}</span>
                     <span>•</span>
                     <span>{t.length}</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center space-x-2">
               <button className="p-2 text-slate-400 hover:text-brand-500 transition-all"><Download size={20} /></button>
               <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-500 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptsPage;

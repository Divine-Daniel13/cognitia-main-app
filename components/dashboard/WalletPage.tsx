
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowDownLeft, ArrowUpRight, Zap, CreditCard, Clock, ChevronRight } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const WalletPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex gap-8">
           <Skeleton className="h-64 flex-1 rounded-3xl" />
           <Skeleton className="h-64 flex-1 rounded-3xl" />
        </div>
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold">My Wallet</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your credits and subscription billing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl group-hover:bg-brand-500/40 transition-all duration-700" />
          
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Available Balance</p>
              <h2 className="text-5xl font-display font-extrabold flex items-center gap-2">
                1,234 <span className="text-xl text-brand-400">Credits</span>
              </h2>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
              <Zap size={24} className="text-brand-400 fill-current" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex-1 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-500/20">
              <Plus size={20} />
              <span>Buy Credits</span>
            </button>
            <button className="flex-1 py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-bold transition-all border border-white/10">
              Manage Billing
            </button>
          </div>
        </motion.div>

        {/* Subscription Info */}
        <div className="p-10 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800 flex flex-col justify-between">
           <div>
             <div className="flex items-center justify-between mb-8">
               <h4 className="text-xl font-bold">Active Plan</h4>
               <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest">Premium</span>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-slate-500">Next billing date</span>
                   <span className="font-bold">June 14, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-slate-500">Auto-refill credits</span>
                   <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-0.5">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-0.5" />
                   </div>
                </div>
             </div>
           </div>
           <button className="w-full py-4 mt-8 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
             <span>View Subscription Plans</span>
             <ChevronRight size={18} />
           </button>
        </div>
      </div>

      {/* Transactions History */}
      <div className="space-y-6">
        <h4 className="text-xl font-bold">Recent Transactions</h4>
        <div className="space-y-3">
          {[
            { title: 'Credit Purchase', date: 'May 12, 2024', amount: '+500', type: 'in', method: 'Visa **4242' },
            { title: 'Session with Dr. Elena', date: 'May 10, 2024', amount: '-48', type: 'out', method: 'Session ID: c1' },
            { title: 'Session with Marcus Chen', date: 'May 08, 2024', amount: '-60', type: 'out', method: 'Session ID: c2' },
          ].map((tx, idx) => (
            <div key={idx} className="p-4 rounded-2xl glass border-slate-200 dark:border-slate-800 flex items-center justify-between group">
               <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'in' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.type === 'in' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{tx.title}</h5>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{tx.date} • {tx.method}</p>
                  </div>
               </div>
               <span className={`font-bold ${tx.type === 'in' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                 {tx.amount} Cr
               </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;

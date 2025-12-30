
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, TrendingUp, Download, ArrowUpRight, Search, Filter, RefreshCw } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AdminBilling: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const transactions = [
    { id: 'tx_821', user: 'Alice Wonder', amount: '$49.00', type: 'Subscription', date: 'Just now', status: 'Success' },
    { id: 'tx_820', user: 'Mark Robinson', amount: '$12.00', type: 'Credit Refill', date: '12m ago', status: 'Success' },
    { id: 'tx_819', user: 'Lily Carter', amount: '$999.00', type: 'Enterprise Plan', date: '2h ago', status: 'Pending' },
    { id: 'tx_818', user: 'Anon_22', amount: '$15.00', type: 'Credit Refill', date: '4h ago', status: 'Failed' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  if (isLoading) return <div className="p-8"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
         <div>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Financial Fleet Control</h1>
            <p className="text-slate-500">Monitor revenue streams and platform billing health.</p>
         </div>
         <button 
          onClick={() => alert('Generating financial ledger PDF export...')}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center space-x-2 hover:bg-emerald-700 transition-all"
         >
            <Download size={18}/><span>Export Ledger</span>
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Net Revenue', val: '$142,892', change: '+12%', color: 'text-emerald-500' },
           { label: 'Active Subs', val: '4,281', change: '+5%', color: 'text-indigo-500' },
           { label: 'Failed Payments', val: '24', change: '-2%', color: 'text-rose-500' },
           { label: 'Avg Order Val', val: '$52.40', change: '+1%', color: 'text-amber-500' },
         ].map(kpi => (
           <div key={kpi.label} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl group hover:shadow-xl transition-all">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-black">{kpi.val}</h3>
              <span className={`text-[10px] font-black uppercase ${kpi.color}`}>{kpi.change} THIS MONTH</span>
           </div>
         ))}
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
         <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h4 className="text-xl font-bold">Platform Transaction Stream</h4>
            <div className="flex space-x-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search hash..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border-none text-sm" />
              </div>
              <button onClick={() => alert('Search filters triggered')} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"><Filter size={18}/></button>
              <button onClick={handleRefresh} className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-all ${isRefreshing ? 'animate-spin' : ''}`}><RefreshCw size={18}/></button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
               <thead>
                  <tr className="border-b border-slate-50 dark:border-slate-800">
                     <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Transaction ID</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Client Identity</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Type</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Revenue</th>
                     <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                     <th className="px-8 py-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Nexus</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                  {transactions.map((tx, idx) => (
                    <tr key={tx.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                       <td className="px-8 py-5 text-sm font-mono font-bold text-indigo-500">{tx.id}</td>
                       <td className="px-6 py-5 text-sm font-bold">{tx.user}</td>
                       <td className="px-6 py-5 text-sm text-slate-500">{tx.type}</td>
                       <td className="px-6 py-5 text-sm font-black">{tx.amount}</td>
                       <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${tx.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : tx.status === 'Failed' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>{tx.status}</span>
                       </td>
                       <td className="px-8 py-5 text-right"><ArrowUpRight size={18} onClick={() => alert(`Reviewing transaction hash ${tx.id} on chain...`)} className="text-slate-300 group-hover:text-indigo-500 transition-colors cursor-pointer ml-auto"/></td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminBilling;

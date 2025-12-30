
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart4, TrendingUp, PieChart, Users, Globe, Download, RefreshCw } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const AdminAnalytics: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  if (isLoading) return <div className="p-8"><Skeleton className="h-[500px] w-full rounded-[3rem]" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Platform Intelligence</h1>
          <p className="text-slate-500">Deep behavioral analytics and growth metrics.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleRefresh} className={`p-3 rounded-xl border border-slate-200 dark:border-slate-800 transition-all ${isRefreshing ? 'animate-spin text-indigo-500' : ''}`}>
            <RefreshCw size={20} />
          </button>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <Download size={18} />
            <span>Full Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm">
          <div className="flex justify-between mb-10">
            <h4 className="text-xl font-bold">User Acquisition Density</h4>
            <div className="flex items-center gap-2 text-emerald-500 font-bold"><TrendingUp size={16}/><span>+22%</span></div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
            {[40, 70, 45, 90, 65, 80, 55, 70, 40, 85, 95, 60].map((h, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-indigo-500/20 rounded-t-xl relative group">
                <div className="absolute inset-0 bg-indigo-600 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="p-10 bg-indigo-900 text-white rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl" />
          <PieChart size={40} className="text-indigo-300 mb-6" />
          <h4 className="text-2xl font-bold mb-2">Category Mix</h4>
          <p className="text-indigo-200 text-sm mb-8">User distribution by professional domain.</p>
          <div className="space-y-4">
            {['Psychology', 'Business', 'Language', 'Tech'].map((cat, i) => (
              <div key={cat} className="flex justify-between items-center">
                <span className="text-sm opacity-60">{cat}</span>
                <span className="font-bold">{[42, 28, 15, 15][i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;


import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, Heart, ArrowUpRight, Phone } from 'lucide-react';
import { Skeleton } from '../Skeleton';
import { AVATARS } from '../../constants';

interface DashboardOverviewProps {
  isLoading: boolean;
  onNavigate: (tab: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ isLoading, onNavigate }) => {
  const stats = [
    { label: 'Remaining Credits', value: '1,234', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Total Calls', value: '42', icon: Phone, color: 'text-brand-500', bg: 'bg-brand-500/10' },
    { label: 'Minutes Consulted', value: '856', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Growth Rating', value: '+12%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-3xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-[400px] rounded-[2.5rem]" />
          <Skeleton className="h-[400px] rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Welcome back, Michael 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Ready for your next breakthrough session?</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('call')}
          className="px-8 py-3.5 rounded-2xl bg-brand-600 text-white font-bold shadow-xl shadow-brand-500/20 hover:bg-brand-700 transition-all flex items-center justify-center space-x-2"
        >
          <Zap size={20} className="fill-current" />
          <span>Start New Call</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl glass border-slate-200 dark:border-slate-800"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Analytics Preview */}
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-xl font-bold">Usage Analytics</h4>
            <select className="bg-transparent text-sm font-bold border-none focus:ring-0 cursor-pointer text-slate-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between px-2">
            {[60, 40, 90, 70, 45, 80, 55].map((h, i) => (
              <div key={i} className="flex flex-col items-center space-y-4 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-10 bg-gradient-to-t from-brand-600 to-accent-teal rounded-t-xl relative"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}m
                  </div>
                </motion.div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Avatars */}
        <div className="p-8 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold">Favorite Experts</h4>
            <button className="text-brand-500 hover:text-brand-400 transition-colors">
              <Heart size={20} />
            </button>
          </div>

          <div className="space-y-6 flex-1">
            {AVATARS.slice(0, 3).map((avatar) => (
              <div key={avatar.id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img src={avatar.image} alt={avatar.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/10 group-hover:ring-brand-500/40 transition-all" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-950"></div>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{avatar.name}</h5>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{avatar.profession}</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => onNavigate('call')}
                  className="p-2 text-slate-400 hover:text-brand-500 transition-colors"
                >
                  <ArrowUpRight size={20} />
                </motion.button>
              </div>
            ))}
          </div>

          <motion.button 
            whileHover={{ y: -2 }}
            onClick={() => onNavigate('avatars')}
            className="w-full py-4 mt-8 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-sm hover:text-brand-500 transition-all"
          >
            Manage Favorites
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;


import React from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MoreHorizontal, UserCheck, UserX, ExternalLink, Download } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const UserManagement: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const users = [
    { id: '1', name: 'Michael Robinson', email: 'm.robin@gmail.com', plan: 'Pro', credits: '1,234', status: 'Active', joined: 'Mar 12, 2024' },
    { id: '2', name: 'Lily Carter', email: 'lily.c@dev.io', plan: 'Enterprise', credits: '45,000', status: 'Active', joined: 'Jan 05, 2024' },
    { id: '3', name: 'Jonathan Miller', email: 'j.miller@tech.com', plan: 'Free', credits: '30', status: 'Suspended', joined: 'Feb 18, 2024' },
    { id: '4', name: 'Robert Zhang', email: 'rob.z@venture.net', plan: 'Pro', credits: '890', status: 'Active', joined: 'May 02, 2024' },
    { id: '5', name: 'Sarah Jenkins', email: 's.jenkins@edu.org', plan: 'Free', credits: '15', status: 'Pending', joined: 'Apr 24, 2024' },
    { id: '6', name: 'Aiden Reed', email: 'aiden@arch.io', plan: 'Pro', credits: '2,500', status: 'Active', joined: 'Dec 20, 2023' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <div className="space-y-4">
          {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage, moderate, and monitor platform accounts.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
             <Download size={20} />
          </button>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
             + Create New User
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
           <input 
             type="text" 
             placeholder="Search by name, email, or user ID..." 
             className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-all"
           />
        </div>
        <button className="px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-2 font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
           <SlidersHorizontal size={20} />
           <span>Filters</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">User</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Plan</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Credits</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Joined</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {users.map((user, idx) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                       <img src={`https://i.pravatar.cc/100?u=${user.id}`} className="w-10 h-10 rounded-xl object-cover" />
                       <div>
                          <p className="text-sm font-bold">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      user.plan === 'Enterprise' ? 'bg-indigo-500/10 text-indigo-500' : 
                      user.plan === 'Pro' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-sm font-bold">{user.credits}</td>
                  <td className="px-6 py-5 text-sm text-slate-500">{user.joined}</td>
                  <td className="px-6 py-5">
                     <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 
                          user.status === 'Suspended' ? 'bg-rose-500' : 'bg-amber-500'
                        }`} />
                        <span className="text-xs font-bold">{user.status}</span>
                     </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors" title="View Details">
                          <ExternalLink size={18} />
                       </button>
                       <button className={`p-2 transition-colors ${user.status === 'Suspended' ? 'text-emerald-500 hover:text-emerald-400' : 'text-slate-400 hover:text-rose-500'}`} title={user.status === 'Suspended' ? 'Activate' : 'Suspend'}>
                          {user.status === 'Suspended' ? <UserCheck size={18} /> : <UserX size={18} />}
                       </button>
                       <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                          <MoreHorizontal size={18} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <p className="text-sm text-slate-500 font-medium">Showing 1 to 6 of 14,291 entries</p>
           <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold opacity-50 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20">1</button>
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-bold">2</button>
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-bold">3</button>
              <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

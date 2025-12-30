
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added Settings to the import list from lucide-react
import { User, Bell, Lock, Globe, Shield, CreditCard, ChevronRight, X, Camera, Save, ArrowLeft, Settings } from 'lucide-react';

const SettingsPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [activeSubView, setActiveSubView] = useState<string | null>(null);

  const sections = [
    { id: 'profile', title: 'Account Profile', desc: 'Personal info, avatar, and public presence.', icon: User },
    { id: 'security', title: 'Security & Auth', desc: 'Magic links, 2FA, and session management.', icon: Lock },
    { id: 'notifications', title: 'Notifications', desc: 'Email, push, and in-app alert preferences.', icon: Bell },
    { id: 'language', title: 'Language & Region', desc: 'Select your default consultation languages.', icon: Globe },
    { id: 'privacy', title: 'Privacy Settings', desc: 'Control your data and transcript storage.', icon: Shield },
    { id: 'billing', title: 'Billing & Payments', desc: 'Manage methods and transaction history.', icon: CreditCard },
  ];

  const handleEditProfile = () => setActiveSubView('profile');

  const renderSubView = () => {
    switch (activeSubView) {
      case 'profile':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between">
                <button onClick={() => setActiveSubView(null)} className="flex items-center space-x-2 text-slate-500 font-bold text-sm"><ArrowLeft size={16}/><span>Back</span></button>
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <div className="w-10"/>
             </div>
             <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                   <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-32 h-32 rounded-full object-cover border-4 border-brand-500/20" />
                   <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"><Camera className="text-white"/></button>
                </div>
                <p className="text-xs font-bold text-brand-500 uppercase tracking-widest">Change Photo</p>
             </div>
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400">First Name</label><input defaultValue="Michael" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border-none text-sm font-medium" /></div>
                   <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400">Last Name</label><input defaultValue="Scott" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border-none text-sm font-medium" /></div>
                </div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400">Email Address</label><input defaultValue="m.scott@dundermifflin.com" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border-none text-sm font-medium" /></div>
             </div>
             <button onClick={() => setActiveSubView(null)} className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-xl shadow-brand-500/20 flex items-center justify-center space-x-2"><Save size={18}/><span>Save Profile</span></button>
          </div>
        );
      default:
        return (
          <div className="text-center py-20 animate-in fade-in duration-500">
             <div className="w-20 h-20 bg-brand-500/10 text-brand-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Settings className="animate-spin-slow" size={40}/>
             </div>
             <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{activeSubView?.replace('-', ' ')} Settings</h3>
             <p className="text-slate-500 mb-8 max-w-xs mx-auto">This configuration module is syncing with the Cognitia cloud infrastructure.</p>
             <button onClick={() => setActiveSubView(null)} className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl font-bold">Return to Settings</button>
          </div>
        );
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      <AnimatePresence mode="wait">
        {!activeSubView ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
            <div className="flex items-center space-x-6">
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-brand-500/10 shadow-2xl" />
               <div className="flex-1">
                  <h1 className="text-3xl font-display font-bold">Michael Scott</h1>
                  <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-1">Dunder Mifflin Inc. • Scranton Branch</p>
               </div>
               <button onClick={handleEditProfile} className="px-6 py-3 rounded-xl bg-brand-600 text-white text-sm font-bold shadow-lg shadow-brand-500/20 hover:scale-105 transition-transform">Edit Profile</button>
            </div>

            <div className="grid gap-4">
              {sections.map((sec, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveSubView(sec.id)}
                  className="group p-6 rounded-2xl glass border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-brand-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
                >
                   <div className="flex items-center space-x-6">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-brand-500/10 transition-colors">
                         <sec.icon size={22} className="text-slate-500 group-hover:text-brand-500 transition-colors" />
                      </div>
                      <div>
                         <h4 className="font-bold">{sec.title}</h4>
                         <p className="text-sm text-slate-500 mt-0.5">{sec.desc}</p>
                      </div>
                   </div>
                   <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
               <p className="text-sm text-slate-500">Need to delete your account? <button onClick={() => { if(confirm('Are you sure you want to delete your Cognitia ID? This is permanent.')) alert('Identity marked for deletion.'); }} className="text-red-500 font-bold hover:underline">Click here</button></p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="subview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl">
             {renderSubView()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage;

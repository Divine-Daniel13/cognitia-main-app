
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, ShieldCheck, Activity, DollarSign, Globe, Database, 
  Settings, Terminal, Edit3, LogOut, Sparkles, Menu, X, Search, Bell, Sun, 
  Moon, Zap, Lock, Cpu, RefreshCw, Code, ChevronDown, User, CreditCard, 
  ShieldAlert, Layers, Share2, TerminalSquare
} from 'lucide-react';
import SidebarItem from '../dashboard/SidebarItem';
import SuperOverview from './SuperOverview';
import LandingEditor from './LandingEditor';
import SystemConfig from './SystemConfig';
import SuperUserRegistry from './SuperUserRegistry';
import SuperAdminFleet from './SuperAdminFleet';
import SuperSessionControl from './SuperSessionControl';
import SuperRevenue from './SuperRevenue';
import SuperAvatarControl from './SuperAvatarControl';
import SuperAnalytics from './SuperAnalytics';

interface SuperAdminDashboardLayoutProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onExitDashboard: () => void;
}

const SuperAdminDashboardLayout: React.FC<SuperAdminDashboardLayoutProps> = ({ theme, toggleTheme, onExitDashboard }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setIsNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navGroups = [
    {
      group: 'Oversight',
      items: [
        { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
        { id: 'users', label: 'User Registry', icon: Users },
        { id: 'admins', label: 'Admin Fleet', icon: ShieldCheck },
        { id: 'sessions', label: 'Call Oversight', icon: Activity },
      ]
    },
    {
      group: 'Growth & Ops',
      items: [
        { id: 'revenue', label: 'Revenue & Billing', icon: DollarSign },
        { id: 'analytics', label: 'Deep Analytics', icon: Globe },
        { id: 'avatars', label: 'Avatar Control', icon: Cpu },
      ]
    },
    {
      group: 'Platform Builder',
      items: [
        { id: 'pages', label: 'Page Builder', icon: Code },
        { id: 'landing', label: 'Landing Editor', icon: Edit3 },
      ]
    },
    {
      group: 'Core System',
      items: [
        { id: 'config', label: 'System Config', icon: Settings },
        { id: 'security', label: 'Security & RBAC', icon: Lock },
        { id: 'audit', label: 'Audit Trails', icon: Terminal },
        { id: 'testing', label: 'CI/CD & Rolls', icon: RefreshCw },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <SuperOverview isLoading={isLoading} />;
      case 'users': return <SuperUserRegistry isLoading={isLoading} />;
      case 'admins': return <SuperAdminFleet isLoading={isLoading} />;
      case 'sessions': return <SuperSessionControl isLoading={isLoading} />;
      case 'revenue': return <SuperRevenue isLoading={isLoading} />;
      case 'analytics': return <SuperAnalytics isLoading={isLoading} />;
      case 'avatars': return <SuperAvatarControl isLoading={isLoading} />;
      case 'landing': return <LandingEditor isLoading={isLoading} />;
      case 'config': return <SystemConfig isLoading={isLoading} />;
      // Fallback for system modules with heavy dummy data
      case 'pages':
      case 'security':
      case 'audit':
      case 'testing':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex justify-between items-center">
                <div>
                   <h1 className="text-3xl font-display font-black uppercase tracking-tighter">{activeTab.replace(/([A-Z])/g, ' $1').trim()} Control</h1>
                   <p className="text-slate-500 font-medium">Root level terminal for {activeTab} operations.</p>
                </div>
                <div className="flex space-x-2">
                   <button className="p-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20"><TerminalSquare size={20}/></button>
                   <button className="p-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20"><Share2 size={20}/></button>
                </div>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/10 rounded-[3rem] shadow-sm">
                   <div className="flex items-center space-x-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg"><Layers size={24}/></div>
                      <h4 className="text-xl font-bold uppercase tracking-tight">Active State Sync</h4>
                   </div>
                   <div className="space-y-6">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                           <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-sm font-bold">NODE_STREAM_0{i}</span>
                           </div>
                           <span className="text-[10px] font-black text-slate-400">ENCRYPTED_SSL</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-3xl" />
                   <h4 className="text-xl font-display font-black uppercase tracking-tighter mb-8">Terminal Output</h4>
                   <div className="font-mono text-xs text-purple-300/80 space-y-2">
                      <p className="flex items-center space-x-2"><span className="text-emerald-500">>>></span><span>Initializing system v3.4.1...</span></p>
                      <p className="flex items-center space-x-2"><span className="text-emerald-500">>>></span><span>Root authorization level 7 detected.</span></p>
                      <p className="flex items-center space-x-2"><span className="text-emerald-500">>>></span><span>Syncing global cluster shards...</span></p>
                      <p className="flex items-center space-x-2"><span className="text-emerald-500">>>></span><span>Accessing {activeTab} reservoir...</span></p>
                      <div className="pt-4 flex space-x-4">
                         <div className="h-1 w-12 bg-purple-500/40 rounded-full overflow-hidden">
                            <motion.div animate={{x: [-48, 48]}} transition={{repeat: Infinity, duration: 1.5}} className="h-full w-full bg-purple-400" />
                         </div>
                         <div className="h-1 w-24 bg-purple-500/40 rounded-full overflow-hidden">
                            <motion.div animate={{x: [-96, 96]}} transition={{repeat: Infinity, duration: 2.5}} className="h-full w-full bg-purple-400" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFCFE] dark:bg-[#020617] overflow-hidden">
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 300 : 80 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-950 border-r border-purple-500/10 shadow-2xl transition-all duration-500 z-[60]"
      >
        <div className="p-8 flex items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-500/30 rotate-12">
              <ShieldCheck size={20} className="text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xl font-black font-display tracking-tighter leading-none uppercase">Cognitia</span>
                <span className="text-[10px] font-black uppercase text-purple-600 tracking-[0.3em] mt-1">SuperAdmin</span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar no-scrollbar py-6">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-2">
              {isSidebarOpen && (
                <p className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => (
                <SidebarItem 
                  key={item.id}
                  {...item}
                  isOpen={isSidebarOpen}
                  isActive={activeTab === item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsLoading(true);
                  }}
                  className={activeTab === item.id ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : ''}
                />
              ))}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-purple-500/10">
          <SidebarItem 
            id="logout" 
            label="Eject Dashboard" 
            icon={LogOut} 
            isOpen={isSidebarOpen} 
            onClick={onExitDashboard}
            className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10"
          />
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        <header className="h-24 flex items-center justify-between px-4 lg:px-10 bg-white/60 dark:bg-slate-950/60 backdrop-blur-3xl border-b border-purple-500/10 z-50">
          <div className="flex items-center space-x-6 flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="p-3 lg:hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center space-x-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-purple-500/20 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cluster: Stable</span>
            </div>
            <div className="hidden lg:flex items-center max-w-lg w-full relative group">
              <Search className="absolute left-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Query global platform state..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/10 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-medium text-sm"
              />
              <div className="absolute right-4 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-400">⌘K</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-105 transition-all text-slate-500">
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-105 transition-all relative"
              >
                <Bell size={22} className="text-slate-500" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-purple-600 rounded-full ring-2 ring-white dark:ring-slate-950 animate-pulse"></span>
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-96 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden py-8 z-[100]"
                  >
                    <div className="px-8 pb-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                       <h3 className="text-xl font-display font-black uppercase tracking-tighter">System Alerts</h3>
                       <button className="text-[10px] font-black uppercase text-purple-600 tracking-widest">Clear All</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                       {[
                         { title: 'Inference Node Asia-1', desc: 'Critical load reached. Auto-scaling initiated.', type: 'critical', time: '2m ago' },
                         { title: 'Security Protocol Breach', desc: 'Admin account Sarah attempted root access.', type: 'warning', time: '14m ago' },
                         { title: 'Revenue Target Hit', desc: 'Platform hit $5M ARR goal.', type: 'success', time: '1h ago' },
                       ].map((notif, i) => (
                         <div key={i} className="px-8 py-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-none">
                            <div className="flex items-center space-x-3 mb-2">
                               <div className={`w-2 h-2 rounded-full ${notif.type === 'critical' ? 'bg-rose-500' : notif.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                               <span className="text-sm font-bold">{notif.title}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed mb-2">{notif.desc}</p>
                            <span className="text-[10px] font-black uppercase text-slate-400">{notif.time}</span>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={profileRef}>
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 cursor-pointer group p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=superadmin" className="w-12 h-12 rounded-2xl object-cover ring-4 ring-purple-500/10 group-hover:ring-purple-500/30 transition-all" />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-slate-900 dark:bg-purple-600 border-2 border-white dark:border-slate-950">
                    <Zap size={10} className="text-white fill-current" />
                  </div>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-72 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden py-4 z-[100]"
                  >
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                       <p className="text-sm font-black uppercase tracking-tighter">Root Master</p>
                       <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Clearance Level 7</p>
                    </div>
                    <div className="p-2">
                       <button className="w-full flex items-center space-x-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                          <User size={18} className="text-slate-400" />
                          <span className="text-sm font-bold">Root Profile</span>
                       </button>
                       <button className="w-full flex items-center space-x-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                          <Settings size={18} className="text-slate-400" />
                          <span className="text-sm font-bold">Master Settings</span>
                       </button>
                       <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4 my-2" />
                       <button 
                        onClick={onExitDashboard}
                        className="w-full flex items-center space-x-4 px-6 py-3 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-500 rounded-2xl transition-colors"
                       >
                          <LogOut size={18} />
                          <span className="text-sm font-bold">Eject Session</span>
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isLoading ? '-loading' : '')}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg z-[100] lg:hidden" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white dark:bg-slate-950 z-[110] lg:hidden p-8 flex flex-col shadow-2xl" >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg"><ShieldCheck size={20} className="text-white" /></div>
                  <span className="text-2xl font-black font-display tracking-tighter uppercase">Root</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900"><X size={24} /></button>
              </div>
              <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
                {navGroups.map((group) => (
                  <div key={group.group} className="space-y-2">
                    <p className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">{group.group}</p>
                    {group.items.map((item) => (
                      <SidebarItem key={item.id} {...item} isOpen={true} isActive={activeTab === item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); setIsLoading(true); }} className={activeTab === item.id ? 'bg-purple-500/10 text-purple-600' : ''} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                 <SidebarItem id="logout" label="Sign Out Root" icon={LogOut} isOpen={true} onClick={onExitDashboard} className="text-rose-500" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminDashboardLayout;

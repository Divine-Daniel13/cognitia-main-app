
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Activity, 
  DollarSign, 
  Globe, 
  Database, 
  Settings, 
  Terminal, 
  AlertTriangle, 
  Edit3, 
  LogOut,
  Sparkles,
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  Zap,
  Lock,
  Cpu,
  RefreshCw,
  Code
} from 'lucide-react';
import SidebarItem from '../dashboard/SidebarItem';
import SuperOverview from './SuperOverview';
import LandingEditor from './LandingEditor';
import SystemConfig from './SystemConfig';

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [activeTab]);

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
      case 'landing': return <LandingEditor isLoading={isLoading} />;
      case 'config': return <SystemConfig isLoading={isLoading} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-6">
          <div className="p-8 rounded-[3rem] bg-purple-500/5 border border-purple-500/20">
             <AlertTriangle size={64} className="text-purple-500 animate-pulse mb-6 mx-auto" />
             <h3 className="text-2xl font-display font-black text-center text-slate-900 dark:text-white uppercase tracking-tighter">SuperModule Restricted</h3>
             <p className="max-w-xs text-center text-sm font-medium mt-2 leading-relaxed">
               The <span className="text-purple-500 font-bold">{activeTab.toUpperCase()}</span> system is awaiting frontend sync with SuperAdmin Core v3.0.
             </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFCFE] dark:bg-[#020617] overflow-hidden">
      {/* SuperSidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 300 : 80 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-950 border-r border-purple-500/10 shadow-2xl transition-all duration-500 z-[60]"
      >
        <div className="p-8 flex items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-500/30 rotate-12">
              <ShieldCheck size={20} className="text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xl font-black font-display tracking-tighter leading-none">COGNITIA</span>
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

      {/* Main Mission Control */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Particle Overlay for "High Tech" feel */}
        <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        {/* SuperTopbar */}
        <header className="h-24 flex items-center justify-between px-4 lg:px-10 bg-white/60 dark:bg-slate-950/60 backdrop-blur-3xl border-b border-purple-500/10 z-50">
          <div className="flex items-center space-x-6 flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="p-3 lg:hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center space-x-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-purple-500/20 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Services: Stable</span>
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
            
            <div className="hidden xl:flex flex-col items-end pr-4 border-r border-slate-200 dark:border-slate-800">
               <p className="text-sm font-black tracking-tighter">SUPER ADMIN</p>
               <p className="text-[9px] font-black text-purple-500 uppercase tracking-widest">Root Authority Level 7</p>
            </div>

            <div className="flex items-center space-x-3 cursor-pointer group p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">
              <div className="relative">
                <img src="https://i.pravatar.cc/150?u=superadmin" className="w-12 h-12 rounded-2xl object-cover ring-4 ring-purple-500/10 group-hover:ring-purple-500/30 transition-all" />
                <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-slate-900 dark:bg-purple-600 border-2 border-white dark:border-slate-950">
                  <Zap size={10} className="text-white fill-current" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Port */}
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

      {/* SuperMobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white dark:bg-slate-950 z-[110] lg:hidden p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg">
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                  <span className="text-2xl font-black font-display tracking-tighter">ROOT ACCESS</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
                {navGroups.map((group) => (
                  <div key={group.group} className="space-y-2">
                    <p className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">{group.group}</p>
                    {group.items.map((item) => (
                      <SidebarItem 
                        key={item.id}
                        {...item}
                        isOpen={true}
                        isActive={activeTab === item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                          setIsLoading(true);
                        }}
                        className={activeTab === item.id ? 'bg-purple-500/10 text-purple-600' : ''}
                      />
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

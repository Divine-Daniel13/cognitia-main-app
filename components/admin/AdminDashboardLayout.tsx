
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, UserPlus, PhoneIncoming, Image as ImageIcon, 
  CreditCard, BarChart4, ShieldAlert, Megaphone, MessageSquareQuote, 
  Settings2, Ticket, ListTodo, LogOut, Menu, X, Search, Bell, Sun, Moon, 
  ChevronRight, Globe, Sparkles, ChevronDown, User, Settings, FolderOpen, PieChart
} from 'lucide-react';
import SidebarItem from '../dashboard/SidebarItem';
import AdminOverview from './AdminOverview';
import UserManagement from './UserManagement';
import AvatarAdmin from './AvatarAdmin';
import AdminCalls from './AdminCalls';
import AdminModeration from './AdminModeration';
import AdminTickets from './AdminTickets';
import AdminBilling from './AdminBilling';
import AdminContent from './AdminContent';
import AdminAnalytics from './AdminAnalytics';
import AdminAnnouncements from './AdminAnnouncements';

interface AdminDashboardLayoutProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onExitDashboard: () => void;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ theme, toggleTheme, onExitDashboard }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
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

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'avatars', label: 'AI Avatars', icon: UserPlus },
    { id: 'calls', label: 'Calls', icon: PhoneIncoming },
    { id: 'content', label: 'Visual Aids', icon: ImageIcon },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'reports', label: 'Analytics', icon: BarChart4 },
    { id: 'moderation', label: 'Moderation', icon: ShieldAlert },
    { id: 'notifs', label: 'Announcements', icon: Megaphone },
    { id: 'feedback', label: 'Reviews', icon: MessageSquareQuote },
    { id: 'support', label: 'Tickets', icon: Ticket },
    { id: 'logs', label: 'Activity Logs', icon: ListTodo },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview isLoading={isLoading} />;
      case 'users': return <UserManagement isLoading={isLoading} />;
      case 'avatars': return <AvatarAdmin isLoading={isLoading} />;
      case 'calls': return <AdminCalls isLoading={isLoading} />;
      case 'content': return <AdminContent isLoading={isLoading} />;
      case 'billing': return <AdminBilling isLoading={isLoading} />;
      case 'moderation': return <AdminModeration isLoading={isLoading} />;
      case 'support': return <AdminTickets isLoading={isLoading} />;
      case 'reports': return <AdminAnalytics isLoading={isLoading} />;
      case 'notifs': return <AdminAnnouncements isLoading={isLoading} />;
      // Placeholders for remaining heavy-data views
      case 'feedback':
      case 'logs':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="flex justify-between items-center">
                <h1 className="text-3xl font-display font-bold uppercase tracking-tight">{activeTab} Terminal</h1>
                <div className="flex space-x-2">
                   <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 uppercase tracking-widest">Refresh Feed</button>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center mb-6"><PieChart size={24}/></div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Metric_0{i}</p>
                     <h3 className="text-2xl font-black">94.2%</h3>
                  </div>
                ))}
             </div>
             <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10">
                <div className="flex items-center space-x-4 mb-10 text-indigo-500">
                   <FolderOpen size={24} />
                   <h4 className="text-xl font-bold">Data Shard History</h4>
                </div>
                <div className="space-y-4">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                        <div className="flex items-center space-x-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                           <span className="text-sm font-bold">EVENT_LOG_X{i*239}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">2024-05-{i+10}T14:22:01Z</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-slate-100">
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-50 shadow-sm"
      >
        <div className="p-6 flex items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3">
              <Sparkles size={16} className="text-white" />
            </div>
            {isSidebarOpen && <span className="text-xl font-bold font-display whitespace-nowrap">AdminHub</span>}
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <ChevronRight size={18} className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-4">
           {navItems.map((item) => (
            <SidebarItem key={item.id} {...item} isOpen={isSidebarOpen} isActive={activeTab === item.id} onClick={() => { setActiveTab(item.id); setIsLoading(true); }} className={activeTab === item.id ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold' : ''} />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <SidebarItem id="logout" label="Exit Admin" icon={LogOut} isOpen={isSidebarOpen} onClick={onExitDashboard} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10" />
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-50">
           <div className="flex items-center space-x-4 flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 lg:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900">
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center max-w-md w-full relative group">
              <Search className="absolute left-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input type="text" placeholder="Global admin search..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-all text-sm font-medium" />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative" ref={notifRef}>
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-all" >
                <Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              </button>
              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-4 w-80 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-6 z-[100]" >
                    <div className="px-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center"><h4 className="text-sm font-bold uppercase tracking-widest">Notifications</h4><span className="text-[10px] text-indigo-600 font-bold">3 New</span></div>
                    <div className="max-h-64 overflow-y-auto no-scrollbar">
                       {[{ msg: 'New Pro registration', time: '2m ago' }, { msg: 'Server node scale-up', time: '1h ago' }, { msg: 'Weekly billing ready', time: '4h ago' }].map((n, i) => (
                         <div key={i} className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"><p className="text-xs font-medium">{n.msg}</p><p className="text-[10px] text-slate-400 mt-1">{n.time}</p></div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative" ref={profileRef}>
              <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-3 cursor-pointer group p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all" >
                <img src="https://i.pravatar.cc/150?u=admin" className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/10 group-hover:ring-indigo-500/40 transition-all" />
                <div className="hidden md:block text-left"><p className="text-sm font-bold">Admin Sarah</p><p className="text-[10px] font-black uppercase text-indigo-500 tracking-tighter">Fleet Command</p></div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-4 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-3 z-[100]" >
                    <button className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"><User size={16} className="text-slate-400" /><span className="text-sm font-medium">My Account</span></button>
                    <button className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"><Settings size={16} className="text-slate-400" /><span className="text-sm font-medium">Dashboard Prefs</span></button>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" /><button onClick={onExitDashboard} className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 transition-colors text-left"><LogOut size={16} /><span className="text-sm font-medium">Sign Out</span></button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
           <AnimatePresence mode="wait">
            <motion.div key={activeTab + (isLoading ? '-loading' : '')} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4, ease: "easeOut" }} className="h-full" >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white dark:bg-slate-950 z-[70] lg:hidden p-6 flex flex-col shadow-2xl" >
              <div className="flex items-center justify-between mb-10"><div className="flex items-center space-x-2"><div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><Sparkles size={16} className="text-white" /></div><span className="text-xl font-bold font-display uppercase tracking-tight">AdminHub</span></div><button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button></div>
              <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">{navItems.map((item) => ( <SidebarItem key={item.id} {...item} isOpen={true} isActive={activeTab === item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); setIsLoading(true); }} className={activeTab === item.id ? 'bg-indigo-500/10 text-indigo-600 font-bold' : ''} /> ))}</div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800"><SidebarItem id="logout" label="Exit Admin" icon={LogOut} isOpen={true} onClick={onExitDashboard} className="text-red-500" /></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardLayout;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  PhoneIncoming, 
  Image as ImageIcon, 
  CreditCard, 
  BarChart4, 
  ShieldAlert, 
  Megaphone, 
  MessageSquareQuote, 
  Settings2, 
  Ticket, 
  ListTodo, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  ChevronRight,
  Globe,
  Sparkles
} from 'lucide-react';
import SidebarItem from '../dashboard/SidebarItem';
import AdminOverview from './AdminOverview';
import UserManagement from './UserManagement';
import AvatarAdmin from './AvatarAdmin';

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [activeTab]);

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
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
          <Settings2 size={48} className="animate-spin-slow opacity-20" />
          <p className="font-medium">Admin Module: {activeTab.toUpperCase()} is under construction.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-3 shrink-0">
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
            <SidebarItem 
              key={item.id}
              {...item}
              isOpen={isSidebarOpen}
              isActive={activeTab === item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsLoading(true);
              }}
              className={activeTab === item.id ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : ''}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <SidebarItem 
            id="logout" 
            label="Exit Admin" 
            icon={LogOut} 
            isOpen={isSidebarOpen} 
            onClick={onExitDashboard}
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
          />
        </div>
      </motion.aside>

      {/* Main UI */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-50">
           <div className="flex items-center space-x-4 flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 lg:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center max-w-md w-full relative">
              <Search className="absolute left-3 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Global admin search..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="hidden xl:flex items-center space-x-6 mr-4 border-r border-slate-200 dark:border-slate-800 pr-6">
               <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Active Sessions</p>
                  <p className="text-sm font-bold text-emerald-500">1,242 Live</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Platform Health</p>
                  <p className="text-sm font-bold text-indigo-500">99.9% Up</p>
               </div>
            </div>

            <button onClick={toggleTheme} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
            </button>
            
            <div className="flex items-center space-x-3 cursor-pointer group">
              <img src="https://i.pravatar.cc/150?u=admin" className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/10 group-hover:ring-indigo-500/40 transition-all" />
              <div className="hidden md:block">
                <p className="text-sm font-bold">Admin Sarah</p>
                <p className="text-[10px] font-black uppercase text-indigo-500 tracking-tighter">Level 2 Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
           <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isLoading ? '-loading' : '')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Drawer (Admin) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white dark:bg-slate-950 z-[70] lg:hidden p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <span className="text-xl font-bold font-display">Cognitia Admin</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                {navItems.map((item) => (
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
                    className={activeTab === item.id ? 'bg-indigo-500/10 text-indigo-600' : ''}
                  />
                ))}
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                 <SidebarItem id="logout" label="Exit Admin" icon={LogOut} isOpen={true} onClick={onExitDashboard} className="text-red-500" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardLayout;

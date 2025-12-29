
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  History, 
  FileText, 
  BarChart, 
  Wallet, 
  CreditCard, 
  Heart, 
  Bell, 
  Settings, 
  LogOut, 
  HelpCircle,
  Search,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import TopBar from './TopBar';
import DashboardOverview from './DashboardOverview';
import AvatarsPage from './AvatarsPage';
import LiveCall from './LiveCall';
import HistoryPage from './HistoryPage';
import AnalyticsPage from './AnalyticsPage';
import WalletPage from './WalletPage';

interface DashboardLayoutProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onExitDashboard: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ theme, toggleTheme, onExitDashboard }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'avatars', label: 'AI Avatars', icon: Users },
    { id: 'call', label: 'Start a Call', icon: PhoneCall },
    { id: 'history', label: 'Call History', icon: History },
    { id: 'transcripts', label: 'Transcripts', icon: FileText, premium: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart, premium: true },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  const bottomNav = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview isLoading={isLoading} onNavigate={setActiveTab} />;
      case 'avatars': return <AvatarsPage isLoading={isLoading} onCall={() => setActiveTab('call')} />;
      case 'call': return <LiveCall onEnd={() => setActiveTab('dashboard')} />;
      case 'history': return <HistoryPage isLoading={isLoading} />;
      case 'analytics': return <AnalyticsPage isLoading={isLoading} />;
      case 'wallet': return <WalletPage isLoading={isLoading} />;
      default: return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <p>Feature coming soon in Cognitia v2.0</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] overflow-hidden">
      {/* Sidebar Desktop */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            {isSidebarOpen && <span className="text-xl font-bold font-display whitespace-nowrap">Cognitia</span>}
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <ChevronRight size={18} className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => (
            <SidebarItem 
              key={item.id}
              {...item}
              isOpen={isSidebarOpen}
              isActive={activeTab === item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsLoading(true);
              }}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
          {bottomNav.map((item) => (
            <SidebarItem 
              key={item.id}
              {...item}
              isOpen={isSidebarOpen}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
          <SidebarItem 
            id="logout" 
            label="Logout" 
            icon={LogOut} 
            isOpen={isSidebarOpen} 
            onClick={onExitDashboard}
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
          />
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          setMobileMenuOpen={setMobileMenuOpen} 
          onNavigate={setActiveTab}
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 bg-slate-50 dark:bg-[#020617]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isLoading ? '-loading' : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Drawer */}
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
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <span className="text-xl font-bold font-display">Cognitia</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 space-y-2">
                {navigation.map((item) => (
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
                  />
                ))}
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                 <SidebarItem id="logout" label="Logout" icon={LogOut} isOpen={true} onClick={onExitDashboard} className="text-red-500" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;


import React from 'react';
import { LucideIcon, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isOpen: boolean;
  isActive?: boolean;
  premium?: boolean;
  onClick: () => void;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  label, 
  icon: Icon, 
  isOpen, 
  isActive, 
  premium, 
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 font-semibold' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white'
      } ${className}`}
    >
      {isActive && (
        <motion.div 
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-500 rounded-r-full"
        />
      )}
      <Icon size={20} className={`shrink-0 ${isActive ? 'text-brand-500' : 'group-hover:scale-110 transition-transform'}`} />
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-3 flex-1 flex items-center justify-between"
        >
          <span className="text-sm truncate">{label}</span>
          {premium && (
            <Lock size={12} className="text-amber-500 opacity-60" title="Premium feature" />
          )}
        </motion.div>
      )}

      {!isOpen && isActive && (
        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-brand-500" />
      )}
    </button>
  );
};

export default SidebarItem;

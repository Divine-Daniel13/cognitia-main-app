
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Save, RotateCcw, Layout, Image as ImageIcon, Type, Sparkles, Check, ChevronRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Skeleton } from '../Skeleton';

const LandingEditor: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [device, setDevice] = useState<'pc' | 'tab' | 'mob'>('pc');
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Hero Banner', status: 'Live' },
    { id: 'trust', label: 'Social Proof', status: 'Live' },
    { id: 'how', label: 'Workflow', status: 'Live' },
    { id: 'avatars', label: 'Expert Grid', status: 'Modified' },
    { id: 'pricing', label: 'Plans & Pricing', status: 'Live' },
    { id: 'footer', label: 'Global Footer', status: 'Live' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 h-full">
         <Skeleton className="h-10 w-64" />
         <div className="flex gap-8 h-[calc(100%-60px)]">
            <Skeleton className="w-80 h-full rounded-[2.5rem]" />
            <Skeleton className="flex-1 h-full rounded-[3.5rem]" />
         </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Site Content Architect</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Visual editor for public-facing interface modules.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold flex items-center space-x-2 hover:bg-slate-50 transition-all shadow-sm">
              <RotateCcw size={18} />
              <span>Rollback</span>
           </button>
           <button className="px-8 py-3 rounded-2xl bg-purple-600 text-white text-sm font-black uppercase tracking-widest flex items-center space-x-2 hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20">
              <Save size={18} />
              <span>Publish Changes</span>
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
        {/* Section List */}
        <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto no-scrollbar">
           {sections.map(sec => (
             <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`p-6 rounded-[2rem] border transition-all text-left flex items-center justify-between group ${
                activeSection === sec.id 
                  ? 'bg-purple-600 border-purple-500 text-white shadow-xl shadow-purple-500/20' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-500/50'
              }`}
             >
                <div className="flex items-center space-x-4">
                   <div className={`p-2 rounded-xl ${activeSection === sec.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      <Layout size={18} />
                   </div>
                   <div>
                      <h5 className="font-bold text-sm">{sec.label}</h5>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${activeSection === sec.id ? 'text-purple-200' : 'text-slate-400'}`}>
                        {sec.status}
                      </span>
                   </div>
                </div>
                <ChevronRight size={18} className={`transition-transform ${activeSection === sec.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
             </button>
           ))}
        </div>

        {/* Preview & Editor Controls */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
           {/* Preview Toolbar */}
           <div className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-2">
                 <button onClick={() => setDevice('pc')} className={`p-2.5 rounded-xl transition-all ${device === 'pc' ? 'bg-purple-500/10 text-purple-600' : 'text-slate-400 hover:bg-slate-50'}`}><Monitor size={18}/></button>
                 <button onClick={() => setDevice('tab')} className={`p-2.5 rounded-xl transition-all ${device === 'tab' ? 'bg-purple-500/10 text-purple-600' : 'text-slate-400 hover:bg-slate-50'}`}><Tablet size={18}/></button>
                 <button onClick={() => setDevice('mob')} className={`p-2.5 rounded-xl transition-all ${device === 'mob' ? 'bg-purple-500/10 text-purple-600' : 'text-slate-400 hover:bg-slate-50'}`}><Smartphone size={18}/></button>
              </div>
              <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                 <span className="flex items-center space-x-1.5 text-emerald-500"><Check size={14}/><span>Auto-saved 2m ago</span></span>
                 <span className="w-px h-4 bg-slate-200" />
                 <button className="flex items-center space-x-2 hover:text-slate-900 transition-all"><Eye size={16}/><span>Preview URL</span></button>
              </div>
           </div>

           {/* Layout Grid Simulation */}
           <div className="flex-1 flex gap-6 overflow-hidden">
              {/* Properties Panel */}
              <div className="w-80 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-10">
                 <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-8">
                    <h4 className="text-lg font-black uppercase tracking-tight flex items-center space-x-2 text-purple-500">
                       <Type size={20} />
                       <span>Text Layer</span>
                    </h4>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Headline Translation (en-US)</label>
                       <textarea className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none text-sm font-medium focus:ring-2 focus:ring-purple-500/20" rows={4} defaultValue="Talk to AI Experts. In Real Time." />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Secondary CTA Label</label>
                       <input className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none text-sm font-medium focus:ring-2 focus:ring-purple-500/20" defaultValue="Watch Demo" />
                    </div>
                 </div>

                 <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-8">
                    <h4 className="text-lg font-black uppercase tracking-tight flex items-center space-x-2 text-purple-500">
                       <ImageIcon size={20} />
                       <span>Asset Control</span>
                    </h4>
                    <div className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 hover:border-purple-500 transition-all aspect-video flex items-center justify-center">
                       <div className="text-center">
                          <ImageIcon size={32} className="mx-auto mb-2 text-slate-300" />
                          <p className="text-[10px] font-black text-slate-400">UPLOAD NEW ASSET</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Viewport Simulation */}
              <div className="flex-1 bg-slate-200 dark:bg-slate-950 rounded-[3rem] border-8 border-slate-300 dark:border-slate-900 shadow-inner flex items-center justify-center overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={device}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`bg-white dark:bg-slate-900 transition-all duration-700 shadow-2xl relative ${
                        device === 'pc' ? 'w-full h-full' : 
                        device === 'tab' ? 'w-[480px] h-[640px] rounded-3xl' : 'w-[280px] h-[560px] rounded-3xl'
                      }`}
                    >
                       <div className="p-10 space-y-8">
                          <div className="flex items-center justify-between">
                             <div className="w-8 h-8 rounded-full bg-purple-500/20" />
                             <div className="flex space-x-4">
                                <div className="w-12 h-2 bg-slate-100 rounded" />
                                <div className="w-12 h-2 bg-slate-100 rounded" />
                             </div>
                          </div>
                          <div className="space-y-4 pt-20">
                             <div className="h-8 w-3/4 bg-purple-600/10 rounded-xl" />
                             <div className="h-8 w-1/2 bg-purple-600/20 rounded-xl" />
                             <div className="h-32 w-full bg-slate-50 dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                <Sparkles className="text-purple-500/20" size={48} />
                             </div>
                          </div>
                       </div>
                       
                       {/* Floating Editor Tags */}
                       <div className="absolute top-24 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-[8px] font-black uppercase rounded-full shadow-lg flex items-center space-x-2">
                          <Sparkles size={10} />
                          <span>Interactive Layer: Active</span>
                       </div>
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LandingEditor;


import React from 'react';
import { MessageCircle, FileText, Search, LifeBuoy, Zap, ChevronRight } from 'lucide-react';

const SupportPage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const faqs = [
    "How do I credit my account?",
    "Can I train a custom AI avatar?",
    "Is my session data private?",
    "How to export meeting transcripts?",
    "What is the average latency?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-extrabold">How can we help?</h1>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search help articles..."
            className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800 text-center group hover:border-brand-500/50 transition-all">
          <div className="w-14 h-14 bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
             <MessageCircle size={28} />
          </div>
          <h4 className="font-bold mb-2">Live Chat</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Speak with our human support team in minutes.</p>
        </div>
        <div className="p-8 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800 text-center group hover:border-brand-500/50 transition-all">
          <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
             <FileText size={28} />
          </div>
          <h4 className="font-bold mb-2">Documentation</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Explore deep technical guides and API docs.</p>
        </div>
        <div className="p-8 rounded-[2.5rem] glass border-slate-200 dark:border-slate-800 text-center group hover:border-brand-500/50 transition-all">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
             <LifeBuoy size={28} />
          </div>
          <h4 className="font-bold mb-2">Community</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Join 10k+ users sharing tips on Discord.</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((q, i) => (
            <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group cursor-pointer hover:border-brand-500 transition-all">
              <span className="font-bold text-slate-700 dark:text-slate-200">{q}</span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-500 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;


import React from 'react';
import { Shield, EyeOff, Lock, FileText } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-12 lg:p-20 rounded-[3rem] border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-500/5 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-brand-500 font-bold uppercase tracking-widest mb-6">Security & Privacy</h2>
            <h3 className="text-3xl lg:text-5xl font-display font-bold mb-10">Your Data. Your Control.</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed">
              We've built Cognitia with a security-first architecture. Our platform adheres to the highest global standards for data protection and AI safety.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <Lock className="text-brand-500" />
                </div>
                <h4 className="font-bold mb-2">E2E Encryption</h4>
                <p className="text-xs text-slate-500 leading-relaxed">All voice and video streams are fully encrypted in transit.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <EyeOff className="text-brand-500" />
                </div>
                <h4 className="font-bold mb-2">Zero Data Retention</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We don't store session data unless you explicitly request a summary.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <Shield className="text-brand-500" />
                </div>
                <h4 className="font-bold mb-2">SOC2 Type II</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Independently audited for top-tier operational security.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <FileText className="text-brand-500" />
                </div>
                <h4 className="font-bold mb-2">HIPAA Compliant</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Ready for healthcare consultation and sensitive workloads.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;

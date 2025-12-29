
import React from 'react';
import { Users, BarChart, ShieldCheck, Headphones } from 'lucide-react';

const Enterprise: React.FC = () => {
  const enterpriseFeatures = [
    { title: 'Multi-user Sessions', description: 'Collaborate with your team and AI experts simultaneously in shared environments.', icon: <Users size={24} /> },
    { title: 'Advanced Analytics', description: 'Deep insights into session effectiveness, sentiment analysis, and action tracking.', icon: <BarChart size={24} /> },
    { title: 'Custom Governance', description: 'Enterprise-grade security controls, SSO, and localized data residency options.', icon: <ShieldCheck size={24} /> },
    { title: '24/7 Priority Support', description: 'Dedicated account manager and engineering support for your custom deployments.', icon: <Headphones size={24} /> },
  ];

  return (
    <section id="enterprise" className="py-24 bg-brand-950 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-brand-400 font-bold uppercase tracking-widest mb-4">Enterprise</h2>
            <h3 className="text-4xl lg:text-5xl font-display font-bold mb-8 leading-tight">
              Scale Intelligence Across Your Organization
            </h3>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Cognitia Enterprise provides the infrastructure, security, and governance needed to deploy high-fidelity AI consultation at scale.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {enterpriseFeatures.map((feat) => (
                <div key={feat.title} className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <h4 className="font-bold text-lg">{feat.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <button className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-100 transition-all flex items-center space-x-2">
                <span>Contact Sales for Enterprise</span>
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Visual: Dashboard Mockup */}
            <div className="glass border-slate-700/50 rounded-2xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Admin Dashboard v2.0</div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="h-20 bg-slate-800/50 rounded-xl p-4">
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Total Sessions</div>
                    <div className="text-2xl font-bold">12,482</div>
                 </div>
                 <div className="h-20 bg-slate-800/50 rounded-xl p-4">
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Avg. Satisfaction</div>
                    <div className="text-2xl font-bold">98.4%</div>
                 </div>
               </div>

               <div className="h-32 bg-slate-800/50 rounded-xl p-4 mb-4">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-4">Team Activity (Last 7 Days)</div>
                  <div className="flex items-end justify-between h-12">
                     {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                       <div key={i} className="w-4 bg-brand-500/60 rounded-t-sm" style={{ height: `${h}%` }}></div>
                     ))}
                  </div>
               </div>

               <div className="space-y-3">
                 {[1, 2].map(i => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                        <div className="text-xs font-bold">User_{i}3942</div>
                     </div>
                     <div className="px-2 py-1 rounded bg-brand-500/20 text-brand-400 text-[8px] font-bold uppercase">Active Session</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enterprise;

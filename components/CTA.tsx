
import React from 'react';

interface CTAProps {
  onStart?: () => void;
}

const CTA: React.FC<CTAProps> = ({ onStart }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[4rem] bg-slate-900 dark:bg-brand-950 p-12 lg:p-24 text-center overflow-hidden">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-500/20 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-teal/20 blur-[120px] rounded-full animate-pulse-slow"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-display font-extrabold text-white mb-8 leading-tight">
              Start Talking to<br />
              <span className="gradient-text">the Future.</span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Join 250,000+ professionals using Cognitia to enhance their life, learning, and business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xl shadow-2xl shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Get Started Free
              </button>
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xl border border-white/20 transition-all active:scale-95"
              >
                Explore AI Avatars
              </button>
            </div>
            
            <p className="mt-10 text-slate-500 text-sm font-medium uppercase tracking-widest">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

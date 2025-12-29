
import React from 'react';

const Trust: React.FC = () => {
  const logos = [
    'LogoIpsum', 'AlphaCloud', 'NovaSoft', 'DataSync', 'FuturePath'
  ];

  const stats = [
    { label: 'Active Users', value: '250K+' },
    { label: 'AI Avatars', value: '150+' },
    { label: 'Client Satisfaction', value: '99.8%' },
    { label: 'Enterprise Teams', value: '1.2K' },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logos */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">
            Trusted by innovators worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {logos.map((logo) => (
              <span key={logo} className="text-2xl font-bold font-display">{logo}</span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-display font-extrabold text-brand-600 dark:text-brand-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;

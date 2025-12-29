
import React from 'react';
import { UserCircle, Video, MessageCircle, BarChart } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Choose Your Avatar',
      description: 'Select from over 150 specialized experts in various fields and languages.',
      icon: <UserCircle className="w-8 h-8" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Initiate Call',
      description: 'One-click HD video and crystal-clear audio session starting in seconds.',
      icon: <Video className="w-8 h-8" />,
      color: 'bg-teal-500',
    },
    {
      title: 'Real-time Interaction',
      description: 'Experience sub-100ms latency as your AI avatar speaks and emotes.',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'bg-indigo-500',
    },
    {
      title: 'Get Insights',
      description: 'Receive instant summaries, visual aids, and action items post-session.',
      icon: <BarChart className="w-8 h-8" />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-base font-bold text-brand-500 uppercase tracking-widest mb-4">The Process</h2>
          <h3 className="text-3xl lg:text-5xl font-display font-bold mb-6">How Cognitia Works</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Four simple steps to bridging the gap between human intelligence and AI-driven expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-12 -z-10"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 rounded-2xl ${step.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-black/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {step.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
              
              <div className="mt-4 text-brand-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Step 0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

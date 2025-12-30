
import React from 'react';
import { UserCircle, Video, MessageCircle, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

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
          <h2 className="text-base font-black text-brand-500 uppercase tracking-widest mb-4">The Process</h2>
          <h3 className="text-3xl lg:text-5xl font-display font-bold mb-6">How Cognitia Works</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Four simple steps to bridging the gap between human intelligence and AI-driven expertise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[40px] left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -z-10 mx-20"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-[2rem] ${step.color} text-white flex items-center justify-center mb-8 shadow-2xl shadow-black/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                {step.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                {step.description}
              </p>
              
              <div className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-brand-500/40 group-hover:text-brand-500 transition-colors">
                Step 0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


import React, { useState, useEffect } from 'react';
import { Mic, PhoneOff, Settings, Share, Maximize, FileText } from 'lucide-react';

const LiveDemo: React.FC = () => {
  const [transcript, setTranscript] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(false);

  const lines = [
    "Cognitia Avatar: Hello! I'm Elena. How are you feeling today?",
    "User: I've been feeling a bit stressed with my new project.",
    "Cognitia Avatar: I understand. New projects can be overwhelming. Let's look at some stress management techniques.",
    "Cognitia Avatar: I'm generating a breathing exercise diagram for you now..."
  ];

  useEffect(() => {
    if (!isLive) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setTranscript(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-brand-400 font-bold uppercase tracking-widest mb-4">Interactive Demo</h2>
            <h3 className="text-4xl lg:text-5xl font-display font-bold mb-8 leading-tight">
              Experience the Future of Consultation
            </h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Witness the power of real-time transcription and adaptive visual aids. Our avatars don't just talk; they understand and assist visually.
            </p>
            
            <button 
              onClick={() => {
                setIsLive(true);
                setTranscript([]);
              }}
              className="px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 font-bold text-lg transition-all"
            >
              Launch Live Simulation
            </button>
          </div>

          {/* Consultation UI Mock */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20 border border-slate-800">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Live: Dr. Elena Vance</span>
              </div>
              <div className="flex items-center space-x-3">
                <Settings size={18} className="opacity-60 cursor-pointer" />
                <Maximize size={18} className="opacity-60 cursor-pointer" />
              </div>
            </div>

            {/* Video Canvas */}
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/elena-demo/1280/720" 
                alt="AI Video"
                className={`w-full h-full object-cover transition-opacity duration-1000 ${isLive ? 'opacity-100' : 'opacity-40'}`}
              />
              
              {!isLive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsLive(true)}>
                      <Mic size={24} />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-60">Click to start simulation</p>
                  </div>
                </div>
              )}

              {/* Transcription Overlay */}
              <div className="absolute bottom-20 left-6 right-6 space-y-2 max-h-32 overflow-y-hidden pointer-events-none">
                {transcript.map((text, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 animate-in slide-in-from-bottom-2 duration-500"
                  >
                    <p className="text-xs font-medium opacity-100">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Aid Popover (Mock) */}
            {transcript.length >= 4 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-4 glass rounded-xl border border-brand-500/30 animate-in zoom-in duration-500 shadow-2xl">
                 <div className="flex items-center space-x-2 mb-3">
                    <FileText size={16} className="text-brand-400" />
                    <span className="text-[10px] font-bold uppercase">Stress Management Plan</span>
                 </div>
                 <div className="space-y-2">
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 w-3/4"></div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-teal w-1/2"></div>
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                   Generating personalized breathing cycle...
                 </p>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="p-6 bg-slate-900 flex items-center justify-center space-x-6 border-t border-slate-800">
              <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Mic size={20} />
              </button>
              <button className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors flex items-center space-x-2 font-bold text-sm">
                <PhoneOff size={18} />
                <span>End Call</span>
              </button>
              <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Share size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiveDemo;

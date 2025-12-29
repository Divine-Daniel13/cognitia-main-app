
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Settings, Maximize, MessageSquare, ChevronDown, FileText, Info } from 'lucide-react';

interface LiveCallProps {
  onEnd: () => void;
}

const LiveCall: React.FC<LiveCallProps> = ({ onEnd }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activePanel, setActivePanel] = useState<'chat' | 'transcript' | 'aids'>('transcript');
  const [callTime, setCallTime] = useState(0);
  const [transcript, setTranscript] = useState<{sender: string, text: string}[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCallTime(prev => prev + 1), 1000);
    
    const lines = [
      { sender: 'Elena', text: "I'm detecting some tension in your breath patterns. Would you like to try a grounding exercise?" },
      { sender: 'User', text: "Yes please, that would be helpful. Work has been quite intense today." },
      { sender: 'Elena', text: "Understood. Focus on the blue circle appearing in your visual aids panel. Inhale for 4 counts..." },
    ];

    let i = 0;
    const chatTimer = setInterval(() => {
      if (i < lines.length) {
        setTranscript(prev => [...prev, lines[i]]);
        i++;
      }
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(chatTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Video Area */}
      <div className="flex-1 relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl group border border-slate-800">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1280" 
          alt="AI Avatar" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Controls */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
          <div className="flex items-center space-x-3 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Live Session: Dr. Elena Vance</span>
            <span className="text-xs font-mono text-slate-300 border-l border-white/20 pl-3">{formatTime(callTime)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
             <button className="p-2.5 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all">
                <Maximize size={18} />
             </button>
             <button className="p-2.5 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all">
                <Settings size={18} />
             </button>
          </div>
        </div>

        {/* Floating User Preview */}
        <div className="absolute bottom-28 right-8 w-40 h-52 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
           {!isVideoOff ? (
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <VideoOff className="text-slate-700" size={32} />
             </div>
           )}
           <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
             <span className="text-[8px] font-bold text-white uppercase">You</span>
           </div>
        </div>

        {/* Waveform Overlay (Framer Motion Graphics Inspiration) */}
        <div className="absolute bottom-32 left-8 right-52 flex items-center space-x-2 h-12">
           {[...Array(20)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ height: [12, Math.random() * 40 + 10, 12] }}
               transition={{ repeat: Infinity, duration: 0.8 + Math.random(), ease: "easeInOut" }}
               className="w-1.5 bg-brand-400/60 rounded-full"
             />
           ))}
        </div>

        {/* Main Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 px-8 py-4 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-2xl transition-all ${isMuted ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-2xl transition-all ${isVideoOff ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
          >
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>
          <div className="w-px h-10 bg-white/10 mx-2" />
          <button 
            onClick={onEnd}
            className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all flex items-center space-x-3 shadow-xl shadow-red-500/30"
          >
            <PhoneOff size={24} />
            <span className="hidden sm:inline">End Session</span>
          </button>
        </div>
      </div>

      {/* Side Panel (Transcription / Aids) */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6">
        {/* Toggle Controls */}
        <div className="flex p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
           {[
             { id: 'transcript', label: 'Transcript', icon: FileText },
             { id: 'chat', label: 'Chat', icon: MessageSquare },
             { id: 'aids', label: 'Visual Aids', icon: Info },
           ].map(tab => (
             <button
              key={tab.id}
              onClick={() => setActivePanel(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest ${
                activePanel === tab.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
             >
               <tab.icon size={16} />
               <span className="hidden sm:inline">{tab.label}</span>
             </button>
           ))}
        </div>

        <div className="flex-1 glass dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 overflow-hidden flex flex-col">
           <AnimatePresence mode="wait">
             {activePanel === 'transcript' && (
               <motion.div 
                 key="transcript"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2"
               >
                 {transcript.length === 0 && <p className="text-center text-slate-500 italic mt-10">Waiting for interaction...</p>}
                 {transcript.map((line, idx) => (
                   <div key={idx} className="space-y-1 animate-in slide-in-from-right-4 duration-300">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${line.sender === 'Elena' ? 'text-brand-500' : 'text-slate-500'}`}>
                        {line.sender}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">{line.text}</p>
                   </div>
                 ))}
               </motion.div>
             )}

             {activePanel === 'aids' && (
               <motion.div 
                 key="aids"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="flex flex-col items-center justify-center h-full space-y-8 text-center"
               >
                 <div className="relative">
                   <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-32 h-32 rounded-full border-4 border-brand-500/30 flex items-center justify-center"
                   >
                     <div className="w-16 h-16 rounded-full bg-brand-500/20 animate-pulse" />
                   </motion.div>
                 </div>
                 <div>
                   <h5 className="text-lg font-bold mb-2">Grounding Exercise</h5>
                   <p className="text-sm text-slate-500 leading-relaxed">Focus on the center point. Sync your breath with the expanding circle.</p>
                 </div>
                 <div className="p-4 bg-brand-500/5 rounded-2xl border border-brand-500/10 w-full">
                    <p className="text-[10px] font-bold uppercase text-brand-500 mb-2">Current Goal</p>
                    <p className="text-sm font-medium">Reduce cortical cortisol levels</p>
                 </div>
               </motion.div>
             )}

             {activePanel === 'chat' && (
               <motion.div 
                 key="chat"
                 className="flex flex-col h-full"
               >
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                    <MessageSquare size={48} className="mb-4 opacity-20" />
                    <p className="text-sm">Real-time chat is currently inactive</p>
                 </div>
                 <div className="mt-4 flex gap-2">
                    <input disabled type="text" placeholder="Type message..." className="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-sm opacity-50 cursor-not-allowed" />
                    <button disabled className="p-3 bg-brand-500/20 text-brand-500 rounded-xl cursor-not-allowed">
                       <ChevronDown size={18} className="-rotate-90" />
                    </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LiveCall;

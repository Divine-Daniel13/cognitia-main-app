
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Settings, Maximize, MessageSquare, ChevronDown, FileText, Info, Zap, Loader2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// --- Audio Utility Functions (As per Gemini Live API Guidelines) ---

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface LiveCallProps {
  onEnd: () => void;
}

const LiveCall: React.FC<LiveCallProps> = ({ onEnd }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activePanel, setActivePanel] = useState<'chat' | 'transcript' | 'aids'>('transcript');
  const [callTime, setCallTime] = useState(0);
  const [transcript, setTranscript] = useState<{ sender: string, text: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Refs for API and Audio
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const timerRef = useRef<number | null>(null);
  const transcriptionBufferRef = useRef({ user: '', model: '' });

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputAudioContext;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const micSource = inputAudioContext.createMediaStreamSource(stream);
      const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Gemini Live: Connection established');
            setIsConnected(true);
            setIsConnecting(false);
            
            // Start timer
            timerRef.current = window.setInterval(() => setCallTime(prev => prev + 1), 1000);

            // Stream mic to Gemini
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            micSource.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Data
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioContext) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContext.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            // Handle Transcriptions
            if (message.serverContent?.inputTranscription) {
              transcriptionBufferRef.current.user += message.serverContent.inputTranscription.text;
            }
            if (message.serverContent?.outputTranscription) {
              transcriptionBufferRef.current.model += message.serverContent.outputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              if (transcriptionBufferRef.current.user) {
                setTranscript(prev => [...prev, { sender: 'User', text: transcriptionBufferRef.current.user }]);
                transcriptionBufferRef.current.user = '';
              }
              if (transcriptionBufferRef.current.model) {
                setTranscript(prev => [...prev, { sender: 'Elena', text: transcriptionBufferRef.current.model }]);
                transcriptionBufferRef.current.model = '';
              }
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => console.error('Gemini Live Error:', e),
          onclose: () => cleanup(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: "You are Dr. Elena Vance, an empathetic and professional psychologist. Speak naturally, be concise, and focus on helping the user manage stress or professional hurdles. You can offer grounding exercises.",
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start session:', err);
      setIsConnecting(false);
    }
  };

  const cleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (sessionRef.current) sessionRef.current.close();
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    setIsConnected(false);
  };

  useEffect(() => {
    return () => cleanup();
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
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isConnected ? 'opacity-100' : 'opacity-40'}`}
        />
        
        {/* Overlay Controls */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
          <div className="flex items-center space-x-3 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-red-500 animate-pulse shadow-[0_0_8px_red]' : 'bg-slate-500'}`}></div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              {isConnected ? 'Live Session: Dr. Elena Vance' : 'Neural Core Offline'}
            </span>
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

        {/* Start Button Overlay */}
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSession}
              disabled={isConnecting}
              className="px-10 py-5 bg-brand-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-brand-500/40 flex items-center space-x-3 group"
            >
              {isConnecting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Zap className="fill-current group-hover:animate-pulse" />
              )}
              <span>{isConnecting ? 'Establishing Link...' : 'Initialize Neural Link'}</span>
            </motion.button>
          </div>
        )}

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

        {/* Waveform Overlay (Synced with connection) */}
        <div className="absolute bottom-32 left-8 right-52 flex items-center space-x-2 h-12">
           {[...Array(20)].map((_, i) => (
             <motion.div 
               key={i}
               animate={isConnected ? { height: [12, Math.random() * 40 + 10, 12] } : { height: 4 }}
               transition={{ repeat: Infinity, duration: 0.8 + Math.random(), ease: "easeInOut" }}
               className={`w-1.5 rounded-full transition-colors ${isConnected ? 'bg-brand-400/60' : 'bg-slate-700'}`}
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
            onClick={() => { cleanup(); onEnd(); }}
            className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all flex items-center space-x-3 shadow-xl shadow-red-500/30"
          >
            <PhoneOff size={24} />
            <span className="hidden sm:inline">End Session</span>
          </button>
        </div>
      </div>

      {/* Side Panel (Transcription / Aids) */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6">
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
                 {transcript.length === 0 && (
                   <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                     <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">
                        <MessageSquare className="text-slate-400" size={32} />
                     </div>
                     <p className="text-slate-500 italic text-sm">
                       {isConnected ? 'Neural Core synced. Awaiting speech...' : 'Initialize link to begin transcription.'}
                     </p>
                   </div>
                 )}
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
                    animate={isConnected ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-32 h-32 rounded-full border-4 border-brand-500/30 flex items-center justify-center"
                   >
                     <div className={`w-16 h-16 rounded-full bg-brand-500/20 ${isConnected ? 'animate-pulse' : ''}`} />
                   </motion.div>
                 </div>
                 <div>
                   <h5 className="text-lg font-bold mb-2">Grounding Exercise</h5>
                   <p className="text-sm text-slate-500 leading-relaxed">Focus on the center point. Sync your breath with the expanding circle.</p>
                 </div>
                 <div className="p-4 bg-brand-500/5 rounded-2xl border border-brand-500/10 w-full">
                    <p className="text-[10px] font-bold uppercase text-brand-500 mb-2">Neural Status</p>
                    <p className="text-sm font-medium">{isConnected ? 'Biometric Sync Active' : 'Waiting for link...'}</p>
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

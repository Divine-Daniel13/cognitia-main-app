
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Sparkles, Shield, ShieldCheck, Loader2, CheckCircle2, Terminal, Key } from 'lucide-react';

interface AuthScreensProps {
  onBack: () => void;
  onSuccess: (role: 'user' | 'admin' | 'super-admin') => void;
  initialRole?: 'user' | 'admin' | 'super-admin';
}

const AuthScreens: React.FC<AuthScreensProps> = ({ onBack, onSuccess, initialRole = 'user' }) => {
  const [role, setRole] = useState<'user' | 'admin' | 'super-admin'>(initialRole);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [error, setError] = useState('');

  // Handle dynamic role detection based on email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setEmail(val);
    
    if (val === 'superadmin@cognitia.com') {
      setRole('super-admin');
    } else if (val === 'admin@cognitia.com') {
      setRole('admin');
    } else if (role !== 'user' && !val.includes('@cognitia.com')) {
      setRole('user');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (role === 'user') {
      setIsMagicLinkSent(true);
      setIsLoading(false);
      setTimeout(() => onSuccess('user'), 3000);
    } else if (role === 'admin') {
      if (email === 'admin@cognitia.com' && password === 'admin123') {
        onSuccess('admin');
      } else {
        setError('Invalid administrator authentication sequence.');
        setIsLoading(false);
      }
    } else if (role === 'super-admin') {
      if (email === 'superadmin@cognitia.com' && password === 'superadmin123') {
        onSuccess('super-admin');
      } else {
        setError('Access denied. Root credentials verification failed.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-700 ${
      role === 'super-admin' ? 'bg-[#020617]' : 
      role === 'admin' ? 'bg-slate-900' : 
      'bg-slate-50 dark:bg-[#020617]'
    }`}>
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className={`absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full blur-[120px] ${role === 'super-admin' ? 'bg-purple-600' : role === 'admin' ? 'bg-indigo-600' : 'bg-brand-500'}`} 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-[120px] ${role === 'super-admin' ? 'bg-indigo-600' : role === 'admin' ? 'bg-teal-600' : 'bg-accent-teal'}`} 
        />
      </div>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md rounded-[2.5rem] shadow-2xl border p-8 md:p-10 transition-all duration-500 relative z-10 ${
          role === 'super-admin' ? 'bg-slate-900/40 backdrop-blur-2xl border-purple-500/20' : 
          role === 'admin' ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-indigo-500/20' : 
          'bg-white dark:bg-slate-900/90 backdrop-blur-xl border-slate-200 dark:border-slate-800'
        }`}
      >
        <button 
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-slate-500 hover:text-brand-500 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-xs uppercase tracking-widest">Back to Portal</span>
        </button>

        <div className="text-center mb-10">
          <motion.div 
            key={role}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 transition-all duration-500 ${
              role === 'super-admin' ? 'bg-purple-600 shadow-purple-500/40' : 
              role === 'admin' ? 'bg-indigo-600 shadow-indigo-500/40' : 
              'bg-brand-600 shadow-brand-500/40'
            }`}
          >
            {role === 'super-admin' ? <ShieldCheck className="text-white" size={32} /> : 
             role === 'admin' ? <Shield className="text-white" size={32} /> : 
             <Sparkles className="text-white" size={32} />}
          </motion.div>
          <h2 className={`text-3xl font-display font-extrabold mb-2 ${role === 'super-admin' ? 'text-white' : ''}`}>
            {isMagicLinkSent ? 'Verification Sent' : role === 'super-admin' ? 'Root Authentication' : role === 'admin' ? 'Admin Access' : 'Welcome to Cognitia'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {isMagicLinkSent 
              ? `Check ${email} to continue.`
              : role === 'user' 
                ? 'The future of AI consultation starts here.' 
                : `Enter your ${role.replace('-', ' ')} secure credentials.`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isMagicLinkSent ? (
            <motion.div 
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="animate-bounce" />
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                Click the secure link in your inbox.<br/>You'll be redirected shortly...
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <form onSubmit={handleAuth} className="space-y-5">
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 transition-colors ${role === 'super-admin' ? 'text-purple-400' : 'text-slate-400'}`}>
                    Identifier
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${role === 'super-admin' ? 'text-purple-400' : 'text-slate-400'}`} size={18} />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      placeholder={role === 'user' ? "name@company.com" : "root@cognitia.io"}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-medium text-sm ${
                        role === 'super-admin' ? 'bg-slate-950 border-purple-500/30 text-white focus:ring-purple-500/20 focus:border-purple-500' :
                        'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-brand-500/10 focus:border-brand-500'
                      }`}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {role !== 'user' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <label className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 transition-colors ${role === 'super-admin' ? 'text-purple-400' : 'text-slate-400'}`}>
                        Secure Passkey
                      </label>
                      <div className="relative">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${role === 'super-admin' ? 'text-purple-400' : 'text-slate-400'}`} size={18} />
                        <input 
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-medium text-sm ${
                            role === 'super-admin' ? 'bg-slate-950 border-purple-500/30 text-white focus:ring-purple-500/20 focus:border-purple-500' :
                            'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-brand-500/10 focus:border-brand-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-black text-red-500 px-1 uppercase tracking-widest">{error}</motion.p>
                )}

                <button 
                  disabled={isLoading}
                  className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 ${
                    role === 'super-admin' ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20' :
                    role === 'admin' ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20' :
                    'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      {role !== 'user' ? <Key size={16} /> : <Mail size={16} />}
                      <span>{role === 'user' ? (mode === 'login' ? 'Request Access' : 'Create Identity') : 'Establish Uplink'}</span>
                    </>
                  )}
                </button>
              </form>

              {role === 'user' && (
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {mode === 'login' ? "New around here?" : "Already have identity?"}
                    <button 
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="ml-2 text-brand-600 font-black hover:underline"
                    >
                      {mode === 'login' ? 'Register' : 'Login'}
                    </button>
                  </p>
                </div>
              )}
              
              {role === 'super-admin' && (
                <div className="mt-8 flex flex-col items-center">
                  <p className="text-[9px] font-black uppercase text-purple-500/40 tracking-[0.4em] mb-4">
                    ROOT CLEARANCE LEVEL 7
                  </p>
                  <div className="flex space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-purple-500/20" />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthScreens;

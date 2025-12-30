
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Sparkles, Shield, ShieldCheck, User, Loader2, CheckCircle2, Terminal } from 'lucide-react';

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

  // Sync internal role state if prop changes
  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  // Dynamic role switching based on email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setEmail(val);
    
    // Only switch roles if we aren't already on a restricted URL path
    const path = window.location.pathname;
    const isExplicitPath = path.includes('/admin') || path.includes('/superadmin');

    if (!isExplicitPath) {
      if (val === 'superadmin@cognitia.com') {
        setRole('super-admin');
      } else if (val === 'admin@cognitia.com') {
        setRole('admin');
      } else if (role !== 'user' && !val.includes('@cognitia.com')) {
        // Switch back to user if they clear the specialized email
        setRole('user');
      }
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (role === 'user') {
      setIsMagicLinkSent(true);
      setIsLoading(false);
      // Automatically log in after seeing the message for demo purposes
      setTimeout(() => onSuccess('user'), 3000);
    } else if (role === 'admin') {
      if (email === 'admin@cognitia.com' && password === 'admin123') {
        onSuccess('admin');
      } else {
        setError('Invalid admin credentials.');
        setIsLoading(false);
      }
    } else if (role === 'super-admin') {
      if (email === 'superadmin@cognitia.com' && password === 'superadmin123') {
        onSuccess('super-admin');
      } else {
        setError('Invalid super admin credentials.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${
      role === 'super-admin' ? 'bg-slate-950' : 
      role === 'admin' ? 'bg-slate-900' : 
      'bg-slate-50 dark:bg-[#020617]'
    }`}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] ${role === 'super-admin' ? 'bg-purple-600' : 'bg-brand-500'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] ${role === 'super-admin' ? 'bg-indigo-600' : 'bg-teal-500'}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md rounded-[2.5rem] shadow-2xl border p-8 md:p-10 transition-all duration-500 ${
          role === 'super-admin' ? 'bg-slate-900/80 backdrop-blur-xl border-purple-500/20' : 
          role === 'admin' ? 'bg-white dark:bg-slate-900 border-indigo-500/20 shadow-indigo-500/5' : 
          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}
      >
        <button 
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-slate-500 hover:text-brand-500 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
        </button>

        <div className="text-center mb-10">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 transition-all duration-500 ${
            role === 'super-admin' ? 'bg-purple-600 shadow-purple-500/40' : 
            role === 'admin' ? 'bg-indigo-600 shadow-indigo-500/40' : 
            'bg-brand-600 shadow-brand-500/40'
          }`}>
            {role === 'super-admin' ? <ShieldCheck className="text-white" size={32} /> : 
             role === 'admin' ? <Shield className="text-white" size={32} /> : 
             <Sparkles className="text-white" size={32} />}
          </div>
          <h2 className={`text-3xl font-display font-extrabold mb-2 ${role === 'super-admin' ? 'text-white' : ''}`}>
            {isMagicLinkSent ? 'Check Your Email' : mode === 'login' ? (role === 'super-admin' ? 'Root Access' : role === 'admin' ? 'Admin Gateway' : 'Welcome Back') : 'Create Account'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {isMagicLinkSent 
              ? `We sent a magic link to ${email}`
              : role === 'user' 
                ? 'The future of AI consultation is one click away.' 
                : `${role.replace('-', ' ')} Control Terminal`}
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
                Click the link in your email to instantly sign in.<br/>Redirecting you shortly...
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Identity Identifier</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      placeholder={role === 'user' ? "name@company.com" : "root@cognitia.io"}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-medium ${
                        role === 'super-admin' ? 'bg-slate-950 border-purple-500/20 text-white focus:ring-purple-500/20 focus:border-purple-500' :
                        'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-brand-500/10 focus:border-brand-500'
                      }`}
                    />
                  </div>
                </div>

                {role !== 'user' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Access Key</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-medium ${
                          role === 'super-admin' ? 'bg-slate-950 border-purple-500/20 text-white focus:ring-purple-500/20 focus:border-purple-500' :
                          'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-brand-500/10 focus:border-brand-500'
                        }`}
                      />
                    </div>
                  </motion.div>
                )}

                {error && (
                  <p className="text-xs font-bold text-red-500 px-1">{error}</p>
                )}

                <button 
                  disabled={isLoading}
                  className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 ${
                    role === 'super-admin' ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20' :
                    role === 'admin' ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20' :
                    'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <>
                      {role !== 'user' && <Terminal size={18} />}
                      <span>{role === 'user' ? (mode === 'login' ? 'Send Magic Link' : 'Register Account') : 'Establish Uplink'}</span>
                    </>
                  )}
                </button>
              </form>

              {role === 'user' && (
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-sm font-medium text-slate-500">
                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <button 
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="ml-2 text-brand-600 font-bold hover:underline"
                    >
                      {mode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                  </p>
                </div>
              )}
              
              {role === 'super-admin' && (
                <p className="mt-8 text-center text-[10px] font-black uppercase text-purple-500/40 tracking-[0.3em]">
                  Root Clearance Level 7 Required
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthScreens;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, ShieldCheck, Lock, CheckCircle2, Loader2 } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setTimeout(() => onSuccess(), 1500);
  };

  if (isSuccess) {
    return (
      <div className="h-full flex items-center justify-center">
         <motion.div 
           initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
           className="text-center p-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 max-w-sm"
         >
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-slate-500">Welcome to Cognitia Pro. Redirecting you home...</p>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <button onClick={onBack} className="mb-8 flex items-center space-x-2 text-slate-500 hover:text-brand-500 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm uppercase tracking-widest">Back to Plans</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div>
             <h1 className="text-4xl font-display font-extrabold mb-4">Complete Purchase</h1>
             <p className="text-slate-500">You are subscribing to the <span className="font-bold text-brand-600">Cognitia Pro</span> plan.</p>
           </div>
           
           <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl" />
             <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Order Summary</p>
             <div className="flex justify-between items-end">
               <h2 className="text-4xl font-display font-extrabold">$49.00 <span className="text-lg text-slate-500 font-bold">/month</span></h2>
               <p className="text-xs text-brand-400 font-bold">Billed Monthly</p>
             </div>
             <div className="h-px bg-white/10 my-6" />
             <ul className="space-y-3 text-xs text-slate-300">
               <li className="flex justify-between"><span>Cognitia Pro License</span><span>$49.00</span></li>
               <li className="flex justify-between font-bold text-white"><span>Total Due Today</span><span>$49.00</span></li>
             </ul>
           </div>

           <div className="flex items-center space-x-4 text-xs text-slate-400">
             <ShieldCheck size={20} className="text-emerald-500" />
             <p>Secured by 256-bit encryption. Your payment info is never stored on our servers.</p>
           </div>
        </div>

        <form onSubmit={handlePay} className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-black uppercase text-slate-400 px-1">Card Number</label>
             <div className="relative">
               <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input required placeholder="4242 4242 4242 4242" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 px-1">Expiry</label>
                <input required placeholder="MM/YY" className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 px-1">CVC</label>
                <input required placeholder="123" className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
              </div>
           </div>

           <div className="space-y-2">
             <label className="text-xs font-black uppercase text-slate-400 px-1">Country</label>
             <select className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none">
               <option>United States</option>
               <option>United Kingdom</option>
               <option>Canada</option>
             </select>
           </div>

           <button 
             disabled={isProcessing}
             className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-xl shadow-brand-500/20 transition-all flex items-center justify-center space-x-2"
           >
             {isProcessing ? <Loader2 className="animate-spin" /> : <><Lock size={18}/><span>Pay $49.00 Now</span></>}
           </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

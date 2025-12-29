
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { Skeleton } from './Skeleton';

interface TestimonialsProps {
  isLoading?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isLoading = false }) => {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (isLoading) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [isLoading]);

  return (
    <section className="py-32 relative bg-slate-50 dark:bg-slate-900/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-20">
          
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-brand-500 font-bold uppercase tracking-widest mb-6">Testimonials</h2>
              <h3 className="text-4xl lg:text-6xl font-display font-bold mb-10 leading-[1.1]">
                Hear from Those already<br />
                <span className="gradient-text">Talking to the Future.</span>
              </h3>
            </motion.div>
            
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <ChevronLeft size={28} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <ChevronRight size={28} />
              </motion.button>
            </div>
          </div>

          <div className="flex-[1.4] w-full relative">
            <div className="relative glass p-10 md:p-20 rounded-[3rem] border-slate-200 dark:border-slate-800 overflow-hidden min-h-[450px] flex flex-col justify-center shadow-2xl">
               <Quote className="absolute top-12 right-12 w-32 h-32 text-brand-500/5 pointer-events-none" />
               
               {isLoading ? (
                 <div className="space-y-6">
                   <Skeleton className="h-8 w-full" />
                   <Skeleton className="h-8 w-5/6" />
                   <Skeleton className="h-8 w-4/6" />
                   <div className="flex items-center space-x-4 mt-10">
                     <Skeleton className="w-16 h-16 rounded-full" />
                     <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                     </div>
                   </div>
                 </div>
               ) : (
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={active} 
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      <p className="text-xl md:text-3xl font-medium leading-relaxed mb-12 text-slate-800 dark:text-slate-100 italic">
                        "{TESTIMONIALS[active].content}"
                      </p>
                      
                      <div className="flex items-center space-x-5">
                        <motion.img 
                          layoutId={`avatar-${active}`}
                          src={TESTIMONIALS[active].avatar} 
                          alt={TESTIMONIALS[active].name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-brand-500/30 shadow-lg shadow-brand-500/10"
                        />
                        <div>
                          <h4 className="font-bold text-xl">{TESTIMONIALS[active].name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{TESTIMONIALS[active].role}</p>
                        </div>
                      </div>
                    </motion.div>
                 </AnimatePresence>
               )}

               {/* Indicators */}
               <div className="absolute bottom-10 right-16 flex space-x-3">
                 {TESTIMONIALS.map((_, i) => (
                   <motion.div 
                    key={i} 
                    onClick={() => setActive(i)}
                    className="cursor-pointer group py-2"
                   >
                     <motion.div 
                      animate={{ 
                        width: i === active ? 40 : 10,
                        backgroundColor: i === active ? "#0ea5e9" : "#334155"
                      }}
                      className="h-2 rounded-full transition-all"
                     />
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;

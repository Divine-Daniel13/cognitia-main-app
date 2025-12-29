
import React from 'react';
import { Twitter, Instagram, Linkedin, Github, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-accent-teal"></div>
              <span className="text-xl font-display font-bold tracking-tight">Cognitia</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              Empowering human potential through realistic AI interaction. The world's leading platform for ultra-low latency AI consultation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-900 dark:text-white">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-brand-500 transition-colors">AI Avatars</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-900 dark:text-white">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-brand-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-900 dark:text-white">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-900 dark:text-white">Stay Updated</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest AI insights and product updates.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-brand-500 transition-colors text-sm"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            © 2024 Cognitia AI Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>System Operational</span>
            </div>
            <div className="flex items-center space-x-2">
               <span className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">English (US)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

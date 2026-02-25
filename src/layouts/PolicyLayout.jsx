import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-urbanist pt-20 lg:pt-24 pb-20">
      {/* --- INDUSTRIAL PAGE HEADER --- */}
      <header className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb Hub */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-8 bg-indigo-600" />
              <nav className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                <ChevronRight size={12} strokeWidth={3} className="text-slate-300" />
                <span>Document</span>
              </nav>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-10">
              {title.split(' ').slice(0, -1).join(' ') || title}<br/>
              <span className="text-indigo-600">{title.split(' ').slice(-1)}</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10 border-t-2 border-slate-900/10">
              {subtitle && (
                <p className="text-slate-500 text-base lg:text-lg font-bold max-w-2xl leading-relaxed uppercase tracking-widest border-l-4 border-indigo-600 pl-8">
                  {subtitle}
                </p>
              )}
              
              <div className="flex items-center gap-4 bg-white px-6 py-3 border-2 border-slate-900 shrink-0 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
                <Clock size={16} className="text-indigo-600" />
                <span className="text-slate-900 text-[10px] font-black uppercase tracking-widest leading-none">Revised: February 26, 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <article className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 py-16 lg:py-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl prose prose-slate prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-slate-900 prose-h2:border-b-4 prose-h2:border-slate-100 prose-h2:pb-4 prose-p:text-slate-600 prose-p:text-base lg:prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900 prose-a:text-indigo-600 prose-a:font-black prose-a:no-underline hover:prose-a:underline"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}

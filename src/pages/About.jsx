import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Globe, ArrowRight, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/banner1.jpg";

export default function About() {
  return (
    <div className="bg-white min-h-screen font-urbanist overflow-hidden">
      <SEO 
        title="About Our Enterprise | MISTERPRINTER" 
        description="Operational standards and strategic vision behind MISTERPRINTER."
      />

      {/* --- COMPACT HERO --- */}
      <section className="py-8 lg:py-12 px-4 md:px-10 lg:px-16 border-b border-slate-200">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative group">
              <div className="border-2 border-slate-900 p-1.5 bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
                <img src={banner1} alt="Node" className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-10 order-1 lg:order-2 pl-0 lg:pl-20">
            <div className="flex items-center gap-4">
               <div className="bg-white border-2 border-slate-900 px-5 py-2 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                  <img src="/brands/hp.png" alt="HP" className="h-5 w-auto" />
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Authorized HP Partner</span>
               </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Strategic<br/>
                <span className="text-indigo-600">Enterprise.</span>
              </h1>
              <div className="h-1 w-20 bg-slate-900" />
            </div>

            <p className="text-slate-600 text-lg lg:text-xl font-bold leading-relaxed max-w-2xl border-l-8 border-indigo-600 pl-8">
              Orchestrating high-performance operational ecosystems through precision stewardship and direct authorized hardware channels.
            </p>

            <Link to="/shop" className="inline-block">
              <button className="h-14 px-12 bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1 group">
                VIEW REPOSITORY <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform inline-block" />
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* --- SYSTEM STANDARDS --- */}
      <section className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border-2 border-slate-900 shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
            {[
              { icon: <ShieldCheck size={24} />, title: "AUTHENTICITY", desc: "100% Genuine hardware verification." },
              { icon: <Zap size={24} />, title: "PERFORMANCE", desc: "Elite configurations for every workflow." },
              { icon: <Globe size={24} />, title: "LOGISTICS", desc: "Tracked international fulfillment hub." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 lg:p-14 group hover:bg-slate-50 transition-colors flex flex-col items-start text-left">
                <div className="text-indigo-600 mb-8 border-2 border-slate-900 p-3 bg-white group-hover:bg-slate-900 group-hover:text-white transition-all">{item.icon}</div>
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-3">{item.title}</h4>
                <p className="text-[13px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OBJECTIVES --- */}
      <section className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 bg-white border-b border-slate-200">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-900 border-2 border-slate-900 shadow-[15px_15px_0px_rgba(0,0,0,0.05)]">
          <div className="p-12 lg:p-20 bg-white group overflow-hidden relative">
             <div className="relative z-10 space-y-8">
                <div className="h-4" />
                <h3 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.8]">Empower<br/>Precision.</h3>
                <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-sm">Setting the benchmark for authorized professional hardware acquisition.</p>
                <div className="h-1.5 w-16 bg-slate-900 group-hover:w-full group-hover:bg-indigo-600 transition-all duration-700" />
             </div>
          </div>
          <div className="p-12 lg:p-20 bg-slate-50 group overflow-hidden relative">
             <div className="relative z-10 space-y-8">
                <div className="h-4" />
                <h3 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.8]">Global<br/>Stewardship.</h3>
                <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-sm">The primary gateway for enterprise-level technological ecosystems.</p>
                <div className="h-1.5 w-16 bg-slate-900 group-hover:w-full group-hover:bg-indigo-600 transition-all duration-700" />
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 bg-slate-50 border-t-2 border-slate-900">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-8 lg:p-12 bg-white border-2 border-slate-900 shadow-[10px_10px_0px_rgba(79,70,229,0.1)] relative overflow-hidden group flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 text-left">
              <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                Elite <span className="text-indigo-600">Performance.</span>
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 text-center md:text-left">Join the professional hardware network</p>
            </div>
            
            <div className="relative z-10">
              <Link to="/shop">
                <button className="h-12 px-8 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all border-2 border-slate-900 flex items-center gap-4 group/btn shadow-md active:shadow-none">
                  JOIN THE NETWORK <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>
    </div>
  );
}

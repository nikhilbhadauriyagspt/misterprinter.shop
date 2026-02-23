import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Heart, Globe, Award, Users, ChevronRight, Printer, Package, Wrench, Leaf, MapPin, Mail, Phone, ArrowUpRight, ArrowRight, Activity, Terminal, Layers, Box, Sparkles, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/banner1.jpg";
import { cn } from '../lib/utils';

export default function About() {
  return (
    <div className="bg-white min-h-screen font-urbanist overflow-hidden">
      <SEO 
        title="Our Enterprise Journey | EASYMYPRINT" 
        description="Learn about EASYMYPRINT, our vision to redefine tech experience, and our commitment as an authorized HP partner."
      />

      {/* --- ASYMMETRIC HERO --- */}
      <section className="relative py-24 lg:py-32 px-6 md:px-10 lg:px-16 bg-white overflow-hidden border-b border-slate-50">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl">
                  <img src="/brands/hp.png" alt="HP" className="h-4 w-auto object-contain brightness-200" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Official Partner</span>
               </div>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none border-l border-slate-200 pl-4">Est. 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black text-slate-950 leading-[0.85] tracking-tighter uppercase">
              <span className="block mb-4">REDEFINING</span>
              <span className="text-transparent stroke-text-light italic">EXCELLENCE.</span>
            </h1>

            <p className="text-slate-500 text-xl font-bold leading-relaxed max-w-2xl border-l-4 border-blue-600 pl-8">
              We curate high-performance hardware solutions for the modern era. EASYMYPRINT was established to bridge the gap between innovation and accessibility.
            </p>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <Link to="/shop">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-16 px-12 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-black/10 hover:bg-blue-600 transition-all duration-500 flex items-center gap-4 group"
                >
                  EXPLORE ARCHIVE <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Compact Sided Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[16/10] lg:aspect-square overflow-hidden rounded-[3.5rem] border-8 border-white shadow-[0_50px_100px_rgba(0,0,0,0.1)] group"
            >
              <img src={banner1} alt="Boutique Hardware" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
              
              {/* Floating Info */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-2xl">
                 <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] mb-1">Elite Stewardship</p>
                 <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">GLOBAL OPERATIONS.</h4>
              </div>
            </motion.div>
            {/* Decorative Background Glow */}
            <div className="absolute -inset-10 bg-blue-400/5 blur-[80px] rounded-full -z-10" />
          </div>

        </div>
      </section>

      {/* --- REFINED FOUNDATION --- */}
      <section className="py-24 lg:py-32 px-6 md:px-10 lg:px-16 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-12">
             <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Company Core</span>
             </div>
             <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
               Strategic <br /><span className="text-transparent stroke-text-light">Architecture.</span>
             </h2>
             <div className="space-y-8">
                <p className="text-lg font-bold text-slate-900 leading-relaxed uppercase tracking-tight max-w-lg">
                  EASYMYPRINT was established to bridge the gap in authorized hardware accessibility for enterprise-grade solutions.
                </p>
                <p className="text-base font-medium text-slate-500 leading-relaxed max-w-lg">
                  Established with a global vision, we have deployed a national network that ensures professionals have direct, secure access to precision-engineered units across the country.
                </p>
             </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 gap-4">
             {[
               { icon: <ShieldCheck size={24} />, title: "AUTHENTICITY STANDARD", desc: "100% genuine hardware verification protocol." },
               { icon: <Zap size={24} />, title: "PERFORMANCE HUB", desc: "Elite-tier professional configurations for every workflow." },
               { icon: <Globe size={24} />, title: "GLOBAL LOGISTICS", desc: "Tracked international fulfillment and delivery infrastructure." }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ x: 15 }}
                 className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-blue-100 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-blue-600/5 flex items-center gap-8"
               >
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-1">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-24 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-16 bg-slate-950 text-white rounded-[3.5rem] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Box size={150} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Our Objective</span>
                <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9]">Empowering <br /><span className="text-transparent stroke-text-white">Precision.</span></h3>
                <p className="text-slate-400 font-bold text-lg leading-relaxed max-w-sm">To provide the definitive framework for professional hardware through authorized acquisition.</p>
                <div className="h-1 w-12 bg-blue-600 rounded-full" />
             </div>
          </div>
          <div className="p-16 bg-blue-600 text-white rounded-[3.5rem] relative overflow-hidden group shadow-[0_40px_80px_rgba(37,99,235,0.2)]">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity text-white">
                <Globe size={150} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-100">Our Future</span>
                <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9]">Global <br />Stewardship.</h3>
                <p className="text-blue-50 font-bold text-lg leading-relaxed max-w-sm">To become the primary gateway for premium tech ecosystems, setting the benchmark for expert service.</p>
                <div className="h-1 w-12 bg-white/40 rounded-full" />
             </div>
          </div>
        </div>
      </section>

      {/* --- ADVANTAGE STRIP --- */}
      <section className="py-20 bg-slate-50 border-y border-slate-100 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-center gap-12 lg:gap-24 opacity-80">
           {[
             { title: "AUTHORIZED PARTNER", icon: ShieldCheck },
             { title: "EXPERT ADVISORY", icon: Zap },
             { title: "PRIORITY DISPATCH", icon: Package },
             { title: "SECURE LOGISTICS", icon: Globe }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 group cursor-default">
                <div className="h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-500 shadow-sm">
                   <item.icon size={20} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] group-hover:text-slate-900 transition-colors">{item.title}</span>
             </div>
           ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="px-6 md:px-10 lg:px-16 py-16 lg:py-24 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-12 lg:p-20 bg-slate-950 text-white relative overflow-hidden text-center rounded-[3rem] shadow-2xl group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_70%)] opacity-[0.1] group-hover:opacity-[0.15] transition-opacity duration-1000" />
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12 relative z-10 leading-none">
              Elite <br /><span className="text-transparent stroke-text-white italic">Performance.</span>
            </h2>
            <Link to="/shop" className="h-16 px-12 bg-white text-slate-950 hover:bg-blue-600 hover:text-white transition-all duration-500 font-black text-xs uppercase tracking-[0.3em] shadow-2xl relative z-10 inline-flex items-center gap-6 rounded-full group">
              JOIN THE CIRCLE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Styles for Stroke Text */}
      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
        .stroke-text-light {
          -webkit-text-stroke: 2px #0f172a;
          color: transparent;
        }
      `}</style>
    </div>
  );
}


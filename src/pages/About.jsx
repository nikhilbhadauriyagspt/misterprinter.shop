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
        title="Our Enterprise Journey | PrinterKicks" 
        description="Learn about PrinterKicks, our vision to redefine tech experience, and our commitment as an authorized HP partner."
      />

      {/* --- REFINED HERO --- */}
      <section className="relative h-[55vh] lg:h-[65vh] w-full flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src={banner1}
            alt="About Prime Fix"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />
        </div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                 <div className="flex items-center gap-2.5 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg">
                    <img src="/brands/hp.png" alt="HP" className="h-4 w-auto object-contain rounded brightness-200" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authorized Partner</span>
                 </div>
                 <div className="h-px w-8 bg-white/10" />
                 <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none">Established 2026</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-8">
                CORE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">SYSTEMS.</span>
              </h1>

              <Link to="/shop">
                <button className="h-14 px-10 bg-white text-slate-950 hover:bg-blue-600 hover:text-white transition-all duration-500 rounded-full font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 group">
                  EXPLORE CATALOG <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
              </Link>
            </motion.div>

            <div className="hidden lg:flex flex-col gap-8 border-l border-white/10 pl-12">
               {[
                 { label: "Deployments", value: "14K+", sub: "Assets" },
                 { label: "Hardware", value: "100%", sub: "Authentic" },
                 { label: "Support", value: "24/7", sub: "Global" }
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{stat.label}</span>
                    <span className="text-3xl font-black text-white tracking-tighter leading-none">{stat.value}</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.sub}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- HISTORY SECTION --- */}
      <section className="px-6 md:px-10 lg:px-16 py-16 lg:py-24 bg-white relative">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 relative">
             <div className="absolute -left-6 top-0 text-[12rem] font-black text-slate-50 leading-none pointer-events-none select-none -z-10">2026</div>
             <div className="flex items-center gap-3 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Strategic Origin</span>
             </div>
             <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] mb-10">
               OUR <span className="text-slate-400 italic">ARCHITECTURE.</span>
             </h2>
             <div className="space-y-8 max-w-lg">
                <p className="text-lg font-medium text-slate-500 leading-relaxed uppercase tracking-tight">
                  PrinterKicks was engineered to redefine the professional tech landscape. We observed a critical deficiency in authorized hardware accessibility.
                </p>
                <div className="h-px w-full bg-slate-100" />
                <p className="text-base font-bold text-slate-400 leading-relaxed">
                  Headquartered in Louisiana, we have deployed a national infrastructure that ensures professionals have direct access to precision-grade units.
                </p>
             </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 gap-px bg-slate-100 border border-slate-100 shadow-xl overflow-hidden">
             {[
               { icon: <ShieldCheck size={24} />, title: "AUTHENTICITY PROTOCOL", desc: "100% genuine hardware verification." },
               { icon: <Zap size={24} />, title: "PERFORMANCE SCALING", desc: "Elite-tier professional configurations." },
               { icon: <Globe size={24} />, title: "LOGISTICS NODE", desc: "Tracked nationwide delivery infrastructure." }
             ].map((item, i) => (
               <div key={i} className="bg-white p-8 hover:bg-slate-50 transition-all duration-500 group">
                  <div className="flex items-center gap-6">
                     <div className="h-12 w-12 bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">{item.icon}</div>
                     <div>
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight mb-1">{item.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- DIVISIONS GRID --- */}
      <section className="px-6 md:px-10 lg:px-16 py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase">Capabilities</span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              SPECIALIZED <span className="text-slate-400 italic">DIVISIONS.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Monitor, title: "Precision Output", sub: "PRO PRINTING" },
              { icon: Printer, title: "Print Infra", sub: "INFRASTRUCTURE" },
              { icon: Package, title: "Supply Chain", sub: "CONSUMABLES" },
              { icon: Terminal, title: "Tech Strategy", sub: "CONSULTING" },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-200 hover:border-blue-600/20 transition-all duration-500 group flex flex-col items-center text-center rounded-[1.5rem]">
                <div className="h-14 w-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-1">{item.title}</h3>
                <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STRATEGIC MISSION --- */}
      <section className="px-6 md:px-10 lg:px-16 py-16 lg:py-24 bg-white">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100 border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-12 lg:p-16 bg-white space-y-8 relative overflow-hidden group">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">MISSION_ALPHA</span>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.95]">EMPOWERING <br /><span className="text-slate-400">PRECISION.</span></h3>
            <p className="text-slate-500 font-medium text-base leading-relaxed max-w-sm uppercase tracking-tight">
              To provide the definitive infrastructure for professional tech retail via unauthorized asset management.
            </p>
            <div className="h-1 w-10 bg-blue-600" />
          </div>
          <div className="p-12 lg:p-16 bg-slate-900 text-white space-y-8 relative overflow-hidden group">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">VISION_BETA</span>
            <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.95]">NATIONAL <br /><span className="text-slate-600">COMMAND.</span></h3>
            <p className="text-slate-400 font-medium text-base leading-relaxed max-w-sm uppercase tracking-tight">
              To become the primary gateway for authorized tech ecosystems, setting the standard for expert service.
            </p>
            <div className="h-1 w-10 bg-white/20" />
          </div>
        </div>
      </section>

      {/* --- ADVANTAGE --- */}
      <section className="px-6 md:px-10 lg:px-16 py-16 bg-slate-50">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 border-b border-slate-200 pb-10">
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">Strategic Protocol</span>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                OUR <span className="text-slate-400 italic">ADVANTAGE.</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xs leading-relaxed uppercase tracking-tight">Authorized nodes, precision architects, and national infrastructure.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "AUTH PARTNER", icon: ShieldCheck },
              { title: "MULTI-VENDOR", icon: Globe },
              { title: "EXPERT GUIDANCE", icon: Zap },
              { title: "PRIORITY LOGISTICS", icon: Package },
              { title: "SECURE NODES", icon: ShieldCheck },
              { title: "CLIENT CARE", icon: Heart },
              { title: "SUSTAINABLE", icon: Leaf },
              { title: "PRO SUPPORT", icon: Wrench }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="h-10 w-10 border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 rounded-xl">
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.15em] leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="px-6 md:px-10 lg:px-16 py-16 lg:py-24 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-12 lg:p-24 bg-slate-950 text-white relative overflow-hidden text-center rounded-[3rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_70%)] opacity-[0.08]" />
            <span className="text-[10px] font-black tracking-[0.6em] uppercase text-blue-500 mb-8 block relative z-10">Access Operational Core</span>
            <h2 className="text-4xl lg:text-[6rem] font-black uppercase tracking-tighter mb-12 relative z-10 leading-none">
              ENGINEER <br /><span className="text-slate-600 italic">PERFORMANCE.</span>
            </h2>
            <Link to="/shop" className="h-16 px-12 bg-blue-600 text-white hover:bg-white hover:text-slate-950 transition-all duration-500 font-black text-[10px] uppercase tracking-[0.3em] shadow-xl relative z-10 inline-flex items-center gap-4 rounded-full group">
              ENTER CATALOG <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

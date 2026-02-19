import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search, ShieldCheck, Zap, Monitor, Cpu, Activity, Layout, Terminal, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

// Import local assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const slides = [
  {
    id: "ENT-01",
    tag: "HIGH-SPEED OUTPUT",
    title: "Enterprise",
    highlight: "Velocity.",
    desc: "HP LaserJet Enterprise. Engineered for high-load cycles and unmatched monochrome precision in demanding environments.",
    image: banner1,
    link: "/category/printers",
    specs: ["65 PPM", "DUAL-HEAD SCAN", "BIO-TONER"]
  },
  {
    id: "PRO-02",
    tag: "TECHNICAL PRECISION",
    title: "Master",
    highlight: "Graphics.",
    desc: "DesignJet Series. Delivering gallery-grade color accuracy and large-format reliability for architectural and creative firms.",
    image: banner2,
    link: "/category/printers",
    specs: ["2400 DPI", "10-INK SYSTEM", "WIDE-FORMAT"]
  },
  {
    id: "ECO-03",
    tag: "SUSTAINABLE NODES",
    title: "Infinite",
    highlight: "Efficiency.",
    desc: "HP Smart Tank. Cartridge-free high-capacity printing infrastructure designed for the modern, eco-conscious workspace.",
    image: banner3,
    link: "/category/printers",
    specs: ["2YR INK INCL.", "WI-FI SELF-HEAL", "ZERO WASTE"]
  },
  {
    id: "SEC-04",
    tag: "INFRASTRUCTURE",
    title: "Secure",
    highlight: "Workflows.",
    desc: "LaserJet Pro. Enterprise-grade security integrated into every layer of your printing infrastructure. Reliable. Fast. Pro.",
    image: banner4,
    link: "/category/printers",
    specs: ["WOLF PRO SEC", "60 PPM", "CLOUD SYNC"]
  }
];

export default function Hero() {
  const { openSearch } = useCart();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 9000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="bg-[#050505] px-0 font-urbanist">
      <section className="relative h-[75vh] lg:h-[85vh] w-full overflow-hidden bg-[#050505]">
        
        {/* --- TECHNICAL HUD OVERLAY --- */}
        <div className="absolute inset-0 z-20 pointer-events-none border-[20px] border-black hidden lg:block opacity-50">
           <div className="absolute top-0 left-0 w-20 h-px bg-blue-600" />
           <div className="absolute top-0 left-0 w-px h-20 bg-blue-600" />
           <div className="absolute top-0 right-0 w-20 h-px bg-blue-600" />
           <div className="absolute top-0 right-0 w-px h-20 bg-blue-600" />
           <div className="absolute bottom-0 left-0 w-20 h-px bg-blue-600" />
           <div className="absolute bottom-0 left-0 w-px h-20 bg-blue-600" />
           <div className="absolute bottom-0 right-0 w-20 h-px bg-blue-600" />
           <div className="absolute bottom-0 right-0 w-px h-20 bg-blue-600" />
        </div>

        {/* --- GEOMETRIC BACKGROUND --- */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? '100%' : '-100%', opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
            <img 
              src={slides[current].image} 
              alt="" 
              className="w-full h-full object-cover object-center grayscale opacity-60"
            />
            
            {/* Technical Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:40px_40px] opacity-20 z-10" />
          </motion.div>
        </AnimatePresence>

        {/* --- ASYMMETRIC CONTENT GRID --- */}
        <div className="relative z-30 h-full w-full max-w-[1920px] mx-auto flex items-stretch">
          
          {/* Main Info Block */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-10 overflow-hidden">
                  <motion.div 
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    className="h-px w-16 bg-blue-600 origin-left"
                  />
                  <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] flex items-center gap-3">
                    <Box size={14} /> {slides[current].tag}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-10 uppercase">
                  <span className="block">{slides[current].title}</span>
                  <span className="text-transparent stroke-text">{slides[current].highlight}</span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-12 border-l-2 border-white/5 pl-8 italic">
                  {slides[current].desc}
                </p>

                <div className="flex flex-wrap items-center gap-8">
                  <Link to={slides[current].link}>
                    <button className="h-16 px-12 bg-blue-600 hover:bg-white text-white hover:text-black font-black text-xs uppercase tracking-widest transition-all duration-500 group flex items-center gap-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10">INITIALIZE ACCESS</span>
                      <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </Link>
                  
                  <div className="flex items-center gap-6">
                     <div className="h-12 w-px bg-white/10" />
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-white p-1.5 flex items-center justify-center">
                           <img src="/brands/hp.png" alt="HP" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Official</span>
                           <span className="text-xs font-black text-white uppercase tracking-tight">Authorized HP Partner</span>
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Action/Spec Panel - HIGH FIDELITY HUD REDESIGN */}
          <div className="hidden min-[1400px]:flex flex-col w-[480px] border-l border-white/10 justify-center p-16 bg-slate-950/40 backdrop-blur-3xl relative overflow-hidden group/panel">
             
             {/* Dynamic Background Scanning Line */}
             <motion.div 
               animate={{ y: ['-100%', '100%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent pointer-events-none z-0"
             />

             <div className="space-y-16 relative z-10">
                <div>
                   <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-4">
                         <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                         <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em]">System Diagnostics</p>
                      </div>
                   </div>
                   
                   <AnimatePresence mode="wait">
                     <div className="space-y-5">
                        {slides[current].specs.map((spec, i) => (
                          <motion.div 
                            key={spec + current}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                            className="group/item relative"
                          >
                             {/* Technical Card Component */}
                             <div className="relative p-7 bg-white/[0.03] border border-white/5 group-hover/item:border-blue-600/50 transition-all duration-500 overflow-hidden">
                                
                                {/* Background Highlight */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover/item:via-blue-600/[0.05] transition-all duration-700" />

                                <div className="relative flex items-center justify-between">
                                   <div className="flex items-center gap-8">
                                      <div className="flex flex-col">
                                         <span className="text-[8px] font-mono text-blue-600 mb-1">NODE_0{i+1}</span>
                                         <span className="text-[14px] font-black text-white uppercase tracking-[0.2em]">{spec}</span>
                                      </div>
                                   </div>
                                   
                                   <div className="flex flex-col items-end">
                                      <Activity size={14} className="text-blue-600/20 group-hover/item:text-blue-600 group-hover/item:animate-pulse transition-colors" />
                                      <span className="text-[7px] font-black text-white/10 uppercase mt-2 tracking-widest">Verified</span>
                                   </div>
                                </div>

                                {/* Micro HUD Accent Brackets */}
                                <div className="absolute top-0 right-0 w-2 h-[1px] bg-blue-600 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                <div className="absolute top-0 right-0 w-[1px] h-2 bg-blue-600 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                             </div>
                          </motion.div>
                        ))}
                     </div>
                   </AnimatePresence>
                </div>

                {/* Global Command Interface */}
                <div className="pt-16 border-t border-white/10">
                   <div className="flex items-center justify-between mb-8 px-2">
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Inventory Query Hub</span>
                      <Terminal size={12} className="text-white/10" />
                   </div>
                   
                   <button 
                     onClick={openSearch}
                     className="w-full h-20 bg-white text-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-700 rounded-none flex items-center justify-between px-10 group shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden"
                   >
                      <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      
                      <div className="relative z-10 flex items-center gap-5">
                         <div className="h-2 w-2 rounded-full bg-blue-600 group-hover:bg-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                         <span className="text-[11px] font-black uppercase tracking-[0.4em]">Execute Database Search</span>
                      </div>
                      
                      <div className="relative z-10 h-10 w-10 rounded-full border border-slate-200 group-hover:border-white/20 flex items-center justify-center group-hover:rotate-90 transition-all duration-700">
                         <Search size={20} strokeWidth={2.5} />
                      </div>
                   </button>
                   
                   <p className="mt-6 text-[8px] font-mono text-white/10 uppercase tracking-[0.5em] text-center">Protocol: AES_256 // END_TO_END_ENCRYPTION</p>
                </div>
             </div>
          </div>
        </div>

        {/* --- BOTTOM SYSTEM BAR --- */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black flex items-center justify-center px-12 z-40 border-t border-white/5">
           <div className="flex items-center gap-4">
              <button onClick={prevSlide} className="h-10 w-10 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                 <ChevronLeft size={18} />
              </button>
              
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      current === i ? "w-8 bg-blue-600" : "w-2 bg-white/20"
                    )} 
                  />
                ))}
              </div>

              <button onClick={nextSlide} className="h-10 w-10 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                 <ChevronRight size={18} />
              </button>
           </div>
        </div>

        <style>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255,255,255,0.3);
            color: transparent;
          }
        `}</style>

      </section>
    </div>
  );
}

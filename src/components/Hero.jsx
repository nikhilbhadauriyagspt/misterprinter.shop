import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Cpu, Activity, Zap, Layers, MousePointer2, ShieldCheck, Box, Globe, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

// Import local assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const slides = [
  {
    id: "NXT-01",
    tag: "INDUSTRIAL PRECISION",
    title: "Quantum",
    highlight: "Series.",
    desc: "Experience the next evolution in high-performance printing. Engineered for enterprise-level reliability and unmatched output speed.",
    image: banner1,
    link: "/shop",
    features: [
      { icon: <ShieldCheck size={18} />, label: "Security", val: "AES-256" },
      { icon: <Zap size={18} />, label: "Performance", val: "90 PPM" },
      { icon: <Layers size={18} />, label: "Resolution", val: "4800 DPI" }
    ]
  },
  {
    id: "VIS-02",
    tag: "CREATIVE ENGINE",
    title: "Chroma",
    highlight: "Master.",
    desc: "Tailored for visionary designers and architects. Deliver museum-grade color fidelity with our wide-format precision technology.",
    image: banner2,
    link: "/shop",
    features: [
      { icon: <Box size={18} />, label: "Ink System", val: "12-Color" },
      { icon: <MousePointer2 size={18} />, label: "Interface", val: "Smart UI" },
      { icon: <Activity size={18} />, label: "Workflow", val: "Pro Sync" }
    ]
  },
  {
    id: "SMR-03",
    tag: "SMART CONNECTIVITY",
    title: "Nimbus",
    highlight: "Cloud.",
    desc: "Seamlessly bridge the gap between digital and physical. Intelligent wireless ecosystems for the modern hybrid workspace.",
    image: banner3,
    link: "/shop",
    features: [
      { icon: <Globe size={18} />, label: "Network", val: "5G Ready" },
      { icon: <Workflow size={18} />, label: "Automation", val: "Self-Fix" },
      { icon: <Cpu size={18} />, label: "Logic", val: "AI Core" }
    ]
  },
  {
    id: "ULT-04",
    tag: "MAX ENDURANCE",
    title: "Titan",
    highlight: "Heavy.",
    desc: "Built for high-volume environments that never sleep. Heavy-duty construction meeting the most demanding business cycles.",
    image: banner4,
    link: "/shop",
    features: [
      { icon: <Zap size={18} />, label: "Duty Cycle", val: "Infinite" },
      { icon: <Layers size={18} />, label: "Capacity", val: "5K Sheets" },
      { icon: <ShieldCheck size={18} />, label: "Armor", val: "V-Pro" }
    ]
  }
];

export default function Hero() {
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
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="bg-white font-urbanist relative overflow-hidden">
      <section className="relative h-[85vh] w-full flex border-b-2 border-slate-900 flex-col lg:flex-row">
        
        {/* --- LEFT: VISUAL PANEL --- */}
        <div className="relative flex-1 overflow-hidden group lg:border-r-2 border-slate-900 h-1/2 lg:h-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? "-100%" : "100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-slate-900/10 z-10 mix-blend-multiply" />
              <img 
                src={slides[current].image} 
                alt="" 
                className="w-full h-full object-cover transition-all duration-700"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls - Minimalist Lighter Design */}
          <div className="absolute bottom-8 left-8 z-40 flex gap-2">
             <button 
               onClick={prevSlide} 
               className="h-12 w-12 bg-white/80 backdrop-blur-md text-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center border border-slate-900 group shadow-lg"
             >
                <ChevronLeft size={20} strokeWidth={2.5} />
             </button>
             <button 
               onClick={nextSlide} 
               className="h-12 w-12 bg-white/80 backdrop-blur-md text-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center border border-slate-900 group shadow-lg"
             >
                <ChevronRight size={20} strokeWidth={2.5} />
             </button>
          </div>
        </div>

        {/* --- RIGHT: INTERACTIVE CONTENT --- */}
        <div className="w-full lg:w-[600px] xl:w-[700px] bg-white z-20 flex flex-col relative h-1/2 lg:h-full">
          
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.3em]">
                    {slides[current].tag}
                  </span>
                  <div className="h-[2px] w-12 bg-indigo-600" />
                </div>

                <div className="flex flex-col mb-12 lg:mb-16">
                  <h2 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">
                    {slides[current].title}
                  </h2>
                  <h1 className="text-7xl lg:text-[120px] font-black text-indigo-600 leading-[0.75] tracking-tighter uppercase relative">
                    {slides[current].highlight}
                  </h1>
                </div>

                <p className="text-slate-500 text-base lg:text-lg font-bold leading-relaxed max-w-lg mb-8 lg:mb-12 border-l-4 border-slate-900 pl-6 lg:pl-8">
                  {slides[current].desc}
                </p>

                {/* Refined Feature Grid */}
                <div className="grid grid-cols-3 gap-px mb-8 lg:mb-12 bg-slate-100 border border-slate-200">
                   {slides[current].features.map((feat, i) => (
                     <div key={i} className="bg-white p-4 lg:p-6 flex flex-col gap-3 group hover:bg-slate-50 transition-colors">
                        <div className="text-indigo-600 transition-transform group-hover:scale-110 origin-left">
                          {feat.icon}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest">{feat.label}</span>
                           <span className="text-[11px] lg:text-[13px] font-black text-slate-900 uppercase tracking-tight">{feat.val}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-4 lg:gap-6">
                  <Link to={slides[current].link} className="flex-1">
                    <button className="w-full h-14 lg:h-16 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-indigo-600 flex items-center justify-between px-8 lg:px-10 border-2 border-slate-900 group">
                      <span>SHOP COLLECTION</span>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-4 px-6 lg:px-8 h-14 lg:h-16 border-2 border-slate-900 bg-white min-w-[240px]">
                     <img src="/brands/hp.png" alt="HP" className="h-6 w-auto" />
                     <div className="h-6 w-[2px] bg-slate-900" />
                     <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">Authorized<br/>HP Partner</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </section>
    </div>
  );
}

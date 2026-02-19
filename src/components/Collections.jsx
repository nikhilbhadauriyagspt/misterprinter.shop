import { motion } from "framer-motion";
import { Printer, ChevronRight, ArrowRight, Settings, Box, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import local assets
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 lg:py-16 bg-white font-urbanist relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:40px_40px] opacity-50 pointer-events-none" />
      
      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <div className="relative z-10 flex flex-col items-center text-center mb-20">
        <div className="max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase">Premium Selection</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            SHOP BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">DEPARTMENT.</span>
          </h2>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-1 bg-slate-100 border border-slate-100">
        
        {/* --- PRINTER MODULE --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="group relative h-[500px] lg:h-[650px] overflow-hidden bg-white"
        >
          {/* Technical HUD Frame */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-600 z-20 m-8 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-600 z-20 m-8 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          <div className="absolute top-8 left-8 z-20">
          </div>

          <div className="absolute inset-0 w-full h-full">
            <img 
              src={printerCat} 
              alt="Premium Printers"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-90 grayscale-[0.5] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
          </div>

          <div className="absolute bottom-12 left-12 right-12 z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
               <div className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center shadow-2xl">
                  <Printer size={18} strokeWidth={1.5} />
               </div>
               <div className="h-[1px] w-12 bg-slate-900/20" />
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Enterprise Printing</span>
            </div>

            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 uppercase leading-[0.85]">
              PRINTER <br /><span className="text-purple-600 italic">SOLUTIONS.</span>
            </h3>
            
            <p className="text-slate-500 text-sm md:text-base font-bold max-w-md mx-auto mb-10 leading-relaxed uppercase tracking-tight">
              PRECISION SCANNING AND HIGH-SPEED SECURE PRINTING NODES FOR ENTERPRISE WORKFLOWS.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/shop?category=printers">
                <button className="h-14 px-10 bg-slate-900 text-white hover:bg-purple-600 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-4 shadow-2xl">
                  VIEW CATALOG <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* Side Status Bar */}
          <div className="absolute right-0 top-0 h-full w-1.5 bg-slate-50 overflow-hidden">
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: '100%' }}
               transition={{ duration: 2 }}
               className="w-full bg-purple-600/20"
             />
          </div>
        </motion.div>

      </div>

      {/* Global Bottom Status Row */}
      <div className="mt-16 flex items-center justify-center px-2">
         <div className="h-px flex-1 bg-slate-100" />
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

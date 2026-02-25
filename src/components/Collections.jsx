import { motion } from "framer-motion";
import { Printer, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import local assets
import printerCat from "@/assets/category/printer_cat.jpg";
import { cn } from "../lib/utils";

export default function Collections() {
  return (
    <section className="bg-white font-urbanist relative overflow-hidden py-20 lg:py-32 border-b border-slate-200">
      
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: CONTENT --- */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="h-px w-8 bg-indigo-600" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Curated Node</span>
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                  Elite<br/>
                  <span className="text-indigo-600">Performance.</span>
                </h3>

                <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-lg border-l-4 border-slate-900 pl-8">
                  Unlock superior efficiency with our curated range of enterprise-grade hardware, specifically engineered to optimize your critical business workflows.
                </p>
              </div>

              <div className="flex pt-4">
                <Link to="/shop?category=printers" className="w-full sm:w-auto">
                  <button className="h-16 px-12 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-indigo-600 flex items-center justify-between gap-10 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1 border-2 border-slate-900">
                    VIEW COLLECTION
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: VISUAL --- */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <div className="relative border-2 border-slate-900 p-2 lg:p-4 bg-white shadow-[12px_12px_0px_rgba(0,0,0,0.05)]">
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[16/10] overflow-hidden bg-slate-100 group"
              >
                <img 
                  src={printerCat} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                  alt="Printer Excellence" 
                />
                
                {/* Floating Badge - Square */}
                <div className="absolute top-8 right-8 p-6 bg-slate-900 text-white border-2 border-white/20 z-20 hidden md:block group-hover:bg-indigo-600 transition-colors">
                   <div className="flex flex-col items-center gap-2">
                      <Printer size={24} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Series X Pro</span>
                   </div>
                </div>

                {/* Bottom Overlay - Square */}
                <Link to="/shop?category=printers" className="absolute bottom-0 left-0 right-0 p-1 bg-white/90 backdrop-blur-md border-t-2 border-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 block z-30">
                   <div className="flex items-center justify-between px-8 py-6">
                      <div className="flex items-center gap-6">
                         <div className="h-2 w-2 bg-indigo-600 group-hover:bg-white animate-pulse" />
                         <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Authenticated</p>
                            <h4 className="text-lg lg:text-xl font-black uppercase tracking-tighter">Premium Print Architecture</h4>
                         </div>
                      </div>
                      <div className="h-10 w-10 border-2 border-slate-900 group-hover:border-white flex items-center justify-center transition-all">
                         <ArrowUpRight size={20} />
                      </div>
                   </div>
                </Link>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

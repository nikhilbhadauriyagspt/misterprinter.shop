import { motion } from "framer-motion";
import { Laptop, Printer, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import local assets
import laptopCat from "@/assets/category/laptop_cat.jpg";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 bg-white font-urbanist">
      
      {/* --- REFINED HEADING --- */}
      <div className="flex items-end justify-between mb-8 md:mb-12 border-b border-gray-100 pb-6 md:pb-8">
        <div>
          <span className="text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Curated Series</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Shop by <span className="text-slate-400 italic">Department.</span>
          </h2>
        </div>
        <Link to="/shop" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 hover:text-blue-600 transition-colors pb-1">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* --- LAPTOP CATEGORY --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative h-[400px] md:h-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-500 hover:border-blue-500/30"
        >
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={laptopCat} 
              alt="Premium Laptops"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 shadow-none"
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80" />
          </div>

          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-lg md:rounded-xl bg-blue-600 text-white text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase mb-3 md:mb-4">
              <Laptop size={12} md:size={14} /> High-End Computing
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2 md:mb-4 uppercase leading-none">
              LAPTOP <br /><span className="text-blue-600 italic">SERIES.</span>
            </h3>
            <p className="text-slate-600 text-sm md:text-lg font-bold max-w-xs mb-6 md:mb-8 leading-relaxed">
              From ultra-thin portables to heavy-duty gaming rigs.
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              <Link to="/category/laptop-computers">
                <Button size="lg" className="bg-black hover:bg-blue-600 text-white rounded-xl md:rounded-2xl px-6 md:px-10 h-12 md:h-14 font-black text-[10px] md:text-xs tracking-widest transition-all shadow-2xl shadow-black/10">
                  EXPLORE MODELS
                </Button>
              </Link>
              <Link to="/category/laptop-computers" className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm">
                <ChevronRight size={20} md:size={24} className="text-black" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- PRINTER CATEGORY --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative h-[400px] md:h-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-500 hover:border-purple-500/30"
        >
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={printerCat} 
              alt="Premium Printers"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 shadow-none"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80" />
          </div>

          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-lg md:rounded-xl bg-purple-600 text-white text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase mb-3 md:mb-4">
              <Printer size={12} md:size={14} /> Professional Printing
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2 md:mb-4 uppercase leading-none">
              PRINTER <br /><span className="text-purple-600 italic">SOLUTIONS.</span>
            </h3>
            <p className="text-slate-600 text-sm md:text-lg font-bold max-w-xs mb-6 md:mb-8 leading-relaxed">
              Precision scanning and high-speed printing solutions.
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              <Link to="/category/printers">
                <Button size="lg" className="bg-black hover:bg-purple-600 text-white rounded-xl md:rounded-2xl px-6 md:px-10 h-12 md:h-14 font-black text-[10px] md:text-xs tracking-widest transition-all shadow-2xl shadow-black/10">
                  VIEW CATALOG
                </Button>
              </Link>
              <Link to="/category/printers" className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-purple-200 transition-all shadow-sm">
                <ChevronRight size={20} md:size={24} className="text-black" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

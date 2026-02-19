import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Hash, Box, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  // Flatten categories to show all sub-categories and filter out laptops
  const subcategories = categories
    .filter(parent => 
      !parent.name.toLowerCase().includes('laptop') && 
      !parent.slug.toLowerCase().includes('laptop') &&
      !parent.name.toLowerCase().includes('chromebook')
    )
    .flatMap(parent => parent.children || [])
    .filter(sub => 
      !sub.name.toLowerCase().includes('laptop') && 
      !sub.slug.toLowerCase().includes('laptop') &&
      !sub.name.toLowerCase().includes('chromebook')
    );

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 lg:py-16 bg-white font-urbanist relative overflow-hidden">
      {/* Background Micro-Grid for Industrial Feel */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      
      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <div className="relative z-10 flex flex-col items-center text-center mb-20 gap-8">
        <div className="max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.6em] uppercase text-blue-600 block">
              CATALOGUE INFRASTRUCTURE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">PURPOSE.</span>
          </h2>
        </div>
        
        {/* HUD Styled Navigation Nodes */}
        <div className="flex items-center gap-4">
           <button className="swiper-prev-btn h-14 w-14 border-2 border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all duration-500 group shadow-lg cursor-pointer">
              <ChevronLeft size={24} className="group-active:scale-75 transition-transform" />
           </button>
           <button className="swiper-next-btn h-14 w-14 border-2 border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all duration-500 group shadow-lg cursor-pointer">
              <ChevronRight size={24} className="group-active:scale-75 transition-transform" />
           </button>
        </div>
      </div>

      {/* --- KINETIC CATEGORY GRID --- */}
      <div className="relative z-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={1} // Tight grid lines
          slidesPerView={1.5}
          navigation={{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4 },
            1440: { slidesPerView: 5 },
          }}
          className="!overflow-visible"
        >
          {subcategories.map((item, i) => (
            <SwiperSlide key={item.id} className="h-full">
              <Link to={`/shop?category=${item.slug}`}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col border border-slate-100 bg-white hover:z-20 transition-all duration-700 h-[500px]"
                >
                  {/* Formal Category Identifier */}
                  <div className="absolute top-0 left-0 p-8 flex justify-between w-full items-start z-20">
                    <div className="h-8 w-8 rounded-lg border border-slate-50 flex items-center justify-center group-hover:border-blue-600/30 transition-all group-hover:rotate-90">
                       <Box size={14} className="text-slate-200 group-hover:text-blue-600" />
                    </div>
                  </div>

                  {/* Image Showcase */}
                  <div className="relative flex-1 overflow-hidden p-12 pt-28 flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="relative z-10 w-full aspect-square"
                    >
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 group-hover:drop-shadow-[0_20px_40px_rgba(37,99,235,0.15)]"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </motion.div>
                  </div>

                  {/* Info Block */}
                  <div className="p-8 border-t border-slate-50 bg-white relative z-10 group-hover:bg-slate-900 transition-colors duration-500">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-white uppercase tracking-tighter transition-colors duration-500 leading-tight">
                          {item.name}
                        </h3>
                        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                           <ArrowUpRight size={18} />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="h-[1px] w-0 group-hover:w-12 bg-blue-600 transition-all duration-700" />
                        <span className="text-[9px] font-black text-slate-400 group-hover:text-blue-400 uppercase tracking-[0.4em] transition-colors">
                          EXPLORE PORTFOLIO
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Accents */}
                  <div className="absolute top-0 right-0 w-[2px] h-0 group-hover:h-full bg-blue-600 transition-all duration-700" />
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-20 flex items-center gap-8">
         <div className="h-px flex-1 bg-slate-100" />
         <div className="h-px flex-1 bg-slate-100" />
      </div>

    </section>
  );
}

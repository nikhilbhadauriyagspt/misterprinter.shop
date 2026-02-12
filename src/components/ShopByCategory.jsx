import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  // Flatten categories to show all sub-categories
  const subcategories = categories.flatMap(parent => parent.children || []);

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  const colors = [
    "bg-blue-50/50", "bg-indigo-50/50", "bg-purple-50/50", 
    "bg-emerald-50/50", "bg-orange-50/50", "bg-rose-50/50", 
    "bg-cyan-50/50", "bg-slate-50/50"
  ];

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 bg-white font-urbanist relative group">
      
      {/* --- REFINED HEADING --- */}
      <div className="flex items-end justify-between mb-8 md:mb-12 border-b border-gray-100 pb-6 md:pb-8">
        <div>
          <span className="text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Browse Catalog</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Choose Your <span className="text-slate-400 italic">Purpose.</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
           <button className="swiper-prev-btn h-9 w-9 md:h-11 md:w-11 rounded-full border border-gray-100 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm">
              <ChevronLeft size={16} md:size={18} />
           </button>
           <button className="swiper-next-btn h-9 w-9 md:h-11 md:w-11 rounded-full border border-gray-100 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm">
              <ChevronRight size={16} md:size={18} />
           </button>
        </div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={12}
          slidesPerView={2.2}
          navigation={{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn',
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3.2, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1440: { slidesPerView: 6, spaceBetween: 20 },
          }}
          className="pb-4"
        >
          {subcategories.map((item, i) => (
            <SwiperSlide key={item.id}>
              <Link to={`/category/${item.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`group flex flex-col items-center p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 ${colors[i % colors.length]} transition-all duration-500 cursor-pointer hover:bg-white h-full`}
                >
                  {/* Image Sphere */}
                  <div className="relative w-full aspect-square mb-4 md:mb-8">
                    <div className="absolute inset-0 bg-white/50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700 blur-2xl opacity-0 group-hover:opacity-100" />
                    <img 
                      src={getImagePath(item.image)} 
                      alt={item.name}
                      className="relative z-10 w-full h-full object-contain rounded-full transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                    />
                  </div>

                  {/* Labels */}
                  <div className="text-center w-full">
                    <h3 className="text-[11px] md:text-[13px] font-black text-slate-900 uppercase tracking-tight mb-1 leading-tight group-hover:text-blue-600 transition-colors h-7 md:h-8 flex items-center justify-center line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                      Explore
                    </p>
                  </div>

                  {/* Hover Action Arrow */}
                  <div className="mt-4 md:mt-6 h-7 w-7 md:h-8 md:w-8 rounded-full bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={12} md:size={14} />
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}
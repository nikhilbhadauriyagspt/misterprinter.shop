import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
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
    <section className="px-4 md:px-10 lg:px-16 py-10 lg:py-14 bg-white font-urbanist border-b border-slate-100">
      
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-indigo-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Inventory Nodes</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter">
              Shop By <span className="text-indigo-600">Category</span>
            </h2>
          </div>
          
          <div className="flex gap-2">
             <button className="category-prev h-10 w-10 bg-white border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center group shadow-sm">
                <ChevronLeft size={18} strokeWidth={2.5} />
             </button>
             <button className="category-next h-10 w-10 bg-white border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center group shadow-sm">
                <ChevronRight size={18} strokeWidth={2.5} />
             </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2.5}
            navigation={{
              prevEl: '.category-prev',
              nextEl: '.category-next',
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 4.2 },
              1024: { slidesPerView: 6.5 },
              1440: { slidesPerView: 8.5 },
            }}
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/shop?category=${item.slug}`} className="block group">
                  <div className="flex flex-col items-center gap-3">
                    
                    {/* Enlarged Image Area with Narrower Width */}
                    <div className="w-full aspect-[4/5] bg-slate-50 border border-slate-100 group-hover:border-indigo-600 transition-all duration-500 flex items-center justify-center p-4 overflow-hidden relative">
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 scale-90 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500" />
                    </div>

                    {/* Text Area */}
                    <div className="text-center w-full">
                      <h3 className="text-[10px] lg:text-[11px] font-black text-slate-900 uppercase tracking-tight truncate group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

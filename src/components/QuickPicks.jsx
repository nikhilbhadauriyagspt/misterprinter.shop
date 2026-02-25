import { motion } from "framer-motion";
import { Plus, ArrowRight, Check, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import 'swiper/css';

export default function QuickPicks({ products = [] }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  
  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-4 md:px-10 lg:px-16 py-16 lg:py-24 bg-white font-urbanist relative overflow-hidden border-b border-slate-200">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-indigo-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Essential Support</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              System<br/>
              <span className="text-indigo-600">Quick Picks.</span>
            </h2>
          </div>
          
          <div className="flex border-2 border-slate-900 mb-1">
             <button className="qp-prev h-12 w-12 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center border-r-2 border-slate-900 group shadow-sm cursor-pointer">
                <ChevronLeft size={20} strokeWidth={2.5} />
             </button>
             <button className="qp-next h-12 w-12 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center group shadow-sm cursor-pointer">
                <ChevronRight size={20} strokeWidth={2.5} />
             </button>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1.2}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{ prevEl: '.qp-prev', nextEl: '.qp-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1600: { slidesPerView: 5 },
            }}
            className="border-2 border-slate-900 !overflow-visible lg:!overflow-hidden"
          >
            {products.slice(0, 15).map((p) => (
              <SwiperSlide key={p.id}>
                <div className="relative bg-white border-r-2 border-slate-900 h-[450px] flex flex-col group overflow-hidden transition-colors hover:bg-slate-50">
                  
                  {/* Image Area */}
                  <div className="relative h-[220px] flex items-center justify-center p-8 bg-slate-50 group-hover:bg-white transition-colors duration-500">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-1 p-8 border-t-2 border-slate-900 flex flex-col bg-white">
                    <div className="flex items-center justify-between mb-3">
                       <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    </div>

                    <Link to={`/product/${p.slug || p.id}`} className="flex-1">
                      <h4 className="text-[16px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{p.name}</h4>
                    </Link>
                    
                    <div className="mt-6 flex items-center justify-between">
                       <p className="text-2xl font-black text-slate-900 tracking-tighter">${p.price}</p>
                       <button 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          addToCart(p);
                        }}
                        className={cn(
                          "h-12 w-12 border-2 flex items-center justify-center transition-all duration-500",
                          cart.find(i => i.id === p.id) 
                            ? "bg-emerald-500 text-white border-emerald-500 shadow-[4px_4px_0px_rgba(16,185,129,0.2)]" 
                            : "bg-slate-900 text-white border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                        )}
                      >
                        {cart.find(i => i.id === p.id) ? <Check size={20} strokeWidth={3} /> : <Plus size={24} />}
                      </button>
                    </div>
                  </div>

                  {/* Link Overlay */}
                  <Link to={`/product/${p.slug || p.id}`} className="absolute inset-0 z-0" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

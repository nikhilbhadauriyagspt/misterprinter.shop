import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check, ShoppingBag, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

import 'swiper/css';

export default function BestSellers({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 lg:py-16 bg-white font-urbanist relative overflow-hidden">
      
      {/* --- REFINED MINIMALIST HEADER --- */}
      <div className="relative z-10 flex flex-col items-center text-center mb-20">
        <div className="max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase">Premium Catalog</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Best Sellers.
          </h2>
          <div className="mt-6 h-1 w-12 bg-blue-600 mx-auto" />
        </div>
        
        {/* Professional Navigation Nodes */}
        <div className="flex items-center gap-2 mt-12">
           <button className="bs-prev h-12 w-12 border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all cursor-pointer group">
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
           </button>
           <button className="bs-next h-12 w-12 border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all cursor-pointer group">
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
           </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0} // Continuous grid look
        slidesPerView={1.2}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
          1600: { slidesPerView: 5 },
        }}
        className="!overflow-visible border border-slate-100"
      >
        {products.map((p) => (
            <SwiperSlide key={p.id}>
              <motion.div 
                className="bg-white border-r border-slate-100 p-8 transition-all duration-500 hover:z-10 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group h-full flex flex-col relative border-y border-slate-50"
              >
                {/* Wishlist - Absolute Positioned */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-6 right-6 z-20 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300",
                    isInWishlist(p.id) ? "text-red-500 opacity-100" : "text-slate-300 hover:text-red-500"
                  )}
                >
                  <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2} />
                </button>

                <Link to={`/product/${p.slug}`} className="flex-1">
                  <div className="relative aspect-square overflow-hidden mb-8 flex items-center justify-center">
                    <img 
                      src={getImagePath(p.images)} 
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
                      alt={p.name} 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{p.brand_name || 'HP Authorized'}</span>
                    </div>
                    <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight line-clamp-3 leading-[1.1] min-h-[3.3rem]">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                       <span className="text-2xl font-black text-slate-900">${p.price}</span>
                    </div>
                  </div>
                </Link>

                {/* Bottom Action Area - Appears on Hover */}
                <div className="mt-8 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "w-full h-12 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                      addedItems[p.id] 
                        ? "bg-emerald-500 text-white" 
                        : "bg-slate-900 text-white hover:bg-blue-600"
                    )}
                  >
                    {addedItems[p.id] ? (
                      <><Check size={14} strokeWidth={3} /> Added to Cart</>
                    ) : (
                      <><ShoppingBag size={14} /> Add to Cart</>
                    )}
                  </button>
                  <Link 
                    to={`/product/${p.slug}`}
                    className="w-full h-10 flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors mt-2"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-20 flex items-center justify-end border-t border-slate-100 pt-10">
           <Link to="/shop" className="text-[10px] font-black text-slate-900 hover:text-blue-600 uppercase tracking-widest transition-colors flex items-center gap-2">
              Browse Entire Store <ArrowRight size={14} />
           </Link>
        </div>
      </section>
    );
}

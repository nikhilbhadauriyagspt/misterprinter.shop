import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ChevronLeft, Plus, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-20 w-20 bg-slate-50 border-2 border-slate-200 flex items-center justify-center mb-8 shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
          <Heart size={32} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Wishlist Empty.</h2>
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-12 italic">Your professional curation awaits its first entry.</p>
        <Link to="/shop">
          <button className="h-14 px-12 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-indigo-600 border-2 border-slate-900 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            INITIALIZE DISCOVERY <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24 pb-20 font-urbanist">
      
      {/* --- PAGE HEADER --- */}
      <div className="py-12 lg:py-16 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50 mb-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-indigo-600" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Curated Node</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Saved<br/>
                <span className="text-indigo-600">Inventory.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-3 border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
               <div className="h-2 w-2 bg-red-500 animate-pulse" />
               <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">{wishlistCount} Units Marked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        {/* --- GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px border border-slate-900 bg-slate-900 shadow-[12px_12px_0px_rgba(0,0,0,0.05)]">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative bg-white p-6 flex flex-col h-[480px] transition-colors hover:bg-slate-50"
              >
                {/* Wishlist Removal */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-4 right-4 z-20 h-10 w-10 border-2 border-slate-900 bg-slate-900 text-white flex items-center justify-center transition-all hover:bg-red-600 hover:border-red-600 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none"
                >
                  <Trash2 size={18} strokeWidth={2.5} />
                </button>

                {/* Product Visual */}
                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative h-[200px] mb-8 flex items-center justify-center p-4">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{p.brand_name || 'AUTHORIZED'}</span>
                    <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                      {p.name}
                    </h3>
                    <div className="pt-4">
                      <span className="text-2xl font-black text-slate-950 tracking-tighter">${p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>

                {/* Actions */}
                <div className="mt-8 border-t-2 border-slate-900 pt-6">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full h-12 border-2 bg-slate-900 text-white border-slate-900 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    <Plus size={16} strokeWidth={3} />
                    ADD TO SYSTEM
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <Link to="/shop">
            <button className="h-12 px-8 border-2 border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              CONTINUE BROWSING
            </button>
          </Link>
          <div className="flex items-center gap-10 opacity-40">
             <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-slate-900" />
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Secured Node</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

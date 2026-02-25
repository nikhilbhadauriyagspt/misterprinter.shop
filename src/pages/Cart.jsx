import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-20 w-20 bg-slate-50 border-2 border-slate-200 flex items-center justify-center mb-8 shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
          <ShoppingBag size={32} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Cart Empty</h2>
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-12 italic">System awaits selection initialization.</p>
        <Link to="/shop">
          <button className="h-14 px-12 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-indigo-600 border-2 border-slate-900 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            ACCESS CATALOG <ArrowRight size={16} />
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
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Active Manifest</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Shopping<br/>
                <span className="text-indigo-600">Inventory.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-3 border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
               <div className="h-2 w-2 bg-emerald-500 animate-pulse" />
               <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">{cartCount} Units Reserved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- ITEMS LIST --- */}
          <div className="lg:col-span-8 space-y-px bg-slate-200 border-2 border-slate-900 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 group relative"
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 bg-slate-50 border-2 border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:border-slate-900 transition-colors">
                    <img 
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                      alt={item.name}
                      className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <div className="flex flex-col mb-6">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">{item.brand_name || 'AUTHENTIC'}</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight line-clamp-2">{item.name}</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="h-12 flex items-center bg-slate-50 border-2 border-slate-900">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-full w-10 flex items-center justify-center hover:bg-slate-200 text-slate-900"><Minus size={14} /></button>
                        <span className="text-xs font-black w-8 text-center text-slate-900 border-x-2 border-slate-900 h-full flex items-center justify-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-full w-10 flex items-center justify-center hover:bg-slate-200 text-slate-900"><Plus size={14} /></button>
                      </div>
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">${item.price * item.quantity}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="h-10 w-10 border-2 border-slate-100 text-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all absolute top-4 right-4 sm:static shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* --- SUMMARY MODULE --- */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 p-8 lg:p-12 text-white sticky top-32 border-2 border-slate-900 shadow-[12px_12px_0px_rgba(79,70,229,0.2)]">
              <div className="flex items-center justify-between mb-10 border-b-2 border-white/10 pb-4">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400">System Summary</h3>
                 <div className="h-1.5 w-1.5 bg-indigo-400 animate-pulse" />
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Gross Inventory</span>
                  <span className="text-xl font-black">${total}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Logistics</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-400 px-3 py-1">CALC_PENDING</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Net Capital</span>
                  <span className="text-4xl lg:text-5xl font-black tracking-tighter text-indigo-400">${total}</span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full h-16 bg-white text-slate-900 border-2 border-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 group">
                  INITIALIZE CHECKOUT
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>

              <div className="mt-10 pt-10 border-t border-white/10 flex flex-col items-center">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">
                  SECURE_PROTOCOL_ACTIVE // 256_BIT_SSL
                </p>
                <div className="flex justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                   <div className="h-6 w-10 border border-white/20" />
                   <div className="h-6 w-10 border border-white/20" />
                   <div className="h-6 w-10 border border-white/20" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12">
          <Link to="/shop">
            <button className="h-12 px-8 border-2 border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              CONTINUE BROWSING
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

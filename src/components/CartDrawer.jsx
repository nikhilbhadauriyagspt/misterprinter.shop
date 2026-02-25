import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[1000]"
          />

          {/* Cart Drawer - Square Industrial Design */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-white z-[1001] border-l-4 border-slate-900 shadow-2xl flex flex-col font-urbanist"
          >
            {/* Header */}
            <div className="p-8 border-b-2 border-slate-900 bg-slate-50 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                   <div className="h-1 w-6 bg-indigo-600" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Current Manifest</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Your Bag.</h2>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors border-2 border-slate-900"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
              {cart.length > 0 ? (
                <div className="space-y-px bg-slate-200 border-2 border-slate-900 overflow-hidden">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white p-5 flex gap-6 group relative border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                    >
                      <div className="h-20 w-20 bg-white border-2 border-slate-100 p-2 flex items-center justify-center flex-shrink-0 group-hover:border-slate-900 transition-all duration-500">
                        <img 
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{item.brand_name || 'AUTHENTIC'}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-300 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={14} strokeWidth={2.5} />
                            </button>
                          </div>
                          <h3 className="text-[13px] font-black text-slate-900 uppercase truncate leading-tight pr-4">{item.name}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="h-9 flex items-center bg-slate-50 border-2 border-slate-900">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-full w-8 flex items-center justify-center hover:bg-slate-200 transition-all text-slate-900"><Minus size={10} strokeWidth={3} /></button>
                            <span className="text-xs font-black w-8 text-center text-slate-900 border-x-2 border-slate-900 h-full flex items-center justify-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-full w-8 flex items-center justify-center hover:bg-slate-200 transition-all text-slate-900"><Plus size={10} strokeWidth={3} /></button>
                          </div>
                          <span className="text-base font-black text-slate-900 tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 bg-slate-50 border-2 border-slate-200 flex items-center justify-center mb-6 shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
                    <ShoppingBag size={24} className="text-slate-200" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Manifest Empty.</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 italic">No active inventory detected.</p>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="h-12 px-10 bg-slate-900 text-white flex items-center justify-center font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 border-2 border-slate-900 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none"
                  >
                    RETURN TO SHOWROOM
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-slate-50 border-t-2 border-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Total Assets</span>
                     <span className="text-3xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Quantity</span>
                     <span className="text-xl font-black text-indigo-600 uppercase tracking-tight">{cartCount} Units</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white border-2 border-slate-900 text-slate-900 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.05)] active:shadow-none"
                  >
                    VIEW OPERATIONAL BAG
                  </Link>
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-slate-900 text-white border-2 border-slate-900 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none group"
                  >
                    INITIALIZE CHECKOUT
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
                   <div className="flex items-center gap-2">
                      <Zap size={12} className="text-slate-900" />
                      <span className="text-[8px] font-black uppercase tracking-widest">ENCRYPTED</span>
                   </div>
                   <div className="h-1 w-1 bg-slate-400" />
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={12} className="text-slate-900" />
                      <span className="text-[8px] font-black uppercase tracking-widest">VERIFIED HUB</span>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Check, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useMemo } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = ['ALL', 'PRINTERS', 'INK & TONER', 'ACCESSORIES'];

  const filteredProducts = useMemo(() => {
    if (activeTab === 'ALL') return products.slice(0, 15);
    
    return products.filter(p => {
      const name = p.name.toLowerCase();
      if (activeTab === 'PRINTERS') return name.includes('printer') || name.includes('laserjet');
      if (activeTab === 'INK & TONER') return name.includes('ink') || name.includes('toner');
      if (activeTab === 'ACCESSORIES') return name.includes('cable') || name.includes('adapter') || name.includes('tray');
      return true;
    }).slice(0, 15);
  }, [products, activeTab]);

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
    <section className="px-4 md:px-10 lg:px-16 py-16 lg:py-24 bg-white font-urbanist relative overflow-hidden border-b border-slate-200">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-indigo-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Latest Inventory</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              New<br/>
              <span className="text-indigo-600">Arrivals.</span>
            </h2>
          </div>

          {/* Category Tabs - Square Style */}
          <div className="flex flex-wrap border-2 border-slate-900 bg-slate-900 p-0.5 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === cat 
                    ? "bg-white text-slate-900" 
                    : "text-white hover:bg-slate-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-slate-200 border border-slate-200">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p, i) => (
                <motion.div 
                  layout
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white p-6 flex flex-col h-[450px] transition-colors hover:bg-slate-50"
                >
                  {/* Wishlist */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className={cn(
                      "absolute top-4 right-4 z-20 h-10 w-10 border-2 transition-all duration-300 flex items-center justify-center",
                      isInWishlist(p.id) 
                        ? "bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" 
                        : "bg-white text-slate-300 border-slate-100 hover:border-slate-900 hover:text-red-500"
                    )}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2.5} />
                  </button>

                  {/* Visual */}
                  <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col">
                    <div className="relative h-[200px] mb-6 flex items-center justify-center p-4">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                      />
                    </div>

                    <div className="space-y-3">
                      <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                      <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {p.name}
                      </h3>
                      <div className="pt-2">
                        <span className="text-2xl font-black text-slate-950 tracking-tighter">${p.price}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Actions */}
                  <div className="mt-6">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                      disabled={addedItems[p.id]}
                      className={cn(
                        "w-full h-12 border-2 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all",
                        addedItems[p.id] 
                          ? "bg-emerald-500 text-white border-emerald-500" 
                          : "bg-slate-900 text-white border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                      )}
                    >
                      {addedItems[p.id] ? <Check size={14} strokeWidth={3} /> : <ShoppingBag size={14} />}
                      {addedItems[p.id] ? "ADDED" : "BUY NOW"}
                    </button>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/shop">
            <button className="h-14 px-12 border-2 border-slate-900 text-slate-900 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all flex items-center gap-4 group">
              BROWSE COMPLETE GALLERY
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  List, 
  ShoppingBag, 
  Heart,
  X,
  Loader2,
  Check,
  ArrowUpDown,
  SlidersHorizontal,
  ArrowRight,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => setBrands(d.data));
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <div className="bg-white min-h-screen font-urbanist">
      <SEO 
        title="Premium Catalog | PrimeFix Solutions" 
        description="Browse our authorized catalog of high-performance tech solutions."
      />
      
      {/* --- PROFESSIONAL PAGE HEADER --- */}
      <div className="pt-32 pb-12 px-6 md:px-10 lg:px-16 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase">
                Inventory Database
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">CATALOG.</span>
            </h1>
            
            {/* Search Bar Refinement */}
            <div className="w-full max-w-2xl relative group mt-4">
               <input 
                 type="text" 
                 placeholder="SEARCH PRODUCTS OR CATEGORIES..."
                 value={search}
                 onChange={(e) => updateFilter('search', e.target.value)}
                 className="w-full h-16 pl-12 pr-16 bg-slate-50 border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-500 shadow-inner"
               />
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Execute
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- STICKY FILTER CONTROL BAR --- */}
      <div className="sticky top-[80px] lg:top-[96px] z-[45] bg-white/80 backdrop-blur-3xl border-b border-slate-100 py-4 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "h-11 px-6 rounded-full flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                isFilterOpen ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-900 hover:border-slate-900"
              )}
            >
              <SlidersHorizontal size={14} />
              {isFilterOpen ? "CLOSE FILTERS" : "REFINE SELECTION"}
            </button>

            {/* Quick Filter Chips */}
            <AnimatePresence>
              {(category || brand || search) && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 border-l border-slate-100 pl-4">
                  {category && (
                    <button onClick={() => updateFilter('category', '')} className="h-9 px-4 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-[9px] font-black uppercase flex items-center gap-2">
                      {category} <X size={10} />
                    </button>
                  )}
                  {brand && (
                    <button onClick={() => updateFilter('brand', '')} className="h-9 px-4 bg-slate-100 border border-slate-200 text-slate-900 rounded-full text-[9px] font-black uppercase flex items-center gap-2">
                      {brand} <X size={10} />
                    </button>
                  )}
                  {search && (
                    <button onClick={() => updateFilter('search', '')} className="h-9 px-4 bg-slate-100 border border-slate-200 text-slate-900 rounded-full text-[9px] font-black uppercase flex items-center gap-2">
                      "{search}" <X size={10} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-8">
             <div className="hidden md:flex items-center gap-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SORT_ORDER</span>
                <select 
                  value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                  className="bg-transparent text-[11px] font-black uppercase focus:outline-none cursor-pointer"
                >
                  <option value="newest">Recent Arrivals</option>
                  <option value="price_low">Value: Low to High</option>
                  <option value="price_high">Value: High to Low</option>
                  <option value="name_asc">Alphabetical</option>
                </select>
             </div>
             <div className="h-6 w-px bg-slate-100" />
             <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{total} Objects Found</p>
          </div>
        </div>

        {/* --- EXPANDABLE FILTER DRAWER --- */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="max-w-[1920px] mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                    <div className="h-1 w-1 bg-blue-600 rounded-full" /> DEPARTMENTS
                  </h4>
                  <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar pr-4">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} onClick={() => updateFilter('category', cat.slug)}
                        className={cn("w-full text-left px-4 py-2 text-[11px] font-black uppercase transition-all rounded-lg", category === cat.slug ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                    <div className="h-1 w-1 bg-blue-600 rounded-full" /> OFFICIAL BRANDS
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(b => (
                      <button 
                        key={b.id} onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                        className={cn("px-4 py-2.5 text-[9px] font-black uppercase border transition-all rounded-xl", brand === b.name ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                    <div className="h-1 w-1 bg-blue-600 rounded-full" /> UNIT STATUS
                  </h4>
                  <div className="space-y-3">
                    {['New Arrivals', 'Professional Stock', 'Enterprise Solutions'].map(status => (
                      <label key={status} className="flex items-center gap-4 cursor-pointer group">
                         <div className="h-5 w-5 rounded-lg border-2 border-slate-200 flex items-center justify-center transition-all group-hover:border-blue-600">
                            <div className="h-2 w-2 rounded-sm bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                         </div>
                         <span className="text-[11px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-tight">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between bg-slate-50 p-8 rounded-[2rem]">
                   <div>
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] mb-3">Refinement Logic</p>
                      <h5 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">Precision <br />Filtering.</h5>
                   </div>
                   <button 
                     onClick={() => navigate('/shop')}
                     className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
                   >
                     Reset All Parameters
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Synchronizing Inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-48 text-center bg-slate-50 rounded-[3rem]">
            <X size={48} className="text-slate-200 mb-6" />
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">Null Results Returned</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Adjust your refinement parameters</p>
            <button onClick={() => navigate('/shop')} className="px-12 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-blue-600 transition-all">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-px bg-slate-100 border border-slate-100">
            {products.map((p, i) => (
              <motion.div 
                key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}
                className="group bg-white p-8 transition-all duration-500 hover:z-10 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex flex-col relative h-full border-y border-slate-50"
              >
                <div className="flex justify-between items-start mb-8">
                   <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                     {p.brand_name || 'AUTHENTIC'}
                   </span>
                   <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                      className={cn("transition-all duration-300 transform", isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100")}
                    >
                      <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2.5} />
                    </button>
                </div>

                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col">
                  <div className="relative aspect-square mb-10 flex items-center justify-center p-4">
                    <img 
                      src={getImagePath(p.images)} alt={p.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight line-clamp-3 leading-[1.2] min-h-[3.9rem] group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                       <span className="text-xl font-black text-slate-900">${p.price}</span>
                    </div>
                  </div>
                </Link>

                <div className="mt-8 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "w-full h-12 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all duration-300",
                      addedItems[p.id] ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-blue-600"
                    )}
                  >
                    {addedItems[p.id] ? <><Check size={16} strokeWidth={3} /> ADDED</> : <><Plus size={16} strokeWidth={3} /> ADD TO CART</>}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
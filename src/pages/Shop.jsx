import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  X,
  Loader2,
  Check,
  SlidersHorizontal,
  ArrowRight,
  Plus,
  ShoppingBag,
  Heart,
  LayoutGrid
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
    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => {
      if (d.status === 'success') {
        setBrands(d.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
      }
    });
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
    <div className="bg-white min-h-screen font-urbanist pt-20 lg:pt-24">
      <SEO 
        title="Industrial Catalog | MISTERPRINTER" 
        description="Premium industrial hardware and operational systems."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-indigo-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Inventory Hub</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Authorized<br/>
                <span className="text-indigo-600">Product Gallery.</span>
              </h1>

              <div className="w-full max-w-xl relative group">
                <form onSubmit={(e) => { e.preventDefault(); updateFilter('search', search); }} className="flex border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
                  <input 
                    type="text" 
                    placeholder="Search specifications..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="flex-1 h-14 px-6 text-sm bg-white focus:outline-none font-bold uppercase tracking-widest placeholder:text-slate-300"
                  />
                  <button type="submit" className="h-14 px-8 bg-slate-900 text-white hover:bg-indigo-600 transition-colors flex items-center justify-center">
                    <Search size={20} strokeWidth={3} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FILTER CONTROL BAR --- */}
      <div className="sticky top-[80px] lg:top-[96px] z-[45] bg-white border-b-2 border-slate-900 py-4 px-4 md:px-10 lg:px-16">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "h-12 px-8 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all border-2",
                isFilterOpen 
                  ? "bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" 
                  : "bg-white border-slate-200 text-slate-900 hover:border-slate-900"
              )}
            >
              <SlidersHorizontal size={16} strokeWidth={3} />
              {isFilterOpen ? "Close Config" : "System Filters"}
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <AnimatePresence>
                {category && (
                  <button onClick={() => updateFilter('category', '')} className="h-9 px-4 bg-indigo-50 border-2 border-indigo-100 text-indigo-600 text-[9px] font-black uppercase flex items-center gap-2 hover:bg-indigo-100">
                    {category} <X size={10} strokeWidth={3} />
                  </button>
                )}
                {brand && (
                  <button onClick={() => updateFilter('brand', '')} className="h-9 px-4 bg-slate-100 border-2 border-slate-200 text-slate-900 text-[9px] font-black uppercase flex items-center gap-2 hover:bg-slate-200">
                    {brand} <X size={10} strokeWidth={3} />
                  </button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4 bg-slate-50 px-5 py-2 border-2 border-slate-200">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sorting</span>
                <select 
                  value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                  className="bg-transparent text-[11px] font-black uppercase focus:outline-none cursor-pointer text-slate-900"
                >
                  <option value="newest">Latest First</option>
                  <option value="price_low">Price +</option>
                  <option value="price_high">Price -</option>
                  <option value="name_asc">A-Z</option>
                </select>
             </div>
             <div className="h-10 w-px bg-slate-200 hidden sm:block" />
             <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{total} Active Units</p>
          </div>
        </div>

        {/* --- FILTER DRAWER --- */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="bg-white overflow-hidden"
            >
              <div className="max-w-[1920px] mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border-2 border-slate-900 mt-6">
                
                <div className="bg-white p-8">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 border-b-2 border-slate-100 pb-2">Collections</h4>
                  <div className="space-y-1 max-h-64 overflow-y-auto pr-4 custom-scrollbar">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} onClick={() => updateFilter('category', cat.slug)}
                        className={cn("w-full text-left px-4 py-3 text-[11px] font-black uppercase transition-all", category === cat.slug ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 border-b-2 border-slate-100 pb-2">Partner Brands</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(b => (
                      <button 
                        key={b.id} onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                        className={cn("px-3 py-3 text-[10px] font-black uppercase border-2 transition-all", brand === b.name ? "bg-indigo-600 text-white border-indigo-600 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" : "bg-white border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-10 lg:col-span-2 flex flex-col justify-between group">
                   <div className="relative">
                      <LayoutGrid size={40} className="text-indigo-500 mb-8 opacity-20 group-hover:rotate-90 transition-transform duration-700" />
                      <h5 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">System Refinement<br/>Interface.</h5>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-sm">Adjust parameters to narrow down precise hardware specifications from our authorized inventory.</p>
                   </div>
                   <button 
                     onClick={() => navigate('/shop')}
                     className="mt-10 w-full py-5 bg-white text-slate-900 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all border-2 border-white shadow-[8px_8px_0px_rgba(79,70,229,0.3)]"
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
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 py-16 lg:py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Accessing Database...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-48 text-center border-2 border-slate-900 bg-slate-50">
            <div className="h-20 w-20 bg-white border-2 border-slate-900 flex items-center justify-center mb-8 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
               <X size={32} strokeWidth={3} className="text-slate-900" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">Zero Matches Found</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-12">System parameters returned no authorized matches.</p>
            <button onClick={() => navigate('/shop')} className="px-12 py-5 bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest border-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:bg-indigo-600 hover:border-indigo-600 transition-all active:shadow-none">Clear All Refinements</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px border border-slate-900 bg-slate-900">
            {products.map((p, i) => (
              <motion.div 
                key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="group relative bg-white p-6 flex flex-col h-[520px] border border-transparent hover:border-slate-200 transition-all"
              >
                {/* Wishlist */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-4 right-4 z-20 h-10 w-10 border-2 transition-all duration-300 flex items-center justify-center",
                    isInWishlist(p.id) 
                      ? "bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" 
                      : "bg-white text-slate-200 border-slate-100 hover:border-slate-900 hover:text-red-500"
                  )}
                >
                  <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2.5} />
                </button>

                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col">
                  <div className="relative h-[220px] mb-8 flex items-center justify-center p-4">
                    <img 
                      src={getImagePath(p.images)} alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <h3 className="text-[16px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                      {p.name}
                    </h3>
                    <div className="pt-4">
                      <span className="text-2xl font-black text-slate-950 tracking-tighter">${p.price}</span>
                    </div>
                  </div>
                </Link>

                <div className="mt-8 border-t-2 border-slate-900 pt-6">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "w-full h-12 border-2 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all",
                      addedItems[p.id] 
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-[4px_4px_0px_rgba(16,185,129,0.2)]" 
                        : "bg-slate-900 text-white border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    )}
                  >
                    {addedItems[p.id] ? <Check size={16} strokeWidth={3} /> : <ShoppingBag size={16} />}
                    {addedItems[p.id] ? "ADDED" : "BUY NOW"}
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

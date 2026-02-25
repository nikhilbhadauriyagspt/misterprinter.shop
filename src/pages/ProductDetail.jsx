import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) {
            fetchUrl += `&category=${categorySlug}`;
          } else if (brand) {
            fetchUrl += `&brand=${brand}`;
          }

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Retrieving Specs...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50 border-2 border-slate-900 m-4 lg:m-10">
        <h2 className="text-4xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Product Not Found</h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">The requested item is not available in the active repository.</p>
        <Link to="/shop" className="px-10 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] border-2 border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 transition-colors shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none">Return to Gallery</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-20 lg:pt-24 font-urbanist">
      <SEO 
        title={`${product.name} | MISTERPRINTER`} 
        description={product.description?.substring(0, 160)}
      />
      
      {/* --- BREADCRUMBS --- */}
      <div className="border-b-2 border-slate-900 bg-slate-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 py-4">
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <Link to="/shop" className="hover:text-indigo-600 transition-colors">Catalog</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- IMAGE GALLERY --- */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 border-2 border-slate-900 flex items-center justify-center p-12 relative group shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "absolute top-6 right-6 h-12 w-12 border-2 flex items-center justify-center transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none",
                  isInWishlist(product.id) ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-300 border-slate-200 hover:border-slate-900 hover:text-red-500"
                )}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={2.5} />
              </button>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-24 w-24 border-2 flex-shrink-0 flex items-center justify-center p-4 transition-all bg-white",
                      activeImage === idx ? "border-indigo-600 shadow-[4px_4px_0px_rgba(79,70,229,0.2)]" : "border-slate-200 hover:border-slate-900"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- PRODUCT INFO --- */}
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] border border-slate-900">
                  {product.brand_name || 'AUTHENTIC'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-8">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl lg:text-6xl font-black text-indigo-600 tracking-tighter">${product.price}</span>
                {product.sale_price && (
                  <span className="text-2xl font-black text-slate-300 line-through">${product.sale_price}</span>
                )}
              </div>

              {product.description && (
                <div className="bg-slate-50 border-l-4 border-slate-900 p-6 mb-10">
                  <p className="text-slate-600 font-bold leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            {/* --- ACTIONS --- */}
            <div className="space-y-6 mt-auto border-t-2 border-slate-900 pt-10">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Quantity Control */}
                <div className="h-16 flex items-center bg-slate-50 border-2 border-slate-900 w-full sm:w-auto">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-full w-16 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-900"
                  >
                    <Minus size={18} strokeWidth={2.5} />
                  </button>
                  <span className="text-lg font-black w-12 text-center text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-full w-16 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-900 border-l-2 border-slate-900"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-16 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all border-2 active:translate-x-1 active:translate-y-1 active:shadow-none",
                    isAdded 
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-[6px_6px_0px_rgba(16,185,129,0.2)]" 
                      : "bg-slate-900 text-white border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isAdded ? (
                    <><Check size={20} strokeWidth={3} /> CONFIRMED</>
                  ) : (
                    <><ShoppingBag size={20} strokeWidth={2.5} /> ADD TO SYSTEM</>
                  )}
                </button>
                
                <button className="h-16 w-16 bg-white text-slate-900 flex items-center justify-center border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none">
                  <Share2 size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-px bg-slate-200 border-2 border-slate-900 mt-10">
                <div className="flex flex-col items-center text-center p-6 bg-white group hover:bg-slate-50 transition-colors">
                  <div className="text-slate-900 mb-4 group-hover:scale-110 transition-transform"><Truck size={24} strokeWidth={2} /></div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Logistics</span>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white group hover:bg-slate-50 transition-colors">
                  <div className="text-slate-900 mb-4 group-hover:scale-110 transition-transform"><ShieldCheck size={24} strokeWidth={2} /></div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Protection</span>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white group hover:bg-slate-50 transition-colors">
                  <div className="text-slate-900 mb-4 group-hover:scale-110 transition-transform"><RefreshCcw size={24} strokeWidth={2} /></div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 lg:mt-32 border-t-4 border-slate-900 pt-16 lg:pt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-6 bg-indigo-600" />
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Similar Configurations</h2>
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                  Related <span className="text-indigo-600">Discoveries.</span>
                </h3>
              </div>
              <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-indigo-600 hover:border-indigo-600 transition-colors flex items-center gap-2">
                Explore Full Catalog <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px border-2 border-slate-900 bg-slate-900">
              {relatedProducts.slice(0, 5).map((p) => (
                <Link 
                  to={`/product/${p.slug}`} 
                  key={p.id} 
                  className="group bg-white p-6 flex flex-col h-full hover:bg-slate-50 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="aspect-square flex items-center justify-center p-4 mb-6">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-auto">
                    <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2">{p.brand_name || 'AUTHENTIC'}</p>
                    <h4 className="text-[13px] font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-2 leading-tight mb-3">{p.name}</h4>
                    <span className="text-xl font-black text-slate-950 tracking-tighter">${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

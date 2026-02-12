import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import BrandShowcase from "@/components/BrandShowcase";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, Headphones, RefreshCw, ArrowRight, Loader2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    laptops: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const all = prodRes.data;
          
          const laptops = all.filter(p => 
            p.name.toLowerCase().includes('laptop') || 
            p.name.toLowerCase().includes('macbook') || 
            p.name.toLowerCase().includes('notebook')
          );
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          // Create a Mixed Arrivals list (shuffling all products to ensure variety)
          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            laptops,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: brandRes.data,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white font-urbanist">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
        <p className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">Initializing Experience</p>
      </div>
    );
  }

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      
      {/* 1. HERO - Entrance */}
      <Hero />

      {/* 2. FEATURES - Trust markers */}
      <Features />

      {/* 3. SHOP BY CATEGORY - Navigation */}
      <ShopByCategory categories={data.categories} />

      {/* 4. COLLECTIONS - Major Pillars */}
      <Collections />

      {/* 6. BEST SELLERS - Popularity */}
      <BestSellers products={data.all} />

      {/* 7. BRAND SHOWCASE - Credibility */}
      <BrandShowcase brands={data.brands} />

      {/* 8. NEW ARRIVALS GRID - Latest Products (Mixed Variety) */}
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />

      {/* 9. LAPTOP SLIDER */}
      <CategorySlider 
        title="Premium Laptops" 
        subtitle="Workstation & Gaming" 
        products={data.laptops} 
        bgColor="bg-slate-50/50"
      />

      {/* 10. PRINTER SLIDER */}
      <CategorySlider 
        title="Office Printers" 
        subtitle="Laser & Inkjet" 
        products={data.printers} 
      />

      {/* 11. QUICK PICKS - Micro-shopping */}
      <QuickPicks products={data.all} />

      {/* 12. THE VAULT - Final Accessories */}
      <TheVault products={data.accessories.length > 0 ? data.accessories : data.all} />

      {/* 13. EXPERT CONSULTING - New Section 1 */}
      <section className="py-16 md:py-24 max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 bg-white">
        <div className="bg-slate-900 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <span className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 md:mb-6 block">Personalized Support</span>
              <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[1.1] md:leading-[0.9] mb-6 md:mb-8">
                Expert Tech <br /> <span className="text-slate-500 italic">Consulting.</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-lg font-bold max-w-md leading-relaxed mb-8 md:mb-10">
                Not sure which configuration fits your workflow? Chat with our certified HP specialists for a tailored recommendation.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-white text-slate-900 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                BOOK A CALL <ArrowUpRight size={16} md:size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                <Shield size={24} md:size={32} className="text-blue-400 mb-4 md:mb-6" />
                <h4 className="text-xs md:text-sm font-black text-white uppercase">Official Warranty</h4>
                <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase mt-2 tracking-widest leading-tight">Guaranteed coverage</p>
              </div>
              <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/10 transition-all mt-6 md:mt-8">
                <Wrench size={24} md:size={32} className="text-emerald-400 mb-4 md:mb-6" />
                <h4 className="text-xs md:text-sm font-black text-white uppercase">Pro Setup</h4>
                <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase mt-2 tracking-widest leading-tight">Initial configuration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. BULK SOLUTIONS - New Section 2 */}
      <section className="py-16 md:py-24 max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 bg-gray-50/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
          <div className="w-full md:w-1/2">
            <span className="text-[8px] md:text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-3 md:mb-4 block">Corporate & Education</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-4 md:mb-6">
              Empowering <br /> Your <span className="text-slate-400 italic">Organization.</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-lg font-bold leading-relaxed mb-6 md:mb-8">
              We provide scalable device management and bulk procurement solutions for businesses, institutions, and government agencies.
            </p>
            <div className="flex items-center gap-6 md:gap-8">
              <div>
                <p className="text-2xl md:text-3xl font-black text-slate-900">500+</p>
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Partnerships</p>
              </div>
              <div className="h-8 md:h-10 w-px bg-gray-200" />
              <div>
                <p className="text-2xl md:text-3xl font-black text-slate-900">24h</p>
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Quote Turnaround</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-1 gap-3 md:gap-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-500/20 transition-all">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs md:text-sm font-black">01</div>
                <div>
                  <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase">Bulk Discounts</h4>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tiered pricing for large orders</p>
                </div>
              </div>
              <Link to="/contact" className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ChevronRight size={16} md:size={18} /></Link>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-500/20 transition-all">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xs md:text-sm font-black">02</div>
                <div>
                  <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase">Device Lifecycle</h4>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Asset management & recycling</p>
                </div>
              </div>
              <Link to="/contact" className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ChevronRight size={16} md:size={18} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
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
import { Shield, Wrench, ArrowUpRight, Headphones, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function Home() {
  const [data, setData] = useState({
    all: [],
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
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
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

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
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

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="Authorized HP Partner | Premium Printers & Hardware" 
        description="Premium destination for authorized HP printers, precision tech, and essential accessories. Delivering excellence in tech solutions across the USA."
      />
      
      <Hero />
      <Features />
      <ShopByCategory categories={data.categories} />
      <Collections />
      <BestSellers products={data.all} />
      <BrandShowcase brands={data.brands} />
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />

      <CategorySlider 
        title="Office Printers" 
        subtitle="Laser & Inkjet" 
        products={data.printers} 
      />

      <QuickPicks products={data.all} />
      <TheVault products={data.accessories.length > 0 ? data.accessories : data.all} />

      {/* 13. EXPERT CONSULTING - MODERN ENTERPRISE REDESIGN */}
      <section className="py-20 lg:py-32 max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 bg-slate-50 relative overflow-hidden border-y border-slate-100">
        {/* Background Technical Detail */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/[0.02] skew-x-[-12deg] translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
               <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">Support Division</span>
               <div className="h-px w-12 bg-blue-600/30" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-10">
              EXPERT TECH <br /> <span className="text-blue-600">CONSULTING.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12 max-w-md">
              Deploy specialized technical knowledge to your infrastructure. Our certified HP architects provide precision-engineered scaling solutions for professional workflows.
            </p>
            <Link to="/contact" className="h-16 px-12 bg-slate-900 text-white hover:bg-blue-600 transition-all duration-500 font-black text-xs uppercase tracking-widest flex items-center w-fit gap-4 shadow-2xl group rounded-full">
              REQUEST ARCHITECT <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 shadow-2xl rounded-none">
            {[
              { icon: <Shield size={32} />, title: "Authorized Warranty", sub: "Official hardware protection protocol", color: "text-blue-600" },
              { icon: <Wrench size={32} />, title: "Precision Setup", sub: "Optimized environment configuration", color: "text-slate-900" },
              { icon: <Zap size={32} />, title: "Priority Response", sub: "SLA-backed technical assistance", color: "text-blue-600" },
              { icon: <Layers size={32} />, title: "Enterprise Scaling", sub: "Multi-node deployment strategies", color: "text-slate-900" }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-white hover:bg-slate-50 transition-all duration-500 group cursor-default">
                 <div className={cn("mb-8 transition-transform duration-500 group-hover:scale-110", item.color)}>{item.icon}</div>
                 <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">{item.title}</h4>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. SCALABLE INFRASTRUCTURE - MODERN ENTERPRISE REDESIGN */}
      <section className="py-20 lg:py-32 max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 bg-white relative overflow-hidden">
        {/* Background Subtle Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-8">
               <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Enterprise Operations</span>
               <div className="h-px w-12 bg-slate-200" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-10">
              SCALABLE <br /> <span className="text-slate-400">INFRASTRUCTURE.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12 max-w-lg">
              We provide precision-engineered procurement channels and comprehensive lifecycle management for high-growth global organizations.
            </p>
            
            <div className="flex gap-16">
               <div className="flex flex-col">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">500+</span>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-3">Strategic Partners</span>
               </div>
               <div className="w-px h-16 bg-slate-100" />
               <div className="flex flex-col">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">24H</span>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-3">Dispatch Protocol</span>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 gap-px bg-slate-100 border border-slate-100 shadow-2xl overflow-hidden">
            {[
              { id: "01", title: "Tiered Enterprise Pricing", sub: "Optimized procurement for high-volume deployments" },
              { id: "02", title: "Asset Lifecycle Management", sub: "Comprehensive device tracking and sustainable recycling" },
              { id: "03", title: "Global Logistics Support", sub: "Priority-tracked international fulfillment networks" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 hover:bg-slate-50 transition-all duration-500 group flex items-center justify-between">
                <div className="flex items-center gap-10">
                   <span className="text-xs font-black text-blue-600 opacity-40 group-hover:opacity-100 transition-opacity">[{item.id}]</span>
                   <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[280px] leading-relaxed">{item.sub}</p>
                   </div>
                </div>
                <Link to="/contact" className="h-14 w-14 rounded-full border border-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:scale-110">
                   <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

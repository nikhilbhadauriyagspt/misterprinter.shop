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
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
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
            brands: filteredBrands,
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

      <QuickPicks products={data.all} />

      {/* 13. EXPERT CONSULTING - INDUSTRIAL REDESIGN */}
      <section className="py-20 lg:py-32 bg-white font-urbanist border-b border-slate-200">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-indigo-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Strategic Consultation</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-10">
                Professional<br/>
                <span className="text-indigo-600 font-black">Workflow Solutions.</span>
              </h2>
              
              <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed mb-12 max-w-lg border-l-4 border-slate-900 pl-8">
                Optimise your operational infrastructure with expert-led strategic planning. Our technicians provide tailored solutions to ensure peak efficiency across your entire enterprise.
              </p>
              
              <Link to="/contact">
                <button className="h-16 px-12 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-indigo-600 flex items-center gap-6 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1 border-2 border-slate-900 group">
                  GET EXPERT ADVICE
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Right Grid - Square Industrial Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border-2 border-slate-900">
              {[
                { icon: <Shield size={24} />, title: "Full Protection", desc: "Enterprise-grade warranty protocols for all hardware units." },
                { icon: <Wrench size={24} />, title: "Rapid Deployment", desc: "Precision configuration and hardware setup by certified technicians." },
                { icon: <Zap size={24} />, title: "Priority Support", desc: "Instant response channels for critical operational requirements." },
                { icon: <Layers size={24} />, title: "System Scaling", desc: "Future-ready infrastructure design for growing organizations." }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-10 bg-white group hover:bg-slate-50 transition-all duration-500"
                >
                   <div className="h-14 w-14 border-2 border-slate-900 text-slate-900 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500">
                      {item.icon}
                   </div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{item.title}</h4>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed group-hover:text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. GLOBAL EXCELLENCE - INDUSTRIAL REDESIGN */}
      <section className="py-20 lg:py-32 bg-white font-urbanist border-b border-slate-200">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            
            {/* Left Column */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-indigo-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Enterprise Network</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-10">
                Global<br/>
                <span className="text-indigo-600">Scale.</span>
              </h2>
              
              <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed mb-12 max-w-lg border-l-4 border-slate-900 pl-8">
                Providing specialized procurement channels and strategic logistical support for premier organizations across the international landscape.
              </p>
              
              <div className="flex gap-12 lg:gap-16">
                 <div className="flex flex-col group cursor-default">
                    <span className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors duration-500">500+</span>
                    <div className="flex items-center gap-2 mt-3">
                       <div className="h-1.5 w-1.5 bg-indigo-600" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Allies</span>
                    </div>
                 </div>
                 <div className="w-[2px] h-16 bg-slate-900" />
                 <div className="flex flex-col group cursor-default">
                    <span className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors duration-500">24H</span>
                    <div className="flex items-center gap-2 mt-3">
                       <div className="h-1.5 w-1.5 bg-indigo-600" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Swift Delivery</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column - Square Bento Cards */}
            <div className="lg:w-1/2 flex flex-col gap-px bg-slate-200 border-2 border-slate-900">
              {[
                { id: "01", title: "Enterprise Pricing", desc: "Volume-optimized procurement models for large-scale operations." },
                { id: "02", title: "Asset Management", desc: "End-to-end device tracking and infrastructure lifecycle stewardship." },
                { id: "03", title: "Global Logistics", desc: "Rapid fulfillment protocols through our international supply network." }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="bg-white p-8 flex items-center justify-between group hover:bg-slate-50 transition-all duration-500"
                >
                  <div className="flex items-center gap-8">
                     <span className="text-xs font-black text-indigo-600 italic">[{item.id}]</span>
                     <div>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{item.title}</h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest max-w-[300px] leading-relaxed group-hover:text-slate-600">{item.desc}</p>
                     </div>
                  </div>
                  <Link to="/contact" className="h-12 w-12 border-2 border-slate-900 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none">
                     <ArrowUpRight size={20} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

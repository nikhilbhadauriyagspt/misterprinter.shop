import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=0f172a&bold=true`;
  };

  if (brands.length === 0) return null;

  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-16 lg:py-24 bg-white font-urbanist relative overflow-hidden border-b border-slate-200">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="px-4 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-indigo-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Strategic Network</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Authorized<br/>
              <span className="text-indigo-600">Partnerships.</span>
            </h2>
          </div>
          
          <div className="hidden md:block">
            <Link to="/shop" className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1 hover:text-indigo-600 hover:border-indigo-600 transition-all">
              View Global Network
            </Link>
          </div>
        </div>

        {/* --- INDUSTRIAL MARQUEE --- */}
        <div className="relative w-full overflow-hidden border-y border-slate-100 bg-slate-50/50 py-12">
          <div className="animate-marquee-slow flex items-center gap-4 whitespace-nowrap">
            {marqueeBrands.map((brand, i) => (
              <Link 
                key={`${brand.id}-${i}`}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group shrink-0"
              >
                <div className="h-32 w-64 bg-white border border-slate-200 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-slate-900 hover:shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-indigo-600 transition-all duration-500 group-hover:h-full" />
                  
                  <div className="h-12 w-32 relative z-10 flex items-center justify-center">
                    <img 
                      src={getBrandLogo(brand)} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] transition-colors group-hover:text-slate-900">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

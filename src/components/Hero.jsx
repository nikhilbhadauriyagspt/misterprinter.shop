import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

// Import local assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";
import banner5 from "@/assets/bannerr/banner5.jpg";
import banner6 from "@/assets/bannerr/banner6.jpg";
import banner7 from "@/assets/bannerr/banner7.jpg";

const slides = [
  {
    id: 1,
    position: "left",
    tag: "PRO SERIES",
    title: "The Pinnacle of",
    highlight: "Performance.",
    desc: "Engineered with the M3 Max chip for professionals who demand nothing but the absolute best.",
    image: banner1,
    cta: "Shop Pro",
    cta2: "Learn More",
    link: "/category/laptop-computers",
    link2: "/about"
  },
  {
    id: 2,
    position: "right",
    tag: "GAMING GEAR",
    title: "Dominate Every",
    highlight: "Battlefield.",
    desc: "RTX 4090 powered machines with 240Hz OLED displays. Experience zero-latency gaming.",
    image: banner2,
    cta: "Explore Gaming",
    cta2: "View Catalog",
    link: "/category/laptop-computers",
    link2: "/shop"
  },
  {
    id: 3,
    position: "left",
    tag: "ULTRA PORTABLE",
    title: "Beauty in",
    highlight: "Simplicity.",
    desc: "The lightest laptop in its class. Up to 22 hours of battery life to keep you going all day.",
    image: banner3,
    cta: "View Models",
    cta2: "Shop All",
    link: "/category/laptop-computers",
    link2: "/shop"
  },
  {
    id: 4,
    position: "center",
    tag: "LUXURY TECH",
    title: "Elegance Meets",
    highlight: "Innovation.",
    desc: "Premium printers and peripherals designed to elevate your workspace aesthetic.",
    image: banner4,
    cta: "Discover Luxury",
    cta2: "Catalog",
    link: "/category/printers",
    link2: "/shop"
  },
  {
    id: 5,
    position: "left",
    tag: "MINIMALIST",
    title: "Clean Desk,",
    highlight: "Clear Mind.",
    desc: "Wireless setups that remove the clutter, letting you focus on what truly matters.",
    image: banner5,
    cta: "Shop Now",
    cta2: "Support",
    link: "/shop",
    link2: "/contact"
  },
  {
    id: 6,
    position: "left",
    tag: "STUDIO DISPLAY",
    title: "Pixels Perfected",
    highlight: "For You.",
    desc: "5K Retina displays that bring your creative vision to life with one billion colors.",
    image: banner6,
    cta: "View Store",
    cta2: "Contact",
    link: "/shop",
    link2: "/contact"
  },
  {
    id: 7,
    position: "left",
    tag: "OFFICE ESSENTIALS",
    title: "Productivity",
    highlight: "Redefined.",
    desc: "High-speed printing and scanning solutions for the modern hybrid office.",
    image: banner7,
    cta: "Upgrade Office",
    cta2: "Contact Sales",
    link: "/category/printers",
    link2: "/contact"
  }
];

export default function Hero() {
  const { openSearch } = useCart();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="bg-white font-urbanist pt-6 pb-6 md:pt-8 md:pb-8 lg:pt-10 lg:pb-10">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12">
        <section className="relative h-[75vh] md:h-[80vh] w-full overflow-hidden rounded-[3.5rem] bg-gray-50 border border-gray-200 shadow-none group">
          
          {/* --- BACKGROUND LAYER --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={slides[current].image} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* --- CONTENT LAYER --- */}
          <div className="relative z-10 h-full w-full px-8 md:px-16 lg:px-24 flex items-center">
            <div className={`w-full flex ${
              slides[current].position === 'right' ? 'justify-end' : 
              slides[current].position === 'center' ? 'justify-center' : 'justify-start'
            }`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`max-w-xl p-10 rounded-[3rem] ${
                    slides[current].position === 'center' ? 'text-center items-center' : 'text-left'
                  } backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl shadow-black/5`}
                >
                  <span className="inline-block py-2 px-5 rounded-full bg-black text-white text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-md">
                    {slides[current].tag}
                  </span>

                  {/* HP Authorized Badge */}
                  <div className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-md w-fit px-4 py-2 rounded-2xl border border-blue-100 shadow-sm">
                    <img src="/brands/hp.jpg" alt="HP" className="h-5 w-auto object-contain" />
                    <div className="h-4 w-px bg-blue-200" />
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Authorized HP Partner</span>
                  </div>

                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter mb-4 md:mb-6">
                    {slides[current].title} <br />
                    <span className="text-blue-600 italic">{slides[current].highlight}</span>
                  </h1>

                  <p className="text-slate-700 text-sm md:text-lg font-bold leading-relaxed mb-6 md:mb-8">
                    {slides[current].desc}
                  </p>

                  {/* --- HERO SEARCH BAR (Inside Card) --- */}
                  <div className="relative mb-6 md:mb-8 w-full group cursor-pointer" onClick={openSearch}>
                    <div className="w-full h-12 md:h-14 pl-5 md:pr-14 bg-white border border-gray-200 rounded-2xl text-xs md:text-sm font-bold shadow-inner flex items-center text-slate-400 group-hover:border-blue-500 transition-all">
                      Search tech...
                    </div>
                    <div className="absolute right-2 top-2 bottom-2 w-8 md:w-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                  </div>

                  <div className={`flex flex-wrap gap-3 md:gap-4 ${slides[current].position === 'center' ? 'justify-center' : ''}`}>
                    <Link to={slides[current].link}>
                      <Button 
                        size="lg" 
                        className="bg-black hover:bg-blue-600 text-white rounded-xl md:rounded-2xl px-6 md:px-8 h-11 md:h-12 font-black text-[10px] md:text-xs tracking-widest shadow-lg transition-all hover:scale-105"
                      >
                        {slides[current].cta} <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                      </Button>
                    </Link>
                    
                    <Link to={slides[current].link2}>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white text-black rounded-xl md:rounded-2xl px-6 md:px-8 h-11 md:h-12 font-black text-[10px] md:text-xs tracking-widest shadow-md transition-all hover:scale-105"
                      >
                        {slides[current].cta2}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* --- CONTROLS --- */}
          <div className="absolute bottom-8 left-0 w-full z-20 px-8 md:px-16 lg:px-24 flex items-center justify-between pointer-events-none">
            
            {/* Pagination Dots */}
            <div className="flex gap-2 pointer-events-auto bg-white/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === current ? "w-8 bg-black" : "w-2 bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3 pointer-events-auto">
              <button 
                onClick={prevSlide}
                className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
              >
                <ChevronLeft className="h-5 w-5 text-black" />
              </button>
              <button 
                onClick={nextSlide}
                className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
              >
                <ChevronRight className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

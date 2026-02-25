import { Link } from 'react-router-dom';
import { Globe, Mail, Loader2, MapPin, ShieldCheck, ArrowUpRight, Facebook, Twitter, Instagram, Youtube, Phone, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-16 pb-8 font-urbanist border-t border-slate-200">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        
        {/* --- TOP ROW: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-100 border border-slate-200 mb-16 shadow-sm">
          <div className="lg:col-span-5 bg-white p-8 lg:p-12 flex flex-col justify-center">
            <Link to="/" className="inline-flex items-center gap-4 mb-8 group">
              <img src="/logo/MISTERPRINTER.png" alt="MISTERPRINTER" className="h-8 lg:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                <span className="text-[12px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm lg:text-base font-bold leading-relaxed max-w-sm mb-10 border-l-4 border-indigo-600 pl-6">
              Authorized HP Partner specializing in premium hardware solutions and professional operational systems for global enterprises.
            </p>
            <div className="flex flex-wrap gap-3">
               <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-indigo-600" />
                  <span>Authorized HP Partner</span>
               </div>
               <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest">
                  <Globe size={14} className="text-indigo-600" />
                  <span>Global Support</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden group">
            <div className="relative z-10 max-w-xl">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Newsletter Protocol</h4>
              <h3 className="text-2xl lg:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-8">
                Subscribe to our<br/>Professional Updates.
              </h3>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-px bg-white p-[2px] border border-indigo-600">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER CORPORATE EMAIL"
                  className="flex-1 bg-white py-4 px-6 text-xs text-slate-900 focus:outline-none font-bold uppercase tracking-widest"
                />
                <button
                  disabled={loading}
                  className="bg-slate-900 text-white px-10 py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : "Join Network"}
                </button>
              </form>
            </div>
            <Zap size={200} className="absolute -bottom-20 -right-20 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
          </div>
        </div>

        {/* --- LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-px bg-slate-100 border border-slate-200 mb-16">
          <div className="lg:col-span-3 bg-white p-8 group">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 border-b border-slate-100 pb-2">Collections</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-slate-900 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-between group/link">
                    {cat.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 bg-white p-8">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 border-b border-slate-100 pb-2">Support Hub</h4>
            <ul className="space-y-3">
              {[{ name: 'About Us', path: '/about' }, { name: 'Contact Us', path: '/contact' }, { name: 'Track Orders', path: '/orders' }, { name: 'FAQs', path: '/faq' }].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-slate-900 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-between group/link">
                    {item.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 bg-white p-8">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 border-b border-slate-100 pb-2">Legal Policies</h4>
            <ul className="space-y-3">
              {[{ name: 'Privacy Policy', path: '/privacy-policy' }, { name: 'Terms & Conditions', path: '/terms-and-conditions' }, { name: 'Return Policy', path: '/return-policy' }, { name: 'Shipping Policy', path: '/shipping-policy' }, { name: 'Cookie Policy', path: '/cookie-policy' }].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-slate-900 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-between group/link">
                    {item.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 bg-white p-8 flex flex-col gap-6">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-2 border-b border-slate-100 pb-2">HQ Location</h4>
            <div className="flex items-start gap-4">
               <MapPin size={16} className="text-slate-900 shrink-0" />
               <span className="text-[11px] font-black text-slate-500 leading-relaxed uppercase tracking-widest">
                 722 N West St <br /> Raleigh, NC 27603, USA
               </span>
            </div>
            <div className="flex items-center gap-4">
               <Mail size={16} className="text-slate-900 shrink-0" />
               <span className="text-[11px] font-black text-slate-500 tracking-widest">info@misterprinter.shop</span>
            </div>
          </div>
        </div>

        {/* --- MAP INTEGRATION --- */}
        <div className="w-full h-[250px] mb-16 border border-slate-200 grayscale hover:grayscale-0 transition-all duration-1000 shadow-sm">
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.3456789!2d-78.6456789!3d35.7856789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f6789abcdef%3A0x123456789abcdef!2zNzIyIE4gV2VzdCBTdCwgUmFsZWlnaCwgTkMgMjc2MDMsIFVTQQ!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[9px] font-black tracking-[0.2em] uppercase text-slate-400">
            <span>© 2026 MISTERPRINTER | ALL RIGHTS RESERVED. <span className="mx-2 hidden md:inline">|</span> A SUBSIDIARY OF PRIMEFIX SOLUTIONS LLC</span>
          </div>

          <div className="flex items-center gap-10">
             <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-slate-900" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-900">Verified Merchant</span>
             </div>
             <div className="flex items-center text-xl font-black italic">
                <span className="text-[#003087]">Pay</span>
                <span className="text-[#009cde]">Pal</span>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

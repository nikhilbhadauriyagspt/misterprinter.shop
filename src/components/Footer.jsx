import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowUpRight, Globe, Mail, Loader2, CheckCircle2, MapPin, Phone, ShieldCheck, Zap, Terminal } from 'lucide-react';
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
    <footer className="bg-white text-slate-900 pt-20 pb-10 font-urbanist relative overflow-hidden border-t border-slate-100">
      {/* Subtle Light Technical Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- TOP ROW: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 pb-20 border-b border-slate-100">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-6 mb-10 group">
              <img src="/logo/printerkicks.png" alt="PRINTERKICKS" className="h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="h-10 w-px bg-slate-200" />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">A Subsidiary of</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">PrimeFix Solutions</span>
              </div>
            </Link>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mb-10">
              Defining the future of professional tech infrastructure. PrinterKicks is an Authorized HP Partner specializing in precision workstations and enterprise solutions.
            </p>
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                  <img src="/brands/hp.png" alt="HP" className="h-5 w-auto object-contain rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-900">Authorized Partner</span>
               </div>
               <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                  <Globe size={18} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-900">Global Logistics</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-blue-50/50 border border-blue-100 p-8 lg:p-10 rounded-[2.5rem] relative overflow-hidden group shadow-sm">
               <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity text-blue-600">
                  <Terminal size={100} strokeWidth={1} />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />
                     <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Transmission Hub</h4>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Subscribe to professional updates.</h3>
                  
                  <form onSubmit={handleSubscribe} className="max-w-xl relative">
                    <input
                      required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER EMAIL PROTOCOL"
                      className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                    />
                    <button
                      disabled={loading}
                      className="absolute right-1.5 top-1.5 h-11 px-6 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : <>Initialize <ArrowUpRight size={14} className="ml-2" /></>}
                    </button>
                  </form>
                  <p className="mt-6 text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Restricted to authorized technical dispatches.</p>
               </div>
            </div>
          </div>
        </div>

        {/* --- MAIN LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">PRODUCTS</h4>
            <ul className="space-y-4">
              {categories.length > 0 ? (
                categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[13px] font-black uppercase tracking-tight flex items-center gap-3 group">
                      <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li><Link to="/shop" className="text-slate-500 hover:text-blue-600 text-[13px] font-black uppercase">Full Inventory</Link></li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">SUPPORT</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Track Order', path: '/orders' },
                { name: 'FAQ', path: '/faq' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-600 transition-colors text-[13px] font-black uppercase tracking-tight flex items-center gap-3 group">
                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">LEGAL & POLICIES</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Return Policy', 'Shipping Policy'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[13px] font-black uppercase tracking-tight flex items-center gap-3 group">
                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">CONTACT US</h4>
            <div className="space-y-8">
               <div className="flex items-start gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin size={18} className="text-blue-600" />
                  </div>
                  <span className="text-[13px] font-black text-slate-500 leading-relaxed uppercase tracking-tight">
                    3014 Dauphine St Ste A <br /> New Orleans, LA 70117, USA
                  </span>
               </div>
               <div className="flex flex-col gap-4">
                  <a href="mailto:info@printerkicks.shop" className="flex items-center gap-4 text-[13px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase group">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-white transition-colors">
                      <Mail size={18} className="text-blue-600" />
                    </div>
                    info@printerkicks.shop
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* --- MAP INTEGRATION --- */}
        <div className="w-full h-[350px] mb-20 rounded-[3rem] overflow-hidden border border-slate-100 shadow-inner grayscale-[0.8] hover:grayscale-0 transition-all duration-1000">
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.142851421456!2d-90.0414416!3d29.9610111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a61660666667%3A0x6666666666666666!2s3014%20Dauphine%20St%2C%20New%20Orleans%2C%20LA%2070117%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
            <span>© 2026 PrinterKicks | ALL RIGHTS RESERVED.</span>
            <div className="hidden sm:flex items-center gap-3 border-l border-slate-100 pl-8">
              <Globe size={14} /> <span>EN-US | GLOBAL</span>
            </div>
          </div>

          <div className="flex items-center gap-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">Verified Secure Merchant</span>
             </div>
             <div className="h-4 w-px bg-slate-200" />
             <div className="text-blue-600 italic font-black text-xl flex items-center gap-1">PayPal</div>
          </div>
        </div>

      </div>
    </footer>
  );
}

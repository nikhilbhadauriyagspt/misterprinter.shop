import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  ChevronDown,  X,
  LogOut,
  Package,
  ArrowRight,
  ChevronRight,
  LayoutGrid,
  Sparkles,
  ShoppingBasket,
  Activity,
  Box,
  Home,
  Mail,
  HelpCircle,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer, isSearchOpen, openSearch, closeSearch } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          
          const filteredProds = (pData.status === 'success' ? pData.data : []).filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('chromebook')
          );

          const matchedCats = categories.flatMap(parent => [parent, ...(parent.children || [])])
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4);

          setSuggestions({
            products: filteredProds,
            categories: matchedCats
          });
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeSearch();
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          const filtered = data.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
        }
      });

    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setBrands(data.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
        }
      });

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const activeParent = categories.find(c => String(c.id) === String(hoveredParent));
  const subCategoriesToDisplay = activeParent?.children || [];

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-[100] font-urbanist bg-white border-b border-slate-900 shadow-sm">
      
      {/* --- TOP ROW: BRANDING & SEARCH --- */}
      <div className="py-3 lg:py-4 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 flex items-center justify-between gap-10">
          
          <Link to="/" className="flex items-center gap-6 shrink-0 group">
            <img src="/logo/MISTERPRINTER.png" alt="MISTERPRINTER" className="h-9 lg:h-11 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="h-10 w-px bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex flex-col justify-center leading-none">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
              <span className="text-[12px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
            </div>
          </Link>

          <div className="flex-1 relative max-w-2xl hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex items-center w-full bg-slate-50 border border-slate-900 transition-all overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600/10">
              <input 
                type="text" 
                placeholder="Search premium inventory..."
                className="flex-1 h-10 px-6 text-sm bg-transparent focus:outline-none placeholder:text-slate-400 font-bold uppercase tracking-wider"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="h-10 px-6 bg-slate-900 text-white hover:bg-indigo-600 transition-colors">
                <Search size={18} strokeWidth={3} />
              </button>
            </form>

            <AnimatePresence>
              {searchQuery.trim() && suggestions.products.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 w-full bg-white mt-2 shadow-2xl border border-slate-900 z-[110] max-h-[400px] overflow-y-auto"
                >
                  {suggestions.products.map((p) => (
                    <Link 
                      key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                      className="flex items-center gap-4 p-3 hover:bg-slate-50 border-b border-slate-100 transition-colors group"
                    >
                      <div className="h-10 w-10 shrink-0 border border-slate-900 p-1 bg-white">
                        <img src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} className="w-full h-full object-contain" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] font-black text-slate-900 uppercase truncate block group-hover:text-indigo-600 transition-colors">{p.name}</span>
                        <span className="text-[11px] text-indigo-600 font-bold mt-0.5 block tracking-wider">${p.price}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    </Link>
                  ))}
                  {suggestions.categories.map((c) => (
                    <Link 
                      key={c.id} to={`/shop?category=${c.slug}`} onClick={() => setSearchQuery('')}
                      className="flex items-center gap-4 p-3 hover:bg-slate-50 border-b border-slate-100 bg-slate-50/30 group"
                    >
                      <div className="h-10 w-10 flex items-center justify-center border border-slate-900 bg-white text-slate-900">
                        <LayoutGrid size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] font-black text-slate-600 uppercase truncate block">in {c.name}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/wishlist" className="h-10 w-10 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all relative border border-transparent hover:border-slate-900">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-indigo-600 text-white text-[8px] font-black flex items-center justify-center">{wishlistCount}</span>}
            </Link>
            <button onClick={openCartDrawer} className="h-10 w-10 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all relative border border-transparent hover:border-slate-900">
              <ShoppingBag size={20} />
              <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-slate-900 text-white text-[8px] font-black flex items-center justify-center border border-white/20">{cartCount}</span>
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <div className="relative group">
              {user ? (
                <div className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center text-[12px] font-black cursor-pointer border border-slate-900 hover:bg-indigo-600 transition-colors uppercase">
                  {(user.name || 'U').charAt(0)}
                </div>
              ) : (
                <Link to="/login" className="h-10 w-10 flex items-center justify-center text-slate-500 border border-transparent hover:border-slate-900 hover:text-slate-900 transition-all">
                  <User size={20} />
                </Link>
              )}
              <div className="absolute top-full right-0 pt-2 hidden group-hover:block w-56 z-[110]">
                <div className="bg-white border border-slate-900 shadow-2xl p-1">
                  {user && (
                    <div className="px-4 py-3 bg-slate-50 mb-1 border-b border-slate-100">
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest truncate">{user.name}</p>
                    </div>
                  )}
                  <Link to="/profile" className="block px-4 py-3 text-[10px] font-black text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">Profile Hub</Link>
                  <Link to="/orders" className="block px-4 py-3 text-[10px] font-black text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors">Order Logs</Link>
                  {user && <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-[10px] font-black text-red-600 hover:bg-red-50 uppercase tracking-[0.2em] border-t border-slate-100 mt-1">Terminate Session</button>}
                </div>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden h-10 w-10 flex items-center justify-center text-slate-900 border border-slate-900">
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM ROW: NAVIGATION --- */}
      <div className="bg-white">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 flex items-center relative h-12">
          
          {/* Left: Departments Button */}
          <div className="absolute left-4 md:left-10 z-10 h-full flex items-center">
            <button 
              onMouseEnter={() => setActiveDropdown('categories')}
              className={cn(
                "flex items-center gap-4 px-8 h-full transition-all text-[11px] font-black tracking-[0.3em] uppercase border-r border-slate-100",
                activeDropdown === 'categories' ? "bg-slate-900 text-white" : "text-slate-900 hover:text-indigo-600"
              )}
            >
               <LayoutGrid size={16} strokeWidth={2.5} className={cn("transition-transform duration-500", activeDropdown === 'categories' && "rotate-90")} />
               <span>Departments</span>
               <ChevronDown size={14} className={cn("ml-2 transition-transform duration-500", activeDropdown === 'categories' && "rotate-180")} />
            </button>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex-1 hidden md:flex items-center justify-center h-full pl-37">
            {[
              { name: 'Home', path: '/' },
              { name: 'Store', path: '/shop' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
              { name: 'FAQ', path: '/faq' }
            ].map((link) => (
              <Link 
                key={link.name} to={link.path} 
                className={cn(
                  "px-6 h-full flex items-center text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group",
                  location.pathname === link.path ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* Right Side: HP Partner Badge */}
          <div className="absolute right-4 md:right-10 z-10 h-full flex items-center pl-8 border-l border-slate-100 bg-white">
             <img src="/brands/hp.png" alt="HP" className="h-6 w-auto object-contain mr-4" />
             <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-tight antialiased">Authorized HP Partner</span>
          </div>

        </div>
      </div>

      {/* --- MEGA MENU: REFINED SQUARE --- */}
      <AnimatePresence>
        {activeDropdown === 'categories' && (
          <motion.div 
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            onMouseLeave={() => setActiveDropdown(null)}
            className="absolute top-full left-0 w-full bg-white border-t border-slate-200 z-[90] shadow-2xl border-b-2 border-slate-900"
          >
            <div className="max-w-[1920px] mx-auto flex min-h-[450px]">
              
              <div className="w-[300px] border-r border-slate-100 p-10 bg-slate-50/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 px-2">Catalog Nodes</p>
                <div className="space-y-1">
                  {categories.map(parent => (
                    <div 
                      key={parent.id} onMouseEnter={() => setHoveredParent(parent.id)}
                      className={cn(
                        "group flex items-center justify-between p-4 cursor-pointer transition-all border border-transparent",
                        String(hoveredParent) === String(parent.id) ? "bg-white border-slate-900 text-slate-900 translate-x-1" : "text-slate-500 hover:text-slate-900 hover:translate-x-1"
                      )}
                    >
                      <div className="flex items-center gap-4">
                         <div className={cn(
                           "h-10 w-10 flex items-center justify-center transition-all border border-slate-200 bg-white",
                           String(hoveredParent) === String(parent.id) ? "border-slate-900" : ""
                         )}>
                            <img 
                              src={`/category/${parent.slug}.jpg`} 
                              className="h-6 w-6 object-contain grayscale group-hover:grayscale-0 transition-all" 
                              alt="" 
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                              }}
                            />
                            <div className="hidden text-slate-400 group-hover:text-indigo-600">
                              {parent.name.toLowerCase().includes('printer') ? <Printer size={20} /> : <Box size={20} />}
                            </div>
                         </div>
                         <span className="text-[13px] font-black uppercase tracking-tight">{parent.name}</span>
                      </div>
                      <ChevronRight size={14} className={cn("transition-all", String(hoveredParent) === String(parent.id) ? "translate-x-0 opacity-100" : "opacity-0")} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-16 bg-white">
                <div className="flex items-end justify-between mb-12 border-b border-slate-100 pb-8">
                   <h4 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">{activeParent?.name || 'Inventory'}</h4>
                   <Link to={`/shop?category=${activeParent?.slug}`} onClick={() => setActiveDropdown(null)} className="h-12 px-8 bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                      View Collection <ArrowRight size={14} />
                   </Link>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {subCategoriesToDisplay.map((sub) => (
                    <Link 
                      key={sub.id} to={`/shop?category=${sub.slug}`} onClick={() => setActiveDropdown(null)}
                      className="group p-6 bg-slate-50 border border-slate-100 hover:border-slate-900 hover:bg-white transition-all flex flex-col items-start gap-4"
                    >
                      <ShoppingBasket size={22} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      <span className="text-[14px] font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="w-[360px] p-12 border-l border-slate-100 bg-slate-50 flex flex-col gap-10">
                 <div className="space-y-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-2">Authorized Brands</p>
                    <div className="grid grid-cols-2 gap-2">
                      {brands.map(brand => (
                        <Link 
                          key={brand.id} to={`/shop?brand=${encodeURIComponent(brand.name)}`} onClick={() => setActiveDropdown(null)}
                          className="px-4 py-4 bg-white border border-slate-200 text-[11px] font-black text-slate-600 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50 transition-all text-center uppercase tracking-tight"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                 </div>
                 <div className="mt-auto p-10 bg-slate-900 text-white relative overflow-hidden group/cta">
                    <Sparkles size={60} className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:rotate-12" />
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3">Prime Series</p>
                    <h4 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-8">Exclusive<br/>Pro Inventory</h4>
                    <Link to="/shop" onClick={() => setActiveDropdown(null)} className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-indigo-500 pb-1 hover:gap-4 transition-all inline-flex items-center gap-2">
                       Explore Now <ArrowRight size={14} />
                    </Link>
                 </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* --- MOBILE SIDEBAR --- */}
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-slate-950/40 backdrop-blur-sm xl:hidden" />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 left-0 h-full w-[320px] bg-white z-[210] border-r-2 border-slate-900 xl:hidden flex flex-col font-urbanist">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <Link to="/" onClick={() => setIsSidebarOpen(false)}><img src="/logo/MISTERPRINTER.png" alt="MISTERPRINTER" className="h-9 w-auto object-contain" /></Link>
              <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <nav className="flex flex-col gap-1.5">
                {[{ name: 'Home', path: '/', icon: <Home size={18} /> }, { name: 'Store', path: '/shop', icon: <ShoppingBag size={18} /> }, { name: 'About', path: '/about' , icon: <Activity size={18} /> }, { name: 'Contact', path: '/contact' , icon: <Mail size={18} /> }, { name: 'FAQ', path: '/faq', icon: <HelpCircle size={18} /> }].map((link) => (
                  <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className={cn("flex items-center gap-4 px-5 py-5 uppercase text-[12px] font-black tracking-widest transition-colors", location.pathname === link.path ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>{link.icon} {link.name}</Link>
                ))}
              </nav>
              <div className="pt-10 border-t border-slate-100">
                 {user ? <button onClick={handleLogout} className="w-full text-left px-5 py-5 text-[12px] font-black uppercase text-red-500 hover:bg-red-50">Disconnect Session</button> : <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block px-5 py-5 bg-indigo-600 text-white text-[12px] font-black uppercase text-center shadow-xl shadow-indigo-600/20">Authorized Login</Link>}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

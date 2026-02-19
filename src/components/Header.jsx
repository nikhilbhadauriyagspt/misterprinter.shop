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
  Smartphone,
  Cpu,
  Monitor,
  Headphones,
  Gamepad,
  LogOut,
  Settings,
  Package,
  ArrowRight,
  ChevronRight,
  Loader2,
  Clock,
  Mail,
  Phone,
  LayoutGrid,
  Zap,
  ShieldCheck,
  MousePointer2,
  Sparkles,
  Layers,
  ShoppingBasket,
  Terminal,
  Activity,
  Box,
  Home,
  HelpCircle
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

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
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
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
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
          // Filter out laptop related categories
          const filtered = data.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
        }
      });

    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') setBrands(data.data);
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
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-urbanist bg-white/90 backdrop-blur-2xl border-b border-gray-100",
          isScrolled ? "py-3 shadow-md" : "py-5 shadow-sm"
        )}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 relative">
          <div className="flex items-center justify-between">
            
            {/* --- LEFT: LOGO & NAV --- */}
            <div className="flex items-center gap-64">
              <Link to="/" className="flex items-center gap-5 group relative">
                <img 
                  src="/logo/printerkicks.png" 
                  alt="PRINTERKICKS" 
                  className="h-10 lg:h-12 w-auto object-contain transition-all duration-500" 
                />
                <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                <div className="hidden sm:flex flex-col justify-center leading-none">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">A Subsidiary of</span>
                  <span className="text-[18px] font-black text-slate-900 tracking-tighter">PrimeFix Solutions</span>
                </div>
              </Link>

              <nav className="hidden xl:flex items-center gap-1">
                {[
                  { name: 'Home', path: '/', icon: <Home size={14} /> },
                  { name: 'Store', path: '/shop' },
                  { name: 'About', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'FAQ', path: '/faq' }
                ].map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      className={cn(
                        "px-4 py-2 text-[11px] font-black tracking-[0.2em] uppercase transition-all flex items-center gap-2 group relative",
                        isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div 
                          layoutId="headerNavMarker" 
                          className="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]" 
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* --- RIGHT: ACTIONS --- */}
            <div className="flex items-center gap-4">
              
              {/* HP BRANDING BADGE */}
              <div className="hidden min-[1550px]:flex items-center gap-4 py-2 px-5 bg-slate-50/50 rounded-2xl border border-slate-100 mr-2">
                 <div className="h-9 w-9 bg-white p-1.5 flex items-center justify-center rounded-xl shadow-sm border border-slate-100">
                    <img src="/brands/hp.png" alt="HP" className="w-full h-full object-contain" />
                 </div>
                 <div className="flex flex-col leading-none">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Official</span>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Authorized HP Partner</span>
                 </div>
              </div>

              <button 
                onMouseEnter={() => setActiveDropdown('categories')}
                className={cn(
                  "hidden lg:flex items-center gap-3 px-6 h-11 rounded-lg transition-all duration-500 text-[10px] font-black tracking-[0.3em] uppercase border",
                  activeDropdown === 'categories' 
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                    : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white"
                )}
              >
                <LayoutGrid size={14} />
                DEPARTMENTS
                <ChevronDown size={12} className={cn("transition-transform duration-500", activeDropdown === 'categories' && "rotate-180")} />
              </button>

              <div className="h-5 w-px hidden lg:block bg-slate-200" />

              <div className="flex items-center gap-1">
                <motion.button 
                  whileTap={{ scale: 0.9 }} onClick={openSearch}
                  className="p-2.5 transition-colors text-slate-400 hover:text-blue-600"
                >
                  <Search size={19} strokeWidth={2.5} />
                </motion.button>

                <motion.div whileTap={{ scale: 0.9 }} className="hidden sm:block">
                  <Link to="/wishlist" className="p-2.5 transition-colors relative block text-slate-400 hover:text-red-500">
                    <Heart size={19} strokeWidth={2.5} />
                    {wishlistCount > 0 && (
                      <span className="absolute top-1 right-1 h-4 w-4 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white shadow-sm">{wishlistCount}</span>
                    )}
                  </Link>
                </motion.div>

                <motion.button 
                  whileTap={{ scale: 0.9 }} onClick={openCartDrawer}
                  className="p-2.5 transition-colors relative text-slate-400 hover:text-blue-600"
                >
                  <ShoppingBag size={19} strokeWidth={2.5} />
                  <span className="absolute top-1 right-1 h-4 w-4 bg-slate-900 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white shadow-sm">{cartCount}</span>
                </motion.button>

                <div className="relative ml-2" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  {user ? (
                     <div className="h-9 w-9 border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-900 text-[10px] font-black cursor-pointer hover:bg-slate-900 hover:text-white transition-all rounded-lg">
                       {(user.name || 'U').charAt(0).toUpperCase()}
                     </div>
                  ) : (
                    <Link to="/login" className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
                      <User size={19} strokeWidth={2.5} />
                    </Link>
                  )}

                  <AnimatePresence>
                    {isProfileOpen && user && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, filter: "blur(10px)" }} 
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
                        exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        className="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-100 p-2 z-[110] rounded-xl shadow-xl"
                      >
                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                          <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Authorized Access</p>
                          <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                        </div>
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all uppercase tracking-widest rounded-lg"><User size={14} /> Profile</Link>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all uppercase tracking-widest rounded-lg"><Package size={14} /> My Orders</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest rounded-lg mt-1 border-t border-slate-50 pt-3"><LogOut size={14} /> Logout</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="xl:hidden h-9 w-9 flex items-center justify-center bg-slate-900 text-white rounded-lg ml-2 active:scale-95"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- COMPACT PROFESSIONAL MEGA MENU --- */}
        <AnimatePresence>
          {activeDropdown === 'categories' && (
            <motion.div 
              ref={dropdownRef}
              initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              onMouseLeave={() => setActiveDropdown(null)}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-200 overflow-hidden z-[90] shadow-2xl"
            >
              <div className="max-w-[1920px] mx-auto flex min-h-[450px]">
                
                {/* 01: Sidebar */}
                <div className="w-[300px] border-r border-slate-100 p-8 bg-slate-50/50">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] mb-8">Departments</p>
                  <div className="space-y-1.5">
                    {categories.map(parent => (
                      <motion.div 
                        key={parent.id}
                        onMouseEnter={() => setHoveredParent(parent.id)}
                        className={cn(
                          "group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 border border-transparent",
                          String(hoveredParent) === String(parent.id) 
                            ? "bg-white shadow-sm text-blue-600 border-slate-100" 
                            : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-500",
                             String(hoveredParent) === String(parent.id) ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-400"
                           )}>
                              {parent.name.toLowerCase().includes('printer') ? <Monitor size={16} /> : <Cpu size={16} />}
                           </div>
                           <span className="text-[12px] font-black uppercase tracking-widest">{parent.name}</span>
                        </div>
                        <ChevronRight size={14} className={cn("transition-all duration-500", String(hoveredParent) === String(parent.id) ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 02: Content Grid */}
                <div className="flex-1 p-12 bg-white">
                  <div className="flex items-center justify-between mb-10">
                     <div>
                        <h4 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-1">{activeParent?.name || 'Authorized Tech'}</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Premium Infrastructure Solutions</p>
                     </div>
                     <Link to={`/shop?category=${activeParent?.slug}`} onClick={() => setActiveDropdown(null)} className="h-11 px-8 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all duration-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-black/10">
                        Shop All <ArrowRight size={14} />
                     </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {subCategoriesToDisplay.map((sub) => (
                      <Link 
                        key={sub.id}
                        to={`/shop?category=${sub.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-xl transition-all duration-500 flex items-center gap-5"
                      >
                        <div className="h-11 w-11 rounded-xl bg-white text-slate-400 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm border border-slate-100">
                           <ShoppingBasket size={20} />
                        </div>
                        <div>
                           <span className="text-[14px] font-black text-slate-900 block leading-none mb-1 uppercase tracking-tight">{sub.name}</span>
                           <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Browse Series</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 03: Feature Nodes / Brands */}
                <div className="w-[300px] p-10 border-l border-slate-100 bg-slate-50/30 flex flex-col gap-8">
                   <div className="space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="h-1 w-1 rounded-full bg-blue-600" />
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Official Brands</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.map(brand => (
                          <Link 
                            key={brand.id} to={`/shop?brand=${encodeURIComponent(brand.name)}`} onClick={() => setActiveDropdown(null)}
                            className="px-3 py-3 bg-white border border-slate-100 text-[9px] font-black text-slate-500 hover:text-blue-600 hover:border-blue-600 transition-all rounded-xl text-center uppercase tracking-tight"
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                   </div>

                   <div className="p-7 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group/cta shadow-xl">
                      <Sparkles className="text-blue-400 mb-4" size={24} />
                      <h4 className="text-lg font-black text-white uppercase tracking-tighter leading-tight">Pro Configs</h4>
                      <Link to="/shop" onClick={() => setActiveDropdown(null)} className="mt-6 flex items-center justify-between text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] hover:text-white transition-colors">
                         EXPLORE SHOWROOM <ArrowRight size={12} />
                      </Link>
                   </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- PREMIUM COMPACT SEARCH COMMAND CENTER --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeSearch}
              className="fixed inset-0 z-[200] bg-slate-950/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[210] px-6"
            >
              <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden">
                <form onSubmit={handleSearch} className="relative group p-4">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search premium inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 pl-12 pr-12 bg-slate-50 border border-transparent rounded-[1.5rem] text-sm font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-500 shadow-inner placeholder:text-slate-300"
                  />
                  <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400" size={20} strokeWidth={2.5} />
                  <button onClick={closeSearch} className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors">
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </form>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-8 pt-0">
                  <AnimatePresence mode="wait">
                    {searchQuery.trim().length > 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 py-4">
                        {/* Categories Segment */}
                        {suggestions.categories.length > 0 && (
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] px-4">Departments</p>
                            <div className="grid grid-cols-2 gap-2">
                              {suggestions.categories.map(cat => (
                                <Link 
                                  key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => { closeSearch(); setSearchQuery(''); }}
                                  className="flex items-center justify-between p-4 bg-slate-50 border border-transparent hover:border-blue-100 hover:bg-white transition-all rounded-2xl group"
                                >
                                  <span className="text-xs font-black text-slate-900 uppercase">{cat.name}</span>
                                  <ArrowRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Products Segment */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-4">Inventory Units</p>
                          <div className="space-y-2">
                            {suggestions.products.map((p) => (
                              <Link 
                                key={p.id} to={`/product/${p.slug}`} onClick={() => { closeSearch(); setSearchQuery(''); saveSearch(searchQuery); }}
                                className="flex items-center gap-6 p-4 border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all rounded-2xl group"
                              >
                                <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform">
                                  <img src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-black text-slate-900 uppercase truncate leading-tight group-hover:text-blue-600 transition-colors">{p.name}</p>
                                  <p className="text-[10px] font-bold text-blue-600 mt-1">${p.price}</p>
                                </div>
                                <ArrowRight size={16} className="text-slate-200 group-hover:text-blue-600 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        <button onClick={handleSearch} className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl">Execute Exhaustive Search</button>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-6">
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] border-b border-slate-50 pb-4">Recent Access</h4>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.length > 0 ? (
                              recentSearches.map(t => (
                                <button 
                                  key={t} onClick={() => setSearchQuery(t)} 
                                  className="px-4 py-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest flex items-center gap-2"
                                >
                                  <Clock size={12} className="opacity-40" /> {t}
                                </button>
                              ))
                            ) : (
                              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No log entries found</p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-50 pb-4">Quick Nodes</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {categories.slice(0, 4).map(cat => (
                              <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={closeSearch} className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-600 transition-all">
                                 <span className="text-[10px] font-black text-slate-900 group-hover:text-white uppercase truncate">{cat.name}</span>
                                 <ChevronRight size={14} className="text-slate-300 group-hover:text-white" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* --- MOBILE NAVIGATION SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-slate-950/20 backdrop-blur-md xl:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[320px] bg-white z-[210] shadow-2xl xl:hidden flex flex-col font-urbanist"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4">
                  <img src="/logo/printerkicks.png" alt="PRINTERKICKS" className="h-9 w-auto object-contain" />
                  <div className="h-6 w-px bg-slate-200" />
                  <div className="flex flex-col justify-center leading-none">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Subsidiary of</span>
                    <span className="text-[16px] font-black text-slate-900 tracking-tight">PrimeFix Solutions</span>
                  </div>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-900 border border-slate-100 shadow-sm">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] px-2">Navigation</p>
                  <nav className="flex flex-col gap-1">
                    {[
                      { name: 'Home', path: '/', icon: <Home size={18} /> },
                      { name: 'Store', path: '/shop', icon: <ShoppingBag size={18} /> },
                      { name: 'About', path: '/about', icon: <Activity size={18} /> },
                      { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
                      { name: 'FAQ', path: '/faq', icon: <HelpCircle size={18} /> }
                    ].map((link) => (
                      <Link 
                        key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                          location.pathname === link.path ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {link.icon} {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="space-y-4 pt-10 border-t border-slate-50">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] px-2">Account Node</p>
                   {user ? (
                     <div className="space-y-1">
                        <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 rounded-xl"><User size={18} /> Profile Dashboard</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl"><LogOut size={18} /> Terminate Session</button>
                     </div>
                   ) : (
                     <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-4 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20"><User size={18} /> Authorized Login</Link>
                   )}
                </div>
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Node Active</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
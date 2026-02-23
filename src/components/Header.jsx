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
  HelpCircle,
  Globe
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
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-urbanist py-2 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        )}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 relative">
          <div className="flex items-center justify-between gap-4">
            
            {/* --- LEFT: NAV & TRUST --- */}
            <div className="flex-1 flex items-center justify-start gap-10">
              <nav className="hidden xl:flex items-center gap-1 p-1 bg-slate-100/50 backdrop-blur-md rounded-full border border-slate-200/50 shadow-inner h-12">
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
                        "px-5 py-2 h-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 rounded-full flex items-center gap-2 group relative",
                        isActive 
                          ? "bg-white text-blue-600 shadow-sm" 
                          : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* HP PREMIUM TRUST BADGE */}
              <div className="hidden min-[1450px]:flex items-center gap-4 px-5 h-12 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all duration-500 group/hp cursor-default shrink-0 ml-auto">
                 <div className="relative">
                    <div className="h-7 w-7 bg-white p-1 flex items-center justify-center rounded-lg shadow-inner border border-slate-100 group-hover/hp:border-blue-300 transition-colors duration-500">
                       <img src="/brands/hp.png" alt="HP" className="w-full h-full object-contain" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
                 </div>
                 <div className="flex flex-col leading-tight">
                    <span className="text-[7px] font-black text-blue-600 uppercase tracking-[0.2em] mb-0.5">Verified</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight">HP Partner</span>
                 </div>
              </div>
            </div>

            {/* --- CENTER: LOGO & PRIME FIX (FLOATING PENDANT) --- */}
            <div className="flex-shrink-0 relative group/pendant mt-2 mx-12">
              <div className={cn(
                "absolute top-[-50px] left-1/2 -translate-x-1/2 w-[125%] h-[190%] bg-white rounded-b-[4.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.08)] border-x border-b border-slate-100 transition-all duration-700",
                "group-hover/pendant:h-[200%] group-hover/pendant:shadow-[0_30px_60px_rgba(37,99,235,0.12)] group-hover/pendant:border-blue-100"
              )} />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-400/10 blur-[70px] rounded-full opacity-0 group-hover/pendant:opacity-100 transition-opacity duration-700" />

              <Link to="/" className="relative flex items-center gap-6 px-8 pt-4 pb-3 mt-1">
                <div className="relative">
                  <img 
                    src="/logo/EASYMYPRINT.png" 
                    alt="EASYMYPRINT" 
                    className="h-9 lg:h-12 w-auto object-contain transition-all duration-700 group-hover/pendant:scale-110 group-hover/pendant:rotate-[-2deg]" 
                  />
                </div>
                
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden sm:block" />
                
                <div className="hidden sm:flex flex-col justify-center leading-none">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
                </div>
              </Link>
            </div>

            {/* --- RIGHT: ACTIONS (REFINED PREMIUM HUB) --- */}
            <div className="flex-1 flex items-center justify-end gap-10">
              
              {/* DEPARTMENTS - SYMMETRICAL TO HP BADGE */}
              <button 
                onMouseEnter={() => setActiveDropdown('categories')}
                className={cn(
                  "hidden lg:flex items-center gap-2.5 px-6 h-12 rounded-full transition-all duration-500 text-[11px] font-black tracking-[0.15em] uppercase border-2 group/dept relative overflow-hidden mr-auto",
                  activeDropdown === 'categories' 
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                    : "bg-white border-slate-100 text-slate-900 hover:border-blue-600 hover:text-blue-600 shadow-sm"
                )}
              >
                 <LayoutGrid size={14} className={cn("transition-transform duration-500", activeDropdown === 'categories' ? "rotate-90" : "group-hover/dept:rotate-12")} />
                 <span>Departments</span>
              </button>

              <div className="flex items-center gap-3 bg-slate-100/50 backdrop-blur-md p-1.5 rounded-full border border-slate-200/50 shadow-inner">
                
                {/* INLINE SEARCH */}
                <div className="hidden lg:flex items-center relative group/search min-w-[180px] xl:min-w-[240px]">
                   <Search className="absolute left-4 text-slate-400 group-focus-within/search:text-blue-600 transition-colors" size={14} strokeWidth={2.5} />
                   <input 
                     type="text" 
                     placeholder="Quick Search..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                     className="w-full h-10 pl-10 pr-4 bg-white/50 border border-slate-200/50 rounded-full text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
                   />
                </div>

                <div className="hidden sm:block">
                  <Link to="/wishlist" className="h-10 w-10 flex items-center justify-center rounded-full transition-all relative text-slate-500 hover:bg-white hover:text-red-500 hover:shadow-sm">
                    <Heart size={18} strokeWidth={2.5} />
                    {wishlistCount > 0 && (
                      <span className="absolute top-1 right-1 h-4 w-4 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-slate-100">{wishlistCount}</span>
                    )}
                  </Link>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={openCartDrawer}
                  className="h-10 w-10 flex items-center justify-center rounded-full transition-all relative text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                >
                  <ShoppingBag size={18} strokeWidth={2.5} />
                  <span className="absolute top-1 right-1 h-4 w-4 bg-slate-900 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-slate-100">{cartCount}</span>
                </motion.button>

                <div className="h-6 w-px bg-slate-200/50 mx-1" />

                <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  {user ? (
                     <motion.div 
                       whileHover={{ scale: 1.05 }}
                       className="h-10 w-10 border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[11px] font-black cursor-pointer rounded-full shadow-md overflow-hidden"
                     >
                       {(user.name || 'U').charAt(0).toUpperCase()}
                     </motion.div>
                  ) : (
                    <Link to="/login" className="h-10 w-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-900 hover:text-white hover:shadow-md transition-all">
                      <User size={18} strokeWidth={2.5} />
                    </Link>
                  )}

                  <AnimatePresence>
                    {isProfileOpen && user && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-64 bg-white/95 border border-slate-200 p-3 z-[110] rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl"
                      >
                        <div className="px-5 py-4 bg-slate-50 rounded-[1.5rem] mb-2 border border-slate-100">
                          <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">Authenticated Session</p>
                          <p className="text-sm font-black text-slate-900 truncate">{user.name}</p>
                        </div>
                        <div className="p-1 space-y-1">
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all uppercase tracking-widest rounded-xl"><User size={14} /> Profile Hub</Link>
                          <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all uppercase tracking-widest rounded-xl"><Package size={14} /> My Logistics</Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest rounded-xl mt-1 border-t border-slate-50 pt-2"><LogOut size={14} /> Disconnect</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="xl:hidden h-10 w-10 flex items-center justify-center bg-slate-900 text-white rounded-full ml-1 active:scale-95 shadow-lg shadow-slate-900/20"
                >
                  <LayoutGrid size={18} />
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
              className="absolute top-full left-0 w-full bg-white/80 backdrop-blur-3xl border-b border-slate-200/50 overflow-hidden z-[90] shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
            >
              <div className="max-w-[1920px] mx-auto flex min-h-[500px]">
                
                {/* 01: Sidebar - Modern Glass */}
                <div className="w-[320px] border-r border-slate-200/50 p-10 bg-slate-50/50">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Inventory</p>
                  </div>
                  <div className="space-y-2">
                    {categories.map(parent => (
                      <motion.div 
                        key={parent.id}
                        onMouseEnter={() => setHoveredParent(parent.id)}
                        className={cn(
                          "group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-500 border border-transparent",
                          String(hoveredParent) === String(parent.id) 
                            ? "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-blue-600 border-slate-100" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                        )}
                      >
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm border",
                             String(hoveredParent) === String(parent.id) 
                               ? "bg-slate-900 border-slate-900 text-white" 
                               : "bg-white border-slate-100 text-slate-400 group-hover:text-slate-900"
                           )}>
                              {parent.name.toLowerCase().includes('printer') ? <Monitor size={18} /> : <Cpu size={18} />}
                           </div>
                           <span className="text-[13px] font-bold uppercase tracking-tight">{parent.name}</span>
                        </div>
                        <ChevronRight size={14} className={cn("transition-all duration-500", String(hoveredParent) === String(parent.id) ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 02: Content Grid - Clean & Spacious */}
                <div className="flex-1 p-16 bg-white/40">
                  <div className="flex items-end justify-between mb-12">
                     <div>
                        <div className="flex items-center gap-2 mb-2">
                           <span className="h-px w-8 bg-blue-600" />
                           <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em]">Authorized Collection</span>
                        </div>
                        <h4 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">{activeParent?.name || 'Storefront'}</h4>
                     </div>
                     <Link to={`/shop?category=${activeParent?.slug}`} onClick={() => setActiveDropdown(null)} className="h-14 px-10 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 transition-all duration-500 text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-black/10">
                        View Complete Range <ArrowRight size={16} />
                     </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {subCategoriesToDisplay.map((sub) => (
                      <Link 
                        key={sub.id}
                        to={`/shop?category=${sub.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="group p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 flex items-center gap-6"
                      >
                        <div className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-110">
                           <ShoppingBasket size={24} />
                        </div>
                        <div>
                           <span className="text-[16px] font-black text-slate-900 block leading-none mb-1.5 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{sub.name}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Explore Series</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 03: Feature Nodes - Refined */}
                <div className="w-[340px] p-12 border-l border-slate-200/50 bg-slate-50/30 flex flex-col gap-10">
                   <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-2">Partner Brands</p>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.map(brand => (
                          <Link 
                            key={brand.id} to={`/shop?brand=${encodeURIComponent(brand.name)}`} onClick={() => setActiveDropdown(null)}
                            className="px-4 py-4 bg-white border border-slate-100 text-[10px] font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all rounded-2xl text-center uppercase tracking-tight"
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                   </div>

                   <div className="mt-auto p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group/cta shadow-2xl shadow-black/20">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles size={60} />
                      </div>
                      <div className="relative z-10">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">New Arrivals</p>
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-tight mb-6">Pro Configuration<br/>Series 2024</h4>
                        <Link to="/shop" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                           BROWSE NOW <ArrowRight size={14} className="text-blue-400" />
                        </Link>
                      </div>
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
                  <img src="/logo/EASYMYPRINT.png" alt="EASYMYPRINT" className="h-9 w-auto object-contain" />
                  <div className="h-6 w-px bg-slate-200" />
                  <div className="flex flex-col justify-center leading-none">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
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

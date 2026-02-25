import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Activity } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Authentication protocol failed.');
      }
    } catch (err) {
      setError('Connection timeout: Unable to reach terminal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-urbanist px-6 py-20 relative overflow-hidden">
      
      <div className="max-w-md w-full relative z-10">
        
        {/* --- BRAND HEADER --- */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-10 group">
            <div className="flex items-center gap-4 border-2 border-slate-900 p-2 bg-white shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
              <img src="/logo/MISTERPRINTER.png" alt="MISTERPRINTER" className="h-8 w-auto object-contain" />
              <div className="h-8 w-[2px] bg-slate-900" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
              </div>
            </div>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-none">Authentication.</h1>
        </div>

        {/* --- LOGIN MODULE --- */}
        <div className="bg-white border-2 border-slate-900 p-10 shadow-[12px_12px_0px_rgba(0,0,0,0.05)] relative">
          <form onSubmit={handleLogin} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border-2 border-red-200 text-center flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(220,38,38,0.1)]"
                >
                  <Activity size={14} strokeWidth={3} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identification / Email</label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                    <Mail className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    required type="email" placeholder="NAME@DOMAIN.COM" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-16 pr-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Key / Password</label>
                  <Link to="#" className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Reset?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                    <Lock className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-16 pr-16 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-16 bg-slate-900 text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] disabled:opacity-50 group active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  INITIALIZE SIGN-IN
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t-2 border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              New Network User?
              <Link to="/signup" className="text-indigo-600 hover:underline ml-2">Request Access</Link>
            </p>
          </div>
        </div>

        <div className="mt-12" />
      </div>
    </div>
  );
}

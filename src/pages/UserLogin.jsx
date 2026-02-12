import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../config';

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
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 font-urbanist px-6 py-20 pt-40">
      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        
        {/* Left Side: Brand/Marketing */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <Link to="/" className="inline-block mb-12">
              <img src="/logo/logo.png" alt="PRIMEFIX" className="h-10 w-auto invert brightness-0" />
            </Link>
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mb-6">
              Access the <br /> <span className="text-blue-500 italic">Elite</span> Catalog.
            </h2>
            <p className="text-slate-400 text-lg font-bold leading-relaxed max-w-xs">
              Manage your orders, track shipments, and access personalized tech recommendations.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-blue-400">
              <ShieldCheck size={20} />
              Verified Authenticity
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              AUTHORIZED HP PARTNER SINCE 2026.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Welcome Back.</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Login to your premium account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 text-red-500 text-xs font-black uppercase tracking-widest rounded-2xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    required
                    type="email" 
                    placeholder="NAME@COMPANY.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-16 pl-14 pr-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-16 pl-14 pr-14 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-2xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><span className="ml-4">Sign Intelligence In</span> <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-50 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 font-black hover:underline ml-2">Create Free ID</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

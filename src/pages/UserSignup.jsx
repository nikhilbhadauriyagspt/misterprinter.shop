import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, Activity } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        alert('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration protocol failed.');
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
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-none">Establish Account.</h1>
        </div>

        {/* --- SIGNUP MODULE --- */}
        <div className="bg-white border-2 border-slate-900 p-10 shadow-[12px_12px_0px_rgba(0,0,0,0.05)] relative">
          <form onSubmit={handleSignup} className="space-y-6">
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

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identification / Full Name</label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                    <User className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    required type="text" placeholder="EX. ARTHUR DENT" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 pl-16 pr-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comm_Hub / Email</label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                    <Mail className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    required type="email" placeholder="NAME@DOMAIN.COM" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 pl-16 pr-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access_Code / Phone</label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                    <Phone className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    required type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-14 pl-16 pr-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Key / Password</label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                    <Lock className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                  INITIALIZE ACCOUNT
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t-2 border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Already Registered?
              <Link to="/login" className="text-indigo-600 hover:underline ml-2">Sign In Here</Link>
            </p>
          </div>
        </div>

        <div className="mt-12" />
      </div>
    </div>
  );
}

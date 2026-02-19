import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, ArrowRight, Loader2, CheckCircle2, Terminal, Activity, Globe, Headphones, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-urbanist overflow-hidden">
      <SEO 
        title="Contact Us | PrinterKicks" 
        description="Get in touch with PrinterKicks for technical support, bulk orders, or product inquiries. Our experts are here to help."
      />
      
      {/* --- PROFESSIONAL PAGE HEADER --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 mb-24">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase">
              Operational Support
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">TOUCH.</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl uppercase tracking-tight">
            Deploy specialized inquiries to our technical team. We provide precision assistance for authorized HP infrastructure and enterprise configurations.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- CONTACT MODULES --- */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-8 bg-slate-50 border border-slate-100 hover:border-blue-600/30 transition-all duration-500 group relative overflow-hidden rounded-[2rem]">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Mail size={20} strokeWidth={1.5} />
              </div>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Technical Dispatch</p>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">info@printerkicks.shop</h4>
              <div className="mt-6 flex items-center gap-2">
                 <div className="h-1 w-1 rounded-full bg-emerald-500" />
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Monitoring</span>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border border-slate-100 hover:border-blue-600/30 transition-all duration-500 group relative overflow-hidden rounded-[2rem]">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Physical Node</p>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">3014 Dauphine St Ste A <br/> New Orleans, LA 70117</h4>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                 <Headphones size={80} strokeWidth={1} />
              </div>
              <img src="/brands/hp.png" alt="HP" className="h-8 w-auto object-contain rounded mb-6 invert grayscale brightness-200" />
              <h4 className="text-lg font-black uppercase tracking-tight mb-2">AUTHORIZED PARTNER</h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed">Verified technical support & genuine deployment node.</p>
            </div>
          </div>

          {/* --- CONTACT FORM MODULE --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/20 relative overflow-hidden rounded-[2.5rem]">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-3">Transmission Successful.</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mb-10">A technical architect will respond within the next operational cycle.</p>
                  <button onClick={() => setStatus(null)} className="h-12 px-8 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">Reset Terminal</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                      <input 
                        required type="text" placeholder="EX. ARTHUR DENT" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-xs font-bold uppercase transition-all shadow-inner placeholder:text-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                      <input 
                        required type="email" placeholder="NAME@ENTERPRISE.COM" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-xs font-bold uppercase transition-all shadow-inner placeholder:text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                      <input 
                        type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-xs font-bold uppercase transition-all shadow-inner placeholder:text-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Subject</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-xs font-bold uppercase transition-all appearance-none cursor-pointer shadow-inner pr-12"
                        >
                          <option>General Inquiry</option>
                          <option>Technical Support</option>
                          <option>Order Log Access</option>
                          <option>Bulk Procurement</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Message</label>
                    <textarea 
                      required rows="4" placeholder="HOW CAN WE ASSIST YOU TODAY?" value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-xs font-bold uppercase transition-all resize-none shadow-inner placeholder:text-slate-200"
                    ></textarea>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button 
                      disabled={loading}
                      className="h-14 px-12 bg-slate-900 text-white rounded-full flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 group"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white animate-pulse" />
                          INITIALIZE TRANSMISSION
                        </>
                      )}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-center text-red-500 text-[9px] font-black uppercase tracking-widest mt-4">Protocol Failure: Retransmit Required</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

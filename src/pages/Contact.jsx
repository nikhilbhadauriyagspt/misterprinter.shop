import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, Send, Loader2, CheckCircle2, ChevronDown, ShieldCheck, Zap } from 'lucide-react';
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
    <div className="bg-white min-h-screen pt-20 lg:pt-24 font-urbanist overflow-hidden">
      <SEO 
        title="Contact Us | MISTERPRINTER" 
        description="Get in touch with MISTERPRINTER for premium support, corporate inquiries, or product guidance."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-indigo-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Operational Support</span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Get In<br/>
              <span className="text-indigo-600">Touch.</span>
            </h1>
            
            <p className="text-slate-500 text-base lg:text-lg font-bold leading-relaxed max-w-2xl border-l-4 border-slate-900 pl-8">
              Connect with our dedicated specialists for refined guidance on premium hardware and professional workspace configurations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- CONTACT INFO --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-10 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] group transition-all">
              <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center mb-10 group-hover:bg-indigo-600 transition-all">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Email Inquiry</p>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">info@misterprinter.shop</h4>
            </div>

            <div className="p-10 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] group transition-all">
              <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center mb-10 group-hover:bg-indigo-600 transition-all">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Office Node</p>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">10413 W Markham St, Little Rock, AR 72205, USA</h4>
            </div>

            <div className="p-10 bg-slate-900 text-white border-2 border-slate-900 shadow-[8px_8px_0px_rgba(79,70,229,0.2)] group overflow-hidden relative">
              <div className="relative z-10">
                <div className="h-16 w-16 bg-white flex items-center justify-center mb-8">
                   <img src="/brands/hp.png" alt="HP" className="h-8 w-auto object-contain" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter mb-6 leading-none">
                  AUTHORIZED<br/>HP PARTNER.
                </h4>
                <div className="pt-6 border-t border-white/10 flex">
                   <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest border border-indigo-400">
                      <ShieldCheck size={12} strokeWidth={3} /> Verified Merchant
                   </div>
                </div>
              </div>
              <Zap size={150} className="absolute -bottom-10 -right-10 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border-2 border-slate-900 p-8 lg:p-16 shadow-[12px_12px_0px_rgba(0,0,0,0.05)]">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="h-20 w-20 bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-10 border-2 border-emerald-500 shadow-[8px_8px_0px_rgba(16,185,129,0.1)]">
                    <CheckCircle2 size={40} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Request Recieved.</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12">System will confirm dispatch within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="h-14 px-12 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none">RE-ENTRY TERMINAL</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Name</label>
                      <input 
                        required type="text" placeholder="ENTER YOUR NAME" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address</label>
                      <input 
                        required type="email" placeholder="ENTER YOUR EMAIL" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phone Number</label>
                      <input 
                        type="tel" placeholder="ENTER PHONE NUMBER" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Inquiry Topic</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all appearance-none cursor-pointer pr-12"
                        >
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Order Inquiries</option>
                          <option>Corporate Procurement</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Detailed Message</label>
                    <textarea 
                      required rows="5" placeholder="HOW CAN WE ASSIST YOU?" value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button 
                      disabled={loading}
                      className="h-16 px-16 bg-slate-900 text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] disabled:opacity-50 group active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          SUBMIT INQUIRY <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-center text-red-500 text-[10px] font-black uppercase tracking-widest mt-6">Transmission Failed: Please re-authenticate and try again</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

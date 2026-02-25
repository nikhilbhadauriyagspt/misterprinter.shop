import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Loader2, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const tax = 0; 
  const finalTotal = total + shipping + tax;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-urbanist bg-white">
        <div className="h-20 w-20 bg-slate-50 border-2 border-slate-200 flex items-center justify-center mb-8 shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
          <ShoppingBag size={32} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Cart Empty.</h2>
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-12 italic">Please add professional hardware before checkout.</p>
        <Link to="/shop">
          <button className="h-14 px-12 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] border-2 border-slate-900 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none">
            RETURN TO SHOP
          </button>
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white text-center">
        <div className="h-24 w-24 bg-white border-2 border-slate-900 flex items-center justify-center mb-10 shadow-[8px_8px_0px_rgba(16,185,129,0.2)]">
          <Check size={48} strokeWidth={3} className="text-emerald-500" />
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">ACQUISITION<br/><span className="text-emerald-500">CONFIRMED.</span></h1>
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12 italic">Deployment protocol successfully initiated.</p>
        
        <div className="bg-slate-50 p-10 border-2 border-slate-900 mb-12 max-w-md w-full relative">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3 border-b border-slate-200 pb-2">Tracking Reference</p>
          <p className="text-3xl font-black text-slate-900 uppercase tracking-tight">#PFX-{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/">
          <button className="h-16 px-14 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.4em] border-2 border-slate-900 hover:bg-indigo-600 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
            BACK TO COMMAND HUB
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-20 lg:pt-24 font-urbanist">
      <SEO title="Secure Checkout | MISTERPRINTER" />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-12 lg:py-16 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50 mb-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-3">
              <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors mb-4 group">
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK TO MANIFEST
              </Link>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Secure<br/>
                <span className="text-indigo-600">Checkout.</span>
              </h1>
            </div>

            {/* Stepper - Square */}
            <div className="flex border-2 border-slate-900 bg-white p-1 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-4 px-6 py-2 border-r border-slate-100">
                 <div className={cn("h-8 w-8 flex items-center justify-center text-xs font-black border-2 transition-all", step >= 1 ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-300 border-slate-100")}>01</div>
                 <span className={cn("text-[10px] font-black uppercase tracking-widest", step >= 1 ? "text-slate-900" : "text-slate-300")}>Logistics</span>
              </div>
              <div className="flex items-center gap-4 px-6 py-2">
                 <div className={cn("h-8 w-8 flex items-center justify-center text-xs font-black border-2 transition-all", step >= 2 ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-300 border-slate-100")}>02</div>
                 <span className={cn("text-[10px] font-black uppercase tracking-widest", step >= 2 ? "text-slate-900" : "text-slate-300")}>Settlement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 pb-24">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                  <div className="bg-white border-2 border-slate-900 p-8 lg:p-12 shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-4 mb-10 border-b-2 border-slate-100 pb-4">
                      <Mail size={20} className="text-indigo-600" strokeWidth={2.5} />
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">Contact Information</h3>
                    </div>
                    <div className="space-y-6">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="ENTER YOUR EMAIL" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all" />
                    </div>
                  </div>

                  <div className="bg-white border-2 border-slate-900 p-8 lg:p-12 shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-4 mb-10 border-b-2 border-slate-100 pb-4">
                      <MapPin size={20} className="text-indigo-600" strokeWidth={2.5} />
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">Shipping Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</label>
                        <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="FIRST NAME" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                        <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="LAST NAME" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all" />
                      </div>
                    </div>
                    <div className="mt-8 space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Street Address</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="HOUSE NO / STREET / AREA" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="CITY" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zip Code</label>
                        <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP CODE" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all" />
                      </div>
                    </div>
                    <div className="mt-8 space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="PHONE NUMBER" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                  <div className="bg-white border-2 border-slate-900 p-8 lg:p-12 shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-4 mb-10 border-b-2 border-slate-100 pb-4">
                      <CreditCard size={20} className="text-indigo-600" strokeWidth={2.5} />
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">Acquisition Method</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border-2 border-slate-900 overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-8 bg-white cursor-pointer transition-all flex flex-col justify-between h-48",
                          formData.paymentMethod === 'cod' ? "bg-slate-50 ring-inset ring-2 ring-indigo-600" : "hover:bg-slate-50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-indigo-600 bg-indigo-600" : "border-slate-200")}>
                            {formData.paymentMethod === 'cod' && <Check size={14} className="text-white" strokeWidth={4} />}
                          </div>
                          <Truck size={32} className={formData.paymentMethod === 'cod' ? "text-indigo-600" : "text-slate-200"} />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none mb-2">Direct Settlement</h4>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Upon successful hardware arrival</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-8 bg-white cursor-pointer transition-all flex flex-col justify-between h-48",
                          formData.paymentMethod === 'paypal' ? "bg-slate-50 ring-inset ring-2 ring-indigo-600" : "hover:bg-slate-50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-indigo-600 bg-indigo-600" : "border-slate-200")}>
                            {formData.paymentMethod === 'paypal' && <Check size={14} className="text-white" strokeWidth={4} />}
                          </div>
                          <div className={cn("italic font-black text-2xl transition-colors", formData.paymentMethod === 'paypal' ? "text-indigo-600" : "text-slate-200")}>PayPal</div>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none mb-2">PayPal Express</h4>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Instant digital asset settlement</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-8 pt-12">
                          <div className="p-8 bg-slate-900 text-white text-center relative overflow-hidden border-2 border-slate-900 shadow-[8px_8px_0px_rgba(79,70,229,0.3)]">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 relative z-10 text-indigo-400 italic">GATEWAY_ENCRYPTED // AES_256_ACTIVE</p>
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] relative z-10 shadow-xl">
                              <Lock size={14} /> SECURE LINK ESTABLISHED
                            </div>
                          </div>
                          <div className="relative z-0 max-w-lg mx-auto">
                            <PayPalButtons 
                              style={{ layout: "vertical", shape: "rect", label: "pay" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [{ amount: { value: finalTotal.toString() }, description: `MISTERPRINTER Operational Supply - ${cartCount} Units` }],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const details = await actions.order.capture();
                                  await handleOrderSuccess(details);
                                } catch (err) { alert("Failed to capture payment node."); }
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Control */}
            <div className="pt-12 flex flex-col items-center gap-6">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="h-16 px-16 bg-slate-900 text-white hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[10px_10px_0px_rgba(0,0,0,0.1)] font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-6 group disabled:opacity-50 active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      {step === 1 ? 'PROCEED TO SETTLEMENT' : 'INITIALIZE FULL DEPLOYMENT'}
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-[0.4em] transition-all flex items-center gap-2 border-b-2 border-transparent hover:border-slate-900 pb-1">
                   <ChevronLeft size={14} strokeWidth={3} /> BACK TO LOGISTICS
                </button>
              )}
            </div>
          </div>

          {/* --- SIDEBAR: MANIFEST --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border-2 border-slate-900 p-8 lg:p-10 sticky top-32 shadow-[12px_12px_0px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3 mb-10 border-b-2 border-slate-100 pb-4">
                 <ShieldCheck size={18} className="text-indigo-600" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">Order Manifest</h3>
              </div>
              
              <div className="space-y-6 mb-12 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-5 group border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                    <div className="h-16 w-16 bg-white border-2 border-slate-100 p-2 flex items-center justify-center shrink-0 group-hover:border-slate-900 transition-all">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-[12px] font-black text-slate-900 uppercase truncate leading-tight mb-1">{item.name}</h4>
                      <div className="flex items-center justify-between">
                         <p className="text-[9px] font-black text-slate-400 uppercase">Qty: {item.quantity}</p>
                         <p className="text-[11px] font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t-2 border-slate-900 pt-10">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Unit Capital</span>
                  <span className="text-slate-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Network Fee</span>
                  <span className="text-emerald-600 font-black">AUTHORIZED FREE</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t-2 border-slate-900 mt-6">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">Total Asset Valuation</span>
                  <span className="text-3xl font-black text-indigo-600 tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-10" />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { HelpCircle, Search, Plus, Minus, Mail, ShieldCheck, ChevronRight, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on MISTERPRINTER?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on MISTERPRINTER secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." }
    ]
  },
  {
    category: "Products & Warranty",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We are an Authorized HP Partner, but we also sell printers and accessories from other trusted brands." },
      { q: "How can I choose the right printer?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "What is your return policy?", a: "We accept returns for eligible products within 7–14 days of delivery, depending on the item category." },
      { q: "How do I request a return or replacement?", a: "Submit a request through your My Orders section or contact our support team." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5–7 business days after inspection." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-white min-h-screen pt-20 lg:pt-24 font-urbanist overflow-hidden">
      <SEO 
        title="FAQ Support Hub | MISTERPRINTER" 
        description="Find answers to common questions about orders, shipping, products, and technical support."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-indigo-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Support Protocol</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Knowledge<br/>
                <span className="text-indigo-600">Database.</span>
              </h1>

              <div className="w-full max-w-xl relative group">
                <div className="flex border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
                  <div className="h-14 w-14 bg-white flex items-center justify-center border-r-2 border-slate-900 shrink-0">
                    <Search size={20} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="SEARCH FOR SOLUTIONS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-14 px-6 text-sm bg-white focus:outline-none font-bold uppercase tracking-widest placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- SIDEBAR --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-slate-900 p-2 shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
              <div className="p-4 border-b-2 border-slate-100 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Browse Modules</span>
              </div>
              <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => { setActiveCategory(cat.category); setOpenIndex(0); }}
                    className={cn(
                      "w-full text-left px-6 py-4 transition-all uppercase text-[11px] font-black tracking-widest flex items-center justify-between group",
                      activeCategory === cat.category 
                      ? "bg-slate-900 text-white" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {cat.category}
                    <ChevronRight size={14} className={cn("transition-transform", activeCategory === cat.category ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
                  </button>
                ))}
              </div>
            </div>

            {/* Address Box */}
            <div className="p-10 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] group transition-all">
              <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center mb-10 group-hover:bg-indigo-600 transition-all">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Office Address</p>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">10413 W Markham St, Little Rock, AR 72205, USA</h4>
            </div>

            {/* Support Box */}
            <div className="p-10 bg-slate-900 text-white border-2 border-slate-900 shadow-[8px_8px_0px_rgba(79,70,229,0.2)] group relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-6 bg-indigo-400" />
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Direct Support</h4>
                </div>
                <p className="text-xl font-black lowercase tracking-tight leading-tight">info@misterprinter.shop</p>
                <a href="mailto:info@misterprinter.shop" className="flex items-center gap-4 text-[11px] font-black hover:text-indigo-400 transition-colors uppercase tracking-widest pt-6 border-t border-white/10">
                  <div className="h-10 w-10 bg-white text-slate-900 flex items-center justify-center border-2 border-white"><Mail size={18} /></div>
                  Launch Inquiry
                </a>
              </div>
              <HelpCircle size={150} className="absolute -bottom-10 -right-10 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
            </div>
          </div>

          {/* --- ACCORDION --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }} className="space-y-6"
              >
                <div className="flex items-center justify-between mb-10 border-b-4 border-slate-100 pb-6 px-2">
                   <h3 className="text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tighter">
                     {activeCategory}
                   </h3>
                   <div className="h-1 w-12 bg-slate-900" />
                </div>
                
                <div className="space-y-4">
                  {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "bg-white border-2 transition-all duration-500",
                        openIndex === idx ? "border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.05)]" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                        className="w-full px-8 py-8 lg:px-10 lg:py-10 flex items-center justify-between text-left group"
                      >
                        <span className={cn(
                          "text-base lg:text-lg font-black uppercase tracking-tight leading-snug pr-8 transition-colors",
                          openIndex === idx ? "text-indigo-600" : "text-slate-900"
                        )}>
                          {faq.q}
                        </span>
                        <div className={cn(
                          "h-10 w-10 border-2 flex items-center justify-center shrink-0 transition-all",
                          openIndex === idx ? "bg-slate-900 border-slate-900 text-white rotate-180" : "border-slate-100 text-slate-300 group-hover:border-slate-900 group-hover:text-slate-900"
                        )}>
                          {openIndex === idx ? <Plus size={18} strokeWidth={3} className="rotate-45" /> : <Plus size={18} strokeWidth={3} />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {openIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-8 pb-8 lg:px-10 lg:pb-10">
                              <div className="bg-slate-50 p-8 border-l-4 border-indigo-600 text-slate-600 text-sm lg:text-base font-bold leading-relaxed uppercase tracking-tight">
                                <p>
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div className="py-24 text-center border-2 border-slate-100 bg-slate-50 shadow-sm">
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Zero Results Returned</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 italic">No documentation matches your criteria</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

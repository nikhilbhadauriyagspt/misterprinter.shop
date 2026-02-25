import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Calendar, Loader2, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'Acquisition registered' },
    { key: 'processing', label: 'In Preparation', icon: Package, desc: 'Units being checked' },
    { key: 'shipped', label: 'In Transit', icon: Truck, desc: 'Consignment dispatched' },
    { key: 'out_for_delivery', label: 'Arrival Imminent', icon: MapPin, desc: 'Courier approaching' },
    { key: 'delivered', label: 'Handover Complete', icon: CheckCircle2, desc: 'Reached destination' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white pt-20 lg:pt-24 font-urbanist">
        <div className="py-12 lg:py-20 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50">
          <div className="max-w-[1920px] mx-auto text-center">
            <div className="h-20 w-20 bg-white border-2 border-slate-900 flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
              <Package size={32} className="text-slate-900" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Track Order.</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12 italic">Authentication or guest verification required.</p>
            
            <form onSubmit={handleGuestSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-px bg-slate-900 border-2 border-slate-900 p-[2px] shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
              <input 
                type="email" required placeholder="GUEST EMAIL ADDRESS" value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="flex-1 h-14 px-6 bg-white focus:outline-none text-xs font-bold uppercase transition-all"
              />
              <button className="h-14 px-10 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">
                LOCATE ORDER
              </button>
            </form>

            <div className="mt-12 pt-10 border-t border-slate-200">
              <Link to="/login" className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-indigo-600 pb-1 hover:text-slate-900 hover:border-slate-900 transition-all">
                Access Terminal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24 font-urbanist">
      <SEO title="Order History | MisterPrinter" />
      
      <div className="py-12 lg:py-16 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50 mb-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-indigo-600" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Transaction Log</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Active<br/>
                <span className="text-indigo-600">Orders.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-3 border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
               <div className="h-2 w-2 bg-indigo-600 animate-pulse" />
               <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">{orders.length} Consignments Found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Synchronizing Archive...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 border-2 border-slate-900 bg-slate-50 shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
            <Package size={40} className="text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Zero History Found</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-10 italic">No acquisitions detected in this terminal.</p>
            <Link to="/shop">
              <button className="h-14 px-12 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest border-2 border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none">
                BROWSE INVENTORY
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                key={order.id} 
                className="bg-white border-2 border-slate-900 shadow-[12px_12px_0px_rgba(0,0,0,0.05)] group"
              >
                <div className="p-6 lg:p-8 border-b-2 border-slate-900 flex flex-wrap items-center justify-between gap-8 bg-slate-50/50">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 bg-white border-2 border-slate-900 text-slate-900 flex items-center justify-center">
                        <Package size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Acquisition ID</p>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">#PFX-{order.order_code || order.id}</h3>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Dispatch Date</p>
                      <p className="text-[11px] font-black text-slate-900 uppercase">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className={cn(
                      "px-4 py-2 border-2 text-[9px] font-black uppercase tracking-widest flex items-center gap-3",
                      order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-500" :
                      order.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-500" :
                      "bg-indigo-50 text-indigo-600 border-indigo-500"
                    )}>
                      <div className={cn("h-1.5 w-1.5 animate-pulse", 
                        order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-500" :
                        order.status === 'pending' ? "bg-amber-500" : "bg-indigo-500"
                      )} />
                      {order.status}
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Valuation</p>
                      <p className="text-2xl font-black text-indigo-600 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
                  <div className="flex-1 space-y-8">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 group/item">
                        <div className="h-16 w-16 bg-slate-50 border-2 border-slate-100 flex items-center justify-center p-3 shrink-0 group-hover/item:border-slate-900 transition-all">
                          <img 
                            src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover/item:scale-110" alt="" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Authorized Unit</span>
                          <h4 className="text-[14px] font-black text-slate-900 uppercase truncate tracking-tight">{item.product_name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quantity: {item.quantity}</span>
                             <div className="h-1 w-1 bg-slate-200" />
                             <span className="text-[11px] font-black text-slate-900 tracking-tight">${parseFloat(item.price).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[340px] space-y-8 pt-8 lg:pt-0 lg:border-l-2 lg:border-slate-100 lg:pl-12">
                    <div className="space-y-6">
                       <div className="space-y-3">
                          <div className="flex items-center gap-3">
                             <MapPin size={16} className="text-indigo-600" />
                             <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Deployment Hub</h4>
                          </div>
                          <p className="text-[12px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight pl-7">
                            {order.address}, {order.city}<br />
                            {order.zipCode || 'United States'}
                          </p>
                       </div>
                       
                       <button 
                        onClick={() => setSelectedOrder(order)}
                        className="w-full h-14 bg-slate-900 text-white flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] active:shadow-none group"
                      >
                        TRACK REAL-TIME STATUS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tracking Modal - Square */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[1000]"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white z-[1001] shadow-[20px_20px_0px_rgba(0,0,0,0.1)] p-10 font-urbanist border-2 border-slate-900"
              >
                <div className="flex items-center justify-between mb-10 border-b-2 border-slate-900 pb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Tracking Terminal.</h2>
                    <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em] mt-2">Acquisition #PFX-{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none">
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>

                <div className="relative space-y-10">
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-100" />

                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const isActive = selectedOrder.status === step.key;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="relative flex gap-8">
                        <div className={cn(
                          "h-10 w-10 border-2 z-10 transition-all duration-500 flex items-center justify-center bg-white",
                          isCompleted ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-200'
                        )}>
                          <Icon size={18} strokeWidth={2.5} className={isActive ? 'animate-pulse' : ''} />
                        </div>
                        
                        <div className="flex-1 py-0.5">
                          <h4 className={cn(
                            "text-xs font-black uppercase tracking-widest transition-colors duration-500",
                            isCompleted ? 'text-slate-950' : 'text-slate-300'
                          )}>
                            {step.label}
                          </h4>
                          <p className={cn(
                            "text-[10px] font-bold mt-1 transition-colors duration-500 uppercase tracking-widest",
                            isCompleted ? 'text-slate-500' : 'text-slate-300'
                          )}>
                            {step.desc}
                          </p>
                          {isActive && (
                            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-indigo-50 text-indigo-600 border-2 border-indigo-100 text-[8px] font-black uppercase tracking-widest">
                              <div className="h-1 w-1 bg-indigo-600 animate-ping" />
                              REAL-TIME STATUS ACTIVE
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8 border-t-2 border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Network Provider</p>
                    <p className="text-[10px] font-black text-slate-900 uppercase">MisterPrinter Logistics</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Code</p>
                    <p className="text-[10px] font-black text-indigo-600 uppercase">Priority Dispatch</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

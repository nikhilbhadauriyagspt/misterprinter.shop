import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Globe, Award, Users, ChevronRight, Laptop, Printer, Package, Wrench, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-urbanist overflow-hidden">

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
              Authentic. Reliable. Authorized.
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
              About <br /> <span className="text-slate-400 italic">Prime Fix.</span>
            </h1>
            <p className="text-slate-500 text-lg font-bold leading-relaxed max-w-lg border-l-4 border-blue-600 pl-8">
              Welcome to Prime Fix Solutions, your trusted destination for authentic laptops, computers, printers, and accessories from HP and other leading technology brands.
            </p>
            <p className="text-slate-400 font-medium text-base max-w-lg">
              Headquartered in Louisiana, USA, we are proud to be an Authorized HP Partner, offering a full range of innovative computing and printing products.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[4rem] bg-gray-50 overflow-hidden border border-gray-100 shadow-2xl shadow-blue-600/5">
              <img
                src="/src/assets/bannerr/banner1.jpg"
                className="w-full h-full object-cover opacity-80 mix-blend-multiply transition-transform duration-1000 hover:scale-110"
                alt="HP Authorized Partner"
              />
            </div>
            {/* Float Badge */}
            <div className="absolute -bottom-10 -left-10 p-10 bg-white rounded-[3rem] shadow-2xl border border-gray-50 max-w-xs hidden md:block">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20">
                <Award size={24} />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase mb-2">Authorized HP Partner</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Official Warranty & Guaranteed Authenticity.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Journey */}
      <div className="bg-slate-900 py-32 text-white relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6 block">Our Journey</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-12">
              Redefining the <span className="text-slate-500 italic">Tech Experience.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 font-bold text-lg leading-relaxed">
              <p>
                Prime Fix Solutions was founded with a vision to redefine how customers experience technology. We saw a gap in the market — too many people struggled to find authentic, affordable, and dependable computing and printing solutions.
              </p>
              <p>
                That’s why we partnered with HP, to bring customers a seamless and transparent shopping experience backed by expert service. Based in New Orleans, Louisiana, we've grown into a nationwide platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Specialized <span className="text-slate-400">Services.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Laptop, title: "Laptops & Computers", desc: "High-performance systems for home, business, and professional use." },
            { icon: Printer, title: "Printers & Scanners", desc: "Inkjet, LaserJet, and All-in-One models tailored to every need." },
            { icon: Package, title: "Printing Supplies", desc: "Genuine HP ink, toner, and compatible consumables." },
            { icon: Zap, title: "Accessories", desc: "Keyboards, cables, and tools that enhance your workspace." },
            { icon: Globe, title: "Business Solutions", desc: "Managed print and device management for all company sizes." },
            { icon: Wrench, title: "Technical Support", desc: "Expert help for installation, configuration, and troubleshooting." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 group transition-all hover:bg-white hover:border-blue-500/20 hover:shadow-xl shadow-blue-600/5"
            >
              <div className="h-14 w-14 rounded-2xl bg-white border border-gray-100 text-slate-900 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-16 rounded-[4rem] bg-blue-600 text-white space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200">Our Mission</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">Empowering <br />Every Customer.</h3>
          <p className="text-blue-100 font-bold text-lg leading-relaxed pt-4">
            To empower every customer with reliable, efficient, and sustainable technology solutions — through genuine products, expert advice, and a customer-first approach.
          </p>
        </div>
        <div className="p-16 rounded-[4rem] bg-slate-900 text-white space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Our Vision</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">United States <br />Tech Leader.</h3>
          <p className="text-slate-400 font-bold text-lg leading-relaxed pt-4">
            To become a leading HP-partner e-commerce brand, known for delivering cutting-edge technology, unmatched service, and long-term value.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-gray-200 pb-12">
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">The Prime Fix Edge</span>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Why Choose <br /> <span className="text-slate-400 italic">Our Expertise.</span>
              </h2>
            </div>
            <p className="text-slate-500 font-bold text-lg max-w-sm">Official partners, expert guidance, and fast nationwide logistics.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Authorized HP Partner", icon: ShieldCheck },
              { title: "Multi-Brand Store", icon: Globe },
              { title: "Expert Guidance", icon: Zap },
              { title: "Fast Delivery", icon: Package },
              { title: "Safe & Secure", icon: ShieldCheck },
              { title: "Dedicated Care", icon: Heart },
              { title: "Sustainability", icon: Leaf },
              { title: "Professional Support", icon: Wrench }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <item.icon size={20} />
                </div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-snug">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-32 text-center">
        <div className="p-20 rounded-[5rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_70%)] opacity-10" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 relative z-10">Join the <br />Prime Fix Experience.</h2>
          <Link to="/shop" className="inline-flex items-center gap-4 px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-2xl relative z-10">
            Start Browsing <ChevronRight size={18} />
          </Link>
        </div>
      </div>

    </div>
  );
}

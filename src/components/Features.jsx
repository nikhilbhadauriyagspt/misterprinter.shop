import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap,
  Globe
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={18} />,
    title: "Authorized Partner",
    desc: "Official HP Warranty",
    tag: "HP OFFICIAL"
  },
  {
    icon: <Zap size={18} />,
    title: "Instant Processing",
    desc: "Real-time Order Flow",
    tag: "RAPID"
  },
  {
    icon: <Globe size={18} />,
    title: "Secure Logistics",
    desc: "Tracked US Delivery",
    tag: "US NETWORK"
  }
];

export default function Features() {
  return (
    <section className="bg-white font-urbanist py-8 border-b border-slate-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-6 flex items-center gap-6 group hover:bg-slate-50 transition-colors"
            >
              <div className="h-12 w-12 shrink-0 bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                {item.icon}
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-black text-slate-900 uppercase tracking-tight">{item.title}</span>
                  <div className="h-px w-4 bg-slate-300" />
                  <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">{item.tag}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

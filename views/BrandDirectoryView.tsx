
import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  MessageCircle, 
  Search,
  Globe,
  ChevronRight
} from 'lucide-react';
import { BRANDS } from '../constants';

const BrandDirectoryView: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Partner Network</h1>
        <p className="text-slate-500 font-medium">Find and contact our signature restaurants, salons, and hotels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BRANDS.map(brand => (
          <div key={brand.id} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 group">
             <div className="h-48 relative overflow-hidden">
               <img src={brand.landingPage.heroImageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                 <div className="flex items-center gap-3">
                   <img src={brand.logo} className="w-10 h-10 rounded-xl object-cover bg-white p-1" alt="" />
                   <h3 className="text-white font-black text-xl italic">{brand.name}</h3>
                 </div>
               </div>
               <div className="absolute top-6 right-6">
                 <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
                   {brand.type}
                 </span>
               </div>
             </div>

             <div className="p-8 space-y-6 flex-1 flex flex-col">
               <div className="space-y-4 flex-1">
                 <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                     <Mail size={16} />
                   </div>
                   <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                     <p className="text-sm font-bold text-slate-700">{brand.landingPage.brandEmail}</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                     <Phone size={16} />
                   </div>
                   <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Number</p>
                     <p className="text-sm font-bold text-slate-700">{brand.landingPage.brandPhone}</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                     <MapPin size={16} />
                   </div>
                   <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                     <p className="text-sm font-bold text-slate-700 leading-relaxed">{brand.landingPage.brandAddress}</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl">
                     <Clock size={16} />
                   </div>
                   <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Working Hours</p>
                     <p className="text-sm font-bold text-slate-700">{brand.landingPage.brandWorkingHours}</p>
                   </div>
                 </div>
               </div>

               <div className="pt-6 border-t border-slate-50 flex gap-3">
                 <button className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all">
                   <MessageCircle size={14} /> WhatsApp
                 </button>
                 <button className="flex-1 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                   <Globe size={14} /> Website
                 </button>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDirectoryView;

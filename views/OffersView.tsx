
import React, { useState } from 'react';
import { Ticket, ShoppingBag, Gift, Clock, Sparkles, ChevronRight, Check, X, QrCode } from 'lucide-react';

const MOCK_VOUCHERS = [
  { id: 'v1', name: '20% OFF Salon Services', code: 'AZURE20', expiry: '24 Dec 2024', brand: 'Azure Spa', status: 'ACTIVE' },
  { id: 'v2', name: 'Free Welcome Dessert', code: 'GOBBLE1', expiry: '30 Nov 2024', brand: 'Nine Blue', status: 'ACTIVE' },
  { id: 'v3', name: '₹1000 Stay Discount', code: 'ROYAL1K', expiry: 'Exp: Yesterday', brand: 'Grand Royal', status: 'EXPIRED' },
];

const MOCK_SUBS = [
  { id: 's1', name: 'Morning Coffee Pack', used: 3, total: 10, brand: 'Nine Blue', expiry: '15 Jan 2025' },
  { id: 's2', name: 'Monthly Hair Spa', used: 1, total: 1, brand: 'Azure Spa', expiry: '02 Dec 2024' },
];

const OffersView: React.FC<{ type: 'vouchers' | 'subscriptions' }> = ({ type }) => {
  const [activeTab, setActiveTab] = useState(type);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  return (
    <div className="p-8">
      {/* Redemption QR Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] w-full max-w-sm shadow-2xl animate-in zoom-in duration-300 relative">
            <button onClick={() => setSelectedOffer(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"><X size={18} /></button>
            <div className="p-10 text-center space-y-8">
               <div className="space-y-2">
                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{selectedOffer.brand}</p>
                 <h3 className="text-xl font-black text-slate-900">{selectedOffer.name}</h3>
               </div>
               <div className="w-56 h-56 bg-slate-50 border-4 border-slate-900 rounded-[2.5rem] mx-auto p-6 flex flex-col items-center justify-center">
                 <QrCode size={120} className="text-slate-900" />
                 <p className="mt-4 font-mono font-black text-lg tracking-[0.3em]">{selectedOffer.code || 'SUB-1204'}</p>
               </div>
               <p className="text-xs text-slate-500 font-medium leading-relaxed italic">Present this QR code at the billing counter to redeem your benefit.</p>
               <button onClick={() => setSelectedOffer(null)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Benefits</h1>
          <p className="text-slate-500">Access your active subscriptions and saved vouchers.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          <button onClick={() => setActiveTab('subscriptions')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'subscriptions' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>
            <ShoppingBag size={18} /> Subscriptions
          </button>
          <button onClick={() => setActiveTab('vouchers')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'vouchers' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>
            <Ticket size={18} /> Vouchers
          </button>
        </div>
      </div>

      {activeTab === 'subscriptions' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SUBS.map(sub => (
            <div key={sub.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col hover:border-indigo-100 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><ShoppingBag size={24} /></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{sub.brand}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{sub.name}</h3>
              <p className="text-sm text-slate-500 mb-4 font-medium">Used {sub.used} of {sub.total} units</p>
              <div className="w-full h-2 bg-slate-50 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-indigo-600" style={{ width: `${(sub.used/sub.total)*100}%` }}></div>
              </div>
              <button onClick={() => setSelectedOffer(sub)} className="mt-auto py-3 bg-slate-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">Redeem Unit</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_VOUCHERS.map(v => (
            <div key={v.id} className={`bg-white rounded-[2rem] border p-8 flex flex-col sm:flex-row gap-6 transition-all ${v.status === 'ACTIVE' ? 'border-slate-100 shadow-sm' : 'opacity-60'}`}>
              <div className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center shrink-0 ${v.status === 'ACTIVE' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                <Ticket size={32} />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">{v.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase">{v.brand}</p>
                </div>
                {v.status === 'ACTIVE' && (
                  <button onClick={() => setSelectedOffer(v)} className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">View QR Code</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersView;

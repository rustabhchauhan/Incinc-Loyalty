
import React, { useState } from 'react';
import { 
  Users, 
  Wallet, 
  Ticket, 
  Search, 
  Plus, 
  ArrowRight,
  HandHelping,
  PieChart,
  ArrowUpCircle,
  TrendingUp,
  Percent,
  CheckCircle2,
  X,
  CreditCard
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { Brand } from '../types';

interface BrandAdminProps {
  brand: Brand;
}

const BrandAdminDashboard: React.FC<BrandAdminProps> = ({ brand }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topupAmount, setTopupAmount] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [isDeducting, setIsDeducting] = useState(false);
  const [deductSuccess, setDeductSuccess] = useState(false);

  const bonusAmount = topupAmount ? (Number(topupAmount) * (brand.topupBonusPercentage / 100)) : 0;
  const totalValue = topupAmount ? Number(topupAmount) + bonusAmount : 0;

  const handleTopup = () => {
    alert(`Successfully topped up ₹${topupAmount} for ${selectedUser.name}. Extra ₹${bonusAmount} bonus added!`);
    setShowTopupModal(false);
    setTopupAmount('');
    setSelectedUser(null);
  };

  const handleManualDeduction = () => {
    setIsDeducting(true);
    setTimeout(() => {
      setIsDeducting(false);
      setDeductSuccess(true);
      setTimeout(() => setDeductSuccess(false), 3000);
    }, 1500);
  };

  const users = [
    { name: 'Rustabh Chauhan', tier: 'SILVER', wallet: '₹12,450', visits: 5 },
    { name: 'Bob Smith', tier: 'GOLD', wallet: '₹3,200', visits: 12 },
  ];

  return (
    <div className="p-8">
      {/* Topup Modal */}
      {showTopupModal && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Wallet Top-up</h3>
                <p className="text-slate-500 font-medium">Recharge {selectedUser.name}'s wallet.</p>
              </div>
              <button onClick={() => setShowTopupModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl flex items-center gap-4 border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-lg">
                  {selectedUser.name[0]}
                </div>
                <div>
                  <p className="font-black text-slate-900">{selectedUser.name}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Current Balance: {selectedUser.wallet}</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Enter Top-up Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">₹</span>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-600 outline-none text-2xl font-black transition-all"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                  />
                </div>
              </div>

              {topupAmount && (
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                      <Percent size={14} /> Brand Bonus ({brand.topupBonusPercentage}%)
                    </span>
                    <span className="text-lg font-black text-emerald-600">+ ₹{bonusAmount}</span>
                  </div>
                  <div className="h-px bg-emerald-200/50"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">Total Credit Value</span>
                    <span className="text-2xl font-black text-slate-900">₹{totalValue}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50/50 rounded-b-[2.5rem] flex gap-4">
              <button 
                onClick={() => setShowTopupModal(false)}
                className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={!topupAmount || Number(topupAmount) <= 0}
                onClick={handleTopup}
                className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Confirm Top-up <CheckCircle2 size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <img src={brand.logo} className="w-8 h-8 rounded-lg" alt="" />
            <h1 className="text-3xl font-bold text-slate-900">{brand.name}</h1>
          </div>
          <p className="text-slate-500">Welcome back, Nine Blue. Here's your brand's activity today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <Plus size={18} /> New Redemption
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Brand Revenue" value="₹42,500" icon={PieChart} trend="+5%" color="emerald" />
        <StatCard title="Active Vouchers" value="24" icon={Ticket} color="amber" />
        <StatCard title="New Signups" value="18" icon={Users} trend="+12%" color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Search */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Search Customers</h3>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search customer by name or mobile..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            
            <div className="space-y-3">
              {users.map((customer, idx) => (
                <div key={idx} className="p-4 border border-slate-50 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">{customer.name[0]}</div>
                    <div>
                      <h4 className="font-bold text-slate-900">{customer.name}</h4>
                      <p className="text-xs text-slate-500">{customer.tier} • {customer.wallet} Balance</p>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedUser(customer); setShowTopupModal(true); }} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all">Top-up</button>
                </div>
              ))}
            </div>
          </section>

          {/* Custom Purchase Deduction */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Custom Purchase Deductions</h3>
            <p className="text-sm text-slate-500 mb-6">Charge items not covered by standard vouchers/subs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Item/Service Note</label>
                <input type="text" placeholder="e.g. Extra Dessert" className="w-full p-4 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Amount (₹)</label>
                <input type="number" placeholder="500" className="w-full p-4 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>
            <button 
              onClick={handleManualDeduction}
              disabled={isDeducting}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl ${
                deductSuccess ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {isDeducting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : deductSuccess ? <><CheckCircle2 size={18} /> Transaction Verified</> : <><CreditCard size={18} /> Direct Deduct from Wallet</>}
            </button>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="font-bold mb-4 flex items-center gap-2 text-xl">
              <HandHelping size={24} className="text-indigo-200" />
              Redemption Center
            </h3>
            <p className="text-sm text-indigo-100 mb-8 leading-relaxed">Validate QR codes for subscriptions or vouchers instantly.</p>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black">Launch Scanner</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAdminDashboard;

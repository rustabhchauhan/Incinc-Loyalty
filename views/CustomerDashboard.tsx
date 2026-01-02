
import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Gift, 
  Star, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles, 
  Building2,
  Bell,
  MessageSquare,
  X,
  ChevronRight,
  QrCode,
  CheckCircle2,
  Camera,
  Heart,
  Smartphone,
  Info
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { Transaction, BrandType, User } from '../types';

interface CustomerDashboardProps {
  user: User;
  onNavigate: (view: string) => void;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', userId: 'u3', brandId: 'b1', amount: -1200, pointsEarned: 12, type: 'PURCHASE', description: 'Nine Blue Dinner', timestamp: '2023-11-20 20:30' },
  { id: 't2', userId: 'u3', brandId: 'b2', amount: -3500, pointsEarned: 35, type: 'PURCHASE', description: 'Hair Spa & Cut', timestamp: '2023-11-18 14:00' },
  { id: 't3', userId: 'u3', brandId: '', amount: 10000, pointsEarned: 0, type: 'TOPUP', description: 'Wallet Topup (Bonus +1000)', timestamp: '2023-11-15 10:00' },
];

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, onNavigate }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerStep, setScannerStep] = useState<'IDLE' | 'SCANNING' | 'PAYING' | 'SUCCESS'>('IDLE');

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleScanPay = () => {
    setShowScanner(true);
    setScannerStep('SCANNING');
    setTimeout(() => {
      setScannerStep('PAYING');
      setTimeout(() => {
        setScannerStep('SUCCESS');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="p-8 relative">
      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setShowScanner(false)} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full z-10">
              <X size={20} className="text-slate-500" />
            </button>
            
            <div className="p-10 text-center space-y-8">
              {scannerStep === 'SCANNING' && (
                <div className="space-y-8 animate-pulse">
                  <div className="w-48 h-48 border-4 border-dashed border-indigo-600 rounded-[2rem] mx-auto flex items-center justify-center relative overflow-hidden">
                    <Camera size={48} className="text-indigo-600" />
                    <div className="absolute inset-0 bg-indigo-600/10 animate-bounce"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Scanning QR...</h3>
                    <p className="text-slate-500 font-medium">Position the brand's QR code in the frame.</p>
                  </div>
                </div>
              )}

              {scannerStep === 'PAYING' && (
                <div className="space-y-8">
                   <div className="w-24 h-24 bg-slate-50 rounded-3xl mx-auto flex items-center justify-center">
                     <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                   </div>
                   <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Authorizing Pay</h3>
                    <p className="text-slate-500 font-medium">Processing ₹1,240 from your unified wallet.</p>
                  </div>
                </div>
              )}

              {scannerStep === 'SUCCESS' && (
                <div className="space-y-8 animate-in zoom-in duration-500">
                   <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                     <CheckCircle2 size={56} />
                   </div>
                   <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 italic">Payment Successful!</h3>
                    <p className="text-slate-500 font-medium">₹1,240 deducted from wallet. <br/>You earned <span className="text-amber-600 font-black">+12 Points</span>.</p>
                  </div>
                  <button onClick={() => setShowScanner(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black">Back to Home</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed top-24 right-8 w-80 bg-white rounded-2xl shadow-2xl border-l-4 border-indigo-600 p-4 z-50 animate-in slide-in-from-right duration-500">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <MessageSquare size={16} />
              </div>
              <p className="text-xs font-black text-slate-900 uppercase">New Message</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          </div>
          <p className="text-sm font-bold text-slate-800 leading-tight">Weekend Special at Nine Blue!</p>
          <p className="text-xs text-slate-500 mt-1">Enjoy a complimentary drink with your dinner this Saturday...</p>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-slate-500 font-medium">Your loyalty ecosystem is ready for you.</p>
      </div>

      {!user.profileComplete && (
        <div className="mb-8 bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-[150px] -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest">
                <Sparkles size={14} className="text-amber-400" /> Unlock Exclusive Benefits
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter">Complete Your Lifestyle Profile</h2>
              <p className="max-w-xl text-indigo-100 font-medium">
                Fill out your preferences and family milestones to receive personalized rewards, free birthday cakes, and surprise anniversary gifts!
              </p>
            </div>
            <button 
              onClick={() => onNavigate('profile')}
              className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl whitespace-nowrap"
            >
              Complete Questionnaire <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Wallet Balance" value="₹12,450" icon={Wallet} color="indigo" />
        <StatCard title="Total Points" value="1,240" icon={Star} color="amber" />
        <StatCard title="Active Subs" value="3" icon={Gift} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bell size={20} className="text-indigo-600" />
                Brand Updates
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { brand: 'Nine Blue', msg: 'Weekend Special: Complimentary drink for Gold members!', time: '10 min ago', isNew: true },
                { brand: 'Azure Spa', msg: 'Your subscription is about to expire in 3 days. Renew now for bonus units.', time: '2 hours ago', isNew: true },
              ].map((msg, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-50 flex items-start gap-4 transition-all hover:bg-slate-50 cursor-pointer">
                  <div className={`p-2.5 rounded-xl ${msg.isNew ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{msg.brand}</p>
                    <p className="text-sm leading-snug font-bold text-slate-900">{msg.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {MOCK_TRANSACTIONS.map((t) => (
                  <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${t.amount < 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {t.amount < 0 ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{t.description}</p>
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5"><Clock size={12} /> {t.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-lg ${t.amount < 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
                        {t.amount < 0 ? '-' : '+'} ₹{Math.abs(t.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button 
                onClick={handleScanPay}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl hover:bg-slate-800 transition-all"
              >
                <QrCode size={20} />
                Scan & Pay
              </button>
              <button 
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-600 transition-all"
              >
                <Smartphone size={20} />
                WhatsApp Community
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
            <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
              <Star className="text-amber-400 fill-amber-400" size={20} />
              Tier Progress
            </h3>
            <div className="relative pt-1 mb-6">
              <div className="flex mb-3 items-center justify-between">
                <span className="text-[10px] font-black inline-block py-1.5 px-3 uppercase rounded-xl text-indigo-200 bg-indigo-900 border border-indigo-800">Silver Member</span>
                <span className="text-xs font-black text-indigo-200">60%</span>
              </div>
              <div className="overflow-hidden h-2.5 mb-4 rounded-full bg-slate-800">
                <div style={{ width: "60%" }} className="h-full bg-indigo-500 transition-all duration-1000"></div>
              </div>
              <p className="text-xs text-slate-400">Spend <span className="text-white font-black">₹2,550</span> more to unlock <span className="text-amber-400 font-black">Gold Benefits</span>!</p>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 text-emerald-800 space-y-4">
             <div className="flex items-center gap-3">
                <MessageSquare size={20} className="text-emerald-600" />
                <h4 className="font-black text-sm uppercase tracking-widest">Connect with us</h4>
             </div>
             <p className="text-xs font-medium leading-relaxed">
               Join our exclusive VIP WhatsApp community for early access to sales and secret menu items.
             </p>
             <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-200">Join Community</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

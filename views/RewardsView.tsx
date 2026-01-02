
import React, { useState } from 'react';
import { Star, Zap, ShieldCheck, Trophy, Sparkles, ArrowUpRight, History, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard';

const REWARDS_HISTORY = [
  { id: '1', action: 'Gourmet Garden Visit', points: '+24', date: '2 hours ago', type: 'EARN' },
  { id: '2', action: 'Azure Spa Service', points: '+68', date: 'Yesterday', type: 'EARN' },
  { id: '3', action: 'Redeemed for Voucher', points: '-200', date: '3 days ago', type: 'REDEEM' },
];

const RewardsView: React.FC = () => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const handleRedeem = () => {
    setIsRedeeming(true);
    setTimeout(() => {
      setIsRedeeming(false);
      setRedeemSuccess(true);
      setTimeout(() => setRedeemSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Points & Rewards</h1>
        <p className="text-slate-500">Track your journey through our exclusive membership tiers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Available Points" value="1,240" icon={Zap} color="amber" />
        <StatCard title="Points Earned (LTD)" value="4,820" icon={Trophy} color="indigo" />
        <StatCard title="Rewards Redeemed" value="12" icon={Sparkles} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm"><ShieldCheck size={32} className="text-amber-400" /></div>
                <div>
                  <p className="text-sm font-bold text-amber-400 uppercase tracking-widest">Active Tier</p>
                  <h3 className="text-3xl font-black italic uppercase">Silver Member</h3>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs font-bold uppercase tracking-widest text-indigo-300">1.2x Multiplier</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="font-bold text-slate-400 uppercase text-xs tracking-widest">Next Milestone: <span className="text-white">GOLD</span></p>
                <p className="text-sm font-medium text-slate-400"><span className="text-white font-bold">2,550</span> points more</p>
              </div>
              <div className="h-4 bg-white/5 rounded-full p-1 border border-white/10"><div className="h-full bg-indigo-500 rounded-full" style={{ width: '60%' }}></div></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-8 flex items-center gap-2"><History size={20} className="text-indigo-600" /> Recent Activity</h3>
            <div className="space-y-6">
              {REWARDS_HISTORY.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${item.type === 'EARN' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}><Star size={18} /></div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.action}</p>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>
                  </div>
                  <p className={`font-black text-lg ${item.type === 'EARN' ? 'text-emerald-600' : 'text-rose-600'}`}>{item.points}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-8 bg-slate-900 text-white rounded-[2rem] text-center space-y-4 shadow-xl">
              {redeemSuccess ? (
                <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={24} /></div>
                  <p className="font-black">Wallet Topped Up!</p>
                  <p className="text-xs text-slate-400 mt-1">₹200 added to your common wallet.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Instant Redemption</p>
                  <p className="text-xs text-slate-400">Convert 1,000 points to ₹200 wallet credit instantly.</p>
                  <button 
                    onClick={handleRedeem}
                    disabled={isRedeeming}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
                  >
                    {isRedeeming ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Redeem for ₹200"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsView;

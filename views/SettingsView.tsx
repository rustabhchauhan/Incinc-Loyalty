
import React from 'react';
import { Settings, ShieldCheck, Zap, Wallet, Info, Save, RotateCcw } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">System Configuration</h1>
        <p className="text-slate-500">Global rules, loyalty ratios, and tiered membership settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Points Ratios */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Zap size={20} className="text-amber-500" />
              Loyalty & Ratios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Earning Ratio</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700">₹100 Spent</div>
                  <span className="text-slate-400 font-bold">=</span>
                  <div className="w-24 p-4 bg-amber-50 rounded-2xl border border-amber-200 font-black text-amber-700 text-center">1 pt</div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Default points given to Silver tier users per unit spend.</p>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Redemption Value</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 p-4 bg-amber-50 rounded-2xl border border-amber-200 font-bold text-amber-700">100 Points</div>
                  <span className="text-slate-400 font-bold">=</span>
                  <div className="w-24 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 font-black text-emerald-700 text-center">₹10</div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Cash equivalent value of points when used for wallet top-up.</p>
              </div>
            </div>
          </section>

          {/* Tier Thresholds */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-600" />
              Membership Tiers
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Silver', spend: 'Auto', mult: '1.0x', color: 'slate' },
                { name: 'Gold', spend: '₹25,000', mult: '1.2x', color: 'amber' },
                { name: 'Platinum', spend: '₹1,00,000', mult: '1.5x', color: 'indigo' },
              ].map(tier => (
                <div key={tier.name} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50/50 transition-all border border-transparent hover:border-slate-100">
                  <div className={`w-12 h-12 rounded-xl bg-${tier.color}-100 flex items-center justify-center text-${tier.color}-600 font-black`}>
                    {tier.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{tier.name} Tier</p>
                    <p className="text-xs text-slate-400 font-medium">Multiplier: {tier.mult}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{tier.spend}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">SPEND REQ.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Info size={20} className="text-indigo-400" />
              Settings Summary
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></div>
                <p className="text-xs text-slate-300 leading-relaxed">Point expiry is set to 12 months rolling by default.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></div>
                <p className="text-xs text-slate-300 leading-relaxed">Wallet bonus applies to all top-ups above ₹1000.</p>
              </li>
            </ul>
            <div className="mt-10 space-y-3">
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/40">
                <Save size={18} /> Save All Changes
              </button>
              <button className="w-full py-3 bg-white/5 text-slate-400 rounded-2xl font-bold text-sm hover:text-white transition-all">
                <RotateCcw size={16} className="inline mr-2" /> Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

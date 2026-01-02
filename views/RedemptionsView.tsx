
import React, { useState } from 'react';
import { QrCode, Search, History, CheckCircle2, AlertCircle, Clock, X, Camera } from 'lucide-react';

const REDEMPTION_LOG = [
  { id: '1', customer: 'Alice Johnson', offer: 'Buy 1 Get 1 Pizza', time: '10:42 AM', status: 'SUCCESS' },
  { id: '2', customer: 'Bob Smith', offer: '10% Discount Coupon', time: '09:15 AM', status: 'SUCCESS' },
  { id: '3', customer: 'Charlie Brown', offer: 'Weekly Spa Session', time: 'Yesterday', status: 'EXPIRED' },
];

const RedemptionsView: React.FC = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleVerify = () => {
    if (!code) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Simulate real verification (e.g. AZURE20 is a known valid code from our mocks)
      if (code.toUpperCase() === 'AZURE20' || code.toUpperCase() === 'GOBBLE1') {
        setVerifyResult('SUCCESS');
      } else {
        setVerifyResult('ERROR');
      }
      setTimeout(() => setVerifyResult('IDLE'), 4000);
    }, 1500);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Redemption Center</h1>
        <p className="text-slate-500">Validate vouchers and subscription usage in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full -z-10"></div>
            
            <div className="max-w-md mx-auto space-y-10">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                <QrCode size={48} strokeWidth={1.5} />
              </div>

              {verifyResult === 'IDLE' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Verify Redemption</h2>
                    <p className="text-slate-500 font-medium">Scan the customer's QR or enter the code manually.</p>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                      <Camera size={24} /> Launch Camera Scanner
                    </button>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="VOUCHER CODE (e.g. AZURE20)"
                        className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none text-center font-mono text-xl tracking-[0.2em] transition-all"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={handleVerify}
                      disabled={isVerifying || !code}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-30 transition-all"
                    >
                      {isVerifying ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Verify & Redeem"}
                    </button>
                  </div>
                </div>
              )}

              {verifyResult === 'SUCCESS' && (
                <div className="space-y-6 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-lg"><CheckCircle2 size={48} /></div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Verified!</h2>
                    <p className="text-slate-500 font-medium">Reward for <span className="text-indigo-600 font-bold">Rustabh Chauhan</span> successfully redeemed.</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest">Transaction logged to ledger</div>
                  <button onClick={() => { setVerifyResult('IDLE'); setCode(''); }} className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase underline tracking-widest">Process Another</button>
                </div>
              )}

              {verifyResult === 'ERROR' && (
                <div className="space-y-6 animate-in shake duration-300">
                  <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full mx-auto flex items-center justify-center shadow-lg"><AlertCircle size={48} /></div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Invalid Code</h2>
                    <p className="text-slate-500 font-medium">This code does not exist or has already been used.</p>
                  </div>
                  <button onClick={() => setVerifyResult('IDLE')} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200">Try Again</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 h-full">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><History size={18} className="text-indigo-500" /> Live Redemptions</h3>
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {REDEMPTION_LOG.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{log.customer}</span>
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{log.offer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedemptionsView;

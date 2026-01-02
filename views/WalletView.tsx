
import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Plus, 
  CreditCard, 
  Clock, 
  History, 
  MoreHorizontal, 
  Filter, 
  Calendar, 
  TrendingUp, 
  PieChart, 
  ArrowRightLeft, 
  ShieldCheck, 
  Briefcase,
  Download,
  CheckCircle2,
  AlertCircle,
  X,
  Info,
  Building2,
  Receipt
} from 'lucide-react';
import { Role } from '../types';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface WalletViewProps {
  role: Role;
}

interface TransactionDetail {
  id: string;
  desc: string;
  date: string;
  displayDate: string;
  amount: number;
  bonus: number;
  type: 'CREDIT' | 'DEBIT';
  brand: string;
  reference?: string;
}

const SETTLEMENT_DATA = [
  { id: '1', brand: 'Nine Blue', processed: 45000, fee: 1350, payable: 43650, status: 'PENDING' },
  { id: '2', brand: 'Azure Spa', processed: 12000, fee: 360, payable: 11640, status: 'PAID' },
  { id: '3', brand: 'Grand Royal Hotel', processed: 89000, fee: 2670, payable: 86330, status: 'PENDING' },
];

const INITIAL_LEDGER: TransactionDetail[] = [
  { id: '1', desc: 'Wallet Topup (User: Rustabh)', date: '2024-11-20', displayDate: '20 Nov 2024', amount: 5000, bonus: 500, type: 'CREDIT', brand: 'System', reference: 'TXN-99283-TOPUP' },
  { id: '2', desc: 'Dinner - Nine Blue', date: '2024-11-18', displayDate: '18 Nov 2024', amount: -1240, bonus: 0, type: 'DEBIT', brand: 'Nine Blue', reference: 'TXN-88102-PAY' },
  { id: '3', desc: 'Azure Spa - Hair Cut', date: '2024-11-15', displayDate: '15 Nov 2024', amount: -650, bonus: 0, type: 'DEBIT', brand: 'Azure Spa', reference: 'TXN-77215-PAY' },
  { id: '4', desc: 'Membership Bonus', date: '2024-11-14', displayDate: '14 Nov 2024', amount: 200, bonus: 200, type: 'CREDIT', brand: 'Nine Blue', reference: 'TXN-奖励-001' },
];

const WalletView: React.FC<WalletViewProps> = ({ role }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');
  const [isProcessingPayouts, setIsProcessingPayouts] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [selectedTx, setSelectedTx] = useState<TransactionDetail | null>(null);

  const handleBulkPayout = () => {
    setIsProcessingPayouts(true);
    setTimeout(() => {
      setIsProcessingPayouts(false);
      setPayoutSuccess(true);
      setTimeout(() => setPayoutSuccess(false), 3000);
    }, 2500);
  };

  const closeModal = () => setSelectedTx(null);

  const renderTransactionModal = () => {
    if (!selectedTx) return null;

    const isCredit = selectedTx.type === 'CREDIT';
    
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
        <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
          {/* Modal Header */}
          <div className={`p-8 pb-12 flex flex-col items-center text-center relative ${isCredit ? 'bg-emerald-50' : 'bg-slate-50'}`}>
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 bg-white/80 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 transition-all"
            >
              <X size={18} />
            </button>
            
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg mb-4 ${isCredit ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
              {isCredit ? <ArrowUpCircle size={32} /> : <ArrowDownCircle size={32} />}
            </div>
            
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Transaction Receipt</h3>
            <p className="text-3xl font-black text-slate-900 italic tracking-tighter">
              {isCredit ? '+' : '-'} ₹{Math.abs(selectedTx.amount).toLocaleString()}
            </p>
            <div className={`mt-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${isCredit ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
              {selectedTx.type} SUCCESSFUL
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Time</p>
                <p className="text-sm font-bold text-slate-900">{selectedTx.displayDate}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ref ID</p>
                <p className="text-sm font-mono text-slate-500">{selectedTx.reference || 'N/A'}</p>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Source Brand</p>
                    <p className="text-sm font-bold text-slate-900">{selectedTx.brand}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <Receipt size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Description</p>
                    <p className="text-sm font-bold text-slate-900">{selectedTx.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Principal Amount</span>
                <span className="text-slate-900">₹{(Math.abs(selectedTx.amount) - selectedTx.bonus).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Bonus Credits</span>
                <span className="text-emerald-600 font-bold">+ ₹{selectedTx.bonus.toLocaleString()}</span>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase text-slate-900 tracking-widest">Total Value</span>
                <span className="text-lg font-black text-slate-900 tracking-tighter italic">₹{Math.abs(selectedTx.amount).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-8 pt-0">
            <button 
              onClick={closeModal}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (role === Role.SUPER_ADMIN) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Treasury</h1>
            <p className="text-slate-500 font-medium">Monitoring system-wide float and brand settlements.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
            <Download size={18} /> Export Treasury Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="System Float" value="₹24.8L" icon={Wallet} color="indigo" />
          <StatCard title="Bonus Liability" value="₹3.2L" icon={TrendingUp} color="amber" />
          <StatCard title="Wallet Users" value="8.4k" icon={Briefcase} color="emerald" />
          <StatCard title="Pending Payouts" value="₹1.4L" icon={ArrowRightLeft} color="rose" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><ShieldCheck size={20} className="text-indigo-600" /> Brand Settlement Ledger</h3>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead><tr className="border-b border-slate-50"><th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</th><th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Processed</th><th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fee (3%)</th><th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Payable</th><th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th></tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {SETTLEMENT_DATA.map(row => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors"><td className="py-4 font-bold text-slate-900">{row.brand}</td><td className="py-4">₹{row.processed.toLocaleString()}</td><td className="py-4 text-rose-500">-₹{row.fee}</td><td className="py-4 font-black text-indigo-600">₹{row.payable.toLocaleString()}</td><td><span className={`px-2 py-0.5 rounded text-[10px] font-black ${row.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{row.status}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-6">
               <button 
                onClick={handleBulkPayout}
                disabled={isProcessingPayouts}
                className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-xl ${
                  payoutSuccess ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
               >
                 {isProcessingPayouts ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div> : payoutSuccess ? <><CheckCircle2 size={18} className="inline mr-2" /> Payouts Dispatched</> : "Initiate Bulk Payouts to All Brands"}
               </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><PieChart size={20} className="text-indigo-600" /> Float Health</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>Real Funds (85%)</span><span className="text-slate-900">₹21.08L</span></div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '85%' }}></div></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>Bonus Value (15%)</span><span className="text-amber-600">₹3.72L</span></div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: '15%' }}></div></div>
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                <AlertCircle size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium text-indigo-900 leading-relaxed">Platform is currently settling within the 14-day rolling cycle. Liability is within safe parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to customer view if not role specific
  return (
    <div className="p-8">
      {renderTransactionModal()}
      
      <div className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Digital Wallet</h1><p className="text-slate-500">Manage your unified balance across all brands.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[100px]"></div>
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-6">Unified Balance</p>
            <h2 className="text-5xl font-black mb-10 tracking-tight">₹12,450</h2>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div><p className="text-[10px] font-black text-indigo-200 uppercase mb-1">CASH</p><p className="text-lg font-bold">₹11,450</p></div>
              <div className="text-right"><p className="text-[10px] font-black text-indigo-200 uppercase mb-1">BONUS</p><p className="text-lg font-bold text-emerald-400">₹1,000</p></div>
            </div>
          </div>
          
          <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
             <div className="flex items-center gap-3 text-slate-900 font-bold mb-4">
               <Info size={18} className="text-indigo-600" />
               <h4 className="text-sm">Wallet Tip</h4>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed">
               Did you know? Bonus amounts are used first for all your purchases across restaurant and salon visits.
             </p>
          </div>
        </div>
        <div className="lg:col-span-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2"><History size={20} className="text-indigo-600" /> Wallet Ledger</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click entries for details</p>
              </div>
              <div className="space-y-2">
                {INITIAL_LEDGER.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setSelectedTx(item)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-slate-200 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl transition-all ${item.type === 'CREDIT' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'}`}>
                        {item.type === 'CREDIT' ? <ArrowUpCircle size={22} /> : <ArrowDownCircle size={22} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.desc}</p>
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock size={12} /> {item.displayDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-lg ${item.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'}`}>₹{Math.abs(item.amount).toLocaleString()}</p>
                      {item.bonus > 0 && (
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Incl. ₹{item.bonus} Bonus</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;

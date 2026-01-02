
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_CUSTOMERS = [
  { id: '1', name: 'Alice Johnson', tier: 'PLATINUM', email: 'alice@example.com', phone: '9876543210', spent: '₹42,500', visits: 24, lastVisit: '2 hours ago' },
  { id: '2', name: 'Bob Smith', tier: 'GOLD', email: 'bob@example.com', phone: '9876543211', spent: '₹12,200', visits: 8, lastVisit: 'Yesterday' },
  { id: '3', name: 'Charlie Brown', tier: 'SILVER', email: 'charlie@example.com', phone: '9876543212', spent: '₹4,500', visits: 3, lastVisit: '3 days ago' },
  { id: '4', name: 'Diana Prince', tier: 'PLATINUM', email: 'diana@example.com', phone: '9876543213', spent: '₹68,900', visits: 42, lastVisit: '1 week ago' },
  { id: '5', name: 'Ethan Hunt', tier: 'GOLD', email: 'ethan@example.com', phone: '9876543214', spent: '₹15,400', visits: 12, lastVisit: 'Yesterday' },
];

const CustomersListView: React.FC<{ isBrandSpecific?: boolean }> = ({ isBrandSpecific = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{isBrandSpecific ? 'Brand Customers' : 'Global Directory'}</h1>
          <p className="text-slate-500">Manage and segment your customer base effectively.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tier</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Lifetime Spend</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Visits</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Last Activity</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_CUSTOMERS.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Mail size={10} /> {c.email}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Phone size={10} /> {c.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    c.tier === 'PLATINUM' ? 'bg-indigo-50 text-indigo-600' :
                    c.tier === 'GOLD' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="px-6 py-5 font-bold text-slate-900">{c.spent}</td>
                <td className="px-6 py-5 font-medium text-slate-600">{c.visits}</td>
                <td className="px-6 py-5 text-sm text-slate-500">{c.lastVisit}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">Showing 1-5 of 12,402 customers</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 rounded-lg text-sm text-slate-600 font-bold hover:bg-slate-100">2</button>
            <button className="w-8 h-8 rounded-lg text-sm text-slate-600 font-bold hover:bg-slate-100">3</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersListView;

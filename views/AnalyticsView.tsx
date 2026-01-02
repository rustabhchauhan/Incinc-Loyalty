
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Wallet, Calendar, Filter, Download } from 'lucide-react';
import StatCard from '../components/StatCard';

const REVENUE_DATA = [
  { name: 'Mon', total: 4000, restaurant: 2400, salon: 1000, hotel: 600 },
  { name: 'Tue', total: 3000, restaurant: 1398, salon: 1200, hotel: 402 },
  { name: 'Wed', total: 2000, restaurant: 9800, salon: 800, hotel: 1200 },
  { name: 'Thu', total: 2780, restaurant: 3908, salon: 2000, hotel: 872 },
  { name: 'Fri', total: 1890, restaurant: 4800, salon: 2181, hotel: 250 },
  { name: 'Sat', total: 2390, restaurant: 3800, salon: 2500, hotel: 2100 },
  { name: 'Sun', total: 3490, restaurant: 4300, salon: 2100, hotel: 2100 },
];

const PIE_DATA = [
  { name: 'Restaurant', value: 45 },
  { name: 'Salon', value: 30 },
  { name: 'Hotel', value: 25 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b'];

const AnalyticsView: React.FC<{ isGlobal?: boolean }> = ({ isGlobal = true }) => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{isGlobal ? 'Global Analytics' : 'Brand Performance'}</h1>
          <p className="text-slate-500">Real-time insights across your ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
            <Calendar size={18} /> Last 7 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-100">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Transactions" value="₹12.4L" icon={TrendingUp} trend="+12.5%" color="indigo" />
        <StatCard title="Active Users" value="8.4k" icon={Users} trend="+3.2%" color="emerald" />
        <StatCard title="Wallet Float" value="₹4.2L" icon={Wallet} color="amber" />
        <StatCard title="Points Issued" value="124k" icon={Calendar} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg text-slate-900">Revenue Breakdown</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div> Total Revenue
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg text-slate-900 mb-8">Sector Contribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {PIE_DATA.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;

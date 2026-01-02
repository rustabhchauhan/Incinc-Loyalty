
import React from 'react';
import { 
  Users, 
  Store, 
  Wallet, 
  TrendingUp, 
  Plus, 
  Filter, 
  MoreVertical,
  ChevronRight,
  Layout as LayoutIcon,
  Eye
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { BRANDS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface SuperAdminDashboardProps {
  onCreateBrand: () => void;
  onEditLandingPage: (brandId: string) => void;
}

const MOCK_DATA = [
  { name: 'Jan', revenue: 4000, users: 240 },
  { name: 'Feb', revenue: 3000, users: 139 },
  { name: 'Mar', revenue: 2000, users: 980 },
  { name: 'Apr', revenue: 2780, users: 390 },
  { name: 'May', revenue: 1890, users: 480 },
  { name: 'Jun', revenue: 2390, users: 380 },
];

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onCreateBrand, onEditLandingPage }) => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium">Managing {BRANDS.length} brands and 12,402 customers across the platform.</p>
        </div>
        <button 
          onClick={onCreateBrand}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={20} /> Add New Brand
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="12,402" icon={Users} trend="+12%" color="indigo" />
        <StatCard title="Active Brands" value={BRANDS.length} icon={Store} color="emerald" />
        <StatCard title="Total Revenue" value="₹2.4M" icon={TrendingUp} trend="+8%" color="amber" />
        <StatCard title="Wallet Float" value="₹12.8L" icon={Wallet} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center justify-between">
            Revenue Performance
            <button className="text-slate-400"><Filter size={18} /></button>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center justify-between">
            User Growth
            <button className="text-slate-400"><Filter size={18} /></button>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{fill: '#10b981', r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Connected Brands</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Manage All Brands</button>
        </div>
        <div className="divide-y divide-slate-50">
          {BRANDS.map((brand) => (
            <div key={brand.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{brand.name}</h4>
                  <p className="text-sm text-slate-500">{brand.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center hidden md:block">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Customers</p>
                  <p className="font-bold text-slate-900">4.2k</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onEditLandingPage(brand.id)}
                    className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
                    title="Edit Landing Page"
                  >
                    <LayoutIcon size={16} />
                    <span className="text-xs font-bold px-1">Editor</span>
                  </button>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

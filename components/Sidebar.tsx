
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Ticket, 
  Zap, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Layers,
  ShoppingBag,
  ExternalLink,
  MessageSquareShare,
  Layout,
  Eye,
  UserCircle,
  PhoneCall
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  role: Role;
  onNavigate: (view: string) => void;
  activeView: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onNavigate, activeView, onLogout }) => {
  const getNavItems = () => {
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'wallet', label: 'Wallet', icon: Wallet },
    ];

    if (role === Role.SUPER_ADMIN) {
      return [
        ...common,
        { id: 'brands', label: 'Manage Brands', icon: Layers },
        { id: 'customers', label: 'All Customers', icon: Users },
        { id: 'campaigns', label: 'Campaigns', icon: MessageSquareShare },
        { id: 'analytics', label: 'Global Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Rules & Tiers', icon: Settings },
        { id: 'profile', label: 'My Profile', icon: UserCircle },
      ];
    }

    if (role === Role.BRAND_ADMIN) {
      return [
        ...common,
        { id: 'landing-page', label: 'Edit Landing Page', icon: Layout },
        { id: 'landing-page-view', label: 'View Live Page', icon: Eye },
        { id: 'redemptions', label: 'Redemptions', icon: Ticket },
        { id: 'customers', label: 'Brand Customers', icon: Users },
        { id: 'analytics', label: 'Performance', icon: BarChart3 },
        { id: 'profile', label: 'My Profile', icon: UserCircle },
      ];
    }

    return [
      ...common,
      { id: 'subscriptions', label: 'Subscriptions', icon: ShoppingBag },
      { id: 'vouchers', label: 'My Vouchers', icon: Ticket },
      { id: 'rewards', label: 'Points & Rewards', icon: Zap },
      { id: 'brand-directory', label: 'Contact Brands', icon: PhoneCall },
      { id: 'profile', label: 'My Profile', icon: UserCircle },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-white/5">
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Zap className="text-indigo-400 fill-indigo-400/20" />
          Incinc Loyalty
        </h1>
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest leading-none">
          {role.replace('_', ' ')}
        </p>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={18} className={`${activeView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2">
        <div className="px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1 flex items-center gap-1.5">
            Designed by <span className="text-indigo-400">Incinc Media</span>
          </p>
          <a href="https://incincmedia.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            www.incincmedia.com <ExternalLink size={10} />
          </a>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 rounded-xl transition-all"
        >
          <LogOut size={18} />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


import React, { useState, useEffect } from 'react';
import { User, Role, Brand } from './types';
import { BRANDS, MOCK_USERS } from './constants';
import Sidebar from './components/Sidebar';
import SuperAdminDashboard from './views/SuperAdminDashboard';
import BrandAdminDashboard from './views/BrandAdminDashboard';
import CustomerDashboard from './views/CustomerDashboard';
import ManageBrands from './views/ManageBrands';
import CreateBrand from './views/CreateBrand';
import AnalyticsView from './views/AnalyticsView';
import CustomersListView from './views/CustomersListView';
import SettingsView from './views/SettingsView';
import RedemptionsView from './views/RedemptionsView';
import WalletView from './views/WalletView';
import OffersView from './views/OffersView';
import RewardsView from './views/RewardsView';
import CampaignsView from './views/CampaignsView';
import LandingPageEditor from './views/LandingPageEditor';
import LandingPageView from './views/LandingPageView';
import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import BrandDirectoryView from './views/BrandDirectoryView';
import { Bell, Search, Settings, User as UserIcon, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [currentBrandId, setCurrentBrandId] = useState<string>(BRANDS[0].id);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (u: User) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(u);
      setActiveView('dashboard');
      setIsLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('landing-page-view');
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const renderContent = () => {
    // PUBLIC VIEW (Not Logged In)
    if (!user) {
      const publicBrand = BRANDS.find(b => b.id === currentBrandId) || BRANDS[0];
      return <LandingPageView brand={publicBrand} onLogin={handleLogin} />;
    }

    // LOGGED IN VIEWS
    switch (user.role) {
      case Role.SUPER_ADMIN:
        switch (activeView) {
          case 'dashboard': return (
            <SuperAdminDashboard 
              onCreateBrand={() => setActiveView('create-brand')} 
              onEditLandingPage={(brandId) => {
                setCurrentBrandId(brandId);
                setActiveView('landing-page');
              }}
            />
          );
          case 'brands': return <ManageBrands />;
          case 'landing-page': 
            const editBrand = BRANDS.find(b => b.id === currentBrandId) || BRANDS[0];
            return <LandingPageEditor brand={editBrand} />;
          case 'create-brand': return <CreateBrand onBack={() => setActiveView('dashboard')} onComplete={() => setActiveView('brands')} />;
          case 'customers': return <CustomersListView />;
          case 'campaigns': return <CampaignsView />;
          case 'analytics': return <AnalyticsView isGlobal={true} />;
          case 'settings': return <SettingsView />;
          case 'wallet': return <WalletView role={user.role} />;
          case 'profile': return <ProfileView user={user} onUpdate={handleUpdateProfile} />;
          default: return <div className="p-8 text-slate-400">View under construction: {activeView}</div>;
        }
      case Role.BRAND_ADMIN:
        const brand = BRANDS.find(b => b.id === user.brandId) || BRANDS[0];
        switch (activeView) {
          case 'dashboard': return <BrandAdminDashboard brand={brand} />;
          case 'landing-page': return <LandingPageEditor brand={brand} />;
          case 'landing-page-view': return <LandingPageView brand={brand} onLogin={handleLogin} />;
          case 'redemptions': return <RedemptionsView />;
          case 'customers': return <CustomersListView isBrandSpecific={true} />;
          case 'analytics': return <AnalyticsView isGlobal={false} />;
          case 'wallet': return <WalletView role={user.role} />;
          case 'profile': return <ProfileView user={user} onUpdate={handleUpdateProfile} />;
          default: return <div className="p-8 text-slate-400">View under construction: {activeView}</div>;
        }
      case Role.CUSTOMER:
        switch (activeView) {
          case 'dashboard': return <CustomerDashboard user={user} onNavigate={setActiveView} />;
          case 'wallet': return <WalletView role={user.role} />;
          case 'subscriptions': return <OffersView type="subscriptions" />;
          case 'vouchers': return <OffersView type="vouchers" />;
          case 'rewards': return <RewardsView />;
          case 'brand-directory': return <BrandDirectoryView />;
          case 'profile': return <ProfileView user={user} onUpdate={handleUpdateProfile} />;
          default: return <div className="p-8 text-slate-400">View under construction: {activeView}</div>;
        }
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing System...</p>
      </div>
    );
  }

  // If viewing the public landing page, don't show the sidebar/header wrapper
  if (!user) {
    return renderContent();
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        role={user.role} 
        onNavigate={setActiveView} 
        activeView={activeView} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 ml-64 min-h-screen">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              title="Quick Logout"
            >
              <LogOut size={20} />
            </button>
            <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-100"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                  {user.tier} Member
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 overflow-hidden border border-slate-200">
                <img src={user.profileImage || `https://picsum.photos/seed/${user.id}/100/100`} alt="" />
              </div>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

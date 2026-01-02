
import React, { useState } from 'react';
import { 
  Palette, 
  ChevronRight, 
  Save, 
  Layout, 
  Type, 
  Check, 
  RefreshCw, 
  Wallet, 
  Percent, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Store, 
  Image as ImageIcon,
  Clock,
  ToggleLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  Trash2,
  Plus,
  AlertCircle
} from 'lucide-react';
import { BRANDS, THEME_COLORS, FONT_STYLES } from '../constants';
import { Brand, BrandTheme, BrandType } from '../types';

const ManageBrands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>(BRANDS);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'VISUALS' | 'LOYALTY' | 'FEATURES' | 'CONTACT'>('IDENTITY');

  // Editing States
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const handleEdit = (brand: Brand) => {
    setSelectedBrandId(brand.id);
    setEditingBrand({ ...brand });
  };

  const updateEditingBrand = (updates: any) => {
    if (editingBrand) setEditingBrand({ ...editingBrand, ...updates });
  };

  const updateLandingPage = (updates: any) => {
    if (editingBrand) {
      setEditingBrand({
        ...editingBrand,
        landingPage: { ...editingBrand.landingPage, ...updates }
      });
    }
  };

  const updateTheme = (updates: Partial<BrandTheme>) => {
    if (editingBrand) setEditingBrand({ ...editingBrand, theme: { ...editingBrand.theme, ...updates } });
  };

  const updateFeatures = (key: keyof Brand['features']) => {
    if (editingBrand) {
      setEditingBrand({ 
        ...editingBrand, 
        features: { ...editingBrand.features, [key]: !editingBrand.features[key] } 
      });
    }
  };

  const handleSave = () => {
    if (selectedBrandId && editingBrand) {
      setBrands(prev => prev.map(b => b.id === selectedBrandId ? editingBrand : b));
      alert(`Settings for ${editingBrand.name} updated successfully!`);
    }
  };

  const getPreviewStyles = () => {
    if (!editingBrand) return null;
    const { theme } = editingBrand;
    const colorObj = THEME_COLORS.find(c => c.class === theme.primaryColor);
    const primaryHex = colorObj?.hex || '#4f46e5';
    const radiusMap = { none: '0px', md: '0.375rem', '2xl': '1rem', full: '9999px' };
    return { primaryHex, borderRadius: radiusMap[theme.borderRadius], fontFamily: theme.fontFamily };
  };

  const previewStyles = getPreviewStyles();

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Brand Orchestrator</h1>
        <p className="text-slate-500 font-medium">Global control center for partner brands and ecosystem rules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Brand List */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Select Partner</h2>
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleEdit(brand)}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                selectedBrandId === brand.id 
                ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]' 
                : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={brand.logo} alt="" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-sm">{brand.name}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{brand.type}</p>
                </div>
              </div>
              <ChevronRight className={`transition-transform ${selectedBrandId === brand.id ? 'translate-x-1 text-indigo-600' : 'text-slate-300'}`} size={18} />
            </button>
          ))}
        </div>

        {/* Porting Portal */}
        <div className="lg:col-span-9">
          {editingBrand && previewStyles ? (
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[750px]">
              {/* Controls Column */}
              <div className="w-full md:w-[450px] border-r border-slate-100 flex flex-col h-full overflow-hidden">
                {/* Tabs */}
                <div className="grid grid-cols-5 border-b border-slate-100 p-1 bg-slate-50/50">
                  {[
                    { id: 'IDENTITY', icon: Store },
                    { id: 'VISUALS', icon: Palette },
                    { id: 'LOYALTY', icon: Zap },
                    { id: 'FEATURES', icon: ToggleLeft },
                    { id: 'CONTACT', icon: Globe },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex flex-col items-center gap-1.5 py-4 rounded-xl transition-all ${
                        activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm font-black ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <tab.icon size={16} />
                      <span className="text-[8px] uppercase tracking-widest leading-none">{tab.id}</span>
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-white">
                  {activeTab === 'IDENTITY' && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600">Core Identity</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand Display Name</label>
                          <input type="text" value={editingBrand.name} onChange={e => updateEditingBrand({name: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Category</label>
                          <select value={editingBrand.type} onChange={e => updateEditingBrand({type: e.target.value as BrandType})} className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-bold">
                            <option value={BrandType.RESTAURANT}>Restaurant</option>
                            <option value={BrandType.SALON}>Salon & Wellness</option>
                            <option value={BrandType.HOTEL}>Hotel & Hospitality</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Logo Provider URL</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input type="text" value={editingBrand.logo} onChange={e => updateEditingBrand({logo: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 text-xs font-medium" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'VISUALS' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600">System Theming</h3>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand Signature Color</label>
                        <div className="grid grid-cols-7 gap-3">
                          {THEME_COLORS.map((color) => (
                            <button
                              key={color.class}
                              onClick={() => updateTheme({ primaryColor: color.class })}
                              className={`w-full aspect-square rounded-full relative flex items-center justify-center transition-all ${
                                editingBrand.theme.primaryColor === color.class ? 'ring-2 ring-offset-4 ring-slate-900 scale-110 shadow-lg' : 'hover:scale-105 opacity-80'
                              }`}
                              style={{ backgroundColor: color.hex }}
                            >
                              {editingBrand.theme.primaryColor === color.class && <Check size={16} className="text-white" strokeWidth={4} />}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-slate-50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Interface Typography</label>
                        <div className="space-y-2">
                          {FONT_STYLES.map((font) => (
                            <button
                              key={font.id}
                              onClick={() => updateTheme({ fontFamily: font.id as any })}
                              className={`w-full p-4 rounded-2xl border-2 text-sm font-bold text-left transition-all ${
                                editingBrand.theme.fontFamily === font.id 
                                ? 'border-slate-900 bg-slate-900 text-white shadow-xl' 
                                : 'border-slate-100 hover:border-slate-300 bg-white text-slate-400'
                              }`}
                              style={{ fontFamily: font.id === 'Inter' ? 'Inter' : font.id }}
                            >
                              {font.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-slate-50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Button & UI Radii</label>
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                          {(['none', 'md', '2xl', 'full'] as const).map((radius) => (
                            <button
                              key={radius}
                              onClick={() => updateTheme({ borderRadius: radius })}
                              className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${
                                editingBrand.theme.borderRadius === radius 
                                ? 'bg-white shadow-md text-slate-900' 
                                : 'text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              {radius.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'LOYALTY' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600">Economy Rules</h3>
                      <div className="space-y-6">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cashback / Bonus Rate (%)</label>
                          <div className="relative">
                            <Percent size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                            <input type="number" value={editingBrand.topupBonusPercentage} onChange={e => updateEditingBrand({topupBonusPercentage: Number(e.target.value)})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-black text-lg" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Earning Rate (Points per ₹100)</label>
                          <div className="relative">
                            <Zap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                            <input type="number" step="0.1" value={editingBrand.pointsEarningRate} onChange={e => updateEditingBrand({pointsEarningRate: Number(e.target.value)})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-black text-lg" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Points Expiry (Months)</label>
                          <div className="relative">
                            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="number" value={editingBrand.pointsExpiryMonths} onChange={e => updateEditingBrand({pointsExpiryMonths: Number(e.target.value)})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-black text-lg" />
                          </div>
                        </div>
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                           <AlertCircle className="text-amber-600 shrink-0" size={18} />
                           <p className="text-[10px] text-amber-900 font-medium leading-relaxed">Adjusting these rates will affect all future transactions immediately. Active point balances will retain their original expiry terms.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'FEATURES' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600">Module Configuration</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'wallet', label: 'Wallet Ecosystem', icon: Wallet, desc: 'Unified balance sharing enabled.' },
                          { id: 'points', label: 'Reward Points', icon: Zap, desc: 'Accumulation on every spend.' },
                          { id: 'subscriptions', label: 'Usage Passes', icon: RefreshCw, desc: 'Multi-use service vouchers.' },
                          { id: 'vouchers', label: 'Coupon Factory', icon: Percent, desc: 'Discount and promo engine.' },
                        ].map(feature => (
                          <button
                            key={feature.id}
                            onClick={() => updateFeatures(feature.id as any)}
                            className={`w-full p-5 rounded-3xl border-2 transition-all text-left flex items-center gap-4 ${
                              editingBrand.features[feature.id as keyof Brand['features']] 
                              ? 'border-indigo-600 bg-indigo-50/20 ring-4 ring-indigo-50' 
                              : 'border-slate-50 bg-white opacity-60 grayscale'
                            }`}
                          >
                            <div className={`p-3 rounded-2xl ${editingBrand.features[feature.id as keyof Brand['features']] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              <feature.icon size={20} />
                            </div>
                            <div>
                              <p className="font-black text-slate-900 text-sm">{feature.label}</p>
                              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{feature.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'CONTACT' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600">Contact & Location</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input type="email" value={editingBrand.landingPage.brandEmail} onChange={e => updateLandingPage({brandEmail: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input type="text" value={editingBrand.landingPage.brandPhone} onChange={e => updateLandingPage({brandPhone: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-4 text-slate-300" size={18} />
                            <textarea value={editingBrand.landingPage.brandAddress} onChange={e => updateLandingPage({brandAddress: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-bold min-h-[100px]" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operating Hours</label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input type="text" value={editingBrand.landingPage.brandWorkingHours} onChange={e => updateLandingPage({brandWorkingHours: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/80">
                  <button
                    onClick={handleSave}
                    className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-xs"
                  >
                    <Save size={18} /> Apply Config to Brand
                  </button>
                </div>
              </div>

              {/* Live Preview Console */}
              <div className="flex-1 bg-slate-100/50 p-10 flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                 
                 <div className="mb-8 flex items-center justify-between w-full max-w-[340px] px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Live Sync</h3>
                    </div>
                    <span className="text-[8px] font-black bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full uppercase tracking-widest">Simulated Production</span>
                 </div>
                 
                 <div className="w-[340px] h-[680px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-4 border-slate-800 relative overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
                       <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
                    </div>
                    
                    <div 
                      className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col relative pt-8 transition-all duration-500 no-scrollbar"
                      style={{ 
                        fontFamily: previewStyles.fontFamily === 'Inter' ? "'Inter', sans-serif" : previewStyles.fontFamily 
                      }}
                    >
                      <div className="px-6 py-5 border-b border-slate-50 flex items-center gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                         <img src={editingBrand.logo} className="w-8 h-8 rounded-lg object-cover shadow-sm" alt="" />
                         <span className="text-xs font-black uppercase tracking-tighter text-slate-900">{editingBrand.name}</span>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                         <div className="p-8 bg-slate-50/50 border border-slate-100 text-center space-y-4" style={{ borderRadius: previewStyles.borderRadius }}>
                            <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center shadow-lg bg-white" style={{ color: previewStyles.primaryHex }}>
                               <Wallet size={28} />
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-xl font-black text-slate-900 italic tracking-tighter">Unified Hub</h4>
                               <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Partner Balance</p>
                            </div>
                            <div className="text-4xl font-black italic tracking-tighter py-2" style={{ color: previewStyles.primaryHex }}>₹12,450</div>
                            <button className="w-full py-3 text-[9px] font-black uppercase tracking-[0.2em] border-2 transition-all hover:bg-slate-900 hover:text-white" style={{ borderColor: previewStyles.primaryHex, color: previewStyles.primaryHex, borderRadius: previewStyles.borderRadius }}>Top-up Wallet</button>
                         </div>

                         <div className="space-y-4">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Rewards Status</p>
                            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shadow-xl" style={{ borderRadius: previewStyles.borderRadius }}>
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10"><ShieldCheck size={24} className="text-indigo-400" /></div>
                                  <div className="space-y-0.5">
                                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Active Tier</p>
                                     <p className="text-xs font-black uppercase italic tracking-widest text-indigo-200">Silver Member</p>
                                  </div>
                                </div>
                                <Zap size={18} className="text-amber-400 fill-amber-400 animate-pulse" />
                            </div>
                         </div>

                         {editingBrand.features.points && (
                           <div className="p-5 bg-white border border-slate-100 shadow-sm space-y-4" style={{ borderRadius: previewStyles.borderRadius }}>
                              <div className="flex items-center justify-between">
                                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Points Engine</p>
                                 <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest px-2 py-1 bg-emerald-50 rounded-lg">Enabled</span>
                              </div>
                              <div className="flex items-end justify-between border-t border-slate-50 pt-4">
                                 <span className="text-2xl font-black text-slate-900 tracking-tighter">1,240 <span className="text-[10px] text-amber-500 uppercase font-black">PTS</span></span>
                                 <div className="text-right">
                                    <p className="text-[8px] font-bold text-slate-300 uppercase leading-none">Rate: {editingBrand.pointsEarningRate}x</p>
                                    <p className="text-[8px] font-bold text-slate-300 uppercase mt-1">Exp: {editingBrand.pointsExpiryMonths}m</p>
                                 </div>
                              </div>
                           </div>
                         )}

                         <div className="pt-4">
                            <button className="w-full py-5 text-white font-black uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all" style={{ backgroundColor: previewStyles.primaryHex, borderRadius: previewStyles.borderRadius }}>
                               <RefreshCw size={16} /> Process Redemption
                            </button>
                         </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-[650px] bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 text-center p-12 shadow-inner">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
                <Store size={48} className="text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 italic tracking-tighter">Command Center</h3>
              <p className="max-w-xs font-medium text-slate-400 leading-relaxed uppercase text-[10px] tracking-[0.2em]">Select a partner from the sidebar to initialize deep brand management mode.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBrands;


import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Palette, 
  Wallet, 
  Zap, 
  ShoppingBag, 
  Ticket, 
  ShieldCheck, 
  MessageSquare, 
  Layout, 
  Gavel,
  Store,
  Plus,
  Trash2,
  TrendingUp,
  Upload,
  X,
  Sparkles,
  Percent,
  Utensils,
  Music,
  Waves,
  Dumbbell,
  Scissors,
  Wine,
  Fish,
  Heart,
  Tag,
  CreditCard,
  Crown,
  Coffee,
  Bed,
  Brush,
  Smartphone,
  Calculator,
  Coins,
  Lock,
  UserCircle
} from 'lucide-react';
import { BrandType, LandingPageConfig } from '../types';
import { THEME_COLORS, FONT_STYLES, AVAILABLE_INTERESTS } from '../constants';

interface CreateBrandProps {
  onBack: () => void;
  onComplete: () => void;
}

interface BonusSlab {
  id: string;
  amountPaid: string;
  walletValue: string;
}

interface SubPlan {
  id: string;
  name: string;
  units: string;
  price: string;
}

const STEPS = [
  { id: 'basic', label: 'Basic & Theme', icon: Layout },
  { id: 'wallet-points', label: 'Wallet & Points', icon: Wallet },
  { id: 'offerings', label: 'Offerings', icon: Ticket },
  { id: 'tiers-data', label: 'Tiers & Data', icon: ShieldCheck },
  { id: 'comms-legal', label: 'Comms & Legal', icon: MessageSquare },
];

const TEMPLATES = [
  {
    id: 'gourmet',
    name: 'The Gourmet',
    type: BrandType.RESTAURANT,
    icon: Utensils,
    color: 'emerald-600',
    font: 'Inter',
    desc: 'Warm, appetizing colors and modern layouts for high-end dining.',
    defaults: {
      heroTitle: "Dine Like Royalty",
      heroSubtitle: "Join our exclusive dining circle.",
      heroDescription: "Experience the finest farm-to-table cuisine with premium rewards on every visit.",
      primaryColor: 'emerald-600',
      borderRadius: '2xl'
    }
  },
  {
    id: 'zen',
    name: 'Zen Wellness',
    type: BrandType.SALON,
    icon: Brush,
    color: 'sky-600',
    font: 'Playfair Display',
    desc: 'Soft, calming palette for spa, salon, and wellness brands.',
    defaults: {
      heroTitle: "Rejuvenate Your Senses",
      heroSubtitle: "Luxury wellness awaits you.",
      heroDescription: "Bespoke spa treatments and salon services tailored to your unique lifestyle.",
      primaryColor: 'sky-600',
      borderRadius: 'full'
    }
  },
  {
    id: 'majestic',
    name: 'Majestic Stay',
    type: BrandType.HOTEL,
    icon: Bed,
    color: 'amber-600',
    font: 'Playfair Display',
    desc: 'Elegant and classic aesthetics for premium hotels and resorts.',
    defaults: {
      heroTitle: "Elegant Stays",
      heroSubtitle: "Your home away from home.",
      heroDescription: "Unmatched hospitality in the heart of the city with rewards that matter.",
      primaryColor: 'amber-600',
      borderRadius: 'none'
    }
  }
];

const CreateBrand: React.FC<CreateBrandProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: BrandType.RESTAURANT,
    description: '',
    logo: null as File | null,
    primaryColor: THEME_COLORS[0].class,
    fontFamily: FONT_STYLES[0].id as any,
    borderRadius: '2xl' as 'none' | 'md' | '2xl' | 'full',
    walletEnabled: true,
    walletType: 'COMMON',
    walletRestrictions: 'NONE', 
    walletRestrictionCategories: '', 
    allowWalletBonus: true,
    topupBonusPercentage: 10,
    walletBonusSlabs: [
      { id: '1', amountPaid: '1000', walletValue: '1200' }
    ] as BonusSlab[],
    pointsEnabled: true,
    pointsEarningRate: 1, 
    subscriptionsEnabled: true,
    subscriptionTypes: ['SERVICE'] as string[], 
    subscriptionPlans: [
      { id: 'sub-1', name: 'Starter Pass', units: '5', price: '450' }
    ] as SubPlan[],
    vouchersEnabled: true,
    voucherTypes: ['BUY_X_GET_Y', 'FLAT_DISCOUNT'] as string[], 
    tierSystemEnabled: true,
    mandatoryFields: ['Name', 'Mobile'],
    optionalInsights: [] as string[],
    targetInterests: [] as string[],
    automatedMessages: true,
    commChannels: ['WhatsApp'],
    manualDeductions: true,
    approvalWorkflow: false,
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    // Brand Manager Credentials
    managerUsername: '',
    managerPassword: ''
  });

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const applyTemplate = (template: typeof TEMPLATES[0]) => {
    setSelectedTemplateId(template.id);
    setFormData({
      ...formData,
      type: template.type,
      primaryColor: template.defaults.primaryColor,
      fontFamily: template.font as any,
      borderRadius: template.defaults.borderRadius as any,
      heroTitle: template.defaults.heroTitle,
      heroSubtitle: template.defaults.heroSubtitle,
      heroDescription: template.defaults.heroDescription
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData({ ...formData, logo: null });
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addBonusSlab = () => {
    setFormData({
      ...formData,
      walletBonusSlabs: [
        ...formData.walletBonusSlabs,
        { id: Date.now().toString(), amountPaid: '', walletValue: '1200' }
      ]
    });
  };

  const removeBonusSlab = (id: string) => {
    setFormData({
      ...formData,
      walletBonusSlabs: formData.walletBonusSlabs.filter(slab => slab.id !== id)
    });
  };

  const updateBonusSlab = (id: string, field: keyof BonusSlab, value: string) => {
    setFormData({
      ...formData,
      walletBonusSlabs: formData.walletBonusSlabs.map(slab => 
        slab.id === id ? { ...slab, [field]: value } : slab
      )
    });
  };

  const addSubPlan = () => {
    setFormData({
      ...formData,
      subscriptionPlans: [
        ...formData.subscriptionPlans,
        { id: Date.now().toString(), name: '', units: '', price: '' }
      ]
    });
  };

  const removeSubPlan = (id: string) => {
    setFormData({
      ...formData,
      subscriptionPlans: formData.subscriptionPlans.filter(p => p.id !== id)
    });
  };

  const updateSubPlan = (id: string, field: keyof SubPlan, value: string) => {
    setFormData({
      ...formData,
      subscriptionPlans: formData.subscriptionPlans.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    });
  };

  const toggleArrayItem = (key: any, value: string) => {
    setFormData(prev => {
      const current = prev[key as keyof typeof formData] as string[];
      const next = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const calculateBonus = (slab: BonusSlab) => {
    const paid = parseFloat(slab.amountPaid);
    const credited = parseFloat(slab.walletValue);
    if (isNaN(paid) || isNaN(credited) || paid <= 0) return null;
    const bonus = credited - paid;
    const percentage = (bonus / paid) * 100;
    return { bonus, percentage: percentage.toFixed(0) };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-300">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Crown size={16} className="text-amber-500" />
                  Starter Templates
                </h3>
                <p className="text-[10px] font-bold text-slate-400 italic">One-click visual setup</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className={`relative p-6 rounded-[2.5rem] border-2 text-left transition-all group overflow-hidden ${
                      selectedTemplateId === template.id 
                      ? 'border-indigo-600 bg-white shadow-2xl shadow-indigo-100 scale-105' 
                      : 'border-slate-100 bg-slate-50/30 hover:border-slate-200'
                    }`}
                  >
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110"></div>
                    <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center transition-all ${
                      selectedTemplateId === template.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'
                    }`}>
                      <template.icon size={28} />
                    </div>
                    <h4 className="font-black text-slate-900 mb-1">{template.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{template.desc}</p>
                    {selectedTemplateId === template.id && (
                      <div className="absolute top-4 right-4 text-indigo-600 animate-bounce">
                        <Check size={20} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Store size={16} className="text-indigo-600" />
                Brand Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Brand Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Incinc Dining" 
                      className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Brand Category</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold appearance-none cursor-pointer"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value as BrandType})}
                    >
                      <option value={BrandType.RESTAURANT}>Restaurant</option>
                      <option value={BrandType.SALON}>Salon & Wellness</option>
                      <option value={BrandType.HOTEL}>Hotel & Hospitality</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Brand Logo</label>
                  <div 
                    onClick={() => !logoPreview && fileInputRef.current?.click()}
                    className={`relative w-full h-[140px] border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer group ${
                      logoPreview ? 'border-indigo-100 bg-indigo-50/20' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
                    }`}
                  >
                    {logoPreview ? (
                      <div className="relative group/preview w-full h-full p-6 flex items-center justify-center">
                        <img src={logoPreview} alt="Logo preview" className="max-h-full max-w-full rounded-xl object-contain shadow-lg" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeLogo(); }}
                          className="absolute -top-3 -right-3 p-2 bg-rose-500 text-white rounded-full shadow-xl opacity-0 group-hover/preview:opacity-100 transition-opacity active:scale-90"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-white rounded-2xl mb-2 text-slate-400 group-hover:scale-110 transition-transform shadow-sm">
                          <Upload size={24} />
                        </div>
                        <p className="text-xs font-black text-slate-500 group-hover:text-indigo-600 uppercase tracking-widest">Upload Identity</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleLogoChange} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Lock size={16} className="text-indigo-600" />
                Manager Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Manager Username</label>
                  <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g. brand_manager" 
                      className="w-full p-4 pl-12 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold"
                      value={formData.managerUsername}
                      onChange={e => setFormData({...formData, managerUsername: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Initial Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full p-4 pl-12 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold"
                      value={formData.managerPassword}
                      onChange={e => setFormData({...formData, managerPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Palette size={16} className="text-indigo-600" /> 
                Visual Styling
              </h3>
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Palette</label>
                    <div className="grid grid-cols-7 gap-3">
                      {THEME_COLORS.map((c) => (
                        <button
                          key={c.class}
                          onClick={() => setFormData({...formData, primaryColor: c.class})}
                          className={`w-10 h-10 rounded-full ring-offset-2 transition-all flex items-center justify-center ${
                            formData.primaryColor === c.class ? 'ring-2 ring-slate-900 scale-125 shadow-xl' : 'hover:scale-110 opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.hex }}
                        >
                           {formData.primaryColor === c.class && <Check size={16} className="text-white" strokeWidth={4} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Typography Character</label>
                    <div className="grid grid-cols-1 gap-2">
                      {FONT_STYLES.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setFormData({...formData, fontFamily: f.id as any})}
                          className={`w-full p-4 rounded-2xl border-2 text-sm font-bold text-left transition-all ${
                            formData.fontFamily === f.id ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-100 hover:border-slate-200 bg-white text-slate-400'
                          }`}
                          style={{ fontFamily: f.id === 'Inter' ? 'Inter' : f.id }}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Wallet size={24} className="text-emerald-600" />
                    Unified Wallet
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">Configure shared balance logic and recharge incentives.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Module Active</span>
                  <button 
                    onClick={() => setFormData({...formData, walletEnabled: !formData.walletEnabled})}
                    className={`w-14 h-7 rounded-full transition-all relative ${formData.walletEnabled ? 'bg-emerald-600' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${formData.walletEnabled ? 'left-8' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
              
              {formData.walletEnabled && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Wallet Ecology</label>
                      <select 
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
                        value={formData.walletType}
                        onChange={(e) => setFormData({...formData, walletType: e.target.value})}
                      >
                        <option value="COMMON">Common (Network Shared)</option>
                        <option value="BRAND_SPECIFIC">Isolated (Brand Only)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Universal Bonus (%)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="10" 
                          className="w-full p-4 pr-10 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-black text-lg"
                          value={formData.topupBonusPercentage}
                          onChange={e => setFormData({...formData, topupBonusPercentage: Number(e.target.value)})}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">%</span>
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-6 border-t border-slate-200 flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm font-black text-slate-900">Tier-Based High Value Bonus Slabs?</label>
                        <p className="text-xs text-slate-400 font-medium">Add multiple dynamic entries for specific payment thresholds.</p>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, allowWalletBonus: !formData.allowWalletBonus})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.allowWalletBonus ? 'bg-emerald-500' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.allowWalletBonus ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                  </div>

                  {formData.allowWalletBonus && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                          <Coins size={14} className="text-emerald-500" />
                          Dynamic Bonus Slabs
                        </h4>
                        <button 
                          onClick={addBonusSlab}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                          <Plus size={14} /> Add Reward Tier
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.walletBonusSlabs.map((slab, idx) => {
                          const calc = calculateBonus(slab);
                          return (
                            <div key={slab.id} className="p-6 bg-white border-2 border-slate-50 rounded-3xl shadow-sm hover:border-emerald-200 transition-all group relative animate-in zoom-in-95 duration-300">
                              <button onClick={() => removeBonusSlab(slab.id)} className="absolute -top-2 -right-2 p-1.5 bg-rose-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={12} strokeWidth={3} />
                              </button>
                              
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount Paid</label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                                      <input 
                                        type="number" 
                                        placeholder="1000"
                                        className="w-full pl-7 pr-3 py-3 bg-slate-50 border-none rounded-xl text-sm font-black outline-none focus:ring-2 focus:ring-emerald-500"
                                        value={slab.amountPaid}
                                        onChange={(e) => updateBonusSlab(slab.id, 'amountPaid', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Wallet Credit</label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                                      <input 
                                        type="number" 
                                        placeholder="1200"
                                        className="w-full pl-7 pr-3 py-3 bg-emerald-50 rounded-xl text-sm font-black text-emerald-700 outline-none focus:ring-2 focus:ring-emerald-600"
                                        value={slab.walletValue}
                                        onChange={(e) => updateBonusSlab(slab.id, 'walletValue', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {calc && (
                                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50/50 py-2 px-3 rounded-lg border border-emerald-100/50">
                                    <Calculator size={12} />
                                    +{calc.percentage}% Bonus Value (₹{calc.bonus})
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        );
      case 2:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Subscriptions Module */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <ShoppingBag size={24} className="text-rose-600" />
                    Subscription Packs
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">Create prepaid service bundles for consistent revenue.</p>
                </div>
                <button 
                  onClick={() => setFormData({...formData, subscriptionsEnabled: !formData.subscriptionsEnabled})}
                  className={`w-14 h-7 rounded-full transition-all relative ${formData.subscriptionsEnabled ? 'bg-rose-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${formData.subscriptionsEnabled ? 'left-8' : 'left-1'}`}></div>
                </button>
              </div>

              {formData.subscriptionsEnabled && (
                <div className="space-y-8 animate-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Defined Subscription Plans</h4>
                    <button 
                      onClick={addSubPlan}
                      className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-700 shadow-lg shadow-rose-100"
                    >
                      <Plus size={14} /> Add Plan
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {formData.subscriptionPlans.map((plan, idx) => (
                      <div key={plan.id} className="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm hover:border-rose-100 transition-all flex items-center gap-6 relative group animate-in slide-in-from-bottom-2">
                        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-black">{idx + 1}</div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Name</label>
                            <input type="text" placeholder="e.g. Weekly Stay Pass" value={plan.name} onChange={e => updateSubPlan(plan.id, 'name', e.target.value)} className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-rose-500" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Units (Nights/Sessions)</label>
                            <input type="number" placeholder="5" value={plan.units} onChange={e => updateSubPlan(plan.id, 'units', e.target.value)} className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-rose-500" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Price (₹)</label>
                            <input type="number" placeholder="4500" value={plan.price} onChange={e => updateSubPlan(plan.id, 'price', e.target.value)} className="w-full p-3 bg-rose-50 text-rose-700 border-none rounded-xl text-sm font-black focus:ring-2 focus:ring-rose-600" />
                          </div>
                        </div>
                        <button onClick={() => removeSubPlan(plan.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Vouchers Section */}
            <div className="space-y-6 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Ticket size={24} className="text-amber-600" />
                    Voucher Engine
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">Issue one-time rewards or promotional coupons.</p>
                </div>
                <button 
                  onClick={() => setFormData({...formData, vouchersEnabled: !formData.vouchersEnabled})}
                  className={`w-14 h-7 rounded-full transition-all relative ${formData.vouchersEnabled ? 'bg-amber-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${formData.vouchersEnabled ? 'left-8' : 'left-1'}`}></div>
                </button>
              </div>

              {formData.vouchersEnabled && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-500">
                  {['BUY_X_GET_Y', 'FLAT_DISCOUNT', 'TIER_BASED', 'PAID_VOUCHER'].map((type) => (
                    <button 
                      key={type}
                      onClick={() => toggleArrayItem('voucherTypes', type)}
                      className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all ${
                        formData.voucherTypes.includes(type) ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-slate-100 text-slate-400'
                      }`}
                    >
                      <Tag size={18} />
                      <span className="text-[10px] font-black uppercase tracking-tight text-center">{type.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-300">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShieldCheck size={20} className="text-indigo-600" />
                  Membership Tier System
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Silver', color: 'slate', desc: 'Base tier for all signups.' },
                  { name: 'Gold', color: 'amber', desc: '1.5x points multiplier.' },
                  { name: 'Platinum', color: 'indigo', desc: '2x points + Exclusives.' }
                ].map(tier => (
                  <div key={tier.name} className="p-6 bg-white border border-slate-100 rounded-[2rem] text-center shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl bg-${tier.color}-100 flex items-center justify-center mx-auto mb-4 text-${tier.color}-600 font-black text-xl`}>
                      {tier.name[0]}
                    </div>
                    <p className="font-black text-slate-900 mb-1">{tier.name}</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10 border-t border-slate-100 pt-10">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Store size={20} className="text-indigo-600" />
                Customer Data intake
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 block">Mandatory Fields</label>
                  <div className="space-y-2">
                    {['Name', 'Mobile', 'Email', 'Birthday', 'Anniversary'].map(field => (
                      <label key={field} className={`flex items-center gap-3 p-4 rounded-2xl transition-all cursor-pointer border ${
                        formData.mandatoryFields.includes(field) ? 'bg-white border-indigo-200 text-slate-900 shadow-sm' : 'bg-transparent border-transparent text-slate-400'
                      }`}>
                        <input type="checkbox" checked={formData.mandatoryFields.includes(field)} onChange={() => toggleArrayItem('mandatoryFields', field)} className="w-5 h-5 rounded text-indigo-600" />
                        <span className="text-sm font-bold">{field}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 block">Demographic Targeting</label>
                  <div className="grid grid-cols-1 gap-2">
                    {AVAILABLE_INTERESTS.slice(0, 4).map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => toggleArrayItem('targetInterests', interest.id)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                          formData.targetInterests.includes(interest.id) ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-slate-50 text-slate-400 grayscale opacity-60'
                        }`}
                      >
                        <interest.icon size={18} />
                        <span className="text-[11px] font-black uppercase">{interest.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <section className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <MessageSquare size={20} className="text-sky-500" />
                Automated Notifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({...formData, commChannels: ['WhatsApp']})}
                  className={`flex items-center gap-4 p-5 border-2 rounded-3xl transition-all ${
                    formData.commChannels.includes('WhatsApp') ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${formData.commChannels.includes('WhatsApp') ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Smartphone size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-slate-900 text-sm">WhatsApp Business</p>
                  </div>
                </button>
                <button
                  onClick={() => setFormData({...formData, commChannels: ['SMS']})}
                  className={`flex items-center gap-4 p-5 border-2 rounded-3xl transition-all ${
                    formData.commChannels.includes('SMS') ? 'border-sky-500 bg-sky-50/20' : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${formData.commChannels.includes('SMS') ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <MessageSquare size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-slate-900 text-sm">Transactional SMS</p>
                  </div>
                </button>
              </div>
            </section>

            <section className="space-y-6 border-t border-slate-100 pt-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Gavel size={20} className="text-rose-500" />
                Administrative Controls
              </h3>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-6">
                <div className="flex items-center justify-between">
                  <p className="font-black text-slate-900 text-sm">Direct Wallet Deductions</p>
                  <button 
                    onClick={() => setFormData({...formData, manualDeductions: !formData.manualDeductions})}
                    className={`w-12 h-6 rounded-full transition-all relative ${formData.manualDeductions ? 'bg-emerald-500' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.manualDeductions ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-20">
      <div className="mb-10">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors mb-4 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Cancel and Return
        </button>
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight italic">Brand Orchestrator</h1>
        <p className="text-slate-500 font-medium">Architecting a unique ecosystem of loyalty and trust.</p>
      </div>

      <div className="mb-12 flex items-center justify-between px-2 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10"></div>
        <div className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 -z-10 transition-all duration-500" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}></div>
        {STEPS.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${idx <= currentStep ? 'bg-indigo-600 border-indigo-100 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300'}`}>
              {idx < currentStep ? <Check size={18} strokeWidth={3} /> : <step.icon size={18} />}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${idx <= currentStep ? 'text-indigo-600' : 'text-slate-400'}`}>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl p-12 min-h-[650px] flex flex-col relative overflow-hidden">
        <div className="flex-1 relative z-10">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{STEPS[currentStep].label}</h2>
            <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">Step {currentStep + 1} of {STEPS.length}</div>
          </div>
          {renderStepContent()}
        </div>

        <div className="pt-10 flex items-center justify-between border-t border-slate-50 mt-10 relative z-10">
          <button onClick={prevStep} disabled={currentStep === 0} className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${currentStep === 0 ? 'opacity-0' : 'text-slate-500 hover:bg-slate-50'}`}>
            <ArrowLeft size={18} /> Previous
          </button>
          
          {currentStep === STEPS.length - 1 ? (
            <button onClick={onComplete} className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl active:scale-95 shadow-indigo-100">
              Complete Brand Setup <Check size={20} strokeWidth={3} />
            </button>
          ) : (
            <button onClick={nextStep} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-95">
              Proceed to Next Section <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;

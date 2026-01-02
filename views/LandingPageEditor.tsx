
import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Type, 
  ImageIcon, 
  Save, 
  Smartphone, 
  Check, 
  RefreshCw,
  Zap,
  ArrowRight,
  Palette,
  Mail,
  Phone,
  Clock,
  MapPin,
  Brush,
  Star,
  ShieldCheck,
  Plus,
  Trash2,
  Package,
  ListOrdered,
  Eye,
  Sliders,
  MoveUp,
  MoveDown,
  Tag,
  Grid,
  Gift
} from 'lucide-react';
import { Brand, BrandType, FeaturedOffer } from '../types';
import { THEME_COLORS, FONT_STYLES } from '../constants';

interface LandingPageEditorProps {
  brand: Brand;
}

const LandingPageEditor: React.FC<LandingPageEditorProps> = ({ brand }) => {
  const [config, setConfig] = useState(brand.landingPage);
  const [theme, setTheme] = useState(brand.theme);
  const [logo, setLogo] = useState(brand.logo);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);
  const [previewOfferIdx, setPreviewOfferIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'hero' | 'featured' | 'content' | 'products' | 'steps' | 'gallery'>('hero');

  // Slideshow preview cycles
  useEffect(() => {
    if (config.heroSlideshowImages.length > 1) {
      const interval = setInterval(() => {
        setPreviewSlideIdx(prev => (prev + 1) % config.heroSlideshowImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [config.heroSlideshowImages.length]);

  useEffect(() => {
    if (config.featuredOffers.length > 1) {
      const interval = setInterval(() => {
        setPreviewOfferIdx(prev => (prev + 1) % config.featuredOffers.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [config.featuredOffers.length]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const borderRadiusMap: Record<string, string> = {
    none: '0px',
    md: '8px',
    '2xl': '16px',
    full: '9999px'
  };

  const addSlideshowImage = () => {
    setConfig({
      ...config,
      heroSlideshowImages: [...config.heroSlideshowImages, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80']
    });
  };

  const addFeaturedOffer = () => {
    const newOffer: FeaturedOffer = {
      id: Date.now().toString(),
      title: 'New Exclusive Offer',
      description: 'Describe the benefits of this limited time reward...',
      ctaText: 'Learn More',
      imageUrl: 'https://images.unsplash.com/photo-1550966841-3ee7ad6d1b82?auto=format&fit=crop&w=800&q=80'
    };
    setConfig({ ...config, featuredOffers: [...config.featuredOffers, newOffer] });
  };

  const addGalleryImage = () => {
    setConfig({
      ...config,
      menuGallery: [...config.menuGallery, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80']
    });
  };

  const removeSlideshowImage = (idx: number) => {
    const newImages = [...config.heroSlideshowImages];
    newImages.splice(idx, 1);
    setConfig({ ...config, heroSlideshowImages: newImages });
  };

  const removeFeaturedOffer = (id: string) => {
    setConfig({ ...config, featuredOffers: config.featuredOffers.filter(o => o.id !== id) });
  };

  const removeGalleryImage = (idx: number) => {
    const next = [...config.menuGallery];
    next.splice(idx, 1);
    setConfig({ ...config, menuGallery: next });
  };

  const updateFeaturedOffer = (id: string, updates: Partial<FeaturedOffer>) => {
    setConfig({
      ...config,
      featuredOffers: config.featuredOffers.map(o => o.id === id ? { ...o, ...updates } : o)
    });
  };

  const addProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      name: 'New Item',
      description: 'Describe your reward or service...',
      price: '₹999',
      imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80'
    };
    setConfig({ ...config, products: [...config.products, newProduct] });
  };

  const removeProduct = (id: string) => {
    setConfig({ ...config, products: config.products.filter(p => p.id !== id) });
  };

  const updateProduct = (id: string, updates: any) => {
    setConfig({
      ...config,
      products: config.products.map(p => p.id === id ? { ...p, ...updates } : p)
    });
  };

  const currentPrimaryColor = THEME_COLORS.find(c => c.class === theme.primaryColor)?.hex || '#4f46e5';

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Landing Page Editor</h1>
          <p className="text-slate-500 font-medium">Customize the public face of <span className="text-indigo-600 font-bold">{brand.name}</span>.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={20} />}
            {showSuccess ? "Changes Saved!" : "Publish Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Editor Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Editor Tabs */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-x-auto no-scrollbar">
            {[
              { id: 'hero', label: 'Banners', icon: ImageIcon },
              { id: 'featured', label: 'Offers', icon: Gift },
              { id: 'content', label: 'Identity', icon: ShieldCheck },
              { id: 'products', label: 'Selection', icon: Package },
              { id: 'gallery', label: 'Full Menu', icon: Grid },
              { id: 'steps', label: 'Process', icon: ListOrdered },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon size={12} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-280px)] pr-2 custom-scrollbar space-y-8">
            {activeTab === 'hero' && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10 animate-in slide-in-from-right-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Sliders size={16} className="text-indigo-600" />
                    Hero Slideshow
                  </h3>
                  <button onClick={addSlideshowImage} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100"><Plus size={18} /></button>
                </div>
                <div className="space-y-3">
                  {config.heroSlideshowImages.map((img, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <img src={img} className="w-12 h-12 rounded-lg object-cover shadow-sm" alt="" />
                      <input type="text" className="flex-1 bg-white border border-slate-200 p-2 rounded-xl text-[10px] outline-none font-mono" value={img} onChange={(e) => {
                        const next = [...config.heroSlideshowImages];
                        next[i] = e.target.value;
                        setConfig({...config, heroSlideshowImages: next});
                      }} />
                      <button onClick={() => removeSlideshowImage(i)} className="p-1 text-slate-400 hover:text-rose-600"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'featured' && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10 animate-in slide-in-from-right-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Featured Offers Slider</h3>
                  <button onClick={addFeaturedOffer} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100"><Plus size={18} /></button>
                </div>
                <div className="space-y-6">
                  {config.featuredOffers.map(offer => (
                    <div key={offer.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                      <div className="flex gap-4">
                        <img src={offer.imageUrl} className="w-24 h-24 rounded-2xl object-cover shadow-sm" alt="" />
                        <div className="flex-1 space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Offer Title</label>
                            <input type="text" className="w-full bg-white p-3 rounded-xl text-sm font-bold border border-slate-200 outline-none" value={offer.title} onChange={e => updateFeaturedOffer(offer.id, { title: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Button Text</label>
                            <input type="text" className="w-full bg-white p-3 rounded-xl text-xs font-bold border border-slate-200 outline-none" value={offer.ctaText} onChange={e => updateFeaturedOffer(offer.id, { ctaText: e.target.value })} />
                          </div>
                        </div>
                        <button onClick={() => removeFeaturedOffer(offer.id)} className="text-slate-400 hover:text-rose-500 p-2"><Trash2 size={18} /></button>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Description</label>
                        <textarea className="w-full bg-white p-3 rounded-xl text-xs border border-slate-200 outline-none focus:border-indigo-500" value={offer.description} onChange={e => updateFeaturedOffer(offer.id, { description: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Image URL</label>
                        <input type="text" className="w-full bg-white p-3 rounded-xl text-[10px] font-mono border border-slate-200 outline-none" value={offer.imageUrl} onChange={e => updateFeaturedOffer(offer.id, { imageUrl: e.target.value })} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Layout size={16} className="text-indigo-600" />
                      Global Copy
                    </h3>
                    <div className="space-y-4">
                      <input type="text" placeholder="Hero Title" className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none font-bold focus:border-indigo-500" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} />
                      <input type="text" placeholder="Hero Subtitle" className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-indigo-500" value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} />
                      <textarea placeholder="Main Description" className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-indigo-500 min-h-[120px]" value={config.heroDescription} onChange={e => setConfig({...config, heroDescription: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      Essential Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Mobile</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="text" placeholder="+91 00000 00000" className="w-full p-4 pl-12 bg-slate-50 border border-transparent rounded-2xl outline-none font-bold focus:border-indigo-500" value={config.brandPhone} onChange={e => setConfig({...config, brandPhone: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="email" placeholder="contact@brand.com" className="w-full p-4 pl-12 bg-slate-50 border border-transparent rounded-2xl outline-none font-bold focus:border-indigo-500" value={config.brandEmail} onChange={e => setConfig({...config, brandEmail: e.target.value})} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-slate-400" size={16} />
                        <textarea placeholder="Brand physical location..." className="w-full p-4 pl-12 bg-slate-50 border border-transparent rounded-2xl outline-none font-bold focus:border-indigo-500 min-h-[80px]" value={config.brandAddress} onChange={e => setConfig({...config, brandAddress: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10 animate-in slide-in-from-right-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Signature Collection (Auto Infinite Scroll)</h3>
                  <button onClick={addProduct} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100"><Plus size={18} /></button>
                </div>
                <div className="space-y-6">
                  {config.products.map(p => (
                    <div key={p.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                      <div className="flex gap-4">
                        <img src={p.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                        <div className="flex-1 space-y-2">
                          <input type="text" placeholder="Item Name" className="w-full bg-white p-3 rounded-xl text-sm font-bold border border-slate-200 outline-none focus:border-indigo-500" value={p.name} onChange={e => updateProduct(p.id, { name: e.target.value })} />
                          <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest px-1">Note: Rates are hidden on public page as requested.</p>
                        </div>
                        <button onClick={() => removeProduct(p.id)} className="text-slate-400 hover:text-rose-500 p-2"><Trash2 size={18} /></button>
                      </div>
                      <textarea placeholder="Short Description" className="w-full bg-white p-3 rounded-xl text-xs border border-slate-200 outline-none focus:border-indigo-500" value={p.description} onChange={e => updateProduct(p.id, { description: e.target.value })} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10 animate-in slide-in-from-right-4">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Menu Gallery (10-15 Images)</h3>
                       <p className="text-[10px] text-slate-400 font-medium mt-1">Images shown when customer clicks "View Full Menu"</p>
                    </div>
                    <button onClick={addGalleryImage} className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100"><Plus size={20} /></button>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    {config.menuGallery.map((img, idx) => (
                      <div key={idx} className="relative group rounded-3xl overflow-hidden aspect-square border-2 border-slate-100 bg-slate-50">
                         <img src={img} className="w-full h-full object-cover" alt="" />
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4">
                            <input 
                              type="text" 
                              className="w-full bg-white/20 border border-white/20 text-[8px] text-white p-2 rounded-lg mb-2 backdrop-blur-md outline-none" 
                              value={img} 
                              onChange={(e) => {
                                const next = [...config.menuGallery];
                                next[idx] = e.target.value;
                                setConfig({...config, menuGallery: next});
                              }}
                            />
                            <button 
                              onClick={() => removeGalleryImage(idx)}
                              className="p-3 bg-rose-500 text-white rounded-xl active:scale-90 transition-all"
                            >
                               <Trash2 size={16} />
                            </button>
                         </div>
                         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black text-slate-900 shadow-sm">{idx + 1}</div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'steps' && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10 animate-in slide-in-from-right-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">How It Works</h3>
                <div className="space-y-4">
                  {config.redemptionSteps.map((step, i) => (
                    <div key={step.id} className="flex gap-4 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shrink-0 shadow-lg shadow-indigo-100">{i+1}</div>
                      <div className="flex-1 space-y-2">
                        <input type="text" className="w-full bg-white p-3 rounded-xl text-xs font-bold border border-slate-200" value={step.title} onChange={e => {
                          const next = [...config.redemptionSteps];
                          next[i].title = e.target.value;
                          setConfig({...config, redemptionSteps: next});
                        }} />
                        <input type="text" className="w-full bg-white p-3 rounded-xl text-[10px] border border-slate-200" value={step.description} onChange={e => {
                          const next = [...config.redemptionSteps];
                          next[i].description = e.target.value;
                          setConfig({...config, redemptionSteps: next});
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview - Mobile Device */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-28">
            <div className="flex items-center justify-between w-full mb-6 px-4">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Smartphone size={14} /> Device Preview
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                <RefreshCw size={10} className="animate-spin" /> Live Sync
              </div>
            </div>
            
            <div className="w-[340px] h-[680px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-4 border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
              </div>

              <div 
                className="w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col relative pt-8 transition-colors duration-500 no-scrollbar overflow-y-auto"
                style={{ 
                  backgroundColor: config.pageBackgroundColor || '#ffffff',
                  fontFamily: theme.fontFamily === 'Inter' ? "'Inter', sans-serif" : theme.fontFamily
                }}
              >
                <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-[60]">
                  <img src={logo} className="h-6 w-auto object-contain" alt="" />
                </div>

                <div className="relative h-44 shrink-0 overflow-hidden">
                  {config.heroSlideshowImages.map((img, i) => (
                    <img 
                      key={i}
                      src={img} 
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                        i === previewSlideIdx ? 'opacity-100' : 'opacity-0'
                      }`} 
                      alt="" 
                    />
                  ))}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                    <h2 className="text-white text-lg font-black leading-tight">{config.heroTitle}</h2>
                    <p className="text-white/80 text-[10px] font-medium mt-1">{config.heroSubtitle}</p>
                  </div>
                </div>

                <div className="p-5 space-y-6">
                  {/* Featured Offer Live Preview */}
                  {config.featuredOffers.length > 0 && (
                    <div className="relative overflow-hidden p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      {config.featuredOffers.map((offer, idx) => (
                        <div key={offer.id} className={`transition-all duration-700 ${idx === previewOfferIdx ? 'opacity-100' : 'opacity-0 absolute inset-0 p-5'}`}>
                           <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-1">Featured Offer</p>
                           <h4 className="text-xs font-black text-slate-900 leading-tight mb-1">{offer.title}</h4>
                           <p className="text-[9px] text-slate-500 leading-tight line-clamp-2">{offer.description}</p>
                           <button className="mt-3 px-3 py-1.5 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-lg">{offer.ctaText}</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-4 bg-slate-50 border border-slate-100" style={{ borderRadius: borderRadiusMap[theme.borderRadius] }}>
                    <p className="text-[10px] font-black text-slate-900 leading-none">Get {brand.topupBonusPercentage}% Bonus Credits!</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Our Selection</h4>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-indigo-600 rounded-full animate-ping"></div>
                        <span className="text-[8px] font-black text-indigo-600 uppercase">Auto Scroll</span>
                      </div>
                    </div>
                    <div className="flex gap-4 overflow-hidden py-1">
                      <div className="flex gap-4 animate-marquee-slow whitespace-nowrap">
                        {config.products.concat(config.products).map((p, idx) => (
                          <div key={idx} className="min-w-[140px] bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                            <img src={p.imageUrl} className="w-full h-20 object-cover" alt="" />
                            <div className="p-2">
                              <p className="text-[10px] font-bold text-slate-900 leading-tight truncate">{p.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageEditor;

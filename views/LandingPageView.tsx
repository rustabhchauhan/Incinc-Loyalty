
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  ExternalLink,
  Star,
  ShieldCheck,
  ChevronRight,
  Package,
  ArrowRightCircle,
  Menu,
  ShoppingBag,
  History,
  Info,
  Maximize2,
  Minimize2,
  X,
  User as UserIcon,
  LogOut,
  ChevronLeft,
  Search,
  Gift,
  ArrowLeftCircle,
  Plus
} from 'lucide-react';
import { Brand, BrandType, User } from '../types';
import { THEME_COLORS } from '../constants';
import LoginView from './LoginView';

interface LandingPageViewProps {
  brand: Brand;
  onLogin?: (user: User) => void;
}

const LandingPageView: React.FC<LandingPageViewProps> = ({ brand, onLogin }) => {
  const config = brand.landingPage;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentOfferIdx, setCurrentOfferIdx] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean, mode: 'LOGIN' | 'SIGNUP' }>({ isOpen: false, mode: 'LOGIN' });
  
  // Gallery States
  const [showGallery, setShowGallery] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number | null>(null);

  const borderRadiusMap: Record<string, string> = {
    none: '0px',
    md: '12px',
    '2xl': '24px',
    full: '9999px'
  };

  const borderRadius = borderRadiusMap[config.ctaBorderRadius || brand.theme.borderRadius];
  const primaryHex = THEME_COLORS.find(c => c.class === brand.theme.primaryColor)?.hex || '#4f46e5';

  const isRestaurant = brand.type === BrandType.RESTAURANT;
  const isSalon = brand.type === BrandType.SALON;

  // Slideshow Logic
  useEffect(() => {
    if (config.heroSlideshowImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % config.heroSlideshowImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [config.heroSlideshowImages.length]);

  // Featured Offers Auto-scroll
  useEffect(() => {
    if (config.featuredOffers.length > 1) {
      const timer = setInterval(() => {
        setCurrentOfferIdx(prev => (prev + 1) % config.featuredOffers.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [config.featuredOffers.length]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const openAuth = (mode: 'LOGIN' | 'SIGNUP') => {
    setAuthModal({ isOpen: true, mode });
  };

  const getTransitionClasses = (idx: number) => {
    const isActive = idx === currentSlide;
    const effect = config.heroTransitionEffect;
    let classes = "absolute inset-0 transition-all duration-1000 transform ";
    if (isActive) {
      classes += "opacity-100 scale-100 translate-x-0 z-10 ";
    } else {
      classes += "opacity-0 pointer-events-none z-0 ";
      if (effect === 'zoom') classes += "scale-110 ";
      if (effect === 'slide') classes += "translate-x-full ";
    }
    return classes;
  };

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all duration-700 overflow-x-hidden ${isFullScreen ? 'bg-black' : ''}`}
      style={{ 
        backgroundColor: config.pageBackgroundColor || '#ffffff',
        fontFamily: brand.theme.fontFamily === 'Inter' ? "'Inter', sans-serif" : brand.theme.fontFamily
      }}
    >
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: fit-content;
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* Lightbox Modal (Selected Gallery Image) */}
      {selectedGalleryImage !== null && (
        <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300">
           <button 
             onClick={() => setSelectedGalleryImage(null)}
             className="absolute top-10 right-10 p-4 text-white hover:bg-white/10 rounded-full transition-all"
           >
             <X size={32} />
           </button>
           
           <div className="w-full max-w-6xl max-h-[80vh] flex items-center justify-center p-4">
              <img 
                src={config.menuGallery[selectedGalleryImage]} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in duration-500" 
                alt="Large Menu Preview" 
              />
           </div>

           <div className="flex gap-10 mt-12">
              <button 
                onClick={() => setSelectedGalleryImage(prev => (prev! - 1 + config.menuGallery.length) % config.menuGallery.length)}
                className="p-5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setSelectedGalleryImage(prev => (prev! + 1) % config.menuGallery.length)}
                className="p-5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
              >
                <ChevronRight size={24} />
              </button>
           </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-slate-900 overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-500">
           <div className="max-w-7xl mx-auto p-10 space-y-16">
              <div className="flex items-center justify-between border-b border-white/10 pb-10">
                 <div>
                    <h2 className="text-5xl font-black text-white italic tracking-tighter">Full Collection</h2>
                    <p className="text-slate-400 mt-2 font-medium tracking-widest uppercase text-xs">Exclusively curated for our circle</p>
                 </div>
                 <button 
                  onClick={() => setShowGallery(false)}
                  className="px-8 py-4 bg-white text-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-widest flex items-center gap-3 active:scale-95 transition-all"
                 >
                   <ArrowRight className="rotate-180" size={18} /> Close Gallery
                 </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {(config.menuGallery.length > 0 ? config.menuGallery : config.products.map(p => p.imageUrl)).map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedGalleryImage(idx)}
                    className="aspect-square bg-white/5 rounded-[2rem] overflow-hidden cursor-pointer group relative shadow-xl hover:scale-105 transition-all duration-500"
                  >
                    <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="p-4 bg-white rounded-full text-slate-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <Search size={24} />
                       </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {/* Auth Modal */}
      {authModal.isOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-5xl h-full sm:h-[90vh] sm:rounded-[3.5rem] bg-white shadow-2xl overflow-y-auto no-scrollbar animate-in zoom-in duration-300">
            <button 
              onClick={() => setAuthModal({ ...authModal, isOpen: false })}
              className="absolute top-6 right-6 z-[110] p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <LoginView 
              initialMode={authModal.mode}
              onLogin={(u) => {
                setAuthModal({ ...authModal, isOpen: false });
                if (onLogin) onLogin(u);
              }} 
            />
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl z-[60] border-b border-slate-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src={brand.logo} className="w-10 h-10 rounded-xl shadow-sm object-cover" alt="Logo" />
            <span className="font-black text-slate-900 tracking-tighter text-xl uppercase hidden sm:block">{brand.name}</span>
          </div>
          <div className="flex items-center gap-4 lg:gap-10">
            <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#offers" className="hover:text-slate-900 transition-colors">Exclusive Offers</a>
              <a href="#selection" className="hover:text-slate-900 transition-colors">{isRestaurant ? 'Cuisine' : isSalon ? 'Treatments' : 'The Suites'}</a>
              <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleFullScreen} className="p-2 text-slate-300 hover:text-slate-900 transition-colors hidden sm:block">
                {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              {config.showAuthButtons && (
                <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
                   <button onClick={() => openAuth('LOGIN')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Login</button>
                   <button onClick={() => openAuth('SIGNUP')} className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl hover:scale-105 active:scale-95 transition-all" style={{ backgroundColor: primaryHex, borderRadius: borderRadius }}>Join Circle</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto py-6">
          {/* HERO BANNER */}
          <div className="relative h-[450px] md:h-[600px] lg:h-[650px] w-full shadow-2xl overflow-hidden group mb-12 lg:mb-16" style={{ borderRadius: borderRadius }}>
             {config.heroSlideshowImages.map((img, idx) => (
               <div key={idx} className={getTransitionClasses(idx)}>
                 <img src={img} className="w-full h-full object-cover" style={{ opacity: config.heroImageOpacity / 100 }} alt="" />
                 <div className="absolute inset-0 transition-all duration-700" style={{ backgroundColor: config.heroOverlayColor, opacity: config.heroOverlayOpacity / 100 }} />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                 <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-20 lg:p-32 z-10">
                    <div className="space-y-6 md:space-y-8 max-w-3xl">
                      <span className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 inline-block w-fit">{brand.type.replace('_', ' ')} PRIVILEGE PROGRAM</span>
                      <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] drop-shadow-2xl">{config.heroTitle}</h1>
                      <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-medium max-w-xl">{config.heroSubtitle}</p>
                      <div className="pt-6 flex flex-col sm:flex-row gap-5">
                        <button onClick={() => openAuth('SIGNUP')} className="w-full sm:w-fit px-12 py-6 bg-white text-slate-900 font-black text-xs uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95" style={{ borderRadius: borderRadius }}>{config.ctaText} <ArrowRightCircle size={24} /></button>
                        <button className="px-12 py-6 bg-black/40 backdrop-blur-md text-white border border-white/20 font-black text-xs uppercase tracking-[0.3em] hover:bg-black/60 transition-all" style={{ borderRadius: borderRadius }}>Explore Brand</button>
                      </div>
                    </div>
                 </div>
               </div>
             ))}
             <div className="absolute bottom-12 right-12 flex gap-3 z-20">
                {config.heroSlideshowImages.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 transition-all rounded-full ${i === currentSlide ? 'w-12 bg-white shadow-lg' : 'w-2 bg-white/40 hover:bg-white/60'}`} />
                ))}
             </div>
          </div>

          {/* FEATURED OFFERS AUTO-SCROLLING SLIDER */}
          {config.featuredOffers.length > 0 && (
            <div id="offers" className="mb-16 lg:mb-24 px-2">
               <div className="flex items-center gap-4 mb-10"><div className="h-px w-16" style={{ backgroundColor: primaryHex }}></div><span className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: primaryHex }}>Featured Rewards</span></div>
               <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden shadow-xl" style={{ borderRadius: borderRadius }}>
                  {config.featuredOffers.map((offer, idx) => (
                    <div 
                      key={offer.id} 
                      className={`absolute inset-0 transition-all duration-1000 flex flex-col md:flex-row items-center bg-slate-900 text-white group ${idx === currentOfferIdx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}
                    >
                       <div className="w-full md:w-1/2 h-full relative overflow-hidden">
                          <img src={offer.imageUrl} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden md:block"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden"></div>
                       </div>
                       <div className="w-full md:w-1/2 p-8 md:p-16 space-y-6">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Live Reward</span>
                          </div>
                          <h3 className="text-3xl md:text-5xl font-black italic leading-tight">{offer.title}</h3>
                          <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">{offer.description}</p>
                          <button 
                            onClick={() => openAuth('SIGNUP')}
                            className="px-10 py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:gap-5"
                            style={{ borderRadius: borderRadiusMap.md }}
                          >
                             {offer.ctaText} <ArrowRight size={18} />
                          </button>
                       </div>
                    </div>
                  ))}
                  
                  {/* Slider Controls */}
                  <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                     <button onClick={() => setCurrentOfferIdx(prev => (prev - 1 + config.featuredOffers.length) % config.featuredOffers.length)} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                        <ChevronLeft size={20} />
                     </button>
                     <button onClick={() => setCurrentOfferIdx(prev => (prev + 1) % config.featuredOffers.length)} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                        <ChevronRight size={20} />
                     </button>
                  </div>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-24">
              <div className="space-y-8 px-2">
                <div className="flex items-center gap-4"><div className="h-px w-16" style={{ backgroundColor: primaryHex }}></div><span className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: primaryHex }}>The Experience</span></div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">A New Standard of <br/><span className="text-slate-400 italic">Hospitality Loyalty</span></h2>
                <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-3xl">{config.heroDescription}</p>
              </div>

              {/* SIGNATURE COLLECTION INFINITE MARQUEE */}
              <div id="selection" className="space-y-12 px-2 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-100 pb-8">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2 italic">{isRestaurant ? 'The Signature Collection' : isSalon ? 'Bespoke Wellness' : 'The Royal Residences'}</h3>
                    <p className="text-slate-500 font-medium font-serif italic">Auto-scrolling through our premium hand-picked selections.</p>
                  </div>
                  <button 
                    onClick={() => setShowGallery(true)}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-6 py-3 rounded-full flex items-center gap-3 hover:gap-4 transition-all active:scale-95"
                  >
                    View Full Menu <ChevronRight size={18} />
                  </button>
                </div>
                
                <div className="relative group/marquee">
                  <div className="animate-marquee gap-8 py-4">
                    {/* Concatenate products twice for seamless infinite effect */}
                    {config.products.concat(config.products).map((p, idx) => (
                      <div 
                        key={`${p.id}-${idx}`} 
                        className="min-w-[280px] md:min-w-[350px] bg-white border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all cursor-pointer"
                        style={{ borderRadius: borderRadius }}
                        onClick={() => openAuth('SIGNUP')}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img src={p.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="p-3 bg-white rounded-full text-slate-900"><Plus size={24} /></div>
                          </div>
                        </div>
                        <div className="p-8 space-y-4">
                          <h4 className="text-2xl font-black text-slate-900">{p.name}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">{p.description}</p>
                          <div className="pt-4 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-indigo-600 transition-colors">
                            Claim Perk <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Fading Gradients for Smoothness */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 px-2">
              <div className="lg:sticky lg:top-32 space-y-10">
                <div className="p-10 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group border border-white/5" style={{ borderRadius: borderRadius, backgroundColor: '#0f172a' }}>
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10 space-y-10">
                     <div className="w-20 h-20 rounded-3xl bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-inner">
                        <Zap size={40} style={{ color: primaryHex }} fill="currentColor" />
                     </div>
                     <div className="space-y-6">
                        <h3 className="text-3xl font-black leading-tight italic">Shared Wallet Advantage</h3>
                        <p className="text-slate-400 font-medium leading-relaxed italic border-l-2 border-indigo-500/50 pl-6">"One balance, infinite destinations. Your rewards flow seamlessly between our signature partners."</p>
                        <div className="space-y-5 pt-4">
                           <div className="flex items-center gap-4"><ShieldCheck size={22} className="text-emerald-400" /><span className="text-xs font-black uppercase tracking-widest text-slate-300">Bank-Grade Security</span></div>
                           <div className="flex items-center gap-4"><Star size={22} className="text-amber-400" /><span className="text-xs font-black uppercase tracking-widest text-slate-300">{brand.topupBonusPercentage}% Loyalty Bonus</span></div>
                        </div>
                     </div>
                     <button onClick={() => openAuth('SIGNUP')} className="w-full py-6 font-black text-xs uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 transition-all hover:brightness-110" style={{ backgroundColor: primaryHex, borderRadius: borderRadius }}>Start Saving Now <ArrowRight size={20} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-24 border-t border-slate-100 bg-slate-50/50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
           <div className="md:col-span-2 space-y-10">
              <div className="flex items-center gap-4"><img src={brand.logo} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt="" /><span className="font-black text-slate-900 tracking-tighter text-2xl uppercase italic">{brand.name}</span></div>
              <p className="text-slate-400 text-base font-medium leading-relaxed max-w-sm">A premium partner of the Incinc Loyalty Ecosystem. Experience hospitality reinvented with trust and technology.</p>
           </div>
           <div className="space-y-8">
              <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Contact</h5>
              <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
                 <p className="flex items-center gap-3"><Mail size={14} /> {config.brandEmail}</p>
                 <p className="flex items-center gap-3"><Phone size={14} /> {config.brandPhone}</p>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">&copy; 2024 {brand.name} • Powered by Incinc Media</p>
          <div className="flex items-center gap-8 opacity-60"><div className="flex items-center gap-3"><ExternalLink size={16} /><span className="text-[10px] font-black uppercase tracking-[0.2em]">www.incincmedia.com</span></div></div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageView;

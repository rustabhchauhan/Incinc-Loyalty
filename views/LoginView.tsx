
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { User, Role } from '../types';
import { 
  ShieldCheck, 
  UserCircle2, 
  Store, 
  ArrowRight, 
  Zap, 
  Lock, 
  Smartphone, 
  KeyRound, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Mail,
  Calendar,
  Heart,
  ChevronRight,
  Sparkles,
  Utensils,
  Scissors,
  Fish,
  Wine,
  Music,
  Dumbbell,
  Waves,
  Baby,
  Users
} from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: User) => void;
  initialMode?: 'LOGIN' | 'SIGNUP';
}

type AuthStep = 'SELECT_ROLE' | 'CHOOSE_METHOD' | 'PASSWORD_ENTRY' | 'PHONE_ENTRY' | 'OTP_ENTRY' | 'SIGNUP_BASIC' | 'SIGNUP_FAMILY' | 'SIGNUP_LIFESTYLE' | 'SIGNUP_SUCCESS';
type AuthMethod = 'PASSWORD' | 'OTP';

const AVAILABLE_INTERESTS = [
  { id: 'spa', label: 'Spa', icon: Sparkles },
  { id: 'haircare', label: 'Haircare', icon: Scissors },
  { id: 'seafood', label: 'Seafood', icon: Fish },
  { id: 'wine', label: 'Wine', icon: Wine },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'gym', label: 'Fitness', icon: Dumbbell },
  { id: 'poolside', label: 'Pool', icon: Waves },
  { id: 'fine-dining', label: 'Dining', icon: Utensils },
];

const LoginView: React.FC<LoginViewProps> = ({ onLogin, initialMode = 'LOGIN' }) => {
  const [step, setStep] = useState<AuthStep>(initialMode === 'SIGNUP' ? 'SIGNUP_BASIC' : 'SELECT_ROLE');
  const [method, setMethod] = useState<AuthMethod>('PASSWORD');
  const [selectedRole, setSelectedRole] = useState<Role | null>(initialMode === 'SIGNUP' ? Role.CUSTOMER : null);
  
  // Auth Fields
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  
  // Signup Fields
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    mobile: '',
    birthday: '',
    maritalStatus: 'SINGLE' as 'SINGLE' | 'MARRIED',
    anniversary: '',
    spouseBirthday: '',
    hasChildren: false,
    childCount: 0,
    childrenDobs: [] as string[],
    dietary: 'VEG' as 'VEG' | 'NON_VEG',
    interests: [] as string[]
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const credentialsMap = {
    [Role.SUPER_ADMIN]: { id: 'super', pwd: '123' },
    [Role.BRAND_ADMIN]: { id: 'admin', pwd: '123' },
    [Role.CUSTOMER]: { id: 'customer', pwd: '123' },
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep('CHOOSE_METHOD');
    setError(null);
  };

  const handleMethodSelect = (m: AuthMethod) => {
    setMethod(m);
    setStep(m === 'PASSWORD' ? 'PASSWORD_ENTRY' : 'PHONE_ENTRY');
    setError(null);
  };

  const handlePasswordLogin = () => {
    if (!selectedRole) return;
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      const creds = credentialsMap[selectedRole];
      if (loginId.toLowerCase() === creds.id && password === creds.pwd) {
        const user = MOCK_USERS.find(u => u.role === selectedRole);
        if (user) onLogin(user);
      } else {
        setError('Invalid ID or Password. Try super/123.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleSendOtp = () => {
    if (phone.length < 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setStep('OTP_ENTRY');
      setIsLoading(false);
      setError(null);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (otp === '1234') {
        const user = MOCK_USERS.find(u => u.role === selectedRole);
        if (user) onLogin(user);
      } else {
        setError('Invalid OTP. Use 1234.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleSignupNext = () => {
    if (!signupData.name || !signupData.mobile || !signupData.email || !signupData.birthday) {
      setError('Please fill all basic details including your birthday.');
      return;
    }
    setError(null);
    setStep('SIGNUP_FAMILY');
  };

  const handleFamilyNext = () => {
    setError(null);
    setStep('SIGNUP_LIFESTYLE');
  };

  const handleSignupComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep('SIGNUP_SUCCESS');
      setIsLoading(false);
    }, 1500);
  };

  const toggleInterest = (id: string) => {
    setSignupData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  const updateChildDob = (idx: number, dob: string) => {
    const next = [...signupData.childrenDobs];
    next[idx] = dob;
    setSignupData({ ...signupData, childrenDobs: next });
  };

  const renderStep = () => {
    switch (step) {
      case 'SELECT_ROLE':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 font-medium">Select your portal to continue.</p>
            </div>
            <div className="space-y-3">
              {[
                { role: Role.SUPER_ADMIN, label: 'Super Admin', icon: ShieldCheck, color: 'indigo' },
                { role: Role.BRAND_ADMIN, label: 'Brand Admin', icon: Store, color: 'emerald' },
                { role: Role.CUSTOMER, label: 'Customer', icon: UserCircle2, color: 'amber' },
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={() => handleRoleSelect(item.role)}
                  className="w-full p-5 border-2 border-slate-50 rounded-[2rem] flex items-center justify-between hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-${item.color}-100 text-${item.color}-600`}>
                      <item.icon size={24} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-900">{item.label}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">Access Portal</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
            <div className="pt-6 text-center">
               <button onClick={() => setStep('SIGNUP_BASIC')} className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                 Don't have an account? <span className="text-indigo-600 underline">Sign Up Now</span>
               </button>
            </div>
          </div>
        );

      case 'CHOOSE_METHOD':
        return (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <button onClick={() => setStep('SELECT_ROLE')} className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-indigo-600 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="text-2xl font-black text-slate-900">Login Method</h2>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => handleMethodSelect('PASSWORD')} className="p-6 border-2 border-slate-50 rounded-3xl flex items-center gap-4 hover:border-indigo-600 transition-all group">
                <div className="p-3 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><KeyRound size={24} /></div>
                <div className="text-left">
                  <p className="font-black text-slate-900">Password</p>
                  <p className="text-xs text-slate-400">Use system credentials</p>
                </div>
              </button>
              <button onClick={() => handleMethodSelect('OTP')} className="p-6 border-2 border-slate-50 rounded-3xl flex items-center gap-4 hover:border-emerald-600 transition-all group">
                <div className="p-3 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Smartphone size={24} /></div>
                <div className="text-left">
                  <p className="font-black text-slate-900">SMS OTP</p>
                  <p className="text-xs text-slate-400">Quick phone verification</p>
                </div>
              </button>
            </div>
          </div>
        );

      case 'PASSWORD_ENTRY':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <button onClick={() => setStep('CHOOSE_METHOD')} className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-indigo-600 transition-colors"><ArrowLeft size={16} /> Back</button>
            <h2 className="text-2xl font-black text-slate-900">Verify Identity</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Portal ID (e.g. super, admin, customer)" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold" value={loginId} onChange={e => setLoginId(e.target.value)} />
              <input type="password" placeholder="Password" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold" value={password} onChange={e => setPassword(e.target.value)} />
              {error && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2"><AlertCircle size={14} />{error}</div>}
              <button onClick={handlePasswordLogin} disabled={isLoading} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl">
                {isLoading ? 'Unlocking...' : 'Unlock Dashboard'}
              </button>
            </div>
          </div>
        );

      case 'PHONE_ENTRY':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <button onClick={() => setStep('CHOOSE_METHOD')} className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-indigo-600 transition-colors"><ArrowLeft size={16} /> Back</button>
            <h2 className="text-2xl font-black text-slate-900">Mobile Login</h2>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">+91</span>
                <input type="tel" maxLength={10} placeholder="Mobile Number" className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none font-black text-lg" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} />
              </div>
              {error && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl">{error}</div>}
              <button onClick={handleSendOtp} disabled={isLoading || phone.length < 10} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl">
                {isLoading ? 'Sending...' : 'Send Verification OTP'}
              </button>
            </div>
          </div>
        );

      case 'OTP_ENTRY':
        return (
          <div className="space-y-6 animate-in zoom-in-95 duration-300 text-center">
            <h2 className="text-2xl font-black text-slate-900">Enter OTP</h2>
            <p className="text-sm text-slate-500">Sent to <span className="text-slate-900 font-black">+91 {phone}</span></p>
            <input type="text" maxLength={4} placeholder="0 0 0 0" className="w-full py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none text-center font-black text-4xl tracking-[0.5em]" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} />
            {error && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl">{error}</div>}
            <button onClick={handleVerifyOtp} disabled={isLoading || otp.length < 4} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl">
              Verify & Log In
            </button>
          </div>
        );

      case 'SIGNUP_BASIC':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-black text-slate-900">Join the Circle</h2>
               <button onClick={() => setStep('SELECT_ROLE')} className="text-xs font-bold text-slate-400 hover:text-indigo-600">Back to Login</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Full Name</label>
                   <div className="relative">
                     <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                     <input type="text" placeholder="e.g. John Doe" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold" value={signupData.name} onChange={e => setSignupData({...signupData, name: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Email Address</label>
                   <div className="relative">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                     <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold" value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Mobile Number</label>
                   <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">+91</span>
                     <input type="tel" maxLength={10} placeholder="99988 77665" className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-black text-lg" value={signupData.mobile} onChange={e => setSignupData({...signupData, mobile: e.target.value.replace(/\D/g, '')})} />
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Your Birthday</label>
                   <div className="relative">
                     <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                     <input type="date" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold" value={signupData.birthday} onChange={e => setSignupData({...signupData, birthday: e.target.value})} />
                   </div>
                   <p className="text-[9px] text-slate-400 mt-1 italic px-1">We love giving free cakes during your birthday month! 🎂</p>
                </div>
              </div>
              {error && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl">{error}</div>}
              <button onClick={handleSignupNext} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                Family Details <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case 'SIGNUP_FAMILY':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 max-h-[70vh] overflow-y-auto no-scrollbar pr-1">
            <button onClick={() => setStep('SIGNUP_BASIC')} className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-indigo-600 transition-colors"><ArrowLeft size={16} /> Back</button>
            <div className="mb-2">
              <h2 className="text-2xl font-black text-slate-900">Family Status</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Help us celebrate milestones with your loved ones.</p>
            </div>

            <div className="space-y-6">
              {/* Marital Status */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Marital Status</label>
                <div className="flex gap-3">
                  {['SINGLE', 'MARRIED'].map(status => (
                    <button 
                      key={status} 
                      onClick={() => setSignupData({...signupData, maritalStatus: status as any})} 
                      className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all border-2 ${signupData.maritalStatus === status ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {signupData.maritalStatus === 'MARRIED' && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block px-1">Anniversary</label>
                      <div className="relative">
                        <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                        <input type="date" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-500 rounded-2xl outline-none font-bold text-xs" value={signupData.anniversary} onChange={e => setSignupData({...signupData, anniversary: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block px-1">Wife's Birthday</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                        <input type="date" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-500 rounded-2xl outline-none font-bold text-xs" value={signupData.spouseBirthday} onChange={e => setSignupData({...signupData, spouseBirthday: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Children Section */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                 <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Do you have children?</label>
                    <button 
                      onClick={() => setSignupData({...signupData, hasChildren: !signupData.hasChildren})}
                      className={`w-12 h-6 rounded-full transition-colors relative ${signupData.hasChildren ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${signupData.hasChildren ? 'left-7' : 'left-1'}`}></div>
                    </button>
                 </div>

                 {signupData.hasChildren && (
                   <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-500">How many children?</p>
                        <div className="flex gap-2">
                          {[1, 2, 3].map(n => (
                            <button 
                              key={n} 
                              onClick={() => {
                                const newDobs = Array(n).fill('').map((_, i) => signupData.childrenDobs[i] || '');
                                setSignupData({...signupData, childCount: n, childrenDobs: newDobs});
                              }}
                              className={`w-10 h-10 rounded-xl font-black transition-all ${signupData.childCount === n ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>

                      {signupData.childCount > 0 && (
                        <div className="space-y-4 bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100">
                           <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest flex items-center gap-2">
                             <Baby size={14} /> Kids Birthday Month Treats
                           </p>
                           <div className="space-y-3">
                              {Array.from({ length: signupData.childCount }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Child {i+1} Date of Birth</label>
                                  <input 
                                    type="date" 
                                    className="w-full p-3 bg-white border border-indigo-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-xs"
                                    value={signupData.childrenDobs[i] || ''}
                                    onChange={(e) => updateChildDob(i, e.target.value)}
                                  />
                                </div>
                              ))}
                           </div>
                        </div>
                      )}
                   </div>
                 )}
              </div>

              <button onClick={handleFamilyNext} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                Lifestyle Preferences <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case 'SIGNUP_LIFESTYLE':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <button onClick={() => setStep('SIGNUP_FAMILY')} className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-indigo-600 transition-colors"><ArrowLeft size={16} /> Back</button>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Personalize Rewards</h2>
                <p className="text-slate-500 text-sm font-medium">Tell us what you love for exclusive offers.</p>
              </div>
              <button onClick={handleSignupComplete} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline px-4 py-2 bg-indigo-50 rounded-lg">Skip for now</button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Dietary Preference</label>
                <div className="flex gap-3">
                  {['VEG', 'NON_VEG'].map(type => (
                    <button key={type} onClick={() => setSignupData({...signupData, dietary: type as any})} className={`flex-1 py-4 px-4 rounded-2xl font-black text-sm transition-all border-2 ${signupData.dietary === type ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}>
                      {type === 'VEG' ? 'Pure Veg' : 'Non-Veg'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">I am interested in</label>
                <div className="grid grid-cols-3 gap-3">
                  {AVAILABLE_INTERESTS.map(item => (
                    <button key={item.id} onClick={() => toggleInterest(item.id)} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${signupData.interests.includes(item.id) ? 'bg-indigo-50 border-indigo-600 text-indigo-700 scale-105' : 'bg-white border-slate-100 text-slate-400 grayscale'}`}>
                      <item.icon size={20} />
                      <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleSignupComplete} disabled={isLoading} className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all active:scale-95">
                {isLoading ? 'Creating Profile...' : 'Complete Signup'} <Sparkles size={20} />
              </button>
            </div>
          </div>
        );

      case 'SIGNUP_SUCCESS':
        return (
          <div className="space-y-8 animate-in zoom-in duration-500 text-center py-10">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner"><CheckCircle2 size={56} /></div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 italic">Welcome to the Family!</h2>
              <p className="text-slate-500 font-medium">Your unified wallet is ready. Earn rewards across our entire network.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center gap-4">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600"><Zap size={32} /></div>
               <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sign-up Bonus Earned</p>
                  <p className="text-2xl font-black text-emerald-600">+ ₹50 Credit</p>
               </div>
            </div>
            <button onClick={() => onLogin(MOCK_USERS[2])} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-xl transition-all">Go to Dashboard</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-white">
        
        {/* Brand Side - Visual Context */}
        <div className="bg-slate-900 p-16 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-black flex items-center gap-3 mb-6 italic">
              <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 not-italic">
                <Zap className="text-white" size={28} />
              </div>
              INCINC
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed font-medium">One wallet, countless experiences. Earn rewards across our entire premium partner network.</p>
          </div>

          <div className="relative z-10 space-y-10">
            {[
              { icon: CheckCircle2, title: 'Shared Wallet', desc: 'Add once, use at Restaurant, Salon, or Hotel.' },
              { icon: Users, title: 'Family Milestones', desc: 'Free cakes and gifts on birthdays of kids & spouse! 🍰' }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <feature.icon size={20} />
                </div>
                <div>
                  <p className="font-black text-lg text-white">{feature.title}</p>
                  <p className="text-slate-400 font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="h-px w-10 bg-slate-700"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Incinc Media Loyalty v2.1</p>
          </div>
        </div>

        {/* Auth Side - Form Container */}
        <div className="p-12 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-md w-full mx-auto">
            {renderStep()}

            {/* Test Helper for Demo */}
            {(step === 'SELECT_ROLE' || step === 'PASSWORD_ENTRY') && (
              <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in duration-1000 delay-500">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><ShieldCheck size={10} /> Test Portal Login</p>
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                   <p>Super: <span className="text-indigo-600">super / 123</span></p>
                   <p>Admin: <span className="text-emerald-600">admin / 123</span></p>
                   <p>User: <span className="text-amber-600">customer / 123</span></p>
                </div>
              </div>
            )}
            
            <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              By proceeding, you agree to our <a href="#" className="text-slate-600 hover:underline">Privacy & Terms</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

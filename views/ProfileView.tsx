
import React, { useState, useRef } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  Lock, 
  Sparkles, 
  Calendar, 
  Heart, 
  CheckCircle2, 
  X,
  Smartphone,
  ShieldCheck,
  Check
} from 'lucide-react';
import { User, Role } from '../types';
import { AVAILABLE_INTERESTS } from '../constants';

interface ProfileViewProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    birthday: user.birthday || '',
    anniversary: user.anniversary || '',
    dietary: user.preferences?.dietary || 'VEG',
    interests: user.preferences?.interests || []
  });
  const [passwordData, setPasswordData] = useState({ old: '', new: '', confirm: '' });
  const [profileImage, setProfileImage] = useState(user.profileImage || `https://picsum.photos/seed/${user.id}/200/200`);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate({
        ...formData,
        preferences: {
          dietary: formData.dietary as 'VEG' | 'NON_VEG',
          interests: formData.interests
        },
        profileComplete: true
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personal Identity</h1>
          <p className="text-slate-500 font-medium">Manage your credentials and lifestyle preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl active:scale-95 disabled:opacity-50 shadow-indigo-100"
        >
          {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={18} />}
          {showSuccess ? "Changes Saved!" : "Publish Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Image & Summary */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-center space-y-6 relative overflow-hidden group">
             <div className="relative w-40 h-40 mx-auto group">
               <img src={profileImage} alt="" className="w-full h-full rounded-[2.5rem] object-cover shadow-2xl ring-4 ring-indigo-50 transition-transform group-hover:scale-105 duration-500" />
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-indigo-600 transition-all hover:scale-110"
               >
                 <Camera size={20} />
               </button>
               <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
             </div>
             <div>
               <h3 className="text-xl font-black text-slate-900">{user.name}</h3>
               <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{user.role.replace('_', ' ')}</p>
             </div>
             <div className="flex items-center justify-center gap-3">
               <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                 {user.tier} Member
               </span>
             </div>
           </div>

           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
             <h4 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
               <Lock size={16} className="text-indigo-400" /> Security
             </h4>
             <div className="space-y-4">
               <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Change Password</label>
                 <input 
                  type="password" 
                  placeholder="Old Password"
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:bg-white/10 text-sm font-medium"
                  value={passwordData.old}
                  onChange={e => setPasswordData({...passwordData, old: e.target.value})}
                 />
                 <input 
                  type="password" 
                  placeholder="New Password"
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:bg-white/10 text-sm font-medium mt-2"
                  value={passwordData.new}
                  onChange={e => setPasswordData({...passwordData, new: e.target.value})}
                 />
               </div>
               <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95">Update Credentials</button>
             </div>
           </div>
        </div>

        {/* Details Editor */}
        <div className="lg:col-span-8 space-y-8">
           <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
             <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 italic tracking-tighter">
               <Smartphone size={20} className="text-indigo-600 not-italic" /> Essential Details
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                 <div className="relative">
                   <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                   <input 
                    type="text" 
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                 <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">+91</span>
                   <input 
                    type="tel" 
                    className="w-full p-4 pl-14 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                   <input 
                    type="email" 
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Birthday</label>
                 <div className="relative">
                   <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                   <input 
                    type="date" 
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold"
                    value={formData.birthday}
                    onChange={e => setFormData({...formData, birthday: e.target.value})}
                   />
                 </div>
               </div>
             </div>
           </section>

           {user.role === Role.CUSTOMER && (
             <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10"></div>
               <div>
                 <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 italic tracking-tighter">
                   <Sparkles size={20} className="text-amber-500 not-italic" /> Lifestyle Questionnaire
                 </h3>
                 <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-widest">Complete these to get personalized vouchers! 🎁</p>
               </div>

               <div className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Dietary Preference</label>
                    <div className="flex gap-4">
                      {['VEG', 'NON_VEG'].map(type => (
                        <button 
                          key={type} 
                          onClick={() => setFormData({...formData, dietary: type as any})}
                          className={`flex-1 py-4 px-4 rounded-2xl font-black text-sm transition-all border-2 flex items-center justify-center gap-3 ${
                            formData.dietary === type ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100'
                          }`}
                        >
                          {formData.dietary === type && <Check size={18} strokeWidth={3} />}
                          {type === 'VEG' ? 'Pure Veg' : 'Non-Veg'}
                        </button>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Interested In</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {AVAILABLE_INTERESTS.map(interest => (
                        <button 
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center ${
                            formData.interests.includes(interest.id) 
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                              : 'bg-white border-slate-100 text-slate-400 grayscale opacity-60'
                          }`}
                        >
                          <interest.icon size={24} />
                          <span className="text-[10px] font-black uppercase tracking-tight leading-tight">{interest.label}</span>
                        </button>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Anniversary (Optional)</label>
                    <div className="relative">
                      <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                      <input 
                        type="date" 
                        className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-rose-500 rounded-2xl outline-none font-bold"
                        value={formData.anniversary}
                        onChange={e => setFormData({...formData, anniversary: e.target.value})}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 italic px-1">We send special dinner vouchers for your anniversary! 🥂</p>
                 </div>
               </div>
             </section>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

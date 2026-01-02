
import React, { useState, useMemo } from 'react';
import { 
  Send, 
  Users, 
  MessageSquare, 
  Smartphone, 
  Filter, 
  CheckCircle2, 
  Search, 
  Target, 
  Clock, 
  PieChart,
  Hash,
  Sparkles,
  Info,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { THEME_COLORS } from '../constants';

const INTEREST_OPTIONS = ['Spa', 'Fine Dining', 'Seafood', 'Wine', 'Music', 'Gym', 'Poolside'];

const CampaignsView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [targetDiet, setTargetDiet] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [targetTiers, setTargetTiers] = useState<string[]>(['SILVER', 'GOLD', 'PLATINUM']);
  const [message, setMessage] = useState("Hi {{name}}! We noticed you love {{interest}}. Enjoy a special 20% discount this weekend at Nine Blue! 🥂");
  const [channel, setChannel] = useState<'WHATSAPP' | 'SMS'>('WHATSAPP');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const audienceReach = useMemo(() => {
    // Simulated calculation
    let base = 12402;
    if (targetDiet !== 'ALL') base *= 0.6;
    if (selectedInterests.length > 0) base *= (selectedInterests.length * 0.15);
    if (targetTiers.length < 3) base *= (targetTiers.length * 0.3);
    return Math.floor(base);
  }, [targetDiet, selectedInterests, targetTiers]);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-6 max-w-md animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Campaign Launched!</h2>
          <p className="text-slate-500 font-medium">Your message is being delivered to {audienceReach.toLocaleString()} users via {channel}.</p>
          <div className="pt-6">
            <button 
              onClick={() => { setIsSuccess(false); setStep(1); }}
              className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              Back to Campaigns
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Campaigns Center</h1>
          <p className="text-slate-500 font-medium">Segment your audience and send personalized notifications.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
            <Target size={14} /> Est. Reach: {audienceReach.toLocaleString()} users
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Step-based Editor */}
        <div className="lg:col-span-7 space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                  step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-8 min-h-[500px]">
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Users size={20} className="text-indigo-600" />
                    Target Audience
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Dietary Preference</label>
                      <div className="flex gap-3">
                        {['ALL', 'VEG', 'NON_VEG'].map((d) => (
                          <button
                            key={d}
                            onClick={() => setTargetDiet(d as any)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                              targetDiet === d ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {d.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Member Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_OPTIONS.map((interest) => (
                          <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                              selectedInterests.includes(interest) 
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                            }`}
                          >
                            {selectedInterests.includes(interest) && '✓ '}
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Membership Tiers</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['SILVER', 'GOLD', 'PLATINUM'].map((tier) => (
                          <button
                            key={tier}
                            onClick={() => setTargetTiers(prev => prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier])}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                              targetTiers.includes(tier) ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-100 bg-white opacity-60'
                            }`}
                          >
                            <span className="text-xs font-black text-slate-900">{tier}</span>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              targetTiers.includes(tier) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200'
                            }`}>
                              {targetTiers.includes(tier) && <CheckCircle2 size={10} className="text-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                >
                  Continue to Message <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <MessageSquare size={20} className="text-indigo-600" />
                    Compose Message
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Delivery Channel</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setChannel('WHATSAPP')}
                          className={`flex-1 p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                            channel === 'WHATSAPP' ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500' : 'border-slate-100 bg-white'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${channel === 'WHATSAPP' ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                            <Smartphone size={18} />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-black text-slate-900 uppercase">WhatsApp</p>
                            <p className="text-[10px] text-slate-500">Rich media supported</p>
                          </div>
                        </button>
                        <button
                          onClick={() => setChannel('SMS')}
                          className={`flex-1 p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                            channel === 'SMS' ? 'border-indigo-500 bg-indigo-50/30 ring-1 ring-indigo-500' : 'border-slate-100 bg-white'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${channel === 'SMS' ? 'bg-indigo-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                            <MessageSquare size={18} />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-black text-slate-900 uppercase">SMS Gateway</p>
                            <p className="text-[10px] text-slate-500">Transactional fallback</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Message Body</label>
                      <div className="relative">
                        <textarea 
                          className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none min-h-[160px] text-slate-700 font-medium leading-relaxed"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          {['name', 'interest', 'tier'].map(tag => (
                            <button 
                              key={tag}
                              onClick={() => setMessage(prev => prev + ` {{${tag}}}`)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-black text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-tight"
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold">Back</button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                  >
                    Review Campaign <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Campaign Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Audience</p>
                      <p className="text-sm font-bold text-slate-900">{audienceReach.toLocaleString()} Selected Users</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Channel</p>
                      <p className="text-sm font-bold text-slate-900">{channel}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-indigo-50/30 border border-indigo-100 rounded-[2rem] flex items-start gap-4">
                    <Info size={20} className="text-indigo-600 mt-1" />
                    <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                      By launching this campaign, messages will be delivered to the selected segment using your unified credits. Make sure the message body complies with regional communication guidelines.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold">Edit Message</button>
                  <button 
                    onClick={handleSend}
                    disabled={isSending}
                    className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                  >
                    {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div> : <><Send size={18} /> Launch Campaign</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Mobile Preview */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-28">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 justify-center">
              <Smartphone size={14} /> Live Device Preview
            </h3>
            
            {/* Phone Mockup */}
            <div className="w-[300px] h-[600px] bg-slate-900 rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-4 border-slate-800 relative overflow-hidden">
              {/* Speaker & Camera */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
              </div>

              {/* Screen */}
              <div className="w-full h-full bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden flex flex-col relative pt-8">
                {/* WhatsApp Header */}
                {channel === 'WHATSAPP' && (
                  <div className="bg-[#075E54] p-3 flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <div className="w-5 h-5 bg-indigo-500 rounded-md"></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">Incinc Rewards</p>
                      <p className="text-[8px] opacity-80 mt-1">Brand Official Channel</p>
                    </div>
                  </div>
                )}

                {/* SMS Header */}
                {channel === 'SMS' && (
                  <div className="bg-white/80 backdrop-blur-md p-4 flex flex-col items-center border-b border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">IR</div>
                    <p className="text-[10px] font-bold mt-1 text-slate-900">Incinc Rewards</p>
                  </div>
                )}

                {/* Chat Area */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <div className="text-center">
                    <span className="text-[8px] font-bold bg-slate-400/20 text-slate-500 px-2 py-0.5 rounded uppercase">Today</span>
                  </div>

                  {channel === 'WHATSAPP' ? (
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-slate-800 relative max-w-[90%] animate-in slide-in-from-left duration-500">
                      <p className="text-[11px] font-medium leading-relaxed whitespace-pre-wrap">
                        {message.replace('{{name}}', 'Rustabh').replace('{{interest}}', selectedInterests[0] || 'Exclusive Perks')}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[8px] text-slate-400">10:42 AM</span>
                        <CheckCircle2 size={8} className="text-sky-400" />
                      </div>
                      
                      {/* WhatsApp Buttons */}
                      <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
                        <button className="w-full py-1.5 bg-slate-50 text-sky-600 text-[10px] font-bold rounded-lg flex items-center justify-center gap-2">
                          <Target size={10} /> Claim Now
                        </button>
                        <button className="w-full py-1.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg">
                          Opt-out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#E1FFC7] p-3 rounded-2xl rounded-tl-none shadow-sm text-slate-800 relative max-w-[80%] animate-in slide-in-from-left duration-500">
                      <p className="text-[11px] font-medium leading-relaxed">
                        {message.replace('{{name}}', 'Rustabh').replace('{{interest}}', selectedInterests[0] || 'Exclusive Perks')}
                      </p>
                      <span className="text-[8px] text-slate-400 mt-1 block">10:42 AM</span>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="p-2 bg-white flex items-center gap-2">
                  <div className="flex-1 h-8 bg-slate-100 rounded-full"></div>
                  <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center">
                    <MessageSquare size={14} className="text-white" />
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

export default CampaignsView;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, CalendarPlus, User, Clock, ShieldCheck } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_MEMBERSHIPS } from '../constants.ts';

const ExtendMembership: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [membership, setMembership] = useState<any>(null);
  const [customDays, setCustomDays] = useState<number>(0);
  const [newEndDate, setNewEndDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const sub = MOCK_MEMBERSHIPS.find(m => m.id === id);
    if (sub) {
      setMembership(sub);
      setNewEndDate(sub.endDate);
    }
  }, [id]);

  // Sync date calculation based on days input
  useEffect(() => {
    if (!membership) return;
    
    if (customDays > 0) {
      const currentEnd = new Date(membership.endDate);
      const extended = new Date(currentEnd);
      extended.setDate(currentEnd.getDate() + customDays);
      setNewEndDate(extended.toISOString().split('T')[0]);
    } else {
      setNewEndDate(membership.endDate);
    }
  }, [customDays, membership]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDays <= 0) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('Membership Extended by Days:', { 
        id, 
        addedDays: customDays,
        newEndDate,
        note 
      });
      navigate('/admin/memberships');
    }, 1000);
  };

  if (!membership) return <div className="p-8 text-center text-gray-500 font-bold">Loading membership record...</div>;

  return (
    <div className="space-y-5 max-w-lg mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button 
            onClick={() => navigate('/admin/memberships')}
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors bg-white shadow-sm border border-gray-100"
        >
            <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Extend Membership</h1>
            <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider">Sub ID: {id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Compact Visual Summary Card with GymPro Shade */}
        <Card className="p-5 bg-slate-900 text-white border-none shadow-xl relative overflow-hidden ring-1 ring-white/10">
            {/* Branded "GymPro" Background Shade - Scaled Down */}
            <div className="absolute right-[-5%] bottom-[-15%] text-6xl font-black text-white/[0.03] select-none pointer-events-none rotate-[-12deg] tracking-tighter">
                GYMPRO
            </div>

            <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary rounded-xl shadow-lg ring-1 ring-white/10">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight leading-tight">{membership.memberName}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{membership.memberId}</span>
                            <ShieldCheck className="w-3 h-3 text-blue-400 opacity-60" />
                        </div>
                    </div>
                </div>
                
                {customDays > 0 && (
                    <div className="hidden sm:flex flex-col items-end animate-in fade-in slide-in-from-right-2 duration-300">
                        <div className="px-2.5 py-1 bg-blue-500/20 rounded-lg text-blue-300 text-[10px] font-black border border-blue-500/20 backdrop-blur-sm">
                            +{customDays} DAYS
                        </div>
                    </div>
                )}
            </div>
            
            <div className="relative z-10 grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                    <span className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1 text-center">Current Expiry</span>
                    <span className="text-sm font-bold block text-center">{membership.endDate}</span>
                </div>
                <div className="p-3 bg-primary/20 rounded-xl border border-primary/30 backdrop-blur-sm">
                    <span className="block text-[9px] text-blue-300 font-black uppercase tracking-widest mb-1 text-center">New Expiry</span>
                    <span className="text-base font-black text-blue-400 block text-center">
                        {newEndDate}
                    </span>
                </div>
            </div>
        </Card>

        {/* Compact Extension Input Section */}
        <Card className="p-6 space-y-5 border-gray-100 shadow-lg">
            <div>
                <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2">Extension Duration</label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-primary bg-blue-50 rounded-md">
                        <Clock className="w-4 h-4" />
                    </div>
                    <input 
                        type="number" 
                        min="1"
                        placeholder="Number of days..."
                        value={customDays || ''}
                        onChange={(e) => setCustomDays(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full pl-14 pr-4 py-3 border-2 border-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary font-bold text-lg transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="pt-1">
                <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2">Note (Optional)</label>
                <textarea 
                    rows={2}
                    placeholder="Brief reason for extension..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-medium resize-none transition-all shadow-sm"
                />
            </div>
        </Card>

        <div className="flex justify-end items-center gap-5 pt-1">
            <button 
                type="button" 
                onClick={() => navigate('/admin/memberships')}
                className="text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-600 transition-colors"
            >
                Cancel
            </button>
            <Button 
                type="submit" 
                disabled={loading || customDays <= 0}
                className={`min-w-[140px] py-3 text-sm rounded-xl transition-all duration-300 ${
                    loading || customDays <= 0 
                    ? 'opacity-40 grayscale' 
                    : 'shadow-md shadow-primary/20'
                }`}
            >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Confirm'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default ExtendMembership;

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

  if (!membership) return <div className="p-12 text-center text-gray-500 font-bold">Loading membership record...</div>;

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-16">
      <div className="flex items-center gap-4">
        <button 
            onClick={() => navigate('/admin/memberships')}
            className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors bg-white shadow-sm border border-gray-100"
        >
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Extend Membership</h1>
            <p className="text-gray-500 text-sm font-medium">Add extra time to sub ID: {id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Visual Summary Card - High Contrast with Branded Shading */}
        <Card className="p-8 bg-slate-950 text-white border-none shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            {/* Branded "GymPro" Background Shade */}
            <div className="absolute right-[-10%] bottom-[-20%] text-9xl font-black text-white/[0.03] select-none pointer-events-none rotate-[-12deg] tracking-tighter">
                GYMPRO
            </div>
            <div className="absolute left-[-5%] top-[-10%] text-6xl font-black text-blue-500/[0.05] select-none pointer-events-none tracking-tighter">
                NEXUS
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/20 ring-1 ring-white/20">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black tracking-tight">{membership.memberName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-400 font-mono tracking-widest uppercase">{membership.memberId}</span>
                            <ShieldCheck className="w-4 h-4 text-blue-400 opacity-60" />
                        </div>
                    </div>
                </div>
                
                {customDays > 0 && (
                    <div className="flex flex-col items-center sm:items-end">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Status Update</span>
                        <div className="px-4 py-2 bg-blue-500/20 rounded-xl text-blue-300 text-sm font-black border border-blue-500/30 backdrop-blur-sm">
                            +{customDays} DAYS EXTENSION
                        </div>
                    </div>
                )}
            </div>
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span className="block text-[11px] text-gray-400 font-black uppercase tracking-widest mb-2">Original Expiry</span>
                    <span className="text-xl font-bold block">{membership.endDate}</span>
                </div>
                <div className="p-5 bg-primary/20 rounded-2xl border border-primary/40 backdrop-blur-md">
                    <span className="block text-[11px] text-blue-300 font-black uppercase tracking-widest mb-2">Extended Expiry</span>
                    <span className="text-2xl font-black text-blue-400 block transition-all duration-300">
                        {newEndDate}
                    </span>
                </div>
            </div>
        </Card>

        {/* Extension Input Section - Large Fields */}
        <Card className="p-8 space-y-8 border-gray-100 shadow-xl">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-black text-gray-800 uppercase tracking-widest">Extension Duration</label>
                    <span className="text-xs font-bold text-gray-400">Step 1 of 2</span>
                </div>
                <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5" />
                    </div>
                    <input 
                        type="number" 
                        min="1"
                        placeholder="Enter number of days, e.g. 30"
                        value={customDays || ''}
                        onChange={(e) => setCustomDays(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full pl-16 pr-6 py-5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-black text-2xl transition-all shadow-sm placeholder:text-gray-300"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <div className="flex justify-between items-end">
                    <label className="block text-sm font-black text-gray-800 uppercase tracking-widest">Internal Memo / Note</label>
                    <span className="text-xs font-bold text-gray-400 italic">Optional</span>
                </div>
                <textarea 
                    rows={3}
                    placeholder="Enter reason for extension or payment reference..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-base font-medium resize-none transition-all shadow-sm"
                />
            </div>
        </Card>

        <div className="flex justify-end items-center gap-6 pt-2">
            <button 
                type="button" 
                onClick={() => navigate('/admin/memberships')}
                className="text-gray-500 font-black uppercase text-sm tracking-widest hover:text-gray-900 transition-colors"
            >
                Cancel Process
            </button>
            <Button 
                type="submit" 
                disabled={loading || customDays <= 0}
                className={`min-w-[240px] py-4 text-lg rounded-2xl shadow-2xl transition-all duration-300 ${
                    loading || customDays <= 0 
                    ? 'opacity-30 grayscale cursor-not-allowed' 
                    : 'shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
                <Save className="w-5 h-5" />
                {loading ? 'Finalizing...' : 'Confirm Extension'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default ExtendMembership;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, CalendarPlus, User, Clock } from 'lucide-react';
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
    <div className="space-y-5 max-w-lg mx-auto pb-10">
      <div className="flex items-center gap-3">
        <button 
            onClick={() => navigate('/admin/memberships')}
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
            <h1 className="text-xl font-bold text-gray-900">Extend Membership</h1>
            <p className="text-gray-500 text-xs">Add days to subscription {id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Visual Summary Card - Compacted */}
        <Card className="p-4 bg-gray-900 text-white border-none shadow-lg">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-primary-light backdrop-blur-md">
                    <User className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-lg font-black">{membership.memberName}</h3>
                    <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">{membership.memberId}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5 text-center">Current Expiry</span>
                    <span className="text-base font-bold block text-center">{membership.endDate}</span>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <span className="block text-[9px] text-blue-300 font-black uppercase tracking-widest mb-0.5 text-center">New Expiry</span>
                    <span className="text-base font-black text-blue-400 block text-center">{newEndDate}</span>
                </div>
            </div>
            
            {customDays > 0 && (
                <div className="mt-3 flex items-center justify-center gap-2 py-1.5 bg-green-500/10 rounded-md text-green-400 text-[11px] font-black border border-green-500/20 animate-in fade-in zoom-in-95 duration-200">
                    <CalendarPlus className="w-3.5 h-3.5" />
                    ADDING {customDays} DAYS
                </div>
            )}
        </Card>

        {/* Extension Input Section - Compacted */}
        <Card className="p-5 space-y-4">
            <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-tight mb-1.5">Days to Extend</label>
                <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="number" 
                        min="1"
                        placeholder="e.g. 30"
                        value={customDays || ''}
                        onChange={(e) => setCustomDays(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-primary font-bold text-lg transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-tight mb-1.5">Note / Reason (Optional)</label>
                <textarea 
                    rows={2}
                    placeholder="Reason for extension..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2 border-2 border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-primary text-sm font-medium resize-none transition-all"
                />
            </div>
        </Card>

        <div className="flex justify-end gap-3">
            <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/admin/memberships')}
                className="px-6 py-2 text-sm"
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading || customDays <= 0}
                className={`min-w-[150px] py-2 text-sm shadow-md ${loading || customDays <= 0 ? 'opacity-50 grayscale' : 'shadow-blue-100'}`}
            >
                <Save className="w-3.5 h-3.5" />
                {loading ? 'Saving...' : 'Extend'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default ExtendMembership;
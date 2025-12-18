import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, User, CreditCard } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_MEMBERSHIPS, MOCK_PLANS, MOCK_MEMBERS, MOCK_PAYMENTS } from '../constants.ts';

const EditMembership: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    memberId: '',
    status: 'Active',
    startDate: '',
    endDate: '',
    sourcePaymentId: '',
  });

  useEffect(() => {
    const sub = MOCK_MEMBERSHIPS.find(m => m.id === id);
    if (sub) {
      setFormData({
        memberId: sub.memberId,
        status: sub.status,
        startDate: sub.startDate,
        endDate: sub.endDate,
        sourcePaymentId: sub.sourcePaymentId
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Membership Updated:', formData);
      navigate('/admin/memberships');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/memberships')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Membership Period</h1>
            <p className="text-gray-500 text-sm">Update subscription record {id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-6">
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"><User className="w-4 h-4" /> Member</label>
                <select name="memberId" value={formData.memberId} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 disabled:opacity-70" disabled>
                    {MOCK_MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input type="date" name="endDate" required value={formData.endDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
        </Card>

        <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/memberships')}>Cancel</Button>
            <Button type="submit" disabled={loading}><Save className="w-4 h-4" />{loading ? 'Saving...' : 'Update Record'}</Button>
        </div>
      </form>
    </div>
  );
};

export default EditMembership;
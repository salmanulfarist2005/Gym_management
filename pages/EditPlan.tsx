import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, FileText } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_PLANS } from '../constants.ts';

const EditPlan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    duration: 30,
    price: '',
    active: true,
    description: ''
  });

  useEffect(() => {
    const plan = MOCK_PLANS.find(p => p.id === id);
    if (plan) {
      setFormData({
        name: plan.name,
        duration: plan.duration,
        price: plan.price.toString(),
        active: plan.active,
        description: plan.description || ''
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Plan Updated:', formData);
      navigate('/admin/plans');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/plans')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Membership Plan</h1>
            <p className="text-gray-500 text-sm">Update plan {id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Plan Details</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                        <input type="number" name="duration" required value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="active" value={formData.active ? 'true' : 'false'} onChange={(e) => setFormData({...formData, active: e.target.value === 'true'})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </div>
        </Card>

        <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/plans')}>Cancel</Button>
            <Button type="submit" disabled={loading}><Save className="w-4 h-4" />{loading ? 'Saving...' : 'Update Plan'}</Button>
        </div>
      </form>
    </div>
  );
};

export default EditPlan;
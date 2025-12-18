import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, FileText } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';

const AddPlan: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    duration: 30,
    price: '',
    active: true,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately if strictly needed, but here status is a select
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('Plan created:', formData);
      navigate('/admin/plans');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button 
            onClick={() => navigate('/admin/plans')}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Plan</h1>
            <p className="text-gray-500 text-sm">Add a new membership package</p>
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
                    <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Gold Annual"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days) *</label>
                        <input 
                            type="number" 
                            name="duration"
                            required
                            min="1"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                        <input 
                            type="number" 
                            name="price"
                            required
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                        name="active"
                        value={formData.active ? 'true' : 'false'}
                        onChange={(e) => setFormData({...formData, active: e.target.value === 'true'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description / Perks</label>
                    <textarea 
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="List the perks included in this plan..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                </div>
            </div>
        </Card>

        <div className="flex justify-end gap-4">
            <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/admin/plans')}
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading}
                className={loading ? 'opacity-70 cursor-not-allowed' : ''}
            >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Create Plan'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;
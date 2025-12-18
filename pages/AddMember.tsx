import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';

const AddMember: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In a real app, we would dispatch an action or call context here
      console.log('Member created:', formData);
      navigate('/admin/members');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button 
            onClick={() => navigate('/admin/members')}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Member</h1>
            <p className="text-gray-500 text-sm">Create a new member profile (Membership is added separately)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Section */}
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input 
                        type="text" 
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input 
                        type="text" 
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input 
                        type="date" 
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
            <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/admin/members')}
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading}
                className={loading ? 'opacity-70 cursor-not-allowed' : ''}
            >
                <Save className="w-4 h-4" />
                {loading ? 'Creating...' : 'Create Member'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
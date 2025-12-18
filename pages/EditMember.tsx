import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_MEMBERS } from '../constants.ts';

const EditMember: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '1990-01-01',
    gender: 'Male',
  });

  useEffect(() => {
    const member = MOCK_MEMBERS.find(m => m.id === id);
    if (member) {
      const names = member.name.split(' ');
      setFormData({
        firstName: names[0] || '',
        lastName: names[1] || '',
        email: member.email,
        phone: member.phone || '',
        dob: '1990-01-01',
        gender: 'Male'
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
      console.log('Member Updated:', formData);
      navigate('/admin/members');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/members')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Member Profile</h1>
            <p className="text-gray-500 text-sm">Update profile details for {id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
            </div>
        </Card>

        <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/members')}>Cancel</Button>
            <Button type="submit" disabled={loading}><Save className="w-4 h-4" />{loading ? 'Saving...' : 'Update Profile'}</Button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
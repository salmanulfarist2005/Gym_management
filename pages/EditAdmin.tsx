import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Shield, Mail, Phone, Building } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_GYMS } from '../constants.ts';

const EditAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    user_type: 'Gym Admin',
    gym_id: ''
  });

  useEffect(() => {
    // In a real app, fetch admin by id
    setFormData({
        username: 'admin_user',
        email: 'admin@gym.com',
        first_name: 'John',
        last_name: 'Doe',
        phone: '+1 (555) 000-0000',
        user_type: 'Gym Admin',
        gym_id: MOCK_GYMS[0].id
    });
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
        console.log('Admin Updated:', formData);
        navigate('/superuser/admins');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate('/superuser/admins')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Admin</h1>
                <p className="text-gray-500 text-sm">Update staff credentials for {id}</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-gray-900">Admin Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username *</label>
                        <input type="text" name="username" required value={formData.username} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name *</label>
                        <input type="text" name="first_name" required value={formData.first_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name *</label>
                        <input type="text" name="last_name" required value={formData.last_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role *</label>
                        <select name="user_type" required value={formData.user_type} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white">
                            <option value="Gym Owner">Gym Owner</option>
                            <option value="Gym Admin">Gym Admin</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assigned Gym *</label>
                        <select name="gym_id" required value={formData.gym_id} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white">
                            {MOCK_GYMS.map(gym => <option key={gym.id} value={gym.id}>{gym.name}</option>)}
                        </select>
                    </div>
                </div>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="secondary" onClick={() => navigate('/superuser/admins')}>Cancel</Button>
                <Button type="submit" disabled={loading}><Save className="w-4 h-4" />{loading ? 'Saving...' : 'Update Admin'}</Button>
            </div>
        </form>
    </div>
  );
};

export default EditAdmin;
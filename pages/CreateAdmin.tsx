import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UserPlus, Shield } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { MOCK_GYMS } from '../constants';

const CreateAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fields: id (auto), username, email, password, first_name, last_name, phone, user_type, gym
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    user_type: 'Gym Admin',
    gym_id: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        console.log('Admin Created:', formData);
        navigate('/superuser/admins');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
        <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/superuser/admins')}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Admin</h1>
                <p className="text-gray-500 text-sm">Add a new administrator to a gym</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                    <UserPlus className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input 
                            type="text" 
                            name="first_name" 
                            required 
                            value={formData.first_name} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input 
                            type="text" 
                            name="last_name" 
                            required 
                            value={formData.last_name} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            required 
                            value={formData.phone} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-gray-900">Account & Permissions</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                        <input 
                            type="text" 
                            name="username" 
                            required 
                            value={formData.username} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                        <input 
                            type="password" 
                            name="password" 
                            required 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                    </div>

                    {/* User Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Type *</label>
                        <select 
                            name="user_type" 
                            required 
                            value={formData.user_type} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        >
                            <option value="Gym Owner">Gym Owner</option>
                            <option value="Gym Admin">Gym Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>

                    {/* Gym Assignment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Gym *</label>
                        <select 
                            name="gym_id" 
                            required 
                            value={formData.gym_id} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        >
                            <option value="">-- Select Gym --</option>
                            {MOCK_GYMS.map((gym) => (
                                <option key={gym.id} value={gym.id}>
                                    {gym.name} ({gym.location})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="secondary" onClick={() => navigate('/superuser/admins')}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading} className={loading ? 'opacity-70' : ''}>
                    <Save className="w-4 h-4" />
                    {loading ? 'Creating...' : 'Create Admin Account'}
                </Button>
            </div>
        </form>
    </div>
  );
};

export default CreateAdmin;

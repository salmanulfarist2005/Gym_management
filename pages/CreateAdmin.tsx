import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UserPlus, Shield, Lock, Phone, Mail, Building } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_GYMS } from '../constants.ts';

const CreateAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Requested fields: id (auto), username, email, password, first_name, last_name, phone, user_type, gym
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
    
    // Simulate API call and ID generation
    const newAdmin = {
        ...formData,
        id: `ADM-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setTimeout(() => {
        setLoading(false);
        console.log('Admin Created:', newAdmin);
        navigate('/superuser/admins');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/superuser/admins')}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Admin</h1>
                <p className="text-gray-500 text-sm">Set up a new staff account with specific gym permissions</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Personal Info */}
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <UserPlus className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name *</label>
                                <input 
                                    type="text" 
                                    name="first_name" 
                                    required 
                                    value={formData.first_name} 
                                    onChange={handleChange} 
                                    placeholder="e.g. Dwayne"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name *</label>
                                <input 
                                    type="text" 
                                    name="last_name" 
                                    required 
                                    value={formData.last_name} 
                                    onChange={handleChange} 
                                    placeholder="e.g. Johnson"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address *</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="dwayne@gym.com"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number *</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    required 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Right Column: Account Details */}
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Account & Access</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username *</label>
                            <input 
                                type="text" 
                                name="username" 
                                required 
                                value={formData.username} 
                                onChange={handleChange} 
                                placeholder="dwayne_the_rock"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Security Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    required 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    placeholder="Minimum 8 characters"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">User Role *</label>
                                <select 
                                    name="user_type" 
                                    required 
                                    value={formData.user_type} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white transition-all shadow-sm"
                                >
                                    <option value="Gym Owner">Gym Owner</option>
                                    <option value="Gym Admin">Gym Admin</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assign Gym *</label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <select 
                                        name="gym_id" 
                                        required 
                                        value={formData.gym_id} 
                                        onChange={handleChange} 
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white transition-all shadow-sm"
                                    >
                                        <option value="">Select a Gym</option>
                                        {MOCK_GYMS.map((gym) => (
                                            <option key={gym.id} value={gym.id}>
                                                {gym.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={() => navigate('/superuser/admins')} className="px-8">
                    Discard Changes
                </Button>
                <Button type="submit" disabled={loading} className={`px-8 ${loading ? 'opacity-70' : ''} shadow-lg shadow-blue-200`}>
                    <Save className="w-4 h-4" />
                    {loading ? 'Creating...' : 'Create Admin Account'}
                </Button>
            </div>
        </form>
    </div>
  );
};

export default CreateAdmin;
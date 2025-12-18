import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ShieldCheck, Edit2, Trash2, Mail, Phone, Building2, UserCircle } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_GYMS } from '../constants.ts';

const MOCK_ADMINS = [
  { 
    id: 'ADM-101', 
    username: 'dwayne_owner', 
    email: 'dwayne@ironparadise.com', 
    first_name: 'Dwayne', 
    last_name: 'Johnson', 
    phone: '+1 555-0101', 
    user_type: 'Gym Owner', 
    gym_id: 'GYM-001' 
  },
  { 
    id: 'ADM-102', 
    username: 'joe_gold', 
    email: 'joe@golds.com', 
    first_name: 'Joe', 
    last_name: 'Gold', 
    phone: '+1 555-0102', 
    user_type: 'Manager', 
    gym_id: 'GYM-002' 
  },
  { 
    id: 'ADM-103', 
    username: 'mike_t', 
    email: 'mike@metro.com', 
    first_name: 'Mike', 
    last_name: 'Tyson', 
    phone: '+1 555-0103', 
    user_type: 'Staff', 
    gym_id: 'GYM-003' 
  },
];

const AdminsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getGymName = (gymId: string) => {
    const gym = MOCK_GYMS.find(g => g.id === gymId);
    return gym ? gym.name : 'Unknown Gym';
  };

  const filteredAdmins = MOCK_ADMINS.filter(admin => 
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Gym Administrators</h1>
          <p className="text-gray-500 text-lg mt-1">Manage staff accounts and gym assignments</p>
        </div>
        <Button onClick={() => navigate('/superuser/admins/create')}>
          <Plus className="w-6 h-6" />
          Create New Admin
        </Button>
      </div>

      <Card className="p-6">
        <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name, username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-6 py-4 w-full border-2 border-gray-100 rounded-2xl text-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-primary shadow-sm transition-all"
            />
        </div>
      </Card>

      <Card className="overflow-hidden p-0 border-none shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-lg">
            <thead className="bg-gray-50 text-gray-600 font-black uppercase text-xs tracking-widest">
              <tr>
                <th className="px-10 py-6">ID & Username</th>
                <th className="px-10 py-6">Admin Name</th>
                <th className="px-10 py-6">Contact Info</th>
                <th className="px-10 py-6">Role</th>
                <th className="px-10 py-6">Assigned Gym</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-blue-50/40 group transition-all">
                  <td className="px-10 py-8">
                    <div className="font-mono text-sm text-gray-400 mb-1 font-bold">{admin.id}</div>
                    <div className="flex items-center gap-2 font-black text-primary text-xl">
                        <UserCircle className="w-6 h-6" />
                        @{admin.username}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="font-black text-gray-900 text-xl">{admin.first_name} {admin.last_name}</div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-gray-600 font-bold">
                            <Mail className="w-5 h-5 text-gray-400" />
                            {admin.email}
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 font-bold">
                            <Phone className="w-5 h-5 text-gray-400" />
                            {admin.phone}
                        </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="inline-flex items-center px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wide bg-indigo-100 text-indigo-700 shadow-sm shadow-indigo-100">
                        {admin.user_type}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-3 text-gray-700 font-black text-lg">
                        <div className="p-3 bg-gray-100 rounded-xl shadow-inner">
                            <Building2 className="w-6 h-6 text-gray-500" />
                        </div>
                        {getGymName(admin.gym_id)}
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button className="p-3 text-gray-400 hover:text-primary hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-gray-200 transition-all hover:scale-110" title="Edit">
                        <Edit2 className="w-6 h-6" />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-danger hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-gray-200 transition-all hover:scale-110" title="Delete">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminsList;
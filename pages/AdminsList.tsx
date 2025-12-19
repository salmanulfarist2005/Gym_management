import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ShieldCheck, Edit2, Trash2, Mail, Phone, Building2, UserCircle, Eye } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Administrators</h1>
          <p className="text-gray-500 text-base mt-0.5">Manage staff accounts and gym assignments</p>
        </div>
        <Button onClick={() => navigate('/superuser/admins/create')}>
          <Plus className="w-5 h-5" />
          Add Admin
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name, username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2.5 w-full border-2 border-gray-100 rounded-xl text-base font-medium focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-primary shadow-sm transition-all"
            />
        </div>
      </Card>

      <Card className="overflow-hidden p-0 border-none shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base">
            <thead className="bg-gray-50 text-gray-600 font-black uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-8 py-5">ID & Username</th>
                <th className="px-8 py-5">Admin Name</th>
                <th className="px-8 py-5">Contact Info</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Gym</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-blue-50/20 group transition-all text-sm">
                  <td className="px-8 py-6">
                    <div className="font-mono text-[10px] text-gray-400 mb-0.5 font-bold uppercase">{admin.id}</div>
                    <div className="flex items-center gap-2 font-black text-primary">
                        <UserCircle className="w-5 h-5" />
                        @{admin.username}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-gray-900">{admin.first_name} {admin.last_name}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2.5 text-gray-600 font-medium text-xs">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {admin.email}
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-600 font-medium text-xs">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {admin.phone}
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide bg-indigo-100 text-indigo-700">
                        {admin.user_type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-2.5 text-gray-700 font-black">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {getGymName(admin.gym_id)}
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                       <button 
                        className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all" 
                        title="View Profile"
                        onClick={() => navigate(`/superuser/admins/view/${admin.id}`)}
                       >
                        <Eye className="w-4 h-4" />
                      </button>
                       <button 
                        className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all" 
                        title="Edit"
                        onClick={() => navigate(`/superuser/admins/edit/${admin.id}`)}
                       >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-danger hover:bg-white rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
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
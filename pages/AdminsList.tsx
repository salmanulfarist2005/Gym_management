import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ShieldCheck, Edit2, Trash2, Mail, Phone, Building2, UserCircle } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_GYMS } from '../constants.ts';

// Detailed Mock data for admins
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gym Administrators</h1>
          <p className="text-gray-500 text-sm">Manage staff accounts and gym assignments</p>
        </div>
        <Button onClick={() => navigate('/superuser/admins/create')}>
          <Plus className="w-4 h-4" />
          Create New Admin
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name, username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
        </div>
      </Card>

      <Card className="overflow-hidden p-0 border-none shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">ID & Username</th>
                <th className="px-6 py-4">Admin Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Assigned Gym</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-blue-50/30 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-gray-400 mb-1">{admin.id}</div>
                    <div className="flex items-center gap-1.5 font-medium text-primary">
                        <UserCircle className="w-4 h-4" />
                        @{admin.username}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{admin.first_name} {admin.last_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            {admin.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {admin.phone}
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                        {admin.user_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <div className="p-1.5 bg-gray-100 rounded-md">
                            <Building2 className="w-4 h-4 text-gray-500" />
                        </div>
                        {getGymName(admin.gym_id)}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-200" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-danger hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-200" title="Delete">
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ShieldCheck, Edit2, Trash2, Mail, Phone } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI';
import { MOCK_GYMS } from '../constants';

// Local mock data for admins
const MOCK_ADMINS = [
  { id: 'ADM-001', username: 'dwayne_j', email: 'dwayne@ironparadise.com', first_name: 'Dwayne', last_name: 'Johnson', phone: '+1 555-0101', user_type: 'Gym Owner', gym_id: 'GYM-001' },
  { id: 'ADM-002', username: 'joe_gold', email: 'joe@golds.com', first_name: 'Joe', last_name: 'Gold', phone: '+1 555-0102', user_type: 'Gym Owner', gym_id: 'GYM-002' },
  { id: 'ADM-003', username: 'mike_manager', email: 'mike@metro.com', first_name: 'Mike', last_name: 'Tyson', phone: '+1 555-0103', user_type: 'Manager', gym_id: 'GYM-003' },
  { id: 'ADM-004', username: 'sarah_staff', email: 'sarah@ironparadise.com', first_name: 'Sarah', last_name: 'Connor', phone: '+1 555-0104', user_type: 'Staff', gym_id: 'GYM-001' },
];

const AdminsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to get gym name
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
          <h1 className="text-2xl font-bold text-gray-900">Gym Admins</h1>
          <p className="text-gray-500 text-sm">Manage access and permissions for gym staff</p>
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
                className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Admin Info</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Assigned Gym</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs">
                            {admin.first_name[0]}{admin.last_name[0]}
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">{admin.first_name} {admin.last_name}</div>
                            <div className="text-xs text-gray-500">@{admin.username}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {admin.email}
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {admin.phone}
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {admin.user_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1 text-gray-900 font-medium">
                        <ShieldCheck className="w-4 h-4 text-gray-400" />
                        {getGymName(admin.gym_id)}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-full transition-colors" title="Delete">
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MapPin, Edit2, Trash2, Eye } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_GYMS } from '../constants.ts';

const GymsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGyms = MOCK_GYMS.filter(gym => 
    gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gym.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gyms</h1>
          <p className="text-gray-500 text-sm">Manage all gym branches</p>
        </div>
        <Button onClick={() => navigate('/superuser/gyms/create')}>
          <Plus className="w-4 h-4" />
          Create New Gym
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search gym name or location..."
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
                <th className="px-6 py-3">Gym Name</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3">Members</th>
                <th className="px-6 py-3">Revenue</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGyms.map((gym) => (
                <tr key={gym.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{gym.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{gym.id}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {gym.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{gym.ownerName}</td>
                  <td className="px-6 py-4 text-gray-600">{gym.membersCount}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">₹{gym.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge status={gym.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                       <button 
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all" 
                        title="View"
                        onClick={() => navigate(`/superuser/gyms/view/${gym.id}`)}
                       >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all" 
                        title="Edit"
                        onClick={() => navigate(`/superuser/gyms/edit/${gym.id}`)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-all" title="Delete">
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

export default GymsList;
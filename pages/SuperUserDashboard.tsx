import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_GYMS } from '../constants.ts';
import { Building, Users, TrendingUp, Edit2, Trash2, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SuperUserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const chartData = MOCK_GYMS.map(gym => ({
    name: gym.name,
    members: gym.membersCount,
    revenue: gym.revenue
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
        <Button onClick={() => navigate('/superuser/gyms/create')}>
            <Plus className="w-4 h-4" />
            Create Gym
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full text-primary">
                <Building className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500">Total Gyms</p>
                <h3 className="text-2xl font-bold text-gray-900">{MOCK_GYMS.length}</h3>
            </div>
        </Card>
        <Card className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-full text-success">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <h3 className="text-2xl font-bold text-gray-900">4,650</h3>
            </div>
        </Card>
        <Card className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                <TrendingUp className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">₹183,000</h3>
            </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Gym</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#0052CC" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </Card>
          <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Members Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" width={100} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="members" fill="#28A745" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </Card>
      </div>

      {/* Gym List Table */}
      <Card className="overflow-hidden p-0">
          <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">All Gyms</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                    <tr>
                        <th className="px-6 py-4">Gym Name</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Owner</th>
                        <th className="px-6 py-4">Members</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MOCK_GYMS.map((gym) => (
                        <tr key={gym.id} className="hover:bg-gray-50 group">
                            <td className="px-6 py-4 font-medium text-gray-900">{gym.name}</td>
                            <td className="px-6 py-4">{gym.location}</td>
                            <td className="px-6 py-4">{gym.ownerName}</td>
                            <td className="px-6 py-4">{gym.membersCount}</td>
                            <td className="px-6 py-4">
                                <Badge status={gym.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
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

export default SuperUserDashboard;
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building, MapPin, Users, TrendingUp, Calendar, User } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_GYMS } from '../constants.ts';

const ViewGym: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const gym = MOCK_GYMS.find(g => g.id === id);

  if (!gym) return <div className="p-8 text-center">Gym not found</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/superuser/gyms')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{gym.name}</h1>
          <p className="text-gray-500 text-sm">Gym Branch Overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-primary rounded-xl">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">General Information</h3>
                <p className="text-sm text-gray-500">Essential details about this branch</p>
              </div>
            </div>
            <Badge status={gym.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Branch ID</span>
              <p className="font-mono text-gray-900">{gym.id}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Owner / Manager</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900 font-medium">{gym.ownerName}</p>
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900 font-medium">{gym.location}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="flex flex-col items-center justify-center text-center p-8 bg-primary text-white border-none">
            <div className="p-4 bg-white/20 rounded-full mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black">{gym.membersCount}</h4>
            <p className="text-sm opacity-80 font-medium">Active Members</p>
          </Card>
          <Card className="flex flex-col items-center justify-center text-center p-8 bg-success text-white border-none">
            <div className="p-4 bg-white/20 rounded-full mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black">₹{gym.revenue.toLocaleString()}</h4>
            <p className="text-sm opacity-80 font-medium">Monthly Revenue</p>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" onClick={() => navigate(`/superuser/gyms/edit/${gym.id}`)}>Edit Branch</Button>
      </div>
    </div>
  );
};

export default ViewGym;
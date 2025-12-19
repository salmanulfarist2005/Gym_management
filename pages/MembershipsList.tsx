import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Edit2, Trash2, CalendarPlus, Eye } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_MEMBERSHIPS } from '../constants.ts';

const MembershipsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMemberships = MOCK_MEMBERSHIPS.filter((m) =>
    m.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.sourcePaymentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Memberships</h1>
          <p className="text-gray-500 text-sm">Manage member subscriptions and periods</p>
        </div>
        <Button onClick={() => navigate('/admin/memberships/add')}>
          <Plus className="w-4 h-4" />
          Add Membership
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by Member, ID or Payment Ref..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div className="flex gap-2">
                 <Button variant="outline">
                    <Filter className="w-4 h-4" />
                    Filter
                 </Button>
            </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Member Name</th>
                <th className="px-6 py-3">Member ID</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3">Source Payment ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMemberships.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{sub.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{sub.memberName}</td>
                  <td className="px-6 py-4 text-gray-600 text-xs font-mono">{sub.memberId}</td>
                  <td className="px-6 py-4 text-gray-600">{sub.startDate}</td>
                  <td className="px-6 py-4 text-gray-600">{sub.endDate}</td>
                  <td 
                    className="px-6 py-4 text-blue-600 hover:underline cursor-pointer text-xs font-mono"
                    onClick={() => navigate(`/admin/payments/view/${sub.sourcePaymentId}`)}
                  >
                      {sub.sourcePaymentId}
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={sub.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all" 
                        title="View Details"
                        onClick={() => navigate(`/admin/memberships/view/${sub.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-all" 
                        title="Extend Membership"
                        onClick={() => navigate(`/admin/memberships/extend/${sub.id}`)}
                      >
                        <CalendarPlus className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all" 
                        title="Edit Membership"
                        onClick={() => navigate(`/admin/memberships/edit/${sub.id}`)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-all" title="Delete Membership">
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

export default MembershipsList;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreVertical, FileDown } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_MEMBERS } from '../constants.ts';
import { Member } from '../types.ts';

const MembersList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredMembers = MOCK_MEMBERS.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.phone && member.phone.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-500 text-sm">Manage all gym members</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <FileDown className="w-4 h-4" />
                Export
            </Button>
            <Button onClick={() => navigate('/admin/members/add')}>
                <Plus className="w-4 h-4" />
                Add Member
            </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Frozen">Frozen</option>
                </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Member Info</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Current Plan</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Expiry Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{member.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                        {member.phone || '-'}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{member.plan}</td>
                    <td className="px-6 py-3">
                      <Badge status={member.status} />
                    </td>
                    <td className="px-6 py-3 text-gray-600">{member.expiryDate}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-primary hover:underline font-medium text-xs">View</button>
                        <button className="text-gray-400 hover:text-gray-600">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No members found matching your criteria.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing {filteredMembers.length} results</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white disabled:opacity-50" disabled>Next</button>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default MembersList;
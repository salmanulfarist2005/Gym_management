import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_PLANS } from '../constants.ts';

const PlansList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Membership Plans</h1>
          <p className="text-gray-500 text-sm">Configure gym membership packages</p>
        </div>
        <Button onClick={() => navigate('/admin/plans/add')}>
          <Plus className="w-4 h-4" />
          Create New Plan
        </Button>
      </div>

      {/* Plans Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Plan Name</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_PLANS.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{plan.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{plan.id}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {plan.duration} Days
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ₹{plan.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {plan.active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {plan.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {plan.description || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition-colors" title="Edit Plan">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-full transition-colors" title="Delete Plan">
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

export default PlansList;
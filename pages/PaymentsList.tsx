import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreVertical, FileText, Download } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI';
import { MOCK_PAYMENTS } from '../constants';

const PaymentsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = MOCK_PAYMENTS.filter((p) =>
    p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.transactionId && p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments & Invoices</h1>
          <p className="text-gray-500 text-sm">Track revenue and payment history</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Download className="w-4 h-4" />
                Export CSV
            </Button>
            <Button onClick={() => navigate('/admin/payments/add')}>
                <Plus className="w-4 h-4" />
                Record Payment
            </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by member, payment ID or transaction ref..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div className="flex gap-2">
                 <Button variant="outline">
                    <Filter className="w-4 h-4" />
                    Filter Date
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
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{payment.id}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{payment.memberName}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{payment.type}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <Badge status={payment.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600" title="View Receipt">
                        <FileText className="w-4 h-4" />
                    </button>
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

export default PaymentsList;

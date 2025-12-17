import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CreditCard, User } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { MOCK_MEMBERS } from '../constants';

const AddPayment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    memberId: '',
    paymentType: 'General',
    description: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    paymentMethod: 'Cash',
    transactionId: '',
    status: 'Completed'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Payment recorded:', formData);
      navigate('/admin/payments');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button 
            onClick={() => navigate('/admin/payments')}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Record Payment</h1>
            <p className="text-gray-500 text-sm">Manually record a transaction</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Payment Details</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member *</label>
                    <select 
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    >
                        <option value="">-- Select Member --</option>
                        {MOCK_MEMBERS.map(m => (
                            <option key={m.id} value={m.id}>{m.name} ({m.id})</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                        <select 
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        >
                            <option value="General">General</option>
                            <option value="Membership">Membership</option>
                            <option value="Personal Training">Personal Training</option>
                            <option value="Merchandise">Merchandise</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input 
                            type="date" 
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label>
                    <input 
                        type="number" 
                        name="amount"
                        required
                        min="0"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input 
                        type="text" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g. Water bottle, Gym Bag"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <select 
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Card">Credit/Debit Card</option>
                            <option value="UPI">UPI</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        >
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID / Reference</label>
                    <input 
                        type="text" 
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            </div>
        </Card>

        <div className="flex justify-end gap-4">
            <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/admin/payments')}
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading}
                className={loading ? 'opacity-70 cursor-not-allowed' : ''}
            >
                <Save className="w-4 h-4" />
                {loading ? 'Recording...' : 'Record Payment'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;
